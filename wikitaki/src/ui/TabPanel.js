chimple.TabPanel = cc.LayerColor.extend({
    ctor: function (position, size, numButtonsPerRow, numButtonsPerColumn, configuration, callBackFunction, callBackContext, callerPanel) {
        this._super(chimple.SECONDARY_COLOR, size.width, size.height);
        this._panelPosition = position;
        this._panelSize = size;
        this._numButtonsPerRow = numButtonsPerRow;
        this._numButtonsPerColumn = numButtonsPerColumn;
        this._configuration = configuration;
        this._tabWidth = size.width;
        this._tabHeight = 64;
        this._callBackFunction = callBackFunction;
        this._callBackContext = callBackContext;
        this._callerPanel = callerPanel;
        this.setPosition(position);


        // this._tabPanel = new chimple.TabBarPanel(this._tabWidth, this._tabHeight, cc.p(position.x, position.y));
        // this.addChild(this._tabPanel);

        this._tab = new chimple.TabBar(cc.p(0, 0), cc.size(this._tabWidth, this._tabHeight), numButtonsPerRow, configuration, this.selectPanelForTab, this);
        this.addChild(this._tab);


        this._tab.selectButton(this._tab.getButtonByName(configuration[0]['icon']));
        this.bindTouchListener(this);
    },

    bindTouchListener: function (target) {
        var context = this;
        this._listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                return true;
            }
        });
        cc.eventManager.addListener(this._listener, target);
    },


    main_backButton_function: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                if (this._callerPanel != undefined) {
                    this._callerPanel.goBack();
                }
                this.parent.removeChild(this, true);

                break;
        }
    },

    selectPanelForTabName: function (name) {
        if (this._panel) {
            this.removeChild(this._panel);
        }
        this._configuration.forEach(function (element) {
            if (element['icon'] == name) {
                this._panel = new chimple.ScrollableButtonPanel(cc.p(0, this._tabHeight), cc.size(this._tabWidth, this._panelSize.height - this._tabHeight), this._numButtonsPerRow, this._numButtonsPerColumn, element['items'], this._callBackFunction, this._callBackContext);
                this.addChild(this._panel);

                // for tab panel
                cc.log('uibutton');
                this.tabPanel_backButton = new ccui.Button("icons/back.png", "icons/back_onclick.png", "icons/back_onclick.png", ccui.Widget.PLIST_TEXTURE);
                this.tabPanel_backButton.setPosition(this._panelSize.width * 5 / 100, this._panelSize.height * 95 / 100);
                this.tabPanel_backButton.addTouchEventListener(this.main_backButton_function, this);
                this.addChild(this.tabPanel_backButton);

            }
        }, this);
    },
    selectPanelForTab: function (tab) {
        this.selectPanelForTabName(tab.getName());
    }
});
