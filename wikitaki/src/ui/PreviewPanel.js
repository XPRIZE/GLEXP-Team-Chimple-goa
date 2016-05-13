chimple.PreviewPanel = cc.LayerColor.extend({
    ctor: function (width, height, position, target, configuration, callback, callbackContext, isTab, contentPanel) {
        this._super(cc.color.BLUE, width, height);
        var backButton = new ccui.Button('icons/back.png', 'icons/back_onclick.png', false, ccui.Widget.PLIST_TEXTURE);
        backButton.setPosition(128, height - 128);
        backButton.addTouchEventListener(this.goBack, this);
//        this.addChild(backButton);
        this._contentPanel = contentPanel;
        this._target = target;
        this._targetParent = target.parent;
        this._targetPosition = target.getPosition();
        this._targetScale = target.getScale();
        target.removeFromParent(false);
        cc.eventManager.removeListeners(target);
        this.addChild(target);
        target.setPosition(550, 200);
        target.scaleX = 0.5;
        target.scaleY = 0.5;
        
        if(isTab) {
//            this.addChild(new chimple.TabPanel(cc.p(width / 3, 0), cc.size(width * 2 / 3, height), 2, 2, configuration, callback, callbackContext));
            this.addChild(new chimple.TabPanel(cc.p(0, 0), cc.size(width * 2 / 3, height), 2, 2, configuration, callback, callbackContext, this));
        } else {
            this.addChild(new chimple.ScrollableButtonPanel(cc.p(0, 0), cc.size(width * 2 / 3, height), 2, 2, configuration, callback, callbackContext));               
        }
    
    },
 
    goBack: function () {
                this.removeChild(this._target, false);
                this._targetParent.addChild(this._target);
                this._target.setPosition(this._targetPosition);
                this._target.setScale(this._targetScale);
                this._contentPanel.registerEventListenerForChild(this._target);

                this.parent.removeChild(this, true);
        },    
});
