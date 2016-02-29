'use strict';

var NarratePreBootState = function (game) {
  var self = this;
  self.game = game;
};

NarratePreBootState.prototype = Object.create(Phaser.State.prototype);
NarratePreBootState.prototype.constructor = NarratePreBootState;

NarratePreBootState.prototype.preload = function () {
  var self = this;
  self.game.stage.disableVisibilityChange = true;
  self.game.load.crossOrigin = "anonymous";
  self.game.load.json("text", "assets/images/phaser/text.json");
  self.game.load.json('assetpack', 'assets/images/phaser/assetpack.json');
};

NarratePreBootState.prototype.create = function () {
  var self = this;
  self.game.stage.disableVisibilityChange = true;
  self.game.state.start("NarrateBootState");
};

module.exports = NarratePreBootState;
