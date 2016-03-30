import MiscUtil from '../../util/MiscUtil.js';

export default class TabButton extends Phaser.Button {
    constructor(game, x, y, maxButtonWidth, maxButtonHeight, key, frame, callback, callbackContext, frameData, style, priorityID) {
        let frame1 = new Phaser.Frame(0, 0, 0, maxButtonWidth, maxButtonHeight, 'button_over.png');
        let frame2 = new Phaser.Frame(1, maxButtonWidth + 1, 0, maxButtonWidth, maxButtonHeight, 'button_up.png');
        let frame3 = new Phaser.Frame(2, maxButtonWidth * 2 + 2, 0, maxButtonWidth, maxButtonHeight, 'button_down.png');
        let fd = new Phaser.FrameData();
        fd.addFrame(frame1);
        fd.addFrame(frame2);
        fd.addFrame(frame3);

        let bmd = new Phaser.BitmapData(game, frame, maxButtonWidth * 3 + 3, maxButtonHeight);
        bmd.context.fillStyle = style.overFillStyle;
        bmd.rect(0, 0, maxButtonWidth, maxButtonHeight);
        bmd.context.fillStyle = style.upFillStyle;
        bmd.rect(maxButtonWidth + 1, 0, maxButtonWidth, maxButtonHeight);        
        bmd.context.fillStyle = style.downFillStyle;
        bmd.rect(maxButtonWidth *2 + 2, 0, maxButtonWidth, maxButtonHeight);        

        game.cache.addBitmapData(frame, bmd, fd);

        super(game, x, y, game.cache.getBitmapData(frame), callback, callbackContext, 'button_over.png', 'button_up.png', 'button_down.png', 'button_up.png');

        // this.input.priorityID = priorityID;
        MiscUtil.setPriorityID(this, priorityID);
        this.name = frame;
        this.anchor.setTo(0.5, 0.5);
        let buttonImage = null;
        if (frameData && frameData[frame]) {
            let info = frameData[frame];
            if (info.key) {
                key = info.key;
                frame = info.frame;
                if (frame) {
                    buttonImage = new Phaser.Sprite(game, 0, 0, key, frame);
                } else {
                    buttonImage = new Phaser.Sprite(game, 0, 0, key);
                }

            } else if (info.image_data) {
                //create sprite from image_data
                // buttonImage = new Phaser.Sprite(game, layoutX, layoutY, frame);
                buttonImage = new Phaser.Sprite(game, 0, 0, frame);
            }
        } else {
            // buttonImage = new Phaser.Sprite(game, layoutX, layoutY, key, frame);
            buttonImage = new Phaser.Sprite(game, 0, 0, key, frame);
        }
        if (buttonImage) {
            buttonImage.anchor.setTo(0.5, 0.5);
            let buttonScale = Math.min(maxButtonWidth / buttonImage.width, maxButtonHeight / buttonImage.height, 1);
            buttonScale = Math.sqrt(buttonScale * buttonScale / 2);
            buttonImage.scale.multiply(buttonScale, buttonScale);
            this.addChild(buttonImage);
        }
    }
    
    updateImage(key, frame) {
        this.buttonImage.loadTexture(key, frame);
    }
    
}
