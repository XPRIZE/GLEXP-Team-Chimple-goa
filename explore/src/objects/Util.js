import Scene from './Scene.js';
import Floor from './Floor.js';
import Wall from './Wall.js';
import Holder from './Holder.js';
import Texture from './Texture.js';
import Surface from './Surface.js';
import Item from './Item.js';
import TileTexture from './TileTexture.js';

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
        } else if (v instanceof Object && v._class == 'Texture') {
            return Texture.fromJSON(window.game, v);
        } else if (v instanceof Object && v._class == 'TileTexture') {
            return Texture.fromJSON(window.game, v);
        } else if (v instanceof Object && v._class == 'Surface') {
            return Surface.fromJSON(window.game, v);
        } else if (v instanceof Object && v._class == 'Item') {
            return Item.fromJSON(window.game, v);
        }
        return v;
    }    
       
    static replacer(k, v) {
        return v;
    }    
}