
var Category = cc.Layer.extend({
    
  ctor:function () {
      
   this._super(); 
   
   console.log("level name is : "+levelValues);
   
   imageSprite = ['Red_Balls','Green_Ball','Yellow_Ball','Purple_Ball','Blue_Ball','Orange_Ball'];
   ParticleSprite = ['Red','Green','Orange','Purple','Skyblue','Yellow'];
   
    this.bg = new ClickedButtonToRedirect("Background.png","ClassObjectReference",null,this);
    this.bg.setPosition(cc.director.getWinSize().width/2,cc.director.getWinSize().height/2);
    // cc.eventManager.addListener(allButtonClickedlistener.clone(), this.bg);
    this.addChild(this.bg);

    this.textHitsLabel = new cc.LabelTTF("Hits : 0","Oswald",42);
    this.textHitsLabel.setPosition(cc.director.getWinSize().width*0.87,cc.director.getWinSize().height*0.975);      
    this.addChild(this.textHitsLabel);
   
    this.initVariable();

    console.log("the object A value length is : "+ this.AlphabetsPngData.A_length);
    // Array Of BubbleColor
    bubbleName = new Array(this.level.columns);
        for (let i=0 ; i <this.level.rows; i++)
        bubbleName[i] = new Array(this.level.rows);

    // Array Of Letter
    LetterName = new Array(this.level.columns);
        for (let i=0 ; i <this.level.rows; i++)
        LetterName[i] = new Array(this.level.rows);
        
        
        for (let i=0; i < this.level.columns ;  i++) {
            this.level.tiles[i] = [];
            for (let j=0; j < this.level.rows; j++) {
                
                // Define a tile type and a shift parameter for animation
                this.level.tiles[i][j] = new Tile(i, j, 0, 0);
           }
        }
        
        // Define a level width and height
        this.level.width = this.level.columns * this.level.tilewidth + this.level.tilewidth/2;
        this.level.height = (this.level.rows-1) * this.level.rowheight + this.level.tileheight + 42;
    
        // Set the gamestate to ready
        this.setGameState(this.gamestates.ready);
    
        if(levelValues ==  1){         
            levelName = "AnimalStarLevel1";            
            hits = 50;
            letterSprite = ['A','B','C','D','E','F'];
         
            let color = 4 , repeat = 2;
            // Create the level of bubbles
            this.createLevel(color,repeat);
            // console.log("done" + this.level.tiles);
       
        }else if(levelValues ==  2){
            levelName = "AnimalStarLevel2";            
            hits = 50;
            letterSprite = ['E','F','G','H'];
            let color = 4 , repeat = 2;
      
            // Create the level of bubbles
           this.createLevel(color,repeat);
        
        }else if(levelValues ==  3){
            levelName = "AnimalStarLevel3";            
            hits = 50;
            letterSprite = ['I','J','K','L'];
            let color = 4 , repeat = 2;
       
            // Create the level of bubbles
            this.createLevel(color,repeat);
            
        }else if(levelValues ==  4){
            levelName = "AnimalStarLevel4";            
            hits = 50;
            letterSprite = ['M','N','O','P'];
            let color = 4 , repeat = 2;
    
            // Create the level of bubbles
            this.createLevel(color,repeat);
        
        }else if(levelValues ==  5){
            levelName = "AnimalStarLevel5";            
            hits = 50;
            letterSprite = ['Q','R','S','T'];
            let color = 4 , repeat = 2;
     
            // Create the level of bubbles
            this.createLevel(color,repeat);
        
            
        }else if(levelValues ==  6){
            levelName = "AnimalStarLevel6";            
            hits = 50;
            letterSprite = ['U','V','W','X'];
            let color = 4 , repeat = 2;
      
            // Create the level of bubbles
            this.createLevel(color,repeat);
        
            
        }else if(levelValues ==  7){
            levelName = "AnimalStarLevel7";            
            hits = 50;
            letterSprite = ['Y','Z','M','X'];
            let color = 4 , repeat = 2;
      
            // Create the level of bubbles
            this.createLevel(color,repeat);
        
            
        }else if(levelValues ==  8){
            levelName = "AnimalStarLevel8";            
            hits = 60;
            let color = 4 , repeat = 3;
            let Animals = this.rndAnimal(color);
            let DataAnimals = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

            letterSprite = [DataAnimals[Animals[0]],DataAnimals[Animals[1]],DataAnimals[Animals[2]],DataAnimals[Animals[3]]];
        
            // Create the level of bubbles
            this.createLevel(color,repeat);
        
        }else if(levelValues ==  9){
            levelName = "AnimalStarLevel9";            
            hits = 60;            
            let color = 4 , repeat = 2;
        
            let Animals = this.rndAnimal(color);
            let DataAnimals = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

            letterSprite = [DataAnimals[Animals[0]],DataAnimals[Animals[1]],DataAnimals[Animals[2]],DataAnimals[Animals[3]]];
     
            // Create the level of bubbles
            this.createLevel(color,repeat);
            
        }else if(levelValues ==  10){
            levelName = "AnimalStarLevel10";            
            hits = 80;
            let color = 4 , repeat = 1;

            let Animals = this.rndAnimal(color);
            let DataAnimals = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

            letterSprite = [DataAnimals[Animals[0]],DataAnimals[Animals[1]],DataAnimals[Animals[2]],DataAnimals[Animals[3]]];
      
            // Create the level of bubbles
            this.createLevel(color,repeat);
        
            
        }else if(levelValues ==  11){
            levelName = "AnimalStarLevel11";            
            hits = 80;
            let color = 5 , repeat = 1;

            let Animals = this.rndAnimal(color);
            let DataAnimals = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

            letterSprite = [DataAnimals[Animals[0]],DataAnimals[Animals[1]],DataAnimals[Animals[2]],DataAnimals[Animals[3]],DataAnimals[Animals[4]]];
     
            // Create the level of bubbles
            this.createLevel(color,repeat);
            
        }else if(levelValues ==  12){
            levelName = "AnimalStarLevel12";            
            hits = 200;
            let color = 6 , repeat = 1;

            let Animals = this.rndAnimal(color);
            let DataAnimals = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

            letterSprite = [DataAnimals[Animals[0]],DataAnimals[Animals[1]],DataAnimals[Animals[2]],DataAnimals[Animals[3]],DataAnimals[Animals[4]],DataAnimals[Animals[5]]];
       
            // Create the level of bubbles
            this.createLevel(color,repeat);
            
        }
      else{
            console.log("level management error  - The value if level is : "+ levelValues );
        }
        
        // Init the this.player in gun 
        this.player.x = this.level.x + this.level.width/2 - this.level.tilewidth/2 ;
        console.log("this.player.x = "+(this.level.x + this.level.width/2 - this.level.tilewidth/2) + "  this.level.x : "+this.level.x+" this.level.width/2 : "+this.level.width/2+" this.level.tilewidth/2 : "+this.level.tilewidth/2);
        this.player.y = this.level.y + this.level.height - 43;
        
        this.player.angle = 90;
        this.player.tiletype = 0;
        
        // Init the next-this.player
        this.player.nextbubble.x = this.player.x - 2 * this.level.tilewidth;
        this.player.nextbubble.y = this.player.y;
        
        // Set the gun Pointer
        this.gun = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Gun_Shooter.png"));
        this.gun.setPosition(cc.director.getWinSize().width/2, cc.director.getWinSize().height *0.095);
        this.gun.name ="gunPointer";
        this.gun.anchorY = 0.6;
        this.addChild(this.gun);
 
       //Set the gun Base
        this.gunBase =  new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Gun_Base.png"));
        this.gunBase.setPosition(cc.director.getWinSize().width/2 , cc.director.getWinSize().height * 0.0685);
        this.addChild(this.gunBase);
        
        // Init the next bubble and set the current bubble
        this.nextBubble();
        this.nextBubble();
        this.angle = 0;
      
        if(this.player.bubble.tiletype == undefined){
            this.player.bubble.tiletype = Math.floor(this.getRandomArbitrary(0,bubblecolors)); ;
        }

        this.bubblePlayer =  new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(imageSprite[this.player.bubble.tiletype]+".png"));
        this.letterPlayer =  new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(letterSprite[this.player.bubble.tiletype]+".png"));
        this.bubblePlayer.setPosition((this.level.width/2)  , cc.director.getWinSize().height - (cc.director.getWinSize().height * 0.88046875));
        this.letterPlayer.setPosition((this.level.width/2)  , cc.director.getWinSize().height - (cc.director.getWinSize().height * 0.88046875));

        this.addChild(this.bubblePlayer);
        this.addChild(this.letterPlayer);

        if(this.player.nextbubble.tiletype == undefined){
            this.player.nextbubble.tiletype = Math.floor(this.getRandomArbitrary(0,bubblecolors)); ;
        }
         
        this.nextBubblePlayer =  new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(imageSprite[this.player.nextbubble.tiletype]+".png"));
        this.nextLetterPlayer =  new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(letterSprite[this.player.nextbubble.tiletype]+".png"));
        this.nextBubblePlayer.setPosition((this.level.width/2) - 150  , cc.director.getWinSize().height - 1127);
        this.nextLetterPlayer.setPosition((this.level.width/2) - 150  , cc.director.getWinSize().height - 1127);
    
        this.addChild(this.nextBubblePlayer);
        this.addChild(this.nextLetterPlayer);
        
        this.renderTiles(); 
      
       // this.schedule(nextBubble,3);
      this.scheduleUpdate();
    
    return true;
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
        else if (this.gamestate == this.gamestates.shootbubble) {
            // Bubble is moving
            this.stateShootBubble();
           
        }else if (this.gamestate == this.gamestates.removecluster && (!killBubble)) {
            // Remove cluster and drop tiles
            this.stateRemoveCluster();
        }else if (this.gamestate == this.gamestates.gameover){
            console.log("game over bro !!");
        }
    },
     
    gunMove : function(){
        // console.log("done 276");
        this.onMouseMove(currentPointerOnBg.x , currentPointerOnBg.y);
        // console.log("x and y : "+currentPointerOnBg.x +"  "+ currentPointerOnBg.y);
         if (this.gamestate == this.gamestates.ready) {
                 this.shootBubble(); 
            }
    },
       // use this method for render player and next bubble player in gun  
     definePlayerAndNextBubble : function(){
        
            this.bubblePlayer =  new cc.Sprite("res/imgs/"+imageSprite[player.bubble.tiletype]+".png");
            this.letterPlayer =  new cc.Sprite("res/imgs/"+letterSprite[player.bubble.tiletype]+".png");
            this.bubblePlayer.setPosition((this.level.width/2)  , cc.director.getWinSize().height - 1127);
            this.letterPlayer.setPosition((this.level.width/2)  , cc.director.getWinSize().height - 1127);

            this.addChild(this.bubblePlayer);
            this.addChild(this.letterPlayer);
            
            this.nextBubblePlayer =  new cc.Sprite("res/imgs/"+imageSprite[player.nextbubble.tiletype]+".png");
            this.nextLetterPlayer =  new cc.Sprite("res/imgs/"+letterSprite[player.nextbubble.tiletype]+".png");
            this.nextBubblePlayer.setPosition((this.level.width/2) - 150  , cc.director.getWinSize().height - 1127);
            this.nextLetterPlayer.setPosition((this.level.width/2) - 150  , cc.director.getWinSize().height - 1127);
        
            this.addChild(this.nextBubblePlayer);
            this.addChild(this.nextLetterPlayer);
            
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
                               
               if (j < this.level.rows/2) {
                   
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
                    bubbleName[i][j] = this.drawBubbleGroups(coord.tilex, coord.tiley + shift, tile.type,i,j);
                    LetterName[i][j] = this.drawLetterGroups(coord.tilex, coord.tiley + shift, tile.type,i,j);
                    bubbleName[i][j].name = letterSprite[tile.type];
                    LetterName[i][j].name = letterSprite[tile.type];
                }
            }
        }
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

      },
        // Draw the bubble
      drawBubble : function(x, y, index) {
        
        if (index < 0 || index >= bubblecolors)
           return;
                
        // Use to kill the previous bubble sprite
        
        // this.removeChild(bubblePlayer,true);
        // this.removeChild(letterPlayer,true);
        
           if(this.mainPlayerBubbleDestroy){
            //   console.log("done 413");
              this.bubblePlayer =  new cc.Sprite(cc.spriteFrameCache.getSpriteFrame( imageSprite[ this.player.bubble.tiletype]+".png"));
              this.letterPlayer =  new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(letterSprite[ this.player.bubble.tiletype]+".png"));
              this.addChild(this.bubblePlayer);
              this.addChild(this.letterPlayer);
              
              this.mainPlayerBubbleDestroy = false;
          }  
        // this.bubblePlayer.removeFromParent(true);
        // this.letterPlayer.removeFromParent(true);
       
        // // sprrand24.removeFromParentAndCleanup(true);
        // // piu.at(realnumofplus - 1)->autorelease();
        // // piu.at(realnumofplus - 1)->deleteSprite();
        
        // //  the bubble sprite
        // this.bubblePlayer =  new cc.Sprite("res/imgs/"+ imageSprite[index]+".png");
        // this.letterPlayer =  new cc.Sprite("res/imgs/"+letterSprite[index]+".png");
        
        this.bubblePlayer.setPosition(this.player.bubble.x, cc.director.getWinSize().height -  this.player.bubble.y);
        this.letterPlayer.setPosition(this.player.bubble.x, cc.director.getWinSize().height - this.player.bubble.y);
        
        this.bubblePlayer.anchorX=0.0;
        this.bubblePlayer.anchorY=0.35;
        
        this.letterPlayer.anchorX = 0.0;
        this.letterPlayer.anchorY = 0.35;
        // console.log("done 440");
        // this.addChild(this.bubblePlayer);
        // this.addChild(this.letterPlayer);
    },
       
    stateShootBubble : function(){
     
        // Bubble is moving
        // Move the bubble in the direction of the mouse
        this.player.bubble.x += 0.02490099999977974 * this.player.bubble.speed * Math.cos(this.degToRad(this.player.bubble.angle));
        this.player.bubble.y += 0.02490099999977974 * this.player.bubble.speed * -1 * Math.sin(this.degToRad(this.player.bubble.angle));
        
        if (this.player.bubble.visible) {
            
            this.drawBubble(this.player.bubble.x, this.player.bubble.y, this.player.bubble.tiletype);
        }
       
        // Handle left and right collisions with the level
        if (this.player.bubble.x <= this.level.x) {
           
            // Left edge
            this.player.bubble.angle = 180 - this.player.bubble.angle;
            this.player.bubble.x = this.level.x;
        } else if (this.player.bubble.x + this.level.tilewidth >= this.level.x + this.level.width) {
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
        // console.log("gridpos x and y : "+ gridpos.x +"  "+ gridpos.y);
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
                
               bubbleName[gridpos.x][gridpos.y] = this.bubblePlayer;
               LetterName[gridpos.x][gridpos.y] = this.letterPlayer;
               this.checkBubbleStatus();
               // Check for game over
               if (this.checkGameOver()) {
                   return;
                }
                // console.log("done 578");
                // Find clusters
                this.cluster = this.findCluster(gridpos.x, gridpos.y, true, true, false);
                console.log("cluster size is : "+ this.cluster.length);
                
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
              let self  = this;
        // console.log("done 622");      
        if (this.animationstate == 0) {
            console.log("flag to remove the bubble is on");
             this.resetRemoved();
            
            // Mark the tiles as removed
            for (let i=0; i < this.cluster.length; i++) {
                // Set the removed flag
                this.cluster[i].removed = true;
            }
            
            // Add cluster score
            // this.score += this.cluster.length * 10;
            // console.log(" cluster bubble score : "+ this.score);
           
            // Find floating clusters
            this.floatingclusters = this.findFloatingClusters();
            console.log("float cluster : "+ this.floatingclusters.length);
            this.animationstate = 1;
                   
        }
        
        if (this.animationstate == 1) {
            // Pop bubbles
            let tilesleft = false; 

        //    console.log("done 648");
           
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
                    
                    // console.log("bubble name : " + bubbleName[tile.x][tile.y].name + " " + "column and row : "+tile.x + "  "+tile.y);
                    // console.log("letter name : " + LetterName[tile.x][tile.y].name + " " + "column and row : "+tile.x + "  "+tile.y);   
                      
                    if (tile.alpha == 0) {
			                    
                        if(i != 0 ){
                            this.playerDie(tile.x,tile.y,i);
                        }
                        
                        if( i == 0 ){
                        //   this.reorderChild(bubbleName[tile.x][tile.y], 6);
                        //   this.reorderChild(LetterName[tile.x][tile.y],6);
                        
                        var NameBubble = LetterName[tile.x][tile.y].name;
                        this.removeChild(bubbleName[tile.x][tile.y]);
                        this.removeChild(LetterName[tile.x][tile.y]);
                        
                        var Alphabetlength = Object.keys(this.AlphabetsPngData[""+LetterName[tile.x][tile.y].name]).length;
                        randomImageIndex = this.getRandomInt(1,Alphabetlength);                  
      
                        bubbleName[tile.x][tile.y] =  new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("WhiteBall.png"));
                        LetterName[tile.x][tile.y] =  new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(this.AlphabetsPngData[NameBubble][NameBubble+""+randomImageIndex]));
                        console.log("the name of image is : "+ this.AlphabetsPngData[NameBubble][NameBubble+""+randomImageIndex]);
                    
                        this.addChild(bubbleName[tile.x][tile.y]);
                        this.addChild(LetterName[tile.x][tile.y]);
                        
                        let coord = this.getTileCoordinate(tile.x, tile.y);
                        bubbleName[tile.x][tile.y].setPosition(coord.tilex,coord.tiley);
                        LetterName[tile.x][tile.y].setPosition(coord.tilex,coord.tiley);
                    
                        bubbleName[tile.x][tile.y].anchorX = 0.5;
                        bubbleName[tile.x][tile.y].anchorY = 0.5;
                            
                        LetterName[tile.x][tile.y].anchorX = 0.5;
                        LetterName[tile.x][tile.y].anchorY = 0.5;
                    
                        bubbleName[tile.x][tile.y].runAction(cc.ScaleTo.create(1.5,3));
                        LetterName[tile.x][tile.y].runAction(cc.ScaleTo.create(1.5,3));
                        
                        bubbleName[tile.x][tile.y].runAction(cc.MoveTo.create(1,cc.p(cc.director.getWinSize().width/2, cc.director.getWinSize().height/2)));
                        LetterName[tile.x][tile.y].runAction(cc.MoveTo.create(1,cc.p(cc.director.getWinSize().width/2, cc.director.getWinSize().height/2)));
                        
                        // if( soundFlagName != "numbers"){

                        //     cc.audioEngine.playEffect("res/sounds/abcd/"+LetterName[tile.x][tile.y].name+"_Sound.wav");

                        // }else if( soundFlagName == "numbers"){

                        //     cc.audioEngine.playEffect("res/sounds/numbers/"+LetterName[tile.x][tile.y].name+".mp3");

                        // }

                           setTimeout(function() {
                                self.playerDie(tile.x,tile.y,tempColorType);
                                // self.bubbleName[tile.x][tile.y].alpha = 0;
                                self.finalFlag = true;
                                // renderPlayer();
                           }, 1600);
                              
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
                            
                             setTimeout(function() {
                                self.playerDie(tile.x,tile.y,7);
                             }, 150);      
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
                    
                    // //Calculate for Stars
                    //  if(this.score >= 900 ){
                         
                    //     console.log("3 stars");                        
                    //     localStorage.setItem(this.levelName , '3');
                    // }else if (this.score >500 && this.score < 900){
                    //     console.log("2 stars");
                    //     localStorage.setItem(this.levelName , '2');

                    // }else{
                    //     console.log("1 star");                        
                    //     localStorage.setItem(this.levelName , '1');

                    // }
                   
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
    
     rndAnimal : function(color)
    {       
        
      let ArrayBubble = new Array(color);
      let newArrayBubble = [];
      
        for(let i =0 ; i < 26 ; i++){
            ArrayBubble[i] = i;
         }
   
        for(let i = 0 ; i < color ; i++){
            
            let temp = Math.floor(this.getRandomArbitrary(0,ArrayBubble.length));
            newArrayBubble.push(ArrayBubble[temp]);
       
            ArrayBubble.splice(temp,1);
        }
        
        return  newArrayBubble;
     
    },
           
       DataCard : function (gamestatus){
   
       var level = levelValues;
        
        if(soundFlagName != "numbers" && levelValues == 12){
            level = 0 ;
        }else if(soundFlagName == "numbers" && levelValues == 8){
            level = 0 ;
        }
        // console.log("845");
        this.bg1 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Trans_Image.png"));
        this.bg1.setPosition(cc.director.getWinSize().width/2,cc.director.getWinSize().height/2);
        this.addChild(this.bg1,6);
        
        if(gamestatus == "complete"){
            this.CompleteText = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Level_Complete.png"));
            this.CompleteText.setPosition(cc.director.getWinSize().width/2,cc.director.getWinSize().height * 0.7265625);
            this.addChild(this.CompleteText,6);
            
            this.Stars = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("starGame2.png"));
            this.Stars.setPosition(cc.director.getWinSize().width/2,cc.director.getWinSize().height * 0.59375);
            this.addChild(this.Stars,6);
                
            this.buttonNext = new ClickedButtonToRedirect("Next_Button.png",soundFlagName,(level+1));
            this.buttonNext.setPosition(cc.director.getWinSize().width/2,cc.director.getWinSize().height * 0.453125);
            this.addChild(this.buttonNext,6);
            
            this.buttonRetry = new ClickedButtonToRedirect("Retry_Button.png",soundFlagName,(level));
            this.buttonRetry.setPosition(0.35 * cc.director.getWinSize().width,cc.director.getWinSize().height * 0.33);
            this.addChild(this.buttonRetry,6);
            
            this.buttonMenu = new ClickedButtonToRedirect("Menu_Button.png","menuScreen");
            this.buttonMenu.setPosition(0.65 * cc.director.getWinSize().width,cc.director.getWinSize().height * 0.33);
            this.addChild(this.buttonMenu,6);

        }else{
            
            this.CompleteText = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Level_Failed.png"));
            this.CompleteText.setPosition(cc.director.getWinSize().width/2,cc.director.getWinSize().height * 0.7265625);
            this.addChild(this.CompleteText,6);
            
            this.Stars = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("starGame1.png"));
            this.Stars.setPosition(cc.director.getWinSize().width/2,cc.director.getWinSize().height * 0.59375);
            this.Stars.color = new cc.color(38,38,38);
            this.addChild(this.Stars,6);
            
            this.buttonRetry = new ClickedButtonToRedirect("Retry_Button.png",soundFlagName,(level));
            this.buttonRetry.setPosition(0.35 * cc.director.getWinSize().width,cc.director.getWinSize().height * 0.375);
            this.addChild(this.buttonRetry,6);
            
            this.buttonMenu = new ClickedButtonToRedirect("Menu_Button.png","menuScreen");
            this.buttonMenu.setPosition(0.65 * cc.director.getWinSize().width,cc.director.getWinSize().height * 0.375);
            this.addChild(this.buttonMenu,6);
        }
    },
    
   playerDie : function (tilex,tiley,type,float){
    //    if(type!=0)
    //    this.playAnimationParticle(tilex,tiley);
        // console.log("matched bubble : "+float);
        // this.removeChild(bubbleName[tilex][tiley]);
        this.animationBubbleBlast(bubbleName[tilex][tiley],type);
        this.removeChild(LetterName[tilex][tiley]);
    },
    
    animationBubbleBlast : function(spriteBubble,spriteType){
        
        // Load sprite frames to frame cache, add texture node
        cc.spriteFrameCache.addSpriteFrames(res.BubbleBlast_plist);
        var spriteBubbleTexture = cc.textureCache.addImage(res.BubbleBlast_png),
        spriteBubbleImages  = cc.SpriteBatchNode.create(spriteBubbleTexture);
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
        
        var animation = cc.Animation.create(animFrames, 0.08, 1);
        var animate   = cc.Animate.create(animation); 
        
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
       
        var context = this;
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
                     
                     this.removeChild(bubbleName[i][j]);
                     this.removeChild(LetterName[i][j]);
                     
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
                this.DataCard("gameOver");
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
    
    // // Render the player bubble
    // function renderPlayer() {
      
    //          // Draw the next bubble which will come in gun
    //         drawNextBubble(player.nextbubble.x, player.nextbubble.y, player.nextbubble.tiletype);
    //         drawNextLetter(player.nextbubble.x, player.nextbubble.y, player.nextbubble.tiletype);
            
    //          // Draw the bubble in gun
    //          if (player.bubble.visible) {
    //              drawBubble(player.bubble.x, player.bubble.y, player.bubble.tiletype);                 
    //          }     
    // }

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
        // console.log("1154");
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
     let data = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(letterSprite[index]+".png"));
       data.setPosition(x,y);
       data.anchorX = 0.0;
       data.anchorY = 0.0;
       this.addChild(data);
        // console.log("x : " + row + " y : " + col + " color : " +index);
       return data;
    },
    
    
     // Draw the bubble
    drawNextBubble : function (x, y, index) {
        if (index < 0 || index >= bubblecolors)
            return;
     // Draw the bubble sprite
     this.removeChild(this.nextBubblePlayer);
     
     this.nextBubblePlayer =  new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(imageSprite[index]+".png"));
     this.nextBubblePlayer.setPosition((cc.director.getWinSize().width/2 - 350)  , cc.director.getWinSize().height * 0.0607080);
    //  console.log("the value for y in playe : "+ this.player.bubble.y);
     this.addChild(this.nextBubblePlayer);
     
    },
    
     // Draw the bubble
    drawNextLetter : function (x, y, index) {
        if (index < 0 || index >= bubblecolors)
            return;
      //  console.log("1199");
        // Draw the bubble sprite
     this.removeChild(this.nextLetterPlayer);
     this.nextLetterPlayer =  new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(letterSprite[index]+".png"));
     this.nextLetterPlayer.setPosition((cc.director.getWinSize().width/2 - 350)  , cc.director.getWinSize().height * 0.0607080);
     this.addChild(this.nextLetterPlayer);
    },

    /**
     * Returns a random number between min (inclusive) and max (exclusive)
     */
     getRandomArbitrary : function (min, max) {
        return Math.random() * (max - min) + min;
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
    initVariable : function(){
        
        this.bubblePlayer = null;
        this.letterPlayer = null;
        this.nextBubblePlayer = null;
        this.nextLetterPlayer = null;
        this.mainPlayerBubbleDestroy = false;
        this.counterhits = 0;
        this.finalFlag = false;
        var bubbleSizeReference =  new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Green_Ball.png"));          
                 // Neighbor offset table
        this.neighborsoffsets = [[[1, 0], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1]], // Even row tiles
                                    [[1, 0], [1, 1], [0, 1], [-1, 0], [0, -1], [1, -1]]];  // Odd row tiles

        // Game states
        this.gamestates = { init: 0, ready: 1, shootbubble: 2, removecluster: 3, gameComplete : 4 , gameover: 5 };
        this.gamestate = this.gamestates.init;

        this.self = null;
        this.selfs = null;

        // Score
        this.score = 0;
        this.count = 0;
        this.turncounter = 0;
        this.rowoffset = 0;

        // Animation variablespre
        this.animationstate = 0;
        this.animationtime = 0;
        this._rndSign = -1;   

        this.soundFlagName ="Animals";
        this.finalFlag = false;
        this.killBubble = false;
        this.gameOverFlag = true;

        // Images
        this.images = [];
        
        // this.gun = null;

        // Image loading global variables
        this.loadcount = 0;
        this.loadtotal = 0;
        this.reloaded = false;

         // Level
        this.level = {

            x: 0,          // X position
            y: cc.director.getWinSize().height * 0.085,          // Y position
            width: 0,       // Width, gets calculated
            height: 0,      // Height, gets calculated
            columns: 10,    // Number of tile columns
            rows: 15,  // Number of tile rows
            tilewidth: bubbleSizeReference.width,  // Visual width of a tile
            tileheight: bubbleSizeReference.height, // Visual height of a tile
            rowheight: bubbleSizeReference.height * 0.8421,  // Height of a row
            radius: bubbleSizeReference.width/2 - 5,     // Bubble collision radius
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
                    speed: 4000,
                    dropspeed: 0,
                    tiletype: 0,
                    visible: false
                },
                
                nextbubble: {
                        x: 0,
                        y: 0,
                        tiletype: 0
                }
        };

                        
this.AlphabetsPngData = {

    A:{
        A1 : "Aligator.png",
        A2 : "Ant.png",
        A3 : "Apple.png",
        A4 : "Avacado.png"
    },
    B:{
        B1 : "Banana.png",
        B2 : "Bear.png",
        B3 : "Bee.png",
        B4 : "Brachiosaurus.png",
        B5 : "Brinjal.png",
        B6 : "Buffalo.png",
        B7 : "Bug.png",
        B8 : "Butterfly.png"
    },
    C:{
        C1 : "Camel.png",
        C2 : "Capsicum.png",
        C3 : "Carrot.png",
        C4 : "Cat.png",
        C5 : "Cherry.png",
        C6 : "Chilli.png"
    },
    D:{
        D1 : "Deer.png",
        D2 : "Dinosaur.png",
        D3 : "Dog.png",
        D4 : "Dolphin.png",
        D5 : "Donkey.png",
        D6 : "Duck.png"
    },
    E:{
        E1 : "Elephant.png"   
    },
    F:{
        F1 : "Fish.png",
        F2 : "Frog.png"    
    },
    G:{
        G1 : "Giraffe.png",
        G2 : "Goat.png",
        G3 : "Grapes.png"    
    },
    H:{
        H1 : "Hippo.png",
        H2 : "Horse.png"    
    },
    I:{
        I1 : "Iguana.png"    
    },
    J:{
        J1 : "Jaguar.png" 
    },
    K:{
        K1 : "Kangaroo.png",
        K2 : "Kiwi.png"
    },
    L:{
        L1 : "Lemon.png",
        L2 : "Lion.png"    
    },
    M:{
        M1 :  "Mango.png",
        M2 :  "Monkey.png" 
    },
    N:{
        N1 : "NehrwalFish.png"    
    },
    O:{
        O1 : "Occtopus.png",
        O2 : "Onion.png",
        O3 : "Orange.png",
        O4 : "Owl.png"     
    },
    P:{
        P1 : "Peas.png",
        P2 : "Penguin.png",
        P3 : "Pig.png",
        P4 : "Pin.png",
        P5 : "Pineple.png" 
    },
    Q:{
        Q1 : "QUail_Bird.png" 
    },
    R:{
        R1 : "Rabbit.png",
        R2 : "Raddish.png",
        R3 : "Rat.png"    
    },
    S:{
        S1 : "Scorpion.png",
        S2 : "Snake.png",
        S3 : "Strawberry.png",
        S4 : "Swan.png"
    },
    T:{
        T1 : "Tiger.png",
        T2 : "Tortoise.png"    
    },
    U:{
        U1 : "Unicorn.png"
    },
    V:{
        V1 : "Valture.png" 
    },
    W:{
        W1 : "Watermelon.png",
        W2 : "Wolf.png"
    },
    X:{
        X1: "Xray_Fish.png"
    },
    Y:{
        Y1 : "Yalk.png" 
    },
    Z:{
        Z1 : "Zebra.png"
    }
}

        // Array Of BubbleColor
        this.bubbleName = [];
        this.counterhits = 0;
        // Array Of Letter
        this.LetterName = [];

        this.killBubble = false;

        this.imageSprite = [];
        this.ParticleSprite =[];
        this.bubblecolors = 0;

        this.letterSprite=[];

   
        this.cluster = [];
        this.floatingclusters = [];
    },
})

var CategoryScene = cc.Scene.extend({
    
    onEnter : function () {
        this._super();
      
        var categoryScene = new Category();
     
        this.addChild(categoryScene);
    }
});
