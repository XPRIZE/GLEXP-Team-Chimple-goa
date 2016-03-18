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
import EditHolderInputHandler from '../objects/EditHolderInputHandler.js';

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
        scene.floor = new Floor(game, 0, this.game.height * 0.6);
        let item = new Item(game, 0, 0, 'scene/scene', 'Object_1.png');
        scene.floor.addContent(item);
        // item.fixedToCamera = true;
        //game.camera.follow(item);


        let rightButton = this.game.add.button(game.width - 30, game.height / 2, 'scene/icons', this.panRight, this, 'ic_navigate_next_black_24dp_1x.png', 'ic_navigate_next_black_24dp_1x.png', 'ic_navigate_next_black_24dp_1x.png', 'ic_navigate_next_black_24dp_1x.png');
        rightButton.fixedToCamera = true;

        let leftButton = this.game.add.button(30, game.height / 2, 'scene/icons', this.panLeft, this, 'ic_navigate_before_black_24dp_1x.png', 'ic_navigate_before_black_24dp_1x.png', 'ic_navigate_before_black_24dp_1x.png', 'ic_navigate_before_black_24dp_1x.png');
        leftButton.fixedToCamera = true;

        this.surfaceWidth = 1280;
        let imageNames = [];
        this.game.cache.getFrameData('scene/scene').getFrames().forEach(function(val, index, array) {
            imageNames.push(val.name);
        })
        let chooser = this.game.add.existing(new TabView(this.game, 'scene/scene', this.game.width * 0.9, this.game.height, 10, 50, 5, 3, true, function(tab, button) {
            chooser.unSelect();
            switch (tab) {
                case 'item':
                    scene.floor.addContent(new Item(game, 0, 0, 'scene/scene', button)).enableInputs(new EditSceneInputHandler());
                    break;
                case 'holder':
                    if(EditSceneInputHandler.box != null && EditSceneInputHandler.box.parent instanceof Holder) {
                        let holder = EditSceneInputHandler.box.parent;
                        if(EditSceneInputHandler.mode == EditSceneInputHandler.HOLDER_MODE) {
                            EditSceneInputHandler.mode = EditSceneInputHandler.ITEM_MODE;
                            holder.disableInputs(true);
                            holder.enableInputs(new EditSceneInputHandler());
                        } else {
                            if(EditSceneInputHandler.box != null && EditSceneInputHandler.box.parent instanceof Holder) {
                                EditSceneInputHandler.mode = EditSceneInputHandler.HOLDER_MODE;
                                holder.enableInputs(new EditHolderInputHandler(), true);
                            }
                        }
                    }
                    break;
                case 'surface':
                    let holder = null;
                    if(EditSceneInputHandler.box != null && EditSceneInputHandler.box.parent instanceof Holder) {
                        holder = EditSceneInputHandler.box.parent;
                    } else {
                        holder = scene.floor.addContent(new Holder(game, 0, 0));
                        holder.enableInputs(new EditSceneInputHandler());
                    }
                    let surface = new Surface(game, 0, 0);
                    surface.addTexture(new Texture(game, 0, 0, 'scene/scene', button));
                    holder.addSurface(surface);
                    if (EditSceneInputHandler.box) {
                        EditSceneInputHandler.box.parent.removeChild(EditSceneInputHandler.box);
                        EditSceneInputHandler.box.destroy();
                    }
                    EditSceneInputHandler.box = holder.drawBoundingBox();                    
                    break;
                case 'texture':
                    if(EditSceneInputHandler.box != null && EditSceneInputHandler.box.parent instanceof Holder) {
                        holder = EditSceneInputHandler.box.parent;
                        if(!holder.backTexture) {
                            holder.backTexture = new Texture(game, 0, 0, 'scene/scene', button);
                        } else if(!holder.frontTexture) {
                            holder.frontTexture = new Texture(game, 0, 0, 'scene/scene', button);
                        }
                    } else {
                        holder = scene.floor.addContent(new Holder(game, 0, 0));
                        holder.enableInputs(new EditSceneInputHandler());
                        holder.backTexture = new Texture(game, 0, 0, 'scene/scene', button);
                    }
                    if (EditSceneInputHandler.box) {
                        EditSceneInputHandler.box.parent.removeChild(EditSceneInputHandler.box);
                        EditSceneInputHandler.box.destroy();
                    }
                    EditSceneInputHandler.box = holder.drawBoundingBox();                    
                    break;
                case 'floor':
                    let texture = new TileTexture(game, 0, 0, parseInt(this.surfaceWidth), this.game.height * 0.4, 'scene/scene', button);
                    scene.floor.appendTexture(texture);
                    if(scene.sceneWidth < texture.right) {
                        scene.setSceneSize(texture.right, scene.sceneHeight);
                    }
                    break;
                case 'wall':
                    texture = new TileTexture(game, 0, 0, parseInt(this.surfaceWidth), this.game.height * 0.6, 'scene/scene', button);
                    scene.wall.appendTexture(texture);
                    if(scene.sceneWidth < texture.right) {
                        scene.setSceneSize(texture.right, scene.sceneHeight);
                    }
                    break;
                case 'width':
                    this.surfaceWidth = button;
                case 'delete':
                    if(EditSceneInputHandler.box != null) {
                        EditSceneInputHandler.box.parent.parent.remove(EditSceneInputHandler.box.parent);
                        EditSceneInputHandler.box.parent.destroy();
                        EditSceneInputHandler.box = null;
                    }
                default:
                    break;
            }
        }, this, this.game.cache.getJSON('scene/menu_icons')));

        chooser.tabs = { 'item': imageNames, 'holder': null, 'surface': imageNames, 'texture': imageNames, 'width': ['40', '80', '320', '640', '960', '1280', '1600', '1920', '2560'], 'floor': imageNames, 'wall': imageNames, 'delete': null };
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
