import Item from './Item.js';
import Holder from './Holder.js';
import Texture from './Texture.js';
import TileTexture from './TileTexture.js';
import EnableInputs from './EnableInputs.js';

export default class Surface extends EnableInputs(Phaser.Group) {
    constructor(game, x, y, name) {
        super(game);
        this.name = name;
        this.x = x;
        this.y = y;
        game.physics.enable(this);
    }
    
    set uniquename(name) {
        if(!this._uniquename) {
            this._uniquename = name;
        }        
    }
    
    get uniquename() {
        return this._uniquename;
    }
    

    addTexture(texture) {
        if(texture instanceof TileTexture) {
            //push the floor and wall to the back
            Surface.All.push(texture)
        } else {
            Surface.All.unshift(texture);

        }
        this.game.physics.enable(texture);
        let lastTextureIndex = 0;
        this.forEach(function(value) {
            if(value instanceof Texture || value instanceof TileTexture) {
                lastTextureIndex++;
            }
        });
        return this.addAt(texture, lastTextureIndex);          
    }
    
    appendTexture(texture) {
        let maxX = 0;
        this.forEach(function(value) {
            if(value instanceof Texture || value instanceof TileTexture) {
                if(maxX < value.right) {
                    maxX = value.right;
                }
            }
        });
            texture.x = maxX;
            return this.addTexture(texture);
        
    }
    
    get textures() {
        let children = new Array();
        this.forEach(function(value) {
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
        this.forEach(function(value) {
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
            contents: this.contents,
            uniquename: this.uniquename
        }
        return json;
    }
    
    static fromJSON(game, j) {
        let val = new Surface(game, j.x, j.y);
        val.textures = j.textures;
        val.contents = j.contents;
        val.uniquename = j.uniquename;
        return val;
    }
    
}

Surface.All = [];