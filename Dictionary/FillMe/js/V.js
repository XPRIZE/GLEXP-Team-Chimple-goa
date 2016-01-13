        
    var vObjectClicked = 0;
    var askForLevelW = 0;
    
    
    var vanFlag = 0;
    var vanFrontFlag = 0;
    var vanillaFlag = 0;            
    var vaseFlag = 0;
    var victoriaPlumFlag = 0;
    var victoriaPlumDoubleFlag = 0;
    var violinFlag = 0;
    var violinFrontFlag = 0;
    var vultureFlag = 0;
    var vultureRightFlag = 0;
    
    
    var V = {

        preload: function () {

            //setting default path for assets to be used in game
            this.load.path = './assets/V/';
            
            
            
            this.load.image("transVan", "transVan.png");
            this.load.image("transVanFront", "transVanFront.png");
            this.load.image("transVanilla", "transVanilla.png");
            this.load.image("transVase", "transVase.png");
            this.load.image("transVictoriaPlum", "transVictoriaPlum.png");
            this.load.image("transVictoriaPlumDouble", "transVictoriaPlumDouble.png");
            this.load.image("transViolin", "transViolin.png");
            this.load.image("transViolinFront", "transViolinFront.png");
            this.load.image("transVulture", "transVulture.png");
            this.load.image("transVultureRight", "transVultureRight.png");
            
            this.load.image("van", "van.png");
            this.load.image("vanFront", "vanFront.png");
            this.load.image("vanilla", "vanilla.png");
            this.load.image("vase", "vase.png");
            this.load.image("victoriaPlum", "victoriaPlum.png");
            this.load.image("victoriaPlumDouble", "victoriaPlumDouble.png");
            this.load.image("violin", "violin.png");
            this.load.image("violinFront", "violinFront.png");
            this.load.image("vulture", "vulture.png");
            this.load.image("vultureRight", "vultureRight.png");
            
            
            //loading assets for the level  V
            
            //loading shades
            this.load.image("blue", "blue.png");
            this.load.image("cyan", "cyan.png");
            this.load.image("green", "green.png");
            this.load.image("orange", "orange.png");
            this.load.image("pink", "pink.png");
            this.load.image("red", "red.png");
    
            this.load.image("bg", "bg.png");
            this.load.image("vLetter", "vLetter.png");
            this.load.image("wButton", "wButton.png");
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
                
            
            
            
            //Main letter V
            vLetter = game.add.sprite(gameMinWidth, gameMinHeight, 'vLetter');
            vLetter.inputEnabled = true;
            vLetter.events.onInputDown.add(this.onDownvLetter, this);
            
            
            
            //Objects starting from V
                    
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
            
            
            
            
            van = game.add.sprite(objectsPositions[0].x, objectsPositions[0].y, 'van');
            van.anchor.setTo(spriteAnchorX, spriteAnchorY);
            van.scale.setTo(spriteScaleX, spriteScaleY);
            van.inputEnabled = true;
            van.events.onInputDown.add(onDownvan, this);
            function onDownvan() {this.resetVSpriteFlag(); vanFlag = 1;vObjectClicked++;}

            
            
            
            vanFront = game.add.sprite(objectsPositions[10].x, objectsPositions[10].y, 'vanFront');
            vanFront.anchor.setTo(spriteAnchorX, spriteAnchorY);
            vanFront.scale.setTo(spriteScaleX, spriteScaleY);
            vanFront.inputEnabled = true;
            vanFront.events.onInputDown.add(onDownvanFront, this);
            function onDownvanFront() {this.resetVSpriteFlag(); vanFrontFlag = 1;vObjectClicked++;}

            
            
            
            vanilla = game.add.sprite(objectsPositions[1].x, objectsPositions[1].y, 'vanilla');
            vanilla.anchor.setTo(spriteAnchorX, spriteAnchorY);
            vanilla.scale.setTo(spriteScaleX, spriteScaleY);
            vanilla.inputEnabled = true;
            vanilla.events.onInputDown.add(onDownvanilla, this);
            function onDownvanilla() {this.resetVSpriteFlag(); vanillaFlag = 1;vObjectClicked++;}
            
            
            
            
            vase = game.add.sprite(objectsPositions[11].x, objectsPositions[11].y, 'vase');
            vase.anchor.setTo(spriteAnchorX, spriteAnchorY);
            vase.scale.setTo(spriteScaleX, spriteScaleY);
            vase.inputEnabled = true;
            vase.events.onInputDown.add(onDownvase, this);
            function onDownvase() {this.resetVSpriteFlag(); vaseFlag = 1;vObjectClicked++;}
            
            
            
            victoriaPlum = game.add.sprite(objectsPositions[2].x, objectsPositions[2].y, 'victoriaPlum');
            victoriaPlum.anchor.setTo(spriteAnchorX, spriteAnchorY);
            victoriaPlum.scale.setTo(spriteScaleX, spriteScaleY);
            victoriaPlum.inputEnabled = true;
            victoriaPlum.events.onInputDown.add(onDownvictoriaPlum, this);
            function onDownvictoriaPlum() {this.resetVSpriteFlag(); victoriaPlumFlag = 1;vObjectClicked++;}
            
            victoriaPlumDouble = game.add.sprite(objectsPositions[12].x, objectsPositions[12].y, 'victoriaPlumDouble');
            victoriaPlumDouble.anchor.setTo(spriteAnchorX, spriteAnchorY);
            victoriaPlumDouble.scale.setTo(spriteScaleX, spriteScaleY);
            victoriaPlumDouble.inputEnabled = true;
            victoriaPlumDouble.events.onInputDown.add(onDownvictoriaPlumDouble, this);
            function onDownvictoriaPlumDouble() {this.resetVSpriteFlag(); violinFrontFlag = 1;vObjectClicked++;}

            
            violin = game.add.sprite(objectsPositions[3].x, objectsPositions[3].y, 'violin');
            violin.anchor.setTo(spriteAnchorX, spriteAnchorY);
            violin.scale.setTo(spriteScaleX, spriteScaleY);
            violin.inputEnabled = true;  
            violin.events.onInputDown.add(onDownviolin, this);
            function onDownviolin() {this.resetVSpriteFlag(); violinFlag = 1;vObjectClicked++;}
            
            
            violinFront = game.add.sprite(objectsPositions[13].x, objectsPositions[13].y, 'violinFront');
            violinFront.anchor.setTo(spriteAnchorX, spriteAnchorY);
            violinFront.scale.setTo(spriteScaleX, spriteScaleY);
            violinFront.inputEnabled = true;
            violinFront.events.onInputDown.add(onDownviolinFront, this);
            function onDownviolinFront() {this.resetVSpriteFlag(); victoriaPlumDoubleFlag = 1;vObjectClicked++;}
            
            
            vulture = game.add.sprite(objectsPositions[4].x, objectsPositions[4].y, 'vulture');
            vulture.anchor.setTo(spriteAnchorX, spriteAnchorY);
            vulture.scale.setTo(spriteScaleX, spriteScaleY);
            vulture.inputEnabled = true;
            vulture.events.onInputDown.add(onDownvulture, this);
            function onDownvulture() {this.resetVSpriteFlag(); vultureFlag = 1;vObjectClicked++;}
            
            
            vultureRight = game.add.sprite(objectsPositions[14].x, objectsPositions[14].y, 'vultureRight');
            vultureRight.anchor.setTo(spriteAnchorX, spriteAnchorY);
            vultureRight.scale.setTo(spriteScaleX, spriteScaleY);
            vultureRight.inputEnabled = true;
            vultureRight.events.onInputDown.add(onDownvultureRight, this);
            function onDownvultureRight() {this.resetVSpriteFlag(); vultureRightFlag = 1;vObjectClicked++;}
            
            
            
            //Adding other sprites        
            
            camel = game.add.sprite(objectsPositions[5].x, objectsPositions[5].y, 'camel');
            camel.anchor.setTo(spriteAnchorX, spriteAnchorY);
            camel.scale.setTo(spriteScaleX, spriteScaleY);
            camel.inputEnabled = true;
            camel.events.onInputDown.add(onDownCamel, this);
            function onDownCamel() {this.resetVSpriteFlag(); camelFlag = 1;}
            
            
            
            
            candle = game.add.sprite(objectsPositions[15].x, objectsPositions[15].y, 'candle');
            candle.anchor.setTo(spriteAnchorX, spriteAnchorY);
            candle.scale.setTo(spriteScaleX, spriteScaleY);
            candle.inputEnabled = true;
            candle.events.onInputDown.add(onDownCandle, this);
            function onDownCandle() {this.resetVSpriteFlag(); candleFlag = 1; }
            
            
            car = game.add.sprite(objectsPositions[6].x, objectsPositions[6].y, 'car');
            car.anchor.setTo(spriteAnchorX, spriteAnchorY);
            car.scale.setTo(spriteScaleX, spriteScaleY);
            car.inputEnabled = true;
            car.events.onInputDown.add(onDownCar, this);
            function onDownCar() {this.resetVSpriteFlag(); carFlag = 1;}
            
            cat = game.add.sprite(objectsPositions[16].x, objectsPositions[16].y, 'cat');
            cat.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cat.scale.setTo(spriteScaleX, spriteScaleY);
            cat.inputEnabled = true;
            cat.events.onInputDown.add(onDownCat, this);
            function onDownCat() {this.resetVSpriteFlag(); catFlag = 1;}
            
            
            cheese = game.add.sprite(objectsPositions[7].x, objectsPositions[7].y, 'cheese');
            cheese.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cheese.scale.setTo(spriteScaleX, spriteScaleY);
            cheese.inputEnabled = true;
            cheese.events.onInputDown.add(onDownCheese, this);
            function onDownCheese() {this.resetVSpriteFlag(); cheeseFlag = 1;}
            
            
            cherry = game.add.sprite(objectsPositions[17].x, objectsPositions[17].y, 'cherry');
            cherry.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cherry.scale.setTo(spriteScaleX, spriteScaleY);
            cherry.inputEnabled = true;
            cherry.events.onInputDown.add(onDownCherry, this);
            function onDownCherry() {this.resetVSpriteFlag(); cherryFlag = 1;}
            
            
            clock = game.add.sprite(objectsPositions[8].x, objectsPositions[8].y, 'clock');
            clock.anchor.setTo(spriteAnchorX, spriteAnchorY);
            clock.scale.setTo(spriteScaleX, spriteScaleY);
            clock.inputEnabled = true;
            clock.events.onInputDown.add(onDownClock, this);
            function onDownClock() {this.resetVSpriteFlag(); clockFlag = 1;}
            
            
            
            cow = game.add.sprite(objectsPositions[18].x, objectsPositions[18].y, 'cow');
            cow.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cow.scale.setTo(spriteScaleX, spriteScaleY);
            cow.inputEnabled = true;
            cow.events.onInputDown.add(onDownCow, this);
            function onDownCow() {this.resetVSpriteFlag(); cowFlag = 1;}
            
            
            crab = game.add.sprite(objectsPositions[9].x, objectsPositions[9].y, 'crab');
            crab.anchor.setTo(spriteAnchorX, spriteAnchorY);
            crab.scale.setTo(spriteScaleX, spriteScaleY);
            crab.inputEnabled = true;
            crab.events.onInputDown.add(onDownCrab, this);
            function onDownCrab() {this.resetVSpriteFlag(); crabFlag = 1;}
            
            
            crown = game.add.sprite(objectsPositions[19].x, objectsPositions[19].y, 'crown');
            crown.anchor.setTo(spriteAnchorX, spriteAnchorY);
            crown.scale.setTo(spriteScaleX, spriteScaleY);
            crown.inputEnabled = true;
            crown.events.onInputDown.add(onDownCrown, this);
            function onDownCrown() {this.resetVSpriteFlag(); crownFlag = 1;}
            
            /*game.leftArrow = game.add.sprite(1070, 730, 'leftArrow');             
            game.leftArrow.scale.setTo(1, 1); 
            game.leftArrow.anchor.setTo(spriteAnchorX, spriteAnchorY);
            game.leftArrow.inputEnabled = true;
            game.leftArrow.events.onInputDown.add(onDownLeftArrow, this);
            function onDownLeftArrow() {this.setVGlobalVaribalesToZero();game.state.start('U');}
            
            
            game.rightArrow = game.add.sprite(1170, 730, 'rightArrow');             
            game.rightArrow.scale.setTo(1, 1); 
            game.rightArrow.anchor.setTo(spriteAnchorX, spriteAnchorY);
            game.rightArrow.inputEnabled = true;
            game.rightArrow.events.onInputDown.add(onDownRightArrow, this);
            function onDownRightArrow() {this.setVGlobalVaribalesToZero();game.state.start('W');}*/
            
            
            //Color shades
            blue = game.add.sprite(objectsPositions[20].x, objectsPositions[20].y, 'blue');
            blue.anchor.setTo(spriteAnchorX, spriteAnchorY);
            blue.scale.setTo(shadeScaleX, shadeScaleY);
            blue.inputEnabled = true;
            blue.tint = 0x456AC1; 
            blue.events.onInputDown.add(onDownBlue, this);
            function onDownBlue() {this.setColorVFlagToZero(); blueFlag = 1;}
           
            
            cyan = game.add.sprite(objectsPositions[21].x, objectsPositions[21].y, 'cyan');
            cyan.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cyan.scale.setTo(shadeScaleX, shadeScaleY);
            cyan.inputEnabled = true;
            cyan.tint = 0x45C1C1; 
            cyan.events.onInputDown.add(onDownCyan, this);
            function onDownCyan() {this.setColorVFlagToZero(); cyanFlag = 1;}
            
            
            
            green = game.add.sprite(objectsPositions[22].x, objectsPositions[22].y, 'green');
            green.anchor.setTo(spriteAnchorX, spriteAnchorY);
            green.scale.setTo(shadeScaleX, shadeScaleY);
            green.inputEnabled = true;
            green.tint = 0x51C735;
            green.events.onInputDown.add(onDownGreen, this);
            function onDownGreen() {this.setColorVFlagToZero(); greenFlag = 1;}
            
            
            orange = game.add.sprite(objectsPositions[23].x, objectsPositions[23].y, 'orange');
            orange.anchor.setTo(spriteAnchorX, spriteAnchorY);
            orange.scale.setTo(shadeScaleX, shadeScaleY);
            orange.inputEnabled = true;
            orange.tint = 0xF38932;
            orange.events.onInputDown.add(onDownOrange, this);
            function onDownOrange() {this.setColorVFlagToZero(); orangeFlag = 1;}
           
            
            pink = game.add.sprite(objectsPositions[24].x, objectsPositions[24].y, 'pink');
            pink.anchor.setTo(spriteAnchorX, spriteAnchorY);
            pink.scale.setTo(shadeScaleX, shadeScaleY);
            pink.inputEnabled = true;
            pink.tint = 0xCC3ACC;
            pink.events.onInputDown.add(onDownPink, this);
            function onDownPink() {this.setColorVFlagToZero(); pinkFlag = 1;}
            
            
            red = game.add.sprite(objectsPositions[25].x, objectsPositions[25].y, 'red');
            red.anchor.setTo(spriteAnchorX, spriteAnchorY);
            red.scale.setTo(shadeScaleX, shadeScaleY);
            red.inputEnabled = true;
            red.tint = 0xE32424;
            red.events.onInputDown.add(onDownRed, this);
            function onDownRed() {this.setColorVFlagToZero(); redFlag = 1;}
                
        },
        
        onDownvLetter: function() {
                
            //van
                    if(vanFlag == 1 && greenFlag == 1 ){var greenvan = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transVan');greenvan.tint =  0x51C735; greenvan.scale.setTo(spriteScaleX, spriteScaleY); 
greenvan.anchor.setTo(0.6, 0.6);stickSound.play();}                    
                    
                    if(vanFlag == 1 && blueFlag == 1){var bluevan = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transVan'); bluevan.tint =  0x456AC1; bluevan.scale.setTo(spriteScaleX, spriteScaleY); bluevan.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(vanFlag == 1 && orangeFlag == 1){var orangevan = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transVan'); orangevan.tint =  0xF38932; orangevan.scale.setTo(spriteScaleX, spriteScaleY); orangevan.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(vanFlag == 1 && redFlag == 1){var redvan = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transVan'); redvan.tint =  0xE32424; redvan.scale.setTo(spriteScaleX, spriteScaleY); redvan.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(vanFlag == 1 && pinkFlag == 1){var pinkvan = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transVan'); pinkvan.tint =  0xCC3ACC; pinkvan.scale.setTo(spriteScaleX, spriteScaleY); pinkvan.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(vanFlag == 1 && cyanFlag == 1){var cyanvan = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transVan'); cyanvan.tint =  0x45C1C1; cyanvan.scale.setTo(spriteScaleX, spriteScaleY); cyanvan.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //vanFront    
                    if(vanFrontFlag == 1 && greenFlag == 1 ){var greenvanFront = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transVanFront');greenvanFront.tint =  0x51C735; greenvanFront.scale.setTo(spriteScaleX, spriteScaleY); 
greenvanFront.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(vanFrontFlag == 1 && blueFlag == 1){var bluevanFront = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transVanFront'); bluevanFront.tint =  0x456AC1; bluevanFront.scale.setTo(spriteScaleX, spriteScaleY); bluevanFront.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(vanFrontFlag == 1 && orangeFlag == 1){var orangevanFront = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transVanFront'); orangevanFront.tint =  0xF38932; orangevanFront.scale.setTo(spriteScaleX, spriteScaleY); orangevanFront.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(vanFrontFlag == 1 && redFlag == 1){var redvanFront = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transVanFront'); redvanFront.tint =  0xE32424; redvanFront.scale.setTo(spriteScaleX, spriteScaleY); redvanFront.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(vanFrontFlag == 1 && pinkFlag == 1){var pinkvanFront = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transVanFront'); pinkvanFront.tint =  0xCC3ACC; pinkvanFront.scale.setTo(spriteScaleX, spriteScaleY); pinkvanFront.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(vanFrontFlag == 1 && cyanFlag == 1){var cyanvanFront = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transVanFront'); cyanvanFront.tint =  0x45C1C1; cyanvanFront.scale.setTo(spriteScaleX, spriteScaleY); cyanvanFront.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //vanilla    
                    if(vanillaFlag == 1 && greenFlag == 1 ){var greenvanilla = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transVanilla');greenvanilla.tint =  0x51C735; greenvanilla.scale.setTo(spriteScaleX, spriteScaleY); 
greenvanilla.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(vanillaFlag == 1 && blueFlag == 1){var bluevanilla = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transVanilla'); bluevanilla.tint =  0x456AC1; bluevanilla.scale.setTo(spriteScaleX, spriteScaleY); bluevanilla.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(vanillaFlag == 1 && orangeFlag == 1){var orangevanilla = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transVanilla'); orangevanilla.tint =  0xF38932; orangevanilla.scale.setTo(spriteScaleX, spriteScaleY); orangevanilla.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(vanillaFlag == 1 && redFlag == 1){var redvanilla = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transVanilla'); redvanilla.tint =  0xE32424; redvanilla.scale.setTo(spriteScaleX, spriteScaleY); redvanilla.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(vanillaFlag == 1 && pinkFlag == 1){var pinkvanilla = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transVanilla'); pinkvanilla.tint =  0xCC3ACC; pinkvanilla.scale.setTo(spriteScaleX, spriteScaleY); pinkvanilla.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(vanillaFlag == 1 && cyanFlag == 1){var cyanvanilla = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transVanilla'); cyanvanilla.tint =  0x45C1C1; cyanvanilla.scale.setTo(spriteScaleX, spriteScaleY); cyanvanilla.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //vase
                    if(vaseFlag == 1 && greenFlag == 1 ){var greenvase = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transVase');greenvase.tint =  0x51C735; greenvase.scale.setTo(spriteScaleX, spriteScaleY); 
greenvase.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(vaseFlag == 1 && blueFlag == 1){console.log("bluevase plotted");var bluevase = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transVase'); bluevase.tint =  0x456AC1; bluevase.scale.setTo(spriteScaleX, spriteScaleY); bluevase.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(vaseFlag == 1 && orangeFlag == 1){var orangevase = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transVase'); orangevase.tint =  0xF38932; orangevase.scale.setTo(spriteScaleX, spriteScaleY); orangevase.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(vaseFlag == 1 && redFlag == 1){var redvase = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transVase'); redvase.tint =  0xE32424; redvase.scale.setTo(spriteScaleX, spriteScaleY); redvase.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(vaseFlag == 1 && pinkFlag == 1){var pinkvase = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transVase'); pinkvase.tint =  0xCC3ACC; pinkvase.scale.setTo(spriteScaleX, spriteScaleY); pinkvase.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(vaseFlag == 1 && cyanFlag == 1){var cyanvase = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transVase'); cyanvase.tint =  0x45C1C1; cyanvase.scale.setTo(spriteScaleX, spriteScaleY); cyanvase.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //victoriaPlum    
                    if(victoriaPlumFlag == 1 && greenFlag == 1 ){var greenvictoriaPlum = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transVictoriaPlum');greenvictoriaPlum.tint =  0x51C735; greenvictoriaPlum.scale.setTo(spriteScaleX, spriteScaleY); 
greenvictoriaPlum.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(victoriaPlumFlag == 1 && blueFlag == 1){console.log("bluevictoriaPlum plotted");var bluevictoriaPlum = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transVictoriaPlum'); bluevictoriaPlum.tint =  0x456AC1; bluevictoriaPlum.scale.setTo(spriteScaleX, spriteScaleY); bluevictoriaPlum.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(victoriaPlumFlag == 1 && orangeFlag == 1){var orangevictoriaPlum = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transVictoriaPlum'); orangevictoriaPlum.tint =  0xF38932; orangevictoriaPlum.scale.setTo(spriteScaleX, spriteScaleY); orangevictoriaPlum.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(victoriaPlumFlag == 1 && redFlag == 1){var redvictoriaPlum = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transVictoriaPlum'); redvictoriaPlum.tint =  0xE32424; redvictoriaPlum.scale.setTo(spriteScaleX, spriteScaleY); redvictoriaPlum.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(victoriaPlumFlag == 1 && pinkFlag == 1){var pinkvictoriaPlum = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transVictoriaPlum'); pinkvictoriaPlum.tint =  0xCC3ACC; pinkvictoriaPlum.scale.setTo(spriteScaleX, spriteScaleY); pinkvictoriaPlum.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(victoriaPlumFlag == 1 && cyanFlag == 1){var cyanvictoriaPlum = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transVictoriaPlum'); cyanvictoriaPlum.tint =  0x45C1C1; cyanvictoriaPlum.scale.setTo(spriteScaleX, spriteScaleY); cyanvictoriaPlum.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //victoriaPlumDouble   
                    if(violinFrontFlag == 1 && greenFlag == 1 ){var greenvictoriaPlumDouble = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transVictoriaPlumDouble');greenvictoriaPlumDouble.tint =  0x51C735; greenvictoriaPlumDouble.scale.setTo(spriteScaleX, spriteScaleY); 
greenvictoriaPlumDouble.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(violinFrontFlag == 1 && blueFlag == 1){console.log("bluevictoriaPlumDouble plotted");var bluevictoriaPlumDouble = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transVictoriaPlumDouble'); bluevictoriaPlumDouble.tint =  0x456AC1; bluevictoriaPlumDouble.scale.setTo(spriteScaleX, spriteScaleY); bluevictoriaPlumDouble.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(violinFrontFlag == 1 && orangeFlag == 1){var orangevictoriaPlumDouble = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transVictoriaPlumDouble'); orangevictoriaPlumDouble.tint =  0xF38932; orangevictoriaPlumDouble.scale.setTo(spriteScaleX, spriteScaleY); orangevictoriaPlumDouble.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(violinFrontFlag == 1 && redFlag == 1){var redvictoriaPlumDouble = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transVictoriaPlumDouble'); redvictoriaPlumDouble.tint =  0xE32424; redvictoriaPlumDouble.scale.setTo(spriteScaleX, spriteScaleY); redvictoriaPlumDouble.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(violinFrontFlag == 1 && pinkFlag == 1){var pinkvictoriaPlumDouble = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transVictoriaPlumDouble'); pinkvictoriaPlumDouble.tint =  0xCC3ACC; pinkvictoriaPlumDouble.scale.setTo(spriteScaleX, spriteScaleY); pinkvictoriaPlumDouble.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(violinFrontFlag == 1 && cyanFlag == 1){var cyanvictoriaPlumDouble = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transVictoriaPlumDouble'); cyanvictoriaPlumDouble.tint =  0x45C1C1; cyanvictoriaPlumDouble.scale.setTo(spriteScaleX, spriteScaleY); cyanvictoriaPlumDouble.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //violin    
                    if(violinFlag == 1 && greenFlag == 1 ){var greenviolin = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transViolin');greenviolin.tint =  0x51C735; greenviolin.scale.setTo(spriteScaleX, spriteScaleY); 
greenviolin.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(violinFlag == 1 && blueFlag == 1){console.log("blueviolin plotted");var blueviolin = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transViolin'); blueviolin.tint =  0x456AC1; blueviolin.scale.setTo(spriteScaleX, spriteScaleY); blueviolin.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(violinFlag == 1 && orangeFlag == 1){var orangeviolin = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transViolin'); orangeviolin.tint =  0xF38932; orangeviolin.scale.setTo(spriteScaleX, spriteScaleY); orangeviolin.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(violinFlag == 1 && redFlag == 1){var redviolin = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transViolin'); redviolin.tint =  0xE32424; redviolin.scale.setTo(spriteScaleX, spriteScaleY); redviolin.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(violinFlag == 1 && pinkFlag == 1){var pinkviolin = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transViolin'); pinkviolin.tint =  0xCC3ACC; pinkviolin.scale.setTo(spriteScaleX, spriteScaleY); pinkviolin.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(violinFlag == 1 && cyanFlag == 1){var cyanviolin = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transViolin'); cyanviolin.tint =  0x45C1C1; cyanviolin.scale.setTo(spriteScaleX, spriteScaleY); cyanviolin.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //violinFront    
                    if(victoriaPlumDoubleFlag == 1 && greenFlag == 1 ){var greenviolinFront = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transViolinFront');greenviolinFront.tint =  0x51C735; greenviolinFront.scale.setTo(spriteScaleX, spriteScaleY); 
greenviolinFront.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(victoriaPlumDoubleFlag == 1 && blueFlag == 1){console.log("blueviolinFront plotted");var blueviolinFront = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transViolinFront'); blueviolinFront.tint =  0x456AC1; blueviolinFront.scale.setTo(spriteScaleX, spriteScaleY); blueviolinFront.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(victoriaPlumDoubleFlag == 1 && orangeFlag == 1){var orangeviolinFront = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transViolinFront'); orangeviolinFront.tint =  0xF38932; orangeviolinFront.scale.setTo(spriteScaleX, spriteScaleY); orangeviolinFront.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(victoriaPlumDoubleFlag == 1 && redFlag == 1){var redviolinFront = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transViolinFront'); redviolinFront.tint =  0xE32424; redviolinFront.scale.setTo(spriteScaleX, spriteScaleY); redviolinFront.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(victoriaPlumDoubleFlag == 1 && pinkFlag == 1){var pinkviolinFront = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transViolinFront'); pinkviolinFront.tint =  0xCC3ACC; pinkviolinFront.scale.setTo(spriteScaleX, spriteScaleY); pinkviolinFront.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(victoriaPlumDoubleFlag == 1 && cyanFlag == 1){var cyanviolinFront = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transViolinFront'); cyanviolinFront.tint =  0x45C1C1; cyanviolinFront.scale.setTo(spriteScaleX, spriteScaleY); cyanviolinFront.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //vulture    
                    if(vultureFlag == 1 && greenFlag == 1 ){var greenvulture = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transVulture');greenvulture.tint =  0x51C735; greenvulture.scale.setTo(spriteScaleX, spriteScaleY); 
greenvulture.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(vultureFlag == 1 && blueFlag == 1){console.log("bluevulture plotted");var bluevulture = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transVulture'); bluevulture.tint =  0x456AC1; bluevulture.scale.setTo(spriteScaleX, spriteScaleY); bluevulture.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(vultureFlag == 1 && orangeFlag == 1){var orangevulture = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transVulture'); orangevulture.tint =  0xF38932; orangevulture.scale.setTo(spriteScaleX, spriteScaleY); orangevulture.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(vultureFlag == 1 && redFlag == 1){var redvulture = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transVulture'); redvulture.tint =  0xE32424; redvulture.scale.setTo(spriteScaleX, spriteScaleY); redvulture.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(vultureFlag == 1 && pinkFlag == 1){var pinkvulture = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transVulture'); pinkvulture.tint =  0xCC3ACC; pinkvulture.scale.setTo(spriteScaleX, spriteScaleY); pinkvulture.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(vultureFlag == 1 && cyanFlag == 1){var cyanvulture = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transVulture'); cyanvulture.tint =  0x45C1C1; cyanvulture.scale.setTo(spriteScaleX, spriteScaleY); cyanvulture.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //vultureRight 
                    if(vultureRightFlag == 1 && greenFlag == 1 ){var greenvultureRight = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transVultureRight');greenvultureRight.tint =  0x51C735; greenvultureRight.scale.setTo(spriteScaleX, spriteScaleY); 
greenvultureRight.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(vultureRightFlag == 1 && blueFlag == 1){console.log("bluevultureRight plotted");var bluevultureRight = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transVultureRight'); bluevultureRight.tint =  0x456AC1; bluevultureRight.scale.setTo(spriteScaleX, spriteScaleY); bluevultureRight.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(vultureRightFlag == 1 && orangeFlag == 1){var orangevultureRight = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transVultureRight'); orangevultureRight.tint =  0xF38932; orangevultureRight.scale.setTo(spriteScaleX, spriteScaleY); orangevultureRight.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(vultureRightFlag == 1 && redFlag == 1){var redvultureRight = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transVultureRight'); redvultureRight.tint =  0xE32424; redvultureRight.scale.setTo(spriteScaleX, spriteScaleY); redvultureRight.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(vultureRightFlag == 1 && pinkFlag == 1){var pinkvultureRight = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transVultureRight'); pinkvultureRight.tint =  0xCC3ACC; pinkvultureRight.scale.setTo(spriteScaleX, spriteScaleY); pinkvultureRight.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(vultureRightFlag == 1 && cyanFlag == 1){var cyanvultureRight = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transVultureRight'); cyanvultureRight.tint =  0x45C1C1; cyanvultureRight.scale.setTo(spriteScaleX, spriteScaleY); cyanvultureRight.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
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
            
            game.world.bringToTop(vLetter);
            
            game.world.bringToTop(blue);
            game.world.bringToTop(green);
            game.world.bringToTop(red);
            game.world.bringToTop(cyan);
            game.world.bringToTop(orange);
            game.world.bringToTop(pink);
            
            game.world.bringToTop(cloud1);
            game.world.bringToTop(cloud2);
            game.world.bringToTop(cloud3);
            
            game.world.bringToTop(van);
            game.world.bringToTop(vanFront);
            game.world.bringToTop(vanilla);
            game.world.bringToTop(vase);
            game.world.bringToTop(victoriaPlum);
            game.world.bringToTop(victoriaPlumDouble);
            game.world.bringToTop(violin);
            game.world.bringToTop(violinFront);
            game.world.bringToTop(vulture);
            game.world.bringToTop(vultureRight);
            
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
            
            
            
            if(vanFlag == 1){van.angle += 2;}
            if(vanFrontFlag == 1){vanFront.angle += 2;}
            if(vanillaFlag == 1){vanilla.angle += 2;}
            if(vaseFlag == 1){vase.angle += 2;}
            if(victoriaPlumFlag == 1){victoriaPlum.angle += 2;}
            if(violinFrontFlag == 1){victoriaPlumDouble.angle += 2;}
            if(violinFlag == 1){violin.angle += 2;}
            if(victoriaPlumDoubleFlag == 1){violinFront.angle += 2;}
            if(vultureFlag == 1){vulture.angle += 2;}
            if(vultureRightFlag == 1){vultureRight.angle += 2;}
            
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
            
            if(vObjectClicked == 10){
            
                askForLevelW = 1;
                /*game.leftArrow.kill();
                game.rightArrow.kill();*/
                game.wButton = game.add.sprite(1170, 730, 'wButton');             
                game.wButton.scale.setTo(1, 1); 
                game.wButton.anchor.setTo(spriteAnchorX, spriteAnchorY);
                
            }
            
        if(askForLevelW == 1){
            
            game.world.bringToTop(game.wButton);
            game.wButton.inputEnabled = true;
            game.wButton.events.onInputDown.add(onDownW, this);
            function onDownW() {
            
                //start next level
                
                this.setVGlobalVaribalesToZero();
                game.state.start('W');
                
            }
        }
           
        },
        
        resetVSpriteFlag: function(){
            
            vanFlag = 0;vanFrontFlag = 0;vanillaFlag = 0;violinFrontFlag = 0;vaseFlag = 0;
            victoriaPlumFlag = 0;violinFlag = 0;victoriaPlumDoubleFlag = 0;vultureFlag = 0;vultureRightFlag = 0;
            camelFlag = 0;candleFlag = 0;carFlag = 0;catFlag = 0;cheeseFlag = 0;cherryFlag = 0;
            clockFlag = 0;cowFlag = 0;crabFlag = 0;crownFlag = 0;

            van.angle = 0;vanFront.angle = 0;vanilla.angle = 0;victoriaPlumDouble.angle = 0;vase.angle = 0;
            victoriaPlum.angle = 0;violin.angle = 0;violinFront.angle = 0;vulture.angle = 0;vultureRight.angle = 0;
            camel.angle = 0;candle.angle = 0;car.angle = 0;cat.angle = 0;cheese.angle = 0;
            cherry.angle = 0;crown.angle = 0;clock.angle = 0;cow.angle = 0;crab.angle = 0;
           
        },
       
        setColorVFlagToZero: function(){
            
            bubbleSound.play(); blueFlag = 0;greenFlag = 0; redFlag = 0; cyanFlag = 0; pinkFlag = 0; orangeFlag = 0;
        },
        
        setVGlobalVaribalesToZero: function(){
            
            
            vanFlag = 0;vanFrontFlag = 0;vanillaFlag = 0;violinFrontFlag = 0;vaseFlag = 0;
            victoriaPlumFlag = 0;violinFlag = 0;victoriaPlumDoubleFlag = 0;vultureFlag = 0;vultureRightFlag = 0;
            camelFlag = 0;candleFlag = 0;carFlag = 0;catFlag = 0;cheeseFlag = 0;cherryFlag = 0;
            clockFlag = 0;cowFlag = 0;crabFlag = 0;crownFlag = 0;



            greenFlag = 0;blueFlag = 0;orangeFlag = 0;redFlag = 0;pinkFlag = 0;cyanFlag = 0;
        }
        
        
    };
