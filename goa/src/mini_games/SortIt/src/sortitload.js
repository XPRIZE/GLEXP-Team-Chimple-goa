

/// <reference path="../../cocos2d-typescript-definitions/cocos2d/cocos2d-lib.d.ts" />

var xc = xc || {};

xc.sortitloadLayer = cc.Layer.extend({
    
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();



var eventListener = cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                var location = target.convertToNodeSpace(touch.getLocation());
                var targetSize = target.getContentSize();
                var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);
                if (cc.rectContainsPoint(targetRectangle, location)) {
                    
                   xc.GameScene.load(xc.sortitlevel1Layer);
                    
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

      
        //var train = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("train/train.png"));
    
         this.homeScreen = new cc.Sprite(xc.sortitloadLayer.res.homeScreen_png);
         this.homeScreen.setAnchorPoint(0.5, 0.5 );
         this.homeScreen.setPosition(size.width / 2, size.height / 2); 
         this.addChild(this.homeScreen);
         cc.eventManager.addListener(eventListener.clone(), this.homeScreen);
        
         
        return true;
    }
});
/*
var sortitloadScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new xc.sortitloadLayer();
        this.addChild(layer);
    }
});
*/

xc.sortitloadLayer.res = {
        
    homeScreen_png : xc.path + "HelloWorld.png",
    
    
    comedyBubble_mp3:  "res/sounds/sortit/comedyBubble.ogg",
    explosive_mp3:  "res/sounds/sortit/explosive.ogg",
    failure_mp3:  "res/sounds/sortit/failure.ogg"
}









