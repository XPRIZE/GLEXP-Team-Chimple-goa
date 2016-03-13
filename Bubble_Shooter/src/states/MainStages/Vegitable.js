import RainbowText from 'objects/RainbowText';

class Vegitable extends Phaser.State {
   
    preload()
    {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.imageSprite = ['Red_Ball','Green_Ball','Yellow_Ball','Purple_Ball','Blue_Ball','Orange_Ball'];
        this.ParticleSprite = ['Red','Green','Orange','Purple','Skyblue','Yellow'];
        
        this.game.load.image('Banana','assets/BananaImg.png');
        this.game.load.image('WhiteBall','assets/WhiteBall.png');
        
    }

	create() {
  
        this.widthScale =  this.game.width / 800;
        this.heightScale = this.game.height / 1280;
       
        this.bg = this.game.add.image(this.game.world.centerX,this.game.world.centerY,'background'); 
        this.bg.anchor.setTo(0.5);
        this.bg.scale.setTo(this.widthScale,this.heightScale);
        this.bg.inputEnabled = true;
       
       this.initialiseVariable();
    
      for (let i=0; i < this.level.columns ;  i++) {
            this.level.tiles[i] = [];
            for (let j=0; j< this.level.rows; j++) {
                
                // Define a tile type and a shift parameter for animation
                this.level.tiles[i][j] = new this.Tile(i, j, 0, 0);
           }
        }
        
       // Define a level width and height
        this.level.width = this.level.columns * this.level.tilewidth + this.level.tilewidth/2;
        this.level.height =(this.level.rows-1) * this.level.rowheight + this.level.tileheight;
      
        // Set the gamestate to ready
        this.setGameState(this.gamestates.ready);
   
        if(this.game._LevelFlag ==  1){        
            this.levelName = "VegitableStarLevel1";            
            this.hits = 50;
            this.letterSprite = ['A','B','C','D'];
            let color = 4 , repeat = 2;
        
            // Create the level of bubbles
            this.createLevel(color,repeat);
        
        }else if(this.game._LevelFlag ==  2){
            this.levelName = "VegitableStarLevel2";            
            this.hits = 50;
            this.letterSprite = ['E','F','G','H'];
            let color = 4 , repeat = 2;
        
            // Create the level of bubbles
            this.createLevel(color,repeat);
        
        }else if(this.game._LevelFlag ==  3){
            this.levelName = "VegitableStarLevel3";            
            this.hits = 50;
            this.letterSprite = ['I','J','K','L'];
            let color = 4 , repeat = 2;
        
            // Create the level of bubbles
            this.createLevel(color,repeat);
            
        }else if(this.game._LevelFlag ==  4){
            this.levelName = "VegitableStarLevel4";            
            this.hits = 50;
            this.letterSprite = ['M','N','O','P'];
            let color = 4 , repeat = 2;
        
            // Create the level of bubbles
            this.createLevel(color,repeat);
        
        }else if(this.game._LevelFlag ==  5){
            this.levelName = "VegitableStarLevel5";            
            this.hits = 50;
            this.letterSprite = ['Q','R','S','T'];
            let color = 4 , repeat = 2;
        
            // Create the level of bubbles
            this.createLevel(color,repeat);
        
            
        }else if(this.game._LevelFlag ==  6){
            this.levelName = "VegitableStarLevel6";            
            this.hits = 50;
            this.letterSprite = ['U','V','W','X'];
            let color = 4 , repeat = 2;
        
            // Create the level of bubbles
            this.createLevel(color,repeat);
        
            
        }else if(this.game._LevelFlag ==  7){
            this.levelName = "VegitableStarLevel7";            
            this.hits = 50;
            this.letterSprite = ['Y','Z','M','X'];
            let color = 4 , repeat = 2;
        
            // Create the level of bubbles
            this.createLevel(color,repeat);
        
            
        }else if(this.game._LevelFlag ==  8){
            this.levelName = "VegitableStarLevel8";            
            this.hits = 60;
            let color = 4 , repeat = 3;
            let Vegitable = this.rndAlphabet(color);
            let DataVegitable = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

            this.letterSprite = [DataVegitable[Vegitable[0]],DataVegitable[Vegitable[1]],DataVegitable[Vegitable[2]],DataVegitable[Vegitable[3]]];
        
            // Create the level of bubbles
            this.createLevel(color,repeat);
        
            
        }else if(this.game._LevelFlag ==  9){
            this.levelName = "VegitableStarLevel9";            
            this.hits = 60;            
            let color = 4 , repeat = 2;
        
            let Vegitable = this.rndAlphabet(color);
            let DataVegitable = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

            this.letterSprite = [DataVegitable[Vegitable[0]],DataVegitable[Vegitable[1]],DataVegitable[Vegitable[2]],DataVegitable[Vegitable[3]]];

            // Create the level of bubbles
            this.createLevel(color,repeat);
            
        }else if(this.game._LevelFlag ==  10){
            this.levelName = "VegitableStarLevel10";            
            this.hits = 80;
            let color = 4 , repeat = 1;

            let Vegitable = this.rndAlphabet(color);
            let DataVegitable = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

            this.letterSprite = [DataVegitable[Vegitable[0]],DataVegitable[Vegitable[1]],DataVegitable[Vegitable[2]],DataVegitable[Vegitable[3]]];

        
            // Create the level of bubbles
            this.createLevel(color,repeat);
        
            
        }else if(this.game._LevelFlag ==  11){
            this.levelName = "VegitableStarLevel11";            
            this.hits = 80;
            let color = 5 , repeat = 1;

            let Vegitable = this.rndAlphabet(color);
            let DataVegitable = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

            this.letterSprite = [DataVegitable[Vegitable[0]],DataVegitable[Vegitable[1]],DataVegitable[Vegitable[2]],DataVegitable[Vegitable[3]],DataVegitable[Vegitable[4]]];

            // Create the level of bubbles
            this.createLevel(color,repeat);
            
        }else if(this.game._LevelFlag ==  12){
            this.levelName = "VegitableStarLevel12";            
            this.hits = 200;
            let color = 6 , repeat = 1;

            let Vegitable = this.rndAlphabet(color);
            let DataVegitable = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

            this.letterSprite = [DataVegitable[Vegitable[0]],DataVegitable[Vegitable[1]],DataVegitable[Vegitable[2]],DataVegitable[Vegitable[3]],DataVegitable[Vegitable[4]],DataVegitable[Vegitable[5]]];

            // Create the level of bubbles
            this.createLevel(color,repeat);
            
        }else{
            console.log("level management error  - The value if level is : "+ this.game._LevelFlag );
        }
        
       // Init the player in gun 
        this.player.x = this.level.x + this.level.width/2 - this.level.tilewidth/2 ;
        this.player.y = this.level.y + this.level.height ;
        
        this.player.angle = 90;
        this.player.tiletype = 0;
        
        // Init the next-player
        this.player.nextbubble.x = this.player.x - 2 * this.level.tilewidth;
        this.player.nextbubble.y = this.player.y;
        
        // Set the gun Pointer
        this.gun = this.game.add.sprite((this.level.width/2) , (this.level.height + this.level.tileheight),'gunPointer');
        this.gun.anchor.setTo(0.5,0.6);
        this.gun.scale.setTo(this.widthScale,this.heightScale);
        this.game.physics.enable(this.gun, Phaser.Physics.ARCADE);
       
       //Set the gun Base
        this.gunBase = this.game.add.sprite((this.level.width/2) , (this.level.height + this.level.tileheight),'gunBase');
        this.gunBase.anchor.setTo(0.5);
        this.gunBase.scale.setTo(this.widthScale,this.heightScale);
       
        
        // Init the next bubble and set the current bubble
        this.nextBubble();
        this.nextBubble();
        this.angle = 0;
        
        this.bubblePlayer = this.game.add.sprite(this.player.x , this.player.y , this.imageSprite[this.player.bubble.tiletype]);
        this.letterPlayer = this.game.add.sprite(this.player.x , this.player.y , this.letterSprite[this.player.bubble.tiletype]);
        
        this.nextBubblePlayer = this.game.add.sprite(this.player.nextbubble.x, this.player.nextbubble.y, this.imageSprite[this.player.nextbubble.tiletype]);
        this.nextLetterPlayer = this.game.add.sprite(this.player.nextbubble.x, this.player.nextbubble.y, this.letterSprite[this.player.nextbubble.tiletype]);
        this.renderTiles(); 
         
        this.particleEffect();
        
	}
    
    render(){
 
        // Render player bubble
        this.renderPlayer();
     
    }
   
     update(){
         
         if (this.gamestate == this.gamestates.ready) {
            // Game is ready for player input
        } else if (this.gamestate == this.gamestates.shootbubble) {
            // Bubble is moving
            this.stateShootBubble();
           
        } else if (this.gamestate == this.gamestates.removecluster && (!this.killBubble)) {
            // Remove cluster and drop tiles
            this.stateRemoveCluster();
        }
      
         if(this.game.input.activePointer.withinGame ){
            this.bg.events.onInputDown.add(this.gunMove, this); 
          }
          
        this.game.physics.arcade.collide(this.emitter);
    }
    
    
    gunMove(){
       
        this.onMouseMove(this.game.input.activePointer.x , this.game.input.activePointer.y);
         if (this.gamestate == this.gamestates.ready) {
                this.shootBubble(); 
            }
    }
    
    rndAlphabet(color)
    {
            
      let ArrayBubble = new Array(color);
      let newArrayBubble = [];
      
        for(let i =0 ; i < 26 ; i++){
            ArrayBubble[i] = i;
         }
   
        for(let i = 0 ; i < color ; i++){
            
            let temp = this.rnd.integerInRange(0,ArrayBubble.length-1);
            newArrayBubble.push(ArrayBubble[temp]);
       
            ArrayBubble.splice(temp,1);
        }
        
        return  newArrayBubble;
     
    }
   
    // Create a random pattern level1
    createLevel( colour , repeat ) {
 
       // Number of different colors
       this.bubblecolors = colour;
     
        let randomtile , newtile = 0 ;
        
        // Create a level with random tiles
         for (let j=0; j < this.level.rows; j++) {
             randomtile = this.rnd.integerInRange(0, this.bubblecolors-1);
            let count = 0;
            for (let i=0; i < this.level.columns; i++) {
                
                if (count >= repeat) {
                                        
                    // Change the random tile
                     newtile = this.rnd.integerInRange(0, this.bubblecolors-1);
                    
                    // Make sure the new tile is different from the previous tile
                    if (newtile == randomtile) {
                        newtile = (newtile + 1) % this.bubblecolors;
                    }
                    randomtile = newtile;
                    count = 0;
                }
                count++;
                               
               if (j < this.level.rows/2) {
                   
                      this.level.tiles[i][j].type = randomtile;   
                   
                } else {
                    this.level.tiles[i][j].type = -1;
                }
            }
        }
    }

  
        // Shoot the bubble
        shootBubble() {
         
        // Shoot the bubble in the direction of the mouse
        this.player.bubble.x = this.player.x;
        this.player.bubble.y = this.player.y;
        this.player.bubble.angle = this.player.angle;
        this.player.bubble.tiletype = this.player.tiletype;

        // Set the gamestate
        this.setGameState(this.gamestates.shootbubble);

      }
    
    setGameState(newgamestate) {
        this.gamestate = newgamestate;
        
        this.animationstate = 0;
        this.animationtime = 0;
    }
  
     // Convert radians to degrees
    radToDeg(angle) {
        return angle * (180 / Math.PI);
    }
    
    // Convert degrees to radians
    degToRad(angle) {
        return angle * (Math.PI / 180);
    }
    
    
    // Create a random bubble for the player
    nextBubble() {
 
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
    }
    
    // Get a random existing color
    getExistingColor() {
      
        this.existingcolors = this.findColors();
        
        let bubbletype = 0;
        if (this.existingcolors.length > 0) {
            bubbletype = this.existingcolors[this.game.rnd.integerInRange(0, this.existingcolors.length-1)];
        }
        
        return bubbletype;
    }
 
    // Find the remaining colors
     findColors() {
        let foundcolors = [];
        let colortable = [];
        for (let i=0; i < this.bubblecolors; i++) {
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
    }
    
    
     // Render tiles
     renderTiles() {
     
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
                    this.LetterName[i][j] = this.drawLetterGroups(coord.tilex, coord.tiley + shift, tile.type,i,j);
                    
                    this.LetterName[i][j].scale.setTo(this.widthScale,this.heightScale);
                    this.bubbleName[i][j].scale.setTo(this.widthScale,this.heightScale);
                    
                    this.game.physics.arcade.enable(this.bubbleName[i][j]);
                    this.game.physics.arcade.enable(this.LetterName[i][j]);
                //   console.log(" bubble object : "+ this.bubbleName);
                }
            }
        }
        
    }
    
    // Draw the bubble
    drawBubbleGroups(x, y, index,col,row) {
        if (index < 0 || index >= this.bubblecolors)
            return;
      
        // Draw the bubble sprite
       let data = this.game.add.sprite(x,y,this.imageSprite[index]);
       return data;
    }
    
     // Draw the bubble
    drawLetterGroups(x, y, index,col,row) {
        if (index < 0 || index >= this.bubblecolors)
            return;
      
        // Draw the bubble sprite
       let data = this.game.add.sprite(x,y,this.letterSprite[index]);
       
        // console.log("x : " + row + " y : " + col + " color : " +index);
       return data;
    }
    
    
    // Draw the bubble
    drawBubble(x, y, index) {
        if (index < 0 || index >= this.bubblecolors)
            return;
            
        // Use to kill the previous bubble sprite
       this.bubblePlayer.destroy(); 
       this.letterPlayer.destroy();
       
       // Draw the bubble sprite
       this.bubblePlayer =  this.game.add.sprite(x,y,this.imageSprite[index]);
       this.letterPlayer =  this.game.add.sprite(x,y,this.letterSprite[index]);
       this.bubblePlayer.scale.setTo(this.widthScale,this.heightScale);
       this.letterPlayer.scale.setTo(this.widthScale,this.heightScale);
       this.bubblePlayer.anchor.setTo(0,0.35);
       this.letterPlayer.anchor.setTo(0,0.35);
    }
    
     // Draw the bubble
    drawNextBubble(x, y, index) {
        if (index < 0 || index >= this.bubblecolors)
            return;
        // Draw the bubble sprite
     this.nextBubblePlayer.destroy();
     this.nextBubblePlayer =  this.game.add.sprite(x,y,this.imageSprite[index]);
     this.nextBubblePlayer.scale.setTo(this.widthScale,this.heightScale);
    }
    
     // Draw the bubble
    drawNextLetter(x, y, index) {
        if (index < 0 || index >= this.bubblecolors)
            return;
        // Draw the bubble sprite
      this.nextLetterPlayer.destroy();
      this.nextLetterPlayer = this.game.add.sprite(x,y,this.letterSprite[index]);
      this.nextLetterPlayer.scale.setTo(this.widthScale,this.heightScale);
    }
    
    // Render the player bubble
    renderPlayer() {
        
             // Draw the next bubble which will come in gun
            this.drawNextBubble(this.player.nextbubble.x, this.player.nextbubble.y, this.player.nextbubble.tiletype);
            this.drawNextLetter(this.player.nextbubble.x, this.player.nextbubble.y, this.player.nextbubble.tiletype);
            
             // Draw the bubble in gun
             if (this.player.bubble.visible) {
                 this.drawBubble(this.player.bubble.x, this.player.bubble.y, this.player.bubble.tiletype);                 
             }     
    }
    
    // Get the tile coordinate
    getTileCoordinate(column, row) {
        let tilex = this.level.x + column * this.level.tilewidth;
        
        // X offset for odd or even rows
        if ((row + this.rowoffset) % 2) {
            tilex += this.level.tilewidth/2;
        }
        
        let tiley = this.level.y + row * this.level.rowheight;
        return { tilex: tilex, tiley: tiley };
    }
  
    
     // On mouse movement
      onMouseMove(posx , posy) {
        console.log("pointer position :  "+posx +" "+posy);
        let mouseangle = 0 ;
		
        // Get the mouse angle
        mouseangle = this.radToDeg(Math.atan2((this.player.y+this.level.tileheight/2) - posy, posx - (this.player.x+this.level.tilewidth/2)));
              
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
        this.gun.angle = 90 - mouseangle;
          
        // Set the player angle
        this.player.angle =  mouseangle; 
    }
    
    stateShootBubble() {
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
                
                // Check for intersections
                let coord = this.getTileCoordinate(i, j);
                if (this.circleIntersection(this.player.bubble.x + this.level.tilewidth/2,
                                       this.player.bubble.y + this.level.tileheight/2,
                                       this.level.radius,
                                       coord.tilex + this.level.tilewidth/2,
                                       coord.tiley + this.level.tileheight/2,
                                       this.level.radius)) {
                   
                    // Intersection with a level bubble
                    this.snapBubble();
                    return;
                }
            }
        }
    }
    
    // Check if two circles intersect
    circleIntersection(x1, y1, r1, x2, y2, r2) {
        // Calculate the distance between the centers
        let dx = x1 - x2;
        let dy = y1 - y2;
        let len = Math.sqrt(dx * dx + dy * dy);
        
        if (len < r1 + r2) {
            // Circles intersect            
            console.log(" intersect bubble = x :  " + (x2 + 1 )  + " y : "+ ( y2+1 ) );
            return true;
        }
        return false;
    }
    
    snapBubble(){
        
        // Get the grid position
        let centerx = this.player.bubble.x + this.level.tilewidth/2;
        let centery = this.player.bubble.y + this.level.tileheight/2;
        let gridpos = this.getGridPosition(centerx, centery);
        
        // Make sure the grid position is valid
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
            
             ++this.count;
             this.hits--;
             
             console.log(" ---------------  you hited "+ this.count +" balls --------------------");
             console.log("hits remaining : "+ this.hits + " count value is : " + this.count);
                
              // Hide the player bubble
              this.player.bubble.visible = false;
        
               // Set the tile
               this.level.tiles[gridpos.x][gridpos.y].type = this.player.bubble.tiletype;
               
               this.bubbleName[gridpos.x][gridpos.y] = this.bubblePlayer;
               this.LetterName[gridpos.x][gridpos.y] = this.letterPlayer;
               this.checkBubbleStatus();
               // Check for game over
               if (this.checkGameOver()) {
                   return;
                }
           
                // Find clusters
                this.cluster = this.findCluster(gridpos.x, gridpos.y, true, true, false);
                console.log("cluster size is : "+ this.cluster.length);
                
                 if( this.hits < 0 ){
                 console.log("  GAME OVER  ");
                 this.setGameState(this.gamestates.gameover);
                 return;
                }
                
                if (this.cluster.length >= 3) {
                //  Remove the cluster
                    this.killBubble = false;
                    this.setGameState(this.gamestates.removecluster);
                    return;
                }   
            }
 
        // Next bubble
        this.nextBubble();
         
        this.setGameState(this.gamestates.ready);
        
    }
   
    
    checkBubbleStatus(){
        
          for (let j=0; j < this.level.rows; j++) {
            for (let i=0; i < this.level.columns; i++) {
                 
               let tile = this.level.tiles[i][j];
               
                    if (tile.type >= 0) {
                     
                     this.bubbleName[i][j].destroy();
                     this.LetterName[i][j].destroy();
                     
                    }
                }
            }
            
            this.renderTiles();
    }
    
    // Get the closest grid position
    getGridPosition(x, y) {
        let gridy = Math.floor((y - this.level.y) / this.level.rowheight);
        
        // Check for offset
        let xoffset = 0;
        if ((gridy + this.rowoffset) % 2) {
            xoffset = this.level.tilewidth / 2;
        }
        
        let gridx = Math.floor(((x - xoffset) - this.level.x) / this.level.tilewidth);
        
        return { x: gridx, y: gridy };
    }

       
    checkGameOver() {
        // Check for game over
        for (let i=0; i < this.level.columns; i++) {
            // Check if there are bubbles in the bottom row
            if (this.level.tiles[i][this.level.rows-1].type != -1) {
                // Game over
                this.nextBubble();
                this.setGameState(this.gamestates.gameover);
                return true;
            }
        }
        
        return false;
    }
 
    // Find cluster at the specified tile location
   findCluster(tx, ty, matchtype, reset, skipremoved) {
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
                for (let i=0; i<neighbors.length; i++) {
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
    }
 
      // Get the neighbors of the specified tile
      getNeighbors(tile) {
        let tilerow = (tile.y + this.rowoffset) % 2; // Even or odd row
        let neighbors = [];
        
        // Get the neighbor offsets for the specified tile
        let n = this.neighborsoffsets[tilerow];
        
        // Get the neighbors
        for (let i=0; i<n.length; i++) {
            // Neighbor coordinate
            let nx = tile.x + n[i][0];
            let ny = tile.y + n[i][1];
            
            
            // Make sure the tile is valid
            if (nx >= 0 && nx < this.level.columns && ny >= 0 && ny < this.level.rows) {
                neighbors.push(this.level.tiles[nx][ny]);
            }
        }
        
        return neighbors;
    }
    
    stateRemoveCluster() {
             let self  = this;
        if (this.animationstate == 0) {
            this.resetRemoved();
            
            // Mark the tiles as removed
            for (let i=0; i < this.cluster.length; i++) {
                // Set the removed flag
                this.cluster[i].removed = true;
            }
            
            // Add cluster score
            this.score += this.cluster.length * 10;
            console.log(" cluster bubble score : "+ this.score);
            
            // Find floating clusters
            this.floatingclusters = this.findFloatingClusters();
            console.log("float cluster : "+ this.floatingclusters.length);
            this.animationstate = 1;
        }
        
        if (this.animationstate == 1) {
            // Pop bubbles
            let tilesleft = false; 
           
            for (let i=0; i < this.cluster.length; i++) {
                
                let tile = this.cluster[i];
                
                if (tile.type >= 0) {
                    tilesleft = true;
                    
                    // Alpha animation
                    tile.alpha -= 0.025 * 15;
				
                    if (tile.alpha < 0) {
                        tile.alpha = 0;
                    }

                    if (tile.alpha == 0) {
			
                        if(i != 0 ){
                            this.playerDie(tile.x,tile.y,i);
                        }
                        
                        if( i == 0 ){
                           let keyValue = this.bubbleName[tile.x][tile.y].key;
                           console.log("key value is : "+ keyValue);
                          
                           this.playerDie(tile.x,tile.y,i);
                        
                           let coordinateValue = this.getTileCoordinate(tile.x,tile.y);
                           console.log("player coordinated :  x: "+ coordinateValue.tilex + " y : " + coordinateValue.tiley);
                           
                           this.LetterName[tile.x][tile.y] = this.game.add.sprite(coordinateValue.tilex,coordinateValue.tiley,'Banana');
                           this.bubbleName[tile.x][tile.y] = this.game.add.sprite(coordinateValue.tilex,coordinateValue.tiley,'WhiteBall');
                           
                           this.game.world.bringToTop(this.bubbleName[tile.x][tile.y]);
                           this.game.world.bringToTop(this.LetterName[tile.x][tile.y]);                           
                           this.bubbleName[tile.x][tile.y].anchor.setTo(0.5);
                           this.LetterName[tile.x][tile.y].anchor.setTo(0.5);
                           this.game.add.tween(this.bubbleName[tile.x][tile.y]).to({x:this.game.world.centerX, y:this.game.world.centerY},1000,Phaser.Easing.Back.Out, true);
                           this.game.add.tween(this.LetterName[tile.x][tile.y]).to({x:this.game.world.centerX, y:this.game.world.centerY},1000,Phaser.Easing.Back.Out, true);
                           
			               this.game.add.tween(this.bubbleName[tile.x][tile.y].scale).to({x:3 * this.widthScale, y:3 * this.heightScale},1000,Phaser.Easing.Back.Out, true);
                           this.game.add.tween(this.LetterName[tile.x][tile.y].scale).to({x:3 * this.widthScale, y:3 * this.heightScale},1000,Phaser.Easing.Back.Out, true);
                           console.log(" world x and y cord : " + this.game.world.centerX + "  "+ this.game.world.centerY);
                          
                           setTimeout(function() {
                                self.playerDie(tile.x,tile.y,i);
                                self.bubbleName[tile.x][tile.y].alpha = 0;
                               
                                self.finalFlag = true;
                           }, 1600);
                           
                              // Next bubble
                               this.nextBubble();              
                        }
                       
                        tile.type = -1;
                        tile.alpha = 1;
                    }
                }                
            }
           
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

                        // Check if the bubbles are past the bottom of the level
                        if (tile.alpha == 0 || (tile.y * this.level.rowheight + tile.shift > (this.level.rows - 1) * this.level.rowheight + this.level.tileheight)) {
                           
                           this.score += 5;
                           
                           console.log(" floating bubble score : "+ this.score);
                           
                           let rndDirectionValue = this.randDirection(); 
                           let gravityValue  = this.rnd.integerInRange(700 , 1600);
                            
                            this.bubbleName[tile.x][tile.y].body.gravity.y = gravityValue;
                            this.LetterName[tile.x][tile.y].body.gravity.y = gravityValue;
                            
                            this.bubbleName[tile.x][tile.y].body.velocity.x = rndDirectionValue;
                            this.LetterName[tile.x][tile.y].body.velocity.x = rndDirectionValue;
                           
                            if(tile.x == 0 || tile.x == 1 || tile.x == 8 || tile.x == 9 ){
                                let data = this.randMinorDirection(tile.x);
                                
                                this.bubbleName[tile.x][tile.y].body.velocity.x = data;
                                this.LetterName[tile.x][tile.y].body.velocity.x = data;
                            }

                            tile.type = -1;
                            tile.shift = 0;
                            tile.alpha = 1;
                            
                             setTimeout(function() {
                                self.bubbleName[tile.x][tile.y].destroy();
                                self.LetterName[tile.x][tile.y].destroy();
                            }, 3000);
                        }
                    }

                }
            }

         if(this.finalFlag){

            if (!tilesleft) {

                // Check for game over
                let tilefound = false
                for (let i=0; i < this.level.columns; i++) {
                    for (let j=0; j < this.level.rows; j++) {
                        if (this.level.tiles[i][j].type != -1) {
                            tilefound = true;
                            break;
                        }
                    }
                }
                
                if (tilefound) {
                        self.setGameState(self.gamestates.ready);
                   
                } else {
                    
                    //Calculate for Stars
                     if(this.score >= 900 ){
                        console.log("3 stars");                        
                        localStorage.setItem(this.levelName , '3');
                    }else if (this.score >500 && this.score < 900){
                        console.log("2 stars");
                        localStorage.setItem(this.levelName , '2');

                    }else{
                        console.log("1 star");                        
                        localStorage.setItem(this.levelName , '1');

                    }
                    
                    // No tiles left, game over
                    this.setGameState(this.gamestates.gameover);
                    this.DataCard();
                }
            }
            this.finalFlag = false;
          }
        }
    }        
    
     DataCard(){
    
    this.bg1 = this.game.add.image(this.game.world.centerX,this.game.world.centerY,'darkTransparent');   
    this.game.world.bringToTop(this.bg1);
    this.bg1.anchor.setTo(0.5, 0.5);
    this.bg1.scale.setTo(this.widthScale, this.heightScale);    
        
    let dataDimension = this.getValueXY(52,25);
    this.CompleteText = this.game.add.image(dataDimension.X,dataDimension.Y,'Complete'); 
    this.CompleteText.anchor.setTo(0.5);
    this.CompleteText.scale.setTo(this.widthScale, this.heightScale);    

    dataDimension = this.getValueXY(52,40);
    this.Stars = this.game.add.image(dataDimension.X,dataDimension.Y,'starGame1'); 
    this.Stars.anchor.setTo(0.5);
    this.Stars.scale.setTo(this.widthScale, this.heightScale);
        
 //   let dataDimension = this.getValueXY(50 , 25);    
 //   this.pageText = this.game.add.text(dataDimension.X,dataDimension.Y, "\t\t\t\t LEVEL 2  \n COMPLETE !!  ", {font: ""+ 100 * ((this.widthScale+this.heightScale)/2) +"px Arial", fill: "#FFDF00"})
 //   this.pageText.anchor.set(0.5);    
        
    dataDimension = this.getValueXY(50 , 60);
    this.buttonNext = this.game.add.button(dataDimension.X,dataDimension.Y, 'next', this.nextButton, this, 2, 1, 0);
    this.buttonNext.anchor.setTo(0.5);
    this.buttonNext.scale.setTo(this.widthScale, this.heightScale);
       
    dataDimension = this.getValueXY(25,75);
    this.buttonRetry = this.game.add.button(dataDimension.X,dataDimension.Y, 'retry', this.retryButton, this, 2, 1, 0);
    this.buttonRetry.anchor.setTo(0.5);
    this.buttonRetry.scale.setTo(this.widthScale, this.heightScale);
    
    dataDimension = this.getValueXY(75,75);
    this.buttonMenu = this.game.add.button(dataDimension.X,dataDimension.Y, 'menu', this.MenuButton, this, 2, 1, 0);
    this.buttonMenu.anchor.setTo(0.5);
    this.buttonMenu.scale.setTo(this.widthScale, this.heightScale);
    
    }
    
    nextButton(){
        console.log("Next button clicked ");
        let value = this.game._LevelFlag;
        this.game._LevelFlag = value + 1;
        
        console.log("the value of gobal variable flag is : " + this.game._LevelFlag);
        this.state.start('Vegitable');
    }
    
    retryButton(){
        console.log("Retry button clicked ");
         this.state.start('Vegitable');
    }
    
    MenuButton(){
         console.log("Menu button clicked ");
         
     //    this.game.cache.removeImage('image1');
         
         this.state.start('HomeScreen');
    }
    
    randDirection(){
       
      let newSign = - 1 * this._rndSign ; 
      let value = 0 ;
      
       if(this._rndSign > 0 ){
           
        value  = this.rnd.integerInRange(-150, -50);
       }
       else{
           
        value  = this.rnd.integerInRange(50, 150);
       
       }
       
      this._rndSign = newSign;
      
      return value;
    }
    
    randMinorDirection(tilex){
        let value = 0 ;
        
        if(tilex == 0 || tilex == 1){
            value  = this.rnd.integerInRange(20, 50);
        }else{
            value  = this.rnd.integerInRange(-50, -20);
        }
        return value;
    }
    
   playerDie(tilex,tiley,type){
       if(type!=0)
       this.playAnimationParticle(tilex,tiley);
       this.bubbleName[tilex][tiley].destroy();
       this.LetterName[tilex][tiley].destroy();
    }

    playAnimationParticle(tilex,tiley){
        
        this.emitter.x = this.bubbleName[tilex][tiley].x + (38 * this.widthScale);
		this.emitter.y = this.bubbleName[tilex][tiley].y + (38 * this.heightScale);
		this.emitter.start(true, 1000, null, 2);
        this.emitter.minParticleScale = ( this.widthScale + this.heightScale ) / 2;
        this.emitter.maxParticleScale = ( this.widthScale + this.heightScale ) / 2;
 
        this.emitter1.x = this.bubbleName[tilex][tiley].x + (38 * this.widthScale);
		this.emitter1.y = this.bubbleName[tilex][tiley].y + (38 * this.heightScale);
		this.emitter1.start(true, 1000, null, 2);
        this.emitter1.minParticleScale = ( this.widthScale + this.heightScale ) / 2;
        this.emitter1.maxParticleScale = ( this.widthScale + this.heightScale ) / 2;
        
        this.emitter2.x = this.bubbleName[tilex][tiley].x + (38 * this.widthScale);
		this.emitter2.y = this.bubbleName[tilex][tiley].y + (38 * this.heightScale);
		this.emitter2.start(true, 1000, null, 2);
        this.emitter2.minParticleScale = ( this.widthScale + this.heightScale ) / 2;
        this.emitter2.maxParticleScale = ( this.widthScale + this.heightScale ) / 2;
        
        this.emitter3.x = this.bubbleName[tilex][tiley].x + (38 * this.widthScale);
		this.emitter3.y = this.bubbleName[tilex][tiley].y + (38 * this.heightScale);
		this.emitter3.start(true, 1000, null, 2);
        this.emitter3.minParticleScale = ( this.widthScale + this.heightScale ) / 2;
        this.emitter3.maxParticleScale = ( this.widthScale + this.heightScale ) / 2;
        
        this.emitter4.x = this.bubbleName[tilex][tiley].x + (38 * this.widthScale);
		this.emitter4.y = this.bubbleName[tilex][tiley].y + (38 * this.heightScale);
		this.emitter4.start(true, 1000, null, 2);
        this.emitter4.minParticleScale = ( this.widthScale + this.heightScale ) / 2;
        this.emitter4.maxParticleScale = ( this.widthScale + this.heightScale ) / 2;
        
        this.emitter5.x = this.bubbleName[tilex][tiley].x + (38 * this.widthScale);
		this.emitter5.y = this.bubbleName[tilex][tiley].y + (38 * this.heightScale);
		this.emitter5.start(true, 1000 , null,2);
        this.emitter5.minParticleScale = ( this.widthScale + this.heightScale ) / 2;
        this.emitter5.maxParticleScale = ( this.widthScale + this.heightScale ) / 2;
 
    }
  
     // Find floating clusters
    findFloatingClusters() {
        
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
    }
   
    // Reset the processed flags
    resetProcessed() {
        for (let i=0; i < this.level.columns; i++) {
            for (let j=0; j < this.level.rows; j++) {
                this.level.tiles[i][j].processed = false;
            }
        }
    }
   
    // Reset the removed flags
    resetRemoved() {
        for (let i=0; i < this.level.columns; i++) {
            for (let j=0; j < this.level.rows; j++) {
                this.level.tiles[i][j].removed = false;
            }
        }
    }
    
    particleEffect(){
        
        //Animation Particle when bubble blast
        this.emitter = this.game.add.emitter(0, 0, 500);
		this.emitter.makeParticles(this.ParticleSprite[0]);
		this.emitter.setYSpeed(-30 * this.widthScale, 30 * this.heightScale);
		this.emitter.setXSpeed(-30 * this.widthScale, 30 * this.heightScale);
		this.emitter.gravity = -10;

        this.emitter1 = this.game.add.emitter(0, 0, 500);
		this.emitter1.makeParticles(this.ParticleSprite[1]);
		this.emitter1.setYSpeed(-30 * this.widthScale, 30 * this.heightScale);
		this.emitter1.setXSpeed(-30 * this.widthScale, 30 * this.heightScale);
		this.emitter1.gravity = -10;

        this.emitter2 = this.game.add.emitter(0, 0, 500);
		this.emitter2.makeParticles(this.ParticleSprite[2]);
		this.emitter2.setYSpeed(-30 * this.widthScale, 30 * this.heightScale);
		this.emitter2.setXSpeed(-30 * this.widthScale, 30 * this.heightScale);
		this.emitter2.gravity = -10;

        this.emitter3 = this.game.add.emitter(0, 0, 500);
		this.emitter3.makeParticles(this.ParticleSprite[3]);
		this.emitter3.setYSpeed(-30 * this.widthScale, 30 * this.heightScale);
		this.emitter3.setXSpeed(-30 * this.widthScale, 30 * this.heightScale);
		this.emitter3.gravity = -10;

        this.emitter4 = this.game.add.emitter(0, 0, 500);
		this.emitter4.makeParticles(this.ParticleSprite[4]);
		this.emitter4.setYSpeed(-30 * this.widthScale, 30 * this.heightScale);
		this.emitter4.setXSpeed(-30 * this.widthScale, 30 * this.heightScale);
		this.emitter4.gravity = -10;

        this.emitter5 = this.game.add.emitter(0, 0, 500);
		this.emitter5.makeParticles(this.ParticleSprite[5]);
		this.emitter5.setYSpeed(-30 * this.widthScale, 30 * this.heightScale);
		this.emitter5.setXSpeed(-30 * this.widthScale, 30 * this.heightScale);
		this.emitter5.gravity = -10;

    }
    
    Tile(x, y, type, shift){
        
        this.x = x;
        this.y = y;
        this.type = type;
        this.removed = false;
        this.shift = shift;
        this.velocity = 0;
        this.alpha = 1;
        this.processed = false;
    
    }
    
       getValueXY(widthPer , heightPer){
        
        let X=0 , Y=0;
        
        if(!(widthPer == 0 || heightPer == 0)){
            
        let widthRatio = 100 / widthPer;
        let heightRation = 100 / heightPer;
        
         X = ( this.bg.width / widthRatio ) ;
         Y = ( this.bg.height / heightRation ) ;
        
        }else{
            console.log(" please try again - Enter correct Value  ");
        }
        
        return {X,Y};
    }
    
    
    initialiseVariable(){
       
         // Neighbor offset table
         this.neighborsoffsets = [[[1, 0], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1]], // Even row tiles
                                     [[1, 0], [1, 1], [0, 1], [-1, 0], [0, -1], [1, -1]]];  // Odd row tiles
           
         // Game states
         this.gamestates = { init: 0, ready: 1, shootbubble: 2, removecluster: 3, renderBubble : 4 , gameover: 5};
         this.gamestate = this.gamestates.init;
        
        // Score
        this.score = 0;
        this.count = 0;
        this.turncounter = 0;
        this.rowoffset = 0;
    
        // Animation variablespre
        this.animationstate = 0;
        this.animationtime = 0;
        this._rndSign = -1;   
        this.finalFlag = false;
        
        // Clusters
      
        this.cluster = [];
        this.floatingclusters = [];
    
        // Images
        this.images = [];
        
    
        // Image loading global variables
        this.loadcount = 0;
        this.loadtotal = 0;
        this.reloaded = false;
        
         // Level
        this.level = {
            
        x: 0 * this.widthScale,          // X position
        y: 60 * this.heightScale,          // Y position
        width: 0,       // Width, gets calculated
        height: 0,      // Height, gets calculated
        columns: 10,    // Number of tile columns
        rows: 16,     // Number of tile rows
        tilewidth: 76 * this.widthScale,  // Visual width of a tile
        tileheight: 76 * this.heightScale, // Visual height of a tile
        rowheight: 65 * this.heightScale,  // Height of a row
        radius: 32 * this.heightScale,     // Bubble collision radius
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
                    speed: 1500,
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
          
          
         // Array Of BubbleColor
         this.bubbleName = new Array(this.level.columns);
             for (let i=0 ; i <this.level.rows; i++)
             this.bubbleName[i] = new Array(this.level.rows);
         
         // Array Of Letter
         this.LetterName = new Array(this.level.columns);
             for (let i=0 ; i <this.level.rows; i++)
             this.LetterName[i] = new Array(this.level.rows);
         
         
        // Player Object for Access data
        this.bubblePlayer ;
        this.letterPlayer;
        this.FloatGroup = this.game.add.group();
        this.FloatGroup.enableBody = true;
        
        this.killBubble = false;
             
    }
}

export default Vegitable;