/**
 * A brief explanation for "project.json":
 * Here is the content of project.json file, this is the global configuration for your game, you can modify it to customize some behavior.
 * The detail of each field is under it.
 {
    "project_type": "javascript",
    // "project_type" indicate the program language of your project, you can ignore this field

    "debugMode"     : 1,
    // "debugMode" possible values :
    //      0 - No message will be printed.
    //      1 - cc.error, cc.assert, cc.warn, cc.log will print in console.
    //      2 - cc.error, cc.assert, cc.warn will print in console.
    //      3 - cc.error, cc.assert will print in console.
    //      4 - cc.error, cc.assert, cc.warn, cc.log will print on canvas, available only on web.
    //      5 - cc.error, cc.assert, cc.warn will print on canvas, available only on web.
    //      6 - cc.error, cc.assert will print on canvas, available only on web.

    "showFPS"       : true,
    // Left bottom corner fps information will show when "showFPS" equals true, otherwise it will be hide.

    "frameRate"     : 60,
    // "frameRate" set the wanted frame rate for your game, but the real fps depends on your game implementation and the running environment.

    "noCache"       : false,
    // "noCache" set whether your resources will be loaded with a timestamp suffix in the url.
    // In this way, your resources will be force updated even if the browser holds a cache of it.
    // It's very useful for mobile browser debuging.

    "id"            : "gameCanvas",
    // "gameCanvas" sets the id of your canvas element on the web page, it's useful only on web.

    "renderMode"    : 0,
    // "renderMode" sets the renderer type, only useful on web :
    //      0 - Automatically chosen by engine
    //      1 - Forced to use canvas renderer
    //      2 - Forced to use WebGL renderer, but this will be ignored on mobile browsers

    "engineDir"     : "frameworks/cocos2d-html5/",
    // In debug mode, if you use the whole engine to develop your game, you should specify its relative path with "engineDir",
    // but if you are using a single engine file, you can ignore it.

    "modules"       : ["cocos2d"],
    // "modules" defines which modules you will need in your game, it's useful only on web,
    // using this can greatly reduce your game's resource size, and the cocos console tool can package your game with only the modules you set.
    // For details about modules definitions, you can refer to "../../frameworks/cocos2d-html5/modulesConfig.json".

    "jsList"        : [
    ]
    // "jsList" sets the list of js files in your game.
 }
 *
 */

var chimple = chimple || {};
var xc = xc || {};
var goa = goa || {};
xc.path = "res/HD/";
xc.RESOURCE_DESIGN_HEIGHT = 1800;
xc.DEVICE_WIDTH = 1260;
xc.DEVICE_HEIGHT = 1800;
xc.customSprites = [];
xc.HAND_GEAR_LEFT = "hand_gear_left";
xc.image = {};
xc.isHTML5 = function () {
    return typeof document !== "undefined";
};


cc.game.onStart = function(){
    if(!cc.sys.isNative && document.getElementById("cocosLoading")) //If referenced loading.js, please remove it
        document.body.removeChild(document.getElementById("cocosLoading"));

    // Pass true to enable retina display, on Android disabled by default to improve performance
    cc.view.enableRetina(cc.sys.os === cc.sys.OS_IOS ? true : false);

    // Adjust viewport meta
    cc.view.adjustViewPort(true);

    // Uncomment the following line to set a fixed orientation for your game
     cc.view.setOrientation(cc.ORIENTATION_LANDSCAPE);

    // Setup the resolution policy and design resolution size
    // cc.view.setDesignResolutionSize(640, 450, cc.ResolutionPolicy.SHOW_ALL);
    cc.view.setDesignResolutionSize(2560, 1800, cc.ResolutionPolicy.SHOW_ALL);

    // The game will be resized when browser size change
    cc.view.resizeWithBrowserSize(true);

    cc.director.setContentScaleFactor(0.25);

    xc.designScaleFactor = xc.RESOURCE_DESIGN_HEIGHT / xc.DEVICE_HEIGHT;
    
    var t_resources = [];
    for (var i in xc.GameMap.res) {
        t_resources.push(xc.GameMap.res[i]);
    }
    cc.LoaderScene.preload(t_resources, function () {
        cc.spriteFrameCache.addSpriteFrames(xc.GameMap.res.thumbnails_plist);
        cc.spriteFrameCache.addSpriteFrames(xc.GameMap.res.map_plist);
        cc.director.runScene(new xc.GameMap());
    }, this);

    goa.MenuContext = cc.Node.extend({
        _layer: null,
        _gameName: null,
        _maxPoints: 16,
        _currentLevel: 1,
        _points: 0,
        ctor: function(layer, gameName) {
            this._super();
            this._layer = layer;
            this._gameName = gameName;
        },
        setMaxPoints: function(maxPoints) {
            this._maxPoints = maxPoints;
        },
        getMaxPoints: function() {
            return this._maxPoints;
        },
        setCurrentLevel: function(currentLevel) {
            this._currentLevel = currentLevel;
        },
        getCurrentLevel: function() {
            return this._currentLevel;
        },
        addPoints: function(points) {
            this._points += points;
        },
        getPoints: function() {
            return this._points;
        },
        showScore: function() {

        }
    })
    
    goa.MenuContext.launchGameFromJS = function(gameName) {
            xc.GameScene.loadGameFromStorage();
    }

    goa.MenuContext.create = function(layer, gameName) {
        return new goa.MenuContext(layer, gameName);
    }

    goa.TextGenerator = function() {
        console.log("created TextGenerator");
    }

    goa.TextGenerator.getInstance = function() {
        return goa.TextGenerator.instance;
    }

    goa.TextGenerator.prototype.generateAWord = function() {
        return "generateAWord";
    }

    goa.TextGenerator.prototype.generateMatrix = function(str, numRows, numCols) {
        return [['A', 'B'],['C', 'D'],['E', 'F']];
    }

    goa.TextGenerator.prototype.getNumGraphemesInString = function() {
        return 1;
    }

    goa.TextGenerator.prototype.generateASentence = function() {
        return goa.TextGenerator.sentences[this.getRandomInt(0, 9)];
    }

    goa.TextGenerator.prototype.getRandomInt = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
    }

    goa.TextGenerator.prototype.getAllChars = function() {
        return ["ಅ", "ಆ", "ಇ", "ಈ", "ಉ", "ಊ", "ಋ", "ಎ", "ಏ", "ಐ", "ಒ", "ಓ", "ಔ", "ಕ", "ಖ", "ಗ", "ಘ", "ಙ", "ಚ", "ಛ", "ಜ", "ಝ", "ಞ", "ಟ", "ಠ", "ಡ", "ಢ", "ಣ", "ತ", "ಥ", "ದ", "ಧ", "ನ", "ಪ", "ಫ", "ಬ", "ಭ", "ಮ", "ಯ", "ರ", "ಲ", "ವ", "ಶ", "ಷ", "ಸ", "ಹ", "ಳ"];
    }

    goa.TextGenerator.prototype.getDataMap = function(dataMap, maxNum) {
        var returnObj = {};
        var i = 0;
        for (var key in dataMap) {
            returnObj[key] = dataMap[key];
            if(++i >= maxNum) {
                break;
            }
        }
        return returnObj;
    }

    goa.TextGenerator.prototype.getHomonyms = function(maxNum) {
        return this.getDataMap(goa.TextGenerator.homonyms, maxNum);
    }

    goa.TextGenerator.prototype.getSynonyms = function(maxNum) {
        return this.getDataMap(goa.TextGenerator.synonyms, maxNum);
    }

    goa.TextGenerator.prototype.getAntonyms = function(maxNum) {
        return this.getDataMap(goa.TextGenerator.antonyms, maxNum);
    }

    goa.TextGenerator.prototype.getLang = function() {
        return "eng";
    }
    
    goa.TextGenerator.instance = new goa.TextGenerator();

    goa.TextGenerator.sentences = [
        "My precious",
        "I'll be back",
        "Show me the money",
        "Go ahead make my day",
        "A martini shaken not stirred",
        "Open the pod bay doors HAL",
        "May the force be with you",
        "Where we're going we don't need roads",
        "I'm not bad. I'm just drawn that way"
    ];

    goa.TextGenerator.homonyms = {
            "be": "bee",
            "bean" :"bean",
            "buy" :"by",
            "hear" :"here",
            "hour" :"our",
            "know" :"no",
            "mail" :"male",
            "meat" :"meet",
            "plain" :"plane",
            "right" :"write",
            "road" :"rode",
            "sea" :"see",
            "sail" :"sale",
            "son" :"sun",
            "tail" :"tale"
    }

    goa.TextGenerator.antonyms = {
            "big": "small",
            "loud": "quiet",
            "dark": "light",
            "fast": "slow",
            "happy": "sad",
            "long": "short",
            "hot": "cold",
            "wet": "dry",
            "over": "under",
            "sink": "float",
            "far": "near",
            "empty": "full",
            "messy": "neat",
            "never": "always",
            "old": "young"
    }

    goa.TextGenerator.synonyms = {
            "end": "finish",
            "cry": "sob",
            "cold": "icy",
            "begin": "start",
            "save": "keep",
            "hope": "wish",
            "choose": "pick",
            "paste": "glue",
            "hurry": "rush",
            "sad": "unhappy",
            "friend": "pal",
            "enjoy": "like",
            "error": "mistake",
            "angry" : "mad",
            "shop" : "store"
    }  

};
cc.game.run();

