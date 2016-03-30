import RecordingPauseSignal from './RecordingPauseSignal.js';
import RecordingResumeSignal from './RecordingResumeSignal.js';
import Shape from '../../puppet/objects/Shape.js';
import TabView from '../../puppet/objects/TabView.js';
import Sprite from '../../puppet/objects/Scalable.js';
import TextData from './TextData.js';
import TileTexture from '../../scene/objects/TileTexture.js';
import Floor from '../../scene/objects/Floor.js';
import Wall from '../../scene/objects/Wall.js';
import Scene from '../../scene/objects/Scene.js';
import SoundData from '../../scene/objects/SoundData.js';
import Holder from '../../scene/objects/Holder.js';
import Item from '../../scene/objects/Item.js';
import Puppet from '../../puppet/objects/Puppet.js';
import RoundButton from '../../puppet/objects/RoundButton.js';
import Human from '../../puppet/objects/Human.js';
import MiscUtil from '../../util/MiscUtil.js';

export default class AttributeEditOverlay extends Phaser.Group {
    //container to edit item properties
    constructor(game, width, height) {
        super(game);
        this._width = width;
        this._height = height;
        this._recordingPauseSignal = new RecordingPauseSignal();
        this._recordingResumeSignal = new RecordingResumeSignal();
        this._isOpen = false;
    }

    addClickedObject(clickedObject) {

        if (this._isOpen) {
            this.closeAttributeEditOverlay();
            return;
        }

        if (clickedObject instanceof Shape) {
            this._clickedObject = clickedObject.parent.parent;
        } else {
            this._clickedObject = clickedObject;
        }

        this._clickedObject.inputEnabled = false;

        this.constructUI();
    }

    constructUI() {
        this._isOpen = true;
        this._overlayBitMap = game.make.bitmapData(game.width + game.world.camera.x, game.height + game.world.camera.y);
        this._overlayBitMap.draw(game.cache.getImage('storyBuilder/backgroundOverlay'), 0, 0, this._width + game.world.camera.x, this._height + game.world.camera.y);


        this._overlayDisplaySprite = game.add.sprite(0, 0, this._overlayBitMap);
        this._overlayDisplaySprite.anchor.setTo(0, 0);
        this._overlayDisplaySprite.alpha = 0.5;
        this._overlayDisplaySprite.inputEnabled = true;
        game.world.bringToTop(this._overlayDisplaySprite);
        this._overlayDisplaySprite.events.onInputDown.add(this.onInputDown, this);
        this._overlayDisplaySprite.events.onInputUp.add(this.onInputUp, this);

        this.drawScaleHandler(0.8, 0xFFFFFF, 1.5, 75);

        this._settings = this._overlayDisplaySprite.addChild(game.make.sprite(this.game.camera.x + this.game.width - 100, this.game.camera.y + 50, 'storyBuilder/setting'));
        this._settings.fixedToCameara = true;
        this._settings.inputEnabled = true;
        this._settings.events.onInputUp.add(this.createAdditionalPropertiesOverlay, this);
        // this._settings.input.priorityID = 3;
        MiscUtil.setPriorityID(this._settings, 3);
        this._settings.fixedToCameara = true;

        // Looks like this was removed in latest commit so commenting right now
        // //Added TEXT BUTTON to generate Testing Text - later UI will be replaced ...
        // this._textEditor = this._overlayDisplaySprite.addChild(game.make.sprite(400, 60, 'storyBuilder/plus'));
        // this._textEditor.fixedToCameara = true;
        // this._textEditor.inputEnabled = true;
        // this._textEditor.events.onInputUp.add(this.createAdditionalPropertiesOverlay, this);
        // // this._textEditor.input.priorityID = 3;
        // MiscUtil.setPriorityID(this._textEditor, 3);
        
        // if(this._clickedObject instanceof Puppet) {
        //     this._editPuppet = game.add.button(400, 140, 'scene/icons', this.editPuppet, this, 'ic_grid_on_black_24dp_1x.png', 'ic_grid_on_black_24dp_1x.png', 'ic_grid_on_black_24dp_1x.png', 'ic_grid_on_black_24dp_1x.png');
        //     this._editPuppet.anchor.setTo(0.5, 0.5);            
        // }
        
    }
    
    // editPuppet() {
        
    // }

    createAdditionalPropertiesOverlay() {
        console.log('input up');
        //create new TabUI for text and Sound editing
        var that = this;

        game.time.events.add(Phaser.Timer.SECOND * 0.5, function() {
            that._fixedHandlerSprite.destroy();
            that._dragHandlerSprite.destroy();
            that._dynamicCircle.destroy();
            that._overlayDisplaySprite.destroy();


            let backGroundThemes = that.game.cache.getJSON('storyBuilder/background_themes');
            let objectSound = that.game.cache.getJSON('storyBuilder/object_sounds');
            let objectAnim = that.game.cache.getJSON('storyBuilder/object_animation');
            let objectEffects = that.game.cache.getJSON('storyBuilder/object_effects');


            //later get from texture packer
            let TextNames = ["textPlus1", "textPlus2", "textPlus3", "textPlus4"];
            let audioNames = ["AudioPlus1", "AudioPlus2", "AudioPlus3", "AudioPlus4"];
            let animationNames = ["AnimPlus1", "AnimPlus2","AnimPlus3","AnimPlus4"];
            let effectNames = ["EffectPlus1", "EffectPlus2","EffectPlus3","EffectPlus4"]; 
            let audioItem = ["AudioPlus1", "AudioPlus2"];


            that._clickedObject._specialAttribute.allTexts.forEach(function(element, index) {
                TextNames[index] = 'textPlus1';
                if (element != null && element instanceof TextData) {
                    TextNames[index] = 'forest_1_th';
                }
            }, this);

            that._clickedObject._specialAttribute.allSounds.forEach(function(element, index) {
                audioNames[index] = 'AudioPlus1';
                if (element != null && element instanceof SoundData) {
                    audioNames[index] = 'soundButton';
                }
            }, this);
            
            // if(that._clickedObject instanceof Human){
            //     that._clickedObject._specialAttribute.allAnimation.forEach(function(element, index) {
            //         animationNames[index] = 'AnimPlus1';
            //         if (element != null && element instanceof SoundData) {
            //             animationNames[index] = 'forest_1_th';
            //         }
            //     }, this);
            // }
            // if(that._clickedObject instanceof TileTexture){
            //     that._clickedObject._specialAttribute.allAnimation.forEach(function(element, index) {
            //         effectNames[index] = 'EffectPlus1';
            //         if (element != null && element instanceof SoundData) {
            //             effectNames[index] = 'forest_1_th';
            //         }
            //     }, this);
            // }

            that._itemSettingTab = that.game.add.existing(new TabView(that.game, 'storyBuilder/icons', that.game.width + that.game.world.camera.x, that.game.height + that.game.world.camera.y, 10, 50, 5, 3, true, function(tab, button) {


                let self = that;
                that._itemSettingTab.unSelect();
                // that._itemSettingTab.destroy();
                that._clickedObject.inputEnabled = true;

                let index = 0, flag = false;

                // If condition true when recording is in pause mode
                if(game._inPauseRecording){
                    if(tab == "text"){    
                        for(index =0 ; index < TextNames.length ; index++){
                                if(TextNames[index] == button){
                                    flag = true;
                                }
                                if(flag)
                                    break;
                        }                                                     
                        this._recordingResumeSignal.dispatch();
                        this._clickedObject.applyText(index, false); 
                        
                        //later if all applied then toggle it
                    
                    }else if( tab == "audio"){

                        for(index =0 ; index < audioNames.length ; index++){
                                if(audioNames[index] == button){
                                    flag = true;
                                }
                                if(flag)
                                    break;
                        }      
                        
                        this._recordingResumeSignal.dispatch();
                       if(!window.isMusicOn) { 
                        this._clickedObject.applySound(index, true);
                        window.isMusicOn = true;   
                       }
                        else {
                        this._clickedObject.applySound(index, false);
                        window.isMusicOn = false;                               
                        }    
                        // console.log(" ----  -- pressed in audio : "+ index);
                    }else if (tab == "anim"){
                        
                        for(index =0 ; index < animationNames.length ; index++){
                                if(animationNames[index] == button){
                                    flag = true;
                                }
                                if(flag)
                                    break;
                        }
                        console.log(" ----  -- pressed in audio : "+ index);      
                        
                    }
                    
                    this._itemSettingTab.destroy();

                } else {
                    
                        if(tab == "text"){                                                
                        
                            that.clilckedButtonName = button;
                            
                            $("#login-box").fadeIn(300);
                            
                            $('body').append('<div id="mask"></div>');
                            $('#mask').fadeIn(300);
                                window.callback = this.addtext_fromhtml;
                                window.callbackContext = this;
                            
                        }else if( tab == "audio"){
                            
                            console.log("inside the audio tab ");
                            this.clilckedButtonName = button;  
                            self._itemAudioTab = that.game.add.existing(new TabView(self.game, 'scene/scene', self.game.width + self.game.world.camera.x, self.game.height + self.game.world.camera.y, 10, 50, 5, 3, true, function(tab, button) {
                                    
                                console.log(" TabName:"+ tab + " ButtonName: "+ button + " KeyName: "+ objectSound[tab][button]);        
                               
                                this.setAudioData(objectSound[tab][button]);
                                 that._itemSettingTab.destroy();
                            }, that, objectSound));
                            
                            self._itemAudioTab.tabs = { 'forest': audioItem ,'village': audioItem , 'city': audioItem };
                            self._itemAudioTab.x = that.game.width * 0.05;
                            self._itemAudioTab.y = 0;
                            self._itemAudioTab.fixedToCamera = true;
                            self._itemAudioTab.visible = true;
                            self._itemAudioTab.bringToTop = true;
                            
                        }else if (tab == "anim"){
                            
                            console.log("inside the anim tab ");
                            this.clilckedButtonName = button;  
                            self._itemAnimTab = that.game.add.existing(new TabView(self.game, 'scene/scene', self.game.width + self.game.world.camera.x, self.game.height + self.game.world.camera.y, 10, 50, 5, 3, true, function(tab, button) {
                                    
                                console.log(" TabName:"+ tab + " ButtonName: "+ button + " KeyName: "+ objectAnim[tab][button]);        
                               
                              //  this.setAudioData(objectSound[tab][button]);
                                 self._itemAnimTab.destroy();
                                 that._itemSettingTab.destroy();
                            }, that, objectAnim));
                            
                            self._itemAnimTab.tabs = { 'human': audioItem ,'animal': audioItem , 'alen': audioItem };
                            self._itemAnimTab.x = that.game.width * 0.05;
                            self._itemAnimTab.y = 0;
                            self._itemAnimTab.fixedToCamera = true;
                            self._itemAnimTab.visible = true;
                            self._itemAnimTab.bringToTop = true;
                            
                        }else if (tab == 'effects'){
                            
                             console.log("inside the Effects tab ");
                            this.clilckedButtonName = button;  
                            self._itemAnimTab = that.game.add.existing(new TabView(self.game, 'scene/scene', self.game.width + self.game.world.camera.x, self.game.height + self.game.world.camera.y, 10, 50, 5, 3, true, function(tab, button) {
                                    
                                console.log(" TabName:"+ tab + " ButtonName: "+ button + " KeyName: "+ objectEffects[tab][button]);        
                               
                              //  this.setAudioData(objectSound[tab][button]);
                                 self._itemAnimTab.destroy();
                                 that._itemSettingTab.destroy();
                            }, that, objectEffects));
                            
                            self._itemAnimTab.tabs = { 'effect1': audioItem ,'effect2': audioItem , 'effect3': audioItem };
                            self._itemAnimTab.x = that.game.width * 0.05;
                            self._itemAnimTab.y = 0;
                            self._itemAnimTab.fixedToCamera = true;
                            self._itemAnimTab.visible = true;
                            self._itemAnimTab.bringToTop = true;
                            
                        }
                }              
            }, that, backGroundThemes));


            if(that._clickedObject instanceof Human){
                that._itemSettingTab.tabs = { 'text': TextNames, 'audio': audioNames , 'anim' : animationNames };
            }            
            else if(that._clickedObject instanceof TileTexture){
                that._itemSettingTab.tabs = { 'text': TextNames, 'audio': audioNames , 'effects' : effectNames};
            }
            else if((that._clickedObject instanceof Item) || (that._clickedObject instanceof Holder)){
                that._itemSettingTab.tabs = { 'text': TextNames, 'audio': audioNames };
            }            
            else{
                console.log("It does not understand the type of clickedObject , so thats why 4 popup categories came");
                that._itemSettingTab.tabs = { 'text': TextNames, 'audio': audioNames , 'anim' : animationNames , 'effects' : effectNames};
            }
            
            that._itemSettingTab.x = that.game.width * 0.05;
            that._itemSettingTab.y = 0;
            that._itemSettingTab.fixedToCamera = true;
            that._itemSettingTab.visible = true;
            that._itemSettingTab.bringToTop = true;
        });
    }


    addtext_fromhtml(textvalue, text_color, background_color) {
        let value = this._itemSettingTab.buttonView.buttonPanel;
        this._textFromHtml = textvalue;
        let jsonDataText = null;
        for (var i = 0; i < value.children.length; i++) {
            if (value.children[i] instanceof RoundButton) {
                if (this.clilckedButtonName == value.children[i].name) {
                    var style = { font: "32px Arial", fill: "" + text_color, wordWrap: true, wordWrapWidth: value.children[i].width, align: "center", backgroundColor: "" + background_color };

                    let x = value.children[i].x, y = value.children[i].y;
                    jsonDataText = new TextData(game, 0, 0, this.clilckedButtonName, null, textvalue, style, this._clickedObject._uniquename, 0);

                    value.children[i].children[0].loadTexture("storyBuilder/forest_1_th");
                  //  value.children[i].parent = value;
                    console.log("JSON FOR TEXT OBJECT \n\n" + JSON.stringify(jsonDataText));
                }
            }
        }
        this._clickedObject.addText(jsonDataText);
        this._recordingResumeSignal.dispatch();
        //this._clickedObject._specialAttributes.text.push(textvalue);
        console.log(" text value : " + this._clickedObject._specialAttribute.text);
        this._itemSettingTab.destroy();
    }

    setAudioData(soundFileName) {
        console.log(" destroy aduio inside tebview");
        this._itemAudioTab.destroy();
        let value = this._itemSettingTab.buttonView.buttonPanel;
        let jsonDataAudio = null;
        for (var i = 0; i < value.children.length; i++) {
            if (value.children[i] instanceof RoundButton) {
                if (this.clilckedButtonName == value.children[i].name) {
                    var style = { font: "32px Arial", fill: "" + text_color, wordWrap: true, wordWrapWidth: value.children[i].width, align: "center", backgroundColor: "" + background_color };

                    jsonDataAudio = new SoundData(game, soundFileName, 0);
                    value.children[i].children[0].loadTexture("storyBuilder/sound_button");
                  //  value.children[i].parent = value;
                    console.log("JSON FOR TEXT OBJECT \n\n" + JSON.stringify(jsonDataAudio));
                }
            }            
        }
        this._clickedObject.addSound(jsonDataAudio);
        this._itemSettingTab.destroy();
    }

    drawScaleHandler(alpha, color, lineWidth, radius) {
        this._dynamicCircle = self.game.add.graphics(0, 0);
        this.drawFixedHandler(alpha, color, lineWidth, radius);
        this.drawDragHandler(alpha, color, lineWidth, 20);
        this._recordingPauseSignal.dispatch();
    }

    drawFixedHandler(alpha, color, lineWidth, radius) {
        let graphics = game.add.graphics(0, 0);
        graphics.lineStyle(lineWidth, color, alpha);
        graphics.drawCircle(0, 0, 2 * radius);

        //draw line across circle

        this.drawHorizontalLineAroundCircleOnGraphics(graphics, radius, 0, 5);
        this.drawHorizontalLineAroundCircleOnGraphics(graphics, radius, 45, 5);
        this.drawHorizontalLineAroundCircleOnGraphics(graphics, radius, 90, 5);
        this.drawHorizontalLineAroundCircleOnGraphics(graphics, radius, 135, 5);
        this.drawHorizontalLineAroundCircleOnGraphics(graphics, radius, 180, 5);
        this.drawHorizontalLineAroundCircleOnGraphics(graphics, radius, 225, 5);
        this.drawHorizontalLineAroundCircleOnGraphics(graphics, radius, 270, 5);
        this.drawHorizontalLineAroundCircleOnGraphics(graphics, radius, 315, 5);
        this.drawHorizontalLineAroundCircleOnGraphics(graphics, radius, 360, 5);

        let clickedPointer = this._clickedObject.toGlobal(new Phaser.Point(game.input.activePointer.x, game.input.activePointer.y));
        let topLeftPoint = this._clickedObject.toGlobal(new Phaser.Point(game.camera.x + 0, game.camera.y + 0));
        let boundingBox = null;
        if (this._clickedObject instanceof Puppet) {
            let pos = this._clickedObject.toGlobal(new Phaser.Point(0 + game.camera.x, - this._clickedObject.height / 2 + game.camera.y));
            clickedPointer = new Phaser.Point(pos.x, pos.y);
        } else if (this._clickedObject instanceof Holder) {
            boundingBox = this._clickedObject.drawBoundingBox(0xFFFFFF);
            clickedPointer = new Phaser.Point(topLeftPoint.x + boundingBox.width / 2, topLeftPoint.y + boundingBox.height / 2);
            boundingBox.destroy();    
    } else if (this._clickedObject instanceof Item) {
            boundingBox = this._clickedObject.drawBoundingBox(0xFFFFFF);
            let actualX = topLeftPoint.x - boundingBox.width * this._clickedObject.anchor.x;
            let actualY = topLeftPoint.y - boundingBox.height * this._clickedObject.anchor.y;
            clickedPointer = new Phaser.Point(actualX + boundingBox.width / 2, actualY + boundingBox.height / 2);
            boundingBox.destroy();    
    }
        
        this._fixedHandlerSprite = game.add.sprite(clickedPointer.x, clickedPointer.y, graphics.generateTexture());
        this.add(this._fixedHandlerSprite);
        game.world.bringToTop(this._fixedHandlerSprite);
        this._fixedHandlerSprite.anchor.set(0.5);
        this._fixedHandlerSprite.inputEnabled = false;
        graphics.destroy();
    }


    drawHorizontalLineAroundCircleOnGraphics(graphics, radius, angle, lineOffSet) {
        let p1 = this.computePointOnCircle(radius, angle, lineOffSet);
        let p2 = this.computePointOnCircle(radius, angle, -lineOffSet);
        graphics.moveTo(p1.x, p1.y);
        graphics.lineTo(p2.x, p2.y);
    }

    computePointOnCircle(radius, angle, lineOffSet) {
        let xPoint = (radius + lineOffSet) * Math.cos(angle * Math.PI / 180);
        let yPoint = (radius + lineOffSet) * Math.sin(angle * Math.PI / 180);

        return new Phaser.Point(xPoint, yPoint);
    }

    drawDragHandler(alpha, color, lineWidth, radius) {
        let graphicsDrag = game.add.graphics(0, 0);
        graphicsDrag.lineStyle(lineWidth, color, alpha);
        graphicsDrag.drawCircle(0, 0, 2 * radius);

        let initialDistance = (this._clickedObject.scale.x - 1.0) * 100 + 75;
        let xPoint = (initialDistance * Math.cos((this._clickedObject.angle + 90) * Math.PI / 180));
        let yPoint = (initialDistance * Math.sin((this._clickedObject.angle + 90) * Math.PI / 180));
        this.refresh(initialDistance);

        this._dragHandlerSprite = game.add.sprite(this._fixedHandlerSprite.x + xPoint, this._fixedHandlerSprite.y + yPoint, graphicsDrag.generateTexture());
        game.world.bringToTop(this._dragHandlerSprite);
        this._dragHandlerSprite.anchor.setTo(0.5);
        this._dragHandlerSprite.inputEnabled = true;
        this._dragHandlerSprite.input.enableDrag(false, true);
        // this._dragHandlerSprite.input.priorityID = 3;
        MiscUtil.setPriorityID(this._dragHandlerSprite, 3);
        
        this._dragHandlerSprite.angle = this._clickedObject.angle;
        this._dragHandlerSprite._click = 0;
        this._dragHandlerSprite._clickScale = new Phaser.Point(1, 1);
        this._dragHandlerSprite.input.useHandCursor = true;
        this._dragHandlerSprite.input.bringToTop = true;
        this._dragHandlerSprite.events.onInputDown.add(this.onDragHandlerInputDown, this);
        this._dragHandlerSprite.events.onInputUp.add(this.onDragHandlerInputUp, this);

        graphicsDrag.destroy();
    }

    refresh(distance) {
        this._dynamicCircle.lineStyle(1.5, 0xFFFFFF, 0.6);
        game.world.bringToTop(this._dynamicCircle);
        this._dynamicCircle.drawCircle(this._fixedHandlerSprite.x, this._fixedHandlerSprite.y, 2 * distance);

    }


    onDragHandlerInputDown(sprite, pointer) {
        this._dragHandlerSprite._click = new Phaser.Point(pointer.x, pointer.y);
        this._dynamicCircle.clear();
        this._clickedObject.bringToTop = true;
        game.input.addMoveCallback(this.onDragHandlerInputDrag, this);
    }

    onDragHandlerInputDrag(pointer, x, y, down) {
        this._dynamicCircle.clear();
        this._recordingResumeSignal.dispatch();
        let rotation = game.physics.arcade.angleToPointer(this._fixedHandlerSprite, pointer);
        let angle = rotation * 180 / Math.PI - 90;


        let difference = 0;

        let distance = game.physics.arcade.distanceBetween(this._fixedHandlerSprite, this._dragHandlerSprite);
        difference = distance - 75;

        let scaleX = this._dragHandlerSprite._clickScale.x + difference / 100;
        let increasedScaleX = scaleX;
        if (this._clickedObject instanceof TileTexture) {
            console.log('instand of tile texture');
            if (this._clickedObject.parent && (this._clickedObject.parent instanceof Wall || this._clickedObject.parent instanceof Floor)) {
                if (this._clickedObject.parent.parent && this._clickedObject.parent.parent instanceof Scene) {
                    this._clickedObject.parent.parent.scale.setTo(scaleX, scaleX);
                }
            }
        } else {
            this._clickedObject.angle = angle;
            this._clickedObject.scale.setTo(scaleX, scaleX);
        }

        this.refresh(distance);
    }

    onDragHandlerInputUp(sprite, pointer) {
        let self = this;
        this._clickedObject.bringToTop = false;
        game.input.deleteMoveCallback(this.onDragHandlerInputDrag, this);
        this.closeAttributeEditOverlay();
    }

    onInputDown() {
        let self = this;
        this.closeAttributeEditOverlay();
    }

    closeAttributeEditOverlay() {
        var that = this;
        game.time.events.add(Phaser.Timer.SECOND * 0.5, function() {
            that._fixedHandlerSprite.destroy();
            that._dragHandlerSprite.destroy();
            that._overlayDisplaySprite.destroy();
            that._dynamicCircle.destroy();
            if(that._editPuppet) {
                that._editPuppet.destroy();
            } 
            that._clickedObject.inputEnabled = true;
            that._recordingResumeSignal.dispatch();
            that._isOpen = false;
        });


    }

    onInputUp() {

    }

    render() {
        // Input debug info
        // game.debug.inputInfo(32, 32);
        // game.debug.pointer(game.input.activePointer);

    }

    shutdown() {
        this._overlayBitMap.destroy();
    }
}