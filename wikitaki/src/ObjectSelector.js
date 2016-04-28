chimple.ObjectSelector = cc.Class.extend({
    _objectSelected: null,
    ctor: function(objectSelected) {
        this._objectSelected = objectSelected;
    },
    skinSelectedInConfiguration: function(selectedItem) {
        if(this._objectSelected != null && selectedItem._configuration && selectedItem._configuration.skins && selectedItem._configuration.skins.length > 0) {
            selectedItem._configuration.skins.forEach(function(element) {
                this._objectSelected.getBoneNode(element.bone).displaySkin(element.skin, true);            
            }, this);   
        }
    }
    
})