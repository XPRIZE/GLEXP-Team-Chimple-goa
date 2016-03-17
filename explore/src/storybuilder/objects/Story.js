import Texture from '../../scene/objects/Texture.js';
import Page from './Page.js';

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
    
    set storyId (storyId) {
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
    
    /*addPage(page) {
        return this.add(page);
    }

    get pages() {
        let children = new Array();
        this.forEach(function(value) {
            if (value instanceof Page) {
                children.push(value);
            }
        });
        return children;
    }

    set pages(val) {
        val.forEach(function(element) {
            this.addPage(element);
        }, this);

    }*/

    toJSON() {
        let json = {
            _class: "Story",
            x: this.x,
            y: this.y,
            title: this.title,
            storyId: this._storyId,
            imageData: this.imageData
            //pages: this.pages
        }
        return json;
    }

    static fromJSON(game, j) {
        let val = new Story(game, j.x, j.y, j.storyId, j.title, j.imageData);
        //val.pages = j.pages;
        return val;
    }
}