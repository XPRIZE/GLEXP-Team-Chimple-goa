export default class PreloadState extends Phaser.State {

  preload() {
    this._asset = this.add.sprite(320, 240, 'assets/preloader.gif');
    this._asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this._asset);
    this.load.atlas('scene/scene', "assets/scene/scene.png", "assets/scene/scene.json");
    this.load.atlas('misc/theme', "assets/misc/theme.png", "assets/misc/theme.json");            
    this.load.atlas('puppet/chooser', 'assets/puppet/chooser.png', 'assets/puppet/chooser.json');
    this.load.atlas('puppet/sample', 'assets/puppet/sample.png', 'assets/puppet/sample.json');
    this.load.atlas('puppet/icons', 'assets/puppet/icons.png', 'assets/puppet/icons.json');
    this.load.atlas('scene/icons', 'assets/scene/icons.png', 'assets/scene/icons.json');
    this.load.atlas('puppet/characters', 'assets/puppet/characters.png', 'assets/puppet/characters.json');
    this.load.atlas('puppet/character', 'assets/puppet/Character.png', 'assets/puppet/Character.json');
    
     this.load.atlas('puppet/eye_mouth', 'assets/puppet/eye_mouth.png', 'assets/puppet/eye_mouth.json');
    //this.load.atlas('puppet/sample', 'assets/puppet/sample.png', 'assets/puppet/sample.json');
    this.load.json('puppet/accessorize', 'assets/puppet/accessorize.json');
    this.load.json('puppet/menu_accessorize', 'assets/puppet/menu_accessorize.json');
    this.load.atlas('puppet/headshape', 'assets/puppet/headshape.png', 'assets/puppet/headshape.json');
    
  }

  create() {
    this._asset.cropEnabled = false;
  }

  update() {
    if (!!this.ready) {
      this.game.state.start('SceneMenuState');
    }
  }

  onLoadComplete() {
    this.ready = true;
  }

}
