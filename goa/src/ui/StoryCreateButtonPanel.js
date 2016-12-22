/// <reference path="../cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />

var xc = xc || {};
xc.storyLevel = ".level";
xc.storyTitleFontName = "Arial";
xc.storyTitleFontSize = 40;
xc.storyTitleFontColor = cc.color.WHITE;


xc.StoryCreateButtonPanel = ccui.Layout.extend({
    ctor: function (position, size, numButtonsPerRow, numButtonsPerColumn, configuration, buttonHandler, start, numButtons, loadLocalTexture, customButtonChildHandler) {
        this._super();
        this._configuration = configuration;
        this._buttonHandler = buttonHandler;
        this._loadLocalTexture = loadLocalTexture;
        this.setPosition(position);
        start = start || 0;
        numButtons = numButtons || configuration.length;
        var index = start;
        for (var pageIndex = 0; pageIndex < (numButtons) / (numButtonsPerRow * numButtonsPerColumn); pageIndex++) {
            for (var rowIndex = 0; rowIndex < numButtonsPerColumn; rowIndex++) {
                for (var colIndex = 0; colIndex < numButtonsPerRow; colIndex++) {
                    if (index < configuration.length - pageIndex * (numButtonsPerRow * numButtonsPerColumn)) {
                        var item;
                        var storyId = configuration[index]['storyId'];
                        var bookNode = ccs.load(xc.CreateStoryLayer.res.book_json, xc.path);
                        bookNode.node.setName("bookNode." + storyId);                                                
                        var book = bookNode.node.getChildByName("book");
                        var bookColor = xc.BOOK_COLORS[Math.floor(Math.random()*xc.BOOK_COLORS.length)];

                        book.setColor(bookColor);
                        var bookHeight = book.height;
                        if(configuration[index]. hasOwnProperty('icon') == true) {
                            try {
                                item = new ccui.Button('icons/my_pet.png', 'icons/my_pet_onclick.png', 'icons/my_pet_onclick.png', ccui.Widget.PLIST_TEXTURE);
                            } catch (error) {
                                cc.log(error);
                                item = new ccui.Button('icons/my_pet.png', 'icons/my_pet_onclick.png', 'icons/my_pet_onclick.png', ccui.Widget.PLIST_TEXTURE);
                            }
                        }

                        item.setScale(2.5);
                        item.locked = false;
                        item.setOpacity(0);//hide button
                        item.setEnabled(true);
                        item.addTouchEventListener(this._buttonHandler.itemSelected, this._buttonHandler);
                        item.setAnchorPoint(cc.p(0.5,0.5));
                        item.setPosition(pageIndex * size.width + (colIndex + 0.5) * size.width / numButtonsPerRow, size.height - (bookHeight * 1.2 +  (rowIndex) * 512));
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
                        var imageIconUrl = configuration[index]['icon'];
                        

                        index++;

                        //configure book
                        var bookImageNode = bookNode.node.getChildByName("Node");
                        bookImageNode.setPosition(cc.p(bookImageNode.getPosition().x, bookImageNode.getPosition().y + 20));
                        cc.log('imageIconUrl 1111:' + imageIconUrl);
                        var texture = cc.textureCache.addImage(imageIconUrl);
                        var sprite2 = new cc.Sprite(texture);
                        sprite2.setScale(0.11, 0.11);
                        //var sprite2 = new cc.Sprite('#' + imageIconUrl);
                        bookImageNode.addChild(sprite2);
                        var key = storyId + xc.storyLevel;
                        
                        var bookText = bookNode.node.getChildByName("TextField");
                        var storyTitle = "My Story!!!";
                        bookText.setLocalZOrder(1);
                        bookText.setString(storyTitle);                        
                        bookText.setFontName(xc.storyTitleFontName)
                        bookText.setTextColor(xc.storyTitleFontColor);
                        bookText.setFontSize(xc.storyTitleFontSize);
                        bookText.setPlaceHolder("");
                        bookText.setTouchEnabled(false);
                        bookNode.node.setPosition(item.getPosition());
                        bookNode.node.setAnchorPoint(cc.p(0.5,0.5));
                        this.addChild(bookNode.node,2);                        
                        this.addChild(item, 3);
 

                    }
                }
            }
        }
        if(configuration.length != 0) {
            this.setContentSize(cc.size(Math.ceil(configuration.length / (numButtonsPerRow * numButtonsPerColumn)) * size.width, size.height));
        }
        
    },

    selectButton: function (sender) {
        this._buttonHandler.selectButton(sender);
    },

    getButtonByIndex: function (index) {
        return this.getChildren()[index];
    },


    getButtonByName: function (name) {
        return this.getChildByName(name);
    },

    enableButton: function (name, enable) {
        this.children.forEach(function (element) {
            if (element._configuration.name == name) {
                if (enable) {
                    element.setEnabled(true);
                    element.setHighlighted(false);
                } else {
                    element.setEnabled(false);
                    element.setHighlighted(true);
                }
            }
        });
    }
});

xc.ButtonHandler = cc.Class.extend({
    ctor: function (callBackFunction, callBackContext, isMenu) {
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
                        this._currentSelectedItem.setEnabled(true);
                    }
                }
                break;
            case ccui.Widget.TOUCH_ENDED:
                this.selectButton(sender);
                break;
        }
    },
    selectButton: function (sender) {
        if (this._isMenu) {
            this._currentSelectedItem = sender;
            sender.setHighlighted(true);
            sender.setEnabled(false);
        } else {
            if (sender._configuration.toggle) {
                if (sender._isToggled) {
                    // sender.setHighlighted(true);
                    sender._isToggled = false;

                    try {
                        sender.loadTextures(sender._configuration.icon, sender._configuration.cIcon, null, ccui.Widget.PLIST_TEXTURE);
                    } catch (error) {
                        cc.log(error);
                        sender.loadTextures('icons/my_pet.png', 'icons/my_pet_onclick.png', null, ccui.Widget.PLIST_TEXTURE);
                    }

                } else {
                    // sender.setHighlighted(false);
                    sender._isToggled = true;

                    try {
                        sender.loadTextures(sender._configuration.cIcon, sender._configuration.icon, null, ccui.Widget.PLIST_TEXTURE);
                    } catch (error) {
                        cc.log(error);
                        sender.loadTextures('icons/my_pet_onclick.png', 'icons/my_pet.png', null, ccui.Widget.PLIST_TEXTURE);
                    }
                }
            }
        }

        if(sender.locked) {
            if(sender._configuration && sender._configuration['storyId']) {
                var bookNode = sender.getParent().getChildByName("bookNode." + sender._configuration['storyId']);
                if(bookNode) {
                    var x = sender.getPosition().x;
                    var y = sender.getPosition().y;
                    var moveLeft = new cc.moveTo(0.1, cc.p(sender.getPosition().x - 20, sender.getPosition().y));
                    var moveRight = new cc.moveTo(0.1, cc.p(sender.getPosition().x + 40, sender.getPosition().y));
                    var moveOriginal = new cc.moveTo(0.1, cc.p(x, y));
                    var repeatAction = new cc.Repeat(new cc.Sequence(moveLeft, moveRight), 2);
                    var sequenceAction = new cc.Sequence(repeatAction, moveOriginal);
                    bookNode.runAction(sequenceAction);                              
                }
            }
        } else {
            if (this._callBackFunction != null && this._callBackContext != null) {
                if (sender._configurationType == "scene") {
                    this._callBackContext.disableOrEnableAllButtons(this._callBackContext._buttonPanel, true);
                }
                this._callBackFunction.call(this._callBackContext, sender);
            }
        }
    }
})