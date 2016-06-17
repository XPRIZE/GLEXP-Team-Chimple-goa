var BootLayer = cc.Layer.extend({
    
    sprite:null,
    ctor:function () {
       this._super();
       var size = cc.winSize;
       
       cc.spriteFrameCache.addSpriteFrames(res.plist1);
      
       
       var level = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Level_Screen.png"));
       this.addChild(level,0);
       level.setAnchorPoint(0,0); 
       
       var level1 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Level_1.png"));
       this.addChild(level1,1);
       level1.setPosition((230/1280)*size.width,(450/800)*size.height); 
       level1.id = "Level1";
      // cc.eventManager.addListener(listener.clone(), level1);
        
       var level2 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Level_2.png"));
       this.addChild(level2,1);
       level2.setPosition((640/1280)*size.width,(450/800)*size.height);
       level2.id = "Level2";
        
       var level3 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Level_3.png"));
       this.addChild(level3,1);
       level3.setPosition((1050/1280)*size.width,(450/800)*size.height); 
       level3.id = "Level3";
       
       var level4 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Level_4.png"));
       this.addChild(level4,1);
       level4.setPosition((230/1280)*size.width,(180/800)*size.height); 
       level4.id = "Level4";
       
       var level5 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Level_5.png"));
       this.addChild(level5,1);
       level5.setPosition((640/1280)*size.width,(180/800)*size.height); 
       level5.id = "Level5";
       
       var level6 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Level_6.png"));
       this.addChild(level6,1);
       level6.setPosition((1050/1280)*size.width,(180/800)*size.height); 
       level6.id = "Level6";
       
       
        cc.eventManager.addListener(cc.EventListener.create(  
    {    event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , level1);
         
         cc.eventManager.addListener(cc.EventListener.create(  
    {    event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , level2);

         cc.eventManager.addListener(cc.EventListener.create(  
    {    event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , level3);
         
         cc.eventManager.addListener(cc.EventListener.create(  
    {    event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , level4);
         
         cc.eventManager.addListener(cc.EventListener.create(  
    {    event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , level5);
         
         cc.eventManager.addListener(cc.EventListener.create(  
    {    event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , level6);

        return true;
    },
    
    
    onTouchBegan: function(touch, event){
         var target = event.getCurrentTarget();
         var location = target.convertToNodeSpace(touch.getLocation());
         var targetSize = target.getContentSize();
         var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);
         if (cc.rectContainsPoint(targetRectangle, location))
                   {
                   
                       if(target.id == "Level1"){
                         //  console.log("aaaa");
                       cc.director.runScene(new Menu1Scene());      
                       }
                       
                       if(target.id == "Level2"){
                         //  console.log("aaaa");
                       cc.director.runScene(new Menu2Scene());      
                       }
                        if(target.id == "Level3"){
                         //  console.log("aaaa");
                       cc.director.runScene(new Menu3Scene());      
                       }
                        if(target.id == "Level4"){
                         //  console.log("aaaa");
                       cc.director.runScene(new Menu4Scene());      
                       }
                        if(target.id == "Level5"){
                         //  console.log("aaaa");
                       cc.director.runScene(new Menu5Scene());      
                       }
                        if(target.id == "Level6"){
                         //  console.log("aaaa");
                       cc.director.runScene(new Menu6Scene());      
                       }
                   }
    }
 });   
 
 var BootScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new BootLayer();
        this.addChild(layer);
    }
});


