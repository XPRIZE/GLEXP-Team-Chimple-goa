import Texture from './Texture.js';

export default class Item extends Texture {
    constructor(game, x, y, key, frame) {
        super(game, x, y, key, frame);        
        this.inputEnabled = true;
        this.input.enableDrag(true);
    }
    
    toJSON() {
        let json = super.toJSON();
        json._class = "Item";
        return json;
    }
    
    static fromJSON(game, j) {
        let val = new Item(game, j.x, j.y, j.key, j.frame);
        return val;
    }
    
}