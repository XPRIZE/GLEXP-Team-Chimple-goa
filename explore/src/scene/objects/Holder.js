import Texture from './Texture.js';
import Surface from './Surface.js';
import Item from './Item.js';

export default class Holder extends Item {
    // TODO: Item takes a key and frame, but here we are not passing any. See if any better solution is there
    constructor(game, x, y) {
        super(game, x, y);
         this.x = x;
         this.y = y;
    }
    
    update () {
        this.onAttributesChanged.dispatch({uniquename: this._uniquename, x: this.x, y: this.y});
    }

    enableInputs(instance, iterateInside) {
        super.enableInputs(instance, iterateInside);
        this.input.priorityID = 1;        
    }

    drawBoundingBox(color) {
        let rect = this.getBoundingBox();
        let box = this.addChild(new Phaser.Graphics(this.game, rect.left, rect.top));
        box.lineStyle(1, color);
        box.beginFill(0x000000, 0);
        box.drawRect(0, 0, rect.width, rect.height);
        box.endFill();    
        return box;    
    }        
    
    getBoundingBox() {
        let left = 0;
        let right = 0;
        let top = 0;
        let bottom = 0;
        this.children.forEach(function(value) {
                if(value.x < left) {
                    left = value.x;
                }
                if(value.x + value.width > right) {
                    right = value.x + value.width;
                }
                if(value.y < top) {
                    top = value.y;
                }
                if(value.y + value.height > bottom) {
                    bottom = value.y + value.height;
                }
        }, this);
        return new Phaser.Rectangle(left, top, right - left, bottom - top);
    }
    
    updateBody() {
        let rect = this.getBoundingBox();        
        this.body.setSize(rect.width, rect.height, rect.halfWidth, rect.height);
    }
    
    set frontTexture(val) {
        if(this._frontTexture) {
            this.removeChild(this._frontTexture).destroy();
        }
        if(val) {
            this.addChildAt(val, this.children.length);        
        }
        this._frontTexture = val;
        this.updateBody();
    }
    
    get frontTexture() {
        return this._frontTexture;
    }

    set backTexture(val) {
        if(this._backTexture) {
            this.removeChild(this._backTexture).destroy();
        }
        if(val) {
            this.addChildAt(val, 0);            
        }
        this._backTexture = val;
        this.updateBody();
    }
    
    get backTexture() {
        return this._backTexture;
    }

    addSurface(surface) {
        let index = this._frontTexture ? this.children.length - 1 : this.children.length;
        this.addChildAt(surface, index);
        this.updateBody();
        return surface;        
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
            uniquename: this.uniquename,
            frontTexture: this.frontTexture,
            backTexture: this.backTexture,
            surfaces: this.surfaces
        }
        return json;
    }
    
    static fromJSON(game, j) {
        let holder = new Holder(game, j.x, j.y);
        holder.uniquename = j.uniquename;
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