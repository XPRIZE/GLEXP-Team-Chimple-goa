    //We create our only state
    var counterLevel1 = 1;
    var explosiveSound;
    var physicsEngine = Phaser.Physics.ARCADE;
    var spriteAnchorX = 0.5;
    var spriteAnchorY = 0.5;
   
    
    var playLevel1 = {

        preload: function () {

            //setting default path for assets to be used in game
            this.load.path = './assets/level1/';


            //loading assets for the level 1
            this.load.image("bg", "bg.png");
            this.load.image("character", "character.png");
            this.load.image("face", "face.png");
            this.load.image("lightToysArranged", "lightToysArranged.png");
            this.load.image("scrambledToys", "scrambledToys.png");
            this.load.image("solidToysArranged", "solidToysArranged.png");
            this.load.image("toy1", "toy1.png");
            this.load.image("toy2", "toy2.png");
            this.load.image("toy3", "toy3.png");
            this.load.image("toy4", "toy4.png");
            this.load.image("toy5", "toy5.png");
            this.load.image("toy6", "toy6.png");

            //for transparent
            this.load.image("toy1t", "toy1t.png");
            this.load.image("toy2t", "toy2t.png");
            this.load.image("toy3t", "toy3t.png");
            this.load.image("toy4t", "toy4t.png");
            this.load.image("toy5t", "toy5t.png");
            this.load.image("toy6t", "toy6t.png");


            //loading sounds
            this.load.audio("comedyBubble", "comedyBubble.mp3");
            this.load.audio("explosive", "explosive.mp3");
            this.load.audio("failure", "failure.mp3");

            //this.load.spritesheet('mummy', 'metalslug_mummy37x45.png', 37, 45, 18);


        },

        create: function () {

            game.physics.startSystem(physicsEngine);
            game.input.mouse.capture = true;


            //Adding audio
            comedyBubbleSound = game.add.audio('comedyBubble');
            explosiveSound = game.add.audio('explosive');
            failureSound = game.add.audio('failure');

            //Adding images 
            game.add.image(gameMinWidth, gameMinHeight, 'bg');



            character = this.game.add.sprite(gameMinWidth+1200,  gameMinHeight+350, 'character');
            character.inputEnabled = true;
            //character.input.enableDrag(false, true);
            character.anchor.setTo(spriteAnchorX, spriteAnchorY);

            
            


            var toy1 = game.add.sprite(gameMinWidth+100, gameMinHeight+820, 'toy1');
            toy1.inputEnabled = true;
            toy1.input.enableDrag(false, true);
            toy1.id = 1;

            var toy2 = game.add.sprite(gameMinWidth+800,gameMinHeight+720, 'toy2');
            toy2.inputEnabled = true;
            toy2.input.enableDrag(false, true);
            toy2.id = 2;
            toy2.anchor.setTo(spriteAnchorX, spriteAnchorY);


            var toy3 = game.add.sprite(gameMinWidth+1100,gameMinHeight+750, 'toy3');
            toy3.inputEnabled = true;
            toy3.input.enableDrag(false, true);
            toy3.id = 3;
            toy3.anchor.setTo(spriteAnchorX, spriteAnchorY);


            var toy4 = game.add.sprite(gameMinWidth+550,gameMinHeight+700, 'toy4');
            toy4.inputEnabled = true;
            toy4.input.enableDrag(false, true);
            toy4.id = 4;
            toy4.anchor.setTo(spriteAnchorX, spriteAnchorY);

            var toy5 = game.add.sprite(gameMinWidth+100,gameMinHeight+650, 'toy5');
            toy5.inputEnabled = true;
            toy5.input.enableDrag(false, true);
            toy5.id = 5;
            toy5.anchor.setTo(spriteAnchorX, spriteAnchorY);


            var toy6 = game.add.sprite(gameMinWidth+1200,gameMinHeight+600, 'toy6');
            toy6.inputEnabled = true;
            toy6.input.enableDrag(false, true);
            toy6.id = 6;
            toy6.anchor.setTo(spriteAnchorX, spriteAnchorY);


            //Transparent

            var toy1t = game.add.sprite(gameMinWidth+600,gameMinHeight+620, 'toy1t');
            toy1t.anchor.setTo(spriteAnchorX, spriteAnchorY);


            var toy2t = game.add.sprite(gameMinWidth+600,gameMinHeight+570, 'toy2t');
            toy2t.anchor.setTo(spriteAnchorX, spriteAnchorY);


            var toy3t = game.add.sprite(gameMinWidth+600,gameMinHeight+515, 'toy3t');
            toy3t.anchor.setTo(spriteAnchorX, spriteAnchorY);


            var toy4t = game.add.sprite(gameMinWidth+600,gameMinHeight+445, 'toy4t');
            toy4t.anchor.setTo(spriteAnchorX, spriteAnchorY);


            var toy5t = game.add.sprite(gameMinWidth+600,gameMinHeight+375, 'toy5t');
            toy5t.anchor.setTo(spriteAnchorX, spriteAnchorY);


            var toy6t = game.add.sprite(gameMinWidth+600,gameMinHeight+320, 'toy6t');
            toy6t.anchor.setTo(spriteAnchorX, spriteAnchorY);


            /*var mummy = game.add.sprite(300, 200, 'mummy');
            var walk = mummy.animations.add('walk');

            //  And this starts the animation playing by using its key ("walk")
            //  30 is the frame rate (30fps)
            //  true means it will loop when it finishes
            mummy.animations.play('walk', 30, true);

            game.add.tween(mummy).to({ x: game.width }, 10000, Phaser.Easing.Linear.None, true);
*/


            this.game.physics.arcade.enable([character, toy1, toy2, toy3, toy4, toy5, toy6, toy1t, toy2t, toy3t, toy4t, toy5t, toy6t], physicsEngine);


            toy1.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, toy1t);}, this);
            toy2.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, toy2t);}, this);
            toy3.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, toy3t);}, this);
            toy4.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, toy4t);}, this);
            toy5.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, toy5t);}, this);
            toy6.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, toy6t);}, this);

           /* //character.events.onMouseDown.add(this.down, this);
            //character.events.onMouseUp.add(this.up, this);            
            
            character.input.onDown.add(this.down, this);
            character.input.onUp.add(this.down, this);
            //character.events.onInputDown.add(function(){character.kill();}, this);
            */
            


            character.body.collideWorldBounds = true;
            toy1.body.collideWorldBounds = true;
            toy2.body.collideWorldBounds = true;
            toy3.body.collideWorldBounds = true;
            toy4.body.collideWorldBounds = true;
            toy5.body.collideWorldBounds = true;
            toy6.body.collideWorldBounds = true;

            //For transparent
            toy1.originalPosition = toy1.position.clone();
            toy2.originalPosition = toy2.position.clone();
            toy3.originalPosition = toy3.position.clone();
            toy4.originalPosition = toy4.position.clone();
            toy5.originalPosition = toy5.position.clone();
            toy6.originalPosition = toy6.position.clone();


            toy1t.body.collideWorldBounds = true;
            toy1t.body.immovable = true;

            toy2t.body.collideWorldBounds = true;
            toy2t.body.immovable = true;

            toy3t.body.collideWorldBounds = true;
            toy1t.body.immovable = true;

            toy3t.body.collideWorldBounds = true;
            toy3t.body.immovable = true;

            toy4t.body.collideWorldBounds = true;
            toy4t.body.immovable = true;

            toy5t.body.collideWorldBounds = true;
            toy5t.body.immovable = true;

            toy6t.body.collideWorldBounds = true;
            toy6t.body.immovable = true;


        },


        update: function () {

           //regular update goes here
            if((game.input.activePointer.leftButton.isDown 
                || game.input.activePointer.middleButton.isDown 
                || game.input.activePointer.rightButton.isDown)
                && counterLevel1 == 7){

                explosiveSound.play();
                game.state.start('playLevel2');

            }

        },

     stopDrag: function(currentSprite, endSprite){



         if (!this.game.physics.arcade.overlap(currentSprite, endSprite, function() {


             if(currentSprite.id == counterLevel1){
            currentSprite.input.draggable = false;
            currentSprite.inputEnabled = false;     
            currentSprite.position.copyFrom(endSprite.position); 
            currentSprite.anchor.setTo(endSprite.anchor.x, endSprite.anchor.y); 

                 comedyBubbleSound.play();
                 counterLevel1++;

              }
             else {

                 game.add.tween(currentSprite).to(currentSprite.originalPosition, tweenDuration).start();
                 failureSound.play();
             }
            } ) ) 
                { 
                    game.add.tween(currentSprite).to(currentSprite.originalPosition, tweenDuration).start();
                    failureSound.play();

                }

      },
        down: function(){
            
                
                game.character.kill();    
            },
        up: function(){
                        this.character = this.game.add.sprite(gameMinWidth+1200,  gameMinHeight+350, 'character');
                        this.character.inputEnabled = true;
              //          this.character.input.enableDrag(false, true);
                        this.character.anchor.setTo(spriteAnchorX, spriteAnchorY);
                    
                }
        
        
    };







