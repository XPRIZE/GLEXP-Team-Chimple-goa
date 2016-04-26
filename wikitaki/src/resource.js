var chimple = chimple || {};

var defaultFolder = "";
var defaultMiscFolder = "res/";

if (!cc.sys.isNative) {
    defaultFolder = "res/";
}


var res = {
    HelloWorld_png : "res/HelloWorld.png",
    mouth_access_onclick_png: "res/mouth_access_onclick.png",
    mouth_access_png: "res/mouth_access.png",
    mouth_2_onclick_png: "res/mouth_2_onclick.png",
    mouth_2_png: "res/mouth_2.png",
    head_shape_onclick_png: "res/head_shape_onclick.png",
    head_shape_png: "res/head_shape.png",
    hand_access_onclick_png: "res/hand_access_onclick.png",
    hand_access_png: "res/hand_access.png",
    hair_color_onclick_png: "res/hair_color_onclick.png",
    hair_color_png: "res/hair_color.png",
    glasses_onclick_png: "res/glasses_onclick.png",
    glasses_png: "res/glasses.png",
    eyes_onclick_png: "res/eyes_onclick.png",
    eyes_png: "res/eyes.png",
    Hair_style_onclick_png: "res/Hair_style_onclick.png",
    Hair_style_png: "res/Hair_style.png",
    skintone_onclick_png: "res/skintone_onclick.png",
    skintone_png: "res/skintone.png",
    shoe_onclick_png: "res/shoe_onclick.png",
    shoe_png: "res/shoe.png",
    shirt_onclick_png: "res/shirt_onclick.png",
    shirt_png: "res/shirt.png",
    pant_onclick_png: "res/pant_onclick.png",
    pant_png: "res/pant.png",
    neck_acccess_onclick_png: "res/neck_acccess_onclick.png",
    neck_acccess_png: "res/neck_acccess.png",
    cowboy_body_png: "res/characters/human/cowboy_body.png",
    cowboy_eye_png: "res/characters/human/cowboy_eye.png",
    cowboy_face_png: "res/characters/human/cowboy_face.png",
    cowboy_hat_png: "res/characters/human/cowboy_hat.png",
    cowboy_left_hand_png: "res/characters/human/cowboy_left_hand.png",
    cowboy_left_leg_png: "res/characters/human/cowboy_left_leg.png",
    cowboy_mouth_png: "res/characters/human/cowboy_mouth.png",
    cowboy_right_hand_png: "res/characters/human/cowboy_right_hand.png",
    cowboy_right_leg_png: "res/characters/human/cowboy_right_leg.png",
    cowboy_thumbnail_png: "res/characters/human/cowboy_thumbnail.png",    
    human_json: "res/characters/human/human.json",
    face_png: "res/characters/human/face.png",
    hair_png: "res/characters/human/hair.png",
    left_eye_png: "res/characters/human/left_eye.png",
    left_hand_png: "res/characters/human/left_hand.png",
    mouth_png: "res/characters/human/mouth.png",
    right_eye_png: "res/characters/human/right_eye.png",
    right_hand_png: "res/characters/human/right_hand.png",
    right_leg_png: "res/characters/human/right_leg.png",
    Left_leg_png: "res/characters/human/Left_leg.png",
    body_png: "res/characters/human/body.png",
    cricketer_thumbnail_png: "res/characters/human/cricketer_thumbnail.png",
    Animation_json: "res/characters/crow/Animation.json",
    Beak_Lower_png: "res/characters/crow/Beak_Lower.png",
    Beak_Upper_png: "res/characters/crow/Beak_Upper.png",
    Body_png: "res/characters/crow/Body.png",
    Eye_Inner_png: "res/characters/crow/Eye_Inner.png",
    Eye_Outer_png: "res/characters/crow/Eye_Outer.png",
    Leg_back_png: "res/characters/crow/Leg_back.png",
    Leg_front_png: "res/characters/crow/Leg_front.png",
    Tail_png: "res/characters/crow/Tail.png",
    Wings_png: "res/characters/crow/Wings.png",
    crow_thumbnail_png: "res/characters/crow/crow_thumbnail.png",
    donkey_Skeleton_json: "res/characters/donkey/Skeleton.json",
    body_donkey_png: "res/characters/donkey/body donkey.png",
    donkey_thumbnail_png: "res/characters/donkey/donkey_thumbnail.png",
    head_donkey_png: "res/characters/donkey/head donkey.png",
    leg_down_2_donkey_png: "res/characters/donkey/leg down 2 donkey.png",
    leg_down_donkey_png: "res/characters/donkey/leg down donkey.png",
    leg_up_2_donkey_png: "res/characters/donkey/leg up 2 donkey.png",
    leg_up_donkey_png: "res/characters/donkey/leg up donkey.png",
    tail_donkey_png: "res/characters/donkey/tail donkey.png",
    ele_02_png: "res/characters/elephant/ele-02.png",
    ele_03_png: "res/characters/elephant/ele-03.png",
    ele_04_png: "res/characters/elephant/ele-04.png",
    ele_05_png: "res/characters/elephant/ele-05.png",
    ele_06_png: "res/characters/elephant/ele-06.png",
    ele_07_png: "res/characters/elephant/ele-07.png",
    ele_08_png: "res/characters/elephant/ele-08.png",
    ele_09_png: "res/characters/elephant/ele-09.png",
    ele_10_png: "res/characters/elephant/ele-10.png",
    elep_json: "res/characters/elephant/elep.json",
    elephant_thumbnail_png: "res/characters/elephant/elephant_thumbnail.png",
    Skeleton_json: "res/characters/hare/Skeleton.json",
    hare_body_png: "res/characters/hare/hare_body.png",
    hare_eyes_png: "res/characters/hare/hare_eyes.png",
    hare_head_png: "res/characters/hare/hare_head.png",
    hare_leftear_png: "res/characters/hare/hare_leftear.png",
    hare_lefthand_png: "res/characters/hare/hare_lefthand.png",
    hare_rightear_png: "res/characters/hare/hare_rightear.png",
    hare_righthand_png: "res/characters/hare/hare_righthand.png",
    hare_rightleg_png: "res/characters/hare/hare_rightleg.png",
    hare_thumbnail_png: "res/characters/hare/hare_thumbnail.png",
    close_pop_png: "res/close_pop.png",
    boy_json: "res/characters/Animation.json"
};


var misc = {
    Config_json: defaultMiscFolder + "misc/storyConfig.json"
}


var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}



cc.loader.loadJson(misc.Config_json, function (error, data) {
    chimple.storyConfigurationObject = data;

    Object.getOwnPropertyNames(chimple.storyConfigurationObject).forEach(function (element) {
        cc.log("processing:" + element);
        var configObj = chimple.storyConfigurationObject[element];
        // if (configObj != null) {
        //     cc.log('configObj.icon:' + configObj.icon);
        //     cc.log('configObj.cIcon:' + configObj.cIcon);
        //     if(configObj.categories) {
        //         configObj.categories.forEach(function (eleObj) {
        //             cc.log('eleObj.icon:' + eleObj.icon);
        //             cc.log('eleObj.cIcon:' + eleObj.cIcon);

        //             eleObj.items.forEach(function(itmObj) {
        //                 console.log('itmObj.json:' + itmObj.itmObj);
        //                 cc.log('itmObj.icon:' + itmObj.icon);
        //                 cc.log('itmObj.cIcon:' + itmObj.cIcon);

        //             }, this);
        //         }, this);

        //     }
        // }
    }, this);
});

