
var playLayer = cc.Layer.extend( {
   group : [], 

    ctor:function () {
        this._super();

        var size = cc.winSize;

        bg = ccs.load(jump_res.jump_game,"res/SD/");
        this.addChild(bg.node);
      
        var ball1 = bg.node.getChildByName("ball_34");
        ball1.id = "Ball1";
        cc.eventManager.addListener(cc.EventListener.create(  
        {event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , ball1); 

        var ball2 = bg.node.getChildByName("ball_35");
        ball2.id = "Ball2";
        cc.eventManager.addListener(cc.EventListener.create(  
        {event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , ball2); 

        var ball3 = bg.node.getChildByName("ball_36");
        ball3.id = "Ball3";
        cc.eventManager.addListener(cc.EventListener.create(  
        {event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , ball3); 

        var ball4 = bg.node.getChildByName("ball_37");
        ball4.id = "Ball4";
        cc.eventManager.addListener(cc.EventListener.create(  
        {event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , ball4); 

        var ball5 = bg.node.getChildByName("ball_38");
        ball5.id = "Ball5";
        cc.eventManager.addListener(cc.EventListener.create(  
        {event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , ball5); 

        var ball6 = bg.node.getChildByName("ball_44");
        ball6.id = "Ball6";
        cc.eventManager.addListener(cc.EventListener.create(  
        {event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , ball6); 


          
        this.consonants = ['B','C','D','F','G','H','J','K','L','M','N','P','Q','R','S','T','V','W','X','Y','Z'];
        this.vowels = ['A','E','I','O','U'];

        this.createLevel();
    },
     createLevel : function(){

      group =  this.generateRandomLetters(6,this.array);
      var alpha = cc.LabelTTF.create(group[0], "fonts/American Typewriter.ttf", 60);
      for( var i=0; i<6 ;i++){

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

                         cc.log("hello"); 
                       }
                        if(target.id == "Ball2"){ 

                          
                       }
                        if(target.id == "Ball3"){ 

                          
                       }
                        if(target.id == "Ball4"){ 

                          
                       }
                        if(target.id == "Ball5"){ 

                          
                       }
                        if(target.id == "Ball6"){ 

                          
                       }
                   }


    }              
});

var playScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new playLayer();
        this.addChild(layer);
    }
});

