/// <reference path="cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />

var xc = xc || {};

xc.LAYER_EDIT_STORY = false;
xc.STORY_KEY = xc.path + "wikitaki/xcStory.json";


xc.EditStoryLayer = cc.Layer.extend({
    _contentPanel: null,
    _pageConfigPanel: null,
    _objectConfigPanel: null,
    _contentPanelWidth: null,
    _configPanelWidth: null,
    _configPanelHeight: null,    
    ctor: function () {
        this._super();
        this._name = "StoryLayer";
        this._controlPanel = null;
        this._contentPanelWidth = cc.director.getWinSize().height; //assuming landscape
        this._configPanelWidth = (cc.director.getWinSize().width - this._contentPanelWidth) / 2;
        this._configPanelHeight = cc.director.getWinSize().height;
        return true;
    },

    init: function () {
        if (xc.storyConfigurationObject) {
            //backgrounds, characters and pops, texts
            var mainConfigurationItems = Object.getOwnPropertyNames(xc.storyConfigurationObject.addObjects);
            //Construct UI
            this._contentPanel = new xc.ContentPanel(this._contentPanelWidth, this._contentPanelWidth, cc.p(this._configPanelWidth, 0));
            this.addChild(this._contentPanel);
            this._objectConfigPanel = new xc.ObjectConfigPanel(this._configPanelWidth, this._configPanelHeight, cc.p(this._configPanelWidth + this._contentPanelWidth, 0), xc.storyConfigurationObject, this._contentPanel);
            this.addChild(this._objectConfigPanel);
            this._contentPanel._objectConfigPanel = this._objectConfigPanel;
            this._pageConfigPanel = new xc.PageConfigPanel(this._configPanelWidth, this._configPanelHeight, cc.p(0, 0), xc.storyConfigurationObject, this._contentPanel);
            this.addChild(this._pageConfigPanel);
        }
    }

});

xc.EditStoryScene = cc.Scene.extend({
    _isNewPage: null,
    _pageIndex: null,
    layerClass: null,
    ctor: function (layer) {
        this._super();
        this.layerClass = layer;
        //creating custom characters cache
        if (xc.LAYER_EDIT_STORY === false) {
            xc.LAYER_EDIT_STORY = true;
            cc.log('initing layer...should only be once');
            if (xc.isNewPage) {
                this.createStoryPage();
            } else {
                this.displayExistingPage();
            }
        }
    },

    createStoryPage: function () {
        var newPage = {};
        var len = xc.story.items.length;
        newPage.pageNumber = len + 1;
        newPage.cIcon = "icons/page.png";
        newPage.icon = "icons/page.png";
        newPage.scene = {};        
        xc.story.items.push(newPage);
        this._sceneLayer = new this.layerClass();
        this.addChild(this._sceneLayer);
        this._sceneLayer.init();
    },

    displayExistingPage: function () {
        //read JSON and find pageIndex
        // var pageJSON = this._pages["items"][this._pageIndex];
        // localStorage.setItem(xc.STORY_KEY, JSON.stringify(pageJSON.scene));
        this._sceneLayer = new this.layerClass();
        this.addChild(this._sceneLayer);
        this._sceneLayer.init();
    }
});


xc.EditStoryScene.load = function(layer) {
    var t_resources = [];
    for (var i in layer.res) {
        cc.log('preloading:' + layer.res[i]);
        t_resources.push(layer.res[i]);
    }

    cc.spriteFrameCache.addSpriteFrames(xc.StoryLayer.res.thumbnails_plist);
    cc.spriteFrameCache.addSpriteFrames(xc.StoryLayer.res.record_animation_plist);
    cc.LoaderScene.preload(t_resources, function () {            
        
    var scene = new xc.EditStoryScene(layer);
    scene.layerClass = layer;
    cc.director.runScene(scene);                                      

    }, this);
}


xc.EditStoryLayer.res = {
        thumbnails_png: xc.path + "wikitaki/thumbnails.png",
        thumbnails_plist: xc.path + "wikitaki/thumbnails.plist",
        // human_skeleton_png: xc.path + "wikitaki/human_skeleton.png",
        // human_skeleton_plist: xc.path + "wikitaki/human_skeleton.plist",
        animalskeleton_png: xc.path + "wikitaki/animalskeleton.png",
        animalskeleton_plist: xc.path + "wikitaki/animalskeleton.plist",
        animalskeleton_json: xc.path + "wikitaki/animalskeleton.json",
        birdskeleton_png: xc.path + "wikitaki/birdskeleton.png",
        birdskeleton_plist: xc.path + "wikitaki/birdskeleton.plist",
        birdskeleton_json: xc.path + "wikitaki/birdskeleton.json",
        HelloWorld_png: xc.path + "wikitaki/HelloWorld.png",
        // human_skeleton_json: xc.path + "wikitaki/human_skeleton.json",
        play_png: xc.path + "wikitaki/play.png",
        record_animation_png: xc.path + "wikitaki/recording.png",
        record_animation_plist: xc.path + "wikitaki/recording.plist",
        Config_json: xc.path + "wikitaki/misc/storyConfig.json",
        EditPlayConfig_json: xc.path + "wikitaki/misc/playConfig.json",
        OnlyStoryPlayConfig_json: xc.path + "wikitaki/misc/onlyPlayConfig.json",
        human_skeleton_json: xc.path + "human_skeleton.json",
        animation_skeleton_png: xc.path + "animation/animation.png",
        animation_skeleton_plist: xc.path + "animation/animation.plist",
        animationa_skeleton_png: xc.path + "animation/animationa/animationa.png",
        animationa_skeleton_plist: xc.path + "animation/animationa/animationa.plist",
        animationb_skeleton_png: xc.path + "animation/animationb/animationb.png",
        animationb_skeleton_plist: xc.path + "animation/animationb/animationb.plist",
        animationc_skeleton_png: xc.path + "animation/animationc/animationc.png",
        animationc_skeleton_plist: xc.path + "animation/animationc/animationc.plist"        
};


