        
    var hObjectClicked = 0;
    var askForLevelI = 0;
    
    
    var hammerFlag = 0;
    var hangerFlag = 0;
    var harpFlag = 0;            
    var hatFlag = 0;
    var heartFlag = 0;
    var helicopterFlag = 0;
    var helmetFlag = 0;
    var henFlag = 0;
    var horseFlag = 0;
    var houseFlag = 0;
    
    
    var H = {

        preload: function () {

            //setting default path for assets to be used in game
            this.load.path = './assets/H/';
            
            
            
            this.load.image("transHammer", "transHammer.png");
            this.load.image("transHanger", "transHanger.png");
            this.load.image("transHarp", "transHarp.png");
            this.load.image("transHat", "transHat.png");
            this.load.image("transHeart", "transHeart.png");
            this.load.image("transHelicopter", "transHelicopter.png");
            this.load.image("transHelmet", "transHelmet.png");
            this.load.image("transHen", "transHen.png");
            this.load.image("transHorse", "transHorse.png");
            this.load.image("transHouse", "transHouse.png");
            
            this.load.image("hammer", "hammer.png");
            this.load.image("hanger", "hanger.png");
            this.load.image("harp", "harp.png");
            this.load.image("hat", "hat.png");
            this.load.image("heart", "heart.png");
            this.load.image("helicopter", "helicopter.png");
            this.load.image("helmet", "helmet.png");
            this.load.image("hen", "hen.png");
            this.load.image("horse", "horse.png");
            this.load.image("house", "house.png");
            
            
            //loading assets for the level  H
            
            //loading shades
            this.load.image("blue", "blue.png");
            this.load.image("cyan", "cyan.png");
            this.load.image("green", "green.png");
            this.load.image("orange", "orange.png");
            this.load.image("pink", "pink.png");
            this.load.image("red", "red.png");
    
            this.load.image("bg", "bg.png");
            this.load.image("hLetter", "hLetter.png");
            this.load.image("iButton", "iButton.png");
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
                
            
            
            
            //Main letter H
            hLetter = game.add.sprite(gameMinWidth, gameMinHeight, 'hLetter');
            hLetter.inputEnabled = true;
            hLetter.events.onInputDown.add(this.onDownhLetter, this);
            
            
            
            //Objects starting from H
                    
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
            
            
            
            
            hammer = game.add.sprite(objectsPositions[0].x, objectsPositions[0].y, 'hammer');
            hammer.anchor.setTo(spriteAnchorX, spriteAnchorY);
            hammer.scale.setTo(spriteScaleX, spriteScaleY);
            hammer.inputEnabled = true;
            hammer.events.onInputDown.add(onDownhammer, this);
            function onDownhammer() {this.resetHSpriteFlag(); hammerFlag = 1;hObjectClicked++;}

            
            
            
            hanger = game.add.sprite(objectsPositions[10].x, objectsPositions[10].y, 'hanger');
            hanger.anchor.setTo(spriteAnchorX, spriteAnchorY);
            hanger.scale.setTo(spriteScaleX, spriteScaleY);
            hanger.inputEnabled = true;
            hanger.events.onInputDown.add(onDownhanger, this);
            function onDownhanger() {this.resetHSpriteFlag(); hangerFlag = 1;hObjectClicked++;}

            
            
            
            harp = game.add.sprite(objectsPositions[1].x, objectsPositions[1].y, 'harp');
            harp.anchor.setTo(spriteAnchorX, spriteAnchorY);
            harp.scale.setTo(spriteScaleX, spriteScaleY);
            harp.inputEnabled = true;
            harp.events.onInputDown.add(onDownharp, this);
            function onDownharp() {this.resetHSpriteFlag(); harpFlag = 1;hObjectClicked++;}
            
            
            
            
            hat = game.add.sprite(objectsPositions[11].x, objectsPositions[11].y, 'hat');
            hat.anchor.setTo(spriteAnchorX, spriteAnchorY);
            hat.scale.setTo(spriteScaleX, spriteScaleY);
            hat.inputEnabled = true;
            hat.events.onInputDown.add(onDownhat, this);
            function onDownhat() {this.resetHSpriteFlag(); hatFlag = 1;hObjectClicked++;}
            
            
            
            heart = game.add.sprite(objectsPositions[2].x, objectsPositions[2].y, 'heart');
            heart.anchor.setTo(spriteAnchorX, spriteAnchorY);
            heart.scale.setTo(spriteScaleX, spriteScaleY);
            heart.inputEnabled = true;
            heart.events.onInputDown.add(onDownheart, this);
            function onDownheart() {this.resetHSpriteFlag(); heartFlag = 1;hObjectClicked++;}
            
            helicopter = game.add.sprite(objectsPositions[12].x, objectsPositions[12].y, 'helicopter');
            helicopter.anchor.setTo(spriteAnchorX, spriteAnchorY);
            helicopter.scale.setTo(spriteScaleX, spriteScaleY);
            helicopter.inputEnabled = true;
            helicopter.events.onInputDown.add(onDownhelicopter, this);
            function onDownhelicopter() {this.resetHSpriteFlag(); henFlag = 1;hObjectClicked++;}

            
            helmet = game.add.sprite(objectsPositions[3].x, objectsPositions[3].y, 'helmet');
            helmet.anchor.setTo(spriteAnchorX, spriteAnchorY);
            helmet.scale.setTo(spriteScaleX, spriteScaleY);
            helmet.inputEnabled = true;  
            helmet.events.onInputDown.add(onDownhelmet, this);
            function onDownhelmet() {this.resetHSpriteFlag(); helmetFlag = 1;hObjectClicked++;}
            
            
            hen = game.add.sprite(objectsPositions[13].x, objectsPositions[13].y, 'hen');
            hen.anchor.setTo(spriteAnchorX, spriteAnchorY);
            hen.scale.setTo(spriteScaleX, spriteScaleY);
            hen.inputEnabled = true;
            hen.events.onInputDown.add(onDownhen, this);
            function onDownhen() {this.resetHSpriteFlag(); helicopterFlag = 1;hObjectClicked++;}
            
            
            horse = game.add.sprite(objectsPositions[4].x, objectsPositions[4].y, 'horse');
            horse.anchor.setTo(spriteAnchorX, spriteAnchorY);
            horse.scale.setTo(spriteScaleX, spriteScaleY);
            horse.inputEnabled = true;
            horse.events.onInputDown.add(onDownhorse, this);
            function onDownhorse() {this.resetHSpriteFlag(); horseFlag = 1;hObjectClicked++;}
            
            
            house = game.add.sprite(objectsPositions[14].x, objectsPositions[14].y, 'house');
            house.anchor.setTo(spriteAnchorX, spriteAnchorY);
            house.scale.setTo(spriteScaleX, spriteScaleY);
            house.inputEnabled = true;
            house.events.onInputDown.add(onDownhouse, this);
            function onDownhouse() {this.resetHSpriteFlag(); houseFlag = 1;hObjectClicked++;}
            
            
            
            //Adding other sprites        
            
            camel = game.add.sprite(objectsPositions[5].x, objectsPositions[5].y, 'camel');
            camel.anchor.setTo(spriteAnchorX, spriteAnchorY);
            camel.scale.setTo(spriteScaleX, spriteScaleY);
            camel.inputEnabled = true;
            camel.events.onInputDown.add(onDownCamel, this);
            function onDownCamel() {this.resetHSpriteFlag(); camelFlag = 1;}
            
            
            
            
            candle = game.add.sprite(objectsPositions[15].x, objectsPositions[15].y, 'candle');
            candle.anchor.setTo(spriteAnchorX, spriteAnchorY);
            candle.scale.setTo(spriteScaleX, spriteScaleY);
            candle.inputEnabled = true;
            candle.events.onInputDown.add(onDownCandle, this);
            function onDownCandle() {this.resetHSpriteFlag(); candleFlag = 1; }
            
            
            car = game.add.sprite(objectsPositions[6].x, objectsPositions[6].y, 'car');
            car.anchor.setTo(spriteAnchorX, spriteAnchorY);
            car.scale.setTo(spriteScaleX, spriteScaleY);
            car.inputEnabled = true;
            car.events.onInputDown.add(onDownCar, this);
            function onDownCar() {this.resetHSpriteFlag(); carFlag = 1;}
            
            cat = game.add.sprite(objectsPositions[16].x, objectsPositions[16].y, 'cat');
            cat.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cat.scale.setTo(spriteScaleX, spriteScaleY);
            cat.inputEnabled = true;
            cat.events.onInputDown.add(onDownCat, this);
            function onDownCat() {this.resetHSpriteFlag(); catFlag = 1;}
            
            
            cheese = game.add.sprite(objectsPositions[7].x, objectsPositions[7].y, 'cheese');
            cheese.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cheese.scale.setTo(spriteScaleX, spriteScaleY);
            cheese.inputEnabled = true;
            cheese.events.onInputDown.add(onDownCheese, this);
            function onDownCheese() {this.resetHSpriteFlag(); cheeseFlag = 1;}
            
            
            cherry = game.add.sprite(objectsPositions[17].x, objectsPositions[17].y, 'cherry');
            cherry.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cherry.scale.setTo(spriteScaleX, spriteScaleY);
            cherry.inputEnabled = true;
            cherry.events.onInputDown.add(onDownCherry, this);
            function onDownCherry() {this.resetHSpriteFlag(); cherryFlag = 1;}
            
            
            clock = game.add.sprite(objectsPositions[8].x, objectsPositions[8].y, 'clock');
            clock.anchor.setTo(spriteAnchorX, spriteAnchorY);
            clock.scale.setTo(spriteScaleX, spriteScaleY);
            clock.inputEnabled = true;
            clock.events.onInputDown.add(onDownClock, this);
            function onDownClock() {this.resetHSpriteFlag(); clockFlag = 1;}
            
            
            
            cow = game.add.sprite(objectsPositions[18].x, objectsPositions[18].y, 'cow');
            cow.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cow.scale.setTo(spriteScaleX, spriteScaleY);
            cow.inputEnabled = true;
            cow.events.onInputDown.add(onDownCow, this);
            function onDownCow() {this.resetHSpriteFlag(); cowFlag = 1;}
            
            
            crab = game.add.sprite(objectsPositions[9].x, objectsPositions[9].y, 'crab');
            crab.anchor.setTo(spriteAnchorX, spriteAnchorY);
            crab.scale.setTo(spriteScaleX, spriteScaleY);
            crab.inputEnabled = true;
            crab.events.onInputDown.add(onDownCrab, this);
            function onDownCrab() {this.resetHSpriteFlag(); crabFlag = 1;}
            
            
            crown = game.add.sprite(objectsPositions[19].x, objectsPositions[19].y, 'crown');
            crown.anchor.setTo(spriteAnchorX, spriteAnchorY);
            crown.scale.setTo(spriteScaleX, spriteScaleY);
            crown.inputEnabled = true;
            crown.events.onInputDown.add(onDownCrown, this);
            function onDownCrown() {this.resetHSpriteFlag(); crownFlag = 1;}
            
           /* game.leftArrow = game.add.sprite(1070, 730, 'leftArrow');             
            game.leftArrow.scale.setTo(1, 1); 
            game.leftArrow.anchor.setTo(spriteAnchorX, spriteAnchorY);
            game.leftArrow.inputEnabled = true;
            game.leftArrow.events.onInputDown.add(onDownLeftArrow, this);
            function onDownLeftArrow() {this.setHGlobalVaribalesToZero();game.state.start('G');}
            
            
            game.rightArrow = game.add.sprite(1170, 730, 'rightArrow');             
            game.rightArrow.scale.setTo(1, 1); 
            game.rightArrow.anchor.setTo(spriteAnchorX, spriteAnchorY);
            game.rightArrow.inputEnabled = true;
            game.rightArrow.events.onInputDown.add(onDownRightArrow, this);
            function onDownRightArrow() {this.setHGlobalVaribalesToZero();game.state.start('I');}
            */
            
            //Color shades
            blue = game.add.sprite(objectsPositions[20].x, objectsPositions[20].y, 'blue');
            blue.anchor.setTo(spriteAnchorX, spriteAnchorY);
            blue.scale.setTo(shadeScaleX, shadeScaleY);
            blue.inputEnabled = true;
            blue.tint = 0x456AC1; 
            blue.events.onInputDown.add(onDownBlue, this);
            function onDownBlue() {this.setColorHFlagToZero(); blueFlag = 1;}
           
            
            cyan = game.add.sprite(objectsPositions[21].x, objectsPositions[21].y, 'cyan');
            cyan.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cyan.scale.setTo(shadeScaleX, shadeScaleY);
            cyan.inputEnabled = true;
            cyan.tint = 0x45C1C1; 
            cyan.events.onInputDown.add(onDownCyan, this);
            function onDownCyan() {this.setColorHFlagToZero(); cyanFlag = 1;}
            
            
            
            green = game.add.sprite(objectsPositions[22].x, objectsPositions[22].y, 'green');
            green.anchor.setTo(spriteAnchorX, spriteAnchorY);
            green.scale.setTo(shadeScaleX, shadeScaleY);
            green.inputEnabled = true;
            green.tint = 0x51C735;
            green.events.onInputDown.add(onDownGreen, this);
            function onDownGreen() {this.setColorHFlagToZero(); greenFlag = 1;}
            
            
            orange = game.add.sprite(objectsPositions[23].x, objectsPositions[23].y, 'orange');
            orange.anchor.setTo(spriteAnchorX, spriteAnchorY);
            orange.scale.setTo(shadeScaleX, shadeScaleY);
            orange.inputEnabled = true;
            orange.tint = 0xF38932;
            orange.events.onInputDown.add(onDownOrange, this);
            function onDownOrange() {this.setColorHFlagToZero(); orangeFlag = 1;}
           
            
            pink = game.add.sprite(objectsPositions[24].x, objectsPositions[24].y, 'pink');
            pink.anchor.setTo(spriteAnchorX, spriteAnchorY);
            pink.scale.setTo(shadeScaleX, shadeScaleY);
            pink.inputEnabled = true;
            pink.tint = 0xCC3ACC;
            pink.events.onInputDown.add(onDownPink, this);
            function onDownPink() {this.setColorHFlagToZero(); pinkFlag = 1;}
            
            
            red = game.add.sprite(objectsPositions[25].x, objectsPositions[25].y, 'red');
            red.anchor.setTo(spriteAnchorX, spriteAnchorY);
            red.scale.setTo(shadeScaleX, shadeScaleY);
            red.inputEnabled = true;
            red.tint = 0xE32424;
            red.events.onInputDown.add(onDownRed, this);
            function onDownRed() {this.setColorHFlagToZero(); redFlag = 1;}
                
        },
        
        onDownhLetter: function() {
                
            //hammer
                    if(hammerFlag == 1 && greenFlag == 1 ){var greenhammer = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transHammer');greenhammer.tint =  0x51C735; greenhammer.scale.setTo(spriteScaleX, spriteScaleY); 
greenhammer.anchor.setTo(0.6, 0.6);stickSound.play();}                    
                    
                    if(hammerFlag == 1 && blueFlag == 1){var bluehammer = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transHammer'); bluehammer.tint =  0x456AC1; bluehammer.scale.setTo(spriteScaleX, spriteScaleY); bluehammer.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(hammerFlag == 1 && orangeFlag == 1){var orangehammer = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transHammer'); orangehammer.tint =  0xF38932; orangehammer.scale.setTo(spriteScaleX, spriteScaleY); orangehammer.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(hammerFlag == 1 && redFlag == 1){var redhammer = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transHammer'); redhammer.tint =  0xE32424; redhammer.scale.setTo(spriteScaleX, spriteScaleY); redhammer.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(hammerFlag == 1 && pinkFlag == 1){var pinkhammer = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transHammer'); pinkhammer.tint =  0xCC3ACC; pinkhammer.scale.setTo(spriteScaleX, spriteScaleY); pinkhammer.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(hammerFlag == 1 && cyanFlag == 1){var cyanhammer = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transHammer'); cyanhammer.tint =  0x45C1C1; cyanhammer.scale.setTo(spriteScaleX, spriteScaleY); cyanhammer.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //hanger    
                    if(hangerFlag == 1 && greenFlag == 1 ){var greenhanger = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transHanger');greenhanger.tint =  0x51C735; greenhanger.scale.setTo(spriteScaleX, spriteScaleY); 
greenhanger.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(hangerFlag == 1 && blueFlag == 1){var bluehanger = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transHanger'); bluehanger.tint =  0x456AC1; bluehanger.scale.setTo(spriteScaleX, spriteScaleY); bluehanger.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(hangerFlag == 1 && orangeFlag == 1){var orangehanger = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transHanger'); orangehanger.tint =  0xF38932; orangehanger.scale.setTo(spriteScaleX, spriteScaleY); orangehanger.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(hangerFlag == 1 && redFlag == 1){var redhanger = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transHanger'); redhanger.tint =  0xE32424; redhanger.scale.setTo(spriteScaleX, spriteScaleY); redhanger.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(hangerFlag == 1 && pinkFlag == 1){var pinkhanger = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transHanger'); pinkhanger.tint =  0xCC3ACC; pinkhanger.scale.setTo(spriteScaleX, spriteScaleY); pinkhanger.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(hangerFlag == 1 && cyanFlag == 1){var cyanhanger = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transHanger'); cyanhanger.tint =  0x45C1C1; cyanhanger.scale.setTo(spriteScaleX, spriteScaleY); cyanhanger.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //harp    
                    if(harpFlag == 1 && greenFlag == 1 ){var greenharp = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transHarp');greenharp.tint =  0x51C735; greenharp.scale.setTo(spriteScaleX, spriteScaleY); 
greenharp.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(harpFlag == 1 && blueFlag == 1){var blueharp = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transHarp'); blueharp.tint =  0x456AC1; blueharp.scale.setTo(spriteScaleX, spriteScaleY); blueharp.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(harpFlag == 1 && orangeFlag == 1){var orangeharp = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transHarp'); orangeharp.tint =  0xF38932; orangeharp.scale.setTo(spriteScaleX, spriteScaleY); orangeharp.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(harpFlag == 1 && redFlag == 1){var redharp = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transHarp'); redharp.tint =  0xE32424; redharp.scale.setTo(spriteScaleX, spriteScaleY); redharp.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(harpFlag == 1 && pinkFlag == 1){var pinkharp = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transHarp'); pinkharp.tint =  0xCC3ACC; pinkharp.scale.setTo(spriteScaleX, spriteScaleY); pinkharp.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(harpFlag == 1 && cyanFlag == 1){var cyanharp = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transHarp'); cyanharp.tint =  0x45C1C1; cyanharp.scale.setTo(spriteScaleX, spriteScaleY); cyanharp.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //hat
                    if(hatFlag == 1 && greenFlag == 1 ){var greenhat = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transHat');greenhat.tint =  0x51C735; greenhat.scale.setTo(spriteScaleX, spriteScaleY); 
greenhat.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(hatFlag == 1 && blueFlag == 1){console.log("bluehat plotted");var bluehat = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transHat'); bluehat.tint =  0x456AC1; bluehat.scale.setTo(spriteScaleX, spriteScaleY); bluehat.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(hatFlag == 1 && orangeFlag == 1){var orangehat = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transHat'); orangehat.tint =  0xF38932; orangehat.scale.setTo(spriteScaleX, spriteScaleY); orangehat.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(hatFlag == 1 && redFlag == 1){var redhat = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transHat'); redhat.tint =  0xE32424; redhat.scale.setTo(spriteScaleX, spriteScaleY); redhat.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(hatFlag == 1 && pinkFlag == 1){var pinkhat = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transHat'); pinkhat.tint =  0xCC3ACC; pinkhat.scale.setTo(spriteScaleX, spriteScaleY); pinkhat.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(hatFlag == 1 && cyanFlag == 1){var cyanhat = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transHat'); cyanhat.tint =  0x45C1C1; cyanhat.scale.setTo(spriteScaleX, spriteScaleY); cyanhat.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //heart    
                    if(heartFlag == 1 && greenFlag == 1 ){var greenheart = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transHeart');greenheart.tint =  0x51C735; greenheart.scale.setTo(spriteScaleX, spriteScaleY); 
greenheart.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(heartFlag == 1 && blueFlag == 1){console.log("blueheart plotted");var blueheart = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transHeart'); blueheart.tint =  0x456AC1; blueheart.scale.setTo(spriteScaleX, spriteScaleY); blueheart.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(heartFlag == 1 && orangeFlag == 1){var orangeheart = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transHeart'); orangeheart.tint =  0xF38932; orangeheart.scale.setTo(spriteScaleX, spriteScaleY); orangeheart.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(heartFlag == 1 && redFlag == 1){var redheart = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transHeart'); redheart.tint =  0xE32424; redheart.scale.setTo(spriteScaleX, spriteScaleY); redheart.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(heartFlag == 1 && pinkFlag == 1){var pinkheart = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transHeart'); pinkheart.tint =  0xCC3ACC; pinkheart.scale.setTo(spriteScaleX, spriteScaleY); pinkheart.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(heartFlag == 1 && cyanFlag == 1){var cyanheart = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transHeart'); cyanheart.tint =  0x45C1C1; cyanheart.scale.setTo(spriteScaleX, spriteScaleY); cyanheart.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //helicopter   
                    if(henFlag == 1 && greenFlag == 1 ){var greenhelicopter = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transHelicopter');greenhelicopter.tint =  0x51C735; greenhelicopter.scale.setTo(spriteScaleX, spriteScaleY); 
greenhelicopter.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(henFlag == 1 && blueFlag == 1){console.log("bluehelicopter plotted");var bluehelicopter = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transHelicopter'); bluehelicopter.tint =  0x456AC1; bluehelicopter.scale.setTo(spriteScaleX, spriteScaleY); bluehelicopter.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(henFlag == 1 && orangeFlag == 1){var orangehelicopter = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transHelicopter'); orangehelicopter.tint =  0xF38932; orangehelicopter.scale.setTo(spriteScaleX, spriteScaleY); orangehelicopter.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(henFlag == 1 && redFlag == 1){var redhelicopter = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transHelicopter'); redhelicopter.tint =  0xE32424; redhelicopter.scale.setTo(spriteScaleX, spriteScaleY); redhelicopter.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(henFlag == 1 && pinkFlag == 1){var pinkhelicopter = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transHelicopter'); pinkhelicopter.tint =  0xCC3ACC; pinkhelicopter.scale.setTo(spriteScaleX, spriteScaleY); pinkhelicopter.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(henFlag == 1 && cyanFlag == 1){var cyanhelicopter = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transHelicopter'); cyanhelicopter.tint =  0x45C1C1; cyanhelicopter.scale.setTo(spriteScaleX, spriteScaleY); cyanhelicopter.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //helmet    
                    if(helmetFlag == 1 && greenFlag == 1 ){var greenhelmet = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transHelmet');greenhelmet.tint =  0x51C735; greenhelmet.scale.setTo(spriteScaleX, spriteScaleY); 
greenhelmet.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(helmetFlag == 1 && blueFlag == 1){console.log("bluehelmet plotted");var bluehelmet = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transHelmet'); bluehelmet.tint =  0x456AC1; bluehelmet.scale.setTo(spriteScaleX, spriteScaleY); bluehelmet.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(helmetFlag == 1 && orangeFlag == 1){var orangehelmet = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transHelmet'); orangehelmet.tint =  0xF38932; orangehelmet.scale.setTo(spriteScaleX, spriteScaleY); orangehelmet.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(helmetFlag == 1 && redFlag == 1){var redhelmet = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transHelmet'); redhelmet.tint =  0xE32424; redhelmet.scale.setTo(spriteScaleX, spriteScaleY); redhelmet.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(helmetFlag == 1 && pinkFlag == 1){var pinkhelmet = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transHelmet'); pinkhelmet.tint =  0xCC3ACC; pinkhelmet.scale.setTo(spriteScaleX, spriteScaleY); pinkhelmet.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(helmetFlag == 1 && cyanFlag == 1){var cyanhelmet = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transHelmet'); cyanhelmet.tint =  0x45C1C1; cyanhelmet.scale.setTo(spriteScaleX, spriteScaleY); cyanhelmet.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //hen    
                    if(helicopterFlag == 1 && greenFlag == 1 ){var greenhen = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transHen');greenhen.tint =  0x51C735; greenhen.scale.setTo(spriteScaleX, spriteScaleY); 
greenhen.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(helicopterFlag == 1 && blueFlag == 1){console.log("bluehen plotted");var bluehen = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transHen'); bluehen.tint =  0x456AC1; bluehen.scale.setTo(spriteScaleX, spriteScaleY); bluehen.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(helicopterFlag == 1 && orangeFlag == 1){var orangehen = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transHen'); orangehen.tint =  0xF38932; orangehen.scale.setTo(spriteScaleX, spriteScaleY); orangehen.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(helicopterFlag == 1 && redFlag == 1){var redhen = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transHen'); redhen.tint =  0xE32424; redhen.scale.setTo(spriteScaleX, spriteScaleY); redhen.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(helicopterFlag == 1 && pinkFlag == 1){var pinkhen = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transHen'); pinkhen.tint =  0xCC3ACC; pinkhen.scale.setTo(spriteScaleX, spriteScaleY); pinkhen.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(helicopterFlag == 1 && cyanFlag == 1){var cyanhen = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transHen'); cyanhen.tint =  0x45C1C1; cyanhen.scale.setTo(spriteScaleX, spriteScaleY); cyanhen.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //horse    
                    if(horseFlag == 1 && greenFlag == 1 ){var greenhorse = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transHorse');greenhorse.tint =  0x51C735; greenhorse.scale.setTo(spriteScaleX, spriteScaleY); 
greenhorse.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(horseFlag == 1 && blueFlag == 1){console.log("bluehorse plotted");var bluehorse = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transHorse'); bluehorse.tint =  0x456AC1; bluehorse.scale.setTo(spriteScaleX, spriteScaleY); bluehorse.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(horseFlag == 1 && orangeFlag == 1){var orangehorse = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transHorse'); orangehorse.tint =  0xF38932; orangehorse.scale.setTo(spriteScaleX, spriteScaleY); orangehorse.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(horseFlag == 1 && redFlag == 1){var redhorse = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transHorse'); redhorse.tint =  0xE32424; redhorse.scale.setTo(spriteScaleX, spriteScaleY); redhorse.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(horseFlag == 1 && pinkFlag == 1){var pinkhorse = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transHorse'); pinkhorse.tint =  0xCC3ACC; pinkhorse.scale.setTo(spriteScaleX, spriteScaleY); pinkhorse.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(horseFlag == 1 && cyanFlag == 1){var cyanhorse = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transHorse'); cyanhorse.tint =  0x45C1C1; cyanhorse.scale.setTo(spriteScaleX, spriteScaleY); cyanhorse.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //house 
                    if(houseFlag == 1 && greenFlag == 1 ){var greenhouse = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transHouse');greenhouse.tint =  0x51C735; greenhouse.scale.setTo(spriteScaleX, spriteScaleY); 
greenhouse.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(houseFlag == 1 && blueFlag == 1){console.log("bluehouse plotted");var bluehouse = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transHouse'); bluehouse.tint =  0x456AC1; bluehouse.scale.setTo(spriteScaleX, spriteScaleY); bluehouse.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(houseFlag == 1 && orangeFlag == 1){var orangehouse = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transHouse'); orangehouse.tint =  0xF38932; orangehouse.scale.setTo(spriteScaleX, spriteScaleY); orangehouse.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(houseFlag == 1 && redFlag == 1){var redhouse = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transHouse'); redhouse.tint =  0xE32424; redhouse.scale.setTo(spriteScaleX, spriteScaleY); redhouse.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(houseFlag == 1 && pinkFlag == 1){var pinkhouse = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transHouse'); pinkhouse.tint =  0xCC3ACC; pinkhouse.scale.setTo(spriteScaleX, spriteScaleY); pinkhouse.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(houseFlag == 1 && cyanFlag == 1){var cyanhouse = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transHouse'); cyanhouse.tint =  0x45C1C1; cyanhouse.scale.setTo(spriteScaleX, spriteScaleY); cyanhouse.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
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
            
            game.world.bringToTop(hLetter);
            
            game.world.bringToTop(blue);
            game.world.bringToTop(green);
            game.world.bringToTop(red);
            game.world.bringToTop(cyan);
            game.world.bringToTop(orange);
            game.world.bringToTop(pink);
            
            game.world.bringToTop(cloud1);
            game.world.bringToTop(cloud2);
            game.world.bringToTop(cloud3);
            
            game.world.bringToTop(hammer);
            game.world.bringToTop(hanger);
            game.world.bringToTop(harp);
            game.world.bringToTop(hat);
            game.world.bringToTop(heart);
            game.world.bringToTop(helicopter);
            game.world.bringToTop(helmet);
            game.world.bringToTop(hen);
            game.world.bringToTop(horse);
            game.world.bringToTop(house);
            
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

            
            
            
            if(hammerFlag == 1){hammer.angle += 2;}
            if(hangerFlag == 1){hanger.angle += 2;}
            if(harpFlag == 1){harp.angle += 2;}
            if(hatFlag == 1){hat.angle += 2;}
            if(heartFlag == 1){heart.angle += 2;}
            if(henFlag == 1){helicopter.angle += 2;}
            if(helmetFlag == 1){helmet.angle += 2;}
            if(helicopterFlag == 1){hen.angle += 2;}
            if(horseFlag == 1){horse.angle += 2;}
            if(houseFlag == 1){house.angle += 2;}
            
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
            
            if(hObjectClicked == 10){
            
                askForLevelI = 1;
                /*game.leftArrow.kill();
                game.rightArrow.kill();*/
                game.iButton = game.add.sprite(1170, 730, 'iButton');             
                game.iButton.scale.setTo(1, 1); 
                game.iButton.anchor.setTo(spriteAnchorX, spriteAnchorY);
                
            }
            
        if(askForLevelI == 1){
            
            game.world.bringToTop(game.iButton);
            game.iButton.inputEnabled = true;
            game.iButton.events.onInputDown.add(onDownH, this);
            function onDownH() {
            
                //start next level
                
                this.setHGlobalVaribalesToZero();
                game.state.start('I');
                
            }
        }
           
        },
        
        resetHSpriteFlag: function(){
            
            hammerFlag = 0;hangerFlag = 0;harpFlag = 0;henFlag = 0;hatFlag = 0;
            heartFlag = 0;helmetFlag = 0;helicopterFlag = 0;horseFlag = 0;houseFlag = 0;
            camelFlag = 0;candleFlag = 0;carFlag = 0;catFlag = 0;cheeseFlag = 0;cherryFlag = 0;
            clockFlag = 0;cowFlag = 0;crabFlag = 0;crownFlag = 0;

            hammer.angle = 0;hanger.angle = 0;harp.angle = 0;helicopter.angle = 0;hat.angle = 0;
            heart.angle = 0;helmet.angle = 0;hen.angle = 0;horse.angle = 0;house.angle = 0;
            camel.angle = 0;candle.angle = 0;car.angle = 0;cat.angle = 0;cheese.angle = 0;
            cherry.angle = 0;crown.angle = 0;clock.angle = 0;cow.angle = 0;crab.angle = 0;
           
        },
       
        setColorHFlagToZero: function(){
            
            bubbleSound.play(); blueFlag = 0;greenFlag = 0; redFlag = 0; cyanFlag = 0; pinkFlag = 0; orangeFlag = 0;
        },
        
        setHGlobalVaribalesToZero: function(){
            
            
            hammerFlag = 0;hangerFlag = 0;harpFlag = 0;henFlag = 0;hatFlag = 0;
            heartFlag = 0;helmetFlag = 0;helicopterFlag = 0;horseFlag = 0;houseFlag = 0;
            camelFlag = 0;candleFlag = 0;carFlag = 0;catFlag = 0;cheeseFlag = 0;cherryFlag = 0;
            clockFlag = 0;cowFlag = 0;crabFlag = 0;crownFlag = 0;



            greenFlag = 0;blueFlag = 0;orangeFlag = 0;redFlag = 0;pinkFlag = 0;cyanFlag = 0;
        }
        
        
    };
