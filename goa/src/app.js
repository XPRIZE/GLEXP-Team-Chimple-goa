/// <reference path="cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />
var xc = xc || {};
xc.LAYER_INIT = false;
xc.PRIMARY_COLOR = cc.color("#B06A3B");
xc.DARK_PRIMARY_COLOR = cc.color("#B2524D");
xc.SECONDARY_COLOR = cc.color("#5895CC");
xc.DARK_SECONDARY_COLOR = cc.color("#5687B2");
xc.TERTIARY_COLOR = cc.color("#F6FF88");
xc.DEFAULT_BOUNDING_BOX_TAG = 999;
xc.DARK_BOUNDING_BOX_TAG = 998;
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
        this._buttonPanel = new xc.ButtonPanel(new cc.p(0, 0), this.getContentSize(), 2, 6, xc.storyConfigurationObject.editStory, new xc.ButtonHandler(this.handleSelectItem, this));
        this._buttonPanel.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this._buttonPanel.setBackGroundColor(xc.PRIMARY_COLOR);

        this.addChild(this._buttonPanel);

        this.createPages();
    },

    createPages: function () {
        var displayPages = [];

        if (xc.story != null && xc.story.items != null && xc.story.items.length > 0) {
            displayPages = xc.story['items'];
        } else {
            this._help = new cc.Sprite('#icons/help_click_new_page.png');
            this._help.setPosition(cc.p(100, cc.director.getWinSize().height - this._tabHeight - 50));
            this._help.setAnchorPoint(0, 1);
            this.addChild(this._help, 1);
        }

        this._panel = new xc.ScrollableButtonPanel(cc.p(0, 0), cc.size(cc.director.getWinSize().width, cc.director.getWinSize().height - this._tabHeight), 4, 4, displayPages, this.loadOptions, this);
        this.addChild(this._panel);
    },

    createOrCopyPage: function () {
        if (xc.pageIndex == 0) {
            xc.isNewPage = true;
        } else {
            xc.isNewPage = false;
            var copyScene = JSON.parse(JSON.stringify(xc.story.items[xc.pageIndex - 1]));
            xc.story.items[xc.pageIndex] = copyScene;
        }
        cc.director.runScene(new EditStoryScene());
    },

    handleSelectItem: function (sender) {
        //create new Scene
        //find last page index   

        if (this._optionPanel) {
            this._optionPanel.removeFromParent(true);
        }

        if (sender.getName() == 'icons/plus.png') {
            xc.pageIndex = xc.story.items.length; //new story
            this.createOrCopyPage();
        } else {
            //find if there is element submit_recipe in HTML
            if (document.getElementById("fes_post_title") != undefined) {
                xc.story.storyTitleText = document.getElementById("fes_post_title").value;
            }
            if (document.getElementById("submit_recipe") != undefined) {
                document.getElementById("submit_recipe").click();
                xc.customSprite = [];
            }
        }
    },

    loadOptions: function (sender) {
        if (this._optionPanel) {
            this._optionPanel.removeFromParent(true);
        }
        this._optionPanel = new xc.ScrollableButtonPanel(cc.p(sender.getPosition().x + sender.width / 2 - 75, sender.getPosition().y - 75), cc.size(150, 150), 2, 2, xc.storyConfigurationObject.editPage, this.chooseEditPageOption, this, true);
        this._optionPanel.setOpacity(150);
        this._optionPanel.setColor(xc.TERTIARY_COLOR);
        this.addChild(this._optionPanel, 1);
        this._curSelectedPageIndex = sender._selectedIndex;
    },

    reDrawPages: function () {
        if (this._panel) {
            this._panel.removeFromParent(true);
            this.createPages();
        }
    },

    chooseEditPageOption: function (sender) {
        if (this._optionPanel) {
            this._optionPanel.removeFromParent(true);
        }

        if (sender.getName() == 'icons/edit.png') {
            this.loadExistingPage(sender);
        } else if (sender.getName() == 'icons/back.png') {
            if (this._curSelectedPageIndex != 0) {
                this.shufflePage(xc.story.items, this._curSelectedPageIndex, this._curSelectedPageIndex - 1);
                this.reDrawPages();
                var button = this._panel.getButtonByIndex(this._curSelectedPageIndex - 1);
                this.loadOptions(button);
            }

        } else if (sender.getName() == 'icons/next_arrow.png') {
            if (this._curSelectedPageIndex < xc.story.items.length - 1) {
                this.shufflePage(xc.story.items, this._curSelectedPageIndex, this._curSelectedPageIndex + 1);
                this.reDrawPages();
                var button = this._panel.getButtonByIndex(this._curSelectedPageIndex + 1);
                if(this._curSelectedPageIndex + 1 == (this._panel._numButtonsPerRow * this._panel._numButtonsPerColumn)) {
                    this._panel.moveRightAutomatically(this._curSelectedPageIndex + 1);
                }
                this.loadOptions(button);

            }
        } else if (sender.getName() == 'icons/delete.png') {
            if (xc.story && xc.story.items && xc.story.items.length > this._curSelectedPageIndex) {
                xc.story.items.splice(this._curSelectedPageIndex, 1);
                if (this._panel) {
                    this._panel.removeFromParent(true);
                    this.createPages();
                }
            }
        }
    },

    shufflePage: function (arr, fromIndex, toIndex) {
        var element = arr[fromIndex];
        arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, element);
    },

    loadExistingPage: function (sender) {
        xc.pageIndex = this._curSelectedPageIndex; //index of selected button
        xc.isNewPage = false;
        cc.director.runScene(new EditStoryScene());
    }
});

var HelloWorldScene = cc.Scene.extend({
    ctor: function () {
        this._super();
        cc.log('hello');
        if (xc.LAYER_INIT === false) {
            xc.LAYER_INIT = true;

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
            xc.MODIFIED_BIT = 1;
        }
    },

    retrieveStoryId: function () {
        // var storyIdToFetch = null;
        // var query_string = {};
        // var query = window.location.search.substring(1);
        // var vars = query.split("&");
        // for (var i = 0; i < vars.length; i++) {
        //     var pair = vars[i].split("=");
        //     // If first entry with this name
        //     if (typeof query_string[pair[0]] === "undefined") {
        //         query_string[pair[0]] = decodeURIComponent(pair[1]);
        //         // If second entry with this name
        //     } else if (typeof query_string[pair[0]] === "string") {
        //         var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
        //         query_string[pair[0]] = arr;
        //         // If third or later entry with this name
        //     } else {
        //         query_string[pair[0]].push(decodeURIComponent(pair[1]));
        //     }
        // }
        // if (query_string != null && query_string != undefined) {
        //     storyIdToFetch = query_string['fesid'];
        //     cc.log('storyid from queryString:' + storyIdToFetch);
        // } else {
        //     cc.log('storyid from queryString: not recived');
        //     storyIdToFetch = window.recipeId;
        //     cc.log('storyid from window.recipeId: ' + storyIdToFetch);
        // }

        // return storyIdToFetch;
    },

    createNewStory: function () {
        if (xc && xc.MODIFIED_BIT != 1) {
            xc.story = {};
            xc.story.items = [];
            xc.story.RESOLUTION_HEIGHT = xc.DEVICE_HEIGHT;
        }
    },

    loadStory: function (storyIdToFetch) {
        var context = this;
        if (xc && xc.MODIFIED_BIT != 1) {
            if (storyIdToFetch != null) {
                var url = '/wp-content/uploads/' + storyIdToFetch + '.json';
                cc.log('fetching json for storyId' + storyIdToFetch + ' url:' + url);
                cc.loader.loadJson(url, function (error, data) {
                    var storyData = xc.ParseUtil.inflate(data);
                    if (storyData != null && storyData.items != null && storyData.items.length > 0) {
                        xc.story = storyData;
                        xc.story.storyId = storyIdToFetch;
                        xc.storyTitle = xc.story.storyTitleText;
                        xc.scaleFactor = xc.story.RESOLUTION_HEIGHT / xc.DEVICE_HEIGHT;
                        xc.story.RESOLUTION_HEIGHT = xc.DEVICE_HEIGHT;

                        // xc.ParseUtil.changeSize(cc.loader.cache[res.human_skeleton_json], null, xc.designScaleFactor);
                        // cc.loader.cache[res.human_skeleton_json].xcCompressed = true;

                        // xc.ParseUtil.changeSize(cc.loader.cache[res.animalskeleton_json], null, xc.designScaleFactor);
                        // cc.loader.cache[res.animalskeleton_json].xcCompressed = true;

                        // xc.ParseUtil.changeSize(cc.loader.cache[res.birdskeleton_json], null, xc.designScaleFactor);
                        // cc.loader.cache[res.birdskeleton_json].xcCompressed = true;



                        // data.items.forEach(function (element) {
                        //     if (element && element.scene) {
                        //         xc.ParseUtil.changeSize(element.scene, null, xc.scaleFactor);
                        //         element.scene.xcCompressed = true;
                        //     }
                        // }, this);

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