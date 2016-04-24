/// <reference path="../../../cocos2d-typescript-definitions/cocos2d/cocos2d-lib.d.ts" />

var chimple = chimple || {};
var HelloWorldLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var tabBar = new chimple.TabBar(cc.p(200, 200), cc.size(600, 200), 2, [                    {                        
                            "icon": "res/neck_acccess.png",
  },{                        
                            "icon": "res/neck_acccess_onclick.png",
  },{                        
                            "icon": "res/mouth_2.png",
  },                      {                        
                            "icon": "res/mouth_2_onclick.png",
  }                ]);
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