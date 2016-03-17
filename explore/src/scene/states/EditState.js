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
import EnableAttributeEditorSignal from '../../storybuilder/objects/EnableAttributeEditorSignal.js';
import EditSceneInputHandler from '../objects/EditSceneInputHandler.js';

export default class EditState extends Phaser.State {

    preload() {
        this.load.atlas('scene/scene', "assets/scene/scene.png", "assets/scene/scene.json");
        this.load.atlas('misc/theme', "assets/misc/theme.png", "assets/misc/theme.json");
        this.load.atlas('scene/icons', "assets/scene/icons.png", "assets/scene/icons.json");
        this.load.json('scene/menu_icons', 'assets/scene/menu_icons.json');
    }

    create() {

        let scene = new Scene(game, this.game.width * 2, this.game.height);
        scene.wall = new Wall(game, 0, 0);
        scene.wall.addTexture(new TileTexture(game, 0, 0, this.game.width, this.game.height * 0.6, '__default'));
        scene.floor = new Floor(game, 0, this.game.height * 0.6);
        scene.floor.addTexture(new TileTexture(game, 0, 0, this.game.width, this.game.height * 0.4, '__default'));
        let item = new Item(game, 0, 0, 'scene/scene', 'Object_1.png');
        scene.floor.addContent(item);
        // item.fixedToCamera = true;
        //game.camera.follow(item);


        let rightButton = this.game.add.button(game.width - 30, game.height / 2, 'scene/icons', this.panRight, this, 'ic_navigate_next_black_24dp_1x.png', 'ic_navigate_next_black_24dp_1x.png', 'ic_navigate_next_black_24dp_1x.png', 'ic_navigate_next_black_24dp_1x.png');
        rightButton.fixedToCamera = true;

        let leftButton = this.game.add.button(30, game.height / 2, 'scene/icons', this.panLeft, this, 'ic_navigate_before_black_24dp_1x.png', 'ic_navigate_before_black_24dp_1x.png', 'ic_navigate_before_black_24dp_1x.png', 'ic_navigate_before_black_24dp_1x.png');
        leftButton.fixedToCamera = true;


        let imageNames = [];
        this.game.cache.getFrameData('scene/scene').getFrames().forEach(function(val, index, array) {
            imageNames.push(val.name);
        })
        let chooser = this.game.add.existing(new TabView(this.game, 'scene/scene', this.game.width * 0.9, this.game.height, 10, 50, 5, 3, true, function(tab, button) {
            chooser.unSelect();
            console.log(tab + button);
            switch (tab) {
                case 'item':
                    scene.floor.addContent(new Item(game, 0, 0, 'scene/scene', button));
                    break;
                case 'surface':

                    break;
                case 'texture':

                    break;
                case 'floor':
                    scene.floor.addTexture(new TileTexture(game, 0, 0, this.game.width, this.game.height * 0.4, 'scene/scene', button));
                    break;
                case 'wall':
                    scene.wall.addTexture(new TileTexture(game, 0, 0, this.game.width, this.game.height * 0.6, 'scene/scene', button));
                    break;
                default:
                    break;
            }
        }, this, this.game.cache.getJSON('scene/menu_icons')));

        chooser.tabs = { 'item': imageNames, 'surface': imageNames, 'texture': imageNames, 'floor': imageNames, 'wall': imageNames, 'delete': null };
        chooser.x = this.game.width * 0.05;
        chooser.y = 0;
        chooser.fixedToCamera = true;
        //bind input handler 
        this._enableAttributeEditorSignal = new EnableAttributeEditorSignal();
        let editSceneInputHandlerInstance = new EditSceneInputHandler(game);
        this._enableAttributeEditorSignal.dispatch(editSceneInputHandlerInstance);

    }

    panRight() {
        this.game.camera.x = this.game.camera.x + 160;
    }

    panLeft() {
        this.game.camera.x = this.game.camera.x - 160;
    }

}
