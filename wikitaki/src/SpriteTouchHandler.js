var chimple = chimple || {};

chimple.SpriteTouchHandler = function (context) {
    this._context = context;
    this.event = cc.EventListener.TOUCH_ONE_BY_ONE;
    this.swallowTouches = true;

    this.onTouchBegan = function (touch, event) {
        var target = event.getCurrentTarget();
        if(target && target.getTexture() && target.getTexture().url.indexOf('background') != -1) {
            return false;
        }
        var location = target.convertToNodeSpace(touch.getLocation());
        var locationInParent = target.parent.convertToNodeSpace(touch.getLocation());
        var targetSize = target.getContentSize();
        var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.
            height);
        if (cc.rectContainsPoint(targetRectangle, location)) {
            // temp comment
            this._context._nodesSelected.push(target);
            this._context.addNodeToRecording(this._context, touch, target);
            this._context.constructConfigPanel(target);
            this._context._animationNode = target;
            chimple.ParseUtil.drawBoundingBox(location, target);
            this._offsetYInTouch = locationInParent.y - target.getPosition().y;
            this._offsetXInTouch = locationInParent.x - target.getPosition().x;
            return true;
        }
        return false;
    };

    this.onTouchMoved = function (touch, event) {
        var target = event.getCurrentTarget();
        var location = target.parent.convertToNodeSpace(touch.getLocation());
        var locationTo = cc.p(location.x - this._offsetXInTouch, location.y - this._offsetYInTouch);        
        this._context.enableTargetTransformForTarget(this._context, touch, target, locationTo);        
    };

    this.onTouchEnded = function (touch, event) {
        var target = event.getCurrentTarget();
        this._context.enableEventsForAllOtherNodes(this._context, target, true);        
        var nodeToRemoveIndex = this._context._nodesSelected.indexOf(target);
        if (nodeToRemoveIndex != -1) {
            this._context._nodesSelected.splice(nodeToRemoveIndex, 1);
        }
    };
}