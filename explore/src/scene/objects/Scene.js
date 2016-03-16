export default class Scene extends Phaser.Group {
    constructor(game, width, height) {
        super(game);
        game.world.setBounds(0, 0, width, height);
    }
    
    set uniquename(name) {
        if(!this._uniquename) {
            this._uniquename = name;
        }        
    }
    
    get uniquename() {
        return this._uniquename;
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
            width: this.width,
            height: this.height,
            wall: this.wall,
            floor: this.floor,
            uniquename: this.uniquename
        }
        return json;
    }
    
    static fromJSON(game, j) {
        let scene = new Scene(game);
        scene.uniquename = j.uniquename;
        scene.wall = j.wall;
        scene.floor = j.floor;
        return scene;
    }
}