let playResumeSignal = null;

export default class PlayResumeSignal {
    constructor() {
        if (!playResumeSignal) {
            playResumeSignal = new Phaser.Signal();
        }
        return playResumeSignal;
    }
}