import Surface from './Surface.js';
import Scene from './Scene.js';
import Wall from './Wall.js';

export default class Floor extends Surface {
    constructor(game, x, y) {
        super(game, x, y);
    }
    
    addTexture(texture) {
        let i = 0;
        for(i = 0; i < Surface.All.length; i++) {
            // if(Surface.All[i].parent.parent instanceof Scene && Surface.All[i].parent != this) {
            if(Surface.All[i].parent instanceof Wall) {
                break;
            }
        }
        Surface.All.splice(i, 0, texture);
        super.addTexture(texture);
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