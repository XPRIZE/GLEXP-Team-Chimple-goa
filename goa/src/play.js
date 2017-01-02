/// <reference path="cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />
var xc = xc || {};
xc.PLAY_STORY_INIT = false;
xc.PlayFullStoryLayer = cc.Layer.extend({
    _contentPanel: null,
    _pageConfigPanel: null,
    _objectConfigPanel: null,
    _contentPanelWidth: null,
    _configPanelWidth: null,
    _configPanelHeight: null,
    _isTitleDisplayed: false,
    ctor: function (pageIndex) {
        this._super();
        this._name = "PlayFullStoryLayer";
        this._tabHeight = 64;
        xc.pageIndex = pageIndex;
        this._controlPanel = null;
        this._contentPanelWidth = cc.director.getWinSize().height; //assuming landscape
        this._contentPanelHeight = cc.director.getWinSize().height; //assuming landscape
        this._configPanelWidth = (cc.director.getWinSize().width - this._contentPanelWidth) / 2;
        this._configPanelHeight = cc.director.getWinSize().height;

        this._playButton = new cc.Sprite(xc.PlayFullStoryLayer.res.play_png);
        this._playButton.setPosition(cc.director.getWinSize().width / 2, cc.director.getWinSize().height / 2);
        this.addChild(this._playButton, 2);        
        this.bindTouchListener(this._playButton);

        return true;
    },

    bindTouchListener: function (target) {
        var context = this;
        this._listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                var location = target.convertToNodeSpace(touch.getLocation());
                var targetSize = target.getContentSize();
                var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.
                    height);
                if (cc.rectContainsPoint(targetRectangle, location)) {
                    context.sceneTouched();
                }
            }
        });
        cc.eventManager.addListener(this._listener, target);
    },

    init: function () {
        this._contentPanel = new xc.PlayContentPanel(this._contentPanelHeight - this._contentPanelWidth, this._contentPanelHeight, cc.p(this._configPanelWidth, 0));
        this.addChild(this._contentPanel);
        this._contentPanel._constructedScene.node.retain();
        this._contentPanel._constructedScene.action.retain();

        this._pageConfigPanel = new xc.BaseConfigPanel(this._configPanelWidth, this._configPanelHeight, cc.p(0, 0), xc.storyPlayConfigurationObject.editDefault, this._contentPanel);
        this.addChild(this._pageConfigPanel);
        this._pageConfigPanel.setVisible(true);

        this._blankPageConfigPanel = new xc.BaseConfigPanel(this._configPanelWidth, this._configPanelHeight, cc.p(cc.director.getWinSize().width - this._configPanelWidth, 0), [], this._contentPanel);
        this.addChild(this._blankPageConfigPanel);
        this._blankPageConfigPanel.setVisible(true);

        this._rightButtonPanel = new xc.ButtonPanel(new cc.p(this._contentPanelWidth + this._configPanelWidth, 0), cc.size(this._configPanelWidth, this._contentPanelHeight), 1, 1, xc.onlyStoryPlayConfigurationObject.nextDefault, new xc.ButtonHandler(this.nextStory, this, false));
        this._rightButtonPanel.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this._rightButtonPanel.setBackGroundColor(xc.PRIMARY_COLOR);
        this.addChild(this._rightButtonPanel,2);
        this._rightButtonPanel.setVisible(false);
        this.setUpRecordedScene();
        if(xc.pageIndex == 0) {
            this._playButton.setVisible(true);
        } else {
            this._playButton.setVisible(false);
            this.sceneTouched();
        }
        
    },

    buttonPressed: function(selectedItem) {
        var selectedConfig = this._configuration.addObjects[selectedItem._selectedIndex];
        if (selectedConfig != null && selectedConfig.name === "back") {
            this._contentPanel.backPressed();  
        }          

    },


    renderNextButton: function () {

        if (xc.story != null && xc.story.items != null && !(xc.pageIndex + 1 == xc.story.items.length)) {
            this._rightButtonPanel.setVisible(true);
        } else {
            this._rightButtonPanel.setVisible(false);
        }
    },

    
    sceneTouched: function () {
        this._contentPanel._constructedScene.action.gotoFrameAndPause(0);
        this.playRecordedScene();
        this._playButton.setVisible(false);
    },

    previousStory: function () {
        var curIndex = xc.pageIndex;
        curIndex--;
        if (curIndex < 0) {
            return;
        }
        xc.pageIndex--;
        xc.PlayFullStoryScene.load(xc.pageIndex, xc.PlayFullStoryLayer, true);
    },

    nextStory: function () {
        var curIndex = xc.pageIndex;
        curIndex++;
        if (curIndex >= xc.story.items.length) {
            return;
        }

        xc.pageIndex++;
        xc.PlayFullStoryScene.load(xc.pageIndex, xc.PlayFullStoryLayer, true);
    },

    setUpRecordedScene: function () {
        if (this._contentPanel._constructedScene.node) {
            this._contentPanel._constructedScene.action.referenceToContext = this;
            this._contentPanel._constructedScene.action.setLastFrameCallFunc(this.playEnded);
            this._contentPanel._constructedScene.action.gotoFrameAndPause(0);
        }
    },

    playEnded: function () {
        //create delay action
        if (xc.story.items[xc.pageIndex].sceneText != null && xc.story.items[xc.pageIndex].sceneText !== "undefined") {
            var delayAction = new cc.DelayTime(2);
            var createWebViewAction = new cc.CallFunc(this.referenceToContext.createWebView, this.referenceToContext);
            var playEndSequence = new cc.Sequence(delayAction, createWebViewAction);
            this.referenceToContext.runAction(playEndSequence);
        } else {
            this.referenceToContext.renderNextButton();
                        
        }
    },

    createWebView: function() {
        var that = this;
        if (xc.story.items[xc.pageIndex].sceneText != null && xc.story.items[xc.pageIndex].sceneText !== "undefined" && xc.story.items[xc.pageIndex].sceneText.length > 0) {
            this.addChild(new xc.TextCreatePanel(xc.PlayFullStoryLayer.res.textBubble_json, cc.director.getWinSize().width, cc.director.getWinSize().height, cc.p(385, 250), xc.story.items[xc.pageIndex].sceneText, that.processText, null, that));
        }     
        this.renderNextButton();
    },

    playRecordedScene: function () {
        if (this._contentPanel._constructedScene.node && this._contentPanel._constructedScene.action.getDuration() > 0) {
            this._contentPanel._constructedScene.node.runAction(this._contentPanel._constructedScene.action);
            this._contentPanel._constructedScene.action.gotoFrameAndPlay(0, this._contentPanel._constructedScene.action.getDuration(), 0, false);
        } else {
            this.referenceToContext = this;
            this.playEnded();
        }
    }
});

xc.PlayFullStoryScene = cc.Scene.extend({
    layerClass: null,
    pageIndex: 0,
    ctor: function (pageIndex, layer) {
        this._super();
        this.layerClass = layer;        
        xc.story = xc.storiesJSON.stories[xc.currentStoryIndex].data;
        if (xc.story && xc.story.items != null && xc.story.items.length > 0) {
            this._sceneLayer = new this.layerClass(pageIndex);
            this.addChild(this._sceneLayer);
            this._sceneLayer.init();
        }
    }
});


xc.PlayFullStoryScene.load = function(pageIndex, layer, enableTransition) {
    var t_resources = [];
    for (var i in layer.res) {
        cc.log('preloading:' + layer.res[i]);
        t_resources.push(layer.res[i]);
    }

    cc.spriteFrameCache.addSpriteFrames(xc.PlayFullStoryLayer.res.thumbnails_plist);
    cc.spriteFrameCache.addSpriteFrames(xc.PlayFullStoryLayer.res.record_animation_plist);
    cc.LoaderScene.preload(t_resources, function () {
        var scene = new xc.PlayFullStoryScene(pageIndex, layer);
        scene.layerClass = layer;

        cc.director.runScene(scene);            
    }, this);
}



xc.PlayFullStoryLayer.res = {
        thumbnails_png: xc.path + "wikitaki/thumbnails.png",
        thumbnails_plist: xc.path + "wikitaki/thumbnails.plist",
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
        human_skeleton_json: xc.path + "animation/human_skeleton.json",
        animation_skeleton_png: xc.path + "animation/animation.png",
        animation_skeleton_plist: xc.path + "animation/animation.plist",
        animationa_skeleton_png: xc.path + "animation/animationa/animationa.png",
        animationa_skeleton_plist: xc.path + "animation/animationa/animationa.plist",
        animationb_skeleton_png: xc.path + "animation/animationb/animationb.png",
        animationb_skeleton_plist: xc.path + "animation/animationb/animationb.plist",
        animationc_skeleton_png: xc.path + "animation/animationc/animationc.png",
        animationc_skeleton_plist: xc.path + "animation/animationc/animationc.plist",
        textBubble_json: xc.path + "template/bubble_tem.json"      
};