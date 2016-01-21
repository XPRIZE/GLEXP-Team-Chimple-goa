
    //We create our only state
    var counterLevel5 = 1;


    var level5SpriteScaleX = 0.9; 
    var level5SpriteScaleY = 0.9;

    var playLevel5 = {

        preload: function () {

            //setting default path for assets to be used in game
            this.load.path = './assets/level5/';


            //loading assets for the level 5
            this.load.image("character", "character.png");
            this.load.image("bg", "bg.png");


            this.load.image("num1", "num1.png");
            this.load.image("num2", "num2.png");
            this.load.image("num3", "num3.png");
            this.load.image("num4", "num4.png");
            this.load.image("num5", "num5.png");


            //for transparent
            this.load.image("num1t", "num1t.png");
            this.load.image("num2t", "num2t.png");
            this.load.image("num3t", "num3t.png");
            this.load.image("num4t", "num4t.png");
            this.load.image("num5t", "num5t.png");


            //loading sounds
            this.load.audio("comedyBubble", "comedyBubble.mp3");
            this.load.audio("failure", "failure.mp3");

        },


        create: function () {

            game.physics.startSystem(physicsEngine);
            game.input.mouse.capture = true;


            //Adding audio
            comedyBubbleSound = game.add.audio('comedyBubble');
            failureSound = game.add.audio('failure');

            //Adding images 


            game.add.image(gameMinWidth,gameMinHeight, 'bg');


            var character = this.game.add.sprite(gameMinWidth+1000,gameMinHeight+437, 'character');
            character.inputEnabled = true;
            character.input.enableDrag();
            character.anchor.setTo(spriteAnchorX, spriteAnchorY);
            character.scale.setTo(0.8,0.8);




            var num1 = game.add.sprite(gameMinWidth+300,gameMinHeight+620, 'num1');
            num1.inputEnabled = true;
            num1.input.enableDrag(false, true);
            num1.id = 1;
            num1.scale.setTo(level5SpriteScaleX, level5SpriteScaleY);


            var num2 = game.add.sprite(gameMinWidth+700,gameMinHeight+620, 'num2');
            num2.inputEnabled = true;
            num2.input.enableDrag(false, true);
            num2.id = 2;
            num2.anchor.setTo(spriteAnchorX, spriteAnchorY);
            num2.scale.setTo(level5SpriteScaleX, level5SpriteScaleY);



            var num3 = game.add.sprite(gameMinWidth+100,gameMinHeight+620, 'num3');
            num3.inputEnabled = true;
            num3.input.enableDrag(false, true);
            num3.id = 3;
            num3.anchor.setTo(spriteAnchorX, spriteAnchorY);
            num3.scale.setTo(level5SpriteScaleX, level5SpriteScaleY);


            var num4 = game.add.sprite(gameMinWidth+900,gameMinHeight+620, 'num4');
            num4.inputEnabled = true;
            num4.input.enableDrag(false, true);
            num4.id = 4;
            num4.anchor.setTo(spriteAnchorX, spriteAnchorY);
            num4.scale.setTo(level5SpriteScaleX, level5SpriteScaleY);


            var num5 = game.add.sprite(gameMinWidth+550,gameMinHeight+700, 'num5');
            num5.inputEnabled = true;
            num5.input.enableDrag(false, true);
            num5.id = 5;
            num5.anchor.setTo(spriteAnchorX, spriteAnchorY);
            num5.scale.setTo(level5SpriteScaleX, level5SpriteScaleY);



            //for transparent

            var num1t = game.add.sprite(gameMinWidth+500,gameMinHeight+610, 'num1t');
            num1t.anchor.setTo(spriteAnchorX, spriteAnchorY);
            num1t.scale.setTo(level5SpriteScaleX, level5SpriteScaleY);


            var num2t = game.add.sprite(gameMinWidth+500,gameMinHeight+518, 'num2t');
            num2t.anchor.setTo(spriteAnchorX, spriteAnchorY);
            num2t.scale.setTo(level5SpriteScaleX, level5SpriteScaleY);


            var num3t = game.add.sprite(gameMinWidth+500,gameMinHeight+430, 'num3t');
            num3t.anchor.setTo(spriteAnchorX, spriteAnchorY);
            num3t.scale.setTo(level5SpriteScaleX, level5SpriteScaleY);


            var num4t = game.add.sprite(gameMinWidth+500,gameMinHeight+345, 'num4t');
            num4t.anchor.setTo(spriteAnchorX, spriteAnchorY);
            num4t.scale.setTo(level5SpriteScaleX, level5SpriteScaleY);


            var num5t = game.add.sprite(gameMinWidth+500,gameMinHeight+260, 'num5t');
            num5t.anchor.setTo(spriteAnchorX, spriteAnchorY);
            num5t.scale.setTo(level5SpriteScaleX, level5SpriteScaleY);




            //  And this starts the animation playing by using its key ("walk")
            //  30 is the frame rate (30fps)
            //  true means it will loop when it finishes


            this.game.physics.arcade.enable([character, num1, num2, num3, num4, num5, num1t, num2t, num3t, num4t, num5t], physicsEngine);


            num1.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, num1t);}, this);
            num2.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, num2t);}, this);
            num3.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, num3t);}, this);
            num4.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, num4t);}, this);
            num5.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, num5t);}, this);



            character.body.collideWorldBounds = true;

            num1.body.collideWorldBounds = true;
            num2.body.collideWorldBounds = true;
            num3.body.collideWorldBounds = true;
            num4.body.collideWorldBounds = true;
            num5.body.collideWorldBounds = true;

            //For transparent
            num1.originalPosition = num1.position.clone();
            num2.originalPosition = num2.position.clone();
            num3.originalPosition = num3.position.clone();
            num4.originalPosition = num4.position.clone();
            num5.originalPosition = num5.position.clone();



            num1t.body.collideWorldBounds = true;
            num1t.body.immovable = true;

            num2t.body.collideWorldBounds = true;
            num2t.body.immovable = true;

            num3t.body.collideWorldBounds = true;
            num3t.body.immovable = true;

            num4t.body.collideWorldBounds = true;
            num4t.body.immovable = true;

            num5t.body.collideWorldBounds = true;
            num5t.body.immovable = true;


        },


        update: function () {

           //regular update goes here
            if((game.input.activePointer.leftButton.isDown 
                || game.input.activePointer.middleButton.isDown 
                || game.input.activePointer.rightButton.isDown)
                && counterLevel5 == 6){



                game.state.start('playLevel6');
            }    

        },

     stopDrag: function(currentSprite, endSprite){



         if (!this.game.physics.arcade.overlap(currentSprite, endSprite, function() {


             if(currentSprite.id == counterLevel5){
            currentSprite.input.draggable = false;
            currentSprite.inputEnabled = false;     
            currentSprite.position.copyFrom(endSprite.position); 
            currentSprite.anchor.setTo(endSprite.anchor.x, endSprite.anchor.y); 

                 comedyBubbleSound.play();

                 counterLevel5++;
              }
             else {
                 game.add.tween(currentSprite).to(currentSprite.originalPosition, tweenDuration).start();

                 failureSound.play();

             }
            } ,null, this) ) 
                { 
                    game.add.tween(currentSprite).to(currentSprite.originalPosition, tweenDuration).start();

                    failureSound.play();

                }


      }
    };

