import Texture from './Texture.js';
import TileTexture from './TileTexture.js';
import Surface from './Surface.js';
// import Holder from './Holder.js';
//Somehow adding Holder in the import makes it non-babelifiable

export default class Item extends Phaser.Sprite {
    constructor(game, x, y, key, frame) {
        super(game, x, y, key, frame);  
        this.anchor.setTo(0, 1);
        game.physics.enable(this);
        this.inputEnabled = true;
        this.input.enableDrag();
        this.events.onDragStop.add(this.onDragStop, this);
        this.input.priorityID = 2;
    }
    
    onDragStop(sprite, pointer) {
        let globalPoint = this.toGlobal(new PIXI.Point(0, 0));
        let testSprite = new Phaser.Sprite(this.game, globalPoint.x, globalPoint.y, this.key, this.frame);
        this.game.physics.enable(testSprite);
        testSprite.body.setSize(this.width, this.game.height - this.y, this.x, this.y);
        this.addChild(testSprite);
        // this.game.debug.body(testSprite);

        let result = {};
        this.game.physics.arcade.overlap(testSprite, Surface.All, this.overlapHandler, null, result);
        testSprite.destroy();
        if(result.closestObject) {
            result.closestObject.addChild(this);
            this.game.add.tween(this).to({y: 0}, 1000, null, true);
        }
    }
    
    overlapHandler(obj1, obj2) {
        // console.log(obj2);
        if(obj2 instanceof TileTexture) {
            return;
        }
        let distance = obj1.game.physics.arcade.distanceBetween(obj1.parent, obj2);
        if(!this.closestDistance || this.closestDistance > distance) {
            this.closestDistance = distance;
            this.closestObject = obj2;
        }
    }
    
    toJSON() {
        let json = {
            _class: "Item",
            x: this.x,
            y: this.y,
            key: this.key,
            frame: this.frameName
        }
        return json;
    }
    
    static fromJSON(game, j) {
        let val = new Item(game, j.x, j.y, j.key, j.frame);
        return val;
    }
    
}