var targetSquareBox1 = [];

var Level13Layer = cc.Layer.extend({
    sprite:null,
    targetSquareBox:[],
    dinoscore : 0,

 ctor:function () {
         this._super();
         var size = cc.winSize;
         this.setName('levelLayer');
         dinoscore = 0;
         self = this;
         
         cc.spriteFrameCache.addSpriteFrames(res.dinolevel3);
         var dino3 = new ClickedButtonToRedirect("level3/BG.png", "clickedBg");
         dino3.attr({
            x: size.width / 2,
            y: size.height / 2,
            anchorX : .5,
            anchorY : .5
        });
        this.addChild(dino3, 0);
        
        dinoscore = 0;
        
      var dinohome= new ClickedButtonToRedirect("menu/home.png", "popupMenu3", this);
      dinohome.attr({
       x : 2400,
       y : 1700,
         anchorX : .5,
         anchorY : .5
     });
      this.addChild(dinohome);
           
          dot_a = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
          dot_a.attr({
            x: (357/1280)*cc.winSize.width,
            y: (335/800)*cc.winSize.height,
            anchorX : 0.5,
            anchorY : 0.5,
      });
          this.addChild(dot_a, 0);
          cc.log(this.targetSquareBox);
          this.targetSquareBox.push( dot_a.getBoundingBox());
          
          dot_b = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
          dot_b.attr({
            x: (415/1280)*cc.winSize.width,
            y: (385/800)*cc.winSize.height,
            anchorX : 0.5,
            anchorY : 0.5,
      });
          this.addChild(dot_b, 0);
           this.targetSquareBox.push( dot_b.getBoundingBox());
          
          dot_c = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
          dot_c.attr({
            x: (345/1280)*cc.winSize.width,
            y: (491/800)*cc.winSize.height,
            anchorX : 0.5,
            anchorY : 0.5,
      });
          this.addChild(dot_c, 0);
          this.targetSquareBox.push( dot_c.getBoundingBox());
          
          dot_d = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
          dot_d.attr({
            x: (452/1280)*cc.winSize.width,
            y: (428/800)*cc.winSize.height,
            anchorX : 0.5,
            anchorY : 0.5,
      });
          this.addChild(dot_d, 0);
          this.targetSquareBox.push( dot_d.getBoundingBox());
          
          dot_e = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
          dot_e.attr({
            x: (405/1280)*cc.winSize.width,
            y: (542/800)*cc.winSize.height,
            anchorX : 0.5,
            anchorY : 0.5,
      });
          this.addChild(dot_e, 0);
          this.targetSquareBox.push( dot_e.getBoundingBox());
          
          dot_f = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
          dot_f.attr({
            x: (492/1280)*cc.winSize.width,
            y: (582/800)*cc.winSize.height,
            anchorX : 0.5,
            anchorY : 0.5,
      });
          this.addChild(dot_f, 0);
          this.targetSquareBox.push( dot_f.getBoundingBox());
          
          dot_g = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
          dot_g.attr({
            x: (525/1280)*cc.winSize.width,
            y: (450/800)*cc.winSize.height,
            anchorX : 0.5,
            anchorY : 0.5,
      });
          this.addChild(dot_g, 0);
          this.targetSquareBox.push( dot_g.getBoundingBox());
          
          dot_h = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
          dot_h.attr({
            x: (592/1280)*cc.winSize.width,
            y: (454/800)*cc.winSize.height,
            anchorX : 0.5,
            anchorY : 0.5,
      });
          this.addChild(dot_h, 0);
          this.targetSquareBox.push( dot_h.getBoundingBox());
          
          dot_i = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
          dot_i.attr({
            x: (562/1280)*cc.winSize.width,
            y: (367/800)*cc.winSize.height,
            anchorX : 0.5,
            anchorY : 0.5,
      });
          this.addChild(dot_i, 0);
          this.targetSquareBox.push( dot_i.getBoundingBox());
          
          dot_j = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
          dot_j.attr({
            x: (537/1280)*cc.winSize.width,
            y: (276/800)*cc.winSize.height,
            anchorX : 0.5,
            anchorY : 0.5,
      });
          this.addChild(dot_j, 0);
          this.targetSquareBox.push( dot_j.getBoundingBox());
          
          dot_k = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
          dot_k.attr({
            x: (660/1280)*cc.winSize.width,
            y: (557/800)*cc.winSize.height,
            anchorX : 0.5,
            anchorY : 0.5,
      });
          this.addChild(dot_k, 0);
          this.targetSquareBox.push( dot_k.getBoundingBox());
          
          dot_l = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
          dot_l.attr({
            x: (652/1280)*cc.winSize.width,
            y: (456/800)*cc.winSize.height,
            anchorX : 0.5,
            anchorY : 0.5,
      });
          this.addChild(dot_l, 0);
          this.targetSquareBox.push( dot_l.getBoundingBox());
          
          dot_m = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
          dot_m.attr({
            x: (696/1280)*cc.winSize.width,
            y: (460/800)*cc.winSize.height,
            anchorX : 0.5,
            anchorY : 0.5,
      });
          this.addChild(dot_m, 0);
          this.targetSquareBox.push( dot_m.getBoundingBox());
          
          dot_n = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
          dot_n.attr({
            x: (759/1280)*cc.winSize.width,
            y: (455/800)*cc.winSize.height,
            anchorX : 0.5,
            anchorY : 0.5,
      });
          this.addChild(dot_n, 0);
          this.targetSquareBox.push( dot_n.getBoundingBox());
          
          dot_o = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
          dot_o.attr({
            x: (812/1280)*cc.winSize.width,
            y: (445/800)*cc.winSize.height,
            anchorX : 0.5,
            anchorY : 0.5,
      });
          this.addChild(dot_o, 0);
          this.targetSquareBox.push( dot_o.getBoundingBox());
          
          dot_p = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
          dot_p.attr({
            x: (778/1280)*cc.winSize.width,
            y: (371/800)*cc.winSize.height,
            anchorX : 0.5,
            anchorY : 0.5,
      });
          this.addChild(dot_p, 0);
          this.targetSquareBox.push( dot_p.getBoundingBox());
          
          dot_q = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
          dot_q.attr({
            x: (747/1280)*cc.winSize.width,
            y: (312/800)*cc.winSize.height,
            anchorX : 0.5,
            anchorY : 0.5,
      });
          this.addChild(dot_q, 0);
          this.targetSquareBox.push( dot_q.getBoundingBox());
          
          dot_r = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
          dot_r.attr({
            x: (778/1280)*cc.winSize.width,
            y: (259/800)*cc.winSize.height,
            anchorX : 0.5,
            anchorY : 0.5,
      });
          this.addChild(dot_r, 0);
          this.targetSquareBox.push( dot_r.getBoundingBox());
          
          dot_s = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
          dot_s.attr({
            x: (869/1280)*cc.winSize.width,
            y: (426/800)*cc.winSize.height,
            anchorX : 0.5,
            anchorY : 0.5,
      });
          this.addChild(dot_s, 0);
          this.targetSquareBox.push( dot_s.getBoundingBox());
          
          dot_t = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
          dot_t.attr({
            x: (915/1280)*cc.winSize.width,
            y: (416/800)*cc.winSize.height,
            anchorX : 0.5,
            anchorY : 0.5,
      });
          this.addChild(dot_t, 0);
          this.targetSquareBox.push( dot_t.getBoundingBox());
          
          dot_u = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
          dot_u.attr({
            x: (946/1280)*cc.winSize.width,
            y: (397/800)*cc.winSize.height,
            anchorX : 0.5,
            anchorY : 0.5,
      });
          this.addChild(dot_u, 0);
          this.targetSquareBox.push( dot_u.getBoundingBox());
          
          dot_v = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
          dot_v.attr({
            x: (982/1280)*cc.winSize.width,
            y: (372/800)*cc.winSize.height,
            anchorX : 0.5,
            anchorY : 0.5,
      });
          this.addChild(dot_v, 0);
          this.targetSquareBox.push( dot_v.getBoundingBox());
          
          dot_w = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
          dot_w.attr({
            x: (1011/1280)*cc.winSize.width,
            y: (458/800)*cc.winSize.height,
            anchorX : 0.5,
            anchorY : 0.5,
      });
          this.addChild(dot_w, 0);
          this.targetSquareBox.push( dot_w.getBoundingBox());
          
          dot_x = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
          dot_x.attr({
            x: (1032/1280)*cc.winSize.width,
            y: (311/800)*cc.winSize.height,
            anchorX : 0.5,
            anchorY : 0.5,
      });
          this.addChild(dot_x, 0);
          this.targetSquareBox.push( dot_x.getBoundingBox());
          
          dot_y = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
          dot_y.attr({
            x: (1058/1280)*cc.winSize.width,
            y: (289/800)*cc.winSize.height,
            anchorX : 0.5,
            anchorY : 0.5,
      });
          this.addChild(dot_y, 0);
          this.targetSquareBox.push( dot_y.getBoundingBox());
          
          dot_z = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menu/dot.png"));
          dot_z.attr({
            x: (1071/1280)*cc.winSize.width,
            y: (259/800)*cc.winSize.height,
            anchorX : 0.5,
            anchorY : 0.5,
      });
          this.addChild(dot_z, 0);
          this.targetSquareBox.push( dot_z.getBoundingBox());
          
          
          dino_a = new MovableItem("level3/A.png",dinoscore,"",3);
          dino_a.attr({
            x: 599,
            y: cc.winSize.height -964,
          anchorX : 0,
          anchorY : 1
     });
          dino_a.id = 1;
          this.addChild(dino_a, 1);
          
          dino_b = new MovableItem("level3/B.png",dinoscore,"",3);
          dino_b.attr({
            x: 688,
            y:  cc.winSize.height -868,
           anchorX : 0,
           anchorY : 1
     });
          dino_b.id = 2;
          this.addChild(dino_b, 1);
          
          dino_c = new MovableItem("level3/C.png",dinoscore,"",3);
          dino_c.attr({
            x: 547,
            y: cc.winSize.height -571,
           anchorX : 0,
           anchorY : 1
     });
          dino_c.id = 3;
          this.addChild(dino_c, 1);
          
          dino_d = new MovableItem("level3/D.png",dinoscore,"",3);
          dino_d.attr({
            x: 788,
            y: cc.winSize.height -765,
           anchorX : 0,
           anchorY : 1
     });
          dino_d.id = 4;  
          this.addChild(dino_d, 1);
          
          dino_e = new MovableItem("level3/E.png",dinoscore,"",3);
          dino_e.attr({
            x: 677,
            y: cc.winSize.height -364,
           anchorX : 0,
           anchorY : 1
     });
          dino_e.id = 5;
          this.addChild(dino_e, 1);
          
          dino_f = new MovableItem("level3/F.png",dinoscore,"",3);
          dino_f.attr({
            x: 841,
            y: cc.winSize.height -268,
           anchorX : 0,
           anchorY : 1
     });
          dino_f.id = 6; 
          this.addChild(dino_f, 1);
          
          dino_g = new MovableItem("level3/G.png",dinoscore,"",3);
          dino_g.attr({
            x: 940,
            y: cc.winSize.height -750,
           anchorX : 0,
           anchorY : 1
     });
          dino_g.id = 7; 
          this.addChild(dino_g, 1);
          
          dino_h = new MovableItem("level3/H.png",dinoscore,"",3);
          dino_h.attr({
            x: 1042,
            y: cc.winSize.height -681,
           anchorX : 0,
           anchorY : 1
     });
          dino_h.id = 8;
          this.addChild(dino_h, 1);
          
          dino_i = new MovableItem("level3/I.png",dinoscore,"",3);
          dino_i.attr({
            x: 1018,
            y: cc.winSize.height -905,
           anchorX : 0,
           anchorY : 1
     });
          dino_i.id = 9;  
          this.addChild(dino_i, 1);
          
          dino_j = new MovableItem("level3/J.png",dinoscore,"",3);
          dino_j.attr({
            x: 938,
            y:cc.winSize.height - 1111,
           anchorX : 0,
           anchorY : 1
     });
          dino_j.id = 10;
          this.addChild(dino_j, 1);
          
          dino_k = new MovableItem("level3/K.png",dinoscore,"",3);
          dino_k.attr({
            x: 1005,
            y:cc.winSize.height - 434,
           anchorX : 0,
           anchorY : 1
     });
          dino_k.id = 11;
          this.addChild(dino_k, 1);
          
          dino_l = new MovableItem("level3/L.png",dinoscore,"",3);
          dino_l.attr({
            x: 1171,
            y: cc.winSize.height - 664,
           anchorX : 0,
           anchorY : 1
     });
          dino_l.id = 12;
          this.addChild(dino_l, 1);
          
          dino_m = new MovableItem("level3/M.png",dinoscore,"",3);
          dino_m.attr({
            x: 1240,
            y: cc.winSize.height - 664,
           anchorX : 0,
           anchorY : 1
     });
          dino_m.id = 13;
          this.addChild(dino_m, 1);
          
          dino_n = new MovableItem("level3/N.png",dinoscore,"",3);
          dino_n.attr({
            x: 1365,
            y: cc.winSize.height - 695,
           anchorX : 0,
           anchorY : 1
     });
          dino_n.id = 14;
          this.addChild(dino_n, 1);
          
          dino_o = new MovableItem("level3/O.png",dinoscore,"",3);
          dino_o.attr({
            x: 1466,
            y: cc.winSize.height -729,
           anchorX : 0,
           anchorY : 1
     });
          dino_o.id = 15;
          this.addChild(dino_o, 1);
          
          dino_p = new MovableItem("level3/P.png",dinoscore,"",3);
          dino_p.attr({
            x: 1388,
            y:  cc.winSize.height -914,
           anchorX : 0,
           anchorY : 1
     });
          dino_p.id = 16;
          this.addChild(dino_p, 1);
          
          dino_q = new MovableItem("level3/Q.png",dinoscore,"",3);
          dino_q.attr({
            x: 1368,
            y: cc.winSize.height -1084,
           anchorX : 0,
           anchorY : 1
     });
          dino_q.id = 17;
          this.addChild(dino_q, 1);
          
          dino_r = new MovableItem("level3/R.png",dinoscore,"",3);
          dino_r.attr({
            x: 1397,
            y:  cc.winSize.height -1181,
           anchorX : 0,
           anchorY : 1
     });
          dino_r.id = 18;
          this.addChild(dino_r, 1);
         
          
          dino_s = new MovableItem("level3/S.png",dinoscore,"",3);
          dino_s.attr({
            x: 1574,
            y:  cc.winSize.height -797,
           anchorX : 0,
           anchorY : 1
     });
          dino_s.id = 19;
          this.addChild(dino_s, 1);
          
          dino_t = new MovableItem("level3/T.png",dinoscore,"",3);
          dino_t.attr({
            x: 1651,
            y: cc.winSize.height -816,
           anchorX : 0,
           anchorY : 1
     });
          dino_t.id = 20;
          this.addChild(dino_t, 1);
          
          dino_u = new MovableItem("level3/U.png",dinoscore,"",3);
          dino_u.attr({
            x: 1703,
            y: cc.winSize.height -872,
           anchorX : 0,
           anchorY : 1
     });
          dino_u.id = 21;
          this.addChild(dino_u, 1); 
          
          dino_v = new MovableItem("level3/V.png",dinoscore,"",3);
          dino_v.attr({
            x: 1779,
            y: cc.winSize.height -945,
           anchorX : 0,
           anchorY : 1
     });
          dino_v.id = 22;
          this.addChild(dino_v, 1);
          
          dino_w = new MovableItem("level3/W.png",dinoscore,"",3);
          dino_w.attr({
            x: 1830,
            y: cc.winSize.height -1009,
           anchorX : 0,
           anchorY : 1
     });
          dino_w.id = 23;
          this.addChild(dino_w, 1);
          
          dino_x = new MovableItem("level3/X.png",dinoscore,"",3);
          dino_x.attr({
            x: 1871,
            y: cc.winSize.height -1091,
           anchorX : 0,
           anchorY : 1
     });
          dino_x.id = 24;
          this.addChild(dino_x, 1);
          
          dino_y = new MovableItem("level3/Y.png",dinoscore,"",3);
          dino_y.attr({
            x: 1926,
            y: cc.winSize.height -1159,
           anchorX : 0,
           anchorY : 1
     });
          dino_y.id = 25;
          this.addChild(dino_y, 1);
          
          dino_z = new MovableItem("level3/Z.png",dinoscore,"",3);
          dino_z.attr({
            x: 1943,
            y: cc.winSize.height -1210,
            anchorX : 0,
           anchorY : 1
     });
          dino_z.id = 26;
          this.addChild(dino_z, 1);
          
        alphadino = [dino_a,dino_b,dino_c,dino_d,dino_e,dino_f,dino_g,dino_h,dino_i,dino_j, dino_k,dino_l,dino_m,
                    dino_n,dino_o,dino_p,dino_q,  dino_r,dino_s,dino_t, dino_u,dino_v,dino_w,dino_x,dino_y,dino_z];
                    
        alphadino1 = [{x:599,y:cc.winSize.height -964},{x:688,y:cc.winSize.height -868},{x:547,y:cc.winSize.height -571},{x:788,y:cc.winSize.height -765},{x:677,y:cc.winSize.height -364},{x:841,y:cc.winSize.height -268},
                      {x:940,y:cc.winSize.height -750},{x:1042,y:cc.winSize.height -681},{x:1018,y:cc.winSize.height -905},{x:938,y:cc.winSize.height -1111},{x:1005,y:cc.winSize.height -434},{x:1171,y:cc.winSize.height-664},
                      {x:1240,y:cc.winSize.height -664},{x:1365,y:cc.winSize.height -695},{x:1466,y:cc.winSize.height -729},{x:1388,y:cc.winSize.height -914},{x:1368,y:cc.winSize.height -1084},{x:1397,y:cc.winSize.height -1181},{x:1574,y:cc.winSize.height -797},
                      {x:1651,y:cc.winSize.height -816},{x:1703,y:cc.winSize.height -872},{x:1779,y:cc.winSize.height -945},{x:1803,y:cc.winSize.height -1009},{x:1871,y:cc.winSize.height -1091},{x:1926,y:cc.winSize.height -1159},{x:1943,y:cc.winSize.height -1210}];              
             
                    
       spritePosition = [{x:70,y:730},{x:1190,y:105},{x:545,y:720},{x:180,y:375},{x:200,y:620},{x:395,y:75},
                        {x:225,y:95},{x:55,y:340},{x:355,y:165},{x:570,y:85},{x:985,y:535},{x:1140,y:465},
                        {x:1135,y:595},{x:1095,y:125},{x:670,y:650},{x:255,y:265},{x:730,y:730},{x:100,y:150},{x:850,y:610},
                        {x:100,y:490},{x:835,y:120},{x:355,y:715},{x:985,y:705},{x:685,y:110},{x:935,y:235},{x:1000,y:100}];            
    
          
        this.scheduleOnce(this.randomPosition , 1); 
       targetSquareBox1 = this.targetSquareBox;
       self = this;
       this.scheduleUpdate();
       
       return true;
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
  }  ,
  
    update:function(dt)
        {
              if(dinoscore == 4)
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
      
    this.dinono = new ClickedButtonToRedirect("menu/no.png", "no3", this);
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
        
    toRemovePopup:function(){
    this.dinoyes.removeFromParent(true);
    this.dinono.removeFromParent(true);
    this.dinomenu.removeFromParent(true);
        },
        
  AfterGameCompleteMenuPopup : function(){
                            
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
    
    this.dinonext = new ClickedButtonToRedirect("menu/Next.png", "menus");
    this.dinonext .attr({
      x: (400/1280)*cc.winSize.width,
      y: (300/800)*cc.winSize.height,
     anchorX : 0,
     anchorY : 1,
      });
    this.addChild(this.dinonext , 1);
        }
});

var Level13Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new Level13Layer();
        // toCallLevel3ScenePopupElement = layer;
        this.addChild(layer);
    }
});
