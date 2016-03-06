export default class PreloadState extends Phaser.State {

  preload() {
    this._asset = this.add.sprite(320, 240, 'assets/preloader.gif');
    this._asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this._asset);
    this.load.image('testsprite', 'assets/test.png');
    this.load.atlas('0', "assets/0.svg", "assets/0.json");
    this.load.atlas('1', "assets/1.svg", "assets/1.json");
    this.load.atlas('2', "assets/2.svg", "assets/2.json");
  }

  create() {
    this._asset.cropEnabled = false;
  }

  update() {
    if (!!this.ready) {
      this.game.state.start('MenuState');
    }
  }

  onLoadComplete() {
    this.ready = true;
  }

}
