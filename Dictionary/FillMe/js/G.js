        
    var gObjectClicked = 0;
    var askForLevelH = 0;
    
    
    var gateFlag = 0;
    var ghostFlag = 0;
    var giraffeFlag = 0;            
    var globeFlag = 0;
    var glovesFlag = 0;
    var goatFlag = 0;
    var grapesFlag = 0;
    var grasshoperFlag = 0;
    var guavaFlag = 0;
    var guitarFlag = 0;
    
    
    var G = {

        preload: function () {

            //setting default path for assets to be used in game
            this.load.path = './assets/G/';
            
            
            
            this.load.image("transGate", "transGate.png");
            this.load.image("transGhost", "transGhost.png");
            this.load.image("transGiraffe", "transGiraffe.png");
            this.load.image("transGlobe", "transGlobe.png");
            this.load.image("transGloves", "transGloves.png");
            this.load.image("transGoat", "transGoat.png");
            this.load.image("transGrapes", "transGrapes.png");
            this.load.image("transGrasshoper", "transGrasshoper.png");
            this.load.image("transGuava", "transGuava.png");
            this.load.image("transGuitar", "transGuitar.png");
            
            this.load.image("gate", "gate.png");
            this.load.image("ghost", "ghost.png");
            this.load.image("giraffe", "giraffe.png");
            this.load.image("globe", "globe.png");
            this.load.image("gloves", "gloves.png");
            this.load.image("goat", "goat.png");
            this.load.image("grapes", "grapes.png");
            this.load.image("grasshoper", "grasshoper.png");
            this.load.image("guava", "guava.png");
            this.load.image("guitar", "guitar.png");
            
            
            //loading assets for the level  G
            
            //loading shades
            this.load.image("blue", "blue.png");
            this.load.image("cyan", "cyan.png");
            this.load.image("green", "green.png");
            this.load.image("orange", "orange.png");
            this.load.image("pink", "pink.png");
            this.load.image("red", "red.png");
    
            this.load.image("bg", "bg.png");
            this.load.image("gLetter", "gLetter.png");
            this.load.image("hButton", "hButton.png");
            /*this.load.image("leftArrow", "leftArrow.png");
            this.load.image("rightArrow", "rightArrow.png");*/
            
            
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
                
            
            
            
            //Main letter G
            gLetter = game.add.sprite(gameMinWidth, gameMinHeight, 'gLetter');
            gLetter.inputEnabled = true;
            gLetter.events.onInputDown.add(this.onDowngLetter, this);
            
            
            
            //Objects starting from G
                    
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
            
            
            
            
            gate = game.add.sprite(objectsPositions[0].x, objectsPositions[0].y, 'gate');
            gate.anchor.setTo(spriteAnchorX, spriteAnchorY);
            gate.scale.setTo(spriteScaleX, spriteScaleY);
            gate.inputEnabled = true;
            gate.events.onInputDown.add(onDowngate, this);
            function onDowngate() {this.resetGSpriteFlag(); gateFlag = 1;gObjectClicked++;}

            
            
            
            ghost = game.add.sprite(objectsPositions[10].x, objectsPositions[10].y, 'ghost');
            ghost.anchor.setTo(spriteAnchorX, spriteAnchorY);
            ghost.scale.setTo(spriteScaleX, spriteScaleY);
            ghost.inputEnabled = true;
            ghost.events.onInputDown.add(onDownghost, this);
            function onDownghost() {this.resetGSpriteFlag(); ghostFlag = 1;gObjectClicked++;}

            
            
            
            giraffe = game.add.sprite(objectsPositions[1].x, objectsPositions[1].y, 'giraffe');
            giraffe.anchor.setTo(spriteAnchorX, spriteAnchorY);
            giraffe.scale.setTo(spriteScaleX, spriteScaleY);
            giraffe.inputEnabled = true;
            giraffe.events.onInputDown.add(onDowngiraffe, this);
            function onDowngiraffe() {this.resetGSpriteFlag(); giraffeFlag = 1;gObjectClicked++;}
            
            
            
            
            globe = game.add.sprite(objectsPositions[11].x, objectsPositions[11].y, 'globe');
            globe.anchor.setTo(spriteAnchorX, spriteAnchorY);
            globe.scale.setTo(spriteScaleX, spriteScaleY);
            globe.inputEnabled = true;
            globe.events.onInputDown.add(onDownglobe, this);
            function onDownglobe() {this.resetGSpriteFlag(); globeFlag = 1;gObjectClicked++;}
            
            
            
            gloves = game.add.sprite(objectsPositions[2].x, objectsPositions[2].y, 'gloves');
            gloves.anchor.setTo(spriteAnchorX, spriteAnchorY);
            gloves.scale.setTo(spriteScaleX, spriteScaleY);
            gloves.inputEnabled = true;
            gloves.events.onInputDown.add(onDowngloves, this);
            function onDowngloves() {this.resetGSpriteFlag(); glovesFlag = 1;gObjectClicked++;}
            
            goat = game.add.sprite(objectsPositions[12].x, objectsPositions[12].y, 'goat');
            goat.anchor.setTo(spriteAnchorX, spriteAnchorY);
            goat.scale.setTo(spriteScaleX, spriteScaleY);
            goat.inputEnabled = true;
            goat.events.onInputDown.add(onDowngoat, this);
            function onDowngoat() {this.resetGSpriteFlag(); grasshoperFlag = 1;gObjectClicked++;}

            
            grapes = game.add.sprite(objectsPositions[3].x, objectsPositions[3].y, 'grapes');
            grapes.anchor.setTo(spriteAnchorX, spriteAnchorY);
            grapes.scale.setTo(spriteScaleX, spriteScaleY);
            grapes.inputEnabled = true;  
            grapes.events.onInputDown.add(onDowngrapes, this);
            function onDowngrapes() {this.resetGSpriteFlag(); grapesFlag = 1;gObjectClicked++;}
            
            
            grasshoper = game.add.sprite(objectsPositions[13].x, objectsPositions[13].y, 'grasshoper');
            grasshoper.anchor.setTo(spriteAnchorX, spriteAnchorY);
            grasshoper.scale.setTo(spriteScaleX, spriteScaleY);
            grasshoper.inputEnabled = true;
            grasshoper.events.onInputDown.add(onDowngrasshoper, this);
            function onDowngrasshoper() {this.resetGSpriteFlag(); goatFlag = 1;gObjectClicked++;}
            
            
            guava = game.add.sprite(objectsPositions[4].x, objectsPositions[4].y, 'guava');
            guava.anchor.setTo(spriteAnchorX, spriteAnchorY);
            guava.scale.setTo(spriteScaleX, spriteScaleY);
            guava.inputEnabled = true;
            guava.events.onInputDown.add(onDownguava, this);
            function onDownguava() {this.resetGSpriteFlag(); guavaFlag = 1;gObjectClicked++;}
            
            
            guitar = game.add.sprite(objectsPositions[14].x, objectsPositions[14].y, 'guitar');
            guitar.anchor.setTo(spriteAnchorX, spriteAnchorY);
            guitar.scale.setTo(spriteScaleX, spriteScaleY);
            guitar.inputEnabled = true;
            guitar.events.onInputDown.add(onDownguitar, this);
            function onDownguitar() {this.resetGSpriteFlag(); guitarFlag = 1;gObjectClicked++;}
            
            
            
            //Adding other sprites        
            
            camel = game.add.sprite(objectsPositions[5].x, objectsPositions[5].y, 'camel');
            camel.anchor.setTo(spriteAnchorX, spriteAnchorY);
            camel.scale.setTo(spriteScaleX, spriteScaleY);
            camel.inputEnabled = true;
            camel.events.onInputDown.add(onDownCamel, this);
            function onDownCamel() {this.resetGSpriteFlag(); camelFlag = 1;}
            
            
            
            
            candle = game.add.sprite(objectsPositions[15].x, objectsPositions[15].y, 'candle');
            candle.anchor.setTo(spriteAnchorX, spriteAnchorY);
            candle.scale.setTo(spriteScaleX, spriteScaleY);
            candle.inputEnabled = true;
            candle.events.onInputDown.add(onDownCandle, this);
            function onDownCandle() {this.resetGSpriteFlag(); candleFlag = 1; }
            
            
            car = game.add.sprite(objectsPositions[6].x, objectsPositions[6].y, 'car');
            car.anchor.setTo(spriteAnchorX, spriteAnchorY);
            car.scale.setTo(spriteScaleX, spriteScaleY);
            car.inputEnabled = true;
            car.events.onInputDown.add(onDownCar, this);
            function onDownCar() {this.resetGSpriteFlag(); carFlag = 1;}
            
            cat = game.add.sprite(objectsPositions[16].x, objectsPositions[16].y, 'cat');
            cat.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cat.scale.setTo(spriteScaleX, spriteScaleY);
            cat.inputEnabled = true;
            cat.events.onInputDown.add(onDownCat, this);
            function onDownCat() {this.resetGSpriteFlag(); catFlag = 1;}
            
            
            cheese = game.add.sprite(objectsPositions[7].x, objectsPositions[7].y, 'cheese');
            cheese.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cheese.scale.setTo(spriteScaleX, spriteScaleY);
            cheese.inputEnabled = true;
            cheese.events.onInputDown.add(onDownCheese, this);
            function onDownCheese() {this.resetGSpriteFlag(); cheeseFlag = 1;}
            
            
            cherry = game.add.sprite(objectsPositions[17].x, objectsPositions[17].y, 'cherry');
            cherry.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cherry.scale.setTo(spriteScaleX, spriteScaleY);
            cherry.inputEnabled = true;
            cherry.events.onInputDown.add(onDownCherry, this);
            function onDownCherry() {this.resetGSpriteFlag(); cherryFlag = 1;}
            
            
            clock = game.add.sprite(objectsPositions[8].x, objectsPositions[8].y, 'clock');
            clock.anchor.setTo(spriteAnchorX, spriteAnchorY);
            clock.scale.setTo(spriteScaleX, spriteScaleY);
            clock.inputEnabled = true;
            clock.events.onInputDown.add(onDownClock, this);
            function onDownClock() {this.resetGSpriteFlag(); clockFlag = 1;}
            
            
            
            cow = game.add.sprite(objectsPositions[18].x, objectsPositions[18].y, 'cow');
            cow.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cow.scale.setTo(spriteScaleX, spriteScaleY);
            cow.inputEnabled = true;
            cow.events.onInputDown.add(onDownCow, this);
            function onDownCow() {this.resetGSpriteFlag(); cowFlag = 1;}
            
            
            crab = game.add.sprite(objectsPositions[9].x, objectsPositions[9].y, 'crab');
            crab.anchor.setTo(spriteAnchorX, spriteAnchorY);
            crab.scale.setTo(spriteScaleX, spriteScaleY);
            crab.inputEnabled = true;
            crab.events.onInputDown.add(onDownCrab, this);
            function onDownCrab() {this.resetGSpriteFlag(); crabFlag = 1;}
            
            
            crown = game.add.sprite(objectsPositions[19].x, objectsPositions[19].y, 'crown');
            crown.anchor.setTo(spriteAnchorX, spriteAnchorY);
            crown.scale.setTo(spriteScaleX, spriteScaleY);
            crown.inputEnabled = true;
            crown.events.onInputDown.add(onDownCrown, this);
            function onDownCrown() {this.resetGSpriteFlag(); crownFlag = 1;}
            
            
           /* game.leftArrow = game.add.sprite(1070, 730, 'leftArrow');             
            game.leftArrow.scale.setTo(1, 1); 
            game.leftArrow.anchor.setTo(spriteAnchorX, spriteAnchorY);
            game.leftArrow.inputEnabled = true;
            game.leftArrow.events.onInputDown.add(onDownLeftArrow, this);
            function onDownLeftArrow() {this.setGGlobalVaribalesToZero();game.state.start('F');}
            
            
            game.rightArrow = game.add.sprite(1170, 730, 'rightArrow');             
            game.rightArrow.scale.setTo(1, 1); 
            game.rightArrow.anchor.setTo(spriteAnchorX, spriteAnchorY);
            game.rightArrow.inputEnabled = true;
            game.rightArrow.events.onInputDown.add(onDownRightArrow, this);
            function onDownRightArrow() {this.setGGlobalVaribalesToZero();game.state.start('H');}
            */
            
            //Color shades
            blue = game.add.sprite(objectsPositions[20].x, objectsPositions[20].y, 'blue');
            blue.anchor.setTo(spriteAnchorX, spriteAnchorY);
            blue.scale.setTo(shadeScaleX, shadeScaleY);
            blue.inputEnabled = true;
            blue.tint = 0x456AC1; 
            blue.events.onInputDown.add(onDownBlue, this);
            function onDownBlue() {this.setColorGFlagToZero(); blueFlag = 1;}
           
            
            cyan = game.add.sprite(objectsPositions[21].x, objectsPositions[21].y, 'cyan');
            cyan.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cyan.scale.setTo(shadeScaleX, shadeScaleY);
            cyan.inputEnabled = true;
            cyan.tint = 0x45C1C1; 
            cyan.events.onInputDown.add(onDownCyan, this);
            function onDownCyan() {this.setColorGFlagToZero(); cyanFlag = 1;}
            
            
            
            green = game.add.sprite(objectsPositions[22].x, objectsPositions[22].y, 'green');
            green.anchor.setTo(spriteAnchorX, spriteAnchorY);
            green.scale.setTo(shadeScaleX, shadeScaleY);
            green.inputEnabled = true;
            green.tint = 0x51C735;
            green.events.onInputDown.add(onDownGreen, this);
            function onDownGreen() {this.setColorGFlagToZero(); greenFlag = 1;}
            
            
            orange = game.add.sprite(objectsPositions[23].x, objectsPositions[23].y, 'orange');
            orange.anchor.setTo(spriteAnchorX, spriteAnchorY);
            orange.scale.setTo(shadeScaleX, shadeScaleY);
            orange.inputEnabled = true;
            orange.tint = 0xF38932;
            orange.events.onInputDown.add(onDownOrange, this);
            function onDownOrange() {this.setColorGFlagToZero(); orangeFlag = 1;}
           
            
            pink = game.add.sprite(objectsPositions[24].x, objectsPositions[24].y, 'pink');
            pink.anchor.setTo(spriteAnchorX, spriteAnchorY);
            pink.scale.setTo(shadeScaleX, shadeScaleY);
            pink.inputEnabled = true;
            pink.tint = 0xCC3ACC;
            pink.events.onInputDown.add(onDownPink, this);
            function onDownPink() {this.setColorGFlagToZero(); pinkFlag = 1;}
            
            
            red = game.add.sprite(objectsPositions[25].x, objectsPositions[25].y, 'red');
            red.anchor.setTo(spriteAnchorX, spriteAnchorY);
            red.scale.setTo(shadeScaleX, shadeScaleY);
            red.inputEnabled = true;
            red.tint = 0xE32424;
            red.events.onInputDown.add(onDownRed, this);
            function onDownRed() {this.setColorGFlagToZero(); redFlag = 1;}
                
        },
        
        onDowngLetter: function() {
                
            //gate
                    if(gateFlag == 1 && greenFlag == 1 ){var greengate = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transGate');greengate.tint =  0x51C735; greengate.scale.setTo(spriteScaleX, spriteScaleY); 
greengate.anchor.setTo(0.6, 0.6);stickSound.play();}                    
                    
                    if(gateFlag == 1 && blueFlag == 1){var bluegate = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transGate'); bluegate.tint =  0x456AC1; bluegate.scale.setTo(spriteScaleX, spriteScaleY); bluegate.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(gateFlag == 1 && orangeFlag == 1){var orangegate = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transGate'); orangegate.tint =  0xF38932; orangegate.scale.setTo(spriteScaleX, spriteScaleY); orangegate.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(gateFlag == 1 && redFlag == 1){var redgate = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transGate'); redgate.tint =  0xE32424; redgate.scale.setTo(spriteScaleX, spriteScaleY); redgate.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(gateFlag == 1 && pinkFlag == 1){var pinkgate = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transGate'); pinkgate.tint =  0xCC3ACC; pinkgate.scale.setTo(spriteScaleX, spriteScaleY); pinkgate.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(gateFlag == 1 && cyanFlag == 1){var cyangate = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transGate'); cyangate.tint =  0x45C1C1; cyangate.scale.setTo(spriteScaleX, spriteScaleY); cyangate.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //ghost    
                    if(ghostFlag == 1 && greenFlag == 1 ){var greenghost = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transGhost');greenghost.tint =  0x51C735; greenghost.scale.setTo(spriteScaleX, spriteScaleY); 
greenghost.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(ghostFlag == 1 && blueFlag == 1){var blueghost = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transGhost'); blueghost.tint =  0x456AC1; blueghost.scale.setTo(spriteScaleX, spriteScaleY); blueghost.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(ghostFlag == 1 && orangeFlag == 1){var orangeghost = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transGhost'); orangeghost.tint =  0xF38932; orangeghost.scale.setTo(spriteScaleX, spriteScaleY); orangeghost.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(ghostFlag == 1 && redFlag == 1){var redghost = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transGhost'); redghost.tint =  0xE32424; redghost.scale.setTo(spriteScaleX, spriteScaleY); redghost.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(ghostFlag == 1 && pinkFlag == 1){var pinkghost = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transGhost'); pinkghost.tint =  0xCC3ACC; pinkghost.scale.setTo(spriteScaleX, spriteScaleY); pinkghost.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(ghostFlag == 1 && cyanFlag == 1){var cyanghost = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transGhost'); cyanghost.tint =  0x45C1C1; cyanghost.scale.setTo(spriteScaleX, spriteScaleY); cyanghost.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //giraffe    
                    if(giraffeFlag == 1 && greenFlag == 1 ){var greengiraffe = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transGiraffe');greengiraffe.tint =  0x51C735; greengiraffe.scale.setTo(spriteScaleX, spriteScaleY); 
greengiraffe.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(giraffeFlag == 1 && blueFlag == 1){var bluegiraffe = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transGiraffe'); bluegiraffe.tint =  0x456AC1; bluegiraffe.scale.setTo(spriteScaleX, spriteScaleY); bluegiraffe.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(giraffeFlag == 1 && orangeFlag == 1){var orangegiraffe = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transGiraffe'); orangegiraffe.tint =  0xF38932; orangegiraffe.scale.setTo(spriteScaleX, spriteScaleY); orangegiraffe.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(giraffeFlag == 1 && redFlag == 1){var redgiraffe = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transGiraffe'); redgiraffe.tint =  0xE32424; redgiraffe.scale.setTo(spriteScaleX, spriteScaleY); redgiraffe.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(giraffeFlag == 1 && pinkFlag == 1){var pinkgiraffe = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transGiraffe'); pinkgiraffe.tint =  0xCC3ACC; pinkgiraffe.scale.setTo(spriteScaleX, spriteScaleY); pinkgiraffe.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(giraffeFlag == 1 && cyanFlag == 1){var cyangiraffe = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transGiraffe'); cyangiraffe.tint =  0x45C1C1; cyangiraffe.scale.setTo(spriteScaleX, spriteScaleY); cyangiraffe.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //globe
                    if(globeFlag == 1 && greenFlag == 1 ){var greenglobe = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transGlobe');greenglobe.tint =  0x51C735; greenglobe.scale.setTo(spriteScaleX, spriteScaleY); 
greenglobe.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(globeFlag == 1 && blueFlag == 1){console.log("blueglobe plotted");var blueglobe = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transGlobe'); blueglobe.tint =  0x456AC1; blueglobe.scale.setTo(spriteScaleX, spriteScaleY); blueglobe.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(globeFlag == 1 && orangeFlag == 1){var orangeglobe = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transGlobe'); orangeglobe.tint =  0xF38932; orangeglobe.scale.setTo(spriteScaleX, spriteScaleY); orangeglobe.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(globeFlag == 1 && redFlag == 1){var redglobe = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transGlobe'); redglobe.tint =  0xE32424; redglobe.scale.setTo(spriteScaleX, spriteScaleY); redglobe.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(globeFlag == 1 && pinkFlag == 1){var pinkglobe = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transGlobe'); pinkglobe.tint =  0xCC3ACC; pinkglobe.scale.setTo(spriteScaleX, spriteScaleY); pinkglobe.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(globeFlag == 1 && cyanFlag == 1){var cyanglobe = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transGlobe'); cyanglobe.tint =  0x45C1C1; cyanglobe.scale.setTo(spriteScaleX, spriteScaleY); cyanglobe.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //gloves    
                    if(glovesFlag == 1 && greenFlag == 1 ){var greengloves = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transGloves');greengloves.tint =  0x51C735; greengloves.scale.setTo(spriteScaleX, spriteScaleY); 
greengloves.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(glovesFlag == 1 && blueFlag == 1){console.log("bluegloves plotted");var bluegloves = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transGloves'); bluegloves.tint =  0x456AC1; bluegloves.scale.setTo(spriteScaleX, spriteScaleY); bluegloves.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(glovesFlag == 1 && orangeFlag == 1){var orangegloves = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transGloves'); orangegloves.tint =  0xF38932; orangegloves.scale.setTo(spriteScaleX, spriteScaleY); orangegloves.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(glovesFlag == 1 && redFlag == 1){var redgloves = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transGloves'); redgloves.tint =  0xE32424; redgloves.scale.setTo(spriteScaleX, spriteScaleY); redgloves.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(glovesFlag == 1 && pinkFlag == 1){var pinkgloves = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transGloves'); pinkgloves.tint =  0xCC3ACC; pinkgloves.scale.setTo(spriteScaleX, spriteScaleY); pinkgloves.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(glovesFlag == 1 && cyanFlag == 1){var cyangloves = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transGloves'); cyangloves.tint =  0x45C1C1; cyangloves.scale.setTo(spriteScaleX, spriteScaleY); cyangloves.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //goat   
                    if(grasshoperFlag == 1 && greenFlag == 1 ){var greengoat = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transGoat');greengoat.tint =  0x51C735; greengoat.scale.setTo(spriteScaleX, spriteScaleY); 
greengoat.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(grasshoperFlag == 1 && blueFlag == 1){console.log("bluegoat plotted");var bluegoat = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transGoat'); bluegoat.tint =  0x456AC1; bluegoat.scale.setTo(spriteScaleX, spriteScaleY); bluegoat.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(grasshoperFlag == 1 && orangeFlag == 1){var orangegoat = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transGoat'); orangegoat.tint =  0xF38932; orangegoat.scale.setTo(spriteScaleX, spriteScaleY); orangegoat.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(grasshoperFlag == 1 && redFlag == 1){var redgoat = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transGoat'); redgoat.tint =  0xE32424; redgoat.scale.setTo(spriteScaleX, spriteScaleY); redgoat.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(grasshoperFlag == 1 && pinkFlag == 1){var pinkgoat = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transGoat'); pinkgoat.tint =  0xCC3ACC; pinkgoat.scale.setTo(spriteScaleX, spriteScaleY); pinkgoat.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(grasshoperFlag == 1 && cyanFlag == 1){var cyangoat = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transGoat'); cyangoat.tint =  0x45C1C1; cyangoat.scale.setTo(spriteScaleX, spriteScaleY); cyangoat.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //grapes    
                    if(grapesFlag == 1 && greenFlag == 1 ){var greengrapes = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transGrapes');greengrapes.tint =  0x51C735; greengrapes.scale.setTo(spriteScaleX, spriteScaleY); 
greengrapes.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(grapesFlag == 1 && blueFlag == 1){console.log("bluegrapes plotted");var bluegrapes = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transGrapes'); bluegrapes.tint =  0x456AC1; bluegrapes.scale.setTo(spriteScaleX, spriteScaleY); bluegrapes.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(grapesFlag == 1 && orangeFlag == 1){var orangegrapes = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transGrapes'); orangegrapes.tint =  0xF38932; orangegrapes.scale.setTo(spriteScaleX, spriteScaleY); orangegrapes.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(grapesFlag == 1 && redFlag == 1){var redgrapes = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transGrapes'); redgrapes.tint =  0xE32424; redgrapes.scale.setTo(spriteScaleX, spriteScaleY); redgrapes.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(grapesFlag == 1 && pinkFlag == 1){var pinkgrapes = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transGrapes'); pinkgrapes.tint =  0xCC3ACC; pinkgrapes.scale.setTo(spriteScaleX, spriteScaleY); pinkgrapes.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(grapesFlag == 1 && cyanFlag == 1){var cyangrapes = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transGrapes'); cyangrapes.tint =  0x45C1C1; cyangrapes.scale.setTo(spriteScaleX, spriteScaleY); cyangrapes.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //grasshoper    
                    if(goatFlag == 1 && greenFlag == 1 ){var greengrasshoper = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transGrasshoper');greengrasshoper.tint =  0x51C735; greengrasshoper.scale.setTo(spriteScaleX, spriteScaleY); 
greengrasshoper.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(goatFlag == 1 && blueFlag == 1){console.log("bluegrasshoper plotted");var bluegrasshoper = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transGrasshoper'); bluegrasshoper.tint =  0x456AC1; bluegrasshoper.scale.setTo(spriteScaleX, spriteScaleY); bluegrasshoper.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(goatFlag == 1 && orangeFlag == 1){var orangegrasshoper = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transGrasshoper'); orangegrasshoper.tint =  0xF38932; orangegrasshoper.scale.setTo(spriteScaleX, spriteScaleY); orangegrasshoper.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(goatFlag == 1 && redFlag == 1){var redgrasshoper = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transGrasshoper'); redgrasshoper.tint =  0xE32424; redgrasshoper.scale.setTo(spriteScaleX, spriteScaleY); redgrasshoper.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(goatFlag == 1 && pinkFlag == 1){var pinkgrasshoper = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transGrasshoper'); pinkgrasshoper.tint =  0xCC3ACC; pinkgrasshoper.scale.setTo(spriteScaleX, spriteScaleY); pinkgrasshoper.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(goatFlag == 1 && cyanFlag == 1){var cyangrasshoper = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transGrasshoper'); cyangrasshoper.tint =  0x45C1C1; cyangrasshoper.scale.setTo(spriteScaleX, spriteScaleY); cyangrasshoper.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //guava    
                    if(guavaFlag == 1 && greenFlag == 1 ){var greenguava = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transGuava');greenguava.tint =  0x51C735; greenguava.scale.setTo(spriteScaleX, spriteScaleY); 
greenguava.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(guavaFlag == 1 && blueFlag == 1){console.log("blueguava plotted");var blueguava = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transGuava'); blueguava.tint =  0x456AC1; blueguava.scale.setTo(spriteScaleX, spriteScaleY); blueguava.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(guavaFlag == 1 && orangeFlag == 1){var orangeguava = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transGuava'); orangeguava.tint =  0xF38932; orangeguava.scale.setTo(spriteScaleX, spriteScaleY); orangeguava.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(guavaFlag == 1 && redFlag == 1){var redguava = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transGuava'); redguava.tint =  0xE32424; redguava.scale.setTo(spriteScaleX, spriteScaleY); redguava.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(guavaFlag == 1 && pinkFlag == 1){var pinkguava = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transGuava'); pinkguava.tint =  0xCC3ACC; pinkguava.scale.setTo(spriteScaleX, spriteScaleY); pinkguava.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(guavaFlag == 1 && cyanFlag == 1){var cyanguava = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transGuava'); cyanguava.tint =  0x45C1C1; cyanguava.scale.setTo(spriteScaleX, spriteScaleY); cyanguava.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //guitar 
                    if(guitarFlag == 1 && greenFlag == 1 ){var greenguitar = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transGuitar');greenguitar.tint =  0x51C735; greenguitar.scale.setTo(spriteScaleX, spriteScaleY); 
greenguitar.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(guitarFlag == 1 && blueFlag == 1){console.log("blueguitar plotted");var blueguitar = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transGuitar'); blueguitar.tint =  0x456AC1; blueguitar.scale.setTo(spriteScaleX, spriteScaleY); blueguitar.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(guitarFlag == 1 && orangeFlag == 1){var orangeguitar = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transGuitar'); orangeguitar.tint =  0xF38932; orangeguitar.scale.setTo(spriteScaleX, spriteScaleY); orangeguitar.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(guitarFlag == 1 && redFlag == 1){var redguitar = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transGuitar'); redguitar.tint =  0xE32424; redguitar.scale.setTo(spriteScaleX, spriteScaleY); redguitar.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(guitarFlag == 1 && pinkFlag == 1){var pinkguitar = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transGuitar'); pinkguitar.tint =  0xCC3ACC; pinkguitar.scale.setTo(spriteScaleX, spriteScaleY); pinkguitar.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(guitarFlag == 1 && cyanFlag == 1){var cyanguitar = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transGuitar'); cyanguitar.tint =  0x45C1C1; cyanguitar.scale.setTo(spriteScaleX, spriteScaleY); cyanguitar.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
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
            
            game.world.bringToTop(gLetter);
            
            game.world.bringToTop(blue);
            game.world.bringToTop(green);
            game.world.bringToTop(red);
            game.world.bringToTop(cyan);
            game.world.bringToTop(orange);
            game.world.bringToTop(pink);
            
            game.world.bringToTop(cloud1);
            game.world.bringToTop(cloud2);
            game.world.bringToTop(cloud3);
            
            game.world.bringToTop(gate);
            game.world.bringToTop(ghost);
            game.world.bringToTop(giraffe);
            game.world.bringToTop(globe);
            game.world.bringToTop(gloves);
            game.world.bringToTop(goat);
            game.world.bringToTop(grapes);
            game.world.bringToTop(grasshoper);
            game.world.bringToTop(guava);
            game.world.bringToTop(guitar);
            
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
            game.world.bringToTop(game.rightArrow);
            
            */
            
            if(gateFlag == 1){gate.angle += 2;}
            if(ghostFlag == 1){ghost.angle += 2;}
            if(giraffeFlag == 1){giraffe.angle += 2;}
            if(globeFlag == 1){globe.angle += 2;}
            if(glovesFlag == 1){gloves.angle += 2;}
            if(grasshoperFlag == 1){goat.angle += 2;}
            if(grapesFlag == 1){grapes.angle += 2;}
            if(goatFlag == 1){grasshoper.angle += 2;}
            if(guavaFlag == 1){guava.angle += 2;}
            if(guitarFlag == 1){guitar.angle += 2;}
            
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
            
            if(gObjectClicked == 10){
            
                askForLevelH = 1;
                /*game.leftArrow.kill();
                game.rightArrow.kill();*/
           
                game.hButton = game.add.sprite(1170, 730, 'hButton');             
                game.hButton.scale.setTo(1, 1); 
                game.hButton.anchor.setTo(spriteAnchorX, spriteAnchorY);
                
            }
            
        if(askForLevelH == 1){
            
            game.world.bringToTop(game.hButton);
            game.hButton.inputEnabled = true;
            game.hButton.events.onInputDown.add(onDownG, this);
            function onDownG() {
            
                //start next level
                
                this.setGGlobalVaribalesToZero();
                game.state.start('H');
                
            }
        }
           
        },
        
        resetGSpriteFlag: function(){
            
            gateFlag = 0;ghostFlag = 0;giraffeFlag = 0;grasshoperFlag = 0;globeFlag = 0;
            glovesFlag = 0;grapesFlag = 0;goatFlag = 0;guavaFlag = 0;guitarFlag = 0;
            camelFlag = 0;candleFlag = 0;carFlag = 0;catFlag = 0;cheeseFlag = 0;cherryFlag = 0;
            clockFlag = 0;cowFlag = 0;crabFlag = 0;crownFlag = 0;

            gate.angle = 0;ghost.angle = 0;giraffe.angle = 0;goat.angle = 0;globe.angle = 0;
            gloves.angle = 0;grapes.angle = 0;grasshoper.angle = 0;guava.angle = 0;guitar.angle = 0;
            camel.angle = 0;candle.angle = 0;car.angle = 0;cat.angle = 0;cheese.angle = 0;
            cherry.angle = 0;crown.angle = 0;clock.angle = 0;cow.angle = 0;crab.angle = 0;
           
        },
       
        setColorGFlagToZero: function(){
            
            bubbleSound.play(); blueFlag = 0;greenFlag = 0; redFlag = 0; cyanFlag = 0; pinkFlag = 0; orangeFlag = 0;
        },
        
        setGGlobalVaribalesToZero: function(){
            
            
            gateFlag = 0;ghostFlag = 0;giraffeFlag = 0;grasshoperFlag = 0;globeFlag = 0;
            glovesFlag = 0;grapesFlag = 0;goatFlag = 0;guavaFlag = 0;guitarFlag = 0;
            camelFlag = 0;candleFlag = 0;carFlag = 0;catFlag = 0;cheeseFlag = 0;cherryFlag = 0;
            clockFlag = 0;cowFlag = 0;crabFlag = 0;crownFlag = 0;



            greenFlag = 0;blueFlag = 0;orangeFlag = 0;redFlag = 0;pinkFlag = 0;cyanFlag = 0;
        }
        
        
    };
