export default class PreloadState extends Phaser.State {

  preload() {
    this._asset = this.add.sprite(320, 240, 'assets/preloader.gif');
    this._asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this._asset);
    this.load.image('testsprite', 'assets/test.png');
    this.load.json('puppet/accessorize',"assets/puppet/accessorize.json");
    // this.load.json('puppet/accessorize',"assets/puppet/accessorize.json");
    
  }

  create() {
    this._asset.cropEnabled = false;
  }

  update() {
    if (!!this.ready) {
      this.game.state.start('PuppetMenuState');
    }
  }

  onLoadComplete() {
    this.ready = true;
  }

}
