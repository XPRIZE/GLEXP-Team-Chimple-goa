
var xc = xc || {};

xc.Pinata = cc.Layer.extend({
  
  ctor:function () {
  
   this._super();
//this.gameBg.node.getChildByName("Panel_1").getChildByName("Button_10");
    var gameTheme = "";
    var gameRand = new Array(2);
    gameRand[0] = "pinatacity"; gameRand[1] ="pinatacream"
    gameTheme = gameRand[this.getRandomInt(0,1)];
    this.gameBg = null;
    this.stringColor = new cc.color(255,255,255,255);
    var playerGUI = "";
    var heightTolrence = 0;

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
    }
    this.addChild(this.gameBg.node);
    this.targetPlayer = null;

    this.player = {
        x : 0,
        y: 0,
        prevX : 0,
        prevY : 0,
        angle : 90
    }

    this.map =  goa.TextGenerator.getInstance().getAntonyms(3);
    var mapKeyArray = Object.keys(this.map);
    this.mapKey = mapKeyArray[this.getRandomInt(0,(mapKeyArray.length-1))];
        

    var board = this.gameBg.node.getChildByName("board");
    var boardText = new cc.LabelTTF(""+this.mapKey,"res/fonts/Marker Felt.ttf",120);
    boardText.setName(board.getName());
    boardText.setPosition(board.width/2,board.height/2);                    
    board.addChild(boardText);
    if(gameTheme == "pinatacream"){
        boardText.setColor(new cc.color(155 ,42,50,255));
    }

    var targetA = this.gameBg.node.getChildByName("targeta");
    var targetAText = new cc.LabelTTF(""+this.map[mapKeyArray[0]],"res/fonts/Marker Felt.ttf",120);
    targetAText.setName(targetA.getName());
    targetAText.setPosition(targetA.width/2,targetA.height/2 - heightTolrence);                      
    targetA.addChild(targetAText);

    var targetB = this.gameBg.node.getChildByName("targetb");
    var targetBText = new cc.LabelTTF(""+this.map[mapKeyArray[1]],"res/fonts/Marker Felt.ttf",120);
    targetBText.setName(targetB.getName());
    targetBText.setPosition(targetB.width/2,targetB.height/2 - heightTolrence);                      
    targetB.addChild(targetBText);

    var targetC = this.gameBg.node.getChildByName("targetc");
    var targetCText = new cc.LabelTTF(""+this.map[mapKeyArray[2]],"res/fonts/Marker Felt.ttf",120);
    targetCText.setName(targetC.getName());
    targetCText.setPosition(targetC.width/2,targetC.height/2 - heightTolrence);                      
    targetC.addChild(targetCText);

    this.bubblePlayer =  new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(playerGUI));
    this.bubblePlayer.setName(gameTheme);
    this.bubblePlayer.setPosition((this.gameBg.node.getChildByName("left").x + this.gameBg.node.getChildByName("right").x) /2,cc.director.getWinSize().height * 0.2);
    this.addChild(this.bubblePlayer,1);
    this.player.x = this.bubblePlayer.x;    this.player.y = this.bubblePlayer.y;
    
    this.rightLine = new cc.DrawNode();
    this.rightLine.drawSegment(cc.p(this.gameBg.node.getChildByName("right").x,this.gameBg.node.getChildByName("right").y), cc.p(this.player.x + (this.bubblePlayer.width/2),this.player.y),5,this.stringColor);
    this.addChild(this.rightLine);

    this.leftLine = new cc.DrawNode(); 
    this.leftLine.drawSegment(cc.p(this.gameBg.node.getChildByName("left").x,this.gameBg.node.getChildByName("left").y),cc.p(this.player.x - (this.bubblePlayer.width/2),this.player.y),5,this.stringColor);
    this.addChild(this.leftLine);

    this.bubblePlayer.visible = false;
    this.rightLine.visible = false;
    this.leftLine.visible = false;

    this.gameBg.node.getChildByName("right").visible = false;
    this.gameBg.node.getChildByName("left").visible = false;
    this.gameBg.node.getChildByName("board").freezShooting = false;
    if(this.bubblePlayer.getName() == "pinatacity")
    this.gameBg.node.getChildByName("slingshot_16").visible = false;


    var classReference = this;
    var listnerBg = cc.EventListener.create({event: cc.EventListener.TOUCH_ONE_BY_ONE, swallowTouches: false,
            onTouchBegan :function(touch, event){
                var target = event.getCurrentTarget();
                var targetSize = target.getContentSize();
                var location = target.convertToNodeSpace(touch.getLocation());
                var targetRectangle = cc.rect(0,0, target.width, target.height);
                if(classReference.gameBg.node.getChildByName("board").freezShooting){
                    if (cc.rectContainsPoint(targetRectangle, location)){return true;}
                }
                return false;
            },
            onTouchMoved : function(touch, event){
                var target = event.getCurrentTarget();
                target.setPosition(touch.getLocation());

                if(classReference.rightLine != undefined){
                    classReference.removeChild(classReference.rightLine);
                }
                classReference.rightLine = new cc.DrawNode();
                classReference.rightLine.drawSegment(cc.p(classReference.gameBg.node.getChildByName("right").x,classReference.gameBg.node.getChildByName("right").y), cc.p(touch.getLocation().x + (classReference.bubblePlayer.width/2),touch.getLocation().y),5,classReference.stringColor);
                classReference.addChild(classReference.rightLine);

                if(classReference.leftLine != undefined){
                    classReference.removeChild(classReference.leftLine);
                }
                classReference.leftLine = new cc.DrawNode();
                classReference.leftLine.drawSegment(cc.p(classReference.gameBg.node.getChildByName("left").x,classReference.gameBg.node.getChildByName("left").y), cc.p(touch.getLocation().x - (classReference.bubblePlayer.width/2),touch.getLocation().y),5,classReference.stringColor);
                classReference.addChild(classReference.leftLine);

                return true;
            },
            onTouchEnded : function(touch, event){
                classReference.player.angle = classReference.radToDeg(Math.atan2((touch.getLocation().y - classReference.player.y),(-touch.getLocation().x + classReference.player.x)));

                if(classReference.rightLine != undefined){
                    classReference.removeChild(classReference.rightLine);
                }
                classReference.rightLine = new cc.DrawNode();
                classReference.rightLine.drawSegment(cc.p(classReference.gameBg.node.getChildByName("right").x,classReference.gameBg.node.getChildByName("right").y), cc.p(classReference.player.x - 10,classReference.player.y),5,classReference.stringColor);
                classReference.addChild(classReference.rightLine);

                if(classReference.leftLine != undefined){
                    classReference.removeChild(classReference.leftLine);
                }
                classReference.leftLine = new cc.DrawNode();
                classReference.leftLine.drawSegment(cc.p(classReference.gameBg.node.getChildByName("left").x,classReference.gameBg.node.getChildByName("left").y),cc.p(classReference.player.x + 10,classReference.player.y),5,classReference.stringColor);
                classReference.addChild(classReference.leftLine);
                classReference.shootingFlag = true;
            }
     });

    var choosingListner = cc.EventListener.create({event: cc.EventListener.TOUCH_ONE_BY_ONE, swallowTouches: false,
            onTouchBegan :function(touch, event){
                var target = event.getCurrentTarget();
                var location = target.convertToNodeSpace(touch.getLocation());
                var targetRectangle = cc.rect(0,0, target.width, target.height);
                if (cc.rectContainsPoint(targetRectangle, location)){return true;}
 
                return false;
            },
            onTouchEnded : function(touch, event){
                var target = event.getCurrentTarget();
                var path = "";
                if(classReference.bubblePlayer.getName() == "pinatacity"){
                    path = xc.Pinata.res.pinatacity_anim;
                }else if(classReference.bubblePlayer.getName() == "pinatacream"){
                    path = xc.Pinata.res.pinatacream_anim;
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
                }


                
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
       
       if(this.shootingFlag){
           this.stateShootBubble(dt);
           if(!(this.bubblePlayer.y >=0)){               
               this.bubblePlayer.setPosition((this.gameBg.node.getChildByName("left").x + this.gameBg.node.getChildByName("right").x) /2,cc.director.getWinSize().height * 0.2);
               this.player.x = this.bubblePlayer.x;    this.player.y = this.bubblePlayer.y;
               this.shootingFlag = false;
           }
       }
        if(this.shootingFlag){                
            if(cc.rectIntersectsRect(this.bubblePlayer.getBoundingBox(), this.targetPlayer.getBoundingBox())){
                this.shootingFlag = false;

                var path = "";
                if(this.bubblePlayer.getName() == "pinatacity"){
                    path = xc.Pinata.res.pinatacity_anim;
                }else if(this.bubblePlayer.getName() == "pinatacream"){
                    path = xc.Pinata.res.pinatacream_anim;
                }

                this.runAnimations(ccs.load(path,xc.path),this.targetPlayer.x,this.targetPlayer.y,path);
                this.gameBg.node.getChildByName("board").freezShooting = false;
                this.removeChild(this.bubblePlayer);
                this.gameBg.node.removeChild(this.targetPlayer);
                var classReference = this;
                setTimeout(function() {
                    if (cc.sys.isNative) {
                         var menuContext = classReference.getParent().menuContext;
                         menuContext.showScore();
                    }else{
                        xc.GameScene.load(xc.Pinata);
                    }
                }, 1800);
            }
       }
    },

    stateShootBubble : function(dt){
        this.bubblePlayer.x += dt * 2500 * Math.cos(this.degToRad(this.player.angle));
        this.bubblePlayer.y += dt * 2500 * -1 * Math.sin(this.degToRad(this.player.angle));

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
    gamePlay : function (correctObject){

       var  halfAction = new cc.MoveTo(2,cc.p(correctObject.width/2, cc.director.getWinSize().height * 0.9));
       var size = 0.5;
       if(this.bubblePlayer.getName() == "pinatacity"){size = 0.7}
       var  initSequence = new cc.Sequence(new cc.ScaleTo(0.3,size), new cc.MoveTo(0.5,cc.p(cc.director.getWinSize().width/2, cc.director.getWinSize().height * 0.9)));
        
        var SequenceVal = new cc.Sequence(initSequence,halfAction);
        correctObject.runAction(SequenceVal);
        this.targetPlayer = correctObject;
        var classReference = this;
         setTimeout(function() {
              var  leftTOright = new cc.MoveTo(4,cc.p(correctObject.width/2, cc.director.getWinSize().height * 0.9));
              var  rightTOleft = new cc.MoveTo(4,cc.p(cc.director.getWinSize().width - correctObject.width/2, cc.director.getWinSize().height * 0.9));
              var repeatForeverAction = new cc.RepeatForever(new cc.Sequence(rightTOleft,leftTOright));
              correctObject.runAction(repeatForeverAction);
         }, 2800);
        
        this.gameBg.node.getChildByName("board").visible = false;
        if(this.bubblePlayer.getName() == "pinatacream")
        this.gameBg.node.getChildByName("Panel_2").visible = false;

        this.bubblePlayer.visible = true;
        this.rightLine.visible = true;
        this.leftLine.visible = true;
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
        AnimNode.node.setPosition(x,y);
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
   pinatacity_anim : xc.path +"pinatacity/pinatacityanim.json"
};      

