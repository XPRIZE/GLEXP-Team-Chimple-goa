var Level2Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new Level2Layer();
        this.addChild(layer);
    }
});

var Level2Layer = cc.Layer.extend({
    sprite:null,
     whack_stage :null,
     whack_sprite_Image : [],
     whack_stage_image:null,
     
    ctor:function () {
      
        this._super();
        var size = cc.winSize;
        this.sprite = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("LevelScreen1.png"));
        this.sprite.x = size.width / 2;
        this.sprite.y = size.height / 2;
        this.addChild(this.sprite, 0);
        
        var game_width = (180/1280)*size.width;
        var game_height = (560/800)*size.height;
        
        var left_level = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Left.png"));
        left_level.x = game_width;
        left_level.y = game_height;
        this.addChild(left_level, 0);
        left_level.id = "left";
        
        var o_level = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("o.png"));
        o_level.x = (game_width +=o_level.width + (10/1280)*size.width);
        o_level.y = game_height;
        this.addChild(o_level, 0);
        o_level.id = "o";
        
         
        var p_level = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("p.png"));
        p_level.x = (game_width += o_level.width + (10/1280)*size.width);
        p_level.y = game_height;
        this.addChild(p_level, 0);
        p_level.id = "p";
        
        var q_level = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("q.png"));
        q_level.x = (game_width +=p_level.width + (10/1280)*size.width);
        q_level.y = game_height;
        this.addChild(q_level, 0);
        q_level.id = "q";
        
        var r_level = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("r.png"));
        r_level.x = (game_width += q_level.width + (10/1280)*size.width);
        r_level.y = game_height;
        this.addChild(r_level, 0);
        r_level.id = "r";
        
        game_width = (180/1280)*size.width;
        game_height -= (r_level.height + (10/1280)*size.width);
        
        var s_level = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("s.png"));
        s_level.x = game_width;
        s_level.y = game_height;
        this.addChild(s_level, 0);
        s_level.id = "s";
        
        var t_level = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("t.png"));
        t_level.x = (game_width += s_level.width + (10/1280)*size.width);
        t_level.y = game_height;
        this.addChild(t_level, 0);
        t_level.id = "t";
        
         
        var u_level = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("u.png"));
        u_level.x = (game_width += t_level.width + (10/1280)*size.width);
        u_level.y = game_height;
        this.addChild(u_level, 0);
        u_level.id = "u";
        
        var v_level = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("v.png"));
        v_level.x = (game_width +=u_level.width + (10/1280)*size.width);
        v_level.y = game_height;
        this.addChild(v_level, 0);
        v_level.id = "v";
        
        var w_level = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("w.png"));
        w_level.x = (game_width +=v_level.width + (10/1280)*size.width);
        w_level.y = game_height;
        this.addChild(w_level, 0);
        w_level.id = "w";
        
        
         game_width = (180/1280)*size.width;
        game_height -= (w_level.height + 20);
        
        var x_level = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("x.png"));
        x_level.x = game_width;
        x_level.y = game_height;
        this.addChild(x_level, 0);
        x_level.id = "x";
        
        var y_level = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("y.png"));
        y_level.x = (game_width += x_level.width + (10/1280)*size.width);
        y_level.y = game_height;
        this.addChild(y_level, 0);
        y_level.id = "y";
        
         
        var z_level = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("z.png"));
        z_level.x = (game_width += y_level.width + (10/1280)*size.width);
        z_level.y = game_height;
        this.addChild(z_level, 0);
        z_level.id = "z";
        
        cc.eventManager.addListener(cc.EventListener.create({
         event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}), left_level);
        cc.eventManager.addListener(cc.EventListener.create({
         event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}), o_level);
        cc.eventManager.addListener(cc.EventListener.create({
         event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}), p_level);
        cc.eventManager.addListener(cc.EventListener.create({
         event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}), q_level);
        cc.eventManager.addListener(cc.EventListener.create({
         event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}), r_level);
        cc.eventManager.addListener(cc.EventListener.create({
         event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}), s_level);
        cc.eventManager.addListener(cc.EventListener.create({
         event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}), t_level);
        cc.eventManager.addListener(cc.EventListener.create({
         event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}), u_level);
        cc.eventManager.addListener(cc.EventListener.create({
         event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}), v_level);
        cc.eventManager.addListener(cc.EventListener.create({
         event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}), w_level);
        cc.eventManager.addListener(cc.EventListener.create({
         event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}), x_level);
        cc.eventManager.addListener(cc.EventListener.create({
         event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}), y_level);
        cc.eventManager.addListener(cc.EventListener.create({
         event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}), z_level);
     
        return true;
    },
    
    onTouchBegan: function(touch, event){
         var target = event.getCurrentTarget();
         var location = target.convertToNodeSpace(touch.getLocation());
         var targetSize = target.getContentSize();
         var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);
         if (cc.rectContainsPoint(targetRectangle, location))
                   {
                       if(target.id == "left"){
                            cc.audioEngine.stopMusic();
                           cc.director.runScene(new Level1Scene());
                           }
                       if(target.id == "o"){
                            cc.audioEngine.stopMusic();
                           whack_stage = 4;
                           whack_stage_image = "o.png";
                           whack_sprite_Image = ["0O", "0P", "0Q", "0R", "0S", "0O", "0O", "0O"];
                           cc.LoaderScene.preload(g_resources_play2, function(){ 
                                cc.director.runScene(new Play2Scene(whack_stage,whack_stage_image,whack_sprite_Image));                           
                                  });
                           }
                       if(target.id == "p"){
                           cc.audioEngine.stopMusic();
                           whack_stage = 4;
                           whack_stage_image = "p.png";
                           whack_sprite_Image = ["0O", "0P", "0Q", "0R", "0S", "0P", "0P", "0P"];
                           cc.LoaderScene.preload(g_resources_play3, function(){ 
                                cc.director.runScene(new Play3Scene(whack_stage,whack_stage_image,whack_sprite_Image));                           
                                  });
                           }
                       if(target.id == "q"){
                            cc.audioEngine.stopMusic();
                           whack_stage = 4;
                           whack_stage_image = "q.png";
                           whack_sprite_Image = ["0O", "0P", "0Q", "0R", "0S", "0Q", "0Q", "0Q"];
                          cc.LoaderScene.preload(g_resources_play4, function(){                                  
                              cc.director.runScene(new Play4Scene(whack_stage,whack_stage_image,whack_sprite_Image));                                                              });
                           }
                           if(target.id == "r"){
                                cc.audioEngine.stopMusic();
                                whack_stage = 4;
                                whack_stage_image = "r.png";
                                whack_sprite_Image = ["0O", "0P", "0Q", "0R", "0S", "0R", "0R", "0R"];
                                cc.LoaderScene.preload(g_resources_play5, function(){  
                                    cc.director.runScene(new Play5Scene(whack_stage,whack_stage_image,whack_sprite_Image));      
                                      });
                           }
                       if(target.id == "s"){
                            cc.audioEngine.stopMusic();
                            whack_stage = 5;
                            whack_stage_image = "s.png";
                            whack_sprite_Image = ["0S", "0T", "0U", "0V", "0W", "0S", "0S", "0S"];
                            cc.LoaderScene.preload(g_resources_play1, function(){ 
                                cc.director.runScene(new Play1Scene(whack_stage,whack_stage_image,whack_sprite_Image));                           
                                  });
                           
                           }
                       if(target.id == "t"){
                            cc.audioEngine.stopMusic();
                            whack_stage = 5;
                            whack_stage_image = "t.png";
                            whack_sprite_Image = ["0S", "0T", "0U", "0V", "0W", "0T", "0T", "0T"];
                            cc.LoaderScene.preload(g_resources_play2, function(){ 
                                cc.director.runScene(new Play2Scene(whack_stage,whack_stage_image,whack_sprite_Image));                           
                                  });
                           }
                       if(target.id == "u"){
                            cc.audioEngine.stopMusic();
                           whack_stage = 5;
                            whack_stage_image = "u.png";
                            whack_sprite_Image = ["0S", "0T", "0U", "0V", "0W", "0U", "0U", "0U"];
                            cc.LoaderScene.preload(g_resources_play3, function(){ 
                                cc.director.runScene(new Play3Scene(whack_stage,whack_stage_image,whack_sprite_Image));                           
                                  });
                           }
                       if(target.id == "v"){
                            cc.audioEngine.stopMusic();
                           whack_stage = 5;
                            whack_stage_image = "v.png";
                            whack_sprite_Image = ["0S", "0T", "0U", "0V", "0W", "0V", "0V", "0V"];
                          cc.LoaderScene.preload(g_resources_play4, function(){                                 
                               cc.director.runScene(new Play4Scene(whack_stage,whack_stage_image,whack_sprite_Image));                                                              });
                           }  
                       if(target.id == "w"){
                            cc.audioEngine.stopMusic();
                           whack_stage = 5;
                            whack_stage_image = "w.png";
                            whack_sprite_Image = ["0S", "0T", "0U", "0V", "0W", "0W", "0W", "0W"];
                            cc.LoaderScene.preload(g_resources_play5, function(){  
                                cc.director.runScene(new Play5Scene(whack_stage,whack_stage_image,whack_sprite_Image));           
                                 });
                           }
                       if(target.id == "x"){
                            cc.audioEngine.stopMusic();
                           whack_stage = 6;
                            whack_stage_image = "x.png";
                            whack_sprite_Image = ["0X", "0Y", "0Z", "0V", "0W", "0X", "0X", "0X"];
                            cc.LoaderScene.preload(g_resources_play1, function(){ 
                                cc.director.runScene(new Play1Scene(whack_stage,whack_stage_image,whack_sprite_Image));                           
                                  });
                           }
                       if(target.id == "y"){
                            cc.audioEngine.stopMusic();
                           whack_stage = 6;
                            whack_stage_image = "y.png";
                            whack_sprite_Image = ["0X", "0Y", "0Z", "0V", "0W", "0Y", "0Y", "0Y"];
                            cc.LoaderScene.preload(g_resources_play2, function(){ 
                                cc.director.runScene(new Play2Scene(whack_stage,whack_stage_image,whack_sprite_Image));                           
                                  });
                           }
                       if(target.id == "z"){
                            cc.audioEngine.stopMusic();
                            whack_stage = 6;
                            whack_stage_image = "z.png";
                            whack_sprite_Image = ["0X", "0Y", "0Z", "0V", "0W", "0Z", "0Z", "0Z"];
                            cc.LoaderScene.preload(g_resources_play3, function(){ 
                                cc.director.runScene(new Play3Scene(whack_stage,whack_stage_image,whack_sprite_Image));                           
                                  });
                          }    
               }
       return false;
  }
});

