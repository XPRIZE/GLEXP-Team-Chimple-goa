export default class ScrollableView extends Phaser.Sprite {
    constructor(game, x, y, key, frame, width, height) {
        super(game, x, y, key, frame);
        this.scrollWidth = width;
        this.scrollHeight = height;
        this.mask = this.addChild(this.game.add.graphics(0,0));
        this.mask.beginFill(0x000000); //all graphics must be filled
        this.mask.alpha = 0; //make invisible so fill doesn't cover background
        //draw the rect over the scroll background
        this.mask.drawRect(0, 0, width, height);
        this.mask.inputEnabled = true;
        this.mask.events.onInputDown.add(this.onInputDown, this);  
        this.mask.events.onInputUp.add(this.onInputUp, this);  
        this.game.input.addMoveCallback(this.moveCallback, this);

        this.duration = this.game.height * 1.5; // (ms) duration of the inertial scrolling simulation. Devices with larger screens take longer durations (phone vs tablet is around 500ms vs 1500ms). This is a fixed value and does not influence speed and amount of momentum.
        this.speedLimit = 1.2; // set maximum speed. Higher values will allow faster scroll (which comes down to a bigger offset for the duration of the momentum scroll) note: touch motion determines actual speed, this is just a limit.
        this.moveThreshold = 100; // (ms) determines if a swipe occurred: time between last updated movement @ touchmove and time @ touchend, if smaller than this value; trigger inertial scrolling
        this.offsetThreshold = 30; // (px) determines, together with i_offsetThreshold if a swipe occurred: if calculated offset is above this threshold
        this.startThreshold = 5; // (px) how many pixels finger needs to move before a direction (horizontal or vertical) is chosen. This will make the direction detection more accurate, but can introduce a delay when starting the swipe if set too high
        this.acceleration = 0.5; // increase the multiplier by this value, each time the user swipes again when still scrolling. The multiplier is used to multiply the offset. Set to 0 to disable.
        this.accelerationT = 250; // (ms) time between successive swipes that determines if the multiplier is increased (if lower than this value)
        this.time = {}; // contains timestamps of the most recent down, up, and move events
        this.multiplier = 1; //acceleration multiplier, don't edit here
    }
    
    set scrollable(val) {
        if(this._scrollable) {
            this.removeChild(this._scrollable);
            this._scrollable.destroy();
        }
        this._scrollable = this.addChild(val);
        this.elemH = val.height; //height of the scrolling element
        this.tweenScroll = this.game.add.tween(val);
        this.maskYSave = val.y;
    }
    
    get scrollable() {
        return this._scrollable;
    }
    
    //event listeners for scrolling
    //touchstart/mousedown event
    onInputDown(sprite, pointer) {
        //mouse is now down
        this.mousedown = true;
    
        //store timestamp for event
        this.time.down = pointer.timeDown;
    
        //get coords of input
        this.yCoord = pointer.y;
    
        //check if block is currently scrolling and set multiplier
        if (this.tweenScroll.isRunning && (this.time.down - this.time.up) < this.accelerationT) {
            //swipe while animation was happening, increase multiplier
            this.multiplier += this.acceleration;
        } else {
            //reset
            this.multiplier = 1;
        }
        //stop tween for touch-to-stop
        this.tweenScroll.stop();   
    }
    
    //dragging/swiping handler
    moveCallback(pointer) {
        if (!this.mousedown) {
            this.go = false;
            return;   
        }
    
        //store timestamp for event
        this.time.move = this.time.time;
    
        //check if start threshold is met
        this.go = (Math.abs(this.yCoord - pointer.y) > this.startThreshold);
        if (this.go) {
            this.distance = this.yCoord - pointer.y;
            this.acc = Math.abs(this.distance / (this.time.move - this.time.down));
    
            //go ahead and move the block
            //call custom function to move the block a set distance for a set duration
            this.doTween(1, this.scrollable.y - this.distance);
            this.go = false;
        }
    };
    
    //on drag/swipe release
    onInputUp(sprite, pointer) {
        //mouse is now up
        this.mousedown = false;
    
        //store timestamp for event
        this.time.up = pointer.timeUp;
    
        //check if start threshold is met
        this.go = (Math.abs(this.yCoord - pointer.y) > this.startThreshold);
        if (this.go) {
            //calc for moving
            let touchTime = this.time.up - this.time.move;
            let maxOffset = this.elemH * this.speedLimit;
    
            //distance to move after release
            let offset = Math.pow(this.acc, 2) * this.elemH;
            offset = (offset > maxOffset) ? maxOffset : offset;
            offset = (this.distance < 0) ? -this.multiplier * offset : this.multiplier * offset;
    
            //check if we should include momentum
            if ((touchTime < this.moveThreshold) && offset !== 0 && Math.abs(offset) > (this.offsetThreshold)) {
                this.doTween(this.duration, this.scrollable.y - this.distance - offset);
            } else {
                this.doTween(1, this.scrollable.y - this.distance);
            }
            this.go = false;
        }
    }    
 
    doTween(duration, distance) {
        //stop a tween if it is currently happening
        this.tweenScroll.stop();
 
        //check if scroll will move past bounds and limit it
        if (distance > this.maskYSave) { //top bounds
            //recalculate the distance and duration
            let velocity = distance / duration;
            distance = this.maskYSave;
            duration = distance / velocity;
        } else if (distance + this.scrollable.height < this.scrollHeight) { //bottom bounds. the multiplier here is because we have the anchor set to the middle and the object is positioned in the middle of the screen. adjust as needed.
        //recalc again...
            let velocity = distance / duration;
            distance = this.scrollHeight - this.scrollable.height; //same reason for multiplier as above
            duration = distance / velocity;
        }
 
        //the tween itself
        this.tweenScroll = this.game.add.tween(this.scrollable).to({
            y: distance
        }, duration, Phaser.Easing.Quartic.Out, true);
 
        //reset multiplier when finished
        this.tweenScroll.onComplete.add(function() {
            this.multiplier = 1;
        }, this);
    } 
}
