/// <reference path="../../cocos2d-typescript-definitions/cocos2d/cocos2d-lib.d.ts" />

var xc = xc || {};
xc.sortitlevel4Layer = cc.Layer.extend({
    counterLevel4 : 1,
    level4SpriteScaleX : 0.9, 
    level4SpriteScaleY : 0.9,

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
                   
               
                if (self.counterLevel4 == 6) {
                    
                 
                    
                  // xc.GameScene.load(xc.sortitlevel5Layer);
                    
                }
                
                return true;
            }

        }, this);

        // this.audioEngine = cc.audioEngine;
        // this.audioEngine.playEffect(res.explosive_mp3);


        var size = cc.winSize;

         this.bg = ccs.load(xc.sortitlevel4Layer.res.level4bg_json, xc.path);
         this.bg.node.setAnchorPoint(0.5, 0.5 );
         this.bg.node.setPosition(size.width / 2, size.height / 2); 
         this.addChild(this.bg.node);
         cc.eventManager.addListener(eventListener.clone(), this.bg.node);
        
      
        
         this.character = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("sortit/charcterfour.png"));
         this.character.setAnchorPoint(0.5, 0.5);
         this.character.setPosition(size.width*0.87 , size.height*0.60);
         this.character.setScale(0.8, 0.8); 
         this.addChild(this.character);


         
         ///////////////////////////for transparent

         this.bowl1t = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("sortit/sortittwo/bowl1t.png"));
         this.bowl1t.setAnchorPoint(0.5, 0.5 );
         this.bowl1t.setPosition(size.width*0.29 , size.height*0.33);
         this.bowl1t.setScale(this.level4SpriteScaleX, this.level4SpriteScaleY); 
         this.addChild(this.bowl1t);
         

         
         this.bowl2t = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("sortit/sortittwo/bowl2t.png"));
         this.bowl2t.setAnchorPoint(0.5, 0.5 );
         this.bowl2t.setPosition(size.width*0.48 , size.height*0.32);
         this.bowl2t.setScale(this.level4SpriteScaleX, this.level4SpriteScaleY); 
         this.addChild(this.bowl2t);
         

        
         this.bowl3t = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("sortit/sortittwo/bowl3t.png"));
         this.bowl3t.setAnchorPoint(0.5, 0.5 );
         this.bowl3t.setPosition(size.width*0.65 , size.height*0.32);
         this.bowl3t.setScale(this.level4SpriteScaleX, this.level4SpriteScaleY); 
         this.addChild(this.bowl3t);
         

         
         this.bowl4t = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("sortit/sortittwo/bowl4t.png"));
         this.bowl4t.setAnchorPoint(0.5, 0.5 );
         this.bowl4t.setPosition(size.width*0.80 , size.height*0.32);
         this.bowl4t.setScale(this.level4SpriteScaleX, this.level4SpriteScaleY); 
         this.addChild(this.bowl4t);
         
         
        
         this.bowl5t = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("sortit/sortittwo/bowl5t.png"));
         this.bowl5t.setAnchorPoint(0.5, 0.5 );
         this.bowl5t.setPosition(size.width*0.91 , size.height*0.32);
         this.bowl5t.setScale(this.level4SpriteScaleX, this.level4SpriteScaleY); 
         this.addChild(this.bowl5t);
         


         this.bowl1 = new sortitMovableItem4("sortit/sortittwo/bowl1.png", this.bowl1t, this);
         this.bowl1.setAnchorPoint(0.5, 0.5);
         this.bowl1.setPosition(size.width*0.85 , size.height*0.15);
         this.bowl1.xP = this.bowl1.getPosition().x;
         this.bowl1.yP = this.bowl1.getPosition().y;
         this.bowl1.setScale(this.level4SpriteScaleX, this.level4SpriteScaleY);
         this.bowl1.id = 1;
         this.addChild(this.bowl1);
       

      
         this.bowl2 = new sortitMovableItem4("sortit/sortittwo/bowl2.png", this.bowl2t, this);
         this.bowl2.setAnchorPoint(0.5, 0.5);
         this.bowl2.setPosition(size.width*0.19 , size.height*0.14);
         this.bowl2.xP = this.bowl2.getPosition().x;
         this.bowl2.yP = this.bowl2.getPosition().y;
         this.bowl2.setScale(this.level4SpriteScaleX, this.level4SpriteScaleY);
         this.bowl2.id = 2;
         this.addChild(this.bowl2);
        


      
         this.bowl3 = new sortitMovableItem4("sortit/sortittwo/bowl3.png", this.bowl3t, this);
         this.bowl3.setAnchorPoint(0.5, 0.5);
         this.bowl3.setPosition(size.width*0.46 , size.height*0.10);
         this.bowl3.xP = this.bowl3.getPosition().x;
         this.bowl3.yP = this.bowl3.getPosition().y;
         this.bowl3.setScale(this.level4SpriteScaleX, this.level4SpriteScaleY);
         this.bowl3.id = 3;
         this.addChild(this.bowl3);
         

         this.bowl4 = new sortitMovableItem4("sortit/sortittwo/bowl4.png", this.bowl4t, this);
         this.bowl4.setAnchorPoint(0.5, 0.5);
         this.bowl4.setPosition(size.width*0.62 , size.height*0.10);
         this.bowl4.xP = this.bowl4.getPosition().x;
         this.bowl4.yP = this.bowl4.getPosition().y;
         this.bowl4.setScale(this.level4SpriteScaleX, this.level4SpriteScaleY);
         this.bowl4.id = 4;
         this.addChild(this.bowl4);


         this.bowl5 = new sortitMovableItem4("sortit/sortittwo/bowl5.png", this.bowl5t, this);
         this.bowl5.setAnchorPoint(0.5, 0.5);
         this.bowl5.setPosition(size.width*0.07 , size.height*0.12);
         this.bowl5.xP = this.bowl5.getPosition().x;
         this.bowl5.yP = this.bowl5.getPosition().y;
         this.bowl5.setScale(this.level4SpriteScaleX, this.level4SpriteScaleY);
         this.bowl5.id = 5;
         this.addChild(this.bowl5);
         


        return true;
    }


});


xc.sortitlevel4Layer.res = {
    
    sortittwo_png: xc.path + "sortit/sortittwo/sortittwo.png",
    sortittwo_plist: xc.path + "sortit/sortittwo/sortittwo.plist",
    
    sortit_png: xc.path + "sortit/sortit.png",
    sortit_plist: xc.path + "sortit/sortit.plist",
    
    
    level4bg_json: xc.path + "sortit/levelfour.json",
   
    
    comedyBubble_mp3:  "res/sounds/sortit/comedyBubble.mp3",
    explosive_mp3:  "res/sounds/sortit/explosive.mp3",
    failure_mp3:  "res/sounds/sortit/failure.mp3"
}

