export default class Chooser extends Phaser.Group {
    constructor(game, name, width, height, layout) {
        super(game);
        this.name = name;
        this.chooserWidth = width;
        this.chooserHeight = height;
        this.layout = layout || Chooser.LAYOUT_HORIZONTAL;
        this.padding = Chooser.DEFAULT_PADDING;
    }
    
    set buttons(buttons) {
        this._buttons = buttons;
        let numberOfButtons = buttons.size;
        let totalLength = (this.layout == Chooser.LAYOUT_VERTICAL) ? this.chooserHeight : this.chooserWidth;
        let maxButtonLength = (totalLength - ((numberOfButtons + 1) * this.padding )) / numberOfButtons;
        // for (var index = 0; index < numberOfButtons; index++) {
        let index = 0;
        for (let [key, value] of buttons) {    
            let layoutX = (maxButtonLength + this.padding) * index + this.padding + maxButtonLength / 2;
            let layoutY = this.padding + maxButtonLength / 2;
            if(this.layout == Chooser.LAYOUT_VERTICAL) {
                let temp = layoutX;
                layoutX = layoutY;
                layoutY = temp;
            }
            let button = this.add(new Phaser.Button(this.game, layoutX, layoutY, this.name, this.testCallback, this, key+'.png', key+'_up.png', key+'.png', key+'_up.png'));
            if(button.width > button.height) {
                button.scale.multiply(maxButtonLength / button.width, maxButtonLength / button.width);            
            } else {
                button.scale.multiply(maxButtonLength / button.height, maxButtonLength / button.height);                
            }
            button.anchor.setTo(0.5, 0.5);
            index++;
        }
    }
    
    testCallback(button, pointer) {
        console.log(arguments);
    }
}

Chooser.DEFAULT_PADDING = 5; 
Chooser.LAYOUT_VERTICAL = 1;
Chooser.LAYOUT_HORIZONTAL = 2;