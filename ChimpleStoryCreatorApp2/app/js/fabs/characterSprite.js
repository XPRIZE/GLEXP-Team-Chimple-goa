'use strict';
var HashMap = require('hashmap');
var _ = require('lodash')._;
var AbstractParentSprite = require('./abstractParentSprite');

var CharacterSprite = function (game, x, y, key, kind, context) {
  AbstractParentSprite.call(this, game, x, y, key, context);
  console.log("center location x: " + game.world.centerX + " and y:" + game.world.centerY);
  console.log('creating sprite:' + key + "at location x: " + x + " and y:" + y);
  this.kind = kind;
  this.context = context;
  this.recordDataMap = new HashMap();
  this.configureCharacterSprite();
};

CharacterSprite.prototype = Object.create(AbstractParentSprite.prototype);
CharacterSprite.prototype.constructor = CharacterSprite;

CharacterSprite.prototype.configureCharacterSprite = function () {
  var self = this;
  self.anchor.set(0.5);
  //self.scale.setTo(self.game.widthScaleFactor, self.game.heightScaleFactor);
  self.isHidden = false;
  self.alpha = 1;
  self.inputEnabled = true;
  self.input.enableDrag();
  self.events.onInputDown.add(self.inputDown, self);
  self.events.onInputUp.add(self.inputUp, self);
  self.events.onDragStart.add(self.dragStart, self);
  self.events.onDragUpdate.add(self.dragUpdate, self);
  self.events.onDragStop.add(self.dragStopped, self);
};

CharacterSprite.prototype.update = function () {
  var self = this;
  if (self.context && self.context.inRecordingMode()) {
    if (self.uniquename === self.game.displayGroup.spriteBringToTopWhileRecording) {
      self.shouldBringToTop = true;
    } else {
      self.shouldBringToTop = false;
    }
    if (self.uniquename === self.game.displayGroup.spriteSendToBackWhileRecording) {
      self.shouldSendToBack = true;
    } else {
      self.shouldSendToBack = false;
    }

    var recordInfo = {
      'uniquename': self.uniquename,
      'x': self.x / self.game.actualGameWidth,
      'y': self.y / self.game.actualGameHeight,
      'pivotX': self.pivot.x,
      'pivotY': self.pivot.y,
      'scaleX': self.scale.x / self.game.widthScaleFactor,
      'scaleY': self.scale.y / self.game.heightScaleFactor,
      'angle': self.angle,
      'alpha': self.alpha,
      'isHidden': self.isHidden,
      'shouldBringToTop': self.shouldBringToTop,
      'shouldSendToBack': self.shouldSendToBack
    };
    self.recordDataMap.set(self.game.currentRecordingCounter, recordInfo);

  } else if (self.context && self.context.inPlayMode()) {
    console.log('1111111:' + self.context.inPlayMode());
    var recordedValue = self.game.recordingManager.findNearestValue(self.uniquename, self.game.currentPlayCounter);
    console.log('recordedvalue while playing:' + recordedValue + " at counter:" + self.game.currentPlayCounter);
    if (recordedValue) {
      self.changeAttributes(recordedValue);
    };

    self.showTextEvent();

  } else {
    self.alpha = self.isHidden ? 0.2 : 1;
  }
};

CharacterSprite.prototype.showTextEvent = function () {
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

CharacterSprite.prototype.changeAttributes = function (recordedValue) {
  var self = this;
  console.log('recorded Value:' + recordedValue.x + " " + recordedValue.y + " " + recordedValue.scaleX + " " + recordedValue.scaleY);
  self.x = recordedValue.x * self.game.actualGameWidth;
  self.y = recordedValue.y * self.game.actualGameHeight;
  self.angle = recordedValue.angle;
  self.pivot.x = recordedValue.pivotX;
  self.pivot.y = recordedValue.pivotY;
  self.scale.x = recordedValue.scaleX * self.game.widthScaleFactor;
  self.scale.y = recordedValue.scaleY * self.game.heightScaleFactor;
  self.alpha = recordedValue.alpha;
  if (recordedValue.shouldBringToTop) {
    self.game.world.bringToTop(self);
    self.game.displayGroup.bringToTop(self);
  }

  if (recordedValue.shouldSendToBack) {
    self.game.world.sendToBack(self);
    self.game.displayGroup.sendToBack(self);
  }
};

CharacterSprite.prototype.dragStart = function () {
  var self = this;
  self.isDragging = true;
};

CharacterSprite.prototype.dragUpdate = function (sprite, pointer, dragX, dragY, snapPoint) {
  var self = this;
  self.isDragging = true;
  self.lastDragX = pointer.x;
  self.lastDragY = pointer.y;

  var distanceFromLastUp = Phaser.Math.distance(self.game.input.activePointer.positionDown.x, self.game.input.activePointer.positionDown.y,
    self.game.input.activePointer.x, self.game.input.activePointer.y);

  if (distanceFromLastUp < 5) {
    self.isDragging = false;
  }
};

CharacterSprite.prototype.dragStopped = function () {
  var self = this;
  self.isDragging = false;
  //self.game.recordingManager.recordDrag(self);   
  self.onDragChange.dispatch(self.createDragInformation());
};

CharacterSprite.prototype.createDragInformation = function () {
  var self = this;
  var dragInfo = {
    "uniquename": self.uniquename,
    "x": self.lastDragX / self.game.actualGameWidth,
    "y": self.lastDragY / self.game.actualGameHeight,
    "pivotX": self.pivot.x,
    "pivotY": self.pivot.y,
    "autoAdjust": false
  };
  return dragInfo;
};

CharacterSprite.prototype.createAndScaleInformation = function () {
  var self = this;
  var dragInfo = {
    "uniquename": self.uniquename,
    "x": self.x / self.game.actualGameWidth,
    "y": self.y / self.game.actualGameHeight,
    "scaleX": self.scale.x / self.game.widthScaleFactor,
    "scaleY": self.scale.y / self.game.heightScaleFactor,
    "rotation": self.rotation,
    "angle": self.angle,
    "pivotX": self.pivot.x,
    "pivotY": self.pivot.y,
    "autoAdjust": false
  };
  return dragInfo;
};

CharacterSprite.prototype.createHideOrUnHideInformation = function () {
  var self = this;
  var dragInfo = {
    "uniquename": self.uniquename,
    "isHidden": self.isHidden,
    "alpha": self.alpha,
    "autoAdjust": false
  };

  return dragInfo;
};

CharacterSprite.prototype.inputDown = function () {
  var self = this;
  self.game.world.bringToTop(self);
  self.context.setSelectedSprite(self);

};

CharacterSprite.prototype.inputUp = function () {
  var self = this;
  if (!self.isDragging) {
    var data = {
      "parent": self,
      "phaserGameObject": self,
      "initialPivotX": self.pivot.x,
      "initialPivotY": self.pivot.y
    }
    self.showAttributeEditOverlay(data);
  }
  self.context.setDeselectedSprite(self);
};

CharacterSprite.prototype.updateScale = function (newScale) {
  var self = this;
  self.scale.setTo(newScale, newScale);
};

CharacterSprite.prototype.updateRotation = function (angle) {
  var self = this;
  self.rotation = angle * Math.PI / 180;
};

CharacterSprite.prototype.updateBringToTopInGroup = function () {
  var self = this;
  self.game.world.bringToTop(self);
  self.game.displayGroup.bringToTop(self);
  //Dispatch event to make self bring to top in among all objects in displayGroup

  if (self.game.gameStatus === self.game.CONFIGS.PRE_RECORDING) {
    //Record to Loki    
    var data = {
      "uniquename": self.uniquename,
      "shouldBringToTop": {
        "default": false,
        "matched": true
      },
      "shouldSendToBack": {
        "default": self.shouldSendToBack,
        "matched": false
      }
    };

    self.onBringToTopSignal.dispatch(data);

  }
  self.game.displayGroup.spriteBringToTopWhileRecording = self.uniquename;
};

CharacterSprite.prototype.updateSendToBackInGroup = function () {
  var self = this;
  self.game.world.sendToBack(self);
  self.game.displayGroup.sendToBack(self);
  console.log('mode:' + self.game.gameStatus);

  if (self.game.gameStatus === self.game.CONFIGS.PRE_RECORDING) {
    //Record to Loki    
    var data = {
      "uniquename": self.uniquename,
      "shouldSendToBack": {
        "default": false,
        "matched": true
      },
      "shouldBringToTop": {
        "default": self.shouldBringToTop,
        "matched": false
      }
    };

    self.onSendToBackSignal.dispatch(data);

  }
  self.game.displayGroup.spriteSendToBackWhileRecording = self.uniquename;
}

CharacterSprite.prototype.updateHideOrUnHide = function () {
  var self = this;
  self.isHidden = !self.isHidden;
  self.alpha = self.alpha == 0 ? 1 : 0;
};

CharacterSprite.prototype.updatePivot = function (pivotX, pivotY) {
  var self = this;
  self.pivot.x = pivotX;
  self.pivot.y = pivotY;
};

module.exports = CharacterSprite;
