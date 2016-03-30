import Scalable from './Scalable.js';
import RelativePosition from './RelativePosition.js';

export default class Shape extends Scalable(Phaser.Graphics) {
    constructor(game, initialScale, anchor, offset, offsetInPixel, graphics, name) {
        super(game);
        this.graphics = graphics;
        if(graphics != null) {
            this.beginFill(0xffffff);
            this.drawShape(graphics);
            this.endFill();            
        }
        this.name = name;
        this.initialScale = initialScale || new Phaser.Point(1, 1);
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
            initialScale: this.initialScale,
            relativeAnchor: this.relativeAnchor,
            relativeOffset: this.relativeOffset,
            offsetInPixel: this.offsetInPixel,
            graphics: this.graphics
        };
        console.log(json);
        return json;
    }
    
    static fromJSON(game, j) {
        return new Shape(game, j.initialScale, j.relativeAnchor, j.relativeOffset, j.offsetInPixel, j.graphics, j.name);        
    }
}