
var AlphamoleGameLevelScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new AlphamoleGameLevel();
        this.addChild(layer);
    }
});

var AlphamoleGameLevel = cc.Layer.extend( {

    ctor:function () {
        this._super();
    var size = cc.winSize;
     /*   var scrollView = ccui.ScrollView.create();
        scrollView.setTouchEnabled(true);
        scrollView.setBounceEnabled(true);
        scrollView.setBackGroundColor(cc.green());
        scrollView.setBackGroundColorType(ccs.LayoutBackGroundColorType.solid);
        scrollView.setDirection(ccs.ScrollViewDir.both);
        scrollView.setInnerContainerSize(cc.size(480, 320));
        scrollView.setSize(cc.size(100, 100));
        var scrollViewSize = scrollView.getSize();

        var backgroundSize = background.getContentSize();
        scrollView.setPosition(cc.p((widgetSize.width - backgroundSize.width) / 2 +
            (backgroundSize.width - scrollViewSize.width) / 2,
            (widgetSize.height - backgroundSize.height) / 2 +
                (backgroundSize.height - scrollViewSize.height) / 2));
        scrollView.scrollToPercentBothDirection(cc.p(50, 50), 1, true);

        this._uiLayer.addWidget(scrollView);

        var imageView = ccs.ImageView.create();
        imageView.loadTexture("res/cocosgui/Hello.png");
        imageView.setPosition(cc.p(240,160));
        scrollView.addChild(imageView);

        return true;
    }*/

    var alphabet_str = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    var alpha_width = 350;
    var alpha_height = 400;
    var count = 0;
    var level_alpha = null;
    self = this;
    for(var i = 1 ; i < 5 ;i++){
        for(var j = 1; j<8; j++){
            if (count < 26){
                level_alpha = ccs.load("res/english/"+alphabet_str[count]+".json","res/SD/");
                level_alpha.node.x = alpha_width*j - size.width * 0.05;
                level_alpha.node.y = size.height -  alpha_height*i;
                level_alpha.node.setContentSize(150,200);
                level_alpha.node.setName(alphabet_str[count]);
                level_alpha.node.setScale(0.5,0.5);
                count ++;
                cc.eventManager.addListener(cc.EventListener.create({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                 swallowTouches:true,  
                 onTouchBegan: this.onTouchBegan,}) ,level_alpha.node);

                this.addChild(level_alpha.node,"alpha");
            }
       
        }
    }


    },

    onTouchBegan: function(touch, event){
         var target = event.getCurrentTarget();
         var location = target.convertToNodeSpace(touch.getLocation());
         var targetSize = target.getContentSize();
         var targetRectangle = cc.rect(target.getPositionX()- 75, target.getPositionY(), targetSize.width, targetSize.height);
        // var targetRectangle = target.getBoundingBox();
         if (cc.rectContainsPoint(targetRectangle, touch.getLocation()))
                   {
                     cc.log("clicked on %s",target.getName());  
                     cc.director.runScene(new AlphamoneGameLayer(target.getName()));
                     //AlphamoneGameLayer 
                    }
                             return false;
                   }




});