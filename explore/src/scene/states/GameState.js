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
import EnableAttributeEditorSignal from '../../storybuilder/objects/EnableAttributeEditorSignal.js';
import ExploreInputHandler from '../objects/ExploreInputHandler.js';
import JsonUtil from '../../puppet/objects/JsonUtil.js';
import ConsoleBar from '../../util/ConsoleBar.js';

var _ = require('lodash');

export default class GameState extends Phaser.State {
    init(sceneName) {
        this.sceneName = sceneName;
        this.sceneKey = 'scene/' + sceneName;
        this.sceneJsonKey = this.sceneKey + '_scene';
    }
    preload() {
        //game.load.atlas(this.sceneKey, 'assets/'+this.sceneKey+'.png', 'assets/'+this.sceneKey+'.json');
        game.load.text(this.sceneJsonKey, 'assets/'+this.sceneJsonKey+'.json');
    }

    create() {
        let scene = JSON.parse(game.cache.getText(this.sceneJsonKey), JsonUtil.revive);
        scene.mode = Scene.EXPLORE_MODE;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.game.add.existing(new ConsoleBar(this.game));
    }


     openDoor(){
               
        this.fridge.leftOpenDoorTexture = new Texture(game, 68, -80.5, 'left_opened_door', 'left_opened_door.png');
        this.fridge._leftOpenDoorTexture.visible = false;
        
        
        this.fridge.rightOpenDoorTexture = new Texture(game, 360, -80.5, 'right_opened_door', 'right_opened_door.png');
        this.fridge._rightOpenDoorTexture.visible = false;
         
    }
    
     closeDoor(){
        
        
        
        this.fridge.leftCloseDoorTexture = new Texture(game, 162, -75.5, 'left_closed_door', 'left_closed_door.png');       
   
        this.fridge.rightCloseDoorTexture = new Texture(game, 259, -75.5, 'right_closed_door', 'right_closed_door.png');       
        
    }
    

    update() {


        /*if (this.item.flag == 1) {

            this.item.x = this.game.input.mousePointer.worldX - (0.262 * (this.game.width));
            this.item.y = this.game.input.mousePointer.worldY - (0.582 * this.game.height);

        }*/
    }
}
