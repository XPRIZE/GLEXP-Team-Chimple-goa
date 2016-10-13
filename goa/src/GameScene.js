/// <reference path="cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />
var xc = xc || {};
    
xc.GameScene = cc.Scene.extend({
    multiPlayerGame: false,
    layerClass: null,
    layer: null,
    menuContext: null,
    args: [],
    ctor: function(args) {
        this._super();
        this.layerClass = args.shift()
        this.args = args
    },
    onEnter:function () {
        this._super();
        if(this.layer == null) {
            if(this.multiPlayerGame) {
                this.layer = new xc.ChoosePlayerModeLayer(this.layerClass, this.args);
                this.addChild(this.layer);    
            } else {
                this.layer = new this.layerClass(this.args);
                this.addChild(this.layer);
            }
        }
        if (cc.sys.isNative) {
            this.menuContext = goa.MenuContext.create(this.layer, this.layer.gameName);
            this.addChild(this.menuContext);
        }
    }
});

xc.GameScene.load = function(layer) {
    var args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    var t_resources = [];
    for (var i in layer.res) {
        t_resources.push(layer.res[i]);
    }
    cc.LoaderScene.preload(t_resources, function () {
        var scene = new xc.GameScene(args);
        cc.director.runScene(scene);
    }, this);
}

xc.GameScene.loadMultiPlayerGame = function(layer, gameName) {
    if(cc.sys.isNative) {        
        cc.sys.localStorage.setItem("jsMultiPlayerGame", gameName);
        cc.sys.localStorage.removeItem("cplusMultiPlayerGame");
        var args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
        var t_resources = [];
        for (var i in layer.res) {
            t_resources.push(layer.res[i]);
        }
        cc.LoaderScene.preload(t_resources, function () {
            var scene = new xc.GameScene(args);
            scene.multiPlayerGame = true;
            cc.director.runScene(scene);
        }, this);
    } else {
      xc.GameScene.load(layer);
    }
}