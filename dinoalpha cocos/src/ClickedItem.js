var ClickedButtonToRedirect = cc.Sprite.extend({

    ctor: function (imageFile, redirectGameScene, levelLayer) {
        this._super(cc.spriteFrameCache.getSpriteFrame(imageFile));
        this._levelLayer = levelLayer;
        var sprite_click = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE, swallowTouches: true,

            onTouchBegan: function (touch, event) {

                var target = event.getCurrentTarget();
                var location = target.convertToNodeSpace(touch.getLocation());
                var targetSize = target.getContentSize();
                var targetRectangle = cc.rect(0, 0, target.width, target.height);
                    
                    
                if (cc.rectContainsPoint(targetRectangle, location)) {
                   
                   if("clickedBg" == redirectGameScene){
                      
                       console.log("touch x : "+touch.getLocation().x + " touch y: "+touch.getLocation().y);
                   }
                   
                    if ("Level1Scene" == redirectGameScene) {
                        cc.director.runScene(new Level11Scene());
                    }
                    if ("Level2Scene" == redirectGameScene) {
                        cc.director.runScene(new Level12Scene());
                    }
                    if ("Level3Scene" == redirectGameScene) {
                        cc.director.runScene(new Level13Scene());
                    }
                    else if ("menus" == redirectGameScene) {
                        cc.director.runScene(new HelloWorldScene());
                    }
                    else if ("nxt" == redirectGameScene) {
                      // toCallLevel1ScenePopupElement.toRemoveCompletePopup();
                        cc.director.runScene(new Level12Scene());
                    }
                    else if ("nxt1" == redirectGameScene) {
                      //  toCallLevel2ScenePopupElement.toRemoveCompletePopup();
                        cc.director.runScene(new Level13Scene());
                    }
                    else if ("popupMenu" == redirectGameScene) {
                        target._levelLayer.toPopUpMenuVisible();
                    }
                    else if ("popupMenu2" == redirectGameScene) {
                        target._levelLayer.toPopUpMenuVisible();
                    }
                    else if ("popupMenu3" == redirectGameScene) {
                        target._levelLayer.toPopUpMenuVisible();
                    }
                    else if ("no1" == redirectGameScene) {
                        target._levelLayer.toRemovePopup();
                    }
                    else if ("no2" == redirectGameScene) {
                         target._levelLayer.toRemovePopup();
                    }
                    else if ("no3" == redirectGameScene) {
                         target._levelLayer.toRemovePopup();
                    }
                    return true;
                }
            }
        });
        cc.eventManager.addListener(sprite_click, this);
    }
});
