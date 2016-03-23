let playPauseSignal = null;

export default class PlayPauseSignal {
    constructor() {
        if (!playPauseSignal) {
            playPauseSignal = new Phaser.Signal();
        }
        return playPauseSignal;
    }
}