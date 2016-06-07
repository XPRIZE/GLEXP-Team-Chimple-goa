/// <reference path="../../cocos2d-typescript-definitions/cocos2d/cocos2d-lib.d.ts" />

var HelloWorldLayer = cc.Layer.extend({
    
    car : null,
    left_tyre : null,
    right_tyre : null,
    car_tween : null,
    left_tyre_tween : null,
    right_tyre_tween : null,
    
    
    t_char : null,
    w_char : null,
    i_char : null,
    n_char : null,
    
    matching : null,
    matching_tween : null,
    
    tmp : null,
    self : null,
    size : null,
    
    right_repeat_action : null,
    left_repeat_action : null,
    
    t_tween : null,
    w_tween : null,
    i_tween : null,
    n_tween : null,
    
    ctor:function () {
        this._super();

        size = cc.winSize;
        self = this;
        
        this.backGround = new cc.Sprite(res.Loading_background);
        this.backGround.attr({
           x : size.width/2,
           y : size.height/2,
           anchorX : .5,
           anchorY : .5, 
        });
        this.addChild(this.backGround);
                

        car = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Bus.png"));
        car.attr({
           x : size.width*-10/100,
           y : size.height/2,
           anchorX : .5,
           anchorY : .5, 
        });
        this.addChild(car);
        
        left_tyre = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Bus_tyre.png"));
        left_tyre.attr({
           x : size.width*-23.8/100,
           y : size.height*34.7/100,
           anchorX : .5,
           anchorY : .5, 
        });
        this.addChild(left_tyre);
        
        right_tyre = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Bus_tyre.png"));
        right_tyre.attr({
           x : size.width*6.9/100,
           y : size.height*34.7/100,
           anchorX : .5,
           anchorY : .5, 
        });
        this.addChild(right_tyre);

        matching = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Matching.png"));
        matching.attr({
           x : size.width*46.5/100,
           y : size.height+200,
           anchorX : .5,
           anchorY : .5, 
        });
        this.addChild(matching);
        
        t_char = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("T.png"));
        t_char.attr({
           x : size.width*35/100,
           y : size.height*50/100,
           anchorX : .5,
           anchorY : .5,
           opacity : 0, 
        });
        this.addChild(t_char);
        
        w_char = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("W.png"));
        w_char.attr({
           x : size.width*43/100,
           y : size.height*50/100,
           anchorX : .5,
           anchorY : .5, 
           opacity : 0,
        });
        this.addChild(w_char);
        
        i_char = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("I.png"));
        i_char.attr({
           x : size.width*51/100,
           y : size.height*50/100,
           anchorX : .5,
           anchorY : .5, 
           opacity : 0,
        });
        this.addChild(i_char);
        
        n_char = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("N.png"));
        n_char.attr({
           x : size.width*59/100,
           y : size.height*50/100,
           anchorX : .5,
           anchorY : .5, 
           opacity : 0,
        });
        this.addChild(n_char);
        
        
        car_tween = cc.MoveTo.create(2, cc.p(size.width/2, size.height/2));
        right_tyre_tween = cc.MoveTo.create(2, cc.p(size.width*66.9/100, size.height*34.7/100));
        left_tyre_tween = cc.MoveTo.create(2, cc.p(size.width*36.2/100, size.height*34.7/100));
        right_repeat_action = cc.Repeat.create(cc.RotateBy.create(2,360),3);
        left_repeat_action = cc.Repeat.create(cc.RotateBy.create(2,360),3);
        
        car.runAction(cc.sequence(car_tween, cc.callFunc(this.matching_tween_function, this)));
        left_tyre.runAction(left_tyre_tween);
        right_tyre.runAction(right_tyre_tween);        
        left_tyre.runAction(left_repeat_action);
        right_tyre.runAction(right_repeat_action);
        
        return true;
    },
    
    update : function ()
    {
//        if(tmp.)
    },
    
    matching_tween_function : function()
    {
        right_tyre.stopAction(right_repeat_action);
        left_tyre.stopAction(left_repeat_action);
        matching_tween = cc.MoveTo.create(.5, cc.p(size.width*46.5/100, size.height*67.5/100));
        matching.runAction(cc.sequence(matching_tween, cc.callFunc(this.char_visible, this)));
    },
    
    char_visible : function()
    {
        setTimeout(function(){
            t_char.opacity = 255;
            
            setTimeout(function(){
                w_char.opacity = 255;
                
                setTimeout(function() {
                    i_char.opacity = 255;
                    
                    setTimeout(function() {
                        n_char.opacity = 255;
                        self.after_Animation();
                    }, 100);
                }, 100);
            }, 100);
        }, 100);        
    },
    
    after_Animation : function ()
    {
        car_tween = cc.MoveTo.create(2, cc.p(size.width*140/100, size.height/2));
        right_tyre_tween = cc.MoveTo.create(2, cc.p(size.width*156.9/100, size.height*34.7/100));
        left_tyre_tween = cc.MoveTo.create(2, cc.p(size.width*126.2/100, size.height*34.7/100));
        matching_tween = cc.MoveTo.create(2, cc.p(size.width*136.5/100, size.height*67.5/100));
        left_repeat_action = cc.Repeat.create(cc.RotateBy.create(2,360),3);
        right_repeat_action = cc.Repeat.create(cc.RotateBy.create(2,360),3);

        t_tween = cc.MoveTo.create(2, cc.p(size.width*125/100, size.height/2));
        w_tween = cc.MoveTo.create(2, cc.p(size.width*133/100, size.height/2));
        i_tween = cc.MoveTo.create(2, cc.p(size.width*141/100, size.height/2));
        n_tween = cc.MoveTo.create(2, cc.p(size.width*149/100, size.height/2));
        
        
        car.runAction(car_tween);
        left_tyre.runAction(left_tyre_tween);
        right_tyre.runAction(right_tyre_tween);
        left_tyre.runAction(left_repeat_action);
        right_tyre.runAction(right_repeat_action);
        matching.runAction(cc.sequence(matching_tween, cc.callFunc(this.nextPage, this)));
        
        t_char.runAction(t_tween);
        w_char.runAction(w_tween);
        i_char.runAction(i_tween);
        n_char.runAction(n_tween);
    },
    
    nextPage : function ()
    {
        cc.director.runScene(new LevelStateScene());
    }
    
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

