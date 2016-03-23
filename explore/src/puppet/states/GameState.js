import PuppetCustomizer from '../objects/PuppetCustomizer.js';

export default class GameState extends Phaser.State {
  preload() {
    this.load.atlas('misc/theme', "assets/misc/theme.png", "assets/misc/theme.json");            
    this.load.atlas('puppet/chooser', 'assets/puppet/chooser.png', 'assets/puppet/chooser.json');
    this.load.atlas('puppet/sample', 'assets/puppet/sample.png', 'assets/puppet/sample.json');
    this.load.atlas('puppet/icons', 'assets/puppet/icons.png', 'assets/puppet/icons.json');
    this.load.atlas('scene/icons', 'assets/scene/icons.png', 'assets/scene/icons.json');
    this.load.atlas('puppet/characters', 'assets/puppet/characters.png', 'assets/puppet/characters.json');
    //this.load.atlas('puppet/sample', 'assets/puppet/sample.png', 'assets/puppet/sample.json');
    this.load.json('puppet/accessorize', 'assets/puppet/accessorize.json');
    this.load.json('puppet/menu_accessorize', 'assets/puppet/menu_accessorize.json');
    
  }

  create() {
        let edit = game.add.button(this.game.width -100, 100, 'scene/icons', this.goEdit, this, 'ic_grid_on_black_24dp_1x.png', 'ic_grid_on_black_24dp_1x.png', 'ic_grid_on_black_24dp_1x.png', 'ic_grid_on_black_24dp_1x.png')
        edit.anchor.setTo(0.5, 0.5)
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