/// <reference path="../../src/cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />

var xc = xc || {};

xc.TrainLayer = cc.Layer.extend({

    size : null,
    self : null,
    random : null,
    _height : null,
    tunnel_front_sprite : null,
    tunnel_back_sprite : null,
    randomLetter : null,
    storedLetter : null,
    train : null,
    final_tunnel : null,
    
    ctor: function () {
        this._super();
        
        size = cc.winSize;
        self = this;
        
        tunnel_front_sprite = new Array();        
        tunnel_back_sprite = new Array();
        randomLetter = new Array();        
        storedLetter = new Array();



var listener = cc.EventListener.create({
    event : cc.EventListener.TOUCH_ONE_BY_ONE,
    swallowTouches : true,
    
    onTouchBegan : function(touch, event)
    {
        var target = event.getCurrentTarget();
        var locationInNode = target.convertToNodeSpace(touch.getLocation());
        var targetSize = target.getContentSize();
        var rect = cc.rect(0, 0, targetSize.width, targetSize.height);
        
        if(cc.rectContainsPoint(rect, locationInNode))
        {
            if(target.selected == 0)
            {
                for(var i = 0; i<tunnel_front_sprite.length; i++)
                {
                    if(tunnel_front_sprite[i].selected == 0 )
                    {
                        tunnel_front_sprite[i].selected = 1;
                        target.selected = 1;
                        target.pos = i;

                        var pos;                        
                        if(storedLetter.length==0)
                            pos = 0;
                        else
                            pos = storedLetter.length;
                            
                        if((randomLetter[pos] ==  target.id) && pos == i)
                        {                            
                            storedLetter.push(target.id);
                            cc.eventManager.removeListeners(target);

                            if(storedLetter.length == random)
                            {
                                var tunnel = tunnel_front_sprite[storedLetter.length-1];
                                var target_Action = cc.MoveTo.create(1, cc.p(tunnel_front_sprite[i].getPositionX(), tunnel_front_sprite[i].getPositionY()));
                                var train_Action = cc.MoveTo.create(1.5, cc.p(final_tunnel.getPositionX() + final_tunnel.getContentSize().width * 120 / 100 , tunnel.getPositionY()));
                                
                               var train_Action_function = function(){
                                            train.runAction(train_Action);
                                    };
                                
                                target.runAction(cc.sequence(target_Action, cc.callFunc(train_Action_function, this)));
                            }
                            else if(storedLetter.length % 3 !=0)
                            {
                                var tunnel = tunnel_front_sprite[storedLetter.length];
                                var target_Action = cc.MoveTo.create(1, cc.p(tunnel_front_sprite[i].getPositionX(), tunnel_front_sprite[i].getPositionY()));
                                var train_Action = cc.MoveTo.create(1.5, cc.p(tunnel.getPositionX() - tunnel.getContentSize().width * .70 , tunnel.getPositionY()));


                                var train_Action_function = function(){
                                            train.runAction(train_Action);
                                    };
                                
                                target.runAction(cc.sequence(target_Action, cc.callFunc(train_Action_function, this)));
                            }
                            else if(storedLetter.length % 3 ==0)
                            {
                                var tunnel = tunnel_front_sprite[storedLetter.length - 1];
                                var target_Action = cc.MoveTo.create(1, cc.p(tunnel_front_sprite[i].getPositionX(), tunnel_front_sprite[i].getPositionY()));
                                var train_Action = cc.MoveTo.create(1.5, cc.p(size.width * 120/100 , tunnel.getPositionY()));

                                var train_come = function()
                                {
/*                                    if(storedLetter.length == random)
                                    {
                                        var tunnel = tunnel_front_sprite[storedLetter.length-1];
                                        var target_Action = cc.MoveTo.create(1, cc.p(tunnel_front_sprite[i].getPositionX(), tunnel_front_sprite[i].getPositionY()));
                                        var train_Action = cc.MoveTo.create(1.5, cc.p(final_tunnel.getPositionX() + final_tunnel.getContentSize().width * 120 / 100 , tunnel.getPositionY()));
                                        
                                    var train_Action_function = function(){
                                                    train.runAction(train_Action);
                                            };
                                        
                                        target.runAction(cc.sequence(target_Action, cc.callFunc(train_Action_function, this)));
                                    }
                                    else
                                    {
*/                                        var tunnel = tunnel_front_sprite[storedLetter.length];
                                        train.setPosition(0, tunnel.getPositionY());
                                        train.runAction(cc.MoveTo.create(1, cc.p(tunnel.getPositionX() - tunnel.getContentSize().width * .75, tunnel.getPositionY())));
//                                    }

                                };

                                var train_Action_function = function(){
                                            train.runAction(cc.sequence(train_Action, cc.callFunc(train_come ,this)));
                                    };
                                
                                
                                target.runAction(cc.sequence(target_Action, cc.callFunc(train_Action_function, this)));
                            }
                        }
                        else
                            target.runAction(cc.MoveTo.create(1, cc.p(tunnel_front_sprite[i].getPositionX(), tunnel_front_sprite[i].getPositionY())));
                            
                        break;
                    }
                }
            }
            else if(target.selected == 1)
            {
                tunnel_front_sprite[target.pos].selected = 0;
                target.runAction(cc.MoveTo.create(1, cc.p(target.xP, target.yP)));
                target.selected = 0;
                target.pos = -1;
            }
            return true;
        }
        return false;
    }
});

        
        var background = ccs.load(xc.TrainLayer.res.train_json, xc.path);
        cc.log(xc);
        this.addChild(background.node);

        random = Math.floor((Math.random() * 9) +3);
        random = 4;
        var row = 0, temp = random;        
        
        while(temp>=3)
        {
            row++;
            temp-= 3;
        }
        
        if(temp>0)
            row++;
            
        _height =  (size.height *.40) / row;
        train = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("train/train.png"));
        train.attr({
            x : size.width * .06,
            y : (size.height * .53) + (_height * (row - 1 + .5)),
            anchorX : .5,
            anchorY : .5
        });
        this.addChild(train, 1); 
         
        temp = random; 
         
        for(var i = --row; i>=0; i--)
        {
            var y = _height * (i + .5);
            var col = ((temp/3) >=1 ? 3 : temp %3);
            var _width = (size.width * .90) / col;
            
            for(var j = 0; j<col; j++)
            {
                var tunnel_front = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("train/tunnel_front.png"));
                tunnel_front.attr({
                    x : size.width * .06 + (j + .5) * _width,
                    y : size.height *.53 + y,
                    anchorX : .5,
                    anchorY : .5
                });
                this.addChild(tunnel_front, 1);
                tunnel_front.selected = 0;
                
                var tunnel_back = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("train/tunnel_back.png"));
                tunnel_back.attr({
                    x : tunnel_front.getPositionX() + tunnel_front.getBoundingBox().width / 2,
                    y : tunnel_front.getPositionY(),
                    anchorX : .5,
                    anchorY : .5
                });
                this.addChild(tunnel_back, 0);
                tunnel_back.selected = 0;
                
                tunnel_front_sprite.push(tunnel_front);
                tunnel_back_sprite.push(tunnel_back);
            }
            temp-= 3;
        }
        
        final_tunnel = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("train/final_tunnel.png"));
        final_tunnel.attr({
            x : size.width * .99,
            y : tunnel_back_sprite[tunnel_back_sprite.length-1].getPositionY(),
            anchorX : .5,
            anchorY : .5
        });
        this.addChild(final_tunnel, 0);  

        var possible = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q'];
            
        for(var i = 0; i<random; i++)
        {            
            var char = possible[Math.floor(Math.random() * possible.length)];
            
            var label = new cc.LabelTTF(char, "Arial", 200);
            label.attr({
                x : Math.floor((Math.random() * (size.width * .90)) + (size.width * .10)),
                y : Math.floor((Math.random() * (size.height * .40)) + (size.height * .10))
            });
            this.addChild(label, 1); 
            label.id = char;
            label.selected = 0;
            label.pos = -1;
            label.xP = label.getPositionX();
            label.yP = label.getPositionY();
            
            randomLetter.push(char);
            
            possible.splice(possible.indexOf(char), 1);
            cc.eventManager.addListener(listener.clone(), label);
        }
        
        cc.log(randomLetter);

    }
    
    
});


var Train_Sprite_Touch = cc.Sprite.extend({
   
   ctor:function(imagefile, callerObject)
   {
       this._super(cc.spriteFrameCache.getSpriteFrame(imagefile));
       
var sprite_click = cc.EventListener.create({event: cc.EventListener.TOUCH_ONE_BY_ONE, swallowTouches:true,
    
    onTouchBegan : function(touch, event)
    {
        var target = event.getCurrentTarget();
        var location = target.convertToNodeSpace(touch.getLocation());
        var targetSize = target.getContentSize();
        var targetRect = cc.rect(0, 0, target.width, target.height);
        
        if(cc.rectContainsPoint(targetRect, location))
        {
            return true;
        }
        
        return false;
    },

    onTouchMove : function(touch, event)
    {
        
    },
    
    onTouchEnded : function(touch, event)
    {
        
    }
        
});
    
    cc.eventManager.addListener(sprite_click, this);
       
   }
    
});

xc.TrainLayer.res = {
        train_json : xc.path + "train/train.json",
        train_plist: xc.path + "train/train.plist"
};