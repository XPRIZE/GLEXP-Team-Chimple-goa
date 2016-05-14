chimple.ScrollableButtonPanel = ccui.PageView.extend({
    _buttonPanel: null,
    ctor: function (position, size, numButtonsPerRow, numButtonsPerColumn, configuration, callBackFunction, callBackContext) {
        this._super();
        this.setPosition(position);   
        this.setContentSize(size);
        this._buttonHandler = new chimple.ButtonHandler(callBackFunction, callBackContext);
        for (var pageIndex = 0; pageIndex < configuration.length / (numButtonsPerRow * numButtonsPerColumn); pageIndex++) {
            this.addPage(new chimple.ButtonPanel(cc.p(0, 0), size, numButtonsPerRow, numButtonsPerColumn, configuration, this._buttonHandler, pageIndex * (numButtonsPerRow * numButtonsPerColumn), (numButtonsPerRow * numButtonsPerColumn)))
        }
        this.setClippingEnabled(true);       
    },
    itemSelected: function (sender, type) {
        this._buttonHandler.itemSelected(sender, type);
    },
    selectButton: function (button) {
        this._buttonHandler.selectButton(button);
    },
    getButtonByName: function (name) {
        var pages = this.getPages();
        for (var index = 0; index < pages.length; index++) {
            var page = pages[index];
            var button = page.getButtonByName(name);
            if(button) {
                return button;
            }
        }
    },
    
    scrollableButtonPanel_moveLeft : function()
    {
        if(this.getCurPageIndex() > 0) {
            this.scrollToPage(this.getCurPageIndex() - 1);        
        }
    },
    
    scrollableButtonPanel_moveRight : function()
    {
        if(this.getCurPageIndex() < this.getPages().length - 1) {
            this.scrollToPage(this.getCurPageIndex() + 1);
        }        
    }
    
}); 