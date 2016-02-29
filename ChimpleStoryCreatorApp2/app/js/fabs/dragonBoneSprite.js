'use strict';
var AbstractParentSprite = require('./abstractParentSprite');

var DragonBoneSprite = function (context, game, x, y, key) {    
    AbstractParentSprite.call(this, game, x, y, key);    
    this.context = context;
    if(this.context && this.context.uniqueDragonName) {
        this.uniquename = this.context.uniqueDragonName;
    }
    
    this.configureCharacterSprite();
};

DragonBoneSprite.prototype = Object.create(AbstractParentSprite.prototype);
DragonBoneSprite.prototype.constructor = DragonBoneSprite;


DragonBoneSprite.prototype.configureCharacterSprite = function () {
    var self = this;
    
    self.inputEnabled = true;
    self.input.disableDrag();
       
    self.texts = [{},{},{},{}];
    self.fx = [{},{},{},{}];
    self.sound = [{},{},{},{}];
    
    self.events.onInputDown.add(self.inputDown, self);
    self.events.onInputUp.add(self.inputUp, self);
};

DragonBoneSprite.prototype.inputDown = function () {
    var self = this;
    self.game.world.bringToTop(self);
    self.context.setSelectedSprite(self);

    self.inputDownPressed = 1;            
    //update sprite point
    var localPoint = self.parentArmatureDisplay.toLocal(self.game.input.activePointer);
    self.parentArmatureDisplay.pivot.x = localPoint.x;
    self.parentArmatureDisplay.pivot.y = localPoint.y;
    self.parentArmatureDisplay.x = this.game.input.activePointer.x;
    self.parentArmatureDisplay.y = this.game.input.activePointer.y;
};

DragonBoneSprite.prototype.inputUp = function () {
    var self = this;
    //record Drag
    if(self.isDragging) {
        self.onDragChange.dispatch(self.createDragInformation());            
    }
    
    
    if(!self.isDragging) {
        var data = {
            "parent":self,
            "phaserGameObject":self.parentArmatureDisplay,
            "initialPivotX":self.parentArmatureDisplay.pivot.x,
            "initialPivotY":self.parentArmatureDisplay.pivot.y
        }
        self.showAttributeEditOverlay(data);
    }    
            
    self.inputDownPressed = 0;
    self.context.setDeselectedSprite(self);        
};

DragonBoneSprite.prototype.syncRecordedInformation = function(totalRecordingTime) {
    
    var self = this;
    if(self.game.recordingManager)
    {
        console.log('sync map to record manager' + self.recordDataMap);
        self.game.recordingManager.syncRecordInformation(self.parentArmatureDisplay.uniquename, self.recordDataMap, totalRecordingTime);
        self.recordDataMap = null; 
    }       
};

DragonBoneSprite.prototype.createDragInformation = function() {
    var self = this;    
    var dragInfo = {        
        "uniquename":self.uniquename,
        "x":self.lastDragX,
        "y":self.lastDragY,
        "pivotX":self.parentArmatureDisplay.pivot.x,
        "pivotY":self.parentArmatureDisplay.pivot.y,
        "autoAdjust":false
    };
    return dragInfo;
};


DragonBoneSprite.prototype.update = function () {
  var self = this;
  
    if(self.context && self.context.inRecordingMode()) {
        if(!self.recordDataMap) {
            self.recordDataMap = new HashMap();
        }

        var recordingStartTimeSecond = self.context.getRecordingStartTime().getSeconds();
        var d = new Date();
        if(d.getSeconds() - recordingStartTimeSecond > 0) {
                
        var recordInfo = {
            'uniquename' : self.parentArmatureDisplay.uniquename,
            'x' : self.parentArmatureDisplay.x,
            'y' : self.parentArmatureDisplay.y,
            'pivotX' : self.parentArmatureDisplay.pivot.x,
            'pivotY' : self.parentArmatureDisplay.pivot.y,
            'scaleX' : self.parentArmatureDisplay.scale.x,
            'scaleY' : self.parentArmatureDisplay.scale.y,
            'angle'  : self.parentArmatureDisplay.angle,
            'alpha'  : self.parentArmatureDisplay.alpha,
            'isHidden' : self.parentArmatureDisplay.isHidden,
            'bringToTop' : self.parentArmatureDisplay.bringToTop,
            'sendToBack' : self.parentArmatureDisplay.sendToBack

        };
        
        var savedKey = (d.getSeconds() - recordingStartTimeSecond - self.context.howMuchTimeGameWasPausedInSeconds) * 1000 + d.getMilliseconds();

        self.recordDataMap.set(savedKey, recordInfo);

        }
        
    } else if(self.context && self.context.inPlayMode()) {
        if(self.context.isPauseWhilePlaying) {
            return;
        }
        var p = new Date();
        var playStartTimeSecond = self.context.getPlayStartTime().getSeconds();       
        if(p.getSeconds() - playStartTimeSecond > 0) {
            var generatedKey = 0;
            if(self.context.timeAtResume != undefined) {
               generatedKey = (p.getSeconds() - playStartTimeSecond) * 1000 +p.getMilliseconds() + self.context.timeAtResume;
            } else {
               generatedKey = (p.getSeconds() - playStartTimeSecond) * 1000 +p.getMilliseconds(); 
            }
             
            console.log('generatedKey while plyaing:' + generatedKey);
            var recordedValue = self.game.recordingManager.findNearestValue(self.uniquename, generatedKey);
            if(recordedValue) {
                self.changeAttributes(recordedValue);    
            }                        
        }        
    } else {
        self.parentArmatureDisplay.alpha = self.parentArmatureDisplay.isHidden? 0.2 : 1;
    }
  
    if(self.context && !self.context.inPlayMode())
    {
        self.distanceFromLastUp = Phaser.Math.distance(self.game.input.activePointer.positionDown.x, self.game.input.activePointer.positionDown.y, 
        self.game.input.activePointer.x, self.game.input.activePointer.y);    
       
        if(self.context && self.inputDownPressed === 1 && self.distanceFromLastUp > 5) {
            self.isDragging = true;
            self.updateDrag(self.game.input.activePointer);
        } else {
            self.isDragging = false;            
        }           
    }        
};


DragonBoneSprite.prototype.changeAttributes = function (recordedValue) {
    var self = this;
    if(recordedValue) {
        self.parentArmatureDisplay.x = recordedValue.x;
        self.parentArmatureDisplay.y  = recordedValue.y;
        self.parentArmatureDisplay.angle = recordedValue.angle;
        self.parentArmatureDisplay.pivot.x = recordedValue.pivotX;
        self.parentArmatureDisplay.pivot.y = recordedValue.pivotY;
        self.parentArmatureDisplay.scale.x = recordedValue.scaleX;
        self.parentArmatureDisplay.scale.y = recordedValue.scaleY;
        self.parentArmatureDisplay.alpha = recordedValue.alpha;  
        
        if(recordedValue.bringToTop) {
            self.game.displayGroup.bringToTop(self.parentArmatureDisplay);    
        }
        if(recordedValue.sendToBack) {
            self.game.displayGroup.sendToBack(self.parentArmatureDisplay);    
        }
            
        }      
};

DragonBoneSprite.prototype.updateDrag = function (pointer) {
    var self = this;
    
    self.lastDragX = pointer.x;
    self.lastDragY = pointer.y;
    
    self.parentArmatureDisplay.x = pointer.position.x;
    self.parentArmatureDisplay.y = pointer.position.y;
    var localPoint = self.parentArmatureDisplay.toLocal(pointer);
    self.parentArmatureDisplay.pivot.x = localPoint.x;
    self.parentArmatureDisplay.pivot.y = localPoint.y;    
};



DragonBoneSprite.prototype.updateScale = function(newScale) {
    var self = this;
    self.parentArmatureDisplay.scale.setTo(newScale, newScale);
};

DragonBoneSprite.prototype.updateRotation = function(angle) {
    var self = this;
    self.parentArmatureDisplay.rotation = angle * Math.PI/180;
};

DragonBoneSprite.prototype.updatePivot = function(pivotX, pivotY) {
    var self = this;
    self.parentArmatureDisplay.pivot.x = pivotX;
    self.parentArmatureDisplay.pivot.y = pivotY;
};


DragonBoneSprite.prototype.createAndScaleInformation = function() {
    var self = this;
    var dragInfo = {        
        "uniquename":self.uniquename,
        "x":self.parentArmatureDisplay.x,
        "y":self.parentArmatureDisplay.y,
        "scaleX":self.parentArmatureDisplay.scale.x,
        "scaleY":self.parentArmatureDisplay.scale.y,
        "rotation":self.parentArmatureDisplay.rotation,
        "angle":self.parentArmatureDisplay.angle,
        "pivotX":self.parentArmatureDisplay.pivot.x,
        "pivotY":self.parentArmatureDisplay.pivot.y,
        "autoAdjust":false
    };
    return dragInfo;    
};


DragonBoneSprite.prototype.updateHideOrUnHide = function() 
{
    var self = this;
    self.parentArmatureDisplay.isHidden = !self.parentArmatureDisplay.isHidden;
    self.parentArmatureDisplay.alpha = self.parentArmatureDisplay.alpha == 0 ? 1 : 0;    
};

DragonBoneSprite.prototype.createHideOrUnHideInformation = function()
{
   var self = this;
    var dragInfo = { 
        "uniquename":self.uniquename,        
        "isHidden":self.parentArmatureDisplay.isHidden,
        "alpha":self.parentArmatureDisplay.alpha,
        "autoAdjust":false
    };
    
    return dragInfo;   
};


DragonBoneSprite.prototype.updateBringToTopInGroup = function()
{
    var self = this;
    self.game.world.bringToTop(self.parentArmatureDisplay);
    self.game.displayGroup.bringToTop(self.parentArmatureDisplay);
    
    //Record to Loki    
    var data = {
        "uniquename":self.uniquename,
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
};

DragonBoneSprite.prototype.updateSendToBackInGroup = function()
{
    var self = this;
    self.game.world.sendToBack(self.parentArmatureDisplay);
    self.game.displayGroup.sendToBack(self.parentArmatureDisplay);
    
    //Record to Loki    
    var data = {
        "uniquename":self.uniquename,
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


module.exports = DragonBoneSprite;