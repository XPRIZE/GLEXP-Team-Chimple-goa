var LevelStateLayer = cc.Layer.extend({
   
   Level_Screen_level1_button : null,
   Level_Screen_level2_button : null,
   Level_Screen_level3_button : null,
   
   self : null,
   size : null,
   
   ctor : function() {
       this._super();
       
       size = cc.winSize;
       self = this;

       cc.spriteFrameCache.addSpriteFrames(res.Level_screen_plist);

//       var a = cc.spriteFrameCache.getSpriteFrame("background_level_stage.png");

       this.background = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("background_level_stage.png"));
       this.background.attr({
          x : size.width/2,
          y : size.height/2,
          anchorX : .5,
          anchorY : .5 
       });
       this.addChild(this.background);

       
       this.enableListener();
   },
   
   Level_1 : function(level_value)
   {
       if(level_value==1)
       {
           this.removeListener();
           this.Layer = new level1Round1Layer(this);
           this.addChild(this.Layer);
       }
       else
       {
            this.Layer = new level1Round2Layer(level_value, this);
            this.addChild(this.Layer);
       }

   },
   
   Level_2 : function(level_value)
   {
    //            var secondLevel_key = "secondLevel";
  //              var secondLevel_value  = "1";
//                ls.setItem(secondLevel_key, secondLevel_value);
       var ls = cc.sys.localStorage;
       var data = ls.getItem("secondLevel");
       console.log(data);
      if(data!=null && data==1)
      {
           this.removeListener();
           this.Layer = new level2round1Layer(level_value, this);
           this.addChild(this.Layer);
      }
   },
   
   Level_3 : function(level_value)
   {
       var ls = cc.sys.localStorage;
       var data = ls.getItem("thirdLevel");
       console.log(data);
       if(data!=null && data==1)
       {
            this.removeListener();
            this.Layer = new level3round1Layer(level_value, this);
            this.addChild(this.Layer);
       }
   },
   
   removeListener : function()
   {
       cc.eventManager.removeListeners(Level_Screen_level1_button);
       cc.eventManager.removeListeners(Level_Screen_level2_button);
       cc.eventManager.removeListeners(Level_Screen_level3_button);
   },
   
   enableListener : function()
   {
       Level_Screen_level1_button = new eventListenerClick("Level_01_Play_button.png", this);
       Level_Screen_level1_button.attr({
          x : size.width*13/100 ,
          y : size.height*40/100,
          anchorX : .5,
          anchorY : .5
       });
       this.addChild(Level_Screen_level1_button);
       Level_Screen_level1_button.id = "Level_1";

       var ls = cc.sys.localStorage;
       var data = ls.getItem("secondLevel");
       if(data==1)
       {
           Level_Screen_level2_button = new eventListenerClick("Level_02_Play_button.png", this);
            Level_Screen_level2_button.attr({
                x : size.width*52/100,
                y : size.height*33/100,
                anchorX : .5,
                anchorY : .5 
            }); 
       }
       else
       {
           Level_Screen_level2_button = new eventListenerClick("Level_02_Lock_Button.png", this);
           Level_Screen_level2_button.attr({
                x : size.width*50/100,
                y : size.height*33/100,
                anchorX : .5,
                anchorY : .5 
            });
       }

       this.addChild(Level_Screen_level2_button);
       Level_Screen_level2_button.id = "Level_2";
       
       
       var ls = cc.sys.localStorage;
       var data = ls.getItem("thirdLevel");
       if(data==1)
       {
            Level_Screen_level3_button = new eventListenerClick("level_03_play_button.png", this);
            Level_Screen_level3_button.attr({
                x : size.width*90.5/100,
                y : size.height*37/100,
                anchorX : .5,
                anchorY : .5 
            });
       }
       else
       {
            Level_Screen_level3_button = new eventListenerClick("Level_03_Lock_Button.png", this);
            Level_Screen_level3_button.attr({
                x : size.width*88.5/100,
                y : size.height*37/100,
                anchorX : .5,
                anchorY : .5 
            });
       }


       this.addChild(Level_Screen_level3_button);
       Level_Screen_level3_button.id = "Level_3";
   }
    
});


var LevelStateScene = cc.Scene.extend({
   onEnter : function(){
       this._super();
       var layer = new LevelStateLayer();
       this.addChild(layer);
   }
});