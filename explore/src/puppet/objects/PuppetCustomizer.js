import Puppet from '../objects/Puppet.js';
import Human from '../objects/Human.js';
import Limb from '../objects/Limb.js';
import Shape from '../objects/Shape.js';
import Sprite from './Sprite.js';
import JsonUtil from '../objects/JsonUtil.js';
import TabView from '../objects/TabView.js';
import ButtonGrid from '../objects/ButtonGrid.js';
import PuppetInputHandler from '../objects/PuppetInputHandler.js';
import MiscUtil from '../../util/MiscUtil.js';

export default class PuppetCustomizer extends Phaser.Group {
    constructor(game, width, height, puppet, callback, callbackContext, priorityID) {
        super(game);
                
        this.priorityID = priorityID || 0;
        this.puppet = puppet;
        this.callback = callback;
        this.callbackContext = callbackContext;
        let dressChoices = game.cache.getJSON('puppet/accessorize');
        let menuAccessorize = game.cache.getJSON('puppet/menu_accessorize');
        let chooser = this.add(new TabView(game, 'scene/icons', width * 5/8, height, 16, 58, 5, 3, true, function(accType, accName) {
            if (accType == "skinColor_chooser") {
                this.puppet.bodyColor = parseInt(accName, 16);
                //  this.puppet.blinkAct();
                //  this.puppet.smileAct();
                //  this.puppet.sadAct();
                //  this.puppet.handshakeAnimate();
                this.puppet.eatAnimate();
            } else if (accType == "hairColor_chooser") {
                if (this.puppet.head.getAccessory('frontHair')) {
                    this.puppet.head.getAccessory('frontHair').tint = parseInt(accName, 16);
                }
                if (this.puppet.head.getAccessory('backHair')) {
                    this.puppet.head.getAccessory('backHair').tint = parseInt(accName, 16);
                }
                if (this.puppet.head.getAccessory('beard')) {
                    this.puppet.head.getAccessory('beard').tint = parseInt(accName, 16);
                }
            } else {
                let acc = dressChoices[accType][accName];
                for (var key in acc) {
                    if (acc.hasOwnProperty(key)) {
                        let element = acc[key];

                        this.puppet['set' + key](element.key, element.frame, element.anchorX, element.anchorY, element.offsetX, element.offsetY, element.offsetInPixelX, element.offsetInPixelY);
                    }
                }
            }
        }, this, menuAccessorize, {displayPrice: true}));
        if(priorityID) {
            chooser.priorityID = priorityID;        
        }

        let dressTabs = {};

        for (var key in dressChoices) {
            if (dressChoices.hasOwnProperty(key)) {
                var element = dressChoices[key];
                dressTabs[key] = Object.keys(element);
            }
        }
        chooser.tabs = dressTabs;
        chooser.x = 0;
        chooser.y = 0;

        let back = this.add(new Phaser.Graphics(game, 0, 0));
        back.beginFill(0xDDDDDD);
        // back.alpha = 1;
        back.drawRect(width * 5/8, 0, width * 3/8, height);
        back.endFill();
        back.inputEnabled = true;
        back.input.priorityID = priorityID + 2;

        if(this.puppet == null) {
            this.puppet = Human.buildDefault(game, new PuppetInputHandler(game, priorityID + 3));
        }
        this.add(this.puppet);
        this.puppetInitialPosition = this.puppet.position.clone();
        this.puppet.x = width * 13/16;
        this.puppet.y = 500;
        this.puppet.bodyColor = 0xF1BD78;
        
        let button = this.add(new Phaser.Button(game, width * 13/16, height - 100, 'scene/icons', function() {
            this.removeChild(this.puppet);
            this.puppet.position = this.puppetInitialPosition;
            this.destroy();
            this.callback.call(this.callbackContext, this.puppet);
        }, this, 'ic_done_black_24dp_1x.png', 'ic_done_black_24dp_1x.png', 'ic_done_black_24dp_1x.png', 'ic_done_black_24dp_1x.png'));
        if(priorityID) {
            // button.input.priorityID = this.priorityID;
            MiscUtil.setPriorityID(button, priorityID + 3);
        }
    }    

}