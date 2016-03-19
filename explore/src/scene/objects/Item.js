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
    constructor(game, x, y, key, frame) {
        super(game, x, y, key, frame);
        game.physics.enable(this);
        this.anchor.set(0.5, 1);

        //Any Attribute Changes then dispatch signal        
        this.onAttributesChanged = new AttributesChangedSignal();
        this.onUpdateAttributesSignal = new UpdateAttributesSignal();
        this.onUpdateAttributesSignal.add(this.changeAttributes, this);


        //add special events for story application
        this._enableAttributeEditorSignal = new EnableAttributeEditorSignal();
        this._enableAttributeEditorSignal.add(this.enableInputs, this);
        this._showAttributeEditorSignal = new ShowAttributeEditorSignal();

    }

    enableInputs(instance, iterateInside) {
        super.enableInputs(instance, iterateInside);
        this.inputEnabled = true;
        this.input.enableDrag();
        this.events.onInputDown.add(instance.onInputDown, this);
        this.events.onInputUp.add(instance.onInputUp, this);
        this.events.onDragStart.add(instance.onDragStart, this);
        this.events.onDragUpdate.add(instance.onDragUpdate, this);
        this.events.onDragStop.add(instance.onDragStop, this);
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
        let distance = obj1.game.physics.arcade.distanceBetween(obj1.parent, obj2);
        if (!this.closestDistance || this.closestDistance > distance) {
            this.closestDistance = distance;
            this.closestObject = obj2;
        }
    }

    update() {
        if (game._inRecordingMode) {
            this.onAttributesChanged.dispatch({ uniquename: this._uniquename, x: this.x, y: this.y, scaleX: this.scale.x, scaleY: this.scale.y, angle: this.angle });
        } else if (game._inPlayMode) {
            console.log('in play mode');
            if (this._changeAttributes != null && this._changeAttributes.size > 0) {
                let json = this._changeAttributes.get(this.uniquename);
                var recordedInfo = RecordInfo.fromJSON(json);
                this.x = recordedInfo.x;
                this.y = recordedInfo.y;
                this.scale.x = recordedInfo.scaleX;
                this.scale.y = recordedInfo.scaleY;
                this.angle = recordedInfo.angle;
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
            uniquename: this.uniquename
        }
        return json;
    }

    static fromJSON(game, j) {
        let val = new Item(game, j.x, j.y, j.key, j.frame);
        val.uniquename = j.uniquename;
        return val;
    }

}