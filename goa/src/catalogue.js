/// <reference path="cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />
var xc = xc || {};
xc.HAND_GEAR_LEFT = "hand_gear_left"; 
xc.LAYER_INIT = false;
xc.PRIMARY_COLOR = cc.color("#FF8E88");
xc.DARK_PRIMARY_COLOR = cc.color("#B2524D");
xc.SECONDARY_COLOR = cc.color("#5895CC");
xc.DARK_SECONDARY_COLOR = cc.color("#ee0a21");
xc.TERTIARY_COLOR = cc.color("#F6FF88");
xc.DEFAULT_BOUNDING_BOX_TAG = 999;
xc.DARK_BOUNDING_BOX_TAG = 998;
 
xc.CatalogueLayer = cc.Layer.extend({
    _pageConfigPanel: null,
    _objectConfigPanel: null,
    _contentPanelWidth: null,
    _configPanelWidth: null,
    _configPanelHeight: null,
    ctor: function (storyCatalogueObject) {
        this._super();
        this._name = "CatalogueLayer";
        this._storyCatalogueObject = storyCatalogueObject;
        this._tabHeight = 300;
        this._controlPanel = null;
        this._contentPanelWidth = cc.director.getWinSize().height; //assuming landscape
        this._configPanelWidth = (cc.director.getWinSize().width - this._contentPanelWidth) / 2;
        this._configPanelHeight = cc.director.getWinSize().height;
        return true;
    },

    init: function () {
        //create new content panel for showing all stories
        //create tile
        this.loadStories();
        this.displayStories();
    },

    loadStories: function() {
        this._stories = [];
        if(this._storyCatalogueObject != undefined && this._storyCatalogueObject.stories != undefined
            && this._storyCatalogueObject.stories.length > 0) {
            this._stories = this._storyCatalogueObject.stories;
        }
    },

    displayStories: function () {        
        this._stories.forEach(function(story) {
            story.icon = xc.path + story.icon;
        });
        this._bookShelf = new xc.StoryCoverScrollableButtonPanel(cc.p(0, 0), cc.size(cc.director.getWinSize().width, cc.director.getWinSize().height), 5, 3, this._stories, this.renderStory, this, false, true);
        this.addChild(this._bookShelf);
    },

    renderStory: function (sender) {
        this._curSelectedIndex = sender._selectedIndex;
        cc.log('loading story with index:' + this._curSelectedIndex);
        var storyInfo = this._stories[this._curSelectedIndex];
        if(storyInfo != undefined && storyInfo.hasOwnProperty("pages") && storyInfo["pages"] != undefined && storyInfo["pages"].length > 0) {
            xc.StoryCoverPageScene.load(0, storyInfo, xc.StoryCoverPageLayer);
        }
    }    
});

xc.CatalogueScene = cc.Scene.extend({
    layerClass: null,
    _menuContext: null,
    ctor: function (layer, storyCatalogueObject) {
        this._super();
        this.layerClass = layer;
        this._catalogueLayer = new this.layerClass(storyCatalogueObject);
        this.addChild(this._catalogueLayer);
        this._catalogueLayer.init();     
        if (cc.sys.isNative) {
            this._menuContext = goa.MenuContext.create(this._catalogueLayer, "story-play");
            this.addChild(this._menuContext, 1);
            this._menuContext.setVisible(true);
        }                                        
           
    }
});


xc.CatalogueScene.load = function(layer) {

var t_resources = [];
    for (var i in layer.res) {
        cc.log('preloading:' + layer.res[i]);
        t_resources.push(layer.res[i]);
    }

    var storyCatalogueObject = null;

    cc.spriteFrameCache.addSpriteFrames(xc.CatalogueLayer.res.thumbnails_plist);
    cc.spriteFrameCache.addSpriteFrames(xc.CatalogueLayer.res.record_animation_plist);
    cc.LoaderScene.preload(t_resources, function () {
        if(cc.sys.isNative) {
            storyCatalogueObject = cc.loader.getRes(xc.CatalogueLayer.res.Config_json);                    
        } else {
            storyCatalogueObject = cc.loader.cache[xc.CatalogueLayer.res.Config_json];
        }
                    
        this._catalogueScene = new xc.CatalogueScene(layer, storyCatalogueObject);
        this._catalogueScene.layerClass = layer;
        cc.director.runScene(this._catalogueScene);    
    }, this);        
}



xc.CatalogueLayer.res = {
        thumbnails_png: xc.path + "wikitaki/thumbnails.png",
        thumbnails_plist: xc.path + "wikitaki/thumbnails.plist",
        human_skeleton_png: xc.path + "wikitaki/human_skeleton.png",
        human_skeleton_plist: xc.path + "wikitaki/human_skeleton.plist",
        animalskeleton_png: xc.path + "wikitaki/animalskeleton.png",
        animalskeleton_plist: xc.path + "wikitaki/animalskeleton.plist",
        animalskeleton_json: xc.path + "wikitaki/animalskeleton.json",
        birdskeleton_png: xc.path + "wikitaki/birdskeleton.png",
        birdskeleton_plist: xc.path + "wikitaki/birdskeleton.plist",
        birdskeleton_json: xc.path + "wikitaki/birdskeleton.json",
        HelloWorld_png: xc.path + "wikitaki/HelloWorld.png",
        human_skeleton_json: xc.path + "wikitaki/human_skeleton.json",
        play_png: xc.path + "wikitaki/play.png",
        record_animation_png: xc.path + "wikitaki/recording.png",
        record_animation_plist: xc.path + "wikitaki/recording.plist",
        Config_json: xc.path + "misc/shelfConfig.json"
};