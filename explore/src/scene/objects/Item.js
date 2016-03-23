import Texture from './Texture.js';
import TileTexture from './TileTexture.js';
import Surface from './Surface.js';
import EnableInputs from './EnableInputs.js';
import AttributesChangedSignal from '../../storybuilder/objects/AttributesChangedSignal.js'
import UpdateAttributesSignal from '../../storybuilder/objects/UpdateAttributesSignal.js'
import RecordInfo from '../../storybuilder/objects/RecordInfo.js';
import EnableAttributeEditorSignal from '../../storybuilder/objects/EnableAttributeEditorSignal.js';
import ShowAttributeEditorSignal from '../../storybuilder/objects/ShowAttributeEditorSignal.js';

var _ = require('lodash');


export default class Item extends EnableInputs(Phaser.Sprite) {
    constructor(game, x, y, key, frame, modifiedBit) {
        super(game, x, y, key, frame);
        game.physics.enable(this);
        this.anchor.set(0.5, 1);
        this.modifiedBit = modifiedBit;
        //Any Attribute Changes then dispatch signal        
        this.onAttributesChanged = new AttributesChangedSignal();
        this.onUpdateAttributesSignal = new UpdateAttributesSignal();
        this.onUpdateAttributesSignal.add(this.changeAttributes, this);

        //Allow item to invoke ShowAttributeEditorSignal()
        this._showAttributeEditorSignal = new ShowAttributeEditorSignal();

    }

    enableInputs(instance, iterateInside) {
        super.enableInputs(instance, iterateInside);
        this.input.priorityID = 2;
    }

    drawBoundingBox(color) {
        let box = this.addChild(new Phaser.Graphics(this.game, -this.offsetX, -this.offsetY));
        box.lineStyle(1, color);
        box.beginFill(0x000000, 0);
        box.drawRect(0, 0, this.width, this.height);
        box.endFill();    
        return box;    
    }    
    
    set uniquename(name) {
        this._uniquename = name;
    }

    get uniquename() {
        return this._uniquename;
    }


    overlapHandler(obj1, obj2) {
        // console.log(obj2);
        if (obj2 instanceof TileTexture) {
            return;
        }
        let CollideObject = obj2.parent.toGlobal(obj2.parent.position);
        //let distance = obj1.game.physics.arcade.distanceBetween(obj1.parent, obj2);
        let distance = Math.abs(obj1.y - CollideObject.y);
        if (!this.closestDistance || this.closestDistance > distance) {
            this.closestDistance = distance;
            this.closestObject = obj2;
        }
    }

    update() {
        if (game._inRecordingMode) {
            console.log('in recording mode');
            this.onAttributesChanged.dispatch({ uniquename: this._uniquename, x: this.x, y: this.y, scaleX: this.scale.x, scaleY: this.scale.y, angle: this.angle, modifiedBit: this.modifiedBit });
        } else if (game._inPlayMode) {
            console.log('in play mode');
            if (this._changeAttributes != null && this._changeAttributes.size > 0) {
                let json = this._changeAttributes.get(this.uniquename);
                var recordedInfo = RecordInfo.fromJSON(json);
                console.log('this.x: ' + this.x +  " this.y:" + this.y);
                this.x = recordedInfo.x;
                this.y = recordedInfo.y;
                this.scale.x = recordedInfo.scaleX;
                this.scale.y = recordedInfo.scaleY;
                this.angle = recordedInfo.angle;
                console.log('recordedInfo.x:' + recordedInfo.x + "recordedInfo.y:" + recordedInfo.y);
            }
        }

    }

    changeAttributes(data) {
        this._changeAttributes = data;
    }

    toJSON() {
        let json = {
            _class: "Item",
            x: this.x,
            y: this.y,
            key: this.key,
            frame: this.frameName,
            uniquename: this.uniquename,
            modifiedBit: this.modifiedBit
        }
        return json;
    }

    static fromJSON(game, j) {
        let val = new Item(game, j.x, j.y, j.key, j.frame, j.modifiedBit);
        val.uniquename = j.uniquename;
        return val;
    }

}