var eventListenerClick = cc.Sprite.extend({
   ctor : function (sprite, callerObject) {
       this._super(cc.spriteFrameCache.getSpriteFrame(sprite));
       console.log(sprite);
//        this.initWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame(sprite));
 //       this.initWithFile(sprite);
       
       var sprite_click = cc.EventListener.create({event : cc.EventListener.TOUCH_ONE_BY_ONE, swallowTouches : true,
       onTouchBegan : function(touch, event)
       {
           var target = event.getCurrentTarget();
           var location = target.convertToNodeSpace(touch.getLocation());
           var targetSize = target.getContentSize();
           var targetRect = cc.rect(0, 0, target.width, target.height);
           
           if(cc.rectContainsPoint(targetRect, location))
           {
               if(target.id=="Level_1")
               {
                   callerObject.Level_1(1);
               }
               else if(target.id=="Level_2")
               {
                   var ls = cc.sys.localStorage;
                   callerObject.Level_2(1);
               }
               else if(target.id=="Level_3")
               {
                   callerObject.Level_3(0);
               }
               else if(target.id=="a_ball")
               {
                   callerObject.hitABall();
               }
               else if(target.id=="b_ball")
               {
                   callerObject.hitBBall();
               }
               else if(target.id=="c_ball")
               {
                   callerObject.hitCBall();
               }
               else if(target.id=="refresh")
               {
                   callerObject.updateLayer();
               }
           }
          return false;    
       }        
        
    });
cc.eventManager.addListener(sprite_click, this);
   }, 
});