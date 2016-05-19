var chimple = chimple || {};

var defaultFolder = "";
var defaultMiscFolder = "/res/";

if (!cc.sys.isNative) {
    defaultFolder = "/res/";
}


var res = {
    thumbnails_png: "/res/thumbnails.png",
    thumbnails_plist: "/res/thumbnails.plist",
    human_skeleton_png: "/res/human_skeleton.png",
    human_skeleton_plist: "/res/human_skeleton.plist",
    animalskeleton_png: "/res/animalskeleton.png",
    animalskeleton_plist: "/res/animalskeleton.plist",
    animalskeleton_json: "/res/animalskeleton.json",
    birdskeleton_png: "/res/birdskeleton.png",
    birdskeleton_plist: "/res/birdskeleton.plist",
    birdskeleton_json: "/res/birdskeleton.json",
    HelloWorld_png : "/res/HelloWorld.png",
    human_skeleton_json: "/res/human_skeleton.json",
    play_png: "/res/play.png",
    record_animation_png: "/res/recording.png",
    record_animation_plist: "/res/recording.plist",
    
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