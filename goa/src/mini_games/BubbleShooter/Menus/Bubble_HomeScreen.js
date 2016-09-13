var xc = xc || {};
var levelValues =1;

xc.BubbleGame_HomeScreenMenu = cc.Layer.extend({

    ctor:function () {
       
        this._super();
        
        var gameMenu = ccs.load(xc.BubbleGame_HomeScreenMenu.res.bubbleShooter_mainMenu_json,xc.path);
        this.addChild(gameMenu.node);
        
        var titleMainGame = new cc.LabelTTF("Bubble Shooter Game","res/fonts/Marker Felt.ttf",275);
        titleMainGame.setPosition(cc.director.getWinSize().width*0.5,cc.director.getWinSize().height*0.8);                      
        this.addChild(titleMainGame);

        var Alphabet_Button = gameMenu.node.getChildByName("Panel_1").getChildByName("Button_10");
        Alphabet_Button.addTouchEventListener(this.touchEvent ,this); 
        
        var titleAlphabet = new cc.LabelTTF("Alphabets","res/fonts/Marker Felt.ttf",100);
        titleAlphabet.setPosition(Alphabet_Button.getContentSize().width/2,Alphabet_Button.getContentSize().height/2);
        Alphabet_Button.addChild(titleAlphabet);

        var Number_Button = gameMenu.node.getChildByName("Panel_1").getChildByName("Button_9");
        Number_Button.addTouchEventListener(this.touchEvent ,this); 
        
        var titleNumber = new cc.LabelTTF("Number","res/fonts/Marker Felt.ttf",100);
        titleNumber.setPosition(Number_Button.getContentSize().width/2,Number_Button.getContentSize().height/2);
        Number_Button.addChild(titleNumber);
        
        var Puzzle_Button = gameMenu.node.getChildByName("Panel_1").getChildByName("Button_11");
        Puzzle_Button.addTouchEventListener(this.touchEvent ,this); 

        var titlePuzzle = new cc.LabelTTF("Puzzle","res/fonts/Marker Felt.ttf",100);
        titlePuzzle.setPosition(Puzzle_Button.getContentSize().width/2,Puzzle_Button.getContentSize().height/2);
        Puzzle_Button.addChild(titlePuzzle);
        
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
              xc.GameScene.load(xc.Bubble_NumbersMenu);
         }
         else if(sender.getName() == "Button_10"){
             console.log("this is 1st button");
              xc.GameScene.load(xc.Bubble_AlphabetsMenu);
         }
         else if(sender.getName() == "Button_11"){
             console.log("this is 3rd button");
              xc.GameScene.load(xc.Bubble_AlphabetsMenu);
         }

         break;
         
         case ccui.Widget.TOUCH_CANCELLED:
         break;
     }
   }
});


function Tile(x, y, type, shift){
        
        this.x = x;
        this.y = y;
        this.type = type;
        this.removed = false;
        this.shift = shift;
        this.velocity = 0;
        this.alpha = 1;
        this.processed = false;
    
}

xc.BubbleGame_HomeScreenMenu.res = {
    
    bubbleShooter_plist : xc.path +"bubble_shooter/bubble_shooter.plist",
    bubbleShooter_png : xc.path +"bubble_shooter/bubble_shooter.png",
    bubbleShooter_gameMenu_json : xc.path +"bubble_shooter/bubble_shooter_game_menu.json",
    bubbleShooter_levelMenu_json : xc.path +"bubble_shooter/bubble_shooter_level_menu.json",
    bubbleShooter_mainMenu_json : xc.path +"bubble_shooter/bubble_shooter_main_menu.json"      
    
};