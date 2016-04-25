/// <reference path="../../../cocos2d-typescript-definitions/cocos2d/cocos2d-lib.d.ts" />

var chimple = chimple || {};
var HelloWorldLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        return true;
    },
    init: function () {
        //load cache of icons.png and icons.plist to create panel
        // var cache = cc.spriteFrameCache;
        // cache.addSpriteFrames(res.icon_plist, res.icon_png);

        if (chimple.storyConfigurationObject) {
            //backgrounds, characters and pops, texts
            var mainConfigurationItems = Object.getOwnPropertyNames(chimple.storyConfigurationObject);
            //Construct UI
            var pageView = new chimple.PageScroller(cc.p(760, 0), cc.size(200, 640), 1, 3, mainConfigurationItems, cc.color.RED, this.configurationChoosed, this, false);
            this.addChild(pageView, 2);
        }
    },

    configurationChoosed: function (selectedItem) {
        //get configuration for selected Item
        //create scroll bar at top based on item selected

        var selectedConfig = chimple.storyConfigurationObject[selectedItem.getName()];

        if (selectedConfig != null && selectedItem.getName() != "texts") {
            this.constructTabBar(selectedConfig.categories);
        } else {
            //show text editor
            this.addTextToScene();
        }
    },
    addTextToScene: function() {
        var currentText = "how are you today?";
        var textEditScene = new TextEditScene(currentText);
        cc.director.pushScene(textEditScene);
    },
    
    itemSelectedInConfiguration: function (selectedItem) {
        cc.log('itemSelectedInConfiguration:' + selectedItem);
        this.destoryTabBar();
        this.loadJsonFile(selectedItem._jsonFileToLoad);
    },

    loadJsonFile: function (fileToLoad) {
        //load json file in new window
        if(this._mainScene != null) {
            this._mainScene.node.removeFromParent(true);
        }
        //later create custom loading screen
        var loaderScene = cc.LoaderScene;
        cc.director.pushScene(loaderScene);
        var dynamicResources = [fileToLoad];
        loaderScene.preload(dynamicResources, function () {            
            cc.director.popScene(loaderScene);            
            this._mainScene = ccs.load(fileToLoad);
            if (this._mainScene != null) {
                this.addChild(this._mainScene.node, 0);
            }
        }, this);

    },

    constructTabBar: function (configuration) {
        this._tabBar = new chimple.TabPanel(cc.p(0, 0), cc.size(760, 640), 2, 2, configuration, this.itemSelectedInConfiguration, this);
        this.addChild(this._tabBar);
    },

    destoryTabBar: function () {
        this._tabBar.removeFromParent(true);
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        layer = new HelloWorldLayer();
        this.addChild(layer);
        layer.init();        
    }
});