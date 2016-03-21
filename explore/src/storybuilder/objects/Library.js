import LibraryStory from './LibraryStory.js';

export default class Library extends Phaser.Group {
    //libray contents group of stories

    constructor(game, x, y, name) {
        super(game);
        this.name = name;
        this.x = x;
        this.y = y;
        game.physics.enable(this);
    }

    addStory(story) {
        return this.add(story);
    }

    get stories() {
        let children = new Array();
        this.forEach(function(value) {
            if (value instanceof LibraryStory) {
                children.push(value);
            }
        });
        return children;
    }

    set stories(val) {
        if (val) {
            val.forEach(function(element) {
                if (element instanceof LibraryStory) {
                    this.addStory(element);
                }
            }, this);

        }

    }

    toJSON() {
        let json = {
            _class: "Library",
            x: this.x,
            y: this.y,
            name: this.name,
            stories: this.stories
        }
        return json;
    }

    static fromJSON(game, j) {
        let val = new Library(game, j.x, j.y, j.name);
        val.stories = j.stories;
        return val;
    }
}