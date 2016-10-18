/// <reference path="cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />
var xc = xc || {};
 
xc.RenderBluetoothPeersLayer = cc.LayerColor.extend({
    _contentPanel: null,
    _contentPanelWidth: null,
    _contentPanelHeight: null,
    _characterNode: null,    
    _panel:null,
    _selectedConfigurationForCharacter:[],
    _discoveredConfiguration:[],
    ctor: function () {        
        this._super(xc.TERTIARY_COLOR);
        this._name = "RenderBluetoothPeersLayer";
        this._tabHeight = 256;
        this._controlPanel = null;
        this._contentPanelWidth = cc.director.getWinSize().width - this._tabHeight; //assuming landscape
        this._contentPanelHeight = cc.director.getWinSize().height - this._tabHeight;
        return true;
    },

    init: function () {         
        if(cc.sys.localStorage.getItem("discoveredBluetoothDevices")) {
            this._discoveredConfiguration = cc.sys.localStorage.getItem("discoveredBluetoothDevices").split(',');
        }
        var offset = 400;
        var index = 0;
        var that = this;

        cc.eventManager.addCustomListener("launch_game_with_peer_event", function(event) {
            var result = cc.sys.localStorage.getItem("connectionResult");
            cc.log('connection result:' + result);
            if(result == 'connected') {
                var jsGameName = cc.sys.localStorage.getItem("jsMultiPlayerGame");
                var cplusGameName = cc.sys.localStorage.getItem("cplusMultiPlayerGame");
                
                if(jsGameName != undefined && xc.multiPlayerGameMap[jsGameName]) {
                    xc.GameScene.load(xc.multiPlayerGameMap[jsGameName]);
                } else if(cplusGameName != undefined && that.getParent()._menuContext != undefined) {
                    that.getParent()._menuContext.launchGame(cplusGameName);
                }
            } else {
                //failed to connect
                if(jsGameName != undefined) {
                    xc.GameScene.loadMultiPlayerGame(xc.multiPlayerGameMap[jsGameName], jsGameName);
                }
                                
            }   
        });          

         

        this._panel = new xc.ScrollableButtonPanel(cc.p(0, this._tabHeight), cc.size(cc.director.getWinSize().width, cc.director.getWinSize().height - 2* this._tabHeight), 1, 1, this._discoveredConfiguration, this.skinSelected, this, false, false, this);
        this.addChild(this._panel);                                
    },

    createCustomChild: function (item, context, index, position) {
        if(context._discoveredConfiguration && context._discoveredConfiguration.length > index) {
            //get configuration
            var configuration = context._discoveredConfiguration[index];

            //create node
            var load = ccs.load(xc.RenderBluetoothPeersLayer.res.character_skeleton_json, xc.path);
            load.node.setPosition(position);

            var configs = configuration.split('-');
            
            var charConfig;
            var addressConfig;

            if(configs != undefined && configs.length == 2) {
                charConfig = configs[0];
                addressConfig = configs[1];
                item.bluetoothAddress = addressConfig;
                var selectedConfigurationForCharacter = context.convertCachedBluetoothNameToArray(charConfig);
                selectedConfigurationForCharacter.forEach(function(element) {
                    context.displaySkin(load.node, element.bone, element.itemUrl, element.anchorX, element.anchorY, element.positionX, element.positionY, element.rotationX, element.rotationY, element.selectedItemIndex);
                });                        
            }
            return load.node;
            //return load.node.getChildren()[0].getChildren()[0];            
        }
    },

    skinSelected: function (selectedItem) {
        cc.log('item:' + selectedItem.bluetoothAddress);
        if(selectedItem.bluetoothAddress && cc.sys.isNative) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "connectToAddress", "(Ljava/lang/String;)V", selectedItem.bluetoothAddress);
        }        
    },

    convertCachedBluetoothNameToArray: function(configuration) {
        if(configuration) {
            var array = configuration.split('_');
            var decodedBluetoothNameToArray = [];
            if(array && array.length > 0) {
                array.forEach(function(ele, index) {
                    if(xc.RenderBluetoothPeersConfigObject && xc.RenderBluetoothPeersConfigObject.data && xc.RenderBluetoothPeersConfigObject.data.length > 0) {
                        var obj = xc.RenderBluetoothPeersConfigObject.data[index];
                        //this._selectedConfigurationForCharacter.push({'bone':bone, 'selectedItemIndex':selectedItemIndex, 'itemUrl':itemUrl, 'anchorX':anchorX, 'anchorY':anchorY, 'positionX':positionX, 'positionY':positionY, 'rotationX':rotationX, 'rotationY': rotationY});
                        var rotationX = obj.items[parseInt(ele)].Rotation ? obj.items[parseInt(ele)].Rotation.X : 0;
                        var rotationY = obj.items[parseInt(ele)].Rotation ? obj.items[parseInt(ele)].Rotation.Y : 0;
                        decodedBluetoothNameToArray.push({'bone':obj.bone, 'selectedItemIndex':ele, 'itemUrl':obj.items[parseInt(ele)].Image, 'anchorX':obj.items[parseInt(ele)].AnchorPoint.ScaleX, 'anchorY':obj.items[parseInt(ele)].AnchorPoint.ScaleY, 'positionX':obj.items[parseInt(ele)].Position.X, 'positionY':obj.items[parseInt(ele)].Position.Y, 'rotationX':rotationX, 'rotationY': rotationY});
                    }    
                }); 
            }
            cc.log(decodedBluetoothNameToArray);
            return decodedBluetoothNameToArray;
        }
    },    
    
    displaySkin:function (skeletonNode, bone, itemUrl, anchorX, anchorY, positionX, positionY, rotationX, rotationY, selectedItemIndex) {
        var boneNode = skeletonNode.getBoneNode(bone);
        var boneSkinNodeToAdd = null;
        var subBonesMap = skeletonNode.getAllSubBonesMap();

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
                skinSprite.setPosition(cc.p(positionX, positionY));
                skinSprite.setAnchorPoint(anchorX, anchorY);
                skinSprite.setRotation(rotation);
                if(skinSprite != undefined) {
                    boneSkinNodeToAdd.addSkin(skinSprite, true);
                }
            }
            boneSkinNodeToAdd.displaySkin(skinSprite, true);
        }
    },
    onExit: function () {
        this._super();
        cc.log('remoign custom event');
        cc.eventManager.removeCustomListeners("launch_game_with_peer_event")
    }    
    
});



xc.RenderBluetoothPeersScene = cc.Scene.extend({
    layerClass: null,
    _menuContext: null,
    ctor: function (layer) {
        this._super();
        this.layerClass = layer;
        this._sceneLayer = new this.layerClass();
        this._sceneLayer.setOpacity(100);        
        this.addChild(this._sceneLayer);        
        this._sceneLayer.init();

        if (cc.sys.isNative) {
            this._menuContext = goa.MenuContext.create(this._sceneLayer, "Character Config");
            this.addChild(this._menuContext);
            this._menuContext.setVisible(false);
        }        
    }
});


xc.RenderBluetoothPeersScene.load = function(layer) {
    var t_resources = [];
    for (var i in layer.res) {
        cc.log('preloading:' + layer.res[i]);
        t_resources.push(layer.res[i]);
    }

    cc.spriteFrameCache.addSpriteFrames(xc.RenderBluetoothPeersLayer.res.thumbnails_plist);
    cc.spriteFrameCache.addSpriteFrames(xc.RenderBluetoothPeersLayer.res.character_skeleton_plist);
    cc.spriteFrameCache.addSpriteFrames(xc.RenderBluetoothPeersLayer.res.character_skeleton_plist_2);
    
    cc.LoaderScene.preload(t_resources, function () {            
        //config data

        if(cc.sys.isNative) {
            xc.RenderBluetoothPeersConfigObject = cc.loader.getRes(xc.RenderBluetoothPeersLayer.res.character_config_json);                        
        } else {
            xc.RenderBluetoothPeersConfigObject = cc.loader.cache[xc.RenderBluetoothPeersLayer.res.character_config_json];
        }
        
        var scene = new xc.RenderBluetoothPeersScene(layer);        
        scene.layerClass = layer;
        cc.director.pushScene(scene);                                    
    }, this);
}

xc.RenderBluetoothPeersLayer.res = {
        thumbnails_png: xc.path + "wikitaki/thumbnails.png",
        thumbnails_plist: xc.path + "wikitaki/thumbnails.plist",
        HelloWorld_png: xc.path + "wikitaki/HelloWorld.png",
        character_config_json: xc.path + "config/characterConfig.json",
        character_skeleton_plist: xc.path + "faceavatar/faceavatar.plist",
        character_skeleton_png: xc.path + "faceavatar/faceavatar.png",
        character_skeleton_plist_2: xc.path + "faceavatar/faceavatar2/faceavatar2.plist",
        character_skeleton_png_2: xc.path + "faceavatar/faceavatar2/faceavatar2.png",        
        character_skeleton_json: xc.path + "faceavatar/avatar.json"
};


