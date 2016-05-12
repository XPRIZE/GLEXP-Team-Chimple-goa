chimple.TabPanel = cc.Node.extend({
    ctor:function(position, size, numButtonsPerRow, numButtonsPerColumn, configuration, callBackFunction, callBackContext, callerPanel) {
        this._super();
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
           
         
        this._tabPanel = new chimple.TabBarPanel(this._tabWidth, this._tabHeight, cc.p(position.x, position.y));
        this.addChild(this._tabPanel);
        
        this._tab = new chimple.TabBar(cc.p(position.x+size.width*10/100, position.y), cc.size(this._tabWidth*80/100, this._tabHeight), numButtonsPerRow, configuration, this.selectPanelForTab, this);
        this.addChild(this._tab);

// for tab bar

       this.tabBar_backButton = new ccui.Button("icons/back.png", "icons/back_onclick.png", null, ccui.Widget.PLIST_TEXTURE);
       this.tabBar_backButton.setPosition(position.x+size.width*5/100, position.y + this._tabHeight/2);
       this.tabBar_backButton.addTouchEventListener(this.tabBar_backButton_function, this);
       this.addChild(this.tabBar_backButton);

       this.tabBar_nextButton = new ccui.Button("icons/next.png", "icons/next_onclick.png", null, ccui.Widget.PLIST_TEXTURE);
       this.tabBar_nextButton.setPosition(position.x+size.width*95/100, position.y + this._tabHeight/2);
       this.tabBar_nextButton.addTouchEventListener(this.tabBar_nextButton_function, this);
       this.addChild(this.tabBar_nextButton);

       this._tab.selectButton(this._tab.getButtonByName(configuration[0]['icon']));
    },

    tabBar_nextButton_function : function()
    {
        this._tab.scrollableButtonPanel_moveRight();
    },
    
    tabBar_backButton_function : function()
    {
        this._tab.scrollableButtonPanel_moveLeft();
    },
    
    tabPanel_nextButton_function : function()
    {
        this._panel.scrollableButtonPanel_moveRight();
    },
    
    tabPanel_backButton_function : function()
    {
        this._panel.scrollableButtonPanel_moveLeft();
    },
    
    main_backButton_function : function (sender, type)
    {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
            if(this._callerPanel != undefined)
            {
                this._callerPanel.goBack();
            }
            this.parent.removeChild(this, true);
                
                break;
        }
    },
    
    selectPanelForTabName: function(name) {
        if(this._panel) {
            this.removeChild(this._panel);
        }
        this._configuration.forEach(function(element) {
            if(element['icon'] == name) {
                this._panelPosition.y = this._panelPosition.y + this._tabHeight;
                this._panel = new chimple.ScrollableButtonPanel(this._panelPosition, cc.size(this._tabWidth, this._panelSize.height - this._tabHeight), this._numButtonsPerRow, this._numButtonsPerColumn, element['items'], this._callBackFunction, this._callBackContext);
                this.addChild(this._panel);

                // for tab panel
                this._panelPosition.y = this._panelPosition.y - this._tabHeight;
                this.tabPanel_backButton = new ccui.Button("icons/back.png", "icons/back_onclick.png", null, ccui.Widget.PLIST_TEXTURE);
                this.tabPanel_backButton.setPosition(this._panelPosition.x+this._panelSize.width*5/100, (this._panelSize.height+this._tabHeight)/2);
                this.tabPanel_backButton.addTouchEventListener(this.tabPanel_backButton_function, this);
                this.addChild(this.tabPanel_backButton);
                
                this.tabPanel_nextButton = new ccui.Button("icons/next.png", "icons/next_onclick.png", null, ccui.Widget.PLIST_TEXTURE);
                this.tabPanel_nextButton.setPosition((this._panelPosition.x)+this._panelSize.width*95/100, (this._panelSize.height+this._tabHeight)/2);
                this.tabPanel_nextButton.addTouchEventListener(this.tabPanel_nextButton_function, this);
                this.addChild(this.tabPanel_nextButton);
                
                this.main_backButton = new ccui.Button("icons/back.png", "icons/back_onclick.png", null, ccui.Widget.PLIST_TEXTURE);
                this.main_backButton.setPosition(this._panelPosition.x+this._panelSize.width*5/100, this._panelPosition.y + this._panelSize.height - this._tabHeight/2);
                this.main_backButton.addTouchEventListener(this.main_backButton_function, this);
                this.addChild(this.main_backButton);      
                
                  
            }                            
        }, this);
    },
    selectPanelForTab: function(tab) {
        this.selectPanelForTabName(tab.getName());
    }
});
