chimple.TabBar = ccui.ScrollView.extend({
    ctor:function(position, size, numButtonsPerScreen, menuDef) {
        this._super();
        this.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.setBackGroundColor(cc.color.GREEN);        
        this.setContentSize(size);
        this.setPosition(position);
        this.setDirection(ccui.ScrollView.DIR_HORIZONTAL);
        this._currentSelectedItem = null;   
        var index = 0;     
        for (var key in menuDef) {
            var item = new ccui.Button(key, menuDef[key]);
            item.addTouchEventListener(this.itemSelected, this);
            item._name = key;
            item.setPosition((index + 0.5 ) * size.width / numButtonsPerScreen, size.height / 2);
            index++;
            this.addChild(item);
        }
        this.setInnerContainerSize(cc.size(index / numButtonsPerScreen * size.width, size.height));
    },
    itemSelected: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                if (this._currentSelectedItem != null && this._currentSelectedItem != sender) {
                    this._currentSelectedItem.setHighlighted(false);
                }
                break;
            case ccui.Widget.TOUCH_ENDED:
                this._currentSelectedItem = sender;
                sender.setHighlighted(true);
                break;
        }
    }
}); 