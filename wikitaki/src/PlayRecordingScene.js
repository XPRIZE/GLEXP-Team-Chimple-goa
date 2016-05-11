/// <reference path="../../../cocos2d-typescript-definitions/cocos2d/cocos2d-lib.d.ts" />
var chimple = chimple || {};
chimple.PLAY_KEY = "/wp-content/themes/SocialChef/images/res/chimplePlayStory.json";

var PlayRecordingLayer = cc.Layer.extend({    
    _defaultPageIndex: 0,
    _contentPanel: null,
    _pageConfigPanel: null,
    _objectConfigPanel: null,
    _contentPanelWidth: null,
    _configPanelWidth: null,
    _configPanelHeight: null,
    ctor: function () {
        this._super();
        this._name = "PlayLayer";
        this._controlPanel = null;
        this._contentPanelWidth = cc.director.getWinSize().height; //assuming landscape
        this._configPanelWidth = (cc.director.getWinSize().width - this._contentPanelWidth) / 2;
        this._configPanelHeight = cc.director.getWinSize().height;
        return true;
    },
    init: function () {
        //construct UI
        //create scene with first page
        this._contentPanel = new chimple.PlayContentPanel(this._contentPanelWidth, this._contentPanelWidth, cc.p(this._configPanelWidth, 0));
        this.addChild(this._contentPanel);

        this._objectConfigPanel = new chimple.ObjectConfigPanel(this._configPanelWidth, this._configPanelHeight, cc.p(0, 0), chimple.storyPlayConfigurationObject, this._contentPanel);
        this.addChild(this._objectConfigPanel);
        this._contentPanel._objectConfigPanel = this._objectConfigPanel;

        this._pageConfigPanel = new chimple.PageConfigPanel(this._configPanelWidth, this._configPanelHeight, cc.p(this._configPanelWidth + this._contentPanelWidth, 0), chimple.storyPlayConfigurationObject, this._contentPanel);
        this.addChild(this._pageConfigPanel);

        this.playRecordedScene();
    },

    // isPlayEnded: function () {
    //     if (this._playDuration == undefined || this._playDuration == null) {
    //         return true;
    //     }
    //     if (!(this._recordedScene.action.getCurrentFrame() < this._playDuration)) {
    //         return true;
    //     }

    //     return false;
    // },

    playRecordedScene: function () {
        if (this._contentPanel._constructedScene.node) {
            this._contentPanel._constructedScene.node.runAction(this._contentPanel._constructedScene.action);
            this._playDuration = cc.sys.localStorage.getItem("duration");
            this._contentPanel._constructedScene.action.gotoFrameAndPlay(0, this._playDuration, 0, false);

            if (!cc.sys.isNative) {
                this._contentPanel._constructedScene.node._renderCmd._dirtyFlag = 1;
                this._contentPanel._constructedScene.node.children.forEach(function (element) {
                    if (element.getName().indexOf("Skeleton") != -1) {
                        element._renderCmd._dirtyFlag = 1;
                    }
                }, this);
            }
        }
    }
});

var PlayRecordingScene = cc.Scene.extend({
    ctor: function () {
        this._super();
    },

    onEnter: function () {
        this._super();
        layer = new PlayRecordingLayer();
        this.addChild(layer);
        layer.init();
    }
});