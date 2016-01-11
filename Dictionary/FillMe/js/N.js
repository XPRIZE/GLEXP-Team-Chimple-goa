        
    var nObjectClicked = 0;
    var askForLevelO = 0;
    
    
    var nailFlag = 0;
    var needleFlag = 0;
    var nestFlag = 0;            
    var netFlag = 0;
    var newspaperFlag = 0;
    var nibFlag = 0;
    var noseFlag = 0;
    var nurseFlag = 0;
    var nutFlag = 0;
    var nutsFlag = 0;
    
    
    var N = {

        preload: function () {

            //setting default path for assets to be used in game
            this.load.path = './assets/N/';
            
            
            
            this.load.image("transNail", "transNail.png");
            this.load.image("transNeedle", "transNeedle.png");
            this.load.image("transNest", "transNest.png");
            this.load.image("transNet", "transNet.png");
            this.load.image("transNewspaper", "transNewspaper.png");
            this.load.image("transNib", "transNib.png");
            this.load.image("transNose", "transNose.png");
            this.load.image("transNurse", "transNurse.png");
            this.load.image("transNut", "transNut.png");
            this.load.image("transNuts", "transNuts.png");
            
            this.load.image("nail", "nail.png");
            this.load.image("needle", "needle.png");
            this.load.image("nest", "nest.png");
            this.load.image("net", "net.png");
            this.load.image("newspaper", "newspaper.png");
            this.load.image("nib", "nib.png");
            this.load.image("nose", "nose.png");
            this.load.image("nurse", "nurse.png");
            this.load.image("nut", "nut.png");
            this.load.image("nuts", "nuts.png");
            
            
            //loading assets for the level  N
            
            //loading shades
            this.load.image("blue", "blue.png");
            this.load.image("cyan", "cyan.png");
            this.load.image("green", "green.png");
            this.load.image("orange", "orange.png");
            this.load.image("pink", "pink.png");
            this.load.image("red", "red.png");
    
            this.load.image("bg", "bg.png");
            this.load.image("nLetter", "nLetter.png");
            this.load.image("oButton", "oButton.png");
            
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
                
            
            
            
            //Main letter N
            nLetter = game.add.sprite(gameMinWidth, gameMinHeight, 'nLetter');
            nLetter.inputEnabled = true;
            nLetter.events.onInputDown.add(this.onDownnLetter, this);
            
            
            
            //Objects starting from N
                    
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
            
            
            
            
            nail = game.add.sprite(objectsPositions[0].x, objectsPositions[0].y, 'nail');
            nail.anchor.setTo(spriteAnchorX, spriteAnchorY);
            nail.scale.setTo(spriteScaleX, spriteScaleY);
            nail.inputEnabled = true;
            nail.events.onInputDown.add(onDownnail, this);
            function onDownnail() {this.resetNSpriteFlag(); nailFlag = 1;nObjectClicked++;}

            
            
            
            needle = game.add.sprite(objectsPositions[10].x, objectsPositions[10].y, 'needle');
            needle.anchor.setTo(spriteAnchorX, spriteAnchorY);
            needle.scale.setTo(spriteScaleX, spriteScaleY);
            needle.inputEnabled = true;
            needle.events.onInputDown.add(onDownneedle, this);
            function onDownneedle() {this.resetNSpriteFlag(); needleFlag = 1;nObjectClicked++;}

            
            
            
            nest = game.add.sprite(objectsPositions[1].x, objectsPositions[1].y, 'nest');
            nest.anchor.setTo(spriteAnchorX, spriteAnchorY);
            nest.scale.setTo(spriteScaleX, spriteScaleY);
            nest.inputEnabled = true;
            nest.events.onInputDown.add(onDownnest, this);
            function onDownnest() {this.resetNSpriteFlag(); nestFlag = 1;nObjectClicked++;}
            
            
            
            
            net = game.add.sprite(objectsPositions[11].x, objectsPositions[11].y, 'net');
            net.anchor.setTo(spriteAnchorX, spriteAnchorY);
            net.scale.setTo(spriteScaleX, spriteScaleY);
            net.inputEnabled = true;
            net.events.onInputDown.add(onDownnet, this);
            function onDownnet() {this.resetNSpriteFlag(); netFlag = 1;nObjectClicked++;}
            
            
            
            newspaper = game.add.sprite(objectsPositions[2].x, objectsPositions[2].y, 'newspaper');
            newspaper.anchor.setTo(spriteAnchorX, spriteAnchorY);
            newspaper.scale.setTo(spriteScaleX, spriteScaleY);
            newspaper.inputEnabled = true;
            newspaper.events.onInputDown.add(onDownnewspaper, this);
            function onDownnewspaper() {this.resetNSpriteFlag(); newspaperFlag = 1;nObjectClicked++;}
            
            nib = game.add.sprite(objectsPositions[12].x, objectsPositions[12].y, 'nib');
            nib.anchor.setTo(spriteAnchorX, spriteAnchorY);
            nib.scale.setTo(spriteScaleX, spriteScaleY);
            nib.inputEnabled = true;
            nib.events.onInputDown.add(onDownnib, this);
            function onDownnib() {this.resetNSpriteFlag(); nurseFlag = 1;nObjectClicked++;}

            
            nose = game.add.sprite(objectsPositions[3].x, objectsPositions[3].y, 'nose');
            nose.anchor.setTo(spriteAnchorX, spriteAnchorY);
            nose.scale.setTo(spriteScaleX, spriteScaleY);
            nose.inputEnabled = true;  
            nose.events.onInputDown.add(onDownnose, this);
            function onDownnose() {this.resetNSpriteFlag(); noseFlag = 1;nObjectClicked++;}
            
            
            nurse = game.add.sprite(objectsPositions[13].x, objectsPositions[13].y, 'nurse');
            nurse.anchor.setTo(spriteAnchorX, spriteAnchorY);
            nurse.scale.setTo(spriteScaleX, spriteScaleY);
            nurse.inputEnabled = true;
            nurse.events.onInputDown.add(onDownnurse, this);
            function onDownnurse() {this.resetNSpriteFlag(); nibFlag = 1;nObjectClicked++;}
            
            
            nut = game.add.sprite(objectsPositions[4].x, objectsPositions[4].y, 'nut');
            nut.anchor.setTo(spriteAnchorX, spriteAnchorY);
            nut.scale.setTo(spriteScaleX, spriteScaleY);
            nut.inputEnabled = true;
            nut.events.onInputDown.add(onDownnut, this);
            function onDownnut() {this.resetNSpriteFlag(); nutFlag = 1;nObjectClicked++;}
            
            
            nuts = game.add.sprite(objectsPositions[14].x, objectsPositions[14].y, 'nuts');
            nuts.anchor.setTo(spriteAnchorX, spriteAnchorY);
            nuts.scale.setTo(spriteScaleX, spriteScaleY);
            nuts.inputEnabled = true;
            nuts.events.onInputDown.add(onDownnuts, this);
            function onDownnuts() {this.resetNSpriteFlag(); nutsFlag = 1;nObjectClicked++;}
            
            
            
            //Adding other sprites        
            
            camel = game.add.sprite(objectsPositions[5].x, objectsPositions[5].y, 'camel');
            camel.anchor.setTo(spriteAnchorX, spriteAnchorY);
            camel.scale.setTo(spriteScaleX, spriteScaleY);
            camel.inputEnabled = true;
            camel.events.onInputDown.add(onDownCamel, this);
            function onDownCamel() {this.resetNSpriteFlag(); camelFlag = 1;}
            
            
            
            
            candle = game.add.sprite(objectsPositions[15].x, objectsPositions[15].y, 'candle');
            candle.anchor.setTo(spriteAnchorX, spriteAnchorY);
            candle.scale.setTo(spriteScaleX, spriteScaleY);
            candle.inputEnabled = true;
            candle.events.onInputDown.add(onDownCandle, this);
            function onDownCandle() {this.resetNSpriteFlag(); candleFlag = 1; }
            
            
            car = game.add.sprite(objectsPositions[6].x, objectsPositions[6].y, 'car');
            car.anchor.setTo(spriteAnchorX, spriteAnchorY);
            car.scale.setTo(spriteScaleX, spriteScaleY);
            car.inputEnabled = true;
            car.events.onInputDown.add(onDownCar, this);
            function onDownCar() {this.resetNSpriteFlag(); carFlag = 1;}
            
            cat = game.add.sprite(objectsPositions[16].x, objectsPositions[16].y, 'cat');
            cat.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cat.scale.setTo(spriteScaleX, spriteScaleY);
            cat.inputEnabled = true;
            cat.events.onInputDown.add(onDownCat, this);
            function onDownCat() {this.resetNSpriteFlag(); catFlag = 1;}
            
            
            cheese = game.add.sprite(objectsPositions[7].x, objectsPositions[7].y, 'cheese');
            cheese.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cheese.scale.setTo(spriteScaleX, spriteScaleY);
            cheese.inputEnabled = true;
            cheese.events.onInputDown.add(onDownCheese, this);
            function onDownCheese() {this.resetNSpriteFlag(); cheeseFlag = 1;}
            
            
            cherry = game.add.sprite(objectsPositions[17].x, objectsPositions[17].y, 'cherry');
            cherry.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cherry.scale.setTo(spriteScaleX, spriteScaleY);
            cherry.inputEnabled = true;
            cherry.events.onInputDown.add(onDownCherry, this);
            function onDownCherry() {this.resetNSpriteFlag(); cherryFlag = 1;}
            
            
            clock = game.add.sprite(objectsPositions[8].x, objectsPositions[8].y, 'clock');
            clock.anchor.setTo(spriteAnchorX, spriteAnchorY);
            clock.scale.setTo(spriteScaleX, spriteScaleY);
            clock.inputEnabled = true;
            clock.events.onInputDown.add(onDownClock, this);
            function onDownClock() {this.resetNSpriteFlag(); clockFlag = 1;}
            
            
            
            cow = game.add.sprite(objectsPositions[18].x, objectsPositions[18].y, 'cow');
            cow.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cow.scale.setTo(spriteScaleX, spriteScaleY);
            cow.inputEnabled = true;
            cow.events.onInputDown.add(onDownCow, this);
            function onDownCow() {this.resetNSpriteFlag(); cowFlag = 1;}
            
            
            crab = game.add.sprite(objectsPositions[9].x, objectsPositions[9].y, 'crab');
            crab.anchor.setTo(spriteAnchorX, spriteAnchorY);
            crab.scale.setTo(spriteScaleX, spriteScaleY);
            crab.inputEnabled = true;
            crab.events.onInputDown.add(onDownCrab, this);
            function onDownCrab() {this.resetNSpriteFlag(); crabFlag = 1;}
            
            
            crown = game.add.sprite(objectsPositions[19].x, objectsPositions[19].y, 'crown');
            crown.anchor.setTo(spriteAnchorX, spriteAnchorY);
            crown.scale.setTo(spriteScaleX, spriteScaleY);
            crown.inputEnabled = true;
            crown.events.onInputDown.add(onDownCrown, this);
            function onDownCrown() {this.resetNSpriteFlag(); crownFlag = 1;}
            
            
            
            //Color shades
            blue = game.add.sprite(objectsPositions[20].x, objectsPositions[20].y, 'blue');
            blue.anchor.setTo(spriteAnchorX, spriteAnchorY);
            blue.scale.setTo(shadeScaleX, shadeScaleY);
            blue.inputEnabled = true;
            blue.tint = 0x456AC1; 
            blue.events.onInputDown.add(onDownBlue, this);
            function onDownBlue() {this.setColorNFlagToZero(); blueFlag = 1;}
           
            
            cyan = game.add.sprite(objectsPositions[21].x, objectsPositions[21].y, 'cyan');
            cyan.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cyan.scale.setTo(shadeScaleX, shadeScaleY);
            cyan.inputEnabled = true;
            cyan.tint = 0x45C1C1; 
            cyan.events.onInputDown.add(onDownCyan, this);
            function onDownCyan() {this.setColorNFlagToZero(); cyanFlag = 1;}
            
            
            
            green = game.add.sprite(objectsPositions[22].x, objectsPositions[22].y, 'green');
            green.anchor.setTo(spriteAnchorX, spriteAnchorY);
            green.scale.setTo(shadeScaleX, shadeScaleY);
            green.inputEnabled = true;
            green.tint = 0x51C735;
            green.events.onInputDown.add(onDownGreen, this);
            function onDownGreen() {this.setColorNFlagToZero(); greenFlag = 1;}
            
            
            orange = game.add.sprite(objectsPositions[23].x, objectsPositions[23].y, 'orange');
            orange.anchor.setTo(spriteAnchorX, spriteAnchorY);
            orange.scale.setTo(shadeScaleX, shadeScaleY);
            orange.inputEnabled = true;
            orange.tint = 0xF38932;
            orange.events.onInputDown.add(onDownOrange, this);
            function onDownOrange() {this.setColorNFlagToZero(); orangeFlag = 1;}
           
            
            pink = game.add.sprite(objectsPositions[24].x, objectsPositions[24].y, 'pink');
            pink.anchor.setTo(spriteAnchorX, spriteAnchorY);
            pink.scale.setTo(shadeScaleX, shadeScaleY);
            pink.inputEnabled = true;
            pink.tint = 0xCC3ACC;
            pink.events.onInputDown.add(onDownPink, this);
            function onDownPink() {this.setColorNFlagToZero(); pinkFlag = 1;}
            
            
            red = game.add.sprite(objectsPositions[25].x, objectsPositions[25].y, 'red');
            red.anchor.setTo(spriteAnchorX, spriteAnchorY);
            red.scale.setTo(shadeScaleX, shadeScaleY);
            red.inputEnabled = true;
            red.tint = 0xE32424;
            red.events.onInputDown.add(onDownRed, this);
            function onDownRed() {this.setColorNFlagToZero(); redFlag = 1;}
                
        },
        
        onDownnLetter: function() {
                
            //nail
                    if(nailFlag == 1 && greenFlag == 1 ){var greennail = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transNail');greennail.tint =  0x51C735; greennail.scale.setTo(spriteScaleX, spriteScaleY); 
greennail.anchor.setTo(0.6, 0.6);stickSound.play();}                    
                    
                    if(nailFlag == 1 && blueFlag == 1){var bluenail = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transNail'); bluenail.tint =  0x456AC1; bluenail.scale.setTo(spriteScaleX, spriteScaleY); bluenail.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(nailFlag == 1 && orangeFlag == 1){var orangenail = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transNail'); orangenail.tint =  0xF38932; orangenail.scale.setTo(spriteScaleX, spriteScaleY); orangenail.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(nailFlag == 1 && redFlag == 1){var rednail = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transNail'); rednail.tint =  0xE32424; rednail.scale.setTo(spriteScaleX, spriteScaleY); rednail.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(nailFlag == 1 && pinkFlag == 1){var pinknail = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transNail'); pinknail.tint =  0xCC3ACC; pinknail.scale.setTo(spriteScaleX, spriteScaleY); pinknail.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(nailFlag == 1 && cyanFlag == 1){var cyannail = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transNail'); cyannail.tint =  0x45C1C1; cyannail.scale.setTo(spriteScaleX, spriteScaleY); cyannail.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //needle    
                    if(needleFlag == 1 && greenFlag == 1 ){var greenneedle = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transNeedle');greenneedle.tint =  0x51C735; greenneedle.scale.setTo(spriteScaleX, spriteScaleY); 
greenneedle.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(needleFlag == 1 && blueFlag == 1){var blueneedle = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transNeedle'); blueneedle.tint =  0x456AC1; blueneedle.scale.setTo(spriteScaleX, spriteScaleY); blueneedle.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(needleFlag == 1 && orangeFlag == 1){var orangeneedle = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transNeedle'); orangeneedle.tint =  0xF38932; orangeneedle.scale.setTo(spriteScaleX, spriteScaleY); orangeneedle.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(needleFlag == 1 && redFlag == 1){var redneedle = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transNeedle'); redneedle.tint =  0xE32424; redneedle.scale.setTo(spriteScaleX, spriteScaleY); redneedle.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(needleFlag == 1 && pinkFlag == 1){var pinkneedle = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transNeedle'); pinkneedle.tint =  0xCC3ACC; pinkneedle.scale.setTo(spriteScaleX, spriteScaleY); pinkneedle.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(needleFlag == 1 && cyanFlag == 1){var cyanneedle = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transNeedle'); cyanneedle.tint =  0x45C1C1; cyanneedle.scale.setTo(spriteScaleX, spriteScaleY); cyanneedle.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //nest    
                    if(nestFlag == 1 && greenFlag == 1 ){var greennest = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transNest');greennest.tint =  0x51C735; greennest.scale.setTo(spriteScaleX, spriteScaleY); 
greennest.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(nestFlag == 1 && blueFlag == 1){var bluenest = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transNest'); bluenest.tint =  0x456AC1; bluenest.scale.setTo(spriteScaleX, spriteScaleY); bluenest.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(nestFlag == 1 && orangeFlag == 1){var orangenest = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transNest'); orangenest.tint =  0xF38932; orangenest.scale.setTo(spriteScaleX, spriteScaleY); orangenest.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(nestFlag == 1 && redFlag == 1){var rednest = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transNest'); rednest.tint =  0xE32424; rednest.scale.setTo(spriteScaleX, spriteScaleY); rednest.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(nestFlag == 1 && pinkFlag == 1){var pinknest = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transNest'); pinknest.tint =  0xCC3ACC; pinknest.scale.setTo(spriteScaleX, spriteScaleY); pinknest.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(nestFlag == 1 && cyanFlag == 1){var cyannest = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transNest'); cyannest.tint =  0x45C1C1; cyannest.scale.setTo(spriteScaleX, spriteScaleY); cyannest.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //net
                    if(netFlag == 1 && greenFlag == 1 ){var greennet = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transNet');greennet.tint =  0x51C735; greennet.scale.setTo(spriteScaleX, spriteScaleY); 
greennet.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(netFlag == 1 && blueFlag == 1){console.log("bluenet plotted");var bluenet = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transNet'); bluenet.tint =  0x456AC1; bluenet.scale.setTo(spriteScaleX, spriteScaleY); bluenet.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(netFlag == 1 && orangeFlag == 1){var orangenet = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transNet'); orangenet.tint =  0xF38932; orangenet.scale.setTo(spriteScaleX, spriteScaleY); orangenet.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(netFlag == 1 && redFlag == 1){var rednet = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transNet'); rednet.tint =  0xE32424; rednet.scale.setTo(spriteScaleX, spriteScaleY); rednet.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(netFlag == 1 && pinkFlag == 1){var pinknet = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transNet'); pinknet.tint =  0xCC3ACC; pinknet.scale.setTo(spriteScaleX, spriteScaleY); pinknet.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(netFlag == 1 && cyanFlag == 1){var cyannet = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transNet'); cyannet.tint =  0x45C1C1; cyannet.scale.setTo(spriteScaleX, spriteScaleY); cyannet.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //newspaper    
                    if(newspaperFlag == 1 && greenFlag == 1 ){var greennewspaper = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transNewspaper');greennewspaper.tint =  0x51C735; greennewspaper.scale.setTo(spriteScaleX, spriteScaleY); 
greennewspaper.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(newspaperFlag == 1 && blueFlag == 1){console.log("bluenewspaper plotted");var bluenewspaper = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transNewspaper'); bluenewspaper.tint =  0x456AC1; bluenewspaper.scale.setTo(spriteScaleX, spriteScaleY); bluenewspaper.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(newspaperFlag == 1 && orangeFlag == 1){var orangenewspaper = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transNewspaper'); orangenewspaper.tint =  0xF38932; orangenewspaper.scale.setTo(spriteScaleX, spriteScaleY); orangenewspaper.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(newspaperFlag == 1 && redFlag == 1){var rednewspaper = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transNewspaper'); rednewspaper.tint =  0xE32424; rednewspaper.scale.setTo(spriteScaleX, spriteScaleY); rednewspaper.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(newspaperFlag == 1 && pinkFlag == 1){var pinknewspaper = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transNewspaper'); pinknewspaper.tint =  0xCC3ACC; pinknewspaper.scale.setTo(spriteScaleX, spriteScaleY); pinknewspaper.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(newspaperFlag == 1 && cyanFlag == 1){var cyannewspaper = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transNewspaper'); cyannewspaper.tint =  0x45C1C1; cyannewspaper.scale.setTo(spriteScaleX, spriteScaleY); cyannewspaper.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //nib   
                    if(nurseFlag == 1 && greenFlag == 1 ){var greennib = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transNib');greennib.tint =  0x51C735; greennib.scale.setTo(spriteScaleX, spriteScaleY); 
greennib.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(nurseFlag == 1 && blueFlag == 1){console.log("bluenib plotted");var bluenib = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transNib'); bluenib.tint =  0x456AC1; bluenib.scale.setTo(spriteScaleX, spriteScaleY); bluenib.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(nurseFlag == 1 && orangeFlag == 1){var orangenib = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transNib'); orangenib.tint =  0xF38932; orangenib.scale.setTo(spriteScaleX, spriteScaleY); orangenib.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(nurseFlag == 1 && redFlag == 1){var rednib = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transNib'); rednib.tint =  0xE32424; rednib.scale.setTo(spriteScaleX, spriteScaleY); rednib.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(nurseFlag == 1 && pinkFlag == 1){var pinknib = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transNib'); pinknib.tint =  0xCC3ACC; pinknib.scale.setTo(spriteScaleX, spriteScaleY); pinknib.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(nurseFlag == 1 && cyanFlag == 1){var cyannib = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transNib'); cyannib.tint =  0x45C1C1; cyannib.scale.setTo(spriteScaleX, spriteScaleY); cyannib.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //nose    
                    if(noseFlag == 1 && greenFlag == 1 ){var greennose = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transNose');greennose.tint =  0x51C735; greennose.scale.setTo(spriteScaleX, spriteScaleY); 
greennose.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(noseFlag == 1 && blueFlag == 1){console.log("bluenose plotted");var bluenose = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transNose'); bluenose.tint =  0x456AC1; bluenose.scale.setTo(spriteScaleX, spriteScaleY); bluenose.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(noseFlag == 1 && orangeFlag == 1){var orangenose = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transNose'); orangenose.tint =  0xF38932; orangenose.scale.setTo(spriteScaleX, spriteScaleY); orangenose.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(noseFlag == 1 && redFlag == 1){var rednose = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transNose'); rednose.tint =  0xE32424; rednose.scale.setTo(spriteScaleX, spriteScaleY); rednose.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(noseFlag == 1 && pinkFlag == 1){var pinknose = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transNose'); pinknose.tint =  0xCC3ACC; pinknose.scale.setTo(spriteScaleX, spriteScaleY); pinknose.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(noseFlag == 1 && cyanFlag == 1){var cyannose = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transNose'); cyannose.tint =  0x45C1C1; cyannose.scale.setTo(spriteScaleX, spriteScaleY); cyannose.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //nurse    
                    if(nibFlag == 1 && greenFlag == 1 ){var greennurse = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transNurse');greennurse.tint =  0x51C735; greennurse.scale.setTo(spriteScaleX, spriteScaleY); 
greennurse.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(nibFlag == 1 && blueFlag == 1){console.log("bluenurse plotted");var bluenurse = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transNurse'); bluenurse.tint =  0x456AC1; bluenurse.scale.setTo(spriteScaleX, spriteScaleY); bluenurse.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(nibFlag == 1 && orangeFlag == 1){var orangenurse = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transNurse'); orangenurse.tint =  0xF38932; orangenurse.scale.setTo(spriteScaleX, spriteScaleY); orangenurse.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(nibFlag == 1 && redFlag == 1){var rednurse = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transNurse'); rednurse.tint =  0xE32424; rednurse.scale.setTo(spriteScaleX, spriteScaleY); rednurse.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(nibFlag == 1 && pinkFlag == 1){var pinknurse = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transNurse'); pinknurse.tint =  0xCC3ACC; pinknurse.scale.setTo(spriteScaleX, spriteScaleY); pinknurse.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(nibFlag == 1 && cyanFlag == 1){var cyannurse = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transNurse'); cyannurse.tint =  0x45C1C1; cyannurse.scale.setTo(spriteScaleX, spriteScaleY); cyannurse.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //nut    
                    if(nutFlag == 1 && greenFlag == 1 ){var greennut = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transNut');greennut.tint =  0x51C735; greennut.scale.setTo(spriteScaleX, spriteScaleY); 
greennut.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(nutFlag == 1 && blueFlag == 1){console.log("bluenut plotted");var bluenut = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transNut'); bluenut.tint =  0x456AC1; bluenut.scale.setTo(spriteScaleX, spriteScaleY); bluenut.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(nutFlag == 1 && orangeFlag == 1){var orangenut = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transNut'); orangenut.tint =  0xF38932; orangenut.scale.setTo(spriteScaleX, spriteScaleY); orangenut.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(nutFlag == 1 && redFlag == 1){var rednut = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transNut'); rednut.tint =  0xE32424; rednut.scale.setTo(spriteScaleX, spriteScaleY); rednut.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(nutFlag == 1 && pinkFlag == 1){var pinknut = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transNut'); pinknut.tint =  0xCC3ACC; pinknut.scale.setTo(spriteScaleX, spriteScaleY); pinknut.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(nutFlag == 1 && cyanFlag == 1){var cyannut = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transNut'); cyannut.tint =  0x45C1C1; cyannut.scale.setTo(spriteScaleX, spriteScaleY); cyannut.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //nuts 
                    if(nutsFlag == 1 && greenFlag == 1 ){var greennuts = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transNuts');greennuts.tint =  0x51C735; greennuts.scale.setTo(spriteScaleX, spriteScaleY); 
greennuts.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(nutsFlag == 1 && blueFlag == 1){console.log("bluenuts plotted");var bluenuts = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transNuts'); bluenuts.tint =  0x456AC1; bluenuts.scale.setTo(spriteScaleX, spriteScaleY); bluenuts.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(nutsFlag == 1 && orangeFlag == 1){var orangenuts = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transNuts'); orangenuts.tint =  0xF38932; orangenuts.scale.setTo(spriteScaleX, spriteScaleY); orangenuts.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(nutsFlag == 1 && redFlag == 1){var rednuts = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transNuts'); rednuts.tint =  0xE32424; rednuts.scale.setTo(spriteScaleX, spriteScaleY); rednuts.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(nutsFlag == 1 && pinkFlag == 1){var pinknuts = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transNuts'); pinknuts.tint =  0xCC3ACC; pinknuts.scale.setTo(spriteScaleX, spriteScaleY); pinknuts.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(nutsFlag == 1 && cyanFlag == 1){var cyannuts = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transNuts'); cyannuts.tint =  0x45C1C1; cyannuts.scale.setTo(spriteScaleX, spriteScaleY); cyannuts.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
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
            
            game.world.bringToTop(nLetter);
            
            game.world.bringToTop(blue);
            game.world.bringToTop(green);
            game.world.bringToTop(red);
            game.world.bringToTop(cyan);
            game.world.bringToTop(orange);
            game.world.bringToTop(pink);
            
            game.world.bringToTop(cloud1);
            game.world.bringToTop(cloud2);
            game.world.bringToTop(cloud3);
            
            game.world.bringToTop(nail);
            game.world.bringToTop(needle);
            game.world.bringToTop(nest);
            game.world.bringToTop(net);
            game.world.bringToTop(newspaper);
            game.world.bringToTop(nib);
            game.world.bringToTop(nose);
            game.world.bringToTop(nurse);
            game.world.bringToTop(nut);
            game.world.bringToTop(nuts);
            
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
            
            
            
            if(nailFlag == 1){nail.angle += 2;}
            if(needleFlag == 1){needle.angle += 2;}
            if(nestFlag == 1){nest.angle += 2;}
            if(netFlag == 1){net.angle += 2;}
            if(newspaperFlag == 1){newspaper.angle += 2;}
            if(nurseFlag == 1){nib.angle += 2;}
            if(noseFlag == 1){nose.angle += 2;}
            if(nibFlag == 1){nurse.angle += 2;}
            if(nutFlag == 1){nut.angle += 2;}
            if(nutsFlag == 1){nuts.angle += 2;}
            
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
            
            if(nObjectClicked == 10){
            
                askForLevelO = 1;
                game.oButton = game.add.sprite(1170, 730, 'oButton');             
                game.oButton.scale.setTo(1, 1); 
                game.oButton.anchor.setTo(spriteAnchorX, spriteAnchorY);
                
            }
            
        if(askForLevelO == 1){
            
            game.world.bringToTop(game.oButton);
            game.oButton.inputEnabled = true;
            game.oButton.events.onInputDown.add(onDownO, this);
            function onDownO() {
            
                //start next level
                
                this.setNGlobalVaribalesToZero();
                game.state.start('O');
                
            }
        }
           
        },
        
        resetNSpriteFlag: function(){
            
            nailFlag = 0;needleFlag = 0;nestFlag = 0;nurseFlag = 0;netFlag = 0;
            newspaperFlag = 0;noseFlag = 0;nibFlag = 0;nutFlag = 0;nutsFlag = 0;
            camelFlag = 0;candleFlag = 0;carFlag = 0;catFlag = 0;cheeseFlag = 0;cherryFlag = 0;
            clockFlag = 0;cowFlag = 0;crabFlag = 0;crownFlag = 0;

            nail.angle = 0;needle.angle = 0;nest.angle = 0;nib.angle = 0;net.angle = 0;
            newspaper.angle = 0;nose.angle = 0;nurse.angle = 0;nut.angle = 0;nuts.angle = 0;
            camel.angle = 0;candle.angle = 0;car.angle = 0;cat.angle = 0;cheese.angle = 0;
            cherry.angle = 0;crown.angle = 0;clock.angle = 0;cow.angle = 0;crab.angle = 0;
           
        },
       
        setColorNFlagToZero: function(){
            
            bubbleSound.play(); blueFlag = 0;greenFlag = 0; redFlag = 0; cyanFlag = 0; pinkFlag = 0; orangeFlag = 0;
        },
        
        setNGlobalVaribalesToZero: function(){
            
            
            nailFlag = 0;needleFlag = 0;nestFlag = 0;nurseFlag = 0;netFlag = 0;
            newspaperFlag = 0;noseFlag = 0;nibFlag = 0;nutFlag = 0;nutsFlag = 0;
            camelFlag = 0;candleFlag = 0;carFlag = 0;catFlag = 0;cheeseFlag = 0;cherryFlag = 0;
            clockFlag = 0;cowFlag = 0;crabFlag = 0;crownFlag = 0;



            greenFlag = 0;blueFlag = 0;orangeFlag = 0;redFlag = 0;pinkFlag = 0;cyanFlag = 0;
        }
        
        
    };