var chimple = chimple || {};

var defaultFolder = "";
var defaultMiscFolder = "/res/";

if (!cc.sys.isNative) {
    defaultFolder = "/res/";
}


var res = {
    icons1_png: "/res/icons1.png",
    icons1_plist: "/res/icons1.plist",
    icons2_png: "/res/icons2.png",
    icons2_plist: "/res/icons2.plist",
    HelloWorld_png : "/res/HelloWorld.png",
    crow_json: "/res/characters/crow/Animation.json",
    elephant_json: "/res/characters/elephant/elep.json",
    donkey_skeleton_json: "/res/characters/donkey/Skeleton.json",
    human_skeleton_json: "/res/human_skeleton.json",
    textBubble_png: "/res/ninepatch_bubble_300x300.png",
    bubble_png: "/res/bubble.png",
    textTemplate_json: "/res/TextScene.json"  
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
});