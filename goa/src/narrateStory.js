/// <reference path="cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />
var xc = xc || {};
xc.NarrateStoryLayer = cc.Layer.extend({
    _contentPanel: null,
    _pageConfigPanel: null,
    _storyIndex: 0,
    _objectConfigPanel: null,
    _contentPanelWidth: null,
    _configPanelWidth: null,
    _configPanelHeight: null,
    _isTitleDisplayed: false,
    ctor: function (pageIndex, storyInformation) {
        this._super();
        this._name = "NarrateStoryLayer";
        this._tabHeight = 64;
        this._pageIndex = pageIndex;
        this._storyInformation = storyInformation;
        this._controlPanel = null;
        this._contentPanelWidth = cc.director.getWinSize().width; //assuming landscape
        this._contentPanelHeight = cc.director.getWinSize().height; //assuming landscape
        this._configPanelWidth = (cc.director.getWinSize().width - this._contentPanelWidth) / 2;

        return true;
    },

    bindTouchListenerToSkeleton: function (target, funcName, loop) {
        var context = this;
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                var boundingBox = target.getBoundingBoxToWorld();
                
                var location = target.convertToNodeSpace(touch.getLocation());

                var wordCheckRect = cc.rect(boundingBox.x, boundingBox.y, boundingBox.width/2, boundingBox.height/2);
                if(cc.rectContainsPoint(wordCheckRect, touch.getLocation())) {
                    cc.log("touched:" + target.getName());
                }              
                
                if (cc.rectContainsPoint(boundingBox, touch.getLocation())) {
                    context[funcName](target, loop);
                    if(target.draggingEnabled) {
                        target.actionManager.resumeTarget(target);
                        return true;
                    }
                } 
                return false;
            },

            onTouchMoved: function (touch, event) {
                var target = event.getCurrentTarget();
                var boundingBox = target.getBoundingBoxToWorld();
                var location = target.convertToNodeSpace(touch.getLocation());
                if (cc.rectContainsPoint(boundingBox, touch.getLocation())) {
                    if(target.draggingEnabled) {
                        var location = target.parent.convertToNodeSpace(touch.getLocation());
                        target.x = location.x;
                        target.y = location.y;
                    }
                }                
            },

            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();
                if(target.draggingEnabled) {
                    target.actionManager.pauseTarget(target);
                }
                
            }
            
            
        });
        cc.eventManager.addListener(listener, target);
    },

    bindTouchListenerToSubChild: function (target, funcName, loop) {
        var context = this;
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                var location = target.convertToNodeSpace(touch.getLocation());
                  if(target.getChildren() != null && target.getChildren().length > 0)
                  {

                        var targetRectangle = target.getChildren()[0].getBoundingBox();

                        var wordCheckRect = cc.rect(targetRectangle.x, targetRectangle.y, targetRectangle.width/2, targetRectangle.height/2);
                        if(cc.rectContainsPoint(wordCheckRect, location)) {
                            cc.log("touched:" + target.getName());
                        }                        
                        
                        if (cc.rectContainsPoint(targetRectangle, location)) {
                            context[funcName](target, loop);
                            return true;
                        }
                  }
                return false;
            },

            onTouchEnded: function (touch, event) {

            }            
        });
        cc.eventManager.addListener(listener, target);
    },    

    bindTouchListener: function (target, funcName, loop) {
        var context = this;
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                var location = target.convertToNodeSpace(touch.getLocation());
                var targetSize = target.getContentSize();
                var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.
                    height);

                var wordCheckRect = cc.rect(targetRectangle.x, targetRectangle.y, targetRectangle.width/2, targetRectangle.height/2);
                if(cc.rectContainsPoint(wordCheckRect, location)) {
                    cc.log("touched:" + target.getName());
                }                
                    
                if (cc.rectContainsPoint(targetRectangle, location)) {
                    context[funcName](target, loop);
                    return true;
                }

                return false;
            },

            onTouchMoved: function (touch, event) {
                var target = event.getCurrentTarget();
                var targetSize = target.getContentSize();
                var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.
                    height);
                var location = target.convertToNodeSpace(touch.getLocation());
                if (cc.rectContainsPoint(targetRectangle, location)) {
                    if(target.draggingEnabled) {
                        var location = target.parent.convertToNodeSpace(touch.getLocation());
                        target.setPosition(location.x, location.y);
                    }
                }            
            },

            onTouchEnded: function (touch, event) {

            }            
        });
        cc.eventManager.addListener(listener, target);
    },

    sceneTouchListener: function(target) {
        var context = this;
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                var location = target.convertToNodeSpace(touch.getLocation());
                var targetSize = target.getContentSize();
                var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.
                    height);
                if (cc.rectContainsPoint(targetRectangle, location)) {
                    //context[funcName](target, loop);
                    cc.log('11111');
                }
                return true;
            }        
        });
        cc.eventManager.addListener(listener, target);
    },

    init: function () {
        var contentUrl = this._storyInformation["pages"][this._pageIndex]["contentJson"];
        this._constructedScene = ccs.load(xc.path + contentUrl, xc.path + "wikitaki/");
        this._constructedScene.node.retain();
        this._constructedScene.action.retain();
        
        this.processScene(this._constructedScene.node);
        if (this._constructedScene.node) {
            this.addChild(this._constructedScene.node,0);
        }        

        this._playButton = new cc.Sprite(xc.NarrateStoryLayer.res.play_png);
        this._playButton.setPosition(cc.director.getWinSize().width / 2, cc.director.getWinSize().height / 2);
        this.addChild(this._playButton);        
        this.bindTouchListener(this._playButton, "sceneTouched", false, 2);

        this.setUpScene();


        this._leftButtonPanel = new xc.ButtonPanel(new cc.p(150, 0), cc.size(this._configPanelWidth, this._contentPanelHeight), 1, 1, xc.onlyStoryNarrateConfigurationObject.prevDefault, new xc.ButtonHandler(this.previousStory, this, false));        
        this._leftButtonPanel.scaleX *= -1;
        this._leftButtonPanel.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this._leftButtonPanel.setBackGroundColor(xc.PRIMARY_COLOR);
        this._leftButtonPanel.setVisible(false);
        this.addChild(this._leftButtonPanel);

        this._rightButtonPanel = new xc.ButtonPanel(new cc.p(this._contentPanelWidth - 380/2, 0), cc.size(this._configPanelWidth, this._contentPanelHeight), 1, 1, xc.onlyStoryNarrateConfigurationObject.nextDefault, new xc.ButtonHandler(this.nextStory, this, false));
        this._rightButtonPanel.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this._rightButtonPanel.setBackGroundColor(xc.PRIMARY_COLOR);
        this.addChild(this._rightButtonPanel);
        this._rightButtonPanel.setVisible(false);
    },

    bindEventsToTarget:function(child) {
        if(child && child.getComponent("ComExtensionData") != undefined && 
                child.getComponent("ComExtensionData").getCustomProperty() != undefined
                && child.getComponent("ComExtensionData").getCustomProperty()) 
        {
            var events = child.getComponent("ComExtensionData").getCustomProperty().split(';');
            var isMultipleEvents = events && events.length > 1;

            if(isMultipleEvents) {
                child.cEvents = [];                            
            }
            events.forEach(function(event){
                if(event.trim() == 'drag') {
                    child.draggingEnabled = true;
                } else {                                
                    if(child instanceof ccs.SkeletonNode) {
                        child.cEvent = event;
                    } else {
                        if(isMultipleEvents) {
                            child.cEvents.push(event);
                            child.isMultipleEvents = true;
                        }  else {
                            child.cEvent = event;
                            child.isMultipleEvents = false;                                               
                        }                                     
                    }                                
                }
            });                     
        }
    },

    processScene: function(node) {
        cc.log('processing node' + node);

        var that = this;

        node.getChildren().forEach(function(child)
        {      
            if(child instanceof ccs.SkeletonNode) {
                that.bindEventsToTarget(child);
                that.bindTouchListenerToSkeleton(child, "playAnimiation", false);    
            } else {
                if(!child.getName().startsWith("Panel")) {
                    if(child.getChildren() != null && child.getChildren().length > 1) {
                        that.bindEventsToTarget(child);
                        that.bindTouchListenerToSubChild(child, "playAnimationOnChild", false);                                        
                    } else {
                        that.bindEventsToTarget(child);
                        that.bindTouchListener(child, "playAnimiation", false);
                    }                                    
                }
            }
        }); 

        // node.getChildren().forEach(function(child){            
        //     if(child && child.getComponent("ComExtensionData") != undefined && 
        //         child.getComponent("ComExtensionData").getCustomProperty() != undefined) 
        //         {
        //             if(child.getComponent("ComExtensionData").getCustomProperty()) {
        //                 var events = child.getComponent("ComExtensionData").getCustomProperty().split(';');
        //                 var isMultipleEvents = events && events.length > 1;
        //                 if(isMultipleEvents) {
        //                     child.cEvents = [];                            
        //                 }
        //                 events.forEach(function(event){
        //                     if(event.trim() == 'drag') {
        //                         child.draggingEnabled = true;
        //                     } else {                                
        //                         if(child instanceof ccs.SkeletonNode) {
        //                             child.cEvent = event;
        //                             that.bindTouchListenerToSkeleton(child, "playAnimiation", false);    
        //                         } else {
        //                             if(isMultipleEvents) {
        //                                 child.cEvents.push(event);
        //                                 child.isMultipleEvents = true;
        //                             }  else {
        //                                 child.cEvent = event;
        //                                 child.isMultipleEvents = false;                                               
        //                             }                                     
                                    
        //                             if(child.getChildren() != null && child.getChildren().length == 1) {
        //                                 that.bindTouchListenerToSubChild(child, "playAnimationOnChild", false);                                        
        //                             } else {
        //                                 that.bindTouchListener(child, "playAnimiation", false);
        //                             }
                                    
        //                         }
                                
        //                     }
        //                 });                        
        //             }
        //         }
        // });
    },

    playAnimiation: function(target, loop) {

        if(target.isMultipleEvents) {
            target.currentAnimIndex = target.currentAnimIndex == undefined ? 0 : target.currentAnimIndex;              
            cc.log("playAnimiation" + target.cEvents[target.currentAnimIndex]);
            var currentAnim = target.cEvents[target.currentAnimIndex];
            this._constructedScene.action.play(currentAnim, loop);
            target.currentAnimIndex = (target.currentAnimIndex + 1)  % target.cEvents.length;
        } else if(target.cEvent) {
            cc.log("playAnimiation" + target.cEvent);
            this._constructedScene.action.play(target.cEvent, loop);
        }
    },

    playAnimationOnChild: function(target, loop) {
        var action = target.actionManager.getActionByTag(target.tag, target);
        if(action) {
            if(target.isMultipleEvents) {
                target.currentAnimIndex = target.currentAnimIndex == undefined ? 0 : target.currentAnimIndex;              
                cc.log("playAnimationOnChild" + target.cEvents[target.currentAnimIndex]);
                action.play(target.cEvents[target.currentAnimIndex], false);
                target.currentAnimIndex = (target.currentAnimIndex + 1)  % target.cEvents.length; 
            } else if(target.cEvent) {
                action.play(target.cEvent, false);
            }
        }
    },


    setUpScene: function () {
        if (this._constructedScene.node) {
            this._constructedScene.action._referenceToContext = this;
            this._constructedScene.action.setLastFrameCallFunc(this.playEnded);
            this._constructedScene.action.setFrameEventCallFunc(this.enterFrameEvent);
            this._constructedScene.action.gotoFrameAndPause(0);            
        }
    },


    enterFrameEvent: function(event) {
        cc.log('enterFrameEvent' + event.getEvent());    
        var langDir = goa.TextGenerator.getInstance().getLang();
        var eventData = event.getEvent();
        var page = this._referenceToContext._storyInformation["pages"][this._referenceToContext._pageIndex];
        if(page) {
            //var soundFile = page[eventData];
            var soundFile = eventData;
            if(soundFile != undefined) {
                var soundFile = xc.path + "wikitaki/misc/" + langDir + "/" + "sounds/" + soundFile;
                cc.loader.load(soundFile, function(err, data) {
                    if(!err) {
                        cc.audioEngine.playMusic(soundFile, false);
                    }
                }); 
            }            

        }
    },
    
    renderNextButton: function () {
        var pages = this._storyInformation["pages"];
        if (pages != null  &&  !(this._pageIndex + 1 == pages.length)) {
            this._rightButtonPanel.setVisible(true);
        } else {
            this._rightButtonPanel.setVisible(false);
        }
    },

    renderPreviousButton: function () {
        var pages = this._storyInformation["pages"];
        if (pages != null && !(this._pageIndex == 0)) {
            this._leftButtonPanel.setVisible(true);
        } else {
            this._leftButtonPanel.setVisible(false);
        }
    },

    sceneTouched: function (target) {
        //load content
        this.playRecordedScene();
        this._playButton.setVisible(false);
        this._playButton.removeFromParent();
    },

    previousStory: function () {
        var pages = this._storyInformation["pages"];
        var curIndex = this._pageIndex;
        curIndex--;
        if (curIndex < 0) {
            return;
        }
        xc.NarrateStoryScene.load(curIndex, this._storyInformation, xc.NarrateStoryLayer, true);
    },

    nextStory: function () {
        var pages = this._storyInformation["pages"];
        var curIndex = this._pageIndex;
        curIndex++;
        if (curIndex >= pages.length) {
            return;
        }
        xc.NarrateStoryScene.load(curIndex, this._storyInformation, xc.NarrateStoryLayer, true);
    },

    playEnded: function () {
        //create delay action
        var delayAction = new cc.DelayTime(2);
        var createWebViewAction = new cc.CallFunc(this._referenceToContext.showText, this._referenceToContext);
        var playEndSequence = new cc.Sequence(delayAction, createWebViewAction);
        this._referenceToContext.runAction(playEndSequence);
    },
    
    showText: function() {
        //load text file based on Current Story Id and Page index
        var langDir = goa.TextGenerator.getInstance().getLang();
        cc.log("langDir:" + langDir);
        var textFileUrl = xc.path + "wikitaki/misc/" + langDir + "/" + xc.currentStoryId + ".json";
        var storyText = "";
        var that = this;
        cc.loader.loadJson(textFileUrl, function(err, json) {
            if(json != null && json != undefined) {
                storyText = json[xc.pageIndex];
            } 
            that.parent.addChild(new xc.TextCreatePanel(cc.director.getWinSize().width, cc.director.getWinSize().height, cc.p(385, 250), storyText, that.processText, that, true));           
        });

        this._constructedScene.action.clearLastFrameCallFunc();
        this._constructedScene.action.gotoFrameAndPause(this._constructedScene.action.getCurrentFrame());
        // this._constructedScene.action.pause();
        this.renderNextButton();
        this.renderPreviousButton();                
    },

    playRecordedScene: function () {
        if (this._constructedScene.node && this._constructedScene.action.getDuration() > 0) {
            this._constructedScene.node.runAction(this._constructedScene.action);
            this._constructedScene.action.play('master', false);
            // this._constructedScene.action.gotoFrameAndPlay(0, this._constructedScene.action.getDuration(), 0, false);
        } else {
            this._referenceToContext = this;
            this.playEnded();
        }
    }
});

xc.NarrateStoryScene = cc.Scene.extend({
    layerClass: null,
    ctor: function (pageIndex, storyInformation, layer) {
        this._super();
        this.layerClass = layer;
        this._sceneLayer = new this.layerClass(pageIndex, storyInformation);
        this.addChild(this._sceneLayer);
        this._sceneLayer.init();
                
    }
});


xc.NarrateStoryScene.load = function(pageIndex, storyInformation, layer, enableTransition) {
    var that = this;
    var t_resources = [];
    //also push json
    var currentStoryJSON = null;
    if(storyInformation != null) {
        xc.currentStoryId = storyInformation["storyId"];
         xc.pageIndex = pageIndex;

        var storyContents = storyInformation["pages"];
        var storyResources = storyInformation["resources"];

        if(storyContents != null && pageIndex < storyContents.length) {
           
            var page = storyContents[pageIndex];
            if(page) {
                    var contentUrl = page["contentJson"];
                    
                    if(contentUrl) {
                        t_resources.push(xc.path + contentUrl);
                    }
                    if(storyResources != undefined) {
                        storyResources.forEach(function(e) {
                            t_resources.push(xc.path + e);
                        });
                    }

                    
                    for (var i in layer.res) {
                        cc.log('preloading:' + layer.res[i]);
                        t_resources.push(layer.res[i]);
                    }

                    
                    cc.LoaderScene.preload(t_resources, function () {

                        //config data
                        if(cc.sys.isNative) {
                            xc.onlyStoryNarrateConfigurationObject = cc.loader.getRes(xc.NarrateStoryLayer.res.OnlyStoryPlayConfig_json);                         
                        } else {
                            xc.onlyStoryNarrateConfigurationObject = cc.loader.cache[xc.NarrateStoryLayer.res.OnlyStoryPlayConfig_json];
                        }
                        var scene = new xc.NarrateStoryScene(pageIndex, storyInformation, layer);
                        scene.layerClass = layer;            
                        if(enableTransition) {
                            cc.director.runScene(new cc.TransitionFade(2.0, scene, true));
                        }  else {
                            cc.director.runScene(scene);
                        }              
                    }, this);
            }
        }
    }

}



xc.NarrateStoryLayer.res = {
        play_png: xc.path + "wikitaki/play.png",
        record_animation_png: xc.path + "wikitaki/recording.png",
        record_animation_plist: xc.path + "wikitaki/recording.plist",
        OnlyStoryPlayConfig_json: xc.path + "wikitaki/misc/onlyPlayConfig.json"
};