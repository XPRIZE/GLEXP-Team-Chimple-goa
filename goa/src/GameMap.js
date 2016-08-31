/// <reference path="cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />
var chimple = chimple || {};

chimple.GameMap = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var map = new chimple.ScrollableButtonPanel(cc.p(0, 0), cc.director.getWinSize(), 4, 4, cc.loader.cache[chimple.GameMap.res.config_json], this.loadGame, this);
        this.addChild(map);
    },
    loadGame: function(sender) {
        if(sender._configuration.name == 'jazz') {
            chimple.GameScene.load(chimple.GameLayer);
        }
    }
});

chimple.GameMap.res = {
    config_json : "res/config/game_map.json",
    map_plist: chimple.path + "gamemap/gamemap.plist",
    map_png: chimple.path + "gamemap/gamemap.png",
    thumbnails_plist: "res/thumbnails.plist",
    thumbnails_png: "res/thumbnails.png"    
};