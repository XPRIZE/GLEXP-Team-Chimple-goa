import RecordingStartSignal from '../objects/RecordingStartSignal.js';
import RecordingStopSignal from '../objects/RecordingStopSignal.js';
import RecordingPauseSignal from './RecordingPauseSignal.js';
import RecordingResumeSignal from './RecordingResumeSignal.js';
import AttributesChangedSignal from '../objects/AttributesChangedSignal.js'
import UpdateAttributesSignal from '../objects/UpdateAttributesSignal.js'
import RecordInfo from '../objects/RecordInfo.js';


var _ = require('lodash')._;


export default class RecordingManager extends Phaser.Group {
    constructor(game) {
        super(game);
        this._sceneRecordingMap = new Map();
        
        //create UI
        this.createControls(game);
        this.registerToListeners();
    }


    createControls(game) {
        this.recordButton = new Phaser.Sprite(game, game.width - 60, 80, 'storyBuilder/record');
        this.recordButton.fixedToCamera = true;
        this.recordButton.inputEnabled = true;
        this.recordButton.scale.setTo(0.5, 0.5);
        this.add(this.recordButton);
        this.recordButton.events.onInputDown.add(this.toggleRecording, this);
        this.add(this.recordButton);        
        

        this.playButton = new Phaser.Sprite(game, game.width - 120, 80, 'storyBuilder/pause');
        this.playButton.alpha = 1; //hidden until user records first time
        this.playButton.fixedToCamera = true;
        this.playButton.inputEnabled = true;
        this.playButton.scale.setTo(0.5, 0.5);
        this.playButton.events.onInputDown.add(this.narrateStory, this);
        this.add(this.playButton);                

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
            this.recordButton.loadTexture('storyBuilder/record');
            this._recordingStopSignal.dispatch();
        } else {
            this.recordingStartTime = new Date();
            this._recordingStartSignal.dispatch(this.recordingStartTime);

            console.log('recording starting at second: ' + this.recordingStartTime);

            game._inRecordingMode = true;
            //update texture of button
            this.recordButton.loadTexture('storyBuilder/stop');
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

        this._updateAttributeSignal = new UpdateAttributesSignal();
    }

    handleAttributeChange(data) {
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
                //dispatch
                let recordedData = this.findNearestUpdateAttributeInformationByCurrentPlayCounter(this.currentPlayCounter);
                console.log('recordedData at counter:' + this.currentPlayCounter + " is:" + recordedData);
                this._updateAttributeSignal.dispatch(recordedData);
            }
        }
    }

    findNearestUpdateAttributeInformationByCurrentPlayCounter(lookUpKey) {
        if (this._sceneRecordingMap && this._sceneRecordingMap.size > 0) {
            let keys = Array.from(this._sceneRecordingMap.keys());
            var closest = keys.reduce(function(prev, curr) {
                return (Math.abs(curr - lookUpKey) < Math.abs(prev - lookUpKey) ? curr : prev);
            });
            console.log('closest key:' + closest + " and lookupkey:" + lookUpKey);
            return this._sceneRecordingMap.get(closest);
        };
    }

    addToMap(data) {
        let recordInfo = new RecordInfo(data.uniquename, data.x, data.y, data.scaleX, data.scaleY, data.angle);
        let spriteMap = this._sceneRecordingMap.get(this.currentRecordingCounter);
        if (!spriteMap) {
            let curRecordingMap = new Map();
            curRecordingMap.set(data.uniquename, recordInfo.toJSON());
            this._sceneRecordingMap.set(this.currentRecordingCounter, curRecordingMap);
        } else {
            spriteMap.set(data.uniquename, recordInfo.toJSON());
        }
        console.log('this._sceneRecordingMap:' + JSON.stringify(this._sceneRecordingMap) + "at recording counter:" + this.currentRecordingCounter);
    }


    computeRecordingTimeCounters(delta) {
        this.currentRecordingCounter += delta;
        console.log('currentRecordingCounter updated:' + this.currentRecordingCounter);
    }

    computePlayTimeCounters(delta) {
        if (this.currentPlayCounter) {
            this.previousPlayCounter = this.currentPlayCounter;
        }
        this.currentPlayCounter += delta;
        console.log('game.currentPlayCounter:' + this.currentPlayCounter);
    }
}