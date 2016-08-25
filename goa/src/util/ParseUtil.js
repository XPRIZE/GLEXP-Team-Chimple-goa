var chimple = chimple || {};

chimple.ParseUtil = chimple.ParseUtil || {};

chimple.ParseUtil.copyUserAddedDataToScene = function (newScene) {
    var oldScene = chimple.story.items[chimple.pageIndex].scene;
    if (oldScene && oldScene.Content && oldScene.Content.Content
        && oldScene.Content.Content.ObjectData
        && oldScene.Content.Content.ObjectData.Children) {
        oldScene.Content.Content.ObjectData.Children.forEach(function (element) {
            if (element.UserData && element.UserData.userAdded && newScene && newScene.Content && newScene.Content.Content
                && newScene.Content.Content.ObjectData && newScene.Content.Content.ObjectData.Children) {
                newScene.Content.Content.ObjectData.Children.push(element);
            }
        }, this);
    }
}

chimple.ParseUtil.saveScene = function (newScene) {
    if (chimple.story && chimple.story.items != null) {
        chimple.story.items[chimple.pageIndex].scene = newScene;
    }
}

chimple.ParseUtil.saveObjectToStoredScene = function (jsonObject) {
    if (chimple.story && chimple.story.items != null) {
        var replace = false;
        var children = chimple.story.items[chimple.pageIndex].scene.Content.Content.ObjectData.Children;
        for (var index = 0; index < children.length; index++) {
            if (children[index].ActionTag == jsonObject.ActionTag) {
                children.splice(index, 1, jsonObject);
                replace = true;
                break;
            }
        }
        if (!replace) {
            //jsonObject.userAdded = true;
            children.push(jsonObject);
        }
        chimple.ParseUtil.saveScene(chimple.story.items[chimple.pageIndex].scene);
    }
}

chimple.ParseUtil.updateScaleRotationAndPositionObjectFromStoredScene = function (target) {
    if (chimple.story && chimple.story.items != null) {
        var children = chimple.story.items[chimple.pageIndex].scene.Content.Content.ObjectData.Children;
        for (var index = 0; index < children.length; index++) {
            var comExtensionData = target.getComponent("ComExtensionData");

            if (comExtensionData && comExtensionData.getActionTag()) {
                if (children[index].ActionTag == comExtensionData.getActionTag()) {
                    children[index].Scale.ScaleX = target.scaleX;
                    children[index].Scale.ScaleY = target.scaleY;

                    children[index].Position.X = target.x;
                    children[index].Position.Y = target.y;

                    children[index].RotationSkewX = target.rotationX;
                    children[index].RotationSkewY = target.rotationY;
                    break;
                }
            } else if (target.ActionTag) {
                if (children[index].ActionTag == target.ActionTag) {
                    children[index].Scale.ScaleX = target.scaleX;
                    children[index].Scale.ScaleY = target.scaleY;

                    children[index].Position.X = target.x;
                    children[index].Position.Y = target.y;

                    children[index].RotationSkewX = target.rotationX;
                    children[index].RotationSkewY = target.rotationY;
                    break;
                }
            }
        }
        chimple.ParseUtil.saveScene(chimple.story.items[chimple.pageIndex].scene);
    }
}

chimple.ParseUtil.updateFlipObjectFromStoredScene = function (tag, scaleX) {
    if (chimple.story && chimple.story.items != null) {
        var children = chimple.story.items[chimple.pageIndex].scene.Content.Content.ObjectData.Children;
        for (var index = 0; index < children.length; index++) {
            if (children[index].ActionTag == tag) {
                children[index].Scale.ScaleX = scaleX;
                break;
            }
        }
        chimple.ParseUtil.saveScene(chimple.story.items[chimple.pageIndex].scene);
    }
}


chimple.ParseUtil.removeObjectFromStoredScene = function (tag) {
    if (chimple.story && chimple.story.items != null) {
        var children = chimple.story.items[chimple.pageIndex].scene.Content.Content.ObjectData.Children;
        for (var index = 0; index < children.length; index++) {
            if (children[index].ActionTag == tag) {
                children.splice(index, 1);
                break;
            }
        }
        chimple.ParseUtil.saveScene(chimple.story.items[chimple.pageIndex].scene);
    }
}

chimple.ParseUtil.getUserData = function (tag, dataKey) {
    var result = null;
    if (chimple.story && chimple.story.items != null && chimple.story.items[chimple.pageIndex].scene.Content) {
        var children = chimple.story.items[chimple.pageIndex].scene.Content.Content.ObjectData.Children;
        for (var index = 0; index < children.length; index++) {
            if (children[index].ActionTag == tag) {
                var object = children[index];
                result = object.UserData[dataKey];
                break;
            }
        }
        return result;
    }
}

chimple.ParseUtil.updateUserData = function (tag, dataKey, dataValue) {
    if (chimple.story && chimple.story.items != null && chimple.story.items[chimple.pageIndex].scene.Content) {
        var children = chimple.story.items[chimple.pageIndex].scene.Content.Content.ObjectData.Children;
        for (var index = 0; index < children.length; index++) {
            if (children[index].ActionTag == tag) {
                var object = children[index];
                object.UserData[dataKey] = dataValue;
                break;
            }
        }
        chimple.ParseUtil.saveScene(chimple.story.items[chimple.pageIndex].scene);
    }
}

chimple.ParseUtil.saveCharacterToJSON = function (fileToLoad, load) {
    var resourcePath = fileToLoad.replace("res/", "");
    var skeletonObject = chimple.ParseUtil.constructJSONFromCharacter(load.node, resourcePath);
    // load.node.ActionTag = skeletonObject.ActionTag;
    chimple.ParseUtil.saveObjectToStoredScene(skeletonObject);
}

chimple.ParseUtil.constructJSONFromCharacter = function (skeleton, resourcePath) {
    var object = Object.create(Object.prototype);
    object.FileData = {};
    object.FileData.Type = "Normal";
    object.FileData.Path = resourcePath;
    object.FileData.Plist = "";

    object.InnerActionSpeed = 1.0;
    object.AnchorPoint = {
        "ScaleX": skeleton.getAnchorPoint().x,
        "ScaleY": skeleton.getAnchorPoint().y
    };

    object.Position = {
        "X": skeleton.getPosition().x,
        "Y": skeleton.getPosition().y
    };

    object.RotationSkewX = skeleton.getRotationX();
    object.RotationSkewY = skeleton.getRotationY();
    object.Scale = {
        "ScaleX": skeleton.getScaleX(),
        "ScaleY": skeleton.getScaleY()
    };
    object.CColor = {
        "R": skeleton.color.r,
        "G": skeleton.color.g,
        "B": skeleton.color.b,
        "A": skeleton.color.a
    };
    object.Tag = skeleton.tag;
    object.Size = {
        "X": skeleton.width,
        "Y": skeleton.height
    };
    object.ActionTag = -new Date().valueOf();
    if (skeleton.getComponent("ComExtensionData") == null) {
        skeleton.addComponent(new ccs.ComExtensionData());
    }
    skeleton.getComponent("ComExtensionData").setActionTag(object.ActionTag);

    object.Name = skeleton.getName();
    object.ctype = "ProjectNodeObjectData";

    var existingUserData = null;
    if (skeleton.getComponent('ComExtensionData') && skeleton.getComponent('ComExtensionData').getCustomProperty() != null
        && skeleton.getComponent('ComExtensionData').getCustomProperty().length > 0) {
        existingUserData = skeleton.getComponent('ComExtensionData').getCustomProperty();
    } else {
        existingUserData = {};
    };

    existingUserData.currentAnimationName = skeleton._currentAnimationName;
    existingUserData.resourcePath = resourcePath;
    existingUserData.userAdded = true;
    object.UserData = existingUserData;

    skeleton._actionTag = object.ActionTag;
    skeleton._userData = object.UserData;

    return object;
}

chimple.ParseUtil.constructJSONFromCCSprite = function (sprite) {

    var object = Object.create(Object.prototype);
    object.FlipX = sprite._flippedX;
    object.FlipY = sprite._flippedY;
    object.FileData = {};
    object.FileData.Type = "Normal";
    if (sprite.getTexture().url != null) {
        var path = sprite.getTexture().url.replace("res/", "");
        object.FileData.Path = path;
    }
    object.FileData.Plist = "";
    object.BlendFunc = {
        "Src": sprite.getBlendFunc.src,
        "Dst": sprite.getBlendFunc.dst
    };

    object.AnchorPoint = {
        "ScaleX": sprite.getAnchorPoint().x,
        "ScaleY": sprite.getAnchorPoint().y
    };

    object.Position = {
        "X": sprite.getPosition().x,
        "Y": sprite.getPosition().y
    };

    object.RotationSkewX = sprite.getRotationX();
    object.RotationSkewY = sprite.getRotationY();
    object.Scale = {
        "ScaleX": sprite.getScaleX(),
        "ScaleY": sprite.getScaleY()
    };
    object.CColor = {
        "R": sprite.color.r,
        "G": sprite.color.g,
        "B": sprite.color.b,
        "A": sprite.color.a
    };
    object.IconVisible = false;
    object.Size = {
        "X": sprite.getBoundingBox().width,
        "Y": sprite.getBoundingBox().height
    };
    object.Tag = sprite.tag;
    if (sprite.getName().indexOf("%%") === -1) {
        sprite.setName(sprite.getName() + "%%" + chimple.ParseUtil.generateUUID());
    }
    object.ActionTag = -new Date().valueOf();
    if (sprite.getComponent("ComExtensionData") == null) {
        sprite.addComponent(new ccs.ComExtensionData());
    }
    sprite.getComponent("ComExtensionData").setActionTag(object.ActionTag);

    object.Name = sprite.getName();
    object.ctype = "SpriteObjectData";

    var existingUserData = {};

    existingUserData.userAdded = true;
    object.UserData = existingUserData;
    object.userData = existingUserData;
    sprite.userData = object.UserData;
    return object;
}

chimple.ParseUtil.constructJSONFromText = function (panel, resourcePath) {
    //create panel data
    var panelObject = Object.create(Object.prototype);
    panelObject.ClipAble = panel.clippingEnabled;
    panelObject.BackColorAlpha = panel.getBackGroundColorOpacity();

    panelObject.FileData = {};
    panelObject.FileData.Type = "Normal";
    resourcePath = resourcePath.replace("/", "");
    panelObject.FileData.Path = resourcePath;

    panelObject.FileData.Plist = "";

    panelObject.ComboBoxIndex = panel.getBackGroundColorType();
    panelObject.SingleColor = {
        "R": panel.getBackGroundColor().r,
        "G": panel.getBackGroundColor().g
    };

    panelObject.FirstColor = {
        "R": panel.getBackGroundColor().r,
        "G": panel.getBackGroundColor().g
    };
    panelObject.EndColor = {};

    panelObject.ColorVector = {
        "ScaleX": panel.getBackGroundColorVector().x,
        "ScaleY": panel.getBackGroundColorVector().y
    };

    panelObject.Scale9Enable = panel.isBackGroundImageScale9Enabled();
    panelObject.Scale9OriginX = panel.getBackGroundImageCapInsets().x;
    panelObject.Scale9OriginY = panel.getBackGroundImageCapInsets().y;
    panelObject.Scale9Width = panel.getBackGroundImageCapInsets().width;
    panelObject.Scale9Height = panel.getBackGroundImageCapInsets().height;
    panelObject.TouchEnable = panel.touchEnabled;
    panelObject.AnchorPoint = {
        "ScaleX": panel.getAnchorPoint().x,
        "ScaleY": panel.getAnchorPoint().y
    };
    panelObject.Position = {
        "X": panel.getPosition().x,
        "Y": panel.getPosition().y
    };

    panelObject.Scale = {
        "ScaleX": panel.getScaleX(),
        "ScaleY": panel.getScaleY()
    };

    panelObject.CColor = {

    };

    panelObject.Tag = new Date().valueOf();
    panelObject.ActionTag = -new Date().valueOf();

    panelObject.Size = {
        "X": panel.getContentSize().width,
        "Y": panel.getContentSize().height
    };

    panelObject.Name = "ChimpleTextPanel";
    panelObject.ctype = "PanelObjectData";

    var textNode = panel.children[0];
    var textObject = Object.create(Object.prototype);

    textObject.IsCustomSize = !textNode.isIgnoreContentAdaptWithSize();
    textObject.FontSize = textNode.fontSize;

    textObject.LabelText = textNode.getString();
    textObject.OutlineColor = {
        "G": 0,
        "B": 0
    };
    textObject.ShadowColor = {
        "R": 110,
        "G": 110,
        "B": 110
    };
    textObject.ShadowOffsetX = 2.0;
    textObject.ShadowOffsetY = -2.0;

    textObject.AnchorPoint = {
        "ScaleX": textNode.getAnchorPoint().x,
        "ScaleY": textNode.getAnchorPoint().y
    };
    textObject.Position = {
        "X": textNode.getPosition().x,
        "Y": textNode.getPosition().y
    };
    textObject.Scale = {
        "ScaleX": textNode.getScaleX(),
        "ScaleY": textNode.getScaleY()
    };
    textObject.CColor = {
        "R": textNode.getTextColor().r,
        "G": textNode.getTextColor().g,
        "B": textNode.getTextColor().b
    };

    textObject.Tag = new Date().valueOf();
    textObject.ActionTag = -new Date().valueOf();
    textObject.Size = {
        "X": textNode.getContentSize().width,
        "Y": textNode.getContentSize().height
    };
    textObject.Name = textNode.name;
    textObject.ctype = "TextObjectData";

    panelObject.Children = [textObject];

    return panelObject;
}

chimple.ParseUtil.constructJSONFromTextNode = function (textNode, resourcePath) {
    var object = Object.create(Object.prototype);
    object.FileData = {};
    object.FileData.Type = "Normal";
    object.FileData.Path = resourcePath;
    object.FileData.Plist = "";

    object.AnchorPoint = {
        "ScaleX": textNode.getAnchorPoint().x,
        "ScaleY": textNode.getAnchorPoint().y
    };

    object.Position = {
        "X": textNode.getPosition().x,
        "Y": textNode.getPosition().y
    };

    object.RotationSkewX = textNode.getRotationX();
    object.RotationSkewY = textNode.getRotationY();
    object.Scale = {
        "ScaleX": textNode.getScaleX(),
        "ScaleY": textNode.getScaleY()
    };
    object.CColor = {
        "R": textNode.color.r,
        "G": textNode.color.g,
        "B": textNode.color.b,
        "A": textNode.color.a
    };
    object.tag = textNode.tag;
    object.Size = {
        "X": textNode.width,
        "Y": textNode.height
    };
    object.ActionTag = -new Date().valueOf();
    object.Name = textNode.getName();
    object.ctype = "ProjectNodeObjectData";
    return object;
}

chimple.ParseUtil.generateUUID = function () {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}


chimple.ParseUtil.changeSize = function (obj, name, scaleFactor) {
    if (obj['ChimpleCompressed']) {
        return;
    }
    if (obj['ctype'] && obj['ctype'] == 'PointFrameData') {
        name = obj['ctype'];
    }
    for (var key in obj) {
        var element = obj[key];
        if (name == 'Size' || name == 'Position' || name == 'PointFrameData') {
            if (key == 'X' || key == 'Y') {
                obj[key] = obj[key] / scaleFactor;
            }
        }
        if (typeof (element) == 'object') {
            this.changeSize(element, key, scaleFactor);
        }
    }
}


chimple.ParseUtil.disableFavoriteChoiceIfCharacterAlreadyLoadedInPage = function (item, itemConfiguration) {
    if (itemConfiguration && itemConfiguration['uniqueCharacterID'] &&
        chimple.story.items[chimple.pageIndex].scene.Content && chimple.story.items[chimple.pageIndex].scene.Content.Content
        && chimple.story.items[chimple.pageIndex].scene.Content.Content.ObjectData) {
        chimple.story.items[chimple.pageIndex].scene.Content.Content.ObjectData.Children.forEach(function (child) {
            if (child.UserData && child.UserData.uniqueCharacterID == itemConfiguration['uniqueCharacterID']) {
                item.setEnabled(false);
            }
        }, this);
    }
}


chimple.ParseUtil.cacheThumbnailForFavorites = function (skeleton) {
    var renderer = new cc.RenderTexture(64 * 4, 64 * 4);
    // skeleton._renderCmd._dirtyFlag = 1;
    renderer.begin();
    skeleton.visit();
    // skeleton._renderCmd._dirtyFlag = 1;
    renderer.end();
    renderer.scaleY = -1;
    // skeleton._renderCmd._dirtyFlag = 1;
    var sprite = renderer.getSprite();
    var cacheName = 'res/' + skeleton._userData.uniqueCharacterID + '.png';
    // cc.textureCache.cacheImage(cacheName, sprite.texture);
    renderer.cleanup();
}

chimple.ParseUtil.removeExistingBoundingBoxNodeByTag = function (tag, removeFromNode) {
    if (!tag) {
        tag = chimple.DEFAULT_BOUNDING_BOX_TAG;
    }

    if (!removeFromNode) {
        removeFromNode = chimple.currentTouchedNode;
    }
    if (removeFromNode) {
        var boundingBoxNode = removeFromNode.getChildByTag(tag);
        if (boundingBoxNode) {
            boundingBoxNode.removeFromParent(true);
        }
    }
}

chimple.ParseUtil.drawBoundingBox = function (target, tag, color) {
    var box = null;
    //set up defaults for tag and color
    if (!tag) {
        tag = chimple.DEFAULT_BOUNDING_BOX_TAG;
    }

    if (!color) {
        color = chimple.SECONDARY_COLOR;
    }

    this.removeExistingBoundingBoxNodeByTag(tag);

    if (target.getName().indexOf("Skeleton") != -1 || target.getName().indexOf("skeleton") != -1) {
        box = target.getBoundingBoxToWorld();
        var dn = new cc.DrawNode();
        dn.clear();
        dn.tag = tag;
        target.addChild(dn);
        if (target.getName().indexOf("birdskeleton") != -1) {
            dn.drawRect(cc.p(-box.width / (Math.abs(target.getScaleX())), -box.height / (2 * Math.abs(target.getScaleX()))), cc.p(box.width / (2 * Math.abs(target.getScaleX())), box.height / Math.abs(target.getScaleX())), null, 3, color);
        } else {
            dn.drawRect(cc.p(-box.width / (2 * Math.abs(target.getScaleX())), 0), cc.p(box.width / (2 * Math.abs(target.getScaleX())), box.height / Math.abs(target.getScaleX())), null, 3, color);
        }
    } else {
        box = target.getBoundingBox();
        var dn = new cc.DrawNode();
        dn.clear();
        dn.tag = tag;
        target.addChild(dn);
        dn.drawRect(cc.p(0, 0), cc.p(box.width / Math.abs(target.getScaleX()), box.height / Math.abs(target.getScaleX())), null, 3, color);
    }

    if (color == chimple.SECONDARY_COLOR) {
        chimple.currentTouchedNode = target;
    }

}


chimple.ParseUtil.deflate = function (chimpleStory) {
    // var Base64 = { _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (e) { var t = ""; var n, r, i, s, o, u, a; var f = 0; e = Base64._utf8_encode(e); while (f < e.length) { n = e.charCodeAt(f++); r = e.charCodeAt(f++); i = e.charCodeAt(f++); s = n >> 2; o = (n & 3) << 4 | r >> 4; u = (r & 15) << 2 | i >> 6; a = i & 63; if (isNaN(r)) { u = a = 64 } else if (isNaN(i)) { a = 64 } t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a) } return t }, decode: function (e) { var t = ""; var n, r, i; var s, o, u, a; var f = 0; e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); while (f < e.length) { s = this._keyStr.indexOf(e.charAt(f++)); o = this._keyStr.indexOf(e.charAt(f++)); u = this._keyStr.indexOf(e.charAt(f++)); a = this._keyStr.indexOf(e.charAt(f++)); n = s << 2 | o >> 4; r = (o & 15) << 4 | u >> 2; i = (u & 3) << 6 | a; t = t + String.fromCharCode(n); if (u != 64) { t = t + String.fromCharCode(r) } if (a != 64) { t = t + String.fromCharCode(i) } } t = Base64._utf8_decode(t); return t }, _utf8_encode: function (e) { e = e.replace(/\r\n/g, "\n"); var t = ""; for (var n = 0; n < e.length; n++) { var r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r) } else if (r > 127 && r < 2048) { t += String.fromCharCode(r >> 6 | 192); t += String.fromCharCode(r & 63 | 128) } else { t += String.fromCharCode(r >> 12 | 224); t += String.fromCharCode(r >> 6 & 63 | 128); t += String.fromCharCode(r & 63 | 128) } } return t }, _utf8_decode: function (e) { var t = ""; var n = 0; var r = c1 = c2 = 0; while (n < e.length) { r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r); n++ } else if (r > 191 && r < 224) { c2 = e.charCodeAt(n + 1); t += String.fromCharCode((r & 31) << 6 | c2 & 63); n += 2 } else { c2 = e.charCodeAt(n + 1); c3 = e.charCodeAt(n + 2); t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63); n += 3 } } return t } }

    // var compressed = JSONC.pack( chimpleStory );
    // return compressed;

    // var binaryChimpleStoryJSON = pako.deflate(chipleStoryJSON, { to: 'string' });
    // var base64endcoedStoryJSONStr = Base64.encode(binaryChimpleStoryJSON);
    // return base64endcoedStoryJSONStr;

    var chipleStoryJSON = JSON.stringify(chimpleStory);
    var compressed = LZString.compressToEncodedURIComponent(chipleStoryJSON);
    return compressed;
}

chimple.ParseUtil.inflate = function (base64CompressedJSON) {
    // var Base64 = { _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (e) { var t = ""; var n, r, i, s, o, u, a; var f = 0; e = Base64._utf8_encode(e); while (f < e.length) { n = e.charCodeAt(f++); r = e.charCodeAt(f++); i = e.charCodeAt(f++); s = n >> 2; o = (n & 3) << 4 | r >> 4; u = (r & 15) << 2 | i >> 6; a = i & 63; if (isNaN(r)) { u = a = 64 } else if (isNaN(i)) { a = 64 } t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a) } return t }, decode: function (e) { var t = ""; var n, r, i; var s, o, u, a; var f = 0; e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); while (f < e.length) { s = this._keyStr.indexOf(e.charAt(f++)); o = this._keyStr.indexOf(e.charAt(f++)); u = this._keyStr.indexOf(e.charAt(f++)); a = this._keyStr.indexOf(e.charAt(f++)); n = s << 2 | o >> 4; r = (o & 15) << 4 | u >> 2; i = (u & 3) << 6 | a; t = t + String.fromCharCode(n); if (u != 64) { t = t + String.fromCharCode(r) } if (a != 64) { t = t + String.fromCharCode(i) } } t = Base64._utf8_decode(t); return t }, _utf8_encode: function (e) { e = e.replace(/\r\n/g, "\n"); var t = ""; for (var n = 0; n < e.length; n++) { var r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r) } else if (r > 127 && r < 2048) { t += String.fromCharCode(r >> 6 | 192); t += String.fromCharCode(r & 63 | 128) } else { t += String.fromCharCode(r >> 12 | 224); t += String.fromCharCode(r >> 6 & 63 | 128); t += String.fromCharCode(r & 63 | 128) } } return t }, _utf8_decode: function (e) { var t = ""; var n = 0; var r = c1 = c2 = 0; while (n < e.length) { r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r); n++ } else if (r > 191 && r < 224) { c2 = e.charCodeAt(n + 1); t += String.fromCharCode((r & 31) << 6 | c2 & 63); n += 2 } else { c2 = e.charCodeAt(n + 1); c3 = e.charCodeAt(n + 2); t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63); n += 3 } } return t } };

    var base64DecodedChimpleStoryJSON = LZString.decompressFromEncodedURIComponent(base64CompressedJSON);
    return JSON.parse(base64DecodedChimpleStoryJSON);

    // var base64DecodedChimpleStoryJSON = Base64.decode(base64CompressedJSON);
    // var restoredBase64EncodedChimpleStoryJSON = pako.inflate(base64DecodedChimpleStoryJSON, { to: 'string' });
    // return JSON.parse(restoredBase64EncodedChimpleStoryJSON);

    // var json = JSONC.unpack( base64CompressedJSON );
    // return json; 
}