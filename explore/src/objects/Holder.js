export default class Holder extends Phaser.Group {
    constructor(game, x, y) {
        super(game);
        this.x = x;
        this.y = y;
    }

    set surface(val) {
            if(this._surface) {
                this.remove(this._surface, true);
            }
            this._surface = val;
            this.add(val);        
    }    

    get surface() {
        return this._surface;
    }

    addTexture(texture) {
        return this.add(texture);            
    }
    
    get textures() {
        let children = new Array();
        this.forEach(function(value, index, array) {
            if(value instanceof Texture) {
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
    
    addHolder(holder) {
        return this.add(holder);
    }
    
    get holders() {
        let children = new Array();
        this.forEach(function(value, index, array) {
            if(value instanceof Holder) {
                children.push(value);
            }
        });
        return children;
    }
    
     set holders(val) {
        val.forEach(function(element) {
            this.addHolder(element);
        }, this);
        
    }
   
    toJSON() {
        let json = {
            _class: "Holder",
            x: this.x,
            y: this.y,
            surface: this.surface,
            textures: this.textures,
            holders: this.holders
        }
        return json;
    }
    
    static fromJSON(game, j) {
        let holder = new Holder(game, j.x, j.y);
        return holder;
    }
    
}