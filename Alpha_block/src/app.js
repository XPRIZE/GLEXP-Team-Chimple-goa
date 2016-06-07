/// <reference path="../../cocos2d-typescript-definitions/cocos2d/cocos2d-lib.d.ts" />

var LoadingSceneLayer = cc.Layer.extend({
    sprite:null,
    tmp : null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        //  assigning current object to a variable
        var self = this;

        // size of window
        var size = cc.winSize;
        
//        var animations = new cc.Animation();
//        var spriteFrames = [];
        this.Loading_Screen = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Loading/loading_bg.png"));
        this.Loading_Screen.attr({
            x: size.width/2,
            y: size.height/2,
            anchorX : .5,
            anchorY : .5
        });
        self.addChild(this.Loading_Screen, 0);
        
        tmp = ccs.load(res1.MainScene_json);
        this.addChild(tmp.node);
        tmp.node.runAction(tmp.action);
        tmp.action.play("Loading", false);
        
        setTimeout(function(){
            cc.director.runScene(new LevelStateScene());
        },900);

//        var frame1 = cc.SpriteFrameCache.getSpriteFrame("");
        
/*                
        // Loading_Screen
        this.Loading_Screen = new cc.Sprite(res.Loading_Screen);
        this.Loading_Screen.attr({
            x: size.width/2,
            y: size.height/2,
            anchorX : .5,
            anchorY : .5
        });
        self.addChild(this.Loading_Screen, 0);
        
        // Loading bar
        var Loading_bar = new cc.Sprite(res.Loading_bar);
        Loading_bar.attr({
            x: size.width*50/100,
            y: size.height*40/100,
            anchorX : .5,
            anchorY : .5
        });
        self.addChild(Loading_bar, 0);

        // Loading_pts_1
        var Loading_pts_1 = new cc.Sprite(res.Loading_pts);
         Loading_pts_1.attr({
            x: size.width*25/100,
            y: size.height*40/100,
            anchorX : .5,
            anchorY : .5
        });
        self.addChild(Loading_pts_1, 0);
        Loading_pts_1.visible = false;
        
        // Loading_pts_2
        var Loading_pts_2 = new cc.Sprite(res.Loading_pts);
        Loading_pts_2.attr({
            x: size.width*30/100,
            y: size.height*40/100,
            anchorX : .5,
            anchorY : .5
        });
        self.addChild(Loading_pts_2, 0);
        Loading_pts_2.visible = false;
        
        // Loading_pts_3
        var Loading_pts_3 = new cc.Sprite(res.Loading_pts);
        Loading_pts_3.attr({
            x: size.width*35/100,
            y: size.height*40/100,
            anchorX : .5,
            anchorY : .5
        });
        self.addChild(Loading_pts_3, 0);
        Loading_pts_3.visible = false;
        
        // Loading_pts_4
        var Loading_pts_4 = new cc.Sprite(res.Loading_pts);
        Loading_pts_4.attr({
            x: size.width*40/100,
            y: size.height*40/100,
            anchorX : .5,
            anchorY : .5
        });
        self.addChild(Loading_pts_4, 0);
        Loading_pts_4.visible = false;
        
        // Loading_pts_5
        var Loading_pts_5 = new cc.Sprite(res.Loading_pts);
        Loading_pts_5.attr({
            x: size.width*45/100,
            y: size.height*40/100,
            anchorX : .5,
            anchorY : .5
        });
        self.addChild(Loading_pts_5, 0);
        Loading_pts_5.visible = false;
        
        // Loading_pts_6
        var Loading_pts_6 = new cc.Sprite(res.Loading_pts);
        Loading_pts_6.attr({
            x: size.width*50/100,
            y: size.height*40/100,
            anchorX : .5,
            anchorY : .5
        });
        self.addChild(Loading_pts_6, 0);
        Loading_pts_6.visible = false;
        
        // Loading_pts_7
        var Loading_pts_7 = new cc.Sprite(res.Loading_pts);
        Loading_pts_7.attr({
            x: size.width*55/100,
            y: size.height*40/100,
            anchorX : .5,
            anchorY : .5
        });
        self.addChild(Loading_pts_7, 0);
        Loading_pts_7.visible = false;
        
        // Loading_pts_8
        var Loading_pts_8 = new cc.Sprite(res.Loading_pts);
        Loading_pts_8.attr({
            x: size.width*60/100,
            y: size.height*40/100,
            anchorX : .5,
            anchorY : .5
        });
        self.addChild(Loading_pts_8, 0);
        Loading_pts_8.visible = false;
        
        // Loading_pts_9
        var Loading_pts_9 = new cc.Sprite(res.Loading_pts);
        Loading_pts_9.attr({
            x: size.width*65/100,
            y: size.height*40/100,
            anchorX : .5,
            anchorY : .5
        });
        self.addChild(Loading_pts_9, 0);
        Loading_pts_9.visible = false; 
        
        // Loading_pts_10
        var Loading_pts_10 = new cc.Sprite(res.Loading_pts);
        Loading_pts_10.attr({
            x: size.width*70/100,
            y: size.height*40/100,
            anchorX : .5,
            anchorY : .5
        });
        self.addChild(Loading_pts_10, 0);
        Loading_pts_10.visible = false;
        
        // Loading_pts_11
        var Loading_pts_11 = new cc.Sprite(res.Loading_pts);
        Loading_pts_11.attr({
            x: size.width*75/100,
            y: size.height*40/100,
            anchorX : .5,
            anchorY : .5
        });


//        var vv = cc.DelayTime(500);
//        var seq = new cc.sequence();

        setTimeout(function(){
                Loading_pts_1.visible = true;

            setTimeout(function(){
                    Loading_pts_2.visible = true;
            
                setTimeout(function(){
                        Loading_pts_3.visible = true;
            
                    setTimeout(function(){
                            Loading_pts_4.visible = true;
            
                        setTimeout(function(){
                                Loading_pts_5.visible = true;

                            setTimeout(function(){
                                   // Loading_pts_6.visible = true;
                            
                                setTimeout(function(){
                                   //     Loading_pts_7.visible = true;
                                
                                    setTimeout(function(){
                                  //          Loading_pts_8.visible = true;

                                        setTimeout(function(){
                                 //               Loading_pts_9.visible = true;
            
                                            setTimeout(function(){
                                         //           Loading_pts_10.visible = true;
                                            
                                                setTimeout(function(){
                                         //               Loading_pts_11.visible = true;
                                            
                                                    setTimeout(function(){
                                                            cc.director.runScene(new LevelStateScene());     
                                                    }, 500);        
                                                }, 500);        
                                            }, 500);        
                                        }, 500);        
                                    }, 500);
                                }, 500);
                            }, 500);
                        }, 500);
                    }, 500);
                }, 500);
        }, 500);
    }, 500);

          */

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
   /*     var helloLabel = new cc.LabelTTF("Whatsup Chimple", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2 + 200;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

        for(i=0; i<16; i++)
        {
            var tile = new MemoryTile();
            this.addChild(tile, 0);
            tile.setPosition(49+i%4*74, 400-Math.floor(i/4)*74);
        }
*/

/*
        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.sprite, 0);
*/
        return true;
    },
});


var LoadingScene = cc.Scene.extend({
    onEnter:function () {
            this._super();
                
        var layer = new LoadingSceneLayer();
        this.addChild(layer);
    }
});
/*
var MemoryTile = cc.Sprite.extend({
   ctor : function()
   {
       this._super();
       this.initWithFile(res.button);
       cc.eventManager.addListener(listener.clone(), this);
   }
});

var listener = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE, swallowTouches : true, onTouchBegan: function(touch, event)
    {
        var target = event.getCurrentTarget();
        var location = target.convertToNodeSpace(touch.getLocation());
        var targetSize = target.getContentSize();
        var targetRectangle = cc.rect(0,0, targetSize.width, targetSize.height);
        if(cc.rectContainsPoint(targetRectangle, location))
        {
            console.log("i picked a title");
        }
    }
});

*/