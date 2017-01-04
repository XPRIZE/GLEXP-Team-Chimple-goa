/// <reference path="cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />
var xc = xc || {};
xc.StoryQuestionTransitionLayer = cc.LayerGradient.extend({
    _storyId: null, 
    _baseDir: null,
    ctor: function (storyId, baseDir) {
        this._super();
        this._name = "StoryQuestionTransitionLayer";        
        this._storyId = storyId;
        this._baseDir = baseDir;
        return true;
    },

    init: function() {
        this.setContentSize(cc.director.getWinSize().width, cc.director.getWinSize().height);
        var loadingSprite = new cc.Sprite(xc.path + 'loading_image.png');
        loadingSprite.setAnchorPoint(cc.p(0.5,0.5));
        loadingSprite.setPosition(cc.director.getWinSize().width/2, cc.director.getWinSize().height/2);
        this.addChild(loadingSprite,1);
        this.scheduleOnce(this.transitToScene, 1);                  
    },

    transitToScene: function() {
        var that = this;
        xc.StoryQuestionHandlerScene.load(this._storyId, this._baseDir, xc.StoryQuestionHandlerLayer, true);        
    }

});

xc.StoryQuestionTransitionScene = cc.Scene.extend({
    layerClass: null,
    _menuContext: null,
    ctor: function (storyId, baseDir,layer) {
        this._super();
        this.layerClass = layer;
        this._sceneLayer = new this.layerClass(storyId, baseDir);
        this.addChild(this._sceneLayer);
        this._sceneLayer.init();        
    }
});


xc.StoryQuestionTransitionScene.load = function(storyId, baseDir, layer) {
    var that = this;
    var scene = new xc.StoryQuestionTransitionScene(storyId, baseDir, layer);
    scene.layerClass = layer;
    cc.director.runScene(new cc.TransitionFade(0.5, scene, true));

}

xc.StoryQuestionTransitionLayer.res = {
};