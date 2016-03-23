let specialAttributesChangedSignal = null;

export default class SpecialAttributesChangedSignal {
    constructor() {
        if (!specialAttributesChangedSignal) {
            specialAttributesChangedSignal = new Phaser.Signal();
        }
        return specialAttributesChangedSignal;
    }
}