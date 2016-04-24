/// <reference path="../../../cocos2d-typescript-definitions/cocos2d/cocos2d-lib.d.ts" />

var chimple = chimple || {};
var HelloWorldLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var tabBar = new chimple.TabPanel(cc.p(100, 100), cc.size(600, 500), 2, 2, [            {                
  "name": "hair",
                  "cIcon": "res/Hair_style_onclick.png",
                  "icon": "res/Hair_style.png",
                  "items": [                    {                        
                            "icon": "res/neck_acccess.png",
  },{                        
                            "icon": "res/neck_acccess_onclick.png",
  },{                        
                            "icon": "res/mouth_2.png",
  },                      {                        
                            "icon": "res/mouth_2_onclick.png",
  },{                        
                            "icon": "res/neck_acccess.png",
  },{                        
                            "icon": "res/neck_acccess_onclick.png",
  },{                        
                            "icon": "res/mouth_2.png",
  },                      {                        
                            "icon": "res/mouth_2_onclick.png",
  }                ]            
},              {                
  "name": "shirt",
                  "cIcon": "res/shirt_onclick.png",
                  "icon": "res/shirt.png",
                  "items": [                    {                        
    "cIcon": "res/mouth_access_onclick.png",
                            "icon": "res/mouth_access.png",
  },{                        
                            "icon": "res/neck_acccess.png",
  },{                        
                            "icon": "res/neck_acccess_onclick.png",
  },{                        
                            "icon": "res/mouth_2.png",
  }                ]            
}        ]
);
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