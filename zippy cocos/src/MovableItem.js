

var Movetile1 = cc.Sprite.extend({
         activeTile1 : [],
         activeTile2 : [],
            ctor:function(imageFile,  abc) {
            this._super(cc.spriteFrameCache.getSpriteFrame(imageFile));
            cc.log(imageFile);
          //  this.initWithFile(cc.spriteFrameCache.getSpriteFrame(imageFile)); 
            tileGrid = abc,
            overlapped = 0;
         

var sprite_click = cc.EventListener.create({event: cc.EventListener.TOUCH_ONE_BY_ONE, swallowTouches: true,
  
  
  onTouchBegan: function(touch, event){
         var target = event.getCurrentTarget();
         activeTile1 = [];
         activeTile1.push(target.getPosition());
         cc.log(activeTile1);
         var location = target.convertToNodeSpace(touch.getLocation());
         var targetSize = target.getContentSize();
         var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);
         if (cc.rectContainsPoint(targetRectangle, location))
                   {
                          cc.log("hfhf");
                          return true;
                             }
                         //    return true;
     },
 
 onTouchMoved: function (touch, event){
     var target = event.getCurrentTarget();
         console.log("start");
      target.setPosition(touch.getLocation().x, touch.getLocation().y);
         var location = target.convertToNodeSpace(touch.getLocation());
 },
  onTouchEnded : function (touch,event){
      var target = event.getCurrentTarget();
      //   console.log("start");
        // activeTile2.push(target.getPosition());
       //  console.log("activeTile2 = "+activeTile2);
         var x = (((target.getPosition().x* 1280)/cc.winSize.width)- 400);
         var y = (((target.getPosition().y * 800)/cc.winSize.height) - 75);
         cc.log("x = "+ (x+400) + "y = "+ (y+75));
         var i = Math.round(x/(170));
         var j = Math.round(y/(130));
        
         cc.log("i = "+i);
         cc.log("j = "+j);
         
     
      
       
       // swap array
       var xx = Math.round((((activeTile1[0].x* 1280)/cc.winSize.width)- 400)/170);
       var yy = Math.round((((activeTile1[0].y* 800)/cc.winSize.height) - 75)/130);
       console.log("xx ="+ xx);
       console.log("yy ="+ yy);
 
    // cc.log(tileGrid[j][i].id);
    if(((target.x > (400/1280)*cc.winSize.width) && (target.x < (1080/1280)*cc.winSize.width)) && ((target.y > (75/800)*cc.winSize.height) && (target.y < ((595/800)*cc.winSize.height)))){
       
       if (( Math.abs(i-xx) == 1 && Math.abs(j-yy) == 0) || ( Math.abs(i-xx) == 0 && Math.abs(j-yy) == 1))
       {
           
           cc.log("mmm");
       tileGrid[j][i].x = activeTile1[0].x;
       tileGrid[j][i].y = activeTile1[0].y;
       
         var temp = tileGrid[j][i];
       tileGrid[yy] [xx].x = (((i* 170)+400)/1280)*cc.winSize.width;
       tileGrid[yy] [xx].y = (((j* 130)+75)/800)*cc.winSize.height;
       tileGrid[j][i] = tileGrid[yy][xx];
       tileGrid[yy][xx] = temp;
       }
       else{
           target.x = activeTile1[0].x;
           target.y = activeTile1[0].y;
       }
       
      
       }
       else{
           target.x = activeTile1[0].x;
           target.y = activeTile1[0].y;
       }
    return false;
  }
    //   onTouchBegan :function(touch, event){
                       
//                         var target = event.getCurrentTarget();
//                         cc.log(target.getPosition());
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
                        
                       
//                      },
                     
              

//    onTouchMoved : function(touch, event){
//                                    var target = event.getCurrentTarget();
//                                    var location = target.convertToNodeSpace(touch.getLocation());
//                                    target.setPosition(touch.getLocation());  
                                 
//                                   //onTop(target);
//                                   //posupdate(target);
                       
                                  
//                                    finalFlag = false;
//                                    overlapped = 0;
                        
//                                   target.setPosition(touch.getLocation());  
                         
//                                //   var ansSquareBox = target.getBoundingBox();
                          
//   },

//   onTouchEnded : function(touch, event){
                  
                                        
//                 var target = event.getCurrentTarget();
//                 var location = target.convertToNodeSpace(touch.getLocation());
//                 var targetSize = target.getContentSize();
//                 var targetRectBound = cc.rect(0, 0, target.width, target.height);
                
//                             cc.log(target.id);
//                             target.setPosition(touch.getLocation());  
                         
//                             var ansSquareBox = target.getBoundingBox();
//                             var flag =0;
                           
                   
                      
//                         if(cc.rectIntersectsRect(ansSquareBox ,targetSquareBox1[target.id - 1]))
//                       {
                          
//                           if(!finalFlag)
//                           {
                             
//                               cc.log(alphadino1[target.id -1]);
//                               var x = alphadino1[target.id -1].x;
//                               var y = alphadino1[target.id -1].y;
//                               target.setPosition(x,y);
//                               dinoscore ++;
//                              // target.setPosition(alphadino1[target.id -1])
//                             //  overlapHandling(target,i);
//                               finalFlag = true;
//                               return;
//                           }
//                       }
                    
          
//                  if ((cc.rectContainsPoint(targetRectBound, location)) && (overlapped == 0) )
//                  {
//                                 var x = originalPosition1[0].x;
//                                 var y = originalPosition1[0].y;
//                                 cc.log("x = "+x);
//                                        var tweenB = cc.MoveTo.create(1.2,cc.p(x, y))
//                                        target.runAction(tweenB);
                                                          
//                                     }

//                                 }   

});            
            cc.eventManager.addListener(sprite_click, this);
                       
        }
    });


