'use strict';
var _ = require('lodash')._;
var DynamicLoaderState = function (game) {
  var self = this;
  self.game = game;
};

DynamicLoaderState.prototype = Object.create(Phaser.State.prototype);
DynamicLoaderState.prototype.constructor = DynamicLoaderState;

DynamicLoaderState.prototype.init = function (args, kind) {
  var self = this;
  self.args = args;
  self.kind = kind;
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

DynamicLoaderState.prototype.hideLoading = function () {
  var self = this;
  if (self.loading)
    self.loading.destroy(true);

  self.loading = null;
};

DynamicLoaderState.prototype.prepareForLoad = function () {
  var self = this;
  var theme = self.args["theme"];
  if (self.kind === 'background') {
    if (theme) {
      if (theme.hasOwnProperty("assetImage")) {
        self.assetImage = theme["assetImage"];
      };
      if (theme.hasOwnProperty("name")) {
        self.name = theme["name"];
      };
      if (self.assetImage && self.name) {
        self.startLoadingDynamicImage(self.assetImage, self.name);
      }
    }
  } else if (self.kind === 'sprite') {
    if (theme) {
      if (theme.hasOwnProperty("assetImage")) {
        self.assetImage = theme["assetImage"];
      };
      if (theme.hasOwnProperty("name")) {
        self.name = theme["name"];
      };
      if (self.assetImage && self.name) {
        self.startLoadingDynamicImage(self.assetImage, self.name);
      }
    }
  } else if (self.kind === 'armature') {
    if (theme) {
      if (theme.hasOwnProperty("assetImage")) {
        self.assetImage = theme["assetImage"];
      };
      if (theme.hasOwnProperty("kind")) {
        self.kind = theme["kind"];
      };
      if (theme.hasOwnProperty("name")) {
        self.name = theme["name"];
      };

      //dragon bone specific properties            
      if (theme.hasOwnProperty("atlasImage")) {
        self.atlasImage = theme["atlasImage"];
      };

      if (theme.hasOwnProperty("config")) {
        self.config = theme["config"];
      };

      if (theme.hasOwnProperty("atlasJson")) {
        self.atlasJson = theme["atlasJson"];
      };

      if (theme.hasOwnProperty("skeletonJson")) {
        self.skeletonJson = theme["skeletonJson"];
      };

      if (theme.hasOwnProperty("assetDirectory")) {
        self.assetDirectory = theme["assetDirectory"];
      };

      if (theme.hasOwnProperty("armatureImageKey")) {
        self.armatureImageKey = theme["armatureImageKey"];
      };
      if (theme.hasOwnProperty("armatureImage")) {
        self.armatureImage = theme["armatureImage"];
      };
      if (theme.hasOwnProperty("armatureJSONKey")) {
        self.armatureJSONKey = theme["armatureJSONKey"];
      };
      if (theme.hasOwnProperty("armatureJSON")) {
        self.armatureJSON = theme["armatureJSON"];
      };
      if (theme.hasOwnProperty("atlasKey")) {
        self.atlasKey = theme["atlasKey"];
      };
      if (theme.hasOwnProperty("atlasImage")) {
        self.atlasImage = theme["atlasImage"];
      };
      if (theme.hasOwnProperty("skeletonKey")) {
        self.skeletonKey = theme["skeletonKey"];
      };
      if (theme.hasOwnProperty("skeletonJSON")) {
        self.skeletonJSON = theme["skeletonJSON"];
      };
      if (theme.hasOwnProperty("defaultAnimationId")) {
        self.defaultAnimationId = theme["defaultAnimationId"];
      };

      if (self.assetImage && self.name && self.kind && self.atlasImage && self.atlasJson && self.config && self.skeletonJson && self.assetDirectory) {
        self.startLoadingDynamicMetaDataForDragonBones(self.assetImage, self.name, self.kind, self.atlasImage, self.atlasJson, self.config, self.skeletonJson, self.assetDirectory);
      }
    }
  }
};

DynamicLoaderState.prototype.preload = function () {
  //load dynamic resources
  var self = this;
  self.prepareForLoad();
};

DynamicLoaderState.prototype.startLoadingDynamicImage = function (asset, name) {
  var self = this;
  self.game.load.image(name, asset);
};

DynamicLoaderState.prototype.startLoadingDynamicMetaDataForDragonBones = function (assetImage, name, kind, atlasImage, atlasJson, config, skeletonJson, assetDirectory) {
  var self = this;
  self.game.load.json(config, config);
  self.game.load.json(self.skeletonKey, self.skeletonJson);
  self.game.load.atlas(self.atlasKey, self.atlasImage, self.atlasJson);
  self.game.load.image(self.armatureImageKey, self.atlasImage);
  // the texture atlas data (TexturePacker JSON Array format) for the dragon bones sprite 
  // (loaded independently to make it easily accessible to dragonbones)
  self.game.load.json(self.armatureJSONKey, self.armatureJSON);

};

DynamicLoaderState.prototype.create = function () {
  var self = this;
  if (self.kind === 'background') {
    self.updateBackGroundInformationToStorage(self.name, self.assetImage);
  } else if (self.kind === 'sprite') {
    self.updateInitialCharacterSpriteInformationToStorage(self.name, self.assetImage);
  } else if (self.kind === 'armature') {
    self.updateInitialCharacterArmatureInformationToStorage();
  }
  self.game.state.start("GameState");
};

DynamicLoaderState.prototype.loadUpdate = function () {
  var self = this;
  self.percentText.text = self.game.load.progress + "%";
  self.drawBar(self.game.load.progress / 100);
};

DynamicLoaderState.prototype.drawBar = function (f) {
  var self = this;
  self.barMask.clear();
  self.barMask.beginFill(0xFFFFFF, 1);
  self.barMask.drawRect(this.game.world.centerX - 218 * f / 2, this.game.world.centerY + 215, 218 * f, 2);
  self.barMask.endFill();
};

DynamicLoaderState.prototype.updateBackGroundInformationToStorage = function () {
  var self = this;
  //Save BackGround information to local storage for page
  var story = self.game.storageDB.findStoryId(self.game.storage_config.storiesCollection, self.game.scope.storyId);
  console.log('story:' + story);
  self.game.currentPage = _.find(story.pages, function (page) {
    return page.pageId === self.game.scope.pageId;
  });

  if (self.game.currentPage !== null && self.game.currentPage !== undefined) {
    _.remove(self.game.currentPage.backgrounds, function (n) {
      return n;
    });
    console.log('self.game.world.centerX :' + self.game.world.centerX);
    console.log('self.actualGameWidth :' + self.game.actualGameWidth);

    console.log('self.game.world.centerY :' + self.game.world.centerY);
    console.log('self.actualGameHeight :' + self.game.actualGameHeight);

    var x = self.game.world.centerX / self.game.actualGameWidth;
    var y = self.game.world.centerY / self.game.actualGameHeight;
    self.game.currentPage.backgrounds.push({
      x: self.game.world.centerX / self.game.actualGameWidth,
      y: self.game.world.centerY / self.game.actualGameHeight,
      anchorX: 0.5,
      anchorY: 0.5,
      scaleX: self.game.widthScaleFactor,
      scaleY: self.game.heightScaleFactor,
      rotation: 0,
      pivotX: 0,
      pivotY: 0,
      angle: 0,
      alpha: 1,
      isHidden: false,
      assetImage: self.assetImage,
      name: self.name,
      kind: 'background',
      uniquename: _.uniqueId(self.name),
      texts: [],
      fx: [],
      sound: []
    });
  }
  console.log('in DynamicLoaderState: x' + x + 'and y:' + y);
  self.game.storageDB.save();
};

DynamicLoaderState.prototype.updateInitialCharacterSpriteInformationToStorage = function () {
  var self = this;
  var story = self.game.storageDB.findStoryId(self.game.storage_config.storiesCollection, self.game.scope.storyId);

  self.game.currentPage = _.find(story.pages, function (page) {
    return page.pageId === self.game.scope.pageId;
  });

  if (self.game.currentPage !== null && self.game.currentPage !== undefined) {
    self.game.currentPage.characterSprites.push({
      x: self.game.world.centerX / self.game.actualGameWidth,
      y: self.game.world.centerY / self.game.actualGameHeight,
      anchorX: 0.5,
      anchorY: 0.5,
      scaleX: self.game.widthScaleFactor,
      scaleY: self.game.heightScaleFactor,
      rotation: 0,
      angle: 0,
      alpha: 1,
      pivotX: 0,
      pivotY: 0,
      isHidden: false,
      assetImage: self.assetImage,
      name: self.name,
      kind: self.kind,
      autoAdjust: true,
      uniquename: _.uniqueId(self.name),
      texts: [{}, {}, {}, {}],
      fx: [{}, {}, {}, {}],
      sound: [{}, {}, {}, {}],
      anim: [{}, {}, {}, {}]
    });
  }
  self.game.storageDB.save();
};

DynamicLoaderState.prototype.updateInitialCharacterArmatureInformationToStorage = function () {
  var self = this;
  var story = self.game.storageDB.findStoryId(self.game.storage_config.storiesCollection, self.game.scope.storyId);
  console.log('story:' + story);
  self.game.currentPage = _.find(story.pages, function (page) {
    return page.pageId === self.game.scope.pageId;
  });

  if (self.game.currentPage !== null && self.game.currentPage !== undefined) {
    self.game.currentPage.characterDragonBones.push({
      x: self.game.world.centerX / self.game.actualGameWidth,
      y: self.game.world.centerY / self.game.actualGameHeight,
      scaleX: self.game.widthScaleFactor,
      scaleY: self.game.heightScaleFactor,
      rotation: 0,
      pivotX: 0,
      pivotY: 0,
      angle: 0,
      alpha: 1,
      isHidden: false,
      assetImage: self.assetImage,
      name: self.name,
      kind: self.kind,
      autoAdjust: true,
      uniquename: _.uniqueId(self.name),
      texts: [{}, {}, {}, {}],
      fx: [{}, {}, {}, {}],
      sounds: [{}, {}, {}, {}],
      loaderConfiguration: {
        "armatureImageKey": self.armatureImageKey,
        "armatureImage": self.armatureImage,
        "armatureJSONKey": self.armatureJSONKey,
        "armatureJSON": self.armatureJSON,
        "atlasKey": self.atlasKey,
        "atlasImage": self.atlasImage,
        "skeletonKey": self.skeletonKey,
        "skeletonJson": self.skeletonJson,
        "defaultAnimationId": self.defaultAnimationId,
        "assetsDirectory": self.assetDirectory
      }
    });
  }
  self.game.storageDB.save();
};

module.exports = DynamicLoaderState;
