var chimple = chimple || {};
chimple.TextCreatePanel = cc.LayerColor.extend({
    ctor: function (width, height, position, existingText, callback, callbackContext) {
        this._super(chimple.SECONDARY_COLOR, width, height);
        var backButton = new ccui.Button('icons/back.png', 'icons/back_onclick.png', null, ccui.Widget.PLIST_TEXTURE);
        backButton.setPosition(20, height - 20);
        backButton.addTouchEventListener(this.goBack, this);
        this.addChild(backButton);                
        this.callback = callback;
        this._callbackContext = callbackContext;
        
        
        this._textField = new ccui.WebView();
        localStorage.setItem('scene_text_contents', chimple.story.items[chimple.pageIndex].sceneText);
        this._textField.loadURL("/textView.html?height=" + height);
        this._textField.setPosition(cc.director.getWinSize().width / 2, cc.director.getWinSize().height / 2);
        this._textField.setContentSize(cc.size(cc.director.getWinSize().width * 0.8, cc.director.getWinSize().height * 0.8));
        this._textField.setScalesPageToFit(true);
        this._textField.setAnchorPoint(0.5, 0.5);
        this.addChild(this._textField, 0);
    },   

    goBack: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                var contents = localStorage.getItem('scene_text_contents');
                localStorage.removeItem('scene_text_contents');
                this._textField.cleanup();
                this.parent.removeChild(this, true);
                if (this.callback != null && this._callbackContext != null) {
                    this.callback.call(this._callbackContext, contents);
                }
                break;
        }
    },

});
