import Texture from './Texture.js';
import Surface from './Surface.js';
import Item from './Item.js';
import StoryUtil from '../../storybuilder/objects/StoryUtil.js';
import MiscUtil from '../../util/MiscUtil.js';

export default class Holder extends Item {
    // TODO: Item takes a key and frame, but here we are not passing any. See if any better solution is there
    constructor(game, x, y, uniquename) {
        super(game, x, y);
        this.x = x;
        this.y = y;
        this.inputEbaled = true;
        this.doorOpen = false;
        this.text = "";

        if (!uniquename) {
            this._uniquename = StoryUtil.generateUUID();
        } else {
            this._uniquename = uniquename;
        }

    }

    enableInputs(instance, iterateInside) {
        super.enableInputs(instance, iterateInside);
        // this.input.priorityID = 2;
        MiscUtil.setPriorityID(this, 2);
    }

    drawBoundingBox(color) {
        let rect = this.getBoundingBox();
        let box = this.addChild(new Phaser.Graphics(this.game, rect.left, rect.top));
        box.lineStyle(1, color);
        box.beginFill(0x000000, 0);
        box.drawRect(0, 0, rect.width, rect.height);
        box.endFill();
        return box;
    }

    getBoundingBox() {
        let left = 0;
        let right = 0;
        let top = 0;
        let bottom = 0;
        this.children.forEach(function(value) {
            if (value.x < left) {
                left = value.x;
            }
            if (value.x + value.width > right) {
                right = value.x + value.width;
            }
            if (value.y < top) {
                top = value.y;
            }
            if (value.y + value.height > bottom) {
                bottom = value.y + value.height;
            }
        }, this);
        return new Phaser.Rectangle(left, top, right - left, bottom - top);
    }

    updateBody() {
        let rect = this.getBoundingBox();
        this.body.setSize(rect.width, rect.height, rect.halfWidth, rect.height);
        this.pivot.setTo(rect.halfWidth, rect.height);
    }

    ///

    set doorOpen(val) {
        if (this._doorOpen == false) {
            if (this._rightCloseDoorTexture && this._leftCloseDoorTexture) {
                this._rightCloseDoorTexture.visible = false;

                this._leftCloseDoorTexture.visible = false;


                this._rightOpenDoorTexture.visible = true;


                this._leftOpenDoorTexture.visible = true;

            }

        } else {
            if (this._rightCloseDoorTexture && this._leftCloseDoorTexture) {

                this._rightCloseDoorTexture.visible = true;


                this._leftCloseDoorTexture.visible = true;


                this._rightOpenDoorTexture.visible = false;


                this._leftOpenDoorTexture.visible = false;
            }
        }
        this._doorOpen = val;

    }

    get doorOpen() {
        return this._doorOpen;
    }

    toggleDoorOpen() {
        this.doorOpen = !this.doorOpen;
    }





    //DEFINITIONS OF FRIDGE STARTS HERE    

    set leftOpenDoorTexture(val) {

        if (this._leftOpenDoorTexture) {
            this.removeChild(this._leftOpenDoorTexture).destroy();
        }
        this.addChildAt(val, this.children.length);
        this._leftOpenDoorTexture = val;
    }

    get leftOpenDoorTexture() {
        return this._leftOpenDoorTexture;
    }


    set rightOpenDoorTexture(val) {

        if (this._rightOpenDoorTexture) {
            this.removeChild(this._rightOpenDoorTexture).destroy();
        }
        this.addChildAt(val, this.children.length);
        this._rightOpenDoorTexture = val;
    }


    get rightOpenDoorTexture() {
        return this._rightOpenDoorTexture;
    }

    set leftCloseDoorTexture(val) {

        if (this._leftCloseDoorTexture) {
            this.removeChild(this._leftCloseDoorTexture).destroy();
        }
        this.addChildAt(val, this.children.length);
        this._leftCloseDoorTexture = val;
    }

    get leftCloseDoorTexture() {
        return this._leftCloseDoorTexture;
    }

    set rightCloseDoorTexture(val) {

        if (this._rightCloseDoorTexture) {
            this.removeChild(this._rightCloseDoorTexture).destroy();
        }
        this.addChildAt(val, this.children.length);
        this._rightCloseDoorTexture = val;
    }


    get rightCloseDoorTexture() {
        return this._rightCloseDoorTexture;
    }

    //DEFINITIONS OF FRIDGE ENDS HERE


    ///


    set frontTexture(val) {
        if (this._frontTexture) {
            this.removeChild(this._frontTexture).destroy();
        }
        if (val) {
            this.addChildAt(val, this.children.length);
        }
        this._frontTexture = val;
        this.updateBody();
    }

    get frontTexture() {
        return this._frontTexture;
    }

    set backTexture(val) {
        if (this._backTexture) {
            this.removeChild(this._backTexture).destroy();
        }
        if (val) {
            this.addChildAt(val, 0);
        }
        this._backTexture = val;
        this.updateBody();
    }

    get backTexture() {
        return this._backTexture;
    }

    addSurface(surface) {
        let index = this._frontTexture ? this.children.length - 1 : this.children.length;
        this.addChildAt(surface, index);
        this.updateBody();
        return surface;
    }

    overlapHandler(obj1, obj2) {
        if (obj1.parent.surfaces.some(function(val) {
            return val === obj2.parent;
        })) {
            return;
        }
        super.overlapHandler(obj1, obj2);
    }

    get surfaces() {
        let children = new Array();
        this.children.forEach(function(value) {
            if (value instanceof Surface) {
                children.push(value);
            }
        }, this);
        return children;
    }

    set surfaces(val) {
        val.forEach(function(element) {
            this.addSurface(element);
        }, this);
    }

    set uniquename(name) {
        this._uniquename = name;
    }

    get uniquename() {
        return this._uniquename;
    }


    toJSON() {
        let json = {
            _class: "Holder",
            x: this.x,
            y: this.y,
            uniquename: this.uniquename,
            frontTexture: this.frontTexture,
            backTexture: this.backTexture,
            surfaces: this.surfaces
        }
        return json;
    }

    static fromJSON(game, j) {
        let holder = new Holder(game, j.x, j.y, j.uniquename);        
        if (j.frontTexture) {
            holder.frontTexture = j.frontTexture;
        }
        if (j.backTexture) {
            holder.backTexture = j.backTexture;
        }
        holder.surfaces = j.surfaces;

        return holder;
    }

}