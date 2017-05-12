var chimple = chimple || {};

chimple.SpriteTouchHandler = function (context) {
    this._context = context;
    this.event = cc.EventListener.TOUCH_ONE_BY_ONE;
    this.swallowTouches = true;

    this.onTouchBegan = function (touch, event) {
        var target = event.getCurrentTarget();
        var location = target.convertToNodeSpace(touch.getLocation());
        var locationInParent = target.parent.convertToNodeSpace(touch.getLocation());
        var targetSize = target.getContentSize();
        var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.
            height);
        if (cc.rectContainsPoint(targetRectangle, location)) {
            this._context._nodesSelected.push(target);
            this._context.addNodeToRecording(this._context, touch, target);
            this._context.constructConfigPanel(target);
            this._context._animationNode = target;
            chimple.ParseUtil.drawBoundingBox(target);
            this._offsetYInTouch = locationInParent.y - target.getPosition().y;
            this._offsetXInTouch = locationInParent.x - target.getPosition().x;
            this._previousTouchLocation = location;
            return true;
        }
        return false;
    };

    this.collisionDetectionWithSkeleton = function (target) {
        if (chimple.customSprites.indexOf(target.getName()) != -1) {
            this._context.children.forEach(function (element) {
                if (element._name === 'FrontLayer' || element._name === 'BackLayer') {
                    element.children.forEach(function (child) {
                        if (child.getName() === 'Scene') {
                            child.children.forEach(function (subChild) {
                                if (subChild.getName() === 'Human_Skeleton') {
                                    this.attachedCustomObject(subChild, target);
                                }
                            }, this);
                        } else {
                            if (child.getName() === 'Human_Skeleton') {
                                this.attachedCustomObject(child, target);
                            }
                        }
                    }, this);
                }
            }, this);
        }
    };

    this.performOverlapDetectionWithSkeleton = function (skeleton, target) {
        var originalBoundingBox = skeleton.getBoundingBoxToWorld();
        var skeletonBoundingBox = new cc.rect(originalBoundingBox.x, originalBoundingBox.y, originalBoundingBox.width / 2, originalBoundingBox.height / 2);
        var objectBoundingBox = target.getBoundingBoxToWorld();
        var boundingBox = new cc.rect(objectBoundingBox.x, objectBoundingBox.y, objectBoundingBox.width / 2, objectBoundingBox.height / 2);
        if (cc.rectIntersectsRect(boundingBox, skeletonBoundingBox)) {
            chimple.ParseUtil.drawBoundingBox(skeleton, chimple.DARK_BOUNDING_BOX_TAG, chimple.DARK_SECONDARY_COLOR);
        } else {
            chimple.ParseUtil.removeExistingBoundingBoxNodeByTag(chimple.DARK_BOUNDING_BOX_TAG, skeleton);
        }
    }

    this.overlapDetectionWithSkeleton = function (target) {
        if (chimple.customSprites.indexOf(target.getName()) != -1) {
            this._context.children.forEach(function (element) {
                if (element._name === 'FrontLayer' || element._name === 'BackLayer') {
                    element.children.forEach(function (child) {
                        if (child.getName() === 'Scene') {
                            child.children.forEach(function (subChild) {
                                if (subChild.getName() === 'Human_Skeleton') {
                                    this.performOverlapDetectionWithSkeleton(subChild, target);
                                }
                            }, this);
                        } else {
                            if (child.getName() === 'Human_Skeleton') {
                                this.performOverlapDetectionWithSkeleton(child, target);
                            }
                        }
                    }, this);
                }
            }, this);
        }
    };


    this.attachedCustomObject = function (child, target) {
        var originalBoundingBox = child.getBoundingBoxToWorld();
        var skeletonBoundingBox = new cc.rect(originalBoundingBox.x, originalBoundingBox.y, originalBoundingBox.width / 2, originalBoundingBox.height / 2);
        var objectBoundingBox = target.getBoundingBoxToWorld();
        var boundingBox = new cc.rect(objectBoundingBox.x, objectBoundingBox.y, objectBoundingBox.width / 2, objectBoundingBox.height / 2);
        if (cc.rectIntersectsRect(boundingBox, skeletonBoundingBox)) {
            var boneName = chimple.HAND_GEAR_LEFT;
            var bone = child.getBoneNode(boneName);
            var shouldProcess = true;
            var contentPanelContext = this._context;
            bone.getSkins().forEach(function (skin, index) {
                if (skin && skin.getTexture() && skin.getTexture().url == target.getTexture().url) {
                    shouldProcess = false;
                    if (bone.getVisibleSkins() && bone.getVisibleSkins().length > 0) {
                        var topSkin = bone.getVisibleSkins()[0];
                        var spriteToScene = new cc.Sprite(topSkin.getTexture());
                        spriteToScene.setName(topSkin.getName());
                        spriteToScene.setPosition(50, 50);
                        var eventObj = new chimple.SpriteTouchHandler(contentPanelContext);
                        var listener = cc.EventListener.create(eventObj);
                        cc.eventManager.addListener(listener, spriteToScene);
                        contentPanelContext._frontLayer.addChild(spriteToScene);
                    }
                    bone.displaySkin(skin, true);
                    target.setVisible(false);
                    target._markedForRemove = true;
                }
            });
            if (bone && shouldProcess) {
                if (bone.getSkins().length > 0) {
                    var topSkin = bone.getSkins()[bone.getSkins().length - 1];
                    var spriteToScene = new cc.Sprite(topSkin.getTexture());
                    spriteToScene.setPosition(50, 50);
                    spriteToScene.setName(topSkin.getName());
                    var eventObj = new chimple.SpriteTouchHandler(this._context);
                    var listener = cc.EventListener.create(eventObj);
                    cc.eventManager.addListener(listener, spriteToScene);
                    this._context._frontLayer.addChild(spriteToScene);
                }
                target.setPosition(0, 0);
                target.removeFromParent();
                bone.addSkin(target);
                bone.displaySkin(bone.getSkins()[bone.getSkins().length - 1], true);
            }
            var visibleCustomSkin = child.getBoneNode("hand_gear_left").getVisibleSkins();
            if (child && child._userData) {
                child._userData.userCustomObjectSkin = {
                    bone: chimple.HAND_GEAR_LEFT,
                    skin: target.getName()
                }
            }
        }
    };

    this.onTouchMoved = function (touch, event) {
        var target = event.getCurrentTarget();
        var location = target.parent.convertToNodeSpace(touch.getLocation());
        var locationTo = cc.p(location.x - this._offsetXInTouch, location.y - this._offsetYInTouch);
        this._context.enableTargetTransformForTarget(this._context, touch, target, locationTo);
        this.overlapDetectionWithSkeleton(target);
        this._previousTouchLocation = location;
    };

    this.onTouchEnded = function (touch, event) {
        var target = event.getCurrentTarget();
        this._context.enableEventsForAllOtherNodes(this._context, target, true);
        var nodeToRemoveIndex = this._context._nodesSelected.indexOf(target);
        if (nodeToRemoveIndex != -1) {
            this._context._nodesSelected.splice(nodeToRemoveIndex, 1);
        }

        //find out all skeleton on scene and object is overlap with it
        this.collisionDetectionWithSkeleton(target);

        if (target._markedForRemove) {
            var comExtensionData = target.getComponent("ComExtensionData");
            if (comExtensionData && comExtensionData.getActionTag()) {
                chimple.ParseUtil.removeObjectFromStoredScene(comExtensionData.getActionTag());
            } else if (target.ActionTag) {
                chimple.ParseUtil.removeObjectFromStoredScene(target.ActionTag);
            }
            target.parent.removeChild(target, true);
        }
    };
}