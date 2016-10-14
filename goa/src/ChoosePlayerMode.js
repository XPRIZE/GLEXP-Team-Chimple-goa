/// <reference path="cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />
var xc = xc || {};

xc.ChoosePlayerModeLayer = cc.Layer.extend({
    gameName: "multi-player",
    multiGameLayerClass: null,
    args: null,
    //sprite: null,
    ctor: function (multiGameLayerClass, args) {
        //////////////////////////////
        // 1. super init first
        this._super();
        this.args = args;
        cc.log('multiGameLayerClass:' + multiGameLayerClass);
        var worldSize = cc.winSize;
        this.multiGameLayerClass = multiGameLayerClass;
        var sceneRes = ccs.load(xc.ChoosePlayerModeLayer.res.dummy_scene_json, xc.path);
        this.addChild(sceneRes.node);
        
        var singlePlayer = new xc.SinglePlayerSprite(this.multiGameLayerClass, args);
        singlePlayer.setPosition(500,500);
        this.addChild(singlePlayer);

        if(cc.sys.isNative) {
            var multiPlayer = new xc.MultiPlayerSprite(this.multiGameLayerClass, args);
            multiPlayer.setPosition(1500,500);
            this.addChild(multiPlayer);

            cc.eventManager.addCustomListener("peer_information_received_event", function(event) {
                var peers = cc.sys.localStorage.getItem("discoveredBluetoothDevices");
                cc.log('event:' + peers);            
                if(peers) {
                    var filteredPeers = "";
                    var array = peers.split(',');
                    array.forEach(function(e) {
                        if(e.startsWith("chimple_")) {
                            filteredPeers += e + ",";

                        }           
                    });
                        
                    filteredPeers = filteredPeers.replace(/chimple_/g, "");
                    cc.log("saving filtered peers:" + filteredPeers);
                    cc.sys.localStorage.setItem("discoveredBluetoothDevices",filteredPeers);
                    xc.RenderBluetoothPeersScene.load(xc.RenderBluetoothPeersLayer);
                } else {
                    //load single player
                    cc.log('multi player failed....');
                }

            });            
        }

        
    },

    onExit: function () {
        this._super();
        if(cc.sys.isNative) {
            cc.log('removing custom event');
            cc.eventManager.removeCustomListeners("peer_information_received_event")
        }
    }    
});



xc.SinglePlayerSprite = cc.Sprite.extend({
  layer: null,
  args: null,
  ctor: function(layer, args) {
    this._super(xc.path + "menu/camera.png");
    this.layer = layer; 
    this.args = args;
    var listener = cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function (touch, event) {
            var target = event.getCurrentTarget()
            var locationInNode = target.convertTouchToNodeSpace(touch)
            var targetSize = target.getContentSize()
            var rect = cc.rect(0, 0, targetSize.width, targetSize.height)

            if (cc.rectContainsPoint(rect, locationInNode)) {
              cc.log("Touched")
              var cplusGameName = cc.sys.localStorage.getItem("cplusMultiPlayerGame");
              var jsGameName = cc.sys.localStorage.getItem("jsMultiPlayerGame");

              if(jsGameName != undefined) {
                xc.GameScene.load(target.layer, target.args);    
              } else if(cplusGameName != undefined) {
                  target.getParent().getParent().menuContext.launchGame(cplusGameName);  
              }
              
              return true;
            }
        }
    })
    cc.eventManager.addListener(listener, this);
  }
})

xc.MultiPlayerSprite = cc.Sprite.extend({
  layer: null,
  args: null,
  ctor: function(layer, args) {
    this._super(xc.path + "menu/camera.png");
    this.layer = layer; 
    this.args = args;
    var listener = cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function (touch, event) {
            var target = event.getCurrentTarget()
            var locationInNode = target.convertTouchToNodeSpace(touch)
            var targetSize = target.getContentSize()
            var rect = cc.rect(0, 0, targetSize.width, targetSize.height)

            if (cc.rectContainsPoint(rect, locationInNode)) {
              
              var bluetoothName = cc.sys.localStorage.getItem("cachedBluetoothName");
              cc.log("Touched" + bluetoothName);
              jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "enableMultiPlayerMode", "(Ljava/lang/String;)V",bluetoothName);
              return true;
            }
        }
    })
    cc.eventManager.addListener(listener, this)
  }
})

xc.ChoosePlayerModeLayer.res = {
    dummy_scene_json: xc.path + "pop/pop.json",
    dummy_scene_png: xc.path + "pop/pop.png",
}