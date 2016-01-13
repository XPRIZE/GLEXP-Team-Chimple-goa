        
    var sObjectClicked = 0;
    var askForLevelT = 0;
    
    
    var sandwichFlag = 0;
    var scissorsFlag = 0;
    var sharkFlag = 0;            
    var sheepFlag = 0;
    var shirtFlag = 0;
    var snakeFlag = 0;
    var spadeFlag = 0;
    var sparrowFlag = 0;
    var squirrelFlag = 0;
    var stampFlag = 0;
    
    
    var S = {

        preload: function () {

            //setting default path for assets to be used in game
            this.load.path = './assets/S/';
            
            
            
            this.load.image("transSandwich", "transSandwich.png");
            this.load.image("transScissors", "transScissors.png");
            this.load.image("transShark", "transShark.png");
            this.load.image("transSheep", "transSheep.png");
            this.load.image("transShirt", "transShirt.png");
            this.load.image("transSnake", "transSnake.png");
            this.load.image("transSpade", "transSpade.png");
            this.load.image("transSparrow", "transSparrow.png");
            this.load.image("transSquirrel", "transSquirrel.png");
            this.load.image("transStamp", "transStamp.png");
            
            this.load.image("sandwich", "sandwich.png");
            this.load.image("scissors", "scissors.png");
            this.load.image("shark", "shark.png");
            this.load.image("sheep", "sheep.png");
            this.load.image("shirt", "shirt.png");
            this.load.image("snake", "snake.png");
            this.load.image("spade", "spade.png");
            this.load.image("sparrow", "sparrow.png");
            this.load.image("squirrel", "squirrel.png");
            this.load.image("stamp", "stamp.png");
            
            
            //loading assets for the level  S
            
            //loading shades
            this.load.image("blue", "blue.png");
            this.load.image("cyan", "cyan.png");
            this.load.image("green", "green.png");
            this.load.image("orange", "orange.png");
            this.load.image("pink", "pink.png");
            this.load.image("red", "red.png");
    
            this.load.image("bg", "bg.png");
            this.load.image("sLetter", "sLetter.png");
            this.load.image("tButton", "tButton.png");
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
                
            
            
            
            //Main letter S
            sLetter = game.add.sprite(gameMinWidth, gameMinHeight, 'sLetter');
            sLetter.inputEnabled = true;
            sLetter.events.onInputDown.add(this.onDownsLetter, this);
            
            
            
            //Objects starting from S
                    
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
            
            
            
            
            sandwich = game.add.sprite(objectsPositions[0].x, objectsPositions[0].y, 'sandwich');
            sandwich.anchor.setTo(spriteAnchorX, spriteAnchorY);
            sandwich.scale.setTo(spriteScaleX, spriteScaleY);
            sandwich.inputEnabled = true;
            sandwich.events.onInputDown.add(onDownsandwich, this);
            function onDownsandwich() {this.resetSSpriteFlag(); sandwichFlag = 1;sObjectClicked++;}

            
            
            
            scissors = game.add.sprite(objectsPositions[10].x, objectsPositions[10].y, 'scissors');
            scissors.anchor.setTo(spriteAnchorX, spriteAnchorY);
            scissors.scale.setTo(spriteScaleX, spriteScaleY);
            scissors.inputEnabled = true;
            scissors.events.onInputDown.add(onDownscissors, this);
            function onDownscissors() {this.resetSSpriteFlag(); scissorsFlag = 1;sObjectClicked++;}

            
            
            
            shark = game.add.sprite(objectsPositions[1].x, objectsPositions[1].y, 'shark');
            shark.anchor.setTo(spriteAnchorX, spriteAnchorY);
            shark.scale.setTo(spriteScaleX, spriteScaleY);
            shark.inputEnabled = true;
            shark.events.onInputDown.add(onDownshark, this);
            function onDownshark() {this.resetSSpriteFlag(); sharkFlag = 1;sObjectClicked++;}
            
            
            
            
            sheep = game.add.sprite(objectsPositions[11].x, objectsPositions[11].y, 'sheep');
            sheep.anchor.setTo(spriteAnchorX, spriteAnchorY);
            sheep.scale.setTo(spriteScaleX, spriteScaleY);
            sheep.inputEnabled = true;
            sheep.events.onInputDown.add(onDownsheep, this);
            function onDownsheep() {this.resetSSpriteFlag(); sheepFlag = 1;sObjectClicked++;}
            
            
            
            shirt = game.add.sprite(objectsPositions[2].x, objectsPositions[2].y, 'shirt');
            shirt.anchor.setTo(spriteAnchorX, spriteAnchorY);
            shirt.scale.setTo(spriteScaleX, spriteScaleY);
            shirt.inputEnabled = true;
            shirt.events.onInputDown.add(onDownshirt, this);
            function onDownshirt() {this.resetSSpriteFlag(); shirtFlag = 1;sObjectClicked++;}
            
            snake = game.add.sprite(objectsPositions[12].x, objectsPositions[12].y, 'snake');
            snake.anchor.setTo(spriteAnchorX, spriteAnchorY);
            snake.scale.setTo(spriteScaleX, spriteScaleY);
            snake.inputEnabled = true;
            snake.events.onInputDown.add(onDownsnake, this);
            function onDownsnake() {this.resetSSpriteFlag(); sparrowFlag = 1;sObjectClicked++;}

            
            spade = game.add.sprite(objectsPositions[3].x, objectsPositions[3].y, 'spade');
            spade.anchor.setTo(spriteAnchorX, spriteAnchorY);
            spade.scale.setTo(spriteScaleX, spriteScaleY);
            spade.inputEnabled = true;  
            spade.events.onInputDown.add(onDownspade, this);
            function onDownspade() {this.resetSSpriteFlag(); spadeFlag = 1;sObjectClicked++;}
            
            
            sparrow = game.add.sprite(objectsPositions[13].x, objectsPositions[13].y, 'sparrow');
            sparrow.anchor.setTo(spriteAnchorX, spriteAnchorY);
            sparrow.scale.setTo(spriteScaleX, spriteScaleY);
            sparrow.inputEnabled = true;
            sparrow.events.onInputDown.add(onDownsparrow, this);
            function onDownsparrow() {this.resetSSpriteFlag(); snakeFlag = 1;sObjectClicked++;}
            
            
            squirrel = game.add.sprite(objectsPositions[4].x, objectsPositions[4].y, 'squirrel');
            squirrel.anchor.setTo(spriteAnchorX, spriteAnchorY);
            squirrel.scale.setTo(spriteScaleX, spriteScaleY);
            squirrel.inputEnabled = true;
            squirrel.events.onInputDown.add(onDownsquirrel, this);
            function onDownsquirrel() {this.resetSSpriteFlag(); squirrelFlag = 1;sObjectClicked++;}
            
            
            stamp = game.add.sprite(objectsPositions[14].x, objectsPositions[14].y, 'stamp');
            stamp.anchor.setTo(spriteAnchorX, spriteAnchorY);
            stamp.scale.setTo(spriteScaleX, spriteScaleY);
            stamp.inputEnabled = true;
            stamp.events.onInputDown.add(onDownstamp, this);
            function onDownstamp() {this.resetSSpriteFlag(); stampFlag = 1;sObjectClicked++;}
            
            
            
            //Adding other sprites        
            
            camel = game.add.sprite(objectsPositions[5].x, objectsPositions[5].y, 'camel');
            camel.anchor.setTo(spriteAnchorX, spriteAnchorY);
            camel.scale.setTo(spriteScaleX, spriteScaleY);
            camel.inputEnabled = true;
            camel.events.onInputDown.add(onDownCamel, this);
            function onDownCamel() {this.resetSSpriteFlag(); camelFlag = 1;}
            
            
            
            
            candle = game.add.sprite(objectsPositions[15].x, objectsPositions[15].y, 'candle');
            candle.anchor.setTo(spriteAnchorX, spriteAnchorY);
            candle.scale.setTo(spriteScaleX, spriteScaleY);
            candle.inputEnabled = true;
            candle.events.onInputDown.add(onDownCandle, this);
            function onDownCandle() {this.resetSSpriteFlag(); candleFlag = 1; }
            
            
            car = game.add.sprite(objectsPositions[6].x, objectsPositions[6].y, 'car');
            car.anchor.setTo(spriteAnchorX, spriteAnchorY);
            car.scale.setTo(spriteScaleX, spriteScaleY);
            car.inputEnabled = true;
            car.events.onInputDown.add(onDownCar, this);
            function onDownCar() {this.resetSSpriteFlag(); carFlag = 1;}
            
            cat = game.add.sprite(objectsPositions[16].x, objectsPositions[16].y, 'cat');
            cat.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cat.scale.setTo(spriteScaleX, spriteScaleY);
            cat.inputEnabled = true;
            cat.events.onInputDown.add(onDownCat, this);
            function onDownCat() {this.resetSSpriteFlag(); catFlag = 1;}
            
            
            cheese = game.add.sprite(objectsPositions[7].x, objectsPositions[7].y, 'cheese');
            cheese.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cheese.scale.setTo(spriteScaleX, spriteScaleY);
            cheese.inputEnabled = true;
            cheese.events.onInputDown.add(onDownCheese, this);
            function onDownCheese() {this.resetSSpriteFlag(); cheeseFlag = 1;}
            
            
            cherry = game.add.sprite(objectsPositions[17].x, objectsPositions[17].y, 'cherry');
            cherry.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cherry.scale.setTo(spriteScaleX, spriteScaleY);
            cherry.inputEnabled = true;
            cherry.events.onInputDown.add(onDownCherry, this);
            function onDownCherry() {this.resetSSpriteFlag(); cherryFlag = 1;}
            
            
            clock = game.add.sprite(objectsPositions[8].x, objectsPositions[8].y, 'clock');
            clock.anchor.setTo(spriteAnchorX, spriteAnchorY);
            clock.scale.setTo(spriteScaleX, spriteScaleY);
            clock.inputEnabled = true;
            clock.events.onInputDown.add(onDownClock, this);
            function onDownClock() {this.resetSSpriteFlag(); clockFlag = 1;}
            
            
            
            cow = game.add.sprite(objectsPositions[18].x, objectsPositions[18].y, 'cow');
            cow.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cow.scale.setTo(spriteScaleX, spriteScaleY);
            cow.inputEnabled = true;
            cow.events.onInputDown.add(onDownCow, this);
            function onDownCow() {this.resetSSpriteFlag(); cowFlag = 1;}
            
            
            crab = game.add.sprite(objectsPositions[9].x, objectsPositions[9].y, 'crab');
            crab.anchor.setTo(spriteAnchorX, spriteAnchorY);
            crab.scale.setTo(spriteScaleX, spriteScaleY);
            crab.inputEnabled = true;
            crab.events.onInputDown.add(onDownCrab, this);
            function onDownCrab() {this.resetSSpriteFlag(); crabFlag = 1;}
            
            
            crown = game.add.sprite(objectsPositions[19].x, objectsPositions[19].y, 'crown');
            crown.anchor.setTo(spriteAnchorX, spriteAnchorY);
            crown.scale.setTo(spriteScaleX, spriteScaleY);
            crown.inputEnabled = true;
            crown.events.onInputDown.add(onDownCrown, this);
            function onDownCrown() {this.resetSSpriteFlag(); crownFlag = 1;}
            
            /*game.leftArrow = game.add.sprite(1070, 730, 'leftArrow');             
            game.leftArrow.scale.setTo(1, 1); 
            game.leftArrow.anchor.setTo(spriteAnchorX, spriteAnchorY);
            game.leftArrow.inputEnabled = true;
            game.leftArrow.events.onInputDown.add(onDownLeftArrow, this);
            function onDownLeftArrow() {this.setSGlobalVaribalesToZero();game.state.start('R');}
            
            
            game.rightArrow = game.add.sprite(1170, 730, 'rightArrow');             
            game.rightArrow.scale.setTo(1, 1); 
            game.rightArrow.anchor.setTo(spriteAnchorX, spriteAnchorY);
            game.rightArrow.inputEnabled = true;
            game.rightArrow.events.onInputDown.add(onDownRightArrow, this);
            function onDownRightArrow() {this.setSGlobalVaribalesToZero();game.state.start('T');}*/
            
            //Color shades
            blue = game.add.sprite(objectsPositions[20].x, objectsPositions[20].y, 'blue');
            blue.anchor.setTo(spriteAnchorX, spriteAnchorY);
            blue.scale.setTo(shadeScaleX, shadeScaleY);
            blue.inputEnabled = true;
            blue.tint = 0x456AC1; 
            blue.events.onInputDown.add(onDownBlue, this);
            function onDownBlue() {this.setColorSFlagToZero(); blueFlag = 1;}
           
            
            cyan = game.add.sprite(objectsPositions[21].x, objectsPositions[21].y, 'cyan');
            cyan.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cyan.scale.setTo(shadeScaleX, shadeScaleY);
            cyan.inputEnabled = true;
            cyan.tint = 0x45C1C1; 
            cyan.events.onInputDown.add(onDownCyan, this);
            function onDownCyan() {this.setColorSFlagToZero(); cyanFlag = 1;}
            
            
            
            green = game.add.sprite(objectsPositions[22].x, objectsPositions[22].y, 'green');
            green.anchor.setTo(spriteAnchorX, spriteAnchorY);
            green.scale.setTo(shadeScaleX, shadeScaleY);
            green.inputEnabled = true;
            green.tint = 0x51C735;
            green.events.onInputDown.add(onDownGreen, this);
            function onDownGreen() {this.setColorSFlagToZero(); greenFlag = 1;}
            
            
            orange = game.add.sprite(objectsPositions[23].x, objectsPositions[23].y, 'orange');
            orange.anchor.setTo(spriteAnchorX, spriteAnchorY);
            orange.scale.setTo(shadeScaleX, shadeScaleY);
            orange.inputEnabled = true;
            orange.tint = 0xF38932;
            orange.events.onInputDown.add(onDownOrange, this);
            function onDownOrange() {this.setColorSFlagToZero(); orangeFlag = 1;}
           
            
            pink = game.add.sprite(objectsPositions[24].x, objectsPositions[24].y, 'pink');
            pink.anchor.setTo(spriteAnchorX, spriteAnchorY);
            pink.scale.setTo(shadeScaleX, shadeScaleY);
            pink.inputEnabled = true;
            pink.tint = 0xCC3ACC;
            pink.events.onInputDown.add(onDownPink, this);
            function onDownPink() {this.setColorSFlagToZero(); pinkFlag = 1;}
            
            
            red = game.add.sprite(objectsPositions[25].x, objectsPositions[25].y, 'red');
            red.anchor.setTo(spriteAnchorX, spriteAnchorY);
            red.scale.setTo(shadeScaleX, shadeScaleY);
            red.inputEnabled = true;
            red.tint = 0xE32424;
            red.events.onInputDown.add(onDownRed, this);
            function onDownRed() {this.setColorSFlagToZero(); redFlag = 1;}
                
        },
        
        onDownsLetter: function() {
                
            //sandwich
                    if(sandwichFlag == 1 && greenFlag == 1 ){var greensandwich = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transSandwich');greensandwich.tint =  0x51C735; greensandwich.scale.setTo(spriteScaleX, spriteScaleY); 
greensandwich.anchor.setTo(0.6, 0.6);stickSound.play();}                    
                    
                    if(sandwichFlag == 1 && blueFlag == 1){var bluesandwich = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transSandwich'); bluesandwich.tint =  0x456AC1; bluesandwich.scale.setTo(spriteScaleX, spriteScaleY); bluesandwich.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(sandwichFlag == 1 && orangeFlag == 1){var orangesandwich = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transSandwich'); orangesandwich.tint =  0xF38932; orangesandwich.scale.setTo(spriteScaleX, spriteScaleY); orangesandwich.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(sandwichFlag == 1 && redFlag == 1){var redsandwich = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transSandwich'); redsandwich.tint =  0xE32424; redsandwich.scale.setTo(spriteScaleX, spriteScaleY); redsandwich.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(sandwichFlag == 1 && pinkFlag == 1){var pinksandwich = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transSandwich'); pinksandwich.tint =  0xCC3ACC; pinksandwich.scale.setTo(spriteScaleX, spriteScaleY); pinksandwich.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(sandwichFlag == 1 && cyanFlag == 1){var cyansandwich = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transSandwich'); cyansandwich.tint =  0x45C1C1; cyansandwich.scale.setTo(spriteScaleX, spriteScaleY); cyansandwich.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //scissors    
                    if(scissorsFlag == 1 && greenFlag == 1 ){var greenscissors = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transScissors');greenscissors.tint =  0x51C735; greenscissors.scale.setTo(spriteScaleX, spriteScaleY); 
greenscissors.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(scissorsFlag == 1 && blueFlag == 1){var bluescissors = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transScissors'); bluescissors.tint =  0x456AC1; bluescissors.scale.setTo(spriteScaleX, spriteScaleY); bluescissors.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(scissorsFlag == 1 && orangeFlag == 1){var orangescissors = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transScissors'); orangescissors.tint =  0xF38932; orangescissors.scale.setTo(spriteScaleX, spriteScaleY); orangescissors.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(scissorsFlag == 1 && redFlag == 1){var redscissors = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transScissors'); redscissors.tint =  0xE32424; redscissors.scale.setTo(spriteScaleX, spriteScaleY); redscissors.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(scissorsFlag == 1 && pinkFlag == 1){var pinkscissors = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transScissors'); pinkscissors.tint =  0xCC3ACC; pinkscissors.scale.setTo(spriteScaleX, spriteScaleY); pinkscissors.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(scissorsFlag == 1 && cyanFlag == 1){var cyanscissors = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transScissors'); cyanscissors.tint =  0x45C1C1; cyanscissors.scale.setTo(spriteScaleX, spriteScaleY); cyanscissors.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //shark    
                    if(sharkFlag == 1 && greenFlag == 1 ){var greenshark = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transShark');greenshark.tint =  0x51C735; greenshark.scale.setTo(spriteScaleX, spriteScaleY); 
greenshark.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(sharkFlag == 1 && blueFlag == 1){var blueshark = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transShark'); blueshark.tint =  0x456AC1; blueshark.scale.setTo(spriteScaleX, spriteScaleY); blueshark.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(sharkFlag == 1 && orangeFlag == 1){var orangeshark = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transShark'); orangeshark.tint =  0xF38932; orangeshark.scale.setTo(spriteScaleX, spriteScaleY); orangeshark.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(sharkFlag == 1 && redFlag == 1){var redshark = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transShark'); redshark.tint =  0xE32424; redshark.scale.setTo(spriteScaleX, spriteScaleY); redshark.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(sharkFlag == 1 && pinkFlag == 1){var pinkshark = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transShark'); pinkshark.tint =  0xCC3ACC; pinkshark.scale.setTo(spriteScaleX, spriteScaleY); pinkshark.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(sharkFlag == 1 && cyanFlag == 1){var cyanshark = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transShark'); cyanshark.tint =  0x45C1C1; cyanshark.scale.setTo(spriteScaleX, spriteScaleY); cyanshark.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //sheep
                    if(sheepFlag == 1 && greenFlag == 1 ){var greensheep = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transSheep');greensheep.tint =  0x51C735; greensheep.scale.setTo(spriteScaleX, spriteScaleY); 
greensheep.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(sheepFlag == 1 && blueFlag == 1){console.log("bluesheep plotted");var bluesheep = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transSheep'); bluesheep.tint =  0x456AC1; bluesheep.scale.setTo(spriteScaleX, spriteScaleY); bluesheep.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(sheepFlag == 1 && orangeFlag == 1){var orangesheep = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transSheep'); orangesheep.tint =  0xF38932; orangesheep.scale.setTo(spriteScaleX, spriteScaleY); orangesheep.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(sheepFlag == 1 && redFlag == 1){var redsheep = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transSheep'); redsheep.tint =  0xE32424; redsheep.scale.setTo(spriteScaleX, spriteScaleY); redsheep.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(sheepFlag == 1 && pinkFlag == 1){var pinksheep = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transSheep'); pinksheep.tint =  0xCC3ACC; pinksheep.scale.setTo(spriteScaleX, spriteScaleY); pinksheep.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(sheepFlag == 1 && cyanFlag == 1){var cyansheep = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transSheep'); cyansheep.tint =  0x45C1C1; cyansheep.scale.setTo(spriteScaleX, spriteScaleY); cyansheep.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //shirt    
                    if(shirtFlag == 1 && greenFlag == 1 ){var greenshirt = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transShirt');greenshirt.tint =  0x51C735; greenshirt.scale.setTo(spriteScaleX, spriteScaleY); 
greenshirt.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(shirtFlag == 1 && blueFlag == 1){console.log("blueshirt plotted");var blueshirt = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transShirt'); blueshirt.tint =  0x456AC1; blueshirt.scale.setTo(spriteScaleX, spriteScaleY); blueshirt.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(shirtFlag == 1 && orangeFlag == 1){var orangeshirt = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transShirt'); orangeshirt.tint =  0xF38932; orangeshirt.scale.setTo(spriteScaleX, spriteScaleY); orangeshirt.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(shirtFlag == 1 && redFlag == 1){var redshirt = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transShirt'); redshirt.tint =  0xE32424; redshirt.scale.setTo(spriteScaleX, spriteScaleY); redshirt.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(shirtFlag == 1 && pinkFlag == 1){var pinkshirt = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transShirt'); pinkshirt.tint =  0xCC3ACC; pinkshirt.scale.setTo(spriteScaleX, spriteScaleY); pinkshirt.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(shirtFlag == 1 && cyanFlag == 1){var cyanshirt = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transShirt'); cyanshirt.tint =  0x45C1C1; cyanshirt.scale.setTo(spriteScaleX, spriteScaleY); cyanshirt.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //snake   
                    if(sparrowFlag == 1 && greenFlag == 1 ){var greensnake = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transSnake');greensnake.tint =  0x51C735; greensnake.scale.setTo(spriteScaleX, spriteScaleY); 
greensnake.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(sparrowFlag == 1 && blueFlag == 1){console.log("bluesnake plotted");var bluesnake = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transSnake'); bluesnake.tint =  0x456AC1; bluesnake.scale.setTo(spriteScaleX, spriteScaleY); bluesnake.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(sparrowFlag == 1 && orangeFlag == 1){var orangesnake = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transSnake'); orangesnake.tint =  0xF38932; orangesnake.scale.setTo(spriteScaleX, spriteScaleY); orangesnake.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(sparrowFlag == 1 && redFlag == 1){var redsnake = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transSnake'); redsnake.tint =  0xE32424; redsnake.scale.setTo(spriteScaleX, spriteScaleY); redsnake.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(sparrowFlag == 1 && pinkFlag == 1){var pinksnake = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transSnake'); pinksnake.tint =  0xCC3ACC; pinksnake.scale.setTo(spriteScaleX, spriteScaleY); pinksnake.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(sparrowFlag == 1 && cyanFlag == 1){var cyansnake = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transSnake'); cyansnake.tint =  0x45C1C1; cyansnake.scale.setTo(spriteScaleX, spriteScaleY); cyansnake.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //spade    
                    if(spadeFlag == 1 && greenFlag == 1 ){var greenspade = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transSpade');greenspade.tint =  0x51C735; greenspade.scale.setTo(spriteScaleX, spriteScaleY); 
greenspade.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(spadeFlag == 1 && blueFlag == 1){console.log("bluespade plotted");var bluespade = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transSpade'); bluespade.tint =  0x456AC1; bluespade.scale.setTo(spriteScaleX, spriteScaleY); bluespade.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(spadeFlag == 1 && orangeFlag == 1){var orangespade = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transSpade'); orangespade.tint =  0xF38932; orangespade.scale.setTo(spriteScaleX, spriteScaleY); orangespade.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(spadeFlag == 1 && redFlag == 1){var redspade = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transSpade'); redspade.tint =  0xE32424; redspade.scale.setTo(spriteScaleX, spriteScaleY); redspade.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(spadeFlag == 1 && pinkFlag == 1){var pinkspade = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transSpade'); pinkspade.tint =  0xCC3ACC; pinkspade.scale.setTo(spriteScaleX, spriteScaleY); pinkspade.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(spadeFlag == 1 && cyanFlag == 1){var cyanspade = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transSpade'); cyanspade.tint =  0x45C1C1; cyanspade.scale.setTo(spriteScaleX, spriteScaleY); cyanspade.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //sparrow    
                    if(snakeFlag == 1 && greenFlag == 1 ){var greensparrow = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transSparrow');greensparrow.tint =  0x51C735; greensparrow.scale.setTo(spriteScaleX, spriteScaleY); 
greensparrow.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(snakeFlag == 1 && blueFlag == 1){console.log("bluesparrow plotted");var bluesparrow = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transSparrow'); bluesparrow.tint =  0x456AC1; bluesparrow.scale.setTo(spriteScaleX, spriteScaleY); bluesparrow.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(snakeFlag == 1 && orangeFlag == 1){var orangesparrow = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transSparrow'); orangesparrow.tint =  0xF38932; orangesparrow.scale.setTo(spriteScaleX, spriteScaleY); orangesparrow.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(snakeFlag == 1 && redFlag == 1){var redsparrow = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transSparrow'); redsparrow.tint =  0xE32424; redsparrow.scale.setTo(spriteScaleX, spriteScaleY); redsparrow.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(snakeFlag == 1 && pinkFlag == 1){var pinksparrow = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transSparrow'); pinksparrow.tint =  0xCC3ACC; pinksparrow.scale.setTo(spriteScaleX, spriteScaleY); pinksparrow.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(snakeFlag == 1 && cyanFlag == 1){var cyansparrow = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transSparrow'); cyansparrow.tint =  0x45C1C1; cyansparrow.scale.setTo(spriteScaleX, spriteScaleY); cyansparrow.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //squirrel    
                    if(squirrelFlag == 1 && greenFlag == 1 ){var greensquirrel = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transSquirrel');greensquirrel.tint =  0x51C735; greensquirrel.scale.setTo(spriteScaleX, spriteScaleY); 
greensquirrel.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(squirrelFlag == 1 && blueFlag == 1){console.log("bluesquirrel plotted");var bluesquirrel = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transSquirrel'); bluesquirrel.tint =  0x456AC1; bluesquirrel.scale.setTo(spriteScaleX, spriteScaleY); bluesquirrel.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(squirrelFlag == 1 && orangeFlag == 1){var orangesquirrel = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transSquirrel'); orangesquirrel.tint =  0xF38932; orangesquirrel.scale.setTo(spriteScaleX, spriteScaleY); orangesquirrel.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(squirrelFlag == 1 && redFlag == 1){var redsquirrel = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transSquirrel'); redsquirrel.tint =  0xE32424; redsquirrel.scale.setTo(spriteScaleX, spriteScaleY); redsquirrel.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(squirrelFlag == 1 && pinkFlag == 1){var pinksquirrel = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transSquirrel'); pinksquirrel.tint =  0xCC3ACC; pinksquirrel.scale.setTo(spriteScaleX, spriteScaleY); pinksquirrel.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(squirrelFlag == 1 && cyanFlag == 1){var cyansquirrel = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transSquirrel'); cyansquirrel.tint =  0x45C1C1; cyansquirrel.scale.setTo(spriteScaleX, spriteScaleY); cyansquirrel.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //stamp 
                    if(stampFlag == 1 && greenFlag == 1 ){var greenstamp = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transStamp');greenstamp.tint =  0x51C735; greenstamp.scale.setTo(spriteScaleX, spriteScaleY); 
greenstamp.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(stampFlag == 1 && blueFlag == 1){console.log("bluestamp plotted");var bluestamp = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transStamp'); bluestamp.tint =  0x456AC1; bluestamp.scale.setTo(spriteScaleX, spriteScaleY); bluestamp.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(stampFlag == 1 && orangeFlag == 1){var orangestamp = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transStamp'); orangestamp.tint =  0xF38932; orangestamp.scale.setTo(spriteScaleX, spriteScaleY); orangestamp.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(stampFlag == 1 && redFlag == 1){var redstamp = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transStamp'); redstamp.tint =  0xE32424; redstamp.scale.setTo(spriteScaleX, spriteScaleY); redstamp.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(stampFlag == 1 && pinkFlag == 1){var pinkstamp = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transStamp'); pinkstamp.tint =  0xCC3ACC; pinkstamp.scale.setTo(spriteScaleX, spriteScaleY); pinkstamp.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(stampFlag == 1 && cyanFlag == 1){var cyanstamp = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transStamp'); cyanstamp.tint =  0x45C1C1; cyanstamp.scale.setTo(spriteScaleX, spriteScaleY); cyanstamp.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
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
            
            game.world.bringToTop(sLetter);
            
            game.world.bringToTop(blue);
            game.world.bringToTop(green);
            game.world.bringToTop(red);
            game.world.bringToTop(cyan);
            game.world.bringToTop(orange);
            game.world.bringToTop(pink);
            
            game.world.bringToTop(cloud1);
            game.world.bringToTop(cloud2);
            game.world.bringToTop(cloud3);
            
            game.world.bringToTop(sandwich);
            game.world.bringToTop(scissors);
            game.world.bringToTop(shark);
            game.world.bringToTop(sheep);
            game.world.bringToTop(shirt);
            game.world.bringToTop(snake);
            game.world.bringToTop(spade);
            game.world.bringToTop(sparrow);
            game.world.bringToTop(squirrel);
            game.world.bringToTop(stamp);
            
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
            
            
            
            if(sandwichFlag == 1){sandwich.angle += 2;}
            if(scissorsFlag == 1){scissors.angle += 2;}
            if(sharkFlag == 1){shark.angle += 2;}
            if(sheepFlag == 1){sheep.angle += 2;}
            if(shirtFlag == 1){shirt.angle += 2;}
            if(sparrowFlag == 1){snake.angle += 2;}
            if(spadeFlag == 1){spade.angle += 2;}
            if(snakeFlag == 1){sparrow.angle += 2;}
            if(squirrelFlag == 1){squirrel.angle += 2;}
            if(stampFlag == 1){stamp.angle += 2;}
            
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
            
            if(sObjectClicked == 10){
            
                askForLevelT = 1;
                /*game.leftArrow.kill();
                game.rightArrow.kill();*/
                game.tButton = game.add.sprite(1170, 730, 'tButton');             
                game.tButton.scale.setTo(1, 1); 
                game.tButton.anchor.setTo(spriteAnchorX, spriteAnchorY);
                
            }
            
        if(askForLevelT == 1){
            
            game.world.bringToTop(game.tButton);
            game.tButton.inputEnabled = true;
            game.tButton.events.onInputDown.add(onDownT, this);
            function onDownT() {
            
                //start next level
                
                this.setSGlobalVaribalesToZero();
                game.state.start('T');
                
            }
        }
           
        },
        
        resetSSpriteFlag: function(){
            
            sandwichFlag = 0;scissorsFlag = 0;sharkFlag = 0;sparrowFlag = 0;sheepFlag = 0;
            shirtFlag = 0;spadeFlag = 0;snakeFlag = 0;squirrelFlag = 0;stampFlag = 0;
            camelFlag = 0;candleFlag = 0;carFlag = 0;catFlag = 0;cheeseFlag = 0;cherryFlag = 0;
            clockFlag = 0;cowFlag = 0;crabFlag = 0;crownFlag = 0;

            sandwich.angle = 0;scissors.angle = 0;shark.angle = 0;snake.angle = 0;sheep.angle = 0;
            shirt.angle = 0;spade.angle = 0;sparrow.angle = 0;squirrel.angle = 0;stamp.angle = 0;
            camel.angle = 0;candle.angle = 0;car.angle = 0;cat.angle = 0;cheese.angle = 0;
            cherry.angle = 0;crown.angle = 0;clock.angle = 0;cow.angle = 0;crab.angle = 0;
           
        },
       
        setColorSFlagToZero: function(){
            
            bubbleSound.play(); blueFlag = 0;greenFlag = 0; redFlag = 0; cyanFlag = 0; pinkFlag = 0; orangeFlag = 0;
        },
        
        setSGlobalVaribalesToZero: function(){
            
            
            sandwichFlag = 0;scissorsFlag = 0;sharkFlag = 0;sparrowFlag = 0;sheepFlag = 0;
            shirtFlag = 0;spadeFlag = 0;snakeFlag = 0;squirrelFlag = 0;stampFlag = 0;
            camelFlag = 0;candleFlag = 0;carFlag = 0;catFlag = 0;cheeseFlag = 0;cherryFlag = 0;
            clockFlag = 0;cowFlag = 0;crabFlag = 0;crownFlag = 0;



            greenFlag = 0;blueFlag = 0;orangeFlag = 0;redFlag = 0;pinkFlag = 0;cyanFlag = 0;
        }
        
        
    };
