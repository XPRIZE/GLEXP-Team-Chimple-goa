/// <reference path="../../cocos2d-typescript-definitions/cocos2d/cocos2d-lib.d.ts" />

var level1Round2Layer = cc.Layer.extend({
    
    backGround : null,
    water : null,
    circle_trans : null,
    circle : null,
    circle_leftcrack : null,
    circle_rightcrack : null,
    circle_topcrack : null,
    circle_bottomcrack : null,    
    circle_trans_tween : null,
    
    pentagone_trans : null,
    pentagone : null,
    pentagone_leftcrack : null,
    pentagone_rightcrack : null,
    pentagone_topcrack : null,
    pentagone_bottomcrack : null,    
    pentagone_trans_tween : null,
    
    size : null,
    self : null,
    water_tween : null,
    i : 0,
    callerObject : null,
    extraLayer1 : null,
    level_number : null,
    
    circle_sprite : null,
    circle_trans_sprite : null,
    pentagone_sprite : null,
    pentagone_trans_sprite : null,
    
    fish_tween_left : null,
    fish_tween_right : null,
    flag : 0,
    fish : null,
    water_anim_circle : null,
    water_anim_pentagone : null,
    
    ctor : function(level_num, object){
        this._super();
        size = cc.winSize;
        self = this;
        callerObject = object;
        i = 0;
        flag = 0;
        level_number = level_num;
        
        cc.spriteFrameCache.addSpriteFrames(res.Game_screen_01_plist);
        
        if(level_num==2)
        {
            circle_sprite = "Circle.png";
            circle_trans_sprite = "Circle_Trans.png";//res.level1round2_circle_trans;
            pentagone_sprite = "Pentagone.png";
            pentagone_trans_sprite = "Pentagone_Trans.png";
        }
        else
        {
            circle_sprite = "Star.png";
            circle_trans_sprite = "Star_Trans.png";
            pentagone_sprite = "Tringle.png";
            pentagone_trans_sprite = "Tringle_Trans.png";
        }
        
        backGround = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Background_level_01.png"));
        backGround.attr({
                x : size.width/2,
                y : size.height/2,
                anchorX : .5,
                anchorY : .5 
        });
        this.addChild(backGround);
        
        water = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Water_01.png"));
        water.attr({
                x : size.width*51/100,
                y : size.height*26/100,
                anchorX : .5,
                anchorY : 0 
        });
        this.addChild(water);
        
        circle_trans = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(circle_trans_sprite));
        circle_trans.attr({
                x : size.width*55/100,
                y : size.height*58/100,
                anchorX : .5,
                anchorY : .5 
        });
        this.addChild(circle_trans);
        circle_trans.id = "circle_trans";        
        
        
        circle = new eventListenerClass(circle_sprite, circle_trans, this);
        circle.attr({
                x : size.width*55/100,
                y : size.height*58/100,
                anchorX : .5,
                anchorY : .5 
        });
        this.addChild(circle);
        circle.id = "circle";
        circle.xP = size.width*55/100;
        circle.yP = size.height*21/100;
        
        circle_leftcrack = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Left_Crack.png"));
        circle_leftcrack.attr({
                x : size.width*50/100,
                y : size.height*56/100,
                anchorX : .5,
                anchorY : .5,
                opacity : 0 
        });
        this.addChild(circle_leftcrack);
        
        circle_rightcrack = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Right_Crack.png"));
        circle_rightcrack.attr({
                x : size.width*59/100,
                y : size.height*56/100,
                anchorX : .5,
                anchorY : .5,
                opacity : 0
        });
        this.addChild(circle_rightcrack);
        
        circle_topcrack = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Top_Crack.png"));
        circle_topcrack.attr({
                x : size.width*54/100,
                y : size.height*65/100,
                anchorX : .5,
                anchorY : .5,
                opacity : 0
        });
        this.addChild(circle_topcrack);
        
        circle_bottomcrack = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Bottom_Crack.png"));
        circle_bottomcrack.attr({
                x : size.width*54/100,
                y : size.height*51/100,
                anchorX : .5,
                anchorY : .5,
                opacity : 0
        });
        this.addChild(circle_bottomcrack);
        

        pentagone_trans = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(pentagone_trans_sprite));
        pentagone_trans.attr({
                x : size.width*35/100,
                y : size.height*50/100,
                anchorX : .5,
                anchorY : .5 
        });
        this.addChild(pentagone_trans);
        pentagone_trans.id = "pentagone_trans";        
        
        
        pentagone = new eventListenerClass(pentagone_sprite, pentagone_trans, this);
        pentagone.attr({
                x : size.width*35/100,
                y : size.height*50/100,
                anchorX : .5,
                anchorY : .5 
        });
        this.addChild(pentagone);
        pentagone.id = "pentagone";
        pentagone.xP = size.width*35/100;
        pentagone.yP = size.height*21/100;
        
        pentagone_leftcrack = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Left_Crack.png"));
        pentagone_leftcrack.attr({
                x : size.width*30/100,
                y : size.height*50/100,
                anchorX : .5,
                anchorY : .5,
                opacity : 0 
        });
        this.addChild(pentagone_leftcrack);
        
        pentagone_rightcrack = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Right_Crack.png"));
        pentagone_rightcrack.attr({
                x : size.width*39.5/100,
                y : size.height*50/100,
                anchorX : .5,
                anchorY : .5,
                opacity : 0
        });
        this.addChild(pentagone_rightcrack);
        
        pentagone_topcrack = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Top_Crack.png"));
        pentagone_topcrack.attr({
                x : size.width*35/100,
                y : size.height*57/100,
                anchorX : .5,
                anchorY : .5,
                opacity : 0
        });
        this.addChild(pentagone_topcrack);
        
        pentagone_bottomcrack = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Bottom_Crack.png"));
        pentagone_bottomcrack.attr({
                x : size.width*35/100,
                y : size.height*43/100,
                anchorX : .5,
                anchorY : .5,
                opacity : 0
        });
        this.addChild(pentagone_bottomcrack);

        fish = ccs.load(res.fish_json);
        fish.node.attr({
            x : size.width*85/100,
            y : size.height*50/100,
            anchorX : 0,
            anchorY : 0
        });
        this.addChild(fish.node);

        fish.node.runAction(fish.action);
        fish.action.play("Fish_animation", true);

        water_anim_pentagone = ccs.load(res.Water_json);
        water_anim_pentagone.node.attr({
            x : size.width*27/100,
            y : size.height*65/100,
            anchorX : .5,
            anchorY : .5
        });
        this.addChild(water_anim_pentagone.node);

        water_anim_pentagone.node.runAction(water_anim_pentagone.action);
        water_anim_pentagone.action.play("water_animation", true);

        
        water_anim_circle = ccs.load(res.Water_json);
        water_anim_circle.node.attr({
            x : size.width*47/100,
            y : size.height*72/100,
            anchorX : .5,
            anchorY : .5
        });
        this.addChild(water_anim_circle.node);

        water_anim_circle.node.runAction(water_anim_circle.action);
        water_anim_circle.action.play("water_animation", true);

        fish_tween_left = cc.MoveTo.create(5, cc.p(size.width*15/100, size.height*55/100));
        fish.node.runAction(fish_tween_left); //cc.sequence(fish_tween_left, cc.callFunc(this.rotateFish, this)));

        this.carck_come();
        this.scheduleUpdate();
    },
    
    rotateFish : function()
    {
        var fish_rotate = cc.RotateTo.create(1, 180);
        fish.node.runAction(cc.sequence(fish_rotate, cc.callFunc(this.fish_moveRight, this)));
    },
    
    fish_moveRight : function ()
    {
        fish_tween_right = cc.MoveTo.create(5, cc.p(size.width*85/100, size.height*55/100));
        fish.node.runAction(fish_tween_right);
    },
    
    carck_come : function()
    {
        var circle_topcrack_tween = cc.FadeTo.create(1, 255);
        circle_topcrack.runAction(cc.sequence(circle_topcrack_tween, cc.callFunc(this.crack_tween_Action, this)));
        
        var circle_bottomcrack_tween = cc.FadeTo.create(1, 255);
        circle_bottomcrack.runAction(circle_bottomcrack_tween);
        
        var circle_leftcrack_tween = cc.FadeTo.create(1, 255);
        circle_leftcrack.runAction(circle_leftcrack_tween);
        
        var circle_rightcrack_tween = cc.FadeTo.create(1, 255);
        circle_rightcrack.runAction(circle_rightcrack_tween);
        
        var pentagone_topcrack_tween = cc.FadeTo.create(1, 255);
        pentagone_topcrack.runAction(pentagone_topcrack_tween);
        
        var pentagone_bottomcrack_tween = cc.FadeTo.create(1, 255);
        pentagone_bottomcrack.runAction(pentagone_bottomcrack_tween);
        
        var pentagone_leftcrack_tween = cc.FadeTo.create(1, 255);
        pentagone_leftcrack.runAction(pentagone_leftcrack_tween);
        
        var pentagone_rightcrack_tween = cc.FadeTo.create(1, 255);
        pentagone_rightcrack.runAction(pentagone_rightcrack_tween);
    },
    
    crack_tween_Action : function ()
    {
        var circle_tween = cc.MoveTo.create(1, cc.p(size.width*55/100, size.height*21/100));
        circle.runAction(circle_tween);
        
        var pentagone_tween = cc.MoveTo.create(1, cc.p(size.width*35/100, size.height*21/100));
        pentagone.runAction(pentagone_tween);
        
        var scale_tween = cc.ScaleBy.create(10, 1, -.01)
        water_tween = cc.Repeat.create(scale_tween, 3);
        water_tween.setTag(1);
        water.runAction(water_tween);
    },
    
    circleSetOnPosition : function(object, x_position, y_position)
    {
         var sprite = cc.MoveTo.create(.5, cc.p(x_position,y_position));
         object.runAction(cc.sequence(sprite , cc.callFunc(this.circle_removeCrack, this)));
    },
    
    circle_removeCrack : function ()
    {
        this.removeChild(circle_leftcrack);
        this.removeChild(circle_rightcrack);
        this.removeChild(circle_topcrack);
        this.removeChild(circle_bottomcrack);
        circle_leftcrack = null;
        
        if(pentagone_leftcrack==null)
        {
            if(level_number==3)
            {
                this.parent.removeChild(this);
                
                var ls = cc.sys.localStorage;
                var secondLevel_key = "secondLevel";
                var secondLevel  = "1";
                ls.setItem(secondLevel_key, secondLevel);
                
                callerObject.Level_2(1);                
            }
            else
            {
                this.unscheduleUpdate();
                water.stopAction(water_tween);
                
                this.parent.removeChild(this);
                callerObject.Level_1(++level_number); 
            }
        }
    },
    
    pentagoneSetOnPosition : function(object, x_position, y_position)
    {
         var sprite = cc.MoveTo.create(.5, cc.p(x_position,y_position));
         object.runAction(cc.sequence(sprite , cc.callFunc(this.pentagone_removeCrack, this)));
    },
    
    pentagone_removeCrack : function ()
    {
        this.removeChild(pentagone_leftcrack);
        this.removeChild(pentagone_rightcrack);
        this.removeChild(pentagone_topcrack);
        this.removeChild(pentagone_bottomcrack);
        pentagone_leftcrack = null;
        
        if(circle_leftcrack==null)
        {
            if(level_number==3)
            {
                this.parent.removeChild(this);
                
                var ls = cc.sys.localStorage;
                var secondLevel_key = "secondLevel";
                var secondLevel  = "1";
                ls.setItem(secondLevel_key, secondLevel);
                
                callerObject.Level_2(1);                
            }
            else
            {
                this.unscheduleUpdate();
                water.stopAction(water_tween);
                
                this.parent.removeChild(this);
                callerObject.Level_1(++level_number); 
            }
        }

    },
  
    removeListener : function ()
    {
        cc.eventManager.removeListeners(circle);
    },
    
    updateLayer : function()
    {
        this.removeChild(extraLayer1);
        this.parent.removeChild(this);
        callerObject.Level_1(level_number);
    },
        
    update : function ()
    {
        var pentagone_val = pentagone_trans.getPosition().y - (pentagone.getBoundingBox().height)/2;
        var circle_val = circle_trans.getPosition().y - (circle.getBoundingBox().height)/2 
        var water_val = water.getPosition().y + (water.getBoundingBox().height);
        var pentagone_topcrack_cal = pentagone_topcrack.getPosition().y - (pentagone_topcrack.getBoundingBox().height)/2;
        
        if(water_val<pentagone_topcrack_cal && flag==0)
        {
            flag = 1;
            fish.node.stopAction(fish_tween_left);
            fish.node.stopAction(fish.action);
            
            var fish_tween_down = cc.MoveTo.create(2, cc.p(fish.node.getPosition().x, size.height*32/100));
            fish.node.runAction(fish_tween_down);
        }
        
        if(water_val<circle_val)
        {
            water_anim_circle.node.stopAction(water_anim_circle.action);
            this.removeChild(water_anim_circle.node); 
        }                
        
        if(water_val<circle_val && pentagone_leftcrack==null && circle_leftcrack!=null)
        {
            this.unscheduleUpdate();
            water.stopAction(water_tween);
            this.removeListener();
            
            extraLayer1 = new extraLayer(this);
            this.addChild(extraLayer1);
        }
        
        if(water_val<pentagone_val)
        {
            this.unscheduleUpdate();
            water.stopAction(water_tween);
            this.removeListener();
            
            water_anim_pentagone.node.stopAction(water_anim_pentagone.action);
            this.removeChild(water_anim_pentagone.node); 
            
            extraLayer1 = new extraLayer(this);
            this.addChild(extraLayer1);            
        }
    }
});

var extraLayer = cc.LayerColor.extend({
    
    refresh : null,
    size : null,
    callerObj : null,
    
    ctor : function(object){
        this._super(cc.color(0, 0, 0, 150));
        
        callerObj = object;
        size = cc.winSize;
        
        refresh = new eventListenerClick("Ref_button.png", callerObj);
        refresh.attr({
            x : size.width/2,
            y : size.height/2,
            anchorX : .5,
            anchorY : .5
        });
        this.addChild(refresh);
        refresh.id = "refresh";
    },    
});


var level1round2Scene = cc.Scene.extend({
    onEnter : function(){
        this._super();
        var layer = new level1Round2Layer();
        this.addChild(layer);
    } 
});