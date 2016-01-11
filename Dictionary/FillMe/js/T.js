        
    var tObjectClicked = 0;
    var askForLevelU = 0;
    
    
    var tableFlag = 0;
    var tapFlag = 0;
    var telescopeFlag = 0;            
    var tentFlag = 0;
    var tieFlag = 0;
    var tigerFlag = 0;
    var tortoiseFlag = 0;
    var treeFlag = 0;
    var truckFlag = 0;
    var tvFlag = 0;
    
    
    var T = {

        preload: function () {

            //setting default path for assets to be used in game
            this.load.path = './assets/T/';
            
            
            
            this.load.image("transTable", "transTable.png");
            this.load.image("transTap", "transTap.png");
            this.load.image("transTelescope", "transTelescope.png");
            this.load.image("transTent", "transTent.png");
            this.load.image("transTie", "transTie.png");
            this.load.image("transTiger", "transTiger.png");
            this.load.image("transTortoise", "transTortoise.png");
            this.load.image("transTree", "transTree.png");
            this.load.image("transTruck", "transTruck.png");
            this.load.image("transTV", "transTV.png");
            
            this.load.image("table", "table.png");
            this.load.image("tap", "tap.png");
            this.load.image("telescope", "telescope.png");
            this.load.image("tent", "tent.png");
            this.load.image("tie", "tie.png");
            this.load.image("tiger", "tiger.png");
            this.load.image("tortoise", "tortoise.png");
            this.load.image("tree", "tree.png");
            this.load.image("truck", "truck.png");
            this.load.image("tv", "tv.png");
            
            
            //loading assets for the level  T
            
            //loading shades
            this.load.image("blue", "blue.png");
            this.load.image("cyan", "cyan.png");
            this.load.image("green", "green.png");
            this.load.image("orange", "orange.png");
            this.load.image("pink", "pink.png");
            this.load.image("red", "red.png");
    
            this.load.image("bg", "bg.png");
            this.load.image("tLetter", "tLetter.png");
            this.load.image("uButton", "uButton.png");
            
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
                
            
            
            
            //Main letter T
            tLetter = game.add.sprite(gameMinWidth, gameMinHeight, 'tLetter');
            tLetter.inputEnabled = true;
            tLetter.events.onInputDown.add(this.onDowntLetter, this);
            
            
            
            //Objects starting from T
                    
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
            
            
            
            
            table = game.add.sprite(objectsPositions[0].x, objectsPositions[0].y, 'table');
            table.anchor.setTo(spriteAnchorX, spriteAnchorY);
            table.scale.setTo(spriteScaleX, spriteScaleY);
            table.inputEnabled = true;
            table.events.onInputDown.add(onDowntable, this);
            function onDowntable() {this.resetTSpriteFlag(); tableFlag = 1;tObjectClicked++;}

            
            
            
            tap = game.add.sprite(objectsPositions[10].x, objectsPositions[10].y, 'tap');
            tap.anchor.setTo(spriteAnchorX, spriteAnchorY);
            tap.scale.setTo(spriteScaleX, spriteScaleY);
            tap.inputEnabled = true;
            tap.events.onInputDown.add(onDowntap, this);
            function onDowntap() {this.resetTSpriteFlag(); tapFlag = 1;tObjectClicked++;}

            
            
            
            telescope = game.add.sprite(objectsPositions[1].x, objectsPositions[1].y, 'telescope');
            telescope.anchor.setTo(spriteAnchorX, spriteAnchorY);
            telescope.scale.setTo(spriteScaleX, spriteScaleY);
            telescope.inputEnabled = true;
            telescope.events.onInputDown.add(onDowntelescope, this);
            function onDowntelescope() {this.resetTSpriteFlag(); telescopeFlag = 1;tObjectClicked++;}
            
            
            
            
            tent = game.add.sprite(objectsPositions[11].x, objectsPositions[11].y, 'tent');
            tent.anchor.setTo(spriteAnchorX, spriteAnchorY);
            tent.scale.setTo(spriteScaleX, spriteScaleY);
            tent.inputEnabled = true;
            tent.events.onInputDown.add(onDowntent, this);
            function onDowntent() {this.resetTSpriteFlag(); tentFlag = 1;tObjectClicked++;}
            
            
            
            tie = game.add.sprite(objectsPositions[2].x, objectsPositions[2].y, 'tie');
            tie.anchor.setTo(spriteAnchorX, spriteAnchorY);
            tie.scale.setTo(spriteScaleX, spriteScaleY);
            tie.inputEnabled = true;
            tie.events.onInputDown.add(onDowntie, this);
            function onDowntie() {this.resetTSpriteFlag(); tieFlag = 1;tObjectClicked++;}
            
            tiger = game.add.sprite(objectsPositions[12].x, objectsPositions[12].y, 'tiger');
            tiger.anchor.setTo(spriteAnchorX, spriteAnchorY);
            tiger.scale.setTo(spriteScaleX, spriteScaleY);
            tiger.inputEnabled = true;
            tiger.events.onInputDown.add(onDowntiger, this);
            function onDowntiger() {this.resetTSpriteFlag(); treeFlag = 1;tObjectClicked++;}

            
            tortoise = game.add.sprite(objectsPositions[3].x, objectsPositions[3].y, 'tortoise');
            tortoise.anchor.setTo(spriteAnchorX, spriteAnchorY);
            tortoise.scale.setTo(spriteScaleX, spriteScaleY);
            tortoise.inputEnabled = true;  
            tortoise.events.onInputDown.add(onDowntortoise, this);
            function onDowntortoise() {this.resetTSpriteFlag(); tortoiseFlag = 1;tObjectClicked++;}
            
            
            tree = game.add.sprite(objectsPositions[13].x, objectsPositions[13].y, 'tree');
            tree.anchor.setTo(spriteAnchorX, spriteAnchorY);
            tree.scale.setTo(spriteScaleX, spriteScaleY);
            tree.inputEnabled = true;
            tree.events.onInputDown.add(onDowntree, this);
            function onDowntree() {this.resetTSpriteFlag(); tigerFlag = 1;tObjectClicked++;}
            
            
            truck = game.add.sprite(objectsPositions[4].x, objectsPositions[4].y, 'truck');
            truck.anchor.setTo(spriteAnchorX, spriteAnchorY);
            truck.scale.setTo(spriteScaleX, spriteScaleY);
            truck.inputEnabled = true;
            truck.events.onInputDown.add(onDowntruck, this);
            function onDowntruck() {this.resetTSpriteFlag(); truckFlag = 1;tObjectClicked++;}
            
            
            tv = game.add.sprite(objectsPositions[14].x, objectsPositions[14].y, 'tv');
            tv.anchor.setTo(spriteAnchorX, spriteAnchorY);
            tv.scale.setTo(spriteScaleX, spriteScaleY);
            tv.inputEnabled = true;
            tv.events.onInputDown.add(onDowntv, this);
            function onDowntv() {this.resetTSpriteFlag(); tvFlag = 1;tObjectClicked++;}
            
            
            
            //Adding other sprites        
            
            camel = game.add.sprite(objectsPositions[5].x, objectsPositions[5].y, 'camel');
            camel.anchor.setTo(spriteAnchorX, spriteAnchorY);
            camel.scale.setTo(spriteScaleX, spriteScaleY);
            camel.inputEnabled = true;
            camel.events.onInputDown.add(onDownCamel, this);
            function onDownCamel() {this.resetTSpriteFlag(); camelFlag = 1;}
            
            
            
            
            candle = game.add.sprite(objectsPositions[15].x, objectsPositions[15].y, 'candle');
            candle.anchor.setTo(spriteAnchorX, spriteAnchorY);
            candle.scale.setTo(spriteScaleX, spriteScaleY);
            candle.inputEnabled = true;
            candle.events.onInputDown.add(onDownCandle, this);
            function onDownCandle() {this.resetTSpriteFlag(); candleFlag = 1; }
            
            
            car = game.add.sprite(objectsPositions[6].x, objectsPositions[6].y, 'car');
            car.anchor.setTo(spriteAnchorX, spriteAnchorY);
            car.scale.setTo(spriteScaleX, spriteScaleY);
            car.inputEnabled = true;
            car.events.onInputDown.add(onDownCar, this);
            function onDownCar() {this.resetTSpriteFlag(); carFlag = 1;}
            
            cat = game.add.sprite(objectsPositions[16].x, objectsPositions[16].y, 'cat');
            cat.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cat.scale.setTo(spriteScaleX, spriteScaleY);
            cat.inputEnabled = true;
            cat.events.onInputDown.add(onDownCat, this);
            function onDownCat() {this.resetTSpriteFlag(); catFlag = 1;}
            
            
            cheese = game.add.sprite(objectsPositions[7].x, objectsPositions[7].y, 'cheese');
            cheese.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cheese.scale.setTo(spriteScaleX, spriteScaleY);
            cheese.inputEnabled = true;
            cheese.events.onInputDown.add(onDownCheese, this);
            function onDownCheese() {this.resetTSpriteFlag(); cheeseFlag = 1;}
            
            
            cherry = game.add.sprite(objectsPositions[17].x, objectsPositions[17].y, 'cherry');
            cherry.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cherry.scale.setTo(spriteScaleX, spriteScaleY);
            cherry.inputEnabled = true;
            cherry.events.onInputDown.add(onDownCherry, this);
            function onDownCherry() {this.resetTSpriteFlag(); cherryFlag = 1;}
            
            
            clock = game.add.sprite(objectsPositions[8].x, objectsPositions[8].y, 'clock');
            clock.anchor.setTo(spriteAnchorX, spriteAnchorY);
            clock.scale.setTo(spriteScaleX, spriteScaleY);
            clock.inputEnabled = true;
            clock.events.onInputDown.add(onDownClock, this);
            function onDownClock() {this.resetTSpriteFlag(); clockFlag = 1;}
            
            
            
            cow = game.add.sprite(objectsPositions[18].x, objectsPositions[18].y, 'cow');
            cow.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cow.scale.setTo(spriteScaleX, spriteScaleY);
            cow.inputEnabled = true;
            cow.events.onInputDown.add(onDownCow, this);
            function onDownCow() {this.resetTSpriteFlag(); cowFlag = 1;}
            
            
            crab = game.add.sprite(objectsPositions[9].x, objectsPositions[9].y, 'crab');
            crab.anchor.setTo(spriteAnchorX, spriteAnchorY);
            crab.scale.setTo(spriteScaleX, spriteScaleY);
            crab.inputEnabled = true;
            crab.events.onInputDown.add(onDownCrab, this);
            function onDownCrab() {this.resetTSpriteFlag(); crabFlag = 1;}
            
            
            crown = game.add.sprite(objectsPositions[19].x, objectsPositions[19].y, 'crown');
            crown.anchor.setTo(spriteAnchorX, spriteAnchorY);
            crown.scale.setTo(spriteScaleX, spriteScaleY);
            crown.inputEnabled = true;
            crown.events.onInputDown.add(onDownCrown, this);
            function onDownCrown() {this.resetTSpriteFlag(); crownFlag = 1;}
            
            
            
            //Color shades
            blue = game.add.sprite(objectsPositions[20].x, objectsPositions[20].y, 'blue');
            blue.anchor.setTo(spriteAnchorX, spriteAnchorY);
            blue.scale.setTo(shadeScaleX, shadeScaleY);
            blue.inputEnabled = true;
            blue.tint = 0x456AC1; 
            blue.events.onInputDown.add(onDownBlue, this);
            function onDownBlue() {this.setColorTFlagToZero(); blueFlag = 1;}
           
            
            cyan = game.add.sprite(objectsPositions[21].x, objectsPositions[21].y, 'cyan');
            cyan.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cyan.scale.setTo(shadeScaleX, shadeScaleY);
            cyan.inputEnabled = true;
            cyan.tint = 0x45C1C1; 
            cyan.events.onInputDown.add(onDownCyan, this);
            function onDownCyan() {this.setColorTFlagToZero(); cyanFlag = 1;}
            
            
            
            green = game.add.sprite(objectsPositions[22].x, objectsPositions[22].y, 'green');
            green.anchor.setTo(spriteAnchorX, spriteAnchorY);
            green.scale.setTo(shadeScaleX, shadeScaleY);
            green.inputEnabled = true;
            green.tint = 0x51C735;
            green.events.onInputDown.add(onDownGreen, this);
            function onDownGreen() {this.setColorTFlagToZero(); greenFlag = 1;}
            
            
            orange = game.add.sprite(objectsPositions[23].x, objectsPositions[23].y, 'orange');
            orange.anchor.setTo(spriteAnchorX, spriteAnchorY);
            orange.scale.setTo(shadeScaleX, shadeScaleY);
            orange.inputEnabled = true;
            orange.tint = 0xF38932;
            orange.events.onInputDown.add(onDownOrange, this);
            function onDownOrange() {this.setColorTFlagToZero(); orangeFlag = 1;}
           
            
            pink = game.add.sprite(objectsPositions[24].x, objectsPositions[24].y, 'pink');
            pink.anchor.setTo(spriteAnchorX, spriteAnchorY);
            pink.scale.setTo(shadeScaleX, shadeScaleY);
            pink.inputEnabled = true;
            pink.tint = 0xCC3ACC;
            pink.events.onInputDown.add(onDownPink, this);
            function onDownPink() {this.setColorTFlagToZero(); pinkFlag = 1;}
            
            
            red = game.add.sprite(objectsPositions[25].x, objectsPositions[25].y, 'red');
            red.anchor.setTo(spriteAnchorX, spriteAnchorY);
            red.scale.setTo(shadeScaleX, shadeScaleY);
            red.inputEnabled = true;
            red.tint = 0xE32424;
            red.events.onInputDown.add(onDownRed, this);
            function onDownRed() {this.setColorTFlagToZero(); redFlag = 1;}
                
        },
        
        onDowntLetter: function() {
                
            //table
                    if(tableFlag == 1 && greenFlag == 1 ){var greentable = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transTable');greentable.tint =  0x51C735; greentable.scale.setTo(spriteScaleX, spriteScaleY); 
greentable.anchor.setTo(0.6, 0.6);stickSound.play();}                    
                    
                    if(tableFlag == 1 && blueFlag == 1){var bluetable = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transTable'); bluetable.tint =  0x456AC1; bluetable.scale.setTo(spriteScaleX, spriteScaleY); bluetable.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(tableFlag == 1 && orangeFlag == 1){var orangetable = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transTable'); orangetable.tint =  0xF38932; orangetable.scale.setTo(spriteScaleX, spriteScaleY); orangetable.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(tableFlag == 1 && redFlag == 1){var redtable = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transTable'); redtable.tint =  0xE32424; redtable.scale.setTo(spriteScaleX, spriteScaleY); redtable.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(tableFlag == 1 && pinkFlag == 1){var pinktable = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transTable'); pinktable.tint =  0xCC3ACC; pinktable.scale.setTo(spriteScaleX, spriteScaleY); pinktable.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(tableFlag == 1 && cyanFlag == 1){var cyantable = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transTable'); cyantable.tint =  0x45C1C1; cyantable.scale.setTo(spriteScaleX, spriteScaleY); cyantable.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //tap    
                    if(tapFlag == 1 && greenFlag == 1 ){var greentap = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transTap');greentap.tint =  0x51C735; greentap.scale.setTo(spriteScaleX, spriteScaleY); 
greentap.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(tapFlag == 1 && blueFlag == 1){var bluetap = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transTap'); bluetap.tint =  0x456AC1; bluetap.scale.setTo(spriteScaleX, spriteScaleY); bluetap.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(tapFlag == 1 && orangeFlag == 1){var orangetap = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transTap'); orangetap.tint =  0xF38932; orangetap.scale.setTo(spriteScaleX, spriteScaleY); orangetap.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(tapFlag == 1 && redFlag == 1){var redtap = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transTap'); redtap.tint =  0xE32424; redtap.scale.setTo(spriteScaleX, spriteScaleY); redtap.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(tapFlag == 1 && pinkFlag == 1){var pinktap = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transTap'); pinktap.tint =  0xCC3ACC; pinktap.scale.setTo(spriteScaleX, spriteScaleY); pinktap.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(tapFlag == 1 && cyanFlag == 1){var cyantap = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transTap'); cyantap.tint =  0x45C1C1; cyantap.scale.setTo(spriteScaleX, spriteScaleY); cyantap.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //telescope    
                    if(telescopeFlag == 1 && greenFlag == 1 ){var greentelescope = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transTelescope');greentelescope.tint =  0x51C735; greentelescope.scale.setTo(spriteScaleX, spriteScaleY); 
greentelescope.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(telescopeFlag == 1 && blueFlag == 1){var bluetelescope = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transTelescope'); bluetelescope.tint =  0x456AC1; bluetelescope.scale.setTo(spriteScaleX, spriteScaleY); bluetelescope.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(telescopeFlag == 1 && orangeFlag == 1){var orangetelescope = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transTelescope'); orangetelescope.tint =  0xF38932; orangetelescope.scale.setTo(spriteScaleX, spriteScaleY); orangetelescope.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(telescopeFlag == 1 && redFlag == 1){var redtelescope = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transTelescope'); redtelescope.tint =  0xE32424; redtelescope.scale.setTo(spriteScaleX, spriteScaleY); redtelescope.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(telescopeFlag == 1 && pinkFlag == 1){var pinktelescope = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transTelescope'); pinktelescope.tint =  0xCC3ACC; pinktelescope.scale.setTo(spriteScaleX, spriteScaleY); pinktelescope.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(telescopeFlag == 1 && cyanFlag == 1){var cyantelescope = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transTelescope'); cyantelescope.tint =  0x45C1C1; cyantelescope.scale.setTo(spriteScaleX, spriteScaleY); cyantelescope.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //tent
                    if(tentFlag == 1 && greenFlag == 1 ){var greentent = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transTent');greentent.tint =  0x51C735; greentent.scale.setTo(spriteScaleX, spriteScaleY); 
greentent.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(tentFlag == 1 && blueFlag == 1){console.log("bluetent plotted");var bluetent = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transTent'); bluetent.tint =  0x456AC1; bluetent.scale.setTo(spriteScaleX, spriteScaleY); bluetent.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(tentFlag == 1 && orangeFlag == 1){var orangetent = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transTent'); orangetent.tint =  0xF38932; orangetent.scale.setTo(spriteScaleX, spriteScaleY); orangetent.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(tentFlag == 1 && redFlag == 1){var redtent = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transTent'); redtent.tint =  0xE32424; redtent.scale.setTo(spriteScaleX, spriteScaleY); redtent.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(tentFlag == 1 && pinkFlag == 1){var pinktent = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transTent'); pinktent.tint =  0xCC3ACC; pinktent.scale.setTo(spriteScaleX, spriteScaleY); pinktent.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(tentFlag == 1 && cyanFlag == 1){var cyantent = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transTent'); cyantent.tint =  0x45C1C1; cyantent.scale.setTo(spriteScaleX, spriteScaleY); cyantent.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //tie    
                    if(tieFlag == 1 && greenFlag == 1 ){var greentie = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transTie');greentie.tint =  0x51C735; greentie.scale.setTo(spriteScaleX, spriteScaleY); 
greentie.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(tieFlag == 1 && blueFlag == 1){console.log("bluetie plotted");var bluetie = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transTie'); bluetie.tint =  0x456AC1; bluetie.scale.setTo(spriteScaleX, spriteScaleY); bluetie.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(tieFlag == 1 && orangeFlag == 1){var orangetie = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transTie'); orangetie.tint =  0xF38932; orangetie.scale.setTo(spriteScaleX, spriteScaleY); orangetie.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(tieFlag == 1 && redFlag == 1){var redtie = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transTie'); redtie.tint =  0xE32424; redtie.scale.setTo(spriteScaleX, spriteScaleY); redtie.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(tieFlag == 1 && pinkFlag == 1){var pinktie = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transTie'); pinktie.tint =  0xCC3ACC; pinktie.scale.setTo(spriteScaleX, spriteScaleY); pinktie.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(tieFlag == 1 && cyanFlag == 1){var cyantie = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transTie'); cyantie.tint =  0x45C1C1; cyantie.scale.setTo(spriteScaleX, spriteScaleY); cyantie.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //tiger   
                    if(treeFlag == 1 && greenFlag == 1 ){var greentiger = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transTiger');greentiger.tint =  0x51C735; greentiger.scale.setTo(spriteScaleX, spriteScaleY); 
greentiger.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(treeFlag == 1 && blueFlag == 1){console.log("bluetiger plotted");var bluetiger = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transTiger'); bluetiger.tint =  0x456AC1; bluetiger.scale.setTo(spriteScaleX, spriteScaleY); bluetiger.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(treeFlag == 1 && orangeFlag == 1){var orangetiger = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transTiger'); orangetiger.tint =  0xF38932; orangetiger.scale.setTo(spriteScaleX, spriteScaleY); orangetiger.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(treeFlag == 1 && redFlag == 1){var redtiger = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transTiger'); redtiger.tint =  0xE32424; redtiger.scale.setTo(spriteScaleX, spriteScaleY); redtiger.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(treeFlag == 1 && pinkFlag == 1){var pinktiger = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transTiger'); pinktiger.tint =  0xCC3ACC; pinktiger.scale.setTo(spriteScaleX, spriteScaleY); pinktiger.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(treeFlag == 1 && cyanFlag == 1){var cyantiger = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transTiger'); cyantiger.tint =  0x45C1C1; cyantiger.scale.setTo(spriteScaleX, spriteScaleY); cyantiger.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //tortoise    
                    if(tortoiseFlag == 1 && greenFlag == 1 ){var greentortoise = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transTortoise');greentortoise.tint =  0x51C735; greentortoise.scale.setTo(spriteScaleX, spriteScaleY); 
greentortoise.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(tortoiseFlag == 1 && blueFlag == 1){console.log("bluetortoise plotted");var bluetortoise = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transTortoise'); bluetortoise.tint =  0x456AC1; bluetortoise.scale.setTo(spriteScaleX, spriteScaleY); bluetortoise.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(tortoiseFlag == 1 && orangeFlag == 1){var orangetortoise = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transTortoise'); orangetortoise.tint =  0xF38932; orangetortoise.scale.setTo(spriteScaleX, spriteScaleY); orangetortoise.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(tortoiseFlag == 1 && redFlag == 1){var redtortoise = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transTortoise'); redtortoise.tint =  0xE32424; redtortoise.scale.setTo(spriteScaleX, spriteScaleY); redtortoise.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(tortoiseFlag == 1 && pinkFlag == 1){var pinktortoise = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transTortoise'); pinktortoise.tint =  0xCC3ACC; pinktortoise.scale.setTo(spriteScaleX, spriteScaleY); pinktortoise.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(tortoiseFlag == 1 && cyanFlag == 1){var cyantortoise = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transTortoise'); cyantortoise.tint =  0x45C1C1; cyantortoise.scale.setTo(spriteScaleX, spriteScaleY); cyantortoise.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //tree    
                    if(tigerFlag == 1 && greenFlag == 1 ){var greentree = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transTree');greentree.tint =  0x51C735; greentree.scale.setTo(spriteScaleX, spriteScaleY); 
greentree.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(tigerFlag == 1 && blueFlag == 1){console.log("bluetree plotted");var bluetree = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transTree'); bluetree.tint =  0x456AC1; bluetree.scale.setTo(spriteScaleX, spriteScaleY); bluetree.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(tigerFlag == 1 && orangeFlag == 1){var orangetree = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transTree'); orangetree.tint =  0xF38932; orangetree.scale.setTo(spriteScaleX, spriteScaleY); orangetree.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(tigerFlag == 1 && redFlag == 1){var redtree = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transTree'); redtree.tint =  0xE32424; redtree.scale.setTo(spriteScaleX, spriteScaleY); redtree.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(tigerFlag == 1 && pinkFlag == 1){var pinktree = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transTree'); pinktree.tint =  0xCC3ACC; pinktree.scale.setTo(spriteScaleX, spriteScaleY); pinktree.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(tigerFlag == 1 && cyanFlag == 1){var cyantree = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transTree'); cyantree.tint =  0x45C1C1; cyantree.scale.setTo(spriteScaleX, spriteScaleY); cyantree.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //truck    
                    if(truckFlag == 1 && greenFlag == 1 ){var greentruck = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transTruck');greentruck.tint =  0x51C735; greentruck.scale.setTo(spriteScaleX, spriteScaleY); 
greentruck.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(truckFlag == 1 && blueFlag == 1){console.log("bluetruck plotted");var bluetruck = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transTruck'); bluetruck.tint =  0x456AC1; bluetruck.scale.setTo(spriteScaleX, spriteScaleY); bluetruck.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(truckFlag == 1 && orangeFlag == 1){var orangetruck = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transTruck'); orangetruck.tint =  0xF38932; orangetruck.scale.setTo(spriteScaleX, spriteScaleY); orangetruck.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(truckFlag == 1 && redFlag == 1){var redtruck = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transTruck'); redtruck.tint =  0xE32424; redtruck.scale.setTo(spriteScaleX, spriteScaleY); redtruck.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(truckFlag == 1 && pinkFlag == 1){var pinktruck = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transTruck'); pinktruck.tint =  0xCC3ACC; pinktruck.scale.setTo(spriteScaleX, spriteScaleY); pinktruck.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(truckFlag == 1 && cyanFlag == 1){var cyantruck = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transTruck'); cyantruck.tint =  0x45C1C1; cyantruck.scale.setTo(spriteScaleX, spriteScaleY); cyantruck.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
            //tv 
                    if(tvFlag == 1 && greenFlag == 1 ){var greentv = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y,'transTV');greentv.tint =  0x51C735; greentv.scale.setTo(spriteScaleX, spriteScaleY); 
greentv.anchor.setTo(0.6, 0.6);stickSound.play(); }
                    
                    
                    if(tvFlag == 1 && blueFlag == 1){console.log("bluetv plotted");var bluetv = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transTV'); bluetv.tint =  0x456AC1; bluetv.scale.setTo(spriteScaleX, spriteScaleY); bluetv.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(tvFlag == 1 && orangeFlag == 1){var orangetv = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transTV'); orangetv.tint =  0xF38932; orangetv.scale.setTo(spriteScaleX, spriteScaleY); orangetv.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(tvFlag == 1 && redFlag == 1){var redtv = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transTV'); redtv.tint =  0xE32424; redtv.scale.setTo(spriteScaleX, spriteScaleY); redtv.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(tvFlag == 1 && pinkFlag == 1){var pinktv = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transTV'); pinktv.tint =  0xCC3ACC; pinktv.scale.setTo(spriteScaleX, spriteScaleY); pinktv.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}
                    
                    
                    if(tvFlag == 1 && cyanFlag == 1){var cyantv = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'transTV'); cyantv.tint =  0x45C1C1; cyantv.scale.setTo(spriteScaleX, spriteScaleY); cyantv.anchor.setTo(spriteAnchorX, spriteAnchorY);stickSound.play();}

            
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
            
            game.world.bringToTop(tLetter);
            
            game.world.bringToTop(blue);
            game.world.bringToTop(green);
            game.world.bringToTop(red);
            game.world.bringToTop(cyan);
            game.world.bringToTop(orange);
            game.world.bringToTop(pink);
            
            game.world.bringToTop(cloud1);
            game.world.bringToTop(cloud2);
            game.world.bringToTop(cloud3);
            
            game.world.bringToTop(table);
            game.world.bringToTop(tap);
            game.world.bringToTop(telescope);
            game.world.bringToTop(tent);
            game.world.bringToTop(tie);
            game.world.bringToTop(tiger);
            game.world.bringToTop(tortoise);
            game.world.bringToTop(tree);
            game.world.bringToTop(truck);
            game.world.bringToTop(tv);
            
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
            
            
            
            if(tableFlag == 1){table.angle += 2;}
            if(tapFlag == 1){tap.angle += 2;}
            if(telescopeFlag == 1){telescope.angle += 2;}
            if(tentFlag == 1){tent.angle += 2;}
            if(tieFlag == 1){tie.angle += 2;}
            if(treeFlag == 1){tiger.angle += 2;}
            if(tortoiseFlag == 1){tortoise.angle += 2;}
            if(tigerFlag == 1){tree.angle += 2;}
            if(truckFlag == 1){truck.angle += 2;}
            if(tvFlag == 1){tv.angle += 2;}
            
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
            
            if(tObjectClicked == 10){
            
                askForLevelU = 1;
                game.uButton = game.add.sprite(1170, 730, 'uButton');             
                game.uButton.scale.setTo(1, 1); 
                game.uButton.anchor.setTo(spriteAnchorX, spriteAnchorY);
                
            }
            
        if(askForLevelU == 1){
            
            game.world.bringToTop(game.uButton);
            game.uButton.inputEnabled = true;
            game.uButton.events.onInputDown.add(onDownU, this);
            function onDownU() {
            
                //start next level
                
                this.setTGlobalVaribalesToZero();
                game.state.start('U');
                
            }
        }
           
        },
        
        resetTSpriteFlag: function(){
            
            tableFlag = 0;tapFlag = 0;telescopeFlag = 0;treeFlag = 0;tentFlag = 0;
            tieFlag = 0;tortoiseFlag = 0;tigerFlag = 0;truckFlag = 0;tvFlag = 0;
            camelFlag = 0;candleFlag = 0;carFlag = 0;catFlag = 0;cheeseFlag = 0;cherryFlag = 0;
            clockFlag = 0;cowFlag = 0;crabFlag = 0;crownFlag = 0;

            table.angle = 0;tap.angle = 0;telescope.angle = 0;tiger.angle = 0;tent.angle = 0;
            tie.angle = 0;tortoise.angle = 0;tree.angle = 0;truck.angle = 0;tv.angle = 0;
            camel.angle = 0;candle.angle = 0;car.angle = 0;cat.angle = 0;cheese.angle = 0;
            cherry.angle = 0;crown.angle = 0;clock.angle = 0;cow.angle = 0;crab.angle = 0;
           
        },
       
        setColorTFlagToZero: function(){
            
            bubbleSound.play(); blueFlag = 0;greenFlag = 0; redFlag = 0; cyanFlag = 0; pinkFlag = 0; orangeFlag = 0;
        },
        
        setTGlobalVaribalesToZero: function(){
            
            
            tableFlag = 0;tapFlag = 0;telescopeFlag = 0;treeFlag = 0;tentFlag = 0;
            tieFlag = 0;tortoiseFlag = 0;tigerFlag = 0;truckFlag = 0;tvFlag = 0;
            camelFlag = 0;candleFlag = 0;carFlag = 0;catFlag = 0;cheeseFlag = 0;cherryFlag = 0;
            clockFlag = 0;cowFlag = 0;crabFlag = 0;crownFlag = 0;



            greenFlag = 0;blueFlag = 0;orangeFlag = 0;redFlag = 0;pinkFlag = 0;cyanFlag = 0;
        }
        
        
    };