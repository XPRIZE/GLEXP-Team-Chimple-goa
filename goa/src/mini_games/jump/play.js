
var xc = xc || {};

xc.playLayer = cc.Layer.extend( {
   group : [], 
   ballref:[],
   square:[],
   word:[],
   self : null,
   index:0,
    ctor:function () {
        this._super();

        var size = cc.winSize;
        cc.spriteFrameCache.addSpriteFrames(xc.playLayer.res.jump_plist);


        bg = ccs.load(xc.playLayer.res.jump_game, xc.path);
        this.addChild(bg.node);
      
        var ball1 = bg.node.getChildByName("ball_34");
        ball1.id = "Ball1";
        this.ballref.push(ball1.getPosition());
        cc.eventManager.addListener(cc.EventListener.create(  
        {event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , ball1); 

        var ball2 = bg.node.getChildByName("ball_35");
        ball2.id = "Ball2";
        this.ballref.push(ball2.getPosition());
        cc.eventManager.addListener(cc.EventListener.create(  
        {event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , ball2); 

        var ball3 = bg.node.getChildByName("ball_36");
        ball3.id = "Ball3";
        this.ballref.push(ball3.getPosition());
        cc.eventManager.addListener(cc.EventListener.create(  
        {event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , ball3); 

        var ball4 = bg.node.getChildByName("ball_37");
        ball4.id = "Ball4";
        this.ballref.push(ball4.getPosition());
        cc.eventManager.addListener(cc.EventListener.create(  
        {event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , ball4); 

        var ball5 = bg.node.getChildByName("ball_38");
        ball5.id = "Ball5";
        this.ballref.push(ball5.getPosition());
        cc.eventManager.addListener(cc.EventListener.create(  
        {event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , ball5); 

        var ball6 = bg.node.getChildByName("ball_44");
        ball6.id = "Ball6";
        this.ballref.push(ball6.getPosition());
        cc.eventManager.addListener(cc.EventListener.create(  
        {event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , ball6); 

        var wrong = bg.node.getChildByName("cross_button_33");
        wrong.id="Wrong";
        cc.eventManager.addListener(cc.EventListener.create(  
        {event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , wrong); 


        var square1 =new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("jump_on_words/box.png"));
        square1.setPosition(cc.p(this.ballref[1].x,this.ballref[1].y+260));
        this.addChild(square1,1);
        this.square.push(square1.getPosition());

        var square2 =new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("jump_on_words/box.png"));
        square2.setPosition(cc.p(this.ballref[2].x+150,this.ballref[2].y+260));
        this.addChild(square2,1);
        this.square.push(square2.getPosition());

        var square3 =new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("jump_on_words/box.png"));
        square3.setPosition(cc.p(this.ballref[4].x,this.ballref[3].y+260));
        this.addChild(square3,1);
        this.square.push(square3.getPosition());

        this.consonants = ['B','C','D','F','G','H','J','K','L','M','N','P','Q','R','S','T','V','W','X','Y','Z'];
        this.vowels = ['A','E','I','O','U'];

        this.createLevel();
        self=this;
    },
     createLevel : function(){

      group =  this.generateRandomLetters(6,this.array);
      for( var i=0; i<6 ;i++){
      var alpha = cc.LabelTTF.create(group[i], "res/fonts/Marker Felt.ttf", 130);
      this.addChild(alpha);
      alpha.setPosition(cc.p(this.ballref[i].x,this.ballref[i].y));
      alpha.setAnchorPoint(0.5,0.5);
      alpha.setColor(cc.color(0,0,0));
          cc.log("alpha =",group[i]);
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
    onTouchBegan: function(touch, event){
         var target = event.getCurrentTarget();
         var location = target.convertToNodeSpace(touch.getLocation());
         var targetSize = target.getContentSize();
         var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);
         if (cc.rectContainsPoint(targetRectangle, location))
                   {
                       if(target.id == "Ball1"){ 
                        var letter = cc.LabelTTF.create(group[0], "res/fonts/Marker Felt.ttf", 130);
                        self.addChild(letter,2);
                        letter.setPosition(cc.p(self.square[self.index].x,self.square[self.index].y));
                        letter.setAnchorPoint(0.5,0.5);
                        letter.setColor(cc.color(0,0,0));
                        self.index++;
                        self.word.push(letter);
                        cc.log("hello"); 
                       }
                        if(target.id == "Ball2"){ 
                         var letter = cc.LabelTTF.create(group[1], "res/fonts/Marker Felt.ttf", 130);
                        self.addChild(letter,2);
                        letter.setPosition(cc.p(self.square[self.index].x,self.square[self.index].y));
                        letter.setAnchorPoint(0.5,0.5);
                        letter.setColor(cc.color(0,0,0));
                        self.index++;
                        self.word.push(letter);
                          
                       }
                        if(target.id == "Ball3"){ 
                         var letter = cc.LabelTTF.create(group[2], "res/fonts/Marker Felt.ttf", 130);
                        self.addChild(letter,2);
                        letter.setPosition(cc.p(self.square[self.index].x,self.square[self.index].y));
                        letter.setAnchorPoint(0.5,0.5);
                        letter.setColor(cc.color(0,0,0));
                        self.index++;
                        self.word.push(letter);
                          
                       }
                        if(target.id == "Ball4"){ 
                         var letter = cc.LabelTTF.create(group[3], "res/fonts/Marker Felt.ttf", 130);
                        self.addChild(letter,2);
                        letter.setPosition(cc.p(self.square[self.index].x,self.square[self.index].y));
                        letter.setAnchorPoint(0.5,0.5);
                        letter.setColor(cc.color(0,0,0));
                        self.index++;
                        self.word.push(letter);
                          
                       }
                        if(target.id == "Ball5"){ 
                         var letter = cc.LabelTTF.create(group[4], "res/fonts/Marker Felt.ttf", 130);
                        self.addChild(letter,2);
                        letter.setPosition(cc.p(self.square[self.index].x,self.square[self.index].y));
                        letter.setAnchorPoint(0.5,0.5);
                        letter.setColor(cc.color(0,0,0));
                        self.index++;
                        self.word.push(letter);
                          
                       }
                        if(target.id == "Ball6"){ 
                        var letter = cc.LabelTTF.create(group[5], "res/fonts/Marker Felt.ttf", 130);
                        self.addChild(letter,2);
                        letter.setPosition(cc.p(self.square[self.index].x,self.square[self.index].y));
                        letter.setAnchorPoint(0.5,0.5);
                        letter.setColor(cc.color(0,0,0));
                        self.index++;
                        self.word.push(letter);
                          
                       }
                        if(target.id == "Wrong"){ 
                            cc.log("wrong");
                       
                        self.removeChild(self.word[(self.index) - 1]);
                        self.index--;  
                        if(self.word.length == 0){
                            self.index = 0;   
                           cc.eventManager.removeListener(target);
                          }
                       }
                   }


    }              
});

xc.playLayer.res = {

     jump_main: "res/jump_on_words/jump_on_words_main_menu.json",
    jump_level: "res/jump_on_words/jump_on_words_level_menu.json",
    jump_game: "res/jump_on_words/jump_on_words_game_menu.json",
    jump_plist: xc.path +"jump_on_words/jump_on_words.plist",
    jump_png: xc.path +"jump_on_words/jump_on_words.png"
}
