import Scene from './Scene.js';
import Floor from './Floor.js';
import Wall from './Wall.js';
import Holder from './Holder.js';

export default class Util {
    static revive(k, v) {
        if (v instanceof Object && v._class == 'Scene') {
            return Scene.fromJSON(window.game, v);
        } else if (v instanceof Object && v._class == 'Holder') {
            return Holder.fromJSON(window.game, v);
        } else if (v instanceof Object && v._class == 'Floor') {
            return Floor.fromJSON(window.game, v);
        } else if (v instanceof Object && v._class == 'Wall') {
            return Wall.fromJSON(window.game, v);
        }
        return v;
    }    
       
    static replacer(k, v) {
        return v;
    }    
}