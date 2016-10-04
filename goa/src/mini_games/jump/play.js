
var xc = xc || {};

xc.playLayer = cc.Layer.extend( {
   gameName: "JumpOnWords",
   group : [], 
   ballref:[],
   square:[],
   word:[],
   wordObj : [],
   stepRef:[],
   list:[],
   dict :[],
   self : null,
   index:0,
   wrongCount:0,
   correct: 0,
   flag:true,
   score:0,
   scoreLabel : null,
   _dir_Flag: true,
nameLabel : null,
    ctor:
    function () {
        this._super();
        

        this.size = cc.winSize;
        cc.spriteFrameCache.addSpriteFrames(xc.playLayer.res.jump_plist);

        this.char = ccs.load(xc.playLayer.res.char,xc.path);
        this.char.node.setPosition(cc.p(this.size.width * 0.06, 780));
        this.addChild(this.char.node,1);

      
        this.bg = ccs.load(xc.playLayer.res.jump_game, xc.path);
        if( this.size.width > 2560) {
          this.extraX = (this.size.width - 2560) / 2;
		this.bg.node.setPositionX(( this.size.width - 2560) / 2);
	    }
        else
        {
             this.extraX = 0;
        }
        this.addChild(this.bg.node);
        // var child = this.bg.node.getChildren(); 
        //  for(var i=0; i < child.length ;i++)
        //  {
        //     var name = child[i].getName();
        //     cc.log("%s", name);
        //  }
    
//cc.log(cc.FileUtils.getInstance().getStringFromFile(xc.playLayer.res.jump_plist));

       
        
        
        var ball1 = this.bg.node.getChildByName("ball_34_0");
        ball1.id = "Ball1";
        this.ballref.push(ball1.getPosition());
        cc.eventManager.addListener(cc.EventListener.create(  
        {event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , ball1); 

        var ball2 = this.bg.node.getChildByName("ball_35_0");
        ball2.id = "Ball2";
        this.ballref.push(ball2.getPosition());
        cc.eventManager.addListener(cc.EventListener.create(  
        {event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , ball2); 

        var ball3 = this.bg.node.getChildByName("ball_35");
        ball3.id = "Ball3";
        this.ballref.push(ball3.getPosition());
        cc.eventManager.addListener(cc.EventListener.create(  
        {event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , ball3); 

        var ball4 = this.bg.node.getChildByName("ball_34");
        ball4.id = "Ball4";
        this.ballref.push(ball4.getPosition());
        cc.eventManager.addListener(cc.EventListener.create(  
        {event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , ball4); 

        var ball5 = this.bg.node.getChildByName("ball_34_1");
        ball5.id = "Ball5";
        this.ballref.push(ball5.getPosition());
        cc.eventManager.addListener(cc.EventListener.create(  
        {event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , ball5); 

        var ball6 = this.bg.node.getChildByName("ball_35_1");
        ball6.id = "Ball6";
        this.ballref.push(ball6.getPosition());
        cc.eventManager.addListener(cc.EventListener.create(  
        {event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , ball6); 

        var ball7 = this.bg.node.getChildByName("ball_35_0_0");
        ball7.id = "Ball7";
        this.ballref.push(ball7.getPosition());
        cc.eventManager.addListener(cc.EventListener.create(  
        {event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , ball7); 

         var ball8 = this.bg.node.getChildByName("ball_34_0_0");
        ball8.id = "Ball8";
        this.ballref.push(ball8.getPosition());
        cc.eventManager.addListener(cc.EventListener.create(  
        {event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , ball8); 

        var ball9 = this.bg.node.getChildByName("ball_8");
        ball9.id = "Ball9";
        this.ballref.push(ball9.getPosition());
        cc.eventManager.addListener(cc.EventListener.create(  
        {event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , ball9); 

        var ball10 = this.bg.node.getChildByName("ball_9");
        ball10.id = "Ball10";
        this.ballref.push(ball10.getPosition());
        cc.eventManager.addListener(cc.EventListener.create(  
        {event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , ball10); 

        

        var wrong = this.bg.node.getChildByName("cross_button_33");
        wrong.id="Wrong";
        cc.eventManager.addListener(cc.EventListener.create(  
        {event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , wrong); 

        var tick = this.bg.node.getChildByName("tick_button_31");
        tick.id="Tick";
        cc.eventManager.addListener(cc.EventListener.create(  
        {event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , tick); 

        var hint = this.bg.node.getChildByName("hint_button_32");
        hint.id="Hint";
        cc.eventManager.addListener(cc.EventListener.create(  
        {event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , hint); 


        var square1 = this.bg.node.getChildByName("box_10");
        this.square.push(square1.getPosition());

        var square2 = this.bg.node.getChildByName("box_11");
        this.square.push(square2.getPosition());

        var square3 = this.bg.node.getChildByName("box_10_0");
        this.square.push(square3.getPosition());

        var square4 = this.bg.node.getChildByName("box_11_0");
        this.square.push(square4.getPosition());

        var square5 = this.bg.node.getChildByName("box_10_1");
        this.square.push(square5.getPosition());

        var square6 = this.bg.node.getChildByName("box_11_1");
        this.square.push(square6.getPosition());

        var square7 = this.bg.node.getChildByName("box_10_0_0");
        this.square.push(square7.getPosition());

        var square8 = this.bg.node.getChildByName("box_11_0_0");
        this.square.push(square8.getPosition());

       

      

        scoreLabel = new cc.LabelTTF(''+this.score,'Arial', 100 );
        scoreLabel.x =cc.winSize.width - 1380;
        scoreLabel.y =cc.winSize.height - 90;
        scoreLabel.setColor(cc.color(0,0,0)); 
        this.addChild(scoreLabel,0); 

      //  this.stepPosition =[{x:2000,y:900},{x:1200,y:600},{x:400,y:300},{x:1200,y:0},{x:2000,y:-300}];
        var step_width = this.size.width /4;
        
    //    for(var i=0; i<5; i++)
    //    {
     //   var step =new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("jump_on_words/step.png"));    
     //   step.setPosition(cc.p(this.size.width - this.stepPosition[i].x,this.size.height-this.stepPosition[i].y));
     //   this.stepRef.push(step);
     //   step.setName("step");
       // this.addChild(step,1);
   //     }



        this.stepRight =[900 ,1200 , 1500];

        for(var i=1; i< 4; i++)
        {
        var step =new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("jump_on_words/step.png"));    
        step.setPosition(cc.p(step_width * i, this.stepRight[i-1]));
        this.stepRef.push(step);
        step.setName("step");
        this.addChild(step,1);
        }

       this.stepLeft =[2100,1800];
        for(var i=2; i>0 ; i--)
        {
        var step =new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("jump_on_words/step.png"));    
        step.setPosition(cc.p(step_width * (i), this.stepLeft[i-1]));
        this.stepRef.push(step);
        step.setName("step");
        this.addChild(step,1);
        }



        this.consonants = ['B','C','D','F','G','H','J','K','L','M','N','P','Q','R','S','T','V','W','X','Y','Z'];
        this.vowels = ['A','E','I','O','U'];

       this.createLevel();
         this.scheduleUpdate();
        self=this;
    },

     update: function(dt){
         if(this.bg.node!= null){

         var child = this.getChildByName("step");
        if(cc.rectIntersectsRect(child.getBoundingBox() , this.bg.node.getChildByName("Panel_1").getChildByName("Panel_5").getBoundingBox()))
         {
          //   this.stepRef.pop();
          this.stepRef.shift();
             cc.log("done");
             this.removeChild(child);
        
        }
        

         }
     },
     createLevel : function(){

      group =  this.generateRandomLetters(10,this.array);
      for( var i=0; i<10 ;i++){
      var alpha = cc.LabelTTF.create(group[i], 'Arial', 130);
      this.addChild(alpha);
      alpha.setPosition(cc.p(this.ballref[i].x + this.extraX,this.ballref[i].y));
      alpha.setAnchorPoint(0.5,0.5);
      alpha.setColor(cc.color(0,0,0));
        //  cc.log("alpha =",group[i]);
        }

       cc.log(group);
      this.string = '';
        {
            this.string += group[i];
        }
        cc.log(this.string);
     this.dict =  xc.WordUtil.getValidCombinations(this.string.toLowerCase());
     this.allwords = cc.loader.getRes(xc.path + "english/allwords.json");
    // dict = ["abc","dsa","cba","bda","hsf"];
       
        cc.log(this.dict);
     },


     charMove : function()
     {

        var jump = new cc.jumpBy(1,cc.p(this.size.width /4 - (cc.winSize.width * 0.06),230),150,1);
        this.char.node.runAction(jump);

        var animation = ccs.load(xc.playLayer.res.char,xc.path);
       this.char.node.runAction(animation.action);
       animation.action.play("jumping",false);

     },
    charjump: function()
    {
        // if (this.correct % 2 == 0 && this.correct > 2 && this._dir_Flag){
        //      var jump = new cc.jumpBy(1.5,cc.p(this.size.width /4,300),200,1);
        // } else if (this.correct == 2){
        //     var jump = new cc.jumpBy(1.5,cc.p(this.size.width /4,300),200,1);
        // } else {
        //     var jump = new cc.jumpBy(1.5,cc.p(-this.size.width /4,300),200,1);
        // }
       var x = 1;
        if (this._dir_Flag){
           x = 1;
        }else{
            x = -1;
        }
        var jump = new cc.JumpBy(1.5,cc.p(x * this.size.width /4,300),200,1);
       this.char.node.runAction(cc.sequence( jump, cc.callFunc(this.jumpCallback, this)));//runAction(jump);
       var animation = ccs.load(xc.playLayer.res.char,xc.path);
       this.char.node.runAction(animation.action);
       animation.action.play("jumping",false);
    },
   
   
    jumpCallback :function(){ 
       if (this.correct % 2 == 1 && this.correct >2 ){

           this.stepMove();
            if(this.flag == true)
                       {
                         this.stepRightMove();
                         this.flag = false;
                       }
                      else
                       {
                           this.stepLefttMove();
                           this.flag = true;
                       }
       }
    },
     
     
     
      stepRightMove : function()
    { var step_width = this.size.width /4;
        var stepRight =[1800,2100];
        for(var i=2; i<4 ; i++)
        {
        var step =new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("jump_on_words/step.png"));    
        step.setPosition(cc.p(step_width * (i),stepRight[i-2]));
        this.stepRef.push(step);
        step.setName("step");
        this.addChild(step,1);
        }


    },

       stepLefttMove : function()
    { var step_width = this.size.width /4;
        var stepLeft =[2100,1800];
        for(var i=2; i>0 ; i--)
        {
        var step =new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("jump_on_words/step.png"));    
        step.setPosition(cc.p(step_width * (i),stepLeft[i-1]));
        this.stepRef.push(step);
        step.setName("step");
        this.addChild(step,1);
        }

    }, 


      stepMove : function()
      {
            this._dir_Flag = (!this._dir_Flag);
    for(var i=0; i<this.stepRef.length; i++)
     {
        var moveBy = new cc.MoveBy(1, cc.p(0,-600));
        cc.log(this.stepRef.length);
        this.stepRef[i].runAction(moveBy);
    //     if(cc.rectIntersectsRect(this.getChildByName("step").getBoundingBox() , this.bg.node.getChildByName("Panel_1").getChildByName("Panel_5").getBoundingBox()))
    //  {
    //     cc.log("done");
        
    //  }
           
     }
     var moveBy = new cc.MoveBy(1, cc.p(0,-600));
     this.char.node.runAction(moveBy);
      },
  
  
  
    verify : function (word)
    {
       
             var words = '';
     for( var i=0 ; i< word.length ; i++)  {
        
        words += word[i];
        
     }  
     cc.log("done= %s" , words);
        if(this.allwords.indexOf(words.toLowerCase()) != -1)
        {
          
         cc.log(this.allwords[this.allwords.indexOf(words.toLowerCase())]);
         this.jumping();
          cc.log( this.allwords.splice( this.allwords.indexOf(words.toLowerCase()) ,1));
          var dict_index = this.dict.indexOf(words.toLowerCase());
          if (dict_index != -1){
              this.dict.splice(dict_index,1);
          }  
        }    
     else
        {
        // cc.log("aaaa");
         
        }     
     
   
this.remove();
    },

    remove : function()
  {
      for (var i = 0; i< this.wordObj.length; i++){
          var child = this.getChildByName("letter");
          this.removeChild(child);
      }
      this.word.splice(0,this.word.length);
      this.wordObj.splice(0,this.wordObj.length);
    //     this.removeChild(this.wordObj[(this.index) - 1]);
    //     this.wordObj.pop(this.wordObj[(this.index) - 1]);
    //     this.word.pop(this.word[(this.index) - 1]);
    //     this.index--;  
    //     if(this.wordObj.length == 0)
    //     {
    //         this.index = 0;   
    //   //      cc.eventManager.removeListener(this.wordObj[(this.index) - 1]);
    //     }  
  },    
   
    jumping : function()
    {
        this.incrementScore();
        if(self.correct >= 2)
        {
        self.charjump();
        }else {
        self.charMove();
        }
    },
   
   

     help : function ()
     {
        // cc.log(this.nameLabel);
         if (this.nameLabel){
            cc.log(this.nameLabel);
             this.removeChild(this.nameLabel);
         }
       //  this.removeChild(this.nameLabel);
         cc.log("hiint");
        this.decrementScore();
        this.random = Math.floor(Math.random()*(this.dict.length-1));  
        this.nameLabel = new cc.LabelTTF(this.dict[this.random].toUpperCase(),'Arial', 100 );
		this.nameLabel.setAnchorPoint(0.5,0.5); 
        this.nameLabel.x = cc.winSize.width - 1400;
        this.nameLabel.y = cc.winSize.height - 1030; 
        this.nameLabel.setName("hintlabel");
        this.nameLabel.setColor(cc.color(0,0,0));
        this.addChild(this.nameLabel, 1);
        this.scheduleOnce(function(){
           this.removeChild(this.nameLabel);
           this.nameLabel = null;
        },3);

     if(this.score <= -3 )
     {
         if (cc.sys.isNative) {
                var menuContext = this.getParent().menuContext;
                cc.log("showscore");
                menuContext.showScore();
            }
     }
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
   
     incrementScore : function()
  {
         self.correct++;
    this.score += 2;
    scoreLabel.setString(""+ this.score);
    if(this.score >= 10)
    {
        if (cc.sys.isNative) {
                var menuContext = this.getParent().menuContext;
                cc.log("showscore");
                menuContext.showScore();
            }
    }
  },
  
   decrementScore : function()
   {
       this.score -= 1;
       scoreLabel.setString(""+ this.score);
   },

   
   
    onTouchBegan: function(touch, event){
         var target = event.getCurrentTarget();
         var location = target.convertToNodeSpace(touch.getLocation());
         var targetSize = target.getContentSize();
         var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);
         if (cc.rectContainsPoint(targetRectangle, location))
                   {
                       if(target.id == "Ball1" && self.word.length < 10){ 
                        var letter = new cc.LabelTTF (group[0], 'Arial' , 130);
                        self.addChild(letter,2);
                        letter.setPosition(cc.p(self.square[self.index].x+ self.extraX,self.square[self.index].y));
                        letter.setAnchorPoint(0.5,0.5);
                        letter.setColor(cc.color(0,0,0)); 
                         letter.setName("letter");
                        self.index++;
                        self.word.push(group[0]);
                        self.wordObj.push(letter);
                        cc.log("hello =", self.word); 
                       }
                        if(target.id == "Ball2"&& self.word.length < 10){ 
                         var letter =  new cc.LabelTTF(group[1],'Arial', 130);
                        self.addChild(letter,2);
                        letter.setPosition(cc.p(self.square[self.index].x+ self.extraX,self.square[self.index].y));
                        letter.setAnchorPoint(0.5,0.5);
                        letter.setColor(cc.color(0,0,0));  
                        letter.setName("letter");
                        self.index++;
                        self.word.push(group[1]);
                        self.wordObj.push(letter);
                          
                       }
                        if(target.id == "Ball3"&& self.word.length < 10){ 
                         var letter = new cc.LabelTTF(group[2],'Arial', 130);
                        self.addChild(letter,2);
                        letter.setPosition(cc.p(self.square[self.index].x+ self.extraX,self.square[self.index].y));
                        letter.setAnchorPoint(0.5,0.5);
                        letter.setColor(cc.color(0,0,0));  
                        letter.setName("letter");
                        self.index++;
                        self.word.push(group[2]);
                        self.wordObj.push(letter);
                          
                       }
                        if(target.id == "Ball4"&& self.word.length < 10){ 
                         var letter = new cc.LabelTTF(group[3],'Arial', 130);
                        self.addChild(letter,2);
                        letter.setPosition(cc.p(self.square[self.index].x+ self.extraX,self.square[self.index].y));
                        letter.setAnchorPoint(0.5,0.5);
                        letter.setColor(cc.color(0,0,0));  
                        letter.setName("letter");
                        self.index++;
                        self.word.push(group[3]);
                        self.wordObj.push(letter);
                          
                       }
                        if(target.id == "Ball5"&& self.word.length < 10){ 
                         var letter = new cc.LabelTTF(group[4],'Arial', 130);
                        self.addChild(letter,2);
                        letter.setPosition(cc.p(self.square[self.index].x+ self.extraX,self.square[self.index].y));
                        letter.setAnchorPoint(0.5,0.5);
                        letter.setColor(cc.color(0,0,0));  
                        letter.setName("letter");
                        self.index++;
                        self.word.push(group[4]);
                        self.wordObj.push(letter);
                          
                       }
                        if(target.id == "Ball6"&& self.word.length < 10){ 
                        var letter = new cc.LabelTTF(group[5],'Arial', 130);
                        self.addChild(letter,2);
                        letter.setPosition(cc.p(self.square[self.index].x+ self.extraX,self.square[self.index].y));
                        letter.setAnchorPoint(0.5,0.5);
                        letter.setColor(cc.color(0,0,0));  
                        letter.setName("letter");
                        self.index++;
                        self.word.push(group[5]);
                        self.wordObj.push(letter);
                     
                       }

                         if(target.id == "Ball7"&& self.word.length < 10){ 
                        var letter = new cc.LabelTTF(group[6],'Arial', 130);
                        self.addChild(letter,2);
                        letter.setPosition(cc.p(self.square[self.index].x+ self.extraX,self.square[self.index].y));
                        letter.setAnchorPoint(0.5,0.5);
                        letter.setColor(cc.color(0,0,0));  letter.setName("letter");
                        self.index++;
                        self.word.push(group[6]);
                        self.wordObj.push(letter);
                     
                       }

                         if(target.id == "Ball8"&& self.word.length < 10){ 
                        var letter = new cc.LabelTTF(group[7], 'Arial', 130);
                        self.addChild(letter,2);
                        letter.setPosition(cc.p(self.square[self.index].x+ self.extraX,self.square[self.index].y));
                        letter.setAnchorPoint(0.5,0.5);
                        letter.setColor(cc.color(0,0,0));  
                        letter.setName("letter");
                        self.index++;
                        self.word.push(group[7]);
                        self.wordObj.push(letter);
                     
                       }

                         if(target.id == "Ball9"&& self.word.length < 10){ 
                        var letter = new cc.LabelTTF(group[8],'Arial', 130);
                        self.addChild(letter,2);
                        letter.setPosition(cc.p(self.square[self.index].x+ self.extraX,self.square[self.index].y));
                        letter.setAnchorPoint(0.5,0.5);
                        letter.setColor(cc.color(0,0,0));  
                        letter.setName("letter");
                        self.index++;
                        self.word.push(group[8]);
                        self.wordObj.push(letter);
                     
                       }

                         if(target.id == "Ball10"&& self.word.length < 10){ 
                        var letter = new cc.LabelTTF(group[9],'Arial', 130);
                        self.addChild(letter,2);
                        letter.setPosition(cc.p(self.square[self.index].x+ self.extraX,self.square[self.index].y));
                        letter.setAnchorPoint(0.5,0.5);
                        letter.setColor(cc.color(0,0,0));  
                        letter.setName("letter");
                        self.index++;
                        self.word.push(group[9]);
                        self.wordObj.push(letter);
                     
                       }
                        if(target.id == "Wrong"){ 
                            cc.log("wrong");
                          //  cc.log("got = ",self.word[(self.index) - 1]);
                        
                   //   self.remove(self.index);
                       self.removeChild(self.wordObj[(self.index) - 1]);
                       self.wordObj.pop(self.wordObj[(self.index) - 1]);
                       self.word.pop(self.word[(self.index) - 1]);
                       self.index--;  
                       if (self.wordObj.length == 0)
                      {
                          self.index = 0;   
                          cc.eventManager.removeListener(target);
                      }       

                     /*  self.stepMove();
                       self.wrongCount++;
                       if(self.flag == true)
                       {
                         self.stepRightMove();
                         self.flag = false;
                       }
                      else
                       {
                           self.stepLefttMove();
                           self.flag = true;
                       }*/

                        }
                       if(target.id == "Tick"){ 
                       
                        
                        self.verify(self.word);
                        cc.log("tick");
                          if (self.wordObj.length == 0)
                      {
                          self.index = 0;   
                          cc.eventManager.removeListener(target);
                      }  
                        }    
                       if(target.id == "Hint"){ 
                         self.help();
                         
                       }   
                       
                   }
     return false;
    }              
});

xc.playLayer.res = {

    jump_main: xc.path +"jump_on_words/jump_on_words_main_menu.json",
    jump_game: xc.path +"jump_on_words/jump_on_words_game_menu.json",
    char:xc.path +"jump_on_words/character.json",
    jump_plist: xc.path +"jump_on_words/jump_on_words.plist",
    jump_png: xc.path +"jump_on_words/jump_on_words.png",
    dict:xc.path + "english/allwords.json"


}
