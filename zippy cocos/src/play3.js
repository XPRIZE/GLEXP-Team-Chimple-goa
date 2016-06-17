
var Play3Layer = cc.Layer.extend({
    sprite:null,
    zippyLayer: null,
    fieldSize : 5,
    tileTypes : [],
     tileSize : 100,
     tileArray : [],
     startColor : null,
     visitedTiles : [],
     tolerance : 400,
     score : 0,
     scoreLabel : null,
     flag : false,
     
    current_x : 0, current_y : 0,
    final_x : null,final_y: null,
    tileWidth : 170, 
    tileHeight : 130,
    tileGrid : [],
    self : null,
    
    
    ctor:function () {
        this._super();
        
        cc.spriteFrameCache.addSpriteFrames(res.plist1);
        cc.spriteFrameCache.addSpriteFrames(res.plist2);
        cc.spriteFrameCache.addSpriteFrames(res.plist3);
        tileTypes = ["Circus_a.png", "Circus_b.png", "Circus_c.png","Circus_d.png","Circus_e.png","Circus_f.png"];
        var size = cc.winSize;
        tileGrid = [];
        var level2BG = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Circus_Level.png"));
        level2BG.setAnchorPoint(0,0);   
        level2BG.id = "Level2BG";
        this.addChild(level2BG,0);
        
       
        
        var back = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Reload.png"));
        back.x = 150;
        back.y = 1720;
        back.scaleX = 0.5;
        back.scaleY = 0.5;
        back.id = "Back";
        this.addChild(back,0);
         cc.eventManager.addListener(cc.EventListener.create(  
        {event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , back);
        
        var refresh = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Reload1.png"));
        refresh.x = 350;
        refresh.y = 1720;
        refresh.scaleX = 0.5;
        refresh.scaleY = 0.5;
        refresh.id = "Refresh";
        this.addChild(refresh,0); 
        cc.eventManager.addListener(cc.EventListener.create(  
        {event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , refresh); 
        
        scoreLabel = new cc.LabelTTF('SCORE \n     '+this.score,'Arial', 50 );
        scoreLabel.x =250;
        scoreLabel.y =1200;
        scoreLabel.setColor(cc.color(255,255,255)); 
        this.addChild(scoreLabel,0); 
        
        this.createLevel();
        
        
       
           
       this.schedule(this.fallTile,0.5);
       this.schedule(function(){
           for(var j=0; j < 5; j++){
               if (tileGrid[4][j] == null){
                   this.addTile(4,j);
               }
           }
       },2);
       
       this.schedule(this.checkMatch,3);
       this.scheduleUpdate();
       flag = false;
       self = this;
       display = null;
       return true;
    },
     
    onTouchBegan: function(touch, event){
         var target = event.getCurrentTarget();
         var location = target.convertToNodeSpace(touch.getLocation());
         var targetSize = target.getContentSize();
         var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);
         if (cc.rectContainsPoint(targetRectangle, location))
                   {
                       if(target.id == "Back"){
                       
                       cc.director.runScene(new BootScene());      
                       }
                       if(target.id == "Refresh"){
                          
                            for(var i = 0; i < 5; i ++){
                                for(var j = 0;j < 5; j ++){
                                    
                             self.removeChild(tileGrid[i][j]);
                              }
                            }
                           self.createLevel();
                       }
               return false;        
    }
    
 },
    update: function (dt){
    // this.checkMatch();  
    
       if( this.score == 25)
    {
        var levelComplete = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Level_complete.png"));
        levelComplete.setAnchorPoint(0,0);
        levelComplete.x = 500;
        levelComplete.y = 700; 
        this.addChild(levelComplete, 1);
      
        this.scheduleOnce(function(){cc.director.runScene(new BootScene())},5);
       
       
       
    }
    },
    
   createLevel: function(){
        for(var i = 0; i < this.fieldSize; i ++){
             tileGrid[i] = [];
                for(var j = 0;j < this.fieldSize; j ++){
                    var tile = this.addTile(i, j);
                }
            }
    //   this.checkMatch();
    },   
    
    addTile:function(row,col){
       // cc.log(this.tileTypes)
        var randomTile = Math.floor(Math.random()*(tileTypes.length));
        var pathname =(tileTypes[randomTile]); //this.tileTypes[randomTile];
     //   cc.log(pathname)
        var sprite = new Movetile1(pathname, tileGrid);
        sprite.val = randomTile;
        sprite.Id = pathname;
       
        this.addChild(sprite,0);
       
        sprite.setPosition (((col*this.tileWidth+400)/1280)*cc.winSize.width , ((row*this.tileHeight+75)/800)*cc.winSize.height);
        tileGrid[row][col] = sprite;
//tileGrid[row][col] = sprite;
   var checknew = ((((col*this.tileWidth+400)/1280)*cc.winSize.width)* 1280)/cc.winSize.width - 400;
   cc.log("col = "+ col);
   cc.log(checknew);
   cc.log(checknew/170);
       
        return sprite;
   },




checkMatch: function(){
 
    var me = this;
 
    //Call the getMatches function to check for spots where there is
    //a run of three or more tiles in a row
    var matches = me.getMatches(tileGrid);
 
   var imagePath;
      if (matches.length >0){
        // this.removeChild(display); 
         if(flag == true){
            
              this.removeChild(display);
              flag = false;
         }
        this.incrementScore();
          var x;
          for(var i = 0; i< matches.length; i++){
                x = matches[i];
               for (var j = 0; j< x.length; j++){
                   var xx = Math.round((x[j].x* 1280)/cc.winSize.width - 400);
                   var yy = Math.round((x[j].y* 800)/cc.winSize.height  - 75);
                  // cc.log( tileGrid);
                   tileGrid[yy/130][xx/170] = null;
                   
                   imagePath = x[j].Id;
                   cc.log(imagePath);
                 //  console.log(x[j].Id );
                if(x[j].Id == "Circus_a.png" )
                {
                   cc.audioEngine.playEffect(res.A_mp3); 
                }
                else if (x[j].Id == "Circus_b.png")
                {
                   cc.audioEngine.playEffect(res.B_mp3); 
                }
                else if (x[j].Id == "Circus_c.png")
                {
                   cc.audioEngine.playEffect(res.C_mp3); 
                }
                else if (x[j].Id == "Circus_d.png")
                {
                   cc.audioEngine.playEffect(res.D_mp3); 
                }
                 else if (x[j].Id == "Circus_e.png")
                {
                   cc.audioEngine.playEffect(res.E_mp3);  
                }
                  else if (x[j].Id == "Circus_f.png")
                {
                   cc.audioEngine.playEffect(res.F_mp3,false);   
                }
                  flag = true;
                //    this.addChild(display,0);

                   this.removeChild(x[j]);
                   
                   
               } 
          }
            //   this.fallTile();  
             display = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(imagePath));
             display.x = 250;
             display.y = 1000;
             this.addChild(display,0);
      } 
},
fallTile: function(){
  
  for(var i = 0; i < tileGrid.length -1 ;i++ ){
       for(var j = 0; j < tileGrid.length; j++){
           if (tileGrid [i][j] == null){
               if(tileGrid[i+1][j] != null){
                  // cc.log(tileGrid[i+1][j]);
                  // cc.log("i = "+ (i+ 1) +" j= "+ j);
                   var xx = ((j * this.tileWidth+400)/1280)*cc.winSize.width;
                   var yy = ((i * this.tileHeight + 75)/800)*cc.winSize.height;
                   
                  var moveTile= cc.MoveTo.create(0.01 ,cc.p(xx,yy));
                   tileGrid[i+1][j].runAction(moveTile);
                   tileGrid[i][j] = tileGrid[i+1][j];
                   tileGrid[i+1][j] = null;     
                }
              }
            }
          }
       },  
  
  
  getMatches: function(tileGrid){
 
    var matches = [];
    var groups = [];
 
    //Check for horizontal matches
    for (var i = 0; i < tileGrid.length; i++)
    {
        var tempArr = tileGrid[i];
        groups = [];
        for (var j = 0; j < tempArr.length; j++)
        {
            if(j < tempArr.length - 2)
                if (tileGrid[i][j] && tileGrid[i][j + 1] && tileGrid[i][j + 2])
                {
                    if (tileGrid[i][j].Id == tileGrid[i][j+1].Id && tileGrid[i][j+1].Id == tileGrid[i][j+2].Id)
                    {
                        if (groups.length > 0)
                        {
                            if (groups.indexOf(tileGrid[i][j]) == -1)
                            {
                                matches.push(groups);
                               // cc.log("fdfdfd"+matches);
                                groups = [];
                            }
                        }
 
                        if (groups.indexOf(tileGrid[i][j]) == -1)
                        {
                            groups.push(tileGrid[i][j]);
                        }
                        if (groups.indexOf(tileGrid[i][j+1]) == -1)
                        {
                            groups.push(tileGrid[i][j+1]);
                        }
                        if (groups.indexOf(tileGrid[i][j+2]) == -1)
                        {
                            groups.push(tileGrid[i][j+2]);
                        }
                    }
                }
        }
        if(groups.length > 0) {
            matches.push(groups);
         //   cc.log("matches")
        }
    }
 
    //Check for vertical matches
    for (j = 0; j < tileGrid.length; j++)
    {
        var tempArr = tileGrid[j];
        groups = []; 
        for (i = 0; i < tempArr.length; i++)
        {
            if(i < tempArr.length - 2)
                if (tileGrid[i][j] && tileGrid[i+1][j] && tileGrid[i+2][j])
                {
                    if (tileGrid[i][j].Id == tileGrid[i+1][j].Id && tileGrid[i+1][j].Id == tileGrid[i+2][j].Id)
                    {
                        if (groups.length > 0)
                        {
                            if (groups.indexOf(tileGrid[i][j]) == -1)
                            {
                                matches.push(groups);
                               //  cc.log("fdfdfd"+matches);
                                groups = [];
                            }
                        }
 
                        if (groups.indexOf(tileGrid[i][j]) == -1)
                        {
                            groups.push(tileGrid[i][j]);
                        }
                        if (groups.indexOf(tileGrid[i+1][j]) == -1)
                        {
                            groups.push(tileGrid[i+1][j]);
                        }
                        if (groups.indexOf(tileGrid[i+2][j]) == -1)
                        {
                            groups.push(tileGrid[i+2][j]);
                        }
                    }
                }
        }
        if(groups.length > 0) {
            matches.push(groups);
           // cc.log("matches")
        }
    }
//alert(matches);
	//	console.log(matches);
    return matches;
   
},

 incrementScore : function()
{
    this.score += 1;
    scoreLabel.setString("SCORE\n    "+ this.score);
  
}

});
   
   
 
var Play3Scene = cc.Scene.extend({
    ctor:function () {
        this._super();
        var layer = new Play3Layer();
        this.addChild(layer);
    }
});

