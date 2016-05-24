/// <reference path="../../cocos2d-typescript-definitions/cocos2d/cocos2d-lib.d.ts" />
var chimple = chimple || {};
chimple.LAYER_INIT = false;
chimple.PRIMARY_COLOR = cc.color("#FF8E88");
chimple.DARK_PRIMARY_COLOR = cc.color("#B2524D");
chimple.SECONDARY_COLOR = cc.color("#5895CC");
chimple.DARK_SECONDARY_COLOR = cc.color("#5687B2");
chimple.TERTIARY_COLOR = cc.color("#F6FF88");
chimple.DEFAULT_BOUNDING_BOX_TAG = 999;
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
        this._tabHeight = 64;
        this._controlPanel = null;
        this._contentPanelWidth = cc.director.getWinSize().height; //assuming landscape
        this._configPanelWidth = (cc.director.getWinSize().width - this._contentPanelWidth) / 2;
        this._configPanelHeight = cc.director.getWinSize().height;
        return true;
    },

    init: function () {
        //create new content panel for showing all stories
        //add button panel
        this._buttonPanel = new chimple.ButtonPanel(new cc.p(0, 0), this.getContentSize(), 2, 6, chimple.storyConfigurationObject.editStory, new chimple.ButtonHandler(this.handleSelectItem, this));
        this._buttonPanel.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this._buttonPanel.setBackGroundColor(chimple.PRIMARY_COLOR);

        this.addChild(this._buttonPanel);

        var displayPages = [];
        if (chimple.story != null && chimple.story.items != null && chimple.story.items.length > 0) {
            displayPages = chimple.story['items'];
        } else {
            this._help = new cc.Sprite('#icons/help_click_new_page.png');
            this._help.setPosition(cc.p(100,cc.director.getWinSize().height - this._tabHeight-50));
            this._help.setAnchorPoint(0, 1);
            this.addChild(this._help, 1);

        }

        this._panel = new chimple.ScrollableButtonPanel(cc.p(0, 0), cc.size(cc.director.getWinSize().width, cc.director.getWinSize().height - this._tabHeight), 4, 4, displayPages, this.loadExistingPage, this);
        this.addChild(this._panel);

    },

    handleSelectItem: function (sender) {
        //create new Scene
        //find last page index   
        cc.log('name of button:' + sender.getName());
        if (sender.getName() == 'icons/plus.png') {
            chimple.pageIndex = chimple.story.items.length; //new story
            chimple.isNewPage = true;
            cc.director.runScene(new EditStoryScene());
        } else {
            //find if there is element submit_recipe in HTML
            if (document.getElementById("fes_post_title") != undefined) {
                chimple.story.storyTitleText = document.getElementById("fes_post_title").value;
            }
            if (document.getElementById("submit_recipe") != undefined) {
                document.getElementById("submit_recipe").click();
            }
        }
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
            chimple.story.RESOLUTION_HEIGHT = chimple.DEVICE_HEIGHT;
            cc.log('chimple.story.scaleFactor:' + chimple.story.scaleFactor);
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
                        chimple.story.storyId = storyIdToFetch;
                        chimple.storyTitle = chimple.story.storyTitleText;
                        chimple.scaleFactor = chimple.story.RESOLUTION_HEIGHT / chimple.DEVICE_HEIGHT;
                        chimple.story.RESOLUTION_HEIGHT = chimple.DEVICE_HEIGHT;

                        chimple.ParseUtil.changeSize(cc.loader.cache[res.human_skeleton_json], null, chimple.designScaleFactor);
                        cc.loader.cache[res.human_skeleton_json].ChimpleCompressed = true;

                        chimple.ParseUtil.changeSize(cc.loader.cache[res.animalskeleton_json], null, chimple.designScaleFactor);
                        cc.loader.cache[res.animalskeleton_json].ChimpleCompressed = true;
                        
                        chimple.ParseUtil.changeSize(cc.loader.cache[res.birdskeleton_json], null, chimple.designScaleFactor);
                        cc.loader.cache[res.birdskeleton_json].ChimpleCompressed = true;
                        


                        data.items.forEach(function (element) {
                            if (element && element.scene) {
                                chimple.ParseUtil.changeSize(element.scene, null, chimple.scaleFactor);
                                element.scene.ChimpleCompressed = true;
                            }
                        }, this);

                        context._sceneLayer = new HelloWorldLayer();
                        context.addChild(context._sceneLayer);
                        context._sceneLayer.init();
                    } else {
                        context.createNewStory();
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