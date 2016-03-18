import Surface from './Surface.js';
import Floor from './Floor.js';
import Wall from './Wall.js';

export default class EditSceneInputHandler {
    constructor(game) {
    }

    onInputDown(sprite, pointer) {
        if (EditSceneInputHandler.box) {
            sprite.removeChild(EditSceneInputHandler.box);
            EditSceneInputHandler.box.destroy();
        }
        EditSceneInputHandler.box = sprite.drawBoundingBox();
    }

    onInputUp(sprite, pointer) {

    }

    onDragStart(sprite, pointer) {
        sprite._isDragging = true;
        sprite.game.camera.follow(sprite, Phaser.Camera.FOLLOW_PLATFORMER);
        sprite.start_camera_x = sprite.game.camera.x;
        sprite.start_camera_y = sprite.game.camera.y;
    }

    onDragUpdate(sprite, pointer, dragX, dragY, snapPoint) {
        sprite.x += sprite.game.camera.x - sprite.start_camera_x;
        sprite.y += sprite.game.camera.y - sprite.start_camera_y;
        if(EditSceneInputHandler.surfaceTexture) {
            EditSceneInputHandler.surfaceTexture.tint = 0xFFFFFF;
            EditSceneInputHandler.surfaceTexture = null;
        }
        this.game.physics.arcade.overlap(this, Surface.All, function(obj1, obj2) { 
            if(!EditSceneInputHandler.surfaceTexture) {
                EditSceneInputHandler.surfaceTexture = obj2;
                obj2.tint = 0xFFFF88;
            }
        }, null, this);
        
    }

    onDragStop(sprite, pointer) {
        this.game.camera.unfollow();
        if(EditSceneInputHandler.surfaceTexture) {
            let globalPoint = sprite.toGlobal(new Phaser.Point(sprite.x, sprite.y));
            sprite.parent.removeChild(sprite);
            EditSceneInputHandler.surfaceTexture.parent.addContent(sprite);
            let localPoint = sprite.toLocal(globalPoint);
            sprite.x = localPoint.x;
            sprite.y = localPoint.y;
            
        }
    }
}

EditSceneInputHandler.ITEM_MODE = 'item';
EditSceneInputHandler.HOLDER_MODE = 'holder';
EditSceneInputHandler.box = null;
EditSceneInputHandler.surfaceTexture = null;
EditSceneInputHandler.mode = EditSceneInputHandler.ITEM_MODE;