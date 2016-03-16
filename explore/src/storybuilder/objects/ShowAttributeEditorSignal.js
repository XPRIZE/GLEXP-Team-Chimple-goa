let showeAttributeEditorSignal = null;

export default class ShowAttributeEditorSignal {
    constructor() {
        if (!showeAttributeEditorSignal) {
            showeAttributeEditorSignal = new Phaser.Signal();
        }
        return showeAttributeEditorSignal;
    }
}