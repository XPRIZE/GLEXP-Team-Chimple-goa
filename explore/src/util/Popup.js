import ConfirmPopup from './ConfirmPopup.js';
import MiscUtil from './MiscUtil.js';

export default class Popup extends Phaser.Group {
    constructor(game) {
        super(game);
        this.fuzzyBackground = this.add(new Phaser.Graphics(game));
        this.fuzzyBackground.beginFill(0x222222, 0.8);
        this.fuzzyBackground.drawRect(0, 0, game.width, game.height);
        this.fuzzyBackground.inputEnabled = true;
        // this.fuzzyBackground.input.priorityID = priorityID;
        this.beginPriorityID = MiscUtil.getMaxPriorityID(game);
        this.beginMinPriorityID = this.game.input.minPriorityID;
        MiscUtil.setPriorityID(this.fuzzyBackground);
        this.fuzzyBackground.events.onInputDown.add(this.handleClick, this);
        this.game.add.existing(this);
        this.game.input.minPriorityID = MiscUtil.getMaxPriorityID(game);
        this.onDestroy.add(this.callOnDestroy, this);        
    }
    
    callOnDestroy() {
            this.game.input.minPriorityID = this.beginMinPriorityID;
            MiscUtil.resetPriorityID(this, this.beginPriorityID);        
    }
    
    
    addContent(displayObject) {
        let rect = displayObject.getBounds();
        this.fuzzyBackground.addChild(displayObject);
        displayObject.x = (this.game.width - rect.x - rect.width) / 2;
        displayObject.y = (this.game.height - rect.y - rect.height) / 2;
        // displayObject.onDestroy.add(this.callOnDestroy, this);                
        return displayObject;
    }
    
    handleClick(sprite, pointer) {
        this.add(new ConfirmPopup(this.game));
    }
    
}