var xc = xc || {};
xc.customSprites = xc.customSprites || [];
xc.HAND_GEAR_LEFT = "hand_gear_left"; 
xc.PRIMARY_COLOR = cc.color("#FF8E88");
xc.DARK_PRIMARY_COLOR = cc.color("#B2524D");
xc.SECONDARY_COLOR = cc.color("#5895CC");
xc.DARK_SECONDARY_COLOR = cc.color("#ee0a21");
xc.TERTIARY_COLOR = cc.color("#F6FF88");
xc.DEFAULT_BOUNDING_BOX_TAG = 999;
xc.DARK_BOUNDING_BOX_TAG = 998;
xc.DEVICE_HEIGHT = 1800;
xc.DESIGNED_WIDTH = 2560;
xc.DESIGNED_HEIGHT = 1800;
xc.contentPanelScaleFactor = xc.DESIGNED_HEIGHT/xc.DESIGNED_WIDTH;
 
xc.CreateStoryLayer = cc.Layer.extend({
    _contentPanel: null,
    _pageConfigPanel: null,
    _objectConfigPanel: null,
    _contentPanelWidth: null,
    _configPanelWidth: null,
    _configPanelHeight: null,
    ctor: function () {
        this._super();
        this._name = "CreateStoryLayer";
        this._tabHeight = 256;
        this._controlPanel = null;
        this._contentPanelWidth = cc.director.getWinSize().height; //assuming landscape
        this._configPanelWidth = (cc.director.getWinSize().width - this._contentPanelWidth) / 2;
        this._configPanelHeight = cc.director.getWinSize().height;
        return true;
    },

    init: function () {
        //create new content panel for showing all stories
        //add button panel
        this._buttonPanel = new xc.ButtonPanel(new cc.p(0, cc.director.getWinSize().height - this._tabHeight), cc.size(cc.director.getWinSize().width, this._tabHeight), 1, 1, xc.storyConfigurationObject.createStory, new xc.ButtonHandler(this.handleSelectItem, this));
        this._buttonPanel.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this._buttonPanel.setBackGroundColor(xc.PRIMARY_COLOR);

        this.addChild(this._buttonPanel, 2);
        this._optionPanel = new xc.ScrollableButtonPanel(cc.p(0,0), cc.size(500, 500), 2, 2, xc.storyConfigurationObject.editPage, this.chooseEditPageOption, this, true);
       this._optionPanel.setVisible(false);
        this._optionPanel.setOpacity(150);
        this._optionPanel.setColor(xc.TERTIARY_COLOR);
        this.addChild(this._optionPanel, 1);
        
        this.createStoriesUI();
    },

    createStoriesUI: function () {
        var displayStories = [];

        if (xc.storiesJSON != null && xc.storiesJSON.stories != null && xc.storiesJSON.stories.length > 0) {
            displayStories = xc.storiesJSON.stories;
        } else {
            this._help = new cc.Sprite('#icons/help_click_new_page.png');
            this._help.setPosition(cc.p(200, cc.director.getWinSize().height - this._tabHeight - 150));
            this._help.setAnchorPoint(0, 1);
            this.addChild(this._help, 1);
        }

        // this._panel = new xc.ScrollableButtonPanel(cc.p(0, 0), cc.size(cc.director.getWinSize().width, cc.director.getWinSize().height - this._tabHeight), 4, 4, displayStories, this.loadOptions, this, false, true);
        this._panel = new xc.StoryCreateScrollableButtonPanel(cc.p(0, 0), cc.size(cc.director.getWinSize().width, cc.director.getWinSize().height), 4, 4, displayStories, this.loadOptions, this, false, true);
        this.addChild(this._panel);
    },

    createNewStory: function () {
        //create story template
        var storyDoc = {};
        storyDoc.storyId = "storyId_" + xc.ParseUtil.generateUUID();
        xc.currentStoryId = storyDoc.storyId;
        cc.log('creating new story with id:' + xc.currentStoryId);
        storyDoc.icon = "icons/page.png";
        storyDoc.cIcon = "icons/page.png";
        xc.storiesJSON.stories.push(storyDoc);
        xc.isNewPage = true;
        xc.LAYER_INIT = false;
        xc.MODIFIED_BIT = 0;
        xc.StoryScene.load(xc.StoryLayer);
    },

    handleSelectItem: function (sender) {
        //create new Scene
        //find last page index   
        if (sender.getName() == 'icons/plus.png') {
            xc.currentStoryIndex = xc.storiesJSON.stories.length;
            cc.log('xc.currentStoryIndex:' + xc.currentStoryIndex);
            this.createNewStory();
        } 
    },

    loadOptions: function (sender) {
        if(!this._optionPanel) {
            this._optionPanel = new xc.ScrollableButtonPanel(cc.p(sender.getPosition().x - 150, sender.getPosition().y - 250), cc.size(500, 500), 2, 2, xc.storyConfigurationObject.editPage, this.chooseEditPageOption, this, true);
            this.addChild(this._optionPanel, 1);
        } else {
            this._optionPanel.setPosition(cc.p(sender.getPosition().x - 150, sender.getPosition().y - 250));
            this._optionPanel.setVisible(true);
        }
        this._curSelectedStoryIndex = sender._selectedIndex;
        xc.currentStoryIndex = this._curSelectedStoryIndex; 
    },

    reDrawPages: function () {
        if (this._panel) {
            this._panel.removeFromParent(true);
            this.createStoriesUI();
        }
    },

    chooseEditPageOption: function (sender) {

        if (sender.getName() == 'icons/edit.png') {
            xc.MODIFIED_BIT = 0;
            xc.LAYER_INIT = false;
            this.loadExistingStory(sender);
        } else if (sender.getName() == 'icons/back.png') {
            if (this._curSelectedStoryIndex != 0) {
                this.shuffleStory(xc.storiesJSON.stories, this._curSelectedStoryIndex, this._curSelectedStoryIndex - 1);
                this.reDrawPages();
                var button = this._panel.getButtonByIndex(this._curSelectedStoryIndex - 1);
                this.loadOptions(button);
            }

        } else if (sender.getName() == 'icons/next_arrow.png') {
            if (this._curSelectedStoryIndex < xc.storiesJSON.stories.length - 1) {
                this.shuffleStory(xc.storiesJSON.stories, this._curSelectedStoryIndex, this._curSelectedStoryIndex + 1);
                this.reDrawPages();
                var button = this._panel.getButtonByIndex(this._curSelectedStoryIndex + 1);
                if(this._curSelectedStoryIndex + 1 == (this._panel._numButtonsPerRow * this._panel._numButtonsPerColumn)) {
                    this._panel.moveRightAutomatically(this._curSelectedStoryIndex + 1);
                }
                this.loadOptions(button);

            }
        } else if (sender.getName() == 'icons/delete.png') {            
            if (xc.storiesJSON.stories && xc.storiesJSON.stories.length > this._curSelectedStoryIndex) {
                var deleteStoryId = xc.storiesJSON.stories[this._curSelectedStoryIndex].storyId;
                cc.log('delete story Id:' + deleteStoryId);
                if(deleteStoryId) {
                    var imagePath = jsb.fileUtils.getWritablePath() + deleteStoryId + ".jpg";
                    cc.log("path to delete" + imagePath);
                    jsb.fileUtils.removeFile(imagePath);   
                }
                
                xc.storiesJSON.stories.splice(this._curSelectedStoryIndex, 1);

                if(cc.sys.isNative) {
                    var writablePath = jsb.fileUtils.getWritablePath() + "story.json";
                    var fileContent = JSON.stringify(xc.storiesJSON);
                    cc.log('fileContent before upload:' + fileContent);
                    jsb.fileUtils.writeStringToFile(fileContent, writablePath);
                } else {
                    var fileContent = JSON.stringify(xc.storiesJSON);
                    cc.log('fileContent before upload:' + fileContent);
                }                

                this._optionPanel.setVisible(false);
                this.reDrawPages();

            }
        }
    },

    shuffleStory: function (arr, fromIndex, toIndex) {
        var element = arr[fromIndex];
        arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, element);
    },

    loadExistingStory: function (sender) {
        xc.currentStoryIndex = this._curSelectedStoryIndex; //index of selected button
        xc.isNewPage = false;
        if(xc.currentStoryIndex < xc.storiesJSON.stories.length) {
            xc.currentStoryId = xc.storiesJSON.stories[xc.currentStoryIndex].storyId;
            cc.log("xc.currentStoryId on edit:" + xc.currentStoryId);
            xc.LAYER_EDIT_STORY = false; 
            xc.StoryScene.load(xc.StoryLayer);         
        }
    }
});

xc.CreateStoryScene = cc.Scene.extend({
    layerClass: null,
    ctor: function (layer) {
        this._super();
        this.layerClass = layer;
        this.loadAllStories();
        this._sceneLayer = new this.layerClass();
        this.addChild(this._sceneLayer);
        this._sceneLayer.init();
    },

    loadAllStories: function () {
        //load all stories from existing story JSON
        if(!xc.storiesJSON) {
           if(cc.sys.isNative) {
                xc.storiesJSON = {};
                xc.storiesJSON.stories = [];
                var writablePath = jsb.fileUtils.getWritablePath();
                var existingStoriesStr = jsb.fileUtils.getStringFromFile(writablePath+'story.json');
                if(!(!existingStoriesStr || 0 === existingStoriesStr.length)) {
                    xc.storiesJSON = JSON.parse(existingStoriesStr);
                    cc.log('existingStoriesStr:' + existingStoriesStr);
                }
           } else {
                xc.storiesJSON = {};
                xc.storiesJSON.stories = [];
           }
        }

        //load all stories  
    }
});


xc.CreateStoryScene.load = function(layer) {
    var t_resources = [];
    for (var i in layer.res) {
        cc.log('preloading:' + layer.res[i]);
        t_resources.push(layer.res[i]);
    }

    cc.LoaderScene.preload(t_resources, function () {            
        //config data
        cc.spriteFrameCache.addSpriteFrames(xc.CatalogueLayer.res.thumbnails_plist);
        cc.spriteFrameCache.addSpriteFrames(xc.CatalogueLayer.res.record_animation_plist);
        cc.spriteFrameCache.addSpriteFrames(xc.CatalogueLayer.res.book_cover_plist);
        
        if(cc.sys.isNative) {
            xc.storyConfigurationObject = cc.loader.getRes(xc.CreateStoryLayer.res.Config_json);
            xc.storyPlayConfigurationObject = cc.loader.getRes(xc.CreateStoryLayer.res.EditPlayConfig_json);
            xc.onlyStoryPlayConfigurationObject = cc.loader.getRes(xc.CreateStoryLayer.res.OnlyStoryPlayConfig_json);
            xc.onlyStoryPlayConfigurationObject = cc.loader.getRes(xc.CreateStoryLayer.res.OnlyStoryPlayConfig_json); 
                        
        } else {
            xc.storyConfigurationObject = cc.loader.cache[xc.CreateStoryLayer.res.Config_json];
            //Edit
            xc.storyPlayConfigurationObject = cc.loader.cache[xc.CreateStoryLayer.res.EditPlayConfig_json];    
            //Play
            xc.onlyStoryPlayConfigurationObject = cc.loader.cache[xc.CreateStoryLayer.res.OnlyStoryPlayConfig_json];
        }
        xc.initalCharacterCategories = xc.storyConfigurationObject.addObjects[1].categories.length;
        xc.customCharacters = {};
        xc.customCharacters.cIcon = "icons/fav_character_onclick.png";
        xc.customCharacters.icon = "icons/fav_character.png";
        xc.customCharacters.items = [];
        xc.customCharacters.name = "favCharacters";
        
        var scene = new xc.CreateStoryScene(layer);
        scene.layerClass = layer;
        cc.director.runScene(scene);                                    
    }, this);
}

xc.CreateStoryLayer.res = {
        thumbnails_png: xc.path + "wikitaki/thumbnails.png",
        thumbnails_plist: xc.path + "wikitaki/thumbnails.plist",
        human_skeleton_png: xc.path + "wikitaki/human_skeleton.png",
        human_skeleton_plist: xc.path + "wikitaki/human_skeleton.plist",
        animalskeleton_png: xc.path + "wikitaki/animalskeleton.png",
        animalskeleton_plist: xc.path + "wikitaki/animalskeleton.plist",
        animalskeleton_json: xc.path + "wikitaki/animalskeleton.json",
        birdskeleton_png: xc.path + "wikitaki/birdskeleton.png",
        birdskeleton_plist: xc.path + "wikitaki/birdskeleton.plist",
        birdskeleton_json: xc.path + "wikitaki/birdskeleton.json",
        HelloWorld_png: xc.path + "wikitaki/HelloWorld.png",
        human_skeleton_json: xc.path + "wikitaki/human_skeleton.json",
        play_png: xc.path + "wikitaki/play.png",
        record_animation_png: xc.path + "wikitaki/recording.png",
        record_animation_plist: xc.path + "wikitaki/recording.plist",
        Config_json: xc.path + "wikitaki/misc/storyConfig.json",
        EditPlayConfig_json: xc.path + "wikitaki/misc/playConfig.json",
        OnlyStoryPlayConfig_json: xc.path + "wikitaki/misc/onlyPlayConfig.json",
        book_json: xc.path + "template/book.json",
        book_cover_plist: xc.path + "template.plist",
        book_cover_json: xc.path + "template.png"        
};


