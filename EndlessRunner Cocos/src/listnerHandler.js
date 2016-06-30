var ClickedButtonToRedirect = cc.Sprite.extend({
        
        ctor:function(imageFile , contextClass){
            this._super();
            this.initWithFile(imageFile);
            
            var sprite_click = cc.EventListener.create({event: cc.EventListener.TOUCH_ONE_BY_ONE, swallowTouches: true,

                
              onTouchBegan :function(touch, event){

                var target = event.getCurrentTarget();
                var location = target.convertToNodeSpace(touch.getLocation());
                var targetSize = target.getContentSize();
                var targetRectangle = cc.rect(0,0, target.width, target.height);

                if (cc.rectContainsPoint(targetRectangle, location)){
               
                }
                
                if(cc.rectIntersectsRect(target, toy1tRect)){

                }
   
                return false;
              }
          });
          cc.eventManager.addListener(sprite_click, this);
         
       }
   });