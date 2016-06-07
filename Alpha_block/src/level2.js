/// <reference path="../../cocos2d-typescript-definitions/cocos2d/cocos2d-lib.d.ts" />
/*
var item_1, item_2, item_3, item_4, item_5, item_6, item_7, item_8, item_9, item_10, item_11, item_12, item_13, item_14, item_15, item_16;
var storeLetter, size, self, text, hint_text_n_score_plus, score_text, hint_flag, hint_text, Score_board, Ok_button, score_board_score;

var vowelArray = new Array();
var consonantArray = new Array();


var clickLetter = new Array();
var letterArray = new Array();

var chars=[];
var position = [];

*/
var Level_2_Layer = cc.Layer.extend({

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
        this.Level_2_BG = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("bg/level2_bg.png"), this);
        this.Level_2_BG.attr({
           x : self.size.width/2,
           y : self.size.height/2,
           anchorX : .5,
           anchorY : .5 
        });
        this.addChild(this.Level_2_BG);
        
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
        
        // Red tile  1st line, 1st self.item
       this.Red_tile_shadow_1_1 = new eventListenerClass(res.Red_tile_shadow, this); 
       this.Red_tile_shadow_1_1.attr({
          x : self.size.width*20/100,
          y : self.size.height*80/100,
       });
       this.Red_tile_shadow_1_1.id = "Red_tile_shadow_1_1";
       this.addChild(this.Red_tile_shadow_1_1);
       
       this.Red_tile_1_2 = new eventListenerClass(res.Red_tile, this);
       this.Red_tile_1_2.attr({
          x : this.Red_tile_shadow_1_1.x-10,
          y : this.Red_tile_shadow_1_1.y+10,
       });
       this.Red_tile_1_2.id = "Red_tile_1_2";
       this.addChild(this.Red_tile_1_2);
       
       this.Red_tile_1_3 = new eventListenerClass(res.Red_tile, this); 
       this.Red_tile_1_3.attr({
          x : this.Red_tile_1_2.x-8,
          y : this.Red_tile_1_2.y+8,
          anchorX : 0.5,
          anchorY : 0.5
       });
       this.Red_tile_1_3.id = "Red_tile_1_3";
       this.addChild(this.Red_tile_1_3);
       this.Red_tile_1_3.flag = 0;
       
       self.item_1.push(this.Red_tile_shadow_1_1);
       self.item_1.push(this.Red_tile_1_2);
       self.item_1.push(this.Red_tile_1_3);

       // Cyan tile 1st line, 2nd self.item
       this.Cyan_tile_shadow_2_1 = new eventListenerClass(res.Cyan_tile_shadow, this); 
       this.Cyan_tile_shadow_2_1.attr({
          x : self.size.width*40/100,
          y : self.size.height*80/100,
       });
       this.Cyan_tile_shadow_2_1.id = "Cyan_tile_shadow_2_1";
       this.addChild(this.Cyan_tile_shadow_2_1);
       
       this.Cyan_tile_2_2 = new eventListenerClass(res.Cyan_tile, this); 
       this.Cyan_tile_2_2.attr({
          x : this.Cyan_tile_shadow_2_1.x-10,
          y : this.Cyan_tile_shadow_2_1.y+10,
       });
       this.Cyan_tile_2_2.id = "Cyan_tile_2_2";
       this.addChild(this.Cyan_tile_2_2);

       self.item_2.push(this.Cyan_tile_shadow_2_1);
       self.item_2.push(this.Cyan_tile_2_2);
       this.Cyan_tile_2_2.flag = 0;
       
        // Green tile  1st line, 3rd self.item
       this.Green_tile_shadow_3_1 = new eventListenerClass(res.Green_tile_shadow, this); 
       this.Green_tile_shadow_3_1.attr({
          x : self.size.width*60/100,
          y : self.size.height*80/100,
       });
       this.Green_tile_shadow_3_1.id = "Green_tile_shadow_3_1";
       this.addChild(this.Green_tile_shadow_3_1);
       
       this.Green_tile_3_2 = new eventListenerClass(res.Green_tile, this); 
       this.Green_tile_3_2.attr({
          x : this.Green_tile_shadow_3_1.x-10,
          y : this.Green_tile_shadow_3_1.y+10,
       });
       this.Green_tile_3_2.id = "Green_tile_3_2";
       this.addChild(this.Green_tile_3_2);
       
       this.Green_tile_3_3 = new eventListenerClass(res.Green_tile, this); 
       this.Green_tile_3_3.attr({
          x : this.Green_tile_3_2.x-8,
          y : this.Green_tile_3_2.y+8,
          anchorX : 0.5,
          anchorY : 0.5
       });
       this.Green_tile_3_3.id = "Green_tile_3_3";
       this.addChild(this.Green_tile_3_3);
       this.Green_tile_3_3.flag = 0;
              
       self.item_3.push(this.Green_tile_shadow_3_1);
       self.item_3.push(this.Green_tile_3_2);
       self.item_3.push(this.Green_tile_3_3);
       
        // Pink tile  1st line, 4th self.item
       this.Orange_tile_shadow_4_1 = new eventListenerClass(res.Orange_tile_shadow, this); 
       this.Orange_tile_shadow_4_1.attr({
          x : self.size.width*80/100,
          y : self.size.height*80/100,
       });
       this.Orange_tile_shadow_4_1.id = "Orange_tile_shadow_4_1";
       this.addChild(this.Orange_tile_shadow_4_1);
       this.Orange_tile_shadow_4_1.flag = 0;
       
       self.item_4.push(this.Orange_tile_shadow_4_1);
       
       // Pink tile 2nd line, 1st self.item
       this.Pink_tile_shadow_5_1 = new eventListenerClass(res.Pink_tile_shadow, this); 
       this.Pink_tile_shadow_5_1.attr({
          x : self.size.width*20/100,
          y : self.size.height*70/100,
       });
       this.Pink_tile_shadow_5_1.id = "Pink_tile_shadow_5_1";
       this.addChild(this.Pink_tile_shadow_5_1);
       
       this.Pink_tile_5_2 = new eventListenerClass(res.Pink_tile, this); 
       this.Pink_tile_5_2.attr({
          x : this.Pink_tile_shadow_5_1.x-10,
          y : this.Pink_tile_shadow_5_1.y+10,
       });
       this.Pink_tile_5_2.id = "Pink_tile_5_2";
       this.addChild(this.Pink_tile_5_2);
       
       this.Pink_tile_5_3 = new eventListenerClass(res.Pink_tile, this); 
       this.Pink_tile_5_3.attr({
          x : this.Pink_tile_5_2.x-8,
          y : this.Pink_tile_5_2.y+8,
       });
       this.Pink_tile_5_3.id = "Pink_tile_5_3";
       this.addChild(this.Pink_tile_5_3);
       
       this.Pink_tile_5_4 = new eventListenerClass(res.Pink_tile, this); 
       this.Pink_tile_5_4.attr({
          x : this.Pink_tile_5_3.x-8,
          y : this.Pink_tile_5_3.y+8,
       });
       this.Pink_tile_5_4.id = "Pink_tile_5_4";
       this.addChild(this.Pink_tile_5_4);
       
       this.Pink_tile_5_5 = new eventListenerClass(res.Pink_tile, this); 
       this.Pink_tile_5_5.attr({
          x : this.Pink_tile_5_4.x-8,
          y : this.Pink_tile_5_4.y+8,
       });
       this.Pink_tile_5_5.id = "Pink_tile_5_5";
       this.addChild(this.Pink_tile_5_5);
       this.Pink_tile_5_5.flag = 0;
       
       self.item_5.push(this.Pink_tile_shadow_5_1);
       self.item_5.push(this.Pink_tile_5_2);
       self.item_5.push(this.Pink_tile_5_3);
       self.item_5.push(this.Pink_tile_5_4);
       self.item_5.push(this.Pink_tile_5_5);
       
        // Green tile  2nd line, 2nd self.item
       this.Green_tile_shadow_6_1 = new eventListenerClass(res.Green_tile_shadow, this); 
       this.Green_tile_shadow_6_1.attr({
          x : self.size.width*40/100,
          y : self.size.height*70/100,
       });
       this.Green_tile_shadow_6_1.id = "Green_tile_shadow_6_1";
       this.addChild(this.Green_tile_shadow_6_1);
       
       this.Green_tile_6_2 = new eventListenerClass(res.Green_tile, this); 
       this.Green_tile_6_2.attr({
          x : this.Green_tile_shadow_6_1.x-10,
          y : this.Green_tile_shadow_6_1.y+10,
       });
       this.Green_tile_6_2.id = "Green_tile_6_2";
       this.addChild(this.Green_tile_6_2);
       
       this.Green_tile_6_3 = new eventListenerClass(res.Green_tile, this); 
       this.Green_tile_6_3.attr({
          x : this.Green_tile_6_2.x-8,
          y : this.Green_tile_6_2.y+8,
          anchorX : 0.5,
          anchorY : 0.5
       });
       this.Green_tile_6_3.id = "Green_tile_6_3";
       this.addChild(this.Green_tile_6_3);
       this.Green_tile_6_3.flag = 0;
       
       self.item_6.push(this.Green_tile_shadow_6_1);
       self.item_6.push(this.Green_tile_6_2);
       self.item_6.push(this.Green_tile_6_3);
       
        // Cyan tile  2nd line, 3rd self.item
       this.Cyan_tile_shadow_7_1 = new eventListenerClass(res.Cyan_tile_shadow, this); 
       this.Cyan_tile_shadow_7_1.attr({
          x : self.size.width*60/100,
          y : self.size.height*70/100,
       });
       this.Cyan_tile_shadow_7_1.id = "Cyan_tile_shadow_7_1";
       this.addChild(this.Cyan_tile_shadow_7_1);

       this.Cyan_tile_7_2 = new eventListenerClass(res.Cyan_tile, this); 
       this.Cyan_tile_7_2.attr({
          x : this.Cyan_tile_shadow_7_1.x-8,
          y : this.Cyan_tile_shadow_7_1.y+8,
          anchorX : 0.5,
          anchorY : 0.5
       });
       this.Cyan_tile_7_2.id = "Cyan_tile_7_2";
       this.addChild(this.Cyan_tile_7_2);
       this.Cyan_tile_7_2.flag = 0;
              
       self.item_7.push(this.Cyan_tile_shadow_7_1);
       self.item_7.push(this.Cyan_tile_7_2);
       
       // Red tile 2nd line, 4th self.item
       this.Red_tile_shadow_8_1 = new eventListenerClass(res.Red_tile_shadow, this); 
       this.Red_tile_shadow_8_1.attr({
          x : self.size.width*80/100,
          y : self.size.height*70/100,
       });
       this.Red_tile_shadow_8_1.id = "Red_tile_shadow_8_1";
       this.addChild(this.Red_tile_shadow_8_1);
       
       this.Red_tile_8_2 = new eventListenerClass(res.Red_tile, this); 
       this.Red_tile_8_2.attr({
          x : this.Red_tile_shadow_8_1.x-10,
          y : this.Red_tile_shadow_8_1.y+10,
       });
       this.Red_tile_8_2.id = "Red_tile_8_2";
       this.addChild(this.Red_tile_8_2);
       this.Red_tile_8_2.flag = 0;

       self.item_8.push(this.Red_tile_shadow_8_1);
       self.item_8.push(this.Red_tile_8_2);

        // Orange tile  3rd line, 1st self.item
       this.Orange_tile_shadow_9_1 = new eventListenerClass(res.Orange_tile_shadow, this); 
       this.Orange_tile_shadow_9_1.attr({
          x : self.size.width*20/100,
          y : self.size.height*60/100,
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


        // Red tile  3rd line, 2nd self.item
       this.Red_tile_shadow_10_1 = new eventListenerClass(res.Red_tile_shadow, this); 
       this.Red_tile_shadow_10_1.attr({
          x : self.size.width*40/100,
          y : self.size.height*60/100,
       });
       this.Red_tile_shadow_10_1.id = "Red_tile_shadow_10_1";
       this.addChild(this.Red_tile_shadow_10_1);
       
       this.Red_tile_10_2 = new eventListenerClass(res.Red_tile, this);
       this.Red_tile_10_2.attr({
          x : this.Red_tile_shadow_10_1.x-10,
          y : this.Red_tile_shadow_10_1.y+10,
       });
       this.Red_tile_10_2.id = "Red_tile_10_2";
       this.addChild(this.Red_tile_10_2);
       
       this.Red_tile_10_3 = new eventListenerClass(res.Red_tile, this); 
       this.Red_tile_10_3.attr({
          x : this.Red_tile_10_2.x-8,
          y : this.Red_tile_10_2.y+8,
          anchorX : 0.5,
          anchorY : 0.5
       });
       this.Red_tile_10_3.id = "Red_tile_10_3";
       this.addChild(this.Red_tile_10_3);
       this.Red_tile_10_3.flag = 0;
       
       self.item_10.push(this.Red_tile_shadow_10_1);
       self.item_10.push(this.Red_tile_10_2);
       self.item_10.push(this.Red_tile_10_3);

       // Orange tile 3rd line, 3rd self.item
       this.Orange_tile_shadow_11_1 = new eventListenerClass(res.Orange_tile_shadow, this); 
       this.Orange_tile_shadow_11_1.attr({
          x : self.size.width*60/100,
          y : self.size.height*60/100,
       });
       this.Orange_tile_shadow_11_1.id = "Orange_tile_shadow_11_1";
       this.addChild(this.Orange_tile_shadow_11_1);
       
       this.Orange_tile_11_2 = new eventListenerClass(res.Orange_tile, this); 
       this.Orange_tile_11_2.attr({
          x : this.Orange_tile_shadow_11_1.x-10,
          y : this.Orange_tile_shadow_11_1.y+10,
       });
       this.Orange_tile_11_2.id = "Orange_tile_11_2";
       this.addChild(this.Orange_tile_11_2);

       self.item_11.push(this.Orange_tile_shadow_11_1);
       self.item_11.push(this.Orange_tile_11_2);
       this.Orange_tile_11_2.flag = 0;
       
        // Green tile  3rd line, 4th self.item
       this.Green_tile_shadow_12_1 = new eventListenerClass(res.Green_tile_shadow, this); 
       this.Green_tile_shadow_12_1.attr({
          x : self.size.width*80/100,
          y : self.size.height*60/100,
       });
       this.Green_tile_shadow_12_1.id = "Green_tile_shadow_12_1";
       this.addChild(this.Green_tile_shadow_12_1);
       
       this.Green_tile_12_2 = new eventListenerClass(res.Green_tile, this); 
       this.Green_tile_12_2.attr({
          x : this.Green_tile_shadow_12_1.x-10,
          y : this.Green_tile_shadow_12_1.y+10,
       });
       this.Green_tile_12_2.id = "Green_tile_12_2";
       this.addChild(this.Green_tile_12_2);
       
       this.Green_tile_12_3 = new eventListenerClass(res.Green_tile, this); 
       this.Green_tile_12_3.attr({
          x : this.Green_tile_12_2.x-8,
          y : this.Green_tile_12_2.y+8,
          anchorX : 0.5,
          anchorY : 0.5
       });
       this.Green_tile_12_3.id = "Green_tile_12_3";
       this.addChild(this.Green_tile_12_3);
       this.Green_tile_12_3.flag = 0;
              
       self.item_12.push(this.Green_tile_shadow_12_1);
       self.item_12.push(this.Green_tile_12_2);
       self.item_12.push(this.Green_tile_12_3);
       
        // Cyan tile  4th line, 1st self.item
       this.Cyan_tile_shadow_13_1 = new eventListenerClass(res.Cyan_tile_shadow, this); 
       this.Cyan_tile_shadow_13_1.attr({
          x : self.size.width*20/100,
          y : self.size.height*50/100,
       });
       this.Cyan_tile_shadow_13_1.id = "Cyan_tile_shadow_13_1";
       this.addChild(this.Cyan_tile_shadow_13_1);
       this.Cyan_tile_shadow_13_1.flag = 0;
       
       self.item_13.push(this.Cyan_tile_shadow_13_1);
       
       // Orange tile 4th line, 2nd self.item
       this.Orange_tile_shadow_14_1 = new eventListenerClass(res.Orange_tile_shadow, this); 
       this.Orange_tile_shadow_14_1.attr({
          x : self.size.width*40/100,
          y : self.size.height*50/100,
       });
       this.Orange_tile_shadow_14_1.id = "Orange_tile_shadow_14_1";
       this.addChild(this.Orange_tile_shadow_14_1);
       
       this.Orange_tile_14_2 = new eventListenerClass(res.Orange_tile, this);
       this.Orange_tile_14_2.attr({
          x : this.Orange_tile_shadow_14_1.x-10,
          y : this.Orange_tile_shadow_14_1.y+10,
       });
       this.Orange_tile_14_2.id = "Orange_tile_14_2";
       this.addChild(this.Orange_tile_14_2);
       
       this.Orange_tile_14_3 = new eventListenerClass(res.Orange_tile, this); 
       this.Orange_tile_14_3.attr({
          x : this.Orange_tile_14_2.x-8,
          y : this.Orange_tile_14_2.y+8,
       });
       this.Orange_tile_14_3.id = "Orange_tile_14_3";
       this.addChild(this.Orange_tile_14_3);
       
       this.Orange_tile_14_4 = new eventListenerClass(res.Orange_tile, this); 
       this.Orange_tile_14_4.attr({
          x : this.Orange_tile_14_3.x-8,
          y : this.Orange_tile_14_3.y+8,
       });
       this.Orange_tile_14_4.id = "Orange_tile_14_4";
       this.addChild(this.Orange_tile_14_4);
       
       this.Orange_tile_14_5 = new eventListenerClass(res.Orange_tile, this); 
       this.Orange_tile_14_5.attr({
          x : this.Orange_tile_14_4.x-8,
          y : this.Orange_tile_14_4.y+8,
       });
       this.Orange_tile_14_5.id = "Orange_tile_14_5";
       this.addChild(this.Orange_tile_14_5);
       this.Orange_tile_14_5.flag = 0;
       
       self.item_14.push(this.Orange_tile_shadow_14_1);
       self.item_14.push(this.Orange_tile_14_2);
       self.item_14.push(this.Orange_tile_14_3);
       self.item_14.push(this.Orange_tile_14_4);
       self.item_14.push(this.Orange_tile_14_5);
       
        // Orange tile  4th line, 3rd self.item
       this.Orange_tile_shadow_15_1 = new eventListenerClass(res.Orange_tile_shadow, this); 
       this.Orange_tile_shadow_15_1.attr({
          x : self.size.width*60/100,
          y : self.size.height*50/100,
       });
       this.Orange_tile_shadow_15_1.id = "Orange_tile_shadow_15_1";
       this.addChild(this.Orange_tile_shadow_15_1);
       
       this.Orange_tile_15_2 = new eventListenerClass(res.Orange_tile, this); 
       this.Orange_tile_15_2.attr({
          x : this.Orange_tile_shadow_15_1.x-10,
          y : this.Orange_tile_shadow_15_1.y+10,
       });
       this.Orange_tile_15_2.id = "Orange_tile_15_2";
       this.addChild(this.Orange_tile_15_2);
       
       this.Orange_tile_15_3 = new eventListenerClass(res.Orange_tile, this); 
       this.Orange_tile_15_3.attr({
          x : this.Orange_tile_15_2.x-8,
          y : this.Orange_tile_15_2.y+8,
          anchorX : 0.5,
          anchorY : 0.5
       });
       this.Orange_tile_15_3.id = "Orange_tile_15_3";
       this.addChild(this.Orange_tile_15_3);
       this.Orange_tile_15_3.flag = 0;
       
       self.item_15.push(this.Orange_tile_shadow_15_1);
       self.item_15.push(this.Orange_tile_15_2);
       self.item_15.push(this.Orange_tile_15_3);
       
        // Green tile  4th line, 4th self.item
       this.Green_tile_shadow_16_1 = new eventListenerClass(res.Green_tile_shadow, this); 
       this.Green_tile_shadow_16_1.attr({
          x : self.size.width*80/100,
          y : self.size.height*50/100,
       });
       this.Green_tile_shadow_16_1.id = "Green_tile_shadow_16_1";
       this.addChild(this.Green_tile_shadow_16_1);

       this.Green_tile_16_2 = new eventListenerClass(res.Green_tile, this); 
       this.Green_tile_16_2.attr({
          x : this.Green_tile_shadow_16_1.x-8,
          y : this.Green_tile_shadow_16_1.y+8,
          anchorX : 0.5,
          anchorY : 0.5
       });
       this.Green_tile_16_2.id = "Green_tile_16_2";
       this.addChild(this.Green_tile_16_2);
       this.Green_tile_16_2.flag = 0;
              
       self.item_16.push(this.Green_tile_shadow_16_1);
       self.item_16.push(this.Green_tile_16_2);


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
       this.Correct_Button.id = "Correct_Button_Level_2_5";
              
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
           x : self.size.width*35/100,
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
       this.score_text = new cc.LabelTTF("0", "Century Ghotic", "150");
       this.score_text.attr({
          x : self.size.width*90/100,
          y : self.size.height*95/100,
          anchorX : .5,
          anchorY : .5 
       });
       this.addChild(this.score_text);
       this.score_text.setColor(cc.color("#ffffff"));
       
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
       
       Level_2_mainFunction(this);

        var wid = self.size.width;
        var hei = self.size.height;

        self.position = [
{x:wid*19/100, y:hei*80.5/100}, {x:wid*39/100, y:hei*80.5/100}, {x:wid*59/100, y:hei*80.5/100}, {x:wid*79.5/100, y:hei*80/100}, 
{x:wid*17.5/100, y:hei*71/100}, {x:wid*39/100, y:hei*70.5/100}, {x:wid*59.5/100, y:hei*70/100}, {x:wid*79/100, y:hei*70.5/100},
{x:wid*18.5/100, y:hei*60.5/100}, {x:wid*38.5/100, y:hei*60.5/100}, {x:wid*59/100, y:hei*60/100}, {x:wid*78.5/100, y:hei*60.5/100}, 
{x:wid*20/100, y:hei*50/100}, {x:wid*37.8/100, y:hei*51/100}, {x:wid*58.5/100, y:hei*51/100}, {x:wid*79.5/100, y:hei*50/100},];

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
            chars_id++;
            self.clickLetter.push(v);
//            cc.eventManager.addListener(level2_sprite_click.clone(), v);
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
            this.Ok_button.id = "Ok_button_Level_2";
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

/*
    // click event listener
    cc.eventManager.addListener(level2_sprite_click.clone(), this.Red_tile_shadow_1_1);
    cc.eventManager.addListener(level2_sprite_click.clone(), this.Red_tile_1_2);
    cc.eventManager.addListener(level2_sprite_click.clone(), this.Red_tile_1_3);

    cc.eventManager.addListener(level2_sprite_click.clone(), this.Cyan_tile_shadow_2_1);
    cc.eventManager.addListener(level2_sprite_click.clone(), this.Cyan_tile_2_2);

    cc.eventManager.addListener(level2_sprite_click.clone(), this.Green_tile_shadow_3_1);
    cc.eventManager.addListener(level2_sprite_click.clone(), this.Green_tile_3_2);
    cc.eventManager.addListener(level2_sprite_click.clone(), this.Green_tile_3_3);

    cc.eventManager.addListener(level2_sprite_click.clone(), this.Orange_tile_shadow_4_1);

    cc.eventManager.addListener(level2_sprite_click.clone(), this.Pink_tile_shadow_5_1);
    cc.eventManager.addListener(level2_sprite_click.clone(), this.Pink_tile_5_2);
    cc.eventManager.addListener(level2_sprite_click.clone(), this.Pink_tile_5_3);
    cc.eventManager.addListener(level2_sprite_click.clone(), this.Pink_tile_5_4);
    cc.eventManager.addListener(level2_sprite_click.clone(), this.Pink_tile_5_5);

    cc.eventManager.addListener(level2_sprite_click.clone(), this.Green_tile_shadow_6_1);
    cc.eventManager.addListener(level2_sprite_click.clone(), this.Green_tile_6_2);
    cc.eventManager.addListener(level2_sprite_click.clone(), this.Green_tile_6_3);

    cc.eventManager.addListener(level2_sprite_click.clone(), this.Cyan_tile_shadow_7_1);
    cc.eventManager.addListener(level2_sprite_click.clone(), this.Cyan_tile_7_2);

    cc.eventManager.addListener(level2_sprite_click.clone(), this.Red_tile_shadow_8_1);
    cc.eventManager.addListener(level2_sprite_click.clone(), this.Red_tile_8_2);

    cc.eventManager.addListener(level2_sprite_click.clone(), this.Orange_tile_shadow_9_1);
    cc.eventManager.addListener(level2_sprite_click.clone(), this.Orange_tile_9_2);
    cc.eventManager.addListener(level2_sprite_click.clone(), this.Orange_tile_9_3);
    
    cc.eventManager.addListener(level2_sprite_click.clone(), this.Red_tile_shadow_10_1);
    cc.eventManager.addListener(level2_sprite_click.clone(), this.Red_tile_10_2);
    cc.eventManager.addListener(level2_sprite_click.clone(), this.Red_tile_10_3);
    
    cc.eventManager.addListener(level2_sprite_click.clone(), this.Orange_tile_shadow_11_1);
    cc.eventManager.addListener(level2_sprite_click.clone(), this.Orange_tile_11_2);
    
    cc.eventManager.addListener(level2_sprite_click.clone(), this.Green_tile_shadow_12_1);
    cc.eventManager.addListener(level2_sprite_click.clone(), this.Green_tile_12_2);
    cc.eventManager.addListener(level2_sprite_click.clone(), this.Green_tile_12_3);

    cc.eventManager.addListener(level2_sprite_click.clone(), this.Cyan_tile_shadow_13_1)
    
    cc.eventManager.addListener(level2_sprite_click.clone(), this.Orange_tile_shadow_14_1);
    cc.eventManager.addListener(level2_sprite_click.clone(), this.Orange_tile_14_2);
    cc.eventManager.addListener(level2_sprite_click.clone(), this.Orange_tile_14_3);
    cc.eventManager.addListener(level2_sprite_click.clone(), this.Orange_tile_14_4);
    cc.eventManager.addListener(level2_sprite_click.clone(), this.Orange_tile_14_5);
    
    cc.eventManager.addListener(level2_sprite_click.clone(), this.Orange_tile_shadow_15_1);
    cc.eventManager.addListener(level2_sprite_click.clone(), this.Orange_tile_15_2);
    cc.eventManager.addListener(level2_sprite_click.clone(), this.Orange_tile_15_3);
    
    cc.eventManager.addListener(level2_sprite_click.clone(), this.Green_tile_shadow_16_1);
    cc.eventManager.addListener(level2_sprite_click.clone(), this.Green_tile_16_2);
    
    cc.eventManager.addListener(level2_sprite_click.clone(), this.Hint_Button);
    cc.eventManager.addListener(level2_sprite_click.clone(), this.Correct_Button);
    cc.eventManager.addListener(level2_sprite_click.clone(), this.Wrong_Button);
    cc.eventManager.addListener(level2_sprite_click.clone(), this.Home);    
    cc.eventManager.addListener(level2_sprite_click.clone(), Ok_button);    
*/    }
});

/*
var level2_sprite_click = cc.EventListener.create({event: cc.EventListener.TOUCH_ONE_BY_ONE, swallowTouches: true,
  onTouchBegan: function (touch, event) {
      
    var target = event.getCurrentTarget();
    var location = target.convertToNodeSpace(touch.getLocation());
    var targetSize = target.getContentSize();
    var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);
    
     if (cc.rectContainsPoint(targetRectangle, location))
      {
          if(item_1.length>=1 && target.id==item_1[item_1.length-1].id && letterArray.length<12)
          {
              if(item_1[item_1.length-1].flag==0)
              {
                item_1[item_1.length-1].x = item_1[item_1.length-1].x-8;
                item_1[item_1.length-1].y = item_1[item_1.length-1].y+8;
                item_1[item_1.length-1].flag = 1;
                storeLetter.push(item_1);
                
                letterArray.push(chars[0]);
                clickLetter[0].x = clickLetter[0].x-8;
                clickLetter[0].y = clickLetter[0].y+8;
                
                text.setString(letterArray.join(""));
                var ch = checkWord(letterArray);
                if(ch==1)
                {
                    text.setFontFillColor(cc.color("#368e3c"));
                }
                else
                    text.setFontFillColor(cc.color("#000000")); 
                    
                sorryText.setString("");
              }
          }
          else if(item_2.length>=1 && target.id==item_2[item_2.length-1].id && letterArray.length<12)
          {
              if(item_2[item_2.length-1].flag==0)
              {
                item_2[item_2.length-1].x = item_2[item_2.length-1].x-8;
                item_2[item_2.length-1].y = item_2[item_2.length-1].y+8;
                item_2[item_2.length-1].flag = 1;
                storeLetter.push(item_2);
                
                letterArray.push(chars[1]);
                clickLetter[1].x = clickLetter[1].x-8;
                clickLetter[1].y = clickLetter[1].y+8;
                
                text.setString(letterArray.join(""));
                var ch = checkWord(letterArray);
                if(ch==1)
                {
                    text.setFontFillColor(cc.color("#368e3c"));
                }
                else
                    text.setFontFillColor(cc.color("#000000")); 
                    
                sorryText.setString("");
              }
          }
          else if(item_3.length>=1 && target.id==item_3[item_3.length-1].id && letterArray.length<12)
          {
              if(item_3[item_3.length-1].flag==0)
              {
                item_3[item_3.length-1].x = item_3[item_3.length-1].x-8;
                item_3[item_3.length-1].y = item_3[item_3.length-1].y+8;
                item_3[item_3.length-1].flag = 1;
                storeLetter.push(item_3);
                
                letterArray.push(chars[2]);
                clickLetter[2].x = clickLetter[2].x-8;
                clickLetter[2].y = clickLetter[2].y+8;
                
                text.setString(letterArray.join(""));
                var ch = checkWord(letterArray);
                if(ch==1)
                {
                    text.setFontFillColor(cc.color("#368e3c"));
                }
                else
                    text.setFontFillColor(cc.color("#000000")); 

                sorryText.setString("");
            }
          }
          else if(item_4.length>=1 && target.id==item_4[item_4.length-1].id && letterArray.length<12)
          {
              if(item_4[item_4.length-1].flag==0)
              {
                item_4[item_4.length-1].x = item_4[item_4.length-1].x-8;
                item_4[item_4.length-1].y = item_4[item_4.length-1].y+8;
                item_4[item_4.length-1].flag = 1;
                storeLetter.push(item_4);
                
                letterArray.push(chars[3]);
                clickLetter[3].x = clickLetter[3].x-8;
                clickLetter[3].y = clickLetter[3].y+8;
                
                text.setString(letterArray.join(""));
                var ch = checkWord(letterArray);
                if(ch==1)
                {
                    text.setFontFillColor(cc.color("#368e3c"));
                }
                else
                    text.setFontFillColor(cc.color("#000000")); 
                    
                sorryText.setString("");
              }
          }
          else if(item_5.length>=1 && target.id==item_5[item_5.length-1].id && letterArray.length<12)
          {
              if(item_5[item_5.length-1].flag==0)
              {
                item_5[item_5.length-1].x = item_5[item_5.length-1].x-8;
                item_5[item_5.length-1].y = item_5[item_5.length-1].y+8;
                item_5[item_5.length-1].flag = 1;
                storeLetter.push(item_5);
                
                letterArray.push(chars[4]);
                clickLetter[4].x = clickLetter[4].x-8;
                clickLetter[4].y = clickLetter[4].y+8;
                
                text.setString(letterArray.join(""));
                var ch = checkWord(letterArray);
                if(ch==1)
                {
                    text.setFontFillColor(cc.color("#368e3c"));
                }
                else
                    text.setFontFillColor(cc.color("#000000")); 
                    
                sorryText.setString("");
              }
          }
          else if(item_6.length>=1 && target.id==item_6[item_6.length-1].id && letterArray.length<12)
          {
              if(item_6[item_6.length-1].flag==0)
              {
                item_6[item_6.length-1].x = item_6[item_6.length-1].x-8;
                item_6[item_6.length-1].y = item_6[item_6.length-1].y+8;
                item_6[item_6.length-1].flag = 1;
                storeLetter.push(item_6);
                
                letterArray.push(chars[5]);
                clickLetter[5].x = clickLetter[5].x-8;
                clickLetter[5].y = clickLetter[5].y+8;
                
                text.setString(letterArray.join(""));
                var ch = checkWord(letterArray);
                if(ch==1)
                {
                    text.setFontFillColor(cc.color("#368e3c"));
                }
                else
                    text.setFontFillColor(cc.color("#000000")); 
                    
                sorryText.setString("");
              }
          }
          else if(item_7.length>=1 && target.id==item_7[item_7.length-1].id && letterArray.length<12)
          {
              if(item_7[item_7.length-1].flag==0)
              {
                item_7[item_7.length-1].x = item_7[item_7.length-1].x-8;
                item_7[item_7.length-1].y = item_7[item_7.length-1].y+8;
                item_7[item_7.length-1].flag = 1;
                storeLetter.push(item_7);
                
                letterArray.push(chars[6]);
                clickLetter[6].x = clickLetter[6].x-8;
                clickLetter[6].y = clickLetter[6].y+8;
                
                text.setString(letterArray.join(""));
                var ch = checkWord(letterArray);
                if(ch==1)
                {
                    text.setFontFillColor(cc.color("#368e3c"));
                }
                else
                    text.setFontFillColor(cc.color("#000000")); 
                    
                sorryText.setString("");
              }
          }
          else if(item_8.length>=1 && target.id==item_8[item_8.length-1].id && letterArray.length<12)
          {
              if(item_8[item_8.length-1].flag==0)
              {
                item_8[item_8.length-1].x = item_8[item_8.length-1].x-8;
                item_8[item_8.length-1].y = item_8[item_8.length-1].y+8;
                item_8[item_8.length-1].flag = 1;
                storeLetter.push(item_8);
                
                letterArray.push(chars[7]);
                clickLetter[7].x = clickLetter[7].x-8;
                clickLetter[7].y = clickLetter[7].y+8;
                
                text.setString(letterArray.join(""));
                var ch = checkWord(letterArray);
                if(ch==1)
                {
                    text.setFontFillColor(cc.color("#368e3c"));
                }
                else
                    text.setFontFillColor(cc.color("#000000")); 
                    
                sorryText.setString("");
              }
          }
          else if(item_9.length>=1 && target.id==item_9[item_9.length-1].id && letterArray.length<12)
          {
              if(item_9[item_9.length-1].flag==0)
              {
                item_9[item_9.length-1].x = item_9[item_9.length-1].x-8;
                item_9[item_9.length-1].y = item_9[item_9.length-1].y+8;
                item_9[item_9.length-1].flag = 1;
                storeLetter.push(item_9);
                
                letterArray.push(chars[8]);
                clickLetter[8].x = clickLetter[8].x-8;
                clickLetter[8].y = clickLetter[8].y+8;
                
                text.setString(letterArray.join(""));
                var ch = checkWord(letterArray);
                if(ch==1)
                {
                    text.setFontFillColor(cc.color("#368e3c"));
                }
                else
                    text.setFontFillColor(cc.color("#000000"));
                    
                sorryText.setString("");
              }
          }
          if(item_10.length>=1 && target.id==item_10[item_10.length-1].id && letterArray.length<12)
          {
              if(item_10[item_10.length-1].flag==0)
              {
                item_10[item_10.length-1].x = item_10[item_10.length-1].x-8;
                item_10[item_10.length-1].y = item_10[item_10.length-1].y+8;
                item_10[item_10.length-1].flag = 1;
                storeLetter.push(item_10);
                
                letterArray.push(chars[9]);
                clickLetter[9].x = clickLetter[9].x-8;
                clickLetter[9].y = clickLetter[9].y+8;
                
                text.setString(letterArray.join(""));
                var ch = checkWord(letterArray);
                if(ch==1)
                {
                    text.setFontFillColor(cc.color("#368e3c"));
                }
                else
                    text.setFontFillColor(cc.color("#000000")); 
                    
                sorryText.setString("");
              }
          }
          if(item_11.length>=1 && target.id==item_11[item_11.length-1].id && letterArray.length<12)
          {
              if(item_11[item_11.length-1].flag==0)
              {
                item_11[item_11.length-1].x = item_11[item_11.length-1].x-8;
                item_11[item_11.length-1].y = item_11[item_11.length-1].y+8;
                item_11[item_11.length-1].flag = 1;
                storeLetter.push(item_11);
                
                letterArray.push(chars[10]);
                clickLetter[10].x = clickLetter[10].x-8;
                clickLetter[10].y = clickLetter[10].y+8;
                
                text.setString(letterArray.join(""));
                var ch = checkWord(letterArray);
                if(ch==1)
                {
                    text.setFontFillColor(cc.color("#368e3c"));
                }
                else
                    text.setFontFillColor(cc.color("#000000")); 
                    
                sorryText.setString("");
              }
          }
          else if(item_12.length>=1 && target.id==item_12[item_12.length-1].id && letterArray.length<12)
          {
              if(item_12[item_12.length-1].flag==0)
              {
                item_12[item_12.length-1].x = item_12[item_12.length-1].x-8;
                item_12[item_12.length-1].y = item_12[item_12.length-1].y+8;
                item_12[item_12.length-1].flag = 1;
                storeLetter.push(item_12);
                
                letterArray.push(chars[11]);
                clickLetter[11].x = clickLetter[11].x-8;
                clickLetter[11].y = clickLetter[11].y+8;
                
                text.setString(letterArray.join(""));
                var ch = checkWord(letterArray);
                if(ch==1)
                {
                    text.setFontFillColor(cc.color("#368e3c"));
                }
                else
                    text.setFontFillColor(cc.color("#000000")); 
                    
                sorryText.setString("");
              }
          }
          else if(item_13.length>=1 && target.id==item_13[item_13.length-1].id && letterArray.length<12)
          {
              if(item_13[item_13.length-1].flag==0)
              {
                item_13[item_13.length-1].x = item_13[item_13.length-1].x-8;
                item_13[item_13.length-1].y = item_13[item_13.length-1].y+8;
                item_13[item_13.length-1].flag = 1;
                storeLetter.push(item_13);
                
                letterArray.push(chars[12]);
                clickLetter[12].x = clickLetter[12].x-8;
                clickLetter[12].y = clickLetter[12].y+8;
                
                text.setString(letterArray.join(""));
                var ch = checkWord(letterArray);
                if(ch==1)
                {
                    text.setFontFillColor(cc.color("#368e3c"));
                }
                else
                    text.setFontFillColor(cc.color("#000000")); 

                sorryText.setString("");
            }
          }
          else if(item_14.length>=1 && target.id==item_14[item_14.length-1].id && letterArray.length<12)
          {
              if(item_14[item_14.length-1].flag==0)
              {
                item_14[item_14.length-1].x = item_14[item_14.length-1].x-8;
                item_14[item_14.length-1].y = item_14[item_14.length-1].y+8;
                item_14[item_14.length-1].flag = 1;
                storeLetter.push(item_14);
                
                letterArray.push(chars[13]);
                clickLetter[13].x = clickLetter[13].x-8;
                clickLetter[13].y = clickLetter[13].y+8;
                
                text.setString(letterArray.join(""));
                var ch = checkWord(letterArray);
                if(ch==1)
                {
                    text.setFontFillColor(cc.color("#368e3c"));
                }
                else
                    text.setFontFillColor(cc.color("#000000")); 
                    
                sorryText.setString("");
              }
          }
          else if(item_15.length>=1 && target.id==item_15[item_15.length-1].id && letterArray.length<12)
          {
              if(item_15[item_15.length-1].flag==0)
              {
                item_15[item_15.length-1].x = item_15[item_15.length-1].x-8;
                item_15[item_15.length-1].y = item_15[item_15.length-1].y+8;
                item_15[item_15.length-1].flag = 1;
                storeLetter.push(item_15);
                
                letterArray.push(chars[14]);
                clickLetter[14].x = clickLetter[14].x-8;
                clickLetter[14].y = clickLetter[14].y+8;
                
                text.setString(letterArray.join(""));
                var ch = checkWord(letterArray);
                if(ch==1)
                {
                    text.setFontFillColor(cc.color("#368e3c"));
                }
                else
                    text.setFontFillColor(cc.color("#000000")); 
                    
                sorryText.setString("");
              }
          }
          else if(item_16.length>=1 && target.id==item_16[item_16.length-1].id && letterArray.length<12)
          {
              if(item_16[item_16.length-1].flag==0)
              {
                item_16[item_16.length-1].x = item_16[item_16.length-1].x-8;
                item_16[item_16.length-1].y = item_16[item_16.length-1].y+8;
                item_16[item_16.length-1].flag = 1;
                storeLetter.push(item_16);
                
                letterArray.push(chars[15]);
                clickLetter[15].x = clickLetter[15].x-8;
                clickLetter[15].y = clickLetter[15].y+8;
                
                text.setString(letterArray.join(""));
                var ch = checkWord(letterArray);
                if(ch==1)
                {
                    text.setFontFillColor(cc.color("#368e3c"));
                }
                else
                    text.setFontFillColor(cc.color("#000000")); 
                    
                sorryText.setString("");
              }
          }
          else if(target.id=="Correct_Button")
          {
              console.log('correct');
              var ch = checkWord(letterArray);
              
			if(ch==0 || letterArray.length<=1)
			{
//				sorryText.text = 'Invalid';
				console.log('no');
                sorryText.setString("Invalid");
			}
            else
            {
                sorryText.setString("Correct");
                text.setString("");
				var lenvowel = 0, lencon = 0;
				for(var i=0; i<letterArray.length; i++)
				{
					var ind = chars.indexOf(letterArray[i]);

                    var val = storeLetter[i];
					if(letterArray[i]=='a' || letterArray[i]=='e' || letterArray[i]=='i' || letterArray[i]=='o' || letterArray[i]=='u')
					{
						lenvowel++;
					}
					else
					{
						lencon++;
					}	
                    
                    clickLetter[ind].runAction(cc.MoveTo.create(.2, cc.p(size.width*90/100, size.height*95/100)));
                    val[val.length-1].runAction(cc.MoveTo.create(.2, cc.p(size.width*90/100, size.height*95/100)));
				}
                
                var sc = parseInt(score_text.getString());
                hint_text_n_score_plus.setVisible(true);
                if(letterArray.length==2)
                    {
                        score_text.setString(sc + 20);
                        hint_text_n_score_plus.setString('+20');
                    }                    
                else if(letterArray.length==3)
                    {
                        hint_text_n_score_plus.setString('+40');
                        score_text.setString(sc + 40);
                    }
                else if(letterArray.length==4)
                {
                        hint_text_n_score_plus.setString('+60');
                        score_text.setString(sc + 60);
                }                    
                else if(letterArray.length==5)
                {
                        hint_text_n_score_plus.setString('+70');
                        score_text.setString(sc + 70);
                }
                else if(letterArray.length==6)
                {
                        hint_text_n_score_plus.setString('+90');
                        score_text.setString(sc + 90);
                }
                else if(letterArray.length==7)
                {
                        hint_text_n_score_plus.setString('+100');
                        score_text.setString(sc + 100);
                }
                else if(letterArray.length==8)
                {
                        hint_text_n_score_plus.setString('+120');
                        score_text.setString(sc + 120);
                }
                else if(letterArray.length==9)
                {
                        hint_text_n_score_plus.setString('+130');
                        score_text.setString(sc + 130);
                }
                else if(letterArray.length==10)
                {
                        hint_text_n_score_plus.setString('+150');
                        score_text.setString(sc + 150);
                }
                else if(letterArray.length==11)
                {
                        hint_text_n_score_plus.setString('+170');
                        score_text.setString(sc + 170);
                }
                else if(letterArray.length==12)
                {
                        hint_text_n_score_plus.setString('+200');
                        score_text.setString(sc + 200);
                }
                                
                setTimeout(function(){
                    hint_text_n_score_plus.setVisible(false);
                    for(var i=0; i<letterArray.length; i++)
                    {
                        var ind = chars.indexOf(letterArray[i]);
                        var val = storeLetter[i];
                        self.removeChild(val[val.length-1]);
                        self.removeChild(clickLetter[ind]);
                        val.pop();
                        if(val.length>0)
                        {
                            val[val.length-1].flag = 0;
                        }
                    }
                    sorryText.setString("");
                    hint_flag = 0;
                    Level_2_mainFunction();
                },300);
            }
          }
          else if(target.id=="Wrong_Button")
          {
              if(storeLetter.length>0)
              {
                    var item = storeLetter[storeLetter.length-1];
                    item[item.length-1].x = item[item.length-1].x + 8;
                    item[item.length-1].y = item[item.length-1].y - 8;
                    item[item.length-1].flag = 0;
                    storeLetter.pop();
                    
                    var letter = letterArray[letterArray.length-1];
                    clickLetter[chars.indexOf(letter)].x = clickLetter[chars.indexOf(letter)].x+8;
                    clickLetter[chars.indexOf(letter)].y = clickLetter[chars.indexOf(letter)].y-8;
                    letterArray.pop();
                    
                    text.setString(letterArray.join(""));
                    var ch = checkWord(letterArray);
                    if(ch==1)
                    {
                        text.setFontFillColor(cc.color("#368e3c"));
                    }
                    else
                        text.setFontFillColor(cc.color("#000000")); 
                        
                sorryText.setString("");
              }
          }
          else if(target.id=="Hint_Button")
          {// first time hint button is clicked
              if(hint_flag==0)
              {
                  var sc = parseInt(score_text.getString());
                  if(sc>=10)
                  {
                      var res = 5;
                      res = two(chars.join(""), 5);
                      
                      if(res==5)
                      {
                          res = three(chars.join(""), 5);
                      }
                        
                      if(res==5)
                      {
                          res = four(chars.join(""), 5);
                      }
                        
                      if(res==5)
                      {
                          res = five(chars.join(""), 5);
                      }
                        
                      if(res==5)
                      {
                          res = six(chars.join(""), 5);
                      }
                      
                      if(res!=5)
                      {
                          hint_text_n_score_plus.setVisible(true);
                          hint_text_n_score_plus.setString(res);
                          hint_flag = 1;
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
                cc.director.runScene(new Level_3_Scene());
          }
      }
  }
});
*/

var Level_2_Scene = cc.Scene.extend({
    onEnter : function(){
    this._super();
    var layer = new Level_2_Layer();
    this.addChild(layer);
    }
});


function Level_2_mainFunction(baseObject)
{
    var baseObject_inLocal = baseObject;
    baseObject_inLocal.vowelArray = [];
    baseObject_inLocal.consonantArray = [];
    
    if(baseObject_inLocal.chars.length<1)
    {
        baseObject_inLocal.chars = Level_2_random_char(baseObject_inLocal.vowelArray, baseObject_inLocal.consonantArray, baseObject_inLocal);
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

        var tempchar = Level_2_random_char(baseObject_inLocal.vowelArray, baseObject_inLocal.consonantArray, baseObject_inLocal);
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
            baseObject_inLocal.Score_board.setVisible(true);
            baseObject_inLocal.Ok_button.setVisible(true);
            baseObject_inLocal.Ok_button.flag = 1;
            baseObject_inLocal.score_board_score.setString(baseObject_inLocal.score_text.getString());
            baseObject_inLocal.score_board_score.setVisible(true);
        }
        
}


function Level_2_random_char(v, c, baseObject_fromfunction)
{
    var baseObject_fromfunction_inLocal = baseObject_fromfunction;
    var vowellen = 0, consonantlen = 0;
    if(v.length==0 && c.length==0)
    {
        var selectvowel = new Array(); //['o','i','a','l','k','p','m','r','t'];
        var selconso = new Array();
        var vowel = ['a', 'e', 'i', 'o', 'u'];
        var consonant = ['c', 'd', 'f', 'g', 'h', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'w', 'y'];
//				var consonant = ['c', 'd', 'h', 'l', 'm', 'n', 'r', 's', 't', 'w'];

        for(var i=0; i<5; i++)
        {
            var vowel1 = vowel[Math.floor(Math.random() * vowel.length)];
            var j = vowel.indexOf(vowel1);
            if(j!=-1)
            {
                vowel.splice(j, 1);
            }
            selectvowel.push(vowel1);
        }
    
    
        for(var i=0; i<11; i++)
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
        var vowel = ['a', 'e', 'i', 'o', 'u'];
        var consonant = ['c', 'd', 'f', 'g', 'h', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'w', 'y'];
//				var consonant = ['c', 'd', 'h', 'l', 'm', 'n', 'r', 's', 't', 'w'];


//					count total vowel and consonant in letterArray array;					
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