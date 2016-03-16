export default class RecordInfo {
    constructor(uniquename, x, y) {
        this.uniquename = uniquename;
        this.x = x;
        this.y = y;
    }

    toJSON() {
        let json = {
            _class: "RecordInfo",
            uniquename: this.uniquename,
            x: this.x,
            y: this.y
        };
        console.log(json);
        return json;
    }

    static fromJSON(j) {
        let recordInfo = new RecordInfo(j.uniquename, j.x, j.y);
        return recordInfo;
    }
}