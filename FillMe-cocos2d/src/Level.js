
/// <reference path="../../cocos2d-typescript-definitions/cocos2d/cocos2d-lib.d.ts" />

var Level = cc.Layer.extend({
        // RTCollection, WRCollection, nextButton, nScene, RTNCollection, WRNCollection, nextNButton
   
    bg_image : null,
    latter_image : null,
    shadow_image : null,
    rightCollection : null,
    wrongCollection : null,
    Button : null,  
    ObjectClicked : null,
    askForNextLevel : 0,
    objectClickedFlag : null,
    colorClickedFlag : null,
    objectClickedName : null,
    objectClickedTrans : null,
    colorClickedCode : {r:null,g:null,b:null},
    wrongObjectClicked : null,
    id : null,
    wrongId : null,
    levelCounter : 0, 
    filler : 0,
    volumeFlag : 1,
    ctor:function (           
                              RTCollection, 
                              WRCollection, 
                              nextButton,
                              bgImage,
                              latterImage,
                              shadowImage,
                              shadowPosX,
                              shadowPosY,
                              scaleX,
                              scaleY
    ) {
        
        this._super();
     
        this.bg_image = bgImage;
        this.latter_image = latterImage;
        this.shadow_image = shadowImage;
        this.rightCollection = RTCollection;
        this.wrongCollection = WRCollection;
        this.Button = nextButton;
        
        
        
        this.scheduleUpdate();
        var size = cc.winSize;
        
       // this.gameFace = cc.audioEngine;
        //this.gameFace.playMusic(res.gameFace_mp3);
       //this.gameFace.resumeMusic();
        //this.gameFace.pauseMusic();
        
        
        this.timeBarx = new cc.Sprite(res.timeBar_png); 
        this.timeBarx.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
        this.timeBarx.setPosition(size.width*res.timeBarPosition.x , size.height*res.timeBarPosition.y); 
        //this.timeBarx.setScale(scale.x, scale.y);
        this.addChild(this.timeBarx);
        
        
        //Filling time bar
            this.timeBox = [];
            for(var i =0; i<10 ; i++){
                
                this.timeBox[i] = new cc.Sprite(res.bar_png);
                this.timeBox[i].setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY); 
                //this.timeBox[i].setScale(scale.x, scale.y); //changes made
                this.timeBox[i].setPosition(size.width*res.progressBarPosition[i].x  , size.height*res.progressBarPosition[i].y);
                this.addChild(this.timeBox[i]);    
        }
            
            
            //Adding images 
            this.bgx = new cc.Sprite(this.bg_image); //changes made
            this.bgx.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY); //changes made
            //this.bgx.setScale(scale.x + 0.03, scale.y + 0.03);  //changes made
            this.bgx.setPosition(size.width/2, size.height/2);
            this.addChild(this.bgx);
            
            
            //Main letter 
            this.Letter = new cc.Sprite(this.latter_image); //changes made
            this.Letter.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY); //changes made
            //this.Letter.setScale(scale.x + 0.03, scale.y + 0.03);  //changes made
            this.Letter.setPosition(size.width/2, size.height/2);
            this.addChild(this.Letter);
            
            this.shadow = new ClickableItem(this.shadow_image, "shadow", null, this);
            this.shadow.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY); //changes made
            this.shadow.setScale(scaleX, scaleY);  //changes made
            this.shadow.setPosition(size.width*shadowPosX, size.height*shadowPosY);
            // this.shadow.setPosition(size.width/2, size.height/2);
            this.shadow.color = new cc.color(255, 0, 0);
            this.addChild(this.shadow);
            
            
            // this.volume = new ClickableItem(res.volume_png, "volume", null, this);
            // this.volume.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY); //changes made
            // //this.volume.setScale(scale.x + 0.03, scale.y + 0.03);  //changes made
            // this.volume.setPosition(size.width*0.96, size.height*0.94);
            // this.addChild(this.volume, 10);
            
            
            // this.mute = new ClickableItem(res.mute_png, "mute", null,  this); //changes made
            // this.mute.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY); //changes made
            // //this.mute.setScale(scale.x + 0.03, scale.y + 0.03);  //changes made
            // this.mute.setPosition(size.width*0.96, size.height*0.94);
            // this.addChild(this.mute);
            
            
            
            //Objects starting 
                        
            this.cloud1 = new cc.Sprite(res.cloud_png); 
            this.cloud1.setPosition(size.width * 0.34, size.height * 0.88)           
            this.cloud1.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
            this.cloud1.setScale(0.3, 0.3);
            this.addChild(this.cloud1);
            this.cloud1.color = new cc.color(res.greyColor.r, res.greyColor.g, res.greyColor.b);
            this.cloud1Tween = cc.repeatForever(cc.sequence(
                cc.MoveTo.create(10,cc.p(size.width*0.92,size.height*0.89)),
                cc.MoveTo.create(10,cc.p(size.width*0.34,size.height*0.89))));
            this.cloud1.runAction(this.cloud1Tween);
            
            
            
            
            this.cloud2 = new cc.Sprite(res.cloud_png);
            this.cloud2.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
            this.cloud2.setPosition(size.width * 0.38, size.height * 0.92);
            this.cloud2.setScale(0.3, 0.3);
            this.addChild(this.cloud2);
            this.cloud2.color = new cc.color(res.greyColor.r, res.greyColor.g, res.greyColor.b);
            this.cloud2Tween = cc.repeatForever(cc.sequence(
                cc.MoveTo.create(10,cc.p(size.width*0.54,size.height*0.92)),
                cc.MoveTo.create(10,cc.p(size.width*0.38,size.height*0.92))
                ));
            this.cloud2.runAction(this.cloud2Tween);
            
            
            this.cloud3 = new cc.Sprite(res.cloud_png);
            this.cloud3.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
            this.cloud3.setPosition(size.width * 0.73, size.height * 0.89);
            this.addChild(this.cloud3);
            this.cloud3.setScale(0.3, 0.3);
            this.cloud3.color = new cc.color(res.greyColor.r, res.greyColor.g, res.greyColor.b);
            this.cloud3Tween = cc.repeatForever(cc.sequence(
                cc.MoveTo.create(10,cc.p(size.width*0.92,size.height*0.89)),
                cc.MoveTo.create(10,cc.p(size.width*0.73,size.height*0.89))
                ));
            this.cloud3.runAction(this.cloud3Tween);
            
            
            this.randomizeObjects();
            
            
       },
       
        randomizeObjects: function() {
            
            this.randomObjectArray = [];       
            this.randomPositionArray = [];
            this.randomColorArray = [];
            var size = cc.winSize;
            
            this.randomObjectArray = this.randomArrayFromInterval(5,10);
          
            this.randomPositionArray = this.randomArrayFromInterval(10,10);
            
          
            this.randomColorArray = this.randomArrayFromInterval(6,6);
            
            
            ///Adding right onjects transparent images
            
            this.rightTrans = [];
            
            this.rightTrans[0] = new cc.Sprite(this.rightCollection[this.randomObjectArray[0]].trans);
            this.rightTrans[0].setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
            this.rightTrans[0].setPosition(size.width * res.objectsPosition[this.randomPositionArray[0]].x, size.height * res.objectsPosition[this.randomPositionArray[0]].y);
            //this.rightTrans[0].scale.setTo(scale.x/4, scale.y/4);
            this.rightTrans[0].setScale(0.6, 0.6);
            this.addChild(this.rightTrans[0]);
            
          
            this.rightTrans[1] = new cc.Sprite(this.rightCollection[this.randomObjectArray[1]].trans);
            this.rightTrans[1].setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
            this.rightTrans[1].setPosition(size.width * res.objectsPosition[this.randomPositionArray[1]].x, size.height * res.objectsPosition[this.randomPositionArray[1]].y);
            //this.rightTrans[1].scale.setTo(scale.x/4, scale.y/4);
            this.rightTrans[1].setScale(0.6, 0.6);
            this.addChild(this.rightTrans[1]);
           
            
            this.rightTrans[2] = new cc.Sprite(this.rightCollection[this.randomObjectArray[2]].trans);
            this.rightTrans[2].setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
            this.rightTrans[2].setPosition(size.width * res.objectsPosition[this.randomPositionArray[2]].x, size.height * res.objectsPosition[this.randomPositionArray[2]].y);
            //this.rightTrans[2].scale.setTo(scale.x/4, scale.y/4);
            this.rightTrans[2].setScale(0.6, 0.6);
            this.addChild(this.rightTrans[2]);
           
          
            
            this.rightTrans[3] = new cc.Sprite(this.rightCollection[this.randomObjectArray[3]].trans);
            this.rightTrans[3].setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
            this.rightTrans[3].setPosition(size.width * res.objectsPosition[this.randomPositionArray[3]].x, size.height * res.objectsPosition[this.randomPositionArray[3]].y);
            //this.rightTrans[3].scale.setTo(scale.x/4, scale.y/4);
            this.rightTrans[3].setScale(0.6, 0.6);
            this.addChild(this.rightTrans[3]);
            
            
            this.rightTrans[4] = new cc.Sprite(this.rightCollection[this.randomObjectArray[4]].trans);
            this.rightTrans[4].setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
            this.rightTrans[4].setPosition(size.width * res.objectsPosition[this.randomPositionArray[4]].x, size.height * res.objectsPosition[this.randomPositionArray[4]].y);
            //this.rightTrans[4].scale.setTo(scale.x/4, scale.y/4);
            this.rightTrans[4].setScale(0.6, 0.6);
            this.addChild(this.rightTrans[4]);
           
            
            
            
            ///Adding wrong onjects transparent images
            
            this.wrongTrans = [];
            
            this.wrongTrans[5] = new cc.Sprite(this.wrongCollection[this.randomObjectArray[0]].trans);
            this.wrongTrans[5].setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
            this.wrongTrans[5].setPosition(size.width * res.objectsPosition[this.randomPositionArray[5]].x, size.height * res.objectsPosition[this.randomPositionArray[5]].y);
            //this.wrongTrans[5].scale.setTo(scale.x/4, scale.y/4);
            this.wrongTrans[5].setScale(0.6, 0.6);
            this.addChild(this.wrongTrans[5]);
            
            
            this.wrongTrans[6] = new cc.Sprite(this.wrongCollection[this.randomObjectArray[1]].trans);
            this.wrongTrans[6].setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
            this.wrongTrans[6].setPosition(size.width * res.objectsPosition[this.randomPositionArray[6]].x, size.height * res.objectsPosition[this.randomPositionArray[6]].y);
            //this.wrongTrans[6].scale.setTo(scale.x/4, scale.y/4);
            this.wrongTrans[6].setScale(0.6, 0.6);
            this.addChild(this.wrongTrans[6]);
            
            
            this.wrongTrans[7] = new cc.Sprite(this.wrongCollection[this.randomObjectArray[2]].trans);
            this.wrongTrans[7].setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
            this.wrongTrans[7].setPosition(size.width * res.objectsPosition[this.randomPositionArray[7]].x, size.height * res.objectsPosition[this.randomPositionArray[7]].y);
            //this.wrongTrans[7].scale.setTo(scale.x/4, scale.y/4);
            this.wrongTrans[7].setScale(0.6, 0.6);
            this.addChild(this.wrongTrans[7]);
            
            
            this.wrongTrans[8] = new cc.Sprite(this.wrongCollection[this.randomObjectArray[3]].trans);
            this.wrongTrans[8].setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
            this.wrongTrans[8].setPosition(size.width * res.objectsPosition[this.randomPositionArray[8]].x, size.height * res.objectsPosition[this.randomPositionArray[8]].y);
            //this.wrongTrans[8].scale.setTo(scale.x/4, scale.y/4);
            this.wrongTrans[8].setScale(0.6, 0.6);
            this.addChild(this.wrongTrans[8]);
            
            
            this.wrongTrans[9] = new cc.Sprite(this.wrongCollection[this.randomObjectArray[4]].trans);
            this.wrongTrans[9].setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
            this.wrongTrans[9].setPosition(size.width * res.objectsPosition[this.randomPositionArray[9]].x, size.height * res.objectsPosition[this.randomPositionArray[9]].y);
            //this.wrongTrans[9].scale.setTo(scale.x/4, scale.y/4);
            this.wrongTrans[9].setScale(0.6, 0.6);
            this.addChild(this.wrongTrans[9]);
            
            
            
            
            
            this.rightObjects = [];
            
            
            
            this.rightObjects[0] = new ClickableItem(this.rightCollection[this.randomObjectArray[0]].name, "object", 0, this);
            this.rightObjects[0].x = res.objectsPosition[this.randomPositionArray[0]].x;
            this.rightObjects[0].y = res.objectsPosition[this.randomPositionArray[0]].y;
            this.rightObjects[0].name = this.rightCollection[this.randomObjectArray[0]].name;
            this.rightObjects[0].trans = this.rightCollection[this.randomObjectArray[0]].trans;
            this.rightObjects[0].setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
            this.rightObjects[0].setScale(0.6, 0.6);
            this.rightObjects[0].setPosition(size.width * res.objectsPosition[this.randomPositionArray[0]].x,size.height * res.objectsPosition[this.randomPositionArray[0]].y);
            this.addChild(this.rightObjects[0]);
            
            
            
            this.rightObjects[1] = new ClickableItem(this.rightCollection[this.randomObjectArray[1]].name, "object", 1, this);
            this.rightObjects[1].x = res.objectsPosition[this.randomPositionArray[1]].x;
            this.rightObjects[1].y = res.objectsPosition[this.randomPositionArray[1]].y;
            this.rightObjects[1].name = this.rightCollection[this.randomObjectArray[1]].name;
            this.rightObjects[1].trans = this.rightCollection[this.randomObjectArray[1]].trans;
            this.rightObjects[1].setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
            // this.rightObjects[1].scale.setTo(scale.x/4, scale.y/4);
            this.rightObjects[1].setScale(0.6, 0.6);
            this.rightObjects[1].setPosition(size.width * res.objectsPosition[this.randomPositionArray[1]].x,size.height * res.objectsPosition[this.randomPositionArray[1]].y);
            this.addChild(this.rightObjects[1]);
            
            
            this.rightObjects[2] = new ClickableItem(this.rightCollection[this.randomObjectArray[2]].name,  "object", 2, this);
            this.rightObjects[2].x = res.objectsPosition[this.randomPositionArray[2]].x;
            this.rightObjects[2].y = res.objectsPosition[this.randomPositionArray[2]].y;
            this.rightObjects[2].name = this.rightCollection[this.randomObjectArray[2]].name;
            this.rightObjects[2].trans = this.rightCollection[this.randomObjectArray[2]].trans;
            this.rightObjects[2].setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
            // this.rightObjects[2].scale.setTo(scale.x/4, scale.y/4);
            this.rightObjects[2].setScale(0.6, 0.6);
            this.rightObjects[2].setPosition(size.width * res.objectsPosition[this.randomPositionArray[2]].x,size.height * res.objectsPosition[this.randomPositionArray[2]].y);
            this.addChild(this.rightObjects[2]);
           
            
            this.rightObjects[3] = new ClickableItem(this.rightCollection[this.randomObjectArray[3]].name,  "object", 3, this);
            this.rightObjects[3].x = res.objectsPosition[this.randomPositionArray[3]].x;
            this.rightObjects[3].y = res.objectsPosition[this.randomPositionArray[3]].y;
            this.rightObjects[3].name = this.rightCollection[this.randomObjectArray[3]].name;
            this.rightObjects[3].trans = this.rightCollection[this.randomObjectArray[3]].trans;
            this.rightObjects[3].setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
            // this.rightObjects[3].scale.setTo(scale.x/4, scale.y/4);
            this.rightObjects[3].setScale(0.6, 0.6);
            this.rightObjects[3].setPosition(size.width * res.objectsPosition[this.randomPositionArray[3]].x,size.height * res.objectsPosition[this.randomPositionArray[3]].y);
            this.addChild(this.rightObjects[3]);
           
            
            this.rightObjects[4] = new ClickableItem(this.rightCollection[this.randomObjectArray[4]].name,  "object", 4, this);
            this.rightObjects[4].x = res.objectsPosition[this.randomPositionArray[4]].x;
            this.rightObjects[4].y = res.objectsPosition[this.randomPositionArray[4]].y;
            this.rightObjects[4].name = this.rightCollection[this.randomObjectArray[4]].name;
            this.rightObjects[4].trans = this.rightCollection[this.randomObjectArray[4]].trans;
            this.rightObjects[4].setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
            // this.rightObjects[4].scale.setTo(scale.x/4, scale.y/4);
            this.rightObjects[4].setScale(0.6, 0.6);
            this.rightObjects[4].setPosition(size.width * res.objectsPosition[this.randomPositionArray[4]].x,size.height * res.objectsPosition[this.randomPositionArray[4]].y);
            this.addChild(this.rightObjects[4]);
          
            
         
            
            
            this.wrongObjects = [];
          
            this.wrongObjects[5] =  new ClickableItem(this.wrongCollection[this.randomObjectArray[0]].name,  "object", 5, this);
                
            this.wrongObjects[5].x = res.objectsPosition[this.randomPositionArray[5]].x;
            this.wrongObjects[5].y = res.objectsPosition[this.randomPositionArray[5]].y;
            this.wrongObjects[5].name = this.wrongCollection[this.randomObjectArray[0]].name;
            this.wrongObjects[5].trans = this.wrongCollection[this.randomObjectArray[0]].trans;
            this.wrongObjects[5].setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);            
            // this.wrongObjects[5].scale.setTo(scale.x/4, scale.y/4);
            this.wrongObjects[5].setScale(0.6, 0.6);
            this.wrongObjects[5].setPosition(size.width * res.objectsPosition[this.randomPositionArray[5]].x, size.height * res.objectsPosition[this.randomPositionArray[5]].y);
            this.addChild(this.wrongObjects[5]);
            
            
            this.wrongObjects[6] =  new ClickableItem(this.wrongCollection[this.randomObjectArray[1]].name,  "object", 6, this);
                
            this.wrongObjects[6].x = res.objectsPosition[this.randomPositionArray[6]].x;
            this.wrongObjects[6].y = res.objectsPosition[this.randomPositionArray[6]].y;
            this.wrongObjects[6].name = this.wrongCollection[this.randomObjectArray[1]].name;
            this.wrongObjects[6].trans = this.wrongCollection[this.randomObjectArray[1]].trans;
            this.wrongObjects[6].setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
            // this.wrongObjects[6].scale.setTo(scale.x/4, scale.y/4);
            this.wrongObjects[6].setScale(0.6, 0.6);
            this.wrongObjects[6].setPosition(size.width * res.objectsPosition[this.randomPositionArray[6]].x, size.height * res.objectsPosition[this.randomPositionArray[6]].y);
            this.addChild(this.wrongObjects[6]);
            
            
            this.wrongObjects[7] = new ClickableItem(this.wrongCollection[this.randomObjectArray[2]].name,  "object", 7, this);
                
            this.wrongObjects[7].x = res.objectsPosition[this.randomPositionArray[7]].x;
            this.wrongObjects[7].y = res.objectsPosition[this.randomPositionArray[7]].y;
            this.wrongObjects[7].name = this.wrongCollection[this.randomObjectArray[2]].name;
            this.wrongObjects[7].trans = this.wrongCollection[this.randomObjectArray[2]].trans;
            this.wrongObjects[7].setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
            // this.wrongObjects[7].scale.setTo(scale.x/4, scale.y/4);
            this.wrongObjects[7].setScale(0.6, 0.6);
            this.wrongObjects[7].setPosition(size.width * res.objectsPosition[this.randomPositionArray[7]].x, size.height * res.objectsPosition[this.randomPositionArray[7]].y);
            this.addChild(this.wrongObjects[7]);
            
            
            this.wrongObjects[8] = new ClickableItem(this.wrongCollection[this.randomObjectArray[3]].name,  "object", 8, this);
                
            this.wrongObjects[8].x = res.objectsPosition[this.randomPositionArray[8]].x;
            this.wrongObjects[8].y = res.objectsPosition[this.randomPositionArray[8]].y;
            this.wrongObjects[8].name = this.wrongCollection[this.randomObjectArray[3]].name;
            this.wrongObjects[8].trans = this.wrongCollection[this.randomObjectArray[3]].trans;
            this.wrongObjects[8].setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
            // this.wrongObjects[8].scale.setTo(scale.x/4, scale.y/4);
            this.wrongObjects[8].setScale(0.6, 0.6);
            this.wrongObjects[8].setPosition(size.width * res.objectsPosition[this.randomPositionArray[8]].x, size.height * res.objectsPosition[this.randomPositionArray[8]].y);
            this.addChild(this.wrongObjects[8]);
            
            
            
            this.wrongObjects[9] =  new ClickableItem(this.wrongCollection[this.randomObjectArray[4]].name,  "object", 9, this);
                
            this.wrongObjects[9].x = res.objectsPosition[this.randomPositionArray[9]].x;
            this.wrongObjects[9].y = res.objectsPosition[this.randomPositionArray[9]].y;
            this.wrongObjects[9].name = this.wrongCollection[this.randomObjectArray[4]].name;
            this.wrongObjects[9].trans = this.wrongCollection[this.randomObjectArray[4]].trans;
            this.wrongObjects[9].setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
            // this.wrongObjects[9].scale.setTo(scale.x/4, scale.y/4);
            this.wrongObjects[9].setScale(0.6, 0.6);
            this.wrongObjects[9].setPosition(size.width * res.objectsPosition[this.randomPositionArray[9]].x,size.height *  res.objectsPosition[this.randomPositionArray[9]].y);
            this.addChild(this.wrongObjects[9]);
            
            
            
            //Adding boxes
            
            
            this.colorBoxes = [];
       
            this.colorBoxes[0] = new cc.Sprite(res.box_png);
            this.colorBoxes[0].setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
            this.colorBoxes[0].setScale(0.9, 0.9);
            this.colorBoxes[0].color = new cc.color(res.colorObjects[this.randomColorArray[0]].code.r, res.colorObjects[this.randomColorArray[0]].code.g, res.colorObjects[this.randomColorArray[0]].code.b);
            this.colorBoxes[0].r = res.colorObjects[this.randomColorArray[0]].code.r;
            this.colorBoxes[0].g = res.colorObjects[this.randomColorArray[0]].code.g;
            this.colorBoxes[0].b = res.colorObjects[this.randomColorArray[0]].code.b;
            this.colorBoxes[0].name = res.colorObjects[this.randomColorArray[0]].name;    
            this.colorBoxes[0].setPosition(size.width * res.objectsPosition[this.randomPositionArray[0]].x,size.height * res.objectsPosition[this.randomPositionArray[0]].y);
            this.addChild(this.colorBoxes[0]);
            
            
            this.colorBoxes[1] = new cc.Sprite(res.box_png);
            this.colorBoxes[1].setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
            this.colorBoxes[1].setScale(0.9, 0.9);
            this.colorBoxes[1].color = new cc.color(res.colorObjects[this.randomColorArray[1]].code.r, res.colorObjects[this.randomColorArray[1]].code.g, res.colorObjects[this.randomColorArray[1]].code.b);
            this.colorBoxes[1].r = res.colorObjects[this.randomColorArray[1]].code.r;
            this.colorBoxes[1].g = res.colorObjects[this.randomColorArray[1]].code.g;
            this.colorBoxes[1].b = res.colorObjects[this.randomColorArray[1]].code.b;
            this.colorBoxes[1].name = res.colorObjects[this.randomColorArray[1]].name;    
            this.colorBoxes[1].setPosition(size.width * res.objectsPosition[this.randomPositionArray[1]].x,size.height * res.objectsPosition[this.randomPositionArray[1]].y);
            this.addChild(this.colorBoxes[1]);
            
            this.colorBoxes[2] = new cc.Sprite(res.box_png);
            this.colorBoxes[2].setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
            this.colorBoxes[2].setScale(0.9, 0.9);
            this.colorBoxes[2].color = new cc.color(res.colorObjects[this.randomColorArray[2]].code.r, res.colorObjects[this.randomColorArray[2]].code.g, res.colorObjects[this.randomColorArray[2]].code.b);
            this.colorBoxes[2].r = res.colorObjects[this.randomColorArray[2]].code.r;
            this.colorBoxes[2].g = res.colorObjects[this.randomColorArray[2]].code.g;
            this.colorBoxes[2].b = res.colorObjects[this.randomColorArray[2]].code.b;
            this.colorBoxes[2].name = res.colorObjects[this.randomColorArray[2]].name;    
            this.colorBoxes[2].setPosition(size.width * res.objectsPosition[this.randomPositionArray[2]].x,size.height * res.objectsPosition[this.randomPositionArray[2]].y);
            this.addChild(this.colorBoxes[2]);
            
            this.colorBoxes[3] = new cc.Sprite(res.box_png);
            this.colorBoxes[3].setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
            this.colorBoxes[3].setScale(0.9, 0.9);
            this.colorBoxes[3].color = new cc.color(res.colorObjects[this.randomColorArray[3]].code.r, res.colorObjects[this.randomColorArray[3]].code.g, res.colorObjects[this.randomColorArray[3]].code.b);
            this.colorBoxes[3].r = res.colorObjects[this.randomColorArray[3]].code.r;
            this.colorBoxes[3].g = res.colorObjects[this.randomColorArray[3]].code.g;
            this.colorBoxes[3].b = res.colorObjects[this.randomColorArray[3]].code.b;
            this.colorBoxes[3].name = res.colorObjects[this.randomColorArray[3]].name;    
            this.colorBoxes[3].setPosition(size.width * res.objectsPosition[this.randomPositionArray[3]].x,size.height * res.objectsPosition[this.randomPositionArray[3]].y);
            this.addChild(this.colorBoxes[3]);
            
            this.colorBoxes[4] = new cc.Sprite(res.box_png);
            this.colorBoxes[4].setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
            this.colorBoxes[4].setScale(0.9, 0.9);
            this.colorBoxes[4].color = new cc.color(res.colorObjects[this.randomColorArray[4]].code.r, res.colorObjects[this.randomColorArray[4]].code.g, res.colorObjects[this.randomColorArray[4]].code.b);
            this.colorBoxes[4].r = res.colorObjects[this.randomColorArray[4]].code.r;
            this.colorBoxes[4].g = res.colorObjects[this.randomColorArray[4]].code.g;
            this.colorBoxes[4].b = res.colorObjects[this.randomColorArray[4]].code.b;
            this.colorBoxes[4].name = res.colorObjects[this.randomColorArray[4]].name;    
            this.colorBoxes[4].setPosition(size.width * res.objectsPosition[this.randomPositionArray[4]].x,size.height * res.objectsPosition[this.randomPositionArray[4]].y);
            this.addChild(this.colorBoxes[4]);
            
            
            this.colorBoxes[5] = new cc.Sprite(res.box_png);
            this.colorBoxes[5].setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
            this.colorBoxes[5].setScale(0.9, 0.9);
            this.colorBoxes[5].color = new cc.color(res.colorObjects[this.randomColorArray[5]].code.r, res.colorObjects[this.randomColorArray[5]].code.g, res.colorObjects[this.randomColorArray[5]].code.b);
            this.colorBoxes[5].r = res.colorObjects[this.randomColorArray[5]].code.r;
            this.colorBoxes[5].g = res.colorObjects[this.randomColorArray[5]].code.g;
            this.colorBoxes[5].b = res.colorObjects[this.randomColorArray[5]].code.b;
            this.colorBoxes[5].name = res.colorObjects[this.randomColorArray[5]].name;    
            this.colorBoxes[5].setPosition(size.width * res.objectsPosition[this.randomPositionArray[5]].x,size.height * res.objectsPosition[this.randomPositionArray[5]].y);
            this.addChild(this.colorBoxes[5]);
            
            
            
            this.colorBoxes[6] = new cc.Sprite(res.box_png);
            this.colorBoxes[6].setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
            this.colorBoxes[6].setScale(0.9, 0.9);
            this.colorBoxes[6].color = new cc.color(res.colorObjects[this.randomColorArray[0]].code.r, res.colorObjects[this.randomColorArray[0]].code.g, res.colorObjects[this.randomColorArray[0]].code.b);
            this.colorBoxes[6].r = res.colorObjects[this.randomColorArray[0]].code.r;
            this.colorBoxes[6].g = res.colorObjects[this.randomColorArray[0]].code.g;
            this.colorBoxes[6].b = res.colorObjects[this.randomColorArray[0]].code.b;
            this.colorBoxes[6].name = res.colorObjects[this.randomColorArray[0]].name;    
            this.colorBoxes[6].setPosition(size.width * res.objectsPosition[this.randomPositionArray[6]].x,size.height * res.objectsPosition[this.randomPositionArray[6]].y);
            this.addChild(this.colorBoxes[6]);
            
            
            this.colorBoxes[7] = new cc.Sprite(res.box_png);
            this.colorBoxes[7].setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
            this.colorBoxes[7].setScale(0.9, 0.9);
            this.colorBoxes[7].color = new cc.color(res.colorObjects[this.randomColorArray[1]].code.r, res.colorObjects[this.randomColorArray[1]].code.g, res.colorObjects[this.randomColorArray[1]].code.b);
            this.colorBoxes[7].r = res.colorObjects[this.randomColorArray[1]].code.r;
            this.colorBoxes[7].g = res.colorObjects[this.randomColorArray[1]].code.g;
            this.colorBoxes[7].b = res.colorObjects[this.randomColorArray[1]].code.b;
            this.colorBoxes[7].name = res.colorObjects[this.randomColorArray[1]].name;    
            this.colorBoxes[7].setPosition(size.width * res.objectsPosition[this.randomPositionArray[7]].x,size.height * res.objectsPosition[this.randomPositionArray[7]].y);
            this.addChild(this.colorBoxes[7]);
            
            
            this.colorBoxes[8] = new cc.Sprite(res.box_png);
            this.colorBoxes[8].setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
            this.colorBoxes[8].setScale(0.9, 0.9);
            this.colorBoxes[8].color = new cc.color(res.colorObjects[this.randomColorArray[2]].code.r, res.colorObjects[this.randomColorArray[2]].code.g, res.colorObjects[this.randomColorArray[2]].code.b);
            this.colorBoxes[8].r = res.colorObjects[this.randomColorArray[2]].code.r;
            this.colorBoxes[8].g = res.colorObjects[this.randomColorArray[2]].code.g;
            this.colorBoxes[8].b = res.colorObjects[this.randomColorArray[2]].code.b;
            this.colorBoxes[8].name = res.colorObjects[this.randomColorArray[2]].name;    
            this.colorBoxes[8].setPosition(size.width * res.objectsPosition[this.randomPositionArray[8]].x,size.height * res.objectsPosition[this.randomPositionArray[8]].y);
            this.addChild(this.colorBoxes[8]);
            
            
            this.colorBoxes[9] = new cc.Sprite(res.box_png);
            this.colorBoxes[9].setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
            this.colorBoxes[9].setScale(0.9, 0.9);
            this.colorBoxes[9].color = new cc.color(res.colorObjects[this.randomColorArray[3]].code.r, res.colorObjects[this.randomColorArray[3]].code.g, res.colorObjects[this.randomColorArray[3]].code.b);
            this.colorBoxes[9].r = res.colorObjects[this.randomColorArray[3]].code.r;
            this.colorBoxes[9].g = res.colorObjects[this.randomColorArray[3]].code.g;
            this.colorBoxes[9].b = res.colorObjects[this.randomColorArray[3]].code.b;
            this.colorBoxes[9].name = res.colorObjects[this.randomColorArray[3]].name;    
            this.colorBoxes[9].setPosition(size.width * res.objectsPosition[this.randomPositionArray[9]].x,size.height * res.objectsPosition[this.randomPositionArray[9]].y);
            this.addChild(this.colorBoxes[9]);
        },
        
        randomArrayFromInterval: function(noOfValues,domainRange) {
            
            var arr = [];
            while(arr.length < noOfValues){
                
                
                var randomnumber=Math.ceil(Math.random() * domainRange);
                randomnumber -= 1;
                var found=false;
                for(var i=0;i<arr.length;i++){
	               
                    if(arr[i]==randomnumber){found=true;break}
                }
                if(!found)arr[arr.length]=randomnumber;
            }
           
            return arr;
        },
        
        
        
        clearActiveFlags: function(){
        
            this.objectClickedFlag = null;
            this.colorClickedFlag = null;
            this.objectClickedName = null;
            this.objectClickedTrans = null;
            this.colorClickedCode = {r:null,g:null,b:null};
            this.wrongObjectClicked = null;   
            this.id= null;
            this.wrongId = null;
            
    
    },
        update: function() {
            
          
            this.reorderChild(this.shadow, 11);
            this.reorderChild(this.Letter, 10);
            
            for(var i = 0; i < 10 ; i++){this.reorderChild(this.colorBoxes[i], 10);}
          
            this.reorderChild(this.cloud1, 10);
            this.reorderChild(this.cloud2, 10);
            this.reorderChild(this.cloud3, 10);
           
            
            for(var i =0; i < 5 ; i++){if(i != this.id){this.reorderChild(this.rightObjects[i], 10);}else{this.reorderChild(this.rightTrans[this.id], 10);}}
            
            
            for(var i =5; i < 10 ; i++){if(i != this.id){this.reorderChild(this.wrongObjects[i], 10);}else{this.reorderChild(this.wrongTrans[this.id], 10);}}
            
           
            for(var i =0; i<10 ; i++){ this.reorderChild(this.timeBox[i], 10);}
            
            
            this.reorderChild(this.timeBarx , 10);
           
            if(this.levelCounter >= 10){
                 var size = cc.winSize;
            
                this.askForNextLevel = 1;
                this.nextButton = new ClickableItem(this.Button,"nextLevel", null, this);  
                this.nextButton.setPosition(size.width * 0.91, size.height * 0.09);           
                //this.nextButton.scale.setTo(scale.x, scale.y); 
                this.nextButton.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
                this.addChild(this.nextButton, 10);
                
            }
            
        
        //    if(this.volumeFlag == 0){
        //         this.reorderChild(this.mute, 10);this.reorderChild(this.volume, 9);
        //     }else{
        //         this.reorderChild(this.volume, 10);this.reorderChild(this.mute, 9);
        //     } 
            
            
     },
        
        resetSpriteFlag: function(){
            
            for(var i=0; i<5; i++){ this.rightObjects[i].flag = 0;}
            
            for(var i=5; i<10; i++){ this.wrongObjects[i].flag = 0;}
            
             console.log("reset sprite flags!!!");
            
        },
       
        setColorFlagToZero: function(){
            
            this.bubbleSound = cc.audioEngine;
            this.bubbleSound.playEffect(res.bubble_mp3); 
            for(var i=0; i<10; i++){ this.colorBoxes[i].flag = 0;}
            console.log("colorbox flag cleared!!!");
        },
        
        setGlobalVaribalesToZero: function(){
            
            
            this.ObjectClicked = null;
            this.askForNextLevel = null;
            this.objectClickedFlag = null;
            this.colorClickedFlag = null;
            this.objectClickedName= null;
            this.objectClickedTrans = null;
            this.colorClickedCode = {r:null, g:null, b:null};
            this.wrongObjectClicked = null;
            this.id = null; 
            this.wrongId = null;
            this.levelCounter = 0; 
            this.filler = 0;
            this.volumeFlag = 1;
            
           
            
            for(var i=0; i<5; i++){ this.rightObjects[i].flag = 0;}
            
            for(var i=5; i<10; i++){ this.wrongObjects[i].flag = 0;}
            
            for(var i=0; i<10; i++){ this.colorBoxes[i].flag = 0;}
        },
        killAllSprites: function(){
        
            for(var i=0; i<5; i++){ this.removeChild(this.rightObjects[i]); this.removeChild(this.rightTrans[i]); }
            
            for(var i=5; i<10; i++){ this.removeChild(this.wrongObjects[i]); this.removeChild(this.wrongTrans[i]);}
            
            for(var i=0; i<10; i++){   this.removeChild(this.colorBoxes[i]);}
            
             console.log("All sprites killed!!!");
        }
        
    
   

});

var Scene = cc.Scene.extend({
    ctor: function(           RTCollection, 
                              WRCollection, 
                              nextButton,
                              bgImage,
                              latterImage,
                              shadowImage,
                              shadowPosX,
                              shadowPosY,
                              scaleX,
                              scaleY){
                                  
                                  
      
      this._super();  
      
      var Layer = new Level(
                              RTCollection, 
                              WRCollection, 
                              nextButton,
                              bgImage,
                              latterImage,
                              shadowImage,
                              shadowPosX,
                              shadowPosY,
                              scaleX,
                              scaleY
                             
                              );
        
        this.addChild(Layer);
    }   
  
});


var sceneId = 0;


var Data = [
                      [
                       res.aCollection, 
                       res.bCollection, 
                       res.bButton_png,  
                       res.bgA_png,
                       res.aLetter_png,
                       res.shadowA_png,
                       shadowPosition = [0.59, 0.31],
                       scale = [1, 1],
                       name = "A"
                      ],
                      
                      [
                       res.bCollection, 
                       res.cCollection, 
                       res.cButton_png,  
                       res.bgB_png,
                       res.bLetter_png,
                       res.shadowB_png,
                       shadowPosition = [0.49, 0.33],
                       scale = [1, 1],
                       name = "B"
                      ],
                      
                      [
                       res.cCollection, 
                       res.dCollection, 
                       res.dButton_png,  
                       res.bgC_png,
                       res.cLetter_png,
                       res.shadowC_png,
                       shadowPosition = [0.54, 0.33],
                       scale = [1, 1],
                       name = "C"
                      ],
                      
                      [
                       res.dCollection, 
                       res.eCollection, 
                       res.eButton_png,  
                       res.bgD_png,
                       res.dLetter_png,
                       res.shadowD_png,
                       shadowPosition = [0.57, 0.32],
                       scale = [1.1, 1.1],
                       name = "D"
                      ],
                      
                      [
                       res.eCollection, 
                       res.fCollection, 
                       res.fButton_png,  
                       res.bgE_png,
                       res.eLetter_png,
                       res.shadowE_png,
                       shadowPosition = [0.52, 0.33],
                       scale = [1.05, 1.05],
                       name = "E"

                      ],
                      
                      [
                       res.fCollection, 
                       res.gCollection, 
                       res.gButton_png,  
                       res.bgF_png,
                       res.fLetter_png,
                       res.shadowF_png,
                       shadowPosition = [0.53, 0.33],
                       scale = [1, 1],
                       name = "F"

                      ],
                      
                      [
                       res.gCollection, 
                       res.hCollection, 
                       res.hButton_png,  
                       res.bgG_png,
                       res.gLetter_png,
                       res.shadowG_png,
                       shadowPosition = [0.54, 0.34],
                       scale = [1.05, 1],
                       name = "G"


                      ],
                      
                      [
                       res.hCollection, 
                       res.iCollection, 
                       res.iButton_png,  
                       res.bgH_png,
                       res.hLetter_png,
                       res.shadowH_png,
                       shadowPosition = [0.58, 0.31],
                       scale = [1.05, 1.05],
                       name = "H"

                      ],
                      
                      [
                       res.iCollection, 
                       res.jCollection, 
                       res.jButton_png,  
                       res.bgI_png,
                       res.iLetter_png,
                       res.shadowI_png,
                       shadowPosition = [0.53, 0.32],
                       scale = [0.9, 1],
                       name = "I"

                      ],
                      
                      [
                       res.jCollection, 
                       res.kCollection, 
                       res.kButton_png,  
                       res.bgJ_png,
                       res.jLetter_png,
                       res.shadowJ_png,
                       shadowPosition = [0.51, 0.37],
                       scale = [1, 1],
                       name = "J"

                      ],
                      
                      [
                       res.kCollection, 
                       res.lCollection, 
                       res.lButton_png,  
                       res.bgK_png,
                       res.kLetter_png,
                       res.shadowK_png,
                       shadowPosition = [0.56, 0.33],
                       scale = [1, 1],
                       name = "K"

                      ],
                      
                      [
                       res.lCollection, 
                       res.mCollection, 
                       res.mButton_png,  
                       res.bgL_png,
                       res.lLetter_png,
                       res.shadowL_png,
                       shadowPosition = [0.53, 0.325],
                       scale = [1, 1],
                       name = "L"

                      ],
                      
                      [
                       res.mCollection, 
                       res.nCollection, 
                       res.nButton_png,  
                       res.bgM_png,
                       res.mLetter_png,
                       res.shadowM_png,
                       shadowPosition = [0.56, 0.33],
                       scale = [1.05, 1.05],
                       name = "M"

                      ],
                      
                      [
                       res.nCollection, 
                       res.oCollection, 
                       res.oButton_png,  
                       res.bgN_png,
                       res.nLetter_png,
                       res.shadowN_png,
                       shadowPosition = [0.55, 0.32],
                       scale = [1.05, 1.05],
                       name = "N"

                      ],
                      
                      [
                       res.oCollection, 
                       res.pCollection, 
                       res.pButton_png,  
                       res.bgO_png,
                       res.oLetter_png,
                       res.shadowO_png,
                       shadowPosition = [0.54, 0.32],
                       scale = [1.05, 1.05],
                       name = "O"

                      ],
                      
                      [
                       res.pCollection, 
                       res.qCollection, 
                       res.qButton_png,  
                       res.bgP_png,
                       res.pLetter_png,
                       res.shadowP_png,
                       shadowPosition = [0.56, 0.32],
                       scale = [1, 1],
                       name = "P"

                      ],
                      
                      [
                       res.qCollection, 
                       res.rCollection, 
                       res.rButton_png,  
                       res.bgQ_png,
                       res.qLetter_png,
                       res.shadowQ_png,
                       shadowPosition = [0.55, 0.36],
                       scale = [1.05, 1.05],
                       name = "Q"

                      ],
                      
                      [
                       res.rCollection, 
                       res.sCollection, 
                       res.sButton_png,  
                       res.bgR_png,
                       res.rLetter_png,
                       res.shadowR_png,
                       shadowPosition = [0.55, 0.32],
                       scale = [1, 1],
                       name = "R"

                      ],
                      
                      [
                       res.sCollection, 
                       res.tCollection, 
                       res.tButton_png,  
                       res.bgS_png,
                       res.sLetter_png,
                       res.shadowS_png,
                       shadowPosition = [0.49, 0.33],
                       scale = [1, 1],
                       name = "S"

                      ],
                      
                      [
                       res.tCollection, 
                       res.uCollection, 
                       res.uButton_png,  
                       res.bgT_png,
                       res.tLetter_png,
                       res.shadowT_png,
                       shadowPosition = [0.50, 0.32],
                       scale = [1, 1],
                       name = "T"

                      ],
                      
                      [
                       res.uCollection, 
                       res.vCollection, 
                       res.vButton_png,  
                       res.bgU_png,
                       res.uLetter_png,
                       res.shadowU_png,
                       shadowPosition = [0.50, 0.33],
                       scale = [1, 1],
                       name = "U"

                      ],
                      
                      [
                       res.vCollection, 
                       res.wCollection, 
                       res.wButton_png,  
                       res.bgV_png,
                       res.vLetter_png,
                       res.shadowV_png,
                       shadowPosition = [0.48, 0.31],
                       scale = [1, 1],
                       name = "V"

                      ],
                      
                      [
                       res.wCollection, 
                       res.xCollection, 
                       res.xButton_png,  
                       res.bgW_png,
                       res.wLetter_png,
                       res.shadowW_png,
                       shadowPosition = [0.535, 0.31],
                       scale = [1, 1],
                       name = "W"

                      ],
                      
                      [
                       res.xCollection, 
                       res.yCollection, 
                       res.yButton_png,  
                       res.bgX_png,
                       res.xLetter_png,
                       res.shadowX_png,
                       shadowPosition = [0.47, 0.32],
                       scale = [1.05, 1.05],
                       name = "X"

                      ],
                      
                      [
                       res.yCollection, 
                       res.zCollection, 
                       res.zButton_png,  
                       res.bgY_png,
                       res.yLetter_png,
                       res.shadowY_png,
                       shadowPosition = [0.47, 0.33],
                       scale = [1.05, 1.05],
                       name = "Y"

                      ],
                      
                      [
                       res.zCollection, 
                       res.aCollection, 
                       res.aButton_png,  
                       res.bgZ_png,
                       res.zLetter_png,
                       res.shadowZ_png,
                       shadowPosition = [0.48, 0.33],
                       scale = [1, 1],
                       name = "Z"
                       
                      ]
            ];         

