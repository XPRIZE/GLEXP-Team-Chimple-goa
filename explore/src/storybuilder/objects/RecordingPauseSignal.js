let recordingPauseSignal = null;

export default class RecordingPauseSignal {
    constructor() {
        if (!recordingPauseSignal) {
            recordingPauseSignal = new Phaser.Signal();
        }
        return recordingPauseSignal;
    }
}