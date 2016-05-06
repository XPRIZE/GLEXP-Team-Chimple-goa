export default class SoundData {
    constructor(game, soundFileName, apply) {
        this._soundFileName = soundFileName;
        this._apply = apply;
    }
    
    set soundFileName(soundFileName) {
        this._soundFileName = soundFileName;
    }
    
    
    get soundFileName() {
        return this._soundFileName;
    }
    
    
    set apply(apply) {
        this._apply = apply;
    }
    
    get apply() {
        return this._apply;
    }
    
    toJSON() {
        let json = {
            _class: "SoundData",
            soundFileName: this._soundFileName,
            apply: this._apply
        }
        return json;
    }

    static fromJSON(game, j) {
        let soundData = new SoundData(game, j.soundFileName, j.apply);
        return soundData;
    }
}