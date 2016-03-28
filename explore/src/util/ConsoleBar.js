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
        
        this.leftButtonGrid = this.addChild(new ButtonGrid(game, 'scene/icons', gridWidth, gridHeight , 1, this.buttonsPerGrid, true, this.standardCallback, this, null, {iconType: 'round'}));
        this.leftButtonGrid.buttons = [ConsoleBar.WORLD_ICON, ConsoleBar.MY_HOUSE_ICON, ConsoleBar.MY_AVATAR_ICON, ConsoleBar.MY_PETS_ICON, ConsoleBar.MY_COINS_ICON, ConsoleBar.STORY_ICON];

        this.infoBar = this.addChild(new Phaser.Graphics(game, gridWidth, 0));
        this.infoBar.beginFill(0x25878A);
        this.infoBar.drawCircle(this.unitHeight / 2 + 3, this.unitHeight / 2 + this.padding, this.unitHeight + 6);
        this.infoBar.drawRect(this.unitHeight / 2 + 3, 2, game.width - 2 * gridWidth - this.unitHeight - 6, this.unitHeight + 6);
        this.infoBar.drawCircle(game.width - 2 * gridWidth - this.unitHeight / 2 - 3, this.unitHeight / 2 + this.padding, this.unitHeight + 6);
        this.infoBar.endFill();
         
        this.midLeftButtonGrid = this.addChild(new ButtonGrid(game, 'scene/icons', this.unitHeight + this.padding * 2, this.unitHeight + this.padding * 2, 1, 1, true, this.standardCallback, this));
        this.midLeftButtonGrid.buttons = [ConsoleBar.SETTINGS_ICON];
        this.midLeftButtonGrid.x = gridWidth;

        this.text = new Phaser.Text(game, this.infoBar.width / 2, this.unitHeight / 2 + this.padding, "Hello World", { fill: '#FFFFFF', fontSize: '36px', boundsAlignV: 'middle' });
        this.text.anchor.setTo(0.5, 0.5);
        this.infoBar.addChild(this.text);

        this.midRightButtonGrid = this.addChild(new ButtonGrid(game, 'scene/icons', this.unitHeight + this.padding * 2, this.unitHeight + this.padding * 2, 1, 1, true, this.standardCallback, this));
        this.midRightButtonGrid.buttons = [ConsoleBar.HELP_ICON];
        this.midRightButtonGrid.x = game.width - gridWidth - this.unitHeight - 2 * this.padding;
         
        this.rightButtonGrid = this.addChild(new ButtonGrid(game, 'scene/icons', gridWidth, gridHeight, 1, this.buttonsPerGrid, true, this.standardCallback, this));
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
    
    standardCallback(tabName, buttonName) {
        if(buttonName == ConsoleBar.WORLD_ICON) { 

        } else if(buttonName == ConsoleBar.MY_AVATAR_ICON) { 
            this.popup = new Popup(this.game, 6);
            let pc = new PuppetCustomizer(this.game, this.game.width * 0.9, this.game.height * 0.9, this.avatar, this.addAvatar, this, 7);
            this.popup.addContent(pc);
                        
        } else if(buttonName == ConsoleBar.MY_HOUSE_ICON) { 
            
        } else if(buttonName == ConsoleBar.MY_PETS_ICON) { 
            
        } else if(buttonName == ConsoleBar.STORY_ICON) { 
            
        } else if(buttonName == ConsoleBar.MY_COINS_ICON) { 
            
        } else if(buttonName == ConsoleBar.HELP_ICON) { 
            
        } else if(buttonName == ConsoleBar.SETTINGS_ICON) { 
            
        }    

    }
    
    addAvatar(avatar) {
        if(!this.avatar) {
            this.avatar = avatar;
        }
        this.popup.destroy();
    }

    consoleBarHeight () {
        return this.unitHeight + 2 * this.padding;
    }
}

ConsoleBar.WORLD_ICON = 'chimpleworld.png';
ConsoleBar.MY_HOUSE_ICON = 'home.png';
ConsoleBar.MY_AVATAR_ICON = 'avatar.png';
ConsoleBar.MY_PETS_ICON = 'mypet.png';
ConsoleBar.MY_COINS_ICON = 'coins.png';
ConsoleBar.STORY_ICON = 'book.png';
ConsoleBar.HELP_ICON = 'help.png';
ConsoleBar.SETTINGS_ICON = 'settings.png';
