import Surface from './Surface.js';

export default class Floor extends Surface {
    constructor(game, x, y) {
        super(game, x, y);
    }
    
    toJSON() {
        let json = super.toJSON();
        json._class = "Floor";
        return json;
    }
    
    static fromJSON(game, j) {
        let val = new Floor(game, j.x, j.y);
        val.textures = j.textures;
        val.contents = j.contents;
        return val;
    }
    
}