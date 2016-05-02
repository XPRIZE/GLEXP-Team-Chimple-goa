/// <reference path="../../../cocos2d-typescript-definitions/cocos2d/cocos2d-lib.d.ts" />
var chimple = chimple || {};
var TextCreateLayer = cc.Layer.extend({
    ctor: function (existingText, textKey) {
        this._super();
        this._text = existingText;
        this._textKey = textKey;
        return true;
    },
    init: function () {
        var backgroundLayer = cc.LayerColor.create(new cc.Color(140, 140, 140, 255), 2560, 1800);
        this.addChild(backgroundLayer, 0);
        //create menu item with close button

        if (!cc.sys.isNative) {
            var closeButtonSprite = new cc.Sprite(res.close_pop_png, cc.rect(0, 0, 200, 200));

            var closeButton = new cc.MenuItemSprite(closeButtonSprite, null, null, this.closeEditor, this);
            var menu = new cc.Menu(closeButton);
            menu.alignItemsVerticallyWithPadding(10);
            this.addChild(menu, 0);
            menu.setPosition(cc.director.getWinSize().width - 200, cc.director.getWinSize().height - 200);
        }

        if (!cc.sys.isNative) {
            var scrollView = new ccui.ScrollView();
            scrollView.setTouchEnabled(true);
            scrollView.setBounceEnabled(true);
            scrollView.setPosition(cc.director.getWinSize().width / 2, cc.director.getWinSize().height / 2);
            scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
            scrollView.setBounceEnabled(true);
            scrollView.setClippingEnabled = true;
            scrollView.setContentSize(cc.size(1600, 1600));
            scrollView.setInnerContainerSize(cc.size(1600, 1600));
            scrollView.setBackGroundColor(new cc.Color(140, 140, 160, 255));
            scrollView.setAnchorPoint(0.5, 0.5);
            scrollView.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            this.addChild(scrollView);
        }


        this._textField = new ccui.TextField();
        //this._textField.setSize(cc.size(cc.director.getWinSize().width / 2, cc.director.getWinSize().height / 2));
        this._textField.setFontSize(44);
        this._textField.setAnchorPoint(0.5, 0.5);
        this._textField.setPosition(800, 700);
        this._textField.setMaxLengthEnabled(true);
        this._textField.setMaxLength(500);
        this._textField.ignoreContentAdaptWithSize(false);
        this._textField.setPlaceHolderColor(cc.color.BLUE);
        this._textField.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this._textField.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_TOP);
        this._textField.setContentSize(cc.size(1400, 1600));
        if (this._text) {
            this._textField.setString(this._text);
        }

        if (!cc.sys.isNative) {
            scrollView.addChild(this._textField, 0);
        } else {
            this.addChild(this._textField, 0);
        }
        this._textField.addEventListener(this.updateText, this);
    },

    changeText: function (text) {
        this._text = text;
        this._textField.setString(this._text);
    },

    updateText: function (sender, type) {
        switch (type) {
            case ccui.TextField.EVENT_ATTACH_WITH_IME:
                cc.log("displayed keyboard");
                break;
            case ccui.TextField.EVENT_DETACH_WITH_IME:
                cc.log("closed keyboard");
                break;
            case ccui.TextField.EVENT_INSERT_TEXT:
                cc.log("text entered");
                this._text = sender.getString();
                break;
        }
    },

    closeEditor: function () {
        this.setVisible(false);
        this.parent._textEditLayer.changeText(this._text);
        this.parent._textEditLayer.setVisible(true);
    }
});

var TextEditLayer = cc.Layer.extend({
    _defaultTextSize: 40,
    _initialSliderPercentage: 50,
    ctor: function (existingText, textKey) {
        this._super();
        this._text = existingText;
        this._textKey = textKey;
        return true;
    },

    changeText: function (text) {
        this._text = text;
        this._textNode.setString(text);
    },

    init: function () {
        var leftLayer = cc.LayerColor.create(new cc.Color(200, 230, 230, 255), 1800, 1800);
        this.addChild(leftLayer, 0);

        var rightLayer = cc.LayerColor.create(new cc.Color(160, 160, 160, 255), 760, 1800);
        rightLayer.setPosition(1800, 0);
        this.addChild(rightLayer, 0);

        if (!cc.sys.isNative) {
            var closeButtonSprite = new cc.Sprite(res.close_pop_png, cc.rect(0, 0, 150, 150));

            var closeButton = new cc.MenuItemSprite(closeButtonSprite, null, null, this.closeEditor, this);
            var menu = new cc.Menu(closeButton);
            menu.alignItemsVerticallyWithPadding(10);
            this.addChild(menu, 0);
            menu.setPosition(1800, cc.director.getWinSize().height - 150);
        }


        //create slider for FONT size changes
        //create COLOR picker for Font Color Change

        var sliderLabel = new cc.LabelTTF("Change Font Size:", "AmericanTypewriter", 40);
        sliderLabel.setPosition(300, cc.director.getWinSize().height / 2 + 200);
        leftLayer.addChild(sliderLabel);

        var slider = new ccui.Slider("res/sliderTrack.png",
            "res/sliderThumb.png");
        slider.setPosition(900, cc.director.getWinSize().height / 2 + 200);
        slider.setPercent(this._initialSliderPercentage);

        slider.addEventListener(this.sliderChanged, this);
        leftLayer.addChild(slider);

        //create scrolling text
        var scrollView = new ccui.ScrollView();
        scrollView.setTouchEnabled(true);
        scrollView.setBounceEnabled(true);
        scrollView.setPosition(80, 100);
        scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        scrollView.setBounceEnabled(true);
        scrollView.setClippingEnabled = true;
        scrollView.setContentSize(cc.size(600, 1600));
        scrollView.setInnerContainerSize(cc.size(600, 2000));
        scrollView.setBackGroundColor(new cc.Color(160, 160, 160, 255));
        scrollView.setAnchorPoint(0, 0);
        scrollView.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        rightLayer.addChild(scrollView);

        this._textNode = new ccui.Text(this._text, "AmericanTypewriter", this._defaultTextSize);
        this._textNode.setAnchorPoint(0, 0.25);
        this._textNode.ignoreContentAdaptWithSize(false);
        this._textNode.setContentSize(cc.size(600, 2400));
        this._textNode.setTouchEnabled(true);
        this._textNode.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this._textNode.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_TOP);
        this._textNode.addTouchEventListener(this.textEvent, this);
        scrollView.addChild(this._textNode);
        slider.referenceTextNode = this._textNode;
        slider.referenceScrollView = scrollView;
    },

    textEvent: function (sender, type) {

        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_MOVED:
                break;
            case ccui.Widget.TOUCH_ENDED:
                cc.log("touch ended");
                //open text create layer
                this.setVisible(false);
                this.parent._textCreateLayer.changeText(this._text);
                this.parent._textCreateLayer.setVisible(true);
                break;
            case ccui.Widget.TOUCH_CANCELED:
                break;
            default:
                break;
        }
    },


    sliderChanged: function (sender, type) {
        cc.log(sender.getPercent());
        var difference = Math.ceil(sender.getPercent() - this._initialSliderPercentage);
        var updatedFontSize = this._defaultTextSize + difference;
        sender.referenceTextNode.setFontSize(updatedFontSize);
    },

    closeEditor: function () {
        cc.sys.localStorage.setItem(this._textKey, this._text);
        cc.director.popScene();
    }
});

var TextEditScene = cc.Scene.extend({
    _text: null,
    ctor: function (text, textKey) {
        this._super();
        cc.log("received:" + text);
        this._text = text;
        this._textKey = textKey;
    },

    onEnter: function () {
        this._super();
        this._textEditLayer = new TextEditLayer(this._text, this._textKey);
        this._textEditLayer.init();

        this._textCreateLayer = new TextCreateLayer(this._text, this._textKey);
        this._textCreateLayer.init();

        if (this._text != null && this._text.length > 0) {
            this.addChild(this._textCreateLayer);
            this.addChild(this._textEditLayer);
        } else {
            this.addChild(this._textEditLayer);
            this.addChild(this._textCreateLayer);
        }
    }
});