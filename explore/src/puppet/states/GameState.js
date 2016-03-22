import PuppetCustomizer from '../objects/PuppetCustomizer.js';
import JsonUtil from '../objects/JsonUtil.js';

export default class GameState extends Phaser.State {
  preload() {
    this.load.atlas('misc/theme', "assets/misc/theme.png", "assets/misc/theme.json");            
    this.load.atlas('puppet/chooser', 'assets/puppet/chooser.png', 'assets/puppet/chooser.json');
    this.load.atlas('puppet/sample', 'assets/puppet/sample.png', 'assets/puppet/sample.json');
    // this.load.atlas('puppet/icons', 'assets/puppet/icons.png', 'assets/puppet/icons.json');
    this.load.atlas('scene/icons', 'assets/scene/icons.png', 'assets/scene/icons.json');
    this.load.atlas('puppet/characters', 'assets/puppet/characters.png', 'assets/puppet/characters.json');
    //this.load.atlas('puppet/sample', 'assets/puppet/sample.png', 'assets/puppet/sample.json');
    this.load.json('puppet/accessorize', 'assets/puppet/accessorize.json');
    this.load.json('puppet/menu_accessorize', 'assets/puppet/menu_accessorize.json');
    
  }

  create() {
        let edit = game.add.button(this.game.width -100, 100, 'scene/icons', this.goEdit, this, 'ic_grid_on_black_24dp_1x.png', 'ic_grid_on_black_24dp_1x.png', 'ic_grid_on_black_24dp_1x.png', 'ic_grid_on_black_24dp_1x.png')
        edit.anchor.setTo(0.5, 0.5)
        // JSON.parse('{"_class":"Human","name":"human","relativeAnchor":{"x":0,"y":0,"type":25},"relativeOffset":{"x":0,"y":0,"type":25},"offsetInPixel":{"x":0,"y":0,"type":25},"accessories":[],"limbs":[{"_class":"Limb","name":"body","relativeAnchor":{"x":0.5,"y":0,"type":25},"relativeOffset":{"x":0.5,"y":0,"type":25},"offsetInPixel":{"x":0,"y":0,"type":25},"isMask":true,"shape":{"_class":"Shape","name":"bodyShape","initialScale":{"x":1,"y":1,"type":25},"relativeAnchor":{"x":0.5,"y":0,"type":25},"relativeOffset":{"x":0.5,"y":0,"type":25},"offsetInPixel":{"x":0,"y":0,"type":25},"graphics":{"x":0,"y":0,"width":200,"height":300,"radius":10,"type":26}},"accessories":[{"_class":"Accessory","name":"shirt","initialScale":{"x":1,"y":1,"type":25},"maintainAspectRatio":true,"followWidth":true,"followHeight":true,"relativeAnchor":{"x":0.5,"y":0,"type":25},"relativeOffset":{"x":0.5,"y":0,"type":25},"offsetInPixel":{"x":0,"y":0,"type":25},"flipX":false,"initKey":"puppet/characters","initFrame":"scientist_shirt.png"},{"_class":"Accessory","name":"jacket","initialScale":{"x":1,"y":1,"type":25},"maintainAspectRatio":true,"followWidth":true,"followHeight":true,"relativeAnchor":{"x":0.5,"y":0,"type":25},"relativeOffset":{"x":0.5,"y":0,"type":25},"offsetInPixel":{"x":0,"y":0,"type":25},"flipX":false,"initKey":"puppet/characters","initFrame":"scientist_overcoat.png"}],"limbs":[{"_class":"Limb","name":"leftLeg","relativeAnchor":{"x":1,"y":0,"type":25},"relativeOffset":{"x":0.5,"y":1,"type":25},"offsetInPixel":{"x":-10,"y":-20,"type":25},"isMask":false,"shape":{"_class":"Shape","name":"leftLegShape","initialScale":{"x":1,"y":1,"type":25},"relativeAnchor":{"x":0.5,"y":0,"type":25},"relativeOffset":{"x":0,"y":0,"type":25},"offsetInPixel":{"x":0,"y":0,"type":25},"graphics":{"x":0,"y":0,"width":50,"height":300,"type":22}},"accessories":[{"_class":"Accessory","name":"leftPant","initialScale":{"x":1,"y":1,"type":25},"maintainAspectRatio":false,"followWidth":true,"followHeight":true,"relativeAnchor":{"x":1,"y":0,"type":25},"relativeOffset":{"x":1,"y":0,"type":25},"offsetInPixel":{"x":0,"y":0,"type":25},"flipX":false,"initKey":"puppet/characters","initFrame":"scientist_pant.png"}],"limbs":[]},{"_class":"Limb","name":"rightLeg","relativeAnchor":{"x":0,"y":0,"type":25},"relativeOffset":{"x":0.5,"y":1,"type":25},"offsetInPixel":{"x":10,"y":-20,"type":25},"isMask":false,"shape":{"_class":"Shape","name":"rightLegShape","initialScale":{"x":1,"y":1,"type":25},"relativeAnchor":{"x":0.5,"y":0,"type":25},"relativeOffset":{"x":0,"y":0,"type":25},"offsetInPixel":{"x":0,"y":0,"type":25},"graphics":{"x":0,"y":0,"width":50,"height":300,"type":22}},"accessories":[{"_class":"Accessory","name":"rightPant","initialScale":{"x":1,"y":1,"type":25},"maintainAspectRatio":false,"followWidth":true,"followHeight":true,"relativeAnchor":{"x":0,"y":0,"type":25},"relativeOffset":{"x":0,"y":0,"type":25},"offsetInPixel":{"x":0,"y":0,"type":25},"flipX":false,"initKey":"puppet/characters","initFrame":"scientist_pant.png"}],"limbs":[]},{"_class":"Limb","name":"head","relativeAnchor":{"x":0.5,"y":1,"type":25},"relativeOffset":{"x":0.5,"y":0,"type":25},"offsetInPixel":{"x":0,"y":-10,"type":25},"isMask":false,"shape":{"_class":"Shape","name":"headShape","initialScale":{"x":1,"y":1,"type":25},"relativeAnchor":{"x":0.5,"y":1,"type":25},"relativeOffset":{"x":0.5,"y":0,"type":25},"offsetInPixel":{"x":0,"y":-10,"type":25},"graphics":{"x":85,"y":100,"width":85,"height":100,"type":16}},"accessories":[],"limbs":[]},{"_class":"Limb","name":"leftHand","relativeAnchor":{"x":1,"y":0,"type":25},"relativeOffset":{"x":0,"y":0,"type":25},"offsetInPixel":{"x":-10,"y":0,"type":25},"isMask":false,"shape":{"_class":"Shape","name":"leftHandShape","initialScale":{"x":1,"y":1,"type":25},"relativeAnchor":{"x":0.5,"y":0,"type":25},"relativeOffset":{"x":0,"y":0,"type":25},"offsetInPixel":{"x":-10,"y":0,"type":25},"graphics":{"x":0,"y":0,"width":50,"height":200,"type":22}},"accessories":[{"_class":"Accessory","name":"leftSleeve","initialScale":{"x":1,"y":1,"type":25},"maintainAspectRatio":false,"followWidth":true,"followHeight":true,"relativeAnchor":{"x":1,"y":0,"type":25},"relativeOffset":{"x":1,"y":0,"type":25},"offsetInPixel":{"x":0,"y":0,"type":25},"flipX":false,"initKey":"puppet/characters","initFrame":"scientist_shirt_sleeve.png"},{"_class":"Accessory","name":"armAccessory","initialScale":{"x":1,"y":1,"type":25},"maintainAspectRatio":true,"followWidth":true,"followHeight":false,"relativeAnchor":{"x":0.5,"y":0.4,"type":25},"relativeOffset":{"x":0,"y":1,"type":25},"offsetInPixel":{"x":0,"y":0,"type":25},"flipX":false,"initKey":"puppet/characters","initFrame":"scientist_testtube.png"}],"limbs":[]},{"_class":"Limb","name":"rightHand","relativeAnchor":{"x":0,"y":0,"type":25},"relativeOffset":{"x":1,"y":0,"type":25},"offsetInPixel":{"x":10,"y":0,"type":25},"isMask":false,"shape":{"_class":"Shape","name":"rightHandShape","initialScale":{"x":1,"y":1,"type":25},"relativeAnchor":{"x":0.5,"y":0,"type":25},"relativeOffset":{"x":1,"y":0,"type":25},"offsetInPixel":{"x":10,"y":0,"type":25},"graphics":{"x":0,"y":0,"width":50,"height":200,"type":22}},"accessories":[{"_class":"Accessory","name":"rightSleeve","initialScale":{"x":1,"y":1,"type":25},"maintainAspectRatio":false,"followWidth":true,"followHeight":true,"relativeAnchor":{"x":0,"y":0,"type":25},"relativeOffset":{"x":0,"y":0,"type":25},"offsetInPixel":{"x":0,"y":0,"type":25},"flipX":true,"initKey":"puppet/characters","initFrame":"scientist_shirt_sleeve.png"}],"limbs":[]}]}],"x":600,"y":250,"bodyColor":11816718}', JsonUtil.revive);
	}

    goEdit() {
        this.add.existing(new PuppetCustomizer(this.game, this.game.width, this.game.height, this.puppet, this.addPuppet, this));
    }
      
    //let b = JSON.stringify(puppet, Util.replacer);
    //let a=JSON.parse(JSON.stringify(puppet, Util.replacer), Util.revive);    
    //a.x = 200;
    

  addPuppet(puppet) {
      if(this.puppet == null) {
          this.puppet = puppet;
      }
      this.add.existing(this.puppet);
      this.puppet.x = this.game.width / 2;
      this.puppet.y = 250;

  }

}
