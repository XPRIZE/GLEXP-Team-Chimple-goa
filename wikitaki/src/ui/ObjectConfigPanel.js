chimple.ObjectConfigPanel = cc.LayerColor.extend({
    ctor: function (width, height, position, configuration, contentPanel) {
        this._super(cc.color.RED, width, height);
        this.setPosition(position);
        this._configuration = configuration;
        this._contentPanel = contentPanel;
        this.setButtonPanel(this.getDefaultPanel());
    },
    setButtonPanel: function (buttonPanel) {
        if (this._buttonPanel) {
            this.removeChild(this._buttonPanel, true);
        }
        this._buttonPanel = buttonPanel;
        this.addChild(buttonPanel, 1);
    },
    getDefaultPanel: function () {
        return new chimple.ButtonPanel(new cc.p(0, 0), this.getContentSize(), 1, 6, this._configuration.editDefault, this.buttonPressed, this);
    },
    setTarget: function (target) {
        if (this._target != target) {
            this._target = target;
            if (target.getName().indexOf("Skeleton") != -1) {
                this.setButtonPanel(new chimple.ButtonPanel(new cc.p(0, 0), this.getContentSize(), 1, 6, this._configuration.editCharacter, this.buttonPressed, this));
            } else if (target.getName().indexOf("ChimpleCustomText") != -1) {
                this.setButtonPanel(new chimple.ButtonPanel(new cc.p(0, 0), this.getContentSize(), 1, 6, this._configuration.editText, this.buttonPressed, this));
            }
            else {
                this.setButtonPanel(new chimple.ButtonPanel(new cc.p(0, 0), this.getContentSize(), 1, 6, this._configuration.editObject, this.buttonPressed, this));
            }
        }
    },
    buttonPressed: function (button) {
        if (button.getName() == res.translate_png) {
            if (button._isToggled) { //if button is toggled then it is rotate
                this._contentPanel._moveAction = false;
                this._contentPanel._rotateAction = true;
                this._contentPanel._scaleAction = true;
            } else {
                this._contentPanel._moveAction = true;
                this._contentPanel._rotateAction = false;
                this._contentPanel._scaleAction = false;
            }
        } else if (button.getName() == res.flipx_png) {
            if (this._target) {
                this._target.setScaleX(-1 * this._target.getScaleX());
            }
        } else if (button.getName() == res.delete_png) {
            if (this._target) {
                var comExtensionData = this._target.getComponent("ComExtensionData");
                if(comExtensionData && comExtensionData.getActionTag()) {
                    chimple.ParseUtil.removeObjectFromStoredScene(this._contentPanel._pageKey, comExtensionData.getActionTag()); 
                }
                this._target.parent.removeChild(this._target, true);
                this.setButtonPanel(this.getDefaultPanel());
            }
        } else if (button.getName() == res.my_avatar_png) {
            if (this._target && this._target._skeletonConfig != null && this._target._skeletonConfig.skinChoices != null) {
                this.parent.addChild(new chimple.PreviewPanel(cc.director.getWinSize().width, cc.director.getWinSize().height, cc.p(0, 0), this._target, this._target._skeletonConfig.skinChoices, this.skinSelected, this, true, this._contentPanel), 1);
            }
        } else if (button.getName() == res.animation_png) {
            if (this._target && this._target._skeletonConfig != null && this._target._skeletonConfig.animations != null) {
                this.parent.addChild(new chimple.PreviewPanel(cc.director.getWinSize().width, cc.director.getWinSize().height, cc.p(0, 0), this._target, this._target._skeletonConfig.animations, this.animationSelected, this, false, this._contentPanel), 1);
            }
        } else if (button.getName() == res.book_png) {
            var fontSize = this._target.getFontSize();
            fontSize += - 1;
            this._target.setFontSize(fontSize);
        } else if (button.getName() == res.next_png) {
            var fontSize = this._target.getFontSize();
            fontSize += 1;
            this._target.setFontSize(fontSize);
        } else if (button.getName() == res.text_png) {
            this._contentPanel.addTextToScene(this._target.getString());
        }
    },
    skinSelected: function (selectedItem) {
        if (this._target != null && selectedItem._configuration) {
            if (selectedItem._configuration.skins) {
                chimple.CharacterUtil.displaySkins(this._target, selectedItem._configuration.skins, this._contentPanel._pageKey);
            } else if (selectedItem._configuration.colorSkins) {
                chimple.CharacterUtil.colorSkins(this._target, selectedItem._configuration.colorSkins);
            }
        }
    },
    animationSelected: function (selectedItem) {
        this._target._currentAnimationName = selectedItem._configuration.name;
        chimple.ParseUtil.updateUserData(this._contentPanel._pageKey, this._target._actionTag, 'currentAnimationName', this._target._currentAnimationName);
        var action = this._target.actionManager.getActionByTag(this._target.tag, this._target);
        action.play(this._target._currentAnimationName, false);
    }
});
