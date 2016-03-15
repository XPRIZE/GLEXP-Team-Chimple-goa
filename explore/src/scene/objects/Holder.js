import Texture from './Texture.js';
import Surface from './Surface.js';
import Item from './Item.js';

export default class Holder extends Item {
    // TODO: Item takes a key and frame, but here we are not passing any. See if any better solution is there
    constructor(game, x, y) {
        super(game, x, y);
        // this.x = x;
        // this.y = y;
        // this.inputEnabled = true;
        // this.input.enableDrag();
        this.input.priorityID = 1;
    }

    set frontTexture(val) {
        if(this._frontTexture) {
            this.removeChild(this._frontTexture).destroy();
        }
        this.addChildAt(val, this.children.length);
        this._frontTexture = val;
    }
    
    get frontTexture() {
        return this._frontTexture;
    }

    set backTexture(val) {
        if(this._backTexture) {
            this.removeChild(this._backTexture).destroy();
        }
        this.addChildAt(val, 0);
        this._backTexture = val;
    }
    
    get backTexture() {
        return this._backTexture;
    }

    addSurface(surface) {
        let index = this._frontTexture ? this.children.length - 1 : this.children.length;
        return this.addChildAt(surface, index);
    }
    
    overlapHandler(obj1, obj2) {
        if(obj1.parent.surfaces.some(function(val) {
            return val === obj2.parent;
        })) {
            return;
        }
        super.overlapHandler(obj1, obj2);
    }
    
    get surfaces() {
        let children = new Array();
        this.children.forEach(function(value) {
            if(value instanceof Surface) {
                children.push(value);
            }            
        }, this);
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