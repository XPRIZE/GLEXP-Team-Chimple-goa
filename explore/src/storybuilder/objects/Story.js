import Texture from '../../scene/objects/Texture.js';
import StoryPage from './StoryPage.js';

export default class Story extends Phaser.Group {
    //libray contents group of stories

    constructor(game, x, y, storyId, title, imageData) {
        super(game);
        this.x = x;
        this.y = y;
        this._title = title;
        this._storyId = storyId;
        this._imageData = imageData;

        game.physics.enable(this);
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

    addStoryPage(storyPage) {
        return this.add(storyPage);
    }

    get storyPages() {
        let children = new Array();
        this.forEach(function(value) {
            if (value instanceof StoryPage) {
                children.push(value);
            }
        });
        return children;
    }

    set storyPages(val) {
        val.forEach(function(element) {
            this.addPage(element);
        }, this);

    }

    toJSON() {
        let json = {
            _class: "Story",
            x: this.x,
            y: this.y,
            title: this.title,
            storyId: this._storyId,
            imageData: this.imageData,
            storyPages: this.storyPages
        }
        return json;
    }

    static fromJSON(game, j) {
        let val = new Story(game, j.x, j.y, j.storyId, j.title, j.imageData);
        val.storyPages = j.storyPages;
        return val;
    }
}