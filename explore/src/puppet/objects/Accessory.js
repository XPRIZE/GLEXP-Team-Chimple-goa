import Scalable from './Scalable.js';
import RelativePosition from './RelativePosition.js';

export default class Accessory extends RelativePosition(Scalable(Phaser.Sprite)) {
    constructor(game, initialScale, maintainAspectRatio, followWidth, followHeight, anchor, offset, offsetInPixel, flipX, key, frame, name) {
        super(game, 0, 0, key, frame);
        this.name = name;
        this.flipX = flipX;
        this.initKey = key;
        this.initFrame = frame;
        if(flipX) {
            let bmd = new Phaser.BitmapData(game, 'test', this.width, this.height);
            this.anchor.setTo(0.5, 0);
            this.scale.x = -1;
            bmd.draw(this, bmd.width/2, 0);
            this.anchor.setTo(0, 0);
            this.scale.x = 1;
            bmd.add(this);
        }
        this.initialScale = initialScale;
        this.relativeAnchor = anchor;
        this.relativeOffset = offset;
        this.offsetInPixel = offsetInPixel;
        this.maintainAspectRatio = maintainAspectRatio;
        this.followWidth = followWidth;
        this.followHeight = followHeight;
    }
    
    toJSON() {
        let json = {
            _class: "Accessory",
            name: this.name,
            initialScale: this.initialScale,
            maintainAspectRatio: this.maintainAspectRatio,
            followWidth: this.followWidth,
            followHeight: this.followHeight,
            relativeAnchor: this.relativeAnchor,
            relativeOffset: this.relativeOffset,
            offsetInPixel: this.offsetInPixel,
            flipX: this.flipX,
            initKey: this.initKey,
            initFrame: this.initFrame
        };
        console.log(json);
        return json;
    }
    
    static fromJSON(game, j) {
        return new Accessory(game, j.initialScale, j.maintainAspectRatio, j.followWidth, j.followHeight, j.relativeAnchor, j.relativeOffset, j.offsetInPixel, j.flipX, j.initKey, j.initFrame, j.name);        
    }
}