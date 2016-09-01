/// <reference path="../../cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />

var xc = xc || {};

xc.PopLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
       
        var worldSize = cc.winSize;

        var sceneRes = ccs.load(xc.PopLayer.res.pop_scene,xc.path);
        this.addChild(sceneRes.node);

        this.cloudContainer = [];
        this.stringContainer= [];
        var existingNumber = []
        this.wordInOrder = []

        this.currentImage = ccs.load(xc.PopLayer.res.pop_plane);
        this.currentImage.node.x = worldSize.width+200;
        this.currentImage.node.y = cc.director.getWinSize().height * 0.7;
        this.currentImage.node.uId="cube";
        this.addChild(this.currentImage.node);
        this.currentImage.node.runAction(this.currentImage.action);
        this.currentImage.action.play('planerun', true);
        this.currentImage.node.runAction(cc.MoveTo.create(10,cc.p(-200,cc.director.getWinSize().height*0.7)));

        var sentanceArray = ["Twinkle", "twinkle", "little", "star","How", "I","wonder", "what", "you", "are"];
        
        //   var cloud = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("pop/cloud.png"));
        //   cloud.setPosition(worldSize.width-300, cc.director.getWinSize().height * 0.76);
        //   this.addChild(cloud);

        //   var cloud1 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("pop/cloud.png"));
        //   cloud1.setPosition(worldSize.width-300, (cloud.getPosition().y - cloud.getBoundingBox().height));
        //   this.addChild(cloud1);

        //   var cloud2 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("pop/cloud.png"));
        //   cloud2.setPosition(worldSize.width-300, (cloud.getPosition().y - cloud.getBoundingBox().height*2));
        //   this.addChild(cloud2);

       var x = 0.7
       var y = 0;
       while(existingNumber.length != sentanceArray.length)
       {
              var duplicateCheck = true;
              var numberPicker = Math.floor(this.getRandomArbitrary(1,13));
              for(var i=0; i<existingNumber.length; i++)
              {
                  if(numberPicker == existingNumber[i])
                  {
                      duplicateCheck = false;
                  }
              }
              if(duplicateCheck)
              {
                    existingNumber.push(numberPicker);
              }
             
       }
       console.log(existingNumber);
       for(var i=0; i<sentanceArray.length; i++)
        {  
              var self = this; 
              var cloud = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("pop/cloud.png"));
              cloud.setName("cloud_"+(i+1));
              this.addChild(cloud);
              this.cloudContainer.push(cloud);
              cloud.id = y;
              y++;
            
              if(existingNumber[i]>=1 && existingNumber[i]<=4)
              {
                 cloud.Xpos = (worldSize.width/4) * (existingNumber[i]-1) + 300;
                 cloud.Ypos = cc.director.getWinSize().height * 0.76;
                 cloud.setPosition(worldSize.width+300, cloud.Ypos);
              }
             
              else if(existingNumber[i]>=5 && existingNumber[i]<=8)
              {
                 cloud.Xpos = (worldSize.width/4) * (existingNumber[i]-5) + 450;
                  cloud.Ypos = (cc.director.getWinSize().height * 0.76) - cloud.getBoundingBox().height;
                 cloud.setPosition(worldSize.width+300, cloud.Ypos);
              }
             
                else if(existingNumber[i]>=9 && existingNumber[i]<=12)
              {
                  cloud.Xpos = (worldSize.width/4) * (existingNumber[i]-9) + 190;
                  cloud.Ypos = (cc.director.getWinSize().height * 0.76) - (cloud.getBoundingBox().height*2);
                 cloud.setPosition(worldSize.width+300, cloud.Ypos);
              }

                var label = new cc.LabelTTF(sentanceArray[i], "Arial", 110);
           label.color = new cc.color(255,192,203);
           label.attr({
                        x : cloud.getBoundingBox().width/2,
                        y : cloud.getBoundingBox().height/2
           });
          // label.setName(sentanceArray[i]);
           cloud.addChild(label); 
           this.stringContainer.push[label];

            }
       setTimeout(function(){  
              for(var i=0; i < self.cloudContainer.length ; i++)
                    {
                        console.log(self);
                        self.cloudContainer[i].runAction(cc.MoveTo.create(Math.floor(self.getRandomArbitrary(10,15)),cc.p(self.cloudContainer[i].Xpos,self.cloudContainer[i].Ypos)));
                        console.log(self.cloudContainer[i]);
                        console.log(" x position : "+ self.cloudContainer[i].Xpos);
                        console.log(" y position : "+ self.cloudContainer[i].Ypos);
                    }       
        
                 }, 1500);

      setTimeout(function(){  
                 for(var i=0; i < self.cloudContainer.length ; i++)
                         {
                              cc.eventManager.addListener(listener.clone(), self.cloudContainer[i]);
                         }       
        
                     }, 17000);

   var listener = cc.EventListener.create({
   event : cc.EventListener.TOUCH_ONE_BY_ONE,
   swallowTouches : true,
   
   onTouchBegan : function(touch, event)
   {
       var target = event.getCurrentTarget();
       var locationInNode = target.convertToNodeSpace(touch.getLocation());
       var targetSize = target.getContentSize();
       var rect = cc.rect(0, 0, targetSize.width, targetSize.height);
       
       if(cc.rectContainsPoint(rect, locationInNode))
       {
           console.log("cloud id : "+target.id);
           self.setWordInRightOrder(target);
           return true;
       }
       return false;
   }
});

       this.scheduleUpdate();
    },

    update:function()
    {   
        //   if(this.currentImage.node.getPosition().x <= 200)
        // {
        //     this.removeChild(this.currentImage.node);
        // }
    },
    
      getRandomArbitrary :function (min, max)
    {
       return Math.random() * (max - min) + min;
    },
    
    setWordInRightOrder: function(wordObject)
    {
        if(this.wordInOrder.length == 0 && wordObject.id ==0)
        {
            this.makeSentance(wordObject);
          
        }
        else if(this.wordInOrder.length != 0 )
        {
          if(this.wordInOrder.length == wordObject.id)
          {
              this.makeSentance(wordObject);
          }

        }
    },
    makeSentance: function(word)
    {
           
           //this.correctSentance.setString(this.correctSentance.getString()+word.children[0].getString())
           if(this.wordInOrder.length == 0)
           {
           this.correctSentance = new cc.LabelTTF(word.children[0].getString(), "Arial", 100);
           this.correctSentance.color = new cc.color(255,192,203);
           this.correctSentance.attr({
               x : cc.director.getWinSize().width/2,
               y : cc.director.getWinSize().height*.93
           });
         
          this.addChild(this.correctSentance); 
          this.wordInOrder.push(word.id);
          this.removeChild(word);

        //   this.removeChild(this.correctSentance);
        //   console.log("correct sentance : "+this.correctSentance.getString());
           }
           else
           {
              this.wordInOrder.push(word.id);
              this.removeChild(word);
              this.correctSentance.setString(this.correctSentance.getString()+" "+word.children[0].getString());
           }
    }

});

xc.PopLayer.res = {
        pop_scene: xc.path +"pop/pop.json",
        pop_plane: xc.path +"pop/plane.json",
        pop_scene_plist: xc.path +"pop/pop.plist",
        pop_scene_png: xc.path + "pop/pop.png",

}