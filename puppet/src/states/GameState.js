import Puppet from '../objects/Puppet.js';
import Human from '../objects/Human.js';
import Limb from '../objects/Limb.js';
import Shape from '../objects/Shape.js';
import Util from '../objects/Util.js';
import TabView from '../objects/TabView.js';

export default class GameState extends Phaser.State {

  preload() {
    this.load.atlas('chooser', 'assets/chooser.png', 'assets/chooser.json');
    this.load.atlas('shirt', 'assets/shirt.png', 'assets/shirt.json');
    this.load.json('dress', 'assets/dress.json');
  }

<<<<<<< Updated upstream
	create() {
        
        let puppet = this.game.add.existing(Human.buildDefault(this.game));
        puppet.x = this.game.width/4;
        puppet.y = 200;
        puppet.bodyColor = 0x7777ff;
        let dressChoices = this.cache.getJSON('dress');
        let chooser = this.game.add.existing(new TabView(this.game, 'chooser', this.game.width/2, this.game.height, 50, function(accType, accName) {
            let acc = dressChoices[accType][accName];
            for (var key in acc) {
                if (acc.hasOwnProperty(key)) {
                    let element = acc[key];
                    puppet['set'+key](element.key, element.frame);
                }
            }
        }));
        
        let dressTabs = {};
        
        for (var key in dressChoices) {
            if (dressChoices.hasOwnProperty(key)) {
                var element = dressChoices[key];
                dressTabs[key] = Object.keys(element);
            }
=======
  create() {
    let puppet = this.game.add.existing(Human.buildDefault(this.game));
    puppet.bodyColor = 0x000000;
    puppet.x = this.game.width / 4;
    puppet.y = 200;
    //puppet.bodyColor = 0x7777ff;
    let dressChoices = this.cache.getJSON('dress');
    let chooser = this.game.add.existing(new TabView(this.game, 'chooser', this.game.width / 2, this.game.height, 50, function (accType, accName) {
      let acc = dressChoices[accType][accName];
      for (var key in acc) {
        if (acc.hasOwnProperty(key)) {
          let element = acc[key];
          puppet['set' + key](element.key, element.frame);
>>>>>>> Stashed changes
        }
      }
    }));
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

    let b = JSON.stringify(puppet, Util.replacer);
    console.log('b:' + b);
    let a = JSON.parse(JSON.stringify(puppet, Util.replacer), Util.revive);
    console.log('a:' + a);
    a.x = 400;

    let test = this.game.add.sprite(50, 50, 'chooser', 'arm_chooser.png');
    // test.anchor = new Phaser.Point(0.5,0);
    // test.scale.x = -1;
    //let test1 = this.game.add.sprite(0,0,'0svg');
    // test1.scale.setTo(5, 5);
    // this.game.scope.$on('changePuppetColor', function() {
    //     console.log('on');
    //     puppet.bodyColor = 0xff0000;
    // });
  }
}
