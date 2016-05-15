var chimple = chimple || {};

chimple.ParseUtil = chimple.ParseUtil || {};

chimple.ParseUtil.saveScene = function (scene) {
    if (chimple.story && chimple.story.items != null) {
        chimple.story.items[chimple.pageIndex].scene = scene;
    }
}

chimple.ParseUtil.saveObjectToStoredScene = function (jsonObject) {
    if (chimple.story && chimple.story.items != null) {
        var replace = false;
        let children = chimple.story.items[chimple.pageIndex].scene.Content.Content.ObjectData.Children;
        for (var index = 0; index < children.length; index++) {
            if (children[index].ActionTag == jsonObject.ActionTag) {
                children.splice(index, 1, jsonObject);
                replace = true;
                break;
            }
        }
        if (!replace) {
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

chimple.ParseUtil.updateUserData = function (tag, dataKey, dataValue) {
    if (chimple.story && chimple.story.items != null) {
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
    cc.log('got file:' + fileToLoad);
    var resourcePath = fileToLoad.replace("/res/", "");
    cc.log('resourcePath:' + resourcePath);
    cc.log('skeleton:' + load.node);
    var skeletonObject = chimple.ParseUtil.constructJSONFromCharacter(load.node, resourcePath);
    // load.node.ActionTag = skeletonObject.ActionTag;
    cc.log('JSON.stringify(skeletonObject):' + JSON.stringify(skeletonObject));
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
        var path = sprite.getTexture().url.replace("/res/", "");
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

    if (sprite.getComponent('ComExtensionData') && sprite.getComponent('ComExtensionData').getCustomProperty() != null) {
        object.UserData = sprite.getComponent('ComExtensionData').getCustomProperty();
    };
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
    if(obj['ChimpleCompressed']) {
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