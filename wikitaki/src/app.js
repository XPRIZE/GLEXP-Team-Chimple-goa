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

            this._objectConfigPanel = new chimple.ObjectConfigPanel(this._configPanelWidth, this._configPanelHeight, cc.p(0, 0), chimple.storyConfigurationObject, this._contentPanel);
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
            //read storyId from document, if not null then load json and store in localStorage
            if (!cc.sys.isNative) {
                //read from location search
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
                if(query_string != null && query_string != undefined)
                {
                    storyIdToFetch = query_string['fesid'];
                    cc.log('storyid from queryString:' + storyIdToFetch);
                }
                
                if(storyIdToFetch == null || storyIdToFetch == undefined) {
                    cc.log('storyid from queryString: not recived');
                    storyIdToFetch = window.recipeId;
                    cc.log('storyid from window.recipeId: ' + storyIdToFetch);
                }
                
                var context = this;
                if (storyIdToFetch != null && storyIdToFetch != undefined && storyIdToFetch.length > 0) {
                    var url = '/wp-content/uploads/' + storyIdToFetch + '.json';
                    cc.log('fetching json for storyId' + storyIdToFetch + ' url:' + url);
                    cc.loader.loadJson(url, function (error, data) {
                        localStorage.setItem("/wp-content/themes/SocialChef/images/res/chimpleStory.json", JSON.stringify(data));
                        context._sceneLayer = new HelloWorldLayer("/wp-content/themes/SocialChef/images/res/chimpleStory.json");
                        context.addChild(context._sceneLayer);
                        context._sceneLayer.init();
                    });
                } else {
                    this._sceneLayer = new HelloWorldLayer("/wp-content/themes/SocialChef/images/res/chimpleStory.json");
                    this.addChild(this._sceneLayer);
                    this._sceneLayer.init();
                }
            } else {
                this._sceneLayer = new HelloWorldLayer("/wp-content/themes/SocialChef/images/res/chimpleStory.json");
                this.addChild(this._sceneLayer);
                this._sceneLayer.init();
            }

        }
    },
});