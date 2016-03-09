import Surface from './Surface.js';

export default class Wall extends Surface {
    constructor(game, x, y) {
        super(game, x, y);
    }
    
    toJSON() {
        let json = super.toJSON();
        json._class = "Wall";
        return json;
    }
    
    static fromJSON(game, j) {
        let val = new Wall(game, j.x, j.y);
        val.texture = j.texture;
        val.contents = j.contents;
        return val;
    }
    
}