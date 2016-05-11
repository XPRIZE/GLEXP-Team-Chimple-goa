chimple.TabPanel = cc.Node.extend({
    ctor:function(position, size, numButtonsPerRow, numButtonsPerColumn, configuration, callBackFunction, callBackContext) {
        this._super();
        this._panelPosition = position;
        this._panelSize = size;
        this._numButtonsPerRow = numButtonsPerRow;
        this._numButtonsPerColumn = numButtonsPerColumn;
        this._configuration = configuration;
        this._tabWidth = size.width;
        this._tabHeight = 256;
        this._callBackFunction = callBackFunction;
        this._callBackContext = callBackContext;
           
         
        this._tabPanel = new chimple.TabBarPanel(this._tabWidth, this._tabHeight, cc.p(0, position.y + size.height - this._tabHeight));
        this.addChild(this._tabPanel);
        
        this._tab = new chimple.TabBar(cc.p(size.width*10/100, position.y + size.height - this._tabHeight), cc.size(this._tabWidth*80/100, this._tabHeight), numButtonsPerRow, configuration, this.selectPanelForTab, this);
        this.addChild(this._tab);

// for tab bar

        var tabBar_backButton = new ccui.Button("back.png", "back_onclick.png", null, ccui.Widget.PLIST_TEXTURE);
       tabBar_backButton.setPosition(size.width*5/100, position.y + size.height - this._tabHeight/2);
       tabBar_backButton.addTouchEventListener(this.tabBar_backButton, this);
       this.addChild(tabBar_backButton);

        var tabBar_nextButton = new ccui.Button("next.png", "next_onclick.png", null, ccui.Widget.PLIST_TEXTURE);
       tabBar_nextButton.setPosition(size.width*95/100, position.y + size.height - this._tabHeight/2);
       tabBar_nextButton.addTouchEventListener(this.tabBar_nextButton, this);
       this.addChild(tabBar_nextButton);

        this._tab.selectButton(this._tab.getButtonByName(configuration[0]['icon']));
    },

    tabBar_nextButton : function()
    {
        this._tab.scrollableButtonPanel_moveRight();
    },
    
    tabBar_backButton : function()
    {
        this._tab.scrollableButtonPanel_moveLeft();
    },
    
    tabPanel_nextButton : function()
    {
        this._panel.scrollableButtonPanel_moveRight();
    },
    
    tabPanel_backButton : function()
    {
        this._panel.scrollableButtonPanel_moveLeft();
    },
    
    selectPanelForTabName: function(name) {
        if(this._panel) {
            this.removeChild(this._panel);
        }
        this._configuration.forEach(function(element) {
            if(element['icon'] == name) {
                this._panel = new chimple.ScrollableButtonPanel(this._panelPosition, cc.size(this._tabWidth, this._panelSize.height - this._tabHeight), this._numButtonsPerRow, this._numButtonsPerColumn, element['items'], this._callBackFunction, this._callBackContext);
                this.addChild(this._panel);

// for tab panel                
        var tabPanel_backButton = new ccui.Button("back.png", "back_onclick.png", null, ccui.Widget.PLIST_TEXTURE);
        tabPanel_backButton.setPosition(this._panelPosition.x+this._panelSize.width*5/100, this._panelSize.height/2);
        tabPanel_backButton.addTouchEventListener(this.tabPanel_backButton, this);
        this.addChild(tabPanel_backButton);
        
        var tabPanel_nextButton = new ccui.Button("next.png", "next_onclick.png", null, ccui.Widget.PLIST_TEXTURE);
        tabPanel_nextButton.setPosition((this._panelPosition.x)+this._panelSize.width*95/100, this._panelSize.height/2);
        tabPanel_nextButton.addTouchEventListener(this.tabPanel_nextButton, this);
        this.addChild(tabPanel_nextButton);
            }                            
        }, this);
    },
    selectPanelForTab: function(tab) {
        this.selectPanelForTabName(tab.getName());
    }
});
