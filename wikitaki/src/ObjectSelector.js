chimple.ObjectSelector = cc.Class.extend({
    _objectSelected: null,
    ctor: function (objectSelected) {
        this._objectSelected = objectSelected;
    },
    skinSelectedInConfiguration: function (selectedItem) {
        if (this._objectSelected != null && selectedItem._configuration) {
            if (selectedItem._configuration.skins && selectedItem._configuration.skins.length > 0) {
                selectedItem._configuration.skins.forEach(function (element) {
                    this._objectSelected.getBoneNode(element.bone).displaySkin(element.skin, true);
                    this._objectSelected.getBoneNode(element.bone).displaySkin(element.bone);
                }, this);
            } else if(selectedItem._configuration.colorSkins && selectedItem._configuration.colorSkins.skins && selectedItem._configuration.colorSkins.color) {
                if(this._objectSelected.getUserData() != null && this._objectSelected.getUserData().colorSkins != null) {
                    var skinNames = this._objectSelected.getUserData().colorSkins[selectedItem._configuration.colorSkins.skins];
                    if(skinNames != null) {
                        for (var boneName in skinNames) {
                            var bone = this._objectSelected.getBoneNode(boneName);
                            if(bone != null) {
                                bone.getSkins().forEach(function(skin) {
                                    if(skin.getName() == skinNames[boneName]) {
                                        skin.color = cc.color(selectedItem._configuration.colorSkins.color)
                                    }
                                }, this);;
                            }
                        }
                    }
                }
            }
        }
    }

})