import Limb from './Limb.js';
import Accessory from './Accessory.js';
import Shape from './Shape.js';
import RelativePosition from './RelativePosition.js';

export default class Puppet extends Limb {
    constructor(game, x, y, color) {
        super(game);
        this.x=x;
        this.y=y;
        this.bodyColor = color;
        this.scale.setTo(0.5, 0.5);
    }
    
    get body() {
        if(!this._body) {
            this._body = this.getLimb('body');
        }
        return this._body;
    }
    
    set body(body) {
        this._body = body;
        body.name = 'body';
        this.addLimb(body);
    }
    
    /**
     * Abstract behaviour. In each subclass add the behavior
     */
    defineBehavior() {
    }
    
    /**
     * A default puppet. Use it to create a sample one
     */
    static buildDefault() {
        
    }
    
    toJSON() {
        let limbJson = super.toJSON();
        limbJson._class = "Puppet";
        limbJson.x = this.x;
        limbJson.y = this.y;
        limbJson.bodyColor = this.bodyColor; 
        console.log(limbJson);
        return limbJson;   
    }

    static fromJSON(game, j) {
        let puppet = new Puppet(game, j.x, j.y, j.bodyColor);
        if(j.shape) {
            puppet.shape = j.shape;        
        }
        puppet.accessories = j.accessories;
        puppet.limbs = j.limbs;
        puppet.defineBehavior();
        return puppet;
    }
        
}