var xc = xc || {};

xc.PreviewPanel = cc.LayerColor.extend({
    ctor: function (width, height, position, target, configuration, callback, callbackContext, isTab, contentPanel) {
        this._super(xc.TERTIARY_COLOR, width, height);
        var backButton = new ccui.Button('icons/back.png', 'icons/back_onclick.png', 'icons/back_onclick.png', ccui.Widget.PLIST_TEXTURE);
        backButton.setPosition(128, height - 128);
        backButton.addTouchEventListener(this.goBack, this);
        //        this.addChild(backButton);
        this._contentPanel = contentPanel;
        
        this._target = target;
        this._targetParent = target.parent;        
        this._targetPosition = target.getPosition();
        this._targetScaleX = target.getScaleX();
        this._targetScaleY = target.getScaleY();

        this._targetRotationX = target.getRotationX();
        this._targetRotationY = target.getRotationY();
        cc.eventManager.removeListeners(target);
        target.removeFromParent(false);
        
        this.addChild(target);
        target.setRotation(0);
        target.setPosition(width * 0.8, 200);
        target.scaleX = 0.5;
        target.scaleY = 0.5;
        this.bindTouchListener(this);
        if (isTab) {
            this._tabPanel = new xc.TabPanel(cc.p(0, 0), cc.size(width * 2 / 3, height), 3, 4, configuration, callback, callbackContext, this);
            this.addChild(this._tabPanel);
        } else {
            this._scrolPanel = new xc.ScrollableButtonPanel(cc.p(0, 0), cc.size(width * 2 / 3, height), 3, 4, configuration, callback, callbackContext);
            this.addChild(this._scrolPanel);
            this.main_backButton = new ccui.Button("icons/back.png", "icons/back_onclick.png", "icons/back_onclick.png", ccui.Widget.PLIST_TEXTURE);
            this.main_backButton.setPosition(width * 5 / 100, height * 95 / 100);
            this.main_backButton.addTouchEventListener(this.main_backButton_function, this);
            this.addChild(this.main_backButton, 1);
        }
        this._contentPanel._isRecordingPaused = true;
    },


    bindTouchListener: function (target) {
        var context = this;
        this._listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                return true;
            }
        });
        cc.eventManager.addListener(this._listener, target);
    },

    main_backButton_function: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                this.removeChild(this._target, false);
                this._targetParent.addChild(this._target);
                this._target.setPosition(this._targetPosition);
                this._target.setScale(this._targetScaleX, this._targetScaleY);
                this._target.setRotation(this._targetRotationX);
                this._contentPanel._isRecordingPaused = false;
                this._contentPanel.registerEventListenerForChild(this._target);

                this.parent.removeChild(this, true);

                break;
        }
    },

    tabPanel_nextButton_function: function () {
        if (typeof (this._scrolPanel.scrollableButtonPanel_moveRight) == "function") {
            this._scrolPanel.scrollableButtonPanel_moveRight();
        }

    },

    tabPanel_backButton_function: function () {
        if (typeof (this._scrolPanel.scrollableButtonPanel_moveLeft) == "function") {
            this._scrolPanel.scrollableButtonPanel_moveLeft();
        }
    },

    goBack: function () {
        //update skins and color based on user selection
        //var renderer = new cc.RenderTexture(this._target.getBoundingBoxToWorld().width, this._target.getBoundingBoxToWorld().height);
        cc.log('in preview 1111');
        xc.ParseUtil.cacheThumbnailForFavorites(this._target);
        cc.log('in preview 2222');
        if (xc.customCharacters && xc.customCharacters.items) {
            cc.log('in preview 3333');
            xc.customCharacters.items.forEach(function (element) {
                cc.log('in preview 444' + element.uniqueCharacterID);
                cc.log('in preview 4444444' + this._target.uniqueCharacterID);
                if (element.uniqueCharacterID == this._target.uniqueCharacterID) {
                    element.favoriteSkins = xc.ParseUtil.getUserData(this._target._actionTag,'visibleSkins');
                    cc.log('in preview 555' + JSON.stringify(element.favoriteSkins));
                }
            }, this);
        }

        this.removeChild(this._target, false);
        this._targetParent.addChild(this._target);
        this._target.setPosition(this._targetPosition);
        this._target.setScale(this._targetScaleX, this._targetScaleY);
        this._target.setRotation(this._targetRotationX);
        this._contentPanel._isRecordingPaused = false;
        this._contentPanel.registerEventListenerForChild(this._target);

        this.parent.removeChild(this, true);
    },
    onEnter: function () {
        this._super();
        xc.CharacterUtil.storeActionToTemporaryStore(this);
    },

    onExit: function () {
        this._super();
        xc.CharacterUtil.restoreActionFromTemporaryStore(this);
    }
});
