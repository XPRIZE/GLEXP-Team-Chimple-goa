/// <reference path="../../cocos2d-typescript-definitions/cocos2d/cocos2d-lib.d.ts" />
var chimple = chimple || {};
var PlayRecordingLayer = cc.Layer.extend({
    _defaultTextSize: 40,
    ctor: function (pageKey) {
        this._super();
        this._pageKey = pageKey;
        this.scheduleUpdate();
        return true;
    },
    init: function () {
        //load json from localstorage
        this.loadSceneFromStorage();
        var recordedSceneFromLocalStorage = cc.sys.localStorage.getItem(this._pageKey);
        if (recordedSceneFromLocalStorage != null && recordedSceneFromLocalStorage.length > 0) {
            var storedSceneJSON = JSON.parse(recordedSceneFromLocalStorage);
            this.putIntoCacheFromLocalStorage(this.pageKey, storedSceneJSON);
            this.playRecordedScene(this._pageKey);
        }


        var closeButtonSprite = new cc.Sprite(res.close_pop_png, cc.rect(0, 0, 32, 32));

        var closeButton = new cc.MenuItemSprite(closeButtonSprite, null, null, this.closeEditor, this);
        var menu = new cc.Menu(closeButton);
        menu.alignItemsVerticallyWithPadding(10);
        this.addChild(menu, 0);
        menu.setPosition(cc.director.getWinSize().width - 40, cc.director.getWinSize().height - 40);
    },


    loadSceneFromStorage: function () {
        //check if data exists in localstorage with Key
        var recordedSceneFromLocalStorage = cc.sys.localStorage.getItem(this._pageKey);
        if (recordedSceneFromLocalStorage != null && recordedSceneFromLocalStorage.length > 0) {
            var storedSceneJSON = JSON.parse(recordedSceneFromLocalStorage);
            this.putIntoCacheFromLocalStorage(this._pageKey, storedSceneJSON);
        }
    },

    putIntoCacheFromLocalStorage: function (cacheKey, contents) {
        cc.loader.cache[cacheKey] = contents;
    },

    isPlayEnded: function () {
        if (this._playDuration == undefined || this._playDuration == null) {
            return true;
        }
        if (!(this._recordedScene.action.getCurrentFrame() < this._playDuration)) {
            return true;
        }

        return false;
    },

    playRecordedScene: function (pageKey) {
        this._recordedScene = ccs.load(pageKey);
        if (this._recordedScene != null) {
            this.addChild(this._recordedScene.node);

            this._recordedScene.node.runAction(this._recordedScene.action);
            this._playDuration = cc.sys.localStorage.getItem("duration");
            this._recordedScene.action.gotoFrameAndPlay(0, this._playDuration, 0, false);

            if (!cc.sys.isNative) {
                this._recordedScene.node._renderCmd._dirtyFlag = 1;
                this._recordedScene.node.children.forEach(function (element) {
                    if (element.getName().indexOf("Skeleton") != -1) {
                        element._renderCmd._dirtyFlag = 1;
                    }
                }, this);
            }
        }

        //load text
        var textKey = pageKey + ".text";
        var textToDisplay = cc.sys.localStorage.getItem(textKey);

        var maxHeight = cc.director.getWinSize().height;
        var textLayerWidth = cc.director.getWinSize().width - cc.director.getWinSize().height;
        var textContentMargin = 30;

        var textLayer = cc.LayerColor.create(new cc.Color(160, 160, 160, 255), textLayerWidth, maxHeight);
        textLayer.setPosition(maxHeight, 0);
        this._textNode = new ccui.Text(textToDisplay, "AmericanTypewriter", 50);
        this._textNode.setAnchorPoint(0, 1);
        this._textNode.setPosition(textContentMargin, cc.director.getWinSize().height - 100);
        this._textNode.ignoreContentAdaptWithSize(false);
        this._textNode.setContentSize(cc.size(textLayerWidth - 2 * textContentMargin, cc.director.getWinSize().height - 100));
        this._textNode.setTouchEnabled(true);
        this._textNode.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        this._textNode.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_TOP);
        this._textNode.setVisible(false);
        textLayer.addChild(this._textNode);
        this.addChild(textLayer, 0);
    },

    closeEditor: function () {
        cc.director.popScene();
    },

    update: function (dt) {
        if (this.isPlayEnded()) {
            this._textNode.setVisible(true);
        }
    }
});

var PlayRecordingScene = cc.Scene.extend({
    ctor: function (pageKey) {
        this._super();
        this._pageKey = pageKey;
    },

    onEnter: function () {
        this._super();
        layer = new PlayRecordingLayer(this._pageKey);
        this.addChild(layer);
        layer.init();
    }
});