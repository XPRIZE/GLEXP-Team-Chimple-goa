export default class RecordInfo {
    constructor(uniquename, x, y, scaleX, scaleY, angle, recordingAttributeKind, cameraX, cameraY) {
        this.uniquename = uniquename;
        this.x = x;
        this.y = y;
        this.scaleX = scaleX;
        this.scaleY = scaleY;
        this.angle = angle;
        if(recordingAttributeKind == null || recordingAttributeKind == undefined) {
            this.recordingAttributeKind = RecordInfo.DEFAULT_RECORDING_TYPE;
        } else {
            this.recordingAttributeKind = recordingAttributeKind;    
        }         
        
        this.cameraX = cameraX;
        this.cameraY = cameraY;
    }    
    
    set text(userGeneratedText) {
        this._userGeneratedText = userGeneratedText; 
    }
    
    
    get text() {
        return this._userGeneratedText;
    }
    
    
    set soundData(soundData) {
        this._soundData = soundData;
    }
    
    
    get soundData() {
        return this._soundData;
    }
    

    toJSON() {
        let json = {
            _class: "RecordInfo",
            uniquename: this.uniquename,
            x: this.x,
            y: this.y,
            scaleX: this.scaleX, 
            scaleY: this.scaleY,
            angle: this.angle,
            recordingAttributeKind: this.recordingAttributeKind,
            userGeneratedText: this._userGeneratedText,
            soundData: this._soundData,
            cameraX: this.cameraX,
            cameraY: this.cameraY
                        
        };
        // console.log(json);
        return json;
    }

    static fromJSON(j) {
        let recordInfo = new RecordInfo(j.uniquename, j.x, j.y, j.scaleX, j.scaleY, j.angle, j.recordingAttributeKind, j.cameraX, j.cameraY);
        recordInfo.text = j.userGeneratedText;
        recordInfo.soundData = j.soundData;

        return recordInfo;
    }
}


RecordInfo.DEFAULT_RECORDING_TYPE='DEFAULT_RECORING';
RecordInfo.TEXT_RECORDING_TYPE='TEXT_RECORDING';
RecordInfo.SOUND_RECORDING_TYPE='SOUND_RECORDING_TYPE';