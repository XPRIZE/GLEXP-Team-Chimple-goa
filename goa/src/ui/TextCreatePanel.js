var xc = xc || {};
xc.TextCreatePanel = cc.Layer.extend({
    ctor: function (width, height, position, existingText, callback, callbackContext, enabled) {
        this._super(width, height);
        var backButton = new ccui.Button('icons/check.png', 'icons/check_onclick.png', 'icons/check_onclick.png', ccui.Widget.PLIST_TEXTURE);
        backButton.setPosition(cc.director.getWinSize().width * 0.8, cc.director.getWinSize().height * 0.9);
        backButton.addTouchEventListener(this.goBack, this);
        this.addChild(backButton);                
        this.callback = callback;
        this._callbackContext = callbackContext;
        this._text = existingText;

        var backgroundLayer = cc.LayerColor.create(new cc.Color(140, 140, 140, 255), cc.director.getWinSize().width * 0.7, cc.director.getWinSize().height * 0.7);        
        backgroundLayer.setPosition(position);
        backgroundLayer.setAnchorPoint(0.5, 0.5);        
        this.addChild(backgroundLayer, 0);

        var textContentMargin = 100; 

        this._textField = new ccui.TextField();
        this._textField.setFontSize(50);
        this._textField.setAnchorPoint(0.5, 0.5);
        this._textField.setPosition(cc.director.getWinSize().width / 2  + textContentMargin, cc.director.getWinSize().height/2 - 2 * textContentMargin);
        this._textField.setMaxLengthEnabled(true);
        this._textField.setMaxLength(500);
        this._textField.ignoreContentAdaptWithSize(false);
        this._textField.setPlaceHolderColor(cc.color.BLUE);
        this._textField.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        this._textField.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_TOP);
        this._textField.setContentSize(cc.size(cc.director.getWinSize().width  * 0.6 , cc.director.getWinSize().height * 0.6));
        if (this._text) {
            this._textField.setString(this._text);
        }
        this.addChild(this._textField, 0);
        if(enabled) {
            this._textField.addEventListener(this.updateText, this);
            this._textField.setTouchEnabled(true);
        }  else {
            this._textField.setTouchEnabled(false);
        }
        


    },   

    goBack: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                var contents = this._text;
                this._textField.cleanup();
                this.parent.removeChild(this, true);
                if (this.callback != null && this._callbackContext != null) {
                    this.callback.call(this._callbackContext, contents);
                }
                break;
        }
    },
    
    updateText: function (sender, type) {
        switch (type) {
            case ccui.TextField.EVENT_ATTACH_WITH_IME:
                break;
            case ccui.TextField.EVENT_DETACH_WITH_IME:
                break;
            case ccui.TextField.EVENT_INSERT_TEXT:
                this._text = sender.getString();
                break;
        }
    },
    

});
