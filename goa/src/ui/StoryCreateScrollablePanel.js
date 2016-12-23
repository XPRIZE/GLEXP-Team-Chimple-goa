var xc = xc || {};
xc.pages_width = 10;
xc.StoryCreateScrollableButtonPanel = cc.LayerColor.extend({
    _buttonPanel: null,
    _page: null,
    _numButtonsPerRow: null,
    _numButtonsPerColumn: null,
    ctor: function (position, size, numButtonsPerRow, numButtonsPerColumn, configuration, callBackFunction, callBackContext, noPagination, loadLocalTexture) {
        this._super(xc.PRIMARY_COLOR, size.width, size.height);
        this.setPosition(position);
        this.setContentSize(size);
        this._buttonHandler = new xc.ButtonHandler(callBackFunction, callBackContext);
        this._numButtonsPerRow = numButtonsPerRow;
        this._numButtonsPerColumn = numButtonsPerColumn;

        this._page = new ccui.PageView();

        if(cc.sys.isNative) {
            this.sprite = cc.Sprite.create(xc.path + "template/wood_01.png", xc.path);
            this.sprite.setAnchorPoint(0.5, 0.5);
            this.sprite.setPosition(cc.director.getWinSize().width / 2, cc.director.getWinSize().height / 2);
            this._page.addChild(this.sprite, 0);
            this.sprite.getTexture().setTexParameters({minFilter: gl.LINEAR, magFilter: gl.LINEAR, wrapS: gl.REPEAT, wrapT: gl.REPEAT});
            this.sprite.setTextureRect(cc.rect(0,0, cc.director.getWinSize().width * xc.pages_width,cc.director.getWinSize().height));


            this.sprite_shelf = cc.Sprite.create(xc.path + "template/shelf.png", xc.path);
            this.sprite_shelf.setAnchorPoint(0,0);
            this.sprite_shelf.setPosition(0, 0);
            this._page.addChild(this.sprite_shelf, 0);
            this.sprite_shelf.getTexture().setTexParameters({minFilter: gl.LINEAR, magFilter: gl.LINEAR, wrapS: gl.REPEAT, wrapT: gl.REPEAT});
            this.sprite_shelf.setTextureRect(cc.rect(0,0, cc.director.getWinSize().width * xc.pages_width,cc.director.getWinSize().height * 0.85));            
        }

        
        this._page.scrollableButtonPanel = this;
        this._page.setPosition(0, 0);
        this._page.setContentSize(size.width , size.height);
        for (var pageIndex = 0; pageIndex < configuration.length / (numButtonsPerRow * numButtonsPerColumn); pageIndex++) {
            this._page.addPage(new xc.StoryCreateButtonPanel(cc.p(0, 0), cc.size(size.width , size.height), numButtonsPerRow, numButtonsPerColumn, configuration, this._buttonHandler, pageIndex * (numButtonsPerRow * numButtonsPerColumn), (numButtonsPerRow * numButtonsPerColumn), loadLocalTexture));            
        }
        this._page.setClippingEnabled(true);
        this.addChild(this._page);

        if (!noPagination) {
            this._page.addEventListener(this.updateLeftRightButtons, this)
            this._backButton = new ccui.Button("icons/left.png", "icons/left_onclick.png", "icons/left_onclick.png", ccui.Widget.PLIST_TEXTURE);
            this._backButton.setPosition(size.width * 5 / 100, size.height / 2);
            this._backButton.addTouchEventListener(this.moveLeft, this);
            this.addChild(this._backButton);
            
            this._nextButton = new ccui.Button("icons/right.png", "icons/right_onclick.png", "icons/right_onclick.png", ccui.Widget.PLIST_TEXTURE);
            this._nextButton.setPosition(size.width * 95 / 100, size.height / 2);
            this._nextButton.addTouchEventListener(this.moveRight, this);
            this.addChild(this._nextButton);

            this.updateLeftRightButtons();
        }
       
        // this.bindTouchListenerToLayer(this._page);
    },


    // bindTouchListenerToLayer: function(target) {
    //     var context = this;
    //     var listener = cc.EventListener.create({
    //         event: cc.EventListener.TOUCH_ONE_BY_ONE,
    //         swallowTouches: false,
    //         onTouchBegan: function (touch, event) {
    //             cc.log('24u12323u414132412');
    //             return true;
    //         },
    //         onTouchEnded: function (touch, event) {
    //         }            
    //     });
    //     cc.eventManager.addListener(listener, target);
    // },

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
            pages = this._page.getItems();
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
            pages = this._page.getItems();
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
                cc.log('left touch began');
                if (cc.sys.isNative) {
                    if (this._page.getCurrentPageIndex() > 0) {
                        this._page.scrollToPage(this._page.getCurrentPageIndex() - 1);
                    }
                    break;
                } else {
                    if (this._page.getCurrentPageIndex() > 0) {
                        this._page.scrollToPage(this._page.getCurrentPageIndex() - 1);
                    }
                    break;
                }
        }
    },

    moveRight: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                cc.log('right touch began');
                if (cc.sys.isNative) {
                    if (this._page.getCurrentPageIndex() < this._page.getItems().length - 1) {
                        this._page.scrollToPage(this._page.getCurrentPageIndex() + 1);
                    }
                    break;

                } else {
                    if (this._page.getCurrentPageIndex() < this._page.getItems().length - 1) {
                        this._page.scrollToPage(this._page.getCurrentPageIndex() + 1);
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
            if (pageIndex < this._page.getItems().length) {
                this._page.scrollToPage(pageIndex);
            }
        }
    },

    updateLeftRightButtons: function (sender, type) {
        cc.log('11111111');
        if(sender) {
            this._page = sender.scrollableButtonPanel._page;
            this._backButton = sender.scrollableButtonPanel._backButton;
            this._nextButton = sender.scrollableButtonPanel._nextButton;
        }
                
        if(!this._page) {
            return;
        }

        
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
        }
    }
}); 