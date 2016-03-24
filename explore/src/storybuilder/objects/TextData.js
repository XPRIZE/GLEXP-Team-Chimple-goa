
export default class TextData extends Phaser.Text {
    
    constructor(game,x,y,key,frame,text,style,objectUniqueName,apply){
        
        super(game,x,y,text,style);
        
        this.x = x;
        this.y = y;
        this.key = key;
        this.text = text;
        this.style = style;
        this.objectUniqueName = objectUniqueName;
        this.apply = apply;
        
    }
    
     toJSON() {
        let json = {
            _class: "TextData",
            x: this.x,
            y: this.y,
            key : this.key,
            objectUniqueName : this.objectUniqueName,
            text : this.text,
            style : this.style,
            apply : this.apply
        }
        return json;
    }
    
    static fromJSON(game, j) {
        let textData = new TextData(game, j.x, j.y,j.key,j.frame,j.text,j.style,j.objectUniqueName,j.apply);
        textData.objectUniqueName = j.objectUniqueName;
        return textData;
    
    }
    
}

TextData.apply = false;