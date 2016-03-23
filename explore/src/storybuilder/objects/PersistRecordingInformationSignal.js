let persistRecordingInformationSignal = null;

export default class PersistRecordingInformationSignal {
    constructor() {
        if (!persistRecordingInformationSignal) {
            persistRecordingInformationSignal = new Phaser.Signal();
        }
        return persistRecordingInformationSignal;
    }
}