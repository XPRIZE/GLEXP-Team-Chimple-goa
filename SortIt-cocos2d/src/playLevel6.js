
    //We create our only state
    var counterLevel6 = 1;

    var level6SpriteScaleX = 0.9; 
    var level6SpriteScaleY = 0.9;



    //We create our only state
    var counterLevel5 = 1;


    var level5SpriteScaleX = 0.9; 
    var level5SpriteScaleY = 0.9;

   

/// <reference path="../../cocos2d-typescript-definitions/cocos2d/cocos2d-lib.d.ts" />
var level6Layer = cc.Layer.extend({
    
    ctor:function () {
        
        this._super();

        this.audioEngine = cc.audioEngine;
        this.audioEngine.playEffect(res.explosive_mp3);

        
       

var eventListener = cc.eventManager.addListener( 
    {
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    swallowTouches: true,
    onTouchBegan: function(touch, event){


        var target = event.getCurrentTarget();
                 

                 var locationInNode = target.convertToNodeSpace(touch.getLocation());
                 
                 var a = target.a.getContentSize();
                 var rectA = cc.rect(target.a.getPosition().x - a.width/2 ,target.a.getPosition().y - a.height/2, a.width, a.height);
                 if (cc.rectContainsPoint(rectA, locationInNode)) {return true;}
                
                
                 var b = target.b.getContentSize();
                 var rectB = cc.rect(target.b.getPosition().x - b.width/2 ,target.b.getPosition().y - b.height/2, b.width, b.height);
                 if (cc.rectContainsPoint(rectB, locationInNode)) {return true;}
                

                 var c = target.c.getContentSize();
                 var rectC = cc.rect(target.c.getPosition().x - c.width/2 ,target.c.getPosition().y - c.height/2, c.width, c.height);
                 if (cc.rectContainsPoint(rectC, locationInNode)) {return true;}
                

                 var d = target.d.getContentSize();
                 var rectD = cc.rect(target.d.getPosition().x - d.width/2 ,target.d.getPosition().y - d.height/2, d.width, d.height);
                 if (cc.rectContainsPoint(rectD, locationInNode)) {return true;}
                

                 var e = target.e.getContentSize();
                 var rectE = cc.rect(target.e.getPosition().x - e.width/2 ,target.e.getPosition().y - e.height/2, e.width, e.height);
                 if (cc.rectContainsPoint(rectE, locationInNode)) {return true;}
                
                
                 return false;
       
    },

    onTouchMoved: function(touch, event){

    
         var target = event.getCurrentTarget();
         
         var locationInNode = target.convertToNodeSpace(touch.getLocation());
                 
    

        var aRect = target.a.getBoundingBox();
        var atRect = target.at.getBoundingBox();
        if(cc.rectIntersectsRect(aRect, atRect) && counterLevel6 == 1){
            console.log("toy1 collided");
            var x = target.at.getPosition().x;
            var y = target.at.getPosition().y;
            target.a.setPosition(x, y);

            this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.comedyBubble_mp3);



            
            target.removeChild(target.a);

            //cc.eventManager.removeListener(eventListener, target.toy1);
            
         this.a = new cc.Sprite.create(res.a_png);
         this.a.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.a.setPosition(x , y);
         target.addChild(this.a);

            counterLevel6++;
        }



       var bRect = target.b.getBoundingBox();
        var btRect = target.bt.getBoundingBox();
        if(cc.rectIntersectsRect(bRect, btRect) && counterLevel6 == 2){
            console.log("toy1 collided");
            var x = target.bt.getPosition().x;
            var y = target.bt.getPosition().y;
            target.b.setPosition(x, y);

            this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.comedyBubble_mp3);



            
            target.removeChild(target.b);

            //cc.eventManager.removeListener(eventListener, target.toy1);
            
         this.b = new cc.Sprite.create(res.b_png);
         this.b.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.b.setPosition(x , y);
         target.addChild(this.b);

            counterLevel6++;
        }
        

        var cRect = target.c.getBoundingBox();
        var ctRect = target.ct.getBoundingBox();
        if(cc.rectIntersectsRect(cRect, ctRect) && counterLevel6 == 3){
            console.log("toy1 collided");
            var x = target.ct.getPosition().x;
            var y = target.ct.getPosition().y;
            target.c.setPosition(x, y);

            this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.comedyBubble_mp3);



            
            target.removeChild(target.c);

            //cc.eventManager.removeListener(eventListener, target.toy1);
            
         this.c = new cc.Sprite.create(res.c_png);
         this.c.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.c.setPosition(x , y);
         target.addChild(this.c);

            counterLevel6++;
        }

        var dRect = target.d.getBoundingBox();
        var dtRect = target.dt.getBoundingBox();
        if(cc.rectIntersectsRect(dRect, dtRect) && counterLevel6 == 4){
            console.log("toy1 collided");
            var x = target.dt.getPosition().x;
            var y = target.dt.getPosition().y;
            target.d.setPosition(x, y);

            this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.comedyBubble_mp3);



            
            target.removeChild(target.d);

            //cc.eventManager.removeListener(eventListener, target.toy1);
            
         this.d = new cc.Sprite.create(res.d_png);
         this.d.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.d.setPosition(x , y);
         target.addChild(this.d);

            counterLevel6++;
        }

        var eRect = target.e.getBoundingBox();
        var etRect = target.et.getBoundingBox();
        if(cc.rectIntersectsRect(eRect, etRect) && counterLevel6 == 5){
            console.log("toy1 collided");
            var x = target.et.getPosition().x;
            var y = target.et.getPosition().y;
            target.e.setPosition(x, y);

            this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.comedyBubble_mp3);



            
            target.removeChild(target.e);

            //cc.eventManager.removeListener(eventListener, target.toy1);
            
         this.e = new cc.Sprite.create(res.e_png);
         this.e.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.e.setPosition(x , y);
         target.addChild(this.e);

            counterLevel6++;
        } 

                var a = target.a.getContentSize();
                 var rectA = cc.rect(target.a.getPosition().x - a.width/2 ,target.a.getPosition().y - a.height/2, a.width, a.height);
                 if (cc.rectContainsPoint(rectA, locationInNode)) {target.a.setPosition(touch.getLocation());return true;}
                
                
                 var b = target.b.getContentSize();
                 var rectB = cc.rect(target.b.getPosition().x - b.width/2 ,target.b.getPosition().y - b.height/2, b.width, b.height);
                 if (cc.rectContainsPoint(rectB, locationInNode)) {target.b.setPosition(touch.getLocation());return true;}
                

                 var c = target.c.getContentSize();
                 var rectC = cc.rect(target.c.getPosition().x - c.width/2 ,target.c.getPosition().y - c.height/2, c.width, c.height);
                 if (cc.rectContainsPoint(rectC, locationInNode)) {target.c.setPosition(touch.getLocation());return true;}
                

                 var d = target.d.getContentSize();
                 var rectD = cc.rect(target.d.getPosition().x - d.width/2 ,target.d.getPosition().y - d.height/2, d.width, d.height);
                 if (cc.rectContainsPoint(rectD, locationInNode)) {target.d.setPosition(touch.getLocation());return true;}
                

                 var e = target.e.getContentSize();
                 var rectE = cc.rect(target.e.getPosition().x - e.width/2 ,target.e.getPosition().y - e.height/2, e.width, e.height);
                 if (cc.rectContainsPoint(rectE, locationInNode)) {target.e.setPosition(touch.getLocation());return true;}
                

    },


    onTouchEnded: function(touch, event){

        
        
          var target = event.getCurrentTarget();
         
         var locationInNode = target.convertToNodeSpace(touch.getLocation());
                 
         
                 var a = target.a.getContentSize();
                 var rectA = cc.rect(target.a.getPosition().x - a.width/2 ,target.a.getPosition().y - a.height/2, a.width, a.height);
                 if (cc.rectContainsPoint(rectA, locationInNode)) { var a = cc.MoveTo.create(2,cc.p(target.a.xP,target.a.yP));
        target.a.runAction(a);this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.failure_mp3);
return true;}
                
                 
                 
                 var b = target.b.getContentSize();
                 var rectB = cc.rect(target.b.getPosition().x - b.width/2 ,target.b.getPosition().y - b.height/2, b.width, b.height);
                 if (cc.rectContainsPoint(rectB, locationInNode)) { var b = cc.MoveTo.create(2,cc.p(target.b.xP,target.b.yP));
        target.b.runAction(b);this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.failure_mp3);
return true;}
                
                 
                 
                 var c = target.c.getContentSize();
                 var rectC = cc.rect(target.c.getPosition().x - c.width/2 ,target.c.getPosition().y - c.height/2, c.width, c.height);
                 if (cc.rectContainsPoint(rectC, locationInNode)) { var c = cc.MoveTo.create(2,cc.p(target.c.xP,target.c.yP));
        target.c.runAction(c);this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.failure_mp3);
return true;}
                
                 
                 
                 var d = target.d.getContentSize();
                 var rectD = cc.rect(target.d.getPosition().x - d.width/2 ,target.d.getPosition().y - d.height/2, d.width, d.height);
                 if (cc.rectContainsPoint(rectD, locationInNode)) { var d = cc.MoveTo.create(2,cc.p(target.d.xP,target.d.yP));
        target.d.runAction(d);this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.failure_mp3);
return true;}
                

                 
                 
                 var e = target.e.getContentSize();
                 var rectE = cc.rect(target.e.getPosition().x - e.width/2 ,target.e.getPosition().y - e.height/2, e.width, e.height);
                 if (cc.rectContainsPoint(rectE, locationInNode)) { var e = cc.MoveTo.create(2,cc.p(target.e.xP,target.e.yP));
        target.e.runAction(e);this.audioEngine = cc.audioEngine;
            this.audioEngine.playEffect(res.failure_mp3);
return true;}
                

                 
        
    }

    }
    
    ,this);


        var size = cc.winSize;

         this.bg = new cc.Sprite.create(res.bg6_png);
         this.bg.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY );
         this.bg.setPosition(size.width / 2, size.height / 2); 
         this.addChild(this.bg);

         this.a = new cc.Sprite.create(res.a_png);
         this.a.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.a.setPosition(size.width*0.70 , size.height*0.19);
         this.a.xP = this.a.getPosition().x;
         this.a.yP = this.a.getPosition().y;
         this.a.setScale(level6SpriteScaleX, level6SpriteScaleY);
         this.addChild(this.a);
         cc.eventManager.addListener(eventListener, this.a);

         this.b = new cc.Sprite.create(res.b_png);
         this.b.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.b.setPosition(size.width*0.31 , size.height*0.14);
         this.b.xP = this.b.getPosition().x;
         this.b.yP = this.b.getPosition().y;
         this.b.setScale(level6SpriteScaleX, level6SpriteScaleY);
         this.addChild(this.b);
         cc.eventManager.addListener(eventListener, this.b);

        
         this.c = new cc.Sprite.create(res.c_png);
         this.c.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.c.setPosition(size.width*0.46 , size.height*0.10);
         this.c.xP = this.c.getPosition().x;
         this.c.yP = this.c.getPosition().y;
         this.c.setScale(level6SpriteScaleX, level6SpriteScaleY);
         this.addChild(this.c);
         cc.eventManager.addListener(eventListener, this.c);
         
         this.d = new cc.Sprite.create(res.d_png);
         this.d.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.d.setPosition(size.width*0.62 , size.height*0.10);
         this.d.xP = this.d.getPosition().x;
         this.d.yP = this.d.getPosition().y;
         this.d.setScale(level6SpriteScaleX, level6SpriteScaleY);
         this.addChild(this.d);
         cc.eventManager.addListener(eventListener, this.d);
         

         this.e = new cc.Sprite.create(res.e_png);
         this.e.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY);
         this.e.setPosition(size.width*0.07 , size.height*0.12);
         this.e.xP = this.e.getPosition().x;
         this.e.yP = this.e.getPosition().y;
         this.e.setScale(level6SpriteScaleX, level6SpriteScaleY);
         this.addChild(this.e);
         cc.eventManager.addListener(eventListener, this.e);




         ///////////////////////////for transparent
            
         this.at = new cc.Sprite.create(res.at_png);
         this.at.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY );
         this.at.setPosition(size.width*0.43 , size.height*0.69);
         this.at.setScale(level6SpriteScaleX, level6SpriteScaleY); 
         this.addChild(this.at);
         
         

         this.bt = new cc.Sprite.create(res.bt_png);
         this.bt.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY );
         this.bt.setPosition(size.width*0.52 , size.height*0.72);
         this.bt.setScale(level6SpriteScaleX, level6SpriteScaleY); 
         this.addChild(this.bt);
        

         this.ct = new cc.Sprite.create(res.ct_png);
         this.ct.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY );
         this.ct.setPosition(size.width*0.61 , size.height*0.69);
         this.ct.setScale(level6SpriteScaleX, level6SpriteScaleY); 
         this.addChild(this.ct);
         

                   
         this.dt = new cc.Sprite.create(res.dt_png);
         this.dt.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY );
         this.dt.setPosition(size.width*0.71 , size.height*0.67);
         this.dt.setScale(level6SpriteScaleX, level6SpriteScaleY); 
         this.addChild(this.dt);
         
             

         this.et = new cc.Sprite.create(res.et_png);
         this.et.setAnchorPoint(res.spriteAnchorX, res.spriteAnchorY );
         this.et.setPosition(size.width*0.78 , size.height*0.71);
         this.et.setScale(level6SpriteScaleX, level6SpriteScaleY); 
         this.addChild(this.et);
         


        return true;
    }


});

var level6Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new level6Layer();
        this.addChild(layer);
    }
});





    var playLevel6 = {

        preload: function () {

            //setting default path for assets to be used in game
            this.load.path = './assets/level6/';


            //loading assets for the level 6

            this.load.image("bg", "bg.png");


            this.load.image("a", "a.png");
            this.load.image("b", "b.png");
            this.load.image("c", "c.png");
            this.load.image("d", "d.png");
            this.load.image("e", "e.png");




            //for testing
            this.load.image("at", "at.png");
            this.load.image("bt", "bt.png");
            this.load.image("ct", "ct.png");
            this.load.image("dt", "dt.png");
            this.load.image("et", "et.png");





            //loading sounds
            this.load.audio("comedyBubble", "comedyBubble.mp3");
            this.load.audio("failure", "failure.mp3");



        },


        create: function () {

            game.physics.startSystem(physicsEngine);
            game.input.mouse.capture = true;


            //Adding audio
            comedyBubbleSound = game.add.audio('comedyBubble');

            failureSound = game.add.audio('failure');


            //Adding images 


            game.add.image(gameMinWidth,gameMinHeight, 'bg');

            
            var a = game.add.sprite(gameMinWidth+900,gameMinHeight+650, 'a');
            a.inputEnabled = true;
            a.input.enableDrag(false, true);
            a.id = 1;
            a.scale.setTo(level6SpriteScaleX, level6SpriteScaleY);

            var b = game.add.sprite(gameMinWidth+250,gameMinHeight+690, 'b');
            b.inputEnabled = true;
            b.input.enableDrag(false, true);
            b.id = 2;
            b.anchor.setTo(spriteAnchorX, spriteAnchorY);
            b.scale.setTo(level6SpriteScaleX, level6SpriteScaleY);

            var c = game.add.sprite(gameMinWidth+600,gameMinHeight+720, 'c');
            c.inputEnabled = true;
            c.input.enableDrag(false, true);
            c.id = 3;
            c.anchor.setTo(spriteAnchorX, spriteAnchorY);
            c.scale.setTo(level6SpriteScaleX, level6SpriteScaleY);

            var d = game.add.sprite(gameMinWidth+800,gameMinHeight+720, 'd');
            d.inputEnabled = true;
            d.input.enableDrag(false, true);
            d.id = 4;
            d.anchor.setTo(spriteAnchorX, spriteAnchorY);
            d.scale.setTo(level6SpriteScaleX, level6SpriteScaleY);

            var e = game.add.sprite(gameMinWidth+100,gameMinHeight+710, 'e');
            e.inputEnabled = true;
            e.input.enableDrag(false, true);
            e.id = 5;
            e.anchor.setTo(spriteAnchorX, spriteAnchorY);
            e.scale.setTo(level6SpriteScaleX, level6SpriteScaleY);


            //for transparent

            var at = game.add.sprite(gameMinWidth+490,gameMinHeight+140, 'at');
            at.anchor.setTo(0, 0);
            at.scale.setTo(level6SpriteScaleX, level6SpriteScaleY);

            var bt = game.add.sprite(gameMinWidth+590,gameMinHeight+100, 'bt');
            bt.anchor.setTo(0, 0);
            bt.scale.setTo(level6SpriteScaleX, level6SpriteScaleY);

            var ct = game.add.sprite(gameMinWidth+790,gameMinHeight+256, 'ct');
            ct.anchor.setTo(spriteAnchorX, spriteAnchorY);
            ct.scale.setTo(level6SpriteScaleX, level6SpriteScaleY);

            var dt = game.add.sprite(gameMinWidth+910,gameMinHeight+284, 'dt');
            dt.anchor.setTo(spriteAnchorX, spriteAnchorY);
            dt.scale.setTo(level6SpriteScaleX, level6SpriteScaleY);

            var et = game.add.sprite(gameMinWidth+1000,gameMinHeight+250, 'et');
            et.anchor.setTo(spriteAnchorX, spriteAnchorY);
            et.scale.setTo(level6SpriteScaleX, level6SpriteScaleY);




            this.game.physics.arcade.enable([a, b, c, d, e, at, bt, ct, dt, et], physicsEngine);


            a.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, at);}, this);
            b.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, bt);}, this);
            c.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, ct);}, this);
            d.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, dt);}, this);
            e.events.onDragStop.add(function(currentSprite){this.stopDrag(currentSprite, et);}, this);



            a.body.collideWorldBounds = true;
            b.body.collideWorldBounds = true;
            c.body.collideWorldBounds = true;
            d.body.collideWorldBounds = true;
            e.body.collideWorldBounds = true;

            //For transparent
            a.originalPosition = a.position.clone();
            b.originalPosition = b.position.clone();
            c.originalPosition = c.position.clone();
            d.originalPosition = d.position.clone();
            e.originalPosition = e.position.clone();



            at.body.collideWorldBounds = true;
            at.body.immovable = true;

            bt.body.collideWorldBounds = true;
            bt.body.immovable = true;

            ct.body.collideWorldBounds = true;
            ct.body.immovable = true;

            dt.body.collideWorldBounds = true;
            dt.body.immovable = true;

            et.body.collideWorldBounds = true;
            et.body.immovable = true;


        },


        update: function () {

           //regular update goes here
            if((game.input.activePointer.leftButton.isDown 
                || game.input.activePointer.middleButton.isDown 
                || game.input.activePointer.rightButton.isDown)
                && counterLevel6 == 6){



            }



        },

     stopDrag: function(currentSprite, endSprite){



         if (!this.game.physics.arcade.overlap(currentSprite, endSprite, function() {


             if(currentSprite.id == counterLevel6){
            currentSprite.input.draggable = false;
            currentSprite.inputEnabled = false;     
            currentSprite.position.copyFrom(endSprite.position); 
            currentSprite.anchor.setTo(endSprite.anchor.x, endSprite.anchor.y); 

                 comedyBubbleSound.play();

                 counterLevel6++;
              }
             else {
                 game.add.tween(currentSprite).to(currentSprite.originalPosition, tweenDuration).start();

                 failureSound.play();

             }
            } ,null, this) ) 
                { 
                    game.add.tween(currentSprite).to(currentSprite.originalPosition, tweenDuration).start();

                    failureSound.play();
                     }


      }
    };

/// <reference path="../../cocos2d-typescript-definitions/cocos2d/cocos2d-lib.d.ts" />
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2 + 200;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.sprite, 0);

        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

