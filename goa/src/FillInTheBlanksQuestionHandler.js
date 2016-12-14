/// <reference path="cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />
var xc = xc || {};
xc.FillInTheBlanksQuestionHandler = cc.Layer.extend({
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
        this.scheduleOnce(this.initHelp, 2);        
    },

    initHelp: function() {
        if(!xc._FILL_IN_THE_BLANKS_HELP_SHOWN)
        {
            var context = this;
            var correctAnswerNode = this._constructedScene.node.getChildByName(context._correctAnswerNode);
            var box = correctAnswerNode.getBoundingBox();
            this._help = new xc.HelpLayer(cc.rect(box.x + 50 + box.width/2, box.y + box.height/2, box.width + 50 , box.height), cc.rect(0,0,10,10));
            this.addChild(this._help,4)
            this._help.click(correctAnswerNode.x,correctAnswerNode.y);
            xc._FILL_IN_THE_BLANKS_HELP_SHOWN = true;            
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

        this._questionNode = this._constructedScene.node.getChildByName("Q1");
        if(this._questionNode) {
            this._questionNode.setAnchorPoint(cc.p(0.5,0.5));
            this._questionNode.setFontSize(xc.storyFontSize);
            this._questionNode.setTextColor(xc.storyFontColor);
            this._questionNode.setFontName(xc.storyFontName);
            this._questionNode.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
            this._questionNode.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            this._questionNode.setTouchEnabled(false);
            var qText = this._question.question.replace(this._question.answer, Array(this._question.answer.length + 1).join("_"));
            this._questionNode.setString(qText);            
        }
    },    

    isEven: function (n) {
        return n % 2 == 0;
    },

    isOdd: function (n) {
        return Math.abs(n % 2) == 1;
    },


    configureAnswers: function() {
        var context = this;
        this._answers = this._answers.concat(this._question.choices);
        this._answers = this._answers.concat([this._question.answer]);
        this._answers = this._answers.map(function(n){ return [Math.random(), n] })
             .sort().map(function(n){ return n[1] });

        this._answers.forEach(function(element, index) {
            var nodeName = "A"+(index+1);
            var node = this._constructedScene.node.getChildByName(nodeName);
            if(node) {
                node.setAnchorPoint(cc.p(0.5,0.5));
                node.setTitleFontSize(xc.storyFontSize);
                node.setTitleColor(xc.storyFontColor);
                node.setTitleFontName(xc.storyFontName);
                node.setTouchEnabled(true);
                var output = "";
                if(element.length > 30) {
                    var i = 30;
                    while(i != element.length && element.charAt(i) != " ")
                    {
                        i++;
                    }
                    output += element.substring(0,i);
                    output += "\n";
                    output += element.substring(i, element.length);
                } else {
                    output = element;
                }
                cc.log("output:" + output);
                node.setTitleText(output);
                node.addTouchEventListener(this.answerSelected, this);
                if(element == this._question.answer) {
                    context._correctAnswerNode = nodeName;
                } 
            }
        }, this);
    },

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
        var increase = new cc.ScaleTo(0.5, 1.2);
        var decrease = new cc.ScaleTo(0.5, 1); 
        var delay = new cc.DelayTime(1);
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
                }                                                                
            });                                                   
        }

    },

    animateFillInBlanks: function(isCorrectAnswered, sender) {
        if(isCorrectAnswered) {
            this._label = new cc.LabelTTF(sender.getTitleText(), xc.storyFontName, xc.storyFontSize);
            this._label.setColor(xc.storyFontColor);
            this._label.attr({
                x: sender.getPosition().x,
                y: sender.getPosition().y
            });
            sender.setTitleText("");
            this.addChild(this._label, 1);
            var increase = new cc.ScaleTo(1, 2.0);
            var decrease = new cc.ScaleTo(1, 1);
            var sequenceAction = new cc.Sequence(increase, decrease, new cc.CallFunc(this.cleanUpLabel, this, sender));            
            this._label.runAction(sequenceAction);            
        } else {
            this.callback.call(this._callbackContext, sender, false, false);
        }
    },

    cleanUpLabel: function(sender) {
        this._label.removeFromParent();
        this._questionNode.setString(this._question.question);
        var delay = new cc.DelayTime(1);
        var sequenceAction = new cc.Sequence(delay, new cc.CallFunc(this.executeCallBack, this, sender));
        this.runAction(sequenceAction);        
    },

    executeCallBack: function(sender) {
        this.callback.call(this._callbackContext, sender, true, true);
    },

    verifyAnswer: function(sender) {
        var str2 = sender.getTitleText().replace(/\n|\r/g, "");
        var isCorrectAnswered = sender.getTitleText().trim().toLowerCase() === this._question.answer.trim().toLowerCase();
        this.hintForCorrectAnswer(sender, isCorrectAnswered);
        this.animateFillInBlanks(isCorrectAnswered, sender);

        if(this._help != null) {
            this._help.removeFromParent();
            this._help = null;
        }        
                       
    }
});
