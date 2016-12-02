var xc = xc || {};
xc.BubbleSpeech = cc.Layer.extend({
    ctor: function (jsonNode, width, height, position, existingText, callback, audiocallback, callbackContext) {
        this._super(width, height);
        this.callback = callback;
        this.audiocallback = audiocallback;
        this._callbackContext = callbackContext;
        this._text = existingText;
        this._nodeJSON = jsonNode;

        this._constructedScene = ccs.load(this._nodeJSON,xc.path);
        this._constructedScene.node.retain();
        
        if (this._constructedScene.node) {
            this.addChild(this._constructedScene.node,0);
        }                        

        var closeButton = this._constructedScene.node.getChildByName("Button_1");
        closeButton.setTitleText("");
        closeButton.addTouchEventListener(this.close, this);

        var soundButton = this._constructedScene.node.getChildByName("Button_2");
        soundButton.setTitleText("");
        soundButton.addTouchEventListener(this.audiocallback, this._callbackContext);
        
        var textContentMargin = 10; 

        this._textField = new ccui.TextField();
        this._textField.setFontName(xc.storyFontName)
        this._textField.setTextColor(xc.storyFontColor);
        this._textField.setFontSize(xc.storyFontSize);
        this._textField.setAnchorPoint(0.5, 0.5);
        this._textField.setPosition(cc.director.getWinSize().width / 2 - 2 * textContentMargin + textContentMargin, cc.director.getWinSize().height/2 - 2 * textContentMargin);
        this._textField.setMaxLengthEnabled(true);
        this._textField.setMaxLength(2500);
        this._textField.ignoreContentAdaptWithSize(false);
        this._textField.setPlaceHolderColor(cc.color.BLUE);
        this._textField.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        this._textField.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this._textField.setContentSize(cc.size(cc.director.getWinSize().width  * 0.6 , cc.director.getWinSize().height * 0.75));
        if (this._text) {
            this._textField.setString(this._text);
        }
        this._textField.setTouchEnabled(false);
        this.addChild(this._textField, 0);
    },


    close: function (sender, type) {
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
});
