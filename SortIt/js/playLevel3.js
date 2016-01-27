
    //We create our only state
    var counterLevel3 = 1;

    var level3SpriteScaleX = 0.9; 
    var level3SpriteScaleY = 0.9;
    
    var playLevel3 = {

        preload: function () {

            //setting default path for assets to be used in game
            this.load.path = './assets/level3/';


            //loading assets for the level 3
            this.load.image("character", "character.png");
            this.load.image("bg", "bg.jpg");
            this.load.image("harpPlay", "harpPlay.png");
            this.load.image("string1", "string1.png");
            this.load.image("string2", "string2.png");
            this.load.image("string3", "string3.png");
            this.load.image("string4", "string4.png");
            this.load.image("string5", "string5.png");
            this.load.image("string6", "string6.png");





            //for transparent
            this.load.image("string1t", "string1t.png");
            this.load.image("string2t", "string2t.png");
            this.load.image("string3t", "string3t.png");
            this.load.image("string4t", "string4t.png");
            this.load.image("string5t", "string5t.png");
            this.load.image("string6t", "string6t.png");


            //loading sounds
            this.load.audio("comedyBubble", "comedyBubble.mp3");
            this.load.audio("tickingClock", "tickingClock.mp3");
            this.load.audio("failure", "failure.mp3");
            this.load.audio("harpMusic", "harpMusic.mp3");



            this.load.spritesheet('musicNotes', 'musicNotes78x73.png', 78, 73, 135);
            this.load.spritesheet('stringDragSpritesheet', 'stringDragSpritesheet.png', 14, 140, 14);
            this.load.spritesheet('stringDropSpritesheet', 'stringDropSpritesheet.png', 13, 140, 10);



        },


        create: function () {

            game.physics.startSystem(physicsEngine);
            game.input.mouse.capture = true;


            //Adding audio
            comedyBubbleSound = game.add.audio('comedyBubble');
            failureSound = game.add.audio('failure');
            harpMusicSound = game.add.audio('harpMusic');
            harpMusicSound.loop = true; 


            //Adding images 


            game.add.image(gameMinWidth,gameMinHeight, 'bg');



            var character = this.game.add.sprite(gameMinWidth+1000,gameMinHeight+437, 'character');
            character.anchor.setTo(spriteAnchorX, spriteAnchorY);
            character.scale.setTo(0.8,0.8);


            var harpPlay = this.game.add.sprite(gameMinWidth+600,gameMinHeight+400, 'harpPlay');
            harpPlay.anchor.setTo(spriteAnchorX, spriteAnchorY);
            harpPlay.scale.setTo(level3SpriteScaleX, level3SpriteScaleY);



            var string1 = game.add.sprite(gameMinWidth+900,gameMinHeight+820, 'string1');
            string1.inputEnabled = true;
            string1.input.enableDrag(false, true);
            string1.id = 1;
            string1.scale.setTo(level3SpriteScaleX, level3SpriteScaleY);

            var string2 = game.add.sprite(gameMinWidth+100,gameMinHeight+620, 'string2');
            string2.inputEnabled = true;
            string2.input.enableDrag(false, true);
            string2.id = 2;
            string2.anchor.setTo(spriteAnchorX, spriteAnchorY);
            string2.scale.setTo(level3SpriteScaleX, level3SpriteScaleY);



            var string3 = game.add.sprite(gameMinWidth+950,gameMinHeight+600, 'string3');
            string3.inputEnabled = true;
            string3.input.enableDrag(false, true);
            string3.id = 3;
            string3.anchor.setTo(spriteAnchorX, spriteAnchorY);
            string3.scale.setTo(level3SpriteScaleX, level3SpriteScaleY);


            var string4 = game.add.sprite(gameMinWidth+150,gameMinHeight+750, 'string4');
            string4.inputEnabled = true;
            string4.input.enableDrag(false, true);
            string4.id = 4;
            string4.anchor.setTo(spriteAnchorX, spriteAnchorY);
            string4.scale.setTo(level3SpriteScaleX, level3SpriteScaleY);


            var string5 = game.add.sprite(gameMinWidth+1200,gameMinHeight+550, 'string5');
            string5.inputEnabled = true;
            string5.input.enableDrag(false, true);
            string5.id = 5;
            string5.anchor.setTo(spriteAnchorX, spriteAnchorY);
            string5.scale.setTo(level3SpriteScaleX, level3SpriteScaleY);


            var string6 = game.add.sprite(gameMinWidth+1100,gameMinHeight+550, 'string6');
            string6.inputEnabled = true;
            string6.input.enableDrag(false, true);
            string6.id = 6;
            string6.anchor.setTo(spriteAnchorX, spriteAnchorY);
            string6.scale.setTo(level3SpriteScaleX, level3SpriteScaleY);


            //for transparent    

            var string1t = game.add.sprite(gameMinWidth+515,gameMinHeight+380, 'string1t');
            string1t.anchor.setTo(spriteAnchorX, spriteAnchorY);
            string1t.scale.setTo(level3SpriteScaleX, level3SpriteScaleY);


            var string2t = game.add.sprite(gameMinWidth+550,gameMinHeight+370, 'string2t');
            string2t.anchor.setTo(spriteAnchorX, spriteAnchorY);
            string2t.scale.setTo(level3SpriteScaleX, level3SpriteScaleY);


            var string3t = game.add.sprite(gameMinWidth+585,gameMinHeight+370, 'string3t');
            string3t.anchor.setTo(spriteAnchorX, spriteAnchorY);
            string3t.scale.setTo(level3SpriteScaleX, level3SpriteScaleY);


            var string4t = game.add.sprite(gameMinWidth+620,gameMinHeight+370, 'string4t');
            string4t.anchor.setTo(spriteAnchorX, spriteAnchorY);
            string4t.scale.setTo(level3SpriteScaleX, level3SpriteScaleY);


            var string5t = game.add.sprite(gameMinWidth+655,gameMinHeight+360, 'string5t');
            string5t.anchor.setTo(spriteAnchorX, spriteAnchorY);
            string5t.scale.setTo(level3SpriteScaleX, level3SpriteScaleY);



            var string6t = game.add.sprite(gameMinWidth+690,gameMinHeight+345, 'string6t');
            string6t.anchor.setTo(spriteAnchorX, spriteAnchorY);
            string6t.scale.setTo(level3SpriteScaleX, level3SpriteScaleY);




            //  And this starts the animation playing by using its key ("walk")
            //  30 is the frame rate (30fps)
            //  true means it will loop when it finishes



            this.load.spritesheet('stringDragSpritesheet', 'stringDragSpritesheet.png', 14, 140, 14);
            this.load.spritesheet('stringDropSpritesheet', 'stringDropSpritesheet.png', 13, 140, 10);




            this.game.physics.arcade.enable([character, string1, string2, string3, string4, string5, string6, string1t, string2t, string3t, string4t, string5t, string6t], physicsEngine);


            string1.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, string1t);}, this);
            string2.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, string2t);}, this);
            string3.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, string3t);}, this);
            string4.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, string4t);}, this);
            string5.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, string5t);}, this);
            string6.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, string6t);}, this);



            character.body.collideWorldBounds = true;
            string1.body.collideWorldBounds = true;
            string2.body.collideWorldBounds = true;
            string3.body.collideWorldBounds = true;
            string4.body.collideWorldBounds = true;
            string5.body.collideWorldBounds = true;
            string6.body.collideWorldBounds = true;

            //For transparent
            string1.originalPosition = string1.position.clone();
            string2.originalPosition = string2.position.clone();
            string3.originalPosition = string3.position.clone();
            string4.originalPosition = string4.position.clone();
            string5.originalPosition = string5.position.clone();
            string6.originalPosition = string6.position.clone();



            string1t.body.collideWorldBounds = true;
            string1t.body.immovable = true;

            string2t.body.collideWorldBounds = true;
            string2t.body.immovable = true;

            string3t.body.collideWorldBounds = true;
            string3t.body.immovable = true;

            string4t.body.collideWorldBounds = true;
            string4t.body.immovable = true;

            string5t.body.collideWorldBounds = true;
            string5t.body.immovable = true;


            string6t.body.collideWorldBounds = true;
            string6t.body.immovable = true;


        },


        update: function () {

           //regular update goes here
            if((game.input.activePointer.leftButton.isDown 
                || game.input.activePointer.middleButton.isDown 
                || game.input.activePointer.rightButton.isDown)
                && counterLevel3 == 7){


                harpMusicSound.stop();
                game.state.start('playLevel4');
        }

        },

     stopDrag: function(currentSprite, endSprite){



         if (!this.game.physics.arcade.overlap(currentSprite, endSprite, function() {


             if(currentSprite.id == counterLevel3){
            currentSprite.input.draggable = false;
            currentSprite.inputEnabled = false;     
            currentSprite.position.copyFrom(endSprite.position); 
            currentSprite.anchor.setTo(endSprite.anchor.x, endSprite.anchor.y); 

                 comedyBubbleSound.play();

                 if(counterLevel3 == 6){

                     var musicNotes = game.add.sprite(250, 90, 'musicNotes');
                    musicNotes.scale.setTo(3, 3);
                    var walk = musicNotes.animations.add('walk');

                     musicNotes.animations.play('walk', 30, true);

                     harpMusicSound.play();





                 }
                 counterLevel3++;
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







