/// <reference path="cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />
var xc = xc || {};
xc.WordQuestionHandler = cc.Layer.extend({
    _width:0,
    _height: 0,
    _baseDir: "",
    _totalPoints: 0,
    _currentPoint: 0,
    _storyId: null,
    ctor: function (storyId, width, height, question, baseDir, totalPoints, currentPoint) {
        this._super(width, height);
        this._width = width;
        this._height = height;
        this._question = question;
        this._storyId = storyId;
        this._baseDir = baseDir;
        this._totalPoints = totalPoints;
        this._currentPoint = currentPoint;
        this.init();
    },

    init: function() {
        var array = this._question.map(function(n) { return n["word"] });

        array = array.filter(function( element ) {
            return element !== undefined;
        });

        cc.log("totalPoints in WordQuestionHandler %d", this._totalPoints);
        cc.log("currentPoint in WordQuestionHandler %d", this._currentPoint);
        var board = goa.StoryWordBoard.createSceneWithWords(this._storyId, array, 0, this._baseDir, this._totalPoints, this._currentPoint);
        this.addChild(board,0);
    }
});
