

var MovableItem2 = cc.Sprite.extend({
        
        ctor:function(imageFile, transparentSprite, that) {
            this._super();
            this.initWithFile(imageFile); 
            var transparentSprite = transparentSprite;

            var overlapped = 0;


var sprite_click = cc.EventListener.create({event: cc.EventListener.TOUCH_ONE_BY_ONE, swallowTouches: true,
  

  onTouchBegan :function(touch, event){

  	var target = event.getCurrentTarget();
    var location = target.convertToNodeSpace(touch.getLocation());
    var targetSize = target.getContentSize();
    var targetRectangle = cc.rect(0,0, target.width, target.height);

     if (cc.rectContainsPoint(targetRectangle, location)){return true;}
      
     return false;

  },

  onTouchMoved : function(touch, event){

  	 var target = event.getCurrentTarget();
         
         var location = target.convertToNodeSpace(touch.getLocation());
		target.setPosition(touch.getLocation());  

        var toyRect = target.getBoundingBox();
        var toytRect = transparentSprite.getBoundingBox();
 
        if(cc.rectIntersectsRect(toyRect, toytRect) && target.id == that.counterLevel2){
           
            var x = transparentSprite.getPosition().x;
            var y = transparentSprite.getPosition().y;
            target.setPosition(x, y);

            this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.comedyBubble_mp3);


            overlapped = 1;
            that.counterLevel2++;
             
            cc.eventManager.removeListener(this);
         

            
        }
           

               
  },

  onTouchEnded : function(touch, event){

  		var target = event.getCurrentTarget();
         
         var location = target.convertToNodeSpace(touch.getLocation());
                 
         
                 var toy = target.getContentSize();
                 var rectToy = cc.rect(0, 0, target.width, target.height);
                 if (cc.rectContainsPoint(rectToy, location) && overlapped==0) { var toy = cc.MoveTo.create(2,cc.p(target.xP,target.yP));
        target.runAction(toy);this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.failure_mp3);
return true;}

  }   

});            
            cc.eventManager.addListener(sprite_click, this);
                       
        }
    });


