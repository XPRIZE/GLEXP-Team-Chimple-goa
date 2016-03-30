import Scene from '../../scene/objects/Scene.js';
import Floor from '../../scene/objects/Floor.js';
import Wall from '../../scene/objects/Wall.js';
import Texture from '../../scene/objects/Texture.js';
import TileTexture from '../../scene/objects/TileTexture.js';
import Item from '../../scene/objects/Item.js';
import Holder from '../../scene/objects/Holder.js';
import Surface from '../../scene/objects/Surface.js';
import StoryUtil from '../objects/StoryUtil.js';
import JsonUtil from '../../puppet/objects/JsonUtil.js';
import RecordingManager from '../objects/RecordingManager.js';
import AttributeEditOverlay from '../objects/AttributeEditOverlay.js';
import StoryBuilderInputHandler from '../objects/StoryBuilderInputHandler.js';
import Library from '../objects/Library.js';
import Story from '../objects/Story.js';
import Page from '../objects/Page.js';
import ButtonGrid from '../../puppet/objects/ButtonGrid.js';
import ConsoleBar from '../../util/ConsoleBar.js';


var _ = require('lodash');

export default class EditStoryPagesState extends Phaser.State {
    init(currentStoryId) {
        this._currentStoryId = currentStoryId;
    }

    loadStoryFromLocalStorage(currentStoryId) {
        //cache current story Id
        let storyJSON = localStorage.getItem(currentStoryId);
        let currentStory = JSON.parse(storyJSON);
        return currentStory;
    }

    loadDefaultNewPageImageIntoCache() {
        let pageDefaultImage = new Image();
        pageDefaultImage.src = this._defaultPageImageData;
        game.cache.addImage(EditStoryPagesState.NEW_PAGE_IMAGE_KEY, EditStoryPagesState.DEFAULT_NEW_PAGE_IMAGE_DATA, pageDefaultImage);
    }

    consturctButtonGridFrames() {
        let pageGridFrameData = {};
        this._currentStory.storyPages.forEach(function(page) {
            if (page && page.imageData) {
                let imgDataURI = page.imageData;
                let pageImage = new Image();
                pageImage.src = imgDataURI;
                game.cache.addImage(page.pageId, imgDataURI, pageImage);
                pageGridFrameData[page.pageId] = { image_data: imgDataURI };
            }
        }, this);

        return pageGridFrameData;
    }

    preload() {

        this._currentStory = this.loadStoryFromLocalStorage(this._currentStoryId);

        this.loadDefaultNewPageImageIntoCache();

        this._pageGridFrames = this.consturctButtonGridFrames();

    }

    create() {
        //create console bar
        this._consoleBar = new ConsoleBar(this.game);
        this._consoleBar.createRightButtonGrid([EditStoryPagesState.HOME_BUTTON, EditStoryPagesState.EDIT_BUTTON], this.defineControls, this);

        this.game.add.existing(this._consoleBar);


        // create internal datastructure
        this._editStoryPagesDisplayGroup = this.game.add.group();

        this.saveToLocalStore();

        this.drawGrid();
    }

    defineControls(tab, name) {
        console.log('name:' + name);
        if (name === EditStoryPagesState.HOME_BUTTON) {
            this.navigateToLibrary();
        } else if (name === EditStoryPagesState.EDIT_BUTTON) {
            this.addNewPage();
        }
    }

    drawGrid() {
        this._pagesGrid = new ButtonGrid(game, 'pages', game.width, game.height - this._consoleBar.consoleBarHeight(), 4, 3, true, function(tab, pageId) {
            //transit to next state with storyId
            this._currentStory.storyPages.forEach(function(element) {
                if (element.pageId === pageId) {
                    this._curPage = element;
                    this.saveToLocalStore();
                    this.game.state.start('StoryConstructNewStoryPageState', true, false, false, this._currentStoryId, this._curPage.pageId);
                }
            }, this);

        }, this, this._pageGridFrames);
        this._pagesGrid.buttons = Object.keys(this._pageGridFrames);
        this._pagesGrid.y = this._consoleBar.consoleBarHeight() + 10;
        this._editStoryPagesDisplayGroup.add(this._pagesGrid);

    }

    addNewPage() {
        let pName = StoryUtil.generateUUID();
        //create empty scene for each new page loaded
        let scene = new Scene(game, this.game.width * 2, this.game.height);
        scene.uniquename = StoryUtil.generateUUID();
        scene.wall = new Wall(game, 0, 0);
        scene.floor = new Floor(game, 0, this.game.height * 0.6);
        let page = new Page(game, 0, 0, pName, scene, this._currentStory.storyId, EditStoryPagesState.DEFAULT_NEW_PAGE_IMAGE_DATA);
        this._pagesGrid.addButton(EditStoryPagesState.NEW_PAGE_IMAGE_KEY, null, null, { image_data: EditStoryPagesState.DEFAULT_NEW_PAGE_IMAGE_DATA });
        this._currentStory.storyPages.push(page);
        this.saveToLocalStore();
    }

    navigateToLibrary() {
        this.game.state.start('StoryBuilderLibraryState');
    }


    saveToLocalStore() {
        try {
            localStorage.setItem(this._currentStory.storyId, JSON.stringify(this._currentStory, JsonUtil.replacer));
        } catch (e) {
            if (isQuotaExceeded(e)) {
                // Storage full, maybe notify user or do some clean-up
            }
        }

    }

    isQuotaExceeded(e) {
        let quotaExceeded = false;
        if (e) {
            if (e.code) {
                switch (e.code) {
                    case 22:
                        quotaExceeded = true;
                        break;
                    case 1014:
                        // Firefox
                        if (e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                            quotaExceeded = true;
                        }
                        break;
                }
            } else if (e.number === -2147024882) {
                // Internet Explorer 8
                quotaExceeded = true;
            }
        }
        return quotaExceeded;
    }
    shutdown() {
    }

}


EditStoryPagesState.NEW_PAGE_IMAGE_KEY = "newPageImage";
EditStoryPagesState.DEFAULT_NEW_PAGE_IMAGE_DATA = "data:image/png;base64,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";

EditStoryPagesState.HOME_BUTTON = 'home.png';
EditStoryPagesState.EDIT_BUTTON = 'edit.png';
