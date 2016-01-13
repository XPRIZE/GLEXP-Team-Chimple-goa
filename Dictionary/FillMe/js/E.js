        
    var eObjectClicked = 0;
    var askForLevelF = 0;
    
    
    var eagleFlag = 0;
    var earFlag = 0;
    var earphoneFlag = 0;            
    var earthFlag = 0;
    var eggFlag = 0;
    var elephantFlag = 0;
    var elderberryFlag = 0;
    var eggplantFlag = 0;
    var engineFlag = 0;
    var eyeFlag = 0;
    
    
    var E = {

        preload: function () {

            //setting default path for assets to be used in game
            this.load.path = './assets/E/';
            
            
            
            this.load.image("transEagle", "transEagle.png");
            this.load.image("transEar", "transEar.png");
            this.load.image("transEarphone", "transEarphone.png");
            this.load.image("transEarth", "transEarth.png");
            this.load.image("transEgg", "transEgg.png");
            this.load.image("transEggplant", "transEggplant.png");
            this.load.image("transElderberry", "transElderberry.png");
            this.load.image("transElephant", "transElephant.png");
            this.load.image("transEngine", "transEngine.png");
            this.load.image("transEye", "transEye.png");
            
            this.load.image("eagle", "eagle.png");
            this.load.image("ear", "ear.png");
            this.load.image("earphone", "earphone.png");
            this.load.image("earth", "earth.png");
            this.load.image("egg", "egg.png");
            this.load.image("eggplant", "eggplant.png");
            this.load.image("elderberry", "elderberry.png");
            this.load.image("elephant", "elephant.png");
            this.load.image("engine", "engine.png");
            this.load.image("eye", "eye.png");
            
            
            //loading assets for the level  E
            
            //loading shades
            this.load.image("blue", "blue.png");
            this.load.image("cyan", "cyan.png");
            this.load.image("green", "green.png");
            this.load.image("orange", "orange.png");
            this.load.image("pink", "pink.png");
            this.load.image("red", "red.png");
    
            this.load.image("bg", "bg.png");
            this.load.image("eLetter", "eLetter.png");
            this.load.image("fButton", "fButton.png");
            
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
                
            
            
            
            //Main letter E
            eLetter = game.add.sprite(gameMinWidth, gameMinHeight, 'eLetter');
            eLetter.inputEnabled = true;
            eLetter.events.onInputDown.add(this.onDowneLetter, this);
            
            
            
            //Objects starting from E
                    
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
            
            
            
            
            eagle = game.add.sprite(objectsPositions[0].x, objectsPositions[0].y, 'eagle');
            eagle.anchor.setTo(spriteAnchorX, spriteAnchorY);
            eagle.scale.setTo(spriteScaleX, spriteScaleY);
            eagle.inputEnabled = true;
            eagle.events.onInputDown.add(onDowneagle, this);
            function onDowneagle() {this.resetESpriteFlag(); eagleFlag = 1;eObjectClicked++;}

            
            
            
            ear = game.add.sprite(objectsPositions[10].x, objectsPositions[10].y, 'ear');
            ear.anchor.setTo(spriteAnchorX, spriteAnchorY);
            ear.scale.setTo(spriteScaleX, spriteScaleY);
            ear.inputEnabled = true;
            ear.events.onInputDown.add(onDownear, this);
            function onDownear() {this.resetESpriteFlag(); earFlag = 1;eObjectClicked++;}

            
            
            
            earphone = game.add.sprite(objectsPositions[1].x, objectsPositions[1].y, 'earphone');
            earphone.anchor.setTo(spriteAnchorX, spriteAnchorY);
            earphone.scale.setTo(spriteScaleX, spriteScaleY);
            earphone.inputEnabled = true;
            earphone.events.onInputDown.add(onDownearphone, this);
            function onDownearphone() {this.resetESpriteFlag(); earphoneFlag = 1;eObjectClicked++;}
            
            
            
            
            earth = game.add.sprite(objectsPositions[11].x, objectsPositions[11].y, 'earth');
            earth.anchor.setTo(spriteAnchorX, spriteAnchorY);
            earth.scale.setTo(spriteScaleX, spriteScaleY);
            earth.inputEnabled = true;
            earth.events.onInputDown.add(onDownearth, this);
            function onDownearth() {this.resetESpriteFlag(); earthFlag = 1;eObjectClicked++;}
            
            
            
            egg = game.add.sprite(objectsPositions[2].x, objectsPositions[2].y, 'egg');
            egg.anchor.setTo(spriteAnchorX, spriteAnchorY);
            egg.scale.setTo(spriteScaleX, spriteScaleY);
            egg.inputEnabled = true;
            egg.events.onInputDown.add(onDownegg, this);
            function onDownegg() {this.resetESpriteFlag(); eggFlag = 1;eObjectClicked++;}
            
            eggplant = game.add.sprite(objectsPositions[12].x, objectsPositions[12].y, 'eggplant');
            eggplant.anchor.setTo(spriteAnchorX, spriteAnchorY);
            eggplant.scale.setTo(spriteScaleX, spriteScaleY);
            eggplant.inputEnabled = true;
            eggplant.events.onInputDown.add(onDowneggplant, this);
            function onDowneggplant() {this.resetESpriteFlag(); eggplantFlag = 1;eObjectClicked++;}

            
            elderberry = game.add.sprite(objectsPositions[3].x, objectsPositions[3].y, 'elderberry');
            elderberry.anchor.setTo(spriteAnchorX, spriteAnchorY);
            elderberry.scale.setTo(spriteScaleX, spriteScaleY);
            elderberry.inputEnabled = true;  
            elderberry.events.onInputDown.add(onDownelderberry, this);
            function onDownelderberry() {this.resetESpriteFlag(); elderberryFlag = 1;eObjectClicked++;}
            
            
            elephant = game.add.sprite(objectsPositions[13].x, objectsPositions[13].y, 'elephant');
            elephant.anchor.setTo(spriteAnchorX, spriteAnchorY);
            elephant.scale.setTo(spriteScaleX, spriteScaleY);
            elephant.inputEnabled = true;
            elephant.events.onInputDown.add(onDownelephant, this);
            function onDownelephant() {this.resetESpriteFlag(); elephantFlag = 1;eObjectClicked++;}
            
            
            engine = game.add.sprite(objectsPositions[4].x, objectsPositions[4].y, 'engine');
            engine.anchor.setTo(spriteAnchorX, spriteAnchorY);
            engine.scale.setTo(spriteScaleX, spriteScaleY);
            engine.inputEnabled = true;
            engine.events.onInputDown.add(onDownengine, this);
            function onDownengine() {this.resetESpriteFlag(); engineFlag = 1;eObjectClicked++;}
            
            
            eye = game.add.sprite(objectsPositions[14].x, objectsPositions[14].y, 'eye');
            eye.anchor.setTo(spriteAnchorX, spriteAnchorY);
            eye.scale.setTo(spriteScaleX, spriteScaleY);
            eye.inputEnabled = true;
            eye.events.onInputDown.add(onDowneye, this);
            function onDowneye() {this.resetESpriteFlag(); eyeFlag = 1;eObjectClicked++;}
            
            
            
            //Adding other sprites        
            
            camel = game.add.sprite(objectsPositions[5].x, objectsPositions[5].y, 'camel');
            camel.anchor.setTo(spriteAnchorX, spriteAnchorY);
            camel.scale.setTo(spriteScaleX, spriteScaleY);
            camel.inputEnabled = true;
            camel.events.onInputDown.add(onDownCamel, this);
            function onDownCamel() {this.resetESpriteFlag(); camelFlag = 1;}
            
            
            
            
            candle = game.add.sprite(objectsPositions[15].x, objectsPositions[15].y, 'candle');
            candle.anchor.setTo(spriteAnchorX, spriteAnchorY);
            candle.scale.setTo(spriteScaleX, spriteScaleY);
            candle.inputEnabled = true;
            candle.events.onInputDown.add(onDownCandle, this);
            function onDownCandle() {this.resetESpriteFlag(); candleFlag = 1; }
            
            
            car = game.add.sprite(objectsPositions[6].x, objectsPositions[6].y, 'car');
            car.anchor.setTo(spriteAnchorX, spriteAnchorY);
            car.scale.setTo(spriteScaleX, spriteScaleY);
            car.inputEnabled = true;
            car.events.onInputDown.add(onDownCar, this);
            function onDownCar() {this.resetESpriteFlag(); carFlag = 1;}
            
            cat = game.add.sprite(objectsPositions[16].x, objectsPositions[16].y, 'cat');
            cat.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cat.scale.setTo(spriteScaleX, spriteScaleY);
            cat.inputEnabled = true;
            cat.events.onInputDown.add(onDownCat, this);
            function onDownCat() {this.resetESpriteFlag(); catFlag = 1;}
            
            
            cheese = game.add.sprite(objectsPositions[7].x, objectsPositions[7].y, 'cheese');
            cheese.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cheese.scale.setTo(spriteScaleX, spriteScaleY);
            cheese.inputEnabled = true;
            cheese.events.onInputDown.add(onDownCheese, this);
            function onDownCheese() {this.resetESpriteFlag(); cheeseFlag = 1;}
            
            
            cherry = game.add.sprite(objectsPositions[17].x, objectsPositions[17].y, 'cherry');
            cherry.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cherry.scale.setTo(spriteScaleX, spriteScaleY);
            cherry.inputEnabled = true;
            cherry.events.onInputDown.add(onDownCherry, this);
            function onDownCherry() {this.resetESpriteFlag(); cherryFlag = 1;}
            
            
            clock = game.add.sprite(objectsPositions[8].x, objectsPositions[8].y, 'clock');
            clock.anchor.setTo(spriteAnchorX, spriteAnchorY);
            clock.scale.setTo(spriteScaleX, spriteScaleY);
            clock.inputEnabled = true;
            clock.events.onInputDown.add(onDownClock, this);
            function onDownClock() {this.resetESpriteFlag(); clockFlag = 1;}
            
            
            
            cow = game.add.sprite(objectsPositions[18].x, objectsPositions[18].y, 'cow');
            cow.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cow.scale.setTo(spriteScaleX, spriteScaleY);
            cow.inputEnabled = true;
            cow.events.onInputDown.add(onDownCow, this);
            function onDownCow() {this.resetESpriteFlag(); cowFlag = 1;}
            
            
            crab = game.add.sprite(objectsPositions[9].x, objectsPositions[9].y, 'crab');
            crab.anchor.setTo(spriteAnchorX, spriteAnchorY);
            crab.scale.setTo(spriteScaleX, spriteScaleY);
            crab.inputEnabled = true;
            crab.events.onInputDown.add(onDownCrab, this);
            function onDownCrab() {this.resetESpriteFlag(); crabFlag = 1;}
            
            
            crown = game.add.sprite(objectsPositions[19].x, objectsPositions[19].y, 'crown');
            crown.anchor.setTo(spriteAnchorX, spriteAnchorY);
            crown.scale.setTo(spriteScaleX, spriteScaleY);
            crown.inputEnabled = true;
            crown.events.onInputDown.add(onDownCrown, this);
            function onDownCrown() {this.resetESpriteFlag(); crownFlag = 1;}
            
            
           /* game.leftArrow = game.add.sprite(1070, 730, 'leftArrow');             
            game.leftArrow.scale.setTo(1, 1); 
            game.leftArrow.anchor.setTo(spriteAnchorX, spriteAnchorY);
            game.leftArrow.inputEnabled = true;
            game.leftArrow.events.onInputDown.add(onDownLeftArrow, this);
            function onDownLeftArrow() {this.setEGlobalVaribalesToZero();game.state.start('D');}
            
            
            game.rightArrow = game.add.sprite(1170, 730, 'rightArrow');             
            game.rightArrow.scale.setTo(1, 1); 
            game.rightArrow.anchor.setTo(spriteAnchorX, spriteAnchorY);
            game.rightArrow.inputEnabled = true;
            game.rightArrow.events.onInputDown.add(onDownRightArrow, this);
            function onDownRightArrow() {this.setEGlobalVaribalesToZero();game.state.start('F');}
            */
            
            
            
            //Color shades
            blue = game.add.sprite(objectsPositions[20].x, objectsPositions[20].y, 'blue');
            blue.anchor.setTo(spriteAnchorX, spriteAnchorY);
            blue.scale.setTo(shadeScaleX, shadeScaleY);
            blue.inputEnabled = true;
            blue.tint = 0x456AC1; 
            blue.events.onInputDown.add(onDownBlue, this);
            function onDownBlue() {this.setColorEFlagToZero(); blueFlag = 1;}
           
            
            cyan = game.add.sprite(objectsPositions[21].x, objectsPositions[21].y, 'cyan');
            cyan.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cyan.scale.setTo(shadeScaleX, shadeScaleY);
            cyan.inputEnabled = true;
            cyan.tint = 0x45C1C1; 
            cyan.events.onInputDown.add(onDownCyan, this);
            function onDownCyan() {this.setColorEFlagToZero(); cyanFlag = 1;}
            
            
            
            green = game.add.sprite(objectsPositions[22].x, objectsPositions[22].y, 'green');
            green.anchor.setTo(spriteAnchorX, spriteAnchorY);
            green.scale.setTo(shadeScaleX, shadeScaleY);
            green.inputEnabled = true;
            green.tint = 0x51C735;
            green.events.onInputDown.add(onDownGreen, this);
            function onDownGreen() {this.setColorEFlagToZero(); greenFlag = 1;}
            
            
            orange = game.add.sprite(objectsPositions[23].x, objectsPositions[23].y, 'orange');
            orange.anchor.setTo(spriteAnchorX, spriteAnchorY);
            orange.scale.setTo(shadeScaleX, shadeScaleY);
            orange.inputEnabled = true;
            orange.tint = 0xF38932;
            orange.events.onInputDown.add(onDownOrange, this);
            function onDownOrange() {this.setColorEFlagToZero(); orangeFlag = 1;}
           
            
            pink = game.add.sprite(objectsPositions[24].x, objectsPositions[24].y, 'pink');
            pink.anchor.setTo(spriteAnchorX, spriteAnchorY);
            pink.scale.setTo(shadeScaleX, shadeScaleY);
            pink.inputEnabled = true;
            pink.tint = 0xCC3ACC;
            pink.events.onInputDown.add(onDownPink, this);
            function onDownPink() {this.setColorEFlagToZero(); pinkFlag = 1;}
            
            
            red = game.add.sprite(objectsPositions[25].x, objectsPositions[25].y, 'red');
            red.anchor.setTo(spriteAnchorX, spriteAnchorY);
            red.scale.setTo(shadeScaleX, shadeScaleY);
            red.inputEnabled = true;
            red.tint = 0xE32424;
            red.events.onInputDown.add(onDownRed, this);
            function onDownRed() {this.setColorEFlagToZero(); redFlag = 1;}
                
        },
        
        onDowneLetter: function() {
                
            //eagle
                    if(eagleFlag == 1 && greenFlag == 1 ){var greeneagle = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transEagle');greeneagle.tint =  0x51C735; greeneagle.scale.setTo(spriteScaleX, spriteScaleY); 
greeneagle.anchor.setTo(0.6, 0.6);stickSound.play();}                    
                    
                    if(eagleFlag == 1 && blueFlag == 1){var blueeagle = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transEagle'); blueeagle.tint =  0x456AC1; blueeagle.scale.setTo(spriteScaleX, spriteScaleY); blueeagle.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(eagleFlag == 1 && orangeFlag == 1){var orangeeagle = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transEagle'); orangeeagle.tint =  0xF38932; orangeeagle.scale.setTo(spriteScaleX, spriteScaleY); orangeeagle.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(eagleFlag == 1 && redFlag == 1){var redeagle = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transEagle'); redeagle.tint =  0xE32424; redeagle.scale.setTo(spriteScaleX, spriteScaleY); redeagle.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(eagleFlag == 1 && pinkFlag == 1){var pinkeagle = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transEagle'); pinkeagle.tint =  0xCC3ACC; pinkeagle.scale.setTo(spriteScaleX, spriteScaleY); pinkeagle.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(eagleFlag == 1 && cyanFlag == 1){var cyaneagle = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transEagle'); cyaneagle.tint =  0x45C1C1; cyaneagle.scale.setTo(spriteScaleX, spriteScaleY); cyaneagle.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //ear    
                    if(earFlag == 1 && greenFlag == 1 ){var greenear = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transEar');greenear.tint =  0x51C735; greenear.scale.setTo(spriteScaleX, spriteScaleY); 
greenear.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(earFlag == 1 && blueFlag == 1){var blueear = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transEar'); blueear.tint =  0x456AC1; blueear.scale.setTo(spriteScaleX, spriteScaleY); blueear.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(earFlag == 1 && orangeFlag == 1){var orangeear = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transEar'); orangeear.tint =  0xF38932; orangeear.scale.setTo(spriteScaleX, spriteScaleY); orangeear.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(earFlag == 1 && redFlag == 1){var redear = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transEar'); redear.tint =  0xE32424; redear.scale.setTo(spriteScaleX, spriteScaleY); redear.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(earFlag == 1 && pinkFlag == 1){var pinkear = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transEar'); pinkear.tint =  0xCC3ACC; pinkear.scale.setTo(spriteScaleX, spriteScaleY); pinkear.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(earFlag == 1 && cyanFlag == 1){var cyanear = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transEar'); cyanear.tint =  0x45C1C1; cyanear.scale.setTo(spriteScaleX, spriteScaleY); cyanear.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //earphone    
                    if(earphoneFlag == 1 && greenFlag == 1 ){var greenearphone = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transEarphone');greenearphone.tint =  0x51C735; greenearphone.scale.setTo(spriteScaleX, spriteScaleY); 
greenearphone.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(earphoneFlag == 1 && blueFlag == 1){var blueearphone = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transEarphone'); blueearphone.tint =  0x456AC1; blueearphone.scale.setTo(spriteScaleX, spriteScaleY); blueearphone.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(earphoneFlag == 1 && orangeFlag == 1){var orangeearphone = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transEarphone'); orangeearphone.tint =  0xF38932; orangeearphone.scale.setTo(spriteScaleX, spriteScaleY); orangeearphone.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(earphoneFlag == 1 && redFlag == 1){var redearphone = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transEarphone'); redearphone.tint =  0xE32424; redearphone.scale.setTo(spriteScaleX, spriteScaleY); redearphone.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(earphoneFlag == 1 && pinkFlag == 1){var pinkearphone = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transEarphone'); pinkearphone.tint =  0xCC3ACC; pinkearphone.scale.setTo(spriteScaleX, spriteScaleY); pinkearphone.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(earphoneFlag == 1 && cyanFlag == 1){var cyanearphone = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transEarphone'); cyanearphone.tint =  0x45C1C1; cyanearphone.scale.setTo(spriteScaleX, spriteScaleY); cyanearphone.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //earth
                    if(earthFlag == 1 && greenFlag == 1 ){var greenearth = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transEarth');greenearth.tint =  0x51C735; greenearth.scale.setTo(spriteScaleX, spriteScaleY); 
greenearth.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(earthFlag == 1 && blueFlag == 1){console.log("blueearth plotted");var blueearth = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transEarth'); blueearth.tint =  0x456AC1; blueearth.scale.setTo(spriteScaleX, spriteScaleY); blueearth.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(earthFlag == 1 && orangeFlag == 1){var orangeearth = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transEarth'); orangeearth.tint =  0xF38932; orangeearth.scale.setTo(spriteScaleX, spriteScaleY); orangeearth.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(earthFlag == 1 && redFlag == 1){var redearth = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transEarth'); redearth.tint =  0xE32424; redearth.scale.setTo(spriteScaleX, spriteScaleY); redearth.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(earthFlag == 1 && pinkFlag == 1){var pinkearth = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transEarth'); pinkearth.tint =  0xCC3ACC; pinkearth.scale.setTo(spriteScaleX, spriteScaleY); pinkearth.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(earthFlag == 1 && cyanFlag == 1){var cyanearth = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transEarth'); cyanearth.tint =  0x45C1C1; cyanearth.scale.setTo(spriteScaleX, spriteScaleY); cyanearth.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //egg    
                    if(eggFlag == 1 && greenFlag == 1 ){var greenegg = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transEgg');greenegg.tint =  0x51C735; greenegg.scale.setTo(spriteScaleX, spriteScaleY); 
greenegg.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(eggFlag == 1 && blueFlag == 1){console.log("blueegg plotted");var blueegg = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transEgg'); blueegg.tint =  0x456AC1; blueegg.scale.setTo(spriteScaleX, spriteScaleY); blueegg.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(eggFlag == 1 && orangeFlag == 1){var orangeegg = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transEgg'); orangeegg.tint =  0xF38932; orangeegg.scale.setTo(spriteScaleX, spriteScaleY); orangeegg.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(eggFlag == 1 && redFlag == 1){var redegg = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transEgg'); redegg.tint =  0xE32424; redegg.scale.setTo(spriteScaleX, spriteScaleY); redegg.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(eggFlag == 1 && pinkFlag == 1){var pinkegg = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transEgg'); pinkegg.tint =  0xCC3ACC; pinkegg.scale.setTo(spriteScaleX, spriteScaleY); pinkegg.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(eggFlag == 1 && cyanFlag == 1){var cyanegg = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transEgg'); cyanegg.tint =  0x45C1C1; cyanegg.scale.setTo(spriteScaleX, spriteScaleY); cyanegg.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //eggplant   
                    if(eggplantFlag == 1 && greenFlag == 1 ){var greeneggplant = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transEggplant');greeneggplant.tint =  0x51C735; greeneggplant.scale.setTo(spriteScaleX, spriteScaleY); 
greeneggplant.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(eggplantFlag == 1 && blueFlag == 1){console.log("blueeggplant plotted");var blueeggplant = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transEggplant'); blueeggplant.tint =  0x456AC1; blueeggplant.scale.setTo(spriteScaleX, spriteScaleY); blueeggplant.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(eggplantFlag == 1 && orangeFlag == 1){var orangeeggplant = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transEggplant'); orangeeggplant.tint =  0xF38932; orangeeggplant.scale.setTo(spriteScaleX, spriteScaleY); orangeeggplant.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(eggplantFlag == 1 && redFlag == 1){var redeggplant = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transEggplant'); redeggplant.tint =  0xE32424; redeggplant.scale.setTo(spriteScaleX, spriteScaleY); redeggplant.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(eggplantFlag == 1 && pinkFlag == 1){var pinkeggplant = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transEggplant'); pinkeggplant.tint =  0xCC3ACC; pinkeggplant.scale.setTo(spriteScaleX, spriteScaleY); pinkeggplant.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(eggplantFlag == 1 && cyanFlag == 1){var cyaneggplant = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transEggplant'); cyaneggplant.tint =  0x45C1C1; cyaneggplant.scale.setTo(spriteScaleX, spriteScaleY); cyaneggplant.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //elderberry    
                    if(elderberryFlag == 1 && greenFlag == 1 ){var greenelderberry = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transElderberry');greenelderberry.tint =  0x51C735; greenelderberry.scale.setTo(spriteScaleX, spriteScaleY); 
greenelderberry.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(elderberryFlag == 1 && blueFlag == 1){console.log("blueelderberry plotted");var blueelderberry = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transElderberry'); blueelderberry.tint =  0x456AC1; blueelderberry.scale.setTo(spriteScaleX, spriteScaleY); blueelderberry.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(elderberryFlag == 1 && orangeFlag == 1){var orangeelderberry = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transElderberry'); orangeelderberry.tint =  0xF38932; orangeelderberry.scale.setTo(spriteScaleX, spriteScaleY); orangeelderberry.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(elderberryFlag == 1 && redFlag == 1){var redelderberry = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transElderberry'); redelderberry.tint =  0xE32424; redelderberry.scale.setTo(spriteScaleX, spriteScaleY); redelderberry.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(elderberryFlag == 1 && pinkFlag == 1){var pinkelderberry = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transElderberry'); pinkelderberry.tint =  0xCC3ACC; pinkelderberry.scale.setTo(spriteScaleX, spriteScaleY); pinkelderberry.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(elderberryFlag == 1 && cyanFlag == 1){var cyanelderberry = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transElderberry'); cyanelderberry.tint =  0x45C1C1; cyanelderberry.scale.setTo(spriteScaleX, spriteScaleY); cyanelderberry.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //elephant    
                    if(elephantFlag == 1 && greenFlag == 1 ){var greenelephant = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transElephant');greenelephant.tint =  0x51C735; greenelephant.scale.setTo(spriteScaleX, spriteScaleY); 
greenelephant.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(elephantFlag == 1 && blueFlag == 1){console.log("blueelephant plotted");var blueelephant = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transElephant'); blueelephant.tint =  0x456AC1; blueelephant.scale.setTo(spriteScaleX, spriteScaleY); blueelephant.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(elephantFlag == 1 && orangeFlag == 1){var orangeelephant = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transElephant'); orangeelephant.tint =  0xF38932; orangeelephant.scale.setTo(spriteScaleX, spriteScaleY); orangeelephant.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(elephantFlag == 1 && redFlag == 1){var redelephant = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transElephant'); redelephant.tint =  0xE32424; redelephant.scale.setTo(spriteScaleX, spriteScaleY); redelephant.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(elephantFlag == 1 && pinkFlag == 1){var pinkelephant = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transElephant'); pinkelephant.tint =  0xCC3ACC; pinkelephant.scale.setTo(spriteScaleX, spriteScaleY); pinkelephant.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(elephantFlag == 1 && cyanFlag == 1){var cyanelephant = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transElephant'); cyanelephant.tint =  0x45C1C1; cyanelephant.scale.setTo(spriteScaleX, spriteScaleY); cyanelephant.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //engine    
                    if(engineFlag == 1 && greenFlag == 1 ){var greenengine = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transEngine');greenengine.tint =  0x51C735; greenengine.scale.setTo(spriteScaleX, spriteScaleY); 
greenengine.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(engineFlag == 1 && blueFlag == 1){console.log("blueengine plotted");var blueengine = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transEngine'); blueengine.tint =  0x456AC1; blueengine.scale.setTo(spriteScaleX, spriteScaleY); blueengine.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(engineFlag == 1 && orangeFlag == 1){var orangeengine = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transEngine'); orangeengine.tint =  0xF38932; orangeengine.scale.setTo(spriteScaleX, spriteScaleY); orangeengine.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(engineFlag == 1 && redFlag == 1){var redengine = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transEngine'); redengine.tint =  0xE32424; redengine.scale.setTo(spriteScaleX, spriteScaleY); redengine.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(engineFlag == 1 && pinkFlag == 1){var pinkengine = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transEngine'); pinkengine.tint =  0xCC3ACC; pinkengine.scale.setTo(spriteScaleX, spriteScaleY); pinkengine.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(engineFlag == 1 && cyanFlag == 1){var cyanengine = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transEngine'); cyanengine.tint =  0x45C1C1; cyanengine.scale.setTo(spriteScaleX, spriteScaleY); cyanengine.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //eye 
                    if(eyeFlag == 1 && greenFlag == 1 ){var greeneye = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transEye');greeneye.tint =  0x51C735; greeneye.scale.setTo(spriteScaleX, spriteScaleY); 
greeneye.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(eyeFlag == 1 && blueFlag == 1){console.log("blueeye plotted");var blueeye = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transEye'); blueeye.tint =  0x456AC1; blueeye.scale.setTo(spriteScaleX, spriteScaleY); blueeye.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(eyeFlag == 1 && orangeFlag == 1){var orangeeye = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transEye'); orangeeye.tint =  0xF38932; orangeeye.scale.setTo(spriteScaleX, spriteScaleY); orangeeye.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(eyeFlag == 1 && redFlag == 1){var redeye = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transEye'); redeye.tint =  0xE32424; redeye.scale.setTo(spriteScaleX, spriteScaleY); redeye.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(eyeFlag == 1 && pinkFlag == 1){var pinkeye = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transEye'); pinkeye.tint =  0xCC3ACC; pinkeye.scale.setTo(spriteScaleX, spriteScaleY); pinkeye.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(eyeFlag == 1 && cyanFlag == 1){var cyaneye = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transEye'); cyaneye.tint =  0x45C1C1; cyaneye.scale.setTo(spriteScaleX, spriteScaleY); cyaneye.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
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
            
            game.world.bringToTop(eLetter);
            
            game.world.bringToTop(blue);
            game.world.bringToTop(green);
            game.world.bringToTop(red);
            game.world.bringToTop(cyan);
            game.world.bringToTop(orange);
            game.world.bringToTop(pink);
            
            game.world.bringToTop(cloud1);
            game.world.bringToTop(cloud2);
            game.world.bringToTop(cloud3);
            
            game.world.bringToTop(eagle);
            game.world.bringToTop(ear);
            game.world.bringToTop(earphone);
            game.world.bringToTop(earth);
            game.world.bringToTop(egg);
            game.world.bringToTop(eggplant);
            game.world.bringToTop(elderberry);
            game.world.bringToTop(elephant);
            game.world.bringToTop(engine);
            game.world.bringToTop(eye);
            
           /* game.world.bringToTop(game.leftArrow);
            game.world.bringToTop(game.rightArrow);
*/
            
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
            
            
            
            if(eagleFlag == 1){eagle.angle += 2;}
            if(earFlag == 1){ear.angle += 2;}
            if(earphoneFlag == 1){earphone.angle += 2;}
            if(earthFlag == 1){earth.angle += 2;}
            if(eggFlag == 1){egg.angle += 2;}
            if(eggplantFlag == 1){eggplant.angle += 2;}
            if(elderberryFlag == 1){elderberry.angle += 2;}
            if(elephantFlag == 1){elephant.angle += 2;}
            if(engineFlag == 1){engine.angle += 2;}
            if(eyeFlag == 1){eye.angle += 2;}
            
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
            
            if(eObjectClicked == 10){
            
                askForLevelF = 1;
               /* game.leftArrow.kill();
                game.rightArrow.kill();*/
            
                game.fButton = game.add.sprite(1170, 730, 'fButton');             
                game.fButton.scale.setTo(1, 1); 
                game.fButton.anchor.setTo(spriteAnchorX, spriteAnchorY);
                
            }
            
        if(askForLevelF == 1){
            
            game.world.bringToTop(game.fButton);
            game.fButton.inputEnabled = true;
            game.fButton.events.onInputDown.add(onDownE, this);
            function onDownE() {
            
                //start next level
                
                this.setEGlobalVaribalesToZero();
                game.state.start('F');
                
            }
        }
           
        },
        
        resetESpriteFlag: function(){
            
            eagleFlag = 0;earFlag = 0;earphoneFlag = 0;eggplantFlag = 0;earthFlag = 0;
            eggFlag = 0;elderberryFlag = 0;elephantFlag = 0;engineFlag = 0;eyeFlag = 0;
            camelFlag = 0;candleFlag = 0;carFlag = 0;catFlag = 0;cheeseFlag = 0;cherryFlag = 0;
            clockFlag = 0;cowFlag = 0;crabFlag = 0;crownFlag = 0;

            eagle.angle = 0;ear.angle = 0;earphone.angle = 0;eggplant.angle = 0;earth.angle = 0;
            egg.angle = 0;elderberry.angle = 0;elephant.angle = 0;engine.angle = 0;eye.angle = 0;
            camel.angle = 0;candle.angle = 0;car.angle = 0;cat.angle = 0;cheese.angle = 0;
            cherry.angle = 0;crown.angle = 0;clock.angle = 0;cow.angle = 0;crab.angle = 0;
           
        },
       
        setColorEFlagToZero: function(){
            
            bubbleSound.play(); blueFlag = 0;greenFlag = 0; redFlag = 0; cyanFlag = 0; pinkFlag = 0; orangeFlag = 0;
        },
        
        setEGlobalVaribalesToZero: function(){
            
            
            eagleFlag = 0;earFlag = 0;earphoneFlag = 0;eggplantFlag = 0;earthFlag = 0;
            eggFlag = 0;elderberryFlag = 0;elephantFlag = 0;engineFlag = 0;eyeFlag = 0;
            camelFlag = 0;candleFlag = 0;carFlag = 0;catFlag = 0;cheeseFlag = 0;cherryFlag = 0;
            clockFlag = 0;cowFlag = 0;crabFlag = 0;crownFlag = 0;



            greenFlag = 0;blueFlag = 0;orangeFlag = 0;redFlag = 0;pinkFlag = 0;cyanFlag = 0;
        }
        
        
    };

