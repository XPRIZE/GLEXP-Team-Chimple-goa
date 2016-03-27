let recordingPlayEndSignal = null;

export default class RecordingPlayEndSignal {
    constructor() {
        if (!recordingPlayEndSignal) {
            recordingPlayEndSignal = new Phaser.Signal();
        }
        return recordingPlayEndSignal;
    }
}