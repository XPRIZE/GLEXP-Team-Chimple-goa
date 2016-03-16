import Scene from '../../scene/objects/Scene.js';
import Floor from '../../scene/objects/Floor.js';
import Wall from '../../scene/objects/Wall.js';
import Texture from '../../scene/objects/Texture.js';
import TileTexture from '../../scene/objects/TileTexture.js';
import Item from '../../scene/objects/Item.js';
import Holder from '../../scene/objects/Holder.js';
import Surface from '../../scene/objects/Surface.js';
import Util from '../../scene/objects/Util.js';
import RecordingManager from '../objects/RecordingManager.js';
import EnableAttributeEditorSignal from '../objects/EnableAttributeEditorSignal.js';
import ShowAttributeEditorSignal from '../objects/ShowAttributeEditorSignal.js';
import AttributeEditOverlay from '../objects/AttributeEditOverlay.js';

var _ = require('lodash');

export default class GameState extends Phaser.State {

    preload() {
    }

    create() {
        // create internal datastructure

        //Refactor below method to create initial scene from JSON                
        let scene = new Scene(game, this.game.width * 2, this.game.height);
        scene.uniquename = _.uniqueId("jungle_scene");
        scene.wall = new Wall(game, 0, 0);
        scene.wall.addTexture(new TileTexture(game, 0, 0, this.game.width, this.game.height * 0.6, 'scene/scene', 'Wall_Tile_single.png'));
        scene.floor = new Floor(game, 0, this.game.height * 0.6);
        scene.floor.addTexture(new TileTexture(game, 0, 0, this.game.width, this.game.height * 0.4, 'scene/scene', 'Tile.png'));

        let item = new Item(game, 0, 0, 'scene/scene', 'Object_1.png');
        item.uniquename = _.uniqueId("object_1");
        scene.floor.add(item);

        let item1 = new Item(game, 0, 0, 'scene/scene', 'Object_3.png');
        item1.uniquename = _.uniqueId("object_1");
        scene.floor.add(item1);

        //sinkTop.addContent(scene.floor);

        /*let item1 = new Item(game, 0, 0, 'scene/scene', 'Object_3.png');
        item1.uniquename = _.uniqueId("object_3");        
        scene.floor.add(item1);    
        
        var sink = new Holder(game, 100, 10);
        sink.uniquename = _.uniqueId("sink");
        sink.backTexture = new Texture(game, 0, 0, 'scene/scene', 'Sink_Main.png');
        
        let sinkTop = new Surface(game, 0, 0);
        sinkTop.uniquename = _.uniqueId("sinkTop");
        sinkTop.addTexture(new Texture(game, 0, 0, 'scene/scene', 'Sink_upper.png'));
        
        let item2  = new Item(game, 0, 0, 'scene/scene', 'Object_3.png')
        item2.uniquename = _.uniqueId("object_4");
        sinkTop.addContent(item2);
        sink.addSurface(sinkTop);

        
        /*let item1 = new Item(game, 0, 0, 'scene/scene', 'Object_3.png')
        item1.uniquename = _.uniqueId("object_3");
        sinkTop.addContent(item1);
        sink.addSurface(sinkTop);
*/
        // var sink1 = new Holder(game, 0, -50);
        // sink1.backTexture = new Texture(game, 0, 0, 'scene', 'Sink_Main.png');

        // let sink1Top = new Surface(game, 0, 0);
        // sink1Top.addTexture(new Texture(game, 0, 0, 'scene', 'Sink_upper.png'));
        // let item = new Item(game, 0, 0, 'scene', 'Object_1.png');
        // sink1Top.addContent(item);
        // sink1.addSurface(sink1Top);
        // sinkTop.addContent(sink1);

        //scene.floor.addContent(sink);

        //scene.floor.addContent(new Item(game, 20, 20, 'scene', 'commode.png'));

        game.camera.follow(item);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.initializeRecordingManager();

        // let scene = JSON.parse('{"_class":"Scene","floor":{"_class":"Floor","x":0,"y":360,"texture":{"_class":"Texture","x":0,"y":0,"key":"scene","frame":"Floor.png"},"contents":[{"_class":"Holder","x":100,"y":10,"frontTexture":{"_class":"Texture","x":0,"y":0,"key":"scene","frame":"Sink_Main.png"},"surfaces":[{"_class":"Surface","x":0,"y":0,"texture":{"_class":"Texture","x":0,"y":0,"key":"scene","frame":"Sink_upper.png"},"contents":[]}]},{"_class":"Item","x":20,"y":20,"key":"scene","frame":"commode.png"}]},"wall":{"_class":"Wall","x":0,"y":0,"texture":{"_class":"Texture","x":0,"y":0,"key":"scene","frame":"Front_Wall.png"},"contents":[]}}', Util.revive);

        // let com = this.game.add.sprite(200, 10, 'scene', 'commode.png');
        // com.addChild(new Phaser.Sprite(game, 10, 10, 'scene', 'Sink_Main.png'));
        // com.inputEnabled = true;
        // com.input.enableDrag(true);

    }

    initializeRecordingManager() {
        this.recordingManager = new RecordingManager(game);
        this._enableAttributeEditorSignal = new EnableAttributeEditorSignal();
        this._enableAttributeEditorSignal.dispatch();

        this._showAttributeEditorSignal = new ShowAttributeEditorSignal();
        this._showAttributeEditorSignal.add(this.showAttributeEditor, this);
    }

    showAttributeEditor(item, pointer) {
        console.log('create showAttributeEditor on item:' + item.uniquename);
        //create overlay bitmap Sprite
        this._AttributeEditOverlay = new AttributeEditOverlay(game, game.width, game.height, item, pointer);
        /*this._overlayBitMap = game.make.bitmapData(game.width, game.height);
        this._overlayBitMap.draw(game.cache.getImage('storyBuilder/backgroundOverlay'), 0, 0, game.width, game.height);

        let overlayDisplaySprite = self.game.add.sprite(0, 0, this._overlayBitMap);
        overlayDisplaySprite.anchor.setTo(0, 0);
        overlayDisplaySprite.alpha = 0.5;
        overlayDisplaySprite.inputEnabled = true;*/

    }
    
    shutdown() {
        //this._overlayBitMap.destory();
    }
}
