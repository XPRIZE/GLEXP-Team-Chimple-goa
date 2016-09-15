/// <reference path="../../cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />

var xc = xc || {};

xc.DecomonLayer = cc.Layer.extend({
    self :null,
    size : null,
    eye_array : null,
    mouth_array :null,
    nose_array : null,
    horn_array : null,
    paint_array : null,
    gear_array :null,
    mustache_array : null,
    skate_array : null,
    label :null,
   // _ScrollableButtonPanel:null,

  ctor: function () {
        this._super();
        
        size = cc.winSize;
        self = this;
        var overlapped = 0;

      var background = ccs.load(xc.DecomonLayer.res.decomon_main, xc.path);
        cc.log(xc);
        this.addChild(background.node);


     label = new cc.LabelTTF("A", "Baloo Bhai", 2000);
     label.setPositionX(1300);
     label.setPositionY(950);
     label.setColor(cc.color.WHITE);
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
                         eye_array[i].setGlobalZOrder(2);
                         eye_array[i].setVisible(true);
                     }
                     for(s=0;s<skate_array.length;s++)
                     {
                        skate_array[s].setGlobalZOrder(0);
                        skate_array[s].setVisible(false);
                  }
                     for(m=0;m<mustache_array.length;m++)
                  {
                    mustache_array[m].setGlobalZOrder(0);
                    mustache_array[m].setVisible(false);
                  }
                      for(j=0;j<mouth_array.length;j++)
                      {
                       mouth_array[j].setGlobalZOrder(0);
                       mouth_array[j].setVisible(false);
                }
                for(n=0;n<nose_array.length;n++)
                  {
                    nose_array[n].setGlobalZOrder(0);
                    nose_array[n].setVisible(false);
                  }
                   for(h=0;h<horn_array.length;h++)
                  {
                    horn_array[h].setGlobalZOrder(0);
                    horn_array[h].setVisible(false);
                  }
                  for(p=0;p<paint_array.length;p++)
                  {
                    paint_array[p].setGlobalZOrder(0);
                    paint_array[p].setVisible(false);
                  }
                  
                  for(g=0;g<gear_array.length;g++)
                  {
                     gear_array[g].setGlobalZOrder(0);
                     gear_array[g].setVisible(false);
                  }
                }
               
                else if(target.id == "mouth")
                {

                for(j=0;j<mouth_array.length;j++)
                {  
                  mouth_array[j].setGlobalZOrder(2);
                  mouth_array[j].setVisible(true);
                }
                for(s=0;s<skate_array.length;s++)
                {
                    skate_array[s].setGlobalZOrder(0);
                    skate_array[s].setVisible(false);
                }
                for(m=0;m<mustache_array.length;m++)
                  {
                    mustache_array[m].setGlobalZOrder(0);
                    mustache_array[m].setVisible(false);
                  }
                 for(i=0;i<eye_array.length;i++)
                     {
                         eye_array[i].setGlobalZOrder(0);
                         eye_array[i].setVisible(false);
                     }
                     for(n=0;n<nose_array.length;n++)
                  {
                    nose_array[n].setGlobalZOrder(0);
                    nose_array[n].setVisible(false);
                  }
                   for(h=0;h<horn_array.length;h++)
                  {
                    horn_array[h].setGlobalZOrder(0);
                    horn_array[h].setVisible(false);
                  }
                  for(p=0;p<paint_array.length;p++)
                  {
                    paint_array[p].setGlobalZOrder(0);
                    paint_array[p].setVisible(false);
                  }
                  
                  for(g=0;g<gear_array.length;g++){
                    gear_array[g].setGlobalZOrder(0);
                    gear_array[g].setVisible(false);
                  }
                  
                }
                else if(target.id == "nose" )
                {
                  for(s=0;s<skate_array.length;s++)
                  {
                    skate_array[s].setGlobalZOrder(0);
                    skate_array[s].setVisible(false);
                  }
                  for(m=0;m<mustache_array.length;m++)
                  {
                    mustache_array[m].setGlobalZOrder(0);
                    mustache_array[m].setVisible(false);
                  }
                  for(j=0;j<mouth_array.length;j++){
                      mouth_array[j].setGlobalZOrder(0);
                      mouth_array[j].setVisible(false);
                }
                 for(i=0;i<eye_array.length;i++)
                     {
                        eye_array[i].setGlobalZOrder(0);
                        eye_array[i].setVisible(false);
                     }
                     for(h=0;h<horn_array.length;h++)
                  {
                    horn_array[h].setGlobalZOrder(0);
                    horn_array[h].setVisible(false);
                  }
                  for(p=0;p<paint_array.length;p++)
                  {
                    paint_array[p].setGlobalZOrder(0);
                    paint_array[p].setVisible(false);
                  }
                  
                  for(g=0;g<gear_array.length;g++){
                   gear_array[g].setGlobalZOrder(0);
                   gear_array[g].setVisible(false);
                  }
                  for(n=0;n<nose_array.length;n++)
                  {
                    nose_array[n].setGlobalZOrder(2);
                    nose_array[n].setVisible(true);
                  }

                }
                
                else if(target.id == "horn")
                {
                  for(h=0;h<horn_array.length;h++)
                  {
                    horn_array[h].setGlobalZOrder(2);
                    horn_array[h].setVisible(true);
                  }
                  for(s=0;s<skate_array.length;s++)
                  {
                    skate_array[s].setGlobalZOrder(0);
                    skate_array[s].setVisible(false);
                  }
                  for(m=0;m<mustache_array.length;m++)
                  {
                    mustache_array[m].setGlobalZOrder(0);
                    mustache_array[m].setVisible(false);
                  }
                  for(g=0;g<gear_array.length;g++)
                  {
                    gear_array[g].setGlobalZOrder(0);
                    gear_array[g].setVisible(false);
                  }
                  for(n=0;n<nose_array.length;n++)
                  {
                    nose_array[n].setGlobalZOrder(0);
                    nose_array[n].setVisible(false);
                  }
                  for(j=0;j<mouth_array.length;j++)
                  {
                      mouth_array[j].setGlobalZOrder(0);
                      mouth_array[j].setVisible(false);
                  }
                 for(i=0;i<eye_array.length;i++)
                     {
                       eye_array[i].setGlobalZOrder(0);
                       eye_array[i].setVisible(false);
                     }
                     for(p=0;p<paint_array.length;p++)
                  {
                    paint_array[p].setGlobalZOrder(0);
                    paint_array[p].setVisible(false);
                  }
               }
                else if(target.id == "paint")
                {
                  for(p=0;p<paint_array.length;p++)
                  {
                    paint_array[p].setGlobalZOrder(2);
                    paint_array[p].setVisible(true);
                  }
                  for(s=0;s<skate_array.length;s++)
                  {
                    skate_array[s].setGlobalZOrder(0);
                    skate_array[s].setVisible(false);
                  }
                  for(m=0;m<mustache_array.length;m++)
                  {
                    mustache_array[m].setGlobalZOrder(0);
                    mustache_array[m].setVisible(false);
                  }
                   for(h=0;h<horn_array.length;h++)
                  {
                    horn_array[h].setGlobalZOrder(0);
                    horn_array[h].setVisible(false);
                  }
                  for(n=0;n<nose_array.length;n++)
                  {
                    nose_array[n].setGlobalZOrder(0);
                    nose_array[n].setVisible(false);
                  }
                  for(j=0;j<mouth_array.length;j++)
                  {
                   mouth_array[j].setGlobalZOrder(0);
                   mouth_array[j].setVisible(false);
                }
                 for(i=0;i<eye_array.length;i++)
                     {
                        eye_array[i].setGlobalZOrder(0);
                        eye_array[i].setVisible(false);
                     }
                     for(g=0;g<gear_array.length;g++)
                  {
                    gear_array[g].setGlobalZOrder(0);
                    gear_array[g].setVisible(false);
                  }
                }
                
                else if(target.id=="gear")
                {
                  for(g=0;g<gear_array.length;g++)
                  {
                    gear_array[g].setGlobalZOrder(2);
                    gear_array[g].setVisible(true);
                  }
                  for(s=0;s<skate_array.length;s++)
                  {
                    skate_array[s].setGlobalZOrder(0);
                    skate_array[s].setVisible(false);
                  }
                  for(p=0;p<paint_array.length;p++)
                  {
                    paint_array[p].setGlobalZOrder(0);
                    paint_array[p].setVisible(false);
                  }
                   for(h=0;h<horn_array.length;h++)
                  {
                    horn_array[h].setGlobalZOrder(0);
                    horn_array[h].setVisible(false);
                  }
                  for(n=0;n<nose_array.length;n++)
                  {
                    nose_array[n].setGlobalZOrder(0);
                    nose_array[n].setVisible(false);
                  }
                  for(j=0;j<mouth_array.length;j++)
                  {
                      mouth_array[j].setGlobalZOrder(0);
                      mouth_array[j].setVisible(false);
                 }
                 for(i=0;i<eye_array.length;i++)
                     {
                       eye_array[i].setGlobalZOrder(0);
                       eye_array[i].setVisible(false);
                     }
                     for(m=0;m<mustache_array.length;m++)
                  {
                    mustache_array[m].setGlobalZOrder(0);
                    mustache_array[m].setVisible(false);
                  }
                }
                else if(target.id=="mustache")
                {
                  for(m=0;m<mustache_array.length;m++)
                  {
                     mustache_array[m].setGlobalZOrder(2);
                     mustache_array[m].setVisible(true);
                  }
                  for(s=0;s<skate_array.length;s++)
                  {
                      skate_array[s].setGlobalZOrder(0);
                      skate_array[s].setVisible(false);
                  }
                  for(g=0;g<gear_array.length;g++)
                  {
                    gear_array[g].setGlobalZOrder(0);
                    gear_array[g].setVisible(false);
                  }
                  for(p=0;p<paint_array.length;p++)
                  {
                    paint_array[p].setGlobalZOrder(0);
                    paint_array[p].setVisible(false);
                  }
                   for(h=0;h<horn_array.length;h++)
                  {
                    horn_array[h].setGlobalZOrder(0);
                    horn_array[h].setVisible(false);
                  }
                  for(n=0;n<nose_array.length;n++)
                  {
                    nose_array[n].setGlobalZOrder(0);
                    nose_array[n].setVisible(false);
                  }
                  for(j=0;j<mouth_array.length;j++)
                  {
                      mouth_array[j].setGlobalZOrder(0);
                      mouth_array[j].setVisible(false);
                }
                 for(i=0;i<eye_array.length;i++)
                     {
                         eye_array[i].setGlobalZOrder(0);
                         eye_array[i].setVisible(false);
                     }
                }
                else if(target.id=="skate")
                {
                  for(s=0;s<skate_array.length;s++)
                  {
                    skate_array[s].setGlobalZOrder(2);
                    skate_array[s].setVisible(true);
                  }
                  for(m=0;m<mustache_array.length;m++)
                  {
                     mustache_array[m].setGlobalZOrder(0);
                     mustache_array[m].setVisible(false);
                  }
                  for(g=0;g<gear_array.length;g++)
                  {
                    gear_array[g].setGlobalZOrder(0);
                    gear_array[g].setVisible(false);
                  }
                  for(p=0;p<paint_array.length;p++)
                  {
                    paint_array[p].setGlobalZOrder(0);
                    paint_array[p].setVisible(false);
                  }
                   for(h=0;h<horn_array.length;h++)
                  {
                    horn_array[h].setGlobalZOrder(0);
                    horn_array[h].setVisible(false);
                  }
                  for(n=0;n<nose_array.length;n++)
                  {
                    nose_array[n].setGlobalZOrder(0);
                    nose_array[n].setVisible(false);
                  }
                  for(j=0;j<mouth_array.length;j++)
                  {
                      mouth_array[j].setGlobalZOrder(0);
                      mouth_array[j].setVisible(false);
                  }
                 for(i=0;i<eye_array.length;i++)
                     {
                        eye_array[i].setGlobalZOrder(0);
                        eye_array[i].setVisible(false);
                     }

                }

                return true;
        }
        
        return false;
    },

    onTouchMoved : function(touch, event)
    {
         var target = event.getCurrentTarget();
         var location = target.convertToNodeSpace(touch.getLocation());
	    	 target.setPosition(touch.getLocation()); 
        
        cc.log("no" + target.getName());

    //     var decoalpha = target.getBoundingBox();
    //     var decoapha1 = label.getBoundingBox();
 
    //     if(cc.rectIntersectsRect(decoalpha, decoapha1 && target.id == getChildByName))
    //     {   
           
    //         target.setPosition(x, y);
    //         cc.eventManager.removeListener(sprite_click, target);
    // }
    },
    
    onTouchEnded : function(touch, event)
    {
        var target = event.getCurrentTarget();
        var location = target.convertToNodeSpace(touch.getLocation());
        var targetSize = target.getContentSize();
        var targetRect = cc.rect(0, 0, label.getContentSize().width, label.getContentSize().height);
        
        if(cc.rectIntersectsRect(target.getBoundingBox(), label.getBoundingBox()))
        {
          cc.log(target.getName()); 
        }
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
                      self.addChild(eyea.node,3); 
                     // eyea.node.id =1;
                      eyea.node.setVisible(false);
                    cc.eventManager.addListener(sprite_click.clone(),eyea.node);


        var eyeb = ccs.load(xc.DecomonLayer.res.decomon_eyeb, xc.path);   
                      eyeb.node.attr({
                        x : size.width * .22,
                        y : size.height * .10
                      });
                      self.addChild(eyeb.node,3);
                       eyeb.node.setVisible(false);
                   //    eyeb.node.id = 2;
                        cc.eventManager.addListener(sprite_click.clone(),eyeb.node);
                        // getChildByName("eye_abcfh_ballout_angry_12"));

      var eyec = ccs.load(xc.DecomonLayer.res.decomon_eyec, xc.path);   
                      eyec.node.attr({
                        x : size.width * .32,
                        y : size.height * .10
                      });
                      self.addChild(eyec.node,3);
                       eyec.node.setVisible(false);
                        cc.eventManager.addListener(sprite_click.clone(),eyec.node);

       var eyed = ccs.load(xc.DecomonLayer.res.decomon_eyed, xc.path);   
                      eyed.node.attr({
                        x : size.width * .42,
                        y : size.height * .10
                      });
                      self.addChild(eyed.node,3);
                       eyed.node.setVisible(false);
                        cc.eventManager.addListener(sprite_click.clone(),eyed.node);

        var eyee = ccs.load(xc.DecomonLayer.res.decomon_eyee, xc.path);   
                      eyee.node.attr({
                        x : size.width * .52,
                        y : size.height * .10
                      });
                      self.addChild(eyee.node,3);
                       eyee.node.setVisible(false);
                        cc.eventManager.addListener(sprite_click.clone(),eyee.node);

     var eyef = ccs.load(xc.DecomonLayer.res.decomon_eyef, xc.path);   
                      eyef.node.attr({
                        x : size.width * .62,
                        y : size.height * .10
                      });
                      self.addChild(eyef.node,3);
                       eyef.node.setVisible(false);
                        cc.eventManager.addListener(sprite_click.clone(),eyef.node);

    var eyeg = ccs.load(xc.DecomonLayer.res.decomon_eyeg, xc.path);   
                      eyeg.node.attr({
                        x : size.width * .72,
                        y : size.height * .10
                      });
                      self.addChild(eyeg.node,3);
                       eyeg.node.setVisible(false);
                        cc.eventManager.addListener(sprite_click.clone(),eyeg.node);

     var eyeh = ccs.load(xc.DecomonLayer.res.decomon_eyeh, xc.path);   
                      eyeh.node.attr({
                        x : size.width * .82,
                        y : size.height * .10
                      });
                      self.addChild(eyeh.node,3);
                       eyeh.node.setVisible(false);
                        cc.eventManager.addListener(sprite_click.clone(),eyeh.node);

     var eyei = ccs.load(xc.DecomonLayer.res.decomon_eyei, xc.path);   
                      eyei.node.attr({
                        x : size.width * .92,
                        y : size.height * .10
                      });
                      self.addChild(eyei.node,3);
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
                      self.addChild(moutha.node,3); 
                      moutha.node.id =1;
                      moutha.node.setVisible(false);
                    cc.eventManager.addListener(sprite_click.clone(),moutha.node);
                      
        var mouthb = ccs.load(xc.DecomonLayer.res.decomon_mouthb, xc.path);   
                      mouthb.node.attr({
                        x : size.width * .22,
                        y : size.height * .10
                      });
                      self.addChild(mouthb.node,3);
                       mouthb.node.setVisible(false);
                       mouthb.node.id = 2;
                        cc.eventManager.addListener(sprite_click.clone(),mouthb.node);
                        // getChildByName("eye_abcfh_ballout_angry_12"));

      var mouthc = ccs.load(xc.DecomonLayer.res.decomon_mouthc, xc.path);   
                      mouthc.node.attr({
                        x : size.width * .32,
                        y : size.height * .10
                      });
                      self.addChild(mouthc.node,3);
                       mouthc.node.setVisible(false);
                        cc.eventManager.addListener(sprite_click.clone(),mouthc.node);

       var mouthd = ccs.load(xc.DecomonLayer.res.decomon_mouthd, xc.path);   
                      mouthd.node.attr({
                        x : size.width * .42,
                        y : size.height * .10
                      });
                      self.addChild(mouthd.node,3);
                       mouthd.node.setVisible(false);
                        cc.eventManager.addListener(sprite_click.clone(),mouthd.node);

        var mouthe = ccs.load(xc.DecomonLayer.res.decomon_mouthe, xc.path);   
                      mouthe.node.attr({
                        x : size.width * .52,
                        y : size.height * .10
                      });
                      self.addChild(mouthe.node,3);
                       mouthe.node.setVisible(false);
                        cc.eventManager.addListener(sprite_click.clone(),mouthe.node);

     var mouthf = ccs.load(xc.DecomonLayer.res.decomon_mouthf, xc.path);   
                      mouthf.node.attr({
                        x : size.width * .62,
                        y : size.height * .10
                      });
                      self.addChild(mouthf.node,3);
                       mouthf.node.setVisible(false);
                        cc.eventManager.addListener(sprite_click.clone(),mouthf.node);

    var mouthg = ccs.load(xc.DecomonLayer.res.decomon_mouthg, xc.path);   
                      mouthg.node.attr({
                        x : size.width * .72,
                        y : size.height * .10
                      });
                      self.addChild(mouthg.node,3);
                       mouthg.node.setVisible(false);
                        cc.eventManager.addListener(sprite_click.clone(),mouthg.node);

     var mouthh = ccs.load(xc.DecomonLayer.res.decomon_mouthh, xc.path);   
                      mouthh.node.attr({
                        x : size.width * .82,
                        y : size.height * .10
                      });
                      self.addChild(mouthh.node,3);
                       mouthh.node.setVisible(false);
                        cc.eventManager.addListener(sprite_click.clone(),mouthh.node);

     var mouthi = ccs.load(xc.DecomonLayer.res.decomon_mouthi, xc.path);   
                      mouthi.node.attr({
                        x : size.width * .92,
                        y : size.height * .10
                      });
                      self.addChild(mouthi.node,3);
                     mouthi.node.setVisible(false);
                      cc.eventManager.addListener(sprite_click.clone(),mouthi.node);

    mouth_array = [moutha.node,mouthb.node,mouthc.node,mouthd.node,mouthe.node,mouthf.node,mouthg.node,mouthh.node,mouthi.node];

    var nose = background.node.getChildByName("decomon_nose_icon");
    nose.id = "nose";
     cc.eventManager.addListener(sprite_click.clone(), nose);

     var nose1 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon3/decomon_nose_1.png"))
     nose1.attr({
                        x : size.width * .12,
                        y : size.height * .10
                      });
     self.addChild(nose1,3);
     nose1.setVisible(false);
     //nose1.id = "nose1";
     cc.eventManager.addListener(sprite_click.clone(),nose1);

    var nose2 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon3/decomon_nose_2.png"))
     nose2.attr({
                        x : size.width * .22,
                        y : size.height * .10
                      });
     self.addChild(nose2,3);
     nose2.setVisible(false);
     cc.eventManager.addListener(sprite_click.clone(),nose2);

     var nose3 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon3/decomon_nose_3.png"))
     nose3.attr({
                        x : size.width * .32,
                        y : size.height * .10
                      });
     self.addChild(nose3,3);
     nose3.setVisible(false);
     cc.eventManager.addListener(sprite_click.clone(),nose3);

     var nose4 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon3/decomon_nose_4.png"))
     nose4.attr({
                        x : size.width * .42,
                        y : size.height * .10
                      });
     self.addChild(nose4,3);
     nose4.setVisible(false);
     cc.eventManager.addListener(sprite_click.clone(),nose4);

     var nose5 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon3/decomon_nose_5.png"))
     nose5.attr({
                        x : size.width * .52,
                        y : size.height * .10
                      });
     self.addChild(nose5,3);
     nose5.setVisible(false);
     cc.eventManager.addListener(sprite_click.clone(),nose5);

     var nose6 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon3/decomon_nose_6.png"))
     nose6.attr({
                        x : size.width * .62,
                        y : size.height * .10
                      });
     self.addChild(nose6,3);
     nose6.setVisible(false);
     cc.eventManager.addListener(sprite_click.clone(),nose6);

     var nose7 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon3/decomon_nose_7.png"))
     nose7.attr({
                        x : size.width * .72,
                        y : size.height * .10
                      });
     self.addChild(nose7,3);
     nose7.setVisible(false);
     cc.eventManager.addListener(sprite_click.clone(),nose7);


     var nose8 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon3/decomon_nose_8.png"))
     nose8.attr({
                        x : size.width * .82,
                        y : size.height * .10
                      });
     self.addChild(nose8,3);
     nose8.setVisible(false);
     cc.eventManager.addListener(sprite_click.clone(),nose8);

     var nose9 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon3/decomon_nose_9.png"))
     nose9.attr({
                        x : size.width * .92,
                        y : size.height * .10
                      });
     self.addChild(nose9,3);
     nose9.setVisible(false);
     cc.eventManager.addListener(sprite_click.clone(),nose9);

     nose_array = [nose1,nose2,nose3,nose4,nose5,nose6,nose7,nose8,nose9];

     var horn = background.node.getChildByName("decomon_horn_icon");
     horn.id = "horn";
     cc.eventManager.addListener(sprite_click.clone(), horn);

     var horn1 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon2/decomon_headgear_1.png"))
     horn1.attr({
                        x : size.width * .12,
                        y : size.height * .10
                      });
     self.addChild(horn1,3);
     horn1.setVisible(false);
     cc.eventManager.addListener(sprite_click.clone(),horn1);
   
     var horn2 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon2/decomon_headgear_2.png"))
     horn2.attr({
                        x : size.width * .22,
                        y : size.height * .10
                      });
     self.addChild(horn2,3);
     horn2.setVisible(false);
     cc.eventManager.addListener(sprite_click.clone(),horn2);

     var horn3 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon2/decomon_headgear_3.png"))
     horn3.attr({
                        x : size.width * .32,
                        y : size.height * .10
                      });
     self.addChild(horn3,3);
     horn3.setVisible(false);
     cc.eventManager.addListener(sprite_click.clone(),horn3);

     var horn4 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon2/decomon_headgear_4.png"))
     horn4.attr({
                        x : size.width * .42,
                        y : size.height * .10
                      });
     self.addChild(horn4,3);
     horn4.setVisible(false);
     cc.eventManager.addListener(sprite_click.clone(),horn4);

     var horn5 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon2/decomon_headgear_5.png"))
     horn5.attr({
                        x : size.width * .52,
                        y : size.height * .10
                      });
     self.addChild(horn5,3);
     horn5.setVisible(false);
     cc.eventManager.addListener(sprite_click.clone(),horn5);

     var horn6 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon2/decomon_headgear_6.png"))
     horn6.attr({
                        x : size.width * .62,
                        y : size.height * .10
                      });
     self.addChild(horn6,3);
     horn6.setVisible(false);
     cc.eventManager.addListener(sprite_click.clone(),horn6);

    var horn7 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon2/decomon_headgear_7.png"))
     horn7.attr({
                        x : size.width * .72,
                        y : size.height * .10
                      });
     self.addChild(horn7,3);
     horn7.setVisible(false);
     cc.eventManager.addListener(sprite_click.clone(),horn7);

    var horn8 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon2/decomon_headgear_8.png"))
    horn8.attr({
                        x : size.width * .82,
                        y : size.height * .10
                      });
     self.addChild(horn8,3);
     horn8.setVisible(false);
     cc.eventManager.addListener(sprite_click.clone(),horn8);

      var horn9 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon2/decomon_headgear_9.png"))
     horn9.attr({
                        x : size.width * .92,
                        y : size.height * .10
                      });
     self.addChild(horn9,3);
     horn9.setVisible(false);
     cc.eventManager.addListener(sprite_click.clone(),horn9);

     horn_array = [horn1,horn2,horn3,horn4,horn5,horn6,horn7,horn8,horn9];

        var paint = background.node.getChildByName("decomon_paintbrush_icon");
        paint.id = "paint";
        cc.eventManager.addListener(sprite_click.clone(), paint);
    var paint1 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon3/decomon_paintbucket_1.png"))
    paint1.attr({
                        x : size.width * .12,
                        y : size.height * .10
                      });
     self.addChild(paint1,3);
     paint1.setVisible(false);
     cc.eventManager.addListener(sprite_click.clone(),paint1);

    var paint2 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon3/decomon_paintbucket_2.png"))
    paint2.attr({
                        x : size.width * .22,
                        y : size.height * .10
                      });
     self.addChild(paint2,3);
     paint2.setVisible(false);
     cc.eventManager.addListener(sprite_click.clone(),paint2);

     var paint3 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon3/decomon_paintbucket_3.png"))
    paint3.attr({
                        x : size.width * .32,
                        y : size.height * .10
                      });
     self.addChild(paint3,3);
     paint3.setVisible(false);
     cc.eventManager.addListener(sprite_click.clone(),paint3);

     var paint4 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon3/decomon_paintbucket_4.png"))
    paint4.attr({
                        x : size.width * .42,
                        y : size.height * .10
                      });
     self.addChild(paint4,3);
     paint4.setVisible(false);
     cc.eventManager.addListener(sprite_click.clone(),paint4);

     var paint5 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon3/decomon_paintbucket_5.png"))
    paint5.attr({
                        x : size.width * .52,
                        y : size.height * .10
                      });
     self.addChild(paint5,3);
     paint5.setVisible(false);
     cc.eventManager.addListener(sprite_click.clone(),paint5);

     var paint6 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon3/decomon_paintbucket_6.png"))
    paint6.attr({
                        x : size.width * .62,
                        y : size.height * .10
                      });
     self.addChild(paint6,3);
     paint6.setVisible(false);
     cc.eventManager.addListener(sprite_click.clone(),paint6);

     var paint7 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon3/decomon_paintbucket_7.png"))
    paint7.attr({
                        x : size.width * .72,
                        y : size.height * .10
                      });
     self.addChild(paint7,3);
     paint7.setVisible(false);
     cc.eventManager.addListener(sprite_click.clone(),paint7);

     var paint8 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon3/decomon_paintbucket_8.png"))
    paint8.attr({
                        x : size.width * .82,
                        y : size.height * .10
                      });
     self.addChild(paint8,3);
     paint8.setVisible(false);
     cc.eventManager.addListener(sprite_click.clone(),paint8);

     var paint9 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon3/decomon_paintbucket_9.png"))
    paint9.attr({
                        x : size.width * .92,
                        y : size.height * .10
                      });
     self.addChild(paint9,3);
     paint9.setVisible(false);
     cc.eventManager.addListener(sprite_click.clone(),paint9);

     paint_array = [paint1,paint2,paint3,paint4,paint5,paint6,paint7,paint8,paint9];

   var gear = background.node.getChildByName("decomon_icon_gear_2");
   gear.id = "gear";
   cc.eventManager.addListener(sprite_click.clone(), gear);
    var gear1 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon1/decomon_gear_1.png"))
    gear1.attr({
                        x : size.width * .12,
                        y : size.height * .10
                      });
     self.addChild(gear1,3);
     gear1.setVisible(false);
     cc.eventManager.addListener(sprite_click.clone(),gear1);

    var gear2 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon1/decomon_gear_2.png"))
    gear2.attr({
                        x : size.width * .22,
                        y : size.height * .10
                      });
     self.addChild(gear2,3);
     gear2.setVisible(false);
     cc.eventManager.addListener(sprite_click.clone(),gear2);

     var gear3 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon1/decomon_gear_3.png"))
    gear3.attr({
                        x : size.width * .32,
                        y : size.height * .10
                      });
     self.addChild(gear3,3);
     gear3.setVisible(false);
     cc.eventManager.addListener(sprite_click.clone(),gear3);

     var gear4 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon1/decomon_gear_4.png"))
    gear4.attr({
                        x : size.width * .42,
                        y : size.height * .10
                      });
     self.addChild(gear4,3);
     gear4.setVisible(false);
     cc.eventManager.addListener(sprite_click.clone(),gear4);

     var gear5 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon1/decomon_gear_5.png"))
    gear5.attr({
                        x : size.width * .52,
                        y : size.height * .10
                      });
     self.addChild(gear5,3);
     gear5.setVisible(false);
     cc.eventManager.addListener(sprite_click.clone(),gear5);

    var gear6 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon1/decomon_gear_6.png"))
    gear6.attr({
                        x : size.width * .62,
                        y : size.height * .10
                      });
     self.addChild(gear6,3);
     gear6.setVisible(false);
     cc.eventManager.addListener(sprite_click.clone(),gear6);

     var gear7 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon1/decomon_gear_7.png"))
    gear7.attr({
                        x : size.width * .72,
                        y : size.height * .10
                      });
     self.addChild(gear7,3);
     gear7.setVisible(false);
     cc.eventManager.addListener(sprite_click.clone(),gear7);

     var gear8 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon1/decomon_gear_8.png"))
    gear8.attr({
                        x : size.width * .82,
                        y : size.height * .10
                      });
     self.addChild(gear8,3);
     gear8.setVisible(false);
     cc.eventManager.addListener(sprite_click.clone(),gear8);

     var gear9 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon1/decomon_gear_9.png"))
    gear9.attr({
                        x : size.width * .92,
                        y : size.height * .10
                      });
     self.addChild(gear9,3);
     gear9.setVisible(false);
     cc.eventManager.addListener(sprite_click.clone(),gear9);
gear_array = [gear1,gear2,gear3,gear4,gear5,gear6,gear7,gear8,gear9];

var mustache = background.node.getChildByName("decomon_mustache_icon");
mustache.id = "mustache";
cc.eventManager.addListener(sprite_click.clone(), mustache);

var mustache1 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon3/decomon_hair_1.png"))
mustache1.attr({
                        x : size.width * .12,
                        y : size.height * .10
                      });
self.addChild(mustache1,3);
mustache1.setVisible(false);
cc.eventManager.addListener(sprite_click.clone(),mustache1);

var mustache2 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon3/decomon_hair_2.png"))
mustache2.attr({
                        x : size.width * .22,
                        y : size.height * .10
                      });
self.addChild(mustache2,3);
mustache2.setVisible(false);
cc.eventManager.addListener(sprite_click.clone(),mustache2);

var mustache3 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon3/decomon_hair_3.png"))
mustache3.attr({
                        x : size.width * .32,
                        y : size.height * .10
                      });
self.addChild(mustache3,3);
mustache3.setVisible(false);
cc.eventManager.addListener(sprite_click.clone(),mustache3);

var mustache4 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon3/decomon_hair_4.png"))
mustache4.attr({
                        x : size.width * .42,
                        y : size.height * .10
                      });
self.addChild(mustache4,3);
mustache4.setVisible(false);
cc.eventManager.addListener(sprite_click.clone(),mustache4);

var mustache5 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon3/decomon_hair_5.png"))
mustache5.attr({
                        x : size.width * .52,
                        y : size.height * .10
                      });
self.addChild(mustache5,3);
mustache5.setVisible(false);
cc.eventManager.addListener(sprite_click.clone(),mustache5);

var mustache6 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon3/decomon_hair_6.png"))
mustache6.attr({
                        x : size.width * .62,
                        y : size.height * .10
                      });
self.addChild(mustache6,3);
mustache6.setVisible(false);
cc.eventManager.addListener(sprite_click.clone(),mustache6);

var mustache7 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon3/decomon_hair_7.png"))
mustache7.attr({
                        x : size.width * .72,
                        y : size.height * .10
                      });
self.addChild(mustache7,3);
mustache7.setVisible(false);
cc.eventManager.addListener(sprite_click.clone(),mustache7);

var mustache8 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon3/decomon_hair_8.png"))
mustache8.attr({
                        x : size.width * .82,
                        y : size.height * .10
                      });
self.addChild(mustache8,3);
mustache8.setVisible(false);
cc.eventManager.addListener(sprite_click.clone(),mustache8);

var mustache9 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("decomon/decomon3/decomon_hair_9.png"))
mustache9.attr({
                        x : size.width * .92,
                        y : size.height * .10
                      });
self.addChild(mustache9,3);
mustache9.setVisible(false);
cc.eventManager.addListener(sprite_click.clone(),mustache9);
mustache_array = [mustache1,mustache2,mustache3,mustache4,mustache5,mustache6,mustache7,mustache8,mustache9]

var skate = background.node.getChildByName("decomon_skate_icon");
skate.id = "skate";
cc.eventManager.addListener(sprite_click.clone(), skate);
var skate1 = ccs.load(xc.DecomonLayer.res.decomon_skate1, xc.path);   
 skate1.node.attr({
                        x : size.width * .12,
                        y : size.height * .10
                 });
self.addChild(skate1.node,3); 
 //kate1.node.id =1;
skate1.node.setVisible(false);
cc.eventManager.addListener(sprite_click.clone(),skate1.node);

var skate2 = ccs.load(xc.DecomonLayer.res.decomon_skate2, xc.path);   
skate2.node.attr({
                        x : size.width * .22,
                        y : size.height * .10
                 });
self.addChild(skate2.node,3); 
 //kate1.node.id =1;
skate2.node.setVisible(false);
cc.eventManager.addListener(sprite_click.clone(),skate2.node);

var skate3 = ccs.load(xc.DecomonLayer.res.decomon_skate3, xc.path);   
skate3.node.attr({
                        x : size.width * .32,
                        y : size.height * .10
                 });
self.addChild(skate3.node,3); 
 //kate1.node.id =1;
skate3.node.setVisible(false);
cc.eventManager.addListener(sprite_click.clone(),skate3.node);

var skate4 = ccs.load(xc.DecomonLayer.res.decomon_skate4, xc.path);   
skate4.node.attr({
                        x : size.width * .42,
                        y : size.height * .10
                 });
self.addChild(skate4.node,3); 
 //kate1.node.id =1;
skate4.node.setVisible(false);
cc.eventManager.addListener(sprite_click.clone(),skate4.node);

var skate5 = ccs.load(xc.DecomonLayer.res.decomon_skate5, xc.path);   
skate5.node.attr({
                        x : size.width * .52,
                        y : size.height * .10
                 });
self.addChild(skate5.node,3); 
 //kate1.node.id =1;
skate5.node.setVisible(false);
cc.eventManager.addListener(sprite_click.clone(),skate5.node);

var skate6 = ccs.load(xc.DecomonLayer.res.decomon_skate6, xc.path);   
skate6.node.attr({
                        x : size.width * .62,
                        y : size.height * .10
                 });
self.addChild(skate6.node,3); 
 //kate1.node.id =1;
skate6.node.setVisible(false);
cc.eventManager.addListener(sprite_click.clone(),skate6.node);

var skate7 = ccs.load(xc.DecomonLayer.res.decomon_skate7, xc.path);   
skate7.node.attr({
                        x : size.width * .72,
                        y : size.height * .10
                 });
self.addChild(skate7.node,3); 
 //kate1.node.id =1;
skate7.node.setVisible(false);
cc.eventManager.addListener(sprite_click.clone(),skate7.node);

var skate8 = ccs.load(xc.DecomonLayer.res.decomon_skate8, xc.path);   
skate8.node.attr({
                        x : size.width * .82,
                        y : size.height * .10
                 });
self.addChild(skate8.node,3); 
 //kate1.node.id =1;
skate8.node.setVisible(false);
cc.eventManager.addListener(sprite_click.clone(),skate8.node);

skate_array = [skate1.node,skate2.node,skate3.node,skate4.node,skate5.node,skate6.node,skate7.node,skate8.node];
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