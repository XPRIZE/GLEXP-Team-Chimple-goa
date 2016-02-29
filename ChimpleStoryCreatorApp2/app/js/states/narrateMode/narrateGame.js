'use strict';
var _ = require('lodash')._;
var NarrateCharacterSprite = require('../../fabs/narrateCharacterSprite');
var dragonBones = require('../../dragonBones/phaserDragonBones');

var NarrateGameState = function (game) {
  var self = this;
  self.game = game;
  self.background;
  self.game.characterCountOnScreen = 0;
};

NarrateGameState.prototype = Object.create(Phaser.State.prototype);
NarrateGameState.prototype.constructor = NarrateGameState;

NarrateGameState.prototype.init = function (args) {
  var self = this;
  self.finishedPlayingCurrentPage = false;
  self.registerDispatchSignals();
  self.game.displayGroup = self.game.add.group();
};

NarrateGameState.prototype.registerDispatchSignals = function () {
  var self = this;
  self.onResumeFromPauseWhilePlaying = new Phaser.Signal();
  self.onResumeFromPauseWhilePlaying.add(self.resumeFromPauseWhilePlaying, self);

  self.onPauseWhilePlaying = new Phaser.Signal();
  self.onPauseWhilePlaying.add(self.pauseWhilePlaying, self);

  self.game.onResume.add(self.onGameResume, self);

  self.game.onPause.add(self.onGamePause, self);

  self.onNextPageSignal = new Phaser.Signal();
  self.onNextPageSignal.add(self.transitToNextPage, self);

  self.onPrevPageSignal = new Phaser.Signal();
  self.onPrevPageSignal.add(self.transitToPrevPage, self);

};

NarrateGameState.prototype.onGamePause = function () {

};

NarrateGameState.prototype.onGameResume = function () {
  var self = this;
  self.lastUpdatedTimeInUpdate = new Date();
};

NarrateGameState.prototype.create = function () {
  var self = this;

  //create next and prev arrow sprite
  self.createNextAndPrevControls({
    _customHandleNext: "next",
    _customHandlePrev: "prev",
    _width: self.game.world.centerX,
    _height: self.game.world.centerY,
    _onNextCallback: function () {
      self.onNextPageSignal.dispatch();
    },
    _onPrevCallback: function () {
      self.onPrevPageSignal.dispatch();
    }
  });
  self.charactersOnScreen = [];
  self.dragonsOnScreen = [];

  _.remove(self.charactersOnScreen, function (n) {
    return n;
  });

  _.remove(self.dragonsOnScreen, function (n) {
    return n;
  });

  //self.firefilter = self.game.add.filter('Fire', 800, 600);
  //self.firefilter.alpha = 0.0;

  self.renderOnTopOfGroup = null;
  self.renderOnBehindOfGroup = null;

  self.loadGame();

  if (self.renderOnTopOfGroup) {
    self.game.displayGroup.bringToTop(self.renderOnTopOfGroup);
  }

  if (self.renderOnBehindOfGroup) {
    self.game.displayGroup.sendToBack(self.renderOnBehindOfGroup);
  }

  if (!self.game.recordingManager.recordInformationMap) {
    self.game.recordingManager.loadRecordedSequence();
  }

  self.doPlay();

};

NarrateGameState.prototype.transitToNextPage = function () {
  var self = this;
  self.game.fadePlugin.fadeAndPlay("rgb(0,0,0)", 0.5, "NarratePreloadState", self.game.currentPageIndex + 1);
};

NarrateGameState.prototype.transitToPrevPage = function () {
  var self = this;
  self.game.fadePlugin.fadeAndPlay("rgb(0,0,0)", 0.5, "NarratePreloadState", self.game.currentPageIndex - 1);
};

NarrateGameState.prototype.createNextAndPrevControls = function (options) {
  var self = this;

  if (self.game.currentPageIndex >= 0 && self.game.currentPageIndex < self.game.totalStoryPages) {
    self.chevronRight = self.game.add.image(self.game.width - 30, self.game.world.centerY + 10, options._customHandleNext);
    self.chevronRight.anchor.setTo(0.5, 0.5);
    self.chevronRight.inputEnabled = true;
    self.chevronRight.alpha = 0;
    self.chevronRight.events.onInputDown.add(function (e, pointer) {
      if (options._onNextCallback) {
        options._onNextCallback();
      }
    }, self);

  }

  if (self.game.currentPageIndex > 0) {
    self.chevronLeft = self.game.add.image(30, self.game.world.centerY + 10, options._customHandlePrev);
    self.chevronLeft.anchor.setTo(0.5, 0.5);
    self.chevronLeft.alpha = 0;
    self.chevronLeft.inputEnabled = true;
    self.chevronLeft.events.onInputDown.add(function (e, pointer) {
      if (options._onPrevCallback) {
        options._onPrevCallback();
      }
    }, self);

  }
}

NarrateGameState.prototype.showPlayOverlay = function () {
  var self = this;
  var prePlayOverlay = self.game.add.bitmapData(self.game.width - 50, self.game.height - 50);
  prePlayOverlay.ctx.fillStyle = '#fff';
  prePlayOverlay.ctx.fillRect(50, 50, self.game.width - 50, self.game.height - 50);

  //Sprite for overlay
  var playPanel = self.add.sprite(0, self.game.height, prePlayOverlay);
  playPanel.alpha = 0.8;
  playPanel.inputEnabled = true;

  var overlayTween = self.add.tween(playPanel);
  overlayTween.to({ y: 50 }, 1000);

  overlayTween.onComplete.add(function () {
    var style = { font: '50px Arial', fill: '#000' };
    var preRecordMessage = self.game.add.text(self.game.width / 2, self.game.height / 2, 'Play Starting in ...', style);
    preRecordMessage.anchor.setTo(0.5);
    var remainingTime = 3;
    var timerEvent = self.game.time.events.loop(Phaser.Timer.SECOND * 1, function () {
      preRecordMessage.text = remainingTime;
      remainingTime--;

      if (remainingTime == -1) {
        preRecordMessage.destroy();
        playPanel.destroy();
        self.game.time.events.remove(timerEvent);
        self.startPlaying();
      }
    }, self);

  }, self);

  overlayTween.start();

};

NarrateGameState.prototype.doPlay = function () {
  var self = this;
  self.showPlayOverlay();
};

NarrateGameState.prototype.inPlayMode = function () {
  var self = this;

  if (self.isPauseWhilePlaying) {
    return false;
  }
  if (self.game.currentPlayCounter < self.game.currentRecordingCounter) {
    return true;
  }

  //Play should be finished by this 
  self.finishedPlayingCurrentPage = true;
  if (self.chevronLeft) {
    self.chevronLeft.alpha = 1;
  }

  if (self.chevronRight) {
    self.chevronRight.alpha = 1;
  }

  return false;
};

NarrateGameState.prototype.getPlayStartTime = function () {
  var self = this;
  if (self.isPlaying && self.playStartTime) {
    return self.playStartTime;
  };
};

NarrateGameState.prototype.startPlaying = function () {
  var self = this;

  //update gameStatus to PLAYING Mode
  self.game.gameStatus = self.game.CONFIGS.PLAYING;

  self.isPlaying = true;
  self.playStartTime = new Date();

  //set up time when playing starts
  self.lastUpdatedTimeInUpdate = self.playStartTime;
  self.game.currentPlayCounter = 0;

  console.log('is playing now:' + self.inPlayMode());
};

NarrateGameState.prototype.resumeFromPauseWhilePlaying = function () {
  var self = this;
  self.isPauseWhilePlaying = false;
  self.game.gameStatus = self.game.CONFIGS.PLAYING;
};

NarrateGameState.prototype.pauseWhilePlaying = function () {
  var self = this;
  self.isPauseWhilePlaying = true;
};

NarrateGameState.prototype.loadGame = function () {
  var self = this;
  self.game.story = self.game.storageDB.findStoryId(self.game.storage_config.storiesCollection, self.game.scope.storyId);
  console.log('story:' + self.game.story);
  self.game.currentPage = _.find(self.game.story.pages, function (page) {
    return page.pageId === self.game.scope.pageId;
  });

  self.game.currentRecordingCounter = self.game.currentPage.recordingTime;
  if (self.game.currentPage) {
    if (self.game.currentPage.backgrounds !== null && self.game.currentPage.backgrounds.length === 1) {
      var bInfo = self.game.currentPage.backgrounds[0];
      if (bInfo !== null) {
        var x = bInfo.hasOwnProperty("x") ? bInfo["x"] : 0;
        var y = bInfo.hasOwnProperty("y") ? bInfo["y"] : 0;
        var name = bInfo.hasOwnProperty("name") ? bInfo["name"] : '';
        var anchorX = bInfo.hasOwnProperty("anchorX") ? bInfo["anchorX"] : 0;
        var anchorY = bInfo.hasOwnProperty("anchorY") ? bInfo["anchorY"] : 0;
        var scaleX = bInfo.hasOwnProperty("scaleX") ? bInfo["scaleX"] : 0;
        var scaleY = bInfo.hasOwnProperty("scaleY") ? bInfo["scaleY"] : 0;
        var uniquename = bInfo.hasOwnProperty("uniquename") ? bInfo["uniquename"] : '';
        var angle = bInfo.hasOwnProperty("angle") ? bInfo["angle"] : 0;
        var rotation = bInfo.hasOwnProperty("rotation") ? bInfo["rotation"] : 0;
        var alpha = bInfo.hasOwnProperty("alpha") ? bInfo["alpha"] : 0;
        var texts = bInfo.hasOwnProperty("texts") ? bInfo["texts"] : [];
        var sound = bInfo.hasOwnProperty("sound") ? bInfo["sound"] : [];
        self.createBackGroundFromCache(x, y, name, anchorX, anchorY, scaleX, scaleY, uniquename, angle, rotation, alpha, texts, sound);
      }
    }

    //load characters
    if (self.game.currentPage.characterSprites !== null && self.game.currentPage.characterSprites.length > 0) {
      _.each(self.game.currentPage.characterSprites, function (character) {
        console.log('character loading into cache...');
        if (character !== null) {
          var x = character.hasOwnProperty("x") ? character["x"] : 0;
          var y = character.hasOwnProperty("y") ? character["y"] : 0;
          var name = character.hasOwnProperty("name") ? character["name"] : '';

          var anchorX = character.hasOwnProperty("anchorX") ? character["anchorX"] : 0;
          var anchorY = character.hasOwnProperty("anchorY") ? character["anchorY"] : 0;

          var pivotX = character.hasOwnProperty("pivotX") ? character["pivotX"] : 0;
          var pivotY = character.hasOwnProperty("pivotY") ? character["pivotY"] : 0;

          var scaleX = character.hasOwnProperty("scaleX") ? character["scaleX"] : 0;
          var scaleY = character.hasOwnProperty("scaleY") ? character["scaleY"] : 0;

          var kind = character.hasOwnProperty("kind") ? character["kind"] : 0;
          var autoAdjust = character.hasOwnProperty("autoAdjust") ? character["autoAdjust"] : false;
          var uniquename = character.hasOwnProperty("uniquename") ? character["uniquename"] : null;
          var rotation = character.hasOwnProperty("rotation") ? character["rotation"] : 0;
          var angle = character.hasOwnProperty("angle") ? character["angle"] : 0;
          var alpha = character.hasOwnProperty("alpha") ? character["alpha"] : 0;
          var isHidden = character.hasOwnProperty("isHidden") ? character["isHidden"] : false;
          var shouldBringToTop = character.hasOwnProperty("shouldBringToTop") ? character["shouldBringToTop"] : false;
          var shouldSendToBack = character.hasOwnProperty("shouldSendToBack") ? character["shouldSendToBack"] : false;
          var texts = character.hasOwnProperty("texts") ? character["texts"] : [];
          var sound = character.hasOwnProperty("sound") ? character["sound"] : [];
          self.createCharacterSpriteFromCache(x, y, name, anchorX, anchorY, scaleX, scaleY, angle, rotation, pivotX, pivotY, kind, autoAdjust, uniquename, alpha, isHidden, shouldBringToTop, shouldSendToBack, texts, sound);
        }
      });
    }

    if (self.game.currentPage.characterDragonBones !== null && self.game.currentPage.characterDragonBones.length > 0) {
      _.each(self.game.currentPage.characterDragonBones, function (dragonBone) {

        if (dragonBone !== null) {
          var x = dragonBone.hasOwnProperty("x") ? dragonBone["x"] : 0;
          var y = dragonBone.hasOwnProperty("y") ? dragonBone["y"] : 0;
          var armatureJSONKey = dragonBone["loaderConfiguration"]["armatureJSONKey"];
          var armatureImageKey = dragonBone["loaderConfiguration"]["armatureImageKey"];
          var atlasKey = dragonBone["loaderConfiguration"]["atlasKey"];
          var skeletonKey = dragonBone["loaderConfiguration"]["skeletonKey"];

          var pivotX = dragonBone.hasOwnProperty("pivotX") ? dragonBone["pivotX"] : 0;
          var pivotY = dragonBone.hasOwnProperty("pivotY") ? dragonBone["pivotY"] : 0;

          var scaleX = dragonBone.hasOwnProperty("scaleX") ? dragonBone["scaleX"] : 0;
          var scaleY = dragonBone.hasOwnProperty("scaleY") ? dragonBone["scaleY"] : 0;

          var rotation = dragonBone.hasOwnProperty("rotation") ? dragonBone["rotation"] : 0;
          var angle = dragonBone.hasOwnProperty("angle") ? dragonBone["angle"] : 0;
          var alpha = dragonBone.hasOwnProperty("alpha") ? dragonBone["alpha"] : 0;
          var uniquename = dragonBone.hasOwnProperty("uniquename") ? dragonBone["uniquename"] : null;
          var isHidden = dragonBone.hasOwnProperty("isHidden") ? dragonBone["isHidden"] : false;
          var kind = dragonBone.hasOwnProperty("kind") ? dragonBone["kind"] : 0;
          var shouldBringToTop = dragonBone.hasOwnProperty("shouldBringToTop") ? dragonBone["shouldBringToTop"] : 0;
          var shouldSendToBack = dragonBone.hasOwnProperty("shouldSendToBack") ? dragonBone["shouldSendToBack"] : 0;
          var defaultAnimationId = dragonBone["loaderConfiguration"]["defaultAnimationId"];
          var texts = dragonBone.hasOwnProperty("texts") ? dragonBone["texts"] : [];
          var sound = dragonBone.hasOwnProperty("sound") ? dragonBone["sound"] : [];
          self.addArmature(x, y, scaleX, scaleY, angle, rotation, pivotX, pivotY, skeletonKey, armatureJSONKey, armatureImageKey, atlasKey, kind, defaultAnimationId, uniquename, alpha, isHidden, shouldBringToTop, shouldSendToBack, texts, sound);
        }
      });
    }
  }

};

NarrateGameState.prototype.createCharacterSpriteFromCache = function (x, y, key, anchorX, anchorY, scaleX, scaleY, angle, rotation, pivotX, pivotY, kind, autoAdjust, uniquename, alpha, isHidden, shouldBringToTop, shouldSendToBack, texts, sound) {
  var self = this;
  self.character = new NarrateCharacterSprite(self.game, x, y, key, kind, self);
  self.character.uniquename = uniquename;
  self.charactersOnScreen.push(self.character);
  self.game.characterCountOnScreen++;

  self.character.anchor.set(anchorX, anchorY);
  self.character.scale.set(self.game.widthScaleFactor * scaleX, self.game.heightScaleFactor * scaleY);
  self.character.angle = angle;
  self.character.alpha = alpha;
  self.character.isHidden = isHidden;
  self.character.texts = texts;
  self.character.sound = sound;
  self.game.displayGroup.add(self.character);

  if (shouldBringToTop) {
    self.renderOnTopOfGroup = self.character;
  }

  if (shouldSendToBack) {
    self.renderOnBehindOfGroup = self.character;
  }
  //load texts, sounds and Fx
};

NarrateGameState.prototype.computeRecordingTimeCounters = function (delta) {
  var self = this;
  if (self.isRecording) {
    self.game.currentRecordingCounter += delta;
    if (self.game.currentRecordingCounter) {
      console.log('current recording counter:' + self.game.currentRecordingCounter);
    }
  }
};

NarrateGameState.prototype.computePlayTimeCounters = function (delta) {
  var self = this;
  if (self.inPlayMode()) {
    if (self.game.currentPlayCounter) {
      self.game.previousPlayCounter = self.game.currentPlayCounter;
    }
    self.game.currentPlayCounter += delta;
    console.log("computePlayTimeCounters:" + self.game.currentPlayCounter);
  }
};

NarrateGameState.prototype.update = function () {
  var self = this;
  //create timeline....
  if (self.lastUpdatedTimeInUpdate) {
    self.previousLastUpdateTimeInUpdate = self.lastUpdatedTimeInUpdate;
  }
  self.lastUpdatedTimeInUpdate = new Date();
  if (self.lastUpdatedTimeInUpdate && self.previousLastUpdateTimeInUpdate) {
    var delta = self.lastUpdatedTimeInUpdate.getTime() - self.previousLastUpdateTimeInUpdate.getTime();
    self.computeRecordingTimeCounters(delta);
    self.computePlayTimeCounters(delta);
  }

  //console.log('calling gamestate update');

  //self.firefilter.update();    
  dragonBones.animation.WorldClock.clock.advanceTime(0.02);
};

NarrateGameState.prototype.createBackGroundFromCache = function (x, y, name, anchorX, anchorY, scaleX, scaleY, uniquename, angle, rotation, alpha, texts, sound) {
  var self = this;
  self.background = new NarrateCharacterSprite(self.game, x, y, name, "background", self);
  self.background.uniquename = uniquename;
  self.background.anchor.set(anchorX, anchorY);
  self.background.scale.set(self.game.widthScaleFactor * scaleX, self.game.heightScaleFactor * scaleY);
  crea
  self.background.angle = angle;
  self.background.texts = texts;
  self.background.sound = sound;
  self.charactersOnScreen.push(self.background);
  self.game.world.sendToBack(self.background);
  //self.background.filters = [self.firefilter];
};

NarrateGameState.prototype.addArmature = function (x, y, scaleX, scaleY, angle, rotation, pivotX, pivotY, skeletonKey, armatureJSONKey, armatureImageKey, atlasKey, kind, defaultAnimationId, uniquename, alpha, isHidden, shouldBringToTop, shouldSendToBack, texts, sound) {
  var self = this;

  if (self.checkIfCacheContainsAllAssets(skeletonKey, armatureJSONKey, armatureImageKey, atlasKey)) {
    var skeletonJSON = self.game.cache.getJSON(skeletonKey);
    var atlasJson = self.game.cache.getJSON(armatureJSONKey);
    var texture = self.game.cache.getImage(armatureImageKey);

    var randomX = x;
    var randomY = y;

    console.log('ready to re-create dragonbone sprite');
    var armature = self.createDragonBoneArmature(defaultAnimationId, skeletonJSON, atlasJson, texture, atlasKey, randomX, randomY, uniquename);
    var armatureDisplay = armature.getDisplay();
    armatureDisplay.uniquename = uniquename;
    armatureDisplay.x = x;
    armatureDisplay.y = y;
    armatureDisplay.pivot.x = pivotX;
    armatureDisplay.pivot.y = pivotY;
    armatureDisplay.scale.x = scaleX;
    armatureDisplay.scale.y = scaleY;
    armatureDisplay.angle = angle;
    armatureDisplay.isHidden = isHidden;
    armatureDisplay.alpha = alpha;
    armatureDisplay.armatureRef = armature;
    armatureDisplay.defaultAnimationId = defaultAnimationId;

    armatureDisplay.texts = texts;
    armatureDisplay.sound = sound;
    self.setArmatureReference(armature, armatureDisplay, kind);
    self.dragonsOnScreen.push(armatureDisplay);
    self.game.characterCountOnScreen++;
    self.game.displayGroup.add(armatureDisplay);
    if (shouldBringToTop) {
      self.renderOnTopOfGroup = armatureDisplay;
    }

    if (shouldSendToBack) {
      self.renderOnBehindOfGroup = armatureDisplay;
    }

    /*if (armatureDisplay.texts && armatureDisplay.texts.length > 0) {
      _.each(armatureDisplay.texts, function (text, index) {
        if (text && text.applied && text.displayText) {
          self.textEditor.render(armatureDisplay, armatureDisplay.x, armatureDisplay.y, index, self);
        }
      });
    }*/
  }
};

NarrateGameState.prototype.setArmatureReference = function (armature, armatureDisplay, kind) {
  var self = this;
  armatureDisplay.forEach(function (child) {
    child.parentArmature = armature;
    child.kind = kind;
    child.parentArmatureDisplay = armatureDisplay;
    child.uniquename = armatureDisplay.uniquename;
  });
};

NarrateGameState.prototype.createDragonBoneArmature = function (defaultAnimationId, skeletonJSON, atlasJson, texture, atlasKey, randomX, randomY, uniquename) {
  var self = this;
  defaultAnimationId = defaultAnimationId || '';

  if (skeletonJSON === undefined) {
    throw "Skeleton is required to create DragonBone Armature";
  }

  if (atlasJson === undefined) {
    throw "altasJson is required to create DragonBone Armature"
  }

  if (texture === undefined) {
    throw "texture is required to create DragonBone Armature"
  }

  if (atlasKey === undefined) {
    throw "atlasKey is required to create DragonBone Armature"
  }

  var partNames = [];
  if (atlasJson.frames !== undefined && atlasJson.frames != null) {
    partNames = _.pluck(atlasJson.frames, 'filename');
  }

  var config = {
    armatureName: skeletonJSON.name,
    skeletonId: skeletonJSON.armature[0].name,
    animationId: defaultAnimationId,
    atlasId: atlasKey,
    partsList: partNames
  };

  console.log(config);
  console.log(window.dragonBones);
  //var dragonBones = window.dragonBones;
  //load phaser dragonbone
  dragonBones.game = self.game;
  dragonBones.stageContext = this;
  dragonBones.stageContext.uniqueDragonName = uniquename;

  var armature = dragonBones.makeArmaturePhaser(config, skeletonJSON, atlasJson, texture);

  return armature;
};

NarrateGameState.prototype.checkIfCacheContainsAllAssets = function (skeletonKey, armatureJSONKey, armatureImageKey, atlasKey) {
  var self = this;
  var skeletonJSON = self.game.cache.getJSON(skeletonKey);
  var atlasJson = self.game.cache.getJSON(armatureJSONKey);
  var texture = self.game.cache.getImage(armatureImageKey);

  if (skeletonJSON && atlasJson && texture && atlasKey) {
    return true;
  }
  return false;
};

NarrateGameState.prototype.render = function () {
  var self = this;     
  self.game.debug.text(self.game.time.fps || '--', 200, 200, "#00ff00");   
};

NarrateGameState.prototype.showText = function (textData) {
  var self = this;
  console.log('received:' + textData);
  self.game.scope.$emit('game:showText', textData);

};

NarrateGameState.prototype.shutdown = function () {};

module.exports = NarrateGameState;
