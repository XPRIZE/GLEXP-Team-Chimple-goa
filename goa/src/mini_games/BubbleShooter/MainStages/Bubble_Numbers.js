var xc = xc || {};
xc.Bubble_Number = cc.Layer.extend({
  menuContext: null,
  
  onEnter:function(){
     this._super();
    menuContext = this.getParent().menuContext;
    this.flagSwitchTwoColor = true;
    this.negativePoints = 0;
    imageSprite = ['bubble_shooter/red_ball','bubble_shooter/green_ball','bubble_shooter/yellow_ball','bubble_shooter/purple_ball','bubble_shooter/blue_ball','bubble_shooter/orange_ball',"bubble_shooter/yellow_ball","bubble_shooter/blue_ball"];

   var ScreenMenu = ccs.load(xc.bubbleShooterLevelInfo.res.bubble_shooter_json,xc.path);
   this.addChild(ScreenMenu.node);
   var xPosi ;
    // if (cc.director.getWinSize().width > 2560){
    //     xPosi = cc.director.getWinSize().width - 2560;
    //     ScreenMenu.node.x = xPosi/2;
    // }
    
    var LangLetter = goa.TextGenerator.getInstance().getAllChars();
    
    var numberOfLetter = 3;
    if(numberOfLetter <= Math.ceil(LangLetter.length/12)){
        numberOfLetter = Math.ceil(LangLetter.length/12);  
    }
    
    console.log("the height and width : "+cc.director.getWinSize().height+"      "+cc.director.getWinSize().width);
    this.textHitsLabel = new cc.LabelTTF("Hits : 0","res/fonts/BalooBhai-Regular.ttf",75);
    this.textHitsLabel.setPosition(cc.director.getWinSize().width*0.08,cc.director.getWinSize().height*0.975);                      
 
    this.addChild(this.textHitsLabel);
    this.initVariable(ScreenMenu,xPosi);
    this.bubbleName = [];
    this.LetterName = [];

    // Array Of BubbleColor
   this.bubbleName = new Array(this.level.columns);
        for (let i=0 ; i <this.level.columns; i++)
       this.bubbleName[i] = new Array(this.level.rows);
  
    // Array Of Letter
   this.LetterName = new Array(this.level.columns);
        for (let i=0 ; i <this.level.columns; i++)
       this.LetterName[i] = new Array(this.level.rows);
        
        for (let i=0; i < this.level.columns ;  i++) {
            this.level.tiles[i] = [];
            for (let j=0; j < this.level.rows; j++) {
                // Define a tile type and a shift parameter for animation
                this.level.tiles[i][j] = new Tile(i, j, 0, 0);
           }
        }
        // Define a level width and height
        this.level.width = this.level.columns * this.level.tilewidth + this.level.tilewidth/2;
        this.level.height = (this.level.rows) * this.level.rowheight + this.level.tileheight;
    
        // Set the gamestate to ready
        this.setGameState(this.gamestates.ready);
    
        if(bubblelevelValues ==  1){        
           levelName = "NumberStarLevel1";            
           letterSprite = ['0','1','2'];
            let color = 3, repeat = 4;
           hits = 40;
           // Create the level of bubbles
           this.createLevel(color,repeat);
        
        }else if(bubblelevelValues ==  2){
           levelName = "NumberStarLevel2";
           letterSprite = ['3','4','5'];
            let color = 3 , repeat = 4;
           hits = 40;
            // Create the level of bubbles
           this.createLevel(color,repeat);
        
        }else if(bubblelevelValues ==  3){
           levelName = "NumberStarLevel3";
            let color = 3, repeat = 4;
            let numbers = this.rndNumber(color);
            letterSprite = ['6','7','8'];
           hits = 40;
          // letterSprite = [DataNumber[numbers[0]],DataNumber[numbers[1]],DataNumber[numbers[2]]];
        
            // Create the level of bubbles
           this.createLevel(color,repeat);
            
        }else if(bubblelevelValues ==  4){
           levelName = "NumberStarLevel4";         
            let color = 3 , repeat = 4;
            let numbers = this.rndNumber(color);
            let DataNumber = ['0','1','2','3','4','5','6','7','8','9'];
            hits = 100;
            letterSprite = ['9',DataNumber[numbers[0]],DataNumber[numbers[1]]];
        
            // Create the level of bubbles
           this.createLevel(color,repeat);
        
        }else if(bubblelevelValues ==  5){
           levelName = "NumberStarLevel5";        
            let color = 3 , repeat = 4;
            let numbers = this.rndNumber(color);
            let DataNumber = ['0','1','2','3','4','5','6','7','8','9'];
           hits = 100;
           letterSprite = [DataNumber[numbers[0]],DataNumber[numbers[1]],DataNumber[numbers[2]]];
        
            // Create the level of bubbles
           this.createLevel(color,repeat);
        
        }else if(bubblelevelValues ==  6){
           levelName = "NumberStarLevel6";            
            let color = 4 , repeat = 2;
            let numbers = this.rndNumber(color);
            let DataNumber = ['0','1','2','3','4','5','6','7','8','9'];
           hits = 100;
           letterSprite = [DataNumber[numbers[0]],DataNumber[numbers[1]],DataNumber[numbers[2]],DataNumber[numbers[3]]];
        
            // Create the level of bubbles
           this.createLevel(color,repeat);
        
        }else if(bubblelevelValues ==  7){
           levelName = "NumberStarLevel7"; 
            let color = 5 , repeat = 2;
            let numbers = this.rndNumber(color);
            let DataNumber = ['0','1','2','3','4','5','6','7','8','9'];
           hits = 100;
           letterSprite = [DataNumber[numbers[0]],DataNumber[numbers[1]],DataNumber[numbers[2]],DataNumber[numbers[3]],DataNumber[numbers[4]]];
        
            // Create the level of bubbles
           this.createLevel(color,repeat);
            
        }else if(bubblelevelValues ==  8){
           levelName = "NumberStarLevel8";            
            let color = 6 , repeat = 1;
            let numbers = this.rndNumber(color);
            let DataNumber = ['0','1','2','3','4','5','6','7','8','9'];
           hits = 200;
           letterSprite = [DataNumber[numbers[0]],DataNumber[numbers[1]],DataNumber[numbers[2]],DataNumber[numbers[3]],DataNumber[numbers[4]],DataNumber[numbers[5]]];
        
            // Create the level of bubbles
           this.createLevel(color,repeat);
        
            
        }else{
            console.log("level management error  - The value if level is : "+bubblelevelValues );
        }
       
        var trnspImg = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("bubble_shooter/pixel.png"));
        trnspImg.setAnchorPoint(0,0);        trnspImg.setPosition(0,0);       trnspImg.setOpacity(0);
        ScreenMenu.node.getChildByName("Panel_2").addChild(trnspImg);
       
         
        // Set the gun Pointer
        this.gun = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("bubble_shooter/gun_tricker.png"));
        this.gun.setPosition(trnspImg.width/2, cc.director.getWinSize().height *0.090);
        this.gun.name ="gunPointer";
        this.gun.anchorY = 0.6;
        this.addChild(this.gun);

        //Set the gun Base
        this.gunBase =  new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("bubble_shooter/gun.png"));
        this.gunBase.setPosition(trnspImg.width/2 , cc.director.getWinSize().height * 0.0560);
        this.addChild(this.gunBase);  

        // Init the this.player in gun 
        this.player.x = this.gunBase.x ;
        //console.log("this.player.x = "+(this.level.x + this.level.width/2 - this.level.tilewidth/2) + "  this.level.x : "+this.level.x+" this.level.width/2 : "+this.level.width/2+" this.level.tilewidth/2 : "+this.level.tilewidth/2);
        this.player.y = cc.director.getWinSize().height - this.gunBase.y ;
        
        this.player.angle = 90;
        this.player.tiletype = 0;
        
        // Init the next-this.player
        this.player.nextbubble.x = this.player.x - 2 * this.level.tilewidth;
        this.player.nextbubble.y = this.player.y;
      
        
        // Init the next bubble and set the current bubble
        this.nextBubble();
        this.nextBubble();
        this.angle = 0;
      
        if(this.player.bubble.tiletype == undefined){
            this.player.bubble.tiletype = Math.floor(this.getRandomArbitrary(0,bubblecolors));
        }

        this.bubblePlayer =  new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(imageSprite[this.player.bubble.tiletype]+".png"));
        this.bubblePlayer.setPosition(cc.director.getWinSize().width * 0.5,cc.director.getWinSize().height * 0.5);
        this.addChild(this.bubblePlayer,1);

        this.letterPlayer =  new cc.LabelTTF(""+letterSprite[this.player.bubble.tiletype],"res/fonts/BalooBhai-Regular.ttf",150);
        this.letterPlayer.setPosition(this.bubblePlayer.getContentSize().width/2,this.bubblePlayer.getContentSize().height/2);
        this.bubblePlayer.addChild(this.letterPlayer);
        
        if(this.player.nextbubble.tiletype == undefined){
            this.player.nextbubble.tiletype = Math.floor(this.getRandomArbitrary(0,bubblecolors));
        }
        
        this.nextBubblePlayer =  new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(imageSprite[this.player.nextbubble.tiletype]+".png"));
        this.nextLetterPlayer =   new cc.LabelTTF(""+letterSprite[this.player.nextbubble.tiletype],"res/fonts/BalooBhai-Regular.ttf",150);
        this.nextBubblePlayer.setPosition((this.level.width/2) - 150  , cc.director.getWinSize().height - 1127);
        this.nextLetterPlayer.setPosition((this.level.width/2) - 150  , cc.director.getWinSize().height - 1127);
    
        this.addChild(this.nextBubblePlayer);
        this.nextBubblePlayer.addChild(this.nextLetterPlayer);
        
        this.renderTiles(); 
        var classReference = this; 
        var listnerBg = cc.EventListener.create({event: cc.EventListener.TOUCH_ONE_BY_ONE, swallowTouches: true,

              onTouchBegan :function(touch, event){

                var target = event.getCurrentTarget();
                var location = target.convertToNodeSpace(touch.getLocation());
                var targetSize = target.getContentSize();
                var targetRectangle = cc.rect(0,0, target.width, target.height);
                
                console.log(location);
                
                if (cc.rectContainsPoint(targetRectangle, location)){
                   var xClickedPosition = Math.floor(location.x);
                   var yClickedPosition = (cc.director.getWinSize().height -  Math.floor(location.y));
                 
                    classReference.gunMove(xClickedPosition,yClickedPosition);
                    return true;
                }
                return false;
              }
      });
      
      cc.eventManager.addListener(listnerBg,trnspImg);
      
      let extendedPanel = ScreenMenu.node.getChildByName("extend");
      extendedPanel.setScaleX(-(this.bubblePlayer.width/2));

      var gamePlayAreaWidth = 2560-(this.bubblePlayer.width/2);
      var widthAreaExtendPart = cc.director.getWinSize().width - gamePlayAreaWidth;
      var extendedGameX = (gamePlayAreaWidth + (gamePlayAreaWidth + widthAreaExtendPart))/2;

      this.extendLetter = new cc.LabelTTF(""+letterSprite[this.player.bubble.tiletype],"res/fonts/BalooBhai-Regular.ttf", widthAreaExtendPart*2);
      this.extendLetter.setPosition(extendedGameX - (widthAreaExtendPart * 0.25), cc.director.getWinSize().height * 0.5);
      this.addChild(this.extendLetter);
    //  this.extendLetter.setAnchorPoint(0.5,0);

       if(bubblelevelValues == 100){
            var window = cc.director.getWinSize();
            var help = new xc.HelpLayer(cc.rect((window.width - (cc.director.getWinSize().width - 2560)) * 0.5 , window.height *0.75 , window.width - (cc.director.getWinSize().width - 2560),window.height *0.5), cc.rect(this.gunBase.x, this.gunBase.y,this.bubblePlayer.width,this.bubblePlayer.height))
            this.addChild(help,4)
            help.setName("help");
        }
        this.helpActive = false;

      this.scheduleUpdate();
    
    return true;
    
  },
  ctor:function () {
       this._super();
  },
  
    update : function (dt) {
         // Render player bubble
        if(!(this.gamestate == this.gamestates.gameComplete)){
            // console.log("the value of gameOver condition is : "+ this.gamestate + " the value of complete game is : "+this.gamestates.gameComplete);
            this.renderPlayer();
        }
        if (this.gamestate == this.gamestates.ready) {
            // Game is ready for player input
        } 
        else if (this.gamestate == this.gamestates.shootbubble && !menuContext.isGamePaused()) {
            // Bubble is moving
            this.stateShootBubble(dt);
           
        }else if (this.gamestate == this.gamestates.removecluster && (!killBubble)) {
            // Remove cluster and drop tiles
            this.stateRemoveCluster();
        }else if (this.gamestate == this.gamestates.gameover){
            console.log("game over bro !!");
            menuContext.setMaxPoints(this.counterhits);
            menuContext.addPoints(0);
            cc.log("showscore game over");
            menuContext.showScore();
            this.unscheduleUpdate();
        }
    },
     
    gunMove : function(x,y){
        // console.log("done 276");
        var xPosi = 0;
        if (cc.director.getWinSize().width > 2560){
            xPosi = cc.director.getWinSize().width - 2560;
        }
        this.onMouseMove(x , y);
        console.log("x and y : "+x +"  "+ y + " xPosi value is : "+ xPosi);
         if (this.gamestate == this.gamestates.ready) {
                 this.shootBubble(); 
                 if(this.helpActive){
                     this.helpActive = false;
                     this.removeChildByName("help");
                 }
            }
    },
            // Create a random pattern level1
   createLevel : function ( colour , repeat ) {
 
       // Number of different colors
       bubblecolors = colour;
     
        let randomtile = 0 , newtile = 0 ;
        
        // Create a level with random tiles
         for (let j=0; j < this.level.rows; j++) {
             
             if(colour != 1){
                randomtile = Math.floor(Math.random()*100 % (bubblecolors-1));
                // console.log("309 : "+ randomtile);
             }else{ 
                randomtile = 0;
            }
             
            let count = 0;
            for (let i=0; i < this.level.columns; i++) {
                
                if (count >= repeat) {
                 
                    // Change the random tile
                     newtile = Math.floor(Math.random()*100 % (bubblecolors-1));
                    //  console.log("321 : "+newtile);
                    // Make sure the new tile is different from the previous tile
                    if (newtile == randomtile) {
                        newtile = (newtile + 1) % bubblecolors;
                    }
                    randomtile = newtile;
                    count = 0;
                }
                count++;
                               
               if (j < 3) {
                   
                      this.level.tiles[i][j].type = randomtile;   
                    //   console.log("bubble color type is : "+" row : "+j+" column : "+i+"  "+(this.level.tiles[i][j].type)+"");
                   
                } else {
                      this.level.tiles[i][j].type = -1;
                }
            }
            
        }
    },    
    
     // Render tiles
     renderTiles : function () {
     
        // Top to bottom       
        for (let j=0; j < this.level.rows; j++) {
            for (let i=0; i < this.level.columns; i++) {
                // Get the tile
                let tile = this.level.tiles[i][j];
            
                // Get the shift of the tile for animation
                let shift = tile.shift;
                
                // Calculate the tile coordinates
                let coord = this.getTileCoordinate(i, j);
                
                // Check if there is a tile present
                if (tile.type >= 0) {
                  
                    // Draw the tile using the color
                   this.bubbleName[i][j] = this.drawBubbleGroups(coord.tilex, coord.tiley + shift, tile.type,i,j);
                   this.LetterName[i][j] = this.drawLetterGroups(this.bubbleName[i][j].getContentSize().width/2,this.bubbleName[i][j].getContentSize().height/2, tile.type,i,j);
                   this.bubbleName[i][j].addChild(this.LetterName[i][j]);
                   this.bubbleName[i][j].name = letterSprite[tile.type];
                   this.LetterName[i][j].name = letterSprite[tile.type];
                }
            }
        }
      //  console.log("the number of column and row is : "+this.level.rows +"   "+this.level.columns)
       // console.log(bubbleName);
    },

    // Render the player bubble
    renderPlayer : function()  {
             
            // Draw the bubble in gun
             if(this.player.nextbubble.tiletype == undefined){
                 this.player.nextbubble.tiletype = Math.floor(this.getRandomArbitrary(0,bubblecolors));
             }
            
            if(this.player.nextbubble.tiletype != undefined){
                // Draw the next bubble which will come in gun
                this.drawNextBubble(this.player.nextbubble.x,this.player.nextbubble.y, this.player.nextbubble.tiletype);
                this.drawNextLetter(this.player.nextbubble.x, this.player.nextbubble.y, this.player.nextbubble.tiletype);
            }
             // Draw the bubble in gun
             if(this.player.bubble.tiletype == undefined){
                 this.player.bubble.tiletype = Math.floor(this.getRandomArbitrary(0,bubblecolors));
                 this.mainPlayerBubbleDestroy = true;
             }
             
             if (this.player.bubble.visible && this.player.bubble.tiletype != undefined) {
                 this.drawBubble(this.player.bubble.x, this.player.bubble.y, this.player.bubble.tiletype);  
                //  console.log("done 385" + this.mainPlayerBubbleDestroy);               
             }   
    },
    
     // Shoot the bubble
      shootBubble : function () {
         
        // Shoot the bubble in the direction of the mouse
        this.player.bubble.x = this.player.x;
        this.player.bubble.y = this.player.y;
        this.player.bubble.angle = this.player.angle;
        this.player.bubble.tiletype = this.player.tiletype;
        // Set the gamestate
        this.setGameState(this.gamestates.shootbubble);
         if(this.extendLetter != undefined){ 
            this.extendLetter.setString(""+letterSprite[this.player.nextbubble.tiletype]);
          }
      },
        // Draw the bubble
      drawBubble : function(x, y, index) {
       
        if (index < 0 || index >= bubblecolors)
           return;
                
        // Use to kill the previous bubble sprite
        
        // this.removeChild(bubblePlayer,true);
        // this.removeChild(letterPlayer,true);
        // console.log("393 -------- > " + letterSprite[index]);
          if(this.mainPlayerBubbleDestroy){
              // console.log("done 413");
              this.bubblePlayer =  new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(imageSprite[ this.player.bubble.tiletype]+".png"));
              this.letterPlayer =  new cc.LabelTTF(""+letterSprite[this.player.bubble.tiletype],"res/fonts/BalooBhai-Regular.ttf",120);
              this.addChild(this.bubblePlayer);
              this.bubblePlayer.addChild(this.letterPlayer);
              
              this.mainPlayerBubbleDestroy = false;
          }
          
            this.bubblePlayer.setPosition(this.player.bubble.x, (cc.director.getWinSize().height) - this.player.bubble.y);
            this.letterPlayer.setPosition(this.bubblePlayer.getContentSize().width/2,this.bubblePlayer.getContentSize().height/2);
            this.bubblePlayer.anchorX=0.5;
            this.bubblePlayer.anchorY=0.5;

    },
       
    stateShootBubble : function(dt){
     
        // Bubble is moving
        // Move the bubble in the direction of the mouse
        this.player.bubble.x += dt * this.player.bubble.speed * Math.cos(this.degToRad(this.player.bubble.angle));
        this.player.bubble.y += dt * this.player.bubble.speed * -1 * Math.sin(this.degToRad(this.player.bubble.angle));
        
        if (this.player.bubble.visible) {
            
            this.drawBubble(this.player.bubble.x, this.player.bubble.y, this.player.bubble.tiletype);
        }
       
       // Handle left and right collisions with the level
        if (this.player.bubble.x <= (this.bubblePlayer.width/2)) {
           
            // Left edge
            this.player.bubble.angle = 180 - this.player.bubble.angle;
            this.player.bubble.x = (this.bubblePlayer.width/2);
        } else if ((this.player.bubble.x + this.bubblePlayer.width/2) >= this.level.x + this.level.width) {
            // Right edge
            this.player.bubble.angle = 180 - this.player.bubble.angle;
            this.player.bubble.x = this.level.x + this.level.width - this.level.tilewidth;
        }

        // Collisions with the top of the level
        if (this.player.bubble.y <= this.level.y) {
            // Top collision
            this.player.bubble.y = this.level.y;
            // console.log("done 478");
            this.snapBubble();
            return;
        }
        
        // Collisions with other tiles
        for (let i=0; i < this.level.columns; i++) {
            for (let j=0; j < this.level.rows; j++) {
                let tile = this.level.tiles[i][j];
                
                // Skip empty tiles
                if (tile.type < 0) {
                    continue;
                }
                // console.log("done 486");
                // Check for intersections
                let coord = this.getTileCoordinate(i, j);
                // console.log(coord.tilex + "           "+ coord.tiley);
                if (this.circleIntersection(this.player.bubble.x + this.level.tilewidth/2,
                                       this.player.bubble.y + this.level.tileheight/2,
                                       this.level.radius,
                                       coord.tilex + this.level.tilewidth/2,
                                       cc.director.getWinSize().height - (coord.tiley + this.level.tileheight/2),
                                       this.level.radius)) {
                  
                    // Intersection with a level bubble
                    this.snapBubble();
                    return;
                }
            }
        }
    },
    
     snapBubble : function(){
        
        // Get the grid position
        let centerx = this.player.bubble.x + this.level.tilewidth/2;
        let centery = this.player.bubble.y + this.level.tileheight/2;
        let gridpos = this.getGridPosition(centerx, centery);
        console.log("gridpos x and y : "+ gridpos.x +"  "+ gridpos.y);
        // console.log("done 512");
        // // Make sure the grid position is valid
        if (gridpos.x < 0) {
            gridpos.x = 0;
        }
            
        if (gridpos.x >= this.level.columns) {
            gridpos.x = this.level.columns - 1;
        }
        

        if (gridpos.y < 0) {
            gridpos.y = 0;
        }
            
        if (gridpos.y >= this.level.rows) {
            gridpos.y = this.level.rows - 1;
        }
       
        // Check if the tile is empty
        let addtile = false;
        if (this.level.tiles[gridpos.x][gridpos.y].type != -1) {
            // Tile is not empty, shift the new tile downwards
            for (let newrow = gridpos.y+1 ; newrow < this.level.rows; newrow++) {
             
                if (this.level.tiles[gridpos.x][newrow].type == -1) {
                    gridpos.y = newrow;
                    addtile = true;
                    break;
                }
            }
        } 
        else {
            addtile = true;
        }
        
        // Add the tile to the grid
        if (addtile) {
            
            //  ++this.count;
            //  this.hits--;
            // console.log("done 553");
            console.log(" ---------------  you hited "+ (++ this.counterhits) +" balls --------------------");
            //   console.log("hits remaining : "+ this.hits + " count value is : " + this.count);
            //    this.DataCard();
               this.textHitsLabel.setString("Hits : "+ this.counterhits);
              if(this.counterhits == 7){
                //    this.DataCard();
              }
              
              // Hide the player bubble
              this.player.bubble.visible = false;
              
              //Flag to manage the main bubblePlayer
              this.mainPlayerBubbleDestroy = true;
              
               // Set the tile
               this.level.tiles[gridpos.x][gridpos.y].type = this.player.bubble.tiletype;
                
              this.bubbleName[gridpos.x][gridpos.y] = this.bubblePlayer;
              this.LetterName[gridpos.x][gridpos.y] = this.letterPlayer;
               this.checkBubbleStatus();
               // Check for game over
               if (this.checkGameOver()) {
                  // console.log("game over now .........")
                   return;
                }
                // console.log("done 578");
                // Find clusters
                this.cluster = this.findCluster(gridpos.x, gridpos.y, true, true, false);
               // console.log("cluster size is : "+ this.cluster.length);
                
                //  if( this.hits < 0 ){
                //  console.log(" GAME OVER  ");
                //  this.setGameState(this.this.gamestates.gameover);
                //  return;
                // }
                // console.log("done 588");
                if (this.cluster.length >= 3) {
                //  Remove the cluster
                    killBubble = false;
                    this.setGameState(this.gamestates.removecluster);
                    
                    return;
                }else{
                    console.log("the total missed : "+ ++this.negativePoints);
                }   
            }
 
        // Next bubble
                this.nextBubble();
         
                this.setGameState(this.gamestates.ready);
        
    },
    
//  // Shoot the bubble
//        shootBubble : function() {
         
//         // Shoot the bubble in the direction of the mouse
//         player.bubble.x = player.x;
//         player.bubble.y = player.y;
//         player.bubble.angle = player.angle;
//         player.bubble.tiletype = player.tiletype;

//         // Set the gamestate
//         setGameState(gamestates.shootbubble);

//       },


    stateRemoveCluster : function() {
    //    if(this.extendLetter != undefined){ 
    //      this.extendLetter.setString(""+letterSprite[this.player.bubble.tiletype]);
    //    }
        let self  = this;
        // console.log("done 622");      
        if (this.animationstate == 0) {
          //  console.log("flag to remove the bubble is on");
             this.resetRemoved();
            
            // Mark the tiles as removed
            for (let i=0; i < this.cluster.length; i++) {
                // Set the removed flag
                this.cluster[i].removed = true;
            }
            
            // Find floating clusters
            this.floatingclusters = this.findFloatingClusters();
          //  console.log("float cluster : "+ this.floatingclusters.length);
            this.animationstate = 1;
                   
        }
        
        if (this.animationstate == 1) {
            // Pop bubbles
            let tilesleft = false; 
           
            for (let i=0; i < this.cluster.length; i++) {
                
                let tile = this.cluster[i];
                var tempColorType = tile.type;
                if (tile.type >= 0) {
                    tilesleft = true;
                    
                    // Alpha animation
                    tile.alpha -= 0.025 * 15;
				
                    if (tile.alpha < 0) {
                        tile.alpha = 0;
                    }
                       
                    if (tile.alpha == 0) {
			                    
                        if(i != 0 ){
                            this.playerDie(tile.x,tile.y,tile.type);
                        }
                        
                        if( i == 0 ){
                        //    this.game.world.bringToTop(this.bubbleName[tile.x][tile.y]);
                        //    this.game.world.bringToTop(this.LetterName[tile.x][tile.y]);
                          this.reorderChild(this.bubbleName[tile.x][tile.y],6);
                          this.reorderChild(this.LetterName[tile.x][tile.y],6);
                      
                        //   this.bubbleName[tile.x][tile.y].setGlobalZOrder(5);
                        //   this.LetterName[tile.x][tile.y].setGlobalZOrder(5);
                           
                          this.bubbleName[tile.x][tile.y].anchorX = 0.5;
                          this.bubbleName[tile.x][tile.y].anchorY = 0.5;
                                
                          this.LetterName[tile.x][tile.y].anchorX = 0.5;
                          this.LetterName[tile.x][tile.y].anchorY = 0.5;
                        
                          this.bubbleName[tile.x][tile.y].runAction(new cc.ScaleTo(1.5,3));
                         
                          this.bubbleName[tile.x][tile.y].runAction(new cc.MoveTo(1,cc.p(cc.director.getWinSize().width/2, cc.director.getWinSize().height/2)));
                         
//                           cc.audioEngine.playEffect("res/english/sounds/"+this.LetterName[tile.x][tile.y].name.toLowerCase()+".wav");

                           var playerDieCallFunc = function()
                            {
                              //  self.playerDie(tile.x,tile.y,tempColorType);
                                // self.bubbleName[tile.x][tile.y].alpha = 0;
                                self.finalFlag = true;
                                self.removeChild(self.bubbleName[tile.x][tile.y]);
                               // cc.audioEngine.playEffect("res/english/sounds/"+self.LetterName[tile.x][tile.y].name.toLowerCase()+".wav");
                                // renderPlayer();
                            }
                            this.runAction(new cc.Sequence(cc.delayTime(1.6),new cc.CallFunc(playerDieCallFunc, this)));  
                              
                               // Next bubble
                               this.nextBubble();  
                                           
                        }
                       
                        tile.type = -1;
                        tile.alpha = 1;
                    }
                }       
            }
        //    console.log("done 718");
          // Drop Floating bubbles 

            for (let i=0; i < this.floatingclusters.length; i++) {
                for (let j=0; j < this.floatingclusters[i].length; j++) {
                    let tile =  this.floatingclusters[i][j];
                    
                    if (tile.type >= 0) {
                        tilesleft = true;
                        
                        // Accelerate dropped tiles
                        tile.velocity += 0.025 * 700;
                        tile.shift += 0.025 * tile.velocity;
                            
                        // Alpha animation
                        tile.alpha -= 0.025 * 8;
                        if (tile.alpha < 0) {
                            tile.alpha = 0;
                        }
                        
                         let data = tile.y * this.level.rowheight + tile.shift;
                         let data1 = (this.level.rows - 1) * this.level.rowheight + this.level.tileheight;
                         
                        // Check if the bubbles are past the bottom of the level
                        if (tile.alpha == 0 || ( data < data1)) {
                      
                            tile.type = -1;
                            tile.shift = 0;
                            tile.alpha = 1;
                            
                              var playerDieFunc = function()
                            {
                                 self.playerDie(tile.x,tile.y,7);
                            }
                            this.runAction(new cc.Sequence(cc.delayTime(0.15),new cc.CallFunc(playerDieFunc, this))); 
                        }
                    }
                }
            }
        //  console.log("done 775");
         if(this.finalFlag){
            //   console.log("tiles left or not : "+tilesleft);
            if (!tilesleft) {

                // Check for game over
                let tilefound = false;
                for (let i=0; i < this.level.columns; i++) {
                    for (let j=0; j < this.level.rows; j++) {
                        if (this.level.tiles[i][j].type != -1) {
                            tilefound = true;
                            break;
                        }
                    }
                }
            //    console.log("tilefound is value is ------------> "+tilefound);
                if (tilefound) {
                        // console.log("done 792");
                        this.setGameState(this.gamestates.ready);
                   
                } else {
                    
                    // No tiles left, game over
                    
                    this.setGameState(this.gamestates.gameComplete);
                    // console.log("this.gamestate : -------------------------- >>>>>>  "+ this.gamestate);
                    this.player.bubble.visible =  false;
                    this.DataCard("complete");
                    //After game complete this method call
                //    console.log("the game is complete ");
                    
                }
            }
               this.finalFlag = false;
          }
        //   console.log("done 825");
        }
    },
        
    // Check if two circles intersect
    circleIntersection : function(x1, y1, r1, x2, y2, r2) {
        // Calculate the distance between the centers
        let dx = x1 - x2;
        let dy = y1 - y2;
        let len = Math.sqrt(dx * dx + dy * dy);
        
        if (len < r1 + r2) {
            // Circles intersect            
            return true;
        }
        return false;
    },
    
   DataCard : function (gamestatus){
       console.log("gamestatus : "+gamestatus + " -------------- ");
       var level = bubblelevelValues;
    if (cc.sys.isNative) {
               menuContext.setMaxPoints(this.counterhits);
                menuContext.addPoints(this.counterhits - this.negativePoints);
               cc.log("showscore");
               menuContext.showScore();
     }else{
         xc.GameScene.load(xc.bubbleShooterLevelInfo);
     }  
    },
    
   playerDie : function (tilex,tiley,type,float){
       
     //   this.animationBubbleBlast(bubbleName[tilex][tiley],type);       
        this.removeChild(this.bubbleName[tilex][tiley]);
        cc.audioEngine.playEffect("res/bubble_shooter/sounds/bubble_blast.wav");

        
    },
    
    animationBubbleBlast : function(spriteBubble,spriteType){
        
        // Load sprite frames to frame cache, add texture node
        cc.spriteFrameCache.addSpriteFrames(res.BubbleBlast_plist);
        var spriteBubbleTexture = cc.textureCache.addImage(res.BubbleBlast_png),
        spriteBubbleImages  = new cc.SpriteBatchNode(spriteBubbleTexture);
        this.addChild(spriteBubbleImages);

        var animFrames = [];
        var str = "";
        for (var i = 1; i <= 7; i++) {
            str = "B" + i + ".png";
            var spriteFrame = cc.spriteFrameCache.getSpriteFrame(str);
            var animFrame = new cc.AnimationFrame();
            animFrame.initWithSpriteFrame(spriteFrame, 1, null);
            animFrames.push(animFrame);
        }
        
        var animation = new cc.Animation(animFrames, 0.08, 1);
        var animate   = new cc.Animate(animation); 
        
        if(spriteType == 0){
             spriteBubble.color = new cc.color(241,18,18);
        }else if(spriteType == 1){
             spriteBubble.color = new cc.color(72 ,255,17);
        }else if(spriteType == 2){
             spriteBubble.color = new cc.color(255,217 ,11);
        }else if(spriteType == 3){
             spriteBubble.color = new cc.color(174,17,255);
        }else if(spriteType == 4){
             spriteBubble.color = new cc.color(21,18,255);
        }else if(spriteType == 5){
             spriteBubble.color = new cc.color(255,76,14);
        }else if(spriteType == 7){
            spriteBubble.color = new cc.color(220,220,220);
        }
       
        spriteBubble.runAction(cc.sequence( animate, cc.callFunc(this.deleteSpriteBubble,this)));
    },
    
    deleteSpriteBubble : function (data){
        
         this.removeChild(data);
        
    },
    
    checkBubbleStatus : function (){
        
          for (let j=0; j < this.level.rows; j++) {
            for (let i=0; i < this.level.columns; i++) {
                 
               let tile = this.level.tiles[i][j];
               
                    if (tile.type >= 0) {
                     
                     this.removeChild(this.bubbleName[i][j]);
                    
                    }
                }
            }
            
            this.renderTiles();
    },
      
    // Find floating clusters
     findFloatingClusters : function() {
        
        // Reset the processed flags
        this.resetProcessed();
        
        let foundclusters = [];
        
        // Check all tiles
        for (let i=0; i < this.level.columns; i++) {
            for (let j=0; j < this.level.rows; j++) {
                let tile = this.level.tiles[i][j];
                if (!tile.processed) {
                    // Find all attached tiles
                    let foundcluster = this.findCluster(i, j, false, false, true);
                    
                    // There must be a tile in the cluster
                    if (foundcluster.length <= 0) {
                        continue;
                    }
                    
                    // Check if the cluster is floating
                    let floating = true;
                    for (let k=0; k < foundcluster.length; k++) {
                        if (foundcluster[k].y == 0) {
                            // Tile is attached to the roof
                            floating = false;
                            break;
                        }
                    }
                    
                    if (floating) {
                        // Found a floating cluster
                        foundclusters.push(foundcluster);
                    }
                }
            }
        }
        return foundclusters;
    },
     checkGameOver : function () {
        // Check for game over
        for (let i=0; i < this.level.columns; i++) {
            // Check if there are bubbles in the bottom row
            if (this.level.tiles[i][this.level.rows-1].type != -1) {
                // Game over
                this.nextBubble();
                this.setGameState(this.gamestates.gameover);
                //this.DataCard("gameOver");
                return true;
            }
        }
        
        return false;
    },
   
    // Get the closest grid position
    getGridPosition : function (x, y) {
        let gridy = Math.floor((y - this.level.y) / this.level.rowheight);
        
        // Check for offset
        let xoffset = 0;
        if ((gridy + this.rowoffset) % 2) {
            xoffset = this.level.tilewidth / 2;
        }
        
        let gridx = Math.floor(((x - xoffset) - this.level.x) / this.level.tilewidth);
        
        return { x: gridx, y: gridy };
    },
    
    // Find cluster at the specified tile location
    findCluster : function (tx, ty, matchtype, reset, skipremoved) {
        // Reset the processed flags
        if (reset) {
            this.resetProcessed();
        }
        
        // Get the target tile. Tile coord must be valid.
        let targettile = this.level.tiles[tx][ty];
        
        // Initialize the toprocess array with the specified tile
        let toprocess = [targettile];
        targettile.processed = true;
        let foundcluster = [];

        while (toprocess.length > 0) {
            // Pop the last element from the array
            let currenttile = toprocess.pop();
            
            // Skip processed and empty tiles
            if (currenttile.type == -1) {
                continue;
            }
            
            // Skip tiles with the removed flag
            if (skipremoved && currenttile.removed) {
                continue;
            }
            
            // Check if current tile has the right type, if matchtype is true
            if (!matchtype || (currenttile.type == targettile.type)) {
                // Add current tile to the cluster
                foundcluster.push(currenttile);
                
                // Get the neighbors of the current tile
                let neighbors = this.getNeighbors(currenttile);
                
                // Check the type of each neighbor
                for (let i=0; i < neighbors.length; i++) {
                    if (!neighbors[i].processed) {
                        // Add the neighbor to the toprocess array
                        toprocess.push(neighbors[i]);
                        neighbors[i].processed = true;
                    }
                }
            }
        }
        
        // Return theu found cluster
        return foundcluster;
    },
 
     
    // Reset the processed flags
    resetProcessed : function () {
        for (let i=0; i < this.level.columns; i++) {
            for (let j=0; j < this.level.rows; j++) {
                this.level.tiles[i][j].processed = false;
            }
        }
    },
   
    // Reset the removed flags
   resetRemoved : function () {
        for (let i=0; i < this.level.columns; i++) {
            for (let j=0; j < this.level.rows; j++) {
                this.level.tiles[i][j].removed = false;
            }
        }
    },
    
    
      // Get the neighbors of the specified tile
    getNeighbors : function(tile) {
        let tilerow = (tile.y + this.rowoffset) % 2; // Even or odd row
        let neighbors = [];
        
        // Get the neighbor offsets for the specified tile
        let n = this.neighborsoffsets[tilerow];
        
        // Get the neighbors
        for (let i=0; i < n.length; i++) {
            // Neighbor coordinate
            let nx = tile.x + n[i][0];
            let ny = tile.y + n[i][1];
            
            
            // Make sure the tile is valid
            if (nx >= 0 && nx < this.level.columns && ny >= 0 && ny < this.level.rows) {
                neighbors.push(this.level.tiles[nx][ny]);
            }
        }
        
        return neighbors;
    },
    

// Get the tile coordinate
    getTileCoordinate : function (column, row) {
        let tilex = this.level.x + column * this.level.tilewidth;
        
        // X offset for odd or even rows
        if ((row + this.rowoffset) % 2) {
            tilex += this.level.tilewidth/2;
        }
        
        let tiley = (cc.director.getWinSize().height - 80) - (this.level.y + ( row * this.level.rowheight));
        return { tilex: tilex, tiley: tiley };
    },

// Create a random bubble for the player
   nextBubble : function () {
 
        // Set the current bubble
                
        this.player.tiletype = this.player.nextbubble.tiletype;
        this.player.bubble.tiletype = this.player.nextbubble.tiletype;
        this.player.bubble.x = this.player.x;
        this.player.bubble.y = this.player.y;
        
        this.player.bubble.visible = true;
        
        // Get a random type from the existing colors
        let nextcolor = this.getExistingColor();
        
        // Set the next bubble
        this.player.nextbubble.tiletype = nextcolor;
    },
    
   // Get a random existing color
   getExistingColor : function () {
        
       let existingcolors = this.findColors();
       
       if(existingcolors.length == 1){
            return existingcolors[0];
        }

        if(existingcolors.length == 2){
            if(this.flagSwitchTwoColor){
                 this.flagSwitchTwoColor = false;
                 return existingcolors[0];
            }else{
                this.flagSwitchTwoColor = true;
                return existingcolors[1];
            }   
        }

        let bubbletype = 0;
        if (existingcolors.length > 0) {
            bubbletype = existingcolors[Math.floor(Math.random()*100 % (existingcolors.length-1))];
        }
        
        return bubbletype;
    },
    
    // Find the remaining colors
     findColors : function () {
        let foundcolors = [];
        let colortable = [];
        for (let i=0; i < bubblecolors; i++) {
            colortable.push(false);
        }
        
        // Check all tiles
        for (let i=0; i < this.level.columns; i++) {
            for (let j=0; j < this.level.rows; j++) {
                let tile = this.level.tiles[i][j];
                if (tile.type >= 0) {
                   
                    if (!colortable[tile.type]) {
                        colortable[tile.type] = true;
                        foundcolors.push(tile.type);
                    }
                }
            }
        }
      
        return foundcolors;
    },
    
   // Draw the bubble
   drawBubbleGroups : function (x, y, index,col,row) {
        if (index < 0 || index >= bubblecolors)
            return;
            
        // Draw the bubble sprite
        let data = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(imageSprite[index]+".png"));
        data.setPosition(x,y);
        data.anchorX = 0.0;
        data.anchorY = 0.0;
        this.addChild(data);
       
       return data;
    },
    
     // Draw the bubble
     drawLetterGroups : function (x, y, index,col,row) {
        if (index < 0 || index >= bubblecolors)
            return;
      
       // Draw the bubble sprite
    
       let data = new cc.LabelTTF(""+letterSprite[index],"res/fonts/BalooBhai-Regular.ttf",120);
       data.setPosition(x,y);
        // console.log("x : " + row + " y : " + col + " color : " +index);
       return data;
    },
    
     // Draw the bubble
     drawNextBubble : function (x, y, index) {
        if (index < 0 || index >= bubblecolors)
            return;
     
     // Draw the bubble sprite
     if(this.nextBubblePlayer!=undefined)         
         this.removeChild(this.nextBubblePlayer);
     
     this.nextBubblePlayer =  new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(imageSprite[index]+".png"));
     this.nextBubblePlayer.setPosition(this.gunBase.x - 380 ,cc.director.getWinSize().height * 0.0575);
     this.nextBubblePlayer.anchorX=0.5;
     this.nextBubblePlayer.anchorY=0.5;
     //  console.log("the value for y in playe : "+ this.player.bubble.y);
     this.addChild(this.nextBubblePlayer);     
    },
     // Draw the bubble
     drawNextLetter : function (x, y, index) {
        if (index < 0 || index >= bubblecolors)
            return;
  
     this.nextLetterPlayer = new cc.LabelTTF(""+letterSprite[this.player.nextbubble.tiletype],"res/fonts/BalooBhai-Regular.ttf",120);
     this.nextLetterPlayer.setPosition(this.nextBubblePlayer.getContentSize().width/2,this.nextBubblePlayer.getContentSize().height/2);
     this.nextLetterPlayer.setAnchorPoint(0.5,0.5);
     this.nextBubblePlayer.addChild(this.nextLetterPlayer);
    },

    /**
     * Returns a random number between min (inclusive) and max (exclusive)
     */
     getRandomArbitrary : function (min, max) {
        return Math.random() * (max - min) + min;
    },
         rndNumber : function(color)
    {       
        
      let ArrayBubble = new Array(color);
      let newArrayBubble = [];
      
        for(let i =0 ; i < 9 ; i++){
            ArrayBubble[i] = i;
         }
   
        for(let i = 0 ; i < color ; i++){
            
            let temp = Math.floor(this.getRandomArbitrary(0,ArrayBubble.length));
            newArrayBubble.push(ArrayBubble[temp]);
       
            ArrayBubble.splice(temp,1);
        }
        
        return  newArrayBubble;
     
    },


    /**
     * Returns a random integer between min (inclusive) and max (inclusive)
     * Using Math.round() will give you a non-uniform distribution!
     */
    
     getRandomInt : function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
 
     // On mouse movement
      onMouseMove : function (posx , posy) {
      //  console.log("on Move move : -> the posX : "+posx + " the posY : "+posy);
        let mouseangle = 0 ;
		
        // Get the mouse angle
        mouseangle = this.radToDeg(Math.atan2((this.player.y+this.level.tileheight/2) - posy, posx - (this.player.x+this.level.tilewidth/2)));
        //  console.log("pointer position :  "+posx +" "+posy +" angle : "+mouseangle);     
       
        // Convert range to 0, 360 degrees
        if (mouseangle < 0) {
            mouseangle = 180 + (180 + mouseangle);
        }

        // Restrict angle to 8, 172 degrees
        let lbound = 8;
        let ubound = 172;
        if (mouseangle > 90 && mouseangle < 270) {
            // Left
            if (mouseangle > ubound) {
                mouseangle = ubound;
            }
        } else {
            // Right
            if (mouseangle < lbound || mouseangle >= 270) {
                mouseangle = lbound;
            }
        }
        
        this.gun.setRotation((90 - mouseangle));
        console.log(" gun rotation value is : "+this.gun.getRotation() + " mouse angle is : "+mouseangle);
        // Set the player angle
        this.player.angle =  mouseangle; 
    },
 
   // Convert radians to degrees
    radToDeg : function (angle) {
        return angle * (180 / Math.PI);
    },
    
    // Convert degrees to radians
    degToRad : function (angle) {
        return angle * (Math.PI / 180);
    },
    
 setGameState : function (newgamestate) {
        this.gamestate = newgamestate;
        
        this.animationstate = 0;
        this.animationtime = 0;
    },
    
    initVariable : function(ScreenMenu,xPosi){
        
        this.bubblePlayer = null;
        this.letterPlayer = null;
        this.nextBubblePlayer = null;
        this.nextLetterPlayer = null;
        this.mainPlayerBubbleDestroy = false;
        var bubbleSizeReference =  new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("bubble_shooter/red_ball.png"));
        // Neighbor offset table
        this.neighborsoffsets = [[[1, 0], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1]], // Even row tiles
                                    [[1, 0], [1, 1], [0, 1], [-1, 0], [0, -1], [1, -1]]];  // Odd row tiles

        // Game states
        this.gamestates = { init: 0, ready: 1, shootbubble: 2, removecluster: 3, gameComplete : 4 , gameover: 5 };
        this.gamestate = this.gamestates.init;

        // Score
        this.rowoffset = 0;

        // Animation variablespre
        this.animationstate = 0;
        this.animationtime = 0;

        this.finalFlag = false;
        this.killBubble = false;

        if(xPosi == undefined){ xPosi = 0; }      
      
        // Level
        this.level = {            
            x: 0, // X position
            y: cc.director.getWinSize().height * 0.103,          // Y position
            width: 0,       // Width, gets calculated
            height: 0,      // Height, gets calculated
            columns: 13,    // Number of tile columns
            rows: 9,  // Number of tile rows
            tilewidth: bubbleSizeReference.width,  // Visual width of a tile
            tileheight: bubbleSizeReference.height, // Visual height of a tile
            rowheight: bubbleSizeReference.height * 0.85,  // Height of a row
            radius: bubbleSizeReference.width * 0.5,     // Bubble collision radius
            tiles: []       // The two-dimensional tile array
        };

        // Player
        this.player = {
            x: 0,
            y: 0,
            angle: 0,
            tiletype: 0,

            bubble: {
                    x: 0,
                    y: 0,
                    angle: 0,
                    speed: 2500,
                    tiletype: 0,
                    visible: false
                },
                
                nextbubble: {
                        x: 0,
                        y: 0,
                        tiletype: 0
                }
        };

        // Array Of BubbleColor
        this.counterhits = 0;
        
        // Array Of Letter
        this.letterSprite = [];
        this.imageSprite = [];
        this.bubblecolors = 0;
        this.cluster = [];
        this.floatingclusters = [];
    },
})

xc.Bubble_Number.res = {
    
}