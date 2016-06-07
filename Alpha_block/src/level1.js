/// <reference path="../../cocos2d-typescript-definitions/cocos2d/cocos2d-lib.d.ts" />

var Level_1_Layer = cc.Layer.extend({
item_1 : null,
item_2 : null,
item_3 : null,
item_4 : null,
item_5 : null,
item_6 : null,
item_7 : null,
item_8 : null,
item_9 : null,
item_10 : null,
item_11 : null,
item_12 : null,
item_13 : null,
item_14 : null,
item_15 : null,
item_16 : null,
item_17 : null,
item_18 : null,
item_19 : null,
item_20 : null,
item_21 : null,
item_22 : null,
item_23 : null,
item_24 : null,
item_25 : null,
position : null,
chars : null,
letterArray : null,
letterIndex : null,
clickLetter : null,
vowelArray : null,
consonantArray : null,
storeLetter : null,
size : null,
hint_flag : null,

ctor : function () {
        this._super();
        
        var self = this;
        self.size = cc.winSize;
        self.hint_flag = 0;
        
        
        self.item_1 = new Array();
        self.item_2 = new Array();
        self.item_3 = new Array();
        self.item_4 = new Array();
        self.item_5 = new Array();
        self.item_6 = new Array();
        self.item_7 = new Array();
        self.item_8 = new Array();
        self.item_9 = new Array();
        self.item_10 = new Array();
        self.item_11 = new Array();
        self.item_12 = new Array();
        self.item_13 = new Array();
        self.item_14 = new Array();
        self.item_15 = new Array();
        self.item_16 = new Array();
        self.item_17 = new Array();
        self.item_18 = new Array();
        self.item_19 = new Array();
        self.item_20 = new Array();
        self.item_21 = new Array();
        self.item_22 = new Array();
        self.item_23 = new Array();
        self.item_24 = new Array();
        self.item_25 = new Array();
        self.storeLetter = new Array();
        self.letterIndex = new Array();
        self.letterArray = new Array();
        self.clickLetter = new Array();
        self.chars = new Array();
        self.vowelArray = new Array();
        self.consonantArray = new Array();        
        
        cc.spriteFrameCache.addSpriteFrames(res1.bg_plist);
        cc.spriteFrameCache.addSpriteFrames(res1.buttons_plist);
        
        // background sprite        
        this.Level_1_BG = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("bg/level1_bg.png"), this);
        this.Level_1_BG.attr({
           x : self.size.width/2,
           y : self.size.height/2,
           anchorX : .5,
           anchorY : .5 
        });
        this.addChild(this.Level_1_BG);
        
        // home button
        this.Home = new eventListenerClass("buttons/Home.png", this);
        this.Home.attr({
           x : self.size.width*10/100,
           y : self.size.height*95/100,
           anchorX : .5,
           anchorY : .5 
        });
        this.addChild(this.Home);
        this.Home.id = "Home";
        
        // Orange tile  1st line, 1st item
       this.Orange_tile_shadow_1_1 = new eventListenerClass(res.Orange_tile_shadow, this); 
       this.Orange_tile_shadow_1_1.attr({
          x : self.size.width*30/100,
          y : self.size.height*75/100,
       });
       this.Orange_tile_shadow_1_1.id = "Orange_tile_shadow_1_1";
       this.addChild(this.Orange_tile_shadow_1_1);
       
       this.Orange_tile_1_2 = new eventListenerClass(res.Orange_tile, this);
       this.Orange_tile_1_2.attr({
          x : this.Orange_tile_shadow_1_1.x-10,
          y : this.Orange_tile_shadow_1_1.y+10,
       });
       this.Orange_tile_1_2.id = "Orange_tile_1_2";
       this.addChild(this.Orange_tile_1_2);
       
       this.Orange_tile_1_3 = new eventListenerClass(res.Orange_tile, this); 
       this.Orange_tile_1_3.attr({
          x : this.Orange_tile_1_2.x-8,
          y : this.Orange_tile_1_2.y+8,
          anchorX : 0.5,
          anchorY : 0.5
       });
       this.Orange_tile_1_3.id = "Orange_tile_1_3";
       this.addChild(this.Orange_tile_1_3);
       this.Orange_tile_1_3.flag = 0;
       
       self.item_1.push(this.Orange_tile_shadow_1_1);
       self.item_1.push(this.Orange_tile_1_2);
       self.item_1.push(this.Orange_tile_1_3);

       // red tile 1st line, 2nd item
       this.Red_tile_shadow_2_1 = new eventListenerClass(res.Red_tile_shadow, this); 
       this.Red_tile_shadow_2_1.attr({
          x : self.size.width*50/100,
          y : self.size.height*75/100,
       });
       this.Red_tile_shadow_2_1.id = "Red_tile_shadow_2_1";
       this.addChild(this.Red_tile_shadow_2_1);
       
       this.Red_tile_2_2 = new eventListenerClass(res.Red_tile, this); 
       this.Red_tile_2_2.attr({
          x : this.Red_tile_shadow_2_1.x-10,
          y : this.Red_tile_shadow_2_1.y+10,
       });
       this.Red_tile_2_2.id = "Red_tile_2_2";
       this.addChild(this.Red_tile_2_2);

       self.item_2.push(this.Red_tile_shadow_2_1);
       self.item_2.push(this.Red_tile_2_2);
       this.Red_tile_2_2.flag = 0;
       
        // Cyan tile  1st line, 3rd item
       this.Cyan_tile_shadow_3_1 = new eventListenerClass(res.Cyan_tile_shadow, this); 
       this.Cyan_tile_shadow_3_1.attr({
          x : self.size.width*70/100,
          y : self.size.height*75/100,
       });
       this.Cyan_tile_shadow_3_1.id = "Cyan_tile_shadow_3_1";
       this.addChild(this.Cyan_tile_shadow_3_1);
       
       this.Cyan_tile_3_2 = new eventListenerClass(res.Cyan_tile, this); 
       this.Cyan_tile_3_2.attr({
          x : this.Cyan_tile_shadow_3_1.x-10,
          y : this.Cyan_tile_shadow_3_1.y+10,
       });
       this.Cyan_tile_3_2.id = "Cyan_tile_3_2";
       this.addChild(this.Cyan_tile_3_2);
       
       this.Cyan_tile_3_3 = new eventListenerClass(res.Cyan_tile, this); 
       this.Cyan_tile_3_3.attr({
          x : this.Cyan_tile_3_2.x-8,
          y : this.Cyan_tile_3_2.y+8,
          anchorX : 0.5,
          anchorY : 0.5
       });
       this.Cyan_tile_3_3.id = "Cyan_tile_3_3";
       this.addChild(this.Cyan_tile_3_3);
       this.Cyan_tile_3_3.flag = 0;
              
       self.item_3.push(this.Cyan_tile_shadow_3_1);
       self.item_3.push(this.Cyan_tile_3_2);
       self.item_3.push(this.Cyan_tile_3_3);
       
        // Pink tile  2nd line, 1st item
       this.Pink_tile_shadow_4_1 = new eventListenerClass(res.Pink_tile_shadow, this); 
       this.Pink_tile_shadow_4_1.attr({
          x : self.size.width*30/100,
          y : self.size.height*65/100,
       });
       this.Pink_tile_shadow_4_1.id = "Pink_tile_shadow_4_1";
       this.addChild(this.Pink_tile_shadow_4_1);
       this.Pink_tile_shadow_4_1.flag = 0;
       
       self.item_4.push(this.Pink_tile_shadow_4_1);
       
       // Green tile 2nd line, 2nd item
       this.Green_tile_shadow_5_1 = new eventListenerClass(res.Green_tile_shadow, this); 
       this.Green_tile_shadow_5_1.attr({
          x : self.size.width*50/100,
          y : self.size.height*65/100,
       });
       this.Green_tile_shadow_5_1.id = "Green_tile_shadow_5_1";
       this.addChild(this.Green_tile_shadow_5_1);
       
       this.Green_tile_5_2 = new eventListenerClass(res.Green_tile, this); 
       this.Green_tile_5_2.attr({
          x : this.Green_tile_shadow_5_1.x-10,
          y : this.Green_tile_shadow_5_1.y+10,
       });
       this.Green_tile_5_2.id = "Green_tile_5_2";
       this.addChild(this.Green_tile_5_2);
       
       this.Green_tile_5_3 = new eventListenerClass(res.Green_tile, this); 
       this.Green_tile_5_3.attr({
          x : this.Green_tile_5_2.x-8,
          y : this.Green_tile_5_2.y+8,
       });
       this.Green_tile_5_3.id = "Green_tile_5_3";
       this.addChild(this.Green_tile_5_3);
       
       this.Green_tile_5_4 = new eventListenerClass(res.Green_tile, this); 
       this.Green_tile_5_4.attr({
          x : this.Green_tile_5_3.x-8,
          y : this.Green_tile_5_3.y+8,
       });
       this.Green_tile_5_4.id = "Green_tile_5_4";
       this.addChild(this.Green_tile_5_4);
       
       this.Green_tile_5_5 = new eventListenerClass(res.Green_tile, this); 
       this.Green_tile_5_5.attr({
          x : this.Green_tile_5_4.x-8,
          y : this.Green_tile_5_4.y+8,
       });
       this.Green_tile_5_5.id = "Green_tile_5_5";
       this.addChild(this.Green_tile_5_5);
       this.Green_tile_5_5.flag = 0;
       
       self.item_5.push(this.Green_tile_shadow_5_1);
       self.item_5.push(this.Green_tile_5_2);
       self.item_5.push(this.Green_tile_5_3);
       self.item_5.push(this.Green_tile_5_4);
       self.item_5.push(this.Green_tile_5_5);
       
        // Pink tile  2nd line, 3rd item
       this.Pink_tile_shadow_6_1 = new eventListenerClass(res.Pink_tile_shadow, this); 
       this.Pink_tile_shadow_6_1.attr({
          x : self.size.width*70/100,
          y : self.size.height*65/100,
       });
       this.Pink_tile_shadow_6_1.id = "Pink_tile_shadow_6_1";
       this.addChild(this.Pink_tile_shadow_6_1);
       
       this.Pink_tile_6_2 = new eventListenerClass(res.Pink_tile, this); 
       this.Pink_tile_6_2.attr({
          x : this.Pink_tile_shadow_6_1.x-10,
          y : this.Pink_tile_shadow_6_1.y+10,
       });
       this.Pink_tile_6_2.id = "Pink_tile_6_2";
       this.addChild(this.Pink_tile_6_2);
       
       this.Pink_tile_6_3 = new eventListenerClass(res.Pink_tile, this); 
       this.Pink_tile_6_3.attr({
          x : this.Pink_tile_6_2.x-8,
          y : this.Pink_tile_6_2.y+8,
          anchorX : 0.5,
          anchorY : 0.5
       });
       this.Pink_tile_6_3.id = "Pink_tile_6_3";
       this.addChild(this.Pink_tile_6_3);
       this.Pink_tile_6_3.flag = 0;
       
       self.item_6.push(this.Pink_tile_shadow_6_1);
       self.item_6.push(this.Pink_tile_6_2);
       self.item_6.push(this.Pink_tile_6_3);
       
        // Red tile  3rd line, 1st item
       this.Red_tile_shadow_7_1 = new eventListenerClass(res.Red_tile_shadow, this); 
       this.Red_tile_shadow_7_1.attr({
          x : self.size.width*30/100,
          y : self.size.height*55/100,
       });
       this.Red_tile_shadow_7_1.id = "Red_tile_shadow_7_1";
       this.addChild(this.Red_tile_shadow_7_1);

       this.Red_tile_7_2 = new eventListenerClass(res.Red_tile, this); 
       this.Red_tile_7_2.attr({
          x : this.Red_tile_shadow_7_1.x-8,
          y : this.Red_tile_shadow_7_1.y+8,
          anchorX : 0.5,
          anchorY : 0.5
       });
       this.Red_tile_7_2.id = "Red_tile_7_2";
       this.addChild(this.Red_tile_7_2);
       this.Red_tile_7_2.flag = 0;
              
       self.item_7.push(this.Red_tile_shadow_7_1);
       self.item_7.push(this.Red_tile_7_2);
       
       // Cyan tile 3rd line, 2nd item
       this.Cyan_tile_shadow_8_1 = new eventListenerClass(res.Cyan_tile_shadow, this); 
       this.Cyan_tile_shadow_8_1.attr({
          x : self.size.width*50/100,
          y : self.size.height*55/100,
       });
       this.Cyan_tile_shadow_8_1.id = "Cyan_tile_shadow_8_1";
       this.addChild(this.Cyan_tile_shadow_8_1);
       
       this.Cyan_tile_8_2 = new eventListenerClass(res.Cyan_tile, this); 
       this.Cyan_tile_8_2.attr({
          x : this.Cyan_tile_shadow_8_1.x-10,
          y : this.Cyan_tile_shadow_8_1.y+10,
       });
       this.Cyan_tile_8_2.id = "Cyan_tile_8_2";
       this.addChild(this.Cyan_tile_8_2);
       this.Cyan_tile_8_2.flag = 0;

       self.item_8.push(this.Cyan_tile_shadow_8_1);
       self.item_8.push(this.Cyan_tile_8_2);

        // Orange tile  3rd line, 3rd item
       this.Orange_tile_shadow_9_1 = new eventListenerClass(res.Orange_tile_shadow, this); 
       this.Orange_tile_shadow_9_1.attr({
          x : self.size.width*70/100,
          y : self.size.height*55/100,
       });
       this.Orange_tile_shadow_9_1.id = "Orange_tile_shadow_9_1";
       this.addChild(this.Orange_tile_shadow_9_1);
       
       this.Orange_tile_9_2 = new eventListenerClass(res.Orange_tile, this); 
       this.Orange_tile_9_2.attr({
          x : this.Orange_tile_shadow_9_1.x-10,
          y : this.Orange_tile_shadow_9_1.y+10,
       });
       this.Orange_tile_9_2.id = "Orange_tile_9_2";
       this.addChild(this.Orange_tile_9_2);
       
       this.Orange_tile_9_3 = new eventListenerClass(res.Orange_tile, this); 
       this.Orange_tile_9_3.attr({
          x : this.Orange_tile_9_2.x-8,
          y : this.Orange_tile_9_2.y+8,
          anchorX : 0.5,
          anchorY : 0.5
       });
       this.Orange_tile_9_3.id = "Orange_tile_9_3";
       this.addChild(this.Orange_tile_9_3);
       this.Orange_tile_9_3.flag = 0;
       
       self.item_9.push(this.Orange_tile_shadow_9_1);
       self.item_9.push(this.Orange_tile_9_2);
       self.item_9.push(this.Orange_tile_9_3);

       // Hint_Button
       this.Hint_Button = new eventListenerClass(res.Hint_Button, this);
       this.Hint_Button.attr({
          x : self.size.width*10/100,
          y : self.size.height*24.5/100,
          anchorX : .5,
          anchorY : .5 
       });
       this.addChild(this.Hint_Button);
       this.Hint_Button.id = "Hint_Button";
       
       // Lower_Bar
       this.Lower_Bar = new eventListenerClass(res.Lower_Bar, this);
       this.Lower_Bar.attr({
          x : self.size.width*40/100,
          y : self.size.height*5/100,
          anchorX : .5,
          anchorY : .5 
       });
       this.addChild(this.Lower_Bar);

       // correct button
       this.Correct_Button = new eventListenerClass(res.Correct_Button, this);
       this.Correct_Button.attr({
          x : self.size.width*85/100,
          y : self.size.height*5/100,
          anchorX : .5,
          anchorY : .5 
       });
       this.addChild(this.Correct_Button);
       this.Correct_Button.id = "Correct_Button_Level_1_4";
              
       // wrong button
       this.Wrong_Button = new eventListenerClass(res.Wrong_Button, this);
       this.Wrong_Button.attr({
          x : self.size.width*95/100,
          y : self.size.height*5/100,
          anchorX : .5,
          anchorY : .5 
       });
       this.addChild(this.Wrong_Button); 
       this.Wrong_Button.id = "Wrong_Button";
       
       // will display the pressed letter
        self.text = new cc.LabelTTF("","Century Gothic","150");
        self.text.attr({
           x : self.size.width*35/100,
           y : self.size.height*6/100,
//           anchorX : .5,
           anchorY : .5
        });
        this.addChild(self.text);
        self.text.setColor(cc.color("#000000"));
       
       // display valid or invalid word
       self.sorryText = new cc.LabelTTF("", "Century Gothic", "150");
       self.sorryText.attr({
          x : self.size.width*17/100,
          y : self.size.height*13/100,
          anchorX : .5,
          anchorY : .5 
       });
       this.addChild(self.sorryText);
       self.sorryText.setColor(cc.color("#368e3c"));
       
       
       // self.score display       
       self.score_text = new cc.LabelTTF("0", "Century Ghotic", "150");
       self.score_text.attr({
          x : self.size.width*90/100,
          y : self.size.height*95/100,
          anchorX : .5,
          anchorY : .5 
       });
       this.addChild(self.score_text);
       self.score_text.setColor(cc.color("#000000"));
       
       // hint text and self.score when make word
       self.hint_text_n_score_plus = new cc.LabelTTF("", "Century Ghotic", "150");
       self.hint_text_n_score_plus.attr({
          x : self.size.width*70/100,
          y : self.size.height*25/100,
          anchorX : .5,
          anchorY : .5 
       });
       this.addChild(self.hint_text_n_score_plus);
       self.hint_text_n_score_plus.setColor(cc.color("#000000"));
       
       Level_1_mainFunction(self);

        var wid = self.size.width;
        var hei = self.size.height;

        self.position = [{x:wid*29/100, y:hei*75.5/100}, {x:wid*49/100, y:hei*75/100}, {x:wid*69/100, y:hei*75/100},
                    {x:wid*29.5/100, y:hei*65/100}, {x:wid*48/100, y:hei*66/100}, {x:wid*69/100, y:hei*65.5/100},
                    {x:wid*29.5/100, y:hei*55/100}, {x:wid*49/100, y:hei*55.5/100}, {x:wid*68.5/100, y:hei*55.5/100},];

       self.chars_id = 0;
       for(var i=0; i<self.chars.length; i++)
       {
			var v = 'letter'+i;
            var s = self.chars[i];
            var res2 = "buttons/"+self.chars[i].toUpperCase()+".png";
            v = new eventListenerClass(res2, this);
            v.attr({
               x :  self.position[i].x,
               y : self.position[i].y,
               anchorX : .5,
               anchorY : .5
            });
            this.addChild(v);
            v.id = 'letter'+i;
            v.flag = 0;
            self.chars_id++;
            self.clickLetter.push(v);
//            cc.eventManager.addListener(level1_sprite_click.clone(), v);
       }
       
            // self.score_board after game finish
            this.score_board = new eventListenerClass(res.Score_board, this);
            this.score_board.attr({
                x : self.size.width*50/100,
                y : self.size.height*65/100,
                anchorX : .5,
                anchorY : .5
            });
            this.addChild(this.score_board, 5);
            this.score_board.setVisible(false);


            // ok button to go on next level
            this.Ok_button = new eventListenerClass(res.Ok_button, this);
            this.Ok_button.attr({
                x : self.size.width*50/100,
                y : self.size.height*52/100,
                anchorX : .5,
                anchorY : .5
            });
            this.addChild(this.Ok_button, 5);
            this.Ok_button.id = "Ok_button_Level_1";
            this.Ok_button.flag = 0;
            this.Ok_button.setVisible(false);

            // self.score on self.score_board
            self.score_board_score = new cc.LabelTTF("", "Century Ghotic", "150");
            self.score_board_score.attr({
                x : self.size.width*70/100,
                y : self.size.height*62/100,
                anchorX : .5,
                anchorY : .5 
            });
            self.addChild(self.score_board_score, 5);
            self.score_board_score.setColor(cc.color("#ffffff"));
            self.score_board_score.setVisible(false);

/*
    // click event listener
    cc.eventManager.addListener(level1_sprite_click.clone(), this.Orange_tile_shadow_1_1);
    cc.eventManager.addListener(level1_sprite_click.clone(), this.Orange_tile_1_2);
    cc.eventManager.addListener(level1_sprite_click.clone(), this.Orange_tile_1_3);

    cc.eventManager.addListener(level1_sprite_click.clone(), this.Red_tile_shadow_2_1);
    cc.eventManager.addListener(level1_sprite_click.clone(), this.Red_tile_2_2);

    cc.eventManager.addListener(level1_sprite_click.clone(), this.Cyan_tile_shadow_3_1);
    cc.eventManager.addListener(level1_sprite_click.clone(), this.Cyan_tile_3_2);
    cc.eventManager.addListener(level1_sprite_click.clone(), this.Cyan_tile_3_3);

    cc.eventManager.addListener(level1_sprite_click.clone(), this.Pink_tile_shadow_4_1);

    cc.eventManager.addListener(level1_sprite_click.clone(), this.Green_tile_shadow_5_1);
    cc.eventManager.addListener(level1_sprite_click.clone(), this.Green_tile_5_2);
    cc.eventManager.addListener(level1_sprite_click.clone(), this.Green_tile_5_3);
    cc.eventManager.addListener(level1_sprite_click.clone(), this.Green_tile_5_4);
    cc.eventManager.addListener(level1_sprite_click.clone(), this.Green_tile_5_5);

    cc.eventManager.addListener(level1_sprite_click.clone(), this.Pink_tile_shadow_6_1);
    cc.eventManager.addListener(level1_sprite_click.clone(), this.Pink_tile_6_2);
    cc.eventManager.addListener(level1_sprite_click.clone(), this.Pink_tile_6_3);

    cc.eventManager.addListener(level1_sprite_click.clone(), this.Red_tile_shadow_7_1);
    cc.eventManager.addListener(level1_sprite_click.clone(), this.Red_tile_7_2);

    cc.eventManager.addListener(level1_sprite_click.clone(), this.Cyan_tile_shadow_8_1);
    cc.eventManager.addListener(level1_sprite_click.clone(), this.Cyan_tile_8_2);

    cc.eventManager.addListener(level1_sprite_click.clone(), this.Orange_tile_shadow_9_1);
    cc.eventManager.addListener(level1_sprite_click.clone(), this.Orange_tile_9_2);
    cc.eventManager.addListener(level1_sprite_click.clone(), this.Orange_tile_9_3);
    
    cc.eventManager.addListener(level1_sprite_click.clone(), this.Hint_Button);
    cc.eventManager.addListener(level1_sprite_click.clone(), this.Correct_Button);
    cc.eventManager.addListener(level1_sprite_click.clone(), this.Wrong_Button);
    cc.eventManager.addListener(level1_sprite_click.clone(), this.Home);    
    cc.eventManager.addListener(level1_sprite_click.clone(), Ok_button);    
 */   } 
});

/*
var level1_sprite_click = cc.EventListener.create({event: cc.EventListener.TOUCH_ONE_BY_ONE, swallowTouches: true,
  onTouchBegan: function (touch, event) {
      
    var target = event.getCurrentTarget();
    var location = target.convertToNodeSpace(touch.getLocation());
    var targetsize = target.getContentwindow.size();
    var targetRectangle = cc.rect(0, 0, targetwindow.size.width, targetwindow.size.height);
    
     if (cc.rectContainsPoint(targetRectangle, location))
      {
          if(window.item_1.length>=1 && target.id==window.item_1[window.item_1.length-1].id)
          {
              if(window.item_1[window.item_1.length-1].flag==0)
              {
                window.item_1[window.item_1.length-1].x = window.item_1[window.item_1.length-1].x-8;
                window.item_1[window.item_1.length-1].y = window.item_1[window.item_1.length-1].y+8;
                window.item_1[window.item_1.length-1].flag = 1;
                window.storeLetter.push(window.item_1);
                
                window.letterArray.push(window.chars[0]);
                window.clickLetter[0].x = window.clickLetter[0].x-8;
                window.clickLetter[0].y = window.clickLetter[0].y+8;
                
                window.text.setString(window.letterArray.join(""));
                var ch = checkWord(window.letterArray);
                if(ch==1)
                {
                    window.text.setColor(cc.color("#368e3c"));
                }
                else
                    window.text.setColor(cc.color("#000000")); 
                    
                window.sorryText.setString("");
              }
          }
          else if(window.item_2.length>=1 && target.id==window.item_2[window.item_2.length-1].id)
          {
              if(window.item_2[window.item_2.length-1].flag==0)
              {
                window.item_2[window.item_2.length-1].x = window.item_2[window.item_2.length-1].x-8;
                window.item_2[window.item_2.length-1].y = window.item_2[window.item_2.length-1].y+8;
                window.item_2[window.item_2.length-1].flag = 1;
                window.storeLetter.push(window.item_2);
                
                window.letterArray.push(window.chars[1]);
                window.clickLetter[1].x = window.clickLetter[1].x-8;
                window.clickLetter[1].y = window.clickLetter[1].y+8;
                
                window.text.setString(window.letterArray.join(""));
                var ch = checkWord(window.letterArray);
                if(ch==1)
                {
                    window.text.setColor(cc.color("#368e3c"));
                }
                else
                    window.text.setColor(cc.color("#000000")); 
                    
                window.sorryText.setString("");
              }
          }
          else if(window.item_3.length>=1 && target.id==window.item_3[window.item_3.length-1].id)
          {
              if(window.item_3[window.item_3.length-1].flag==0)
              {
                window.item_3[window.item_3.length-1].x = window.item_3[window.item_3.length-1].x-8;
                window.item_3[window.item_3.length-1].y = window.item_3[window.item_3.length-1].y+8;
                window.item_3[window.item_3.length-1].flag = 1;
                window.storeLetter.push(window.item_3);
                
                window.letterArray.push(window.chars[2]);
                window.clickLetter[2].x = window.clickLetter[2].x-8;
                window.clickLetter[2].y = window.clickLetter[2].y+8;
                
                window.text.setString(window.letterArray.join(""));
                var ch = checkWord(window.letterArray);
                if(ch==1)
                {
                    window.text.setColor(cc.color("#368e3c"));
                }
                else
                    window.text.setColor(cc.color("#000000")); 

                window.sorryText.setString("");
            }
          }
          else if(window.item_4.length>=1 && target.id==window.item_4[window.item_4.length-1].id)
          {
              if(window.item_4[window.item_4.length-1].flag==0)
              {
                window.item_4[window.item_4.length-1].x = window.item_4[window.item_4.length-1].x-8;
                window.item_4[window.item_4.length-1].y = window.item_4[window.item_4.length-1].y+8;
                window.item_4[window.item_4.length-1].flag = 1;
                window.storeLetter.push(window.item_4);
                
                window.letterArray.push(window.chars[3]);
                window.clickLetter[3].x = window.clickLetter[3].x-8;
                window.clickLetter[3].y = window.clickLetter[3].y+8;
                
                window.text.setString(window.letterArray.join(""));
                var ch = checkWord(window.letterArray);
                if(ch==1)
                {
                    window.text.setColor(cc.color("#368e3c"));
                }
                else
                    window.text.setColor(cc.color("#000000")); 
                    
                window.sorryText.setString("");
              }
          }
          else if(window.item_5.length>=1 && target.id==window.item_5[window.item_5.length-1].id)
          {
              if(window.item_5[window.item_5.length-1].flag==0)
              {
                window.item_5[window.item_5.length-1].x = window.item_5[window.item_5.length-1].x-8;
                window.item_5[window.item_5.length-1].y = window.item_5[window.item_5.length-1].y+8;
                window.item_5[window.item_5.length-1].flag = 1;
                window.storeLetter.push(window.item_5);
                
                window.letterArray.push(window.chars[4]);
                window.clickLetter[4].x = window.clickLetter[4].x-8;
                window.clickLetter[4].y = window.clickLetter[4].y+8;
                
                window.text.setString(window.letterArray.join(""));
                var ch = checkWord(window.letterArray);
                if(ch==1)
                {
                    window.text.setColor(cc.color("#368e3c"));
                }
                else
                    window.text.setColor(cc.color("#000000")); 
                    
                window.sorryText.setString("");
              }
          }
          else if(window.item_6.length>=1 && target.id==window.item_6[window.item_6.length-1].id)
          {
              if(window.item_6[window.item_6.length-1].flag==0)
              {
                window.item_6[window.item_6.length-1].x = window.item_6[window.item_6.length-1].x-8;
                window.item_6[window.item_6.length-1].y = window.item_6[window.item_6.length-1].y+8;
                window.item_6[window.item_6.length-1].flag = 1;
                window.storeLetter.push(window.item_6);
                
                window.letterArray.push(window.chars[5]);
                window.clickLetter[5].x = window.clickLetter[5].x-8;
                window.clickLetter[5].y = window.clickLetter[5].y+8;
                
                window.text.setString(window.letterArray.join(""));
                var ch = checkWord(window.letterArray);
                if(ch==1)
                {
                    window.text.setColor(cc.color("#368e3c"));
                }
                else
                    window.text.setColor(cc.color("#000000")); 
                    
                window.sorryText.setString("");
              }
          }
          else if(window.item_7.length>=1 && target.id==window.item_7[window.item_7.length-1].id)
          {
              if(window.item_7[window.item_7.length-1].flag==0)
              {
                window.item_7[window.item_7.length-1].x = window.item_7[window.item_7.length-1].x-8;
                window.item_7[window.item_7.length-1].y = window.item_7[window.item_7.length-1].y+8;
                window.item_7[window.item_7.length-1].flag = 1;
                window.storeLetter.push(window.item_7);
                
                window.letterArray.push(window.chars[6]);
                window.clickLetter[6].x = window.clickLetter[6].x-8;
                window.clickLetter[6].y = window.clickLetter[6].y+8;
                
                window.text.setString(window.letterArray.join(""));
                var ch = checkWord(window.letterArray);
                if(ch==1)
                {
                    window.text.setColor(cc.color("#368e3c"));
                }
                else
                    window.text.setColor(cc.color("#000000")); 
                    
                window.sorryText.setString("");
              }
          }
          else if(window.item_8.length>=1 && target.id==window.item_8[window.item_8.length-1].id)
          {
              if(window.item_8[window.item_8.length-1].flag==0)
              {
                window.item_8[window.item_8.length-1].x = window.item_8[window.item_8.length-1].x-8;
                window.item_8[window.item_8.length-1].y = window.item_8[window.item_8.length-1].y+8;
                window.item_8[window.item_8.length-1].flag = 1;
                window.storeLetter.push(window.item_8);
                
                window.letterArray.push(window.chars[7]);
                window.clickLetter[7].x = window.clickLetter[7].x-8;
                window.clickLetter[7].y = window.clickLetter[7].y+8;
                
                window.text.setString(window.letterArray.join(""));
                var ch = checkWord(window.letterArray);
                if(ch==1)
                {
                    window.text.setColor(cc.color("#368e3c"));
                }
                else
                    window.text.setColor(cc.color("#000000")); 
                    
                window.sorryText.setString("");
              }
          }
          else if(window.item_9.length>=1 && target.id==window.item_9[window.item_9.length-1].id)
          {
              if(window.item_9[window.item_9.length-1].flag==0)
              {
                window.item_9[window.item_9.length-1].x = window.item_9[window.item_9.length-1].x-8;
                window.item_9[window.item_9.length-1].y = window.item_9[window.item_9.length-1].y+8;
                window.item_9[window.item_9.length-1].flag = 1;
                window.storeLetter.push(window.item_9);
                
                window.letterArray.push(window.chars[8]);
                window.clickLetter[8].x = window.clickLetter[8].x-8;
                window.clickLetter[8].y = window.clickLetter[8].y+8;
                
                window.text.setString(window.letterArray.join(""));
                var ch = checkWord(window.letterArray);
                if(ch==1)
                {
                    window.text.setColor(cc.color("#368e3c"));
                }
                else
                    window.text.setColor(cc.color("#000000"));
                    
                window.sorryText.setString("");
              }
          }
          else if(target.id=="Correct_Button_Level_1_4)
          {
              console.log('correct');
              var ch = checkWord(window.letterArray);
              
			if(ch==0 || window.letterArray.length<=1)
			{
//				sorryText.text = 'Invalid';
				console.log('no');
                window.sorryText.setString("Invalid");
			}
            else
            {
                window.sorryText.setString("Correct");
                window.text.setString("");
				var lenvowel = 0, lencon = 0;
				for(var i=0; i<window.letterArray.length; i++)
				{
					var ind = window.chars.indexOf(window.letterArray[i]);

                    var val = window.storeLetter[i];
					if(window.letterArray[i]=='a' || window.letterArray[i]=='e' || window.letterArray[i]=='i' || window.letterArray[i]=='o' || window.letterArray[i]=='u')
					{
						lenvowel++;
					}
					else
					{
						lencon++;
					}	
                    
                    window.clickLetter[ind].runAction(cc.MoveTo.create(.2, cc.p(window.size.width*90/100, window.size.height*95/100)));
                    val[val.length-1].runAction(cc.MoveTo.create(.2, cc.p(window.size.width*90/100, window.size.height*95/100)));
				}
                
                var sc = parseInt(window.score_text.getString());
                window.hint_text_n_score_plus.setVisible(true);
                if(window.letterArray.length==2)
                    {
                        window.score_text.setString(sc + 20);
                        window.hint_text_n_score_plus.setString('+20');
                    }                    
                else if(window.letterArray.length==3)
                    {
                        window.hint_text_n_score_plus.setString('+40');
                        window.score_text.setString(sc + 40);
                    }
                else if(window.letterArray.length==4)
                {
                        window.hint_text_n_score_plus.setString('+60');
                        window.score_text.setString(sc + 60);
                }                    
                else if(window.letterArray.length==5)
                {
                        hint_text_n_window.score_plus.setString('+70');
                        window.score_text.setString(sc + 70);
                }
                else if(window.letterArray.length==6)
                {
                        window.hint_text_n_score_plus.setString('+90');
                        window.score_text.setString(sc + 90);
                }
                else if(window.letterArray.length==7)
                {
                        window.hint_text_n_score_plus.setString('+100');
                        window.score_text.setString(sc + 100);
                }
                else if(window.letterArray.length==8)
                {
                        window.hint_text_n_score_plus.setString('+120');
                        window.score_text.setString(sc + 120);
                }
                
                setTimeout(function(){
                    window.hint_text_n_score_plus.setVisible(false);
                    for(var i=0; i<window.letterArray.length; i++)
                    {
                        var ind = window.chars.indexOf(window.letterArray[i]);
                        var val = window.storeLetter[i];
                        window.self.removeChild(val[val.length-1]);
                        window.self.removeChild(window.clickLetter[ind]);
                        val.pop();
                        if(val.length>0)
                        {
                            val[val.length-1].flag = 0;
                        }
                    }
                    window.sorryText.setString("");
                    window.hint_flag = 0;
                    Level_1_mainFunction();
                },300);
            }
          }
          else if(target.id=="Wrong_Button")
          {
              if(window.storeLetter.length>0)
              {
                    var item = window.storeLetter[window.storeLetter.length-1];
                    item[item.length-1].x = item[item.length-1].x + 8;
                    item[item.length-1].y = item[item.length-1].y - 8;
                    item[item.length-1].flag = 0;
                    window.storeLetter.pop();
                    
                    var letter = window.letterArray[window.letterArray.length-1];
                    window.clickLetter[window.chars.indexOf(letter)].x = window.clickLetter[window.chars.indexOf(letter)].x+8;
                    window.clickLetter[window.chars.indexOf(letter)].y = window.clickLetter[window.chars.indexOf(letter)].y-8;
                    window.letterArray.pop();
                    
                    window.text.setString(window.letterArray.join(""));
                    var ch = checkWord(window.letterArray);
                    if(ch==1)
                    {
                        window.text.setColor(cc.color("#368e3c"));
                    }
                    else
                        window.text.setColor(cc.color("#000000")); 
                        
                window.sorryText.setString("");
              }
          }
          else if(target.id=="Hint_Button")
          {// first time hint button is clicked
              if(window.hint_flag==0)
              {
                  var sc = parseInt(window.score_text.getString());
                  if(sc>=10)
                  {
                      var res = 5;
                      res = two(window.chars.join(""), 5);
                      
                      if(res==5)
                      {
                          res = three(window.chars.join(""), 5);
                      }
                        
                      if(res==5)
                      {
                          res = four(window.chars.join(""), 5);
                      }
                        
                      if(res==5)
                      {
                          res = five(window.chars.join(""), 5);
                      }
                        
                      if(res==5)
                      {
                          res = six(window.chars.join(""), 5);
                      }
                      
                      if(res!=5)
                      {
                          hint_text_n_score_plus.setVisible(true);
                          hint_text_n_score_plus.setString(res);
                          window.hint_flag = 1;
                          window.hint_text = res;
                          window.score_text.setString(sc-10);
                          setTimeout(function(){
                              window.hint_text_n_score_plus.setVisible(false);
                          },500);
                      }
                  }                  
              }
              else
              {
                    window.hint_text_n_score_plus.setVisible(true);
                    window.hint_text_n_score_plus.setString(window.hint_text);
                    setTimeout(function(){
                        window.hint_text_n_score_plus.setVisible(false);
                    },500);
              }
          }
          else if(target.id=="Home")
          {
            cc.director.runScene(new LevelStateScene());
          }
          else if(target.id=="Ok_button")
          {
            if(target.flag==1)
                cc.director.runScene(new Level_2_Scene());
          }
      }
  }
});
*/
var Level_1_Scene = cc.Scene.extend({
    onEnter : function(){
    this._super();
    var layer = new Level_1_Layer();
    this.addChild(layer);
    }
});


function Level_1_mainFunction(baseObject)
{
    var baseObject_inLocal = baseObject;
    baseObject_inLocal.vowelArray = [];
    baseObject_inLocal.consonantArray = [];
    
    if(baseObject_inLocal.chars.length<1)
    {
        baseObject_inLocal.chars = Level_1_random_char(baseObject_inLocal.vowelArray, baseObject_inLocal.consonantArray, baseObject_inLocal);
    }
    else
    {
        for(var j = 0; j<baseObject_inLocal.chars.length; j++)
        {
            if(baseObject_inLocal.chars[j]=='a' || baseObject_inLocal.chars[j]=='e' || baseObject_inLocal.chars[j]=='i' || baseObject_inLocal.chars[j]=='o' || baseObject_inLocal.chars[j]=='u')
            {
                baseObject_inLocal.vowelArray.push(baseObject_inLocal.chars[j]);
            }
            else
            {
                baseObject_inLocal.consonantArray.push(baseObject_inLocal.chars[j]);
            }
        }

        var tempchar = Level_1_random_char(baseObject_inLocal.vowelArray, baseObject_inLocal.consonantArray, baseObject_inLocal);
        var newChar = new Array();
        newChar = baseObject_inLocal.chars.slice();

        for(var i = 0; i<tempchar.length; i++)
        {
            var ch = baseObject_inLocal.chars.join("");
            var ind = baseObject_inLocal.chars.indexOf(baseObject_inLocal.letterArray[i]);
            
            var id = baseObject_inLocal.clickLetter[ind].id;
            newChar[ind] = tempchar[i];
            var len = baseObject_inLocal.storeLetter[i].length;
            console.log('len = '+len);
            if(len>0)
            {
            var v = newChar[ind];
            console.log(v);
            baseObject_inLocal.position[ind].x = baseObject_inLocal.position[ind].x+7;
            baseObject_inLocal.position[ind].y = baseObject_inLocal.position[ind].y-7;
            v = new eventListenerClass("buttons/"+v.toUpperCase()+".png", baseObject_inLocal);
            v.attr({
                  x : baseObject_inLocal.position[ind].x,
                  y : baseObject_inLocal.position[ind].y,
                  anchorX : .5,
                  anchorY : .5  
            });
            v.id = id;
            v.flag = 0;
            baseObject_inLocal.addChild(v);
//            cc.eventManager.addListener(sprite_click.clone(), v);
            baseObject_inLocal.clickLetter[ind] = v;
            }
        }
        baseObject_inLocal.chars = newChar.slice();
    }

    baseObject_inLocal.letterArray = [];
    baseObject_inLocal.storeLetter = [];
    
    if(baseObject_inLocal.item_1.length==0)
        baseObject_inLocal.chars[0] = '0';
        
    if(baseObject_inLocal.item_2.length==0)
        baseObject_inLocal.chars[1] = '0';
        
    if(baseObject_inLocal.item_3.length==0)
        baseObject_inLocal.chars[2] = '0';
        
    if(baseObject_inLocal.item_4.length==0)
        baseObject_inLocal.chars[3] = '0';
        
    if(baseObject_inLocal.item_5.length==0)
        baseObject_inLocal.chars[4] = '0';
        
    if(baseObject_inLocal.item_6.length==0)
        baseObject_inLocal.chars[5] = '0';
        
    if(baseObject_inLocal.item_7.length==0)
        baseObject_inLocal.chars[6] = '0';
        
    if(baseObject_inLocal.item_8.length==0)
        baseObject_inLocal.chars[7] = '0';
        
    if(baseObject_inLocal.item_9.length==0)
        baseObject_inLocal.chars[8] = '0';
    
    
    console.log('baseObject_inLocal.chars = '+baseObject_inLocal.chars);
    
    var newArray = new Array();
    
    var count1=0;
    for(var vv = 0; vv<baseObject_inLocal.chars.length; vv++)
    {
        if(baseObject_inLocal.chars[vv]>='a' && baseObject_inLocal.chars[vv]<='z')
            count1++;
    }
    
        var result = 0;

        if(count1>=2) 
            result = two(baseObject_inLocal.chars.join(""), 1);
            
        if(result==0 && count1>=3)
        {
            result = three(baseObject_inLocal.chars.join(""), 1);
        }
        
        if(result==0 && count1>=4)
        {
            result = four(baseObject_inLocal.chars.join(""), 1);
        }

        if(result==0)
        {
            var remaining_tiles = baseObject_inLocal.item_1.length + baseObject_inLocal.item_2.length + baseObject_inLocal.item_3.length + baseObject_inLocal.item_4.length + baseObject_inLocal.item_5.length + baseObject_inLocal.item_6.length + baseObject_inLocal.item_7.length + baseObject_inLocal.item_8.length + baseObject_inLocal.item_9.length;
            baseObject_inLocal.score_text.setString(parseInt(baseObject_inLocal.score_text.getString())+remaining_tiles*10);
            baseObject_inLocal.score_board.setVisible(true);
            baseObject_inLocal.Ok_button.setVisible(true);
            baseObject_inLocal.Ok_button.flag = 1;
            baseObject_inLocal.score_board_score.setString(baseObject_inLocal.score_text.getString());
            baseObject_inLocal.score_board_score.setVisible(true);
         
            
            baseObject_inLocal.item_1 = [];
            baseObject_inLocal.item_2 = [];
            baseObject_inLocal.item_3 = [];
            baseObject_inLocal.item_4 = [];
            baseObject_inLocal.item_5 = [];
            baseObject_inLocal.item_6 = [];
            baseObject_inLocal.item_7 = [];
            baseObject_inLocal.item_8 = [];
            baseObject_inLocal.item_9 = [];
        }
        
}


function Level_1_random_char(v,c, baseObject_fromfunction)
{
    var baseObject_fromfunction_inLocal = baseObject_fromfunction;
    var vowellen = 0, consonantlen = 0;
    if(v.length==0 && c.length==0)
    {
        var selectvowel = new Array(); //['o','i','a','l','k','p','m','r','t'];
        var selconso = new Array();
        var vowel = ['a', 'e', 'i', 'o'];
        var consonant = ['c', 'd', 'f', 'g', 'h', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'w', 'y'];
//				var consonant = ['c', 'd', 'h', 'l', 'm', 'n', 'r', 's', 't', 'w'];

        for(var i=0; i<3; i++)
        {
            var vowel1 = vowel[Math.floor(Math.random() * vowel.length)];
            var j = vowel.indexOf(vowel1);
            if(j!=-1)
            {
                vowel.splice(j, 1);
            }
            selectvowel.push(vowel1);
        }
    
    
        for(var i=0; i<6; i++)
        {
            var consonant1 = consonant[Math.floor(Math.random() * consonant.length)];
            var j = consonant.indexOf(consonant1);
            if(j!=-1)
            {
                consonant.splice(j, 1);
            }
            selectvowel.push(consonant1);
        }
    }
    else
    {
        Array.prototype.difference = function(e) {
            return this.filter(function(i) {return e.indexOf(i) < 0;});
        };

        var selectvowel = new Array();//['a','i','e','c','h','p','y','g','s'];
        var selconso = new Array();
        var vowel = ['a', 'e', 'i', 'o'];
        var consonant = ['c', 'd', 'f', 'g', 'h', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'w', 'y'];
//				var consonant = ['c', 'd', 'h', 'l', 'm', 'n', 'r', 's', 't', 'w'];


//					count total vowel and consonant in baseObject_fromfunction_inLocal.letterArray array;					
        for(var j=0; j<baseObject_fromfunction_inLocal.chars.length; j++)
        {
            var vowelflag = 0, consflag = 0;
            
            if(baseObject_fromfunction_inLocal.chars[j]=='a' || baseObject_fromfunction_inLocal.chars[j]=='e' || baseObject_fromfunction_inLocal.chars[j]=='i' || baseObject_fromfunction_inLocal.chars[j]=='o' || baseObject_fromfunction_inLocal.chars[j]=='u')
            {
                var lettervalue;
                for(var i=0; i<baseObject_fromfunction_inLocal.letterArray.length; i++)
                {
                    if(baseObject_fromfunction_inLocal.chars[j]==baseObject_fromfunction_inLocal.letterArray[i])
                    {
                        lettervalue = baseObject_fromfunction_inLocal.letterArray[i];
                        vowelflag++;
                        vowellen++;
                        break;
                    }
                }
                if(vowelflag==0)
                    vowel.splice(vowel.indexOf(baseObject_fromfunction_inLocal.chars[j]), 1);							
            }
            else
            {
                for(var i=0; i<baseObject_fromfunction_inLocal.letterArray.length; i++)
                {
                    if(baseObject_fromfunction_inLocal.chars[j]==baseObject_fromfunction_inLocal.letterArray[i])
                    {
                        lettervalue = baseObject_fromfunction_inLocal.letterArray[i];
                        consflag++;
                        consonantlen++;
                        break;
                    }
                }
                if(consflag==0)
                    consonant.splice(consonant.indexOf(baseObject_fromfunction_inLocal.chars[j]), 1);
            }
        }
        

        for(var i=0; i<vowellen; i++)
        {
            var vowel1 = vowel[Math.floor(Math.random() * vowel.length)];
            var j = vowel.indexOf(vowel1);
            if(j!=-1)
            {
                vowel.splice(j, 1);
            }
            selectvowel.push(vowel1);
        }
    
    
        for(var i=0; i<consonantlen; i++)
        {
            var consonant1 = consonant[Math.floor(Math.random() * consonant.length)];
            var j = consonant.indexOf(consonant1);
            if(j!=-1)
            {
                consonant.splice(j, 1);
            }
            selectvowel.push(consonant1);
        }
    }

    var finalArray = new Array();
    for(var k = 0; selectvowel.length>0; k++)
        {
            var con = selectvowel[Math.floor(Math.random() * selectvowel.length)];
            selectvowel.splice(selectvowel.indexOf(con), 1);
            finalArray.push(con); 
        }
    
    return finalArray;
}

