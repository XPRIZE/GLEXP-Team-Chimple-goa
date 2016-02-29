'use strict';
var HashMap = require('hashmap');
var _ = require('lodash')._;
var TextSprite = require('../fabs/textSprite');

var TextEditor = function (game, state) {        
    this.game = game;
    this.context = state;
};

TextEditor.prototype = Object.create(Object.prototype);
TextEditor.prototype.constructor = TextEditor;


TextEditor.prototype.updateText = function(gameObject, attrs) {
    var self = this;
    gameObject.parent.updateText(attrs);
};

TextEditor.prototype.recordSpecialEvent = function(gameObject, textOptions, timeKey) {
    var self = this;            
    var recordInfo = {                        
        "x":gameObject.parent.x,
        "y":gameObject.parent.y,
        "kind":"text",
        "applied" : textOptions.applied || false, 
        "displayText": textOptions.displayText,
        "template":textOptions.template,
        "class":textOptions.class,
        "attrs": {
            "backGroundColor": textOptions.attrs.backGroundColor,
            "textColor": textOptions.attrs.textColor     
        },
        "shouldPauseWhilePlay": true                                              
    };
        
    console.log('savedKey when text pop up:' + timeKey + " and recording type:" + textOptions.recordingType);
    var recMap = new HashMap(gameObject.parent.uniquename, recordInfo);
    var map = new HashMap(textOptions.recordingType.SP_EVENTS.TEXT_RECORDING, recMap);
    self.game.recordingManager.recordText(timeKey, map);    
  };

TextEditor.prototype.save = function(spriteToSave, selectedTextIndex, textOptions, timeKey) {
    var self = this;

    /*if(spriteToSave.kind === 'armature')
    {
        spriteToSave.parentArmatureDisplay.texts.splice(selectedTextIndex, 1, textOptions);
    } else {
        spriteToSave.texts.splice(selectedTextIndex, 1, textOptions);        
    } */          
         
    var recordInfo = {                        
        "x":spriteToSave.x,
        "y":spriteToSave.y,
        "kind":"text",
        "applied" : textOptions.applied || false, 
        "displayText": textOptions.displayText,
        "template":textOptions.template,
        "class":textOptions.class,
        "attrs": {
            "backGroundColor": textOptions.attrs.backGroundColor,
            "textColor": textOptions.attrs.textColor     
        },
        "shouldPauseWhilePlay": true                                              
    };
        
    console.log('savedKey when text pop up:' + timeKey);
    var map = new HashMap(timeKey, recordInfo);
    self.game.recordingManager.recordText(timeKey, map)
    
  };

  TextEditor.prototype.updateAttribute = function(gameObject, attrs){
    var self = this;
    gameObject.parent.updateAttribute(attrs);
  };

  TextEditor.prototype.render = function(target, x, y, index, context) {
    //later
    var self = this;
    var posX = x;
    var posY = y;
    var texts = [];
    if(target.kind === 'armature')
    {
        texts = target.parentArmatureDisplay.texts;
        posX = 50;
        posY = 50;
    } else {
        texts = target.texts;        
    }
    
    if(texts && index < texts.length) {
        var savedTextSpriteInfo = texts[index];
        if(savedTextSpriteInfo && savedTextSpriteInfo.applied) {
           if(savedTextSpriteInfo.attrs)
           {
                self.textNode = new TextSprite(self.game, posX, posY, savedTextSpriteInfo.template, 'text', context, savedTextSpriteInfo, target.kind);               
           }
        }
    }    
};


  TextEditor.prototype.renderSpecialEvent = function(gameObject, textOptions, currentGameState) {
    //later
    var self = this;
    var posX = gameObject.parent.x;
    var posY = gameObject.parent.y;

    self.textNode = new TextSprite(self.game, posX, posY, textOptions.template,textOptions);                   
    self.game.time.events.add(Phaser.Timer.SECOND * 2, function () {    
        self.textNode.destroy();
        currentGameState.onRecordingResumeSignal.dispatch();      
    }, self);    

};


module.exports = TextEditor;