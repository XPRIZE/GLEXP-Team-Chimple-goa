/// <reference path="../../src/cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />

var xc = xc || {};

xc.TestLayer = cc.Layer.extend({
  ctor: function () {
    this._super();
    var background = ccs.load(xc.TestLayer.res.train_json, xc.path);
    this.addChild(background.node);

    var a = new cc.LabelBMFont("A", xc.TestLayer.res.bb_fnt);
    a.setPosition(1280, 800);
    this.addChild(a);
    
    var b = new cc.LabelTTF("A", "Baloo Bhai", 2000);
    b.setPosition(480, 800);
    this.addChild(b);

    // var background1 = ccs.load(xc.TestLayer.res.train1_json, xc.path);
    // this.addChild(background1.node);

    // cc.spriteFrameCache.addSpriteFrames(xc.TestLayer.res.tp_plist);
    // var target = new cc.Sprite(xc.TestLayer.res.game_tile_png);
    // var shape = new cc.Sprite("#baja/bajabluecar1.png");
    // var maskedFill = new cc.ClippingNode(shape);
    // maskedFill.setAlphaThreshold(0.05);
    // maskedFill.addChild(target);
    // maskedFill.setPosition(1280, 900);
    // target.getTexture().setTexParameters(gl.LINEAR, gl.LINEAR, gl.REPEAT, gl.REPEAT);
    // target.setTextureRect(cc.rect(0, 0, 1280, 900));
    // this.addChild(maskedFill);
    
  }
});

xc.TestLayer.res = {
  train_json: xc.path + "train/train.json",
  bb_png: xc.path + "english/baloo_bhai_sd_0.png",
  bb_fnt: xc.path + "english/baloo_bhai_hdr.fnt",
  bb_ttf: xc.path + "fonts/BalooBhai-Regular.ttf"
  // train_plist: xc.path + "train/train.plist",
  // train_png: xc.path + "train/train.png"
  // game_tile_png: xc.path + "gamemap/game_tile.png",
  // tp_plist: xc.path + "baja/baja.plist",
  // tp_png: xc.path + "baja/baja.png",  
};