import ExploreInputHandler from '../objects/ExploreInputHandler.js';
import Item from '../objects/Item.js';
import EnableInputs from './EnableInputs.js';

export default class Scene extends EnableInputs(Phaser.Group) {
    constructor(game, width, height) {
        super(game);
        this.setSceneSize(width, height);
    }

    set uniquename(name) {
        if (!this._uniquename) {
            this._uniquename = name;
        }
    }

    get uniquename() {
        return this._uniquename;
    }

    setSceneSize(width, height) {
        game.world.setBounds(0, 0, width, height);
        this.sceneWidth = width;
        this.sceneHeight = height;
    }

    set floor(floor) {
        if (this._floor) {
            this.remove(this._floor, true);
        }
        this._floor = floor;
        this.add(floor);
        this.setInputHandler(floor);
    }

    get floor() {
        return this._floor;
    }

    set wall(wall) {
        if (this._wall) {
            this.remove(this._wall, true);
        }
        this._wall = wall;
        this.add(wall);
        this.setInputHandler(wall);
    }

    get wall() {
        return this._wall;
    }

    get surfaces() {
        return [this.floor, this.wall];
    }

    set mode(val) {
        this._mode = val;
        this.setInputHandler(this);
        // if(this.wall) {
        //     this.setInputHandler(this.wall);        
        // }
        // if(this.floor) {
        //     this.setInputHandler(this.floor);                
        // }
    }

    get mode() {
        return this._mode;
    }

    setInputHandler(object) {
        if (object.surfaces) {
            object.surfaces.forEach(function(surface) {
                surface.contents.forEach(function(content) {
                    content.disableInputs(true);
                    let inputHandler = this.getInputHandler(content);
                    if (inputHandler) {
                        content.enableInputs(inputHandler);
                    }
                    this.setInputHandler(content);
                }, this);
            }, this);
        }
    }

    getInputHandler(item) {
        if (this.mode == Scene.EXPLORE_MODE) {
            if (item instanceof Item) {
                return new ExploreInputHandler(this);
            }
        }
    }

    update() {
        super.update();
        if (this.selectedObject) {
            if (this.game.camera.x < this.game.camera.bounds.width - this.game.camera.width && this.selectedObject.x > this.game.camera.x + this.game.width - 100) {
                this.game.camera.x += 5;
                this.selectedObject.x += 5;
                this.selectedObject.input.dragOffset.x += 5;
            } else if (this.game.camera.x > 0 && this.selectedObject.x < this.game.camera.x + 100) {
                this.game.camera.x -= 5;
                this.selectedObject.x -= 5;
                this.selectedObject.input.dragOffset.x -= 5;
            }
        }
    }

    toJSON() {
        let json = {
            _class: "Scene",
            sceneWidth: this.sceneWidth,
            sceneHeight: this.sceneHeight,
            wall: this.wall,
            floor: this.floor,
            uniquename: this.uniquename
        }
        return json;
    }

    static fromJSON(game, j) {
        let scene = new Scene(game, j.sceneWidth, j.sceneHeight);
        scene.uniquename = j.uniquename;
        scene.wall = j.wall;
        scene.floor = j.floor;
        return scene;
    }
}

Scene.EXPLORE_MODE = 'explore_mode';
Scene.STORY_MODE = 'story_mode';