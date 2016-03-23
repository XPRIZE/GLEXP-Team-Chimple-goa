export default class RecordInfo {
    constructor(uniquename, x, y, scaleX, scaleY, angle, recordingAttributeKind,userGeneratedText) {
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
        
        this.userGeneratedText = userGeneratedText;
        
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
            userGeneratedText: this.userGeneratedText
        };
        console.log(json);
        return json;
    }

    static fromJSON(j) {
        let recordInfo = new RecordInfo(j.uniquename, j.x, j.y, j.scaleX, j.scaleY, j.angle, j.recordingAttributeKind, j.userGeneratedText);
        return recordInfo;
    }
}


RecordInfo.DEFAULT_RECORDING_TYPE='DEFAULT_RECORING';
RecordInfo.TEXT_RECORDING_TYPE='TEXT_RECORDING';