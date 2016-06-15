var targetSquareBox1 = [];

var Level11Layer = cc.Layer.extend({
  sprite: null,
  targetSquareBox: [],
  dinoscore: 0,

  ctor: function () {
    this._super();
    var size = cc.winSize;
    this.setName('levelLayer');
    dinoscore = 0;
    self = this;

    cc.spriteFrameCache.addSpriteFrames(res.dinolevel1);
    var dinosprite = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("level1/BG.png"));
    dinosprite.attr({
      x: size.width / 2,
      y: size.height / 2,
      anchorX : .5,
      anchorY : .5
    });
    this.addChild(dinosprite);

    var dinohome= new ClickedButtonToRedirect("menu/home.png", "popupMenu", this);
      dinohome.attr({
       x : 2400,
       y : 1700,
         anchorX : .5,
         anchorY : .5
     });
      this.addChild(dinohome);

    dot_a = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
    dot_a.attr({
      x: (444/1280)*cc.winSize.width,
      y: (723/800)*cc.winSize.height,
     anchorX : 0.5,
     anchorY : 0.5,
      });
      console.log(dot_a);
    this.addChild(dot_a, 0);
    this.targetSquareBox.push(dot_a.getBoundingBox());

    dot_b = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
    dot_b.attr({
      x: (364/1280)*cc.winSize.width,
      y: (725/800)*cc.winSize.height,
      anchorX : 0.5,
     anchorY : 0.5,
      });
    this.addChild(dot_b, 0);
    this.targetSquareBox.push(dot_b.getBoundingBox());

    dot_c = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
    dot_c.attr({
      x: (322/1280)*cc.winSize.width,
      y: (702/800)*cc.winSize.height,
      anchorX : 0.5,
     anchorY : 0.5,
      });
        console.log(dot_c);
    this.addChild(dot_c, 0);
    this.targetSquareBox.push(dot_c.getBoundingBox());

    dot_d = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
    dot_d.attr({
      x: (291/1280)*cc.winSize.width,
      y: (670/800)*cc.winSize.height,
     anchorX : 0.5,
     anchorY : 0.5,
      });
    this.addChild(dot_d, 0);
    this.targetSquareBox.push(dot_d.getBoundingBox());

    dot_e = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
    dot_e.attr({
      x: (288/1280)*cc.winSize.width,
      y: (613/800)*cc.winSize.height,
     anchorX : 0.5,
     anchorY : 0.5,
      });
    this.addChild(dot_e, 0);
    this.targetSquareBox.push(dot_e.getBoundingBox());

    dot_f = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
    dot_f.attr({
      x: (290/1280)*cc.winSize.width,
      y: (550/800)*cc.winSize.height,
     anchorX : 0.5,
     anchorY : 0.5,
      });
    this.addChild(dot_f, 0);
    this.targetSquareBox.push(dot_f.getBoundingBox());

    dot_g = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
    dot_g.attr({
      x: (315/1280)*cc.winSize.width,
      y: (500/800)*cc.winSize.height,
      anchorX : 0.5,
     anchorY : 0.5,
      });
    this.addChild(dot_g, 0);
    this.targetSquareBox.push(dot_g.getBoundingBox());

    dot_h = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
    dot_h.attr({
      x: (368/1280)*cc.winSize.width,
      y: (435/800)*cc.winSize.height,
      anchorX : 0.5,
     anchorY : 0.5,
      });
    this.addChild(dot_h, 0);
    this.targetSquareBox.push(dot_h.getBoundingBox());

    dot_i = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
    dot_i.attr({
      x: (410/1280)*cc.winSize.width,
      y: (326/800)*cc.winSize.height,
     anchorX : 0.5,
     anchorY : 0.5,
      });
    this.addChild(dot_i, 0);
    this.targetSquareBox.push(dot_i.getBoundingBox());

    dot_j = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
    dot_j.attr({
      x: (410/1280)*cc.winSize.width,
      y: (220/800)*cc.winSize.height,
      anchorX : 0.5,
     anchorY : 0.5,
      });
    this.addChild(dot_j, 0);
    this.targetSquareBox.push(dot_j.getBoundingBox());

    dot_k = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
    dot_k.attr({
      x: (450/1280)*cc.winSize.width,
      y: (390/800)*cc.winSize.height,
      anchorX : 0.5,
     anchorY : 0.5,
      });
    this.addChild(dot_k, 0);
    this.targetSquareBox.push(dot_k.getBoundingBox());

    dot_l = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
    dot_l.attr({
      x: (514/1280)*cc.winSize.width,
      y: (399/800)*cc.winSize.height,
      anchorX : 0.5,
     anchorY : 0.5,
      });
    this.addChild(dot_l, 0);
    this.targetSquareBox.push(dot_l.getBoundingBox());

    dot_m = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
    dot_m.attr({
      x: (556/1280)*cc.winSize.width,
      y: (424/800)*cc.winSize.height,
     anchorX : 0.5,
     anchorY : 0.5,
      });
    this.addChild(dot_m, 0);
    this.targetSquareBox.push(dot_m.getBoundingBox());

    dot_n = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
    dot_n.attr({
      x: (635/1280)*cc.winSize.width,
      y: (440/800)*cc.winSize.height,
     anchorX : 0.5,
     anchorY : 0.5,
      });
    this.addChild(dot_n, 0);
    this.targetSquareBox.push(dot_n.getBoundingBox());

    dot_o = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
    dot_o.attr({
      x: (701/1280)*cc.winSize.width,
      y: (420/800)*cc.winSize.height,
     anchorX : 0.5,
     anchorY : 0.5,
      });
    this.addChild(dot_o, 0);
    this.targetSquareBox.push(dot_o.getBoundingBox());

    dot_p = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
    dot_p.attr({
      x: (670/1280)*cc.winSize.width,
      y: (332/800)*cc.winSize.height,
      anchorX : 0.5,
     anchorY : 0.5,
      });
    this.addChild(dot_p, 0);
    this.targetSquareBox.push(dot_p.getBoundingBox());

    dot_q = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
    dot_q.attr({
      x: (640/1280)*cc.winSize.width,
      y: (273/800)*cc.winSize.height,
     anchorX : 0.5,
     anchorY : 0.5,
      });
    this.addChild(dot_q, 0);
    this.targetSquareBox.push(dot_q.getBoundingBox());

    dot_r = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
    dot_r.attr({
      x: (681/1280)*cc.winSize.width,
      y: (217/800)*cc.winSize.height,
    anchorX : 0.5,
     anchorY : 0.5,
      });
    this.addChild(dot_r, 0);
    this.targetSquareBox.push(dot_r.getBoundingBox());

    dot_s = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
    dot_s.attr({
      x: (762/1280)*cc.winSize.width,
      y: (407/800)*cc.winSize.height,
    anchorX : 0.5,
     anchorY : 0.5,
      });
    this.addChild(dot_s, 0);
    this.targetSquareBox.push(dot_s.getBoundingBox());

    dot_t = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
    dot_t.attr({
      x: (814/1280)*cc.winSize.width,
      y: (417/800)*cc.winSize.height,
     anchorX : 0.5,
     anchorY : 0.5,
      });
    this.addChild(dot_t, 0);
    this.targetSquareBox.push(dot_t.getBoundingBox());

    dot_u = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
    dot_u.attr({
      x: (873/1280)*cc.winSize.width,
      y: (428/800)*cc.winSize.height,
      anchorX : 0.5,
     anchorY : 0.5,
      });
    this.addChild(dot_u, 0);
    this.targetSquareBox.push(dot_u.getBoundingBox());

    dot_v = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
    dot_v.attr({
      x: (921/1280)*cc.winSize.width,
      y: (443/800)*cc.winSize.height,
      anchorX : 0.5,
     anchorY : 0.5,
      });
    this.addChild(dot_v, 0);
    this.targetSquareBox.push(dot_v.getBoundingBox());

    dot_w = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
    dot_w.attr({
      x: (970/1280)*cc.winSize.width,
      y: (467/800)*cc.winSize.height,
      anchorX : 0.5,
     anchorY : 0.5,
      });
    this.addChild(dot_w, 0);
    this.targetSquareBox.push(dot_w.getBoundingBox());

    dot_x = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
    dot_x.attr({
      x: (1020/1280)*cc.winSize.width,
      y: (490/800)*cc.winSize.height,
      anchorX : 0.5,
     anchorY : 0.5,
      });
    this.addChild(dot_x, 0);
    this.targetSquareBox.push(dot_x.getBoundingBox());

    dot_y = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
    dot_y.attr({
      x: (1055/1280)*cc.winSize.width,
      y: (520/800)*cc.winSize.height,
     anchorX : 0.5,
     anchorY : 0.5,
      });
    this.addChild(dot_y, 0);
    this.targetSquareBox.push(dot_y.getBoundingBox());

    dot_z = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
    dot_z.attr({
      x: (1085/1280)*cc.winSize.width,
      y: (546/800)*cc.winSize.height,
      anchorX : 0.5,
     anchorY : 0.5,
      });
    this.addChild(dot_z, 0);
    this.targetSquareBox.push(dot_z.getBoundingBox());

    dino_a = new MovableItem("level1/A.png", dinoscore);
    dino_a.attr({
      x: 793,
      y: cc.winSize.height - 168,
     anchorX : 0,
     anchorY : 1
     });
    dino_a.id = 1;
    this.addChild(dino_a, 1);

    dino_b = new MovableItem("level1/B.png", dinoscore);
    dino_b.attr({
      x: 671,
      y: cc.winSize.height - 196,
      anchorX : 0,
      anchorY : 1
     });
    dino_b.id = 2;
    this.addChild(dino_b, 1);

    dino_c = new MovableItem("level1/C.png", dinoscore);
    dino_c.attr({
      x: 596,
      y: cc.winSize.height - 239,
    anchorX : 0,
    anchorY : 1
    });
    dino_c.id = 3;
    this.addChild(dino_c, 1);

    dino_d = new MovableItem("level1/D.png", dinoscore);
    dino_d.attr({
      x: 532,
      y: cc.winSize.height -307,
     anchorX : 0,
    anchorY : 1
    });
    dino_d.id = 4;
    this.addChild(dino_d, 1);

    dino_e = new MovableItem("level1/E.png", dinoscore);
    dino_e.attr({
      x: 519,
      y: cc.winSize.height -414,
    anchorX : 0,
    anchorY : 1
    });
    dino_e.id = 5;
    this.addChild(dino_e, 1);

    dino_f = new MovableItem("level1/F.png", dinoscore);
    dino_f.attr({
      x: 526,
      y: cc.winSize.height -537,
   anchorX : 0,
    anchorY : 1
    });
    dino_f.id = 6;
    this.addChild(dino_f, 1);

    dino_g = new MovableItem("level1/G.png", dinoscore);
    dino_g.attr({
      x: 566,
      y: cc.winSize.height -641,
   anchorX : 0,
   anchorY : 1
    });
    dino_g.id = 7;
    this.addChild(dino_g, 1);

    dino_h = new MovableItem("level1/H.png", dinoscore);
    dino_h.attr({
      x: 621,
      y: cc.winSize.height -717,
     anchorX : 0,
     anchorY : 1
    });
    dino_h.id = 8;
    this.addChild(dino_h, 1);

    dino_i = new MovableItem("level1/I.png", dinoscore);
    dino_i.attr({
      x: 761,
      y: cc.winSize.height -928,
      anchorX : 0,
      anchorY : 1
    });
    dino_i.id = 9;
    this.addChild(dino_i, 1);

    dino_j = new MovableItem("level1/J.png", dinoscore);
    dino_j.attr({
      x: 751,
      y: cc.winSize.height -1164,
      anchorX : 0,
      anchorY : 1
    });
    dino_j.id = 10;
    this.addChild(dino_j, 1);

    dino_k = new MovableItem("level1/K.png", dinoscore);
    dino_k.attr({
      x: 837,
      y:  cc.winSize.height -762,
      anchorX : 0,
      anchorY : 1
    });
    dino_k.id = 11;
    this.addChild(dino_k, 1);

    dino_l = new MovableItem("level1/L.png", dinoscore);
    dino_l.attr({
      x: 948,
      y: cc.winSize.height -771,
      anchorX : 0,
      anchorY : 1
    });
    dino_l.id = 12;
    this.addChild(dino_l, 1);

    dino_m = new MovableItem("level1/M.png", dinoscore);
    dino_m.attr({
      x: 1024,
      y: cc.winSize.height -721 ,
      anchorX : 0,
      anchorY : 1
    });
    dino_m.id = 13;
    this.addChild(dino_m, 1);

    dino_n = new MovableItem("level1/N.png", dinoscore);
    dino_n.attr({
      x: 1214,
      y: cc.winSize.height -719,
      anchorX : 0,
      anchorY : 1
    });
    dino_n.id = 14;
    this.addChild(dino_n, 1);

    dino_o = new MovableItem("level1/O.png", dinoscore);
    dino_o.attr({
      x: 1344,
      y: cc.winSize.height -758,
      anchorX : 0,
      anchorY : 1
    });
    dino_o.id = 15;
    this.addChild(dino_o, 1);

    dino_p = new MovableItem("level1/P.png", dinoscore);
    dino_p.attr({
      x: 1273,
      y: cc.winSize.height -962,
      anchorX : 0,
      anchorY : 1
    });
    dino_p.id = 16;
    this.addChild(dino_p, 1);

    dino_q = new MovableItem("level1/Q.png", dinoscore);
    dino_q.attr({
      x: 1251,
      y: cc.winSize.height -1107,
      anchorX : 0,
      anchorY : 1
    });
    dino_q.id = 17;
    this.addChild(dino_q, 1);

    dino_r = new MovableItem("level1/R.png", dinoscore);
    dino_r.attr({
      x: 1286,
      y: cc.winSize.height -1184,
      anchorX : 0,
      anchorY : 1
    });
    dino_r.id = 18;
    this.addChild(dino_r, 1);


    dino_s = new MovableItem("level1/S.png", dinoscore);
    dino_s.attr({
      x: 1471,
      y: cc.winSize.height -812,
      anchorX : 0,
      anchorY : 1
    });
    dino_s.id = 19;
    this.addChild(dino_s, 1);

    dino_t = new MovableItem("level1/T.png", dinoscore);
    dino_t.attr({
      x: 1573,
      y: cc.winSize.height -791,
      anchorX : 0,
      anchorY : 1
    });
    dino_t.id = 20;
    this.addChild(dino_t, 1);

    dino_u = new MovableItem("level1/U.png", dinoscore);
    dino_u.attr({
      x: 1692,
      y: cc.winSize.height -781,
       anchorX : 0,
       anchorY : 1
    });
    dino_u.id = 21;
    this.addChild(dino_u, 1);

    dino_v = new MovableItem("level1/V.png", dinoscore);
    dino_v.attr({
      x: 1794,
      y: cc.winSize.height -759,
      anchorX : 0,
      anchorY : 1
    });
    dino_v.id = 22;
    this.addChild(dino_v, 1);

    dino_w = new MovableItem("level1/W.png", dinoscore);
    dino_w.attr({
      x: 1884,
      y: cc.winSize.height -711,
      anchorX : 0,
      anchorY : 1
    });
    dino_w.id = 23;
    this.addChild(dino_w, 1);

    dino_x = new MovableItem("level1/X.png", dinoscore);
    dino_x.attr({
      x: 1980,
      y: cc.winSize.height -663 ,
      anchorX : 0,
      anchorY : 1
    });
    dino_x.id = 24;
    this.addChild(dino_x, 1);

    dino_y = new MovableItem("level1/Y.png", dinoscore);
    dino_y.attr({
      x: 2073,
      y:  cc.winSize.height -629,
       anchorX : 0,
       anchorY : 1
    });
    dino_y.id = 25;
    this.addChild(dino_y, 1);

    dino_z = new MovableItem("level1/Z.png", dinoscore);
    dino_z.attr({
      x:2121,
      y: cc.winSize.height -560,
      anchorX : 0,
      anchorY : 1
    });
    dino_z.id = 26;
    this.addChild(dino_z, 1);

    alphadino = [dino_a, dino_b, dino_c, dino_d, dino_e, dino_f, dino_g, dino_h, dino_i, dino_j, dino_k, dino_l, dino_m, dino_n, dino_o, 
                dino_p, dino_q, dino_r, dino_s, dino_t, dino_u, dino_v, dino_w, dino_x, dino_y, dino_z];

    alphadino1 = [{ x: 793, y:  cc.winSize.height - 168 }, { x: 671, y: cc.winSize.height -196 }, { x: 596, y: cc.winSize.height -239 }, { x: 532, y: cc.winSize.height -307 }, { x: 519, y: cc.winSize.height -414 }, { x:526, y: cc.winSize.height -537 },
      { x: 566, y: cc.winSize.height -641 }, { x: 621, y: cc.winSize.height -717 }, { x: 761, y: cc.winSize.height -928 }, { x: 751, y: cc.winSize.height -1164 }, { x: 837, y: cc.winSize.height -762 }, { x: 948, y: cc.winSize.height -771 },
      { x: 1024, y: cc.winSize.height -721 }, { x: 1214, y: cc.winSize.height -719 }, { x: 1344, y: cc.winSize.height -758 }, { x: 1273, y: cc.winSize.height -962 }, { x: 1251, y: cc.winSize.height -1107 }, { x: 1286, y: cc.winSize.height -1184 }, { x: 1471, y: cc.winSize.height -812 },
      { x: 1573, y: cc.winSize.height -791 }, { x: 1692, y: cc.winSize.height -781 }, { x: 1794, y: cc.winSize.height -759 }, { x: 1884, y: cc.winSize.height -711 }, { x: 1980, y: cc.winSize.height -663 }, { x: 2073, y: cc.winSize.height -629 }, { x: 2121, y: cc.winSize.height -560 }];


    spritePosition = [{ x: 70, y: 730 }, { x: 1200, y: 150 }, { x: 180, y: 625 }, { x: 200, y: 450 }, { x: 80, y: 570 }, { x: 315, y: 130 },
      { x: 1120, y: 215 }, { x: 200, y: 200 }, { x: 700, y: 620 }, { x: 445, y: 620 }, { x: 585, y: 670 }, { x: 600, y: 215 },
      { x: 770, y: 720 }, { x: 65, y: 375 }, { x: 520, y: 180 }, { x: 280, y: 320 }, { x: 830, y: 135 }, { x: 70, y: 155 }, { x: 850, y: 610 },
      { x: 150, y: 350 }, { x: 850, y: 250 }, { x: 950, y: 310 }, { x: 970, y: 675 }, { x: 1050, y: 350 }, { x: 1140, y: 465 }, { x: 1000, y: 150 }];

    this.scheduleOnce(this.randomPosition, 1);
    targetSquareBox1 = this.targetSquareBox;
    this.scheduleUpdate();

    return true;
  },

 newPosition: function () {
    var pos = Math.floor(Math.random() * 100 % (spritePosition.length));
    var newPos = spritePosition[pos];
    spritePosition.splice(pos, 1);
    return newPos;
  },

  randomPosition: function () {
    for (var i = 0; i < 26; i++) {
      var temp = alphadino[i];
      var temp_pos = this.newPosition();
      temp.attr({
        x: (temp_pos.x/1280)*cc.winSize.width,
        y: (temp_pos.y/800)*cc.winSize.height
      });
    }
  },

  update: function (dt) {
    if (dinoscore == 2) {
      this.AfterGameCompleteMenuPopup();
    }
  },

  toPopUpMenuVisible: function () {

    this.dinoyes= new ClickedButtonToRedirect("menu/yes.png", "menus", this);
    this.dinoyes.attr({
     x: (350/1280)*cc.winSize.width,
     y: (450/800)*cc.winSize.height,
     anchorX : 0,
     anchorY : 1,
      });
      this.addChild(this.dinoyes, 2);

    this.dinono = new ClickedButtonToRedirect("menu/no.png", "no1", this);
    this.dinono.attr({
      x:(700/1280)*cc.winSize.width,
      y:(450/800)*cc.winSize.height,
     anchorX : 0,
     anchorY : 1,
      });
    this.addChild(this.dinono, 2);

    this.dinomenu= new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/menu.png"));
    this.dinomenu.attr({
      x: 1280,
      y: 900,
     anchorX : 0.5,
     anchorY : 0.5,
      });
    this.addChild(this.dinomenu, 1);

  },

  toRemovePopup: function () {
    this.dinoyes.removeFromParent(true);
    this.dinono.removeFromParent(true);
    this.dinomenu.removeFromParent(true);
  },

  toRemoveCompletePopup: function () {
   this.dinomenu.removeFromParent(true);
   this.dinocomp.removeFromParent(true);
   this.dino_menu1_png.removeFromParent(true);
   this.dino_next_png.removeFromParent(true);
  },
  AfterGameCompleteMenuPopup: function () {

   this.dinomenu= new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/menu.png"));
   this.dinomenu.attr({
      x: 1280,
      y: 900,
     anchorX : 0.5,
     anchorY : 0.5,
      });
    this.addChild(this.dinomenu, 1);

    this.dinocomp= new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/completed.png"));
    this.dinocomp.attr({
      x: (380/1280)*cc.winSize.width,
      y: (610/800)*cc.winSize.height,
     anchorX : 0,
     anchorY : 1,
      });
    this.addChild(this.dinocomp, 1);
    
    this.dinomenu1 = new ClickedButtonToRedirect("menu/menu1.png", "menus");
    this.dinomenu1.attr({
      x: (640/1280)*cc.winSize.width,
      y: (400/800)*cc.winSize.height,
     anchorX : 0.5,
     anchorY : 0.5,
      });
    this.addChild(this.dinomenu1, 1);
    
    this.dinonext = new ClickedButtonToRedirect("menu/Next.png", "nxt");
    this.dinonext .attr({
      x: (400/1280)*cc.winSize.width,
      y: (300/800)*cc.winSize.height,
     anchorX : 0,
     anchorY : 1,
      });
    this.addChild(this.dinonext , 1);

  }
});

var Level11Scene = cc.Scene.extend({
  onEnter: function () {
    this._super();
    var layer = new Level11Layer();
    //toCallLevel1ScenePopupElement = layer;
    this.addChild(layer);
  }
});