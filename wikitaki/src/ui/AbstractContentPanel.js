var chimple = chimple || {};

var FrontLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this._name = "FrontLayer";
        return true;
    }
});

var BackLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this._name = "BackLayer";
        return true;
    }
});



chimple.AbstractContentPanel = cc.LayerColor.extend({
    ctor: function (width, height, position) {
        this._super(cc.color.WHITE, width, height);
        this._backLayer = new BackLayer();
        this.addChild(this._backLayer);        
        this._frontLayer = new FrontLayer();
        this.addChild(this._frontLayer);        
    }
});