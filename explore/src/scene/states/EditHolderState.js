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
import EditHolderInputHandler from '../objects/EditHolderInputHandler.js';

export default class EditHolderState extends Phaser.State {
    init(holder, scene, cameraPosition) {
        this.holderX = holder.x;
        this.holderY = holder.y;
        holder.x = this.game.width / 2;
        holder.y = this.game.height / 2;
        this.holder = holder;
        
        this.holder.disableInputs();
        this.holder.enableInputs(new EditHolderInputHandler(), true);

        this.scene = scene;
        this.cameraPosition = cameraPosition;
        // this.holders = holders;
    }
    
    preload() {
        // this.load.atlas('scene/scene', "assets/scene/scene.png", "assets/scene/scene.json");
        // this.load.atlas('misc/theme', "assets/misc/theme.png", "assets/misc/theme.json");
        // this.load.json('scene/menu_icons', 'assets/scene/menu_icons.json');        
    }

    create() {
        this.game.add.existing(this.holder);
        
        let imageNames = [];
        this.game.cache.getFrameData('scene/scene').getFrames().forEach(function(val, index, array) {
            imageNames.push(val.name);
        })
        let chooser = this.game.add.existing(new TabView(this.game, 'scene/scene', this.game.width * 0.9, this.game.height, 10, 50, 5, 3, true, function(tab, button) {
            chooser.unSelect();
            switch (tab) {
                case 'surface':
                    let surface = new Surface(game, 0, 0);
                    let surfaceTexture = new Texture(game, 0, 0, 'scene/scene', button);
                    surface.addTexture(surfaceTexture).enableInputs(new EditHolderInputHandler());
                    surfaceTexture.input.priorityID = 4;
                    this.holder.addSurface(surface);
                    break;
                case 'texture':
                        if(!this.holder.backTexture) {
                            this.holder.backTexture = new Texture(game, 0, 0, 'scene/scene', button);
                            this.holder.backTexture.enableInputs(new EditHolderInputHandler())
                            this.holder.backTexture.input.priorityID = 3;
                        } else if(!this.holder.frontTexture) {
                            this.holder.frontTexture = new Texture(game, 0, 0, 'scene/scene', button);
                            this.holder.frontTexture.enableInputs(new EditHolderInputHandler());
                            this.holder.frontTexture.input.priorityID = 5;
                        }
                    break;
                case 'delete':
                    if(EditHolderInputHandler.box != null) {
                        let child = EditHolderInputHandler.box.parent;
                        if(this.holder.frontTexture == child) {
                            this.holder.frontTexture = null;
                        } else if(this.holder.backTexture == child){
                            this.holder.backTexture = null;
                        } else {
                            this.holder.removeChild(child.parent);
                            child.destroy();
                        }
                        EditHolderInputHandler.box = null;
                    }
                    break;
                case 'done':
                    this.game.state.start('SceneEditState', true, false, this.holder, this.scene, this.cameraPosition);
                default:
                    break;
            }
        }, this, this.game.cache.getJSON('scene/menu_icons')));

        chooser.tabs = { 'surface': imageNames, 'texture': imageNames, 'delete': null, 'done': null };
        chooser.x = this.game.width * 0.05;
        chooser.y = 0;
        chooser.fixedToCamera = true;
    }
    
    shutdown() {
        // remove the holdler from world so that it doesnt get destroyed since we need to use it
        if(EditHolderInputHandler.box != null) {
            EditHolderInputHandler.box.parent.removeChild(EditHolderInputHandler.box);
            EditHolderInputHandler.box.destroy();
            EditHolderInputHandler.box = null;
        }
        this.holder.x = this.holderX;
        this.holder.y = this.holderY;
        this.world.remove(this.holder);
        this.scene.floor.addContent(this.holder);
    }

}
