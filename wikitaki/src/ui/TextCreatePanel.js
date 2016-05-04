chimple.TextCreatePanel = cc.LayerColor.extend({
    ctor: function (width, height, position, existingText, callback, callbackContext) {
        this._super(cc.color.WHITE, width, height);
        var backButton = new ccui.Button(res.back_png, res.back_onclick_png);
        backButton.setPosition(0, height - 256);
        backButton.addTouchEventListener(this.goBack, this);
        this.addChild(backButton);
        this._text = existingText;        
        this.callback = callback;
        this._callbackContext = callbackContext;

        var textContentMargin = 100;

        this._textField = new ccui.TextField();
        //this._textField.setSize(cc.size(cc.director.getWinSize().width / 2, cc.director.getWinSize().height / 2));
        this._textField.setFontSize(50);
        this._textField.setTextColor(cc.color.BLACK);
        this._textField.setAnchorPoint(0.5, 0.5);
        this._textField.setPosition(cc.director.getWinSize().width / 2 + textContentMargin, cc.director.getWinSize().height / 2 - 2 * textContentMargin);
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
        this._textField.addEventListener(this.updateText, this);
        this.addChild(this._textField, 0);
    },

    updateText: function (sender, type) {
        switch (type) {
            case ccui.TextField.EVENT_ATTACH_WITH_IME:
                cc.log("displayed keyboard");
                break;
            case ccui.TextField.EVENT_DETACH_WITH_IME:
                cc.log("closed keyboard");
                if (cc.sys.isNative) {
                    self.goBack();
                }
                break;
            case ccui.TextField.EVENT_INSERT_TEXT:
                cc.log("text entered");
                this._text = sender.getString();
                break;
        }
    },

    goBack: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                cc.log('back button pressed');
                this.parent.removeChild(this, true);
                if (this.callback != null && this._callbackContext != null) {
                    this.callback.call(this._callbackContext, this._text);
                }
                break;
        }
    },

});
