/// <reference path="cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />
var xc = xc || {};
xc.storyCopyRightFontSize = 70;
xc.CopyRightHandler = cc.Layer.extend({
    _width:0,
    _height: 0,
    _nodeJSON: "",
    _copyrightText: "",
    _constructedScene: null,
    ctor: function (nodeJSON, copyrightText, width, height, callback, callbackContext) {
        this._super(width, height);
        this._width = width;
        this._height = height;
        this.callback = callback;
        this._callbackContext = callbackContext;
        this._nodeJSON = nodeJSON;
        this._copyrightText = copyrightText;
        this.init();
    },

    init: function() {
        var context = this;
        this.showCopyRight();
        this.configureCopyRightText();  
        this.scheduleOnce(function() {
            context.executeCallBack();
        },1.5);
    },

    showCopyRight: function() {
        this._constructedScene = ccs.load(this._nodeJSON,xc.path);
        this._constructedScene.node.retain();

        this._constructedScene.node.setPosition(cc.director.getWinSize().width/2, cc.director.getWinSize().height/2);
        this._constructedScene.node.setAnchorPoint(cc.p(0.5,0.5));
        
        
        if (this._constructedScene.node) {            
            this._callbackContext.addChild(this._constructedScene.node,0);
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
    },    

    executeCallBack: function() {
        this.callback.call(this._callbackContext);
    }
});
