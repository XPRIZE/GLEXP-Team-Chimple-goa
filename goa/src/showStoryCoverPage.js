/// <reference path="cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />
var xc = xc || {};
xc.StoryCoverPageLayer = cc.Layer.extend({
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
        this._name = "StoryCoverPageLayer";
        this._tabHeight = 64;
        this._pageIndex = pageIndex;
        this._storyInformation = storyInformation;
        this._controlPanel = null;
        this._contentPanelWidth = cc.director.getWinSize().width; //assuming landscape
        this._contentPanelHeight = cc.director.getWinSize().height; //assuming landscape
        this._configPanelWidth = (cc.director.getWinSize().width - this._contentPanelWidth) / 2;

        return true;
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

                if (cc.rectContainsPoint(targetRectangle, location)) {
                    context[funcName](target, loop);
                    return true;
                }

                return false;
            }          
        });
        cc.eventManager.addListener(listener, target);
    },

    init: function () {
        var coverPageUrl = this._storyInformation["coverPage"];
        this._baseDir = "";
        if(coverPageUrl.indexOf("/") != -1) {
            var parts = coverPageUrl.split("/");
            if(parts != undefined && parts.length > 0) {
                this._baseDir = parts[0];
            }
        }
        
        this._constructedScene = ccs.load(xc.path + coverPageUrl, xc.path);
        this._constructedScene.node.retain();
        this._constructedScene.action.retain();
        
        if (this._constructedScene.node) {
            this.addChild(this._constructedScene.node,0);
        }        
        
        this.setUpScene();

        this._playButton = new cc.Sprite(xc.NarrateStoryLayer.res.play_png);
        this._playButton.setPosition(cc.director.getWinSize().width / 2, cc.director.getWinSize().height / 2);
        this.addChild(this._playButton);        
        this.bindTouchListener(this._playButton, "sceneTouched", false, 2);
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
    
    sceneTouched: function (target) {
        if(this._storyInformation != undefined && this._storyInformation.hasOwnProperty("pages") && this._storyInformation["pages"] != undefined && this._storyInformation["pages"].length > 0) {
            cc.log('loading story:' + this._storyInformation["pages"][0]);
            xc.NarrateStoryScene.load(0, this._storyInformation, xc.NarrateStoryLayer);
        }
    }


});

xc.StoryCoverPageScene = cc.Scene.extend({
    layerClass: null,
    ctor: function (pageIndex, storyInformation, layer) {
        this._super();
        this.layerClass = layer;
        this._sceneLayer = new this.layerClass(pageIndex, storyInformation);
        this.addChild(this._sceneLayer);
        this._sceneLayer.init();
                
    }
});


xc.StoryCoverPageScene.load = function(pageIndex, storyInformation, layer, enableTransition) {
    var that = this;
    var t_resources = [];
    //also push json
    var currentStoryJSON = null;
    if(storyInformation != null) {
        xc.currentStoryId = storyInformation["storyId"];
        
        var coverPageJSON = storyInformation["coverPage"];
        var storyResources = storyInformation["resources"];

        if(coverPageJSON != null) {

            if(coverPageJSON) {
                t_resources.push(xc.path + coverPageJSON);
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

                var scene = new xc.StoryCoverPageScene(pageIndex, storyInformation, layer);
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

xc.StoryCoverPageLayer.res = {
    play_png: xc.path + "wikitaki/play.png"
};