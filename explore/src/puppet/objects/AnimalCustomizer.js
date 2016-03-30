import Puppet from '../objects/Puppet.js';
import Animal from '../objects/Animal.js';
import Limb from '../objects/Limb.js';
import Shape from '../objects/Shape.js';
import Sprite from './Sprite.js';
import JsonUtil from '../objects/JsonUtil.js';
import TabView from '../objects/TabView.js';
import ButtonGrid from '../objects/ButtonGrid.js';
import PuppetInputHandler from '../objects/PuppetInputHandler.js';

export default class AnimalCustomizer extends Phaser.Group {
    constructor(game, width, height, puppet, callback, callbackContext) {
        super(game);
        
        let back = this.add(new Phaser.Graphics(game, 0, 0));
        back.beginFill(0xDDDDDD);
        // back.alpha = 1;
        back.drawRect(0, 0, width, height);
        back.endFill();
        
        this.puppet = puppet;
        this.callback = callback;
        this.callbackContext = callbackContext;
        if(this.puppet == null) {
            this.puppet = Animal.buildDefault(game, new PuppetInputHandler());
        }
        this.add(this.puppet);
        this.puppet.x = 3 * width / 4;
        this.puppet.y = 500;
        this.puppet.bodyColor = 0xF1BD78;
        let dressChoices = game.cache.getJSON('puppet/accessorize');
        let menuAccessorize = game.cache.getJSON('puppet/menu_accessorize');
        let chooser = this.add(new TabView(game, 'puppet/chooser', width / 2, height, 10, 100, 5, 3, true, function(accType, accName) {
            if (accType == "hairColor_chooser") {
                 this.puppet.bodyColor = parseInt(accName, 16);
                 this.puppet.head.getAccessory('hair').tint = parseInt(accName, 16);
                 this.puppet.head.getAccessory('leftear').tint = parseInt(accName, 16);
                 this.puppet.head.getAccessory('rightear').tint = parseInt(accName, 16);
               // this.puppet.blinkAct();
                //  this.puppet.smileAct();
                //  this.puppet.sadAct();
            // } else if (accType == "hairColor_chooser") {
            //     if (this.puppet.head.getAccessory('Hair')) {
            //         this.puppet.head.getAccessory('Hair').tint = parseInt(accName, 16);
            //     }
              
            } else {
                let acc = dressChoices[accType][accName];
                for (var key in acc) {
                    if (acc.hasOwnProperty(key)) {
                        let element = acc[key];
                        this.puppet['set' + key](element.key, element.frame, element.anchorX, element.anchorY, element.offsetX, element.offsetY, element.offsetInPixelX, element.offsetInPixelY);
                    }
                }
            }
        },this, menuAccessorize));
        

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
        
        this.add(new Phaser.Button(game, this.width - 50, 20, 'scene/icons', function() {
            this.removeChild(this.puppet);
            this.destroy();
            this.callback.call(this.callbackContext, this.puppet);
        }, this, 'ic_done_black_24dp_1x.png', 'ic_done_black_24dp_1x.png', 'ic_done_black_24dp_1x.png', 'ic_done_black_24dp_1x.png'));
    }

}