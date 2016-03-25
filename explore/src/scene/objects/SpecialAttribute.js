import TextData from '../../storybuilder/objects/TextData.js';

export default class SpecialAttribute {

    constructor(game) {
        this._texts = [];
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


    toJSON() {
        let json = {
            _class: "SpecialAttribute",
            texts: this.allTexts
        }
        return json;
    }

    static fromJSON(game, j) {
        let val = new SpecialAttribute(game);
        val.allTexts = j.allTexts;
        return val;
    }
}
