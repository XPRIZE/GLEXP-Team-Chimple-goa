var chimple = chimple || {};

chimple.CharacterUtil = chimple.CharacterUtil || {};

chimple.CharacterUtil.displaySkins = function (character, skins) {
    skins.forEach(function (element) {
        var bone = character.getBoneNode(element.bone);
        if (bone != null) {
            bone.displaySkin(element.skin, true);
            bone.displaySkin(element.bone);
        }
    }, this);
    chimple.ParseUtil.updateUserData(character._actionTag, 'visibleSkins', chimple.CharacterUtil.getVisibleSkins(character));    
}

chimple.CharacterUtil.getVisibleSkins = function (character) {
    var visibleSkins = [];
    var subBonesMap = character.getAllSubBonesMap();
    for (var name in subBonesMap) {
        subBonesMap[name].getVisibleSkins().forEach(function (skin) {
            visibleSkins.push({ 'bone': name, 'skin': skin.getName() })
        }, this);
    }
    return visibleSkins;
}

chimple.CharacterUtil.colorSkins = function (character, colorSkins) {
    if (colorSkins.skins && colorSkins.color) {
        if (character._skeletonConfig != null && character._skeletonConfig.colorSkins != null) {
            var skinNames = character._skeletonConfig.colorSkins[colorSkins.skins];
            if (skinNames != null) {
                for (var boneName in skinNames) {
                    var bone = character.getBoneNode(boneName);
                    if (bone != null) {
                        bone.getSkins().forEach(function (skin) {
                            if (skin.getName() == skinNames[boneName]) {
                                skin.color = cc.color(colorSkins.color)
                            }
                        }, this);;
                    }
                }
            }
        }
    }
}

chimple.CharacterUtil.loadSkeletonConfig = function (skeleton, selectedConfiguration) {
    var comExtensionData = skeleton.getComponent('ComExtensionData');
    if (comExtensionData) {
        skeleton._userData = comExtensionData.getCustomProperty();
        skeleton._actionTag = comExtensionData.getActionTag();
    }

    cc.loader.loadJson('/res/characters/skeletonConfig/' + skeleton.getName() + '.json', function (error, data) {
        if (data != null) {
            skeleton._skeletonConfig = data;
            skeleton._currentAnimationName = data.animations[0].name;
            if (selectedConfiguration != null) {
                chimple.CharacterUtil.applySkinNameMap(skeleton, selectedConfiguration);
            }
        }
    });        
}

chimple.CharacterUtil.applySkinNameMap = function (skeleton, configuration) {
    if (configuration.skinNameMap) {
        if (skeleton._skeletonConfig && skeleton._skeletonConfig.skinNameMaps && skeleton._skeletonConfig.skinNameMaps[configuration.skinNameMap]) {
            skeleton.changeSkins(skeleton._skeletonConfig.skinNameMaps[configuration.skinNameMap]);
        }
        var subBonesMap = skeleton.getAllSubBonesMap();
        for (var name in subBonesMap) {
            var bone = subBonesMap[name];
            if (bone != null) {
                bone.displaySkin(name);
            }
        }

        //apply fav skins if present
        //chimple.CharacterUtil.displaySkins(element, element._userData.visibleSkins);
        if(configuration.favSkins && configuration.favSkins.length > 0) {
            chimple.CharacterUtil.displaySkins(skeleton, configuration.favSkins);
        }
        chimple.ParseUtil.updateUserData(skeleton._actionTag, 'visibleSkins', chimple.CharacterUtil.getVisibleSkins(skeleton));
        chimple.ParseUtil.updateUserData(skeleton._actionTag, 'appliedSkinMap', configuration.skinNameMap);
    }

}

chimple.CharacterUtil.storeActionToTemporaryStore = function (node) {
    node.children.forEach(function (element) {
        if (element.getName().indexOf("Skeleton") != -1) {
            var action = element._storedAction;
            if (action) {
                element.runAction(action);
            }
        }
    })
}

chimple.CharacterUtil.restoreActionFromTemporaryStore = function (node) {
    node.children.forEach(function (element) {
        if (element.getName().indexOf("Skeleton") != -1) {
            var action = element.actionManager.getActionByTag(element.tag, element);
            if (action) {
                element._storedAction = action;
            }
        }
    })
}