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
        this._isRecordingPaused = false;
        this.loadScene();
    },

    loadScene: function () {
        if (chimple.story != null && !chimple.isNewPage && chimple.story.items[chimple.pageIndex].scene.Content != null) {
            this.putIntoCache();
            this.doPostLoadingProcessForScene(chimple.STORY_KEY, false);
        } else {
            this._help = new cc.Sprite('#icons/help_click_add_bg.png');
            this._help.setPosition(cc.p(0, cc.director.getWinSize().height));
            this._help.setAnchorPoint(0, 1);
            this.addChild(this._help, 1);
        }
    },

    putIntoCache: function () {
        cc.loader.cache[chimple.STORY_KEY] = chimple.story.items[chimple.pageIndex].scene;
    },

    //this method should only work when background changes - at this point backLayer MUST have 2 children
    copyUserAddedObjectsToScene: function () {
        if (this._backLayer && this._backLayer.children && this._backLayer.children.length == 2) {
            var backGroundChanged = false;
            var count = this._backLayer.children[0].children.length;
            for (var i = 0; i < count; i++) {
                var element = this._backLayer.children[0].children[i];
                if (element && element._userData && element._userData.userAdded) {
                    // this._constructedScene.children.push(element);
                    element.removeFromParent();
                    i--;
                    this._constructedScene.addChild(element);
                    backGroundChanged = true;
                }

                chimple.customSprites.forEach(function (customSprite, index) {
                    if (element && customSprite === element.getName()) {
                        element.removeFromParent();
                        i--;
                        this._constructedScene.addChild(element);
                    }
                }, this);

            }
            if (backGroundChanged) {
                this._backLayer.children[0].removeFromParent(true);
            }

        }

        if (this._frontLayer && this._frontLayer.children && this._frontLayer.children.length > 0) {
            this._frontLayer.children.forEach(function (element, index) {

                chimple.customSprites.forEach(function (customSprite, index) {
                    if (customSprite === element.getName()) {
                        element.removeFromParent();
                        this._constructedScene.addChild(element);
                    }
                }, this);
            }, this);
        }
    },

    doPostLoadingProcessForScene: function (fileToLoad, shouldSaveScene) {
        if (this._help != null) {
            this.removeChild(this._help, true);
            this._help = null;
        }

        if (fileToLoad == null) {
            return;
        }
        var constructedScene = ccs.load(fileToLoad);
        if (constructedScene != null) {
            this._constructedScene = constructedScene.node;
            if (this._constructedScene) {
                this._backLayer.addChild(this._constructedScene);
                //now copy user added objects from earlier constructed scene if any
                this.copyUserAddedObjectsToScene();
                this.attachCustomObjectSkinToSkeleton(this._constructedScene);
                if (!cc.sys.isNative) {
                    this._constructedScene._renderCmd._dirtyFlag = 1;
                }
                this.registerEventListenerForAllChildren();
                this.postProcessForSceneObjects(this._constructedScene);
                //parse JSON and store in local storage
                if (shouldSaveScene) {
                    this.loadAndSaveScene(this, fileToLoad);
                }

                if (this._constructedScene.parent.parent
                    && chimple.story.items[chimple.pageIndex].scene.scaleX
                    && chimple.story.items[chimple.pageIndex].scene.scaleY) {
                    this._constructedScene.parent.parent.setScale(chimple.story.items[chimple.pageIndex].scene.scaleX,
                        chimple.story.items[chimple.pageIndex].scene.scaleY);
                }

                if (this._constructedScene.parent.parent
                    && chimple.story.items[chimple.pageIndex].scene.posX
                    && chimple.story.items[chimple.pageIndex].scene.posY) {
                    this._constructedScene.parent.parent.setPosition(cc.p(chimple.story.items[chimple.pageIndex].scene.posX,
                        chimple.story.items[chimple.pageIndex].scene.posY));
                }
                
            }
        }
    },

    loadAndSaveScene: function (context, fileToLoad) {
        var resourcePath = fileToLoad.substring(0, fileToLoad.lastIndexOf("/") + 1);
        var context = this;
        data = cc.loader.cache[fileToLoad];
        data = JSON.parse(JSON.stringify(data));
        chimple.ParseUtil.copyUserAddedDataToScene(data);
        if (data != null) {
            chimple.ParseUtil.saveScene(data);
        }
    },

    postProcessForSceneObjects: function (node) {
        node.children.forEach(function (element) {
            if (element.getName().indexOf("Skeleton") != -1 || element.getName().indexOf("skeleton") != -1) {
                chimple.CharacterUtil.loadSkeletonConfig(element);
                if (element._userData && element._userData.colorSkins) {
                    element._userData.colorSkins.forEach(function (colorSkin) {
                        chimple.CharacterUtil.colorSkins(element, colorSkin);
                })}

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
            if (element._name === 'FrontLayer' || element._name === 'BackLayer') {
                element.children.forEach(function (child) {
                    if (child.getName() === 'Scene') {
                        child.children.forEach(function (subChild) {
                            if (subChild.getComponent('ComExtensionData') && subChild.getComponent('ComExtensionData').getActionTag()) {
                                subChild.ActionTag = subChild.getComponent('ComExtensionData').getActionTag();
                            }
                        }, this);
                    }
                    else if (child.getComponent('ComExtensionData') && child.getComponent('ComExtensionData').getActionTag()) {
                        child.ActionTag = child.getComponent('ComExtensionData').getActionTag();
                    }
                    this.registerEventListenerForChild(child);
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
        }
        else if ((element.children && element.children.length == 0) || (element.children.length == 1 && element.children[0].tag == chimple.DEFAULT_BOUNDING_BOX_TAG)) {
            var eventObj = new chimple.SpriteTouchHandler(this);
            var listener = cc.EventListener.create(eventObj);
            cc.eventManager.addListener(listener, element);
        } else if (element.children && element.children.length > 0) {
            element.children.forEach(function (child) {
                if (child && (child.getName().indexOf("Skeleton") != -1 || child.getName().indexOf("skeleton") != -1)) {
                    var eventObj = new chimple.SkeletonTouchHandler(this);
                    var listener = cc.EventListener.create(eventObj);
                    cc.eventManager.addListener(listener, child);
                    if (!cc.sys.isNative) {
                        child._renderCmd._dirtyFlag = 1;
                    }
                } else if (child) {
                    var eventObj = new chimple.SpriteTouchHandler(this);
                    var listener = cc.EventListener.create(eventObj);
                    cc.eventManager.addListener(listener, child);
                }
            }, this);
            //else if (child && child.getName().indexOf('background') == -1) {

        }
    },

    processFrames: function (object) {
        var framesWhenObjectsTouched = [];
        if (object && object.Frames) {
            object.Frames.forEach(function (frameData, index) {
                if (frameData.touched) {
                    framesWhenObjectsTouched.push(frameData);
                }
                //ending frame
                if (index === object.Frames.length - 1) {
                    framesWhenObjectsTouched.push(frameData);
                }
            }, this);

            object.Frames = framesWhenObjectsTouched;
        }
    },


    processPositionFrames: function (object) {
        var framesWhenObjectsTouched = [];
        var lastFramesWhenTouchLifted = [];
        var intermediateFrames = [];
        var uniquePositionFrameIndexes = [];
        var previousFrameX = 0;
        var curFrameX = 0;
        var prevSign = 0;
        var curSign = 0;
        if (object && object.Frames) {
            object.Frames.forEach(function (frameData, index) {
                if (frameData.touched) {
                    framesWhenObjectsTouched.push(frameData);
                    previousFrameX = frameData.X;
                }

                curFrameX = frameData.X;
                curSign = Math.sign(curFrameX - previousFrameX);
                if (curSign != prevSign) {
                    intermediateFrames.push(object.Frames[index - 1]);
                    intermediateFrames.push(frameData);
                }
                previousFrameX = curFrameX;
                prevSign = curSign;
                //ending frame
                if (index === object.Frames.length - 1) {
                    lastFramesWhenTouchLifted.push(frameData);
                }
            }, this);
            intermediateFrames = this.uniqueBy(intermediateFrames, function (x) { return x.X; });
            uniquePositionFrameIndexes = this.uniqueFrameIndexBy(intermediateFrames, function (x) { return x.FrameIndex; });
            framesWhenObjectsTouched = framesWhenObjectsTouched.concat(intermediateFrames, lastFramesWhenTouchLifted);
            object.Frames = framesWhenObjectsTouched.sort(this.compareByFrameIndex);
        }
        return uniquePositionFrameIndexes;
    },

    processRotationOrScaleFrames: function (object, additionalFrameIndexes) {
        var framesWhenObjectsTouched = [];
        var lastFramesWhenTouchLifted = [];
        var intermediateFrames = [];
        var additionalFrames = [];
        var previousFrameX = 0;
        var curFrameX = 0;
        var prevSign = 0;
        var curSign = 0;
        if (object && object.Frames) {
            object.Frames.forEach(function (frameData, index) {
                if (frameData.touched) {
                    framesWhenObjectsTouched.push(frameData);
                    previousFrameX = frameData.X;
                }

                curFrameX = frameData.X;
                curSign = Math.sign(curFrameX - previousFrameX);
                if (curSign != prevSign) {
                    intermediateFrames.push(object.Frames[index - 1]);
                    intermediateFrames.push(frameData);
                }

                if (additionalFrameIndexes && additionalFrameIndexes.indexOf(frameData.FrameIndex) != -1) {
                    additionalFrames.push(frameData);
                }

                previousFrameX = curFrameX;
                prevSign = curSign;
                //ending frame
                if (index === object.Frames.length - 1) {
                    lastFramesWhenTouchLifted.push(frameData);
                }
            }, this);
            intermediateFrames = this.uniqueBy(intermediateFrames, function (x) { return x.FrameIndex; });
            framesWhenObjectsTouched = framesWhenObjectsTouched.concat(intermediateFrames, additionalFrames, lastFramesWhenTouchLifted);
            object.Frames = framesWhenObjectsTouched.sort(this.compareByFrameIndex);
        }
    },


    compareByFrameIndex: function (a, b) {
        if (a.FrameIndex < b.FrameIndex)
            return -1;
        else if (a.FrameIndex > b.FrameIndex)
            return 1;
        else
            return 0;
    },

    uniqueFrameIndexBy: function (arr, fn) {
        var unique = {};
        var distinct = [];
        arr.forEach(function (x) {
            var key = fn(x);
            if (!unique[key]) {
                distinct.push(key);
                unique[key] = true;
            }
        });
        return distinct;
    },


    uniqueBy: function (arr, fn) {
        var unique = {};
        var distinct = [];
        arr.forEach(function (x) {
            var key = fn(x);
            if (!unique[key]) {
                distinct.push(x);
                unique[key] = true;
            }
        });
        return distinct;
    },

    createTimeLines: function (element, timelines) {
        var positionFrames = this.constructTimeLineObject(element, "Position", "positionFrames");
        var posFrameIndexes = null;
        if (positionFrames) {
            posFrameIndexes = this.processPositionFrames(positionFrames);
            timelines.push(positionFrames);
        }

        var scaleFrames = this.constructTimeLineObject(element, "Scale", "scaleFrames");
        if (scaleFrames) {
            this.processRotationOrScaleFrames(scaleFrames, posFrameIndexes);
            timelines.push(scaleFrames);
        }

        var rotationFrames = this.constructTimeLineObject(element, "RotationSkew", "rotationFrames");
        if (rotationFrames) {
            this.processRotationOrScaleFrames(rotationFrames, posFrameIndexes);
            timelines.push(rotationFrames);
        }

        var animationFrames = this.constructTimeLineObject(element, "ActionValue", "animationFrames");
        if (animationFrames) {
            timelines.push(animationFrames);
        }
    },

    startRecording: function () {
        this._objectConfigPanel.setTarget(null);
        if (!this._isRecordingStarted) {
            this._isRecordingStarted = true;
            this._recordingFrameIndex = 0;
            this._anyNodeTouched = false;
            this._nodesTouchedWhileRecording = [];
            this.scheduleUpdate();
        } else {
            this._isRecordingStarted = false;
            this._recordingCounter = 1;
            var timelines = [];
            if (this._nodesTouchedWhileRecording != null && this._nodesTouchedWhileRecording.length > 0) {
                this._nodesTouchedWhileRecording.forEach(function (element) {
                    this.createTimeLines(element, timelines);
                }, this);
            }
            this.createTimeLinesForPlayAnimation(timelines);
            this._nodesTouchedWhileRecording = [];
            this.unscheduleUpdate();
        }

        chimple.ParseUtil.removeExistingBoundingBoxNodeByTag(chimple.DEFAULT_BOUNDING_BOX_TAG);
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
        this.parent.addChild(new chimple.TextCreatePanel(cc.director.getWinSize().width, cc.director.getWinSize().height, cc.p(150, 150), chimple.story.items[chimple.pageIndex].sceneText, this.processText, this));
    },

    processText: function (text) {
        chimple.story.items[chimple.pageIndex].sceneText = text;
    },

    playSceneInEditMode: function () {
        var playScene = new PlayRecordingScene();
        cc.director.pushScene(playScene);
    },

    constructFrameData: function (node, frameIndex, isNodeTouchedAtThisFrame) {
        var positionFrameData = Object.create(Object.prototype);
        positionFrameData.FrameIndex = frameIndex;
        positionFrameData.EasingData = {};
        positionFrameData.EasingData.Type = 0;
        positionFrameData.ctype = "PointFrameData";
        positionFrameData.X = node.x;
        positionFrameData.Y = node.y;
        positionFrameData.touched = isNodeTouchedAtThisFrame;
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
        scaleFrameData.touched = isNodeTouchedAtThisFrame;
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
        rotationFrameData.touched = isNodeTouchedAtThisFrame;
        if (node.rotationFrames) {
            node.rotationFrames.push(rotationFrameData);
        }

    },

    constructTimeLineObject: function (node, property, frameName) {
        if (node[frameName] == null) {
            return null;
        }
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
        if (!node._currentAnimationName) {
            return;
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
        // this._constructedScene.addChild(sprite);        
        this._frontLayer.addChild(sprite);
        sprite.setPosition(cc.director.getWinSize().width / 2, cc.director.getWinSize().height / 2);
        sprite.setScale(1);
        var loadedImageObject = chimple.ParseUtil.constructJSONFromCCSprite(sprite);
        sprite.ActionTag = loadedImageObject.ActionTag;
        chimple.customSprites.push(sprite.getName());
        chimple.ParseUtil.saveObjectToStoredScene(loadedImageObject);
        this.registerEventListenerForChild(sprite);
    },

    addCharacterToScene: function (configuration) {
        cc.log(new Date());
        var load = ccs.load(configuration.json);
        cc.log(new Date());

        chimple.CharacterUtil.loadSkeletonConfig(load.node, configuration);
        cc.log(new Date());

        load.node.setPosition(this.getContentSize().width / 2, this.getContentSize().height / 6);
        load.node.setScale(0.5, 0.5);
        // this._constructedScene.addChild(load.node);        
        this._frontLayer.addChild(load.node);
        load.node.runAction(load.action);
        this.registerEventListenerForChild(load.node);
        cc.log(new Date());
        chimple.ParseUtil.saveCharacterToJSON(configuration.json, load);
        cc.log(new Date());
    },

    zoomAll: function (context, touch, target) {
        var nodePostion = target.getPosition();
        var currentPosition = target.parent.convertToNodeSpace(touch.getLocation());
        context._currentDiff = cc.pDistance(currentPosition, nodePostion);
        if (context._lastDiff == null) {
            context._lastDiff = context._currentDiff;
        }
        var distanceMoved = (context._currentDiff - context._lastDiff) / context._initialDiff;
        context._lastDiff = context._currentDiff;
        var computedScaleX = target.getScaleX() + distanceMoved * context._initialScaleX;
        var computedScaleY = target.getScaleY() + distanceMoved * context._initialScaleY;
        if (computedScaleX >= 1.0 && computedScaleX < 5.0) {
            target.setScale(computedScaleX, computedScaleY);
            chimple.story.items[chimple.pageIndex].scene.scaleX = computedScaleX;
            chimple.story.items[chimple.pageIndex].scene.scaleY = computedScaleY;
        }
    },

    enableTargetTransformForTarget: function (context, touch, target, location) {
        if (target.getName().indexOf("background") != -1) {
            if (context._moveAction) {
                if (!this._previousTouch) {
                    this._previousTouch = touch.getLocationInView();
                }
                var locationPoint = touch.getLocationInView();
                var deltaX = locationPoint.x - this._previousTouch.x;
                var deltaY = locationPoint.y - this._previousTouch.y;
                if (!this._sceneNode) {
                    context.children.forEach(function (element) {
                        if (element._name === 'FrontLayer' || element._name === 'BackLayer') {
                            element.children.forEach(function (child) {
                                if (child.getName() === 'Scene') {
                                    this._sceneNode = child;
                                }
                            }, context);
                        }
                    }, context);

                }
                if (this._sceneNode) {
                    // cc.log('this._sceneNode.getBoundingBox().height - Math.abs(this._sceneNode.getPosition().y)' + (this._sceneNode.getBoundingBoxToWorld().height - Math.abs(this._sceneNode.getPosition().y + deltaY)));
                    // if (this._sceneNode.getBoundingBoxToWorld().height - Math.abs(this._sceneNode.getPosition().y + deltaY) > 450 
                    //     && (this._sceneNode.getPosition().y + deltaY) <= 0
                    //     && (this._sceneNode.getPosition().x + deltaX) <= 0
                    //     && this._sceneNode.getBoundingBoxToWorld().width - Math.abs(this._sceneNode.getPosition().x) + deltaX > 450)
                    //      {

                    // }

                    this._sceneNode.parent.parent.setPosition(cc.p(this._sceneNode.parent.parent.getPosition().x + deltaX, this._sceneNode.parent.parent.getPosition().y + deltaY));
                    chimple.story.items[chimple.pageIndex].scene.posX = this._sceneNode.parent.parent.getPosition().x;
                    chimple.story.items[chimple.pageIndex].scene.posY = this._sceneNode.parent.parent.getPosition().y;

                }
                this._previousTouch = locationPoint;

            } else if (context._scaleAction) {
                if (!this._sceneNode) {
                    context.children.forEach(function (element) {
                        if (element._name === 'FrontLayer' || element._name === 'BackLayer') {
                            element.children.forEach(function (child) {
                                if (child.getName() === 'Scene') {
                                    this._sceneNode = child;
                                }
                            }, context);
                        }
                    }, context);

                }

                if (this._sceneNode) {
                    context.zoomAll(context, touch, this._sceneNode.parent.parent)
                }
            }
        } else {
            if (context._moveAction) {
                target.setPosition(location);
            } else if (context._rotateAction) {
                context.calcAngleAndRotationForTarget(touch, target);
            } else if (context._scaleAction) {
                context.calcScaleForTarget(context, touch, target);
            }
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
            this._anyNodeTouched = true;
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
        this._previousTouch = null;
        this._sceneNode = null;
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
                chimple.image.titlePageDataURL = snapShotDataURL;
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
        if (this._isRecordingStarted && !this._isRecordingPaused) {
            this._recordingFrameIndex = this._recordingFrameIndex + 1;
        }

        if (this._isRecordingStarted && this._nodesSelected != null && this._nodesSelected.length > 0) {
            this._nodesSelected.forEach(function (element) {
                //construct position, rotation and scale framedata for now for each timesecond
                this.constructFrameData(element, this._recordingFrameIndex, this._anyNodeTouched);
                this.constructAnimationFrameData(element, this._recordingFrameIndex, false);
            }, this);

            this._anyNodeTouched = false;
        }
    },

    onEnter: function () {
        this._super();
        if (this._constructedScene) {
            chimple.CharacterUtil.storeActionToTemporaryStore(this._constructedScene);
        }

        if (this._frontLayer) {
            chimple.CharacterUtil.storeActionToTemporaryStore(this._frontLayer);
        }

        if (this._backLayer) {
            chimple.CharacterUtil.storeActionToTemporaryStore(this._backLayer);
        }

        this.registerEventListenerForAllChildren();
    },

    onExit: function () {
        this._super();
        if (this._constructedScene) {
            chimple.CharacterUtil.restoreActionFromTemporaryStore(this._constructedScene);
        }

        if (this._frontLayer) {
            chimple.CharacterUtil.restoreActionFromTemporaryStore(this._frontLayer);
        }

        if (this._backLayer) {
            chimple.CharacterUtil.restoreActionFromTemporaryStore(this._backLayer);
        }

    }
});
