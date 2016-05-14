chimple.PageConfigPanel = cc.LayerColor.extend({
    ctor: function (width, height, position, configuration, contentPanel) {
        this._super(cc.color.GREEN, width, height);
        this.setPosition(position);
        this._configuration = configuration;
        this._contentPanel = contentPanel;

        this._buttonPanel = new chimple.ButtonPanel(new cc.p(0, 0), this.getContentSize(), 1, 6, configuration.addObjects, new chimple.ButtonHandler(this.buttonPressed, this));

        if (chimple.story.items[chimple.pageIndex].scene.Content == null) {
            chimple.PageConfigPanel.disableOrEnableAllButtons(this._buttonPanel, false);
        } else {
            chimple.PageConfigPanel.disableOrEnableAllButtons(this._buttonPanel, true);
        }
        this.addChild(this._buttonPanel);
    },
    buttonPressed: function (selectedItem) {
        var selectedConfig = this._configuration.addObjects[selectedItem._selectedIndex];
        cc.log(selectedItem.getName());
        if (selectedConfig != null && selectedConfig.name === "texts") {
            this._contentPanel.addTextToScene();
        } else if (selectedConfig != null && selectedConfig.name === "startRecording") {
            this._contentPanel.startRecording();
        } else if (selectedConfig != null && selectedConfig.name === "play") {
            this._contentPanel.playSceneInEditMode();
        } else if (selectedConfig != null) {
            this.constructTabBar(selectedConfig.categories);
        }
    },

    constructTabBar: function (configuration) {
        this._tabBar = new chimple.TabPanel(cc.p(0, 0), cc.director.getWinSize(), 2, 2, configuration, this.itemSelectedInConfiguration, this);
        this.parent.addChild(this._tabBar, 1);
    },

    destoryTabBar: function () {
        this._tabBar.removeFromParent(true);
    },

    itemSelectedInConfiguration: function (selectedItem) {
        cc.log('itemSelectedInConfiguration:' + selectedItem);
        this.destoryTabBar();
        this.process(selectedItem);

    },


    process: function (selectedItem) {
        if (selectedItem.dataType === 'png' && selectedItem._pngFileToLoad != null) {
            //process image - create cc.sprite node
            this.loadImageAddToNode(selectedItem);
        } else if (selectedItem.dataType === 'json' && selectedItem._jsonFileToLoad != null) {
            this.loadJsonFile(selectedItem);
        }
    },

    loadImageAddToNode: function (selectedItem) {
        //load image if only not already in cache
        var imageToLoad = selectedItem._pngFileToLoad;
        this.showLoadingScene(imageToLoad, this._contentPanel, this._contentPanel.doPostLoadingProcessForImage, imageToLoad);
    },

    //later create custom loading screen
    showLoadingScene: function (fileToLoad, context, doPostLoadingProcessFunction, args, shouldSaveScene) {
        if (cc.sys.isNative) {
            cc.log(fileToLoad);
            var dynamicResources = [fileToLoad];
            cc.LoaderScene.preload(dynamicResources, function () {
                chimple.ParseUtil.changeSize(cc.loader.cache[fileToLoad], null, chimple.designScaleFactor);
                cc.loader.cache[fileToLoad].ChimpleCompressed = true;

                doPostLoadingProcessFunction.call(context, args, shouldSaveScene);
            }, this);
        } else {
            cc.director.pushScene(new cc.LoaderScene()); //TODO dummy right now later fix this
            cc.log(fileToLoad);
            var dynamicResources = [fileToLoad];
            cc.LoaderScene.preload(dynamicResources, function () {
                cc.director.popScene();
                if (fileToLoad && fileToLoad.indexOf(".png") == -1) {
                    chimple.ParseUtil.changeSize(cc.loader.cache[fileToLoad], null, chimple.designScaleFactor);
                    cc.loader.cache[fileToLoad].ChimpleCompressed = true;
                }
                doPostLoadingProcessFunction.call(context, args, shouldSaveScene);
            }, this);
        }
    },

    createSceneFromFile: function (fileToLoad) {
        this.showLoadingScene(fileToLoad, this._contentPanel, this._contentPanel.doPostLoadingProcessForScene, fileToLoad, true);
    },

    loadSkeletonConfig: function (configuration, fileToLoad) {
        this.showLoadingScene(fileToLoad, this._contentPanel, this._contentPanel.addCharacterToScene, configuration, false);
    },


    loadJsonFile: function (selectedItem) {
        var type = selectedItem._configurationType;
        var fileToLoad = selectedItem._jsonFileToLoad;
        switch (type) {
            case "character":
                // this._contentPanel.addCharacterToScene(selectedItem._configuration);
                this.loadSkeletonConfig(selectedItem._configuration, selectedItem._configuration.json);
                break;
            case "scene":
                this.createSceneFromFile(fileToLoad); //later move to ContentPanel
                break;
        }

    }
});

chimple.PageConfigPanel.disableOrEnableAllButtons = function (panel, isEnabled) {

    panel.children.forEach(function (element) {
        if (isEnabled) {
            if (element._configuration.name != "play") {
                element.setEnabled(true);
                element.setHighlighted(false);
            }
        } else {
            if (element._configuration.name != "backgrounds") {
                element.setEnabled(false);
                element.setHighlighted(true);
            }
        }
    }, this);
}
