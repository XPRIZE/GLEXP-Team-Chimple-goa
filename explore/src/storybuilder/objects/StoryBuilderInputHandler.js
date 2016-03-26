import Shape from '../../puppet/objects/Shape.js';
import TileTexture from '../../scene/objects/TileTexture.js';

export default class StoryBuilderInputHandler {
    constructor(scene) {
        this.clickEnabled = true;
        this.dragEnabled = true;
        this.scene = scene;
    }

    onInputDown(sprite, pointer) {
        sprite.modifiedBit = 1;
        if(this.instance.scene) {
            this.instance.scene.selectedObject = sprite;    
        }            
        
        if (StoryBuilderInputHandler.box) {
            sprite.removeChild(StoryBuilderInputHandler.box);
            StoryBuilderInputHandler.box.destroy();
            StoryBuilderInputHandler.box = null;
        }
        StoryBuilderInputHandler.box = sprite.drawBoundingBox(StoryBuilderInputHandler.LINE_COLOR);
        console.log('StoryBuilderInputHandler.box:' + StoryBuilderInputHandler.box);
    }


    onInputUp(sprite, pointer) {
        if (sprite instanceof TileTexture) {
            if (!game._inPlayMode) {
                sprite._showAttributeEditorSignal.dispatch(sprite, pointer);
            }
        }
        
        this.instance.scene.selectedObject = null;
    }

    onDragStart(sprite, pointer) {
        // if (!(sprite instanceof TileTexture)) {
        //     sprite._isDragging = true;
        //     sprite.start_camera_x = sprite.game.camera.x;
        //     sprite.start_camera_y = sprite.game.camera.y;
        // }
    }

    onDragUpdate(sprite, pointer, dragX, dragY, snapPoint) {
        // if (!(sprite instanceof TileTexture)) {
        //     sprite.x += sprite.game.camera.x - sprite.start_camera_x;
        //     sprite.y += sprite.game.camera.y - sprite.start_camera_y;
        // }
    }

    onDragStop(sprite, pointer) {
        this.instance.scene.selectedObject = null;
        sprite.input.dragOffset.x = 0;
        if (!(sprite instanceof TileTexture)) {
            var distanceFromLastUp = Phaser.Math.distance(self.game.input.activePointer.positionDown.x, self.game.input.activePointer.positionDown.y,
                self.game.input.activePointer.x, self.game.input.activePointer.y);

            if (distanceFromLastUp < 5) {
                sprite._isDragging = false;
                if (!sprite._isDragging && !game._inPlayMode) {
                    sprite._showAttributeEditorSignal.dispatch(sprite, pointer);
                }

            }
        }

    }
}


StoryBuilderInputHandler.box = null;
StoryBuilderInputHandler.LINE_COLOR = 0x0000FF;