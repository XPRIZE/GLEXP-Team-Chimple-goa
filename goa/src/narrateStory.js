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
                var childText = context.getChildByName("wordMeaning");
                if(childText) {
                    childText.removeFromParent();
                }
                
                var target = event.getCurrentTarget();
                var boundingBox = target.getBoundingBoxToWorld();
                
                if (cc.rectContainsPoint(boundingBox, touch.getLocation())) {
                    var location = target.parent.convertToNodeSpace(touch.getLocation());
                    context._offsetYInTouch = location.y - target.getPosition().y;
                    context._offsetXInTouch = location.x - target.getPosition().x;                    
                    context[funcName](target, loop);                    
                    if(target.draggingEnabled) {
                        target.actionManager.resumeTarget(target);
                        return true;
                    }
                } 
                return false;
            },

            onTouchMoved: function (touch, event) {
                this._isDragging = true;
                var target = event.getCurrentTarget();
                var location = target.parent.convertToNodeSpace(touch.getLocation());
                var locationTo = cc.p(location.x - context._offsetXInTouch, location.y - context._offsetYInTouch);
                if (!context._previousTouch) {
                    context._previousTouch = touch.getLocationInView();
                }
                var locationPoint = touch.getLocationInView();
                var deltaX = locationPoint.x - context._previousTouch.x;
                var deltaY = locationPoint.y - context._previousTouch.y;

                var boundingBox = target.getBoundingBoxToWorld();
                if(target.draggingEnabled) {                        
                    target.x = locationTo.x;
                    target.y = locationTo.y;
                }
                context._previousTouch = locationPoint;                
            },

            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();
                if(target.draggingEnabled) {
                    target.actionManager.pauseTarget(target);
                }
                context._previousTouch = null;
                if(!this._isDragging) {
                    var location = target.parent.convertToNodeSpace(touch.getLocation());
                    context.displayText(target.getName(),location);
                }
                this._isDragging = false;
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

                var childText = context.getChildByName("wordMeaning");
                if(childText) {
                    childText.removeFromParent();
                }
                
                var target = event.getCurrentTarget();
                var location = target.parent.convertToNodeSpace(touch.getLocation());
                  if(target.getChildren() != null && target.getChildren().length > 0)
                  {
                        var targetRectangle = cc.rect(target.getPosition().x, target.getPosition().y, target.getChildren()[0].getBoundingBox().width, target.getChildren()[0].getBoundingBox().height);

                        if (cc.rectContainsPoint(targetRectangle, location)) {
                            context._offsetYInTouch = location.y - target.getPosition().y;
                            context._offsetXInTouch = location.x - target.getPosition().x;

                            context[funcName](target, loop);                                                        
                            return true;
                        }
                  }
                return false;
            },

            onTouchMoved:function(touch, event) {     
                this._isDragging = true;           
                var target = event.getCurrentTarget();
                var location = target.parent.convertToNodeSpace(touch.getLocation());
                  if(target.getChildren() != null && target.getChildren().length > 0)
                  {
                        var targetRectangle = target.getChildren()[0].getBoundingBox();
                        if(target.draggingEnabled) {  
                            var locationTo = cc.p(location.x - context._offsetXInTouch, location.y - context._offsetYInTouch);                          
                            target.setPosition(locationTo.x, locationTo.y);
                        }                            
                  }
            },
            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();
                
                if(!this._isDragging) {
                    var location = target.parent.convertToNodeSpace(touch.getLocation());
                    context.displayText(target.getName(),location);                    
                }
                    

                this._isDragging = false;            
            }            
        });
        cc.eventManager.addListener(listener, target);
    },   

    displayText:function(text, location) {
        var texts = text.split("_");
        if(texts && texts.length > 0) {
            var langText = texts[0];
            cc.log('text:' + langText.toLowerCase());
            this._text = new cc.LabelTTF(text, "Arial", 100)
            this._text.setName("wordMeaning");
            this._text.color = new cc.Color(255, 255, 255);
            this._text.setPosition(location.x, location.y + 1000);
            this.addChild(this._text);
            var textDropAction = new cc.MoveTo(0.5, cc.p(location.x, location.y));
            textDropAction.easing(cc.easeBackOut());
            this._text.runAction(textDropAction);            
        }
        
    },

    bindTouchListener: function (target, funcName, loop) {
        var context = this;
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                var childText = context.getChildByName("wordMeaning");
                if(childText) {
                    childText.removeFromParent();
                }
                
                var location = target.convertToNodeSpace(touch.getLocation());
                var targetSize = target.getContentSize();
                var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.
                    height);
                    
                if (cc.rectContainsPoint(targetRectangle, location)) {                    
                    context[funcName](target, loop);                    
                    return true;
                }

                return false;
            },

            onTouchMoved: function (touch, event) {
                this._isDragging = true;
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
                var target = event.getCurrentTarget();
                var location = target.parent.convertToNodeSpace(touch.getLocation());
                if(!this._isDragging) {
                    var textPos = cc.p(location.x, location.y);
                    context.displayText(target.getName(), textPos);                
                }                
                this._isDragging = false;
            }            
        });
        cc.eventManager.addListener(listener, target);
    },


    init: function () {
        var contentUrl = this._storyInformation["pages"][this._pageIndex]["contentJson"];
        this._baseDir = "";
        if(contentUrl.indexOf("/") != -1) {
            var parts = contentUrl.split("/");
            if(parts != undefined && parts.length > 0) {
                this._baseDir = parts[0];
            }
        }
        cc.log('this._baseDir:' + this._baseDir);
        this._constructedScene = ccs.load(xc.path + contentUrl, xc.path);
        this._constructedScene.node.retain();
        this._constructedScene.action.retain();
        
        this.processScene(this._constructedScene.node);
        if (this._constructedScene.node) {
            this.addChild(this._constructedScene.node,0);
        }        

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

        this.sceneTouched();
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
                    cc.log("processing:" + child.getName());
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
            this._referenceToContext = this;
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
                var soundFile = xc.path + this._referenceToContext._baseDir + "/sounds/" + soundFile + ".mp3";
                cc.loader.load(soundFile, function(err, data) {
                    if(!err) {
                        if(cc.audioEngine.isMusicPlaying()) {
                            cc.audioEngine.stopMusic();
                        }
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
        var delayAction = new cc.DelayTime(2);
        var createPlayAction = new cc.CallFunc(this._referenceToContext.playRecordedScene, this._referenceToContext);
        var playSequence = new cc.Sequence(delayAction, createPlayAction);
        this._referenceToContext.runAction(playSequence);        
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
        this._constructedScene.action.clearLastFrameCallFunc();
        this._constructedScene.action.gotoFrameAndPause(this._constructedScene.action.getCurrentFrame());
        this.renderNextButton();
        this.renderPreviousButton();                
        
        //load text file based on Current Story Id and Page index
        var langDir = goa.TextGenerator.getInstance().getLang();
        cc.log("langDir:" + langDir);
        var storyText = "";
        var that = this;
        var textFileUrl =  "res/story" + "/" + langDir + "/" + this._baseDir + ".json";
        cc.log('textFileUrl:' + textFileUrl);
        if(cc.sys.isNative) {
            var fileExists = jsb.fileUtils.isFileExist(textFileUrl);
            if(fileExists) {

                cc.loader.loadJson(textFileUrl, function(err, json) {            
                    if(!err && json != null && json != undefined) {
                        storyText = json[xc.pageIndex + 1];
                        cc.log('story text received:' + storyText);
                        that.parent.addChild(new xc.TextCreatePanel(cc.director.getWinSize().width, cc.director.getWinSize().height, cc.p(385, 250), storyText, that.processText, that.processAudio, that, false));
                    }                                
                });                
           
            } else {
                that.parent.addChild(new xc.TextCreatePanel(cc.director.getWinSize().width, cc.director.getWinSize().height, cc.p(385, 250), storyText, that.processText,that.processAudio, that, false));
            }
        } else {

            cc.loader.loadJson(textFileUrl, function(err, json) {            
                if(!err && json != null && json != undefined) {
                    storyText = json[xc.pageIndex + 1];
                    cc.log('story text received:' + storyText);
                    that.parent.addChild(new xc.TextCreatePanel(cc.director.getWinSize().width, cc.director.getWinSize().height, cc.p(385, 250), storyText, that.processText, that.processAudio, that, false));
                }                                
            });                
            
        }        
    },


    processAudio: function(sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                var langDir = goa.TextGenerator.getInstance().getLang();
                var soundFile = "res/story/" + langDir + "/" + this._baseDir + "/" + this._baseDir + "_" + (xc.pageIndex + 1) + ".ogg";
                if(cc.sys.isNative) {
                    var fileExists = jsb.fileUtils.isFileExist(soundFile);
                    if(fileExists) {
                        cc.loader.load(soundFile, function(err, data) {
                            if(!err) {
                                cc.audioEngine.playMusic(soundFile, false);
                            }
                        }); 
                    }
                } else {
                    cc.loader.load(soundFile, function(err, data) {
                        if(!err) {
                            cc.audioEngine.playMusic(soundFile, false);
                        }
                    }); 
                }             
                break;
        }
    },



    playRecordedScene: function () {
        if (this._constructedScene.node && this._constructedScene.action.getDuration() > 0) {
            this._constructedScene.node.runAction(this._constructedScene.action);
            this._constructedScene.action.play('master', false);
        } else {            
            this.playEnded();
        }
    }
});

xc.NarrateStoryScene = cc.Scene.extend({
    layerClass: null,
    _menuContext: null,
    ctor: function (pageIndex, storyInformation, layer) {
        this._super();
        this.layerClass = layer;
        this._sceneLayer = new this.layerClass(pageIndex, storyInformation);
        this.addChild(this._sceneLayer);
        this._sceneLayer.init();

        if (cc.sys.isNative) {
            this._menuContext = goa.MenuContext.create(this._sceneLayer, "Narrate Story");
            this.addChild(this._menuContext);
            this._menuContext.setVisible(true);
        }                        
                
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