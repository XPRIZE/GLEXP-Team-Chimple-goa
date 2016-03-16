import Scene from '../objects/Scene.js';
import Floor from '../objects/Floor.js';
import Wall from '../objects/Wall.js';
import Texture from '../objects/Texture.js';
import TileTexture from '../objects/TileTexture.js';
import Item from '../objects/Item.js';
import Holder from '../objects/Holder.js';
import Surface from '../objects/Surface.js';
import Util from '../objects/Util.js';
import Human from '../../puppet/objects/Human.js';
import TabView from '../../puppet/objects/TabView.js';

export default class EditState extends Phaser.State {

    preload() {
        this.load.atlas('scene/scene', "assets/scene/scene.png", "assets/scene/scene.json");
        this.load.atlas('misc/theme', "assets/misc/theme.png", "assets/misc/theme.json");        
    }

    create() {
        let scene = new Scene(game, this.game.width * 2, this.game.height);
        scene.wall = new Wall(game, 0, 0);
        scene.wall.addTexture(new TileTexture(game, 0, 0, this.game.width, this.game.height * 0.6, 'scene/scene', 'Wall_Tile_single.png'));
        scene.floor = new Floor(game, 0, this.game.height * 0.6);
        scene.floor.addTexture(new TileTexture(game, 0, 0, this.game.width, this.game.height * 0.4, 'scene/scene', 'Tile.png'));
        let item = new Item(game, 0, 0, 'scene/scene', 'Object_1.png');
        scene.floor.addContent(item);

        let imageNames = [];
        this.game.cache.getFrameData('scene/scene').getFrames().forEach(function (val, index, array) {
            imageNames.push(val.name);
        })
    let chooser = this.game.add.existing(new TabView(this.game, 'scene/scene', this.game.width / 2, this.game.height, 10, 50, 5, 3, true, function (tab, button) {
        chooser.unSelect();
        console.log(tab + button);
    }, this));

    chooser.tabs = {'Object_1.png': imageNames};
    chooser.x = this.game.width / 2;
    chooser.y = 0;

    }
}
