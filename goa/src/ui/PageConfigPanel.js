chimple.PageConfigPanel = cc.LayerColor.extend({
    ctor: function (width, height, position, configuration, contentPanel) {
        this._super(chimple.PRIMARY_COLOR, width, height);
        this.setPosition(position);
        this._configuration = configuration;
        this._contentPanel = contentPanel;

        this._buttonPanel = new chimple.ButtonPanel(new cc.p(0, 0), this.getContentSize(), 1, 6, configuration.addObjects, new chimple.ButtonHandler(this.buttonPressed, this));
        this._currentStep = "addObjects";

        if (chimple.story.items[chimple.pageIndex].scene.Content == null) {
            this.disableOrEnableAllButtons(this._buttonPanel, false);
        } else {
            this.disableOrEnableAllButtons(this._buttonPanel, true);
        }
        this.addChild(this._buttonPanel);
    },
    buttonPressed: function (selectedItem) {
        if (selectedItem.getName() === "icons/text.png") {
            this._contentPanel.addTextToScene();
        } else if (selectedItem.getName() === "icons/start_recording.png") {
            this.handleRecordingAnimation(selectedItem);
        } else if (selectedItem.getName() === "icons/play.png") {
            this._contentPanel.playSceneInEditMode();
        } else if (selectedItem.getName() === "icons/save_goback.png") {
            this._contentPanel.backPressed();
        } else if (selectedItem.getName() === "icons/bg.png") {
            var selectedConfig = this._configuration.addObjects[selectedItem._selectedIndex];
            if (chimple.story.items[chimple.pageIndex].scene.Content == null) {
                selectedConfig.categories.forEach(function (element, index) {
                    if (element.name == "backgrounds") {
                        this.constructTabBar([selectedConfig.categories[index]]);
                    }
                }, this);
            } else {
                this.constructTabBar(selectedConfig.categories);
            }
        } else if (selectedItem.getName() === "icons/check.png") {
            if (this._currentStep == "addObjects") {
                this._currentStep = "addText";
            } else if (this._currentStep == "addText") {
                this._currentStep = "addRecording";
            } else if (this._currentStep == "addRecording") {
                this._contentPanel.backPressed();
            }
            this.removeChild(this._buttonPanel, true);
            this._buttonPanel = new chimple.ButtonPanel(new cc.p(0, 0), this.getContentSize(), 1, 7, this._configuration[this._currentStep], new chimple.ButtonHandler(this.buttonPressed, this));
            this.addChild(this._buttonPanel);
            // this.disableOrEnableAllButtons(this._buttonPanel, true);
        } else {
            var selectedConfig = this._configuration.addObjects[selectedItem._selectedIndex];
            if(selectedConfig) {
                this.constructTabBar(selectedConfig.categories);
            }            
        }
    },

    handleRecordingAnimation: function (selectedItem) {
        if (this._contentPanel._isRecordingStarted) {
            this.updateUIBeforeRecording();
        } else {
            this.createRecordingAnimation(selectedItem);
        }
    },

    createRecordingAnimation: function (selectedItem) {
        if (!this._clickRecordAniamation) {
            selectedItem.loadTextures("icons/start_recording_onclick.png", null, null, ccui.Widget.PLIST_TEXTURE);

            this._preRecordAnimationSprite = new cc.Sprite('#record_time/3.png');
            this._contentPanel.addChild(this._preRecordAnimationSprite, 0);
            this._preRecordAnimationSprite.setPosition(this._contentPanel.width / 2, this._contentPanel.height / 2);

            var spriteFrames = [];

            //create animations
            for (var i = 3; i >= 1; i--) {
                var frame = cc.spriteFrameCache.getSpriteFrame('record_time/' + i + '.png');
                spriteFrames.push(frame);
            }

            var animation = new cc.Animation(spriteFrames, 0.5);
            var animAction = cc.animate(animation);
            //var delayAction = new cc.delayTime(0.5);
            var finishRecordingAnimAction = new cc.CallFunc(this.finishRecordingAnimation, this);
            var preRecordSequence = new cc.sequence(animAction, finishRecordingAnimAction);
            this._preRecordAnimationSprite.runAction(preRecordSequence);
            this._clickRecordAniamation = true;
        }

        
    },

    finishRecordingAnimation: function () {
        this._preRecordAnimationSprite.removeFromParent(true);
        this._preRecordAnimationSprite = null;
        this._clickRecordAniamation = false;
        this.updateUIBeforeRecording();
    },

    constructTabBar: function (configuration) {
        this._tabBar = new chimple.TabPanel(cc.p(0, 0), cc.director.getWinSize(), 5, 3, configuration, this.itemSelectedInConfiguration, this);
        this.parent.addChild(this._tabBar, 1);
    },

    destoryTabBar: function () {
        this._tabBar.removeFromParent(true);
    },

    itemSelectedInConfiguration: function (selectedItem) {
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
            var dynamicResources = [fileToLoad];
            cc.LoaderScene.preload(dynamicResources, function () {
                cc.log(cc.loader.getRes(fileToLoad));
                cc.log(cc.loader.cache[fileToLoad]);
                for (var key in cc.loader.cache) {
                        cc.log("key:" + key);
                        var element = cc.loader.cache[key];                        
                        cc.log(key);
                        cc.log(element);
                        
                }
                // chimple.ParseUtil.changeSize(cc.loader.cache[fileToLoad], null, chimple.designScaleFactor);
                // cc.loader.cache[fileToLoad].ChimpleCompressed = true;

                doPostLoadingProcessFunction.call(context, args, shouldSaveScene);
            }, this);
        } else {
            cc.director.pushScene(new cc.LoaderScene()); //TODO dummy right now later fix this
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

    },
    disableOrEnableAllButtons: function (panel, isEnabled) {

        panel.children.forEach(function (element) {
            if (isEnabled) {
                if (element._configuration.name != "play") {
                    element.setEnabled(true);
                    element.setHighlighted(false);
                }
            } else {
                if (element._configuration.name != "addBackground" && element._configuration.name != "back") {
                    element.setEnabled(false);
                    element.setHighlighted(true);
                }
            }
        }, this);
    },

    trackRecording: function () {
        //check if recording stopped
        if (this._contentPanel._isRecordingStarted && !this._contentPanel._isRecordingPaused) {
            this._contentPanel._recordingCounter++;
            var buttonKey = 'timer/' + this._contentPanel._recordingCounter + '.png';
            this._buttonPanel.getButtonByName("icons/start_recording.png").loadTextures(buttonKey, "icons/start_recording.png", null, ccui.Widget.PLIST_TEXTURE);
        }

        if (this._contentPanel._recordingCounter == chimple.RECORDING_TIME + 1) {
            this._contentPanel.startRecording();
            this.unschedule(this.trackRecording);
            this.updateUIWhenForRecording();
        }

    },

    updateUIBeforeRecording: function () {
        if (this._contentPanel._isRecordingStarted) {
            this._buttonPanel.enableButton("play", true);
            this._buttonPanel.enableButton("addToScene", true);
            this._buttonPanel.enableButton("back", true);
            this._buttonPanel.enableButton("texts", true);
        } else {
            this._buttonPanel.enableButton("play", false);
            this._buttonPanel.enableButton("addToScene", false);
            this._buttonPanel.enableButton("back", false);
            this._buttonPanel.enableButton("texts", false);
            var buttonKey = 'timer/' + this._contentPanel._recordingCounter + '.png';
            this._buttonPanel.getButtonByName("icons/start_recording.png").loadTextures(buttonKey, "icons/start_recording.png", null, ccui.Widget.PLIST_TEXTURE);
        }

        this._contentPanel.startRecording(); //toggle Recording
        if (this._contentPanel._isRecordingStarted) {
            this.schedule(this.trackRecording, 1, chimple.RECORDING_TIME);
        } else {
            this.unschedule(this.trackRecording);
            this.updateUIWhenForRecording();
        }

    },

    updateUIWhenForRecording: function () {
        if (!this._contentPanel._isRecordingStarted) {
            this._buttonPanel.enableButton("startRecording", true);
            this._buttonPanel.enableButton("play", true);
            this._buttonPanel.enableButton("addToScene", true);
            this._buttonPanel.enableButton("back", true);
            this._buttonPanel.enableButton("texts", true);
            this._buttonPanel.getButtonByName("icons/start_recording.png").loadTextures("icons/start_recording.png", null, null, ccui.Widget.PLIST_TEXTURE);
        } else {
            this._buttonPanel.enableButton("startRecording", false);
            this._buttonPanel.enableButton("play", false);
            this._buttonPanel.enableButton("addToScene", false);
            this._buttonPanel.enableButton("back", false);
            this._buttonPanel.enableButton("texts", false);

        }
    }
});



