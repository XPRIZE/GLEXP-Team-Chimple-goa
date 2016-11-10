/// <reference path="../cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />
var xc = xc || {};

xc.NarrateContentPanel = cc.LayerColor.extend({
    _constructedScene: null,
    _storyInformation:null,
    ctor: function (storyInformation, width, height, position) {
        this._super(width, height, position);
        this.setPosition(position);
        this._storyInformation = storyInformation;
        this.loadScene();
    },

    loadScene: function () {
        var that = this;
        var contentUrl = this._storyInformation["contentJson"];
        this._constructedScene = ccs.load(xc.path + contentUrl, xc.path + "wikitaki/");
        if (this._constructedScene.node) {
            this.addChild(this._constructedScene.node);
        }        
    }
});
