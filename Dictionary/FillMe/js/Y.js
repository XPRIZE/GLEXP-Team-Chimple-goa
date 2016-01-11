        
    var yObjectClicked = 0;
    var askForLevelZ = 0;
    
    
    var yackFlag = 0;
    var yackRightFlag = 0;
    var yarnFlag = 0;            
    var yarnDoubleFlag = 0;
    var yatchFlag = 0;
    var yatchRightFlag = 0;
    var yellowPearsDoubleFlag = 0;
    var yellowPearsSingleFlag = 0;
    var yogurtFlag = 0;
    var yogurtFrontFlag = 0;
    
    
    var Y = {

        preload: function () {

            //setting default path for assets to be used in game
            this.load.path = './assets/Y/';
            
            
            
            this.load.image("transYack", "transYack.png");
            this.load.image("transYackRight", "transYackRight.png");
            this.load.image("transYarn", "transYarn.png");
            this.load.image("transYarnDouble", "transYarnDouble.png");
            this.load.image("transYatch", "transYatch.png");
            this.load.image("transYatchRight", "transYatchRight.png");
            this.load.image("transYellowPearsDouble", "transYellowPearsDouble.png");
            this.load.image("transYellowPearsSingle", "transYellowPearsSingle.png");
            this.load.image("transYogurt", "transYogurt.png");
            this.load.image("transYogurtFront", "transYogurtFront.png");
            
            this.load.image("yack", "yack.png");
            this.load.image("yackRight", "yackRight.png");
            this.load.image("yarn", "yarn.png");
            this.load.image("yarnDouble", "yarnDouble.png");
            this.load.image("yatch", "yatch.png");
            this.load.image("yatchRight", "yatchRight.png");
            this.load.image("yellowPearsDouble", "yellowPearsDouble.png");
            this.load.image("yogurt", "yogurt.png");
            this.load.image("yellowPearsSingle", "yellowPearsSingle.png");
            this.load.image("yogurtFront", "yogurtFront.png");
            
            
            //loading assets for the level  Y
            
            //loading shades
            this.load.image("blue", "blue.png");
            this.load.image("cyan", "cyan.png");
            this.load.image("green", "green.png");
            this.load.image("orange", "orange.png");
            this.load.image("pink", "pink.png");
            this.load.image("red", "red.png");
    
            this.load.image("bg", "bg.png");
            this.load.image("yLetter", "yLetter.png");
            this.load.image("zButton", "zButton.png");
            
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
                
            
            
            
            //Main letter Y
            yLetter = game.add.sprite(gameMinWidth, gameMinHeight, 'yLetter');
            yLetter.inputEnabled = true;
            yLetter.events.onInputDown.add(this.onDownyLetter, this);
            
            
            
            //Objects starting from Y
                    
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
            
            
            
            
            yack = game.add.sprite(objectsPositions[0].x, objectsPositions[0].y, 'yack');
            yack.anchor.setTo(spriteAnchorX, spriteAnchorY);
            yack.scale.setTo(spriteScaleX, spriteScaleY);
            yack.inputEnabled = true;
            yack.events.onInputDown.add(onDownyack, this);
            function onDownyack() {this.resetYSpriteFlag(); yackFlag = 1;yObjectClicked++;}

            
            
            
            yackRight = game.add.sprite(objectsPositions[10].x, objectsPositions[10].y, 'yackRight');
            yackRight.anchor.setTo(spriteAnchorX, spriteAnchorY);
            yackRight.scale.setTo(spriteScaleX, spriteScaleY);
            yackRight.inputEnabled = true;
            yackRight.events.onInputDown.add(onDownyackRight, this);
            function onDownyackRight() {this.resetYSpriteFlag(); yackRightFlag = 1;yObjectClicked++;}

            
            
            
            yarn = game.add.sprite(objectsPositions[1].x, objectsPositions[1].y, 'yarn');
            yarn.anchor.setTo(spriteAnchorX, spriteAnchorY);
            yarn.scale.setTo(spriteScaleX, spriteScaleY);
            yarn.inputEnabled = true;
            yarn.events.onInputDown.add(onDownyarn, this);
            function onDownyarn() {this.resetYSpriteFlag(); yarnFlag = 1;yObjectClicked++;}
            
            
            
            
            yarnDouble = game.add.sprite(objectsPositions[11].x, objectsPositions[11].y, 'yarnDouble');
            yarnDouble.anchor.setTo(spriteAnchorX, spriteAnchorY);
            yarnDouble.scale.setTo(spriteScaleX, spriteScaleY);
            yarnDouble.inputEnabled = true;
            yarnDouble.events.onInputDown.add(onDownyarnDouble, this);
            function onDownyarnDouble() {this.resetYSpriteFlag(); yarnDoubleFlag = 1;yObjectClicked++;}
            
            
            
            yatch = game.add.sprite(objectsPositions[2].x, objectsPositions[2].y, 'yatch');
            yatch.anchor.setTo(spriteAnchorX, spriteAnchorY);
            yatch.scale.setTo(spriteScaleX, spriteScaleY);
            yatch.inputEnabled = true;
            yatch.events.onInputDown.add(onDownyatch, this);
            function onDownyatch() {this.resetYSpriteFlag(); yatchFlag = 1;yObjectClicked++;}
            
            yatchRight = game.add.sprite(objectsPositions[12].x, objectsPositions[12].y, 'yatchRight');
            yatchRight.anchor.setTo(spriteAnchorX, spriteAnchorY);
            yatchRight.scale.setTo(spriteScaleX, spriteScaleY);
            yatchRight.inputEnabled = true;
            yatchRight.events.onInputDown.add(onDownyatchRight, this);
            function onDownyatchRight() {this.resetYSpriteFlag(); yellowPearsSingleFlag = 1;yObjectClicked++;}

            
            yellowPearsDouble = game.add.sprite(objectsPositions[3].x, objectsPositions[3].y, 'yellowPearsDouble');
            yellowPearsDouble.anchor.setTo(spriteAnchorX, spriteAnchorY);
            yellowPearsDouble.scale.setTo(spriteScaleX, spriteScaleY);
            yellowPearsDouble.inputEnabled = true;  
            yellowPearsDouble.events.onInputDown.add(onDownyellowPearsDouble, this);
            function onDownyellowPearsDouble() {this.resetYSpriteFlag(); yellowPearsDoubleFlag = 1;yObjectClicked++;}
            
            
            yogurt = game.add.sprite(objectsPositions[13].x, objectsPositions[13].y, 'yogurt');
            yogurt.anchor.setTo(spriteAnchorX, spriteAnchorY);
            yogurt.scale.setTo(spriteScaleX, spriteScaleY);
            yogurt.inputEnabled = true;
            yogurt.events.onInputDown.add(onDownyogurt, this);
            function onDownyogurt() {this.resetYSpriteFlag(); yatchRightFlag = 1;yObjectClicked++;}
            
            
            yellowPearsSingle = game.add.sprite(objectsPositions[4].x, objectsPositions[4].y, 'yellowPearsSingle');
            yellowPearsSingle.anchor.setTo(spriteAnchorX, spriteAnchorY);
            yellowPearsSingle.scale.setTo(spriteScaleX, spriteScaleY);
            yellowPearsSingle.inputEnabled = true;
            yellowPearsSingle.events.onInputDown.add(onDownyellowPearsSingle, this);
            function onDownyellowPearsSingle() {this.resetYSpriteFlag(); yogurtFlag = 1;yObjectClicked++;}
            
            
            yogurtFront = game.add.sprite(objectsPositions[14].x, objectsPositions[14].y, 'yogurtFront');
            yogurtFront.anchor.setTo(spriteAnchorX, spriteAnchorY);
            yogurtFront.scale.setTo(spriteScaleX, spriteScaleY);
            yogurtFront.inputEnabled = true;
            yogurtFront.events.onInputDown.add(onDownyogurtFront, this);
            function onDownyogurtFront() {this.resetYSpriteFlag(); yogurtFrontFlag = 1;yObjectClicked++;}
            
            
            
            //Adding other sprites        
            
            camel = game.add.sprite(objectsPositions[5].x, objectsPositions[5].y, 'camel');
            camel.anchor.setTo(spriteAnchorX, spriteAnchorY);
            camel.scale.setTo(spriteScaleX, spriteScaleY);
            camel.inputEnabled = true;
            camel.events.onInputDown.add(onDownCamel, this);
            function onDownCamel() {this.resetYSpriteFlag(); camelFlag = 1;}
            
            
            
            
            candle = game.add.sprite(objectsPositions[15].x, objectsPositions[15].y, 'candle');
            candle.anchor.setTo(spriteAnchorX, spriteAnchorY);
            candle.scale.setTo(spriteScaleX, spriteScaleY);
            candle.inputEnabled = true;
            candle.events.onInputDown.add(onDownCandle, this);
            function onDownCandle() {this.resetYSpriteFlag(); candleFlag = 1; }
            
            
            car = game.add.sprite(objectsPositions[6].x, objectsPositions[6].y, 'car');
            car.anchor.setTo(spriteAnchorX, spriteAnchorY);
            car.scale.setTo(spriteScaleX, spriteScaleY);
            car.inputEnabled = true;
            car.events.onInputDown.add(onDownCar, this);
            function onDownCar() {this.resetYSpriteFlag(); carFlag = 1;}
            
            cat = game.add.sprite(objectsPositions[16].x, objectsPositions[16].y, 'cat');
            cat.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cat.scale.setTo(spriteScaleX, spriteScaleY);
            cat.inputEnabled = true;
            cat.events.onInputDown.add(onDownCat, this);
            function onDownCat() {this.resetYSpriteFlag(); catFlag = 1;}
            
            
            cheese = game.add.sprite(objectsPositions[7].x, objectsPositions[7].y, 'cheese');
            cheese.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cheese.scale.setTo(spriteScaleX, spriteScaleY);
            cheese.inputEnabled = true;
            cheese.events.onInputDown.add(onDownCheese, this);
            function onDownCheese() {this.resetYSpriteFlag(); cheeseFlag = 1;}
            
            
            cherry = game.add.sprite(objectsPositions[17].x, objectsPositions[17].y, 'cherry');
            cherry.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cherry.scale.setTo(spriteScaleX, spriteScaleY);
            cherry.inputEnabled = true;
            cherry.events.onInputDown.add(onDownCherry, this);
            function onDownCherry() {this.resetYSpriteFlag(); cherryFlag = 1;}
            
            
            clock = game.add.sprite(objectsPositions[8].x, objectsPositions[8].y, 'clock');
            clock.anchor.setTo(spriteAnchorX, spriteAnchorY);
            clock.scale.setTo(spriteScaleX, spriteScaleY);
            clock.inputEnabled = true;
            clock.events.onInputDown.add(onDownClock, this);
            function onDownClock() {this.resetYSpriteFlag(); clockFlag = 1;}
            
            
            
            cow = game.add.sprite(objectsPositions[18].x, objectsPositions[18].y, 'cow');
            cow.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cow.scale.setTo(spriteScaleX, spriteScaleY);
            cow.inputEnabled = true;
            cow.events.onInputDown.add(onDownCow, this);
            function onDownCow() {this.resetYSpriteFlag(); cowFlag = 1;}
            
            
            crab = game.add.sprite(objectsPositions[9].x, objectsPositions[9].y, 'crab');
            crab.anchor.setTo(spriteAnchorX, spriteAnchorY);
            crab.scale.setTo(spriteScaleX, spriteScaleY);
            crab.inputEnabled = true;
            crab.events.onInputDown.add(onDownCrab, this);
            function onDownCrab() {this.resetYSpriteFlag(); crabFlag = 1;}
            
            
            crown = game.add.sprite(objectsPositions[19].x, objectsPositions[19].y, 'crown');
            crown.anchor.setTo(spriteAnchorX, spriteAnchorY);
            crown.scale.setTo(spriteScaleX, spriteScaleY);
            crown.inputEnabled = true;
            crown.events.onInputDown.add(onDownCrown, this);
            function onDownCrown() {this.resetYSpriteFlag(); crownFlag = 1;}
            
            
            
            //Color shades
            blue = game.add.sprite(objectsPositions[20].x, objectsPositions[20].y, 'blue');
            blue.anchor.setTo(spriteAnchorX, spriteAnchorY);
            blue.scale.setTo(shadeScaleX, shadeScaleY);
            blue.inputEnabled = true;
            blue.tint = 0x456AC1; 
            blue.events.onInputDown.add(onDownBlue, this);
            function onDownBlue() {this.setColorYFlagToZero(); blueFlag = 1;}
           
            
            cyan = game.add.sprite(objectsPositions[21].x, objectsPositions[21].y, 'cyan');
            cyan.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cyan.scale.setTo(shadeScaleX, shadeScaleY);
            cyan.inputEnabled = true;
            cyan.tint = 0x45C1C1; 
            cyan.events.onInputDown.add(onDownCyan, this);
            function onDownCyan() {this.setColorYFlagToZero(); cyanFlag = 1;}
            
            
            
            green = game.add.sprite(objectsPositions[22].x, objectsPositions[22].y, 'green');
            green.anchor.setTo(spriteAnchorX, spriteAnchorY);
            green.scale.setTo(shadeScaleX, shadeScaleY);
            green.inputEnabled = true;
            green.tint = 0x51C735;
            green.events.onInputDown.add(onDownGreen, this);
            function onDownGreen() {this.setColorYFlagToZero(); greenFlag = 1;}
            
            
            orange = game.add.sprite(objectsPositions[23].x, objectsPositions[23].y, 'orange');
            orange.anchor.setTo(spriteAnchorX, spriteAnchorY);
            orange.scale.setTo(shadeScaleX, shadeScaleY);
            orange.inputEnabled = true;
            orange.tint = 0xF38932;
            orange.events.onInputDown.add(onDownOrange, this);
            function onDownOrange() {this.setColorYFlagToZero(); orangeFlag = 1;}
           
            
            pink = game.add.sprite(objectsPositions[24].x, objectsPositions[24].y, 'pink');
            pink.anchor.setTo(spriteAnchorX, spriteAnchorY);
            pink.scale.setTo(shadeScaleX, shadeScaleY);
            pink.inputEnabled = true;
            pink.tint = 0xCC3ACC;
            pink.events.onInputDown.add(onDownPink, this);
            function onDownPink() {this.setColorYFlagToZero(); pinkFlag = 1;}
            
            
            red = game.add.sprite(objectsPositions[25].x, objectsPositions[25].y, 'red');
            red.anchor.setTo(spriteAnchorX, spriteAnchorY);
            red.scale.setTo(shadeScaleX, shadeScaleY);
            red.inputEnabled = true;
            red.tint = 0xE32424;
            red.events.onInputDown.add(onDownRed, this);
            function onDownRed() {this.setColorYFlagToZero(); redFlag = 1;}
                
        },
        
        onDownyLetter: function() {
                
            //yack
                    if(yackFlag == 1 && greenFlag == 1 ){var greenyack = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transYack');greenyack.tint =  0x51C735; greenyack.scale.setTo(spriteScaleX, spriteScaleY); 
greenyack.anchor.setTo(0.6, 0.6);stickSound.play();}                    
                    
                    if(yackFlag == 1 && blueFlag == 1){var blueyack = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transYack'); blueyack.tint =  0x456AC1; blueyack.scale.setTo(spriteScaleX, spriteScaleY); blueyack.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(yackFlag == 1 && orangeFlag == 1){var orangeyack = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transYack'); orangeyack.tint =  0xF38932; orangeyack.scale.setTo(spriteScaleX, spriteScaleY); orangeyack.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(yackFlag == 1 && redFlag == 1){var redyack = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transYack'); redyack.tint =  0xE32424; redyack.scale.setTo(spriteScaleX, spriteScaleY); redyack.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(yackFlag == 1 && pinkFlag == 1){var pinkyack = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transYack'); pinkyack.tint =  0xCC3ACC; pinkyack.scale.setTo(spriteScaleX, spriteScaleY); pinkyack.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(yackFlag == 1 && cyanFlag == 1){var cyanyack = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transYack'); cyanyack.tint =  0x45C1C1; cyanyack.scale.setTo(spriteScaleX, spriteScaleY); cyanyack.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //yackRight    
                    if(yackRightFlag == 1 && greenFlag == 1 ){var greenyackRight = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transYackRight');greenyackRight.tint =  0x51C735; greenyackRight.scale.setTo(spriteScaleX, spriteScaleY); 
greenyackRight.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(yackRightFlag == 1 && blueFlag == 1){var blueyackRight = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transYackRight'); blueyackRight.tint =  0x456AC1; blueyackRight.scale.setTo(spriteScaleX, spriteScaleY); blueyackRight.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(yackRightFlag == 1 && orangeFlag == 1){var orangeyackRight = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transYackRight'); orangeyackRight.tint =  0xF38932; orangeyackRight.scale.setTo(spriteScaleX, spriteScaleY); orangeyackRight.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(yackRightFlag == 1 && redFlag == 1){var redyackRight = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transYackRight'); redyackRight.tint =  0xE32424; redyackRight.scale.setTo(spriteScaleX, spriteScaleY); redyackRight.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(yackRightFlag == 1 && pinkFlag == 1){var pinkyackRight = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transYackRight'); pinkyackRight.tint =  0xCC3ACC; pinkyackRight.scale.setTo(spriteScaleX, spriteScaleY); pinkyackRight.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(yackRightFlag == 1 && cyanFlag == 1){var cyanyackRight = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transYackRight'); cyanyackRight.tint =  0x45C1C1; cyanyackRight.scale.setTo(spriteScaleX, spriteScaleY); cyanyackRight.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //yarn    
                    if(yarnFlag == 1 && greenFlag == 1 ){var greenyarn = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transYarn');greenyarn.tint =  0x51C735; greenyarn.scale.setTo(spriteScaleX, spriteScaleY); 
greenyarn.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(yarnFlag == 1 && blueFlag == 1){var blueyarn = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transYarn'); blueyarn.tint =  0x456AC1; blueyarn.scale.setTo(spriteScaleX, spriteScaleY); blueyarn.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(yarnFlag == 1 && orangeFlag == 1){var orangeyarn = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transYarn'); orangeyarn.tint =  0xF38932; orangeyarn.scale.setTo(spriteScaleX, spriteScaleY); orangeyarn.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(yarnFlag == 1 && redFlag == 1){var redyarn = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transYarn'); redyarn.tint =  0xE32424; redyarn.scale.setTo(spriteScaleX, spriteScaleY); redyarn.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(yarnFlag == 1 && pinkFlag == 1){var pinkyarn = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transYarn'); pinkyarn.tint =  0xCC3ACC; pinkyarn.scale.setTo(spriteScaleX, spriteScaleY); pinkyarn.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(yarnFlag == 1 && cyanFlag == 1){var cyanyarn = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transYarn'); cyanyarn.tint =  0x45C1C1; cyanyarn.scale.setTo(spriteScaleX, spriteScaleY); cyanyarn.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //yarnDouble
                    if(yarnDoubleFlag == 1 && greenFlag == 1 ){var greenyarnDouble = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transYarnDouble');greenyarnDouble.tint =  0x51C735; greenyarnDouble.scale.setTo(spriteScaleX, spriteScaleY); 
greenyarnDouble.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(yarnDoubleFlag == 1 && blueFlag == 1){console.log("blueyarnDouble plotted");var blueyarnDouble = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transYarnDouble'); blueyarnDouble.tint =  0x456AC1; blueyarnDouble.scale.setTo(spriteScaleX, spriteScaleY); blueyarnDouble.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(yarnDoubleFlag == 1 && orangeFlag == 1){var orangeyarnDouble = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transYarnDouble'); orangeyarnDouble.tint =  0xF38932; orangeyarnDouble.scale.setTo(spriteScaleX, spriteScaleY); orangeyarnDouble.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(yarnDoubleFlag == 1 && redFlag == 1){var redyarnDouble = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transYarnDouble'); redyarnDouble.tint =  0xE32424; redyarnDouble.scale.setTo(spriteScaleX, spriteScaleY); redyarnDouble.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(yarnDoubleFlag == 1 && pinkFlag == 1){var pinkyarnDouble = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transYarnDouble'); pinkyarnDouble.tint =  0xCC3ACC; pinkyarnDouble.scale.setTo(spriteScaleX, spriteScaleY); pinkyarnDouble.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(yarnDoubleFlag == 1 && cyanFlag == 1){var cyanyarnDouble = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transYarnDouble'); cyanyarnDouble.tint =  0x45C1C1; cyanyarnDouble.scale.setTo(spriteScaleX, spriteScaleY); cyanyarnDouble.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //yatch    
                    if(yatchFlag == 1 && greenFlag == 1 ){var greenyatch = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transYatch');greenyatch.tint =  0x51C735; greenyatch.scale.setTo(spriteScaleX, spriteScaleY); 
greenyatch.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(yatchFlag == 1 && blueFlag == 1){console.log("blueyatch plotted");var blueyatch = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transYatch'); blueyatch.tint =  0x456AC1; blueyatch.scale.setTo(spriteScaleX, spriteScaleY); blueyatch.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(yatchFlag == 1 && orangeFlag == 1){var orangeyatch = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transYatch'); orangeyatch.tint =  0xF38932; orangeyatch.scale.setTo(spriteScaleX, spriteScaleY); orangeyatch.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(yatchFlag == 1 && redFlag == 1){var redyatch = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transYatch'); redyatch.tint =  0xE32424; redyatch.scale.setTo(spriteScaleX, spriteScaleY); redyatch.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(yatchFlag == 1 && pinkFlag == 1){var pinkyatch = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transYatch'); pinkyatch.tint =  0xCC3ACC; pinkyatch.scale.setTo(spriteScaleX, spriteScaleY); pinkyatch.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(yatchFlag == 1 && cyanFlag == 1){var cyanyatch = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transYatch'); cyanyatch.tint =  0x45C1C1; cyanyatch.scale.setTo(spriteScaleX, spriteScaleY); cyanyatch.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //yatchRight   
                    if(yellowPearsSingleFlag == 1 && greenFlag == 1 ){var greenyatchRight = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transYatchRight');greenyatchRight.tint =  0x51C735; greenyatchRight.scale.setTo(spriteScaleX, spriteScaleY); 
greenyatchRight.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(yellowPearsSingleFlag == 1 && blueFlag == 1){console.log("blueyatchRight plotted");var blueyatchRight = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transYatchRight'); blueyatchRight.tint =  0x456AC1; blueyatchRight.scale.setTo(spriteScaleX, spriteScaleY); blueyatchRight.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(yellowPearsSingleFlag == 1 && orangeFlag == 1){var orangeyatchRight = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transYatchRight'); orangeyatchRight.tint =  0xF38932; orangeyatchRight.scale.setTo(spriteScaleX, spriteScaleY); orangeyatchRight.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(yellowPearsSingleFlag == 1 && redFlag == 1){var redyatchRight = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transYatchRight'); redyatchRight.tint =  0xE32424; redyatchRight.scale.setTo(spriteScaleX, spriteScaleY); redyatchRight.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(yellowPearsSingleFlag == 1 && pinkFlag == 1){var pinkyatchRight = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transYatchRight'); pinkyatchRight.tint =  0xCC3ACC; pinkyatchRight.scale.setTo(spriteScaleX, spriteScaleY); pinkyatchRight.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(yellowPearsSingleFlag == 1 && cyanFlag == 1){var cyanyatchRight = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transYatchRight'); cyanyatchRight.tint =  0x45C1C1; cyanyatchRight.scale.setTo(spriteScaleX, spriteScaleY); cyanyatchRight.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //yellowPearsDouble    
                    if(yellowPearsDoubleFlag == 1 && greenFlag == 1 ){var greenyellowPearsDouble = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transYellowPearsDouble');greenyellowPearsDouble.tint =  0x51C735; greenyellowPearsDouble.scale.setTo(spriteScaleX, spriteScaleY); 
greenyellowPearsDouble.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(yellowPearsDoubleFlag == 1 && blueFlag == 1){console.log("blueyellowPearsDouble plotted");var blueyellowPearsDouble = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transYellowPearsDouble'); blueyellowPearsDouble.tint =  0x456AC1; blueyellowPearsDouble.scale.setTo(spriteScaleX, spriteScaleY); blueyellowPearsDouble.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(yellowPearsDoubleFlag == 1 && orangeFlag == 1){var orangeyellowPearsDouble = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transYellowPearsDouble'); orangeyellowPearsDouble.tint =  0xF38932; orangeyellowPearsDouble.scale.setTo(spriteScaleX, spriteScaleY); orangeyellowPearsDouble.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(yellowPearsDoubleFlag == 1 && redFlag == 1){var redyellowPearsDouble = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transYellowPearsDouble'); redyellowPearsDouble.tint =  0xE32424; redyellowPearsDouble.scale.setTo(spriteScaleX, spriteScaleY); redyellowPearsDouble.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(yellowPearsDoubleFlag == 1 && pinkFlag == 1){var pinkyellowPearsDouble = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transYellowPearsDouble'); pinkyellowPearsDouble.tint =  0xCC3ACC; pinkyellowPearsDouble.scale.setTo(spriteScaleX, spriteScaleY); pinkyellowPearsDouble.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(yellowPearsDoubleFlag == 1 && cyanFlag == 1){var cyanyellowPearsDouble = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transYellowPearsDouble'); cyanyellowPearsDouble.tint =  0x45C1C1; cyanyellowPearsDouble.scale.setTo(spriteScaleX, spriteScaleY); cyanyellowPearsDouble.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //yogurt    
                    if(yatchRightFlag == 1 && greenFlag == 1 ){var greenyogurt = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transYellowPearsSingle');greenyogurt.tint =  0x51C735; greenyogurt.scale.setTo(spriteScaleX, spriteScaleY); 
greenyogurt.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(yatchRightFlag == 1 && blueFlag == 1){console.log("blueyogurt plotted");var blueyogurt = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transYellowPearsSingle'); blueyogurt.tint =  0x456AC1; blueyogurt.scale.setTo(spriteScaleX, spriteScaleY); blueyogurt.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(yatchRightFlag == 1 && orangeFlag == 1){var orangeyogurt = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transYellowPearsSingle'); orangeyogurt.tint =  0xF38932; orangeyogurt.scale.setTo(spriteScaleX, spriteScaleY); orangeyogurt.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(yatchRightFlag == 1 && redFlag == 1){var redyogurt = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transYellowPearsSingle'); redyogurt.tint =  0xE32424; redyogurt.scale.setTo(spriteScaleX, spriteScaleY); redyogurt.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(yatchRightFlag == 1 && pinkFlag == 1){var pinkyogurt = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transYellowPearsSingle'); pinkyogurt.tint =  0xCC3ACC; pinkyogurt.scale.setTo(spriteScaleX, spriteScaleY); pinkyogurt.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(yatchRightFlag == 1 && cyanFlag == 1){var cyanyogurt = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transYellowPearsSingle'); cyanyogurt.tint =  0x45C1C1; cyanyogurt.scale.setTo(spriteScaleX, spriteScaleY); cyanyogurt.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //yellowPearsSingle    
                    if(yogurtFlag == 1 && greenFlag == 1 ){var greenyellowPearsSingle = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transYogurt');greenyellowPearsSingle.tint =  0x51C735; greenyellowPearsSingle.scale.setTo(spriteScaleX, spriteScaleY); 
greenyellowPearsSingle.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(yogurtFlag == 1 && blueFlag == 1){console.log("blueyellowPearsSingle plotted");var blueyellowPearsSingle = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transYogurt'); blueyellowPearsSingle.tint =  0x456AC1; blueyellowPearsSingle.scale.setTo(spriteScaleX, spriteScaleY); blueyellowPearsSingle.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(yogurtFlag == 1 && orangeFlag == 1){var orangeyellowPearsSingle = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transYogurt'); orangeyellowPearsSingle.tint =  0xF38932; orangeyellowPearsSingle.scale.setTo(spriteScaleX, spriteScaleY); orangeyellowPearsSingle.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(yogurtFlag == 1 && redFlag == 1){var redyellowPearsSingle = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transYogurt'); redyellowPearsSingle.tint =  0xE32424; redyellowPearsSingle.scale.setTo(spriteScaleX, spriteScaleY); redyellowPearsSingle.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(yogurtFlag == 1 && pinkFlag == 1){var pinkyellowPearsSingle = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transYogurt'); pinkyellowPearsSingle.tint =  0xCC3ACC; pinkyellowPearsSingle.scale.setTo(spriteScaleX, spriteScaleY); pinkyellowPearsSingle.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(yogurtFlag == 1 && cyanFlag == 1){var cyanyellowPearsSingle = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transYogurt'); cyanyellowPearsSingle.tint =  0x45C1C1; cyanyellowPearsSingle.scale.setTo(spriteScaleX, spriteScaleY); cyanyellowPearsSingle.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //yogurtFront 
                    if(yogurtFrontFlag == 1 && greenFlag == 1 ){var greenyogurtFront = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transYogurtFront');greenyogurtFront.tint =  0x51C735; greenyogurtFront.scale.setTo(spriteScaleX, spriteScaleY); 
greenyogurtFront.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(yogurtFrontFlag == 1 && blueFlag == 1){console.log("blueyogurtFront plotted");var blueyogurtFront = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transYogurtFront'); blueyogurtFront.tint =  0x456AC1; blueyogurtFront.scale.setTo(spriteScaleX, spriteScaleY); blueyogurtFront.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(yogurtFrontFlag == 1 && orangeFlag == 1){var orangeyogurtFront = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transYogurtFront'); orangeyogurtFront.tint =  0xF38932; orangeyogurtFront.scale.setTo(spriteScaleX, spriteScaleY); orangeyogurtFront.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(yogurtFrontFlag == 1 && redFlag == 1){var redyogurtFront = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transYogurtFront'); redyogurtFront.tint =  0xE32424; redyogurtFront.scale.setTo(spriteScaleX, spriteScaleY); redyogurtFront.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(yogurtFrontFlag == 1 && pinkFlag == 1){var pinkyogurtFront = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transYogurtFront'); pinkyogurtFront.tint =  0xCC3ACC; pinkyogurtFront.scale.setTo(spriteScaleX, spriteScaleY); pinkyogurtFront.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(yogurtFrontFlag == 1 && cyanFlag == 1){var cyanyogurtFront = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transYogurtFront'); cyanyogurtFront.tint =  0x45C1C1; cyanyogurtFront.scale.setTo(spriteScaleX, spriteScaleY); cyanyogurtFront.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
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
            
            game.world.bringToTop(yLetter);
            
            game.world.bringToTop(blue);
            game.world.bringToTop(green);
            game.world.bringToTop(red);
            game.world.bringToTop(cyan);
            game.world.bringToTop(orange);
            game.world.bringToTop(pink);
            
            game.world.bringToTop(cloud1);
            game.world.bringToTop(cloud2);
            game.world.bringToTop(cloud3);
            
            game.world.bringToTop(yack);
            game.world.bringToTop(yackRight);
            game.world.bringToTop(yarn);
            game.world.bringToTop(yarnDouble);
            game.world.bringToTop(yatch);
            game.world.bringToTop(yatchRight);
            game.world.bringToTop(yellowPearsDouble);
            game.world.bringToTop(yogurt);
            game.world.bringToTop(yellowPearsSingle);
            game.world.bringToTop(yogurtFront);
            
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
            
            
            
            if(yackFlag == 1){yack.angle += 2;}
            if(yackRightFlag == 1){yackRight.angle += 2;}
            if(yarnFlag == 1){yarn.angle += 2;}
            if(yarnDoubleFlag == 1){yarnDouble.angle += 2;}
            if(yatchFlag == 1){yatch.angle += 2;}
            if(yellowPearsSingleFlag == 1){yatchRight.angle += 2;}
            if(yellowPearsDoubleFlag == 1){yellowPearsDouble.angle += 2;}
            if(yatchRightFlag == 1){yogurt.angle += 2;}
            if(yogurtFlag == 1){yellowPearsSingle.angle += 2;}
            if(yogurtFrontFlag == 1){yogurtFront.angle += 2;}
            
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
            
            if(yObjectClicked == 10){
            
                askForLevelZ = 1;
                game.zButton = game.add.sprite(1170, 730, 'zButton');             
                game.zButton.scale.setTo(1, 1); 
                game.zButton.anchor.setTo(spriteAnchorX, spriteAnchorY);
                
            }
            
        if(askForLevelZ == 1){
            
            game.world.bringToTop(game.zButton);
            game.zButton.inputEnabled = true;
            game.zButton.events.onInputDown.add(onDownZ, this);
            function onDownZ() {
            
                //start next level
                
                this.setYGlobalVaribalesToZero();
                game.state.start('Z');
                
            }
        }
           
        },
        
        resetYSpriteFlag: function(){
            
            yackFlag = 0;yackRightFlag = 0;yarnFlag = 0;yellowPearsSingleFlag = 0;yarnDoubleFlag = 0;
            yatchFlag = 0;yellowPearsDoubleFlag = 0;yatchRightFlag = 0;yogurtFlag = 0;yogurtFrontFlag = 0;
            camelFlag = 0;candleFlag = 0;carFlag = 0;catFlag = 0;cheeseFlag = 0;cherryFlag = 0;
            clockFlag = 0;cowFlag = 0;crabFlag = 0;crownFlag = 0;

            yack.angle = 0;yackRight.angle = 0;yarn.angle = 0;yatchRight.angle = 0;yarnDouble.angle = 0;
            yatch.angle = 0;yellowPearsDouble.angle = 0;yogurt.angle = 0;yellowPearsSingle.angle = 0;yogurtFront.angle = 0;
            camel.angle = 0;candle.angle = 0;car.angle = 0;cat.angle = 0;cheese.angle = 0;
            cherry.angle = 0;crown.angle = 0;clock.angle = 0;cow.angle = 0;crab.angle = 0;
           
        },
       
        setColorYFlagToZero: function(){
            
            bubbleSound.play(); blueFlag = 0;greenFlag = 0; redFlag = 0; cyanFlag = 0; pinkFlag = 0; orangeFlag = 0;
        },
        
        setYGlobalVaribalesToZero: function(){
            
            
            yackFlag = 0;yackRightFlag = 0;yarnFlag = 0;yellowPearsSingleFlag = 0;yarnDoubleFlag = 0;
            yatchFlag = 0;yellowPearsDoubleFlag = 0;yatchRightFlag = 0;yogurtFlag = 0;yogurtFrontFlag = 0;
            camelFlag = 0;candleFlag = 0;carFlag = 0;catFlag = 0;cheeseFlag = 0;cherryFlag = 0;
            clockFlag = 0;cowFlag = 0;crabFlag = 0;crownFlag = 0;



            greenFlag = 0;blueFlag = 0;orangeFlag = 0;redFlag = 0;pinkFlag = 0;cyanFlag = 0;
        }
        
        
    };