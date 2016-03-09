import Holder from './Holder.js';

export default class Floor extends Holder {
    constructor(game, x, y, key, frame) {
        super(game, x, y, key, frame);
    }
    
    toJSON() {
        let json = super.toJSON();
        json._class = "Floor";
        return json;
    }
    
    static fromJSON(game, j) {
        let floor = new Floor(game, j.x, j.y, j.key, j.frame);
        return floor;
    }
    
}