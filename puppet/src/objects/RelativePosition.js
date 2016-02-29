let RelativePosition = (superclass) => class extends superclass {
    get relativeAnchor() {
        return this._relativeAnchor;
    }
    
    set relativeAnchor(value) {
        this._relativeAnchor = value;
    }
    
    get relativeOffset() {
        return this._relativeOffset;
    }
    
    set relativeOffset(value) {
        this._relativeOffset = value;
    }

    get offsetInPixel() {
        return this._offsetInPixel;
    }    
    
    set offsetInPixel(value) {
        this._offsetInPixel = value;
    }
    
    positionRelativeToParent() {
        this.x = 0;
        this.y = 0;
        if(this.parent && this.parent.shape) {
            let offset = this.relativeOffset.clone();
            offset.multiply(this.parent.shape.width, this.parent.shape.height);
            this.x = offset.x + this.offsetInPixel.x - this.relativeAnchor.x * this.width;
            this.y = offset.y + this.offsetInPixel.y - this.relativeAnchor.y * this.height;
        } else {
            let offset = this.relativeOffset.clone();
            offset.multiply(this.width, this.height);
            this.x = offset.x + this.offsetInPixel.x - this.relativeAnchor.x * this.width;
            this.y = offset.y + this.offsetInPixel.y - this.relativeAnchor.y * this.height;
        }

    }
}

export default RelativePosition;
