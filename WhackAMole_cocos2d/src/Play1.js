


var Play1Layer = cc.Layer.extend({
    
    sprite:null,
    whack_stage : null,
    whack_sprite_Image : [],
    whack_stage_image:null,
    whack_score : 0,
    whack_close_Coordinates:[],whack_close_array : [],
    whack_open_Coordinates : [],
    whack_alpha_Coordinates : [],
    Whack_pic:null, whack_index:null, whack_key:null,
    whack_close0:null, whack_close1:null, whack_close2:null, whack_close3:null, whack_close4:null, whack_close5 : null,
    whack_alpha_Image: null,
    alphacheck_flag: false,
    scoreLabel : null,
    size : null,
    pausebutton : null,
    pause_flag:true,
    
    ctor:function (level, level_image, level_image_array) {
       
        this._super();
         cc.spriteFrameCache.addSpriteFrames(res.whackAMole_play1_plist);
       //  cc.spriteFrameCache.addSpriteFrames(res.whackAMole_main_plist);
        whack_score = 0;
        no_hits = 0;
         whack_stage =level,
        pause_flag = true;
         whack_sprite_Image  = level_image_array;
         this.whack_stage_image = level_image;
        size = cc.winSize;
        this.sprite = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Play2_BG.png"));
        this.sprite.x = size.width/2;
        this.sprite.y = size.height/2;
        this.addChild(this.sprite, 0);
        
        
        this.level_pic = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(this.whack_stage_image));
        this.level_pic.x =size.width/2;
        this.level_pic.y = size.height;
        this.level_pic.anchorX = 0;
        this.level_pic.anchorY = 1;
        this.level_pic.scaleX = 0.5;
        this.level_pic.scaleY = 0.5;
        this.addChild(this.level_pic, 0);
        
        pausebutton = new  cc.Sprite(cc.spriteFrameCache.getSpriteFrame("pausebutton.png"));
        pausebutton.x = size.width - pausebutton.width;
        pausebutton.y = size.height;
        pausebutton.anchorX = 0;
        pausebutton.anchorY = 1;
        pausebutton.id = "pause";
        this.addChild(pausebutton, 0);
        cc.eventManager.addListener(cc.EventListener.create({
         event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) ,pausebutton);
        
        this.base = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Play2_Hole_base.png"));
        this.base.x = 0;
        this.base.y = (350/800)*size.height;
        this.base.anchorX = 0;
        this.base.anchorY = 1;
        this.addChild(this.base, 0);
         
        this.base = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Play2_Hole_base.png"));
        this.base.x = (710/1280)*size.width;
        this.base.y = (380/800)*size.height;
        this.base.anchorX = 0;
        this.base.anchorY = 1;
        this.addChild(this.base, 0);
        
         
        this.base = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Play2_Hole_base.png"));
        this.base.x = (1020/1280)*size.width;
        this.base.y = (280/800)*size.height;
        this.base.anchorX = 0;
        this.base.anchorY = 1;
        this.addChild(this.base, 0);
        
         
        this.base = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Play2_Hole_base.png"));
        this.base.x = (490/1280)*size.width;
        this.base.y = (180/800)*size.height;
        this.base.anchorX = 0;
        this.base.anchorY = 1;
        this.addChild(this.base, 0);
        
         
        this.base = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Play2_Hole_base.png"));
        this.base.x = (120/1280)*size.width;
        this.base.y = (100/800)*size.height;
        this.base.anchorX = 0;
        this.base.anchorY = 1;
        this.addChild(this.base, 0);
        
         
        this.base = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Play2_Hole_base.png"));
        this.base.x = (820/1280)*size.width;
        this.base.y = (90/800)*size.height;
        this.base.anchorX = 0;
        this.base.anchorY = 1;
        this.addChild(this.base, 0);
        
        this.whack_close0 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Play2_Hole_Close.png"));
        this.whack_close0.x = (10/1280)*size.width;
        this.whack_close0.y = (350/800)*size.height;
        this.whack_close0.anchorX = 0;
        this.whack_close0.anchorY = 1;
        this.addChild (this.whack_close0);
        
        this.whack_close1 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Play2_Hole_Close.png"));
        this.whack_close1.x = (720/1280)*size.width;
        this.whack_close1.y = (380/800)*size.height;
        this.whack_close1.anchorX = 0;
        this.whack_close1.anchorY = 1;
        this.addChild (this.whack_close1);
        
        this.whack_close2 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Play2_Hole_Close.png"));
        this.whack_close2.x = (1030/1280)*size.width;
        this.whack_close2.y = (280/800)*size.height;
        this.whack_close2.anchorX = 0;
        this.whack_close2.anchorY = 1;
        this.addChild (this.whack_close2);
        
        this.whack_close3 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Play2_Hole_Close.png"));
        this.whack_close3.x = (500/1280)*size.width;
        this.whack_close3.y = (180/800)*size.height;
        this.whack_close3.anchorX = 0;
        this.whack_close3.anchorY = 1;
        this.addChild (this.whack_close3);
        
        this.whack_close4 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Play2_Hole_Close.png"));
        this.whack_close4.x = (130/1280)*size.width;
        this.whack_close4.y = (100/800)*size.height;
        this.whack_close4.anchorX = 0;
        this.whack_close4.anchorY = 1;
        this.addChild (this.whack_close4);
        
        this.whack_close5 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Play2_Hole_Close.png"));
        this.whack_close5.x = (830/1280)*size.width;
        this.whack_close5.y = (90/800)*size.height;
        this.whack_close5.anchorX = 0;
        this.whack_close5.anchorY = 1;
        this.addChild (this.whack_close5);
        
        this.whack_close_array = [this.whack_close0, this.whack_close1, this.whack_close2, this.whack_close3, this.whack_close4, this.whack_close5];
        this.whack_close_Coordinates = [{x: 10, y: 350}, {x: 720, y: 380}, {x: 1030, y: 280},
                                    {x: 500, y:180}, {x: 130, y: 100}, {x: 830, y: 90}];
        this.whack_open_Coordinates = [{x: 130, y: 340}, {x: 840, y: 370}, {x: 1150, y: 270},
                                    {x: 620, y:170}, {x: 250, y: 90}, {x: 950, y: 80}]; 
                                    
        this.whack_alpha_Coordinates = [{x: 30, y: 310}, {x: 740, y: 340}, 
                                  {x: 1050, y: 240}, {x: 520, y: 140}, 
                                    {x: 150 , y: 60}, {x: 850, y: 50}]; 
        
        this.schedule(this.showAlpha, 2);
        this.scheduleUpdate();
        
        this.scorebar = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("scorebar.png"));
         this.scorebar.x = 0;
         this.scorebar.y = size.height;
         this.scorebar.anchorX = 0;
         this.scorebar.anchorY = 1;
        this.addChild(this.scorebar);
        
        menu =  new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("complete.png"));
         menu.x = size.width/2;
         menu.y = size.height/2;
        menu.visible = false;
        this.addChild(menu,3);
        
        menu_bar =  new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("scorebar.png"));
         menu_bar.x = size.width/2;
         menu_bar.y = size.height/2;
        menu_bar.visible = false;
        this.addChild(menu_bar,3);
        
         resume_label = new cc.LabelTTF(" RESUME " , "Arial", 90);
         resume_label.x = size.width/2;
         resume_label.y = size.height/2;
         resume_label.visible = false;
         resume_label.id = "resume";
         resume_label.setColor(cc.color(0,0,0));
         this.addChild(resume_label,3);
         
         resume12_label = new cc.LabelTTF(" click here to continue " , "Arial", 90);
         resume12_label.x = size.width/2 ;
         resume12_label.y = size.height/2 + menu.width/5;
         resume12_label.setColor(cc.color(255,255,255));
         resume12_label.visible = false;
         this.addChild(resume12_label,3);

        scoreLabel = new cc.LabelTTF("  Score: " + whack_score, "Arial", 90);
        
         scoreLabel.x = 0;
         scoreLabel.y = size.height;
         scoreLabel.anchorX = 0;
         scoreLabel.anchorY = 1;
         scoreLabel.setColor(cc.color(0,0,0));
         this.addChild(scoreLabel);
        return true;
    },
    
    showAlpha: function () {
        this.whack_index = Math.floor(Math.random()*100 % 6);
        this.whack_key =  Math.floor(Math.random()*100 % 7);
         temp = (this.whack_close_array[this.whack_index]);
         temp.visible = false;
        this.Whack_pic =  new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Play2_Hole_Open.png"));
        this.Whack_pic.x = (this.whack_open_Coordinates[this.whack_index].x/1280)*size.width;
        this.Whack_pic.y = (this.whack_open_Coordinates[this.whack_index].y/800)*size.height;
        this.Whack_pic.anchorX = 0.5;
        this.Whack_pic.anchorY = 0;
        this.addChild(this.Whack_pic, 0);
       
        this.whack_alpha_Image = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(whack_sprite_Image[this.whack_key]+".png"));
        this.whack_alpha_Image.x = (this.whack_alpha_Coordinates[this.whack_index].x/1280)*size.width;
        this.whack_alpha_Image.y = (this.whack_alpha_Coordinates[this.whack_index].y/800)*size.height;
        this.whack_alpha_Image.anchorX = 0;
        this.whack_alpha_Image.anchorY = 0;
        this.whack_alpha_Image.id = whack_sprite_Image[this.whack_key];
        this.addChild(this.whack_alpha_Image, 1);
         cc.eventManager.addListener(cc.EventListener.create({
         event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) ,this.whack_alpha_Image);
         
         this.scheduleOnce(function (){
            this.removeChild(this.whack_alpha_Image); 
            this.removeChild(this.Whack_pic);
            temp = (this.whack_close_array[this.whack_index]);
            temp.visible = true;
            },1);
   
    },
    update: function (dt){
        if (whack_score == 5){
            cc.log(no_hits);
            whack_score = 0;
            cc.director.pause();
            menu.visible = true;
            var levelcomplete1 =  new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("levelcomplete.png")); 
            levelcomplete1.x = size.width/2 ;
            levelcomplete1.y = size.height/2 + menu.width/5;
            this.addChild(levelcomplete1,3); 
            
            
         var hits = new cc.LabelTTF("Total number of hits =  "+ no_hits , "Arial", 90);
         hits.x = size.width/2;
         hits.y = size.height/2;
        // hits.visible = false;
         hits.setColor(cc.color(0,0,0));
         this.addChild(hits,3);
         
         var missed = no_hits - 5;
         var hits1 = new cc.LabelTTF("Missed hits =  "+  missed  , "Arial", 90);
         hits1.x = size.width/2 ;
         hits1.y = size.height/2 - hits.height;
        // hits1.visible = false;
         hits1.setColor(cc.color(0,0,0));
         this.addChild(hits1,3);
         
         var menubutton =  new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menubutton.png")); 
            menubutton.x = size.width/2 ;
            menubutton.y = size.height/2 - menu.width/5;
            menubutton.id = "menubutton";
            this.addChild(menubutton,3);
            cc.eventManager.addListener(cc.EventListener.create({
         event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) ,menubutton);
               
        }
    },
    kill: function (){
       this.removeChild(this.whack_alpha_Image); 
       this.removeChild(this.Whack_pic);
       temp = (this.whack_close_array[this.whack_index]);
       temp.visible = true;
    },
    
    onTouchBegan: function(touch, event){
       
         var target = event.getCurrentTarget();
         var location = target.convertToNodeSpace(touch.getLocation());
         var targetSize = target.getContentSize();
         var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);
         if (cc.rectContainsPoint(targetRectangle, location))
                   {
                     if(whack_stage == 1 && target.id ==  "0A" && pause_flag){
                             no_hits++;
                             cc.audioEngine.playEffect(res.WhackAMole_rightMusic); 
                            whack_score += 1;
                            scoreLabel.setString("  Score: " + whack_score);
                           } 
                           
                        else if(whack_stage == 2 && target.id ==  "0F" && pause_flag){
                            no_hits++; 
                           cc.audioEngine.playEffect(res.WhackAMole_rightMusic); 
                             whack_score += 1;
                             scoreLabel.setString("  Score: " + whack_score);
                           
                           }
                        else if(whack_stage == 3 && target.id ==  "0K" && pause_flag){
                            no_hits++;
                           cc.audioEngine.playEffect(res.WhackAMole_rightMusic); 
                             whack_score += 1;
                             scoreLabel.setString("  Score: " + whack_score);
                          
                           } 
                           
                          else if(whack_stage == 5 && target.id ==  "0S" && pause_flag){
                            no_hits++;
                           cc.audioEngine.playEffect(res.WhackAMole_rightMusic); 
                             whack_score += 1;
                             scoreLabel.setString("  Score: " + whack_score);
                           
                           }
                          else if(whack_stage == 6 && target.id ==  "0X" && pause_flag){
                           no_hits++;
                           cc.audioEngine.playEffect(res.WhackAMole_rightMusic); 
                             whack_score += 1;
                             scoreLabel.setString("  Score: " + whack_score);
                           
                         }
                         
                           else if(target.id == "pause"){
     
                               cc.log("pause");
                               pause_flag = false;
                               menu.visible = true;
                               menu_bar.visible = true;
                               resume_label.visible = true;
                               resume12_label.visible = true;
                               cc.director.pause();
                               cc.eventManager.addListener(cc.EventListener.create({
                                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                                    swallowTouches:true,  
                                    onTouchBegan: this.onTouchBegan,}) ,resume_label);

                                var menubutton =  new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("menubutton.png")); 
                                menubutton.x = size.width/2 ;
                                menubutton.y = size.height/2 - menu.width/5;
                                menubutton.id = "menubutton";
                                self.addChild(menubutton,3);
                                cc.eventManager.addListener(cc.EventListener.create({
                                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                                swallowTouches:true,  
                                onTouchBegan: this.onTouchBegan,}) ,menubutton);

                               cc.eventManager.addListener(cc.EventListener.create({
                                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                                    swallowTouches:true,  
                                    onTouchBegan: this.onTouchBegan,}) ,resume_label);
                           }
                            else if (target.id == "resume"){
                               pause_flag = true;
                               menu.visible = false;
                               menu_bar.visible = false;
                               resume_label.visible = false;
                               resume12_label.visible = false;
                               cc.director.resume();  
                           }else if (target.id == "menubutton"){
                             
                                cc.director.runScene(new Level1Scene());                            
                                  
                           }
                           else { 
                               no_hits++;  
                               //score -- if click "A" but stage is different then score --
                            cc.audioEngine.playEffect(res.WhackAMole_wrongMusic);
                             whack_score -= 1;
                             if (whack_score == -1){
                                 whack_score = 0;
                             }
                            scoreLabel.setString("  Score: " + whack_score);
                         }     
                             }
                             return false;
                   }
});

var Play1Scene = cc.Scene.extend({
    
     ctor:function (x,y,z) {
         this._super();
         var layer = new Play1Layer(x,y,z);
         this.addChild(layer);
     
     }
});

