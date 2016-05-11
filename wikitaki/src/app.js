/// <reference path="../../cocos2d-typescript-definitions/cocos2d/cocos2d-lib.d.ts" />
var chimple = chimple || {};
chimple.LAYER_INIT = false;
var HelloWorldLayer = cc.Layer.extend({
    _contentPanel: null,
    _pageConfigPanel: null,
    _objectConfigPanel: null,
    _contentPanelWidth: null,
    _configPanelWidth: null,
    _configPanelHeight: null,
    ctor: function () {
        this._super();
        this._name = "StoryLayer";
        this._tabHeight = 256;
        this._controlPanel = null;
        this._contentPanelWidth = cc.director.getWinSize().height; //assuming landscape
        this._configPanelWidth = (cc.director.getWinSize().width - this._contentPanelWidth) / 2;
        this._configPanelHeight = cc.director.getWinSize().height;
        return true;
    },

    init: function () {
        //create new content panel for showing all stories
        //add button panel
        this._buttonPanel = new chimple.ButtonPanel(new cc.p(0, 0), this.getContentSize(), 6, 6, chimple.storyConfigurationObject.editStory, this.createNewPage, this);
        this.addChild(this._buttonPanel);

        var displayPages = [];
        if (chimple.story != null && chimple.story.items != null && chimple.story.items.length > 0) {
            displayPages = chimple.story['items'];
        }

        this._panel = new chimple.ScrollableButtonPanel(cc.p(0, 0), cc.size(cc.director.getWinSize().width, cc.director.getWinSize().height - this._tabHeight), 2, 2, displayPages, this.loadExistingPage, this);
        this.addChild(this._panel);
    },

    createNewPage: function () {
        //create new Scene
        //find last page index         
        chimple.pageIndex = chimple.story.items.length; //new story
        chimple.isNewPage = true;
        cc.director.runScene(new EditStoryScene());
    },

    loadExistingPage: function (sender) {
        chimple.pageIndex = sender._selectedIndex; //index of selected button
        chimple.isNewPage = false;
        cc.director.runScene(new EditStoryScene());
    }
});

var HelloWorldScene = cc.Scene.extend({
    ctor: function () {
        this._super();
        if (chimple.LAYER_INIT === false) {
            chimple.LAYER_INIT = true;
            cc.log('initing layer...should only be once');
            //read storyId from document, if not null then load json and store in localStorage
            var storyId = this.retrieveStoryId();
            if (storyId) {
                this.loadStory(storyId);
            } else {
                this.createNewStory();
                this._sceneLayer = new HelloWorldLayer();
                this.addChild(this._sceneLayer);
                this._sceneLayer.init();
            }
            chimple.MODIFIED_BIT = 1;
        }
    },

    retrieveStoryId: function () {
        var storyIdToFetch = null;
        var query_string = {};
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            // If first entry with this name
            if (typeof query_string[pair[0]] === "undefined") {
                query_string[pair[0]] = decodeURIComponent(pair[1]);
                // If second entry with this name
            } else if (typeof query_string[pair[0]] === "string") {
                var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
                query_string[pair[0]] = arr;
                // If third or later entry with this name
            } else {
                query_string[pair[0]].push(decodeURIComponent(pair[1]));
            }
        }
        if (query_string != null && query_string != undefined) {
            storyIdToFetch = query_string['fesid'];
            cc.log('storyid from queryString:' + storyIdToFetch);
        } else {
            cc.log('storyid from queryString: not recived');
            storyIdToFetch = window.recipeId;
            cc.log('storyid from window.recipeId: ' + storyIdToFetch);
        }

        return storyIdToFetch;
    },

    createNewStory: function () {
        if (chimple && chimple.MODIFIED_BIT != 1) {
            chimple.story = {};
            chimple.story.items = [];
        }
    },

    loadStory: function (storyIdToFetch) {
        var context = this;
        if (chimple && chimple.MODIFIED_BIT != 1) {
            if (storyIdToFetch != null) {
                var url = '/wp-content/uploads/' + storyIdToFetch + '.json';
                cc.log('fetching json for storyId' + storyIdToFetch + ' url:' + url);
                cc.loader.loadJson(url, function (error, data) {
                    if (data != null && data.items != null && data.items.length > 0) {
                        chimple.story = data;
                        context._sceneLayer = new HelloWorldLayer();
                        context.addChild(context._sceneLayer);
                        context._sceneLayer.init();
                    } else {
                        this.createNewStory();
                        context._sceneLayer = new HelloWorldLayer();
                        context.addChild(context._sceneLayer);
                        context._sceneLayer.init();
                    }                    
                });
            }
        } else {
            context._sceneLayer = new HelloWorldLayer();
            context.addChild(context._sceneLayer);
            context._sceneLayer.init();

        }
    }
});