/// <reference path="../../../cocos2d-typescript-definitions/cocos2d/cocos2d-lib.d.ts" />
var LAYER_INIT = false;

var chimple = chimple || {};
var HelloWorldLayer = cc.Layer.extend({
    _contentPanel: null,
    _pageConfigPanel: null,
    _objectConfigPanel: null,
    _contentPanelWidth: null,
    _configPanelWidth: null,
    _configPanelHeight: null,
    ctor: function (pageKey) {
        this._super();
        this._pageKey = pageKey;
        this._name = "StoryLayer";
        this._propsContainer = [];
        this._charactersContainer = [];
        this._controlPanel = null;
        this._contentPanelWidth = cc.director.getWinSize().height; //assuming landscape
        this._configPanelWidth = (cc.director.getWinSize().width - this._contentPanelWidth) / 2;
        this._configPanelHeight = cc.director.getWinSize().height;
        return true;
    },

    init: function () {
        if (chimple.storyConfigurationObject) {
            //backgrounds, characters and pops, texts
            var mainConfigurationItems = Object.getOwnPropertyNames(chimple.storyConfigurationObject.addObjects);
            //Construct UI
            this._contentPanel = new chimple.ContentPanel(this._pageKey, this._contentPanelWidth, this._contentPanelWidth, cc.p(this._configPanelWidth, 0));
            this.addChild(this._contentPanel);
            
            this._objectConfigPanel = new chimple.ObjectConfigPanel(this._configPanelWidth, this._configPanelHeight, cc.p(0, 0), chimple.storyConfigurationObject);
            this.addChild(this._objectConfigPanel);
            this._contentPanel._objectConfigPanel = this._objectConfigPanel;
            
            this._pageConfigPanel = new chimple.PageConfigPanel(this._configPanelWidth, this._configPanelHeight, cc.p(this._configPanelWidth + this._contentPanelWidth, 0), chimple.storyConfigurationObject, this._contentPanel);
            this.addChild(this._pageConfigPanel);
        }
    }

});

var HelloWorldScene = cc.Scene.extend({
    ctor: function () {
        this._super();
        if (LAYER_INIT === false) {
            LAYER_INIT = true;
            cc.log('initing layer...should only be once');
            this._sceneLayer = new HelloWorldLayer("res/chimple.page1.scene.json");
            this.addChild(this._sceneLayer);
            this._sceneLayer.init();
        }
    },
});