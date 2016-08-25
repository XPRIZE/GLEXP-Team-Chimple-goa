var chimple = chimple || {};

chimple.TextTouchHandler = function (context) {
    this._context = context;
    this.event = cc.EventListener.TOUCH_ONE_BY_ONE;
    this.swallowTouches = true;

    this.onTouchBegan = function (touch, event) {
        var target = event.getCurrentTarget();
        var location = target.convertToNodeSpace(touch.getLocation());
        var targetSize = target.getContentSize();
        var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.
            height);
        if (cc.rectContainsPoint(targetRectangle, location)) {
            this._context.constructConfigPanel(target);
            return true;
        }
        return false;
    };

    this.onTouchMoved = function (touch, event) {
        var target = event.getCurrentTarget();
    };

    this.onTouchEnded = function (touch, event) {
        var target = event.getCurrentTarget();
    };
}