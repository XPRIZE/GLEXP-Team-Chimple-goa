/// <reference path="../../../cocos2d-typescript-definitions/cocos2d/cocos2d-lib.d.ts" />
var chimple = chimple || {};
chimple.PLAY_STORY_INIT = false;
var PlayFullStoryLayer = cc.Layer.extend({
    _contentPanel: null,
    _pageConfigPanel: null,
    _objectConfigPanel: null,
    _contentPanelWidth: null,
    _configPanelWidth: null,
    _configPanelHeight: null,
    ctor: function () {
        this._super();
        this._name = "PlayFullStoryLayer";
        this._tabHeight = 256;
        this._controlPanel = null;
        this._contentPanelWidth = cc.director.getWinSize().height; //assuming landscape
        this._configPanelWidth = (cc.director.getWinSize().width - this._contentPanelWidth) / 2;
        this._configPanelHeight = cc.director.getWinSize().height;
        chimple.pageIndex = 0;
        return true;
    },

    init: function () {
        //create new content panel for showing all stories
        //add button panel

        this._contentPanel = new chimple.PlayContentPanel(this._contentPanelWidth, this._contentPanelWidth, cc.p(this._configPanelWidth, 0));
        this.addChild(this._contentPanel);
        
        this._leftButtonPanel = new chimple.ButtonPanel(new cc.p(0, 0), cc.size(this._configPanelWidth, this._contentPanelWidth), 1, 1, chimple.onlyStoryPlayConfigurationObject.editDefault, this.previousStory, this, false);
        this.addChild(this._leftButtonPanel);

        this._rightButtonPanel = new chimple.ButtonPanel(new cc.p(this._configPanelWidth + this._contentPanelWidth, 0), cc.size(this._configPanelWidth, this._contentPanelWidth), 1, 1, chimple.onlyStoryPlayConfigurationObject.nextDefault, this.nextStory, this, false);
        this.addChild(this._rightButtonPanel);

        // this._objectConfigPanel = new chimple.ObjectConfigPanel(this._configPanelWidth, this._configPanelHeight, cc.p(0, 0), chimple.onlyStoryPlayConfigurationObject, this._contentPanel);
        // this.addChild(this._objectConfigPanel);
        // this._contentPanel._objectConfigPanel = this._objectConfigPanel;

        // this._pageConfigPanel = new chimple.PageConfigPanel(this._configPanelWidth, this._configPanelHeight, cc.p(this._configPanelWidth + this._contentPanelWidth, 0), chimple.onlyStoryPlayConfigurationObject, this._contentPanel);
        // this.addChild(this._pageConfigPanel);

        this.showTitle();
    },

    previousStory: function () {
        cc.log('previousStory clicked!');
        chimple.pageIndex--;
    },

    nextStory: function () {
        cc.log('next clicked!');
        chimple.pageIndex++;
    },


    showTitle: function () {
        if (chimple.pageIndex == 0) {
            //show title and once User touch screen start playing
        } else  {
            this.playRecordedScene();
        }
    },

    playRecordedScene: function () {
        if (this._contentPanel._constructedScene.node) {
            this._contentPanel._constructedScene.node.runAction(this._contentPanel._constructedScene.action);
            this._playDuration = cc.sys.localStorage.getItem("duration");
            this._contentPanel._constructedScene.action.gotoFrameAndPlay(0, this._playDuration, 0, false);

            if (!cc.sys.isNative) {
                this._contentPanel._constructedScene.node._renderCmd._dirtyFlag = 1;
                this._contentPanel._constructedScene.node.children.forEach(function (element) {
                    if (element.getName().indexOf("Skeleton") != -1) {
                        element._renderCmd._dirtyFlag = 1;
                    }
                }, this);
            }
        }
    }
});

var PlayFullStoryScene = cc.Scene.extend({
    ctor: function () {
        this._super();
        if (chimple.PLAY_STORY_INIT === false) {
            chimple.PLAY_STORY_INIT = true;
            cc.log('initing layer...should only be once');
            //read storyId from document, if not null then load json and store in localStorage
            var storyId = this.retrieveStoryId();
            if (storyId) {
                this.loadStory(storyId);
            }
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

    loadStory: function (storyIdToFetch) {
        var context = this;
        if (storyIdToFetch != null) {
            var url = '/wp-content/uploads/' + storyIdToFetch + '.json';
            cc.log('fetching json for storyId' + storyIdToFetch + ' url:' + url);
            cc.loader.loadJson(url, function (error, data) {
                if (data != null && data.items != null && data.items.length > 0) {
                    chimple.story = data;
                    context._sceneLayer = new PlayFullStoryLayer();
                    context.addChild(context._sceneLayer);
                    context._sceneLayer.init();
                }
            });
        }
    }
});