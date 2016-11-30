/// <reference path="cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />
var xc = xc || {};
xc.WordQuestionHandler = cc.Layer.extend({
    _textContentMargin: 100,
    _width:0,
    _height: 0,
    _constructedScene: null,    
    _answers:[],
    _numberOfTimesInCorrectAnswered: 0,
    _selectedQuestionForAnswer: null,
    _selectedAnswer: null,
    _totalCorrectAnswers: 0,
    ctor: function (width, height, question, callback, callbackContext) {
        this._super(width, height);
        this._width = width;
        this._height = height;
        this.callback = callback;
        this._callbackContext = callbackContext;
        this._question = question;
        this.init();
    },

    init: function() {
        var board = goa.WordBoard.createSceneWithWord(this._question["word"]);
        this.addChild(board,0);
    }
});
