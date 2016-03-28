import StoryUtil from '../objects/StoryUtil.js';
import JsonUtil from '../../puppet/objects/JsonUtil.js';
import Library from '../objects/Library.js';
import LibraryStory from '../objects/LibraryStory.js';
import ButtonGrid from '../../puppet/objects/ButtonGrid.js';
import ConsoleBar from '../../util/ConsoleBar.js';

var _ = require('lodash');

export default class LibraryState extends Phaser.State {

    preload() {
        var that = this;
        //TBD
        let libraryLocalStorageJSON = localStorage.getItem(LibraryState.LIBRARY_KEY);
        if (!libraryLocalStorageJSON) {
            libraryLocalStorageJSON = JSON.stringify(game.cache.getJSON('storyBuilder/library'));
        }

        this._library = JSON.parse(libraryLocalStorageJSON, JsonUtil.revive);
        //load into local storage
        if (typeof (Storage) !== "undefined") {
            // Code for localStorage/sessionStorage.
            localStorage.setItem("library", JSON.stringify(this._library));
        } else {
            // Sorry! No Web Storage support..
        }
        this.loadStories();
        //create default Image 
        this._defaultStoryImage = "data:image/png;base64,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";
    }

    create() {
        // create internal datastructure
        this._display = this.game.add.group();
        let that = this;
        //add console bar

        this._consoleBar = new ConsoleBar(this.game);
        this._consoleBar.createRightButtonGrid([LibraryState.EDIT_BUTTON], this.createNewStoryUsingGrid, this);

        this.game.add.existing(this._consoleBar);
        //create UI
        // this._createNewStoryButton = this.game.add.sprite(this.game.width - 40, 40, 'storyBuilder/plus');
        // this._createNewStoryButton.anchor.setTo(0.5);
        // this._createNewStoryButton.inputEnabled = true;
        // this._createNewStoryButton.events.onInputDown.add(this.createNewStory, this);
        // this._display.add(this._createNewStoryButton);

        this.showLibrary();

    }

    createNewStoryUsingGrid(tab, name) {
        let storyId = StoryUtil.generateUUID();
        let newStory = new LibraryStory(game, 0, 0, storyId, "Untitled", this._defaultStoryImage);
        this._library.addStory(newStory);
        console.log('added');
        this.saveToLocalStorage();
        this.loadStories();
        this.showLibrary();
    }
    
    loadStories() {
        var that = this;
        let stories = this._library.stories;
        this._frameData = {};
        if (stories) {
            _.each(stories, function(story) {
                if (story) {
                    let imgDataURI = story.imageData || that._defaultStoryImage;
                    if (imgDataURI != undefined) {
                        let storyImage = new Image();
                        storyImage.src = imgDataURI;
                        game.cache.addImage(story.storyId, imgDataURI, storyImage);
                        that._frameData[story.storyId] = { image_data: imgDataURI };
                    }
                }
            });

        }

    }

    showLibrary() {
        var that = this;
        if (this._libraryGrid) {
            this._display.remove(this._libraryGrid, true);
        }

        this._libraryGrid = new ButtonGrid(game, 'library', game.width, game.height - 50, 4, 3, true, function(tab, storyId) {
            //transit to next state with storyId
            _.each(this._library.stories, function(story) {
                if (story.storyId === storyId) {
                    that._curStory = story;
                    that.game.state.start('StoryBuilderSelectStoryState', true, false, that._curStory.storyId, that._curStory.imageData);
                }
            });

        }, this, this._frameData);
        this._libraryGrid.buttons = Object.keys(this._frameData);
        this._libraryGrid.x = 0;
        this._libraryGrid.y = this._consoleBar.consoleBarHeight();
        this._display.add(this._libraryGrid);

    }

    createNewStory() {

    }

    saveToLocalStorage() {
        localStorage.setItem("library", JSON.stringify(this._library));
    }
    shutdown() {
    }
}
LibraryState.DEFAULT_STORY_COVER_KEY = 'story_cover';
LibraryState.DEFAULT_PAGE_COVER_KEY = 'page_cover';
LibraryState.LIBRARY_KEY = "library";
LibraryState.EDIT_BUTTON = 'edit.png';