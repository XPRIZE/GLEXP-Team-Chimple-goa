/// <reference path="src/cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />

var goa = goa || {};

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