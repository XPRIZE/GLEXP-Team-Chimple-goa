/// <reference path="../../cocos2d-typescript-definitions/cocos2d/cocos2d-lib.d.ts" />
var chimple = chimple || {};
var HelloWorldLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var tabBar = new chimple.TabBar(cc.p(200, 200), cc.size(600, 200), 2, {'res/neck_acccess.png':'res/neck_acccess_onclick.png', 'res/pant.png':'res/pant_onclick.png', 'res/shirt.png':'res/shirt_onclick.png', 'res/shoe.png':'res/shoe_onclick.png', 'res/skintone.png':'res/skintone_onclick.png', 'res/eyes.png':'res/eyes_onclick.png'});
        this.addChild(tabBar);
        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});