/// <reference path="../../../cocos2d-typescript-definitions/cocos2d/cocos2d-lib.d.ts" />
var LAYER_INIT = false;

var chimple = chimple || {};
var HelloWorldLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this._name = "StoryLayer";
        return true;
    },
    init: function () {
        //load cache of icons.png and icons.plist to create panel
        // var cache = cc.spriteFrameCache;
        // cache.addSpriteFrames(res.icon_plist, res.icon_png);
        //create dummy variable to hold Text
        cc.log('eeeee:' + this._sceneText);
        if (chimple.storyConfigurationObject) {
            //backgrounds, characters and pops, texts
            var mainConfigurationItems = Object.getOwnPropertyNames(chimple.storyConfigurationObject);
            //Construct UI
            var pageView = new chimple.PageScroller(cc.p(1800, 0), cc.size(760, 1800), 2, 3, mainConfigurationItems, cc.color.RED, this.configurationChoosed, this, false);
            this.addChild(pageView, 2);
        }
    },

    configurationChoosed: function (selectedItem) {
        //get configuration for selected Item
        //create scroll bar at top based on item selected

        var selectedConfig = chimple.storyConfigurationObject[selectedItem.getName()];
        cc.log(selectedItem.getName());
        if (selectedConfig != null && selectedItem.getName() != "texts") {
            this.constructTabBar(selectedConfig.categories);
        } else {
            //show text editor
            this.addTextToScene();
        }
    },
    addTextToScene: function () {
        this._sceneText = "how are you today?";
        var textEditScene = new TextEditScene(this._sceneText);
        cc.director.pushScene(textEditScene);
    },

    itemSelectedInConfiguration: function (selectedItem) {
        cc.log('itemSelectedInConfiguration:' + selectedItem);
        this.destoryTabBar();
        this.process(selectedItem);

    },


    process: function (selectedItem) {
        if (selectedItem.dataType === 'png' && selectedItem._pngFileToLoad != null) {
            //process image - create cc.sprite node
            this.loadImageAddToNode(selectedItem);
        } else if (selectedItem.dataType === 'json' && selectedItem._jsonFileToLoad != null) {
            this.loadJsonFile(selectedItem);
        }
    },

    loadImageAddToNode: function (selectedItem) {
        //load image if only not already in cache
        var imageToLoad = selectedItem._pngFileToLoad;
        this.showLoadingScene(imageToLoad, this.doPostLoadingProcessForImage, this, imageToLoad);
    },

    doPostLoadingProcessForImage: function (context, imageToLoad) {
        var sprite = new cc.Sprite(imageToLoad);
        context.addChild(sprite, 1);
        sprite.setPosition(cc.director.getWinSize().width / 2, cc.director.getWinSize().height / 2);
        sprite.setScale(1);
    },

    loadJsonFile: function (selectedItem) {
        //load json file in new window
        //could be following
        //SceneNode - mainScene
        //characterNode 
        //text - no png or json
        //png - sprite image  
        var type = selectedItem._configurationType;
        var fileToLoad = selectedItem._jsonFileToLoad;
        switch (type) {
            case "character":
                this.addCharacterToScene(fileToLoad);
                break;
            case "scene":
                this.replaceMainScene(fileToLoad);
                break;
        }

    },

    doPostLoadingProcessForScene: function (context, fileToLoad) {
        cc.log('context:' + context._name);
        chimple.mainScene = ccs.load(fileToLoad);
        if (chimple.mainScene != null) {
            context.addChild(chimple.mainScene.node, 0);
        }
    },

    replaceMainScene: function (fileToLoad) {
        if (chimple.mainScene != null) {
            chimple.mainScene.node.removeFromParent(true);
        }
        this.showLoadingScene(fileToLoad, this.doPostLoadingProcessForScene, this, fileToLoad);
    },


    //later create custom loading screen
    showLoadingScene: function (fileToLoad, doPostLoadingProcessFunction, context, args) {
        var loaderScene = cc.LoaderScene;
        cc.director.pushScene(loaderScene);
        var dynamicResources = [fileToLoad];
        loaderScene.preload(dynamicResources, function () {
            cc.director.popScene(loaderScene);
            doPostLoadingProcessFunction.call(context, context, args);
        }, this);
    },

    addCharacterToScene: function (fileToLoad) {
        var load = ccs.load(fileToLoad);
        load.node.setPosition(900, 900);
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                var location = target.convertToNodeSpace(touch.getLocation());
                var boundingBox = target.getBoundingBoxToWorld();
                var targetSize = cc.size(boundingBox.width, boundingBox.height);
                var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);
                if (cc.rectContainsPoint(targetRectangle, location)) {
                    return true;
                }
                return false;
            },
            onTouchMoved: function(touch, event) {
                var target = event.getCurrentTarget();
                target.setPosition(target.parent.convertToNodeSpace(touch.getLocation()));
                target._renderCmd._dirtyFlag = 1;
            }
        });
        cc.eventManager.addListener(listener, load.node);        
            
        this.addChild(load.node);  
        // load.node.runAction(load.action);
        // load.action.play('nod', false);       
    },


    constructTabBar: function (configuration) {
        this._tabBar = new chimple.TabPanel(cc.p(0, 0), cc.size(1800, 1800), 2, 2, configuration, this.itemSelectedInConfiguration, this);
        this.addChild(this._tabBar);
    },

    destoryTabBar: function () {
        this._tabBar.removeFromParent(true);
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        if (LAYER_INIT === false) {
            LAYER_INIT = true;
            layer = new HelloWorldLayer();
            this.addChild(layer);
            layer.init();
        }
    }
});