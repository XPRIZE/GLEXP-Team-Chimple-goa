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
    close_pop_png: "res/close_pop.png"
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
        if (configObj != null) {
            cc.log('configObj.icon:' + configObj.icon);
            cc.log('configObj.cIcon:' + configObj.cIcon);
            if(configObj.categories) {
                configObj.categories.forEach(function (eleObj) {
                    cc.log('eleObj.icon:' + eleObj.icon);
                    cc.log('eleObj.cIcon:' + eleObj.cIcon);

                    eleObj.items.forEach(function(itmObj) {
                        console.log('itmObj.json:' + itmObj.itmObj);
                        cc.log('itmObj.icon:' + itmObj.icon);
                        cc.log('itmObj.cIcon:' + itmObj.cIcon);

                    }, this);
                }, this);

            }
        }

    }, this);
});

