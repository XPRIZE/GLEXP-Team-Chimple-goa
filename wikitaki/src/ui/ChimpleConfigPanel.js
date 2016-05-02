chimple.ConfigPanel = cc.Node.extend({
    _topPanel: null,
    _bottomPanel: null,
    ctor: function (target, position, size, numButtonsPerRow, numButtonsPerColumn, configuration, callBackFunction, callBackContext, isTab) {
        this._super();
        this._target = target;
        this.setContentSize(size);
        if(callBackFunction === undefined) {
            this._callBackFunction = this.selectButton;
            this._callBackContext = this;
        } else {
            this._callBackFunction = callBackFunction;
            this._callBackContext = callBackContext;
        }
        this._topPanel = new chimple.TopConfigPanel(cc.p(position.x, position.y + size.height - 256), cc.size(size.width, 256));
        this.addChild(this._topPanel);
        if(isTab) {
            this._bottomPanel = new chimple.TabPanel(position, cc.size(size.width, size.height - 256), numButtonsPerRow, numButtonsPerColumn, configuration, this._callBackFunction, this._callBackContext);        
        } else {
            this._bottomPanel = new chimple.ButtonPanel(position, cc.size(size.width, size.height - 256), numButtonsPerRow, numButtonsPerColumn, configuration, this._callBackFunction, this._callBackContext);                    
        }
        this.addChild(this._bottomPanel);
    },
    selectButton: function(button) {
        if(button.getName() == res.translate_png) {
            this._target.parent._moveAction = true;
            this._target.parent._rotateAction = false;
            this._target.parent._scaleAction = false;
        } else if(button.getName() == res.rotate_png) {
            this._target.parent._moveAction = false;
            this._target.parent._rotateAction = true;
            this._target.parent._scaleAction = true;
        } else if(button.getName() == res.flipx_png) {
            this._target.setScaleX(-1 * this._target.getScaleX());
        } else if(button.getName() == res.my_avatar_png) {
            if(this._target.getUserData() != null && this._target.getUserData().skinChoices != null){
                this.parent.push(new chimple.ConfigPanel(this._target, cc.p(0, 0), cc.size(760, 1800), 2, 2, this._target.getUserData().skinChoices, this.skinSelected, this, true));
            }
        }
    },
    skinSelected: function (selectedItem) {
        if (this._target != null && selectedItem._configuration) {
            if (selectedItem._configuration.skins && selectedItem._configuration.skins.length > 0) {
                selectedItem._configuration.skins.forEach(function (element) {
                    this._target.getBoneNode(element.bone).displaySkin(element.skin, true);
                    this._target.getBoneNode(element.bone).displaySkin(element.bone);
                }, this);
            } else if(selectedItem._configuration.colorSkins && selectedItem._configuration.colorSkins.skins && selectedItem._configuration.colorSkins.color) {
                if(this._target.getUserData() != null && this._target.getUserData().colorSkins != null) {
                    var skinNames = this._target.getUserData().colorSkins[selectedItem._configuration.colorSkins.skins];
                    if(skinNames != null) {
                        for (var boneName in skinNames) {
                            var bone = this._target.getBoneNode(boneName);
                            if(bone != null) {
                                bone.getSkins().forEach(function(skin) {
                                    if(skin.getName() == skinNames[boneName]) {
                                        skin.color = cc.color(selectedItem._configuration.colorSkins.color)
                                    }
                                }, this);;
                            }
                        }
                    }
                }
            }
        }
    }    
});

chimple.TopConfigPanel = ccui.Layout.extend({
    ctor: function (position, size) {
        this._super();
        this.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.setBackGroundColor(cc.color.BLUE);
        this.setPosition(position);
        this.setContentSize(size);
        var backButton = new ccui.Button('res/icons/back.png', 'res/icons/back_onclick.png');
        backButton.addTouchEventListener(this.goBack, this);
        backButton.setPosition(size.width / 2, size.height / 2);
        this.addChild(backButton);        
    },
    goBack: function (target, event) {
        if(event == ccui.Widget.TOUCH_BEGAN) {
            this.parent.parent.pop();        
        }
    }
});
