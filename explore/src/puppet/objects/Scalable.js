let Scalable = (superclass) => class extends superclass {
    get initialScale() {
        return this._initialScale;
    }
    
    set initialScale(value) {
        this.scale = value;
        this._initialScale = value;
    }

  get maintainAspectRatio() {
    return this._maintainAspectRatio;
  }

  set maintainAspectRatio(maintainAspectRatio) {
    this._maintainAspectRatio = maintainAspectRatio;
  }

  get followWidth() {
    return this._followWidth;
  }

  set followWidth(value) {
    this._followWidth = value;
  }

  get followHeight() {
    return this._followHeight;
  }

  set followHeight(value) {
    this._followHeight = value;
  }

  doScaleXY(scaleXY) {
    //  console.log(this.name + " " + this.scale.x +" "+ this.scale.y);
    let x = scaleXY.x;
    let y = scaleXY.y;
    if (this._maintainAspectRatio) {
      if (!this.followWidth) {
        x = y;
      }
      if (!this.followHeight) {
        y = x;
      }
      let scaleMax = Math.max(x, y);
      x = scaleMax;
      y = scaleMax;
    } else {
      if (!this.followWidth) {
        x = this.scale.x;
      }
      if (!this.followHeight) {
        y = this.scale.y;
      }
    }
    this.scale = new Phaser.Point(x, y).multiply(this.initialScale.x, this.initialScale.y);
     // console.log(this.name + " " + this.scale.x +" "+ this.scale.y);    
  }
}

export default Scalable;
