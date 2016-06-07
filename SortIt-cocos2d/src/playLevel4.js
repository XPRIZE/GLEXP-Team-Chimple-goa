
    //We create our only state
    var counterLevel4 = 1;

    var level4SpriteScaleX = 0.9; 
    var level4SpriteScaleY = 0.9;

    
    var spriteAnchorX = 0.5;
    var spriteAnchorY = 0.5;



/// <reference path="../../cocos2d-typescript-definitions/cocos2d/cocos2d-lib.d.ts" />
var level4Layer = cc.Layer.extend({
    
    ctor:function () {
        
        this._super();

        this.audioEngine = cc.audioEngine;
        this.audioEngine.playEffect(res.explosive_mp3);

        
       

var eventListener = cc.eventManager.addListener( 
    {
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    swallowTouches: true,
    onTouchBegan: function(touch, event){


        var target = event.getCurrentTarget();
                 

                 var locationInNode = target.convertToNodeSpace(touch.getLocation());
                 
                 var bowl1 = target.bowl1.getContentSize();
                 var rectBowl1 = cc.rect(target.bowl1.getPosition().x - bowl1.width/2 ,target.bowl1.getPosition().y - bowl1.height/2, bowl1.width, bowl1.height);
                 if (cc.rectContainsPoint(rectBowl1, locationInNode)) {return true;}
                
                 var bowl2 = target.bowl2.getContentSize();
                 var rectBowl2 = cc.rect(target.bowl2.getPosition().x - bowl2.width/2 ,target.bowl2.getPosition().y - bowl2.height/2, bowl2.width, bowl2.height);
                 if (cc.rectContainsPoint(rectBowl2, locationInNode)) {return true;}
                
                 var bowl3 = target.bowl3.getContentSize();
                 var rectBowl3 = cc.rect(target.bowl3.getPosition().x - bowl3.width/2 ,target.bowl3.getPosition().y - bowl3.height/2, bowl3.width, bowl3.height);
                 if (cc.rectContainsPoint(rectBowl3, locationInNode)) {return true;}
                
                 var bowl4 = target.bowl4.getContentSize();
                 var rectBowl4 = cc.rect(target.bowl4.getPosition().x - bowl4.width/2 ,target.bowl4.getPosition().y - bowl4.height/2, bowl4.width, bowl4.height);
                 if (cc.rectContainsPoint(rectBowl4, locationInNode)) {return true;}
                

                 var bowl5 = target.bowl5.getContentSize();
                 var rectBowl5 = cc.rect(target.bowl5.getPosition().x - bowl5.width/2 ,target.bowl5.getPosition().y - bowl5.height/2, bowl5.width, bowl5.height);
                 if (cc.rectContainsPoint(rectBowl5, locationInNode)) {return true;}
                

                
                 return false;
       
    },

    onTouchMoved: function(touch, event){

    
         var target = event.getCurrentTarget();
         
         var locationInNode = target.convertToNodeSpace(touch.getLocation());
                 
    

        var bowl1Rect = target.bowl1.getBoundingBox();
        var bowl1tRect = target.bowl1t.getBoundingBox();
        if(cc.rectIntersectsRect(bowl1Rect, bowl1tRect) && counterLevel4 == 1){
            console.log("toy1 collided");
            var x = target.bowl1t.getPosition().x;
            var y = target.bowl1t.getPosition().y;
            target.bowl1.setPosition(x, y);

            this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.comedyBubble_mp3);



            
            target.removeChild(target.bowl1);

            //cc.eventManager.removeListener(eventListener, target.toy1);
            
         this.bowl1 = new cc.Sprite.create(res.bowl1_png);
         this.bowl1.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.bowl1.setPosition(x , y);
         target.addChild(this.bowl1);

            counterLevel4++;
        }



       var bowl2Rect = target.bowl2.getBoundingBox();
        var bowl2tRect = target.bowl2t.getBoundingBox();
        if(cc.rectIntersectsRect(bowl2Rect, bowl2tRect) && counterLevel4 == 2){
            console.log("toy1 collided");
            var x = target.bowl2t.getPosition().x;
            var y = target.bowl2t.getPosition().y;
            target.bowl2.setPosition(x, y);

            this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.comedyBubble_mp3);



            
            target.removeChild(target.bowl2);

            //cc.eventManager.removeListener(eventListener, target.toy1);
            
         this.bowl2 = new cc.Sprite.create(res.bowl2_png);
         this.bowl2.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.bowl2.setPosition(x , y);
         target.addChild(this.bowl2);

            counterLevel4++;
        }
        

        var bowl3Rect = target.bowl3.getBoundingBox();
        var bowl3tRect = target.bowl3t.getBoundingBox();
        if(cc.rectIntersectsRect(bowl3Rect, bowl3tRect) && counterLevel4 == 3){
            console.log("toy1 collided");
            var x = target.bowl3t.getPosition().x;
            var y = target.bowl3t.getPosition().y;
            target.bowl3.setPosition(x, y);

            this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.comedyBubble_mp3);



            
            target.removeChild(target.bowl3);

            //cc.eventManager.removeListener(eventListener, target.toy1);
            
         this.bowl3 = new cc.Sprite.create(res.bowl3_png);
         this.bowl3.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.bowl3.setPosition(x , y);
         target.addChild(this.bowl3);

            counterLevel4++;
        }

        var bowl4Rect = target.bowl4.getBoundingBox();
        var bowl4tRect = target.bowl4t.getBoundingBox();
        if(cc.rectIntersectsRect(bowl4Rect, bowl4tRect) && counterLevel4 == 4){
            console.log("toy1 collided");
            var x = target.bowl4t.getPosition().x;
            var y = target.bowl4t.getPosition().y;
            target.bowl4.setPosition(x, y);

            this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.comedyBubble_mp3);



            
            target.removeChild(target.bowl4);

            //cc.eventManager.removeListener(eventListener, target.toy1);
            
         this.bowl4 = new cc.Sprite.create(res.bowl4_png);
         this.bowl4.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.bowl4.setPosition(x , y);
         target.addChild(this.bowl4);

            counterLevel4++;
        }

        var bowl5Rect = target.bowl5.getBoundingBox();
        var bowl5tRect = target.bowl5t.getBoundingBox();
        if(cc.rectIntersectsRect(bowl5Rect, bowl5tRect) && counterLevel4 == 5){
            console.log("toy1 collided");
            var x = target.bowl5t.getPosition().x;
            var y = target.bowl5t.getPosition().y;
            target.bowl5.setPosition(x, y);

            this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.comedyBubble_mp3);



            
            target.removeChild(target.bowl5);

            //cc.eventManager.removeListener(eventListener, target.toy1);
            
         this.bowl5 = new cc.Sprite.create(res.bowl5_png);
         this.bowl5.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.bowl5.setPosition(x , y);
         target.addChild(this.bowl5);

         cc.director.runScene(new level5Scene());

            counterLevel4++;
        } 


                var bowl1 = target.bowl1.getContentSize();
                 var rectBowl1 = cc.rect(target.bowl1.getPosition().x - bowl1.width/2 ,target.bowl1.getPosition().y - bowl1.height/2, bowl1.width, bowl1.height);
                 if (cc.rectContainsPoint(rectBowl1, locationInNode)) {target.bowl1.setPosition(touch.getLocation());return true;}
                
                 var bowl2 = target.bowl2.getContentSize();
                 var rectBowl2 = cc.rect(target.bowl2.getPosition().x - bowl2.width/2 ,target.bowl2.getPosition().y - bowl2.height/2, bowl2.width, bowl2.height);
                 if (cc.rectContainsPoint(rectBowl2, locationInNode)) {target.bowl2.setPosition(touch.getLocation());return true;}
                
                 var bowl3 = target.bowl3.getContentSize();
                 var rectBowl3 = cc.rect(target.bowl3.getPosition().x - bowl3.width/2 ,target.bowl3.getPosition().y - bowl3.height/2, bowl3.width, bowl3.height);
                 if (cc.rectContainsPoint(rectBowl3, locationInNode)) {target.bowl3.setPosition(touch.getLocation());return true;}
                
                 var bowl4 = target.bowl4.getContentSize();
                 var rectBowl4 = cc.rect(target.bowl4.getPosition().x - bowl4.width/2 ,target.bowl4.getPosition().y - bowl4.height/2, bowl4.width, bowl4.height);
                 if (cc.rectContainsPoint(rectBowl4, locationInNode)) {target.bowl4.setPosition(touch.getLocation());return true;}
                

                 var bowl5 = target.bowl5.getContentSize();
                 var rectBowl5 = cc.rect(target.bowl5.getPosition().x - bowl5.width/2 ,target.bowl5.getPosition().y - bowl5.height/2, bowl5.width, bowl5.height);
                 if (cc.rectContainsPoint(rectBowl5, locationInNode)) {target.bowl5.setPosition(touch.getLocation());return true;}
                
    },


    onTouchEnded: function(touch, event){

        
        
          var target = event.getCurrentTarget();
         
         var locationInNode = target.convertToNodeSpace(touch.getLocation());
                 
         
                 var bowl1 = target.bowl1.getContentSize();
                 var rectBowl1 = cc.rect(target.bowl1.getPosition().x - bowl1.width/2 ,target.bowl1.getPosition().y - bowl1.height/2, bowl1.width, bowl1.height);
                 if (cc.rectContainsPoint(rectBowl1, locationInNode)) { var bowl1 = cc.MoveTo.create(2,cc.p(target.bowl1.xP,target.bowl1.yP));
        target.bowl1.runAction(bowl1);this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.failure_mp3);
return true;}
                
                 
                 var bowl2 = target.bowl2.getContentSize();
                 var rectBowl2 = cc.rect(target.bowl2.getPosition().x - bowl2.width/2 ,target.bowl2.getPosition().y - bowl2.height/2, bowl2.width, bowl2.height);
                 if (cc.rectContainsPoint(rectBowl2, locationInNode)) { var bowl2 = cc.MoveTo.create(2,cc.p(target.bowl2.xP,target.bowl2.yP));
        target.bowl2.runAction(bowl2);this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.failure_mp3);
return true;}
                
                 
                 var bowl3 = target.bowl3.getContentSize();
                 var rectBowl3 = cc.rect(target.bowl3.getPosition().x - bowl3.width/2 ,target.bowl3.getPosition().y - bowl3.height/2, bowl3.width, bowl3.height);
                 if (cc.rectContainsPoint(rectBowl3, locationInNode)) { var bowl3 = cc.MoveTo.create(2,cc.p(target.bowl3.xP,target.bowl3.yP));
        target.bowl3.runAction(bowl3);this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.failure_mp3);
return true;}
                
                 
                 var bowl4 = target.bowl4.getContentSize();
                 var rectBowl4 = cc.rect(target.bowl4.getPosition().x - bowl4.width/2 ,target.bowl4.getPosition().y - bowl4.height/2, bowl4.width, bowl4.height);
                 if (cc.rectContainsPoint(rectBowl4, locationInNode)) { var bowl4 = cc.MoveTo.create(2,cc.p(target.bowl4.xP,target.bowl4.yP));
        target.bowl4.runAction(bowl4);this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.failure_mp3);
return true;}
                

                 
                 var bowl5 = target.bowl5.getContentSize();
                 var rectBowl5 = cc.rect(target.bowl5.getPosition().x - bowl5.width/2 ,target.bowl5.getPosition().y - bowl5.height/2, bowl5.width, bowl5.height);
                 if (cc.rectContainsPoint(rectBowl5, locationInNode)) { var bowl5 = cc.MoveTo.create(2,cc.p(target.bowl5.xP,target.bowl5.yP));
        target.bowl5.runAction(bowl5);this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.failure_mp3);
return true;}
                

                 
        
    }

    }
    
    ,this);


        var size = cc.winSize;

         this.bg = new cc.Sprite.create(res.bg4_png);
         this.bg.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY );
         this.bg.setPosition(size.width / 2, size.height / 2); 
         this.addChild(this.bg);

         this.character = new cc.Sprite.create(res.character4_png);
         this.character.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.character.setPosition(size.width*0.87 , size.height*0.60);
         this.character.setScale(0.8, 0.8); 
         this.addChild(this.character);

         this.bowl1 = new cc.Sprite.create(res.bowl1_png);
         this.bowl1.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.bowl1.setPosition(size.width*0.85 , size.height*0.15);
         this.bowl1.xP = this.bowl1.getPosition().x;
         this.bowl1.yP = this.bowl1.getPosition().y;
         this.bowl1.setScale(level4SpriteScaleX, level4SpriteScaleY);
         this.addChild(this.bowl1);
         cc.eventManager.addListener(eventListener, this.bowl1);

         
         this.bowl2 = new cc.Sprite.create(res.bowl2_png);
         this.bowl2.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.bowl2.setPosition(size.width*0.19 , size.height*0.14);
         this.bowl2.xP = this.bowl2.getPosition().x;
         this.bowl2.yP = this.bowl2.getPosition().y;
         this.bowl2.setScale(level4SpriteScaleX, level4SpriteScaleY);
         this.addChild(this.bowl2);
         cc.eventManager.addListener(eventListener, this.bowl2);


         
         this.bowl3 = new cc.Sprite.create(res.bowl3_png);
         this.bowl3.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.bowl3.setPosition(size.width*0.46 , size.height*0.10);
         this.bowl3.xP = this.bowl3.getPosition().x;
         this.bowl3.yP = this.bowl3.getPosition().y;
         this.bowl3.setScale(level4SpriteScaleX, level4SpriteScaleY);
         this.addChild(this.bowl3);
         cc.eventManager.addListener(eventListener, this.bowl3);

         
         this.bowl4 = new cc.Sprite.create(res.bowl4_png);
         this.bowl4.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.bowl4.setPosition(size.width*0.62 , size.height*0.10);
         this.bowl4.xP = this.bowl4.getPosition().x;
         this.bowl4.yP = this.bowl4.getPosition().y;
         this.bowl4.setScale(level4SpriteScaleX, level4SpriteScaleY);
         this.addChild(this.bowl4);
         cc.eventManager.addListener(eventListener, this.bowl4);


         this.bowl5 = new cc.Sprite.create(res.bowl5_png);
         this.bowl5.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.bowl5.setPosition(size.width*0.07 , size.height*0.12);
         this.bowl5.xP = this.bowl5.getPosition().x;
         this.bowl5.yP = this.bowl5.getPosition().y;
         this.bowl5.setScale(level4SpriteScaleX, level4SpriteScaleY);
         this.addChild(this.bowl5);
         cc.eventManager.addListener(eventListener, this.bowl5);






         ///////////////////////////for transparent

         this.bowl1t = new cc.Sprite.create(res.bowl1t_png);
         this.bowl1t.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY );
         this.bowl1t.setPosition(size.width*0.29 , size.height*0.33);
         this.bowl1t.setScale(level4SpriteScaleX, level4SpriteScaleY); 
         this.addChild(this.bowl1t);
         

         
         this.bowl2t = new cc.Sprite.create(res.bowl2t_png);
         this.bowl2t.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY );
         this.bowl2t.setPosition(size.width*0.48 , size.height*0.32);
         this.bowl2t.setScale(level4SpriteScaleX, level4SpriteScaleY); 
         this.addChild(this.bowl2t);
         

          
         this.bowl3t = new cc.Sprite.create(res.bowl3t_png);
         this.bowl3t.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY );
         this.bowl3t.setPosition(size.width*0.65 , size.height*0.32);
         this.bowl3t.setScale(level4SpriteScaleX, level4SpriteScaleY); 
         this.addChild(this.bowl3t);
         

          
         this.bowl4t = new cc.Sprite.create(res.bowl4t_png);
         this.bowl4t.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY );
         this.bowl4t.setPosition(size.width*0.80 , size.height*0.32);
         this.bowl4t.setScale(level4SpriteScaleX, level4SpriteScaleY); 
         this.addChild(this.bowl4t);
         
         
         
         this.bowl5t = new cc.Sprite.create(res.bowl5t_png);
         this.bowl5t.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY );
         this.bowl5t.setPosition(size.width*0.91 , size.height*0.32);
         this.bowl5t.setScale(level4SpriteScaleX, level4SpriteScaleY); 
         this.addChild(this.bowl5t);
         




        return true;
    }


});

var level4Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new level4Layer();
        this.addChild(layer);
    }
});

