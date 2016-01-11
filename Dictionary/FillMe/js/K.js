        
    var kObjectClicked = 0;
    var askForLevelL = 0;
    
    
    var kayakFlag = 0;
    var kettleFlag = 0;
    var keyFlag = 0;            
    var keyboardFlag = 0;
    var kingFlag = 0;
    var kitFlag = 0;
    var kiteFlag = 0;
    var kiwiFlag = 0;
    var knifeFlag = 0;
    var koalaFlag = 0;
    
    
    var K = {

        preload: function () {

            //setting default path for assets to be used in game
            this.load.path = './assets/K/';
            
            
            
            this.load.image("transKayak", "transKayak.png");
            this.load.image("transKettle", "transKettle.png");
            this.load.image("transKey", "transKey.png");
            this.load.image("transKeyboard", "transKeyboard.png");
            this.load.image("transKing", "transKing.png");
            this.load.image("transKit", "transKit.png");
            this.load.image("transKite", "transKite.png");
            this.load.image("transKiwi", "transKiwi.png");
            this.load.image("transKnife", "transKnife.png");
            this.load.image("transKoala", "transKoala.png");
            
            this.load.image("kayak", "kayak.png");
            this.load.image("kettle", "kettle.png");
            this.load.image("key", "key.png");
            this.load.image("keyboard", "keyboard.png");
            this.load.image("king", "king.png");
            this.load.image("kit", "kit.png");
            this.load.image("kite", "kite.png");
            this.load.image("kiwi", "kiwi.png");
            this.load.image("knife", "knife.png");
            this.load.image("koala", "koala.png");
            
            
            //loading assets for the level  K
            
            //loading shades
            this.load.image("blue", "blue.png");
            this.load.image("cyan", "cyan.png");
            this.load.image("green", "green.png");
            this.load.image("orange", "orange.png");
            this.load.image("pink", "pink.png");
            this.load.image("red", "red.png");
    
            this.load.image("bg", "bg.png");
            this.load.image("kLetter", "kLetter.png");
            this.load.image("lButton", "lButton.png");
            
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
                
            
            
            
            //Main letter K
            kLetter = game.add.sprite(gameMinWidth, gameMinHeight, 'kLetter');
            kLetter.inputEnabled = true;
            kLetter.events.onInputDown.add(this.onDownkLetter, this);
            
            
            
            //Objects starting from K
                    
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
            
            
            
            
            kayak = game.add.sprite(objectsPositions[0].x, objectsPositions[0].y, 'kayak');
            kayak.anchor.setTo(spriteAnchorX, spriteAnchorY);
            kayak.scale.setTo(spriteScaleX, spriteScaleY);
            kayak.inputEnabled = true;
            kayak.events.onInputDown.add(onDownkayak, this);
            function onDownkayak() {this.resetKSpriteFlag(); kayakFlag = 1;kObjectClicked++;}

            
            
            
            kettle = game.add.sprite(objectsPositions[10].x, objectsPositions[10].y, 'kettle');
            kettle.anchor.setTo(spriteAnchorX, spriteAnchorY);
            kettle.scale.setTo(spriteScaleX, spriteScaleY);
            kettle.inputEnabled = true;
            kettle.events.onInputDown.add(onDownkettle, this);
            function onDownkettle() {this.resetKSpriteFlag(); kettleFlag = 1;kObjectClicked++;}

            
            
            
            key = game.add.sprite(objectsPositions[1].x, objectsPositions[1].y, 'key');
            key.anchor.setTo(spriteAnchorX, spriteAnchorY);
            key.scale.setTo(spriteScaleX, spriteScaleY);
            key.inputEnabled = true;
            key.events.onInputDown.add(onDownkey, this);
            function onDownkey() {this.resetKSpriteFlag(); keyFlag = 1;kObjectClicked++;}
            
            
            
            
            keyboard = game.add.sprite(objectsPositions[11].x, objectsPositions[11].y, 'keyboard');
            keyboard.anchor.setTo(spriteAnchorX, spriteAnchorY);
            keyboard.scale.setTo(spriteScaleX, spriteScaleY);
            keyboard.inputEnabled = true;
            keyboard.events.onInputDown.add(onDownkeyboard, this);
            function onDownkeyboard() {this.resetKSpriteFlag(); keyboardFlag = 1;kObjectClicked++;}
            
            
            
            king = game.add.sprite(objectsPositions[2].x, objectsPositions[2].y, 'king');
            king.anchor.setTo(spriteAnchorX, spriteAnchorY);
            king.scale.setTo(spriteScaleX, spriteScaleY);
            king.inputEnabled = true;
            king.events.onInputDown.add(onDownking, this);
            function onDownking() {this.resetKSpriteFlag(); kingFlag = 1;kObjectClicked++;}
            
            kit = game.add.sprite(objectsPositions[12].x, objectsPositions[12].y, 'kit');
            kit.anchor.setTo(spriteAnchorX, spriteAnchorY);
            kit.scale.setTo(spriteScaleX, spriteScaleY);
            kit.inputEnabled = true;
            kit.events.onInputDown.add(onDownkit, this);
            function onDownkit() {this.resetKSpriteFlag(); kiwiFlag = 1;kObjectClicked++;}

            
            kite = game.add.sprite(objectsPositions[3].x, objectsPositions[3].y, 'kite');
            kite.anchor.setTo(spriteAnchorX, spriteAnchorY);
            kite.scale.setTo(spriteScaleX, spriteScaleY);
            kite.inputEnabled = true;  
            kite.events.onInputDown.add(onDownkite, this);
            function onDownkite() {this.resetKSpriteFlag(); kiteFlag = 1;kObjectClicked++;}
            
            
            kiwi = game.add.sprite(objectsPositions[13].x, objectsPositions[13].y, 'kiwi');
            kiwi.anchor.setTo(spriteAnchorX, spriteAnchorY);
            kiwi.scale.setTo(spriteScaleX, spriteScaleY);
            kiwi.inputEnabled = true;
            kiwi.events.onInputDown.add(onDownkiwi, this);
            function onDownkiwi() {this.resetKSpriteFlag(); kitFlag = 1;kObjectClicked++;}
            
            
            knife = game.add.sprite(objectsPositions[4].x, objectsPositions[4].y, 'knife');
            knife.anchor.setTo(spriteAnchorX, spriteAnchorY);
            knife.scale.setTo(spriteScaleX, spriteScaleY);
            knife.inputEnabled = true;
            knife.events.onInputDown.add(onDownknife, this);
            function onDownknife() {this.resetKSpriteFlag(); knifeFlag = 1;kObjectClicked++;}
            
            
            koala = game.add.sprite(objectsPositions[14].x, objectsPositions[14].y, 'koala');
            koala.anchor.setTo(spriteAnchorX, spriteAnchorY);
            koala.scale.setTo(spriteScaleX, spriteScaleY);
            koala.inputEnabled = true;
            koala.events.onInputDown.add(onDownkoala, this);
            function onDownkoala() {this.resetKSpriteFlag(); koalaFlag = 1;kObjectClicked++;}
            
            
            
            //Adding other sprites        
            
            camel = game.add.sprite(objectsPositions[5].x, objectsPositions[5].y, 'camel');
            camel.anchor.setTo(spriteAnchorX, spriteAnchorY);
            camel.scale.setTo(spriteScaleX, spriteScaleY);
            camel.inputEnabled = true;
            camel.events.onInputDown.add(onDownCamel, this);
            function onDownCamel() {this.resetKSpriteFlag(); camelFlag = 1;}
            
            
            
            
            candle = game.add.sprite(objectsPositions[15].x, objectsPositions[15].y, 'candle');
            candle.anchor.setTo(spriteAnchorX, spriteAnchorY);
            candle.scale.setTo(spriteScaleX, spriteScaleY);
            candle.inputEnabled = true;
            candle.events.onInputDown.add(onDownCandle, this);
            function onDownCandle() {this.resetKSpriteFlag(); candleFlag = 1; }
            
            
            car = game.add.sprite(objectsPositions[6].x, objectsPositions[6].y, 'car');
            car.anchor.setTo(spriteAnchorX, spriteAnchorY);
            car.scale.setTo(spriteScaleX, spriteScaleY);
            car.inputEnabled = true;
            car.events.onInputDown.add(onDownCar, this);
            function onDownCar() {this.resetKSpriteFlag(); carFlag = 1;}
            
            cat = game.add.sprite(objectsPositions[16].x, objectsPositions[16].y, 'cat');
            cat.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cat.scale.setTo(spriteScaleX, spriteScaleY);
            cat.inputEnabled = true;
            cat.events.onInputDown.add(onDownCat, this);
            function onDownCat() {this.resetKSpriteFlag(); catFlag = 1;}
            
            
            cheese = game.add.sprite(objectsPositions[7].x, objectsPositions[7].y, 'cheese');
            cheese.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cheese.scale.setTo(spriteScaleX, spriteScaleY);
            cheese.inputEnabled = true;
            cheese.events.onInputDown.add(onDownCheese, this);
            function onDownCheese() {this.resetKSpriteFlag(); cheeseFlag = 1;}
            
            
            cherry = game.add.sprite(objectsPositions[17].x, objectsPositions[17].y, 'cherry');
            cherry.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cherry.scale.setTo(spriteScaleX, spriteScaleY);
            cherry.inputEnabled = true;
            cherry.events.onInputDown.add(onDownCherry, this);
            function onDownCherry() {this.resetKSpriteFlag(); cherryFlag = 1;}
            
            
            clock = game.add.sprite(objectsPositions[8].x, objectsPositions[8].y, 'clock');
            clock.anchor.setTo(spriteAnchorX, spriteAnchorY);
            clock.scale.setTo(spriteScaleX, spriteScaleY);
            clock.inputEnabled = true;
            clock.events.onInputDown.add(onDownClock, this);
            function onDownClock() {this.resetKSpriteFlag(); clockFlag = 1;}
            
            
            
            cow = game.add.sprite(objectsPositions[18].x, objectsPositions[18].y, 'cow');
            cow.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cow.scale.setTo(spriteScaleX, spriteScaleY);
            cow.inputEnabled = true;
            cow.events.onInputDown.add(onDownCow, this);
            function onDownCow() {this.resetKSpriteFlag(); cowFlag = 1;}
            
            
            crab = game.add.sprite(objectsPositions[9].x, objectsPositions[9].y, 'crab');
            crab.anchor.setTo(spriteAnchorX, spriteAnchorY);
            crab.scale.setTo(spriteScaleX, spriteScaleY);
            crab.inputEnabled = true;
            crab.events.onInputDown.add(onDownCrab, this);
            function onDownCrab() {this.resetKSpriteFlag(); crabFlag = 1;}
            
            
            crown = game.add.sprite(objectsPositions[19].x, objectsPositions[19].y, 'crown');
            crown.anchor.setTo(spriteAnchorX, spriteAnchorY);
            crown.scale.setTo(spriteScaleX, spriteScaleY);
            crown.inputEnabled = true;
            crown.events.onInputDown.add(onDownCrown, this);
            function onDownCrown() {this.resetKSpriteFlag(); crownFlag = 1;}
            
            
            
            //Color shades
            blue = game.add.sprite(objectsPositions[20].x, objectsPositions[20].y, 'blue');
            blue.anchor.setTo(spriteAnchorX, spriteAnchorY);
            blue.scale.setTo(shadeScaleX, shadeScaleY);
            blue.inputEnabled = true;
            blue.tint = 0x456AC1; 
            blue.events.onInputDown.add(onDownBlue, this);
            function onDownBlue() {this.setColorKFlagToZero(); blueFlag = 1;}
           
            
            cyan = game.add.sprite(objectsPositions[21].x, objectsPositions[21].y, 'cyan');
            cyan.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cyan.scale.setTo(shadeScaleX, shadeScaleY);
            cyan.inputEnabled = true;
            cyan.tint = 0x45C1C1; 
            cyan.events.onInputDown.add(onDownCyan, this);
            function onDownCyan() {this.setColorKFlagToZero(); cyanFlag = 1;}
            
            
            
            green = game.add.sprite(objectsPositions[22].x, objectsPositions[22].y, 'green');
            green.anchor.setTo(spriteAnchorX, spriteAnchorY);
            green.scale.setTo(shadeScaleX, shadeScaleY);
            green.inputEnabled = true;
            green.tint = 0x51C735;
            green.events.onInputDown.add(onDownGreen, this);
            function onDownGreen() {this.setColorKFlagToZero(); greenFlag = 1;}
            
            
            orange = game.add.sprite(objectsPositions[23].x, objectsPositions[23].y, 'orange');
            orange.anchor.setTo(spriteAnchorX, spriteAnchorY);
            orange.scale.setTo(shadeScaleX, shadeScaleY);
            orange.inputEnabled = true;
            orange.tint = 0xF38932;
            orange.events.onInputDown.add(onDownOrange, this);
            function onDownOrange() {this.setColorKFlagToZero(); orangeFlag = 1;}
           
            
            pink = game.add.sprite(objectsPositions[24].x, objectsPositions[24].y, 'pink');
            pink.anchor.setTo(spriteAnchorX, spriteAnchorY);
            pink.scale.setTo(shadeScaleX, shadeScaleY);
            pink.inputEnabled = true;
            pink.tint = 0xCC3ACC;
            pink.events.onInputDown.add(onDownPink, this);
            function onDownPink() {this.setColorKFlagToZero(); pinkFlag = 1;}
            
            
            red = game.add.sprite(objectsPositions[25].x, objectsPositions[25].y, 'red');
            red.anchor.setTo(spriteAnchorX, spriteAnchorY);
            red.scale.setTo(shadeScaleX, shadeScaleY);
            red.inputEnabled = true;
            red.tint = 0xE32424;
            red.events.onInputDown.add(onDownRed, this);
            function onDownRed() {this.setColorKFlagToZero(); redFlag = 1;}
                
        },
        
        onDownkLetter: function() {
                
            //kayak
                    if(kayakFlag == 1 && greenFlag == 1 ){var greenkayak = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transKayak');greenkayak.tint =  0x51C735; greenkayak.scale.setTo(spriteScaleX, spriteScaleY); 
greenkayak.anchor.setTo(0.6, 0.6);stickSound.play();}                    
                    
                    if(kayakFlag == 1 && blueFlag == 1){var bluekayak = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transKayak'); bluekayak.tint =  0x456AC1; bluekayak.scale.setTo(spriteScaleX, spriteScaleY); bluekayak.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(kayakFlag == 1 && orangeFlag == 1){var orangekayak = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transKayak'); orangekayak.tint =  0xF38932; orangekayak.scale.setTo(spriteScaleX, spriteScaleY); orangekayak.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(kayakFlag == 1 && redFlag == 1){var redkayak = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transKayak'); redkayak.tint =  0xE32424; redkayak.scale.setTo(spriteScaleX, spriteScaleY); redkayak.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(kayakFlag == 1 && pinkFlag == 1){var pinkkayak = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transKayak'); pinkkayak.tint =  0xCC3ACC; pinkkayak.scale.setTo(spriteScaleX, spriteScaleY); pinkkayak.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(kayakFlag == 1 && cyanFlag == 1){var cyankayak = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transKayak'); cyankayak.tint =  0x45C1C1; cyankayak.scale.setTo(spriteScaleX, spriteScaleY); cyankayak.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //kettle    
                    if(kettleFlag == 1 && greenFlag == 1 ){var greenkettle = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transKettle');greenkettle.tint =  0x51C735; greenkettle.scale.setTo(spriteScaleX, spriteScaleY); 
greenkettle.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(kettleFlag == 1 && blueFlag == 1){var bluekettle = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transKettle'); bluekettle.tint =  0x456AC1; bluekettle.scale.setTo(spriteScaleX, spriteScaleY); bluekettle.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(kettleFlag == 1 && orangeFlag == 1){var orangekettle = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transKettle'); orangekettle.tint =  0xF38932; orangekettle.scale.setTo(spriteScaleX, spriteScaleY); orangekettle.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(kettleFlag == 1 && redFlag == 1){var redkettle = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transKettle'); redkettle.tint =  0xE32424; redkettle.scale.setTo(spriteScaleX, spriteScaleY); redkettle.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(kettleFlag == 1 && pinkFlag == 1){var pinkkettle = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transKettle'); pinkkettle.tint =  0xCC3ACC; pinkkettle.scale.setTo(spriteScaleX, spriteScaleY); pinkkettle.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(kettleFlag == 1 && cyanFlag == 1){var cyankettle = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transKettle'); cyankettle.tint =  0x45C1C1; cyankettle.scale.setTo(spriteScaleX, spriteScaleY); cyankettle.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //key    
                    if(keyFlag == 1 && greenFlag == 1 ){var greenkey = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transKey');greenkey.tint =  0x51C735; greenkey.scale.setTo(spriteScaleX, spriteScaleY); 
greenkey.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(keyFlag == 1 && blueFlag == 1){var bluekey = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transKey'); bluekey.tint =  0x456AC1; bluekey.scale.setTo(spriteScaleX, spriteScaleY); bluekey.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(keyFlag == 1 && orangeFlag == 1){var orangekey = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transKey'); orangekey.tint =  0xF38932; orangekey.scale.setTo(spriteScaleX, spriteScaleY); orangekey.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(keyFlag == 1 && redFlag == 1){var redkey = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transKey'); redkey.tint =  0xE32424; redkey.scale.setTo(spriteScaleX, spriteScaleY); redkey.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(keyFlag == 1 && pinkFlag == 1){var pinkkey = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transKey'); pinkkey.tint =  0xCC3ACC; pinkkey.scale.setTo(spriteScaleX, spriteScaleY); pinkkey.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(keyFlag == 1 && cyanFlag == 1){var cyankey = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transKey'); cyankey.tint =  0x45C1C1; cyankey.scale.setTo(spriteScaleX, spriteScaleY); cyankey.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //keyboard
                    if(keyboardFlag == 1 && greenFlag == 1 ){var greenkeyboard = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transKeyboard');greenkeyboard.tint =  0x51C735; greenkeyboard.scale.setTo(spriteScaleX, spriteScaleY); 
greenkeyboard.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(keyboardFlag == 1 && blueFlag == 1){console.log("bluekeyboard plotted");var bluekeyboard = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transKeyboard'); bluekeyboard.tint =  0x456AC1; bluekeyboard.scale.setTo(spriteScaleX, spriteScaleY); bluekeyboard.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(keyboardFlag == 1 && orangeFlag == 1){var orangekeyboard = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transKeyboard'); orangekeyboard.tint =  0xF38932; orangekeyboard.scale.setTo(spriteScaleX, spriteScaleY); orangekeyboard.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(keyboardFlag == 1 && redFlag == 1){var redkeyboard = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transKeyboard'); redkeyboard.tint =  0xE32424; redkeyboard.scale.setTo(spriteScaleX, spriteScaleY); redkeyboard.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(keyboardFlag == 1 && pinkFlag == 1){var pinkkeyboard = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transKeyboard'); pinkkeyboard.tint =  0xCC3ACC; pinkkeyboard.scale.setTo(spriteScaleX, spriteScaleY); pinkkeyboard.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(keyboardFlag == 1 && cyanFlag == 1){var cyankeyboard = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transKeyboard'); cyankeyboard.tint =  0x45C1C1; cyankeyboard.scale.setTo(spriteScaleX, spriteScaleY); cyankeyboard.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //king    
                    if(kingFlag == 1 && greenFlag == 1 ){var greenking = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transKing');greenking.tint =  0x51C735; greenking.scale.setTo(spriteScaleX, spriteScaleY); 
greenking.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(kingFlag == 1 && blueFlag == 1){console.log("blueking plotted");var blueking = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transKing'); blueking.tint =  0x456AC1; blueking.scale.setTo(spriteScaleX, spriteScaleY); blueking.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(kingFlag == 1 && orangeFlag == 1){var orangeking = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transKing'); orangeking.tint =  0xF38932; orangeking.scale.setTo(spriteScaleX, spriteScaleY); orangeking.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(kingFlag == 1 && redFlag == 1){var redking = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transKing'); redking.tint =  0xE32424; redking.scale.setTo(spriteScaleX, spriteScaleY); redking.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(kingFlag == 1 && pinkFlag == 1){var pinkking = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transKing'); pinkking.tint =  0xCC3ACC; pinkking.scale.setTo(spriteScaleX, spriteScaleY); pinkking.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(kingFlag == 1 && cyanFlag == 1){var cyanking = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transKing'); cyanking.tint =  0x45C1C1; cyanking.scale.setTo(spriteScaleX, spriteScaleY); cyanking.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //kit   
                    if(kiwiFlag == 1 && greenFlag == 1 ){var greenkit = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transKit');greenkit.tint =  0x51C735; greenkit.scale.setTo(spriteScaleX, spriteScaleY); 
greenkit.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(kiwiFlag == 1 && blueFlag == 1){console.log("bluekit plotted");var bluekit = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transKit'); bluekit.tint =  0x456AC1; bluekit.scale.setTo(spriteScaleX, spriteScaleY); bluekit.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(kiwiFlag == 1 && orangeFlag == 1){var orangekit = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transKit'); orangekit.tint =  0xF38932; orangekit.scale.setTo(spriteScaleX, spriteScaleY); orangekit.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(kiwiFlag == 1 && redFlag == 1){var redkit = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transKit'); redkit.tint =  0xE32424; redkit.scale.setTo(spriteScaleX, spriteScaleY); redkit.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(kiwiFlag == 1 && pinkFlag == 1){var pinkkit = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transKit'); pinkkit.tint =  0xCC3ACC; pinkkit.scale.setTo(spriteScaleX, spriteScaleY); pinkkit.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(kiwiFlag == 1 && cyanFlag == 1){var cyankit = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transKit'); cyankit.tint =  0x45C1C1; cyankit.scale.setTo(spriteScaleX, spriteScaleY); cyankit.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //kite    
                    if(kiteFlag == 1 && greenFlag == 1 ){var greenkite = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transKite');greenkite.tint =  0x51C735; greenkite.scale.setTo(spriteScaleX, spriteScaleY); 
greenkite.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(kiteFlag == 1 && blueFlag == 1){console.log("bluekite plotted");var bluekite = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transKite'); bluekite.tint =  0x456AC1; bluekite.scale.setTo(spriteScaleX, spriteScaleY); bluekite.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(kiteFlag == 1 && orangeFlag == 1){var orangekite = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transKite'); orangekite.tint =  0xF38932; orangekite.scale.setTo(spriteScaleX, spriteScaleY); orangekite.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(kiteFlag == 1 && redFlag == 1){var redkite = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transKite'); redkite.tint =  0xE32424; redkite.scale.setTo(spriteScaleX, spriteScaleY); redkite.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(kiteFlag == 1 && pinkFlag == 1){var pinkkite = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transKite'); pinkkite.tint =  0xCC3ACC; pinkkite.scale.setTo(spriteScaleX, spriteScaleY); pinkkite.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(kiteFlag == 1 && cyanFlag == 1){var cyankite = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transKite'); cyankite.tint =  0x45C1C1; cyankite.scale.setTo(spriteScaleX, spriteScaleY); cyankite.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //kiwi    
                    if(kitFlag == 1 && greenFlag == 1 ){var greenkiwi = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transKiwi');greenkiwi.tint =  0x51C735; greenkiwi.scale.setTo(spriteScaleX, spriteScaleY); 
greenkiwi.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(kitFlag == 1 && blueFlag == 1){console.log("bluekiwi plotted");var bluekiwi = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transKiwi'); bluekiwi.tint =  0x456AC1; bluekiwi.scale.setTo(spriteScaleX, spriteScaleY); bluekiwi.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(kitFlag == 1 && orangeFlag == 1){var orangekiwi = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transKiwi'); orangekiwi.tint =  0xF38932; orangekiwi.scale.setTo(spriteScaleX, spriteScaleY); orangekiwi.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(kitFlag == 1 && redFlag == 1){var redkiwi = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transKiwi'); redkiwi.tint =  0xE32424; redkiwi.scale.setTo(spriteScaleX, spriteScaleY); redkiwi.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(kitFlag == 1 && pinkFlag == 1){var pinkkiwi = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transKiwi'); pinkkiwi.tint =  0xCC3ACC; pinkkiwi.scale.setTo(spriteScaleX, spriteScaleY); pinkkiwi.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(kitFlag == 1 && cyanFlag == 1){var cyankiwi = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transKiwi'); cyankiwi.tint =  0x45C1C1; cyankiwi.scale.setTo(spriteScaleX, spriteScaleY); cyankiwi.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //knife    
                    if(knifeFlag == 1 && greenFlag == 1 ){var greenknife = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transKnife');greenknife.tint =  0x51C735; greenknife.scale.setTo(spriteScaleX, spriteScaleY); 
greenknife.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(knifeFlag == 1 && blueFlag == 1){console.log("blueknife plotted");var blueknife = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transKnife'); blueknife.tint =  0x456AC1; blueknife.scale.setTo(spriteScaleX, spriteScaleY); blueknife.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(knifeFlag == 1 && orangeFlag == 1){var orangeknife = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transKnife'); orangeknife.tint =  0xF38932; orangeknife.scale.setTo(spriteScaleX, spriteScaleY); orangeknife.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(knifeFlag == 1 && redFlag == 1){var redknife = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transKnife'); redknife.tint =  0xE32424; redknife.scale.setTo(spriteScaleX, spriteScaleY); redknife.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(knifeFlag == 1 && pinkFlag == 1){var pinkknife = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transKnife'); pinkknife.tint =  0xCC3ACC; pinkknife.scale.setTo(spriteScaleX, spriteScaleY); pinkknife.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(knifeFlag == 1 && cyanFlag == 1){var cyanknife = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transKnife'); cyanknife.tint =  0x45C1C1; cyanknife.scale.setTo(spriteScaleX, spriteScaleY); cyanknife.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //koala 
                    if(koalaFlag == 1 && greenFlag == 1 ){var greenkoala = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transKoala');greenkoala.tint =  0x51C735; greenkoala.scale.setTo(spriteScaleX, spriteScaleY); 
greenkoala.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(koalaFlag == 1 && blueFlag == 1){console.log("bluekoala plotted");var bluekoala = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transKoala'); bluekoala.tint =  0x456AC1; bluekoala.scale.setTo(spriteScaleX, spriteScaleY); bluekoala.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(koalaFlag == 1 && orangeFlag == 1){var orangekoala = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transKoala'); orangekoala.tint =  0xF38932; orangekoala.scale.setTo(spriteScaleX, spriteScaleY); orangekoala.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(koalaFlag == 1 && redFlag == 1){var redkoala = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transKoala'); redkoala.tint =  0xE32424; redkoala.scale.setTo(spriteScaleX, spriteScaleY); redkoala.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(koalaFlag == 1 && pinkFlag == 1){var pinkkoala = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transKoala'); pinkkoala.tint =  0xCC3ACC; pinkkoala.scale.setTo(spriteScaleX, spriteScaleY); pinkkoala.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(koalaFlag == 1 && cyanFlag == 1){var cyankoala = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transKoala'); cyankoala.tint =  0x45C1C1; cyankoala.scale.setTo(spriteScaleX, spriteScaleY); cyankoala.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
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
            
            game.world.bringToTop(kLetter);
            
            game.world.bringToTop(blue);
            game.world.bringToTop(green);
            game.world.bringToTop(red);
            game.world.bringToTop(cyan);
            game.world.bringToTop(orange);
            game.world.bringToTop(pink);
            
            game.world.bringToTop(cloud1);
            game.world.bringToTop(cloud2);
            game.world.bringToTop(cloud3);
            
            game.world.bringToTop(kayak);
            game.world.bringToTop(kettle);
            game.world.bringToTop(key);
            game.world.bringToTop(keyboard);
            game.world.bringToTop(king);
            game.world.bringToTop(kit);
            game.world.bringToTop(kite);
            game.world.bringToTop(kiwi);
            game.world.bringToTop(knife);
            game.world.bringToTop(koala);
            
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
            
            
            
            if(kayakFlag == 1){kayak.angle += 2;}
            if(kettleFlag == 1){kettle.angle += 2;}
            if(keyFlag == 1){key.angle += 2;}
            if(keyboardFlag == 1){keyboard.angle += 2;}
            if(kingFlag == 1){king.angle += 2;}
            if(kiwiFlag == 1){kit.angle += 2;}
            if(kiteFlag == 1){kite.angle += 2;}
            if(kitFlag == 1){kiwi.angle += 2;}
            if(knifeFlag == 1){knife.angle += 2;}
            if(koalaFlag == 1){koala.angle += 2;}
            
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
            
            if(kObjectClicked == 10){
            
                askForLevelL = 1;
                game.lButton = game.add.sprite(1170, 730, 'lButton');             
                game.lButton.scale.setTo(1, 1); 
                game.lButton.anchor.setTo(spriteAnchorX, spriteAnchorY);
                
            }
            
        if(askForLevelL == 1){
            
            game.world.bringToTop(game.lButton);
            game.lButton.inputEnabled = true;
            game.lButton.events.onInputDown.add(onDownK, this);
            function onDownK() {
            
                //start next level
                
                this.setKGlobalVaribalesToZero();
                game.state.start('L');
                
            }
        }
           
        },
        
        resetKSpriteFlag: function(){
            
            kayakFlag = 0;kettleFlag = 0;keyFlag = 0;kiwiFlag = 0;keyboardFlag = 0;
            kingFlag = 0;kiteFlag = 0;kitFlag = 0;knifeFlag = 0;koalaFlag = 0;
            camelFlag = 0;candleFlag = 0;carFlag = 0;catFlag = 0;cheeseFlag = 0;cherryFlag = 0;
            clockFlag = 0;cowFlag = 0;crabFlag = 0;crownFlag = 0;

            kayak.angle = 0;kettle.angle = 0;key.angle = 0;kit.angle = 0;keyboard.angle = 0;
            king.angle = 0;kite.angle = 0;kiwi.angle = 0;knife.angle = 0;koala.angle = 0;
            camel.angle = 0;candle.angle = 0;car.angle = 0;cat.angle = 0;cheese.angle = 0;
            cherry.angle = 0;crown.angle = 0;clock.angle = 0;cow.angle = 0;crab.angle = 0;
           
        },
       
        setColorKFlagToZero: function(){
            
            bubbleSound.play(); blueFlag = 0;greenFlag = 0; redFlag = 0; cyanFlag = 0; pinkFlag = 0; orangeFlag = 0;
        },
        
        setKGlobalVaribalesToZero: function(){
            
            
            kayakFlag = 0;kettleFlag = 0;keyFlag = 0;kiwiFlag = 0;keyboardFlag = 0;
            kingFlag = 0;kiteFlag = 0;kitFlag = 0;knifeFlag = 0;koalaFlag = 0;
            camelFlag = 0;candleFlag = 0;carFlag = 0;catFlag = 0;cheeseFlag = 0;cherryFlag = 0;
            clockFlag = 0;cowFlag = 0;crabFlag = 0;crownFlag = 0;



            greenFlag = 0;blueFlag = 0;orangeFlag = 0;redFlag = 0;pinkFlag = 0;cyanFlag = 0;
        }
        
        
    };