var TrainLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        var node = ccs.load(res.train_json, "res/SD/");
        this.addChild(node.node);


	    var word = goa.TextGenerator.getInstance().generateAWord();
        cc.log('generateAWord' + word);


        if(!cc.sys.isNative) {
            node.node._renderCmd._dirtyFlag = 1;
        };
        return true;
    }
});

var TrainScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new TrainLayer();
        var menu = goa.MenuContext.create(layer);        
        this.addChild(layer);
        this.addChild(menu);
    }
});

