
    //We create our only state
    var counterLevel2 = 1;
    var level2SpriteScaleX = 0.23; 
    var level2SpriteScaleY = 0.23;
    
     


/// <reference path="../../cocos2d-typescript-definitions/cocos2d/cocos2d-lib.d.ts" />
var level2Layer = cc.Layer.extend({
    
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
                 
                 var cake1 = target.cake1.getContentSize();
                 var rectCake1 = cc.rect(target.cake1.getPosition().x - cake1.width/2 ,target.cake1.getPosition().y - cake1.height/2, cake1.width, cake1.height);
                 if (cc.rectContainsPoint(rectCake1, locationInNode)) {console.log("inside cake1");return true;}
                
                var cake2 = target.cake2.getContentSize();
                 var rectCake2 = cc.rect(target.cake2.getPosition().x - cake2.width/2 ,target.cake2.getPosition().y - cake2.height/2, cake2.width, cake2.height);
                 if (cc.rectContainsPoint(rectCake2, locationInNode)) {console.log("inside cake2");return true;}
                
                var cake3 = target.cake3.getContentSize();
                 var rectCake3 = cc.rect(target.cake3.getPosition().x - cake3.width/2 ,target.cake3.getPosition().y - cake3.height/2, cake3.width, cake3.height);
                 if (cc.rectContainsPoint(rectCake3, locationInNode)) {console.log("inside cake3");return true;}
                
                var cake4 = target.cake4.getContentSize();
                 var rectCake4 = cc.rect(target.cake4.getPosition().x - cake4.width/2 ,target.cake4.getPosition().y - cake4.height/2, cake4.width, cake4.height);
                 if (cc.rectContainsPoint(rectCake4, locationInNode)) {console.log("inside cake4");return true;}
                
                var cake5 = target.cake5.getContentSize();
                 var rectCake5 = cc.rect(target.cake5.getPosition().x - cake5.width/2 ,target.cake5.getPosition().y - cake5.height/2, cake5.width, cake5.height);
                 if (cc.rectContainsPoint(rectCake5, locationInNode)) {console.log("inside cake5");return true;}
                 
               
                 
                
                 return false;
       
    },

    onTouchMoved: function(touch, event){

    
         var target = event.getCurrentTarget();
         
         var locationInNode = target.convertToNodeSpace(touch.getLocation());
                 
    

        var cake1Rect = target.cake1.getBoundingBox();
        var cake1tRect = target.cake1t.getBoundingBox();
        if(cc.rectIntersectsRect(cake1Rect, cake1tRect) && counterLevel2 == 1){
            
            var x = target.cake1t.getPosition().x;
            var y = target.cake1t.getPosition().y;
            target.cake1.setPosition(x, y);

            this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.comedyBubble_mp3);



            
            target.removeChild(target.cake1);

            
         this.cake1 = new cc.Sprite.create(res.cake1_png);
         this.cake1.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.cake1.setPosition(x , y);
         this.cake1.setScale(level2SpriteScaleX, level2SpriteScaleY);
         target.addChild(this.cake1);

            counterLevel2++;
        }



        var cake2Rect = target.cake2.getBoundingBox();
        var cake2tRect = target.cake2t.getBoundingBox();
        if(cc.rectIntersectsRect(cake2Rect, cake2tRect) && counterLevel2 == 2){
            
            var x = target.cake2t.getPosition().x;
            var y = target.cake2t.getPosition().y;
            target.cake2.setPosition(x, y);

            this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.comedyBubble_mp3);



            
            target.removeChild(target.cake2);

            
         this.cake2 = new cc.Sprite.create(res.cake2_png);
         this.cake2.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.cake2.setPosition(x , y);
         this.cake2.setScale(level2SpriteScaleX, level2SpriteScaleY);
         target.addChild(this.cake2);

            counterLevel2++;
        }


        var cake3Rect = target.cake3.getBoundingBox();
        var cake3tRect = target.cake3t.getBoundingBox();
        if(cc.rectIntersectsRect(cake3Rect, cake3tRect) && counterLevel2 == 3){
            
            var x = target.cake3t.getPosition().x;
            var y = target.cake3t.getPosition().y;
            target.cake3.setPosition(x, y);

            this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.comedyBubble_mp3);



            
            target.removeChild(target.cake3);

            
         this.cake3 = new cc.Sprite.create(res.cake3_png);
         this.cake3.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.cake3.setPosition(x , y);
         this.cake3.setScale(level2SpriteScaleX, level2SpriteScaleY);
         target.addChild(this.cake3);

            counterLevel2++;
        }


        var cake4Rect = target.cake4.getBoundingBox();
        var cake4tRect = target.cake4t.getBoundingBox();
        if(cc.rectIntersectsRect(cake4Rect, cake4tRect) && counterLevel2 == 4){
            
            var x = target.cake4t.getPosition().x;
            var y = target.cake4t.getPosition().y;
            target.cake4.setPosition(x, y);

            this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.comedyBubble_mp3);



            
            target.removeChild(target.cake4);

            
         this.cake4 = new cc.Sprite.create(res.cake4_png);
         this.cake4.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.cake4.setPosition(x , y);
         this.cake4.setScale(level2SpriteScaleX, level2SpriteScaleY);
         target.addChild(this.cake4);

            counterLevel2++;
        }
        

        var cake5Rect = target.cake5.getBoundingBox();
        var cake5tRect = target.cake5t.getBoundingBox();
        if(cc.rectIntersectsRect(cake5Rect, cake5tRect) && counterLevel2 == 5){
            
            var x = target.cake5t.getPosition().x;
            var y = target.cake5t.getPosition().y;
            target.cake5.setPosition(x, y);

            this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.comedyBubble_mp3);



            
            target.removeChild(target.cake5);

            
         this.cake5 = new cc.Sprite.create(res.cake5_png);
         this.cake5.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.cake5.setPosition(x , y);
         this.cake5.setScale(level2SpriteScaleX, level2SpriteScaleY);
         target.addChild(this.cake5);



                    cc.director.runScene(new level3Layer());
           
                 
           
            counterLevel2++;
        }


        
        
               var cake1 = target.cake1.getContentSize();
                 var rectCake1 = cc.rect(target.cake1.getPosition().x - cake1.width/2 ,target.cake1.getPosition().y - cake1.height/2, cake1.width, cake1.height);
                 if (cc.rectContainsPoint(rectCake1, locationInNode)) {target.cake1.setPosition(touch.getLocation());return true;}
                
                var cake2 = target.cake2.getContentSize();
                 var rectCake2 = cc.rect(target.cake2.getPosition().x - cake2.width/2 ,target.cake2.getPosition().y - cake2.height/2, cake2.width, cake2.height);
                 if (cc.rectContainsPoint(rectCake2, locationInNode)) {target.cake2.setPosition(touch.getLocation());return true;}
                
                var cake3 = target.cake3.getContentSize();
                 var rectCake3 = cc.rect(target.cake3.getPosition().x - cake3.width/2 ,target.cake3.getPosition().y - cake3.height/2, cake3.width, cake3.height);
                 if (cc.rectContainsPoint(rectCake3, locationInNode)) {target.cake3.setPosition(touch.getLocation());return true;}
                
                var cake4 = target.cake4.getContentSize();
                 var rectCake4 = cc.rect(target.cake4.getPosition().x - cake4.width/2 ,target.cake4.getPosition().y - cake4.height/2, cake4.width, cake4.height);
                 if (cc.rectContainsPoint(rectCake4, locationInNode)) {target.cake4.setPosition(touch.getLocation());return true;}
                
                var cake5 = target.cake5.getContentSize();
                 var rectCake5 = cc.rect(target.cake5.getPosition().x - cake5.width/2 ,target.cake5.getPosition().y - cake5.height/2, cake5.width, cake5.height);
                 if (cc.rectContainsPoint(rectCake5, locationInNode)) {target.cake5.setPosition(touch.getLocation());return true;}
                 



    },


    onTouchEnded: function(touch, event){

        
        
          var target = event.getCurrentTarget();
         
         var locationInNode = target.convertToNodeSpace(touch.getLocation());
                 
         
                 var cake1 = target.cake1.getContentSize();
                 var rectCake1 = cc.rect(target.cake1.getPosition().x - cake1.width/2 ,target.cake1.getPosition().y - cake1.height/2, cake1.width, cake1.height);
                 if (cc.rectContainsPoint(rectCake1, locationInNode)) { var cake1 = cc.MoveTo.create(2,cc.p(target.cake1.xP,target.cake1.yP));
        target.cake1.runAction(cake1);this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.failure_mp3);
return true;}
                
              
var cake2 = target.cake2.getContentSize();
                 var rectCake2 = cc.rect(target.cake2.getPosition().x - cake2.width/2 ,target.cake2.getPosition().y - cake2.height/2, cake2.width, cake2.height);
                 if (cc.rectContainsPoint(rectCake2, locationInNode)) { var cake2 = cc.MoveTo.create(2,cc.p(target.cake2.xP,target.cake2.yP));
        target.cake2.runAction(cake2);this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.failure_mp3);
return true;}

var cake3 = target.cake3.getContentSize();
                 var rectCake3 = cc.rect(target.cake3.getPosition().x - cake3.width/2 ,target.cake3.getPosition().y - cake3.height/2, cake3.width, cake3.height);
                 if (cc.rectContainsPoint(rectCake3, locationInNode)) { var cake3 = cc.MoveTo.create(2,cc.p(target.cake3.xP,target.cake3.yP));
        target.cake3.runAction(cake3);this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.failure_mp3);
return true;}

var cake4 = target.cake4.getContentSize();
                 var rectCake4 = cc.rect(target.cake4.getPosition().x - cake4.width/2 ,target.cake4.getPosition().y - cake4.height/2, cake4.width, cake4.height);
                 if (cc.rectContainsPoint(rectCake4, locationInNode)) { var cake4 = cc.MoveTo.create(2,cc.p(target.cake4.xP,target.cake1.yP));
        target.cake4.runAction(cake4);this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.failure_mp3);
return true;}


   var cake5 = target.cake5.getContentSize();
                 var rectCake5 = cc.rect(target.cake5.getPosition().x - cake5.width/2 ,target.cake5.getPosition().y - cake5.height/2, cake5.width, cake5.height);
                 if (cc.rectContainsPoint(rectCake5, locationInNode)) { var cake5 = cc.MoveTo.create(2,cc.p(target.cake5.xP,target.cake5.yP));
        target.cake5.runAction(cake5);this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.failure_mp3);
return true;}


        
    }

    }
    
    ,this);


        var size = cc.winSize;

        /////////////////////////////////////////

         this.bg = new cc.Sprite.create(res.bg2_png);
         this.bg.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY );
         this.bg.setPosition(size.width / 2, size.height / 2); 
         this.addChild(this.bg);

         this.character = new cc.Sprite.create(res.character2_png);
         this.character.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.character.setPosition(size.width*0.78 , size.height*0.46); 
         this.character.setScale(level2SpriteScaleX, level2SpriteScaleY);
         this.addChild(this.character);

         this.table = new cc.Sprite.create(res.table_png);
         this.table.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.table.setPosition(size.width*0.52 , size.height*0.17); 
         this.table.setScale(level2SpriteScaleX, level2SpriteScaleY);
         this.addChild(this.table);
           
         this.minClock = new cc.Sprite.create(res.minClock_png);
         this.minClock.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.minClock.setPosition(size.width*0.575 , size.height*0.79); 
         this.minClock.setScale(2, 2);
         this.addChild(this.minClock);
         


         this.hourClock = new cc.Sprite.create(res.hourClock_png);
         this.hourClock.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.hourClock.setPosition(size.width*0.575 , size.height*0.79); 
         this.hourClock.setScale(2, 2);
         this.addChild(this.hourClock);



         this.cake1 = new cc.Sprite.create(res.cake1_png);
         this.cake1.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.cake1.setPosition(size.width*0.70 , size.height*0.10); 
         this.cake1.setScale(level2SpriteScaleX, level2SpriteScaleY);
         this.cake1.xP = this.cake1.getPosition().x;
         this.cake1.yP = this.cake1.getPosition().y;
         this.addChild(this.cake1);
         cc.eventManager.addListener(eventListener, this.cake1);


         this.cake2 = new cc.Sprite.create(res.cake2_png);
         this.cake2.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.cake2.setPosition(size.width*0.07 , size.height*0.23); 
         this.cake2.setScale(level2SpriteScaleX, level2SpriteScaleY);
         this.cake2.xP = this.cake2.getPosition().x;
         this.cake2.yP = this.cake2.getPosition().y;
         this.addChild(this.cake2);
         cc.eventManager.addListener(eventListener, this.cake2);

         
         this.cake3 = new cc.Sprite.create(res.cake3_png);
         this.cake3.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.cake3.setPosition(size.width*0.74 , size.height*0.25); 
         this.cake3.setScale(level2SpriteScaleX, level2SpriteScaleY);
         this.cake3.xP = this.cake3.getPosition().x;
         this.cake3.yP = this.cake3.getPosition().y;
         this.addChild(this.cake3);
         cc.eventManager.addListener(eventListener, this.cake3);


         this.cake4 = new cc.Sprite.create(res.cake4_png);
         this.cake4.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.cake4.setPosition(size.width*0.11 , size.height*0.07); 
         this.cake4.setScale(level2SpriteScaleX, level2SpriteScaleY);
         this.cake4.xP = this.cake4.getPosition().x;
         this.cake4.yP = this.cake4.getPosition().y;
         this.addChild(this.cake4);
         cc.eventManager.addListener(eventListener, this.cake4);

         this.cake5 = new cc.Sprite.create(res.cake5_png);
         this.cake5.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.cake5.setPosition(size.width*0.93 , size.height*0.32); 
         this.cake5.setScale(level2SpriteScaleX, level2SpriteScaleY);
         this.cake5.xP = this.cake5.getPosition().x;
         this.cake5.yP = this.cake5.getPosition().y;
         this.addChild(this.cake5);
         cc.eventManager.addListener(eventListener, this.cake5);



            //for transparent

         this.stand = new cc.Sprite.create(res.stand_png);
         this.stand.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.stand.setPosition(size.width*0.45 , size.height*0.12); 
         this.stand.setScale(level2SpriteScaleX, level2SpriteScaleY);
         this.addChild(this.stand);

         this.cake1t = new cc.Sprite.create(res.cake1t_png);
         this.cake1t.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.cake1t.setPosition(size.width*0.45 , size.height*0.20); 
         this.cake1t.setScale(level2SpriteScaleX, level2SpriteScaleY);
         this.addChild(this.cake1t);

         this.cake2t = new cc.Sprite.create(res.cake2t_png);
         this.cake2t.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.cake2t.setPosition(size.width*0.45 , size.height*0.28); 
         this.cake2t.setScale(level2SpriteScaleX, level2SpriteScaleY);
         this.addChild(this.cake2t);

         this.cake3t = new cc.Sprite.create(res.cake3t_png);
         this.cake3t.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.cake3t.setPosition(size.width*0.45 , size.height*0.35); 
         this.cake3t.setScale(level2SpriteScaleX, level2SpriteScaleY);
         this.addChild(this.cake3t);

         this.cake4t = new cc.Sprite.create(res.cake4t_png);
         this.cake4t.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.cake4t.setPosition(size.width*0.45 , size.height*0.41); 
         this.cake4t.setScale(level2SpriteScaleX, level2SpriteScaleY);
         this.addChild(this.cake4t);


         this.cake5t = new cc.Sprite.create(res.cake5t_png);
         this.cake5t.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.cake5t.setPosition(size.width*0.45 , size.height*0.50); 
         this.cake5t.setScale(level2SpriteScaleX, level2SpriteScaleY);
         this.addChild(this.cake5t);
   

        return true;
    }


});

var level2Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new level2Layer();
        this.addChild(layer);
    }
});


