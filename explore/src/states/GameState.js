import Scene from '../objects/Scene.js';
import Floor from '../objects/Floor.js';
import Wall from '../objects/Wall.js';

export default class GameState extends Phaser.State {

    preload() {
    }

    create() {
        let scene = new Scene(game);
        scene.wall = new Wall(game, 0, 0, 'scene', 'Front_Wall.png');
        scene.floor = new Floor(game, 0, this.game.height * 0.6, 'scene', 'Floor.png');

    }
}
