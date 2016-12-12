/// <reference path="../../src/cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />

var xc = xc || {};

xc.TrainLayer = cc.Layer.extend({

    size: null,
    self: null,
    random: null,
    _height: null,
    tunnel_front_sprite: null,
    tunnel_back_sprite: null,
    randomLetter: null,
    storedLetter: null,
    train: null,
    final_tunnel: null,
    sentence: null,
    position: null,
    wordPosition: null,
    repeatForeverAction: null,
    transLayer : null,
    layer1 : null,
    gameName: "train",
    currentLevel : null,
    wordForSentanceArray: null,
    _menuContext : null,
    
    ctor: function () {
        this._super();

        size = cc.winSize;
        self = this;

        tunnel_front_sprite = new Array();
        tunnel_back_sprite = new Array();
        randomLetter = new Array();
        storedLetter = new Array();
        transLayer = new Array();
    },
    
  onEnterTransitionDidFinish: function() {
      
        wordPosition = 1;
        position = [
            { x: size.width * .15, y: size.height * .36 }, { x: size.width * .45, y: size.height * .36 }, { x: size.width * .75, y: size.height * .36 },
            { x: size.width * .15, y: size.height * .23 }, { x: size.width * .45, y: size.height * .23 }, { x: size.width * .75, y: size.height * .23 },
            { x: size.width * .15, y: size.height * .10 }, { x: size.width * .45, y: size.height * .10 }, { x: size.width * .75, y: size.height * .10 },
        ];

        layer1 = new cc.LayerColor(cc.color(255, 255, 255, 100), size.width, size.height * .50);

        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,

            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var targetSize = target.getContentSize();
                var rect = cc.rect(0, 0, targetSize.width, targetSize.height);

                if (cc.rectContainsPoint(rect, locationInNode)) {
                    if (sentence[wordPosition - 1] == target.id && target.selected == 0 && !(layer1.isVisible()) && randomLetter[wordPosition - 1].index == target.index) {
                        layer1.setVisible(true);
                        target.stopAction(repeatForeverAction);
                        target.selected = 1;
                        target.setScale(1);
                        target.setPosition(target.xP, target.yP);
                        _menuContext.addPoints(1);
                        
                        cc.audioEngine.playEffect("sounds/sfx/success.ogg", false);
                        
                        if (wordPosition % 3 != 0) {
                            var scaleAnimation = function () {
                                var increase = new cc.ScaleTo(1, 1.4);
                                var decrease = new cc.ScaleTo(1, 1);
                                var delay = new cc.DelayTime(3);
                                repeatForeverAction = new cc.RepeatForever(new cc.Sequence(increase, decrease, delay));
                                randomLetter[wordPosition].setPosition(randomLetter[wordPosition].xP, randomLetter[wordPosition].yP);
                                randomLetter[wordPosition].runAction(repeatForeverAction);
                                layer1.setVisible(false);
                                wordPosition++;
                            };

                            if (wordPosition != random) {
                                var tunnel = tunnel_front_sprite[wordPosition];
                                var target_Action = new cc.MoveTo(1, cc.p(tunnel_front_sprite[wordPosition - 1].getPositionX(), tunnel_front_sprite[wordPosition].getPositionY()));
                                var train_Action_function = function () {
                                    var train_Action = new cc.MoveTo(1.5, cc.p(tunnel.getPositionX() - tunnel.getContentSize().width * .70, train.getPositionY()))
                                    var callSA = new cc.CallFunc(scaleAnimation, this);
                                    train.runAction(new cc.Sequence(train_Action, callSA));
                                };
                            }
                            else if (wordPosition == random) {
                                var target_Action = new cc.MoveTo(1, cc.p(tunnel_front_sprite[wordPosition - 1].getPositionX(), tunnel_front_sprite[wordPosition - 1].getPositionY()));

                                var train_Action_function = function () {
                                    
                                    var gameOver = function()
                                    {
                                            if (cc.sys.isNative) {
                                                _menuContext.showScore();
                                            }
                                    };                                    
                                    var train_Action = new cc.MoveTo(1.5, cc.p(size.width * 1.20, train.getPositionY()))
                                    train.runAction(new cc.Sequence(train_Action, new cc.CallFunc(gameOver, this)));
                                };
                            }
                            target.runAction(new cc.Sequence(target_Action, new cc.CallFunc(train_Action_function, this)));
                        }
                        else if (wordPosition % 3 == 0) {
                            if (wordPosition != random) {
                                var tunnel = tunnel_front_sprite[wordPosition];

                                var train_come = function () {
                                    var scaleAnimation = function () {
                                        var increase = new cc.ScaleTo(1, 1.4);
                                        var decrease = new cc.ScaleTo(1, 1);
                                        var delay = new cc.DelayTime(3);
                                        randomLetter[wordPosition].setPosition(randomLetter[wordPosition].xP, randomLetter[wordPosition].yP);
                                        repeatForeverAction = new cc.RepeatForever(new cc.Sequence(increase, decrease, delay));
                                        randomLetter[wordPosition].runAction(repeatForeverAction);
                                        layer1.setVisible(false);
                                        wordPosition++;
                                    };

                                    var tunnel = tunnel_front_sprite[wordPosition];
                                    train.setPosition(0, tunnel.getPositionY() * 98.5 / 100);
                                    var train_newPos = new cc.MoveTo(1, cc.p(tunnel.getPositionX() - tunnel.getContentSize().width * .75, train.getPositionY()));
                                    train.runAction(new cc.Sequence(train_newPos, new cc.CallFunc(scaleAnimation, this)));
                                };

                                var train_Action_function = function () {
                                    var train_Action = new cc.MoveTo(1.5, cc.p(size.width * 130 / 100, tunnel_front_sprite[wordPosition - 1].getPositionY()));

                                    train.runAction(new cc.Sequence(train_Action, new cc.CallFunc(train_come, this)));
                                };
                                var target_Action = new cc.MoveTo(1, cc.p(tunnel_front_sprite[wordPosition - 1].getPositionX(), tunnel_front_sprite[wordPosition - 1].getPositionY()));

                                target.runAction(new cc.Sequence(target_Action, new cc.CallFunc(train_Action_function, this)));
                            }
                            else if (wordPosition == random) {
                                var target_Action = new cc.MoveTo(1, cc.p(tunnel_front_sprite[wordPosition - 1].getPositionX(), tunnel_front_sprite[wordPosition - 1].getPositionY()));

                                var train_Action_function = function () {
                                    
                                var gameOver = function()
                                {
                                        if (cc.sys.isNative) {
                                            _menuContext.showScore();
                                        }
                                };
                                    
                                    var train_Action = new cc.MoveTo(1.5, cc.p(size.width * 130 / 100, final_tunnel.getPositionY()))
                                    train.runAction(new cc.Sequence(train_Action, new cc.CallFunc(gameOver, this)));
                                };
                                target.runAction(new cc.Sequence(target_Action, new cc.CallFunc(train_Action_function, this)));
                            } 
                        }
                    }
                    else if(target.selected==0 && !(layer1.isVisible())){
                        layer1.setVisible(true);
                        cc.audioEngine.playEffect("sounds/sfx/error.ogg", false);
                        var removeLayer = function()
                        {
                            layer1.setVisible(false);
                            _menuContext.addPoints(-1);
                        };

                        var increase = new cc.MoveTo(1, cc.p(target.getPositionX() + size.width * .10, target.getPositionY() + size.height * .10));
                        var decrease = new cc.MoveTo(1, cc.p(target.xP, target.yP));

                        var sequence = new cc.Sequence(increase, decrease);
                        target.runAction(new cc.Sequence(sequence, new cc.CallFunc(removeLayer, this)));
                    }
                    return true;
                }
                return false;
            }
        });


        var background = ccs.load(xc.TrainLayer.res.train_json, xc.path);
        background.node.attr({
            x : size.width / 2,
            y : size.height / 2,
            anchorX : .5,
            anchorY : .5
        });
        this.addChild(background.node);

        if (cc.sys.isNative)
        {
            _menuContext = self.getParent().menuContext;
            currentLevel = _menuContext.getCurrentLevel();
//            wordForSentanceArray = goa.TextGenerator.getInstance().generateASentence();
//            currentLevel = 0;
                
            if(currentLevel>=1 && currentLevel<=8)
            {
                wordForSentanceArray = goa.TextGenerator.getInstance().generateASentence(4);
            }
            else if(currentLevel>=9 && currentLevel<=16)
            {
                wordForSentanceArray = goa.TextGenerator.getInstance().generateASentence(5);
            }
            else if(currentLevel>=17 && currentLevel<=24)
            {
                wordForSentanceArray = goa.TextGenerator.getInstance().generateASentence(6);
            }
            else if(currentLevel>=25 && currentLevel<=32)
            {
                wordForSentanceArray = goa.TextGenerator.getInstance().generateASentence(7);
            }
            else if(currentLevel>=33 && currentLevel<=40)
            {
                wordForSentanceArray = goa.TextGenerator.getInstance().generateASentence(8);
            }
            else if(currentLevel>=41 && currentLevel<=48)
            {
                wordForSentanceArray = goa.TextGenerator.getInstance().generateASentence(9);
            }
        }

        sentence = wordForSentanceArray.split(" ");
        cc.log(sentence);

        random = sentence.length //Math.floor(Math.random() * 7) + 3;
        _menuContext.setMaxPoints(random);
        var row = 0, temp = random;

        while (temp >= 3) {
            row++;
            temp -= 3;
        }

        if (temp > 0)
            row++;

        _height = (size.height * .40) / row;
        train = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("train/train.png"));
        train.attr({
            x: size.width * .06,
            y: (size.height * .52) + (_height * (row - 1 + .5)),
            anchorX: .5,
            anchorY: .5
        });
        this.addChild(train, 1);

        temp = random;

        for (var i = --row; i >= 0; i--) {
            var y = _height * (i + .5);
            var col = ((temp / 3) >= 1 ? 3 : temp % 3);
            var _width = (size.width * .90) / col;

                var railwaytrack = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("train/railwaytrack.png"));
                railwaytrack.attr({
                    x: 0,
                    y: size.height * 49.3 / 100 + y,
                    anchorX: 0,
                    anchorY: .5
                });
                this.addChild(railwaytrack, 1);

                if(col==3)
                    railwaytrack.setScaleX(2);
                if(col==2)
                    railwaytrack.setScaleX(3);
                if(col==1)
                    railwaytrack.setScaleX(6.5);


            for (var j = 0; j < col; j++) {
                var tunnel_front = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("train/tunnel_front.png"));
                tunnel_front.attr({
                    x: size.width * .06 + (j + .5) * _width,
                    y: size.height * .53 + y,
                    anchorX: .5,
                    anchorY: .5
                });
                this.addChild(tunnel_front, 1);
                tunnel_front.selected = 0;

                var tunnel_back = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("train/tunnel_back.png"));
                tunnel_back.attr({
                    x: tunnel_front.getPositionX() + tunnel_front.getBoundingBox().width / 2,
                    y: tunnel_front.getPositionY(),
                    anchorX: .5,
                    anchorY: .5
                });
                this.addChild(tunnel_back, 0);
                tunnel_back.selected = 0;

                var railwaytrack = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("train/railwaytrack.png"));
                railwaytrack.attr({
                    x: tunnel_front.getPositionX() + tunnel_front.getBoundingBox().width * .40,
                    y: size.height * 49.3 / 100 + y,
                    anchorX: 0,
                    anchorY: .5
                });
                this.addChild(railwaytrack, 1);
                if(col==3)
                    railwaytrack.setScaleX(2.5);
                if(col==2)
                    railwaytrack.setScaleX(5);
                if(col==1)
                    railwaytrack.setScaleX(6);

                tunnel_front_sprite.push(tunnel_front);
                tunnel_back_sprite.push(tunnel_back);
            }
            temp -= 3;
        }

        final_tunnel = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("train/final_tunnel.png"));
        final_tunnel.attr({
            x: size.width * .98,
            y: tunnel_back_sprite[tunnel_back_sprite.length - 1].getPositionY(),
            anchorX: .5,
            anchorY: .5
        });
        this.addChild(final_tunnel, 0);

        var front_tunnel = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("train/front_tunnel.png"));
        front_tunnel.attr({
            x: size.width * 99.2 / 100,
            y: tunnel_back_sprite[tunnel_back_sprite.length - 1].getPositionY() * 99.5 / 100,
            anchorX: .5,
            anchorY: .5
        });
        this.addChild(front_tunnel, 2);

        for (var i = 0; i < random; i++) {

            var label = new cc.LabelTTF(sentence[i], "Arial", 100);
            label.attr({
                x: position[i].x,
                y: position[i].y
            });

            this.addChild(label, 1);
            label.id = sentence[i];
            label.selected = 0;
            label.index = i;
            label.pos = -1;
            label.xP = label.getPositionX();
            label.yP = label.getPositionY();
            label.setColor(new cc.color(0, 0, 0, 255));
            randomLetter.push(label);

            cc.eventManager.addListener(listener.clone(), label);
        }


        layer1 = new cc.LayerColor(cc.color(255, 255, 255, 150), size.width, size.height * .50);
        layer1.attr({
            x : 0,
            y : 0,
            anchorX : .5,
            anchorY : .5
        });
        this.addChild(layer1);
        cc.eventManager.addListener(listener.clone(), layer1);
        layer1.setVisible(true);

        var increase = new cc.ScaleTo(1, 1.4);
        var decrease = new cc.ScaleTo(1, 1);
        var delay = new cc.DelayTime(3);
        repeatForeverAction = new cc.RepeatForever(new cc.Sequence(increase, decrease, delay));
        randomLetter[0].runAction(repeatForeverAction);

        var sentense_string = sentence.slice();

        setTimeout(function() {

            for(var i = 0; i<random; )
            {
                var char = Math.floor(Math.random() * position.length);
                if(!(randomLetter[i].xP == position[char].x && randomLetter[i].yP == position[char].y))
                {
                    randomLetter[i].xP = position[char].x;
                    randomLetter[i].yP = position[char].y;
                    if(i==random-1)
                    {
                        var layerVisible = function()
                        {
                            layer1.setVisible(false);
                        }
                        var move = new cc.MoveTo(3, cc.p(position[char].x, position[char].y));
                        randomLetter[i].runAction(new cc.Sequence(move, new cc.CallFunc(layerVisible, self)));
                    }
                    else
                    {
                        randomLetter[i].runAction(new cc.MoveTo(3, cc.p(position[char].x, position[char].y)));
                    }
                    position.splice(position.indexOf(position[char]), 1);
                    i++;
                }
            }

        }, 800);
  }

});


xc.TrainLayer.res = {
    train_json: xc.path + "train/train.json",
    train_plist: xc.path + "train/train.plist",
    front_tunnel: xc.path + "train/front_tunnel.png"
};