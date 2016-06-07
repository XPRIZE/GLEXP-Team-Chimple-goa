var ClickedButtonToRedirect = cc.Sprite.extend({
        
        ctor:function(imageFile , redirectGameScene,levelName,contextClass){
            this._super(cc.spriteFrameCache.getSpriteFrame(imageFile));
            // this.initWithFile(imageFile);
            
            var sprite_click = cc.EventListener.create({event: cc.EventListener.TOUCH_ONE_BY_ONE, swallowTouches: true,

              onTouchBegan :function(touch, event){

                var target = event.getCurrentTarget();
                var location = target.convertToNodeSpace(touch.getLocation());
                var targetSize = target.getContentSize();
                var targetRectangle = cc.rect(0,0, target.width, target.height);

                if (cc.rectContainsPoint(targetRectangle, location)){
               
                    currentPointerOnBg.x = Math.floor(location.x);
                    currentPointerOnBg.y = (cc.director.getWinSize().height -  Math.floor(location.y));
               
                if( redirectGameScene == "ClassObjectReference"){
                   
                   contextClass.gunMove();
                
                }else if("menuScreen" == redirectGameScene){
                    
                   cc.director.runScene(new HomeScreenScene());
                    
                }else if("alphabets" == redirectGameScene){
                    
                      cc.director.runScene(new AlphabetsMenuScene());
                  
                }else if("alpha" == redirectGameScene){
                
                    levelValues = levelName;
                    soundFlagName = redirectGameScene;
                    cc.director.runScene(new AlphabetsScene());
                
                }else if("numbersMenu" == redirectGameScene){
              
                    cc.director.runScene(new NumbersMenuScene());
              
                }else if("numbers" == redirectGameScene){
                    
                    levelValues = levelName;
                    soundFlagName = redirectGameScene;
                    cc.director.runScene(new NumbersScene());
                    
                }else if("categoryMenu" == redirectGameScene){
                    
                    cc.director.runScene(new  CategoryMenuScene());
                 
                }else if("categoryGame" == redirectGameScene){
                  
                  levelValues = levelName;
                  soundFlagName = redirectGameScene;
                  cc.director.runScene(new CategoryScene());
                  
                }else if("puzzleMenu" == redirectGameScene){
                  
                //   cc.director.runScene(new PuzzleMenuScene()); 
                cc.director.runScene(new AnimationDemoScene());
                
                }else if("Puzzles" == redirectGameScene){
                  
                   levelValues = levelName;
                  soundFlagName = redirectGameScene;
                  cc.director.runScene(new PuzzleScene());
                  
                }
                 console.log("the name of scene : "+ redirectGameScene + "  targetId : "+target.id );
                
                }
                return false;
              }
          });
          cc.eventManager.addListener(sprite_click, this);
         
       }
   });