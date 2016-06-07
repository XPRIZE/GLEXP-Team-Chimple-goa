/// <reference path="../../cocos2d-typescript-definitions/cocos2d/cocos2d-lib.d.ts" />
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

        var textContentMargin = 100; 

        this._textField = new ccui.TextField();
        //this._textField.setSize(cc.size(cc.director.getWinSize().width / 2, cc.director.getWinSize().height / 2));
        this._textField.setFontSize(50);
        this._textField.setAnchorPoint(0.5, 0.5);
        this._textField.setPosition(cc.director.getWinSize().width / 2  + textContentMargin, cc.director.getWinSize().height/2 - 2 * textContentMargin);
        this._textField.setMaxLengthEnabled(true);
        this._textField.setMaxLength(500);
        this._textField.ignoreContentAdaptWithSize(false);
        this._textField.setPlaceHolderColor(cc.color.BLUE);
        this._textField.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        this._textField.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_TOP);
        this._textField.setContentSize(cc.size(cc.director.getWinSize().width - 4 * textContentMargin, cc.director.getWinSize().height));
        if (this._text) {
            this._textField.setString(this._text);
        }
        this.addChild(this._textField, 0);  
        this._textField.addEventListener(this.updateText, this);
    },

    changeText: function (text) {
        this._text = text;
        this._textField.setString(this._text);
    },

    updateText: function (sender, type) {
        switch (type) {
            case ccui.TextField.EVENT_ATTACH_WITH_IME:
                break;
            case ccui.TextField.EVENT_DETACH_WITH_IME:
                if (cc.sys.isNative) {
                    self.closeEditor();
                }
                break;
            case ccui.TextField.EVENT_INSERT_TEXT:
                this._text = sender.getString();
                break;
        }
    },

    closeEditor: function () {
        cc.sys.localStorage.setItem(this._textKey, this._text);
        cc.director.popScene();        
        // this.parent._textEditLayer.changeText(this._text);
        // this.parent._textEditLayer.setVisible(true);
    }
});

// var TextEditLayer = cc.Layer.extend({
//     _defaultTextSize: 40,
//     _initialSliderPercentage: 50,
//     ctor: function (existingText, textKey) {
//         this._super();
//         this._text = existingText;
//         this._textKey = textKey;
//         return true;
//     },

//     changeText: function (text) {
//         this._text = text;
//         this._textNode.setString(text);
//     },

//     init: function () {
//         //assuming landscape mode, width will be more than height
//         var maxHeight = cc.director.getWinSize().height;
//         var rightLayerWidth = cc.director.getWinSize().width - cc.director.getWinSize().height; 
//         var textContentMargin = 30; 
//         var leftLayer = cc.LayerColor.create(new cc.Color(200, 230, 230, 255), maxHeight, maxHeight);
//         this.addChild(leftLayer, 0);

//         var rightLayer = cc.LayerColor.create(new cc.Color(160, 160, 160, 255), rightLayerWidth, maxHeight);
//         rightLayer.setPosition(maxHeight, 0);
//         this.addChild(rightLayer, 0);

//         if (!cc.sys.isNative) {
//             var closeButtonSprite = new cc.Sprite(res.close_pop_png, cc.rect(0, 0, 150, 150));

//             var closeButton = new cc.MenuItemSprite(closeButtonSprite, null, null, this.closeEditor, this);
//             var menu = new cc.Menu(closeButton);
//             menu.alignItemsVerticallyWithPadding(10);
//             this.addChild(menu, 0);
//             menu.setPosition(maxHeight, cc.director.getWinSize().height - 150);
//         }


//         //create slider for FONT size changes
//         //create COLOR picker for Font Color Change

//         var sliderLabel = new cc.LabelTTF("Change Font Size:", "AmericanTypewriter", 40);
//         sliderLabel.setPosition(300, cc.director.getWinSize().height / 2 + 200);
//         leftLayer.addChild(sliderLabel);

//         var slider = new ccui.Slider("res/sliderTrack.png",
//             "res/sliderThumb.png");
//         slider.setPosition(900, cc.director.getWinSize().height / 2 + 200);
//         slider.setPercent(this._initialSliderPercentage);

//         slider.addEventListener(this.sliderChanged, this);
//         leftLayer.addChild(slider);

//         this._textNode = new ccui.Text(this._text, "AmericanTypewriter", this._defaultTextSize);
//         this._textNode.setAnchorPoint(0, 1);
//         this._textNode.setPosition(maxHeight + textContentMargin, cc.director.getWinSize().height - 100);
//         this._textNode.ignoreContentAdaptWithSize(false);
//         this._textNode.setContentSize(cc.size(rightLayerWidth - 2 * textContentMargin, cc.director.getWinSize().height - 100));
//         this._textNode.setTouchEnabled(true);
//         this._textNode.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
//         this._textNode.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_TOP);
//         this._textNode.addTouchEventListener(this.textEvent, this);
//         this.addChild(this._textNode);
//         slider.referenceTextNode = this._textNode;
//     },

//     textEvent: function (sender, type) {

//         switch (type) {
//             case ccui.Widget.TOUCH_BEGAN:
//                 break;
//             case ccui.Widget.TOUCH_MOVED:
//                 break;
//             case ccui.Widget.TOUCH_ENDED:
//                 cc.log("touch ended");
//                 //open text create layer
//                 this.setVisible(false);
//                 this.parent._textCreateLayer.changeText(this._text);
//                 this.parent._textCreateLayer.setVisible(true);

//                 if (cc.sys.isNative) {
//                     self.closeEditor();
//                 }

//                 break;
//             case ccui.Widget.TOUCH_CANCELED:
//                 break;
//             default:
//                 break;
//         }
//     },


//     sliderChanged: function (sender, type) {
//         cc.log(sender.getPercent());
//         var difference = Math.ceil(sender.getPercent() - this._initialSliderPercentage);
//         var updatedFontSize = this._defaultTextSize + difference;
//         sender.referenceTextNode.setFontSize(updatedFontSize);
//     },

//     closeEditor: function () {
//         cc.sys.localStorage.setItem(this._textKey, this._text);
//         cc.director.popScene();
//     }
// });

var TextEditScene = cc.Scene.extend({
    _text: null,
    ctor: function (text, textKey) {
        this._super();
        this._text = text;
        this._textKey = textKey;
    },

    onEnter: function () {
        this._super();

        this._textCreateLayer = new TextCreateLayer(this._text, this._textKey);
        this._textCreateLayer.init();
        this.addChild(this._textCreateLayer);
    }
});