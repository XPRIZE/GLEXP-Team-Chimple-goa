        
    var fObjectClicked = 0;
    var askForLevelG = 0;
    
    
    var fanFlag = 0;
    var featherFlag = 0;
    var fireFlag = 0;            
    var fishFlag = 0;
    var flowerFlag = 0;
    var fluteFlag = 0;
    var forkFlag = 0;
    var foxFlag = 0;
    var frockFlag = 0;
    var frogFlag = 0;
    
    
    var F = {

        preload: function () {

            //setting default path for assets to be used in game
            this.load.path = './assets/F/';
            
            
            
            this.load.image("transFan", "transFan.png");
            this.load.image("transFeather", "transFeather.png");
            this.load.image("transFire", "transFire.png");
            this.load.image("transFish", "transFish.png");
            this.load.image("transFlower", "transFlower.png");
            this.load.image("transFlute", "transFlute.png");
            this.load.image("transFork", "transFork.png");
            this.load.image("transFox", "transFox.png");
            this.load.image("transFrock", "transFrock.png");
            this.load.image("transFrog", "transFrog.png");
            
            this.load.image("fan", "fan.png");
            this.load.image("feather", "feather.png");
            this.load.image("fire", "fire.png");
            this.load.image("fish", "fish.png");
            this.load.image("flower", "flower.png");
            this.load.image("flute", "flute.png");
            this.load.image("fork", "fork.png");
            this.load.image("fox", "fox.png");
            this.load.image("frock", "frock.png");
            this.load.image("frog", "frog.png");
            
            
            //loading assets for the level  F
            
            //loading shades
            this.load.image("blue", "blue.png");
            this.load.image("cyan", "cyan.png");
            this.load.image("green", "green.png");
            this.load.image("orange", "orange.png");
            this.load.image("pink", "pink.png");
            this.load.image("red", "red.png");
    
            this.load.image("bg", "bg.png");
            this.load.image("fLetter", "fLetter.png");
            this.load.image("gButton", "gButton.png");
            
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
                
            
            
            
            //Main letter F
            fLetter = game.add.sprite(gameMinWidth, gameMinHeight, 'fLetter');
            fLetter.inputEnabled = true;
            fLetter.events.onInputDown.add(this.onDownfLetter, this);
            
            
            
            //Objects starting from F
                    
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
            
            
            
            
            fan = game.add.sprite(objectsPositions[0].x, objectsPositions[0].y, 'fan');
            fan.anchor.setTo(spriteAnchorX, spriteAnchorY);
            fan.scale.setTo(spriteScaleX, spriteScaleY);
            fan.inputEnabled = true;
            fan.events.onInputDown.add(onDownfan, this);
            function onDownfan() {this.resetFSpriteFlag(); fanFlag = 1;fObjectClicked++;}

            
            
            
            feather = game.add.sprite(objectsPositions[10].x, objectsPositions[10].y, 'feather');
            feather.anchor.setTo(spriteAnchorX, spriteAnchorY);
            feather.scale.setTo(spriteScaleX, spriteScaleY);
            feather.inputEnabled = true;
            feather.events.onInputDown.add(onDownfeather, this);
            function onDownfeather() {this.resetFSpriteFlag(); featherFlag = 1;fObjectClicked++;}

            
            
            
            fire = game.add.sprite(objectsPositions[1].x, objectsPositions[1].y, 'fire');
            fire.anchor.setTo(spriteAnchorX, spriteAnchorY);
            fire.scale.setTo(spriteScaleX, spriteScaleY);
            fire.inputEnabled = true;
            fire.events.onInputDown.add(onDownfire, this);
            function onDownfire() {this.resetFSpriteFlag(); fireFlag = 1;fObjectClicked++;}
            
            
            
            
            fish = game.add.sprite(objectsPositions[11].x, objectsPositions[11].y, 'fish');
            fish.anchor.setTo(spriteAnchorX, spriteAnchorY);
            fish.scale.setTo(spriteScaleX, spriteScaleY);
            fish.inputEnabled = true;
            fish.events.onInputDown.add(onDownfish, this);
            function onDownfish() {this.resetFSpriteFlag(); fishFlag = 1;fObjectClicked++;}
            
            
            
            flower = game.add.sprite(objectsPositions[2].x, objectsPositions[2].y, 'flower');
            flower.anchor.setTo(spriteAnchorX, spriteAnchorY);
            flower.scale.setTo(spriteScaleX, spriteScaleY);
            flower.inputEnabled = true;
            flower.events.onInputDown.add(onDownflower, this);
            function onDownflower() {this.resetFSpriteFlag(); flowerFlag = 1;fObjectClicked++;}
            
            flute = game.add.sprite(objectsPositions[12].x, objectsPositions[12].y, 'flute');
            flute.anchor.setTo(spriteAnchorX, spriteAnchorY);
            flute.scale.setTo(spriteScaleX, spriteScaleY);
            flute.inputEnabled = true;
            flute.events.onInputDown.add(onDownflute, this);
            function onDownflute() {this.resetFSpriteFlag(); foxFlag = 1;fObjectClicked++;}

            
            fork = game.add.sprite(objectsPositions[3].x, objectsPositions[3].y, 'fork');
            fork.anchor.setTo(spriteAnchorX, spriteAnchorY);
            fork.scale.setTo(spriteScaleX, spriteScaleY);
            fork.inputEnabled = true;  
            fork.events.onInputDown.add(onDownfork, this);
            function onDownfork() {this.resetFSpriteFlag(); forkFlag = 1;fObjectClicked++;}
            
            
            fox = game.add.sprite(objectsPositions[13].x, objectsPositions[13].y, 'fox');
            fox.anchor.setTo(spriteAnchorX, spriteAnchorY);
            fox.scale.setTo(spriteScaleX, spriteScaleY);
            fox.inputEnabled = true;
            fox.events.onInputDown.add(onDownfox, this);
            function onDownfox() {this.resetFSpriteFlag(); fluteFlag = 1;fObjectClicked++;}
            
            
            frock = game.add.sprite(objectsPositions[4].x, objectsPositions[4].y, 'frock');
            frock.anchor.setTo(spriteAnchorX, spriteAnchorY);
            frock.scale.setTo(spriteScaleX, spriteScaleY);
            frock.inputEnabled = true;
            frock.events.onInputDown.add(onDownfrock, this);
            function onDownfrock() {this.resetFSpriteFlag(); frockFlag = 1;fObjectClicked++;}
            
            
            frog = game.add.sprite(objectsPositions[14].x, objectsPositions[14].y, 'frog');
            frog.anchor.setTo(spriteAnchorX, spriteAnchorY);
            frog.scale.setTo(spriteScaleX, spriteScaleY);
            frog.inputEnabled = true;
            frog.events.onInputDown.add(onDownfrog, this);
            function onDownfrog() {this.resetFSpriteFlag(); frogFlag = 1;fObjectClicked++;}
            
            
            
            //Adding other sprites        
            
            camel = game.add.sprite(objectsPositions[5].x, objectsPositions[5].y, 'camel');
            camel.anchor.setTo(spriteAnchorX, spriteAnchorY);
            camel.scale.setTo(spriteScaleX, spriteScaleY);
            camel.inputEnabled = true;
            camel.events.onInputDown.add(onDownCamel, this);
            function onDownCamel() {this.resetFSpriteFlag(); camelFlag = 1;}
            
            
            
            
            candle = game.add.sprite(objectsPositions[15].x, objectsPositions[15].y, 'candle');
            candle.anchor.setTo(spriteAnchorX, spriteAnchorY);
            candle.scale.setTo(spriteScaleX, spriteScaleY);
            candle.inputEnabled = true;
            candle.events.onInputDown.add(onDownCandle, this);
            function onDownCandle() {this.resetFSpriteFlag(); candleFlag = 1; }
            
            
            car = game.add.sprite(objectsPositions[6].x, objectsPositions[6].y, 'car');
            car.anchor.setTo(spriteAnchorX, spriteAnchorY);
            car.scale.setTo(spriteScaleX, spriteScaleY);
            car.inputEnabled = true;
            car.events.onInputDown.add(onDownCar, this);
            function onDownCar() {this.resetFSpriteFlag(); carFlag = 1;}
            
            cat = game.add.sprite(objectsPositions[16].x, objectsPositions[16].y, 'cat');
            cat.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cat.scale.setTo(spriteScaleX, spriteScaleY);
            cat.inputEnabled = true;
            cat.events.onInputDown.add(onDownCat, this);
            function onDownCat() {this.resetFSpriteFlag(); catFlag = 1;}
            
            
            cheese = game.add.sprite(objectsPositions[7].x, objectsPositions[7].y, 'cheese');
            cheese.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cheese.scale.setTo(spriteScaleX, spriteScaleY);
            cheese.inputEnabled = true;
            cheese.events.onInputDown.add(onDownCheese, this);
            function onDownCheese() {this.resetFSpriteFlag(); cheeseFlag = 1;}
            
            
            cherry = game.add.sprite(objectsPositions[17].x, objectsPositions[17].y, 'cherry');
            cherry.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cherry.scale.setTo(spriteScaleX, spriteScaleY);
            cherry.inputEnabled = true;
            cherry.events.onInputDown.add(onDownCherry, this);
            function onDownCherry() {this.resetFSpriteFlag(); cherryFlag = 1;}
            
            
            clock = game.add.sprite(objectsPositions[8].x, objectsPositions[8].y, 'clock');
            clock.anchor.setTo(spriteAnchorX, spriteAnchorY);
            clock.scale.setTo(spriteScaleX, spriteScaleY);
            clock.inputEnabled = true;
            clock.events.onInputDown.add(onDownClock, this);
            function onDownClock() {this.resetFSpriteFlag(); clockFlag = 1;}
            
            
            
            cow = game.add.sprite(objectsPositions[18].x, objectsPositions[18].y, 'cow');
            cow.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cow.scale.setTo(spriteScaleX, spriteScaleY);
            cow.inputEnabled = true;
            cow.events.onInputDown.add(onDownCow, this);
            function onDownCow() {this.resetFSpriteFlag(); cowFlag = 1;}
            
            
            crab = game.add.sprite(objectsPositions[9].x, objectsPositions[9].y, 'crab');
            crab.anchor.setTo(spriteAnchorX, spriteAnchorY);
            crab.scale.setTo(spriteScaleX, spriteScaleY);
            crab.inputEnabled = true;
            crab.events.onInputDown.add(onDownCrab, this);
            function onDownCrab() {this.resetFSpriteFlag(); crabFlag = 1;}
            
            
            crown = game.add.sprite(objectsPositions[19].x, objectsPositions[19].y, 'crown');
            crown.anchor.setTo(spriteAnchorX, spriteAnchorY);
            crown.scale.setTo(spriteScaleX, spriteScaleY);
            crown.inputEnabled = true;
            crown.events.onInputDown.add(onDownCrown, this);
            function onDownCrown() {this.resetFSpriteFlag(); crownFlag = 1;}
            
            
            
            //Color shades
            blue = game.add.sprite(objectsPositions[20].x, objectsPositions[20].y, 'blue');
            blue.anchor.setTo(spriteAnchorX, spriteAnchorY);
            blue.scale.setTo(shadeScaleX, shadeScaleY);
            blue.inputEnabled = true;
            blue.tint = 0x456AC1; 
            blue.events.onInputDown.add(onDownBlue, this);
            function onDownBlue() {this.setColorFFlagToZero(); blueFlag = 1;}
           
            
            cyan = game.add.sprite(objectsPositions[21].x, objectsPositions[21].y, 'cyan');
            cyan.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cyan.scale.setTo(shadeScaleX, shadeScaleY);
            cyan.inputEnabled = true;
            cyan.tint = 0x45C1C1; 
            cyan.events.onInputDown.add(onDownCyan, this);
            function onDownCyan() {this.setColorFFlagToZero(); cyanFlag = 1;}
            
            
            
            green = game.add.sprite(objectsPositions[22].x, objectsPositions[22].y, 'green');
            green.anchor.setTo(spriteAnchorX, spriteAnchorY);
            green.scale.setTo(shadeScaleX, shadeScaleY);
            green.inputEnabled = true;
            green.tint = 0x51C735;
            green.events.onInputDown.add(onDownGreen, this);
            function onDownGreen() {this.setColorFFlagToZero(); greenFlag = 1;}
            
            
            orange = game.add.sprite(objectsPositions[23].x, objectsPositions[23].y, 'orange');
            orange.anchor.setTo(spriteAnchorX, spriteAnchorY);
            orange.scale.setTo(shadeScaleX, shadeScaleY);
            orange.inputEnabled = true;
            orange.tint = 0xF38932;
            orange.events.onInputDown.add(onDownOrange, this);
            function onDownOrange() {this.setColorFFlagToZero(); orangeFlag = 1;}
           
            
            pink = game.add.sprite(objectsPositions[24].x, objectsPositions[24].y, 'pink');
            pink.anchor.setTo(spriteAnchorX, spriteAnchorY);
            pink.scale.setTo(shadeScaleX, shadeScaleY);
            pink.inputEnabled = true;
            pink.tint = 0xCC3ACC;
            pink.events.onInputDown.add(onDownPink, this);
            function onDownPink() {this.setColorFFlagToZero(); pinkFlag = 1;}
            
            
            red = game.add.sprite(objectsPositions[25].x, objectsPositions[25].y, 'red');
            red.anchor.setTo(spriteAnchorX, spriteAnchorY);
            red.scale.setTo(shadeScaleX, shadeScaleY);
            red.inputEnabled = true;
            red.tint = 0xE32424;
            red.events.onInputDown.add(onDownRed, this);
            function onDownRed() {this.setColorFFlagToZero(); redFlag = 1;}
                
        },
        
        onDownfLetter: function() {
                
            //fan
                    if(fanFlag == 1 && greenFlag == 1 ){var greenfan = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transFan');greenfan.tint =  0x51C735; greenfan.scale.setTo(spriteScaleX, spriteScaleY); 
greenfan.anchor.setTo(0.6, 0.6);stickSound.play();}                    
                    
                    if(fanFlag == 1 && blueFlag == 1){var bluefan = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transFan'); bluefan.tint =  0x456AC1; bluefan.scale.setTo(spriteScaleX, spriteScaleY); bluefan.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(fanFlag == 1 && orangeFlag == 1){var orangefan = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transFan'); orangefan.tint =  0xF38932; orangefan.scale.setTo(spriteScaleX, spriteScaleY); orangefan.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(fanFlag == 1 && redFlag == 1){var redfan = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transFan'); redfan.tint =  0xE32424; redfan.scale.setTo(spriteScaleX, spriteScaleY); redfan.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(fanFlag == 1 && pinkFlag == 1){var pinkfan = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transFan'); pinkfan.tint =  0xCC3ACC; pinkfan.scale.setTo(spriteScaleX, spriteScaleY); pinkfan.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(fanFlag == 1 && cyanFlag == 1){var cyanfan = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transFan'); cyanfan.tint =  0x45C1C1; cyanfan.scale.setTo(spriteScaleX, spriteScaleY); cyanfan.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //feather    
                    if(featherFlag == 1 && greenFlag == 1 ){var greenfeather = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transFeather');greenfeather.tint =  0x51C735; greenfeather.scale.setTo(spriteScaleX, spriteScaleY); 
greenfeather.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(featherFlag == 1 && blueFlag == 1){var bluefeather = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transFeather'); bluefeather.tint =  0x456AC1; bluefeather.scale.setTo(spriteScaleX, spriteScaleY); bluefeather.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(featherFlag == 1 && orangeFlag == 1){var orangefeather = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transFeather'); orangefeather.tint =  0xF38932; orangefeather.scale.setTo(spriteScaleX, spriteScaleY); orangefeather.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(featherFlag == 1 && redFlag == 1){var redfeather = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transFeather'); redfeather.tint =  0xE32424; redfeather.scale.setTo(spriteScaleX, spriteScaleY); redfeather.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(featherFlag == 1 && pinkFlag == 1){var pinkfeather = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transFeather'); pinkfeather.tint =  0xCC3ACC; pinkfeather.scale.setTo(spriteScaleX, spriteScaleY); pinkfeather.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(featherFlag == 1 && cyanFlag == 1){var cyanfeather = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transFeather'); cyanfeather.tint =  0x45C1C1; cyanfeather.scale.setTo(spriteScaleX, spriteScaleY); cyanfeather.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //fire    
                    if(fireFlag == 1 && greenFlag == 1 ){var greenfire = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transFire');greenfire.tint =  0x51C735; greenfire.scale.setTo(spriteScaleX, spriteScaleY); 
greenfire.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(fireFlag == 1 && blueFlag == 1){var bluefire = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transFire'); bluefire.tint =  0x456AC1; bluefire.scale.setTo(spriteScaleX, spriteScaleY); bluefire.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(fireFlag == 1 && orangeFlag == 1){var orangefire = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transFire'); orangefire.tint =  0xF38932; orangefire.scale.setTo(spriteScaleX, spriteScaleY); orangefire.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(fireFlag == 1 && redFlag == 1){var redfire = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transFire'); redfire.tint =  0xE32424; redfire.scale.setTo(spriteScaleX, spriteScaleY); redfire.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(fireFlag == 1 && pinkFlag == 1){var pinkfire = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transFire'); pinkfire.tint =  0xCC3ACC; pinkfire.scale.setTo(spriteScaleX, spriteScaleY); pinkfire.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(fireFlag == 1 && cyanFlag == 1){var cyanfire = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transFire'); cyanfire.tint =  0x45C1C1; cyanfire.scale.setTo(spriteScaleX, spriteScaleY); cyanfire.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //fish
                    if(fishFlag == 1 && greenFlag == 1 ){var greenfish = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transFish');greenfish.tint =  0x51C735; greenfish.scale.setTo(spriteScaleX, spriteScaleY); 
greenfish.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(fishFlag == 1 && blueFlag == 1){console.log("bluefish plotted");var bluefish = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transFish'); bluefish.tint =  0x456AC1; bluefish.scale.setTo(spriteScaleX, spriteScaleY); bluefish.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(fishFlag == 1 && orangeFlag == 1){var orangefish = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transFish'); orangefish.tint =  0xF38932; orangefish.scale.setTo(spriteScaleX, spriteScaleY); orangefish.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(fishFlag == 1 && redFlag == 1){var redfish = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transFish'); redfish.tint =  0xE32424; redfish.scale.setTo(spriteScaleX, spriteScaleY); redfish.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(fishFlag == 1 && pinkFlag == 1){var pinkfish = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transFish'); pinkfish.tint =  0xCC3ACC; pinkfish.scale.setTo(spriteScaleX, spriteScaleY); pinkfish.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(fishFlag == 1 && cyanFlag == 1){var cyanfish = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transFish'); cyanfish.tint =  0x45C1C1; cyanfish.scale.setTo(spriteScaleX, spriteScaleY); cyanfish.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //flower    
                    if(flowerFlag == 1 && greenFlag == 1 ){var greenflower = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transFlower');greenflower.tint =  0x51C735; greenflower.scale.setTo(spriteScaleX, spriteScaleY); 
greenflower.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(flowerFlag == 1 && blueFlag == 1){console.log("blueflower plotted");var blueflower = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transFlower'); blueflower.tint =  0x456AC1; blueflower.scale.setTo(spriteScaleX, spriteScaleY); blueflower.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(flowerFlag == 1 && orangeFlag == 1){var orangeflower = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transFlower'); orangeflower.tint =  0xF38932; orangeflower.scale.setTo(spriteScaleX, spriteScaleY); orangeflower.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(flowerFlag == 1 && redFlag == 1){var redflower = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transFlower'); redflower.tint =  0xE32424; redflower.scale.setTo(spriteScaleX, spriteScaleY); redflower.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(flowerFlag == 1 && pinkFlag == 1){var pinkflower = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transFlower'); pinkflower.tint =  0xCC3ACC; pinkflower.scale.setTo(spriteScaleX, spriteScaleY); pinkflower.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(flowerFlag == 1 && cyanFlag == 1){var cyanflower = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transFlower'); cyanflower.tint =  0x45C1C1; cyanflower.scale.setTo(spriteScaleX, spriteScaleY); cyanflower.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //flute   
                    if(foxFlag == 1 && greenFlag == 1 ){var greenflute = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transFlute');greenflute.tint =  0x51C735; greenflute.scale.setTo(spriteScaleX, spriteScaleY); 
greenflute.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(foxFlag == 1 && blueFlag == 1){console.log("blueflute plotted");var blueflute = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transFlute'); blueflute.tint =  0x456AC1; blueflute.scale.setTo(spriteScaleX, spriteScaleY); blueflute.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(foxFlag == 1 && orangeFlag == 1){var orangeflute = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transFlute'); orangeflute.tint =  0xF38932; orangeflute.scale.setTo(spriteScaleX, spriteScaleY); orangeflute.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(foxFlag == 1 && redFlag == 1){var redflute = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transFlute'); redflute.tint =  0xE32424; redflute.scale.setTo(spriteScaleX, spriteScaleY); redflute.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(foxFlag == 1 && pinkFlag == 1){var pinkflute = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transFlute'); pinkflute.tint =  0xCC3ACC; pinkflute.scale.setTo(spriteScaleX, spriteScaleY); pinkflute.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(foxFlag == 1 && cyanFlag == 1){var cyanflute = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transFlute'); cyanflute.tint =  0x45C1C1; cyanflute.scale.setTo(spriteScaleX, spriteScaleY); cyanflute.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //fork    
                    if(forkFlag == 1 && greenFlag == 1 ){var greenfork = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transFork');greenfork.tint =  0x51C735; greenfork.scale.setTo(spriteScaleX, spriteScaleY); 
greenfork.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(forkFlag == 1 && blueFlag == 1){console.log("bluefork plotted");var bluefork = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transFork'); bluefork.tint =  0x456AC1; bluefork.scale.setTo(spriteScaleX, spriteScaleY); bluefork.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(forkFlag == 1 && orangeFlag == 1){var orangefork = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transFork'); orangefork.tint =  0xF38932; orangefork.scale.setTo(spriteScaleX, spriteScaleY); orangefork.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(forkFlag == 1 && redFlag == 1){var redfork = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transFork'); redfork.tint =  0xE32424; redfork.scale.setTo(spriteScaleX, spriteScaleY); redfork.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(forkFlag == 1 && pinkFlag == 1){var pinkfork = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transFork'); pinkfork.tint =  0xCC3ACC; pinkfork.scale.setTo(spriteScaleX, spriteScaleY); pinkfork.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(forkFlag == 1 && cyanFlag == 1){var cyanfork = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transFork'); cyanfork.tint =  0x45C1C1; cyanfork.scale.setTo(spriteScaleX, spriteScaleY); cyanfork.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //fox    
                    if(fluteFlag == 1 && greenFlag == 1 ){var greenfox = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transFox');greenfox.tint =  0x51C735; greenfox.scale.setTo(spriteScaleX, spriteScaleY); 
greenfox.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(fluteFlag == 1 && blueFlag == 1){console.log("bluefox plotted");var bluefox = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transFox'); bluefox.tint =  0x456AC1; bluefox.scale.setTo(spriteScaleX, spriteScaleY); bluefox.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(fluteFlag == 1 && orangeFlag == 1){var orangefox = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transFox'); orangefox.tint =  0xF38932; orangefox.scale.setTo(spriteScaleX, spriteScaleY); orangefox.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(fluteFlag == 1 && redFlag == 1){var redfox = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transFox'); redfox.tint =  0xE32424; redfox.scale.setTo(spriteScaleX, spriteScaleY); redfox.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(fluteFlag == 1 && pinkFlag == 1){var pinkfox = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transFox'); pinkfox.tint =  0xCC3ACC; pinkfox.scale.setTo(spriteScaleX, spriteScaleY); pinkfox.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(fluteFlag == 1 && cyanFlag == 1){var cyanfox = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transFox'); cyanfox.tint =  0x45C1C1; cyanfox.scale.setTo(spriteScaleX, spriteScaleY); cyanfox.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //frock    
                    if(frockFlag == 1 && greenFlag == 1 ){var greenfrock = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transFrock');greenfrock.tint =  0x51C735; greenfrock.scale.setTo(spriteScaleX, spriteScaleY); 
greenfrock.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(frockFlag == 1 && blueFlag == 1){console.log("bluefrock plotted");var bluefrock = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transFrock'); bluefrock.tint =  0x456AC1; bluefrock.scale.setTo(spriteScaleX, spriteScaleY); bluefrock.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(frockFlag == 1 && orangeFlag == 1){var orangefrock = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transFrock'); orangefrock.tint =  0xF38932; orangefrock.scale.setTo(spriteScaleX, spriteScaleY); orangefrock.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(frockFlag == 1 && redFlag == 1){var redfrock = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transFrock'); redfrock.tint =  0xE32424; redfrock.scale.setTo(spriteScaleX, spriteScaleY); redfrock.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(frockFlag == 1 && pinkFlag == 1){var pinkfrock = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transFrock'); pinkfrock.tint =  0xCC3ACC; pinkfrock.scale.setTo(spriteScaleX, spriteScaleY); pinkfrock.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(frockFlag == 1 && cyanFlag == 1){var cyanfrock = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transFrock'); cyanfrock.tint =  0x45C1C1; cyanfrock.scale.setTo(spriteScaleX, spriteScaleY); cyanfrock.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //frog 
                    if(frogFlag == 1 && greenFlag == 1 ){var greenfrog = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transFrog');greenfrog.tint =  0x51C735; greenfrog.scale.setTo(spriteScaleX, spriteScaleY); 
greenfrog.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(frogFlag == 1 && blueFlag == 1){console.log("bluefrog plotted");var bluefrog = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transFrog'); bluefrog.tint =  0x456AC1; bluefrog.scale.setTo(spriteScaleX, spriteScaleY); bluefrog.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(frogFlag == 1 && orangeFlag == 1){var orangefrog = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transFrog'); orangefrog.tint =  0xF38932; orangefrog.scale.setTo(spriteScaleX, spriteScaleY); orangefrog.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(frogFlag == 1 && redFlag == 1){var redfrog = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transFrog'); redfrog.tint =  0xE32424; redfrog.scale.setTo(spriteScaleX, spriteScaleY); redfrog.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(frogFlag == 1 && pinkFlag == 1){var pinkfrog = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transFrog'); pinkfrog.tint =  0xCC3ACC; pinkfrog.scale.setTo(spriteScaleX, spriteScaleY); pinkfrog.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(frogFlag == 1 && cyanFlag == 1){var cyanfrog = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transFrog'); cyanfrog.tint =  0x45C1C1; cyanfrog.scale.setTo(spriteScaleX, spriteScaleY); cyanfrog.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
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
            
            game.world.bringToTop(fLetter);
            
            game.world.bringToTop(blue);
            game.world.bringToTop(green);
            game.world.bringToTop(red);
            game.world.bringToTop(cyan);
            game.world.bringToTop(orange);
            game.world.bringToTop(pink);
            
            game.world.bringToTop(cloud1);
            game.world.bringToTop(cloud2);
            game.world.bringToTop(cloud3);
            
            game.world.bringToTop(fan);
            game.world.bringToTop(feather);
            game.world.bringToTop(fire);
            game.world.bringToTop(fish);
            game.world.bringToTop(flower);
            game.world.bringToTop(flute);
            game.world.bringToTop(fork);
            game.world.bringToTop(fox);
            game.world.bringToTop(frock);
            game.world.bringToTop(frog);
            
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
            
            
            
            if(fanFlag == 1){fan.angle += 2;}
            if(featherFlag == 1){feather.angle += 2;}
            if(fireFlag == 1){fire.angle += 2;}
            if(fishFlag == 1){fish.angle += 2;}
            if(flowerFlag == 1){flower.angle += 2;}
            if(foxFlag == 1){flute.angle += 2;}
            if(forkFlag == 1){fork.angle += 2;}
            if(fluteFlag == 1){fox.angle += 2;}
            if(frockFlag == 1){frock.angle += 2;}
            if(frogFlag == 1){frog.angle += 2;}
            
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
            
            if(fObjectClicked == 10){
            
                askForLevelG = 1;
                game.gButton = game.add.sprite(1170, 730, 'gButton');             
                game.gButton.scale.setTo(1, 1); 
                game.gButton.anchor.setTo(spriteAnchorX, spriteAnchorY);
                
            }
            
        if(askForLevelG == 1){
            
            game.world.bringToTop(game.gButton);
            game.gButton.inputEnabled = true;
            game.gButton.events.onInputDown.add(onDownF, this);
            function onDownF() {
            
                //start next level
                
                this.setFGlobalVaribalesToZero();
                game.state.start('G');
                
            }
        }
           
        },
        
        resetFSpriteFlag: function(){
            
            fanFlag = 0;featherFlag = 0;fireFlag = 0;foxFlag = 0;fishFlag = 0;
            flowerFlag = 0;forkFlag = 0;fluteFlag = 0;frockFlag = 0;frogFlag = 0;
            camelFlag = 0;candleFlag = 0;carFlag = 0;catFlag = 0;cheeseFlag = 0;cherryFlag = 0;
            clockFlag = 0;cowFlag = 0;crabFlag = 0;crownFlag = 0;

            fan.angle = 0;feather.angle = 0;fire.angle = 0;flute.angle = 0;fish.angle = 0;
            flower.angle = 0;fork.angle = 0;fox.angle = 0;frock.angle = 0;frog.angle = 0;
            camel.angle = 0;candle.angle = 0;car.angle = 0;cat.angle = 0;cheese.angle = 0;
            cherry.angle = 0;crown.angle = 0;clock.angle = 0;cow.angle = 0;crab.angle = 0;
           
        },
       
        setColorFFlagToZero: function(){
            
            bubbleSound.play(); blueFlag = 0;greenFlag = 0; redFlag = 0; cyanFlag = 0; pinkFlag = 0; orangeFlag = 0;
        },
        
        setFGlobalVaribalesToZero: function(){
            
            
            fanFlag = 0;featherFlag = 0;fireFlag = 0;foxFlag = 0;fishFlag = 0;
            flowerFlag = 0;forkFlag = 0;fluteFlag = 0;frockFlag = 0;frogFlag = 0;
            camelFlag = 0;candleFlag = 0;carFlag = 0;catFlag = 0;cheeseFlag = 0;cherryFlag = 0;
            clockFlag = 0;cowFlag = 0;crabFlag = 0;crownFlag = 0;



            greenFlag = 0;blueFlag = 0;orangeFlag = 0;redFlag = 0;pinkFlag = 0;cyanFlag = 0;
        }
        
        
    };