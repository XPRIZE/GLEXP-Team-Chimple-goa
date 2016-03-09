import Holder from './Holder.js';

export default class Wall extends Holder {
    constructor(game, x, y, key, frame) {
        super(game, x, y, key, frame);
    }
    
    toJSON() {
        let json = super.toJSON();
        json._class = "Wall";
        return json;
    }
    
    static fromJSON(game, j) {
        let wall = new Wall(game, j.x, j.y, j.key, j.frame);
        return wall;
    }
    
}