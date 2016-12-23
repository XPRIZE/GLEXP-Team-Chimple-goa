var xc = xc || {};

xc.CharacterUtil = xc.CharacterUtil || {};

xc.CharacterUtil.displaySkins = function (character, skins) {
    //load all skins                    
    var dynamicResources = [];
    var skinBones = [];

    skins.forEach(function (element) {
        var bone = character.getBoneNode(element.bone);
        if (element.skin != element.bone) {
            var skinLoaded = false;
            bone.getSkins().forEach(function (skin) {
                if (element.skin === skin) {
                    //found skin
                    skinLoaded = true;
                }
            });
            //find all resources to be loaded
            if (!skinLoaded) {
                var resourceName = xc.path + "wikitaki/" + element.skin + ".json";
                dynamicResources.push(resourceName);
                skinBones.push({
                        boneName: element.bone,
                        resourceName: resourceName
                    }
                );
            }
        }
    }, this);

    skinBones.forEach(function (loadedRes) {
            var dynamicSkin = ccs.load(loadedRes.resourceName, xc.path + "wikitaki/");
            if (dynamicSkin.node) {
                var bone = character.getBoneNode(loadedRes.boneName);
                if(bone) {
                    bone.addSkin(dynamicSkin.node, true);
                }                
            }
        });

        skins.forEach(function (element) {
            var bone = character.getBoneNode(element.bone);
            bone.displaySkin(element.skin, true);
            bone.displaySkin(element.bone, false);
            if (character && character.UserData && character.UserData.skeletonConfigJson && character.UserData.skeletonConfigJson.baseSkin) {
                for (var boneName in character.UserData.skeletonConfigJson.baseSkin) {
                    var bone = character.getBoneNode(boneName);
                    if (bone != null) {
                        var skin = character.UserData.skeletonConfigJson.baseSkin[boneName];
                        bone.displaySkin(skin, false);
                    }
                }
            }
        }, this);
        cc.log('updating visible skins' + xc.CharacterUtil.getVisibleSkins(character));
        xc.ParseUtil.updateUserData(character._actionTag, 'visibleSkins', xc.CharacterUtil.getVisibleSkins(character));    
}

xc.CharacterUtil.getVisibleSkins = function (character) {
    var visibleSkins = [];
    var subBonesMap = character.getAllSubBonesMap();
    for (var name in subBonesMap) {
        subBonesMap[name].getVisibleSkins().forEach(function (skin) {
            visibleSkins.push({ 'bone': name, 'skin': skin.getName() })
        }, this);
    }
    return visibleSkins;
}

xc.CharacterUtil.colorSkins = function (character, colorSkins) {
    var existingColorSkins = xc.ParseUtil.getUserData(character._actionTag, 'colorSkins');
    if (existingColorSkins == null) {
        existingColorSkins = [];
        existingColorSkins.push({"skins":"hairSkin","color":"#000000"});
    }
    cc.log('existingColorSkins:' + JSON.stringify(existingColorSkins));

    if (colorSkins.skins && colorSkins.color) {
        if (character._skeletonConfig != null && character._skeletonConfig.colorSkins != null) {
            var skinNames = character._skeletonConfig.colorSkins[colorSkins.skins];
            if (skinNames != null) {
                for (var skinName in skinNames) {
                    var bone = character.getBoneNode(skinNames[skinName]);
                    
                    if (bone != null) {
                        cc.log("bone in color:" + bone.getName());
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
        xc.ParseUtil.updateUserData(character._actionTag, 'colorSkins', existingColorSkins);
    }
}

xc.CharacterUtil.loadSkeletonConfig = function (skeleton, selectedConfiguration) {
    var comExtensionData = skeleton.getComponent('ComExtensionData');
    if (comExtensionData) {
        if(comExtensionData.getCustomProperty()) {
            skeleton.UserData = JSON.parse(comExtensionData.getCustomProperty());
            if(skeleton.UserData) {
                skeleton._actionTag = skeleton.UserData._actionTag;
            }
        } else {
            skeleton.UserData = {};
        }                
    }
    var skeletonConfigJson;
    if (selectedConfiguration && selectedConfiguration.skeletonConfigJson) {
        skeletonConfigJson = selectedConfiguration.skeletonConfigJson;
        skeleton.UserData.skeletonConfigJson = skeletonConfigJson;
    } else if (skeleton.UserData && skeleton.UserData.skeletonConfigJson) {
        skeletonConfigJson = skeleton.UserData.skeletonConfigJson;
    } else {
        skeletonConfigJson = xc.path + 'wikitaki/characters/skeletonConfig/' + skeleton.getName() + '.json';
        skeleton.UserData.skeletonConfigJson = skeletonConfigJson;
    }
    cc.loader.loadJson(skeletonConfigJson, function (error, data) {
        if (data != null) {
            skeleton._skeletonConfig = data;
            skeleton._currentAnimationName = data.animations[0].name;

            xc.ParseUtil.updateUserData(skeleton._actionTag, 'skeletonConfigJson', skeletonConfigJson);

            if (data.baseSkin) {
                for (var boneName in data.baseSkin) {
                    var bone = skeleton.getBoneNode(boneName);
                    if (bone != null) {
                        var skin = data.baseSkin[boneName];
                        bone.displaySkin(skin, false);
                    }
                }
            }
            if (selectedConfiguration != null) {
                xc.CharacterUtil.applySkinNameMap(skeleton, selectedConfiguration);
                if (selectedConfiguration.colorSkins != null) {
                    selectedConfiguration.colorSkins.forEach(function (colorSkin) {
                        xc.CharacterUtil.colorSkins(skeleton, colorSkin);

                    })
                }                
            } else {
                if (skeleton.UserData && skeleton.UserData.colorSkins) {
                    skeleton.UserData.colorSkins.forEach(function (colorSkin) {
                        xc.CharacterUtil.colorSkins(skeleton, colorSkin);
                    })
                }
            }
        }
    });
}

xc.CharacterUtil.applySkinNameMap = function (skeleton, configuration) {
    //Dynamically load files required for this skeleton
    //load cricketer_shirt file
    var dynamicResources = [];
    if (skeleton._skeletonConfig.skinNameMaps
        && skeleton._skeletonConfig.skinNameMaps.hasOwnProperty(configuration.skinNameMap) == true) {

        var skinConfigMap = skeleton._skeletonConfig.skinNameMaps[configuration.skinNameMap];
        for (var property in skinConfigMap) {
            if (skinConfigMap.hasOwnProperty(property)) {
                var resourceName = xc.path + "wikitaki/" + skinConfigMap[property] + ".json";
                dynamicResources.push(resourceName);
            }
        }

    }

    if(!cc.sys.isNative) {
        cc.director.pushScene(new cc.LoaderScene()); //TODO dummy right now later fix this
    } 
    cc.LoaderScene.preload(dynamicResources, function () {
        if (!cc.sys.isNative) {
            cc.director.popScene();
        }

        for (var property in skinConfigMap) {
            if (skinConfigMap.hasOwnProperty(property)) {
                var resourceName = xc.path + "wikitaki/" + skinConfigMap[property] + ".json";
                var dynamicSkin = ccs.load(resourceName);
                if (dynamicSkin.node) {
                    var bone = skeleton.getBoneNode(property);
                    if (bone) {
                        bone.addSkin(dynamicSkin.node, true);
                    }
                }
            }
        }

        if (configuration.skinNameMap) {

            if (skeleton._skeletonConfig && skeleton._skeletonConfig.skinNameMaps && skeleton._skeletonConfig.skinNameMaps[configuration.skinNameMap]) {
                skeleton.changeSkins(skeleton._skeletonConfig.skinNameMaps[configuration.skinNameMap]);
            }
            var subBonesMap = skeleton.getAllSubBonesMap();
            for (var name in subBonesMap) {
                var bone = subBonesMap[name];
                if (bone != null) {
                    bone.displaySkin(name, false);
                }
            }
            if (skeleton._skeletonConfig.baseSkin) {
                for (var boneName in skeleton._skeletonConfig.baseSkin) {
                    var bone = skeleton.getBoneNode(boneName);
                    if (bone != null) {
                        var skin = skeleton._skeletonConfig.baseSkin[boneName];
                        bone.displaySkin(skin, false);
                    }
                }
            }
        }
        var uniqueCharacterID = null;
        if (configuration.favoriteSkins && configuration.favoriteSkins.length > 0) {
            xc.CharacterUtil.displaySkins(skeleton, configuration.favoriteSkins);
            uniqueCharacterID = configuration.uniqueCharacterID;
        } else {
            uniqueCharacterID = "skeleton_%%_" + xc.ParseUtil.generateUUID();
        }

        if (!skeleton.uniqueCharacterID) {
            skeleton.uniqueCharacterID = uniqueCharacterID;
            xc.ParseUtil.updateUserData(skeleton._actionTag, 'uniqueCharacterID', skeleton.uniqueCharacterID);
        }
        xc.ParseUtil.updateUserData(skeleton._actionTag, 'visibleSkins', xc.CharacterUtil.getVisibleSkins(skeleton));
        if (!configuration.favoriteSkins) {
            //xc.CharacterUtil.addCharacterToFavorites(skeleton, configuration);
        }
    }, this);

}

xc.CharacterUtil.addCharacterToFavorites = function (skeleton, configuration) {
    //check if configuration is already added into favorites
    var favoriteCharConfiguration = null;
    if (!configuration) {
        favoriteCharConfiguration = {}
    } else {
        favoriteCharConfiguration = JSON.parse(JSON.stringify(configuration));
    }
    favoriteCharConfiguration.type = "character";
    var uniqueCharacterID = xc.ParseUtil.getUserData(skeleton._actionTag,'uniqueCharacterID')
    skeleton.UserData.uniqueCharacterID = uniqueCharacterID;
    favoriteCharConfiguration.uniqueCharacterID = uniqueCharacterID;
    favoriteCharConfiguration.favoriteSkins = [];
    if (skeleton.UserData.visibleSkins) {
        skeleton.UserData.visibleSkins.forEach(function (element) {
            favoriteCharConfiguration.favoriteSkins.push(element);
        }, this);
    }
    if (!favoriteCharConfiguration.colorSkins) {
        favoriteCharConfiguration.colorSkins = [];
    }

    if (skeleton.UserData.colorSkins) {
        skeleton.UserData.colorSkins.forEach(function (element) {
            favoriteCharConfiguration.colorSkins.push(element);
        }, this);
    }

    xc.customCharacters.items.push(favoriteCharConfiguration);
    xc.CharacterUtil.addToCharacterConfigs(xc.customCharacters);
    xc.ParseUtil.cacheThumbnailForFavorites(skeleton);
}

xc.CharacterUtil.addToCharacterConfigs = function (characterConfig) {
    var characterCategories = xc.storyConfigurationObject.addObjects[1].categories;
    //add to xc.customCharacters.items

    if (characterCategories.length === xc.initalCharacterCategories) {
        characterCategories.splice(0, 0, xc.customCharacters);
    }
}

xc.CharacterUtil.storeActionToTemporaryStore = function (node) {
    node.children.forEach(function (element) {
        if (element.getName().indexOf("Skeleton") != -1 || element.getName().indexOf("skeleton") != -1) {
            var action = element._storedAction;
            if (action) {
                cc.log('action 22222:' + action);
                element.runAction(action);
            }
        }
    })
}

xc.CharacterUtil.restoreActionFromTemporaryStore = function (node) {
    node.children.forEach(function (element) {
        if (element.getName().indexOf("Skeleton") != -1 || element.getName().indexOf("skeleton") != -1) {
            var action = element.actionManager.getActionByTag(element.tag, element);
            if (action) {
                cc.log('action 1111:' + action);
                element._storedAction = action;
            }
        }
    })
}