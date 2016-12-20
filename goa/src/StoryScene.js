var xc = xc || {};
xc.customSprites = xc.customSprites || [];
xc.HAND_GEAR_LEFT = "hand_gear_left"; 
xc.LAYER_INIT = false;
xc.PRIMARY_COLOR = cc.color("#FF8E88");
xc.DARK_PRIMARY_COLOR = cc.color("#B2524D");
xc.SECONDARY_COLOR = cc.color("#5895CC");
xc.DARK_SECONDARY_COLOR = cc.color("#ee0a21");
xc.TERTIARY_COLOR = cc.color("#F6FF88");
xc.DEFAULT_BOUNDING_BOX_TAG = 999;
xc.DARK_BOUNDING_BOX_TAG = 998;
 
xc.StoryLayer = cc.Layer.extend({
    _pageConfigPanel: null,
    _objectConfigPanel: null,
    _contentPanelWidth: null,
    _configPanelWidth: null,
    _configPanelHeight: null,
    ctor: function () {
        this._super();
        this._name = "StoryLayer";
        this._tabHeight = 300;
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

        this._optionPanel = new xc.ScrollableButtonPanel(cc.p(0,0), cc.size(500, 500), 2, 2, xc.storyConfigurationObject.editPage, this.chooseEditPageOption, this, true);
        this._optionPanel.setVisible(false);
        this._optionPanel.setOpacity(150);
        this._optionPanel.setColor(xc.TERTIARY_COLOR);
        this.addChild(this._optionPanel, 1);


        this.createPages();
    },

    createPages: function () {
        var displayPages = [];

        if (xc.story != null && xc.story.items != null && xc.story.items.length > 0) {
            displayPages = xc.story['items'];
        } else {
            this._help = new cc.Sprite('#icons/help_click_new_page.png');
            this._help.setPosition(cc.p(200, cc.director.getWinSize().height - this._tabHeight - 150));
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
            var len = xc.story.items.length;
            copyScene.pageNumber = len + 1;
            xc.story.items[xc.pageIndex] = copyScene;
        }
        //xc.StoryScene.load(xc.StoryLayer);
        cc.director.runScene(new xc.EditStoryScene(xc.EditStoryLayer));
    },

    handleSelectItem: function (sender) {
        //create new Scene
        //find last page index   
        if (sender.getName() == 'icons/plus.png') {
            xc.pageIndex = xc.story.items.length; //new story
            this.createOrCopyPage();
        } else {
            //write to file system if native
            this.uploadStory();
            xc.CreateStoryScene.load(xc.CreateStoryLayer);
        }
    },

    uploadStory: function() {
        if(cc.sys.isNative) {
            var writablePath = jsb.fileUtils.getWritablePath() + "story.json";
            xc.storiesJSON.stories[xc.currentStoryIndex].data = xc.story;
            var fileContent = JSON.stringify(xc.storiesJSON);
            cc.log('fileContent before upload:' + fileContent);
            jsb.fileUtils.writeStringToFile(fileContent, writablePath);
        } else {
            //upload to network
            xc.storiesJSON.stories[xc.currentStoryIndex].data = xc.story;
            var fileContent = JSON.stringify(xc.storiesJSON);
            cc.log('fileContent before upload:' + fileContent);

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
        
//        this._optionPanel = new xc.ScrollableButtonPanel(cc.p(sender.getPosition().x + sender.width / 2 - 250, sender.getPosition().y - 250), cc.size(500, 500), 2, 2, xc.storyConfigurationObject.editPage, this.chooseEditPageOption, this, true);
        this._curSelectedPageIndex = sender._selectedIndex;
    },

    reDrawPages: function () {
        if (this._panel) {
            this._panel.removeFromParent(true);
            this.createPages();
        }
    },

    chooseEditPageOption: function (sender) {
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
                // xc.currentStoryIndex = this._curSelectedPageIndex; //index of selected button
                // xc.currentStoryId = xc.storiesJSON.stories[xc.currentStoryIndex].storyId;
                // cc.log("xc.currentStoryId on edit:" + xc.currentStoryId);                                
                // xc.PlayFullStoryScene.load(0,xc.PlayFullStoryLayer);
                
                xc.story.items.splice(this._curSelectedPageIndex, 1);
                xc.currentStoryIndex = xc.currentStoryIndex -1;
                if(xc.currentStoryIndex < 0) xc.currentStoryIndex = 0;
                this._optionPanel.setVisible(false);
                this.reDrawPages();
                
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
        xc.LAYER_EDIT_STORY = false; 
        cc.director.runScene(new xc.EditStoryScene(xc.EditStoryLayer)); 
    }
});

xc.StoryScene = cc.Scene.extend({
    layerClass: null,
    ctor: function (layer) {
        this._super();
        this.layerClass = layer;
        if (xc.LAYER_INIT === false) {
            xc.LAYER_INIT = true;

            this.createOrEditStory();
            this._sceneLayer = new this.layerClass();
            this.addChild(this._sceneLayer);
            this._sceneLayer.init();
            
            xc.MODIFIED_BIT = 1;
        }
    },

    createOrEditStory: function () {
        if (xc && xc.MODIFIED_BIT != 1) {
            if(xc.storiesJSON != undefined && xc.storiesJSON.stories != undefined && xc.currentStoryIndex < xc.storiesJSON.stories.length) {
                cc.log("coming heere with xc.currentStoryIndex:" + xc.currentStoryIndex);
                xc.story = xc.storiesJSON.stories[xc.currentStoryIndex].data;
                if(xc.story == undefined) {
                    xc.story = {};
                    xc.story.items = [];
                }
                cc.log('xc.story:' + JSON.stringify(xc.story));
                xc.story.RESOLUTION_HEIGHT = xc.DEVICE_HEIGHT;
                xc.storiesJSON.stories[xc.currentStoryIndex].data = xc.story;                            
            }
        }
    }    
});


xc.StoryScene.load = function(layer) {
    this._storyScene = new xc.StoryScene(layer);
    this._storyScene.layerClass = layer;
    cc.director.runScene(this._storyScene);    
}

