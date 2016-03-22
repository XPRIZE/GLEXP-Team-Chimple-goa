import Scene from '../../scene/objects/Scene.js';


export default class Page {
    //has texture - screen shot of scene
    //content 
    //scene   
    //has title - Phaser.Text
    //behaviour
    //add/edit more objects to scene
    //add more objects, props to scene
    //recording functionality
    //replaying functionality
    //save to loki-    
    constructor(game, x, y, pageId, scene, storyId, imageData) {        
        this.x = x;
        this.y = y;
        this._pageId = pageId;
        this._storyId = storyId;
        this._imageData = imageData;
        this._scene = scene;
        this._hasRecording = false;
        this._canBePlayed = false;
        this._isTitlePage = false;
    }
    
    set imageData (imageData) {
        this._imageData = imageData;
    }
    
    get imageData() {
        return this._imageData;
    }
    
    set isTitlePage(titlePage) {
        this._isTitlePage = titlePage;
    }


    get isTitlePage() {
        this._isTitlePage;
    }

    set hasRecording(hasRecording) {
        this._hasRecording = hasRecording;
    }

    get hasRecording() {
        return this._hasRecording;
    }

    set canBePlayed(canPlay) {
        this._canBePlayed = canPlay;
    }

    get canBePlayed() {
        return this._canBePlayed;
    }

    set storyId(storyId) {
        this._storyId = storyId;
    }

    get storyId() {
        return this._storyId;
    }

    set pageId(pageId) {
        this._pageId = pageId;
    }

    get pageId() {
        return this._pageId;
    }

    set scene(scene) {
        if (this._scene) {
            this._scene.destroy();
        }
        this._scene = scene;
    }

    get scene() {
        return this._scene;
    }

    toJSON() {
        let json = {
            _class: "Page",
            x: this.x,
            y: this.y,
            pageId: this._pageId,
            scene: this._scene,
            storyId: this._storyId,
            hasRecording: this._hasRecording,
            canBePlayed: this._canBePlayed,
            isTitlePage: this._isTitlePage,
            imageData: this._imageData
        }
        return json;
    }

    static fromJSON(game, j) {
        let val = new Page(game, j.x, j.y, j.pageId, j.scene, j.storyId, j.imageData);
        val.hasRecording = j.hasRecording;
        val.canBePlayed = j.canBePlayed;
        val.isTitlePage = j.isTitlePage;
        return val;
    }
}