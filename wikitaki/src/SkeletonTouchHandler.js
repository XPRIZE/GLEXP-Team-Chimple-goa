var chimple = chimple || {};

chimple.SkeletonTouchHandler = function (context) {
    this._context = context;
    this.event = cc.EventListener.TOUCH_ONE_BY_ONE;
    this.swallowTouches = true;
    this._previousTouchLocation = null;
    this._flipTarget = false;
    this.onTouchBegan = function (touch, event) {
        var target = event.getCurrentTarget();
        var boundingBox = target.getBoundingBoxToWorld();
        if (cc.rectContainsPoint(boundingBox, touch.getLocation())) {
            if (!cc.sys.isNative) {
                var action = target.actionManager.getActionByTag(target.tag, target);
                if (action) {
                    action.play(target._currentAnimationName, true);
                }
            }
            this._context._nodesSelected.push(target);
            this._context.addNodeToRecording(this._context, touch, target);
            this._context.constructConfigPanel(target);
            this._context._animationNode = target;
            chimple.ParseUtil.drawBoundingBox(location, target);
            var location = target.parent.convertToNodeSpace(touch.getLocation());
            this._offsetYInTouch = location.y - target.getPosition().y;
            this._offsetXInTouch = location.x - target.getPosition().x;
            this._previousTouchLocation = location;
            return true;
        }
        return false;
    };

    this.onTouchMoved = function (touch, event) {
        var target = event.getCurrentTarget();
        var location = target.parent.convertToNodeSpace(touch.getLocation());

        var locationTo = cc.p(location.x - this._offsetXInTouch, location.y - this._offsetYInTouch);
        this._context.enableTargetTransformForTarget(this._context, touch, target, locationTo);

        if (this._context._moveAction) {
            if ((location.x - this._previousTouchLocation.x) < 0) {
                if (target.getScaleX() < 0) {
                    target.setScaleX(-1 * target.getScaleX());
                }
            } else {
                if (target.getScaleX() > 0) {
                    target.setScaleX(-1 * target.getScaleX());
                }
            }
        }

        this._previousTouchLocation = location;
    };
    this.onTouchEnded = function (touch, event) {
        var target = event.getCurrentTarget();
        this._context.enableEventsForAllOtherNodes(this._context, target, true);
        var action = target.actionManager.getActionByTag(target.tag, target);
        if (action) {
            action.pause();
        }
        this._context.constructRemoveAnimationFrame(target);
        var nodeToRemoveIndex = this._context._nodesSelected.indexOf(target);
        if (nodeToRemoveIndex != -1) {
            this._context._nodesSelected.splice(nodeToRemoveIndex, 1);

        }
    };
};