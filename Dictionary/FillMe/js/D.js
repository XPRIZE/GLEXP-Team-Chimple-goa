        
    var dObjectClicked = 0;
    var askForLevelE = 0;
    var doorFlag = 0;
    
    var D = {

        preload: function () {

            //setting default path for assets to be used in game
            this.load.path = './assets/D/';
            
            
            
            //loading shades
            this.load.image("blue", "blue.png");
            this.load.image("cyan", "cyan.png");
            this.load.image("green", "green.png");
            this.load.image("orange", "orange.png");
            this.load.image("pink", "pink.png");
            this.load.image("red", "red.png");
    
            this.load.image("transDeer", "transDeer.png");
            this.load.image("transDiamond", "transDiamond.png");
            this.load.image("transDiamond", "transDiamond.png");
            this.load.image("transDinosaur", "transDinosaur.png");
            this.load.image("transDog", "transDog.png");
            this.load.image("transDoll", "transDoll.png");
            this.load.image("transDolphin", "transDolphin.png");
            this.load.image("transDonut", "transDonut.png");
            this.load.image("transDragonFruit", "transDragonFruit.png");
            this.load.image("transDuck", "transDuck.png");
            
            
            //loading assets for the level  D
            this.load.image("bg", "bg.png");
            this.load.image("dLetter", "dLetter.png");
            this.load.image("eButton", "eButton.png");
            
            
            
            //objects starting from D and objects not starting from D 
              
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
            this.load.image("door", "door.png");
            this.load.image("diamond", "diamond.png");
            this.load.image("dice", "dice.png");
            this.load.image("dinosaur", "dinosaur.png");
            this.load.image("dog", "dog.png");
            this.load.image("doll", "doll.png");
            this.load.image("dragonFruit", "dragonFruit.png");
            this.load.image("donkey", "donkey.png");
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
                
            
            
            
            //Main letter D
            dLetter = game.add.sprite(gameMinWidth, gameMinHeight, 'dLetter');
            dLetter.inputEnabled = true;
            dLetter.events.onInputDown.add(this.onDowndLetter, this);
            
            
            
            //Objects starting from D
                    
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
            function onDownDeer() {this.resetDSpriteFlag(); deerFlag = 1;dObjectClicked++;}

            
            
            
            door = game.add.sprite(objectsPositions[10].x, objectsPositions[10].y, 'door');
            door.anchor.setTo(spriteAnchorX, spriteAnchorY);
            door.scale.setTo(spriteScaleX, spriteScaleY);
            door.inputEnabled = true;
            door.events.onInputDown.add(onDowndoor, this);
            function onDowndoor() {this.resetDSpriteFlag(); doorFlag = 1;dObjectClicked++;}

            
            
            
            diamond = game.add.sprite(objectsPositions[1].x, objectsPositions[1].y, 'diamond');
            diamond.anchor.setTo(spriteAnchorX, spriteAnchorY);
            diamond.scale.setTo(spriteScaleX, spriteScaleY);
            diamond.inputEnabled = true;
            diamond.events.onInputDown.add(onDownDiamond, this);
            function onDownDiamond() {this.resetDSpriteFlag(); diamondFlag = 1;dObjectClicked++;}
            
            
            
            
            dice = game.add.sprite(objectsPositions[11].x, objectsPositions[11].y, 'dice');
            dice.anchor.setTo(spriteAnchorX, spriteAnchorY);
            dice.scale.setTo(spriteScaleX, spriteScaleY);
            dice.inputEnabled = true;
            dice.events.onInputDown.add(onDownDice, this);
            function onDownDice() {this.resetDSpriteFlag(); diceFlag = 1;dObjectClicked++;}
            
            
            
            dinosaur = game.add.sprite(objectsPositions[2].x, objectsPositions[2].y, 'dinosaur');
            dinosaur.anchor.setTo(spriteAnchorX, spriteAnchorY);
            dinosaur.scale.setTo(spriteScaleX, spriteScaleY);
            dinosaur.inputEnabled = true;
            dinosaur.events.onInputDown.add(onDownDinosaur, this);
            function onDownDinosaur() {this.resetDSpriteFlag(); dinosaurFlag = 1;dObjectClicked++;}
            
            dog = game.add.sprite(objectsPositions[12].x, objectsPositions[12].y, 'dog');
            dog.anchor.setTo(spriteAnchorX, spriteAnchorY);
            dog.scale.setTo(spriteScaleX, spriteScaleY);
            dog.inputEnabled = true;
            dog.events.onInputDown.add(onDownDog, this);
            function onDownDog() {this.resetDSpriteFlag(); dogFlag = 1;dObjectClicked++;}

            
            doll = game.add.sprite(objectsPositions[3].x, objectsPositions[3].y, 'doll');
            doll.anchor.setTo(spriteAnchorX, spriteAnchorY);
            doll.scale.setTo(spriteScaleX, spriteScaleY);
            doll.inputEnabled = true;  
            doll.events.onInputDown.add(onDownDoll, this);
            function onDownDoll() {this.resetDSpriteFlag(); dollFlag = 1;dObjectClicked++;}
            
            
            dragonFruit = game.add.sprite(objectsPositions[13].x, objectsPositions[13].y, 'dragonFruit');
            dragonFruit.anchor.setTo(spriteAnchorX, spriteAnchorY);
            dragonFruit.scale.setTo(spriteScaleX, spriteScaleY);
            dragonFruit.inputEnabled = true;
            dragonFruit.events.onInputDown.add(onDownDragonFruit, this);
            function onDownDragonFruit() {this.resetDSpriteFlag(); dragonFruitFlag = 1;dObjectClicked++;}
            
            
            donkey = game.add.sprite(objectsPositions[4].x, objectsPositions[4].y, 'donkey');
            donkey.anchor.setTo(spriteAnchorX, spriteAnchorY);
            donkey.scale.setTo(spriteScaleX, spriteScaleY);
            donkey.inputEnabled = true;
            donkey.events.onInputDown.add(onDownDonkey, this);
            function onDownDonkey() {this.resetDSpriteFlag(); donkeyFlag = 1;dObjectClicked++;}
            
            
            duck = game.add.sprite(objectsPositions[14].x, objectsPositions[14].y, 'duck');
            duck.anchor.setTo(spriteAnchorX, spriteAnchorY);
            duck.scale.setTo(spriteScaleX, spriteScaleY);
            duck.inputEnabled = true;
            duck.events.onInputDown.add(onDownDuck, this);
            function onDownDuck() {this.resetDSpriteFlag(); duckFlag = 1;dObjectClicked++;}
            
            
            
            camel = game.add.sprite(objectsPositions[5].x, objectsPositions[5].y, 'camel');
            camel.anchor.setTo(spriteAnchorX, spriteAnchorY);
            camel.scale.setTo(spriteScaleX, spriteScaleY);
            camel.inputEnabled = true;
            camel.events.onInputDown.add(onDownCamel, this);
            function onDownCamel() {this.resetDSpriteFlag(); camelFlag = 1;}
            
            
            
            
            candle = game.add.sprite(objectsPositions[15].x, objectsPositions[15].y, 'candle');
            candle.anchor.setTo(spriteAnchorX, spriteAnchorY);
            candle.scale.setTo(spriteScaleX, spriteScaleY);
            candle.inputEnabled = true;
            candle.events.onInputDown.add(onDownCandle, this);
            function onDownCandle() {this.resetDSpriteFlag(); candleFlag = 1;}
            
            
            car = game.add.sprite(objectsPositions[6].x, objectsPositions[6].y, 'car');
            car.anchor.setTo(spriteAnchorX, spriteAnchorY);
            car.scale.setTo(spriteScaleX, spriteScaleY);
            car.inputEnabled = true;
            car.events.onInputDown.add(onDownCar, this);
            function onDownCar() {this.resetDSpriteFlag(); carFlag = 1;}
            
            cat = game.add.sprite(objectsPositions[16].x, objectsPositions[16].y, 'cat');
            cat.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cat.scale.setTo(spriteScaleX, spriteScaleY);
            cat.inputEnabled = true;
            cat.events.onInputDown.add(onDownCat, this);
            function onDownCat() {this.resetDSpriteFlag(); catFlag = 1;}
            
            
            cheese = game.add.sprite(objectsPositions[7].x, objectsPositions[7].y, 'cheese');
            cheese.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cheese.scale.setTo(spriteScaleX, spriteScaleY);
            cheese.inputEnabled = true;
            cheese.events.onInputDown.add(onDownCheese, this);
            function onDownCheese() {this.resetDSpriteFlag(); cheeseFlag = 1;}
            
            
            cherry = game.add.sprite(objectsPositions[17].x, objectsPositions[17].y, 'cherry');
            cherry.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cherry.scale.setTo(spriteScaleX, spriteScaleY);
            cherry.inputEnabled = true;
            cherry.events.onInputDown.add(onDownCherry, this);
            function onDownCherry() {this.resetDSpriteFlag(); cherryFlag = 1}
            
            
            clock = game.add.sprite(objectsPositions[8].x, objectsPositions[8].y, 'clock');
            clock.anchor.setTo(spriteAnchorX, spriteAnchorY);
            clock.scale.setTo(spriteScaleX, spriteScaleY);
            clock.inputEnabled = true;
            clock.events.onInputDown.add(onDownClock, this);
            function onDownClock() {this.resetDSpriteFlag(); clockFlag = 1;}
            
            
            
            cow = game.add.sprite(objectsPositions[18].x, objectsPositions[18].y, 'cow');
            cow.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cow.scale.setTo(spriteScaleX, spriteScaleY);
            cow.inputEnabled = true;
            cow.events.onInputDown.add(onDownCow, this);
            function onDownCow() {this.resetDSpriteFlag(); cowFlag = 1;}
            
            
            crab = game.add.sprite(objectsPositions[9].x, objectsPositions[9].y, 'crab');
            crab.anchor.setTo(spriteAnchorX, spriteAnchorY);
            crab.scale.setTo(spriteScaleX, spriteScaleY);
            crab.inputEnabled = true;
            crab.events.onInputDown.add(onDownCrab, this);
            function onDownCrab() {this.resetDSpriteFlag(); crabFlag = 1;}
            
            
            crown = game.add.sprite(objectsPositions[19].x, objectsPositions[19].y, 'crown');
            crown.anchor.setTo(spriteAnchorX, spriteAnchorY);
            crown.scale.setTo(spriteScaleX, spriteScaleY);
            crown.inputEnabled = true;
            crown.events.onInputDown.add(onDownCrown, this);
            function onDownCrown() {this.resetDSpriteFlag(); crownFlag = 1;}
            
            
            
            //Color shades
            blue = game.add.sprite(objectsPositions[20].x, objectsPositions[20].y, 'blue');
            blue.anchor.setTo(spriteAnchorX, spriteAnchorY);
            blue.scale.setTo(shadeScaleX, shadeScaleY);
            blue.inputEnabled = true;
            blue.tint = 0x456AC1; 
            blue.events.onInputDown.add(onDownBlue, this);
            function onDownBlue() {this.setColorDFlagToZero(); blueFlag = 1;}
           
            
            cyan = game.add.sprite(objectsPositions[21].x, objectsPositions[21].y, 'cyan');
            cyan.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cyan.scale.setTo(shadeScaleX, shadeScaleY);
            cyan.inputEnabled = true;
            cyan.tint = 0x45C1C1; 
            cyan.events.onInputDown.add(onDownCyan, this);
            function onDownCyan() {this.setColorDFlagToZero(); cyanFlag = 1;}
            
            
            
            green = game.add.sprite(objectsPositions[22].x, objectsPositions[22].y, 'green');
            green.anchor.setTo(spriteAnchorX, spriteAnchorY);
            green.scale.setTo(shadeScaleX, shadeScaleY);
            green.inputEnabled = true;
            green.tint = 0x51C735;
            green.events.onInputDown.add(onDownGreen, this);
            function onDownGreen() {this.setColorDFlagToZero(); greenFlag = 1;}
            
            
            orange = game.add.sprite(objectsPositions[23].x, objectsPositions[23].y, 'orange');
            orange.anchor.setTo(spriteAnchorX, spriteAnchorY);
            orange.scale.setTo(shadeScaleX, shadeScaleY);
            orange.inputEnabled = true;
            orange.tint = 0xF38932;
            orange.events.onInputDown.add(onDownOrange, this);
            function onDownOrange() {this.setColorDFlagToZero(); orangeFlag = 1;}
           
            
            pink = game.add.sprite(objectsPositions[24].x, objectsPositions[24].y, 'pink');
            pink.anchor.setTo(spriteAnchorX, spriteAnchorY);
            pink.scale.setTo(shadeScaleX, shadeScaleY);
            pink.inputEnabled = true;
            pink.tint = 0xCC3ACC;
            pink.events.onInputDown.add(onDownPink, this);
            function onDownPink() {this.setColorDFlagToZero(); pinkFlag = 1;}
            
            
            red = game.add.sprite(objectsPositions[25].x, objectsPositions[25].y, 'red');
            red.anchor.setTo(spriteAnchorX, spriteAnchorY);
            red.scale.setTo(shadeScaleX, shadeScaleY);
            red.inputEnabled = true;
            red.tint = 0xE32424;
            red.events.onInputDown.add(onDownRed, this);
            function onDownRed() {this.setColorDFlagToZero(); redFlag = 1;}
                
        },
        
        onDowndLetter: function() {
                
            //deer
                    if(deerFlag == 1 && greenFlag == 1 ){var greendeer = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transDeer');greendeer.tint =  0x51C735; greendeer.scale.setTo(spriteScaleX, spriteScaleY); 
greendeer.anchor.setTo(0.6, 0.6);stickSound.play();}                    
                    
                    if(deerFlag == 1 && blueFlag == 1){var bluedeer = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transDeer'); bluedeer.tint =  0x456AC1; bluedeer.scale.setTo(spriteScaleX, spriteScaleY); bluedeer.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(deerFlag == 1 && orangeFlag == 1){var orangedeer = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transDeer'); orangedeer.tint =  0xF38932; orangedeer.scale.setTo(spriteScaleX, spriteScaleY); orangedeer.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(deerFlag == 1 && redFlag == 1){var reddeer = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transDeer'); reddeer.tint =  0xE32424; reddeer.scale.setTo(spriteScaleX, spriteScaleY); reddeer.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(deerFlag == 1 && pinkFlag == 1){var pinkdeer = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transDeer'); pinkdeer.tint =  0xCC3ACC; pinkdeer.scale.setTo(spriteScaleX, spriteScaleY); pinkdeer.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(deerFlag == 1 && cyanFlag == 1){var cyandeer = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transDeer'); cyandeer.tint =  0x45C1C1; cyandeer.scale.setTo(spriteScaleX, spriteScaleY); cyandeer.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //diamond    
                    if(diamondFlag == 1 && greenFlag == 1 ){var greendiamond = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transDiamond');greendiamond.tint =  0x51C735; greendiamond.scale.setTo(spriteScaleX, spriteScaleY); 
greendiamond.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(diamondFlag == 1 && blueFlag == 1){var bluediamond = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transDiamond'); bluediamond.tint =  0x456AC1; bluediamond.scale.setTo(spriteScaleX, spriteScaleY); bluediamond.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(diamondFlag == 1 && orangeFlag == 1){var orangediamond = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transDiamond'); orangediamond.tint =  0xF38932; orangediamond.scale.setTo(spriteScaleX, spriteScaleY); orangediamond.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(diamondFlag == 1 && redFlag == 1){var reddiamond = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transDiamond'); reddiamond.tint =  0xE32424; reddiamond.scale.setTo(spriteScaleX, spriteScaleY); reddiamond.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(diamondFlag == 1 && pinkFlag == 1){var pinkdiamond = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transDiamond'); pinkdiamond.tint =  0xCC3ACC; pinkdiamond.scale.setTo(spriteScaleX, spriteScaleY); pinkdiamond.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(diamondFlag == 1 && cyanFlag == 1){var cyandiamond = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transDiamond'); cyandiamond.tint =  0x45C1C1; cyandiamond.scale.setTo(spriteScaleX, spriteScaleY); cyandiamond.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //dice    
                    if(diceFlag == 1 && greenFlag == 1 ){var greendice = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transDice');greendice.tint =  0x51C735; greendice.scale.setTo(spriteScaleX, spriteScaleY); 
greendice.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(diceFlag == 1 && blueFlag == 1){var bluedice = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transDice'); bluedice.tint =  0x456AC1; bluedice.scale.setTo(spriteScaleX, spriteScaleY); bluedice.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(diceFlag == 1 && orangeFlag == 1){var orangedice = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transDice'); orangedice.tint =  0xF38932; orangedice.scale.setTo(spriteScaleX, spriteScaleY); orangedice.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(diceFlag == 1 && redFlag == 1){var reddice = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transDice'); reddice.tint =  0xE32424; reddice.scale.setTo(spriteScaleX, spriteScaleY); reddice.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(diceFlag == 1 && pinkFlag == 1){var pinkdice = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transDice'); pinkdice.tint =  0xCC3ACC; pinkdice.scale.setTo(spriteScaleX, spriteScaleY); pinkdice.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(diceFlag == 1 && cyanFlag == 1){var cyandice = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transDice'); cyandice.tint =  0x45C1C1; cyandice.scale.setTo(spriteScaleX, spriteScaleY); cyandice.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //dinosaur
                    if(dinosaurFlag == 1 && greenFlag == 1 ){var greendinosaur = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transDinosaur');greendinosaur.tint =  0x51C735; greendinosaur.scale.setTo(spriteScaleX, spriteScaleY); 
greendinosaur.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(dinosaurFlag == 1 && blueFlag == 1){console.log("bluedinosaur plotted");var bluedinosaur = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transDinosaur'); bluedinosaur.tint =  0x456AC1; bluedinosaur.scale.setTo(spriteScaleX, spriteScaleY); bluedinosaur.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(dinosaurFlag == 1 && orangeFlag == 1){var orangedinosaur = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transDinosaur'); orangedinosaur.tint =  0xF38932; orangedinosaur.scale.setTo(spriteScaleX, spriteScaleY); orangedinosaur.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(dinosaurFlag == 1 && redFlag == 1){var reddinosaur = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transDinosaur'); reddinosaur.tint =  0xE32424; reddinosaur.scale.setTo(spriteScaleX, spriteScaleY); reddinosaur.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(dinosaurFlag == 1 && pinkFlag == 1){var pinkdinosaur = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transDinosaur'); pinkdinosaur.tint =  0xCC3ACC; pinkdinosaur.scale.setTo(spriteScaleX, spriteScaleY); pinkdinosaur.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(dinosaurFlag == 1 && cyanFlag == 1){var cyandinosaur = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transDinosaur'); cyandinosaur.tint =  0x45C1C1; cyandinosaur.scale.setTo(spriteScaleX, spriteScaleY); cyandinosaur.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //dog    
                    if(dogFlag == 1 && greenFlag == 1 ){var greendog = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transDog');greendog.tint =  0x51C735; greendog.scale.setTo(spriteScaleX, spriteScaleY); 
greendog.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(dogFlag == 1 && blueFlag == 1){console.log("bluedog plotted");var bluedog = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transDog'); bluedog.tint =  0x456AC1; bluedog.scale.setTo(spriteScaleX, spriteScaleY); bluedog.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(dogFlag == 1 && orangeFlag == 1){var orangedog = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transDog'); orangedog.tint =  0xF38932; orangedog.scale.setTo(spriteScaleX, spriteScaleY); orangedog.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(dogFlag == 1 && redFlag == 1){var reddog = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transDog'); reddog.tint =  0xE32424; reddog.scale.setTo(spriteScaleX, spriteScaleY); reddog.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(dogFlag == 1 && pinkFlag == 1){var pinkdog = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transDog'); pinkdog.tint =  0xCC3ACC; pinkdog.scale.setTo(spriteScaleX, spriteScaleY); pinkdog.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(dogFlag == 1 && cyanFlag == 1){var cyandog = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transDog'); cyandog.tint =  0x45C1C1; cyandog.scale.setTo(spriteScaleX, spriteScaleY); cyandog.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //doll   
                    if(dollFlag == 1 && greenFlag == 1 ){var greendoll = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transDoll');greendoll.tint =  0x51C735; greendoll.scale.setTo(spriteScaleX, spriteScaleY); 
greendoll.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(dollFlag == 1 && blueFlag == 1){console.log("bluedoll plotted");var bluedoll = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transDoll'); bluedoll.tint =  0x456AC1; bluedoll.scale.setTo(spriteScaleX, spriteScaleY); bluedoll.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(dollFlag == 1 && orangeFlag == 1){var orangedoll = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transDoll'); orangedoll.tint =  0xF38932; orangedoll.scale.setTo(spriteScaleX, spriteScaleY); orangedoll.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(dollFlag == 1 && redFlag == 1){var reddoll = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transDoll'); reddoll.tint =  0xE32424; redcandle.scale.setTo(spriteScaleX, spriteScaleY); reddoll.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(dollFlag == 1 && pinkFlag == 1){var pinkdoll = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transDoll'); pinkdoll.tint =  0xCC3ACC; pinkdoll.scale.setTo(spriteScaleX, spriteScaleY); pinkdoll.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(dollFlag == 1 && cyanFlag == 1){var cyandoll = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transDoll'); cyandoll.tint =  0x45C1C1; cyandoll.scale.setTo(spriteScaleX, spriteScaleY); cyandoll.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //dolphin    
                    if(dolphinFlag == 1 && greenFlag == 1 ){var greendolphin = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transDolphin');greendolphin.tint =  0x51C735; greendolphin.scale.setTo(spriteScaleX, spriteScaleY); 
greendolphin.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(dolphinFlag == 1 && blueFlag == 1){console.log("bluedolphin plotted");var bluedolphin = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transDolphin'); bluedolphin.tint =  0x456AC1; bluedolphin.scale.setTo(spriteScaleX, spriteScaleY); bluedolphin.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(dolphinFlag == 1 && orangeFlag == 1){var orangedolphin = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transDolphin'); orangedolphin.tint =  0xF38932; orangedolphin.scale.setTo(spriteScaleX, spriteScaleY); orangedolphin.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(dolphinFlag == 1 && redFlag == 1){var reddolphin = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transDolphin'); reddolphin.tint =  0xE32424; reddolphin.scale.setTo(spriteScaleX, spriteScaleY); reddolphin.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(dolphinFlag == 1 && pinkFlag == 1){var pinkdolphin = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transDolphin'); pinkdolphin.tint =  0xCC3ACC; pinkdolphin.scale.setTo(spriteScaleX, spriteScaleY); pinkdolphin.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(dolphinFlag == 1 && cyanFlag == 1){var cyandolphin = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transDolphin'); cyandolphin.tint =  0x45C1C1; cyandolphin.scale.setTo(spriteScaleX, spriteScaleY); cyandolphin.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //donut    
                    if(donutFlag == 1 && greenFlag == 1 ){var greendonut = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transDonut');greendonut.tint =  0x51C735; greendonut.scale.setTo(spriteScaleX, spriteScaleY); 
greendonut.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(donutFlag == 1 && blueFlag == 1){console.log("bluedonut plotted");var bluedonut = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transDonut'); bluedonut.tint =  0x456AC1; bluedonut.scale.setTo(spriteScaleX, spriteScaleY); bluedonut.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(donutFlag == 1 && orangeFlag == 1){var orangedonut = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transDonut'); orangedonut.tint =  0xF38932; orangedonut.scale.setTo(spriteScaleX, spriteScaleY); orangedonut.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(donutFlag == 1 && redFlag == 1){var reddonut = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transDonut'); reddonut.tint =  0xE32424; reddonut.scale.setTo(spriteScaleX, spriteScaleY); reddonut.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(donutFlag == 1 && pinkFlag == 1){var pinkdonut = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transDonut'); pinkdonut.tint =  0xCC3ACC; pinkdonut.scale.setTo(spriteScaleX, spriteScaleY); pinkdonut.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(donutFlag == 1 && cyanFlag == 1){var cyandonut = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transDonut'); cyandonut.tint =  0x45C1C1; cyandonut.scale.setTo(spriteScaleX, spriteScaleY); cyandonut.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //dragonFruit    
                    if(dragonFruitFlag == 1 && greenFlag == 1 ){var greendragonFruit = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transDragonFruit');greendragonFruit.tint =  0x51C735; greendragonFruit.scale.setTo(spriteScaleX, spriteScaleY); 
greendragonFruit.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(dragonFruitFlag == 1 && blueFlag == 1){console.log("bluedragonFruit plotted");var bluedragonFruit = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transDragonFruit'); bluedragonFruit.tint =  0x456AC1; bluedragonFruit.scale.setTo(spriteScaleX, spriteScaleY); bluedragonFruit.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(dragonFruitFlag == 1 && orangeFlag == 1){var orangedragonFruit = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transDragonFruit'); orangedragonFruit.tint =  0xF38932; orangedragonFruit.scale.setTo(spriteScaleX, spriteScaleY); orangedragonFruit.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(dragonFruitFlag == 1 && redFlag == 1){var reddragonFruit = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transDragonFruit'); reddragonFruit.tint =  0xE32424; reddragonFruit.scale.setTo(spriteScaleX, spriteScaleY); reddragonFruit.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(dragonFruitFlag == 1 && pinkFlag == 1){var pinkdragonFruit = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transDragonFruit'); pinkdragonFruit.tint =  0xCC3ACC; pinkdragonFruit.scale.setTo(spriteScaleX, spriteScaleY); pinkdragonFruit.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(dragonFruitFlag == 1 && cyanFlag == 1){var cyandragonFruit = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transDragonFruit'); cyandragonFruit.tint =  0x45C1C1; cyandragonFruit.scale.setTo(spriteScaleX, spriteScaleY); cyandragonFruit.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //duck 
                    if(duckFlag == 1 && greenFlag == 1 ){var greenduck = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transDuck');greenduck.tint =  0x51C735; greenduck.scale.setTo(spriteScaleX, spriteScaleY); 
greenduck.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(duckFlag == 1 && blueFlag == 1){console.log("blueduck plotted");var blueduck = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transDuck'); blueduck.tint =  0x456AC1; blueduck.scale.setTo(spriteScaleX, spriteScaleY); blueduck.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(duckFlag == 1 && orangeFlag == 1){var orangeduck = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transDuck'); orangeduck.tint =  0xF38932; orangeduck.scale.setTo(spriteScaleX, spriteScaleY); orangeduck.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(duckFlag == 1 && redFlag == 1){var redduck = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transDuck'); redduck.tint =  0xE32424; redduck.scale.setTo(spriteScaleX, spriteScaleY); redduck.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(duckFlag == 1 && pinkFlag == 1){var pinkduck = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transDuck'); pinkduck.tint =  0xCC3ACC; pinkduck.scale.setTo(spriteScaleX, spriteScaleY); pinkduck.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(duckFlag == 1 && cyanFlag == 1){var cyanduck = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transDuck'); cyanduck.tint =  0x45C1C1; cyanduck.scale.setTo(spriteScaleX, spriteScaleY); cyanduck.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //For Wrong Objects
            
if(camelFlag == 1 || candleFlag == 1 || carFlag == 1 || catFlag == 1 || cheeseFlag == 1 || cherryFlag == 1 || clockFlag == 1 || cowFlag == 1 || crabFlag == 1 || crownFlag == 1){var blackSplash = game.add.sprite(game.input.mousePointer.x,game.input.mousePointer.y,'blackSplash');
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
            
            game.world.bringToTop(dLetter);
            
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
            game.world.bringToTop(door);
            game.world.bringToTop(diamond);
            game.world.bringToTop(deer);
            game.world.bringToTop(dice);
            game.world.bringToTop(doll);
            game.world.bringToTop(dragonFruit);
            game.world.bringToTop(donkey);
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
            
            
            
            if(dogFlag == 1){dog.angle += 2;}
            if(deerFlag == 1){deer.angle += 2;}
            if(doorFlag == 1){door.angle += 2;}
            if(diamondFlag == 1){diamond.angle += 2;}
            if(diceFlag == 1){dice.angle += 2;}
            if(dinosaurFlag == 1){dinosaur.angle += 2;}
            if(dollFlag == 1){doll.angle += 2;}
            if(dragonFruitFlag == 1){dragonFruit.angle += 2;}
            if(donkeyFlag == 1){donkey.angle += 2;}
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
            
            if(dObjectClicked == 10){
            
                askForLevelE = 1;
                game.eButton = game.add.sprite(1170, 730, 'eButton');             
                game.eButton.scale.setTo(1, 1); 
                game.eButton.anchor.setTo(spriteAnchorX, spriteAnchorY);
                
            }
            
        if(askForLevelE == 1){
            
            game.world.bringToTop(game.eButton);
            game.eButton.inputEnabled = true;
            game.eButton.events.onInputDown.add(onDownE, this);
            function onDownE() {
            
                //start next level
                
                this.setDGlobalVaribalesToZero();
                game.state.start('E');
                
            }
        }
           
        },
        
        resetDSpriteFlag: function(){
            
            dogFlag = 0;deerFlag = 0;doorFlag = 0;diamondFlag = 0;diceFlag = 0;
            dinosaurFlag = 0;dollFlag = 0;dragonFruitFlag = 0;donkeyFlag = 0;duckFlag = 0;
            camelFlag = 0;cameloonFlag = 0;carFlag = 0;catFlag = 0;cheeseFlag = 0;cherryFlag = 0;
            clockFlag = 0;cowFlag = 0;crabFlag = 0;crownFlag = 0;

            dog.angle = 0;deer.angle = 0;door.angle = 0;diamond.angle = 0;dice.angle = 0;
            dinosaur.angle = 0;doll.angle = 0;dragonFruit.angle = 0;donkey.angle = 0;duck.angle = 0;
            camel.angle = 0;candle.angle = 0;car.angle = 0;cat.angle = 0;cheese.angle = 0;
            cherry.angle = 0;crown.angle = 0;clock.angle = 0;cow.angle = 0;crab.angle = 0;
           
        },
       
        setColorDFlagToZero: function(){
            
            bubbleSound.play(); blueFlag = 0;greenFlag = 0; redFlag = 0; cyanFlag = 0; pinkFlag = 0; orangeFlag = 0;
        },
        
        setDGlobalVaribalesToZero: function(){
            
            
            dogFlag = 0;deerFlag = 0;doorFlag = 0;diamondFlag = 0;diceFlag = 0;
            dinosaurFlag = 0;dollFlag = 0;dragonFruitFlag = 0;donkeyFlag = 0;duckFlag = 0;
            camelFlag = 0;cameloonFlag = 0;carFlag = 0;catFlag = 0;cheeseFlag = 0;cherryFlag = 0;
            clockFlag = 0;cowFlag = 0;crabFlag = 0;crownFlag = 0;



            greenFlag = 0;blueFlag = 0;orangeFlag = 0;redFlag = 0;pinkFlag = 0;cyanFlag = 0;
        }
        
        
    };
