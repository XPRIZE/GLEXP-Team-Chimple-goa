var xc = xc || {};

xc.ShootingWord = cc.Layer.extend({
gameName: "ShootingWord",
    ctor:function () {
       
    this._super();
    var ScreenMenu = ccs.load(xc.BubbleGame_HomeScreenMenu.res.bubbleShooter_gameMenu_json,xc.path);
    this.addChild(ScreenMenu.node);




    console.log("the height and width : "+cc.director.getWinSize().height+"      "+cc.director.getWinSize().width);
    return true;
},

});

xc.ShootingWord.res = {
    
    bubbleShooter_plist : xc.path +"bubble_shooter/bubble_shooter.plist",
    bubbleShooter_png : xc.path +"bubble_shooter/bubble_shooter.png",
    bubbleShooter_gameMenu_json : xc.path +"bubble_shooter/bubble_shooter_game_menu.json",
    bubbleShooter_levelMenu_json : xc.path +"bubble_shooter/bubble_shooter_level_menu.json",
    bubbleShooter_mainMenu_json : xc.path +"bubble_shooter/bubble_shooter_main_menu.json"      
    
};
