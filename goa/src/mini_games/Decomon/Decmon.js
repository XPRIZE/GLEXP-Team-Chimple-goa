var DecmonLayer = cc.Layer.extend({
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

        var mainscenes = ccs.load(Decomon.decomon_main);
        this.addChild(mainscenes.node);

     //   var decomon1 =ccs.load(Decomon.decomon1);
     //    this.addChild(decomon1.node);

     //    var decomon2 =ccs.load(Decomon.decomon2);
      //   this.addChild(decomon2.node);

       //  var decomon3 =ccs.load(Decomon.decomon3);
      //   this.addChild(decomon3.node);
        return true;
    }
});

var DecmonScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new DecmonLayer();
        this.addChild(layer);
    }
});

