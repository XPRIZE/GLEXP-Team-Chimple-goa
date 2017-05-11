chimple.ButtonPanel = ccui.Layout.extend({
    ctor: function (position, size, numButtonsPerRow, numButtonsPerColumn, configuration, buttonHandler, start, numButtons) {
        this._super();
        this._configuration = configuration;
        this._buttonHandler = buttonHandler;
        // this.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        // this.setBackGroundColor(cc.color.GREEN);
        this.setPosition(position);
        start = start || 0;
        numButtons = numButtons || configuration.length;
        var index = start;
        for (var pageIndex = 0; pageIndex < (numButtons) / (numButtonsPerRow * numButtonsPerColumn); pageIndex++) {
            for (var rowIndex = 0; rowIndex < numButtonsPerColumn; rowIndex++) {
                for (var colIndex = 0; colIndex < numButtonsPerRow; colIndex++) {
                    if (index < configuration.length - pageIndex * (numButtonsPerRow * numButtonsPerColumn)) {
                        var item;
                        try {
                            cc.log('uibutton buttonpanel start')
                            cc.log(configuration[index]['icon']);
                            item = new ccui.Button(configuration[index]['icon'], configuration[index]['icon'], configuration[index]['icon'], ccui.Widget.PLIST_TEXTURE);
                        } catch (error) {
                            cc.log(error);
                            item = new ccui.Button('icons/my_pet.png', 'icons/my_pet_onclick.png', 'icons/my_pet_onclick.png', ccui.Widget.PLIST_TEXTURE);
                        }

                        if (configuration[index] && configuration[index]['uniqueCharacterID']) {

                            var cacheName = 'res/' + configuration[index]['uniqueCharacterID'] + '.png';
                            cc.log('uibutton button panel end');
                            item = new ccui.Button(cacheName, cacheName, cacheName, ccui.Widget.LOCAL_TEXTURE);
                            item.setFlippedY(true);
                        }

                        item.setEnabled(true);
                        chimple.ParseUtil.disableFavoriteChoiceIfCharacterAlreadyLoadedInPage(item, configuration[index]);

                        item.addTouchEventListener(this._buttonHandler.itemSelected, this._buttonHandler);
                        item.setPosition(pageIndex * size.width + (colIndex + 0.5) * size.width / numButtonsPerRow, size.height - (rowIndex + 0.5) * size.height / numButtonsPerColumn);
                        item._selectedIndex = index;
                        item.setName(configuration[index]['icon']);
                        item._configuration = configuration[index];
                        if (configuration[index].hasOwnProperty('json')) {
                            item._jsonFileToLoad = configuration[index]['json'];
                            item._configurationType = configuration[index].type;
                            item.dataType = "json";
                        } else if (configuration[index].hasOwnProperty('png')) {
                            item._pngFileToLoad = configuration[index]['png'];
                            item.dataType = "png";
                        }
                        index++;
                        this.addChild(item, 2);

                    }
                }
            }
        }
        this.setContentSize(cc.size(Math.ceil(configuration.length / (numButtonsPerRow * numButtonsPerColumn)) * size.width, size.height));
    },

    selectButton: function (sender) {
        this._buttonHandler.selectButton(sender);
    },

    getButtonByIndex: function (index) {
        return this.getChildren()[index];
    },


    getButtonByName: function (name) {
        return this.getChildByName(name);
    },

    enableButton: function (name, enable) {
        this.children.forEach(function (element) {
            if (element._configuration.name == name) {
                if (enable) {
                    element.setEnabled(true);
                    element.setHighlighted(false);
                } else {
                    element.setEnabled(false);
                    element.setHighlighted(true);
                }
            }
        });
    }
});

chimple.ButtonHandler = cc.Class.extend({
    ctor: function (callBackFunction, callBackContext, isMenu) {
        this._isMenu = isMenu;
        this._callBackFunction = callBackFunction;
        this._callBackContext = callBackContext;
    },
    itemSelected: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                if (this._isMenu) {
                    if (this._currentSelectedItem != null && this._currentSelectedItem != sender) {
                        this._currentSelectedItem.setHighlighted(false);
                        this._currentSelectedItem.setEnabled(true);
                    }
                }
                break;
            case ccui.Widget.TOUCH_ENDED:
                this.selectButton(sender);
                break;
        }
    },
    selectButton: function (sender) {
        if (this._isMenu) {
            this._currentSelectedItem = sender;
            sender.setHighlighted(true);
            sender.setEnabled(false);
        } else {
            if (sender._configuration.toggle) {
                if (sender._isToggled) {
                    // sender.setHighlighted(true);
                    sender._isToggled = false;

                    try {
                        sender.loadTextures(sender._configuration.icon, sender._configuration.cIcon, null, ccui.Widget.PLIST_TEXTURE);
                    } catch (error) {
                        cc.log(error);
                        sender.loadTextures('icons/my_pet.png', 'icons/my_pet_onclick.png', null, ccui.Widget.PLIST_TEXTURE);
                    }

                } else {
                    // sender.setHighlighted(false);
                    sender._isToggled = true;

                    try {
                        sender.loadTextures(sender._configuration.cIcon, sender._configuration.icon, null, ccui.Widget.PLIST_TEXTURE);
                    } catch (error) {
                        cc.log(error);
                        sender.loadTextures('icons/my_pet_onclick.png', 'icons/my_pet.png', null, ccui.Widget.PLIST_TEXTURE);
                    }
                }
            }
        }

        if (this._callBackFunction != null && this._callBackContext != null) {
            if (sender._configurationType == "scene") {
                this._callBackContext.disableOrEnableAllButtons(this._callBackContext._buttonPanel, true);
            }
            this._callBackFunction.call(this._callBackContext, sender);
        }
    }
})