chimple.TabBarPanel = cc.LayerColor.extend({
    ctor: function (width, height, position) {
        this._super(cc.color.YELLOW, width, height);
        this.setPosition(position);
    },
});