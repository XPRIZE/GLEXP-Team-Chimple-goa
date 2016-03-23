export default class StoryPage extends Phaser.Group {

    constructor(game, x, y, storyId, pageId, title, imageData) {
        super(game);
        this.x = x;
        this.y = y;
        this._title = title;
        this._storyId = storyId;
        this._pageId = pageId;
        this._imageData = imageData;
                
        game.physics.enable(this);
    }

    set pageId(pageId) {
        this._pageId = pageId;
    }

    get pageId() {
        return this._pageId;
    }
    
    set storyId(storyId) {
        this._storyId = storyId;
    }

    get storyId() {
        return this._storyId;
    }
    

    set Title(text) {
        this._title = text;
    }

    get Title() {
        return this._title;
    }

    set imageData(val) {
        this._imageData = val;
    }

    get imageData() {
        return this._imageData;
    }


    toJSON() {
        let json = {
            _class: "StoryPage",
            x: this.x,
            y: this.y,
            title: this.title,
            storyId: this._storyId,
            pageId: this._pageId,
            imageData: this.imageData            
        }
        return json;
    }

    static fromJSON(game, j) {
        let val = new StoryPage(game, j.x, j.y, j.storyId, j.pageId, j.title, j.imageData);
        return val;
    }
}