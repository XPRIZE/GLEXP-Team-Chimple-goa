/// <reference path="../../cocos2d-typescript-definitions/cocos2d/cocos2d-lib.d.ts" />
var chimple = chimple || {};
chimple.PLAY_KEY = "/res/chimplePlayStory.json";

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

        this._objectConfigPanel = new chimple.ObjectConfigPanel(this._configPanelWidth, this._configPanelHeight, cc.p(this._configPanelWidth + this._contentPanelWidth, 0), chimple.storyPlayConfigurationObject, this._contentPanel);
        this.addChild(this._objectConfigPanel);
        this._contentPanel._objectConfigPanel = this._objectConfigPanel;

        this._pageConfigPanel = new chimple.BaseConfigPanel(this._configPanelWidth, this._configPanelHeight, cc.p(0, 0), chimple.storyPlayConfigurationObject.editDefault, this._contentPanel);
        this.addChild(this._pageConfigPanel);

        this.playRecordedScene();


    },

    buttonPressed: function(selectedItem) {
        var selectedConfig = this._configuration.addObjects[selectedItem._selectedIndex];
        if (selectedConfig != null && selectedConfig.name === "back") {
            this._contentPanel.backPressed();  
        }          

    },

    playEnded: function () {
        //create delay action
        var delayAction = new cc.delayTime(2);
        var createWebViewAction = new cc.CallFunc(this.referenceToContext.createWebView, this.referenceToContext);
        var playEndSequence = new cc.sequence(delayAction, createWebViewAction);
        this.referenceToContext.runAction(playEndSequence);
    },
    
    createWebView: function() {
        if (chimple.story.items[chimple.pageIndex].sceneText != null && chimple.story.items[chimple.pageIndex].sceneText !== "undefined") {
            this.addChild(new chimple.TextReadPanel(cc.director.getWinSize().width, cc.director.getWinSize().height, cc.p(150, 150), chimple.story.items[chimple.pageIndex].sceneText, this.closeWebView, this));
        }        
    },

    closeWebView: function() {
        localStorage.removeItem("scene_display_text_contents");
    },
    
    playRecordedScene: function () {        
        if (this._contentPanel._constructedScene.node && this._contentPanel._constructedScene.action.getDuration()) {            
            this._contentPanel._constructedScene.action.referenceToContext = this;
            this._contentPanel._constructedScene.action.setLastFrameCallFunc(this.playEnded);
            this._contentPanel._constructedScene.action.gotoFrameAndPause(0);
            
            this._contentPanel._constructedScene.node.runAction(this._contentPanel._constructedScene.action);
            this._contentPanel._constructedScene.action.gotoFrameAndPlay(0, this._contentPanel._constructedScene.action.getDuration(), 0, false);

            if (!cc.sys.isNative) {
                this._contentPanel._constructedScene.node._renderCmd._dirtyFlag = 1;
                this._contentPanel._constructedScene.node.children.forEach(function (element) {
                    if (element.getName().indexOf("Skeleton") != -1 || element.getName().indexOf("skeleton") != -1) {
                        element._renderCmd._dirtyFlag = 1;
                    }
                }, this);
            }
        } else {
            this.referenceToContext = this;
            this.playEnded();
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