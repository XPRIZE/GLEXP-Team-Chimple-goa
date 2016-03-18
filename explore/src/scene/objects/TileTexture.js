import EnableInputs from './EnableInputs.js';

export default class TileTexture extends EnableInputs(Phaser.TileSprite) {
    constructor(game, x, y, width, height, key, frame) {
        super(game, x, y, width, height, key, frame);
    }

    enableInputs(instance, iterateInside) {
        super.enableInputs(instance, iterateInside);
        this.inputEnabled = true;
        this.input.enableDrag();
        this.events.onInputDown.add(instance.onInputDown, this);
        this.events.onInputUp.add(instance.onInputUp, this);
        this.events.onDragStart.add(instance.onDragStart, this);
        this.events.onDragUpdate.add(instance.onDragUpdate, this);
        this.events.onDragStop.add(instance.onDragStop, this);
        this.input.priorityID = 3;    
    }

    drawBoundingBox() {
        let box = this.addChild(new Phaser.Graphics(this.game, -this.offsetX, -this.offsetY));
        box.lineStyle(1, 0xFF0000);
        box.beginFill(0x000000, 0);
        box.drawRect(0, 0, this.width, this.height);
        box.endFill();    
        return box;    
    }        

    toJSON() {
        let json = {
            _class: "TileTexture",
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
            key: this.key,
            frame: this.frameName
        }
        return json;
    }
    
    static fromJSON(game, j) {
        let val = new Texture(game, j.x, j.y, j.width, j.height, j.key, j.frame);
        return val;
    }

    
}
