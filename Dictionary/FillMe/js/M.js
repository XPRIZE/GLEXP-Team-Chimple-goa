        
    var mObjectClicked = 0;
    var askForLevelN = 0;
    
    
    var magnetFlag = 0;
    var mangoFlag = 0;
    var mapFlag = 0;            
    var maskFlag = 0;
    var mobileFlag = 0;
    var monkeyFlag = 0;
    var motorcycleFlag = 0;
    var mountainFlag = 0;
    var mugFlag = 0;
    var mushroomFlag = 0;
    
    
    var M = {

        preload: function () {

            //setting default path for assets to be used in game
            this.load.path = './assets/M/';
            
            
            
            this.load.image("transMagnet", "transMagnet.png");
            this.load.image("transMango", "transMango.png");
            this.load.image("transMap", "transMap.png");
            this.load.image("transMask", "transMask.png");
            this.load.image("transMobile", "transMobile.png");
            this.load.image("transMonkey", "transMonkey.png");
            this.load.image("transMotorcycle", "transMotorcycle.png");
            this.load.image("transMountain", "transMountain.png");
            this.load.image("transMug", "transMug.png");
            this.load.image("transMushroom", "transMushroom.png");
            
            this.load.image("magnet", "magnet.png");
            this.load.image("mango", "mango.png");
            this.load.image("map", "map.png");
            this.load.image("mask", "mask.png");
            this.load.image("mobile", "mobile.png");
            this.load.image("monkey", "monkey.png");
            this.load.image("motorcycle", "motorcycle.png");
            this.load.image("mountain", "mountain.png");
            this.load.image("mug", "mug.png");
            this.load.image("mushroom", "mushroom.png");
            
            
            //loading assets for the level  M
            
            //loading shades
            this.load.image("blue", "blue.png");
            this.load.image("cyan", "cyan.png");
            this.load.image("green", "green.png");
            this.load.image("orange", "orange.png");
            this.load.image("pink", "pink.png");
            this.load.image("red", "red.png");
    
            this.load.image("bg", "bg.png");
            this.load.image("mLetter", "mLetter.png");
            this.load.image("nButton", "nButton.png");
            
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
                
            
            
            
            //Main letter M
            mLetter = game.add.sprite(gameMinWidth, gameMinHeight, 'mLetter');
            mLetter.inputEnabled = true;
            mLetter.events.onInputDown.add(this.onDownmLetter, this);
            
            
            
            //Objects starting from M
                    
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
            
            
            
            
            magnet = game.add.sprite(objectsPositions[0].x, objectsPositions[0].y, 'magnet');
            magnet.anchor.setTo(spriteAnchorX, spriteAnchorY);
            magnet.scale.setTo(spriteScaleX, spriteScaleY);
            magnet.inputEnabled = true;
            magnet.events.onInputDown.add(onDownmagnet, this);
            function onDownmagnet() {this.resetMSpriteFlag(); magnetFlag = 1;mObjectClicked++;}

            
            
            
            mango = game.add.sprite(objectsPositions[10].x, objectsPositions[10].y, 'mango');
            mango.anchor.setTo(spriteAnchorX, spriteAnchorY);
            mango.scale.setTo(spriteScaleX, spriteScaleY);
            mango.inputEnabled = true;
            mango.events.onInputDown.add(onDownmango, this);
            function onDownmango() {this.resetMSpriteFlag(); mangoFlag = 1;mObjectClicked++;}

            
            
            
            map = game.add.sprite(objectsPositions[1].x, objectsPositions[1].y, 'map');
            map.anchor.setTo(spriteAnchorX, spriteAnchorY);
            map.scale.setTo(spriteScaleX, spriteScaleY);
            map.inputEnabled = true;
            map.events.onInputDown.add(onDownmap, this);
            function onDownmap() {this.resetMSpriteFlag(); mapFlag = 1;mObjectClicked++;}
            
            
            
            
            mask = game.add.sprite(objectsPositions[11].x, objectsPositions[11].y, 'mask');
            mask.anchor.setTo(spriteAnchorX, spriteAnchorY);
            mask.scale.setTo(spriteScaleX, spriteScaleY);
            mask.inputEnabled = true;
            mask.events.onInputDown.add(onDownmask, this);
            function onDownmask() {this.resetMSpriteFlag(); maskFlag = 1;mObjectClicked++;}
            
            
            
            mobile = game.add.sprite(objectsPositions[2].x, objectsPositions[2].y, 'mobile');
            mobile.anchor.setTo(spriteAnchorX, spriteAnchorY);
            mobile.scale.setTo(spriteScaleX, spriteScaleY);
            mobile.inputEnabled = true;
            mobile.events.onInputDown.add(onDownmobile, this);
            function onDownmobile() {this.resetMSpriteFlag(); mobileFlag = 1;mObjectClicked++;}
            
            monkey = game.add.sprite(objectsPositions[12].x, objectsPositions[12].y, 'monkey');
            monkey.anchor.setTo(spriteAnchorX, spriteAnchorY);
            monkey.scale.setTo(spriteScaleX, spriteScaleY);
            monkey.inputEnabled = true;
            monkey.events.onInputDown.add(onDownmonkey, this);
            function onDownmonkey() {this.resetMSpriteFlag(); mountainFlag = 1;mObjectClicked++;}

            
            motorcycle = game.add.sprite(objectsPositions[3].x, objectsPositions[3].y, 'motorcycle');
            motorcycle.anchor.setTo(spriteAnchorX, spriteAnchorY);
            motorcycle.scale.setTo(spriteScaleX, spriteScaleY);
            motorcycle.inputEnabled = true;  
            motorcycle.events.onInputDown.add(onDownmotorcycle, this);
            function onDownmotorcycle() {this.resetMSpriteFlag(); motorcycleFlag = 1;mObjectClicked++;}
            
            
            mountain = game.add.sprite(objectsPositions[13].x, objectsPositions[13].y, 'mountain');
            mountain.anchor.setTo(spriteAnchorX, spriteAnchorY);
            mountain.scale.setTo(spriteScaleX, spriteScaleY);
            mountain.inputEnabled = true;
            mountain.events.onInputDown.add(onDownmountain, this);
            function onDownmountain() {this.resetMSpriteFlag(); monkeyFlag = 1;mObjectClicked++;}
            
            
            mug = game.add.sprite(objectsPositions[4].x, objectsPositions[4].y, 'mug');
            mug.anchor.setTo(spriteAnchorX, spriteAnchorY);
            mug.scale.setTo(spriteScaleX, spriteScaleY);
            mug.inputEnabled = true;
            mug.events.onInputDown.add(onDownmug, this);
            function onDownmug() {this.resetMSpriteFlag(); mugFlag = 1;mObjectClicked++;}
            
            
            mushroom = game.add.sprite(objectsPositions[14].x, objectsPositions[14].y, 'mushroom');
            mushroom.anchor.setTo(spriteAnchorX, spriteAnchorY);
            mushroom.scale.setTo(spriteScaleX, spriteScaleY);
            mushroom.inputEnabled = true;
            mushroom.events.onInputDown.add(onDownmushroom, this);
            function onDownmushroom() {this.resetMSpriteFlag(); mushroomFlag = 1;mObjectClicked++;}
            
            
            
            //Adding other sprites        
            
            camel = game.add.sprite(objectsPositions[5].x, objectsPositions[5].y, 'camel');
            camel.anchor.setTo(spriteAnchorX, spriteAnchorY);
            camel.scale.setTo(spriteScaleX, spriteScaleY);
            camel.inputEnabled = true;
            camel.events.onInputDown.add(onDownCamel, this);
            function onDownCamel() {this.resetMSpriteFlag(); camelFlag = 1;}
            
            
            
            
            candle = game.add.sprite(objectsPositions[15].x, objectsPositions[15].y, 'candle');
            candle.anchor.setTo(spriteAnchorX, spriteAnchorY);
            candle.scale.setTo(spriteScaleX, spriteScaleY);
            candle.inputEnabled = true;
            candle.events.onInputDown.add(onDownCandle, this);
            function onDownCandle() {this.resetMSpriteFlag(); candleFlag = 1; }
            
            
            car = game.add.sprite(objectsPositions[6].x, objectsPositions[6].y, 'car');
            car.anchor.setTo(spriteAnchorX, spriteAnchorY);
            car.scale.setTo(spriteScaleX, spriteScaleY);
            car.inputEnabled = true;
            car.events.onInputDown.add(onDownCar, this);
            function onDownCar() {this.resetMSpriteFlag(); carFlag = 1;}
            
            cat = game.add.sprite(objectsPositions[16].x, objectsPositions[16].y, 'cat');
            cat.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cat.scale.setTo(spriteScaleX, spriteScaleY);
            cat.inputEnabled = true;
            cat.events.onInputDown.add(onDownCat, this);
            function onDownCat() {this.resetMSpriteFlag(); catFlag = 1;}
            
            
            cheese = game.add.sprite(objectsPositions[7].x, objectsPositions[7].y, 'cheese');
            cheese.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cheese.scale.setTo(spriteScaleX, spriteScaleY);
            cheese.inputEnabled = true;
            cheese.events.onInputDown.add(onDownCheese, this);
            function onDownCheese() {this.resetMSpriteFlag(); cheeseFlag = 1;}
            
            
            cherry = game.add.sprite(objectsPositions[17].x, objectsPositions[17].y, 'cherry');
            cherry.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cherry.scale.setTo(spriteScaleX, spriteScaleY);
            cherry.inputEnabled = true;
            cherry.events.onInputDown.add(onDownCherry, this);
            function onDownCherry() {this.resetMSpriteFlag(); cherryFlag = 1;}
            
            
            clock = game.add.sprite(objectsPositions[8].x, objectsPositions[8].y, 'clock');
            clock.anchor.setTo(spriteAnchorX, spriteAnchorY);
            clock.scale.setTo(spriteScaleX, spriteScaleY);
            clock.inputEnabled = true;
            clock.events.onInputDown.add(onDownClock, this);
            function onDownClock() {this.resetMSpriteFlag(); clockFlag = 1;}
            
            
            
            cow = game.add.sprite(objectsPositions[18].x, objectsPositions[18].y, 'cow');
            cow.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cow.scale.setTo(spriteScaleX, spriteScaleY);
            cow.inputEnabled = true;
            cow.events.onInputDown.add(onDownCow, this);
            function onDownCow() {this.resetMSpriteFlag(); cowFlag = 1;}
            
            
            crab = game.add.sprite(objectsPositions[9].x, objectsPositions[9].y, 'crab');
            crab.anchor.setTo(spriteAnchorX, spriteAnchorY);
            crab.scale.setTo(spriteScaleX, spriteScaleY);
            crab.inputEnabled = true;
            crab.events.onInputDown.add(onDownCrab, this);
            function onDownCrab() {this.resetMSpriteFlag(); crabFlag = 1;}
            
            
            crown = game.add.sprite(objectsPositions[19].x, objectsPositions[19].y, 'crown');
            crown.anchor.setTo(spriteAnchorX, spriteAnchorY);
            crown.scale.setTo(spriteScaleX, spriteScaleY);
            crown.inputEnabled = true;
            crown.events.onInputDown.add(onDownCrown, this);
            function onDownCrown() {this.resetMSpriteFlag(); crownFlag = 1;}
            
            
            
            //Color shades
            blue = game.add.sprite(objectsPositions[20].x, objectsPositions[20].y, 'blue');
            blue.anchor.setTo(spriteAnchorX, spriteAnchorY);
            blue.scale.setTo(shadeScaleX, shadeScaleY);
            blue.inputEnabled = true;
            blue.tint = 0x456AC1; 
            blue.events.onInputDown.add(onDownBlue, this);
            function onDownBlue() {this.setColorMFlagToZero(); blueFlag = 1;}
           
            
            cyan = game.add.sprite(objectsPositions[21].x, objectsPositions[21].y, 'cyan');
            cyan.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cyan.scale.setTo(shadeScaleX, shadeScaleY);
            cyan.inputEnabled = true;
            cyan.tint = 0x45C1C1; 
            cyan.events.onInputDown.add(onDownCyan, this);
            function onDownCyan() {this.setColorMFlagToZero(); cyanFlag = 1;}
            
            
            
            green = game.add.sprite(objectsPositions[22].x, objectsPositions[22].y, 'green');
            green.anchor.setTo(spriteAnchorX, spriteAnchorY);
            green.scale.setTo(shadeScaleX, shadeScaleY);
            green.inputEnabled = true;
            green.tint = 0x51C735;
            green.events.onInputDown.add(onDownGreen, this);
            function onDownGreen() {this.setColorMFlagToZero(); greenFlag = 1;}
            
            
            orange = game.add.sprite(objectsPositions[23].x, objectsPositions[23].y, 'orange');
            orange.anchor.setTo(spriteAnchorX, spriteAnchorY);
            orange.scale.setTo(shadeScaleX, shadeScaleY);
            orange.inputEnabled = true;
            orange.tint = 0xF38932;
            orange.events.onInputDown.add(onDownOrange, this);
            function onDownOrange() {this.setColorMFlagToZero(); orangeFlag = 1;}
           
            
            pink = game.add.sprite(objectsPositions[24].x, objectsPositions[24].y, 'pink');
            pink.anchor.setTo(spriteAnchorX, spriteAnchorY);
            pink.scale.setTo(shadeScaleX, shadeScaleY);
            pink.inputEnabled = true;
            pink.tint = 0xCC3ACC;
            pink.events.onInputDown.add(onDownPink, this);
            function onDownPink() {this.setColorMFlagToZero(); pinkFlag = 1;}
            
            
            red = game.add.sprite(objectsPositions[25].x, objectsPositions[25].y, 'red');
            red.anchor.setTo(spriteAnchorX, spriteAnchorY);
            red.scale.setTo(shadeScaleX, shadeScaleY);
            red.inputEnabled = true;
            red.tint = 0xE32424;
            red.events.onInputDown.add(onDownRed, this);
            function onDownRed() {this.setColorMFlagToZero(); redFlag = 1;}
                
        },
        
        onDownmLetter: function() {
                
            //magnet
                    if(magnetFlag == 1 && greenFlag == 1 ){var greenmagnet = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transMagnet');greenmagnet.tint =  0x51C735; greenmagnet.scale.setTo(spriteScaleX, spriteScaleY); 
greenmagnet.anchor.setTo(0.6, 0.6);stickSound.play();}                    
                    
                    if(magnetFlag == 1 && blueFlag == 1){var bluemagnet = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transMagnet'); bluemagnet.tint =  0x456AC1; bluemagnet.scale.setTo(spriteScaleX, spriteScaleY); bluemagnet.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(magnetFlag == 1 && orangeFlag == 1){var orangemagnet = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transMagnet'); orangemagnet.tint =  0xF38932; orangemagnet.scale.setTo(spriteScaleX, spriteScaleY); orangemagnet.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(magnetFlag == 1 && redFlag == 1){var redmagnet = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transMagnet'); redmagnet.tint =  0xE32424; redmagnet.scale.setTo(spriteScaleX, spriteScaleY); redmagnet.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(magnetFlag == 1 && pinkFlag == 1){var pinkmagnet = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transMagnet'); pinkmagnet.tint =  0xCC3ACC; pinkmagnet.scale.setTo(spriteScaleX, spriteScaleY); pinkmagnet.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(magnetFlag == 1 && cyanFlag == 1){var cyanmagnet = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transMagnet'); cyanmagnet.tint =  0x45C1C1; cyanmagnet.scale.setTo(spriteScaleX, spriteScaleY); cyanmagnet.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //mango    
                    if(mangoFlag == 1 && greenFlag == 1 ){var greenmango = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transMango');greenmango.tint =  0x51C735; greenmango.scale.setTo(spriteScaleX, spriteScaleY); 
greenmango.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(mangoFlag == 1 && blueFlag == 1){var bluemango = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transMango'); bluemango.tint =  0x456AC1; bluemango.scale.setTo(spriteScaleX, spriteScaleY); bluemango.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(mangoFlag == 1 && orangeFlag == 1){var orangemango = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transMango'); orangemango.tint =  0xF38932; orangemango.scale.setTo(spriteScaleX, spriteScaleY); orangemango.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(mangoFlag == 1 && redFlag == 1){var redmango = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transMango'); redmango.tint =  0xE32424; redmango.scale.setTo(spriteScaleX, spriteScaleY); redmango.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(mangoFlag == 1 && pinkFlag == 1){var pinkmango = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transMango'); pinkmango.tint =  0xCC3ACC; pinkmango.scale.setTo(spriteScaleX, spriteScaleY); pinkmango.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(mangoFlag == 1 && cyanFlag == 1){var cyanmango = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transMango'); cyanmango.tint =  0x45C1C1; cyanmango.scale.setTo(spriteScaleX, spriteScaleY); cyanmango.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //map    
                    if(mapFlag == 1 && greenFlag == 1 ){var greenmap = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transMap');greenmap.tint =  0x51C735; greenmap.scale.setTo(spriteScaleX, spriteScaleY); 
greenmap.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(mapFlag == 1 && blueFlag == 1){var bluemap = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transMap'); bluemap.tint =  0x456AC1; bluemap.scale.setTo(spriteScaleX, spriteScaleY); bluemap.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(mapFlag == 1 && orangeFlag == 1){var orangemap = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transMap'); orangemap.tint =  0xF38932; orangemap.scale.setTo(spriteScaleX, spriteScaleY); orangemap.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(mapFlag == 1 && redFlag == 1){var redmap = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transMap'); redmap.tint =  0xE32424; redmap.scale.setTo(spriteScaleX, spriteScaleY); redmap.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(mapFlag == 1 && pinkFlag == 1){var pinkmap = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transMap'); pinkmap.tint =  0xCC3ACC; pinkmap.scale.setTo(spriteScaleX, spriteScaleY); pinkmap.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(mapFlag == 1 && cyanFlag == 1){var cyanmap = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transMap'); cyanmap.tint =  0x45C1C1; cyanmap.scale.setTo(spriteScaleX, spriteScaleY); cyanmap.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //mask
                    if(maskFlag == 1 && greenFlag == 1 ){var greenmask = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transMask');greenmask.tint =  0x51C735; greenmask.scale.setTo(spriteScaleX, spriteScaleY); 
greenmask.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(maskFlag == 1 && blueFlag == 1){console.log("bluemask plotted");var bluemask = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transMask'); bluemask.tint =  0x456AC1; bluemask.scale.setTo(spriteScaleX, spriteScaleY); bluemask.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(maskFlag == 1 && orangeFlag == 1){var orangemask = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transMask'); orangemask.tint =  0xF38932; orangemask.scale.setTo(spriteScaleX, spriteScaleY); orangemask.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(maskFlag == 1 && redFlag == 1){var redmask = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transMask'); redmask.tint =  0xE32424; redmask.scale.setTo(spriteScaleX, spriteScaleY); redmask.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(maskFlag == 1 && pinkFlag == 1){var pinkmask = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transMask'); pinkmask.tint =  0xCC3ACC; pinkmask.scale.setTo(spriteScaleX, spriteScaleY); pinkmask.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(maskFlag == 1 && cyanFlag == 1){var cyanmask = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transMask'); cyanmask.tint =  0x45C1C1; cyanmask.scale.setTo(spriteScaleX, spriteScaleY); cyanmask.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //mobile    
                    if(mobileFlag == 1 && greenFlag == 1 ){var greenmobile = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transMobile');greenmobile.tint =  0x51C735; greenmobile.scale.setTo(spriteScaleX, spriteScaleY); 
greenmobile.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(mobileFlag == 1 && blueFlag == 1){console.log("bluemobile plotted");var bluemobile = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transMobile'); bluemobile.tint =  0x456AC1; bluemobile.scale.setTo(spriteScaleX, spriteScaleY); bluemobile.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(mobileFlag == 1 && orangeFlag == 1){var orangemobile = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transMobile'); orangemobile.tint =  0xF38932; orangemobile.scale.setTo(spriteScaleX, spriteScaleY); orangemobile.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(mobileFlag == 1 && redFlag == 1){var redmobile = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transMobile'); redmobile.tint =  0xE32424; redmobile.scale.setTo(spriteScaleX, spriteScaleY); redmobile.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(mobileFlag == 1 && pinkFlag == 1){var pinkmobile = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transMobile'); pinkmobile.tint =  0xCC3ACC; pinkmobile.scale.setTo(spriteScaleX, spriteScaleY); pinkmobile.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(mobileFlag == 1 && cyanFlag == 1){var cyanmobile = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transMobile'); cyanmobile.tint =  0x45C1C1; cyanmobile.scale.setTo(spriteScaleX, spriteScaleY); cyanmobile.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //monkey   
                    if(mountainFlag == 1 && greenFlag == 1 ){var greenmonkey = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transMonkey');greenmonkey.tint =  0x51C735; greenmonkey.scale.setTo(spriteScaleX, spriteScaleY); 
greenmonkey.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(mountainFlag == 1 && blueFlag == 1){console.log("bluemonkey plotted");var bluemonkey = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transMonkey'); bluemonkey.tint =  0x456AC1; bluemonkey.scale.setTo(spriteScaleX, spriteScaleY); bluemonkey.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(mountainFlag == 1 && orangeFlag == 1){var orangemonkey = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transMonkey'); orangemonkey.tint =  0xF38932; orangemonkey.scale.setTo(spriteScaleX, spriteScaleY); orangemonkey.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(mountainFlag == 1 && redFlag == 1){var redmonkey = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transMonkey'); redmonkey.tint =  0xE32424; redmonkey.scale.setTo(spriteScaleX, spriteScaleY); redmonkey.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(mountainFlag == 1 && pinkFlag == 1){var pinkmonkey = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transMonkey'); pinkmonkey.tint =  0xCC3ACC; pinkmonkey.scale.setTo(spriteScaleX, spriteScaleY); pinkmonkey.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(mountainFlag == 1 && cyanFlag == 1){var cyanmonkey = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transMonkey'); cyanmonkey.tint =  0x45C1C1; cyanmonkey.scale.setTo(spriteScaleX, spriteScaleY); cyanmonkey.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //motorcycle    
                    if(motorcycleFlag == 1 && greenFlag == 1 ){var greenmotorcycle = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transMotorcycle');greenmotorcycle.tint =  0x51C735; greenmotorcycle.scale.setTo(spriteScaleX, spriteScaleY); 
greenmotorcycle.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(motorcycleFlag == 1 && blueFlag == 1){console.log("bluemotorcycle plotted");var bluemotorcycle = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transMotorcycle'); bluemotorcycle.tint =  0x456AC1; bluemotorcycle.scale.setTo(spriteScaleX, spriteScaleY); bluemotorcycle.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(motorcycleFlag == 1 && orangeFlag == 1){var orangemotorcycle = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transMotorcycle'); orangemotorcycle.tint =  0xF38932; orangemotorcycle.scale.setTo(spriteScaleX, spriteScaleY); orangemotorcycle.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(motorcycleFlag == 1 && redFlag == 1){var redmotorcycle = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transMotorcycle'); redmotorcycle.tint =  0xE32424; redmotorcycle.scale.setTo(spriteScaleX, spriteScaleY); redmotorcycle.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(motorcycleFlag == 1 && pinkFlag == 1){var pinkmotorcycle = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transMotorcycle'); pinkmotorcycle.tint =  0xCC3ACC; pinkmotorcycle.scale.setTo(spriteScaleX, spriteScaleY); pinkmotorcycle.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(motorcycleFlag == 1 && cyanFlag == 1){var cyanmotorcycle = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transMotorcycle'); cyanmotorcycle.tint =  0x45C1C1; cyanmotorcycle.scale.setTo(spriteScaleX, spriteScaleY); cyanmotorcycle.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //mountain    
                    if(monkeyFlag == 1 && greenFlag == 1 ){var greenmountain = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transMountain');greenmountain.tint =  0x51C735; greenmountain.scale.setTo(spriteScaleX, spriteScaleY); 
greenmountain.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(monkeyFlag == 1 && blueFlag == 1){console.log("bluemountain plotted");var bluemountain = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transMountain'); bluemountain.tint =  0x456AC1; bluemountain.scale.setTo(spriteScaleX, spriteScaleY); bluemountain.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(monkeyFlag == 1 && orangeFlag == 1){var orangemountain = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transMountain'); orangemountain.tint =  0xF38932; orangemountain.scale.setTo(spriteScaleX, spriteScaleY); orangemountain.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(monkeyFlag == 1 && redFlag == 1){var redmountain = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transMountain'); redmountain.tint =  0xE32424; redmountain.scale.setTo(spriteScaleX, spriteScaleY); redmountain.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(monkeyFlag == 1 && pinkFlag == 1){var pinkmountain = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transMountain'); pinkmountain.tint =  0xCC3ACC; pinkmountain.scale.setTo(spriteScaleX, spriteScaleY); pinkmountain.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(monkeyFlag == 1 && cyanFlag == 1){var cyanmountain = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transMountain'); cyanmountain.tint =  0x45C1C1; cyanmountain.scale.setTo(spriteScaleX, spriteScaleY); cyanmountain.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //mug    
                    if(mugFlag == 1 && greenFlag == 1 ){var greenmug = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transMug');greenmug.tint =  0x51C735; greenmug.scale.setTo(spriteScaleX, spriteScaleY); 
greenmug.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(mugFlag == 1 && blueFlag == 1){console.log("bluemug plotted");var bluemug = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transMug'); bluemug.tint =  0x456AC1; bluemug.scale.setTo(spriteScaleX, spriteScaleY); bluemug.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(mugFlag == 1 && orangeFlag == 1){var orangemug = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transMug'); orangemug.tint =  0xF38932; orangemug.scale.setTo(spriteScaleX, spriteScaleY); orangemug.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(mugFlag == 1 && redFlag == 1){var redmug = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transMug'); redmug.tint =  0xE32424; redmug.scale.setTo(spriteScaleX, spriteScaleY); redmug.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(mugFlag == 1 && pinkFlag == 1){var pinkmug = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transMug'); pinkmug.tint =  0xCC3ACC; pinkmug.scale.setTo(spriteScaleX, spriteScaleY); pinkmug.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(mugFlag == 1 && cyanFlag == 1){var cyanmug = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transMug'); cyanmug.tint =  0x45C1C1; cyanmug.scale.setTo(spriteScaleX, spriteScaleY); cyanmug.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //mushroom 
                    if(mushroomFlag == 1 && greenFlag == 1 ){var greenmushroom = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transMushroom');greenmushroom.tint =  0x51C735; greenmushroom.scale.setTo(spriteScaleX, spriteScaleY); 
greenmushroom.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(mushroomFlag == 1 && blueFlag == 1){console.log("bluemushroom plotted");var bluemushroom = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transMushroom'); bluemushroom.tint =  0x456AC1; bluemushroom.scale.setTo(spriteScaleX, spriteScaleY); bluemushroom.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(mushroomFlag == 1 && orangeFlag == 1){var orangemushroom = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transMushroom'); orangemushroom.tint =  0xF38932; orangemushroom.scale.setTo(spriteScaleX, spriteScaleY); orangemushroom.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(mushroomFlag == 1 && redFlag == 1){var redmushroom = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transMushroom'); redmushroom.tint =  0xE32424; redmushroom.scale.setTo(spriteScaleX, spriteScaleY); redmushroom.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(mushroomFlag == 1 && pinkFlag == 1){var pinkmushroom = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transMushroom'); pinkmushroom.tint =  0xCC3ACC; pinkmushroom.scale.setTo(spriteScaleX, spriteScaleY); pinkmushroom.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(mushroomFlag == 1 && cyanFlag == 1){var cyanmushroom = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transMushroom'); cyanmushroom.tint =  0x45C1C1; cyanmushroom.scale.setTo(spriteScaleX, spriteScaleY); cyanmushroom.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
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
            
            game.world.bringToTop(mLetter);
            
            game.world.bringToTop(blue);
            game.world.bringToTop(green);
            game.world.bringToTop(red);
            game.world.bringToTop(cyan);
            game.world.bringToTop(orange);
            game.world.bringToTop(pink);
            
            game.world.bringToTop(cloud1);
            game.world.bringToTop(cloud2);
            game.world.bringToTop(cloud3);
            
            game.world.bringToTop(magnet);
            game.world.bringToTop(mango);
            game.world.bringToTop(map);
            game.world.bringToTop(mask);
            game.world.bringToTop(mobile);
            game.world.bringToTop(monkey);
            game.world.bringToTop(motorcycle);
            game.world.bringToTop(mountain);
            game.world.bringToTop(mug);
            game.world.bringToTop(mushroom);
            
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
            
            
            
            if(magnetFlag == 1){magnet.angle += 2;}
            if(mangoFlag == 1){mango.angle += 2;}
            if(mapFlag == 1){map.angle += 2;}
            if(maskFlag == 1){mask.angle += 2;}
            if(mobileFlag == 1){mobile.angle += 2;}
            if(mountainFlag == 1){monkey.angle += 2;}
            if(motorcycleFlag == 1){motorcycle.angle += 2;}
            if(monkeyFlag == 1){mountain.angle += 2;}
            if(mugFlag == 1){mug.angle += 2;}
            if(mushroomFlag == 1){mushroom.angle += 2;}
            
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
            
            if(mObjectClicked == 10){
            
                askForLevelN = 1;
                game.nButton = game.add.sprite(1170, 730, 'nButton');             
                game.nButton.scale.setTo(1, 1); 
                game.nButton.anchor.setTo(spriteAnchorX, spriteAnchorY);
                
            }
            
        if(askForLevelN == 1){
            
            game.world.bringToTop(game.nButton);
            game.nButton.inputEnabled = true;
            game.nButton.events.onInputDown.add(onDownN, this);
            function onDownN() {
            
                //start next level
                
                this.setMGlobalVaribalesToZero();
                game.state.start('N');
                
            }
        }
           
        },
        
        resetMSpriteFlag: function(){
            
            magnetFlag = 0;mangoFlag = 0;mapFlag = 0;mountainFlag = 0;maskFlag = 0;
            mobileFlag = 0;motorcycleFlag = 0;monkeyFlag = 0;mugFlag = 0;mushroomFlag = 0;
            camelFlag = 0;candleFlag = 0;carFlag = 0;catFlag = 0;cheeseFlag = 0;cherryFlag = 0;
            clockFlag = 0;cowFlag = 0;crabFlag = 0;crownFlag = 0;

            magnet.angle = 0;mango.angle = 0;map.angle = 0;monkey.angle = 0;mask.angle = 0;
            mobile.angle = 0;motorcycle.angle = 0;mountain.angle = 0;mug.angle = 0;mushroom.angle = 0;
            camel.angle = 0;candle.angle = 0;car.angle = 0;cat.angle = 0;cheese.angle = 0;
            cherry.angle = 0;crown.angle = 0;clock.angle = 0;cow.angle = 0;crab.angle = 0;
           
        },
       
        setColorMFlagToZero: function(){
            
            bubbleSound.play(); blueFlag = 0;greenFlag = 0; redFlag = 0; cyanFlag = 0; pinkFlag = 0; orangeFlag = 0;
        },
        
        setMGlobalVaribalesToZero: function(){
            
            
            magnetFlag = 0;mangoFlag = 0;mapFlag = 0;mountainFlag = 0;maskFlag = 0;
            mobileFlag = 0;motorcycleFlag = 0;monkeyFlag = 0;mugFlag = 0;mushroomFlag = 0;
            camelFlag = 0;candleFlag = 0;carFlag = 0;catFlag = 0;cheeseFlag = 0;cherryFlag = 0;
            clockFlag = 0;cowFlag = 0;crabFlag = 0;crownFlag = 0;



            greenFlag = 0;blueFlag = 0;orangeFlag = 0;redFlag = 0;pinkFlag = 0;cyanFlag = 0;
        }
        
        
    };