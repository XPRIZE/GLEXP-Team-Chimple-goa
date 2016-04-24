chimple.ButtonPanel = ccui.ScrollView.extend({
    ctor:function(position, size, numButtonsPerRow, numButtonsPerColumn, configuration) {
        this._super();
        this._configuration = configuration;
        this.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.setBackGroundColor(cc.color.GREEN);        
        this.setContentSize(size);
        this.setPosition(position);
        this.setDirection(ccui.ScrollView.DIR_HORIZONTAL);
        this._currentSelectedItem = null;
        var index = 0;        
        for (pageIndex = 0; pageIndex < configuration.length / (numButtonsPerRow * numButtonsPerColumn); pageIndex++) {
            for (var rowIndex = 0; rowIndex < numButtonsPerRow; rowIndex++) {
                for (var colIndex = 0; colIndex < numButtonsPerColumn; colIndex++) {
                    var item = new ccui.Button(configuration[index]['icon'], configuration[index]['cIcon']);
                    item.addTouchEventListener(this.itemSelected, this);
                    item.setPosition(pageIndex * size.width + (rowIndex + 0.5) * size.width / numButtonsPerRow, (colIndex + 0.5) * size.height / numButtonsPerColumn);
                    item.setName(configuration[index]['icon']);
                    index++;
                    this.addChild(item);
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
    selectButton: function(button) {
        this._currentSelectedItem = button;
        button.setHighlighted(true);
    }
}); 