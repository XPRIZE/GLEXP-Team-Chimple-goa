/// <reference path="../../cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />
var PopLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
       
       var worldSize = cc.winSize;

       this.menuBg = new cc.Sprite(res.menu);
       this.menuBg.setPosition( cc.director.getWinSize().width * 0.5,cc.director.getWinSize().height * 0.5);
       this.addChild(this.menuBg);
    }
   
});

var PopScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new PopLayer();
        this.addChild(layer);
    }
});

