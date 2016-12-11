/// <reference path="cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />
var xc = xc || {};
xc.storyCopyRightFontSize = 70;
xc.NativeCopyRightHandlerLayer = cc.Layer.extend({
    _nodeJSON: "",
    _copyrightText: "",
    _constructedScene: null,
    _baseDir:null,
    ctor: function (nodeJSON, copyrightText,baseDir) {
        this._super(cc.director.getWinSize().width, cc.director.getWinSize().height);
        this._baseDir = baseDir;
        this._nodeJSON = nodeJSON;
        this._copyrightText = copyrightText;
        this.init();
    },

    init: function() {
        var context = this;
        this.showCopyRight();
        this.configureCopyRightText();
        
        this.scheduleOnce(function() {
            context.getParent()._menuContext.showScore();
        },1.5);
    },

    showCopyRight: function() {
        this._constructedScene = ccs.load(this._nodeJSON,xc.path);
        this._constructedScene.node.retain();

        this._constructedScene.node.setPosition(cc.director.getWinSize().width/2, cc.director.getWinSize().height/2);
        this._constructedScene.node.setAnchorPoint(cc.p(0.5,0.5));
                
        if (this._constructedScene.node) {            
            this.addChild(this._constructedScene.node,0);
        }                        
    },


    configureCopyRightText: function() {
        //randomize array
        //find out question node
        var panel = this._constructedScene.node.getChildByName("Panel_1");
        if(panel) {
            this._copyrightTextNode =  panel.getChildByName("TextField_1");
            if(this._copyrightTextNode) {
                this._copyrightTextNode.setAnchorPoint(cc.p(0.5,0.5));
                this._copyrightTextNode.setFontSize(xc.storyCopyRightFontSize);
                this._copyrightTextNode.setTextColor(xc.storyFontColor);
                this._copyrightTextNode.setFontName(xc.storyFontName);
                this._copyrightTextNode.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
                this._copyrightTextNode.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                this._copyrightTextNode.setTouchEnabled(false);
                this._copyrightTextNode.setString(this._copyrightText);            
            }               
        }
    }
});


xc.NativeCopyRightHandlerScene = cc.Scene.extend({
    layerClass: null,
    _menuContext: null,
    ctor: function (storyId, nodeJSON, copyrightText, storyBaseDir, layer, totalPoints, currentPoints) {
        this._super();
        this.layerClass = layer;
        this._sceneLayer = new this.layerClass(nodeJSON, copyrightText, storyBaseDir);
        this.addChild(this._sceneLayer);
        if (cc.sys.isNative) {
            this._menuContext = goa.MenuContext.create(this._sceneLayer, storyId);
            this._menuContext.setMaxPoints(totalPoints);
            this._menuContext.addPoints(currentPoints);
            this.addChild(this._menuContext, 10);
            this._menuContext.setVisible(true);
        }                                        
        
        this._sceneLayer.init(this._menuContext);
    }
});


xc.NativeCopyRightHandlerScene.load = function(storyId, storyBaseDir, layer, totalPoints, currentPoints) {
    var that = this;
    var t_resources = [];
   
    if(storyBaseDir != null) {           
        for (var i in layer.res) {
            cc.log('preloading:' + layer.res[i]);
            t_resources.push(layer.res[i]);
        }        
        cc.LoaderScene.preload(t_resources, function () {

            var langDir = goa.TextGenerator.getInstance().getLang();
            cc.log("langDir:" + langDir);
            var copyrightText = "";            
            var textFileUrl =  "res/story" + "/" + langDir + "/" + storyBaseDir + ".json";
            cc.log('textFileUrl:' + textFileUrl);
            if(cc.sys.isNative) {
                var fileExists = jsb.fileUtils.isFileExist(textFileUrl);
                if(fileExists) {

                    cc.loader.loadJson(textFileUrl, function(err, json) {            
                        if(!err && json != null && json != undefined) {
                            copyrightText = json["copyright"];
                            cc.log('copyrightTextreceived:' + copyrightText);
                            var scene = new xc.NativeCopyRightHandlerScene(storyId, xc.NativeCopyRightHandlerLayer.res.copyright_json, copyrightText, storyBaseDir, layer, totalPoints, currentPoints);
                            scene.layerClass = layer;
                            cc.director.runScene(scene);                                    

                        }                                
                    });                
            
                } 
            } else {
                cc.loader.loadJson(textFileUrl, function(err, json) {            
                    if(!err && json != null && json != undefined) {
                        copyrightText = json["copyright"];
                        cc.log('copyrightTextreceived:' + copyrightText);
                        var scene = new xc.NativeCopyRightHandlerScene(xc.NativeCopyRightHandlerLayer.res.copyright_json, copyrightText, storyBaseDir, layer, totalPoints, currentPoints);
                        scene.layerClass = layer;
                        cc.director.runScene(scene);                                    
                    }                                
                });                            
            }        
            

        }, this);            
    }
}

xc.NativeCopyRightHandlerLayer.res = {
    copyright_json: xc.path + "template/copyright.json"
};