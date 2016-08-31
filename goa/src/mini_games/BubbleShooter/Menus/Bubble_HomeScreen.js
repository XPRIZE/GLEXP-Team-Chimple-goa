
var currentPointerOnBg = {x:0,y:0};
var levelValues =1;

var BubbleGame_HomeScreenMenu = cc.Layer.extend({

    ctor:function () {
       
        this._super();
        
        var gameMenu = ccs.load(bubbleShooter.bubbleShooter_mainMenu_json);
        this.addChild(gameMenu.node);
        
        var titleMainGame = new cc.LabelTTF("Bubble Shooter Game","res/fonts/Marker Felt.ttf",275);
         titleMainGame.setPosition(cc.director.getWinSize().width*0.5,cc.director.getWinSize().height*0.8);                      
        this.addChild(titleMainGame);

        var Alphabet_Button = gameMenu.node.getChildByName("Panel_1").getChildByName("Button_10");
        Alphabet_Button.addTouchEventListener(this.touchEvent ,this); 
        
        titleAlphabet = new cc.LabelTTF("Alphabets","res/fonts/Marker Felt.ttf",100);
        titleAlphabet.setPosition(Alphabet_Button.getPosition().x,Alphabet_Button.getPosition().y);
        this.addChild(titleAlphabet);

        
        var Number_Button = gameMenu.node.getChildByName("Panel_1").getChildByName("Button_9");
        Number_Button.addTouchEventListener(this.touchEvent ,this); 
        
        var Puzzle_Button = gameMenu.node.getChildByName("Panel_1").getChildByName("Button_11");
        Puzzle_Button.addTouchEventListener(this.touchEvent ,this); 
        
/*     
        // cc.spriteFrameCache.addSpriteFrames(res.Background1_plist);
       
        var Mainmenu = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("Main_Menus.png"),this);
        //Mainmenu.setPosition( cc.view.getFrameSize().width/2, cc.view.getFrameSize().height/2);
        Mainmenu.setPosition(cc.director.getWinSize().width/2, cc.director.getWinSize().height/2);

        console.log(" frame size : "+ cc.director.getWinSize().width + "  " + cc.director.getWinSize().height);
        
        // this.buttonAlphabets = cc.Sprite(res.AlphabetButton_png);
        this.buttonAlphabets = new ClickedButtonToRedirect("Alphabet_Button.png","alphabets");
        this.buttonAlphabets.setPosition(cc.director.getWinSize().width/2,cc.director.getWinSize().height * 0.4921875);
        this.buttonAlphabets.id = "buttonAlphabets";
        // cc.eventManager.addListener(allButtonClickedlistener.clone(), this.buttonAlphabets);

        // this.buttonNumbers = cc.Sprite(res.NumberButton_png);
        this.buttonNumbers = new ClickedButtonToRedirect("Number_Button.png","numbersMenu");
        this.buttonNumbers.setPosition(cc.director.getWinSize().width/2,cc.director.getWinSize().height * 0.359375);
        this.buttonNumbers.id = "buttonNumbers";
        // cc.eventManager.addListener(allButtonClickedlistener.clone(), this.buttonNumbers);
        
        // this.buttonCategories = cc.Sprite(res.CategoryButton_png);
        this.buttonCategories = new ClickedButtonToRedirect("Category_Button.png","categoryMenu");
        this.buttonCategories.setPosition(cc.director.getWinSize().width/2,cc.director.getWinSize().height * 0.2265625);
        this.buttonCategories.id = "buttonCategories";
        // cc.eventManager.addListener(allButtonClickedlistener.clone(), this.buttonCategories);

        // this.buttonPuzzle = cc.Sprite(res.PuzzleButton_png);
        this.buttonPuzzle = new ClickedButtonToRedirect("Puzzle_Button.png","puzzleMenu");
        this.buttonPuzzle.setPosition(cc.director.getWinSize().width/2,cc.director.getWinSize().height * 0.09375);
        this.buttonPuzzle.id = "buttonPuzzle";
        // cc.eventManager.addListener(allButtonClickedlistener.clone(), this.buttonPuzzle);

        this.addChild(Mainmenu);
        this.addChild(this.buttonAlphabets);
        this.addChild(this.buttonNumbers);
        this.addChild(this.buttonCategories);
        this.addChild(this.buttonPuzzle);
*/        
        return true;
    },
    
    touchEvent:function(sender, type)
   {
     switch(type)
     {
         case ccui.Widget.TOUCH_BEGAN:
         break;
         
         case ccui.Widget.TOUCH_MOVED:
         break;
         
         case ccui.Widget.TOUCH_ENDED:
         if(sender.getName() == "Button_9"){
             console.log("this is 2nd button");
         }
         if(sender.getName() == "Button_10"){
             console.log("this is 1st button");
         }
         if(sender.getName() == "Button_11"){
             console.log("this is 3rd button");
         }
//          cc.director.runScene(new HelloWorldScene());
         break;
         
         case ccui.Widget.TOUCH_CANCELLED:
         break;
     }
   }
});

var BubbleGame_HomeScreenScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        
        var homeScreenMenu = new BubbleGame_HomeScreenMenu();
        this.addChild(homeScreenMenu);
       
    }
});


