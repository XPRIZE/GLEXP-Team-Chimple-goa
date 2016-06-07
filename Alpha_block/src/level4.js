/// <reference path="../../cocos2d-typescript-definitions/cocos2d/cocos2d-lib.d.ts" />

/*
var item_1, item_2, item_3, item_4, item_5, item_6, item_7, item_8, item_9;
var storeLetter, size, self, text, hint_text_n_score_plus, score_text, hint_flag, hint_text, Score_board, Ok_button, score_board_score;

var vowelArray = new Array();
var consonantArray = new Array();


var clickLetter = new Array();
var letterArray = new Array();

var chars=[];
var position = [];
*/

var Level_4_Layer = cc.Layer.extend({
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
        
        cc.spriteFrameCache.addSpriteFrames(res1.bg4_plist);
        cc.spriteFrameCache.addSpriteFrames(res1.buttons_plist);
        
        // background sprite        
        this.Level_4_BG = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("bg/level4_bg.png"), this);
        this.Level_4_BG.attr({
           x : self.size.width/2,
           y : self.size.height/2,
           anchorX : .5,
           anchorY : .5 
        });
        this.addChild(this.Level_4_BG);
        
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
        
        // Blue tile  1st line, 1st this.item
       this.Blue_tile_shadow_1_1 = new eventListenerClass(res.Blue_tile_shadow, this); 
       this.Blue_tile_shadow_1_1.attr({
          x : self.size.width*30/100,
          y : self.size.height*75/100,
       });
       this.Blue_tile_shadow_1_1.id = "Blue_tile_shadow_1_1";
       this.addChild(this.Blue_tile_shadow_1_1);
       
       this.Blue_tile_1_2 = new eventListenerClass(res.Blue_tile, this);
       this.Blue_tile_1_2.attr({
          x : this.Blue_tile_shadow_1_1.x-10,
          y : this.Blue_tile_shadow_1_1.y+10,
       });
       this.Blue_tile_1_2.id = "Blue_tile_1_2";
       this.addChild(this.Blue_tile_1_2);
       
       this.Blue_tile_1_3 = new eventListenerClass(res.Blue_tile, this); 
       this.Blue_tile_1_3.attr({
          x : this.Blue_tile_1_2.x-8,
          y : this.Blue_tile_1_2.y+8,
          anchorX : 0.5,
          anchorY : 0.5
       });
       this.Blue_tile_1_3.id = "Blue_tile_1_3";
       this.addChild(this.Blue_tile_1_3);

       this.Blue_tile_1_4 = new eventListenerClass(res.Blue_tile, this); 
       this.Blue_tile_1_4.attr({
          x : this.Blue_tile_1_3.x-8,
          y : this.Blue_tile_1_3.y+8,
          anchorX : 0.5,
          anchorY : 0.5
       });
       this.Blue_tile_1_4.id = "Blue_tile_1_4";
       this.addChild(this.Blue_tile_1_4);

       this.Blue_tile_1_5 = new eventListenerClass(res.Blue_tile, this); 
       this.Blue_tile_1_5.attr({
          x : this.Blue_tile_1_4.x-8,
          y : this.Blue_tile_1_4.y+8,
          anchorX : 0.5,
          anchorY : 0.5
       });
       this.Blue_tile_1_5.id = "Blue_tile_1_5";
       this.addChild(this.Blue_tile_1_5);

       this.Blue_tile_1_6 = new eventListenerClass(res.Blue_tile, this); 
       this.Blue_tile_1_6.attr({
          x : this.Blue_tile_1_5.x-8,
          y : this.Blue_tile_1_5.y+8,
          anchorX : 0.5,
          anchorY : 0.5
       });
       this.Blue_tile_1_6.id = "Blue_tile_1_6";
       this.addChild(this.Blue_tile_1_6);

       this.Blue_tile_1_7 = new eventListenerClass(res.Blue_tile, this); 
       this.Blue_tile_1_7.attr({
          x : this.Blue_tile_1_6.x-8,
          y : this.Blue_tile_1_6.y+8,
          anchorX : 0.5,
          anchorY : 0.5
       });
       this.Blue_tile_1_7.id = "Blue_tile_1_7";
       this.addChild(this.Blue_tile_1_7);

       this.Blue_tile_1_8 = new eventListenerClass(res.Blue_tile, this); 
       this.Blue_tile_1_8.attr({
          x : this.Blue_tile_1_7.x-8,
          y : this.Blue_tile_1_7.y+8,
          anchorX : 0.5,
          anchorY : 0.5
       });
       this.Blue_tile_1_8.id = "Blue_tile_1_8";
       this.addChild(this.Blue_tile_1_8);
       this.Blue_tile_1_8.flag = 0;
       
       this.item_1.push(this.Blue_tile_shadow_1_1);
       this.item_1.push(this.Blue_tile_1_2);
       this.item_1.push(this.Blue_tile_1_3);
       this.item_1.push(this.Blue_tile_1_4);
       this.item_1.push(this.Blue_tile_1_5);
       this.item_1.push(this.Blue_tile_1_6);
       this.item_1.push(this.Blue_tile_1_7);
       this.item_1.push(this.Blue_tile_1_8);
       
       // Pink tile 1st line, 2nd this.item
       this.Pink_tile_shadow_2_1 = new eventListenerClass(res.Pink_tile_shadow, this); 
       this.Pink_tile_shadow_2_1.attr({
          x : self.size.width*50/100,
          y : self.size.height*75/100,
       });
       this.Pink_tile_shadow_2_1.id = "Pink_tile_shadow_2_1";
       this.addChild(this.Pink_tile_shadow_2_1);
       
       this.Pink_tile_2_2 = new eventListenerClass(res.Pink_tile, this); 
       this.Pink_tile_2_2.attr({
          x : this.Pink_tile_shadow_2_1.x-10,
          y : this.Pink_tile_shadow_2_1.y+10,
       });
       this.Pink_tile_2_2.id = "Pink_tile_2_2";
       this.addChild(this.Pink_tile_2_2);
       
       this.Pink_tile_2_3 = new eventListenerClass(res.Pink_tile, this); 
       this.Pink_tile_2_3.attr({
          x : this.Pink_tile_2_2.x-10,
          y : this.Pink_tile_2_2.y+10,
       });
       this.Pink_tile_2_3.id = "Pink_tile_2_3";
       this.addChild(this.Pink_tile_2_3);
       
       this.Pink_tile_2_4 = new eventListenerClass(res.Pink_tile, this); 
       this.Pink_tile_2_4.attr({
          x : this.Pink_tile_2_3.x-10,
          y : this.Pink_tile_2_3.y+10,
       });
       this.Pink_tile_2_4.id = "Pink_tile_2_4";
       this.addChild(this.Pink_tile_2_4);
       
       this.Pink_tile_2_5 = new eventListenerClass(res.Pink_tile, this); 
       this.Pink_tile_2_5.attr({
          x : this.Pink_tile_2_4.x-10,
          y : this.Pink_tile_2_4.y+10,
       });
       this.Pink_tile_2_5.id = "Pink_tile_2_5";
       this.addChild(this.Pink_tile_2_5);
       
       this.Pink_tile_2_6 = new eventListenerClass(res.Pink_tile, this); 
       this.Pink_tile_2_6.attr({
          x : this.Pink_tile_2_5.x-10,
          y : this.Pink_tile_2_5.y+10,
       });
       this.Pink_tile_2_6.id = "Pink_tile_2_6";
       this.addChild(this.Pink_tile_2_6);
       
       this.Pink_tile_2_7 = new eventListenerClass(res.Pink_tile, this); 
       this.Pink_tile_2_7.attr({
          x : this.Pink_tile_2_6.x-10,
          y : this.Pink_tile_2_6.y+10,
       });
       this.Pink_tile_2_7.id = "Pink_tile_2_7";
       this.addChild(this.Pink_tile_2_7);
       this.Pink_tile_2_7.flag = 0;
              
       this.item_2.push(this.Pink_tile_shadow_2_1);
       this.item_2.push(this.Pink_tile_2_2);
       this.item_2.push(this.Pink_tile_2_3);
       this.item_2.push(this.Pink_tile_2_4);
       this.item_2.push(this.Pink_tile_2_5);
       this.item_2.push(this.Pink_tile_2_6);
       this.item_2.push(this.Pink_tile_2_7);

       
        // Green tile  1st line, 3rd this.item
       this.Green_tile_shadow_3_1 = new eventListenerClass(res.Green_tile_shadow, this); 
       this.Green_tile_shadow_3_1.attr({
          x : self.size.width*70/100,
          y : self.size.height*75/100,
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
       
       this.Green_tile_3_4 = new eventListenerClass(res.Green_tile, this); 
       this.Green_tile_3_4.attr({
          x : this.Green_tile_3_3.x-8,
          y : this.Green_tile_3_3.y+8,
          anchorX : 0.5,
          anchorY : 0.5
       });
       this.Green_tile_3_4.id = "Green_tile_3_4";
       this.addChild(this.Green_tile_3_4);
       
       this.Green_tile_3_5 = new eventListenerClass(res.Green_tile, this); 
       this.Green_tile_3_5.attr({
          x : this.Green_tile_3_4.x-8,
          y : this.Green_tile_3_4.y+8,
          anchorX : 0.5,
          anchorY : 0.5
       });
       this.Green_tile_3_5.id = "Green_tile_3_5";
       this.addChild(this.Green_tile_3_5);
       
       this.Green_tile_3_6 = new eventListenerClass(res.Green_tile, this); 
       this.Green_tile_3_6.attr({
          x : this.Green_tile_3_5.x-8,
          y : this.Green_tile_3_5.y+8,
          anchorX : 0.5,
          anchorY : 0.5
       });
       this.Green_tile_3_6.id = "Green_tile_3_6";
       this.addChild(this.Green_tile_3_6);       
       this.Green_tile_3_6.flag = 0;
              
       this.item_3.push(this.Green_tile_shadow_3_1);
       this.item_3.push(this.Green_tile_3_2);
       this.item_3.push(this.Green_tile_3_3);
       this.item_3.push(this.Green_tile_3_4);
       this.item_3.push(this.Green_tile_3_5);
       this.item_3.push(this.Green_tile_3_6);
       
        // Red tile  2nd line, 1st this.item
       this.Red_tile_shadow_4_1 = new eventListenerClass(res.Red_tile_shadow, this); 
       this.Red_tile_shadow_4_1.attr({
          x : self.size.width*30/100,
          y : self.size.height*65/100,
       });
       this.Red_tile_shadow_4_1.id = "Red_tile_shadow_4_1";
       this.addChild(this.Red_tile_shadow_4_1);
       
       this.Red_tile_4_2 = new eventListenerClass(res.Red_tile, this); 
       this.Red_tile_4_2.attr({
          x : this.Red_tile_shadow_4_1.x-10,
          y : this.Red_tile_shadow_4_1.y+10,
       });
       this.Red_tile_4_2.id = "Red_tile_4_2";
       this.addChild(this.Red_tile_4_2);
       
       this.Red_tile_4_3 = new eventListenerClass(res.Red_tile, this); 
       this.Red_tile_4_3.attr({
          x : this.Red_tile_4_2.x-10,
          y : this.Red_tile_4_2.y+10,
       });
       this.Red_tile_4_3.id = "Red_tile_4_3";
       this.addChild(this.Red_tile_4_3);
       
       this.Red_tile_4_4 = new eventListenerClass(res.Red_tile, this); 
       this.Red_tile_4_4.attr({
          x : this.Red_tile_4_3.x-10,
          y : this.Red_tile_4_3.y+10,
       });
       this.Red_tile_4_4.id = "Red_tile_4_4";
       this.addChild(this.Red_tile_4_4);
       
       this.Red_tile_4_5 = new eventListenerClass(res.Red_tile, this); 
       this.Red_tile_4_5.attr({
          x : this.Red_tile_4_4.x-10,
          y : this.Red_tile_4_4.y+10,
       });
       this.Red_tile_4_5.id = "Red_tile_4_5";
       this.addChild(this.Red_tile_4_5);
       
       this.Red_tile_4_6 = new eventListenerClass(res.Red_tile, this); 
       this.Red_tile_4_6.attr({
          x : this.Red_tile_4_5.x-10,
          y : this.Red_tile_4_5.y+10,
       });
       this.Red_tile_4_6.id = "Red_tile_4_6";
       this.addChild(this.Red_tile_4_6);
       
       this.Red_tile_4_7 = new eventListenerClass(res.Red_tile, this); 
       this.Red_tile_4_7.attr({
          x : this.Red_tile_4_6.x-10,
          y : this.Red_tile_4_6.y+10,
       });
       this.Red_tile_4_7.id = "Red_tile_4_7";
       this.addChild(this.Red_tile_4_7);
       this.Red_tile_4_7.flag = 0;
              
       this.item_4.push(this.Red_tile_shadow_4_1);
       this.item_4.push(this.Red_tile_4_2);
       this.item_4.push(this.Red_tile_4_3);
       this.item_4.push(this.Red_tile_4_4);
       this.item_4.push(this.Red_tile_4_5);
       this.item_4.push(this.Red_tile_4_6);
       this.item_4.push(this.Red_tile_4_7);
              
             
       // Cyan tile 2nd line, 2nd this.item
       this.Cyan_tile_shadow_5_1 = new eventListenerClass(res.Cyan_tile_shadow, this); 
       this.Cyan_tile_shadow_5_1.attr({
          x : self.size.width*50/100,
          y : self.size.height*65/100,
       });
       this.Cyan_tile_shadow_5_1.id = "Cyan_tile_shadow_5_1";
       this.addChild(this.Cyan_tile_shadow_5_1);
       
       this.Cyan_tile_5_2 = new eventListenerClass(res.Cyan_tile, this); 
       this.Cyan_tile_5_2.attr({
          x : this.Cyan_tile_shadow_5_1.x-10,
          y : this.Cyan_tile_shadow_5_1.y+10,
       });
       this.Cyan_tile_5_2.id = "Cyan_tile_5_2";
       this.addChild(this.Cyan_tile_5_2);
       
       this.Cyan_tile_5_3 = new eventListenerClass(res.Cyan_tile, this); 
       this.Cyan_tile_5_3.attr({
          x : this.Cyan_tile_5_2.x-8,
          y : this.Cyan_tile_5_2.y+8,
       });
       this.Cyan_tile_5_3.id = "Cyan_tile_5_3";
       this.addChild(this.Cyan_tile_5_3);
       
       this.Cyan_tile_5_4 = new eventListenerClass(res.Cyan_tile, this); 
       this.Cyan_tile_5_4.attr({
          x : this.Cyan_tile_5_3.x-8,
          y : this.Cyan_tile_5_3.y+8,
       });
       this.Cyan_tile_5_4.id = "Cyan_tile_5_4";
       this.addChild(this.Cyan_tile_5_4);
       
       this.Cyan_tile_5_5 = new eventListenerClass(res.Cyan_tile, this); 
       this.Cyan_tile_5_5.attr({
          x : this.Cyan_tile_5_4.x-8,
          y : this.Cyan_tile_5_4.y+8,
       });
       this.Cyan_tile_5_5.id = "Cyan_tile_5_5";
       this.addChild(this.Cyan_tile_5_5);
       this.Cyan_tile_5_5.flag = 0;
       
       this.item_5.push(this.Cyan_tile_shadow_5_1);
       this.item_5.push(this.Cyan_tile_5_2);
       this.item_5.push(this.Cyan_tile_5_3);
       this.item_5.push(this.Cyan_tile_5_4);
       this.item_5.push(this.Cyan_tile_5_5);
       
        // Orange tile  2nd line, 3rd this.item
       this.Orange_tile_shadow_6_1 = new eventListenerClass(res.Orange_tile_shadow, this); 
       this.Orange_tile_shadow_6_1.attr({
          x : self.size.width*70/100,
          y : self.size.height*65/100,
       });
       this.Orange_tile_shadow_6_1.id = "Orange_tile_shadow_6_1";
       this.addChild(this.Orange_tile_shadow_6_1);
       
       this.Orange_tile_6_2 = new eventListenerClass(res.Orange_tile, this); 
       this.Orange_tile_6_2.attr({
          x : this.Orange_tile_shadow_6_1.x-10,
          y : this.Orange_tile_shadow_6_1.y+10,
       });
       this.Orange_tile_6_2.id = "Orange_tile_6_2";
       this.addChild(this.Orange_tile_6_2);
       
       this.Orange_tile_6_3 = new eventListenerClass(res.Orange_tile, this); 
       this.Orange_tile_6_3.attr({
          x : this.Orange_tile_6_2.x-8,
          y : this.Orange_tile_6_2.y+8,
          anchorX : 0.5,
          anchorY : 0.5
       });
       this.Orange_tile_6_3.id = "Orange_tile_6_3";
       this.addChild(this.Orange_tile_6_3);

       this.Orange_tile_6_4 = new eventListenerClass(res.Orange_tile, this); 
       this.Orange_tile_6_4.attr({
          x : this.Orange_tile_6_3.x-8,
          y : this.Orange_tile_6_3.y+8,
          anchorX : 0.5,
          anchorY : 0.5
       });
       this.Orange_tile_6_4.id = "Orange_tile_6_4";
       this.addChild(this.Orange_tile_6_4);
       
       this.Orange_tile_6_5 = new eventListenerClass(res.Orange_tile, this); 
       this.Orange_tile_6_5.attr({
          x : this.Orange_tile_6_4.x-8,
          y : this.Orange_tile_6_4.y+8,
          anchorX : 0.5,
          anchorY : 0.5
       });
       this.Orange_tile_6_5.id = "Orange_tile_6_5";
       this.addChild(this.Orange_tile_6_5);       
       this.Orange_tile_6_5.flag = 0;
       
       this.item_6.push(this.Orange_tile_shadow_6_1);
       this.item_6.push(this.Orange_tile_6_2);
       this.item_6.push(this.Orange_tile_6_3);
       this.item_6.push(this.Orange_tile_6_4);
       this.item_6.push(this.Orange_tile_6_5);
       
        // Green tile  3rd line, 1st this.item
       this.Green_tile_shadow_7_1 = new eventListenerClass(res.Green_tile_shadow, this); 
       this.Green_tile_shadow_7_1.attr({
          x : self.size.width*30/100,
          y : self.size.height*55/100,
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
       
       this.Green_tile_7_3 = new eventListenerClass(res.Green_tile, this); 
       this.Green_tile_7_3.attr({
          x : this.Green_tile_7_2.x-8,
          y : this.Green_tile_7_2.y+8,
          anchorX : 0.5,
          anchorY : 0.5
       });
       this.Green_tile_7_3.id = "Green_tile_7_3";
       this.addChild(this.Green_tile_7_3);
       
       this.Green_tile_7_4 = new eventListenerClass(res.Green_tile, this); 
       this.Green_tile_7_4.attr({
          x : this.Green_tile_7_3.x-8,
          y : this.Green_tile_7_3.y+8,
          anchorX : 0.5,
          anchorY : 0.5
       });
       this.Green_tile_7_4.id = "Green_tile_7_4";
       this.addChild(this.Green_tile_7_4);
       
       this.Green_tile_7_5 = new eventListenerClass(res.Green_tile, this); 
       this.Green_tile_7_5.attr({
          x : this.Green_tile_7_4.x-8,
          y : this.Green_tile_7_4.y+8,
          anchorX : 0.5,
          anchorY : 0.5
       });
       this.Green_tile_7_5.id = "Green_tile_7_5";
       this.addChild(this.Green_tile_7_5);
       
       this.Green_tile_7_6 = new eventListenerClass(res.Green_tile, this); 
       this.Green_tile_7_6.attr({
          x : this.Green_tile_7_5.x-8,
          y : this.Green_tile_7_5.y+8,
          anchorX : 0.5,
          anchorY : 0.5
       });
       this.Green_tile_7_6.id = "Green_tile_7_6";
       this.addChild(this.Green_tile_7_6);       
       this.Green_tile_7_6.flag = 0;
              
       this.item_7.push(this.Green_tile_shadow_7_1);
       this.item_7.push(this.Green_tile_7_2);
       this.item_7.push(this.Green_tile_7_3);
       this.item_7.push(this.Green_tile_7_4);
       this.item_7.push(this.Green_tile_7_5);
       this.item_7.push(this.Green_tile_7_6);               
       
       // Blue tile 3rd line, 2nd this.item
       this.Blue_tile_shadow_8_1 = new eventListenerClass(res.Blue_tile_shadow, this); 
       this.Blue_tile_shadow_8_1.attr({
          x : self.size.width*50/100,
          y : self.size.height*55/100,
       });
       this.Blue_tile_shadow_8_1.id = "Blue_tile_shadow_8_1";
       this.addChild(this.Blue_tile_shadow_8_1);
       
       this.Blue_tile_8_2 = new eventListenerClass(res.Blue_tile, this); 
       this.Blue_tile_8_2.attr({
          x : this.Blue_tile_shadow_8_1.x-10,
          y : this.Blue_tile_shadow_8_1.y+10,
       });
       this.Blue_tile_8_2.id = "Blue_tile_8_2";
       this.addChild(this.Blue_tile_8_2);
       
       this.Blue_tile_8_3 = new eventListenerClass(res.Blue_tile, this); 
       this.Blue_tile_8_3.attr({
          x : this.Blue_tile_8_2.x-10,
          y : this.Blue_tile_8_2.y+10,
       });
       this.Blue_tile_8_3.id = "Blue_tile_8_3";
       this.addChild(this.Blue_tile_8_3);

       this.Blue_tile_8_4 = new eventListenerClass(res.Blue_tile, this); 
       this.Blue_tile_8_4.attr({
          x : this.Blue_tile_8_3.x-10,
          y : this.Blue_tile_8_3.y+10,
       });
       this.Blue_tile_8_4.id = "Blue_tile_8_4";
       this.addChild(this.Blue_tile_8_4);
       this.Blue_tile_8_4.flag = 0;

       this.item_8.push(this.Blue_tile_shadow_8_1);
       this.item_8.push(this.Blue_tile_8_2);
       this.item_8.push(this.Blue_tile_8_3);
       this.item_8.push(this.Blue_tile_8_4);

        // Red tile  3rd line, 3rd this.item
       this.Red_tile_shadow_9_1 = new eventListenerClass(res.Red_tile_shadow, this); 
       this.Red_tile_shadow_9_1.attr({
          x : self.size.width*70/100,
          y : self.size.height*55/100,
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
       
       this.item_9.push(this.Red_tile_shadow_9_1);
       this.item_9.push(this.Red_tile_9_2);
       this.item_9.push(this.Red_tile_9_3);

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
        this.text = new cc.LabelTTF("","Century Gothic","150");
        this.text.attr({
           x : this.size.width*35/100,
           y : this.size.height*6/100,
//           anchorX : .5,
           anchorY : .5
        });
        this.addChild(this.text);
        this.text.setColor(cc.color("#000000"));
       
       // display valid or invalid word
       this.sorryText = new cc.LabelTTF("", "Century Gothic", "150");
       this.sorryText.attr({
          x : this.size.width*15/100,
          y : this.size.height*13/100,
          anchorX : .5,
          anchorY : .5 
       });
       this.addChild(this.sorryText);
       this.sorryText.setColor(cc.color("#368e3c"));
       
       
       // score display       
       this.score_text = new cc.LabelTTF("0", "Century Ghotic", "150");
       this.score_text.attr({
          x : this.size.width*90/100,
          y : this.size.height*95/100,
          anchorX : .5,
          anchorY : .5 
       });
       this.addChild(this.score_text);
       this.score_text.setColor(cc.color("#ffffff"));
       
       // hint text and score when make word
       this.hint_text_n_score_plus = new cc.LabelTTF("", "Century Ghotic", "150");
       this.hint_text_n_score_plus.attr({
          x : this.size.width*70/100,
          y : this.size.height*25/100,
          anchorX : .5,
          anchorY : .5 
       });
       this.addChild(this.hint_text_n_score_plus);
       this.hint_text_n_score_plus.setColor(cc.color("#000000"));
       
       Level_1_mainFunction(this);

        var wid = self.size.width;
        var hei = self.size.height;

        this.position = [{x:wid*26.5/100, y:hei*76.5/100}, {x:wid*46/100, y:hei*77/100}, {x:wid*67/100, y:hei*76.5/100},
                    {x:wid*26.5/100, y:hei*67.2/100}, {x:wid*48/100, y:hei*66/100}, {x:wid*68/100, y:hei*66.5/100},
                    {x:wid*27.5/100, y:hei*56/100}, {x:wid*48/100, y:hei*56/100}, {x:wid*68.8/100, y:hei*55.7/100},];

       var chars_id = 0;

       for(var i=0; i<self.chars.length; i++)
       {
			var v = 'letter'+i;
            var s = self.chars[i];
            var res2 = "buttons/"+self.chars[i].toUpperCase()+".png";
            v = new eventListenerClass(res2, this);
            v.attr({
               x :  this.position[i].x,
               y : this.position[i].y,
               anchorX : .5,
               anchorY : .5
            });
            this.addChild(v);
            v.id = 'letter'+i;
            v.flag = 0;
            chars_id++;
            this.clickLetter.push(v);
//            cc.eventManager.addListener(level4_sprite_click.clone(), v);
       }


            // Score_board after game finish       
            this.Score_board = new eventListenerClass(res.Score_board, this);
            this.Score_board.attr({
                x : this.size.width*50/100,
                y : this.size.height*65/100,
                anchorX : .5,
                anchorY : .5
            });
            self.addChild(this.Score_board, 5);
            this.Score_board.setVisible(false);

            // ok button to go on next level
            this.Ok_button = new eventListenerClass(res.Ok_button, this);
            this.Ok_button.attr({
                x : this.size.width*50/100,
                y : this.size.height*52/100,
                anchorX : .5,
                anchorY : .5
            });
            self.addChild(this.Ok_button, 5);
            this.Ok_button.id = "Ok_button_Level_4";
            this.Ok_button.flag = 0;
            this.Ok_button.setVisible(false);
            
            // score on score_board
            this.score_board_score = new cc.LabelTTF("", "Century Ghotic", "150");
            this.score_board_score.attr({
                x : this.size.width*70/100,
                y : this.size.height*62/100,
                anchorX : .5,
                anchorY : .5 
            });
            self.addChild(this.score_board_score, 5);
            this.score_board_score.setColor(cc.color("#ffffff"));
            this.score_board_score.setVisible(false);

/*
    // click event listener
    cc.eventManager.addListener(level4_sprite_click.clone(), this.Blue_tile_shadow_1_1);
    cc.eventManager.addListener(level4_sprite_click.clone(), this.Blue_tile_1_2);
    cc.eventManager.addListener(level4_sprite_click.clone(), this.Blue_tile_1_3);
    cc.eventManager.addListener(level4_sprite_click.clone(), this.Blue_tile_1_4);
    cc.eventManager.addListener(level4_sprite_click.clone(), this.Blue_tile_1_5);
    cc.eventManager.addListener(level4_sprite_click.clone(), this.Blue_tile_1_6);
    cc.eventManager.addListener(level4_sprite_click.clone(), this.Blue_tile_1_7);
    cc.eventManager.addListener(level4_sprite_click.clone(), this.Blue_tile_1_8);

    cc.eventManager.addListener(level4_sprite_click.clone(), this.Pink_tile_shadow_2_1);
    cc.eventManager.addListener(level4_sprite_click.clone(), this.Pink_tile_2_2);
    cc.eventManager.addListener(level4_sprite_click.clone(), this.Pink_tile_2_3);
    cc.eventManager.addListener(level4_sprite_click.clone(), this.Pink_tile_2_4);
    cc.eventManager.addListener(level4_sprite_click.clone(), this.Pink_tile_2_5);
    cc.eventManager.addListener(level4_sprite_click.clone(), this.Pink_tile_2_6);
    cc.eventManager.addListener(level4_sprite_click.clone(), this.Pink_tile_2_7);

    cc.eventManager.addListener(level4_sprite_click.clone(), this.Green_tile_shadow_3_1);
    cc.eventManager.addListener(level4_sprite_click.clone(), this.Green_tile_3_2);
    cc.eventManager.addListener(level4_sprite_click.clone(), this.Green_tile_3_3);
    cc.eventManager.addListener(level4_sprite_click.clone(), this.Green_tile_3_4);
    cc.eventManager.addListener(level4_sprite_click.clone(), this.Green_tile_3_5);
    cc.eventManager.addListener(level4_sprite_click.clone(), this.Green_tile_3_6);

    cc.eventManager.addListener(level4_sprite_click.clone(), this.Red_tile_shadow_4_1);
    cc.eventManager.addListener(level4_sprite_click.clone(), this.Red_tile_4_2);
    cc.eventManager.addListener(level4_sprite_click.clone(), this.Red_tile_4_3);
    cc.eventManager.addListener(level4_sprite_click.clone(), this.Red_tile_4_4);
    cc.eventManager.addListener(level4_sprite_click.clone(), this.Red_tile_4_5);
    cc.eventManager.addListener(level4_sprite_click.clone(), this.Red_tile_4_6);
    cc.eventManager.addListener(level4_sprite_click.clone(), this.Red_tile_4_7);

    cc.eventManager.addListener(level4_sprite_click.clone(), this.Cyan_tile_shadow_5_1);
    cc.eventManager.addListener(level4_sprite_click.clone(), this.Cyan_tile_5_2);
    cc.eventManager.addListener(level4_sprite_click.clone(), this.Cyan_tile_5_3);
    cc.eventManager.addListener(level4_sprite_click.clone(), this.Cyan_tile_5_4);
    cc.eventManager.addListener(level4_sprite_click.clone(), this.Cyan_tile_5_5);

    cc.eventManager.addListener(level4_sprite_click.clone(), this.Orange_tile_shadow_6_1);
    cc.eventManager.addListener(level4_sprite_click.clone(), this.Orange_tile_6_2);
    cc.eventManager.addListener(level4_sprite_click.clone(), this.Orange_tile_6_3);
    cc.eventManager.addListener(level4_sprite_click.clone(), this.Orange_tile_6_4);
    cc.eventManager.addListener(level4_sprite_click.clone(), this.Orange_tile_6_5);

    cc.eventManager.addListener(level4_sprite_click.clone(), this.Green_tile_shadow_7_1);
    cc.eventManager.addListener(level4_sprite_click.clone(), this.Green_tile_7_2);
    cc.eventManager.addListener(level4_sprite_click.clone(), this.Green_tile_7_3);
    cc.eventManager.addListener(level4_sprite_click.clone(), this.Green_tile_7_4);
    cc.eventManager.addListener(level4_sprite_click.clone(), this.Green_tile_7_5);
    cc.eventManager.addListener(level4_sprite_click.clone(), this.Green_tile_7_6);

    cc.eventManager.addListener(level4_sprite_click.clone(), this.Blue_tile_shadow_8_1);
    cc.eventManager.addListener(level4_sprite_click.clone(), this.Blue_tile_8_2);
    cc.eventManager.addListener(level4_sprite_click.clone(), this.Blue_tile_8_3);
    cc.eventManager.addListener(level4_sprite_click.clone(), this.Blue_tile_8_4);

    cc.eventManager.addListener(level4_sprite_click.clone(), this.Red_tile_shadow_9_1);
    cc.eventManager.addListener(level4_sprite_click.clone(), this.Red_tile_9_2);
    cc.eventManager.addListener(level4_sprite_click.clone(), this.Red_tile_9_3);
    
    cc.eventManager.addListener(level4_sprite_click.clone(), this.Hint_Button);
    cc.eventManager.addListener(level4_sprite_click.clone(), this.Correct_Button);
    cc.eventManager.addListener(level4_sprite_click.clone(), this.Wrong_Button);
    cc.eventManager.addListener(level4_sprite_click.clone(), this.Home);    
    cc.eventManager.addListener(level4_sprite_click.clone(), Ok_button);    
*/    }
});

/*
var level4_sprite_click = cc.EventListener.create({event: cc.EventListener.TOUCH_ONE_BY_ONE, swallowTouches: true,
  onTouchBegan: function (touch, event) {
      
    var target = event.getCurrentTarget();
    var location = target.convertToNodeSpace(touch.getLocation());
    var targetSize = target.getContentSize();
    var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);
    
     if (cc.rectContainsPoint(targetRectangle, location))
      {
          if(item_1.length>=1 && target.id==item_1[item_1.length-1].id)
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
          else if(item_2.length>=1 && target.id==item_2[item_2.length-1].id)
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
          else if(item_3.length>=1 && target.id==item_3[item_3.length-1].id)
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
          else if(item_4.length>=1 && target.id==item_4[item_4.length-1].id)
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
          else if(item_5.length>=1 && target.id==item_5[item_5.length-1].id)
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
          else if(item_6.length>=1 && target.id==item_6[item_6.length-1].id)
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
          else if(item_7.length>=1 && target.id==item_7[item_7.length-1].id)
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
          else if(item_8.length>=1 && target.id==item_8[item_8.length-1].id)
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
          else if(item_9.length>=1 && target.id==item_9[item_9.length-1].id)
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
          else if(target.id=="Correct_Button_Level_1_4")
          {
              var ch = checkWord(letterArray);
              
			if(ch==0 || letterArray.length<=1)
			{
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
                    Level_4_mainFunction();
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
                cc.director.runScene(new Level_5_Scene());
          }
      }
  }
});
*/

var Level_4_Scene = cc.Scene.extend({
    onEnter : function(){
    this._super();
    var layer = new Level_4_Layer();
    this.addChild(layer);
    }
});

/*
function Level_4_mainFunction()
{
    vowelArray = [];
    consonantArray = [];
    
    if(chars.length<1)
    {
        chars = Level_4_random_char(vowelArray, consonantArray);
    }
    else
    {
        for(var j = 0; j<chars.length; j++)
        {
            if(chars[j]=='a' || chars[j]=='e' || chars[j]=='i' || chars[j]=='o' || chars[j]=='u')
            {
                vowelArray.push(chars[j]);
            }
            else
            {
                consonantArray.push(chars[j]);
            }
        }

        var tempchar = this.Level_4_random_char(vowelArray, consonantArray);
        var newChar = new Array();
        newChar = chars.slice();
        console.log('newChar= '+newChar);

        for(var i = 0; i<tempchar.length; i++)
        {
            var ch = chars.join("");
            var ind = chars.indexOf(letterArray[i]);
            
            var id = clickLetter[ind].id;
            newChar[ind] = tempchar[i];
            var len = storeLetter[i].length;
            if(len>0)
            {
            var v = newChar[ind];
            position[ind].x = position[ind].x+7;
            position[ind].y = position[ind].y-7;
            v = new cc.Sprite("res/"+v+".png");
            v.attr({
                  x : position[ind].x,
                  y : position[ind].y,
                  anchorX : .5,
                  anchorY : .5  
            });
            v.id = id;
            v.flag = 0;
            self.addChild(v);
            cc.eventManager.addListener(sprite_click.clone(), v);
            clickLetter[ind] = v;
            }
        }
        chars = newChar.slice();
    }

    letterArray = [];
    storeLetter = [];
    
    if(item_1.length==0)
        chars[0] = '0';
        
    if(item_2.length==0)
        chars[1] = '0';
        
    if(item_3.length==0)
        chars[2] = '0';
        
    if(item_4.length==0)
        chars[3] = '0';
        
    if(item_5.length==0)
        chars[4] = '0';
        
    if(item_6.length==0)
        chars[5] = '0';
        
    if(item_7.length==0)
        chars[6] = '0';
        
    if(item_8.length==0)
        chars[7] = '0';
        
    if(item_9.length==0)
        chars[8] = '0';
    
    
    console.log('chars = '+chars);
    
    var newArray = new Array();
    
    var count1=0;
    for(var vv = 0; vv<chars.length; vv++)
    {
        if(chars[vv]>='a' && chars[vv]<='z')
            count1++;
    }
    
        var result = 0;

        if(count1>=2) 
            result = two(chars.join(""), 1);
            
        if(result==0 && count1>=3)
        {
            result = three(chars.join(""), 1);
        }
        
        if(result==0 && count1>=4)
        {
            result = four(chars.join(""), 1);
        }

        if(result==0)
        {
            var remaining_tiles = item_1.length + item_2.length + item_3.length + item_4.length + item_5.length + item_6.length + item_7.length + item_8.length + item_9.length;
            score_text.setString(parseInt(score_text.getString())+remaining_tiles*10);
            Score_board.setVisible(true);
            Ok_button.setVisible(true);
            Ok_button.flag = 1;
            score_board_score.setString(score_text.getString());
            score_board_score.setVisible(true);
         
            item_1 = [];
            item_2 = [];
            item_3 = [];
            item_4 = [];
            item_5 = [];
            item_6 = [];
            item_7 = [];
            item_8 = [];
            item_9 = [];
        }
        
}


function Level_4_random_char(v,c)
{
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


//					count total vowel and consonant in letterArray array;					
        for(var j=0; j<chars.length; j++)
        {
            var vowelflag = 0, consflag = 0;
            
            if(chars[j]=='a' || chars[j]=='e' || chars[j]=='i' || chars[j]=='o' || chars[j]=='u')
            {
                var lettervalue;
                for(var i=0; i<letterArray.length; i++)
                {
                    if(chars[j]==letterArray[i])
                    {
                        lettervalue = letterArray[i];
                        vowelflag++;
                        vowellen++;
                        break;
                    }
                }
                if(vowelflag==0)
                    vowel.splice(vowel.indexOf(chars[j]), 1);							
            }
            else
            {
                for(var i=0; i<letterArray.length; i++)
                {
                    if(chars[j]==letterArray[i])
                    {
                        lettervalue = letterArray[i];
                        consflag++;
                        consonantlen++;
                        break;
                    }
                }
                if(consflag==0)
                    consonant.splice(consonant.indexOf(chars[j]), 1);
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

*/