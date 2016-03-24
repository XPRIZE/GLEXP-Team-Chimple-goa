let EnableInputs = (superclass) => class extends superclass {
    enableInputs(instance, iterateInside) {
        this.instance = instance;
        this.inputEnabled = true;

        if (instance.clickEnabled) {
            this.events.onInputDown.add(instance.onInputDown, this);
            this.events.onInputUp.add(instance.onInputUp, this);

        }
        if (instance.dragEnabled) {
            this.input.enableDrag();
            this.events.onDragStart.add(instance.onDragStart, this);
            this.events.onDragUpdate.add(instance.onDragUpdate, this);
            this.events.onDragStop.add(instance.onDragStop, this);
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
        if(this.events) {
            this.events.destroy();        
        }
        this.instance = null;
        this.inputEnabled = false;
        this.dragEnabled  = false;
        if (iterateInside) {
            this.children.forEach(function(value) {
                if ('function' == typeof value.disableInputs) {
                    value.disableInputs(iterateInside);
                }
            });
        }
    }


}

export default EnableInputs;
