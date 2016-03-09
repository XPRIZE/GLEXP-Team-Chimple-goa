
export default class Scene extends Phaser.Group {
    constructor(game) {
        super(game);
    }
    
    set floor(floor) {
        if(this._floor) {
            this.remove(this._floor, true);
        }
        this._floor = floor;
        this.add(floor);
    }
    
    get floor() {
        return this._floor;
    }
    
    set wall(wall) {
        if(this._wall) {
            this.remove(this._wall, true);
        }
        this._wall = wall;
        this.add(wall);
    }
    
    get wall() {
        return this._wall;
    }
    
    toJSON() {
        let json = {
            _class: "Scene",
            floor: this._floor,
            wall: this._wall
        }
        return json;
    }
    
    static fromJSON(game, j) {
        let scene = new Scene(game);
        scene.floor = j.floor;
        scene.wall = j.wall;
        return scene;
    }
}