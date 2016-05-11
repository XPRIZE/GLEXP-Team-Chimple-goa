var chimple = chimple || {};
chimple.AbstractContentPanel = cc.LayerColor.extend({
    ctor: function (width, height, position) {
        this._super(cc.color.WHITE, width, height);
    }
});