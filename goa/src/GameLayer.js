var xc = xc || {};

xc.GameLayer = cc.Layer.extend({
    ctor: function() {
        this._super();
        var node = ccs.load(xc.GameLayer.res.train_json, xc.path);
        this.addChild(node.node);
        return true;
    }
});

xc.GameLayer.res = {
        train_json : xc.path + "train/train.json",
        train_plist: xc.path + "train/train.plist"
};
