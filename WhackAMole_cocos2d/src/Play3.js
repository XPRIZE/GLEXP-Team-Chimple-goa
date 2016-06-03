
var Play3Layer = cc.Layer.extend({
    sprite:null,
    whack_stage :null,
    whack_sprite_Image : [],
    whack_stage_image:null,
    whack_alpha_Coordinates : [],
    map: null,
    scoreLabel:null,
    self: null,
    pausebutton : null,
    pause_flag:true,
    size:null,
    
     ctor:function (level, level_image, level_image_array) {
       
        this._super();
        
         whack_stage =level,
         whack_sprite_Image  = level_image_array;
         whack_stage_image = level_image;
         size = cc.winSize;
         whack_score = 0;
         no_hits = 0;
        pause_flag = true;
        cc.spriteFrameCache.addSpriteFrames(res.whackAMole_play3_plist);
         map = cc.TMXTiledMap.create(res.WhackAMole_tile3_back);
         this.addChild(map,0);
         var  map1 = cc.TMXTiledMap.create(res.WhackAMole_tile3_front);
         this.addChild(map1,1);
         var level_pic = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(whack_stage_image));
         level_pic.x = size.width/2;
         level_pic.y = size.height;
         level_pic.anchorX = 0;
         level_pic.anchorY = 1;
         level_pic.scaleX = 0.5;
         level_pic.scaleY = 0.5;
         this.addChild(level_pic, 1);
         whack_alpha_Coordinates = [{x: 120, y: 920}, {x: 1080, y: 920},
                                 {x: 2080, y: 920}, {x: 600, y: 480},
                                  {x: 1600, y: 480}];
      
         this.schedule(this.showAlpha, 2);
         this.scheduleUpdate();
         
         this.scorebar = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("scorebar.png"));
         this.scorebar.x = 0;
         this.scorebar.y = size.height;
         this.scorebar.anchorX = 0;
         this.scorebar.anchorY = 1;
         this.addChild(this.scorebar,1);
         pausebutton = new  cc.Sprite(cc.spriteFrameCache.getSpriteFrame("pausebutton.png"));
         
        pausebutton.x = size.width - pausebutton.width;
        pausebutton.y = size.height;
        pausebutton.anchorX = 0;
        pausebutton.anchorY = 1;
        pausebutton.id = "pause";
        this.addChild(pausebutton, 2);
        cc.eventManager.addListener(cc.EventListener.create({
         event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) ,pausebutton);
         
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
         
         scoreLabel = new cc.LabelTTF("    Score: "+ whack_score, "Arial", 90);
         scoreLabel.x = 0;
         scoreLabel.y = size.height;
         scoreLabel.anchorX = 0;
         scoreLabel.anchorY = 1;
         scoreLabel.setColor(cc.color(0,0,0));
         this.addChild(scoreLabel,1);
         self = this;
         return true;
         
    },
    
    showAlpha: function () {
     whack_index = Math.floor(Math.random()*100 % 5);
     whack_key =  Math.floor(Math.random()*100 % 7);
     
     whack_alpha_Image = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(whack_sprite_Image[whack_key]+".png"));
     whack_alpha_Image.x = whack_alpha_Coordinates[whack_index].x;
     whack_alpha_Image.y = whack_alpha_Coordinates[whack_index].y;
     whack_alpha_Image.anchorX = 0;
     whack_alpha_Image.anchorY = 1;
     whack_alpha_Image.id = whack_sprite_Image[whack_key];
     this.addChild(whack_alpha_Image, 0);  
     var whack_jump = cc.JumpBy.create(1,cc.p(0, 0),600,1);
     whack_alpha_Image.runAction(whack_jump);
     this.scheduleOnce(function(){
        this.removeChild(whack_alpha_Image); 
      },1); 
     cc.eventManager.addListener(cc.EventListener.create({
         event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) ,whack_alpha_Image);   
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
    
    onTouchBegan: function(touch, event){
         var target = event.getCurrentTarget();
         var location = target.convertToNodeSpace(touch.getLocation());
         var targetSize = target.getContentSize();
         var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);
         if (cc.rectContainsPoint(targetRectangle, location))
                   {
                     if(whack_stage == 1 && target.id ==  "0C" && pause_flag){
                             no_hits++; 
                              self.removeChild(whack_alpha_Image); 
                            cc.audioEngine.playEffect(res.WhackAMole_rightMusic);
                            whack_score += 1;
                            scoreLabel.setString("    Score: "+ whack_score); 
                           }
                        else if(whack_stage == 2 && target.id ==  "0H" && pause_flag){
                             no_hits++; 
                                self.removeChild(whack_alpha_Image);
                                cc.audioEngine.playEffect(res.WhackAMole_rightMusic); 
                                whack_score += 1;
                                scoreLabel.setString("    Score: "+ whack_score);  
                           }
                        else if(whack_stage == 3 && target.id ==  "0M" && pause_flag){
                                no_hits++;
                                self.removeChild(whack_alpha_Image);
                                 cc.audioEngine.playEffect(res.WhackAMole_rightMusic); 
                                 whack_score += 1;
                                 scoreLabel.setString("    Score: "+ whack_score);
                           
                           } 
                         else if(whack_stage == 4 && target.id ==  "0P" && pause_flag){
                              no_hits++;
                              self.removeChild(whack_alpha_Image);
                              cc.audioEngine.playEffect(res.WhackAMole_rightMusic); 
                              whack_score += 1;
                              scoreLabel.setString("    Score: "+ whack_score);
                           }
                          else if(whack_stage == 5  && target.id ==  "0U" && pause_flag){
                             no_hits++;
                              self.removeChild(whack_alpha_Image);
                              cc.audioEngine.playEffect(res.WhackAMole_rightMusic); 
                              whack_score += 1;
                              scoreLabel.setString("    Score: "+ whack_score);
                           
                           }
                          else if(whack_stage == 6 && target.id ==  "0Z" && pause_flag){
                           no_hits++;
                              self.removeChild(whack_alpha_Image);
                              cc.audioEngine.playEffect(res.WhackAMole_rightMusic); 
                              whack_score += 1;
                             scoreLabel.setString("    Score: "+ whack_score);
                           }
                            else if(target.id == "pause"){
     
                             //  cc.log("pause");
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
     return true;
 }
});

var Play3Scene = cc.Scene.extend({
   
   ctor:function (x,y,z) {
         this._super();
         var layer = new Play3Layer(x,y,z);
         this.addChild(layer);
     },
});