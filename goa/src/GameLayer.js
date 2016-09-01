var xc = xc || {};

xc.GameLayer = cc.Layer.extend({
    ctor: function() {
        this._super();
        var node = ccs.load(xc.GameLayer.res.train_json, xc.path);
        this.addChild(node.node);
        var word = goa.TextGenerator.getInstance().generateAWord();
        cc.log('generateAWord' + word);
        var matrix = goa.TextGenerator.getInstance().generateMatrix("Ship", 5, 2);
        cc.log("matrix:" + matrix);

        var sentence = goa.TextGenerator.getInstance().generateASentence();
        cc.log("sentence:" + sentence);
        return true;
    }
});

xc.GameLayer.res = {
        train_json : xc.path + "train/train.json",
        train_plist: xc.path + "train/train.plist"
};