var chimple = chimple || {};

var defaultFolder = "";
var defaultMiscFolder = "/res/";

if (!cc.sys.isNative) {
    defaultFolder = "/res/";
}


var res = {
    thumbnails_png: "/res/thumbnails.png",
    thumbnails_plist: "/res/thumbnails.plist",
    HelloWorld_png : "/res/HelloWorld.png",
    crow_json: "/res/characters/crow/Animation.json",
    elephant_json: "/res/characters/elephant/elep.json",
    textBubble_png: "/res/ninepatch_bubble_300x300.png",
    bubble_png: "/res/bubble.png",
    textTemplate_json: "/res/TextScene.json",
    human_skeleton_json: "/res/human_skeleton.json"
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