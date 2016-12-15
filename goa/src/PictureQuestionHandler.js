/// <reference path="cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />
var xc = xc || {};
xc.PictureQuestionHandler = cc.Layer.extend({
    _textContentMargin: 100,
    _width:0,
    _height: 0,
    _nodeJSON: "",
    _textContentMargin: 0,
    _constructedScene: null,    
    _answers:[],
    _numberOfTimesInCorrectAnswered: 0,
    _selectedQuestionForAnswer: null,
    _selectedAnswer: null,
    _totalCorrectAnswers: 0,
    _questionHelpNode: null,
    _unfinishedQuestions: [],
    _finishedQuestions: [],
    _baseDir: "",
    ctor: function (baseDir, nodeJSON, width, height, question, callback, callbackContext) {
        this._super(width, height);
        this._width = width;
        this._height = height;
        this.callback = callback;
        this._callbackContext = callbackContext;
        this._question = question;
        this._nodeJSON = nodeJSON;
        this._textContentMargin = 100;
        this._baseDir = baseDir;
        this.init();
    },

    init: function() {
        this.showQuestionTemplate();
        this.configureQuestions();
        this.configureAnswers();

        this.scheduleOnce(this.initQuestionHelp, 2);
    },

    initAnswerHelp: function() {
        if(!xc._PICTURE_HELP_SHOWN)
        {
            var context = this;
            if(this._answerHelpNode != null) {
                var box = this._answerHelpNode.getBoundingBox();
                this._answerHelp = new xc.HelpLayer(cc.rect(box.x + 50 + box.width/2, box.y + box.height/2, box.width + 50, box.height), cc.rect(0,0,10,10));
                this.addChild(this._answerHelp,4)
                this._answerHelp.click(this._answerHelpNode.x,this._answerHelpNode.y);
                xc._PICTURE_HELP_SHOWN = true;
            }
        }
    },


    initQuestionHelp: function() {
        if(!xc._PICTURE_HELP_SHOWN)
        {
            var context = this;
            var box = this._questionHelpNode.getBoundingBox();
            this._questionHelp = new xc.HelpLayer(cc.rect(box.x + 50 + box.width/2, box.y + box.height/2, box.width + 50 , box.height), cc.rect(0,0,10,10));
            this.addChild(this._questionHelp,4)
            this._questionHelp.click(this._questionHelpNode.x,this._questionHelpNode.y);
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

    configureQuestions: function() {
        //randomize array
        //find out question node
        var that = this;
        this._questions = Object.getOwnPropertyNames(this._question).map(function(element) {
                if(element !== 'type') return element
            }
        );

        this._questions = this._questions.filter(function( element ) {
            return element !== undefined;
        });

        this._questions = this._questions.map(function(n){ return [Math.random(), n] })
             .sort().map(function(n){ return n[1] });
        
        this._questions.forEach(function(question, index) {
            var nodeName = "Q"+(index+1);
            var node = that._constructedScene.node.getChildByName(nodeName);
            if(node) {
                if(index == 0) {
                    that._questionHelpNode = node;
                }
                
                node.selectedIndex = index;
                node.setAnchorPoint(cc.p(0.5,0.5));
                var imageUrl = xc.path + this._baseDir + "/" + question;
                if(cc.sys.isNative) {
                    var fileExists = jsb.fileUtils.isFileExist(imageUrl);
                    if(fileExists) {
                        var imageSprite = new cc.Sprite(xc.path + this._baseDir + "/" + question);
                        imageSprite.setAnchorPoint(cc.p(0.5,0.5));
                        imageSprite.setPosition(node.width/2, node.height/2);
                        node.addChild(imageSprite, 1);
                        node.setTitleFontSize(1.0);
                    } else {
                        node.setTitleFontSize(xc.storyFontSize);
                    }
                } else {
                        var imageSprite = new cc.Sprite(xc.path + this._baseDir + "/" + question);
                        imageSprite.setAnchorPoint(cc.p(0.5,0.5));
                        imageSprite.setPosition(node.width/2, node.height/2);
                        node.addChild(imageSprite, 1);
                        node.setTitleFontSize(xc.storyFontSize);
                        node.setTitleFontSize(1.0);
                }
                node.setTitleColor(xc.storyFontColor);
                node.setTitleFontName(xc.storyFontName);
                node.setTouchEnabled(true);
                node.setTitleText(question);
                node.addTouchEventListener(this.questionSelected, this);                
                node._isPressed = false;
                that._unfinishedQuestions.push(node);
            }
        }, this);
    },    

    configureAnswers: function() {
        var context = this;      
        context._answers = [];
        var obj = this._question;  
        Object.keys(context._question).forEach(function (key) {
            var val = context._question[key];
            context._answers.push(val);
    
        });
        
        this._answers = this._answers.filter(function(e) { return e !== "picture" });

        var alreadySelectedAnswers = [];

        this._answers.forEach(function(element, index) {
            var oQuestion = this._questions[index];
            if(this._question.hasOwnProperty(oQuestion)) {
                var realAnswer = this._question[oQuestion];
                cc.log('realAnswer:' + realAnswer);

                if(oQuestion == this._questionHelpNode.getTitleText()) {
                    context._correctAnswer = this._answers.filter(function(e) {
                        return e == realAnswer;
                    });

                    cc.log('correctAnswer:' + context._correctAnswer);      
                }

                var remainingAnswers = this._answers.filter(function(e) { 
                        return e!= realAnswer;
                    }
                );   

                remainingAnswers = remainingAnswers.filter(function(item) {
                    return alreadySelectedAnswers.indexOf(item) === -1;
                });

                if(remainingAnswers.length == 0) {
                    remainingAnswers = this._answers.filter(function(item) {
                        return alreadySelectedAnswers.indexOf(item) === -1;
                    });
                }

                if(remainingAnswers.length > 0) {
                    var rIndex = Math.floor(Math.random() * remainingAnswers.length);
                    alreadySelectedAnswers.push(remainingAnswers[rIndex]);
                    var nodeName = "A"+(index+1);
                    var node = this._constructedScene.node.getChildByName(nodeName);
                    if(node) {
                        node.setAnchorPoint(cc.p(0.5,0.5));
                        node.setTitleFontSize(xc.storyFontSize);
                        node.setTitleColor(xc.storyFontColor);
                        node.setTitleFontName(xc.storyFontName);
                        node.setTouchEnabled(true);
                        node.selectedIndex = index;
                        cc.log('remainingAnswers[rIndex]:' + remainingAnswers[rIndex]);
                        var output = "";
                        var qText = remainingAnswers[rIndex];
                        if(qText.length > 30) {
                            var i = 30;
                            while(i != qText.length && qText.charAt(i) != " ")
                            {
                                i++;
                            }
                            output += qText.substring(0,i);
                            output += "\n";
                            output += qText.substring(i, qText.length);
                        } else {
                            output = qText;
                        }
                        cc.log("output:" + output);
                        node.setTitleText(output);
                        cc.log("qText setting:" + output);
                        node.addTouchEventListener(this.answerSelected, this);
                    }                    
                }                             
            };
            
        }, this);

        var ans1 = this._constructedScene.node.getChildByName("A1");
        var ans2 = this._constructedScene.node.getChildByName("A2");
        var ans3 = this._constructedScene.node.getChildByName("A3");
        var ans4 = this._constructedScene.node.getChildByName("A4");
        

        if(ans1.getTitleText().replace(/\n|\r/g, "") == this._correctAnswer) {
            context._answerHelpNode = ans1;
        } else if(ans2.getTitleText().replace(/\n|\r/g, "") == this._correctAnswer) {
            context._answerHelpNode = ans2;
        } else if(ans3.getTitleText().replace(/\n|\r/g, "") == this._correctAnswer) {
            context._answerHelpNode = ans3;
        } else if(ans4.getTitleText().replace(/\n|\r/g, "") == this._correctAnswer) {
            context._answerHelpNode = ans4;
        }         
         
    },

    questionSelected:function(sender, type) {
        switch (type)
        {
            case ccui.Widget.TOUCH_BEGAN:
                
                this._finishedQuestions.forEach(function(n) {
                    n.setEnabled(false);
                });
                this._unfinishedQuestions.forEach(function(n) {
                    if(n && n.getName() != sender.getName()) {
                        n.setEnabled(false);
                    } else {
                        n.setEnabled(true);
                    }
                });
                if(this._questionHelp != null) {
                    this._questionHelp.setVisible(false);
                    this._questionHelp.setPosition(cc.p(0,0));                    
                    this._questionHelp.removeFromParent();
                    this._questionHelp = null;
                }
                // if(this._selectedQuestionForAnswer != null) {
                //     this._selectedQuestionForAnswer.setEnabled(true);
                //     this._selectedQuestionForAnswer.setHighlighted(false);
                // }                                      
                break;

            case ccui.Widget.TOUCH_ENDED:
                this._selectedQuestionForAnswer = sender;
                
                if(sender._isPressed) {
                    sender.setHighlighted(false);
                    sender._isPressed = false;

                    this._unfinishedQuestions.forEach(function(n) {
                        n.setEnabled(true);
                    });                    
                    this._selectedQuestionForAnswer = null;
                    this._selectedQuestionDrawNode.setVisible(false);
                    this._selectedQuestionDrawNode.removeFromParent();
                } else {
                    this._selectedQuestionDrawNode = new cc.DrawNode();
                    this._selectedQuestionDrawNode.drawRect(cc.p(this._selectedQuestionForAnswer.getBoundingBox().x + 50  ,this._selectedQuestionForAnswer.getBoundingBox().y), cc.p(this._selectedQuestionForAnswer.getBoundingBox().x + 50  + this._selectedQuestionForAnswer.getBoundingBox().width,this._selectedQuestionForAnswer.getBoundingBox().y + this._selectedQuestionForAnswer.getBoundingBox().height), cc.color(255,255,255,0), 10, cc.color(255,0,0,255));
                    this.addChild(this._selectedQuestionDrawNode);

                    sender.setHighlighted(true);
                    sender._isPressed = true;
                }
                                               
                if(!xc._PICTURE_HELP_SHOWN) {
                    this.initAnswerHelp();
                }
                
            break;
        }
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
                if(this._answerHelp != null) {
                    this._answerHelp.setVisible(false);
                    this._answerHelp.setPosition(cc.p(0,0));
                    this._answerHelp.removeFromParent();                    
                    this._answerHelp = null;
                }
                if(this._selectedQuestionForAnswer != null) {
                    this.verifyAnswer(sender, this._selectedQuestionForAnswer);
                    this._selectedQuestionForAnswer.setEnabled(true);                                        
                }
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
        var sequenceAction = new cc.Sequence(repeatAction, new cc.CallFunc(this.updateSelectedQuestionForAnswer, this));
        correctAnswerNode.runAction(sequenceAction);   
    },

    updateSelectedQuestionForAnswer: function() {
        this._numberOfTimesInCorrectAnswered = 0;                      
    },

    showHintAnimation: function(sender) {
        sender.setEnabled(true);
        if(this._numberOfTimesInCorrectAnswered > 2) {
            //glow correct question and answer      
            var aNode = null;      
            if(this._selectedQuestionForAnswer) {
               var aText = this._question[this._selectedQuestionForAnswer.getTitleText()];
               this._constructedScene.node.children.forEach(function(child) {                   
                  if(child.getName().startsWith("A"))
                  {                       
                      var str2 = child.getTitleText().replace(/\n|\r/g, "");
                      if(str2.trim().toLowerCase() == aText.trim().toLowerCase()) {
                            aNode = child;
                      }                      
                  }
               });
               this.scaleAnimation(this._selectedQuestionForAnswer);
                if(aNode) {
                    this.scaleAnimation(aNode);
                }                                          
            }
        }
    },

    hintForCorrectAnswer: function(sender, isCorrectAnswered) {
        if(!isCorrectAnswered) {
            this._numberOfTimesInCorrectAnswered++;
            var x = sender.getPosition().x;
            var y = sender.getPosition().y;
            sender.setEnabled(false);
            var moveLeft = new cc.moveTo(0.1, cc.p(sender.getPosition().x - 20, sender.getPosition().y));
            var moveRight = new cc.moveTo(0.1, cc.p(sender.getPosition().x + 40, sender.getPosition().y));
            var moveOriginal = new cc.moveTo(0.1, cc.p(x, y));
            var repeatAction = new cc.Repeat(new cc.Sequence(moveLeft, moveRight), 3);
            var sequenceAction = new cc.Sequence(repeatAction, moveOriginal, new cc.CallFunc(this.showHintAnimation, this, sender));
            
            sender.runAction(sequenceAction);   
            if(xc.NarrateStoryLayer.res.wrongAnswerSound_json) {
                cc.audioEngine.playEffect(xc.NarrateStoryLayer.res.wrongAnswerSound_json, false);
            } 
            this.callback.call(this._callbackContext, sender, false, false);                                                                                       
        } else {
            this._numberOfTimesInCorrectAnswered = 0;            
        }

    },

    swipeAnswers: function(sender, questionNode) {
        cc.log('sender:' + sender.selectedIndex);
        cc.log('questionNode:' + questionNode.selectedIndex);

        //get node at index of questionNode

        var node2NewName = "A"+(questionNode.selectedIndex+1);
        var node1 = this._constructedScene.node.getChildByName(node2NewName);

        var node1NewName = "A"+(sender.selectedIndex+1);
        var node2 = this._constructedScene.node.getChildByName(node1NewName);

        var moveNode2Action = new cc.moveTo(1.5, cc.p(node1.getPosition().x, node1.getPosition().y));
        var moveNode1Action = new cc.moveTo(1.5, cc.p(node2.getPosition().x, node2.getPosition().y));
        node1.runAction(new cc.Sequence(moveNode1Action, new cc.CallFunc(this.updateNodeName, this, node1NewName)));        
        node2.runAction(new cc.Sequence(moveNode2Action, new cc.CallFunc(this.disableNodesForCorrectAnswer, this, questionNode, node2NewName)));
        node2.setName(node2NewName);
        cc.log('disabled name 111:' + node2NewName);

        node1.selectedIndex = sender.selectedIndex;
        node2.selectedIndex = questionNode.selectedIndex;
      
    },

    updateNodeName:function(sender, nodeName) {
        cc.log('updated name 111:' + nodeName);
        sender.setName(nodeName);
    },
    

    disableNodesForCorrectAnswer:function(sender, questionNode) {
        sender.setEnabled(false);
        questionNode.setEnabled(false);

        this._unfinishedQuestions.forEach(function(n) {
            n.setEnabled(true);
        });

        this._selectedFinishedAnswerDrawNode = new cc.DrawNode();
        this._selectedFinishedAnswerDrawNode.drawRect(cc.p(sender.getBoundingBox().x + 50 ,sender.getBoundingBox().y), cc.p(sender.getBoundingBox().x + 50 + sender.getBoundingBox().width,sender.getBoundingBox().y + sender.getBoundingBox().height), cc.color(255,255,255,0), 10, cc.color(0,255,0,255));
        this.addChild(this._selectedFinishedAnswerDrawNode);

        this._selectedFinishedQuestionDrawNode = new cc.DrawNode();
        this._selectedFinishedQuestionDrawNode.drawRect(cc.p(questionNode.getBoundingBox().x + 50 ,questionNode.getBoundingBox().y), cc.p(questionNode.getBoundingBox().x + 50 + 
        questionNode.getBoundingBox().width,questionNode.getBoundingBox().y + questionNode.getBoundingBox().height), cc.color(255,255,255,0), 10, cc.color(0,255,0,255));
        this.addChild(this._selectedFinishedQuestionDrawNode);

        this._selectedQuestionForAnswer = null;
        
        if(this._totalCorrectAnswers == 4) {
            this.callback.call(this._callbackContext, sender, true, true);
        } else {
            this.callback.call(this._callbackContext, sender, true, false);
        }                           
    },

    verifyAnswer: function(sender, questionNode) {
        var context = this;
        var str2 = sender.getTitleText().replace(/\n|\r/g, "");
        var isCorrectAnswered = str2.trim().toLowerCase() === this._question[questionNode.getTitleText().trim()].trim().toLowerCase();

        this._unfinishedQuestions = this._unfinishedQuestions.filter(function(item) {
            return item.getName() != questionNode.getName();
        });
        
        if(isCorrectAnswered) {
            if(xc.NarrateStoryLayer.res.correctAnswerSound_json) {
                cc.audioEngine.playEffect(xc.NarrateStoryLayer.res.correctAnswerSound_json, false);
            }                                          

            this._totalCorrectAnswers++;
            this.swipeAnswers(sender, questionNode);
            this._finishedQuestions.push(questionNode);
            this._selectedQuestionForAnswer._isPressed = false;
            this._selectedQuestionForAnswer.setHighlighted(false);

            this._selectedQuestionDrawNode.setVisible(false);
            this._selectedQuestionDrawNode.removeFromParent();
        } else {
            this.hintForCorrectAnswer(sender, isCorrectAnswered);
            this._selectedQuestionForAnswer._isPressed = true;
            this._selectedQuestionForAnswer.setHighlighted(true);
        }
    }
});
