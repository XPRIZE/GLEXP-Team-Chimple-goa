/// <reference path="../../cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />

var xc = xc || {};

xc.PopLayer = cc.Layer.extend({
    gameName: "pop",
    multiPlayerMode: false,
    //sprite: null,
    ctor: function () {
        //////////////////////////////
        // 1. super init first
        this._super();

    },

    onEnterTransitionDidFinish: function() 
    {
            
        var worldSize = cc.winSize;
        var self = this;

        sceneChooser = ["scene_1", "scene_2"];
        this.selectedScene = sceneChooser[Math.floor(this.getRandomArbitrary(0, 2))];

        this.cloudContainer = [];
        this.stringContainer = [];
        var existingNumber = [];
        this.wordInOrder = [];
        this.clickableFlag = false;
        this.currentLevel = null; 

        // S T A R T
        //    if (cc.sys.isNative)
        //     {
        //         menuContext = self.getParent().menuContext;
        //         this.currentLevel = menuContext.getCurrentLevel();
        //         wordForSentanceArray = goa.TextGenerator.getInstance().generateASentence(1);
            
        //     }

        // level mapping for pop game
        var levelKeyNumber = this.levelAllInfo(47, 4,2,8,6);
         var sceneRes = null;
        if(this.selectedScene== "scene_1")
        {
                 sceneRes = ccs.load(xc.PopLayer.res.pop_scene_1, xc.path);
        }
        else
        {
                 sceneRes = ccs.load(xc.PopLayer.res.pop_scene_2, xc.path);
        }
           var catagoryMap = [9,4,5,6,7,8]
           var catagoryLevel = catagoryMap[levelKeyNumber.catagoryNum];
        //  var wordForSentanceArray = goa.TextGenerator.getInstance().generateASentence(catagoryLevel);
        
       // E N D
                if (worldSize.width > 2560){
                    var x = worldSize.width - 2560;
                    sceneRes.node.x = x/2;
                }
                this.addChild(sceneRes.node);
             

                this.plane = ccs.load(xc.PopLayer.res.pop_plane, xc.path);
                this.plane.node.x = worldSize.width + 200;
                if(this.selectedScene == "scene_1")
                {
                    var multiplyFactor = 0.7;
                }
                else
                {
                    var multiplyFactor = 0.76;
                }
                this.plane.node.y = cc.director.getWinSize().height * multiplyFactor;
                this.plane.node.uId = "plane";
                this.addChild(this.plane.node);
                this.plane.node.runAction(this.plane.action);
                this.plane.action.play('planerun', true);
                this.plane.node.runAction(cc.MoveTo.create(5, cc.p(-220, cc.director.getWinSize().height * multiplyFactor)));
        
        var wordForSentanceArray = goa.TextGenerator.getInstance().generateASentence();
        wordForSentanceArray = wordForSentanceArray.split(" ");

         //var wordForSentanceArray = ["Twinkle","Twinkle", "Twinkle","Twinkle","Twinkle"];

        var dummySentance = "";
        for(var i=0; i<wordForSentanceArray.length; i++)
        {
            dummySentance = dummySentance +" "+ wordForSentanceArray[i];
        }

            this.sentanceInRightOrder = new cc.LabelTTF(dummySentance, "Arial", 120);
            this.sentanceInRightOrder.color = new cc.Color(255, 192, 203);
            this.sentanceInRightOrder.attr({
                x: cc.director.getWinSize().width / 2,
                y: cc.director.getWinSize().height * .93
            });

            this.addChild(this.sentanceInRightOrder);
            setTimeout(function(){ self.clickableFlag = true; 
                self.removeChild(self.sentanceInRightOrder)}, 12000);

            var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,

            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var targetSize = target.getContentSize();
                var rect = cc.rect(0, 0, targetSize.width, targetSize.height);

                if (cc.rectContainsPoint(rect, locationInNode)) {
                    console.log("clickableFlag : "+self.clickableFlag);
                    if(self.clickableFlag)
                    {
                        console.log("clickableFlag : "+self.clickableFlag);
                        self.setWordInRightOrder(target);
                    }
                    return true;
                }
                return false;
            }
        });
        var x = 0.7
        var y = 0;
        while (existingNumber.length != wordForSentanceArray.length) {
            var duplicateCheck = true;
            var numberPicker = Math.floor(this.getRandomArbitrary(1, 13));
            for (var i = 0; i < existingNumber.length; i++) {
                if (numberPicker == existingNumber[i]) {
                    duplicateCheck = false;
                }
            }
            if (duplicateCheck) {
                existingNumber.push(numberPicker);
            }

        }
        for (var i = 0; i < wordForSentanceArray.length; i++) {
            var cloud = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("pop/cloud.png"));
            cloud.setName("cloud_" + (i + 1));
            this.addChild(cloud);
            this.cloudContainer.push(cloud);
            cloud.id = y;
            y++;

            if (existingNumber[i] >= 1 && existingNumber[i] <= 4) {
                cloud.Xpos = (worldSize.width / 4) * (existingNumber[i] - 1) + 300;
                cloud.Ypos = cc.director.getWinSize().height * 0.76;
                cloud.setPosition(worldSize.width + 300, cloud.Ypos);
            }

            else if (existingNumber[i] >= 5 && existingNumber[i] <= 8) {
                cloud.Xpos = (worldSize.width / 4) * (existingNumber[i] - 5) + 390;
                cloud.Ypos = (cc.director.getWinSize().height * 0.76) - cloud.getBoundingBox().height;
                cloud.setPosition(worldSize.width + 300, cloud.Ypos);
            }

            else if (existingNumber[i] >= 9 && existingNumber[i] <= 12) {
                cloud.Xpos = (worldSize.width / 4) * (existingNumber[i] - 9) + 240;
                cloud.Ypos = (cc.director.getWinSize().height * 0.76) - (cloud.getBoundingBox().height * 2);
                cloud.setPosition(worldSize.width + 300, cloud.Ypos);
            }

            var label = new cc.LabelTTF(""+wordForSentanceArray[i], "Arial", 110);
            label.color = new cc.Color(255, 192, 203);
            label.attr({
                x: cloud.getBoundingBox().width / 2,
                y: cloud.getBoundingBox().height / 2
            });

            cloud.addChild(label);
            this.stringContainer[i]=""+wordForSentanceArray[i];
            cc.eventManager.addListener(listener.clone(), cloud);
        }
        setTimeout(function () {
            for (var i = 0; i < self.cloudContainer.length; i++) {

                var actionDate = new cc.MoveTo(Math.floor(self.getRandomArbitrary(9, 12)), cc.p(self.cloudContainer[i].Xpos, self.cloudContainer[i].Ypos));
                var easeAction = new cc.EaseBackOut(actionDate);
                self.cloudContainer[i].runAction(easeAction);
            }

        }, 1750);
    },

    getRandomArbitrary: function (min, max) {
        return Math.random() * (max - min) + min;
    },

    getSentanceLength: function()
    {
            return catagoryMap[element];
    },

    setWordInRightOrder: function (wordObject) {
        if (this.wordInOrder.length == 0 ) {
            //wordObject.id == 0 ||
            if( wordObject.children[0].getString() == this.stringContainer[this.wordInOrder.length])
            {
                 this.makeSentance(wordObject);
            }
            else
            {
                  this.cloudShake(wordObject);
            }
        }
        else if (this.wordInOrder.length != 0) {
            //this.wordInOrder.length == wordObject.id
            if ( wordObject.children[0].getString() == this.stringContainer[this.wordInOrder.length])
             {
                this.makeSentance(wordObject);
             }
           else{
                  this.cloudShake(wordObject);
             }
        }
    },
    makeSentance: function (word) {
        if (this.wordInOrder.length == 0) {
            this.correctSentance = new cc.LabelTTF(word.children[0].getString(), "Arial", 120);
            this.correctSentance.color = new cc.Color(255, 192, 203);
            this.correctSentance.attr({
                x: cc.director.getWinSize().width / 2,
                y: cc.director.getWinSize().height * .93
            });

            this.addChild(this.correctSentance);
            this.wordInOrder.push(word.id);
            this.removeChild(word);
        }
        else {
            this.wordInOrder.push(word.id);
            this.correctSentance.setString(this.correctSentance.getString() + " " + word.children[0].getString());
            this.removeChild(word);
        }
        
        this.removePlaneFromScene();
    },
    removePlaneFromScene: function () {
        var self = this;
        console.log(" the value should be length of cloudContainer : "+ this.cloudContainer.length);
        if (this.wordInOrder.length == this.cloudContainer.length) {
            this.removeChild(this.plane.node);
            // xc.GameScene.load(xc.PopLayer);
            console.log("GAME OVER");
           setTimeout( function(){    
                 if (cc.sys.isNative) {
                var menuContext = self.getParent().menuContext;
                cc.log("showscore");
                menuContext.showScore();
            }}, 1200);
        }
    },
    cloudShake: function(wrongCloud)
    {
                var action_1 = new cc.MoveBy(0.1, 10, 0);
                var action_2 = new cc.MoveBy(0.1, 0, -10);
                var action_3 = new cc.MoveBy(0.1, 0, 10);
                var action_4 = new cc.MoveBy(0.1, -10, 0);

                var seqAction = new cc.Sequence(action_1, action_2, action_3,action_4);
                wrongCloud.runAction(seqAction);
    },
  levelAllInfo: function(currentLevel, sceneRepetitionNo, totalScene, catagoryRepetitionNo, totalcatagory)
    {
        var currentLevelInFloat = currentLevel.toFixed(2);;
        var sceneBaseValue = (Math.ceil(currentLevelInFloat/ sceneRepetitionNo));
        var sceneNo = sceneBaseValue % totalScene;

        var catagoryBaseValue =Math.ceil(currentLevelInFloat / catagoryRepetitionNo);
        var catagoryNo = catagoryBaseValue % totalcatagory;
        
        return  {
                    sceneNum: sceneNo,
                    catagoryNum: catagoryNo
                };
    }
});
xc.PopLayer.res = {
    pop_scene_1: xc.path + "pop/pop.json",
    pop_scene_2: xc.path + "pop/pop2.json",
    pop_plane: xc.path + "pop/plane.json",
    pop_scene_plist: xc.path + "pop/pop.plist",
    pop_scene_png: xc.path + "pop/pop.png",
}