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
    
}


var SortIt = {
     
   
    
    sortittwo_png: defaultFolder + "sortit/sortittwo/sortittwo.png",
    sortittwo_plist: defaultFolder + "sortit/sortittwo/sortittwo.plist",
    
    sortit_png: defaultFolder + "sortit/sortit.png",
    sortit_plist: defaultFolder + "sortit/sortit.plist",
    
    
    level1bg_json: defaultFolder + "sortit/levelone.json",
    level2bg_json: defaultFolder + "sortit/leveltwo.json",
    level3bg_json: defaultFolder + "sortit/levelthree.json",
    level4bg_json: defaultFolder + "sortit/levelfour.json",
    level5bg_json: defaultFolder + "sortit/levelfive.json",
    level6bg_json: defaultFolder + "sortit/levelsix.json",
    
    comedyBubble_mp3:  defaultFolder + "sounds/sortit/comedyBubble.mp3",
    explosive_mp3:  defaultFolder + "sounds/sortit/explosive.mp3",
    failure_mp3:  defaultFolder + "sounds/sortit/failure.mp3"
    
    
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
    fox: defaultMiscFolder + "fox_stork_01.json"    
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

var SortIt_res = [];
for (var i in SortIt) {
    SortIt_res.push(SortIt[i]);
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