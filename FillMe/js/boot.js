    
        var bootState = {


        create: function() {
            //This function is called after the preload function
            //Here we set up the game, display sprites, etc.
            //Display the image on the screen
            //Set some game settings


            game.stage.backgroundColor = "#3498db" ;
            game.physics.startSystem(Phaser.Physics.ARCADE);

            //If the device is not desktop, so it's a mobile device
            if(!game.device.desktop) {

                //Set the type of scaling to 'show all'
                game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

                //Add a blue color to the page, to hide the white borders we might have
                document.body.style.backgroundColor = '#3498db';

                
                //Set the min and max width/height of the game
                game.scale.minWidth = gameMaxWidth/4;
                game.scale.minHeight = gameMaxHeight/4;
                game.scale.maxWidth = gameMaxWidth;
                game.scale.maxHeight = gameMaxHeight;

                //Center the game on the screen
                game.scale.pageAlignHorizontally = true;
                game.scale.pageAlignVertically = true;
                
                
                game.scale.setScreenSize = true;;

                //Apply the scale changes
                //game.scale.setScreenSize(true);

            }

            //Start the load state
            game.state.start('load');
        }



    };
