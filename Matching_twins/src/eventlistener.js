var eventListenerClass  = cc.Sprite.extend({
   
   sprite_click : null,
   self : null,
   ctor : function(imageFile, transparentSprite, callerObject)
   {
       this._super(cc.spriteFrameCache.getSpriteFrame(imageFile));
//       this.initWithSpriteFrame(imageFile);
       self = this;
       
       var transparentSprite = transparentSprite;
       
        var overlapped = 0;
       
        sprite_click = cc.EventListener.create({event : cc.EventListener.TOUCH_ONE_BY_ONE, swallowTouches : true,
            
            onTouchBegan : function(touch, event){
                
                var target = event.getCurrentTarget();
                var location = target.convertToNodeSpace(touch.getLocation());
                var targetSize = target.getContentSize();
                var targetRectangle = cc.rect(0,0, target.width, target.height);
                if (cc.rectContainsPoint(targetRectangle, location))
                {return true;}

                return false;
            },
            
            onTouchMoved : function(touch, event)
            {
                var target = event.getCurrentTarget();
                var location = target.convertToNodeSpace(touch.getLocation());
                target.setPosition(touch.getLocation());
                
                var spriteRect = target.getBoundingBox();
                var transSpriteRect = transparentSprite.getBoundingBox();

                if(cc.rectIntersectsRect(spriteRect, transSpriteRect) && target.id=="cube")
                {
                    var x = transparentSprite.getPosition().x;
                    var y = transparentSprite.getPosition().y;
                    overlapped = 1;
                    cc.eventManager.removeListener(this);
                    callerObject.cubeSetOnPosition(target, x, y); 
                }
                else if(cc.rectIntersectsRect(spriteRect, transSpriteRect) && target.id=="circle")
                {
                    var x = transparentSprite.getPosition().x;
                    var y = transparentSprite.getPosition().y;
                    overlapped = 1;
                    cc.eventManager.removeListener(this);
                    callerObject.circleSetOnPosition(target, x, y);
  
/*                    var sprite = cc.MoveTo.create(.5, cc.p(x,y));
                    console.log(transparentSprite.parent);
                    target.runAction(cc.sequence(sprite , cc.callFunc(callerObject.cubeSetOnPosition, callerObject)));
                    cc.eventManager.removeListener(this);*/
                }
                else if(cc.rectIntersectsRect(spriteRect, transSpriteRect) && target.id=="pentagone")
                {
                    var x = transparentSprite.getPosition().x;
                    var y = transparentSprite.getPosition().y;
                    overlapped = 1;
                    cc.eventManager.removeListener(this);
                    callerObject.pentagoneSetOnPosition(target, x, y);
                }
                else if(cc.rectIntersectsRect(spriteRect, transSpriteRect) && target.id=="coin_1" && callerObject.counter==0)
                {
                    var x = transparentSprite.getPosition().x;
                    var y = transparentSprite.getPosition().y;
  
                    var sprite = cc.MoveTo.create(.5, cc.p(x,y));
                    target.runAction(sprite);
                    
                    cc.eventManager.removeListener(this);
                    callerObject.weight_uper_tween_right_start();
                    callerObject.counter++;
                    transparentSprite.setOpacity(0);
                    overlapped = 1;
                }
                else if(cc.rectIntersectsRect(spriteRect, transSpriteRect) && target.id=="coin_2" && callerObject.counter==1)
                {
                    var x = transparentSprite.getPosition().x;
                    var y = transparentSprite.getPosition().y;
  
                    var sprite = cc.MoveTo.create(.5, cc.p(x,y));
                    target.runAction(sprite);
                    
                    cc.eventManager.removeListener(this);
                    callerObject.weight_uper_tween_right_start();
                    callerObject.counter++;
                    transparentSprite.setOpacity(0);
                    overlapped = 1;
                }
                else if(cc.rectIntersectsRect(spriteRect, transSpriteRect) && target.id=="coin_3" && callerObject.counter==2)
                {
                    var x = transparentSprite.getPosition().x;
                    var y = transparentSprite.getPosition().y;
  
                    var sprite = cc.MoveTo.create(.5, cc.p(x,y));
                    target.runAction(sprite);
                    
                    cc.eventManager.removeListener(this);
                    callerObject.weight_uper_tween_right_start();
            //        callerObject.counter++;
                    transparentSprite.setOpacity(0);
                    overlapped = 1;
                }
            },
            
            onTouchEnded : function(touch, event)
            {
                var target = event.getCurrentTarget();
                var location = target.convertToNodeSpace(touch.getLocation());
                var sprite = target.getContentSize();
                var rectSprite = cc.rect(0, 0, target.width, target.height);
                if(cc.rectContainsPoint(rectSprite,  location) && overlapped==0)
                {
                    var sprite = cc.MoveTo.create(.2, cc.p(target.xP, target.yP));
                    target.runAction(sprite);
                    return true;
                }
            }
            });
       cc.eventManager.addListener(sprite_click, this);
   }
      
});