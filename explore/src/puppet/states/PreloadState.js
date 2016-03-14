export default class PreloadState extends Phaser.State {

  preload() {
    this._asset = this.add.sprite(320, 240, 'assets/preloader.gif');
    this._asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this._asset);
    this.load.image('testsprite', 'assets/test.png');
    this.load.atlas('puppet/0', "assets/puppet/0.svg", "assets/puppet/0.json");
    this.load.atlas('puppet/1', "assets/puppet/1.svg", "assets/puppet/1.json");
    this.load.atlas('puppet/2', "assets/puppet/2.svg", "assets/puppet/2.json");
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
