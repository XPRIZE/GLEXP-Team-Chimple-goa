import RoundButton from './RoundButton.js';
import TabButton from './TabButton.js';
import PuppetCustomizer from './PuppetCustomizer.js';
import TabView from './TabView.js';

export default class ButtonGrid extends Phaser.Group {
    //TODO: Swipe also selects button based on where you click

    constructor(game, name, width, height, numRows, numColumns, horizontal, callback, callbackContext, frameData, style) {
        super(game);
        this.name = name;
        this.elementWidth = width;
        this.elementHeight = height;
        this.numRows = numRows;
        this.numColumns = numColumns;
        this.padding = ButtonGrid.DEFAULT_PADDING;
        this.buttonCallback = callback;
        this.buttonCallbackContext = callbackContext;
        this.horizontal = horizontal;
        if (frameData) this.frameData = frameData;

        if(!style) {
            style = {};
        }
        if(!style.overFillColor) {
            style.overFillColor = 0x25878A;            
        }
        if(!style.upFillColor) {
            style.upFillColor = 0x32A9B4;            
        }
        if(!style.downFillColor) {
            style.downFillColor = 0x136662;            
        }
        if(!style.buttonType) {
            style.buttonType = 'round';            
        }
        if(!style.iconType) {
            style.iconType = 'square';            
        }
        
        
        let color = Phaser.Color.getRGB(style.overFillColor);
        style.overFillStyle = 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')'   

        color = Phaser.Color.getRGB(style.upFillColor);
        style.upFillStyle = 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')'   

        color = Phaser.Color.getRGB(style.downFillColor);
        style.downFillStyle = 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')'   

        this.style = style;

        let mask = new Phaser.Graphics(this.game, 0, 0);
        // mask.alpha = 0;
        mask.beginFill(0x000000);
        mask.drawRect(0, 0, width, height);
        mask.endFill();
        this.buttonMask = mask;

        this.buttonPanel = new Phaser.Group(this.game, this);
        this.buttonPanel.addChild(this.buttonMask);
        // let background = this.add(new Phaser.Graphics(this.game, 0, 0));
        // background.beginFill(this.style.overFillColor);
        // background.drawRect(0, 0, width, height);
        // background.endFill();

        this.tweenScroll = this.game.add.tween(this.buttonPanel);

        var Swipe = require('phaser-swipe');
        this.swipe = new Swipe(this.game, this);
        
        this.priorityID = 5;

    }
    
    set buttons(buttons) {
        // this.buttonPanel.removeAll(true);
        this.buttonPanel.x = 0;
        this._buttons = buttons;

        let numAlong = this.horizontal ? this.numRows : this.numColumns;
        let numAcross = Math.ceil(buttons.length / numAlong);

        let maxButtonWidth = (this.elementWidth - this.padding) / this.numColumns - this.padding;
        let maxButtonHeight = (this.elementHeight - this.padding) / this.numRows - this.padding;

        let index = 0;
        for (var i = 0; i < numAlong; i++) {
            for (var j = 0; j < numAcross; j++) {
                if (index >= buttons.length) {
                    return;
                }
                let layoutX = (maxButtonWidth + this.padding) * (this.horizontal ? j : i) + this.padding + maxButtonWidth / 2;
                let layoutY = (maxButtonHeight + this.padding) * (this.horizontal ? i : j) + this.padding + maxButtonHeight / 2;

                if(this.style.buttonType == 'tab') {
                    let button = new TabButton(this.game, layoutX, layoutY, maxButtonWidth, maxButtonHeight, this.name, buttons[index], this.callSelectButton, this, this.frameData, this.style, this.priorityID);
                    
                    this.buttonPanel.add(button);
                    button.mask = this.buttonMask;
                    button.mask.dirty = true;
                } else {
                    let button = new RoundButton(this.game, layoutX, layoutY, maxButtonWidth, maxButtonHeight, this.name, buttons[index], this.callSelectButton, this, this.frameData, this.style, this.priorityID);
                    this.buttonPanel.add(button);   
                    button.mask = this.buttonMask;
                    button.mask.dirty = true;                    
                }
                index++;
            }
        }
        // this.buttonPanel.mask.dirty = true;
        // this.mask.dirty = true;
    }

    get buttons() {
        return this._buttons;
    }

    addButton(buttonName, key, frame, image_data) {
        let buttons = this._buttons;
        buttons.push(buttonName);
        if (key && frame) {
            this.frameData[buttonName] = { key: frame };
        } else {
            this.frameData[buttonName] = { "image_data": image_data };
        }
        this.buttons = buttons;
    }

    getButton(name) {
        let button = null;
        this.buttonPanel.forEach(function(child) { if (child.name == name) { button = child } }, this);
        return button;
    }

    updateButtonImage(name, key, frame) {
        let button = this.getButton(name);
        if(button) {
            button.updateImage(key, frame);
        }
    }

    selectButtonByName(name) {
        this.selectButton(this.getButton(name));
    }

    selectButton(button) {
        this.unSelect();
        this.selectedButton = button;
        button.changeStateFrame('Down');
        button.freezeFrames = true;
    }

    unSelect() {
        if (this.selectedButton) {
            this.selectedButton.freezeFrames = false;
            this.selectedButton.changeStateFrame('Out');
            this.selectedButton = null;
        }
    }

    callSelectButton(button, pointer) {
        this.selectButton(button);
        if (this.buttonCallback) {
            let tabName = "";
            if (this.parent && this.parent.tabView && this.parent.tabView.selectedButton) {
                tabName = this.parent.tabView.selectedButton.name;
            }
            this.buttonCallback.call(this.buttonCallbackContext, tabName, button.name);
        }
    }

    set priorityID(number) {
        this._priorityID = number;
    }
    
    get priorityID() {
        return this._priorityID;
    }

    preUpdate() {
        this.buttonMask.dirty = true;        
    }
    
    update() {
        if (this.swipe) {
            this.swipe.check();
        }
        // Phaser has bugs if mask is added to a group. So track it from top position
        if(this.parent instanceof TabView) {
            console.log('yes');
        }
        this.buttonMask.dirty = true;
        // this.mask.position = this.toGlobal(new Phaser.Point(this.buttonPanel.x, this.buttonPanel.y));
    }

    left(point) {
        if (this.horizontal && this.pointLiesInside(point) && this.buttonPanel.x + this.buttonPanel.width >= this.elementWidth && !this.tweenScroll.isRunning) {
            // this.buttonPanel.x -= this.elementWidth;
            this.game.tweens.remove(this.tweenScroll);
            this.tweenScroll = this.game.add.tween(this.buttonPanel).to({
                x: this.buttonPanel.x - this.elementWidth
            }, 1000, Phaser.Easing.Quartic.Out, true);
        }
    }

    right(point) {
        if (this.horizontal && this.pointLiesInside(point) && this.buttonPanel.x + this.elementWidth <= 0 && !this.tweenScroll.isRunning) {
            this.game.tweens.remove(this.tweenScroll);
            this.tweenScroll = this.game.add.tween(this.buttonPanel).to({
                x: this.buttonPanel.x + this.elementWidth
            }, 1000, Phaser.Easing.Quartic.Out, true);
        }
    }

    up(point) {
        if (!this.horizontal && this.pointLiesInside(point) && this.buttonPanel.y + this.buttonPanel.height >= this.elementHeight) {
            this.game.tweens.remove(this.tweenScroll);
            this.tweenScroll = this.game.add.tween(this.buttonPanel).to({
                y: this.buttonPanel.y - this.elementHeight
            }, 1000, Phaser.Easing.Quartic.Out, true);
        }
    }

    down(point) {
        if (!this.horizontal && this.pointLiesInside(point) && this.buttonPanel.y + this.elementHeight <= 0) {
            this.game.tweens.remove(this.tweenScroll);
            this.tweenScroll = this.game.add.tween(this.buttonPanel).to({
                y: this.buttonPanel.y + this.elementHeight
            }, 1000, Phaser.Easing.Quartic.Out, true);

        }
    }

    pointLiesInside(point) {
        let p = this.toLocal(point);
        return p.x >= this.x && p.x < this.x + this.elementWidth && p.y >= this.y && p.y < this.y + this.elementHeight
    }
}

ButtonGrid.DEFAULT_PADDING = 5;