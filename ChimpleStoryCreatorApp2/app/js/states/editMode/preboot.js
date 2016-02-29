'use strict';

var PreBootState = function (game) {
    var self = this;
    self.game = game;    
};

PreBootState.prototype = Object.create(Phaser.State.prototype);
PreBootState.prototype.constructor = PreBootState;


PreBootState.prototype.preload = function () {
    var self = this;
    self.game.stage.disableVisibilityChange = true;
    self.game.load.crossOrigin = "anonymous";
    self.game.load.json("text", "assets/images/phaser/text.json");
    self.game.load.image('football', "assets/images/phaser/phaser.png");    
    self.game.load.json('assetpack', 'assets/images/phaser/assetpack.json');
};

PreBootState.prototype.create = function () {
    var self = this;
    self.game.stage.disableVisibilityChange = true;
    self.game.state.start("BootState");
};

module.exports = PreBootState;