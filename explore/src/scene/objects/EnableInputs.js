import MiscUtil from '../../util/MiscUtil.js';

let EnableInputs = (superclass) => class extends superclass {
    enableInputs(instance, iterateInside) {
        this.instance = instance;
        this.inputEnabled = true;
        if (instance.priorityID) {
            MiscUtil.setPriorityID(this, instance.priorityID);
        }
        if (instance.clickEnabled) {
            if (this.events) {
                this.events.onInputDown.add(instance.onInputDown, this);
                this.events.onInputUp.add(instance.onInputUp, this);
            }
        }
        if (instance.dragEnabled && this.input) {
            this.input.enableDrag();
            if (this.events) {
                this.events.onDragStart.add(instance.onDragStart, this);
                this.events.onDragUpdate.add(instance.onDragUpdate, this);
                this.events.onDragStop.add(instance.onDragStop, this);
            }
        }

        if (iterateInside) {
            this.children.forEach(function(value) {
                if ('function' == typeof value.enableInputs) {
                    value.enableInputs(instance, iterateInside);
                }
            });
        }
    }

    disableInputs(iterateInside) {
        if (this.events) {
            this.events.destroy();
        }
        this.instance = null;
        this.inputEnabled = false;
        this.dragEnabled = false;
        if (iterateInside) {
            this.children.forEach(function(value) {
                if ('function' == typeof value.disableInputs) {
                    value.disableInputs(iterateInside);
                }
            });
        }
    }

    enableDrag(iterateInside) {
        if (this.instance && this.instance.dragEnabled && this.input) {
            this.input.enableDrag();
        }
        if (iterateInside) {
            this.children.forEach(function(value) {
                if ('function' == typeof value.enableDrag) {
                    value.enableDrag(iterateInside);
                }
            });
        }
    }


    disableDrag(iterateInside) {
        if (this.instance && this.instance.dragEnabled && this.input) {
            this.input.disableDrag();
        }
        if (iterateInside) {
            this.children.forEach(function(value) {
                if ('function' == typeof value.disableDrag) {
                    value.disableDrag(iterateInside);
                }
            });
        }
    }


}

export default EnableInputs;
