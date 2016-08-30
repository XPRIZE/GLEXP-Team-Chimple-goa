// var finalFlag = false, overlapped = null ;
// var originalPosition1 = [];
// var MovableItem = cc.Sprite.extend({
// rotates: null,
// Level:0,
// ctor:function(imageFile,score,actionele,max) 
//   {
//             this._super(cc.spriteFrameCache.getSpriteFrame(imageFile));
//             Level=max;
//             cc.log(max);
//             rotates= actionele;
//             dinoscore = score;
//             overlapped = 0;
 
//  var sprite_click = cc.EventListener.create({event: cc.EventListener.TOUCH_ONE_BY_ONE, swallowTouches: true,
  
// onTouchBegan :function(touch, event){
                       
//                         var target = event.getCurrentTarget();
//                         originalPosition1 = [];
//                         originalPosition1.push(target.getPosition());
//                         var location = target.convertToNodeSpace(touch.getLocation());
//                         var targetSize = target.getContentSize();
//                         var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.
//                         height);
//                         if(cc.rectContainsPoint(targetRectangle, location)) 
//                         {
//                                   return true;
//                         }
//                       },
//  onTouchMoved : function(touch, event)
//    {
//                                    var target = event.getCurrentTarget();
//                                    var location = target.convertToNodeSpace(touch.getLocation());
//                                    target.setPosition(touch.getLocation());  
//                                    finalFlag = false;
//                                    overlapped = 0;
//     },

//   onTouchEnded : function(touch, event)
//   {
//                 var target = event.getCurrentTarget();
//                 var location = target.convertToNodeSpace(touch.getLocation());
//                 var targetSize = target.getContentSize();
//                 var targetRectBound = cc.rect(0, 0, target.width, target.height);
//                 target.setPosition(touch.getLocation());  
//                  var ansSquareBox = target.getBoundingBox();
//                  var flag =0;
//                  if(cc.rectIntersectsRect(ansSquareBox ,targetSquareBox1[target.id - 1]))
//                   {
//                       if(!finalFlag)
//                     {
//                         if(Level == 2 || Level == 3){
//                         if(target.id == (dinoscore+1)){
//                             if(Level ==2)
//                             {
//                                 target.stopAction(rotates);  
//                             }
//                         var x = alphadino1[target.id -1].x;
//                         var y = alphadino1[target.id -1].y;
//                         target.setPosition(x,y);
//                         dinoscore ++;
//                         finalFlag = true;
//                         cc.eventManager.removeListener(this);
//                         return false;
//                     }
//                     else{
//                         var x = originalPosition1[0].x;
//                         var y = originalPosition1[0].y;
//                         var tweenB = cc.MoveTo.create(1.2,cc.p(x, y))
//                         target.runAction(tweenB);
//                         return false;
//                     }
//                     }
//                     else
//                     {
//                        var x = alphadino1[target.id -1].x;
//                        var y = alphadino1[target.id -1].y;
//                         target.setPosition(x,y);
//                         dinoscore ++;
//                         finalFlag = true;
//                         cc.eventManager.removeListener(this);
//                         return false;
//                         }
//                         }
//                       }
//                      if ((cc.rectContainsPoint(targetRectBound, location)) && (overlapped == 0) )
//                  {
//                     var x = originalPosition1[0].x;
//                     var y = originalPosition1[0].y;
//                     cc.log("x = "+x);
//                     cc.log("y = "+y)
//                     var tweenB = cc.MoveTo.create(1.2,cc.p(x, y))
//                     target.runAction(tweenB);
//                      }
//                    }   
// });            
//             cc.eventManager.addListener(sprite_click, this);
//          }
//     });