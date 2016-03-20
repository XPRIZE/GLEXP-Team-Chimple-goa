export default class StoryPage extends Phaser.Group {

    constructor(game, x, y, pageId, title, imageData) {
        super(game);
        this.x = x;
        this.y = y;
        this._title = title;
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
            pageId: this._pageId,
            imageData: this.imageData
            //pages: this.pages
        }
        return json;
    }

    static fromJSON(game, j) {
        let val = new StoryPage(game, j.x, j.y, j.pageId, j.title, j.imageData);
        return val;
    }
}