chimple.TabPanel = cc.Node.extend({
    ctor:function(position, size, numButtonsPerRow, numButtonsPerColumn, configuration, callBackFunction, callBackContext) {
        this._super();
        this._panelPosition = position;
        this._panelSize = size;
        this._numButtonsPerRow = numButtonsPerRow;
        this._numButtonsPerColumn = numButtonsPerColumn;
        this._configuration = configuration;
        this._tabWidth = size.width;
        this._tabHeight = size.height / (numButtonsPerColumn + 1);
        this._callBackFunction = callBackFunction;
        this._callBackContext = callBackContext;
        var TabBar = chimple.TabBar.extend({
            selectButton: function(button) {
                this._super(button);
                this.getParent().selectPanelForTabName(button.getName());
            }
        });
        this._tab = new TabBar(cc.p(position.x, position.y + size.height - this._tabHeight), cc.size(this._tabWidth, this._tabHeight), numButtonsPerRow, configuration);
        this.addChild(this._tab);
        this._tab.selectButton(this._tab.getChildByName(configuration[0]['icon']));
    },
    selectPanelForTabName: function(name) {
        if(this._panel) {
            this.removeChild(this._panel);
        }
        this._configuration.forEach(function(element) {
            if(element['icon'] == name) {
                this._panel = new chimple.ButtonPanel(this._panelPosition, cc.size(this._tabWidth, this._panelSize.height - this._tabHeight), this._numButtonsPerRow, this._numButtonsPerColumn, element['items'], this._callBackFunction, this._callBackContext);
                this.addChild(this._panel);
            }                            
        }, this);
    }
});
