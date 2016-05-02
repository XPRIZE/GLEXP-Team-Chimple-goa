chimple.PanelStack = ccui.Layout.extend({
    _stack: [],
    ctor: function (baseNode, size) {
        this._super();
        this.setContentSize(size);
        this.setClippingEnabled(true);
        this._stack.push(baseNode);
        this.addChild(baseNode);
    },
    push: function (node) {
        var oldMoveTo = cc.moveTo(0.5, cc.p(this.getContentSize().width, 0));
        this._stack[this._stack.length - 1].runAction(oldMoveTo);

        this._stack.push(node);
        this.addChild(node);

        node.setPositionX(node.getPositionX() - this.getContentSize().width);
        var newMoveTo = cc.moveTo(0.5, cc.p(0, 0));
        // newMoveTo.setTarget(node);
        node.runAction(newMoveTo);

        // cc.spawn(oldMoveTo, newMoveTo);

    },
    pop: function () {
        if (this._stack.length > 0) {
            // this._stack[this._stack.length-1].visible = true;   
            // cc.eventManager.resumeTarget(this._stack[this._stack.length-1], true);    
            var currentPanel = this._stack[this._stack.length - 1];
            var oldMoveTo = cc.moveTo(0.5, cc.p(-1 * this.getContentSize().width, 0));
            currentPanel.runAction(cc.sequence(oldMoveTo, cc.callFunc(function () {
                this.removeChild(this._stack.pop(), true);
                if (this._stack.length == 0) {
                    this.parent.removeChild(this, true);
                }

            }, this)));
            if (this._stack.length > 1) {
                var prevPanel = this._stack[this._stack.length - 2];
                var newMoveTo = cc.moveTo(0.5, cc.p(0, 0));
                prevPanel.runAction(cc.sequence(newMoveTo, cc.callFunc(function () {
                    cc.log(prevPanel.getPosition());
                })));
            }
        }
    },
    getCurrentTarget: function() {
        if(this._stack.length > 1) {
            return this._stack[this._stack.length - 1]._target;
        }
    }
})