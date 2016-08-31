/// <reference path="cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />
var xc = xc || {};

xc.GameMap = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var map = new chimple.ScrollableButtonPanel(cc.p(0, 0), cc.director.getWinSize(), 4, 4, cc.loader.cache[xc.GameMap.res.config_json], this.loadGame, this);
        this.addChild(map);
    },
    loadGame: function(sender) {
        if(sender._configuration.name == 'jazz') {
            xc.GameScene.load(xc.GameLayer);
        }
        else if(sender._configuration.name == 'train') {
            xc.GameScene.load(xc.TrainLayer);
        }
    }
});

xc.GameMap.res = {
    config_json : "res/config/game_map.json",
    map_plist: xc.path + "gamemap/gamemap.plist",
    map_png: xc.path + "gamemap/gamemap.png",
    thumbnails_plist: "res/thumbnails.plist",
    thumbnails_png: "res/thumbnails.png"    
};