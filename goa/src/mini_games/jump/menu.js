/// <reference path="../../cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />

 var menuLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
      
        this._super();
         cc.spriteFrameCache.addSpriteFrames(res.plist);
        cc.log("############################ in Menu #######################");
        var menuBG = new cc.Sprite(res.menuBG);
        menuBG.setAnchorPoint(0,0);
        menuBG.x = 0;
        menuBG.y = 0; 
        this.addChild(menuBG, 0);
        
        var play = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Play_button.png"));
        play.setAnchorPoint(0,0);
        play.x = cc.director.getWinSize().width * 0.40;
        play.y = cc.director.getWinSize().height * 0.66; 
        this.addChild(play, 0);
         cc.eventManager.addListener(cc.EventListener.create(  
        {event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , play); 
         
        var level = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Words_level.png"));
        level.setAnchorPoint(0,0);
        level.x = cc.director.getWinSize().width * 0.25;
        level.y = cc.director.getWinSize().height * 0.46875; 
        level.id = "level"  
        this.addChild(level, 0);
         cc.eventManager.addListener(cc.EventListener.create(  
        {event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , level); 
         
      
        return true;
    },
    onTouchBegan: function(touch, event){
         var target = event.getCurrentTarget();
         var location = target.convertToNodeSpace(touch.getLocation());
         var targetSize = target.getContentSize();
         var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);
         if (cc.rectContainsPoint(targetRectangle, location))
                   {
                       if(target.id == "play"){
                       
                       }
                       if(target.id == "level"){
                            cc.director.runScene(new levelScene());
                       
                       }
                   }
                   return false;
    }           
});

var menuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new menuLayer();
        this.addChild(layer);
    }
});

