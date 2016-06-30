
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        
        this._super();
        var size = cc.winSize;
        
        // var arrayMountain = new arrayMountain(); 
        this.initVariable();
        
        var helloLabel = new cc.LabelTTF("Testing for Endless Mountain", "Arial", 150);
        var backgroundLayer = cc.LayerGradient.create(cc.color(255,83,26, 255), cc.color(0,0,0,155));
        this.addChild(backgroundLayer);
        
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2 + 250;
        this.addChild(helloLabel, 5);

        this.leftBarrier = new cc.Sprite(res.barrier);
        this.leftBarrier.setPosition(101,0);
        this.leftBarrier.setAnchorPoint(0,0);
        this.addChild(this.leftBarrier);

        this.rightBarrier = new cc.Sprite(res.barrier);
        this.rightBarrier.setPosition(size.width - 300,0);
        this.rightBarrier.setAnchorPoint(0,0);
        this.addChild(this.rightBarrier);

        // var mountain = new cc.Sprite(res.mountainDark2);
        // mountain.setPosition(this.rightBarrier.x ,100);
        // mountain.setAnchorPoint(0,0);
        // this.addChild(mountain);
        // this.allBgLayerObject.push(mountain);
        // mountain.runAction(cc.MoveTo.create(5,cc.p(this.leftBarrier.x, 100)));
        // this.currentMountain = mountain;
        // this.layerModes = 1;
        
        this.character = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("main1.png"));
        this.character.setPosition(cc.director.getWinSize().width/2,cc.director.getWinSize().height/2);
        this.addChild(this.character);
        
        this.rock = new cc.Sprite("res/imgs/pathmid1.png");
        this.rock.setPosition(cc.director.getWinSize().width/2,300);
        this.addChild(this.rock);
        
        this.scheduleUpdate();
        return true;
    },
    
    update : function(dt){
      
    //   this.startingIntersectMode();
    //   this.RemoveObjectByIntersectWithLeftBarrier();
    
         
    
    },
    
    startingIntersectMode : function(){
        
       if(this.layerModes == this.LayerMode.rightIntersectMode){
          if(!cc.rectIntersectsRect(this.rightBarrier.getBoundingBox(),this.currentMountain.getBoundingBox())){
              this.layerModes = 3;
              this.AddObjectWhenPreviousObjectPassed();
          }
       }
    },

    AddObjectWhenPreviousObjectPassed : function(){
       
        var MountainRandomvalue = Math.floor(this.getRandomArbitrary(0,this.mountainImages.length));
       
        var currentImage =new cc.Sprite("res/imgs/"+this.mountainImages[MountainRandomvalue]+".png");
        currentImage.setPosition(this.rightBarrier.x - 20,100);
        currentImage.setAnchorPoint(0,0);
        this.addChild(currentImage);
        this.allBgLayerObject.push(currentImage);
        this.currentMountain = currentImage;
        this.currentMountain.runAction(cc.MoveTo.create(5,cc.p(this.leftBarrier.x, 100)));
        this.layerModes = 1;
        
    },

    RemoveObjectByIntersectWithLeftBarrier : function(){
        for(var i = 0 ; i < this.allBgLayerObject.length; i++){
            if(cc.rectIntersectsRect(this.leftBarrier.getBoundingBox(),this.allBgLayerObject[i].getBoundingBox())){
                this.removeChild(this.allBgLayerObject[i]);
            }
        }
    },
    
    checkIntersectWithLeftBarrierOrNot : function(){
        
    },
    
    checkIntersectWithRightBarrierOrNot : function(){
        
    },
    getRandomArbitrary : function (min, max) {
        return Math.random() * (max - min) + min;
    },
    
    initVariable : function(){
        
        this.allBgLayerObject = [];
        this.LayerMode = {rightIntersectMode : 1 ,leftIntersectMode : 2, AddingImageToSceneMode : 3};
        this.layerModes = null;
        this.mountainImages = ["mondrak-02","mondrak-03","mondrak-04","monlight 01","monlight 02","monlight 03"];

        this.currentMountain = null;
       
    }
    
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

