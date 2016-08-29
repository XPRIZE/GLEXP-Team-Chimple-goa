var playLayer3 = cc.Layer.extend({
    sprite:null,
    group : [],
    word : [],
    ref : [],
    stepRef : [],
    self : null,
    element :0,
    click : 0,
    tickClick : 0,
    char : null,
    flag : true,
    wordCorrect : [],
    image:null,
    list:[],
    myrounds:null,
    score:0,
    scoreLabel : null,
    tmp : null,
    
    ctor:function (char_sprite) {
       
        this._super();
        
        cc.spriteFrameCache.addSpriteFrames(res.plist);
      //  cc.spriteFrameCache.getSpriteFrame
      
        mychar = char_sprite;
        
        var topBG = new cc.Sprite(res.topBG);
        topBG.setAnchorPoint(0,0);
        topBG.x = 0;
        topBG.y = 630; 
        this.addChild(topBG, 0);
        
        var bottomBG = new cc.Sprite(res.bottomBG);
        bottomBG.setAnchorPoint(0,0);
        bottomBG.x = 0;
        bottomBG.y = 0; 
        this.addChild(bottomBG, 1);

        var tick = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Done_button.png"));
        tick.setAnchorPoint(0,0);
        tick.x = cc.winSize.width - tick.width-10;
        tick.y = 0; 
        tick.id = "Tick";
        this.addChild(tick, 1);
         cc.eventManager.addListener(cc.EventListener.create(  
        {event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , tick); 
        
        var cross = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Cross_button.png"));
        cross.setAnchorPoint(0,0);
        cross.x = cc.winSize.width - cross.width - 1600;
        cross.y = cc.winSize.height - cross.height - 2185; 
        cross.id = "Cross";
        this.addChild(cross, 1);
         cc.eventManager.addListener(cc.EventListener.create(  
        {event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , cross); 
        
        var hint = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Hint_button.png"));
        hint.setAnchorPoint(0,0);
        hint.x = cc.winSize.width - hint.width - 1600;
        hint.y = cc.winSize.height - hint.height - 2380; 
        hint.id = "Hint";
        this.addChild(hint, 1);
         cc.eventManager.addListener(cc.EventListener.create(  
        {event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , hint); 
        
        
        
        var ball1 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Click_round.png"));
        ball1.setAnchorPoint(0,0);
        ball1.x = cc.winSize.width - ball1.width - 1400;
        ball1.y = cc.winSize.height - ball1.height - 2380; 
        ball1.id = "Ball1";
        this.addChild(ball1, 1);  
         cc.eventManager.addListener(cc.EventListener.create(  
        {event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , ball1); 
        
        var ball2 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Click_round.png"));
        ball2.setAnchorPoint(0,0);
        ball2.x =  cc.winSize.width - ball2.width - 1200;
        ball2.y = cc.winSize.height - ball2.height - 2380;
        ball2.id = "Ball2";
        this.addChild(ball2, 1);  
         cc.eventManager.addListener(cc.EventListener.create(  
        {event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , ball2); 
         
        var ball3 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Click_round.png"));
        ball3.setAnchorPoint(0,0);
        ball3.x = cc.winSize.width - ball3.width - 1000;
        ball3.y = cc.winSize.height - ball3.height - 2380;
        ball3.id = "Ball3"; 
        this.addChild(ball3, 1);
        cc.eventManager.addListener(cc.EventListener.create(  
        {event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , ball3);
        
        var ball4 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Click_round.png"));
        ball4.setAnchorPoint(0,0);
        ball4.x = cc.winSize.width - ball4.width - 800;
        ball4.y = cc.winSize.height - ball4.height - 2380; 
        ball4.id = "Ball4";  
        this.addChild(ball4, 1);
        cc.eventManager.addListener(cc.EventListener.create(  
        {event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , ball4);
        
        var ball5 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Click_round.png"));
        ball5.setAnchorPoint(0,0);
        ball5.x = cc.winSize.width - ball5.width - 600;
        ball5.y = cc.winSize.height - ball5.height - 2380;
        ball5.id = "Ball5";  
        this.addChild(ball5, 1);
        cc.eventManager.addListener(cc.EventListener.create(  
        {event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , ball5);
        
        var ball6 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Click_round.png"));
        ball6.setAnchorPoint(0,0);
        ball6.x = cc.winSize.width - ball6.width - 400;
        ball6.y = cc.winSize.height - ball6.height - 2380;
        ball6.id = "Ball6";  
        this.addChild(ball6, 1);
        cc.eventManager.addListener(cc.EventListener.create(  
        {event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , ball6);
         
        var square1 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Click_square.png"));
        square1.setAnchorPoint(0,0);
        square1.x = cc.winSize.width - square1.width - 1150;
        square1.y = cc.winSize.height - square1.height - 2185; 
        this.addChild(square1, 1);
        
        var square2 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Click_square.png"));
        square2.setAnchorPoint(0,0);
        square2.x = cc.winSize.width- square1.width - 930;
        square2.y = cc.winSize.height - square1.height - 2185;
        this.addChild(square2, 1);
        
        var square3 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Click_square.png"));
        square3.setAnchorPoint(0,0);
        square3.x = cc.winSize.width- square1.width - 710;
        square3.y = cc.winSize.height - square1.height - 2185;
        this.addChild(square3, 1);
         
         
         
        var scoreBoard = new cc.Sprite(res.scoreBoard);
        scoreBoard.setAnchorPoint(0,0);
        scoreBoard.x = 650;
        scoreBoard.y = 1400; 
        this.addChild(scoreBoard, 1);
        
        this.stepPosition=[640,998, 1356,1714,2072,2436];
           for(var i=0; i< 3;i++)
          {  
            var stepLeft = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Step.png"));
            stepLeft.setPosition(0,(this.stepPosition[i*2]));    
            stepLeft.setAnchorPoint(0,0);
        
            this.stepRef.push(stepLeft);
            this.addChild(stepLeft, 0);
          }
           for( var i=1; i <4;i++)
          {
            var stepRight = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Step.png"));
            stepRight.setPosition(1235,(this.stepPosition[(i*2)-1]));  
            stepRight.setAnchorPoint(0,0); 
            
            this.stepRef.push(stepRight);
            this.addChild(stepRight, 0);
          }
          
        //this.charPosition=[400,520,710,900,1090,1300];
        char = new cc.Sprite(mychar);  
        //char = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Character_01.png"));
    //    char.setPosition(cc.winSize.width - char.width - 800,cc.winSize.height - char.height -1620);
    //     char.setAnchorPoint(0,0);
    //     this.addChild(char, 1);
       
        tmp = ccs.load(res.animate);
        tmp.node.setPosition(cc.winSize.width - char.width - 800,cc.winSize.height - char.height -1450);
        this.addChild(tmp.node);
        tmp.node.runAction(tmp.action);
 
        //  tmp.action.play("Jump", true);
         


                
        this.consonants = ['B','C','D','F','G','H','J','K','L','M','N','P','Q','R','S','T','V','W','X','Y','Z'];
        this.vowels = ['A','E','I','O','U'];
        
        this.wordPos = [{x:460,y:180},{x:700,y:180},{x:900,y:180}];
        this.letterPos = [{x:220,y:5},{x:420,y:5},{x:620,y:5},{x:820,y:5},{x:1020,y:5},{x:1220,y:5}]; 
        
        scoreLabel = new cc.LabelTTF(''+this.score,'Arial', 100 );
        scoreLabel.x =cc.winSize.width - 1380;
        scoreLabel.y =cc.winSize.height - 90;
        scoreLabel.setColor(cc.color(0,0,0)); 
        this.addChild(scoreLabel,0); 
        
        this.createLevel();
        self = this;
        this.scheduleUpdate();
        return true;
        
        
  },
  
  update: function(dt){
    if (this.list.length == 0){
        
         cc.director.runScene(new selectScene(this.score));
       // cc.director.runScene(new roundScene(3,myrounds));
    } 
    
  },
        
        createLevel : function(){
        group =  this.generateRandomLetters(6,this.array);
        for( var i=0; i<6 ;i++){
        var path = cc.spriteFrameCache.getSpriteFrame(group[i]+".png") ;    
        image = new cc.Sprite(path.valueOf());
        this.addChild(image, 1); 
        image.setAnchorPoint(0,0);
        image.setPosition(this.letterPos[i].x , this.letterPos[i].y );
        }
        var string = "";
        for( var i=0; i< group.length; i++)
        {
            string += group[i];
        }
       var result = permutate.getPermutations(string,3);
       for( var i=0 ; i< result.length ; i++)
       {
           if(dict3.indexOf(result[i].toLowerCase()) != -1)
           {
                this.list.push(result[i]);
           }
       }    
      
       
     cc.log(this.list);
     
    //  if( this.list.length == 0)
    //  {
    //       cc.director.runScene(new roundScene(3,2));
    //  }
     
    },
    
    stepMove : function(){
       if(this.tickClick < 2){
           
       } 
       else {
           for(var i=0; i< this.stepRef.length ;i++ ) 
           {
             var moveBy = new cc.MoveBy(1, cc.p(0,-358));
             this.stepRef[i].runAction(moveBy);
             
             if(this.stepRef[i].y < 550)
             {
                 this.stepRef[i].y = 2560;
                
             }
            
           } 
      }
        
    },
  
    charMove : function(){
        
         if(this.tickClick  == 1)
         { cc.log(tmp.node.x);
           cc.log(tmp.node.y);
           
             tmp._currentAnimationName = 'Jump';
           
            tmp.node._renderCmd._dirtyFlag = 1;
            this._renderCmd._dirtyFlag = 1;
            var action = tmp.node.actionManager.getActionByTag(tmp.node.tag, tmp.node);
            action.play(tmp._currentAnimationName, true);

            for(var i = 0; i<tmp.node.children.children.length; i++)
            {
                tmp.node.children.children[i].runAction(cc.JumpBy(2, cc.p(540, 450), 400, 1));
            }

            //action.play("Jump", true);
         //   tmp.node.x = tmp.node.x + 540;
     
        //  var actionBy = new cc.JumpBy(1, cc.p(540, 450), 400, 1);
        //  tmp.node.runAction(actionBy);
        
         cc.log(tmp.node.x);
          cc.log(tmp.node.y);
    // cc.log(tmp.node.runAction(actionBy));
        
      
         } 
       else if(this.tickClick > 1 )
       {
          if( this.flag == true)
        {   cc.log("sdfmmmmmmmmmmmm");
        tmp._currentAnimationName = 'Jump';
           
            tmp.node._renderCmd._dirtyFlag = 1;
            this._renderCmd._dirtyFlag = 1;
            var action = tmp.node.actionManager.getActionByTag(tmp.node.tag, tmp.node);
            action.play(tmp._currentAnimationName, true);
           var actionBy = new cc.JumpBy(2, cc.p(-1100, 5), 250, 1);
           tmp.node.runAction(actionBy);
            // var action = cc.BezierBy.create(3,cc.p(-530,5));
            // char.runAction(action);
             this.flag = false
        }
        else
        {   cc.log("kkkkkk");
       
       cc.log("sdfmmmmmmmmmmmmqqqqqqqqqqqqqqqqqqqqqqqq");
        tmp._currentAnimationName = 'Jump';
            tmp.node._renderCmd._dirtyFlag = 1;
            this._renderCmd._dirtyFlag = 1;
            var action = tmp.node.actionManager.getActionByTag(tmp.node.tag, tmp.node);
            action.play(tmp._currentAnimationName, true);
            var actionBy = new cc.JumpBy(2, cc.p(1100, 5), 250, 1);
           tmp.node.runAction(actionBy);
            this.flag = true;
         }
       }  
    },
    
     searchWord : function(word){
        
         var words = "";
     for( var i=0 ; i< word.length ; i++)  {
        
        words += word[i];
        
     }  
     cc.log(words);
     if(this.list.indexOf(words) != -1)
     {
      self.tickClick++;
      self.charMove();
      self.stepMove(); 
      this.wordCorrect.push(words);
      var index = this.list.indexOf(words);
      this.list.splice(index,1);
      cc.log(this.list);
      this.incrementScore();
      for( var i=0 ; i< word.length ; i++)  {
          
          
       } 
     }
     else
     {
         cc.log("false"); 
     }  
     
    },
    
    hint : function(){
   
        var random = Math.floor(Math.random()*(this.list.length-1));
        var nameLabel = new cc.LabelTTF(this.list[random],'Arial', 100 );
		nameLabel.setAnchorPoint(0.5,0.5); 
        nameLabel.x = cc.winSize.width - 900;
        nameLabel.y = cc.winSize.height - 2070; 
        nameLabel.setColor(cc.color(250,250,250));
        this.addChild(nameLabel, 1);
        this.scheduleOnce(function(){
            this.removeChild(nameLabel);
        },2);
       
   this.decrementScore();
    },
    
  
    
    generateRandomLetters : function(count,array){
      var vow = ['A','E','I','O','U'];
      var con = ['B','C','D','F','G','H','J','K','L','M','N','P','Q','R','S','T','V','W','X','Y','Z'];
      var array = [];
      for(var i=0;i<2;i++)
      {
      this.randomIndex = Math.floor(Math.random()*(vow.length-1));// Math.floor(Math.random() * 5-i);
    // console.log("val =" +this.randomIndex );
      array.push(vow[this.randomIndex]);  
      vow.splice(this.randomIndex,1); 
      }
      for(var i=0;i<count-2;i++)
      {
      this.randomIndex1 = Math.floor(Math.random()*(con.length-1));//Math.floor(Math.random() * 21-i);  
    //  console.log("val =" +this.randomIndex1 );
      array.push(con[this.randomIndex1]);
      con.splice(this.randomIndex1,1);
         
     }  
     return array;
    },
     onTouchBegan: function(touch, event){
         var target = event.getCurrentTarget();
         var location = target.convertToNodeSpace(touch.getLocation());
         var targetSize = target.getContentSize();
         var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);
         if (cc.rectContainsPoint(targetRectangle, location))
                   {
                       if(target.id == "Ball1"&& self.element < 3){
                       // console.log(group);
                       var path = cc.spriteFrameCache.getSpriteFrame(group[0]+".png")  ;    
                       var image = new cc.Sprite(path.valueOf());
                       self.ref.push(image);
                       self.addChild(image, 2); 
                       image.setAnchorPoint(0,0);
                       image.setPosition(self.wordPos[self.element].x , self.wordPos[self.element].y );
                       self.element++;
                       self.word.push(group[0]);
                       
                   }
                    if(target.id == "Ball2"&& self.element < 3){
                       // console.log(group);
                       var path = cc.spriteFrameCache.getSpriteFrame(group[1]+".png");    
                       var image = new cc.Sprite(path.valueOf());
                       self.ref.push(image);
                       self.addChild(image, 1); 
                       image.setAnchorPoint(0,0);
                       image.setPosition(self.wordPos[self.element].x , self.wordPos[self.element].y );
                       self.element++;
                       self.word.push(group[1]);
                        
                   }
                    if(target.id == "Ball3"&& self.element < 3){
                        //console.log(group);
                       var path =cc.spriteFrameCache.getSpriteFrame(group[2]+".png");    
                       var image = new cc.Sprite(path.valueOf());
                       self.ref.push(image);
                       self.addChild(image, 1); 
                       image.setAnchorPoint(0,0);
                       image.setPosition(self.wordPos[self.element].x , self.wordPos[self.element].y );
                       self.element++;
                       self.word.push(group[2]);
                       
                   }
                    if(target.id == "Ball4"&& self.element < 3){
                        //console.log(group);
                       var path =cc.spriteFrameCache.getSpriteFrame(group[3]+".png");    
                       var image = new cc.Sprite(path.valueOf());
                       self.ref.push(image);
                       self.addChild(image, 1); 
                       image.setAnchorPoint(0,0);
                       image.setPosition(self.wordPos[self.element].x , self.wordPos[self.element].y );
                       self.element++;
                       self.word.push(group[3]);
                   }
                    if(target.id == "Ball5"&& self.element < 3){
                        //console.log(group);
                       var path = cc.spriteFrameCache.getSpriteFrame(group[4]+".png");    
                       var image = new cc.Sprite(path.valueOf());
                       self.ref.push(image);
                       self.addChild(image, 1); 
                       image.setAnchorPoint(0,0);
                       image.setPosition(self.wordPos[self.element].x , self.wordPos[self.element].y );
                       self.element++;
                       self.word.push(group[4]);
                   }
                    if(target.id == "Ball6" && self.element < 3 ){
                       // console.log(group);
                       var path = cc.spriteFrameCache.getSpriteFrame(group[5]+".png") ;    
                       var image = new cc.Sprite(path.valueOf());
                       self.ref.push(image);
                       self.addChild(image, 1); 
                       image.setAnchorPoint(0,0);
                       image.setPosition(self.wordPos[self.element].x , self.wordPos[self.element].y );
                       self.element++;
                       self.word.push(group[5]);
                   }
                   if(target.id == "Cross"){
                    //console.log( self.ref[0]);
                          //var path = "res/Alphabets/"+ self.word[self.word.length -1]+".png" ;    
                          //var image = path.valueOf()
                          self.word.pop(self.word.length);
                         
                         // console.log( self.word);
                          self.removeChild(self.ref[self.word.length]); 
                          self.ref.pop(self.word.length);
                          self.element--;
                          if(self.word.length == 0){
                            self.element = 0;   
                           cc.eventManager.removeListener(target);
                          }
                         // image.setPosition(this.letterPos[i].x , this.letterPos[i].y );
                   }
                    if(target.id == "Tick"){
                       self.searchWord(self.word);
                     }
                   
                   if(target.id == "Hint"){
                       self.hint();
                   }                      
                       
    }
   return false; 
 },
   
    incrementScore : function()
  {
    this.score += 2;
    scoreLabel.setString(""+ this.score);
  
  },
  
   decrementScore : function()
   {
       this.score -= 1;
       scoreLabel.setString(""+ this.score);
   }

   
});

var playScene3 = cc.Scene.extend({
    ctor:function (a) {
        this._super();
        
        var layer = new playLayer3(a);
        this.addChild(layer);
    }
});