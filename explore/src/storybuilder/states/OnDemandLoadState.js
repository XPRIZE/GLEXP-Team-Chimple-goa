import Scene from '../../scene/objects/Scene.js';
import Floor from '../../scene/objects/Floor.js';
import Wall from '../../scene/objects/Wall.js';
import Texture from '../../scene/objects/Texture.js';
import TileTexture from '../../scene/objects/TileTexture.js';
import Item from '../../scene/objects/Item.js';
import Holder from '../../scene/objects/Holder.js';
import Surface from '../../scene/objects/Surface.js';
import Util from '../../scene/objects/Util.js';
import PuppetUtil from '../../puppet/objects/PuppetUtil.js';
import Human from '../../puppet/objects/Human.js';
import Puppet from '../../puppet/objects/Puppet.js';

var _ = require('lodash');

export default class OnDemandLoadState extends Phaser.State {
    init(currentStoryId, currentPageId, cachedConfig, stateToEnterAfterLoading, type) {
        console.log('config:' + cachedConfig);
        console.log('stateToEnterAfterLoading:' + stateToEnterAfterLoading);
        this._stateToEnterAfterLoading = stateToEnterAfterLoading;
        this._sceneOrPuppetType = type;
        this._currentStoryId = currentStoryId;
        this._currentPageId = currentPageId;
        if (cachedConfig) {
            if (this._sceneOrPuppetType == OnDemandLoadState.SCENE_TYPE) {
                this._jsonCreationFiles = cachedConfig['scene_files'];

            } else if (this._sceneOrPuppetType == OnDemandLoadState.PUPPET_TYPE) {
                this._jsonCreationFiles = cachedConfig['puppet_files'];
            }
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
    }

    create() {
        if (this._loadedJSONKey != null && this._loadedJSONKey != undefined) {
            let cachedJSON = this.cache.getJSON(this._loadedJSONKey);
            if (cachedJSON) {
                if (this._sceneOrPuppetType == OnDemandLoadState.SCENE_TYPE) {
                    this._cachedJSONStringRepresentation = JSON.stringify(cachedJSON);

                } else if (this._sceneOrPuppetType == OnDemandLoadState.PUPPET_TYPE) {
                    this._cachedJSONStringRepresentation = JSON.stringify(cachedJSON, PuppetUtil.replacer);
                }
            }
        }
        this._asset.cropEnabled = false;
    }

    update() {
        if (!!this.ready) {
            this.game.state.start(this._stateToEnterAfterLoading, true, false, false, this._currentStoryId, this._currentPageId, this._cachedJSONStringRepresentation, this._sceneOrPuppetType);
        }
    }

    onLoadComplete() {
        this.ready = true;
    }

    shutdown() {
    }
}


OnDemandLoadState.SCENE_TYPE = 'scenes';
OnDemandLoadState.PUPPET_TYPE = 'puppets';