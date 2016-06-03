// var whack_score = 0;
var Level1Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new Level1Layer();
        this.addChild(layer);
    }
});



var Level1Layer = cc.Layer.extend({
    sprite:null,
    whack_stage :null,
    whack_sprite_Image : [],
    whack_stage_image:null,
   
    ctor:function () {
        this._super();
        cc.audioEngine.playMusic(res.WhackAMole_backgroundMusic, true);
        cc.spriteFrameCache.addSpriteFrames(res.whackAMole_level_plist);
        cc.spriteFrameCache.addSpriteFrames(res.whackAMole_main_plist);
        var size = cc.winSize;
        this.sprite = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("LevelScreen1.png"));
        this.sprite.x = size.width / 2;
        this.sprite.y = size.height / 2;
        this.addChild(this.sprite, 0);
        
        var game_width = (180/1280)*size.width;
        var game_height = (560/800)*size.height;
        
        var a_level = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("a.png"));
        a_level.x = game_width;
        a_level.y = game_height;
        this.addChild(a_level, 0);
        a_level.id = "a";
        
        var b_level = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("b.png"));
        b_level.x = (game_width +=a_level.width + (10/1280)*size.width);
        b_level.y = game_height;
        this.addChild(b_level, 0);
        b_level.id = "b";
        
         
        var c_level = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("c.png"));
        c_level.x = (game_width +=b_level.width + (10/1280)*size.width);
        c_level.y = game_height;
        this.addChild(c_level, 0);
        c_level.id = "c";
        
        var d_level = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("d.png"));
        d_level.x = (game_width +=c_level.width + (10/1280)*size.width);
        d_level.y = game_height;
        this.addChild(d_level, 0);
        d_level.id = "d";
        
        var e_level = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("e.png"));
        e_level.x = (game_width +=d_level.width + (10/1280)*size.width);
        e_level.y = game_height;
        this.addChild(e_level, 0);
        e_level.id = "e";
        
        game_width = (180/1280)*size.width;
        game_height -= b_level.height;
        
        var f_level = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("f.png"));
        f_level.x = game_width;
        f_level.y = game_height;
        this.addChild(f_level, 0);
        f_level.id = "f";
        
        var g_level = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("g.png"));
        g_level.x = (game_width += f_level.width + (10/1280)*size.width);
        g_level.y = game_height;
        this.addChild(g_level, 0);
        g_level.id = "g";
        
         
        var h_level = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("h.png"));
        h_level.x = (game_width += g_level.width + (10/1280)*size.width);
        h_level.y = game_height;
        this.addChild(h_level, 0);
        h_level.id = "h";
        
        var i_level = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("i.png"));
        i_level.x = (game_width +=h_level.width + (10/1280)*size.width);
        i_level.y = game_height;
        this.addChild(i_level, 0);
        i_level.id = "i";
        
        var j_level = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("j.png"));
        j_level.x = (game_width +=i_level.width + (10/1280)*size.width);
        j_level.y = game_height;
        this.addChild(j_level, 0);
        j_level.id = "j";
        
        
         game_width = (180/1280)*size.width;
        game_height -= g_level.height;
        
        var k_level = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("k.png"));
        k_level.x = game_width;
        k_level.y = game_height;
        this.addChild(k_level, 0);
        k_level.id = "k";
        
        var l_level = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("l.png"));
        l_level.x = (game_width += k_level.width + (10/1280)*size.width);
        l_level.y = game_height;
        this.addChild(l_level, 0);
        l_level.id = "l";
        
         
        var m_level = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("m.png"));
        m_level.x = (game_width += l_level.width + (10/1280)*size.width);
        m_level.y = game_height;
        this.addChild(m_level, 0);
        m_level.id = "m";
        
        var n_level = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("n.png"));
        n_level.x = (game_width += m_level.width + (10/1280)*size.width);
        n_level.y = game_height;
        this.addChild(n_level, 0);
        n_level.id = "n";
        
        var right_level = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Right.png"));
        right_level.x = (game_width +=n_level.width + (10/1280)*size.width);
        right_level.y = game_height;
        this.addChild(right_level, 0);
        right_level.id = "right";
        
         console.log("a width = "+b_level.width);
        cc.eventManager.addListener(cc.EventListener.create({
         event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}), a_level);
        cc.eventManager.addListener(cc.EventListener.create({
         event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}), b_level);
        cc.eventManager.addListener(cc.EventListener.create(  
    {
         event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , c_level);
        cc.eventManager.addListener(cc.EventListener.create(  
    {
         event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , d_level);
        cc.eventManager.addListener(cc.EventListener.create(  
    {
         event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , e_level);
        cc.eventManager.addListener(cc.EventListener.create(  
    {
         event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , f_level);
        cc.eventManager.addListener(cc.EventListener.create(  
    {
         event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , g_level);
        cc.eventManager.addListener(cc.EventListener.create(  
    {
         event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , h_level);
        cc.eventManager.addListener(cc.EventListener.create(  
    {
         event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , i_level);
        cc.eventManager.addListener(cc.EventListener.create(  
    {
         event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , j_level);
        cc.eventManager.addListener(cc.EventListener.create(  
    {
         event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , k_level);
        cc.eventManager.addListener(cc.EventListener.create(  
    {
         event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , l_level);
        cc.eventManager.addListener(cc.EventListener.create(  
    {
         event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , m_level);
        cc.eventManager.addListener(cc.EventListener.create(  
    {
         event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , n_level);
        cc.eventManager.addListener(cc.EventListener.create(  
    {
         event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , right_level);
        return true;
    },
    
    onTouchBegan: function(touch, event){
         var target = event.getCurrentTarget();
         var location = target.convertToNodeSpace(touch.getLocation());
         var targetSize = target.getContentSize();
         var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);
         if (cc.rectContainsPoint(targetRectangle, location))
                   {
                       if(target.id == "a"){
                          cc.audioEngine.stopMusic();
                           whack_stage = 1;
                           whack_stage_image = "a.png";
                           whack_sprite_Image = ["0A", "0B", "0C", "0D","0E", "0A", "0A", "0A"];
                           cc.LoaderScene.preload(g_resources_play1, function(){ 
                                cc.director.runScene(new Play1Scene(whack_stage,whack_stage_image,whack_sprite_Image));                           
                                  });
                        //    cc.director.runScene(new Play1Scene(whack_stage,whack_stage_image,whack_sprite_Image));
                           }
                       if(target.id == "b"){
                           cc.audioEngine.stopMusic();
                           whack_stage = 1;
                           whack_stage_image = "b.png";
                           whack_sprite_Image = ["0A", "0B", "0C", "0D","0E","0F", "0B", "0B", "0B"];
                           cc.LoaderScene.preload(g_resources_play2, function(){ 
                                cc.director.runScene(new Play2Scene(whack_stage,whack_stage_image,whack_sprite_Image));                           
                                  });
                          // cc.director.runScene(new Play2Scene(whack_stage,whack_stage_image,whack_sprite_Image));
                           }
                       if(target.id == "c"){
                            cc.audioEngine.stopMusic();
                           whack_stage = 1;
                           whack_stage_image = "c.png"
                           whack_sprite_Image = ["0A", "0B", "0C", "0D","0E","0F", "0C", "0C", "0C"];
                          cc.LoaderScene.preload(g_resources_play3, function(){ 
                                cc.director.runScene(new Play3Scene(whack_stage,whack_stage_image,whack_sprite_Image));                           
                                  });
                        //   cc.director.runScene(new Play3Scene(whack_stage,whack_stage_image,whack_sprite_Image));
                           }
                       if(target.id == "d"){
                            cc.audioEngine.stopMusic();
                           whack_stage = 1;
                           whack_stage_image = "d.png";
                           whack_sprite_Image = ["0A", "0B", "0C", "0D","0E","0F", "0D", "0D", "0D"];
                          cc.LoaderScene.preload(g_resources_play4, function(){                                  
                              cc.director.runScene(new Play4Scene(whack_stage,whack_stage_image,whack_sprite_Image));
                              });
                           }
                           if(target.id == "e"){
                                cc.audioEngine.stopMusic();
                               whack_stage = 1;
                                whack_stage_image = "e.png";
                           whack_sprite_Image = ["0A", "0B", "0C", "0D","0E","0F", "0E", "0E", "0E"];
                           cc.LoaderScene.preload(g_resources_play5, function(){  
                               cc.director.runScene(new Play5Scene(whack_stage,whack_stage_image,whack_sprite_Image));            
                            });
                           }
                       if(target.id == "f"){
                            cc.audioEngine.stopMusic();
                           whack_sprite_Image = ["0F", "0G", "0H","0I", "0J", "0F", "0F", "0F"];
                           whack_stage = 2;
                           whack_stage_image = "f.png";
                            cc.LoaderScene.preload(g_resources_play1, function(){ 
                                cc.director.runScene(new Play1Scene(whack_stage,whack_stage_image,whack_sprite_Image));                           
                                  });
                           }
                       if(target.id == "g"){
                            cc.audioEngine.stopMusic();
                           whack_stage = 2;
                           whack_stage_image = "g.png";
                           whack_sprite_Image = ["0F", "0G", "0H", "0I", "0J", "0G", "0G", "0G"];
                           cc.LoaderScene.preload(g_resources_play2, function(){ 
                                cc.director.runScene(new Play2Scene(whack_stage,whack_stage_image,whack_sprite_Image));                           
                                  });
                           }
                       if(target.id == "h"){
                            cc.audioEngine.stopMusic();
                           whack_stage = 2;
                            whack_stage_image = "h.png";
                           whack_sprite_Image = ["0F", "0G", "0H", "0I", "0J", "0H", "0H", "0H"];
                           cc.LoaderScene.preload(g_resources_play3, function(){ 
                                cc.director.runScene(new Play3Scene(whack_stage,whack_stage_image,whack_sprite_Image));                           
                                  });
                           }
                       if(target.id == "i"){
                            cc.audioEngine.stopMusic();
                           whack_stage = 2;
                           whack_stage_image = "i.png";
                           whack_sprite_Image = ["0F", "0G", "0H", "0I", "0J", "0I", "0I", "0I"];
                           cc.LoaderScene.preload(g_resources_play4, function(){                                 
                                cc.director.runScene(new Play4Scene(whack_stage,whack_stage_image,whack_sprite_Image));                                                              
                            });
                           
                           }  
                       if(target.id == "j"){
                            cc.audioEngine.stopMusic();
                           whack_stage = 2;
                            whack_stage_image = "j.png";
                           whack_sprite_Image = ["0F", "0G", "0H", "0I", "0J", "0J", "0J", "0J"];
                           cc.LoaderScene.preload(g_resources_play5, function(){  
                               cc.director.runScene(new Play5Scene(whack_stage,whack_stage_image,whack_sprite_Image));           
                                });
                           }
                       if(target.id == "k"){
                            cc.audioEngine.stopMusic();
                           whack_sprite_Image = ["0K", "0L", "0M", "0N", "0J", "0K", "0K", "0K"];
                           whack_stage = 3;
                           whack_stage_image = "k.png";
                            cc.LoaderScene.preload(g_resources_play1, function(){ 
                                cc.director.runScene(new Play1Scene(whack_stage,whack_stage_image,whack_sprite_Image));                           
                                  });
                           }
                       if(target.id == "l"){
                            cc.audioEngine.stopMusic();
                           whack_stage = 3;
                           whack_stage_image = 'l.png';
                           whack_sprite_Image = ["0K", "0L", "0M", "0N", "0J", "0L", "0L", "0L"];
                           cc.LoaderScene.preload(g_resources_play2, function(){ 
                                cc.director.runScene(new Play2Scene(whack_stage,whack_stage_image,whack_sprite_Image));                           
                                  });
                           }
                       if(target.id == "m"){
                            cc.audioEngine.stopMusic();
                           whack_stage = 3;
                           whack_stage_image = "m.png";
                           whack_sprite_Image = ["0K", "0L", "0M", "0N", "0J", "0M", "0M", "0M"];
                         cc.LoaderScene.preload(g_resources_play3, function(){ 
                                cc.director.runScene(new Play3Scene(whack_stage,whack_stage_image,whack_sprite_Image));                           
                                  });
                           }
                       if(target.id == "n"){
                            cc.audioEngine.stopMusic();
                           whack_stage = 3;
                           whack_stage_image = "n.png";
                           whack_sprite_Image = ["0K", "0L", "0M", "0N", "0J", "0N", "0N", "0N"];
                           cc.LoaderScene.preload(g_resources_play4, function(){                                  
                               cc.director.runScene(new Play4Scene(whack_stage,whack_stage_image,whack_sprite_Image));                          
                              });
                           }
                       if(target.id == "right"){
                           
                           cc.director.runScene(new Level2Scene());
                           }
                           
                      }
        return false;
 },
    stopMusic: function(){
        cc.audioEngine.stopMusic();
    }
});

