var xc = xc || {};

var FrontLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this._name = "FrontLayer";
        return true;
    }
});

var BackLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this._name = "BackLayer";
        return true;
    }
});



xc.AbstractContentPanel = cc.LayerColor.extend({
    ctor: function (width, height, position) {
        this._super(cc.color.WHITE, width, height);
        this._backLayer = new BackLayer();
        this.addChild(this._backLayer);
        this._frontLayer = new FrontLayer();
        this.addChild(this._frontLayer);
    },
    
    attachCustomObjectSkinToSkeleton: function (constructedScene) {
        var customSkinName = null;
        var skeleton = null;
        if (constructedScene && constructedScene.children) {
            var result = constructedScene.children.filter(function (d) {
                return d && d.UserData && d.UserData.userCustomObjectSkin;
            });
            if (result && result.length == 0) {
                result = constructedScene.children.filter(function (d) {
                    return d && d.getComponent('ComExtensionData')
                        && d.getComponent('ComExtensionData').getCustomProperty() 
                        && JSON.parse(d.getComponent('ComExtensionData').getCustomProperty()).userCustomObjectSkin;                
                });
            }
            var cScene = constructedScene;
            result.forEach(function (skeleton) {
                if (skeleton && skeleton.getComponent('ComExtensionData') && skeleton.getComponent('ComExtensionData').getCustomProperty()
                    && skeleton.getComponent('ComExtensionData').getCustomProperty()) {
                    customSkinName = JSON.parse(skeleton.getComponent('ComExtensionData').getCustomProperty()).userCustomObjectSkin.skin;
                    var skinNodeArray = cScene.children.filter(function (d) { return d.getName() === customSkinName });
                    skinNodeArray.forEach(function (skinNode) {
                        skinNode.setPosition(0, 0);
                        skinNode.removeFromParent();
                        var boneName = xc.HAND_GEAR_LEFT;
                        var bone = skeleton.getBoneNode(boneName);
                        bone.addSkin(skinNode, true);
                        bone.displaySkin(bone.getSkins()[bone.getSkins().length - 1], true);
                    }, this);
                } else if (skeleton && skeleton.UserData && skeleton.UserData.userCustomObjectSkin) {
                    customSkinName = skeleton.UserData.userCustomObjectSkin.skin;
                    var skinNodeArray = cScene.children.filter(function (d) { return d.getName() === customSkinName });
                    skinNodeArray.forEach(function (skinNode) {
                        skinNode.setPosition(0, 0);
                        skinNode.removeFromParent();
                        var boneName = xc.HAND_GEAR_LEFT;
                        var bone = skeleton.getBoneNode(boneName);
                        bone.addSkin(skinNode, true);
                        bone.displaySkin(bone.getSkins()[bone.getSkins().length - 1], true);
                    }, this);
                }

            }, this);
        }
    }
});