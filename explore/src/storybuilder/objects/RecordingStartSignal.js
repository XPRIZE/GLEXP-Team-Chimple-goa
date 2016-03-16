let recordingStartSignal = null;

export default class RecordingStartSignal {
    constructor() {
        if (!recordingStartSignal) {
            recordingStartSignal = new Phaser.Signal();
        }
        return recordingStartSignal;
    }
}