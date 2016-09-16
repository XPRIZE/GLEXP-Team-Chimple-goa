var xc = xc || {};
xc.Bubble_NumbersMenu = cc.Layer.extend({
    
    ctor:function () {
        this._super();
        
        var levelMenu = ccs.load(xc.BubbleGame_HomeScreenMenu.res.bubbleShooter_levelMenu_json,xc.path);
        this.addChild(levelMenu.node);
        
          if (cc.director.getWinSize().width > 2560){
            var xPosi = cc.director.getWinSize().width - 2560;
            levelMenu.node.x = xPosi/2;
        }
        
        for(let i = 1 ; i <= 12 ; i++){
           var levelButton = levelMenu.node.getChildByName("Button_"+i);
           if(i <= 8 ){
                var levelValueButton = new cc.LabelTTF(""+i,"res/fonts/Marker Felt.ttf",275);
                levelButton.addChild(levelValueButton);
                levelButton.setTag(i);
                levelValueButton.setPosition(levelButton.getContentSize().width/2,levelButton.getContentSize().width/2);                      
                levelButton.addTouchEventListener(this.touchEvent ,this); 
            }else{
                levelButton.setEnabled(false);
                levelButton.setVisible(false);
            }    
        }
        
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
            levelValues = sender.getTag();
            console.log("the level value is : "+levelValues);
            xc.GameScene.load(xc.Bubble_Number);
            break;
            
            case ccui.Widget.TOUCH_CANCELLED:
            break;
        }
    }
});

xc.Bubble_NumbersMenu.res = {
    
}
