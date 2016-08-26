
var AlphamoneGameLayer = cc.Layer.extend( {
    ctor:function () {
        this._super();

        var size = cc.winSize;
        cc.loader.loadJson(res.Alphamole_json, function (error, data) {});
    }
});

var AlphamoneGameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new AlphamoneGameLayer();
        this.addChild(layer);
    }
});

