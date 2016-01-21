    //We create our only state

    var loadState = {

        preload: function() {




             //setting default path for assets to be used in game
            this.load.path = './assets/';


            //loading  assets for home screen
            this.load.image("homeScreen", "homeScreen.png");

            //loading sounds
            this.load.audio("explosive", "explosive.mp3");





        },
        create: function() {
            //This function is called after the preload function
            //Here we set up the game, display sprites, etc.
            //Display the image on the screen


            //Adding audio
            explosiveSound = game.add.audio('explosive');


            //start main map

            //Adding image  
            var homeScreen = game.add.sprite(0, 0, 'homeScreen');

            //Setting anchor point
            //homeScreen.anchor.x = 0;

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


        if(game.input.activePointer.leftButton.isDown
                || game.input.activePointer.middleButton.isDown 
                || game.input.activePointer.rightButton.isDown){

            //explosiveSound.play();
            this.state.start('playLevel1');
        }

        }

    };


















