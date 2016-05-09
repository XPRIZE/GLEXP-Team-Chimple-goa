chimple.ButtonPanel = ccui.Layout.extend({
    ctor: function (position, size, numButtonsPerRow, numButtonsPerColumn, configuration, callBackFunction, callBackContext, isMenu) {
        this._super();
        this._configuration = configuration;
        this._isMenu = isMenu;
        this.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.setBackGroundColor(cc.color.GREEN);
        this.setPosition(position);
        this._currentSelectedItem = null;
        this._callBackFunction = callBackFunction;
        this._callBackContext = callBackContext;
        var index = 0;
        for (pageIndex = 0; pageIndex < configuration.length / (numButtonsPerRow * numButtonsPerColumn); pageIndex++) {
            for (var rowIndex = 0; rowIndex < numButtonsPerColumn; rowIndex++) {
                for (var colIndex = 0; colIndex < numButtonsPerRow; colIndex++) {
                    if (index < configuration.length) {
                        cc.log('configuration[index]:' + configuration[index]);
                        var item = new ccui.Button(configuration[index]['icon'], configuration[index]['cIcon']);
                        item.addTouchEventListener(this.itemSelected, this);
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


    itemSelected: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                if (this._isMenu) {
                    if (this._currentSelectedItem != null && this._currentSelectedItem != sender) {
                        this._currentSelectedItem.setHighlighted(false);
                    }
                } else {
                    // if (sender._configuration.toggle) {
                    //     if (sender._isToggled) {
                    //         sender._isToggled = false;
                    //         sender.setHighlighted(false);
                    //     } else {
                    //         sender._isToggled = true;
                    //         sender.setHighlighted(true);
                    //     }
                    // }
                }
                break;
            case ccui.Widget.TOUCH_ENDED:
                this.selectButton(sender);
                break;
        }
    },
    selectButton: function (sender) {
        // cc.log(sender);
        if (this._isMenu) {
            this._currentSelectedItem = sender;
            sender.setHighlighted(true);
        } else {
            if (sender._configuration.toggle) {
                if (sender._isToggled) {
                    // sender.setHighlighted(true);
                    sender._isToggled = false;
                    sender.loadTextures(sender._configuration.icon, sender._configuration.cIcon)
                } else {
                    // sender.setHighlighted(false);
                    sender._isToggled = true;
                    sender.loadTextures(sender._configuration.cIcon, sender._configuration.icon)
                }
            }
        }

        if (this._callBackFunction != null && this._callBackContext != null) {
            this._callBackFunction.call(this._callBackContext, sender);
        }

    },
    getButtonByName: function (name) {
        return this.getChildByName(name);
    }
}); 