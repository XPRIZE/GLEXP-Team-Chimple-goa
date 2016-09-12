var xc = xc || {};
xc.levelLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
      
        this._super();
        
     cc.spriteFrameCache.addSpriteFrames(xc.levelLayer.res.jump_plist);

     this.level = ccs.load(xc.levelLayer.res.jump_level, xc.path);
     this.addChild(this.level.node);

      var levels = this.level.node.getChildByName("bar_1");
      levels = new cc.LabelTTF('LEVELS','Arial', 120 );
      levels.x =levels.x + 50;
      levels.y =levels.y;
      levels.setColor(cc.color(250,250,250)); 
      this.addChild(levels);


      var level3 = this.level.node.getChildByName("green_bar_3");  
      level3.id = "Level3";
      cc.eventManager.addListener(cc.EventListener.create(  
      {event: cc.EventListener.TOUCH_ONE_BY_ONE,
      swallowTouches:true,  
      onTouchBegan: this.onTouchBegan,}) , level3); 
      letter3 = new cc.LabelTTF('3 LETTER','Arial', 120 );
      letter3.x =level3.x + 50;
      letter3.y =level3.y;
      letter3.setColor(cc.color(250,250,250)); 
      this.addChild(letter3); 

       var level4 = this.level.node.getChildByName("pink_bar_4");  
      level4.id = "Level4";
      cc.eventManager.addListener(cc.EventListener.create(  
      {event: cc.EventListener.TOUCH_ONE_BY_ONE,
      swallowTouches:true,  
      onTouchBegan: this.onTouchBegan,}) , level4); 
      letter4 = new cc.LabelTTF('4 LETTER','Arial', 120 );
      letter4.x =level4.x - 100;
      letter4.y =level4.y;
      letter4.setColor(cc.color(250,250,250)); 
      this.addChild(letter4);

       var level5 = this.level.node.getChildByName("yellow_bar_5");  
      level5.id = "Level5";
      cc.eventManager.addListener(cc.EventListener.create(  
      {event: cc.EventListener.TOUCH_ONE_BY_ONE,
      swallowTouches:true,  
      onTouchBegan: this.onTouchBegan,}) , level5); 
      letter5 = new cc.LabelTTF('5 LETTER','Arial', 120 );
      letter5.x =level5.x + 50;
      letter5.y =level5.y;
      letter5.setColor(cc.color(250,250,250)); 
      this.addChild(letter5);

      var level6 = this.level.node.getChildByName("red_bar_6");  
      level6.id = "Level6";
      cc.eventManager.addListener(cc.EventListener.create(  
      {event: cc.EventListener.TOUCH_ONE_BY_ONE,
      swallowTouches:true,  
      onTouchBegan: this.onTouchBegan,}) , level6);  
      letter6 = new cc.LabelTTF('6 LETTER','Arial', 120 );
      letter6.x =level6.x - 100;
      letter6.y =level6.y;
      letter6.setColor(cc.color(250,250,250)); 
      this.addChild(letter6);
        
        
         return true;
    },
     onTouchBegan: function(touch, event){
         var target = event.getCurrentTarget();
         var location = target.convertToNodeSpace(touch.getLocation());
         var targetSize = target.getContentSize();
         var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);
         if (cc.rectContainsPoint(targetRectangle, location))
                   {
                       if(target.id == "Level3"){
                       cc.log("level3");
                       xc.GameScene.load(xc.playLayer);
                       }
                       if(target.id == "Level4"){
                         xc.GameScene.load(xc.play4Layer); 
                       }
                        if(target.id == "Level5"){
                           xc.GameScene.load(xc.play5Layer);
                       }
                        if(target.id == "Level6"){
                           xc.GameScene.load(xc.play6Layer);
                       }
                        
                   }
                   return false;
    }           
    
  });  
  
   xc.levelLayer.res = {

    jump_level: xc.path +"jump_on_words/jump_on_words_level_menu.json",
    jump_plist: xc.path +"jump_on_words/jump_on_words.plist",
    jump_png: xc.path +"jump_on_words/jump_on_words.png"
  }
