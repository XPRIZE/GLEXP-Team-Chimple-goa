/// <reference path="../../cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />

var xc = xc || {};

xc.DecomonLayer = cc.Layer.extend({
    self :null,
    size : null,
    eye_array : null,
    mouth_array :null,
    skate_array : null,
    headgear_array:null,
    noise_array :null,
    mustache_array :null,
   label:null,

  ctor: function () {
        this._super();
        
        size = cc.winSize;
        self = this;

      var background = ccs.load(xc.DecomonLayer.res.decomon_main, xc.path);
        cc.log(xc);
        this.addChild(background.node);


     label = new cc.LabelTTF("A", xc.DecomonLayer.res.baloobhai_ttf, 1500);
     label.setPositionX(1500);
     label.setPositionY(900);
     label.setColor(255,255,255);
     this.addChild(label,1);

var sprite_click = cc.EventListener.create({event: cc.EventListener.TOUCH_ONE_BY_ONE, swallowTouches:true,
    
    onTouchBegan : function(touch, event)
    {
        var target = event.getCurrentTarget();
        var location = target.convertToNodeSpace(touch.getLocation());
        var targetSize = target.getContentSize();
        var targetRect = cc.rect(0, 0, target.width, target.height);
        
        if(cc.rectContainsPoint(targetRect, location))
        {
                if(target.id == "eye")
                {
                     for(i=0;i<eye_array.length;i++)
                     {
                         eye_array[i].setVisible(true);
                     }
                      for(a=0;a<headgear_array.length;a++)
                  {
                    headgear_array[a].setVisible(false);
                  }
                  for(c=0;c<noise_array.length;c++)
                  {
                     noise_array[c].setVisible(false);
                  }

                     for(j=0;j<mouth_array.length;j++)
                {
                  mouth_array[j].setVisible(false);
                }

                      for(k=0;k<skate_array.length;k++)
                  {
                     skate_array[k].setVisible(false);
                  }
                  for(c=0;c<noise_array.length;c++)
                  {
                     noise_array[c].setVisible(false);
                  }
                   for(d=0;d<mustache_array.length;d++)
                  {
                    mustache_array[d].setVisible(false);
                  }
                }
               
                else if(target.id == "mouth")
                {
                for(j=0;j<skate_array.length;j++)
                      {
                        skate_array[j].setVisible(false);
                      }
                       for(i=0;i<eye_array.length;i++)
                     {
                         eye_array[i].setVisible(false);
                     }
                      for(a=0;a<headgear_array.length;a++)
                  {
                    headgear_array[a].setVisible(false);
                  }

                 for(j=0;j<mouth_array.length;j++)
                {
                  mouth_array[j].setVisible(true);
                }
                for(c=0;c<noise_array.length;c++)
                  {
                     noise_array[c].setVisible(false);
                  }
                   for(d=0;d<mustache_array.length;d++)
                  {
                    mustache_array[d].setVisible(false);
                  }
                }
                else if(target.id =="skate")
                {
                 for(j=0;j<mouth_array.length;j++)
                {
                  mouth_array[j].setVisible(false);
                }
                 for(i=0;i<eye_array.length;i++)
                     {
                         eye_array[i].setVisible(false);
                     }
                      for(a=0;a<headgear_array.length;a++)
                  {
                    headgear_array[a].setVisible(false);
                  }

                  for(k=0;k<skate_array.length;k++)
                  {
                     skate_array[k].setVisible(true);
                  }
                  for(c=0;c<noise_array.length;c++)
                  {
                     noise_array[c].setVisible(false);
                  }
                   for(d=0;d<mustache_array.length;d++)
                  {
                    mustache_array[d].setVisible(false);
                  }
                }
                else if(target.id=="headgear"){

                  for(a=0;a<headgear_array.length;a++)
                  {
                    headgear_array[a].setVisible(true);
                  }

                   for(j=0;j<mouth_array.length;j++)
                {
                  mouth_array[j].setVisible(false);
                }
                 for(i=0;i<eye_array.length;i++)
                     {
                         eye_array[i].setVisible(false);
                     }

                  for(k=0;k<skate_array.length;k++)
                  {
                     skate_array[k].setVisible(false);
                  }
                   for(c=0;c<noise_array.length;c++)
                  {
                     noise_array[c].setVisible(false);
                  }
                   for(d=0;d<mustache_array.length;d++)
                  {
                    mustache_array[d].setVisible(false);
                  }
                }
                else if(target.id=="noise")
                {
                   for(c=0;c<noise_array.length;c++)
                  {
                     noise_array[c].setVisible(true);
                  }
                  for(a=0;a<headgear_array.length;a++)
                  {
                    headgear_array[a].setVisible(false);
                  }

                   for(j=0;j<mouth_array.length;j++)
                {
                  mouth_array[j].setVisible(false);
                }
                 for(i=0;i<eye_array.length;i++)
                     {
                         eye_array[i].setVisible(false);
                     }

                  for(k=0;k<skate_array.length;k++)
                  {
                     skate_array[k].setVisible(false);
                  }
                   for(d=0;d<mustache_array.length;d++)
                  {
                    mustache_array[d].setVisible(false);
                  }
                }
                else if(target.id == "mustache")
                {
                  for(d=0;d<mustache_array.length;d++)
                  {
                    mustache_array[d].setVisible(true);
                  }
                   for(c=0;c<noise_array.length;c++)
                  {
                     noise_array[c].setVisible(false);
                  }
                  for(a=0;a<headgear_array.length;a++)
                  {
                    headgear_array[a].setVisible(false);
                  }

                   for(j=0;j<mouth_array.length;j++)
                {
                  mouth_array[j].setVisible(false);
                }
                 for(i=0;i<eye_array.length;i++)
                     {
                         eye_array[i].setVisible(false);
                     }

                  for(k=0;k<skate_array.length;k++)
                  {
                     skate_array[k].setVisible(false);
                  }
                }

                return true;
        }
        
        return false;
    },

    onTouchMove : function(touch, event)
    {
      var target = event.getCurrentTarget();
      var location = target.convertToNodeSpace(touch.getLocation());
		  target.setPosition(touch.getLocation());  

      if(target.id==1)
        cc.log("");

        var toyRect = target.getBoundingBox();
        var toytRect = label.getBoundingBox();

        if(cc.rectIntersectsRect(toyRect, toytRect)){
         var decoalpha = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(target.getName())); 
         decoalpha.attr({
           x:location.x,
           y:location.y
         }) ;
         self.addChild(decoalpha);
         
    }
    },
    
    onTouchEnded : function(touch, event)
    {
        
    }
        
});
        var eye = background.node.getChildByName("decomon_eye_icon");
        eye.id = "eye";
      cc.eventManager.addListener(sprite_click.clone(), eye);

         var eyea = ccs.load(xc.DecomonLayer.res.decomon_eyea, xc.path);   
                      eyea.node.attr({
                        x : size.width * .12,
                        y : size.height * .10
                      });
                      self.addChild(eyea.node); 
                    //  eyea.node.id =1;
                  //    eyea.node.setVisible(false);
                  var aa = eyea.node.getChildByName("Sprite_8");
                  aa.id = 1;
                    cc.eventManager.addListener(sprite_click.clone(),aa);
                      
        var eyeb = ccs.load(xc.DecomonLayer.res.decomon_eyeb, xc.path);   
                      eyeb.node.attr({
                        x : size.width * .22,
                        y : size.height * .10
                      });
                      self.addChild(eyeb.node);
                       eyeb.node.setVisible(false);
                       eyeb.node.id = 2;
                        cc.eventManager.addListener(sprite_click.clone(),eyeb.node);
                        // getChildByName("eye_abcfh_ballout_angry_12"));

      var eyec = ccs.load(xc.DecomonLayer.res.decomon_eyec, xc.path);   
                      eyec.node.attr({
                        x : size.width * .32,
                        y : size.height * .10
                      });
                      self.addChild(eyec.node);
                       eyec.node.setVisible(false);
                        cc.eventManager.addListener(sprite_click.clone(),eyec.node);

       var eyed = ccs.load(xc.DecomonLayer.res.decomon_eyed, xc.path);   
                      eyed.node.attr({
                        x : size.width * .42,
                        y : size.height * .10
                      });
                      self.addChild(eyed.node);
                       eyed.node.setVisible(false);
                        cc.eventManager.addListener(sprite_click.clone(),eyed.node);

        var eyee = ccs.load(xc.DecomonLayer.res.decomon_eyee, xc.path);   
                      eyee.node.attr({
                        x : size.width * .52,
                        y : size.height * .10
                      });
                      self.addChild(eyee.node);
                       eyee.node.setVisible(false);
                        cc.eventManager.addListener(sprite_click.clone(),eyee.node);

     var eyef = ccs.load(xc.DecomonLayer.res.decomon_eyef, xc.path);   
                      eyef.node.attr({
                        x : size.width * .62,
                        y : size.height * .10
                      });
                      self.addChild(eyef.node);
                       eyef.node.setVisible(false);
                        cc.eventManager.addListener(sprite_click.clone(),eyef.node);

    var eyeg = ccs.load(xc.DecomonLayer.res.decomon_eyeg, xc.path);   
                      eyeg.node.attr({
                        x : size.width * .72,
                        y : size.height * .10
                      });
                      self.addChild(eyeg.node);
                       eyeg.node.setVisible(false);
                        cc.eventManager.addListener(sprite_click.clone(),eyeg.node);

     var eyeh = ccs.load(xc.DecomonLayer.res.decomon_eyeh, xc.path);   
                      eyeh.node.attr({
                        x : size.width * .82,
                        y : size.height * .10
                      });
                      self.addChild(eyeh.node);
                       eyeh.node.setVisible(false);
                        cc.eventManager.addListener(sprite_click.clone(),eyeh.node);

     var eyei = ccs.load(xc.DecomonLayer.res.decomon_eyei, xc.path);   
                      eyei.node.attr({
                        x : size.width * .92,
                        y : size.height * .10
                      });
                      self.addChild(eyei.node);
                     eyei.node.setVisible(false);
                      cc.eventManager.addListener(sprite_click.clone(),eyei.node);

    eye_array = [eyea.node,eyeb.node,eyec.node,eyed.node,eyee.node,eyef.node,eyeg.node,eyeh.node,eyei.node];

     var mouth = background.node.getChildByName("decomon_mouth_icon");
     mouth.id = "mouth";
     cc.eventManager.addListener(sprite_click.clone(), mouth);
     
     var moutha = ccs.load(xc.DecomonLayer.res.decomon_moutha, xc.path);   
                      moutha.node.attr({
                        x : size.width * .12,
                        y : size.height * .10
                      });
                      self.addChild(moutha.node,1); 
                    //  moutha.node.id =1;
                      moutha.node.setVisible(false);
                    cc.eventManager.addListener(sprite_click.clone(),moutha.node);
                      
        var mouthb = ccs.load(xc.DecomonLayer.res.decomon_mouthb, xc.path);   
                      mouthb.node.attr({
                        x : size.width * .22,
                        y : size.height * .10
                      });
                      self.addChild(mouthb.node);
                       mouthb.node.setVisible(false);
                    //   mouthb.node.id = 2;
                        cc.eventManager.addListener(sprite_click.clone(),mouthb.node);
                        // getChildByName("eye_abcfh_ballout_angry_12"));

      var mouthc = ccs.load(xc.DecomonLayer.res.decomon_mouthc, xc.path);   
                      mouthc.node.attr({
                        x : size.width * .32,
                        y : size.height * .10
                      });
                      self.addChild(mouthc.node);
                       mouthc.node.setVisible(false);
                        cc.eventManager.addListener(sprite_click.clone(),mouthc.node);

       var mouthd = ccs.load(xc.DecomonLayer.res.decomon_mouthd, xc.path);   
                      mouthd.node.attr({
                        x : size.width * .42,
                        y : size.height * .10
                      });
                      self.addChild(mouthd.node);
                       mouthd.node.setVisible(false);
                        cc.eventManager.addListener(sprite_click.clone(),mouthd.node);

        var mouthe = ccs.load(xc.DecomonLayer.res.decomon_mouthe, xc.path);   
                      mouthe.node.attr({
                        x : size.width * .52,
                        y : size.height * .10
                      });
                      self.addChild(mouthe.node);
                       mouthe.node.setVisible(false);
                        cc.eventManager.addListener(sprite_click.clone(),mouthe.node);

     var mouthf = ccs.load(xc.DecomonLayer.res.decomon_mouthf, xc.path);   
                      mouthf.node.attr({
                        x : size.width * .62,
                        y : size.height * .10
                      });
                      self.addChild(mouthf.node);
                       mouthf.node.setVisible(false);
                        cc.eventManager.addListener(sprite_click.clone(),mouthf.node);

    var mouthg = ccs.load(xc.DecomonLayer.res.decomon_mouthg, xc.path);   
                      mouthg.node.attr({
                        x : size.width * .72,
                        y : size.height * .10
                      });
                      self.addChild(mouthg.node);
                       mouthg.node.setVisible(false);
                        cc.eventManager.addListener(sprite_click.clone(),mouthg.node);

     var mouthh = ccs.load(xc.DecomonLayer.res.decomon_mouthh, xc.path);   
                      mouthh.node.attr({
                        x : size.width * .82,
                        y : size.height * .10
                      });
                      self.addChild(mouthh.node);
                       mouthh.node.setVisible(false);
                        cc.eventManager.addListener(sprite_click.clone(),mouthh.node);

     var mouthi = ccs.load(xc.DecomonLayer.res.decomon_mouthi, xc.path);   
                      mouthi.node.attr({
                        x : size.width * .92,
                        y : size.height * .10
                      });
                      self.addChild(mouthi.node);
                     mouthi.node.setVisible(false);
                      cc.eventManager.addListener(sprite_click.clone(),mouthi.node);

    mouth_array = [moutha.node,mouthb.node,mouthc.node,mouthd.node,mouthe.node,mouthf.node,mouthg.node,mouthh.node,mouthi.node];

    var skate = background.node.getChildByName("decomon_skate_icon");
     skate.id = "skate";
     cc.eventManager.addListener(sprite_click.clone(), skate);

     var skate1 = ccs.load(xc.DecomonLayer.res.decomon_skate1, xc.path);   
                      skate1.node.attr({
                        x : size.width * .15,
                        y : size.height * .15
                      });
                      self.addChild(skate1.node,1); 
                    //  moutha.node.id =1;
                      skate1.node.setVisible(false);
                    cc.eventManager.addListener(sprite_click.clone(),skate1.node);
                      
        var skate2 = ccs.load(xc.DecomonLayer.res.decomon_skate2, xc.path);   
                      skate2.node.attr({
                        x : size.width * .25,
                        y : size.height * .15
                      });
                      self.addChild(skate2.node);
                       skate2.node.setVisible(false);
                    //   mouthb.node.id = 2;
                        cc.eventManager.addListener(sprite_click.clone(),skate2.node);
                        // getChildByName("eye_abcfh_ballout_angry_12"));

      var skate3 = ccs.load(xc.DecomonLayer.res.decomon_skate3, xc.path);   
                      skate3.node.attr({
                        x : size.width * .35,
                        y : size.height * .15
                      });
                      self.addChild(skate3.node);
                       skate3.node.setVisible(false);
                        cc.eventManager.addListener(sprite_click.clone(),skate3.node);

       var skate4 = ccs.load(xc.DecomonLayer.res.decomon_skate4, xc.path);   
                      skate4.node.attr({
                        x : size.width * .55,
                        y : size.height * .15
                      });
                      self.addChild(skate4.node);
                       skate4.node.setVisible(false);
                        cc.eventManager.addListener(sprite_click.clone(),skate4.node);

        var skate5 = ccs.load(xc.DecomonLayer.res.decomon_skate5, xc.path);   
                      skate5.node.attr({
                        x : size.width * .70,
                        y : size.height * .15
                      });
                      self.addChild(skate5.node);
                       skate5.node.setVisible(false);
                        cc.eventManager.addListener(sprite_click.clone(),skate5.node);

     var skate6 = ccs.load(xc.DecomonLayer.res.decomon_skate6, xc.path);   
                      skate6.node.attr({
                        x : size.width * .80,
                        y : size.height * .15
                      });
                      self.addChild(skate6.node);
                       skate6.node.setVisible(false);
                        cc.eventManager.addListener(sprite_click.clone(),skate6.node);

    var skate7 = ccs.load(xc.DecomonLayer.res.decomon_skate7, xc.path);   
                      skate7.node.attr({
                        x : size.width * .90,
                        y : size.height * .15
                      });
                      self.addChild(skate7.node);
                       skate7.node.setVisible(false);
                        cc.eventManager.addListener(sprite_click.clone(),skate7.node);

     var skate8 = ccs.load(xc.DecomonLayer.res.decomon_skate8, xc.path);   
                      skate8.node.attr({
                        x : size.width * .95,
                        y : size.height * .15
                      });
                      self.addChild(skate8.node);
                       skate8.node.setVisible(false);
                        cc.eventManager.addListener(sprite_click.clone(),skate8.node);

    skate_array = [skate1.node,skate2.node,skate3.node,skate4.node,skate5.node,skate6.node,skate7.node,skate8.node];

     var headgear = background.node.getChildByName("decomon_horn_icon");
     headgear.id = "headgear";
     cc.eventManager.addListener(sprite_click.clone(), headgear);

    var headgear1 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon2/decomon_headgear_1.png"));
    headgear1.attr({
      x:size.width*0.12,
      y:size.height *0.10
    });
    self.addChild(headgear1);
    headgear1.setVisible(false);
    cc.eventManager.addListener(sprite_click.clone(),headgear1);

    var headgear2 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon2/decomon_headgear_2.png"));
    headgear1.attr({
      x:size.width*0.22,
      y:size.height *0.10
    });
    self.addChild(headgear2);
    headgear2.setVisible(false);
    cc.eventManager.addListener(sprite_click.clone(),headgear2);

    var headgear3 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon2/decomon_headgear_3.png"));
    headgear3.attr({
      x:size.width*0.32,
      y:size.height *0.10
    });
    self.addChild(headgear3);
    headgear3.setVisible(false);
    cc.eventManager.addListener(sprite_click.clone(),headgear3);

    var headgear4 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon2/decomon_headgear_4.png"));
    headgear4.attr({
      x:size.width*0.42,
      y:size.height *0.10
    });
    self.addChild(headgear4);
    headgear4.setVisible(false);
    cc.eventManager.addListener(sprite_click.clone(),headgear4);


    var headgear5 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon2/decomon_headgear_5.png"));
    headgear5.attr({
      x:size.width*0.52,
      y:size.height *0.10
    });
    self.addChild(headgear5);
    headgear5.setVisible(false);
    cc.eventManager.addListener(sprite_click.clone(),headgear5);

    var headgear6 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon2/decomon_headgear_6.png"));
    headgear6.attr({
      x:size.width*0.62,
      y:size.height *0.10
    });
    self.addChild(headgear6);
    headgear6.setVisible(false);
    cc.eventManager.addListener(sprite_click.clone(),headgear6);

    var headgear7 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon2/decomon_headgear_7.png"));
    headgear7.attr({
      x:size.width*0.72,
      y:size.height *0.10
    });
    self.addChild(headgear7);
    headgear7.setVisible(false);
    cc.eventManager.addListener(sprite_click.clone(),headgear7);

  headgear_array = [headgear1,headgear2,headgear3,headgear4,headgear5,headgear6,headgear7];

  var noise = background.node.getChildByName("decomon_nose_icon");
  noise.id = "noise";
 cc.eventManager.addListener(sprite_click.clone(), noise);

 var noise1 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon3/decomon_nose_1.png"));
    noise1.attr({
      x:size.width*0.12,
      y:size.height *0.10
    });
    self.addChild(noise1);
    noise1.setVisible(false);
    cc.eventManager.addListener(sprite_click.clone(),noise1);

    
 var noise2 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon3/decomon_nose_2.png"));
    noise2.attr({
      x:size.width*0.22,
      y:size.height *0.10
    });
    self.addChild(noise2);
    noise2.setVisible(false);
    cc.eventManager.addListener(sprite_click.clone(),noise2);

    var noise3 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon3/decomon_nose_3.png"));
    noise3.attr({
      x:size.width*0.32,
      y:size.height *0.10
    });
    self.addChild(noise3);
    noise3.setVisible(false);
    cc.eventManager.addListener(sprite_click.clone(),noise3);

    var noise4 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon3/decomon_nose_4.png"));
    noise4.attr({
      x:size.width*0.42,
      y:size.height *0.10
    });
    self.addChild(noise4);
    noise4.setVisible(false);
    cc.eventManager.addListener(sprite_click.clone(),noise4);

    var noise5 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon3/decomon_nose_5.png"));
    noise5.attr({
      x:size.width*0.52,
      y:size.height *0.10
    });
    self.addChild(noise5);
    noise5.setVisible(false);
    cc.eventManager.addListener(sprite_click.clone(),noise5);

    var noise6 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon3/decomon_nose_6.png"));
    noise6.attr({
      x:size.width*0.62,
      y:size.height *0.10
    });
    self.addChild(noise6);
    noise6.setVisible(false);
    cc.eventManager.addListener(sprite_click.clone(),noise6);

    var noise7 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon3/decomon_nose_7.png"));
    noise7.attr({
      x:size.width*0.62,
      y:size.height *0.10
    });
    self.addChild(noise6);
    noise7.setVisible(false);
    cc.eventManager.addListener(sprite_click.clone(),noise7);

    noise_array = [noise1,noise2,noise3,noise4,noise5,noise6,noise7];

  var mustache = background.node.getChildByName("decomon_mustache_icon");
  mustache.id = "mustache";
  cc.eventManager.addListener(sprite_click.clone(), mustache);

  var mustache1 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon3/decomon_hair_1.png"));
    mustache1.attr({
      x:size.width*0.12,
      y:size.height *0.10
    });
    self.addChild(mustache1);
    mustache1.setVisible(false);
    cc.eventManager.addListener(sprite_click.clone(),mustache1);

    var mustache2 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon3/decomon_hair_2.png"));
    mustache2.attr({
      x:size.width*0.22,
      y:size.height *0.10
    });
    self.addChild(mustache2);
    mustache2.setVisible(false);
    cc.eventManager.addListener(sprite_click.clone(),mustache2);

    var mustache3 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon3/decomon_hair_3.png"));
    mustache3.attr({
      x:size.width*0.32,
      y:size.height *0.10
    });
    self.addChild(mustache3);
    mustache3.setVisible(false);
    cc.eventManager.addListener(sprite_click.clone(),mustache3);

    var mustache4 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon3/decomon_hair_4.png"));
    mustache4.attr({
      x:size.width*0.42,
      y:size.height *0.10
    });
    self.addChild(mustache4);
    mustache4.setVisible(false);
    cc.eventManager.addListener(sprite_click.clone(),mustache4);

    var mustache5 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon3/decomon_hair_5.png"));
    mustache5.attr({
      x:size.width*0.52,
      y:size.height *0.10
    });
    self.addChild(mustache5);
    mustache5.setVisible(false);
    cc.eventManager.addListener(sprite_click.clone(),mustache5);
    
      mustache_array = [mustache1,mustache2,mustache3,mustache4,mustache5];
}
});

xc.DecomonLayer.res = {
        decomon_main : xc.path + "decomon/decomon.json",
        decomon_plist :xc.path + "decomon/decomon1/decomon1.plist",
        decomon2_plist :xc.path + "decomon/decomon2/decomon2.plist",
        decomon3_plist :xc.path + "decomon/decomon3/decomon3.plist",
        decomon1_png : xc.path +  "decomon/decomon1/decomon1.png",
        decomon2_png : xc.path +  "decomon/decomon2/decomon2.png",
        decomon3_png : xc.path +  "decomon/decomon3/decomon3.png",
        decomon_eyea : xc.path + "decomon/decomon_eye_a.json",
        decomon_eyeb : xc.path + "decomon/decomon_eye_b.json",
        decomon_eyec : xc.path + "decomon/decomon_eye_c.json",
        decomon_eyed : xc.path + "decomon/decomon_eye_d.json",
        decomon_eyee : xc.path + "decomon/decomon_eye_e.json",
        decomon_eyef : xc.path + "decomon/decomon_eye_f.json",
        decomon_eyeg : xc.path + "decomon/decomon_eye_g.json",
        decomon_eyeh : xc.path + "decomon/decomon_eye_h.json",
        decomon_eyei : xc.path + "decomon/decomon_eye_i.json",
        decomon_moutha : xc.path + "decomon/decomon_mouth_a.json",
        decomon_mouthb : xc.path + "decomon/decomon_mouth_b.json",
        decomon_mouthc : xc.path + "decomon/decomon_mouth_c.json",
        decomon_mouthd : xc.path + "decomon/decomon_mouth_d.json",
        decomon_mouthe : xc.path + "decomon/decomon_mouth_e.json",
        decomon_mouthf : xc.path + "decomon/decomon_mouth_f.json",
        decomon_mouthg : xc.path + "decomon/decomon_mouth_g.json",
        decomon_mouthh : xc.path + "decomon/decomon_mouth_h.json",
        decomon_mouthi : xc.path + "decomon/decomon_mouth_i.json",
        decomon_skate1 : xc.path + "decomon/decomon_skate_a.json",
        decomon_skate2 : xc.path + "decomon/decomon_skate_b.json",
        decomon_skate3 : xc.path + "decomon/decomon_skate_c.json",
        decomon_skate4 : xc.path + "decomon/decomon_skate_d.json",
        decomon_skate5 : xc.path + "decomon/decomon_skate_e.json",
        decomon_skate6 : xc.path + "decomon/decomon_skate_f.json",
        decomon_skate7 : xc.path + "decomon/decomon_skate_g.json",
        decomon_skate8 : xc.path + "decomon/decomon_skate_h.json",
        baloobhai_ttf: xc.path + "fonts/BalooBhai-Regular.ttf"
};