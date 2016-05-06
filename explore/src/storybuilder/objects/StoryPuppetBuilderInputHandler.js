import Shape from '../../puppet/objects/Shape.js';

export default class StoryPuppetBuilderInputHandler {
    constructor(scene) {
        this.clickEnabled = true;
        this.dragEnabled = false;
        this.scene = scene;
    }

    onInputDown(sprite, pointer) {
        sprite.modifiedBit = 1;
        this.instance.scene.selectedObject = sprite;        
        if (sprite instanceof Shape) {
            this.puppetPoint = new Phaser.Point(pointer.x, pointer.y);
           
            this.parent.walkAnimate();
            
            this.originalPuppetPosition = this.parent.position.clone();
            this.game.input.addMoveCallback(this.onInputDragFromStory, this);
        }
    }

    onInputUp(sprite, pointer) {
        this.instance.scene.selectedObject = null;        
        
        if (sprite instanceof Shape) {             
            this.game.input.deleteMoveCallback(this.onInputDragFromStory, this);
        }

        
        var distanceFromLastUp = Phaser.Math.distance(self.game.input.activePointer.positionDown.x, self.game.input.activePointer.positionDown.y,
            self.game.input.activePointer.x, self.game.input.activePointer.y);
        
        if(distanceFromLastUp < 5 && !game._inPlayMode)  {
            sprite._showAttributeEditorSignal.dispatch(sprite, pointer);
        }        
        
        
    }
}
