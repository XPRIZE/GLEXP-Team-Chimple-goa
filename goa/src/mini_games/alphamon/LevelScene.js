
var xc = xc || {};

xc.AlphamoleGameLevelScene = cc.Layer.extend( {

    ctor:function () {
        this._super();
    var size = cc.winSize;

   var bg = ccs.load(xc.AlphamoleGameLevelScene.res.Alphamole_level, xc.path);//("res/SD/alphamole/alphamolelevel.json", "res/SD/");
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
                level_alpha = ccs.load(xc.path+"english/"+alphabet_str[count]+".json", xc.path );
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
                  this.addChild(level_alpha.node);
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
                    var scene = new xc.GameScene();
                    scene.layer = new AlphamoneGameLayer(target.getName());
                    scene.addChild(scene.layer);
                    cc.director.runScene(scene);
                     //AlphamoneGameLayer 
                    }
                             return false;
                   }




});

xc.AlphamoleGameLevelScene.res = {

    Alphamole_level: xc.path + "alphamole/alphamolelevel.json",
    Alphamone_level_png :xc.path + "alphamole/alphamolelevel/alphamolelevel.png",
    Alphamone_level_plist :xc.path + "alphamole/alphamolelevel/alphamolelevel.plist",

    Alphamole_A:xc.path + "english/A.json",
    Alphamole_B:xc.path + "english/B.json",
    Alphamole_C:xc.path + "english/C.json",
    Alphamole_D:xc.path + "english/D.json",
    Alphamole_E:xc.path + "english/E.json",
    Alphamole_F:xc.path + "english/F.json",
    Alphamole_G:xc.path + "english/G.json",
    Alphamole_H:xc.path + "english/H.json",
    Alphamole_I:xc.path + "english/I.json",
    Alphamole_J:xc.path + "english/J.json",
    Alphamole_K:xc.path + "english/K.json",
    Alphamole_L:xc.path + "english/L.json",
    Alphamole_M:xc.path + "english/M.json",
    Alphamole_N:xc.path + "english/N.json",
    Alphamole_O:xc.path + "english/O.json",
    Alphamole_P:xc.path + "english/P.json",
    Alphamole_Q:xc.path + "english/Q.json",
    Alphamole_R:xc.path + "english/R.json",
    Alphamole_S:xc.path + "english/S.json",
    Alphamole_T:xc.path + "english/T.json",
    Alphamole_U:xc.path + "english/U.json",
    Alphamole_V:xc.path + "english/V.json",
    Alphamole_W:xc.path + "english/W.json",
    Alphamole_X:xc.path + "english/X.json",
    Alphamole_Y:xc.path + "english/Y.json",
    Alphamole_Z:xc.path + "english/Z.json",


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
    Alphamole_json:xc.path + "alphamole/alphamole1_foreground.json",
    Alphamole_json1:xc.path + "alphamole/alphamole1_background.json",

    Alphamole_scene1_png: xc.path + "alphamole/alphamole3/alphamole3.png",
    Alphamole_scene1_plist: xc.path + "alphamole/alphamole3/alphamole3.plist",
    Alphamole_scene1_json:xc.path + "alphamole/alphamole3_foreground.json",
    Alphamole_scene1_json1:xc.path + "alphamole/alphamole3_background.json",

    Alphamole_scene2_png: xc.path + "alphamole/alphamole4/alphamole4.png",
    Alphamole_scene2_plist: xc.path + "alphamole/alphamole4/alphamole4.plist",
    Alphamole_scene2_json:xc.path + "alphamole/alphamole4_foreground.json",
    Alphamole_scene2_json1:xc.path + "alphamole/alphamole4_background.json",

    Alphamole_scene3_png: xc.path + "alphamole/alphamole5/alphamole5.png",
    Alphamole_scene3_plist: xc.path + "alphamole/alphamole5/alphamole5.plist",
    Alphamole_scene3_json:xc.path + "alphamole/alphamole5_foreground.json",
    Alphamole_scene3_json1:xc.path + "alphamole/alphamole5_background.json",

    Alphamole_scene0_json: xc.path + "alphamole/alphamole2_background.json",
    Alphamole_scene0_plist: xc.path + "alphamole/alphamole2.plist",
    Alphamole_scene0_png: xc.path + "alphamole/alphamole2.png",


    Alphamole_sound_A:xc.path + "english/sounds/a.wav",
    Alphamole_sound_B:xc.path + "english/sounds/b.wav",
    Alphamole_sound_C:xc.path + "english/sounds/C.wav",
    Alphamole_sound_D:xc.path + "english/sounds/d.wav",
    Alphamole_sound_E:xc.path + "english/sounds/e.wav",
    Alphamole_sound_F:xc.path + "english/sounds/f.wav",
    Alphamole_sound_G:xc.path + "english/sounds/g.wav",
    Alphamole_sound_H:xc.path + "english/sounds/h.wav",
    Alphamole_sound_I:xc.path + "english/sounds/i.wav",
    Alphamole_sound_J:xc.path + "english/sounds/j.wav",
    Alphamole_sound_K:xc.path + "english/sounds/k.wav",
    Alphamole_sound_L:xc.path + "english/sounds/l.wav",
    Alphamole_sound_M:xc.path + "english/sounds/m.wav",
    Alphamole_sound_N:xc.path + "english/sounds/n.wav",
    Alphamole_sound_O:xc.path + "english/sounds/o.wav",
    Alphamole_sound_P:xc.path + "english/sounds/p.wav",
    Alphamole_sound_Q:xc.path + "english/sounds/q.wav",
    Alphamole_sound_R:xc.path + "english/sounds/r.wav",
    Alphamole_sound_S:xc.path + "english/sounds/s.wav",
    Alphamole_sound_T:xc.path + "english/sounds/t.wav",
    Alphamole_sound_U:xc.path + "english/sounds/u.wav",
    Alphamole_sound_V:xc.path + "english/sounds/v.wav",
    Alphamole_sound_W:xc.path + "english/sounds/w.wav",
    Alphamole_sound_X:xc.path + "english/sounds/x.wav",
    Alphamole_sound_Y:xc.path + "english/sounds/y.wav",
    Alphamole_sound_Z:xc.path + "english/sounds/z.wav",


}