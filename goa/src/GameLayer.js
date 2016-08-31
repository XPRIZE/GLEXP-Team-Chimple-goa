var chimple = chimple || {};

chimple.GameLayer = cc.Layer.extend({
    ctor: function() {
        this._super();
        var node = ccs.load(chimple.GameLayer.res.train_json, chimple.path);
        this.addChild(node.node);
        return true;
    }
});

chimple.GameLayer.res = {
        train_json : chimple.path + "train/train.json",
        train_plist: chimple.path + "train/train.plist"
    };
