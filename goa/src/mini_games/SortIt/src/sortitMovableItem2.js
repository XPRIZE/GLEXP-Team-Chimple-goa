

var sortitMovableItem2 = cc.Sprite.extend({
        _enableFlag: true,
        ctor:function(imageFile, transparentSprite, that) {
            
            this._super(cc.spriteFrameCache.getSpriteFrame(imageFile));
            
            var transparentSprite = transparentSprite;

            var overlapped = 0;

_enableFlag: true;
var sprite_click = cc.EventListener.create({event: cc.EventListener.TOUCH_ONE_BY_ONE, swallowTouches: true,
  

  onTouchBegan :function(touch, event){

  	var target = event.getCurrentTarget();
    var location = target.convertToNodeSpace(touch.getLocation());
    var targetSize = target.getContentSize();
    var targetRectangle = cc.rect(0,0, target.width, target.height);

     if (cc.rectContainsPoint(targetRectangle, location) && target._enableFlag){
         target._enableFlag =false;
         return true;}
      
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
             target._enableFlag =true;
            this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(xc.sortitlevel1Layer.res.comedyBubble_mp3);


            overlapped = 1;
            that.counterLevel2++;
            cc.eventManager.removeListener(this);
             if (that.counterLevel2 == 6) {
              
                    
                    
                  setTimeout(function(){
                         //xc.GameScene.load(xc.sortitlevel3Layer);
                      /*
                     	if(that.wrong>that.right/2){
							that.menuContext.addPoints(0.33 * that.right);
						}

						if(that.wrong<=that.right/2 && that.wrong!=0){
							that.menuContext.addPoints(0.66 * that.right);
						}

						if(that.wrong==0){
							that.menuContext.addPoints(that.right);
						}
                      */
                      
                       if((that.menuContext.getMaxPoints() - that.wrong)<=0){
                            
                             that.menuContext.addPoints(that.menuContext.getMaxPoints() * 0.33);
                         }else{
                             that.menuContext.addPoints(that.menuContext.getMaxPoints() - that.wrong);
                            
                         }
                       that.menuContext.showScore();
                     },1000);

                }
            
         

            
        }
           

               
  },

  onTouchEnded : function(touch, event){

  		var target = event.getCurrentTarget();
         
         var location = target.convertToNodeSpace(touch.getLocation());
                 
         
                 var toy = target.getContentSize();
                 var rectToy = cc.rect(0, 0, target.width, target.height);
                 if ( overlapped==0) { 
                     that.wrong++;
                     
                     var toy = cc.MoveTo.create(2,cc.p(target.xP,target.yP));
       target.runAction(new cc.Sequence( toy, new cc.CallFunc(function(){ 
                    target._enableFlag = true; }, this)));this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(xc.sortitlevel1Layer.res.failure_mp3);
return true;}

  }   

});            
            cc.eventManager.addListener(sprite_click, this);
                       
        }
    });


