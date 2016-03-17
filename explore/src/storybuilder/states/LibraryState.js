import Scene from '../../scene/objects/Scene.js';
import Floor from '../../scene/objects/Floor.js';
import Wall from '../../scene/objects/Wall.js';
import Texture from '../../scene/objects/Texture.js';
import TileTexture from '../../scene/objects/TileTexture.js';
import Item from '../../scene/objects/Item.js';
import Holder from '../../scene/objects/Holder.js';
import Surface from '../../scene/objects/Surface.js';
import Util from '../../scene/objects/Util.js';
import StoryUtil from '../objects/StoryUtil.js';
import RecordingManager from '../objects/RecordingManager.js';
import EnableAttributeEditorSignal from '../objects/EnableAttributeEditorSignal.js';
import ShowAttributeEditorSignal from '../objects/ShowAttributeEditorSignal.js';
import AttributeEditOverlay from '../objects/AttributeEditOverlay.js';
import StoryBuilderInputHandler from '../objects/StoryBuilderInputHandler.js';
import Library from '../objects/Library.js';
import Story from '../objects/Story.js';
import StoryPage from '../objects/StoryPage.js';
import ButtonGrid from '../../puppet/objects/ButtonGrid.js';

var _ = require('lodash');

export default class LibraryState extends Phaser.State {

    preload() {
        var that = this;
        this._library = game.cache.getJSON('storyBuilder/library');
        let stories = this._library.stories;
        this._frameData = {};
        if (stories) {
            _.each(stories, function(story) {
                if (story && story.imageData) {
                    let imgDataURI = story.imageData;
                    let storyImage = new Image();
                    storyImage.src = imgDataURI;
                    game.cache.addImage(story.storyId, imgDataURI, storyImage);                    
                    that._frameData[story.storyId] = {image_data:imgDataURI};
                }
            });

        }
    }

    create() {
        // create internal datastructure

        let storyPage1 = new StoryPage(game, 0, 0, 'page_1', 'Jungle 1', null);
        let storyPage2 = new StoryPage(game, 0, 0, 'page_2', 'Jungle 2', null);

        let story = new Story(game, 0, 0, '123-332-11', 'My Journey', null);
        story.addStoryPage(storyPage1);
        story.addStoryPage(storyPage2);

        let library = new Library(game, this.game.width, this.game.height, 'MyBooks');
        library.addStory(story);

        console.log('library:' + library);

        let lib1 = JSON.parse('{"_class":"Library","x":800,"y":600,"name":"MyBooks","stories":[{"_class":"Story","x":0,"y":0,"storyId":"123-332-11","imageData":null,"storyPages":[{"_class":"StoryPage","x":0,"y":0,"pageId":"page_1","imageData":null},{"_class":"StoryPage","x":0,"y":0,"pageId":"page_2","imageData":null}]}]}');
        //    constructor(game, name, width, height, numRows, numColumns, horizontal, callback, callbackContext, frameData) {

        let libraryGrid = new ButtonGrid(game, 'library', game.width, game.height, 4, 3, true, function(tab, storyId) {
            //transit to next state with storyId

        }, this, this._frameData);
        libraryGrid.buttons = Object.keys(this._frameData);

    }

    initializeRecordingManager() {
        this.recordingManager = new RecordingManager(game);
        this._enableAttributeEditorSignal = new EnableAttributeEditorSignal();
        let storyBuilderInputHandler = new StoryBuilderInputHandler();
        this._enableAttributeEditorSignal.dispatch(storyBuilderInputHandler);

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
