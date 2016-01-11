    //We create our only state


    
    var loadState = {

        preload: function() {




             //setting default path for assets to be used in game
            this.load.path = './assets/';


            //loading  assets for home screen
            this.load.image('homeScreen', 'homeScreen.png');
            //this.load.spritesheet('homeScreen', 'homeScreen.png', 1280, 800, 30);
            //loading sounds
            this.load.audio("explosive", "explosive.mp3");
              
            //this.load.spritesheet('fillMe', 'A/fillMe.png', 10, 10, 300);
            
            



        },
        create: function() {
            //This function is called after the preload function
            //Here we set up the game, display sprites, etc.
            //Display the image on the screen


            //Adding audio
            explosiveSound = game.add.audio('explosive');


            //start main map

            //Adding image  //600, 370,
            homeScreen = game.add.sprite(640, 400, 'homeScreen');
            
            homeScreen.rotation = true;
            //Setting anchor point
            homeScreen.anchor.x = 1;
            homeScreen.anchor.y = 1;
            homeScreen.anchor.setTo(.5, .5);

            
            /*homeScreen = game.add.sprite(0, 0, 'homeScreen');
            //homeScreen.scale.set(1);
            //homeScreen.smoothed = false;
            anim = homeScreen.animations.add('rotate');

            //anim.onStart.add(animationStarted, this);
            //anim.onLoop.add(animationLooped, this);
            //anim.onComplete.add(animationStopped, this);

            anim.play(7, true);
                */
            
            //var fillMe = game.add.sprite(500, 500, 'fillMe');

    //  Here we add a new animation called 'walk'
    //  Because we didn't give any other parameters it's going to make an animation from all available frames in the 'mummy' sprite sheet
    //var walk = fillMe.animations.add('walk');

    //  And this starts the animation playing by using its key ("walk")
    //  30 is the frame rate (30fps)
    //  true means it will loop when it finishes
   // fillMe.animations.play('walk', 30, true);

            
            
            game.physics.startSystem(Phaser.Physics.ARCADE);

            if(!game.device.desktop) {

                game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;


                game.scale.minWidth = gameMaxWidth/4;
                game.scale.minHeight = gameMaxHeight/4;
                game.scale.maxWidth = gameMaxWidth;
                game.scale.maxHeight = gameMaxHeight;
                
                game.scale.pageAlignHorizontally = true;
                game.scale.pageAlignVertically = true;

                game.scale.setScreenSize(true);


            }


        },



        update: function(){

            homeScreen.alpha +=1/360;
            homeScreen.angle +=1.5;
            homeScreen.rotation += 0.05;
        if(game.input.activePointer.leftButton.isDown
                || game.input.activePointer.middleButton.isDown 
                || game.input.activePointer.rightButton.isDown){

            //explosiveSound.play();
            this.state.start('A');
        }

        }

    };


















