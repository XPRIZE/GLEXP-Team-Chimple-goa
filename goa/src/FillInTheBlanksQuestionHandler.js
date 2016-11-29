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
    },

    showQuestionTemplate: function() {
        this._constructedScene = ccs.load(this._nodeJSON,xc.path);
        this._constructedScene.node.retain();
        
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
            this._questionNode.setTitleFontSize(60);
            this._questionNode.setTouchEnabled(false);
            var qText = this._question.question.replace(this._question.answer, Array(this._question.answer.length + 1).join("_"));
            this._questionNode.setTitleText(qText);
        }
    },    

    // configureQuestion: function() {
    //     var questionChild = new ccui.TextField();
    //     var qText = this._question.question.replace(this._question.answer, Array(this._question.answer.length + 1).join("_"));
    //     if(questionChild) {
    //         questionChild.setTouchEnabled(false);
    //         questionChild.setFontSize(72);
    //         questionChild.setTextColor(cc.color.BLACK);
    //         questionChild.setAnchorPoint(0.5, 0.5);
    //         questionChild.setPosition(this._width / 2, this._height - 4 * this._textContentMargin);
    //         questionChild.setMaxLengthEnabled(true);
    //         questionChild.setMaxLength(this._width - 250);
    //         questionChild.ignoreContentAdaptWithSize(false);
    //         questionChild.setPlaceHolderColor(cc.color.BLACK);
    //         questionChild.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
    //         questionChild.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_TOP);
    //         questionChild.setContentSize(cc.size(this._width * 0.9 , this._height * 0.3));
    //         questionChild.setString(qText);
    //         this.addChild(questionChild, 0);            
    //     }
    // },


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
                node.setTitleFontSize(60);
                node.setTouchEnabled(true);
                node.setTitleText(element);
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
        var c1 = new cc.TintTo(1.5, 0, 0, 255);
        var c2 = new cc.TintTo(1.5, 255, 255, 255);
        var delay = new cc.DelayTime(1.5);
        var repeatAction = new cc.Repeat(new cc.Sequence(c1, c2, delay), 3);
        var sequenceAction = new cc.Sequence(repeatAction, new cc.CallFunc(this.resetNumberOfIncorrectAnswered, this));
        correctAnswerNode.runAction(sequenceAction);          
    },

    resetNumberOfIncorrectAnswered: function() {
        this._numberOfTimesInCorrectAnswered = 0;        
    },


    hintForCorrectAnswer: function(isCorrectAnswered) {
        if(!isCorrectAnswered) {
            this._numberOfTimesInCorrectAnswered++;
        } else {
            this._numberOfTimesInCorrectAnswered = 0;
        }

        if(this._numberOfTimesInCorrectAnswered >= 2) {
            //glow correct answer
            
            var correctAnswerNode = this._constructedScene.node.getChildByName(this._correctAnswerNode);
            if(correctAnswerNode) {
               this.scaleAnimation(correctAnswerNode);               
            }
        }
    },

    animateFillInBlanks: function(isCorrectAnswered, sender) {
        if(isCorrectAnswered) {
            this._label = new cc.LabelTTF(sender.getTitleText(), "Arial", 72.0);
            this._label.setColor(cc.color.BLACK);
            this._label.attr({
                x: sender.getPosition().x,
                y: sender.getPosition().y
            });

            this.addChild(this._label, 1);
            var move = new cc.MoveTo(2.5, this._questionNode.getPosition());
            this._label.runAction(new cc.Sequence(move, new cc.CallFunc(this.cleanUpLabel, this, sender)));            
        }
    },

    cleanUpLabel: function(sender) {
        this._label.removeFromParent();
        this._questionNode.setTitleText(this._question.question);
        var delay = new cc.DelayTime(1);
        var sequenceAction = new cc.Sequence(delay, new cc.CallFunc(this.executeCallBack, this, sender));
        this.runAction(sequenceAction);        
    },

    executeCallBack: function(sender) {
        this.callback.call(this._callbackContext, sender, true);
    },

    verifyAnswer: function(sender) {
        var isCorrectAnswered = sender.getTitleText().toLowerCase() === this._question.answer.toLowerCase();
        this.hintForCorrectAnswer(isCorrectAnswered);
        this.animateFillInBlanks(isCorrectAnswered, sender);               
    }
});
