        
    var bObjectClicked = 0;
    var askForLevelC = 0;
    
    var ballFlag = 0;
    var balloonFlag = 0;
    var batFlag = 0;            
    var bellFlag = 0;
    var beltFlag = 0;
    var bicycleFlag = 0;
    var boatFlag = 0;
    var bottleFlag = 0;
    var butterflyFlag = 0;
    var beeFlag = 0;

    
    var B = {

        preload: function () {

            //setting default path for assets to be used in game
            this.load.path = './assets/B/';
            
            
            
            //loading shades
            this.load.image("blue", "blue.png");
            this.load.image("cyan", "cyan.png");
            this.load.image("green", "green.png");
            this.load.image("orange", "orange.png");
            this.load.image("pink", "pink.png");
            this.load.image("red", "red.png");
    
            this.load.image("transBall", "transBall.png");
            this.load.image("transBalloon", "transBalloon.png");
            this.load.image("transBat", "transBat.png");
            this.load.image("transBee", "transBee.png");
            this.load.image("transBell", "transBell.png");
            this.load.image("transBelt", "transBelt.png");
            this.load.image("transBicycle", "transBicycle.png");
            this.load.image("transBoat", "transBoat.png");
            this.load.image("transBottle", "transBottle.png");
            this.load.image("transButterfly", "transButterfly.png");
            
            
            //loading assets for the level  B
            this.load.image("bg", "bg.png");
            this.load.image("bLetter", "bLetter.png");
            this.load.image("cButton", "cButton.png");
            
            
            
            //objects starting from B and objects not starting from B 
            
            this.load.image("aeroplane", "aeroplane.png");
            this.load.image("ball", "ball.png");
            this.load.image("alligator", "alligator.png");
            this.load.image("balloon", "balloon.png");
            this.load.image("anchor", "anchor.png");
            this.load.image("bat", "bat.png");
            this.load.image("angel", "angel.png");
            this.load.image("bee", "bee.png");
            this.load.image("ant", "ant.png");
            this.load.image("bell", "bell.png");
            this.load.image("apple", "apple.png");
            this.load.image("belt", "belt.png");
            this.load.image("arrow", "arrow.png");
            this.load.image("bicycle", "bicycle.png");
            this.load.image("astronaut", "astronaut.png");
            this.load.image("boat", "boat.png");
            this.load.image("avacado", "avacado.png");
            this.load.image("bottle", "bottle.png");
            this.load.image("axe", "axe.png");
            this.load.image("butterfly", "butterfly.png");
            
            this.load.image("cloud", "cloud.png");

            this.load.spritesheet('blackSplash', 'blackSplash.png', 141, 240, 7);
            
            /*this.load.image("rightArrow", "rightArrow.png");
            this.load.image("leftArrow", "leftArrow.png");
            */
            
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
                
            
            
            
            //Main letter B
            bLetter = game.add.sprite(gameMinWidth, gameMinHeight, 'bLetter');
            bLetter.inputEnabled = true;
            bLetter.events.onInputDown.add(this.onDownBletter, this);
            
            
            
            //Objects starting from B
                    
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
            
            
            
            
            aeroplane = game.add.sprite(objectsPositions[0].x, objectsPositions[0].y, 'aeroplane');
            aeroplane.anchor.setTo(spriteAnchorX, spriteAnchorY);
            aeroplane.scale.setTo(spriteScaleX, spriteScaleY);
            aeroplane.inputEnabled = true;
            aeroplane.events.onInputDown.add(onDownAeroplane, this);
            function onDownAeroplane() {this.resetBSpriteFlag(); aeroplaneFlag = 1;}

            
            
            
            alligator = game.add.sprite(objectsPositions[10].x, objectsPositions[10].y, 'alligator');
            alligator.anchor.setTo(spriteAnchorX, spriteAnchorY);
            alligator.scale.setTo(spriteScaleX, spriteScaleY);
            alligator.inputEnabled = true;
            alligator.events.onInputDown.add(onDownAlligator, this);
            function onDownAlligator() {this.resetBSpriteFlag(); alligatorFlag = 1;}

            
            
            
            anchor = game.add.sprite(objectsPositions[1].x, objectsPositions[1].y, 'anchor');
            anchor.anchor.setTo(spriteAnchorX, spriteAnchorY);
            anchor.scale.setTo(spriteScaleX, spriteScaleY);
            anchor.inputEnabled = true;
            anchor.events.onInputDown.add(onDownAnchor, this);
            function onDownAnchor() {this.resetBSpriteFlag(); anchorFlag = 1;}
            
            
            
            
            angel = game.add.sprite(objectsPositions[11].x, objectsPositions[11].y, 'angel');
            angel.anchor.setTo(spriteAnchorX, spriteAnchorY);
            angel.scale.setTo(spriteScaleX, spriteScaleY);
            angel.inputEnabled = true;
            angel.events.onInputDown.add(onDownAngel, this);
            function onDownAngel() {this.resetBSpriteFlag(); angelFlag = 1;}
            
            
            
            ant = game.add.sprite(objectsPositions[2].x, objectsPositions[2].y, 'ant');
            ant.anchor.setTo(spriteAnchorX, spriteAnchorY);
            ant.scale.setTo(spriteScaleX, spriteScaleY);
            ant.inputEnabled = true;
            ant.events.onInputDown.add(onDownAnt, this);
            function onDownAnt() {this.resetBSpriteFlag(); antFlag = 1;}
            
            apple = game.add.sprite(objectsPositions[12].x, objectsPositions[12].y, 'apple');
            apple.anchor.setTo(spriteAnchorX, spriteAnchorY);
            apple.scale.setTo(spriteScaleX, spriteScaleY);
            apple.inputEnabled = true;
            apple.events.onInputDown.add(onDownApple, this);
            function onDownApple() {this.resetBSpriteFlag(); appleFlag = 1;}

            
            arrow = game.add.sprite(objectsPositions[3].x, objectsPositions[3].y, 'arrow');
            arrow.anchor.setTo(spriteAnchorX, spriteAnchorY);
            arrow.scale.setTo(spriteScaleX, spriteScaleY);
            arrow.inputEnabled = true;  
            arrow.events.onInputDown.add(onDownArrow, this);
            function onDownArrow() {this.resetBSpriteFlag(); arrowFlag = 1;}
            
            
            astronaut = game.add.sprite(objectsPositions[13].x, objectsPositions[13].y, 'astronaut');
            astronaut.anchor.setTo(spriteAnchorX, spriteAnchorY);
            astronaut.scale.setTo(spriteScaleX, spriteScaleY);
            astronaut.inputEnabled = true;
            astronaut.events.onInputDown.add(onDownAstronaut, this);
            function onDownAstronaut() {this.resetBSpriteFlag(); astronautFlag = 1;}
            
            
            avacado = game.add.sprite(objectsPositions[4].x, objectsPositions[4].y, 'avacado');
            avacado.anchor.setTo(spriteAnchorX, spriteAnchorY);
            avacado.scale.setTo(spriteScaleX, spriteScaleY);
            avacado.inputEnabled = true;
            avacado.events.onInputDown.add(onDownAvacado, this);
            function onDownAvacado() {this.resetBSpriteFlag(); avacadoFlag = 1;}
            
            
            axe = game.add.sprite(objectsPositions[14].x, objectsPositions[14].y, 'axe');
            axe.anchor.setTo(spriteAnchorX, spriteAnchorY);
            axe.scale.setTo(spriteScaleX, spriteScaleY);
            axe.inputEnabled = true;
            axe.events.onInputDown.add(onDownAxe, this);
            function onDownAxe() {this.resetBSpriteFlag(); axeFlag = 1;}
            
            
            
            ball = game.add.sprite(objectsPositions[5].x, objectsPositions[5].y, 'ball');
            ball.anchor.setTo(spriteAnchorX, spriteAnchorY);
            ball.scale.setTo(spriteScaleX, spriteScaleY);
            ball.inputEnabled = true;
            ball.events.onInputDown.add(onDownBall, this);
            function onDownBall() {this.resetBSpriteFlag(); ballFlag = 1; bObjectClicked++;}
            
            
            
            
            balloon = game.add.sprite(objectsPositions[15].x, objectsPositions[15].y, 'balloon');
            balloon.anchor.setTo(spriteAnchorX, spriteAnchorY);
            balloon.scale.setTo(spriteScaleX, spriteScaleY);
            balloon.inputEnabled = true;
            balloon.events.onInputDown.add(onDownBalloon, this);
            function onDownBalloon() {this.resetBSpriteFlag(); balloonFlag = 1; bObjectClicked++;}
            
            
            bat = game.add.sprite(objectsPositions[6].x, objectsPositions[6].y, 'bat');
            bat.anchor.setTo(spriteAnchorX, spriteAnchorY);
            bat.scale.setTo(spriteScaleX, spriteScaleY);
            bat.inputEnabled = true;
            bat.events.onInputDown.add(onDownBat, this);
            function onDownBat() {this.resetBSpriteFlag(); batFlag = 1; bObjectClicked++;}
            
            bee = game.add.sprite(objectsPositions[16].x, objectsPositions[16].y, 'bee');
            bee.anchor.setTo(spriteAnchorX, spriteAnchorY);
            bee.scale.setTo(spriteScaleX, spriteScaleY);
            bee.inputEnabled = true;
            bee.events.onInputDown.add(onDownBee, this);
            function onDownBee() {this.resetBSpriteFlag(); beeFlag = 1; bObjectClicked++;}
            
            
            bell = game.add.sprite(objectsPositions[7].x, objectsPositions[7].y, 'bell');
            bell.anchor.setTo(spriteAnchorX, spriteAnchorY);
            bell.scale.setTo(spriteScaleX, spriteScaleY);
            bell.inputEnabled = true;
            bell.events.onInputDown.add(onDownBell, this);
            function onDownBell() {this.resetBSpriteFlag(); bellFlag = 1; bObjectClicked++;}
            
            
            belt = game.add.sprite(objectsPositions[17].x, objectsPositions[17].y, 'belt');
            belt.anchor.setTo(spriteAnchorX, spriteAnchorY);
            belt.scale.setTo(spriteScaleX, spriteScaleY);
            belt.inputEnabled = true;
            belt.events.onInputDown.add(onDownBelt, this);
            function onDownBelt() {this.resetBSpriteFlag(); beltFlag = 1; bObjectClicked++;}
            
            
            bicycle = game.add.sprite(objectsPositions[8].x, objectsPositions[8].y, 'bicycle');
            bicycle.anchor.setTo(spriteAnchorX, spriteAnchorY);
            bicycle.scale.setTo(spriteScaleX, spriteScaleY);
            bicycle.inputEnabled = true;
            bicycle.events.onInputDown.add(onDownBicycle, this);
            function onDownBicycle() {this.resetBSpriteFlag(); bicycleFlag = 1; bObjectClicked++;}
            
            
            
            boat = game.add.sprite(objectsPositions[18].x, objectsPositions[18].y, 'boat');
            boat.anchor.setTo(spriteAnchorX, spriteAnchorY);
            boat.scale.setTo(spriteScaleX, spriteScaleY);
            boat.inputEnabled = true;
            boat.events.onInputDown.add(onDownBoat, this);
            function onDownBoat() {this.resetBSpriteFlag(); boatFlag = 1; bObjectClicked++;}
            
            
            bottle = game.add.sprite(objectsPositions[9].x, objectsPositions[9].y, 'bottle');
            bottle.anchor.setTo(spriteAnchorX, spriteAnchorY);
            bottle.scale.setTo(spriteScaleX, spriteScaleY);
            bottle.inputEnabled = true;
            bottle.events.onInputDown.add(onDownBottle, this);
            function onDownBottle() {this.resetBSpriteFlag(); bottleFlag = 1; bObjectClicked++;}
            
            
            butterfly = game.add.sprite(objectsPositions[19].x, objectsPositions[19].y, 'butterfly');
            butterfly.anchor.setTo(spriteAnchorX, spriteAnchorY);
            butterfly.scale.setTo(spriteScaleX, spriteScaleY);
            butterfly.inputEnabled = true;
            butterfly.events.onInputDown.add(onDownButterfly, this);
            function onDownButterfly() {this.resetBSpriteFlag(); butterflyFlag = 1; bObjectClicked++;}
            
            
            /*game.leftArrow = game.add.sprite(1070, 730, 'leftArrow');             
            game.leftArrow.scale.setTo(1, 1); 
            game.leftArrow.anchor.setTo(spriteAnchorX, spriteAnchorY);
            game.leftArrow.inputEnabled = true;
            game.leftArrow.events.onInputDown.add(onDownLeftArrow, this);
            function onDownLeftArrow() {this.setBGlobalVaribalesToZero();game.state.start('A');}
            
            game.rightArrow = game.add.sprite(1170, 730, 'rightArrow');             
            game.rightArrow.scale.setTo(1, 1); 
            game.rightArrow.anchor.setTo(spriteAnchorX, spriteAnchorY);
            game.rightArrow.inputEnabled = true;
            game.rightArrow.events.onInputDown.add(onDownRightArrow, this);
            function onDownRightArrow() {this.setBGlobalVaribalesToZero();game.state.start('C');}
            */
            
            
            
            //Color shades
            blue = game.add.sprite(objectsPositions[20].x, objectsPositions[20].y, 'blue');
            blue.anchor.setTo(spriteAnchorX, spriteAnchorY);
            blue.scale.setTo(shadeScaleX, shadeScaleY);
            blue.inputEnabled = true;
            blue.tint = 0x456AC1; 
            blue.events.onInputDown.add(onDownBlue, this);
            function onDownBlue() {this.setColorBFlagToZero(); blueFlag = 1;}
           
            
            cyan = game.add.sprite(objectsPositions[21].x, objectsPositions[21].y, 'cyan');
            cyan.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cyan.scale.setTo(shadeScaleX, shadeScaleY);
            cyan.inputEnabled = true;
            cyan.tint = 0x45C1C1; 
            cyan.events.onInputDown.add(onDownCyan, this);
            function onDownCyan() {this.setColorBFlagToZero(); cyanFlag = 1;}
            
            
            
            green = game.add.sprite(objectsPositions[22].x, objectsPositions[22].y, 'green');
            green.anchor.setTo(spriteAnchorX, spriteAnchorY);
            green.scale.setTo(shadeScaleX, shadeScaleY);
            green.inputEnabled = true;
            green.tint = 0x51C735;
            green.events.onInputDown.add(onDownGreen, this);
            function onDownGreen() {this.setColorBFlagToZero(); greenFlag = 1;}
            
            
            orange = game.add.sprite(objectsPositions[23].x, objectsPositions[23].y, 'orange');
            orange.anchor.setTo(spriteAnchorX, spriteAnchorY);
            orange.scale.setTo(shadeScaleX, shadeScaleY);
            orange.inputEnabled = true;
            orange.tint = 0xF38932;
            orange.events.onInputDown.add(onDownOrange, this);
            function onDownOrange() {this.setColorBFlagToZero(); orangeFlag = 1;}
           
            
            pink = game.add.sprite(objectsPositions[24].x, objectsPositions[24].y, 'pink');
            pink.anchor.setTo(spriteAnchorX, spriteAnchorY);
            pink.scale.setTo(shadeScaleX, shadeScaleY);
            pink.inputEnabled = true;
            pink.tint = 0xCC3ACC;
            pink.events.onInputDown.add(onDownPink, this);
            function onDownPink() {this.setColorBFlagToZero(); pinkFlag = 1;}
            
            
            red = game.add.sprite(objectsPositions[25].x, objectsPositions[25].y, 'red');
            red.anchor.setTo(spriteAnchorX, spriteAnchorY);
            red.scale.setTo(shadeScaleX, shadeScaleY);
            red.inputEnabled = true;
            red.tint = 0xE32424;
            red.events.onInputDown.add(onDownRed, this);
            function onDownRed() {this.setColorBFlagToZero(); redFlag = 1;}
                
        },
        
        onDownBletter: function() {
                
            //Ball
                    if(ballFlag == 1 && greenFlag == 1 ){var greenBall = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transBall');greenBall.tint =  0x51C735; greenBall.scale.setTo(spriteScaleX, spriteScaleY); 
greenBall.anchor.setTo(0.6, 0.6);stickSound.play();}                    
                    
                    if(ballFlag == 1 && blueFlag == 1){var blueBall = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transBall'); blueBall.tint =  0x456AC1; blueBall.scale.setTo(spriteScaleX, spriteScaleY); blueBall.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(ballFlag == 1 && orangeFlag == 1){var orangeBall = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transBall'); orangeBall.tint =  0xF38932; orangeBall.scale.setTo(spriteScaleX, spriteScaleY); orangeBall.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(ballFlag == 1 && redFlag == 1){var redBall = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transBall'); redBall.tint =  0xE32424; redBall.scale.setTo(spriteScaleX, spriteScaleY); redBall.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(ballFlag == 1 && pinkFlag == 1){var pinkBall = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transBall'); pinkBall.tint =  0xCC3ACC; pinkBall.scale.setTo(spriteScaleX, spriteScaleY); pinkBall.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(ballFlag == 1 && cyanFlag == 1){var cyanBall = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transBall'); cyanBall.tint =  0x45C1C1; cyanBall.scale.setTo(spriteScaleX, spriteScaleY); cyanBall.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //Balloon    
                    if(balloonFlag == 1 && greenFlag == 1 ){var greenBalloon = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transBalloon');greenBalloon.tint =  0x51C735; greenBalloon.scale.setTo(spriteScaleX, spriteScaleY); 
greenBalloon.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(balloonFlag == 1 && blueFlag == 1){var blueBalloon = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transBalloon'); blueBalloon.tint =  0x456AC1; blueBalloon.scale.setTo(spriteScaleX, spriteScaleY); blueBalloon.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(balloonFlag == 1 && orangeFlag == 1){var orangeBalloon = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transBalloon'); orangeBalloon.tint =  0xF38932; orangeBalloon.scale.setTo(spriteScaleX, spriteScaleY); orangeBalloon.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(balloonFlag == 1 && redFlag == 1){var redBalloon = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transBalloon'); redBalloon.tint =  0xE32424; redBalloon.scale.setTo(spriteScaleX, spriteScaleY); redBalloon.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(balloonFlag == 1 && pinkFlag == 1){var pinkBalloon = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transBalloon'); pinkBalloon.tint =  0xCC3ACC; pinkBalloon.scale.setTo(spriteScaleX, spriteScaleY); pinkBalloon.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(balloonFlag == 1 && cyanFlag == 1){var cyanBalloon = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transBalloon'); cyanBalloon.tint =  0x45C1C1; cyanBalloon.scale.setTo(spriteScaleX, spriteScaleY); cyanBalloon.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //Bat    
                    if(batFlag == 1 && greenFlag == 1 ){var greenBat = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transBat');greenBat.tint =  0x51C735; greenBat.scale.setTo(spriteScaleX, spriteScaleY); 
greenBat.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(batFlag == 1 && blueFlag == 1){var blueBat = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transBat'); blueBat.tint =  0x456AC1; blueBat.scale.setTo(spriteScaleX, spriteScaleY); blueBat.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(batFlag == 1 && orangeFlag == 1){var orangeBat = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transBat'); orangeBat.tint =  0xF38932; orangeBat.scale.setTo(spriteScaleX, spriteScaleY); orangeBat.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(batFlag == 1 && redFlag == 1){var redBat = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transBat'); redBat.tint =  0xE32424; redBat.scale.setTo(spriteScaleX, spriteScaleY); redBat.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(batFlag == 1 && pinkFlag == 1){var pinkBat = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transBat'); pinkBat.tint =  0xCC3ACC; pinkBat.scale.setTo(spriteScaleX, spriteScaleY); pinkBat.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(batFlag == 1 && cyanFlag == 1){var cyanBat = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transBat'); cyanBat.tint =  0x45C1C1; cyanBat.scale.setTo(spriteScaleX, spriteScaleY); cyanBat.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //Bee
                    if(beeFlag == 1 && greenFlag == 1 ){var greenBee = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transBee');greenBee.tint =  0x51C735; greenBee.scale.setTo(spriteScaleX, spriteScaleY); 
greenBee.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(beeFlag == 1 && blueFlag == 1){console.log("blueBee plotted");var blueBee = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transBee'); blueBee.tint =  0x456AC1; blueBee.scale.setTo(spriteScaleX, spriteScaleY); blueBee.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(beeFlag == 1 && orangeFlag == 1){var orangeBee = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transBee'); orangeBee.tint =  0xF38932; orangeBee.scale.setTo(spriteScaleX, spriteScaleY); orangeBee.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(beeFlag == 1 && redFlag == 1){var redBee = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transBee'); redBee.tint =  0xE32424; redBee.scale.setTo(spriteScaleX, spriteScaleY); redBee.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(beeFlag == 1 && pinkFlag == 1){var pinkBee = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transBee'); pinkBee.tint =  0xCC3ACC; pinkBee.scale.setTo(spriteScaleX, spriteScaleY); pinkBee.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(beeFlag == 1 && cyanFlag == 1){var cyanBee = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transBee'); cyanBee.tint =  0x45C1C1; cyanBee.scale.setTo(spriteScaleX, spriteScaleY); cyanBee.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //Bell    
                    if(bellFlag == 1 && greenFlag == 1 ){var greenBell = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transBell');greenBell.tint =  0x51C735; greenBell.scale.setTo(spriteScaleX, spriteScaleY); 
greenBell.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(bellFlag == 1 && blueFlag == 1){console.log("blueBell plotted");var blueBell = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transBell'); blueBell.tint =  0x456AC1; blueBell.scale.setTo(spriteScaleX, spriteScaleY); blueBell.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(bellFlag == 1 && orangeFlag == 1){var orangeBell = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transBell'); orangeBell.tint =  0xF38932; orangeBell.scale.setTo(spriteScaleX, spriteScaleY); orangeBell.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(bellFlag == 1 && redFlag == 1){var redBell = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transBell'); redBell.tint =  0xE32424; redBell.scale.setTo(spriteScaleX, spriteScaleY); redBell.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(bellFlag == 1 && pinkFlag == 1){var pinkBell = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transBell'); pinkBell.tint =  0xCC3ACC; pinkBell.scale.setTo(spriteScaleX, spriteScaleY); pinkBell.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(bellFlag == 1 && cyanFlag == 1){var cyanBell = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transBell'); cyanBell.tint =  0x45C1C1; cyanBell.scale.setTo(spriteScaleX, spriteScaleY); cyanBell.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //Belt   
                    if(beltFlag == 1 && greenFlag == 1 ){var greenBelt = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transBelt');greenBelt.tint =  0x51C735; greenBelt.scale.setTo(spriteScaleX, spriteScaleY); 
greenBelt.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(beltFlag == 1 && blueFlag == 1){console.log("blueBelt plotted");var blueBelt = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transBelt'); blueBelt.tint =  0x456AC1; blueBelt.scale.setTo(spriteScaleX, spriteScaleY); blueBelt.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(beltFlag == 1 && orangeFlag == 1){var orangeBelt = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transBelt'); orangeBelt.tint =  0xF38932; orangeBelt.scale.setTo(spriteScaleX, spriteScaleY); orangeBelt.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(beltFlag == 1 && redFlag == 1){var redBelt = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transBelt'); redBelt.tint =  0xE32424; redBalloon.scale.setTo(spriteScaleX, spriteScaleY); redBelt.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(beltFlag == 1 && pinkFlag == 1){var pinkBelt = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transBelt'); pinkBelt.tint =  0xCC3ACC; pinkBelt.scale.setTo(spriteScaleX, spriteScaleY); pinkBelt.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(beltFlag == 1 && cyanFlag == 1){var cyanBelt = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transBelt'); cyanBelt.tint =  0x45C1C1; cyanBelt.scale.setTo(spriteScaleX, spriteScaleY); cyanBelt.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //Bicycle    
                    if(bicycleFlag == 1 && greenFlag == 1 ){var greenBicycle = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transBicycle');greenBicycle.tint =  0x51C735; greenBicycle.scale.setTo(spriteScaleX, spriteScaleY); 
greenBicycle.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(bicycleFlag == 1 && blueFlag == 1){console.log("blueBicycle plotted");var blueBicycle = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transBicycle'); blueBicycle.tint =  0x456AC1; blueBicycle.scale.setTo(spriteScaleX, spriteScaleY); blueBicycle.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(bicycleFlag == 1 && orangeFlag == 1){var orangeBicycle = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transBicycle'); orangeBicycle.tint =  0xF38932; orangeBicycle.scale.setTo(spriteScaleX, spriteScaleY); orangeBicycle.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(bicycleFlag == 1 && redFlag == 1){var redBicycle = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transBicycle'); redBicycle.tint =  0xE32424; redBicycle.scale.setTo(spriteScaleX, spriteScaleY); redBicycle.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(bicycleFlag == 1 && pinkFlag == 1){var pinkBicycle = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transBicycle'); pinkBicycle.tint =  0xCC3ACC; pinkBicycle.scale.setTo(spriteScaleX, spriteScaleY); pinkBicycle.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(bicycleFlag == 1 && cyanFlag == 1){var cyanBicycle = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transBicycle'); cyanBicycle.tint =  0x45C1C1; cyanBicycle.scale.setTo(spriteScaleX, spriteScaleY); cyanBicycle.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //Boat    
                    if(boatFlag == 1 && greenFlag == 1 ){var greenBoat = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transBoat');greenBoat.tint =  0x51C735; greenBoat.scale.setTo(spriteScaleX, spriteScaleY); 
greenBoat.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(boatFlag == 1 && blueFlag == 1){console.log("blueBoat plotted");var blueBoat = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transBoat'); blueBoat.tint =  0x456AC1; blueBoat.scale.setTo(spriteScaleX, spriteScaleY); blueBoat.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(boatFlag == 1 && orangeFlag == 1){var orangeBoat = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transBoat'); orangeBoat.tint =  0xF38932; orangeBoat.scale.setTo(spriteScaleX, spriteScaleY); orangeBoat.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(boatFlag == 1 && redFlag == 1){var redBoat = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transBoat'); redBoat.tint =  0xE32424; redBoat.scale.setTo(spriteScaleX, spriteScaleY); redBoat.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(boatFlag == 1 && pinkFlag == 1){var pinkBoat = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transBoat'); pinkBoat.tint =  0xCC3ACC; pinkBoat.scale.setTo(spriteScaleX, spriteScaleY); pinkBoat.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(boatFlag == 1 && cyanFlag == 1){var cyanBoat = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transBoat'); cyanBoat.tint =  0x45C1C1; cyanBoat.scale.setTo(spriteScaleX, spriteScaleY); cyanBoat.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //Bottle    
                    if(bottleFlag == 1 && greenFlag == 1 ){var greenBottle = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transBottle');greenBottle.tint =  0x51C735; greenBottle.scale.setTo(spriteScaleX, spriteScaleY); 
greenBottle.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(bottleFlag == 1 && blueFlag == 1){console.log("blueBottle plotted");var blueBottle = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transBottle'); blueBottle.tint =  0x456AC1; blueBottle.scale.setTo(spriteScaleX, spriteScaleY); blueBottle.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(bottleFlag == 1 && orangeFlag == 1){var orangeBottle = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transBottle'); orangeBottle.tint =  0xF38932; orangeBottle.scale.setTo(spriteScaleX, spriteScaleY); orangeBottle.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(bottleFlag == 1 && redFlag == 1){var redBottle = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transBottle'); redBottle.tint =  0xE32424; redBottle.scale.setTo(spriteScaleX, spriteScaleY); redBottle.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(bottleFlag == 1 && pinkFlag == 1){var pinkBottle = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transBottle'); pinkBottle.tint =  0xCC3ACC; pinkBottle.scale.setTo(spriteScaleX, spriteScaleY); pinkBottle.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(bottleFlag == 1 && cyanFlag == 1){var cyanBottle = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transBottle'); cyanBottle.tint =  0x45C1C1; cyanBottle.scale.setTo(spriteScaleX, spriteScaleY); cyanBottle.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //Butterfly 
                    if(butterflyFlag == 1 && greenFlag == 1 ){var greenButterfly = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transButterfly');greenButterfly.tint =  0x51C735; greenButterfly.scale.setTo(spriteScaleX, spriteScaleY); 
greenButterfly.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(butterflyFlag == 1 && blueFlag == 1){console.log("blueButterfly plotted");var blueButterfly = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transButterfly'); blueButterfly.tint =  0x456AC1; blueButterfly.scale.setTo(spriteScaleX, spriteScaleY); blueButterfly.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(butterflyFlag == 1 && orangeFlag == 1){var orangeButterfly = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transButterfly'); orangeButterfly.tint =  0xF38932; orangeButterfly.scale.setTo(spriteScaleX, spriteScaleY); orangeButterfly.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(butterflyFlag == 1 && redFlag == 1){var redButterfly = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transButterfly'); redButterfly.tint =  0xE32424; redButterfly.scale.setTo(spriteScaleX, spriteScaleY); redButterfly.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(butterflyFlag == 1 && pinkFlag == 1){var pinkButterfly = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transButterfly'); pinkButterfly.tint =  0xCC3ACC; pinkButterfly.scale.setTo(spriteScaleX, spriteScaleY); pinkButterfly.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(butterflyFlag == 1 && cyanFlag == 1){var cyanButterfly = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transButterfly'); cyanButterfly.tint =  0x45C1C1; cyanButterfly.scale.setTo(spriteScaleX, spriteScaleY); cyanButterfly.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //For Wrong Objects
            
if(appleFlag == 1 || aeroplaneFlag == 1 || alligatorFlag == 1 || anchorFlag == 1 || angelFlag == 1 || antFlag == 1 || arrowFlag == 1 || astronautFlag == 1 || avacadoFlag == 1 || axeFlag == 1){var blackSplash = game.add.sprite(game.input.mousePointer.x,game.input.mousePointer.y,'blackSplash');
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
            
            game.world.bringToTop(bLetter);
            
            game.world.bringToTop(blue);
            game.world.bringToTop(green);
            game.world.bringToTop(red);
            game.world.bringToTop(cyan);
            game.world.bringToTop(orange);
            game.world.bringToTop(pink);
            game.world.bringToTop(cloud1);
            game.world.bringToTop(cloud2);
            game.world.bringToTop(cloud3);
            game.world.bringToTop(apple);
            
            game.world.bringToTop(alligator);
            game.world.bringToTop(aeroplane);
            game.world.bringToTop(anchor);
            game.world.bringToTop(angel);
            game.world.bringToTop(arrow);
            game.world.bringToTop(astronaut);
            game.world.bringToTop(avacado);
            game.world.bringToTop(axe);
            
            game.world.bringToTop(ball);
            game.world.bringToTop(balloon);
            game.world.bringToTop(bat);
            game.world.bringToTop(bee);
            game.world.bringToTop(bell);
            game.world.bringToTop(belt);
            game.world.bringToTop(bicycle);
            game.world.bringToTop(boat);
            game.world.bringToTop(bottle);
            game.world.bringToTop(butterfly);
            
           // game.world.bringToTop(game.rightArrow);
           // game.world.bringToTop(game.leftArrow);
            
            
            
            if(appleFlag == 1){apple.angle += 2;}
            if(aeroplaneFlag == 1){aeroplane.angle += 2;}
            if(alligatorFlag == 1){alligator.angle += 2;}
            if(anchorFlag == 1){anchor.angle += 2;}
            if(angelFlag == 1){angel.angle += 2;}
            if(antFlag == 1){ant.angle += 2;}
            if(arrowFlag == 1){arrow.angle += 2;}
            if(astronautFlag == 1){astronaut.angle += 2;}
            if(avacadoFlag == 1){avacado.angle += 2;}
            if(axeFlag == 1){axe.angle += 2;}
            
            if(ballFlag == 1){ball.angle += 2;}
            if(balloonFlag == 1){balloon.angle += 2;}
            if(batFlag == 1){bat.angle += 2;}
            if(beeFlag == 1){bee.angle += 2;}
            if(bellFlag == 1){bell.angle += 2;}
            if(beltFlag == 1){belt.angle += 2;}
            if(bicycleFlag == 1){bicycle.angle += 2;}
            if(boatFlag == 1){boat.angle += 2;}
            if(bottleFlag == 1){bottle.angle += 2;}
            if(butterflyFlag == 1){butterfly.angle += 2;}
            
            if(redFlag == 1){red.angle += 2;}
            if(blueFlag == 1){blue.angle += 2;}
            if(greenFlag == 1){green.angle += 2;}
            if(cyanFlag == 1){cyan.angle += 2;}
            if(orangeFlag == 1){orange.angle += 2;}
            if(pinkFlag == 1){pink.angle += 2;}
            
            if(bObjectClicked == 10){
            
                askForLevelC = 1;
               // game.rightArrow.kill();
               // game.leftArrow.kill();
                game.cButton = game.add.sprite(1170, 730, 'cButton');             
                game.cButton.scale.setTo(1, 1); 
                game.cButton.anchor.setTo(spriteAnchorX, spriteAnchorY);
                
                
            }
            
        if(askForLevelC == 1){
            
            game.world.bringToTop(game.cButton);
            game.cButton.inputEnabled = true;
            game.cButton.events.onInputDown.add(onDownC, this);
            function onDownC() {
            
                //start next level
                
                this.setBGlobalVaribalesToZero();
                game.state.start('C');
                
            }
        }
           
        },
        
        resetBSpriteFlag: function(){
            
            appleFlag = 0;aeroplaneFlag = 0;alligatorFlag = 0;anchorFlag = 0;angelFlag = 0;
            antFlag = 0;arrowFlag = 0;astronautFlag = 0;avacadoFlag = 0;axeFlag = 0;
            ballFlag = 0;balloonFlag = 0;batFlag = 0;beeFlag = 0;bellFlag = 0;beltFlag = 0;
            bicycleFlag = 0;boatFlag = 0;bottleFlag = 0;butterflyFlag = 0;

            apple.angle = 0;aeroplane.angle = 0;alligator.angle = 0;anchor.angle = 0;angel.angle = 0;
            ant.angle = 0;arrow.angle = 0;astronaut.angle = 0;avacado.angle = 0;axe.angle = 0;
            ball.angle = 0;balloon.angle = 0;bat.angle = 0;bee.angle = 0;bell.angle = 0;
            belt.angle = 0;butterfly.angle = 0;bicycle.angle = 0;boat.angle = 0;bottle.angle = 0;
           
        },
       
        setColorBFlagToZero: function(){
            
            bubbleSound.play(); blueFlag = 0;greenFlag = 0; redFlag = 0; cyanFlag = 0; pinkFlag = 0; orangeFlag = 0;
        },
        setBGlobalVaribalesToZero: function(){
            
            
            appleFlag = 0; aeroplaneFlag = 0;alligatorFlag = 0;anchorFlag = 0;
            angelFlag = 0;antFlag = 0;arrowFlag = 0;astronautFlag = 0;avacadoFlag = 0;axeFlag = 0;
    
            ballFlag = 0;balloonFlag = 0;batFlag = 0;batFlag = 0;beeFlag = 0;bellFlag = 0;
            beltFlag = 0;bicycleFlag = 0;boatFlag = 0;butterflyFlag = 0;



            greenFlag = 0;blueFlag = 0;orangeFlag = 0;redFlag = 0;pinkFlag = 0;cyanFlag = 0;
        }
        
        
    };
           