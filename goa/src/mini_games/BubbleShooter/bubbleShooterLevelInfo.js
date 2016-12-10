var xc = xc || {};
var bubblelevelValues =1;
xc.bubbleShooterLevelInfo = cc.Layer.extend({
    gameName: "bubble",
    ctor:function () { 
       this._super();
    },
    onEnter: function() {
         this._super();
        var level = this.getParent().menuContext.getCurrentLevel();
        if(level >= 1 && level <= 9) {
            bubblelevelValues = level
            xc.GameScene.load(xc.Bubble_Alphabets);
        }else if(level >= 10 && level <= 14) {
            bubblelevelValues = level - 9;
            xc.GameScene.load(xc.Bubble_Number);
        }else if(level == 15){
            bubblelevelValues = 10;
            xc.GameScene.load(xc.Bubble_Alphabets);
        }else if(level == 16){
            bubblelevelValues = 6;
            xc.GameScene.load(xc.Bubble_Number);            
        }else if(level == 17){
            bubblelevelValues = 11;
            xc.GameScene.load(xc.Bubble_Alphabets);            
        }else if(level == 18){
            bubblelevelValues = 7;
            xc.GameScene.load(xc.Bubble_Number);            
        }else if(level == 19){
            bubblelevelValues = 12;
            xc.GameScene.load(xc.Bubble_Alphabets);            
        }else if(level == 20){
            bubblelevelValues = 8;
            xc.GameScene.load(xc.Bubble_Number);            
        }      
    }
})

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

xc.bubbleShooterLevelInfo.res = {
    bubbleShooter_plist : xc.path +"bubble_shooter/bubble_shooter.plist",
    bubbleShooter_png : xc.path +"bubble_shooter/bubble_shooter.png",
    bubbleShooter_gameMenu_json : xc.path +"bubble_shooter/bubble_shooter_game_menu.json",
    bubbleShooter_levelMenu_json : xc.path +"bubble_shooter/bubble_shooter_level_menu.json",
    bubbleShooter_mainMenu_json : xc.path +"bubble_shooter/bubble_shooter_main_menu.json"      
}
