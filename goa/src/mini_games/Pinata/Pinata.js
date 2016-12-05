
var xc = xc || {};

xc.Pinata = cc.Layer.extend({
  gameName: "shoot",
  menuContext: null,

  ctor:function () {
  
   this._super();
//this.gameBg.node.getChildByName("Panel_1").getChildByName("Button_10");
  },
  onEnter: function() {
    this._super();
    menuContext = this.getParent().menuContext;
    var gameTheme = "";
    var gameRand = new Array(3);
    gameRand[0] = "pinatacity"; gameRand[1] ="pinatacream"; gameRand[2] ="pinatajungle";
    //gameTheme = "pinatacream";
    this.gameBg = null;
    this.stringColor = new cc.color(255,255,255,255);
    var playerGUI = "";
    var heightTolrence = 0;
    this.xPosi =0; 
    this.shootingFlag = false;
    this.flagSingleTouchFirst = true;
    var currentLevelValue = menuContext.getCurrentLevel();
    menuContext.setMaxPoints(2);
    var info = this.levelAllInfo(currentLevelValue,3,5,3,10);
    console.log("the pinata category value is : " +     info.category);
    console.log("the pinata scene value is : " +     info.scene);
    console.log("the pinata level value is : " +     info.level);
   
 if(info.category == 1){
         this.map =  goa.TextGenerator.getInstance().getAntonyms(3);
    }else if(info.category == 2){
         this.map =  goa.TextGenerator.getInstance().getSynonyms(3);
    }else if(info.category == 3){
         this.map =  goa.TextGenerator.getInstance().getHomonyms(3);
    }else{
        console.log("ERROR :: Your category is wrong , please check your code : line no : 23");
    }
    gameTheme = gameRand[info.scene - 1];

    if(gameTheme == "pinatacream"){
         cc.spriteFrameCache.addSpriteFrames(xc.Pinata.res.pinatacream_plist);
         this.gameBg = ccs.load(xc.Pinata.res.pinatacream_json,xc.path);
         var targetA = this.gameBg.node.getChildByName("targeta");
         heightTolrence = targetA.height * 0.25;
         this.stringColor = new cc.color(158,45,45,255);
         playerGUI = "pinatacream/player.png";

    }else if(gameTheme == "pinatacity"){
         cc.spriteFrameCache.addSpriteFrames(xc.Pinata.res.pinatacity_plist);
         this.gameBg = ccs.load(xc.Pinata.res.pinatacity_json,xc.path);
         this.stringColor = new cc.color(140,234,19,255);
         playerGUI = "pinatacity/player.png";

    }else if(gameTheme == "pinatajungle"){
         cc.spriteFrameCache.addSpriteFrames(xc.Pinata.res.pinatajungle_plist);
         this.gameBg = ccs.load(xc.Pinata.res.pinatajungle_json,xc.path);
         this.stringColor = new cc.color(124,252,0,255);
         playerGUI = "jungle/junglec/player.png";
    }

    this.addChild(this.gameBg.node);
    this.targetPlayer = null;

    if (cc.director.getWinSize().width > 2560){
       this.xPosi = cc.director.getWinSize().width - 2560;
        this.gameBg.node.x = this.xPosi/2;
    }

    this.player = {
        x : 0,
        y: 0,
        prevX : 0,
        prevY : 0,
        angle : 90
    }

    var mapKeyArray = Object.keys(this.map);
    this.mapKey = mapKeyArray[this.getRandomInt(0,(mapKeyArray.length-1))];
    
    var board = this.gameBg.node.getChildByName("board");
    var boardText = new cc.LabelTTF(""+this.mapKey,"res/fonts/Marker Felt.ttf",120);
    boardText.setName(board.getName());
    boardText.setPosition(board.width/2,board.height/2);                    
    board.addChild(boardText);
    if(gameTheme == "pinatacream"){  boardText.setColor(new cc.color(155 ,42,50,255));  }
    if(gameTheme == "pinatacity"){  boardText.setColor(new cc.color(0,0,0,255));  }
    
    var targetA = this.gameBg.node.getChildByName("targeta");
    var targetAText = new cc.LabelTTF(""+this.map[mapKeyArray[0]],"res/fonts/Marker Felt.ttf",120);
    if(gameTheme == "pinatajungle") targetAText.setFontSize(80);
    if(gameTheme == "pinatacity"){  targetAText.setColor(new cc.color(0,0,0,255));  }
    targetAText.setName(targetA.getName());
    targetAText.setPosition(targetA.width/2,targetA.height/2 - heightTolrence);
    targetA.addChild(targetAText);

    var targetB = this.gameBg.node.getChildByName("targetb");
    var targetBText = new cc.LabelTTF(""+this.map[mapKeyArray[1]],"res/fonts/Marker Felt.ttf",120);
    if(gameTheme == "pinatajungle") targetBText.setFontSize(80);
    if(gameTheme == "pinatacity"){  targetBText.setColor(new cc.color(0,0,0,255));  }
    targetBText.setName(targetB.getName());
    targetBText.setPosition(targetB.width/2,targetB.height/2 - heightTolrence);                      
    targetB.addChild(targetBText);

    var targetC = this.gameBg.node.getChildByName("targetc");
    var targetCText = new cc.LabelTTF(""+this.map[mapKeyArray[2]],"res/fonts/Marker Felt.ttf",120);
    if(gameTheme == "pinatajungle") targetCText.setFontSize(80);
    if(gameTheme == "pinatacity"){  targetCText.setColor(new cc.color(0,0,0,255));  }
    targetCText.setName(targetC.getName());
    targetCText.setPosition(targetC.width/2,targetC.height/2 - heightTolrence);                      
    targetC.addChild(targetCText);

    this.bubblePlayer =  new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(playerGUI));
    this.bubblePlayer.setName(gameTheme);
    this.bubblePlayer.setPosition((this.xPosi/2)+(this.gameBg.node.getChildByName("left").x + this.gameBg.node.getChildByName("right").x) /2,this.gameBg.node.getChildByName("right").y);
    this.addChild(this.bubblePlayer,1);
    this.player.x = this.bubblePlayer.x;    this.player.y = this.bubblePlayer.y;
    
    this.rightLine = new cc.DrawNode();
    this.rightLine.drawSegment(cc.p(this.gameBg.node.getChildByName("right").x+(this.xPosi/2),this.gameBg.node.getChildByName("right").y), cc.p(this.player.x + (this.bubblePlayer.width/2),this.player.y),5,this.stringColor);
    this.addChild(this.rightLine);

    this.leftLine = new cc.DrawNode(); 
    this.leftLine.drawSegment(cc.p(this.gameBg.node.getChildByName("left").x+(this.xPosi/2),this.gameBg.node.getChildByName("left").y),cc.p(this.player.x - (this.bubblePlayer.width/2),this.player.y),5,this.stringColor);
    this.addChild(this.leftLine);

    this.bubblePlayer.visible = false;
    this.rightLine.visible = false;
    this.leftLine.visible = false;

    this.gameBg.node.getChildByName("right").visible = false;
    this.gameBg.node.getChildByName("left").visible = false;
    this.gameBg.node.getChildByName("board").freezShooting = false;
    if(this.bubblePlayer.getName() == "pinatacity")
    this.gameBg.node.getChildByName("slingshot_16").visible = false;
    var help = null;
   
    if(currentLevelValue == 1){
        help = new xc.HelpLayer(cc.rect((this.xPosi/2)+targetB.x,targetB.y,targetB.width +targetB.width * 0.3,targetB.height+targetB.height * 0.1), cc.rect((this.xPosi/2)+board.x, board.y,board.width,board.height))
        this.addChild(help,4)
        help.setName("help");
        help.click((this.xPosi/2)+targetB.x,targetB.y);
    }

    var classReference = this;
    var listnerBg = cc.EventListener.create({event: cc.EventListener.TOUCH_ONE_BY_ONE, swallowTouches: false,
            onTouchBegan :function(touch, event){
                var target = event.getCurrentTarget();
                var targetSize = target.getContentSize();
                var location = target.convertToNodeSpace(touch.getLocation());
                var targetRectangle = cc.rect(0,0, target.width, target.height);
                if(classReference.gameBg.node.getChildByName("board").freezShooting ){
                    if (cc.rectContainsPoint(targetRectangle, location)){
                        classReference.player.prevX = touch.getLocation().x;
                        classReference.player.prevY = touch.getLocation().y;    
                        return true;
                    }
                }
                return false;
            },
            onTouchMoved : function(touch, event){
                var target = event.getCurrentTarget();

                classReference.checkBoundaryBall(target,touch);
                let checkMoving = classReference.movingOrNot(classReference.player.prevX,classReference.player.prevY,touch.getLocation().x,touch.getLocation().y);
                if(checkMoving){
                        if(classReference.rightLine != undefined){
                            classReference.removeChild(classReference.rightLine);
                        }
                        classReference.rightLine = new cc.DrawNode();
                        classReference.rightLine.drawSegment(cc.p((classReference.xPosi/2)+classReference.gameBg.node.getChildByName("right").x,classReference.gameBg.node.getChildByName("right").y), cc.p(classReference.bubblePlayer.x + (classReference.bubblePlayer.width/2),classReference.bubblePlayer.y),5,classReference.stringColor);
                        classReference.addChild(classReference.rightLine);

                        if(classReference.leftLine != undefined){
                            classReference.removeChild(classReference.leftLine);
                        }
                        classReference.leftLine = new cc.DrawNode();
                        classReference.leftLine.drawSegment(cc.p((classReference.xPosi/2)+classReference.gameBg.node.getChildByName("left").x,classReference.gameBg.node.getChildByName("left").y), cc.p(classReference.bubblePlayer.x - (classReference.bubblePlayer.width/2),classReference.bubblePlayer.y),5,classReference.stringColor);
                        classReference.addChild(classReference.leftLine);
                        return true;
                }
            },
            onTouchEnded : function(touch, event){
                classReference.player.angle = classReference.radToDeg(Math.atan2((touch.getLocation().y - classReference.player.y),(-touch.getLocation().x + classReference.player.x)));
                 classReference.player.prevX = Math.abs(classReference.player.prevX - touch.getLocation().x);
                 classReference.player.prevY = Math.abs(classReference.player.prevY - touch.getLocation().y); 

                if(classReference.rightLine != undefined){
                    classReference.removeChild(classReference.rightLine);
                }
                classReference.rightLine = new cc.DrawNode();
                classReference.rightLine.drawSegment(cc.p((classReference.xPosi/2)+classReference.gameBg.node.getChildByName("right").x,classReference.gameBg.node.getChildByName("right").y), cc.p(classReference.player.x - 10,classReference.player.y),5,classReference.stringColor);
                classReference.addChild(classReference.rightLine);

                if(classReference.leftLine != undefined){
                    classReference.removeChild(classReference.leftLine);
                }
                classReference.leftLine = new cc.DrawNode();
                classReference.leftLine.drawSegment(cc.p((classReference.xPosi/2)+classReference.gameBg.node.getChildByName("left").x,classReference.gameBg.node.getChildByName("left").y),cc.p(classReference.player.x + 10,classReference.player.y),5,classReference.stringColor);
                classReference.addChild(classReference.leftLine);
              
                if(classReference.player.prevY != 0 && classReference.player.prevY != 0){
                    classReference.shootingFlag = true;
                    classReference.gameBg.node.getChildByName("board").freezShooting = false;

                    if(!((Math.abs(classReference.player.angle) < 175)  && (Math.abs(classReference.player.angle) > 5))){
                        console.log("the range is not correct ");
                        setTimeout(function() {
                            classReference.bubblePlayer.setPosition((classReference.xPosi/2)+(classReference.gameBg.node.getChildByName("left").x + classReference.gameBg.node.getChildByName("right").x) /2,classReference.gameBg.node.getChildByName("right").y);
                            classReference.player.x = classReference.bubblePlayer.x;    classReference.player.y = classReference.bubblePlayer.y;
                            classReference.shootingFlag = false;
                            classReference.gameBg.node.getChildByName("board").freezShooting = true;
                        }, 3000);                    
                    }
                }
            }
     });

    var choosingListner = cc.EventListener.create({event: cc.EventListener.TOUCH_ONE_BY_ONE, swallowTouches: false,
            onTouchBegan :function(touch, event){
                var target = event.getCurrentTarget();
                var location = target.convertToNodeSpace(touch.getLocation());
                var targetRectangle = cc.rect(0,0, target.width, target.height);
                
                if (cc.rectContainsPoint(targetRectangle, location) && !classReference.gameBg.node.getChildByName("board").freezShooting && !classReference.shootingFlag && classReference.flagSingleTouchFirst){
                    classReference.flagSingleTouchFirst = false;
                    return true;
                }

                return false;
            },
            onTouchEnded : function(touch, event){
                var target = event.getCurrentTarget();
                 if(currentLevelValue == 1){
                    classReference.removeChildByName("help");
                 }
                var path = "";
                if(classReference.bubblePlayer.getName() == "pinatacity"){
                    path = xc.Pinata.res.pinatacity_anim;
                }else if(classReference.bubblePlayer.getName() == "pinatacream"){
                    path = xc.Pinata.res.pinatacream_anim;
                }else if(classReference.bubblePlayer.getName() == "pinatajungle"){
                    path = xc.Pinata.res.pinatajungle_anim;
                }

                if(classReference.map[classReference.gameBg.node.getChildByName("board").getChildByName("board").getString()] == target.getChildByName(target.getName()).getString()){
                    if(target.getName() == "targetc"){
                        if(!targetA.dead){ classReference.runAnimations(ccs.load(path,xc.path),targetA.x,targetA.y,path); classReference.gameBg.node.removeChild(targetA);}
                        if(!targetB.dead){ classReference.runAnimations(ccs.load(path,xc.path),targetB.x,targetB.y,path); classReference.gameBg.node.removeChild(targetB);}
                        classReference.gamePlay(targetC);
                    }else if(target.getName() == "targetb"){
                        if(!targetA.dead){classReference.runAnimations(ccs.load(path,xc.path),targetA.x,targetA.y,path); classReference.gameBg.node.removeChild(targetA);}
                        if(!targetC.dead){classReference.runAnimations(ccs.load(path,xc.path),targetC.x,targetC.y,path); classReference.gameBg.node.removeChild(targetC);}
                        classReference.gamePlay(targetB);
                    }else if(target.getName() == "targeta"){
                        if(!targetC.dead){classReference.runAnimations(ccs.load(path,xc.path),targetC.x,targetC.y,path); classReference.gameBg.node.removeChild(targetC);}
                        if(!targetB.dead){classReference.runAnimations(ccs.load(path,xc.path),targetB.x,targetB.y,path); classReference.gameBg.node.removeChild(targetB);}
                        classReference.gamePlay(targetA);
                    }
                    menuContext.addPoints(2);
                }else{
                    console.log("its wrong answer");
                
                    if(target.getName() == "targetc"){
                        targetC.dead = true;
                        classReference.runAnimations(ccs.load(path,xc.path),targetC.x,targetC.y,path);
                        classReference.gameBg.node.removeChild(targetC);
                    }else if(target.getName() == "targetb"){
                        targetB.dead = true;
                        classReference.runAnimations(ccs.load(path,xc.path),targetB.x,targetB.y,path);
                        classReference.gameBg.node.removeChild(targetB);
                    }else if(target.getName() == "targeta"){
                         targetA.dead = true;
                         classReference.runAnimations(ccs.load(path,xc.path),targetA.x,targetA.y,path);
                        classReference.gameBg.node.removeChild(targetA);
                    }
                    menuContext.addPoints(-1);
                }

                setTimeout(function() {
                        classReference.flagSingleTouchFirst = true;
                },700);

                return false;
            }
     });

    cc.eventManager.addListener(listnerBg,this.bubblePlayer);
    cc.eventManager.addListener(choosingListner,targetA);
    cc.eventManager.addListener(choosingListner.clone(),targetB);
    cc.eventManager.addListener(choosingListner.clone(),targetC);

    this.scheduleUpdate();
    
    return true;
    
  },
  
    update : function (dt) {
       
       if(this.shootingFlag && !menuContext.isGamePaused()){
           this.stateShootBubble(dt);
           if(!(this.bubblePlayer.y >=0)){               
               this.bubblePlayer.setPosition((this.xPosi/2)+(this.gameBg.node.getChildByName("left").x + this.gameBg.node.getChildByName("right").x) /2,this.gameBg.node.getChildByName("right").y);
               this.player.x = this.bubblePlayer.x;    this.player.y = this.bubblePlayer.y;
               this.shootingFlag = false;
               this.gameBg.node.getChildByName("board").freezShooting = true;
           }
       }
        if(this.shootingFlag){
            var path = "";
            var size = 0;
                if(this.bubblePlayer.getName() == "pinatacity"){
                    path = xc.Pinata.res.pinatacity_anim;
                    size = 0.7;
                }else if(this.bubblePlayer.getName() == "pinatacream"){
                    path = xc.Pinata.res.pinatacream_anim;
                    size = 0.5;
                }else if(this.bubblePlayer.getName() == "pinatajungle"){
                    path = xc.Pinata.res.pinatajungle_anim;
                    size = 0.9;
                }

            var targetObject = cc.rect(this.targetPlayer.x - (this.targetPlayer.width*size/2) +(this.xPosi/2),this.targetPlayer.y - (this.targetPlayer.height*size/2), this.targetPlayer.width*size, this.targetPlayer.height*size);
            var playerObject = cc.rect(this.bubblePlayer.x - (this.bubblePlayer.width/4),this.bubblePlayer.y - (this.bubblePlayer.height/4), this.bubblePlayer.width/2, this.bubblePlayer.height/2);
            
            if(cc.rectIntersectsRect(playerObject, targetObject)){
                this.shootingFlag = false;

                this.runAnimations(ccs.load(path,xc.path),this.targetPlayer.x,this.targetPlayer.y,path);
                this.gameBg.node.getChildByName("board").freezShooting = false;
                this.removeChild(this.bubblePlayer);
                this.gameBg.node.removeChild(this.targetPlayer);
                var classReference = this;
                setTimeout(function() {
                    if (cc.sys.isNative) {
                          menuContext.showScore();
                    }else{
                        xc.GameScene.load(xc.Pinata);
                    }
                }, 1800);
            }
       }
    },
    movingOrNot : function(prevX,prevY,currentX,currentY){

        let X = 0;
        let Y = 0;
        if(prevX < currentX){
            X = currentX - prevX;
        }
        if(prevX > currentX){
            X = prevX - currentX;
        }
        if(prevY < currentY){
            Y = currentY - prevY
        }
        if(prevY > currentY){
            Y = prevY - currentY;
        }
        let distBetween2Points = 0;
        distBetween2Points = Math.sqrt((X*X) + (Y*Y))
        if(distBetween2Points > 2){
            console.log("moving the ball");
            return true;
        }
        return false;
    },
    checkBoundaryBall : function(target,touch){

        if((touch.getLocation().x >= cc.director.getWinSize().width * 0.1 ) && (touch.getLocation().x <= cc.director.getWinSize().width * 0.9 ) && (touch.getLocation().y >= cc.director.getWinSize().height * 0.05 ) && (touch.getLocation().y <= cc.director.getWinSize().height * 0.5 )){
            target.setPosition(touch.getLocation());
         //   console.log("default if touch condition ");
        }

        if(touch.getLocation().x < cc.director.getWinSize().width * 0.1 ){
            if((this.bubblePlayer.y >= cc.director.getWinSize().height * 0.05 ) && (this.bubblePlayer.y <= cc.director.getWinSize().height * 0.5 )){
                target.y = touch.getLocation().y;
           //     console.log(" left X fixed , Y coordinate Changes if condition ");
            }
        }
        if(touch.getLocation().x > cc.director.getWinSize().width * 0.9 ){
            if((this.bubblePlayer.y >= cc.director.getWinSize().height * 0.05 ) && (this.bubblePlayer.y <= cc.director.getWinSize().height * 0.5 )){
                target.y = touch.getLocation().y;
           //     console.log(" right X fixed , Y coordinate Changes if condition ");
            }
        }

        if((touch.getLocation().y > cc.director.getWinSize().height * 0.05 )){
            if((touch.getLocation().x >= cc.director.getWinSize().width * 0.1 ) && (touch.getLocation().x <= cc.director.getWinSize().width * 0.9 )){
                target.x = touch.getLocation().x;
           //     console.log(" bottom Y fixed , X coordinate changes if condition ");
            }
        }
        
        if((touch.getLocation().y < cc.director.getWinSize().height * 0.5 )){
            if((touch.getLocation().x >= cc.director.getWinSize().width * 0.1 ) && (touch.getLocation().x <= cc.director.getWinSize().width * 0.9 )){
                target.x = touch.getLocation().x;
           //     console.log(" top Y fixed , X coordinate changes if condition ");
            }
        }

        if(touch.getLocation().y >= (cc.director.getWinSize().height * 0.5)){
                    target.y= cc.director.getWinSize().height * 0.5;
         }

    },
    stateShootBubble : function(dt){
        this.bubblePlayer.x += (1.0 / 60) * 2500 * Math.cos(this.degToRad(this.player.angle));
        this.bubblePlayer.y += (1.0 / 60) * 2500 * -1 * Math.sin(this.degToRad(this.player.angle));

        if (this.bubblePlayer.x < (this.bubblePlayer.width/2)) {
            // Left edge
            this.player.angle = 180 - this.player.angle;
        } else if (this.bubblePlayer.x > cc.director.getWinSize().width - (this.bubblePlayer.width/2)) {
            // Right edge
            this.player.angle = 180 - this.player.angle;
        } 
        if (this.bubblePlayer.y > cc.director.getWinSize().height-(this.bubblePlayer.width/2)) {
            // Top collision
            this.player.angle = 360 - this.player.angle;
        }
    },

    levelAllInfo : function (currentLevel,totalCategory ,eachCategoryGroup , totalSceneTheme ,SceneChangeAfterLevel)
    {

        var categoryBase = Math.ceil(currentLevel / eachCategoryGroup);

        var categoryNo = totalCategory;
        
        if(categoryBase != totalCategory){
           categoryNo = categoryBase % totalCategory;
           if(categoryNo == 0)
                categoryNo = totalCategory;
        }
        
        if (currentLevel % eachCategoryGroup == 0){
            categoryNo = (categoryBase-1) % totalCategory + 1;
        }
        var sceneBase = Math.ceil(currentLevel / SceneChangeAfterLevel);
        var sceneNo = sceneBase % totalSceneTheme;

        var totalInterationLevel = totalCategory * eachCategoryGroup;
        var Iteration = Math.floor(currentLevel/totalInterationLevel);
        var level = currentLevel % eachCategoryGroup;
        if (level == 0)
            level = eachCategoryGroup;
        var categoryLevel = (Iteration * eachCategoryGroup) + level;

        if (sceneNo == 0)
            sceneNo = totalSceneTheme;
         return { category: categoryNo, scene: sceneNo,  level: categoryLevel };
    },


    gamePlay : function (correctObject){

       var size = 0.5;
       if(this.bubblePlayer.getName() == "pinatacity"){size = 0.7};
        if(this.bubblePlayer.getName() == "pinatajungle"){size = 1.0};
       var  halfAction = new cc.MoveTo(2,cc.p(((correctObject.width * size )/2) - (this.xPosi/2), cc.director.getWinSize().height * 0.85));
       var  initSequence = new cc.Sequence(new cc.ScaleTo(0.3,size), new cc.MoveTo(0.5,cc.p(cc.director.getWinSize().width/2, cc.director.getWinSize().height * 0.85)));
        
        var SequenceVal = new cc.Sequence(initSequence,halfAction);
        correctObject.runAction(SequenceVal);
        this.targetPlayer = correctObject;
        var classReference = this;
         setTimeout(function() {
              var  leftTOright = new cc.MoveTo(4,cc.p(((correctObject.width * size )/2) - (classReference.xPosi/2), cc.director.getWinSize().height * 0.85));
              var  rightTOleft = new cc.MoveTo(4,cc.p(cc.director.getWinSize().width - (correctObject.width * size/2) - (classReference.xPosi/2), cc.director.getWinSize().height * 0.85));
              var repeatForeverAction = new cc.RepeatForever(new cc.Sequence(rightTOleft,leftTOright));
              correctObject.runAction(repeatForeverAction);
         }, 2800);
        
        this.gameBg.node.getChildByName("board").visible = false;
        if(this.bubblePlayer.getName() == "pinatacream")
        this.gameBg.node.getChildByName("Panel_2").visible = false;

        this.bubblePlayer.visible = true;
        this.rightLine.visible = true;
        this.leftLine.visible = true;
        if(this.bubblePlayer.getName() == "pinatajungle"){
            this.gameBg.node.getChildByName("rightshoot").visible = true;
            this.gameBg.node.getChildByName("leftshoot").visible = true;
        }
        this.gameBg.node.getChildByName("right").visible = true;
        this.gameBg.node.getChildByName("left").visible = true;
        if(this.bubblePlayer.getName() == "pinatacity")
        this.gameBg.node.getChildByName("slingshot_16").visible = true;
      
        setTimeout(function() {
             classReference.gameBg.node.getChildByName("board").freezShooting = true;
        }, 0.8);
       
    },

    radToDeg : function (angle) {
        return angle * (180 / Math.PI);
    },

    // Convert degrees to radians
    degToRad : function (angle) {
        return angle * (Math.PI / 180);
    },
     getRandomInt : function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    runAnimations : function(AnimNode,x,y,path){
       
        var animation = ccs.actionTimelineCache.createAction(path,xc.path);
        AnimNode.node.runAction(animation);
        animation.gotoFrameAndPlay(0,false);
        AnimNode.node.setPosition(x + (this.xPosi/2) ,y);
        this.addChild(AnimNode.node);
        var classReference = this;
        setTimeout(function() {
            classReference.removeChild(AnimNode.node);
        }, 1000);
    }
})

xc.Pinata.res = {
   pinatacity_plist : xc.path +"pinatacity/pinatacity.plist",
   pinatacity_png : xc.path +"pinatacity/pinatacity.png",
   pinatacity_json : xc.path +"pinatacity/pinatacity.json",
   pinatacream_plist : xc.path +"pinatacream/pinatacream.plist",
   pinatacream_png : xc.path +"pinatacream/pinatacream.png",
   pinatacream_json : xc.path +"pinatacream/pinatacream.json",
   pinatacream_anim : xc.path +"pinatacream/pinatacreamanim.json",
   pinatacity_anim : xc.path +"pinatacity/pinatacityanim.json",
   
   pinatajungle_plist : xc.path +"jungle/junglec/junglec.plist",
   pinatajungle_png : xc.path +"jungle/junglec/junglec.png",
   pinatajungle_json : xc.path +"jungle/pinatajungle.json",
   pinatajungle_anim : xc.path +"jungle/target.json",
};      

