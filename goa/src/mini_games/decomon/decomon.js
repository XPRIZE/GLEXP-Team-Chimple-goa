/// <reference path="../../cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />

var xc = xc || {};

xc.DecomonLayer = cc.Layer.extend({
    self :null,
    size : null,
    eye_array : null,
    mouth_array :null,


  ctor: function () {
        this._super();
        
        size = cc.winSize;
        self = this;

      var background = ccs.load(xc.DecomonLayer.res.decomon_main, xc.path);
        cc.log(xc);
        this.addChild(background.node);


     var label = new cc.LabelTTF("A", xc.DecomonLayer.res.baloobhai_ttf, 1500);
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
                }
                // else if(target.id == 1)
                // {
                //     cc.log("yes");
                // }
                else if(target.id == "mouth"){

                for(j=0;j<mouth_array.length;j++){
                  mouth_array[j].setVisible(true);
                }
                }
                return true;
        }
        
        return false;
    },

    onTouchMove : function(touch, event)
    {
        
    },
    
    onTouchEnded : function(touch, event)
    {
        
    }
        
});
        var eye = background.node.getChildByName("decomon_eye_icon");
        eye.id = "eye";
        cc.eventManager.addListener(sprite_click, eye);

    var mouth = background.node.getChildByName("decomon_mouth_icon");
     mouth.id = "mouth";
   cc.eventManager.addListener(sprite_click, mouth);

         var eyea = ccs.load(xc.DecomonLayer.res.decomon_eyea, xc.path);   
                      eyea.node.attr({
                        x : size.width * .12,
                        y : size.height * .10
                      });
                      self.addChild(eyea.node); 
                      eyea.node.id =1;
                      eyea.node.setVisible(false);
                    cc.eventManager.addListener(sprite_click.clone(),eyea.node);
                      
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


    

     var moutha = ccs.load(xc.DecomonLayer.res.decomon_moutha, xc.path);   
                      moutha.node.attr({
                        x : size.width * .12,
                        y : size.height * .10
                      });
                      self.addChild(moutha.node); 
                      moutha.node.id =1;
                      moutha.node.setVisible(false);
                    cc.eventManager.addListener(sprite_click.clone(),moutha.node);
                      
        var mouthb = ccs.load(xc.DecomonLayer.res.decomon_mouthb, xc.path);   
                      mouthb.node.attr({
                        x : size.width * .22,
                        y : size.height * .10
                      });
                      self.addChild(mouthb.node);
                       mouthb.node.setVisible(false);
                       mouthb.node.id = 2;
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