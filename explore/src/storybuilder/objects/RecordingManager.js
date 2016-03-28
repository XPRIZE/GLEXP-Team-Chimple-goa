import RecordingStartSignal from '../objects/RecordingStartSignal.js';
import RecordingStopSignal from '../objects/RecordingStopSignal.js';
import RecordingPauseSignal from './RecordingPauseSignal.js';
import RecordingResumeSignal from './RecordingResumeSignal.js';
import PlayPauseSignal from './PlayPauseSignal.js';
import PlayResumeSignal from './PlayResumeSignal.js';
import AttributesChangedSignal from '../objects/AttributesChangedSignal.js'
import SpecialAttributesChangedSignal from '../objects/SpecialAttributesChangedSignal.js'
import UpdateAttributesSignal from '../objects/UpdateAttributesSignal.js'
import PersistRecordingInformationSignal from '../objects/PersistRecordingInformationSignal.js'
import RecordInfo from '../objects/RecordInfo.js';
import StoryUtil from '../objects/StoryUtil.js';
import SoundData from '../../scene/objects/SoundData.js';
import RecordingPlayEndSignal from '../objects/RecordingPlayEndSignal.js'

var _ = require('lodash')._;


export default class RecordingManager extends Phaser.Group {
    constructor(game, existingRecordingCounter, existingRecordedInformation) {
        super(game);
        this._sceneRecordingMap = new Map();

        //create UI
        this.registerToListeners();


        if (existingRecordedInformation != null && existingRecordedInformation != undefined) {
            this.loadPreRecordedInformationToMap(existingRecordedInformation);
        }

        if (existingRecordingCounter > 0) {
            this.currentRecordingCounter = existingRecordingCounter;
        }
    }
    
    narrateStory() {
        game._inPlayMode = true;
        this.playStartTime = this._updatedTime = new Date();
        this.currentPlayCounter = 0;
    }

    toggleRecording() {
        if (game._inRecordingMode) {
            game._inRecordingMode = false;
            //update texture of button
            this._recordingStopSignal.dispatch();
        } else {
            this.recordingStartTime = new Date();
            this._recordingStartSignal.dispatch(this.recordingStartTime);

            console.log('recording starting at second: ' + this.recordingStartTime);

            game._inRecordingMode = true;
        }
    }
    
    registerToListeners() {
        game._inRecordingMode = false;
        game._inPlayMode = false;
        game._inPauseRecording = false;

        this._recordingStartSignal = new RecordingStartSignal();
        this._recordingStartSignal.add(this.resetRecordingInformation, this);

        this._recordingStopSignal = new RecordingStopSignal();
        this._recordingStopSignal.add(this.persistRecordedInformation, this);

        this._recordingPauseSignal = new RecordingPauseSignal();
        this._recordingPauseSignal.add(this.pauseRecording, this);

        this._recordingResumeSignal = new RecordingResumeSignal();
        this._recordingResumeSignal.add(this.resumeRecording, this);

        this._attributesChangedSignal = new AttributesChangedSignal();
        this._attributesChangedSignal.add(this.handleAttributeChange, this);

        this._specialAttributesChangedSignal = new SpecialAttributesChangedSignal();
        this._specialAttributesChangedSignal.add(this.handleSpecialAttributeChange, this);

        this._updateAttributeSignal = new UpdateAttributesSignal();

        this._persistRecordingInformationSignal = new PersistRecordingInformationSignal();
        
        this._playPauseSignal = new PlayPauseSignal();
        this._playPauseSignal.add(this.pausePlay, this);
        
        this._playResumeSignal = new PlayResumeSignal();
        this._playResumeSignal.add(this.resumePlay, this);
        
        this._recordingPlayEndSignal = new RecordingPlayEndSignal();
    }
    
    
    pausePlay() {
        console.log('play pause signal at: ' + this.currentPlayCounter);
        game._inPlayMode = false;
    }
    
    resumePlay() {
        console.log('play resume signal at: ' + this.currentPlayCounter);
        this._updatedTime = new Date();
        game._inPlayMode = true;
    }

    handleAttributeChange(data) {
        this.addToMap(data);
    }

    handleSpecialAttributeChange(data) {
        this.addToMap(data);       
    }   
    
    resumeRecording() {
        if (game._inPauseRecording) {
            console.log('game resumed from pause to recording state:');
            game._inRecordingMode = true;
            game._inPauseRecording = false;
        }
    }

    pauseRecording() {
        if (game._inRecordingMode) {
            console.log('game resumed from pause to recording state:');
            game._inRecordingMode = false;
            game._inPauseRecording = true;
            console.log('updated pauseStart key should be :' + this.currentRecordingCounter);

        }

    }

    resetRecordingInformation(recordingStartTime) {
        console.log('in recording manager ==> call to reset Map');
        this._sceneRecordingMap = new Map();
        game._inRecordingMode = true;

        //set up time when recording starts
        this._updatedTime = recordingStartTime;
        this.currentRecordingCounter = 0;
    }

    persistRecordedInformation() {
        //persist this._sceneRecordingMap
        console.log('this._sceneRecordingMap:' + this._sceneRecordingMap);
        let recordedObjInformation = StoryUtil.map_to_object(this._sceneRecordingMap);
        let jsonObjectString = JSON.stringify(recordedObjInformation);
        this.convertRecordedInformationToMap(jsonObjectString);
        this._persistRecordingInformationSignal.dispatch(jsonObjectString, this.currentRecordingCounter);
        game._inRecordingMode = false;
    }

    retrieveRecordedInformation() {
        return this._sceneRecordingMap;
    }


    update() {
        if (this._updatedTime) {
            this._previousUpdatedTime = this._updatedTime;
        }
        this._updatedTime = new Date();
        if (this._updatedTime && this._previousUpdatedTime) {
            let delta = this._updatedTime.getTime() - this._previousUpdatedTime.getTime();
            if (game._inRecordingMode) {
                this.computeRecordingTimeCounters(delta);
            } else if (game._inPlayMode) {
                this.computePlayTimeCounters(delta);

                game._inPlayMode = this.currentPlayCounter < this.currentRecordingCounter + 50;
                console.log('game._inPlayMode:' + game._inPlayMode + ' and this.currentPlayCounter:' + this.currentPlayCounter + ' and this.currentRecordingCounter:' + this.currentRecordingCounter);
                //dispatch
                let recordedData = this.findNearestUpdateAttributeInformationByCurrentPlayCounter(this.currentPlayCounter);
                console.log('recordedData at counter:' + this.currentPlayCounter + " is:" + recordedData);
                this._updateAttributeSignal.dispatch(recordedData);
                
                if(!game._inPlayMode)
                {
                    //this.playButton.inputEnabled = true;
                    // this.recordButton.inputEnabled = true;
                    this._recordingPlayEndSignal.dispatch();
                }
            }
        }
    }

    loadPreRecordedInformationToMap(JSONRecordingInformation) {
        let recordedInformationObject = JSON.parse(JSONRecordingInformation);
        this._map = StoryUtil.objectToMap(recordedInformationObject);
        return this._map;
    }


    convertRecordedInformationToMap(JSONRecordingInformation) {
        let recordedInformationObject = JSON.parse(JSONRecordingInformation);
        this._map = StoryUtil.objectToMap(recordedInformationObject);
        return this._map;
    }

    findNearestUpdateAttributeInformationByCurrentPlayCounter(lookUpKey) {
        if (this._map && this._map.size > 0) {
            let keys = Array.from(this._map.keys());
            var closest = keys.reduce(function(prev, curr) {
                return (Math.abs(curr - lookUpKey) < Math.abs(prev - lookUpKey) ? curr : prev);
            });
            console.log('closest key 1111 :' + closest + " and lookupkey 1111 :" + lookUpKey);
            console.log('what we got here:' + this._map.get(closest));
            return this._map.get(closest);
        };


        /*        if (this._sceneRecordingMap && this._sceneRecordingMap.size > 0) {
                    let keys = Array.from(this._sceneRecordingMap.keys());
                    var closest = keys.reduce(function(prev, curr) {
                        return (Math.abs(curr - lookUpKey) < Math.abs(prev - lookUpKey) ? curr : prev);
                    });
                    console.log('closest key:' + closest + " and lookupkey:" + lookUpKey);
                    return this._sceneRecordingMap.get(closest);
                };*/
    }

    addToMap(data) {
        let recordInfo = new RecordInfo(data.uniquename, data.x, data.y, data.scaleX, data.scaleY, data.angle, data.recordingAttributeKind, game.camera.x, game.camera.y);
        this.recordSpecialTextAttribute(data, recordInfo);
        this.recordSpecialSoundAttribute(data, recordInfo);
        let spriteMap = this._sceneRecordingMap.get(this.currentRecordingCounter);
        if (!spriteMap) {
            let curRecordingMap = new Map();
            curRecordingMap.set(data.uniquename, recordInfo.toJSON());
            this._sceneRecordingMap.set(this.currentRecordingCounter, curRecordingMap);
        } else {
            spriteMap.set(data.uniquename, recordInfo.toJSON());
        }
        // console.log('recordInfo:' + JSON.stringify(recordInfo) + "at recording counter:" + this.currentRecordingCounter);
        
        if(recordInfo.recordingAttributeKind === RecordInfo.TEXT_RECORDING_TYPE) {
            console.log('text message received at ' + this.currentRecordingCounter);
        }
    }
    
    recordSpecialTextAttribute(data, recordInfo) {
      if(recordInfo.recordingAttributeKind === RecordInfo.TEXT_RECORDING_TYPE && data.userGeneratedText != null) {
         recordInfo.text = data.userGeneratedText;
         console.log('text message received at ' + this.currentRecordingCounter);          
      }  
    }
    
    recordSpecialSoundAttribute(data, recordInfo) {
      if(recordInfo.recordingAttributeKind === RecordInfo.SOUND_RECORDING_TYPE && data.soundData != null) {
          let soundInfo = new SoundData(game, data.soundData.soundFileName, data.soundData.apply);
          recordInfo.soundData = soundInfo; 
          console.log('sound message received at ' + this.currentRecordingCounter);          
      }  
    }   

    computeRecordingTimeCounters(delta) {
        this.currentRecordingCounter += delta;
        // console.log('currentRecordingCounter updated:' + this.currentRecordingCounter);
    }

    computePlayTimeCounters(delta) {
        if (this.currentPlayCounter) {
            this.previousPlayCounter = this.currentPlayCounter;
        }
        this.currentPlayCounter += delta;
        console.log('game.currentPlayCounter:' + this.currentPlayCounter);
    }
}