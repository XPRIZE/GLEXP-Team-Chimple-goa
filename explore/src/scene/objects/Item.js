import Texture from './Texture.js';
import TileTexture from './TileTexture.js';
import Surface from './Surface.js';
import AttributesChangedSignal from '../../storybuilder/objects/AttributesChangedSignal.js'
import UpdateAttributesSignal from '../../storybuilder/objects/UpdateAttributesSignal.js'
import RecordInfo from '../../storybuilder/objects/RecordInfo.js';
import EnableAttributeEditorSignal from '../../storybuilder/objects/EnableAttributeEditorSignal.js';
import ShowAttributeEditorSignal from '../../storybuilder/objects/ShowAttributeEditorSignal.js';

var _ = require('lodash');


export default class Item extends Phaser.Sprite {
    constructor(game, x, y, key, frame) {
        super(game, x, y, key, frame);
        game.physics.enable(this);
        this.inputEnabled = true;
        this.input.enableDrag();
        this.events.onDragStart.add(this.onDragStart, this);
        this.events.onDragUpdate.add(this.onDragUpdate, this);
        this.events.onDragStop.add(this.onDragStop, this);
        this.input.priorityID = 2;

        //Any Attribute Changes then dispatch signal        
        this.onAttributesChanged = new AttributesChangedSignal();
        this.onUpdateAttributesSignal = new UpdateAttributesSignal();
        this.onUpdateAttributesSignal.add(this.changeAttributes, this);


        //add special events for story application
        this._enableAttributeEditorSignal = new EnableAttributeEditorSignal();
        this._enableAttributeEditorSignal.add(this.enableInputs, this);
        this._showAttributeEditorSignal = new ShowAttributeEditorSignal();
    }

    enableInputs() {
        this.events.onInputDown.add(this.onInputDown, this);
        this.events.onInputUp.add(this.onInputUp, this);
    }

    set uniquename(name) {
        this._uniquename = name;
    }

    get uniquename() {
        return this._uniquename;
    }

    onInputDown(sprite, pointer) {

    }

    onInputUp(sprite, pointer) {
        if (!this._isDragging && !game._inPlayMode) {
            this._showAttributeEditorSignal.dispatch(sprite);
        }
    }

    onDragStart(sprite, pointer) {
        this._isDragging = true;
    }

    onDragUpdate(sprite, pointer, dragX, dragY, snapPoint) {
        let distanceFromLastUp = Phaser.Math.distance(game.input.activePointer.positionDown.x, game.input.activePointer.positionDown.y,
            game.input.activePointer.x, game.input.activePointer.y);

        if (distanceFromLastUp < 5) {
            this._isDragging = false;
        } else {
            this._isDragging = true;
        }        
    }

    onDragStop(sprite, pointer) {
        this._isDragging = false;
        let globalPoint = this.toGlobal(new PIXI.Point(0, 0));
        let testSprite = new Phaser.Sprite(this.game, globalPoint.x, globalPoint.y, this.key, this.frame);
        this.game.physics.enable(testSprite);
        testSprite.body.setSize(this.width, this.game.height - this.y, this.x, this.y);
        this.addChild(testSprite);
        this.game.debug.body(testSprite);

        let result = {};
        this.game.physics.arcade.overlap(testSprite, Surface.All, this.overlapHandler, null, result);
        testSprite.destroy();
        if (result.closestObject) {
            result.closestObject.parent.addContent(this);
            this.game.add.tween(this).to({ y: -this.height + result.closestObject.height / 2 }, 1000, null, true);
        }
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
            this.onAttributesChanged.dispatch({ uniquename: this._uniquename, x: this.x, y: this.y });
        } else if (game._inPlayMode) {
            console.log('in play mode');
            if (this._changeAttributes != null && this._changeAttributes.size > 0) {
                let json = this._changeAttributes.get(this.uniquename);
                var recordedInfo = RecordInfo.fromJSON(json);
                this.x = recordedInfo.x;
                this.y = recordedInfo.y;
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