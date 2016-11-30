/// <reference path="cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />
var xc = xc || {};
xc.storyFontName = "Arial";
xc.storyFontSize = 90;
xc.storyFontColor = cc.color.BLACK;
xc.StoryQuestionHandlerLayer = cc.Layer.extend({
    _contentPanel: null,
    _pageConfigPanel: null,
    _storyBaseDir: "",
    _questions: [],
    _currentQuestionIndex: 0,
    _contentPanelWidth: null,
    _configPanelWidth: null,
    _Q_MULTIPLE_CHOICE: "multiple_choice",
    _Q_FILL_IN_THE_BLANKS:"fill_in_the_blanks",
    _Q_MEANINGS:"meanings",
    _Q_PICTURES:"picture",
    _Q_WORDS: "words",    
    _currentQName: null,    
    ctor: function (storyBaseDir) {
        this._super();
        this._name = "StoryQuestionHandlerLayer";
        this._tabHeight = 64;
        this._storyBaseDir = storyBaseDir;
        this._controlPanel = null;
        this._contentPanelWidth = cc.director.getWinSize().width; //assuming landscape
        this._contentPanelHeight = cc.director.getWinSize().height; //assuming landscape
        this._configPanelWidth = (cc.director.getWinSize().width - this._contentPanelWidth) / 2;

        return true;
    },


    displayText:function(text, location) {
        var texts = text.split("_");
        if(texts && texts.length > 0) {
            var langText = texts[0];
            cc.log('text:' + langText.toLowerCase());
            this._text = new cc.LabelTTF(text, "Arial", 100)
            this._text.setName("wordMeaning");
            this._text.color = new cc.Color(255, 255, 255);
            this._text.setPosition(location.x, location.y + 1000);
            this.addChild(this._text);
            var textDropAction = new cc.MoveTo(0.5, cc.p(location.x, location.y));
            textDropAction.easing(cc.easeBackOut());
            this._text.runAction(textDropAction);            
        }
        
    },

    init: function () {
        cc.log('this._storyBaseDir:' + this._storyBaseDir);
        this.loadQuestions();
        
    },

    questionHandler: function(question) {
        if(this._currentQName) {
            var oldQuestionChild = this.getChildByName(this._currentQName);
            oldQuestionChild.removeFromParent();
        }
        var questionType = question["type"];
        if(questionType == this._Q_MULTIPLE_CHOICE) {
            cc.log('handle multiple choice question');
            var handler = new xc.MultipleChoiceQuestionHandler(xc.StoryQuestionHandlerLayer.res.multi_question_choice_json, cc.director.getWinSize().width, cc.director.getWinSize().height, question, this.questionCallBack, this);
            handler.setName(this._Q_MULTIPLE_CHOICE); 
            this._currentQName = this._Q_MULTIPLE_CHOICE;          
        } else if(questionType == this._Q_FILL_IN_THE_BLANKS) {
            var handler = new xc.FillInTheBlanksQuestionHandler(xc.StoryQuestionHandlerLayer.res.multi_question_choice_json, cc.director.getWinSize().width, cc.director.getWinSize().height, question, this.questionCallBack, this);
            handler.setName(this._Q_FILL_IN_THE_BLANKS); 
            this._currentQName = this._Q_FILL_IN_THE_BLANKS;          
        } else if(questionType == this._Q_MEANINGS) {
            var handler = new xc.MeaningQuestionHandler(xc.StoryQuestionHandlerLayer.res.meaning_question_choice_json, cc.director.getWinSize().width, cc.director.getWinSize().height, question, this.questionCallBack, this);
            handler.setName(this._Q_MEANINGS); 
            this._currentQName = this._Q_MEANINGS;          
        } else if(questionType == this._Q_WORDS && cc.sys.isNative) {
            var handler = new xc.WordQuestionHandler(cc.director.getWinSize().width, cc.director.getWinSize().height, question, this.questionCallBack, this);
            handler.setName(this._Q_WORDS); 
            this._currentQName = this._Q_WORDS;          
        } 
        this.addChild(handler);        
    },

    questionCallBack: function(sender, isCorrect) {
        //play animation for correct/incorrect answer, update score and move to next question
        this.updateScore(isCorrect);
        this.postAnswerAnimation(isCorrect);
    },

    updateScore: function(isCorrect) {
        cc.log("update score for answer :" + isCorrect);
    },
    
    postAnswerAnimation: function(isCorrect) {
        cc.log("postAnswerAnimation for answer :" + isCorrect);
        //move to next
        if(isCorrect) {
            this.nextQuestion();
        }
    },

    nextQuestion: function () {
        this._currentQuestionIndex++;
        if(this._currentQuestionIndex < this._questions.length) {
            var question = this._questions[this._currentQuestionIndex];
            this.questionHandler(question);                
        }
    },

    loadQuestions: function() {
        var langDir = goa.TextGenerator.getInstance().getLang();
        cc.log("langDir:" + langDir);
        var storyText = "";
        var that = this;
        var questionFileUrl =  "res/story" + "/" + langDir + "/" + this._storyBaseDir + ".questions.json";
        cc.log('questionFileUrl:' + questionFileUrl);

        if(cc.sys.isNative) {
            var fileExists = jsb.fileUtils.isFileExist(questionFileUrl);
            if(fileExists) {
                cc.loader.loadJson(questionFileUrl, function(err, json) {            
                    if(!err && json != null && json != undefined) {
                        cc.log('story questions received:' + json);
                        that.buildQuestions(json);
                    }                                
                });                           
            } 
        } else {
            cc.loader.loadJson(questionFileUrl, function(err, json) {            
                if(!err && json != null && json != undefined) {
                    cc.log('story questions received:' + json);
                    that.buildQuestions(json);                    
                }                                
            });                            
        }    
    },

    buildQuestions: function (json) {
        //build questions array for easy looping based on index
        this.processQuestions(json[this._Q_MULTIPLE_CHOICE], this._Q_MULTIPLE_CHOICE);
        this.processQuestions(json[this._Q_FILL_IN_THE_BLANKS], this._Q_FILL_IN_THE_BLANKS);
        this.processQuestions(json[this._Q_MEANINGS], this._Q_MEANINGS);
        this.processQuestions(json[this._Q_PICTURES], this._Q_PICTURES);
        if(cc.sys.isNative) {
            this.processQuestions(json[this._Q_WORDS], this._Q_WORDS);
        }
                
        cc.log("questions:" + this._questions);

        //create UI for questions
        var question = this._questions[this._currentQuestionIndex];
        this.questionHandler(question);        
    },

    processQuestions: function (array, type) {
        if(array && array.length > 0) {
            array = array.map(function(question, index){
                if(typeof question === 'object') {
                    question["type"]=type;
                    return question;                     
                } else {
                    questionO = {};
                    questionO["word"] = question;
                    questionO["type"] = type;
                    return questionO;
                }                
            });
            this._questions = this._questions.concat(array);
        }
    }
});

xc.StoryQuestionHandlerScene = cc.Scene.extend({
    layerClass: null,
    _menuContext: null,
    ctor: function (storyBaseDir, layer) {
        this._super();
        this.layerClass = layer;
        this._sceneLayer = new this.layerClass(storyBaseDir);
        this.addChild(this._sceneLayer);
        this._sceneLayer.init();

        if (cc.sys.isNative) {
            this._menuContext = goa.MenuContext.create(this._sceneLayer, "Narrate Story");
            this.addChild(this._menuContext);
            this._menuContext.setVisible(true);
        }                                        
    }
});


xc.StoryQuestionHandlerScene.load = function(storyBaseDir, layer, enableTransition) {
    var that = this;
    var t_resources = [];
   
    if(storyBaseDir != null) {           
        for (var i in layer.res) {
            cc.log('preloading:' + layer.res[i]);
            t_resources.push(layer.res[i]);
        }        
        cc.LoaderScene.preload(t_resources, function () {
            if(cc.sys.isNative) {
                xc.storyQuestionConfigurationObject = cc.loader.getRes(xc.StoryQuestionHandlerLayer.res.storyQuestionsConfig_json);                         
            } else {
                xc.storyQuestionConfigurationObject = cc.loader.cache[xc.StoryQuestionHandlerLayer.res.storyQuestionsConfig_json];
            }
            var scene = new xc.StoryQuestionHandlerScene(storyBaseDir, layer);
            scene.layerClass = layer;            
            if(enableTransition) {
                cc.director.runScene(new cc.TransitionFade(2.0, scene, true));
            }  else {
                cc.director.runScene(scene);
            }              
        }, this);            
    }
}

xc.StoryQuestionHandlerLayer.res = {
        storyQuestionsConfig_json: xc.path + "misc/storyQuestionsConfig.json",
        multi_question_choice_json: xc.path + "template/template.json",
        picture_question_choice_json: xc.path + "template/template_1.json",
        meaning_question_choice_json: xc.path + "template/template_2.json",
        multi_question_choice_plist: xc.path + "template/template.plist",
        multi_question_choice_png: xc.path + "template/template.png"       
};