var chimple = chimple || {};

var defaultFolder = "res/";
var defaultMiscFolder = "res/";

if (!cc.sys.isNative) {
    defaultFolder = "/res/";
    defaultMiscFolder = "/res/";    
}


var res = {
    thumbnails_png: defaultMiscFolder + "thumbnails.png",
    thumbnails_plist: defaultMiscFolder + "thumbnails.plist",
    human_skeleton_png: defaultMiscFolder + "human_skeleton.png",
    human_skeleton_plist: defaultMiscFolder + "human_skeleton.plist",
    animalskeleton_png: defaultMiscFolder + "animalskeleton.png",
    animalskeleton_plist: defaultMiscFolder + "animalskeleton.plist",
    animalskeleton_json: defaultMiscFolder + "animalskeleton.json",
    birdskeleton_png: defaultMiscFolder + "birdskeleton.png",
    birdskeleton_plist: defaultMiscFolder + "birdskeleton.plist",
    birdskeleton_json: defaultMiscFolder + "birdskeleton.json",
    HelloWorld_png: defaultMiscFolder + "HelloWorld.png",
    human_skeleton_json: defaultMiscFolder + "human_skeleton.json",
    hero_skeleton_png: defaultMiscFolder + "hero/hero.png",
    hero_skeleton_plist: defaultMiscFolder + "hero/hero.plist",        
    hero_skeleton_json: defaultMiscFolder + "hero/hero.json",
    hero1_skeleton_png: defaultMiscFolder + "hero.png",
    hero1_skeleton_plist: defaultMiscFolder + "hero.plist",        
    hero1_skeleton_json: defaultMiscFolder + "hero.json",    
    play_png: defaultMiscFolder + "play.png",
    record_animation_png: defaultMiscFolder + "recording.png",
    record_animation_plist: defaultMiscFolder + "recording.plist",
    fox: defaultMiscFolder + "fox_stork_01.json"    
};


var misc = {
    Config_json: defaultMiscFolder + "misc/storyConfig.json",
    EditPlayConfig_json: defaultMiscFolder + "misc/playConfig.json",
    OnlyStoryPlayConfig_json: defaultMiscFolder + "misc/onlyPlayConfig.json",

};


var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
};


cc.loader.loadJson(misc.EditPlayConfig_json, function (error, data) {
    chimple.storyPlayConfigurationObject = data;
});

cc.loader.loadJson(misc.OnlyStoryPlayConfig_json, function (error, data) {
    chimple.onlyStoryPlayConfigurationObject = data;
});


cc.loader.loadJson(misc.Config_json, function (error, data) {
    chimple.storyConfigurationObject = data;
    chimple.initalCharacterCategories = chimple.storyConfigurationObject.addObjects[1].categories.length;
    chimple.customCharacters = {};
    chimple.customCharacters.cIcon = "icons/fav_character_onclick.png";
    chimple.customCharacters.icon = "icons/fav_character.png";
    chimple.customCharacters.items = [];
    chimple.customCharacters.name = "favCharacters";
});