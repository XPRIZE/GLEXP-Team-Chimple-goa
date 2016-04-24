chimple.TabBar = chimple.ButtonPanel.extend({
    ctor:function(position, size, numButtonsPerScreen, menuDef) {
        this._super(position, size, numButtonsPerScreen, 1, menuDef);
        this.setBackGroundColor(cc.color.RED);                
    }
}); 