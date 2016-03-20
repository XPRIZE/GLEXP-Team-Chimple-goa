var _ = require('lodash');

export default class OnDemandLoadState extends Phaser.State {
    init(cachedConfig, stateToEnterAfterLoading, type, displayGroup) {
        console.log('config:' + cachedConfig);
        console.log('stateToEnterAfterLoading:' + stateToEnterAfterLoading);        
        this._stateToEnterAfterLoading = stateToEnterAfterLoading;
        this._type = type;
        this._displayGroup = displayGroup;
        if (cachedConfig) {
            this._jsonCreationFiles = cachedConfig['scene_files'];
            this._jsonTextureFiles = cachedConfig['texture_files'];

        }
    }

    preload() {
        var that = this;
        this._asset = this.add.sprite(320, 240, 'assets/preloader.gif');
        this._asset.anchor.setTo(0.5, 0.5);

        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
        this.load.setPreloadSprite(this._asset);
        this._jsonCreationFiles.forEach(function(element) {
            this._loadedJSONKey = element['key'];
            let file = element['json_file'];
            this.load.json(this._loadedJSONKey, file);

        }, this);
                
        this._jsonTextureFiles.forEach(function(element) {
            let key = element['key'];
            let textureJson = element['json_file'];
            let textureImageFile = element['texture_file'];
            this.load.atlas(key, textureImageFile, textureJson);

        }, this);
        
    }

    create() {
        this._asset.cropEnabled = false;
    }

    update() {
        if (!!this.ready) {
            this.game.state.start(this._stateToEnterAfterLoading, true, false, this._displayGroup, this._loadedJSONKey, this._type);
        }
    }

    onLoadComplete() {
        this.ready = true;
    }


    shutdown() {

    }

}
