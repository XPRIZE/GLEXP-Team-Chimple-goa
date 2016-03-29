import Popup from './Popup.js';
import ButtonGrid from '../puppet/objects/ButtonGrid.js';

export default class ConfirmPopup extends Phaser.Group {
    constructor(game, priorityID) {
        super(game);
        
        this.fuzzyBackground = this.add(new Phaser.Graphics(game));
        this.fuzzyBackground.beginFill(0x222222, 0.8);
        this.fuzzyBackground.drawRect(0, 0, game.width, game.height);
        this.fuzzyBackground.inputEnabled = true;
        this.fuzzyBackground.input.priorityID = priorityID;
        this.fuzzyBackground.events.onInputDown.add(this.handleClick, this);
        this.game.add.existing(this);
        
        let prompt = this.add(new Phaser.Graphics(this.game, this.game.width / 2 - 100, this.game.height / 2 - 100));
        prompt.beginFill(0x136662);
        prompt.drawRoundedRect(0, 0, 200, 200, 5);
        prompt.inputEnabled = true;
        // prompt.input.priorityID = priorityID + 1;
        // prompt.events.onInputDown.add(this.handlePromptClick, this);
        
        this.buttons = prompt.addChild(new ButtonGrid(game, 'scene/icons', 200, 100, 1, 2, true, this.handlePromptClick, this, null));
        this.buttons.priorityID = priorityID;
        this.buttons.buttons = ['ic_done_black_24dp_1x.png', 'ic_cancel_black_24dp_1x.png']
        
    }
    
    handleClick(sprite, pointer) {
        console.log('test');
    }
    
    handlePromptClick(tabName, buttonName) {
        if(buttonName == this.buttons.buttons[0]) {
            this.parent.parent.remove(this.parent, true);
        } else if(buttonName == this.buttons.buttons[1]) {
            this.parent.remove(this, true);
        }
    }
    
}