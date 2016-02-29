import Scalable from './Scalable.js';
import RelativePosition from './RelativePosition.js';

export default class Shape extends Scalable(Phaser.Graphics) {
    constructor(game, anchor, offset, offsetInPixel, graphics) {
        super(game);
        this.graphics = graphics;
        if(graphics != null) {
            this.beginFill(0xffffff);
            this.drawShape(graphics);
            this.endFill();            
        }
        this.relativeAnchor = anchor || new Phaser.Point();
        this.relativeOffset = offset || new Phaser.Point();
        this.offsetInPixel = offsetInPixel || new Phaser.Point();
        this.followWidth = true;
        this.followHeight = true;
    }

    get bodyColor() {
        return this._bodyColor;
    }
    
    set bodyColor(bodyColor) {
        this._bodyColor = bodyColor;
        this.tint = bodyColor;
    }
    
    toJSON() {
        let json = {
            _class: "Shape",
            name: this.name,
            relativeAnchor: this.relativeAnchor,
            relativeOffset: this.relativeOffset,
            offsetInPixel: this.offsetInPixel,
            graphics: this.graphics
        };
        console.log(json);
        return json;
    }
    
    static fromJSON(game, j) {
        return new Shape(game, j.relativeAnchor, j.relativeOffset, j.offsetInPixel, j.graphics);        
    }
}