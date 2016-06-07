var level2round1Layer = cc.Layer.extend({
   
   backGround : null,
   weight_uper : null,
   left_weight : null,
   right_weight : null,
   coin_1 : null,
   coin_2 : null,
   coin_3 : null,
   coin_1_other : null,
   coin_2_other : null,
   coin_3_other : null,
   coin_1_trans : null,
   coin_2_trans : null,
   coin_3_trans : null,
   weight_uper_tween_left : null,
   weight_uper_tween_right : null,
   left_weight_tween_left : null,
   right_weight_tween_left : null,
   left_weight_tween_right : null,
   right_weight_tween_right : null,
   coin_1_other_tween : null,
   coin_2_other_tween : null,
   coin_3_other_tween : null,
   size : null,
   counter : 0,
   self : null,

   coin1 : null,
   coin2 : null,
   coin3 : null,
   level_num : null,
   
   callerObject : null,
      
   actionInterval : null,

   completecoin_1 : null,
   completecoin_2 : null,
      
   ctor : function (level_number, object) {
       
       this._super();
       size = cc.winSize;
       self = this;
       level_num = level_number;
       callerObject = object;
       
        cc.spriteFrameCache.addSpriteFrames(res.Game_screen_02_plist);
       
       counter = 0;

        if(level_number==1)
        {
            coin1 = "Coin_01.png";
            coin2 = "Coin_02.png";
            coin3 = "Coin_03.png";
        }
        
        if(level_number==2)
        {
            coin1 = "Coin_04.png";
            coin2 = "Coin_05.png";
            coin3 = "Coin_06.png";
        }
        
        if(level_number==3)
        {
            coin1 = "Coin_07.png";
            coin2 = "Coin_08.png";
            coin3 = "Coin_09.png";
        }
              
        backGround = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Background_level_02.png"));
        backGround.attr({
            x : size.width/2,
            y : size.height/2,
            anchorX : .5,
            anchorY : .5
        });
        this.addChild(backGround);
       
       weight_uper = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Weight_Uper.png"));
       weight_uper.attr({
          x : size.width*50.5/100,
          y : size.height*55/100,
          anchorX : .5,
          anchorY : .5 
       });
       this.addChild(weight_uper);
       
       left_weight = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Weight_Main.png"));
       left_weight.attr({
           x : size.width*30/100,
           y : size.height*37/100,
           anchorX : .5,
           anchorY : .5
       });
       this.addChild(left_weight);
   
       
       right_weight = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Weight_Main.png"));
       right_weight.attr({
           x : size.width*71/100,
           y : size.height*37/100,
           anchorX : .5,
           anchorY : .5
       });
       this.addChild(right_weight);
       

       coin_1_trans = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(coin1));
       coin_1_trans.attr({
           x : size.width*76/100,
           y : size.height*27.5/100,
           anchorX : .5,
           anchorY : .5,
           opacity : 0
       });
       this.addChild(coin_1_trans);
       coin_1_trans.xP = coin_1_trans.getPosition().x;
       coin_1_trans.yP = coin_1_trans.getPosition().y;

       coin_2_trans = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(coin2));
       coin_2_trans.attr({
           x : size.width*68/100,
           y : size.height*27.5/100,
           anchorX : .5,
           anchorY : .5,
           opacity : 0
       });
       this.addChild(coin_2_trans);
       coin_2_trans.xP = coin_2_trans.getPosition().x;
       coin_2_trans.yP = coin_2_trans.getPosition().y;
       
       coin_3_trans = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(coin3));
       coin_3_trans.attr({
           x : size.width*72/100,
           y : size.height*39/100,
           anchorX : .5,
           anchorY : .5,
           opacity : 0
       });
       this.addChild(coin_3_trans);
       coin_3_trans.xP = coin_3_trans.getPosition().x;
       coin_3_trans.yP = coin_3_trans.getPosition().y;

       
       coin_1 = new eventListenerClass(coin1, coin_1_trans, this);
       coin_1.attr({
           x : size.width*88/100,
           y : size.height*6/100,
           anchorX : .5,
           anchorY : .5
       });
       this.addChild(coin_1);
       coin_1.xP = coin_1.getPosition().x;
       coin_1.yP = coin_1.getPosition().y;
       coin_1.id = "coin_1";
       
       coin_2 = new eventListenerClass(coin2, coin_2_trans, this);
       coin_2.attr({
           x : size.width*80/100,
           y : size.height*6/100,
           anchorX : .5,
           anchorY : .5
       });
       this.addChild(coin_2);
       coin_2.xP = coin_2.getPosition().x;
       coin_2.yP = coin_2.getPosition().y;
       coin_2.id = "coin_2";
       
       coin_3 = new eventListenerClass(coin3, coin_3_trans, this);
       coin_3.attr({
           x : size.width*72/100,
           y : size.height*6/100,
           anchorX : .5,
           anchorY : .5
       });
       this.addChild(coin_3);
       coin_3.xP = coin_3.getPosition().x;
       coin_3.yP = coin_3.getPosition().y;
       coin_3.id = "coin_3";

       coin_1_other = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(coin1));
       coin_1_other.attr({
           x : size.width*28/100,
           y : size.height*6/100,
           anchorX : .5,
           anchorY : .5
       });
       this.addChild(coin_1_other);
       
       coin_2_other = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(coin2));
       coin_2_other.attr({
           x : size.width*20/100,
           y : size.height*6/100,
           anchorX : .5,
           anchorY : .5
       });
       this.addChild(coin_2_other);
       
       coin_3_other = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(coin3));
       coin_3_other.attr({
           x : size.width*12/100,
           y : size.height*6/100,
           anchorX : .5,
           anchorY : .5,
       });
       this.addChild(coin_3_other);

       this.removeListener();
//       this.scheduleUpdate();
       this.first_coin_tween();
   },
      
   weight_uper_tween_left_finish_action : function()
   {
        if(counter==0)
        {
            this.removeChild(coin_1);
            this.removeChild(coin_2);
            this.removeChild(coin_3);
            
            coin_1 = new eventListenerClass(coin1, coin_1_trans, this);
            coin_1.attr({
                x : size.width*88/100,
                y : size.height*6/100,
                anchorX : .5,
                anchorY : .5
            });
            this.addChild(coin_1);
            coin_1.xP = coin_1.getPosition().x;
            coin_1.yP = coin_1.getPosition().y;
            coin_1.id = "coin_1";
            
            coin_2 = new eventListenerClass(coin2, coin_2_trans ,this);
            coin_2.attr({
                x : size.width*80/100,
                y : size.height*6/100,
                anchorX : .5,
                anchorY : .5
            });
            this.addChild(coin_2);
            coin_2.xP = coin_2.getPosition().x;
            coin_2.yP = coin_2.getPosition().y;
            coin_2.id = "coin_2";
            
            coin_3 = new eventListenerClass(coin3, coin_3_trans ,this);
            coin_3.attr({
                x : size.width*72/100,
                y : size.height*6/100,
                anchorX : .5,
                anchorY : .5
            });
            this.addChild(coin_3);
            coin_3.xP = coin_3.getPosition().x;
            coin_3.yP = coin_3.getPosition().y;
            coin_3.id = "coin_3";
        }
        
        if(counter==1)
        {
            this.removeChild(coin_2);
            this.removeChild(coin_3);
                            
            coin_2 = new eventListenerClass(coin2, coin_2_trans, this);
            coin_2.attr({
                x : size.width*80/100,
                y : size.height*6/100,
                anchorX : .5,
                anchorY : .5
            });
            this.addChild(coin_2);
            coin_2.xP = coin_2.getPosition().x;
            coin_2.yP = coin_2.getPosition().y;
            coin_2.id = "coin_2";
            
            coin_3 = new eventListenerClass(coin3, coin_3_trans, this);
            coin_3.attr({
                x : size.width*72/100,
                y : size.height*6/100,
                anchorX : .5,
                anchorY : .5
            });
            this.addChild(coin_3);
            coin_3.xP = coin_3.getPosition().x;
            coin_3.yP = coin_3.getPosition().y;
            coin_3.id = "coin_3";
        }
        
        if(counter==2)
        {
            this.removeChild(coin_3);
            
            coin_3 = new eventListenerClass(coin3, coin_3_trans, this);
            coin_3.attr({
                x : size.width*72/100,
                y : size.height*6/100,
                anchorX : .5,
                anchorY : .5
            });
            this.addChild(coin_3);
            coin_3.xP = coin_3.getPosition().x;
            coin_3.yP = coin_3.getPosition().y;
            coin_3.id = "coin_3";
        }
   },
   
   removeListener : function()
   {
       cc.eventManager.removeListeners(coin_1);
       cc.eventManager.removeListeners(coin_2);
       cc.eventManager.removeListeners(coin_3);
   },

   complete_coin_function : function()
   {
       if(counter==1)
       {
           completecoin_1 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(coin1));
           completecoin_1.attr({
               x : coin_1.getPosition().x,
               y : coin_1.getPosition().y,
               anchorX : .5,
               anchorY : .5
           });
           this.addChild(completecoin_1);
           
           completecoin_2 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(coin1));
           completecoin_2.attr({
               x : coin_1_other.getPosition().x,
               y : coin_1_other.getPosition().y,
               anchorX : .5,
               anchorY : .5
           });
           this.addChild(completecoin_2);
       }
       else if(counter==2)
       {
           completecoin_1 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(coin2));
           completecoin_1.attr({
               x : coin_2.getPosition().x,
               y : coin_2.getPosition().y,
               anchorX : .5,
               anchorY : .5
           });
           this.addChild(completecoin_1);
           
           completecoin_2 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(coin2));
           completecoin_2.attr({
               x : coin_2_other.getPosition().x,
               y : coin_2_other.getPosition().y,
               anchorX : .5,
               anchorY : .5
           });
           this.addChild(completecoin_2);           
       }
       else if(counter==3)
       {
           completecoin_1 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(coin3));
           completecoin_1.attr({
               x : coin_3.getPosition().x,
               y : coin_3.getPosition().y,
               anchorX : .5,
               anchorY : .5
           });
           this.addChild(completecoin_1);
           
           completecoin_2 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(coin3));
           completecoin_2.attr({
               x : coin_3_other.getPosition().x,
               y : coin_3_other.getPosition().y,
               anchorX : .5,
               anchorY : .5
           });
           this.addChild(completecoin_2);
       }
       
        var completecoin_1_scale = cc.ScaleTo.create(1, 2, 2);
        completecoin_1.runAction(completecoin_1_scale);
        
        var completecoin_2_scale = cc.ScaleTo.create(1, 2, 2);
        completecoin_2.runAction(completecoin_2_scale);
       
        var completecoin_1_tween = cc.MoveTo.create(1, cc.p(size.width/2, size.height*55/100));
        completecoin_1.runAction(cc.sequence(completecoin_1_tween, cc.callFunc(this.completecoin_tween_function , this)));
    
        var completecoin_2_tween = cc.MoveTo.create(1, cc.p(size.width/2, size.height*55/100));
        completecoin_2.runAction(completecoin_2_tween);
   },
   
   completecoin_tween_function : function()
   {
       this.removeChild(completecoin_2);
       this.removeChild(completecoin_1);
       this.first_coin_tween();
   },
   
   first_coin_tween : function()
   {
       if(counter==0)
       {
            coin_1_other_tween = cc.MoveTo.create(2, cc.p(size.width*34/100, size.height*27.5/100));       
            coin_1_other.runAction(cc.sequence(coin_1_other_tween, cc.callFunc(this.weight_uper_tween_left_start, this)));
            var coin_1_trans_fade_in = cc.FadeTo.create(2, 50);
            coin_1_trans.runAction(coin_1_trans_fade_in);
       }
       if(counter==1)
       {
           coin_2_other_tween = cc.MoveTo.create(2, cc.p(size.width*26/100, size.height*27.5/100));
            coin_2_other.runAction(cc.sequence(coin_2_other_tween, cc.callFunc(this.weight_uper_tween_left_start, this)));
            var coin_2_trans_fade_in = cc.FadeTo.create(2, 50);
            coin_2_trans.runAction(coin_2_trans_fade_in);
       }
       if(counter==2)
       {
           coin_3_other_tween = cc.MoveTo.create(2, cc.p(size.width*30/100, size.height*39/100));
            coin_3_other.runAction(coin_3_other_tween);
            coin_3_other.runAction(cc.sequence(coin_3_other_tween, cc.callFunc(this.weight_uper_tween_left_start, this)));
            var coin_3_trans_fade_in = cc.FadeTo.create(2, 50);
            coin_3_trans.runAction(coin_3_trans_fade_in);
       }
       
        if(counter==3)
        {
            if(level_num==3)
            {
                this.parent.removeChild(this);
                
                var ls = cc.sys.localStorage;
                var thirdLevel_key = "thirdLevel";
                var thirdLevel_value  = "1";
                ls.setItem(thirdLevel_key, thirdLevel_value);
                
                callerObject.Level_3(0);
            }
            else
            {
                this.parent.removeChild(this);
                callerObject.Level_2(++level_num);
            }
        }
   },
   
   weight_uper_tween_left_start : function()
   {
        weight_uper_tween_left = cc.RotateTo.create(1, -7);       
        left_weight_tween_left = cc.MoveBy.create(.9, cc.p(0,-36));
        right_weight_tween_left = cc.MoveBy.create(1, cc.p(0,65));
        weight_uper.runAction(weight_uper_tween_left);
        weight_uper.runAction(cc.sequence(weight_uper_tween_left, cc.callFunc(this.weight_uper_tween_left_finish_action, this)));
        right_weight.runAction(right_weight_tween_left);
        left_weight.runAction(left_weight_tween_left);

        var coin_1_other_tween1 = cc.MoveBy.create(1, cc.p(0,-30));
        coin_1_other.runAction(coin_1_other_tween1);
        
        var coin_1_trans_tween = cc.MoveBy.create(1, cc.p(0,60));
        coin_1_trans.runAction(coin_1_trans_tween);

       if(counter==1)
       {
            var coin_1_tween = cc.MoveBy.create(1, cc.p(0,60));
            coin_1.runAction(coin_1_tween);
        
            var coin_2_other_tween2 = cc.MoveBy.create(1, cc.p(0,-30));
            coin_2_other.runAction(coin_2_other_tween2);
            
            var coin_2_trans_tween = cc.MoveBy.create(1, cc.p(0,60));
            coin_2_trans.runAction(coin_2_trans_tween);
       }
       if(counter==2)
       {
            var coin_1_tween = cc.MoveBy.create(1, cc.p(0,60));
            coin_1.runAction(coin_1_tween);
            
            var coin_2_other_tween2 = cc.MoveBy.create(1, cc.p(0,-30));
            coin_2_other.runAction(coin_2_other_tween2);
            
            var coin_2_tween = cc.MoveBy.create(1, cc.p(0,60));
            coin_2.runAction(coin_2_tween);
            
            var coin_3_other_tween3 = cc.MoveBy.create(1, cc.p(0,-30));
            coin_3_other.runAction(coin_3_other_tween3);
            
            var coin_3_trans_tween = cc.MoveBy.create(1, cc.p(0,60));
            coin_3_trans.runAction(coin_3_trans_tween);
       }
   },
   
   weight_uper_tween_right_start : function()
   {
       this.removeListener();     

       weight_uper_tween_right = cc.RotateTo.create(1, 0);
       left_weight_tween_right = cc.MoveBy.create(.9, cc.p(0,36));
       right_weight_tween_right = cc.MoveBy.create(1, cc.p(0,-65));
        weight_uper.runAction(cc.sequence(weight_uper_tween_right, cc.callFunc(this.complete_coin_function, this)));
        right_weight.runAction(right_weight_tween_right);
        left_weight.runAction(left_weight_tween_right);


        var coin_1_other_tween1 = cc.MoveBy.create(1, cc.p(0,30));
        coin_1_other.runAction(coin_1_other_tween1);
        
        var coin_1_tween = cc.MoveBy.create(1, cc.p(0,-60));
        coin_1.runAction(coin_1_tween);
        
       if(counter==1)
       {
            var coin_2_other_tween2 = cc.MoveBy.create(1, cc.p(0,30));
            coin_2_other.runAction(coin_2_other_tween2);
            
            var coin_2_tween = cc.MoveBy.create(1, cc.p(0,-60));
            coin_2.runAction(coin_2_tween);
       }
       
       if(counter==2)
       {
            var coin_2_other_tween2 = cc.MoveBy.create(1, cc.p(0,30));
            coin_2_other.runAction(coin_2_other_tween2);
            
            var coin_2_tween = cc.MoveBy.create(1, cc.p(0,-60));
            coin_2.runAction(coin_2_tween);
            
            var coin_3_other_tween3 = cc.MoveBy.create(1, cc.p(0,30));
            coin_3_other.runAction(coin_3_other_tween3);
            
            var coin_3_tween = cc.MoveBy.create(1, cc.p(0,-60));
            coin_3.runAction(coin_3_tween);
       }
       
       counter++;
   },
    
});


var level2round1Scene = cc.Scene.extend({
   onEnter : function(){
       this._super();
       var layer = new level2round1Layer();
       this.addChild(layer);
   }    
});