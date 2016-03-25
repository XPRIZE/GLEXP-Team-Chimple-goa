export default class SoundData {
    constructor(game, soundFileName, apply) {
        this.soundFileName = soundFileName;
        this.apply = apply;
        //for now hardcoded volume and loop
        game.add.audio(soundFileName, 1.0, false);
    }
    
    

    toJSON() {
        let json = {
            _class: "SoundData",
            soundFileName: this.soundFileName,
            apply: this.apply
        }
        return json;
    }

    static fromJSON(game, j) {
        let soundData = new SoundData(game, j.soundFileName, j.apply);
        return soundData;
    }
}