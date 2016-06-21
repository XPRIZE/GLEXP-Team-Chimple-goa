/// <reference path="../../cocos2d-typescript-definitions/cocos2d/cocos2d-lib.d.ts" />
var level3Layer = cc.Layer.extend({
        counterLevel3 : 1,

     level3SpriteScaleX : 0.9, 
     level3SpriteScaleY : 0.9,
    

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
                 
                if (self.counterLevel3 == 7) {
                    
                 
                    
                    cc.director.runScene(new level4Scene());
                    
                }
                  
                return true;
            }

        }, this);

        // this.audioEngine = cc.audioEngine;
        // this.audioEngine.playEffect(res.explosive_mp3);

        
       



        var size = cc.winSize;

       
         

         this.bg = new cc.Sprite(res.bg3_jpg);
         this.bg.setAnchorPoint(0.5, 0.5);
         this.bg.setPosition(size.width / 2, size.height / 2); 
         this.addChild(this.bg);
         cc.eventManager.addListener(eventListener.clone(), this.bg);

         this.character = new cc.Sprite(res.character3_png);
         this.character.setAnchorPoint(0.5, 0.5);
         this.character.setPosition(size.width*0.78 , size.height*0.46);
         this.character.setScale(0.8, 0.8); 
         this.addChild(this.character);

         this.harpPlay = new cc.Sprite(res.harpPlay_png);
         this.harpPlay.setAnchorPoint(0.5, 0.5);
         this.harpPlay.setPosition(size.width*0.46 , size.height*0.50); 
         this.addChild(this.harpPlay);



         ///////////////////////////for transparent
         
         this.string1t = new cc.Sprite(res.string1t_png);
         this.string1t.setAnchorPoint(0.5, 0.5);
         this.string1t.setPosition(size.width*0.39 , size.height*0.53); 
         this.string1t.setScale(this.level3SpriteScaleX, this.level3SpriteScaleY);
         this.addChild(this.string1t);
         

         this.string2t = new cc.Sprite(res.string2t_png);
         this.string2t.setAnchorPoint(0.5, 0.5);
         this.string2t.setPosition(size.width*0.42 , size.height*0.54); 
         this.string2t.setScale(this.level3SpriteScaleX, this.level3SpriteScaleY);
         this.addChild(this.string2t);
         

         this.string3t = new cc.Sprite(res.string3t_png);
         this.string3t.setAnchorPoint(0.5, 0.5);
         this.string3t.setPosition(size.width*0.45 , size.height*0.54); 
         this.string3t.setScale(this.level3SpriteScaleX, this.level3SpriteScaleY);
         this.addChild(this.string3t);
         

         
         this.string4t = new cc.Sprite(res.string4t_png);
         this.string4t.setAnchorPoint(0.5, 0.5);
         this.string4t.setPosition(size.width*0.48 , size.height*0.54); 
         this.string4t.setScale(this.level3SpriteScaleX, this.level3SpriteScaleY);
         this.addChild(this.string4t);
         
         

         
         this.string5t = new cc.Sprite(res.string5t_png);
         this.string5t.setAnchorPoint(0.5, 0.5);
         this.string5t.setPosition(size.width*0.51 , size.height*0.55); 
         this.string5t.setScale(this.level3SpriteScaleX, this.level3SpriteScaleY);
         this.addChild(this.string5t);
         

         this.string6t = new cc.Sprite(res.string6t_png);
         this.string6t.setAnchorPoint(0.5, 0.5);
         this.string6t.setPosition(size.width*0.54 , size.height*0.57); 
         this.string6t.setScale(this.level3SpriteScaleX, this.level3SpriteScaleY);
         this.addChild(this.string6t);

         this.string1 = new MovableItem3(res.string1_png, this.string1t, this);
         this.string1.setAnchorPoint(0.5, 0.5);
         this.string1.setPosition(size.width*0.70 , size.height*0.22);
         this.string1.xP = this.string1.getPosition().x;
         this.string1.yP = this.string1.getPosition().y;
         this.string1.setScale(this.level3SpriteScaleX, this.level3SpriteScaleY);
         this.string1.id = 1;
         this.addChild(this.string1);
         


         
         this.string2 = new MovableItem3(res.string2_png, this.string2t, this);
         this.string2.setAnchorPoint(0.5, 0.5);
         this.string2.setPosition(size.width*0.07 , size.height*0.23);
         this.string2.xP = this.string1.getPosition().x;
         this.string2.yP = this.string1.getPosition().y;
         this.string2.setScale(this.level3SpriteScaleX, this.level3SpriteScaleY);
         this.string2.id = 2;
         this.addChild(this.string2);
       


         this.string3 = new MovableItem3(res.string3_png, this.string3t, this);
         this.string3.setAnchorPoint(0.5, 0.5);
         this.string3.setPosition(size.width*0.74 , size.height*0.25);
         this.string3.xP = this.string3.getPosition().x;
         this.string3.yP = this.string3.getPosition().y;
         this.string3.setScale(this.level3SpriteScaleX, this.level3SpriteScaleY);
         this.string3.id = 3;
         this.addChild(this.string3);
         


         this.string4 = new MovableItem3(res.string4_png, this.string4t, this);
         this.string4.setAnchorPoint(0.5, 0.5);
         this.string4.setPosition(size.width*0.11 , size.height*0.27);
         this.string4.xP = this.string4.getPosition().x;
         this.string4.yP = this.string4.getPosition().y;
         this.string4.setScale(this.level3SpriteScaleX, this.level3SpriteScaleY);
         this.string4.id = 4;
         this.addChild(this.string4);
         

         this.string5 = new MovableItem3(res.string5_png, this.string5t, this);
         this.string5.setAnchorPoint(0.5, 0.5);
         this.string5.setPosition(size.width*0.93 , size.height*0.32);
         this.string5.xP = this.string5.getPosition().x;
         this.string5.yP = this.string5.getPosition().y;
         this.string5.setScale(this.level3SpriteScaleX, this.level3SpriteScaleY);
         this.string5.id = 5;
         this.addChild(this.string5);
        


         this.string6 = new MovableItem3(res.string6_png, this.string6t, this);
         this.string6.setAnchorPoint(0.5, 0.5);
         this.string6.setPosition(size.width*0.85 , size.height*0.32);
         this.string6.xP = this.string6.getPosition().x;
         this.string6.yP = this.string6.getPosition().y;
         this.string6.setScale(this.level3SpriteScaleX, this.level3SpriteScaleY);
         this.string6.id = 6;
         this.addChild(this.string6);
            

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






