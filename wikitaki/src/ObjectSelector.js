chimple.ObjectSelector = cc.Class.extend({
    _objectSelected: null,
    ctor: function(objectSelected) {
        this._objectSelected = objectSelected;
    },
    skinSelectedInConfiguration: function(selectedItem) {
        if(this._objectSelected != null && selectedItem._configuration && selectedItem._configuration.skin && selectedItem._configuration.bone) {
            this._objectSelected.getBoneNode(selectedItem._configuration.bone).displaySkin(selectedItem._configuration.skin, true);
        }
    }
    
})