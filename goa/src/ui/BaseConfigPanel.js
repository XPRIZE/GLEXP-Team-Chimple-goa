chimple.BaseConfigPanel = cc.LayerColor.extend({
    ctor: function (width, height, position, configuration, contentPanel) {
        this._super(chimple.PRIMARY_COLOR, width, height);
        this.setPosition(position);
        this._configuration = configuration;
        this._contentPanel = contentPanel;

        this._buttonPanel = new chimple.ButtonPanel(new cc.p(0, 0), this.getContentSize(), 1, 6, configuration, new chimple.ButtonHandler(this.buttonPressed, this));
        this.addChild(this._buttonPanel);
    },

    buttonPressed: function (selectedItem) {
        var selectedConfig = this._configuration[selectedItem._selectedIndex];
        if (selectedConfig != null && selectedConfig.name === "back") {
            this._contentPanel.backPressed();            
        }
    }
});



