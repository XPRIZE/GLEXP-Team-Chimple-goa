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

        if (isTab) {
            //            this.addChild(new chimple.TabPanel(cc.p(width / 3, 0), cc.size(width * 2 / 3, height), 2, 2, configuration, callback, callbackContext));
            this.addChild(new chimple.TabPanel(cc.p(0, 0), cc.size(width * 2 / 3, height), 2, 2, configuration, callback, callbackContext, this));
        } else {
            this._scrolPanel = new chimple.ScrollableButtonPanel(cc.p(0, 0), cc.size(width * 2 / 3, height), 2, 2, configuration, callback, callbackContext);
            this.addChild(this._scrolPanel);

            this.tabPanel_backButton = new ccui.Button("icons/back.png", "icons/back_onclick.png", null, ccui.Widget.PLIST_TEXTURE);
            this.tabPanel_backButton.setPosition(width * 5 / 100, height * 50 / 100);
            this.tabPanel_backButton.addTouchEventListener(this.tabPanel_backButton_function, this);
            this.addChild(this.tabPanel_backButton);

            this.tabPanel_nextButton = new ccui.Button("icons/next.png", "icons/next_onclick.png", null, ccui.Widget.PLIST_TEXTURE);
            this.tabPanel_nextButton.setPosition(width * 62 / 100, height * 50 / 100);
            this.tabPanel_nextButton.addTouchEventListener(this.tabPanel_nextButton_function, this);
            this.addChild(this.tabPanel_nextButton);

            this.main_backButton = new ccui.Button("icons/back.png", "icons/back_onclick.png", null, ccui.Widget.PLIST_TEXTURE);
            this.main_backButton.setPosition(width * 5 / 100, height * 95 / 100);
            this.main_backButton.addTouchEventListener(this.main_backButton_function, this);
            this.addChild(this.main_backButton);
        }

    },

    main_backButton_function: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                this.removeChild(this._target, false);
                this._targetParent.addChild(this._target);
                this._target.setPosition(this._targetPosition);
                this._target.setScale(this._targetScale);
                this._contentPanel.registerEventListenerForChild(this._target);

                this.parent.removeChild(this, true);

                break;
        }
    },

    tabPanel_nextButton_function: function () {
        this._scrolPanel.scrollableButtonPanel_moveRight();
    },

    tabPanel_backButton_function: function () {
        this._scrolPanel.scrollableButtonPanel_moveLeft();
    },

    goBack: function () {
        //update skins and color based on user selection
        //var renderer = new cc.RenderTexture(this._target.getBoundingBoxToWorld().width, this._target.getBoundingBoxToWorld().height);
        var renderer = new cc.RenderTexture(64 * 4, 64 * 4);
        this._target._renderCmd._dirtyFlag = 1;
        renderer.begin();
        this._target.visit();
        this._target._renderCmd._dirtyFlag = 1;
        renderer.end();
        // renderer.setContentSize(cc.size(64,64));
        renderer.scaleY = -1;
        this._target._renderCmd._dirtyFlag = 1;
        var sprite = renderer.getSprite();
        var cacheName = '/res/' + this._target. uniqueCharacterID + '.png';
        cc.textureCache.cacheImage(cacheName, sprite.texture);
        renderer.cleanup();
        if (chimple.customCharacters && chimple.customCharacters.items) {
            chimple.customCharacters.items.forEach(function (element) {
                if (element.uniqueCharacterID == this._target.uniqueCharacterID) {
                    element.favoriteSkins = this._target._userData.visibleSkins;
                }
            }, this);
        }

        this.removeChild(this._target, false);
        this._targetParent.addChild(this._target);
        this._target.setPosition(this._targetPosition);
        this._target.setScale(this._targetScale);
        this._contentPanel.registerEventListenerForChild(this._target);

        this.parent.removeChild(this, true);
    },
});
