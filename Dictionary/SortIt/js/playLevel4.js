
    //We create our only state
    var counterLevel4 = 1;

    var level4SpriteScaleX = 0.9; 
    var level4SpriteScaleY = 0.9;
    

    var playLevel4 = {

        preload: function () {

            //setting default path for assets to be used in game
            this.load.path = './assets/level4/';


            //loading assets for the level 4
            this.load.image("character", "character.png");
            this.load.image("bg", "bg.png");
            this.load.image("bowl1", "bowl1.png");
            this.load.image("bowl2", "bowl2.png");
            this.load.image("bowl3", "bowl3.png");
            this.load.image("bowl4", "bowl4.png");
            this.load.image("bowl5", "bowl5.png");







            //for transparent
            this.load.image("bowl1t", "bowl1t.png");
            this.load.image("bowl2t", "bowl2t.png");
            this.load.image("bowl3t", "bowl3t.png");
            this.load.image("bowl4t", "bowl4t.png");
            this.load.image("bowl5t", "bowl5t.png");


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


            var character = this.game.add.sprite(gameMinWidth+1120,gameMinHeight+320, 'character');
            character.anchor.setTo(spriteAnchorX, spriteAnchorY);
            character.scale.setTo(0.8,0.8);






            var bowl1 = game.add.sprite(gameMinWidth+900,gameMinHeight+650, 'bowl1');
            bowl1.inputEnabled = true;
            bowl1.input.enableDrag(false, true);
            bowl1.id = 1;
            bowl1.scale.setTo(level4SpriteScaleX, level4SpriteScaleY);


            var bowl2 = game.add.sprite(gameMinWidth+250,gameMinHeight+690, 'bowl2');
            bowl2.inputEnabled = true;
            bowl2.input.enableDrag(false, true);
            bowl2.id = 2;
            bowl2.anchor.setTo(spriteAnchorX, spriteAnchorY);
            bowl2.scale.setTo(level4SpriteScaleX, level4SpriteScaleY);



            var bowl3 = game.add.sprite(gameMinWidth+600,gameMinHeight+720, 'bowl3');
            bowl3.inputEnabled = true;
            bowl3.input.enableDrag(false, true);
            bowl3.id = 3;
            bowl3.anchor.setTo(spriteAnchorX, spriteAnchorY);
            bowl3.scale.setTo(level4SpriteScaleX, level4SpriteScaleY);


            var bowl4 = game.add.sprite(gameMinWidth+800,gameMinHeight+720, 'bowl4');
            bowl4.inputEnabled = true;
            bowl4.input.enableDrag(false, true);
            bowl4.id = 4;
            bowl4.anchor.setTo(spriteAnchorX, spriteAnchorY);
            bowl4.scale.setTo(level4SpriteScaleX, level4SpriteScaleY);


            var bowl5 = game.add.sprite(gameMinWidth+100,gameMinHeight+710, 'bowl5');
            bowl5.inputEnabled = true;
            bowl5.input.enableDrag(false, true);
            bowl5.id = 5;
            bowl5.anchor.setTo(spriteAnchorX, spriteAnchorY);
            bowl5.scale.setTo(level4SpriteScaleX, level4SpriteScaleY);



            //for transparent


            var bowl1t = game.add.sprite(gameMinWidth+400,gameMinHeight+540, 'bowl1t');
            bowl1t.anchor.setTo(spriteAnchorX, spriteAnchorY);
            bowl1t.scale.setTo(level4SpriteScaleX, level4SpriteScaleY);


            var bowl2t = game.add.sprite(gameMinWidth+650,gameMinHeight+550, 'bowl2t');
            bowl2t.anchor.setTo(spriteAnchorX, spriteAnchorY);
            bowl2t.scale.setTo(level4SpriteScaleX, level4SpriteScaleY);


            var bowl3t = game.add.sprite(gameMinWidth+870,gameMinHeight+550, 'bowl3t');
            bowl3t.anchor.setTo(spriteAnchorX, spriteAnchorY);
            bowl3t.scale.setTo(level4SpriteScaleX, level4SpriteScaleY);


            var bowl4t = game.add.sprite(gameMinWidth+1050,gameMinHeight+550, 'bowl4t');
            bowl4t.anchor.setTo(spriteAnchorX, spriteAnchorY);
            bowl4t.scale.setTo(level4SpriteScaleX, level4SpriteScaleY);


            var bowl5t = game.add.sprite(gameMinWidth+1200,gameMinHeight+550, 'bowl5t');
            bowl5t.anchor.setTo(spriteAnchorX, spriteAnchorY);
            bowl5t.scale.setTo(level4SpriteScaleX, level4SpriteScaleY);




            //  And this starts the animation playing by using its key ("walk")
            //  30 is the frame rate (30fps)
            //  true means it will loop when it finishes



            this.game.physics.arcade.enable([character, bowl1, bowl2, bowl3, bowl4, bowl5, bowl1t, bowl2t, bowl3t, bowl4t, bowl5t], physicsEngine);


            bowl1.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, bowl1t);}, this);
            bowl2.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, bowl2t);}, this);
            bowl3.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, bowl3t);}, this);
            bowl4.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, bowl4t);}, this);
            bowl5.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, bowl5t);}, this);



            character.body.collideWorldBounds = true;
            bowl1.body.collideWorldBounds = true;
            bowl2.body.collideWorldBounds = true;
            bowl3.body.collideWorldBounds = true;
            bowl4.body.collideWorldBounds = true;
            bowl5.body.collideWorldBounds = true;

            //For transparent
            bowl1.originalPosition = bowl1.position.clone();
            bowl2.originalPosition = bowl2.position.clone();
            bowl3.originalPosition = bowl3.position.clone();
            bowl4.originalPosition = bowl4.position.clone();
            bowl5.originalPosition = bowl5.position.clone();



            bowl1t.body.collideWorldBounds = true;
            bowl1t.body.immovable = true;

            bowl2t.body.collideWorldBounds = true;
            bowl2t.body.immovable = true;

            bowl3t.body.collideWorldBounds = true;
            bowl3t.body.immovable = true;

            bowl4t.body.collideWorldBounds = true;
            bowl4t.body.immovable = true;

            bowl5t.body.collideWorldBounds = true;
            bowl5t.body.immovable = true;



        },


        update: function () {

           //regular update goes here
            if((game.input.activePointer.leftButton.isDown 
                || game.input.activePointer.middleButton.isDown 
                || game.input.activePointer.rightButton.isDown)
                && counterLevel4 == 6){



                game.state.start('playLevel5');
            }

        },

     stopDrag: function(currentSprite, endSprite){



         if (!this.game.physics.arcade.overlap(currentSprite, endSprite, function() {


             if(currentSprite.id == counterLevel4){
            currentSprite.input.draggable = false;
            currentSprite.inputEnabled = false;     
            currentSprite.position.copyFrom(endSprite.position); 
            currentSprite.anchor.setTo(endSprite.anchor.x, endSprite.anchor.y); 

                 comedyBubbleSound.play();

                 counterLevel4++;
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

