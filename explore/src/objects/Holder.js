import Texture from './Texture.js';
import Surface from './Surface.js';

export default class Holder extends Phaser.Group {
    constructor(game, x, y) {
        super(game);
        this.x = x;
        this.y = y;
    }

    set frontTexture(val) {
        if(this._frontTexture) {
            this.remove(this._frontTexture, true);
        }
        this.addAt(val, this.total);
        this._frontTexture = val;
    }
    
    get frontTexture() {
        return this._frontTexture;
    }

    set backTexture(val) {
        if(this._backTexture) {
            this.remove(this._backTexture, true);
        }
        this.addAt(val, 0);
        this._backTexture = val;
    }
    
    get backTexture() {
        return this._backTexture;
    }

    addSurface(surface) {
        let index = this._frontTexture ? this.total - 1 : this.total;
        return this.addAt(surface, index);
    }
    
    get surfaces() {
        let children = new Array();
        this.forEach(function(value, index, array) {
            if(value instanceof Surface) {
                children.push(value);
            }
        });
        return children;
    }
    
     set surfaces(val) {
        val.forEach(function(element) {
            this.addSurface(element);
        }, this);
        
    }
   
    toJSON() {
        let json = {
            _class: "Holder",
            x: this.x,
            y: this.y,
            frontTexture: this.frontTexture,
            backTexture: this.backTexture,
            surfaces: this.surfaces
        }
        return json;
    }
    
    static fromJSON(game, j) {
        let holder = new Holder(game, j.x, j.y);
        if(j.frontTexture) {
            holder.frontTexture = j.frontTexture;        
        }
        if(j.backTexture) {
            holder.backTexture = j.backTexture;        
        }
        holder.surfaces = j.surfaces;
        return holder;
    }
    
}