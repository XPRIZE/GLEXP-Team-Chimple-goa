var eventListenerClass = cc.Sprite.extend({
        
        ctor:function(imageFile, that) {
            this._super(cc.spriteFrameCache.getSpriteFrame(imageFile));
//            this.initWithSpriteFrame(imageFile);
            

var sprite_click = cc.EventListener.create({event: cc.EventListener.TOUCH_ONE_BY_ONE, swallowTouches: true,
  

  onTouchBegan :function(touch, event){

  	var target = event.getCurrentTarget();
    var location = target.convertToNodeSpace(touch.getLocation());
    var targetSize = target.getContentSize();
    var targetRectangle = cc.rect(0,0, target.width, target.height);

     if (cc.rectContainsPoint(targetRectangle, location))
      {
          //    for levelstate file
          if(target.id=="backleft")
          {
              if(that.flag>0)
                that.flag--;
              
              if(that.flag==0)
              {
                  that.Level_1.setVisible(true);
                  that.Level_2.setVisible(false);
                  that.Level_3.setVisible(false);
                  that.Level_4.setVisible(false);
                  that.Level_5.setVisible(false);
                  that.backleft.setVisible(false);
                  
                  that.Level_1.flag = 1;
                  that.Level_2.flag = 0;
                  that.Level_3.flag = 0;
                  that.Level_4.flag = 0;
                  that.Level_5.flag = 0;
              }
              else if(that.flag==1)
              {
                  that.Level_1.setVisible(false);
                  that.Level_2.setVisible(true);
                  that.Level_3.setVisible(false);
                  that.Level_4.setVisible(false);
                  that.Level_5.setVisible(false);
                  
                  that.Level_1.flag = 0;
                  that.Level_2.flag = 1;
                  that.Level_3.flag = 0;
                  that.Level_4.flag = 0;
                  that.Level_5.flag = 0;
              }
              else if(that.flag==2)
              {
                  that.Level_1.setVisible(false);
                  that.Level_2.setVisible(false);
                  that.Level_3.setVisible(true);
                  that.Level_4.setVisible(false);
                  that.Level_5.setVisible(false);
                  
                  that.Level_1.flag = 0;
                  that.Level_2.flag = 0;
                  that.Level_3.flag = 1;
                  that.Level_4.flag = 0;
                  that.Level_5.flag = 0;
              }
              else if(that.flag==3)
              {
                  that.Level_1.setVisible(false);
                  that.Level_2.setVisible(false);
                  that.Level_3.setVisible(false);
                  that.Level_4.setVisible(true);
                  that.Level_5.setVisible(false);
                  that.backright.setVisible(true);
                  
                  that.Level_1.flag = 0;
                  that.Level_2.flag = 0;
                  that.Level_3.flag = 0;
                  that.Level_4.flag = 1;
                  that.Level_5.flag = 0;
              }
          }
          else if(target.id=="backright")
          {
              if(that.flag<4)
                that.flag++;
              
              if(that.flag==1)
              {
                  that.Level_1.setVisible(false);
                  that.Level_2.setVisible(true);
                  that.Level_3.setVisible(false);
                  that.Level_4.setVisible(false);
                  that.Level_5.setVisible(false);
                  that.backleft.setVisible(true);
                  
                  that.Level_1.flag = 0;
                  that.Level_2.flag = 1;
                  that.Level_3.flag = 0;
                  that.Level_4.flag = 0;
                  that.Level_5.flag = 0;
              }
              else if(that.flag==2)
              {
                  that.Level_1.setVisible(false);
                  that.Level_2.setVisible(false);
                  that.Level_3.setVisible(true);
                  that.Level_4.setVisible(false);
                  that.Level_5.setVisible(false);
                  
                  that.Level_1.flag = 0;
                  that.Level_2.flag = 0;
                  that.Level_3.flag = 1;
                  that.Level_4.flag = 0;
                  that.Level_5.flag = 0;
              }
              else if(that.flag==3)
              {
                  that.Level_1.setVisible(false);
                  that.Level_2.setVisible(false);
                  that.Level_3.setVisible(false);
                  that.Level_4.setVisible(true);
                  that.Level_5.setVisible(false);
                  
                  that.Level_1.flag = 0;
                  that.Level_2.flag = 0;
                  that.Level_3.flag = 0;
                  that.Level_4.flag = 1;
                  that.Level_5.flag = 0;
              }
              else if(that.flag==4)
              {
                  that.Level_1.setVisible(false);
                  that.Level_2.setVisible(false);
                  that.Level_3.setVisible(false);
                  that.Level_4.setVisible(false);
                  that.Level_5.setVisible(true);
                  that.backright.setVisible(false);
                  that.backleft.setVisible(true);
                  
                  that.Level_1.flag = 0;
                  that.Level_2.flag = 0;
                  that.Level_3.flag = 0;
                  that.Level_4.flag = 0;
                  that.Level_5.flag = 1;
              }
          }
          else if(target.id=="Level_1")
          {
              if(target.flag==1)
              {
                cc.director.runScene(new Level_1_Scene());
              }
          }
          else if(target.id=="Level_2")
          {
              if(target.flag==1)
              {
                cc.director.runScene(new Level_2_Scene());
              }
          }
          else if(target.id=="Level_3")
          {
              if(target.flag==1)
              {
                cc.director.runScene(new Level_3_Scene());
              }
          }
          else if(target.id=="Level_4")
          {
              if(target.flag==1)
              {
                cc.director.runScene(new Level_4_Scene());
              }
          }
          else if(target.id=="Level_5")
          {
              if(target.flag==1)
              {
                cc.director.runScene(new Level_5_Scene());
              }
          }
          else if(that.item_1.length>=1 && target.id==that.item_1[that.item_1.length-1].id && that.letterArray.length<12)
          {
              if(that.item_1[that.item_1.length-1].flag==0)
              {
                that.item_1[that.item_1.length-1].x = that.item_1[that.item_1.length-1].x-8;
                that.item_1[that.item_1.length-1].y = that.item_1[that.item_1.length-1].y+8;
                that.item_1[that.item_1.length-1].flag = 1;
                that.storeLetter.push(that.item_1);
                
                that.letterArray.push(that.chars[0]);
                that.letterIndex.push(0);
                that.clickLetter[0].x = that.clickLetter[0].x-8;
                that.clickLetter[0].y = that.clickLetter[0].y+8;
                
                that.text.setString(that.letterArray.join(""));
                var ch = checkWord(that.letterArray);
                if(ch==1)
                {
                    that.text.setColor(cc.color("#368e3c"));
                }
                else
                    that.text.setColor(cc.color("#000000")); 
                    
                that.sorryText.setString("");
              }
          }
          else if(that.item_2.length>=1 && target.id==that.item_2[that.item_2.length-1].id && that.letterArray.length<12)
          {
              if(that.item_2[that.item_2.length-1].flag==0)
              {
                that.item_2[that.item_2.length-1].x = that.item_2[that.item_2.length-1].x-8;
                that.item_2[that.item_2.length-1].y = that.item_2[that.item_2.length-1].y+8;
                that.item_2[that.item_2.length-1].flag = 1;
                that.storeLetter.push(that.item_2);
                
                that.letterArray.push(that.chars[1]);
                that.letterIndex.push(1);
                that.clickLetter[1].x = that.clickLetter[1].x-8;
                that.clickLetter[1].y = that.clickLetter[1].y+8;
                
                that.text.setString(that.letterArray.join(""));
                var ch = checkWord(that.letterArray);
                if(ch==1)
                {
                    that.text.setColor(cc.color("#368e3c"));
                }
                else
                    that.text.setColor(cc.color("#000000")); 
                    
                that.sorryText.setString("");
              }
          }
          else if(that.item_3.length>=1 && target.id==that.item_3[that.item_3.length-1].id && that.letterArray.length<12)
          {
              if(that.item_3[that.item_3.length-1].flag==0)
              {
                that.item_3[that.item_3.length-1].x = that.item_3[that.item_3.length-1].x-8;
                that.item_3[that.item_3.length-1].y = that.item_3[that.item_3.length-1].y+8;
                that.item_3[that.item_3.length-1].flag = 1;
                that.storeLetter.push(that.item_3);
                
                that.letterArray.push(that.chars[2]);
                that.letterIndex.push(2);
                that.clickLetter[2].x = that.clickLetter[2].x-8;
                that.clickLetter[2].y = that.clickLetter[2].y+8;
                
                that.text.setString(that.letterArray.join(""));
                var ch = checkWord(that.letterArray);
                if(ch==1)
                {
                    that.text.setColor(cc.color("#368e3c"));
                }
                else
                    that.text.setColor(cc.color("#000000")); 

                that.sorryText.setString("");
            }
          }
          else if(that.item_4.length>=1 && target.id==that.item_4[that.item_4.length-1].id && that.letterArray.length<12)
          {
              if(that.item_4[that.item_4.length-1].flag==0)
              {
                that.item_4[that.item_4.length-1].x = that.item_4[that.item_4.length-1].x-8;
                that.item_4[that.item_4.length-1].y = that.item_4[that.item_4.length-1].y+8;
                that.item_4[that.item_4.length-1].flag = 1;
                that.storeLetter.push(that.item_4);
                
                that.letterArray.push(that.chars[3]);
                that.letterIndex.push(3);
                that.clickLetter[3].x = that.clickLetter[3].x-8;
                that.clickLetter[3].y = that.clickLetter[3].y+8;
                
                that.text.setString(that.letterArray.join(""));
                var ch = checkWord(that.letterArray);
                if(ch==1)
                {
                    that.text.setColor(cc.color("#368e3c"));
                }
                else
                    that.text.setColor(cc.color("#000000")); 
                    
                that.sorryText.setString("");
              }
          }
          else if(that.item_5.length>=1 && target.id==that.item_5[that.item_5.length-1].id && that.letterArray.length<12)
          {
              if(that.item_5[that.item_5.length-1].flag==0)
              {
                that.item_5[that.item_5.length-1].x = that.item_5[that.item_5.length-1].x-8;
                that.item_5[that.item_5.length-1].y = that.item_5[that.item_5.length-1].y+8;
                that.item_5[that.item_5.length-1].flag = 1;
                that.storeLetter.push(that.item_5);
                
                that.letterArray.push(that.chars[4]);
                that.letterIndex.push(4);
                that.clickLetter[4].x = that.clickLetter[4].x-8;
                that.clickLetter[4].y = that.clickLetter[4].y+8;
                
                that.text.setString(that.letterArray.join(""));
                var ch = checkWord(that.letterArray);
                if(ch==1)
                {
                    that.text.setColor(cc.color("#368e3c"));
                }
                else
                    that.text.setColor(cc.color("#000000")); 
                    
                that.sorryText.setString("");
              }
          }
          else if(that.item_6.length>=1 && target.id==that.item_6[that.item_6.length-1].id && that.letterArray.length<12)
          {
              if(that.item_6[that.item_6.length-1].flag==0)
              {
                that.item_6[that.item_6.length-1].x = that.item_6[that.item_6.length-1].x-8;
                that.item_6[that.item_6.length-1].y = that.item_6[that.item_6.length-1].y+8;
                that.item_6[that.item_6.length-1].flag = 1;
                that.storeLetter.push(that.item_6);
                
                that.letterArray.push(that.chars[5]);
                that.letterIndex.push(5);
                that.clickLetter[5].x = that.clickLetter[5].x-8;
                that.clickLetter[5].y = that.clickLetter[5].y+8;
                
                that.text.setString(that.letterArray.join(""));
                var ch = checkWord(that.letterArray);
                if(ch==1)
                {
                    that.text.setColor(cc.color("#368e3c"));
                }
                else
                    that.text.setColor(cc.color("#000000")); 
                    
                that.sorryText.setString("");
              }
          }
          else if(that.item_7.length>=1 && target.id==that.item_7[that.item_7.length-1].id && that.letterArray.length<12)
          {
              if(that.item_7[that.item_7.length-1].flag==0)
              {
                that.item_7[that.item_7.length-1].x = that.item_7[that.item_7.length-1].x-8;
                that.item_7[that.item_7.length-1].y = that.item_7[that.item_7.length-1].y+8;
                that.item_7[that.item_7.length-1].flag = 1;
                that.storeLetter.push(that.item_7);
                
                that.letterArray.push(that.chars[6]);
                that.letterIndex.push(6);
                that.clickLetter[6].x = that.clickLetter[6].x-8;
                that.clickLetter[6].y = that.clickLetter[6].y+8;
                
                that.text.setString(that.letterArray.join(""));
                var ch = checkWord(that.letterArray);
                if(ch==1)
                {
                    that.text.setColor(cc.color("#368e3c"));
                }
                else
                    that.text.setColor(cc.color("#000000")); 
                    
                that.sorryText.setString("");
              }
          }
          else if(that.item_8.length>=1 && target.id==that.item_8[that.item_8.length-1].id && that.letterArray.length<12)
          {
              if(that.item_8[that.item_8.length-1].flag==0)
              {
                that.item_8[that.item_8.length-1].x = that.item_8[that.item_8.length-1].x-8;
                that.item_8[that.item_8.length-1].y = that.item_8[that.item_8.length-1].y+8;
                that.item_8[that.item_8.length-1].flag = 1;
                that.storeLetter.push(that.item_8);
                
                that.letterArray.push(that.chars[7]);
                that.letterIndex.push(7);
                that.clickLetter[7].x = that.clickLetter[7].x-8;
                that.clickLetter[7].y = that.clickLetter[7].y+8;
                
                that.text.setString(that.letterArray.join(""));
                var ch = checkWord(that.letterArray);
                if(ch==1)
                {
                    that.text.setColor(cc.color("#368e3c"));
                }
                else
                    that.text.setColor(cc.color("#000000")); 
                    
                that.sorryText.setString("");
              }
          }
          else if(that.item_9.length>=1 && target.id==that.item_9[that.item_9.length-1].id && that.letterArray.length<12)
          {
              if(that.item_9[that.item_9.length-1].flag==0)
              {
                that.item_9[that.item_9.length-1].x = that.item_9[that.item_9.length-1].x-8;
                that.item_9[that.item_9.length-1].y = that.item_9[that.item_9.length-1].y+8;
                that.item_9[that.item_9.length-1].flag = 1;
                that.storeLetter.push(that.item_9);
                
                that.letterArray.push(that.chars[8]);
                that.letterIndex.push(8);
                that.clickLetter[8].x = that.clickLetter[8].x-8;
                that.clickLetter[8].y = that.clickLetter[8].y+8;
                
                that.text.setString(that.letterArray.join(""));
                var ch = checkWord(that.letterArray);
                if(ch==1)
                {
                    that.text.setColor(cc.color("#368e3c"));
                }
                else
                    that.text.setColor(cc.color("#000000"));
                    
                that.sorryText.setString("");
              }
          }
          else if(that.item_10.length>=1 && target.id==that.item_10[that.item_10.length-1].id && that.letterArray.length<12)
          {
              if(that.item_10[that.item_10.length-1].flag==0)
              {
                that.item_10[that.item_10.length-1].x = that.item_10[that.item_10.length-1].x-8;
                that.item_10[that.item_10.length-1].y = that.item_10[that.item_10.length-1].y+8;
                that.item_10[that.item_10.length-1].flag = 1;
                that.storeLetter.push(that.item_10);
                
                that.letterArray.push(that.chars[9]);
                that.letterIndex.push(9);
                that.clickLetter[9].x = that.clickLetter[9].x-8;
                that.clickLetter[9].y = that.clickLetter[9].y+8;
                
                that.text.setString(that.letterArray.join(""));
                var ch = checkWord(that.letterArray);
                if(ch==1)
                {
                    that.text.setColor(cc.color("#368e3c"));
                }
                else
                    that.text.setColor(cc.color("#000000")); 
                    
                that.sorryText.setString("");
              }
          }
          else if(that.item_11.length>=1 && target.id==that.item_11[that.item_11.length-1].id && that.letterArray.length<12)
          {
              if(that.item_11[that.item_11.length-1].flag==0)
              {
                that.item_11[that.item_11.length-1].x = that.item_11[that.item_11.length-1].x-8;
                that.item_11[that.item_11.length-1].y = that.item_11[that.item_11.length-1].y+8;
                that.item_11[that.item_11.length-1].flag = 1;
                that.storeLetter.push(that.item_11);
                
                that.letterArray.push(that.chars[10]);
                that.letterIndex.push(10);
                that.clickLetter[10].x = that.clickLetter[10].x-8;
                that.clickLetter[10].y = that.clickLetter[10].y+8;
                
                that.text.setString(that.letterArray.join(""));
                var ch = checkWord(that.letterArray);
                if(ch==1)
                {
                    that.text.setColor(cc.color("#368e3c"));
                }
                else
                    that.text.setColor(cc.color("#000000")); 
                    
                that.sorryText.setString("");
              }
          }
          else if(that.item_12.length>=1 && target.id==that.item_12[that.item_12.length-1].id && that.letterArray.length<12)
          {
              if(that.item_12[that.item_12.length-1].flag==0)
              {
                that.item_12[that.item_12.length-1].x = that.item_12[that.item_12.length-1].x-8;
                that.item_12[that.item_12.length-1].y = that.item_12[that.item_12.length-1].y+8;
                that.item_12[that.item_12.length-1].flag = 1;
                that.storeLetter.push(that.item_12);
                
                that.letterArray.push(that.chars[11]);
                that.letterIndex.push(11);
                that.clickLetter[11].x = that.clickLetter[11].x-8;
                that.clickLetter[11].y = that.clickLetter[11].y+8;
                
                that.text.setString(that.letterArray.join(""));
                var ch = checkWord(that.letterArray);
                if(ch==1)
                {
                    that.text.setColor(cc.color("#368e3c"));
                }
                else
                    that.text.setColor(cc.color("#000000")); 
                    
                that.sorryText.setString("");
              }
          }
          else if(that.item_13.length>=1 && target.id==that.item_13[that.item_13.length-1].id && that.letterArray.length<12)
          {
              if(that.item_13[that.item_13.length-1].flag==0)
              {
                that.item_13[that.item_13.length-1].x = that.item_13[that.item_13.length-1].x-8;
                that.item_13[that.item_13.length-1].y = that.item_13[that.item_13.length-1].y+8;
                that.item_13[that.item_13.length-1].flag = 1;
                that.storeLetter.push(that.item_13);
                
                that.letterArray.push(that.chars[12]);
                that.letterIndex.push(12);
                that.clickLetter[12].x = that.clickLetter[12].x-8;
                that.clickLetter[12].y = that.clickLetter[12].y+8;
                
                that.text.setString(that.letterArray.join(""));
                var ch = checkWord(that.letterArray);
                if(ch==1)
                {
                    that.text.setColor(cc.color("#368e3c"));
                }
                else
                    that.text.setColor(cc.color("#000000")); 

                that.sorryText.setString("");
            }
          }
          else if(that.item_14.length>=1 && target.id==that.item_14[that.item_14.length-1].id && that.letterArray.length<12)
          {
              if(that.item_14[that.item_14.length-1].flag==0)
              {
                that.item_14[that.item_14.length-1].x = that.item_14[that.item_14.length-1].x-8;
                that.item_14[that.item_14.length-1].y = that.item_14[that.item_14.length-1].y+8;
                that.item_14[that.item_14.length-1].flag = 1;
                that.storeLetter.push(that.item_14);
                
                that.letterArray.push(that.chars[13]);
                that.letterIndex.push(13);
                that.clickLetter[13].x = that.clickLetter[13].x-8;
                that.clickLetter[13].y = that.clickLetter[13].y+8;
                
                that.text.setString(that.letterArray.join(""));
                var ch = checkWord(that.letterArray);
                if(ch==1)
                {
                    that.text.setColor(cc.color("#368e3c"));
                }
                else
                    that.text.setColor(cc.color("#000000")); 
                    
                that.sorryText.setString("");
              }
          }
          else if(that.item_15.length>=1 && target.id==that.item_15[that.item_15.length-1].id && that.letterArray.length<12)
          {
              if(that.item_15[that.item_15.length-1].flag==0)
              {
                that.item_15[that.item_15.length-1].x = that.item_15[that.item_15.length-1].x-8;
                that.item_15[that.item_15.length-1].y = that.item_15[that.item_15.length-1].y+8;
                that.item_15[that.item_15.length-1].flag = 1;
                that.storeLetter.push(that.item_15);
                
                that.letterArray.push(that.chars[14]);
                that.letterIndex.push(14);
                that.clickLetter[14].x = that.clickLetter[14].x-8;
                that.clickLetter[14].y = that.clickLetter[14].y+8;
                
                that.text.setString(that.letterArray.join(""));
                var ch = checkWord(that.letterArray);
                if(ch==1)
                {
                    that.text.setColor(cc.color("#368e3c"));
                }
                else
                    that.text.setColor(cc.color("#000000")); 
                    
                that.sorryText.setString("");
              }
          }
          else if(that.item_16.length>=1 && target.id==that.item_16[that.item_16.length-1].id && that.letterArray.length<12)
          {
              if(that.item_16[that.item_16.length-1].flag==0)
              {
                that.item_16[that.item_16.length-1].x = that.item_16[that.item_16.length-1].x-8;
                that.item_16[that.item_16.length-1].y = that.item_16[that.item_16.length-1].y+8;
                that.item_16[that.item_16.length-1].flag = 1;
                that.storeLetter.push(that.item_16);
                
                that.letterArray.push(that.chars[15]);
                that.letterIndex.push(15);
                that.clickLetter[15].x = that.clickLetter[15].x-8;
                that.clickLetter[15].y = that.clickLetter[15].y+8;
                
                that.text.setString(that.letterArray.join(""));
                var ch = checkWord(that.letterArray);
                if(ch==1)
                {
                    that.text.setColor(cc.color("#368e3c"));
                }
                else
                    that.text.setColor(cc.color("#000000")); 
                    
                that.sorryText.setString("");
              }
          }
          else if(that.item_17.length>=1 && target.id==that.item_17[that.item_17.length-1].id && that.letterArray.length<12)
          {
              if(that.item_17[that.item_17.length-1].flag==0)
              {
                that.item_17[that.item_17.length-1].x = that.item_17[that.item_17.length-1].x-8;
                that.item_17[that.item_17.length-1].y = that.item_17[that.item_17.length-1].y+8;
                that.item_17[that.item_17.length-1].flag = 1;
                that.storeLetter.push(that.item_17);
                
                that.letterArray.push(that.chars[16]);
                that.letterIndex.push(16);
                that.clickLetter[16].x = that.clickLetter[16].x-8;
                that.clickLetter[16].y = that.clickLetter[16].y+8;
                
                that.text.setString(that.letterArray.join(""));
                var ch = checkWord(that.letterArray);
                if(ch==1)
                {
                    that.text.setColor(cc.color("#368e3c"));
                }
                else
                    that.text.setColor(cc.color("#000000")); 
                    
                that.sorryText.setString("");
              }
          }
          else if(that.item_18.length>=1 && target.id==that.item_18[that.item_18.length-1].id && that.letterArray.length<12)
          {
              if(that.item_18[that.item_18.length-1].flag==0)
              {
                that.item_18[that.item_18.length-1].x = that.item_18[that.item_18.length-1].x-8;
                that.item_18[that.item_18.length-1].y = that.item_18[that.item_18.length-1].y+8;
                that.item_18[that.item_18.length-1].flag = 1;
                that.storeLetter.push(that.item_18);
                
                that.letterArray.push(that.chars[17]);
                that.letterIndex.push(17);
                that.clickLetter[17].x = that.clickLetter[17].x-8;
                that.clickLetter[17].y = that.clickLetter[17].y+8;
                
                that.text.setString(that.letterArray.join(""));
                var ch = checkWord(that.letterArray);
                if(ch==1)
                {
                    that.text.setColor(cc.color("#368e3c"));
                }
                else
                    that.text.setColor(cc.color("#000000")); 
                    
                that.sorryText.setString("");
              }
          }
          else if(that.item_19.length>=1 && target.id==that.item_19[that.item_19.length-1].id && that.letterArray.length<12)
          {
              if(that.item_19[that.item_19.length-1].flag==0)
              {
                that.item_19[that.item_19.length-1].x = that.item_19[that.item_19.length-1].x-8;
                that.item_19[that.item_19.length-1].y = that.item_19[that.item_19.length-1].y+8;
                that.item_19[that.item_19.length-1].flag = 1;
                that.storeLetter.push(that.item_19);
                
                that.letterArray.push(that.chars[18]);
                that.letterIndex.push(18);
                that.clickLetter[18].x = that.clickLetter[18].x-8;
                that.clickLetter[18].y = that.clickLetter[18].y+8;
                
                that.text.setString(that.letterArray.join(""));
                var ch = checkWord(that.letterArray);
                if(ch==1)
                {
                    that.text.setColor(cc.color("#368e3c"));
                }
                else
                    that.text.setColor(cc.color("#000000"));
                    
                that.sorryText.setString("");
              }
          }
          else if(that.item_20.length>=1 && target.id==that.item_20[that.item_20.length-1].id && that.letterArray.length<12)
          {
              if(that.item_20[that.item_20.length-1].flag==0)
              {
                that.item_20[that.item_20.length-1].x = that.item_20[that.item_20.length-1].x-8;
                that.item_20[that.item_20.length-1].y = that.item_20[that.item_20.length-1].y+8;
                that.item_20[that.item_20.length-1].flag = 1;
                that.storeLetter.push(that.item_20);
                
                that.letterArray.push(that.chars[19]);
                that.letterIndex.push(19);
                that.clickLetter[19].x = that.clickLetter[19].x-8;
                that.clickLetter[19].y = that.clickLetter[19].y+8;
                
                that.text.setString(that.letterArray.join(""));
                var ch = checkWord(that.letterArray);
                if(ch==1)
                {
                    that.text.setColor(cc.color("#368e3c"));
                }
                else
                    that.text.setColor(cc.color("#000000")); 
                    
                that.sorryText.setString("");
              }
          }
          else if(that.item_21.length>=1 && target.id==that.item_21[that.item_21.length-1].id && that.letterArray.length<12)
          {
              if(that.item_21[that.item_21.length-1].flag==0)
              {
                that.item_21[that.item_21.length-1].x = that.item_21[that.item_21.length-1].x-8;
                that.item_21[that.item_21.length-1].y = that.item_21[that.item_21.length-1].y+8;
                that.item_21[that.item_21.length-1].flag = 1;
                that.storeLetter.push(that.item_21);
                
                that.letterArray.push(that.chars[20]);
                that.letterIndex.push(20);
                that.clickLetter[20].x = that.clickLetter[20].x-8;
                that.clickLetter[20].y = that.clickLetter[20].y+8;
                
                that.text.setString(that.letterArray.join(""));
                var ch = checkWord(that.letterArray);
                if(ch==1)
                {
                    that.text.setColor(cc.color("#368e3c"));
                }
                else
                    that.text.setColor(cc.color("#000000")); 
                    
                that.sorryText.setString("");
              }
          }
          else if(that.item_22.length>=1 && target.id==that.item_22[that.item_22.length-1].id && that.letterArray.length<22)
          {
              if(that.item_22[that.item_22.length-1].flag==0)
              {
                that.item_22[that.item_22.length-1].x = that.item_22[that.item_22.length-1].x-8;
                that.item_22[that.item_22.length-1].y = that.item_22[that.item_22.length-1].y+8;
                that.item_22[that.item_22.length-1].flag = 1;
                that.storeLetter.push(that.item_22);
                
                that.letterArray.push(that.chars[21]);
                that.letterIndex.push(21);
                that.clickLetter[21].x = that.clickLetter[21].x-8;
                that.clickLetter[21].y = that.clickLetter[21].y+8;
                
                that.text.setString(that.letterArray.join(""));
                var ch = checkWord(that.letterArray);
                if(ch==1)
                {
                    that.text.setColor(cc.color("#368e3c"));
                }
                else
                    that.text.setColor(cc.color("#000000")); 
                    
                that.sorryText.setString("");
              }
          }
          else if(that.item_23.length>=1 && target.id==that.item_23[that.item_23.length-1].id && that.letterArray.length<22)
          {
              if(that.item_23[that.item_23.length-1].flag==0)
              {
                that.item_23[that.item_23.length-1].x = that.item_23[that.item_23.length-1].x-8;
                that.item_23[that.item_23.length-1].y = that.item_23[that.item_23.length-1].y+8;
                that.item_23[that.item_23.length-1].flag = 1;
                that.storeLetter.push(that.item_23);
                
                that.letterArray.push(that.chars[22]);
                that.letterIndex.push(22);
                that.clickLetter[22].x = that.clickLetter[22].x-8;
                that.clickLetter[22].y = that.clickLetter[22].y+8;
                
                that.text.setString(that.letterArray.join(""));
                var ch = checkWord(that.letterArray);
                if(ch==1)
                {
                    that.text.setColor(cc.color("#368e3c"));
                }
                else
                    that.text.setColor(cc.color("#000000")); 

                that.sorryText.setString("");
            }
          }
          else if(that.item_24.length>=1 && target.id==that.item_24[that.item_24.length-1].id && that.letterArray.length<12)
          {
              if(that.item_24[that.item_24.length-1].flag==0)
              {
                that.item_24[that.item_24.length-1].x = that.item_24[that.item_24.length-1].x-8;
                that.item_24[that.item_24.length-1].y = that.item_24[that.item_24.length-1].y+8;
                that.item_24[that.item_24.length-1].flag = 1;
                that.storeLetter.push(that.item_24);
                
                that.letterArray.push(that.chars[23]);
                that.letterIndex.push(23);
                that.clickLetter[23].x = that.clickLetter[23].x-8;
                that.clickLetter[23].y = that.clickLetter[23].y+8;
                
                that.text.setString(that.letterArray.join(""));
                var ch = checkWord(that.letterArray);
                if(ch==1)
                {
                    that.text.setColor(cc.color("#368e3c"));
                }
                else
                    that.text.setColor(cc.color("#000000")); 
                    
                that.sorryText.setString("");
              }
          }
          else if(that.item_25.length>=1 && target.id==that.item_25[that.item_25.length-1].id && that.letterArray.length<12)
          {
              if(that.item_25[that.item_25.length-1].flag==0)
              {
                that.item_25[that.item_25.length-1].x = that.item_25[that.item_25.length-1].x-8;
                that.item_25[that.item_25.length-1].y = that.item_25[that.item_25.length-1].y+8;
                that.item_25[that.item_25.length-1].flag = 1;
                that.storeLetter.push(that.item_25);
                
                that.letterArray.push(that.chars[24]);
                that.letterIndex.push(24);
                that.clickLetter[24].x = that.clickLetter[24].x-8;
                that.clickLetter[24].y = that.clickLetter[24].y+8;
                
                that.text.setString(that.letterArray.join(""));
                var ch = checkWord(that.letterArray);
                if(ch==1)
                {
                    that.text.setColor(cc.color("#368e3c"));
                }
                else
                    that.text.setColor(cc.color("#000000")); 
                    
                that.sorryText.setString("");
              }
          }
          else if(target.id=="Correct_Button_Level_3")
          {
              var ch = checkWord(that.letterArray);
              
			if(ch==0 || that.letterArray.length<=1)
			{
                that.sorryText.setString("Invalid");
			}
            else
            {
                that.sorryText.setString("Correct");
                that.text.setString("");
				var lenvowel = 0, lencon = 0;
				for(var i=0; i<that.letterArray.length; i++)
				{
					var ind = that.letterIndex[i];//that.chars.indexOf(that.letterArray[i]);

                    var val = that.storeLetter[i];
					if(that.letterArray[i]=='a' || that.letterArray[i]=='e' || that.letterArray[i]=='i' || that.letterArray[i]=='o' || that.letterArray[i]=='u')
					{
						lenvowel++;
					}
					else
					{
						lencon++;
					}	
                    
                    that.clickLetter[ind].runAction(cc.MoveTo.create(.2, cc.p(that.size.width*90/100, that.size.height*95/100)));
                    val[val.length-1].runAction(cc.MoveTo.create(.2, cc.p(that.size.width*90/100, that.size.height*95/100)));
				}
                
                var sc = parseInt(that.score_text.getString());
                that.hint_text_n_score_plus.setVisible(true);
                if(that.letterArray.length==2)
                    {
                        that.score_text.setString(sc + 20);
                        that.hint_text_n_score_plus.setString('+20');
                    }                    
                else if(that.letterArray.length==3)
                    {
                        that.hint_text_n_score_plus.setString('+40');
                        that.score_text.setString(sc + 40);
                    }
                else if(that.letterArray.length==4)
                {
                        that.hint_text_n_score_plus.setString('+60');
                        that.score_text.setString(sc + 60);
                }                    
                else if(that.letterArray.length==5)
                {
                        that.hint_text_n_score_plus.setString('+70');
                        that.score_text.setString(sc + 70);
                }
                else if(that.letterArray.length==6)
                {
                        that.hint_text_n_score_plus.setString('+90');
                        that.score_text.setString(sc + 90);
                }
                else if(that.letterArray.length==7)
                {
                        that.hint_text_n_score_plus.setString('+100');
                        that.score_text.setString(sc + 100);
                }
                else if(that.letterArray.length==8)
                {
                        that.hint_text_n_score_plus.setString('+120');
                        that.score_text.setString(sc + 120);
                }
                else if(that.letterArray.length==9)
                {
                        that.hint_text_n_score_plus.setString('+130');
                        that.score_text.setString(sc + 130);
                }
                else if(that.letterArray.length==10)
                {
                        that.hint_text_n_score_plus.setString('+150');
                        that.score_text.setString(sc + 150);
                }
                else if(that.letterArray.length==11)
                {
                        that.hint_text_n_score_plus.setString('+170');
                        that.score_text.setString(sc + 170);
                }
                else if(that.letterArray.length==12)
                {
                        that.hint_text_n_score_plus.setString('+200');
                        that.score_text.setString(sc + 200);
                }
                
                setTimeout(function(){
                    that.hint_text_n_score_plus.setVisible(false);
                    for(var i=0; i<that.letterArray.length; i++)
                    {
                        var ind = that.letterIndex[i]; //that.chars.indexOf(that.letterArray[i]);
                        var val = that.storeLetter[i];
                        that.removeChild(val[val.length-1]);
                        that.removeChild(that.clickLetter[ind]);
                        val.pop();
                        if(val.length>0)
                        {
                            val[val.length-1].flag = 0;
                        }
                    }
                    that.sorryText.setString("");
                    that.hint_flag = 0;
                    Level_3_mainFunction(that);
                },300);
            }
          }
          else if(target.id=="Correct_Button_Level_1_4")
          {
              console.log('correct');
              var ch = checkWord(that.letterArray);
              
			if(ch==0 || that.letterArray.length<=1)
			{
//				sorryText.text = 'Invalid';
				console.log('no');
                that.sorryText.setString("Invalid");
			}
            else
            {
                that.sorryText.setString("Correct");
                that.text.setString("");
				var lenvowel = 0, lencon = 0;
				for(var i=0; i<that.letterArray.length; i++)
				{
					var ind = that.chars.indexOf(that.letterArray[i]);

                    var val = that.storeLetter[i];
					if(that.letterArray[i]=='a' || that.letterArray[i]=='e' || that.letterArray[i]=='i' || that.letterArray[i]=='o' || that.letterArray[i]=='u')
					{
						lenvowel++;
					}
					else
					{
						lencon++;
					}	
                    
                    that.clickLetter[ind].runAction(cc.MoveTo.create(.2, cc.p(that.size.width*90/100, that.size.height*95/100)));
                    val[val.length-1].runAction(cc.MoveTo.create(.2, cc.p(that.size.width*90/100, that.size.height*95/100)));
				}
                
                var sc = parseInt(that.score_text.getString());
                that.hint_text_n_score_plus.setVisible(true);
                if(that.letterArray.length==2)
                    {
                        that.score_text.setString(sc + 20);
                        that.hint_text_n_score_plus.setString('+20');
                    }                    
                else if(that.letterArray.length==3)
                    {
                        that.hint_text_n_score_plus.setString('+40');
                        that.score_text.setString(sc + 40);
                    }
                else if(that.letterArray.length==4)
                {
                        that.hint_text_n_score_plus.setString('+60');
                        that.score_text.setString(sc + 60);
                }                    
                else if(that.letterArray.length==5)
                {
                        hint_text_n_that.score_plus.setString('+70');
                        that.score_text.setString(sc + 70);
                }
                else if(that.letterArray.length==6)
                {
                        that.hint_text_n_score_plus.setString('+90');
                        that.score_text.setString(sc + 90);
                }
                else if(that.letterArray.length==7)
                {
                        that.hint_text_n_score_plus.setString('+100');
                        that.score_text.setString(sc + 100);
                }
                else if(that.letterArray.length==8)
                {
                        that.hint_text_n_score_plus.setString('+120');
                        that.score_text.setString(sc + 120);
                }
                
                setTimeout(function(){
                    that.hint_text_n_score_plus.setVisible(false);
                    for(var i=0; i<that.letterArray.length; i++)
                    {
                        var ind = that.chars.indexOf(that.letterArray[i]);
                        var val = that.storeLetter[i];
                        that.removeChild(val[val.length-1]);
                        that.removeChild(that.clickLetter[ind]);
                        val.pop();
                        if(val.length>0)
                        {
                            val[val.length-1].flag = 0;
                        }
                    }
                    that.sorryText.setString("");
                    that.hint_flag = 0;
                    Level_1_mainFunction(that);
                },300);
            }
          }
          else if(target.id=="Correct_Button_Level_2_5")
          {
              console.log('correct');
              var ch = checkWord(that.letterArray);
              
			if(ch==0 || that.letterArray.length<=1)
			{
//				that.sorryText.text = 'Invalid';
				console.log('no');
                that.sorryText.setString("Invalid");
			}
            else
            {
                that.sorryText.setString("Correct");
                that.text.setString("");
				var lenvowel = 0, lencon = 0;
				for(var i=0; i<that.letterArray.length; i++)
				{
					var ind = that.chars.indexOf(that.letterArray[i]);

                    var val = that.storeLetter[i];
					if(that.letterArray[i]=='a' || that.letterArray[i]=='e' || that.letterArray[i]=='i' || that.letterArray[i]=='o' || that.letterArray[i]=='u')
					{
						lenvowel++;
					}
					else
					{
						lencon++;
					}	
                    
                    that.clickLetter[ind].runAction(cc.MoveTo.create(.2, cc.p(that.size.width*90/100, that.size.height*95/100)));
                    val[val.length-1].runAction(cc.MoveTo.create(.2, cc.p(that.size.width*90/100, that.size.height*95/100)));
				}
                
                var sc = parseInt(that.score_text.getString());
                that.hint_text_n_score_plus.setVisible(true);
                if(that.letterArray.length==2)
                    {
                        that.score_text.setString(sc + 20);
                        that.hint_text_n_score_plus.setString('+20');
                    }                    
                else if(that.letterArray.length==3)
                    {
                        that.hint_text_n_score_plus.setString('+40');
                        that.score_text.setString(sc + 40);
                    }
                else if(that.letterArray.length==4)
                {
                        that.hint_text_n_score_plus.setString('+60');
                        that.score_text.setString(sc + 60);
                }                    
                else if(that.letterArray.length==5)
                {
                        that.hint_text_n_score_plus.setString('+70');
                        that.score_text.setString(sc + 70);
                }
                else if(that.letterArray.length==6)
                {
                        that.hint_text_n_score_plus.setString('+90');
                        that.score_text.setString(sc + 90);
                }
                else if(that.letterArray.length==7)
                {
                        that.hint_text_n_score_plus.setString('+100');
                        that.score_text.setString(sc + 100);
                }
                else if(that.letterArray.length==8)
                {
                        that.hint_text_n_score_plus.setString('+120');
                        that.score_text.setString(sc + 120);
                }
                else if(that.letterArray.length==9)
                {
                        that.hint_text_n_score_plus.setString('+130');
                        that.score_text.setString(sc + 130);
                }
                else if(that.letterArray.length==10)
                {
                        that.hint_text_n_score_plus.setString('+150');
                        that.score_text.setString(sc + 150);
                }
                else if(that.letterArray.length==11)
                {
                        that.hint_text_n_score_plus.setString('+170');
                        that.score_text.setString(sc + 170);
                }
                else if(that.letterArray.length==12)
                {
                        that.hint_text_n_score_plus.setString('+200');
                        that.score_text.setString(sc + 200);
                }
                
                setTimeout(function(){
                    that.hint_text_n_score_plus.setVisible(false);
                    for(var i=0; i<that.letterArray.length; i++)
                    {
                        var ind = that.chars.indexOf(that.letterArray[i]);
                        var val = that.storeLetter[i];
                        that.removeChild(val[val.length-1]);
                        that.removeChild(that.clickLetter[ind]);
                        val.pop();
                        if(val.length>0)
                        {
                            val[val.length-1].flag = 0;
                        }
                    }
                    that.sorryText.setString("");
                    that.hint_flag = 0;
                    Level_2_mainFunction(that);
                },300);
            }
          }          
          else if(target.id=="Wrong_Button")
          {
              if(that.storeLetter.length>0)
              {
                    var item = that.storeLetter[that.storeLetter.length-1];
                    item[item.length-1].x = item[item.length-1].x + 8;
                    item[item.length-1].y = item[item.length-1].y - 8;
                    item[item.length-1].flag = 0;
                    that.storeLetter.pop();
                    
                    var letter = that.letterIndex[that.letterIndex.length-1];
                    that.clickLetter[letter].x = that.clickLetter[letter].x+8;
                    that.clickLetter[letter].y = that.clickLetter[letter].y-8;
                    that.letterArray.pop();
                    that.letterIndex.pop();
                    
                    that.text.setString(that.letterArray.join(""));
                    var ch = checkWord(that.letterArray);
                    if(ch==1)
                    {
                        that.text.setColor(cc.color("#368e3c"));
                    }
                    else
                        that.text.setColor(cc.color("#000000")); 
                        
                that.sorryText.setString("");
              }
          }
          else if(target.id=="Hint_Button")
          {// first time hint button is clicked
              if(that.hint_flag==0)
              {
                  var sc = parseInt(that.score_text.getString());
                  if(sc>=10)
                  {
                      var res = 5;
                      res = two(that.chars.join(""), 5);
                      
                      if(res==5)
                      {
                          res = three(that.chars.join(""), 5);
                      }
                        
                      if(res==5)
                      {
                          res = four(that.chars.join(""), 5);
                      }
                        
                      if(res==5)
                      {
                          res = five(that.chars.join(""), 5);
                      }
                        
                      if(res==5)
                      {
                          res = six(that.chars.join(""), 5);
                      }
                      
                      if(res!=5)
                      {
                          that.hint_text_n_score_plus.setVisible(true);
                          that.hint_text_n_score_plus.setString(res);
                          that.hint_flag = 1;
                          that.hint_text = res;
                          that.score_text.setString(sc-10);
                          setTimeout(function(){
                              that.hint_text_n_score_plus.setVisible(false);
                          },500);
                      }
                  }                  
              }
              else
              {
                    that.hint_text_n_score_plus.setVisible(true);
                    that.hint_text_n_score_plus.setString(that.hint_text);
                    setTimeout(function(){
                        that.hint_text_n_score_plus.setVisible(false);
                    },500);
              }
          }
          else if(target.id=="Home")
          {
            cc.director.runScene(new LevelStateScene());
          }
          else if(target.id=="Ok_button_Level_1")
          {
            if(target.flag==1)
                cc.director.runScene(new Level_2_Scene());
          }
          else if(target.id=="Ok_button_Level_2")
          {
            if(target.flag==1)
                cc.director.runScene(new Level_3_Scene());
          }
          else if(target.id=="Ok_button_Level_3")
          {
            if(target.flag==1)
                cc.director.runScene(new Level_4_Scene());
          }
          else if(target.id=="Ok_button_Level_4")
          {
            if(target.flag==1)
                cc.director.runScene(new Level_5_Scene());
          }
          else if(target.id=="Ok_button_Level_5")
          {
            if(target.flag==1)
                cc.director.runScene(new LevelStateScene());
          }
      }
      
     return false;

  }   

});            
            cc.eventManager.addListener(sprite_click, this);
                       
        }
    });


