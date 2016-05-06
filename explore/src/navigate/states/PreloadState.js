export default class PreloadState extends Phaser.State {

    init(nextTransitState) {
        this._nextTransitState = nextTransitState;
    }

    preload() {

        let scenesToLoad = game.cache.getJSON('load_scenes');
        scenesToLoad.scenes.forEach(function(sceneToLoad) {            
            let jsonFileLocation = sceneToLoad[PreloadState.JSON_FILE_KEY];
            let textureFileLocation = sceneToLoad[PreloadState.TEXTURE_FILE_KEY];
            let paths = jsonFileLocation.split('/');
            let sceneKey = null;
            if (paths && paths.length > 0) {
                sceneKey = paths[paths.length - 1];
                sceneKey = "scene/" + sceneKey.replace('.json', '');
            }
            this.load.atlas(sceneKey, textureFileLocation, jsonFileLocation);
        }, this);

        this._asset = this.add.sprite(320, 240, 'assets/preloader.gif');
        this._asset.anchor.setTo(0.5, 0.5);

        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
        this.load.setPreloadSprite(this._asset);
    }

    create() {
        this._asset.cropEnabled = false;
    }

    update() {
        if (!!this.ready) {
            this.game.state.start(this._nextTransitState);
        }
    }

    onLoadComplete() {
        this.ready = true;
    }

}

PreloadState.JSON_FILE_KEY = 'json_file';
PreloadState.TEXTURE_FILE_KEY = 'texture_file';
