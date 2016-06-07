    //We create our only state
    var counterLevel1 = 1;
    
    
    var spriteAnchorX = 0.5;
    var spriteAnchorY = 0.5;

var MovableItem = cc.Sprite.extend({
        
});

/// <reference path="../../cocos2d-typescript-definitions/cocos2d/cocos2d-lib.d.ts" />
var level1jLayer = cc.Layer.extend({
    
    ctor:function () {
        
        this._super();

        this.audioEngine = cc.audioEngine;
        this.audioEngine.playEffect(res.explosive_mp3);

    
         var size = cc.winSize;

   
         this.bg = new cc.Sprite.create(res.bg1_png);
         this.bg.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY );
         this.bg.setPosition(size.width / 2, size.height / 2); 
         this.addChild(this.bg);

         this.character = new cc.Sprite.create(res.character1_png);
         this.character.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.character.setPosition(size.width*0.88 , size.height*0.56); 
         this.addChild(this.character);




         this.toy1 = new MovableItem(res.toy1_png);
         this.toy1.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.toy1.setPosition(size.width*0.2 , size.height*0.04);
         this.toy1.xP = this.toy1.getPosition().x;
         this.toy1.yP = this.toy1.getPosition().y;
         this.toy1.id = 1; 
         this.addChild(this.toy1);      
         
    



         this.toy2 = new MovableItem(res.toy2_png);
         this.toy2.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY );
         this.toy2.setPosition(size.width*0.6 , size.height*0.1);
         this.toy2.xP = this.toy2.getPosition().x;
         this.toy2.yP = this.toy2.getPosition().y;
         this.toy2.id = 2; 
         this.addChild(this.toy2);


         this.toy3 = new MovableItem(res.toy3_png);
         this.toy3.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY );
         this.toy3.setPosition(size.width*0.8 , size.height*0.07);
         this.toy3.xP = this.toy3.getPosition().x;
         this.toy3.yP = this.toy3.getPosition().y;
         this.toy3.id = 3; 
         this.addChild(this.toy3);
   


         this.toy4 = new MovableItem(res.toy4_png);
         this.toy4.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY );
         this.toy4.setPosition(size.width*0.4 , size.height*0.15);
         this.toy4.xP = this.toy4.getPosition().x;
         this.toy4.yP = this.toy4.getPosition().y;
         this.toy4.id = 4; 
         this.addChild(this.toy4);
     
    


         this.toy5 = new MovableItem(res.toy5_png);
         this.toy5.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY );
         this.toy5.setPosition(size.width*0.07 , size.height*0.2);
         this.toy5.xP = this.toy5.getPosition().x;
         this.toy5.yP = this.toy5.getPosition().y;
         this.toy5.id = 5; 
         this.addChild(this.toy5);
      
            


         this.toy6 = new MovableItem(res.toy6_png);
         this.toy6.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY );
         this.toy6.setPosition(size.width*0.93 , size.height*0.2);
         this.toy6.xP = this.toy6.getPosition().x;
         this.toy6.yP = this.toy6.getPosition().y;
         this.toy6.id = 6; 
         this.addChild(this.toy6);
   


         ///////////////////////////for transparent
         this.toy1t = new cc.Sprite.create(res.toy1t_png);
         this.toy1t.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY );
         this.toy1t.setPosition(size.width*0.50 , size.height*0.30); 
         this.addChild(this.toy1t);
       


         this.toy2t = new cc.Sprite.create(res.toy2t_png);
         this.toy2t.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY );
         this.toy2t.setPosition(size.width*0.50 , size.height*0.36); 
         this.addChild(this.toy2t);
         


         this.toy3t = new cc.Sprite.create(res.toy3t_png);
         this.toy3t.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY );
         this.toy3t.setPosition(size.width*0.50 , size.height*0.43); 
         this.addChild(this.toy3t);
         


         this.toy4t = new cc.Sprite.create(res.toy4t_png);
         this.toy4t.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY );
         this.toy4t.setPosition(size.width*0.50 , size.height*0.52); 
         this.addChild(this.toy4t);
                 
         


         this.toy5t = new cc.Sprite.create(res.toy5t_png);
         this.toy5t.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY );
         this.toy5t.setPosition(size.width*0.50 , size.height*0.607); 
         this.addChild(this.toy5t);
       



         this.toy6t = new cc.Sprite.create(res.toy6t_png);
         this.toy6t.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY );
         this.toy6t.setPosition(size.width*0.50 , size.height*0.677); 
         this.addChild(this.toy6t);
      
   

        return true;
    }


});

var level1jScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new level1jLayer();
        this.addChild(layer);
    }
});




