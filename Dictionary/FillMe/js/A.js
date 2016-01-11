    //We create our only state
  
    //hex codes for colors
    /*
    red = 0xFF0000
    pink = 0xFFC0CB
    green = 0x008000
    blue = 0x0000FF
    cyan = 0x00FFFF
    orange = 0xFFA500
    */    
    var aObjectClicked = 0;
    var askForLevelB = 0;
   
    var shadeScaleX = 1;
    var shadeScaleY = 1;
    

    var appleFlag = 0;
    var aeroplaneFlag = 0;
    var alligatorFlag = 0;            
    var anchorFlag = 0;
    var angelFlag = 0;
    var antFlag = 0;
    var arrowFlag = 0;
    var astronautFlag = 0;
    var avacadoFlag = 0;
    var axeFlag = 0;
    
    var cakeFlag = 0;
    var camelFlag = 0;
    var candleFlag = 0;            
    var carFlag = 0;
    var carrotFlag = 0;
    var catFlag = 0;
    var cheeseFlag = 0;
    var cherryFlag = 0;
    var chocolateFlag = 0;
    var cupFlag = 0;
    var clockFlag = 0;
    var cowFlag = 0;
    var crabFlag = 0;
    var crownFlag = 0;
    



    var greenFlag = 0;
    var blueFlag = 0;
    var orangeFlag = 0;
    var redFlag = 0;
    var pinkFlag = 0;
    var cyanFlag = 0;

    var spriteAnchorX = 0.5;
    var spriteAnchorY = 0.5;
    var spriteScaleX = 0.23;
    var spriteScaleY = 0.23;
    
    var objectsPositions = [
                {x:74,y:318},
                {x:146,y:534},
                {x:273,y:366},
                {x:170,y:400},
                {x:340,y:270},
                {x:300,y:400},
                {x:40,y:537},
                {x:57,y:400},
                {x:250,y:550},
                {x:80,y:222},
                {x:190,y:280},
                {x:1053,y:398},
                {x:1213,y:390},
                {x:1212,y:543},
                {x:300,y:100},
                {x:190,y:150},
                {x:700,y:100},
                {x:1200,y:210},
                {x:50,y:100},
                {x:1037,y:217},
                {x:57,y:680},
                {x:157,y:680},
                {x:249,y:680},
                {x:55,y:760},
                {x:155,y:760},
                {x:253,y:760},
                    ];
    
    
    var A = {

        preload: function () {

            //setting default path for assets to be used in game
            this.load.path = './assets/A/';
            
            
            
            //loading shades
            this.load.image("blue", "blue.png");
            this.load.image("cyan", "cyan.png");
            this.load.image("green", "green.png");
            this.load.image("orange", "orange.png");
            this.load.image("pink", "pink.png");
            this.load.image("red", "red.png");
    
            this.load.image("transApple", "transApple.png");
            this.load.image("transAlligator", "transAlligator.png");
            this.load.image("transAnchor", "transAnchor.png");
            this.load.image("transAngel", "transAngel.png");
            this.load.image("transAnt", "transAnt.png");
            this.load.image("transArrow", "transArrow.png");
            this.load.image("transAstronaut", "transAstronaut.png");
            this.load.image("transAvacado", "transAvacado.png");
            this.load.image("transAxe", "transAxe.png");
            this.load.image("transAeroplane", "transAeroplane.png");
            
            
            //loading assets for the level  A
            this.load.image("bg", "bg.png");
            this.load.image("aLetter", "aLetter.png");
            this.load.image("bButton", "bButton.png");
            
            
            
            //objects starting from A and not starting from A also 
            
            this.load.image("aeroplane", "aeroplane.png");
            this.load.image("cake", "cake.png");
            this.load.image("alligator", "alligator.png");
            this.load.image("camel", "camel.png");
            this.load.image("anchor", "anchor.png");
            this.load.image("candle", "candle.png");
            this.load.image("angel", "angel.png");
            this.load.image("car", "car.png");
            this.load.image("ant", "ant.png");
            this.load.image("carrot", "carrot.png");
            this.load.image("apple", "apple.png");
            this.load.image("cat", "cat.png");
            this.load.image("arrow", "arrow.png");
            this.load.image("cheese", "cheese.png");
            this.load.image("astronaut", "astronaut.png");
            this.load.image("cherry", "cherry.png");
            this.load.image("avacado", "avacado.png");
            this.load.image("chocolate", "chocolate.png");
            this.load.image("axe", "axe.png");
            this.load.image("cup", "cup.png");
            
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
            gameFace.play();
            
            
            
            
            //Adding images 
            var bg = game.add.image(gameMinWidth, gameMinHeight, 'bg');
                
            
            
            
            //Main letter A
            aLetter = game.add.sprite(gameMinWidth, gameMinHeight, 'aLetter');
            aLetter.inputEnabled = true;
            aLetter.events.onInputDown.add(this.onDownAletter, this);
            
            
            //Objects starting from A
                        
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
            function onDownAeroplane() {this.resetASpriteFlag(); aeroplaneFlag = 1; aObjectClicked++;}

            
            
            
            alligator = game.add.sprite(objectsPositions[10].x, objectsPositions[10].y, 'alligator');
            alligator.anchor.setTo(spriteAnchorX, spriteAnchorY);
            alligator.scale.setTo(spriteScaleX, spriteScaleY);
            alligator.inputEnabled = true;
            alligator.events.onInputDown.add(onDownAlligator, this);
            function onDownAlligator() {this.resetASpriteFlag(); alligatorFlag = 1; aObjectClicked++;}

            
            
            
            anchor = game.add.sprite(objectsPositions[1].x, objectsPositions[1].y, 'anchor');
            anchor.anchor.setTo(spriteAnchorX, spriteAnchorY);
            anchor.scale.setTo(spriteScaleX, spriteScaleY);
            anchor.inputEnabled = true;
            anchor.events.onInputDown.add(onDownAnchor, this);
            function onDownAnchor() {this.resetASpriteFlag(); anchorFlag = 1; aObjectClicked++;}
            
            
            
            
            angel = game.add.sprite(objectsPositions[11].x, objectsPositions[11].y, 'angel');
            angel.anchor.setTo(spriteAnchorX, spriteAnchorY);
            angel.scale.setTo(spriteScaleX, spriteScaleY);
            angel.inputEnabled = true;
            angel.events.onInputDown.add(onDownAngel, this);
            function onDownAngel() {this.resetASpriteFlag(); angelFlag = 1; aObjectClicked++;}
            
            
            
            ant = game.add.sprite(objectsPositions[2].x, objectsPositions[2].y, 'ant');
            ant.anchor.setTo(spriteAnchorX, spriteAnchorY);
            ant.scale.setTo(spriteScaleX, spriteScaleY);
            ant.inputEnabled = true;
            ant.events.onInputDown.add(onDownAnt, this);
            function onDownAnt() {this.resetASpriteFlag(); antFlag = 1; aObjectClicked++;}
            
            
            apple = game.add.sprite(objectsPositions[12].x, objectsPositions[12].y, 'apple');
            apple.anchor.setTo(spriteAnchorX, spriteAnchorY);
            apple.scale.setTo(spriteScaleX, spriteScaleY);
            apple.inputEnabled = true;
            apple.events.onInputDown.add(onDownApple, this);
            function onDownApple() {this.resetASpriteFlag(); appleFlag = 1; aObjectClicked++;}

            
            arrow = game.add.sprite(objectsPositions[3].x, objectsPositions[3].y, 'arrow');
            arrow.anchor.setTo(spriteAnchorX, spriteAnchorY);
            arrow.scale.setTo(spriteScaleX, spriteScaleY);
            arrow.inputEnabled = true;  
            arrow.events.onInputDown.add(onDownArrow, this);
            function onDownArrow() {this.resetASpriteFlag(); arrowFlag = 1; aObjectClicked++;}
            
            
            astronaut = game.add.sprite(objectsPositions[13].x, objectsPositions[13].y, 'astronaut');
            astronaut.anchor.setTo(spriteAnchorX, spriteAnchorY);
            astronaut.scale.setTo(spriteScaleX, spriteScaleY);
            astronaut.inputEnabled = true;
            astronaut.events.onInputDown.add(onDownAstronaut, this);
            function onDownAstronaut() {this.resetASpriteFlag(); astronautFlag = 1; aObjectClicked++;}
            
            
            avacado = game.add.sprite(objectsPositions[4].x, objectsPositions[4].y, 'avacado');
            avacado.anchor.setTo(spriteAnchorX, spriteAnchorY);
            avacado.scale.setTo(spriteScaleX, spriteScaleY);
            avacado.inputEnabled = true;
            avacado.events.onInputDown.add(onDownAvacado, this);
            function onDownAvacado() {this.resetASpriteFlag(); avacadoFlag = 1; aObjectClicked++;}
            
            
            axe = game.add.sprite(objectsPositions[14].x, objectsPositions[14].y, 'axe');
            axe.anchor.setTo(spriteAnchorX, spriteAnchorY);
            axe.scale.setTo(spriteScaleX, spriteScaleY);
            axe.inputEnabled = true;
            axe.events.onInputDown.add(onDownAxe, this);
            function onDownAxe() {this.resetASpriteFlag(); axeFlag = 1; aObjectClicked++;}
            
            
            
            cake = game.add.sprite(objectsPositions[5].x, objectsPositions[5].y, 'cake');
            cake.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cake.scale.setTo(spriteScaleX, spriteScaleY);
            cake.inputEnabled = true;
            cake.events.onInputDown.add(onDownCake, this);
            function onDownCake() {this.resetASpriteFlag(); cakeFlag = 1;}
            
            
            
            
            camel = game.add.sprite(objectsPositions[15].x, objectsPositions[15].y, 'camel');
            camel.anchor.setTo(spriteAnchorX, spriteAnchorY);
            camel.scale.setTo(spriteScaleX, spriteScaleY);
            camel.inputEnabled = true;
            camel.events.onInputDown.add(onDownCamel, this);
            function onDownCamel() {this.resetASpriteFlag(); camelFlag = 1;}
            
            
            candle = game.add.sprite(objectsPositions[6].x, objectsPositions[6].y, 'candle');
            candle.anchor.setTo(spriteAnchorX, spriteAnchorY);
            candle.scale.setTo(spriteScaleX, spriteScaleY);
            candle.inputEnabled = true;
            candle.events.onInputDown.add(onDownCandle, this);
            function onDownCandle() {this.resetASpriteFlag(); candleFlag = 1;}
            
            car = game.add.sprite(objectsPositions[16].x, objectsPositions[16].y, 'car');
            car.anchor.setTo(spriteAnchorX, spriteAnchorY);
            car.scale.setTo(spriteScaleX, spriteScaleY);
            car.inputEnabled = true;
            car.events.onInputDown.add(onDownCar, this);
            function onDownCar() {this.resetASpriteFlag(); carFlag = 1;}
            
            
            carrot = game.add.sprite(objectsPositions[7].x, objectsPositions[7].y, 'carrot');
            carrot.anchor.setTo(spriteAnchorX, spriteAnchorY);
            carrot.scale.setTo(spriteScaleX, spriteScaleY);
            carrot.inputEnabled = true;
            carrot.events.onInputDown.add(onDownCarrot, this);
            function onDownCarrot() {this.resetASpriteFlag(); carrotFlag = 1;}
            
            
            cat = game.add.sprite(objectsPositions[17].x, objectsPositions[17].y, 'cat');
            cat.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cat.scale.setTo(spriteScaleX, spriteScaleY);
            cat.inputEnabled = true;
            cat.events.onInputDown.add(onDownCat, this);
            function onDownCat() {this.resetASpriteFlag(); catFlag = 1;}
            
            
            cheese = game.add.sprite(objectsPositions[8].x, objectsPositions[8].y, 'cheese');
            cheese.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cheese.scale.setTo(spriteScaleX, spriteScaleY);
            cheese.inputEnabled = true;
            cheese.events.onInputDown.add(onDownCheese, this);
            function onDownCheese() {this.resetASpriteFlag(); cheeseFlag = 1;}
            
            
            
            cherry = game.add.sprite(objectsPositions[18].x, objectsPositions[18].y, 'cherry');
            cherry.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cherry.scale.setTo(spriteScaleX, spriteScaleY);
            cherry.inputEnabled = true;
            cherry.events.onInputDown.add(onDownCherry, this);
            function onDownCherry() {this.resetASpriteFlag(); cherryFlag = 1;}
            
            
            chocolate = game.add.sprite(objectsPositions[9].x, objectsPositions[9].y, 'chocolate');
            chocolate.anchor.setTo(spriteAnchorX, spriteAnchorY);
            chocolate.scale.setTo(spriteScaleX, spriteScaleY);
            chocolate.inputEnabled = true;
            chocolate.events.onInputDown.add(onDownChocolate, this);
            function onDownChocolate() {this.resetASpriteFlag(); chocolateFlag = 1;}
            
            
            cup = game.add.sprite(objectsPositions[19].x, objectsPositions[19].y, 'cup');
            cup.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cup.scale.setTo(spriteScaleX, spriteScaleY);
            cup.inputEnabled = true;
            cup.events.onInputDown.add(onDownCup, this);
            function onDownCup() {this.resetASpriteFlag(); cupFlag = 1;}
            
            
            
            //Color shades
            blue = game.add.sprite(objectsPositions[20].x, objectsPositions[20].y, 'blue');
            blue.anchor.setTo(spriteAnchorX, spriteAnchorY);
            blue.scale.setTo(shadeScaleX, shadeScaleY);
            blue.inputEnabled = true;
            blue.tint = 0x456AC1; 
            blue.events.onInputDown.add(onDownBlue, this);
            function onDownBlue() {this.setColorAFlagToZero(); blueFlag = 1;}
           
            
            cyan = game.add.sprite(objectsPositions[21].x, objectsPositions[21].y, 'cyan');
            cyan.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cyan.scale.setTo(shadeScaleX, shadeScaleY);
            cyan.inputEnabled = true;
            cyan.tint = 0x45C1C1; 
            cyan.events.onInputDown.add(onDownCyan, this);
            function onDownCyan() {this.setColorAFlagToZero(); cyanFlag = 1;}
            
            
            
            green = game.add.sprite(objectsPositions[22].x, objectsPositions[22].y, 'green');
            green.anchor.setTo(spriteAnchorX, spriteAnchorY);
            green.scale.setTo(shadeScaleX, shadeScaleY);
            green.inputEnabled = true;
            green.tint = 0x51C735;
            green.events.onInputDown.add(onDownGreen, this);
            function onDownGreen() {this.setColorAFlagToZero(); greenFlag = 1;}
            
            
            orange = game.add.sprite(objectsPositions[23].x, objectsPositions[23].y, 'orange');
            orange.anchor.setTo(spriteAnchorX, spriteAnchorY);
            orange.scale.setTo(shadeScaleX, shadeScaleY);
            orange.inputEnabled = true;
            orange.tint = 0xF38932;
            orange.events.onInputDown.add(onDownOrange, this);
            function onDownOrange() {this.setColorAFlagToZero(); orangeFlag = 1;}
           
            
            pink = game.add.sprite(objectsPositions[24].x, objectsPositions[24].y, 'pink');
            pink.anchor.setTo(spriteAnchorX, spriteAnchorY);
            pink.scale.setTo(shadeScaleX, shadeScaleY);
            pink.inputEnabled = true;
            pink.tint = 0xCC3ACC;
            pink.events.onInputDown.add(onDownPink, this);
            function onDownPink() {this.setColorAFlagToZero(); pinkFlag = 1;}
            
            
            red = game.add.sprite(objectsPositions[25].x, objectsPositions[25].y, 'red');
            red.anchor.setTo(spriteAnchorX, spriteAnchorY);
            red.scale.setTo(shadeScaleX, shadeScaleY);
            red.inputEnabled = true;
            red.tint = 0xE32424;
            red.events.onInputDown.add(onDownRed, this);
            function onDownRed() {this.setColorAFlagToZero(); redFlag = 1;}
                
        },
        
        onDownAletter: function() {
                
            //Apple    
                    if(appleFlag == 1 && greenFlag == 1 ){var greenApple = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transApple');greenApple.tint =  0x51C735; greenApple.scale.setTo(spriteScaleX, spriteScaleY); 
greenApple.anchor.setTo(0.6, 0.6);stickSound.play()
//game.paint.add(greenApple);
                                                          
                                                         }
                    
                    
                    if(appleFlag == 1 && blueFlag == 1){console.log("blueapple plotted");var blueApple = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transApple'); blueApple.tint =  0x456AC1; blueApple.scale.setTo(spriteScaleX, spriteScaleY); blueApple.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(appleFlag == 1 && orangeFlag == 1){var orangeApple = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transApple'); orangeApple.tint =  0xF38932; orangeApple.scale.setTo(spriteScaleX, spriteScaleY); orangeApple.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(appleFlag == 1 && redFlag == 1){var redApple = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transApple'); redApple.tint =  0xE32424; redApple.scale.setTo(spriteScaleX, spriteScaleY); redApple.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(appleFlag == 1 && pinkFlag == 1){var pinkApple = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transApple'); pinkApple.tint =  0xCC3ACC; pinkApple.scale.setTo(spriteScaleX, spriteScaleY); pinkApple.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(appleFlag == 1 && cyanFlag == 1){var cyanApple = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transApple'); cyanApple.tint =  0x45C1C1; cyanApple.scale.setTo(spriteScaleX, spriteScaleY); cyanApple.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //Aeroplane    
                    if(aeroplaneFlag == 1 && greenFlag == 1 ){var greenAeroplane = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transAeroplane');greenAeroplane.tint =  0x51C735; greenAeroplane.scale.setTo(spriteScaleX, spriteScaleY); 
greenAeroplane.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(aeroplaneFlag == 1 && blueFlag == 1){var blueAeroplane = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transAeroplane'); blueAeroplane.tint =  0x456AC1; blueAeroplane.scale.setTo(spriteScaleX, spriteScaleY); blueAeroplane.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(aeroplaneFlag == 1 && orangeFlag == 1){var orangeAeroplane = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transAeroplane'); orangeAeroplane.tint =  0xF38932; orangeAeroplane.scale.setTo(spriteScaleX, spriteScaleY); orangeAeroplane.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(aeroplaneFlag == 1 && redFlag == 1){var redAeroplane = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transAeroplane'); redAeroplane.tint =  0xE32424; redAeroplane.scale.setTo(spriteScaleX, spriteScaleY); redAeroplane.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(aeroplaneFlag == 1 && pinkFlag == 1){var pinkAeroplane = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transAeroplane'); pinkAeroplane.tint =  0xCC3ACC; pinkAeroplane.scale.setTo(spriteScaleX, spriteScaleY); pinkAeroplane.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(aeroplaneFlag == 1 && cyanFlag == 1){var cyanAeroplane = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transAeroplane'); cyanAeroplane.tint =  0x45C1C1; cyanAeroplane.scale.setTo(spriteScaleX, spriteScaleY); cyanAeroplane.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //Alligator    
                    if(alligatorFlag == 1 && greenFlag == 1 ){var greenAlligator = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transAlligator');greenAlligator.tint =  0x51C735; greenAlligator.scale.setTo(spriteScaleX, spriteScaleY); 
greenAlligator.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(alligatorFlag == 1 && blueFlag == 1){var blueAlligator = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transAlligator'); blueAlligator.tint =  0x456AC1; blueAlligator.scale.setTo(spriteScaleX, spriteScaleY); blueAlligator.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(alligatorFlag == 1 && orangeFlag == 1){var orangeAlligator = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transAlligator'); orangeAlligator.tint =  0xF38932; orangeAlligator.scale.setTo(spriteScaleX, spriteScaleY); orangeAlligator.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(alligatorFlag == 1 && redFlag == 1){var redAlligator = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transAlligator'); redAlligator.tint =  0xE32424; redAlligator.scale.setTo(spriteScaleX, spriteScaleY); redAlligator.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(alligatorFlag == 1 && pinkFlag == 1){var pinkAlligator = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transAlligator'); pinkAlligator.tint =  0xCC3ACC; pinkAlligator.scale.setTo(spriteScaleX, spriteScaleY); pinkAlligator.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(alligatorFlag == 1 && cyanFlag == 1){var cyanAlligator = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transAlligator'); cyanAlligator.tint =  0x45C1C1; cyanAlligator.scale.setTo(spriteScaleX, spriteScaleY); cyanAlligator.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //Anchor    
                    if(anchorFlag == 1 && greenFlag == 1 ){var greenAnchor = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transAnchor');greenAnchor.tint =  0x51C735; greenAnchor.scale.setTo(spriteScaleX, spriteScaleY); 
greenAnchor.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(anchorFlag == 1 && blueFlag == 1){console.log("blueAnchor plotted");var blueAnchor = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transAnchor'); blueAnchor.tint =  0x456AC1; blueAnchor.scale.setTo(spriteScaleX, spriteScaleY); blueAnchor.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(anchorFlag == 1 && orangeFlag == 1){var orangeAnchor = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transAnchor'); orangeAnchor.tint =  0xF38932; orangeAnchor.scale.setTo(spriteScaleX, spriteScaleY); orangeAnchor.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(anchorFlag == 1 && redFlag == 1){var redAnchor = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transAnchor'); redAnchor.tint =  0xE32424; redAnchor.scale.setTo(spriteScaleX, spriteScaleY); redAnchor.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(anchorFlag == 1 && pinkFlag == 1){var pinkAnchor = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transAnchor'); pinkAnchor.tint =  0xCC3ACC; pinkAnchor.scale.setTo(spriteScaleX, spriteScaleY); pinkAnchor.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(anchorFlag == 1 && cyanFlag == 1){var cyanAnchor = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transAnchor'); cyanAnchor.tint =  0x45C1C1; cyanAnchor.scale.setTo(spriteScaleX, spriteScaleY); cyanAnchor.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //Angel    
                    if(angelFlag == 1 && greenFlag == 1 ){var greenAngel = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transAngel');greenAngel.tint =  0x51C735; greenAngel.scale.setTo(spriteScaleX, spriteScaleY); 
greenAngel.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(angelFlag == 1 && blueFlag == 1){console.log("blueAngel plotted");var blueAngel = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transAngel'); blueAngel.tint =  0x456AC1; blueAngel.scale.setTo(spriteScaleX, spriteScaleY); blueAngel.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(angelFlag == 1 && orangeFlag == 1){var orangeAngel = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transAngel'); orangeAngel.tint =  0xF38932; orangeAngel.scale.setTo(spriteScaleX, spriteScaleY); orangeAngel.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(angelFlag == 1 && redFlag == 1){var redAngel = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transAngel'); redAngel.tint =  0xE32424; redAngel.scale.setTo(spriteScaleX, spriteScaleY); redAngel.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(angelFlag == 1 && pinkFlag == 1){var pinkAngel = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transAngel'); pinkAngel.tint =  0xCC3ACC; pinkAngel.scale.setTo(spriteScaleX, spriteScaleY); pinkAngel.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(angelFlag == 1 && cyanFlag == 1){var cyanAngel = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transAngel'); cyanAngel.tint =  0x45C1C1; cyanAngel.scale.setTo(spriteScaleX, spriteScaleY); cyanAngel.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //Ant    
                    if(antFlag == 1 && greenFlag == 1 ){var greenAnt = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transAnt');greenAnt.tint =  0x51C735; greenAnt.scale.setTo(spriteScaleX, spriteScaleY); 
greenAnt.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(antFlag == 1 && blueFlag == 1){var blueAnt = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transAnt'); blueAnt.tint =  0x456AC1; blueAnt.scale.setTo(spriteScaleX, spriteScaleY); blueAnt.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(antFlag == 1 && orangeFlag == 1){var orangeAnt = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transAnt'); orangeAnt.tint =  0xF38932; orangeAnt.scale.setTo(spriteScaleX, spriteScaleY); orangeAnt.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(antFlag == 1 && redFlag == 1){var redAnt = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transAnt'); redAnt.tint =  0xE32424; redApple.scale.setTo(spriteScaleX, spriteScaleY); redAnt.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(antFlag == 1 && pinkFlag == 1){var pinkAnt = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transAnt'); pinkAnt.tint =  0xCC3ACC; pinkAnt.scale.setTo(spriteScaleX, spriteScaleY); pinkAnt.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(antFlag == 1 && cyanFlag == 1){var cyanAnt = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transAnt'); cyanAnt.tint =  0x45C1C1; cyanAnt.scale.setTo(spriteScaleX, spriteScaleY); cyanAnt.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //Arrow    
                    if(arrowFlag == 1 && greenFlag == 1 ){var greenArrow = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transArrow');greenArrow.tint =  0x51C735; greenArrow.scale.setTo(spriteScaleX, spriteScaleY); 
greenArrow.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(arrowFlag == 1 && blueFlag == 1){console.log("blueArrow plotted");var blueArrow = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transArrow'); blueArrow.tint =  0x456AC1; blueArrow.scale.setTo(spriteScaleX, spriteScaleY); blueArrow.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(arrowFlag == 1 && orangeFlag == 1){var orangeArrow = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transArrow'); orangeArrow.tint =  0xF38932; orangeArrow.scale.setTo(spriteScaleX, spriteScaleY); orangeArrow.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(arrowFlag == 1 && redFlag == 1){var redArrow = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transArrow'); redArrow.tint =  0xE32424; redArrow.scale.setTo(spriteScaleX, spriteScaleY); redArrow.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(arrowFlag == 1 && pinkFlag == 1){var pinkArrow = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transArrow'); pinkArrow.tint =  0xCC3ACC; pinkArrow.scale.setTo(spriteScaleX, spriteScaleY); pinkArrow.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(arrowFlag == 1 && cyanFlag == 1){var cyanArrow = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transArrow'); cyanArrow.tint =  0x45C1C1; cyanArrow.scale.setTo(spriteScaleX, spriteScaleY); cyanArrow.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //Astronaut    
                    if(astronautFlag == 1 && greenFlag == 1 ){var greenAstronaut = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transAstronaut');greenAstronaut.tint =  0x51C735; greenAstronaut.scale.setTo(spriteScaleX, spriteScaleY); 
greenAstronaut.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(astronautFlag == 1 && blueFlag == 1){console.log("blueAstronaut plotted");var blueAstronaut = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transAstronaut'); blueAstronaut.tint =  0x456AC1; blueAstronaut.scale.setTo(spriteScaleX, spriteScaleY); blueAstronaut.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(astronautFlag == 1 && orangeFlag == 1){var orangeAstronaut = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transAstronaut'); orangeAstronaut.tint =  0xF38932; orangeAstronaut.scale.setTo(spriteScaleX, spriteScaleY); orangeAstronaut.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(astronautFlag == 1 && redFlag == 1){var redAstronaut = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transAstronaut'); redAstronaut.tint =  0xE32424; redAstronaut.scale.setTo(spriteScaleX, spriteScaleY); redAstronaut.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(astronautFlag == 1 && pinkFlag == 1){var pinkAstronaut = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transAstronaut'); pinkAstronaut.tint =  0xCC3ACC; pinkAstronaut.scale.setTo(spriteScaleX, spriteScaleY); pinkAstronaut.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(astronautFlag == 1 && cyanFlag == 1){var cyanAstronaut = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transAstronaut'); cyanAstronaut.tint =  0x45C1C1; cyanAstronaut.scale.setTo(spriteScaleX, spriteScaleY); cyanAstronaut.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //Avacado    
                    if(avacadoFlag == 1 && greenFlag == 1 ){var greenAvacado = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transAvacado');greenAvacado.tint =  0x51C735; greenAvacado.scale.setTo(spriteScaleX, spriteScaleY); 
greenAvacado.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(avacadoFlag == 1 && blueFlag == 1){console.log("blueAvacado plotted");var blueAvacado = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transAvacado'); blueAvacado.tint =  0x456AC1; blueAvacado.scale.setTo(spriteScaleX, spriteScaleY); blueAvacado.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(avacadoFlag == 1 && orangeFlag == 1){var orangeAvacado = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transAvacado'); orangeAvacado.tint =  0xF38932; orangeAvacado.scale.setTo(spriteScaleX, spriteScaleY); orangeAvacado.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(avacadoFlag == 1 && redFlag == 1){var redAvacado = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transAvacado'); redAvacado.tint =  0xE32424; redAvacado.scale.setTo(spriteScaleX, spriteScaleY); redAvacado.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(avacadoFlag == 1 && pinkFlag == 1){var pinkAvacado = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transAvacado'); pinkAvacado.tint =  0xCC3ACC; pinkAvacado.scale.setTo(spriteScaleX, spriteScaleY); pinkAvacado.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(avacadoFlag == 1 && cyanFlag == 1){var cyanAvacado = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transAvacado'); cyanAvacado.tint =  0x45C1C1; cyanAvacado.scale.setTo(spriteScaleX, spriteScaleY); cyanAvacado.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //Axe    
                    if(axeFlag == 1 && greenFlag == 1 ){var greenAxe = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transAxe');greenAxe.tint =  0x51C735; greenAxe.scale.setTo(spriteScaleX, spriteScaleY); 
greenAxe.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(axeFlag == 1 && blueFlag == 1){console.log("blueAxe plotted");var blueAxe = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transAxe'); blueAxe.tint =  0x456AC1; blueAxe.scale.setTo(spriteScaleX, spriteScaleY); blueAxe.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(axeFlag == 1 && orangeFlag == 1){var orangeAxe = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transAxe'); orangeAxe.tint =  0xF38932; orangeAxe.scale.setTo(spriteScaleX, spriteScaleY); orangeAxe.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(axeFlag == 1 && redFlag == 1){var redAxe = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transAxe'); redAxe.tint =  0xE32424; redAxe.scale.setTo(spriteScaleX, spriteScaleY); redAxe.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(axeFlag == 1 && pinkFlag == 1){var pinkAxe = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transAxe'); pinkAxe.tint =  0xCC3ACC; pinkAxe.scale.setTo(spriteScaleX, spriteScaleY); pinkAxe.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(axeFlag == 1 && cyanFlag == 1){var cyanAxe = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transAxe'); cyanAxe.tint =  0x45C1C1; cyanAxe.scale.setTo(spriteScaleX, spriteScaleY); cyanAxe.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //For Wrong Objects
            
if(catFlag == 1 || cakeFlag == 1 || camelFlag == 1 || candleFlag == 1 || carFlag == 1 || carrotFlag == 1 || cheeseFlag == 1 || cherryFlag == 1 || chocolateFlag == 1 || cupFlag == 1){var blackSplash = game.add.sprite(game.input.mousePointer.x,game.input.mousePointer.y,'blackSplash');
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
            
            game.world.bringToTop(aLetter);
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
            game.world.bringToTop(cake);
            game.world.bringToTop(camel);
            game.world.bringToTop(candle);
            game.world.bringToTop(car);
            game.world.bringToTop(carrot);
            game.world.bringToTop(cat);
            game.world.bringToTop(chocolate);
            game.world.bringToTop(cheese);
            game.world.bringToTop(cherry);
            game.world.bringToTop(cup);
            
            
            
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
            
            if(cakeFlag == 1){cake.angle += 2;}
            if(camelFlag == 1){camel.angle += 2;}
            if(candleFlag == 1){candle.angle += 2;}
            if(carFlag == 1){car.angle += 2;}
            if(carrotFlag == 1){carrot.angle += 2;}
            if(catFlag == 1){cat.angle += 2;}
            if(cheeseFlag == 1){cheese.angle += 2;}
            if(cherryFlag == 1){cherry.angle += 2;}
            if(chocolateFlag == 1){chocolate.angle += 2;}
            if(cupFlag == 1){cup.angle += 2;}
            
            if(redFlag == 1){red.angle += 2;}
            if(blueFlag == 1){blue.angle += 2;}
            if(greenFlag == 1){green.angle += 2;}
            if(cyanFlag == 1){cyan.angle += 2;}
            if(orangeFlag == 1){orange.angle += 2;}
            if(pinkFlag == 1){pink.angle += 2;}
            
            if(aObjectClicked == 10){
            
                askForLevelB = 1;
                game.bButton = game.add.sprite(1170, 730, 'bButton');             
                game.bButton.scale.setTo(1, 1); 
                game.bButton.anchor.setTo(spriteAnchorX, spriteAnchorY);
                
            }
            
        if(askForLevelB == 1){
            
            game.world.bringToTop(game.bButton);
            game.bButton.inputEnabled = true;
            game.bButton.events.onInputDown.add(onDownB, this);
            function onDownB() {
                //start next level
                
                this.setAGlobalVaribalesToZero();
                game.state.start('B');
                
            }
        }
           
            
        },
        
        resetASpriteFlag: function(){
            
            appleFlag = 0;aeroplaneFlag = 0;alligatorFlag = 0;anchorFlag = 0;angelFlag = 0;
            antFlag = 0;arrowFlag = 0;astronautFlag = 0;avacadoFlag = 0;axeFlag = 0;
            cakeFlag = 0;camelFlag = 0;candleFlag = 0;carFlag = 0;carrotFlag = 0;
            catFlag = 0;cheeseFlag = 0;cherryFlag = 0;cupFlag = 0;chocolateFlag = 0;
            
            apple.angle = 0;aeroplane.angle = 0;alligator.angle = 0;anchor.angle = 0;angel.angle = 0;
            ant.angle = 0;arrow.angle = 0;astronaut.angle = 0;avacado.angle = 0;axe.angle = 0;
            cake.angle = 0;camel.angle = 0;candle.angle = 0;car.angle = 0;carrot.angle = 0;
            cat.angle = 0;cheese.angle = 0;cherry.angle = 0;cup.angle = 0;chocolate.angle = 0;
           
        },
       
        setColorAFlagToZero: function(){
            
            bubbleSound.play(); blueFlag = 0;greenFlag = 0; redFlag = 0; cyanFlag = 0; pinkFlag = 0; orangeFlag = 0;
        },
        
        setAGlobalVaribalesToZero: function(){
            
            
            appleFlag = 0; aeroplaneFlag = 0;alligatorFlag = 0;anchorFlag = 0;
            angelFlag = 0;antFlag = 0;arrowFlag = 0;astronautFlag = 0;avacadoFlag = 0;axeFlag = 0;
    
            cakeFlag = 0;camelFlag = 0;candleFlag = 0;carFlag = 0;carrotFlag = 0;catFlag = 0;
            cheeseFlag = 0;cherryFlag = 0;chocolateFlag = 0;cupFlag = 0;



            greenFlag = 0;blueFlag = 0;orangeFlag = 0;redFlag = 0;pinkFlag = 0;cyanFlag = 0;
        }
        
    };




    