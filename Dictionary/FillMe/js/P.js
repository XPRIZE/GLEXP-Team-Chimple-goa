        
    var pObjectClicked = 0;
    var askForLevelQ = 0;
    
    
    var pandaFlag = 0;
    var parachuteFlag = 0;
    var parrotFlag = 0;            
    var peacockFlag = 0;
    var penFlag = 0;
    var pencilFlag = 0;
    var penguinFlag = 0;
    var pigFlag = 0;
    var pineappleFlag = 0;
    var pumkinFlag = 0;
    
    
    var P = {

        preload: function () {

            //setting default path for assets to be used in game
            this.load.path = './assets/P/';
            
            
            
            this.load.image("transPanda", "transPanda.png");
            this.load.image("transParachute", "transParachute.png");
            this.load.image("transParrot", "transParrot.png");
            this.load.image("transPeacock", "transPeacock.png");
            this.load.image("transPen", "transPen.png");
            this.load.image("transPencil", "transPencil.png");
            this.load.image("transPenguin", "transPenguin.png");
            this.load.image("transPig", "transPig.png");
            this.load.image("transPineapple", "transPineapple.png");
            this.load.image("transPumkin", "transPumkin.png");
            
            this.load.image("panda", "panda.png");
            this.load.image("parachute", "parachute.png");
            this.load.image("parrot", "parrot.png");
            this.load.image("peacock", "peacock.png");
            this.load.image("pen", "pen.png");
            this.load.image("pencil", "pencil.png");
            this.load.image("penguin", "penguin.png");
            this.load.image("pig", "pig.png");
            this.load.image("pineapple", "pineapple.png");
            this.load.image("pumkin", "pumkin.png");
            
            
            //loading assets for the level  P
            
            //loading shades
            this.load.image("blue", "blue.png");
            this.load.image("cyan", "cyan.png");
            this.load.image("green", "green.png");
            this.load.image("orange", "orange.png");
            this.load.image("pink", "pink.png");
            this.load.image("red", "red.png");
    
            this.load.image("bg", "bg.png");
            this.load.image("pLetter", "pLetter.png");
            this.load.image("qButton", "qButton.png");
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
                
            
            
            
            //Main letter P
            pLetter = game.add.sprite(gameMinWidth, gameMinHeight, 'pLetter');
            pLetter.inputEnabled = true;
            pLetter.events.onInputDown.add(this.onDownpLetter, this);
            
            
            
            //Objects starting from P
                    
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
            
            
            
            
            panda = game.add.sprite(objectsPositions[0].x, objectsPositions[0].y, 'panda');
            panda.anchor.setTo(spriteAnchorX, spriteAnchorY);
            panda.scale.setTo(spriteScaleX, spriteScaleY);
            panda.inputEnabled = true;
            panda.events.onInputDown.add(onDownpanda, this);
            function onDownpanda() {this.resetPSpriteFlag(); pandaFlag = 1;pObjectClicked++;}

            
            
            
            parachute = game.add.sprite(objectsPositions[10].x, objectsPositions[10].y, 'parachute');
            parachute.anchor.setTo(spriteAnchorX, spriteAnchorY);
            parachute.scale.setTo(spriteScaleX, spriteScaleY);
            parachute.inputEnabled = true;
            parachute.events.onInputDown.add(onDownparachute, this);
            function onDownparachute() {this.resetPSpriteFlag(); parachuteFlag = 1;pObjectClicked++;}

            
            
            
            parrot = game.add.sprite(objectsPositions[1].x, objectsPositions[1].y, 'parrot');
            parrot.anchor.setTo(spriteAnchorX, spriteAnchorY);
            parrot.scale.setTo(spriteScaleX, spriteScaleY);
            parrot.inputEnabled = true;
            parrot.events.onInputDown.add(onDownparrot, this);
            function onDownparrot() {this.resetPSpriteFlag(); parrotFlag = 1;pObjectClicked++;}
            
            
            
            
            peacock = game.add.sprite(objectsPositions[11].x, objectsPositions[11].y, 'peacock');
            peacock.anchor.setTo(spriteAnchorX, spriteAnchorY);
            peacock.scale.setTo(spriteScaleX, spriteScaleY);
            peacock.inputEnabled = true;
            peacock.events.onInputDown.add(onDownpeacock, this);
            function onDownpeacock() {this.resetPSpriteFlag(); peacockFlag = 1;pObjectClicked++;}
            
            
            
            pen = game.add.sprite(objectsPositions[2].x, objectsPositions[2].y, 'pen');
            pen.anchor.setTo(spriteAnchorX, spriteAnchorY);
            pen.scale.setTo(spriteScaleX, spriteScaleY);
            pen.inputEnabled = true;
            pen.events.onInputDown.add(onDownpen, this);
            function onDownpen() {this.resetPSpriteFlag(); penFlag = 1;pObjectClicked++;}
            
            pencil = game.add.sprite(objectsPositions[12].x, objectsPositions[12].y, 'pencil');
            pencil.anchor.setTo(spriteAnchorX, spriteAnchorY);
            pencil.scale.setTo(spriteScaleX, spriteScaleY);
            pencil.inputEnabled = true;
            pencil.events.onInputDown.add(onDownpencil, this);
            function onDownpencil() {this.resetPSpriteFlag(); pigFlag = 1;pObjectClicked++;}

            
            penguin = game.add.sprite(objectsPositions[3].x, objectsPositions[3].y, 'penguin');
            penguin.anchor.setTo(spriteAnchorX, spriteAnchorY);
            penguin.scale.setTo(spriteScaleX, spriteScaleY);
            penguin.inputEnabled = true;  
            penguin.events.onInputDown.add(onDownpenguin, this);
            function onDownpenguin() {this.resetPSpriteFlag(); penguinFlag = 1;pObjectClicked++;}
            
            
            pig = game.add.sprite(objectsPositions[13].x, objectsPositions[13].y, 'pig');
            pig.anchor.setTo(spriteAnchorX, spriteAnchorY);
            pig.scale.setTo(spriteScaleX, spriteScaleY);
            pig.inputEnabled = true;
            pig.events.onInputDown.add(onDownpig, this);
            function onDownpig() {this.resetPSpriteFlag(); pencilFlag = 1;pObjectClicked++;}
            
            
            pineapple = game.add.sprite(objectsPositions[4].x, objectsPositions[4].y, 'pineapple');
            pineapple.anchor.setTo(spriteAnchorX, spriteAnchorY);
            pineapple.scale.setTo(spriteScaleX, spriteScaleY);
            pineapple.inputEnabled = true;
            pineapple.events.onInputDown.add(onDownpineapple, this);
            function onDownpineapple() {this.resetPSpriteFlag(); pineappleFlag = 1;pObjectClicked++;}
            
            
            pumkin = game.add.sprite(objectsPositions[14].x, objectsPositions[14].y, 'pumkin');
            pumkin.anchor.setTo(spriteAnchorX, spriteAnchorY);
            pumkin.scale.setTo(spriteScaleX, spriteScaleY);
            pumkin.inputEnabled = true;
            pumkin.events.onInputDown.add(onDownpumkin, this);
            function onDownpumkin() {this.resetPSpriteFlag(); pumkinFlag = 1;pObjectClicked++;}
            
            
            
            //Adding other sprites        
            
            camel = game.add.sprite(objectsPositions[5].x, objectsPositions[5].y, 'camel');
            camel.anchor.setTo(spriteAnchorX, spriteAnchorY);
            camel.scale.setTo(spriteScaleX, spriteScaleY);
            camel.inputEnabled = true;
            camel.events.onInputDown.add(onDownCamel, this);
            function onDownCamel() {this.resetPSpriteFlag(); camelFlag = 1;}
            
            
            
            
            candle = game.add.sprite(objectsPositions[15].x, objectsPositions[15].y, 'candle');
            candle.anchor.setTo(spriteAnchorX, spriteAnchorY);
            candle.scale.setTo(spriteScaleX, spriteScaleY);
            candle.inputEnabled = true;
            candle.events.onInputDown.add(onDownCandle, this);
            function onDownCandle() {this.resetPSpriteFlag(); candleFlag = 1; }
            
            
            car = game.add.sprite(objectsPositions[6].x, objectsPositions[6].y, 'car');
            car.anchor.setTo(spriteAnchorX, spriteAnchorY);
            car.scale.setTo(spriteScaleX, spriteScaleY);
            car.inputEnabled = true;
            car.events.onInputDown.add(onDownCar, this);
            function onDownCar() {this.resetPSpriteFlag(); carFlag = 1;}
            
            cat = game.add.sprite(objectsPositions[16].x, objectsPositions[16].y, 'cat');
            cat.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cat.scale.setTo(spriteScaleX, spriteScaleY);
            cat.inputEnabled = true;
            cat.events.onInputDown.add(onDownCat, this);
            function onDownCat() {this.resetPSpriteFlag(); catFlag = 1;}
            
            
            cheese = game.add.sprite(objectsPositions[7].x, objectsPositions[7].y, 'cheese');
            cheese.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cheese.scale.setTo(spriteScaleX, spriteScaleY);
            cheese.inputEnabled = true;
            cheese.events.onInputDown.add(onDownCheese, this);
            function onDownCheese() {this.resetPSpriteFlag(); cheeseFlag = 1;}
            
            
            cherry = game.add.sprite(objectsPositions[17].x, objectsPositions[17].y, 'cherry');
            cherry.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cherry.scale.setTo(spriteScaleX, spriteScaleY);
            cherry.inputEnabled = true;
            cherry.events.onInputDown.add(onDownCherry, this);
            function onDownCherry() {this.resetPSpriteFlag(); cherryFlag = 1;}
            
            
            clock = game.add.sprite(objectsPositions[8].x, objectsPositions[8].y, 'clock');
            clock.anchor.setTo(spriteAnchorX, spriteAnchorY);
            clock.scale.setTo(spriteScaleX, spriteScaleY);
            clock.inputEnabled = true;
            clock.events.onInputDown.add(onDownClock, this);
            function onDownClock() {this.resetPSpriteFlag(); clockFlag = 1;}
            
            
            
            cow = game.add.sprite(objectsPositions[18].x, objectsPositions[18].y, 'cow');
            cow.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cow.scale.setTo(spriteScaleX, spriteScaleY);
            cow.inputEnabled = true;
            cow.events.onInputDown.add(onDownCow, this);
            function onDownCow() {this.resetPSpriteFlag(); cowFlag = 1;}
            
            
            crab = game.add.sprite(objectsPositions[9].x, objectsPositions[9].y, 'crab');
            crab.anchor.setTo(spriteAnchorX, spriteAnchorY);
            crab.scale.setTo(spriteScaleX, spriteScaleY);
            crab.inputEnabled = true;
            crab.events.onInputDown.add(onDownCrab, this);
            function onDownCrab() {this.resetPSpriteFlag(); crabFlag = 1;}
            
            
            crown = game.add.sprite(objectsPositions[19].x, objectsPositions[19].y, 'crown');
            crown.anchor.setTo(spriteAnchorX, spriteAnchorY);
            crown.scale.setTo(spriteScaleX, spriteScaleY);
            crown.inputEnabled = true;
            crown.events.onInputDown.add(onDownCrown, this);
            function onDownCrown() {this.resetPSpriteFlag(); crownFlag = 1;}
            
           /* game.leftArrow = game.add.sprite(1070, 730, 'leftArrow');             
            game.leftArrow.scale.setTo(1, 1); 
            game.leftArrow.anchor.setTo(spriteAnchorX, spriteAnchorY);
            game.leftArrow.inputEnabled = true;
            game.leftArrow.events.onInputDown.add(onDownLeftArrow, this);
            function onDownLeftArrow() {this.setPGlobalVaribalesToZero();game.state.start('O');}
            
            
            game.rightArrow = game.add.sprite(1170, 730, 'rightArrow');             
            game.rightArrow.scale.setTo(1, 1); 
            game.rightArrow.anchor.setTo(spriteAnchorX, spriteAnchorY);
            game.rightArrow.inputEnabled = true;
            game.rightArrow.events.onInputDown.add(onDownRightArrow, this);
            function onDownRightArrow() {this.setPGlobalVaribalesToZero();game.state.start('Q');}
            */
            //Color shades
            blue = game.add.sprite(objectsPositions[20].x, objectsPositions[20].y, 'blue');
            blue.anchor.setTo(spriteAnchorX, spriteAnchorY);
            blue.scale.setTo(shadeScaleX, shadeScaleY);
            blue.inputEnabled = true;
            blue.tint = 0x456AC1; 
            blue.events.onInputDown.add(onDownBlue, this);
            function onDownBlue() {this.setColorPFlagToZero(); blueFlag = 1;}
           
            
            cyan = game.add.sprite(objectsPositions[21].x, objectsPositions[21].y, 'cyan');
            cyan.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cyan.scale.setTo(shadeScaleX, shadeScaleY);
            cyan.inputEnabled = true;
            cyan.tint = 0x45C1C1; 
            cyan.events.onInputDown.add(onDownCyan, this);
            function onDownCyan() {this.setColorPFlagToZero(); cyanFlag = 1;}
            
            
            
            green = game.add.sprite(objectsPositions[22].x, objectsPositions[22].y, 'green');
            green.anchor.setTo(spriteAnchorX, spriteAnchorY);
            green.scale.setTo(shadeScaleX, shadeScaleY);
            green.inputEnabled = true;
            green.tint = 0x51C735;
            green.events.onInputDown.add(onDownGreen, this);
            function onDownGreen() {this.setColorPFlagToZero(); greenFlag = 1;}
            
            
            orange = game.add.sprite(objectsPositions[23].x, objectsPositions[23].y, 'orange');
            orange.anchor.setTo(spriteAnchorX, spriteAnchorY);
            orange.scale.setTo(shadeScaleX, shadeScaleY);
            orange.inputEnabled = true;
            orange.tint = 0xF38932;
            orange.events.onInputDown.add(onDownOrange, this);
            function onDownOrange() {this.setColorPFlagToZero(); orangeFlag = 1;}
           
            
            pink = game.add.sprite(objectsPositions[24].x, objectsPositions[24].y, 'pink');
            pink.anchor.setTo(spriteAnchorX, spriteAnchorY);
            pink.scale.setTo(shadeScaleX, shadeScaleY);
            pink.inputEnabled = true;
            pink.tint = 0xCC3ACC;
            pink.events.onInputDown.add(onDownPink, this);
            function onDownPink() {this.setColorPFlagToZero(); pinkFlag = 1;}
            
            
            red = game.add.sprite(objectsPositions[25].x, objectsPositions[25].y, 'red');
            red.anchor.setTo(spriteAnchorX, spriteAnchorY);
            red.scale.setTo(shadeScaleX, shadeScaleY);
            red.inputEnabled = true;
            red.tint = 0xE32424;
            red.events.onInputDown.add(onDownRed, this);
            function onDownRed() {this.setColorPFlagToZero(); redFlag = 1;}
                
        },
        
        onDownpLetter: function() {
                
            //panda
                    if(pandaFlag == 1 && greenFlag == 1 ){var greenpanda = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transPanda');greenpanda.tint =  0x51C735; greenpanda.scale.setTo(spriteScaleX, spriteScaleY); 
greenpanda.anchor.setTo(0.6, 0.6);stickSound.play();}                    
                    
                    if(pandaFlag == 1 && blueFlag == 1){var bluepanda = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transPanda'); bluepanda.tint =  0x456AC1; bluepanda.scale.setTo(spriteScaleX, spriteScaleY); bluepanda.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(pandaFlag == 1 && orangeFlag == 1){var orangepanda = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transPanda'); orangepanda.tint =  0xF38932; orangepanda.scale.setTo(spriteScaleX, spriteScaleY); orangepanda.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(pandaFlag == 1 && redFlag == 1){var redpanda = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transPanda'); redpanda.tint =  0xE32424; redpanda.scale.setTo(spriteScaleX, spriteScaleY); redpanda.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(pandaFlag == 1 && pinkFlag == 1){var pinkpanda = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transPanda'); pinkpanda.tint =  0xCC3ACC; pinkpanda.scale.setTo(spriteScaleX, spriteScaleY); pinkpanda.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(pandaFlag == 1 && cyanFlag == 1){var cyanpanda = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transPanda'); cyanpanda.tint =  0x45C1C1; cyanpanda.scale.setTo(spriteScaleX, spriteScaleY); cyanpanda.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //parachute    
                    if(parachuteFlag == 1 && greenFlag == 1 ){var greenparachute = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transParachute');greenparachute.tint =  0x51C735; greenparachute.scale.setTo(spriteScaleX, spriteScaleY); 
greenparachute.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(parachuteFlag == 1 && blueFlag == 1){var blueparachute = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transParachute'); blueparachute.tint =  0x456AC1; blueparachute.scale.setTo(spriteScaleX, spriteScaleY); blueparachute.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(parachuteFlag == 1 && orangeFlag == 1){var orangeparachute = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transParachute'); orangeparachute.tint =  0xF38932; orangeparachute.scale.setTo(spriteScaleX, spriteScaleY); orangeparachute.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(parachuteFlag == 1 && redFlag == 1){var redparachute = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transParachute'); redparachute.tint =  0xE32424; redparachute.scale.setTo(spriteScaleX, spriteScaleY); redparachute.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(parachuteFlag == 1 && pinkFlag == 1){var pinkparachute = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transParachute'); pinkparachute.tint =  0xCC3ACC; pinkparachute.scale.setTo(spriteScaleX, spriteScaleY); pinkparachute.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(parachuteFlag == 1 && cyanFlag == 1){var cyanparachute = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transParachute'); cyanparachute.tint =  0x45C1C1; cyanparachute.scale.setTo(spriteScaleX, spriteScaleY); cyanparachute.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //parrot    
                    if(parrotFlag == 1 && greenFlag == 1 ){var greenparrot = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transParrot');greenparrot.tint =  0x51C735; greenparrot.scale.setTo(spriteScaleX, spriteScaleY); 
greenparrot.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(parrotFlag == 1 && blueFlag == 1){var blueparrot = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transParrot'); blueparrot.tint =  0x456AC1; blueparrot.scale.setTo(spriteScaleX, spriteScaleY); blueparrot.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(parrotFlag == 1 && orangeFlag == 1){var orangeparrot = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transParrot'); orangeparrot.tint =  0xF38932; orangeparrot.scale.setTo(spriteScaleX, spriteScaleY); orangeparrot.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(parrotFlag == 1 && redFlag == 1){var redparrot = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transParrot'); redparrot.tint =  0xE32424; redparrot.scale.setTo(spriteScaleX, spriteScaleY); redparrot.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(parrotFlag == 1 && pinkFlag == 1){var pinkparrot = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transParrot'); pinkparrot.tint =  0xCC3ACC; pinkparrot.scale.setTo(spriteScaleX, spriteScaleY); pinkparrot.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(parrotFlag == 1 && cyanFlag == 1){var cyanparrot = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transParrot'); cyanparrot.tint =  0x45C1C1; cyanparrot.scale.setTo(spriteScaleX, spriteScaleY); cyanparrot.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //peacock
                    if(peacockFlag == 1 && greenFlag == 1 ){var greenpeacock = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transPeacock');greenpeacock.tint =  0x51C735; greenpeacock.scale.setTo(spriteScaleX, spriteScaleY); 
greenpeacock.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(peacockFlag == 1 && blueFlag == 1){console.log("bluepeacock plotted");var bluepeacock = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transPeacock'); bluepeacock.tint =  0x456AC1; bluepeacock.scale.setTo(spriteScaleX, spriteScaleY); bluepeacock.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(peacockFlag == 1 && orangeFlag == 1){var orangepeacock = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transPeacock'); orangepeacock.tint =  0xF38932; orangepeacock.scale.setTo(spriteScaleX, spriteScaleY); orangepeacock.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(peacockFlag == 1 && redFlag == 1){var redpeacock = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transPeacock'); redpeacock.tint =  0xE32424; redpeacock.scale.setTo(spriteScaleX, spriteScaleY); redpeacock.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(peacockFlag == 1 && pinkFlag == 1){var pinkpeacock = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transPeacock'); pinkpeacock.tint =  0xCC3ACC; pinkpeacock.scale.setTo(spriteScaleX, spriteScaleY); pinkpeacock.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(peacockFlag == 1 && cyanFlag == 1){var cyanpeacock = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transPeacock'); cyanpeacock.tint =  0x45C1C1; cyanpeacock.scale.setTo(spriteScaleX, spriteScaleY); cyanpeacock.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //pen    
                    if(penFlag == 1 && greenFlag == 1 ){var greenpen = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transPen');greenpen.tint =  0x51C735; greenpen.scale.setTo(spriteScaleX, spriteScaleY); 
greenpen.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(penFlag == 1 && blueFlag == 1){console.log("bluepen plotted");var bluepen = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transPen'); bluepen.tint =  0x456AC1; bluepen.scale.setTo(spriteScaleX, spriteScaleY); bluepen.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(penFlag == 1 && orangeFlag == 1){var orangepen = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transPen'); orangepen.tint =  0xF38932; orangepen.scale.setTo(spriteScaleX, spriteScaleY); orangepen.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(penFlag == 1 && redFlag == 1){var redpen = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transPen'); redpen.tint =  0xE32424; redpen.scale.setTo(spriteScaleX, spriteScaleY); redpen.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(penFlag == 1 && pinkFlag == 1){var pinkpen = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transPen'); pinkpen.tint =  0xCC3ACC; pinkpen.scale.setTo(spriteScaleX, spriteScaleY); pinkpen.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(penFlag == 1 && cyanFlag == 1){var cyanpen = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transPen'); cyanpen.tint =  0x45C1C1; cyanpen.scale.setTo(spriteScaleX, spriteScaleY); cyanpen.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //pencil   
                    if(pigFlag == 1 && greenFlag == 1 ){var greenpencil = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transPencil');greenpencil.tint =  0x51C735; greenpencil.scale.setTo(spriteScaleX, spriteScaleY); 
greenpencil.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(pigFlag == 1 && blueFlag == 1){console.log("bluepencil plotted");var bluepencil = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transPencil'); bluepencil.tint =  0x456AC1; bluepencil.scale.setTo(spriteScaleX, spriteScaleY); bluepencil.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(pigFlag == 1 && orangeFlag == 1){var orangepencil = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transPencil'); orangepencil.tint =  0xF38932; orangepencil.scale.setTo(spriteScaleX, spriteScaleY); orangepencil.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(pigFlag == 1 && redFlag == 1){var redpencil = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transPencil'); redpencil.tint =  0xE32424; redpencil.scale.setTo(spriteScaleX, spriteScaleY); redpencil.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(pigFlag == 1 && pinkFlag == 1){var pinkpencil = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transPencil'); pinkpencil.tint =  0xCC3ACC; pinkpencil.scale.setTo(spriteScaleX, spriteScaleY); pinkpencil.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(pigFlag == 1 && cyanFlag == 1){var cyanpencil = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transPencil'); cyanpencil.tint =  0x45C1C1; cyanpencil.scale.setTo(spriteScaleX, spriteScaleY); cyanpencil.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //penguin    
                    if(penguinFlag == 1 && greenFlag == 1 ){var greenpenguin = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transPenguin');greenpenguin.tint =  0x51C735; greenpenguin.scale.setTo(spriteScaleX, spriteScaleY); 
greenpenguin.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(penguinFlag == 1 && blueFlag == 1){console.log("bluepenguin plotted");var bluepenguin = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transPenguin'); bluepenguin.tint =  0x456AC1; bluepenguin.scale.setTo(spriteScaleX, spriteScaleY); bluepenguin.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(penguinFlag == 1 && orangeFlag == 1){var orangepenguin = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transPenguin'); orangepenguin.tint =  0xF38932; orangepenguin.scale.setTo(spriteScaleX, spriteScaleY); orangepenguin.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(penguinFlag == 1 && redFlag == 1){var redpenguin = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transPenguin'); redpenguin.tint =  0xE32424; redpenguin.scale.setTo(spriteScaleX, spriteScaleY); redpenguin.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(penguinFlag == 1 && pinkFlag == 1){var pinkpenguin = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transPenguin'); pinkpenguin.tint =  0xCC3ACC; pinkpenguin.scale.setTo(spriteScaleX, spriteScaleY); pinkpenguin.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(penguinFlag == 1 && cyanFlag == 1){var cyanpenguin = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transPenguin'); cyanpenguin.tint =  0x45C1C1; cyanpenguin.scale.setTo(spriteScaleX, spriteScaleY); cyanpenguin.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //pig    
                    if(pencilFlag == 1 && greenFlag == 1 ){var greenpig = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transPig');greenpig.tint =  0x51C735; greenpig.scale.setTo(spriteScaleX, spriteScaleY); 
greenpig.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(pencilFlag == 1 && blueFlag == 1){console.log("bluepig plotted");var bluepig = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transPig'); bluepig.tint =  0x456AC1; bluepig.scale.setTo(spriteScaleX, spriteScaleY); bluepig.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(pencilFlag == 1 && orangeFlag == 1){var orangepig = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transPig'); orangepig.tint =  0xF38932; orangepig.scale.setTo(spriteScaleX, spriteScaleY); orangepig.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(pencilFlag == 1 && redFlag == 1){var redpig = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transPig'); redpig.tint =  0xE32424; redpig.scale.setTo(spriteScaleX, spriteScaleY); redpig.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(pencilFlag == 1 && pinkFlag == 1){var pinkpig = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transPig'); pinkpig.tint =  0xCC3ACC; pinkpig.scale.setTo(spriteScaleX, spriteScaleY); pinkpig.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(pencilFlag == 1 && cyanFlag == 1){var cyanpig = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transPig'); cyanpig.tint =  0x45C1C1; cyanpig.scale.setTo(spriteScaleX, spriteScaleY); cyanpig.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //pineapple    
                    if(pineappleFlag == 1 && greenFlag == 1 ){var greenpineapple = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transPineapple');greenpineapple.tint =  0x51C735; greenpineapple.scale.setTo(spriteScaleX, spriteScaleY); 
greenpineapple.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(pineappleFlag == 1 && blueFlag == 1){console.log("bluepineapple plotted");var bluepineapple = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transPineapple'); bluepineapple.tint =  0x456AC1; bluepineapple.scale.setTo(spriteScaleX, spriteScaleY); bluepineapple.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(pineappleFlag == 1 && orangeFlag == 1){var orangepineapple = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transPineapple'); orangepineapple.tint =  0xF38932; orangepineapple.scale.setTo(spriteScaleX, spriteScaleY); orangepineapple.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(pineappleFlag == 1 && redFlag == 1){var redpineapple = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transPineapple'); redpineapple.tint =  0xE32424; redpineapple.scale.setTo(spriteScaleX, spriteScaleY); redpineapple.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(pineappleFlag == 1 && pinkFlag == 1){var pinkpineapple = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transPineapple'); pinkpineapple.tint =  0xCC3ACC; pinkpineapple.scale.setTo(spriteScaleX, spriteScaleY); pinkpineapple.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(pineappleFlag == 1 && cyanFlag == 1){var cyanpineapple = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transPineapple'); cyanpineapple.tint =  0x45C1C1; cyanpineapple.scale.setTo(spriteScaleX, spriteScaleY); cyanpineapple.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //pumkin 
                    if(pumkinFlag == 1 && greenFlag == 1 ){var greenpumkin = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transPumkin');greenpumkin.tint =  0x51C735; greenpumkin.scale.setTo(spriteScaleX, spriteScaleY); 
greenpumkin.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(pumkinFlag == 1 && blueFlag == 1){console.log("bluepumkin plotted");var bluepumkin = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transPumkin'); bluepumkin.tint =  0x456AC1; bluepumkin.scale.setTo(spriteScaleX, spriteScaleY); bluepumkin.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(pumkinFlag == 1 && orangeFlag == 1){var orangepumkin = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transPumkin'); orangepumkin.tint =  0xF38932; orangepumkin.scale.setTo(spriteScaleX, spriteScaleY); orangepumkin.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(pumkinFlag == 1 && redFlag == 1){var redpumkin = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transPumkin'); redpumkin.tint =  0xE32424; redpumkin.scale.setTo(spriteScaleX, spriteScaleY); redpumkin.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(pumkinFlag == 1 && pinkFlag == 1){var pinkpumkin = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transPumkin'); pinkpumkin.tint =  0xCC3ACC; pinkpumkin.scale.setTo(spriteScaleX, spriteScaleY); pinkpumkin.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(pumkinFlag == 1 && cyanFlag == 1){var cyanpumkin = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transPumkin'); cyanpumkin.tint =  0x45C1C1; cyanpumkin.scale.setTo(spriteScaleX, spriteScaleY); cyanpumkin.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
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
            
            game.world.bringToTop(pLetter);
            
            game.world.bringToTop(blue);
            game.world.bringToTop(green);
            game.world.bringToTop(red);
            game.world.bringToTop(cyan);
            game.world.bringToTop(orange);
            game.world.bringToTop(pink);
            
            game.world.bringToTop(cloud1);
            game.world.bringToTop(cloud2);
            game.world.bringToTop(cloud3);
            
            game.world.bringToTop(panda);
            game.world.bringToTop(parachute);
            game.world.bringToTop(parrot);
            game.world.bringToTop(peacock);
            game.world.bringToTop(pen);
            game.world.bringToTop(pencil);
            game.world.bringToTop(penguin);
            game.world.bringToTop(pig);
            game.world.bringToTop(pineapple);
            game.world.bringToTop(pumkin);
            
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
            /*game.world.bringToTop(game.leftArrow);
            game.world.bringToTop(game.rightArrow);*/

            
            
            if(pandaFlag == 1){panda.angle += 2;}
            if(parachuteFlag == 1){parachute.angle += 2;}
            if(parrotFlag == 1){parrot.angle += 2;}
            if(peacockFlag == 1){peacock.angle += 2;}
            if(penFlag == 1){pen.angle += 2;}
            if(pigFlag == 1){pencil.angle += 2;}
            if(penguinFlag == 1){penguin.angle += 2;}
            if(pencilFlag == 1){pig.angle += 2;}
            if(pineappleFlag == 1){pineapple.angle += 2;}
            if(pumkinFlag == 1){pumkin.angle += 2;}
            
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
            
            if(pObjectClicked == 10){
            
                askForLevelQ = 1;
               /* game.leftArrow.kill();
                game.rightArrow.kill();*/
                game.qButton = game.add.sprite(1170, 730, 'qButton');             
                game.qButton.scale.setTo(1, 1); 
                game.qButton.anchor.setTo(spriteAnchorX, spriteAnchorY);
                
            }
            
        if(askForLevelQ == 1){
            
            game.world.bringToTop(game.qButton);
            game.qButton.inputEnabled = true;
            game.qButton.events.onInputDown.add(onDownQ, this);
            function onDownQ() {
            
                //start next level
                
                this.setPGlobalVaribalesToZero();
                game.state.start('Q');
                
            }
        }
           
        },
        
        resetPSpriteFlag: function(){
            
            pandaFlag = 0;parachuteFlag = 0;parrotFlag = 0;pigFlag = 0;peacockFlag = 0;
            penFlag = 0;penguinFlag = 0;pencilFlag = 0;pineappleFlag = 0;pumkinFlag = 0;
            camelFlag = 0;candleFlag = 0;carFlag = 0;catFlag = 0;cheeseFlag = 0;cherryFlag = 0;
            clockFlag = 0;cowFlag = 0;crabFlag = 0;crownFlag = 0;

            panda.angle = 0;parachute.angle = 0;parrot.angle = 0;pencil.angle = 0;peacock.angle = 0;
            pen.angle = 0;penguin.angle = 0;pig.angle = 0;pineapple.angle = 0;pumkin.angle = 0;
            camel.angle = 0;candle.angle = 0;car.angle = 0;cat.angle = 0;cheese.angle = 0;
            cherry.angle = 0;crown.angle = 0;clock.angle = 0;cow.angle = 0;crab.angle = 0;
           
        },
       
        setColorPFlagToZero: function(){
            
            bubbleSound.play(); blueFlag = 0;greenFlag = 0; redFlag = 0; cyanFlag = 0; pinkFlag = 0; orangeFlag = 0;
        },
        
        setPGlobalVaribalesToZero: function(){
            
            
            pandaFlag = 0;parachuteFlag = 0;parrotFlag = 0;pigFlag = 0;peacockFlag = 0;
            penFlag = 0;penguinFlag = 0;pencilFlag = 0;pineappleFlag = 0;pumkinFlag = 0;
            camelFlag = 0;candleFlag = 0;carFlag = 0;catFlag = 0;cheeseFlag = 0;cherryFlag = 0;
            clockFlag = 0;cowFlag = 0;crabFlag = 0;crownFlag = 0;



            greenFlag = 0;blueFlag = 0;orangeFlag = 0;redFlag = 0;pinkFlag = 0;cyanFlag = 0;
        }
        
        
    };
