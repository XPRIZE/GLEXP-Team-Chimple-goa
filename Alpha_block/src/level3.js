/// <reference path="../../cocos2d-typescript-definitions/cocos2d/cocos2d-lib.d.ts" />

//var self.item_1, self.item_2, self.item_3, self.item_4, self.item_5, self.item_6, self.item_7, self.item_8, self.item_9, self.item_10, self.item_11, self.item_12, self.item_13, self.item_14, self.item_15, self.item_16, self.item_17, self.item_18, self.item_19, self.item_20, self.item_21, self.item_22, self.item_23, self.item_24, self.item_25;
//var self.storeLetter, size, self, text, hint_text_n_score_plus, score_text, self.hint_flag, hint_text, Score_board, Ok_button, score_board_score;
/*
var self.vowelArray = new Array();
var self.consonantArray = new Array();


var self.clickLetter = new Array();
var self.letterArray = new Array();
var self.letterIndex = new Array();

var self.chars=[];
var self.position = [];
*/

var Level_3_Layer = cc.Layer.extend({
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
score_text : null,

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

        cc.spriteFrameCache.addSpriteFrames(res1.bg4_plist);
        cc.spriteFrameCache.addSpriteFrames(res1.buttons_plist);
        
        // background sprite        
        this.Level_3_BG = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("bg/level3_bg.png"), this);
        this.Level_3_BG.attr({
           x : self.size.width/2,
           y : self.size.height/2,
           anchorX : .5,
           anchorY : .5 
        });
        this.addChild(this.Level_3_BG);
        
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
        
        // Green tile  1st line, 1st item
       this.Green_tile_shadow_1_1 = new eventListenerClass(res.Green_tile_shadow, this); 
       this.Green_tile_shadow_1_1.attr({
          x : self.size.width*20/100,
          y : self.size.height*85/100,
       });
       this.Green_tile_shadow_1_1.id = "Green_tile_shadow_1_1";
       this.addChild(this.Green_tile_shadow_1_1);
       
       this.Green_tile_1_2 = new eventListenerClass(res.Green_tile, this);
       this.Green_tile_1_2.attr({
          x : this.Green_tile_shadow_1_1.x-10,
          y : this.Green_tile_shadow_1_1.y+10,
       });
       this.Green_tile_1_2.id = "Green_tile_1_2";
       this.addChild(this.Green_tile_1_2);
       
       this.Green_tile_1_3 = new eventListenerClass(res.Green_tile, this); 
       this.Green_tile_1_3.attr({
          x : this.Green_tile_1_2.x-8,
          y : this.Green_tile_1_2.y+8,
          anchorX : 0.5,
          anchorY : 0.5
       });
       this.Green_tile_1_3.id = "Green_tile_1_3";
       this.addChild(this.Green_tile_1_3);
       this.Green_tile_1_3.flag = 0;
       
       self.item_1.push(this.Green_tile_shadow_1_1);
       self.item_1.push(this.Green_tile_1_2);
       self.item_1.push(this.Green_tile_1_3);

       // Red tile 1st line, 2nd item
       this.Red_tile_shadow_2_1 = new eventListenerClass(res.Red_tile_shadow, this); 
       this.Red_tile_shadow_2_1.attr({
          x : self.size.width*35/100,
          y : self.size.height*85/100,
       });
       this.Red_tile_shadow_2_1.id = "Red_tile_shadow_2_1";
       this.addChild(this.Red_tile_shadow_2_1);
       
       self.item_2.push(this.Red_tile_shadow_2_1);
       this.Red_tile_shadow_2_1.flag = 0;
       
        // Orange tile  1st line, 3rd item
       this.Orange_tile_shadow_3_1 = new eventListenerClass(res.Orange_tile_shadow, this); 
       this.Orange_tile_shadow_3_1.attr({
          x : self.size.width*50/100,
          y : self.size.height*85/100,
       });
       this.Orange_tile_shadow_3_1.id = "Orange_tile_shadow_3_1";
       this.addChild(this.Orange_tile_shadow_3_1);
       
       this.Orange_tile_3_2 = new eventListenerClass(res.Orange_tile, this); 
       this.Orange_tile_3_2.attr({
          x : this.Orange_tile_shadow_3_1.x-10,
          y : this.Orange_tile_shadow_3_1.y+10,
       });
       this.Orange_tile_3_2.id = "Orange_tile_3_2";
       this.addChild(this.Orange_tile_3_2);
       
       this.Orange_tile_3_3 = new eventListenerClass(res.Orange_tile, this); 
       this.Orange_tile_3_3.attr({
          x : this.Orange_tile_3_2.x-8,
          y : this.Orange_tile_3_2.y+8,
          anchorX : 0.5,
          anchorY : 0.5
       });
       this.Orange_tile_3_3.id = "Orange_tile_3_3";
       this.addChild(this.Orange_tile_3_3);
       
       this.Orange_tile_3_4 = new eventListenerClass(res.Orange_tile, this); 
       this.Orange_tile_3_4.attr({
          x : this.Orange_tile_3_3.x-8,
          y : this.Orange_tile_3_3.y+8,
          anchorX : 0.5,
          anchorY : 0.5
       });
       this.Orange_tile_3_4.id = "Orange_tile_3_4";
       this.addChild(this.Orange_tile_3_4);
       this.Orange_tile_3_4.flag = 0;
              
       self.item_3.push(this.Orange_tile_shadow_3_1);
       self.item_3.push(this.Orange_tile_3_2);
       self.item_3.push(this.Orange_tile_3_3);
       self.item_3.push(this.Orange_tile_3_4);
              
        // Blue tile  1st line, 4th item
       this.Blue_tile_shadow_4_1 = new eventListenerClass(res.Blue_tile_shadow, this); 
       this.Blue_tile_shadow_4_1.attr({
          x : self.size.width*65/100,
          y : self.size.height*85/100,
       });
       this.Blue_tile_shadow_4_1.id = "Blue_tile_shadow_4_1";
       this.addChild(this.Blue_tile_shadow_4_1);

       this.Blue_tile_4_2 = new eventListenerClass(res.Blue_tile, this); 
       this.Blue_tile_4_2.attr({
          x : this.Blue_tile_shadow_4_1.x-10,
          y : this.Blue_tile_shadow_4_1.y+10,
       });
       this.Blue_tile_4_2.id = "Blue_tile_4_2";
       this.addChild(this.Blue_tile_4_2);
       
       this.Blue_tile_4_3 = new eventListenerClass(res.Blue_tile, this); 
       this.Blue_tile_4_3.attr({
          x : this.Blue_tile_4_2.x-8,
          y : this.Blue_tile_4_2.y+8,
          anchorX : 0.5,
          anchorY : 0.5
       });
       this.Blue_tile_4_3.id = "Blue_tile_4_3";
       this.addChild(this.Blue_tile_4_3);
       
       this.Blue_tile_4_4 = new eventListenerClass(res.Blue_tile, this); 
       this.Blue_tile_4_4.attr({
          x : this.Blue_tile_4_3.x-8,
          y : this.Blue_tile_4_3.y+8,
          anchorX : 0.5,
          anchorY : 0.5
       });
       this.Blue_tile_4_4.id = "Blue_tile_4_4";
       this.addChild(this.Blue_tile_4_4);
       this.Blue_tile_4_4.flag = 0;
       
       self.item_4.push(this.Blue_tile_shadow_4_1);
       self.item_4.push(this.Blue_tile_4_2);
       self.item_4.push(this.Blue_tile_4_3);
       self.item_4.push(this.Blue_tile_4_4);

       // Green tile 1st line, 5th item
       this.Green_tile_shadow_5_1 = new eventListenerClass(res.Green_tile_shadow, this); 
       this.Green_tile_shadow_5_1.attr({
          x : self.size.width*80/100,
          y : self.size.height*85/100,
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
       
        // Blue tile  2nd line, 1st item
       this.Blue_tile_shadow_6_1 = new eventListenerClass(res.Blue_tile_shadow, this); 
       this.Blue_tile_shadow_6_1.attr({
          x : self.size.width*20/100,
          y : self.size.height*75/100,
       });
       this.Blue_tile_shadow_6_1.id = "Blue_tile_shadow_6_1";
       this.addChild(this.Blue_tile_shadow_6_1);
       
       this.Blue_tile_6_2 = new eventListenerClass(res.Blue_tile, this); 
       this.Blue_tile_6_2.attr({
          x : this.Blue_tile_shadow_6_1.x-10,
          y : this.Blue_tile_shadow_6_1.y+10,
       });
       this.Blue_tile_6_2.id = "Blue_tile_6_2";
       this.addChild(this.Blue_tile_6_2);
       
       this.Blue_tile_6_3 = new eventListenerClass(res.Blue_tile, this); 
       this.Blue_tile_6_3.attr({
          x : this.Blue_tile_6_2.x-8,
          y : this.Blue_tile_6_2.y+8,
          anchorX : 0.5,
          anchorY : 0.5
       });
       this.Blue_tile_6_3.id = "Blue_tile_6_3";
       this.addChild(this.Blue_tile_6_3);
       this.Blue_tile_6_3.flag = 0;
       
       self.item_6.push(this.Blue_tile_shadow_6_1);
       self.item_6.push(this.Blue_tile_6_2);
       self.item_6.push(this.Blue_tile_6_3);
       
        // Green tile  2nd line, 2nd item
       this.Green_tile_shadow_7_1 = new eventListenerClass(res.Green_tile_shadow, this); 
       this.Green_tile_shadow_7_1.attr({
          x : self.size.width*35/100,
          y : self.size.height*75/100,
       });
       this.Green_tile_shadow_7_1.id = "Green_tile_shadow_7_1";
       this.addChild(this.Green_tile_shadow_7_1);

       this.Green_tile_7_2 = new eventListenerClass(res.Green_tile, this); 
       this.Green_tile_7_2.attr({
          x : this.Green_tile_shadow_7_1.x-8,
          y : this.Green_tile_shadow_7_1.y+8,
          anchorX : 0.5,
          anchorY : 0.5
       });
       this.Green_tile_7_2.id = "Green_tile_7_2";
       this.addChild(this.Green_tile_7_2);
       this.Green_tile_7_2.flag = 0;
              
       self.item_7.push(this.Green_tile_shadow_7_1);
       self.item_7.push(this.Green_tile_7_2);
       
       // Cyan tile 2nd line, 3rd item
       this.Cyan_tile_shadow_8_1 = new eventListenerClass(res.Cyan_tile_shadow, this); 
       this.Cyan_tile_shadow_8_1.attr({
          x : self.size.width*50/100,
          y : self.size.height*75/100,
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

        // Red tile  2nd line, 4th item
       this.Red_tile_shadow_9_1 = new eventListenerClass(res.Red_tile_shadow, this); 
       this.Red_tile_shadow_9_1.attr({
          x : self.size.width*65/100,
          y : self.size.height*75/100,
       });
       this.Red_tile_shadow_9_1.id = "Red_tile_shadow_9_1";
       this.addChild(this.Red_tile_shadow_9_1);
       
       this.Red_tile_9_2 = new eventListenerClass(res.Red_tile, this); 
       this.Red_tile_9_2.attr({
          x : this.Red_tile_shadow_9_1.x-10,
          y : this.Red_tile_shadow_9_1.y+10,
       });
       this.Red_tile_9_2.id = "Red_tile_9_2";
       this.addChild(this.Red_tile_9_2);
       
       this.Red_tile_9_3 = new eventListenerClass(res.Red_tile, this); 
       this.Red_tile_9_3.attr({
          x : this.Red_tile_9_2.x-8,
          y : this.Red_tile_9_2.y+8,
          anchorX : 0.5,
          anchorY : 0.5
       });
       this.Red_tile_9_3.id = "Red_tile_9_3";
       this.addChild(this.Red_tile_9_3);
       this.Red_tile_9_3.flag = 0;
       
       self.item_9.push(this.Red_tile_shadow_9_1);
       self.item_9.push(this.Red_tile_9_2);
       self.item_9.push(this.Red_tile_9_3);


        // Orange tile  2nd line, 5th item
       this.Orange_tile_shadow_10_1 = new eventListenerClass(res.Orange_tile_shadow, this); 
       this.Orange_tile_shadow_10_1.attr({
          x : self.size.width*80/100,
          y : self.size.height*75/100,
       });
       this.Orange_tile_shadow_10_1.id = "Orange_tile_shadow_10_1";
       this.addChild(this.Orange_tile_shadow_10_1);
       
       this.Orange_tile_10_2 = new eventListenerClass(res.Orange_tile, this);
       this.Orange_tile_10_2.attr({
          x : this.Orange_tile_shadow_10_1.x-10,
          y : this.Orange_tile_shadow_10_1.y+10,
       });
       this.Orange_tile_10_2.id = "Orange_tile_10_2";
       this.addChild(this.Orange_tile_10_2);
       
       this.Orange_tile_10_3 = new eventListenerClass(res.Orange_tile, this); 
       this.Orange_tile_10_3.attr({
          x : this.Orange_tile_10_2.x-8,
          y : this.Orange_tile_10_2.y+8,
          anchorX : 0.5,
          anchorY : 0.5
       });
       this.Orange_tile_10_3.id = "Orange_tile_10_3";
       this.addChild(this.Orange_tile_10_3);
       this.Orange_tile_10_3.flag = 0;
       
       self.item_10.push(this.Orange_tile_shadow_10_1);
       self.item_10.push(this.Orange_tile_10_2);
       self.item_10.push(this.Orange_tile_10_3);

       // Green tile 3rd line, 1st item
       this.Green_tile_shadow_11_1 = new eventListenerClass(res.Green_tile_shadow, this); 
       this.Green_tile_shadow_11_1.attr({
          x : self.size.width*20/100,
          y : self.size.height*65/100,
       });
       this.Green_tile_shadow_11_1.id = "Green_tile_shadow_11_1";
       this.addChild(this.Green_tile_shadow_11_1);
       
       this.Green_tile_11_2 = new eventListenerClass(res.Green_tile, this); 
       this.Green_tile_11_2.attr({
          x : this.Green_tile_shadow_11_1.x-10,
          y : this.Green_tile_shadow_11_1.y+10,
       });
       this.Green_tile_11_2.id = "Green_tile_11_2";
       this.addChild(this.Green_tile_11_2);

       self.item_11.push(this.Green_tile_shadow_11_1);
       self.item_11.push(this.Green_tile_11_2);
       this.Green_tile_11_2.flag = 0;
       
        // Pink tile  3rd line, 2nd item
       this.Pink_tile_shadow_12_1 = new eventListenerClass(res.Pink_tile_shadow, this); 
       this.Pink_tile_shadow_12_1.attr({
          x : self.size.width*35/100,
          y : self.size.height*65/100,
       });
       this.Pink_tile_shadow_12_1.id = "Pink_tile_shadow_12_1";
       this.addChild(this.Pink_tile_shadow_12_1);
       
       this.Pink_tile_12_2 = new eventListenerClass(res.Pink_tile, this); 
       this.Pink_tile_12_2.attr({
          x : this.Pink_tile_shadow_12_1.x-10,
          y : this.Pink_tile_shadow_12_1.y+10,
       });
       this.Pink_tile_12_2.id = "Pink_tile_12_2";
       this.addChild(this.Pink_tile_12_2);
       
       this.Pink_tile_12_3 = new eventListenerClass(res.Pink_tile, this); 
       this.Pink_tile_12_3.attr({
          x : this.Pink_tile_12_2.x-8,
          y : this.Pink_tile_12_2.y+8,
          anchorX : 0.5,
          anchorY : 0.5
       });
       this.Pink_tile_12_3.id = "Pink_tile_12_3";
       this.addChild(this.Pink_tile_12_3);
       this.Pink_tile_12_3.flag = 0;
              
       self.item_12.push(this.Pink_tile_shadow_12_1);
       self.item_12.push(this.Pink_tile_12_2);
       self.item_12.push(this.Pink_tile_12_3);
       
        // Red tile  3rd line, 3rd item
       this.Red_tile_shadow_13_1 = new eventListenerClass(res.Red_tile_shadow, this); 
       this.Red_tile_shadow_13_1.attr({
          x : self.size.width*50/100,
          y : self.size.height*65/100,
       });
       this.Red_tile_shadow_13_1.id = "Red_tile_shadow_13_1";
       this.addChild(this.Red_tile_shadow_13_1);

       this.Red_tile_13_2 = new eventListenerClass(res.Red_tile, this); 
       this.Red_tile_13_2.attr({
          x : this.Red_tile_shadow_13_1.x-8,
          y : this.Red_tile_shadow_13_1.y+8,
          anchorX : 0.5,
          anchorY : 0.5
       });
       this.Red_tile_13_2.id = "Red_tile_13_2";
       this.addChild(this.Red_tile_13_2);
       this.Red_tile_13_2.flag = 0;
       
       self.item_13.push(this.Red_tile_shadow_13_1);
       self.item_13.push(this.Red_tile_13_2);
       
       // Green tile 3rd line, 4th item
       this.Green_tile_shadow_14_1 = new eventListenerClass(res.Green_tile_shadow, this); 
       this.Green_tile_shadow_14_1.attr({
          x : self.size.width*65/100,
          y : self.size.height*65/100,
       });
       this.Green_tile_shadow_14_1.id = "Green_tile_shadow_14_1";
       this.addChild(this.Green_tile_shadow_14_1);
       
       this.Green_tile_14_2 = new eventListenerClass(res.Green_tile, this);
       this.Green_tile_14_2.attr({
          x : this.Green_tile_shadow_14_1.x-10,
          y : this.Green_tile_shadow_14_1.y+10,
       });
       this.Green_tile_14_2.id = "Green_tile_14_2";
       this.addChild(this.Green_tile_14_2);
       
       this.Green_tile_14_3 = new eventListenerClass(res.Green_tile, this); 
       this.Green_tile_14_3.attr({
          x : this.Green_tile_14_2.x-8,
          y : this.Green_tile_14_2.y+8,
       });
       this.Green_tile_14_3.id = "Green_tile_14_3";
       this.addChild(this.Green_tile_14_3);
       
       this.Green_tile_14_4 = new eventListenerClass(res.Green_tile, this); 
       this.Green_tile_14_4.attr({
          x : this.Green_tile_14_3.x-8,
          y : this.Green_tile_14_3.y+8,
       });
       this.Green_tile_14_4.id = "Green_tile_14_4";
       this.addChild(this.Green_tile_14_4);
       
       this.Green_tile_14_5 = new eventListenerClass(res.Green_tile, this); 
       this.Green_tile_14_5.attr({
          x : this.Green_tile_14_4.x-8,
          y : this.Green_tile_14_4.y+8,
       });
       this.Green_tile_14_5.id = "Green_tile_14_5";
       this.addChild(this.Green_tile_14_5);
       this.Green_tile_14_5.flag = 0;
       
       self.item_14.push(this.Green_tile_shadow_14_1);
       self.item_14.push(this.Green_tile_14_2);
       self.item_14.push(this.Green_tile_14_3);
       self.item_14.push(this.Green_tile_14_4);
       self.item_14.push(this.Green_tile_14_5);
       
        // Blue tile  3rd line, 5th item
       this.Blue_tile_shadow_15_1 = new eventListenerClass(res.Blue_tile_shadow, this); 
       this.Blue_tile_shadow_15_1.attr({
          x : self.size.width*80/100,
          y : self.size.height*65/100,
       });
       this.Blue_tile_shadow_15_1.id = "Blue_tile_shadow_15_1";
       this.addChild(this.Blue_tile_shadow_15_1);
       
       this.Blue_tile_15_2 = new eventListenerClass(res.Blue_tile, this); 
       this.Blue_tile_15_2.attr({
          x : this.Blue_tile_shadow_15_1.x-10,
          y : this.Blue_tile_shadow_15_1.y+10,
       });
       this.Blue_tile_15_2.id = "Blue_tile_15_2";
       this.addChild(this.Blue_tile_15_2);
       
       this.Blue_tile_15_3 = new eventListenerClass(res.Blue_tile, this); 
       this.Blue_tile_15_3.attr({
          x : this.Blue_tile_15_2.x-8,
          y : this.Blue_tile_15_2.y+8,
          anchorX : 0.5,
          anchorY : 0.5
       });
       this.Blue_tile_15_3.id = "Blue_tile_15_3";
       this.addChild(this.Blue_tile_15_3);
       this.Blue_tile_15_3.flag = 0;
       
       self.item_15.push(this.Blue_tile_shadow_15_1);
       self.item_15.push(this.Blue_tile_15_2);
       self.item_15.push(this.Blue_tile_15_3);
       
        // Cyan tile  4th line, 1st item
       this.Cyan_tile_shadow_16_1 = new eventListenerClass(res.Cyan_tile_shadow, this); 
       this.Cyan_tile_shadow_16_1.attr({
          x : self.size.width*20/100,
          y : self.size.height*55/100,
       });
       this.Cyan_tile_shadow_16_1.id = "Cyan_tile_shadow_16_1";
       this.addChild(this.Cyan_tile_shadow_16_1);

       this.Cyan_tile_16_2 = new eventListenerClass(res.Cyan_tile, this); 
       this.Cyan_tile_16_2.attr({
          x : this.Cyan_tile_shadow_16_1.x-8,
          y : this.Cyan_tile_shadow_16_1.y+8,
          anchorX : 0.5,
          anchorY : 0.5
       });
       this.Cyan_tile_16_2.id = "Cyan_tile_16_2";
       this.addChild(this.Cyan_tile_16_2);
       this.Cyan_tile_16_2.flag = 0;
              
       self.item_16.push(this.Cyan_tile_shadow_16_1);
       self.item_16.push(this.Cyan_tile_16_2);


        // Orange tile  4th line, 2nd item
       this.Orange_tile_shadow_17_1 = new eventListenerClass(res.Orange_tile_shadow, this); 
       this.Orange_tile_shadow_17_1.attr({
          x : self.size.width*35/100,
          y : self.size.height*55/100,
       });
       this.Orange_tile_shadow_17_1.id = "Orange_tile_shadow_17_1";
       this.addChild(this.Orange_tile_shadow_17_1);

       this.Orange_tile_17_2 = new eventListenerClass(res.Orange_tile, this); 
       this.Orange_tile_17_2.attr({
          x : this.Orange_tile_shadow_17_1.x-8,
          y : this.Orange_tile_shadow_17_1.y+8,
          anchorX : 0.5,
          anchorY : 0.5
       });
       this.Orange_tile_17_2.id = "Orange_tile_17_2";
       this.addChild(this.Orange_tile_17_2);
       this.Orange_tile_17_2.flag = 0;
              
       self.item_17.push(this.Orange_tile_shadow_17_1);
       self.item_17.push(this.Orange_tile_17_2);
       
       // Blue tile 4th line, 3rd item
       this.Blue_tile_shadow_18_1 = new eventListenerClass(res.Blue_tile_shadow, this); 
       this.Blue_tile_shadow_18_1.attr({
          x : self.size.width*50/100,
          y : self.size.height*55/100,
       });
       this.Blue_tile_shadow_18_1.id = "Blue_tile_shadow_18_1";
       this.addChild(this.Blue_tile_shadow_18_1);
       
       this.Blue_tile_18_2 = new eventListenerClass(res.Blue_tile, this); 
       this.Blue_tile_18_2.attr({
          x : this.Blue_tile_shadow_18_1.x-10,
          y : this.Blue_tile_shadow_18_1.y+10,
       });
       this.Blue_tile_18_2.id = "Blue_tile_18_2";
       this.addChild(this.Blue_tile_18_2);
       this.Blue_tile_18_2.flag = 0;

       self.item_18.push(this.Blue_tile_shadow_18_1);
       self.item_18.push(this.Blue_tile_18_2);

        // Green tile  4th line, 4th item
       this.Green_tile_shadow_19_1 = new eventListenerClass(res.Green_tile_shadow, this); 
       this.Green_tile_shadow_19_1.attr({
          x : self.size.width*65/100,
          y : self.size.height*55/100,
       });
       this.Green_tile_shadow_19_1.id = "Green_tile_shadow_19_1";
       this.addChild(this.Green_tile_shadow_19_1);
       
       this.Green_tile_19_2 = new eventListenerClass(res.Green_tile, this); 
       this.Green_tile_19_2.attr({
          x : this.Green_tile_shadow_19_1.x-10,
          y : this.Green_tile_shadow_19_1.y+10,
       });
       this.Green_tile_19_2.id = "Green_tile_19_2";
       this.addChild(this.Green_tile_19_2);
       
       this.Green_tile_19_3 = new eventListenerClass(res.Green_tile, this); 
       this.Green_tile_19_3.attr({
          x : this.Green_tile_19_2.x-8,
          y : this.Green_tile_19_2.y+8,
          anchorX : 0.5,
          anchorY : 0.5
       });
       this.Green_tile_19_3.id = "Green_tile_19_3";
       this.addChild(this.Green_tile_19_3);
       this.Green_tile_19_3.flag = 0;
       
       self.item_19.push(this.Green_tile_shadow_19_1);
       self.item_19.push(this.Green_tile_19_2);
       self.item_19.push(this.Green_tile_19_3);


        // Pink tile  4th line, 5th item
       this.Pink_tile_shadow_20_1 = new eventListenerClass(res.Pink_tile_shadow, this); 
       this.Pink_tile_shadow_20_1.attr({
          x : self.size.width*80/100,
          y : self.size.height*55/100,
       });
       this.Pink_tile_shadow_20_1.id = "Pink_tile_shadow_20_1";
       this.addChild(this.Pink_tile_shadow_20_1);
       
       this.Pink_tile_20_2 = new eventListenerClass(res.Pink_tile, this);
       this.Pink_tile_20_2.attr({
          x : this.Pink_tile_shadow_20_1.x-10,
          y : this.Pink_tile_shadow_20_1.y+10,
       });
       this.Pink_tile_20_2.id = "Pink_tile_20_2";
       this.addChild(this.Pink_tile_20_2);
       
       this.Pink_tile_20_3 = new eventListenerClass(res.Pink_tile, this); 
       this.Pink_tile_20_3.attr({
          x : this.Pink_tile_20_2.x-8,
          y : this.Pink_tile_20_2.y+8,
          anchorX : 0.5,
          anchorY : 0.5
       });
       this.Pink_tile_20_3.id = "Pink_tile_20_3";
       this.addChild(this.Pink_tile_20_3);
       this.Pink_tile_20_3.flag = 0;
       
       self.item_20.push(this.Pink_tile_shadow_20_1);
       self.item_20.push(this.Pink_tile_20_2);
       self.item_20.push(this.Pink_tile_20_3);

       // Pink tile 5th line, 1st item
       this.Pink_tile_shadow_21_1 = new eventListenerClass(res.Pink_tile_shadow, this); 
       this.Pink_tile_shadow_21_1.attr({
          x : self.size.width*20/100,
          y : self.size.height*45/100,
       });
       this.Pink_tile_shadow_21_1.id = "Pink_tile_shadow_21_1";
       this.addChild(this.Pink_tile_shadow_21_1);
       
       this.Pink_tile_21_2 = new eventListenerClass(res.Pink_tile, this); 
       this.Pink_tile_21_2.attr({
          x : this.Pink_tile_shadow_21_1.x-10,
          y : this.Pink_tile_shadow_21_1.y+10,
       });
       this.Pink_tile_21_2.id = "Pink_tile_21_2";
       this.addChild(this.Pink_tile_21_2);

       self.item_21.push(this.Pink_tile_shadow_21_1);
       self.item_21.push(this.Pink_tile_21_2);
       this.Pink_tile_21_2.flag = 0;
       
        // Blue tile  5th line, 2nd item
       this.Blue_tile_shadow_22_1 = new eventListenerClass(res.Blue_tile_shadow, this); 
       this.Blue_tile_shadow_22_1.attr({
          x : self.size.width*35/100,
          y : self.size.height*45/100,
       });
       this.Blue_tile_shadow_22_1.id = "Blue_tile_shadow_22_1";
       this.addChild(this.Blue_tile_shadow_22_1);
       
       this.Blue_tile_22_2 = new eventListenerClass(res.Blue_tile, this); 
       this.Blue_tile_22_2.attr({
          x : this.Blue_tile_shadow_22_1.x-10,
          y : this.Blue_tile_shadow_22_1.y+10,
       });
       this.Blue_tile_22_2.id = "Blue_tile_22_2";
       this.addChild(this.Blue_tile_22_2);
       
       this.Blue_tile_22_3 = new eventListenerClass(res.Blue_tile, this); 
       this.Blue_tile_22_3.attr({
          x : this.Blue_tile_22_2.x-8,
          y : this.Blue_tile_22_2.y+8,
          anchorX : 0.5,
          anchorY : 0.5
       });
       this.Blue_tile_22_3.id = "Blue_tile_22_3";
       this.addChild(this.Blue_tile_22_3);
       this.Blue_tile_22_3.flag = 0;
              
       self.item_22.push(this.Blue_tile_shadow_22_1);
       self.item_22.push(this.Blue_tile_22_2);
       self.item_22.push(this.Blue_tile_22_3);
       
        // Cyan tile  5th line, 3rd item
       this.Cyan_tile_shadow_23_1 = new eventListenerClass(res.Cyan_tile_shadow, this); 
       this.Cyan_tile_shadow_23_1.attr({
          x : self.size.width*50/100,
          y : self.size.height*45/100,
       });
       this.Cyan_tile_shadow_23_1.id = "Cyan_tile_shadow_23_1";
       this.addChild(this.Cyan_tile_shadow_23_1);

       this.Cyan_tile_23_2 = new eventListenerClass(res.Cyan_tile, this); 
       this.Cyan_tile_23_2.attr({
          x : this.Cyan_tile_shadow_23_1.x-8,
          y : this.Cyan_tile_shadow_23_1.y+8,
          anchorX : 0.5,
          anchorY : 0.5
       });
       this.Cyan_tile_23_2.id = "Cyan_tile_23_2";
       this.addChild(this.Cyan_tile_23_2);
       this.Cyan_tile_23_2.flag = 0;
       
       self.item_23.push(this.Cyan_tile_shadow_23_1);
       self.item_23.push(this.Cyan_tile_23_2);
       
       // Orange tile 5th line, 4th item
       this.Orange_tile_shadow_24_1 = new eventListenerClass(res.Orange_tile_shadow, this); 
       this.Orange_tile_shadow_24_1.attr({
          x : self.size.width*65/100,
          y : self.size.height*45/100,
       });
       this.Orange_tile_shadow_24_1.id = "Orange_tile_shadow_24_1";
       this.addChild(this.Orange_tile_shadow_24_1);
       
       this.Orange_tile_24_2 = new eventListenerClass(res.Orange_tile, this);
       this.Orange_tile_24_2.attr({
          x : this.Orange_tile_shadow_24_1.x-10,
          y : this.Orange_tile_shadow_24_1.y+10,
       });
       this.Orange_tile_24_2.id = "Orange_tile_24_2";
       this.addChild(this.Orange_tile_24_2);
       
       this.Orange_tile_24_3 = new eventListenerClass(res.Orange_tile, this); 
       this.Orange_tile_24_3.attr({
          x : this.Orange_tile_24_2.x-8,
          y : this.Orange_tile_24_2.y+8,
       });
       this.Orange_tile_24_3.id = "Orange_tile_24_3";
       this.addChild(this.Orange_tile_24_3);
       
       this.Orange_tile_24_4 = new eventListenerClass(res.Orange_tile, this); 
       this.Orange_tile_24_4.attr({
          x : this.Orange_tile_24_3.x-8,
          y : this.Orange_tile_24_3.y+8,
       });
       this.Orange_tile_24_4.id = "Orange_tile_24_4";
       this.addChild(this.Orange_tile_24_4);
       
       this.Orange_tile_24_5 = new eventListenerClass(res.Orange_tile, this); 
       this.Orange_tile_24_5.attr({
          x : this.Orange_tile_24_4.x-8,
          y : this.Orange_tile_24_4.y+8,
       });
       this.Orange_tile_24_5.id = "Orange_tile_24_5";
       this.addChild(this.Orange_tile_24_5);
       this.Orange_tile_24_5.flag = 0;
       
       self.item_24.push(this.Orange_tile_shadow_24_1);
       self.item_24.push(this.Orange_tile_24_2);
       self.item_24.push(this.Orange_tile_24_3);
       self.item_24.push(this.Orange_tile_24_4);
       self.item_24.push(this.Orange_tile_24_5);
       
        // Green tile  4th line, 5th item
       this.Green_tile_shadow_25_1 = new eventListenerClass(res.Green_tile_shadow, this); 
       this.Green_tile_shadow_25_1.attr({
          x : self.size.width*80/100,
          y : self.size.height*45/100,
       });
       this.Green_tile_shadow_25_1.id = "Green_tile_shadow_25_1";
       this.addChild(this.Green_tile_shadow_25_1);
       
       this.Green_tile_25_2 = new eventListenerClass(res.Green_tile, this); 
       this.Green_tile_25_2.attr({
          x : this.Green_tile_shadow_25_1.x-10,
          y : this.Green_tile_shadow_25_1.y+10,
       });
       this.Green_tile_25_2.id = "Green_tile_25_2";
       this.addChild(this.Green_tile_25_2);
       
       this.Green_tile_25_3 = new eventListenerClass(res.Green_tile, this); 
       this.Green_tile_25_3.attr({
          x : this.Green_tile_25_2.x-8,
          y : this.Green_tile_25_2.y+8,
          anchorX : 0.5,
          anchorY : 0.5
       });
       this.Green_tile_25_3.id = "Green_tile_25_3";
       this.addChild(this.Green_tile_25_3);
       this.Green_tile_25_3.flag = 0;
       
       self.item_25.push(this.Green_tile_shadow_25_1);
       self.item_25.push(this.Green_tile_25_2);
       self.item_25.push(this.Green_tile_25_3);


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
       this.Correct_Button.id = "Correct_Button_Level_3";
              
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
        this.text = new cc.LabelTTF("","Century Gothic","150");
        this.text.attr({
           x : self.size.width*36/100,
           y : self.size.height*6/100,
//           anchorX : .5,
           anchorY : .5
        });
        this.addChild(this.text);
        this.text.setColor(cc.color("#000000"));
       
       // display valid or invalid word
       this.sorryText = new cc.LabelTTF("", "Century Gothic", "150");
       this.sorryText.attr({
          x : self.size.width*15/100,
          y : self.size.height*13/100,
          anchorX : .5,
          anchorY : .5 
       });
       this.addChild(this.sorryText);
       this.sorryText.setColor(cc.color("#368e3c"));
       
       
       // score display       
       score_text = new cc.LabelTTF("0", "Century Ghotic", "150");
       score_text.attr({
          x : self.size.width*90/100,
          y : self.size.height*95/100,
          anchorX : .5,
          anchorY : .5 
       });
       this.addChild(score_text);
       score_text.setColor(cc.color("#000000"));
       
       // hint text and score when make word
       this.hint_text_n_score_plus = new cc.LabelTTF("", "Century Ghotic", "150");
       this.hint_text_n_score_plus.attr({
          x : self.size.width*70/100,
          y : self.size.height*25/100,
          anchorX : .5,
          anchorY : .5 
       });
       this.addChild(this.hint_text_n_score_plus);
       this.hint_text_n_score_plus.setColor(cc.color("#000000"));
       
       Level_3_mainFunction(this);

        var wid = self.size.width;
        var hei = self.size.height;

        self.position = [
{x:wid*19/100, y:hei*85.5/100}, {x:wid*35/100, y:hei*85/100}, {x:wid*48.5/100, y:hei*86/100}, {x:wid*63.5/100, y:hei*85.7/100}, {x:wid*78/100, y:hei*86/100}, 
{x:wid*20/100, y:hei*75.5/100}, {x:wid*34.3/100, y:hei*75/100}, {x:wid*49/100, y:hei*75.5/100}, {x:wid*63.3/100, y:hei*75.7/100}, {x:wid*78.5/100, y:hei*75/100},
{x:wid*19.5/100, y:hei*65/100}, {x:wid*34/100, y:hei*65.5/100}, {x:wid*49.2/100, y:hei*65/100}, {x:wid*62.3/100, y:hei*66.5/100},  {x:wid*78.5/100, y:hei*65.5/100},
{x:wid*19.8/100, y:hei*55/100}, {x:wid*34.5/100, y:hei*55/100}, {x:wid*48.8/100, y:hei*55.5/100}, {x:wid*63.3/100, y:hei*55.5/100}, {x:wid*78.5/100, y:hei*55.5/100},
{x:wid*19.5/100, y:hei*45/100}, {x:wid*34/100, y:hei*45.3/100}, {x:wid*49/100, y:hei*45.5/100}, {x:wid*62.5/100, y:hei*46.2/100}, {x:wid*78.5/100, y:hei*45.3/100},];

       var chars_id = 0;
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
//            cc.eventManager.addListener(level3_sprite_click.clone(), v);
       }


            // Score_board after game finish       
            this.Score_board = new eventListenerClass(res.Score_board, this);
            this.Score_board.attr({
                x : self.size.width*50/100,
                y : self.size.height*65/100,
                anchorX : .5,
                anchorY : .5
            });
            self.addChild(this.Score_board, 5);
            this.Score_board.setVisible(false);

            // ok button to go on next level
            this.Ok_button = new eventListenerClass(res.Ok_button, this);
            this.Ok_button.attr({
                x : self.size.width*50/100,
                y : self.size.height*52/100,
                anchorX : .5,
                anchorY : .5
            });
            self.addChild(this.Ok_button, 5);
            this.Ok_button.id = "Ok_button_Level_3";
            this.Ok_button.flag = 0;
            this.Ok_button.setVisible(false);
            
            // score on score_board
            this.score_board_score = new cc.LabelTTF("", "Century Ghotic", "150");
            this.score_board_score.attr({
                x : self.size.width*70/100,
                y : self.size.height*62/100,
                anchorX : .5,
                anchorY : .5 
            });
            self.addChild(this.score_board_score, 5);
            this.score_board_score.setColor(cc.color("#ffffff"));
            this.score_board_score.setVisible(false);


    // click event listener
/*    cc.eventManager.addListener(level3_sprite_click.clone(), this.Green_tile_shadow_1_1);
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Green_tile_1_2);
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Green_tile_1_3);

    cc.eventManager.addListener(level3_sprite_click.clone(), this.Red_tile_shadow_2_1);

    cc.eventManager.addListener(level3_sprite_click.clone(), this.Orange_tile_shadow_3_1);
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Orange_tile_3_2);
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Orange_tile_3_3);
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Orange_tile_3_4);
    
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Blue_tile_shadow_4_1);
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Blue_tile_4_2);
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Blue_tile_4_3);
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Blue_tile_4_4);
    
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Green_tile_shadow_5_1);
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Green_tile_5_2);
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Green_tile_5_3);
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Green_tile_5_4);
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Green_tile_5_5);

    cc.eventManager.addListener(level3_sprite_click.clone(), this.Blue_tile_shadow_6_1);
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Blue_tile_6_2);
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Blue_tile_6_3);

    cc.eventManager.addListener(level3_sprite_click.clone(), this.Green_tile_shadow_7_1);
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Green_tile_7_2);

    cc.eventManager.addListener(level3_sprite_click.clone(), this.Cyan_tile_shadow_8_1);
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Cyan_tile_8_2);

    cc.eventManager.addListener(level3_sprite_click.clone(), this.Red_tile_shadow_9_1);
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Red_tile_9_2);
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Red_tile_9_3);
    
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Orange_tile_shadow_10_1);
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Orange_tile_10_2);
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Orange_tile_10_3);
    
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Green_tile_shadow_11_1);
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Green_tile_11_2);
    
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Pink_tile_shadow_12_1);
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Pink_tile_12_2);
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Pink_tile_12_3);

    cc.eventManager.addListener(level3_sprite_click.clone(), this.Red_tile_shadow_13_1);
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Red_tile_13_2);
    
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Green_tile_shadow_14_1);
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Green_tile_14_2);
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Green_tile_14_3);
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Green_tile_14_4);
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Green_tile_14_5);
    
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Blue_tile_shadow_15_1);
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Blue_tile_15_2);
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Blue_tile_15_3);
    
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Cyan_tile_shadow_16_1);
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Cyan_tile_16_2);
    
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Orange_tile_shadow_17_1);
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Orange_tile_17_2);

    cc.eventManager.addListener(level3_sprite_click.clone(), this.Blue_tile_shadow_18_1);
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Blue_tile_18_2);

    cc.eventManager.addListener(level3_sprite_click.clone(), this.Green_tile_shadow_19_1);
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Green_tile_19_2);
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Green_tile_19_3);
    
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Pink_tile_shadow_20_1);
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Pink_tile_20_2);
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Pink_tile_20_3);
    
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Pink_tile_shadow_21_1);
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Pink_tile_21_2);
    
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Blue_tile_shadow_22_1);
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Blue_tile_22_2);
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Blue_tile_22_3);

    cc.eventManager.addListener(level3_sprite_click.clone(), this.Cyan_tile_shadow_23_1);
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Cyan_tile_23_2);    
    
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Orange_tile_shadow_24_1);
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Orange_tile_24_2);
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Orange_tile_24_3);
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Orange_tile_24_4);
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Orange_tile_24_5);
    
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Green_tile_shadow_25_1);
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Green_tile_25_2);
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Green_tile_25_3);
    
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Hint_Button);
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Correct_Button);
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Wrong_Button);
    cc.eventManager.addListener(level3_sprite_click.clone(), this.Home);    
    cc.eventManager.addListener(level3_sprite_click.clone(), Ok_button);    
  */  }
});

/*
var level3_sprite_click = cc.EventListener.create({event: cc.EventListener.TOUCH_ONE_BY_ONE, swallowTouches: true,
  onTouchBegan: function (touch, event) {
      
    var target = event.getCurrentTarget();
    var location = target.convertToNodeSpace(touch.getLocation());
    var targetSize = target.getContentSize();
    var targetRectangle = cc.rect(0, 0, targetself.size.width, targetself.size.height);
    
     if (cc.rectContainsPoint(targetRectangle, location))
      {
          if(self.item_1.length>=1 && target.id==self.item_1[self.item_1.length-1].id && self.letterArray.length<12)
          {
              if(self.item_1[self.item_1.length-1].flag==0)
              {
                self.item_1[self.item_1.length-1].x = self.item_1[self.item_1.length-1].x-8;
                self.item_1[self.item_1.length-1].y = self.item_1[self.item_1.length-1].y+8;
                self.item_1[self.item_1.length-1].flag = 1;
                self.storeLetter.push(self.item_1);
                
                self.letterArray.push(self.chars[0]);
                self.letterIndex.push(0);
                self.clickLetter[0].x = self.clickLetter[0].x-8;
                self.clickLetter[0].y = self.clickLetter[0].y+8;
                
                text.setString(self.letterArray.join(""));
                var ch = checkWord(self.letterArray);
                if(ch==1)
                {
                    text.setColor(cc.color("#368e3c"));
                }
                else
                    text.setColor(cc.color("#000000")); 
                    
                self.sorryText.setString("");
              }
          }
          else if(self.item_2.length>=1 && target.id==self.item_2[self.item_2.length-1].id && self.letterArray.length<12)
          {
              if(self.item_2[self.item_2.length-1].flag==0)
              {
                self.item_2[self.item_2.length-1].x = self.item_2[self.item_2.length-1].x-8;
                self.item_2[self.item_2.length-1].y = self.item_2[self.item_2.length-1].y+8;
                self.item_2[self.item_2.length-1].flag = 1;
                self.storeLetter.push(self.item_2);
                
                self.letterArray.push(self.chars[1]);
                self.letterIndex.push(1);
                self.clickLetter[1].x = self.clickLetter[1].x-8;
                self.clickLetter[1].y = self.clickLetter[1].y+8;
                
                text.setString(self.letterArray.join(""));
                var ch = checkWord(self.letterArray);
                if(ch==1)
                {
                    text.setColor(cc.color("#368e3c"));
                }
                else
                    text.setColor(cc.color("#000000")); 
                    
                self.sorryText.setString("");
              }
          }
          else if(self.item_3.length>=1 && target.id==self.item_3[self.item_3.length-1].id && self.letterArray.length<12)
          {
              if(self.item_3[self.item_3.length-1].flag==0)
              {
                self.item_3[self.item_3.length-1].x = self.item_3[self.item_3.length-1].x-8;
                self.item_3[self.item_3.length-1].y = self.item_3[self.item_3.length-1].y+8;
                self.item_3[self.item_3.length-1].flag = 1;
                self.storeLetter.push(self.item_3);
                
                self.letterArray.push(self.chars[2]);
                self.letterIndex.push(2);
                self.clickLetter[2].x = self.clickLetter[2].x-8;
                self.clickLetter[2].y = self.clickLetter[2].y+8;
                
                text.setString(self.letterArray.join(""));
                var ch = checkWord(self.letterArray);
                if(ch==1)
                {
                    text.setColor(cc.color("#368e3c"));
                }
                else
                    text.setColor(cc.color("#000000")); 

                self.sorryText.setString("");
            }
          }
          else if(self.item_4.length>=1 && target.id==self.item_4[self.item_4.length-1].id && self.letterArray.length<12)
          {
              if(self.item_4[self.item_4.length-1].flag==0)
              {
                self.item_4[self.item_4.length-1].x = self.item_4[self.item_4.length-1].x-8;
                self.item_4[self.item_4.length-1].y = self.item_4[self.item_4.length-1].y+8;
                self.item_4[self.item_4.length-1].flag = 1;
                self.storeLetter.push(self.item_4);
                
                self.letterArray.push(self.chars[3]);
                self.letterIndex.push(3);
                self.clickLetter[3].x = self.clickLetter[3].x-8;
                self.clickLetter[3].y = self.clickLetter[3].y+8;
                
                text.setString(self.letterArray.join(""));
                var ch = checkWord(self.letterArray);
                if(ch==1)
                {
                    text.setColor(cc.color("#368e3c"));
                }
                else
                    text.setColor(cc.color("#000000")); 
                    
                self.sorryText.setString("");
              }
          }
          else if(self.item_5.length>=1 && target.id==self.item_5[self.item_5.length-1].id && self.letterArray.length<12)
          {
              if(self.item_5[self.item_5.length-1].flag==0)
              {
                self.item_5[self.item_5.length-1].x = self.item_5[self.item_5.length-1].x-8;
                self.item_5[self.item_5.length-1].y = self.item_5[self.item_5.length-1].y+8;
                self.item_5[self.item_5.length-1].flag = 1;
                self.storeLetter.push(self.item_5);
                
                self.letterArray.push(self.chars[4]);
                self.letterIndex.push(4);
                self.clickLetter[4].x = self.clickLetter[4].x-8;
                self.clickLetter[4].y = self.clickLetter[4].y+8;
                
                text.setString(self.letterArray.join(""));
                var ch = checkWord(self.letterArray);
                if(ch==1)
                {
                    text.setColor(cc.color("#368e3c"));
                }
                else
                    text.setColor(cc.color("#000000")); 
                    
                self.sorryText.setString("");
              }
          }
          else if(self.item_6.length>=1 && target.id==self.item_6[self.item_6.length-1].id && self.letterArray.length<12)
          {
              if(self.item_6[self.item_6.length-1].flag==0)
              {
                self.item_6[self.item_6.length-1].x = self.item_6[self.item_6.length-1].x-8;
                self.item_6[self.item_6.length-1].y = self.item_6[self.item_6.length-1].y+8;
                self.item_6[self.item_6.length-1].flag = 1;
                self.storeLetter.push(self.item_6);
                
                self.letterArray.push(self.chars[5]);
                self.letterIndex.push(5);
                self.clickLetter[5].x = self.clickLetter[5].x-8;
                self.clickLetter[5].y = self.clickLetter[5].y+8;
                
                text.setString(self.letterArray.join(""));
                var ch = checkWord(self.letterArray);
                if(ch==1)
                {
                    text.setColor(cc.color("#368e3c"));
                }
                else
                    text.setColor(cc.color("#000000")); 
                    
                self.sorryText.setString("");
              }
          }
          else if(self.item_7.length>=1 && target.id==self.item_7[self.item_7.length-1].id && self.letterArray.length<12)
          {
              if(self.item_7[self.item_7.length-1].flag==0)
              {
                self.item_7[self.item_7.length-1].x = self.item_7[self.item_7.length-1].x-8;
                self.item_7[self.item_7.length-1].y = self.item_7[self.item_7.length-1].y+8;
                self.item_7[self.item_7.length-1].flag = 1;
                self.storeLetter.push(self.item_7);
                
                self.letterArray.push(self.chars[6]);
                self.letterIndex.push(6);
                self.clickLetter[6].x = self.clickLetter[6].x-8;
                self.clickLetter[6].y = self.clickLetter[6].y+8;
                
                text.setString(self.letterArray.join(""));
                var ch = checkWord(self.letterArray);
                if(ch==1)
                {
                    text.setColor(cc.color("#368e3c"));
                }
                else
                    text.setColor(cc.color("#000000")); 
                    
                self.sorryText.setString("");
              }
          }
          else if(self.item_8.length>=1 && target.id==self.item_8[self.item_8.length-1].id && self.letterArray.length<12)
          {
              if(self.item_8[self.item_8.length-1].flag==0)
              {
                self.item_8[self.item_8.length-1].x = self.item_8[self.item_8.length-1].x-8;
                self.item_8[self.item_8.length-1].y = self.item_8[self.item_8.length-1].y+8;
                self.item_8[self.item_8.length-1].flag = 1;
                self.storeLetter.push(self.item_8);
                
                self.letterArray.push(self.chars[7]);
                self.letterIndex.push(7);
                self.clickLetter[7].x = self.clickLetter[7].x-8;
                self.clickLetter[7].y = self.clickLetter[7].y+8;
                
                text.setString(self.letterArray.join(""));
                var ch = checkWord(self.letterArray);
                if(ch==1)
                {
                    text.setColor(cc.color("#368e3c"));
                }
                else
                    text.setColor(cc.color("#000000")); 
                    
                self.sorryText.setString("");
              }
          }
          else if(self.item_9.length>=1 && target.id==self.item_9[self.item_9.length-1].id && self.letterArray.length<12)
          {
              if(self.item_9[self.item_9.length-1].flag==0)
              {
                self.item_9[self.item_9.length-1].x = self.item_9[self.item_9.length-1].x-8;
                self.item_9[self.item_9.length-1].y = self.item_9[self.item_9.length-1].y+8;
                self.item_9[self.item_9.length-1].flag = 1;
                self.storeLetter.push(self.item_9);
                
                self.letterArray.push(self.chars[8]);
                self.letterIndex.push(8);
                self.clickLetter[8].x = self.clickLetter[8].x-8;
                self.clickLetter[8].y = self.clickLetter[8].y+8;
                
                text.setString(self.letterArray.join(""));
                var ch = checkWord(self.letterArray);
                if(ch==1)
                {
                    text.setColor(cc.color("#368e3c"));
                }
                else
                    text.setColor(cc.color("#000000"));
                    
                self.sorryText.setString("");
              }
          }
          if(self.item_10.length>=1 && target.id==self.item_10[self.item_10.length-1].id && self.letterArray.length<12)
          {
              if(self.item_10[self.item_10.length-1].flag==0)
              {
                self.item_10[self.item_10.length-1].x = self.item_10[self.item_10.length-1].x-8;
                self.item_10[self.item_10.length-1].y = self.item_10[self.item_10.length-1].y+8;
                self.item_10[self.item_10.length-1].flag = 1;
                self.storeLetter.push(self.item_10);
                
                self.letterArray.push(self.chars[9]);
                self.letterIndex.push(9);
                self.clickLetter[9].x = self.clickLetter[9].x-8;
                self.clickLetter[9].y = self.clickLetter[9].y+8;
                
                text.setString(self.letterArray.join(""));
                var ch = checkWord(self.letterArray);
                if(ch==1)
                {
                    text.setColor(cc.color("#368e3c"));
                }
                else
                    text.setColor(cc.color("#000000")); 
                    
                self.sorryText.setString("");
              }
          }
          if(self.item_11.length>=1 && target.id==self.item_11[self.item_11.length-1].id && self.letterArray.length<12)
          {
              if(self.item_11[self.item_11.length-1].flag==0)
              {
                self.item_11[self.item_11.length-1].x = self.item_11[self.item_11.length-1].x-8;
                self.item_11[self.item_11.length-1].y = self.item_11[self.item_11.length-1].y+8;
                self.item_11[self.item_11.length-1].flag = 1;
                self.storeLetter.push(self.item_11);
                
                self.letterArray.push(self.chars[10]);
                self.letterIndex.push(10);
                self.clickLetter[10].x = self.clickLetter[10].x-8;
                self.clickLetter[10].y = self.clickLetter[10].y+8;
                
                text.setString(self.letterArray.join(""));
                var ch = checkWord(self.letterArray);
                if(ch==1)
                {
                    text.setColor(cc.color("#368e3c"));
                }
                else
                    text.setColor(cc.color("#000000")); 
                    
                self.sorryText.setString("");
              }
          }
          else if(self.item_12.length>=1 && target.id==self.item_12[self.item_12.length-1].id && self.letterArray.length<12)
          {
              if(self.item_12[self.item_12.length-1].flag==0)
              {
                self.item_12[self.item_12.length-1].x = self.item_12[self.item_12.length-1].x-8;
                self.item_12[self.item_12.length-1].y = self.item_12[self.item_12.length-1].y+8;
                self.item_12[self.item_12.length-1].flag = 1;
                self.storeLetter.push(self.item_12);
                
                self.letterArray.push(self.chars[11]);
                self.letterIndex.push(11);
                self.clickLetter[11].x = self.clickLetter[11].x-8;
                self.clickLetter[11].y = self.clickLetter[11].y+8;
                
                text.setString(self.letterArray.join(""));
                var ch = checkWord(self.letterArray);
                if(ch==1)
                {
                    text.setColor(cc.color("#368e3c"));
                }
                else
                    text.setColor(cc.color("#000000")); 
                    
                self.sorryText.setString("");
              }
          }
          else if(self.item_13.length>=1 && target.id==self.item_13[self.item_13.length-1].id && self.letterArray.length<12)
          {
              if(self.item_13[self.item_13.length-1].flag==0)
              {
                self.item_13[self.item_13.length-1].x = self.item_13[self.item_13.length-1].x-8;
                self.item_13[self.item_13.length-1].y = self.item_13[self.item_13.length-1].y+8;
                self.item_13[self.item_13.length-1].flag = 1;
                self.storeLetter.push(self.item_13);
                
                self.letterArray.push(self.chars[12]);
                self.letterIndex.push(12);
                self.clickLetter[12].x = self.clickLetter[12].x-8;
                self.clickLetter[12].y = self.clickLetter[12].y+8;
                
                text.setString(self.letterArray.join(""));
                var ch = checkWord(self.letterArray);
                if(ch==1)
                {
                    text.setColor(cc.color("#368e3c"));
                }
                else
                    text.setColor(cc.color("#000000")); 

                self.sorryText.setString("");
            }
          }
          else if(self.item_14.length>=1 && target.id==self.item_14[self.item_14.length-1].id && self.letterArray.length<12)
          {
              if(self.item_14[self.item_14.length-1].flag==0)
              {
                self.item_14[self.item_14.length-1].x = self.item_14[self.item_14.length-1].x-8;
                self.item_14[self.item_14.length-1].y = self.item_14[self.item_14.length-1].y+8;
                self.item_14[self.item_14.length-1].flag = 1;
                self.storeLetter.push(self.item_14);
                
                self.letterArray.push(self.chars[13]);
                self.letterIndex.push(13);
                self.clickLetter[13].x = self.clickLetter[13].x-8;
                self.clickLetter[13].y = self.clickLetter[13].y+8;
                
                text.setString(self.letterArray.join(""));
                var ch = checkWord(self.letterArray);
                if(ch==1)
                {
                    text.setColor(cc.color("#368e3c"));
                }
                else
                    text.setColor(cc.color("#000000")); 
                    
                self.sorryText.setString("");
              }
          }
          else if(self.item_15.length>=1 && target.id==self.item_15[self.item_15.length-1].id && self.letterArray.length<12)
          {
              if(self.item_15[self.item_15.length-1].flag==0)
              {
                self.item_15[self.item_15.length-1].x = self.item_15[self.item_15.length-1].x-8;
                self.item_15[self.item_15.length-1].y = self.item_15[self.item_15.length-1].y+8;
                self.item_15[self.item_15.length-1].flag = 1;
                self.storeLetter.push(self.item_15);
                
                self.letterArray.push(self.chars[14]);
                self.letterIndex.push(14);
                self.clickLetter[14].x = self.clickLetter[14].x-8;
                self.clickLetter[14].y = self.clickLetter[14].y+8;
                
                text.setString(self.letterArray.join(""));
                var ch = checkWord(self.letterArray);
                if(ch==1)
                {
                    text.setColor(cc.color("#368e3c"));
                }
                else
                    text.setColor(cc.color("#000000")); 
                    
                self.sorryText.setString("");
              }
          }
          else if(self.item_16.length>=1 && target.id==self.item_16[self.item_16.length-1].id && self.letterArray.length<12)
          {
              if(self.item_16[self.item_16.length-1].flag==0)
              {
                self.item_16[self.item_16.length-1].x = self.item_16[self.item_16.length-1].x-8;
                self.item_16[self.item_16.length-1].y = self.item_16[self.item_16.length-1].y+8;
                self.item_16[self.item_16.length-1].flag = 1;
                self.storeLetter.push(self.item_16);
                
                self.letterArray.push(self.chars[15]);
                self.letterIndex.push(15);
                self.clickLetter[15].x = self.clickLetter[15].x-8;
                self.clickLetter[15].y = self.clickLetter[15].y+8;
                
                text.setString(self.letterArray.join(""));
                var ch = checkWord(self.letterArray);
                if(ch==1)
                {
                    text.setColor(cc.color("#368e3c"));
                }
                else
                    text.setColor(cc.color("#000000")); 
                    
                self.sorryText.setString("");
              }
          }
          else if(self.item_17.length>=1 && target.id==self.item_17[self.item_17.length-1].id && self.letterArray.length<12)
          {
              if(self.item_17[self.item_17.length-1].flag==0)
              {
                self.item_17[self.item_17.length-1].x = self.item_17[self.item_17.length-1].x-8;
                self.item_17[self.item_17.length-1].y = self.item_17[self.item_17.length-1].y+8;
                self.item_17[self.item_17.length-1].flag = 1;
                self.storeLetter.push(self.item_17);
                
                self.letterArray.push(self.chars[16]);
                self.letterIndex.push(16);
                self.clickLetter[16].x = self.clickLetter[16].x-8;
                self.clickLetter[16].y = self.clickLetter[16].y+8;
                
                text.setString(self.letterArray.join(""));
                var ch = checkWord(self.letterArray);
                if(ch==1)
                {
                    text.setColor(cc.color("#368e3c"));
                }
                else
                    text.setColor(cc.color("#000000")); 
                    
                self.sorryText.setString("");
              }
          }
          else if(self.item_18.length>=1 && target.id==self.item_18[self.item_18.length-1].id && self.letterArray.length<12)
          {
              if(self.item_18[self.item_18.length-1].flag==0)
              {
                self.item_18[self.item_18.length-1].x = self.item_18[self.item_18.length-1].x-8;
                self.item_18[self.item_18.length-1].y = self.item_18[self.item_18.length-1].y+8;
                self.item_18[self.item_18.length-1].flag = 1;
                self.storeLetter.push(self.item_18);
                
                self.letterArray.push(self.chars[17]);
                self.letterIndex.push(17);
                self.clickLetter[17].x = self.clickLetter[17].x-8;
                self.clickLetter[17].y = self.clickLetter[17].y+8;
                
                text.setString(self.letterArray.join(""));
                var ch = checkWord(self.letterArray);
                if(ch==1)
                {
                    text.setColor(cc.color("#368e3c"));
                }
                else
                    text.setColor(cc.color("#000000")); 
                    
                self.sorryText.setString("");
              }
          }
          else if(self.item_19.length>=1 && target.id==self.item_19[self.item_19.length-1].id && self.letterArray.length<12)
          {
              if(self.item_19[self.item_19.length-1].flag==0)
              {
                self.item_19[self.item_19.length-1].x = self.item_19[self.item_19.length-1].x-8;
                self.item_19[self.item_19.length-1].y = self.item_19[self.item_19.length-1].y+8;
                self.item_19[self.item_19.length-1].flag = 1;
                self.storeLetter.push(self.item_19);
                
                self.letterArray.push(self.chars[18]);
                self.letterIndex.push(18);
                self.clickLetter[18].x = self.clickLetter[18].x-8;
                self.clickLetter[18].y = self.clickLetter[18].y+8;
                
                text.setString(self.letterArray.join(""));
                var ch = checkWord(self.letterArray);
                if(ch==1)
                {
                    text.setColor(cc.color("#368e3c"));
                }
                else
                    text.setColor(cc.color("#000000"));
                    
                self.sorryText.setString("");
              }
          }
          if(self.item_20.length>=1 && target.id==self.item_20[self.item_20.length-1].id && self.letterArray.length<12)
          {
              if(self.item_20[self.item_20.length-1].flag==0)
              {
                self.item_20[self.item_20.length-1].x = self.item_20[self.item_20.length-1].x-8;
                self.item_20[self.item_20.length-1].y = self.item_20[self.item_20.length-1].y+8;
                self.item_20[self.item_20.length-1].flag = 1;
                self.storeLetter.push(self.item_20);
                
                self.letterArray.push(self.chars[19]);
                self.letterIndex.push(19);
                self.clickLetter[19].x = self.clickLetter[19].x-8;
                self.clickLetter[19].y = self.clickLetter[19].y+8;
                
                text.setString(self.letterArray.join(""));
                var ch = checkWord(self.letterArray);
                if(ch==1)
                {
                    text.setColor(cc.color("#368e3c"));
                }
                else
                    text.setColor(cc.color("#000000")); 
                    
                self.sorryText.setString("");
              }
          }
          if(self.item_21.length>=1 && target.id==self.item_21[self.item_21.length-1].id && self.letterArray.length<12)
          {
              if(self.item_21[self.item_21.length-1].flag==0)
              {
                self.item_21[self.item_21.length-1].x = self.item_21[self.item_21.length-1].x-8;
                self.item_21[self.item_21.length-1].y = self.item_21[self.item_21.length-1].y+8;
                self.item_21[self.item_21.length-1].flag = 1;
                self.storeLetter.push(self.item_21);
                
                self.letterArray.push(self.chars[20]);
                self.letterIndex.push(20);
                self.clickLetter[20].x = self.clickLetter[20].x-8;
                self.clickLetter[20].y = self.clickLetter[20].y+8;
                
                text.setString(self.letterArray.join(""));
                var ch = checkWord(self.letterArray);
                if(ch==1)
                {
                    text.setColor(cc.color("#368e3c"));
                }
                else
                    text.setColor(cc.color("#000000")); 
                    
                self.sorryText.setString("");
              }
          }
          else if(self.item_22.length>=1 && target.id==self.item_22[self.item_22.length-1].id && self.letterArray.length<22)
          {
              if(self.item_22[self.item_22.length-1].flag==0)
              {
                self.item_22[self.item_22.length-1].x = self.item_22[self.item_22.length-1].x-8;
                self.item_22[self.item_22.length-1].y = self.item_22[self.item_22.length-1].y+8;
                self.item_22[self.item_22.length-1].flag = 1;
                self.storeLetter.push(self.item_22);
                
                self.letterArray.push(self.chars[21]);
                self.letterIndex.push(21);
                self.clickLetter[21].x = self.clickLetter[21].x-8;
                self.clickLetter[21].y = self.clickLetter[21].y+8;
                
                text.setString(self.letterArray.join(""));
                var ch = checkWord(self.letterArray);
                if(ch==1)
                {
                    text.setColor(cc.color("#368e3c"));
                }
                else
                    text.setColor(cc.color("#000000")); 
                    
                self.sorryText.setString("");
              }
          }
          else if(self.item_23.length>=1 && target.id==self.item_23[self.item_23.length-1].id && self.letterArray.length<22)
          {
              if(self.item_23[self.item_23.length-1].flag==0)
              {
                self.item_23[self.item_23.length-1].x = self.item_23[self.item_23.length-1].x-8;
                self.item_23[self.item_23.length-1].y = self.item_23[self.item_23.length-1].y+8;
                self.item_23[self.item_23.length-1].flag = 1;
                self.storeLetter.push(self.item_23);
                
                self.letterArray.push(self.chars[22]);
                self.letterIndex.push(22);
                self.clickLetter[22].x = self.clickLetter[22].x-8;
                self.clickLetter[22].y = self.clickLetter[22].y+8;
                
                text.setString(self.letterArray.join(""));
                var ch = checkWord(self.letterArray);
                if(ch==1)
                {
                    text.setColor(cc.color("#368e3c"));
                }
                else
                    text.setColor(cc.color("#000000")); 

                self.sorryText.setString("");
            }
          }
          else if(self.item_24.length>=1 && target.id==self.item_24[self.item_24.length-1].id && self.letterArray.length<12)
          {
              if(self.item_24[self.item_24.length-1].flag==0)
              {
                self.item_24[self.item_24.length-1].x = self.item_24[self.item_24.length-1].x-8;
                self.item_24[self.item_24.length-1].y = self.item_24[self.item_24.length-1].y+8;
                self.item_24[self.item_24.length-1].flag = 1;
                self.storeLetter.push(self.item_24);
                
                self.letterArray.push(self.chars[23]);
                self.letterIndex.push(23);
                self.clickLetter[23].x = self.clickLetter[23].x-8;
                self.clickLetter[23].y = self.clickLetter[23].y+8;
                
                text.setString(self.letterArray.join(""));
                var ch = checkWord(self.letterArray);
                if(ch==1)
                {
                    text.setColor(cc.color("#368e3c"));
                }
                else
                    text.setColor(cc.color("#000000")); 
                    
                self.sorryText.setString("");
              }
          }
          else if(self.item_25.length>=1 && target.id==self.item_25[self.item_25.length-1].id && self.letterArray.length<12)
          {
              if(self.item_25[self.item_25.length-1].flag==0)
              {
                self.item_25[self.item_25.length-1].x = self.item_25[self.item_25.length-1].x-8;
                self.item_25[self.item_25.length-1].y = self.item_25[self.item_25.length-1].y+8;
                self.item_25[self.item_25.length-1].flag = 1;
                self.storeLetter.push(self.item_25);
                
                self.letterArray.push(self.chars[24]);
                self.letterIndex.push(24);
                self.clickLetter[24].x = self.clickLetter[24].x-8;
                self.clickLetter[24].y = self.clickLetter[24].y+8;
                
                text.setString(self.letterArray.join(""));
                var ch = checkWord(self.letterArray);
                if(ch==1)
                {
                    text.setColor(cc.color("#368e3c"));
                }
                else
                    text.setColor(cc.color("#000000")); 
                    
                self.sorryText.setString("");
              }
          }
          else if(target.id=="Correct_Button_Level_3")
          {
              var ch = checkWord(self.letterArray);
              
			if(ch==0 || self.letterArray.length<=1)
			{
                self.sorryText.setString("Invalid");
			}
            else
            {
                self.sorryText.setString("Correct");
                text.setString("");
				var lenvowel = 0, lencon = 0;
				for(var i=0; i<self.letterArray.length; i++)
				{
					var ind = self.letterIndex[i];//self.chars.indexOf(self.letterArray[i]);

                    var val = self.storeLetter[i];
					if(self.letterArray[i]=='a' || self.letterArray[i]=='e' || self.letterArray[i]=='i' || self.letterArray[i]=='o' || self.letterArray[i]=='u')
					{
						lenvowel++;
					}
					else
					{
						lencon++;
					}	
                    
                    self.clickLetter[ind].runAction(cc.MoveTo.create(.2, cc.p(self.size.width*90/100, self.size.height*95/100)));
                    val[val.length-1].runAction(cc.MoveTo.create(.2, cc.p(self.size.width*90/100, self.size.height*95/100)));
				}
                
                var sc = parseInt(score_text.getString());
                hint_text_n_score_plus.setVisible(true);
                if(self.letterArray.length==2)
                    {
                        score_text.setString(sc + 20);
                        hint_text_n_score_plus.setString('+20');
                    }                    
                else if(self.letterArray.length==3)
                    {
                        hint_text_n_score_plus.setString('+40');
                        score_text.setString(sc + 40);
                    }
                else if(self.letterArray.length==4)
                {
                        hint_text_n_score_plus.setString('+60');
                        score_text.setString(sc + 60);
                }                    
                else if(self.letterArray.length==5)
                {
                        hint_text_n_score_plus.setString('+70');
                        score_text.setString(sc + 70);
                }
                else if(self.letterArray.length==6)
                {
                        hint_text_n_score_plus.setString('+90');
                        score_text.setString(sc + 90);
                }
                else if(self.letterArray.length==7)
                {
                        hint_text_n_score_plus.setString('+100');
                        score_text.setString(sc + 100);
                }
                else if(self.letterArray.length==8)
                {
                        hint_text_n_score_plus.setString('+120');
                        score_text.setString(sc + 120);
                }
                else if(self.letterArray.length==9)
                {
                        hint_text_n_score_plus.setString('+130');
                        score_text.setString(sc + 130);
                }
                else if(self.letterArray.length==10)
                {
                        hint_text_n_score_plus.setString('+150');
                        score_text.setString(sc + 150);
                }
                else if(self.letterArray.length==11)
                {
                        hint_text_n_score_plus.setString('+170');
                        score_text.setString(sc + 170);
                }
                else if(self.letterArray.length==12)
                {
                        hint_text_n_score_plus.setString('+200');
                        score_text.setString(sc + 200);
                }
                
                setTimeout(function(){
                    hint_text_n_score_plus.setVisible(false);
                    for(var i=0; i<self.letterArray.length; i++)
                    {
                        var ind = self.letterIndex[i]; //self.chars.indexOf(self.letterArray[i]);
                        var val = self.storeLetter[i];
                        self.removeChild(val[val.length-1]);
                        self.removeChild(self.clickLetter[ind]);
                        val.pop();
                        if(val.length>0)
                        {
                            val[val.length-1].flag = 0;
                        }
                    }
                    self.sorryText.setString("");
                    self.hint_flag = 0;
                    Level_3_mainFunction();
                },300);
            }
          }
          else if(target.id=="Wrong_Button")
          {
              if(self.storeLetter.length>0)
              {
                    var item = self.storeLetter[self.storeLetter.length-1];
                    item[item.length-1].x = item[item.length-1].x + 8;
                    item[item.length-1].y = item[item.length-1].y - 8;
                    item[item.length-1].flag = 0;
                    self.storeLetter.pop();
                    
                    var letter = self.letterIndex[self.letterIndex.length-1];
                    self.clickLetter[letter].x = self.clickLetter[letter].x+8;
                    self.clickLetter[letter].y = self.clickLetter[letter].y-8;
                    self.letterArray.pop();
                    self.letterIndex.pop();
                    
                    text.setString(self.letterArray.join(""));
                    var ch = checkWord(self.letterArray);
                    if(ch==1)
                    {
                        text.setColor(cc.color("#368e3c"));
                    }
                    else
                        text.setColor(cc.color("#000000")); 
                        
                self.sorryText.setString("");
              }
          }
          else if(target.id=="Hint_Button")
          {// first time hint button is clicked
              if(self.hint_flag==0)
              {
                  var sc = parseInt(score_text.getString());
                  if(sc>=10)
                  {
                      var res = 5;
                      res = two(self.chars.join(""), 5);
                      
                      if(res==5)
                      {
                          res = three(self.chars.join(""), 5);
                      }
                        
                      if(res==5)
                      {
                          res = four(self.chars.join(""), 5);
                      }
                        
                      if(res==5)
                      {
                          res = five(self.chars.join(""), 5);
                      }
                        
                      if(res==5)
                      {
                          res = six(self.chars.join(""), 5);
                      }
                      
                      if(res!=5)
                      {
                          hint_text_n_score_plus.setVisible(true);
                          hint_text_n_score_plus.setString(res);
                          self.hint_flag = 1;
                          hint_text = res;
                          score_text.setString(sc-10);
                          setTimeout(function(){
                              hint_text_n_score_plus.setVisible(false);
                          },500);
                      }
                  }                  
              }
              else
              {
                    hint_text_n_score_plus.setVisible(true);
                    hint_text_n_score_plus.setString(hint_text);
                    setTimeout(function(){
                        hint_text_n_score_plus.setVisible(false);
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
                cc.director.runScene(new Level_4_Scene());
          }
      }
  }
});
*/

var Level_3_Scene = cc.Scene.extend({
    onEnter : function(){
    this._super();
    var layer = new Level_3_Layer();
    this.addChild(layer);
    }
});


function Level_3_mainFunction(baseObject)
{
    var baseObject_inLocal = baseObject
    baseObject_inLocal.vowelArray = [];
    baseObject_inLocal.consonantArray = [];
    
    if(baseObject_inLocal.chars.length<1)
    {
        baseObject_inLocal.chars = Level_3_random_char(baseObject_inLocal.vowelArray, baseObject_inLocal.consonantArray, baseObject_inLocal);
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

        var tempchar = this.Level_3_random_char(baseObject_inLocal.vowelArray, baseObject_inLocal.consonantArray, baseObject_inLocal);
        var newChar = new Array();
        newChar = baseObject_inLocal.chars.slice();
        console.log('newChar= '+newChar);

        for(var i = 0; i<tempchar.length; i++)
        {
            var ch = baseObject_inLocal.chars.join("");
            var ind = baseObject_inLocal.letterIndex[i]; //baseObject_inLocal.chars.indexOf(baseObject_inLocal.letterArray[i]);
            
            var id = baseObject_inLocal.clickLetter[ind].id;
            newChar[ind] = tempchar[i];
            var len = baseObject_inLocal.storeLetter[i].length;
            if(len>0)
            {
            var v = newChar[ind];
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
    baseObject_inLocal.letterIndex = [];
    
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
        
    if(baseObject_inLocal.item_10.length==0)
        baseObject_inLocal.chars[9] = '0';
        
    if(baseObject_inLocal.item_11.length==0)
        baseObject_inLocal.chars[10] = '0';

    if(baseObject_inLocal.item_12.length==0)
        baseObject_inLocal.chars[11] = '0';
        
    if(baseObject_inLocal.item_13.length==0)
        baseObject_inLocal.chars[12] = '0';
        
    if(baseObject_inLocal.item_14.length==0)
        baseObject_inLocal.chars[13] = '0';
        
    if(baseObject_inLocal.item_15.length==0)
        baseObject_inLocal.chars[14] = '0';
    
    if(baseObject_inLocal.item_16.length==0)
        baseObject_inLocal.chars[15] = '0';
        
    if(baseObject_inLocal.item_17.length==0)
        baseObject_inLocal.chars[16] = '0';
        
    if(baseObject_inLocal.item_18.length==0)
        baseObject_inLocal.chars[17] = '0';
        
    if(baseObject_inLocal.item_19.length==0)
        baseObject_inLocal.chars[18] = '0';
        
    if(baseObject_inLocal.item_20.length==0)
        baseObject_inLocal.chars[19] = '0';
        
    if(baseObject_inLocal.item_21.length==0)
        baseObject_inLocal.chars[20] = '0';

    if(baseObject_inLocal.item_22.length==0)
        baseObject_inLocal.chars[21] = '0';
        
    if(baseObject_inLocal.item_23.length==0)
        baseObject_inLocal.chars[22] = '0';
        
    if(baseObject_inLocal.item_24.length==0)
        baseObject_inLocal.chars[23] = '0';
        
    if(baseObject_inLocal.item_25.length==0)
        baseObject_inLocal.chars[24] = '0';        
            
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
            var remaining_tiles = baseObject_inLocal.item_1.length + baseObject_inLocal.item_2.length + baseObject_inLocal.item_3.length + baseObject_inLocal.item_4.length + baseObject_inLocal.item_5.length + baseObject_inLocal.item_6.length + baseObject_inLocal.item_7.length + baseObject_inLocal.item_8.length + baseObject_inLocal.item_9.length + baseObject_inLocal.item_10.length + baseObject_inLocal.item_11.length + baseObject_inLocal.item_12.length + baseObject_inLocal.item_13.length + baseObject_inLocal.item_14.length + baseObject_inLocal.item_15.length + baseObject_inLocal.item_16.length + baseObject_inLocal.item_17.length + baseObject_inLocal.item_18.length + baseObject_inLocal.item_19.length + baseObject_inLocal.item_20.length + baseObject_inLocal.item_21.length + baseObject_inLocal.item_22.length + baseObject_inLocal.item_23.length + baseObject_inLocal.item_24.length + baseObject_inLocal.item_25.length;
            score_text.setString(parseInt(score_text.getString())+remaining_tiles*10);
            Score_board.setVisible(true);
            Ok_button.setVisible(true);
            Ok_button.flag = 1;
            score_board_score.setString(score_text.getString());
            score_board_score.setVisible(true);
         
            baseObject_inLocal.item_1 = [];
            baseObject_inLocal.item_2 = [];
            baseObject_inLocal.item_3 = [];
            baseObject_inLocal.item_4 = [];
            baseObject_inLocal.item_5 = [];
            baseObject_inLocal.item_6 = [];
            baseObject_inLocal.item_7 = [];
            baseObject_inLocal.item_8 = [];
            baseObject_inLocal.item_9 = [];
            baseObject_inLocal.item_10 = [];
            baseObject_inLocal.item_11 = [];
            baseObject_inLocal.item_12 = [];
            baseObject_inLocal.item_13 = [];
            baseObject_inLocal.item_14 = [];
            baseObject_inLocal.item_15 = [];
            baseObject_inLocal.item_16 = [];
            baseObject_inLocal.item_17 = [];
            baseObject_inLocal.item_18 = [];
            baseObject_inLocal.item_19 = [];
            baseObject_inLocal.item_20 = [];
            baseObject_inLocal.item_21 = [];
            baseObject_inLocal.item_22 = [];
            baseObject_inLocal.item_23 = [];
            baseObject_inLocal.item_24 = [];
            baseObject_inLocal.item_25 = [];
        }
        
}


function Level_3_random_char(v,c, baseObject_fromfunction)
{
    var baseObject_fromfunction_inLocal = baseObject_fromfunction 
    var vowellen = 0, consonantlen = 0;
    var finalArray = new Array();
    var selectvowel = new Array();
    if(v.length==0 && c.length==0)
    {
        var selconso = new Array();
        var vowel = ['a', 'e', 'i', 'o','u'];
        var consonant = ['c', 'd', 'f', 'g', 'h', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'w', 'y'];

        for(var i=0; i<10; i++)
        {
            var vowel1 = vowel[Math.floor(Math.random() * vowel.length)];
            selectvowel.push(vowel1);
        }


        for(var j=0; j<15; j++)
        {
            var consonant1 = consonant[Math.floor(Math.random() * consonant.length)];
            selectvowel.push(consonant1);
        }
    }
    else
    {
        Array.prototype.difference = function(e) {
            return this.filter(function(i) {return e.indexOf(i) < 0;});
        };

        var selconso = new Array();
        var vowel = ['a', 'e', 'i', 'o', 'u'];
        var consonant = ['c', 'd', 'f', 'g', 'h', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'w', 'y'];

    //					count total vowel and consonant in baseObject_fromfunction_inLocal.letterArray array;					
        for(var j=0; j<baseObject_fromfunction_inLocal.letterArray.length; j++)
        {
            var vowelflag = 0, consflag = 0;
            
            if(baseObject_fromfunction_inLocal.letterArray[j]=='a' || baseObject_fromfunction_inLocal.letterArray[j]=='e' || baseObject_fromfunction_inLocal.letterArray[j]=='i' || baseObject_fromfunction_inLocal.letterArray[j]=='o' || baseObject_fromfunction_inLocal.letterArray[j]=='u')
            {
                vowellen++;
            }
            else
            {
                consonantlen++;
            }
        }
        
        for(var i=0; i<vowellen; i++)
        {
            var vowel1 = vowel[Math.floor(Math.random() * vowel.length)];
            selectvowel.push(vowel1);
        }


        for(var j=0; j<consonantlen; j++)
        {
            var consonant1 = consonant[Math.floor(Math.random() * consonant.length)];
            selectvowel.push(consonant1);
        }
    }

    var vv = selectvowel.slice();
    for(var x = 0; x<selectvowel.length; x++)
        {
            var cons = vv[Math.floor(Math.random() * vv.length)];
            vv.splice(vv.indexOf(cons), 1);
            finalArray.push(cons);
        }


    return finalArray;
}