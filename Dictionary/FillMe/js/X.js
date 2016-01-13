        
    var xObjectClicked = 0;
    var askForLevelY = 0;
    
    
    var xenopusleftFlag = 0;
    var xenopusrightFlag = 0;
    var xenosaurusrightFlag = 0;            
    var xenosaurusleftFlag = 0;
    var xiphiasleftFlag = 0;
    var xiphiasrightFlag = 0;
    var xMasTreeFlag = 0;
    var xMasTree1Flag = 0;
    var xRayFlag = 0;
    var xylophoneFlag = 0;
    
    
    var X = {

        preload: function () {

            //setting default path for assets to be used in game
            this.load.path = './assets/X/';
            
            
            
            this.load.image("transXenopusleft", "transXenopusleft.png");
            this.load.image("transXenopusright", "transXenopusright.png");
            this.load.image("transXenosaurusright", "transXenosaurusright.png");
            this.load.image("transXenosaurusleft", "transXenosaurusleft.png");
            this.load.image("transXiphiasleft", "transXiphiasleft.png");
            this.load.image("transXiphiasright", "transXiphiasright.png");
            this.load.image("transXMasTree", "transXMasTree.png");
            this.load.image("transXMasTree1", "transXMasTree1.png");
            this.load.image("transXray", "transXray.png");
            this.load.image("transXylophone", "transXylophone.png");
            
            this.load.image("xenopusleft", "xenopusleft.png");
            this.load.image("xenopusright", "xenopusright.png");
            this.load.image("xenosaurusright", "xenosaurusright.png");
            this.load.image("xenosaurusleft", "xenosaurusleft.png");
            this.load.image("xiphiasleft", "xiphiasleft.png");
            this.load.image("xiphiasright", "xiphiasright.png");
            this.load.image("xMasTree", "xMasTree.png");
            this.load.image("xMasTree1", "xMasTree1.png");
            this.load.image("xRay", "xRay.png");
            this.load.image("xylophone", "xylophone.png");
            
            
            //loading assets for the level  X
            
            //loading shades
            this.load.image("blue", "blue.png");
            this.load.image("cyan", "cyan.png");
            this.load.image("green", "green.png");
            this.load.image("orange", "orange.png");
            this.load.image("pink", "pink.png");
            this.load.image("red", "red.png");
    
            this.load.image("bg", "bg.png");
            this.load.image("xLetter", "xLetter.png");
            this.load.image("yButton", "yButton.png");
           /* this.load.image("leftArrow", "leftArrow.png");
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
                
            
            
            
            //Main letter X
            xLetter = game.add.sprite(gameMinWidth, gameMinHeight, 'xLetter');
            xLetter.inputEnabled = true;
            xLetter.events.onInputDown.add(this.onDownxLetter, this);
            
            
            
            //Objects starting from X
                    
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
            
            
            
            
            xenopusleft = game.add.sprite(objectsPositions[0].x, objectsPositions[0].y, 'xenopusleft');
            xenopusleft.anchor.setTo(spriteAnchorX, spriteAnchorY);
            xenopusleft.scale.setTo(spriteScaleX, spriteScaleY);
            xenopusleft.inputEnabled = true;
            xenopusleft.events.onInputDown.add(onDownxenopusleft, this);
            function onDownxenopusleft() {this.resetXSpriteFlag(); xenopusleftFlag = 1;xObjectClicked++;}

            
            
            
            xenopusright = game.add.sprite(objectsPositions[10].x, objectsPositions[10].y, 'xenopusright');
            xenopusright.anchor.setTo(spriteAnchorX, spriteAnchorY);
            xenopusright.scale.setTo(spriteScaleX, spriteScaleY);
            xenopusright.inputEnabled = true;
            xenopusright.events.onInputDown.add(onDownxenopusright, this);
            function onDownxenopusright() {this.resetXSpriteFlag(); xenopusrightFlag = 1;xObjectClicked++;}

            
            
            
            xenosaurusright = game.add.sprite(objectsPositions[1].x, objectsPositions[1].y, 'xenosaurusright');
            xenosaurusright.anchor.setTo(spriteAnchorX, spriteAnchorY);
            xenosaurusright.scale.setTo(spriteScaleX, spriteScaleY);
            xenosaurusright.inputEnabled = true;
            xenosaurusright.events.onInputDown.add(onDownxenosaurusright, this);
            function onDownxenosaurusright() {this.resetXSpriteFlag(); xenosaurusrightFlag = 1;xObjectClicked++;}
            
            
            
            
            xenosaurusleft = game.add.sprite(objectsPositions[11].x, objectsPositions[11].y, 'xenosaurusleft');
            xenosaurusleft.anchor.setTo(spriteAnchorX, spriteAnchorY);
            xenosaurusleft.scale.setTo(spriteScaleX, spriteScaleY);
            xenosaurusleft.inputEnabled = true;
            xenosaurusleft.events.onInputDown.add(onDownxenosaurusleft, this);
            function onDownxenosaurusleft() {this.resetXSpriteFlag(); xenosaurusleftFlag = 1;xObjectClicked++;}
            
            
            
            xiphiasleft = game.add.sprite(objectsPositions[2].x, objectsPositions[2].y, 'xiphiasleft');
            xiphiasleft.anchor.setTo(spriteAnchorX, spriteAnchorY);
            xiphiasleft.scale.setTo(spriteScaleX, spriteScaleY);
            xiphiasleft.inputEnabled = true;
            xiphiasleft.events.onInputDown.add(onDownxiphiasleft, this);
            function onDownxiphiasleft() {this.resetXSpriteFlag(); xiphiasleftFlag = 1;xObjectClicked++;}
            
            xiphiasright = game.add.sprite(objectsPositions[12].x, objectsPositions[12].y, 'xiphiasright');
            xiphiasright.anchor.setTo(spriteAnchorX, spriteAnchorY);
            xiphiasright.scale.setTo(spriteScaleX, spriteScaleY);
            xiphiasright.inputEnabled = true;
            xiphiasright.events.onInputDown.add(onDownxiphiasright, this);
            function onDownxiphiasright() {this.resetXSpriteFlag(); xMasTree1Flag = 1;xObjectClicked++;}

            
            xMasTree = game.add.sprite(objectsPositions[3].x, objectsPositions[3].y, 'xMasTree');
            xMasTree.anchor.setTo(spriteAnchorX, spriteAnchorY);
            xMasTree.scale.setTo(spriteScaleX, spriteScaleY);
            xMasTree.inputEnabled = true;  
            xMasTree.events.onInputDown.add(onDownxMasTree, this);
            function onDownxMasTree() {this.resetXSpriteFlag(); xMasTreeFlag = 1;xObjectClicked++;}
            
            
            xMasTree1 = game.add.sprite(objectsPositions[13].x, objectsPositions[13].y, 'xMasTree1');
            xMasTree1.anchor.setTo(spriteAnchorX, spriteAnchorY);
            xMasTree1.scale.setTo(spriteScaleX, spriteScaleY);
            xMasTree1.inputEnabled = true;
            xMasTree1.events.onInputDown.add(onDownxMasTree1, this);
            function onDownxMasTree1() {this.resetXSpriteFlag(); xiphiasrightFlag = 1;xObjectClicked++;}
            
            
            xRay = game.add.sprite(objectsPositions[4].x, objectsPositions[4].y, 'xRay');
            xRay.anchor.setTo(spriteAnchorX, spriteAnchorY);
            xRay.scale.setTo(spriteScaleX, spriteScaleY);
            xRay.inputEnabled = true;
            xRay.events.onInputDown.add(onDownxRay, this);
            function onDownxRay() {this.resetXSpriteFlag(); xRayFlag = 1;xObjectClicked++;}
            
            
            xylophone = game.add.sprite(objectsPositions[14].x, objectsPositions[14].y, 'xylophone');
            xylophone.anchor.setTo(spriteAnchorX, spriteAnchorY);
            xylophone.scale.setTo(spriteScaleX, spriteScaleY);
            xylophone.inputEnabled = true;
            xylophone.events.onInputDown.add(onDownxylophone, this);
            function onDownxylophone() {this.resetXSpriteFlag(); xylophoneFlag = 1;xObjectClicked++;}
            
            
            
            //Adding other sprites        
            
            camel = game.add.sprite(objectsPositions[5].x, objectsPositions[5].y, 'camel');
            camel.anchor.setTo(spriteAnchorX, spriteAnchorY);
            camel.scale.setTo(spriteScaleX, spriteScaleY);
            camel.inputEnabled = true;
            camel.events.onInputDown.add(onDownCamel, this);
            function onDownCamel() {this.resetXSpriteFlag(); camelFlag = 1;}
            
            
            
            
            candle = game.add.sprite(objectsPositions[15].x, objectsPositions[15].y, 'candle');
            candle.anchor.setTo(spriteAnchorX, spriteAnchorY);
            candle.scale.setTo(spriteScaleX, spriteScaleY);
            candle.inputEnabled = true;
            candle.events.onInputDown.add(onDownCandle, this);
            function onDownCandle() {this.resetXSpriteFlag(); candleFlag = 1; }
            
            
            car = game.add.sprite(objectsPositions[6].x, objectsPositions[6].y, 'car');
            car.anchor.setTo(spriteAnchorX, spriteAnchorY);
            car.scale.setTo(spriteScaleX, spriteScaleY);
            car.inputEnabled = true;
            car.events.onInputDown.add(onDownCar, this);
            function onDownCar() {this.resetXSpriteFlag(); carFlag = 1;}
            
            cat = game.add.sprite(objectsPositions[16].x, objectsPositions[16].y, 'cat');
            cat.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cat.scale.setTo(spriteScaleX, spriteScaleY);
            cat.inputEnabled = true;
            cat.events.onInputDown.add(onDownCat, this);
            function onDownCat() {this.resetXSpriteFlag(); catFlag = 1;}
            
            
            cheese = game.add.sprite(objectsPositions[7].x, objectsPositions[7].y, 'cheese');
            cheese.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cheese.scale.setTo(spriteScaleX, spriteScaleY);
            cheese.inputEnabled = true;
            cheese.events.onInputDown.add(onDownCheese, this);
            function onDownCheese() {this.resetXSpriteFlag(); cheeseFlag = 1;}
            
            
            cherry = game.add.sprite(objectsPositions[17].x, objectsPositions[17].y, 'cherry');
            cherry.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cherry.scale.setTo(spriteScaleX, spriteScaleY);
            cherry.inputEnabled = true;
            cherry.events.onInputDown.add(onDownCherry, this);
            function onDownCherry() {this.resetXSpriteFlag(); cherryFlag = 1;}
            
            
            clock = game.add.sprite(objectsPositions[8].x, objectsPositions[8].y, 'clock');
            clock.anchor.setTo(spriteAnchorX, spriteAnchorY);
            clock.scale.setTo(spriteScaleX, spriteScaleY);
            clock.inputEnabled = true;
            clock.events.onInputDown.add(onDownClock, this);
            function onDownClock() {this.resetXSpriteFlag(); clockFlag = 1;}
            
            
            
            cow = game.add.sprite(objectsPositions[18].x, objectsPositions[18].y, 'cow');
            cow.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cow.scale.setTo(spriteScaleX, spriteScaleY);
            cow.inputEnabled = true;
            cow.events.onInputDown.add(onDownCow, this);
            function onDownCow() {this.resetXSpriteFlag(); cowFlag = 1;}
            
            
            crab = game.add.sprite(objectsPositions[9].x, objectsPositions[9].y, 'crab');
            crab.anchor.setTo(spriteAnchorX, spriteAnchorY);
            crab.scale.setTo(spriteScaleX, spriteScaleY);
            crab.inputEnabled = true;
            crab.events.onInputDown.add(onDownCrab, this);
            function onDownCrab() {this.resetXSpriteFlag(); crabFlag = 1;}
            
            
            crown = game.add.sprite(objectsPositions[19].x, objectsPositions[19].y, 'crown');
            crown.anchor.setTo(spriteAnchorX, spriteAnchorY);
            crown.scale.setTo(spriteScaleX, spriteScaleY);
            crown.inputEnabled = true;
            crown.events.onInputDown.add(onDownCrown, this);
            function onDownCrown() {this.resetXSpriteFlag(); crownFlag = 1;}
            
            /*game.leftArrow = game.add.sprite(1070, 730, 'leftArrow');             
            game.leftArrow.scale.setTo(1, 1); 
            game.leftArrow.anchor.setTo(spriteAnchorX, spriteAnchorY);
            game.leftArrow.inputEnabled = true;
            game.leftArrow.events.onInputDown.add(onDownLeftArrow, this);
            function onDownLeftArrow() {this.setXGlobalVaribalesToZero();game.state.start('W');}
            
            
            game.rightArrow = game.add.sprite(1170, 730, 'rightArrow');             
            game.rightArrow.scale.setTo(1, 1); 
            game.rightArrow.anchor.setTo(spriteAnchorX, spriteAnchorY);
            game.rightArrow.inputEnabled = true;
            game.rightArrow.events.onInputDown.add(onDownRightArrow, this);
            function onDownRightArrow() {this.setXGlobalVaribalesToZero();game.state.start('Y');}*/
            
            //Color shades
            blue = game.add.sprite(objectsPositions[20].x, objectsPositions[20].y, 'blue');
            blue.anchor.setTo(spriteAnchorX, spriteAnchorY);
            blue.scale.setTo(shadeScaleX, shadeScaleY);
            blue.inputEnabled = true;
            blue.tint = 0x456AC1; 
            blue.events.onInputDown.add(onDownBlue, this);
            function onDownBlue() {this.setColorXFlagToZero(); blueFlag = 1;}
           
            
            cyan = game.add.sprite(objectsPositions[21].x, objectsPositions[21].y, 'cyan');
            cyan.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cyan.scale.setTo(shadeScaleX, shadeScaleY);
            cyan.inputEnabled = true;
            cyan.tint = 0x45C1C1; 
            cyan.events.onInputDown.add(onDownCyan, this);
            function onDownCyan() {this.setColorXFlagToZero(); cyanFlag = 1;}
            
            
            
            green = game.add.sprite(objectsPositions[22].x, objectsPositions[22].y, 'green');
            green.anchor.setTo(spriteAnchorX, spriteAnchorY);
            green.scale.setTo(shadeScaleX, shadeScaleY);
            green.inputEnabled = true;
            green.tint = 0x51C735;
            green.events.onInputDown.add(onDownGreen, this);
            function onDownGreen() {this.setColorXFlagToZero(); greenFlag = 1;}
            
            
            orange = game.add.sprite(objectsPositions[23].x, objectsPositions[23].y, 'orange');
            orange.anchor.setTo(spriteAnchorX, spriteAnchorY);
            orange.scale.setTo(shadeScaleX, shadeScaleY);
            orange.inputEnabled = true;
            orange.tint = 0xF38932;
            orange.events.onInputDown.add(onDownOrange, this);
            function onDownOrange() {this.setColorXFlagToZero(); orangeFlag = 1;}
           
            
            pink = game.add.sprite(objectsPositions[24].x, objectsPositions[24].y, 'pink');
            pink.anchor.setTo(spriteAnchorX, spriteAnchorY);
            pink.scale.setTo(shadeScaleX, shadeScaleY);
            pink.inputEnabled = true;
            pink.tint = 0xCC3ACC;
            pink.events.onInputDown.add(onDownPink, this);
            function onDownPink() {this.setColorXFlagToZero(); pinkFlag = 1;}
            
            
            red = game.add.sprite(objectsPositions[25].x, objectsPositions[25].y, 'red');
            red.anchor.setTo(spriteAnchorX, spriteAnchorY);
            red.scale.setTo(shadeScaleX, shadeScaleY);
            red.inputEnabled = true;
            red.tint = 0xE32424;
            red.events.onInputDown.add(onDownRed, this);
            function onDownRed() {this.setColorXFlagToZero(); redFlag = 1;}
                
        },
        
        onDownxLetter: function() {
                
            //xenopusleft
                    if(xenopusleftFlag == 1 && greenFlag == 1 ){var greenxenopusleft = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transXenopusleft');greenxenopusleft.tint =  0x51C735; greenxenopusleft.scale.setTo(spriteScaleX, spriteScaleY); 
greenxenopusleft.anchor.setTo(0.6, 0.6);stickSound.play();}                    
                    
                    if(xenopusleftFlag == 1 && blueFlag == 1){var bluexenopusleft = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transXenopusleft'); bluexenopusleft.tint =  0x456AC1; bluexenopusleft.scale.setTo(spriteScaleX, spriteScaleY); bluexenopusleft.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(xenopusleftFlag == 1 && orangeFlag == 1){var orangexenopusleft = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transXenopusleft'); orangexenopusleft.tint =  0xF38932; orangexenopusleft.scale.setTo(spriteScaleX, spriteScaleY); orangexenopusleft.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(xenopusleftFlag == 1 && redFlag == 1){var redxenopusleft = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transXenopusleft'); redxenopusleft.tint =  0xE32424; redxenopusleft.scale.setTo(spriteScaleX, spriteScaleY); redxenopusleft.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(xenopusleftFlag == 1 && pinkFlag == 1){var pinkxenopusleft = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transXenopusleft'); pinkxenopusleft.tint =  0xCC3ACC; pinkxenopusleft.scale.setTo(spriteScaleX, spriteScaleY); pinkxenopusleft.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(xenopusleftFlag == 1 && cyanFlag == 1){var cyanxenopusleft = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transXenopusleft'); cyanxenopusleft.tint =  0x45C1C1; cyanxenopusleft.scale.setTo(spriteScaleX, spriteScaleY); cyanxenopusleft.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //xenopusright    
                    if(xenopusrightFlag == 1 && greenFlag == 1 ){var greenxenopusright = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transXenopusright');greenxenopusright.tint =  0x51C735; greenxenopusright.scale.setTo(spriteScaleX, spriteScaleY); 
greenxenopusright.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(xenopusrightFlag == 1 && blueFlag == 1){var bluexenopusright = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transXenopusright'); bluexenopusright.tint =  0x456AC1; bluexenopusright.scale.setTo(spriteScaleX, spriteScaleY); bluexenopusright.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(xenopusrightFlag == 1 && orangeFlag == 1){var orangexenopusright = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transXenopusright'); orangexenopusright.tint =  0xF38932; orangexenopusright.scale.setTo(spriteScaleX, spriteScaleY); orangexenopusright.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(xenopusrightFlag == 1 && redFlag == 1){var redxenopusright = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transXenopusright'); redxenopusright.tint =  0xE32424; redxenopusright.scale.setTo(spriteScaleX, spriteScaleY); redxenopusright.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(xenopusrightFlag == 1 && pinkFlag == 1){var pinkxenopusright = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transXenopusright'); pinkxenopusright.tint =  0xCC3ACC; pinkxenopusright.scale.setTo(spriteScaleX, spriteScaleY); pinkxenopusright.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(xenopusrightFlag == 1 && cyanFlag == 1){var cyanxenopusright = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transXenopusright'); cyanxenopusright.tint =  0x45C1C1; cyanxenopusright.scale.setTo(spriteScaleX, spriteScaleY); cyanxenopusright.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //xenosaurusright    
                    if(xenosaurusrightFlag == 1 && greenFlag == 1 ){var greenxenosaurusright = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transXenosaurusright');greenxenosaurusright.tint =  0x51C735; greenxenosaurusright.scale.setTo(spriteScaleX, spriteScaleY); 
greenxenosaurusright.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(xenosaurusrightFlag == 1 && blueFlag == 1){var bluexenosaurusright = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transXenosaurusright'); bluexenosaurusright.tint =  0x456AC1; bluexenosaurusright.scale.setTo(spriteScaleX, spriteScaleY); bluexenosaurusright.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(xenosaurusrightFlag == 1 && orangeFlag == 1){var orangexenosaurusright = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transXenosaurusright'); orangexenosaurusright.tint =  0xF38932; orangexenosaurusright.scale.setTo(spriteScaleX, spriteScaleY); orangexenosaurusright.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(xenosaurusrightFlag == 1 && redFlag == 1){var redxenosaurusright = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transXenosaurusright'); redxenosaurusright.tint =  0xE32424; redxenosaurusright.scale.setTo(spriteScaleX, spriteScaleY); redxenosaurusright.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(xenosaurusrightFlag == 1 && pinkFlag == 1){var pinkxenosaurusright = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transXenosaurusright'); pinkxenosaurusright.tint =  0xCC3ACC; pinkxenosaurusright.scale.setTo(spriteScaleX, spriteScaleY); pinkxenosaurusright.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(xenosaurusrightFlag == 1 && cyanFlag == 1){var cyanxenosaurusright = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transXenosaurusright'); cyanxenosaurusright.tint =  0x45C1C1; cyanxenosaurusright.scale.setTo(spriteScaleX, spriteScaleY); cyanxenosaurusright.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //xenosaurusleft
                    if(xenosaurusleftFlag == 1 && greenFlag == 1 ){var greenxenosaurusleft = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transXenosaurusleft');greenxenosaurusleft.tint =  0x51C735; greenxenosaurusleft.scale.setTo(spriteScaleX, spriteScaleY); 
greenxenosaurusleft.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(xenosaurusleftFlag == 1 && blueFlag == 1){console.log("bluexenosaurusleft plotted");var bluexenosaurusleft = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transXenosaurusleft'); bluexenosaurusleft.tint =  0x456AC1; bluexenosaurusleft.scale.setTo(spriteScaleX, spriteScaleY); bluexenosaurusleft.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(xenosaurusleftFlag == 1 && orangeFlag == 1){var orangexenosaurusleft = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transXenosaurusleft'); orangexenosaurusleft.tint =  0xF38932; orangexenosaurusleft.scale.setTo(spriteScaleX, spriteScaleY); orangexenosaurusleft.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(xenosaurusleftFlag == 1 && redFlag == 1){var redxenosaurusleft = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transXenosaurusleft'); redxenosaurusleft.tint =  0xE32424; redxenosaurusleft.scale.setTo(spriteScaleX, spriteScaleY); redxenosaurusleft.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(xenosaurusleftFlag == 1 && pinkFlag == 1){var pinkxenosaurusleft = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transXenosaurusleft'); pinkxenosaurusleft.tint =  0xCC3ACC; pinkxenosaurusleft.scale.setTo(spriteScaleX, spriteScaleY); pinkxenosaurusleft.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(xenosaurusleftFlag == 1 && cyanFlag == 1){var cyanxenosaurusleft = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transXenosaurusleft'); cyanxenosaurusleft.tint =  0x45C1C1; cyanxenosaurusleft.scale.setTo(spriteScaleX, spriteScaleY); cyanxenosaurusleft.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //xiphiasleft    
                    if(xiphiasleftFlag == 1 && greenFlag == 1 ){var greenxiphiasleft = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transXiphiasleft');greenxiphiasleft.tint =  0x51C735; greenxiphiasleft.scale.setTo(spriteScaleX, spriteScaleY); 
greenxiphiasleft.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(xiphiasleftFlag == 1 && blueFlag == 1){console.log("bluexiphiasleft plotted");var bluexiphiasleft = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transXiphiasleft'); bluexiphiasleft.tint =  0x456AC1; bluexiphiasleft.scale.setTo(spriteScaleX, spriteScaleY); bluexiphiasleft.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(xiphiasleftFlag == 1 && orangeFlag == 1){var orangexiphiasleft = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transXiphiasleft'); orangexiphiasleft.tint =  0xF38932; orangexiphiasleft.scale.setTo(spriteScaleX, spriteScaleY); orangexiphiasleft.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(xiphiasleftFlag == 1 && redFlag == 1){var redxiphiasleft = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transXiphiasleft'); redxiphiasleft.tint =  0xE32424; redxiphiasleft.scale.setTo(spriteScaleX, spriteScaleY); redxiphiasleft.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(xiphiasleftFlag == 1 && pinkFlag == 1){var pinkxiphiasleft = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transXiphiasleft'); pinkxiphiasleft.tint =  0xCC3ACC; pinkxiphiasleft.scale.setTo(spriteScaleX, spriteScaleY); pinkxiphiasleft.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(xiphiasleftFlag == 1 && cyanFlag == 1){var cyanxiphiasleft = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transXiphiasleft'); cyanxiphiasleft.tint =  0x45C1C1; cyanxiphiasleft.scale.setTo(spriteScaleX, spriteScaleY); cyanxiphiasleft.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //xiphiasright   
                    if(xMasTree1Flag == 1 && greenFlag == 1 ){var greenxiphiasright = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transXiphiasright');greenxiphiasright.tint =  0x51C735; greenxiphiasright.scale.setTo(spriteScaleX, spriteScaleY); 
greenxiphiasright.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(xMasTree1Flag == 1 && blueFlag == 1){console.log("bluexiphiasright plotted");var bluexiphiasright = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transXiphiasright'); bluexiphiasright.tint =  0x456AC1; bluexiphiasright.scale.setTo(spriteScaleX, spriteScaleY); bluexiphiasright.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(xMasTree1Flag == 1 && orangeFlag == 1){var orangexiphiasright = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transXiphiasright'); orangexiphiasright.tint =  0xF38932; orangexiphiasright.scale.setTo(spriteScaleX, spriteScaleY); orangexiphiasright.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(xMasTree1Flag == 1 && redFlag == 1){var redxiphiasright = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transXiphiasright'); redxiphiasright.tint =  0xE32424; redxiphiasright.scale.setTo(spriteScaleX, spriteScaleY); redxiphiasright.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(xMasTree1Flag == 1 && pinkFlag == 1){var pinkxiphiasright = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transXiphiasright'); pinkxiphiasright.tint =  0xCC3ACC; pinkxiphiasright.scale.setTo(spriteScaleX, spriteScaleY); pinkxiphiasright.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(xMasTree1Flag == 1 && cyanFlag == 1){var cyanxiphiasright = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transXiphiasright'); cyanxiphiasright.tint =  0x45C1C1; cyanxiphiasright.scale.setTo(spriteScaleX, spriteScaleY); cyanxiphiasright.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //xMasTree    
                    if(xMasTreeFlag == 1 && greenFlag == 1 ){var greenxMasTree = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transXMasTree');greenxMasTree.tint =  0x51C735; greenxMasTree.scale.setTo(spriteScaleX, spriteScaleY); 
greenxMasTree.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(xMasTreeFlag == 1 && blueFlag == 1){console.log("bluexMasTree plotted");var bluexMasTree = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transXMasTree'); bluexMasTree.tint =  0x456AC1; bluexMasTree.scale.setTo(spriteScaleX, spriteScaleY); bluexMasTree.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(xMasTreeFlag == 1 && orangeFlag == 1){var orangexMasTree = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transXMasTree'); orangexMasTree.tint =  0xF38932; orangexMasTree.scale.setTo(spriteScaleX, spriteScaleY); orangexMasTree.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(xMasTreeFlag == 1 && redFlag == 1){var redxMasTree = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transXMasTree'); redxMasTree.tint =  0xE32424; redxMasTree.scale.setTo(spriteScaleX, spriteScaleY); redxMasTree.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(xMasTreeFlag == 1 && pinkFlag == 1){var pinkxMasTree = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transXMasTree'); pinkxMasTree.tint =  0xCC3ACC; pinkxMasTree.scale.setTo(spriteScaleX, spriteScaleY); pinkxMasTree.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(xMasTreeFlag == 1 && cyanFlag == 1){var cyanxMasTree = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transXMasTree'); cyanxMasTree.tint =  0x45C1C1; cyanxMasTree.scale.setTo(spriteScaleX, spriteScaleY); cyanxMasTree.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //xMasTree1    
                    if(xiphiasrightFlag == 1 && greenFlag == 1 ){var greenxMasTree1 = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transXMasTree1');greenxMasTree1.tint =  0x51C735; greenxMasTree1.scale.setTo(spriteScaleX, spriteScaleY); 
greenxMasTree1.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(xiphiasrightFlag == 1 && blueFlag == 1){console.log("bluexMasTree1 plotted");var bluexMasTree1 = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transXMasTree1'); bluexMasTree1.tint =  0x456AC1; bluexMasTree1.scale.setTo(spriteScaleX, spriteScaleY); bluexMasTree1.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(xiphiasrightFlag == 1 && orangeFlag == 1){var orangexMasTree1 = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transXMasTree1'); orangexMasTree1.tint =  0xF38932; orangexMasTree1.scale.setTo(spriteScaleX, spriteScaleY); orangexMasTree1.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(xiphiasrightFlag == 1 && redFlag == 1){var redxMasTree1 = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transXMasTree1'); redxMasTree1.tint =  0xE32424; redxMasTree1.scale.setTo(spriteScaleX, spriteScaleY); redxMasTree1.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(xiphiasrightFlag == 1 && pinkFlag == 1){var pinkxMasTree1 = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transXMasTree1'); pinkxMasTree1.tint =  0xCC3ACC; pinkxMasTree1.scale.setTo(spriteScaleX, spriteScaleY); pinkxMasTree1.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(xiphiasrightFlag == 1 && cyanFlag == 1){var cyanxMasTree1 = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transXMasTree1'); cyanxMasTree1.tint =  0x45C1C1; cyanxMasTree1.scale.setTo(spriteScaleX, spriteScaleY); cyanxMasTree1.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //xRay    
                    if(xRayFlag == 1 && greenFlag == 1 ){var greenxRay = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transXray');greenxRay.tint =  0x51C735; greenxRay.scale.setTo(spriteScaleX, spriteScaleY); 
greenxRay.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(xRayFlag == 1 && blueFlag == 1){console.log("bluexRay plotted");var bluexRay = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transXray'); bluexRay.tint =  0x456AC1; bluexRay.scale.setTo(spriteScaleX, spriteScaleY); bluexRay.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(xRayFlag == 1 && orangeFlag == 1){var orangexRay = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transXray'); orangexRay.tint =  0xF38932; orangexRay.scale.setTo(spriteScaleX, spriteScaleY); orangexRay.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(xRayFlag == 1 && redFlag == 1){var redxRay = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transXray'); redxRay.tint =  0xE32424; redxRay.scale.setTo(spriteScaleX, spriteScaleY); redxRay.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(xRayFlag == 1 && pinkFlag == 1){var pinkxRay = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transXray'); pinkxRay.tint =  0xCC3ACC; pinkxRay.scale.setTo(spriteScaleX, spriteScaleY); pinkxRay.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(xRayFlag == 1 && cyanFlag == 1){var cyanxRay = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transXray'); cyanxRay.tint =  0x45C1C1; cyanxRay.scale.setTo(spriteScaleX, spriteScaleY); cyanxRay.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //xylophone 
                    if(xylophoneFlag == 1 && greenFlag == 1 ){var greenxylophone = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transXylophone');greenxylophone.tint =  0x51C735; greenxylophone.scale.setTo(spriteScaleX, spriteScaleY); 
greenxylophone.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(xylophoneFlag == 1 && blueFlag == 1){console.log("bluexylophone plotted");var bluexylophone = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transXylophone'); bluexylophone.tint =  0x456AC1; bluexylophone.scale.setTo(spriteScaleX, spriteScaleY); bluexylophone.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(xylophoneFlag == 1 && orangeFlag == 1){var orangexylophone = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transXylophone'); orangexylophone.tint =  0xF38932; orangexylophone.scale.setTo(spriteScaleX, spriteScaleY); orangexylophone.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(xylophoneFlag == 1 && redFlag == 1){var redxylophone = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transXylophone'); redxylophone.tint =  0xE32424; redxylophone.scale.setTo(spriteScaleX, spriteScaleY); redxylophone.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(xylophoneFlag == 1 && pinkFlag == 1){var pinkxylophone = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transXylophone'); pinkxylophone.tint =  0xCC3ACC; pinkxylophone.scale.setTo(spriteScaleX, spriteScaleY); pinkxylophone.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(xylophoneFlag == 1 && cyanFlag == 1){var cyanxylophone = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transXylophone'); cyanxylophone.tint =  0x45C1C1; cyanxylophone.scale.setTo(spriteScaleX, spriteScaleY); cyanxylophone.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
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
            
            game.world.bringToTop(xLetter);
            
            game.world.bringToTop(blue);
            game.world.bringToTop(green);
            game.world.bringToTop(red);
            game.world.bringToTop(cyan);
            game.world.bringToTop(orange);
            game.world.bringToTop(pink);
            
            game.world.bringToTop(cloud1);
            game.world.bringToTop(cloud2);
            game.world.bringToTop(cloud3);
            
            game.world.bringToTop(xenopusleft);
            game.world.bringToTop(xenopusright);
            game.world.bringToTop(xenosaurusright);
            game.world.bringToTop(xenosaurusleft);
            game.world.bringToTop(xiphiasleft);
            game.world.bringToTop(xiphiasright);
            game.world.bringToTop(xMasTree);
            game.world.bringToTop(xMasTree1);
            game.world.bringToTop(xRay);
            game.world.bringToTop(xylophone);
            
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
            game.world.bringToTop(game.rightArrow);*/
            
            
            
            if(xenopusleftFlag == 1){xenopusleft.angle += 2;}
            if(xenopusrightFlag == 1){xenopusright.angle += 2;}
            if(xenosaurusrightFlag == 1){xenosaurusright.angle += 2;}
            if(xenosaurusleftFlag == 1){xenosaurusleft.angle += 2;}
            if(xiphiasleftFlag == 1){xiphiasleft.angle += 2;}
            if(xMasTree1Flag == 1){xiphiasright.angle += 2;}
            if(xMasTreeFlag == 1){xMasTree.angle += 2;}
            if(xiphiasrightFlag == 1){xMasTree1.angle += 2;}
            if(xRayFlag == 1){xRay.angle += 2;}
            if(xylophoneFlag == 1){xylophone.angle += 2;}
            
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
            
            if(xObjectClicked == 10){
            
                askForLevelY = 1;
               /* game.leftArrow.kill();
                game.rightArrow.kill();*/
                game.yButton = game.add.sprite(1170, 730, 'yButton');             
                game.yButton.scale.setTo(1, 1); 
                game.yButton.anchor.setTo(spriteAnchorX, spriteAnchorY);
                
            }
            
        if(askForLevelY == 1){
            
            game.world.bringToTop(game.yButton);
            game.yButton.inputEnabled = true;
            game.yButton.events.onInputDown.add(onDownY, this);
            function onDownY() {
            
                //start next level
                
                this.setXGlobalVaribalesToZero();
                game.state.start('Y');
                
            }
        }
           
        },
        
        resetXSpriteFlag: function(){
            
            xenopusleftFlag = 0;xenopusrightFlag = 0;xenosaurusrightFlag = 0;xMasTree1Flag = 0;xenosaurusleftFlag = 0;
            xiphiasleftFlag = 0;xMasTreeFlag = 0;xiphiasrightFlag = 0;xRayFlag = 0;xylophoneFlag = 0;
            camelFlag = 0;candleFlag = 0;carFlag = 0;catFlag = 0;cheeseFlag = 0;cherryFlag = 0;
            clockFlag = 0;cowFlag = 0;crabFlag = 0;crownFlag = 0;

            xenopusleft.angle = 0;xenopusright.angle = 0;xenosaurusright.angle = 0;xiphiasright.angle = 0;xenosaurusleft.angle = 0;
            xiphiasleft.angle = 0;xMasTree.angle = 0;xMasTree1.angle = 0;xRay.angle = 0;xylophone.angle = 0;
            camel.angle = 0;candle.angle = 0;car.angle = 0;cat.angle = 0;cheese.angle = 0;
            cherry.angle = 0;crown.angle = 0;clock.angle = 0;cow.angle = 0;crab.angle = 0;
           
        },
       
        setColorXFlagToZero: function(){
            
            bubbleSound.play(); blueFlag = 0;greenFlag = 0; redFlag = 0; cyanFlag = 0; pinkFlag = 0; orangeFlag = 0;
        },
        
        setXGlobalVaribalesToZero: function(){
            
            
            xenopusleftFlag = 0;xenopusrightFlag = 0;xenosaurusrightFlag = 0;xMasTree1Flag = 0;xenosaurusleftFlag = 0;
            xiphiasleftFlag = 0;xMasTreeFlag = 0;xiphiasrightFlag = 0;xRayFlag = 0;xylophoneFlag = 0;
            camelFlag = 0;candleFlag = 0;carFlag = 0;catFlag = 0;cheeseFlag = 0;cherryFlag = 0;
            clockFlag = 0;cowFlag = 0;crabFlag = 0;crownFlag = 0;



            greenFlag = 0;blueFlag = 0;orangeFlag = 0;redFlag = 0;pinkFlag = 0;cyanFlag = 0;
        }
        
        
    };
