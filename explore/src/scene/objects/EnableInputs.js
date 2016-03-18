let EnableInputs = (superclass) => class extends superclass {
    enableInputs(instance, iterateInside) {
        if(iterateInside) {
            this.children.forEach(function(value) {
                if('function' == typeof value.enableInputs) {
                    value.enableInputs(instance, iterateInside);                                        
                }
            });
        }
    }
    
    disableInputs(iterateInside) {
        this.inputEnabled = false;
        if(iterateInside) {
            this.children.forEach(function(value) {
                if('function' == typeof value.disableInputs) {
                    value.disableInputs(iterateInside);                                        
                }
            });
        }        
    }
}

export default EnableInputs;
