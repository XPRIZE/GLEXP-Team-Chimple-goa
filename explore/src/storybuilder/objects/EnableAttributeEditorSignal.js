let enableAttributeEditorSignal = null;

export default class EnableAttributeEditorSignal {
    constructor() {
        if (!enableAttributeEditorSignal) {
            enableAttributeEditorSignal = new Phaser.Signal();
        }
        return enableAttributeEditorSignal;
    }
}