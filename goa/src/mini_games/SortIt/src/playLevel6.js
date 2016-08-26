/// <reference path="../../cocos2d-typescript-definitions/cocos2d/cocos2d-lib.d.ts" />
var level6Layer = cc.Layer.extend({
        counterLevel6 : 1,
        level6SpriteScaleX : 0.9, 
        level6SpriteScaleY : 0.9,
    ctor:function () {
        
        this._super();

        var self = this;

        var eventListener = cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                var location = target.convertToNodeSpace(touch.getLocation());
                var targetSize = target.getContentSize();
                var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);
                   
               
                if (self.counterLevel6 == 6) {
                    
                 
                    
                    cc.director.runScene(new level1Scene());
                    
                }
                //console.log('touche po oe: ' + targetSize);   
                return true;
            }

        }, this);

        // this.audioEngine = cc.audioEngine;
        // this.audioEngine.playEffect(res.explosive_mp3);

        

        var size = cc.winSize;

         this.bg = new cc.Sprite(res.bg6_png);
         this.bg.setAnchorPoint(0.5, 0.5 );
         this.bg.setPosition(size.width / 2, size.height / 2); 
         this.addChild(this.bg);
         cc.eventManager.addListener(eventListener.clone(), this.bg);



         ///////////////////////////for transparent
            
         this.at = new cc.Sprite(res.at_png);
         this.at.setAnchorPoint(0.5, 0.5 );
         this.at.setPosition(size.width*0.43 , size.height*0.69);
         this.at.setScale(this.level6SpriteScaleX, this.level6SpriteScaleY); 
         this.addChild(this.at);
         
         

         this.bt = new cc.Sprite(res.bt_png);
         this.bt.setAnchorPoint(0.5, 0.5 );
         this.bt.setPosition(size.width*0.52 , size.height*0.72);
         this.bt.setScale(this.level6SpriteScaleX, this.level6SpriteScaleY); 
         this.addChild(this.bt);
        

         this.ct = new cc.Sprite(res.ct_png);
         this.ct.setAnchorPoint(0.5, 0.5 );
         this.ct.setPosition(size.width*0.61 , size.height*0.69);
         this.ct.setScale(this.level6SpriteScaleX, this.level6SpriteScaleY); 
         this.addChild(this.ct);
         

                   
         this.dt = new cc.Sprite(res.dt_png);
         this.dt.setAnchorPoint(0.5, 0.5 );
         this.dt.setPosition(size.width*0.71 , size.height*0.67);
         this.dt.setScale(this.level6SpriteScaleX, this.level6SpriteScaleY); 
         this.addChild(this.dt);
         
             

         this.et = new cc.Sprite(res.et_png);
         this.et.setAnchorPoint(0.5, 0.5 );
         this.et.setPosition(size.width*0.78 , size.height*0.71);
         this.et.setScale(this.level6SpriteScaleX, this.level6SpriteScaleY); 
         this.addChild(this.et);
         

         this.a = new MovableItem6(res.a_png, this.at, this);
         this.a.setAnchorPoint(0.5, 0.5);
         this.a.setPosition(size.width*0.70 , size.height*0.19);
         this.a.xP = this.a.getPosition().x;
         this.a.yP = this.a.getPosition().y;
         this.a.setScale(this.level6SpriteScaleX, this.level6SpriteScaleY);
         this.a.id = 1;
         this.addChild(this.a);
         

         this.b = new MovableItem6(res.b_png, this.bt, this);
         this.b.setAnchorPoint(0.5, 0.5);
         this.b.setPosition(size.width*0.31 , size.height*0.14);
         this.b.xP = this.b.getPosition().x;
         this.b.yP = this.b.getPosition().y;
         this.b.setScale(this.level6SpriteScaleX, this.level6SpriteScaleY);
         this.b.id = 2;
         this.addChild(this.b);
         

        
         this.c = new MovableItem6(res.c_png, this.ct, this);
         this.c.setAnchorPoint(0.5, 0.5);
         this.c.setPosition(size.width*0.46 , size.height*0.10);
         this.c.xP = this.c.getPosition().x;
         this.c.yP = this.c.getPosition().y;
         this.c.setScale(this.level6SpriteScaleX, this.level6SpriteScaleY);
         this.c.id = 3;
         this.addChild(this.c);
         
         
         this.d = new MovableItem6(res.d_png, this.dt, this);
         this.d.setAnchorPoint(0.5, 0.5);
         this.d.setPosition(size.width*0.62 , size.height*0.10);
         this.d.xP = this.d.getPosition().x;
         this.d.yP = this.d.getPosition().y;
         this.d.setScale(this.level6SpriteScaleX, this.level6SpriteScaleY);
         this.d.id = 4;
         this.addChild(this.d);
        
         

         this.e = new MovableItem6(res.e_png, this.et, this);
         this.e.setAnchorPoint(0.5, 0.5);
         this.e.setPosition(size.width*0.07 , size.height*0.12);
         this.e.xP = this.e.getPosition().x;
         this.e.yP = this.e.getPosition().y;
         this.e.setScale(this.level6SpriteScaleX, this.level6SpriteScaleY);
         this.e.id = 5;
         this.addChild(this.e);
        

        return true;
    }


});

var level6Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new level6Layer();
        this.addChild(layer);
    }
});



