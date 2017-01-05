/// <reference path="cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />
var xc = xc || {};
xc.storyFontName = "Arial";
xc.storyFontSize = 85;
xc.storyCoverPageFontSize = 120;
xc.storyFontColor = cc.color.BLACK;
xc.highlightColor = cc.color.GRAY;
xc.NarrateStoryLayer = cc.Layer.extend({
    _contentPanel: null,
    _pageConfigPanel: null,
    _storyIndex: 0,
    _objectConfigPanel: null,
    _contentPanelWidth: null,
    _configPanelWidth: null,
    _configPanelHeight: null,
    _isTitleDisplayed: false,
    _playEnded: false,
    _playStarted: false,
    _nodeToFileNameMapping: {},
    _nodeToCurrentVerticesMapping: {},
    _menuContext: null,
    _wordMapping: {},
    _storyEnded: false,
    _resources: [],
    _content_resources: [],
    _soundId: null,

    ctor: function (pageIndex, storyInformation, resources, content_resources) {
        this._super();
        this._name = "NarrateStoryLayer";
        this._tabHeight = 64;
        this._pageIndex = pageIndex;
        this._storyInformation = storyInformation;
        this._controlPanel = null;
        this._contentPanelWidth = cc.director.getWinSize().width; //assuming landscape
        this._contentPanelHeight = cc.director.getWinSize().height; //assuming landscape
        this._configPanelWidth = (cc.director.getWinSize().width - this._contentPanelWidth) / 2;
        this._nodeToFileNameMapping = {};
        this._nodeToCurrentVerticesMapping =  {};     
        this._wordMapping = {};   
        this._storyEnded = false;
        this._resources = resources;
        this._content_resources = content_resources;

        return true;
    },

    bindTouchListenerToLayer: function(target) {
        var context = this;
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            onTouchBegan: function (touch, event) {
                if(context._playStarted) {
                    return false;
                }
                return true;
            },
            onTouchEnded: function (touch, event) {
            }            
        });
        cc.eventManager.addListener(listener, target);
    },

    bindTouchListenerToPronounceWord: function(target) {
        var context = this;
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {                
                var target = event.getCurrentTarget();                                
                var targetSize = target.getContentSize();
                var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.
                    height);
                var location = target.convertToNodeSpace(touch.getLocation());
                if (cc.rectContainsPoint(targetRectangle, location)) {
                        context.pronounceWord();
                        return true;
                }

                return false;
            }          
        });
        cc.eventManager.addListener(listener, target);
    },

    changeSkinColor: function(bone) {
        bone.getSkins().forEach(function(skin) {
            skin._originalSpriteColor = skin.color;
            skin.color = xc.highlightColor;
        });
    },

    revertSkinColor: function(bone) {
        bone.getSkins().forEach(function(skin) {
            skin.color = skin._originalSpriteColor;
        });
    },

    revertBoneColor:function(parentBone) {
        var context = this;
        parentBone.getChildBones().forEach(function(bone) {
            context.revertSkinColor(bone);
            if(bone.getChildBones().length > 0) {
                context.revertBoneColor(bone);
            }
        });
    },

    changeBoneColor:function(parentBone) {
        var context = this;
        parentBone.getChildBones().forEach(function(bone) {
            context.changeSkinColor(bone);
            if(bone.getChildBones().length > 0) {
                context.changeBoneColor(bone);
            }
        });
    },

    bindTouchListenerToSkeleton: function (target, funcName, loop) {
        var context = this;
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {

                if(context._playStarted) {
                    return false;
                }
                
                var childText = context.getChildByName("wordMeaning");
                if(childText) {
                    childText.removeFromParent();
                }
                
                var target = event.getCurrentTarget();
                var boundingBox = target.getBoundingBoxToWorld();
                this._zOrder = target.getLocalZOrder();
                if (cc.rectContainsPoint(boundingBox, touch.getLocation())) {
                    context._currentTarget = target;
                    context.changeBoneColor(target);
                    var location = target.parent.convertToNodeSpace(touch.getLocation());
                    context._offsetYInTouch = location.y - target.getPosition().y;
                    context._offsetXInTouch = location.x - target.getPosition().x;                    
                    context[funcName](target, loop);                    
                    if(target.draggingEnabled) {
                        target.actionManager.resumeTarget(target);
                        return true;
                    }
                    return true;
                } 
                return false;
            },

            onTouchMoved: function (touch, event) {
                context._isDragging = true;                
                var target = event.getCurrentTarget();
                
                var location = target.parent.convertToNodeSpace(touch.getLocation());
                var locationTo = cc.p(location.x - context._offsetXInTouch, location.y - context._offsetYInTouch);
                if (!context._previousTouch) {
                    context._previousTouch = touch.getLocationInView();
                }
                var locationPoint = touch.getLocationInView();

                var boundingBox = target.getBoundingBoxToWorld();
                if(target.draggingEnabled) {
                    target.setLocalZOrder(1);                
                    target.x = locationTo.x;
                    target.y = locationTo.y;
                }
                context._previousTouch = locationPoint;                
            },

            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();
                context.revertBoneColor(target);
                if(context._spriteColor) {
                    target.setColor(context._spriteColor);
                }

                context._spriteColor = null;
                if(target.draggingEnabled) {
                    target.setLocalZOrder(this._zOrder);
                    var action = target.actionManager.getActionByTag(target.tag, target);
                    action.pause();                                        
                }
                context._previousTouch = null;
                var location = target.parent.convertToNodeSpace(touch.getLocation());
                context.displayText(target.getName(),location);                    
                context._isDragging = false;
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
                if(context._playStarted) {
                    return false;
                }

                var childText = context.getChildByName("wordMeaning");
                if(childText) {
                    childText.removeFromParent();
                }
                
                var target = event.getCurrentTarget();
                this._zOrder = target.getLocalZOrder();
                var location = target.parent.convertToNodeSpace(touch.getLocation());
                  if(target.getChildren() != null && target.getChildren().length > 0)
                  {
                       
                        var targetRectangle = target.getBoundingBoxToWorld();
                        
                        var targetBox = target.getBoundingBox();
                        var boxX = targetBox.x;
                        var boxY = targetBox.y;
                        if(target.getChildren()[0].getBoundingBox().x < 0) {
                            boxX = boxX + target.getChildren()[0].getBoundingBox().x;    
                        } 

                        if(target.getChildren()[0].getBoundingBox().y < 0) {
                            boxY = boxY + target.getChildren()[0].getBoundingBox().y;    
                        } 
                        var childBoundingBoxRectangle = cc.rect(boxX,boxY, target.getChildren()[0].getBoundingBox().width, target.getChildren()[0].getBoundingBox().height);
                        if (cc.rectContainsPoint(targetRectangle, location) || cc.rectContainsPoint(childBoundingBoxRectangle, location)) {

                            target.getChildren().forEach(function(child) {
                                child._originalSpriteColor = child.getColor();
                                child.setColor(xc.highlightColor);
                            });
                            
                            context._currentTarget = target;
                            context._offsetYInTouch = location.y - target.getPosition().y;
                            context._offsetXInTouch = location.x - target.getPosition().x;
                            context[funcName](target, loop);                                                        
                            return true;
                        }
                  }
                return false;
            },

            onTouchMoved:function(touch, event) {     
                context._isDragging = true;           
                var target = event.getCurrentTarget();
                var location = target.parent.convertToNodeSpace(touch.getLocation());
                  if(target.getChildren() != null && target.getChildren().length > 0)
                  {
                        var targetRectangle = target.getChildren()[0].getBoundingBox();
                        if(target.draggingEnabled) {  
                            target.setLocalZOrder(1);
                            var locationTo = cc.p(location.x - context._offsetXInTouch, location.y - context._offsetYInTouch);                          
                            target.setPosition(locationTo.x, locationTo.y);
                        }                            
                  }
            },
            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();
                
                target.getChildren().forEach(function(child) {
                    child.setColor(child._originalSpriteColor);
                });
                
                context._currentTarget = null;
                var location = target.parent.convertToNodeSpace(touch.getLocation());
                context.displayText(target.getName(),location);                    
                    
                if(target.draggingEnabled) {
                    target.setLocalZOrder(this._zOrder);
                    var action = target.actionManager.getActionByTag(target.tag, target);
                    action.pause();                                        
                }
                context._currentTarget = null;
                context._isDragging = false;            
            }            
        });
        cc.eventManager.addListener(listener, target);
    },   

    displayText:function(text, location) {   
        cc.log("in displayText with Text: "  + text);     
        if(this._referenceToContext._textDisplayAnimationRunning) {            
            var mappingFound =  this.buildText(text);
            if(mappingFound) {
                this._referenceToContext.unschedule(this.removeDisplayText);
                this._referenceToContext.displayTextAnimationFinished();
            }            
        }  else 
        {
            var mappingFound = this.buildText(text);
            if(mappingFound) {
                this._referenceToContext.unschedule(this.removeDisplayText);
                this._referenceToContext._textDisplayAnimationRunning = true;      
                this._wordBoard.node.setPosition(cc.p(cc.director.getWinSize().width/2, cc.director.getWinSize().height + 650));
                var textDropAction = new cc.MoveTo(0.5, cc.p(cc.director.getWinSize().width/2, cc.director.getWinSize().height + 50));            
                textDropAction.easing(cc.easeBackOut());
                var afterDisplayTextAction = new cc.CallFunc(this._referenceToContext.displayTextAnimationFinished, this._referenceToContext);
                var textSequence = new cc.Sequence(textDropAction, afterDisplayTextAction);
                this._wordBoard.node.runAction(textSequence);                  
            }
        }     
    },

    buildText: function(text) {
        var mappingFound = false;
        
        if(this._wordMapping && this._wordMapping[text]) {
            var textField = this._wordBoard.node.getChildByName("TextField_1");
        
            text = this._wordMapping[text];
            text = text.replace(/_/g, ' ');
            if(cc.sys.isNative) {
                text = goa.TextGenerator.getInstance().translateString(text);
            }
            
            if(text) {                                
                textField.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
                textField.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                textField.setString(text.toLowerCase());    
                textField.setTouchEnabled(false);

                mappingFound = true;                
            }
        }

        return mappingFound;
    },

    beforeDisplayTextDisapperFinished: function() {
        this._referenceToContext._textDisplayAnimationRunning = true;
    },

    afterDisplayTextDisapperFinished: function() {
        this._referenceToContext._textDisplayAnimationRunning = false;
    },

    removeDisplayText: function() {
        var textDropActionDisappear = new cc.MoveTo(0.5, cc.p(cc.director.getWinSize().width/2, cc.director.getWinSize().height + 650));
        var beforeDisplayTextDisapperAction = new cc.CallFunc(this._referenceToContext.beforeDisplayTextDisapperFinished, this._referenceToContext);
        var afterDisplayTextDisapperAction = new cc.CallFunc(this._referenceToContext.afterDisplayTextDisapperFinished, this._referenceToContext);
        var textSequence = new cc.Sequence(beforeDisplayTextDisapperAction, textDropActionDisappear, afterDisplayTextDisapperAction);
        this._wordBoard.node.runAction(textSequence);

    },

    displayTextAnimationFinished: function() {        
        this._referenceToContext.scheduleOnce(this.removeDisplayText, 3);                
    },

    bindTouchListener: function (target, funcName, loop) {
        var context = this;
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                if(context._playStarted) {
                    return false;
                }
                
                var target = event.getCurrentTarget();                
                this._zOrder = target.getLocalZOrder();
                var childText = context.getChildByName("wordMeaning");
                if(childText) {
                    childText.removeFromParent();
                }
                
                var location = target.convertToNodeSpace(touch.getLocation());
                
                var targetSize = target.getContentSize();
                var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.
                    height);

                if (cc.rectContainsPoint(targetRectangle, location)) {
                    var fileName = context._nodeToFileNameMapping[target.getName()];
                    if(fileName && fileName.length > 0) {
                        var result = context.isTouchableAtPoint(target, location);
                        cc.log("RESULT " + result);
                        if(result) {
                            target._originalSpriteColor = target.getColor();
                            target.setColor(xc.highlightColor);
                            context._offsetYInTouch = location.y - target.getPosition().y;
                            context._offsetXInTouch = location.x - target.getPosition().x;
                            context._currentTarget = target;                    
                            context[funcName](target, loop);                    
                            return true;                        
                        } else {
                            return false;
                        }
                    } else {
                        target._originalSpriteColor = target.getColor();
                        target.setColor(xc.highlightColor);

                        context._offsetYInTouch = location.y - target.getPosition().y;
                        context._offsetXInTouch = location.x - target.getPosition().x;
                        
                        context._currentTarget = target;                    
                        context[funcName](target, loop);                    
                        return true;
                    }
                }

                return false;
            },

            onTouchMoved: function (touch, event) {
                context._isDragging = true;
                var target = event.getCurrentTarget();
                var targetSize = target.getContentSize();
                var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.
                    height);
                var location = target.convertToNodeSpace(touch.getLocation());
                if (cc.rectContainsPoint(targetRectangle, location)) {
                    if(target.draggingEnabled) {
                        target.setLocalZOrder(1);
                        var location = target.parent.convertToNodeSpace(touch.getLocation());                        
                        var locationTo = cc.p(location.x - context._offsetXInTouch, location.y - context._offsetYInTouch);                          
                        target.setPosition(location.x, location.y);
                    }
                }            
            },

            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();
                
                var location = target.parent.convertToNodeSpace(touch.getLocation());
                if(target._originalSpriteColor) {
                    target.setColor(target._originalSpriteColor);
                }
                target._originalSpriteColor = null;
                context._currentTarget = null;
                if(target.draggingEnabled) {
                    target.setLocalZOrder(this._zOrder);
                    var action = target.actionManager.getActionByTag(target.tag, target);
                    if(action) {
                        action.pause();
                    }
                }
                
                var textPos = cc.p(location.x, location.y);
                context.displayText(target.getName(), textPos);                
                context._isDragging = false;
            }            
        });
        cc.eventManager.addListener(listener, target);
    },


    init: function (menuContext) {
        var context = this;
        context._menuContext = menuContext;
        var contentUrl = this._storyInformation["pages"][this._pageIndex]["contentJson"];
        this._baseDir = "";
        if(contentUrl.indexOf("/") != -1) {
            var parts = contentUrl.split("/");
            if(parts != undefined && parts.length > 0) {
                this._baseDir = parts[0];
            }
        }
        cc.log('this._baseDir:' + this._baseDir);

        var langDir = goa.TextGenerator.getInstance().getLang();

        var mappingFile = "";
        mappingFile =  "res/story/eng/" + this._baseDir + ".mapping.json";
        cc.log('mappingFile:' + mappingFile);
        if(cc.sys.isNative) {
            var fileExists = jsb.fileUtils.isFileExist(mappingFile);
            if(fileExists) {

                cc.loader.loadJson(mappingFile, function(err, json) {            
                    if(!err && json != null && json != undefined) {
                        cc.log("json mapping:" + json);
                        context._wordMapping = json;
                    }                                
                });                           
            } 
        } else {

            cc.loader.loadJson(mappingFile, function(err, json) {            
                if(!err && json != null && json != undefined) {
                    cc.log("json mapping:" + json);
                    context._wordMapping = json;
                }                                
            });                
            
        }  

        
        context._pixelPerfectImages = [];

        if(xc.pixcelPerfectConfig && xc.pixcelPerfectConfig[this._baseDir])
        {
            this._pixelPerfectImages = xc.pixcelPerfectConfig[this._baseDir]
        }
        this._constructedScene = ccs.load(xc.path + contentUrl, xc.path);
        this._constructedScene.node.retain();
        this._constructedScene.action.retain();

        //rendering info
        var info = cc.loader.getRes(xc.path + contentUrl);
        if(info != undefined && info.Content != undefined && info.Content.Content != undefined && 
        info.Content.Content.ObjectData.Children != undefined ) {
            info.Content.Content.ObjectData.Children.forEach(function(child) {
                if(child && child.FileData && child.FileData.Path && child.ctype === 'SpriteObjectData')
                {
                    
                    if(context._pixelPerfectImages.indexOf("pixelperfect/" + child.FileData.Path) != -1) {
                        if(cc.sys.isNative) {
                            var fileExists = jsb.fileUtils.isFileExist("pixelperfect/" + child.FileData.Path);
                            if(fileExists) {
                                cc.log("filepath 11111 :" + xc.path + "pixelperfect/" + child.FileData.Path);
                                context._nodeToFileNameMapping[child.Name] = xc.path + "pixelperfect/" + child.FileData.Path;
                            }                        
                        }
                    }                
                }                
            });
        }

        this.processScene(this._constructedScene.node);
        if (this._constructedScene.node) {
            this._constructedScene.node.setPosition(cc.director.getWinSize().width/2, cc.director.getWinSize().height/2);
            this._constructedScene.node.setAnchorPoint(cc.p(0.5,0.5));
            this.addChild(this._constructedScene.node,0);
        }     

        this._wordBoard = ccs.load(xc.NarrateStoryLayer.res.wordBubble_json, xc.path);
        if(this._wordBoard) {
            this._wordBoard.node.retain();
            this._wordBoard.node.setPosition(cc.p(cc.director.getWinSize().width/2, cc.director.getWinSize().height + 650));
            this.addChild(this._wordBoard.node, 1);
            var textField = this._wordBoard.node.getChildByName("TextField_1");
            if(textField) {
                textField.setFontName(xc.storyFontName)
                textField.setTextColor(xc.storyFontColor);
                textField.setFontSize(xc.storyFontSize);
                textField.setString("");
            }

            var soundButton2 = this._wordBoard.node.getChildByName("sound_button_2");
            if(soundButton2) {
                this.bindTouchListenerToPronounceWord(soundButton2);
            }            

            this._wordBoard.node.setVisible(false);

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

        this._showTextAgainButton = new ccui.Button("template/template_02/text_button.png", "template/template_02/text_button_clicked.png", "template/template_02/text_button_clicked.png", ccui.Widget.PLIST_TEXTURE);
        this._showTextAgainButton.setPosition(320, cc.director.getWinSize().height - 150);
        this._showTextAgainButton.setAnchorPoint(cc.p(0.5,0.5));
        this.addChild(this._showTextAgainButton, 5);
        this._showTextAgainButton.setVisible(false);
        this._showTextAgainButton.addTouchEventListener(this.showTextAgain, this);

        // this.showText();
        this.bindTouchListenerToLayer(this);
        this.sceneTouched();

    },


    showTextAgain: function(sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                this._showTextAgainButton.setVisible(false);
                this._rightButtonPanel.setVisible(false);
                this._leftButtonPanel.setVisible(false);
                this.showText();                             
                break;
        }        
    },

    // replayScene: function(sender, type) {
    //     switch (type) {
    //         case ccui.Widget.TOUCH_ENDED:
    //             this.setUpSceneForReplay();                
    //             this._showTextAgainButton.setVisible(false);
    //             this._rightButtonPanel.setVisible(false);
    //             this._leftButtonPanel.setVisible(false);            
    //             this.sceneTouched();                 
    //             break;
    //     }        
    // },

    pronounceWord:function() {
        var textField = this._wordBoard.node.getChildByName("TextField_1");
        if(textField && textField.getString() !== "" && textField.getString().length > 0)
        {
            var word = textField.getString().toLowerCase();
            cc.log("word to pronounce:" + word);
            word = word.replace(/ /g, '_');
            if(cc.sys.isNative) {
                this.getParent()._menuContext.pronounceWord(word);    
            }            
        }
    },

    isTouchableAtPoint:function (sprite, touchPoint) {
        var vertices = this._nodeToCurrentVerticesMapping[sprite.getName()];

        if(!vertices || vertices.length == 0) {
            return false;
        }
        cc.log("vertices:" + vertices.length);        
        //return this.pointInPolygon(vertices.length, vertices, touchPoint);
        return this.checkIfPointFallsInObject(vertices.length, vertices, touchPoint);        
    },

    saveNormalizedVertices: function(sprite) {
        var fileName = this._nodeToFileNameMapping[sprite.getName()];
        if(fileName && fileName.length > 0) {
            var tVertices = [];
            if(cc.sys.isNative) {
                tVertices = this.getParent()._menuContext.getTrianglePointsForSprite(sprite, fileName, 0.0);
            } 
            this._nodeToCurrentVerticesMapping[sprite.getName()] = tVertices;
        }
    },

    checkIfPointFallsInObject: function(n, triangles, touchPoint) {
        var that = this;
        var pointInTriangle = false;
        
        triangles.some(function(trianglePoints, index) {
            if(trianglePoints && trianglePoints.length == 3) {
                var t1 = trianglePoints[0];
                var t2 = trianglePoints[1];
                var t3 = trianglePoints[2];
                if(that.ptInTriangle(touchPoint, t1, t2, t3)) {
                    cc.log('point in triangle correct');
                    pointInTriangle =  true;
                    if(pointInTriangle) {
                        return true;
                    }                    
                }
            }
        });
        return pointInTriangle;
    },

    ptInTriangle: function (p, p0, p1, p2) {
        var A = 1/2 * (-p1.y * p2.x + p0.y * (-p1.x + p2.x) + p0.x * (p1.y - p2.y) + p1.x * p2.y);
        var sign = A < 0 ? -1 : 1;
        var s = (p0.y * p2.x - p0.x * p2.y + (p2.y - p0.y) * p.x + (p0.x - p2.x) * p.y) * sign;
        var t = (p0.x * p1.y - p0.y * p1.x + (p0.y - p1.y) * p.x + (p1.x - p0.x) * p.y) * sign;
    
        return s > 0 && t > 0 && (s + t) < 2 * A * sign;
    },    

    pointInPolygon: function (n, vertices, touch) {
        var i, j, c = false;
        vertices.forEach(function(a) {
        });
        
        for (i = 0, j = n - 1; i < n; j = i++) {
            if (((vertices[i].y > touch.y) != (vertices[j].y > touch.y)) &&
                (touch.x < (vertices[j].x - vertices[i].x) * (touch.y - vertices[i].y) / (vertices[j].y - vertices[i].y) + vertices[i].x )) {

                c = !c;
            }
        }
        return c;
    },

    

    bindEventsToTarget:function(child) {
        if(child && child.getComponent("ComExtensionData") != undefined && 
                child.getComponent("ComExtensionData").getCustomProperty() != undefined
                && child.getComponent("ComExtensionData").getCustomProperty()) 
        {
            var events = [];            
            var property = ""+child.getComponent("ComExtensionData").getCustomProperty().trim();            

            if(property.indexOf(':') != -1) 
            {
                events = property.split(':');
            } 
            else if(property.indexOf(';') != -1)
            {
                events = property.split(';');
            } 
            else {
                events.push(property);
            }

            var isMultipleEvents = events && events.length > 1;

            if(isMultipleEvents) {
                child.cEvents = [];  
                child.mEvents = [];                          
            }
            child.draggingEnabled = false;
            events.forEach(function(event){
                if(event.trim() == 'drag') {
                    child.draggingEnabled = true;
                } else {                               
                    if(child instanceof ccs.SkeletonNode) {
                        if(event.indexOf("main.") != -1) {
                            child.mEvent = event;
                        } else {
                           child.cEvent = event;     
                        }                        
                    } else {
                        if(isMultipleEvents) {
                            if(event.indexOf("main.") != -1) {
                                child.mEvents.push(event);    
                            } else {
                                child.cEvents.push(event);
                            } 
                            child.isMultipleEvents = true;
                        }  else {
                            if(event.indexOf("main.") != -1) {
                                child.mEvent = event;
                            } else {
                                child.cEvent = event;
                            }                            
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
            cc.log("processing child.getName:" + child.getName());
            if(child instanceof ccs.SkeletonNode) {
                var action = child.actionManager.getActionByTag(child.tag, child);
                if(action) {
                    action.setFrameEventCallFunc(that.enterFrameEvent);
                    action._referenceToContext = that;
                }
                that.bindEventsToTarget(child);
                that.bindTouchListenerToSkeleton(child, "playAnimiation", false);    
            } else {
                if(!child.getName().startsWith("Panel")) {
                    cc.log("processing:" + child.getName());
                    if(child.getChildren() != null && child.getChildren().length > 0) {
                        that.bindEventsToTarget(child);
                        that.bindTouchListenerToSubChild(child, "playAnimationOnChild", false);                                        
                    } else {
                        that.saveNormalizedVertices(child);                        
                        that.bindEventsToTarget(child);
                        that.bindTouchListener(child, "playAnimiation", false);
                    }                                                        
                }
            }
        });         
    },

    playAnimiation: function(target, loop) {
        if(target.cEvent || (target.cEvents && target.cEvents.length > 0))
        {
            var action = target.actionManager.getActionByTag(target.tag, target);
            if(target.isMultipleEvents) {
                target.currentAnimIndex = target.currentAnimIndex == undefined ? 0 : target.currentAnimIndex;              
                cc.log("playAnimiation" + target.cEvents[target.currentAnimIndex]);
                var currentAnim = target.cEvents[target.currentAnimIndex];
                if(action) {
                    if(target.draggingEnabled) {
                        action.play(currentAnim, true);
                    } else {
                        action.play(currentAnim, false);
                    }
                    
                }
                target.currentAnimIndex = (target.currentAnimIndex + 1)  % target.cEvents.length;
            } else if(target.cEvent) {
                cc.log("playAnimiation" + target.cEvent);
                if(action) {
                    if(target.draggingEnabled) {
                        action.play(target.cEvent, true);
                    } else {
                        action.play(target.cEvent, false);    
                    }                
                }                
            }
        } 
        
        if(target.mEvent || (target.mEvents && target.mEvents.length > 0)) {
            if(target.mEvents && target.mEvents.length > 0) {
                target.mEvent = target.mEvents[0];
            }
                
            if(target.mEvent && !target.draggingEnabled) {
                var action = this._constructedScene.node.actionManager.getActionByTag(this._constructedScene.node.tag, this._constructedScene.node);
                if(action) {
                    cc.log("playAnimiation" + target.mEvent);
                    var eventForMainScene = target.mEvent.replace("main.","");
                    action.play(eventForMainScene, false);
                }
            }            
        }
    },

    playAnimationOnChild: function(target, loop) {
        if(target.cEvent || (target.cEvents && target.cEvents.length > 0))
        {
            var action = target.actionManager.getActionByTag(target.tag, target);
            if(target.isMultipleEvents) {
                target.currentAnimIndex = target.currentAnimIndex == undefined ? 0 : target.currentAnimIndex;              
                cc.log("playAnimationOnChild" + target.cEvents[target.currentAnimIndex]);
                if(action) {
                    if(target.draggingEnabled) {
                        action.play(target.cEvents[target.currentAnimIndex], true);
                    } else {
                        action.play(target.cEvents[target.currentAnimIndex], false);
                    }
                    
                }
                
                target.currentAnimIndex = (target.currentAnimIndex + 1)  % target.cEvents.length; 
            } else if(target.cEvent) {
                if(action) {    
                    if(target.draggingEnabled) {
                        action.play(target.cEvent, true);
                    }  else {
                        action.play(target.cEvent, false);
                    }             
                    
                }
            }        
        }
        
        if(target.mEvent || (target.mEvents && target.mEvents.length > 0)) {
            if(target.mEvents && target.mEvents.length > 0) {
                target.mEvent = target.mEvents[0];
            }
            if(target.mEvent && !target.draggingEnabled) {
                var action = this._constructedScene.node.actionManager.getActionByTag(this._constructedScene.node.tag, this._constructedScene.node);
                if(action) {
                    cc.log("playAnimationOnChild" + target.mEvent);
                    var eventForMainScene = target.mEvent.replace("main.","");
                    action.play(eventForMainScene, false);                    
                }
            }            
        }        
    },


    setUpSceneForReplay: function () {
        if (this._constructedScene.node) {
            this._referenceToContext = this;
            this._referenceToContext._playEnded = false;
            this._constructedScene.action._referenceToContext = this;
            this._constructedScene.action.setLastFrameCallFunc(this.rePlayEnded);
            this._constructedScene.action.setFrameEventCallFunc(this.enterFrameEvent);
            this._constructedScene.action.gotoFrameAndPause(0);            
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

    playEffect:function(event) {
        cc.log('enterFrameEvent' + event.getEvent());    
        var langDir = goa.TextGenerator.getInstance().getLang();
        var eventData = event.getEvent();
        var page = this._referenceToContext._storyInformation["pages"][this._referenceToContext._pageIndex];
        if(page && eventData) {
            var soundFile = eventData;
            if(soundFile.trim() != undefined && soundFile.trim().length > 0) {
                cc.log('soundFile 111:' + soundFile.trim());
                var soundFile = "res/sounds/sfx/" + soundFile.trim() + ".ogg";
                if(soundFile) {
                    
                    cc.loader.load(soundFile, function(err, data) {
                        if(!err) {
                            cc.audioEngine.playEffect(soundFile, false);
                        }
                    }); 
                }
            }            
        }        
    },

    skeletonFrameEvent: function(event) {
        cc.log("event on skeleton:" + event);
    },

    enterFrameEvent: function(event) {
        if(!this._referenceToContext)
        {
            return;
        }
        if(!this._referenceToContext._playEnded) {
            this._referenceToContext.playEffect(event);
        } else {
            var eventFrameTarget = event.getNode().getName();
            if(event.getNode() instanceof ccs.BoneNode) {
                eventFrameTarget = event.getNode().getParent().getParent().getName()
                if(eventFrameTarget && this._referenceToContext._currentTarget && this._referenceToContext._currentTarget.getName() == eventFrameTarget.trim()) {
                    this._referenceToContext.playEffect(event);
                }
            }  else {                
                if(eventFrameTarget && this._referenceToContext._currentTarget && this._referenceToContext._currentTarget.getName() == eventFrameTarget.trim()) {
                    this._referenceToContext.playEffect(event);
                }
            }         
        }
    },
    
    renderNextButton: function () {
        var pages = this._storyInformation["pages"];
        if (pages != null  &&  !(this._pageIndex + 1 == pages.length)) {
            this._rightButtonPanel.setVisible(true);
        } else {
            this._rightButtonPanel.setVisible(true);
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

    sceneTouched: function () {
        //load content        
        this._playStarted = true;
        var delayAction = new cc.DelayTime(2);
        var createPlayAction = new cc.CallFunc(this._referenceToContext.playRecordedScene, this._referenceToContext);
        var playSequence = new cc.Sequence(delayAction, createPlayAction);
        this._referenceToContext.runAction(playSequence);    
        
    },

    previousStory: function () {
        this._leftButtonPanel.setVisible(true);
        var pages = this._storyInformation["pages"];
        var curIndex = this._pageIndex;
        curIndex--;
        if (curIndex < 0) {
            return;
        }
        xc.NarrateStoryScene.load(curIndex, this._storyInformation, xc.NarrateStoryLayer, true);
    },

    nextStory: function () {        
        this._rightButtonPanel.setVisible(true);
        var pages = this._storyInformation["pages"];
        var curIndex = this._pageIndex; 
        curIndex++;
        var storyId = this._storyInformation["storyId"];
        xc._currentQuestionIndex = 0;
        if (curIndex >= pages.length) {
            this._storyEnded = true;
            xc._currentQuestionIndex = 0;
            var langDir = goa.TextGenerator.getInstance().getLang();
            cc.log("langDir:" + langDir);
            var storyText = "";
            var that = this;
            var questionFileUrl =  "res/story" + "/" + langDir + "/" + this._baseDir + ".questions.json";
            cc.log('questionFileUrl:' + questionFileUrl);

            if(cc.sys.isNative) {
                var fileExists = jsb.fileUtils.isFileExist(questionFileUrl);
                if(fileExists) {
                    cc.sys.localStorage.removeItem("xc.story.currentPoints");
                    //xc.StoryQuestionHandlerScene.load(storyId, this._baseDir, xc.StoryQuestionHandlerLayer, true);
                    xc.StoryQuestionTransitionScene.load(storyId, this._baseDir, xc.StoryQuestionTransitionLayer);
                } else {
                    this._menuContext.showScore();
                }
            }             
        } else {            
            cc.sys.localStorage.removeItem("xc.story.currentPoints");
            // xc.NarrateStoryScene.load(curIndex, this._storyInformation, xc.NarrateStoryLayer, true);
            xc.SceenTransitionScene.load(curIndex, this._storyInformation, xc.SceenTransitionLayer);
            //xc.StoryQuestionTransitionScene.load(storyId, this._baseDir, xc.StoryQuestionTransitionLayer);
        }
    },

    rePlayEnded: function() {
        this._referenceToContext._playEnded = true;
        this._referenceToContext.renderNextButton();
        this._referenceToContext.renderPreviousButton(); 
        this._referenceToContext._replayButton.setVisible(true);
        this._referenceToContext._showTextAgainButton.setVisible(true);                                                               
        
    },

    playEnded: function () {
        //create delay action
        this._referenceToContext._playEnded = true;
        var delayAction = new cc.DelayTime(2);
        var createWebViewAction = new cc.CallFunc(this._referenceToContext.showText, this._referenceToContext);
        var playEndSequence = new cc.Sequence(delayAction, createWebViewAction);
        this._referenceToContext.runAction(playEndSequence);                
    },
    
    showText: function() {
        this._playStarted = false;
        this._constructedScene.action.clearLastFrameCallFunc();
        this._constructedScene.action.gotoFrameAndPause(this._constructedScene.action.getCurrentFrame());
        
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
                        if(storyText && storyText.length > 0) {
                            that.parent.addChild(new xc.BubbleSpeech(xc.NarrateStoryLayer.res.textBubble_json, cc.director.getWinSize().width, cc.director.getWinSize().height, cc.p(385, 250), storyText, that.processText, that.processAudio, that));
                        } else {
                            that._wordBoard.node.setVisible(true);
                            that.renderNextButton();
                            that.renderPreviousButton(); 
                            that._replayButton.setVisible(true);
                            that._showTextAgainButton.setVisible(true);                                                               
                        }                      
                    } else {
                        that._wordBoard.node.setVisible(true);
                        that.renderNextButton();
                        that.renderPreviousButton(); 
                        that._replayButton.setVisible(true);
                        that._showTextAgainButton.setVisible(true);                                                               
                    }                            
                });                           
            } 
        } else {
            cc.loader.loadJson(textFileUrl, function(err, json) {            
                if(!err && json != null && json != undefined) {
                    storyText = json[xc.pageIndex + 1];
                    cc.log('story text received:' + storyText);
                    if(storyText && storyText.length > 0) {
                        that.parent.addChild(new xc.BubbleSpeech(xc.NarrateStoryLayer.res.textBubble_json, cc.director.getWinSize().width, cc.director.getWinSize().height, cc.p(385, 250), storyText, that.processText, that.processAudio, that));
                    } else {
                        that._wordBoard.node.setVisible(true);
                        that.renderNextButton();
                        that.renderPreviousButton();
                        that._replayButton.setVisible(true);
                        that._showTextAgainButton.setVisible(true);                                                               
                                                            
                    }
                }                                
            });                
            
        }        
    },

    processText:function(sender, type) {
        if(cc.audioEngine.isMusicPlaying()) {
            cc.audioEngine.pauseMusic();
        }        
        this._referenceToContext._wordBoard.node.setVisible(true);
        this._referenceToContext.renderNextButton();
        this._referenceToContext.renderPreviousButton();       
        this._showTextAgainButton.setVisible(true);                                                               
                 
        
    },

    processAudio: function(soundEnabled) {
        var that = this;
        var langDir = goa.TextGenerator.getInstance().getLang();
        var soundFile = "res/story/" + langDir + "/" + this._baseDir + "/" + this._baseDir + "_" + (xc.pageIndex + 1) + ".ogg";
        if(cc.sys.isNative) {
            var fileExists = jsb.fileUtils.isFileExist(soundFile);
            if(fileExists) {
                this._content_resources.push(soundFile);
                    // if(soundEnabled) {
                    //     cc.log('1111111 processAudio');
                    //     this.getParent()._menuContext.playStoryAudio(soundFile);
                    // } else {
                    //     cc.log('222222 processAudio stop');
                    //     this.getParent()._menuContext.stopStoryAudio();
                    // }
                cc.loader.load(soundFile, function(err, data) {
                    if(!err) {
                        if(soundEnabled) {
                            that._soundId = cc.audioEngine.playEffect(soundFile, false);
                        } else {
                            cc.audioEngine.pauseEffect(that._soundId);
                        }
                    }
                }); 
            }
        } else {
            cc.loader.load(soundFile, function(err, data) {
                if(!err) {
                    if(soundEnabled) {
                        that._soundId = cc.audioEngine.playEffect(soundFile, false);
                    } else {
                        cc.audioEngine.pauseEffect(that._soundId);
                    }
                }
            }); 
        }         
    },



    playRecordedScene: function () {
        if (this._constructedScene.node && this._constructedScene.action.getDuration() > 0) {
            this._constructedScene.node.runAction(this._constructedScene.action);
            this._constructedScene.action.play('master', false);
        } else {            
            this.playEnded();
        }
    },


    onExit: function() {        
        this._super();
        var that = this;
        //cc.audioEngine.stopMusic(true);
        cc.audioEngine.stopAllEffects();

        //if story ended playing then release all resources
        
            that._content_resources.forEach(function(url) {                
                if(url.endsWith(".json")) {
                    cc.log('cleaning url:' + url);
                    cc.loader.release(url);
                    delete cc.loader[url];
                    
                };   

                if(url.endsWith(".ogg")) {
                    cc.log('cleaning url:' + url);
                    cc.audioEngine.unloadEffect(url);
                }                 
            });
                
            if(that._storyEnded) {

                that._resources.forEach(function(url) {                
                    if(url.endsWith(".json")) {
                        cc.log('cleaning url:' + url);
                        cc.loader.release(url);
                        delete cc.loader[url];                        
                    };                
                });
                
                that._resources.forEach(function(url) {                    
                    if(url.endsWith(".plist")) {
                        cc.log('cleaning url:' + url);
                        cc.spriteFrameCache.removeSpriteFramesFromFile(url);
                        cc.loader.release(url);
                        delete cc.loader[url];                        
                    };   

                    if(url.endsWith(".png")) {
                        cc.log("removing image: " + url);
                        cc.textureCache.removeTextureForKey(url);
                        cc.loader.release(url);
                        delete cc.loader[url]
                    }                                 
                });

                that._resources = [];  
                that._content_resources = [];                      
            }
    }

});

xc.NarrateStoryScene = cc.Scene.extend({
    layerClass: null,
    _menuContext: null,
    ctor: function (pageIndex, storyInformation, resources, content_resources, layer) {
        this._super();
        this.layerClass = layer;
        this._sceneLayer = new this.layerClass(pageIndex, storyInformation, resources, content_resources);
        this.addChild(this._sceneLayer);
        

        if (cc.sys.isNative) {
            var storyId = storyInformation["storyId"];
            this._menuContext = goa.MenuContext.create(this._sceneLayer, storyId);
            this.addChild(this._menuContext, 10);
            this._menuContext.setVisible(true);
        }                        

        this._sceneLayer.init(this._menuContext);        
    }
});


xc.NarrateStoryScene.load = function(pageIndex, storyInformation, layer, enableTransition) {
    var that = this;
    var t_resources = [];
    var content_resources = [];
    //also push json
    var currentStoryJSON = null;
    if(storyInformation != null) {
        xc.currentStoryId = storyInformation["storyId"];
        xc.pageIndex = pageIndex;

        var storyContents = storyInformation["pages"];
        var storyResources = storyInformation["resources"];
        var coverPage = storyInformation["coverPage"];

        if(storyContents != null && pageIndex < storyContents.length) {
           
            var page = storyContents[pageIndex];
            if(page) {
                    var contentUrl = page["contentJson"];
                    if(contentUrl) {                        
                        t_resources.push(xc.path + contentUrl);
                        content_resources.push(xc.path + contentUrl);
                    }

                    if(coverPage) {
                        content_resources.push(xc.path + coverPage);
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

                    cc.loader.load(xc.NarrateStoryLayer.res.correctAnswerSound_json, function(err, data) {
                    }); 

                    cc.loader.load(xc.NarrateStoryLayer.res.wrongAnswerSound_json, function(err, data) {
                    }); 

                    cc.loader.load(xc.NarrateStoryLayer.res.pixelPerfectConfig_json, function(err, data) {
                        cc.log('data:' + data);
                        if(data && data.length > 0) {
                            xc.pixcelPerfectConfig = data[0];
                        }
                    }); 
                    

                    cc.LoaderScene.preload(t_resources, function () {
                        // cc.spriteFrameCache.addSpriteFrames(xc.NarrateStoryLayer.res.template_plist);
                        // cc.spriteFrameCache.addSpriteFrames(xc.NarrateStoryLayer.res.template_01_plist);
                        // cc.spriteFrameCache.addSpriteFrames(xc.NarrateStoryLayer.res.template_02_plist);    
                        //config data
                        if(cc.sys.isNative) {
                            xc.onlyStoryNarrateConfigurationObject = cc.loader.getRes(xc.NarrateStoryLayer.res.OnlyStoryPlayConfig_json);                         
                        } else {
                            xc.onlyStoryNarrateConfigurationObject = cc.loader.cache[xc.NarrateStoryLayer.res.OnlyStoryPlayConfig_json];
                        }
                        cc.log("content_resources" + content_resources);
                        var scene = new xc.NarrateStoryScene(pageIndex, storyInformation, t_resources, content_resources, layer);
                        scene.layerClass = layer;
                        if(enableTransition) {
                            cc.director.runScene(new cc.TransitionFade(0.5, scene, true));
                        }  else {
                            cc.director.runScene(scene);
                        }              
                    }, this);
            }
        }
    }
}



xc.NarrateStoryLayer.res = {
        OnlyStoryPlayConfig_json: xc.path + "misc/onlyPlayConfig.json",
        textBubble_json: xc.path + "template/bubble_tem.json",
        wordBubble_json: xc.path + "template/hang_bubble.json",        
        correctAnswerSound_json: "res/sounds/sfx/success.ogg",
        wrongAnswerSound_json: "res/sounds/sfx/error.ogg",
        pixelPerfectConfig_json: xc.path + "misc/pixelPerfectConfig.json"
        // template_plist: xc.path + "template/template.plist",
        // template_png: xc.path + "template/template.png",
        // template_01_png: xc.path + "template/template_01/template_01.png",
        // template_01_plist: xc.path + "template/template_01/template_01.plist",
        // template_02_png: xc.path + "template/template_02/template_02.png",
        // template_02_plist: xc.path + "template/template_02/template_02.plist",
};