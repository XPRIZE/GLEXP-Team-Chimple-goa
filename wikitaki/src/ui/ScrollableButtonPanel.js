chimple.ScrollableButtonPanel = ccui.ScrollView.extend({
    _buttonPanel: null,
    ctor: function (position, size, numButtonsPerRow, numButtonsPerColumn, configuration, callBackFunction, callBackContext) {
        this._super();
        this.setPosition(position);   
        this.setContentSize(size);
        this._buttonPanel = new chimple.ButtonPanel(cc.p(0, 0), size, numButtonsPerRow, numButtonsPerColumn, configuration, callBackFunction, callBackContext);
        this.addChild(this._buttonPanel);
        this.setInnerContainerSize(cc.size(Math.ceil(configuration.length / (numButtonsPerRow * numButtonsPerColumn)) * size.width, size.height));
        this.setDirection(ccui.ScrollView.DIR_HORIZONTAL); 
        this.setClippingEnabled(true);       
    },
    itemSelected: function (sender, type) {
        this._buttonPanel.itemSelected(sender, type);
    },
    selectButton: function (button) {
        this._buttonPanel.selectButton(button);
    },
    getButtonByName: function (name) {
        return this._buttonPanel.getButtonByName(name);
    },
    
    scrollableButtonPanel_moveLeft : function()
    {
        this.scrollToLeft(5, true);
    },
    
    scrollableButtonPanel_moveRight : function()
    {
        this.scrollToRight(5, true);
    }
    
}); 