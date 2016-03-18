import Puppet from '../objects/Puppet.js';
import Human from '../objects/Human.js';
import Limb from '../objects/Limb.js';
import Shape from '../objects/Shape.js';
import Util from '../objects/Util.js';
import TabView from '../objects/TabView.js';
import ButtonGrid from '../objects/ButtonGrid.js';

export default class GameState extends Phaser.State {
  preload() {
    this.load.atlas('puppet/chooser', 'assets/puppet/chooser.png', 'assets/puppet/chooser.json');
    this.load.atlas('puppet/shirt', 'assets/puppet/shirt.png', 'assets/puppet/shirt.json');
    this.load.json('puppet/dress', 'assets/puppet/dress.json');
    this.load.atlas('misc/theme', "assets/misc/theme.png", "assets/misc/theme.json");            
  }

  create() {
    let puppet = this.game.add.existing(Human.buildDefault(this.game));
    puppet.x = this.game.width / 4;
    puppet.y = 200;
    puppet.bodyColor = 0x7777ff;
    let dressChoices = this.cache.getJSON('puppet/dress');
    let chooser = this.game.add.existing(new TabView(this.game, 'puppet/chooser', this.game.width / 2, this.game.height, 10, 100, 5, 3, true, function (accType, accName) {
      let acc = dressChoices[accType][accName];
      for (var key in acc) {
        if (acc.hasOwnProperty(key)) {
          let element = acc[key];
           puppet['set' + key](element.key, element.frame, element.anchorX, element.anchorY, element.offsetX, element.offsetY,element.offsetInPixelX,element.offsetInPixelY);
        }
      }
    }, this));

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
