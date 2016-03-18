import Surface from './Surface.js';
import Floor from './Floor.js';
import Wall from './Wall.js';

export default class EditHolderInputHandler {
    constructor(game) {
    }

    onInputDown(sprite, pointer) {
        if (EditHolderInputHandler.box) {
            sprite.removeChild(EditHolderInputHandler.box);
            EditHolderInputHandler.box.destroy();
        }
        EditHolderInputHandler.box = sprite.drawBoundingBox();
    }

    onInputUp(sprite, pointer) {

    }

    onDragStart(sprite, pointer) {
    }

    onDragUpdate(sprite, pointer, dragX, dragY, snapPoint) {
    }

    onDragStop(sprite, pointer) {
    }

}

EditHolderInputHandler.box = null;