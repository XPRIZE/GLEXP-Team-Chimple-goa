
var xc = xc || {};

xc.Pinata = cc.Layer.extend({
  
  ctor:function () {
  
   this._super();

    cc.spriteFrameCache.addSpriteFrames(xc.Pinata.res.pinata_plist);

    var gameBg =  new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("pinata/bg-01.png"));
    gameBg.setPosition(0,0);    gameBg.setAnchorPoint(0,0);   this.addChild(gameBg);

    this.player = {
        x : 0,
        y: 0,
        prevX : 0,
        prevY : 0,
        angle : 90
    }

    console.log("width : "+cc.director.getWinSize().width+"  height "+cc.director.getWinSize().height);
    this.bubblePlayer =  new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("pinata/player.png"));
    this.bubblePlayer.setPosition(cc.director.getWinSize().width * 0.5,cc.director.getWinSize().height * 0.2);
    this.addChild(this.bubblePlayer,1);
    this.player.x = this.bubblePlayer.x;    this.player.y = this.bubblePlayer.y;
    
    this.rightLine = new cc.DrawNode();
    this.rightLine.drawSegment(cc.p(this.player.x - (this.bubblePlayer.width *2),this.player.y), cc.p(this.player.x - (this.bubblePlayer.width/2),this.player.y),5);
    this.addChild(this.rightLine);

    this.leftLine = new cc.DrawNode();
    this.leftLine.drawSegment(cc.p(this.player.x + (this.bubblePlayer.width * 2),this.player.y),cc.p(this.player.x + (this.bubblePlayer.width/2),this.player.y),5);
    this.addChild(this.leftLine);


    var classReference = this;
    
    var listnerBg = cc.EventListener.create({event: cc.EventListener.TOUCH_ONE_BY_ONE, swallowTouches: false,

            onTouchBegan :function(touch, event){
                return true;
            },
            onTouchMoved : function(touch, event){  
                var target = event.getCurrentTarget();
                target.setPosition(touch.getLocation());

                if(classReference.rightLine != undefined){
                    classReference.removeChild(classReference.rightLine);
                }
                classReference.rightLine = new cc.DrawNode();
                classReference.rightLine.drawSegment(cc.p(classReference.player.x - (classReference.bubblePlayer.width *2),classReference.player.y), cc.p(touch.getLocation().x - (classReference.bubblePlayer.width/2),touch.getLocation().y),5);
                classReference.addChild(classReference.rightLine);

                if(classReference.leftLine != undefined){
                    classReference.removeChild(classReference.leftLine);
                }
                classReference.leftLine = new cc.DrawNode();
                classReference.leftLine.drawSegment(cc.p(classReference.player.x + (classReference.bubblePlayer.width *2),classReference.player.y), cc.p(touch.getLocation().x + (classReference.bubblePlayer.width/2),touch.getLocation().y),5);
                classReference.addChild(classReference.leftLine);

                return true;
            },
            onTouchEnded : function(touch, event){
                classReference.player.angle = classReference.radToDeg(Math.atan2((touch.getLocation().y - classReference.player.y),(-touch.getLocation().x + classReference.player.x)));

                if(classReference.rightLine != undefined){
                    classReference.removeChild(classReference.rightLine);
                }
                classReference.rightLine = new cc.DrawNode();
                classReference.rightLine.drawSegment(cc.p(classReference.player.x - (classReference.bubblePlayer.width *2),classReference.player.y), cc.p(classReference.player.x + 10,classReference.player.y),5);
                classReference.addChild(classReference.rightLine);

                if(classReference.leftLine != undefined){
                    classReference.removeChild(classReference.leftLine);
                }
                classReference.leftLine = new cc.DrawNode();
                classReference.leftLine.drawSegment(cc.p(classReference.player.x + (classReference.bubblePlayer.width * 2),classReference.player.y),cc.p(classReference.player.x - 10,classReference.player.y),5);
                classReference.addChild(classReference.leftLine);
                classReference.shootingFlag = true;
            }
     });
      
    cc.eventManager.addListener(listnerBg,this.bubblePlayer);

    this.scheduleUpdate();
    
    return true;
    
  },
  
    update : function (dt) {
       
       if(this.shootingFlag){
           this.stateShootBubble(dt);
           if(!(this.bubblePlayer.y >=0)){               
               this.bubblePlayer.setPosition(cc.director.getWinSize().width * 0.5,cc.director.getWinSize().height * 0.2);
               this.player.x = this.bubblePlayer.x;    this.player.y = this.bubblePlayer.y;
               this.shootingFlag = false;
           }
       }
    },

    stateShootBubble : function(dt){
        this.bubblePlayer.x += dt * 2500 * Math.cos(this.degToRad(this.player.angle));
        this.bubblePlayer.y += dt * 2500 * -1 * Math.sin(this.degToRad(this.player.angle));

        if (this.bubblePlayer.x <= (this.bubblePlayer.width/2)) {
            // Left edge
            this.player.angle = 180 - this.player.angle;
        } else if (this.bubblePlayer.x >= cc.director.getWinSize().width - (this.bubblePlayer.width/2)) {
            // Right edge
            this.player.angle = 180 - this.player.angle;
        } 
        if (this.bubblePlayer.y >= cc.director.getWinSize().height-(this.bubblePlayer.width/2)) {
            // Top collision
            this.player.angle = 360 - this.player.angle;
        }
    },

    radToDeg : function (angle) {
        return angle * (180 / Math.PI);
    },

    // Convert degrees to radians
    degToRad : function (angle) {
        return angle * (Math.PI / 180);
    }
})

xc.Pinata.res = {
    pinata_plist : xc.path +"pinata/pinata.plist",
    pinata_png : xc.path +"pinata/pinata.png",
};      

