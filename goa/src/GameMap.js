/// <reference path="cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />
var xc = xc || {};

xc.GameMap = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var map = new xc.ScrollableButtonPanel(cc.p(0, 0), cc.director.getWinSize(), 4, 4, cc.loader.cache[xc.GameMap.res.config_json], this.loadGame, this);
        this.addChild(map);
    },
    loadGame: function(sender) {
        if(sender._configuration.name == 'pop') {
            xc.GameScene.load(xc.PopLayer);
        }
        else if(sender._configuration.name == 'jazz') {
            xc.GameScene.load(xc.GameLayer);
        } else if(sender._configuration.name == 'story-teller') {
            xc.CreateStoryScene.load(xc.CreateStoryLayer);
        }
        else if(sender._configuration.name == 'train') {
            xc.GameScene.load(xc.TrainLayer);
        }else if(sender._configuration.name == 'bubbleShooter') {
            xc.GameScene.load(xc.BubbleGame_HomeScreenMenu);
        }else if(sender._configuration.name == 'alphamole') {
            xc.GameScene.load(xc.AlphamoleGameLevelScene);
        }else if(sender._configuration.name == 'jump_on_words') {
            xc.GameScene.load(xc.menuLayer);
        }else if(sender._configuration.name == 'sortit') {
            xc.GameScene.load(xc.sortitlevel1Layer);
        }
        else if(sender._configuration.name == 'decomon') {
            xc.GameScene.load(xc.DecomonLayer);
        }else if(sender._configuration.name == 'pinata'){
             xc.GameScene.load(xc.Pinata);
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