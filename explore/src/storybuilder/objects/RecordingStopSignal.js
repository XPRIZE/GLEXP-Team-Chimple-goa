let recordingStopSignal = null;

export default class RecordingStopSignal {
    constructor() {
        if (!recordingStopSignal) {
            recordingStopSignal = new Phaser.Signal();
        }
        return recordingStopSignal;
    }
}