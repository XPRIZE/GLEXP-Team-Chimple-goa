var xc = xc || {};

xc.RECORDING_TIME = 15;
xc.ContentPanel = xc.AbstractContentPanel.extend({
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
        if (xc.story != null && !xc.isNewPage && xc.story.items[xc.pageIndex].scene.Content != null) {
            this.putIntoCache(); 
            this.doPostLoadingProcessForScene(xc.STORY_KEY, false);
        } else {
            this._help = new cc.Sprite('#icons/help_click_add_bg.png');
            this._help.setPosition(cc.p(0, cc.director.getWinSize().height));
            this._help.setAnchorPoint(0, 1);
            this.addChild(this._help, 1);
        }
    },

    putIntoCache: function () {
        cc.loader.cache[xc.STORY_KEY] = xc.story.items[xc.pageIndex].scene;
    },

    //this method should only work when background changes - at this point backLayer MUST have 2 children, i.e. old and new scene
    copyUserAddedObjectsToScene: function () {
        if (this._backLayer && this._backLayer.children && this._backLayer.children.length == 2) {
            var backGroundChanged = true;
            var count = this._backLayer.children[0].children.length;
            for (var i = 0; i < count; i++) {
                var element = this._backLayer.children[0].children[i];
                if(element && element.getName() && element.getName().indexOf("Skeleton") != -1 && xc.ParseUtil.getUserData(element._actionTag,'userAdded')) {
                    var action = element.actionManager.getActionByTag(element.tag, element);                
                    if (action) {
                        action.retain();
                        element._storedAction = action;
                    }

                    element.retain();
                    element.removeFromParent();
                    i--;
                    this._constructedScene.addChild(element);
                    action.release();
                    var action = element._storedAction;
                    if (action) {
                        element.runAction(action);                        
                    }                    
                } else if (element && element.UserData && element.UserData.userAdded) {
                    element.retain();
                    element.removeFromParent();
                    i--;
                    this._constructedScene.addChild(element);
                }
                if(xc.customSprites != undefined) {
                    xc.customSprites.forEach(function (customSprite, index) {
                        if (element && customSprite === element.getName()) {
                            element.retain();
                            element.removeFromParent();
                            i--;
                            this._constructedScene.addChild(element);
                            //element.release();
                        }
                    }, this);
                }

            }
            if (backGroundChanged) {
                this._backLayer.children[0].removeFromParent(true);
            }

        }

        if (this._frontLayer && this._frontLayer.children && this._frontLayer.children.length > 0) {
            this._frontLayer.children.forEach(function (element, index) {
                if(xc.customSprites != undefined) {
                    xc.customSprites.forEach(function (customSprite, index) {
                        if (customSprite === element.getName()) {
                            element.retain();
                            element.removeFromParent();
                            this._constructedScene.addChild(element);
                        //element.release();
                        }
                    }, this);
                }
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
        var obj = cc.loader.getRes(fileToLoad);
        var constructedScene = ccs.load(fileToLoad, xc.path + "wikitaki/");
        if (constructedScene != null) {
            this._constructedScene = constructedScene.node;
            if (this._constructedScene) {
                //if(this._constructedScene.width == xc.DESIGNED_WIDTH) {
                 //   this._constructedScene.setScale(xc.contentPanelScaleFactor);
                //}                

                var configPanelWidth = (cc.director.getWinSize().width - cc.director.getWinSize().height) / 2;
                this._constructedScene.setAnchorPoint(0,0);
                this._constructedScene.setPosition(0,0);                
                this._backLayer.addChild(this._constructedScene);
                //now copy user added objects from earlier constructed scene if any
                this.copyUserAddedObjectsToScene();
                this.attachCustomObjectSkinToSkeleton(this._constructedScene);
                if (!cc.sys.isNative) {
                    this._constructedScene._renderCmd._dirtyFlag = 1;
                }
                cc.log("calling registerEventListenerForAllChildren on doPostLoadingProcessForScene");
                this.registerEventListenerForAllChildren();
                this.postProcessForSceneObjects(this._constructedScene);
                //parse JSON and store in local storage
                if (shouldSaveScene) {
                    this.loadAndSaveScene(this, fileToLoad);
                }

                if (this._constructedScene.parent.parent
                    && xc.story.items[xc.pageIndex].scene.scaleX
                    && xc.story.items[xc.pageIndex].scene.scaleY) {
                    this._constructedScene.parent.parent.setScale(xc.story.items[xc.pageIndex].scene.scaleX,
                        xc.story.items[xc.pageIndex].scene.scaleY);
                }

                if (this._constructedScene.parent.parent
                    && xc.story.items[xc.pageIndex].scene.posX
                    && xc.story.items[xc.pageIndex].scene.posY) {
                    this._constructedScene.parent.parent.setPosition(cc.p(xc.story.items[xc.pageIndex].scene.posX,
                        xc.story.items[xc.pageIndex].scene.posY));
                }
                
            }
        }
    },

    loadAndSaveScene: function (context, fileToLoad) {
        var resourcePath = fileToLoad.substring(0, fileToLoad.lastIndexOf("/") + 1);
        var context = this;
        if(cc.sys.isNative) {
            data = cc.loader.getRes(fileToLoad);
        } else {
            data = cc.loader.cache[fileToLoad];
        }
        if (data != null && data != undefined) {
            data = JSON.parse(JSON.stringify(data));            
            xc.ParseUtil.copyUserAddedDataToScene(data);
            xc.ParseUtil.saveScene(data);
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
                    cc.log('prcessing color skins from user data');
                    element.UserData.colorSkins.forEach(function (colorSkin) {
                        xc.CharacterUtil.colorSkins(element, colorSkin);
                })
            }


                if (element.UserData && element.UserData.currentAnimationName) {
                    element._currentAnimationName = element.UserData.currentAnimationName;
                }
                xc.CharacterUtil.addCharacterToFavorites(element);
            }
        }, this);

    },

    registerEventListenerForAllChildren: function () {
        this.children.forEach(function (element) {
            if (element._name === 'FrontLayer' || element._name === 'BackLayer') {
                element.children.forEach(function (child) {
                    if (child.getName() === 'Scene') {
                        child.children.forEach(function (subChild) {
                            cc.log('in registerEventListenerForAllChildren:' + subChild.ActionTag);
                            if (subChild.getComponent('ComExtensionData') && subChild.getComponent('ComExtensionData').getActionTag()) {
                                cc.log('in registerEventListenerForAllChildren 4444:' + subChild.getComponent('ComExtensionData').getActionTag());
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
            var eventObj = new xc.SkeletonTouchHandler(this);
            var listener = cc.EventListener.create(eventObj);
            cc.eventManager.addListener(listener, element);
            if (!cc.sys.isNative) {
                element._renderCmd._dirtyFlag = 1;
            }
        }
        else if ((element.children && element.children.length == 0) || (element.children.length == 1 && element.children[0].tag == xc.DEFAULT_BOUNDING_BOX_TAG)) {
            var eventObj = new xc.SpriteTouchHandler(this);
            var listener = cc.EventListener.create(eventObj);
            cc.eventManager.addListener(listener, element);
        } else if (element.children && element.children.length > 0) {
            element.children.forEach(function (child) {
                if (child && (child.getName().indexOf("Skeleton") != -1 || child.getName().indexOf("skeleton") != -1)) {
                    var eventObj = new xc.SkeletonTouchHandler(this);
                    var listener = cc.EventListener.create(eventObj);
                    cc.eventManager.addListener(listener, child);
                    if (!cc.sys.isNative) {
                        child._renderCmd._dirtyFlag = 1;
                    }
                } else if (child) {
                    var eventObj = new xc.SpriteTouchHandler(this);
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
    },

    createTimeLinesForPlayAnimation: function (timelines) {
        //fetch scene json
        if (xc.story && xc.story.items != null && xc.story.items.length > xc.pageIndex) {
            xc.story.items[xc.pageIndex].scene.Content.Content.Animation.Timelines = timelines;
            xc.story.items[xc.pageIndex].scene.Content.Content.Animation.Duration = this._recordingFrameIndex;
            if(!cc.sys.isNative) {
                timelines = null;
            }
        }
    },

    addTextToScene: function () {
        //load text file based on Current Story Id and Page index
        var langDir = goa.TextGenerator.getInstance().getLang();
        cc.log("langDir:" + langDir);
        var textFileUrl = xc.path + "wikitaki/misc/" + langDir + "/" + xc.currentStoryId+".json";
        // var textFileUrl = xc.path + "wikitaki/misc/" + langDir + "/txt.json";
        var storyText = "";
        var that = this;
        cc.loader.loadJson(textFileUrl, function(err, json) {
            if(json != null && json != undefined) {
                storyText = json[xc.pageIndex]
                xc.story.items[xc.pageIndex].sceneText = storyText;                                
            } 
            that.parent.addChild(new xc.TextCreatePanel(cc.director.getWinSize().width, cc.director.getWinSize().height, cc.p(385, 250), xc.story.items[xc.pageIndex].sceneText, that.processText, null, that, true));           
        });
    },

    processText: function (text) {
        xc.story.items[xc.pageIndex].sceneText = text;
    },

    playSceneInEditMode: function () {
        cc.log('playSceneInEditMode 33333');
        xc.PlayRecordingScene.load(xc.PlayRecordingLayer);        
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
        } else if (node.UserData != null && node._actionTag != null) {
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
        var loadedImageObject = xc.ParseUtil.constructJSONFromCCSprite(sprite, imageToLoad);
        sprite.ActionTag = loadedImageObject.ActionTag;
        if(xc.customSprites != undefined) {
            xc.customSprites.push(sprite.getName());
        }
        xc.ParseUtil.saveObjectToStoredScene(loadedImageObject);
        this.registerEventListenerForChild(sprite);
    },

    addCharacterToScene: function (configuration) {
        cc.log('configuration:' + configuration.json);
        if(configuration.favoriteSkins) {
            cc.log('favoriteSkins:' + configuration.favoriteSkins.length);    
        }
        
        var load = ccs.load(xc.path + configuration.json);
        var i = new Date().getTime();
        i = i & 0xffffffff;
        load.node._actionTag = i;
        load.node.ActionTag = i; 
        cc.log('load.node._actionTag of skeleton:' + load.node._actionTag);
        load.node.setScale(0.5, 0.5);
        load.node.setPosition(this.getContentSize().width / 2, this.getContentSize().height / 6);
        xc.ParseUtil.saveCharacterToJSON(xc.path + configuration.json, load, load.node._actionTag);
        xc.CharacterUtil.loadSkeletonConfig(load.node, configuration);
        this._constructedScene.addChild(load.node);  
        load.node.runAction(load.action);
        this.registerEventListenerForChild(load.node);
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
            xc.story.items[xc.pageIndex].scene.scaleX = computedScaleX;
            xc.story.items[xc.pageIndex].scene.scaleY = computedScaleY;
        }
    },

        enableTargetTransformForTarget: function (context, touch, target, location) {
        if (target.getName().indexOf("background") != -1 || target.getName().indexOf("Panel") != -1) {
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
                    xc.story.items[xc.pageIndex].scene.posX = this._sceneNode.parent.parent.getPosition().x;
                    xc.story.items[xc.pageIndex].scene.posY = this._sceneNode.parent.parent.getPosition().y;

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
            xc.ParseUtil.updateScaleRotationAndPositionObjectFromStoredScene(target);
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

    takeAScreenShot: function() {
        //take a screen shot
        cc.log('xc.pageIndex at:' + xc.pageIndex + 'for current story:' + xc.currentStoryId);
        if(cc.sys.isNative && xc.pageIndex == 0) {            
            var viewPortWidth = cc.director.getWinSize().width - this.parent._objectConfigPanel.width;
            //var viewPortHeight = (cc.director.getWinSize().width - this.parent._objectConfigPanel.width) * xc.contentPanelScaleFactor;
            var viewPortHeight = cc.director.getWinSize().height;
            var renderer = new cc.RenderTexture(viewPortWidth, viewPortHeight, cc.TEXTURE_2D_PIXEL_FORMAT_RGBA8888);
            renderer.setVirtualViewport(cc.p(this.parent._objectConfigPanel.width, 0), cc.rect(0,0,viewPortWidth,viewPortHeight), cc.rect(0,0,cc.director.getWinSizeInPixels().width + 20, cc.director.getWinSizeInPixels().height + 10) );
            renderer.begin();
            this.visit();              
            renderer.end();

            //exiting screen shot if present
            var savedStoryId = xc.storiesJSON.stories[xc.currentStoryIndex].storyId;
            cc.log('savedStoryId:' + savedStoryId);
            if(savedStoryId) {
                var imagePath = jsb.fileUtils.getWritablePath() + xc.currentStoryId + ".jpg";
                cc.log("path to delete" + imagePath);
                jsb.fileUtils.removeFile(imagePath);   
            }

            //regenerate story Id
            xc.currentStoryId = "storyId_" + xc.ParseUtil.generateUUID();
            xc.storiesJSON.stories[xc.currentStoryIndex].storyId = xc.currentStoryId;
            var imagePath = jsb.fileUtils.getWritablePath() + xc.currentStoryId + ".jpg";
            var result = renderer.saveToFile(xc.currentStoryId + ".jpg");
            if(result) {
                cc.log("saving to file:" + imagePath);
                var texture = cc.textureCache.addImage(imagePath);
                xc.storiesJSON.stories[xc.currentStoryIndex].icon = imagePath;
                xc.storiesJSON.stories[xc.currentStoryIndex].cIcon = imagePath;
            }
            renderer.cleanup();
        } else {
            if (xc.pageIndex == 0) {
                var gameCanvas = document.getElementById("gameCanvas");
                if (gameCanvas != null) {
                    var dataURL = gameCanvas.toDataURL("image/png");
                    var imageData = new Image();
                    imageData.src = dataURL;

                    var snapShotCanvas = document.getElementById('snapShotCanvas');
                    if(snapShotCanvas != undefined) {
                        var ctx = snapShotCanvas.getContext("2d");
                        var xOffSet = (cc.director.getWinSize().width - cc.director.getWinSize().height) / 2;
                        ctx.drawImage(imageData, xOffSet, 0, cc.director.getWinSize().height, cc.director.getWinSize().height, 0, 0, 450, 450);
                        var snapShotDataURL = snapShotCanvas.toDataURL("image/png");
                        xc.image.titlePageDataURL = snapShotDataURL;
                        ctx.clearRect(0, 0, snapShotCanvas.width, snapShotCanvas.height);
                        snapShotCanvas = null;
                    }
                }
                var texture = cc.textureCache.addImage("res/SD/wikitaki/HelloWorld.png");
            }
        }
    },
    
    backPressed: function () {
        this.parent.removeChild(this, true);
        xc.LAYER_INIT = false;
        xc.LAYER_EDIT_STORY = false;
        cc.director.runScene(new xc.StoryScene(xc.StoryLayer));
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
            xc.CharacterUtil.storeActionToTemporaryStore(this._constructedScene);
        }

        if (this._frontLayer) {
            xc.CharacterUtil.storeActionToTemporaryStore(this._frontLayer);
        }

        if (this._backLayer) {
            xc.CharacterUtil.storeActionToTemporaryStore(this._backLayer);
        }
        cc.log("calling registerEventListenerForAllChildren on enter");
        this.registerEventListenerForAllChildren();
    },

    onExit: function () {
        this._super();
        if (this._constructedScene) {
            xc.CharacterUtil.restoreActionFromTemporaryStore(this._constructedScene);
        }

        if (this._frontLayer) {
            xc.CharacterUtil.restoreActionFromTemporaryStore(this._frontLayer);
        }

        if (this._backLayer) {
            xc.CharacterUtil.restoreActionFromTemporaryStore(this._backLayer);
        }        
    }    
});
