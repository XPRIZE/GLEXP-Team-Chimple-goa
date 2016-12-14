/// <reference path="../../cocos2d-typescript-definitions/cocos2d/cocos2d-lib.d.ts" />

var xc = xc || {};
xc.sortitlevel2Layer = cc.Layer.extend({
    
    counterLevel2 : 1,
    level2SpriteScaleX : 0.9,
    level2SpriteScaleY : 0.9,
     wrong : 0,
     right : 10,
    gameName : "sortit",
    menuContext: null,
    ctor:function () {
        
        this._super();
       
    },
    onEnter : function(){
        
        this._super();
        
        
        this.menuContext = this.getParent().menuContext;
        this.menuContext.setMaxPoints(5);
        var self = this;

        var eventListener = cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                var location = target.convertToNodeSpace(touch.getLocation());
                var targetSize = target.getContentSize();
                var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);
                   
                
                if (self.counterLevel2 == 6) {
                    
                 
                    
                  // xc.GameScene.load(xc.sortitlevel3Layer);
                    
                }
                   
                return true;
            }

        }, this);

        // this.audioEngine = cc.audioEngine;
        // this.audioEngine.playEffect(res.explosive_mp3);

    

        var size = cc.winSize;

        /////////////////////////////////////////
       
         this.bg = ccs.load(xc.sortitlevel2Layer.res.level2bg_json, xc.path);
         this.bg.node.setAnchorPoint(0.5, 0.5 );
         this.bg.node.setPosition(size.width / 2, size.height / 2); 
         this.addChild(this.bg.node);
         cc.eventManager.addListener(eventListener.clone(), this.bg.node);

        
         this.character = ccs.load(xc.sortitlevel2Layer.res.character, xc.path);
         this.character.node.setAnchorPoint(0.5, 0.5);
         this.character.node.setPosition(size.width*0.78 , size.height*0.26); 
         this.addChild(this.character.node);
        
        var animation = ccs.actionTimelineCache.createAction(xc.sortitlevel2Layer.res.character, xc.path);
        this.character.node.runAction(animation);
        animation.gotoFrameAndPlay(0,true);
        
         /*
         this.character = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("sortit/charctertwo.png"));
         this.character.setAnchorPoint(0.5, 0.5 );
         this.character.setPosition(size.width*0.78 , size.height*0.46); 
         this.character.setScale(this.level2SpriteScaleX, this.level2SpriteScaleY);
         this.addChild(this.character);
   */
         
         this.table = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("sortit/table.png"));
         this.table.setAnchorPoint(0.5, 0.5);
         this.table.setPosition(size.width*0.52 , size.height*0.17); 
         this.table.setScale(this.level2SpriteScaleX, this.level2SpriteScaleY);
         this.addChild(this.table);
           
        /*
         cc.spriteFrameCache.getSpriteFrame("sortit/charcterone.png")
         this.minClock = new cc.Sprite(res.minClock_png);
         this.minClock.setAnchorPoint(0.5, 0.5);
         this.minClock.setPosition(size.width*0.575 , size.height*0.79); 
         this.minClock.setScale(2, 2);
         this.addChild(this.minClock);
         */
/*
cc.spriteFrameCache.getSpriteFrame("sortit/charcterone.png")
         this.hourClock = new cc.Sprite(res.hourClock_png);
         this.hourClock.setAnchorPoint(0.5, 0.5);
         this.hourClock.setPosition(size.width*0.575 , size.height*0.79); 
         this.hourClock.setScale(2, 2);
         this.addChild(this.hourClock);
*/

         //for transparent
        
        
         this.stand = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("sortit/stand.png"));
         this.stand.setAnchorPoint(0.5, 0.5);
         this.stand.setPosition(size.width*0.50 , size.height*0.34); 
         this.stand.setScale(this.level2SpriteScaleX, this.level2SpriteScaleY);
         this.addChild(this.stand);
         

         this.cake1t = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("sortit/cake1t.png"));
         this.cake1t.setAnchorPoint(0.5, 0.5);
         this.cake1t.setPosition(size.width*0.50 , size.height*0.42); 
         this.cake1t.setScale(this.level2SpriteScaleX, this.level2SpriteScaleY);
         this.addChild(this.cake1t);
        

         this.cake2t = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("sortit/cake2t.png"));
         this.cake2t.setAnchorPoint(0.5, 0.5);
         this.cake2t.setPosition(size.width*0.50 , size.height*0.50); 
         this.cake2t.setScale(this.level2SpriteScaleX, this.level2SpriteScaleY);
         this.addChild(this.cake2t);

         this.cake3t = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("sortit/cake3t.png"));
         this.cake3t.setAnchorPoint(0.5, 0.5);
         this.cake3t.setPosition(size.width*0.50 , size.height*0.57); 
         this.cake3t.setScale(this.level2SpriteScaleX, this.level2SpriteScaleY);
         this.addChild(this.cake3t);

         this.cake4t = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("sortit/cake4t.png"));
         this.cake4t.setAnchorPoint(0.5, 0.5);
         this.cake4t.setPosition(size.width*0.50 , size.height*0.63); 
         this.cake4t.setScale(this.level2SpriteScaleX, this.level2SpriteScaleY);
         this.addChild(this.cake4t);


         this.cake5t = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("sortit/cake5t.png"));
         this.cake5t.setAnchorPoint(0.5, 0.5);
         this.cake5t.setPosition(size.width*0.50 , size.height*0.72); 
         this.cake5t.setScale(this.level2SpriteScaleX, this.level2SpriteScaleY);
         this.addChild(this.cake5t);


         this.cake1 = new sortitMovableItem2("sortit/cake1.png", this.cake1t, this);
         this.cake1.setAnchorPoint(0.5, 0.5);
         this.cake1.setPosition(size.width*0.78 , size.height*0.10); 
         this.cake1.setScale(this.level2SpriteScaleX, this.level2SpriteScaleY);
         this.cake1.xP = this.cake1.getPosition().x;
         this.cake1.yP = this.cake1.getPosition().y;
         this.cake1.id = 1;
         this.addChild(this.cake1);
         

         this.cake2 = new sortitMovableItem2("sortit/cake2.png", this.cake2t, this);
         this.cake2.setAnchorPoint(0.5, 0.5);
         this.cake2.setPosition(size.width*0.16 , size.height*0.23); 
         this.cake2.setScale(this.level2SpriteScaleX, this.level2SpriteScaleY);
         this.cake2.xP = this.cake2.getPosition().x;
         this.cake2.yP = this.cake2.getPosition().y;
         this.cake2.id = 2;
         this.addChild(this.cake2);
         

         
         this.cake3 = new sortitMovableItem2("sortit/cake3.png", this.cake3t, this);
         this.cake3.setAnchorPoint(0.5, 0.5);
         this.cake3.setPosition(size.width*0.77 , size.height*0.25); 
         this.cake3.setScale(this.level2SpriteScaleX, this.level2SpriteScaleY);
         this.cake3.xP = this.cake3.getPosition().x;
         this.cake3.yP = this.cake3.getPosition().y;
         this.cake3.id = 3;
         this.addChild(this.cake3);
         


         this.cake4 = new sortitMovableItem2("sortit/cake4.png", this.cake4t, this);
         this.cake4.setAnchorPoint(0.5, 0.5);
         this.cake4.setPosition(size.width*0.11 , size.height*0.07); 
         this.cake4.setScale(this.level2SpriteScaleX, this.level2SpriteScaleY);
         this.cake4.xP = this.cake4.getPosition().x;
         this.cake4.yP = this.cake4.getPosition().y;
         this.cake4.id = 4;
         this.addChild(this.cake4);
         

         this.cake5 = new sortitMovableItem2("sortit/cake5.png", this.cake5t, this);
         this.cake5.setAnchorPoint(0.5, 0.5);
         this.cake5.setPosition(size.width*0.93 , size.height*0.32); 
         this.cake5.setScale(this.level2SpriteScaleX, this.level2SpriteScaleY);
         this.cake5.xP = this.cake5.getPosition().x;
         this.cake5.yP = this.cake5.getPosition().y;
         this.cake5.id = 5;
         this.addChild(this.cake5);
         

        return true;
        
    }


});



xc.sortitlevel2Layer.res = {
    
    sortittwo_png: xc.path + "sortit/sortittwo/sortittwo.png",
    sortittwo_plist: xc.path + "sortit/sortittwo/sortittwo.plist",
    
    sortit_png: xc.path + "sortit/sortit.png",
    sortit_plist: xc.path + "sortit/sortit.plist",
    
    character: xc.path + "sortit/character2.json",
    
    level2bg_json: xc.path +  "sortit/leveltwo.json",
    
    
    comedyBubble_mp3: "res/sounds/sortit/comedyBubble.mp3",
    explosive_mp3:  "res/sounds/sortit/explosive.mp3",
    failure_mp3:  "res/sounds/sortit/failure.mp3"
    
    
}

