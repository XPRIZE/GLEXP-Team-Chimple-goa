import TextData from '../../storybuilder/objects/TextData.js';
import SoundData from './SoundData.js';

export default class SpecialAttribute {

    constructor(game) {
        this._texts = [];
        this._sounds = [];
    }

    getText(index) {
        if (index < this._texts.length) {
            return this._texts[index];
        }
        return null;

    }

    addText(textData) {
        if (textData != null && textData instanceof TextData) {
            this._texts.push(textData);
        }
    }


    applyText(indexOfElement, apply) {
        this._texts.forEach(function(textData, index) {
            if (index === indexOfElement) {
                textData.apply = apply;
            }
        }, this);
    }

    set allTexts(texts) {
        this._texts.forEach(function(textData) {
            this.addText(textData);
        }, this);

    }

    get allTexts() {
        let children = new Array();
        this._texts.forEach(function(element) {
            if (element instanceof TextData) {
                children.push(element);
            }
        }, this);
        return children;
    }



    //Sounds

    getSound(index) {
        if (index < this._sounds.length) {
            return this._sounds[index];
        }
        return null;

    }

    addSound(soundData) {
        if (soundData != null && soundData instanceof SoundData) {
            this._sounds.push(soundData);
        }
    }


    applySound(indexOfElement, apply) {
        this._sounds.forEach(function(soundData, index) {
            if (index === indexOfElement && soundData instanceof SoundData) {
                soundData.apply = apply;
            }
        }, this);
    }

    set allSounds(sounds) {
        this._sounds.forEach(function(soundData) {
            this.addSound(soundData);
        }, this);

    }

    get allSounds() {
        let children = new Array();
        this._sounds.forEach(function(element) {
            if (element instanceof SoundData) {
                children.push(element);
            }
        }, this);
        return children;
    }


    toJSON() {
        let json = {
            _class: "SpecialAttribute",
            texts: this.allTexts,
            sounds: this.sounds            
        }
        return json;
    }

    static fromJSON(game, j) {
        let val = new SpecialAttribute(game);
        val.allTexts = j.allTexts;
        val.allsounds = j.allSounds;
        return val;
    }
}
