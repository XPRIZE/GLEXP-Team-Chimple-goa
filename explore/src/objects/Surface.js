import Item from './Item.js';
import Holder from './Holder.js';

export default class Surface extends Phaser.Group {
    constructor(game, x, y) {
        super(game);
        this.x = x;
        this.y = y;
    }

    set texture(val) {
        if(this._texture) {
            this.remove(this.texture, true);
        }
        this._texture = val;
        this.add(val);
        this.sendToBack(val);
    }    
    
    get texture() {
        return this._texture;
    }
    
    addContent(content) {
        return this.add(content);            
    }
    
    get contents() {
        let children = new Array();
        this.forEach(function(value, index, array) {
            if(value instanceof Item || value instanceof Holder) {
                children.push(value);
            }
        });
        return children;
    }
    
    set contents(val) {
        val.forEach(function(element) {
            this.addContent(element);
        }, this);
        
    }
    
    toJSON() {
        let json = {
            _class: "Surface",
            x: this.x,
            y: this.y,
            texture: this.texture,
            contents: this.contents
        }
        return json;
    }
    
    static fromJSON(game, j) {
        let val = new Surface(game, j.x, j.y);
        val.texture = j.texture;
        val.contents = j.contents;
        return val;
    }
    
}