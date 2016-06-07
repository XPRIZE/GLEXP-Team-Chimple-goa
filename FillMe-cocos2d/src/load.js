/// <reference path="../../cocos2d-typescript-definitions/cocos2d/cocos2d-lib.d.ts" />
var loadLayer = cc.Layer.extend({
    angle:0,
    init:function () {
        this._super(cc.color.WHITE);
        
    },
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        this.scheduleUpdate();


var eventListener = cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                var location = target.convertToNodeSpace(touch.getLocation());
                var targetSize = target.getContentSize();
                var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);
                if (cc.rectContainsPoint(targetRectangle, location)) {
                    
                    cc.director.runScene(new Scene(
                       
                       Data[sceneId][0], 
                       Data[sceneId][1], 
                       Data[sceneId][2],
                       Data[sceneId][3],
                       Data[sceneId][4],
                       Data[sceneId][5],
                       Data[sceneId][6][0],
                       Data[sceneId][6][1],
                       Data[sceneId][7][0],
                       Data[sceneId][7][1]
                       
                        
                    ));
                    
                }
                //console.log('touche po oe: ' + targetSize);   
                return true;
            }

        }, this);


        /////////////////////////////
        // 2. add a menu item with "X" imajzjge, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label

       
         this.homeScreen = new cc.Sprite(res.homeScreen_png);
         this.homeScreen.setAnchorPoint(0.5, 0.5 );
         this.homeScreen.setPosition(size.width / 2, size.height / 2); 
        // this.homeScreen.setScale(0.5, 0.5);
         this.addChild(this.homeScreen);
         cc.eventManager.addListener(eventListener.clone(), this.homeScreen);
        
         
        return true;
    },
    update: function () {
        
        
        //this.homeScreen.angle +=1.5;
        //this.homeScreen.rotation += 0.05;
        this.angle+=2.5;
        this.homeScreen.setRotation(this.angle);
    }
});


var loadScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        
        var ws = cc.director.getWinSize();
        var colorLayer = new cc.LayerColor(cc.color(0, 191, 255), ws.width, ws.height);
        colorLayer.ignoreAnchorPointForPosition(false);

        //Set Position
        colorLayer.x = ws.width / 2;
        colorLayer.y = ws.height / 2;

        //Add to scene
        this.addChild(colorLayer);
        
        var layer = new loadLayer();
        this.addChild(layer);
    }
});





























