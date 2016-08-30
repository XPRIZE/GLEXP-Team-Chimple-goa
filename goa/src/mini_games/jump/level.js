var levelLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
      
        this._super();
        
        cc.spriteFrameCache.addSpriteFrames(res.plist);
        
        var levelBG = new cc.Sprite(res.levelBG);
        levelBG.setAnchorPoint(0,0);
        levelBG.x = 0;
        levelBG.y = 0; 
        this.addChild(levelBG, 0);
        
        var level3 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("3_letter.png"));
        level3.setAnchorPoint(0,0);
        level3.x = 0;
        level3.y = 1700; 
        level3.id = "level3";  
        this.addChild(level3, 0);
         cc.eventManager.addListener(cc.EventListener.create(  
        {event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , level3); 
         
         
        var level4 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("4_letter.png"));
        level4.setAnchorPoint(0,0);
        level4.x = 650;
        level4.y = 1200; 
        level4.id = "level4";  
        this.addChild(level4, 0);
        cc.eventManager.addListener(cc.EventListener.create(  
        {event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , level4);
         
        var level5 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("5_letter.png"));
        level5.setAnchorPoint(0,0);
        level5.x = 0;
        level5.y = 700; 
        level5.id = "level5"; 
        this.addChild(level5, 0);
        cc.eventManager.addListener(cc.EventListener.create(  
        {event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , level5);
        
        var level6 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("6_letter.png"));
        level6.setAnchorPoint(0,0);
        level6.x = 650;
        level6.y = 200; 
        level6.id = "level6"; 
        this.addChild(level6, 0);
        cc.eventManager.addListener(cc.EventListener.create(  
        {event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , level6);
         
        var char1 = new cc.Sprite(res.char01);
        char1.setAnchorPoint(0,0);
        char1.setPosition(-250,-250);
        this.addChild(char1, 0);
        
        
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
                       if(target.id == "level3"){
                           cc.log("-=----------------------------in level3-------------");
                            cc.director.runScene(new playScene3(res.char01)); 
                           // cc.director.runScene(new roundScene(3,1));
                       
                       }
                        if(target.id == "level4"){
                            cc.log("-=----------------------------in level4-------------");
                            //cc.director.runScene(new playScene4());
                       
                       }
                        if(target.id == "level5"){
                           // cc.director.runScene(new playScene5());
                       
                       }
                        if(target.id == "level6"){
                           // cc.director.runScene(new playScene6());
                       
                       }
                   }
                   return false;
    }           
    
  });  
    var levelScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new levelLayer();
        this.addChild(layer);
    }
});