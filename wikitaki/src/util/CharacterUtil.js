var chimple = chimple || {};

chimple.CharacterUtil = chimple.CharacterUtil || {};

chimple.CharacterUtil.displaySkins = function (character, skins) {
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
                var resourceName = defaultFolder + element.skin + ".json";
                if(character.getName() === 'Hero_Skeleton') {
                    resourceName = defaultFolder + "/characters/hero/" + element.skin + ".json";
                } else if(character.getName() === 'Nate_Skeleton') {
                    resourceName = defaultFolder + "/characters/nate/" + element.skin + ".json";
                } else if(character.getName() === 'Poppy_Skeleton') {
                    resourceName = defaultFolder + "/characters/poppy/" + element.skin + ".json";
                } else if(character.getName() === 'African_Hero_Boy_Skeleton') {
                    resourceName = defaultFolder + "/characters/human_skeleton_boy/" + element.skin + ".json";
                } 
                
                
                dynamicResources.push(resourceName);
                skinBones.push({
                        boneName: element.bone,
                        resourceName: resourceName
                    }
                );
            }
        }
    }, this);

    if(!cc.sys.isNative) {
        cc.director.pushScene(new cc.LoaderScene());
    }
    cc.LoaderScene.preload(dynamicResources, function () {
        if(!cc.sys.isNative) {
            cc.director.popScene();
        }

        skinBones.forEach(function (loadedRes) {
            if (!cc.sys.isNative) {
                if (loadedRes && loadedRes.resourceName && loadedRes.resourceName.indexOf(".png") == -1) {
                    if (cc.loader.cache[loadedRes.resourceName]) {
                        chimple.ParseUtil.changeSize(cc.loader.cache[loadedRes.resourceName], null, chimple.designScaleFactor);
                        cc.loader.cache[loadedRes.resourceName].ChimpleCompressed = true;
                    }
                }
            }
            var dynamicSkin = ccs.load(loadedRes.resourceName);
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
            if (character._userData.skeletonConfigJson && character._userData.skeletonConfigJson.baseSkin) {
                for (var boneName in character._userData.skeletonConfigJson.baseSkin) {
                    var bone = character.getBoneNode(boneName);
                    if (bone != null) {
                        var skin = character._userData.skeletonConfigJson.baseSkin[boneName];
                        bone.displaySkin(skin, false);
                    }
                }
            }
        }, this);
        chimple.ParseUtil.updateUserData(character._actionTag, 'visibleSkins', chimple.CharacterUtil.getVisibleSkins(character));
    }, this);
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
    var skeletonConfigJson;
    if (selectedConfiguration && selectedConfiguration.skeletonConfigJson) {
        skeletonConfigJson = selectedConfiguration.skeletonConfigJson;
        skeleton._userData.skeletonConfigJson = skeletonConfigJson;
    } else if (skeleton._userData && skeleton._userData.skeletonConfigJson) {
        skeletonConfigJson = skeleton._userData.skeletonConfigJson;
    } else {
        if(skeleton.getName() === 'Hero_Skeleton') {
            skeletonConfigJson = 'res/characters/hero/' + skeleton.getName() + '.json';
        } else if(skeleton.getName() === 'Nate_Skeleton') {
            skeletonConfigJson = 'res/characters/nate/' + skeleton.getName() + '.json';
        } else if(skeleton.getName() === 'Poppy_Skeleton') {
            skeletonConfigJson = 'res/characters/poppy/' + skeleton.getName() + '.json';
        } 
        else if(skeleton.getName() === 'African_Hero_Boy_Skeleton') {
            skeletonConfigJson = 'res/characters/human_skeleton_boy/' + skeleton.getName() + '.json';
        } 
        else {
            skeletonConfigJson = 'res/characters/skeletonConfig/' + skeleton.getName() + '.json';
        }
        
        skeleton._userData.skeletonConfigJson = skeletonConfigJson;
    }
    cc.loader.loadJson(skeletonConfigJson, function (error, data) {
        if (data != null) {
            skeleton._skeletonConfig = data;
            skeleton._currentAnimationName = data.animations[0].name;
            chimple.ParseUtil.updateUserData(skeleton._actionTag, 'skeletonConfigJson', skeletonConfigJson);

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
    //Dynamically load files required for this skeleton
    //load cricketer_shirt file
    var dynamicResources = [];
    cc.log('loading for:' + configuration.skinNameMap);
    if (skeleton._skeletonConfig.skinNameMaps
        && skeleton._skeletonConfig.skinNameMaps.hasOwnProperty(configuration.skinNameMap) == true) {

        var skinConfigMap = skeleton._skeletonConfig.skinNameMaps[configuration.skinNameMap];
        for (var property in skinConfigMap) {
            if (skinConfigMap.hasOwnProperty(property)) {
                var resourceName = defaultFolder + skinConfigMap[property] + ".json";
                dynamicResources.push(resourceName);
            }
        }

    }

    cc.log('dynamicResources:' + dynamicResources);
    if(!cc.sys.isNative) {
        cc.director.pushScene(new cc.LoaderScene()); //TODO dummy right now later fix this
    } 
    cc.LoaderScene.preload(dynamicResources, function () {
        if (!cc.sys.isNative) {
            cc.director.popScene();
            //resize all loaded contents
            dynamicResources.forEach(function (loadedResourceURL) {
                if (loadedResourceURL && loadedResourceURL.indexOf(".png") == -1) {
                    if (cc.loader.cache[loadedResourceURL]) {
                        chimple.ParseUtil.changeSize(cc.loader.cache[loadedResourceURL], null, chimple.designScaleFactor);
                        cc.loader.cache[loadedResourceURL].ChimpleCompressed = true;
                    }
                }
            }, this);
        }

        for (var property in skinConfigMap) {
            if (skinConfigMap.hasOwnProperty(property)) {
                var resourceName = defaultFolder + skinConfigMap[property] + ".json";
                var dynamicSkin = ccs.load(resourceName);
                if (dynamicSkin.node) {
                    var bone = skeleton.getBoneNode(property);
                    if (bone) {
                        bone.addSkin(dynamicSkin.node, true);
                        //bone.displaySkin(bone.getSkins()[bone.getSkins().length - 1], true);
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


        if (!configuration.favoriteSkins) {
            chimple.CharacterUtil.addCharacterToFavorites(skeleton, configuration);
        }
    }, this);

}

chimple.CharacterUtil.addCharacterToFavorites = function (skeleton, configuration) {
    //check if configuration is already added into favorites
    var favoriteCharConfiguration = null;
    if (!configuration) {
        favoriteCharConfiguration = {}
    } else {
        favoriteCharConfiguration = JSON.parse(JSON.stringify(configuration));
    }
    favoriteCharConfiguration.type = "character";
    favoriteCharConfiguration.json = 'res/' + skeleton._userData.resourcePath;
    favoriteCharConfiguration.uniqueCharacterID = skeleton._userData.uniqueCharacterID;
    favoriteCharConfiguration.favoriteSkins = [];
    if (skeleton._userData.visibleSkins) {
        skeleton._userData.visibleSkins.forEach(function (element) {
            favoriteCharConfiguration.favoriteSkins.push(element);
        }, this);
    }
    if (!favoriteCharConfiguration.colorSkins) {
        favoriteCharConfiguration.colorSkins = [];
    }

    if (skeleton._userData.colorSkins) {
        skeleton._userData.colorSkins.forEach(function (element) {
            favoriteCharConfiguration.colorSkins.push(element);
        }, this);
    }

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