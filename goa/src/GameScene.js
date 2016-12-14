/// <reference path="cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />
var xc = xc || {};
    
xc.GameScene = cc.Scene.extend({
    multiPlayerGame: false,
    layerClass: null,
    layer: null,
    menuContext: null,
    args: [],
    ctor: function(args) {
        this._super();
        this.layerClass = args.shift()
        this.args = args
        if(this.layer == null) {
            if(this.multiPlayerGame) {
                this.layer = new xc.ChoosePlayerModeLayer(this.layerClass, this.args);
                this.addChild(this.layer);    
            } else {
                this.layer = new this.layerClass(this.args);
                this.addChild(this.layer);
            }
        }
        if(typeof this.args[0] === 'string') {
            this.layer.gameName = this.args[0];
        }
        this.menuContext = goa.MenuContext.create(this.layer, this.layer.gameName);
        if(typeof this.args[1] === 'number') {
            this.menuContext.setCurrentLevel(this.args[1]);
        }
        this.addChild(this.menuContext);
    }
});

xc.GameScene.load = function(layer) {
    cc.log(arguments);
    var args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    var t_resources = [];
    for (var i in layer.res) {
        t_resources.push(layer.res[i]);
    }
    cc.LoaderScene.preload(t_resources, function () {
        var scene = new xc.GameScene(args);
        cc.director.runScene(scene);
    }, this);
}

xc.GameScene.loadMultiPlayerGame = function(layer, gameName) {
    if(cc.sys.isNative) {        
        cc.sys.localStorage.setItem("jsMultiPlayerGame", gameName);
        cc.sys.localStorage.removeItem("cplusMultiPlayerGame");
        var args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
        var t_resources = [];
        for (var i in layer.res) {
            t_resources.push(layer.res[i]);
        }
        cc.LoaderScene.preload(t_resources, function () {
            var scene = new xc.GameScene(args);
            scene.multiPlayerGame = true;
            cc.director.runScene(scene);
        }, this);
    } else {
      xc.GameScene.load(layer);
    }
}

xc.GameScene.loadGameFromStorage = function() {
    var gameName = cc.sys.localStorage.getItem("currentGame");
    var gameStr = cc.sys.localStorage.getItem(gameName);
    var level = cc.sys.localStorage.getItem(gameName + '.currentLevel');
    var gameConfig;
    if(gameStr) {
        gameConfig = JSON.parse(gameStr);
    } else {
        var gameMap = cc.loader.cache[xc.GameMap.res.config_json];
        for (var index = 0; index < gameMap.length; index++) {
            var element = gameMap[index];
            if(element.name == gameName) {
                gameConfig = element;
            }
        }
    }

    xc.GameScene.load(xc[gameConfig.pureJS], gameName, level); 
}

xc.GameScene.loadMenu = function() {
    var gameName = cc.sys.localStorage.getItem("currentGame");
    var gameStr = cc.sys.localStorage.getItem(gameName);
    var gameConfig;
    if(gameStr) {
        gameConfig = JSON.parse(gameStr);
    } else {
        var gameMap = cc.loader.cache[xc.GameMap.res.config_json];
        for (var index = 0; index < gameMap.length; index++) {
            var element = gameMap[index];
            if(element.name == gameName) {
                gameConfig = element;
            }
        }
    }
    
    var t_resources = [];
    if(gameConfig.backgroundJson) {
        t_resources.push(xc.path + gameConfig.backgroundJson);
    }
    if(gameConfig.foregroundJson) {
        t_resources.push(xc.path + gameConfig.foregroundJson);
    }
    if(gameConfig.frontgroundJson) {
        t_resources.push(xc.path + gameConfig.frontgroundJson);
    }
    if(gameConfig.maingroundJson) {
        cc.log('pushing maingroundJson: ' + xc.path + gameConfig.maingroundJson);
        t_resources.push(xc.path + gameConfig.maingroundJson);
    }
    if(gameConfig.menuPlist) {
        t_resources.push(xc.path + gameConfig.menuPlist);
    }
    if(gameConfig.menuPng) {
        t_resources.push(xc.path + gameConfig.menuPng);
    }
    for (var i in xc.LevelMenuLayer.res) {
        t_resources.push(xc.LevelMenuLayer.res[i]);
    }    
    cc.LoaderScene.preload(t_resources, function () {
        var scene = new xc.GameScene([xc.LevelMenuLayer, gameConfig]);
        cc.director.runScene(scene);
    }, this);    
}