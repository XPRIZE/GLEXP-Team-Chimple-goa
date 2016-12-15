/// <reference path="../../cocos2d-typescript-definitions/cocos2d/cocos2d-lib.d.ts" />

var xc = xc || {};
xc.sortitlevel3Layer = cc.Layer.extend({
        counterLevel3 : 1,

     level3SpriteScaleX : 2.5, 
     level3SpriteScaleY : 0.9,
    
     wrong : 0,
     right : 12,
    gameName : "sortit",
    menuContext: null,
    ctor:function () {
        
        this._super();
      
    },
    onEnter : function(){
        
        this._super();
        
        this.menuContext = this.getParent().menuContext;
        this.menuContext.setMaxPoints(6);
        
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
                    
                 
                    
                   xc.GameScene.load(xc.sortitlevel4Layer);
                 //   
                }
                  
                return true;
            }

        }, this);

        // this.audioEngine = cc.audioEngine;
        // this.audioEngine.playEffect(res.explosive_mp3);

        
       



        var size = cc.winSize;

       
         this.bg = ccs.load(xc.sortitlevel3Layer.res.level3bg_json, xc.path);
         this.bg.node.setAnchorPoint(0.5, 0.5);
         this.bg.node.setPosition(size.width / 2, size.height / 2); 
         this.addChild(this.bg.node);
         cc.eventManager.addListener(eventListener.clone(), this.bg.node);
        
       /*

         this.character = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("sortit/charcterthree.png"));
         this.character.setAnchorPoint(0.5, 0.5);
         this.character.setPosition(size.width*0.78 , size.height*0.46);
         this.character.setScale(0.8, 0.8); 
         this.addChild(this.character);
        
        */
         this.character = ccs.load(xc.sortitlevel3Layer.res.character, xc.path);
         this.character.node.setAnchorPoint(0.5, 0.5);
         this.character.node.setPosition(size.width*0.78 , size.height*0.40); 
         this.addChild(this.character.node);
        
        var animation = ccs.actionTimelineCache.createAction(xc.sortitlevel3Layer.res.character, xc.path);
        this.character.node.runAction(animation);
        animation.gotoFrameAndPlay(0,true);
        

         this.harpPlay = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("sortit/harpPlay.png"));
         this.harpPlay.setAnchorPoint(0.5, 0.5);
         this.harpPlay.setPosition(size.width*0.46 , size.height*0.50); 
         this.addChild(this.harpPlay);



         ///////////////////////////for transparent
         
         this.string1t = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("sortit/string1t.png"));
         this.string1t.setAnchorPoint(0.5, 0.5);
         this.string1t.setPosition(size.width*0.39 , size.height*0.54); 
         this.string1t.setScale(this.level3SpriteScaleX, this.level3SpriteScaleY);
         this.addChild(this.string1t,1);
         

         this.string2t = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("sortit/string2t.png"));
         this.string2t.setAnchorPoint(0.5, 0.5);
         this.string2t.setPosition(size.width*0.42 , size.height*0.55); 
         this.string2t.setScale(this.level3SpriteScaleX, 0.85);
         this.addChild(this.string2t,1);
         

         this.string3t = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("sortit/string3t.png"));
         this.string3t.setAnchorPoint(0.5, 0.5);
         this.string3t.setPosition(size.width*0.45 , size.height*0.55); 
         this.string3t.setScale(this.level3SpriteScaleX, 0.83);
         this.addChild(this.string3t,1);
         

         
         this.string4t = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("sortit/string4t.png"));
         this.string4t.setAnchorPoint(0.5, 0.5);
         this.string4t.setPosition(size.width*0.48 , size.height*0.55); 
         this.string4t.setScale(this.level3SpriteScaleX, this.level3SpriteScaleY);
         this.addChild(this.string4t,1);
         
         

         this.string5t = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("sortit/string5t.png"));
         this.string5t.setAnchorPoint(0.5, 0.5);
         this.string5t.setPosition(size.width*0.51 , size.height*0.56); 
         this.string5t.setScale(this.level3SpriteScaleX, 1);
         this.addChild(this.string5t,1);
         

         this.string6t = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("sortit/string6t.png"));
         this.string6t.setAnchorPoint(0.5, 0.5);
         this.string6t.setPosition(size.width*0.54 , size.height*0.58); 
         this.string6t.setScale(this.level3SpriteScaleX,1);
         this.addChild(this.string6t,1);
        

         this.string1 = new sortitMovableItem3("sortit/string1.png", this.string1t, this);
         this.string1.setAnchorPoint(0.5, 0.5);
         this.string1.setPosition(size.width*0.70 , size.height*0.22);
         this.string1.xP = this.string1.getPosition().x;
         this.string1.yP = this.string1.getPosition().y;
         this.string1.setScale(this.level3SpriteScaleX, this.level3SpriteScaleY);
         this.string1.id = 1;
         this.addChild(this.string1,1);
         


        
         this.string2 = new sortitMovableItem3("sortit/string2.png", this.string2t, this);
         this.string2.setAnchorPoint(0.5, 0.5);
         this.string2.setPosition(size.width*0.07 , size.height*0.23);
         this.string2.xP = this.string2.getPosition().x;
         this.string2.yP = this.string2.getPosition().y;
         this.string2.setScale(this.level3SpriteScaleX, 0.85);
         this.string2.id = 2;
         this.addChild(this.string2,1);
       


         this.string3 = new sortitMovableItem3("sortit/string3.png", this.string3t, this);
         this.string3.setAnchorPoint(0.5, 0.5);
         this.string3.setPosition(size.width*0.74 , size.height*0.25);
         this.string3.xP = this.string3.getPosition().x;
         this.string3.yP = this.string3.getPosition().y;
         this.string3.setScale(this.level3SpriteScaleX, 0.83);
         this.string3.id = 3;
         this.addChild(this.string3,1);
         

         this.string4 = new sortitMovableItem3("sortit/string4.png", this.string4t, this);
         this.string4.setAnchorPoint(0.5, 0.5);
         this.string4.setPosition(size.width*0.11 , size.height*0.27);
         this.string4.xP = this.string4.getPosition().x;
         this.string4.yP = this.string4.getPosition().y;
         this.string4.setScale(this.level3SpriteScaleX, this.level3SpriteScaleY);
         this.string4.id = 4;
         this.addChild(this.string4,1);
         

         this.string5 = new sortitMovableItem3("sortit/string5.png", this.string5t, this);
         this.string5.setAnchorPoint(0.5, 0.5);
         this.string5.setPosition(size.width*0.93 , size.height*0.32);
         this.string5.xP = this.string5.getPosition().x;
         this.string5.yP = this.string5.getPosition().y;
         this.string5.setScale(this.level3SpriteScaleX, 1);
         this.string5.id = 5;
         this.addChild(this.string5,1);
        


         this.string6 = new sortitMovableItem3("sortit/string6.png", this.string6t, this);
         this.string6.setAnchorPoint(0.5, 0.5);
         this.string6.setPosition(size.width*0.85 , size.height*0.32);
         this.string6.xP = this.string6.getPosition().x;
         this.string6.yP = this.string6.getPosition().y;
         this.string6.setScale(this.level3SpriteScaleX,1);
         this.string6.id = 6;
         this.addChild(this.string6,1);
            

        return true;
    }


});




xc.sortitlevel3Layer.res = {
    
    sortittwo_png: xc.path + "sortit/sortittwo/sortittwo.png",
    sortittwo_plist: xc.path + "sortit/sortittwo/sortittwo.plist",
    
    sortit_png: xc.path + "sortit/sortit.png",
    sortit_plist: xc.path + "sortit/sortit.plist",
    
    
    character: xc.path + "sortit/character3.json",
    level3bg_json: xc.path + "sortit/levelthree.json",
   
    
    comedyBubble_mp3:  "res/sounds/sortit/comedyBubble.mp3",
    explosive_mp3:  "res/sounds/sortit/explosive.mp3",
    failure_mp3: "res/sounds/sortit/failure.mp3"
}



