import ButtonGrid from '../puppet/objects/ButtonGrid.js';
import PuppetCustomizer from '../puppet/objects/PuppetCustomizer.js';
import Popup from './Popup.js';

export default class ConsoleBar extends Phaser.Group {
    constructor(game) {
        super(game);
        this.unitHeight = 36;
        this.unitWidth = 36;
        this.padding = 5;
        this.buttonsPerGrid = 6;

        // let gridWidth = this.buttonsPerGrid*(this.unitWidth+this.padding)+this.padding;
        let gridWidth = 400;
        let gridHeight = this.unitHeight+2*this.padding;

        let backBar = this.addChild(new Phaser.Graphics(game, 0, 0));
        backBar.beginFill(0x136662);
        backBar.drawRect(0, 0, game.width, gridHeight);
        backBar.endFill();
        
        this.leftButtonGrid = this.addChild(new ButtonGrid(game, 'scene/icons', gridWidth, gridHeight , 1, this.buttonsPerGrid, true, this.leftCallback, this, null, {iconType: 'round'}));
        this.leftButtonGrid.buttons = ['Animation.png', 'Animation_onclick.png', 'HairTransparent.png', 'Eyes.png', 'Face_shape.png', 'Glasses.png'];

        this.infoBar = this.addChild(new Phaser.Graphics(game, gridWidth, 0));
        this.infoBar.beginFill(0x25878A);
        this.infoBar.drawCircle(this.unitHeight / 2 + 3, this.unitHeight / 2 + this.padding, this.unitHeight + 6);
        this.infoBar.drawRect(this.unitHeight / 2 + 3, 2, game.width - 2 * gridWidth - this.unitHeight - 6, this.unitHeight + 6);
        this.infoBar.drawCircle(game.width - 2 * gridWidth - this.unitHeight / 2 - 3, this.unitHeight / 2 + this.padding, this.unitHeight + 6);
        this.infoBar.endFill();
         
        this.midLeftButtonGrid = this.addChild(new ButtonGrid(game, 'scene/icons', this.unitHeight + this.padding * 2, this.unitHeight + this.padding * 2, 1, 1, true, this.midCallback, this));
        this.midLeftButtonGrid.buttons = ['Animation.png'];
        this.midLeftButtonGrid.x = gridWidth;

        this.text = new Phaser.Text(game, this.infoBar.width / 2, this.unitHeight / 2 + this.padding, "Hello World", { fill: '#FFFFFF', fontSize: '36px', boundsAlignV: 'middle' });
        this.text.anchor.setTo(0.5, 0.5);
        this.infoBar.addChild(this.text);
         
        this.rightButtonGrid = this.addChild(new ButtonGrid(game, 'scene/icons', gridWidth, gridHeight, 1, this.buttonsPerGrid, true, this.rightCallback, this));
        this.rightButtonGrid.x = game.width - gridWidth;

        this.fixedToCamera = true;

    }

    createRightButtonGrid(buttons, callback, callbackContext) {
        let gridWidth = this.buttonsPerGrid * (this.unitWidth + this.padding) + this.padding;
        let gridHeight = this.unitHeight + 2 * this.padding;

        this.removeChild(this.rightButtonGrid);

        this.rightButtonGrid = this.addChild(new ButtonGrid(game, 'scene/icons', gridWidth, gridHeight, 1, buttons.length, true, callback, callbackContext));
        this.rightButtonGrid.x = game.width - gridWidth;
        this.rightButtonGrid.buttons = buttons;

    }

    set text(val) {
        this._text = val;
    }

    get text() {
        return this._text;
    }
    
    leftCallback(tabName, buttonName) {
        if(buttonName == this.leftButtonGrid.buttons[0]) { //back
            this.popup = new Popup(this.game, 6);
            let pc = new PuppetCustomizer(this.game, this.game.width * 0.9, this.game.height * 0.9, this.avatar, this.addAvatar, this, 7);
            this.popup.addContent(pc);
            
        } else if(buttonName == this.leftButtonGrid.buttons[1]) { //home
            
        } else if(buttonName == this.leftButtonGrid.buttons[2]) { //My house
            
        } else if(buttonName == this.leftButtonGrid.buttons[3]) { //My avatar
            
        } else if(buttonName == this.leftButtonGrid.buttons[4]) { //My pets
            
        } else if(buttonName == this.leftButtonGrid.buttons[5]) { //Coins
            
        }    

        this.leftButtonGrid.updateButtonImage(buttonName, 'scene/icons', 'Caps.png');
    }
    
    addAvatar(avatar) {
        if(!this.avatar) {
            this.avatar = avatar;
        }
        this.popup.destroy();
    }

    midCallback(tabName, buttonName) {
        if(buttonName == 'Animation.png') {
            
        }    
        this.leftButtonGrid.updateButtonImage(buttonName, 'scene/icons', 'Caps.png');
    }

    rightCallback(tabName, buttonName) {
        if(buttonName == 'Animation.png') {
            
        }    
        this.leftButtonGrid.updateButtonImage(buttonName, 'scene/icons', 'Caps.png');

    }

    consoleBarHeight () {
        return this.unitHeight + 2 * this.padding;
    }
}
