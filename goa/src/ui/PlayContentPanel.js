var chimple = chimple || {};
chimple.PlayContentPanel = chimple.AbstractContentPanel.extend({
    _constructedScene: null,
    ctor: function (width, height, position) {
        this._super(width, height, position);
        this.setPosition(position);
        this.loadScene();
    },

    changeScene: function () {
        if (chimple.story != null && chimple.story.items[chimple.pageIndex].scene.Content != null) {
            this.putIntoCache();
            this.doPostLoadingProcessForScene(chimple.PLAY_KEY);
        }
    },

    loadScene: function () {
        if (chimple.story != null && chimple.story.items[chimple.pageIndex].scene.Content != null) {
            this.putIntoCache();
            this.doPostLoadingProcessForScene(chimple.PLAY_KEY);
        }
    },

    putIntoCache: function () {
        cc.loader.cache[chimple.PLAY_KEY] = chimple.story.items[chimple.pageIndex].scene;
    },

    doPostLoadingProcessForScene: function (fileToLoad) {
        if (fileToLoad == null) {
            return;
        }
        this._constructedScene = ccs.load(fileToLoad);
        if (this._constructedScene != null) {
            if (this._constructedScene.node) {
                this.addChild(this._constructedScene.node);
                if (!cc.sys.isNative) {
                    this._constructedScene.node._renderCmd._dirtyFlag = 1;
                }
                this.postProcessForSceneObjects(this._constructedScene.node);
            }
            if (chimple.story.items[chimple.pageIndex].scene.scaleX
                && chimple.story.items[chimple.pageIndex].scene.scaleY) {
                this.setScale(chimple.story.items[chimple.pageIndex].scene.scaleX,
                    chimple.story.items[chimple.pageIndex].scene.scaleY);
            }

            if (chimple.story.items[chimple.pageIndex].scene.posX
                && chimple.story.items[chimple.pageIndex].scene.posY) {
                this.setPosition(cc.p(chimple.story.items[chimple.pageIndex].scene.posX,
                    chimple.story.items[chimple.pageIndex].scene.posY));
            }
        }
    },

    postProcessForSceneObjects: function (node) {
        node.children.forEach(function (element) {
            if (element.getName().indexOf("Skeleton") != -1 || element.getName().indexOf("skeleton") != -1) {
                chimple.CharacterUtil.loadSkeletonConfig(element);
                if (element._userData && element._userData.visibleSkins) {
                    chimple.CharacterUtil.displaySkins(element, element._userData.visibleSkins);
                }
                if (element._userData && element._userData.colorSkins) {
                    element._userData.colorSkins.forEach(function (colorSkin) {
                        chimple.CharacterUtil.colorSkins(element, colorSkin);
                })}

                if (element._userData && element._userData.currentAnimationName) {
                    element._currentAnimationName = element._userData.currentAnimationName;
                }
            }
        }, this);

        this.attachCustomObjectSkinToSkeleton(node);
    },


    backPressed: function () {
        cc.director.popScene();
    },

    onEnter: function () {
        this._super();
    },

    onExit: function () {
        this._super();
    }

});
