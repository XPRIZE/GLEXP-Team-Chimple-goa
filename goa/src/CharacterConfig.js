/// <reference path="cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />
var xc = xc || {};
 
xc.CharacterConfigLayer = cc.LayerColor.extend({
    _contentPanel: null,
    _contentPanelWidth: null,
    _contentPanelHeight: null,
    _characterNode: null,    
    _faceColorIndex: -1,
    _hairColorIndex: -1,
    _selectedConfigurationForCharacter:[],
    _selectedColorConfigurationForCharacter:[
        {
            "color":"#ff0000",
            "selectedIndex": 0
        },
        {
            "color":"#ff00ff",
            "selectedIndex": 1
        },
        {
            "color":"#f0f0f",
            "selectedIndex": 2
        }

    ],
    _context: null,
    ctor: function () {        
        this._super(xc.TERTIARY_COLOR);
        this._name = "CharacterConfigLayer";
        this._tabHeight = 0;
        this._controlPanel = null;
        this._contentPanelWidth = cc.director.getWinSize().width; //assuming landscape
        this._contentPanelHeight = cc.director.getWinSize().height - this._tabHeight;
        this._context = this;        
        return true;
    },
    itemSelected: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_ENDED:
                cc.log('sender:' + sender.getName());
                if(sender.getName() == 'shuffle') {
                    this.shuffleCharacter(sender);
                } else if(sender.getName() == 'finish') {
                    this.characterApproved(sender);
                } 
                else if(sender.getName() == 'hair') {
                    this.skinSelected("hairfront");
                    this.skinSelected("hairback");
                } else if(sender.getName() == 'haircolor') {
                    this.colorSkin(['hairfront','hairback'], true, -1);
                } else if(sender.getName() == 'facecolor') {
                    this.colorSkin(['faceshape','body'], false, -1);                    
                }                
                else {
                    this.skinSelected(sender.getName());
                }                
                break;
        }
    },

    shuffleCharacter:function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                var that = this;
                xc.characterConfigurationObject.forEach(function(element) {
                    if(element && element.items.length > 0)
                    {
                        var selectedBoneConfig = that._selectedConfigurationForCharacter.filter(function(ele) {return ele.bone == element.bone});
                        var curIndex = 0;
                        curIndex = selectedBoneConfig != undefined && selectedBoneConfig.length > 0 ? selectedBoneConfig[0].selectedItemIndex : 0;
                        var randomIndex = that.randomIntFromInterval(0, element.items.length - 1);
                        if(curIndex == randomIndex)
                        {
                            randomIndex = that.randomIntFromInterval(0, element.items.length - 1);
                        }
                        
                        that.displaySkin(element.bone, element.items[randomIndex].Image,element.items[randomIndex].AnchorPoint.ScaleX, element.items[randomIndex].AnchorPoint.ScaleY,  element.items[randomIndex].Position.X, element.items[randomIndex].Position.Y, element.items[randomIndex].Rotation ? element.items[randomIndex].Rotation.X : undefined, element.items[randomIndex].Rotation ? element.items[randomIndex].Rotation.Y : undefined, randomIndex);                    
                    }
                });  

                //update color
                var randomIndex = that.randomIntFromInterval(0, this._selectedColorConfigurationForCharacter.length - 1);            
                this.colorSkin(['hairfront','hairback'], true, randomIndex);
                    
                var randomIndex = that.randomIntFromInterval(0, this._selectedColorConfigurationForCharacter.length - 1);
                this.colorSkin(['faceshape','body'], false, randomIndex);                                  
                              
                break;

            case ccui.Widget.TOUCH_ENDED:
                break;                
        }
    },

    loadSkeletonNode: function(node) {
        var skeletonNode = null;        
        var that = this;        
        if(node != undefined && node.getChildByName("faceavatar") != undefined) {
            var fileNode = node.getChildByName("faceavatar");
            if(fileNode != undefined && fileNode.getChildren().length > 0) {
                fileNode.getChildren().forEach(function(e) {
                    if(e.getName() == 'avatar' && skeletonNode == undefined) {
                        skeletonNode =  e;                        
                    } else {
                        cc.log('e:' + e.getName());   
                        if(e.getName() == 'shuffle') {
                            e.addTouchEventListener(that.shuffleCharacter, that);
                        } else if(e.getName() == 'finish') {
                            e.addTouchEventListener(that.characterApproved, that);
                        } else {
                            e.addTouchEventListener(that.itemSelected, that);
                        }
                    }
                });
            }
        }
        return skeletonNode;
    },

    init: function () {
        this._contentPanel = new xc.CharacterConfigContentPanel(this._contentPanelWidth, this._contentPanelHeight, cc.p(this._configPanelWidth, 256));
        this.addChild(this._contentPanel);

        //add circle background node


        //add character to Scene

        var load = ccs.load(xc.CharacterConfigLayer.res.character_skeleton_json, xc.path);
        //load.node.setPosition(this._contentPanelWidth / 2, this._contentPanelHeight / 2);
        load.node.setScale(1.0);
        this._contentPanel.addChild(load.node);
        //this._characterNode = load.node;
        this._characterNode = this.loadSkeletonNode(load.node);
        if(this._characterNode != undefined) {
            //load current character state from database
            this.constructRandomizedCharacterJSON(this._characterNode);
        }
    },

    randomIntFromInterval:function (min,max)
    {
        return Math.floor(Math.random()*(max-min+1)+min);
    },

    constructRandomizedCharacterJSON: function(characterNode) {
        var cachedCharacter = cc.sys.localStorage.getItem("cachedCharacterConfig");
        var that = this;
        if(cachedCharacter) {
            //load this configuration
            //this._selectedConfigurationForCharacter = JSON.parse(cachedCharacter);
            this._selectedConfigurationForCharacter = this.convertCachedBluetoothNameToArray(cachedCharacter);
            this._selectedConfigurationForCharacter.forEach(function(element) {
                that.displaySkin(element.bone, element.itemUrl,element.anchorX, element.anchorY, element.positionX, element.positionY, element.rotationX, element.rotationY, element.selectedItemIndex);                                
            });        
        } else {
            xc.characterConfigurationObject.forEach(function(element) {
                if(element && element.items.length > 0)
                {                    
                    var randomIndex = that.randomIntFromInterval(0, element.items.length - 1);
                    that.displaySkin(element.bone, element.items[randomIndex].Image,element.items[randomIndex].AnchorPoint.ScaleX, element.items[randomIndex].AnchorPoint.ScaleY,  element.items[randomIndex].Position.X, element.items[randomIndex].Position.Y, element.items[randomIndex].Rotation ? element.items[randomIndex].Rotation.X : undefined, element.items[randomIndex].Rotation ? element.items[randomIndex].Rotation.Y : undefined, randomIndex);                    
                }
            });     

            //update color
            var randomIndex = that.randomIntFromInterval(0, this._selectedColorConfigurationForCharacter.length - 1);            
            this.colorSkin(['hairfront','hairback'], true, randomIndex);
                    
            var randomIndex = that.randomIntFromInterval(0, this._selectedColorConfigurationForCharacter.length - 1);
            this.colorSkin(['faceshape','body'], false, randomIndex);                                  
        }
    },

    characterApproved: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_ENDED:                
                cc.log(JSON.stringify(this._selectedConfigurationForCharacter));
                //cc.sys.localStorage.setItem("cachedCharacterConfig", JSON.stringify(this._selectedConfigurationForCharacter));
                cc.sys.localStorage.setItem("cachedColorConfig", this._faceColorIndex+"_"+this._hairColorIndex);
                cc.sys.localStorage.setItem("cachedCharacterConfig", this._selectedConfigurationForCharacter.map(function(a) { return a.selectedItemIndex }).join("_"));
                cc.sys.localStorage.setItem("cachedBluetoothName", "chimple_" + this._selectedConfigurationForCharacter.map(function(a) { return a.selectedItemIndex }).join("_"));
                if(this.parent._menuContext) {
                    this.parent._menuContext.transitToScrollableGameMap();
                }
                break;    
        }
    },

    convertCachedBluetoothNameToArray: function(bluetoothName) {
        //var bluetoothName = cc.sys.localStorage.getItem("cachedCharacterConfig");
        if(bluetoothName) {
            var array = bluetoothName.split('_');
            var decodedBluetoothNameToArray = [];
            if(array && array.length > 0) {
                array.forEach(function(ele, index) {
                    if(xc.characterConfigurationObject && xc.characterConfigurationObject.length > 0) {
                        var obj = xc.characterConfigurationObject[index];
                        decodedBluetoothNameToArray.push({'bone':obj.bone, 'selectedItemIndex':ele, 'itemUrl': obj.items[ele].Image, 'anchorX':obj.items[ele].AnchorPoint.ScaleX, 'anchorY':obj.items[ele].AnchorPoint.ScaleY, 'positionX':obj.items[ele].Position.X, 'positionY':obj.items[ele].Position.Y, 'rotationX':obj.items[ele].Rotation ? obj.items[ele].Rotation.X: undefined, 'rotationY':obj.items[ele].Rotation ? obj.items[ele].Rotation.Y: undefined});
                    }    
                }); 
            }
            cc.log(decodedBluetoothNameToArray);
            return decodedBluetoothNameToArray;
        }
    },

    colorSkin: function(selectedBoneNames, isHairColor, selectedIndex) {
        var incrementedIndex;
        if(selectedIndex != -1) {
            incrementedIndex = selectedIndex;
        } else {
            if(isHairColor) {
                incrementedIndex = ++this._hairColorIndex;
            } else {
                incrementedIndex = ++this._faceColorIndex; 
            }
        }
        
        var adjustedIndex = incrementedIndex % this._selectedColorConfigurationForCharacter.length;
        if(isHairColor) {
            this._hairColorIndex = adjustedIndex;
        } else {
            this._faceColorIndex =  adjustedIndex; 
        }
        
        var color = this._selectedColorConfigurationForCharacter[adjustedIndex].color;
        var that = this;
        selectedBoneNames.forEach(function(selectedBoneName) {
            var boneNode = that._characterNode.getBoneNode(selectedBoneName);
            if(boneNode && color)  {
                boneNode.getSkins().forEach(function (skin) {
                    skin.color = cc.color(color)
                });
            }
        });
    },

    skinSelected: function (selectedItemName) {
        var selectedConfigurations = xc.characterConfigurationObject.filter(function(e) {return e.bone == selectedItemName});         
        //check current selected configuration:
        if(selectedConfigurations != undefined && selectedConfigurations.length > 0) {
            selectedConfiguration = selectedConfigurations[0];
            var selectedItemIndex = -1;
            this._selectedConfigurationForCharacter.forEach(function(currentConfig) {
                if(currentConfig.bone === selectedConfiguration.bone) {
                    selectedItemIndex = currentConfig.selectedItemIndex;
                }
            });

            //increase for click
            selectedItemIndex++;
            var adjustedIndex = selectedItemIndex++ % selectedConfiguration.items.length;
            
            var itemUrl = selectedConfiguration.items[adjustedIndex].Image;
            var anchorX = undefined;
            var anchorY = undefined;
            if(selectedConfiguration.items[adjustedIndex].AnchorPoint) {
                anchorX = selectedConfiguration.items[adjustedIndex].AnchorPoint.ScaleX;
                anchorY = selectedConfiguration.items[adjustedIndex].AnchorPoint.ScaleY;
            }

            var positionX = undefined;
            var positionY = undefined;

            if(selectedConfiguration.items[adjustedIndex].Position) {
                positionX = selectedConfiguration.items[adjustedIndex].Position.X;
                positionY = selectedConfiguration.items[adjustedIndex].Position.Y;
            }

            var rotationX = undefined;
            var rotationY = undefined;
            if(selectedConfiguration.items[adjustedIndex].Rotation) {
                rotationX = selectedConfiguration.items[adjustedIndex].Rotation.X;
                rotationY = selectedConfiguration.items[adjustedIndex].Rotation.Y;
            }

            this.displaySkin(selectedConfiguration.bone, itemUrl, anchorX, anchorY, positionX, positionY, rotationX, rotationY, adjustedIndex);

            if(selectedItemName == 'faceshape') {
                var boneNode = this._characterNode.getBoneNode(selectedConfiguration.bone);
                if(this._selectedColorConfigurationForCharacter && this._selectedColorConfigurationForCharacter.length > this._faceColorIndex)
                {
                    var color = this._selectedColorConfigurationForCharacter[this._faceColorIndex].color;
                    boneNode.getSkins().forEach(function (skin) {
                        skin.color = cc.color(color);
                    });
                }
            } else if(selectedItemName == 'hairfront' || selectedItemName == 'hairback') {
                    var boneNode = this._characterNode.getBoneNode(selectedItemName);
                    if(this._selectedColorConfigurationForCharacter && this._selectedColorConfigurationForCharacter.length > this._hairColorIndex)
                    {
                        var color = this._selectedColorConfigurationForCharacter[this._hairColorIndex].color;
                        boneNode.getSkins().forEach(function (skin) {
                            skin.color = cc.color(color);
                        });
                    }                
            }
        }
    },

    displaySkin:function (bone, itemUrl, anchorX, anchorY, positionX, positionY, rotationX, rotationY, selectedItemIndex) {
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
            
            var originalIndex = this._selectedConfigurationForCharacter.map(function(e) { return e. bone; }).indexOf(bone);
            this._selectedConfigurationForCharacter = this._selectedConfigurationForCharacter.filter(function(ele) {return ele.bone != bone});
            if(originalIndex != -1) {
                this._selectedConfigurationForCharacter.splice(originalIndex, 0, {'bone':bone, 'selectedItemIndex':selectedItemIndex, 'itemUrl':itemUrl, 'anchorX':anchorX, 'anchorY':anchorY, 'positionX':positionX, 'positionY':positionY, 'rotationX':rotationX, 'rotationY': rotationY});
            } else {
                this._selectedConfigurationForCharacter.push({'bone':bone, 'selectedItemIndex':selectedItemIndex, 'itemUrl':itemUrl, 'anchorX':anchorX, 'anchorY':anchorY, 'positionX':positionX, 'positionY':positionY, 'rotationX':rotationX, 'rotationY': rotationY});
            }
            
               
            //if bone doesnt contain skin
            boneSkinNodeToAdd.getSkins().forEach(function (skin) {
                if(skin.getName() == itemUrl) {
                    alreadyContainsSkin = true;
                    skinSprite = skin;
                }
            }, this);

            if(!alreadyContainsSkin) {
                var skinSprite = new cc.Sprite(itemUrl);
                skinSprite.setName(itemUrl);
                if(positionX != undefined && positionY != undefined) {
                    skinSprite.setPosition(positionX, positionY);
                }
                
                if(anchorX != undefined && anchorY != undefined) {
                    skinSprite.setAnchorPoint(anchorX, anchorY);
                }
                if(rotationX != undefined) {
                    skinSprite.setRotationX(rotationX);
                }
                
                if(rotationY != undefined) {
                    skinSprite.setRotationY(rotationY);
                }
                
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
    cc.spriteFrameCache.addSpriteFrames(xc.CharacterConfigLayer.res.character_skeleton_plist_2);
    cc.LoaderScene.preload(t_resources, function () {            
        //config data

        if(cc.sys.isNative) {
            var jsonD = cc.loader.getRes(xc.CharacterConfigLayer.res.character_config_json);
            if(jsonD) {
                xc.characterConfigurationObject = jsonD["data"];    
            }                                    
        } else {
            var jsonD = cc.loader.getRes(xc.CharacterConfigLayer.res.character_config_json);
            if(jsonD) {
                xc.characterConfigurationObject = jsonD["data"];    
            }                                    
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
        character_skeleton_plist: xc.path + "faceavatar/faceavatar.plist",
        character_skeleton_png: xc.path + "faceavatar/faceavatar.png",
        character_skeleton_plist_2: xc.path + "faceavatar/faceavatar2/faceavatar2.plist",
        character_skeleton_png_2: xc.path + "faceavatar/faceavatar2/faceavatar2.png",        
        character_skeleton_json: xc.path + "faceavatar/faceavatar.json"
};


