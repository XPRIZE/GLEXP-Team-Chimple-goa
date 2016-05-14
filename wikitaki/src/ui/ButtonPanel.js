chimple.ButtonPanel = ccui.Layout.extend({
    ctor: function (position, size, numButtonsPerRow, numButtonsPerColumn, configuration, buttonHandler, start, numButtons) {
        this._super();
        this._configuration = configuration;
        this._buttonHandler = buttonHandler;
        this.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.setBackGroundColor(cc.color.GREEN);
        this.setPosition(position);
        start = start || 0;
        numButtons = numButtons || configuration.length;
        var index = start;
        for (var pageIndex = 0; pageIndex < (numButtons - start) / (numButtonsPerRow * numButtonsPerColumn); pageIndex++) {
            for (var rowIndex = 0; rowIndex < numButtonsPerColumn; rowIndex++) {
                for (var colIndex = 0; colIndex < numButtonsPerRow; colIndex++) {
                    if (index < configuration.length - pageIndex * (numButtonsPerRow * numButtonsPerColumn)) {
                        cc.log('configuration[index]:' + configuration[index]);
                        var item;
                        try {
                            item = new ccui.Button(configuration[index]['icon'], configuration[index]['cIcon'], null, ccui.Widget.PLIST_TEXTURE);
                        } catch (error) {
                            cc.log(error);
                            item = new ccui.Button(configuration[index]['icon'], configuration[index]['cIcon'], null, ccui.Widget.LOCAL_TEXTURE);
                        }
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

    getButtonByName: function (name) {
        return this.getChildByName(name);
    }
}); 

chimple.ButtonHandler = cc.Class.extend({
    ctor: function(callBackFunction, callBackContext, isMenu) {
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
                    }
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
                   this._callBackContext._buttonPanel.children.forEach(function (element) {
                       if(element._configuration.name == "play"){
                            element.setEnabled(true);
                            element.setHighlighted(false);
                       }
                    }, this);
               
                    try {
                        sender.loadTextures(sender._configuration.icon, sender._configuration.cIcon, null, ccui.Widget.PLIST_TEXTURE);
                    } catch (error) {
                        cc.log(error);
                        sender.loadTextures(sender._configuration.icon, sender._configuration.cIcon, null, ccui.Widget.LOCAL_TEXTURE);
                    }

                } else {
                    // sender.setHighlighted(false);
                   sender._isToggled = true;
                   this._callBackContext._buttonPanel.children.forEach(function (element) {       
                       if(element._configuration.name == "play"){
                            element.setEnabled(false);
                            element.setHighlighted(true);
                       }
                    }, this);
                    
                    try {
                        sender.loadTextures(sender._configuration.cIcon, sender._configuration.icon, null, ccui.Widget.PLIST_TEXTURE);
                    } catch (error) {
                        cc.log(error);
                        sender.loadTextures(sender._configuration.cIcon, sender._configuration.icon, null, ccui.Widget.LOCAL_TEXTURE);
                    }
                }
            }
        }

        if (this._callBackFunction != null && this._callBackContext != null) {
            if(sender._configurationType == "scene"){
                chimple.PageConfigPanel.disableOrEnableAllButtons(this._callBackContext._buttonPanel,true);
            }
            this._callBackFunction.call(this._callBackContext, sender);
        }
    }
})