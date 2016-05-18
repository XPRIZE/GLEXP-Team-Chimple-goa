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
        var targetSize = target.getContentSize();
        var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.
            height);
        if (cc.rectContainsPoint(targetRectangle, location)) {
            // temp comment
            this._context._nodesSelected.push(target);
            this._context.addNodeToRecording(this._context, touch, target);
            this._context.constructConfigPanel(target);
            // this._context.selectedObjectHighlight(target ,this._context._animationNode);
            this._context._animationNode = target;
            chimple.ParseUtil.drawBoundingBox(location, target);
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
        var nodeToRemoveIndex = this._context._nodesSelected.indexOf(target);
        if (nodeToRemoveIndex != -1) {
            this._context._nodesSelected.splice(nodeToRemoveIndex, 1);
        }
    };
}