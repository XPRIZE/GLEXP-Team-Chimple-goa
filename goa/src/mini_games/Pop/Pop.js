/// <reference path="../../cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />
var PopLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
       
        var worldSize = cc.winSize;

        var sceneRes = ccs.load(pop_res.pop_scene);
        this.addChild(sceneRes.node);
    }
   
});

var PopScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new PopLayer();
        this.addChild(layer);
    }
});

