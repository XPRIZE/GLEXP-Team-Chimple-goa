chimple.ButtonPanel = ccui.ScrollView.extend({
    ctor: function (position, size, numButtonsPerRow, numButtonsPerColumn, configuration, callBackFunction, callBackContext) {
        this._super();
        this._configuration = configuration;
        this.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.setBackGroundColor(cc.color.GREEN);
        this.setContentSize(size);
        this.setPosition(position);
        this.setDirection(ccui.ScrollView.DIR_HORIZONTAL);
        this._currentSelectedItem = null;
        this._callBackFunction = callBackFunction;
        this._callBackContext = callBackContext;
        var index = 0;
        for (pageIndex = 0; pageIndex < configuration.length / (numButtonsPerRow * numButtonsPerColumn); pageIndex++) {
            for (var rowIndex = 0; rowIndex < numButtonsPerRow; rowIndex++) {
                for (var colIndex = 0; colIndex < numButtonsPerColumn; colIndex++) {
                    if (index < configuration.length) {
                        cc.log('configuration[index]:' + configuration[index]);
                        var item = new ccui.Button(configuration[index]['icon'], configuration[index]['cIcon']);
                        item.addTouchEventListener(this.itemSelected, this);
                        item.setPosition(pageIndex * size.width + (rowIndex + 0.5) * size.width / numButtonsPerRow, (colIndex + 0.5) * size.height / numButtonsPerColumn);
                        item.setName(configuration[index]['icon']);
                        
                        if (configuration[index].hasOwnProperty('json')) {
                            item._jsonFileToLoad = configuration[index]['json'];
                            item._configurationType = configuration[index].type;    
                            item.dataType = "json";                            
                        } else if (configuration[index].hasOwnProperty('png')) {
                            item._pngFileToLoad = configuration[index]['png'];                            
                            item.dataType = "png";
                        }
                        index++;
                        this.addChild(item);

                    }
                }
            }
        }
        this.setInnerContainerSize(cc.size(Math.ceil(index / (numButtonsPerRow * numButtonsPerColumn)) * size.width, size.height));
    },
    
    
    itemSelected: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                if (this._currentSelectedItem != null && this._currentSelectedItem != sender) {
                    this._currentSelectedItem.setHighlighted(false);
                }
                break;
            case ccui.Widget.TOUCH_ENDED:
                this.selectButton(sender);
                break;
        }
    },
    selectButton: function (button) {
        this._currentSelectedItem = button;
        button.setHighlighted(true);
        if (this._callBackFunction != null && this._callBackContext != null) {
            this._callBackFunction.call(this._callBackContext, this._currentSelectedItem);
        }

    }
}); 