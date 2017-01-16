/// <reference path="../../cocos2d-typescript-definitions/cocos2d/cocos2d-lib.d.ts" />

var xc = xc || {};

xc.sortitlevelLayer = cc.Layer.extend({
    
    gameName : "sortit",
    onEnter: function() {
        
        this.getParent().menuContext.setMaxPoints(0);
        
        var level = this.getParent().menuContext.getCurrentLevel();
        if(level == 1) {
            this.getParent().menuContext.setMaxPoints(12);
            xc.GameScene.load(xc.sortitlevel1Layer,this.gameName,level);
        } else if(level == 2) {
            this.getParent().menuContext.setMaxPoints(10);
            xc.GameScene.load(xc.sortitlevel2Layer,this.gameName,level);
        } else if(level == 3) {
            this.getParent().menuContext.setMaxPoints(12);
            xc.GameScene.load(xc.sortitlevel3Layer,this.gameName,level);
        } else if(level == 4) {
            this.getParent().menuContext.setMaxPoints(10);
            xc.GameScene.load(xc.sortitlevel4Layer,this.gameName,level);
        } else if(level == 5) {
            this.getParent().menuContext.setMaxPoints(10);
            xc.GameScene.load(xc.sortitlevel5Layer,this.gameName,level);
        } else if(level == 6) {
            this.getParent().menuContext.setMaxPoints(10);
            xc.GameScene.load(xc.sortitlevel6Layer,this.gameName,level);
        }        
    }
})

xc.sortitlevel1Layer = cc.Layer.extend({
    
    counterLevel1 : 1,
    help : null,
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
                
                if (self.counterLevel1 == 7) {
              
                    
                   // xc.GameScene.load(xc.sortitlevel2Layer);

                }
                 
                return true;
            }

        }, this);


        //this.audioEngine = cc.audioEngine;
        //this.audioEngine.playEffect(xc.sortitlevel1Layer.res.explosive_mp3);

    
        cc.spriteFrameCache.addSpriteFrames(xc.sortitlevel1Layer.res.sortit_plist);

         var size = cc.winSize;

   
         this.bg = ccs.load(xc.sortitlevel1Layer.res.level1bg_json, xc.path);
         this.bg.node.setAnchorPoint(0.5, 0.5);
         this.bg.node.setPosition(size.width / 2, size.height / 2); 
         this.addChild(this.bg.node);
         cc.eventManager.addListener(eventListener.clone(), this.bg.node);
         
         
        
         this.character = ccs.load(xc.sortitlevel1Layer.res.character, xc.path);
         this.character.node.setAnchorPoint(0.5, 0.5);
         this.character.node.setPosition(size.width*0.78 , size.height*0.36); 
         this.addChild(this.character.node);
         
         var animation = ccs.actionTimelineCache.createAction(xc.sortitlevel1Layer.res.character, xc.path);
        this.character.node.runAction(animation);
        animation.gotoFrameAndPlay(0,true);
        
       /*
         this.character = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("sortit/charcterone.png"));
         this.character.setAnchorPoint(0.5, 0.5);
         this.character.setPosition(size.width*0.88 , size.height*0.56); 
         this.addChild(this.character);
*/

         ///////////////////////////for transpare`nt
        
         this.toy1t = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("sortit/toy1t.png"));
         this.toy1t.setAnchorPoint(0.5, 0.5);
         this.toy1t.setPosition(size.width*0.50 , size.height*0.40); 
         this.addChild(this.toy1t);
       

        
         this.toy2t = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("sortit/toy2t.png"));
         this.toy2t.setAnchorPoint(0.5, 0.5);
         this.toy2t.setPosition(size.width*0.50 , size.height*0.475); 
         this.addChild(this.toy2t);
         

        
         this.toy3t = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("sortit/toy3t.png"));
         this.toy3t.setAnchorPoint(0.5, 0.5);
         this.toy3t.setPosition(size.width*0.50 , size.height*0.56); 
         this.addChild(this.toy3t);
         

        
         this.toy4t = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("sortit/toy4t.png"));
         this.toy4t.setAnchorPoint(0.5, 0.5);
         this.toy4t.setPosition(size.width*0.50 , size.height*0.67); 
         this.addChild(this.toy4t);
                 
         
        

         this.toy5t = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("sortit/toy5t.png"));
         this.toy5t.setAnchorPoint(0.5, 0.5);
         this.toy5t.setPosition(size.width*0.50 , size.height*0.779); 
         this.addChild(this.toy5t);
       


        
         this.toy6t = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("sortit/toy6t.png"));
         this.toy6t.setAnchorPoint(0.5, 0.5);
         this.toy6t.setPosition(size.width*0.50 , size.height*0.868); 
         this.addChild(this.toy6t);

        ////Solid toys
       
         this.toy1 = new sortitMovableItem1("sortit/toy1.png", this.toy1t, this);
         this.toy1.setAnchorPoint(0.5, 0.5);
         this.toy1.setPosition(size.width*0.2 , size.height*0.11);
         this.toy1.xP = this.toy1.getPosition().x;
         this.toy1.yP = this.toy1.getPosition().y;
         this.toy1.id = 1; 
         this.addChild(this.toy1);      
         
    

        

         this.toy2 = new sortitMovableItem1("sortit/toy2.png", this.toy2t, this);
         this.toy2.setAnchorPoint(0.5, 0.5);
         this.toy2.setPosition(size.width*0.6 , size.height*0.18);
         this.toy2.xP = this.toy2.getPosition().x;
         this.toy2.yP = this.toy2.getPosition().y;
         this.toy2.id = 2; 
         this.addChild(this.toy2);

        
         this.toy3 = new sortitMovableItem1("sortit/toy3.png", this.toy3t, this);
         this.toy3.setAnchorPoint(0.5, 0.5);
         this.toy3.setPosition(size.width*0.8 , size.height*0.14);
         this.toy3.xP = this.toy3.getPosition().x;
         this.toy3.yP = this.toy3.getPosition().y;
         this.toy3.id = 3; 
         this.addChild(this.toy3);
   

        
         this.toy4 = new sortitMovableItem1("sortit/toy4.png", this.toy4t,  this);
         this.toy4.setAnchorPoint(0.5, 0.5);
         this.toy4.setPosition(size.width*0.4 , size.height*0.22);
         this.toy4.xP = this.toy4.getPosition().x;
         this.toy4.yP = this.toy4.getPosition().y;
         this.toy4.id = 4; 
         this.addChild(this.toy4);
     
    

        
         this.toy5 = new sortitMovableItem1("sortit/toy5.png", this.toy5t, this);
         this.toy5.setAnchorPoint(0.5, 0.5);
         this.toy5.setPosition(size.width*0.07 , size.height*0.27);
         this.toy5.xP = this.toy5.getPosition().x;
         this.toy5.yP = this.toy5.getPosition().y;
         this.toy5.id = 5; 
         this.addChild(this.toy5);
      
            

       
         this.toy6 = new sortitMovableItem1("sortit/toy6.png", this.toy6t, this);
         this.toy6.setAnchorPoint(0.5, 0.5);
         this.toy6.setPosition(size.width*0.93 , size.height*0.27);
         this.toy6.xP = this.toy6.getPosition().x;
         this.toy6.yP = this.toy6.getPosition().y;
         this.toy6.id = 6; 
         this.addChild(this.toy6);
   
         cc.log("sortit");
        
         this.help = new xc.HelpLayer(cc.rect(this.toy1.x, this.toy1.y, this.toy1.width, this.toy1.height), cc.rect(this.toy1t.x, this.toy1t.y, this.toy1t.width, this.toy1t.height))
        this.addChild(this.help)
        this.help.clickAndDrag(this.toy1.x, this.toy1.y, this.toy1t.x, this.toy1t.y)
  
        
        return true;
    }

});

xc.sortitlevel1Layer.res = {
    
    sortittwo_png: xc.path + "sortit/sortittwo/sortittwo.png",
    sortittwo_plist: xc.path + "sortit/sortittwo/sortittwo.plist",
    
    sortit_png: xc.path + "sortit/sortit.png",
    sortit_plist: xc.path + "sortit/sortit.plist",
    
    character: xc.path + "sortit/character1.json",
    level1bg_json: xc.path + "sortit/levelone.json",
    
    
    comedyBubble_mp3:  "res/sounds/sortit/comedyBubble.ogg",

    failure_mp3:  "res/sounds/sortit/failure.ogg"
}


