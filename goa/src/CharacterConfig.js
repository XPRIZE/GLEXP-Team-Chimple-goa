/// <reference path="cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />
var xc = xc || {};
 
xc.CharacterConfigLayer = cc.LayerColor.extend({
    _contentPanel: null,
    _contentPanelWidth: null,
    _contentPanelHeight: null,
    _characterNode: null,    
    _selectedConfigurationForCharacter:[],    
    ctor: function () {        
        this._super(xc.TERTIARY_COLOR);
        this._name = "CharacterConfigLayer";
        this._tabHeight = 256;
        this._controlPanel = null;
        this._contentPanelWidth = cc.director.getWinSize().width; //assuming landscape
        this._contentPanelHeight = cc.director.getWinSize().height - this._tabHeight;
        return true;
    },

    init: function () {
        this._contentPanel = new xc.CharacterConfigContentPanel(this._contentPanelWidth, this._contentPanelHeight, cc.p(this._configPanelWidth, 256));
        this.addChild(this._contentPanel);

        //add circle background node


        //add character to Scene

        var load = ccs.load(xc.CharacterConfigLayer.res.character_skeleton_json, xc.path);
        load.node.setPosition(this._contentPanelWidth / 2, this._contentPanelHeight / 2);
        load.node.setScale(2.0);
        this._contentPanel.addChild(load.node);
        this._characterNode = load.node;  
        //load current character state from database
        this.constructRandomizedCharacterJSON(this._characterNode);


        var checkButton = new ccui.Button("icons/check.png", "icons/check.png", "icons/check.png", ccui.Widget.PLIST_TEXTURE);
        checkButton.setPosition(this._contentPanelWidth * 3/4, this._contentPanelHeight / 2);
        checkButton.setAnchorPoint(0.5,0.5);
        //checkButton.setScale(3.0);
        checkButton.addTouchEventListener(this.characterApproved, this);
                                    
        this._contentPanel.addChild(checkButton);
        

        if(xc.characterConfigurationObject != undefined) {
            this._panel = new xc.ScrollableButtonPanel(cc.p(0, 0), cc.size(cc.director.getWinSize().width, this._tabHeight), 1, 1, xc.characterConfigurationObject, this.skinSelected, this);
            this.addChild(this._panel);            
        }         
    },

    randomIntFromInterval:function (min,max)
    {
        return Math.floor(Math.random()*(max-min+1)+min);
    },

    constructRandomizedCharacterJSON: function(characterNode) {
        var cachedCharacter = cc.sys.localStorage.getItem("characterBluetoothName");
        
        if(cachedCharacter) {
            //load this configuration
            //this._selectedConfigurationForCharacter = JSON.parse(cachedCharacter);
            this._selectedConfigurationForCharacter = this.convertCachedBluetoothNameToArray(cachedCharacter);
            var that = this;
            this._selectedConfigurationForCharacter.forEach(function(element) {
                that.displaySkin(element.bone, element.itemUrl, element.selectedItemIndex);                
            });        
        } else {
            var that = this;
            xc.characterConfigurationObject.forEach(function(element) {
                if(element && element.items.length > 0)
                {
                    var randomIndex = that.randomIntFromInterval(0, element.items.length - 1);
                    that.displaySkin(element.bone, element.items[randomIndex].icon, randomIndex);                    
                }
            });       
        }
    },

    characterApproved: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                cc.log(JSON.stringify(this._selectedConfigurationForCharacter));
                //cc.sys.localStorage.setItem("cachedCharacterConfig", JSON.stringify(this._selectedConfigurationForCharacter));
                cc.sys.localStorage.setItem("cachedCharacterConfig", this._selectedConfigurationForCharacter.map(function(a) { return a.selectedItemIndex }).join("_"));
                cc.sys.localStorage.setItem("cachedBluetoothName", "chimple_" + this._selectedConfigurationForCharacter.map(function(a) { return a.selectedItemIndex }).join("_"));
                if(this.parent._menuContext) {
                    this.parent._menuContext.transitToScrollableGameMap();
                }
                
        }
    },

    convertCachedBluetoothNameToArray: function() {
        var bluetoothName = cc.sys.localStorage.getItem("characterBluetoothName");
        if(bluetoothName) {
            var array = bluetoothName.split('_');
            var decodedBluetoothNameToArray = [];
            if(array && array.length > 0) {
                array.forEach(function(ele, index) {
                    if(xc.characterConfigurationObject && xc.characterConfigurationObject.length > 0) {
                        var obj = xc.characterConfigurationObject[index];
                        decodedBluetoothNameToArray.push({'bone':obj.bone, 'selectedItemIndex':ele, 'itemUrl':'#' + obj.items[ele].icon});
                    }    
                }); 
            }
            cc.log(decodedBluetoothNameToArray);
            return decodedBluetoothNameToArray;
        }
    },

    skinSelected: function (selectedItem) {
        cc.log("skin selected" + xc.characterConfigurationObject[selectedItem._selectedIndex]);
        var selectedConfiguration = xc.characterConfigurationObject[selectedItem._selectedIndex];
        cc.log(this._characterNode);

        //check current selected configuration:
        var selectedItemIndex = -1;
        this._selectedConfigurationForCharacter.forEach(function(currentConfig) {
            if(currentConfig.bone === selectedConfiguration.bone) {
                selectedItemIndex = currentConfig.selectedItemIndex;
            }
        });

        //increase for click
        selectedItemIndex++;
        var adjustedIndex = selectedItemIndex++ % selectedConfiguration.items.length;
        
        var itemUrl = '#' + selectedConfiguration.items[adjustedIndex].icon;

        this.displaySkin(selectedConfiguration.bone, itemUrl, adjustedIndex);
    },

    displaySkin:function (bone, itemUrl, selectedItemIndex) {
        var boneNode = this._characterNode.getBoneNode(bone);
        var boneSkinNodeToAdd = null;
        var subBonesMap = this._characterNode.getAllSubBonesMap();

        for (var name in subBonesMap) {
            if(bone == name) {
                boneSkinNodeToAdd = subBonesMap[name];
            }
        }                    

        //fetch adjustedIndex item, create Sprite and add to selected Bone's Skin
        var alreadyContainsSkin = false;
        var skinSprite = null;
        if(boneSkinNodeToAdd != undefined) {   
            this._selectedConfigurationForCharacter = this._selectedConfigurationForCharacter.filter(function(ele) {return ele.bone != bone});
                     
            this._selectedConfigurationForCharacter.push({'bone':bone, 'selectedItemIndex':selectedItemIndex, 'itemUrl':itemUrl});
            //if bone doesnt contain skin
            var anchorX = 0;
            var anchorY = 0;
            var position;
            var rotation;
            boneSkinNodeToAdd.getSkins().forEach(function (skin) {
                anchorX = skin.getAnchorPoint().x;
                anchorY = skin.getAnchorPoint().y;
                position = skin.getPosition();
                rotation = skin.getRotation();                
                if(skin.getName() == itemUrl) {
                    alreadyContainsSkin = true;
                    skinSprite = skin;
                }
            }, this);

            if(!alreadyContainsSkin) {
                var skinSprite = new cc.Sprite(itemUrl);
                skinSprite.setName(itemUrl);
                skinSprite.setPosition(position);
                skinSprite.setAnchorPoint(anchorX, anchorY);
                skinSprite.setRotation(rotation);
                if(skinSprite != undefined) {
                    boneSkinNodeToAdd.addSkin(skinSprite, true);
                }
            }
            boneSkinNodeToAdd.displaySkin(skinSprite, true);
        }
    }
});



xc.CharacterConfigScene = cc.Scene.extend({
    layerClass: null,
    _menuContext: null,
    ctor: function (layer) {
        this._super();
        this.layerClass = layer;
        this._sceneLayer = new this.layerClass();
        this.addChild(this._sceneLayer);
        this._sceneLayer.init();

        if (cc.sys.isNative) {
            this._menuContext = goa.MenuContext.create(this._sceneLayer, "Character Config");
            this.addChild(this._menuContext);
            this._menuContext.setVisible(false);
        }        
    }
});


xc.CharacterConfigScene.load = function(layer) {
    var t_resources = [];
    for (var i in layer.res) {
        cc.log('preloading:' + layer.res[i]);
        t_resources.push(layer.res[i]);
    }

    cc.spriteFrameCache.addSpriteFrames(xc.CharacterConfigLayer.res.thumbnails_plist);
    cc.spriteFrameCache.addSpriteFrames(xc.CharacterConfigLayer.res.character_skeleton_plist);
    cc.LoaderScene.preload(t_resources, function () {            
        //config data

        if(cc.sys.isNative) {
            xc.characterConfigurationObject = cc.loader.getRes(xc.CharacterConfigLayer.res.character_config_json);                        
        } else {
            xc.characterConfigurationObject = cc.loader.cache[xc.CharacterConfigLayer.res.character_config_json];
        }
        
        var scene = new xc.CharacterConfigScene(layer);
        scene.layerClass = layer;
        cc.director.runScene(scene);                                    
    }, this);
}

xc.CharacterConfigLayer.res = {
        thumbnails_png: xc.path + "wikitaki/thumbnails.png",
        thumbnails_plist: xc.path + "wikitaki/thumbnails.plist",
        HelloWorld_png: xc.path + "wikitaki/HelloWorld.png",
        character_config_json: xc.path + "config/characterConfig.json",
        character_skeleton_plist: xc.path + "hero/hero_Plist.plist",
        character_skeleton_png: xc.path + "hero/hero_Plist.png",
        character_skeleton_json: xc.path + "hero_skeleton.json"
};


