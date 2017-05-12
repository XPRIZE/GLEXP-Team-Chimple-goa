chimple.ScrollableButtonPanel = cc.LayerColor.extend({
    _buttonPanel: null,
    _page: null,
    _numButtonsPerRow: null,
    _numButtonsPerColumn: null,
    ctor: function (position, size, numButtonsPerRow, numButtonsPerColumn, configuration, callBackFunction, callBackContext, noPagination) {
        this._super(chimple.SECONDARY_COLOR, size.width, size.height);
        this.setPosition(position);
        this.setContentSize(size);
        this._buttonHandler = new chimple.ButtonHandler(callBackFunction, callBackContext);
        this._numButtonsPerRow = numButtonsPerRow;
        this._numButtonsPerColumn = numButtonsPerColumn;

        this._page = new ccui.PageView();
        this._page.setPosition(size.width * 5 / 100, 0);
        this._page.setContentSize(size.width * 90 / 100, size.height);
        for (var pageIndex = 0; pageIndex < configuration.length / (numButtonsPerRow * numButtonsPerColumn); pageIndex++) {
            this._page.addPage(new chimple.ButtonPanel(cc.p(0, 0), cc.size(size.width * 90 / 100, size.height), numButtonsPerRow, numButtonsPerColumn, configuration, this._buttonHandler, pageIndex * (numButtonsPerRow * numButtonsPerColumn), (numButtonsPerRow * numButtonsPerColumn)))
        }
        this._page.setClippingEnabled(true);
        this.addChild(this._page);

        if (!noPagination) {
            this._page.addEventListener(this.updateLeftRightButtons, this)
            cc.log('button start');
            this._backButton = new ccui.Button("icons/left.png", "icons/left_onclick.png", "icons/left_onclick.png", ccui.Widget.PLIST_TEXTURE);
            this._backButton.setPosition(size.width * 5 / 100, size.height / 2);
            this._backButton.addTouchEventListener(this.moveLeft, this);
            this.addChild(this._backButton);
            cc.log('button added');
            this._nextButton = new ccui.Button("icons/right.png", "icons/right_onclick.png", "icons/right_onclick.png", ccui.Widget.PLIST_TEXTURE);
            this._nextButton.setPosition(size.width * 95 / 100, size.height / 2);
            this._nextButton.addTouchEventListener(this.moveRight, this);
            this.addChild(this._nextButton);

            this.updateLeftRightButtons();
        }
    },
    itemSelected: function (sender, type) {
        this._buttonHandler.itemSelected(sender, type);
    },
    selectButton: function (button) {
        this._buttonHandler.selectButton(button);
    },
    getButtonByName: function (name) {
        var pages = null;
        if (cc.sys.isNative) {
            pages = this._page.getItems();
        } else {
            pages = this._page.getPages();
        }
        for (var index = 0; index < pages.length; index++) {
            var page = pages[index];
            var button = page.getButtonByName(name);
            if (button) {
                return button;
            }
        }
    },

    getButtonByIndex: function (buttonIndex) {
        var pages = null;
        if (cc.sys.isNative) {
            pages = this._page.getItems();
        } else {
            pages = this._page.getPages();
        }

        var pageIndex = Math.floor(buttonIndex / (this._numButtonsPerRow * this._numButtonsPerColumn));
        var page = pages[pageIndex];
        var buttonInPage = buttonIndex - pageIndex * (this._numButtonsPerRow * this._numButtonsPerColumn);
        var button = page.getButtonByIndex(buttonInPage);
        if (button) {
            return button;
        }
    },


    moveLeft: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                if (cc.sys.isNative) {
                    if (this._page.getCurrentPageIndex() > 0) {
                        this._page.scrollToPage(this._page.getCurrentPageIndex() - 1);
                    }
                    break;
                } else {
                    if (this._page.getCurPageIndex() > 0) {
                        this._page.scrollToPage(this._page.getCurPageIndex() - 1);
                    }
                    break;
                }
        }
    },

    moveRight: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                if (cc.sys.isNative) {
                    if (this._page.getCurrentPageIndex() < this._page.getItems().length - 1) {
                        this._page.scrollToPage(this._page.getCurrentPageIndex() + 1);
                    }
                    break;

                } else {
                    if (this._page.getCurPageIndex() < this._page.getPages().length - 1) {
                        this._page.scrollToPage(this._page.getCurPageIndex() + 1);
                    }
                    break;
                }
        }
    },

    moveRightAutomatically: function (buttonIndex) {
        var pageIndex = Math.floor(buttonIndex / (this._numButtonsPerRow * this._numButtonsPerColumn));
        if (cc.sys.isNative) {
            if (pageIndex < this._page.getItems().length) {
                this._page.scrollToPage(pageIndex);
            }
        } else {
            if (pageIndex < this._page.getPages().length) {
                this._page.scrollToPage(pageIndex);
            }
        }
    },

    updateLeftRightButtons: function (sender, type) {
        cc.log(this._page);
        if (cc.sys.isNative) {
            if (this._page.getCurrentPageIndex() <= 0) {
                this._backButton.setEnabled(false);
                this._backButton.setHighlighted(true);
            } else {
                this._backButton.setEnabled(true);
                this._backButton.setHighlighted(false);
            }
            if (this._page.getCurrentPageIndex() >= this._page.getItems().length - 1) {
                this._nextButton.setEnabled(false);
                this._nextButton.setHighlighted(true);
            } else {
                this._nextButton.setEnabled(true);
                this._nextButton.setHighlighted(false);
            }
        } else {
            if (this._page.getCurPageIndex() <= 0) {
                this._backButton.setEnabled(false);
                this._backButton.setHighlighted(true);
            } else {
                this._backButton.setEnabled(true);
                this._backButton.setHighlighted(false);
            }
            if (this._page.getCurPageIndex() >= this._page.getPages().length - 1) {
                this._nextButton.setEnabled(false);
                this._nextButton.setHighlighted(true);
            } else {
                this._nextButton.setEnabled(true);
                this._nextButton.setHighlighted(false);
            }
        }
    }
}); 