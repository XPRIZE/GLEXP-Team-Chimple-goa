export default class ButtonGrid extends Phaser.Group {
    //TODO: Swipe also selects button based on where you click
    
    constructor(game, name, width, height, numRows, numColumns, horizontal, callback, callbackContext, frameData) {
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
        if(frameData) this.frameData = frameData;

        let mask = this.add(new Phaser.Graphics(this.game, 0, 0));
        mask.beginFill(0x000000);
        mask.alpha = 0;
        mask.drawRect(0, 0, width, height);
        mask.endFill();
        this.mask = mask;

        this.buttonPanel = new Phaser.Group(this.game, this);
        this.tweenScroll = this.game.add.tween(this.buttonPanel);

        var Swipe = require('phaser-swipe');
        this.swipe = new Swipe(this.game, this);

    }

    set buttons(buttons) {
        this.buttonPanel.removeAll(true);
        this.buttonPanel.x = 0;
        this._buttons = buttons;

        let numAlong = this.horizontal ? this.numRows : this.numColumns;
        let numAcross = Math.ceil(buttons.length / numAlong);

        let maxButtonWidth = this.elementWidth / this.numColumns - 2 * this.padding;
        let maxButtonHeight = this.elementHeight / this.numRows - 2 * this.padding;

        let index = 0;
        for (var i = 0; i < numAcross; i++) {
            for (var j = 0; j < numAlong; j++) {
                if (index >= buttons.length) {
                    return;
                }
                let layoutX = (maxButtonWidth + this.padding * 2) * (this.horizontal ? i : j) + this.padding + maxButtonWidth / 2;
                let layoutY = (maxButtonHeight + this.padding * 2) * (this.horizontal ? j : i) + this.padding + maxButtonHeight / 2;
                let key = this.name;
                let frame = buttons[index];
                if(this.frameData && this.frameData[frame]) {
                    let info = this.frameData[frame];
                    key = info.key;
                    frame = info.frame;
                }
                let button = this.buttonPanel.add(new Phaser.Button(this.game, layoutX, layoutY, 'misc/theme', this.callSelectButton, this, 'button_over.png', 'button_up.png', 'button_down.png', 'button_up.png'));
                button.name = buttons[index];
                button.scale.multiply(maxButtonWidth / button.width, maxButtonHeight / button.height);
                button.anchor.setTo(0.5, 0.5);
                let buttonImage = new Phaser.Sprite(this.game, layoutX, layoutY, key, frame);
                buttonImage.anchor.setTo(0.5, 0.5);
                let buttonScale = Math.min(maxButtonWidth / buttonImage.width, maxButtonHeight / buttonImage.height, 1);
                buttonImage.scale.multiply(buttonScale, buttonScale);
                this.buttonPanel.addChild(buttonImage);
                index++;
            }
        }
    }

    getButton(name) {
        let button = null;
        this.buttonPanel.forEach(function(child) { if (child.name == name) { button = child } }, this);
        return button;
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
        if(this.selectedButton) {
            this.selectedButton.freezeFrames = false;
            this.selectedButton.changeStateFrame('Out');
            this.selectedButton = null;
        }
    }

    callSelectButton(button, pointer) {
        this.selectButton(button);
        if (this.buttonCallback) {
            this.buttonCallback.call(this.buttonCallbackContext, this.parent.tabView.selectedButton.name, button.name);
        }
    }

    update() {
        if (this.swipe) {
            this.swipe.check();
        }
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