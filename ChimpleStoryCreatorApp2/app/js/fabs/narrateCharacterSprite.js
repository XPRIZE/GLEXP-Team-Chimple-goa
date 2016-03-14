'use strict';
var HashMap = require('hashmap');
var _ = require('lodash')._;

var NarrateCharacterSprite = function (game, x, y, key, kind, context) {
  Phaser.Sprite.call(this, game, x, y, key);
  game.add.existing(this);
  this.kind = kind;
  this.context = context;
  this.recordDataMap = new HashMap();
  this.configureCharacterSprite();
};

NarrateCharacterSprite.prototype = Object.create(Phaser.Sprite.prototype);
NarrateCharacterSprite.prototype.constructor = NarrateCharacterSprite;

NarrateCharacterSprite.prototype.configureCharacterSprite = function () {
  var self = this;
  self.anchor.set(0.5);
  self.isHidden = false;
  self.alpha = 1;
  self.inputEnabled = false;
};

NarrateCharacterSprite.prototype.update = function () {
  var self = this;
  if (self.context && self.context.inPlayMode()) {

    var recordedValue = self.game.recordingManager.findNearestValue(self.uniquename, self.game.currentPlayCounter);
    if (recordedValue) {
      self.changeAttributes(recordedValue);
    };

    self.showTextEvent();

  }
};

NarrateCharacterSprite.prototype.showTextEvent = function () {
  var self = this;
  if (self.game.recordingManager.textRecordInformationMap) {
    var allTextKeys = self.game.recordingManager.textRecordInformationMap.keys();
    _.each(allTextKeys, function (key) {
      if (key > self.game.previousPlayCounter && key <= self.game.currentPlayCounter) {
        self.textMap = self.game.recordingManager.textRecordInformationMap.get(key);
        self.textData = self.textMap.get(self.game.CONFIGS.SP_EVENTS.TEXT_RECORDING);
        self.textData.prototype = HashMap.prototype;
        self.textData.constructor = HashMap.prototype.constructor;
        self.textData.__proto__ = HashMap.prototype;

        if (self.textData.has(self.uniquename)) {
          self.context.onPauseWhilePlaying.dispatch();
          self.context.showText(self.textData.get(self.uniquename));
        }
      }
    });
  }
};

NarrateCharacterSprite.prototype.changeAttributes = function (recordedValue) {
  var self = this;
  self.x = recordedValue.x * self.game.actualGameWidth;
  self.y = recordedValue.y * self.game.actualGameHeight;
  self.angle = recordedValue.angle;
  self.pivot.x = recordedValue.pivotX;
  self.pivot.y = recordedValue.pivotY;
  self.scale.x = recordedValue.scaleX * self.game.widthScaleFactor;
  self.scale.y = recordedValue.scaleY * self.game.heightScaleFactor;
  self.alpha = recordedValue.alpha;
  if (recordedValue.isHidden) {
    self.alpha = 0;
  }
  if (recordedValue.shouldBringToTop) {
    self.game.world.bringToTop(self);
    self.game.displayGroup.bringToTop(self);
  }

  if (recordedValue.shouldSendToBack) {
    self.game.world.sendToBack(self);
    self.game.displayGroup.sendToBack(self);
  }
};

module.exports = NarrateCharacterSprite;
