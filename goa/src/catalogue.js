/// <reference path="cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />
var xc = xc || {};
xc.storyLevel = ".level";
xc.storyOrder = ".unlockedStoryIdOrder";
xc.UNLOCK_ALL = ".unlock";
xc.HAND_GEAR_LEFT = "hand_gear_left"; 
xc.LAYER_INIT = false;
xc.PRIMARY_COLOR = cc.color("#FF8E88");
xc.DARK_PRIMARY_COLOR = cc.color("#B2524D");
xc.SECONDARY_COLOR = cc.color("#5895CC");
xc.DARK_SECONDARY_COLOR = cc.color("#ee0a21");
xc.TERTIARY_COLOR = cc.color("#F6FF88");
xc.DEFAULT_BOUNDING_BOX_TAG = 999;
xc.DARK_BOUNDING_BOX_TAG = 998;

xc.BOOK_COLORS = [cc.color("#E5155A"),cc.color("#0E700B"),cc.color("#0834C1"),cc.color("#C90D0D"),cc.color("#EF6A0F")];
 
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
        this.loadingScene();        
        this.displayStories();        
    },

    playLoadingAnimation:function() {
        this._loadingScene.node.setVisible(true);
        var monkey = this._loadingScene.node.getChildByName("monkey");
        if(monkey) {
            var action = monkey.actionManager.getActionByTag(monkey.tag, monkey);
            action.setDuration(120);
            action.play('rotate', true);
        }
    },

    loadingScene: function() {
        this._loadingScene = ccs.load(xc.CatalogueLayer.res.loading_scene_json, xc.path);
        this._loadingScene.node.retain();
        this._loadingScene.action.retain();
        this._loadingScene.node.setPosition(cc.director.getWinSize().width/2, cc.director.getWinSize().height/2);
        this._loadingScene.node.setAnchorPoint(cc.p(0.5,0.5));
        this._loadingScene.node.setVisible(false);
        this.addChild(this._loadingScene.node, 5);
    },

    getUnLockedStories: function() {
        var unlockedStories = [];
        unlockedStories.push("storyId_3");
        unlockedStories.push("storyId_6");  
        return unlockedStories;      
    },

    loadStories: function() {
        var context = this;
        this._stories = [];
        if(this._storyCatalogueObject != undefined && this._storyCatalogueObject.stories != undefined
            && this._storyCatalogueObject.stories.length > 0) {
            this._stories = this._storyCatalogueObject.stories;
            var unlockedStories = [];
            var lockedStoryIdOrders = this._stories.map(function(element) { return element["storyId"] });
            if(cc.sys.isNative) {
                var unlockALL = cc.sys.localStorage.getItem(xc.UNLOCK_ALL);
                cc.log("xc.UNLOCK_ALL found in catalog.js:" + unlockALL);
                if(unlockALL == "0" || unlockALL == 0 || unlockALL == null) {                    
                    unlockedStories = lockedStoryIdOrders;
                    cc.log("1111111" + JSON.stringify(unlockedStories));
                } else if(unlockALL == "1" || unlockALL == 1) {
                    unlockedStories = context.getUnLockedStories();
                } else {
                    unlockedStories = context.getUnLockedStories();
                }                
            }  else {
                unlockedStories = lockedStoryIdOrders;
            }
            
            
            cc.log('cc.sys.localStorage.getItem(xc.storyOrder)' + cc.sys.localStorage.getItem(xc.storyOrder));
            if(cc.sys.localStorage.getItem(xc.storyOrder)) {
                lockedStoryIdOrders = JSON.parse(cc.sys.localStorage.getItem(xc.storyOrder));
            }            
            
            lockedStoryIdOrders = lockedStoryIdOrders.filter(function(item) {
                return unlockedStories.indexOf(item) === -1;
            });
            
            if(unlockALL != "1") {
                cc.log("JSON.stringify(lockedStoryIdOrder):" + JSON.stringify(lockedStoryIdOrders));
                cc.sys.localStorage.setItem(xc.storyOrder, JSON.stringify(lockedStoryIdOrders));
            }
            

            this._stories.forEach(function(config) {                
                var storyStatus = cc.sys.localStorage.getItem(config["storyId"] + xc.storyLevel);
                
                if(!storyStatus) {
                    if(unlockedStories.indexOf(config.storyId) != -1) {
                        var storyInfo = {};
                        storyInfo.locked = false;
                        storyInfo.unlockForDebug = false;
                        storyInfo.unlockUsed = false;
                        storyInfo.timesRead = 0;
                        cc.sys.localStorage.setItem(config["storyId"] + xc.storyLevel, JSON.stringify(storyInfo));
                    } else {
                        var storyInfo = {};
                        storyInfo.locked = true;
                        storyInfo.unlockForDebug = false;
                        storyInfo.timesRead = 0;
                        storyInfo.unlockUsed = false;
                        cc.sys.localStorage.setItem(config["storyId"] + xc.storyLevel, JSON.stringify(storyInfo));
                    } 
                }  
            });
        }
    },

    displayStories: function () {        
        this._bookShelf = new xc.StoryCoverScrollableButtonPanel(cc.p(0, 0), cc.size(cc.director.getWinSize().width, cc.director.getWinSize().height), 5, 3, this._stories, this.renderStory, this, false, true);
        this.addChild(this._bookShelf);
    },

    transitToStory: function(sender) {        
        cc.log('loading story with index:' + this._curSelectedIndex);
        var storyInfo = this._stories[this._curSelectedIndex];
        if(storyInfo != undefined && storyInfo.hasOwnProperty("pages") && storyInfo["pages"] != undefined && storyInfo["pages"].length > 0) {
            xc.StoryCoverPageScene.load(0, storyInfo, xc.StoryCoverPageLayer);
        }
    },

    renderStory: function (sender) {
        this._curSelectedIndex = sender._selectedIndex;
        this.scheduleOnce(this.transitToStory, 2);
        var delayAction = new cc.DelayTime(2.0);                        
        var sequenceAction = new cc.Sequence(new cc.CallFunc(this.playLoadingAnimation, this), delayAction);
        this.runAction(sequenceAction);
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

    var langDir = goa.TextGenerator.getInstance().getLang();
    cc.log("langDir:" + langDir);
    var titlesFileUrl =  "res/story" + "/" + langDir + "/titles.json";

    cc.loader.loadJson(titlesFileUrl, function(err, json) {            
        if(!err && json != null && json != undefined) {
            cc.log('story titles received:' + json);
            var jsonObj = {};
            for (var key in json) {
                if (json.hasOwnProperty(key)) {
                    jsonObj[key.toLowerCase()] = json[key];
                }
            }            
            cc.sys.localStorage.setItem('titles', JSON.stringify(jsonObj));
            cc.LoaderScene.preload(t_resources, function () {
                cc.spriteFrameCache.addSpriteFrames(xc.CatalogueLayer.res.thumbnails_plist);
                cc.spriteFrameCache.addSpriteFrames(xc.CatalogueLayer.res.record_animation_plist);
                cc.spriteFrameCache.addSpriteFrames(xc.CatalogueLayer.res.book_cover_plist);
                cc.spriteFrameCache.addSpriteFrames(xc.CatalogueLayer.res.template_plist);
                cc.spriteFrameCache.addSpriteFrames(xc.CatalogueLayer.res.level_plist);
                cc.spriteFrameCache.addSpriteFrames(xc.CatalogueLayer.res.template_01_plist);
                cc.spriteFrameCache.addSpriteFrames(xc.CatalogueLayer.res.template_02_plist);    
                
                
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
    });
}



xc.CatalogueLayer.res = {
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
        Config_json: xc.path + "misc/shelfConfig.json",
        book_json: xc.path + "template/book.json",
        book_cover_plist: xc.path + "template.plist",
        book_cover_json: xc.path + "template.png",
        loading_button_json: xc.path + "template/loading_button.json",
        loading_scene_json: xc.path + "template/loading_screen.json",
        template_png: xc.path + "template/template.png",
        template_plist: xc.path + "template/template.plist",
        template_01_png: xc.path + "template/template_01/template_01.png",
        template_01_plist: xc.path + "template/template_01/template_01.plist",
        template_02_png: xc.path + "template/template_02/template_02.png",
        template_02_plist: xc.path + "template/template_02/template_02.plist",        
        level_plist: xc.path + "levelstep/levelstep.plist",
        level_png: xc.path + "levelstep/levelstep.png",
        human_skeleton_json: xc.path + "animation/human_skeleton.json",
        animation_skeleton_png: xc.path + "animation/animation.png",
        animation_skeleton_plist: xc.path + "animation/animation.plist",
        animationa_skeleton_png: xc.path + "animation/animationa/animationa.png",
        animationa_skeleton_plist: xc.path + "animation/animationa/animationa.plist",
        animationb_skeleton_png: xc.path + "animation/animationb/animationb.png",
        animationb_skeleton_plist: xc.path + "animation/animationb/animationb.plist",
        animationc_skeleton_png: xc.path + "animation/animationc/animationc.png",
        animationc_skeleton_plist: xc.path + "animation/animationc/animationc.plist"              
};


