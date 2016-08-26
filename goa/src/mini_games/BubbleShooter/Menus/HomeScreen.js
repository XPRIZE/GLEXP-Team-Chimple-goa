
var currentPointerOnBg = {x:0,y:0};
var levelValues =1;

var HomeScreenMenu = cc.Layer.extend({

    ctor:function () {
       
        this._super();
     
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
        
        return true;
    }
});

var HomeScreenScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        
        var homeScreenMenu = new HomeScreenMenu();
        this.addChild(homeScreenMenu);
       
    }
});


