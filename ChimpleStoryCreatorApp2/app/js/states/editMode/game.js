'use strict';
var _ = require('lodash')._;
var CharacterSprite = require('../../fabs/characterSprite');

var PropertyOverlay = require('../../fabs/editOverlay');
var AttributeEditOverlay = require('../../fabs/attributeEditOverlay');

var TextEditor = require('../../misc/textEditor');
var TextSprite = require('../../fabs/textSprite');
var dragonBones = require('../../dragonBones/phaserDragonBones');

var GameState = function (game) {
  var self = this;
  self.game = game;
  self.background;
  self.game.characterCountOnScreen = 0;
  self.autoAdjustedCharacters = 0;
  self.bringToTopObj = null;
  self.sendToBackObj = null;
};

GameState.prototype = Object.create(Phaser.State.prototype);
GameState.prototype.constructor = GameState;

GameState.prototype.init = function (args) {
  var self = this;
  self.registerDispatchSignals();
  self.game.displayGroup = self.game.add.group();
};

GameState.prototype.registerDispatchSignals = function () {
  var self = this;
  self.onRecordingPauseSignal = new Phaser.Signal();
  self.onRecordingPauseSignal.add(self.pause, self);

  self.onRecordingResumeSignal = new Phaser.Signal();
  self.onRecordingResumeSignal.add(self.resume, self);

  self.onBringToTopWithInDisplayGroupSignal = new Phaser.Signal();
  self.onBringToTopWithInDisplayGroupSignal.add(self.updateInDisplayGroup, self);

  self.onSpecialAttrRecordSignal = new Phaser.Signal();
  self.onSpecialAttrRecordSignal.add(self.recordSpecialAttr, self);

  self.onResumeFromPauseWhilePlaying = new Phaser.Signal();
  self.onResumeFromPauseWhilePlaying.add(self.resumeFromPauseWhilePlaying, self);

  self.onPauseWhilePlaying = new Phaser.Signal();
  self.onPauseWhilePlaying.add(self.pauseWhilePlaying, self);

  self.onSyncUpdate = new Phaser.Signal();
  self.onSyncUpdate.add(self.syncUpdates, self);

  self.onRecordingStartSignal = new Phaser.Signal();
  self.onSyncRecordedInformation = new Phaser.Signal();
  self.onRecordingStopSignal = new Phaser.Signal();
  self.game.onResume.add(self.onGameResume, self);
  self.game.onPause.add(self.onGamePause, self);

};

GameState.prototype.onGamePause = function () {};

GameState.prototype.onGameResume = function () {
  var self = this;
  self.lastUpdatedTimeInUpdate = new Date();
};

GameState.prototype.syncUpdates = function (sprite, recordedInfo) {
  //called to sync update information
  var self = this;
  console.log('received ' + recordedInfo + "from:" + sprite.uniquename + "at counter:" + self.currentCounter);
};

GameState.prototype.play = function (args) {
  var self = this;
  if (args.action === 'play') {
    self.doPlay();
  }
};

GameState.prototype.stop = function (args) {
  var self = this;
  if (args.action === 'stop') {
    self.doRecording();
  }
};

GameState.prototype.record = function (args) {
  var self = this;
  if (args.action === 'record') {
    var animationCollection = self.game.storageDB.getCollection(this.game.storage_config.animationCollection);
    _.each(animationCollection.data, function (animation, index) {
      if (animation && animation["storyId-pageId"] === (self.game.story.storyId + "-" + self.game.currentPage.pageId)) {
        animationCollection.data.splice(index, 1);
        self.game.storageDB.getDB().save();
      }
    });

    self.doRecording();
  }
};

GameState.prototype.create = function () {
  var self = this;
  self.charactersOnScreen = [];
  self.dragonsOnScreen = [];

  //initialize all editors
  self.textEditor = new TextEditor(self.game, self);

  _.remove(self.charactersOnScreen, function (n) {
    return n;
  });

  _.remove(self.dragonsOnScreen, function (n) {
    return n;
  });

  self.cursors = self.game.input.keyboard.createCursorKeys();

  //self.firefilter = self.game.add.filter('Fire', 800, 600);
  //self.firefilter.alpha = 0.0;

  self.renderOnTopOfGroup = null;
  self.renderOnBehindOfGroup = null;

  self.loadGame();

  if (!self.game.recordingManager.recordInformationMap) {
    self.game.recordingManager.loadRecordedSequence();
  }

  //construct one-time overlayDisplaySprite     
  self.attributeEditOverlayBitMap = self.game.make.bitmapData(self.game.width, self.game.height);
  self.attributeEditOverlayBitMap.draw(self.game.cache.getImage('backgroundOverlay'), 0, 0);
  self.attributeEditOverlayBitMap.alpha = 0.5;

  self.overlayDisplaySprite = self.game.add.sprite(0, self.game.height, self.attributeEditOverlayBitMap);
  self.overlayDisplaySprite.anchor.setTo(0, 0);
  self.overlayDisplaySprite.alpha = 0.5;
  self.overlayDisplaySprite.inputEnabled = true;

};

GameState.prototype.doRecording = function () {
  var self = this;
  if (self.isRecording) {
    self.stopRecording();
  } else {
    self.showPreRecordingOverlay();
  }
};

GameState.prototype.showPlayOverlay = function () {
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

GameState.prototype.doPlay = function () {
  var self = this;
  self.showPlayOverlay();
};

GameState.prototype.inPlayMode = function () {
  var self = this;

  if (self.isPauseWhilePlaying) {
    return false;
  }

  if (self.game.currentPlayCounter < self.game.currentRecordingCounter) {
    return true;
  }

  return false;
};

GameState.prototype.getPlayStartTime = function () {
  var self = this;
  if (self.isPlaying && self.playStartTime) {
    return self.playStartTime;
  };
};

GameState.prototype.startPlaying = function () {
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

GameState.prototype.startRecording = function () {
  var self = this;
  //Dispatch Signal Recording Started 
  self.onRecordingStartSignal.dispatch();

  self.recordingStartTime = new Date();
  console.log('recording starting at second: ' + self.recordingStartTime);

  //update game status to recording mode
  self.game.gameStatus = self.game.CONFIGS.RECORDING;
  self.hasRecording = false;
  self.isRecording = true;

  //set up time when recording starts
  self.lastUpdatedTimeInUpdate = self.recordingStartTime;
  self.game.currentRecordingCounter = 0;

  if (self.game.recordingManager) {
    self.game.recordingManager.resetMap();
  }

  self.game.scope.$emit('game:recordingStarted');
};

GameState.prototype.stopRecording = function () {
  var self = this;

  //update game status to pre-recording mode
  self.game.gameStatus = self.game.CONFIGS.PRE_RECORDING;
  self.isRecording = false;
  self.hasRecording = true;

  var recordingTime = self.game.currentRecordingCounter + 10; //in milliseconds
  console.log('recordingTime : ' + recordingTime);
  self.onSyncRecordedInformation.dispatch(recordingTime);
  self.onRecordingStopSignal.dispatch();
  if (!self.isRecording && !self.isPauseRecording && self.hasRecording) {
    self.game.scope.$emit('game:showPlay');
  }
};

GameState.prototype.recordSpecialAttr = function (args, gameObject) {
  var self = this;
  console.log('in recordSpecialAttr for game' + args);

  //Create anims data
  //Render on UI
  //Post Rendering - disappears in time if configured
  //later use custom serialize/de-serialize to create object tree
  var recordingEditor = args.class;
  if (args.class == 'TextEditor') {
    args.recordingType = self.game.CONFIGS
    self.textEditor.recordSpecialEvent.call(self.textEditor, gameObject, args, self.game.currentRecordingCounter);
    self.textEditor.renderSpecialEvent.call(self.textEditor, gameObject, args, self);
  }
};

GameState.prototype.applyText = function (args, textSprite, saveTextForSprite) {
  var self = this;
  //Record it
  self.recordTextPopup(args, textSprite, saveTextForSprite, self.game.currentRecordingCounter);
};

GameState.prototype.recordTextPopup = function (args, textSprite, saveTextForSprite, time) {
  var self = this;
  self.textEditor.save(saveTextForSprite, textSprite.selectedTextIndex, args, time);
  self.textEditor.render(saveTextForSprite, saveTextForSprite.x, saveTextForSprite.y, textSprite.selectedTextIndex, self);
  //create timer to remove text after 1 sec

  self.game.time.events.add(Phaser.Timer.SECOND, function () {
    self.textEditor.textNode.destroy();
  }, self);

};

GameState.prototype.updateText = function (args, gameObject) {
  var self = this;
  //Record it  
  self.textEditor.updateText(gameObject, args);
};

GameState.prototype.updateAttribute = function (args, gameObject) {
  var self = this;
  //Record it  
  self.textEditor.updateAttribute(gameObject, args);

};

GameState.prototype.initiateSyncOperation = function (totalRecordingTime) {
  var self = this;
  _.each(self.charactersOnScreen, function (sprite) {
    sprite.game = self.game;
    if (sprite && sprite.syncRecordedInformation && (typeof sprite.syncRecordedInformation === "function")) {
      sprite.syncRecordedInformation(totalRecordingTime);
    }

  });

  _.each(self.dragonsOnScreen, function (group) {
    if (group.children && group.children.length > 0) {
      var child = group.children[0];
      if (child && child.syncRecordedInformation && (typeof child.syncRecordedInformation === "function")) {
        child.syncRecordedInformation(totalRecordingTime);
      }
    }
  });
};

GameState.prototype.showPreRecordingOverlay = function () {
  var self = this;
  var preRecordingOverlay = self.game.add.bitmapData(self.game.width - 50, self.game.height - 50);
  preRecordingOverlay.ctx.fillStyle = '#fff';
  preRecordingOverlay.ctx.fillRect(50, 50, self.game.width - 50, self.game.height - 50);

  //Sprite for overlay
  var recordingPanel = self.add.sprite(0, self.game.height, preRecordingOverlay);
  recordingPanel.alpha = 0.8;
  recordingPanel.inputEnabled = true;

  var overlayTween = self.add.tween(recordingPanel);
  overlayTween.to({ y: 50 }, 1000);

  overlayTween.onComplete.add(function () {
    var style = { font: '50px Arial', fill: '#fff' };
    var preRecordMessage = self.game.add.text(self.game.width / 2, self.game.height / 2, 'Recording Starting in ...', style);
    preRecordMessage.anchor.setTo(0.5);
    var remainingTime = 3;
    var timerEvent = self.game.time.events.loop(Phaser.Timer.SECOND * 1, function () {
      preRecordMessage.text = remainingTime;
      remainingTime--;

      if (remainingTime == -1) {
        preRecordMessage.destroy();
        recordingPanel.destroy();
        self.game.time.events.remove(timerEvent);
        self.startRecording();
      }
    }, self);

  }, self);

  overlayTween.start();

};

GameState.prototype.resumeFromPauseWhilePlaying = function () {
  var self = this;
  self.isPauseWhilePlaying = false;
  self.game.gameStatus = self.game.CONFIGS.PLAYING;
};

GameState.prototype.pauseWhilePlaying = function () {
  var self = this;
  self.isPauseWhilePlaying = true;
};

GameState.prototype.pause = function () {
  var self = this;
  if (self.isRecording) {
    self.isRecording = false;
    self.isPauseRecording = true;
    self.game.scope.$emit('game:recordingPaused');
    console.log('updated pauseStart key should be :' + self.game.currentRecordingCounter);
  }
};

GameState.prototype.resume = function () {
  var self = this;
  if (self.isPauseRecording) {
    console.log('game resumed from pause to recording state:');
    self.game.scope.$emit('game:recordingStarted');
    self.isRecording = true;
    self.isPauseRecording = false;
  }
};

GameState.prototype.loadGame = function () {
  var self = this;
  self.game.story = self.game.storageDB.findStoryId(self.game.storage_config.storiesCollection, self.game.scope.storyId);
  console.log('story:' + self.game.story);
  self.game.currentPage = _.find(self.game.story.pages, function (page) {
    return page.pageId === self.game.scope.pageId;
  });

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

        //if (scaleX < self.game.widthScaleFactor) {
        //scaleX = self.game.widthScaleFactor;
        //}
        var scaleY = bInfo.hasOwnProperty("scaleY") ? bInfo["scaleY"] : 0;

        //if (scaleY < self.game.heightScaleFactor) {
        //scaleY = self.game.heightScaleFactor;
        //}

        var uniquename = bInfo.hasOwnProperty("uniquename") ? bInfo["uniquename"] : '';
        var angle = bInfo.hasOwnProperty("angle") ? bInfo["angle"] : 0;
        var rotation = bInfo.hasOwnProperty("rotation") ? bInfo["rotation"] : 0;
        var alpha = bInfo.hasOwnProperty("alpha") ? bInfo["alpha"] : 0;
        var texts = bInfo.hasOwnProperty("texts") ? bInfo["texts"] : [];
        var sound = bInfo.hasOwnProperty("sound") ? bInfo["sound"] : [];
        x = x * self.game.actualGameWidth;
        y = y * self.game.actualGameHeight;
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
          /*if (scaleX != self.game.widthScaleFactor) {
            scaleX = self.game.widthScaleFactor;
          }*/
          //scaleX = scaleX * self.game.widthScaleFactor;
          var scaleY = character.hasOwnProperty("scaleY") ? character["scaleY"] : 0;

          /*if (scaleY != self.game.heightScaleFactor) {
            scaleY = self.game.heightScaleFactor;
          }*/
          //scaleY = scaleY * self.game.heightScaleFactor;

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
          x = x * self.game.actualGameWidth;
          y = y * self.game.actualGameHeight;

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
  if (self.renderOnTopOfGroup) {
    self.game.displayGroup.bringToTop(self.renderOnTopOfGroup);
    self.game.displayGroup.spriteBringToTopWhileRecording = self.renderOnTopOfGroup.uniquename;
  }

  if (self.renderOnBehindOfGroup) {
    self.game.displayGroup.sendToBack(self.renderOnBehindOfGroup);
    self.game.displayGroup.spriteSendToBackWhileRecording = self.renderOnTopOfGroup.uniquename;
  }
};

GameState.prototype.createCharacterSpriteFromCache = function (x, y, key, anchorX, anchorY, scaleX, scaleY, angle, rotation, pivotX, pivotY, kind, autoAdjust, uniquename, alpha, isHidden, shouldBringToTop, shouldSendToBack, texts, sound) {
  var self = this;
  self.character = new CharacterSprite(self.game, x, y, key, kind, self);
  self.character.uniquename = uniquename;
  self.charactersOnScreen.push(self.character);
  self.game.characterCountOnScreen++;

  self.character.anchor.set(anchorX, anchorY);
  //self.character.scale.set(scaleX, scaleY);
  self.character.scale.set(self.game.widthScaleFactor * scaleX, self.game.heightScaleFactor * scaleY);
  self.character.angle = angle;
  self.character.alpha = alpha;
  self.character.isHidden = isHidden;
  self.character.autoAdjust = autoAdjust;
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

  /*if(self.character.texts && self.character.texts.length > 0) {                
      _.each(self.character.texts, function(text, index) {
          if(text && text.applied && text.displayText) {
              self.textEditor.render(self.character, self.character.x, self.character.y, index, self);        
          }
      });
  }*/

  self.game.scope.$emit('game:enableRecording');
};

GameState.prototype.computeRecordingTimeCounters = function (delta) {
  var self = this;
  if (self.isRecording) {
    self.game.currentRecordingCounter += delta;
    if (self.game.currentRecordingCounter) {
      console.log('current recording counter:' + self.game.currentRecordingCounter);
    }
  }
};

GameState.prototype.computePlayTimeCounters = function (delta) {
  var self = this;
  if (self.inPlayMode()) {
    if (self.game.currentPlayCounter) {
      self.game.previousPlayCounter = self.game.currentPlayCounter;
    }
    self.game.currentPlayCounter += delta;
    console.log("computePlayTimeCounters:" + self.game.currentPlayCounter);
  }
};

GameState.prototype.update = function () {
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

GameState.prototype.createBackGroundFromCache = function (x, y, name, anchorX, anchorY, scaleX, scaleY, uniquename, angle, rotation, alpha, texts, sound) {
  var self = this;
  self.background = new CharacterSprite(self.game, x, y, name, "background", self);
  self.background.uniquename = uniquename;
  self.background.anchor.set(anchorX, anchorY);
  self.background.scale.set(self.game.widthScaleFactor * scaleX, self.game.heightScaleFactor * scaleY);
  self.background.angle = angle;
  self.background.texts = texts;
  self.background.sound = sound;
  self.charactersOnScreen.push(self.background);
  self.game.world.sendToBack(self.background);
  //self.background.filters = [self.firefilter];
  self.game.scope.$emit('game:enableRecording');
};

GameState.prototype.addArmature = function (x, y, scaleX, scaleY, angle, rotation, pivotX, pivotY, skeletonKey, armatureJSONKey, armatureImageKey, atlasKey, kind, defaultAnimationId, uniquename, alpha, isHidden, shouldBringToTop, shouldSendToBack, texts, sound) {
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
    //self.game.world.add(armatureDisplay);
    self.game.displayGroup.add(armatureDisplay);
    if (shouldBringToTop) {
      self.renderOnTopOfGroup = armatureDisplay;
    }

    if (shouldSendToBack) {
      self.renderOnBehindOfGroup = armatureDisplay;
    }

    if (armatureDisplay.texts && armatureDisplay.texts.length > 0) {
      _.each(armatureDisplay.texts, function (text, index) {
        if (text && text.applied && text.displayText) {
          self.textEditor.render(armatureDisplay, armatureDisplay.x, armatureDisplay.y, index, self);
        }
      });
    }
    self.game.scope.$emit('game:enableRecording');

  }
};

GameState.prototype.setArmatureReference = function (armature, armatureDisplay, kind) {
  var self = this;
  armatureDisplay.forEach(function (child) {
    child.parentArmature = armature;
    child.kind = kind;
    child.parentArmatureDisplay = armatureDisplay;
    child.uniquename = armatureDisplay.uniquename;
  });
};

GameState.prototype.createDragonBoneArmature = function (defaultAnimationId, skeletonJSON, atlasJson, texture, atlasKey, randomX, randomY, uniquename) {
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

GameState.prototype.checkIfCacheContainsAllAssets = function (skeletonKey, armatureJSONKey, armatureImageKey, atlasKey) {
  var self = this;
  var skeletonJSON = self.game.cache.getJSON(skeletonKey);
  var atlasJson = self.game.cache.getJSON(armatureJSONKey);
  var texture = self.game.cache.getImage(armatureImageKey);

  if (skeletonJSON && atlasJson && texture && atlasKey) {
    return true;
  }
  return false;
};

GameState.prototype.adjustCharacterOnScreen = function (character) {
  var self = this;

  if (!character.autoAdjust) {
    return;
  };

  var xPos, yPos;

  self.autoAdjustedCharacters++;

  yPos = character.height / 2 + 30;
  if (self.autoAdjustedCharacters % 2 != 0) {
    xPos = character.width / 2 + self.autoAdjustedCharacters / 2 * 20;
  } else {
    xPos = (self.game.width - character.width / 2) - (self.autoAdjustedCharacters / 2 - 1) * 20;
  }
  character.x = xPos;
  character.y = yPos;
};

GameState.prototype.inputDownCallBack = function (obj) {

};

GameState.prototype.inputUpCallBack = function (obj) {
  var self = this;
  self.overlay = new PropertyOverlay(self.game, self, obj);
  self.obj = obj;
};

GameState.prototype.setSelectedSprite = function (obj) {
  var self = this;
  self.curSelectedCharacterSprite = obj;
  //console.log(' 11111 setSelectedSprite' + self.curSelectedCharacterSprite);
};

GameState.prototype.setDeselectedSprite = function (obj) {
  var self = this;
  self.curSelectedCharacterSprite = null;
  //console.log('deselected curSelectedCharacterSprite');
};

GameState.prototype.createCharacterEditOverlay = function (obj) {
  var self = this;
};

GameState.prototype.inRecordingMode = function () {
  var self = this;
  return self.isRecording;
};

GameState.prototype.inPauseMode = function () {
  var self = this;
  return self.isPauseRecording;
};

GameState.prototype.render = function () {
  var self = this;     
  self.game.debug.text(self.game.time.fps || '--', 200, 200, "#00ff00");   
};

GameState.prototype.showText = function (textData) {
  var self = this;
  console.log('received:' + textData);
  self.game.scope.$emit('game:showText', textData);

};

GameState.prototype.showAttributeEditOverlay = function (data) {
  var self = this;
  self.overlay = new AttributeEditOverlay(self, self.game, data);
};

GameState.prototype.updateInDisplayGroup = function (data) {

};

GameState.prototype.shutdown = function () {
  //clean up when GameState is shutting down to help GC
  this.overlay = null;
  this.overlayDisplaySprite = null;
};

module.exports = GameState;
