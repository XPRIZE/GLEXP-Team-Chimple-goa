/// <reference path="../../../../cocos2d-typescript-definitions/cocos2d/cocos2d-lib.d.ts" />

var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();

        var size = cc.winSize;
        cc.spriteFrameCache.addSpriteFrames(res.whackAMole_Home_plist);
        this.sprite = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("HomeScreen.png"));
        this.sprite.x = (640/1280)*size.width;
        this.sprite.y = (400/800)*size.height;
        this.addChild(this.sprite, 0);
   
        this.start_button = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Home_Start.png"));
        this.start_button.x = (1020/1280)*size.width;
        this.start_button.y = (90/800)*size.height;
        this.start_button.id = "start_button";
        this.addChild(this.start_button, 0);
       
       var rotateTo11 = new cc.RotateTo(0.5, 5.0);
       var rotateTo22 = new cc.RotateTo(0.5, -5.0);
       var delay = new cc.DelayTime(0.1);
       var seq = new cc.Sequence(rotateTo11, delay, rotateTo22,delay);
       this.start_button.runAction(new cc.RepeatForever(seq));

        
        // this.spriteSheet = new cc.SpriteBatchNode(res.whackAMole_Home_png);
        // this.addChild(this.spriteSheet,2);

        // var animFrames = [];
        // for (var i = 1; i < 12; i++) {
        //     var str = "HomeSprite_" + i + ".png";
        //     var frame = cc.spriteFrameCache.getSpriteFrame(str);
        //     animFrames.push(frame);
        // }

        // var animation = new cc.Animation(animFrames, 0.1,10);
        // this.runningAction = new cc.Animate(animation);
        // this.sprite1 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("HomeSprite_1.png"));
        // this.sprite1.attr({x:(600/1280)*size.width, y:(500/800)*size.height});
        // this.sprite1.runAction(this.runningAction);
        // this.spriteSheet.addChild(this.sprite1,2);
        
        
    
        
       cc.eventManager.addListener(cc.EventListener.create(  
    {
         event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , this.start_button);

        return true;
    },
     onTouchBegan: function(touch, event){
         var target = event.getCurrentTarget();
         var location = target.convertToNodeSpace(touch.getLocation());
         var targetSize = target.getContentSize();
         var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);
         if (cc.rectContainsPoint(targetRectangle, location))
                   {
                          if(target.id == "start_button"){ 
                              cc.LoaderScene.preload(g_resources_levels, function(){ 
                                cc.director.runScene(new Level1Scene());                            
                                  });
                   }}
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

