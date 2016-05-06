let attributesChangedSignal = null;

export default class AttributesChangedSignal {
    constructor() {
        if (!attributesChangedSignal) {
            attributesChangedSignal = new Phaser.Signal();
        }
        return attributesChangedSignal;
    }
}