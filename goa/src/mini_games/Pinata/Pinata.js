
var xc = xc || {};

xc.Pinata = cc.Layer.extend({
  
  ctor:function () {
  
   this._super();

    cc.spriteFrameCache.addSpriteFrames(xc.Pinata.res.pinata_plist);
    cc.spriteFrameCache.addSpriteFrames(xc.Pinata.res.bubbleShooter_plist);

    var gameBg =  new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("pinata/bg-01.png"));
    gameBg.setPosition(0,0);    gameBg.setAnchorPoint(0,0);   this.addChild(gameBg);
    
    this.initVariable();    

        // Define a level width and height
        this.level.width = 2560;
        this.level.height = 1500;
    
        // Set the gamestate to ready
        this.setGameState(this.gamestates.ready);
        bubblecolors = 4;
        
        // Init the this.player in gun 
        this.player.x = this.level.x + this.level.width/2 - this.level.tilewidth/2 ;
        //console.log("this.player.x = "+(this.level.x + this.level.width/2 - this.level.tilewidth/2) + "  this.level.x : "+this.level.x+" this.level.width/2 : "+this.level.width/2+" this.level.tilewidth/2 : "+this.level.tilewidth/2);
        this.player.y = this.level.y + this.level.height ;
        
        this.player.angle = 90;
        this.player.tiletype = 0;
        
        if(this.player.bubble.tiletype == undefined){
            this.player.bubble.tiletype = Math.floor(this.getRandomArbitrary(0,bubblecolors));
        }

        this.bubblePlayer =  new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("pinata/player.png"));
        this.bubblePlayer.setPosition(cc.director.getWinSize().width * 0.5,cc.director.getWinSize().height * 0.5);
        this.addChild(this.bubblePlayer,1);
        
         
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
      
      cc.eventManager.addListener(listnerBg,gameBg);
       
        // Set the gun Pointer
        this.gun = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("pinata/guntrigger.png"));
        this.gun.setPosition(gameBg.width/2, cc.director.getWinSize().height *0.16);
        this.gun.name ="gunPointer";
        this.gun.anchorY = 0.6;
        this.addChild(this.gun);

        //Set the gun Base
        this.gunBase =  new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("pinata/gunbase.png"));
        this.gunBase.setPosition(gameBg.width/2 , cc.director.getWinSize().height * 0.085);
        this.gunBase.setScaleY(1.5);
        this.addChild(this.gunBase);  
  
      this.scheduleUpdate();
    
    return true;
    
  },
  
    update : function (dt) {
       
        if (this.gamestate == this.gamestates.shootbubble) {
            // Bubble is moving
            this.stateShootBubble(dt);
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
                 this.player.bubble.visible = true;
                 this.shootBubble(); 
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
      drawBubble : function(x, y) {
                
          if(this.mainPlayerBubbleDestroy){
               console.log("<<<<< ------------- create bubble player ------------ >>>>>>>");

              this.bubblePlayer =  new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("pinata/player.png"));
              this.addChild(this.bubblePlayer);
              
              this.mainPlayerBubbleDestroy = false;
          }
          
            this.bubblePlayer.setPosition(this.player.bubble.x, (cc.director.getWinSize().height) - this.player.bubble.y);
            this.bubblePlayer.anchorX=0.0;
            this.bubblePlayer.anchorY=0.0;

    },
       
    stateShootBubble : function(dt){
     
        this.player.bubble.x += dt * this.player.bubble.speed * Math.cos(this.degToRad(this.player.bubble.angle));
        this.player.bubble.y += dt * this.player.bubble.speed * -1 * Math.sin(this.degToRad(this.player.bubble.angle));
        
        if (this.player.bubble.visible) {            
            this.drawBubble(this.player.bubble.x, this.player.bubble.y);
        }
      
        if (this.player.bubble.x <= this.level.x) {     
            // Left edge
            this.player.bubble.angle = 180 - this.player.bubble.angle;
            this.player.bubble.x = this.level.x;
        } else if (this.player.bubble.x + this.level.tilewidth >= this.level.x + this.level.width) {
            // Right edge
            this.player.bubble.angle = 180 - this.player.bubble.angle;
            this.player.bubble.x = this.level.x + this.level.width - this.level.tilewidth;
        }
        if (this.player.bubble.y <= this.level.y) {
            // Top collision
            this.player.bubble.angle = 360 - this.player.bubble.angle;
            this.player.bubble.y = this.level.y+ (this.bubblePlayer.width/2);
            return;
        }
    },
        
   DataCard : function (gamestatus){
       console.log("gamestatus : "+gamestatus + " -------------- ");
       var level = levelValues;
    if (cc.sys.isNative) {
               var menuContext = this.getParent().menuContext;
               cc.log("showscore");
               menuContext.showScore();
     }else{
         xc.GameScene.load(xc.Pinata);
     }  
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
    
    initVariable : function(){
        
        this.bubblePlayer = null;
        this.mainPlayerBubbleDestroy = false;
        var bubbleSizeReference =  new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("bubble_shooter/red_ball.png"));
  
        // Game states
        this.gamestates = { init: 0, ready: 1, shootbubble: 2, removecluster: 3, gameComplete : 4 , gameover: 5 };
        this.gamestate = this.gamestates.init;

        // Score
        this.rowoffset = 0;

        // Level
        this.level = {            
            x: 0, // X position
            y: cc.director.getWinSize().height * 0.06,          // Y position
            width: 0,       // Width, gets calculated
            height: 0,      // Height, gets calculated
            columns: 14,    // Number of tile columns
            rows: 9,  // Number of tile rows
            tilewidth: bubbleSizeReference.width,  // Visual width of a tile
            tileheight: bubbleSizeReference.height, // Visual height of a tile
            rowheight: bubbleSizeReference.height * 0.8421,  // Height of a row
            radius: bubbleSizeReference.width * 0.460526,     // Bubble collision radius
            tiles: []       // The two-dimensional tile array
        };

        // Player
        this.player = {
            x: 0,
            y: 0,
            angle: 0,
            bubble: {
                    x: 0,
                    y: 0,
                    angle: 0,
                    speed: 2500,
                    visible: false
                }
        };

        // Array Of Letter
        this.bubblecolors = 0;
    },
})

xc.Pinata.res = {
    pinata_plist : xc.path +"pinata/pinata.plist",
    pinata_png : xc.path +"pinata/pinata.png",       
    bubbleShooter_plist : xc.path +"bubble_shooter/bubble_shooter.plist",
    bubbleShooter_png : xc.path +"bubble_shooter/bubble_shooter.png",

};      

