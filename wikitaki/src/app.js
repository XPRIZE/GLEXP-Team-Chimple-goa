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
            var pageView = new chimple.PageScroller(cc.p(760, 0), cc.size(200, 640), 1, 2, mainConfigurationItems, cc.color.RED, this.configurationChoosed, this, false);
            this.addChild(pageView, 2);
        }
    },

    configurationChoosed: function (selectedItem) {
        //get configuration for selected Item
        //create scroll bar at top based on item selected

        var selectedConfig = chimple.storyConfigurationObject[selectedItem.getName()];

        if (selectedConfig != null) {
            this.constructTabBar(selectedConfig.categories);
        }
    },

    itemSelectedInConfiguration: function(selectedItem) {
        cc.log('itemSelectedInConfiguration:' + selectedItem);
        this.destoryTabBar();

        //load json file in new window
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