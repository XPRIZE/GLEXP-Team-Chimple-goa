chimple.ContentPanel = cc.LayerColor.extend({
    ctor: function (pageKey, width, height, position) {
        this._super(cc.color.WHITE, width, height);
        this.setPosition(position);
        this._pageKey = pageKey;
        this._nodesSelected = [];
        this._nodesTouchedWhileRecording = [];
        this._isRecordingStarted = false;
        this._moveAction = true;
    },
    loadSceneFromStorage: function () {
        //check if data exists in localstorage with Key
        var storedSceneString = cc.sys.localStorage.getItem(this._pageKey);
        if (storedSceneString != null && storedSceneString.length > 0) {
            var storedSceneJSON = JSON.parse(storedSceneString);
            this.putIntoCacheFromLocalStorage(this._pageKey, storedSceneJSON);
            this.doPostLoadingProcessForScene(this._pageKey, false);
        }
    },

    putIntoCacheFromLocalStorage: function (cacheKey, contents) {
        cc.loader.cache[cacheKey] = contents;
    },

    doPostLoadingProcessForScene: function (fileToLoad, shouldSaveToLocalStorage) {
        if (this._constructedScene != null) {
            this._constructedScene.node.removeFromParent(true);
        }        
        this._constructedScene = ccs.load(fileToLoad);
        if (this._constructedScene != null) {
            this.addChild(this._constructedScene.node, 0);
            if (!cc.sys.isNative) {
                this._constructedScene.node._renderCmd._dirtyFlag = 1;
            }
            // this._constructedScene.node.children.forEach(function (element) {
            //     var eventObj = new chimple.SpriteTouchHandler(this);
            //     var listener = cc.EventListener.create(eventObj);
            //     cc.eventManager.addListener(listener, element);
            // }, this);
            this.registerEventListenerForAllChildren();
            //parse JSON and store in local storage
            if (shouldSaveToLocalStorage) {
                this.parseScene(this, fileToLoad);
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
                //this.updateNodesNameToUniqueName(data, resourcePath);

                // if (this._propsContainer != null && this._propsContainer.length > 0) {
                //     this._propsContainer.forEach(function (propObject) {
                //         data.Content.Content.ObjectData.Children.push(propObject);
                //     }, this);
                // }
                // this._propsContainer = [];
                context.saveSceneToLocalStorage(JSON.stringify(data));
            }
        });
    },

    saveSceneToLocalStorage: function (data) {
        cc.sys.localStorage.setItem(this._pageKey, data);
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
        var storedSceneString = cc.sys.localStorage.getItem(this._pageKey);
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
        this._sceneTextKey = this._pageKey + ".text";
        var textEditScene = new TextEditScene(this._sceneText, this._sceneTextKey);
        cc.director.pushScene(textEditScene);
    },

    playScene: function () {
        var playScene = new PlayRecordingScene(this._pageKey);
        cc.director.pushScene(playScene);
    },

    constructFrameData: function (node, frameIndex) {
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

    constructRemoveAnimationFrame: function (element) {
        element._previousAnimationName = null;
        this.constructAnimationFrameData(element, this._recordingFrameIndex, true);
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
    
    doPostLoadingProcessForImage: function (imageToLoad) {
        var sprite = new cc.Sprite(imageToLoad);
        this.addChild(sprite, 1);
        sprite.setPosition(cc.director.getWinSize().width / 2, cc.director.getWinSize().height / 2);
        sprite.setScale(1);


        var loadedImageObject = this.constructJSONFromCCSprite(sprite);
        sprite.ActionTag = loadedImageObject.ActionTag;

        var storedSceneString = cc.sys.localStorage.getItem(this._pageKey);
        if (storedSceneString != null && storedSceneString.length > 0) {
            var storedSceneJSON = JSON.parse(storedSceneString);
            if (storedSceneJSON) {
                storedSceneJSON.Content.Content.ObjectData.Children.push(loadedImageObject);
                this.saveSceneToLocalStorage(JSON.stringify(storedSceneJSON));
            }
        }
        else {
            // this._propsContainer.push(loadedImageObject);
        }

        var eventObj = new chimple.SpriteTouchHandler(this);
        var listener = cc.EventListener.create(eventObj);
        cc.eventManager.addListener(listener, sprite);

    },

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

    constructJSONFromTextSprite: function (sprite) {
        var object = Object.create(Object.prototype);
        object.FontSize = "12";
        object.LabelText = "How are you??";
        object.PlaceHolderText = "";
        object.MaxLengthEnable = true;
        object.MaxLengthText = 50;
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
        object.Alpha = sprite._alpha;
        object.Tag = sprite.tag;
        if (sprite.getName().indexOf("%%") === -1) {
            sprite.setName(sprite.getName() + "%%" + this.generateUUID());
        }
        object.ActionTag = -new Date().valueOf();
        object.Name = sprite.getName();
        object.ctype = "TextFieldObjectData";

        if (sprite.getComponent('ComExtensionData') && sprite.getComponent('ComExtensionData').getCustomProperty() != null) {
            object.UserData = sprite.getComponent('ComExtensionData').getCustomProperty();
        };
        return object;
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

    addCharacterToScene: function (configuration) {
        var load = ccs.load(configuration.json);
        cc.loader.loadJson('res/characters/skeletonConfig/' + load.node.getName() + '.json', function (error, data) {
            cc.log('data:' + data);
            if (data != null) {
                load.node._skeletonConfig = data;
                load.node._currentAnimationName = data.animations[0].name;
                if (configuration.skinNameMap) {
                    if (data.skinNameMaps && data.skinNameMaps[configuration.skinNameMap]) {
                        load.node.changeSkins(data.skinNameMaps[configuration.skinNameMap]);
                    }
                    var subBonesMap = load.node.getAllSubBonesMap();
                    for(var name in subBonesMap) {
                        var bone = subBonesMap[name];
                        if(bone != null) {
                            bone.displaySkin(name);
                        }
                    }
                }
            }
        });

        load.node.setPosition(900, 900);

        var eventObj = new chimple.SkeletonTouchHandler(this);
        var listener = cc.EventListener.create(eventObj);
        cc.eventManager.addListener(listener, load.node);
        this.addChild(load.node);
        load.node.runAction(load.action);
        if (!cc.sys.isNative) {
            load.node._renderCmd._dirtyFlag = 1;
        }
        this.parseCharacter(configuration.json, load);
    },

    parseCharacter: function (fileToLoad, load) {
        cc.log('got file:' + fileToLoad);
        var resourcePath = fileToLoad.replace("res/", "");
        cc.log('resourcePath:' + resourcePath);
        cc.log('skeleton:' + load.node);
        var skeletonObject = this.constructJSONFromCharacter(load.node, resourcePath);
        load.node.ActionTag = skeletonObject.ActionTag;
        // context.saveCharacterToLocalStorage(JSON.stringify(skeletonObject));
        cc.log('JSON.stringify(skeletonObject):' + JSON.stringify(skeletonObject));
        var storedSceneString = cc.sys.localStorage.getItem(this._pageKey);
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

    enableTargetTransformForTarget: function (context, touch, target, location) {
        if (context._moveAction) {
            target.setPosition(location);
        } else if (context._rotateAction || context._scaleAction) {
            context.calcAngleAndRotationForTarget(touch, target);
            context.calcScaleForTarget(context, touch, target);
        }
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

    constructConfigPanel: function (target) {
        this._objectConfigPanel.setTarget(target);
        // if (this._controlPanel.getCurrentTarget() != target) {
        //     if (target.getName().indexOf("Skeleton") != -1) {
        //         this._controlPanel.push(new chimple.ConfigPanel(target, cc.p(0, 0), cc.size(760, 1800), 2, 4, chimple.storyConfigurationObject.editObject))
        //     } else {
        //         this._controlPanel.push(new chimple.ConfigPanel(target, cc.p(0, 0), cc.size(760, 1800), 2, 4, chimple.storyConfigurationObject.editCharacter))
        //     }
        // }
    },

    update: function (dt) {
        if (this._isRecordingStarted && this._nodesSelected != null && this._nodesSelected.length > 0) {
            this._recordingFrameIndex = this._recordingFrameIndex + 1;
            this._nodesSelected.forEach(function (element) {
                console.log('record movement for Node:' + element);
                //construct position, rotation and scale framedata for now for each timesecond
                this.constructFrameData(element, this._recordingFrameIndex);
                this.constructAnimationFrameData(element, this._recordingFrameIndex, false);
            }, this);
        }
    },

    onEnter: function () {
        this._super();
        // this._sceneLayer.pageKey = "res/chimple.page1.scene.json";
        this.loadSceneFromStorage();
    }



});
