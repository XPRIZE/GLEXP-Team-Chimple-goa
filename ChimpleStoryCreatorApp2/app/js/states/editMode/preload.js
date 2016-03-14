var _ = require('lodash')._;
'use strict';

var PreloadState = function (game) {
  var self = this;
  self.game = game;
};

PreloadState.prototype = Object.create(Phaser.State.prototype);
PreloadState.prototype.constructor = PreloadState;

PreloadState.prototype.init = function () {
  var self = this;
  //create preloadSprite
  var backgroundSprite = new Phaser.Sprite(this.game, this.game.world.centerX, this.game.world.centerY, "preloader");
  self.game.world.add(backgroundSprite);
  backgroundSprite.anchor.setTo(0.5);
  self.barMask = self.game.add.graphics(0, 0);
  var loading = self.game.add.text(this.game.world.centerX, this.game.world.centerY + 165, "LOADING", {
    font: "20px pt_monoregular",
    fill: "#fff",
    align: "center"
  });
  loading.anchor.setTo(0.5);

  self.percentText = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 275, "0%", {
    font: "20px abel",
    fill: "#fff",
    align: "center"
  });
  self.percentText.anchor.setTo(0.5);
};

PreloadState.prototype.preload = function () {
  var self = this;
  /*load all background images, characters and props for current story, page if exists*/
  self.game.load.image('backgroundOverlay', "assets/images/ui/background.jpg");
  self.game.load.image('hide', "assets/images/icons/hide.png");
  self.game.load.image('bringtop', "assets/images/icons/primary-bring-forward.png");
  self.game.load.image('sendback', "assets/images/icons/primary-send-to-back.png");
  self.game.load.image('settings', "assets/images/icons/setting_button.png");
  self.game.load.image('recycle_bin', "assets/images/icons/recycle_bin.png")
  self.game.load.image('attr_sound', "assets/images/icons/attr_sound.png");
  self.game.load.image('fx', "assets/images/icons/fx.png");
  self.game.load.image('fx', "assets/images/icons/fx.png");
  self.game.load.image('speech_bubble', "assets/images/icons/speech_bubble.png");
  self.game.load.image('speechBubble', "assets/images/icons/speech_bubble.png");
  self.game.load.script('filterX', 'https://cdn.rawgit.com/photonstorm/phaser/master/filters/BlurX.js');
  self.game.load.script('filterY', 'https://cdn.rawgit.com/photonstorm/phaser/master/filters/BlurY.js');
  self.game.load.script('fireFilter', 'https://cdn.rawgit.com/photonstorm/phaser/master/filters/Fire.js');
  self.game.load.image('mask', 'assets/images/mask-test2.png');

  self.loadExistingPage();
};

PreloadState.prototype.loadExistingPage = function () {
  var self = this;
  var story = self.game.storageDB.findStoryId(this.game.storage_config.storiesCollection, this.game.scope.storyId);
  console.log('story:' + story);
  self.game.currentPage = _.find(story.pages, function (page) {
    return page.pageId === self.game.scope.pageId;
  });

  console.log('self.game.currentPage in preload:' + self.game.currentPage);
  if (self.game.currentPage) {
    //load background image into cache        
    if (self.game.currentPage.backgrounds !== null && self.game.currentPage.backgrounds.length === 1) {
      var bInfo = self.game.currentPage.backgrounds[0];
      if (bInfo.hasOwnProperty("name") && bInfo.hasOwnProperty("assetImage")) {
        self.load.image(bInfo["name"], bInfo["assetImage"]);
      }
    }

    //load character image into cache
    if (self.game.currentPage.characterSprites !== null && self.game.currentPage.characterSprites.length > 0) {
      _.each(self.game.currentPage.characterSprites, function (character) {
        console.log('character loading into cache...');
        if (character.hasOwnProperty("name") && character.hasOwnProperty("assetImage")) {
          self.load.image(character["name"], character["assetImage"]);
        }
      });
    }

    if (self.game.currentPage.characterDragonBones !== null && self.game.currentPage.characterDragonBones.length > 0) {
      _.each(self.game.currentPage.characterDragonBones, function (dragonBone) {
        self.game.load.json(dragonBone.loaderConfiguration.skeletonKey, dragonBone.loaderConfiguration.skeletonJson);
        self.game.load.atlas(dragonBone.loaderConfiguration.atlasKey, dragonBone.loaderConfiguration.atlasImage, dragonBone.loaderConfiguration.armatureJSON);
        self.game.load.image(dragonBone.loaderConfiguration.armatureImageKey, dragonBone.loaderConfiguration.atlasImage);
        self.game.load.json(dragonBone.loaderConfiguration.armatureJSONKey, dragonBone.loaderConfiguration.armatureJSON);
      });
    }
  }
};

PreloadState.prototype.loadUpdate = function () {
  var self = this;
  self.percentText.text = self.game.load.progress + "%";
  self.drawBar(self.game.load.progress / 100);
};

PreloadState.prototype.drawBar = function (f) {
  var self = this;
  self.barMask.clear();
  self.barMask.beginFill(0xFFFFFF, 1);
  self.barMask.drawRect(this.game.world.centerX - 218 * f / 2, this.game.world.centerY + 190, 218 * f, 2);
  self.barMask.endFill();
};

PreloadState.prototype.create = function () {
  var self = this;
  self.drawBar(1);
  self.percentText.text = "100%";
  self.game.fadePlugin.fadeAndPlay("rgb(0,0,0)", 0.5, "GameState");
};

module.exports = PreloadState;
