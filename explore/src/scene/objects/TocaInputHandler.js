export default class TocaInputHandler {
    constructor(game) {
    }
    
    onInputDown(sprite, pointer) {
        sprite.scale.setTo(1.2,1.2);
    }
    
    onInputUp(sprite, pointer) {
        sprite.scale.setTo(1,1);
    }
}