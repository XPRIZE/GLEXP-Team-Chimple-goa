
var AlphamoneGameLayer = cc.Layer.extend( {
    alphabet_layer: null,
    alphabet:null,
    background_layer:null,
    hole_array:null,

    ctor:function () {
        this._super();

        var size = cc.winSize;

        background_layer = ccs.load(alphamon_res.Alphamole_json1);
        this.addChild(background_layer.node);

        alphabet_layer = cc.Layer.create();
         this.addChild(alphabet_layer);

         var child = background_layer.node.getChildren(); 
         for(var i=0; i < child.length ;i++){
            // child.
            var name = child[i].getName();
            cc.log("%s", name);
         }
         var test = background_layer.node.getComponent("hole1");
        var myLayer = ccs.load(alphamon_res.Alphamole_json);
        this.addChild(myLayer.node);
        //cc.loader.loadJson(res.Alphamole_json, function (error, data) {});
      this.schedule(this.showAlpha, 2);

      var alpha = ccs.load(alphamon_res.Alphamole_A, "res/");
      alpha.node.x = 900;
      alpha.node.y = 900;
    // alpha.setPosition((100, 200));
   //  this.addChild(alpha.node);
        },

    showAlpha: function () {
     alphabet = ccs.load(alphamon_res.Alphamole_A, "res/");
     alphabet.node.x = 900;
     alphabet.node.y = 500;
     alphabet_layer.addChild(alphabet.node);
     var whack_jump = cc.JumpBy.create(1,cc.p(0, 0),600,1);
     alphabet.node.runAction(whack_jump);
      this.scheduleOnce(function(){
     //     this.removeChild(alphabet); 
      },1);    
     cc.eventManager.addListener(cc.EventListener.create({
         event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) ,alphabet); 
    },
    
});

var AlphamoneGameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new AlphamoneGameLayer();
        this.addChild(layer);
    }
});

