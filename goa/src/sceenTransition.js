/// <reference path="cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />
var xc = xc || {};
xc.SceenTransitionLayer = cc.Layer.extend({
    _contentPanel: null,
    _pageConfigPanel: null,
    _storyIndex: 0,
    _objectConfigPanel: null,
    _contentPanelWidth: null,
    _configPanelWidth: null,
    _configPanelHeight: null,
    _isTitleDisplayed: false,
    _playEnded: false,
    _playStarted: false,
    _nodeToFileNameMapping: {},
    _nodeToCurrentVerticesMapping: {},
    _menuContext: null,
    _wordMapping: {},
    _storyEnded: false,
    _resources: [],
    _content_resources: [],
    ctor: function (pageIndex, storyInformation, resources, content_resources) {
        this._super();
        this._name = "NarrateStoryLayer";
        this._tabHeight = 64;
        this._pageIndex = pageIndex;
        this._storyInformation = storyInformation;
        this._controlPanel = null;
        this._contentPanelWidth = cc.director.getWinSize().width; //assuming landscape
        this._contentPanelHeight = cc.director.getWinSize().height; //assuming landscape
        this._configPanelWidth = (cc.director.getWinSize().width - this._contentPanelWidth) / 2;
        this._nodeToFileNameMapping = {};
        this._nodeToCurrentVerticesMapping =  {};     
        this._wordMapping = {};   
        this._storyEnded = false;
        this._resources = resources;
        this._content_resources = content_resources;

        return true;
    },
    
    onExit: function() {        
        this._super();
        var that = this;
        if(cc.audioEngine.isMusicPlaying()) {
            cc.audioEngine.stopMusic();
        }

        //if story ended playing then release all resources
        
            that._content_resources.forEach(function(url) {                
                if(url.endsWith(".json")) {
                    cc.log('cleaning url:' + url);
                    cc.loader.release(url);
                    delete cc.loader[url];
                    
                };                
            });
                
            if(that._storyEnded) {

                that._resources.forEach(function(url) {                
                    if(url.endsWith(".json")) {
                        cc.log('cleaning url:' + url);
                        cc.loader.release(url);
                        delete cc.loader[url];                        
                    };                
                });
                
                that._resources.forEach(function(url) {                    
                    if(url.endsWith(".plist")) {
                        cc.log('cleaning url:' + url);
                        cc.spriteFrameCache.removeSpriteFramesFromFile(url);
                        cc.loader.release(url);
                        delete cc.loader[url];                        
                    };   

                    if(url.endsWith(".png")) {
                        cc.log("removing image: " + url);
                        cc.textureCache.removeTextureForKey(url);
                        cc.loader.release(url);
                        delete cc.loader[url]
                    }                                 
                });

                that._resources = [];  
                that._content_resources = [];                      
            }
    }

});

xc.SceenTransitionScene = cc.Scene.extend({
    layerClass: null,
    _menuContext: null,
    ctor: function (pageIndex, storyInformation, resources, content_resources, layer) {
        this._super();
        this.layerClass = layer;
        this._sceneLayer = new this.layerClass(pageIndex, storyInformation, resources, content_resources);
        this.addChild(this._sceneLayer);
        

        if (cc.sys.isNative) {
            var storyId = storyInformation["storyId"];
            this._menuContext = goa.MenuContext.create(this._sceneLayer, storyId);
            this.addChild(this._menuContext, 10);
            this._menuContext.setVisible(true);
        }                        

        this._sceneLayer.init(this._menuContext);        
    }
});


xc.SceenTransitionLayer.load = function(pageIndex, storyInformation, layer, enableTransition) {
    var that = this;
    cc.LoaderScene.preload(t_resources, function () {
        // cc.spriteFrameCache.addSpriteFrames(xc.NarrateStoryLayer.res.template_plist);
        // cc.spriteFrameCache.addSpriteFrames(xc.NarrateStoryLayer.res.template_01_plist);
        // cc.spriteFrameCache.addSpriteFrames(xc.NarrateStoryLayer.res.template_02_plist);    
        //config data
        var scene = new xc.NarrateStoryScene(pageIndex, storyInformation, layer);
        scene.layerClass = layer;
        if(enableTransition) {
            cc.director.runScene(new cc.TransitionFade(2.0, scene, true));
        }  else {
            cc.director.runScene(scene);
        }              
    }, this);    
}



xc.SceenTransitionLayer.res = {
};