import Util from '../../scene/objects/Util.js';
import StoryUtil from '../objects/StoryUtil.js';

export default class SelectStoryState extends Phaser.State {
    init(selectedStory) {
        //this._selectedStory = this.game.add.existing(selectedStory);
        this._selectedStory = JSON.parse(selectedStory, StoryUtil.revive);
    }

    preload() {
        //load image data into cache
        let imgDataURI = this._selectedStory.imageData;
        let storyImage = new Image();
        storyImage.src = imgDataURI;
        this.game.cache.addImage(this._selectedStory.storyId, imgDataURI, storyImage);
        this.load.image('storybuilder/home_button','assets/storyBuilder/home_button.png');
    }

    create() {
        //create UI to display Story details
        let display = this.game.add.group();
                
        //create UI
        let homeButton = this.game.add.sprite(this.game.width - 40, 40, 'storybuilder/home_button');
        homeButton.anchor.setTo(0.5);
        homeButton.inputEnabled = true;
        homeButton.events.onInputDown.add(this.navigateToLibrary, this);
        
        let storyMainImage = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, this._selectedStory.storyId);
        storyMainImage.inputEnabled = true;
        storyMainImage.events.onInputDown.add(this.onDown, this);
        storyMainImage.anchor.setTo(0.5, 0.5);
        display.add(storyMainImage);   
        
        
        let playStoryButton = this.game.add.button(game.width * 3/4, game.height / 2, 'scene/icons', this.panRight, this, 'ic_navigate_next_black_24dp_1x.png', 'ic_navigate_next_black_24dp_1x.png', 'ic_navigate_next_black_24dp_1x.png', 'ic_navigate_next_black_24dp_1x.png');
        playStoryButton.fixedToCamera = true;
        playStoryButton.inputEnabled = true;
        playStoryButton.input.useHandCursor = true;
        playStoryButton.events.onInputDown.add(this.editStory, this);
        

        let editStoryButton = this.game.add.button(game.width/4, game.height / 2, 'scene/icons', this.panLeft, this, 'ic_navigate_before_black_24dp_1x.png', 'ic_navigate_before_black_24dp_1x.png', 'ic_navigate_before_black_24dp_1x.png', 'ic_navigate_before_black_24dp_1x.png');
        editStoryButton.fixedToCamera = true;
        editStoryButton.inputEnabled = true;
        editStoryButton.input.useHandCursor = true;
        editStoryButton.events.onInputDown.add(this.editStory, this);
                     
        
    }
    navigateToLibrary() {
        this.game.state.start('StoryBuilderLibraryState');
    }
    
    editStory() {
        this.game.state.start('StoryEditStoryPagesState', true, false, JSON.stringify(this._selectedStory));//JSON.stringify(this._selectedStory)
    }
 
    onDown() {
        this.game.state.start('StoryBuilderLibraryState');
    }
    
    shutdown() {
        //this.game.world.remove(this._selectedStory);
    }
}
