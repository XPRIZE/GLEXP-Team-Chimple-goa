

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

                //Apply the scale changes
                game.scale.setScreenSize(true);
            }

            //Start the load state
            game.state.start('load');
        }



    };






/// <reference path="../../cocos2d-typescript-definitions/cocos2d/cocos2d-lib.d.ts" />
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2 + 200;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.sprite, 0);

        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});















