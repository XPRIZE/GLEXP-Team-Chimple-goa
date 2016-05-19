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
    var existingColorSkins = chimple.ParseUtil.getUserData(character._actionTag, 'colorSkins');
    if (existingColorSkins == null) {
        existingColorSkins = [];
    }

    if (colorSkins.skins && colorSkins.color) {
        if (character._skeletonConfig != null && character._skeletonConfig.colorSkins != null) {
            var skinNames = character._skeletonConfig.colorSkins[colorSkins.skins];
            if (skinNames != null) {
                for (var skinName in skinNames) {
                    var bone = character.getBoneNode(skinNames[skinName]);
                    if (bone != null) {
                        bone.getSkins().forEach(function (skin) {
                            if (skin.getName() == skinName) {
                                skin.color = cc.color(colorSkins.color)
                            }
                        }, this);;
                    }
                }
            }
        }
        if (existingColorSkins) {
            var colorSkinFound = false;
            existingColorSkins.forEach(function (colorSkin) {
                if (colorSkin && colorSkin.skins == colorSkins.skins) {
                    colorSkin.color = colorSkins.color;
                    colorSkinFound = true;
                }
            }, this);

            if (!colorSkinFound) {
                existingColorSkins.push(colorSkins);
            }
        }
        chimple.ParseUtil.updateUserData(character._actionTag, 'colorSkins', existingColorSkins);
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
                
                if (selectedConfiguration.colorSkins != null) {
                    selectedConfiguration.colorSkins.forEach(function (colorSkin) {
                        chimple.CharacterUtil.colorSkins(skeleton, colorSkin);

                    })
                }
                chimple.CharacterUtil.applySkinNameMap(skeleton, selectedConfiguration);
            } else {
                if (skeleton._userData && skeleton._userData.colorSkins) {
                    skeleton._userData.colorSkins.forEach(function (colorSkin) {
                        chimple.CharacterUtil.colorSkins(skeleton, colorSkin);
                    })
                }
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
    }
    var uniqueCharacterID = null;
    if (configuration.favoriteSkins && configuration.favoriteSkins.length > 0) {
        chimple.CharacterUtil.displaySkins(skeleton, configuration.favoriteSkins);
        uniqueCharacterID = configuration.uniqueCharacterID;
    } else {
        uniqueCharacterID = "skeleton_%%_" + chimple.ParseUtil.generateUUID();
    }

    if (!skeleton.uniqueCharacterID) {
        skeleton.uniqueCharacterID = uniqueCharacterID;
        chimple.ParseUtil.updateUserData(skeleton._actionTag, 'uniqueCharacterID', skeleton.uniqueCharacterID);
    }

    chimple.ParseUtil.updateUserData(skeleton._actionTag, 'visibleSkins', chimple.CharacterUtil.getVisibleSkins(skeleton));


    if (!configuration.favoriteSkins && configuration.type && configuration.type == 'character') {
        chimple.CharacterUtil.addCharacterToFavorites(skeleton, configuration);
    }

}

chimple.CharacterUtil.addCharacterToFavorites = function (skeleton, configuration) {
    //check if configuration is already added into favorites
    var favoriteCharConfiguration = JSON.parse(JSON.stringify(configuration));
    favoriteCharConfiguration.type = "character";
    favoriteCharConfiguration.json = '/res/' + skeleton._userData.resourcePath;
    favoriteCharConfiguration.uniqueCharacterID = skeleton.uniqueCharacterID;
    favoriteCharConfiguration.favoriteSkins = [];
    skeleton._userData.visibleSkins.forEach(function (element) {
        favoriteCharConfiguration.favoriteSkins.push(element);
    }, this);

    chimple.customCharacters.items.push(favoriteCharConfiguration);
    chimple.CharacterUtil.addToCharacterConfigs(chimple.customCharacters);
    chimple.ParseUtil.cacheThumbnailForFavorites(skeleton);
}

chimple.CharacterUtil.addToCharacterConfigs = function (characterConfig) {
    var characterCategories = chimple.storyConfigurationObject.addObjects[1].categories;
    //add to chimple.customCharacters.items

    if (characterCategories.length === chimple.initalCharacterCategories) {
        characterCategories.splice(0, 0, chimple.customCharacters);
    }
}

chimple.CharacterUtil.storeActionToTemporaryStore = function (node) {
    node.children.forEach(function (element) {
        if (element.getName().indexOf("Skeleton") != -1 || element.getName().indexOf("skeleton") != -1) {
            var action = element._storedAction;
            if (action) {
                element.runAction(action);
            }
        }
    })
}

chimple.CharacterUtil.restoreActionFromTemporaryStore = function (node) {
    node.children.forEach(function (element) {
        if (element.getName().indexOf("Skeleton") != -1 || element.getName().indexOf("skeleton") != -1) {
            var action = element.actionManager.getActionByTag(element.tag, element);
            if (action) {
                element._storedAction = action;
            }
        }
    })
}