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
    _isTextDisplayed: false,
    ctor: function () {
        this._super();
        this._name = "PlayFullStoryLayer";
        this._tabHeight = 64;
        this._controlPanel = null;
        this._contentPanelWidth = cc.director.getWinSize().height; //assuming landscape
        this._configPanelWidth = (cc.director.getWinSize().width - this._contentPanelWidth) / 2;
        this._configPanelHeight = cc.director.getWinSize().height;

        if (window.PLAYING_STORY_FIRST_TIME) {
            this.bindTouchListener();
        }


        return true;
    },

    bindTouchListener: function () {
        this._listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                var location = target.convertToNodeSpace(touch.getLocation());
                var targetSize = target.getContentSize();
                var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.
                    height);
                if (cc.rectContainsPoint(targetRectangle, location)) {
                    target.sceneTouched();
                }
            }
        });
        cc.eventManager.addListener(this._listener, this);
    },

    init: function () {
        this._contentPanel = new chimple.PlayContentPanel(this._contentPanelWidth, this._contentPanelWidth, cc.p(this._configPanelWidth, 0));
        this.addChild(this._contentPanel);

        this._leftButtonPanel = new chimple.ButtonPanel(new cc.p(0, 0), cc.size(this._configPanelWidth, this._contentPanelWidth), 1, 1, chimple.onlyStoryPlayConfigurationObject.editDefault, new chimple.ButtonHandler(this.previousStory, this, false));
        this.disableOrEnableAllButtons(this._leftButtonPanel, false);
        this.addChild(this._leftButtonPanel);
        this._rightButtonPanel = new chimple.ButtonPanel(new cc.p(this._configPanelWidth + this._contentPanelWidth, 0), cc.size(this._configPanelWidth, this._contentPanelWidth), 1, 1, chimple.onlyStoryPlayConfigurationObject.nextDefault, new chimple.ButtonHandler(this.nextStory, this, false));
        this.disableOrEnableAllButtons(this._rightButtonPanel, false);
        this.addChild(this._rightButtonPanel);
        this.setUpRecordedScene();
        cc.log('init called');
        
    },

    renderNextButton: function () {
        if (chimple.story != null && chimple.story.items != null && !(chimple.pageIndex + 1 == chimple.story.items.length)) {
            this.disableOrEnableAllButtons(this._rightButtonPanel, true);
        } else {
            this.disableOrEnableAllButtons(this._rightButtonPanel, false);
        }
    },

    renderPreviousButton: function () {
        if (chimple.story != null && chimple.story.items != null && !(chimple.pageIndex == 0)) {
            this.disableOrEnableAllButtons(this._leftButtonPanel, true);
        } else {
            this.disableOrEnableAllButtons(this._leftButtonPanel, false);
        }
    },

    disableOrEnableAllButtons: function (panel, isEnabled) {
        panel.children.forEach(function (element) {
            if (isEnabled) {
                //element.setEnabled(true);
                element.setHighlighted(false);
            } else {
                //element.setEnabled(false);
                element.setHighlighted(true);
            }
        }, this);

    },

    sceneTouched: function () {
        if (this._isTextDisplayed) {
            this.playRecordedScene();
        }
    },

    previousStory: function () {
        cc.log('previousStory clicked!');
        chimple.pageIndex--;
        var prevScene = new PlayFullStoryScene();
        cc.director.runScene(new cc.TransitionPageTurn(1.5, prevScene, true));
    },

    nextStory: function () {
        cc.log('next clicked!');
        chimple.pageIndex++;
        var nextScene = new PlayFullStoryScene();
        cc.director.runScene(new cc.TransitionPageTurn(2.5, nextScene));
    },


    showTitle: function () {
        if (window.PLAYING_STORY_FIRST_TIME) {
            this._isTextDisplayed = true;
        } else {
            this.playRecordedScene();
        }
    },

    onEnterTransitionDidFinish: function () {
        cc.log('transition enter finished');
        
        this.showTitle();
    },

    onExitTransitionDidStart: function () {
        cc.log('transition exit started');
    },

    setUpRecordedScene: function () {
        if (this._contentPanel._constructedScene.node) {
            this._contentPanel._constructedScene.action.referenceToContext = this;
            this._contentPanel._constructedScene.action.setLastFrameCallFunc(this.playEnded);
            this._contentPanel._constructedScene.action.gotoFrameAndPause(0);
            if (!cc.sys.isNative) {

                this._contentPanel._constructedScene.node._renderCmd._dirtyFlag = 1;
                this._contentPanel._constructedScene.node.children.forEach(function (element) {
                    if (element.getName().indexOf("Skeleton") != -1) {
                        element._renderCmd._dirtyFlag = 1;
                    }
                }, this);
            }
        }

    },

    playEnded: function () {
        cc.log('play ended');
        this.referenceToContext.renderNextButton();
        this.referenceToContext.renderPreviousButton();
        window.PLAYING_STORY_FIRST_TIME = false;
    },

    playRecordedScene: function () {
        this.disableOrEnableAllButtons(this._leftButtonPanel, false);
        this.disableOrEnableAllButtons(this._rightButtonPanel, false);
        if (this._contentPanel._constructedScene.node) {
            this._contentPanel._constructedScene.node.runAction(this._contentPanel._constructedScene.action);
            this._contentPanel._constructedScene.action.gotoFrameAndPlay(0, this._playDuration, 0, false);

            if (!cc.sys.isNative) {
                this._contentPanel._renderCmd._dirtyFlag = 1;
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
        } else {
            if (chimple.story && chimple.story.items != null && chimple.story.items.length > 0) {
                this._sceneLayer = new PlayFullStoryLayer();
                this.addChild(this._sceneLayer);
                this._sceneLayer.init();

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
            storyIdToFetch = query_string['fesid'] || window.recipeId;
            cc.log('storyid from queryString:' + storyIdToFetch);
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
                        chimple.scaleFactor = chimple.story.RESOLUTION_HEIGHT / chimple.DEVICE_HEIGHT;
                        chimple.story.RESOLUTION_HEIGHT = chimple.DEVICE_HEIGHT;

                        chimple.ParseUtil.changeSize(cc.loader.cache[res.human_skeleton_json], null, chimple.designScaleFactor);
                        cc.loader.cache[res.human_skeleton_json].ChimpleCompressed = true;

                        data.items.forEach(function (element) {
                            if (element && element.scene) {
                                chimple.ParseUtil.changeSize(element.scene, null, chimple.scaleFactor);
                                element.scene.ChimpleCompressed = true;                                
                            }
                        }, this);
                    context._sceneLayer = new PlayFullStoryLayer();
                    context.addChild(context._sceneLayer);
                    context._sceneLayer.init();
                }
            });
        }
    }
});