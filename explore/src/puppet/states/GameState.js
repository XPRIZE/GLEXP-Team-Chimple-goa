import Puppet from '../objects/Puppet.js';
import Human from '../objects/Human.js';
import Limb from '../objects/Limb.js';
import Shape from '../objects/Shape.js';
import ComboShape from '../objects/ComboShape.js';
import PuppetUtil from '../objects/PuppetUtil.js';
import TabView from '../objects/TabView.js';
import ButtonGrid from '../objects/ButtonGrid.js';
import PuppetInputHandler from '../objects/PuppetInputHandler.js';

export default class GameState extends Phaser.State {
  preload() {
    this.load.atlas('misc/theme', "assets/misc/theme.png", "assets/misc/theme.json");            
    this.load.atlas('puppet/chooser', 'assets/puppet/chooser.png', 'assets/puppet/chooser.json');
    this.load.atlas('puppet/sample', 'assets/puppet/sample.png', 'assets/puppet/sample.json');
    this.load.json('puppet/accessorize', 'assets/puppet/accessorize.json');
    this.load.json('puppet/menu_accessorize', 'assets/puppet/menu_accessorize.json');
  }

  create() {
    let puppet = this.game.add.existing(Human.buildDefault(this.game, new PuppetInputHandler()));
    puppet.x = this.game.width / 4;
    puppet.y = 250;
    puppet.bodyColor = 0x7777ff;
    let dressChoices = this.cache.getJSON('puppet/accessorize');
    let menuAccessorize = this.cache.getJSON('puppet/menu_accessorize');
    let chooser = this.game.add.existing(new TabView(this.game, 'puppet/chooser', this.game.width / 2, this.game.height, 10, 100, 5, 3, true, function (accType, accName) {
        if(accType == "skinColor_chooser") {
            puppet.bodyColor = parseInt(accName, 16);
        } else if(accType == "hairColor_chooser") {
            if(puppet.head.getAccessory('frontHair')) {
                puppet.head.getAccessory('frontHair').tint = parseInt(accName, 16);
            }
            if(puppet.head.getAccessory('backHair')) {
                puppet.head.getAccessory('backHair').tint = parseInt(accName, 16);
            }
            if(puppet.head.getAccessory('beard')) {
                puppet.head.getAccessory('beard').tint = parseInt(accName, 16);
            }
        } else {
            let acc = dressChoices[accType][accName];
            for (var key in acc) {
                if (acc.hasOwnProperty(key)) {
                let element = acc[key];
                puppet['set' + key](element.key, element.frame, element.anchorX, element.anchorY, element.offsetX, element.offsetY,element.offsetInPixelX,element.offsetInPixelY);
                }
            }            
        }
    }, this, menuAccessorize));

    let dressTabs = {};

    for (var key in dressChoices) {
      if (dressChoices.hasOwnProperty(key)) {
        var element = dressChoices[key];
        dressTabs[key] = Object.keys(element);
      }
    }
    chooser.tabs = dressTabs;
    chooser.x = this.game.width / 2;
    chooser.y = 0;

    //let b = JSON.stringify(puppet, Util.replacer);
    //let a=JSON.parse(JSON.stringify(puppet, Util.replacer), Util.revive);    
    //a.x = 200;

  }

}
