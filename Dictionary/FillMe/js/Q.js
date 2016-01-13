        
    var qObjectClicked = 0;
    var askForLevelR = 0;
    
    
    var queenFlag = 0;
    var queencardFlag = 0;
    var queenFrontFlag = 0;            
    var queenSideFlag = 0;
    var quilFlag = 0;
    var quilDoubleFlag = 0;
    var quinceFlag = 0;
    var quinceDoubleFlag = 0;
    var quranFlag = 0;
    var qutubminarFlag = 0;
    
    
    var Q = {

        preload: function () {

            //setting default path for assets to be used in game
            this.load.path = './assets/Q/';
            
            
            
            this.load.image("transQueen", "transQueen.png");
            this.load.image("transQueencard", "transQueencard.png");
            this.load.image("transQueenFront", "transQueenFront.png");
            this.load.image("transQueenside", "transQueenside.png");
            this.load.image("transQuil", "transQuil.png");
            this.load.image("transQuilDouble", "transQuilDouble.png");
            this.load.image("transQuince", "transQuince.png");
            this.load.image("transQuinceDouble", "transQuinceDouble.png");
            this.load.image("transQuran", "transQuran.png");
            this.load.image("transQutubminar", "transQutubminar.png");
            
            this.load.image("queen", "queen.png");
            this.load.image("queencard", "queencard.png");
            this.load.image("queenFront", "queenFront.png");
            this.load.image("queenSide", "queenSide.png");
            this.load.image("quil", "quil.png");
            this.load.image("quilDouble", "quilDouble.png");
            this.load.image("quince", "quince.png");
            this.load.image("quinceDouble", "quinceDouble.png");
            this.load.image("quran", "quran.png");
            this.load.image("qutubminar", "qutubminar.png");
            
            
            //loading assets for the level  Q
            
            //loading shades
            this.load.image("blue", "blue.png");
            this.load.image("cyan", "cyan.png");
            this.load.image("green", "green.png");
            this.load.image("orange", "orange.png");
            this.load.image("pink", "pink.png");
            this.load.image("red", "red.png");
    
            this.load.image("bg", "bg.png");
            this.load.image("qLetter", "qLetter.png");
            this.load.image("rButton", "rButton.png");
           /* this.load.image("leftArrow", "leftArrow.png");
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
                
            
            
            
            //Main letter Q
            qLetter = game.add.sprite(gameMinWidth, gameMinHeight, 'qLetter');
            qLetter.inputEnabled = true;
            qLetter.events.onInputDown.add(this.onDownqLetter, this);
            
            
            
            //Objects starting from Q
                    
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
            
            
            
            
            queen = game.add.sprite(objectsPositions[0].x, objectsPositions[0].y, 'queen');
            queen.anchor.setTo(spriteAnchorX, spriteAnchorY);
            queen.scale.setTo(spriteScaleX, spriteScaleY);
            queen.inputEnabled = true;
            queen.events.onInputDown.add(onDownqueen, this);
            function onDownqueen() {this.resetQSpriteFlag(); queenFlag = 1;qObjectClicked++;}

            
            
            
            queencard = game.add.sprite(objectsPositions[10].x, objectsPositions[10].y, 'queencard');
            queencard.anchor.setTo(spriteAnchorX, spriteAnchorY);
            queencard.scale.setTo(spriteScaleX, spriteScaleY);
            queencard.inputEnabled = true;
            queencard.events.onInputDown.add(onDownqueencard, this);
            function onDownqueencard() {this.resetQSpriteFlag(); queencardFlag = 1;qObjectClicked++;}

            
            
            
            queenFront = game.add.sprite(objectsPositions[1].x, objectsPositions[1].y, 'queenFront');
            queenFront.anchor.setTo(spriteAnchorX, spriteAnchorY);
            queenFront.scale.setTo(spriteScaleX, spriteScaleY);
            queenFront.inputEnabled = true;
            queenFront.events.onInputDown.add(onDownqueenFront, this);
            function onDownqueenFront() {this.resetQSpriteFlag(); queenFrontFlag = 1;qObjectClicked++;}
            
            
            
            
            queenSide = game.add.sprite(objectsPositions[11].x, objectsPositions[11].y, 'queenSide');
            queenSide.anchor.setTo(spriteAnchorX, spriteAnchorY);
            queenSide.scale.setTo(spriteScaleX, spriteScaleY);
            queenSide.inputEnabled = true;
            queenSide.events.onInputDown.add(onDownqueenSide, this);
            function onDownqueenSide() {this.resetQSpriteFlag(); queenSideFlag = 1;qObjectClicked++;}
            
            
            
            quil = game.add.sprite(objectsPositions[2].x, objectsPositions[2].y, 'quil');
            quil.anchor.setTo(spriteAnchorX, spriteAnchorY);
            quil.scale.setTo(spriteScaleX, spriteScaleY);
            quil.inputEnabled = true;
            quil.events.onInputDown.add(onDownquil, this);
            function onDownquil() {this.resetQSpriteFlag(); quilFlag = 1;qObjectClicked++;}
            
            quilDouble = game.add.sprite(objectsPositions[12].x, objectsPositions[12].y, 'quilDouble');
            quilDouble.anchor.setTo(spriteAnchorX, spriteAnchorY);
            quilDouble.scale.setTo(spriteScaleX, spriteScaleY);
            quilDouble.inputEnabled = true;
            quilDouble.events.onInputDown.add(onDownquilDouble, this);
            function onDownquilDouble() {this.resetQSpriteFlag(); quinceDoubleFlag = 1;qObjectClicked++;}

            
            quince = game.add.sprite(objectsPositions[3].x, objectsPositions[3].y, 'quince');
            quince.anchor.setTo(spriteAnchorX, spriteAnchorY);
            quince.scale.setTo(spriteScaleX, spriteScaleY);
            quince.inputEnabled = true;  
            quince.events.onInputDown.add(onDownquince, this);
            function onDownquince() {this.resetQSpriteFlag(); quinceFlag = 1;qObjectClicked++;}
            
            
            quinceDouble = game.add.sprite(objectsPositions[13].x, objectsPositions[13].y, 'quinceDouble');
            quinceDouble.anchor.setTo(spriteAnchorX, spriteAnchorY);
            quinceDouble.scale.setTo(spriteScaleX, spriteScaleY);
            quinceDouble.inputEnabled = true;
            quinceDouble.events.onInputDown.add(onDownquinceDouble, this);
            function onDownquinceDouble() {this.resetQSpriteFlag(); quilDoubleFlag = 1;qObjectClicked++;}
            
            
            quran = game.add.sprite(objectsPositions[4].x, objectsPositions[4].y, 'quran');
            quran.anchor.setTo(spriteAnchorX, spriteAnchorY);
            quran.scale.setTo(spriteScaleX, spriteScaleY);
            quran.inputEnabled = true;
            quran.events.onInputDown.add(onDownquran, this);
            function onDownquran() {this.resetQSpriteFlag(); quranFlag = 1;qObjectClicked++;}
            
            
            qutubminar = game.add.sprite(objectsPositions[14].x, objectsPositions[14].y, 'qutubminar');
            qutubminar.anchor.setTo(spriteAnchorX, spriteAnchorY);
            qutubminar.scale.setTo(spriteScaleX, spriteScaleY);
            qutubminar.inputEnabled = true;
            qutubminar.events.onInputDown.add(onDownqutubminar, this);
            function onDownqutubminar() {this.resetQSpriteFlag(); qutubminarFlag = 1;qObjectClicked++;}
            
            
            
            //Adding other sprites        
            
            camel = game.add.sprite(objectsPositions[5].x, objectsPositions[5].y, 'camel');
            camel.anchor.setTo(spriteAnchorX, spriteAnchorY);
            camel.scale.setTo(spriteScaleX, spriteScaleY);
            camel.inputEnabled = true;
            camel.events.onInputDown.add(onDownCamel, this);
            function onDownCamel() {this.resetQSpriteFlag(); camelFlag = 1;}
            
            
            
            
            candle = game.add.sprite(objectsPositions[15].x, objectsPositions[15].y, 'candle');
            candle.anchor.setTo(spriteAnchorX, spriteAnchorY);
            candle.scale.setTo(spriteScaleX, spriteScaleY);
            candle.inputEnabled = true;
            candle.events.onInputDown.add(onDownCandle, this);
            function onDownCandle() {this.resetQSpriteFlag(); candleFlag = 1; }
            
            
            car = game.add.sprite(objectsPositions[6].x, objectsPositions[6].y, 'car');
            car.anchor.setTo(spriteAnchorX, spriteAnchorY);
            car.scale.setTo(spriteScaleX, spriteScaleY);
            car.inputEnabled = true;
            car.events.onInputDown.add(onDownCar, this);
            function onDownCar() {this.resetQSpriteFlag(); carFlag = 1;}
            
            cat = game.add.sprite(objectsPositions[16].x, objectsPositions[16].y, 'cat');
            cat.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cat.scale.setTo(spriteScaleX, spriteScaleY);
            cat.inputEnabled = true;
            cat.events.onInputDown.add(onDownCat, this);
            function onDownCat() {this.resetQSpriteFlag(); catFlag = 1;}
            
            
            cheese = game.add.sprite(objectsPositions[7].x, objectsPositions[7].y, 'cheese');
            cheese.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cheese.scale.setTo(spriteScaleX, spriteScaleY);
            cheese.inputEnabled = true;
            cheese.events.onInputDown.add(onDownCheese, this);
            function onDownCheese() {this.resetQSpriteFlag(); cheeseFlag = 1;}
            
            
            cherry = game.add.sprite(objectsPositions[17].x, objectsPositions[17].y, 'cherry');
            cherry.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cherry.scale.setTo(spriteScaleX, spriteScaleY);
            cherry.inputEnabled = true;
            cherry.events.onInputDown.add(onDownCherry, this);
            function onDownCherry() {this.resetQSpriteFlag(); cherryFlag = 1;}
            
            
            clock = game.add.sprite(objectsPositions[8].x, objectsPositions[8].y, 'clock');
            clock.anchor.setTo(spriteAnchorX, spriteAnchorY);
            clock.scale.setTo(spriteScaleX, spriteScaleY);
            clock.inputEnabled = true;
            clock.events.onInputDown.add(onDownClock, this);
            function onDownClock() {this.resetQSpriteFlag(); clockFlag = 1;}
            
            
            
            cow = game.add.sprite(objectsPositions[18].x, objectsPositions[18].y, 'cow');
            cow.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cow.scale.setTo(spriteScaleX, spriteScaleY);
            cow.inputEnabled = true;
            cow.events.onInputDown.add(onDownCow, this);
            function onDownCow() {this.resetQSpriteFlag(); cowFlag = 1;}
            
            
            crab = game.add.sprite(objectsPositions[9].x, objectsPositions[9].y, 'crab');
            crab.anchor.setTo(spriteAnchorX, spriteAnchorY);
            crab.scale.setTo(spriteScaleX, spriteScaleY);
            crab.inputEnabled = true;
            crab.events.onInputDown.add(onDownCrab, this);
            function onDownCrab() {this.resetQSpriteFlag(); crabFlag = 1;}
            
            
            crown = game.add.sprite(objectsPositions[19].x, objectsPositions[19].y, 'crown');
            crown.anchor.setTo(spriteAnchorX, spriteAnchorY);
            crown.scale.setTo(spriteScaleX, spriteScaleY);
            crown.inputEnabled = true;
            crown.events.onInputDown.add(onDownCrown, this);
            function onDownCrown() {this.resetQSpriteFlag(); crownFlag = 1;}
            
            /*game.leftArrow = game.add.sprite(1070, 730, 'leftArrow');             
            game.leftArrow.scale.setTo(1, 1); 
            game.leftArrow.anchor.setTo(spriteAnchorX, spriteAnchorY);
            game.leftArrow.inputEnabled = true;
            game.leftArrow.events.onInputDown.add(onDownLeftArrow, this);
            function onDownLeftArrow() {this.setQGlobalVaribalesToZero();game.state.start('P');}
            
            
            game.rightArrow = game.add.sprite(1170, 730, 'rightArrow');             
            game.rightArrow.scale.setTo(1, 1); 
            game.rightArrow.anchor.setTo(spriteAnchorX, spriteAnchorY);
            game.rightArrow.inputEnabled = true;
            game.rightArrow.events.onInputDown.add(onDownRightArrow, this);
            function onDownRightArrow() {this.setQGlobalVaribalesToZero();game.state.start('R');}*/
            
            //Color shades
            blue = game.add.sprite(objectsPositions[20].x, objectsPositions[20].y, 'blue');
            blue.anchor.setTo(spriteAnchorX, spriteAnchorY);
            blue.scale.setTo(shadeScaleX, shadeScaleY);
            blue.inputEnabled = true;
            blue.tint = 0x456AC1; 
            blue.events.onInputDown.add(onDownBlue, this);
            function onDownBlue() {this.setColorQFlagToZero(); blueFlag = 1;}
           
            
            cyan = game.add.sprite(objectsPositions[21].x, objectsPositions[21].y, 'cyan');
            cyan.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cyan.scale.setTo(shadeScaleX, shadeScaleY);
            cyan.inputEnabled = true;
            cyan.tint = 0x45C1C1; 
            cyan.events.onInputDown.add(onDownCyan, this);
            function onDownCyan() {this.setColorQFlagToZero(); cyanFlag = 1;}
            
            
            
            green = game.add.sprite(objectsPositions[22].x, objectsPositions[22].y, 'green');
            green.anchor.setTo(spriteAnchorX, spriteAnchorY);
            green.scale.setTo(shadeScaleX, shadeScaleY);
            green.inputEnabled = true;
            green.tint = 0x51C735;
            green.events.onInputDown.add(onDownGreen, this);
            function onDownGreen() {this.setColorQFlagToZero(); greenFlag = 1;}
            
            
            orange = game.add.sprite(objectsPositions[23].x, objectsPositions[23].y, 'orange');
            orange.anchor.setTo(spriteAnchorX, spriteAnchorY);
            orange.scale.setTo(shadeScaleX, shadeScaleY);
            orange.inputEnabled = true;
            orange.tint = 0xF38932;
            orange.events.onInputDown.add(onDownOrange, this);
            function onDownOrange() {this.setColorQFlagToZero(); orangeFlag = 1;}
           
            
            pink = game.add.sprite(objectsPositions[24].x, objectsPositions[24].y, 'pink');
            pink.anchor.setTo(spriteAnchorX, spriteAnchorY);
            pink.scale.setTo(shadeScaleX, shadeScaleY);
            pink.inputEnabled = true;
            pink.tint = 0xCC3ACC;
            pink.events.onInputDown.add(onDownPink, this);
            function onDownPink() {this.setColorQFlagToZero(); pinkFlag = 1;}
            
            
            red = game.add.sprite(objectsPositions[25].x, objectsPositions[25].y, 'red');
            red.anchor.setTo(spriteAnchorX, spriteAnchorY);
            red.scale.setTo(shadeScaleX, shadeScaleY);
            red.inputEnabled = true;
            red.tint = 0xE32424;
            red.events.onInputDown.add(onDownRed, this);
            function onDownRed() {this.setColorQFlagToZero(); redFlag = 1;}
                
        },
        
        onDownqLetter: function() {
                
            //queen
                    if(queenFlag == 1 && greenFlag == 1 ){var greenqueen = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transQueen');greenqueen.tint =  0x51C735; greenqueen.scale.setTo(spriteScaleX, spriteScaleY); 
greenqueen.anchor.setTo(0.6, 0.6);stickSound.play();}                    
                    
                    if(queenFlag == 1 && blueFlag == 1){var bluequeen = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transQueen'); bluequeen.tint =  0x456AC1; bluequeen.scale.setTo(spriteScaleX, spriteScaleY); bluequeen.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(queenFlag == 1 && orangeFlag == 1){var orangequeen = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transQueen'); orangequeen.tint =  0xF38932; orangequeen.scale.setTo(spriteScaleX, spriteScaleY); orangequeen.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(queenFlag == 1 && redFlag == 1){var redqueen = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transQueen'); redqueen.tint =  0xE32424; redqueen.scale.setTo(spriteScaleX, spriteScaleY); redqueen.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(queenFlag == 1 && pinkFlag == 1){var pinkqueen = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transQueen'); pinkqueen.tint =  0xCC3ACC; pinkqueen.scale.setTo(spriteScaleX, spriteScaleY); pinkqueen.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(queenFlag == 1 && cyanFlag == 1){var cyanqueen = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transQueen'); cyanqueen.tint =  0x45C1C1; cyanqueen.scale.setTo(spriteScaleX, spriteScaleY); cyanqueen.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //queencard    
                    if(queencardFlag == 1 && greenFlag == 1 ){var greenqueencard = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transQueencard');greenqueencard.tint =  0x51C735; greenqueencard.scale.setTo(spriteScaleX, spriteScaleY); 
greenqueencard.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(queencardFlag == 1 && blueFlag == 1){var bluequeencard = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transQueencard'); bluequeencard.tint =  0x456AC1; bluequeencard.scale.setTo(spriteScaleX, spriteScaleY); bluequeencard.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(queencardFlag == 1 && orangeFlag == 1){var orangequeencard = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transQueencard'); orangequeencard.tint =  0xF38932; orangequeencard.scale.setTo(spriteScaleX, spriteScaleY); orangequeencard.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(queencardFlag == 1 && redFlag == 1){var redqueencard = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transQueencard'); redqueencard.tint =  0xE32424; redqueencard.scale.setTo(spriteScaleX, spriteScaleY); redqueencard.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(queencardFlag == 1 && pinkFlag == 1){var pinkqueencard = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transQueencard'); pinkqueencard.tint =  0xCC3ACC; pinkqueencard.scale.setTo(spriteScaleX, spriteScaleY); pinkqueencard.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(queencardFlag == 1 && cyanFlag == 1){var cyanqueencard = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transQueencard'); cyanqueencard.tint =  0x45C1C1; cyanqueencard.scale.setTo(spriteScaleX, spriteScaleY); cyanqueencard.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //queenFront    
                    if(queenFrontFlag == 1 && greenFlag == 1 ){var greenqueenFront = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transQueenFront');greenqueenFront.tint =  0x51C735; greenqueenFront.scale.setTo(spriteScaleX, spriteScaleY); 
greenqueenFront.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(queenFrontFlag == 1 && blueFlag == 1){var bluequeenFront = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transQueenFront'); bluequeenFront.tint =  0x456AC1; bluequeenFront.scale.setTo(spriteScaleX, spriteScaleY); bluequeenFront.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(queenFrontFlag == 1 && orangeFlag == 1){var orangequeenFront = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transQueenFront'); orangequeenFront.tint =  0xF38932; orangequeenFront.scale.setTo(spriteScaleX, spriteScaleY); orangequeenFront.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(queenFrontFlag == 1 && redFlag == 1){var redqueenFront = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transQueenFront'); redqueenFront.tint =  0xE32424; redqueenFront.scale.setTo(spriteScaleX, spriteScaleY); redqueenFront.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(queenFrontFlag == 1 && pinkFlag == 1){var pinkqueenFront = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transQueenFront'); pinkqueenFront.tint =  0xCC3ACC; pinkqueenFront.scale.setTo(spriteScaleX, spriteScaleY); pinkqueenFront.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(queenFrontFlag == 1 && cyanFlag == 1){var cyanqueenFront = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transQueenFront'); cyanqueenFront.tint =  0x45C1C1; cyanqueenFront.scale.setTo(spriteScaleX, spriteScaleY); cyanqueenFront.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //queenSide
                    if(queenSideFlag == 1 && greenFlag == 1 ){var greenqueenSide = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transQueenside');greenqueenSide.tint =  0x51C735; greenqueenSide.scale.setTo(spriteScaleX, spriteScaleY); 
greenqueenSide.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(queenSideFlag == 1 && blueFlag == 1){console.log("bluequeenSide plotted");var bluequeenSide = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transQueenside'); bluequeenSide.tint =  0x456AC1; bluequeenSide.scale.setTo(spriteScaleX, spriteScaleY); bluequeenSide.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(queenSideFlag == 1 && orangeFlag == 1){var orangequeenSide = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transQueenside'); orangequeenSide.tint =  0xF38932; orangequeenSide.scale.setTo(spriteScaleX, spriteScaleY); orangequeenSide.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(queenSideFlag == 1 && redFlag == 1){var redqueenSide = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transQueenside'); redqueenSide.tint =  0xE32424; redqueenSide.scale.setTo(spriteScaleX, spriteScaleY); redqueenSide.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(queenSideFlag == 1 && pinkFlag == 1){var pinkqueenSide = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transQueenside'); pinkqueenSide.tint =  0xCC3ACC; pinkqueenSide.scale.setTo(spriteScaleX, spriteScaleY); pinkqueenSide.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(queenSideFlag == 1 && cyanFlag == 1){var cyanqueenSide = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transQueenside'); cyanqueenSide.tint =  0x45C1C1; cyanqueenSide.scale.setTo(spriteScaleX, spriteScaleY); cyanqueenSide.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //quil    
                    if(quilFlag == 1 && greenFlag == 1 ){var greenquil = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transQuil');greenquil.tint =  0x51C735; greenquil.scale.setTo(spriteScaleX, spriteScaleY); 
greenquil.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(quilFlag == 1 && blueFlag == 1){console.log("bluequil plotted");var bluequil = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transQuil'); bluequil.tint =  0x456AC1; bluequil.scale.setTo(spriteScaleX, spriteScaleY); bluequil.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(quilFlag == 1 && orangeFlag == 1){var orangequil = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transQuil'); orangequil.tint =  0xF38932; orangequil.scale.setTo(spriteScaleX, spriteScaleY); orangequil.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(quilFlag == 1 && redFlag == 1){var redquil = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transQuil'); redquil.tint =  0xE32424; redquil.scale.setTo(spriteScaleX, spriteScaleY); redquil.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(quilFlag == 1 && pinkFlag == 1){var pinkquil = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transQuil'); pinkquil.tint =  0xCC3ACC; pinkquil.scale.setTo(spriteScaleX, spriteScaleY); pinkquil.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(quilFlag == 1 && cyanFlag == 1){var cyanquil = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transQuil'); cyanquil.tint =  0x45C1C1; cyanquil.scale.setTo(spriteScaleX, spriteScaleY); cyanquil.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //quilDouble   
                    if(quinceDoubleFlag == 1 && greenFlag == 1 ){var greenquilDouble = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transQuilDouble');greenquilDouble.tint =  0x51C735; greenquilDouble.scale.setTo(spriteScaleX, spriteScaleY); 
greenquilDouble.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(quinceDoubleFlag == 1 && blueFlag == 1){console.log("bluequilDouble plotted");var bluequilDouble = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transQuilDouble'); bluequilDouble.tint =  0x456AC1; bluequilDouble.scale.setTo(spriteScaleX, spriteScaleY); bluequilDouble.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(quinceDoubleFlag == 1 && orangeFlag == 1){var orangequilDouble = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transQuilDouble'); orangequilDouble.tint =  0xF38932; orangequilDouble.scale.setTo(spriteScaleX, spriteScaleY); orangequilDouble.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(quinceDoubleFlag == 1 && redFlag == 1){var redquilDouble = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transQuilDouble'); redquilDouble.tint =  0xE32424; redquilDouble.scale.setTo(spriteScaleX, spriteScaleY); redquilDouble.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(quinceDoubleFlag == 1 && pinkFlag == 1){var pinkquilDouble = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transQuilDouble'); pinkquilDouble.tint =  0xCC3ACC; pinkquilDouble.scale.setTo(spriteScaleX, spriteScaleY); pinkquilDouble.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(quinceDoubleFlag == 1 && cyanFlag == 1){var cyanquilDouble = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transQuilDouble'); cyanquilDouble.tint =  0x45C1C1; cyanquilDouble.scale.setTo(spriteScaleX, spriteScaleY); cyanquilDouble.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //quince    
                    if(quinceFlag == 1 && greenFlag == 1 ){var greenquince = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transQuince');greenquince.tint =  0x51C735; greenquince.scale.setTo(spriteScaleX, spriteScaleY); 
greenquince.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(quinceFlag == 1 && blueFlag == 1){console.log("bluequince plotted");var bluequince = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transQuince'); bluequince.tint =  0x456AC1; bluequince.scale.setTo(spriteScaleX, spriteScaleY); bluequince.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(quinceFlag == 1 && orangeFlag == 1){var orangequince = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transQuince'); orangequince.tint =  0xF38932; orangequince.scale.setTo(spriteScaleX, spriteScaleY); orangequince.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(quinceFlag == 1 && redFlag == 1){var redquince = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transQuince'); redquince.tint =  0xE32424; redquince.scale.setTo(spriteScaleX, spriteScaleY); redquince.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(quinceFlag == 1 && pinkFlag == 1){var pinkquince = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transQuince'); pinkquince.tint =  0xCC3ACC; pinkquince.scale.setTo(spriteScaleX, spriteScaleY); pinkquince.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(quinceFlag == 1 && cyanFlag == 1){var cyanquince = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transQuince'); cyanquince.tint =  0x45C1C1; cyanquince.scale.setTo(spriteScaleX, spriteScaleY); cyanquince.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //quinceDouble    
                    if(quilDoubleFlag == 1 && greenFlag == 1 ){var greenquinceDouble = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transQuinceDouble');greenquinceDouble.tint =  0x51C735; greenquinceDouble.scale.setTo(spriteScaleX, spriteScaleY); 
greenquinceDouble.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(quilDoubleFlag == 1 && blueFlag == 1){console.log("bluequinceDouble plotted");var bluequinceDouble = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transQuinceDouble'); bluequinceDouble.tint =  0x456AC1; bluequinceDouble.scale.setTo(spriteScaleX, spriteScaleY); bluequinceDouble.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(quilDoubleFlag == 1 && orangeFlag == 1){var orangequinceDouble = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transQuinceDouble'); orangequinceDouble.tint =  0xF38932; orangequinceDouble.scale.setTo(spriteScaleX, spriteScaleY); orangequinceDouble.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(quilDoubleFlag == 1 && redFlag == 1){var redquinceDouble = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transQuinceDouble'); redquinceDouble.tint =  0xE32424; redquinceDouble.scale.setTo(spriteScaleX, spriteScaleY); redquinceDouble.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(quilDoubleFlag == 1 && pinkFlag == 1){var pinkquinceDouble = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transQuinceDouble'); pinkquinceDouble.tint =  0xCC3ACC; pinkquinceDouble.scale.setTo(spriteScaleX, spriteScaleY); pinkquinceDouble.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(quilDoubleFlag == 1 && cyanFlag == 1){var cyanquinceDouble = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transQuinceDouble'); cyanquinceDouble.tint =  0x45C1C1; cyanquinceDouble.scale.setTo(spriteScaleX, spriteScaleY); cyanquinceDouble.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //quran    
                    if(quranFlag == 1 && greenFlag == 1 ){var greenquran = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transQuran');greenquran.tint =  0x51C735; greenquran.scale.setTo(spriteScaleX, spriteScaleY); 
greenquran.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(quranFlag == 1 && blueFlag == 1){console.log("bluequran plotted");var bluequran = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transQuran'); bluequran.tint =  0x456AC1; bluequran.scale.setTo(spriteScaleX, spriteScaleY); bluequran.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(quranFlag == 1 && orangeFlag == 1){var orangequran = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transQuran'); orangequran.tint =  0xF38932; orangequran.scale.setTo(spriteScaleX, spriteScaleY); orangequran.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(quranFlag == 1 && redFlag == 1){var redquran = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transQuran'); redquran.tint =  0xE32424; redquran.scale.setTo(spriteScaleX, spriteScaleY); redquran.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(quranFlag == 1 && pinkFlag == 1){var pinkquran = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transQuran'); pinkquran.tint =  0xCC3ACC; pinkquran.scale.setTo(spriteScaleX, spriteScaleY); pinkquran.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(quranFlag == 1 && cyanFlag == 1){var cyanquran = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transQuran'); cyanquran.tint =  0x45C1C1; cyanquran.scale.setTo(spriteScaleX, spriteScaleY); cyanquran.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //qutubminar 
                    if(qutubminarFlag == 1 && greenFlag == 1 ){var greenqutubminar = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transQutubminar');greenqutubminar.tint =  0x51C735; greenqutubminar.scale.setTo(spriteScaleX, spriteScaleY); 
greenqutubminar.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(qutubminarFlag == 1 && blueFlag == 1){console.log("bluequtubminar plotted");var bluequtubminar = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transQutubminar'); bluequtubminar.tint =  0x456AC1; bluequtubminar.scale.setTo(spriteScaleX, spriteScaleY); bluequtubminar.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(qutubminarFlag == 1 && orangeFlag == 1){var orangequtubminar = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transQutubminar'); orangequtubminar.tint =  0xF38932; orangequtubminar.scale.setTo(spriteScaleX, spriteScaleY); orangequtubminar.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(qutubminarFlag == 1 && redFlag == 1){var redqutubminar = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transQutubminar'); redqutubminar.tint =  0xE32424; redqutubminar.scale.setTo(spriteScaleX, spriteScaleY); redqutubminar.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(qutubminarFlag == 1 && pinkFlag == 1){var pinkqutubminar = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transQutubminar'); pinkqutubminar.tint =  0xCC3ACC; pinkqutubminar.scale.setTo(spriteScaleX, spriteScaleY); pinkqutubminar.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(qutubminarFlag == 1 && cyanFlag == 1){var cyanqutubminar = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transQutubminar'); cyanqutubminar.tint =  0x45C1C1; cyanqutubminar.scale.setTo(spriteScaleX, spriteScaleY); cyanqutubminar.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
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
            
            game.world.bringToTop(qLetter);
            
            game.world.bringToTop(blue);
            game.world.bringToTop(green);
            game.world.bringToTop(red);
            game.world.bringToTop(cyan);
            game.world.bringToTop(orange);
            game.world.bringToTop(pink);
            
            game.world.bringToTop(cloud1);
            game.world.bringToTop(cloud2);
            game.world.bringToTop(cloud3);
            
            game.world.bringToTop(queen);
            game.world.bringToTop(queencard);
            game.world.bringToTop(queenFront);
            game.world.bringToTop(queenSide);
            game.world.bringToTop(quil);
            game.world.bringToTop(quilDouble);
            game.world.bringToTop(quince);
            game.world.bringToTop(quinceDouble);
            game.world.bringToTop(quran);
            game.world.bringToTop(qutubminar);
            
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
            
            
            
            if(queenFlag == 1){queen.angle += 2;}
            if(queencardFlag == 1){queencard.angle += 2;}
            if(queenFrontFlag == 1){queenFront.angle += 2;}
            if(queenSideFlag == 1){queenSide.angle += 2;}
            if(quilFlag == 1){quil.angle += 2;}
            if(quinceDoubleFlag == 1){quilDouble.angle += 2;}
            if(quinceFlag == 1){quince.angle += 2;}
            if(quilDoubleFlag == 1){quinceDouble.angle += 2;}
            if(quranFlag == 1){quran.angle += 2;}
            if(qutubminarFlag == 1){qutubminar.angle += 2;}
            
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
            
            if(qObjectClicked == 10){
            
                askForLevelR = 1;
                /*game.leftArrow.kill();
                game.rightArrow.kill();*/
                game.rButton = game.add.sprite(1170, 730, 'rButton');             
                game.rButton.scale.setTo(1, 1); 
                game.rButton.anchor.setTo(spriteAnchorX, spriteAnchorY);
                
            }
            
        if(askForLevelR == 1){
            
            game.world.bringToTop(game.rButton);
            game.rButton.inputEnabled = true;
            game.rButton.events.onInputDown.add(onDownR, this);
            function onDownR() {
            
                //start next level
                
                this.setQGlobalVaribalesToZero();
                game.state.start('R');
                
            }
        }
           
        },
        
        resetQSpriteFlag: function(){
            
            queenFlag = 0;queencardFlag = 0;queenFrontFlag = 0;quinceDoubleFlag = 0;queenSideFlag = 0;
            quilFlag = 0;quinceFlag = 0;quilDoubleFlag = 0;quranFlag = 0;qutubminarFlag = 0;
            camelFlag = 0;candleFlag = 0;carFlag = 0;catFlag = 0;cheeseFlag = 0;cherryFlag = 0;
            clockFlag = 0;cowFlag = 0;crabFlag = 0;crownFlag = 0;

            queen.angle = 0;queencard.angle = 0;queenFront.angle = 0;quilDouble.angle = 0;queenSide.angle = 0;
            quil.angle = 0;quince.angle = 0;quinceDouble.angle = 0;quran.angle = 0;qutubminar.angle = 0;
            camel.angle = 0;candle.angle = 0;car.angle = 0;cat.angle = 0;cheese.angle = 0;
            cherry.angle = 0;crown.angle = 0;clock.angle = 0;cow.angle = 0;crab.angle = 0;
           
        },
       
        setColorQFlagToZero: function(){
            
            bubbleSound.play(); blueFlag = 0;greenFlag = 0; redFlag = 0; cyanFlag = 0; pinkFlag = 0; orangeFlag = 0;
        },
        
        setQGlobalVaribalesToZero: function(){
            
            
            queenFlag = 0;queencardFlag = 0;queenFrontFlag = 0;quinceDoubleFlag = 0;queenSideFlag = 0;
            quilFlag = 0;quinceFlag = 0;quilDoubleFlag = 0;quranFlag = 0;qutubminarFlag = 0;
            camelFlag = 0;candleFlag = 0;carFlag = 0;catFlag = 0;cheeseFlag = 0;cherryFlag = 0;
            clockFlag = 0;cowFlag = 0;crabFlag = 0;crownFlag = 0;



            greenFlag = 0;blueFlag = 0;orangeFlag = 0;redFlag = 0;pinkFlag = 0;cyanFlag = 0;
        }
        
        
    };

