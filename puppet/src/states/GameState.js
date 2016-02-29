import Puppet from '../objects/Puppet.js';
import Human from '../objects/Human.js';
import Limb from '../objects/Limb.js';
import Shape from '../objects/Shape.js';
import Util from '../objects/Util.js';
import Chooser from '../objects/Chooser.js';

export default class GameState extends Phaser.State {

  preload() {
    this.load.atlas('chooser', 'assets/chooser.png', 'assets/chooser.json');
    this.load.atlas('shirt', 'assets/shirt.png', 'assets/shirt.json');
    // this.load.image('arm_chooser_up', 'assets/arm_chooser_up.png');
  }

	create() {
        let puppet = this.game.add.existing(Human.buildDefault(this.game));
        puppet.x = this.game.width/4;
        puppet.y = 200;
        puppet.bodyColor = 0x7777ff;
        
        let chooser = this.game.add.existing(new Chooser(this.game, 'chooser', this.game.width/2, this.game.height, Chooser.LAYOUT_VERTICAL));
        chooser.buttons = new Map([['arm_chooser', ['shirt1', 'shirt1', 'shirt3', 'shirt4', 'shirt5']], [ 'beard_chooser', ['shirt1', 'shirt1', 'shirt3', 'shirt4', 'shirt5']], [ 'body_chooser', ['shirt1', 'shirt1', 'shirt3', 'shirt4', 'shirt5']], [ 'face_chooser', ['shirt1', 'shirt1', 'shirt3', 'shirt4', 'shirt5']], [ 'glasses_chooser', ['shirt1', 'shirt1', 'shirt3', 'shirt4', 'shirt5']], [ 'hair_chooser', ['shirt1', 'shirt1', 'shirt3', 'shirt4', 'shirt5']], [ 'hairColor_chooser', ['shirt1', 'shirt1', 'shirt3', 'shirt4', 'shirt5']], [ 'head_chooser', ['shirt1', 'shirt1', 'shirt3', 'shirt4', 'shirt5']], [ 'pants_chooser', ['shirt1', 'shirt1', 'shirt3', 'shirt4', 'shirt5']], [ 'shirt_chooser', ['shirt1', 'shirt1', 'shirt3', 'shirt4', 'shirt5']], [ 'shoes_chooser', ['shirt1', 'shirt1', 'shirt3', 'shirt4', 'shirt5']], [ 'skinColor_chooser', ['shirt1', 'shirt1', 'shirt3', 'shirt4', 'shirt5']]]);
        chooser.x = this.game.width / 2;
        chooser.y = 0;

        //let b = JSON.stringify(puppet, Util.replacer);
        //let a=JSON.parse(JSON.stringify(puppet, Util.replacer), Util.revive);    
        //a.x = 200;

        let test = this.game.add.sprite(50,50,'chooser', 'arm_chooser.png');
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
