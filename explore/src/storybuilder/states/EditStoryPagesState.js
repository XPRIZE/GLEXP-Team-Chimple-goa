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
import ShowAttributeEditorSignal from '../objects/ShowAttributeEditorSignal.js';
import AttributeEditOverlay from '../objects/AttributeEditOverlay.js';
import StoryBuilderInputHandler from '../objects/StoryBuilderInputHandler.js';
import Library from '../objects/Library.js';
import Story from '../objects/Story.js';
import StoryPage from '../objects/StoryPage.js';
import ButtonGrid from '../../puppet/objects/ButtonGrid.js';

var _ = require('lodash');

export default class EditStoryPagesState extends Phaser.State {
    init(selectedStory) {
        this._selectedStory = JSON.parse(selectedStory, StoryUtil.revive);
        //this._selectedStory = selectedStory;
    }

    preload() {
        var that = this;

        this._pages = this._selectedStory.storyPages;

        this._frameData = {};
        if (this._pages) {
            _.each(this._pages, function(page) {
                if (page && page.imageData) {
                    let imgDataURI = page.imageData;
                    let pageImage = new Image();
                    pageImage.src = imgDataURI;
                    game.cache.addImage(page.pageId, imgDataURI, pageImage);
                    that._frameData[page.pageId] = { image_data: imgDataURI };
                }
            });

        }
        this.load.image('storybuilder/plus_button', 'assets/storyBuilder/plus_button.png');

    }

    create() {
        // create internal datastructure
        this._display = this.game.add.group();

        //create UI
        this._createNewPageButton = this.game.make.sprite(this.game.width - 40, 40, 'storybuilder/plus_button');
        this._createNewPageButton.anchor.setTo(0.5);
        this._createNewPageButton.inputEnabled = true;
        this._createNewPageButton.events.onInputDown.add(this.addNewPage, this);
        this._display.add(this._createNewPageButton);

        this._homeButton = this.game.make.sprite(this.game.width - this._createNewPageButton.width - 40, 40, 'storybuilder/home_button');
        this._homeButton.anchor.setTo(0.5);
        this._homeButton.inputEnabled = true;
        this._homeButton.events.onInputDown.add(this.navigateToLibrary, this);

        this._display.add(this._homeButton);
        this.drawGrid();
    }

    drawGrid() {
        let that = this;
        this._pagesGrid = new ButtonGrid(game, 'pages', game.width, game.height - this._homeButton.height - 10, 4, 3, true, function(tab, pageId) {
            //transit to next state with storyId
            this._pages.forEach(function(element) {
                if (element.pageId === pageId) {
                    this._curPage = element;                    
                    this.game.state.start('StoryConstructNewStoryPageState', true, false);
                }
            }, this);            

        }, this, this._frameData);
        this._pagesGrid.buttons = Object.keys(this._frameData);
        this._pagesGrid.y = this._homeButton.height + 10;
        this._display.add(this._pagesGrid);

    }

    addNewPage() {
        let pName = _.uniqueId("story_page");
        let page = new StoryPage(game, 0, 0, pName, 'Untitled', null);
        this._pagesGrid.addButton(pName, null, null, null);
        this._selectedStory.addStoryPage(page);
    }

    navigateToLibrary() {
        this.game.state.start('StoryBuilderLibraryState');
    }

    shutdown() {
        this.world.remove(this._curPage);
    }

}
