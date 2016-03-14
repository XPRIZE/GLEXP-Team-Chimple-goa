export default class ButtonGrid extends Phaser.Group {
    constructor(game, name, width, height, numRows, numColumns, callback, callbackContext) {
        super(game);
        this.name = name;
        this.elementWidth = width;
        this.elementHeight = height;
        this.numRows = numRows;
        this.numColumns = numColumns;
        this.padding = ButtonGrid.DEFAULT_PADDING;
        this.buttonCallback = callback;
        this.buttonCallbackContext = callbackContext;
    }

    set buttons(buttons) {
        this.removeAll();
        this._buttons = buttons;
        let maxButtonLength = this.elementWidth / this.numColumns - 2 * this.padding;

        let index = 0;
        for(var i = 0; i < this.numRows; i++) {
            for(var j = 0; j < this.numColumns; j++) {
                if(index >= buttons.length) {
                    return;
                }
                let layoutX = (maxButtonLength + this.padding * 2) * j + this.padding;
                let layoutY = (maxButtonLength + this.padding * 2) * i + this.padding;
                let key = buttons[index];
                let button = this.add(new Phaser.Button(this.game, layoutX, layoutY, this.name, this.callSelectButton, this, key+'.png', key+'_up.png', key+'.png', key+'_up.png'));
                button.name = key;
                button.scale.multiply(Math.min(maxButtonLength / button.width, 1), Math.min(maxButtonLength / button.width, 1));
                button.anchor.setTo(0.5, 0.5);
                index++;
            }
        }
    }
    
    getButton(name) {
        let button = null;
        this.forEach(function(child) {if(child.name == name) {button = child}}, this);
        return button;
    }
    
    selectButtonByName(name) {
        this.selectButton(this.getButton(name));
    }
        
    selectButton(button) {
        if(this.selectedButton) {
            this.selectedButton.freezeFrames = false;
            this.selectedButton.changeStateFrame('Out');            
        }
        this.selectedButton = button;
        button.changeStateFrame('Down');
        button.freezeFrames = true;
    }
    
    callSelectButton(button, pointer) {
        this.selectButton(button);
        if(this.buttonCallback) {
            this.buttonCallback.call(this.buttonCallbackContext, this.parent.tabView.selectedButton.name, button.name);
        }
    }

}

ButtonGrid.DEFAULT_PADDING = 5; 
ButtonGrid.LAYOUT_VERTICAL = 1;
ButtonGrid.LAYOUT_HORIZONTAL = 2;