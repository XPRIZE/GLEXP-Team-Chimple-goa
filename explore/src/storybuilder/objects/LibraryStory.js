import Texture from '../../scene/objects/Texture.js';
import StoryPage from './StoryPage.js';

export default class LibraryStory extends Phaser.Group {
    //libray contents group of stories

    constructor(game, x, y, storyId, title, imageData) {
        super(game);
        this.x = x;
        this.y = y;
        this._title = title;
        this._storyId = storyId;
        this._imageData = imageData;
        this._canBePlayed = false;
        game.physics.enable(this);
    }

    set canBePlayed(canBePlayed) {
        this._canBePlayed = canBePlayed;
    }

    get canBePlayed() {
        return this._canBePlayed;
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
            _class: "LibraryStory",
            x: this.x,
            y: this.y,
            title: this.title,
            storyId: this._storyId,
            imageData: this.imageData,
            canBePlayed: this._canBePlayed
        }
        return json;
    }

    static fromJSON(game, j) {
        let val = new LibraryStory(game, j.x, j.y, j.storyId, j.title, j.imageData);
        val.canBePlayed = j.canBePlayed;
        return val;
    }
}