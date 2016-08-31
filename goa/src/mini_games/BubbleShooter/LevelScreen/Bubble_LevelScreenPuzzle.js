
var PuzzleMenu = cc.Layer.extend({
    
    ctor:function () {
        this._super();
      
        this.Mainmenu = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Level_Menu_Background.png"));
        this.Mainmenu.setPosition(cc.director.getWinSize().width/2,cc.director.getWinSize().height/2);
        this.addChild(this.Mainmenu);

        // this.LevelBox1button = new cc.Sprite("Orange_LevelBall.png");
        this.LevelBox1button = new ClickedButtonToRedirect("Orange_LevelBall.png","Puzzles",1);
        this.Level1button = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("lvl1.png"));
        this.LevelBox1button.setPosition(cc.director.getWinSize().width * 0.1125 , cc.director.getWinSize().height * 0.8046875);
        this.Level1button.setPosition(cc.director.getWinSize().width * 0.1125 ,cc.director.getWinSize().height * 0.8046875);
        this.LevelBox1button.id = "AlphabetsLevelBox1button";
        this.Level1button.id ="Alphabetslvl1";
        // cc.eventManager.addListener(allButtonClickedlistener.clone(), this.LevelBox1button);
        this.addChild(this.LevelBox1button);
        this.addChild(this.Level1button);


        // this.LevelBox3button = new cc.Sprite("Orange_LevelBall.png");
        this.LevelBox3button = new ClickedButtonToRedirect("Orange_LevelBall.png","Puzzles",3);
        this.Level3button = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("lvl3.png"));
        this.LevelBox3button.setPosition(cc.director.getWinSize().width * 0.1125 ,cc.director.getWinSize().height * 0.6640625);
        this.Level3button.setPosition(cc.director.getWinSize().width * 0.1125 ,cc.director.getWinSize().height * 0.6640625);
        this.LevelBox3button.id = "AlphabetsLevelBox3button";
        this.Level3button.id ="Alphabetslvl3";
        // cc.eventManager.addListener(allButtonClickedlistener.clone(), this.LevelBox3button);
        this.addChild(this.LevelBox3button);
        this.addChild(this.Level3button);
        
        // this.LevelBox5button = new cc.Sprite("Orange_LevelBall.png");
        this.LevelBox5button = new ClickedButtonToRedirect("Orange_LevelBall.png","Puzzles",5);
        this.Level5button = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("lvl5.png"));
        this.LevelBox5button.setPosition(cc.director.getWinSize().width * 0.1125 ,cc.director.getWinSize().height * 0.5234375);
        this.Level5button.setPosition(cc.director.getWinSize().width * 0.1125 ,cc.director.getWinSize().height * 0.5234375);
        this.LevelBox5button.id = "AlphabetsLevelBox5button";
        this.Level5button.id ="Alphabetslvl5";
        // cc.eventManager.addListener(allButtonClickedlistener.clone(), this.LevelBox5button);
        this.addChild(this.LevelBox5button);
        this.addChild(this.Level5button);

        // this.LevelBox7button = new cc.Sprite("Orange_LevelBall.png");
        this.LevelBox7button = new ClickedButtonToRedirect("Orange_LevelBall.png","Puzzles",7);
        this.Level7button = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("lvl7.png"));
        this.LevelBox7button.setPosition(cc.director.getWinSize().width * 0.1125 ,cc.director.getWinSize().height * 0.3828125);
        this.Level7button.setPosition(cc.director.getWinSize().width * 0.1125 ,cc.director.getWinSize().height * 0.3828125);
        this.LevelBox7button.id = "AlphabetsLevelBox7button";
        this.Level7button.id ="Alphabetslvl7";
        // cc.eventManager.addListener(allButtonClickedlistener.clone(), this.LevelBox7button);
        this.addChild(this.LevelBox7button);
        this.addChild(this.Level7button);

        // this.LevelBox9button = new cc.Sprite("Orange_LevelBall.png");
        this.LevelBox9button = new ClickedButtonToRedirect("Orange_LevelBall.png","Puzzles",9);
        this.Level9button = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("lvl9.png"));
        this.LevelBox9button.setPosition(cc.director.getWinSize().width * 0.1125 ,cc.director.getWinSize().height * 0.2421875);
        this.Level9button.setPosition(cc.director.getWinSize().width * 0.1125 ,cc.director.getWinSize().height * 0.2421875);
        this.LevelBox9button.id = "AlphabetsLevelBox9button";
        this.Level9button.id ="Alphabetslvl9";
        // cc.eventManager.addListener(allButtonClickedlistener.clone(), this.LevelBox9button);
        this.addChild(this.LevelBox9button);
        this.addChild(this.Level9button);
        
         //Stars for Odd number Button
         
        this.Level1Star = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Star1.png"));
        this.Level1Star.setPosition(cc.director.getWinSize().width * 0.3475 ,cc.director.getWinSize().height * 0.8046875);
        this.Level1Star.id = "Level1Star";
        this.addChild(this.Level1Star);
        
        this.Level3Star = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Star1.png"));
        this.Level3Star.setPosition(cc.director.getWinSize().width * 0.3475 ,cc.director.getWinSize().height * 0.6640625);
        this.Level3Star.id = "Level3Star";
        this.addChild(this.Level3Star);
        
        this.Level5Star = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Star1.png"));
        this.Level5Star.setPosition(cc.director.getWinSize().width * 0.3475 ,cc.director.getWinSize().height * 0.5234375);
        this.Level5Star.id = "Level5Star";
        this.addChild(this.Level5Star);
        
        this.Level7Star = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Star1.png"));
        this.Level7Star.setPosition(cc.director.getWinSize().width * 0.3475 ,cc.director.getWinSize().height * 0.3828125);
        this.Level7Star.id = "Level7Star";
        this.addChild(this.Level7Star);
        
        this.Level9Star = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Star1.png"));
        this.Level9Star.setPosition(cc.director.getWinSize().width * 0.3475 ,cc.director.getWinSize().height * 0.2421875);
        this.Level9Star.id = "Level9Star";
        this.addChild(this.Level9Star);
        
       // NumberButton for Even Button
       
       
        // this.LevelBox2button = new cc.Sprite("Orange_LevelBall.png");
        this.LevelBox2button = new ClickedButtonToRedirect("Orange_LevelBall.png","Puzzles",2);
        this.Level2button = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("lvl2.png"));
        this.LevelBox2button.setPosition(cc.director.getWinSize().width * 0.6 ,cc.director.getWinSize().height * 0.8046875);
        this.Level2button.setPosition(cc.director.getWinSize().width * 0.6 ,cc.director.getWinSize().height * 0.8046875);
        this.LevelBox2button.id = "AlphabetsLevelBox2button";
        this.Level2button.id ="Alphabetslvl2";
        // cc.eventManager.addListener(allButtonClickedlistener.clone(), this.LevelBox2button);
        this.addChild(this.LevelBox2button);
        this.addChild(this.Level2button);

        // this.LevelBox4button = new cc.Sprite("Orange_LevelBall.png");
        this.LevelBox4button = new ClickedButtonToRedirect("Orange_LevelBall.png","Puzzles",4);
        this.Level4button = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("lvl4.png"));
        this.LevelBox4button.setPosition(cc.director.getWinSize().width * 0.6 ,cc.director.getWinSize().height * 0.6640625);
        this.Level4button.setPosition(cc.director.getWinSize().width * 0.6 ,cc.director.getWinSize().height * 0.6640625);
        this.LevelBox4button.id = "AlphabetsLevelBox4button";
        this.Level4button.id ="Alphabetslvl4";
        // cc.eventManager.addListener(allButtonClickedlistener.clone(), this.LevelBox4button);
        this.addChild(this.LevelBox4button);
        this.addChild(this.Level4button);
        
        // this.LevelBox6button = new cc.Sprite("Orange_LevelBall.png");
        this.LevelBox6button = new ClickedButtonToRedirect("Orange_LevelBall.png","Puzzles",6);
        this.Level6button = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("lvl6.png"));
        this.LevelBox6button.setPosition(cc.director.getWinSize().width * 0.6 ,cc.director.getWinSize().height * 0.5234375);
        this.Level6button.setPosition(cc.director.getWinSize().width * 0.6 ,cc.director.getWinSize().height * 0.5234375);
        this.LevelBox6button.id = "AlphabetsLevelBox6button";
        this.Level6button.id ="Alphabetslvl6";
        // cc.eventManager.addListener(allButtonClickedlistener.clone(), this.LevelBox6button);
        this.addChild(this.LevelBox6button);
        this.addChild(this.Level6button);

        // this.LevelBox8button = new cc.Sprite("Orange_LevelBall.png");
        this.LevelBox8button = new ClickedButtonToRedirect("Orange_LevelBall.png","Puzzles",8);
        this.Level8button = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("lvl8.png"));
        this.LevelBox8button.setPosition(cc.director.getWinSize().width * 0.6 ,cc.director.getWinSize().height * 0.3828125);
        this.Level8button.setPosition(cc.director.getWinSize().width * 0.6 ,cc.director.getWinSize().height * 0.3828125);
        this.LevelBox8button.id = "AlphabetsLevelBox8button";
        this.Level8button.id ="Alphabetslvl8";
        // cc.eventManager.addListener(allButtonClickedlistener.clone(), this.LevelBox8button);
        this.addChild(this.LevelBox8button);
        this.addChild(this.Level8button);

        // this.LevelBox10button = new cc.Sprite("Orange_LevelBall.png");
        this.LevelBox10button = new ClickedButtonToRedirect("Orange_LevelBall.png","Puzzles",10);
        this.Level10button = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("lvl10.png"));
        this.LevelBox10button.setPosition(cc.director.getWinSize().width * 0.6 ,cc.director.getWinSize().height * 0.2421875);
        this.Level10button.setPosition(cc.director.getWinSize().width * 0.6 ,cc.director.getWinSize().height * 0.2421875);
        this.LevelBox10button.id = "AlphabetsLevelBox10button";
        this.Level10button.id ="Alphabetslvl10";
        // cc.eventManager.addListener(allButtonClickedlistener.clone(), this.LevelBox10button);
        this.addChild(this.LevelBox10button);
        this.addChild(this.Level10button); 
        
        // Stars for Even number Level
        
        this.Level2Star = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Star1.png"));
        this.Level2Star.setPosition(cc.director.getWinSize().width * 0.845 ,cc.director.getWinSize().height * 0.8046875);
        this.Level2Star.id = "Level2Star";
        this.addChild(this.Level2Star);
        
        this.Level4Star = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Star1.png"));
        this.Level4Star.setPosition(cc.director.getWinSize().width * 0.845 ,cc.director.getWinSize().height * 0.6640625);
        this.Level4Star.id = "Level4Star";
        this.addChild(this.Level4Star);
        
        this.Level6Star = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Star1.png"));
        this.Level6Star.setPosition(cc.director.getWinSize().width * 0.845 ,cc.director.getWinSize().height * 0.5234375);
        this.Level6Star.id = "Level6Star";
        this.addChild(this.Level6Star);
        
        this.Level8Star = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Star1.png"));
        this.Level8Star.setPosition(cc.director.getWinSize().width * 0.845 ,cc.director.getWinSize().height * 0.3828125);
        this.Level8Star.id = "Level8Star";
        this.addChild(this.Level8Star);
        
        this.Level10Star = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Star1.png"));
        this.Level10Star.setPosition(cc.director.getWinSize().width * 0.845 ,cc.director.getWinSize().height * 0.2421875);
        this.Level10Star.id = "Level10Star";
        this.addChild(this.Level10Star);
        
        return true;
    }
});


var PuzzleMenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        
        var puzzleScreenMenu = new PuzzleMenu();
        this.addChild(puzzleScreenMenu);
    }
});