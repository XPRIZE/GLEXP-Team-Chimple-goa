import EnableInputs from './EnableInputs.js';
import ShowAttributeEditorSignal from '../../storybuilder/objects/ShowAttributeEditorSignal.js';
import TextData from '../../storybuilder/objects/TextData.js';
import SoundData from './SoundData.js';
import RecordInfo from '../../storybuilder/objects/RecordInfo.js';
import StoryUtil from '../../storybuilder/objects/StoryUtil.js';
import SpecialAttribute from './SpecialAttribute.js';
import UpdateAttributesSignal from '../../storybuilder/objects/UpdateAttributesSignal.js'
import AttributesChangedSignal from '../../storybuilder/objects/AttributesChangedSignal.js'
import SpecialAttributesChangedSignal from '../../storybuilder/objects/SpecialAttributesChangedSignal.js'
import PlayPauseSignal from '../../storybuilder/objects/PlayPauseSignal.js';
import PlayResumeSignal from '../../storybuilder/objects/PlayResumeSignal.js';
import MiscUtil from '../../util/MiscUtil.js';


export default class TileTexture extends EnableInputs(Phaser.TileSprite) {
    constructor(game, x, y, width, height, key, frame, uniquename) {
        super(game, x, y, width, height, key, frame);

        this.onAttributesChanged = new AttributesChangedSignal();
        
        this.onUpdateAttributesSignal = new UpdateAttributesSignal();
        this.onUpdateAttributesSignal.add(this.changeAttributes, this);

        //Allow item to invoke ShowAttributeEditorSignal()
        this._showAttributeEditorSignal = new ShowAttributeEditorSignal();
        //Special Attribute Changes
        this._specialAttributesChangedSignal = new SpecialAttributesChangedSignal();

        this._specialAttribute = new SpecialAttribute();
        this._playPauseSignal = new PlayPauseSignal();
        this._playResumeSignal = new PlayResumeSignal();
        
        if(!uniquename) {
            this._uniquename = StoryUtil.generateUUID();
        } else {
            this._uniquename = uniquename;
        }

    }

    set uniquename(name) {
        this._uniquename = name;
    }

    get uniquename() {
        return this._uniquename;
    }
    

    addText(textData) {
        this._specialAttribute.addText(textData);
    }

    applyText(whichTextIndex, apply) {
        this._specialAttribute.applyText(whichTextIndex, apply);
        let appliedTextData = this._specialAttribute.getText(whichTextIndex);
        let text = appliedTextData.text;
        //later you should get text, fontColor, backgroundColor, style 
        if (game._inRecordingMode) {
            this._specialAttributesChangedSignal.dispatch({ uniquename: this._uniquename, x: this.x, y: this.y, scaleX: this.scale.x, scaleY: this.scale.y, angle: this.angle, recordingAttributeKind: RecordInfo.TEXT_RECORDING_TYPE, userGeneratedText: text });
        }
    }
    
    addSound(soundData) {
        this._specialAttribute.addSound(soundData); 
    }

    
    applySound(whichSoundIndex, apply) {
        this._specialAttribute.applySound(whichSoundIndex, apply);
        let soundData = this._specialAttribute.getSound(whichSoundIndex);
        soundData.apply = apply;
        if (game._inRecordingMode) {            
            if (game.cache.checkSoundKey(soundData.soundFileName)) {
                                
                if(apply) {
                    soundData.playMusic();                       
                } else {
                    soundData.stopMusic();                    
                }
            }            
            this._specialAttributesChangedSignal.dispatch({ uniquename: this._uniquename, x: this.x, y: this.y, scaleX: this.scale.x, scaleY: this.scale.y, angle: this.angle, recordingAttributeKind: RecordInfo.SOUND_RECORDING_TYPE, soundData: soundData});
        }        
    }


    enableInputs(instance, iterateInside) {
        super.enableInputs(instance, iterateInside);
        this.inputEnabled = true;
        this.input.enableDrag();
        this.events.onInputDown.add(instance.onInputDown, this);
        this.events.onInputUp.add(instance.onInputUp, this);
        this.events.onDragStart.add(instance.onDragStart, this);
        this.events.onDragUpdate.add(instance.onDragUpdate, this);
        this.events.onDragStop.add(instance.onDragStop, this);
        // this.input.priorityID = 1;
        MiscUtil.setPriorityID(this, 1);
    }

    drawBoundingBox(color) {
        let box = this.addChild(new Phaser.Graphics(this.game, -this.offsetX, -this.offsetY));
        box.lineStyle(1, color);
        box.beginFill(0x000000, 0);
        box.drawRect(0, 0, this.width, this.height);
        box.endFill();
        return box;
    }

    toJSON() {
        let json = {
            _class: "TileTexture",
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
            key: this.key,
            frame: this.frameName,
            uniquename: this._uniquename
        }
        return json;
    }

    static fromJSON(game, j) {
        let val = new TileTexture(game, j.x, j.y, j.width, j.height, j.key, j.frame, j.uniquename);
        return val;
    }
    
    applySpecialAttributeChanges(recordedInfo) {
        var self = this;
        //later refactor into 4 different classes
        if (recordedInfo.recordingAttributeKind == RecordInfo.TEXT_RECORDING_TYPE) {
            //send an signal to show Text PopUp to User
            console.log('show text popup to User' + recordedInfo.userGeneratedText);
            $('#element_to_pop_up').bPopup({onClose: function() {
                console.log('closing pop up');
                self._playResumeSignal.dispatch();
            }});
            $("#word").text(recordedInfo.text);
            // var url = "make" + '.json';
            // console.log('url ' + url);
            // var meaning = '';
            // $.getJSON(url, function(jd) {
            //     meaning = jd.meaning;
            //     meaning = $(meaning).text();
            //     $("#word").text(url);
            //     $("#meaning_content").text(meaning);
            //     $("#example_content").text(jd.exmaples);
            //     $("#image_content").attr("src", jd.image);
            // });
            
            self._playPauseSignal.dispatch();
        } else if (recordedInfo.recordingAttributeKind == RecordInfo.SOUND_RECORDING_TYPE) {
            //check if sound present in cache, if so use (should had been created when user choose sound for page)
            // if sound not present, then add to game and reference to game for now - TBD (how to remove)            
            let soundData = recordedInfo.soundData;
            if (game.cache.checkSoundKey(soundData.soundFileName)) {
                if(!this._soundFileName) {
                    this._soundFileName = new SoundData(game, soundData.soundFileName, soundData.apply);    
                }                
                if(soundData.apply) {
                    this._soundFileName.playMusic();        
                } else {
                    this._soundFileName.stopMusic();
                    // this._soundFileName.destroy();
                }
            }
        }
    }
    
    

    changeAttributes(data) {
        this._changeAttributes = data;
    }    

    update() {
        var self = this;
        // game.debug.text('Elapsed seconds: ' + this.game.time.totalElapsedSeconds(), 32, 32);

        if (game._inRecordingMode) {
            console.log('in recording mode');
            this.onAttributesChanged.dispatch({ uniquename: this._uniquename, x: this.x, y: this.y, scaleX: this.scale.x, scaleY: this.scale.y, angle: this.angle, recordingAttributeKind: RecordInfo.DEFAULT_RECORDING_TYPE });
        } else if (game._inPlayMode) {
            console.log('in play mode');
            if (this._changeAttributes != null && this._changeAttributes.size > 0) {
                let json = this._changeAttributes.get(this.uniquename);
                var recordedInfo = RecordInfo.fromJSON(json);
                console.log('this.x: ' + this.x + " this.y:" + this.y);
                this.x = recordedInfo.x;
                this.y = recordedInfo.y;
                this.scale.x = recordedInfo.scaleX;
                this.scale.y = recordedInfo.scaleY;
                this.angle = recordedInfo.angle;
                this.game.camera.x = recordedInfo.cameraX;
                this.game.camera.y = recordedInfo.cameraY;
                console.log('recordedInfo.x:' + recordedInfo.x + "recordedInfo.y:" + recordedInfo.y);
                this.applySpecialAttributeChanges(recordedInfo);

            }
        }
    }
}
