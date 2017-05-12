var chimple = chimple || {};
chimple.TextReadPanel = cc.Layer.extend({
    ctor: function (width, height, position, existingText, callback, callbackContext) {
        this._super(width, height);
 
        this._textField = new ccui.WebView();
        localStorage.setItem("scene_display_text_contents", chimple.story.items[chimple.pageIndex].sceneText);
        this._textField.loadURL("/displayText.html?height=" + height * 0.8);
        this._textField.setPosition(cc.director.getWinSize().width / 2, cc.director.getWinSize().height / 2);
        this._textField.setContentSize(cc.size(cc.director.getWinSize().width * 0.7, cc.director.getWinSize().height * 0.7));
        this._textField.setScalesPageToFit(true);
        this._textField.setAnchorPoint(0.5, 0.5);
        this.addChild(this._textField, 0);
    }

});
