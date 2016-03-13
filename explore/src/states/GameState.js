import Scene from '../objects/Scene.js';
import Floor from '../objects/Floor.js';
import Wall from '../objects/Wall.js';
import Texture from '../objects/Texture.js';
import TileTexture from '../objects/TileTexture.js';
import Item from '../objects/Item.js';
import Holder from '../objects/Holder.js';
import Surface from '../objects/Surface.js';
import Util from '../objects/Util.js';

export default class GameState extends Phaser.State {

    preload() {
    }

    create() {
        let scene = new Scene(game, this.game.width * 2, this.game.height);
        scene.wall = new Wall(game, 0, 0);
        scene.wall.addTexture(new TileTexture(game, 0, 0, this.game.width, this.game.height * 0.6, 'scene', 'Wall_Tile_single.png'));
        scene.floor = new Floor(game, 0, this.game.height * 0.6);
        scene.floor.addTexture(new TileTexture(game, 0, 0, this.game.width, this.game.height * 0.4, 'scene', 'Tile.png'));
        
        var sink = new Holder(game, 100, 10);
        sink.backTexture = new Texture(game, 0, 0, 'scene', 'Sink_Main.png');
        
        let sinkTop = new Surface(game, 0, 0);
        sinkTop.texture = new Texture(game, 0, 0, 'scene', 'Sink_upper.png')
        sinkTop.addContent(new Item(game, 0, 0, 'scene', 'Object_1.png'));
        sink.addSurface(sinkTop);

        var sink1 = new Holder(game, 0, -50);
        sink1.backTexture = new Texture(game, 0, 0, 'scene', 'Sink_Main.png');
        
        let sink1Top = new Surface(game, 0, 0);
        sink1Top.addTexture(new Texture(game, 0, 0, 'scene', 'Sink_upper.png'));
        let item = new Item(game, 0, 0, 'scene', 'Object_1.png');
        sink1Top.addContent(item);
        sink1.addSurface(sink1Top);
        sinkTop.addContent(sink1);

        scene.floor.addContent(sink);
        
        //scene.floor.addContent(new Item(game, 20, 20, 'scene', 'commode.png'));
        
        game.camera.follow(item);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // let scene = JSON.parse('{"_class":"Scene","floor":{"_class":"Floor","x":0,"y":360,"texture":{"_class":"Texture","x":0,"y":0,"key":"scene","frame":"Floor.png"},"contents":[{"_class":"Holder","x":100,"y":10,"frontTexture":{"_class":"Texture","x":0,"y":0,"key":"scene","frame":"Sink_Main.png"},"surfaces":[{"_class":"Surface","x":0,"y":0,"texture":{"_class":"Texture","x":0,"y":0,"key":"scene","frame":"Sink_upper.png"},"contents":[]}]},{"_class":"Item","x":20,"y":20,"key":"scene","frame":"commode.png"}]},"wall":{"_class":"Wall","x":0,"y":0,"texture":{"_class":"Texture","x":0,"y":0,"key":"scene","frame":"Front_Wall.png"},"contents":[]}}', Util.revive);
        
        // let com = this.game.add.sprite(200, 10, 'scene', 'commode.png');
        // com.addChild(new Phaser.Sprite(game, 10, 10, 'scene', 'Sink_Main.png'));
        // com.inputEnabled = true;
        // com.input.enableDrag(true);
    }
}
