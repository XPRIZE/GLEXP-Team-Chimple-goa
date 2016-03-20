export default class PuppetInputHandler {
    constructor(game) {
        this.clickEnabled = true;
        this.dragEnabled = false;
    }

    /**
     * @param  {any} sprite
     * @param  {any} pointer
     */
    onInputDown(sprite, pointer) {
        this._clickScale = this.shape.scale.clone();
        this._clickPoint = new Phaser.Point(pointer.x, pointer.y);
        let pivot = this.shape.toGlobal(this.shape.relativeAnchor.clone().multiply(this.shape.width, this.shape.height));
        this._scaleDirection = new Phaser.Point(this._clickPoint.x > pivot.x ? 1 : -1, this._clickPoint.y > pivot.y ? 1 : -1);
        this.game.input.addMoveCallback(this.onInputDrag, this);
    }

    /**
     * @param  {any} sprite
     * @param  {any} pointer
     */
    onInputUp(sprite, pointer) {
        this._isPointerDown = false;
        this.game.input.deleteMoveCallback(this.onInputDrag, this);
    }

    onDragStart(sprite, pointer) {
    }

    onDragUpdate(sprite, pointer, dragX, dragY, snapPoint) {
    }

    onDragStop(sprite, pointer) {
    }
}