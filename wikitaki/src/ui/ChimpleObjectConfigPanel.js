chimple.ObjectConfigPanel = cc.LayerColor.extend({
    ctor: function (width, height, position, configuration, contentPanel) {
        this._super(cc.color.RED, width, height);
        this.setPosition(position);
        this._configuration = configuration;
        this._contentPanel = contentPanel;
    },
    setTarget(target) {
        if (this._target != target) {
            this._target = target;
            if (this._buttonPanel) {
                this.removeChild(this._buttonPanel, true);
            }
            if (target.getName().indexOf("Skeleton") != -1) {
                this._buttonPanel = new chimple.ButtonPanel(new cc.p(0, 0), this.getContentSize(), 1, 6, this._configuration.editObject, this.buttonPressed, this);
            } else if (target.getName().indexOf("ChimpleCustomText") != -1) {
                this._buttonPanel = new chimple.ButtonPanel(new cc.p(0, 0), this.getContentSize(), 1, 6, this._configuration.editText, this.buttonPressed, this);
            }
            else {
                this._buttonPanel = new chimple.ButtonPanel(new cc.p(0, 0), this.getContentSize(), 1, 6, this._configuration.editCharacter, this.buttonPressed, this);
            }
            this.addChild(this._buttonPanel);
        }
    },
    buttonPressed: function (button) {
        if (button.getName() == res.translate_png) {
            if (button.isHighlighted()) { //if button is highlighted then it is rotate
                this._contentPanel._moveAction = false;
                this._contentPanel._rotateAction = true;
                this._contentPanel._scaleAction = true;
            } else {
                this._contentPanel._moveAction = true;
                this._contentPanel._rotateAction = false;
                this._contentPanel._scaleAction = false;
            }
        } else if (button.getName() == res.flipx_png) {
            this._target.setScaleX(-1 * this._target.getScaleX());
        } else if (button.getName() == res.delete_png) {
            this._target.parent.removeChild(this._target, true);
        } else if (button.getName() == res.my_avatar_png) {
            if (this._target._skeletonConfig != null && this._target._skeletonConfig.skinChoices != null) {
                this.parent.addChild(new chimple.PreviewPanel(cc.director.getWinSize().width, cc.director.getWinSize().height, cc.p(0, 0), this._target, this._target._skeletonConfig.skinChoices, this.skinSelected, this));
            }
        } else if (button.getName() == res.animation_png) {
            if (this._target.getUserData() != null && this._target.getUserData().animations != null) {
                this.parent.push(new chimple.ConfigPanel(this._target, cc.p(0, 0), cc.size(760, 1800), 2, 2, this._target.getUserData().animations, this.animationSelected, this, false));
            }
        } else if (button.getName() == res.book_png) {
            var fontSize = this._target.getFontSize();
            fontSize += -1;
            this._target.setFontSize(fontSize);
        } else if (button.getName() == res.next_png) {
            var fontSize = this._target.getFontSize();
            fontSize += 1;            
            this._target.setFontSize(fontSize);
            //Fix Font
            //this._contentPanel.saveTextToLocalStorage(this._target.parent, res.bubble_png);
        } else if (button.getName() == res.text_png) {            
            this._contentPanel.addTextToScene(this._target.getString());
        }
    },
    skinSelected: function (selectedItem) {
        if (this._target != null && selectedItem._configuration) {
            if (selectedItem._configuration.skins && selectedItem._configuration.skins.length > 0) {
                selectedItem._configuration.skins.forEach(function (element) {
                    this._target.getBoneNode(element.bone).displaySkin(element.skin, true);
                    this._target.getBoneNode(element.bone).displaySkin(element.bone);
                }, this);
            } else if (selectedItem._configuration.colorSkins && selectedItem._configuration.colorSkins.skins && selectedItem._configuration.colorSkins.color) {
                if (this._target._skeletonConfig != null && this._target._skeletonConfig.colorSkins != null) {
                    var skinNames = this._target._skeletonConfig.colorSkins[selectedItem._configuration.colorSkins.skins];
                    if (skinNames != null) {
                        for (var boneName in skinNames) {
                            var bone = this._target.getBoneNode(boneName);
                            if (bone != null) {
                                bone.getSkins().forEach(function (skin) {
                                    if (skin.getName() == skinNames[boneName]) {
                                        skin.color = cc.color(selectedItem._configuration.colorSkins.color)
                                    }
                                }, this);;
                            }
                        }
                    }
                }
            }
        }
    },
    animationSelected: function (selectedItem) {
        this._target._currentAnimationName = selectedItem._configuration.name;
        var action = this._target.actionManager.getActionByTag(this._target.tag, this._target);
        action.play(this._target._currentAnimationName, false);
    }
});
