/// <reference path="../../cocos2d-typescript-definitions/cocos2d/cocos2d-lib.d.ts" />


var LevelStateLayer = cc.Layer.extend({
flag : 0,
Level_1 : null,
Level_2 : null,
Level_3 : null,
Level_4 : null,
Level_5 : null,
backleft : null,
backright : null,

ctor:function () {
    this._super();

    var self = this;
    
    var size = cc.winSize;
    
    cc.spriteFrameCache.addSpriteFrames(res1.level_map_plist);
    
    // background image
    this.Level_map = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("level_map/level_map_bg-01.png"), this);
    this.Level_map.attr({
       x: size.width/2,
       y: size.height/2,
       anchorX : .5,
       anchorY : .5 
    });
    this.addChild(this.Level_map, 0);
    
    //  back left button
    self.backleft = new eventListenerClass("level_map/back.png", this);
    self.backleft.attr({
       x: size.width*15/100,
       y: size.height*50/100,
       anchorX : .5,
       anchorY : .5,
    });
    this.addChild(self.backleft, 0);
    self.backleft.id = "backleft";
    self.backleft.setVisible(false);
        
    // back right button
    self.backright = new eventListenerClass("level_map/next.png", this);
    self.backright.attr({
       x: size.width*85/100,
       y: size.height*50/100,
       anchorX : .5,
       anchorY : .5
    });
    this.addChild(self.backright, 0);
    self.backright.id = "backright";
        
    // level 1 image    
    self.Level_1 = new eventListenerClass("level_map/level1.png", this);
    self.Level_1.attr({
        x: size.width*50/100,
        y: size.height*50/100,
        anchorX : .5,
        anchorY : .5
    });
    this.addChild(self.Level_1, 0);
    self.Level_1.id = "Level_1";
    self.Level_1.flag = 1;
    
    // level 2 image
    self.Level_2 = new eventListenerClass("level_map/level2.png", this);
    self.Level_2.attr({
        x: size.width*50/100,
        y: size.height*50/100,
        anchorX : .5,
        anchorY : .5
    });
    this.addChild(self.Level_2, 0);
    self.Level_2.setVisible(false);
    self.Level_2.id = "Level_2";
    self.Level_2.flag = 0;
    
    // level 3 image
    self.Level_3 = new eventListenerClass("level_map/level3.png", this);
    self.Level_3.attr({
        x: size.width*50/100,
        y: size.height*50/100,
        anchorX : .5,
        anchorY : .5
    });
    this.addChild(self.Level_3, 0);
    self.Level_3.setVisible(false);
    self.Level_3.id = "Level_3";
    self.Level_3.flag = 0;
    
    // level 4 image
    self.Level_4 = new eventListenerClass("level_map/level4.png", this);
    self.Level_4.attr({
        x: size.width*50/100,
        y: size.height*50/100,
        anchorX : .5,
        anchorY : .5
    });
    this.addChild(self.Level_4, 0);
    self.Level_4.setVisible(false);
    self.Level_4.id = "Level_4";
    self.Level_4.flag = 0;
    
    // level 5 image
    self.Level_5 = new eventListenerClass("level_map/level5.png", this);
    self.Level_5.attr({
        x: size.width*50/100,
        y: size.height*50/100,
        anchorX : .5,
        anchorY : .5
    });
    this.addChild(self.Level_5, 0);
    self.Level_5.setVisible(false);
    self.Level_5.id = "Level_5";
    self.Level_5.flag = 0;
    
    return true;
    }    
});

/*
var sprite_click = cc.EventListener.create({event: cc.EventListener.TOUCH_ONE_BY_ONE, swallowTouches: true,
  onTouchBegan: function (touch, event) {
      
    var target = event.getCurrentTarget();
    var location = target.convertToNodeSpace(touch.getLocation());
    var targetSize = target.getContentSize();
    var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);

     if (cc.rectContainsPoint(targetRectangle, location))
      {
          if(target.id=="backleft")
          {
              if(flag>0)
                flag--;
              
              if(flag==0)
              {
                  Level_1.setVisible(true);
                  Level_2.setVisible(false);
                  Level_3.setVisible(false);
                  Level_4.setVisible(false);
                  Level_5.setVisible(false);
                  backleft.setVisible(false);
                  
                  Level_1.flag = 1;
                  Level_2.flag = 0;
                  Level_3.flag = 0;
                  Level_4.flag = 0;
                  Level_5.flag = 0;
              }
              else if(flag==1)
              {
                  Level_1.setVisible(false);
                  Level_2.setVisible(true);
                  Level_3.setVisible(false);
                  Level_4.setVisible(false);
                  Level_5.setVisible(false);
                  
                  Level_1.flag = 0;
                  Level_2.flag = 1;
                  Level_3.flag = 0;
                  Level_4.flag = 0;
                  Level_5.flag = 0;
              }
              else if(flag==2)
              {
                  Level_1.setVisible(false);
                  Level_2.setVisible(false);
                  Level_3.setVisible(true);
                  Level_4.setVisible(false);
                  Level_5.setVisible(false);
                  
                  Level_1.flag = 0;
                  Level_2.flag = 0;
                  Level_3.flag = 1;
                  Level_4.flag = 0;
                  Level_5.flag = 0;
              }
              else if(flag==3)
              {
                  Level_1.setVisible(false);
                  Level_2.setVisible(false);
                  Level_3.setVisible(false);
                  Level_4.setVisible(true);
                  Level_5.setVisible(false);
                  backright.setVisible(true);
                  
                  Level_1.flag = 0;
                  Level_2.flag = 0;
                  Level_3.flag = 0;
                  Level_4.flag = 1;
                  Level_5.flag = 0;
              }
          }
          if(target.id=="backright")
          {
              if(flag<4)
                flag++;
              
              if(flag==1)
              {
                  Level_1.setVisible(false);
                  Level_2.setVisible(true);
                  Level_3.setVisible(false);
                  Level_4.setVisible(false);
                  Level_5.setVisible(false);
                  backleft.setVisible(true);
                  
                  Level_1.flag = 0;
                  Level_2.flag = 1;
                  Level_3.flag = 0;
                  Level_4.flag = 0;
                  Level_5.flag = 0;
              }
              else if(flag==2)
              {
                  Level_1.setVisible(false);
                  Level_2.setVisible(false);
                  Level_3.setVisible(true);
                  Level_4.setVisible(false);
                  Level_5.setVisible(false);
                  
                  Level_1.flag = 0;
                  Level_2.flag = 0;
                  Level_3.flag = 1;
                  Level_4.flag = 0;
                  Level_5.flag = 0;
              }
              else if(flag==3)
              {
                  Level_1.setVisible(false);
                  Level_2.setVisible(false);
                  Level_3.setVisible(false);
                  Level_4.setVisible(true);
                  Level_5.setVisible(false);
                  
                  Level_1.flag = 0;
                  Level_2.flag = 0;
                  Level_3.flag = 0;
                  Level_4.flag = 1;
                  Level_5.flag = 0;
              }
              else if(flag==4)
              {
                  Level_1.setVisible(false);
                  Level_2.setVisible(false);
                  Level_3.setVisible(false);
                  Level_4.setVisible(false);
                  Level_5.setVisible(true);
                  backright.setVisible(false);
                  backleft.setVisible(true);
                  
                  Level_1.flag = 0;
                  Level_2.flag = 0;
                  Level_3.flag = 0;
                  Level_4.flag = 0;
                  Level_5.flag = 1;
              }
          }

          if(target.id=="Level_1")
          {
              if(target.flag==1)
              {
                cc.director.runScene(new Level_1_Scene());
              }
          }
          else if(target.id=="Level_2")
          {
              if(target.flag==1)
              {
                cc.director.runScene(new Level_2_Scene());
              }
          }
          else if(target.id=="Level_3")
          {
              if(target.flag==1)
              {
                cc.director.runScene(new Level_3_Scene());
              }
          }
          else if(target.id=="Level_4")
          {
              if(target.flag==1)
              {
                cc.director.runScene(new Level_4_Scene());
              }
          }
          else if(target.id=="Level_5")
          {
              if(target.flag==1)
              {
                cc.director.runScene(new Level_5_Scene());
              }
          }

      }
      
      return false;
  }
});

*/

var LevelStateScene = cc.Scene.extend({
   onEnter : function () {
       this._super();
       var layer = new LevelStateLayer();
       this.addChild(layer);
   } 
});

