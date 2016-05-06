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
import JsonUtil from '../../puppet/objects/JsonUtil.js';
import EnableAttributeEditorSignal from '../../storybuilder/objects/EnableAttributeEditorSignal.js';
import EditSceneInputHandler from '../objects/EditSceneInputHandler.js';
import MiscUtil from '../../util/MiscUtil.js';

var _ = require('lodash');

export default class EditState extends Phaser.State {
    init(holder, scene, cameraPosition) {
        if(scene == null) {
            if(window.location.search.length == 0) {
                this.scene = new Scene(game, this.game.width * 2, this.game.height);        
                this.scene.wall = new Wall(game, 0, 0);
                this.scene.floor = new Floor(game, 0, this.game.height * 0.6);  
                this.sceneName = 'scene';  
            } else {
                this.sceneName = window.location.search.substring(1);
            }
        } else {
            this.scene = scene;
            this.game.add.existing(this.scene);
        }
        if(holder != null) {
            holder.disableInputs(true);
            holder.enableInputs(new EditSceneInputHandler());
        }
        this.cameraPosition = cameraPosition;
    }

    preload() {
        this.load.atlas('scene/'+this.sceneName, "assets/scene/"+this.sceneName+".png", "assets/scene/"+this.sceneName+".json");
        if(this.sceneName != 'scene') {
            this.load.text('scene/scene_def', 'assets/scene/' + this.sceneName + '_scene.json');        
        }
        
        this.load.atlas('misc/theme', "assets/misc/theme.png", "assets/misc/theme.json");
        this.load.json('scene/menu_icons', 'assets/scene/menu_icons.json');        
    }

    repair(obj) {
        if(obj instanceof Holder) {
            obj.repairOffset();
        }
        obj.children.forEach(function (val) {
            this.repair(val)
        }, this);
    }

    setTempPriority(obj) {
        if(obj instanceof Holder || obj instanceof Item) {
            if(obj.input && obj.parent.parent && obj.parent.parent.input) {
                obj.input.priorityID = obj.parent.parent.input.priorityID + 1;
            }
        }
        obj.children.forEach(function (val) {
            this.setTempPriority(val)
        }, this);
    }

    create() {
        if(this.scene == null) {
            this.scene = JSON.parse(game.cache.getText('scene/scene_def'), JsonUtil.revive);
            this.scene.mode = Scene.EDIT_MODE; 
            this.repair(this.scene);
            this.setTempPriority(this.scene);
        }
        if(this.cameraPosition) {
            this.game.camera.position = this.cameraPosition;        
        }
        let rightButton = this.game.add.button(game.width - 30, game.height / 2, 'scene/icons', this.panRight, this, 'ic_navigate_next_black_24dp_1x.png', 'ic_navigate_next_black_24dp_1x.png', 'ic_navigate_next_black_24dp_1x.png', 'ic_navigate_next_black_24dp_1x.png');
        rightButton.anchor.setTo(0.5, 0.5);
        rightButton.fixedToCamera = true;
        // rightButton.input.priorityID = 4;
        MiscUtil.setPriorityID(rightButton, 4);

        let leftButton = this.game.add.button(30, game.height / 2, 'scene/icons', this.panLeft, this, 'ic_navigate_before_black_24dp_1x.png', 'ic_navigate_before_black_24dp_1x.png', 'ic_navigate_before_black_24dp_1x.png', 'ic_navigate_before_black_24dp_1x.png');
        leftButton.anchor.setTo(0.5, 0.5);
        leftButton.fixedToCamera = true;
        // leftButton.input.priorityID = 4;
        MiscUtil.setPriorityID(leftButton, 4);

        this.surfaceWidth = 1280;
        let imageNames = [];
        this.game.cache.getFrameData('scene/'+this.sceneName).getFrames().forEach(function(val, index, array) {
            imageNames.push(val.name);
        })
        let chooser = this.game.add.existing(new TabView(this.game, 'scene/'+this.sceneName, this.game.width * 0.9, this.game.height, 10, 50, 9, 16, true, function(tab, button) {
            chooser.unSelect();
            switch (tab) {
                case 'item':
                    this.scene.floor.addContent(new Item(game, this.game.camera.x + this.game.width / 2, 0, 'scene/'+this.sceneName, button)).enableInputs(new EditSceneInputHandler());
                    break;
                case 'holder':
                    let holder = null;
                    // For now do not allow holder to be edited
                    if(EditSceneInputHandler.box != null && EditSceneInputHandler.box.parent instanceof Holder) {
                        holder = EditSceneInputHandler.box.parent;
                    } else {
                    //     holder = new Holder(this.game, this.game.width / 2, 0);
                    //     this.scene.floor.addContent(holder);
                    // }
                    holder = new Holder(this.game, this.game.camera.x + this.game.width / 2, 0);
                    this.scene.floor.addContent(holder);
                    }
                    
                    this.game.state.start('SceneEditHolderState', true, false, holder, this.scene, this.game.camera.position.clone());
                    break;
                case 'floor':
                    let texture = new TileTexture(game, 0, 0, parseInt(this.surfaceWidth), this.game.height * 0.4, 'scene/'+this.sceneName, button);
                    this.scene.floor.appendTexture(texture);
                    if(this.scene.sceneWidth < texture.right) {
                        this.scene.setSceneSize(texture.right, this.scene.sceneHeight);
                    }
                    break;
                case 'wall':
                    texture = new TileTexture(game, 0, 0, parseInt(this.surfaceWidth), this.game.height * 0.6, 'scene/'+this.sceneName, button);
                    this.scene.wall.appendTexture(texture);
                    if(this.scene.sceneWidth < texture.right) {
                        this.scene.setSceneSize(texture.right, this.scene.sceneHeight);
                    }
                    break;
                case 'width':
                    this.surfaceWidth = button;
                    break;
                // case 'flip':
                //     if(EditSceneInputHandler.box != null) {
                //         EditSceneInputHandler.box.parent.scale.x *= -1;
                //     }
                //     break;
                case 'delete':
                    if(EditSceneInputHandler.box != null) {
                        EditSceneInputHandler.box.parent.parent.removeChild(EditSceneInputHandler.box.parent);
                        EditSceneInputHandler.box.parent.destroy();
                        EditSceneInputHandler.box = null;
                    }
                    break;
                case 'unlock':
                    if(EditSceneInputHandler.box != null) {
                        EditSceneInputHandler.box.parent.input.enableDrag();
                        EditSceneInputHandler.box.parent.movable = true;
                        if(EditSceneInputHandler.box.parent instanceof Holder) {
                            EditSceneInputHandler.box.parent.surfaces.forEach(function(value, index, array) {
                                Array.prototype.unshift.apply(Surface.All, value.textures);
                            })
                        }
                    }
                    break;    
                case 'lock':
                    // this.scene.floor.disableDrag(true);
                    // this.scene.wall.disableDrag(true);
                    // Surface.All.length = 0;
                    // Array.prototype.push.apply(Surface.All, this.scene.floor.textures);
                    // Array.prototype.push.apply(Surface.All, this.scene.wall.textures);
                    if(EditSceneInputHandler.box != null) {
                        EditSceneInputHandler.box.parent.disableDrag();
                        EditSceneInputHandler.box.parent.movable = false;
                    }
                    break;                                    
                default:
                    break;
            }
        }, this, this.game.cache.getJSON('scene/menu_icons')));

        chooser.tabs = { 'item': imageNames, 'holder': null, 'width': ['40', '80', '320', '640', '960', '1280', '1600', '1920', '2560', '3840'], 'floor': imageNames, 'wall': imageNames, 'lock': null, 'unlock': null, 'delete': null };
        chooser.x = this.game.width * 0.05;
        chooser.y = 0;
        chooser.unSelect();
        chooser.fixedToCamera = true;
    }

    panRight() {
        this.game.camera.x = this.game.camera.x + 160;
    }

    panLeft() {
        this.game.camera.x = this.game.camera.x - 160;
    }

    shutdown() {
        // remove the holdler from world so that it doesnt get destroyed since we need to use it
        this.world.remove(this.scene);
        if(EditSceneInputHandler.box != null) {
            EditSceneInputHandler.box.parent.removeChild(EditSceneInputHandler.box);
            EditSceneInputHandler.box.destroy();
            EditSceneInputHandler.box = null;
        }
        
    }

}
