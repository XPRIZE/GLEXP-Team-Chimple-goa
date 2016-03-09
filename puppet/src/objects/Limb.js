import Shape from './Shape.js';
import Accessory from './Accessory.js';
import RelativePosition from './RelativePosition.js';

export default class Limb extends RelativePosition(Phaser.Group)  {
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
    }

    get bodyColor() {
        return this._bodyColor;
    }
    
    set bodyColor(bodyColor) {
        this._bodyColor = bodyColor;
        if(this.shape) {
            this.shape.bodyColor = bodyColor;
        }
        this.forEach(function(value, index, array) {
            if(value instanceof Limb) {
                value.bodyColor = bodyColor;
            }
        });
    }
        
    get limbs() {
        let l = new Array();
        console.log('limbs: '+this.name);
        this.forEach(function(value, index, array) {
            if(value instanceof Limb) {
                console.log('    Pushing: '+value.name);
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
        if(existingLimb) {
            this.remove(existingLimb);
        }
        this.add(limb);
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
        shape.scale = this.currentScale;
        this.addChild(shape);
        shape.bodyColor = this.bodyColor;
        shape.name = this.name + '_shape_' + this.getChildIndex(shape);
        shape.inputEnabled = true;
        shape.events.onInputDown.add(this.onInputDown, this);
        shape.events.onInputUp.add(this.onInputUp, this);
        this.positionRelativeToParent();

        if(this.isMask) {
            let maskA = new Shape(this.game, shape.relativeAnchor, shape.relativeOffset, shape.offsetInPixel, shape.graphics);
            maskA.scale = this.currentScale.clone();
            this.addChild(maskA);
            maskA.name = this.name + '_mask_' + this.getChildIndex(maskA);
            this._maskA = maskA;
            shape.mask = maskA;
            //maskA.positionRelativeToParent();
            maskA.dirty = true; //Due to a bug in Pixi for WebGL need to explicitly set dirty for mask true
        }
    }
    
    get accessories() {
        let acc = new Array();
        console.log('accessories: '+this.name);        
        this.forEach(function(value, index, array) {
            if(value instanceof Accessory) {
                console.log('    Pushing: '+value.name);
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
    addAccessory(accessory, removeExisting) {
        let existing = this.getAccessory(accessory.name);
        if(existing) {
            this.removeAccessory(existing, true);
        }
        this.addChild(accessory);
        accessory.scale = this.currentScale.clone();
        accessory.positionRelativeToParent();
        if(this._maskA) {
            accessory.mask = this._maskA;
        }
        return accessory;
    }
    
    removeAccessory(accessory) {
        this.remove(accessory, true);
    }
    
    /**
     * @param  {any} sprite
     * @param  {any} pointer
     */
    onInputDown(sprite, pointer) {
        this._clickScale = this.shape.scale.clone();
        this._clickPoint = new Phaser.Point(pointer.x, pointer.y);
        let pivot = this.shape.toGlobal(this.shape.relativeAnchor.clone().multiply(this.shape.width, this.shape.height));
        this._scaleDirection = new Phaser.Point(this._clickPoint.x > pivot.x ? 1 : -1, this._clickPoint.y > pivot.y ? 1 : -1);
        this.game.input.addMoveCallback(this.onInputDrag, this);
    }
    
    /**
     * @param  {any} sprite
     * @param  {any} pointer
     */
    onInputUp(sprite, pointer) {
        this._isPointerDown = false;
        this.game.input.deleteMoveCallback(this.onInputDrag, this);
    }
    
    onInputDrag(pointer, x, y, down) {
        let scaleX = this._clickScale.x + this._scaleDirection.x * (x-this._clickPoint.x) / this.scaleFactor.x;
        let scaleY = this._clickScale.y + this._scaleDirection.y * (y-this._clickPoint.y)/ this.scaleFactor.y;
        let scaleXY = new Phaser.Point(scaleX, scaleY);
        scaleXY.x = Math.max(this.minScale.x, Math.min(this.maxScale.x, scaleXY.x));
        scaleXY.y = Math.max(this.minScale.y, Math.min(this.maxScale.y, scaleXY.y));
        this.scaleLimbAlongWithPuppet(scaleXY);
    }

    scaleLimbAlongWithPuppet(scaleXY) {
        let changeX = (scaleXY.x / this.currentScale.x - 1) * this.shape.width;
        let changeY = (scaleXY.y / this.currentScale.y - 1) * this.shape.height;
        //for now check for max everywhere
        scaleXY.x = Math.max(this.minScale.x, Math.min(this.maxScale.x, scaleXY.x));
        scaleXY.y = Math.max(this.minScale.y, Math.min(this.maxScale.y, scaleXY.y));
        this.scaleLimb(scaleXY);
        if(changeY != 0) {
            this.onHeightChange.dispatch(changeY);            
        }
        if(changeX != 0) {
            this.onWidthChange.dispatch(changeX);            
        }
    }
    
    scaleLimb(scaleXY) {
        scaleXY.x = Math.max(this.minScale.x, Math.min(this.maxScale.x, scaleXY.x));
        scaleXY.y = Math.max(this.minScale.y, Math.min(this.maxScale.y, scaleXY.y));
        this.scaleLimbOnly(scaleXY);
        if(this._twin) {
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
       if(this.shape) {
            this.x = -this.relativeAnchor.x * this.shape.width;
            this.y = -this.relativeAnchor.y * this.shape.height;
        } else {
            this.x = 0;
            this.y = 0;
        }      
        if(this.parent && this.parent.shape) {
            let offset = this.relativeOffset.clone();
            offset.multiply(this.parent.shape.width, this.parent.shape.height);
            this.x += offset.x + this.offsetInPixel.x;
            this.y += offset.y + this.offsetInPixel.y;
        } 
    }

    changeLimbHeightOnOtherChange(changeY, signal) {
        this.changeLimbHeight(-changeY/signal.getNumListeners());
    }

    changeLimbWidthOnOtherChange(changeX, signal) {
        this.changeLimbWidth(-changeX/signal.getNumListeners());
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
        if(j.shape) {
            limb.shape = j.shape;        
        }
        limb.accessories = j.accessories;
        limb.limbs = j.limbs;
        return limb;
    }
    
}