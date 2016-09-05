
var xc = xc || {};

xc.AlphamoleGameLevelScene = cc.Layer.extend( {

    ctor:function () {
        this._super();
    var size = cc.winSize;

   var bg = ccs.load(xc.AlphamoleGameLevelScene.res.Alphamole_level, xc.path);
    this.addChild(bg.node);

    var alphabet_str = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    var alpha_width = 350;
    var alpha_height = 400;
    var count = 0;
    var level_alpha = null;
    self = this;
    for(var i = 1 ; i < 5 ;i++){
        for(var j = 1; j<8; j++){
            if (count < 26){
                level_alpha = ccs.load("res/english/"+alphabet_str[count]+".json", xc.path );
                level_alpha.node.x = alpha_width*j - size.width * 0.05;
                level_alpha.node.y = size.height -  alpha_height*i;
                level_alpha.node.setContentSize(150,200);
                level_alpha.node.setName(alphabet_str[count]);
                level_alpha.node.setScale(0.5,0.5);
                count ++;
                cc.eventManager.addListener(cc.EventListener.create({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                 swallowTouches:true,  
                 onTouchBegan: this.onTouchBegan,}) ,level_alpha.node);

                this.addChild(level_alpha.node,"alpha");
            }
       
        }
    }


    },

    onTouchBegan: function(touch, event){
         var target = event.getCurrentTarget();
         var location = target.convertToNodeSpace(touch.getLocation());
         var targetSize = target.getContentSize();
         var targetRectangle = cc.rect(target.getPositionX()- 75, target.getPositionY(), targetSize.width, targetSize.height);
        // var targetRectangle = target.getBoundingBox();
         if (cc.rectContainsPoint(targetRectangle, touch.getLocation()))
                   {
                     cc.log("clicked on %s",target.getName());  
                     cc.director.runScene(new AlphamoneGameLayer(target.getName()));
                     //AlphamoneGameLayer 
                    }
                             return false;
                   }




});

xc.AlphamoleGameLevelScene.res = {

    Alphamole_level: "res/alphamole/alphamolelevel.json",
    Alphamone_level_png :xc.path + "alphamole/alphamolelevel/alphamolelevel.png",
    Alphamone_level_plist :xc.path + "alphamole/alphamolelevel/alphamolelevel.plist",

    Alphamole_A:"res/english/A.json",
    Alphamole_B:"res/english/B.json",
    Alphamole_C:"res/english/C.json",
    Alphamole_D:"res/english/D.json",
    Alphamole_E:"res/english/E.json",
    Alphamole_F:"res/english/F.json",
    Alphamole_G:"res/english/G.json",
    Alphamole_H:"res/english/H.json",
    Alphamole_I:"res/english/I.json",
    Alphamole_J:"res/english/J.json",
    Alphamole_K:"res/english/K.json",
    Alphamole_L:"res/english/L.json",
    Alphamole_M:"res/english/M.json",
    Alphamole_N:"res/english/N.json",
    Alphamole_O:"res/english/O.json",
    Alphamole_P:"res/english/P.json",
    Alphamole_Q:"res/english/Q.json",
    Alphamole_R:"res/english/R.json",
    Alphamole_S:"res/english/S.json",
    Alphamole_T:"res/english/T.json",
    Alphamole_U:"res/english/U.json",
    Alphamole_V:"res/english/V.json",
    Alphamole_W:"res/english/W.json",
    Alphamole_X:"res/english/X.json",
    Alphamole_Y:"res/english/Y.json",
    Alphamole_Z:"res/english/Z.json",


     Alphamole_english_fnt: xc.path  + "english/baloo_bhai_hdr.fnt",
    Alphamole_english_png: xc.path  + "english/baloo_bhai_sd_0.png",

    Alphamole_alphabet_plist: xc.path  + "alphamon.plist",
    Alphamole_alphabet_png: xc.path  + "alphamon.png",

    Alphamole_eye_a_json: xc.path  + "eye_ani/eye_a.json",
    Alphamole_eye_b_json: xc.path  + "eye_ani/eye_b.json",
    Alphamole_eye_c_json: xc.path  + "eye_ani/eye_c.json",
    Alphamole_eye_d_json: xc.path  + "eye_ani/eye_d.json",
    Alphamole_eye_e_json: xc.path  + "eye_ani/eye_e.json",
    Alphamole_eye_f_json: xc.path  + "eye_ani/eye_f.json",
    Alphamole_eye_g_json: xc.path  + "eye_ani/eye_g.json",
    Alphamole_eye_h_json: xc.path  + "eye_ani/eye_h.json",
    Alphamole_eye_i_json: xc.path  + "eye_ani/eye_i.json",

    Alphamole_skate_a_json: xc.path  + "leg_ani/skate_a.json",
    Alphamole_skate_b_json: xc.path  + "leg_ani/skate_b.json",
    Alphamole_skate_c_json: xc.path  + "leg_ani/skate_c.json",
    Alphamole_skate_d_json: xc.path  + "leg_ani/skate_d.json",
    Alphamole_skate_e_json: xc.path  + "leg_ani/skate_e.json",
    Alphamole_skate_f_json: xc.path  + "leg_ani/skate_f.json",
    Alphamole_skate_g_json: xc.path  + "leg_ani/skate_g.json",
    Alphamole_skate_h_json: xc.path  + "leg_ani/skate_h.json",



    Alphamole_mouth_a_json: xc.path  + "mouth_ani/mouth_a.json",
    Alphamole_mouth_b_json: xc.path  + "mouth_ani/mouth_b.json",
    Alphamole_mouth_c_json: xc.path  + "mouth_ani/mouth_c.json",
    Alphamole_mouth_d_json: xc.path  + "mouth_ani/mouth_d.json",
    Alphamole_mouth_e_json: xc.path  + "mouth_ani/mouth_e.json",
    Alphamole_mouth_f_json: xc.path  + "mouth_ani/mouth_f.json",
    Alphamole_mouth_g_json: xc.path  + "mouth_ani/mouth_g.json",
    Alphamole_mouth_h_json: xc.path  + "mouth_ani/mouth_h.json",
    Alphamole_mouth_i_json: xc.path  + "mouth_ani/mouth_i.json",

    Alphamole_png1: xc.path + "alphamole/alphamole1/alphamole1.png",
    Alphamole_plist1: xc.path + "alphamole/alphamole1/alphamole1.plist",
    Alphamole_json:"res/alphamole/alphamole1_foreground.json",
    Alphamole_json1:"res/alphamole/alphamole1_background.json",

    Alphamole_scene1_png: xc.path + "alphamole/alphamole3/alphamole3.png",
    Alphamole_scene1_plist: xc.path + "alphamole/alphamole3/alphamole3.plist",
    Alphamole_scene1_json:"res/alphamole/alphamole3_foreground.json",
    Alphamole_scene1_json1:"res/alphamole/alphamole3_background.json",

    Alphamole_scene2_png: xc.path + "alphamole/alphamole4/alphamole4.png",
    Alphamole_scene2_plist: xc.path + "alphamole/alphamole4/alphamole4.plist",
    Alphamole_scene2_json:"res/alphamole/alphamole4_foreground.json",
    Alphamole_scene2_json1:"res/alphamole/alphamole4_background.json",

    Alphamole_scene3_png: xc.path + "alphamole/alphamole5/alphamole5.png",
    Alphamole_scene3_plist: xc.path + "alphamole/alphamole5/alphamole5.plist",
    Alphamole_scene3_json:"res/alphamole/alphamole5_foreground.json",
    Alphamole_scene3_json1:"res/alphamole/alphamole5_background.json",

    Alphamole_scene0_json: "res/alphamole/alphamole2_background.json",
    Alphamole_scene0_plist: xc.path + "alphamole/alphamole2.plist",
    Alphamole_scene0_png: xc.path + "alphamole/alphamole2.png",


    Alphamole_sound_A:"res/english/sounds/a.wav",
    Alphamole_sound_B:"res/english/sounds/b.wav",
    Alphamole_sound_C:"res/english/sounds/C.wav",
    Alphamole_sound_D:"res/english/sounds/d.wav",
    Alphamole_sound_E:"res/english/sounds/e.wav",
    Alphamole_sound_F:"res/english/sounds/f.wav",
    Alphamole_sound_G:"res/english/sounds/g.wav",
    Alphamole_sound_H:"res/english/sounds/h.wav",
    Alphamole_sound_I:"res/english/sounds/i.wav",
    Alphamole_sound_J:"res/english/sounds/j.wav",
    Alphamole_sound_K:"res/english/sounds/k.wav",
    Alphamole_sound_L:"res/english/sounds/l.wav",
    Alphamole_sound_M:"res/english/sounds/m.wav",
    Alphamole_sound_N:"res/english/sounds/n.wav",
    Alphamole_sound_O:"res/english/sounds/o.wav",
    Alphamole_sound_P:"res/english/sounds/p.wav",
    Alphamole_sound_Q:"res/english/sounds/q.wav",
    Alphamole_sound_R:"res/english/sounds/r.wav",
    Alphamole_sound_S:"res/english/sounds/s.wav",
    Alphamole_sound_T:"res/english/sounds/t.wav",
    Alphamole_sound_U:"res/english/sounds/u.wav",
    Alphamole_sound_V:"res/english/sounds/v.wav",
    Alphamole_sound_W:"res/english/sounds/w.wav",
    Alphamole_sound_X:"res/english/sounds/x.wav",
    Alphamole_sound_Y:"res/english/sounds/y.wav",
    Alphamole_sound_Z:"res/english/sounds/z.wav",


}