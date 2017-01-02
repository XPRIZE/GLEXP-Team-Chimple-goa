var xc = xc || {};

xc.PlayContentPanel = xc.AbstractContentPanel.extend({
    _constructedScene: null,
    ctor: function (width, height, position) {
        this._super(width, height, position);
        this.setPosition(position);
        this.loadScene();
    },

    changeScene: function () {
        if (xc.story != null && xc.story.items[xc.pageIndex].scene.Content != null) {
            this.putIntoCache();
            this.doPostLoadingProcessForScene(xc.PLAY_KEY);
        }
    },

    loadScene: function () {
        if (xc.story != null && xc.story.items[xc.pageIndex].scene.Content != null) {
            this.putIntoCache();
            this.doPostLoadingProcessForScene(xc.PLAY_KEY);
        }
    },

    putIntoCache: function () {
        cc.loader.cache[xc.PLAY_KEY] = xc.story.items[xc.pageIndex].scene;
    },

    doPostLoadingProcessForScene: function (fileToLoad) {
        if (fileToLoad == null) {
            return;
        }
    
        this._constructedScene = ccs.load(fileToLoad, xc.path + "wikitaki/");
        if (this._constructedScene != null) {
                if (this._constructedScene.node) {
                    this.addChild(this._constructedScene.node);
                    if (!cc.sys.isNative) {
                        this._constructedScene.node._renderCmd._dirtyFlag = 1;
                    }
                    this.postProcessForSceneObjects(this._constructedScene.node);
            }
            if (xc.story.items[xc.pageIndex].scene.scaleX
                && xc.story.items[xc.pageIndex].scene.scaleY) {
                this.setScale(xc.story.items[xc.pageIndex].scene.scaleX,
                    xc.story.items[xc.pageIndex].scene.scaleY);
            }

            if (xc.story.items[xc.pageIndex].scene.posX
                && xc.story.items[xc.pageIndex].scene.posY) {
                this.setPosition(cc.p(xc.story.items[xc.pageIndex].scene.posX,
                    xc.story.items[xc.pageIndex].scene.posY));
            }
        }
    },
    postProcessForSceneObjects: function (node) {
        node.children.forEach(function (element) {
                if (element.getName().indexOf("Skeleton") != -1 || element.getName().indexOf("skeleton") != -1) {
                    xc.CharacterUtil.loadSkeletonConfig(element);
                    
                    if (element.UserData && element.UserData.visibleSkins) {
                        xc.CharacterUtil.displaySkins(element, element.UserData.visibleSkins);
                    }
                    if (element.UserData && element.UserData.colorSkins) {
                        element.UserData.colorSkins.forEach(function (colorSkin) {
                            xc.CharacterUtil.colorSkins(element, colorSkin);
                    })}

                    if (element.UserData && element.UserData.currentAnimationName) {
                        element._currentAnimationName = element.UserData.currentAnimationName;
                    }
                }
        }, this);

        this.attachCustomObjectSkinToSkeleton(node);
    },
    backPressed: function () {
        xc.LAYER_INIT = false;
        xc.StoryScene.load(xc.StoryLayer);        
    },

    onEnter: function () {
        this._super();
    },

    onExit: function () {
        this._super();
    }

});
