        
    var jObjectClicked = 0;
    var askForLevelK = 0;
    
    
    var jackfruitFlag = 0;
    var jacksFlag = 0;
    var jamFlag = 0;            
    var jarFlag = 0;
    var jeepFlag = 0;
    var jellyfishFlag = 0;
    var jetFlag = 0;
    var jigsawFlag = 0;
    var jokerFlag = 0;
    var jugFlag = 0;
    
    
    var J = {

        preload: function () {

            //setting default path for assets to be used in game
            this.load.path = './assets/J/';
            
            
            
            this.load.image("transJackfruit", "transJackfruit.png");
            this.load.image("transJacks", "transJacks.png");
            this.load.image("transJam", "transJam.png");
            this.load.image("transJar", "transJar.png");
            this.load.image("transJeep", "transJeep.png");
            this.load.image("transJellyfish", "transJellyfish.png");
            this.load.image("transJet", "transJet.png");
            this.load.image("transJigsaw", "transJigsaw.png");
            this.load.image("transJoker", "transJoker.png");
            this.load.image("transJug", "transJug.png");
            
            this.load.image("jackfruit", "jackfruit.png");
            this.load.image("jacks", "jacks.png");
            this.load.image("jam", "jam.png");
            this.load.image("jar", "jar.png");
            this.load.image("jeep", "jeep.png");
            this.load.image("jellyfish", "jellyfish.png");
            this.load.image("jet", "jet.png");
            this.load.image("jigsaw", "jigsaw.png");
            this.load.image("joker", "joker.png");
            this.load.image("jug", "jug.png");
            
            
            //loading assets for the level  J
            
            //loading shades
            this.load.image("blue", "blue.png");
            this.load.image("cyan", "cyan.png");
            this.load.image("green", "green.png");
            this.load.image("orange", "orange.png");
            this.load.image("pink", "pink.png");
            this.load.image("red", "red.png");
    
            this.load.image("bg", "bg.png");
            this.load.image("jLetter", "jLetter.png");
            this.load.image("kButton", "kButton.png");
            
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
                
            
            
            
            //Main letter J
            jLetter = game.add.sprite(gameMinWidth, gameMinHeight, 'jLetter');
            jLetter.inputEnabled = true;
            jLetter.events.onInputDown.add(this.onDownjLetter, this);
            
            
            
            //Objects starting from J
                    
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
            
            
            
            
            jackfruit = game.add.sprite(objectsPositions[0].x, objectsPositions[0].y, 'jackfruit');
            jackfruit.anchor.setTo(spriteAnchorX, spriteAnchorY);
            jackfruit.scale.setTo(spriteScaleX, spriteScaleY);
            jackfruit.inputEnabled = true;
            jackfruit.events.onInputDown.add(onDownjackfruit, this);
            function onDownjackfruit() {this.resetJSpriteFlag(); jackfruitFlag = 1;jObjectClicked++;}

            
            
            
            jacks = game.add.sprite(objectsPositions[10].x, objectsPositions[10].y, 'jacks');
            jacks.anchor.setTo(spriteAnchorX, spriteAnchorY);
            jacks.scale.setTo(spriteScaleX, spriteScaleY);
            jacks.inputEnabled = true;
            jacks.events.onInputDown.add(onDownjacks, this);
            function onDownjacks() {this.resetJSpriteFlag(); jacksFlag = 1;jObjectClicked++;}

            
            
            
            jam = game.add.sprite(objectsPositions[1].x, objectsPositions[1].y, 'jam');
            jam.anchor.setTo(spriteAnchorX, spriteAnchorY);
            jam.scale.setTo(spriteScaleX, spriteScaleY);
            jam.inputEnabled = true;
            jam.events.onInputDown.add(onDownjam, this);
            function onDownjam() {this.resetJSpriteFlag(); jamFlag = 1;jObjectClicked++;}
            
            
            
            
            jar = game.add.sprite(objectsPositions[11].x, objectsPositions[11].y, 'jar');
            jar.anchor.setTo(spriteAnchorX, spriteAnchorY);
            jar.scale.setTo(spriteScaleX, spriteScaleY);
            jar.inputEnabled = true;
            jar.events.onInputDown.add(onDownjar, this);
            function onDownjar() {this.resetJSpriteFlag(); jarFlag = 1;jObjectClicked++;}
            
            
            
            jeep = game.add.sprite(objectsPositions[2].x, objectsPositions[2].y, 'jeep');
            jeep.anchor.setTo(spriteAnchorX, spriteAnchorY);
            jeep.scale.setTo(spriteScaleX, spriteScaleY);
            jeep.inputEnabled = true;
            jeep.events.onInputDown.add(onDownjeep, this);
            function onDownjeep() {this.resetJSpriteFlag(); jeepFlag = 1;jObjectClicked++;}
            
            jellyfish = game.add.sprite(objectsPositions[12].x, objectsPositions[12].y, 'jellyfish');
            jellyfish.anchor.setTo(spriteAnchorX, spriteAnchorY);
            jellyfish.scale.setTo(spriteScaleX, spriteScaleY);
            jellyfish.inputEnabled = true;
            jellyfish.events.onInputDown.add(onDownjellyfish, this);
            function onDownjellyfish() {this.resetJSpriteFlag(); jigsawFlag = 1;jObjectClicked++;}

            
            jet = game.add.sprite(objectsPositions[3].x, objectsPositions[3].y, 'jet');
            jet.anchor.setTo(spriteAnchorX, spriteAnchorY);
            jet.scale.setTo(spriteScaleX, spriteScaleY);
            jet.inputEnabled = true;  
            jet.events.onInputDown.add(onDownjet, this);
            function onDownjet() {this.resetJSpriteFlag(); jetFlag = 1;jObjectClicked++;}
            
            
            jigsaw = game.add.sprite(objectsPositions[13].x, objectsPositions[13].y, 'jigsaw');
            jigsaw.anchor.setTo(spriteAnchorX, spriteAnchorY);
            jigsaw.scale.setTo(spriteScaleX, spriteScaleY);
            jigsaw.inputEnabled = true;
            jigsaw.events.onInputDown.add(onDownjigsaw, this);
            function onDownjigsaw() {this.resetJSpriteFlag(); jellyfishFlag = 1;jObjectClicked++;}
            
            
            joker = game.add.sprite(objectsPositions[4].x, objectsPositions[4].y, 'joker');
            joker.anchor.setTo(spriteAnchorX, spriteAnchorY);
            joker.scale.setTo(spriteScaleX, spriteScaleY);
            joker.inputEnabled = true;
            joker.events.onInputDown.add(onDownjoker, this);
            function onDownjoker() {this.resetJSpriteFlag(); jokerFlag = 1;jObjectClicked++;}
            
            
            jug = game.add.sprite(objectsPositions[14].x, objectsPositions[14].y, 'jug');
            jug.anchor.setTo(spriteAnchorX, spriteAnchorY);
            jug.scale.setTo(spriteScaleX, spriteScaleY);
            jug.inputEnabled = true;
            jug.events.onInputDown.add(onDownjug, this);
            function onDownjug() {this.resetJSpriteFlag(); jugFlag = 1;jObjectClicked++;}
            
            
            
            //Adding other sprites        
            
            camel = game.add.sprite(objectsPositions[5].x, objectsPositions[5].y, 'camel');
            camel.anchor.setTo(spriteAnchorX, spriteAnchorY);
            camel.scale.setTo(spriteScaleX, spriteScaleY);
            camel.inputEnabled = true;
            camel.events.onInputDown.add(onDownCamel, this);
            function onDownCamel() {this.resetJSpriteFlag(); camelFlag = 1;}
            
            
            
            
            candle = game.add.sprite(objectsPositions[15].x, objectsPositions[15].y, 'candle');
            candle.anchor.setTo(spriteAnchorX, spriteAnchorY);
            candle.scale.setTo(spriteScaleX, spriteScaleY);
            candle.inputEnabled = true;
            candle.events.onInputDown.add(onDownCandle, this);
            function onDownCandle() {this.resetJSpriteFlag(); candleFlag = 1; }
            
            
            car = game.add.sprite(objectsPositions[6].x, objectsPositions[6].y, 'car');
            car.anchor.setTo(spriteAnchorX, spriteAnchorY);
            car.scale.setTo(spriteScaleX, spriteScaleY);
            car.inputEnabled = true;
            car.events.onInputDown.add(onDownCar, this);
            function onDownCar() {this.resetJSpriteFlag(); carFlag = 1;}
            
            cat = game.add.sprite(objectsPositions[16].x, objectsPositions[16].y, 'cat');
            cat.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cat.scale.setTo(spriteScaleX, spriteScaleY);
            cat.inputEnabled = true;
            cat.events.onInputDown.add(onDownCat, this);
            function onDownCat() {this.resetJSpriteFlag(); catFlag = 1;}
            
            
            cheese = game.add.sprite(objectsPositions[7].x, objectsPositions[7].y, 'cheese');
            cheese.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cheese.scale.setTo(spriteScaleX, spriteScaleY);
            cheese.inputEnabled = true;
            cheese.events.onInputDown.add(onDownCheese, this);
            function onDownCheese() {this.resetJSpriteFlag(); cheeseFlag = 1;}
            
            
            cherry = game.add.sprite(objectsPositions[17].x, objectsPositions[17].y, 'cherry');
            cherry.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cherry.scale.setTo(spriteScaleX, spriteScaleY);
            cherry.inputEnabled = true;
            cherry.events.onInputDown.add(onDownCherry, this);
            function onDownCherry() {this.resetJSpriteFlag(); cherryFlag = 1;}
            
            
            clock = game.add.sprite(objectsPositions[8].x, objectsPositions[8].y, 'clock');
            clock.anchor.setTo(spriteAnchorX, spriteAnchorY);
            clock.scale.setTo(spriteScaleX, spriteScaleY);
            clock.inputEnabled = true;
            clock.events.onInputDown.add(onDownClock, this);
            function onDownClock() {this.resetJSpriteFlag(); clockFlag = 1;}
            
            
            
            cow = game.add.sprite(objectsPositions[18].x, objectsPositions[18].y, 'cow');
            cow.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cow.scale.setTo(spriteScaleX, spriteScaleY);
            cow.inputEnabled = true;
            cow.events.onInputDown.add(onDownCow, this);
            function onDownCow() {this.resetJSpriteFlag(); cowFlag = 1;}
            
            
            crab = game.add.sprite(objectsPositions[9].x, objectsPositions[9].y, 'crab');
            crab.anchor.setTo(spriteAnchorX, spriteAnchorY);
            crab.scale.setTo(spriteScaleX, spriteScaleY);
            crab.inputEnabled = true;
            crab.events.onInputDown.add(onDownCrab, this);
            function onDownCrab() {this.resetJSpriteFlag(); crabFlag = 1;}
            
            
            crown = game.add.sprite(objectsPositions[19].x, objectsPositions[19].y, 'crown');
            crown.anchor.setTo(spriteAnchorX, spriteAnchorY);
            crown.scale.setTo(spriteScaleX, spriteScaleY);
            crown.inputEnabled = true;
            crown.events.onInputDown.add(onDownCrown, this);
            function onDownCrown() {this.resetJSpriteFlag(); crownFlag = 1;}
            
            
            
            //Color shades
            blue = game.add.sprite(objectsPositions[20].x, objectsPositions[20].y, 'blue');
            blue.anchor.setTo(spriteAnchorX, spriteAnchorY);
            blue.scale.setTo(shadeScaleX, shadeScaleY);
            blue.inputEnabled = true;
            blue.tint = 0x456AC1; 
            blue.events.onInputDown.add(onDownBlue, this);
            function onDownBlue() {this.setColorJFlagToZero(); blueFlag = 1;}
           
            
            cyan = game.add.sprite(objectsPositions[21].x, objectsPositions[21].y, 'cyan');
            cyan.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cyan.scale.setTo(shadeScaleX, shadeScaleY);
            cyan.inputEnabled = true;
            cyan.tint = 0x45C1C1; 
            cyan.events.onInputDown.add(onDownCyan, this);
            function onDownCyan() {this.setColorJFlagToZero(); cyanFlag = 1;}
            
            
            
            green = game.add.sprite(objectsPositions[22].x, objectsPositions[22].y, 'green');
            green.anchor.setTo(spriteAnchorX, spriteAnchorY);
            green.scale.setTo(shadeScaleX, shadeScaleY);
            green.inputEnabled = true;
            green.tint = 0x51C735;
            green.events.onInputDown.add(onDownGreen, this);
            function onDownGreen() {this.setColorJFlagToZero(); greenFlag = 1;}
            
            
            orange = game.add.sprite(objectsPositions[23].x, objectsPositions[23].y, 'orange');
            orange.anchor.setTo(spriteAnchorX, spriteAnchorY);
            orange.scale.setTo(shadeScaleX, shadeScaleY);
            orange.inputEnabled = true;
            orange.tint = 0xF38932;
            orange.events.onInputDown.add(onDownOrange, this);
            function onDownOrange() {this.setColorJFlagToZero(); orangeFlag = 1;}
           
            
            pink = game.add.sprite(objectsPositions[24].x, objectsPositions[24].y, 'pink');
            pink.anchor.setTo(spriteAnchorX, spriteAnchorY);
            pink.scale.setTo(shadeScaleX, shadeScaleY);
            pink.inputEnabled = true;
            pink.tint = 0xCC3ACC;
            pink.events.onInputDown.add(onDownPink, this);
            function onDownPink() {this.setColorJFlagToZero(); pinkFlag = 1;}
            
            
            red = game.add.sprite(objectsPositions[25].x, objectsPositions[25].y, 'red');
            red.anchor.setTo(spriteAnchorX, spriteAnchorY);
            red.scale.setTo(shadeScaleX, shadeScaleY);
            red.inputEnabled = true;
            red.tint = 0xE32424;
            red.events.onInputDown.add(onDownRed, this);
            function onDownRed() {this.setColorJFlagToZero(); redFlag = 1;}
                
        },
        
        onDownjLetter: function() {
                
            //jackfruit
                    if(jackfruitFlag == 1 && greenFlag == 1 ){var greenjackfruit = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transJackfruit');greenjackfruit.tint =  0x51C735; greenjackfruit.scale.setTo(spriteScaleX, spriteScaleY); 
greenjackfruit.anchor.setTo(0.6, 0.6);stickSound.play();}                    
                    
                    if(jackfruitFlag == 1 && blueFlag == 1){var bluejackfruit = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transJackfruit'); bluejackfruit.tint =  0x456AC1; bluejackfruit.scale.setTo(spriteScaleX, spriteScaleY); bluejackfruit.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(jackfruitFlag == 1 && orangeFlag == 1){var orangejackfruit = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transJackfruit'); orangejackfruit.tint =  0xF38932; orangejackfruit.scale.setTo(spriteScaleX, spriteScaleY); orangejackfruit.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(jackfruitFlag == 1 && redFlag == 1){var redjackfruit = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transJackfruit'); redjackfruit.tint =  0xE32424; redjackfruit.scale.setTo(spriteScaleX, spriteScaleY); redjackfruit.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(jackfruitFlag == 1 && pinkFlag == 1){var pinkjackfruit = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transJackfruit'); pinkjackfruit.tint =  0xCC3ACC; pinkjackfruit.scale.setTo(spriteScaleX, spriteScaleY); pinkjackfruit.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(jackfruitFlag == 1 && cyanFlag == 1){var cyanjackfruit = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transJackfruit'); cyanjackfruit.tint =  0x45C1C1; cyanjackfruit.scale.setTo(spriteScaleX, spriteScaleY); cyanjackfruit.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //jacks    
                    if(jacksFlag == 1 && greenFlag == 1 ){var greenjacks = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transJacks');greenjacks.tint =  0x51C735; greenjacks.scale.setTo(spriteScaleX, spriteScaleY); 
greenjacks.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(jacksFlag == 1 && blueFlag == 1){var bluejacks = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transJacks'); bluejacks.tint =  0x456AC1; bluejacks.scale.setTo(spriteScaleX, spriteScaleY); bluejacks.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(jacksFlag == 1 && orangeFlag == 1){var orangejacks = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transJacks'); orangejacks.tint =  0xF38932; orangejacks.scale.setTo(spriteScaleX, spriteScaleY); orangejacks.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(jacksFlag == 1 && redFlag == 1){var redjacks = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transJacks'); redjacks.tint =  0xE32424; redjacks.scale.setTo(spriteScaleX, spriteScaleY); redjacks.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(jacksFlag == 1 && pinkFlag == 1){var pinkjacks = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transJacks'); pinkjacks.tint =  0xCC3ACC; pinkjacks.scale.setTo(spriteScaleX, spriteScaleY); pinkjacks.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(jacksFlag == 1 && cyanFlag == 1){var cyanjacks = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transJacks'); cyanjacks.tint =  0x45C1C1; cyanjacks.scale.setTo(spriteScaleX, spriteScaleY); cyanjacks.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //jam    
                    if(jamFlag == 1 && greenFlag == 1 ){var greenjam = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transJam');greenjam.tint =  0x51C735; greenjam.scale.setTo(spriteScaleX, spriteScaleY); 
greenjam.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(jamFlag == 1 && blueFlag == 1){var bluejam = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transJam'); bluejam.tint =  0x456AC1; bluejam.scale.setTo(spriteScaleX, spriteScaleY); bluejam.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(jamFlag == 1 && orangeFlag == 1){var orangejam = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transJam'); orangejam.tint =  0xF38932; orangejam.scale.setTo(spriteScaleX, spriteScaleY); orangejam.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(jamFlag == 1 && redFlag == 1){var redjam = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transJam'); redjam.tint =  0xE32424; redjam.scale.setTo(spriteScaleX, spriteScaleY); redjam.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(jamFlag == 1 && pinkFlag == 1){var pinkjam = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transJam'); pinkjam.tint =  0xCC3ACC; pinkjam.scale.setTo(spriteScaleX, spriteScaleY); pinkjam.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(jamFlag == 1 && cyanFlag == 1){var cyanjam = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transJam'); cyanjam.tint =  0x45C1C1; cyanjam.scale.setTo(spriteScaleX, spriteScaleY); cyanjam.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //jar
                    if(jarFlag == 1 && greenFlag == 1 ){var greenjar = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transJar');greenjar.tint =  0x51C735; greenjar.scale.setTo(spriteScaleX, spriteScaleY); 
greenjar.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(jarFlag == 1 && blueFlag == 1){console.log("bluejar plotted");var bluejar = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transJar'); bluejar.tint =  0x456AC1; bluejar.scale.setTo(spriteScaleX, spriteScaleY); bluejar.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(jarFlag == 1 && orangeFlag == 1){var orangejar = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transJar'); orangejar.tint =  0xF38932; orangejar.scale.setTo(spriteScaleX, spriteScaleY); orangejar.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(jarFlag == 1 && redFlag == 1){var redjar = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transJar'); redjar.tint =  0xE32424; redjar.scale.setTo(spriteScaleX, spriteScaleY); redjar.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(jarFlag == 1 && pinkFlag == 1){var pinkjar = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transJar'); pinkjar.tint =  0xCC3ACC; pinkjar.scale.setTo(spriteScaleX, spriteScaleY); pinkjar.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(jarFlag == 1 && cyanFlag == 1){var cyanjar = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transJar'); cyanjar.tint =  0x45C1C1; cyanjar.scale.setTo(spriteScaleX, spriteScaleY); cyanjar.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //jeep    
                    if(jeepFlag == 1 && greenFlag == 1 ){var greenjeep = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transJeep');greenjeep.tint =  0x51C735; greenjeep.scale.setTo(spriteScaleX, spriteScaleY); 
greenjeep.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(jeepFlag == 1 && blueFlag == 1){console.log("bluejeep plotted");var bluejeep = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transJeep'); bluejeep.tint =  0x456AC1; bluejeep.scale.setTo(spriteScaleX, spriteScaleY); bluejeep.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(jeepFlag == 1 && orangeFlag == 1){var orangejeep = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transJeep'); orangejeep.tint =  0xF38932; orangejeep.scale.setTo(spriteScaleX, spriteScaleY); orangejeep.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(jeepFlag == 1 && redFlag == 1){var redjeep = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transJeep'); redjeep.tint =  0xE32424; redjeep.scale.setTo(spriteScaleX, spriteScaleY); redjeep.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(jeepFlag == 1 && pinkFlag == 1){var pinkjeep = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transJeep'); pinkjeep.tint =  0xCC3ACC; pinkjeep.scale.setTo(spriteScaleX, spriteScaleY); pinkjeep.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(jeepFlag == 1 && cyanFlag == 1){var cyanjeep = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transJeep'); cyanjeep.tint =  0x45C1C1; cyanjeep.scale.setTo(spriteScaleX, spriteScaleY); cyanjeep.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //jellyfish   
                    if(jigsawFlag == 1 && greenFlag == 1 ){var greenjellyfish = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transJellyfish');greenjellyfish.tint =  0x51C735; greenjellyfish.scale.setTo(spriteScaleX, spriteScaleY); 
greenjellyfish.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(jigsawFlag == 1 && blueFlag == 1){console.log("bluejellyfish plotted");var bluejellyfish = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transJellyfish'); bluejellyfish.tint =  0x456AC1; bluejellyfish.scale.setTo(spriteScaleX, spriteScaleY); bluejellyfish.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(jigsawFlag == 1 && orangeFlag == 1){var orangejellyfish = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transJellyfish'); orangejellyfish.tint =  0xF38932; orangejellyfish.scale.setTo(spriteScaleX, spriteScaleY); orangejellyfish.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(jigsawFlag == 1 && redFlag == 1){var redjellyfish = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transJellyfish'); redjellyfish.tint =  0xE32424; redjellyfish.scale.setTo(spriteScaleX, spriteScaleY); redjellyfish.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(jigsawFlag == 1 && pinkFlag == 1){var pinkjellyfish = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transJellyfish'); pinkjellyfish.tint =  0xCC3ACC; pinkjellyfish.scale.setTo(spriteScaleX, spriteScaleY); pinkjellyfish.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(jigsawFlag == 1 && cyanFlag == 1){var cyanjellyfish = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transJellyfish'); cyanjellyfish.tint =  0x45C1C1; cyanjellyfish.scale.setTo(spriteScaleX, spriteScaleY); cyanjellyfish.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //jet    
                    if(jetFlag == 1 && greenFlag == 1 ){var greenjet = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transJet');greenjet.tint =  0x51C735; greenjet.scale.setTo(spriteScaleX, spriteScaleY); 
greenjet.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(jetFlag == 1 && blueFlag == 1){console.log("bluejet plotted");var bluejet = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transJet'); bluejet.tint =  0x456AC1; bluejet.scale.setTo(spriteScaleX, spriteScaleY); bluejet.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(jetFlag == 1 && orangeFlag == 1){var orangejet = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transJet'); orangejet.tint =  0xF38932; orangejet.scale.setTo(spriteScaleX, spriteScaleY); orangejet.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(jetFlag == 1 && redFlag == 1){var redjet = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transJet'); redjet.tint =  0xE32424; redjet.scale.setTo(spriteScaleX, spriteScaleY); redjet.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(jetFlag == 1 && pinkFlag == 1){var pinkjet = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transJet'); pinkjet.tint =  0xCC3ACC; pinkjet.scale.setTo(spriteScaleX, spriteScaleY); pinkjet.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(jetFlag == 1 && cyanFlag == 1){var cyanjet = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transJet'); cyanjet.tint =  0x45C1C1; cyanjet.scale.setTo(spriteScaleX, spriteScaleY); cyanjet.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //jigsaw    
                    if(jellyfishFlag == 1 && greenFlag == 1 ){var greenjigsaw = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transJigsaw');greenjigsaw.tint =  0x51C735; greenjigsaw.scale.setTo(spriteScaleX, spriteScaleY); 
greenjigsaw.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(jellyfishFlag == 1 && blueFlag == 1){console.log("bluejigsaw plotted");var bluejigsaw = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transJigsaw'); bluejigsaw.tint =  0x456AC1; bluejigsaw.scale.setTo(spriteScaleX, spriteScaleY); bluejigsaw.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(jellyfishFlag == 1 && orangeFlag == 1){var orangejigsaw = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transJigsaw'); orangejigsaw.tint =  0xF38932; orangejigsaw.scale.setTo(spriteScaleX, spriteScaleY); orangejigsaw.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(jellyfishFlag == 1 && redFlag == 1){var redjigsaw = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transJigsaw'); redjigsaw.tint =  0xE32424; redjigsaw.scale.setTo(spriteScaleX, spriteScaleY); redjigsaw.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(jellyfishFlag == 1 && pinkFlag == 1){var pinkjigsaw = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transJigsaw'); pinkjigsaw.tint =  0xCC3ACC; pinkjigsaw.scale.setTo(spriteScaleX, spriteScaleY); pinkjigsaw.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(jellyfishFlag == 1 && cyanFlag == 1){var cyanjigsaw = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transJigsaw'); cyanjigsaw.tint =  0x45C1C1; cyanjigsaw.scale.setTo(spriteScaleX, spriteScaleY); cyanjigsaw.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //joker    
                    if(jokerFlag == 1 && greenFlag == 1 ){var greenjoker = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transJoker');greenjoker.tint =  0x51C735; greenjoker.scale.setTo(spriteScaleX, spriteScaleY); 
greenjoker.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(jokerFlag == 1 && blueFlag == 1){console.log("bluejoker plotted");var bluejoker = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transJoker'); bluejoker.tint =  0x456AC1; bluejoker.scale.setTo(spriteScaleX, spriteScaleY); bluejoker.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(jokerFlag == 1 && orangeFlag == 1){var orangejoker = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transJoker'); orangejoker.tint =  0xF38932; orangejoker.scale.setTo(spriteScaleX, spriteScaleY); orangejoker.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(jokerFlag == 1 && redFlag == 1){var redjoker = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transJoker'); redjoker.tint =  0xE32424; redjoker.scale.setTo(spriteScaleX, spriteScaleY); redjoker.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(jokerFlag == 1 && pinkFlag == 1){var pinkjoker = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transJoker'); pinkjoker.tint =  0xCC3ACC; pinkjoker.scale.setTo(spriteScaleX, spriteScaleY); pinkjoker.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(jokerFlag == 1 && cyanFlag == 1){var cyanjoker = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transJoker'); cyanjoker.tint =  0x45C1C1; cyanjoker.scale.setTo(spriteScaleX, spriteScaleY); cyanjoker.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //jug 
                    if(jugFlag == 1 && greenFlag == 1 ){var greenjug = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transJug');greenjug.tint =  0x51C735; greenjug.scale.setTo(spriteScaleX, spriteScaleY); 
greenjug.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(jugFlag == 1 && blueFlag == 1){console.log("bluejug plotted");var bluejug = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transJug'); bluejug.tint =  0x456AC1; bluejug.scale.setTo(spriteScaleX, spriteScaleY); bluejug.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(jugFlag == 1 && orangeFlag == 1){var orangejug = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transJug'); orangejug.tint =  0xF38932; orangejug.scale.setTo(spriteScaleX, spriteScaleY); orangejug.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(jugFlag == 1 && redFlag == 1){var redjug = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transJug'); redjug.tint =  0xE32424; redjug.scale.setTo(spriteScaleX, spriteScaleY); redjug.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(jugFlag == 1 && pinkFlag == 1){var pinkjug = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transJug'); pinkjug.tint =  0xCC3ACC; pinkjug.scale.setTo(spriteScaleX, spriteScaleY); pinkjug.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(jugFlag == 1 && cyanFlag == 1){var cyanjug = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transJug'); cyanjug.tint =  0x45C1C1; cyanjug.scale.setTo(spriteScaleX, spriteScaleY); cyanjug.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
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
            
            game.world.bringToTop(jLetter);
            
            game.world.bringToTop(blue);
            game.world.bringToTop(green);
            game.world.bringToTop(red);
            game.world.bringToTop(cyan);
            game.world.bringToTop(orange);
            game.world.bringToTop(pink);
            
            game.world.bringToTop(cloud1);
            game.world.bringToTop(cloud2);
            game.world.bringToTop(cloud3);
            
            game.world.bringToTop(jackfruit);
            game.world.bringToTop(jacks);
            game.world.bringToTop(jam);
            game.world.bringToTop(jar);
            game.world.bringToTop(jeep);
            game.world.bringToTop(jellyfish);
            game.world.bringToTop(jet);
            game.world.bringToTop(jigsaw);
            game.world.bringToTop(joker);
            game.world.bringToTop(jug);
            
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
            
            
            
            if(jackfruitFlag == 1){jackfruit.angle += 2;}
            if(jacksFlag == 1){jacks.angle += 2;}
            if(jamFlag == 1){jam.angle += 2;}
            if(jarFlag == 1){jar.angle += 2;}
            if(jeepFlag == 1){jeep.angle += 2;}
            if(jigsawFlag == 1){jellyfish.angle += 2;}
            if(jetFlag == 1){jet.angle += 2;}
            if(jellyfishFlag == 1){jigsaw.angle += 2;}
            if(jokerFlag == 1){joker.angle += 2;}
            if(jugFlag == 1){jug.angle += 2;}
            
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
            
            if(jObjectClicked == 10){
            
                askForLevelK = 1;
                game.kButton = game.add.sprite(1170, 730, 'kButton');             
                game.kButton.scale.setTo(1, 1); 
                game.kButton.anchor.setTo(spriteAnchorX, spriteAnchorY);
                
            }
            
        if(askForLevelK == 1){
            
            game.world.bringToTop(game.kButton);
            game.kButton.inputEnabled = true;
            game.kButton.events.onInputDown.add(onDownJ, this);
            function onDownJ() {
            
                //start next level
                
                this.setJGlobalVaribalesToZero();
                game.state.start('K');
                
            }
        }
           
        },
        
        resetJSpriteFlag: function(){
            
            jackfruitFlag = 0;jacksFlag = 0;jamFlag = 0;jigsawFlag = 0;jarFlag = 0;
            jeepFlag = 0;jetFlag = 0;jellyfishFlag = 0;jokerFlag = 0;jugFlag = 0;
            camelFlag = 0;candleFlag = 0;carFlag = 0;catFlag = 0;cheeseFlag = 0;cherryFlag = 0;
            clockFlag = 0;cowFlag = 0;crabFlag = 0;crownFlag = 0;

            jackfruit.angle = 0;jacks.angle = 0;jam.angle = 0;jellyfish.angle = 0;jar.angle = 0;
            jeep.angle = 0;jet.angle = 0;jigsaw.angle = 0;joker.angle = 0;jug.angle = 0;
            camel.angle = 0;candle.angle = 0;car.angle = 0;cat.angle = 0;cheese.angle = 0;
            cherry.angle = 0;crown.angle = 0;clock.angle = 0;cow.angle = 0;crab.angle = 0;
           
        },
       
        setColorJFlagToZero: function(){
            
            bubbleSound.play(); blueFlag = 0;greenFlag = 0; redFlag = 0; cyanFlag = 0; pinkFlag = 0; orangeFlag = 0;
        },
        
        setJGlobalVaribalesToZero: function(){
            
            
            jackfruitFlag = 0;jacksFlag = 0;jamFlag = 0;jigsawFlag = 0;jarFlag = 0;
            jeepFlag = 0;jetFlag = 0;jellyfishFlag = 0;jokerFlag = 0;jugFlag = 0;
            camelFlag = 0;candleFlag = 0;carFlag = 0;catFlag = 0;cheeseFlag = 0;cherryFlag = 0;
            clockFlag = 0;cowFlag = 0;crabFlag = 0;crownFlag = 0;



            greenFlag = 0;blueFlag = 0;orangeFlag = 0;redFlag = 0;pinkFlag = 0;cyanFlag = 0;
        }
        
        
    };