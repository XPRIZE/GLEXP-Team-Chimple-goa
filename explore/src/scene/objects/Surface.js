import Item from './Item.js';
import Holder from './Holder.js';
import Texture from './Texture.js';
import TileTexture from './TileTexture.js';

export default class Surface extends Phaser.Group {
    constructor(game, x, y) {
        super(game);
        this.x = x;
        this.y = y;
        game.physics.enable(this);
    }

    addTexture(texture) {
        Surface.All.push(texture);
        this.game.physics.enable(texture);
        return this.add(texture);            
    }
    
    get textures() {
        let children = new Array();
        this.forEach(function(value, index, array) {
            if(value instanceof Texture || value instanceof TileTexture) {
                children.push(value);
            }
        });
        return children;
    }
    
    set textures(val) {
        val.forEach(function(element) {
            this.addTexture(element);
        }, this);
        
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
            textures: this.textures,
            contents: this.contents
        }
        return json;
    }
    
    static fromJSON(game, j) {
        let val = new Surface(game, j.x, j.y);
        val.textures = j.textures;
        val.contents = j.contents;
        return val;
    }
    
}

Surface.All = [];