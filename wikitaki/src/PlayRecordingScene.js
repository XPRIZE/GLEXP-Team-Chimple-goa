/// <reference path="../../../cocos2d-typescript-definitions/cocos2d/cocos2d-lib.d.ts" />
var chimple = chimple || {};
var PlayRecordingLayer = cc.Layer.extend({
    ctor: function (pageKey) {
        this._super();
        this._pageKey = pageKey;
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

    playRecordedScene: function (pageKey) {
        var recordedScene = ccs.load(pageKey);
        if (recordedScene != null) {
            this.addChild(recordedScene.node);

            recordedScene.node.runAction(recordedScene.action);
            var duration = cc.sys.localStorage.getItem("duration");
            recordedScene.action.gotoFrameAndPlay(0, duration, 0, false);

            if (!cc.sys.isNative) {
                recordedScene.node._renderCmd._dirtyFlag = 1;
                recordedScene.node.children.forEach(function(element) {
                    if(element.getName().indexOf("Skeleton") != -1)
                    {
                        element._renderCmd._dirtyFlag = 1;
                    }
                }, this);
            }
        }
    },

    closeEditor: function () {
        cc.director.popScene();
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