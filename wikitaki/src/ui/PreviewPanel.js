chimple.PreviewPanel = cc.LayerColor.extend({
    ctor: function (width, height, position, target, configuration, callback, callbackContext, isTab, contentPanel) {
        this._super(chimple.TERTIARY_COLOR, width, height);
        var backButton = new ccui.Button('icons/back.png', 'icons/back_onclick.png', false, ccui.Widget.PLIST_TEXTURE);
        backButton.setPosition(128, height - 128);
        backButton.addTouchEventListener(this.goBack, this);
        //        this.addChild(backButton);
        this._contentPanel = contentPanel;
        this._target = target;
        this._targetParent = target.parent;
        this._targetPosition = target.getPosition();
        this._targetScaleX = target.getScaleX();
        this._targetScaleY = target.getScaleY();
        target.removeFromParent(false);
        cc.eventManager.removeListeners(target);

        
        this.addChild(target);
        target.setPosition(width*0.8, 200);
        target.scaleX = 0.5;
        target.scaleY = 0.5;
        this.bindTouchListener(this);
        if (isTab) {
            //            this.addChild(new chimple.TabPanel(cc.p(width / 3, 0), cc.size(width * 2 / 3, height), 2, 2, configuration, callback, callbackContext));
            this.addChild(new chimple.TabPanel(cc.p(0, 0), cc.size(width * 2 / 3, height), 3, 4, configuration, callback, callbackContext, this));
        } else {
            this._scrolPanel = new chimple.ScrollableButtonPanel(cc.p(0, 0), cc.size(width * 2 / 3, height), 3, 4, configuration, callback, callbackContext);
            this.addChild(this._scrolPanel);

            this.main_backButton = new ccui.Button("icons/back.png", "icons/back_onclick.png", null, ccui.Widget.PLIST_TEXTURE);
            this.main_backButton.setPosition(width * 5 / 100, height * 95 / 100);
            this.main_backButton.addTouchEventListener(this.main_backButton_function, this);
            this.addChild(this.main_backButton,1);
        }

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
                this._target.setScale(this._targetScaleX,this._targetScaleY);
                this._contentPanel.registerEventListenerForChild(this._target);

                this.parent.removeChild(this, true);

                break;
        }
    },

    tabPanel_nextButton_function: function () {
        if(typeof(this._scrolPanel.scrollableButtonPanel_moveRight) == "function") {
            this._scrolPanel.scrollableButtonPanel_moveRight();     
        }
       
    },

    tabPanel_backButton_function: function () {
        if(typeof(this._scrolPanel.scrollableButtonPanel_moveLeft) == "function") {
            this._scrolPanel.scrollableButtonPanel_moveLeft();     
        }        
    },

    goBack: function () {
        //update skins and color based on user selection
        //var renderer = new cc.RenderTexture(this._target.getBoundingBoxToWorld().width, this._target.getBoundingBoxToWorld().height);
        chimple.ParseUtil.cacheThumbnailForFavorites(this._target);
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
        this._target.setScale(this._targetScaleX,this._targetScaleY);
        this._contentPanel.registerEventListenerForChild(this._target);

        this.parent.removeChild(this, true);
    },
});
