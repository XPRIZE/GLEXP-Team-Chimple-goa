        
    var lObjectClicked = 0;
    var askForLevelM = 0;
    
    
    var ladderFlag = 0;
    var ladybugFlag = 0;
    var lampFlag = 0;            
    var lanternFlag = 0;
    var leafFlag = 0;
    var lemonFlag = 0;
    var leopardFlag = 0;
    var lionFlag = 0;
    var logFlag = 0;
    var lollipopFlag = 0;
    
    
    var L = {

        preload: function () {

            //setting default path for assets to be used in game
            this.load.path = './assets/L/';
            
            
            
            this.load.image("transLadder", "transLadder.png");
            this.load.image("transLadybug", "transLadybug.png");
            this.load.image("transLamp", "transLamp.png");
            this.load.image("transLantern", "transLantern.png");
            this.load.image("transLeaf", "transLeaf.png");
            this.load.image("transLemon", "transLemon.png");
            this.load.image("transLeopard", "transLeopard.png");
            this.load.image("transLion", "transLion.png");
            this.load.image("transLog", "transLog.png");
            this.load.image("transLollipop", "transLollipop.png");
            
            this.load.image("ladder", "ladder.png");
            this.load.image("ladybug", "ladybug.png");
            this.load.image("lamp", "lamp.png");
            this.load.image("lantern", "lantern.png");
            this.load.image("leaf", "leaf.png");
            this.load.image("lemon", "lemon.png");
            this.load.image("leopard", "leopard.png");
            this.load.image("lion", "lion.png");
            this.load.image("log", "log.png");
            this.load.image("lollipop", "lollipop.png");
            
            
            //loading assets for the level  L
            
            //loading shades
            this.load.image("blue", "blue.png");
            this.load.image("cyan", "cyan.png");
            this.load.image("green", "green.png");
            this.load.image("orange", "orange.png");
            this.load.image("pink", "pink.png");
            this.load.image("red", "red.png");
    
            this.load.image("bg", "bg.png");
            this.load.image("lLetter", "lLetter.png");
            this.load.image("mButton", "mButton.png");
            
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
                
            
            
            
            //Main letter L
            lLetter = game.add.sprite(gameMinWidth, gameMinHeight, 'lLetter');
            lLetter.inputEnabled = true;
            lLetter.events.onInputDown.add(this.onDownlLetter, this);
            
            
            
            //Objects starting from L
                    
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
            
            
            
            
            ladder = game.add.sprite(objectsPositions[0].x, objectsPositions[0].y, 'ladder');
            ladder.anchor.setTo(spriteAnchorX, spriteAnchorY);
            ladder.scale.setTo(spriteScaleX, spriteScaleY);
            ladder.inputEnabled = true;
            ladder.events.onInputDown.add(onDownladder, this);
            function onDownladder() {this.resetLSpriteFlag(); ladderFlag = 1;lObjectClicked++;}

            
            
            
            ladybug = game.add.sprite(objectsPositions[10].x, objectsPositions[10].y, 'ladybug');
            ladybug.anchor.setTo(spriteAnchorX, spriteAnchorY);
            ladybug.scale.setTo(spriteScaleX, spriteScaleY);
            ladybug.inputEnabled = true;
            ladybug.events.onInputDown.add(onDownladybug, this);
            function onDownladybug() {this.resetLSpriteFlag(); ladybugFlag = 1;lObjectClicked++;}

            
            
            
            lamp = game.add.sprite(objectsPositions[1].x, objectsPositions[1].y, 'lamp');
            lamp.anchor.setTo(spriteAnchorX, spriteAnchorY);
            lamp.scale.setTo(spriteScaleX, spriteScaleY);
            lamp.inputEnabled = true;
            lamp.events.onInputDown.add(onDownlamp, this);
            function onDownlamp() {this.resetLSpriteFlag(); lampFlag = 1;lObjectClicked++;}
            
            
            
            
            lantern = game.add.sprite(objectsPositions[11].x, objectsPositions[11].y, 'lantern');
            lantern.anchor.setTo(spriteAnchorX, spriteAnchorY);
            lantern.scale.setTo(spriteScaleX, spriteScaleY);
            lantern.inputEnabled = true;
            lantern.events.onInputDown.add(onDownlantern, this);
            function onDownlantern() {this.resetLSpriteFlag(); lanternFlag = 1;lObjectClicked++;}
            
            
            
            leaf = game.add.sprite(objectsPositions[2].x, objectsPositions[2].y, 'leaf');
            leaf.anchor.setTo(spriteAnchorX, spriteAnchorY);
            leaf.scale.setTo(spriteScaleX, spriteScaleY);
            leaf.inputEnabled = true;
            leaf.events.onInputDown.add(onDownleaf, this);
            function onDownleaf() {this.resetLSpriteFlag(); leafFlag = 1;lObjectClicked++;}
            
            lemon = game.add.sprite(objectsPositions[12].x, objectsPositions[12].y, 'lemon');
            lemon.anchor.setTo(spriteAnchorX, spriteAnchorY);
            lemon.scale.setTo(spriteScaleX, spriteScaleY);
            lemon.inputEnabled = true;
            lemon.events.onInputDown.add(onDownlemon, this);
            function onDownlemon() {this.resetLSpriteFlag(); lionFlag = 1;lObjectClicked++;}

            
            leopard = game.add.sprite(objectsPositions[3].x, objectsPositions[3].y, 'leopard');
            leopard.anchor.setTo(spriteAnchorX, spriteAnchorY);
            leopard.scale.setTo(spriteScaleX, spriteScaleY);
            leopard.inputEnabled = true;  
            leopard.events.onInputDown.add(onDownleopard, this);
            function onDownleopard() {this.resetLSpriteFlag(); leopardFlag = 1;lObjectClicked++;}
            
            
            lion = game.add.sprite(objectsPositions[13].x, objectsPositions[13].y, 'lion');
            lion.anchor.setTo(spriteAnchorX, spriteAnchorY);
            lion.scale.setTo(spriteScaleX, spriteScaleY);
            lion.inputEnabled = true;
            lion.events.onInputDown.add(onDownlion, this);
            function onDownlion() {this.resetLSpriteFlag(); lemonFlag = 1;lObjectClicked++;}
            
            
            log = game.add.sprite(objectsPositions[4].x, objectsPositions[4].y, 'log');
            log.anchor.setTo(spriteAnchorX, spriteAnchorY);
            log.scale.setTo(spriteScaleX, spriteScaleY);
            log.inputEnabled = true;
            log.events.onInputDown.add(onDownlog, this);
            function onDownlog() {this.resetLSpriteFlag(); logFlag = 1;lObjectClicked++;}
            
            
            lollipop = game.add.sprite(objectsPositions[14].x, objectsPositions[14].y, 'lollipop');
            lollipop.anchor.setTo(spriteAnchorX, spriteAnchorY);
            lollipop.scale.setTo(spriteScaleX, spriteScaleY);
            lollipop.inputEnabled = true;
            lollipop.events.onInputDown.add(onDownlollipop, this);
            function onDownlollipop() {this.resetLSpriteFlag(); lollipopFlag = 1;lObjectClicked++;}
            
            
            
            //Adding other sprites        
            
            camel = game.add.sprite(objectsPositions[5].x, objectsPositions[5].y, 'camel');
            camel.anchor.setTo(spriteAnchorX, spriteAnchorY);
            camel.scale.setTo(spriteScaleX, spriteScaleY);
            camel.inputEnabled = true;
            camel.events.onInputDown.add(onDownCamel, this);
            function onDownCamel() {this.resetLSpriteFlag(); camelFlag = 1;}
            
            
            
            
            candle = game.add.sprite(objectsPositions[15].x, objectsPositions[15].y, 'candle');
            candle.anchor.setTo(spriteAnchorX, spriteAnchorY);
            candle.scale.setTo(spriteScaleX, spriteScaleY);
            candle.inputEnabled = true;
            candle.events.onInputDown.add(onDownCandle, this);
            function onDownCandle() {this.resetLSpriteFlag(); candleFlag = 1; }
            
            
            car = game.add.sprite(objectsPositions[6].x, objectsPositions[6].y, 'car');
            car.anchor.setTo(spriteAnchorX, spriteAnchorY);
            car.scale.setTo(spriteScaleX, spriteScaleY);
            car.inputEnabled = true;
            car.events.onInputDown.add(onDownCar, this);
            function onDownCar() {this.resetLSpriteFlag(); carFlag = 1;}
            
            cat = game.add.sprite(objectsPositions[16].x, objectsPositions[16].y, 'cat');
            cat.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cat.scale.setTo(spriteScaleX, spriteScaleY);
            cat.inputEnabled = true;
            cat.events.onInputDown.add(onDownCat, this);
            function onDownCat() {this.resetLSpriteFlag(); catFlag = 1;}
            
            
            cheese = game.add.sprite(objectsPositions[7].x, objectsPositions[7].y, 'cheese');
            cheese.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cheese.scale.setTo(spriteScaleX, spriteScaleY);
            cheese.inputEnabled = true;
            cheese.events.onInputDown.add(onDownCheese, this);
            function onDownCheese() {this.resetLSpriteFlag(); cheeseFlag = 1;}
            
            
            cherry = game.add.sprite(objectsPositions[17].x, objectsPositions[17].y, 'cherry');
            cherry.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cherry.scale.setTo(spriteScaleX, spriteScaleY);
            cherry.inputEnabled = true;
            cherry.events.onInputDown.add(onDownCherry, this);
            function onDownCherry() {this.resetLSpriteFlag(); cherryFlag = 1;}
            
            
            clock = game.add.sprite(objectsPositions[8].x, objectsPositions[8].y, 'clock');
            clock.anchor.setTo(spriteAnchorX, spriteAnchorY);
            clock.scale.setTo(spriteScaleX, spriteScaleY);
            clock.inputEnabled = true;
            clock.events.onInputDown.add(onDownClock, this);
            function onDownClock() {this.resetLSpriteFlag(); clockFlag = 1;}
            
            
            
            cow = game.add.sprite(objectsPositions[18].x, objectsPositions[18].y, 'cow');
            cow.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cow.scale.setTo(spriteScaleX, spriteScaleY);
            cow.inputEnabled = true;
            cow.events.onInputDown.add(onDownCow, this);
            function onDownCow() {this.resetLSpriteFlag(); cowFlag = 1;}
            
            
            crab = game.add.sprite(objectsPositions[9].x, objectsPositions[9].y, 'crab');
            crab.anchor.setTo(spriteAnchorX, spriteAnchorY);
            crab.scale.setTo(spriteScaleX, spriteScaleY);
            crab.inputEnabled = true;
            crab.events.onInputDown.add(onDownCrab, this);
            function onDownCrab() {this.resetLSpriteFlag(); crabFlag = 1;}
            
            
            crown = game.add.sprite(objectsPositions[19].x, objectsPositions[19].y, 'crown');
            crown.anchor.setTo(spriteAnchorX, spriteAnchorY);
            crown.scale.setTo(spriteScaleX, spriteScaleY);
            crown.inputEnabled = true;
            crown.events.onInputDown.add(onDownCrown, this);
            function onDownCrown() {this.resetLSpriteFlag(); crownFlag = 1;}
            
            
            
            //Color shades
            blue = game.add.sprite(objectsPositions[20].x, objectsPositions[20].y, 'blue');
            blue.anchor.setTo(spriteAnchorX, spriteAnchorY);
            blue.scale.setTo(shadeScaleX, shadeScaleY);
            blue.inputEnabled = true;
            blue.tint = 0x456AC1; 
            blue.events.onInputDown.add(onDownBlue, this);
            function onDownBlue() {this.setColorLFlagToZero(); blueFlag = 1;}
           
            
            cyan = game.add.sprite(objectsPositions[21].x, objectsPositions[21].y, 'cyan');
            cyan.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cyan.scale.setTo(shadeScaleX, shadeScaleY);
            cyan.inputEnabled = true;
            cyan.tint = 0x45C1C1; 
            cyan.events.onInputDown.add(onDownCyan, this);
            function onDownCyan() {this.setColorLFlagToZero(); cyanFlag = 1;}
            
            
            
            green = game.add.sprite(objectsPositions[22].x, objectsPositions[22].y, 'green');
            green.anchor.setTo(spriteAnchorX, spriteAnchorY);
            green.scale.setTo(shadeScaleX, shadeScaleY);
            green.inputEnabled = true;
            green.tint = 0x51C735;
            green.events.onInputDown.add(onDownGreen, this);
            function onDownGreen() {this.setColorLFlagToZero(); greenFlag = 1;}
            
            
            orange = game.add.sprite(objectsPositions[23].x, objectsPositions[23].y, 'orange');
            orange.anchor.setTo(spriteAnchorX, spriteAnchorY);
            orange.scale.setTo(shadeScaleX, shadeScaleY);
            orange.inputEnabled = true;
            orange.tint = 0xF38932;
            orange.events.onInputDown.add(onDownOrange, this);
            function onDownOrange() {this.setColorLFlagToZero(); orangeFlag = 1;}
           
            
            pink = game.add.sprite(objectsPositions[24].x, objectsPositions[24].y, 'pink');
            pink.anchor.setTo(spriteAnchorX, spriteAnchorY);
            pink.scale.setTo(shadeScaleX, shadeScaleY);
            pink.inputEnabled = true;
            pink.tint = 0xCC3ACC;
            pink.events.onInputDown.add(onDownPink, this);
            function onDownPink() {this.setColorLFlagToZero(); pinkFlag = 1;}
            
            
            red = game.add.sprite(objectsPositions[25].x, objectsPositions[25].y, 'red');
            red.anchor.setTo(spriteAnchorX, spriteAnchorY);
            red.scale.setTo(shadeScaleX, shadeScaleY);
            red.inputEnabled = true;
            red.tint = 0xE32424;
            red.events.onInputDown.add(onDownRed, this);
            function onDownRed() {this.setColorLFlagToZero(); redFlag = 1;}
                
        },
        
        onDownlLetter: function() {
                
            //ladder
                    if(ladderFlag == 1 && greenFlag == 1 ){var greenladder = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transLadder');greenladder.tint =  0x51C735; greenladder.scale.setTo(spriteScaleX, spriteScaleY); 
greenladder.anchor.setTo(0.6, 0.6);stickSound.play();}                    
                    
                    if(ladderFlag == 1 && blueFlag == 1){var blueladder = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transLadder'); blueladder.tint =  0x456AC1; blueladder.scale.setTo(spriteScaleX, spriteScaleY); blueladder.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(ladderFlag == 1 && orangeFlag == 1){var orangeladder = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transLadder'); orangeladder.tint =  0xF38932; orangeladder.scale.setTo(spriteScaleX, spriteScaleY); orangeladder.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(ladderFlag == 1 && redFlag == 1){var redladder = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transLadder'); redladder.tint =  0xE32424; redladder.scale.setTo(spriteScaleX, spriteScaleY); redladder.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(ladderFlag == 1 && pinkFlag == 1){var pinkladder = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transLadder'); pinkladder.tint =  0xCC3ACC; pinkladder.scale.setTo(spriteScaleX, spriteScaleY); pinkladder.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(ladderFlag == 1 && cyanFlag == 1){var cyanladder = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transLadder'); cyanladder.tint =  0x45C1C1; cyanladder.scale.setTo(spriteScaleX, spriteScaleY); cyanladder.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //ladybug    
                    if(ladybugFlag == 1 && greenFlag == 1 ){var greenladybug = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transLadybug');greenladybug.tint =  0x51C735; greenladybug.scale.setTo(spriteScaleX, spriteScaleY); 
greenladybug.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(ladybugFlag == 1 && blueFlag == 1){var blueladybug = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transLadybug'); blueladybug.tint =  0x456AC1; blueladybug.scale.setTo(spriteScaleX, spriteScaleY); blueladybug.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(ladybugFlag == 1 && orangeFlag == 1){var orangeladybug = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transLadybug'); orangeladybug.tint =  0xF38932; orangeladybug.scale.setTo(spriteScaleX, spriteScaleY); orangeladybug.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(ladybugFlag == 1 && redFlag == 1){var redladybug = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transLadybug'); redladybug.tint =  0xE32424; redladybug.scale.setTo(spriteScaleX, spriteScaleY); redladybug.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(ladybugFlag == 1 && pinkFlag == 1){var pinkladybug = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transLadybug'); pinkladybug.tint =  0xCC3ACC; pinkladybug.scale.setTo(spriteScaleX, spriteScaleY); pinkladybug.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(ladybugFlag == 1 && cyanFlag == 1){var cyanladybug = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transLadybug'); cyanladybug.tint =  0x45C1C1; cyanladybug.scale.setTo(spriteScaleX, spriteScaleY); cyanladybug.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //lamp    
                    if(lampFlag == 1 && greenFlag == 1 ){var greenlamp = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transLamp');greenlamp.tint =  0x51C735; greenlamp.scale.setTo(spriteScaleX, spriteScaleY); 
greenlamp.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(lampFlag == 1 && blueFlag == 1){var bluelamp = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transLamp'); bluelamp.tint =  0x456AC1; bluelamp.scale.setTo(spriteScaleX, spriteScaleY); bluelamp.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(lampFlag == 1 && orangeFlag == 1){var orangelamp = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transLamp'); orangelamp.tint =  0xF38932; orangelamp.scale.setTo(spriteScaleX, spriteScaleY); orangelamp.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(lampFlag == 1 && redFlag == 1){var redlamp = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transLamp'); redlamp.tint =  0xE32424; redlamp.scale.setTo(spriteScaleX, spriteScaleY); redlamp.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(lampFlag == 1 && pinkFlag == 1){var pinklamp = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transLamp'); pinklamp.tint =  0xCC3ACC; pinklamp.scale.setTo(spriteScaleX, spriteScaleY); pinklamp.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(lampFlag == 1 && cyanFlag == 1){var cyanlamp = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transLamp'); cyanlamp.tint =  0x45C1C1; cyanlamp.scale.setTo(spriteScaleX, spriteScaleY); cyanlamp.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //lantern
                    if(lanternFlag == 1 && greenFlag == 1 ){var greenlantern = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transLantern');greenlantern.tint =  0x51C735; greenlantern.scale.setTo(spriteScaleX, spriteScaleY); 
greenlantern.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(lanternFlag == 1 && blueFlag == 1){console.log("bluelantern plotted");var bluelantern = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transLantern'); bluelantern.tint =  0x456AC1; bluelantern.scale.setTo(spriteScaleX, spriteScaleY); bluelantern.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(lanternFlag == 1 && orangeFlag == 1){var orangelantern = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transLantern'); orangelantern.tint =  0xF38932; orangelantern.scale.setTo(spriteScaleX, spriteScaleY); orangelantern.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(lanternFlag == 1 && redFlag == 1){var redlantern = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transLantern'); redlantern.tint =  0xE32424; redlantern.scale.setTo(spriteScaleX, spriteScaleY); redlantern.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(lanternFlag == 1 && pinkFlag == 1){var pinklantern = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transLantern'); pinklantern.tint =  0xCC3ACC; pinklantern.scale.setTo(spriteScaleX, spriteScaleY); pinklantern.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(lanternFlag == 1 && cyanFlag == 1){var cyanlantern = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transLantern'); cyanlantern.tint =  0x45C1C1; cyanlantern.scale.setTo(spriteScaleX, spriteScaleY); cyanlantern.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //leaf    
                    if(leafFlag == 1 && greenFlag == 1 ){var greenleaf = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transLeaf');greenleaf.tint =  0x51C735; greenleaf.scale.setTo(spriteScaleX, spriteScaleY); 
greenleaf.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(leafFlag == 1 && blueFlag == 1){console.log("blueleaf plotted");var blueleaf = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transLeaf'); blueleaf.tint =  0x456AC1; blueleaf.scale.setTo(spriteScaleX, spriteScaleY); blueleaf.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(leafFlag == 1 && orangeFlag == 1){var orangeleaf = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transLeaf'); orangeleaf.tint =  0xF38932; orangeleaf.scale.setTo(spriteScaleX, spriteScaleY); orangeleaf.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(leafFlag == 1 && redFlag == 1){var redleaf = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transLeaf'); redleaf.tint =  0xE32424; redleaf.scale.setTo(spriteScaleX, spriteScaleY); redleaf.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(leafFlag == 1 && pinkFlag == 1){var pinkleaf = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transLeaf'); pinkleaf.tint =  0xCC3ACC; pinkleaf.scale.setTo(spriteScaleX, spriteScaleY); pinkleaf.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(leafFlag == 1 && cyanFlag == 1){var cyanleaf = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transLeaf'); cyanleaf.tint =  0x45C1C1; cyanleaf.scale.setTo(spriteScaleX, spriteScaleY); cyanleaf.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //lemon   
                    if(lionFlag == 1 && greenFlag == 1 ){var greenlemon = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transLemon');greenlemon.tint =  0x51C735; greenlemon.scale.setTo(spriteScaleX, spriteScaleY); 
greenlemon.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(lionFlag == 1 && blueFlag == 1){console.log("bluelemon plotted");var bluelemon = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transLemon'); bluelemon.tint =  0x456AC1; bluelemon.scale.setTo(spriteScaleX, spriteScaleY); bluelemon.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(lionFlag == 1 && orangeFlag == 1){var orangelemon = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transLemon'); orangelemon.tint =  0xF38932; orangelemon.scale.setTo(spriteScaleX, spriteScaleY); orangelemon.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(lionFlag == 1 && redFlag == 1){var redlemon = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transLemon'); redlemon.tint =  0xE32424; redlemon.scale.setTo(spriteScaleX, spriteScaleY); redlemon.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(lionFlag == 1 && pinkFlag == 1){var pinklemon = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transLemon'); pinklemon.tint =  0xCC3ACC; pinklemon.scale.setTo(spriteScaleX, spriteScaleY); pinklemon.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(lionFlag == 1 && cyanFlag == 1){var cyanlemon = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transLemon'); cyanlemon.tint =  0x45C1C1; cyanlemon.scale.setTo(spriteScaleX, spriteScaleY); cyanlemon.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //leopard    
                    if(leopardFlag == 1 && greenFlag == 1 ){var greenleopard = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transLeopard');greenleopard.tint =  0x51C735; greenleopard.scale.setTo(spriteScaleX, spriteScaleY); 
greenleopard.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(leopardFlag == 1 && blueFlag == 1){console.log("blueleopard plotted");var blueleopard = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transLeopard'); blueleopard.tint =  0x456AC1; blueleopard.scale.setTo(spriteScaleX, spriteScaleY); blueleopard.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(leopardFlag == 1 && orangeFlag == 1){var orangeleopard = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transLeopard'); orangeleopard.tint =  0xF38932; orangeleopard.scale.setTo(spriteScaleX, spriteScaleY); orangeleopard.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(leopardFlag == 1 && redFlag == 1){var redleopard = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transLeopard'); redleopard.tint =  0xE32424; redleopard.scale.setTo(spriteScaleX, spriteScaleY); redleopard.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(leopardFlag == 1 && pinkFlag == 1){var pinkleopard = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transLeopard'); pinkleopard.tint =  0xCC3ACC; pinkleopard.scale.setTo(spriteScaleX, spriteScaleY); pinkleopard.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(leopardFlag == 1 && cyanFlag == 1){var cyanleopard = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transLeopard'); cyanleopard.tint =  0x45C1C1; cyanleopard.scale.setTo(spriteScaleX, spriteScaleY); cyanleopard.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //lion    
                    if(lemonFlag == 1 && greenFlag == 1 ){var greenlion = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transLion');greenlion.tint =  0x51C735; greenlion.scale.setTo(spriteScaleX, spriteScaleY); 
greenlion.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(lemonFlag == 1 && blueFlag == 1){console.log("bluelion plotted");var bluelion = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transLion'); bluelion.tint =  0x456AC1; bluelion.scale.setTo(spriteScaleX, spriteScaleY); bluelion.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(lemonFlag == 1 && orangeFlag == 1){var orangelion = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transLion'); orangelion.tint =  0xF38932; orangelion.scale.setTo(spriteScaleX, spriteScaleY); orangelion.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(lemonFlag == 1 && redFlag == 1){var redlion = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transLion'); redlion.tint =  0xE32424; redlion.scale.setTo(spriteScaleX, spriteScaleY); redlion.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(lemonFlag == 1 && pinkFlag == 1){var pinklion = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transLion'); pinklion.tint =  0xCC3ACC; pinklion.scale.setTo(spriteScaleX, spriteScaleY); pinklion.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(lemonFlag == 1 && cyanFlag == 1){var cyanlion = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transLion'); cyanlion.tint =  0x45C1C1; cyanlion.scale.setTo(spriteScaleX, spriteScaleY); cyanlion.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //log    
                    if(logFlag == 1 && greenFlag == 1 ){var greenlog = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transLog');greenlog.tint =  0x51C735; greenlog.scale.setTo(spriteScaleX, spriteScaleY); 
greenlog.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(logFlag == 1 && blueFlag == 1){console.log("bluelog plotted");var bluelog = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transLog'); bluelog.tint =  0x456AC1; bluelog.scale.setTo(spriteScaleX, spriteScaleY); bluelog.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(logFlag == 1 && orangeFlag == 1){var orangelog = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transLog'); orangelog.tint =  0xF38932; orangelog.scale.setTo(spriteScaleX, spriteScaleY); orangelog.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(logFlag == 1 && redFlag == 1){var redlog = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transLog'); redlog.tint =  0xE32424; redlog.scale.setTo(spriteScaleX, spriteScaleY); redlog.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(logFlag == 1 && pinkFlag == 1){var pinklog = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transLog'); pinklog.tint =  0xCC3ACC; pinklog.scale.setTo(spriteScaleX, spriteScaleY); pinklog.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(logFlag == 1 && cyanFlag == 1){var cyanlog = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transLog'); cyanlog.tint =  0x45C1C1; cyanlog.scale.setTo(spriteScaleX, spriteScaleY); cyanlog.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //lollipop 
                    if(lollipopFlag == 1 && greenFlag == 1 ){var greenlollipop = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transLollipop');greenlollipop.tint =  0x51C735; greenlollipop.scale.setTo(spriteScaleX, spriteScaleY); 
greenlollipop.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(lollipopFlag == 1 && blueFlag == 1){console.log("bluelollipop plotted");var bluelollipop = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transLollipop'); bluelollipop.tint =  0x456AC1; bluelollipop.scale.setTo(spriteScaleX, spriteScaleY); bluelollipop.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(lollipopFlag == 1 && orangeFlag == 1){var orangelollipop = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transLollipop'); orangelollipop.tint =  0xF38932; orangelollipop.scale.setTo(spriteScaleX, spriteScaleY); orangelollipop.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(lollipopFlag == 1 && redFlag == 1){var redlollipop = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transLollipop'); redlollipop.tint =  0xE32424; redlollipop.scale.setTo(spriteScaleX, spriteScaleY); redlollipop.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(lollipopFlag == 1 && pinkFlag == 1){var pinklollipop = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transLollipop'); pinklollipop.tint =  0xCC3ACC; pinklollipop.scale.setTo(spriteScaleX, spriteScaleY); pinklollipop.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(lollipopFlag == 1 && cyanFlag == 1){var cyanlollipop = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transLollipop'); cyanlollipop.tint =  0x45C1C1; cyanlollipop.scale.setTo(spriteScaleX, spriteScaleY); cyanlollipop.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
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
            
            game.world.bringToTop(lLetter);
            
            game.world.bringToTop(blue);
            game.world.bringToTop(green);
            game.world.bringToTop(red);
            game.world.bringToTop(cyan);
            game.world.bringToTop(orange);
            game.world.bringToTop(pink);
            
            game.world.bringToTop(cloud1);
            game.world.bringToTop(cloud2);
            game.world.bringToTop(cloud3);
            
            game.world.bringToTop(ladder);
            game.world.bringToTop(ladybug);
            game.world.bringToTop(lamp);
            game.world.bringToTop(lantern);
            game.world.bringToTop(leaf);
            game.world.bringToTop(lemon);
            game.world.bringToTop(leopard);
            game.world.bringToTop(lion);
            game.world.bringToTop(log);
            game.world.bringToTop(lollipop);
            
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
            
            
            
            if(ladderFlag == 1){ladder.angle += 2;}
            if(ladybugFlag == 1){ladybug.angle += 2;}
            if(lampFlag == 1){lamp.angle += 2;}
            if(lanternFlag == 1){lantern.angle += 2;}
            if(leafFlag == 1){leaf.angle += 2;}
            if(lionFlag == 1){lemon.angle += 2;}
            if(leopardFlag == 1){leopard.angle += 2;}
            if(lemonFlag == 1){lion.angle += 2;}
            if(logFlag == 1){log.angle += 2;}
            if(lollipopFlag == 1){lollipop.angle += 2;}
            
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
            
            if(lObjectClicked == 10){
            
                askForLevelM = 1;
                game.mButton = game.add.sprite(1170, 730, 'mButton');             
                game.mButton.scale.setTo(1, 1); 
                game.mButton.anchor.setTo(spriteAnchorX, spriteAnchorY);
                
            }
            
        if(askForLevelM == 1){
            
            game.world.bringToTop(game.mButton);
            game.mButton.inputEnabled = true;
            game.mButton.events.onInputDown.add(onDownM, this);
            function onDownM() {
            
                //start next level
                
                this.setLGlobalVaribalesToZero();
                game.state.start('M');
                
            }
        }
           
        },
        
        resetLSpriteFlag: function(){
            
            ladderFlag = 0;ladybugFlag = 0;lampFlag = 0;lionFlag = 0;lanternFlag = 0;
            leafFlag = 0;leopardFlag = 0;lemonFlag = 0;logFlag = 0;lollipopFlag = 0;
            camelFlag = 0;candleFlag = 0;carFlag = 0;catFlag = 0;cheeseFlag = 0;cherryFlag = 0;
            clockFlag = 0;cowFlag = 0;crabFlag = 0;crownFlag = 0;

            ladder.angle = 0;ladybug.angle = 0;lamp.angle = 0;lemon.angle = 0;lantern.angle = 0;
            leaf.angle = 0;leopard.angle = 0;lion.angle = 0;log.angle = 0;lollipop.angle = 0;
            camel.angle = 0;candle.angle = 0;car.angle = 0;cat.angle = 0;cheese.angle = 0;
            cherry.angle = 0;crown.angle = 0;clock.angle = 0;cow.angle = 0;crab.angle = 0;
           
        },
       
        setColorLFlagToZero: function(){
            
            bubbleSound.play(); blueFlag = 0;greenFlag = 0; redFlag = 0; cyanFlag = 0; pinkFlag = 0; orangeFlag = 0;
        },
        
        setLGlobalVaribalesToZero: function(){
            
            
            ladderFlag = 0;ladybugFlag = 0;lampFlag = 0;lionFlag = 0;lanternFlag = 0;
            leafFlag = 0;leopardFlag = 0;lemonFlag = 0;logFlag = 0;lollipopFlag = 0;
            camelFlag = 0;candleFlag = 0;carFlag = 0;catFlag = 0;cheeseFlag = 0;cherryFlag = 0;
            clockFlag = 0;cowFlag = 0;crabFlag = 0;crownFlag = 0;



            greenFlag = 0;blueFlag = 0;orangeFlag = 0;redFlag = 0;pinkFlag = 0;cyanFlag = 0;
        }
        
        
    };