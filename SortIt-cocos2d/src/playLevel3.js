
    //We create our only state
    var counterLevel3 = 1;

    var level3SpriteScaleX = 0.9; 
    var level3SpriteScaleY = 0.9;
    
    
    var spriteAnchorX = 0.5;
    var spriteAnchorY = 0.5;



/// <reference path="../../cocos2d-typescript-definitions/cocos2d/cocos2d-lib.d.ts" />
var level3Layer = cc.Layer.extend({
    
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
                 
                 var string1 = target.string1.getContentSize();
                 var rectString1 = cc.rect(target.string1.getPosition().x - string1.width/2 ,target.string1.getPosition().y - string1.height/2, string1.width, string1.height);
                 if (cc.rectContainsPoint(rectString1, locationInNode)) {return true;}
                
                 var string2 = target.string2.getContentSize();
                 var rectString2 = cc.rect(target.string2.getPosition().x - string2.width/2 ,target.string2.getPosition().y - string2.height/2, string2.width, string2.height);
                 if (cc.rectContainsPoint(rectString2, locationInNode)) {return true;}
                
                 var string3 = target.string3.getContentSize();
                 var rectString3 = cc.rect(target.string3.getPosition().x - string3.width/2 ,target.string3.getPosition().y - string3.height/2, string3.width, string3.height);
                 if (cc.rectContainsPoint(rectString3, locationInNode)) {return true;}
                
                 var string4 = target.string4.getContentSize();
                 var rectString4 = cc.rect(target.string4.getPosition().x - string4.width/2 ,target.string4.getPosition().y - string4.height/2, string4.width, string4.height);
                 if (cc.rectContainsPoint(rectString4, locationInNode)) {return true;}
                

                 var string5 = target.string5.getContentSize();
                 var rectString5 = cc.rect(target.string5.getPosition().x - string5.width/2 ,target.string5.getPosition().y - string5.height/2, string5.width, string5.height);
                 if (cc.rectContainsPoint(rectString5, locationInNode)) {return true;}
                

                 var string6 = target.string6.getContentSize();
                 var rectString6 = cc.rect(target.string6.getPosition().x - string6.width/2 ,target.string6.getPosition().y - string6.height/2, string6.width, string6.height);
                 if (cc.rectContainsPoint(rectString6, locationInNode)) {return true;}
                  
                 if(counterLevel3== 6){

                    cc.director.runScene(new level4Scene());
           
                 }
                
                 return false;
       
    },

    onTouchMoved: function(touch, event){

    
         var target = event.getCurrentTarget();
         
         var locationInNode = target.convertToNodeSpace(touch.getLocation());
                 
    

        var string1Rect = target.string1.getBoundingBox();
        var string1tRect = target.string1t.getBoundingBox();
        if(cc.rectIntersectsRect(string1Rect, string1tRect) && counterLevel3 == 1){
            console.log("toy1 collided");
            var x = target.string1t.getPosition().x;
            var y = target.string1t.getPosition().y;
            target.string1.setPosition(x, y);

            this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.comedyBubble_mp3);



            
            target.removeChild(target.string1);

            //cc.eventManager.removeListener(eventListener, target.toy1);
            
         this.string1 = new cc.Sprite.create(res.string1_png);
         this.string1.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.string1.setPosition(x , y);
         target.addChild(this.string1);

            counterLevel3++;
        }



        var string2Rect = target.string2.getBoundingBox();
        var string2tRect = target.string2t.getBoundingBox();
        if(cc.rectIntersectsRect(string2Rect, string2tRect) && counterLevel3 == 2){
            console.log("toy1 collided");
            var x = target.string2t.getPosition().x;
            var y = target.string2t.getPosition().y;
            target.string2.setPosition(x, y);

            this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.comedyBubble_mp3);



            
            target.removeChild(target.string2);

            //cc.eventManager.removeListener(eventListener, target.toy1);
            
         this.string2 = new cc.Sprite.create(res.string2_png);
         this.string2.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.string2.setPosition(x , y);
         target.addChild(this.string2);

            counterLevel3++;
        }
        

        var string3Rect = target.string3.getBoundingBox();
        var string3tRect = target.string3t.getBoundingBox();
        if(cc.rectIntersectsRect(string3Rect, string3tRect) && counterLevel3 == 3){
            console.log("toy1 collided");
            var x = target.string3t.getPosition().x;
            var y = target.string3t.getPosition().y;
            target.string3.setPosition(x, y);

            this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.comedyBubble_mp3);



            
            target.removeChild(target.string3);

            //cc.eventManager.removeListener(eventListener, target.toy1);
            
         this.string3 = new cc.Sprite.create(res.string3_png);
         this.string3.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.string3.setPosition(x , y);
         target.addChild(this.string3);

            counterLevel3++;
        }

        var string4Rect = target.string4.getBoundingBox();
        var string4tRect = target.string4t.getBoundingBox();
        if(cc.rectIntersectsRect(string4Rect, string4tRect) && counterLevel3 == 4){
            console.log("toy1 collided");
            var x = target.string4t.getPosition().x;
            var y = target.string4t.getPosition().y;
            target.string4.setPosition(x, y);

            this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.comedyBubble_mp3);



            
            target.removeChild(target.string4);

            //cc.eventManager.removeListener(eventListener, target.toy1);
            
         this.string4 = new cc.Sprite.create(res.string4_png);
         this.string4.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.string4.setPosition(x , y);
         target.addChild(this.string4);

            counterLevel3++;
        }

        var string5Rect = target.string5.getBoundingBox();
        var string5tRect = target.string5t.getBoundingBox();
        if(cc.rectIntersectsRect(string5Rect, string5tRect) && counterLevel3 == 5){
            console.log("toy1 collided");
            var x = target.string5t.getPosition().x;
            var y = target.string5t.getPosition().y;
            target.string5.setPosition(x, y);

            this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.comedyBubble_mp3);



            
            target.removeChild(target.string5);

            //cc.eventManager.removeListener(eventListener, target.toy1);
            
         this.string5 = new cc.Sprite.create(res.string5_png);
         this.string5.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.string5.setPosition(x , y);
         target.addChild(this.string5);

            counterLevel3++;
        } 


        var string6Rect = target.string6.getBoundingBox();
        var string6tRect = target.string6t.getBoundingBox();
        if(cc.rectIntersectsRect(string6Rect, string1tRect) && counterLevel3 == 6){
            console.log("toy1 collided");
            var x = target.string6t.getPosition().x;
            var y = target.string6t.getPosition().y;
            target.string6.setPosition(x, y);

            this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.comedyBubble_mp3);


            
            target.removeChild(target.string6);

            //cc.eventManager.removeListener(eventListener, target.toy1);
            
         this.string6 = new cc.Sprite.create(res.string6_png);
         this.string6.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.string6.setPosition(x , y);
         target.addChild(this.string6);


            this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.harpMusic_mp3);


            counterLevel3++;
        } 
        
               

                 var string1 = target.string1.getContentSize();
                 var rectString1 = cc.rect(target.string1.getPosition().x - string1.width/2 ,target.string1.getPosition().y - string1.height/2, string1.width, string1.height);
                 if (cc.rectContainsPoint(rectString1, locationInNode)) {target.string1.setPosition(touch.getLocation());return true;}
                
                 var string2 = target.string2.getContentSize();
                 var rectString2 = cc.rect(target.string2.getPosition().x - string2.width/2 ,target.string2.getPosition().y - string2.height/2, string2.width, string2.height);
                 if (cc.rectContainsPoint(rectString2, locationInNode)) {target.string2.setPosition(touch.getLocation());return true;}
                
                 var string3 = target.string3.getContentSize();
                 var rectString3 = cc.rect(target.string3.getPosition().x - string3.width/2 ,target.string3.getPosition().y - string3.height/2, string3.width, string3.height);
                 if (cc.rectContainsPoint(rectString3, locationInNode)) {target.string3.setPosition(touch.getLocation());return true;}
                
                 var string4 = target.string4.getContentSize();
                 var rectString4 = cc.rect(target.string4.getPosition().x - string4.width/2 ,target.string4.getPosition().y - string4.height/2, string4.width, string4.height);
                 if (cc.rectContainsPoint(rectString4, locationInNode)) {target.string4.setPosition(touch.getLocation());return true;}
                

                 var string5 = target.string5.getContentSize();
                 var rectString5 = cc.rect(target.string5.getPosition().x - string5.width/2 ,target.string5.getPosition().y - string5.height/2, string5.width, string5.height);
                 if (cc.rectContainsPoint(rectString5, locationInNode)) {target.string5.setPosition(touch.getLocation());return true;}
                

                 var string6 = target.string6.getContentSize();
                 var rectString6 = cc.rect(target.string6.getPosition().x - string6.width/2 ,target.string6.getPosition().y - string6.height/2, string6.width, string6.height);
                 if (cc.rectContainsPoint(rectString6, locationInNode)) {target.string6.setPosition(touch.getLocation());return true;}
                  
                 

    },


    onTouchEnded: function(touch, event){

        
        
          var target = event.getCurrentTarget();
         
         var locationInNode = target.convertToNodeSpace(touch.getLocation());
                 
         
                 var string1 = target.string1.getContentSize();
                 var rectString1 = cc.rect(target.string1.getPosition().x - string1.width/2 ,target.string1.getPosition().y - string1.height/2, string1.width, string1.height);
                 if (cc.rectContainsPoint(rectString1, locationInNode)) { var string1 = cc.MoveTo.create(2,cc.p(target.string1.xP,target.string1.yP));
        target.string1.runAction(string1);this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.failure_mp3);
return true;}
                
                 var string2 = target.string2.getContentSize();
                 var rectString2 = cc.rect(target.string2.getPosition().x - string2.width/2 ,target.string2.getPosition().y - string2.height/2, string2.width, string2.height);
                 if (cc.rectContainsPoint(rectString2, locationInNode)) { var string2 = cc.MoveTo.create(2,cc.p(target.string2.xP,target.string2.yP));
        target.string2.runAction(string2);this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.failure_mp3);
return true;}
                
                 var string3 = target.string3.getContentSize();
                 var rectString3 = cc.rect(target.string3.getPosition().x - string3.width/2 ,target.string3.getPosition().y - string3.height/2, string3.width, string3.height);
                 if (cc.rectContainsPoint(rectString1, locationInNode)) { var string1 = cc.MoveTo.create(2,cc.p(target.string1.xP,target.string1.yP));
        target.string3.runAction(string3);this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.failure_mp3);
return true;}
                
                 var string4 = target.string4.getContentSize();
                 var rectString4 = cc.rect(target.string4.getPosition().x - string4.width/2 ,target.string4.getPosition().y - string4.height/2, string4.width, string4.height);
                 if (cc.rectContainsPoint(rectString1, locationInNode)) { var string1 = cc.MoveTo.create(2,cc.p(target.string1.xP,target.string1.yP));
        target.string4.runAction(string4);this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.failure_mp3);
return true;}
                

                 var string5 = target.string5.getContentSize();
                 var rectString5 = cc.rect(target.string5.getPosition().x - string5.width/2 ,target.string5.getPosition().y - string5.height/2, string5.width, string5.height);
                 if (cc.rectContainsPoint(rectString5, locationInNode)) { var string5 = cc.MoveTo.create(2,cc.p(target.string5.xP,target.string5.yP));
        target.string5.runAction(string5);this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.failure_mp3);
return true;}
                

                 var string6 = target.string1.getContentSize();
                 var rectString6 = cc.rect(target.string6.getPosition().x - string6.width/2 ,target.string6.getPosition().y - string6.height/2, string6.width, string6.height);
                 if (cc.rectContainsPoint(rectString6, locationInNode)) { var string6 = cc.MoveTo.create(2,cc.p(target.string6.xP,target.string6.yP));
        target.string6.runAction(string6);this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.failure_mp3);
return true;}

        
    }

    }
    
    ,this);


        var size = cc.winSize;

       
         

         this.bg = new cc.Sprite.create(res.bg3_jpg);
         this.bg.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY );
         this.bg.setPosition(size.width / 2, size.height / 2); 
         this.addChild(this.bg);

         this.character = new cc.Sprite.create(res.character3_png);
         this.character.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.character.setPosition(size.width*0.78 , size.height*0.46);
         this.character.setScale(0.8, 0.8); 
         this.addChild(this.character);

         this.harpPlay = new cc.Sprite.create(res.harpPlay_png);
         this.harpPlay.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.harpPlay.setPosition(size.width*0.46 , size.height*0.50); 
         this.addChild(this.harpPlay);

         this.string1 = new cc.Sprite.create(res.string1_png);
         this.string1.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.string1.setPosition(size.width*0.70 , size.height*0.22);
         this.string1.xP = this.string1.getPosition().x;
         this.string1.yP = this.string1.getPosition().y;
         this.string1.setScale(level3SpriteScaleX, level3SpriteScaleY);
         this.addChild(this.string1);
         cc.eventManager.addListener(eventListener, this.string1);


         
         this.string2 = new cc.Sprite.create(res.string2_png);
         this.string2.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.string2.setPosition(size.width*0.07 , size.height*0.23);
         this.string2.xP = this.string1.getPosition().x;
         this.string2.yP = this.string1.getPosition().y;
         this.string2.setScale(level3SpriteScaleX, level3SpriteScaleY);
         this.addChild(this.string2);
         cc.eventManager.addListener(eventListener, this.string2);


         this.string3 = new cc.Sprite.create(res.string3_png);
         this.string3.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.string3.setPosition(size.width*0.74 , size.height*0.25);
         this.string3.xP = this.string3.getPosition().x;
         this.string3.yP = this.string3.getPosition().y;
         this.string3.setScale(level3SpriteScaleX, level3SpriteScaleY);
         this.addChild(this.string3);
         cc.eventManager.addListener(eventListener, this.string3);


         this.string4 = new cc.Sprite.create(res.string4_png);
         this.string4.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.string4.setPosition(size.width*0.11 , size.height*0.27);
         this.string4.xP = this.string4.getPosition().x;
         this.string4.yP = this.string4.getPosition().y;
         this.string4.setScale(level3SpriteScaleX, level3SpriteScaleY);
         this.addChild(this.string4);
         cc.eventManager.addListener(eventListener, this.string4);

         this.string5 = new cc.Sprite.create(res.string5_png);
         this.string5.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.string5.setPosition(size.width*0.93 , size.height*0.32);
         this.string5.xP = this.string5.getPosition().x;
         this.string5.yP = this.string5.getPosition().y;
         this.string5.setScale(level3SpriteScaleX, level3SpriteScaleY);
         this.addChild(this.string5);
         cc.eventManager.addListener(eventListener, this.string5);


         this.string6 = new cc.Sprite.create(res.string6_png);
         this.string6.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.string6.setPosition(size.width*0.85 , size.height*0.32);
         this.string6.xP = this.string6.getPosition().x;
         this.string6.yP = this.string6.getPosition().y;
         this.string6.setScale(level3SpriteScaleX, level3SpriteScaleY);
         this.addChild(this.string6);
         cc.eventManager.addListener(eventListener, this.string6);




         ///////////////////////////for transparent
         
         this.string1t = new cc.Sprite.create(res.string1t_png);
         this.string1t.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY );
         this.string1t.setPosition(size.width*0.39 , size.height*0.53); 
         this.string1t.setScale(level3SpriteScaleX, level3SpriteScaleY);
         this.addChild(this.string1t);
         

         this.string2t = new cc.Sprite.create(res.string2t_png);
         this.string2t.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY );
         this.string2t.setPosition(size.width*0.42 , size.height*0.54); 
         this.string2t.setScale(level3SpriteScaleX, level3SpriteScaleY);
         this.addChild(this.string2t);
         

         this.string3t = new cc.Sprite.create(res.string3t_png);
         this.string3t.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY );
         this.string3t.setPosition(size.width*0.45 , size.height*0.54); 
         this.string3t.setScale(level3SpriteScaleX, level3SpriteScaleY);
         this.addChild(this.string3t);
         

         
         this.string4t = new cc.Sprite.create(res.string4t_png);
         this.string4t.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY );
         this.string4t.setPosition(size.width*0.48 , size.height*0.54); 
         this.string4t.setScale(level3SpriteScaleX, level3SpriteScaleY);
         this.addChild(this.string4t);
         
         

         
         this.string5t = new cc.Sprite.create(res.string5t_png);
         this.string5t.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY );
         this.string5t.setPosition(size.width*0.51 , size.height*0.55); 
         this.string5t.setScale(level3SpriteScaleX, level3SpriteScaleY);
         this.addChild(this.string5t);
         

         this.string6t = new cc.Sprite.create(res.string6t_png);
         this.string6t.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY );
         this.string6t.setPosition(size.width*0.54 , size.height*0.57); 
         this.string6t.setScale(level3SpriteScaleX, level3SpriteScaleY);
         this.addChild(this.string6t);
         

        return true;
    }


});

var level3Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new level3Layer();
        this.addChild(layer);
    }
});






