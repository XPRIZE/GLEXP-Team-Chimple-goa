var xc = xc || {};

xc.BaseConfigPanel = cc.LayerColor.extend({
    ctor: function (width, height, position, configuration, contentPanel) {
        this._super(xc.PRIMARY_COLOR, width, height);
        this.setPosition(position);
        this._configuration = configuration;
        this._contentPanel = contentPanel;

        this._buttonPanel = new xc.ButtonPanel(new cc.p(0, 0), this.getContentSize(), 1, 6, configuration, new xc.ButtonHandler(this.buttonPressed, this));
        this.addChild(this._buttonPanel);
    },

    buttonPressed: function (selectedItem) {
        var selectedConfig = this._configuration[selectedItem._selectedIndex];
        if (selectedConfig != null && selectedConfig.name === "back") {
            this._contentPanel.backPressed();            
        }
    }
});



