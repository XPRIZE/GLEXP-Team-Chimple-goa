import ConfirmPopup from './ConfirmPopup.js';

export default class Popup extends Phaser.Group {
    constructor(game, priorityID) {
        super(game);
        this.fuzzyBackground = this.add(new Phaser.Graphics(game));
        this.fuzzyBackground.beginFill(0x222222, 0.8);
        this.fuzzyBackground.drawRect(0, 0, game.width, game.height);
        this.fuzzyBackground.inputEnabled = true;
        this.fuzzyBackground.input.priorityID = priorityID;
        this.fuzzyBackground.events.onInputDown.add(this.handleClick, this);
        this.game.add.existing(this);
    }
    
    addContent(displayObject) {
        let rect = displayObject.getBounds();
        this.fuzzyBackground.addChild(displayObject);
        displayObject.x = (this.game.width - rect.width) / 2;
        displayObject.y = (this.game.height - rect.height) / 2;
        return displayObject;
    }
    
    handleClick(sprite, pointer) {
        this.add(new ConfirmPopup(this.game, this.fuzzyBackground.input.priorityID + 1));
    }
    
}