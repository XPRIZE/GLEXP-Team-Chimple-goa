/// <reference path="cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />
var xc = xc || {};
    
xc.GameScene = cc.Scene.extend({
    layerClass: null,
    layer: null,
    menuContext: null,
    onEnter:function () {
        this._super();
        if(this.layer == null) {
            this.layer = new this.layerClass();
            this.addChild(this.layer);
        }
        if (cc.sys.isNative) {
            this.menuContext = goa.MenuContext.create(this.layer, this.layer.gameName);
            this.addChild(this.menuContext);
        }
    }
});

xc.GameScene.load = function(layer) {
    var t_resources = [];
    for (var i in layer.res) {
        t_resources.push(layer.res[i]);
    }
    cc.LoaderScene.preload(t_resources, function () {
        var scene = new xc.GameScene();
        scene.layerClass = layer;
        cc.director.runScene(scene);
    }, this);
}