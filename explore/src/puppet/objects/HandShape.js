import Scalable from './Scalable.js';
import RelativePosition from './RelativePosition.js';

export default class HandShape extends Scalable(Phaser.Graphics) {
    constructor(game, initialScale, anchor, offset, offsetInPixel, graphics, graphics1,graphics2,name) {
        super(game);
        this.graphics = graphics;
        this.graphics1 = graphics1;
        this.graphics2 = graphics2;
        if(graphics != null) {
            console.log("one");
            this.beginFill(0xffffff);
            this.drawShape(graphics);
            this.endFill();            
        }
        if(graphics1 != null) {
            console.log("two");
            this.beginFill(0xffffff);
            this.drawShape(graphics1);
            this.endFill();            
        }
         if(graphics2 != null) {
            console.log("three");
            this.beginFill(0xffffff);
            this.drawShape(graphics2);
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
            _class: "HandShape",
            name: this.name,
            initialScale: this.initialScale,
            relativeAnchor: this.relativeAnchor,
            relativeOffset: this.relativeOffset,
            offsetInPixel: this.offsetInPixel,
            graphics: this.graphics,
            graphics1: this.graphics1,
            graphics2: this.graphics2
        };
        console.log(json);
        return json;
    }
    
    static fromJSON(game, j) {
        return new HandShape(game, j.initialScale, j.relativeAnchor, j.relativeOffset, j.offsetInPixel, j.graphics, j.graphics1, j.graphics2);        
    }
}