/// <reference path="../../cocos2d-typescript-definitions/cocos2d/cocos2d-lib.d.ts" />

var level1Round1Layer = cc.Layer.extend({
    
    backGround : null,
    water : null,
    crack : null,
    cube : null,
    leftcrack : null,
    rightcrack : null,
    topcrack : null,
    bottomcrack : null,    
    crack_tween : null,
    size : null,
    self : null,
    water_tween : null,
    i : 0,
    callerObject : null,
    extraLayer1 : null,
    
    fish_tween_left : null,
    fish_tween_right : null,
    flag : 0,
    fish : null,
    water_anim : null,
    
    ctor : function(object){
        this._super();
        size = cc.winSize;
        self = this;
        callerObject = object;
        i = 0;
        flag = 0;
        
        cc.spriteFrameCache.addSpriteFrames(res.Game_screen_01_plist);
        
        backGround = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Background_level_01.png"));
        backGround.attr({
                x : size.width/2,
                y : size.height/2,
                anchorX : .5,
                anchorY : .5 
        });
        this.addChild(backGround);
        
        water = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Water_01.png"), this);
        water.attr({
                x : size.width*51/100,
                y : size.height*26/100,
                anchorX : .5,
                anchorY : 0 
        });
        this.addChild(water);
        
        crack = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Shape_Trans.png"), this);
        crack.attr({
                x : size.width*51/100,
                y : size.height*55/100,
                anchorX : .5,
                anchorY : .5 
        });
        this.addChild(crack);
        crack.id = "crack";        
        
        
        cube = new eventListenerClass("Cube.png", crack, this);
        cube.attr({
                x : size.width*51/100,
                y : size.height*55/100,
                anchorX : .5,
                anchorY : .5 
        });
        this.addChild(cube);
        cube.id = "cube";
        cube.xP = size.width*51/100;
        cube.yP = size.height*21/100;
        
        leftcrack = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Left_Crack.png"));
        leftcrack.attr({
                x : size.width*45/100,
                y : size.height*54/100,
                anchorX : .5,
                anchorY : .5,
                opacity : 0 
        });
        this.addChild(leftcrack);
        
        rightcrack = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Right_Crack.png"));
        rightcrack.attr({
                x : size.width*57/100,
                y : size.height*54/100,
                anchorX : .5,
                anchorY : .5,
                opacity : 0
        });
        this.addChild(rightcrack);
        
        topcrack = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Top_Crack.png"));
        topcrack.attr({
                x : size.width*50/100,
                y : size.height*62/100,
                anchorX : .5,
                anchorY : .5,
                opacity : 0
        });
        this.addChild(topcrack);
        
        bottomcrack = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Bottom_Crack.png"));
        bottomcrack.attr({
                x : size.width*50/100,
                y : size.height*48/100,
                anchorX : .5,
                anchorY : .5,
                opacity : 0
        });
        this.addChild(bottomcrack);

        fish = ccs.load(res.fish_json);
        fish.node.attr({
            x : size.width*85/100,
            y : size.height*55/100,
            anchorX : 0,
            anchorY : 0
        });
        this.addChild(fish.node);

        fish.node.runAction(fish.action);
        fish.action.play("Fish_animation", true);
        
        water_anim = ccs.load(res.Water_json);
        water_anim.node.attr({
            x : size.width*43/100,
            y : size.height*70/100,
            anchorX : .5,
            anchorY : .5
        });
        this.addChild(water_anim.node);

        water_anim.node.runAction(water_anim.action);
        water_anim.action.play("water_animation", true);

        fish_tween_left = cc.MoveTo.create(5, cc.p(size.width*15/100, size.height*55/100));
        fish.node.runAction(cc.sequence(fish_tween_left, cc.callFunc(this.rotateFish, this)));

        this.carck_come();
        this.scheduleUpdate();
    },
    
    rotateFish : function ()
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
        var topcrack_tween = cc.FadeTo.create(1, 255);
        topcrack.runAction(cc.sequence(topcrack_tween, cc.callFunc(this.crack_tween_Action, this)));
        
        var bottomcrack_tween = cc.FadeTo.create(1, 255);
        bottomcrack.runAction(bottomcrack_tween);
        
        var leftcrack_tween = cc.FadeTo.create(1, 255);
        leftcrack.runAction(leftcrack_tween);
        
        var rightcrack_tween = cc.FadeTo.create(1, 255);
        rightcrack.runAction(rightcrack_tween);
    },
    
    crack_tween_Action : function ()
    {
        var cube_tween = cc.MoveTo.create(1, cc.p(size.width*51/100, size.height*21/100));
        cube.runAction(cube_tween);
        
        var scale_tween = cc.ScaleBy.create(25, 1, -.01)
        water_tween = cc.Repeat.create(scale_tween, 3);
        water_tween.setTag(1);
        water.runAction(water_tween);
    },
    
    cubeSetOnPosition : function(object, x_position, y_position)
    {
         var sprite = cc.MoveTo.create(.5, cc.p(x_position,y_position));
         object.runAction(cc.sequence(sprite , cc.callFunc(this.removeCrack, this)));
    },
    
    removeCrack : function ()
    {        
        this.removeChild(leftcrack);
        this.removeChild(rightcrack);
        this.removeChild(topcrack);
        this.removeChild(bottomcrack);
        water.stopAction(water_tween);
        this.unscheduleUpdate();
        
        if(flag==0)
        {
            this.parent.removeChild(this);
            callerObject.Level_1(2);
        }
        else
        {
            extraLayer1 = new extraLayer2(this);
            this.addChild(extraLayer1);
        }
    },
  
    removeListener : function ()
    {
        cc.eventManager.removeListeners(cube);
    },
    
    updateLayer : function()
    {
        this.removeChild(extraLayer1);
        this.parent.removeChild(this);
        callerObject.Level_1(1);
    },
        
    update : function ()
    {
        var val = crack.getPosition().y - (crack.getBoundingBox().height)/2;
        var val1 = water.getPosition().y + (water.getBoundingBox().height);
        var rightcrack_val = rightcrack.getPosition().y + (rightcrack.getBoundingBox().height)/4;
        
        if(val1<rightcrack_val && flag==0)
        {
            flag = 1;
            fish.node.stopAction(fish_tween_right);
            fish.node.stopAction(fish.action);
            
            var fish_tween_down = cc.MoveTo.create(2, cc.p(fish.node.getPosition().x, size.height*32/100));
            fish.node.runAction(fish_tween_down);
        }
        
        if(val1<val)
        {
            this.unscheduleUpdate();
            water.stopAction(water_tween);
            this.removeListener();
            
            water_anim.node.stopAction(water_anim.action);
            this.removeChild(water_anim.node);
            
            extraLayer1 = new extraLayer2(this);
            this.addChild(extraLayer1);
            
        }
    }
});

var extraLayer2 = cc.LayerColor.extend({
    
    refresh : null,
    size : null,
    callerObj : null,
    
    ctor : function(object){
        this._super(cc.color(0, 0, 0, 150));
        
        callerObj = object;
        size = cc.winSize;
        
        refresh = new eventListenerClick("Ref_button.png" , callerObj);
        refresh.attr({
            x : size.width/2,
            y : size.height/2,
            anchorX : .5,
            anchorY : .5
        });
        this.addChild(refresh);
        refresh.id = "refresh";
    },
    
    refresh_Button_Function : function()
    {
        callerObj.updateLayer();
    }
});


var level1round1Scene = cc.Scene.extend({
    onEnter : function(){
        this._super();
        var layer = new level1Round1Layer();
        this.addChild(layer);
    } 
});