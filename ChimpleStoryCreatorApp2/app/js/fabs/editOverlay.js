'use strict';
var HashMap = require('hashmap');
var _ = require('lodash')._;

var EditOverlay = function (game, context, clickedObject) {            
    this.game = game;
    this.context = context;
    this.kind = clickedObject.kind;
    this.clickedObject = clickedObject;
    this.isPanelOpened = false;
    this.fixedHandlerRadius = this.game.height/6;
    this.dragHandlerRadius = this.game.height/18;
    
    if(this.kind === 'armature') {
        this.createdForSprite = clickedObject.parentArmatureDisplay;
        this.initialPivotX = this.createdForSprite.pivot.x;
        this.initialPivotY = this.createdForSprite.pivot.y;
    } else {        
        this.createdForSprite = clickedObject;
        this.initialPivotX = this.createdForSprite.pivot.x;
        this.initialPivotY = this.createdForSprite.pivot.y;
        this.texts = clickedObject.texts || [];                
    }
    
    this.texts = this.createdForSprite.texts || [];
    
    this.initialScale = this.createdForSprite.scale.x;
    this.baseScale = 1.0;
    this.displayAdjustmentAngle = 90;
    this.scaleAdjustmentFactor = 100;
    this.maxScale = 3.5;
    this.minScale = 0.5
    this.createOverlay();    
};

EditOverlay.prototype = Object.create(Object.prototype);
EditOverlay.prototype.constructor = EditOverlay;

EditOverlay.prototype.createSettingsOverlay = function() {
    var self = this;
    
    self.game.time.events.add(Phaser.Timer.SECOND * 0.2, function () {
        self.isPanelOpened = false;
        
        self.panel.destroy();
        self.fixedHandlerSprite.destroy();
        self.dragHandlerSprite.destroy(); 
        self.dynamicCircle.destroy();
        self.editorGroup.destroy();
        self.context.pause();    

        if(self.isSettingPanelOpened) {
            return;
        }
        self.isSettingPanelOpened = true;

        self.settingsPanel = self.game.add.sprite(0, self.game.height, self.editOverlay);
        self.settingsPanel.alpha = 0.5;
        self.settingsPanel.inputEnabled = true;
        
        self.settingsPanel.events.onInputDown.add(function () {
            //resume game from pause so recording starts
            console.log('resume context');
            self.context.resume();         
            self.closeSettingsOverlay();
        }, self);    

        //overlay raising tween animation
        self.editOverlayPanelCreationTween = self.game.add.tween(self.settingsPanel);

        self.editOverlayPanelCreationTween.onComplete.add(function () {  
            //create setting panel
            self.createAttributesEditor();
            self.createTextEditor();              
        }, self);
    
        self.editOverlayPanelCreationTween.to({y: 0}, 10);
        self.editOverlayPanelCreationTween.start();        
        }, self);
        
};


EditOverlay.prototype.editAttributes = function(x, y, type, group, scale) {
    var self = this;
    var sprite = self.game.add.sprite(x, y, type);
    sprite.inputEnabled = true;
    sprite.anchor.setTo(0.5);
    sprite.input.useHandCursor = true;
    sprite.input.bringToTop = true;
    sprite.input.disableDrag();
    if(scale != undefined) {
        sprite.scale.setTo(scale);    
    }
    
    group.add(sprite);
    sprite.events.onInputOver.add(self.scaleIcon, self);
    sprite.events.onInputOut.add(self.deScaleIcon, self);
    //sprite.events.onInputDown.add(self.performEdit, self);
    //sprite.events.onInputUp.add(self.performUp, self);   
    
};

EditOverlay.prototype.createTextEditor = function() {
   var self = this;
   self.editTextGroup = self.game.add.group();
   var offsetX = 0.3 * self.game.width;
   var textFrameWidth = 0.7 * self.game.width;
   var height = self.game.height - 75;
    var dim = 300;
    var offsetY = 70;
    var scale = 1;

    var availbleVerticalSpace = (height - 2 * dim ) / 3;
    if(availbleVerticalSpace < 0) {
        dim = dim  + availbleVerticalSpace - 10;
        scale = 0.5;
        availbleVerticalSpace = 5;                
    }
    
    var availableHorizontalSpace = (textFrameWidth - 2 * dim)/4;
    if(availableHorizontalSpace < 0) {
        availableHorizontalSpace = 5;
        scale = 0.5;        
    }
    
    var bubbleType = "speech_bubble" ;   
    var k = 0;
    for(var i = 0; i < 2; i++) {
        for(var j = 0; j < 2; j++)
        {            
            var textOptions = undefined;
            if(self.texts != null && self.texts.length > k)
            {
                textOptions = self.texts[k];
            }
            self.editText(k, availableHorizontalSpace + offsetX + i * (dim + availableHorizontalSpace), offsetY + j * (dim + availbleVerticalSpace), bubbleType, self.editTextGroup, scale, textOptions);
            k++;    
        }  

    }   
   
};

EditOverlay.prototype.updateTextOnUI = function(textOptions, textSprite) {
    var self = this;
    if(!textOptions)
    {
        return;
    }
    
    var showText = textOptions.displayText;      
    var sprite = textSprite;
    if(showText != null && showText != undefined) {
        var style = { font: "20px Arial", fill: Phaser.Color.RGBtoString(textOptions.attrs.textColor.red, textOptions.attrs.textColor.green, textOptions.attrs.textColor.blue) , wordWrap: true, wordWrapWidth: sprite.width, align: "center"};    
        var text = self.game.make.text(sprite.width / 2, sprite.height / 2, showText, style);
        text.setText(showText);  
        text.anchor.set(0.5);
        sprite.removeChildren();
        sprite.addChild(text);                  
    }
    sprite.tint = Phaser.Color.getColor(textOptions.attrs.backGroundColor.red, textOptions.attrs.backGroundColor.green, textOptions.attrs.backGroundColor.blue);    
};

EditOverlay.prototype.editText = function(selectedTextIndex, x, y, type, group, scale, textOptions) {
    var self = this;
    var sprite = self.game.add.sprite(x, y, type);
    sprite.inputEnabled = true;
    sprite.anchor.setTo(0);
    sprite.input.useHandCursor = true;
    sprite.input.bringToTop = true;
    sprite.input.disableDrag();
    
    //custom index property
    sprite.selectedTextIndex = selectedTextIndex;
    if(scale) {
        sprite.scale.setTo(scale);
    }
    if(textOptions) {
        self.updateTextOnUI(textOptions, sprite);    
    }
        
    group.add(sprite);
    //sprite.events.onInputOver.add(self.scaleIcon, self);
    //sprite.events.onInputOut.add(self.deScaleIcon, self);
    if(self.context.inPauseMode()) {
        console.log('in middle of recording');
        sprite.events.onInputDown.add(self.addTextToGame, self);
    } else {
        sprite.events.onInputDown.add(self.performEditText, self);
        sprite.events.onInputUp.add(self.performUp, self);           
    }    
};

EditOverlay.prototype.addTextToGame = function(sprite, pointer) {
    var self = this;
    console.log('clicked on sprite:' + sprite);
    console.log('sprite attrs:');
    var textIndex =  sprite.selectedTextIndex;
    
    self.game.time.events.add(Phaser.Timer.SECOND * 0.2, function () {
        self.closeSettingsOverlay();
        self.closeOverlay();        
    
        if(self.texts != null && self.texts.length > textIndex) {
            var textToApply = self.texts[textIndex];
            textToApply.applied = true; 
            self.context.applyText(textToApply, sprite, self.clickedObject);
        }
        console.log('resume context');
        self.context.resume();         
        
     }, self);    
    
    
    //selectedTextIndex, tint, children => text
    //add text sprite to game UI
    //save into sequences for playtime
};

EditOverlay.prototype.createAttributesEditor = function() {
    var self = this;
    self.editAttrGroup = self.game.add.group();
    var attributeFrameWidth = 0.3 * self.game.width;
    var height = self.game.height - 75;
                
    var attrs = [];
    var dim = 75;
    var offsetX = 40;
    var scale = 1;
    var availbleVerticalSpace = (height - 4 * dim ) / 5;
    if(availbleVerticalSpace < 0) {
        dim = dim  + availbleVerticalSpace - 10;
    }
    var availableHorizontalSpace = (attributeFrameWidth - 3 * dim)/4;
    if(availableHorizontalSpace < 0) {
        offsetX = offsetX + availableHorizontalSpace;
        availableHorizontalSpace = 5;
        scale = 0.5;        
    }
    
    var offsetY = 0;
        
    if(self.kind !== "background") {
        attrs = ["fx", "attr_sound", "attr_sound"];
    } else {     
        attrs = ["fx", "attr_sound", "attr_sound"];           
    }
           
    for(var i = 0; i < attrs.length; i++) {
        for(var j = 0; j < 4; j++)
        {
            offsetY = dim * 2;            
            self.editAttributes(availableHorizontalSpace + offsetX + i * (dim + availableHorizontalSpace), offsetY + j * (dim + availbleVerticalSpace), attrs[i], self.editAttrGroup, scale);    
        }
                
    }       
};

EditOverlay.prototype.closeSettingsOverlay = function() {
    var self = this;     
    if(self.isSettingPanelOpened) {
        console.log("called to close overlay and restore all characters" + self);
        self.isSettingPanelOpened = false;
        self.createdForSprite.inputEnabled = true;
        
        if(self.kind === "background") {
            self.game.world.sendToBack(self.createdForSprite);
        }
        
        self.editAttrGroup.destroy();
        
        self.editTextGroup.destroy();
        
        
        self.settingsPanel.destroy();
        
        self.editOverlay.cls();
        
        if(!(self.createdForSprite instanceof(Phaser.Group)))
        {
            self.createdForSprite.input.enableDrag();
        }           
        
        self.resetOnScreenObjects();        
    }   
};

EditOverlay.prototype.createOverlay = function() {
    var self = this;
    
    if(self.isPanelOpened) {
        return;
    }
    
    //pause game
    //dispatch pause signal
    self.context.pause();
    
    self.dynamicCircle = self.game.add.graphics(0, 0);
    self.isPanelOpened = true;
    self.editOverlay = self.game.make.bitmapData(self.game.width, self.game.height);
    self.editOverlay.draw(self.game.cache.getImage('backgroundOverlay'), 0, 0);	
    //self.editOverlay.update();
    self.editOverlay.alpha = 0.5;

    self.panel = self.game.add.sprite(0, self.game.height, self.editOverlay);
    self.panel.tint = '#00ff00';
    self.panel.alpha = 0.5;
    self.panel.inputEnabled = true;

    self.updateOnScreenObjects();
    
    if(self.kind !== "background") {
        self.game.world.bringToTop(self.createdForSprite);    
    }

    self.panel.events.onInputDown.add(function () {
        //resume game from pause so recording starts
        self.context.resume();         
        self.closeOverlay();
    }, self);    

    //overlay raising tween animation
    self.editOverlayPanelCreationTween = self.game.add.tween(self.panel);

    self.editOverlayPanelCreationTween.onComplete.add(function () {                
        self.createFixedHandler(0.8, 0xFFFFFF, 1.5);
        self.createDragHandler(0.8,  0xFFFFFF, 1.5);
        self.createAppearanceEditor();        
    }, self);


    
    self.editOverlayPanelCreationTween.to({y: 0}, 10);
    self.editOverlayPanelCreationTween.start();
};

EditOverlay.prototype.createAttributeModifier = function(x, y, type, group) {
    var self = this;
    var sprite = self.game.add.sprite(x, y, type);
    sprite.inputEnabled = true;
    sprite.anchor.setTo(0.5);
    sprite.input.useHandCursor = true;
    sprite.input.bringToTop = true;
    sprite.input.disableDrag();
    sprite.events.onInputOver.add(self.scaleIcon, self);
    sprite.events.onInputOut.add(self.deScaleIcon, self);
    sprite.events.onInputDown.add(self.performEdit, self);
    sprite.events.onInputUp.add(self.performUp, self);
    group.add(sprite);    
    
};

EditOverlay.prototype.performEditText = function(sprite, pointer) {
    var self = this;        
    self.game.scope.$emit('change:text', sprite, self, self.clickedObject);
};

EditOverlay.prototype.scaleIcon = function(sprite, pointer) {
    var self = this;    
    sprite.scale.setTo(sprite.scale.x * 1.2); 
};


EditOverlay.prototype.deScaleIcon = function(sprite, pointer) {
    var self = this;
    sprite.scale.setTo(sprite.scale.x/1.2);   
};

//fix bring to top and send to back issues - storing functions instead of properties
EditOverlay.prototype.performEdit = function(sprite, pointer) {
    var self = this;    
    if(sprite.key === "settings") {
        self.createSettingsOverlay();
    } else if(sprite.key === "bringtop") {
        self.createdForSprite.bringToTop = true;        
        self.game.displayGroup.bringToTop(self.createdForSprite);
        self.game.time.events.add(Phaser.Timer.SECOND * 0.2, function () {
            //self.game.recordingManager.recordBringToTopChange(self.clickedObject);
            self.closeOverlay();            
        }, self);    

    } else if(sprite.key ===  "sendback") {
        self.createdForSprite.sentToBack = true;
        self.game.displayGroup.sendToBack(self.createdForSprite);
        self.game.time.events.add(Phaser.Timer.SECOND * 0.2, function () {
            //self.game.recordingManager.recordSentToBackChange(self.clickedObject);
            self.closeOverlay();            
        }, self);    
        
    } else if(sprite.key === "hide") {                
        self.createdForSprite.isHidden = !self.createdForSprite.isHidden;
        if(self.createdForSprite.alpha == 0) {
            self.createdForSprite.alpha = 1;
        } else {
            self.createdForSprite.alpha = 0;
        }
        self.game.time.events.add(Phaser.Timer.SECOND * 0.2, function () {
            self.game.recordingManager.recordAlphaChange(self.clickedObject);
            self.closeOverlay();            
        }, self);    
    }    
};

EditOverlay.prototype.performUp = function(sprite, pointer) {
    var self = this;
    console.log("performUp");
};




EditOverlay.prototype.createAppearanceEditor = function() {
    var self = this;
    var position = self.dragHandlerSprite.x >= self.game.world.centerX ? -1:1;
    var offset = 40;
    var gapOffSet = 20;
    var spriteWidth = 40;
    self.editorGroup = self.game.add.group();
    var keys = [];
    
    if(self.kind !== "background") {
        keys = ["bringtop", "sendback", "hide", "settings"];
    } else {     
        keys = ["bringtop", "sendback", "hide", "settings"];           
    }
    
    for(var i = 0; i < keys.length; i++) {
        if(position > 0) {
            offset = self.game.width - (5 * spriteWidth) - 3 * gapOffSet;
            self.createAttributeModifier(offset + i * (spriteWidth + gapOffSet), self.game.height - 50, keys[i], self.editorGroup);                
        } else {            
            self.createAttributeModifier(offset + i * (spriteWidth + gapOffSet), self.game.height - 50, keys[i], self.editorGroup);                          
        }
        
    }   
};

EditOverlay.prototype.showAppearanceOverlay = function() {
   console.log('show appearance overlay');  
   var self = this;
    self.showApperaenceOverlay = self.game.add.bitmapData(self.game.width, self.game.height);    
    self.showApperaenceOverlay.ctx.fillStyle = '##007F00';
    self.showApperaenceOverlay.ctx.fillRect(0, 0, self.game.width, self.game.height);

    self.appearencePanel = self.game.add.sprite(0, 10, self.showApperaenceOverlay);
    self.appearencePanel.alpha = 1;
    self.appearencePanel.inputEnabled = true;
   
};

EditOverlay.prototype.updateOnScreenObjects = function() {
    var self = this;
    self.createdForSprite.inputEnabled = false;
    if(!(self.createdForSprite instanceof(Phaser.Group))) 
    {
        self.createdForSprite.input.disableDrag();    
    }    
    
        
    _.each(self.context.charactersOnScreen, function (sprite) {
        if (sprite.uniquename !== self.createdForSprite.uniquename) {
            sprite.alpha = 0.2;
        }
    });

    _.each(self.context.dragonsOnSceen, function (sprite) {
        if (sprite.uniquename !== self.createdForSprite.uniquename) {
            sprite.alpha = 0.2;
        }
    });    
}



EditOverlay.prototype.closeOverlay = function()
{
    var self = this;     
    if(self.isPanelOpened) {
        console.log("called to close overlay and restore all characters" + self);
        self.isPanelOpened = false;
        self.createdForSprite.inputEnabled = true;
        
        if(self.kind === "background") {
            self.game.world.sendToBack(self.createdForSprite);
        }
        
        self.panel.destroy();
        self.editOverlay.cls();
        self.fixedHandlerSprite.destroy();
        self.dragHandlerSprite.destroy(); 
        self.dynamicCircle.destroy();
        self.editorGroup.destroy();
        if(!(self.createdForSprite instanceof(Phaser.Group)))
        {
            self.createdForSprite.input.enableDrag();
        }           
        
        self.resetOnScreenObjects();        
    }   
};


EditOverlay.prototype.createDragHandler = function(alpha, color, lineWidth)
{
    var self = this;
    var graphicsDrag = self.game.add.graphics(0, 0);
    graphicsDrag.lineStyle(lineWidth, color, alpha);    
    graphicsDrag.drawCircle(0, 0, 2*self.dragHandlerRadius);

    var xPoint = 0;
    var yPoint = 0;
    var initialDistance = 0;
    if(self.initialScale != self.baseScale) {
        initialDistance = (self.initialScale - self.baseScale) * self.scaleAdjustmentFactor + self.fixedHandlerRadius;
        xPoint = (initialDistance * Math.cos((self.createdForSprite.angle + 90) * Math.PI/180));
        yPoint = (initialDistance * Math.sin((self.createdForSprite.angle + 90)* Math.PI/180));
        self.refresh(initialDistance);
    } else {
        xPoint = (self.fixedHandlerRadius * Math.cos((self.createdForSprite.angle + self.displayAdjustmentAngle) * Math.PI/180));
        yPoint = (self.fixedHandlerRadius * Math.sin((self.createdForSprite.angle + self.displayAdjustmentAngle)* Math.PI/180));        
    }
            
    self.dragHandlerSprite = self.game.add.sprite(self.fixedHandlerSprite.x + xPoint,  self.fixedHandlerSprite.y  + yPoint, graphicsDrag.generateTexture());
    self.game.world.bringToTop(self.dragHandlerSprite);    
    self.dragHandlerSprite.anchor.setTo(0.5);
    self.dragHandlerSprite.inputEnabled = true;
    self.dragHandlerSprite.input.enableDrag();
    self.dragHandlerSprite.angle = self.createdForSprite.angle;
    self.dragHandlerSprite._click = 0;

    self.dragHandlerSprite._clickScale = new Phaser.Point(1, 1);
    self.dragHandlerSprite.input.useHandCursor = true;
    self.dragHandlerSprite.input.bringToTop = true;
    self.dragHandlerSprite.events.onInputDown.add(self.onDragHandlerInputDown, self);
    self.dragHandlerSprite.events.onInputUp.add(self.onDragHandlerInputUp, self);
                
    graphicsDrag.destroy();

    
};

EditOverlay.prototype.createFixedHandler = function(alpha, color, lineWidth)
{
    var self = this;   
    var graphics = self.game.add.graphics(0, 0);    
    graphics.lineStyle(lineWidth, color, alpha);            
    graphics.drawCircle(0, 0, 2*self.fixedHandlerRadius);
        
    //draw line across circle

    self.drawHorizontalLineAroundCircleOnGraphics(graphics, self.fixedHandlerRadius, 0, 5);
    self.drawHorizontalLineAroundCircleOnGraphics(graphics,self.fixedHandlerRadius, 45, 5);
    self.drawHorizontalLineAroundCircleOnGraphics(graphics,self.fixedHandlerRadius, 90, 5);
    self.drawHorizontalLineAroundCircleOnGraphics(graphics,self.fixedHandlerRadius, 135, 5);
    self.drawHorizontalLineAroundCircleOnGraphics(graphics,self.fixedHandlerRadius, 180, 5);
    self.drawHorizontalLineAroundCircleOnGraphics(graphics,self.fixedHandlerRadius, 225, 5);
    self.drawHorizontalLineAroundCircleOnGraphics(graphics,self.fixedHandlerRadius, 270, 5);
    self.drawHorizontalLineAroundCircleOnGraphics(graphics,self.fixedHandlerRadius, 315, 5);
    self.drawHorizontalLineAroundCircleOnGraphics(graphics,self.fixedHandlerRadius, 360, 5);
            
    //self.fixedHandlerSprite = self.game.add.sprite(self.game.world.centerX, self.game.world.centerY, graphics.generateTexture());
    self.fixedHandlerSprite = self.game.add.sprite(self.createdForSprite.x, self.createdForSprite.y, graphics.generateTexture());
    self.game.world.bringToTop(self.fixedHandlerSprite);
    self.fixedHandlerSprite.anchor.set(0.5);
    self.fixedHandlerSprite.inputEnabled = false;    
    graphics.destroy();
};

EditOverlay.prototype.computePointOnCircle = function(radius, angle, lineOffSet) {
    var self = this;
    var xPoint = (radius + lineOffSet) * Math.cos(angle * Math.PI/180);
    var yPoint = (radius + lineOffSet) * Math.sin(angle * Math.PI/180);
    
    return new Phaser.Point(xPoint, yPoint);
};

EditOverlay.prototype.drawHorizontalLineAroundCircleOnGraphics = function(graphics, radius, angle, lineOffSet) {
    var self = this;
    var p1 = self.computePointOnCircle(radius, angle, lineOffSet);
    var p2 = self.computePointOnCircle(radius, angle, -lineOffSet);
    graphics.moveTo(p1.x,p1.y);
    graphics.lineTo(p2.x, p2.y);    
};




EditOverlay.prototype.resetOnScreenObjects = function() {
    var self = this;    
    _.each(self.context.charactersOnScreen, function (sprite) {
        sprite.alpha = sprite.isHidden? 0 : 1; 
    });
        
    _.each(self.context.dragonsOnSceen, function (sprite) {
        sprite.alpha = sprite.isHidden? 0 : 1;
    });
};

//Event Handling

EditOverlay.prototype.refresh = function(distance) {
    var self = this;                 
    self.dynamicCircle.lineStyle(1.5, 0xFFFFFF, 0.6);
    self.game.world.bringToTop(self.dynamicCircle);
    self.dynamicCircle.drawCircle(self.fixedHandlerSprite.x, self.fixedHandlerSprite.y, 2*distance);            
}

EditOverlay.prototype.onDragHandlerInputDown = function(sprite, pointer) {
    var self = this;    
    self.dragHandlerSprite._click = new Phaser.Point(pointer.x, pointer.y);
    self.dynamicCircle.clear();  
    self.editorGroup.visible = false;             
    self.game.input.addMoveCallback(self.onDragHandlerInputDrag, self);     
};

EditOverlay.prototype.onDragHandlerInputDrag = function(pointer, x, y, down) {
    var self = this;        
    //resume game from pause so recording starts
    self.context.resume();
    
    self.dynamicCircle.clear();     
    var rotation = self.game.physics.arcade.angleToPointer(self.fixedHandlerSprite, pointer);    
    var angle = rotation * 180/Math.PI - self.displayAdjustmentAngle;
    self.createdForSprite.rotation = angle * Math.PI/180;
    var difference = 0;
    
    var distance = self.game.physics.arcade.distanceBetween(self.fixedHandlerSprite, self.dragHandlerSprite);

    if(distance <= self.fixedHandlerRadius) {        
        difference = distance - self.fixedHandlerRadius;
    } else {
        difference = distance - self.fixedHandlerRadius;
    }

    var scaleX = self.dragHandlerSprite._clickScale.x + difference/100;
    
    var increasedScaleX = scaleX;
    
    scaleX = scaleX >= self.maxScale?self.maxScale:scaleX;
    scaleX = scaleX <= self.minScale?self.minScale:scaleX;
    self.createdForSprite.scale.set(scaleX);
    //console.log('scale while dragging: ' +scaleX);
    //draw cirle
    if(increasedScaleX >= self.minScale && increasedScaleX <= self.maxScale )
    {        
        self.refresh(distance);
    } 
         
};


EditOverlay.prototype.onDragHandlerInputUp = function(sprite, pointer) {
    var self = this;

    self.game.input.deleteMoveCallback(self.onDragHandlerInputDrag, self);     
    //close all panels and record scale and angle        
    self.game.time.events.add(Phaser.Timer.SECOND * 0.2, function () {
        //record
        if(self.kind === 'armature') {
            self.clickedObject.parentArmatureDisplay.pivot.x = self.initialPivotX;
            self.clickedObject.parentArmatureDisplay.pivot.y = self.initialPivotY;
        } else {        
            self.clickedObject.pivot.x = self.initialPivotX;
            self.clickedObject.pivot.y = self.initialPivotY;
        }

        self.game.recordingManager.recordScalingAndAngle(self.clickedObject);
        self.closeOverlay();
        
    }, self);
};

module.exports = EditOverlay;