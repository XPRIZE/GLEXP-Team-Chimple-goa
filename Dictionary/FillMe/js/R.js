        
    var rObjectClicked = 0;
    var askForLevelS = 0;
    
    
    var rabbitFlag = 0;
    var racketFlag = 0;
    var radioFlag = 0;            
    var ratFlag = 0;
    var ribbonFlag = 0;
    var ringFlag = 0;
    var robotFlag = 0;
    var rockFlag = 0;
    var rocketFlag = 0;
    var rulerFlag = 0;
    
    
    var R = {

        preload: function () {

            //setting default path for assets to be used in game
            this.load.path = './assets/R/';
            
            
            
            this.load.image("transRabbit", "transRabbit.png");
            this.load.image("transRacket", "transRacket.png");
            this.load.image("transRadio", "transRadio.png");
            this.load.image("transRat", "transRat.png");
            this.load.image("transRibbon", "transRibbon.png");
            this.load.image("transRing", "transRing.png");
            this.load.image("transRobot", "transRobot.png");
            this.load.image("transRock", "transRock.png");
            this.load.image("transRocket", "transRocket.png");
            this.load.image("transRuler", "transRuler.png");
            
            this.load.image("rabbit", "rabbit.png");
            this.load.image("racket", "racket.png");
            this.load.image("radio", "radio.png");
            this.load.image("rat", "rat.png");
            this.load.image("ribbon", "ribbon.png");
            this.load.image("ring", "ring.png");
            this.load.image("robot", "robot.png");
            this.load.image("rock", "rock.png");
            this.load.image("rocket", "rocket.png");
            this.load.image("ruler", "ruler.png");
            
            
            //loading assets for the level  R
            
            //loading shades
            this.load.image("blue", "blue.png");
            this.load.image("cyan", "cyan.png");
            this.load.image("green", "green.png");
            this.load.image("orange", "orange.png");
            this.load.image("pink", "pink.png");
            this.load.image("red", "red.png");
    
            this.load.image("bg", "bg.png");
            this.load.image("rLetter", "rLetter.png");
            this.load.image("sButton", "sButton.png");
            
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
                
            
            
            
            //Main letter R
            rLetter = game.add.sprite(gameMinWidth, gameMinHeight, 'rLetter');
            rLetter.inputEnabled = true;
            rLetter.events.onInputDown.add(this.onDownrLetter, this);
            
            
            
            //Objects starting from R
                    
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
            
            
            
            
            rabbit = game.add.sprite(objectsPositions[0].x, objectsPositions[0].y, 'rabbit');
            rabbit.anchor.setTo(spriteAnchorX, spriteAnchorY);
            rabbit.scale.setTo(spriteScaleX, spriteScaleY);
            rabbit.inputEnabled = true;
            rabbit.events.onInputDown.add(onDownrabbit, this);
            function onDownrabbit() {this.resetRSpriteFlag(); rabbitFlag = 1;rObjectClicked++;}

            
            
            
            racket = game.add.sprite(objectsPositions[10].x, objectsPositions[10].y, 'racket');
            racket.anchor.setTo(spriteAnchorX, spriteAnchorY);
            racket.scale.setTo(spriteScaleX, spriteScaleY);
            racket.inputEnabled = true;
            racket.events.onInputDown.add(onDownracket, this);
            function onDownracket() {this.resetRSpriteFlag(); racketFlag = 1;rObjectClicked++;}

            
            
            
            radio = game.add.sprite(objectsPositions[1].x, objectsPositions[1].y, 'radio');
            radio.anchor.setTo(spriteAnchorX, spriteAnchorY);
            radio.scale.setTo(spriteScaleX, spriteScaleY);
            radio.inputEnabled = true;
            radio.events.onInputDown.add(onDownradio, this);
            function onDownradio() {this.resetRSpriteFlag(); radioFlag = 1;rObjectClicked++;}
            
            
            
            
            rat = game.add.sprite(objectsPositions[11].x, objectsPositions[11].y, 'rat');
            rat.anchor.setTo(spriteAnchorX, spriteAnchorY);
            rat.scale.setTo(spriteScaleX, spriteScaleY);
            rat.inputEnabled = true;
            rat.events.onInputDown.add(onDownrat, this);
            function onDownrat() {this.resetRSpriteFlag(); ratFlag = 1;rObjectClicked++;}
            
            
            
            ribbon = game.add.sprite(objectsPositions[2].x, objectsPositions[2].y, 'ribbon');
            ribbon.anchor.setTo(spriteAnchorX, spriteAnchorY);
            ribbon.scale.setTo(spriteScaleX, spriteScaleY);
            ribbon.inputEnabled = true;
            ribbon.events.onInputDown.add(onDownribbon, this);
            function onDownribbon() {this.resetRSpriteFlag(); ribbonFlag = 1;rObjectClicked++;}
            
            ring = game.add.sprite(objectsPositions[12].x, objectsPositions[12].y, 'ring');
            ring.anchor.setTo(spriteAnchorX, spriteAnchorY);
            ring.scale.setTo(spriteScaleX, spriteScaleY);
            ring.inputEnabled = true;
            ring.events.onInputDown.add(onDownring, this);
            function onDownring() {this.resetRSpriteFlag(); rockFlag = 1;rObjectClicked++;}

            
            robot = game.add.sprite(objectsPositions[3].x, objectsPositions[3].y, 'robot');
            robot.anchor.setTo(spriteAnchorX, spriteAnchorY);
            robot.scale.setTo(spriteScaleX, spriteScaleY);
            robot.inputEnabled = true;  
            robot.events.onInputDown.add(onDownrobot, this);
            function onDownrobot() {this.resetRSpriteFlag(); robotFlag = 1;rObjectClicked++;}
            
            
            rock = game.add.sprite(objectsPositions[13].x, objectsPositions[13].y, 'rock');
            rock.anchor.setTo(spriteAnchorX, spriteAnchorY);
            rock.scale.setTo(spriteScaleX, spriteScaleY);
            rock.inputEnabled = true;
            rock.events.onInputDown.add(onDownrock, this);
            function onDownrock() {this.resetRSpriteFlag(); ringFlag = 1;rObjectClicked++;}
            
            
            rocket = game.add.sprite(objectsPositions[4].x, objectsPositions[4].y, 'rocket');
            rocket.anchor.setTo(spriteAnchorX, spriteAnchorY);
            rocket.scale.setTo(spriteScaleX, spriteScaleY);
            rocket.inputEnabled = true;
            rocket.events.onInputDown.add(onDownrocket, this);
            function onDownrocket() {this.resetRSpriteFlag(); rocketFlag = 1;rObjectClicked++;}
            
            
            ruler = game.add.sprite(objectsPositions[14].x, objectsPositions[14].y, 'ruler');
            ruler.anchor.setTo(spriteAnchorX, spriteAnchorY);
            ruler.scale.setTo(spriteScaleX, spriteScaleY);
            ruler.inputEnabled = true;
            ruler.events.onInputDown.add(onDownruler, this);
            function onDownruler() {this.resetRSpriteFlag(); rulerFlag = 1;rObjectClicked++;}
            
            
            
            //Adding other sprites        
            
            camel = game.add.sprite(objectsPositions[5].x, objectsPositions[5].y, 'camel');
            camel.anchor.setTo(spriteAnchorX, spriteAnchorY);
            camel.scale.setTo(spriteScaleX, spriteScaleY);
            camel.inputEnabled = true;
            camel.events.onInputDown.add(onDownCamel, this);
            function onDownCamel() {this.resetRSpriteFlag(); camelFlag = 1;}
            
            
            
            
            candle = game.add.sprite(objectsPositions[15].x, objectsPositions[15].y, 'candle');
            candle.anchor.setTo(spriteAnchorX, spriteAnchorY);
            candle.scale.setTo(spriteScaleX, spriteScaleY);
            candle.inputEnabled = true;
            candle.events.onInputDown.add(onDownCandle, this);
            function onDownCandle() {this.resetRSpriteFlag(); candleFlag = 1; }
            
            
            car = game.add.sprite(objectsPositions[6].x, objectsPositions[6].y, 'car');
            car.anchor.setTo(spriteAnchorX, spriteAnchorY);
            car.scale.setTo(spriteScaleX, spriteScaleY);
            car.inputEnabled = true;
            car.events.onInputDown.add(onDownCar, this);
            function onDownCar() {this.resetRSpriteFlag(); carFlag = 1;}
            
            cat = game.add.sprite(objectsPositions[16].x, objectsPositions[16].y, 'cat');
            cat.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cat.scale.setTo(spriteScaleX, spriteScaleY);
            cat.inputEnabled = true;
            cat.events.onInputDown.add(onDownCat, this);
            function onDownCat() {this.resetRSpriteFlag(); catFlag = 1;}
            
            
            cheese = game.add.sprite(objectsPositions[7].x, objectsPositions[7].y, 'cheese');
            cheese.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cheese.scale.setTo(spriteScaleX, spriteScaleY);
            cheese.inputEnabled = true;
            cheese.events.onInputDown.add(onDownCheese, this);
            function onDownCheese() {this.resetRSpriteFlag(); cheeseFlag = 1;}
            
            
            cherry = game.add.sprite(objectsPositions[17].x, objectsPositions[17].y, 'cherry');
            cherry.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cherry.scale.setTo(spriteScaleX, spriteScaleY);
            cherry.inputEnabled = true;
            cherry.events.onInputDown.add(onDownCherry, this);
            function onDownCherry() {this.resetRSpriteFlag(); cherryFlag = 1;}
            
            
            clock = game.add.sprite(objectsPositions[8].x, objectsPositions[8].y, 'clock');
            clock.anchor.setTo(spriteAnchorX, spriteAnchorY);
            clock.scale.setTo(spriteScaleX, spriteScaleY);
            clock.inputEnabled = true;
            clock.events.onInputDown.add(onDownClock, this);
            function onDownClock() {this.resetRSpriteFlag(); clockFlag = 1;}
            
            
            
            cow = game.add.sprite(objectsPositions[18].x, objectsPositions[18].y, 'cow');
            cow.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cow.scale.setTo(spriteScaleX, spriteScaleY);
            cow.inputEnabled = true;
            cow.events.onInputDown.add(onDownCow, this);
            function onDownCow() {this.resetRSpriteFlag(); cowFlag = 1;}
            
            
            crab = game.add.sprite(objectsPositions[9].x, objectsPositions[9].y, 'crab');
            crab.anchor.setTo(spriteAnchorX, spriteAnchorY);
            crab.scale.setTo(spriteScaleX, spriteScaleY);
            crab.inputEnabled = true;
            crab.events.onInputDown.add(onDownCrab, this);
            function onDownCrab() {this.resetRSpriteFlag(); crabFlag = 1;}
            
            
            crown = game.add.sprite(objectsPositions[19].x, objectsPositions[19].y, 'crown');
            crown.anchor.setTo(spriteAnchorX, spriteAnchorY);
            crown.scale.setTo(spriteScaleX, spriteScaleY);
            crown.inputEnabled = true;
            crown.events.onInputDown.add(onDownCrown, this);
            function onDownCrown() {this.resetRSpriteFlag(); crownFlag = 1;}
            
            
            
            //Color shades
            blue = game.add.sprite(objectsPositions[20].x, objectsPositions[20].y, 'blue');
            blue.anchor.setTo(spriteAnchorX, spriteAnchorY);
            blue.scale.setTo(shadeScaleX, shadeScaleY);
            blue.inputEnabled = true;
            blue.tint = 0x456AC1; 
            blue.events.onInputDown.add(onDownBlue, this);
            function onDownBlue() {this.setColorRFlagToZero(); blueFlag = 1;}
           
            
            cyan = game.add.sprite(objectsPositions[21].x, objectsPositions[21].y, 'cyan');
            cyan.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cyan.scale.setTo(shadeScaleX, shadeScaleY);
            cyan.inputEnabled = true;
            cyan.tint = 0x45C1C1; 
            cyan.events.onInputDown.add(onDownCyan, this);
            function onDownCyan() {this.setColorRFlagToZero(); cyanFlag = 1;}
            
            
            
            green = game.add.sprite(objectsPositions[22].x, objectsPositions[22].y, 'green');
            green.anchor.setTo(spriteAnchorX, spriteAnchorY);
            green.scale.setTo(shadeScaleX, shadeScaleY);
            green.inputEnabled = true;
            green.tint = 0x51C735;
            green.events.onInputDown.add(onDownGreen, this);
            function onDownGreen() {this.setColorRFlagToZero(); greenFlag = 1;}
            
            
            orange = game.add.sprite(objectsPositions[23].x, objectsPositions[23].y, 'orange');
            orange.anchor.setTo(spriteAnchorX, spriteAnchorY);
            orange.scale.setTo(shadeScaleX, shadeScaleY);
            orange.inputEnabled = true;
            orange.tint = 0xF38932;
            orange.events.onInputDown.add(onDownOrange, this);
            function onDownOrange() {this.setColorRFlagToZero(); orangeFlag = 1;}
           
            
            pink = game.add.sprite(objectsPositions[24].x, objectsPositions[24].y, 'pink');
            pink.anchor.setTo(spriteAnchorX, spriteAnchorY);
            pink.scale.setTo(shadeScaleX, shadeScaleY);
            pink.inputEnabled = true;
            pink.tint = 0xCC3ACC;
            pink.events.onInputDown.add(onDownPink, this);
            function onDownPink() {this.setColorRFlagToZero(); pinkFlag = 1;}
            
            
            red = game.add.sprite(objectsPositions[25].x, objectsPositions[25].y, 'red');
            red.anchor.setTo(spriteAnchorX, spriteAnchorY);
            red.scale.setTo(shadeScaleX, shadeScaleY);
            red.inputEnabled = true;
            red.tint = 0xE32424;
            red.events.onInputDown.add(onDownRed, this);
            function onDownRed() {this.setColorRFlagToZero(); redFlag = 1;}
                
        },
        
        onDownrLetter: function() {
                
            //rabbit
                    if(rabbitFlag == 1 && greenFlag == 1 ){var greenrabbit = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transRabbit');greenrabbit.tint =  0x51C735; greenrabbit.scale.setTo(spriteScaleX, spriteScaleY); 
greenrabbit.anchor.setTo(0.6, 0.6);stickSound.play();}                    
                    
                    if(rabbitFlag == 1 && blueFlag == 1){var bluerabbit = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transRabbit'); bluerabbit.tint =  0x456AC1; bluerabbit.scale.setTo(spriteScaleX, spriteScaleY); bluerabbit.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(rabbitFlag == 1 && orangeFlag == 1){var orangerabbit = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transRabbit'); orangerabbit.tint =  0xF38932; orangerabbit.scale.setTo(spriteScaleX, spriteScaleY); orangerabbit.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(rabbitFlag == 1 && redFlag == 1){var redrabbit = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transRabbit'); redrabbit.tint =  0xE32424; redrabbit.scale.setTo(spriteScaleX, spriteScaleY); redrabbit.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(rabbitFlag == 1 && pinkFlag == 1){var pinkrabbit = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transRabbit'); pinkrabbit.tint =  0xCC3ACC; pinkrabbit.scale.setTo(spriteScaleX, spriteScaleY); pinkrabbit.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(rabbitFlag == 1 && cyanFlag == 1){var cyanrabbit = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transRabbit'); cyanrabbit.tint =  0x45C1C1; cyanrabbit.scale.setTo(spriteScaleX, spriteScaleY); cyanrabbit.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //racket    
                    if(racketFlag == 1 && greenFlag == 1 ){var greenracket = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transRacket');greenracket.tint =  0x51C735; greenracket.scale.setTo(spriteScaleX, spriteScaleY); 
greenracket.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(racketFlag == 1 && blueFlag == 1){var blueracket = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transRacket'); blueracket.tint =  0x456AC1; blueracket.scale.setTo(spriteScaleX, spriteScaleY); blueracket.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(racketFlag == 1 && orangeFlag == 1){var orangeracket = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transRacket'); orangeracket.tint =  0xF38932; orangeracket.scale.setTo(spriteScaleX, spriteScaleY); orangeracket.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(racketFlag == 1 && redFlag == 1){var redracket = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transRacket'); redracket.tint =  0xE32424; redracket.scale.setTo(spriteScaleX, spriteScaleY); redracket.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(racketFlag == 1 && pinkFlag == 1){var pinkracket = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transRacket'); pinkracket.tint =  0xCC3ACC; pinkracket.scale.setTo(spriteScaleX, spriteScaleY); pinkracket.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(racketFlag == 1 && cyanFlag == 1){var cyanracket = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transRacket'); cyanracket.tint =  0x45C1C1; cyanracket.scale.setTo(spriteScaleX, spriteScaleY); cyanracket.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //radio    
                    if(radioFlag == 1 && greenFlag == 1 ){var greenradio = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transRadio');greenradio.tint =  0x51C735; greenradio.scale.setTo(spriteScaleX, spriteScaleY); 
greenradio.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(radioFlag == 1 && blueFlag == 1){var blueradio = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transRadio'); blueradio.tint =  0x456AC1; blueradio.scale.setTo(spriteScaleX, spriteScaleY); blueradio.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(radioFlag == 1 && orangeFlag == 1){var orangeradio = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transRadio'); orangeradio.tint =  0xF38932; orangeradio.scale.setTo(spriteScaleX, spriteScaleY); orangeradio.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(radioFlag == 1 && redFlag == 1){var redradio = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transRadio'); redradio.tint =  0xE32424; redradio.scale.setTo(spriteScaleX, spriteScaleY); redradio.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(radioFlag == 1 && pinkFlag == 1){var pinkradio = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transRadio'); pinkradio.tint =  0xCC3ACC; pinkradio.scale.setTo(spriteScaleX, spriteScaleY); pinkradio.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(radioFlag == 1 && cyanFlag == 1){var cyanradio = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transRadio'); cyanradio.tint =  0x45C1C1; cyanradio.scale.setTo(spriteScaleX, spriteScaleY); cyanradio.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //rat
                    if(ratFlag == 1 && greenFlag == 1 ){var greenrat = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transRat');greenrat.tint =  0x51C735; greenrat.scale.setTo(spriteScaleX, spriteScaleY); 
greenrat.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(ratFlag == 1 && blueFlag == 1){console.log("bluerat plotted");var bluerat = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transRat'); bluerat.tint =  0x456AC1; bluerat.scale.setTo(spriteScaleX, spriteScaleY); bluerat.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(ratFlag == 1 && orangeFlag == 1){var orangerat = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transRat'); orangerat.tint =  0xF38932; orangerat.scale.setTo(spriteScaleX, spriteScaleY); orangerat.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(ratFlag == 1 && redFlag == 1){var redrat = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transRat'); redrat.tint =  0xE32424; redrat.scale.setTo(spriteScaleX, spriteScaleY); redrat.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(ratFlag == 1 && pinkFlag == 1){var pinkrat = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transRat'); pinkrat.tint =  0xCC3ACC; pinkrat.scale.setTo(spriteScaleX, spriteScaleY); pinkrat.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(ratFlag == 1 && cyanFlag == 1){var cyanrat = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transRat'); cyanrat.tint =  0x45C1C1; cyanrat.scale.setTo(spriteScaleX, spriteScaleY); cyanrat.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //ribbon    
                    if(ribbonFlag == 1 && greenFlag == 1 ){var greenribbon = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transRibbon');greenribbon.tint =  0x51C735; greenribbon.scale.setTo(spriteScaleX, spriteScaleY); 
greenribbon.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(ribbonFlag == 1 && blueFlag == 1){console.log("blueribbon plotted");var blueribbon = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transRibbon'); blueribbon.tint =  0x456AC1; blueribbon.scale.setTo(spriteScaleX, spriteScaleY); blueribbon.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(ribbonFlag == 1 && orangeFlag == 1){var orangeribbon = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transRibbon'); orangeribbon.tint =  0xF38932; orangeribbon.scale.setTo(spriteScaleX, spriteScaleY); orangeribbon.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(ribbonFlag == 1 && redFlag == 1){var redribbon = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transRibbon'); redribbon.tint =  0xE32424; redribbon.scale.setTo(spriteScaleX, spriteScaleY); redribbon.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(ribbonFlag == 1 && pinkFlag == 1){var pinkribbon = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transRibbon'); pinkribbon.tint =  0xCC3ACC; pinkribbon.scale.setTo(spriteScaleX, spriteScaleY); pinkribbon.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(ribbonFlag == 1 && cyanFlag == 1){var cyanribbon = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transRibbon'); cyanribbon.tint =  0x45C1C1; cyanribbon.scale.setTo(spriteScaleX, spriteScaleY); cyanribbon.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //ring   
                    if(rockFlag == 1 && greenFlag == 1 ){var greenring = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transRing');greenring.tint =  0x51C735; greenring.scale.setTo(spriteScaleX, spriteScaleY); 
greenring.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(rockFlag == 1 && blueFlag == 1){console.log("bluering plotted");var bluering = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transRing'); bluering.tint =  0x456AC1; bluering.scale.setTo(spriteScaleX, spriteScaleY); bluering.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(rockFlag == 1 && orangeFlag == 1){var orangering = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transRing'); orangering.tint =  0xF38932; orangering.scale.setTo(spriteScaleX, spriteScaleY); orangering.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(rockFlag == 1 && redFlag == 1){var redring = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transRing'); redring.tint =  0xE32424; redring.scale.setTo(spriteScaleX, spriteScaleY); redring.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(rockFlag == 1 && pinkFlag == 1){var pinkring = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transRing'); pinkring.tint =  0xCC3ACC; pinkring.scale.setTo(spriteScaleX, spriteScaleY); pinkring.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(rockFlag == 1 && cyanFlag == 1){var cyanring = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transRing'); cyanring.tint =  0x45C1C1; cyanring.scale.setTo(spriteScaleX, spriteScaleY); cyanring.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //robot    
                    if(robotFlag == 1 && greenFlag == 1 ){var greenrobot = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transRobot');greenrobot.tint =  0x51C735; greenrobot.scale.setTo(spriteScaleX, spriteScaleY); 
greenrobot.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(robotFlag == 1 && blueFlag == 1){console.log("bluerobot plotted");var bluerobot = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transRobot'); bluerobot.tint =  0x456AC1; bluerobot.scale.setTo(spriteScaleX, spriteScaleY); bluerobot.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(robotFlag == 1 && orangeFlag == 1){var orangerobot = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transRobot'); orangerobot.tint =  0xF38932; orangerobot.scale.setTo(spriteScaleX, spriteScaleY); orangerobot.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(robotFlag == 1 && redFlag == 1){var redrobot = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transRobot'); redrobot.tint =  0xE32424; redrobot.scale.setTo(spriteScaleX, spriteScaleY); redrobot.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(robotFlag == 1 && pinkFlag == 1){var pinkrobot = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transRobot'); pinkrobot.tint =  0xCC3ACC; pinkrobot.scale.setTo(spriteScaleX, spriteScaleY); pinkrobot.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(robotFlag == 1 && cyanFlag == 1){var cyanrobot = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transRobot'); cyanrobot.tint =  0x45C1C1; cyanrobot.scale.setTo(spriteScaleX, spriteScaleY); cyanrobot.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //rock    
                    if(ringFlag == 1 && greenFlag == 1 ){var greenrock = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transRock');greenrock.tint =  0x51C735; greenrock.scale.setTo(spriteScaleX, spriteScaleY); 
greenrock.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(ringFlag == 1 && blueFlag == 1){console.log("bluerock plotted");var bluerock = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transRock'); bluerock.tint =  0x456AC1; bluerock.scale.setTo(spriteScaleX, spriteScaleY); bluerock.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(ringFlag == 1 && orangeFlag == 1){var orangerock = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transRock'); orangerock.tint =  0xF38932; orangerock.scale.setTo(spriteScaleX, spriteScaleY); orangerock.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(ringFlag == 1 && redFlag == 1){var redrock = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transRock'); redrock.tint =  0xE32424; redrock.scale.setTo(spriteScaleX, spriteScaleY); redrock.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(ringFlag == 1 && pinkFlag == 1){var pinkrock = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transRock'); pinkrock.tint =  0xCC3ACC; pinkrock.scale.setTo(spriteScaleX, spriteScaleY); pinkrock.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(ringFlag == 1 && cyanFlag == 1){var cyanrock = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transRock'); cyanrock.tint =  0x45C1C1; cyanrock.scale.setTo(spriteScaleX, spriteScaleY); cyanrock.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //rocket    
                    if(rocketFlag == 1 && greenFlag == 1 ){var greenrocket = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transRocket');greenrocket.tint =  0x51C735; greenrocket.scale.setTo(spriteScaleX, spriteScaleY); 
greenrocket.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(rocketFlag == 1 && blueFlag == 1){console.log("bluerocket plotted");var bluerocket = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transRocket'); bluerocket.tint =  0x456AC1; bluerocket.scale.setTo(spriteScaleX, spriteScaleY); bluerocket.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(rocketFlag == 1 && orangeFlag == 1){var orangerocket = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transRocket'); orangerocket.tint =  0xF38932; orangerocket.scale.setTo(spriteScaleX, spriteScaleY); orangerocket.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(rocketFlag == 1 && redFlag == 1){var redrocket = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transRocket'); redrocket.tint =  0xE32424; redrocket.scale.setTo(spriteScaleX, spriteScaleY); redrocket.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(rocketFlag == 1 && pinkFlag == 1){var pinkrocket = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transRocket'); pinkrocket.tint =  0xCC3ACC; pinkrocket.scale.setTo(spriteScaleX, spriteScaleY); pinkrocket.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(rocketFlag == 1 && cyanFlag == 1){var cyanrocket = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transRocket'); cyanrocket.tint =  0x45C1C1; cyanrocket.scale.setTo(spriteScaleX, spriteScaleY); cyanrocket.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //ruler 
                    if(rulerFlag == 1 && greenFlag == 1 ){var greenruler = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transRuler');greenruler.tint =  0x51C735; greenruler.scale.setTo(spriteScaleX, spriteScaleY); 
greenruler.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(rulerFlag == 1 && blueFlag == 1){console.log("blueruler plotted");var blueruler = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transRuler'); blueruler.tint =  0x456AC1; blueruler.scale.setTo(spriteScaleX, spriteScaleY); blueruler.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(rulerFlag == 1 && orangeFlag == 1){var orangeruler = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transRuler'); orangeruler.tint =  0xF38932; orangeruler.scale.setTo(spriteScaleX, spriteScaleY); orangeruler.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(rulerFlag == 1 && redFlag == 1){var redruler = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transRuler'); redruler.tint =  0xE32424; redruler.scale.setTo(spriteScaleX, spriteScaleY); redruler.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(rulerFlag == 1 && pinkFlag == 1){var pinkruler = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transRuler'); pinkruler.tint =  0xCC3ACC; pinkruler.scale.setTo(spriteScaleX, spriteScaleY); pinkruler.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(rulerFlag == 1 && cyanFlag == 1){var cyanruler = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transRuler'); cyanruler.tint =  0x45C1C1; cyanruler.scale.setTo(spriteScaleX, spriteScaleY); cyanruler.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
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
            
            game.world.bringToTop(rLetter);
            
            game.world.bringToTop(blue);
            game.world.bringToTop(green);
            game.world.bringToTop(red);
            game.world.bringToTop(cyan);
            game.world.bringToTop(orange);
            game.world.bringToTop(pink);
            
            game.world.bringToTop(cloud1);
            game.world.bringToTop(cloud2);
            game.world.bringToTop(cloud3);
            
            game.world.bringToTop(rabbit);
            game.world.bringToTop(racket);
            game.world.bringToTop(radio);
            game.world.bringToTop(rat);
            game.world.bringToTop(ribbon);
            game.world.bringToTop(ring);
            game.world.bringToTop(robot);
            game.world.bringToTop(rock);
            game.world.bringToTop(rocket);
            game.world.bringToTop(ruler);
            
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
            
            
            
            if(rabbitFlag == 1){rabbit.angle += 2;}
            if(racketFlag == 1){racket.angle += 2;}
            if(radioFlag == 1){radio.angle += 2;}
            if(ratFlag == 1){rat.angle += 2;}
            if(ribbonFlag == 1){ribbon.angle += 2;}
            if(rockFlag == 1){ring.angle += 2;}
            if(robotFlag == 1){robot.angle += 2;}
            if(ringFlag == 1){rock.angle += 2;}
            if(rocketFlag == 1){rocket.angle += 2;}
            if(rulerFlag == 1){ruler.angle += 2;}
            
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
            
            if(rObjectClicked == 10){
            
                askForLevelS = 1;
                game.sButton = game.add.sprite(1170, 730, 'sButton');             
                game.sButton.scale.setTo(1, 1); 
                game.sButton.anchor.setTo(spriteAnchorX, spriteAnchorY);
                
            }
            
        if(askForLevelS == 1){
            
            game.world.bringToTop(game.sButton);
            game.sButton.inputEnabled = true;
            game.sButton.events.onInputDown.add(onDownS, this);
            function onDownS() {
            
                //start next level
                
                this.setRGlobalVaribalesToZero();
                game.state.start('S');
                
            }
        }
           
        },
        
        resetRSpriteFlag: function(){
            
            rabbitFlag = 0;racketFlag = 0;radioFlag = 0;rockFlag = 0;ratFlag = 0;
            ribbonFlag = 0;robotFlag = 0;ringFlag = 0;rocketFlag = 0;rulerFlag = 0;
            camelFlag = 0;candleFlag = 0;carFlag = 0;catFlag = 0;cheeseFlag = 0;cherryFlag = 0;
            clockFlag = 0;cowFlag = 0;crabFlag = 0;crownFlag = 0;

            rabbit.angle = 0;racket.angle = 0;radio.angle = 0;ring.angle = 0;rat.angle = 0;
            ribbon.angle = 0;robot.angle = 0;rock.angle = 0;rocket.angle = 0;ruler.angle = 0;
            camel.angle = 0;candle.angle = 0;car.angle = 0;cat.angle = 0;cheese.angle = 0;
            cherry.angle = 0;crown.angle = 0;clock.angle = 0;cow.angle = 0;crab.angle = 0;
           
        },
       
        setColorRFlagToZero: function(){
            
            bubbleSound.play(); blueFlag = 0;greenFlag = 0; redFlag = 0; cyanFlag = 0; pinkFlag = 0; orangeFlag = 0;
        },
        
        setRGlobalVaribalesToZero: function(){
            
            
            rabbitFlag = 0;racketFlag = 0;radioFlag = 0;rockFlag = 0;ratFlag = 0;
            ribbonFlag = 0;robotFlag = 0;ringFlag = 0;rocketFlag = 0;rulerFlag = 0;
            camelFlag = 0;candleFlag = 0;carFlag = 0;catFlag = 0;cheeseFlag = 0;cherryFlag = 0;
            clockFlag = 0;cowFlag = 0;crabFlag = 0;crownFlag = 0;



            greenFlag = 0;blueFlag = 0;orangeFlag = 0;redFlag = 0;pinkFlag = 0;cyanFlag = 0;
        }
        
        
    };