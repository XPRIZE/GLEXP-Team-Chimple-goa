

var AnimationDemo = cc.Layer.extend({
    
    ctor : function (){
    this._super();
        
      var AnimationScreenBackground = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Trans_Image.png"));
         AnimationScreenBackground.setPosition(cc.director.getWinSize().width/2, cc.director.getWinSize().height/2);
         AnimationScreenBackground.setScale(1.5,2);
        this.addChild(AnimationScreenBackground);
     
     // Create sprite and set attributes
    this.spriteBubble = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("B1.png"));   
    
    this.spriteBubble.attr({
        x: cc.director.getWinSize().width/2,
        y: cc.director.getWinSize().height/2,
        scale: 3,
        rotation: 0
    });
    this.addChild(this.spriteBubble, 0);

// Load sprite frames to frame cache, add texture node
    cc.spriteFrameCache.addSpriteFrames(res.BubbleBlast_plist);
    var spriteBubbleTexture = cc.textureCache.addImage(res.BubbleBlast_png),
        spriteBubbleImages  = cc.SpriteBatchNode.create(spriteBubbleTexture);
    this.addChild(spriteBubbleImages);

    var animFrames = [];
    var str = "";
    for (var i = 1; i <= 7; i++) {
        str = "B" + i + ".png";
        var spriteFrame = cc.spriteFrameCache.getSpriteFrame(str);
        var animFrame = new cc.AnimationFrame();
            animFrame.initWithSpriteFrame(spriteFrame, 1, null);
        animFrames.push(animFrame);
    }
    var animation = cc.Animation.create(animFrames, 0.08, 1);
    var animate   = cc.Animate.create(animation); 

    this.spriteBubble.runAction(animate); 
    this.spriteBubble.color = new cc.color(255,0,0);
        
    }
    
});

var AnimationDemoScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        
        var animationDemo = new AnimationDemo();
        this.addChild(animationDemo);
       
    }
});