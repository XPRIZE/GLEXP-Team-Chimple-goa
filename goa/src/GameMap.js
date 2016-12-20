/// <reference path="cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />
var xc = xc || {};

xc.GameMap = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var JSGames = cc.loader.cache[xc.GameMap.res.config_json].filter(function(e) {return e.isJSGame});
        var map = new xc.ScrollableButtonPanel(cc.p(0, 0), cc.director.getWinSize(), 4, 4, JSGames, this.loadGame, this);
        this.addChild(map);
    },
    loadGame: function(sender) {
        cc.sys.localStorage.setItem("currentGame", sender._configuration.name)
        if(!sender._configuration.multiPlayer && sender._configuration.isJSGame && sender._configuration.pureJS) {
            // var gameFunc = xc[sender._configuration.pureJS];
            xc.GameScene.loadMenu();
        } else if(sender._configuration.multiPlayer && sender._configuration.isJSGame && sender._configuration.pureJS) {
            var gameFunc = xc[sender._configuration.pureJS];
            xc.GameScene.loadMultiPlayerGame(gameFunc,sender._configuration.name);            
        }
        // else if(sender._configuration.name == 'jazz') {
        //     xc.GameScene.load(xc.GameLayer);
        // } 
        else if(sender._configuration.name == 'story-telling') {
            xc.CreateStoryScene.load(xc.CreateStoryLayer);
        }
        else if(sender._configuration.name == 'story-play') {
            xc.CatalogueScene.load(xc.CatalogueLayer);
        }
        
        // else if(sender._configuration.name == 'train') {
        //     xc.GameScene.load(xc.TrainLayer);
        // }else if(sender._configuration.name == 'bubbleShooter') {
        //     xc.GameScene.load(xc.BubbleGame_HomeScreenMenu);
        // }else if(sender._configuration.name == 'alphamole') {
        //     xc.GameScene.load(xc.AlphamoleGameLevelScene);
        // }else if(sender._configuration.name == 'jump_on_words') {
        //     xc.GameScene.load(xc.playLayer);
        // }else if(sender._configuration.name == 'sortit') {
        //     // xc.GameScene.load(xc.sortitlevel1Layer);
        //     xc.GameScene.load(xc.ConnectTheDotsMenu);
        // }
        // else if(sender._configuration.name == 'decomon') {
        //     xc.GameScene.load(xc.DecomonLayer);
        // } else if(sender._configuration.name == 'pinata'){
        //      xc.GameScene.load(xc.Pinata);
        // }
        else if(sender._configuration.name == 'choose_character'){
             xc.CharacterConfigScene.load(xc.CharacterConfigLayer);
        } 
        else if(sender._configuration.name == 'show_bluetoothPeers') {
            cc.sys.localStorage.setItem("discoveredBluetoothDevices", "4_5_1_3_1_2_0_2_0_6_3_0_1_1-AA:BB:CC:XX")
            xc.RenderBluetoothPeersScene.load(xc.RenderBluetoothPeersLayer);
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