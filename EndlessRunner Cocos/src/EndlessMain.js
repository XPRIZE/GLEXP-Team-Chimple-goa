
var EndlessMainLayer = cc.Layer.extend({
  
    ctor:function () {
        
        this._super();
        var size = cc.winSize;
        
        this.initVariable();
        
        var helloLabel = new cc.LabelTTF("Testing for Endless Mountain", "Arial", 150);
        // var backgroundLayer = cc.LayerGradient.create(cc.color(255,83,26, 255), cc.color(255,255,255,155));
        // this.addChild(backgroundLayer);
        
        var background = new cc.Sprite("res/imgs/sky_moon.png");
        background.setPosition(0,0);
        background.setScale(3,3);
        background.setAnchorPoint(0,0);
        this.addChild(background,0);
        
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2 + 250;
        // this.addChild(helloLabel, 5);

        this.leftBarrier = new cc.Sprite(res.barrier);
        this.leftBarrier.setPosition(-450,0);
        this.leftBarrier.setAnchorPoint(0,0);
        this.addChild(this.leftBarrier);

        this.rightBarrier = new cc.Sprite(res.barrier);
        this.rightBarrier.setPosition(size.width+500,0);
        this.rightBarrier.setAnchorPoint(0,0);
        this.addChild(this.rightBarrier);

        var mountain = null;
        var MountainRandomvalue = null;
        var startPosition = 0;
        
        for(var i = 0 ; i <= 7 ; i ++){
            if(i != 7){
                MountainRandomvalue = Math.floor(this.getRandomArbitrary(0,this.mountainMidImages.length-1));
                mountain = new cc.Sprite(res[this.mountainMidImages[MountainRandomvalue]]);       
                mountain.name = this.LayerMode.mountainTypeObject.midLandPart;
                mountain.nextName = this.LayerMode.mountainTypeObject.midLandPart;
                mountain.layerTypeName = this.LayerMode.mountainLayerTypes.FirstLayer;
                this.addChild(mountain,this.LayerMode.zOrderPathLayer.firstLayer);
            }else{
                mountain = new cc.Sprite(res.rightEndRock);
                mountain.name = this.LayerMode.mountainTypeObject.endLandPart;
                mountain.nextName = this.LayerMode.mountainTypeObject.gapLand;
                mountain.layerTypeName = this.LayerMode.mountainLayerTypes.FirstLayer;
                this.addChild(mountain,this.LayerMode.zOrderPathLayer.firstLayer);
            }
                mountain.setPosition(startPosition,0);
                startPosition = startPosition + mountain.width;
                mountain.setAnchorPoint(0,this.LayerMode.LayerYcoord.anchorPointFirstLayer);
                this.allBgLayerObject.push(mountain);
                mountain.runAction(cc.MoveTo.create((mountain.x + Math.abs(this.leftBarrier.x))/850,cc.p(this.leftBarrier.x, 0)));
                // this.currentFirstLayerRock = mountain;
        }
        
        this.jumpMode = false;
        var mountain = new cc.Sprite(res.gap);
        mountain.setPosition(this.rightBarrier.x,0);
        mountain.setAnchorPoint(0,this.LayerMode.LayerYcoord.anchorPointFirstLayer);
        mountain.name = this.LayerMode.mountainTypeObject.gapLand;
        mountain.nextName = this.LayerMode.mountainTypeObject.startLandPart;
        mountain.layerTypeName = this.LayerMode.mountainLayerTypes.gap;
        this.addChild(mountain,this.LayerMode.zOrderPathLayer.gapLand);
        this.allBgLayerObject.push(mountain);
        mountain.runAction(cc.MoveTo.create(this.LayerMode.PathMovingSpeed,cc.p(this.leftBarrier.x, 0)));
        this.currentFirstLayerRock = mountain;
        this.FirstLayerModes = 1;
        
        this.character = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("main1.png"));
        this.character.setPosition(cc.director.getWinSize().width/2-300,cc.director.getWinSize().height/4);
        this.character.setAnchorPoint(0,0);
        this.addChild(this.character,this.LayerMode.zOrderPathLayer.character);
        this.characterListner(background,this);
        this.animationBubbleBlast(this.character,"main",12);
        
        
        
        this.scheduleUpdate();
        return true;
    },
    
    update : function(dt){
      
      this.startingIntersectMode();
      this.RemoveObjectByIntersectWithLeftBarrier();
      
      if(this.characterFloat){
        this.characterFallDown();
      }
      
      if(this.jumpMode){
          this.jumpCharacter();
      }
      if(!this.jumpMode)
      this.stillCharacterOnPath();
      
    },
    
    stillCharacterOnPath : function(){
        for(var i = 0 ; i < this.allBgLayerObject.length ; i++){
            if(cc.rectIntersectsRect(this.character.getBoundingBox(),this.allBgLayerObject[i].getBoundingBox())){
            
                    if(this.allBgLayerObject[i].layerTypeName == this.LayerMode.mountainLayerTypes.ThirdLayer && !this.gapMode){
                        // console.log(" ROCK TYPE INTERSECT "+this.allBgLayerObject[i].layerTypeName);
                        
                            this.characterFloat = false;
                        
                            this.character.y = this.LayerMode.LayerYcoord.thirdLayer;
                            // this.LayerMode.gravityYdirectionSpeed = 50;
                        
                    }
                    else if(this.allBgLayerObject[i].layerTypeName == this.LayerMode.mountainLayerTypes.SecondLayer && !this.gapMode){
                        // console.log(" ROCK TYPE INTERSECT "+this.allBgLayerObject[i].layerTypeName);
                        
                        this.characterFloat = false;
                        
                            this.character.y = this.LayerMode.LayerYcoord.secondLayer;
                            // this.LayerMode.gravityYdirectionSpeed = 50;
                        
                    }
                    else if(this.allBgLayerObject[i].layerTypeName == this.LayerMode.mountainLayerTypes.FirstLayer && !this.gapMode){
                        // console.log(" ROCK TYPE INTERSECT "+this.allBgLayerObject[i].layerTypeName);
                        
                        this.characterFloat = false;
                        
                            this.character.y = this.LayerMode.LayerYcoord.firstLayer;
                            // this.LayerMode.gravityYdirectionSpeed = 50; 
                        
                    }else if(this.allBgLayerObject[i].layerTypeName == this.LayerMode.mountainLayerTypes.gap){
                        this.characterFloat = true;
                        this.jumpMode = false;
                        this.gapMode = true;
                    }
            }else{
                    this.characterFloat = true;
            }
        }
    },
    
    characterFallDown : function(){
      
      this.character.y = this.character.y - this.LayerMode.gravityYdirectionSpeed;
        
    },
    
    jumpCharacter : function (){
      if(0 <= this.heightJump){
            this.heightJump = this.heightJump - this.LayerMode.gravityYdirectionSpeed;
            this.character.y = this.character.y + this.LayerMode.gravityYdirectionSpeed;
      }else{
          this.heightJump = this.LayerMode.heightJump;
          this.characterFloat = true;
          this.jumpMode = false;
      }
    },
    
    startingIntersectMode : function(){

       if(this.FirstLayerModes == this.LayerMode.FirstLayerRightIntersectMode){
          if(!cc.rectIntersectsRect(this.rightBarrier.getBoundingBox(),this.currentFirstLayerRock.getBoundingBox())){
              this.FirstLayerModes = 4;
              if(this.currentFirstLayerRock.nextName == this.LayerMode.mountainTypeObject.startLandPart){
                  this.FirstLayerstartFlag = true;
              }else{
                  this.FirstLayerstartFlag = false;
              }
              
              this.AddRocksInFirstLayerPath();
          }
       }
       if(this.SecondLayerModes == this.LayerMode.SecondLayerRightIntersectMode){
          if(!cc.rectIntersectsRect(this.rightBarrier.getBoundingBox(),this.currentSecondLayerRock.getBoundingBox())){
              this.SecondLayerModes = 4;
              
              this.AddRocksInSecondLayerPath();
          }
       }
       
        if(this.ThirdLayerModes == this.LayerMode.ThirdLayerRightIntersectMode){
          if(!cc.rectIntersectsRect(this.rightBarrier.getBoundingBox(),this.currentThirdLayerRock.getBoundingBox())){
              this.ThirdLayerModes = 4;
              
              this.AddRocksInThirdLayerPath();
          }
       } 
    },

    AddRocksInFirstLayerPath : function(){
        
         if(this.currentFirstLayerRock.nextName == this.LayerMode.mountainTypeObject.gapLand){
            // console.log("in gap method");
            var currentImage =new cc.Sprite(res.gap);
            currentImage.setPosition((this.currentFirstLayerRock.x + this.currentFirstLayerRock.width - this.LayerMode.tolerence ),this.LayerMode.LayerYcoord.groundLevel);
            currentImage.setAnchorPoint(0,this.LayerMode.LayerYcoord.anchorPointFirstLayer);
            currentImage.setScale(1,3);
            currentImage.name = this.LayerMode.mountainTypeObject.gapLand;
            currentImage.nextName = this.LayerMode.mountainTypeObject.startLandPart;
            currentImage.layerTypeName = "gapInFirstLayer";
            this.FirstLayerstartFlag = false;
            this.addChild(currentImage,this.LayerMode.zOrderPathLayer.firstLayer);
            this.allBgLayerObject.push(currentImage);
            this.currentFirstLayerRock = currentImage;
            this.currentFirstLayerRock.runAction(cc.MoveTo.create(this.LayerMode.PathMovingSpeed,cc.p(this.leftBarrier.x, this.LayerMode.LayerYcoord.groundLevel)));
            this.FirstLayerModes = 1;
            
         }
        
         if(this.currentFirstLayerRock.nextName == this.LayerMode.mountainTypeObject.endLandPart){

            var currentImage =new cc.Sprite(res.rightEndRock);
            currentImage.setPosition((this.currentFirstLayerRock.x + this.currentFirstLayerRock.width - this.LayerMode.tolerence),this.LayerMode.LayerYcoord.groundLevel);
            currentImage.setAnchorPoint(0,this.LayerMode.LayerYcoord.anchorPointFirstLayer);
            currentImage.name = this.LayerMode.mountainTypeObject.endLandPart;
            currentImage.nextName = this.LayerMode.mountainTypeObject.gapLand;
            currentImage.layerTypeName = this.LayerMode.mountainLayerTypes.FirstLayer;
            this.addChild(currentImage,this.LayerMode.zOrderPathLayer.firstLayer);
            this.allBgLayerObject.push(currentImage);
            this.currentFirstLayerRock = currentImage;
            this.currentFirstLayerRock.runAction(cc.MoveTo.create(this.LayerMode.PathMovingSpeed,cc.p(this.leftBarrier.x, this.LayerMode.LayerYcoord.groundLevel)));
            this.FirstLayerModes = 1;
         }
         
        if(this.currentFirstLayerRock.nextName == this.LayerMode.mountainTypeObject.midLandPart){
            
            var MountainRandomvalue = Math.floor(this.getRandomArbitrary(0,this.mountainMidImages.length-1));
            
            var currentImage = new cc.Sprite(res[this.mountainMidImages[MountainRandomvalue]]);
            currentImage.setPosition((this.currentFirstLayerRock.x + this.currentFirstLayerRock.width - this.LayerMode.tolerence),this.LayerMode.LayerYcoord.groundLevel);
            currentImage.setAnchorPoint(0,this.LayerMode.LayerYcoord.anchorPointFirstLayer);
            currentImage.name = this.LayerMode.mountainTypeObject.midLandPart;
            currentImage.layerTypeName = this.LayerMode.mountainLayerTypes.FirstLayer;
            // console.log(" this.FirstLayerCounterMid : "+this.FirstLayerCounterMid);
            
            if(this.FirstLayerCounterMidObjectValue > this.FirstLayerCounterMid){
                if( this.SecondLayerSpacing == this.FirstLayerCounterMid){
                    // console.log("trigger second layer");
                    var xCordBlankSpace = 50;
                    var newSprite = this.addUpperLayerStartSpriteRock(this.currentFirstLayerRock,this.LayerMode.mountainTypeObject.SecondLayer,this.LayerMode.LayerYcoord.firstLayer,this.LayerMode.zOrderPathLayer.secondLayer,xCordBlankSpace);
                    this.currentSecondLayerRock = newSprite;
                    this.currentSecondLayerRock.runAction(cc.MoveTo.create(this.LayerMode.PathMovingSpeed,cc.p(this.leftBarrier.x,this.LayerMode.LayerYcoord.firstLayer)));
                    this.SecondLayerModes = 2;
                    this.SecondLayerSpacing = null;
                }
                currentImage.nextName = this.LayerMode.mountainTypeObject.midLandPart;
            }else{
                currentImage.nextName = this.LayerMode.mountainTypeObject.endLandPart;
                this.FirstLayerCounterMid = 0;
            }
            
            this.addChild(currentImage,this.LayerMode.zOrderPathLayer.firstLayer);
            this.allBgLayerObject.push(currentImage);
            this.currentFirstLayerRock = currentImage;
            this.currentFirstLayerRock.runAction(cc.MoveTo.create(this.LayerMode.PathMovingSpeed,cc.p(this.leftBarrier.x, this.LayerMode.LayerYcoord.groundLevel)));
            this.FirstLayerModes = 1;
            this.FirstLayerCounterMid ++;
        }
        
        if(this.currentFirstLayerRock.nextName == this.LayerMode.mountainTypeObject.startLandPart && this.FirstLayerstartFlag){
           
             if(this.FirstLayerflagForCounterMidObject){
                this.FirstLayerCounterMidObjectValue = Math.floor(this.getRandomArbitrary(10,60));
                this.FirstLayerflagForCounterMidObject = false;
                // console.log("first layer : "+ this.FirstLayerCounterMidObjectValue);
                
                if(10 <= this.FirstLayerCounterMidObjectValue && this.FirstLayerCounterMidObjectValue <= 25){
                    //  console.log("only one layer is permitted ");
                     this.FirstLayerModes = 1;
                }else if(25 < this.FirstLayerCounterMidObjectValue && this.FirstLayerCounterMidObjectValue <= 45){
                    var randomMidFromFirstLayer = Math.floor(this.getRandomArbitrary(1,(this.FirstLayerCounterMidObjectValue-1)));
                    this.SecondLayerSpacing = Math.floor(this.getRandomArbitrary(0,this.FirstLayerCounterMidObjectValue - randomMidFromFirstLayer));

                    if(this.SecondLayerSpacing == 0){
                        var newSprite = this.addUpperLayerStartSpriteRock(this.currentFirstLayerRock,this.LayerMode.mountainTypeObject.SecondLayer,this.LayerMode.LayerYcoord.firstLayer,this.LayerMode.zOrderPathLayer.secondLayer);
                        this.currentSecondLayerRock = newSprite;
                        this.currentSecondLayerRock.runAction(cc.MoveTo.create(this.LayerMode.PathMovingSpeed,cc.p(this.leftBarrier.x,this.LayerMode.LayerYcoord.firstLayer)));
                        this.SecondLayerModes = 2;
                        this.SecondLayerSpacing = null;
                    }
                    
                    this.SecondLayerCounterMidObjectValue = randomMidFromFirstLayer;
                            
                }else if(45 < this.FirstLayerCounterMidObjectValue && this.FirstLayerCounterMidObjectValue <= 62){
                
                    var randomMidFromFirstLayer = Math.floor(this.getRandomArbitrary(1,this.FirstLayerCounterMidObjectValue));
                    this.SecondLayerSpacing = Math.floor(this.getRandomArbitrary(0,this.FirstLayerCounterMidObjectValue - randomMidFromFirstLayer));
                    var randomMidFromSecondLayer = 0;
                    
                    if(randomMidFromFirstLayer != 1){
                       randomMidFromSecondLayer = Math.floor(this.getRandomArbitrary(1,randomMidFromFirstLayer-1));
                    }else{
                        randomMidFromSecondLayer = 1;
                    }
                   
                    this.ThirdLayerSpacing = Math.floor(this.getRandomArbitrary(1,randomMidFromFirstLayer - randomMidFromSecondLayer));

                    if(this.SecondLayerSpacing == 0){
                        var newSprite = this.addUpperLayerStartSpriteRock(this.currentFirstLayerRock,this.LayerMode.mountainTypeObject.SecondLayer,this.LayerMode.LayerYcoord.firstLayer,this.LayerMode.zOrderPathLayer.secondLayer);
                        this.currentSecondLayerRock = newSprite;
                        this.currentSecondLayerRock.runAction(cc.MoveTo.create(this.LayerMode.PathMovingSpeed,cc.p(this.leftBarrier.x,this.LayerMode.LayerYcoord.firstLayer)));
                        this.SecondLayerModes = 2;
                        this.SecondLayerSpacing = null;
                    }
                    this.SecondLayerCounterMidObjectValue = randomMidFromFirstLayer;
                   
                    this.ThirdLayerCounterMidObjectValue = randomMidFromSecondLayer;
                    // console.log("third mid value is : "+this.ThirdLayerCounterMidObjectValue);
                 }   
            }

            var currentImage =new cc.Sprite(res.leftEndRock);
            currentImage.setPosition((this.currentFirstLayerRock.x + this.currentFirstLayerRock.width - this.LayerMode.tolerence),this.LayerMode.LayerYcoord.groundLevel);
            currentImage.setAnchorPoint(0,this.LayerMode.LayerYcoord.anchorPointFirstLayer);
            currentImage.name = this.LayerMode.mountainTypeObject.startLandPart;
            currentImage.nextName = this.LayerMode.mountainTypeObject.midLandPart;
            currentImage.layerTypeName = this.LayerMode.mountainTypeObject.midLandPart;
            this.addChild(currentImage,this.LayerMode.zOrderPathLayer.firstLayer);
            this.allBgLayerObject.push(currentImage);
            this.currentFirstLayerRock = currentImage;
            this.currentFirstLayerRock.runAction(cc.MoveTo.create(this.LayerMode.PathMovingSpeed,cc.p(this.leftBarrier.x, this.LayerMode.LayerYcoord.groundLevel)));
            this.FirstLayerflagForCounterMidObject =  true;
            this.FirstLayerModes = 1;
         }
    },
    
     AddRocksInSecondLayerPath : function(){
      
         if(this.currentSecondLayerRock.nextName == this.LayerMode.mountainTypeObject.endLandPart){
            // console.log("in endland method 2 ");
            var currentImage =new cc.Sprite(res.rightEndRock);
            currentImage.setPosition((this.currentSecondLayerRock.x + this.currentSecondLayerRock.width - this.LayerMode.tolerence),this.LayerMode.LayerYcoord.firstLayer);
            currentImage.setAnchorPoint(0,0);
            currentImage.name = this.LayerMode.mountainTypeObject.endLandPart;
            currentImage.nextName = this.LayerMode.mountainTypeObject.gapLand;
            currentImage.layerTypeName = "";
            this.addChild(currentImage,this.LayerMode.zOrderPathLayer.secondLayer);
            this.allBgLayerObject.push(currentImage);
            this.currentSecondLayerRock = currentImage;
            this.currentSecondLayerRock.runAction(cc.MoveTo.create(this.LayerMode.PathMovingSpeed,cc.p(this.leftBarrier.x,this.LayerMode.LayerYcoord.firstLayer)));
            // this.SecondLayerModes = 2;
         }
         
        if(this.currentSecondLayerRock.nextName == this.LayerMode.mountainTypeObject.midLandPart ){
            
            var MountainRandomvalue = Math.floor(this.getRandomArbitrary(0,this.mountainMidImages.length-1));
            
            var currentImage =new cc.Sprite(res[this.mountainMidImages[MountainRandomvalue]]);
            currentImage.setPosition((this.currentSecondLayerRock.x + this.currentSecondLayerRock.width - this.LayerMode.tolerence),this.LayerMode.LayerYcoord.firstLayer);
            currentImage.setAnchorPoint(0,0);
            currentImage.name = this.LayerMode.mountainTypeObject.midLandPart;
            currentImage.layerTypeName = this.LayerMode.mountainLayerTypes.SecondLayer;
            this.addChild(currentImage,this.LayerMode.zOrderPathLayer.secondLayer);
            this.allBgLayerObject.push(currentImage);
           
            // console.log(this.SecondLayerCounterMidObjectValue+" <- midcounter is counter how many blocks enter in second layer : " + this.SecondLayerCounterMid );
 
            if(this.SecondLayerCounterMidObjectValue > this.SecondLayerCounterMid){
                
                if(this.ThirdLayerSpacing == this.SecondLayerCounterMid){
               
                var newSprite = this.addUpperLayerStartSpriteRock(this.currentSecondLayerRock,this.LayerMode.mountainTypeObject.ThirdLayer,this.LayerMode.LayerYcoord.secondLayer,this.LayerMode.zOrderPathLayer.thirdLayer);
                this.currentThirdLayerRock = newSprite;
                this.currentThirdLayerRock.runAction(cc.MoveTo.create(this.LayerMode.PathMovingSpeed,cc.p(this.leftBarrier.x,this.LayerMode.LayerYcoord.secondLayer)));
                this.ThirdLayerModes = 3;
                this.ThirdLayerSpacing = null; 
    
                }

                currentImage.nextName = this.LayerMode.mountainTypeObject.midLandPart;
            }else{
                currentImage.nextName = this.LayerMode.mountainTypeObject.endLandPart;
                this.SecondLayerCounterMid = 0;
            }
            this.SecondLayerModes = 2;
            this.SecondLayerCounterMid ++;
            this.currentSecondLayerRock = currentImage;
            this.currentSecondLayerRock.runAction(cc.MoveTo.create(this.LayerMode.PathMovingSpeed,cc.p(this.leftBarrier.x,this.LayerMode.LayerYcoord.firstLayer)));
        }
    },
    
     AddRocksInThirdLayerPath : function(){
          
         if(this.currentThirdLayerRock.nextName == this.LayerMode.mountainTypeObject.endLandPart){
            // console.log("in endland method 2 ");
            var currentImage =new cc.Sprite(res.rightEndRock);
            currentImage.setPosition((this.currentThirdLayerRock.x + this.currentThirdLayerRock.width - this.LayerMode.tolerence),this.LayerMode.LayerYcoord.secondLayer);
            currentImage.setAnchorPoint(0,0);
            currentImage.name = this.LayerMode.mountainTypeObject.endLandPart;
            currentImage.nextName = this.LayerMode.mountainTypeObject.gapLand;
            currentImage.layerTypeName = "";
            this.addChild(currentImage,this.LayerMode.zOrderPathLayer.thirdLayer);
            this.allBgLayerObject.push(currentImage);
            this.currentThirdLayerRock = currentImage;
            this.currentThirdLayerRock.runAction(cc.MoveTo.create(this.LayerMode.PathMovingSpeed,cc.p(this.leftBarrier.x,this.LayerMode.LayerYcoord.secondLayer)));
            // this.ThirdLayerModes = 2;
         }
         
        if(this.currentThirdLayerRock.nextName == this.LayerMode.mountainTypeObject.midLandPart ){
            
            var MountainRandomvalue = Math.floor(this.getRandomArbitrary(0,this.mountainMidImages.length-1));
            
            var currentImage =new cc.Sprite(res[this.mountainMidImages[MountainRandomvalue]]);
            currentImage.setPosition((this.currentThirdLayerRock.x + this.currentThirdLayerRock.width - this.LayerMode.tolerence),this.LayerMode.LayerYcoord.secondLayer);
            currentImage.setAnchorPoint(0,0);
            currentImage.name = this.LayerMode.mountainTypeObject.midLandPart;
            currentImage.layerTypeName = this.LayerMode.mountainLayerTypes.ThirdLayer;
            this.addChild(currentImage,this.LayerMode.zOrderPathLayer.thirdLayer);
            this.allBgLayerObject.push(currentImage);
            this.currentThirdLayerRock = currentImage;
            this.currentThirdLayerRock.runAction(cc.MoveTo.create(this.LayerMode.PathMovingSpeed,cc.p(this.leftBarrier.x,this.LayerMode.LayerYcoord.secondLayer)));
            // console.log(this.ThirdLayerCounterMidObjectValue+" <- midcounter is counter how many blocks enter in Third layer : " + this.ThirdLayerCounterMid );
 
            if(this.ThirdLayerCounterMidObjectValue > this.ThirdLayerCounterMid){

                currentImage.nextName = this.LayerMode.mountainTypeObject.midLandPart;
            }else{
                currentImage.nextName = this.LayerMode.mountainTypeObject.endLandPart;
                this.ThirdLayerCounterMid = 0;
            }
            
            this.ThirdLayerModes = 3;
            this.ThirdLayerCounterMid ++;
        }
    },
    
    addUpperLayerStartSpriteRock : function(downLayerCurrentSprite,typesOfLayer,yCoord,zOrder,Xcoord){
            
            var currentStartImage =new cc.Sprite(res.leftEndRock);
            
            if( Xcoord != undefined){
                currentStartImage.setPosition((downLayerCurrentSprite.x + downLayerCurrentSprite.width - this.LayerMode.tolerence + Xcoord),yCoord);
            }else{
                currentStartImage.setPosition((downLayerCurrentSprite.x + downLayerCurrentSprite.width - this.LayerMode.tolerence ),yCoord);
            }
         
            currentStartImage.setAnchorPoint(0,0);
            currentStartImage.name = this.LayerMode.mountainTypeObject.startLandPart;
            currentStartImage.nextName = this.LayerMode.mountainTypeObject.midLandPart;
            currentStartImage.layerTypeName = typesOfLayer;
            this.addChild(currentStartImage,zOrder);
            this.allBgLayerObject.push(currentStartImage);
            
            return currentStartImage;
     },

    RemoveObjectByIntersectWithLeftBarrier : function(){
       
        for(var i = 0 ; i < this.allBgLayerObject.length; i++){
            if(cc.rectIntersectsRect(this.leftBarrier.getBoundingBox(),this.allBgLayerObject[i].getBoundingBox())){
                this.removeChild(this.allBgLayerObject[i]);
                this.allBgLayerObject.splice(i,1);
            }
        }
    },
    
    characterListner : function(background,context){
     
        background = cc.EventListener.create({
            
              event: cc.EventListener.TOUCH_ONE_BY_ONE, swallowTouches: true,
  
              onTouchBegan :function(touch, event){

                var target = event.getCurrentTarget();
                var location = target.convertToNodeSpace(touch.getLocation());
                var targetSize = target.getContentSize();
                var targetRectangle = cc.rect(0,0, target.width, target.height);
                
                console.log("single tap");
                
                context.jumpMode = true;
                context.characterFloat = false;
                
                // checking for double tap 
                context.timeStart = context.timeEnd;
                context.timeEnd = Date.now();
                var timeDifference = context.timeEnd - context.timeStart;

                if(timeDifference <= context.timeActivate)
                {
                //double tap event
                console.log(" double tap ");
                }
              }
          });
          
          cc.eventManager.addListener(background, this);
    },
    
    getRandomArbitrary : function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    
    animationBubbleBlast : function(spriteBubble,AnimationName,totalFrame){
        
        // Load sprite frames to frame cache, add texture node
        cc.spriteFrameCache.addSpriteFrames(res.restanimation_plist);
        var spriteBubbleTexture = cc.textureCache.addImage(res.restanimation_png),
        spriteBubbleImages  = cc.SpriteBatchNode.create(spriteBubbleTexture);
        this.addChild(spriteBubbleImages);

        var animFrames = [];
        var str = "";
        for (var i = 1; i <= totalFrame; i++) {
            str = AnimationName + i + ".png";
            var spriteFrame = cc.spriteFrameCache.getSpriteFrame(str);
            var animFrame = new cc.AnimationFrame();
            animFrame.initWithSpriteFrame(spriteFrame, 1, null);
            animFrames.push(animFrame);
        }
        
        var animation = cc.Animation.create(animFrames, 0.08, 1);
        var animate = cc.Animate.create(animation);
        
        spriteBubble.runAction(new cc.RepeatForever(animate));
    },
    
    initVariable : function(){
        
        this.allBgLayerObject = [];
        
        this.LayerMode = {
            FirstLayerRightIntersectMode : 1 ,
            SecondLayerRightIntersectMode : 2 ,
            ThirdLayerRightIntersectMode : 3 ,
            leftIntersectMode : 4 ,
            mountainTypeObject : {
                startLandPart : "startLand",
                midLandPart : "midLand",
                endLandPart : "endLand",
                gapLand : "gapLand"
            },
            mountainLayerTypes : {
                FirstLayer : "firstLayer",
                SecondLayer : "secondLayer",
                ThirdLayer : "thirdLayer",
                gap : "gapInFirstLayer"
            },
            LayerYcoord : {
                anchorPointFirstLayer : 0,
                groundLevel : 0,
                firstLayer : 200,
                secondLayer : 400,
                thirdLayer : 600
            },
            PathMovingSpeed : 4,
            zOrderPathLayer : {
                gapLand : 0,
                firstLayer : 1,
                secondLayer : 2,
                thirdLayer : 3,
                character : 4
            },
            tolerence : 100,
            gravityYdirectionSpeed : 20,
            heightJump : 450
        };
        
        this.timeEnd = 0;
        this.timeActivate = 300;
        
        this.characterFloat = true;
        this.heightJump = this.LayerMode.heightJump;
       
        this.FirstLayerflagForCounterMidObject = true;
        this.FirstLayerstartFlag = true;
        this.FirstLayerCounterMidObjectValue = 0;
        this.FirstLayerCounterMid = 0;
        this.FirstLayerModes = null;
        this.currentFirstLayerRock = null;  
        
  
        this.SecondLayerflagForCounterMidObject = true;
        this.SecondLayerstartFlag = true;
        this.SecondLayerCounterMidObjectValue = 0;
        this.SecondLayerCounterMid = 1;
        this.SecondLayerModes = null;
        this.currentSecondLayerRock = null;  
        this.SecondLayerSpacing = null;
        
        this.ThirdLayerflagForCounterMidObject = true;
        this.ThirdLayerstartFlag = true;
        this.ThirdLayerCounterMidObjectValue = 0;
        this.ThirdLayerCounterMid = 1;
        this.ThirdLayerModes = null;
        this.currentThirdLayerRock = null; 
        this.thirdLayerActived = false;
        
        this.jumpMode = false;
        
        this.mountainMidImages = ["midRock1","midRock2","midRock3","midRock4"];
          
    }
    
});

var EndlessMainScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new EndlessMainLayer();
        this.addChild(layer);
    }
});

