/// <reference path="../../../cocos2d-typescript-definitions/cocos2d/cocos2d-lib.d.ts" />
var chimple = chimple || {};
var TextEditLayer = cc.Layer.extend({
    ctor: function (existingText) {
        this._super();
        this._text = existingText;
        return true;
    },
    init: function () {
        var backgroundLayer = cc.LayerColor.create(new cc.Color(140, 140, 140, 255), 2560, 1800);
        this.addChild(backgroundLayer, 0);
        //create menu item with close button

        var closeButtonSprite = new cc.Sprite(res.close_pop_png, cc.rect(0, 0, 32, 32));

        var closeButton = new cc.MenuItemSprite(closeButtonSprite, null, null, this.closeEditor, this);
        var menu = new cc.Menu(closeButton);
        menu.alignItemsVerticallyWithPadding(10);
        this.addChild(menu, 0);
        menu.setPosition(cc.director.getWinSize().width - 40, cc.director.getWinSize().height - 40);

        var textField = new ccui.TextField();
        if (this._text) {
            textField.setString(this._text);
        }
        textField.setPosition(cc.director.getWinSize().width / 2, cc.director.getWinSize().height / 2);
        this.addChild(textField, 0);
        textField.addEventListener(this.updateText, this);
    },

    updateText: function (sender, type) {
        switch (type) {
            case ccui.TextField.EVENT_ATTACH_WITH_IME:
                cc.log("displayed keyboard");
                break;
            case ccui.TextField.EVENT_DETACH_WITH_IME:
                cc.log("closed keyboard");
                this.closeEditor();
                break;
            case ccui.TextField.EVENT_INSERT_TEXT:
                cc.log("text entered");
                this._text = sender.getString();
                break;
        }
    },

    closeEditor: function () {
        cc.director.popScene(TextEditScene);
        this.removeFromParent(true);
    }
});

var TextEditScene = cc.Scene.extend({
    ctor: function (text) {
        this._super();
        cc.log("received:" + text);
        this._text = text;
    },

    onEnter: function () {
        this._super();
        layer = new TextEditLayer(this._text);
        this.addChild(layer);
        layer.init();
    }
});