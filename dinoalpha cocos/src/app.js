/// <reference path="../../../../cocos2d-typescript-definitions/cocos2d/cocos2d-lib.d.ts" />
var toCallLevel1ScenePopupElement = null;
var toCallLevel2ScenePopupElement = null;
var toCallLevel3ScenePopupElement = null;
var self = null;

var HelloWorldLayer = cc.Layer.extend({
sprite:null,
ctor:function ()
 {     
    this._super();
    var size = cc.winSize;
        
     cc.spriteFrameCache.addSpriteFrames(res.dinomenu);
     var sprite1 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("bones8-01.png"));
     sprite1.attr({
         x : cc.winSize.width/2,
         y : cc.winSize.height/2,
         anchorX : .5,
         anchorY : .5
     });
      this.addChild(sprite1);
      
     var sprite2 = new ClickedButtonToRedirect("menu/dino1.png","Level1Scene",this);
     sprite2.attr({
         x : 500,
         y : 835,
         anchorX : .5,
         anchorY : .5
     });
      this.addChild(sprite2);
      
     var sprite1 = new ClickedButtonToRedirect("menu/dino2.png","Level2Scene",this);
     sprite1.attr({
         x : 1150,
         y : 1070,
         anchorX : .5,
         anchorY : .5
     });
      this.addChild(sprite1);
      
     var sprite1 = new ClickedButtonToRedirect("menu/dino3.png","Level3Scene",this);
     sprite1.attr({
         x : 2070,
         y : 800,
         anchorX : .5,
         anchorY : .5
     });
      this.addChild(sprite1);
      
    
     var sprite1 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/soundon.png"));
     sprite1.attr({
         x : 2400,
         y : 1700,
         anchorX : .5,
         anchorY : .5
     });
     // this.addChild(sprite1);
      
     var musicButton = new ccui.Button("menu/soundon.png","menu/soundoff.png",null,ccui.Widget.PLIST_TEXTURE);
       musicButton.attr({
         x : 2400,
         y : 1700,
         anchorX : .5,
         anchorY : .5
     });
      this.addChild( musicButton);
      
    // cc.audioEngine.playMusic(res.Backmusic, true);
     return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});
