/// <reference path="../../cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />
var xc = xc || {};
 xc.menuLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
      
        this._super();
       cc.spriteFrameCache.addSpriteFrames(xc.menuLayer.res.jump_plist);

       this.menu = ccs.load(xc.menuLayer.res.jump_main, xc.path);
       this.addChild(this.menu.node);

        // var child = this.menu.node.getChildren(); 
        //   for(var i=0; i < child.length ;i++)
        //   {
        //      var name = child[i].getName();
        //      cc.log("%s", name);
        //   } 

       var play = this.menu.node.getChildByName("play_button_36"); 
       play.id = "Play";
        cc.eventManager.addListener(cc.EventListener.create(  
      {event: cc.EventListener.TOUCH_ONE_BY_ONE,
      swallowTouches:true,  
      onTouchBegan: this.onTouchBegan,}) , play); 


       var square1 = this.menu.node.getChildByName("box_1");  
       namej = new cc.LabelTTF('J','Arial', 140 );
       namej.x =square1.x ;
       namej.y =square1.y + 25 ;
       namej.setColor(cc.color(0,0,0)); 
       namej.setAnchorPoint(1,1);
       this.addChild(namej,1);

       var square2 = this.menu.node.getChildByName("box_39");  
       nameu = new cc.LabelTTF('U','Arial', 140 );
       nameu.x =square2.x ;
       nameu.y =square2.y + 25  ;
       nameu.setColor(cc.color(0,0,0)); 
       nameu.setAnchorPoint(1,1);
       this.addChild(nameu,1);

       var square3 = this.menu.node.getChildByName("box_40");  
       namem = new cc.LabelTTF('M','Arial', 140 );
       namem.x =square3.x ;
       namem.y =square3.y + 25;
       namem.setColor(cc.color(0,0,0)); 
       namem.setAnchorPoint(1,1);
       this.addChild(namem,1);

       var square4 = this.menu.node.getChildByName("box_41");  
       namep = new cc.LabelTTF('P','Arial', 140 );
       namep.x =square4.x ;
       namep.y =square4.y+ 25 ;
       namep.setColor(cc.color(0,0,0)); 
       namep.setAnchorPoint(1,1);
       this.addChild(namep,1);

       var square5 = this.menu.node.getChildByName("box_43");  
       nameo = new cc.LabelTTF('O','Arial', 140 );
       nameo.x =square5.x ;
       nameo.y =square5.y + 25;
       nameo.setColor(cc.color(0,0,0)); 
       nameo.setAnchorPoint(1,1);
       this.addChild(nameo,1);

       var square6 = this.menu.node.getChildByName("box_47");  
       namen = new cc.LabelTTF('N','Arial', 140 );
       namen.x =square6.x ;
       namen.y =square6.y + 25;
       namen.setColor(cc.color(0,0,0)); 
       namen.setAnchorPoint(1,1);
       this.addChild(namen,1);

       var ball1 = this.menu.node.getChildByName("ball_2");  
       namew = new cc.LabelTTF('W','Arial', 140 );
       namew.x =ball1.x + 15;
       namew.y =ball1.y + 30;
       namew.setColor(cc.color(0,0,0)); 
       namew.setAnchorPoint(1,1);
       this.addChild(namew,1);

       var ball2 = this.menu.node.getChildByName("ball_44");  
       nameo1 = new cc.LabelTTF('O','Arial', 140 );
       nameo1.x =ball2.x  + 15;
       nameo1.y =ball2.y + 40 ;
       nameo1.setColor(cc.color(0,0,0)); 
       nameo1.setAnchorPoint(1,1);
       this.addChild(nameo1,1);

       var ball3 = this.menu.node.getChildByName("ball_45");  
       namer = new cc.LabelTTF('R','Arial', 140 );
       namer.x =ball3.x +15;
       namer.y =ball3.y + 40;
       namer.setColor(cc.color(0,0,0)); 
       namer.setAnchorPoint(1,1);
       this.addChild(namer,1);

       var ball4 = this.menu.node.getChildByName("ball_46");  
       named = new cc.LabelTTF('D','Arial', 140 );
       named.x =ball4.x +15 ;
       named.y =ball4.y + 40;
       named.setColor(cc.color(0,0,0)); 
       named.setAnchorPoint(1,1);
       this.addChild(named,1);

       var ball5 = this.menu.node.getChildByName("ball_48");  
       names = new cc.LabelTTF('S','Arial', 140 );
       names.x =ball5.x +15 ;
       names.y =ball5.y + 40;
       names.setColor(cc.color(0,0,0)); 
       names.setAnchorPoint(1,1);
       this.addChild(names,1);



        return true;
    },
    onTouchBegan: function(touch, event){
         var target = event.getCurrentTarget();
         var location = target.convertToNodeSpace(touch.getLocation());
         var targetSize = target.getContentSize();
         var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);
         if (cc.rectContainsPoint(targetRectangle, location))
                   {
                     
                       if(target.id == "Play"){
                            xc.GameScene.load(xc.playLayer);
                       
                       }
                   }
                   return false;
    }           
});

xc.menuLayer.res = {

    jump_main: xc.path +"jump_on_words/jump_on_words_main_menu.json",
    jump_plist: xc.path +"jump_on_words/jump_on_words.plist"
    
}

