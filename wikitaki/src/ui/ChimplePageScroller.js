var chimple = chimple || {};
chimple.PAGE_VIEW_DEFAULT_BACKGROUND_COLOR = cc.color.GRAY;
chimple.PAGE_VIEW_OPENING_ANITMATION_TIME = 2.0;
chimple.INITIAL_MARGIN = 0.3;

chimple.PageScroller = ccui.PageView.extend({
    ctor: function (position, size, numButtonsPerRow, numButtonsPerColumn, configuration, backgroundColor, callBackFunction, callBackContext, isAnimated) {
        this._super();
        this._configuration = configuration;
        this._numButtonsPerRow = numButtonsPerRow;
        this._numButtonsPerColumn = numButtonsPerColumn;
        this._isAnimated = isAnimated;
        this._itemsPerPage = numButtonsPerRow * numButtonsPerColumn;
        this._animationTimeToDisplay = chimple.PAGE_VIEW_OPENING_ANITMATION_TIME;
        this.setPosition(position);
        this._currentSelectedItem = null;
        this._contentSize = size;
        this.setContentSize(this._contentSize);
        var backgroundColor = backgroundColor || chimple.PAGE_VIEW_DEFAULT_BACKGROUND_COLOR;
        this.setBackGroundColor(backgroundColor);
        this.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this._callBackFunction = callBackFunction;
        this._callBackContext = callBackContext;
    },

    onEnter: function () {
        this._super();
        this.createPages();
        if (this._isAnimated) {
            //run animation to show page view
            //var animatePageViewOpeningAction = new cc.MoveTo(this._animationTimeToDisplay, cc.p(0,0));
            //this.runAction(animatePageViewOpeningAction);
        }
    },
    createPages: function () {
        //number of pages
        var numberOfPages = Math.ceil(this._configuration.length / this._itemsPerPage);
        var index = 0;
        for (var pageIndex = 0; pageIndex < numberOfPages; pageIndex++) {
            var page = new ccui.Layout();
            page.setContentSize(this._contentSize);
            for (var rowIndex = 0; rowIndex < this._numButtonsPerRow; rowIndex++) {
                for (var colIndex = 0; colIndex < this._numButtonsPerColumn; colIndex++) {
                    if (index < this._configuration.length) {
                        var position = cc.p((rowIndex + chimple.INITIAL_MARGIN) * this._contentSize.width / this._numButtonsPerRow, (colIndex + 0.5) * this.getContentSize().height / this._numButtonsPerColumn);
                        page.addChild(this.createItem(position, this._configuration[index]));
                    }
                    index++;
                }
            }
            this.insertPage(page, pageIndex);
        }
    },

    createItem: function (position, item) {
        var configObject = chimple.storyConfigurationObject[item];
        if (configObject != null) {
            var button = ccui.Button.create(configObject.icon, configObject.cIcon);
            button.setAnchorPoint(0, 0);
            button.setPosition(position);
            button._name = item;
            button.addTouchEventListener(this.itemSelected, this);
            return button;

        }
    },

    itemSelected: function (sender, type) {

        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                if (this._currentSelectedItem != null) {
                    this._currentSelectedItem.setHighlighted(false);
                }
                break;
            case ccui.Widget.TOUCH_ENDED:
                this._currentSelectedItem = sender;
                sender.setHighlighted(true);
                this._callBackFunction.call(this._callBackContext, this._currentSelectedItem);
                break;
        }
    }
});