/// <reference path="../../../cocos2d-typescript-definitions/cocos2d/cocos2d-lib.d.ts" />
var LAYER_INIT = false;

var chimple = chimple || {};
var HelloWorldLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this._name = "StoryLayer";
        this._propsContainer = [];
        this._charactersContainer = [];
        this._nodesSelected = [];
        this._nodesTouchedWhileRecording = [];
        this._isRecordingStarted = false;
        this._moveAction = true;
        this._controlPanel = null;
        return true;
    },

    init: function () {
        if (chimple.storyConfigurationObject) {
            //backgrounds, characters and pops, texts
            var mainConfigurationItems = Object.getOwnPropertyNames(chimple.storyConfigurationObject.addObjects);
            //Construct UI
            var pageView = new chimple.PageScroller(cc.p(0, 0), cc.size(760, 1800), 2, 3, mainConfigurationItems, cc.color.RED, this.configurationChoosed, this, false);
            this._controlPanel = new chimple.PanelStack(pageView, cc.size(760, 1800));
            this._controlPanel.setPosition(1800, 0);
            this.addChild(this._controlPanel, 0);
        }
    },

    registerEventListenerForAllChildren: function () {
        this.children.forEach(function (element) {
            if (element._name === 'Scene') {
                element.children.forEach(function (element) {
                    if (element.getName().indexOf("Skeleton") != -1) {
                        var eventObj = new chimple.SkeletonTouchHandler(this);
                        var listener = cc.EventListener.create(eventObj);
                        cc.eventManager.addListener(listener, element);
                        if (!cc.sys.isNative) {
                            element._renderCmd._dirtyFlag = 1;
                        }
                    } else {
                        var eventObj = new chimple.SpriteTouchHandler(this);
                        var listener = cc.EventListener.create(eventObj);
                        cc.eventManager.addListener(listener, element);
                    }

                }, this);
            }
        }, this);
    },


    loadSceneFromStorage: function () {
        //check if data exists in localstorage with Key
        var storedSceneString = cc.sys.localStorage.getItem(this.pageKey);
        if (storedSceneString != null && storedSceneString.length > 0) {
            var storedSceneJSON = JSON.parse(storedSceneString);
            this.putIntoCacheFromLocalStorage(this.pageKey, storedSceneJSON);
            this.doPostLoadingProcessForScene(this, this.pageKey, false);
        }
    },

    putIntoCacheFromLocalStorage: function (cacheKey, contents) {
        cc.loader.cache[cacheKey] = contents;
    },

    saveSceneToLocalStorage: function (data) {
        cc.sys.localStorage.setItem(this.pageKey, data);
    },

    configurationChoosed: function (selectedItem) {
        //get configuration for selected Item
        //create scroll bar at top based on item selected

        var selectedConfig = chimple.storyConfigurationObject.addObjects[selectedItem.getName()];
        cc.log(selectedItem.getName());
        if (selectedConfig != null && selectedItem.getName() === "texts") {
            this.addTextToScene();
        } else if (selectedConfig != null && selectedItem.getName() === "startRecording") {
            this.startRecording();
        } else if (selectedConfig != null && selectedItem.getName() === "stopRecording") {
            this.stopRecording();
        } else if (selectedConfig != null && selectedItem.getName() === "play") {
            var playScene = new PlayRecordingScene(this.pageKey);
            cc.director.pushScene(playScene);
        } else if (selectedConfig != null) {
            this.constructTabBar(selectedConfig.categories);
        }
    },

    startRecording: function () {
        this._isRecordingStarted = true;
        this._recordingFrameIndex = 0;
        cc.log("recording started");
        this._nodesTouchedWhileRecording = [];
        this.scheduleUpdate();
    },

    stopRecording: function () {
        this._isRecordingStarted = false;
        cc.log("recording stopped");
        var timelines = [];
        if (this._nodesTouchedWhileRecording != null && this._nodesTouchedWhileRecording.length > 0) {
            this._nodesTouchedWhileRecording.forEach(function (element) {
                timelines.push(this.constructTimeLineObject(element, "Position", "positionFrames"));
                timelines.push(this.constructTimeLineObject(element, "Scale", "scaleFrames"));
                timelines.push(this.constructTimeLineObject(element, "RotationSkew", "rotationFrames"));
                timelines.push(this.constructTimeLineObject(element, "ActionValue", "animationFrames"));
            }, this);
        }
        this.createTimeLinesForPlayAnimation(timelines);
        this._nodesTouchedWhileRecording = [];
        this.unscheduleUpdate();
    },

    createTimeLinesForPlayAnimation: function (timelines) {
        //fetch scene json
        var storedSceneString = cc.sys.localStorage.getItem(this.pageKey);
        if (storedSceneString != null && storedSceneString.length > 0) {
            var storedSceneJSON = JSON.parse(storedSceneString);
            cc.log('storedSceneJSON:' + storedSceneJSON);
            storedSceneJSON.Content.Content.Animation.Timelines = timelines;
            storedSceneJSON.Content.Content.Animation.Duration = this._recordingFrameIndex;
            this.saveSceneToLocalStorage(JSON.stringify(storedSceneJSON));
            cc.sys.localStorage.setItem("duration", this._recordingFrameIndex);
            timelines = null;
        }
    },

    addTextToScene: function () {
        this._sceneText = "how are you today?";
        this._sceneTextKey = this.pageKey + ".text";
        var textEditScene = new TextEditScene(this._sceneText, this._sceneTextKey);
        cc.director.pushScene(textEditScene);
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
        this.showLoadingScene(imageToLoad, this.doPostLoadingProcessForImage, this, imageToLoad);
    },

    enableTargetTransformForTarget: function (context, touch, target, location) {
        if (context._moveAction) {
            target.setPosition(location);
        } else if (context._rotateAction || context._scaleAction) {
            context.calcAngleAndRotationForTarget(touch, target);
            context.calcScaleForTarget(context, touch, target);
        }
    },

    doPostLoadingProcessForImage: function (context, imageToLoad) {
        var sprite = new cc.Sprite(imageToLoad);
        context.addChild(sprite, 1);
        sprite.setPosition(cc.director.getWinSize().width / 2, cc.director.getWinSize().height / 2);
        sprite.setScale(1);


        var loadedImageObject = context.constructJSONFromCCSprite(sprite);
        sprite.ActionTag = loadedImageObject.ActionTag;

        var storedSceneString = cc.sys.localStorage.getItem(context.pageKey);
        if (storedSceneString != null && storedSceneString.length > 0) {
            var storedSceneJSON = JSON.parse(storedSceneString);
            if (storedSceneJSON) {
                storedSceneJSON.Content.Content.ObjectData.Children.push(loadedImageObject);
                context.saveSceneToLocalStorage(JSON.stringify(storedSceneJSON));
            }
        }
        else {
            // context._propsContainer.push(loadedImageObject);
        }

        var eventObj = new chimple.SpriteTouchHandler(context);
        var listener = cc.EventListener.create(eventObj);
        cc.eventManager.addListener(listener, sprite);

    },


    // constructJSONFromTextSprite: function (sprite) {
    //     var object = Object.create(Object.prototype);
    //     object.FontSize = "12";
    //     object.LabelText = "How are you??";
    //     object.PlaceHolderText = "";
    //     object.MaxLengthEnable = true;
    //     object.MaxLengthText = 50;
    //     object.AnchorPoint = {
    //         "ScaleX": sprite.getAnchorPoint().x,
    //         "ScaleY": sprite.getAnchorPoint().y
    //     };

    //     object.Position = {
    //         "X": sprite.getPosition().x,
    //         "Y": sprite.getPosition().y
    //     };

    //     object.RotationSkewX = sprite.getRotationX();
    //     object.RotationSkewY = sprite.getRotationY();
    //     object.Scale = {
    //         "ScaleX": sprite.getScaleX(),
    //         "ScaleY": sprite.getScaleY()
    //     };
    //     object.CColor = {
    //         "R": sprite.color.r,
    //         "G": sprite.color.g,
    //         "B": sprite.color.b,
    //         "A": sprite.color.a
    //     };
    //     object.IconVisible = false;
    //     object.Size = {
    //         "X": sprite.getBoundingBox().width,
    //         "Y": sprite.getBoundingBox().height
    //     };
    //     object.Alpha = sprite._alpha;
    //     object.Tag = sprite.tag;
    //     if (sprite.getName().indexOf("%%") === -1) {
    //         sprite.setName(sprite.getName() + "%%" + this.generateUUID());
    //     }
    //     object.ActionTag = -new Date().valueOf();
    //     object.Name = sprite.getName();
    //     object.ctype = "TextFieldObjectData";

    //     if (sprite.getComponent('ComExtensionData') && sprite.getComponent('ComExtensionData').getCustomProperty() != null) {
    //         object.UserData = sprite.getComponent('ComExtensionData').getCustomProperty();
    //     };
    //     return object;
    // },


    constructJSONFromCCSprite: function (sprite) {

        var object = Object.create(Object.prototype);
        object.FlipX = sprite._flippedX;
        object.FlipY = sprite._flippedY;
        object.FileData = {};
        object.FileData.Type = "Normal";
        if (sprite.getTexture().url != null) {
            var path = sprite.getTexture().url.replace("res/", "");
            object.FileData.Path = path;
        }
        object.FileData.Plist = "";

        object.BlendFunc = {
            "Src": sprite.getBlendFunc.src,
            "Dst": sprite.getBlendFunc.dst
        };

        object.AnchorPoint = {
            "ScaleX": sprite.getAnchorPoint().x,
            "ScaleY": sprite.getAnchorPoint().y
        };

        object.Position = {
            "X": sprite.getPosition().x,
            "Y": sprite.getPosition().y
        };

        object.RotationSkewX = sprite.getRotationX();
        object.RotationSkewY = sprite.getRotationY();
        object.Scale = {
            "ScaleX": sprite.getScaleX(),
            "ScaleY": sprite.getScaleY()
        };
        object.CColor = {
            "R": sprite.color.r,
            "G": sprite.color.g,
            "B": sprite.color.b,
            "A": sprite.color.a
        };
        object.IconVisible = false;
        object.Size = {
            "X": sprite.getBoundingBox().width,
            "Y": sprite.getBoundingBox().height
        };
        object.Tag = sprite.tag;
        if (sprite.getName().indexOf("%%") === -1) {
            sprite.setName(sprite.getName() + "%%" + this.generateUUID());
        }
        object.ActionTag = -new Date().valueOf();
        object.Name = sprite.getName();
        object.ctype = "SpriteObjectData";

        if (sprite.getComponent('ComExtensionData') && sprite.getComponent('ComExtensionData').getCustomProperty() != null) {
            object.UserData = sprite.getComponent('ComExtensionData').getCustomProperty();
        };
        return object;
    },


    loadJsonFile: function (selectedItem) {
        var type = selectedItem._configurationType;
        var fileToLoad = selectedItem._jsonFileToLoad;
        switch (type) {
            case "character":
                this.addCharacterToScene(this, selectedItem._configuration);
                break;
            case "scene":
                this.createSceneFromFile(this, fileToLoad);
                break;
        }

    },

    addNodeToRecording: function (context, touch, target) {
        if (context._isRecordingStarted) {
            context._nodesTouchedWhileRecording.push(target);
            if (target.positionFrames == null) {
                target.positionFrames = [];
            }

            if (target.scaleFrames == null) {
                target.scaleFrames = [];
            }

            if (target.rotationFrames == null) {
                target.rotationFrames = [];
            }

            if (target.animationFrames == null) {
                target.animationFrames = [];
            }
        }

        var location = target.parent.convertToNodeSpace(touch.getLocation());
        context._initialScaleX = target.getScaleX();
        context._initialScaleY = target.getScaleY();
        context._initialDiff = cc.pDistance(location, target.getPosition());
        context._lastDiff = null;
        context.toggleEventsForAllOtherNodes(context, target, false);
    },

    calcAngleAndRotationForTarget: function (touch, target) {
        var nodePostion = target.getPosition();
        var currentPosition = target.parent.convertToNodeSpace(touch.getLocation());
        var diff = cc.pSub(currentPosition, nodePostion);
        var rads = cc.pToAngle(diff);
        var degs = -cc.radiansToDegrees(rads);
        degs += 90.0; // 0 is pointing right, so offset so our angle is pointing out of the top of the sprite
        target.setRotation(degs);
    },

    calcScaleForTarget: function (context, touch, target) {
        var nodePostion = target.getPosition();
        var currentPosition = target.parent.convertToNodeSpace(touch.getLocation());
        if (context._lastDiff == null) {
            context._lastDiff = context._initialDiff;
        }
        context._currentDiff = cc.pDistance(currentPosition, nodePostion);

        var distanceMoved = (context._currentDiff - context._lastDiff) / context._initialDiff;

        context._lastDiff = context._currentDiff;
        var computedScaleX = target.getScaleX() + distanceMoved * context._initialScaleX;
        var computedScaleY = target.getScaleY() + distanceMoved * context._initialScaleY;
        target.setScale(computedScaleX, computedScaleY);
    },

    enableEventsForAllOtherNodes: function (context, target, isEnabled) {
        target.parent.children.forEach(function (element) {
            cc.eventManager.resumeTarget(element, true);
        });
    },

    toggleEventsForAllOtherNodes: function (context, target, isEnabled) {
        target.parent.children.forEach(function (element) {
            if (element.getName() !== target.getName()) {
                if (!isEnabled) {
                    // element.setOpacity(150);
                    cc.eventManager.pauseTarget(element, true);
                } else {
                    // element.setOpacity(255);
                    cc.eventManager.resumeTarget(element, true);
                }
            }
        });
    },

    doPostLoadingProcessForScene: function (context, fileToLoad, shouldSaveToLocalStorage) {
        context._constructedScene = ccs.load(fileToLoad);
        if (context._constructedScene != null) {
            context.addChild(context._constructedScene.node, 0);
            if (!cc.sys.isNative) {
                context._constructedScene.node._renderCmd._dirtyFlag = 1;
            }
            context._constructedScene.node.children.forEach(function (element) {

                if (element.getComponent('ComExtensionData') != null) {
                    var customUserData = element.getComponent('ComExtensionData').getCustomProperty();
                    //process User Data
                    if (customUserData != null && typeof customUserData == 'object') {
                        Object.getOwnPropertyNames(customUserData).forEach(function (property) {
                            if (customUserData.hasOwnProperty(property)) {
                                element[property] = customUserData[property];
                            }
                        }, this);

                    }
                }

                //for now attach Sprite Touch Handler - DEFAULT
                var eventObj = new chimple.SpriteTouchHandler(context);
                var listener = cc.EventListener.create(eventObj);
                cc.eventManager.addListener(listener, element);

            }, context);

            //parse JSON and store in local storage
            if (shouldSaveToLocalStorage) {
                context.parseScene(context, fileToLoad);
            }
        }
    },

    parseScene: function (context, fileToLoad) {
        cc.log('got file:' + fileToLoad);
        var resourcePath = fileToLoad.substring(0, fileToLoad.lastIndexOf("/") + 1);
        cc.log('resourcePath:' + resourcePath);
        cc.loader.loadJson(fileToLoad, function (error, data) {
            cc.log('data:' + data);
            if (data != null) {
                //context.updateNodesNameToUniqueName(data, resourcePath);

                if (context._propsContainer != null && context._propsContainer.length > 0) {
                    context._propsContainer.forEach(function (propObject) {
                        data.Content.Content.ObjectData.Children.push(propObject);
                    }, context);
                }
                context._propsContainer = [];
                context.saveSceneToLocalStorage(JSON.stringify(data));
            }
        });
    },

    generateUUID: function () {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    },


    updateNodesNameToUniqueName: function (data, resourcePath) {
        if (data && data.Content && data.Content.Content) {
            var objects = data.Content.Content.ObjectData;
            if (objects) {
                objects.Children.forEach(function (element) {
                    if (element.Name.indexOf("%%") === -1) {
                        element.Name = element.Name + "%%" + this.generateUUID();
                    }

                    //element.FileData.Path = resourcePath + element.FileData.Path;
                }, this);
            }
        }
    },

    createSceneFromFile: function (context, fileToLoad) {
        if (context._mainScene != null) {
            context._mainScene.node.removeFromParent(true);
        }
        context.showLoadingScene(fileToLoad, context.doPostLoadingProcessForScene, context, fileToLoad, true);
    },


    //later create custom loading screen
    showLoadingScene: function (fileToLoad, doPostLoadingProcessFunction, context, args, shouldSaveToLocalStorage) {
        if (cc.sys.isNative) {
            cc.log(fileToLoad);
            var dynamicResources = [fileToLoad];
            cc.LoaderScene.preload(dynamicResources, function () {
                doPostLoadingProcessFunction.call(context, context, args, shouldSaveToLocalStorage);
            }, this);
        } else {
            cc.director.pushScene(new cc.LoaderScene()); //TODO dummy right now later fix this
            cc.log(fileToLoad);
            var dynamicResources = [fileToLoad];
            cc.LoaderScene.preload(dynamicResources, function () {
                cc.director.popScene();
                doPostLoadingProcessFunction.call(context, context, args, shouldSaveToLocalStorage);
            }, this);
        }
    },



    parseCharacter: function (fileToLoad, load) {
        var resourcePath = fileToLoad.replace("res/", "");
        var skeletonObject = this.constructJSONFromCharacter(load.node, resourcePath);
        load.node.ActionTag = skeletonObject.ActionTag;
        // context.saveCharacterToLocalStorage(JSON.stringify(skeletonObject));
        var storedSceneString = cc.sys.localStorage.getItem(this.pageKey);
        if (storedSceneString != null && storedSceneString.length > 0) {
            var storedSceneJSON = JSON.parse(storedSceneString);
            if (storedSceneJSON) {
                storedSceneJSON.Content.Content.ObjectData.Children.push(skeletonObject);
                this.saveSceneToLocalStorage(JSON.stringify(storedSceneJSON));
            }
        }

        // cc.loader.loadJson(fileToLoad, function (error, data) {
        //     cc.log('data:' + data);
        //     // context.updateCharacterToUniqueName(data, resourcePath);
        //     context._charactersContainer.push(data);
        //     cc.log('JSON String:' + JSON.stringify(data));
        //     context.saveCharacterToLocalStorage(data);
        // });
    },


    constructJSONFromCharacter: function (skeleton, resourcePath) {
        var object = Object.create(Object.prototype);
        object.FileData = {};
        object.FileData.Type = "Normal";
        object.FileData.Path = resourcePath;
        object.FileData.Plist = "";

        object.InnerActionSpeed = 1.0;

        object.AnchorPoint = {
            "ScaleX": skeleton.getAnchorPoint().x,
            "ScaleY": skeleton.getAnchorPoint().y
        };

        object.Position = {
            "X": skeleton.getPosition().x,
            "Y": skeleton.getPosition().y
        };

        object.RotationSkewX = skeleton.getRotationX();
        object.RotationSkewY = skeleton.getRotationY();
        object.Scale = {
            "ScaleX": skeleton.getScaleX(),
            "ScaleY": skeleton.getScaleY()
        };
        object.CColor = {
            "R": skeleton.color.r,
            "G": skeleton.color.g,
            "B": skeleton.color.b,
            "A": skeleton.color.a
        };
        object.tag = skeleton.tag;
        object.Size = {
            "X": skeleton.width,
            "Y": skeleton.height
        };
        object.ActionTag = -new Date().valueOf();
        object.Name = skeleton.getName();
        object.ctype = "ProjectNodeObjectData";

        var existingUserData = null;
        if (skeleton.getComponent('ComExtensionData') && skeleton.getComponent('ComExtensionData').getCustomProperty() != null
            && skeleton.getComponent('ComExtensionData').getCustomProperty().length > 0) {
            existingUserData = skeleton.getComponent('ComExtensionData').getCustomProperty();
        } else {
            existingUserData = {};
        };

        existingUserData._currentAnimationName = skeleton._currentAnimationName;
        object.UserData = existingUserData;
        return object;
    },

    updateCharacterToUniqueName: function (data, resourcePath) {
        if (data && data.Content && data.Content.Content) {
            var objects = data.Content.Content.ObjectData;
            if (objects) {
                if (objects.Name.indexOf("%%") === -1) {
                    objects.Name = objects.Name + "%%" + this.generateUUID();
                }
            }
            //                    element.FileData.Path = resourcePath + element.FileData.Path;

        }
    },


    saveCharacterToLocalStorage: function (data) {
        var charKey = this.pageKey + "_" + data.Content.Content.ObjectData.Name;
        cc.sys.localStorage.setItem(charKey, JSON.stringify(data));
    },

    addCharacterToScene: function (context, configuration) {
        var load = ccs.load(configuration.json);
        if (configuration.skinNameMap) {
            cc.loader.loadJson('res/characters/skeletonConfig/' + load.node.getName() + '.json', function (error, data) {
                if (data != null) {
                    load.node.setUserData(data);
                    if (data.skinNameMaps && data.skinNameMaps[configuration.skinNameMap]) {
                        load.node.changeSkins(data.skinNameMaps[configuration.skinNameMap]);
                    }
                    load.node._currentAnimationName = data.animations[0].name;
                    load.node.setPosition(900, 900);
                    var eventObj = new chimple.SkeletonTouchHandler(context);
                    var listener = cc.EventListener.create(eventObj);
                    cc.eventManager.addListener(listener, load.node);
                    context.addChild(load.node);
                    load.node.runAction(load.action);
                    if (!cc.sys.isNative) {
                        load.node._renderCmd._dirtyFlag = 1;
                    }
                    context.parseCharacter(configuration.json, load);

                }

            });
        }

    },

    constructConfigPanel: function (target) {
        if (this._controlPanel.getCurrentTarget() != target) {
            if (target.getName().indexOf("Skeleton") != -1) {
                this._controlPanel.push(new chimple.ConfigPanel(target, cc.p(0, 0), cc.size(760, 1800), 2, 4, chimple.storyConfigurationObject.editObject))
            } else {
                this._controlPanel.push(new chimple.ConfigPanel(target, cc.p(0, 0), cc.size(760, 1800), 2, 4, chimple.storyConfigurationObject.editCharacter))
            }
        }
    },

    destroyConfigPanel: function () {
        this._configPanel.removeFromParent(true);
        this._configPanel = null;
    },

    constructTabBar: function (configuration) {
        this._tabBar = new chimple.TabPanel(cc.p(0, 0), cc.size(1800, 1800), 2, 2, configuration, this.itemSelectedInConfiguration, this);
        this.addChild(this._tabBar);
    },

    destoryTabBar: function () {
        this._tabBar.removeFromParent(true);
    },

    saveToFile: function () {
        cc.sys.localStorage;
    },

    //every timeline
    constructPositionFrameData: function (node, frameIndex) {
        var frameData = Object.create(Object.prototype);
        frameData.X = node.x;
        frameData.Y = node.y;
        frameData.FrameIndex = frameIndex;
        frameData.EasingData = {};
        frameData.EasingData.Type = 0;
        frameData.ctype = "PointFrameData";

        node.positionFrames.push(frameData);
    },

    constructAnimationFrameData: function (node, frameIndex, shouldStopAnimation) {
        if (node.animationFrames == null) {
            node.animationFrames = [];
        }

        if (node._previousAnimationName != null && node._previousAnimationName === node._currentAnimationName) {
            return;
        }

        if (frameIndex != null && node != null) {
            var animationFrameData = Object.create(Object.prototype);

            animationFrameData.SingleFrameIndex = "0";
            animationFrameData.FrameIndex = frameIndex;
            animationFrameData.Tween = false;
            animationFrameData.ctype = "InnerActionFrameData";

            if (shouldStopAnimation) {
                animationFrameData.InnerActionType = "SingleFrame";
                animationFrameData.CurrentAniamtionName = "-- ALL --";
                node._previousAnimationName = "-- ALL --";
            } else {
                animationFrameData.InnerActionType = "LoopAction";
                animationFrameData.CurrentAniamtionName = node._currentAnimationName;
                node._previousAnimationName = node._currentAnimationName;
            }
            node.animationFrames.push(animationFrameData);
        }

    },

    constructFrameData: function (node, frameIndex) {
        if (node.positionFrames == null) {
            node.positionFrames = [];
        }

        if (node.scaleFrames == null) {
            node.scaleFrames = [];
        }

        if (node.rotationFrames == null) {
            node.rotationFrames = [];
        }

        var positionFrameData = Object.create(Object.prototype);
        positionFrameData.FrameIndex = frameIndex;
        positionFrameData.EasingData = {};
        positionFrameData.EasingData.Type = 0;
        positionFrameData.ctype = "PointFrameData";
        positionFrameData.X = node.x;
        positionFrameData.Y = node.y;

        node.positionFrames.push(positionFrameData);

        var scaleFrameData = Object.create(Object.prototype);
        scaleFrameData.FrameIndex = frameIndex;
        scaleFrameData.EasingData = {};
        scaleFrameData.EasingData.Type = 0;
        scaleFrameData.ctype = "ScaleValueFrameData";
        scaleFrameData.X = node.getScaleX();
        scaleFrameData.Y = node.getScaleY();
        node.scaleFrames.push(scaleFrameData);

        var rotationFrameData = Object.create(Object.prototype);
        rotationFrameData.FrameIndex = frameIndex;
        rotationFrameData.EasingData = {};
        rotationFrameData.EasingData.Type = 0;
        rotationFrameData.ctype = "ScaleValueFrameData";
        rotationFrameData.X = node.getRotationX();
        rotationFrameData.Y = node.getRotationY();
        node.rotationFrames.push(rotationFrameData);
    },

    constructTimeLineObject: function (node, property, frameName) {
        var object = Object.create(Object.prototype);
        if (node.ActionTag != null) {
            object.ActionTag = node.ActionTag;
        } else if (node.getComponent('ComExtensionData') != null && node.getComponent('ComExtensionData').getActionTag() != null) {
            object.ActionTag = node.getComponent('ComExtensionData').getActionTag();
        }
        object.Property = property;
        object.Frames = node[frameName];
        object.ctype = "TimelineData";

        node[frameName] = null;
        return object;
    },

    update: function (dt) {
        if (this._isRecordingStarted && this._nodesSelected != null && this._nodesSelected.length > 0) {
            this._recordingFrameIndex = this._recordingFrameIndex + 1;
            this._nodesSelected.forEach(function (element) {
                //construct position, rotation and scale framedata for now for each timesecond
                this.constructFrameData(element, this._recordingFrameIndex);
                this.constructAnimationFrameData(element, this._recordingFrameIndex, false);
            }, this);
        }
    },

    constructRemoveAnimationFrame: function (element) {
        element._previousAnimationName = null;
        this.constructAnimationFrameData(element, this._recordingFrameIndex, true);
    }
});

var HelloWorldScene = cc.Scene.extend({
    ctor: function () {
        this._super();
        if (LAYER_INIT === false) {
            LAYER_INIT = true;
            cc.log('initing layer...should only be once');
            this._sceneLayer = new HelloWorldLayer();
            this.addChild(this._sceneLayer);
            this._sceneLayer.init();
        }
    },
    onEnter: function () {
        this._super();
        this._sceneLayer.pageKey = "res/chimple.page1.scene.json";
        this._sceneLayer.loadSceneFromStorage();
        this._sceneLayer.registerEventListenerForAllChildren();
    }
});