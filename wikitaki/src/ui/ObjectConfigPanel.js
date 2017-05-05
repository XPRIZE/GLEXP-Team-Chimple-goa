chimple.ObjectConfigPanel = cc.LayerColor.extend({
    ctor: function (width, height, position, configuration, contentPanel) {
        this._super(chimple.PRIMARY_COLOR, width, height);
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
        return new chimple.ButtonPanel(new cc.p(0, 0), this.getContentSize(), 1, 7, this._configuration.blank, new chimple.ButtonHandler(this.buttonPressed, this));
    },
    setTarget: function (target) {
        if (target == null) {
            this._target = null;
            this.setButtonPanel(this.getDefaultPanel());
            this.resetToMove();
        }
        else if (this._target != target) {
            this._target = target;

            if (target.getName().indexOf("Skeleton") != -1 || target.getName().indexOf("skeleton") != -1) {
                this.setButtonPanel(new chimple.ButtonPanel(new cc.p(0, 0), this.getContentSize(), 1, 7, this._configuration[target.getName()], new chimple.ButtonHandler(this.buttonPressed, this)));
                this.resetToMove();
            } else if (target.getName().indexOf("ChimpleCustomText") != -1) {
                this.setButtonPanel(new chimple.ButtonPanel(new cc.p(0, 0), this.getContentSize(), 1, 7, this._configuration.editText, new chimple.ButtonHandler(this.buttonPressed, this)));
            } else if (target.getName().indexOf("background") != -1) {
                this.setButtonPanel(new chimple.ButtonPanel(new cc.p(0, 0), this.getContentSize(), 1, 7, this._configuration.editBackGroundObject, new chimple.ButtonHandler(this.buttonPressed, this)));
                this.resetToMove();
            }
            else {
                this.setButtonPanel(new chimple.ButtonPanel(new cc.p(0, 0), this.getContentSize(), 1, 7, this._configuration.editObject, new chimple.ButtonHandler(this.buttonPressed, this)));
                this.resetToMove();
            }
            if (this._contentPanel._isRecordingStarted) {
                this._buttonPanel.enableButton("delete", false);
                this._buttonPanel.enableButton("avatar", false);
            } else {
                this._buttonPanel.enableButton("delete", true);
                this._buttonPanel.enableButton("avatar", true);
            }
        }
    },
    resetToMove: function () {
        this._contentPanel._moveAction = true;
        this._contentPanel._rotateAction = false;
        this._contentPanel._scaleAction = false;
        var moveButton = this._buttonPanel.getButtonByName("icons/move.png");
        if (moveButton != null) {
            moveButton.setHighlighted(true);
        }
    },

    resetToMoveOnBackGround: function () {
        this._contentPanel._moveAction = true;
        this._contentPanel._rotateAction = false;
        this._contentPanel._scaleAction = false;
        var moveButton = this._buttonPanel.getButtonByName("icons/move.png");
        if (moveButton != null) {
            moveButton.setHighlighted(true);
        }
    },

    buttonPressed: function (button) {
        if (button.getName() == "icons/move.png") {
            this._contentPanel._moveAction = true;
            this._contentPanel._rotateAction = false;
            this._contentPanel._scaleAction = false;
            button.setEnabled(false);
            button.setHighlighted(true);
            var rotateButton = button.parent.getButtonByName("icons/rotate.png");
            if (rotateButton != null) {
                rotateButton.setEnabled(true);
                rotateButton.setHighlighted(false);
            }
            var scaleButton = button.parent.getButtonByName("icons/scale.png");
            if (scaleButton != null) {
                scaleButton.setEnabled(true);
                scaleButton.setHighlighted(false);
            }                        
        } else if (button.getName() == "icons/rotate.png") {
            this._contentPanel._moveAction = false;
            this._contentPanel._rotateAction = true;
            this._contentPanel._scaleAction = false;
            button.setEnabled(false);
            button.setHighlighted(true);
            var moveButton = button.parent.getButtonByName("icons/move.png");
            if (moveButton != null) {
                moveButton.setEnabled(true);
                moveButton.setHighlighted(false);
            }
            var scaleButton = button.parent.getButtonByName("icons/scale.png");
            if (scaleButton != null) {
                scaleButton.setEnabled(true);
                scaleButton.setHighlighted(false);
            }            
        } else if (button.getName() == "icons/scale.png") {
            this._contentPanel._moveAction = false;
            this._contentPanel._rotateAction = false;
            this._contentPanel._scaleAction = true;
            button.setEnabled(false);
            button.setHighlighted(true);
            var moveButton = button.parent.getButtonByName("icons/move.png");
            if (moveButton != null) {
                moveButton.setEnabled(true);
                moveButton.setHighlighted(false);
            }
            var rotateButton = button.parent.getButtonByName("icons/rotate.png");
            if (rotateButton != null) {
                rotateButton.setEnabled(true);
                rotateButton.setHighlighted(false);
            }
            
        }
        else if (button.getName() == "icons/flipX.png") {
            if (this._target) {
                this._target.setScaleX(-1 * this._target.getScaleX());
                var comExtensionData = this._target.getComponent("ComExtensionData");
                if (comExtensionData && comExtensionData.getActionTag()) {
                    chimple.ParseUtil.updateFlipObjectFromStoredScene(comExtensionData.getActionTag(), this._target.getScaleX());
                }
            }
        } else if (button.getName() == "icons/delete.png") {
            if (this._target) {
                var comExtensionData = this._target.getComponent("ComExtensionData");
                if (comExtensionData && comExtensionData.getActionTag()) {
                    chimple.ParseUtil.removeObjectFromStoredScene(comExtensionData.getActionTag());
                } else if (this._target.ActionTag) {
                    chimple.ParseUtil.removeObjectFromStoredScene(this._target.ActionTag);
                }
                this._target.parent.removeChild(this._target, true);
                this.setButtonPanel(this.getDefaultPanel());
            }
        } else if (button.getName() == "icons/avatar.png") {
            if (this._target && this._target._skeletonConfig != null && this._target._skeletonConfig.skinChoices != null) {
                this.parent.addChild(new chimple.PreviewPanel(cc.director.getWinSize().width, cc.director.getWinSize().height, cc.p(0, 0), this._target, this._target._skeletonConfig.skinChoices, this.skinSelected, this, true, this._contentPanel), 1);
            }
        } else if (button.getName() == "icons/animation.png") {
            if (this._target && this._target._skeletonConfig != null && this._target._skeletonConfig.animations != null) {
                this.parent.addChild(new chimple.PreviewPanel(cc.director.getWinSize().width, cc.director.getWinSize().height, cc.p(0, 0), this._target, this._target._skeletonConfig.animations, this.animationSelected, this, false, this._contentPanel), 1);
            }
        } else if (button.getName() == "icons/book.png") {
            var fontSize = this._target.getFontSize();
            fontSize += - 1;
            this._target.setFontSize(fontSize);
        } else if (button.getName() == "icons/next.png") {
            var fontSize = this._target.getFontSize();
            fontSize += 1;
            this._target.setFontSize(fontSize);
        } else if (button.getName() == res.text_png) {
            this._contentPanel.addTextToScene(chimple.story.items[chimple.pageIndex].sceneText);
        }
    },
    skinSelected: function (selectedItem) {
        if (this._target != null && selectedItem._configuration) {
            if (selectedItem._configuration.skins) {
                chimple.CharacterUtil.displaySkins(this._target, selectedItem._configuration.skins);

            } else if (selectedItem._configuration.colorSkins) {
                chimple.CharacterUtil.colorSkins(this._target, selectedItem._configuration.colorSkins);
            }
        }
    },
    animationSelected: function (selectedItem) {
        this._target._currentAnimationName = selectedItem._configuration.name;
        chimple.ParseUtil.updateUserData(this._target._actionTag, 'currentAnimationName', this._target._currentAnimationName);
        var action = this._target.actionManager.getActionByTag(this._target.tag, this._target);
        action.play(this._target._currentAnimationName, false);
    }
});
