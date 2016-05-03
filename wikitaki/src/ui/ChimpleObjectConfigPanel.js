chimple.ObjectConfigPanel = cc.LayerColor.extend({
    ctor: function (width, height, position, configuration) {
        this._super(cc.color.RED, width, height);
        this.setPosition(position);
        this._configuration = configuration;
    },
    setTarget(target) {
        if (this._target != target) {
            this._target = target;
            if(this._buttonPanel) {
                this.removeChild(this._buttonPanel, true);
            }
            if (target.getName().indexOf("Skeleton") != -1) {
                this._buttonPanel = new chimple.ButtonPanel(new cc.p(0, 0), this.getContentSize(), 1, 6, this._configuration.editCharacter, this.buttonPressed, this);
            } else {
                this._buttonPanel = new chimple.ButtonPanel(new cc.p(0, 0), this.getContentSize(), 1, 6, this._configuration.editObject, this.buttonPressed, this);
            }
            this.addChild(this._buttonPanel);
        }        
    },
    buttonPressed: function(button) {
        
    }    
});
