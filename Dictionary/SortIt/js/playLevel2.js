
    //We create our only state
    var counterLevel2 = 1;
    var level2SpriteScaleX = 0.23; 
    var level2SpriteScaleY = 0.23;
    var playLevel2 = {

        preload: function () {

            //setting default path for assets to be used in game
            this.load.path = './assets/level2/';


            //loading assets for the level 2
            this.load.image("character", "character.png");
            this.load.image("bg", "bg.png");

            this.load.image("cake1", "cake1.png");
            this.load.image("cake2", "cake2.png");
            this.load.image("cake3", "cake3.png");
            this.load.image("cake4", "cake4.png");
            this.load.image("cake5", "cake5.png");

            this.load.image("table", "table.png");
            this.load.image("stand", "stand.png");

            this.load.image("minClock", "minClock.png");
            this.load.image("hourClock", "hourClock.png");



            //for transparent
            this.load.image("cake1t", "cake1t.png");
            this.load.image("cake2t", "cake2t.png");
            this.load.image("cake3t", "cake3t.png");
            this.load.image("cake4t", "cake4t.png");
            this.load.image("cake5t", "cake5t.png");


            //loading sounds
            this.load.audio("comedyBubble", "comedyBubble.mp3");
            this.load.audio("tickingClock", "tickingClock.mp3");
            this.load.audio("failure", "failure.mp3");


            //this.load.spritesheet('mummy', 'metalslug_mummy37x45.png', 37, 45, 18);



        },


        create: function () {

            explosiveSound.stop();
            game.physics.startSystem(physicsEngine);
            game.input.mouse.capture = true;


            //Adding audio
            comedyBubbleSound = game.add.audio('comedyBubble');
            tickingSound = game.add.audio('tickingClock');
            failureSound = game.add.audio('failure');

            tickingSound.play();
            //Adding images 


            var bg = this.game.add.sprite(gameMinWidth,gameMinHeight, 'bg');



            var character = this.game.add.sprite(gameMinWidth+1000,gameMinHeight+437, 'character');
            character.anchor.setTo(spriteAnchorX, spriteAnchorY);
            character.scale.setTo(level2SpriteScaleX,level2SpriteScaleY);

            var table = this.game.add.sprite(gameMinWidth+1100,gameMinHeight+593, 'table');
            table.anchor.setTo(spriteAnchorX, spriteAnchorY);
            table.scale.setTo(0.1,0.1);


            minClock = this.game.add.sprite(gameMinWidth+734,gameMinHeight+167, 'minClock');
            table.anchor.setTo(spriteAnchorX, spriteAnchorY);
            table.scale.setTo(.09,.09);


            hourClock = this.game.add.sprite(gameMinWidth+735,gameMinHeight+165, 'hourClock');
            table.anchor.setTo(spriteAnchorX, spriteAnchorY);
            table.scale.setTo(0.09,0.09);





            var cake1 = game.add.sprite(gameMinWidth+900,gameMinHeight+820, 'cake1');
            cake1.inputEnabled = true;
            cake1.input.enableDrag(false, true);
            cake1.id = 1;
            cake1.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cake1.scale.setTo(level2SpriteScaleX,level2SpriteScaleY);


            var cake2 = game.add.sprite(gameMinWidth+100,gameMinHeight+620, 'cake2');
            cake2.inputEnabled = true;
            cake2.input.enableDrag(false, true);
            cake2.id = 2;
            cake2.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cake2.scale.setTo(level2SpriteScaleX,level2SpriteScaleY);



            var cake3 = game.add.sprite(gameMinWidth+950,gameMinHeight+600, 'cake3');
            cake3.inputEnabled = true;
            cake3.input.enableDrag(false, true);
            cake3.id = 3;
            cake3.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cake3.scale.setTo(level2SpriteScaleX,level2SpriteScaleY);


            var cake4 = game.add.sprite(gameMinWidth+150,gameMinHeight+750, 'cake4');
            cake4.inputEnabled = true;
            cake4.input.enableDrag(false, true);
            cake4.id = 4;
            cake4.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cake4.scale.setTo(level2SpriteScaleX,level2SpriteScaleY);


            var cake5 = game.add.sprite(gameMinWidth+1200,gameMinHeight+550, 'cake5');
            cake5.inputEnabled = true;
            cake5.input.enableDrag(false, true);
            cake5.id = 5;
            cake5.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cake5.scale.setTo(level2SpriteScaleX,level2SpriteScaleY);





            //for transparent

            var stand = this.game.add.sprite(gameMinWidth+600,gameMinHeight+700, 'stand');
            stand.anchor.setTo(spriteAnchorX, spriteAnchorY);
            stand.scale.setTo(level2SpriteScaleX,level2SpriteScaleY);


            var cake1t = game.add.sprite(gameMinWidth+600,gameMinHeight+640, 'cake1t');
            cake1t.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cake1t.scale.setTo(level2SpriteScaleX,level2SpriteScaleY);


            var cake2t = game.add.sprite(gameMinWidth+600,gameMinHeight+580, 'cake2t');
            cake2t.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cake2t.scale.setTo(level2SpriteScaleX,level2SpriteScaleY);


            var cake3t = game.add.sprite(gameMinWidth+600,gameMinHeight+525, 'cake3t');
            cake3t.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cake3t.scale.setTo(level2SpriteScaleX,level2SpriteScaleY);


            var cake4t = game.add.sprite(gameMinWidth+600,gameMinHeight+475, 'cake4t');
            cake4t.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cake4t.scale.setTo(level2SpriteScaleX,level2SpriteScaleY);


            var cake5t = game.add.sprite(gameMinWidth+600,gameMinHeight+405, 'cake5t');
            cake5t.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cake5t.scale.setTo(level2SpriteScaleX,level2SpriteScaleY);





            /*var mummy = game.add.sprite(300, 200, 'mummy');
            var walk = mummy.animations.add('walk');

            //  And this starts the animation playing by using its key ("walk")
            //  30 is the frame rate (30fps)
            //  true means it will loop when it finishes
            mummy.animations.play('walk', 30, true);

            game.add.tween(mummy).to({ x: game.width }, 10000, Phaser.Easing.Linear.None, true);
*/


            this.game.physics.arcade.enable([character, cake1, cake2, cake3, cake4, cake5, cake1t, cake2t, cake3t, cake4t, cake5t], physicsEngine);


            cake1.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, cake1t);}, this);
            cake2.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, cake2t);}, this);
            cake3.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, cake3t);}, this);
            cake4.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, cake4t);}, this);
            cake5.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, cake5t);}, this);



            character.body.collideWorldBounds = true;

            cake1.body.collideWorldBounds = true;
            cake2.body.collideWorldBounds = true;
            cake3.body.collideWorldBounds = true;
            cake4.body.collideWorldBounds = true;
            cake5.body.collideWorldBounds = true;

            //For transparent
            cake1.originalPosition = cake1.position.clone();
            cake2.originalPosition = cake2.position.clone();
            cake3.originalPosition = cake3.position.clone();
            cake4.originalPosition = cake4.position.clone();
            cake5.originalPosition = cake5.position.clone();



            cake1t.body.collideWorldBounds = true;
            cake1t.body.immovable = true;

            cake2t.body.collideWorldBounds = true;
            cake2t.body.immovable = true;

            cake3t.body.collideWorldBounds = true;
            cake3t.body.immovable = true;

            cake4t.body.collideWorldBounds = true;
            cake4t.body.immovable = true;

            cake5t.body.collideWorldBounds = true;
            cake5t.body.immovable = true;




        },


        update: function () {

           //regular update goes here
            if((game.input.activePointer.leftButton.isDown 
                || game.input.activePointer.middleButton.isDown 
                || game.input.activePointer.rightButton.isDown)
                && counterLevel2 == 6){



                game.state.start('playLevel3');
            }

            minClock.angle += 50;
            hourClock.angle += 50;





        },

     stopDrag: function(currentSprite, endSprite){



         if (!this.game.physics.arcade.overlap(currentSprite, endSprite, function() {


             if(currentSprite.id == counterLevel2){
            currentSprite.input.draggable = false;
            currentSprite.inputEnabled = false;     
            currentSprite.position.copyFrom(endSprite.position); 
            currentSprite.anchor.setTo(endSprite.anchor.x, endSprite.anchor.y); 
                 comedyBubbleSound.play();

                 counterLevel2++;
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

      }
    };







