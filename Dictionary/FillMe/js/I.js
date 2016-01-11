        
    var iObjectClicked = 0;
    var askForLevelJ = 0;
    
    
    var iceFlag = 0;
    var iceCreamFlag = 0;
    var iceCreamStickFlag = 0;            
    var iceCubesFlag = 0;
    var iglooFlag = 0;
    var iglooDoubleDoorFlag = 0;
    var iguanaFlag = 0;
    var iguanaRightFlag = 0;
    var inkFlag = 0;
    var inkRightFlag = 0;
    
    
    var I = {

        preload: function () {

            //setting default path for assets to be used in game
            this.load.path = './assets/I/';
            
            
            
            this.load.image("transIce", "transIce.png");
            this.load.image("transIceCream", "transIceCream.png");
            this.load.image("transIceCreamStick", "transIceCreamStick.png");
            this.load.image("transIceCubes", "transIceCubes.png");
            this.load.image("transIgloo", "transIgloo.png");
            this.load.image("transIglooDoubleDoor", "transIglooDoubleDoor.png");
            this.load.image("transIguana", "transIguana.png");
            this.load.image("transIguanaRight", "transIguanaRight.png");
            this.load.image("transInk", "transInk.png");
            this.load.image("transInkRight", "transInkRight.png");
            
            this.load.image("ice", "ice.png");
            this.load.image("iceCream", "iceCream.png");
            this.load.image("iceCreamStick", "iceCreamStick.png");
            this.load.image("iceCubes", "iceCubes.png");
            this.load.image("igloo", "igloo.png");
            this.load.image("iglooDoubleDoor", "iglooDoubleDoor.png");
            this.load.image("iguana", "iguana.png");
            this.load.image("iguanaRight", "iguanaRight.png");
            this.load.image("ink", "ink.png");
            this.load.image("inkRight", "inkRight.png");
            
            
            //loading assets for the level  I
            
            //loading shades
            this.load.image("blue", "blue.png");
            this.load.image("cyan", "cyan.png");
            this.load.image("green", "green.png");
            this.load.image("orange", "orange.png");
            this.load.image("pink", "pink.png");
            this.load.image("red", "red.png");
    
            this.load.image("bg", "bg.png");
            this.load.image("iLetter", "iLetter.png");
            this.load.image("jButton", "jButton.png");
            
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
                
            
            
            
            //Main letter I
            iLetter = game.add.sprite(gameMinWidth, gameMinHeight, 'iLetter');
            iLetter.inputEnabled = true;
            iLetter.events.onInputDown.add(this.onDowniLetter, this);
            
            
            
            //Objects starting from I
                    
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
            
            
            
            
            ice = game.add.sprite(objectsPositions[0].x, objectsPositions[0].y, 'ice');
            ice.anchor.setTo(spriteAnchorX, spriteAnchorY);
            ice.scale.setTo(spriteScaleX, spriteScaleY);
            ice.inputEnabled = true;
            ice.events.onInputDown.add(onDownice, this);
            function onDownice() {this.resetISpriteFlag(); iceFlag = 1;iObjectClicked++;}

            
            
            
            iceCream = game.add.sprite(objectsPositions[10].x, objectsPositions[10].y, 'iceCream');
            iceCream.anchor.setTo(spriteAnchorX, spriteAnchorY);
            iceCream.scale.setTo(spriteScaleX, spriteScaleY);
            iceCream.inputEnabled = true;
            iceCream.events.onInputDown.add(onDowniceCream, this);
            function onDowniceCream() {this.resetISpriteFlag(); iceCreamFlag = 1;iObjectClicked++;}

            
            
            
            iceCreamStick = game.add.sprite(objectsPositions[1].x, objectsPositions[1].y, 'iceCreamStick');
            iceCreamStick.anchor.setTo(spriteAnchorX, spriteAnchorY);
            iceCreamStick.scale.setTo(spriteScaleX, spriteScaleY);
            iceCreamStick.inputEnabled = true;
            iceCreamStick.events.onInputDown.add(onDowniceCreamStick, this);
            function onDowniceCreamStick() {this.resetISpriteFlag(); iceCreamStickFlag = 1;iObjectClicked++;}
            
            
            
            
            iceCubes = game.add.sprite(objectsPositions[11].x, objectsPositions[11].y, 'iceCubes');
            iceCubes.anchor.setTo(spriteAnchorX, spriteAnchorY);
            iceCubes.scale.setTo(spriteScaleX, spriteScaleY);
            iceCubes.inputEnabled = true;
            iceCubes.events.onInputDown.add(onDowniceCubes, this);
            function onDowniceCubes() {this.resetISpriteFlag(); iceCubesFlag = 1;iObjectClicked++;}
            
            
            
            igloo = game.add.sprite(objectsPositions[2].x, objectsPositions[2].y, 'igloo');
            igloo.anchor.setTo(spriteAnchorX, spriteAnchorY);
            igloo.scale.setTo(spriteScaleX, spriteScaleY);
            igloo.inputEnabled = true;
            igloo.events.onInputDown.add(onDownigloo, this);
            function onDownigloo() {this.resetISpriteFlag(); iglooFlag = 1;iObjectClicked++;}
            
            iglooDoubleDoor = game.add.sprite(objectsPositions[12].x, objectsPositions[12].y, 'iglooDoubleDoor');
            iglooDoubleDoor.anchor.setTo(spriteAnchorX, spriteAnchorY);
            iglooDoubleDoor.scale.setTo(spriteScaleX, spriteScaleY);
            iglooDoubleDoor.inputEnabled = true;
            iglooDoubleDoor.events.onInputDown.add(onDowniglooDoubleDoor, this);
            function onDowniglooDoubleDoor() {this.resetISpriteFlag(); iguanaRightFlag = 1;iObjectClicked++;}

            
            iguana = game.add.sprite(objectsPositions[3].x, objectsPositions[3].y, 'iguana');
            iguana.anchor.setTo(spriteAnchorX, spriteAnchorY);
            iguana.scale.setTo(spriteScaleX, spriteScaleY);
            iguana.inputEnabled = true;  
            iguana.events.onInputDown.add(onDowniguana, this);
            function onDowniguana() {this.resetISpriteFlag(); iguanaFlag = 1;iObjectClicked++;}
            
            
            iguanaRight = game.add.sprite(objectsPositions[13].x, objectsPositions[13].y, 'iguanaRight');
            iguanaRight.anchor.setTo(spriteAnchorX, spriteAnchorY);
            iguanaRight.scale.setTo(spriteScaleX, spriteScaleY);
            iguanaRight.inputEnabled = true;
            iguanaRight.events.onInputDown.add(onDowniguanaRight, this);
            function onDowniguanaRight() {this.resetISpriteFlag(); iglooDoubleDoorFlag = 1;iObjectClicked++;}
            
            
            ink = game.add.sprite(objectsPositions[4].x, objectsPositions[4].y, 'ink');
            ink.anchor.setTo(spriteAnchorX, spriteAnchorY);
            ink.scale.setTo(spriteScaleX, spriteScaleY);
            ink.inputEnabled = true;
            ink.events.onInputDown.add(onDownink, this);
            function onDownink() {this.resetISpriteFlag(); inkFlag = 1;iObjectClicked++;}
            
            
            inkRight = game.add.sprite(objectsPositions[14].x, objectsPositions[14].y, 'inkRight');
            inkRight.anchor.setTo(spriteAnchorX, spriteAnchorY);
            inkRight.scale.setTo(spriteScaleX, spriteScaleY);
            inkRight.inputEnabled = true;
            inkRight.events.onInputDown.add(onDowninkRight, this);
            function onDowninkRight() {this.resetISpriteFlag(); inkRightFlag = 1;iObjectClicked++;}
            
            
            
            //Adding other sprites        
            
            camel = game.add.sprite(objectsPositions[5].x, objectsPositions[5].y, 'camel');
            camel.anchor.setTo(spriteAnchorX, spriteAnchorY);
            camel.scale.setTo(spriteScaleX, spriteScaleY);
            camel.inputEnabled = true;
            camel.events.onInputDown.add(onDownCamel, this);
            function onDownCamel() {this.resetISpriteFlag(); camelFlag = 1;}
            
            
            
            
            candle = game.add.sprite(objectsPositions[15].x, objectsPositions[15].y, 'candle');
            candle.anchor.setTo(spriteAnchorX, spriteAnchorY);
            candle.scale.setTo(spriteScaleX, spriteScaleY);
            candle.inputEnabled = true;
            candle.events.onInputDown.add(onDownCandle, this);
            function onDownCandle() {this.resetISpriteFlag(); candleFlag = 1; }
            
            
            car = game.add.sprite(objectsPositions[6].x, objectsPositions[6].y, 'car');
            car.anchor.setTo(spriteAnchorX, spriteAnchorY);
            car.scale.setTo(spriteScaleX, spriteScaleY);
            car.inputEnabled = true;
            car.events.onInputDown.add(onDownCar, this);
            function onDownCar() {this.resetISpriteFlag(); carFlag = 1;}
            
            cat = game.add.sprite(objectsPositions[16].x, objectsPositions[16].y, 'cat');
            cat.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cat.scale.setTo(spriteScaleX, spriteScaleY);
            cat.inputEnabled = true;
            cat.events.onInputDown.add(onDownCat, this);
            function onDownCat() {this.resetISpriteFlag(); catFlag = 1;}
            
            
            cheese = game.add.sprite(objectsPositions[7].x, objectsPositions[7].y, 'cheese');
            cheese.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cheese.scale.setTo(spriteScaleX, spriteScaleY);
            cheese.inputEnabled = true;
            cheese.events.onInputDown.add(onDownCheese, this);
            function onDownCheese() {this.resetISpriteFlag(); cheeseFlag = 1;}
            
            
            cherry = game.add.sprite(objectsPositions[17].x, objectsPositions[17].y, 'cherry');
            cherry.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cherry.scale.setTo(spriteScaleX, spriteScaleY);
            cherry.inputEnabled = true;
            cherry.events.onInputDown.add(onDownCherry, this);
            function onDownCherry() {this.resetISpriteFlag(); cherryFlag = 1;}
            
            
            clock = game.add.sprite(objectsPositions[8].x, objectsPositions[8].y, 'clock');
            clock.anchor.setTo(spriteAnchorX, spriteAnchorY);
            clock.scale.setTo(spriteScaleX, spriteScaleY);
            clock.inputEnabled = true;
            clock.events.onInputDown.add(onDownClock, this);
            function onDownClock() {this.resetISpriteFlag(); clockFlag = 1;}
            
            
            
            cow = game.add.sprite(objectsPositions[18].x, objectsPositions[18].y, 'cow');
            cow.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cow.scale.setTo(spriteScaleX, spriteScaleY);
            cow.inputEnabled = true;
            cow.events.onInputDown.add(onDownCow, this);
            function onDownCow() {this.resetISpriteFlag(); cowFlag = 1;}
            
            
            crab = game.add.sprite(objectsPositions[9].x, objectsPositions[9].y, 'crab');
            crab.anchor.setTo(spriteAnchorX, spriteAnchorY);
            crab.scale.setTo(spriteScaleX, spriteScaleY);
            crab.inputEnabled = true;
            crab.events.onInputDown.add(onDownCrab, this);
            function onDownCrab() {this.resetISpriteFlag(); crabFlag = 1;}
            
            
            crown = game.add.sprite(objectsPositions[19].x, objectsPositions[19].y, 'crown');
            crown.anchor.setTo(spriteAnchorX, spriteAnchorY);
            crown.scale.setTo(spriteScaleX, spriteScaleY);
            crown.inputEnabled = true;
            crown.events.onInputDown.add(onDownCrown, this);
            function onDownCrown() {this.resetISpriteFlag(); crownFlag = 1;}
            
            
            
            //Color shades
            blue = game.add.sprite(objectsPositions[20].x, objectsPositions[20].y, 'blue');
            blue.anchor.setTo(spriteAnchorX, spriteAnchorY);
            blue.scale.setTo(shadeScaleX, shadeScaleY);
            blue.inputEnabled = true;
            blue.tint = 0x456AC1; 
            blue.events.onInputDown.add(onDownBlue, this);
            function onDownBlue() {this.setColorIFlagToZero(); blueFlag = 1;}
           
            
            cyan = game.add.sprite(objectsPositions[21].x, objectsPositions[21].y, 'cyan');
            cyan.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cyan.scale.setTo(shadeScaleX, shadeScaleY);
            cyan.inputEnabled = true;
            cyan.tint = 0x45C1C1; 
            cyan.events.onInputDown.add(onDownCyan, this);
            function onDownCyan() {this.setColorIFlagToZero(); cyanFlag = 1;}
            
            
            
            green = game.add.sprite(objectsPositions[22].x, objectsPositions[22].y, 'green');
            green.anchor.setTo(spriteAnchorX, spriteAnchorY);
            green.scale.setTo(shadeScaleX, shadeScaleY);
            green.inputEnabled = true;
            green.tint = 0x51C735;
            green.events.onInputDown.add(onDownGreen, this);
            function onDownGreen() {this.setColorIFlagToZero(); greenFlag = 1;}
            
            
            orange = game.add.sprite(objectsPositions[23].x, objectsPositions[23].y, 'orange');
            orange.anchor.setTo(spriteAnchorX, spriteAnchorY);
            orange.scale.setTo(shadeScaleX, shadeScaleY);
            orange.inputEnabled = true;
            orange.tint = 0xF38932;
            orange.events.onInputDown.add(onDownOrange, this);
            function onDownOrange() {this.setColorIFlagToZero(); orangeFlag = 1;}
           
            
            pink = game.add.sprite(objectsPositions[24].x, objectsPositions[24].y, 'pink');
            pink.anchor.setTo(spriteAnchorX, spriteAnchorY);
            pink.scale.setTo(shadeScaleX, shadeScaleY);
            pink.inputEnabled = true;
            pink.tint = 0xCC3ACC;
            pink.events.onInputDown.add(onDownPink, this);
            function onDownPink() {this.setColorIFlagToZero(); pinkFlag = 1;}
            
            
            red = game.add.sprite(objectsPositions[25].x, objectsPositions[25].y, 'red');
            red.anchor.setTo(spriteAnchorX, spriteAnchorY);
            red.scale.setTo(shadeScaleX, shadeScaleY);
            red.inputEnabled = true;
            red.tint = 0xE32424;
            red.events.onInputDown.add(onDownRed, this);
            function onDownRed() {this.setColorIFlagToZero(); redFlag = 1;}
                
        },
        
        onDowniLetter: function() {
                
            //ice
                    if(iceFlag == 1 && greenFlag == 1 ){var greenice = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transIce');greenice.tint =  0x51C735; greenice.scale.setTo(spriteScaleX, spriteScaleY); 
greenice.anchor.setTo(0.6, 0.6);stickSound.play();}                    
                    
                    if(iceFlag == 1 && blueFlag == 1){var blueice = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transIce'); blueice.tint =  0x456AC1; blueice.scale.setTo(spriteScaleX, spriteScaleY); blueice.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(iceFlag == 1 && orangeFlag == 1){var orangeice = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transIce'); orangeice.tint =  0xF38932; orangeice.scale.setTo(spriteScaleX, spriteScaleY); orangeice.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(iceFlag == 1 && redFlag == 1){var redice = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transIce'); redice.tint =  0xE32424; redice.scale.setTo(spriteScaleX, spriteScaleY); redice.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(iceFlag == 1 && pinkFlag == 1){var pinkice = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transIce'); pinkice.tint =  0xCC3ACC; pinkice.scale.setTo(spriteScaleX, spriteScaleY); pinkice.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(iceFlag == 1 && cyanFlag == 1){var cyanice = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transIce'); cyanice.tint =  0x45C1C1; cyanice.scale.setTo(spriteScaleX, spriteScaleY); cyanice.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //iceCream    
                    if(iceCreamFlag == 1 && greenFlag == 1 ){var greeniceCream = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transIceCream');greeniceCream.tint =  0x51C735; greeniceCream.scale.setTo(spriteScaleX, spriteScaleY); 
greeniceCream.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(iceCreamFlag == 1 && blueFlag == 1){var blueiceCream = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transIceCream'); blueiceCream.tint =  0x456AC1; blueiceCream.scale.setTo(spriteScaleX, spriteScaleY); blueiceCream.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(iceCreamFlag == 1 && orangeFlag == 1){var orangeiceCream = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transIceCream'); orangeiceCream.tint =  0xF38932; orangeiceCream.scale.setTo(spriteScaleX, spriteScaleY); orangeiceCream.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(iceCreamFlag == 1 && redFlag == 1){var rediceCream = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transIceCream'); rediceCream.tint =  0xE32424; rediceCream.scale.setTo(spriteScaleX, spriteScaleY); rediceCream.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(iceCreamFlag == 1 && pinkFlag == 1){var pinkiceCream = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transIceCream'); pinkiceCream.tint =  0xCC3ACC; pinkiceCream.scale.setTo(spriteScaleX, spriteScaleY); pinkiceCream.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(iceCreamFlag == 1 && cyanFlag == 1){var cyaniceCream = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transIceCream'); cyaniceCream.tint =  0x45C1C1; cyaniceCream.scale.setTo(spriteScaleX, spriteScaleY); cyaniceCream.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //iceCreamStick    
                    if(iceCreamStickFlag == 1 && greenFlag == 1 ){var greeniceCreamStick = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transIceCreamStick');greeniceCreamStick.tint =  0x51C735; greeniceCreamStick.scale.setTo(spriteScaleX, spriteScaleY); 
greeniceCreamStick.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(iceCreamStickFlag == 1 && blueFlag == 1){var blueiceCreamStick = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transIceCreamStick'); blueiceCreamStick.tint =  0x456AC1; blueiceCreamStick.scale.setTo(spriteScaleX, spriteScaleY); blueiceCreamStick.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(iceCreamStickFlag == 1 && orangeFlag == 1){var orangeiceCreamStick = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transIceCreamStick'); orangeiceCreamStick.tint =  0xF38932; orangeiceCreamStick.scale.setTo(spriteScaleX, spriteScaleY); orangeiceCreamStick.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(iceCreamStickFlag == 1 && redFlag == 1){var rediceCreamStick = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transIceCreamStick'); rediceCreamStick.tint =  0xE32424; rediceCreamStick.scale.setTo(spriteScaleX, spriteScaleY); rediceCreamStick.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(iceCreamStickFlag == 1 && pinkFlag == 1){var pinkiceCreamStick = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transIceCreamStick'); pinkiceCreamStick.tint =  0xCC3ACC; pinkiceCreamStick.scale.setTo(spriteScaleX, spriteScaleY); pinkiceCreamStick.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(iceCreamStickFlag == 1 && cyanFlag == 1){var cyaniceCreamStick = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transIceCreamStick'); cyaniceCreamStick.tint =  0x45C1C1; cyaniceCreamStick.scale.setTo(spriteScaleX, spriteScaleY); cyaniceCreamStick.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //iceCubes
                    if(iceCubesFlag == 1 && greenFlag == 1 ){var greeniceCubes = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transIceCubes');greeniceCubes.tint =  0x51C735; greeniceCubes.scale.setTo(spriteScaleX, spriteScaleY); 
greeniceCubes.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(iceCubesFlag == 1 && blueFlag == 1){console.log("blueiceCubes plotted");var blueiceCubes = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transIceCubes'); blueiceCubes.tint =  0x456AC1; blueiceCubes.scale.setTo(spriteScaleX, spriteScaleY); blueiceCubes.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(iceCubesFlag == 1 && orangeFlag == 1){var orangeiceCubes = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transIceCubes'); orangeiceCubes.tint =  0xF38932; orangeiceCubes.scale.setTo(spriteScaleX, spriteScaleY); orangeiceCubes.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(iceCubesFlag == 1 && redFlag == 1){var rediceCubes = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transIceCubes'); rediceCubes.tint =  0xE32424; rediceCubes.scale.setTo(spriteScaleX, spriteScaleY); rediceCubes.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(iceCubesFlag == 1 && pinkFlag == 1){var pinkiceCubes = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transIceCubes'); pinkiceCubes.tint =  0xCC3ACC; pinkiceCubes.scale.setTo(spriteScaleX, spriteScaleY); pinkiceCubes.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(iceCubesFlag == 1 && cyanFlag == 1){var cyaniceCubes = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transIceCubes'); cyaniceCubes.tint =  0x45C1C1; cyaniceCubes.scale.setTo(spriteScaleX, spriteScaleY); cyaniceCubes.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //igloo    
                    if(iglooFlag == 1 && greenFlag == 1 ){var greenigloo = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transIgloo');greenigloo.tint =  0x51C735; greenigloo.scale.setTo(spriteScaleX, spriteScaleY); 
greenigloo.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(iglooFlag == 1 && blueFlag == 1){console.log("blueigloo plotted");var blueigloo = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transIgloo'); blueigloo.tint =  0x456AC1; blueigloo.scale.setTo(spriteScaleX, spriteScaleY); blueigloo.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(iglooFlag == 1 && orangeFlag == 1){var orangeigloo = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transIgloo'); orangeigloo.tint =  0xF38932; orangeigloo.scale.setTo(spriteScaleX, spriteScaleY); orangeigloo.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(iglooFlag == 1 && redFlag == 1){var redigloo = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transIgloo'); redigloo.tint =  0xE32424; redigloo.scale.setTo(spriteScaleX, spriteScaleY); redigloo.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(iglooFlag == 1 && pinkFlag == 1){var pinkigloo = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transIgloo'); pinkigloo.tint =  0xCC3ACC; pinkigloo.scale.setTo(spriteScaleX, spriteScaleY); pinkigloo.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(iglooFlag == 1 && cyanFlag == 1){var cyanigloo = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transIgloo'); cyanigloo.tint =  0x45C1C1; cyanigloo.scale.setTo(spriteScaleX, spriteScaleY); cyanigloo.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //iglooDoubleDoor   
                    if(iguanaRightFlag == 1 && greenFlag == 1 ){var greeniglooDoubleDoor = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transIglooDoubleDoor');greeniglooDoubleDoor.tint =  0x51C735; greeniglooDoubleDoor.scale.setTo(spriteScaleX, spriteScaleY); 
greeniglooDoubleDoor.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(iguanaRightFlag == 1 && blueFlag == 1){console.log("blueiglooDoubleDoor plotted");var blueiglooDoubleDoor = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transIglooDoubleDoor'); blueiglooDoubleDoor.tint =  0x456AC1; blueiglooDoubleDoor.scale.setTo(spriteScaleX, spriteScaleY); blueiglooDoubleDoor.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(iguanaRightFlag == 1 && orangeFlag == 1){var orangeiglooDoubleDoor = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transIglooDoubleDoor'); orangeiglooDoubleDoor.tint =  0xF38932; orangeiglooDoubleDoor.scale.setTo(spriteScaleX, spriteScaleY); orangeiglooDoubleDoor.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(iguanaRightFlag == 1 && redFlag == 1){var rediglooDoubleDoor = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transIglooDoubleDoor'); rediglooDoubleDoor.tint =  0xE32424; rediglooDoubleDoor.scale.setTo(spriteScaleX, spriteScaleY); rediglooDoubleDoor.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(iguanaRightFlag == 1 && pinkFlag == 1){var pinkiglooDoubleDoor = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transIglooDoubleDoor'); pinkiglooDoubleDoor.tint =  0xCC3ACC; pinkiglooDoubleDoor.scale.setTo(spriteScaleX, spriteScaleY); pinkiglooDoubleDoor.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(iguanaRightFlag == 1 && cyanFlag == 1){var cyaniglooDoubleDoor = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transIglooDoubleDoor'); cyaniglooDoubleDoor.tint =  0x45C1C1; cyaniglooDoubleDoor.scale.setTo(spriteScaleX, spriteScaleY); cyaniglooDoubleDoor.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //iguana    
                    if(iguanaFlag == 1 && greenFlag == 1 ){var greeniguana = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transIguana');greeniguana.tint =  0x51C735; greeniguana.scale.setTo(spriteScaleX, spriteScaleY); 
greeniguana.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(iguanaFlag == 1 && blueFlag == 1){console.log("blueiguana plotted");var blueiguana = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transIguana'); blueiguana.tint =  0x456AC1; blueiguana.scale.setTo(spriteScaleX, spriteScaleY); blueiguana.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(iguanaFlag == 1 && orangeFlag == 1){var orangeiguana = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transIguana'); orangeiguana.tint =  0xF38932; orangeiguana.scale.setTo(spriteScaleX, spriteScaleY); orangeiguana.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(iguanaFlag == 1 && redFlag == 1){var rediguana = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transIguana'); rediguana.tint =  0xE32424; rediguana.scale.setTo(spriteScaleX, spriteScaleY); rediguana.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(iguanaFlag == 1 && pinkFlag == 1){var pinkiguana = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transIguana'); pinkiguana.tint =  0xCC3ACC; pinkiguana.scale.setTo(spriteScaleX, spriteScaleY); pinkiguana.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(iguanaFlag == 1 && cyanFlag == 1){var cyaniguana = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transIguana'); cyaniguana.tint =  0x45C1C1; cyaniguana.scale.setTo(spriteScaleX, spriteScaleY); cyaniguana.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //iguanaRight    
                    if(iglooDoubleDoorFlag == 1 && greenFlag == 1 ){var greeniguanaRight = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transIguanaRight');greeniguanaRight.tint =  0x51C735; greeniguanaRight.scale.setTo(spriteScaleX, spriteScaleY); 
greeniguanaRight.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(iglooDoubleDoorFlag == 1 && blueFlag == 1){console.log("blueiguanaRight plotted");var blueiguanaRight = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transIguanaRight'); blueiguanaRight.tint =  0x456AC1; blueiguanaRight.scale.setTo(spriteScaleX, spriteScaleY); blueiguanaRight.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(iglooDoubleDoorFlag == 1 && orangeFlag == 1){var orangeiguanaRight = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transIguanaRight'); orangeiguanaRight.tint =  0xF38932; orangeiguanaRight.scale.setTo(spriteScaleX, spriteScaleY); orangeiguanaRight.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(iglooDoubleDoorFlag == 1 && redFlag == 1){var rediguanaRight = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transIguanaRight'); rediguanaRight.tint =  0xE32424; rediguanaRight.scale.setTo(spriteScaleX, spriteScaleY); rediguanaRight.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(iglooDoubleDoorFlag == 1 && pinkFlag == 1){var pinkiguanaRight = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transIguanaRight'); pinkiguanaRight.tint =  0xCC3ACC; pinkiguanaRight.scale.setTo(spriteScaleX, spriteScaleY); pinkiguanaRight.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(iglooDoubleDoorFlag == 1 && cyanFlag == 1){var cyaniguanaRight = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transIguanaRight'); cyaniguanaRight.tint =  0x45C1C1; cyaniguanaRight.scale.setTo(spriteScaleX, spriteScaleY); cyaniguanaRight.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //ink    
                    if(inkFlag == 1 && greenFlag == 1 ){var greenink = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transInk');greenink.tint =  0x51C735; greenink.scale.setTo(spriteScaleX, spriteScaleY); 
greenink.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(inkFlag == 1 && blueFlag == 1){console.log("blueink plotted");var blueink = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transInk'); blueink.tint =  0x456AC1; blueink.scale.setTo(spriteScaleX, spriteScaleY); blueink.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(inkFlag == 1 && orangeFlag == 1){var orangeink = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transInk'); orangeink.tint =  0xF38932; orangeink.scale.setTo(spriteScaleX, spriteScaleY); orangeink.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(inkFlag == 1 && redFlag == 1){var redink = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transInk'); redink.tint =  0xE32424; redink.scale.setTo(spriteScaleX, spriteScaleY); redink.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(inkFlag == 1 && pinkFlag == 1){var pinkink = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transInk'); pinkink.tint =  0xCC3ACC; pinkink.scale.setTo(spriteScaleX, spriteScaleY); pinkink.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(inkFlag == 1 && cyanFlag == 1){var cyanink = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transInk'); cyanink.tint =  0x45C1C1; cyanink.scale.setTo(spriteScaleX, spriteScaleY); cyanink.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //inkRight 
                    if(inkRightFlag == 1 && greenFlag == 1 ){var greeninkRight = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transInkRight');greeninkRight.tint =  0x51C735; greeninkRight.scale.setTo(spriteScaleX, spriteScaleY); 
greeninkRight.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(inkRightFlag == 1 && blueFlag == 1){console.log("blueinkRight plotted");var blueinkRight = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transInkRight'); blueinkRight.tint =  0x456AC1; blueinkRight.scale.setTo(spriteScaleX, spriteScaleY); blueinkRight.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(inkRightFlag == 1 && orangeFlag == 1){var orangeinkRight = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transInkRight'); orangeinkRight.tint =  0xF38932; orangeinkRight.scale.setTo(spriteScaleX, spriteScaleY); orangeinkRight.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(inkRightFlag == 1 && redFlag == 1){var redinkRight = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transInkRight'); redinkRight.tint =  0xE32424; redinkRight.scale.setTo(spriteScaleX, spriteScaleY); redinkRight.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(inkRightFlag == 1 && pinkFlag == 1){var pinkinkRight = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transInkRight'); pinkinkRight.tint =  0xCC3ACC; pinkinkRight.scale.setTo(spriteScaleX, spriteScaleY); pinkinkRight.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(inkRightFlag == 1 && cyanFlag == 1){var cyaninkRight = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transInkRight'); cyaninkRight.tint =  0x45C1C1; cyaninkRight.scale.setTo(spriteScaleX, spriteScaleY); cyaninkRight.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
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
            
            game.world.bringToTop(iLetter);
            
            game.world.bringToTop(blue);
            game.world.bringToTop(green);
            game.world.bringToTop(red);
            game.world.bringToTop(cyan);
            game.world.bringToTop(orange);
            game.world.bringToTop(pink);
            
            game.world.bringToTop(cloud1);
            game.world.bringToTop(cloud2);
            game.world.bringToTop(cloud3);
            
            game.world.bringToTop(ice);
            game.world.bringToTop(iceCream);
            game.world.bringToTop(iceCreamStick);
            game.world.bringToTop(iceCubes);
            game.world.bringToTop(igloo);
            game.world.bringToTop(iglooDoubleDoor);
            game.world.bringToTop(iguana);
            game.world.bringToTop(iguanaRight);
            game.world.bringToTop(ink);
            game.world.bringToTop(inkRight);
            
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
            
            
            
            if(iceFlag == 1){ice.angle += 2;}
            if(iceCreamFlag == 1){iceCream.angle += 2;}
            if(iceCreamStickFlag == 1){iceCreamStick.angle += 2;}
            if(iceCubesFlag == 1){iceCubes.angle += 2;}
            if(iglooFlag == 1){igloo.angle += 2;}
            if(iguanaRightFlag == 1){iglooDoubleDoor.angle += 2;}
            if(iguanaFlag == 1){iguana.angle += 2;}
            if(iglooDoubleDoorFlag == 1){iguanaRight.angle += 2;}
            if(inkFlag == 1){ink.angle += 2;}
            if(inkRightFlag == 1){inkRight.angle += 2;}
            
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
            
            if(iObjectClicked == 10){
            
                askForLevelJ = 1;
                game.jButton = game.add.sprite(1170, 730, 'jButton');             
                game.jButton.scale.setTo(1, 1); 
                game.jButton.anchor.setTo(spriteAnchorX, spriteAnchorY);
                
            }
            
        if(askForLevelJ == 1){
            
            game.world.bringToTop(game.jButton);
            game.jButton.inputEnabled = true;
            game.jButton.events.onInputDown.add(onDownJ, this);
            function onDownJ() {
            
                //start next level
                
                this.setIGlobalVaribalesToZero();
                game.state.start('J');
                
            }
        }
           
        },
        
        resetISpriteFlag: function(){
            
            iceFlag = 0;iceCreamFlag = 0;iceCreamStickFlag = 0;iguanaRightFlag = 0;iceCubesFlag = 0;
            iglooFlag = 0;iguanaFlag = 0;iglooDoubleDoorFlag = 0;inkFlag = 0;inkRightFlag = 0;
            camelFlag = 0;candleFlag = 0;carFlag = 0;catFlag = 0;cheeseFlag = 0;cherryFlag = 0;
            clockFlag = 0;cowFlag = 0;crabFlag = 0;crownFlag = 0;

            ice.angle = 0;iceCream.angle = 0;iceCreamStick.angle = 0;iglooDoubleDoor.angle = 0;iceCubes.angle = 0;
            igloo.angle = 0;iguana.angle = 0;iguanaRight.angle = 0;ink.angle = 0;inkRight.angle = 0;
            camel.angle = 0;candle.angle = 0;car.angle = 0;cat.angle = 0;cheese.angle = 0;
            cherry.angle = 0;crown.angle = 0;clock.angle = 0;cow.angle = 0;crab.angle = 0;
           
        },
       
        setColorIFlagToZero: function(){
            
            bubbleSound.play(); blueFlag = 0;greenFlag = 0; redFlag = 0; cyanFlag = 0; pinkFlag = 0; orangeFlag = 0;
        },
        
        setIGlobalVaribalesToZero: function(){
            
            
            iceFlag = 0;iceCreamFlag = 0;iceCreamStickFlag = 0;iguanaRightFlag = 0;iceCubesFlag = 0;
            iglooFlag = 0;iguanaFlag = 0;iglooDoubleDoorFlag = 0;inkFlag = 0;inkRightFlag = 0;
            camelFlag = 0;candleFlag = 0;carFlag = 0;catFlag = 0;cheeseFlag = 0;cherryFlag = 0;
            clockFlag = 0;cowFlag = 0;crabFlag = 0;crownFlag = 0;



            greenFlag = 0;blueFlag = 0;orangeFlag = 0;redFlag = 0;pinkFlag = 0;cyanFlag = 0;
        }
        
        
    };