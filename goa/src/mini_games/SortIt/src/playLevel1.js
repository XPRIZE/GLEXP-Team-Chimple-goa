/// <reference path="../../cocos2d-typescript-definitions/cocos2d/cocos2d-lib.d.ts" />
var level1Layer = cc.Layer.extend({
    
    counterLevel1 : 1,
    
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
                
                if (self.counterLevel1 == 7) {
              
                    cc.director.runScene(new level2Scene());

                }
                 
                return true;
            }

        }, this);


        this.audioEngine = cc.audioEngine;
        this.audioEngine.playEffect(SortIt.explosive_mp3);

    
         var size = cc.winSize;

   
         this.bg = ccs.load(SortIt.level1bg_json);
         this.bg.setAnchorPoint(0.5, 0.5);
         this.bg.setPosition(size.width / 2, size.height / 2); 
         this.addChild(this.bg);
         cc.eventManager.addListener(eventListener.clone(), this.bg);
         
         
       
         this.character = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("sortit/charcterone.png"));
         this.character.setAnchorPoint(0.5, 0.5);
         this.character.setPosition(size.width*0.88 , size.height*0.56); 
         this.addChild(this.character);


         ///////////////////////////for transpare`nt
        
         this.toy1t = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("sortit/toy1t.png"));
         this.toy1t.setAnchorPoint(0.5, 0.5);
         this.toy1t.setPosition(size.width*0.50 , size.height*0.30); 
         this.addChild(this.toy1t);
       

        
         this.toy2t = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("sortit/toy2t.png"));
         this.toy2t.setAnchorPoint(0.5, 0.5);
         this.toy2t.setPosition(size.width*0.50 , size.height*0.375); 
         this.addChild(this.toy2t);
         

        
         this.toy3t = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("sortit/toy3t.png"));
         this.toy3t.setAnchorPoint(0.5, 0.5);
         this.toy3t.setPosition(size.width*0.50 , size.height*0.46); 
         this.addChild(this.toy3t);
         

        
         this.toy4t = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("sortit/toy4t.png"));
         this.toy4t.setAnchorPoint(0.5, 0.5);
         this.toy4t.setPosition(size.width*0.50 , size.height*0.57); 
         this.addChild(this.toy4t);
                 
         
        

         this.toy5t = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("sortit/toy5t.png"));
         this.toy5t.setAnchorPoint(0.5, 0.5);
         this.toy5t.setPosition(size.width*0.50 , size.height*0.679); 
         this.addChild(this.toy5t);
       


        
         this.toy6t = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("sortit/toy6t.png"));
         this.toy6t.setAnchorPoint(0.5, 0.5);
         this.toy6t.setPosition(size.width*0.50 , size.height*0.768); 
         this.addChild(this.toy6t);

        ////Solid toys
        
         this.toy1 = new MovableItem1(cc.spriteFrameCache.getSpriteFrame("sortit/toy1.png"), this.toy1t, this);
         this.toy1.setAnchorPoint(0.5, 0.5);
         this.toy1.setPosition(size.width*0.2 , size.height*0.04);
         this.toy1.xP = this.toy1.getPosition().x;
         this.toy1.yP = this.toy1.getPosition().y;
         this.toy1.id = 1; 
         this.addChild(this.toy1);      
         
    

        

         this.toy2 = new MovableItem1(cc.spriteFrameCache.getSpriteFrame("sortit/toy2.png"), this.toy2t, this);
         this.toy2.setAnchorPoint(0.5, 0.5);
         this.toy2.setPosition(size.width*0.6 , size.height*0.1);
         this.toy2.xP = this.toy2.getPosition().x;
         this.toy2.yP = this.toy2.getPosition().y;
         this.toy2.id = 2; 
         this.addChild(this.toy2);

        
         this.toy3 = new MovableItem1(cc.spriteFrameCache.getSpriteFrame("sortit/toy3.png"), this.toy3t, this);
         this.toy3.setAnchorPoint(0.5, 0.5);
         this.toy3.setPosition(size.width*0.8 , size.height*0.07);
         this.toy3.xP = this.toy3.getPosition().x;
         this.toy3.yP = this.toy3.getPosition().y;
         this.toy3.id = 3; 
         this.addChild(this.toy3);
   

        
         this.toy4 = new MovableItem1(cc.spriteFrameCache.getSpriteFrame("sortit/toy4.png"), this.toy4t,  this);
         this.toy4.setAnchorPoint(0.5, 0.5);
         this.toy4.setPosition(size.width*0.4 , size.height*0.15);
         this.toy4.xP = this.toy4.getPosition().x;
         this.toy4.yP = this.toy4.getPosition().y;
         this.toy4.id = 4; 
         this.addChild(this.toy4);
     
    

        
         this.toy5 = new MovableItem1(cc.spriteFrameCache.getSpriteFrame("sortit/toy5.png"), this.toy5t, this);
         this.toy5.setAnchorPoint(0.5, 0.5);
         this.toy5.setPosition(size.width*0.07 , size.height*0.2);
         this.toy5.xP = this.toy5.getPosition().x;
         this.toy5.yP = this.toy5.getPosition().y;
         this.toy5.id = 5; 
         this.addChild(this.toy5);
      
            

       
         this.toy6 = new MovableItem1( cc.spriteFrameCache.getSpriteFrame("sortit/toy6.png"), this.toy6t, this);
         this.toy6.setAnchorPoint(0.5, 0.5);
         this.toy6.setPosition(size.width*0.93 , size.height*0.2);
         this.toy6.xP = this.toy6.getPosition().x;
         this.toy6.yP = this.toy6.getPosition().y;
         this.toy6.id = 6; 
         this.addChild(this.toy6);
   

        return true;
    }

});

var level1Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new level1Layer();
        this.addChild(layer);
    }
});




