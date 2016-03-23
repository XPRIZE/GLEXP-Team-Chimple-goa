
export default class TextData extends Phaser.Text {
    
    constructor(game,x,y,key,frame,text,style,objectName){
        
        super(game,x,y,text,style);
        
        this.x = x;
        this.y = y;
        this.key = key;
        this.text = text;
        this.style = style;
        this.objectName = objectName;
        
    }
    
     toJSON() {
        let json = {
            _class: "TextData",
            x: this.x,
            y: this.y,
            key : this.key,
            text : this.text,
            style : this.style,
            apply : this.apply
        }
        return json;
    }
    
    static fromJSON(game, j) {
        let textData = new TextAudioData(game, j.x, j.y,j.key,j.frame,j.text,j.style,j.objectName);
        textData.key = j.key;
        return textData;
    
    }
    
}

TextData.apply = false;