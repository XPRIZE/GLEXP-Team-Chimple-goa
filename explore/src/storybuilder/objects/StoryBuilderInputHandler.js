export default class StoryBuilderInputHandler {
    constructor(game) {
    }
    
    onInputDown(sprite, pointer) {

    }
    
    onInputUp(sprite, pointer, game) {
        if (!sprite._isDragging && !game._inPlayMode) {
            sprite._showAttributeEditorSignal.dispatch(sprite, pointer);
        }        
    }
}