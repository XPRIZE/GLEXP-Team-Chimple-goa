import JsonUtil from '../../puppet/objects/JsonUtil.js';
import Story from '../objects/Story.js';
import ConsoleBar from '../../util/ConsoleBar.js';

export default class SelectStoryState extends Phaser.State {
    init(storyId, imageData) {
        this._currentStoryId = storyId;
        this._defaultImageData = imageData;
    }

    preload() {

        //load UI buttons
        this.load.image('storybuilder/home_button', 'assets/storyBuilder/home_button.png');

        //load story id JSON
        let jsonFile = "assets/storyBuilder/" + this._currentStoryId + ".json";

        this.load.json(this._currentStoryId, jsonFile);
        this._imageKey = this._currentStoryId;

        //load default imagedata to construct image to display        
        let storyImage = new Image();
        storyImage.src = this._defaultImageData;
        this.game.cache.addImage(this._imageKey, this._defaultImageData, storyImage);

        this._consoleBar = new ConsoleBar(this.game);
        this._consoleBar.createRightButtonGrid([SelectStoryState.HOME_BUTTON, SelectStoryState.EDIT_BUTTON, SelectStoryState.PLAY_BUTTON], this.selectNavigation, this);

        this.game.add.existing(this._consoleBar);

    }


    loadJSONForStory(currentStoryId) {
        //Check if json for current story exists in localstorage
        let storyJSON = null;

        let storyJSONInLocalStorage = localStorage.getItem(currentStoryId);

        if (storyJSONInLocalStorage) {
            storyJSON = storyJSONInLocalStorage;
        } else {
            let cachedJSON = this.cache.getJSON(this._currentStoryId);
            if (cachedJSON) {
                storyJSON = JSON.stringify(cachedJSON);
            }
        }
        return storyJSON;
    }

    create() {


        let storyJSON = this.loadJSONForStory(this._currentStoryId);


        if (storyJSON) {
            this._currentStory = JSON.parse(storyJSON);
        } else {
            //create Brand New Story
            let newStory = new Story(game, 0, 0, this._currentStoryId, SelectStoryState.TITLE, this._defaultImageData);
            this._currentStory = newStory;
        }

        //create UI to display Story details
        let displayGroup = this.game.add.group();


        let imageSuccessfullyLoaded = this.game.cache.checkImageKey(this._imageKey);
        console.log("imageSuccessfullyLoaded:" + imageSuccessfullyLoaded);
        let storyMainImage = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, this._imageKey);
        storyMainImage.inputEnabled = false;
        storyMainImage.anchor.setTo(0.5, 0.5);
        storyMainImage.width = 500;
        storyMainImage.height = 500;
        displayGroup.add(storyMainImage);

        //save story into localStorage
        try {
            //remove image data
            this._currentStory.imageData = null;
            localStorage.setItem(this._currentStoryId, JSON.stringify(this._currentStory, JsonUtil.replacer));
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
    selectNavigation(tab, name) {
        if (name === SelectStoryState.HOME_BUTTON) {
            this.navigateToLibrary();
        } else if (name === SelectStoryState.EDIT_BUTTON) {
            this.editStory();
        } else if (name === SelectStoryState.PLAY_BUTTON) {
            if (this._currentStory.storyPages && this._currentStory.storyPages.length > 0) {
                let currentPage = this._currentStory.storyPages[0];
                this.game.state.start('StoryConstructNewStoryPageState', true, false, true, this._currentStoryId, currentPage.pageId);
            }
        }

    }
    navigateToLibrary() {
        this.game.state.start('StoryBuilderLibraryState');
    }

    editStory() {
        this.game.state.start('StoryEditStoryPagesState', true, false, this._currentStoryId);
    }

    shutdown() {
    }
}

SelectStoryState.TITLE = "Untitled";

SelectStoryState.EDIT_BUTTON = 'edit.png';
SelectStoryState.PLAY_BUTTON = 'play.png';
SelectStoryState.HOME_BUTTON = 'home.png';
SelectStoryState.huesoURI = 'data:image/jpeg;base64,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';