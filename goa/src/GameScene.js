/// <reference path="cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />
var chimple = chimple || {};
    
chimple.GameScene = cc.Scene.extend({
    layerClass: null,
    onEnter:function () {
        this._super();
        var layer = new this.layerClass();
        this.addChild(layer);
    }
});

chimple.GameScene.load = function(layer) {
    var t_resources = [];
    for (var i in layer.res) {
        t_resources.push(layer.res[i]);
    }
    cc.LoaderScene.preload(t_resources, function () {
        var scene = new chimple.GameScene();
        scene.layerClass = layer;
        cc.director.runScene(scene);
    }, this);
}