var sortitMovableItem1 = cc.Sprite.extend({
        _enableFlag: true,
        ctor:function(imageFile, transparentSprite, that) {
            this._super(cc.spriteFrameCache.getSpriteFrame(imageFile));
            
            var transparentSprite = transparentSprite;
           
            var overlapped = 0;
 _enableFlag = true;

var sprite_click = cc.EventListener.create({event: cc.EventListener.TOUCH_ONE_BY_ONE, swallowTouches: true,
  

  onTouchBegan :function(touch, event){

      var target = event.getCurrentTarget();
    var location = target.convertToNodeSpace(touch.getLocation());
    var targetSize = target.getContentSize();
    var targetRectangle = cc.rect(0,0, target.width, target.height);

     if (cc.rectContainsPoint(targetRectangle, location) && _enableFlag){
         _enableFlag =false;
         return true;}
      
     return false;

  },

  onTouchMoved : function(touch, event){


       var target = event.getCurrentTarget();
         
         var location = target.convertToNodeSpace(touch.getLocation());
        target.setPosition(touch.getLocation());  

        var toyRect = target.getBoundingBox();
        var toytRect = transparentSprite.getBoundingBox();
 
        if(cc.rectIntersectsRect(toyRect, toytRect) && target.id == that.counterLevel1){
           
            
            if(that.counterLevel1 == 1){
                that.removeChild(that.help);
            }
            var x = transparentSprite.getPosition().x;
            var y = transparentSprite.getPosition().y;
            target.setPosition(x, y);
            _enableFlag =true;
            this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(xc.sortitlevel1Layer.res.comedyBubble_mp3);

            overlapped = 1;
            that.counterLevel1++;
            cc.eventManager.removeListener(this);
             if (that.counterLevel1 == 7) {
                     setTimeout(function(){
                         //xc.GameScene.load(xc.sortitlevel2Layer);
                         
                         /*
                         console.log("getpoints : " + that.menuContext.getPoints());
                         
                         if(that.menuContext.getPoints() < 0){
                             that.menuContext.addPoints(that.menuContext.getPoints() + Math.abs(that.menuContext.getPoints()));
                         }
                         	
						if(that.wrong>that.right/2){
                            console.log("right :" +  that.right + "wrong : " + that.wrong + " addpoints" + (0.33 * that.right));
							that.menuContext.addPoints(0.33 * that.right);
						}

						if(that.wrong<=that.right/2 && that.wrong!=0){
                            console.log("right :" +  that.right + "wrong : " + that.wrong + " addpoints" + (0.66 * that.right));
							that.menuContext.addPoints(0.66 * that.right);
						}

						if(that.wrong==0){
                            console.log("right :" +  that.right + "wrong : " + that.wrong + " addpoints" + (1 * that.right));
							that.menuContext.addPoints(that.right);
						}
                         */
                         
                         console.log("getpoints : " + that.menuContext.getMaxPoints() + "wroong :" + that.wrong);
                         if((that.menuContext.getMaxPoints() - that.wrong)<=0){
                             console.log("ghus gya ander");
                             that.menuContext.addPoints(that.menuContext.getMaxPoints() * 0.33);
                         }else{
                             that.menuContext.addPoints(that.menuContext.getMaxPoints() - that.wrong);
                             console.log("nikal gya bahar");
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
                 //if (cc.rectContainsPoint(rectToy, location) && overlapped==0) { 
                 if (overlapped==0) { 
                     that.wrong++;
                     
                     var toy = new cc.MoveTo(2,cc.p(target.xP,target.yP));
                    target.runAction(new cc.Sequence( toy, new cc.CallFunc(function(){ 
                    _enableFlag = true; }, this)));
                    this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(xc.sortitlevel1Layer.res.failure_mp3);
return true;}
      
      
  }   

});            
            cc.eventManager.addListener(sprite_click, this);
                       
        }
    });
