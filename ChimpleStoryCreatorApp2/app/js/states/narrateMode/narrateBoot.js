'use strict';

var NarrateBootState = function (game) {
  var self = this;
  self.game = game;
};

NarrateBootState.prototype = Object.create(Phaser.State.prototype);
NarrateBootState.prototype.constructor = NarrateBootState;

//Add Behavior
NarrateBootState.prototype.init = function () {
  var self = this;
  self.game.stage.backgroundColor = '#000000';
  self.game.time.advancedTiming = true;

  //Set Scale Properties
  self.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  self.game.scale.pageAlignHorizontally = true;
  self.game.scale.pageAlignVertically = true;

  //load Physics
  self.game.physics.startSystem(Phaser.Physics.ARCADE);

  //load fadePlugin for transitions
  self.game.fadePlugin = self.game.plugins.add(require('../../plugins/FadePlugin'));

  //Create DB for Phaser if not exists and save references to window

  var lokiDBFromAngular = window.storageDB;

  if (!self.game.storageDB) {
    console.log('creating new DB:' + self.game.storage_config.storageDBName);
    self.game.storageDB = $Storage(lokiDBFromAngular);
  }

  if (!self.game.recordingManager && self.game.storageDB) {
    self.game.recordingManager = $R(self.game, self.game.storageDB);
  }

  self.initializeCollections();
};

NarrateBootState.prototype.initializeCollections = function () {
  var self = this;

  var collection = self.game.storageDB.getCollection(self.game.storage_config.storiesCollection);
  if (!collection) {
    collection = self.game.storageDB.addCollection(this.game.storage_config.storiesCollection);
  }

  //Crate Collection for Animations

  var animationCollection = self.game.storageDB.getCollection(self.game.storage_config.animationCollection);
  if (!animationCollection) {
    animationCollection = self.game.storageDB.addCollection(this.game.storage_config.animationCollection);
  }

  self.game.storageDB.save();
};

NarrateBootState.prototype.preload = function () {
  this.assetpack = this.game.cache.getJSON('assetpack');

  var backGroundImages = this.assetpack.assets.editor.images;
  for (var key in backGroundImages) {
    this.game.load.image(key, backGroundImages[key]);
  }

  var images = this.assetpack.assets.preloader.images;
  for (var key in images) {
    this.game.load.image(key, images[key]);
  }

  var spritesheets = this.assetpack.assets.editor.spritesheets;

  for (var key in spritesheets) {
    this.game.load.atlasJSONHash(key, spritesheets[key].image, spritesheets[key].json);
  }
};

NarrateBootState.prototype.create = function () {
  var self = this;
  var initialPageIndex = 0;
  this.game.fadePlugin.fadeAndPlay("rgb(0,0,0)", 0.5, "NarratePreloadState", initialPageIndex);
};

module.exports = NarrateBootState;
