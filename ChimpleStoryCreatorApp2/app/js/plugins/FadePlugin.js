Phaser.Plugin.FadePlugin = function (game, parent) {
    Phaser.Plugin.call(this, game, parent);
};


Phaser.Plugin.FadePlugin.prototype = Object.create(Phaser.Plugin.prototype);
Phaser.Plugin.FadePlugin.prototype.constructor = Phaser.Plugin.SamplePlugin;

Phaser.Plugin.FadePlugin.prototype.fadeAndPlay = function (style, time, nextState, data) {
    this.crossFadeBitmap = this.game.make.bitmapData(this.game.width, this.game.height);
    this.crossFadeBitmap.rect(0, 0, this.game.width, this.game.height, style);
    this.overlay = this.game.add.sprite(0, 0, this.crossFadeBitmap);
    this.overlay.alpha = 0;
    var fadeTween = this.game.add.tween(this.overlay);
    fadeTween.to({
        alpha: 1
    }, time * 1000);
    fadeTween.onComplete.add(function () {
        if (data != undefined) {
            this.game.state.start(nextState, true, false, data);
        } else {
            this.game.state.start(nextState);
        }
    }, this);
    fadeTween.start();
};


module.exports = Phaser.Plugin.FadePlugin;