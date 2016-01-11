        
    var zObjectClicked = 0;
    var askForEnd = 0;
    
    
    var zebraFlag = 0;
    var zebrafaceFlag = 0;
    var zebraface1Flag = 0;            
    var zebrafrontFlag = 0;
    var zebraleftFlag = 0;
    var zebrarightFlag = 0;
    var zipFlag = 0;
    var ziptiltFlag = 0;
    var zuchhiniFlag = 0;
    var zuchhinidoubleFlag = 0;
    
    
    var Z = {

        preload: function () {

            //setting default path for assets to be used in game
            this.load.path = './assets/Z/';
            
            
            
            this.load.image("transZebra", "transZebra.png");
            this.load.image("transZebraface", "transZebraface.png");
            this.load.image("transZebraface1", "transZebraface1.png");
            this.load.image("transZebrafront", "transZebrafront.png");
            this.load.image("transZebraleft", "transZebraleft.png");
            this.load.image("transZebraright", "transZebraright.png");
            this.load.image("transZip", "transZip.png");
            this.load.image("transZuchhini", "transZuchhini.png");
            this.load.image("transZiptilt", "transZiptilt.png");
            this.load.image("transZuchhinidouble", "transZuchhinidouble.png");
            
            this.load.image("zebra", "zebra.png");
            this.load.image("zebraface", "zebraface.png");
            this.load.image("zebraface1", "zebraface1.png");
            this.load.image("zebrafront", "zebrafront.png");
            this.load.image("zebraleft", "zebraleft.png");
            this.load.image("zebraright", "zebraright.png");
            this.load.image("zip", "zip.png");
            this.load.image("ziptilt", "ziptilt.png");
            this.load.image("zuchhini", "zuchhini.png");
            this.load.image("zuchhinidouble", "zuchhinidouble.png");
            
            
            //loading assets for the level  Z
            
            //loading shades
            this.load.image("blue", "blue.png");
            this.load.image("cyan", "cyan.png");
            this.load.image("green", "green.png");
            this.load.image("orange", "orange.png");
            this.load.image("pink", "pink.png");
            this.load.image("red", "red.png");
    
            this.load.image("bg", "bg.png");
            this.load.image("zLetter", "zLetter.png");
            this.load.image("endButton", "endButton.png");
            
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
                
            
            
            
            //Main letter Z
            zLetter = game.add.sprite(gameMinWidth, gameMinHeight, 'zLetter');
            zLetter.inputEnabled = true;
            zLetter.events.onInputDown.add(this.onDownzLetter, this);
            
            
            
            //Objects starting from Z
                    
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
            
            
            
            
            zebra = game.add.sprite(objectsPositions[0].x, objectsPositions[0].y, 'zebra');
            zebra.anchor.setTo(spriteAnchorX, spriteAnchorY);
            zebra.scale.setTo(spriteScaleX, spriteScaleY);
            zebra.inputEnabled = true;
            zebra.events.onInputDown.add(onDownzebra, this);
            function onDownzebra() {this.resetZSpriteFlag(); zebraFlag = 1;zObjectClicked++;}

            
            
            
            zebraface = game.add.sprite(objectsPositions[10].x, objectsPositions[10].y, 'zebraface');
            zebraface.anchor.setTo(spriteAnchorX, spriteAnchorY);
            zebraface.scale.setTo(spriteScaleX, spriteScaleY);
            zebraface.inputEnabled = true;
            zebraface.events.onInputDown.add(onDownzebraface, this);
            function onDownzebraface() {this.resetZSpriteFlag(); zebrafaceFlag = 1;zObjectClicked++;}

            
            
            
            zebraface1 = game.add.sprite(objectsPositions[1].x, objectsPositions[1].y, 'zebraface1');
            zebraface1.anchor.setTo(spriteAnchorX, spriteAnchorY);
            zebraface1.scale.setTo(spriteScaleX, spriteScaleY);
            zebraface1.inputEnabled = true;
            zebraface1.events.onInputDown.add(onDownzebraface1, this);
            function onDownzebraface1() {this.resetZSpriteFlag(); zebraface1Flag = 1;zObjectClicked++;}
            
            
            
            
            zebrafront = game.add.sprite(objectsPositions[11].x, objectsPositions[11].y, 'zebrafront');
            zebrafront.anchor.setTo(spriteAnchorX, spriteAnchorY);
            zebrafront.scale.setTo(spriteScaleX, spriteScaleY);
            zebrafront.inputEnabled = true;
            zebrafront.events.onInputDown.add(onDownzebrafront, this);
            function onDownzebrafront() {this.resetZSpriteFlag(); zebrafrontFlag = 1;zObjectClicked++;}
            
            
            
            zebraleft = game.add.sprite(objectsPositions[2].x, objectsPositions[2].y, 'zebraleft');
            zebraleft.anchor.setTo(spriteAnchorX, spriteAnchorY);
            zebraleft.scale.setTo(spriteScaleX, spriteScaleY);
            zebraleft.inputEnabled = true;
            zebraleft.events.onInputDown.add(onDownzebraleft, this);
            function onDownzebraleft() {this.resetZSpriteFlag(); zebraleftFlag = 1;zObjectClicked++;}
            
            zebraright = game.add.sprite(objectsPositions[12].x, objectsPositions[12].y, 'zebraright');
            zebraright.anchor.setTo(spriteAnchorX, spriteAnchorY);
            zebraright.scale.setTo(spriteScaleX, spriteScaleY);
            zebraright.inputEnabled = true;
            zebraright.events.onInputDown.add(onDownzebraright, this);
            function onDownzebraright() {this.resetZSpriteFlag(); ziptiltFlag = 1;zObjectClicked++;}

            
            zip = game.add.sprite(objectsPositions[3].x, objectsPositions[3].y, 'zip');
            zip.anchor.setTo(spriteAnchorX, spriteAnchorY);
            zip.scale.setTo(spriteScaleX, spriteScaleY);
            zip.inputEnabled = true;  
            zip.events.onInputDown.add(onDownzip, this);
            function onDownzip() {this.resetZSpriteFlag(); zipFlag = 1;zObjectClicked++;}
            
            
            ziptilt = game.add.sprite(objectsPositions[13].x, objectsPositions[13].y, 'ziptilt');
            ziptilt.anchor.setTo(spriteAnchorX, spriteAnchorY);
            ziptilt.scale.setTo(spriteScaleX, spriteScaleY);
            ziptilt.inputEnabled = true;
            ziptilt.events.onInputDown.add(onDownziptilt, this);
            function onDownziptilt() {this.resetZSpriteFlag(); zebrarightFlag = 1;zObjectClicked++;}
            
            
            zuchhini = game.add.sprite(objectsPositions[4].x, objectsPositions[4].y, 'zuchhini');
            zuchhini.anchor.setTo(spriteAnchorX, spriteAnchorY);
            zuchhini.scale.setTo(spriteScaleX, spriteScaleY);
            zuchhini.inputEnabled = true;
            zuchhini.events.onInputDown.add(onDownzuchhini, this);
            function onDownzuchhini() {this.resetZSpriteFlag(); zuchhiniFlag = 1;zObjectClicked++;}
            
            
            zuchhinidouble = game.add.sprite(objectsPositions[14].x, objectsPositions[14].y, 'zuchhinidouble');
            zuchhinidouble.anchor.setTo(spriteAnchorX, spriteAnchorY);
            zuchhinidouble.scale.setTo(spriteScaleX, spriteScaleY);
            zuchhinidouble.inputEnabled = true;
            zuchhinidouble.events.onInputDown.add(onDownzuchhinidouble, this);
            function onDownzuchhinidouble() {this.resetZSpriteFlag(); zuchhinidoubleFlag = 1;zObjectClicked++;}
            
            
            
            //Adding other sprites        
            
            camel = game.add.sprite(objectsPositions[5].x, objectsPositions[5].y, 'camel');
            camel.anchor.setTo(spriteAnchorX, spriteAnchorY);
            camel.scale.setTo(spriteScaleX, spriteScaleY);
            camel.inputEnabled = true;
            camel.events.onInputDown.add(onDownCamel, this);
            function onDownCamel() {this.resetZSpriteFlag(); camelFlag = 1;}
            
            
            
            
            candle = game.add.sprite(objectsPositions[15].x, objectsPositions[15].y, 'candle');
            candle.anchor.setTo(spriteAnchorX, spriteAnchorY);
            candle.scale.setTo(spriteScaleX, spriteScaleY);
            candle.inputEnabled = true;
            candle.events.onInputDown.add(onDownCandle, this);
            function onDownCandle() {this.resetZSpriteFlag(); candleFlag = 1; }
            
            
            car = game.add.sprite(objectsPositions[6].x, objectsPositions[6].y, 'car');
            car.anchor.setTo(spriteAnchorX, spriteAnchorY);
            car.scale.setTo(spriteScaleX, spriteScaleY);
            car.inputEnabled = true;
            car.events.onInputDown.add(onDownCar, this);
            function onDownCar() {this.resetZSpriteFlag(); carFlag = 1;}
            
            cat = game.add.sprite(objectsPositions[16].x, objectsPositions[16].y, 'cat');
            cat.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cat.scale.setTo(spriteScaleX, spriteScaleY);
            cat.inputEnabled = true;
            cat.events.onInputDown.add(onDownCat, this);
            function onDownCat() {this.resetZSpriteFlag(); catFlag = 1;}
            
            
            cheese = game.add.sprite(objectsPositions[7].x, objectsPositions[7].y, 'cheese');
            cheese.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cheese.scale.setTo(spriteScaleX, spriteScaleY);
            cheese.inputEnabled = true;
            cheese.events.onInputDown.add(onDownCheese, this);
            function onDownCheese() {this.resetZSpriteFlag(); cheeseFlag = 1;}
            
            
            cherry = game.add.sprite(objectsPositions[17].x, objectsPositions[17].y, 'cherry');
            cherry.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cherry.scale.setTo(spriteScaleX, spriteScaleY);
            cherry.inputEnabled = true;
            cherry.events.onInputDown.add(onDownCherry, this);
            function onDownCherry() {this.resetZSpriteFlag(); cherryFlag = 1;}
            
            
            clock = game.add.sprite(objectsPositions[8].x, objectsPositions[8].y, 'clock');
            clock.anchor.setTo(spriteAnchorX, spriteAnchorY);
            clock.scale.setTo(spriteScaleX, spriteScaleY);
            clock.inputEnabled = true;
            clock.events.onInputDown.add(onDownClock, this);
            function onDownClock() {this.resetZSpriteFlag(); clockFlag = 1;}
            
            
            
            cow = game.add.sprite(objectsPositions[18].x, objectsPositions[18].y, 'cow');
            cow.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cow.scale.setTo(spriteScaleX, spriteScaleY);
            cow.inputEnabled = true;
            cow.events.onInputDown.add(onDownCow, this);
            function onDownCow() {this.resetZSpriteFlag(); cowFlag = 1;}
            
            
            crab = game.add.sprite(objectsPositions[9].x, objectsPositions[9].y, 'crab');
            crab.anchor.setTo(spriteAnchorX, spriteAnchorY);
            crab.scale.setTo(spriteScaleX, spriteScaleY);
            crab.inputEnabled = true;
            crab.events.onInputDown.add(onDownCrab, this);
            function onDownCrab() {this.resetZSpriteFlag(); crabFlag = 1;}
            
            
            crown = game.add.sprite(objectsPositions[19].x, objectsPositions[19].y, 'crown');
            crown.anchor.setTo(spriteAnchorX, spriteAnchorY);
            crown.scale.setTo(spriteScaleX, spriteScaleY);
            crown.inputEnabled = true;
            crown.events.onInputDown.add(onDownCrown, this);
            function onDownCrown() {this.resetZSpriteFlag(); crownFlag = 1;}
            
            
            
            //Color shades
            blue = game.add.sprite(objectsPositions[20].x, objectsPositions[20].y, 'blue');
            blue.anchor.setTo(spriteAnchorX, spriteAnchorY);
            blue.scale.setTo(shadeScaleX, shadeScaleY);
            blue.inputEnabled = true;
            blue.tint = 0x456AC1; 
            blue.events.onInputDown.add(onDownBlue, this);
            function onDownBlue() {this.setColorZFlagToZero(); blueFlag = 1;}
           
            
            cyan = game.add.sprite(objectsPositions[21].x, objectsPositions[21].y, 'cyan');
            cyan.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cyan.scale.setTo(shadeScaleX, shadeScaleY);
            cyan.inputEnabled = true;
            cyan.tint = 0x45C1C1; 
            cyan.events.onInputDown.add(onDownCyan, this);
            function onDownCyan() {this.setColorZFlagToZero(); cyanFlag = 1;}
            
            
            
            green = game.add.sprite(objectsPositions[22].x, objectsPositions[22].y, 'green');
            green.anchor.setTo(spriteAnchorX, spriteAnchorY);
            green.scale.setTo(shadeScaleX, shadeScaleY);
            green.inputEnabled = true;
            green.tint = 0x51C735;
            green.events.onInputDown.add(onDownGreen, this);
            function onDownGreen() {this.setColorZFlagToZero(); greenFlag = 1;}
            
            
            orange = game.add.sprite(objectsPositions[23].x, objectsPositions[23].y, 'orange');
            orange.anchor.setTo(spriteAnchorX, spriteAnchorY);
            orange.scale.setTo(shadeScaleX, shadeScaleY);
            orange.inputEnabled = true;
            orange.tint = 0xF38932;
            orange.events.onInputDown.add(onDownOrange, this);
            function onDownOrange() {this.setColorZFlagToZero(); orangeFlag = 1;}
           
            
            pink = game.add.sprite(objectsPositions[24].x, objectsPositions[24].y, 'pink');
            pink.anchor.setTo(spriteAnchorX, spriteAnchorY);
            pink.scale.setTo(shadeScaleX, shadeScaleY);
            pink.inputEnabled = true;
            pink.tint = 0xCC3ACC;
            pink.events.onInputDown.add(onDownPink, this);
            function onDownPink() {this.setColorZFlagToZero(); pinkFlag = 1;}
            
            
            red = game.add.sprite(objectsPositions[25].x, objectsPositions[25].y, 'red');
            red.anchor.setTo(spriteAnchorX, spriteAnchorY);
            red.scale.setTo(shadeScaleX, shadeScaleY);
            red.inputEnabled = true;
            red.tint = 0xE32424;
            red.events.onInputDown.add(onDownRed, this);
            function onDownRed() {this.setColorZFlagToZero(); redFlag = 1;}
                
        },
        
        onDownzLetter: function() {
                
            //zebra
                    if(zebraFlag == 1 && greenFlag == 1 ){var greenzebra = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transZebra');greenzebra.tint =  0x51C735; greenzebra.scale.setTo(spriteScaleX, spriteScaleY); 
greenzebra.anchor.setTo(0.6, 0.6);stickSound.play();}                    
                    
                    if(zebraFlag == 1 && blueFlag == 1){var bluezebra = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transZebra'); bluezebra.tint =  0x456AC1; bluezebra.scale.setTo(spriteScaleX, spriteScaleY); bluezebra.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(zebraFlag == 1 && orangeFlag == 1){var orangezebra = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transZebra'); orangezebra.tint =  0xF38932; orangezebra.scale.setTo(spriteScaleX, spriteScaleY); orangezebra.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(zebraFlag == 1 && redFlag == 1){var redzebra = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transZebra'); redzebra.tint =  0xE32424; redzebra.scale.setTo(spriteScaleX, spriteScaleY); redzebra.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(zebraFlag == 1 && pinkFlag == 1){var pinkzebra = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transZebra'); pinkzebra.tint =  0xCC3ACC; pinkzebra.scale.setTo(spriteScaleX, spriteScaleY); pinkzebra.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(zebraFlag == 1 && cyanFlag == 1){var cyanzebra = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transZebra'); cyanzebra.tint =  0x45C1C1; cyanzebra.scale.setTo(spriteScaleX, spriteScaleY); cyanzebra.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //zebraface    
                    if(zebrafaceFlag == 1 && greenFlag == 1 ){var greenzebraface = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transZebraface');greenzebraface.tint =  0x51C735; greenzebraface.scale.setTo(spriteScaleX, spriteScaleY); 
greenzebraface.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(zebrafaceFlag == 1 && blueFlag == 1){var bluezebraface = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transZebraface'); bluezebraface.tint =  0x456AC1; bluezebraface.scale.setTo(spriteScaleX, spriteScaleY); bluezebraface.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(zebrafaceFlag == 1 && orangeFlag == 1){var orangezebraface = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transZebraface'); orangezebraface.tint =  0xF38932; orangezebraface.scale.setTo(spriteScaleX, spriteScaleY); orangezebraface.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(zebrafaceFlag == 1 && redFlag == 1){var redzebraface = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transZebraface'); redzebraface.tint =  0xE32424; redzebraface.scale.setTo(spriteScaleX, spriteScaleY); redzebraface.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(zebrafaceFlag == 1 && pinkFlag == 1){var pinkzebraface = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transZebraface'); pinkzebraface.tint =  0xCC3ACC; pinkzebraface.scale.setTo(spriteScaleX, spriteScaleY); pinkzebraface.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(zebrafaceFlag == 1 && cyanFlag == 1){var cyanzebraface = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transZebraface'); cyanzebraface.tint =  0x45C1C1; cyanzebraface.scale.setTo(spriteScaleX, spriteScaleY); cyanzebraface.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //zebraface1    
                    if(zebraface1Flag == 1 && greenFlag == 1 ){var greenzebraface1 = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transZebraface1');greenzebraface1.tint =  0x51C735; greenzebraface1.scale.setTo(spriteScaleX, spriteScaleY); 
greenzebraface1.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(zebraface1Flag == 1 && blueFlag == 1){var bluezebraface1 = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transZebraface1'); bluezebraface1.tint =  0x456AC1; bluezebraface1.scale.setTo(spriteScaleX, spriteScaleY); bluezebraface1.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(zebraface1Flag == 1 && orangeFlag == 1){var orangezebraface1 = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transZebraface1'); orangezebraface1.tint =  0xF38932; orangezebraface1.scale.setTo(spriteScaleX, spriteScaleY); orangezebraface1.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(zebraface1Flag == 1 && redFlag == 1){var redzebraface1 = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transZebraface1'); redzebraface1.tint =  0xE32424; redzebraface1.scale.setTo(spriteScaleX, spriteScaleY); redzebraface1.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(zebraface1Flag == 1 && pinkFlag == 1){var pinkzebraface1 = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transZebraface1'); pinkzebraface1.tint =  0xCC3ACC; pinkzebraface1.scale.setTo(spriteScaleX, spriteScaleY); pinkzebraface1.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(zebraface1Flag == 1 && cyanFlag == 1){var cyanzebraface1 = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transZebraface1'); cyanzebraface1.tint =  0x45C1C1; cyanzebraface1.scale.setTo(spriteScaleX, spriteScaleY); cyanzebraface1.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //zebrafront
                    if(zebrafrontFlag == 1 && greenFlag == 1 ){var greenzebrafront = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transZebrafront');greenzebrafront.tint =  0x51C735; greenzebrafront.scale.setTo(spriteScaleX, spriteScaleY); 
greenzebrafront.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(zebrafrontFlag == 1 && blueFlag == 1){console.log("bluezebrafront plotted");var bluezebrafront = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transZebrafront'); bluezebrafront.tint =  0x456AC1; bluezebrafront.scale.setTo(spriteScaleX, spriteScaleY); bluezebrafront.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(zebrafrontFlag == 1 && orangeFlag == 1){var orangezebrafront = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transZebrafront'); orangezebrafront.tint =  0xF38932; orangezebrafront.scale.setTo(spriteScaleX, spriteScaleY); orangezebrafront.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(zebrafrontFlag == 1 && redFlag == 1){var redzebrafront = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transZebrafront'); redzebrafront.tint =  0xE32424; redzebrafront.scale.setTo(spriteScaleX, spriteScaleY); redzebrafront.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(zebrafrontFlag == 1 && pinkFlag == 1){var pinkzebrafront = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transZebrafront'); pinkzebrafront.tint =  0xCC3ACC; pinkzebrafront.scale.setTo(spriteScaleX, spriteScaleY); pinkzebrafront.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(zebrafrontFlag == 1 && cyanFlag == 1){var cyanzebrafront = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transZebrafront'); cyanzebrafront.tint =  0x45C1C1; cyanzebrafront.scale.setTo(spriteScaleX, spriteScaleY); cyanzebrafront.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //zebraleft    
                    if(zebraleftFlag == 1 && greenFlag == 1 ){var greenzebraleft = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transZebraleft');greenzebraleft.tint =  0x51C735; greenzebraleft.scale.setTo(spriteScaleX, spriteScaleY); 
greenzebraleft.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(zebraleftFlag == 1 && blueFlag == 1){console.log("bluezebraleft plotted");var bluezebraleft = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transZebraleft'); bluezebraleft.tint =  0x456AC1; bluezebraleft.scale.setTo(spriteScaleX, spriteScaleY); bluezebraleft.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(zebraleftFlag == 1 && orangeFlag == 1){var orangezebraleft = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transZebraleft'); orangezebraleft.tint =  0xF38932; orangezebraleft.scale.setTo(spriteScaleX, spriteScaleY); orangezebraleft.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(zebraleftFlag == 1 && redFlag == 1){var redzebraleft = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transZebraleft'); redzebraleft.tint =  0xE32424; redzebraleft.scale.setTo(spriteScaleX, spriteScaleY); redzebraleft.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(zebraleftFlag == 1 && pinkFlag == 1){var pinkzebraleft = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transZebraleft'); pinkzebraleft.tint =  0xCC3ACC; pinkzebraleft.scale.setTo(spriteScaleX, spriteScaleY); pinkzebraleft.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(zebraleftFlag == 1 && cyanFlag == 1){var cyanzebraleft = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transZebraleft'); cyanzebraleft.tint =  0x45C1C1; cyanzebraleft.scale.setTo(spriteScaleX, spriteScaleY); cyanzebraleft.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //zebraright   
                    if(ziptiltFlag == 1 && greenFlag == 1 ){var greenzebraright = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transZebraright');greenzebraright.tint =  0x51C735; greenzebraright.scale.setTo(spriteScaleX, spriteScaleY); 
greenzebraright.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(ziptiltFlag == 1 && blueFlag == 1){console.log("bluezebraright plotted");var bluezebraright = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transZebraright'); bluezebraright.tint =  0x456AC1; bluezebraright.scale.setTo(spriteScaleX, spriteScaleY); bluezebraright.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(ziptiltFlag == 1 && orangeFlag == 1){var orangezebraright = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transZebraright'); orangezebraright.tint =  0xF38932; orangezebraright.scale.setTo(spriteScaleX, spriteScaleY); orangezebraright.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(ziptiltFlag == 1 && redFlag == 1){var redzebraright = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transZebraright'); redzebraright.tint =  0xE32424; redzebraright.scale.setTo(spriteScaleX, spriteScaleY); redzebraright.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(ziptiltFlag == 1 && pinkFlag == 1){var pinkzebraright = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transZebraright'); pinkzebraright.tint =  0xCC3ACC; pinkzebraright.scale.setTo(spriteScaleX, spriteScaleY); pinkzebraright.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(ziptiltFlag == 1 && cyanFlag == 1){var cyanzebraright = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transZebraright'); cyanzebraright.tint =  0x45C1C1; cyanzebraright.scale.setTo(spriteScaleX, spriteScaleY); cyanzebraright.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //zip    
                    if(zipFlag == 1 && greenFlag == 1 ){var greenzip = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transZip');greenzip.tint =  0x51C735; greenzip.scale.setTo(spriteScaleX, spriteScaleY); 
greenzip.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(zipFlag == 1 && blueFlag == 1){console.log("bluezip plotted");var bluezip = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transZip'); bluezip.tint =  0x456AC1; bluezip.scale.setTo(spriteScaleX, spriteScaleY); bluezip.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(zipFlag == 1 && orangeFlag == 1){var orangezip = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transZip'); orangezip.tint =  0xF38932; orangezip.scale.setTo(spriteScaleX, spriteScaleY); orangezip.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(zipFlag == 1 && redFlag == 1){var redzip = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transZip'); redzip.tint =  0xE32424; redzip.scale.setTo(spriteScaleX, spriteScaleY); redzip.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(zipFlag == 1 && pinkFlag == 1){var pinkzip = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transZip'); pinkzip.tint =  0xCC3ACC; pinkzip.scale.setTo(spriteScaleX, spriteScaleY); pinkzip.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(zipFlag == 1 && cyanFlag == 1){var cyanzip = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transZip'); cyanzip.tint =  0x45C1C1; cyanzip.scale.setTo(spriteScaleX, spriteScaleY); cyanzip.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //ziptilt    
                    if(zebrarightFlag == 1 && greenFlag == 1 ){var greenziptilt = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transZuchhini');greenziptilt.tint =  0x51C735; greenziptilt.scale.setTo(spriteScaleX, spriteScaleY); 
greenziptilt.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(zebrarightFlag == 1 && blueFlag == 1){console.log("blueziptilt plotted");var blueziptilt = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transZuchhini'); blueziptilt.tint =  0x456AC1; blueziptilt.scale.setTo(spriteScaleX, spriteScaleY); blueziptilt.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(zebrarightFlag == 1 && orangeFlag == 1){var orangeziptilt = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transZuchhini'); orangeziptilt.tint =  0xF38932; orangeziptilt.scale.setTo(spriteScaleX, spriteScaleY); orangeziptilt.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(zebrarightFlag == 1 && redFlag == 1){var redziptilt = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transZuchhini'); redziptilt.tint =  0xE32424; redziptilt.scale.setTo(spriteScaleX, spriteScaleY); redziptilt.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(zebrarightFlag == 1 && pinkFlag == 1){var pinkziptilt = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transZuchhini'); pinkziptilt.tint =  0xCC3ACC; pinkziptilt.scale.setTo(spriteScaleX, spriteScaleY); pinkziptilt.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(zebrarightFlag == 1 && cyanFlag == 1){var cyanziptilt = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transZuchhini'); cyanziptilt.tint =  0x45C1C1; cyanziptilt.scale.setTo(spriteScaleX, spriteScaleY); cyanziptilt.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //zuchhini    
                    if(zuchhiniFlag == 1 && greenFlag == 1 ){var greenzuchhini = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transZiptilt');greenzuchhini.tint =  0x51C735; greenzuchhini.scale.setTo(spriteScaleX, spriteScaleY); 
greenzuchhini.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(zuchhiniFlag == 1 && blueFlag == 1){console.log("bluezuchhini plotted");var bluezuchhini = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transZiptilt'); bluezuchhini.tint =  0x456AC1; bluezuchhini.scale.setTo(spriteScaleX, spriteScaleY); bluezuchhini.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(zuchhiniFlag == 1 && orangeFlag == 1){var orangezuchhini = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transZiptilt'); orangezuchhini.tint =  0xF38932; orangezuchhini.scale.setTo(spriteScaleX, spriteScaleY); orangezuchhini.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(zuchhiniFlag == 1 && redFlag == 1){var redzuchhini = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transZiptilt'); redzuchhini.tint =  0xE32424; redzuchhini.scale.setTo(spriteScaleX, spriteScaleY); redzuchhini.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(zuchhiniFlag == 1 && pinkFlag == 1){var pinkzuchhini = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transZiptilt'); pinkzuchhini.tint =  0xCC3ACC; pinkzuchhini.scale.setTo(spriteScaleX, spriteScaleY); pinkzuchhini.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(zuchhiniFlag == 1 && cyanFlag == 1){var cyanzuchhini = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transZiptilt'); cyanzuchhini.tint =  0x45C1C1; cyanzuchhini.scale.setTo(spriteScaleX, spriteScaleY); cyanzuchhini.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //zuchhinidouble 
                    if(zuchhinidoubleFlag == 1 && greenFlag == 1 ){var greenzuchhinidouble = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transZuchhinidouble');greenzuchhinidouble.tint =  0x51C735; greenzuchhinidouble.scale.setTo(spriteScaleX, spriteScaleY); 
greenzuchhinidouble.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(zuchhinidoubleFlag == 1 && blueFlag == 1){console.log("bluezuchhinidouble plotted");var bluezuchhinidouble = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transZuchhinidouble'); bluezuchhinidouble.tint =  0x456AC1; bluezuchhinidouble.scale.setTo(spriteScaleX, spriteScaleY); bluezuchhinidouble.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(zuchhinidoubleFlag == 1 && orangeFlag == 1){var orangezuchhinidouble = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transZuchhinidouble'); orangezuchhinidouble.tint =  0xF38932; orangezuchhinidouble.scale.setTo(spriteScaleX, spriteScaleY); orangezuchhinidouble.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(zuchhinidoubleFlag == 1 && redFlag == 1){var redzuchhinidouble = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transZuchhinidouble'); redzuchhinidouble.tint =  0xE32424; redzuchhinidouble.scale.setTo(spriteScaleX, spriteScaleY); redzuchhinidouble.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(zuchhinidoubleFlag == 1 && pinkFlag == 1){var pinkzuchhinidouble = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transZuchhinidouble'); pinkzuchhinidouble.tint =  0xCC3ACC; pinkzuchhinidouble.scale.setTo(spriteScaleX, spriteScaleY); pinkzuchhinidouble.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(zuchhinidoubleFlag == 1 && cyanFlag == 1){var cyanzuchhinidouble = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transZuchhinidouble'); cyanzuchhinidouble.tint =  0x45C1C1; cyanzuchhinidouble.scale.setTo(spriteScaleX, spriteScaleY); cyanzuchhinidouble.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
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
            
            game.world.bringToTop(zLetter);
            
            game.world.bringToTop(blue);
            game.world.bringToTop(green);
            game.world.bringToTop(red);
            game.world.bringToTop(cyan);
            game.world.bringToTop(orange);
            game.world.bringToTop(pink);
            
            game.world.bringToTop(cloud1);
            game.world.bringToTop(cloud2);
            game.world.bringToTop(cloud3);
            
            game.world.bringToTop(zebra);
            game.world.bringToTop(zebraface);
            game.world.bringToTop(zebraface1);
            game.world.bringToTop(zebrafront);
            game.world.bringToTop(zebraleft);
            game.world.bringToTop(zebraright);
            game.world.bringToTop(zip);
            game.world.bringToTop(ziptilt);
            game.world.bringToTop(zuchhini);
            game.world.bringToTop(zuchhinidouble);
            
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
            
            
            
            if(zebraFlag == 1){zebra.angle += 2;}
            if(zebrafaceFlag == 1){zebraface.angle += 2;}
            if(zebraface1Flag == 1){zebraface1.angle += 2;}
            if(zebrafrontFlag == 1){zebrafront.angle += 2;}
            if(zebraleftFlag == 1){zebraleft.angle += 2;}
            if(ziptiltFlag == 1){zebraright.angle += 2;}
            if(zipFlag == 1){zip.angle += 2;}
            if(zebrarightFlag == 1){ziptilt.angle += 2;}
            if(zuchhiniFlag == 1){zuchhini.angle += 2;}
            if(zuchhinidoubleFlag == 1){zuchhinidouble.angle += 2;}
            
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
            
            if(zObjectClicked == 10){
            
                askForEnd = 1;
                //game.endButton = game.add.sprite(1170, 730, 'endButton');             
                //game.endButton.scale.setTo(1, 1); 
                //game.endButton.anchor.setTo(spriteAnchorX, spriteAnchorY);
                
            }
            
        if(askForEnd == 1){
            
            //game.world.bringToTop(game.endButton);
            //game.endButton.inputEnabled = true;
            //game.endButton.events.onInputDown.add(onDownEnd, this);
            /*function onDownEnd() {
            
                //start next level
                
              //  this.setZGlobalVaribalesToZero();
                //game.state.start('H');
                
            }*/
        }
           
        },
        
        resetZSpriteFlag: function(){
            
            zebraFlag = 0;zebrafaceFlag = 0;zebraface1Flag = 0;ziptiltFlag = 0;zebrafrontFlag = 0;
            zebraleftFlag = 0;zipFlag = 0;zebrarightFlag = 0;zuchhiniFlag = 0;zuchhinidoubleFlag = 0;
            camelFlag = 0;candleFlag = 0;carFlag = 0;catFlag = 0;cheeseFlag = 0;cherryFlag = 0;
            clockFlag = 0;cowFlag = 0;crabFlag = 0;crownFlag = 0;

            zebra.angle = 0;zebraface.angle = 0;zebraface1.angle = 0;zebraright.angle = 0;zebrafront.angle = 0;
            zebraleft.angle = 0;zip.angle = 0;ziptilt.angle = 0;zuchhini.angle = 0;zuchhinidouble.angle = 0;
            camel.angle = 0;candle.angle = 0;car.angle = 0;cat.angle = 0;cheese.angle = 0;
            cherry.angle = 0;crown.angle = 0;clock.angle = 0;cow.angle = 0;crab.angle = 0;
           
        },
       
        setColorZFlagToZero: function(){
            
            bubbleSound.play(); blueFlag = 0;greenFlag = 0; redFlag = 0; cyanFlag = 0; pinkFlag = 0; orangeFlag = 0;
        },
        
        setZGlobalVaribalesToZero: function(){
            
            
            zebraFlag = 0;zebrafaceFlag = 0;zebraface1Flag = 0;ziptiltFlag = 0;zebrafrontFlag = 0;
            zebraleftFlag = 0;zipFlag = 0;zebrarightFlag = 0;zuchhiniFlag = 0;zuchhinidoubleFlag = 0;
            camelFlag = 0;candleFlag = 0;carFlag = 0;catFlag = 0;cheeseFlag = 0;cherryFlag = 0;
            clockFlag = 0;cowFlag = 0;crabFlag = 0;crownFlag = 0;



            greenFlag = 0;blueFlag = 0;orangeFlag = 0;redFlag = 0;pinkFlag = 0;cyanFlag = 0;
        }
        
        
    };