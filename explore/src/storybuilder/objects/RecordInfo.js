export default class RecordInfo {
    constructor(uniquename, x, y, scaleX, scaleY, angle) {
        this.uniquename = uniquename;
        this.x = x;
        this.y = y;
        this.scaleX = scaleX;
        this.scaleY = scaleY;
        this.angle = angle;
    }

    toJSON() {
        let json = {
            _class: "RecordInfo",
            uniquename: this.uniquename,
            x: this.x,
            y: this.y,
            scaleX: this.scaleX, 
            scaleY: this.scaleY,
            angle: this.angle
        };
        console.log(json);
        return json;
    }

    static fromJSON(j) {
        let recordInfo = new RecordInfo(j.uniquename, j.x, j.y, j.scaleX, j.scaleY, j.angle);
        return recordInfo;
    }
}