export default class PreloadState extends Phaser.State {

  preload() {
    this._asset = this.add.sprite(320, 240, 'assets/preloader.gif');
    this._asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this._asset);
    this.load.atlas('scene', "assets/scene.png", "assets/scene.json");
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
