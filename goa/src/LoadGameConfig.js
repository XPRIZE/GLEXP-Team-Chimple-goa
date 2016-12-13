/// <reference path="cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />
cc.loader.loadJson("res/config/game_map.json", function(error, data) {
    data.forEach(function(e) {
        cc.log(e.name);
        cc.log('11111' + e.name);
        cc.log('2222' + JSON.stringify(e));
        cc.sys.localStorage.setItem(e.name, JSON.stringify(e));
    });

    var gameNames = data.map(function(a) {return a.name;}).join(",");
    cc.sys.localStorage.setItem("gameNames", gameNames);
});
