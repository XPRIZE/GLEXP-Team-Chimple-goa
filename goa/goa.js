/// <reference path="src/cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />

var goa = goa || {};

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
    showScore: function() {

    },
    isGamePaused : function(){
        
    }
})

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
        "error": "mistake"
}