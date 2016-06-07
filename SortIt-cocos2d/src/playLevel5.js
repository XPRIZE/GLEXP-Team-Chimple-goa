
    //We create our only state
    var counterLevel5 = 1;


    var level5SpriteScaleX = 0.9; 
    var level5SpriteScaleY = 0.9;

   

/// <reference path="../../cocos2d-typescript-definitions/cocos2d/cocos2d-lib.d.ts" />
var level5Layer = cc.Layer.extend({
    
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
                 
                 var num1 = target.num1.getContentSize();
                 var rectNum1 = cc.rect(target.num1.getPosition().x - num1.width/2 ,target.num1.getPosition().y - num1.height/2, num1.width, num1.height);
                 if (cc.rectContainsPoint(rectNum1, locationInNode)) {return true;}
                
                
                 var num2 = target.num2.getContentSize();
                 var rectNum2 = cc.rect(target.num2.getPosition().x - num2.width/2 ,target.num2.getPosition().y - num2.height/2, num2.width, num2.height);
                 if (cc.rectContainsPoint(rectNum2, locationInNode)) {return true;}
                

                 var num3 = target.num3.getContentSize();
                 var rectNum3 = cc.rect(target.num3.getPosition().x - num3.width/2 ,target.num3.getPosition().y - num3.height/2, num3.width, num3.height);
                 if (cc.rectContainsPoint(rectNum3, locationInNode)) {return true;}
                

                 var num4 = target.num4.getContentSize();
                 var rectNum4 = cc.rect(target.num4.getPosition().x - num4.width/2 ,target.num4.getPosition().y - num4.height/2, num4.width, num4.height);
                 if (cc.rectContainsPoint(rectNum4, locationInNode)) {return true;}
                

                 var num5 = target.num5.getContentSize();
                 var rectNum5 = cc.rect(target.num5.getPosition().x - num5.width/2 ,target.num5.getPosition().y - num5.height/2, num5.width, num5.height);
                 if (cc.rectContainsPoint(rectNum5, locationInNode)) {return true;}
                
                
                 return false;
       
    },

    onTouchMoved: function(touch, event){

    
         var target = event.getCurrentTarget();
         
         var locationInNode = target.convertToNodeSpace(touch.getLocation());
                 
    

        var num1Rect = target.num1.getBoundingBox();
        var num1tRect = target.num1t.getBoundingBox();
        if(cc.rectIntersectsRect(num1Rect, num1tRect) && counterLevel5 == 1){
            console.log("toy1 collided");
            var x = target.num1t.getPosition().x;
            var y = target.num1t.getPosition().y;
            target.num1.setPosition(x, y);

            this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.comedyBubble_mp3);



            
            target.removeChild(target.num1);

            //cc.eventManager.removeListener(eventListener, target.toy1);
            
         this.num1 = new cc.Sprite.create(res.num1_png);
         this.num1.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.num1.setPosition(x , y);
         target.addChild(this.num1);

            counterLevel5++;
        }



       var num2Rect = target.num2.getBoundingBox();
        var num2tRect = target.num2t.getBoundingBox();
        if(cc.rectIntersectsRect(num2Rect, num2tRect) && counterLevel5 == 2){
            console.log("toy1 collided");
            var x = target.num2t.getPosition().x;
            var y = target.num2t.getPosition().y;
            target.num2.setPosition(x, y);

            this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.comedyBubble_mp3);



            
            target.removeChild(target.num2);

            //cc.eventManager.removeListener(eventListener, target.toy1);
            
         this.num2 = new cc.Sprite.create(res.num2_png);
         this.num2.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.num2.setPosition(x , y);
         target.addChild(this.num2);

            counterLevel5++;
        }
        

        var num3Rect = target.num3.getBoundingBox();
        var num3tRect = target.num3t.getBoundingBox();
        if(cc.rectIntersectsRect(num3Rect, num3tRect) && counterLevel5 == 3){
            console.log("toy1 collided");
            var x = target.num3t.getPosition().x;
            var y = target.num3t.getPosition().y;
            target.num3.setPosition(x, y);

            this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.comedyBubble_mp3);



            
            target.removeChild(target.num3);

            //cc.eventManager.removeListener(eventListener, target.toy1);
            
         this.num3 = new cc.Sprite.create(res.num3_png);
         this.num3.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.num3.setPosition(x , y);
         target.addChild(this.num3);

            counterLevel5++;
        }

        var num4Rect = target.num4.getBoundingBox();
        var num4tRect = target.num4t.getBoundingBox();
        if(cc.rectIntersectsRect(num4Rect, num4tRect) && counterLevel5 == 4){
            console.log("toy1 collided");
            var x = target.num4t.getPosition().x;
            var y = target.num4t.getPosition().y;
            target.num4.setPosition(x, y);

            this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.comedyBubble_mp3);



            
            target.removeChild(target.num4);

            //cc.eventManager.removeListener(eventListener, target.toy1);
            
         this.num4 = new cc.Sprite.create(res.num4_png);
         this.num4.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.num4.setPosition(x , y);
         target.addChild(this.num4);

            counterLevel5++;
        }

        var num5Rect = target.num5.getBoundingBox();
        var num5tRect = target.num5t.getBoundingBox();
        if(cc.rectIntersectsRect(num5Rect, num5tRect) && counterLevel5 == 5){
            console.log("toy1 collided");
            var x = target.num5t.getPosition().x;
            var y = target.num5t.getPosition().y;
            target.num5.setPosition(x, y);

            this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.comedyBubble_mp3);



            
            target.removeChild(target.num5);

            //cc.eventManager.removeListener(eventListener, target.toy1);
            
         this.num5 = new cc.Sprite.create(res.num5_png);
         this.num5.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.num5.setPosition(x , y);
         target.addChild(this.num5);

         cc.director.runScene(new level6Scene());

            counterLevel5++;
        } 



                 var num1 = target.num1.getContentSize();
                 var rectNum1 = cc.rect(target.num1.getPosition().x - num1.width/2 ,target.num1.getPosition().y - num1.height/2, num1.width, num1.height);
                 if (cc.rectContainsPoint(rectNum1, locationInNode)) {target.num1.setPosition(touch.getLocation());return true;}
                
                
                 var num2 = target.num2.getContentSize();
                 var rectNum2 = cc.rect(target.num2.getPosition().x - num2.width/2 ,target.num2.getPosition().y - num2.height/2, num2.width, num2.height);
                 if (cc.rectContainsPoint(rectNum2, locationInNode)) {target.num2.setPosition(touch.getLocation());return true;}
                

                 var num3 = target.num3.getContentSize();
                 var rectNum3 = cc.rect(target.num3.getPosition().x - num3.width/2 ,target.num3.getPosition().y - num3.height/2, num3.width, num3.height);
                 if (cc.rectContainsPoint(rectNum3, locationInNode)) {target.num3.setPosition(touch.getLocation());return true;}
                

                 var num4 = target.num4.getContentSize();
                 var rectNum4 = cc.rect(target.num4.getPosition().x - num4.width/2 ,target.num4.getPosition().y - num4.height/2, num4.width, num4.height);
                 if (cc.rectContainsPoint(rectNum4, locationInNode)) {target.num4.setPosition(touch.getLocation());return true;}
                

                 var num5 = target.num5.getContentSize();
                 var rectNum5 = cc.rect(target.num5.getPosition().x - num5.width/2 ,target.num5.getPosition().y - num5.height/2, num5.width, num5.height);
                 if (cc.rectContainsPoint(rectNum5, locationInNode)) {target.num5.setPosition(touch.getLocation());return true;}
                
    },


    onTouchEnded: function(touch, event){

        
        
          var target = event.getCurrentTarget();
         
         var locationInNode = target.convertToNodeSpace(touch.getLocation());
                 
         
                 var num1 = target.num1.getContentSize();
                 var rectNum1 = cc.rect(target.num1.getPosition().x - num1.width/2 ,target.num1.getPosition().y - num1.height/2, num1.width, num1.height);
                 if (cc.rectContainsPoint(rectNum1, locationInNode)) { var num1 = cc.MoveTo.create(2,cc.p(target.num1.xP,target.num1.yP));
        target.num1.runAction(num1);this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.failure_mp3);
return true;}
                
                 
                 
                 var num2 = target.num2.getContentSize();
                 var rectNum2 = cc.rect(target.num2.getPosition().x - num2.width/2 ,target.num2.getPosition().y - num2.height/2, num2.width, num2.height);
                 if (cc.rectContainsPoint(rectNum2, locationInNode)) { var num2 = cc.MoveTo.create(2,cc.p(target.num2.xP,target.num2.yP));
        target.num2.runAction(num2);this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.failure_mp3);
return true;}
                
                 
                 
                 var num3 = target.num3.getContentSize();
                 var rectNum3 = cc.rect(target.num3.getPosition().x - num3.width/2 ,target.num3.getPosition().y - num3.height/2, num3.width, num3.height);
                 if (cc.rectContainsPoint(rectNum3, locationInNode)) { var num3 = cc.MoveTo.create(2,cc.p(target.num3.xP,target.num3.yP));
        target.num3.runAction(num3);this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.failure_mp3);
return true;}
                
                 
                 
                 var num4 = target.num4.getContentSize();
                 var rectNum4 = cc.rect(target.num4.getPosition().x - num4.width/2 ,target.num4.getPosition().y - num4.height/2, num4.width, num4.height);
                 if (cc.rectContainsPoint(rectNum4, locationInNode)) { var num4 = cc.MoveTo.create(2,cc.p(target.num4.xP,target.num4.yP));
        target.num4.runAction(num4);this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.failure_mp3);
return true;}
                

                 
                 
                 var num5 = target.num5.getContentSize();
                 var rectNum5 = cc.rect(target.num5.getPosition().x - num5.width/2 ,target.num5.getPosition().y - num5.height/2, num5.width, num5.height);
                 if (cc.rectContainsPoint(rectNum5, locationInNode)) { var num5 = cc.MoveTo.create(2,cc.p(target.num5.xP,target.num5.yP));
        target.num5.runAction(num5);this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.failure_mp3);
return true;}
                

                 
        
    }

    }
    
    ,this);


        var size = cc.winSize;

         this.bg = new cc.Sprite.create(res.bg5_png);
         this.bg.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY );
         this.bg.setPosition(size.width / 2, size.height / 2); 
         this.addChild(this.bg);

         this.character = new cc.Sprite.create(res.character5_png);
         this.character.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.character.setPosition(size.width*0.78 , size.height*0.46);
         this.character.setScale(0.8, 0.8); 
         this.addChild(this.character);

         this.num1 = new cc.Sprite.create(res.num1_png);
         this.num1.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.num1.setPosition(size.width*0.23 , size.height*0.23);
         this.num1.xP = this.num1.getPosition().x;
         this.num1.yP = this.num1.getPosition().y;
         this.num1.setScale(level5SpriteScaleX, level5SpriteScaleY);
         this.addChild(this.num1);
         cc.eventManager.addListener(eventListener, this.num1);

         this.num2 = new cc.Sprite.create(res.num2_png);
         this.num2.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.num2.setPosition(size.width*0.54 , size.height*0.23);
         this.num2.xP = this.num2.getPosition().x;
         this.num2.yP = this.num2.getPosition().y;
         this.num2.setScale(level5SpriteScaleX, level5SpriteScaleY);
         this.addChild(this.num2);
         cc.eventManager.addListener(eventListener, this.num2);

         this.num3 = new cc.Sprite.create(res.num3_png);
         this.num3.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.num3.setPosition(size.width*0.07 , size.height*0.23);
         this.num3.xP = this.num3.getPosition().x;
         this.num3.yP = this.num3.getPosition().y;
         this.num3.setScale(level5SpriteScaleX, level5SpriteScaleY);
         this.addChild(this.num3);
         cc.eventManager.addListener(eventListener, this.num3);

         this.num4 = new cc.Sprite.create(res.num4_png);
         this.num4.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.num4.setPosition(size.width*0.70 , size.height*0.23);
         this.num4.xP = this.num4.getPosition().x;
         this.num4.yP = this.num4.getPosition().y;
         this.num4.setScale(level5SpriteScaleX, level5SpriteScaleY);
         this.addChild(this.num4);
         cc.eventManager.addListener(eventListener, this.num4);

         this.num5 = new cc.Sprite.create(res.num5_png);
         this.num5.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.num5.setPosition(size.width*0.42 , size.height*0.13);
         this.num5.xP = this.num5.getPosition().x;
         this.num5.yP = this.num5.getPosition().y;
         this.num5.setScale(level5SpriteScaleX, level5SpriteScaleY);
         this.addChild(this.num5);
         cc.eventManager.addListener(eventListener, this.num5);






         ///////////////////////////for transparent
         
         this.num1t = new cc.Sprite.create(res.num1t_png);
         this.num1t.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY );
         this.num1t.setPosition(size.width*0.39 , size.height*0.24);
         this.num1t.setScale(level5SpriteScaleX, level5SpriteScaleY); 
         this.addChild(this.num1t);
         

         this.num2t = new cc.Sprite.create(res.num2t_png);
         this.num2t.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY );
         this.num2t.setPosition(size.width*0.39 , size.height*0.36);
         this.num2t.setScale(level5SpriteScaleX, level5SpriteScaleY); 
         this.addChild(this.num2t);
        


         this.num3t = new cc.Sprite.create(res.num3t_png);
         this.num3t.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY );
         this.num3t.setPosition(size.width*0.39 , size.height*0.47);
         this.num3t.setScale(level5SpriteScaleX, level5SpriteScaleY); 
         this.addChild(this.num3t);
         
         

         this.num4t = new cc.Sprite.create(res.num4t_png);
         this.num4t.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY );
         this.num4t.setPosition(size.width*0.39 , size.height*0.57);
         this.num4t.setScale(level5SpriteScaleX, level5SpriteScaleY); 
         this.addChild(this.num4t);
         
         
         this.num5t = new cc.Sprite.create(res.num5t_png);
         this.num5t.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY );
         this.num5t.setPosition(size.width*0.39 , size.height*0.68);
         this.num5t.setScale(level5SpriteScaleX, level5SpriteScaleY); 
         this.addChild(this.num5t);
         


        return true;
    }


});

var level5Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new level5Layer();
        this.addChild(layer);
    }
});

