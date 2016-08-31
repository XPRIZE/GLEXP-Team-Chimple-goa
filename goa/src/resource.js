var chimple = chimple || {};

var defaultFolder = "res/";
var defaultMiscFolder = "res/";

if (!cc.sys.isNative) {
    defaultFolder = "/res/";
    defaultMiscFolder = "/res/";    
}


var bubbleShooter = {
    Background1_plist : "res/bubbleShooter/Background_01.plist",
    Background1_png : "res/bubbleShooter/Background_01.png",
    Background2_plist : "res/bubbleShooter/Background_02.plist",
    Background2_png : "res/bubbleShooter/Background_02.png",
    
    ObjectAllImage_plist : "res/bubbleShooter/Object_2.plist",
    ObjectAllImage_png : "res/bubbleShooter/Object_2.png",
    
    Category_plist : "res/bubbleShooter/Category.plist",
    Category_png : "res/bubbleShooter/Category.png",
    
    BubbleBlast_plist : "res/bubbleShooter/Bubble_blast.plist",
    BubbleBlast_png : "res/bubbleShooter/Bubble_blast.png"    
    
};

var alphamon_res = {
    Alphamole_png1:"res/alphamole/alphamole1/alphamole1.png",
     Alphamole_plist1:"res/alphamole/alphamole1/alphamole1.plist",
     Alphamole_json:"res/alphamole/alphamole1_foreground.json",
    Alphamole_json1:"res/alphamole/alphamole1_background.json",
    Alphamole_json3:"res/alphamole/alphamole1.json",
    Alphamole_A:"res/english/A.json",
    Alphamole_alphabet_png:"res/alphamon.png",
    Alphamole_alphabet_plist:"res/alphamon.plist",
     
     Alphamole_english_fnt:"res/english/baloo_bhai_hdr.fnt",
     Alphamole_english_png:"res/english/baloo_bhai_hdr_0.png"
};

var alphamone_json = {
    Alphamole_eye_h_plist:"res/eye_ani/eye_h.json",
     Alphamole_skate_b_plist:"res/leg_ani/skate_b.json",
     Alphamole_mouth_h_plist:"res/mouth_ani/mouth_e.json",
};

for(var j in alphamone_json){
cc.loader.loadJson(alphamone_json[j], function (error, data) {
});
}

cc.loader.loadTxt(alphamon_res.Alphamole_english_fnt, function(err, data){
    if(err) return console.log("load failed");
    //success
});

var alphamon_resources = [];
for (var i in alphamon_res) {
    alphamon_resources.push(alphamon_res[i]);
}
var pop_res = {
        pop_scene: "res/pop/pop.json",
        pop_plane: "res/pop/plane.json",
        pop_scene_plist:"res/pop/pop.plist",
        pop_scene_png: "res/pop/pop.png",
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
    play_png: defaultMiscFolder + "play.png",
    record_animation_png: defaultMiscFolder + "recording.png",
    record_animation_plist: defaultMiscFolder + "recording.plist",
    fox: defaultMiscFolder + "fox_stork_01.json",    
};


var misc = {
    Config_json: defaultMiscFolder + "wikitaki/misc/storyConfig.json",
    EditPlayConfig_json: defaultMiscFolder + "wikitaki/misc/playConfig.json",
    OnlyStoryPlayConfig_json: defaultMiscFolder + "wikitaki/misc/onlyPlayConfig.json",
};


var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
};

var BubbleShooter_resource = [];
for (var i in bubbleShooter) {
    BubbleShooter_resource.push(bubbleShooter[i]);
};

var Pop_resource =[];
for(var i in pop_res)
{
    Pop_resource.push(pop_res[i]);
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