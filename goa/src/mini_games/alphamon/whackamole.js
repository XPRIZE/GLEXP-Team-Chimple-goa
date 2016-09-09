/// <reference path="../../cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />
var AlphamoneGameLayer = cc.Layer.extend( {
    alphabet_layer: null,
    alphabet:null,
    background_layer:null,
    hole_array:null,
    alphabet_Reff:[],
    scoreLabel:null,
    whack_score:null,
    level_string:null,

    ctor:function (level_str) {
        this._super();
        level_string = level_str;
        alphabet_Reff = [];
        whack_score = 0;
        var size = cc.winSize;
        cc.log("xc.path = %s",xc.path);
        var random_scene =  Math.floor(Math.random()*100 % 5);
        if (random_scene == 2 || random_scene == 0){
            random_scene =1;
        }
        background_layer = ccs.load(xc.path + "alphamole/alphamole"+random_scene+"_background.json", xc.path);
        this.addChild(background_layer.node);
        var alphabet_str = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
        alphabet_layer = cc.Layer.create();
        this.addChild(alphabet_layer);
        var child = background_layer.node.getChildren(); 
        for(var i=0; i < child.length ;i++){
            // child.
            var name = child[i].getName();
            cc.log("%s", name);
        }
        var test = background_layer.node.getComponent("hole1");
        var myLayer = ccs.load(xc.path + "alphamole/alphamole"+random_scene+"_foreground.json", xc.path, xc.path);
        this.addChild(myLayer.node);
       
        var level_alpha = ccs.load(xc.path +"english/"+level_str+".json", xc.path);
        level_alpha.node.x = size.width - 300;
        level_alpha.node.y = size.height - 300;
        level_alpha.node.setScale(0.5,0.5);
        this.addChild(level_alpha.node);

        var level_children = level_alpha.node.getChildren();
        for ( var i = 0; i< level_children.length;i++){
           var str1 = level_children[i].getName();
           if (str1.indexOf("eye") == 0){
               var action = ccs.load( xc.path+ "eye_ani/"+str1+".json", xc.path);
               level_children[i].runAction(action.action);
               action.action.play("blink",true);
           }
       }

        //cc.loader.loadJson(res.Alphamole_json, function (error, data) {});
       this.schedule(this.showAlpha, 2);
    /*

Play1_hole_back_84
Play1_hole_back_84_0
Play1_hole_back_84_1

 Play3_hole_back_39
Play3_hole_back_39_0
Play3_hole_back_39_1

Play4_hole_back_151
Play4_hole_back_151_0
Play4_hole_back_151_1

Play5_hole_back_165
Play5_hole_back_165_0
Play5_hole_back_165_1
    */
      for(var i = 0; i< 3; i++){
         var random_numb =  Math.floor(Math.random()*100 % 25); 
         alphabet_Reff.push(alphabet_str[random_numb]); 
         alphabet_Reff.push(level_str);
      }

   
        hole_array = ["hole1", "hole2", "hole3"];

//var alphhha = new Alphamon_Monster();
//this.addChild(alphhha);



    //  var alpha = ccs.load(alphamole_res.Alphamole_oo, "res/SD/");
    //  alpha.node.x = 900;
    //  alpha.node.y = 900;
    // //alpha.setPosition((100, 200));
    // this.addChild(alpha.node);

     scoreLabel = new cc.LabelTTF("  Score: " + whack_score, "Arial", 90);
     scoreLabel.x = 20;
     scoreLabel.y = size.height - scoreLabel.getContentSize().height/2;
     scoreLabel.anchorX = 0;
     scoreLabel.anchorY = 1;
     scoreLabel.setColor(cc.color(0,0,0));
     this.addChild(scoreLabel);
},

    showAlpha: function () {

        if (whack_score == 5){
            var scene = new xc.GameScene();
            scene.layer = new xc.AlphamoleGameLevelScene();
            scene.addChild(scene.layer);
            cc.director.runScene(scene);
        }
     var randomHole =  Math.floor(Math.random()*100 % 3);
     var childReff = background_layer.node.getChildByName(hole_array[randomHole]);
     var x = childReff.getPositionX();
     var y = childReff.getPositionY();

     var random_alpha =  Math.floor(Math.random()*100 % 5);
     alphabet = ccs.load(xc.path + "english/"+alphabet_Reff[random_alpha]+".json", xc.path);
     alphabet.node.x = x;
     alphabet.node.y = y - 250;
     alphabet.node.setName(alphabet_Reff[random_alpha]);
     alphabet.node.setContentSize(300,400);
     alphabet_layer.addChild(alphabet.node);

    var level_children = alphabet.node.getChildren();

       for ( var i = 0; i< level_children.length;i++){
           var str1 = level_children[i].getName();
           if (str1.indexOf("eye") == 0){
               var action = ccs.load(xc.path+"eye_ani/"+str1+".json",xc.path);
               level_children[i].runAction(action.action);
               action.action.play("blink",true);
           }
       }

     var whack_jump = new cc.JumpBy(1,cc.p(0, 0),600,1);
    // alphabet.node.runAction(whack_jump);
    alphabet.node.runAction(cc.sequence( whack_jump, new cc.CallFunc(function(){ 
        alphabet_layer.removeChild(alphabet.node);  }, this)));
     this.scheduleOnce(function(){
        // alphabet_layer.removeChild(alphabet.node); 
      },1.2);    
     cc.eventManager.addListener(cc.EventListener.create({
         event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) ,alphabet.node); 
    },


    onTouchBegan: function(touch, event){
         var target = event.getCurrentTarget();
         var location = target.convertToNodeSpace(touch.getLocation());
         var targetSize = target.getContentSize();
         var targetRectangle = cc.rect(target.getPositionX()- 150, target.getPositionY(), targetSize.width, targetSize.height);
         if (cc.rectContainsPoint(targetRectangle, touch.getLocation()))
                   {
                       if(target.getName() == level_string){
                            whack_score += 1;
                            scoreLabel.setString("  Score: " + whack_score);
                         }
                        var sound = cc.audioEngine.playEffect(xc.path + "english/sounds/"+target.getName().toLowerCase()+".wav", false);
                      //     sound
                     cc.log("clicked on %s",target.getName());  
                     alphabet_layer.removeChild(target); 
                             }
                             return false;
                   } 
});

