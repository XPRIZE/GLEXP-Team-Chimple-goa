    //We create our only state


    
    var loadState = {

        preload: function() {




             //setting default path for assets to be used in game
            this.load.path = "";


            //loading  assets for home screen
            this.load.image("homeScreen", commonAssets + "homeScreen" + imageExtension);
            
        },
         render : function()    
    {
        var self = this;
        self.game.debug.text(self.game.time.fps || '' , 200, 200, '#00ff00');
    },
        create: function() {
            //This function is called after the preload function
            //Here we set up the game, display sprites, etc.
            //Display the image on the screen

            game.time.advancedTiming = true;  

   
            
            //Adding audio
            

            //start main map

            //Adding image  //600, 370,
            homeScreen = game.add.sprite(game.world.centerX, game.world.centerY, "homeScreen");
            homeScreen.anchor.setTo(0.5, 0.5);
            homeScreen.scale.setTo(gameMaxWidth/3600, gameMaxHeight/2400);
            console.log(gameMaxWidth);
            console.log(gameMaxHeight);

            homeScreen.rotation = true;
            //Setting anchor point
            //homeScreen.anchor.x = 1;
            //homeScreen.anchor.y = 1;
           

            
           

            //Phaser.ScaleManager.EXACT_FIT = 0;
            
            game.physics.startSystem(Phaser.Physics.ARCADE);

            if(!game.device.desktop) {

                game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;


                /*game.scale.minWidth = gameMaxWidth/4; 
                game.scale.minHeight = gameMaxHeight/4;
                *///game.scale.maxWidth = window.screen.width;
                //game.scale.maxHeight = window.screen.height;
                
                /*game.scale.minWidth = gameMaxWidth/4; //window.screen.width
                game.scale.minHeight = gameMaxHeight/4;
                game.scale.maxWidth = gameMaxWidth;
                game.scale.maxHeight = gameMaxHeight;
                */
                
                game.scale.pageAlignHorizontally = true;
                game.scale.pageAlignVertically = true;
                
                game.scale.setScreenSize = true;


            }


        },



        update: function(){

            homeScreen.alpha +=1/360;
            homeScreen.angle +=1.5;
            homeScreen.rotation += 0.05;
            game.input.onDown.add(function(){this.state.start('A');}, this);
            
            
        

        }

    };


















