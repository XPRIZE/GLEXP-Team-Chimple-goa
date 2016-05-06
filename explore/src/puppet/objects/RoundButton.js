import MiscUtil from '../../util/MiscUtil.js';

export default class RoundButton extends Phaser.Button {
    constructor(game, x, y, maxButtonWidth, maxButtonHeight, key, frame, callback, callbackContext, frameData, style, priorityID) {
        let buttonLength = Math.min(maxButtonWidth, maxButtonHeight);
        let halfButtonLength = buttonLength / 2;
        let frame1 = new Phaser.Frame(0, 0, 0, buttonLength, buttonLength, 'button_over.png');
        let frame2 = new Phaser.Frame(1, buttonLength + 1, 0, buttonLength, buttonLength, 'button_up.png');
        let frame3 = new Phaser.Frame(2, buttonLength * 2 + 2, 0, buttonLength, buttonLength, 'button_down.png');
        let fd = new Phaser.FrameData();
        fd.addFrame(frame1);
        fd.addFrame(frame2);
        fd.addFrame(frame3);

        let bmd = new Phaser.BitmapData(game, frame, buttonLength * 3 + 3, buttonLength);
        bmd.context.fillStyle = style.overFillStyle;
        bmd.circle(halfButtonLength, halfButtonLength, halfButtonLength);
        bmd.context.fillStyle = style.upFillStyle;
        bmd.circle(buttonLength + halfButtonLength + 1, halfButtonLength, halfButtonLength);
        bmd.context.fillStyle = style.downFillStyle;
        bmd.circle(buttonLength * 2 + halfButtonLength + 2, halfButtonLength, halfButtonLength);

        game.cache.addBitmapData(frame, bmd, fd);

        super(game, x, y, game.cache.getBitmapData(frame), callback, callbackContext, 'button_over.png', 'button_up.png', 'button_down.png', 'button_up.png');

        // this.input.priorityID = priorityID;
        MiscUtil.setPriorityID(this, priorityID);
        
        this.name = frame;
        // this.scale.multiply(maxButtonWidth / this.width, maxButtonHeight / this.height);
        this.anchor.setTo(0.5, 0.5);
        if (frameData && frameData[frame]) {
            let info = frameData[frame];
            if (info.key) {
                key = info.key;
                frame = info.frame;
                if (frame) {
                    // buttonImage = new Phaser.Sprite(game, layoutX, layoutY, key, frame);    
                    this.buttonImage = new Phaser.Sprite(game, 0, 0, key, frame);
                } else {
                    this.buttonImage = new Phaser.Sprite(game, 0, 0, key);
                    //  buttonImage = new Phaser.Sprite(game, layoutX, layoutY, key);
                }
                if(info.price && style.displayPrice) {
                    let price = new Phaser.Text(game, 0, this.buttonImage.height/2, info.price.toString(), { backgroundColor: "#FFFFFF", fill: '#25878A', fontSize: '30px', boundsAlignV: 'middle' }); 
                    price.anchor.setTo(0.5, 0);       
                    this.buttonImage.addChild(price);
                }
                

            } else if (info.image_data) {
                //create sprite from image_data
                // buttonImage = new Phaser.Sprite(game, layoutX, layoutY, frame);
                this.buttonImage = new Phaser.Sprite(game, 0, 0, frame);
            }
        } else {
            // buttonImage = new Phaser.Sprite(game, layoutX, layoutY, key, frame);
            this.buttonImage = new Phaser.Sprite(game, 0, 0, key, frame);
        }
        if (this.buttonImage) {
            this.buttonImage.anchor.setTo(0.5, 0.5);
            let buttonScale = Math.min(buttonLength / this.buttonImage.width, buttonLength / this.buttonImage.height, 1);
            if(style.iconType != 'round') {
                buttonScale = Math.sqrt(buttonScale * buttonScale / 2);            
            }
            this.buttonImage.scale.multiply(buttonScale, buttonScale);
            // buttonPanel.addChild(buttonImage);
            this.addChild(this.buttonImage);
        }
    }
    
    updateImage(key, frame) {
        this.buttonImage.loadTexture(key, frame);
    }
}
