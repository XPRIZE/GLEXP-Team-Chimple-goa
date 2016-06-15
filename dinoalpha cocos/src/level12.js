var targetSquareBox1 = [];

var Level12Layer = cc.Layer.extend({
    sprite:null,
    targetSquareBox:[],
    dinoscore : 0,
    goal : null,
    myTween : false,

 ctor:function () {
         this._super();
         var size = cc.winSize;
         this.setName('levelLayer');
         dinoscore = 0;
          self = this;
          
        cc.spriteFrameCache.addSpriteFrames(res.dinolevel2);
        var dino2 = new  cc.Sprite(cc.spriteFrameCache.getSpriteFrame("level2/BG.png"));
         dino2.attr({
         x: size.width / 2,
         y: size.height / 2,
        anchorX : .5,
        anchorY : .5
        });
       this.addChild(dino2);
       
       dinoscore = 0;
        
      var dinohome= new ClickedButtonToRedirect("menu/home.png", "popupMenu2", this);
      dinohome.attr({
       x : 2400,
       y : 1700,
         anchorX : .5,
         anchorY : .5
     });
      this.addChild(dinohome);
           
     dot_a = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
      dot_a.attr({
            x: (345/1280)*cc.winSize.width,
            y: (610/800)*cc.winSize.height,
         anchorX : 0.5,
         anchorY : 0.5,
      });
          this.addChild(dot_a, 0);
          this.targetSquareBox.push( dot_a.getBoundingBox());
          
          dot_b = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
          dot_b.attr({
            x: (490/1280)*cc.winSize.width,
            y: (650/800)*cc.winSize.height,
         anchorX : 0.5,
         anchorY : 0.5,
      });
          this.addChild(dot_b, 0);
          this.targetSquareBox.push( dot_b.getBoundingBox());
          
          dot_c = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
          dot_c.attr({
            x: (507/1280)*cc.winSize.width,
            y: (593/800)*cc.winSize.height,
           anchorX : 0.5,
           anchorY : 0.5,
      });
          this.addChild(dot_c, 0);
          this.targetSquareBox.push( dot_c.getBoundingBox());
          
          dot_d = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
          dot_d.attr({
            x: (548/1280)*cc.winSize.width,
            y: (560/800)*cc.winSize.height,
           anchorX : 0.5,
           anchorY : 0.5,
      });
          this.addChild(dot_d, 0);
          this.targetSquareBox.push( dot_d.getBoundingBox());
          
          dot_e = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
          dot_e.attr({
            x: (473/1280)*cc.winSize.width,
            y: (535/800)*cc.winSize.height,
           anchorX : 0.5,
           anchorY : 0.5,
      });
          this.addChild(dot_e, 0);
          this.targetSquareBox.push( dot_e.getBoundingBox());
          
          dot_f = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
          dot_f.attr({
            x: (425/1280)*cc.winSize.width,
            y: (501/800)*cc.winSize.height,
           anchorX : 0.5,
           anchorY : 0.5,
      });
          this.addChild(dot_f, 0);
          this.targetSquareBox.push( dot_f.getBoundingBox());
          
          dot_g = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
          dot_g.attr({
            x: (377/1280)*cc.winSize.width,
            y: (479/800)*cc.winSize.height,
           anchorX : 0.5,
           anchorY : 0.5,
      });
          this.addChild(dot_g, 0);
          this.targetSquareBox.push( dot_g.getBoundingBox());
          
          dot_h = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
          dot_h.attr({
            x: (507/1280)*cc.winSize.width,
            y: (492/800)*cc.winSize.height,
           anchorX : 0.5,
           anchorY : 0.5,
      });
          this.addChild(dot_h, 0);
          this.targetSquareBox.push( dot_h.getBoundingBox());
          
          dot_i = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
          dot_i.attr({
            x: (544/1280)*cc.winSize.width,
            y: (490/800)*cc.winSize.height,
           anchorX : 0.5,
           anchorY : 0.5,
      });
          this.addChild(dot_i, 0);
          this.targetSquareBox.push( dot_i.getBoundingBox());
          
          dot_j = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
          dot_j.attr({
            x: (577/1280)*cc.winSize.width,
            y: (481/800)*cc.winSize.height,
           anchorX : 0.5,
           anchorY : 0.5,
      });
          this.addChild(dot_j, 0);
          this.targetSquareBox.push( dot_j.getBoundingBox());
          
          dot_k = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
          dot_k.attr({
            x: (640/1280)*cc.winSize.width,
            y: (513/800)*cc.winSize.height,
           anchorX : 0.5,
           anchorY : 0.5,
      });
          this.addChild(dot_k, 0);
          this.targetSquareBox.push( dot_k.getBoundingBox());
          
          dot_l = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
          dot_l.attr({
            x: (605/1280)*cc.winSize.width,
            y: (462/800)*cc.winSize.height,
           anchorX : 0.5,
           anchorY : 0.5,
      });
          this.addChild(dot_l, 0);
          this.targetSquareBox.push( dot_l.getBoundingBox());
          
          dot_m = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
          dot_m.attr({
            x: (647/1280)*cc.winSize.width,
            y: (452/800)*cc.winSize.height,
           anchorX : 0.5,
           anchorY : 0.5,
      });
          this.addChild(dot_m, 0);
          this.targetSquareBox.push( dot_m.getBoundingBox());
          
          dot_n = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
          dot_n.attr({
            x: (692/1280)*cc.winSize.width,
            y: (430/800)*cc.winSize.height,
           anchorX : 0.5,
           anchorY : 0.5,
      });
          this.addChild(dot_n, 0);
          this.targetSquareBox.push( dot_n.getBoundingBox());
          
          dot_o = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
          dot_o.attr({
            x: (738/1280)*cc.winSize.width,
            y: (415/800)*cc.winSize.height,
           anchorX : 0.5,
           anchorY : 0.5,
      });
          this.addChild(dot_o, 0);
          this.targetSquareBox.push( dot_o.getBoundingBox());
          
          dot_p = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
          dot_p.attr({
            x: (663/1280)*cc.winSize.width,
            y: (344/800)*cc.winSize.height,
           anchorX : 0.5,
           anchorY : 0.5,
      });
          this.addChild(dot_p, 0);
          this.targetSquareBox.push( dot_p.getBoundingBox());
          
          dot_q = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
          dot_q.attr({
            x: (603/1280)*cc.winSize.width,
            y: (290/800)*cc.winSize.height,
           anchorX : 0.5,
           anchorY : 0.5,
      });
          this.addChild(dot_q, 0);
          this.targetSquareBox.push( dot_q.getBoundingBox());
          
          dot_r = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
          dot_r.attr({
            x: (648/1280)*cc.winSize.width,
            y: (213/800)*cc.winSize.height,
           anchorX : 0.5,
           anchorY : 0.5,
      });
          this.addChild(dot_r, 0);
          this.targetSquareBox.push( dot_r.getBoundingBox());
          
          dot_s = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
          dot_s.attr({
            x: (609/1280)*cc.winSize.width,
            y: (182/800)*cc.winSize.height,
           anchorX : 0.5,
           anchorY : 0.5,
      });
          this.addChild(dot_s, 0);
          this.targetSquareBox.push( dot_s.getBoundingBox());
          
          dot_t = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
          dot_t.attr({
            x: (817/1280)*cc.winSize.width,
            y: (361/800)*cc.winSize.height,
           anchorX : 0.5,
           anchorY : 0.5,
      });
          this.addChild(dot_t, 0);
          this.targetSquareBox.push( dot_t.getBoundingBox());
          
          dot_u = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
          dot_u.attr({
            x: (865/1280)*cc.winSize.width,
            y: (309/800)*cc.winSize.height,
           anchorX : 0.5,
           anchorY : 0.5,
      });
          this.addChild(dot_u, 0);
          this.targetSquareBox.push( dot_u.getBoundingBox());
          
          dot_v = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
          dot_v.attr({
            x: (908/1280)*cc.winSize.width,
            y: (279/800)*cc.winSize.height,
            anchorX : 0.5,
           anchorY : 0.5,
      });
          this.addChild(dot_v, 0);
          this.targetSquareBox.push( dot_v.getBoundingBox());
          
          dot_w = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
          dot_w.attr({
            x: (945/1280)*cc.winSize.width,
            y: (250/800)*cc.winSize.height,
            anchorX : 0.5,
           anchorY : 0.5,
      });
          this.addChild(dot_w, 0);
          this.targetSquareBox.push( dot_w.getBoundingBox());
          
          dot_x = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
          dot_x.attr({
            x: (994/1280)*cc.winSize.width,
            y: (224/800)*cc.winSize.height,
           anchorX : 0.5,
           anchorY : 0.5,
      });
          this.addChild(dot_x, 0);
          this.targetSquareBox.push( dot_x.getBoundingBox());
          
          dot_y = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
          dot_y.attr({
            x: (1029/1280)*cc.winSize.width,
            y: (209/800)*cc.winSize.height,
           anchorX : 0.5,
           anchorY : 0.5,
      });
          this.addChild(dot_y, 0);
          this.targetSquareBox.push( dot_y.getBoundingBox());
          
          dot_z = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
          dot_z.attr({
            x: (1077/1280)*cc.winSize.width,
            y: (200/800)*cc.winSize.height,
           anchorX : 0.5,
           anchorY : 0.5,
      });
          this.addChild(dot_z, 0);
          this.targetSquareBox.push( dot_z.getBoundingBox());
          
          
         var rotateTo11 = new cc.RotateTo(0.4, 5.0);
         var rotateTo22 = new cc.RotateTo(0.4, -5.0);
         var delay = new cc.DelayTime(0.1);
         seq1 = new cc.Sequence(rotateTo11, delay, rotateTo22,delay);
         goal = new cc.RepeatForever(seq1);
         
          dino_a = new MovableItem("level2/A.png",dinoscore,goal,2);
          dino_a.attr({
            x: 461,
            y: cc.winSize.height - 336,
          anchorX : 0,
          anchorY : 1
     });
          dino_a.id = 1;
          dino_a.myTween = true;
          this.addChild(dino_a, 1);
          
          dino_b = new MovableItem("level2/B.png",dinoscore,goal,2);
          dino_b.attr({
            x: 919,
            y: cc.winSize.height -330,
          anchorX : 0,
          anchorY : 1
     });
          dino_b.id = 2;
          dino_b.myTween = true;
          this.addChild(dino_b, 1);
          
          dino_c = new MovableItem("level2/C.png",dinoscore,goal,2);
          dino_c.attr({
            x: 952,
            y: cc.winSize.height -457,
           anchorX : 0,
           anchorY : 1
     });
          dino_c.id = 3;
          dino_c.myTween = true;
          this.addChild(dino_c, 1);
          
          dino_d = new MovableItem("level2/D.png",dinoscore,goal,2);
          dino_d.attr({
            x: 1038,
            y: cc.winSize.height - 514,
           anchorX : 0,
           anchorY : 1
     });
          dino_d.id = 4; 
          dino_d.myTween = true; 
          this.addChild(dino_d, 1);
          
          dino_e = new MovableItem("level2/E.png",dinoscore,goal,2);
          dino_e.attr({
            x: 884,
            y: cc.winSize.height -556,
           anchorX : 0,
           anchorY : 1
     });
          dino_e.id = 5;
          dino_e.myTween = true; 
          this.addChild(dino_e, 1);
          
          dino_f = new MovableItem("level2/F.png",dinoscore,goal,2);
          dino_f.attr({
            x: 789,
            y: cc.winSize.height -660,
           anchorX : 0,
           anchorY : 1
     });
          dino_f.id = 6; 
          dino_f.myTween = true; 
          this.addChild(dino_f, 1);
          
          dino_g = new MovableItem("level2/G.png",dinoscore,goal,2);
          dino_g.attr({
            x: 708,
            y:cc.winSize.height - 695,
           anchorX : 0,
          anchorY : 1
    });
          dino_g.id = 7;
          dino_g.myTween = true;  
          this.addChild(dino_g, 1);
          
          dino_h = new MovableItem("level2/H.png",dinoscore,goal,2);
          dino_h.attr({
            x: 915,
            y: cc.winSize.height -647,
           anchorX : 0,
           anchorY : 1
    });
          dino_h.id = 8;
          dino_h.myTween = true; 
          this.addChild(dino_h, 1);
          
          dino_i = new MovableItem("level2/I.png",dinoscore,goal,2);
          dino_i.attr({
            x: 1006,
            y: cc.winSize.height -635,
           anchorX : 0,
           anchorY : 1
    });
          dino_i.id = 9;
          dino_i.myTween = true;   
          this.addChild(dino_i, 1);
          
          dino_j = new MovableItem("level2/J.png",dinoscore,goal,2);
          dino_j.attr({
            x: 1057,
            y: cc.winSize.height -659,
           anchorX : 0,
           anchorY : 1
    });
          dino_j.id = 10;
          dino_j.myTween = true; 
          this.addChild(dino_j, 1);
          
          dino_k = new MovableItem("level2/K.png",dinoscore,goal,2);
          dino_k.attr({
            x: 1170,
            y:  cc.winSize.height -591,
           anchorX : 0,
           anchorY : 1
    });
          dino_k.id = 11;
          dino_k.myTween = true;
          this.addChild(dino_k, 1);
          
          dino_l = new MovableItem("level2/L.png",dinoscore,goal,2);
          dino_l.attr({
            x: 1143,
            y: cc.winSize.height -691,
           anchorX : 0,
           anchorY : 1
    });
          dino_l.id = 12;
          dino_l.myTween = true; 
          this.addChild(dino_l, 1);
          
          dino_m = new MovableItem("level2/M.png",dinoscore,goal,2);
          dino_m.attr({
            x: 1233,
            y: cc.winSize.height -730,
           anchorX : 0,
           anchorY : 1
    });
          dino_m.id = 13;
          this.addChild(dino_m, 1);
          
          dino_n = new MovableItem("level2/N.png",dinoscore,goal,2);
          dino_n.attr({
            x: 1316,
            y: cc.winSize.height -783,
           anchorX : 0,
           anchorY : 1
    });
          dino_n.id = 14;
          dino_n.myTween = true;
          this.addChild(dino_n, 1);
          
          dino_o = new MovableItem("level2/O.png",dinoscore,goal,2);
          dino_o.attr({
            x: 1401,
            y:cc.winSize.height - 744,
           anchorX : 0,
           anchorY : 1
    });
          dino_o.id = 15;
          dino_o.myTween = true; 
          this.addChild(dino_o, 1);
          
          dino_p = new MovableItem("level2/P.png",dinoscore,goal,2);
          dino_p.attr({
            x: 1216,
            y: cc.winSize.height -930,
           anchorX : 0,
           anchorY : 1
    });
          dino_p.id = 16;
          dino_p.myTween = true; 
          this.addChild(dino_p, 1);
          
          dino_q = new MovableItem("level2/Q.png",dinoscore,goal,2);
          dino_q.attr({
            x: 1152,
            y: cc.winSize.height -1055,
           anchorX : 0,
           anchorY : 1
    });
          dino_q.id = 17;
          dino_q.myTween = true; 
          this.addChild(dino_q, 1);
          
          dino_r = new MovableItem("level2/R.png",dinoscore,goal,2);
          dino_r.attr({
            x: 1213,
            y: cc.winSize.height -1186,
           anchorX : 0,
           anchorY : 1
    });
          dino_r.id = 18;
          dino_r.myTween = true; 
          this.addChild(dino_r, 1);
         
          dino_s = new MovableItem("level2/S.png",dinoscore,goal,2);
          dino_s.attr({
            x: 1156,
            y: cc.winSize.height -1305,
            anchorX : 0,
            anchorY : 1
    });
          dino_s.id = 19;
          dino_s.myTween = true; 
          this.addChild(dino_s, 1);
          
          dino_t = new MovableItem("level2/T.png",dinoscore,goal,2);
          dino_t.attr({
            x: 1557,
            y: cc.winSize.height -897,
             anchorX : 0,
            anchorY : 1
    });
          dino_t.id = 20;
          dino_t.myTween = true; 
          this.addChild(dino_t, 1);
          
          dino_u = new MovableItem("level2/U.png",dinoscore,goal,2);
          dino_u.attr({
            x: 1665,
            y: cc.winSize.height -1021,
            anchorX : 0,
            anchorY : 1
    });
          dino_u.id = 21;
          dino_u.myTween = true; 
          this.addChild(dino_u, 1); 
          
          dino_v = new MovableItem("level2/V.png",dinoscore,goal,2);
          dino_v.attr({
            x: 1762,
            y: cc.winSize.height -1095,
            anchorX : 0,
            anchorY : 1
    });
          dino_v.id = 22;
          dino_v.myTween = true; 
          this.addChild(dino_v, 1);
          
          dino_w = new MovableItem("level2/W.png",dinoscore,goal,2);
          dino_w.attr({
            x: 1826,
            y: cc.winSize.height -1141,
            anchorX : 0,
            anchorY : 1
    });
          dino_w.id = 23;
          dino_w.myTween = true; 
          this.addChild(dino_w, 1);
          
          dino_x = new MovableItem("level2/X.png",dinoscore,goal,2);
          dino_x.attr({
            x: 1942,
            y: cc.winSize.height -1214,
            anchorX : 0,
            anchorY : 1
    });
          dino_x.id = 24;
          dino_x.myTween = true; 
          this.addChild(dino_x, 1);
          
          dino_y = new MovableItem("level2/Y.png",dinoscore,goal,2);
          dino_y.attr({
            x: 2017,
            y:  cc.winSize.height -1254,
            anchorX : 0,
            anchorY : 1
    });
          dino_y.id = 25;
          dino_y.myTween = true; 
          this.addChild(dino_y, 1);
          
          dino_z = new MovableItem("level2/Z.png",dinoscore,goal,2);
          dino_z.attr({
            x: 2088,
            y: cc.winSize.height -1276,
            anchorX : 0,
            anchorY : 1
    });
          dino_z.id = 26;
          dino_z.myTween = true; 
          this.addChild(dino_z, 1);
          
       alphadino = [dino_a,dino_b,dino_c,dino_d,dino_e,dino_f,dino_g,dino_h,dino_i,dino_j, dino_k,dino_l,dino_m,
                    dino_n,dino_o,dino_p,dino_q,  dino_r,dino_s,dino_t, dino_u,dino_v,dino_w,dino_x,dino_y,dino_z];
                    
       alphadino1 = [{x:461,y:cc.winSize.height - 336},{x:919,y:cc.winSize.height - 330},{x:952,y:cc.winSize.height - 457},{x:1038,y:cc.winSize.height - 514},{x:884,y:cc.winSize.height -556},{x:789,y:cc.winSize.height -660},
                     {x:708,y:cc.winSize.height -695},{x:915,y:cc.winSize.height - 647},{x:1006,y:cc.winSize.height - 635},{x:1057,y:cc.winSize.height - 659},{x:1170,y:cc.winSize.height - 591},{x:1143,y:cc.winSize.height - 691},
                     {x:1233,y:cc.winSize.height - 730},{x:1316,y:cc.winSize.height - 783},{x:1401,y:cc.winSize.height - 744},{x:1216,y:cc.winSize.height - 930},{x:1152,y:cc.winSize.height - 1055},{x:1213,y:cc.winSize.height - 1186},{x:1156,y:cc.winSize.height - 1305},
                     {x:1557,y:cc.winSize.height -897},{x:1665,y:cc.winSize.height -1021},{x:1762,y:cc.winSize.height -1095},{x:1826,y:cc.winSize.height -1141},{x:1942,y:cc.winSize.height -1214},{x:2017,y:cc.winSize.height -1254},{x:2088,y:cc.winSize.height -1276}];              
                    
          
      spritePosition = [{x:70,y:730},{x:1155,y:125},{x:160,y:675},{x:245,y:435},{x:175,y:515},{x:285,y:85},
                        {x:1155,y:300},{x:220,y:220},{x:700,y:620},{x:570,y:85},{x:930,y:480},{x:610,y:740},
                        {x:905,y:710},{x:1135,y:470},{x:435,y:200},{x:310,y:235},{x:730,y:730},{x:120,y:105},{x:855,y:575},
                        {x:115,y:350},{x:810,y:155},{x:420,y:335},{x:1140,y:565},{x:1050,y:350},{x:1035,y:655},{x:1000,y:100}];  
                        
       this.scheduleOnce(this.randomPosition , 1); 
       targetSquareBox1 = this.targetSquareBox;
       self = this;
       this.scheduleUpdate();
     
       return true;
    },
    
    stopTween : function()
    {
        dino_a.stopAction(goal);
    },
    
    newPosition: function ()
           {
               var pos  = Math.floor(Math.random()*100 % (spritePosition.length ));
               var newPos = spritePosition[pos];
               spritePosition.splice(pos, 1);
               return newPos;                         
           },
           
     randomPosition :function()
     { 
        for (var i =0; i < 26; i++){
        var temp = alphadino[i];
        var temp_pos = this.newPosition();
        temp.attr({
                    x: (temp_pos.x/1280)*cc.winSize.width,
                    y: (temp_pos.y/800)*cc.winSize.height
                });
      }
  },
  
  update:function(dt)
        {
          if(alphadino[dinoscore].myTween){
            alphadino[dinoscore].runAction(goal);
            alphadino[dinoscore].myTween = false;
          }
          
              if(dinoscore == 2)
            {
                this.AfterGameCompleteMenuPopup();
            }
       },

 toPopUpMenuVisible : function(){
          
    this.dinoyes= new ClickedButtonToRedirect("menu/yes.png", "menus", this);
    this.dinoyes.attr({
     x: (350/1280)*cc.winSize.width,
     y: (450/800)*cc.winSize.height,
     anchorX : 0,
     anchorY : 1,
      });
    this.addChild(this.dinoyes, 2);
      
    this.dinono = new ClickedButtonToRedirect("menu/no.png", "no2", this);
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
    
    this.dinonext = new ClickedButtonToRedirect("menu/Next.png", "nxt1");
    this.dinonext .attr({
      x: (400/1280)*cc.winSize.width,
      y: (300/800)*cc.winSize.height,
     anchorX : 0,
     anchorY : 1,
      });
    this.addChild(this.dinonext , 1);
 }
});

var Level12Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new Level12Layer();
        //toCallLevel2ScenePopupElement = layer;
        this.addChild(layer);
    }
});