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
    
    playMusic() {
        //for now hardcoded volume and loop
        this._music =  game.add.audio(this.soundFileName, 1.0, false);        
        this._music.play();        
    }
    
    
    stopMusic() {
        this._music.stop();
        this._music.destroy();
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