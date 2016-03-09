export default class Texture extends Phaser.Sprite {
    constructor(game, x, y, key, frame) {
        super(game, x, y, key, frame);
    }

    toJSON() {
        let json = {
            _class: "Texture",
            x: this.x,
            y: this.y,
            key: this.key,
            frame: this.frame
        }
        return json;
    }
    
    static fromJSON(game, j) {
        let val = new Texture(game, j.x, j.y, j.key, j.frame);
        return val;
    }

    
}
