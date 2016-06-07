

var ClickableItem = cc.Sprite.extend({
        self: null,
        calleeThis: null,
        ctor:function(imageFile, name, id, that) {
            this._super();
            this.initWithFile(imageFile); 
           
            self = this;
            calleeThis = that;
            
             

var sprite_click = cc.EventListener.create({event: cc.EventListener.TOUCH_ONE_BY_ONE, swallowTouches: true,
  

  onTouchBegan :function(touch, event){

  	var target = event.getCurrentTarget();
    var location = target.convertToNodeSpace(touch.getLocation());
    var targetSize = target.getContentSize();
    var targetRectangle = cc.rect(0,0, target.width, target.height);
    
     if (cc.rectContainsPoint(targetRectangle, location)){
         
         
        if(name == "volume" && calleeThis.volumeFlag == 1){ /*calleeThis.gameFace.pauseMusic(); calleeThis.volumeFlag = 0; */}        
        
        if(name == "mute" && calleeThis.volumeFlag == 0){ /*calleeThis.gameFace.resumeMusic(); calleeThis.volumeFlag = 1; */}
          
        if(name == "shadow"){ self.onDownShadow(touch, target);}  
        
        
        if(name == "nextLevel"){
                
                calleeThis.setGlobalVaribalesToZero();
               // calleeThis.gameFace.stopMusic();
                
                
                  ++sceneId;
                  if(sceneId == 26){sceneId=0;}
                  
                  cc.director.runScene(new Scene(
                       
                       Data[sceneId][0], 
                       Data[sceneId][1], 
                       Data[sceneId][2],
                       Data[sceneId][3],
                       Data[sceneId][4],
                       Data[sceneId][5],
                       Data[sceneId][6][0],
                       Data[sceneId][6][1],
                       Data[sceneId][7][0],
                       Data[sceneId][7][1]
                        
                    ));
                
        }  
        
        if(name == "object"){
            
            switch(id){
                
                
                case 0 :calleeThis.resetSpriteFlag(); 
                        calleeThis.clearActiveFlags(); 
                        calleeThis.setColorFlagToZero(); 
                        calleeThis.colorBoxes[0].flag = 1 ; 
                        calleeThis.rightObjects[0].flag = 1; 
                        calleeThis.ObjectClicked++;  
                        calleeThis.id = 0;
                        break;
                case 1 :calleeThis.resetSpriteFlag(); 
                        calleeThis.clearActiveFlags(); 
                        calleeThis.setColorFlagToZero(); 
                        calleeThis.colorBoxes[1].flag = 1 ;
                        calleeThis.rightObjects[1].flag = 1; 
                        calleeThis.ObjectClicked++;  
                        calleeThis.id = 1;
                        break;
                case 2 :calleeThis.resetSpriteFlag(); 
                        calleeThis.clearActiveFlags(); 
                        calleeThis.setColorFlagToZero(); 
                        calleeThis.colorBoxes[2].flag = 1 ; 
                        calleeThis.rightObjects[2].flag = 1; 
                        calleeThis.ObjectClicked++;   
                        calleeThis.id = 2;
                        break;
                case 3 :calleeThis.resetSpriteFlag(); 
                        calleeThis.clearActiveFlags(); 
                        calleeThis.setColorFlagToZero(); 
                        calleeThis.colorBoxes[3].flag = 1 ; 
                        calleeThis.rightObjects[3].flag = 1;
                        calleeThis.ObjectClicked++; calleeThis.id = 3
                        break;
                case 4 :calleeThis.resetSpriteFlag();
                        calleeThis.clearActiveFlags(); 
                        calleeThis.setColorFlagToZero(); 
                        calleeThis.colorBoxes[4].flag = 1 ; 
                        calleeThis.rightObjects[4].flag = 1; 
                        calleeThis.ObjectClicked++; 
                        calleeThis.id = 4;
                        break;
                case 5 :calleeThis.resetSpriteFlag(); 
                        calleeThis.wrongObjects[5].flag = 1; calleeThis.id = 5; 
                        var bubbleSound = cc.audioEngine;
                        bubbleSound.playEffect(res.bubble_mp3);
                        break;
                case 6 :calleeThis.resetSpriteFlag(); 
                        calleeThis.wrongObjects[6].flag = 1; calleeThis.id = 6;
                        var bubbleSound = cc.audioEngine;
                        bubbleSound.playEffect(res.bubble_mp3);
                        break;
                case 7 :calleeThis.resetSpriteFlag(); 
                        calleeThis.wrongObjects[7].flag = 1; 
                        calleeThis.id = 7;
                        var bubbleSound = cc.audioEngine;
                        bubbleSound.playEffect(res.bubble_mp3);
                        break;
                case 8 :calleeThis.resetSpriteFlag(); 
                        calleeThis.wrongObjects[8].flag = 1; 
                        calleeThis.id = 8;
                        var bubbleSound = cc.audioEngine;
                        bubbleSound.playEffect(res.bubble_mp3);
                        break;
                case 9 :calleeThis.resetSpriteFlag(); calleeThis.wrongObjects[9].flag = 1; calleeThis.id = 9;
                        var bubbleSound = cc.audioEngine;
                        bubbleSound.playEffect(res.bubble_mp3);
                        break;
                 
            }
            
        }
        
         return true;
        
    }
      
     return false;

  }   

});            
            cc.eventManager.addListener(sprite_click, this);
                       
        },
        onDownShadow: function(touch, target) {
                
            for(var i = 0;i<10;i++){
                
                if(calleeThis.colorBoxes[i].flag == 1){
                    
                     calleeThis.colorClickedFlag = 1;
                     calleeThis.colorClickedCode.r  = calleeThis.colorBoxes[i].r;
                     calleeThis.colorClickedCode.g  = calleeThis.colorBoxes[i].g;
                     calleeThis.colorClickedCode.b  = calleeThis.colorBoxes[i].b;
                   
                     break;
                }
            }
            
            for(var i = 5;i<10;i++){
                
                if(calleeThis.wrongObjects[i].flag == 1){
                    
                    calleeThis.wrongObjectClicked = 1;
                    calleeThis.objectClickedName = calleeThis.wrongObjects[i].name;
                    calleeThis.objectClickedTrans = calleeThis.wrongObjects[i].trans;
                     break;
                }
            }
            
            
            
            for(var i = 0;i<5;i++){
                
                if(calleeThis.rightObjects[i].flag == 1){
                        
                     
                     calleeThis.objectClickedFlag = 1;
                     calleeThis.objectClickedName = calleeThis.rightObjects[i].name;
                     calleeThis.objectClickedTrans = calleeThis.rightObjects[i].trans;
                    
                     break;
                }
            }
           var size = cc.winSize;
          
                    if(calleeThis.colorClickedFlag == 1 && calleeThis.objectClickedFlag == 1 ){calleeThis.object = new cc.Sprite(calleeThis.objectClickedTrans);calleeThis.object.color =  new cc.color(calleeThis.colorClickedCode.r, calleeThis.colorClickedCode.g, calleeThis.colorClickedCode.b); //object.scale.setTo(scale.x/4, scale.y/4); 
                        calleeThis.object.setScale(0.6, 0.6);
 calleeThis.object.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);

//  calleeThis.object.setPosition(location.x  + size.width*0.59, location.y);
 calleeThis.object.setPosition(touch.getLocation().x, touch.getLocation().y);
 calleeThis.addChild(calleeThis.object, 9);
 this.stickSound = cc.audioEngine;
 this.stickSound.playEffect(res.stick_mp3 );                                                 
                                                    if(calleeThis.filler < 10){   calleeThis.levelCounter++;
                                                                         calleeThis.timeBox[calleeThis.filler++].color = new cc.color(res.redColor.r, res.redColor.g, res.redColor.b);  
                                                                        }
                                                                         calleeThis.clearActiveFlags();             
                                                                         calleeThis.killAllSprites();
                                                                         calleeThis.randomizeObjects();
                                                                        }
            //For Wrong Objects
            
          
if(calleeThis.wrongObjectClicked == 1){
    var size = cc.winSize;
                    calleeThis.object1 = new cc.Sprite(calleeThis.objectClickedName); //object.scale.setTo(scale.x/4, scale.y/4); 
    
   // calleeThis.object1.color =  new cc.color(calleeThis.colorClickedCode.r, calleeThis.colorClickedCode.g, calleeThis.colorClickedCode.b);
    calleeThis.object1.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorX);this.stickSound = cc.audioEngine;this.stickSound.playEffect(res.stick_mp3);                        
    calleeThis.object1.setPosition(touch.getLocation().x, touch.getLocation().y);
    calleeThis.object1.setScale(0.6, 0.6);
    calleeThis.addChild(calleeThis.object1, 9);
    
    	//, size.height*0.38
    
   
    
     var tween = cc.MoveTo.create(5,cc.p(touch.getLocation().x, touch.getLocation().y - (size.height * 1.25)));
     calleeThis.object1.runAction(tween);
    
    calleeThis.clearActiveFlags();          
    calleeThis.killAllSprites();
    calleeThis.randomizeObjects();
    
                                    }
                    
            
        }
    });


