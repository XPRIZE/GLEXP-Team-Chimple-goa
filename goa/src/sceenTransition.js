/// <reference path="cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />
var xc = xc || {};
xc.SceenTransitionLayer = cc.LayerGradient.extend({
    _storyInformation:null,
    _pageIndex: 0,    
    ctor: function (pageIndex, storyInformation) {
        this._super();
        this._name = "SceenTransitionLayer";        
        this._storyInformation = storyInformation;
        this._pageIndex = pageIndex;
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
        xc.NarrateStoryScene.load(this._pageIndex, this._storyInformation, xc.NarrateStoryLayer, true);        
    }

});

xc.SceenTransitionScene = cc.Scene.extend({
    layerClass: null,
    _menuContext: null,
    ctor: function (pageIndex, storyInformation,layer) {
        this._super();
        this.layerClass = layer;
        this._sceneLayer = new this.layerClass(pageIndex, storyInformation);
        this.addChild(this._sceneLayer);
        this._sceneLayer.init();        
    }
});


xc.SceenTransitionScene.load = function(pageIndex, storyInformation, layer) {
    var that = this;
    var scene = new xc.SceenTransitionScene(pageIndex, storyInformation, layer);
    scene.layerClass = layer;
    cc.director.runScene(new cc.TransitionFade(0.5, scene, true));

}

xc.SceenTransitionLayer.res = {
};