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

var _ = require('lodash');

export default class GameState extends Phaser.State {
    init(sceneName) {
        this.sceneName = sceneName;
        this.sceneKey = 'scene/' + sceneName;
        this.sceneJsonKey = this.sceneKey + '_scene';
    }
    preload() {

        // game.load.image('closed_door', 'assets/scene/fridge/closed_door.png');
        // game.load.image('inside_closed_door', 'assets/scene/fridge/inside_closed_door.png');
        // game.load.image('inside_fridge', 'assets/scene/fridge/inside_fridge.png');
        // game.load.image('inside_opened_door', 'assets/scene/fridge/inside_opened_door.png');
        // game.load.image('left_closed_door', 'assets/scene/fridge/left_closed_door.png');
        // game.load.image('left_opened_door', 'assets/scene/fridge/left_opened_door.png');
        // game.load.image('right_closed_door', 'assets/scene/fridge/right_closed_door.png');
        // game.load.image('right_opened_door', 'assets/scene/fridge/right_opened_door.png');
        // game.load.image('black_shelf', 'assets/scene/fridge/black_shelf.png');
        // game.load.image('blue_shelf', 'assets/scene/fridge/blue_shelf.png');  
        // game.load.image('closed_fridge', 'assets/scene/fridge/closed_fridge.png');
        game.load.atlas(this.sceneKey, 'assets/'+this.sceneKey+'.png', 'assets/'+this.sceneKey+'.json');
        game.load.text(this.sceneJsonKey, 'assets/'+this.sceneJsonKey+'.json');
    }

    create() {
        let scene = JSON.parse(game.cache.getText(this.sceneJsonKey), JsonUtil.revive);
        scene.mode = Scene.EXPLORE_MODE;

        // let scene = new Scene(game, this.game.width * 2, this.game.height);
        // scene.uniquename = _.uniqueId("jungle_scene");
        // scene.wall = new Wall(game, 0, 0);
        // scene.wall.addTexture(new TileTexture(game, 0, 0, this.game.width * 2, this.game.height * 0.6, 'scene/scene', 'Wall_Tile_single.png'));
        // scene.floor = new Floor(game, 0, this.game.height * 0.6);
        // scene.floor.addTexture(new TileTexture(game, 0, 0, this.game.width * 2, this.game.height * 0.4, 'scene/scene', 'Tile.png'));

        // var sink = new Holder(game, 100, 10);
        // sink.enableInputs(new ExploreInputHandler(scene));
        // sink.events.onInputDown.add(function(sprite, pointer) {
        //     console.log(sprite);
        // }, this);
        // sink.uniquename = _.uniqueId("sink");
        // sink.backTexture = new Texture(game, 0, 0, 'scene/scene', 'Sink_Main.png');

        // let sinkTop = new Surface(game, 0, 0);
        // sinkTop.uniquename = _.uniqueId("sinkTop");
        // sinkTop.addTexture(new Texture(game, 0, 0, 'scene/scene', 'Sink_upper.png'));

        // let sinkTop1 = new Surface(game, 0, 60);
        // sinkTop1.uniquename = _.uniqueId("sinkTop");
        // sinkTop1.addTexture(new Texture(game, 0, 0, 'scene/scene', 'Sink_upper.png'));
        
        // let sinkTop2 = new Surface(game, 0, 100);
        // sinkTop2.uniquename = _.uniqueId("sinkTop");
        // sinkTop2.addTexture(new Texture(game, 0, 0, 'scene/scene', 'Sink_upper.png'));

        // let item = new Item(game, 0, 0, 'scene/scene', 'Object_1.png')
        // item.enableInputs(new ExploreInputHandler(scene));
        // item.uniquename = _.uniqueId("object_1");
        // sinkTop.addContent(item);

        // let item1 = new Item(game, 30, 0, 'scene/scene', 'Object_3.png')
        // item1.enableInputs(new ExploreInputHandler(scene));
        // item1.uniquename = _.uniqueId("object_3");
        // sinkTop.addContent(item1);

        // sink.addSurface(sinkTop);
        // sink.addSurface(sinkTop1);
        // sink.addSurface(sinkTop2);

        // // var sink1 = new Holder(game, 0, -50);
        // // sink1.backTexture = new Texture(game, 0, 0, 'scene', 'Sink_Main.png');

        // // let sink1Top = new Surface(game, 0, 0);
        // // sink1Top.addTexture(new Texture(game, 0, 0, 'scene', 'Sink_upper.png'));
        // // let item = new Item(game, 0, 0, 'scene', 'Object_1.png');
        // // sink1Top.addContent(item);
        // // sink1.addSurface(sink1Top);
        // // sinkTop.addContent(sink1);

        // scene.floor.addContent(sink);
        

        // //Adding fridge
        // this.fridge = new Holder(game, 150, -100);
        // this.fridge.enableInputs(new ExploreInputHandler(scene));

        // this.fridge.uniquename = _.uniqueId("fridge");
        // this.fridge.backTexture = new Texture(game,150, -100, 'inside_fridge', 'inside_fridge.png');
     
        // this.closeDoor();
        // this.openDoor();
        
        // scene.floor.addContent(this.fridge);


        
        // let sceneFromJSON = '{"_class":"Scene","width":826,"height":600,"wall":{"_class":"Wall","x":0,"y":0,"textures":[{"_class":"TileTexture","x":0,"y":0,"width":800,"height":360,"key":"scene/scene","frame":"Wall_Tile_single.png"}],"contents":[]},"floor":{"_class":"Floor","x":0,"y":360,"textures":[{"_class":"TileTexture","x":0,"y":0,"width":800,"height":240,"key":"scene/scene","frame":"Tile.png"}],"contents":[{"_class":"Item","x":0,"y":0,"key":"scene/scene","frame":"Object_1.png","uniquename":"object_12"},{"_class":"Item","x":0,"y":0,"key":"scene/scene","frame":"Object_3.png","uniquename":"object_13"}]},"uniquename":"jungle_scene1"}';
        // let scene2  = JSON.parse(sceneFromJSON, Util.revive);

        //scene.floor.addContent(new Item(game, 20, 20, 'scene', 'commode.png'));

        // game.camera.follow(item);
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // let scene = JSON.parse('{"_class":"Scene","floor":{"_class":"Floor","x":0,"y":360,"texture":{"_class":"Texture","x":0,"y":0,"key":"scene","frame":"Floor.png"},"contents":[{"_class":"Holder","x":100,"y":10,"frontTexture":{"_class":"Texture","x":0,"y":0,"key":"scene","frame":"Sink_Main.png"},"surfaces":[{"_class":"Surface","x":0,"y":0,"texture":{"_class":"Texture","x":0,"y":0,"key":"scene","frame":"Sink_upper.png"},"contents":[]}]},{"_class":"Item","x":20,"y":20,"key":"scene","frame":"commode.png"}]},"wall":{"_class":"Wall","x":0,"y":0,"texture":{"_class":"Texture","x":0,"y":0,"key":"scene","frame":"Front_Wall.png"},"contents":[]}}', Util.revive);

        // let com = this.game.add.sprite(200, 10, 'scene', 'commode.png');
        // com.addChild(new Phaser.Sprite(game, 10, 10, 'scene', 'Sink_Main.png'));
        // com.inputEnabled = true;
        // com.input.enableDrag(true);
        // let scene = JSON.parse('{"_class":"Scene","sceneWidth":1600,"sceneHeight":600,"wall":{"_class":"Wall","x":0,"y":0,"textures":[],"contents":[]},"floor":{"_class":"Floor","x":0,"y":360,"textures":[],"contents":[{"_class":"Item","x":515,"y":1,"key":"scene/scene","frame":"Object_7.png"},{"_class":"Holder","x":400,"y":300,"backTexture":{"_class":"Texture","x":0,"y":0,"key":"scene/scene","frame":"Sink_Main.png"},"surfaces":[{"_class":"Surface","x":0,"y":0,"textures":[{"_class":"Texture","x":0,"y":0,"key":"scene/scene","frame":"Sink_upper.png"}],"contents":[]}]},{"_class":"Holder","x":400,"y":300,"frontTexture":{"_class":"Texture","x":0,"y":0,"key":"scene/scene","frame":"Wall_Tile_single.png"},"backTexture":null,"surfaces":[{"_class":"Surface","x":0,"y":0,"textures":[{"_class":"Texture","x":35,"y":19,"key":"scene/scene","frame":"Shelf_ladders.png"}],"contents":[]}]}]}}', Util.revive);
        //bind input handler 
        // this._enableAttributeEditorSignal = new EnableAttributeEditorSignal();
        // let exploreInputHandler = new ExploreInputHandler(scene);
        // this._enableAttributeEditorSignal.dispatch(exploreInputHandler);


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
