
'use strict';
var HashMap = require('hashmap');
var _ = require('lodash')._;

var TextSprite = function (game, x, y, key, textOptions) {        
    Phaser.Sprite.call(this, game, x, y, key);
    game.add.existing(this);
    this.game = game;
    this.textOptions = textOptions;
    this.uniquename = textOptions.uniquename;
    this.configureTextSprite();
};

TextSprite.prototype = Object.create(Phaser.Sprite.prototype);
TextSprite.prototype.constructor = TextSprite;


TextSprite.prototype.configureTextSprite = function () {
    var self = this;        
    self.anchor.set(0.5);
    self.isHidden = false;
    self.alpha = 1;
    self.inputEnabled = true;    
    
    var showText = self.textOptions.displayText;              
    if(showText != null && showText != undefined) {
        var style = { font: "20px Arial", fill: Phaser.Color.RGBtoString(self.textOptions.attrs.textColor.red, self.textOptions.attrs.textColor.green, self.textOptions.attrs.textColor.blue) , wordWrap: true, wordWrapWidth: self.width, align: "center"};    
        var text = self.game.make.text(0, 0, showText, style);
        text.setText(showText);  
        text.anchor.set(0.5);
        self.removeChildren();
        self.addChild(text);                  
    }
    self.tint = Phaser.Color.getColor(self.textOptions.attrs.backGroundColor.red, self.textOptions.attrs.backGroundColor.green, self.textOptions.attrs.backGroundColor.blue);
};

module.exports = TextSprite;