'use strict';

var BootState = function (game) {
  var self = this;
  self.game = game;
};

BootState.prototype = Object.create(Phaser.State.prototype);
BootState.prototype.constructor = BootState;

//Add Behavior
BootState.prototype.init = function () {
  var self = this;
  self.game.stage.backgroundColor = '#000000';
  self.game.time.advancedTiming = true;

  //Set Scale Properties
  if (!self.game.device.desktop) {
    self.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    self.game.scale.pageAlignHorizontally = true;
    self.game.scale.pageAlignVertically = true;
  } else {
    self.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    self.game.scale.pageAlignVertically = true;
    self.game.scale.pageAlignHorizontally = true;
  }

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
  self.syncToLoki();
};

BootState.prototype.initializeCollections = function () {
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

BootState.prototype.preload = function () {
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

BootState.prototype.create = function () {
  var self = this;
  this.game.fadePlugin.fadeAndPlay("rgb(0,0,0)", 0.5, "PreloadState");
};

BootState.prototype.syncToLoki = function () {
  var self = this;
  console.log('storyId:' + this.game.scope.storyId);
  console.log('pageId:' + this.game.scope.pageId);

  var story = null;

  story = self.game.storageDB.findStoryId(self.game.storage_config.storiesCollection, self.game.scope.storyId);
  if (!story) {
    self.game.storageDB.getCollection(self.game.storage_config.storiesCollection).insert({
      storyId: self.game.scope.storyId,
      pages: [{
        pageId: self.game.scope.pageId,
        backgrounds: [],
        characterSprites: [],
        characterDragonBones: []
      }]
    });
  } else {
    var pageExists = false;
    for (var i = 0, len = story.pages.length; i < len; i++) {
      var t = story.pages[i];
      if (t.pageId === this.game.scope.pageId) {
        pageExists = true;
        break;
      }
    }
    if (!pageExists) {
      story.pages.push({
        pageId: this.game.scope.pageId,
        backgrounds: [],
        characterSprites: [],
        characterDragonBones: []
      });
      self.game.storageDB.getCollection(self.game.storage_config.storiesCollection).update(story);
    }
  }

  self.game.storageDB.getDB().save();
};

module.exports = BootState;
