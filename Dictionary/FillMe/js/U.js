uObjectClicked
    var uObjectClicked = 0;
    var askForLevelV = 0;
    
    
    var ugliFruitFlag = 0;
    var ugliFruitDoubleFlag = 0;
    var umbrellaFlag = 0;            
    var umbrellaDownFlag = 0;
    var unicornFlag = 0;
    var unicornRightFlag = 0;
    var unicycleFlag = 0;
    var uniformFlag = 0;
    var urnFlag = 0;
    var urnRightFlag = 0;
    
    
    var U = {

        preload: function () {

            //setting default path for assets to be used in game
            this.load.path = './assets/U/';
            
            
            
            this.load.image("transUgliFruit", "transUgliFruit.png");
            this.load.image("transUgliFruitDouble", "transUgliFruitDouble.png");
            this.load.image("transUmbrella", "transUmbrella.png");
            this.load.image("transUmbrellaDown", "transUmbrellaDown.png");
            this.load.image("transUnicorn", "transUnicorn.png");
            this.load.image("transUnicornRight", "transUnicornRight.png");
            this.load.image("transUnicycle", "transUnicycle.png");
            this.load.image("transUniform", "transUniform.png");
            this.load.image("transUrn", "transUrn.png");
            this.load.image("transUrnRight", "transUrnRight.png");
            
            this.load.image("ugliFruit", "ugliFruit.png");
            this.load.image("ugliFruitDouble", "ugliFruitDouble.png");
            this.load.image("umbrella", "umbrella.png");
            this.load.image("umbrellaDown", "umbrellaDown.png");
            this.load.image("unicorn", "unicorn.png");
            this.load.image("unicornRight", "unicornRight.png");
            this.load.image("unicycle", "unicycle.png");
            this.load.image("uniform", "uniform.png");
            this.load.image("urn", "urn.png");
            this.load.image("urnRight", "urnRight.png");
            
            
            //loading assets for the level  U
            
            //loading shades
            this.load.image("blue", "blue.png");
            this.load.image("cyan", "cyan.png");
            this.load.image("green", "green.png");
            this.load.image("orange", "orange.png");
            this.load.image("pink", "pink.png");
            this.load.image("red", "red.png");
    
            this.load.image("bg", "bg.png");
            this.load.image("uLetter", "uLetter.png");
            this.load.image("vButton", "vButton.png");
            
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
                
            
            
            
            //Main letter U
            uLetter = game.add.sprite(gameMinWidth, gameMinHeight, 'uLetter');
            uLetter.inputEnabled = true;
            uLetter.events.onInputDown.add(this.onDownuLetter, this);
            
            
            
            //Objects starting from U
                    
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
            
            
            
            
            ugliFruit = game.add.sprite(objectsPositions[0].x, objectsPositions[0].y, 'ugliFruit');
            ugliFruit.anchor.setTo(spriteAnchorX, spriteAnchorY);
            ugliFruit.scale.setTo(spriteScaleX, spriteScaleY);
            ugliFruit.inputEnabled = true;
            ugliFruit.events.onInputDown.add(onDownugliFruit, this);
            function onDownugliFruit() {this.resetUSpriteFlag(); ugliFruitFlag = 1;uObjectClicked++;}

            
            
            
            ugliFruitDouble = game.add.sprite(objectsPositions[10].x, objectsPositions[10].y, 'ugliFruitDouble');
            ugliFruitDouble.anchor.setTo(spriteAnchorX, spriteAnchorY);
            ugliFruitDouble.scale.setTo(spriteScaleX, spriteScaleY);
            ugliFruitDouble.inputEnabled = true;
            ugliFruitDouble.events.onInputDown.add(onDownugliFruitDouble, this);
            function onDownugliFruitDouble() {this.resetUSpriteFlag(); ugliFruitDoubleFlag = 1;uObjectClicked++;}

            
            
            
            umbrella = game.add.sprite(objectsPositions[1].x, objectsPositions[1].y, 'umbrella');
            umbrella.anchor.setTo(spriteAnchorX, spriteAnchorY);
            umbrella.scale.setTo(spriteScaleX, spriteScaleY);
            umbrella.inputEnabled = true;
            umbrella.events.onInputDown.add(onDownumbrella, this);
            function onDownumbrella() {this.resetUSpriteFlag(); umbrellaFlag = 1;uObjectClicked++;}
            
            
            
            
            umbrellaDown = game.add.sprite(objectsPositions[11].x, objectsPositions[11].y, 'umbrellaDown');
            umbrellaDown.anchor.setTo(spriteAnchorX, spriteAnchorY);
            umbrellaDown.scale.setTo(spriteScaleX, spriteScaleY);
            umbrellaDown.inputEnabled = true;
            umbrellaDown.events.onInputDown.add(onDownumbrellaDown, this);
            function onDownumbrellaDown() {this.resetUSpriteFlag(); umbrellaDownFlag = 1;uObjectClicked++;}
            
            
            
            unicorn = game.add.sprite(objectsPositions[2].x, objectsPositions[2].y, 'unicorn');
            unicorn.anchor.setTo(spriteAnchorX, spriteAnchorY);
            unicorn.scale.setTo(spriteScaleX, spriteScaleY);
            unicorn.inputEnabled = true;
            unicorn.events.onInputDown.add(onDownunicorn, this);
            function onDownunicorn() {this.resetUSpriteFlag(); unicornFlag = 1;uObjectClicked++;}
            
            unicornRight = game.add.sprite(objectsPositions[12].x, objectsPositions[12].y, 'unicornRight');
            unicornRight.anchor.setTo(spriteAnchorX, spriteAnchorY);
            unicornRight.scale.setTo(spriteScaleX, spriteScaleY);
            unicornRight.inputEnabled = true;
            unicornRight.events.onInputDown.add(onDownunicornRight, this);
            function onDownunicornRight() {this.resetUSpriteFlag(); uniformFlag = 1;uObjectClicked++;}

            
            unicycle = game.add.sprite(objectsPositions[3].x, objectsPositions[3].y, 'unicycle');
            unicycle.anchor.setTo(spriteAnchorX, spriteAnchorY);
            unicycle.scale.setTo(spriteScaleX, spriteScaleY);
            unicycle.inputEnabled = true;  
            unicycle.events.onInputDown.add(onDownunicycle, this);
            function onDownunicycle() {this.resetUSpriteFlag(); unicycleFlag = 1;uObjectClicked++;}
            
            
            uniform = game.add.sprite(objectsPositions[13].x, objectsPositions[13].y, 'uniform');
            uniform.anchor.setTo(spriteAnchorX, spriteAnchorY);
            uniform.scale.setTo(spriteScaleX, spriteScaleY);
            uniform.inputEnabled = true;
            uniform.events.onInputDown.add(onDownuniform, this);
            function onDownuniform() {this.resetUSpriteFlag(); unicornRightFlag = 1;uObjectClicked++;}
            
            
            urn = game.add.sprite(objectsPositions[4].x, objectsPositions[4].y, 'urn');
            urn.anchor.setTo(spriteAnchorX, spriteAnchorY);
            urn.scale.setTo(spriteScaleX, spriteScaleY);
            urn.inputEnabled = true;
            urn.events.onInputDown.add(onDownurn, this);
            function onDownurn() {this.resetUSpriteFlag(); urnFlag = 1;uObjectClicked++;}
            
            
            urnRight = game.add.sprite(objectsPositions[14].x, objectsPositions[14].y, 'urnRight');
            urnRight.anchor.setTo(spriteAnchorX, spriteAnchorY);
            urnRight.scale.setTo(spriteScaleX, spriteScaleY);
            urnRight.inputEnabled = true;
            urnRight.events.onInputDown.add(onDownurnRight, this);
            function onDownurnRight() {this.resetUSpriteFlag(); urnRightFlag = 1;uObjectClicked++;}
            
            
            
            //Adding other sprites        
            
            camel = game.add.sprite(objectsPositions[5].x, objectsPositions[5].y, 'camel');
            camel.anchor.setTo(spriteAnchorX, spriteAnchorY);
            camel.scale.setTo(spriteScaleX, spriteScaleY);
            camel.inputEnabled = true;
            camel.events.onInputDown.add(onDownCamel, this);
            function onDownCamel() {this.resetUSpriteFlag(); camelFlag = 1;}
            
            
            
            
            candle = game.add.sprite(objectsPositions[15].x, objectsPositions[15].y, 'candle');
            candle.anchor.setTo(spriteAnchorX, spriteAnchorY);
            candle.scale.setTo(spriteScaleX, spriteScaleY);
            candle.inputEnabled = true;
            candle.events.onInputDown.add(onDownCandle, this);
            function onDownCandle() {this.resetUSpriteFlag(); candleFlag = 1; }
            
            
            car = game.add.sprite(objectsPositions[6].x, objectsPositions[6].y, 'car');
            car.anchor.setTo(spriteAnchorX, spriteAnchorY);
            car.scale.setTo(spriteScaleX, spriteScaleY);
            car.inputEnabled = true;
            car.events.onInputDown.add(onDownCar, this);
            function onDownCar() {this.resetUSpriteFlag(); carFlag = 1;}
            
            cat = game.add.sprite(objectsPositions[16].x, objectsPositions[16].y, 'cat');
            cat.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cat.scale.setTo(spriteScaleX, spriteScaleY);
            cat.inputEnabled = true;
            cat.events.onInputDown.add(onDownCat, this);
            function onDownCat() {this.resetUSpriteFlag(); catFlag = 1;}
            
            
            cheese = game.add.sprite(objectsPositions[7].x, objectsPositions[7].y, 'cheese');
            cheese.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cheese.scale.setTo(spriteScaleX, spriteScaleY);
            cheese.inputEnabled = true;
            cheese.events.onInputDown.add(onDownCheese, this);
            function onDownCheese() {this.resetUSpriteFlag(); cheeseFlag = 1;}
            
            
            cherry = game.add.sprite(objectsPositions[17].x, objectsPositions[17].y, 'cherry');
            cherry.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cherry.scale.setTo(spriteScaleX, spriteScaleY);
            cherry.inputEnabled = true;
            cherry.events.onInputDown.add(onDownCherry, this);
            function onDownCherry() {this.resetUSpriteFlag(); cherryFlag = 1;}
            
            
            clock = game.add.sprite(objectsPositions[8].x, objectsPositions[8].y, 'clock');
            clock.anchor.setTo(spriteAnchorX, spriteAnchorY);
            clock.scale.setTo(spriteScaleX, spriteScaleY);
            clock.inputEnabled = true;
            clock.events.onInputDown.add(onDownClock, this);
            function onDownClock() {this.resetUSpriteFlag(); clockFlag = 1;}
            
            
            
            cow = game.add.sprite(objectsPositions[18].x, objectsPositions[18].y, 'cow');
            cow.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cow.scale.setTo(spriteScaleX, spriteScaleY);
            cow.inputEnabled = true;
            cow.events.onInputDown.add(onDownCow, this);
            function onDownCow() {this.resetUSpriteFlag(); cowFlag = 1;}
            
            
            crab = game.add.sprite(objectsPositions[9].x, objectsPositions[9].y, 'crab');
            crab.anchor.setTo(spriteAnchorX, spriteAnchorY);
            crab.scale.setTo(spriteScaleX, spriteScaleY);
            crab.inputEnabled = true;
            crab.events.onInputDown.add(onDownCrab, this);
            function onDownCrab() {this.resetUSpriteFlag(); crabFlag = 1;}
            
            
            crown = game.add.sprite(objectsPositions[19].x, objectsPositions[19].y, 'crown');
            crown.anchor.setTo(spriteAnchorX, spriteAnchorY);
            crown.scale.setTo(spriteScaleX, spriteScaleY);
            crown.inputEnabled = true;
            crown.events.onInputDown.add(onDownCrown, this);
            function onDownCrown() {this.resetUSpriteFlag(); crownFlag = 1;}
            
            
            
            //Color shades
            blue = game.add.sprite(objectsPositions[20].x, objectsPositions[20].y, 'blue');
            blue.anchor.setTo(spriteAnchorX, spriteAnchorY);
            blue.scale.setTo(shadeScaleX, shadeScaleY);
            blue.inputEnabled = true;
            blue.tint = 0x456AC1; 
            blue.events.onInputDown.add(onDownBlue, this);
            function onDownBlue() {this.setColorUFlagToZero(); blueFlag = 1;}
           
            
            cyan = game.add.sprite(objectsPositions[21].x, objectsPositions[21].y, 'cyan');
            cyan.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cyan.scale.setTo(shadeScaleX, shadeScaleY);
            cyan.inputEnabled = true;
            cyan.tint = 0x45C1C1; 
            cyan.events.onInputDown.add(onDownCyan, this);
            function onDownCyan() {this.setColorUFlagToZero(); cyanFlag = 1;}
            
            
            
            green = game.add.sprite(objectsPositions[22].x, objectsPositions[22].y, 'green');
            green.anchor.setTo(spriteAnchorX, spriteAnchorY);
            green.scale.setTo(shadeScaleX, shadeScaleY);
            green.inputEnabled = true;
            green.tint = 0x51C735;
            green.events.onInputDown.add(onDownGreen, this);
            function onDownGreen() {this.setColorUFlagToZero(); greenFlag = 1;}
            
            
            orange = game.add.sprite(objectsPositions[23].x, objectsPositions[23].y, 'orange');
            orange.anchor.setTo(spriteAnchorX, spriteAnchorY);
            orange.scale.setTo(shadeScaleX, shadeScaleY);
            orange.inputEnabled = true;
            orange.tint = 0xF38932;
            orange.events.onInputDown.add(onDownOrange, this);
            function onDownOrange() {this.setColorUFlagToZero(); orangeFlag = 1;}
           
            
            pink = game.add.sprite(objectsPositions[24].x, objectsPositions[24].y, 'pink');
            pink.anchor.setTo(spriteAnchorX, spriteAnchorY);
            pink.scale.setTo(shadeScaleX, shadeScaleY);
            pink.inputEnabled = true;
            pink.tint = 0xCC3ACC;
            pink.events.onInputDown.add(onDownPink, this);
            function onDownPink() {this.setColorUFlagToZero(); pinkFlag = 1;}
            
            
            red = game.add.sprite(objectsPositions[25].x, objectsPositions[25].y, 'red');
            red.anchor.setTo(spriteAnchorX, spriteAnchorY);
            red.scale.setTo(shadeScaleX, shadeScaleY);
            red.inputEnabled = true;
            red.tint = 0xE32424;
            red.events.onInputDown.add(onDownRed, this);
            function onDownRed() {this.setColorUFlagToZero(); redFlag = 1;}
                
        },
        
        onDownuLetter: function() {
                
            //ugliFruit
                    if(ugliFruitFlag == 1 && greenFlag == 1 ){var greenugliFruit = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transUgliFruit');greenugliFruit.tint =  0x51C735; greenugliFruit.scale.setTo(spriteScaleX, spriteScaleY); 
greenugliFruit.anchor.setTo(0.6, 0.6);stickSound.play();}                    
                    
                    if(ugliFruitFlag == 1 && blueFlag == 1){var blueugliFruit = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transUgliFruit'); blueugliFruit.tint =  0x456AC1; blueugliFruit.scale.setTo(spriteScaleX, spriteScaleY); blueugliFruit.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(ugliFruitFlag == 1 && orangeFlag == 1){var orangeugliFruit = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transUgliFruit'); orangeugliFruit.tint =  0xF38932; orangeugliFruit.scale.setTo(spriteScaleX, spriteScaleY); orangeugliFruit.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(ugliFruitFlag == 1 && redFlag == 1){var redugliFruit = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transUgliFruit'); redugliFruit.tint =  0xE32424; redugliFruit.scale.setTo(spriteScaleX, spriteScaleY); redugliFruit.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(ugliFruitFlag == 1 && pinkFlag == 1){var pinkugliFruit = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transUgliFruit'); pinkugliFruit.tint =  0xCC3ACC; pinkugliFruit.scale.setTo(spriteScaleX, spriteScaleY); pinkugliFruit.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(ugliFruitFlag == 1 && cyanFlag == 1){var cyanugliFruit = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transUgliFruit'); cyanugliFruit.tint =  0x45C1C1; cyanugliFruit.scale.setTo(spriteScaleX, spriteScaleY); cyanugliFruit.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //ugliFruitDouble    
                    if(ugliFruitDoubleFlag == 1 && greenFlag == 1 ){var greenugliFruitDouble = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transUgliFruitDouble');greenugliFruitDouble.tint =  0x51C735; greenugliFruitDouble.scale.setTo(spriteScaleX, spriteScaleY); 
greenugliFruitDouble.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(ugliFruitDoubleFlag == 1 && blueFlag == 1){var blueugliFruitDouble = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transUgliFruitDouble'); blueugliFruitDouble.tint =  0x456AC1; blueugliFruitDouble.scale.setTo(spriteScaleX, spriteScaleY); blueugliFruitDouble.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(ugliFruitDoubleFlag == 1 && orangeFlag == 1){var orangeugliFruitDouble = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transUgliFruitDouble'); orangeugliFruitDouble.tint =  0xF38932; orangeugliFruitDouble.scale.setTo(spriteScaleX, spriteScaleY); orangeugliFruitDouble.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(ugliFruitDoubleFlag == 1 && redFlag == 1){var redugliFruitDouble = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transUgliFruitDouble'); redugliFruitDouble.tint =  0xE32424; redugliFruitDouble.scale.setTo(spriteScaleX, spriteScaleY); redugliFruitDouble.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(ugliFruitDoubleFlag == 1 && pinkFlag == 1){var pinkugliFruitDouble = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transUgliFruitDouble'); pinkugliFruitDouble.tint =  0xCC3ACC; pinkugliFruitDouble.scale.setTo(spriteScaleX, spriteScaleY); pinkugliFruitDouble.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(ugliFruitDoubleFlag == 1 && cyanFlag == 1){var cyanugliFruitDouble = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transUgliFruitDouble'); cyanugliFruitDouble.tint =  0x45C1C1; cyanugliFruitDouble.scale.setTo(spriteScaleX, spriteScaleY); cyanugliFruitDouble.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //umbrella    
                    if(umbrellaFlag == 1 && greenFlag == 1 ){var greenumbrella = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transUmbrella');greenumbrella.tint =  0x51C735; greenumbrella.scale.setTo(spriteScaleX, spriteScaleY); 
greenumbrella.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(umbrellaFlag == 1 && blueFlag == 1){var blueumbrella = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transUmbrella'); blueumbrella.tint =  0x456AC1; blueumbrella.scale.setTo(spriteScaleX, spriteScaleY); blueumbrella.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(umbrellaFlag == 1 && orangeFlag == 1){var orangeumbrella = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transUmbrella'); orangeumbrella.tint =  0xF38932; orangeumbrella.scale.setTo(spriteScaleX, spriteScaleY); orangeumbrella.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(umbrellaFlag == 1 && redFlag == 1){var redumbrella = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transUmbrella'); redumbrella.tint =  0xE32424; redumbrella.scale.setTo(spriteScaleX, spriteScaleY); redumbrella.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(umbrellaFlag == 1 && pinkFlag == 1){var pinkumbrella = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transUmbrella'); pinkumbrella.tint =  0xCC3ACC; pinkumbrella.scale.setTo(spriteScaleX, spriteScaleY); pinkumbrella.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(umbrellaFlag == 1 && cyanFlag == 1){var cyanumbrella = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transUmbrella'); cyanumbrella.tint =  0x45C1C1; cyanumbrella.scale.setTo(spriteScaleX, spriteScaleY); cyanumbrella.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //umbrellaDown
                    if(umbrellaDownFlag == 1 && greenFlag == 1 ){var greenumbrellaDown = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transUmbrellaDown');greenumbrellaDown.tint =  0x51C735; greenumbrellaDown.scale.setTo(spriteScaleX, spriteScaleY); 
greenumbrellaDown.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(umbrellaDownFlag == 1 && blueFlag == 1){console.log("blueumbrellaDown plotted");var blueumbrellaDown = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transUmbrellaDown'); blueumbrellaDown.tint =  0x456AC1; blueumbrellaDown.scale.setTo(spriteScaleX, spriteScaleY); blueumbrellaDown.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(umbrellaDownFlag == 1 && orangeFlag == 1){var orangeumbrellaDown = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transUmbrellaDown'); orangeumbrellaDown.tint =  0xF38932; orangeumbrellaDown.scale.setTo(spriteScaleX, spriteScaleY); orangeumbrellaDown.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(umbrellaDownFlag == 1 && redFlag == 1){var redumbrellaDown = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transUmbrellaDown'); redumbrellaDown.tint =  0xE32424; redumbrellaDown.scale.setTo(spriteScaleX, spriteScaleY); redumbrellaDown.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(umbrellaDownFlag == 1 && pinkFlag == 1){var pinkumbrellaDown = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transUmbrellaDown'); pinkumbrellaDown.tint =  0xCC3ACC; pinkumbrellaDown.scale.setTo(spriteScaleX, spriteScaleY); pinkumbrellaDown.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(umbrellaDownFlag == 1 && cyanFlag == 1){var cyanumbrellaDown = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transUmbrellaDown'); cyanumbrellaDown.tint =  0x45C1C1; cyanumbrellaDown.scale.setTo(spriteScaleX, spriteScaleY); cyanumbrellaDown.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //unicorn    
                    if(unicornFlag == 1 && greenFlag == 1 ){var greenunicorn = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transUnicorn');greenunicorn.tint =  0x51C735; greenunicorn.scale.setTo(spriteScaleX, spriteScaleY); 
greenunicorn.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(unicornFlag == 1 && blueFlag == 1){console.log("blueunicorn plotted");var blueunicorn = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transUnicorn'); blueunicorn.tint =  0x456AC1; blueunicorn.scale.setTo(spriteScaleX, spriteScaleY); blueunicorn.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(unicornFlag == 1 && orangeFlag == 1){var orangeunicorn = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transUnicorn'); orangeunicorn.tint =  0xF38932; orangeunicorn.scale.setTo(spriteScaleX, spriteScaleY); orangeunicorn.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(unicornFlag == 1 && redFlag == 1){var redunicorn = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transUnicorn'); redunicorn.tint =  0xE32424; redunicorn.scale.setTo(spriteScaleX, spriteScaleY); redunicorn.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(unicornFlag == 1 && pinkFlag == 1){var pinkunicorn = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transUnicorn'); pinkunicorn.tint =  0xCC3ACC; pinkunicorn.scale.setTo(spriteScaleX, spriteScaleY); pinkunicorn.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(unicornFlag == 1 && cyanFlag == 1){var cyanunicorn = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transUnicorn'); cyanunicorn.tint =  0x45C1C1; cyanunicorn.scale.setTo(spriteScaleX, spriteScaleY); cyanunicorn.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //unicornRight   
                    if(uniformFlag == 1 && greenFlag == 1 ){var greenunicornRight = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transUnicornRight');greenunicornRight.tint =  0x51C735; greenunicornRight.scale.setTo(spriteScaleX, spriteScaleY); 
greenunicornRight.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(uniformFlag == 1 && blueFlag == 1){console.log("blueunicornRight plotted");var blueunicornRight = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transUnicornRight'); blueunicornRight.tint =  0x456AC1; blueunicornRight.scale.setTo(spriteScaleX, spriteScaleY); blueunicornRight.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(uniformFlag == 1 && orangeFlag == 1){var orangeunicornRight = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transUnicornRight'); orangeunicornRight.tint =  0xF38932; orangeunicornRight.scale.setTo(spriteScaleX, spriteScaleY); orangeunicornRight.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(uniformFlag == 1 && redFlag == 1){var redunicornRight = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transUnicornRight'); redunicornRight.tint =  0xE32424; redunicornRight.scale.setTo(spriteScaleX, spriteScaleY); redunicornRight.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(uniformFlag == 1 && pinkFlag == 1){var pinkunicornRight = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transUnicornRight'); pinkunicornRight.tint =  0xCC3ACC; pinkunicornRight.scale.setTo(spriteScaleX, spriteScaleY); pinkunicornRight.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(uniformFlag == 1 && cyanFlag == 1){var cyanunicornRight = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transUnicornRight'); cyanunicornRight.tint =  0x45C1C1; cyanunicornRight.scale.setTo(spriteScaleX, spriteScaleY); cyanunicornRight.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //unicycle    
                    if(unicycleFlag == 1 && greenFlag == 1 ){var greenunicycle = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transUnicycle');greenunicycle.tint =  0x51C735; greenunicycle.scale.setTo(spriteScaleX, spriteScaleY); 
greenunicycle.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(unicycleFlag == 1 && blueFlag == 1){console.log("blueunicycle plotted");var blueunicycle = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transUnicycle'); blueunicycle.tint =  0x456AC1; blueunicycle.scale.setTo(spriteScaleX, spriteScaleY); blueunicycle.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(unicycleFlag == 1 && orangeFlag == 1){var orangeunicycle = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transUnicycle'); orangeunicycle.tint =  0xF38932; orangeunicycle.scale.setTo(spriteScaleX, spriteScaleY); orangeunicycle.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(unicycleFlag == 1 && redFlag == 1){var redunicycle = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transUnicycle'); redunicycle.tint =  0xE32424; redunicycle.scale.setTo(spriteScaleX, spriteScaleY); redunicycle.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(unicycleFlag == 1 && pinkFlag == 1){var pinkunicycle = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transUnicycle'); pinkunicycle.tint =  0xCC3ACC; pinkunicycle.scale.setTo(spriteScaleX, spriteScaleY); pinkunicycle.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(unicycleFlag == 1 && cyanFlag == 1){var cyanunicycle = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transUnicycle'); cyanunicycle.tint =  0x45C1C1; cyanunicycle.scale.setTo(spriteScaleX, spriteScaleY); cyanunicycle.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //uniform    
                    if(unicornRightFlag == 1 && greenFlag == 1 ){var greenuniform = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transUniform');greenuniform.tint =  0x51C735; greenuniform.scale.setTo(spriteScaleX, spriteScaleY); 
greenuniform.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(unicornRightFlag == 1 && blueFlag == 1){console.log("blueuniform plotted");var blueuniform = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transUniform'); blueuniform.tint =  0x456AC1; blueuniform.scale.setTo(spriteScaleX, spriteScaleY); blueuniform.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(unicornRightFlag == 1 && orangeFlag == 1){var orangeuniform = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transUniform'); orangeuniform.tint =  0xF38932; orangeuniform.scale.setTo(spriteScaleX, spriteScaleY); orangeuniform.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(unicornRightFlag == 1 && redFlag == 1){var reduniform = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transUniform'); reduniform.tint =  0xE32424; reduniform.scale.setTo(spriteScaleX, spriteScaleY); reduniform.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(unicornRightFlag == 1 && pinkFlag == 1){var pinkuniform = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transUniform'); pinkuniform.tint =  0xCC3ACC; pinkuniform.scale.setTo(spriteScaleX, spriteScaleY); pinkuniform.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(unicornRightFlag == 1 && cyanFlag == 1){var cyanuniform = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transUniform'); cyanuniform.tint =  0x45C1C1; cyanuniform.scale.setTo(spriteScaleX, spriteScaleY); cyanuniform.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //urn    
                    if(urnFlag == 1 && greenFlag == 1 ){var greenurn = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transUrn');greenurn.tint =  0x51C735; greenurn.scale.setTo(spriteScaleX, spriteScaleY); 
greenurn.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(urnFlag == 1 && blueFlag == 1){console.log("blueurn plotted");var blueurn = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transUrn'); blueurn.tint =  0x456AC1; blueurn.scale.setTo(spriteScaleX, spriteScaleY); blueurn.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(urnFlag == 1 && orangeFlag == 1){var orangeurn = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transUrn'); orangeurn.tint =  0xF38932; orangeurn.scale.setTo(spriteScaleX, spriteScaleY); orangeurn.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(urnFlag == 1 && redFlag == 1){var redurn = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transUrn'); redurn.tint =  0xE32424; redurn.scale.setTo(spriteScaleX, spriteScaleY); redurn.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(urnFlag == 1 && pinkFlag == 1){var pinkurn = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transUrn'); pinkurn.tint =  0xCC3ACC; pinkurn.scale.setTo(spriteScaleX, spriteScaleY); pinkurn.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(urnFlag == 1 && cyanFlag == 1){var cyanurn = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transUrn'); cyanurn.tint =  0x45C1C1; cyanurn.scale.setTo(spriteScaleX, spriteScaleY); cyanurn.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //urnRight 
                    if(urnRightFlag == 1 && greenFlag == 1 ){var greenurnRight = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transUrnRight');greenurnRight.tint =  0x51C735; greenurnRight.scale.setTo(spriteScaleX, spriteScaleY); 
greenurnRight.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(urnRightFlag == 1 && blueFlag == 1){console.log("blueurnRight plotted");var blueurnRight = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transUrnRight'); blueurnRight.tint =  0x456AC1; blueurnRight.scale.setTo(spriteScaleX, spriteScaleY); blueurnRight.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(urnRightFlag == 1 && orangeFlag == 1){var orangeurnRight = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transUrnRight'); orangeurnRight.tint =  0xF38932; orangeurnRight.scale.setTo(spriteScaleX, spriteScaleY); orangeurnRight.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(urnRightFlag == 1 && redFlag == 1){var redurnRight = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transUrnRight'); redurnRight.tint =  0xE32424; redurnRight.scale.setTo(spriteScaleX, spriteScaleY); redurnRight.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(urnRightFlag == 1 && pinkFlag == 1){var pinkurnRight = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transUrnRight'); pinkurnRight.tint =  0xCC3ACC; pinkurnRight.scale.setTo(spriteScaleX, spriteScaleY); pinkurnRight.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(urnRightFlag == 1 && cyanFlag == 1){var cyanurnRight = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transUrnRight'); cyanurnRight.tint =  0x45C1C1; cyanurnRight.scale.setTo(spriteScaleX, spriteScaleY); cyanurnRight.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
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
            
            game.world.bringToTop(uLetter);
            
            game.world.bringToTop(blue);
            game.world.bringToTop(green);
            game.world.bringToTop(red);
            game.world.bringToTop(cyan);
            game.world.bringToTop(orange);
            game.world.bringToTop(pink);
            
            game.world.bringToTop(cloud1);
            game.world.bringToTop(cloud2);
            game.world.bringToTop(cloud3);
            
            game.world.bringToTop(ugliFruit);
            game.world.bringToTop(ugliFruitDouble);
            game.world.bringToTop(umbrella);
            game.world.bringToTop(umbrellaDown);
            game.world.bringToTop(unicorn);
            game.world.bringToTop(unicornRight);
            game.world.bringToTop(unicycle);
            game.world.bringToTop(uniform);
            game.world.bringToTop(urn);
            game.world.bringToTop(urnRight);
            
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
            
            
            
            if(ugliFruitFlag == 1){ugliFruit.angle += 2;}
            if(ugliFruitDoubleFlag == 1){ugliFruitDouble.angle += 2;}
            if(umbrellaFlag == 1){umbrella.angle += 2;}
            if(umbrellaDownFlag == 1){umbrellaDown.angle += 2;}
            if(unicornFlag == 1){unicorn.angle += 2;}
            if(uniformFlag == 1){unicornRight.angle += 2;}
            if(unicycleFlag == 1){unicycle.angle += 2;}
            if(unicornRightFlag == 1){uniform.angle += 2;}
            if(urnFlag == 1){urn.angle += 2;}
            if(urnRightFlag == 1){urnRight.angle += 2;}
            
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
            
            if(uObjectClicked == 10){
            
                askForLevelV = 1;
                game.vButton = game.add.sprite(1170, 730, 'vButton');             
                game.vButton.scale.setTo(1, 1); 
                game.vButton.anchor.setTo(spriteAnchorX, spriteAnchorY);
                
            }
            
        if(askForLevelV == 1){
            
            game.world.bringToTop(game.vButton);
            game.vButton.inputEnabled = true;
            game.vButton.events.onInputDown.add(onDownV, this);
            function onDownV() {
            
                //start next level
                
                this.setUGlobalVaribalesToZero();
                game.state.start('V');
                
            }
        }
           
        },
        
        resetUSpriteFlag: function(){
            
            ugliFruitFlag = 0;ugliFruitDoubleFlag = 0;umbrellaFlag = 0;uniformFlag = 0;umbrellaDownFlag = 0;
            unicornFlag = 0;unicycleFlag = 0;unicornRightFlag = 0;urnFlag = 0;urnRightFlag = 0;
            camelFlag = 0;candleFlag = 0;carFlag = 0;catFlag = 0;cheeseFlag = 0;cherryFlag = 0;
            clockFlag = 0;cowFlag = 0;crabFlag = 0;crownFlag = 0;

            ugliFruit.angle = 0;ugliFruitDouble.angle = 0;umbrella.angle = 0;unicornRight.angle = 0;umbrellaDown.angle = 0;
            unicorn.angle = 0;unicycle.angle = 0;uniform.angle = 0;urn.angle = 0;urnRight.angle = 0;
            camel.angle = 0;candle.angle = 0;car.angle = 0;cat.angle = 0;cheese.angle = 0;
            cherry.angle = 0;crown.angle = 0;clock.angle = 0;cow.angle = 0;crab.angle = 0;
           
        },
       
        setColorUFlagToZero: function(){
            
            bubbleSound.play(); blueFlag = 0;greenFlag = 0; redFlag = 0; cyanFlag = 0; pinkFlag = 0; orangeFlag = 0;
        },
        
        setUGlobalVaribalesToZero: function(){
            
            
            ugliFruitFlag = 0;ugliFruitDoubleFlag = 0;umbrellaFlag = 0;uniformFlag = 0;umbrellaDownFlag = 0;
            unicornFlag = 0;unicycleFlag = 0;unicornRightFlag = 0;urnFlag = 0;urnRightFlag = 0;
            camelFlag = 0;candleFlag = 0;carFlag = 0;catFlag = 0;cheeseFlag = 0;cherryFlag = 0;
            clockFlag = 0;cowFlag = 0;crabFlag = 0;crownFlag = 0;



            greenFlag = 0;blueFlag = 0;orangeFlag = 0;redFlag = 0;pinkFlag = 0;cyanFlag = 0;
        }
        
        
    };