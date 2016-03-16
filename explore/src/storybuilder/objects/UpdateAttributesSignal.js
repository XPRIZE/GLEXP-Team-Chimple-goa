let updateAttributesSignal = null;

export default class UpdateAttributesSignal {
    constructor() {
        if (!updateAttributesSignal) {
            updateAttributesSignal = new Phaser.Signal();
        }
        return updateAttributesSignal;
    }
}