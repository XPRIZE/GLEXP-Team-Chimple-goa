chimple.ScrollableButtonPanel = cc.LayerColor.extend({
    _buttonPanel: null,
    _page: null,
    ctor: function (position, size, numButtonsPerRow, numButtonsPerColumn, configuration, callBackFunction, callBackContext) {
        this._super(chimple.SECONDARY_COLOR, size.width, size.height);
        this.setPosition(position);
        this.setContentSize(size);
        this._buttonHandler = new chimple.ButtonHandler(callBackFunction, callBackContext);

        this._page = new ccui.PageView();
        this._page.setPosition(size.width * 5/100, 0);
        this._page.setContentSize(size.width * 90/100, size.height);
        for (var pageIndex = 0; pageIndex < configuration.length / (numButtonsPerRow * numButtonsPerColumn); pageIndex++) {
            this._page.addPage(new chimple.ButtonPanel(cc.p(0, 0), cc.size(size.width * 90/100, size.height), numButtonsPerRow, numButtonsPerColumn, configuration, this._buttonHandler, pageIndex * (numButtonsPerRow * numButtonsPerColumn), (numButtonsPerRow * numButtonsPerColumn)))
        }
        this._page.setClippingEnabled(true);
        this.addChild(this._page);

        this._page.addEventListener(this.updateLeftRightButtons, this)
        
        this._backButton = new ccui.Button("icons/left.png", "icons/left_onclick.png", null, ccui.Widget.PLIST_TEXTURE);
        this._backButton.setPosition(size.width * 5 / 100, size.height / 2);
        this._backButton.addTouchEventListener(this.moveLeft, this);
        this.addChild(this._backButton);

        this._nextButton = new ccui.Button("icons/right.png", "icons/right_onclick.png", null, ccui.Widget.PLIST_TEXTURE);
        this._nextButton.setPosition(size.width * 95 / 100, size.height / 2);
        this._nextButton.addTouchEventListener(this.moveRight, this);
        this.addChild(this._nextButton);

        this.updateLeftRightButtons();

    },
    itemSelected: function (sender, type) {
        this._buttonHandler.itemSelected(sender, type);
    },
    selectButton: function (button) {
        this._buttonHandler.selectButton(button);
    },
    getButtonByName: function (name) {
        var pages = this._page.getPages();
        for (var index = 0; index < pages.length; index++) {
            var page = pages[index];
            var button = page.getButtonByName(name);
            if (button) {
                return button;
            }
        }
    },

    moveLeft: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                if (this._page.getCurPageIndex() > 0) {
                    this._page.scrollToPage(this._page.getCurPageIndex() - 1);
                }
                break;
        }
    },

    moveRight: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                if (this._page.getCurPageIndex() < this._page.getPages().length - 1) {
                    this._page.scrollToPage(this._page.getCurPageIndex() + 1);
                }
                break;
        }
    },

    updateLeftRightButtons: function(sender, type) {
        if(this._page.getCurPageIndex() <= 0) {
            this._backButton.setEnabled(false);
            this._backButton.setHighlighted(true);
        } else {
            this._backButton.setEnabled(true);
            this._backButton.setHighlighted(false);
        }
        if(this._page.getCurPageIndex() >= this._page.getPages().length - 1) {
            this._nextButton.setEnabled(false);
            this._nextButton.setHighlighted(true);
        } else {
            this._nextButton.setEnabled(true);
            this._nextButton.setHighlighted(false);            
        }
    }

}); 