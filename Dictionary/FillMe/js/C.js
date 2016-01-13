        
    var cObjectClicked = 0;
    var askForLevelD = 0;
    
    
    var deerFlag = 0;
    var donutFlag = 0;
    var diamondFlag = 0;            
    var diceFlag = 0;
    var dinosaurFlag = 0;
    var dogFlag = 0;
    var dollFlag = 0;
    var dragonFruitFlag = 0;
    var dolphinFlag = 0;
    var duckFlag = 0;
    
    
    var C = {

        preload: function () {

            //setting default path for assets to be used in game
            this.load.path = './assets/C/';
            
            
            
            //loading shades
            this.load.image("blue", "blue.png");
            this.load.image("cyan", "cyan.png");
            this.load.image("green", "green.png");
            this.load.image("orange", "orange.png");
            this.load.image("pink", "pink.png");
            this.load.image("red", "red.png");
    
            this.load.image("transCamel", "transCamel.png");
            this.load.image("transCandle", "transCandle.png");
            this.load.image("transCar", "transCar.png");
            this.load.image("transCat", "transCat.png");
            this.load.image("transCheese", "transCheese.png");
            this.load.image("transCherry", "transCherry.png");
            this.load.image("transClock", "transClock.png");
            this.load.image("transCow", "transCow.png");
            this.load.image("transCrab", "transCrab.png");
            this.load.image("transCrown", "transCrown.png");
            
            
            //loading assets for the level  C
            this.load.image("bg", "bg.png");
            this.load.image("cLetter", "cLetter.png");
            this.load.image("dButton", "dButton.png");
            
            /*this.load.image("rightArrow", "rightArrow.png");
            this.load.image("leftArrow", "leftArrow.png");
        */
            
            //objects starting from C and objects not starting from C 
              
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
            
            this.load.image("deer", "deer.png");
            this.load.image("donut", "donut.png");
            this.load.image("diamond", "diamond.png");
            this.load.image("dice", "dice.png");
            this.load.image("dinosaur", "dinosaur.png");
            this.load.image("dog", "dog.png");
            this.load.image("doll", "doll.png");
            this.load.image("dragonFruit", "dragonFruit.png");
            this.load.image("dolphin", "dolphin.png");
            this.load.image("duck", "duck.png");
            
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
                
            
            
            
            //Main letter C
            cLetter = game.add.sprite(gameMinWidth, gameMinHeight, 'cLetter');
            cLetter.inputEnabled = true;
            cLetter.events.onInputDown.add(this.onDownCletter, this);
            
            
            
            //Objects starting from C
                    
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
            
            
            
            
            deer = game.add.sprite(objectsPositions[0].x, objectsPositions[0].y, 'deer');
            deer.anchor.setTo(spriteAnchorX, spriteAnchorY);
            deer.scale.setTo(spriteScaleX, spriteScaleY);
            deer.inputEnabled = true;
            deer.events.onInputDown.add(onDownDeer, this);
            function onDownDeer() {this.resetCSpriteFlag(); deerFlag = 1;}

            
            
            
            donut = game.add.sprite(objectsPositions[10].x, objectsPositions[10].y, 'donut');
            donut.anchor.setTo(spriteAnchorX, spriteAnchorY);
            donut.scale.setTo(spriteScaleX, spriteScaleY);
            donut.inputEnabled = true;
            donut.events.onInputDown.add(onDowndonut, this);
            function onDowndonut() {this.resetCSpriteFlag(); donutFlag = 1;}

            
            
            
            diamond = game.add.sprite(objectsPositions[1].x, objectsPositions[1].y, 'diamond');
            diamond.anchor.setTo(spriteAnchorX, spriteAnchorY);
            diamond.scale.setTo(spriteScaleX, spriteScaleY);
            diamond.inputEnabled = true;
            diamond.events.onInputDown.add(onDownDiamond, this);
            function onDownDiamond() {this.resetCSpriteFlag(); diamondFlag = 1;}
            
            
            
            
            dice = game.add.sprite(objectsPositions[11].x, objectsPositions[11].y, 'dice');
            dice.anchor.setTo(spriteAnchorX, spriteAnchorY);
            dice.scale.setTo(spriteScaleX, spriteScaleY);
            dice.inputEnabled = true;
            dice.events.onInputDown.add(onDownDice, this);
            function onDownDice() {this.resetCSpriteFlag(); diceFlag = 1;}
            
            
            
            dinosaur = game.add.sprite(objectsPositions[2].x, objectsPositions[2].y, 'dinosaur');
            dinosaur.anchor.setTo(spriteAnchorX, spriteAnchorY);
            dinosaur.scale.setTo(spriteScaleX, spriteScaleY);
            dinosaur.inputEnabled = true;
            dinosaur.events.onInputDown.add(onDownDinosaur, this);
            function onDownDinosaur() {this.resetCSpriteFlag(); dinosaurFlag = 1;}
            
            dog = game.add.sprite(objectsPositions[12].x, objectsPositions[12].y, 'dog');
            dog.anchor.setTo(spriteAnchorX, spriteAnchorY);
            dog.scale.setTo(spriteScaleX, spriteScaleY);
            dog.inputEnabled = true;
            dog.events.onInputDown.add(onDownDog, this);
            function onDownDog() {this.resetCSpriteFlag(); dogFlag = 1;}

            
            doll = game.add.sprite(objectsPositions[3].x, objectsPositions[3].y, 'doll');
            doll.anchor.setTo(spriteAnchorX, spriteAnchorY);
            doll.scale.setTo(spriteScaleX, spriteScaleY);
            doll.inputEnabled = true;  
            doll.events.onInputDown.add(onDownDoll, this);
            function onDownDoll() {this.resetCSpriteFlag(); dollFlag = 1;}
            
            
            dragonFruit = game.add.sprite(objectsPositions[13].x, objectsPositions[13].y, 'dragonFruit');
            dragonFruit.anchor.setTo(spriteAnchorX, spriteAnchorY);
            dragonFruit.scale.setTo(spriteScaleX, spriteScaleY);
            dragonFruit.inputEnabled = true;
            dragonFruit.events.onInputDown.add(onDownDragonFruit, this);
            function onDownDragonFruit() {this.resetCSpriteFlag(); dragonFruitFlag = 1;}
            
            
            dolphin = game.add.sprite(objectsPositions[4].x, objectsPositions[4].y, 'dolphin');
            dolphin.anchor.setTo(spriteAnchorX, spriteAnchorY);
            dolphin.scale.setTo(spriteScaleX, spriteScaleY);
            dolphin.inputEnabled = true;
            dolphin.events.onInputDown.add(onDowndolphin, this);
            function onDowndolphin() {this.resetCSpriteFlag(); dolphinFlag = 1;}
            
            
            duck = game.add.sprite(objectsPositions[14].x, objectsPositions[14].y, 'duck');
            duck.anchor.setTo(spriteAnchorX, spriteAnchorY);
            duck.scale.setTo(spriteScaleX, spriteScaleY);
            duck.inputEnabled = true;
            duck.events.onInputDown.add(onDownDuck, this);
            function onDownDuck() {this.resetCSpriteFlag(); duckFlag = 1;}
            
            
            
            camel = game.add.sprite(objectsPositions[5].x, objectsPositions[5].y, 'camel');
            camel.anchor.setTo(spriteAnchorX, spriteAnchorY);
            camel.scale.setTo(spriteScaleX, spriteScaleY);
            camel.inputEnabled = true;
            camel.events.onInputDown.add(onDownCamel, this);
            function onDownCamel() {this.resetCSpriteFlag(); camelFlag = 1; cObjectClicked++;}
            
            
            
            
            candle = game.add.sprite(objectsPositions[15].x, objectsPositions[15].y, 'candle');
            candle.anchor.setTo(spriteAnchorX, spriteAnchorY);
            candle.scale.setTo(spriteScaleX, spriteScaleY);
            candle.inputEnabled = true;
            candle.events.onInputDown.add(onDownCandle, this);
            function onDownCandle() {this.resetCSpriteFlag(); candleFlag = 1; cObjectClicked++;}
            
            
            car = game.add.sprite(objectsPositions[6].x, objectsPositions[6].y, 'car');
            car.anchor.setTo(spriteAnchorX, spriteAnchorY);
            car.scale.setTo(spriteScaleX, spriteScaleY);
            car.inputEnabled = true;
            car.events.onInputDown.add(onDownCar, this);
            function onDownCar() {this.resetCSpriteFlag(); carFlag = 1; cObjectClicked++;}
            
            cat = game.add.sprite(objectsPositions[16].x, objectsPositions[16].y, 'cat');
            cat.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cat.scale.setTo(spriteScaleX, spriteScaleY);
            cat.inputEnabled = true;
            cat.events.onInputDown.add(onDownCat, this);
            function onDownCat() {this.resetCSpriteFlag(); catFlag = 1; cObjectClicked++;}
            
            
            cheese = game.add.sprite(objectsPositions[7].x, objectsPositions[7].y, 'cheese');
            cheese.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cheese.scale.setTo(spriteScaleX, spriteScaleY);
            cheese.inputEnabled = true;
            cheese.events.onInputDown.add(onDownCheese, this);
            function onDownCheese() {this.resetCSpriteFlag(); cheeseFlag = 1; cObjectClicked++;}
            
            
            cherry = game.add.sprite(objectsPositions[17].x, objectsPositions[17].y, 'cherry');
            cherry.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cherry.scale.setTo(spriteScaleX, spriteScaleY);
            cherry.inputEnabled = true;
            cherry.events.onInputDown.add(onDownCherry, this);
            function onDownCherry() {this.resetCSpriteFlag(); cherryFlag = 1; cObjectClicked++;}
            
            
            clock = game.add.sprite(objectsPositions[8].x, objectsPositions[8].y, 'clock');
            clock.anchor.setTo(spriteAnchorX, spriteAnchorY);
            clock.scale.setTo(spriteScaleX, spriteScaleY);
            clock.inputEnabled = true;
            clock.events.onInputDown.add(onDownClock, this);
            function onDownClock() {this.resetCSpriteFlag(); clockFlag = 1; cObjectClicked++;}
            
            
            
            cow = game.add.sprite(objectsPositions[18].x, objectsPositions[18].y, 'cow');
            cow.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cow.scale.setTo(spriteScaleX, spriteScaleY);
            cow.inputEnabled = true;
            cow.events.onInputDown.add(onDownCow, this);
            function onDownCow() {this.resetCSpriteFlag(); cowFlag = 1; cObjectClicked++;}
            
            
            crab = game.add.sprite(objectsPositions[9].x, objectsPositions[9].y, 'crab');
            crab.anchor.setTo(spriteAnchorX, spriteAnchorY);
            crab.scale.setTo(spriteScaleX, spriteScaleY);
            crab.inputEnabled = true;
            crab.events.onInputDown.add(onDownCrab, this);
            function onDownCrab() {this.resetCSpriteFlag(); crabFlag = 1; cObjectClicked++;}
            
            
            crown = game.add.sprite(objectsPositions[19].x, objectsPositions[19].y, 'crown');
            crown.anchor.setTo(spriteAnchorX, spriteAnchorY);
            crown.scale.setTo(spriteScaleX, spriteScaleY);
            crown.inputEnabled = true;
            crown.events.onInputDown.add(onDownCrown, this);
            function onDownCrown() {this.resetCSpriteFlag(); crownFlag = 1; cObjectClicked++;}
            
            
            /*game.rightArrow = game.add.sprite(1170, 730, 'rightArrow');             
            game.rightArrow.scale.setTo(1, 1); 
            game.rightArrow.anchor.setTo(spriteAnchorX, spriteAnchorY);
            game.rightArrow.inputEnabled = true;
            game.rightArrow.events.onInputDown.add(onDownRightArrow, this);
            function onDownRightArrow() {this.setCGlobalVaribalesToZero();game.state.start('D');}
            
            game.leftArrow = game.add.sprite(1070, 730, 'leftArrow');             
            game.leftArrow.scale.setTo(1, 1); 
            game.leftArrow.anchor.setTo(spriteAnchorX, spriteAnchorY);
            game.leftArrow.inputEnabled = true;
            game.leftArrow.events.onInputDown.add(onDownLeftArrow, this);
            function onDownLeftArrow() {this.setCGlobalVaribalesToZero();game.state.start('B');}
  */
            
            //Color shades
            blue = game.add.sprite(objectsPositions[20].x, objectsPositions[20].y, 'blue');
            blue.anchor.setTo(spriteAnchorX, spriteAnchorY);
            blue.scale.setTo(shadeScaleX, shadeScaleY);
            blue.inputEnabled = true;
            blue.tint = 0x456AC1; 
            blue.events.onInputDown.add(onDownBlue, this);
            function onDownBlue() {this.setColorCFlagToZero(); blueFlag = 1;}
           
            
            cyan = game.add.sprite(objectsPositions[21].x, objectsPositions[21].y, 'cyan');
            cyan.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cyan.scale.setTo(shadeScaleX, shadeScaleY);
            cyan.inputEnabled = true;
            cyan.tint = 0x45C1C1; 
            cyan.events.onInputDown.add(onDownCyan, this);
            function onDownCyan() {this.setColorCFlagToZero(); cyanFlag = 1;}
            
            
            
            green = game.add.sprite(objectsPositions[22].x, objectsPositions[22].y, 'green');
            green.anchor.setTo(spriteAnchorX, spriteAnchorY);
            green.scale.setTo(shadeScaleX, shadeScaleY);
            green.inputEnabled = true;
            green.tint = 0x51C735;
            green.events.onInputDown.add(onDownGreen, this);
            function onDownGreen() {this.setColorCFlagToZero(); greenFlag = 1;}
            
            
            orange = game.add.sprite(objectsPositions[23].x, objectsPositions[23].y, 'orange');
            orange.anchor.setTo(spriteAnchorX, spriteAnchorY);
            orange.scale.setTo(shadeScaleX, shadeScaleY);
            orange.inputEnabled = true;
            orange.tint = 0xF38932;
            orange.events.onInputDown.add(onDownOrange, this);
            function onDownOrange() {this.setColorCFlagToZero(); orangeFlag = 1;}
           
            
            pink = game.add.sprite(objectsPositions[24].x, objectsPositions[24].y, 'pink');
            pink.anchor.setTo(spriteAnchorX, spriteAnchorY);
            pink.scale.setTo(shadeScaleX, shadeScaleY);
            pink.inputEnabled = true;
            pink.tint = 0xCC3ACC;
            pink.events.onInputDown.add(onDownPink, this);
            function onDownPink() {this.setColorCFlagToZero(); pinkFlag = 1;}
            
            
            red = game.add.sprite(objectsPositions[25].x, objectsPositions[25].y, 'red');
            red.anchor.setTo(spriteAnchorX, spriteAnchorY);
            red.scale.setTo(shadeScaleX, shadeScaleY);
            red.inputEnabled = true;
            red.tint = 0xE32424;
            red.events.onInputDown.add(onDownRed, this);
            function onDownRed() {this.setColorCFlagToZero(); redFlag = 1;}
                
        },
        
        onDownCletter: function() {
                
            //camel
                    if(camelFlag == 1 && greenFlag == 1 ){var greencamel = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transCamel');greencamel.tint =  0x51C735; greencamel.scale.setTo(spriteScaleX, spriteScaleY); 
greencamel.anchor.setTo(0.6, 0.6);stickSound.play();}                    
                    
                    if(camelFlag == 1 && blueFlag == 1){var bluecamel = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transCamel'); bluecamel.tint =  0x456AC1; bluecamel.scale.setTo(spriteScaleX, spriteScaleY); bluecamel.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(camelFlag == 1 && orangeFlag == 1){var orangecamel = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transCamel'); orangecamel.tint =  0xF38932; orangecamel.scale.setTo(spriteScaleX, spriteScaleY); orangecamel.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(camelFlag == 1 && redFlag == 1){var redcamel = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transCamel'); redcamel.tint =  0xE32424; redcamel.scale.setTo(spriteScaleX, spriteScaleY); redcamel.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(camelFlag == 1 && pinkFlag == 1){var pinkcamel = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transCamel'); pinkcamel.tint =  0xCC3ACC; pinkcamel.scale.setTo(spriteScaleX, spriteScaleY); pinkcamel.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(camelFlag == 1 && cyanFlag == 1){var cyancamel = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transCamel'); cyancamel.tint =  0x45C1C1; cyancamel.scale.setTo(spriteScaleX, spriteScaleY); cyancamel.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //candle    
                    if(candleFlag == 1 && greenFlag == 1 ){var greencandle = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transCandle');greencandle.tint =  0x51C735; greencandle.scale.setTo(spriteScaleX, spriteScaleY); 
greencandle.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(candleFlag == 1 && blueFlag == 1){var bluecandle = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transCandle'); bluecandle.tint =  0x456AC1; bluecandle.scale.setTo(spriteScaleX, spriteScaleY); bluecandle.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(candleFlag == 1 && orangeFlag == 1){var orangecandle = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transCandle'); orangecandle.tint =  0xF38932; orangecandle.scale.setTo(spriteScaleX, spriteScaleY); orangecandle.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(candleFlag == 1 && redFlag == 1){var redcandle = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transCandle'); redcandle.tint =  0xE32424; redcandle.scale.setTo(spriteScaleX, spriteScaleY); redcandle.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(candleFlag == 1 && pinkFlag == 1){var pinkcandle = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transCandle'); pinkcandle.tint =  0xCC3ACC; pinkcandle.scale.setTo(spriteScaleX, spriteScaleY); pinkcandle.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(candleFlag == 1 && cyanFlag == 1){var cyancandle = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transCandle'); cyancandle.tint =  0x45C1C1; cyancandle.scale.setTo(spriteScaleX, spriteScaleY); cyancandle.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //car    
                    if(carFlag == 1 && greenFlag == 1 ){var greencar = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transCar');greencar.tint =  0x51C735; greencar.scale.setTo(spriteScaleX, spriteScaleY); 
greencar.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(carFlag == 1 && blueFlag == 1){var bluecar = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transCar'); bluecar.tint =  0x456AC1; bluecar.scale.setTo(spriteScaleX, spriteScaleY); bluecar.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(carFlag == 1 && orangeFlag == 1){var orangecar = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transCar'); orangecar.tint =  0xF38932; orangecar.scale.setTo(spriteScaleX, spriteScaleY); orangecar.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(carFlag == 1 && redFlag == 1){var redcar = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transCar'); redcar.tint =  0xE32424; redcar.scale.setTo(spriteScaleX, spriteScaleY); redcar.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(carFlag == 1 && pinkFlag == 1){var pinkcar = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transCar'); pinkcar.tint =  0xCC3ACC; pinkcar.scale.setTo(spriteScaleX, spriteScaleY); pinkcar.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(carFlag == 1 && cyanFlag == 1){var cyancar = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transCar'); cyancar.tint =  0x45C1C1; cyancar.scale.setTo(spriteScaleX, spriteScaleY); cyancar.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //cat
                    if(catFlag == 1 && greenFlag == 1 ){var greencat = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transCat');greencat.tint =  0x51C735; greencat.scale.setTo(spriteScaleX, spriteScaleY); 
greencat.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(catFlag == 1 && blueFlag == 1){console.log("bluecat plotted");var bluecat = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transCat'); bluecat.tint =  0x456AC1; bluecat.scale.setTo(spriteScaleX, spriteScaleY); bluecat.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(catFlag == 1 && orangeFlag == 1){var orangecat = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transCat'); orangecat.tint =  0xF38932; orangecat.scale.setTo(spriteScaleX, spriteScaleY); orangecat.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(catFlag == 1 && redFlag == 1){var redcat = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transCat'); redcat.tint =  0xE32424; redcat.scale.setTo(spriteScaleX, spriteScaleY); redcat.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(catFlag == 1 && pinkFlag == 1){var pinkcat = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transCat'); pinkcat.tint =  0xCC3ACC; pinkcat.scale.setTo(spriteScaleX, spriteScaleY); pinkcat.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(catFlag == 1 && cyanFlag == 1){var cyancat = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transCat'); cyancat.tint =  0x45C1C1; cyancat.scale.setTo(spriteScaleX, spriteScaleY); cyancat.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //cheese    
                    if(cheeseFlag == 1 && greenFlag == 1 ){var greencheese = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transCheese');greencheese.tint =  0x51C735; greencheese.scale.setTo(spriteScaleX, spriteScaleY); 
greencheese.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(cheeseFlag == 1 && blueFlag == 1){console.log("bluecheese plotted");var bluecheese = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transCheese'); bluecheese.tint =  0x456AC1; bluecheese.scale.setTo(spriteScaleX, spriteScaleY); bluecheese.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(cheeseFlag == 1 && orangeFlag == 1){var orangecheese = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transCheese'); orangecheese.tint =  0xF38932; orangecheese.scale.setTo(spriteScaleX, spriteScaleY); orangecheese.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(cheeseFlag == 1 && redFlag == 1){var redcheese = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transCheese'); redcheese.tint =  0xE32424; redcheese.scale.setTo(spriteScaleX, spriteScaleY); redcheese.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(cheeseFlag == 1 && pinkFlag == 1){var pinkcheese = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transCheese'); pinkcheese.tint =  0xCC3ACC; pinkcheese.scale.setTo(spriteScaleX, spriteScaleY); pinkcheese.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(cheeseFlag == 1 && cyanFlag == 1){var cyancheese = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transCheese'); cyancheese.tint =  0x45C1C1; cyancheese.scale.setTo(spriteScaleX, spriteScaleY); cyancheese.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //cherry   
                    if(cherryFlag == 1 && greenFlag == 1 ){var greencherry = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transCherry');greencherry.tint =  0x51C735; greencherry.scale.setTo(spriteScaleX, spriteScaleY); 
greencherry.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(cherryFlag == 1 && blueFlag == 1){console.log("bluecherry plotted");var bluecherry = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transCherry'); bluecherry.tint =  0x456AC1; bluecherry.scale.setTo(spriteScaleX, spriteScaleY); bluecherry.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(cherryFlag == 1 && orangeFlag == 1){var orangecherry = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transCherry'); orangecherry.tint =  0xF38932; orangecherry.scale.setTo(spriteScaleX, spriteScaleY); orangecherry.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(cherryFlag == 1 && redFlag == 1){var redcherry = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transCherry'); redcherry.tint =  0xE32424; redcandle.scale.setTo(spriteScaleX, spriteScaleY); redcherry.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(cherryFlag == 1 && pinkFlag == 1){var pinkcherry = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transCherry'); pinkcherry.tint =  0xCC3ACC; pinkcherry.scale.setTo(spriteScaleX, spriteScaleY); pinkcherry.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(cherryFlag == 1 && cyanFlag == 1){var cyancherry = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transCherry'); cyancherry.tint =  0x45C1C1; cyancherry.scale.setTo(spriteScaleX, spriteScaleY); cyancherry.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //clock    
                    if(clockFlag == 1 && greenFlag == 1 ){var greenclock = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transClock');greenclock.tint =  0x51C735; greenclock.scale.setTo(spriteScaleX, spriteScaleY); 
greenclock.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(clockFlag == 1 && blueFlag == 1){console.log("blueclock plotted");var blueclock = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transClock'); blueclock.tint =  0x456AC1; blueclock.scale.setTo(spriteScaleX, spriteScaleY); blueclock.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(clockFlag == 1 && orangeFlag == 1){var orangeclock = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transClock'); orangeclock.tint =  0xF38932; orangeclock.scale.setTo(spriteScaleX, spriteScaleY); orangeclock.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(clockFlag == 1 && redFlag == 1){var redclock = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transClock'); redclock.tint =  0xE32424; redclock.scale.setTo(spriteScaleX, spriteScaleY); redclock.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(clockFlag == 1 && pinkFlag == 1){var pinkclock = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transClock'); pinkclock.tint =  0xCC3ACC; pinkclock.scale.setTo(spriteScaleX, spriteScaleY); pinkclock.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(clockFlag == 1 && cyanFlag == 1){var cyanclock = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transClock'); cyanclock.tint =  0x45C1C1; cyanclock.scale.setTo(spriteScaleX, spriteScaleY); cyanclock.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //cow    
                    if(cowFlag == 1 && greenFlag == 1 ){var greencow = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transCow');greencow.tint =  0x51C735; greencow.scale.setTo(spriteScaleX, spriteScaleY); 
greencow.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(cowFlag == 1 && blueFlag == 1){console.log("bluecow plotted");var bluecow = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transCow'); bluecow.tint =  0x456AC1; bluecow.scale.setTo(spriteScaleX, spriteScaleY); bluecow.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(cowFlag == 1 && orangeFlag == 1){var orangecow = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transCow'); orangecow.tint =  0xF38932; orangecow.scale.setTo(spriteScaleX, spriteScaleY); orangecow.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(cowFlag == 1 && redFlag == 1){var redcow = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transCow'); redcow.tint =  0xE32424; redcow.scale.setTo(spriteScaleX, spriteScaleY); redcow.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(cowFlag == 1 && pinkFlag == 1){var pinkcow = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transCow'); pinkcow.tint =  0xCC3ACC; pinkcow.scale.setTo(spriteScaleX, spriteScaleY); pinkcow.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(cowFlag == 1 && cyanFlag == 1){var cyancow = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transCow'); cyancow.tint =  0x45C1C1; cyancow.scale.setTo(spriteScaleX, spriteScaleY); cyancow.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //crab    
                    if(crabFlag == 1 && greenFlag == 1 ){var greencrab = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transCrab');greencrab.tint =  0x51C735; greencrab.scale.setTo(spriteScaleX, spriteScaleY); 
greencrab.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(crabFlag == 1 && blueFlag == 1){console.log("bluecrab plotted");var bluecrab = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transCrab'); bluecrab.tint =  0x456AC1; bluecrab.scale.setTo(spriteScaleX, spriteScaleY); bluecrab.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(crabFlag == 1 && orangeFlag == 1){var orangecrab = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transCrab'); orangecrab.tint =  0xF38932; orangecrab.scale.setTo(spriteScaleX, spriteScaleY); orangecrab.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(crabFlag == 1 && redFlag == 1){var redcrab = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transCrab'); redcrab.tint =  0xE32424; redcrab.scale.setTo(spriteScaleX, spriteScaleY); redcrab.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(crabFlag == 1 && pinkFlag == 1){var pinkcrab = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transCrab'); pinkcrab.tint =  0xCC3ACC; pinkcrab.scale.setTo(spriteScaleX, spriteScaleY); pinkcrab.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(crabFlag == 1 && cyanFlag == 1){var cyancrab = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transCrab'); cyancrab.tint =  0x45C1C1; cyancrab.scale.setTo(spriteScaleX, spriteScaleY); cyancrab.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //crown 
                    if(crownFlag == 1 && greenFlag == 1 ){var greencrown = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transCrown');greencrown.tint =  0x51C735; greencrown.scale.setTo(spriteScaleX, spriteScaleY); 
greencrown.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(crownFlag == 1 && blueFlag == 1){console.log("bluecrown plotted");var bluecrown = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transCrown'); bluecrown.tint =  0x456AC1; bluecrown.scale.setTo(spriteScaleX, spriteScaleY); bluecrown.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(crownFlag == 1 && orangeFlag == 1){var orangecrown = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transCrown'); orangecrown.tint =  0xF38932; orangecrown.scale.setTo(spriteScaleX, spriteScaleY); orangecrown.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(crownFlag == 1 && redFlag == 1){var redcrown = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transCrown'); redcrown.tint =  0xE32424; redcrown.scale.setTo(spriteScaleX, spriteScaleY); redcrown.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(crownFlag == 1 && pinkFlag == 1){var pinkcrown = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transCrown'); pinkcrown.tint =  0xCC3ACC; pinkcrown.scale.setTo(spriteScaleX, spriteScaleY); pinkcrown.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(crownFlag == 1 && cyanFlag == 1){var cyancrown = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transCrown'); cyancrown.tint =  0x45C1C1; cyancrown.scale.setTo(spriteScaleX, spriteScaleY); cyancrown.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //For Wrong Objects
            
if(dogFlag == 1 || deerFlag == 1 || donutFlag == 1 || diamondFlag == 1 || diceFlag == 1 || dinosaurFlag == 1 || dollFlag == 1 || dragonFruitFlag == 1 || dolphinFlag == 1 || duckFlag == 1){var blackSplash = game.add.sprite(game.input.mousePointer.x,game.input.mousePointer.y,'blackSplash');
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
            
            game.world.bringToTop(cLetter);
            
            game.world.bringToTop(blue);
            game.world.bringToTop(green);
            game.world.bringToTop(red);
            game.world.bringToTop(cyan);
            game.world.bringToTop(orange);
            game.world.bringToTop(pink);
            
            game.world.bringToTop(cloud1);
            game.world.bringToTop(cloud2);
            game.world.bringToTop(cloud3);
            
            game.world.bringToTop(dog);
            game.world.bringToTop(donut);
            game.world.bringToTop(diamond);
            game.world.bringToTop(deer);
            game.world.bringToTop(dice);
            game.world.bringToTop(doll);
            game.world.bringToTop(dragonFruit);
            game.world.bringToTop(dolphin);
            game.world.bringToTop(duck);
            
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
            
            
           /* game.world.bringToTop(game.rightArrow);
            game.world.bringToTop(game.leftArrow);*/
            game.world.bringToTop(crown);
            
            
            if(dogFlag == 1){dog.angle += 2;}
            if(deerFlag == 1){deer.angle += 2;}
            if(donutFlag == 1){donut.angle += 2;}
            if(diamondFlag == 1){diamond.angle += 2;}
            if(diceFlag == 1){dice.angle += 2;}
            if(dinosaurFlag == 1){dinosaur.angle += 2;}
            if(dollFlag == 1){doll.angle += 2;}
            if(dragonFruitFlag == 1){dragonFruit.angle += 2;}
            if(dolphinFlag == 1){dolphin.angle += 2;}
            if(duckFlag == 1){duck.angle += 2;}
            
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
            
            if(cObjectClicked == 10){
                
               /* game.rightArrow.kill();
                game.leftArrow.kill();
*/
                askForLevelD = 1;
                game.dButton = game.add.sprite(1170, 730, 'dButton');             
                game.dButton.scale.setTo(1, 1); 
                game.dButton.anchor.setTo(spriteAnchorX, spriteAnchorY);
                
            }
            
        if(askForLevelD == 1){
            
            game.world.bringToTop(game.dButton);
            game.dButton.inputEnabled = true;
            game.dButton.events.onInputDown.add(onDownD, this);
            function onDownD() {
            
                //start next level
                
                this.setCGlobalVaribalesToZero();
                game.state.start('D');
                
            }
        }
           
        },
        
        resetCSpriteFlag: function(){
            
            dogFlag = 0;deerFlag = 0;donutFlag = 0;diamondFlag = 0;diceFlag = 0;
            dinosaurFlag = 0;dollFlag = 0;dragonFruitFlag = 0;dolphinFlag = 0;duckFlag = 0;
            camelFlag = 0;cameloonFlag = 0;carFlag = 0;catFlag = 0;cheeseFlag = 0;cherryFlag = 0;
            clockFlag = 0;cowFlag = 0;crabFlag = 0;crownFlag = 0;

            dog.angle = 0;deer.angle = 0;donut.angle = 0;diamond.angle = 0;dice.angle = 0;
            dinosaur.angle = 0;doll.angle = 0;dragonFruit.angle = 0;dolphin.angle = 0;duck.angle = 0;
            camel.angle = 0;candle.angle = 0;car.angle = 0;cat.angle = 0;cheese.angle = 0;
            cherry.angle = 0;crown.angle = 0;clock.angle = 0;cow.angle = 0;crab.angle = 0;
           
        },
       
        setColorCFlagToZero: function(){
            
            bubbleSound.play(); blueFlag = 0;greenFlag = 0; redFlag = 0; cyanFlag = 0; pinkFlag = 0; orangeFlag = 0;
        },
        
        setCGlobalVaribalesToZero: function(){
            
            
            dogFlag = 0;deerFlag = 0;donutFlag = 0;diamondFlag = 0;diceFlag = 0;
            dinosaurFlag = 0;dollFlag = 0;dragonFruitFlag = 0;dolphinFlag = 0;duckFlag = 0;
            camelFlag = 0;cameloonFlag = 0;carFlag = 0;catFlag = 0;cheeseFlag = 0;cherryFlag = 0;
            clockFlag = 0;cowFlag = 0;crabFlag = 0;crownFlag = 0;



            greenFlag = 0;blueFlag = 0;orangeFlag = 0;redFlag = 0;pinkFlag = 0;cyanFlag = 0;
        }
        
        
    };
