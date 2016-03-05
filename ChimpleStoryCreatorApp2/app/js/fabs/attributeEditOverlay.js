'use strict';
var _ = require('lodash')._;

var ATTR_CONFIGS = {
  FIXED_HANDLER_RADIUS: 6,
  DRAG_HANDLER_RADIUS: 18,
  DISPLAY_ADJUSTMENT_ANGLE: 90,
  SCALE_ADJUSTMENT_FACTOR: 100,
  MAX_SCALE_LIMIT: 3.5,
  MIN_SCALE_LIMIT: 0.5,
  BASE_SCALE: 1.0,
  APPEARANCE_OFFSET: 60,
  APPEARANCE_GAP: 20,
  APPEARANCE_WIDTH: 40
};

var AttributeEditOverlay = function (currentState, game, options) {
  this.game = game;
  this.currentState = currentState;
  this.isOpen = false;
  this.fixedHandlerRadius = this.game.height / ATTR_CONFIGS.FIXED_HANDLER_RADIUS;
  this.dragHandlerRadius = this.game.height / ATTR_CONFIGS.DRAG_HANDLER_RADIUS;
  this.configureOverlay(options);
};

AttributeEditOverlay.prototype = Object.create(Object.prototype);
AttributeEditOverlay.prototype.constructor = AttributeEditOverlay;

AttributeEditOverlay.prototype.configureOverlay = function (data) {
  var self = this;
  self.parentObject = data.parent;
  self.initialPivotX = data.initialPivotX;
  self.initialPivotY = data.initialPivotY;
  self.phaserGameObject = data.phaserGameObject;

  self.initialScale = self.phaserGameObject.scale.x;
  self.baseScale = ATTR_CONFIGS.BASE_SCALE * self.game.widthScaleFactor;

  self.createOverlay();
};

AttributeEditOverlay.prototype.createOverlay = function () {
  var self = this;

  //Dispatch Pause Recording Signal if RECORDING MODE    
  if (self.game.gameStatus === self.game.CONFIGS.RECORDING) {
    self.currentState.onRecordingPauseSignal.dispatch();
  }

  self.dynamicCircle = self.game.add.graphics(0, 0);
  self.currentState.overlayDisplaySprite.tint = '#00ff00';
  self.currentState.overlayDisplaySprite.alpha = 0.5;
  self.currentState.overlayDisplaySprite.inputEnabled = true;

  self.updateOnScreenObjects();

  if (self.parentObject.kind !== 'background') {
    self.game.world.bringToTop(self.phaserGameObject);
  }

  self.currentState.overlayDisplaySprite.events.onInputDown.add(function () {
    //resume game from pause so recording starts    
    //Dispatch Pause Recording Signal if RECORDING MODE    
    if (self.game.gameStatus === self.game.CONFIGS.RECORDING) {
      self.currentState.onRecordingResumeSignal.dispatch();
    }
    self.closeOverlay();
  }, self);

  //overlay raising tween animation
  self.editOverlayPanelCreationTween = self.game.add.tween(self.currentState.overlayDisplaySprite);

  self.editOverlayPanelCreationTween.onComplete.add(function () {
    self.createFixedHandler(0.8, 0xFFFFFF, 1.5);
    self.createDragHandler(0.8, 0xFFFFFF, 1.5);
    self.createAppearanceEditor();
  }, self);

  self.editOverlayPanelCreationTween.to({ y: 0 }, 10);
  self.editOverlayPanelCreationTween.start();
};

AttributeEditOverlay.prototype.updateOnScreenObjects = function () {
  var self = this;
  self.phaserGameObject.inputEnabled = false;
  if (!(self.phaserGameObject instanceof(Phaser.Group))) {
    self.phaserGameObject.input.disableDrag();
  }
};

AttributeEditOverlay.prototype.createFixedHandler = function (alpha, color, lineWidth) {
  var self = this;
  var graphics = self.game.add.graphics(0, 0);
  graphics.lineStyle(lineWidth, color, alpha);
  graphics.drawCircle(0, 0, 2 * self.fixedHandlerRadius);

  //draw line across circle

  self.drawHorizontalLineAroundCircleOnGraphics(graphics, self.fixedHandlerRadius, 0, 5);
  self.drawHorizontalLineAroundCircleOnGraphics(graphics, self.fixedHandlerRadius, 45, 5);
  self.drawHorizontalLineAroundCircleOnGraphics(graphics, self.fixedHandlerRadius, 90, 5);
  self.drawHorizontalLineAroundCircleOnGraphics(graphics, self.fixedHandlerRadius, 135, 5);
  self.drawHorizontalLineAroundCircleOnGraphics(graphics, self.fixedHandlerRadius, 180, 5);
  self.drawHorizontalLineAroundCircleOnGraphics(graphics, self.fixedHandlerRadius, 225, 5);
  self.drawHorizontalLineAroundCircleOnGraphics(graphics, self.fixedHandlerRadius, 270, 5);
  self.drawHorizontalLineAroundCircleOnGraphics(graphics, self.fixedHandlerRadius, 315, 5);
  self.drawHorizontalLineAroundCircleOnGraphics(graphics, self.fixedHandlerRadius, 360, 5);

  self.fixedHandlerSprite = self.game.add.sprite(self.phaserGameObject.x, self.phaserGameObject.y, graphics.generateTexture());
  self.game.world.bringToTop(self.fixedHandlerSprite);
  self.fixedHandlerSprite.anchor.set(0.5);
  self.fixedHandlerSprite.inputEnabled = false;
  graphics.destroy();
};

AttributeEditOverlay.prototype.computePointOnCircle = function (radius, angle, lineOffSet) {
  var self = this;
  var xPoint = (radius + lineOffSet) * Math.cos(angle * Math.PI / 180);
  var yPoint = (radius + lineOffSet) * Math.sin(angle * Math.PI / 180);

  return new Phaser.Point(xPoint, yPoint);
};

AttributeEditOverlay.prototype.drawHorizontalLineAroundCircleOnGraphics = function (graphics, radius, angle, lineOffSet) {
  var self = this;
  var p1 = self.computePointOnCircle(radius, angle, lineOffSet);
  var p2 = self.computePointOnCircle(radius, angle, -lineOffSet);
  graphics.moveTo(p1.x, p1.y);
  graphics.lineTo(p2.x, p2.y);
};

AttributeEditOverlay.prototype.createDragHandler = function (alpha, color, lineWidth) {
  var self = this;
  var graphicsDrag = self.game.add.graphics(0, 0);
  graphicsDrag.lineStyle(lineWidth, color, alpha);
  graphicsDrag.drawCircle(0, 0, 2 * self.dragHandlerRadius);

  var xPoint = 0;
  var yPoint = 0;
  var initialDistance = 0;
  if (self.initialScale != self.baseScale) {
    initialDistance = (self.initialScale - self.baseScale) * ATTR_CONFIGS.SCALE_ADJUSTMENT_FACTOR + self.fixedHandlerRadius;
    xPoint = (initialDistance * Math.cos((self.phaserGameObject.angle + ATTR_CONFIGS.DISPLAY_ADJUSTMENT_ANGLE) * Math.PI / 180));
    yPoint = (initialDistance * Math.sin((self.phaserGameObject.angle + ATTR_CONFIGS.DISPLAY_ADJUSTMENT_ANGLE) * Math.PI / 180));
    self.refresh(initialDistance);
  } else {
    xPoint = (self.fixedHandlerRadius * Math.cos((self.phaserGameObject.angle + ATTR_CONFIGS.DISPLAY_ADJUSTMENT_ANGLE) * Math.PI / 180));
    yPoint = (self.fixedHandlerRadius * Math.sin((self.phaserGameObject.angle + ATTR_CONFIGS.DISPLAY_ADJUSTMENT_ANGLE) * Math.PI / 180));
  }

  self.dragHandlerSprite = self.game.add.sprite(self.fixedHandlerSprite.x + xPoint, self.fixedHandlerSprite.y + yPoint, graphicsDrag.generateTexture());
  self.game.world.bringToTop(self.dragHandlerSprite);
  self.dragHandlerSprite.anchor.setTo(0.5);
  self.dragHandlerSprite.inputEnabled = true;
  self.dragHandlerSprite.input.enableDrag();
  self.dragHandlerSprite.angle = self.phaserGameObject.angle;
  self.dragHandlerSprite._click = 0;
  //self.dragHandlerSprite.input.enableSnap(20, 20, false, true);

  self.dragHandlerSprite._clickScale = new Phaser.Point(1 * self.game.widthScaleFactor, 1 * self.game.widthScaleFactor);
  self.dragHandlerSprite.input.useHandCursor = true;
  self.dragHandlerSprite.input.bringToTop = true;
  self.dragHandlerSprite.events.onInputDown.add(self.onDragHandlerInputDown, self);
  self.dragHandlerSprite.events.onInputUp.add(self.onDragHandlerInputUp, self);

  graphicsDrag.destroy();
};

AttributeEditOverlay.prototype.refresh = function (distance) {
  var self = this;
  self.dynamicCircle.lineStyle(1.5, 0xFFFFFF, 0.6);
  self.game.world.bringToTop(self.dynamicCircle);
  self.dynamicCircle.drawCircle(self.fixedHandlerSprite.x, self.fixedHandlerSprite.y, 2 * distance);
};

AttributeEditOverlay.prototype.closeOverlay = function () {
  var self = this;
  self.phaserGameObject.inputEnabled = true;

  if (self.parentObject.kind === "background") {
    self.game.world.sendToBack(self.phaserGameObject);
  }

  self.fixedHandlerSprite.destroy();
  self.dragHandlerSprite.destroy();
  self.dynamicCircle.destroy();
  self.editorGroup.destroy();

  //overlay raising tween animation
  self.editOverlayPanelHideTween = self.game.add.tween(self.currentState.overlayDisplaySprite);

  self.editOverlayPanelHideTween.to({ x: 0, y: self.game.height }, 10);
  self.editOverlayPanelHideTween.start();

  if (!(self.phaserGameObject instanceof(Phaser.Group))) {
    self.phaserGameObject.input.enableDrag();
  }
};

//Appearance Editor

AttributeEditOverlay.prototype.createAppearanceEditor = function () {
  var self = this;
  var position = self.dragHandlerSprite.x >= self.game.world.centerX ? -1 : 1;
  var offset = ATTR_CONFIGS.APPEARANCE_OFFSET;
  var gapOffSet = ATTR_CONFIGS.APPEARANCE_GAP;
  var spriteWidth = ATTR_CONFIGS.APPEARANCE_WIDTH;

  self.editorGroup = self.game.add.group();
  var keys = [];

  if (self.kind !== "background") {
    keys = ["bringtop", "sendback", "hide", "settings", "recycle_bin"];
  } else {
    keys = ["bringtop", "sendback", "hide", "settings", "recycle_bin"];
  }

  for (var i = 0; i < keys.length; i++) {
    if (position > 0) {
      offset = self.game.width - (5 * spriteWidth) - 3 * gapOffSet;
      self.createAttributeModifier(offset + i * (spriteWidth + gapOffSet), self.game.height - 50, keys[i], self.editorGroup);
    } else {
      self.createAttributeModifier(offset + i * (spriteWidth + gapOffSet), self.game.height - 50, keys[i], self.editorGroup);
    }

  }
};

AttributeEditOverlay.prototype.createAttributeModifier = function (x, y, type, group) {
  var self = this;
  var sprite = self.game.add.sprite(x, y, type);
  sprite.inputEnabled = true;
  sprite.anchor.setTo(0.5);
  sprite.input.useHandCursor = true;
  sprite.input.bringToTop = true;
  sprite.input.disableDrag();
  sprite.events.onInputOver.add(self.scaleIcon, self);
  sprite.events.onInputOut.add(self.deScaleIcon, self);
  sprite.events.onInputDown.add(self.performAttributeChange, self);
  group.add(sprite);
};

//UI Evnet Handler

AttributeEditOverlay.prototype.onDragHandlerInputDown = function (sprite, pointer) {
  var self = this;
  self.dragHandlerSprite._click = new Phaser.Point(pointer.x, pointer.y);
  self.dynamicCircle.clear();
  self.editorGroup.visible = false;
  self.game.input.addMoveCallback(self.onDragHandlerInputDrag, self);
};

AttributeEditOverlay.prototype.onDragHandlerInputDrag = function (pointer, x, y, down) {
  var self = this;
  //resume game from pause so recording starts    
  //Dispatch Pause Recording Signal if RECORDING MODE    
  if (self.game.gameStatus === self.game.CONFIGS.RECORDING) {
    self.currentState.onRecordingResumeSignal.dispatch();
  }

  self.dynamicCircle.clear();
  var rotation = self.game.physics.arcade.angleToPointer(self.fixedHandlerSprite, pointer);
  var angle = rotation * 180 / Math.PI - ATTR_CONFIGS.DISPLAY_ADJUSTMENT_ANGLE;
  self.parentObject.updateRotation(angle);
  var difference = 0;

  var distance = self.game.physics.arcade.distanceBetween(self.fixedHandlerSprite, self.dragHandlerSprite);

  if (distance <= self.fixedHandlerRadius) {
    difference = distance - self.fixedHandlerRadius;
  } else {
    difference = distance - self.fixedHandlerRadius;
  }

  var scaleX = self.dragHandlerSprite._clickScale.x + difference / 100;
  var increasedScaleX = scaleX;

  scaleX = scaleX >= ATTR_CONFIGS.MAX_SCALE_LIMIT ? ATTR_CONFIGS.MAX_SCALE_LIMIT : scaleX;
  scaleX = scaleX <= ATTR_CONFIGS.MIN_SCALE_LIMIT ? ATTR_CONFIGS.MIN_SCALE_LIMIT : scaleX;
  self.parentObject.updateScale(scaleX);
  //self.refresh(distance);
  if (increasedScaleX >= ATTR_CONFIGS.MIN_SCALE_LIMIT && increasedScaleX <= ATTR_CONFIGS.MAX_SCALE_LIMIT) {
    self.refresh(distance);
  }
};

AttributeEditOverlay.prototype.onDragHandlerInputUp = function (sprite, pointer) {
  var self = this;
  self.game.input.deleteMoveCallback(self.onDragHandlerInputDrag, self);
  self.game.time.events.add(Phaser.Timer.SECOND * 0.2, function () {
    self.parentObject.updatePivot(self.initialPivotX, self.initialPivotY);
    self.parentObject.recordScaleAndAngle();
    self.closeOverlay();
  }, self);
};

// Event Handling on Appearance Settings

AttributeEditOverlay.prototype.scaleIcon = function (sprite, pointer) {
  var self = this;
  sprite.scale.setTo(sprite.scale.x * 1.2);
};

AttributeEditOverlay.prototype.deScaleIcon = function (sprite, pointer) {
  var self = this;
  sprite.scale.setTo(sprite.scale.x / 1.2);
};

AttributeEditOverlay.prototype.createSettingsOverlay = function () {
  var self = this;

  //Emit Single to Phaser to create Setting Edit Grid implementation

  //Dispatch Pause Recording Signal if RECORDING MODE    
  if (self.game.gameStatus === self.game.CONFIGS.RECORDING) {
    self.currentState.onRecordingPauseSignal.dispatch();
  }

  var settingsData = {
    "parent": self.parentObject,
    "phaserGameObject": self.phaserGameObject,
    "attributeEditOverlay": self
  };

  self.game.scope.$emit('change:settings', settingsData);
};

//fix bring to top and send to back issues - storing functions instead of properties
AttributeEditOverlay.prototype.performAttributeChange = function (sprite, pointer) {
  var self = this;
  if (sprite.key === "settings") {
    self.createSettingsOverlay();
  } else if (sprite.key === "bringtop") {
    self.parentObject.updateBringToTopInGroup();
    self.game.time.events.add(Phaser.Timer.SECOND * 0.2, function () {
      self.closeOverlay();
      if (self.game.gameStatus === self.game.CONFIGS.RECORDING) {
        self.currentState.onRecordingResumeSignal.dispatch();
      }
    }, self);

  } else if (sprite.key === "sendback") {
    self.parentObject.updateSendToBackInGroup();
    self.game.time.events.add(Phaser.Timer.SECOND * 0.2, function () {
      self.closeOverlay();
      if (self.game.gameStatus === self.game.CONFIGS.RECORDING) {
        self.currentState.onRecordingResumeSignal.dispatch();
      }
    }, self);

  } else if (sprite.key === "hide") {
    self.parentObject.updateHideOrUnHide();
    self.game.time.events.add(Phaser.Timer.SECOND * 0.2, function () {
      self.parentObject.hideOrUnHide();
      self.closeOverlay();
      if (self.game.gameStatus === self.game.CONFIGS.RECORDING) {
        self.currentState.onRecordingResumeSignal.dispatch();
      }

    }, self);
  } else if (sprite.key === "recycle_bin") {
    self.game.time.events.add(Phaser.Timer.SECOND * 0.2, function () {
      self.closeOverlay();
      self.game.recordingManager.remove(self.parentObject.uniquename);
      self.game.displayGroup.removeChild(self.phaserGameObject);
      self.parentObject.destroy();
      if (self.game.gameStatus === self.game.CONFIGS.RECORDING) {
        self.currentState.onRecordingResumeSignal.dispatch();
      }

    }, self);
  }
};

module.exports = AttributeEditOverlay;
