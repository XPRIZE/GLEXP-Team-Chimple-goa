
/// <reference path="../../cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />

var DecmonLayer = cc.Layer.extend({
    sprite:null,
    eyeArray : null,
    self : null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;
        self = this;

        var listener = cc.EventListener.create({
            event : cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches : true,

            onTouchBegan : function(touch, event)
            {
                var target = event.getCurrentTarget();
                var location = target.convertToNodeSpace(touch.getLocation());
                var targetSize = target.getContentSize();
                var rect = cc.rect(0, 0, targetSize.width, targetSize.height);

                if(cc.rectContainsPoint(rect, location))
                {
                    if(target.id == "eye")
                    {
                        for(var i = 0; i<eyeArray.length; i++)
                            self.addChild(eyeArray[i]);
                    }
                    return true;
                }

                return false;
            }

        });

        eyeArray = new Array();

        var mainscenes = ccs.load(Decomon.decomon_main);
        this.addChild(mainscenes.node);

        var eye_icon = mainscenes.node.getChildByName("eye_7");
        eye_icon.id = "eye";

        cc.eventManager.addListener(listener.clone(), eye_icon);

        var decomoneye1 = ccs.load(Decomon.decomoneye_a);
        decomoneye1.node.attr({
            x : size.width * .12,
            y : size.height * .10
        });
//        this.addChild(decomoneye1.node);
        eyeArray.push(decomoneye1.node);

        var decomoneye2 = ccs.load(Decomon.decomoneye_b);
        decomoneye2.node.attr({
            x : size.width * .25,
            y : size.height * .10
        });
//        this.addChild(decomoneye2.node);
        eyeArray.push(decomoneye2.node);

        var decomoneye3 = ccs.load(Decomon.decomoneye_c);
        decomoneye3.node.attr({
            x : size.width * .36,
            y : size.height * .10
        });
 //       this.addChild(decomoneye3.node);
        eyeArray.push(decomoneye3.node);

        var decomoneye4 = ccs.load(Decomon.decomoneye_d);
        decomoneye4.node.attr({
            x : size.width * .50,
            y : size.height * .10
        });
   //     this.addChild(decomoneye4.node);
        eyeArray.push(decomoneye4.node);

        var decomoneye5 = ccs.load(Decomon.decomoneye_e);
        this.addChild(decomoneye5.node);

        var decomoneye6 = ccs.load(Decomon.decomoneye_f);
        this.addChild(decomoneye6.node);

        var decomoneye7 = ccs.load(Decomon.decomoneye_g);
        this.addChild(decomoneye7.node);

        var decomoneye8 = ccs.load(Decomon.decomoneye_h);
        this.addChild(decomoneye8.node);

        var decomoneye9 = ccs.load(Decomon.decomoneye_i);
        this.addChild(decomoneye9.node);
        
          var label = new cc.LabelTTF("res/fonts/BalooBhai-Regular.ttf", 1300);
          label.color = new cc.color(0,0,0);
          label.attr({
              x : 1800,
              y : 900
          });
          this.addChild(label); 
           return true;
    }
});

var DecmonScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new DecmonLayer();
        this.addChild(layer);
    }
});

