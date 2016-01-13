        
    var wObjectClicked = 0;
    var askForLevelX = 0;
    
    
    var wafersFlag = 0;
    var walletFlag = 0;
    var watchFlag = 0;            
    var windmillFlag = 0;
    var watermelonFlag = 0;
    var whaleFlag = 0;
    var wheelFlag = 0;
    var wingsFlag = 0;
    var wolfFlag = 0;
    var wormFlag = 0;
    
    
    var W = {

        preload: function () {

            //setting default path for assets to be used in game
            this.load.path = './assets/W/';
            
            
            
            this.load.image("transWafers", "transWafers.png");
            this.load.image("transWallet", "transWallet.png");
            this.load.image("transWatch", "transWatch.png");
            this.load.image("transWatermelon", "transWatermelon.png");
            this.load.image("transWhale", "transWhale.png");
            this.load.image("transWheel", "transWheel.png");
            this.load.image("transWindmill", "transWindmill.png");
            this.load.image("transWings", "transWings.png");
            this.load.image("transWolf", "transWolf.png");
            this.load.image("transWorm", "transWorm.png");
            
            this.load.image("wafers", "wafers.png");
            this.load.image("wallet", "wallet.png");
            this.load.image("watch", "watch.png");
            this.load.image("watermelon", "watermelon.png");
            this.load.image("whale", "whale.png");
            this.load.image("wheel", "wheel.png");
            this.load.image("windmill", "windmill.png");
            this.load.image("wings", "wings.png");
            this.load.image("wolf", "wolf.png");
            this.load.image("worm", "worm.png");
            
            
            //loading assets for the level  W
            
            //loading shades
            this.load.image("blue", "blue.png");
            this.load.image("cyan", "cyan.png");
            this.load.image("green", "green.png");
            this.load.image("orange", "orange.png");
            this.load.image("pink", "pink.png");
            this.load.image("red", "red.png");
    
            this.load.image("bg", "bg.png");
            this.load.image("wLetter", "wLetter.png");
            this.load.image("xButton", "xButton.png");
           /* this.load.image("leftArrow", "leftArrow.png");
            this.load.image("rightArrow", "rightArrow.png");*/
            
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
                
            
            
            
            //Main letter W
            wLetter = game.add.sprite(gameMinWidth, gameMinHeight, 'wLetter');
            wLetter.inputEnabled = true;
            wLetter.events.onInputDown.add(this.onDownwLetter, this);
            
            
            
            //Objects starting from W
                    
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
            
            
            
            
            wafers = game.add.sprite(objectsPositions[0].x, objectsPositions[0].y, 'wafers');
            wafers.anchor.setTo(spriteAnchorX, spriteAnchorY);
            wafers.scale.setTo(spriteScaleX, spriteScaleY);
            wafers.inputEnabled = true;
            wafers.events.onInputDown.add(onDownwafers, this);
            function onDownwafers() {this.resetWSpriteFlag(); wafersFlag = 1;wObjectClicked++;}

            
            
            
            wallet = game.add.sprite(objectsPositions[10].x, objectsPositions[10].y, 'wallet');
            wallet.anchor.setTo(spriteAnchorX, spriteAnchorY);
            wallet.scale.setTo(spriteScaleX, spriteScaleY);
            wallet.inputEnabled = true;
            wallet.events.onInputDown.add(onDownwallet, this);
            function onDownwallet() {this.resetWSpriteFlag(); walletFlag = 1;wObjectClicked++;}

            
            
            
            watch = game.add.sprite(objectsPositions[1].x, objectsPositions[1].y, 'watch');
            watch.anchor.setTo(spriteAnchorX, spriteAnchorY);
            watch.scale.setTo(spriteScaleX, spriteScaleY);
            watch.inputEnabled = true;
            watch.events.onInputDown.add(onDownwatch, this);
            function onDownwatch() {this.resetWSpriteFlag(); watchFlag = 1;wObjectClicked++;}
            
            
            
            
            watermelon = game.add.sprite(objectsPositions[11].x, objectsPositions[11].y, 'watermelon');
            watermelon.anchor.setTo(spriteAnchorX, spriteAnchorY);
            watermelon.scale.setTo(spriteScaleX, spriteScaleY);
            watermelon.inputEnabled = true;
            watermelon.events.onInputDown.add(onDownwatermelon, this);
            function onDownwatermelon() {this.resetWSpriteFlag(); windmillFlag = 1;wObjectClicked++;}
            
            
            
            whale = game.add.sprite(objectsPositions[2].x, objectsPositions[2].y, 'whale');
            whale.anchor.setTo(spriteAnchorX, spriteAnchorY);
            whale.scale.setTo(spriteScaleX, spriteScaleY);
            whale.inputEnabled = true;
            whale.events.onInputDown.add(onDownwhale, this);
            function onDownwhale() {this.resetWSpriteFlag(); watermelonFlag = 1;wObjectClicked++;}
            
            wheel = game.add.sprite(objectsPositions[12].x, objectsPositions[12].y, 'wheel');
            wheel.anchor.setTo(spriteAnchorX, spriteAnchorY);
            wheel.scale.setTo(spriteScaleX, spriteScaleY);
            wheel.inputEnabled = true;
            wheel.events.onInputDown.add(onDownwheel, this);
            function onDownwheel() {this.resetWSpriteFlag(); wingsFlag = 1;wObjectClicked++;}

            
            windmill = game.add.sprite(objectsPositions[3].x, objectsPositions[3].y, 'windmill');
            windmill.anchor.setTo(spriteAnchorX, spriteAnchorY);
            windmill.scale.setTo(spriteScaleX, spriteScaleY);
            windmill.inputEnabled = true;  
            windmill.events.onInputDown.add(onDownwindmill, this);
            function onDownwindmill() {this.resetWSpriteFlag(); wheelFlag = 1;wObjectClicked++;}
            
            
            wings = game.add.sprite(objectsPositions[13].x, objectsPositions[13].y, 'wings');
            wings.anchor.setTo(spriteAnchorX, spriteAnchorY);
            wings.scale.setTo(spriteScaleX, spriteScaleY);
            wings.inputEnabled = true;
            wings.events.onInputDown.add(onDownwings, this);
            function onDownwings() {this.resetWSpriteFlag(); whaleFlag = 1;wObjectClicked++;}
            
            
            wolf = game.add.sprite(objectsPositions[4].x, objectsPositions[4].y, 'wolf');
            wolf.anchor.setTo(spriteAnchorX, spriteAnchorY);
            wolf.scale.setTo(spriteScaleX, spriteScaleY);
            wolf.inputEnabled = true;
            wolf.events.onInputDown.add(onDownwolf, this);
            function onDownwolf() {this.resetWSpriteFlag(); wolfFlag = 1;wObjectClicked++;}
            
            
            worm = game.add.sprite(objectsPositions[14].x, objectsPositions[14].y, 'worm');
            worm.anchor.setTo(spriteAnchorX, spriteAnchorY);
            worm.scale.setTo(spriteScaleX, spriteScaleY);
            worm.inputEnabled = true;
            worm.events.onInputDown.add(onDownworm, this);
            function onDownworm() {this.resetWSpriteFlag(); wormFlag = 1;wObjectClicked++;}
            
            
            
            //Adding other sprites        
            
            camel = game.add.sprite(objectsPositions[5].x, objectsPositions[5].y, 'camel');
            camel.anchor.setTo(spriteAnchorX, spriteAnchorY);
            camel.scale.setTo(spriteScaleX, spriteScaleY);
            camel.inputEnabled = true;
            camel.events.onInputDown.add(onDownCamel, this);
            function onDownCamel() {this.resetWSpriteFlag(); camelFlag = 1;}
            
            
            
            
            candle = game.add.sprite(objectsPositions[15].x, objectsPositions[15].y, 'candle');
            candle.anchor.setTo(spriteAnchorX, spriteAnchorY);
            candle.scale.setTo(spriteScaleX, spriteScaleY);
            candle.inputEnabled = true;
            candle.events.onInputDown.add(onDownCandle, this);
            function onDownCandle() {this.resetWSpriteFlag(); candleFlag = 1; }
            
            
            car = game.add.sprite(objectsPositions[6].x, objectsPositions[6].y, 'car');
            car.anchor.setTo(spriteAnchorX, spriteAnchorY);
            car.scale.setTo(spriteScaleX, spriteScaleY);
            car.inputEnabled = true;
            car.events.onInputDown.add(onDownCar, this);
            function onDownCar() {this.resetWSpriteFlag(); carFlag = 1;}
            
            cat = game.add.sprite(objectsPositions[16].x, objectsPositions[16].y, 'cat');
            cat.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cat.scale.setTo(spriteScaleX, spriteScaleY);
            cat.inputEnabled = true;
            cat.events.onInputDown.add(onDownCat, this);
            function onDownCat() {this.resetWSpriteFlag(); catFlag = 1;}
            
            
            cheese = game.add.sprite(objectsPositions[7].x, objectsPositions[7].y, 'cheese');
            cheese.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cheese.scale.setTo(spriteScaleX, spriteScaleY);
            cheese.inputEnabled = true;
            cheese.events.onInputDown.add(onDownCheese, this);
            function onDownCheese() {this.resetWSpriteFlag(); cheeseFlag = 1;}
            
            
            cherry = game.add.sprite(objectsPositions[17].x, objectsPositions[17].y, 'cherry');
            cherry.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cherry.scale.setTo(spriteScaleX, spriteScaleY);
            cherry.inputEnabled = true;
            cherry.events.onInputDown.add(onDownCherry, this);
            function onDownCherry() {this.resetWSpriteFlag(); cherryFlag = 1;}
            
            
            clock = game.add.sprite(objectsPositions[8].x, objectsPositions[8].y, 'clock');
            clock.anchor.setTo(spriteAnchorX, spriteAnchorY);
            clock.scale.setTo(spriteScaleX, spriteScaleY);
            clock.inputEnabled = true;
            clock.events.onInputDown.add(onDownClock, this);
            function onDownClock() {this.resetWSpriteFlag(); clockFlag = 1;}
            
            
            
            cow = game.add.sprite(objectsPositions[18].x, objectsPositions[18].y, 'cow');
            cow.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cow.scale.setTo(spriteScaleX, spriteScaleY);
            cow.inputEnabled = true;
            cow.events.onInputDown.add(onDownCow, this);
            function onDownCow() {this.resetWSpriteFlag(); cowFlag = 1;}
            
            
            crab = game.add.sprite(objectsPositions[9].x, objectsPositions[9].y, 'crab');
            crab.anchor.setTo(spriteAnchorX, spriteAnchorY);
            crab.scale.setTo(spriteScaleX, spriteScaleY);
            crab.inputEnabled = true;
            crab.events.onInputDown.add(onDownCrab, this);
            function onDownCrab() {this.resetWSpriteFlag(); crabFlag = 1;}
            
            
            crown = game.add.sprite(objectsPositions[19].x, objectsPositions[19].y, 'crown');
            crown.anchor.setTo(spriteAnchorX, spriteAnchorY);
            crown.scale.setTo(spriteScaleX, spriteScaleY);
            crown.inputEnabled = true;
            crown.events.onInputDown.add(onDownCrown, this);
            function onDownCrown() {this.resetWSpriteFlag(); crownFlag = 1;}
            
           /* game.leftArrow = game.add.sprite(1070, 730, 'leftArrow');             
            game.leftArrow.scale.setTo(1, 1); 
            game.leftArrow.anchor.setTo(spriteAnchorX, spriteAnchorY);
            game.leftArrow.inputEnabled = true;
            game.leftArrow.events.onInputDown.add(onDownLeftArrow, this);
            function onDownLeftArrow() {this.setWGlobalVaribalesToZero();game.state.start('V');}
            
            
            game.rightArrow = game.add.sprite(1170, 730, 'rightArrow');             
            game.rightArrow.scale.setTo(1, 1); 
            game.rightArrow.anchor.setTo(spriteAnchorX, spriteAnchorY);
            game.rightArrow.inputEnabled = true;
            game.rightArrow.events.onInputDown.add(onDownRightArrow, this);
            function onDownRightArrow() {this.setWGlobalVaribalesToZero();game.state.start('X');}*/
            
            //Color shades
            blue = game.add.sprite(objectsPositions[20].x, objectsPositions[20].y, 'blue');
            blue.anchor.setTo(spriteAnchorX, spriteAnchorY);
            blue.scale.setTo(shadeScaleX, shadeScaleY);
            blue.inputEnabled = true;
            blue.tint = 0x456AC1; 
            blue.events.onInputDown.add(onDownBlue, this);
            function onDownBlue() {this.setColorWFlagToZero(); blueFlag = 1;}
           
            
            cyan = game.add.sprite(objectsPositions[21].x, objectsPositions[21].y, 'cyan');
            cyan.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cyan.scale.setTo(shadeScaleX, shadeScaleY);
            cyan.inputEnabled = true;
            cyan.tint = 0x45C1C1; 
            cyan.events.onInputDown.add(onDownCyan, this);
            function onDownCyan() {this.setColorWFlagToZero(); cyanFlag = 1;}
            
            
            
            green = game.add.sprite(objectsPositions[22].x, objectsPositions[22].y, 'green');
            green.anchor.setTo(spriteAnchorX, spriteAnchorY);
            green.scale.setTo(shadeScaleX, shadeScaleY);
            green.inputEnabled = true;
            green.tint = 0x51C735;
            green.events.onInputDown.add(onDownGreen, this);
            function onDownGreen() {this.setColorWFlagToZero(); greenFlag = 1;}
            
            
            orange = game.add.sprite(objectsPositions[23].x, objectsPositions[23].y, 'orange');
            orange.anchor.setTo(spriteAnchorX, spriteAnchorY);
            orange.scale.setTo(shadeScaleX, shadeScaleY);
            orange.inputEnabled = true;
            orange.tint = 0xF38932;
            orange.events.onInputDown.add(onDownOrange, this);
            function onDownOrange() {this.setColorWFlagToZero(); orangeFlag = 1;}
           
            
            pink = game.add.sprite(objectsPositions[24].x, objectsPositions[24].y, 'pink');
            pink.anchor.setTo(spriteAnchorX, spriteAnchorY);
            pink.scale.setTo(shadeScaleX, shadeScaleY);
            pink.inputEnabled = true;
            pink.tint = 0xCC3ACC;
            pink.events.onInputDown.add(onDownPink, this);
            function onDownPink() {this.setColorWFlagToZero(); pinkFlag = 1;}
            
            
            red = game.add.sprite(objectsPositions[25].x, objectsPositions[25].y, 'red');
            red.anchor.setTo(spriteAnchorX, spriteAnchorY);
            red.scale.setTo(shadeScaleX, shadeScaleY);
            red.inputEnabled = true;
            red.tint = 0xE32424;
            red.events.onInputDown.add(onDownRed, this);
            function onDownRed() {this.setColorWFlagToZero(); redFlag = 1;}
                
        },
        
        onDownwLetter: function() {
                
            //wafers
                    if(wafersFlag == 1 && greenFlag == 1 ){var greenwafers = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transWafers');greenwafers.tint =  0x51C735; greenwafers.scale.setTo(spriteScaleX, spriteScaleY); 
greenwafers.anchor.setTo(0.6, 0.6);stickSound.play();}                    
                    
                    if(wafersFlag == 1 && blueFlag == 1){var bluewafers = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transWafers'); bluewafers.tint =  0x456AC1; bluewafers.scale.setTo(spriteScaleX, spriteScaleY); bluewafers.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(wafersFlag == 1 && orangeFlag == 1){var orangewafers = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transWafers'); orangewafers.tint =  0xF38932; orangewafers.scale.setTo(spriteScaleX, spriteScaleY); orangewafers.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(wafersFlag == 1 && redFlag == 1){var redwafers = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transWafers'); redwafers.tint =  0xE32424; redwafers.scale.setTo(spriteScaleX, spriteScaleY); redwafers.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(wafersFlag == 1 && pinkFlag == 1){var pinkwafers = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transWafers'); pinkwafers.tint =  0xCC3ACC; pinkwafers.scale.setTo(spriteScaleX, spriteScaleY); pinkwafers.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(wafersFlag == 1 && cyanFlag == 1){var cyanwafers = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transWafers'); cyanwafers.tint =  0x45C1C1; cyanwafers.scale.setTo(spriteScaleX, spriteScaleY); cyanwafers.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //wallet    
                    if(walletFlag == 1 && greenFlag == 1 ){var greenwallet = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transWallet');greenwallet.tint =  0x51C735; greenwallet.scale.setTo(spriteScaleX, spriteScaleY); 
greenwallet.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(walletFlag == 1 && blueFlag == 1){var bluewallet = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transWallet'); bluewallet.tint =  0x456AC1; bluewallet.scale.setTo(spriteScaleX, spriteScaleY); bluewallet.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(walletFlag == 1 && orangeFlag == 1){var orangewallet = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transWallet'); orangewallet.tint =  0xF38932; orangewallet.scale.setTo(spriteScaleX, spriteScaleY); orangewallet.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(walletFlag == 1 && redFlag == 1){var redwallet = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transWallet'); redwallet.tint =  0xE32424; redwallet.scale.setTo(spriteScaleX, spriteScaleY); redwallet.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(walletFlag == 1 && pinkFlag == 1){var pinkwallet = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transWallet'); pinkwallet.tint =  0xCC3ACC; pinkwallet.scale.setTo(spriteScaleX, spriteScaleY); pinkwallet.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(walletFlag == 1 && cyanFlag == 1){var cyanwallet = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transWallet'); cyanwallet.tint =  0x45C1C1; cyanwallet.scale.setTo(spriteScaleX, spriteScaleY); cyanwallet.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //watch    
                    if(watchFlag == 1 && greenFlag == 1 ){var greenwatch = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transWatch');greenwatch.tint =  0x51C735; greenwatch.scale.setTo(spriteScaleX, spriteScaleY); 
greenwatch.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(watchFlag == 1 && blueFlag == 1){var bluewatch = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transWatch'); bluewatch.tint =  0x456AC1; bluewatch.scale.setTo(spriteScaleX, spriteScaleY); bluewatch.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(watchFlag == 1 && orangeFlag == 1){var orangewatch = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transWatch'); orangewatch.tint =  0xF38932; orangewatch.scale.setTo(spriteScaleX, spriteScaleY); orangewatch.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(watchFlag == 1 && redFlag == 1){var redwatch = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transWatch'); redwatch.tint =  0xE32424; redwatch.scale.setTo(spriteScaleX, spriteScaleY); redwatch.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(watchFlag == 1 && pinkFlag == 1){var pinkwatch = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transWatch'); pinkwatch.tint =  0xCC3ACC; pinkwatch.scale.setTo(spriteScaleX, spriteScaleY); pinkwatch.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(watchFlag == 1 && cyanFlag == 1){var cyanwatch = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transWatch'); cyanwatch.tint =  0x45C1C1; cyanwatch.scale.setTo(spriteScaleX, spriteScaleY); cyanwatch.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //watermelon
                    if(windmillFlag == 1 && greenFlag == 1 ){var greenwatermelon = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transWatermelon');greenwatermelon.tint =  0x51C735; greenwatermelon.scale.setTo(spriteScaleX, spriteScaleY); 
greenwatermelon.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(windmillFlag == 1 && blueFlag == 1){console.log("bluewatermelon plotted");var bluewatermelon = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transWatermelon'); bluewatermelon.tint =  0x456AC1; bluewatermelon.scale.setTo(spriteScaleX, spriteScaleY); bluewatermelon.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(windmillFlag == 1 && orangeFlag == 1){var orangewatermelon = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transWatermelon'); orangewatermelon.tint =  0xF38932; orangewatermelon.scale.setTo(spriteScaleX, spriteScaleY); orangewatermelon.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(windmillFlag == 1 && redFlag == 1){var redwatermelon = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transWatermelon'); redwatermelon.tint =  0xE32424; redwatermelon.scale.setTo(spriteScaleX, spriteScaleY); redwatermelon.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(windmillFlag == 1 && pinkFlag == 1){var pinkwatermelon = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transWatermelon'); pinkwatermelon.tint =  0xCC3ACC; pinkwatermelon.scale.setTo(spriteScaleX, spriteScaleY); pinkwatermelon.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(windmillFlag == 1 && cyanFlag == 1){var cyanwatermelon = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transWatermelon'); cyanwatermelon.tint =  0x45C1C1; cyanwatermelon.scale.setTo(spriteScaleX, spriteScaleY); cyanwatermelon.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //whale    
                    if(watermelonFlag == 1 && greenFlag == 1 ){var greenwhale = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transWhale');greenwhale.tint =  0x51C735; greenwhale.scale.setTo(spriteScaleX, spriteScaleY); 
greenwhale.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(watermelonFlag == 1 && blueFlag == 1){console.log("bluewhale plotted");var bluewhale = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transWhale'); bluewhale.tint =  0x456AC1; bluewhale.scale.setTo(spriteScaleX, spriteScaleY); bluewhale.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(watermelonFlag == 1 && orangeFlag == 1){var orangewhale = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transWhale'); orangewhale.tint =  0xF38932; orangewhale.scale.setTo(spriteScaleX, spriteScaleY); orangewhale.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(watermelonFlag == 1 && redFlag == 1){var redwhale = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transWhale'); redwhale.tint =  0xE32424; redwhale.scale.setTo(spriteScaleX, spriteScaleY); redwhale.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(watermelonFlag == 1 && pinkFlag == 1){var pinkwhale = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transWhale'); pinkwhale.tint =  0xCC3ACC; pinkwhale.scale.setTo(spriteScaleX, spriteScaleY); pinkwhale.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(watermelonFlag == 1 && cyanFlag == 1){var cyanwhale = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transWhale'); cyanwhale.tint =  0x45C1C1; cyanwhale.scale.setTo(spriteScaleX, spriteScaleY); cyanwhale.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //wheel   
                    if(wingsFlag == 1 && greenFlag == 1 ){var greenwheel = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transWheel');greenwheel.tint =  0x51C735; greenwheel.scale.setTo(spriteScaleX, spriteScaleY); 
greenwheel.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(wingsFlag == 1 && blueFlag == 1){console.log("bluewheel plotted");var bluewheel = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transWheel'); bluewheel.tint =  0x456AC1; bluewheel.scale.setTo(spriteScaleX, spriteScaleY); bluewheel.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(wingsFlag == 1 && orangeFlag == 1){var orangewheel = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transWheel'); orangewheel.tint =  0xF38932; orangewheel.scale.setTo(spriteScaleX, spriteScaleY); orangewheel.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(wingsFlag == 1 && redFlag == 1){var redwheel = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transWheel'); redwheel.tint =  0xE32424; redwheel.scale.setTo(spriteScaleX, spriteScaleY); redwheel.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(wingsFlag == 1 && pinkFlag == 1){var pinkwheel = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transWheel'); pinkwheel.tint =  0xCC3ACC; pinkwheel.scale.setTo(spriteScaleX, spriteScaleY); pinkwheel.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(wingsFlag == 1 && cyanFlag == 1){var cyanwheel = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transWheel'); cyanwheel.tint =  0x45C1C1; cyanwheel.scale.setTo(spriteScaleX, spriteScaleY); cyanwheel.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //windmill    
                    if(wheelFlag == 1 && greenFlag == 1 ){var greenwindmill = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transWindmill');greenwindmill.tint =  0x51C735; greenwindmill.scale.setTo(spriteScaleX, spriteScaleY); 
greenwindmill.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(wheelFlag == 1 && blueFlag == 1){console.log("bluewindmill plotted");var bluewindmill = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transWindmill'); bluewindmill.tint =  0x456AC1; bluewindmill.scale.setTo(spriteScaleX, spriteScaleY); bluewindmill.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(wheelFlag == 1 && orangeFlag == 1){var orangewindmill = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transWindmill'); orangewindmill.tint =  0xF38932; orangewindmill.scale.setTo(spriteScaleX, spriteScaleY); orangewindmill.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(wheelFlag == 1 && redFlag == 1){var redwindmill = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transWindmill'); redwindmill.tint =  0xE32424; redwindmill.scale.setTo(spriteScaleX, spriteScaleY); redwindmill.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(wheelFlag == 1 && pinkFlag == 1){var pinkwindmill = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transWindmill'); pinkwindmill.tint =  0xCC3ACC; pinkwindmill.scale.setTo(spriteScaleX, spriteScaleY); pinkwindmill.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(wheelFlag == 1 && cyanFlag == 1){var cyanwindmill = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transWindmill'); cyanwindmill.tint =  0x45C1C1; cyanwindmill.scale.setTo(spriteScaleX, spriteScaleY); cyanwindmill.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //wings    
                    if(whaleFlag == 1 && greenFlag == 1 ){var greenwings = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transWings');greenwings.tint =  0x51C735; greenwings.scale.setTo(spriteScaleX, spriteScaleY); 
greenwings.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(whaleFlag == 1 && blueFlag == 1){console.log("bluewings plotted");var bluewings = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transWings'); bluewings.tint =  0x456AC1; bluewings.scale.setTo(spriteScaleX, spriteScaleY); bluewings.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(whaleFlag == 1 && orangeFlag == 1){var orangewings = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transWings'); orangewings.tint =  0xF38932; orangewings.scale.setTo(spriteScaleX, spriteScaleY); orangewings.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(whaleFlag == 1 && redFlag == 1){var redwings = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transWings'); redwings.tint =  0xE32424; redwings.scale.setTo(spriteScaleX, spriteScaleY); redwings.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(whaleFlag == 1 && pinkFlag == 1){var pinkwings = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transWings'); pinkwings.tint =  0xCC3ACC; pinkwings.scale.setTo(spriteScaleX, spriteScaleY); pinkwings.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(whaleFlag == 1 && cyanFlag == 1){var cyanwings = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transWings'); cyanwings.tint =  0x45C1C1; cyanwings.scale.setTo(spriteScaleX, spriteScaleY); cyanwings.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //wolf    
                    if(wolfFlag == 1 && greenFlag == 1 ){var greenwolf = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transWolf');greenwolf.tint =  0x51C735; greenwolf.scale.setTo(spriteScaleX, spriteScaleY); 
greenwolf.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(wolfFlag == 1 && blueFlag == 1){console.log("bluewolf plotted");var bluewolf = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transWolf'); bluewolf.tint =  0x456AC1; bluewolf.scale.setTo(spriteScaleX, spriteScaleY); bluewolf.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(wolfFlag == 1 && orangeFlag == 1){var orangewolf = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transWolf'); orangewolf.tint =  0xF38932; orangewolf.scale.setTo(spriteScaleX, spriteScaleY); orangewolf.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(wolfFlag == 1 && redFlag == 1){var redwolf = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transWolf'); redwolf.tint =  0xE32424; redwolf.scale.setTo(spriteScaleX, spriteScaleY); redwolf.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(wolfFlag == 1 && pinkFlag == 1){var pinkwolf = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transWolf'); pinkwolf.tint =  0xCC3ACC; pinkwolf.scale.setTo(spriteScaleX, spriteScaleY); pinkwolf.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(wolfFlag == 1 && cyanFlag == 1){var cyanwolf = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transWolf'); cyanwolf.tint =  0x45C1C1; cyanwolf.scale.setTo(spriteScaleX, spriteScaleY); cyanwolf.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //worm 
                    if(wormFlag == 1 && greenFlag == 1 ){var greenworm = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transWorm');greenworm.tint =  0x51C735; greenworm.scale.setTo(spriteScaleX, spriteScaleY); 
greenworm.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(wormFlag == 1 && blueFlag == 1){console.log("blueworm plotted");var blueworm = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transWorm'); blueworm.tint =  0x456AC1; blueworm.scale.setTo(spriteScaleX, spriteScaleY); blueworm.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(wormFlag == 1 && orangeFlag == 1){var orangeworm = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transWorm'); orangeworm.tint =  0xF38932; orangeworm.scale.setTo(spriteScaleX, spriteScaleY); orangeworm.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(wormFlag == 1 && redFlag == 1){var redworm = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transWorm'); redworm.tint =  0xE32424; redworm.scale.setTo(spriteScaleX, spriteScaleY); redworm.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(wormFlag == 1 && pinkFlag == 1){var pinkworm = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transWorm'); pinkworm.tint =  0xCC3ACC; pinkworm.scale.setTo(spriteScaleX, spriteScaleY); pinkworm.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(wormFlag == 1 && cyanFlag == 1){var cyanworm = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transWorm'); cyanworm.tint =  0x45C1C1; cyanworm.scale.setTo(spriteScaleX, spriteScaleY); cyanworm.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
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
            
            game.world.bringToTop(wLetter);
            
            game.world.bringToTop(blue);
            game.world.bringToTop(green);
            game.world.bringToTop(red);
            game.world.bringToTop(cyan);
            game.world.bringToTop(orange);
            game.world.bringToTop(pink);
            
            game.world.bringToTop(cloud1);
            game.world.bringToTop(cloud2);
            game.world.bringToTop(cloud3);
            
            game.world.bringToTop(wafers);
            game.world.bringToTop(wallet);
            game.world.bringToTop(watch);
            game.world.bringToTop(watermelon);
            game.world.bringToTop(whale);
            game.world.bringToTop(wheel);
            game.world.bringToTop(windmill);
            game.world.bringToTop(wings);
            game.world.bringToTop(wolf);
            game.world.bringToTop(worm);
            
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
           /* game.world.bringToTop(game.leftArrow);
            game.world.bringToTop(game.rightArrow);*/
            
            
            
            if(wafersFlag == 1){wafers.angle += 2;}
            if(walletFlag == 1){wallet.angle += 2;}
            if(watchFlag == 1){watch.angle += 2;}
            if(windmillFlag == 1){watermelon.angle += 2;}
            if(watermelonFlag == 1){whale.angle += 2;}
            if(wingsFlag == 1){wheel.angle += 2;}
            if(wheelFlag == 1){windmill.angle += 2;}
            if(whaleFlag == 1){wings.angle += 2;}
            if(wolfFlag == 1){wolf.angle += 2;}
            if(wormFlag == 1){worm.angle += 2;}
            
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
            
            if(wObjectClicked == 10){
            
                askForLevelX = 1;
                /*game.leftArrow.kill();
                game.rightArrow.kill();*/
                game.xButton = game.add.sprite(1170, 730, 'xButton');             
                game.xButton.scale.setTo(1, 1); 
                game.xButton.anchor.setTo(spriteAnchorX, spriteAnchorY);
                
            }
            
        if(askForLevelX == 1){
            
            game.world.bringToTop(game.xButton);
            game.xButton.inputEnabled = true;
            game.xButton.events.onInputDown.add(onDownX, this);
            function onDownX() {
            
                //start next level
                
                this.setWGlobalVaribalesToZero();
                game.state.start('X');
                
            }
        }
           
        },
        
        resetWSpriteFlag: function(){
            
            wafersFlag = 0;walletFlag = 0;watchFlag = 0;wingsFlag = 0;windmillFlag = 0;
            watermelonFlag = 0;wheelFlag = 0;whaleFlag = 0;wolfFlag = 0;wormFlag = 0;
            camelFlag = 0;candleFlag = 0;carFlag = 0;catFlag = 0;cheeseFlag = 0;cherryFlag = 0;
            clockFlag = 0;cowFlag = 0;crabFlag = 0;crownFlag = 0;

            wafers.angle = 0;wallet.angle = 0;watch.angle = 0;wheel.angle = 0;watermelon.angle = 0;
            whale.angle = 0;windmill.angle = 0;wings.angle = 0;wolf.angle = 0;worm.angle = 0;
            camel.angle = 0;candle.angle = 0;car.angle = 0;cat.angle = 0;cheese.angle = 0;
            cherry.angle = 0;crown.angle = 0;clock.angle = 0;cow.angle = 0;crab.angle = 0;
           
        },
       
        setColorWFlagToZero: function(){
            
            bubbleSound.play(); blueFlag = 0;greenFlag = 0; redFlag = 0; cyanFlag = 0; pinkFlag = 0; orangeFlag = 0;
        },
        
        setWGlobalVaribalesToZero: function(){
            
            
            wafersFlag = 0;walletFlag = 0;watchFlag = 0;wingsFlag = 0;windmillFlag = 0;
            watermelonFlag = 0;wheelFlag = 0;whaleFlag = 0;wolfFlag = 0;wormFlag = 0;
            camelFlag = 0;candleFlag = 0;carFlag = 0;catFlag = 0;cheeseFlag = 0;cherryFlag = 0;
            clockFlag = 0;cowFlag = 0;crabFlag = 0;crownFlag = 0;



            greenFlag = 0;blueFlag = 0;orangeFlag = 0;redFlag = 0;pinkFlag = 0;cyanFlag = 0;
        }
        
        
    };
