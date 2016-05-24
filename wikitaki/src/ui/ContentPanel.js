var chimple = chimple || {};
chimple.RECORDING_TIME = 15;
chimple.ContentPanel = chimple.AbstractContentPanel.extend({
    ctor: function (width, height, position) {
        this._super(width, height, position);
        this.setPosition(position);
        this._nodesSelected = [];
        this._nodesTouchedWhileRecording = [];
        this._isRecordingStarted = false;
        this._moveAction = true;
        this._recordingCounter = 1;
        this.loadScene();
    },

    loadScene: function () {
        if (chimple.story != null && !chimple.isNewPage && chimple.story.items[chimple.pageIndex].scene.Content != null) {
            this.putIntoCache();
            this.doPostLoadingProcessForScene(chimple.STORY_KEY, false);
        } else {
            this._constructedScene = new cc.Node();
            this._constructedScene.setName("Scene");
            this.addChild(this._constructedScene);

            this._help = new cc.Sprite('#icons/help_click_add_bg.png');
            this._help.setPosition(cc.p(0,cc.director.getWinSize().height));
            this._help.setAnchorPoint(0, 1);
            this.addChild(this._help, 1);

        }
    },

    putIntoCache: function () {
        cc.loader.cache[chimple.STORY_KEY] = chimple.story.items[chimple.pageIndex].scene;
    },

    doPostLoadingProcessForScene: function (fileToLoad, shouldSaveScene) {
        if(this._help != null) {
            this.removeChild(this._help, true);
            this._help = null;
        }
        if (this._constructedScene != null) {
            this._constructedScene.removeFromParent(true);
        }
        if (fileToLoad == null) {
            return;
        }
        var constructedScene = ccs.load(fileToLoad);
        if (constructedScene != null) {
            this._constructedScene = constructedScene.node;
            if (this._constructedScene) {
                this.addChild(this._constructedScene);
                if (!cc.sys.isNative) {
                    this._constructedScene._renderCmd._dirtyFlag = 1;
                }
                this.registerEventListenerForAllChildren();
                this.postProcessForSceneObjects(this._constructedScene);
                //parse JSON and store in local storage
                if (shouldSaveScene) {
                    this.loadAndSaveScene(this, fileToLoad);
                }
            }
        }
    },

    loadAndSaveScene: function (context, fileToLoad) {
        var resourcePath = fileToLoad.substring(0, fileToLoad.lastIndexOf("/") + 1);
        var context = this;
        data = cc.loader.cache[fileToLoad];
        data = JSON.parse(JSON.stringify(data));
        if (data != null) {
            //new scene added
            chimple.ParseUtil.saveScene(data);
            // chimple.ParseUtil.saveSceneToLocalStorage(context._storyKey, context._currentPageIndex, JSON.stringify(data));
        }
    },

    postProcessForSceneObjects: function (node) {
        node.children.forEach(function (element) {
            if (element.getName().indexOf("Skeleton") != -1 || element.getName().indexOf("skeleton") != -1) {
                chimple.CharacterUtil.loadSkeletonConfig(element);
                if (element._userData && element._userData.colorSkins) {
                    chimple.CharacterUtil.colorSkins(element, element._userData.colorSkins);
                }
                
                if (element._userData && element._userData.visibleSkins) {
                    chimple.CharacterUtil.displaySkins(element, element._userData.visibleSkins);
                }
                
                
                if (element._userData && element._userData.currentAnimationName) {
                    element._currentAnimationName = element._userData.currentAnimationName;
                }
                chimple.CharacterUtil.addCharacterToFavorites(element);                
            }
        }, this);

    },


    registerEventListenerForAllChildren: function () {
        this.children.forEach(function (element) {
            if (element._name === 'Scene') {
                element.children.forEach(function (element) {
                    if (element.getComponent('ComExtensionData') && element.getComponent('ComExtensionData').getActionTag()) {
                        element.ActionTag = element.getComponent('ComExtensionData').getActionTag()
                    }
                    this.registerEventListenerForChild(element);
                }, this);
            }
        }, this);
    },

    registerEventListenerForChild: function (element) {
        if (element.getName().indexOf("Skeleton") != -1 || element.getName().indexOf("skeleton") != -1) {
            var eventObj = new chimple.SkeletonTouchHandler(this);
            var listener = cc.EventListener.create(eventObj);
            cc.eventManager.addListener(listener, element);
            if (!cc.sys.isNative) {
                element._renderCmd._dirtyFlag = 1;
            }
        } else if (element.getName().indexOf("ChimpleTextPanel") != -1) {
            if (element.children != null && element.children.length > 0) {
                var eventObj = new chimple.TextTouchHandler(this);
                var listener = cc.EventListener.create(eventObj);
                cc.eventManager.addListener(listener, element.children[0]);

            }
        }
        else {
            var eventObj = new chimple.SpriteTouchHandler(this);
            var listener = cc.EventListener.create(eventObj);
            cc.eventManager.addListener(listener, element);
        }
    },

    startRecording: function () {
        this._objectConfigPanel.setTarget(null);
        if (!this._isRecordingStarted) {
            this._isRecordingStarted = true;
            this._recordingFrameIndex = 0;
            cc.log("recording started");
            this._nodesTouchedWhileRecording = [];
            this.scheduleUpdate();
        } else {
            this._isRecordingStarted = false;
            cc.log("recording stopped");
            this._recordingCounter = 1;
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
        }
        
        if (chimple.currentBoxShownForNode != null) {
            var boundingBoxNode = chimple.currentBoxShownForNode.getChildByTag(chimple.DEFAULT_BOUNDING_BOX_TAG);
            if(boundingBoxNode) {
                boundingBoxNode.removeFromParent(true);    
            }
            
        }        
    },

    createTimeLinesForPlayAnimation: function (timelines) {
        //fetch scene json
        if (chimple.story && chimple.story.items != null && chimple.story.items.length > chimple.pageIndex) {
            chimple.story.items[chimple.pageIndex].scene.Content.Content.Animation.Timelines = timelines;
            chimple.story.items[chimple.pageIndex].scene.Content.Content.Animation.Duration = this._recordingFrameIndex;
            cc.sys.localStorage.setItem("duration", this._recordingFrameIndex);
            timelines = null;
        }
    },

    addTextToScene: function () {
        this.parent.addChild(new chimple.TextCreatePanel(cc.director.getWinSize().width, cc.director.getWinSize().height, cc.p(0, 0), chimple.story.items[chimple.pageIndex].sceneText, this.processText, this));
    },

    processText: function (text) {
        chimple.story.items[chimple.pageIndex].sceneText = text;
    },

    playSceneInEditMode: function () {
        var playScene = new PlayRecordingScene();
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
        if (node.positionFrames) {
            node.positionFrames.push(positionFrameData);
        }


        var scaleFrameData = Object.create(Object.prototype);
        scaleFrameData.FrameIndex = frameIndex;
        scaleFrameData.EasingData = {};
        scaleFrameData.EasingData.Type = 0;
        scaleFrameData.ctype = "ScaleValueFrameData";
        scaleFrameData.X = node.getScaleX();
        scaleFrameData.Y = node.getScaleY();
        if (node.scaleFrames) {
            node.scaleFrames.push(scaleFrameData);
        }


        var rotationFrameData = Object.create(Object.prototype);
        rotationFrameData.FrameIndex = frameIndex;
        rotationFrameData.EasingData = {};
        rotationFrameData.EasingData.Type = 0;
        rotationFrameData.ctype = "ScaleValueFrameData";
        rotationFrameData.X = node.getRotationX();
        rotationFrameData.Y = node.getRotationY();
        if (node.rotationFrames) {
            node.rotationFrames.push(rotationFrameData);
        }

    },

    constructTimeLineObject: function (node, property, frameName) {
        var object = Object.create(Object.prototype);
        if (node.ActionTag != null) {
            object.ActionTag = node.ActionTag;
        } else if (node.getComponent('ComExtensionData') != null && node.getComponent('ComExtensionData').getActionTag() != null) {
            object.ActionTag = node.getComponent('ComExtensionData').getActionTag();
        } else if (node._userData != null && node._actionTag != null) {
            object.ActionTag = node._actionTag;
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
        this._constructedScene.addChild(sprite);
        sprite.setPosition(cc.director.getWinSize().width / 2, cc.director.getWinSize().height / 2);
        sprite.setScale(1);

        var loadedImageObject = chimple.ParseUtil.constructJSONFromCCSprite(sprite);
        sprite.ActionTag = loadedImageObject.ActionTag;
        chimple.ParseUtil.saveObjectToStoredScene(loadedImageObject);
        this.registerEventListenerForChild(sprite);
    },

    addCharacterToScene: function (configuration) {
        var load = ccs.load(configuration.json);

        chimple.CharacterUtil.loadSkeletonConfig(load.node, configuration);

        load.node.setPosition(this.getContentSize().width / 2, this.getContentSize().height / 6);
        load.node.setScale(0.5, 0.5);
        this._constructedScene.addChild(load.node);
        load.node.runAction(load.action);
        this.registerEventListenerForChild(load.node);
        chimple.ParseUtil.saveCharacterToJSON(configuration.json, load);
    },

    enableTargetTransformForTarget: function (context, touch, target, location) {
        if (context._moveAction) {
            target.setPosition(location);
        } else if (context._rotateAction || context._scaleAction) {
            context.calcAngleAndRotationForTarget(touch, target);
            context.calcScaleForTarget(context, touch, target);
        }

        if (!this._isRecordingStarted) {
            chimple.ParseUtil.updateScaleRotationAndPositionObjectFromStoredScene(target);
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
    },

    backPressed: function () {
        //take a screen shot of page if index is 0 (first page of story)
        if (chimple.pageIndex == 0) {
            cc.log('title page');
            var gameCanvas = document.getElementById("gameCanvas");
            if (gameCanvas != null) {
                var dataURL = gameCanvas.toDataURL("image/png");
                var imageData = new Image();
                imageData.src = dataURL;

                var snapShotCanvas = document.getElementById('snapShotCanvas');
                var ctx = snapShotCanvas.getContext("2d");
                var xOffSet = (cc.director.getWinSize().width - cc.director.getWinSize().height) / 2;
                ctx.drawImage(imageData, xOffSet, 0, cc.director.getWinSize().height, cc.director.getWinSize().height, 0, 0, 450, 450);
                var snapShotDataURL = snapShotCanvas.toDataURL("image/png");
                chimple.story.titlePageDataURL = snapShotDataURL;
                ctx.clearRect(0, 0, snapShotCanvas.width, snapShotCanvas.height);
                snapShotCanvas = null;
            }
        }
        this.parent.removeChild(this, true);
        chimple.LAYER_INIT = false;
        chimple.LAYER_EDIT_STORY = false;
        cc.director.runScene(new HelloWorldScene());


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

    onEnter: function () {
        this._super();
        if (this._constructedScene) {
            chimple.CharacterUtil.storeActionToTemporaryStore(this._constructedScene);
        }
        this.registerEventListenerForAllChildren();
    },

    onExit: function () {
        this._super();
        if (this._constructedScene) {
            chimple.CharacterUtil.restoreActionFromTemporaryStore(this._constructedScene);
        }
    }
});
