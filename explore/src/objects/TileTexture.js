export default class TileTexture extends Phaser.TileSprite {
    constructor(game, x, y, width, height, key, frame) {
        super(game, x, y, width, height, key, frame);
    }

    toJSON() {
        let json = {
            _class: "Texture",
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
