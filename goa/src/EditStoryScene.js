/// <reference path="cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />

var xc = xc || {};

xc.LAYER_EDIT_STORY = false;
xc.STORY_KEY = "/res/xcStory.json";


var EditStoryLayer = cc.Layer.extend({
    _contentPanel: null,
    _pageConfigPanel: null,
    _objectConfigPanel: null,
    _contentPanelWidth: null,
    _configPanelWidth: null,
    _configPanelHeight: null,    
    ctor: function () {
        this._super();
        this._name = "StoryLayer";
        this._controlPanel = null;
        this._contentPanelWidth = cc.director.getWinSize().height; //assuming landscape
        this._configPanelWidth = (cc.director.getWinSize().width - this._contentPanelWidth) / 2;
        this._configPanelHeight = cc.director.getWinSize().height;
        cc.log('start editstorylayer');
        return true;
    },

    init: function () {
        if (xc.storyConfigurationObject) {
        cc.log('init editstorylayer');
            
            //backgrounds, characters and pops, texts
            var mainConfigurationItems = Object.getOwnPropertyNames(xc.storyConfigurationObject.addObjects);
            //Construct UI
            this._contentPanel = new xc.ContentPanel(this._contentPanelWidth, this._contentPanelWidth, cc.p(this._configPanelWidth, 0));
            this.addChild(this._contentPanel);

            this._objectConfigPanel = new xc.ObjectConfigPanel(this._configPanelWidth, this._configPanelHeight, cc.p(this._configPanelWidth + this._contentPanelWidth, 0), xc.storyConfigurationObject, this._contentPanel);
            this.addChild(this._objectConfigPanel);
            this._contentPanel._objectConfigPanel = this._objectConfigPanel;

            this._pageConfigPanel = new xc.PageConfigPanel(this._configPanelWidth, this._configPanelHeight, cc.p(0, 0), xc.storyConfigurationObject, this._contentPanel);
            this.addChild(this._pageConfigPanel);
        }
    }

});

var EditStoryScene = cc.Scene.extend({
    _isNewPage: null,
    _pageIndex: null,
    ctor: function () {
        this._super();
        //creating custom characters cache
        if (xc.LAYER_EDIT_STORY === false) {
            xc.LAYER_EDIT_STORY = true;
            cc.log('initing layer...should only be once');
            if (xc.isNewPage) {
                this.createStoryPage();
            } else {
                this.displayExistingPage();
            }
        }
    },

    createStoryPage: function () {
        var newPage = {};
        newPage.cIcon = "icons/page.png";
        newPage.icon = "icons/page.png";
        newPage.scene = {};
        
        xc.story.items.push(newPage);
        

        this._sceneLayer = new EditStoryLayer();
        this.addChild(this._sceneLayer);
        this._sceneLayer.init();
    },

    displayExistingPage: function () {
        //read JSON and find pageIndex
        // var pageJSON = this._pages["items"][this._pageIndex];
        // localStorage.setItem(xc.STORY_KEY, JSON.stringify(pageJSON.scene));
        this._sceneLayer = new EditStoryLayer();
        this.addChild(this._sceneLayer);
        this._sceneLayer.init();
    }
});