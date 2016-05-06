let recordingResumeSignal = null;

export default class RecordingResumeSignal {
    constructor() {
        if (!recordingResumeSignal) {
            recordingResumeSignal = new Phaser.Signal();
        }
        return recordingResumeSignal;
    }
}