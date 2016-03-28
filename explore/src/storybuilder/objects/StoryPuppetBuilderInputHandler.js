import Shape from '../../puppet/objects/Shape.js';

export default class StoryPuppetBuilderInputHandler {
    constructor(game) {
        this.clickEnabled = true;
        this.dragEnabled = false;
    }

    onInputDown(sprite, pointer) {
        sprite.modifiedBit = 1;
        if (sprite instanceof Shape) {
            this.puppetPoint = new Phaser.Point(pointer.x, pointer.y);
           
           this.parent.animateWalk();
            
            this.originalPuppetPosition = this.parent.position.clone();
            this.game.input.addMoveCallback(this.onInputDragFromStory, this);
        }
    }

    onInputUp(sprite, pointer) {
        if (sprite instanceof Shape) {             
            this.game.input.deleteMoveCallback(this.onInputDragFromStory, this);
        }

        
        var distanceFromLastUp = Phaser.Math.distance(self.game.input.activePointer.positionDown.x, self.game.input.activePointer.positionDown.y,
            self.game.input.activePointer.x, self.game.input.activePointer.y);
        console.log('distanceFromLastUp in 1111:' + distanceFromLastUp);
        
        if(distanceFromLastUp < 5 && !game._inPlayMode)  {
            sprite._showAttributeEditorSignal.dispatch(sprite, pointer);
        }        
    }
}