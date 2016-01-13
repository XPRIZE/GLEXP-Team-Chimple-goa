        
    var oObjectClicked = 0;
    var askForLevelP = 0;
    
    
    var octopusFlag = 0;
    var oliveFlag = 0;
    var omletFlag = 0;            
    var onionFlag = 0;
    var awrangeFlag = 0;
    var ostrichFlag = 0;
    var ostrichRightViewFlag = 0;
    var ovenFlag = 0;
    var owlFlag = 0;
    var oxFlag = 0;
    
    
    var O = {

        preload: function () {

            //setting default path for assets to be used in game
            this.load.path = './assets/O/';
            
            
            
            this.load.image("transOctopus", "transOctopus.png");
            this.load.image("transOlive", "transOlive.png");
            this.load.image("transOmlet", "transOmlet.png");
            this.load.image("transOnion", "transOnion.png");
            this.load.image("transAwrange", "transAwrange.png");
            this.load.image("transOstrich", "transOstrich.png");
            this.load.image("transOstrichRightView", "transOstrichRightView.png");
            this.load.image("transOven", "transOven.png");
            this.load.image("transOwl", "transOwl.png");
            this.load.image("transOx", "transOx.png");
            
            this.load.image("octopus", "octopus.png");
            this.load.image("olive", "olive.png");
            this.load.image("omlet", "omlet.png");
            this.load.image("onion", "onion.png");
            this.load.image("awrange", "awrange.png");
            this.load.image("ostrich", "ostrich.png");
            this.load.image("ostrichRightView", "ostrichRightView.png");
            this.load.image("oven", "oven.png");
            this.load.image("owl", "owl.png");
            this.load.image("ox", "ox.png");
            
            
            //loading assets for the level  O
            
            //loading shades
            this.load.image("blue", "blue.png");
            this.load.image("cyan", "cyan.png");
            this.load.image("green", "green.png");
            this.load.image("orange", "orange.png");
            this.load.image("pink", "pink.png");
            this.load.image("red", "red.png");
    
            this.load.image("bg", "bg.png");
            this.load.image("oLetter", "oLetter.png");
            this.load.image("pButton", "pButton.png");
            /*this.load.image("leftArrow", "leftArrow.png");
            this.load.image("rightArrow", "rightArrow.png");
            */
            
            this.load.image("camel", "camel.png");
            this.load.image("candle", "candle.png");
            this.load.image("car", "car.png");
            this.load.image("cat", "cat.png");
            this.load.image("cheese", "cheese.png");
            this.load.image("cherry", "cherry.png");
            this.load.image("clock", "clock.png");
            this.load.image("crown", "crown.png");
            this.load.image("cow", "cow.png");
            this.load.image("crab", "crab.png");
            
            
            this.load.image("cloud", "cloud.png");

            this.load.spritesheet('blackSplash', 'blackSplash.png', 141, 240, 7);
            
            
            
            //loading sounds
            this.load.audio("waterBurst", "waterBurst.mp3");
            this.load.audio("bubble", "bubble.mp3");
            this.load.audio("stick", "stick.mp3");
            this.load.audio("gameFace", "gameFace.mp3");
          
        },

        create: function () {

            
            game.physics.startSystem(physicsEngine);
            game.input.mouse.capture = true;


            //Adding audio
            waterBurstSound = game.add.audio('waterBurst');
            
            bubbleSound = game.add.audio('bubble');
            stickSound = game.add.audio('stick');
            
            gameFace =  game.add.audio('gameFace');
            gameFace.loop = true;
            //gameFace.play();
            
            
            
            
            //Adding images 
            var bg = game.add.image(gameMinWidth, gameMinHeight, 'bg');
                
            
            
            
            //Main letter O
            oLetter = game.add.sprite(gameMinWidth, gameMinHeight, 'oLetter');
            oLetter.inputEnabled = true;
            oLetter.events.onInputDown.add(this.onDownoLetter, this);
            
            
            
            //Objects starting from O
                    
            cloud1 = game.add.image(gameMinWidth+145, gameMinHeight+101, 'cloud');
            cloud1.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cloud1.scale.setTo(.1, .1);
            cloud1.tint = 0xB0B0B0;
            
            game.add.tween(cloud1).to( {x:1190, y:94}, 30000, Phaser.Easing.Linear.None, true, 0, 1000, true);
            
            
            cloud2 = game.add.image(gameMinWidth+494, gameMinHeight+69, 'cloud');
            cloud2.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cloud2.scale.setTo(.1, .1);
            cloud2.tint = 0xB0B0B0;
            game.add.tween(cloud2).to( {x:100, y:100}, 30000, Phaser.Easing.Linear.None, true, 0, 1000, true);
            
            cloud3 = game.add.image(gameMinWidth+936, gameMinHeight+93, 'cloud');
            cloud3.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cloud3.scale.setTo(.1, .1);
            cloud3.tint = 0xB0B0B0;
            game.add.tween(cloud3).to( {x:1190, y:94}, 8000, Phaser.Easing.Linear.None, true, 0, 1000, true);
            
            
            
            
            octopus = game.add.sprite(objectsPositions[0].x, objectsPositions[0].y, 'octopus');
            octopus.anchor.setTo(spriteAnchorX, spriteAnchorY);
            octopus.scale.setTo(spriteScaleX, spriteScaleY);
            octopus.inputEnabled = true;
            octopus.events.onInputDown.add(onDownoctopus, this);
            function onDownoctopus() {this.resetOSpriteFlag(); octopusFlag = 1;oObjectClicked++;}

            
            
            
            olive = game.add.sprite(objectsPositions[10].x, objectsPositions[10].y, 'olive');
            olive.anchor.setTo(spriteAnchorX, spriteAnchorY);
            olive.scale.setTo(spriteScaleX, spriteScaleY);
            olive.inputEnabled = true;
            olive.events.onInputDown.add(onDownolive, this);
            function onDownolive() {this.resetOSpriteFlag(); oliveFlag = 1;oObjectClicked++;}

            
            
            
            omlet = game.add.sprite(objectsPositions[1].x, objectsPositions[1].y, 'omlet');
            omlet.anchor.setTo(spriteAnchorX, spriteAnchorY);
            omlet.scale.setTo(spriteScaleX, spriteScaleY);
            omlet.inputEnabled = true;
            omlet.events.onInputDown.add(onDownomlet, this);
            function onDownomlet() {this.resetOSpriteFlag(); omletFlag = 1;oObjectClicked++;}
            
            
            
            
            onion = game.add.sprite(objectsPositions[11].x, objectsPositions[11].y, 'onion');
            onion.anchor.setTo(spriteAnchorX, spriteAnchorY);
            onion.scale.setTo(spriteScaleX, spriteScaleY);
            onion.inputEnabled = true;
            onion.events.onInputDown.add(onDownonion, this);
            function onDownonion() {this.resetOSpriteFlag(); onionFlag = 1;oObjectClicked++;}
            
            
            
            awrange = game.add.sprite(objectsPositions[2].x, objectsPositions[2].y, 'awrange');
            awrange.anchor.setTo(spriteAnchorX, spriteAnchorY);
            awrange.scale.setTo(spriteScaleX, spriteScaleY);
            awrange.inputEnabled = true;
            awrange.events.onInputDown.add(onDownawrange, this);
            function onDownawrange() {this.resetOSpriteFlag(); awrangeFlag = 1;oObjectClicked++;}
            
            ostrich = game.add.sprite(objectsPositions[12].x, objectsPositions[12].y, 'ostrich');
            ostrich.anchor.setTo(spriteAnchorX, spriteAnchorY);
            ostrich.scale.setTo(spriteScaleX, spriteScaleY);
            ostrich.inputEnabled = true;
            ostrich.events.onInputDown.add(onDownostrich, this);
            function onDownostrich() {this.resetOSpriteFlag(); ovenFlag = 1;oObjectClicked++;}

            
            ostrichRightView = game.add.sprite(objectsPositions[3].x, objectsPositions[3].y, 'ostrichRightView');
            ostrichRightView.anchor.setTo(spriteAnchorX, spriteAnchorY);
            ostrichRightView.scale.setTo(spriteScaleX, spriteScaleY);
            ostrichRightView.inputEnabled = true;  
            ostrichRightView.events.onInputDown.add(onDownostrichRightView, this);
            function onDownostrichRightView() {this.resetOSpriteFlag(); ostrichRightViewFlag = 1;oObjectClicked++;}
            
            
            oven = game.add.sprite(objectsPositions[13].x, objectsPositions[13].y, 'oven');
            oven.anchor.setTo(spriteAnchorX, spriteAnchorY);
            oven.scale.setTo(spriteScaleX, spriteScaleY);
            oven.inputEnabled = true;
            oven.events.onInputDown.add(onDownoven, this);
            function onDownoven() {this.resetOSpriteFlag(); ostrichFlag = 1;oObjectClicked++;}
            
            
            owl = game.add.sprite(objectsPositions[4].x, objectsPositions[4].y, 'owl');
            owl.anchor.setTo(spriteAnchorX, spriteAnchorY);
            owl.scale.setTo(spriteScaleX, spriteScaleY);
            owl.inputEnabled = true;
            owl.events.onInputDown.add(onDownowl, this);
            function onDownowl() {this.resetOSpriteFlag(); owlFlag = 1;oObjectClicked++;}
            
            
            ox = game.add.sprite(objectsPositions[14].x, objectsPositions[14].y, 'ox');
            ox.anchor.setTo(spriteAnchorX, spriteAnchorY);
            ox.scale.setTo(spriteScaleX, spriteScaleY);
            ox.inputEnabled = true;
            ox.events.onInputDown.add(onDownox, this);
            function onDownox() {this.resetOSpriteFlag(); oxFlag = 1;oObjectClicked++;}
            
            
            
            //Adding other sprites        
            
            camel = game.add.sprite(objectsPositions[5].x, objectsPositions[5].y, 'camel');
            camel.anchor.setTo(spriteAnchorX, spriteAnchorY);
            camel.scale.setTo(spriteScaleX, spriteScaleY);
            camel.inputEnabled = true;
            camel.events.onInputDown.add(onDownCamel, this);
            function onDownCamel() {this.resetOSpriteFlag(); camelFlag = 1;}
            
            
            
            
            candle = game.add.sprite(objectsPositions[15].x, objectsPositions[15].y, 'candle');
            candle.anchor.setTo(spriteAnchorX, spriteAnchorY);
            candle.scale.setTo(spriteScaleX, spriteScaleY);
            candle.inputEnabled = true;
            candle.events.onInputDown.add(onDownCandle, this);
            function onDownCandle() {this.resetOSpriteFlag(); candleFlag = 1; }
            
            
            car = game.add.sprite(objectsPositions[6].x, objectsPositions[6].y, 'car');
            car.anchor.setTo(spriteAnchorX, spriteAnchorY);
            car.scale.setTo(spriteScaleX, spriteScaleY);
            car.inputEnabled = true;
            car.events.onInputDown.add(onDownCar, this);
            function onDownCar() {this.resetOSpriteFlag(); carFlag = 1;}
            
            cat = game.add.sprite(objectsPositions[16].x, objectsPositions[16].y, 'cat');
            cat.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cat.scale.setTo(spriteScaleX, spriteScaleY);
            cat.inputEnabled = true;
            cat.events.onInputDown.add(onDownCat, this);
            function onDownCat() {this.resetOSpriteFlag(); catFlag = 1;}
            
            
            cheese = game.add.sprite(objectsPositions[7].x, objectsPositions[7].y, 'cheese');
            cheese.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cheese.scale.setTo(spriteScaleX, spriteScaleY);
            cheese.inputEnabled = true;
            cheese.events.onInputDown.add(onDownCheese, this);
            function onDownCheese() {this.resetOSpriteFlag(); cheeseFlag = 1;}
            
            
            cherry = game.add.sprite(objectsPositions[17].x, objectsPositions[17].y, 'cherry');
            cherry.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cherry.scale.setTo(spriteScaleX, spriteScaleY);
            cherry.inputEnabled = true;
            cherry.events.onInputDown.add(onDownCherry, this);
            function onDownCherry() {this.resetOSpriteFlag(); cherryFlag = 1;}
            
            
            clock = game.add.sprite(objectsPositions[8].x, objectsPositions[8].y, 'clock');
            clock.anchor.setTo(spriteAnchorX, spriteAnchorY);
            clock.scale.setTo(spriteScaleX, spriteScaleY);
            clock.inputEnabled = true;
            clock.events.onInputDown.add(onDownClock, this);
            function onDownClock() {this.resetOSpriteFlag(); clockFlag = 1;}
            
            
            
            cow = game.add.sprite(objectsPositions[18].x, objectsPositions[18].y, 'cow');
            cow.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cow.scale.setTo(spriteScaleX, spriteScaleY);
            cow.inputEnabled = true;
            cow.events.onInputDown.add(onDownCow, this);
            function onDownCow() {this.resetOSpriteFlag(); cowFlag = 1;}
            
            
            crab = game.add.sprite(objectsPositions[9].x, objectsPositions[9].y, 'crab');
            crab.anchor.setTo(spriteAnchorX, spriteAnchorY);
            crab.scale.setTo(spriteScaleX, spriteScaleY);
            crab.inputEnabled = true;
            crab.events.onInputDown.add(onDownCrab, this);
            function onDownCrab() {this.resetOSpriteFlag(); crabFlag = 1;}
            
            
            crown = game.add.sprite(objectsPositions[19].x, objectsPositions[19].y, 'crown');
            crown.anchor.setTo(spriteAnchorX, spriteAnchorY);
            crown.scale.setTo(spriteScaleX, spriteScaleY);
            crown.inputEnabled = true;
            crown.events.onInputDown.add(onDownCrown, this);
            function onDownCrown() {this.resetOSpriteFlag(); crownFlag = 1;}
            
            /* game.leftArrow = game.add.sprite(1070, 730, 'leftArrow');             
            game.leftArrow.scale.setTo(1, 1); 
            game.leftArrow.anchor.setTo(spriteAnchorX, spriteAnchorY);
            game.leftArrow.inputEnabled = true;
            game.leftArrow.events.onInputDown.add(onDownLeftArrow, this);
            function onDownLeftArrow() {this.setOGlobalVaribalesToZero();game.state.start('N');}
            
            
            game.rightArrow = game.add.sprite(1170, 730, 'rightArrow');             
            game.rightArrow.scale.setTo(1, 1); 
            game.rightArrow.anchor.setTo(spriteAnchorX, spriteAnchorY);
            game.rightArrow.inputEnabled = true;
            game.rightArrow.events.onInputDown.add(onDownRightArrow, this);
            function onDownRightArrow() {this.setOGlobalVaribalesToZero();game.state.start('P');}*/
            
            //Color shades
            blue = game.add.sprite(objectsPositions[20].x, objectsPositions[20].y, 'blue');
            blue.anchor.setTo(spriteAnchorX, spriteAnchorY);
            blue.scale.setTo(shadeScaleX, shadeScaleY);
            blue.inputEnabled = true;
            blue.tint = 0x456AC1; 
            blue.events.onInputDown.add(onDownBlue, this);
            function onDownBlue() {this.setColorOFlagToZero(); blueFlag = 1;}
           
            
            cyan = game.add.sprite(objectsPositions[21].x, objectsPositions[21].y, 'cyan');
            cyan.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cyan.scale.setTo(shadeScaleX, shadeScaleY);
            cyan.inputEnabled = true;
            cyan.tint = 0x45C1C1; 
            cyan.events.onInputDown.add(onDownCyan, this);
            function onDownCyan() {this.setColorOFlagToZero(); cyanFlag = 1;}
            
            
            
            green = game.add.sprite(objectsPositions[22].x, objectsPositions[22].y, 'green');
            green.anchor.setTo(spriteAnchorX, spriteAnchorY);
            green.scale.setTo(shadeScaleX, shadeScaleY);
            green.inputEnabled = true;
            green.tint = 0x51C735;
            green.events.onInputDown.add(onDownGreen, this);
            function onDownGreen() {this.setColorOFlagToZero(); greenFlag = 1;}
            
            
            orange = game.add.sprite(objectsPositions[23].x, objectsPositions[23].y, 'orange');
            orange.anchor.setTo(spriteAnchorX, spriteAnchorY);
            orange.scale.setTo(shadeScaleX, shadeScaleY);
            orange.inputEnabled = true;
            orange.tint = 0xF38932;
            orange.events.onInputDown.add(onDownOrange, this);
            function onDownOrange() {this.setColorOFlagToZero(); orangeFlag = 1;}
           
            
            pink = game.add.sprite(objectsPositions[24].x, objectsPositions[24].y, 'pink');
            pink.anchor.setTo(spriteAnchorX, spriteAnchorY);
            pink.scale.setTo(shadeScaleX, shadeScaleY);
            pink.inputEnabled = true;
            pink.tint = 0xCC3ACC;
            pink.events.onInputDown.add(onDownPink, this);
            function onDownPink() {this.setColorOFlagToZero(); pinkFlag = 1;}
            
            
            red = game.add.sprite(objectsPositions[25].x, objectsPositions[25].y, 'red');
            red.anchor.setTo(spriteAnchorX, spriteAnchorY);
            red.scale.setTo(shadeScaleX, shadeScaleY);
            red.inputEnabled = true;
            red.tint = 0xE32424;
            red.events.onInputDown.add(onDownRed, this);
            function onDownRed() {this.setColorOFlagToZero(); redFlag = 1;}
                
        },
        
        onDownoLetter: function() {
                
            //octopus
                    if(octopusFlag == 1 && greenFlag == 1 ){var greenoctopus = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transOctopus');greenoctopus.tint =  0x51C735; greenoctopus.scale.setTo(spriteScaleX, spriteScaleY); 
greenoctopus.anchor.setTo(0.6, 0.6);stickSound.play();}                    
                    
                    if(octopusFlag == 1 && blueFlag == 1){var blueoctopus = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transOctopus'); blueoctopus.tint =  0x456AC1; blueoctopus.scale.setTo(spriteScaleX, spriteScaleY); blueoctopus.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(octopusFlag == 1 && orangeFlag == 1){var orangeoctopus = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transOctopus'); orangeoctopus.tint =  0xF38932; orangeoctopus.scale.setTo(spriteScaleX, spriteScaleY); orangeoctopus.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(octopusFlag == 1 && redFlag == 1){var redoctopus = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transOctopus'); redoctopus.tint =  0xE32424; redoctopus.scale.setTo(spriteScaleX, spriteScaleY); redoctopus.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(octopusFlag == 1 && pinkFlag == 1){var pinkoctopus = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transOctopus'); pinkoctopus.tint =  0xCC3ACC; pinkoctopus.scale.setTo(spriteScaleX, spriteScaleY); pinkoctopus.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(octopusFlag == 1 && cyanFlag == 1){var cyanoctopus = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transOctopus'); cyanoctopus.tint =  0x45C1C1; cyanoctopus.scale.setTo(spriteScaleX, spriteScaleY); cyanoctopus.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //olive    
                    if(oliveFlag == 1 && greenFlag == 1 ){var greenolive = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transOlive');greenolive.tint =  0x51C735; greenolive.scale.setTo(spriteScaleX, spriteScaleY); 
greenolive.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(oliveFlag == 1 && blueFlag == 1){var blueolive = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transOlive'); blueolive.tint =  0x456AC1; blueolive.scale.setTo(spriteScaleX, spriteScaleY); blueolive.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(oliveFlag == 1 && orangeFlag == 1){var orangeolive = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transOlive'); orangeolive.tint =  0xF38932; orangeolive.scale.setTo(spriteScaleX, spriteScaleY); orangeolive.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(oliveFlag == 1 && redFlag == 1){var redolive = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transOlive'); redolive.tint =  0xE32424; redolive.scale.setTo(spriteScaleX, spriteScaleY); redolive.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(oliveFlag == 1 && pinkFlag == 1){var pinkolive = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transOlive'); pinkolive.tint =  0xCC3ACC; pinkolive.scale.setTo(spriteScaleX, spriteScaleY); pinkolive.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(oliveFlag == 1 && cyanFlag == 1){var cyanolive = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transOlive'); cyanolive.tint =  0x45C1C1; cyanolive.scale.setTo(spriteScaleX, spriteScaleY); cyanolive.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //omlet    
                    if(omletFlag == 1 && greenFlag == 1 ){var greenomlet = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transOmlet');greenomlet.tint =  0x51C735; greenomlet.scale.setTo(spriteScaleX, spriteScaleY); 
greenomlet.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(omletFlag == 1 && blueFlag == 1){var blueomlet = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transOmlet'); blueomlet.tint =  0x456AC1; blueomlet.scale.setTo(spriteScaleX, spriteScaleY); blueomlet.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(omletFlag == 1 && orangeFlag == 1){var orangeomlet = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transOmlet'); orangeomlet.tint =  0xF38932; orangeomlet.scale.setTo(spriteScaleX, spriteScaleY); orangeomlet.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(omletFlag == 1 && redFlag == 1){var redomlet = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transOmlet'); redomlet.tint =  0xE32424; redomlet.scale.setTo(spriteScaleX, spriteScaleY); redomlet.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(omletFlag == 1 && pinkFlag == 1){var pinkomlet = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transOmlet'); pinkomlet.tint =  0xCC3ACC; pinkomlet.scale.setTo(spriteScaleX, spriteScaleY); pinkomlet.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(omletFlag == 1 && cyanFlag == 1){var cyanomlet = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transOmlet'); cyanomlet.tint =  0x45C1C1; cyanomlet.scale.setTo(spriteScaleX, spriteScaleY); cyanomlet.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //onion
                    if(onionFlag == 1 && greenFlag == 1 ){var greenonion = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transOnion');greenonion.tint =  0x51C735; greenonion.scale.setTo(spriteScaleX, spriteScaleY); 
greenonion.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(onionFlag == 1 && blueFlag == 1){console.log("blueonion plotted");var blueonion = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transOnion'); blueonion.tint =  0x456AC1; blueonion.scale.setTo(spriteScaleX, spriteScaleY); blueonion.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(onionFlag == 1 && orangeFlag == 1){var orangeonion = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transOnion'); orangeonion.tint =  0xF38932; orangeonion.scale.setTo(spriteScaleX, spriteScaleY); orangeonion.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(onionFlag == 1 && redFlag == 1){var redonion = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transOnion'); redonion.tint =  0xE32424; redonion.scale.setTo(spriteScaleX, spriteScaleY); redonion.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(onionFlag == 1 && pinkFlag == 1){var pinkonion = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transOnion'); pinkonion.tint =  0xCC3ACC; pinkonion.scale.setTo(spriteScaleX, spriteScaleY); pinkonion.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(onionFlag == 1 && cyanFlag == 1){var cyanonion = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transOnion'); cyanonion.tint =  0x45C1C1; cyanonion.scale.setTo(spriteScaleX, spriteScaleY); cyanonion.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //awrange    
                    if(awrangeFlag == 1 && greenFlag == 1 ){var greenawrange = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transAwrange');greenawrange.tint =  0x51C735; greenawrange.scale.setTo(spriteScaleX, spriteScaleY); 
greenawrange.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(awrangeFlag == 1 && blueFlag == 1){console.log("blueawrange plotted");var blueawrange = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transAwrange'); blueawrange.tint =  0x456AC1; blueawrange.scale.setTo(spriteScaleX, spriteScaleY); blueawrange.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(awrangeFlag == 1 && orangeFlag == 1){var awrangeawrange = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transAwrange'); awrangeawrange.tint =  0xF38932; awrangeawrange.scale.setTo(spriteScaleX, spriteScaleY); awrangeawrange.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(awrangeFlag == 1 && redFlag == 1){var redawrange = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transAwrange'); redawrange.tint =  0xE32424; redawrange.scale.setTo(spriteScaleX, spriteScaleY); redawrange.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(awrangeFlag == 1 && pinkFlag == 1){var pinkawrange = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transAwrange'); pinkawrange.tint =  0xCC3ACC; pinkawrange.scale.setTo(spriteScaleX, spriteScaleY); pinkawrange.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(awrangeFlag == 1 && cyanFlag == 1){var cyanawrange = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transAwrange'); cyanawrange.tint =  0x45C1C1; cyanawrange.scale.setTo(spriteScaleX, spriteScaleY); cyanawrange.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //ostrich   
                    if(ovenFlag == 1 && greenFlag == 1 ){var greenostrich = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transOstrich');greenostrich.tint =  0x51C735; greenostrich.scale.setTo(spriteScaleX, spriteScaleY); 
greenostrich.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(ovenFlag == 1 && blueFlag == 1){console.log("blueostrich plotted");var blueostrich = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transOstrich'); blueostrich.tint =  0x456AC1; blueostrich.scale.setTo(spriteScaleX, spriteScaleY); blueostrich.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(ovenFlag == 1 && orangeFlag == 1){var orangeostrich = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transOstrich'); orangeostrich.tint =  0xF38932; orangeostrich.scale.setTo(spriteScaleX, spriteScaleY); orangeostrich.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(ovenFlag == 1 && redFlag == 1){var redostrich = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transOstrich'); redostrich.tint =  0xE32424; redostrich.scale.setTo(spriteScaleX, spriteScaleY); redostrich.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(ovenFlag == 1 && pinkFlag == 1){var pinkostrich = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transOstrich'); pinkostrich.tint =  0xCC3ACC; pinkostrich.scale.setTo(spriteScaleX, spriteScaleY); pinkostrich.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(ovenFlag == 1 && cyanFlag == 1){var cyanostrich = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transOstrich'); cyanostrich.tint =  0x45C1C1; cyanostrich.scale.setTo(spriteScaleX, spriteScaleY); cyanostrich.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //ostrichRightView    
                    if(ostrichRightViewFlag == 1 && greenFlag == 1 ){var greenostrichRightView = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transOstrichRightView');greenostrichRightView.tint =  0x51C735; greenostrichRightView.scale.setTo(spriteScaleX, spriteScaleY); 
greenostrichRightView.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(ostrichRightViewFlag == 1 && blueFlag == 1){console.log("blueostrichRightView plotted");var blueostrichRightView = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transOstrichRightView'); blueostrichRightView.tint =  0x456AC1; blueostrichRightView.scale.setTo(spriteScaleX, spriteScaleY); blueostrichRightView.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(ostrichRightViewFlag == 1 && orangeFlag == 1){var orangeostrichRightView = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transOstrichRightView'); orangeostrichRightView.tint =  0xF38932; orangeostrichRightView.scale.setTo(spriteScaleX, spriteScaleY); orangeostrichRightView.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(ostrichRightViewFlag == 1 && redFlag == 1){var redostrichRightView = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transOstrichRightView'); redostrichRightView.tint =  0xE32424; redostrichRightView.scale.setTo(spriteScaleX, spriteScaleY); redostrichRightView.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(ostrichRightViewFlag == 1 && pinkFlag == 1){var pinkostrichRightView = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transOstrichRightView'); pinkostrichRightView.tint =  0xCC3ACC; pinkostrichRightView.scale.setTo(spriteScaleX, spriteScaleY); pinkostrichRightView.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(ostrichRightViewFlag == 1 && cyanFlag == 1){var cyanostrichRightView = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transOstrichRightView'); cyanostrichRightView.tint =  0x45C1C1; cyanostrichRightView.scale.setTo(spriteScaleX, spriteScaleY); cyanostrichRightView.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //oven    
                    if(ostrichFlag == 1 && greenFlag == 1 ){var greenoven = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transOven');greenoven.tint =  0x51C735; greenoven.scale.setTo(spriteScaleX, spriteScaleY); 
greenoven.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(ostrichFlag == 1 && blueFlag == 1){console.log("blueoven plotted");var blueoven = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transOven'); blueoven.tint =  0x456AC1; blueoven.scale.setTo(spriteScaleX, spriteScaleY); blueoven.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(ostrichFlag == 1 && orangeFlag == 1){var orangeoven = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transOven'); orangeoven.tint =  0xF38932; orangeoven.scale.setTo(spriteScaleX, spriteScaleY); orangeoven.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(ostrichFlag == 1 && redFlag == 1){var redoven = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transOven'); redoven.tint =  0xE32424; redoven.scale.setTo(spriteScaleX, spriteScaleY); redoven.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(ostrichFlag == 1 && pinkFlag == 1){var pinkoven = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transOven'); pinkoven.tint =  0xCC3ACC; pinkoven.scale.setTo(spriteScaleX, spriteScaleY); pinkoven.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(ostrichFlag == 1 && cyanFlag == 1){var cyanoven = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transOven'); cyanoven.tint =  0x45C1C1; cyanoven.scale.setTo(spriteScaleX, spriteScaleY); cyanoven.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //owl    
                    if(owlFlag == 1 && greenFlag == 1 ){var greenowl = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transOwl');greenowl.tint =  0x51C735; greenowl.scale.setTo(spriteScaleX, spriteScaleY); 
greenowl.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(owlFlag == 1 && blueFlag == 1){console.log("blueowl plotted");var blueowl = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transOwl'); blueowl.tint =  0x456AC1; blueowl.scale.setTo(spriteScaleX, spriteScaleY); blueowl.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(owlFlag == 1 && orangeFlag == 1){var orangeowl = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transOwl'); orangeowl.tint =  0xF38932; orangeowl.scale.setTo(spriteScaleX, spriteScaleY); orangeowl.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(owlFlag == 1 && redFlag == 1){var redowl = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transOwl'); redowl.tint =  0xE32424; redowl.scale.setTo(spriteScaleX, spriteScaleY); redowl.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(owlFlag == 1 && pinkFlag == 1){var pinkowl = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transOwl'); pinkowl.tint =  0xCC3ACC; pinkowl.scale.setTo(spriteScaleX, spriteScaleY); pinkowl.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(owlFlag == 1 && cyanFlag == 1){var cyanowl = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transOwl'); cyanowl.tint =  0x45C1C1; cyanowl.scale.setTo(spriteScaleX, spriteScaleY); cyanowl.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //ox 
                    if(oxFlag == 1 && greenFlag == 1 ){var greenox = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transOx');greenox.tint =  0x51C735; greenox.scale.setTo(spriteScaleX, spriteScaleY); 
greenox.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(oxFlag == 1 && blueFlag == 1){console.log("blueox plotted");var blueox = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transOx'); blueox.tint =  0x456AC1; blueox.scale.setTo(spriteScaleX, spriteScaleY); blueox.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(oxFlag == 1 && orangeFlag == 1){var orangeox = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transOx'); orangeox.tint =  0xF38932; orangeox.scale.setTo(spriteScaleX, spriteScaleY); orangeox.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(oxFlag == 1 && redFlag == 1){var redox = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transOx'); redox.tint =  0xE32424; redox.scale.setTo(spriteScaleX, spriteScaleY); redox.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(oxFlag == 1 && pinkFlag == 1){var pinkox = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transOx'); pinkox.tint =  0xCC3ACC; pinkox.scale.setTo(spriteScaleX, spriteScaleY); pinkox.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(oxFlag == 1 && cyanFlag == 1){var cyanox = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transOx'); cyanox.tint =  0x45C1C1; cyanox.scale.setTo(spriteScaleX, spriteScaleY); cyanox.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //For Wrong Objects
            
if(camelFlag == 1 || candleFlag == 1 || carFlag == 1 || catFlag == 1 || cheeseFlag == 1 || cherryFlag == 1 || clockFlag == 1 || crownFlag == 1 || cowFlag == 1 || crabFlag == 1){var blackSplash = game.add.sprite(game.input.mousePointer.x,game.input.mousePointer.y,'blackSplash');
            blackSplash.scale.setTo(.5, .5); blackSplash.anchor.setTo(spriteAnchorX, spriteAnchorY);
                        var paint = blackSplash.animations.add('paint');
                        blackSplash.animations.play('paint', 10, false);
                        
                        paint.onComplete.add(animationStopped, this);
                        function animationStopped(){
                            blackSplash.kill();
                        }

                                    }
    
        },
            
        
        update: function () {
            
            game.world.bringToTop(oLetter);
            
            game.world.bringToTop(blue);
            game.world.bringToTop(green);
            game.world.bringToTop(red);
            game.world.bringToTop(cyan);
            game.world.bringToTop(orange);
            game.world.bringToTop(pink);
            
            game.world.bringToTop(cloud1);
            game.world.bringToTop(cloud2);
            game.world.bringToTop(cloud3);
            
            game.world.bringToTop(octopus);
            game.world.bringToTop(olive);
            game.world.bringToTop(omlet);
            game.world.bringToTop(onion);
            game.world.bringToTop(awrange);
            game.world.bringToTop(ostrich);
            game.world.bringToTop(ostrichRightView);
            game.world.bringToTop(oven);
            game.world.bringToTop(owl);
            game.world.bringToTop(ox);
            
            game.world.bringToTop(camel);
            game.world.bringToTop(candle);
            game.world.bringToTop(car);
            game.world.bringToTop(cat);
            game.world.bringToTop(cheese);
            game.world.bringToTop(cherry);
            game.world.bringToTop(clock);
            game.world.bringToTop(cow);
            game.world.bringToTop(crab);
            game.world.bringToTop(crown);
            /*game.world.bringToTop(game.leftArrow);
            game.world.bringToTop(game.rightArrow);*/
            
            
            if(octopusFlag == 1){octopus.angle += 2;}
            if(oliveFlag == 1){olive.angle += 2;}
            if(omletFlag == 1){omlet.angle += 2;}
            if(onionFlag == 1){onion.angle += 2;}
            if(awrangeFlag == 1){awrange.angle += 2;}
            if(ovenFlag == 1){ostrich.angle += 2;}
            if(ostrichRightViewFlag == 1){ostrichRightView.angle += 2;}
            if(ostrichFlag == 1){oven.angle += 2;}
            if(owlFlag == 1){owl.angle += 2;}
            if(oxFlag == 1){ox.angle += 2;}
            
            if(camelFlag == 1){camel.angle += 2;}
            if(candleFlag == 1){candle.angle += 2;}
            if(carFlag == 1){car.angle += 2;}
            if(catFlag == 1){cat.angle += 2;}
            if(cheeseFlag == 1){cheese.angle += 2;}
            if(cherryFlag == 1){cherry.angle += 2;}
            if(clockFlag == 1){clock.angle += 2;}
            if(cowFlag == 1){cow.angle += 2;}
            if(crabFlag == 1){crab.angle += 2;}
            if(crownFlag == 1){crown.angle += 2;}
            
            if(redFlag == 1){red.angle += 2;}
            if(blueFlag == 1){blue.angle += 2;}
            if(greenFlag == 1){green.angle += 2;}
            if(cyanFlag == 1){cyan.angle += 2;}
            if(orangeFlag == 1){orange.angle += 2;}
            if(pinkFlag == 1){pink.angle += 2;}
            
            if(oObjectClicked == 10){
            
                askForLevelP = 1;
               /* game.leftArrow.kill();
                game.rightArrow.kill();*/
                game.pButton = game.add.sprite(1170, 730, 'pButton');             
                game.pButton.scale.setTo(1, 1); 
                game.pButton.anchor.setTo(spriteAnchorX, spriteAnchorY);
                
            }
            
        if(askForLevelP == 1){
            
            game.world.bringToTop(game.pButton);
            game.pButton.inputEnabled = true;
            game.pButton.events.onInputDown.add(onDownP, this);
            function onDownP() {
            
                //start next level
                
                this.setOGlobalVaribalesToZero();
                game.state.start('P');
                
            }
        }
           
        },
        
        resetOSpriteFlag: function(){
            
            octopusFlag = 0;oliveFlag = 0;omletFlag = 0;ovenFlag = 0;onionFlag = 0;
            awrangeFlag = 0;ostrichRightViewFlag = 0;ostrichFlag = 0;owlFlag = 0;oxFlag = 0;
            camelFlag = 0;candleFlag = 0;carFlag = 0;catFlag = 0;cheeseFlag = 0;cherryFlag = 0;
            clockFlag = 0;cowFlag = 0;crabFlag = 0;crownFlag = 0;

            octopus.angle = 0;olive.angle = 0;omlet.angle = 0;ostrich.angle = 0;onion.angle = 0;
            awrange.angle = 0;ostrichRightView.angle = 0;oven.angle = 0;owl.angle = 0;ox.angle = 0;
            camel.angle = 0;candle.angle = 0;car.angle = 0;cat.angle = 0;cheese.angle = 0;
            cherry.angle = 0;crown.angle = 0;clock.angle = 0;cow.angle = 0;crab.angle = 0;
           
        },
       
        setColorOFlagToZero: function(){
            
            bubbleSound.play(); blueFlag = 0;greenFlag = 0; redFlag = 0; cyanFlag = 0; pinkFlag = 0; orangeFlag = 0;
        },
        
        setOGlobalVaribalesToZero: function(){
            
            
            octopusFlag = 0;oliveFlag = 0;omletFlag = 0;ovenFlag = 0;onionFlag = 0;
            awrangeFlag = 0;ostrichRightViewFlag = 0;ostrichFlag = 0;owlFlag = 0;oxFlag = 0;
            camelFlag = 0;candleFlag = 0;carFlag = 0;catFlag = 0;cheeseFlag = 0;cherryFlag = 0;
            clockFlag = 0;cowFlag = 0;crabFlag = 0;crownFlag = 0;



            greenFlag = 0;blueFlag = 0;orangeFlag = 0;redFlag = 0;pinkFlag = 0;cyanFlag = 0;
        }
        
        
    };
