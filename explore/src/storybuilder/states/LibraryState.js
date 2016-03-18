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
        this._library = JSON.parse(JSON.stringify(game.cache.getJSON('storyBuilder/library')), StoryUtil.revive);        
        
        let stories = this._library.stories;
        this._frameData = {};
        if (stories) {
            _.each(stories, function(story) {
                if (story && story.imageData) {
                    let imgDataURI = story.imageData;
                    let storyImage = new Image();
                    storyImage.src = imgDataURI;
                    game.cache.addImage(story.storyId, imgDataURI, storyImage);
                    that._frameData[story.storyId] = { image_data: imgDataURI };
                }
            });

        }
    }

    create() {
        // create internal datastructure
        this._display = this.game.add.group();
        let that = this;        
        let libraryGrid = new ButtonGrid(game, 'library', game.width, game.height, 4, 3, true, function(tab, storyId) {
            //transit to next state with storyId
            _.each(this._library.stories, function(story) {
                if(story.storyId === storyId) {
                    that.game.state.start('StoryBuilderSelectStoryState', true, false, JSON.stringify(story));        
                }    
            });
            
            
        }, this, this._frameData);
        libraryGrid.buttons = Object.keys(this._frameData);
        this._display.add(libraryGrid);
    }

    shutdown() {
    }
}
