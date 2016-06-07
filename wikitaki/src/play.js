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
    _isTitleDisplayed: false,
    ctor: function () {
        this._super();
        this._name = "PlayFullStoryLayer";
        this._tabHeight = 64;
        this._controlPanel = null;
        this._contentPanelWidth = cc.director.getWinSize().height; //assuming landscape
        this._configPanelWidth = (cc.director.getWinSize().width - this._contentPanelWidth) / 2;
        this._configPanelHeight = cc.director.getWinSize().height;

        this._playButton = new cc.Sprite(res.play_png);
        this.bindTouchListener(this._playButton);

        return true;
    },

    bindTouchListener: function (target) {
        var context = this;
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
                    context.sceneTouched();
                }
            }
        });
        cc.eventManager.addListener(this._listener, target);
    },

    init: function () {
        this._contentPanel = new chimple.PlayContentPanel(this._contentPanelWidth, this._contentPanelWidth, cc.p(this._configPanelWidth, 0));
        this._contentPanel.setOpacity(0.2);
        this.addChild(this._contentPanel);


        this._leftButtonPanel = new chimple.ButtonPanel(new cc.p(0, 0), cc.size(this._configPanelWidth, this._contentPanelWidth), 1, 1, chimple.onlyStoryPlayConfigurationObject.editDefault, new chimple.ButtonHandler(this.previousStory, this, false));
        this._leftButtonPanel.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this._leftButtonPanel.setBackGroundColor(chimple.PRIMARY_COLOR);

        this.disableOrEnableAllButtons(this._leftButtonPanel, false);
        this.addChild(this._leftButtonPanel);

        this._rightButtonPanel = new chimple.ButtonPanel(new cc.p(this._configPanelWidth + this._contentPanelWidth, 0), cc.size(this._configPanelWidth, this._contentPanelWidth), 1, 1, chimple.onlyStoryPlayConfigurationObject.nextDefault, new chimple.ButtonHandler(this.nextStory, this, false));
        this._rightButtonPanel.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this._rightButtonPanel.setBackGroundColor(chimple.PRIMARY_COLOR);

        this.disableOrEnableAllButtons(this._rightButtonPanel, false);
        this.addChild(this._rightButtonPanel);
        this.setUpRecordedScene();

        this._playButton.setPosition(cc.director.getWinSize().width / 2, cc.director.getWinSize().height / 2);
        this.addChild(this._playButton, 0);
        this._playButton.setVisible(false);


        if (!this._isTitleDisplayed) {
            this._playButton.setVisible(true);
        } else {
            this.createStoryTitle();
        }
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
                element.setHighlighted(false);
            } else {
                element.setHighlighted(true);
            }
        }, this);

    },

    sceneTouched: function () {
        this._contentPanel._constructedScene.action.gotoFrameAndPause(0);
        this.playRecordedScene();
        this._playButton.setVisible(false);
    },

    previousStory: function () {
        var curIndex = chimple.pageIndex;
        curIndex--;
        if (curIndex < 0) {
            return;
        }
        chimple.pageIndex--;
        var prevScene = new PlayFullStoryScene();
        cc.director.runScene(new cc.TransitionPageTurn(1.5, prevScene, true));
    },

    nextStory: function () {
        var curIndex = chimple.pageIndex;
        curIndex++;
        if (curIndex >= chimple.story.items.length) {
            return;
        }

        chimple.pageIndex++;

        var nextScene = new PlayFullStoryScene();
        cc.director.runScene(new cc.TransitionPageTurn(2.5, nextScene));
    },


    showTitle: function () {
        if (window.PLAYING_STORY_FIRST_TIME) {
            this._isTitleDisplayed = true;
        } else {
            this._playButton.setVisible(true);
        }
    },


    createStoryTitle: function () {
        this._titleLabel = new ccui.TextField();
        var textContentMargin = 100;
        this._titleLabel.setFontSize(64);

        this._titleLabel.setTextColor(chimple.SECONDARY_COLOR);
        this._titleLabel.setPosition(this._contentPanel.height / 2 + 100, this._contentPanel.height / 2 - 100);
        this._titleLabel.ignoreContentAdaptWithSize(false);
        this._titleLabel.setText(chimple.storyTitle);
        this._titleLabel.setTextHorizontalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this._titleLabel.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_TOP);
        this._titleLabel.setContentSize(cc.size(this._contentPanel.height, this._contentPanel.height));
        this.addChild(this._titleLabel, 0);

        var delayAction = new cc.delayTime(1);
        var removeTitleAction = new cc.CallFunc(this.removeTitle, this);
        var removeTitleSeq = new cc.sequence(delayAction, removeTitleAction);
        this.runAction(removeTitleSeq);

    },

    removeTitle: function () {
        var fadeInAction = new cc.FadeOut(2.5);
        this._titleLabel.runAction(fadeInAction);
        this._titleLabel.removeFromParent(true);
        this._playButton.setVisible(true);
    },

    onEnterTransitionDidFinish: function () {

        this.showTitle();
    },

    onExitTransitionDidStart: function () {
    },

    setUpRecordedScene: function () {
        if (this._contentPanel._constructedScene.node) {
            this._contentPanel._constructedScene.action.referenceToContext = this;
            this._contentPanel._constructedScene.action.setLastFrameCallFunc(this.playEnded);
            this._contentPanel._constructedScene.action.gotoFrameAndPause(0);
            if (!cc.sys.isNative) {

                this._contentPanel._constructedScene.node._renderCmd._dirtyFlag = 1;
                this._contentPanel._constructedScene.node.children.forEach(function (element) {
                    if (element.getName().indexOf("Skeleton") != -1 || element.getName().indexOf("skeleton") != -1) {
                        element._renderCmd._dirtyFlag = 1;
                    }
                }, this);
            }
        }
    },

    closeWebView: function () {
        this._textField.removeFromParent(true);
        this._leftButtonPanel.removeFromParent(true);
        this.renderNextButton();
        this.renderPreviousButton();
        this._playButton.setVisible(true);
        window.PLAYING_STORY_FIRST_TIME = false;
        localStorage.removeItem("scene_display_text_contents");
    },


    playEnded: function () {
        cc.log('play ended');
        //create delay action
        chimple.story.items[chimple.pageIndex].sceneText = "dummy test";
        if (chimple.story.items[chimple.pageIndex].sceneText != null && chimple.story.items[chimple.pageIndex].sceneText !== "undefined") {
            var delayAction = new cc.delayTime(2);
            var createWebViewAction = new cc.CallFunc(this.referenceToContext.createWebView, this.referenceToContext);
            var playEndSequence = new cc.sequence(delayAction, createWebViewAction);
            this.referenceToContext.runAction(playEndSequence);
        } else {
            this.referenceToContext.renderNextButton();
            this.referenceToContext.renderPreviousButton();
            this.referenceToContext._playButton.setVisible(true);
            window.PLAYING_STORY_FIRST_TIME = false;

        }
    },


    createWebView: function () {
        if (chimple.story.items[chimple.pageIndex].sceneText != null && chimple.story.items[chimple.pageIndex].sceneText !== "undefined") {
            this.addChild(new chimple.TextReadPanel(cc.director.getWinSize().width, cc.director.getWinSize().height, cc.p(150, 150), chimple.story.items[chimple.pageIndex].sceneText, this.closeWebView, this));
            // this._textField = new ccui.WebView();
            // localStorage.setItem("scene_display_text_contents", chimple.story.items[chimple.pageIndex].sceneText);
            // this._textField.loadURL("/displayText.html?height=" + 450);
            // this._textField.setPosition(64, 0);
            // this._textField.setContentSize(cc.size(cc.director.getWinSize().width - 64, cc.director.getWinSize().height));
            // this._textField.setScalesPageToFit(true);
            // this._textField.setAnchorPoint(0, 0);
            // this.addChild(this._textField, 0);

            // this._leftButtonPanel = new chimple.ButtonPanel(new cc.p(0, 0), cc.size(64, 450), 1, 1, chimple.onlyStoryPlayConfigurationObject.editDefault, new chimple.ButtonHandler(this.closeWebView, this, false));
            // this.addChild(this._leftButtonPanel, 1);

            this.renderNextButton();
            this.renderPreviousButton();
            this._playButton.setVisible(true);
            window.PLAYING_STORY_FIRST_TIME = false;
            //localStorage.removeItem("scene_display_text_contents");
        }
    },

    playRecordedScene: function () {
        this.disableOrEnableAllButtons(this._leftButtonPanel, false);
        this.disableOrEnableAllButtons(this._rightButtonPanel, false);
        if (this._contentPanel._constructedScene.node && this._contentPanel._constructedScene.action.getDuration()) {
            this._contentPanel._constructedScene.node.runAction(this._contentPanel._constructedScene.action);
            this._contentPanel._constructedScene.action.gotoFrameAndPlay(0, this._contentPanel._constructedScene.action.getDuration(), 0, false);

            if (!cc.sys.isNative) {
                this._contentPanel._renderCmd._dirtyFlag = 1;
                this._contentPanel._constructedScene.node._renderCmd._dirtyFlag = 1;
                this._contentPanel._constructedScene.node.children.forEach(function (element) {
                    if (element.getName().indexOf("Skeleton") != -1 || element.getName().indexOf("skeleton") != -1) {
                        element._renderCmd._dirtyFlag = 1;
                    }
                }, this);
            }
        } else {
            this.referenceToContext = this;
            this.playEnded();
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
            cc.loader.loadTxt(url, function (error, sdata) {
                var data = chimple.ParseUtil.inflate(sdata);
                if (data != null && data.items != null && data.items.length > 0) {
                    chimple.story = data;
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
                    context._sceneLayer = new PlayFullStoryLayer();
                    context.addChild(context._sceneLayer);
                    context._sceneLayer.init();
                }
            });
        }
    }
});