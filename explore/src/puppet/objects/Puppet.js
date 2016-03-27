import Limb from './Limb.js';
import Accessory from './Accessory.js';
import Shape from './Shape.js';
import Sprite from './Sprite.js';
import RelativePosition from './RelativePosition.js';
import AttributesChangedSignal from '../../storybuilder/objects/AttributesChangedSignal.js';
import SpecialAttributesChangedSignal from '../../storybuilder/objects/SpecialAttributesChangedSignal.js'
import UpdateAttributesSignal from '../../storybuilder/objects/UpdateAttributesSignal.js';
import RecordInfo from '../../storybuilder/objects/RecordInfo.js';
import PlayPauseSignal from '../../storybuilder/objects/PlayPauseSignal.js';

export default class Puppet extends Limb {
    constructor(game, x, y, color) {
        super(game);
        this.x = x;
        this.y = y;
        this.bodyColor = color;
        this.scale.setTo(0.5, 0.5);
        this.childOrder = ['body']; //default

        this.onAttributesChanged = new AttributesChangedSignal();

        //Special Attribute Changes
        this._specialAttributesChangedSignal = new SpecialAttributesChangedSignal();

        this.onUpdateAttributesSignal = new UpdateAttributesSignal();
        this.onUpdateAttributesSignal.add(this.changeAttributes, this);

        //added for testing purpose, will be replaced by Special Attribute Class later...
        this._userGeneratedText = null;
        this._playPauseSignal = new PlayPauseSignal();
    }

    changeAttributes(data) {
        this._changeAttributes = data;
    }

    get body() {
        if (!this._body) {
            this._body = this.getLimb('body');
        }
        return this._body;
    }

    set body(body) {
        this._body = body;
        body.name = 'body';
        this.addLimb(body);
    }

    /**
     * Abstract behaviour. In each subclass add the behavior
     */
    defineBehavior() {
    }

    /**
     * A default puppet. Use it to create a sample one
     */
    static buildDefault() {

    }

    toJSON() {
        let limbJson = super.toJSON();
        limbJson._class = "Puppet";
        limbJson.x = this.x;
        limbJson.y = this.y;
        limbJson.bodyColor = this.bodyColor;
        console.log(limbJson);
        return limbJson;
    }

    static fromJSON(game, j) {
        let puppet = new Puppet(game, j.x, j.y, j.bodyColor);
        if (j.shape) {
            puppet.shape = j.shape;
        }
        puppet.accessories = j.accessories;
        puppet.limbs = j.limbs;
        puppet.defineBehavior();
        return puppet;
    }

    set text(text) {
        this._userGeneratedText = text;
        if (game._inRecordingMode) {
            this._specialAttributesChangedSignal.dispatch({ uniquename: this._uniquename, x: this.x, y: this.y, scaleX: this.scale.x, scaleY: this.scale.y, angle: this.angle, recordingAttributeKind: RecordInfo.TEXT_RECORDING_TYPE, userGeneratedText: this._userGeneratedText });
        }
    }


    update() {
        if (game._inRecordingMode) {
            console.log('in recording mode');
            this.onAttributesChanged.dispatch({ uniquename: this._uniquename, x: this.x, y: this.y, scaleX: this.scale.x, scaleY: this.scale.y, angle: this.angle, recordingAttributeKind: RecordInfo.DEFAULT_RECORDING_TYPE });
        } else if (game._inPlayMode) {
            console.log('in play mode');
            if (this._changeAttributes != null && this._changeAttributes.size > 0) {
                this.game.camera.follow(this, Phaser.Camera.FOLLOW_PLATFORMER);
                if (!this.uniquename) {
                    this.uniquename = "undefined";
                }
                let json = this._changeAttributes.get(this.uniquename);
                var recordedInfo = RecordInfo.fromJSON(json);
                console.log('this.x: ' + this.x + " this.y:" + this.y);
                this.x = recordedInfo.x;
                this.y = recordedInfo.y;
                this.scale.x = recordedInfo.scaleX;
                this.scale.y = recordedInfo.scaleY;
                this.angle = recordedInfo.angle;
                this.game.camera.x = recordedInfo.cameraX;
                this.game.camera.y = recordedInfo.cameraY;
                console.log('recordedInfo.x:' + recordedInfo.x + "recordedInfo.y:" + recordedInfo.y);
                //if we have received TEXT KIND data
                if (recordedInfo.recordingAttributeKind == RecordInfo.TEXT_RECORDING_TYPE) {
                    //send an signal to show Text PopUp to User
                    console.log('show text popup to User' + recordedInfo.userGeneratedText);
                    this._playPauseSignal.dispatch();
                }

            }
        }

    }
}