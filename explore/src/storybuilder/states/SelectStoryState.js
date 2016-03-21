import Util from '../../scene/objects/Util.js';
import StoryUtil from '../objects/StoryUtil.js';
import Story from '../objects/Story.js';


export default class SelectStoryState extends Phaser.State {
    init(storyId, imageData) {
        this._currentStoryId = storyId;
        this._defaultImageData = imageData;
    }

    preload() {        
        this.load.image('storybuilder/home_button','assets/storyBuilder/home_button.png');
        //load story id JSON
        let jsonFile = "assets/storyBuilder/" + this._currentStoryId + ".json";
        console.log("loading story JSON:" + jsonFile);
        this.load.json(this._currentStoryId, jsonFile);
        this._imageKey = this._currentStoryId+"_image";
        
        //load default imagedata to construct image to display
        let imgDataURI = this._defaultImageData;
        let storyImage = new Image();
        storyImage.src = imgDataURI;
        this.game.cache.addImage(this._imageKey , imgDataURI, storyImage);                
    }

    create() {
        
        //check if JSON successfully loaded for given _currentStoryId
        let storyJSON = this.cache.getJSON(this._currentStoryId);
        if(storyJSON) {
            this._currentStory = JSON.parse(JSON.stringify(storyJSON), StoryUtil.revive);
        } else {
            //create Brand New Story
            //constructor(game, x, y, storyId, title, imageData) {
            let newStory = new Story(game, 0, 0, this._currentStoryId, SelectStoryState.TITLE, this._defaultImageData);
            this._currentStory = newStory;
        }

        //create UI to display Story details
        let displayGroup = this.game.add.group();
                
        //create UI
        let homeButton = this.game.add.sprite(this.game.width - 40, 40, 'storybuilder/home_button');
        homeButton.anchor.setTo(0.5);
        homeButton.inputEnabled = true;
        homeButton.events.onInputDown.add(this.navigateToLibrary, this);
        
        let imageKey = this._currentStoryId+"_image";
        let imageSuccessfullyLoaded = this.game.cache.checkImageKey(imageKey);
        console.log("imageSuccessfullyLoaded:" + imageSuccessfullyLoaded);
        let storyMainImage = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, this._imageKey);
        storyMainImage.inputEnabled = true;
        storyMainImage.events.onInputDown.add(this.onDown, this);
        storyMainImage.anchor.setTo(0.5, 0.5);
        displayGroup.add(storyMainImage);   
        
        
        let playStoryButton = this.game.add.button(game.width * 3/4, game.height / 2, 'scene/icons', this.panRight, this, 'ic_navigate_next_black_24dp_1x.png', 'ic_navigate_next_black_24dp_1x.png', 'ic_navigate_next_black_24dp_1x.png', 'ic_navigate_next_black_24dp_1x.png');
        displayGroup.add(playStoryButton);
        playStoryButton.fixedToCamera = true;
        playStoryButton.inputEnabled = true;
        playStoryButton.input.useHandCursor = true;
        playStoryButton.events.onInputDown.add(this.editStory, this);
        

        let editStoryButton = this.game.add.button(game.width/4, game.height / 2, 'scene/icons', this.panLeft, this, 'ic_navigate_before_black_24dp_1x.png', 'ic_navigate_before_black_24dp_1x.png', 'ic_navigate_before_black_24dp_1x.png', 'ic_navigate_before_black_24dp_1x.png');
        displayGroup.add(editStoryButton);
        editStoryButton.fixedToCamera = true;
        editStoryButton.inputEnabled = true;
        editStoryButton.input.useHandCursor = true;
        editStoryButton.events.onInputDown.add(this.editStory, this);
                     
        //save story into localStorage
        let json = JSON.stringify(this._currentStory, StoryUtil.replacer);
        console.log('json:' + json);
        localStorage.setItem(this._currentStoryId, json);
    }
    navigateToLibrary() {
        this.game.state.start('StoryBuilderLibraryState');
    }
    
    editStory() {
        //this.game.state.start('StoryEditStoryPagesState', true, false, JSON.stringify(this._currentStory));
        this.game.state.start('StoryEditStoryPagesState', true, false, this._currentStoryId);
    }
 
    onDown() {
        this.game.state.start('StoryBuilderLibraryState');
    }
    
    shutdown() {
        this.game.world.remove(this._currentStory);
    }
}

SelectStoryState.TITLE = "Untitled";