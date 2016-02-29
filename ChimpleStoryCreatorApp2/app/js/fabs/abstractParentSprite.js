
var AbstractParentSprite = function (game, x, y, key, context) {
    Phaser.Sprite.call(this, game, x, y, key);
    game.add.existing(this);
    this.game = game;
    this.context = context;
    this.registerDispatchSignals();
};

AbstractParentSprite.prototype = Object.create(Phaser.Sprite.prototype);
AbstractParentSprite.prototype.constructor = AbstractParentSprite;

AbstractParentSprite.prototype.registerDispatchSignals = function() {
    var self = this; 


    self.context.onRecordingStartSignal.add(self.recordingStarted, self);

    self.context.onRecordingStopSignal.add(self.recordingStopped, self);

    self.context.onSyncRecordedInformation.add(self.syncRecordInformation, self);    


    self.onDragChange = new Phaser.Signal();    
    self.onDragChange.add(self.game.recordingManager.recordDrag, self.game.recordingManager);    
        
    self.onAngleAndScaleChange = new Phaser.Signal();
    self.onAngleAndScaleChange.add(self.game.recordingManager.recordAngleAndScale, self.game.recordingManager);
    
    self.onShowAttributeEditOverlaySignal = new Phaser.Signal();
    self.onShowAttributeEditOverlaySignal.add(self.game.state.getCurrentState().showAttributeEditOverlay, self.game.state.getCurrentState());

    self.onHideOrUnhideChangeSignal = new Phaser.Signal();
    self.onHideOrUnhideChangeSignal.add(self.game.recordingManager.recordHideOrUnhideChange, self.game.recordingManager);
    
    self.onBringToTopSignal = new Phaser.Signal();
    self.onBringToTopSignal.add(self.game.recordingManager.recordBringToTopChange, self.game.recordingManager);
    
    self.onSendToBackSignal = new Phaser.Signal();
    self.onSendToBackSignal.add(self.game.recordingManager.recordSendToBackChange, self.game.recordingManager);

    //only for text events
    self.onTextChangeSignal = new Phaser.Signal();
    self.onTextChangeSignal.add(self.game.recordingManager.updateText, self.game.recordingManager);

    self.onAttributeChangeSignal = new Phaser.Signal();
    self.onAttributeChangeSignal.add(self.game.recordingManager.updateAttribute, self.game.recordingManager);

    //later sound, fx and anims
    self.onSpecialPropertyChange = new Phaser.Signal();
    self.onSpecialPropertyChange.add(self.game.recordingManager.recordSpecialPropertyChange, self.game.recordingManager);
};

AbstractParentSprite.prototype.createDragInformation = function() {
    throw "Abstract method createDragInformation not implemented";    
};

AbstractParentSprite.prototype.createAndScaleInformation = function() {
      throw "Abstract method createAndScaleInformation not implemented";
};

AbstractParentSprite.prototype.recordScaleAndAngle = function() {
    var self = this;
    self.onAngleAndScaleChange.dispatch(self.createAndScaleInformation());
};


AbstractParentSprite.prototype.hideOrUnHide = function()
{
    var self = this;
    self.onHideOrUnhideChangeSignal.dispatch(self.createHideOrUnHideInformation());
    
};

AbstractParentSprite.prototype.isAttributeEditOverlayAllowed = function() {
    var self = this;
    return self.game.gameStatus !=  self.game.CONFIGS.PLAYING;
}

AbstractParentSprite.prototype.showAttributeEditOverlay = function(data) {
    //check for valid workflow
    //attribute overlay doesnt show up in PlayMode (only allowed in Pre-Recording or Recording Mode)
    var self = this;
    if(self.isAttributeEditOverlayAllowed()) {
        self.onShowAttributeEditOverlaySignal.dispatch(data);
    }
};


AbstractParentSprite.prototype.updateText = function(data) {
    var self = this;
    data.uniquename = self.uniquename;
    
    //change in-memory attrs - if required - NOT SURE

    if(data.applied) {
        if(data.kind === 'armature') {

        } else if(data.kind === 'sprite') {

        }
    } 

    self.onTextChangeSignal.dispatch(data);
};

AbstractParentSprite.prototype.updateAttribute = function(attrs) {
    var self = this;
    attrs.uniquename = self.uniquename;    
    self.onAttributeChangeSignal.dispatch(attrs);        
};

AbstractParentSprite.prototype.updateSpecialAttributeChange = function(attrs) {
    var self = this;
    attrs.uniquename = self.uniquename;    
    console.log('updateSpecialAttributeChange:' + attrs);
    self.onSpecialPropertyChange.dispatch(attrs);        
};


AbstractParentSprite.prototype.recordingStarted = function() {
    var self = this;
    //create fresh RecrodDataMap to store updates while recording
    console.log("recording started");
    self.recordDataMap = new HashMap();
}; 


AbstractParentSprite.prototype.recordingStopped = function(totalRecordingTime) {
    var self = this;
    console.log("recording stopped");
    self.recordDataMap = null;     
}; 

AbstractParentSprite.prototype.syncRecordInformation = function(totalRecordingTime) {
    var self = this;
    if(self.game.recordingManager)
    {
        console.log('sync map to record manager' + self.recordDataMap);
        self.game.recordingManager.syncRecordInformation(self.uniquename, self.recordDataMap, totalRecordingTime);        
    }       
};


module.exports = AbstractParentSprite;