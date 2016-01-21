
    //We create our only state
    var counterLevel6 = 1;

    var level6SpriteScaleX = 0.9; 
    var level6SpriteScaleY = 0.9;


    var playLevel6 = {

        preload: function () {

            //setting default path for assets to be used in game
            this.load.path = './assets/level6/';


            //loading assets for the level 6

            this.load.image("bg", "bg.png");


            this.load.image("a", "a.png");
            this.load.image("b", "b.png");
            this.load.image("c", "c.png");
            this.load.image("d", "d.png");
            this.load.image("e", "e.png");




            //for testing
            this.load.image("at", "at.png");
            this.load.image("bt", "bt.png");
            this.load.image("ct", "ct.png");
            this.load.image("dt", "dt.png");
            this.load.image("et", "et.png");





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


            var a = game.add.sprite(gameMinWidth+900,gameMinHeight+650, 'a');
            a.inputEnabled = true;
            a.input.enableDrag(false, true);
            a.id = 1;
            a.scale.setTo(level6SpriteScaleX, level6SpriteScaleY);


            var b = game.add.sprite(gameMinWidth+250,gameMinHeight+690, 'b');
            b.inputEnabled = true;
            b.input.enableDrag(false, true);
            b.id = 2;
            b.anchor.setTo(spriteAnchorX, spriteAnchorY);
            b.scale.setTo(level6SpriteScaleX, level6SpriteScaleY);


            var c = game.add.sprite(gameMinWidth+600,gameMinHeight+720, 'c');
            c.inputEnabled = true;
            c.input.enableDrag(false, true);
            c.id = 3;
            c.anchor.setTo(spriteAnchorX, spriteAnchorY);
            c.scale.setTo(level6SpriteScaleX, level6SpriteScaleY);


            var d = game.add.sprite(gameMinWidth+800,gameMinHeight+720, 'd');
            d.inputEnabled = true;
            d.input.enableDrag(false, true);
            d.id = 4;
            d.anchor.setTo(spriteAnchorX, spriteAnchorY);
            d.scale.setTo(level6SpriteScaleX, level6SpriteScaleY);


            var e = game.add.sprite(gameMinWidth+100,gameMinHeight+710, 'e');
            e.inputEnabled = true;
            e.input.enableDrag(false, true);
            e.id = 5;
            e.anchor.setTo(spriteAnchorX, spriteAnchorY);
            e.scale.setTo(level6SpriteScaleX, level6SpriteScaleY);


            //for transparent

            var at = game.add.sprite(gameMinWidth+490,gameMinHeight+140, 'at');
            at.anchor.setTo(0, 0);
            at.scale.setTo(level6SpriteScaleX, level6SpriteScaleY);


            var bt = game.add.sprite(gameMinWidth+590,gameMinHeight+100, 'bt');
            bt.anchor.setTo(0, 0);
            bt.scale.setTo(level6SpriteScaleX, level6SpriteScaleY);


            var ct = game.add.sprite(gameMinWidth+790,gameMinHeight+256, 'ct');
            ct.anchor.setTo(spriteAnchorX, spriteAnchorY);
            ct.scale.setTo(level6SpriteScaleX, level6SpriteScaleY);


            var dt = game.add.sprite(gameMinWidth+910,gameMinHeight+284, 'dt');
            dt.anchor.setTo(spriteAnchorX, spriteAnchorY);
            dt.scale.setTo(level6SpriteScaleX, level6SpriteScaleY);


            var et = game.add.sprite(gameMinWidth+1000,gameMinHeight+250, 'et');
            et.anchor.setTo(spriteAnchorX, spriteAnchorY);
            et.scale.setTo(level6SpriteScaleX, level6SpriteScaleY);




            this.game.physics.arcade.enable([a, b, c, d, e, at, bt, ct, dt, et], physicsEngine);


            a.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, at);}, this);
            b.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, bt);}, this);
            c.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, ct);}, this);
            d.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, dt);}, this);
            e.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, et);}, this);



            a.body.collideWorldBounds = true;
            b.body.collideWorldBounds = true;
            c.body.collideWorldBounds = true;
            d.body.collideWorldBounds = true;
            e.body.collideWorldBounds = true;

            //For transparent
            a.originalPosition = a.position.clone();
            b.originalPosition = b.position.clone();
            c.originalPosition = c.position.clone();
            d.originalPosition = d.position.clone();
            e.originalPosition = e.position.clone();



            at.body.collideWorldBounds = true;
            at.body.immovable = true;

            bt.body.collideWorldBounds = true;
            bt.body.immovable = true;

            ct.body.collideWorldBounds = true;
            ct.body.immovable = true;

            dt.body.collideWorldBounds = true;
            dt.body.immovable = true;

            et.body.collideWorldBounds = true;
            et.body.immovable = true;


        },


        update: function () {

           //regular update goes here
            if((game.input.activePointer.leftButton.isDown 
                || game.input.activePointer.middleButton.isDown 
                || game.input.activePointer.rightButton.isDown)
                && counterLevel6 == 6){



            }



        },

     stopDrag: function(currentSprite, endSprite){



         if (!this.game.physics.arcade.overlap(currentSprite, endSprite, function() {


             if(currentSprite.id == counterLevel6){
            currentSprite.input.draggable = false;
            currentSprite.inputEnabled = false;     
            currentSprite.position.copyFrom(endSprite.position); 
            currentSprite.anchor.setTo(endSprite.anchor.x, endSprite.anchor.y); 

                 comedyBubbleSound.play();

                 counterLevel6++;
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

