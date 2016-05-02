var chimple = chimple || {};

chimple.SkeletonTouchHandler = function (context) {
    this._context = context;
    this.event = cc.EventListener.TOUCH_ONE_BY_ONE;
    this.swallowTouches = true;

    this.onTouchBegan = function (touch, event) {
        var target = event.getCurrentTarget();
        var boundingBox = target.getBoundingBoxToWorld();
        if (cc.rectContainsPoint(target.getBoundingBoxToWorld(), touch.getLocation())) {
            if (!cc.sys.isNative) {
                var action = target.actionManager.getActionByTag(target.tag, target);
                action.play(target._currentAnimationName, true);
            }
            context._nodesSelected.push(target);
            context.addNodeToRecording(context, touch, target);
            context.constructConfigPanel(target);
            context._animationNode = target;
            return true;
        }
        return false;
    };

    this.onTouchMoved = function (touch, event) {
        var target = event.getCurrentTarget();
        var location = target.parent.convertToNodeSpace(touch.getLocation());
        this._context.enableTargetTransformForTarget(this._context, touch, target, location);
    };
    this.onTouchEnded = function (touch, event) {
        var target = event.getCurrentTarget();
        this._context.enableEventsForAllOtherNodes(this._context, target, true);
        target.actionManager.getActionByTag(target.tag, target).pause();
        var nodeToRemoveIndex = context._nodesSelected.indexOf(target);
        if (nodeToRemoveIndex != -1) {
            this._context._nodesSelected.splice(nodeToRemoveIndex, 1);
        }
    };
};