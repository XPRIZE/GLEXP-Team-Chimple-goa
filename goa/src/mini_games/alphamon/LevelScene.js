
var AlphamoleGameLevelScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new AlphamoleGameLevel();
        this.addChild(layer);
    }
});

var AlphamoleGameLevel = cc.Layer.extend( {

    ctor:function () {

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
    }




});