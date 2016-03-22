import Surface from './Surface.js';
import Floor from './Floor.js';
import Wall from './Wall.js';

export default class EditSceneInputHandler {
    constructor(game) {
        this.clickEnabled = true;
        this.dragEnabled = true;

    }

    onInputDown(sprite, pointer) {
        if (EditSceneInputHandler.box) {
            sprite.removeChild(EditSceneInputHandler.box);
            EditSceneInputHandler.box.destroy();
            EditSceneInputHandler.box = null;
        }
        EditSceneInputHandler.box = sprite.drawBoundingBox(EditSceneInputHandler.LINE_COLOR);
        // sprite.parent.removeChild(sprite);
    }

    onInputUp(sprite, pointer) {

    }

    onDragStart(sprite, pointer) {
    }

    onDragUpdate(sprite, pointer, dragX, dragY, snapPoint) {
        if (EditSceneInputHandler.surfaceTexture) {
            EditSceneInputHandler.surfaceTexture.tint = 0xFFFFFF;
            EditSceneInputHandler.surfaceTexture = null;
        }

        sprite.game.physics.arcade.overlap(sprite, Surface.All, function(obj1, obj2) {
            if (obj1.surfaces && obj1.surfaces.some(function(val) {
                return val === obj2.parent;
            })) {
                return;
            }
            if (!EditSceneInputHandler.surfaceTexture) {
                EditSceneInputHandler.surfaceTexture = obj2;
                obj2.tint = 0xFFFF88;
            }
        }, null, this);
    }

    onDragStop(sprite, pointer) {
        if (EditSceneInputHandler.surfaceTexture) {
            let globalPoint = sprite.toGlobal(new Phaser.Point(sprite.x, sprite.y));
            // sprite.parent.removeChild(sprite);
            EditSceneInputHandler.surfaceTexture.parent.addContent(sprite);
            if(EditSceneInputHandler.surfaceTexture.parent.parent.input != null) {
                sprite.input.priorityID = EditSceneInputHandler.surfaceTexture.parent.parent.input.priorityID+1;            
            }
            let localPoint = sprite.toLocal(globalPoint);
            sprite.x = localPoint.x;
            sprite.y = localPoint.y;
        }
    }
}

EditSceneInputHandler.box = null;
EditSceneInputHandler.surfaceTexture = null;
EditSceneInputHandler.LINE_COLOR = 0xFF0000;