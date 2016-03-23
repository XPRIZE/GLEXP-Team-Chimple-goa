import Shape from './Shape.js';
import Sprite from './Sprite.js';
import Accessory from './Accessory.js';
import RelativePosition from './RelativePosition.js';
import EnableInputs from '../../scene/objects/EnableInputs.js';
import ShowAttributeEditorSignal from '../../storybuilder/objects/ShowAttributeEditorSignal.js';

export default class Limb extends EnableInputs(RelativePosition(Phaser.Group)) {
    /**
     * @param  {any} game
     * @param  {any} anchor
     * @param  {any} offset
     * @param  {any} offsetInPixel
     * @param  {any} isMask
     */
    constructor(game, anchor, offset, offsetInPixel, isMask) {
        super(game);
        this.relativeOffset = offset || new Phaser.Point();
        this.relativeAnchor = anchor || new Phaser.Point();
        this.offsetInPixel = offsetInPixel || new Phaser.Point();
        this.isMask = isMask;
        this.bodyColor = 0xfffff;
        this.minScale = new Phaser.Point(0.75, 0.75);
        this.maxScale = new Phaser.Point(1.25, 1.25);
        this.currentScale = new Phaser.Point(1, 1);
        this.scaleFactor = new Phaser.Point(400, 400);
        this.onHeightChange = new Phaser.Signal();
        this.onWidthChange = new Phaser.Signal();
        this._showAttributeEditorSignal = new ShowAttributeEditorSignal();
    }

    enableInputs(instance, iterateInside) {
        //super.enableInputs(instance, iterateInside);
        this.instance = instance;
        if (this.shape && instance) {
            this.shape.inputEnabled = true;
            this.shape._showAttributeEditorSignal = new ShowAttributeEditorSignal();
            if (instance.clickEnabled) {
                this.shape.events.onInputDown.add(instance.onInputDown, this);
                this.shape.events.onInputUp.add(instance.onInputUp, this);

            }
            if (instance.dragEnabled) {
                this.shape.input.enableDrag();
                this.shape.events.onDragStart.add(instance.onDragStart, this);
                this.shape.events.onDragUpdate.add(instance.onDragUpdate, this);
                this.shape.events.onDragStop.add(instance.onDragStop, this);
            }

        }
    }

    onInputDragFromStory(pointer, x, y, down) {
        console.log('poitner:' + pointer + 'x:' + x + 'y:' + y + " donw:" + down);
        this.parent.position = this.toGlobal(new Phaser.Point(x,y));
    }
    
    onInputDrag(pointer, x, y, down) {
        let scaleX = this._clickScale.x + this._scaleDirection.x * (x - this._clickPoint.x) / this.scaleFactor.x;
        let scaleY = this._clickScale.y + this._scaleDirection.y * (y - this._clickPoint.y) / this.scaleFactor.y;
        let scaleXY = new Phaser.Point(scaleX, scaleY);
        scaleXY.x = Math.max(this.minScale.x, Math.min(this.maxScale.x, scaleXY.x));
        scaleXY.y = Math.max(this.minScale.y, Math.min(this.maxScale.y, scaleXY.y));
        this.scaleLimbAlongWithPuppet(scaleXY);
    }

    get bodyColor() {
        return this._bodyColor;
    }

    set bodyColor(bodyColor) {
        this._bodyColor = bodyColor;
        if (this.shape) {
            this.shape.bodyColor = bodyColor;
        }
        this.forEach(function(value, index, array) {
            if (value instanceof Limb) {
                value.bodyColor = bodyColor;
            }
        });
    }

    get limbs() {
        let l = new Array();
        console.log('limbs: ' + this.name);
        this.forEach(function(value, index, array) {
            if (value instanceof Limb) {
                console.log('    Pushing: ' + value.name);
                l.push(value);
            }
        });
        return l;
    }

    set limbs(val) {
        val.forEach(function(element) {
            this.addLimb(element);
        }, this);
    }

    addLimb(limb) {
        let existingLimb = this.getLimb(limb.name);
        if (existingLimb) {
            this.remove(existingLimb);
        }
        this.addChildInOrder(limb);
        limb.positionRelativeToParent();
        limb.bodyColor = this.bodyColor;
        return limb;
    }

    getLimb(name) {
        return this.iterate('name', name, Phaser.Group.RETURN_CHILD);
    }

    setTwin(twin) {
        this._twin = twin;
    }

    get isMask() {
        return this._isMask;
    }

    set isMask(value) {
        this._isMask = value;
    }

    get shape() {
        return this._shape;
    }

    set shape(shape) {
        this._shape = shape;
        shape.doScaleXY(this.currentScale);
        this.addChildInOrder(shape);
        shape.bodyColor = this.bodyColor;
        if (this.instance) {
            this.enableInputs(this.instance, false);
        }
        this.pivot.setTo(shape.relativeAnchor.x * shape.width, shape.relativeAnchor.y * shape.height);

        this.positionRelativeToParent();

        if (this.isMask) {
            let maskA = new Shape(this.game, shape.initialScale, shape.relativeAnchor, shape.relativeOffset, shape.offsetInPixel, shape.graphics, 'mask');
            maskA.doScaleXY(this.currentScale.clone());
            this.addChildInOrder(maskA);
            this._maskA = maskA;
            shape.mask = maskA;
            //maskA.positionRelativeToParent();
            maskA.dirty = true; //Due to a bug in Pixi for WebGL need to explicitly set dirty for mask true
        }
    }

    get accessories() {
        let acc = new Array();
        console.log('accessories: ' + this.name);
        this.forEach(function(value, index, array) {
            if (value instanceof Accessory) {
                console.log('    Pushing: ' + value.name);
                acc.push(value);
            }
        });
        return acc;
    }

    set accessories(val) {
        val.forEach(function(element) {
            this.addAccessory(element);
        }, this);
    }

    getAccessory(name) {
        return this.iterate('name', name, Phaser.Group.RETURN_CHILD);
    }

    /**
     * @param  {any} accessory
     * @param  {any} removeExisting
     */
    addAccessory(accessory, mask) {
        let existing = this.getAccessory(accessory.name);
        if (existing) {
            this.removeAccessory(existing, true);
        }
        this.addChildInOrder(accessory);
        //accessory.scale = this.currentScale.clone();
        accessory.doScaleXY(this.currentScale.clone());
        accessory.positionRelativeToParent();
        if (this._maskA && mask) {
            accessory.mask = this._maskA;
        }
        return accessory;
    }

    removeAccessory(accessory) {
        this.remove(accessory, true);
    }

    addChildInOrder(child) {
        let j = 0;
        if (this.childOrder) {
            for (let i = 0; i < this.childOrder.length && this.children && j < this.children.length; i++) {
                if (child.name == this.childOrder[i]) {
                    break;
                }
                if (this.children[j].name == this.childOrder[i]) {
                    j++;
                }
            }

        }
        this.addChildAt(child, j);
    }

    scaleLimbAlongWithPuppet(scaleXY) {
        let changeX = (scaleXY.x / this.currentScale.x - 1) * this.shape.width;
        let changeY = (scaleXY.y / this.currentScale.y - 1) * this.shape.height;
        //for now check for max everywhere
        scaleXY.x = Math.max(this.minScale.x, Math.min(this.maxScale.x, scaleXY.x));
        scaleXY.y = Math.max(this.minScale.y, Math.min(this.maxScale.y, scaleXY.y));
        this.scaleLimb(scaleXY);
        if (changeY != 0) {
            this.onHeightChange.dispatch(changeY);
        }
        if (changeX != 0) {
            this.onWidthChange.dispatch(changeX);
        }
    }

    scaleLimb(scaleXY) {
        scaleXY.x = Math.max(this.minScale.x, Math.min(this.maxScale.x, scaleXY.x));
        scaleXY.y = Math.max(this.minScale.y, Math.min(this.maxScale.y, scaleXY.y));
        this.scaleLimbOnly(scaleXY);
        if (this._twin) {
            this._twin.scaleLimbOnly(scaleXY);
        }
    }

    scaleLimbOnly(scaleXY) {
        this.callAllExists('doScaleXY', true, scaleXY);
        this.callAllExists('positionRelativeToParent', true);
        this.positionRelativeToParent();
    }

    changeLimbWidth(width) {
        let newScale = this.currentScale.x * (this.shape.width + width) / this.shape.width;
        this.scaleLimb(new Phaser.Point(newScale, this.currentScale.y));
    }

    changeLimbHeight(height) {
        let newScale = this.currentScale.y * (this.shape.height + height) / this.shape.height;
        this.scaleLimb(new Phaser.Point(this.currentScale.x, newScale));
    }

    positionRelativeToParent() {
        this.x = this.pivot.x;
        this.y = this.pivot.y
        if (this.shape) {
            this.x -= this.relativeAnchor.x * this.shape.width;
            this.y -= this.relativeAnchor.y * this.shape.height;
        }
        let offset = this.relativeOffset.clone();
        if (this.parent && this.parent.shape) {
            offset.multiply(this.parent.shape.width, this.parent.shape.height);
            this.x += offset.x;
            this.y += offset.y;
        // } else {
            // offset.multiply(this.width, this.height);
        }
        this.x += this.offsetInPixel.x;
        this.y += this.offsetInPixel.y;
    }

    changeLimbHeightOnOtherChange(changeY, signal) {
        this.changeLimbHeight(-changeY / signal.getNumListeners());
    }

    changeLimbWidthOnOtherChange(changeX, signal) {
        this.changeLimbWidth(-changeX / signal.getNumListeners());
    }

    /**
     */
    toJSON() {
        let json = {
            _class: "Limb",
            name: this.name,
            relativeAnchor: this.relativeAnchor,
            relativeOffset: this.relativeOffset,
            offsetInPixel: this.offsetInPixel,
            isMask: this.isMask,
            shape: this.shape,
            accessories: this.accessories,
            limbs: this.limbs
        };
        console.log(json);
        return json;
    }
    /**
     * @param  {any} game
     * @param  {any} j
     */
    static fromJSON(game, j) {
        console.log(j);
        let limb = new Limb(game, j.relativeAnchor, j.relativeOffset, j.offsetInPixel, j.isMask);
        limb.name = j.name;
        if (j.shape) {
            limb.shape = j.shape;
        }
        limb.accessories = j.accessories;
        limb.limbs = j.limbs;
        return limb;
    }

}