import Puppet from '../objects/Puppet.js';
import Human from '../objects/Human.js';
import Limb from '../objects/Limb.js';
import Shape from '../objects/Shape.js';
import Util from '../objects/Util.js';
import TabView from '../objects/TabView.js';

export default class GameState extends Phaser.State {
  preload() {
    this.load.atlas('puppet/chooser', 'assets/puppet/chooser.png', 'assets/puppet/chooser.json');
    this.load.atlas('puppet/shirt', 'assets/puppet/shirt.png', 'assets/puppet/shirt.json');
    this.load.json('puppet/dress', 'assets/puppet/dress.json');
  }

  create() {
    let puppet = this.game.add.existing(Human.buildDefault(this.game));
    puppet.x = this.game.width / 4;
    puppet.y = 200;
    puppet.bodyColor = 0x7777ff;
    let dressChoices = this.cache.getJSON('puppet/dress');
    let chooser = this.game.add.existing(new TabView(this.game, 'puppet/chooser', this.game.width / 2, this.game.height, 50, function (accType, accName) {
      let acc = dressChoices[accType][accName];
      for (var key in acc) {
        if (acc.hasOwnProperty(key)) {
          let element = acc[key];
          puppet['set' + key](element.key, element.frame, element.anchorX, element.anchorY, element.offsetX, element.offsetY);
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

    //let b = JSON.stringify(puppet, Util.replacer);
    //let a=JSON.parse(JSON.stringify(puppet, Util.replacer), Util.revive);    
    //a.x = 200;

    let test = this.game.add.sprite(50, 50, 'puppet/chooser', 'arm_chooser.png');
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

GameState.mainScreenJSON = {
	id: 'mainScreen',
	component: 'Window',	
	padding: 4,
	position: { x: 0, y: 0 },
	width: 600,
	height: 500,

	layout: [1, 4],
	children: [
        {
            id: 'label1',
            text: 'My Awesome Game',
            component: 'Label',
            position: 'center',
            width: 600,
            height: 80
        },
		{
		  id: 'playBtn',
		  text: 'Play',
		  component: 'Button',
		  position: 'center',
		  
		  width: 190,
		  height: 80
		},
		{
		  id: 'optionsBtn',
		  text: 'Options',
		  component: 'Button',
		  position: 'center',
		  width: 190,
		  height: 80
		}		
	]
}
