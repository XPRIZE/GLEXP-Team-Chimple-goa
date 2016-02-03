    
    var ObjectClicked = 0;
    var askForNextLevel = 0;
    var objectClickedFlag = 0;
    var colorClickedFlag = 0;
    var objectClickedName;
    var objectClickedTrans;
    var colorClickedCode = "";
    var wrongObjectClicked ;
    var id; 
    var wrongId;
    var levelCounter = 0; 
    var filler = 0;
    var volumeFlag = 1;
    

    var D = {

        preload: function () {

            //setting default path for assets to be used in game
            
            this.load.path = "";
            
           
            this.rightPath = dPath;
            this.wrongPath = yPath;
            
            this.bgLetter = dLetter;
            
            this.Button = eButton;
            
            this.nextLevel = 'E';
            
            //loading right objects
            for(var i=0;i<10;i++){
                
                this.load.image(dCollection[i].trans, this.rightPath + dCollection[i].trans + imageExtension);
                this.load.image(dCollection[i].name,this.rightPath + dCollection[i].name + imageExtension);
                
            }
            
            //loading other assets
            this.load.image(box,commonAssets +  box + imageExtension);
            this.load.image(bar,commonAssets +  bar + imageExtension);
            this.load.image("timeBar",commonAssets +  "timeBar" + imageExtension);
            this.load.image("shadow",this.rightPath +  "shadow" + imageExtension);
            this.load.image("volume",commonAssets +  "volume" + imageExtension);
            this.load.image("mute",commonAssets +  "mute" + imageExtension);
            
            //loading assets for the level  
            this.load.image("bg", this.rightPath +  "bg" + imageExtension);
            this.load.image(this.bgLetter,this.rightPath +  this.bgLetter + imageExtension);
            this.load.image(this.Button,this.rightPath +  this.Button + imageExtension);
      
            
            //loading wrong objects
          
            for(var i=0;i<10;i++){
                
                this.load.image(yCollection[i].trans, this.wrongPath + yCollection[i].trans + imageExtension);  
                this.load.image(yCollection[i].name, this.wrongPath + yCollection[i].name + imageExtension);
            }
            
            
            this.load.image(cloud,commonAssets +  cloud + imageExtension);

            
            //loading sounds
            this.load.audio(waterBurst, commonAssets +  waterBurst + audioExtension);
            this.load.audio(bubble,commonAssets +   bubble + audioExtension);
            this.load.audio(stick, commonAssets +   stick + audioExtension);
            this.load.audio("gameFace", commonAssets +   "gameFace" + audioExtension);
          
        },

        create: function () {

            
           
            game.input.mouse.capture = True;


            //Adding audio
            waterBurstSound = game.add.audio(waterBurst);
            bubbleSound = game.add.audio(bubble);
            stickSound = game.add.audio(stick);
            gameFace =  game.add.audio("gameFace");
            gameFace.loop = True;
            gameFace.play();
            
            
            //Adding progess bar
            timeBarx = game.add.image(timeBarPosition.x  , timeBarPosition.y, "timeBar");
            
            //Filling time bar
            this.timeBox = [];
            for(var i =0; i<10 ; i++){
                
                this.timeBox[i] = game.add.image(progressBarPosition[i].x  , progressBarPosition[i].y, bar);
            }
            
            //Adding images 
            bgx = game.add.image(gameMinWidth, gameMinHeight,  "bg");
                
            
            //Main letter 
            Letter = game.add.sprite(gameMinWidth, gameMinHeight, this.bgLetter);
            /*Letter.inputEnabled = True;
            Letter.events.onInputDown.add(this.onDownLetter, this);
            */
            
            shadow = game.add.sprite(gameMinWidth + 810, gameMinHeight + 520, "shadow");
            shadow.anchor.setTo(spriteAnchorX, spriteAnchorY);
            shadow.scale.setTo(1, 1);
            shadow.inputEnabled = True;
            shadow.events.onInputDown.add(this.onDownLetter, this);
            
            volume = game.add.sprite(gameMinWidth + 1230, gameMinHeight + 50, "volume");
            volume.anchor.setTo(spriteAnchorX, spriteAnchorY);
            volume.scale.setTo(1, 1);
            volume.inputEnabled = True;
            volume.events.onInputDown.add(onDownVolume, this);
            function onDownVolume(){volumeFlag = 0; gameFace.pause();}
            
            mute = game.add.sprite(gameMinWidth + 1230, gameMinHeight + 50, "mute");
            mute.anchor.setTo(spriteAnchorX, spriteAnchorY);
            mute.scale.setTo(1, 1);
            mute.inputEnabled = True;
            mute.events.onInputDown.add(onDownMute, this);
            function onDownMute(){volumeFlag = 1; gameFace.resume();}
            
            
            //Objects starting 
                        
            cloud1 = game.add.image(gameMinWidth+445, gameMinHeight+101, cloud);
            cloud1.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cloud1.scale.setTo(cloudScale,cloudScale);
            cloud1.tint = greyColor;
            
            game.add.tween(cloud1).to( {x:1190, y:94}, 30000, Phaser.Easing.Linear.None, True, 0, 1000, True);
            
            
            cloud2 = game.add.image(gameMinWidth+494, gameMinHeight+69, cloud);
            cloud2.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cloud2.scale.setTo(cloudScale, cloudScale);
            cloud2.tint = greyColor;
            game.add.tween(cloud2).to( {x:700, y: 69}, 30000, Phaser.Easing.Linear.None, True, 0, 1000, False);
            
            cloud3 = game.add.image(gameMinWidth+936, gameMinHeight+93, cloud);
            cloud3.anchor.setTo(spriteAnchorX, spriteAnchorY);
            cloud3.scale.setTo(cloudScale, cloudScale);
            cloud3.tint = greyColor;
            game.add.tween(cloud3).to( {x:1190, y:94}, 8000, Phaser.Easing.Linear.None, True, 0, 1000, True);
        
            
            this.randomizeObjects();
            
                    },
        
        randomArrayFromInterval: function (noOfValues,domainRange) {
            
            var arr = [];
            while(arr.length < noOfValues){
                
                
                var randomnumber=Math.ceil(Math.random() * domainRange);
                randomnumber -= 1;
                var found=False;
                for(var i=0;i<arr.length;i++){
	               
                    if(arr[i]==randomnumber){found=True;break}
                }
                if(!found)arr[arr.length]=randomnumber;
            }
           
            return arr;
        },
        
        randomizeObjects: function() {
            
            var randomObjectArray = this.randomArrayFromInterval(5,10);
            var randomPositionArray = this.randomArrayFromInterval(10,10);
            var randomColorArray = this.randomArrayFromInterval(6,6);
            
            this.rightTrans = [];
            
            this.rightTrans[0] = game.add.sprite(objectsPosition[randomPositionArray[0]].x,objectsPosition[randomPositionArray[0]].y, dCollection[randomObjectArray[0]].trans);
            this.rightTrans[0].anchor.setTo(spriteAnchorX, spriteAnchorY);
            this.rightTrans[0].scale.setTo(spriteScaleX, spriteScaleY);
          
            
            this.rightTrans[1] = game.add.sprite(objectsPosition[randomPositionArray[1]].x,objectsPosition[randomPositionArray[1]].y, dCollection[randomObjectArray[1]].trans);
            this.rightTrans[1].anchor.setTo(spriteAnchorX, spriteAnchorY);
            this.rightTrans[1].scale.setTo(spriteScaleX, spriteScaleY);
          
            
            this.rightTrans[2] = game.add.sprite(objectsPosition[randomPositionArray[2]].x,objectsPosition[randomPositionArray[2]].y, dCollection[randomObjectArray[2]].trans);
            this.rightTrans[2].anchor.setTo(spriteAnchorX, spriteAnchorY);
            this.rightTrans[2].scale.setTo(spriteScaleX, spriteScaleY);
          
            
            this.rightTrans[3] = game.add.sprite(objectsPosition[randomPositionArray[3]].x,objectsPosition[randomPositionArray[3]].y, dCollection[randomObjectArray[3]].trans);
            this.rightTrans[3].anchor.setTo(spriteAnchorX, spriteAnchorY);
            this.rightTrans[3].scale.setTo(spriteScaleX, spriteScaleY);
          
            
            this.rightTrans[4] = game.add.sprite(objectsPosition[randomPositionArray[4]].x,objectsPosition[randomPositionArray[4]].y, dCollection[randomObjectArray[4]].trans);
            this.rightTrans[4].anchor.setTo(spriteAnchorX, spriteAnchorY);
            this.rightTrans[4].scale.setTo(spriteScaleX, spriteScaleY);
          
            
            
            this.rightObjects = [];
            
            
            
            this.rightObjects[0] = game.add.sprite(objectsPosition[randomPositionArray[0]].x,objectsPosition[randomPositionArray[0]].y, dCollection[randomObjectArray[0]].name);
            this.rightObjects[0].x = objectsPosition[randomPositionArray[0]].x;
            this.rightObjects[0].y = objectsPosition[randomPositionArray[0]].y;
            this.rightObjects[0].name = dCollection[randomObjectArray[0]].name;
            this.rightObjects[0].trans = dCollection[randomObjectArray[0]].trans;
            this.rightObjects[0].anchor.setTo(spriteAnchorX, spriteAnchorY);
            this.rightObjects[0].scale.setTo(spriteScaleX, spriteScaleY);
            this.rightObjects[0].inputEnabled = True;
            this.rightObjects[0].events.onInputDown.add(onDownZero, this);
            function onDownZero() {this.resetSpriteFlag(); this.clearActiveFlags(); this.setColorFlagToZero(); this.colorBoxes[0].flag = 1 ; this.rightObjects[0].flag = 1; ObjectClicked++;  id = 0;}
            
            
            
            
            this.rightObjects[1] = game.add.sprite(objectsPosition[randomPositionArray[1]].x,objectsPosition[randomPositionArray[1]].y, dCollection[randomObjectArray[1]].name);
            this.rightObjects[1].x = objectsPosition[randomPositionArray[1]].x;
            this.rightObjects[1].y = objectsPosition[randomPositionArray[1]].y;
            this.rightObjects[1].name = dCollection[randomObjectArray[1]].name;
            this.rightObjects[1].trans = dCollection[randomObjectArray[1]].trans;
            this.rightObjects[1].anchor.setTo(spriteAnchorX, spriteAnchorY);
            this.rightObjects[1].scale.setTo(spriteScaleX, spriteScaleY);
            this.rightObjects[1].inputEnabled = True;
            this.rightObjects[1].events.onInputDown.add(onDownOne, this);
            function onDownOne() {this.resetSpriteFlag(); this.clearActiveFlags(); this.setColorFlagToZero(); this.colorBoxes[1].flag = 1 ;this.rightObjects[1].flag = 1; ObjectClicked++;  id = 1;}
            
            
            this.rightObjects[2] = game.add.sprite(objectsPosition[randomPositionArray[2]].x,objectsPosition[randomPositionArray[2]].y, dCollection[randomObjectArray[2]].name);
            this.rightObjects[2].x = objectsPosition[randomPositionArray[2]].x;
            this.rightObjects[2].y = objectsPosition[randomPositionArray[2]].y;
            this.rightObjects[2].name = dCollection[randomObjectArray[2]].name;
            this.rightObjects[2].trans = dCollection[randomObjectArray[2]].trans;
            this.rightObjects[2].anchor.setTo(spriteAnchorX, spriteAnchorY);
            this.rightObjects[2].scale.setTo(spriteScaleX, spriteScaleY);
            this.rightObjects[2].inputEnabled = True;
            this.rightObjects[2].events.onInputDown.add(onDownTwo, this);
            function onDownTwo() {this.resetSpriteFlag(); this.clearActiveFlags(); this.setColorFlagToZero(); this.colorBoxes[2].flag = 1 ; this.rightObjects[2].flag = 1; ObjectClicked++;   id = 2;}
            
            
            this.rightObjects[3] = game.add.sprite(objectsPosition[randomPositionArray[3]].x,objectsPosition[randomPositionArray[3]].y, dCollection[randomObjectArray[3]].name);
            this.rightObjects[3].x = objectsPosition[randomPositionArray[3]].x;
            this.rightObjects[3].y = objectsPosition[randomPositionArray[3]].y;
            this.rightObjects[3].name = dCollection[randomObjectArray[3]].name;
            this.rightObjects[3].trans = dCollection[randomObjectArray[3]].trans;
            this.rightObjects[3].anchor.setTo(spriteAnchorX, spriteAnchorY);
            this.rightObjects[3].scale.setTo(spriteScaleX, spriteScaleY);
            this.rightObjects[3].inputEnabled = True;
            this.rightObjects[3].events.onInputDown.add(onDownThree, this);
            function onDownThree() {this.resetSpriteFlag(); this.clearActiveFlags(); this.setColorFlagToZero(); this.colorBoxes[3].flag = 1 ; this.rightObjects[3].flag = 1; ObjectClicked++;  id = 3;}
            
            
            this.rightObjects[4] = game.add.sprite(objectsPosition[randomPositionArray[4]].x,objectsPosition[randomPositionArray[4]].y, dCollection[randomObjectArray[4]].name);
            this.rightObjects[4].x = objectsPosition[randomPositionArray[4]].x;
            this.rightObjects[4].y = objectsPosition[randomPositionArray[4]].y;
            this.rightObjects[4].name = dCollection[randomObjectArray[4]].name;
            this.rightObjects[4].trans = dCollection[randomObjectArray[4]].trans;
            this.rightObjects[4].anchor.setTo(spriteAnchorX, spriteAnchorY);
            this.rightObjects[4].scale.setTo(spriteScaleX, spriteScaleY);
            this.rightObjects[4].inputEnabled = True;
            this.rightObjects[4].events.onInputDown.add(onDownFour, this);
            function onDownFour() {this.resetSpriteFlag(); this.clearActiveFlags(); this.setColorFlagToZero(); this.colorBoxes[4].flag = 1 ; this.rightObjects[4].flag = 1; ObjectClicked++; id = 4; }
            
            
            
            
            
            
             ///Adding wrong onjects transparent images
            
            this.wrongTrans = [];
            
            this.wrongTrans[5] = game.add.sprite(objectsPosition[randomPositionArray[5]].x,objectsPosition[randomPositionArray[5]].y, yCollection[randomObjectArray[0]].trans);
            this.wrongTrans[5].anchor.setTo(spriteAnchorX, spriteAnchorY);
            this.wrongTrans[5].scale.setTo(spriteScaleX, spriteScaleY);
            
            
            this.wrongTrans[6] = game.add.sprite(objectsPosition[randomPositionArray[6]].x,objectsPosition[randomPositionArray[6]].y, yCollection[randomObjectArray[1]].trans);
            this.wrongTrans[6].anchor.setTo(spriteAnchorX, spriteAnchorY);
            this.wrongTrans[6].scale.setTo(spriteScaleX, spriteScaleY);
            
            
            this.wrongTrans[7] = game.add.sprite(objectsPosition[randomPositionArray[7]].x,objectsPosition[randomPositionArray[7]].y, yCollection[randomObjectArray[2]].trans);
            this.wrongTrans[7].anchor.setTo(spriteAnchorX, spriteAnchorY);
            this.wrongTrans[7].scale.setTo(spriteScaleX, spriteScaleY);
            
            
            this.wrongTrans[8] = game.add.sprite(objectsPosition[randomPositionArray[8]].x,objectsPosition[randomPositionArray[8]].y, yCollection[randomObjectArray[3]].trans);
            this.wrongTrans[8].anchor.setTo(spriteAnchorX, spriteAnchorY);
            this.wrongTrans[8].scale.setTo(spriteScaleX, spriteScaleY);
            
            
            this.wrongTrans[9] = game.add.sprite(objectsPosition[randomPositionArray[9]].x,objectsPosition[randomPositionArray[9]].y, yCollection[randomObjectArray[4]].trans);
            this.wrongTrans[9].anchor.setTo(spriteAnchorX, spriteAnchorY);
            this.wrongTrans[9].scale.setTo(spriteScaleX, spriteScaleY);
            
            
            
            
            
            this.wrongObjects = [];
          
            this.wrongObjects[5] =  game.add.sprite(objectsPosition[randomPositionArray[5]].x, objectsPosition[randomPositionArray[5]].y, yCollection[randomObjectArray[0]].name);
                
            this.wrongObjects[5].x = objectsPosition[randomPositionArray[5]].x;
            this.wrongObjects[5].y = objectsPosition[randomPositionArray[5]].y;
            this.wrongObjects[5].name = yCollection[randomObjectArray[0]].name;
            this.wrongObjects[5].trans = yCollection[randomObjectArray[0]].trans;
            this.wrongObjects[5].anchor.setTo(spriteAnchorX, spriteAnchorY);
            this.wrongObjects[5].scale.setTo(spriteScaleX, spriteScaleY);
            this.wrongObjects[5].inputEnabled = True;
            this.wrongObjects[5].events.onInputDown.add(onDownFive, this);
            function onDownFive() {this.resetSpriteFlag(); this.wrongObjects[5].flag = 1; id = 5;bubbleSound.play();}
            
            this.wrongObjects[6] =  game.add.sprite(objectsPosition[randomPositionArray[6]].x, objectsPosition[randomPositionArray[6]].y, yCollection[randomObjectArray[1]].name);
                
            this.wrongObjects[6].x = objectsPosition[randomPositionArray[6]].x;
            this.wrongObjects[6].y = objectsPosition[randomPositionArray[6]].y;
            this.wrongObjects[6].name = yCollection[randomObjectArray[1]].name;
            this.wrongObjects[6].trans = yCollection[randomObjectArray[1]].trans;
            this.wrongObjects[6].anchor.setTo(spriteAnchorX, spriteAnchorY);
            this.wrongObjects[6].scale.setTo(spriteScaleX, spriteScaleY);
            this.wrongObjects[6].inputEnabled = True;
            this.wrongObjects[6].events.onInputDown.add(onDownSix, this);
            function onDownSix() {this.resetSpriteFlag(); this.wrongObjects[6].flag = 1; id = 6;bubbleSound.play();}
            
            
            this.wrongObjects[7] =  game.add.sprite(objectsPosition[randomPositionArray[7]].x, objectsPosition[randomPositionArray[7]].y, yCollection[randomObjectArray[2]].name);
                
            this.wrongObjects[7].x = objectsPosition[randomPositionArray[7]].x;
            this.wrongObjects[7].y = objectsPosition[randomPositionArray[7]].y;
            this.wrongObjects[7].name = yCollection[randomObjectArray[2]].name;
            this.wrongObjects[7].trans = yCollection[randomObjectArray[2]].trans;
            this.wrongObjects[7].anchor.setTo(spriteAnchorX, spriteAnchorY);
            this.wrongObjects[7].scale.setTo(spriteScaleX, spriteScaleY);
            this.wrongObjects[7].inputEnabled = True;
            this.wrongObjects[7].events.onInputDown.add(onDownSeven, this);
            function onDownSeven() {this.resetSpriteFlag(); this.wrongObjects[7].flag = 1; id = 7;bubbleSound.play();}
            
            
            this.wrongObjects[8] =  game.add.sprite(objectsPosition[randomPositionArray[8]].x, objectsPosition[randomPositionArray[8]].y, yCollection[randomObjectArray[3]].name);
                
            this.wrongObjects[8].x = objectsPosition[randomPositionArray[8]].x;
            this.wrongObjects[8].y = objectsPosition[randomPositionArray[8]].y;
            this.wrongObjects[8].name = yCollection[randomObjectArray[3]].name;
            this.wrongObjects[8].trans = yCollection[randomObjectArray[3]].trans;
            this.wrongObjects[8].anchor.setTo(spriteAnchorX, spriteAnchorY);
            this.wrongObjects[8].scale.setTo(spriteScaleX, spriteScaleY);
            this.wrongObjects[8].inputEnabled = True;
            this.wrongObjects[8].events.onInputDown.add(onDownEight, this);
            function onDownEight() {this.resetSpriteFlag(); this.wrongObjects[8].flag = 1; id = 8;bubbleSound.play();}
            
            
            this.wrongObjects[9] =  game.add.sprite(objectsPosition[randomPositionArray[9]].x, objectsPosition[randomPositionArray[9]].y, yCollection[randomObjectArray[4]].name);
                
            this.wrongObjects[9].x = objectsPosition[randomPositionArray[9]].x;
            this.wrongObjects[9].y = objectsPosition[randomPositionArray[9]].y;
            this.wrongObjects[9].name = yCollection[randomObjectArray[4]].name;
            this.wrongObjects[9].trans = yCollection[randomObjectArray[4]].trans;
            this.wrongObjects[9].anchor.setTo(spriteAnchorX, spriteAnchorY);
            this.wrongObjects[9].scale.setTo(spriteScaleX, spriteScaleY);
            this.wrongObjects[9].inputEnabled = True;
            this.wrongObjects[9].events.onInputDown.add(onDownNine, this);
            function onDownNine() {this.resetSpriteFlag(); this.wrongObjects[9].flag = 1; id = 9;bubbleSound.play();}
            
            
            
            
           
            
            //Adding boxes
            
            
            
            this.colorBoxes = [];
       
            this.colorBoxes[0] = game.add.sprite(objectsPosition[randomPositionArray[0]].x,objectsPosition[randomPositionArray[0]].y, box);
            this.colorBoxes[0].anchor.setTo(spriteAnchorX, spriteAnchorY);
            this.colorBoxes[0].scale.setTo(boxScale, boxScale);
            this.colorBoxes[0].tint = colorObjects[randomColorArray[0]].code;
            this.colorBoxes[0].name = colorObjects[randomColorArray[0]].name;    
            
            
            this.colorBoxes[1] = game.add.sprite(objectsPosition[randomPositionArray[1]].x,objectsPosition[randomPositionArray[1]].y, box);
            this.colorBoxes[1].anchor.setTo(spriteAnchorX, spriteAnchorY);
            this.colorBoxes[1].scale.setTo(boxScale, boxScale);
            this.colorBoxes[1].tint = colorObjects[randomColorArray[1]].code;
            this.colorBoxes[1].name = colorObjects[randomColorArray[1]].name;    
            
            
            this.colorBoxes[2] = game.add.sprite(objectsPosition[randomPositionArray[2]].x,objectsPosition[randomPositionArray[2]].y, box);
            this.colorBoxes[2].anchor.setTo(spriteAnchorX, spriteAnchorY);
            this.colorBoxes[2].scale.setTo(boxScale, boxScale);
            this.colorBoxes[2].tint = colorObjects[randomColorArray[2]].code;
            this.colorBoxes[2].name = colorObjects[randomColorArray[2]].name;    
            
            
            this.colorBoxes[3] = game.add.sprite(objectsPosition[randomPositionArray[3]].x,objectsPosition[randomPositionArray[3]].y, box);
            this.colorBoxes[3].anchor.setTo(spriteAnchorX, spriteAnchorY);
            this.colorBoxes[3].scale.setTo(boxScale, boxScale);
            this.colorBoxes[3].tint = colorObjects[randomColorArray[3]].code;
            this.colorBoxes[3].name = colorObjects[randomColorArray[3]].name;    
            
            
            this.colorBoxes[4] = game.add.sprite(objectsPosition[randomPositionArray[4]].x,objectsPosition[randomPositionArray[4]].y, box);
            this.colorBoxes[4].anchor.setTo(spriteAnchorX, spriteAnchorY);
            this.colorBoxes[4].scale.setTo(boxScale, boxScale);
            this.colorBoxes[4].tint = colorObjects[randomColorArray[4]].code;
            this.colorBoxes[4].name = colorObjects[randomColorArray[4]].name;    
            
            
            this.colorBoxes[5] = game.add.sprite(objectsPosition[randomPositionArray[5]].x,objectsPosition[randomPositionArray[5]].y, box);
            this.colorBoxes[5].anchor.setTo(spriteAnchorX, spriteAnchorY);
            this.colorBoxes[5].scale.setTo(boxScale, boxScale);
            this.colorBoxes[5].tint = colorObjects[randomColorArray[5]].code;
            this.colorBoxes[5].name = colorObjects[randomColorArray[5]].name;    
            
            
            this.colorBoxes[6] = game.add.sprite(objectsPosition[randomPositionArray[6]].x,objectsPosition[randomPositionArray[6]].y, box);
            this.colorBoxes[6].anchor.setTo(spriteAnchorX, spriteAnchorY);
            this.colorBoxes[6].scale.setTo(boxScale, boxScale);
            this.colorBoxes[6].tint = colorObjects[randomColorArray[0]].code;
            this.colorBoxes[6].name = colorObjects[randomColorArray[0]].name;    
            
            
            this.colorBoxes[7] = game.add.sprite(objectsPosition[randomPositionArray[7]].x,objectsPosition[randomPositionArray[7]].y, box);
            this.colorBoxes[7].anchor.setTo(spriteAnchorX, spriteAnchorY);
            this.colorBoxes[7].scale.setTo(boxScale, boxScale);
            this.colorBoxes[7].tint = colorObjects[randomColorArray[1]].code;
            this.colorBoxes[7].name = colorObjects[randomColorArray[1]].name;    
            
            
            this.colorBoxes[8] = game.add.sprite(objectsPosition[randomPositionArray[8]].x,objectsPosition[randomPositionArray[8]].y, box);
            this.colorBoxes[8].anchor.setTo(spriteAnchorX, spriteAnchorY);
            this.colorBoxes[8].scale.setTo(boxScale, boxScale);
            this.colorBoxes[8].tint = colorObjects[randomColorArray[2]].code;
            this.colorBoxes[8].name = colorObjects[randomColorArray[2]].name;    
            
            
            this.colorBoxes[9] = game.add.sprite(objectsPosition[randomPositionArray[9]].x,objectsPosition[randomPositionArray[9]].y, box);
            this.colorBoxes[9].anchor.setTo(spriteAnchorX, spriteAnchorY);
            this.colorBoxes[9].scale.setTo(boxScale, boxScale);
            this.colorBoxes[9].tint = colorObjects[randomColorArray[3]].code;
            this.colorBoxes[9].name = colorObjects[randomColorArray[3]].name;    
            
        },
        
        onDownLetter: function() {
                
            for(var i = 0;i<10;i++){
                
                if(this.colorBoxes[i].flag == 1){
                    
                     colorClickedFlag = 1;
                     colorClickedCode = this.colorBoxes[i].tint;
                     break;
                }
            }
            
            for(var i = 5;i<10;i++){
                
                if(this.wrongObjects[i].flag == 1){
                    
                    wrongObjectClicked = 1;
                    objectClickedName = this.wrongObjects[i].name;
                    objectClickedTrans = this.wrongObjects[i].trans;
                     break;
                }
            }
            
            
            
            for(var i = 0;i<5;i++){
                
                if(this.rightObjects[i].flag == 1){
                        
                     
                     objectClickedFlag = 1;
                     objectClickedName = this.rightObjects[i].name;
                     objectClickedTrans = this.rightObjects[i].trans;
                    
                     break;
                }
            }
         
            
                    if(colorClickedFlag == 1 && objectClickedFlag == 1 ){var object = game.add.sprite(game.input.x, game.input.y,objectClickedTrans);object.tint =  colorClickedCode; object.scale.setTo(spriteScaleX, spriteScaleY); 
object.anchor.setTo(paintObjectAnchorX, paintObjectAnchorY);stickSound.play();
                                                                          
                                                    if(filler < 10){ levelCounter++;
                                                                         this.timeBox[filler++].tint = redColor;  
                                                                        }
                                                                         this.clearActiveFlags();             
                             
                                                                         this.randomizeObjects();
                                                                        }
            //For Wrong Objects
            
if(wrongObjectClicked == 1){
    
                    object = game.add.sprite(game.input.x, game.input.y,objectClickedName); object.scale.setTo(spriteScaleX, spriteScaleY); 
object.anchor.setTo(paintObjectAnchorX, paintObjectAnchorY);stickSound.play();                        
    
    	this.tween = game.add.tween(object).to( { y:  game.input.y + 1000 }, 4000, Phaser.Easing.Linear.None, True);
    this.tween.onComplete.add(killIt, this);
    function killIt(){object.kill();}
    this.randomizeObjects();
                            this.clearActiveFlags();
                                    }
                    
            
        },
        clearActiveFlags: function(){
        
            objectClickedFlag = 0;
            colorClickedFlag = 0;
            objectClickedName = "";
            objectClickedTrans = "";
            colorClickedCode = "";
            wrongObjectClicked = 0;   
            id= null;
            wrongId = null;
    
    },    
        update: function () {
            
            game.world.bringToTop(shadow);
            
            game.world.bringToTop(Letter);
           
            for(var i = 0; i < 10 ; i++){game.world.bringToTop(this.colorBoxes[i]);}
          
            game.world.bringToTop(cloud1);  
            game.world.bringToTop(cloud2);
            game.world.bringToTop(cloud3);
           
            
            for(var i =0; i < 5 ; i++){if(i != id){game.world.bringToTop(this.rightObjects[i]);}else{game.world.bringToTop(this.rightTrans[id]);}}
            
            
            for(var i =5; i < 10 ; i++){if(i != id){game.world.bringToTop(this.wrongObjects[i]);}else{game.world.bringToTop(this.wrongTrans[id]);}}
            
            
            
            
            for(var i =0; i<10 ; i++){game.world.bringToTop(this.timeBox[i]);}
            
            game.world.bringToTop(timeBarx);
           
            if(levelCounter >= 10){
            
                askForNextLevel = 1;
                game.nextButton = game.add.sprite(1170, 730, this.Button);             
                game.nextButton.scale.setTo(1, 1); 
                game.nextButton.inputEnabled = True;
                game.nextButton.anchor.setTo(spriteAnchorX, spriteAnchorY);
                
            }
            
        if(askForNextLevel == 1){
            
            game.nextButton.events.onInputDown.add(onDownNext, this);
            function onDownNext() {
            
                //start next level
                
                this.setGlobalVaribalesToZero();
                gameFace.stop();
                game.state.start(this.nextLevel);
                
            }
        }
           if(volumeFlag == 0){
                game.world.bringToTop(mute);
            }else{
                game.world.bringToTop(volume);
            } 
            
        },
        
        resetSpriteFlag: function(){
            
            for(var i=0; i<5; i++){ this.rightObjects[i].flag = 0;}
            
            for(var i=5; i<10; i++){ this.wrongObjects[i].flag = 0;}
            
        },
       
        setColorFlagToZero: function(){
            
            bubbleSound.play(); 
            for(var i=0; i<10; i++){ this.colorBoxes[i].flag = 0;}
        },
        
        setGlobalVaribalesToZero: function(){
            
            
            ObjectClicked = 0;
            askForNextLevel = 0;
            objectClickedFlag = 0;
            colorClickedFlag = 0;
            objectClickedName= "";
            objectClickedTrans = "";
            colorClickedCode = "";
            wrongObjectClicked = 0;
            id = null; 
            wrongId = null;
            levelCounter = 0; 
            filler = 0;
            volumeFlag = 1;
            
            for(var i=0; i<5; i++){ this.rightObjects[i].flag = 0;}
            
            for(var i=5; i<10; i++){ this.wrongObjects[i].flag = 0;}
            
            for(var i=0; i<10; i++){ this.colorBoxes[i].flag = 0;}
        }
        
    };
