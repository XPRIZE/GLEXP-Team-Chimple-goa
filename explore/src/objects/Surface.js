export default class Surface extends Phaser.Group {
    constructor(game, x, y) {
        super(game);
        this.x = x;
        this.y = y;
    }

    set texture(val) {
        if(this._texture) {
            this.remove(this.texture, true);
        }
        this._texture = val;
        this.add(val);
        this.sendToBack(val);
    }    
    
    get texture() {
        return this._texture;
    }
}