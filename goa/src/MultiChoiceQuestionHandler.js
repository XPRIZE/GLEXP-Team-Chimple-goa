/// <reference path="cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />
var xc = xc || {};
xc.MultipleChoiceQuestionHandler = cc.Layer.extend({
    _textContentMargin: 100,
    _width:0,
    _height: 0,
    _nodeJSON: "",
    _textContentMargin: 0,
    _constructedScene: null,    
    _answers:[],
    _numberOfTimesInCorrectAnswered: 0,
    ctor: function (nodeJSON, width, height, question, callback, callbackContext) {
        this._super(width, height);
        this._width = width;
        this._height = height;
        this.callback = callback;
        this._callbackContext = callbackContext;
        this._question = question;
        this._nodeJSON = nodeJSON;
        this._textContentMargin = 100;
        this.init();
    },

    init: function() {
        this.showQuestionTemplate();
        this.configureQuestion();
        this.configureAnswers();
        this.scheduleOnce(this.initHelp, 0.1);
    },

    initHelp: function() {
        var helpShown = cc.sys.localStorage.getItem("helpShown");
        if(!xc._MULTIPLE_CHOICE_HELP_SHOWN && helpShown != "true")
        {
            var context = this;
            var correctAnswerNode = this._constructedScene.node.getChildByName(context._correctAnswerNode);
            var box = correctAnswerNode.getBoundingBox();
            this._help = new xc.HelpLayer(cc.rect(box.x   + box.width/2, box.y + box.height/2, box.width  , box.height), cc.rect(0,0,10,10));
            this._constructedScene.node.addChild(this._help,4)
            this._help.click(correctAnswerNode.x,correctAnswerNode.y);
            xc._MULTIPLE_CHOICE_HELP_SHOWN = true;            
        }

    },

    showQuestionTemplate: function() {
        this._constructedScene = ccs.load(this._nodeJSON,xc.path);
        this._constructedScene.node.retain();
        
        this._constructedScene.node.setPosition(cc.director.getWinSize().width/2, cc.director.getWinSize().height/2);
        this._constructedScene.node.setAnchorPoint(cc.p(0.5,0.5));
        
        if (this._constructedScene.node) {
            this._callbackContext.addChild(this._constructedScene.node,0);
        }                        
    },

    configureQuestion: function() {
        //randomize array
        //find out question node

        var node = this._constructedScene.node.getChildByName("Q1");
        if(node) {
            node.setAnchorPoint(cc.p(0.5,0.5));
            node.setFontSize(xc.storyFontSize);
            node.setTextColor(xc.storyFontColor);
            node.setFontName(xc.storyFontName);
            node.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
            node.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            node.setTouchEnabled(false);
            node.setString(this._question.question);
        }
    },    

    configureAnswers: function() {
        var context = this;
        this._answers = this._answers.concat(this._question.choices);
        this._answers = this._answers.concat([this._question.answer]);
        this._answers = this._answers.map(function(n){ return [Math.random(), n] })
             .sort().map(function(n){ return n[1] });

        this._answers.forEach(function(element, index) {
            var nodeName = "A"+(index+1);
            var node = context._constructedScene.node.getChildByName(nodeName);
            if(node) {
                node.setAnchorPoint(cc.p(0.5,0.5));
                node.setTitleFontSize(xc.storyFontSize);
                node.setTitleColor(xc.storyFontColor);
                node.setTitleFontName(xc.storyFontName);
                node.setTouchEnabled(true);
                var output = "";
                var secondOutput = "";
                var secondQTest = "";

                if(element.length > 18) {
                    var i = 18;
                    while(i != element.length && element.charAt(i) != " ")
                    {
                        i++;
                    }
                    output += element.substring(0,i);
                    output += "\n";
                    secondQTest = element.substring(i, element.length);

                    if(secondQTest.length > 18) 
                    {
                        var j = 18;
                        while(j != secondQTest.length && secondQTest.charAt(j) != " ")
                        {
                            j++;
                        }
                        secondOutput += secondQTest.substring(0,j);
                        secondOutput += "\n";
                        secondOutput += secondQTest.substring(j, secondQTest.length);

                    } else {
                        secondOutput = secondQTest;
                    }    

                    output += secondOutput;                        
                } else {
                    output = element;
                }

                cc.log("output:" + output);
                node.setTitleText(output);
                node.addTouchEventListener(context.answerSelected, context);
                if(element == this._question.answer) {
                    context._correctAnswerNode = nodeName;
                } 
            }
        }, this);
    } ,

    answerSelected: function(sender, type)
    {
        switch (type)
        {
            case ccui.Widget.TOUCH_BEGAN:
                break;

            case ccui.Widget.TOUCH_MOVED:                
                break;

            case ccui.Widget.TOUCH_ENDED:
                cc.log('clicked' + sender.getTitleText());
                this.verifyAnswer(sender);
                break;

            case ccui.Widget.TOUCH_CANCELLED:
                
                break;                
            }
    },
    
    scaleAnimation: function(correctAnswerNode) {
        var increase = new cc.ScaleTo(0.3, 1.2);
        var decrease = new cc.ScaleTo(0.3, 1); 
        var delay = new cc.DelayTime(1.0);
        var repeatAction = new cc.Repeat(new cc.Sequence(increase, decrease, delay), 3);
        var sequenceAction = new cc.Sequence(repeatAction, new cc.CallFunc(this.resetNumberOfIncorrectAnswered, this));
        correctAnswerNode.runAction(sequenceAction);          
    },

    resetNumberOfIncorrectAnswered: function() {
        this._numberOfTimesInCorrectAnswered = 0;        
    },

    showHintAnimation: function() {
        if(this._numberOfTimesInCorrectAnswered > 2) {
            //glow correct answer            
            var correctAnswerNode = this._constructedScene.node.getChildByName(this._correctAnswerNode);
            if(correctAnswerNode) {
               this.scaleAnimation(correctAnswerNode);                           
            }
        }

        this._inCorrectAnswerAnimationInProgress = false;
    },

    hintForCorrectAnswer: function(sender, isCorrectAnswered) {
        var context = this;
        if(!isCorrectAnswered) {
            if(this._inCorrectAnswerAnimationInProgress) {
                return;
            }            
            this._inCorrectAnswerAnimationInProgress = true;            
            this._numberOfTimesInCorrectAnswered++;
            var x = sender.getPosition().x;
            var y = sender.getPosition().y;
            var moveLeft = new cc.moveTo(0.1, cc.p(sender.getPosition().x - 20, sender.getPosition().y));
            var moveRight = new cc.moveTo(0.1, cc.p(sender.getPosition().x + 40, sender.getPosition().y));
            var moveOriginal = new cc.moveTo(0.1, cc.p(x, y));
            var repeatAction = new cc.Repeat(new cc.Sequence(moveLeft, moveRight), 3);
            var sequenceAction = new cc.Sequence(repeatAction, moveOriginal, new cc.CallFunc(this.showHintAnimation, this));
            sender.runAction(sequenceAction);          
            if(xc.NarrateStoryLayer.res.wrongAnswerSound_json) {
                cc.audioEngine.playEffect(xc.NarrateStoryLayer.res.wrongAnswerSound_json, false);
            }                                                                                    
        } else {
            this._numberOfTimesInCorrectAnswered = 0;
            if(xc.NarrateStoryLayer.res.correctAnswerSound_json) {
                cc.audioEngine.playEffect(xc.NarrateStoryLayer.res.correctAnswerSound_json, false);
            }  
            //disable all buttons
            context._answers.forEach(function(element, index) {
               var nodeName = "A"+(index+1);
                var node = context._constructedScene.node.getChildByName(nodeName);
                if(node) {
                    node.setTouchEnabled(false);
                    node.setEnabled(false);                 
                }                                                                
            });
        }

    },

    verifyAnswer: function(sender) {
        sender.setEnabled(false);
        var str2 = sender.getTitleText().replace(/\n|\r/g, "");
        var isCorrectAnswered = str2.trim().toLowerCase() === this._question.answer.trim().toLowerCase();
        this.hintForCorrectAnswer(sender, isCorrectAnswered);        
        this.callback.call(this._callbackContext, sender, isCorrectAnswered, isCorrectAnswered);

        if(this._help != null) {
            this._help.removeFromParent();
            this._help = null;
        }        
    }
});
