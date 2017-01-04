/// <reference path="../cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />

var xc = xc || {}

xc.DotsLayer = cc.LayerGradient.extend({
  _currentNumber: 1,
  _number: null,
  _hand: null,
  _text: null,
  _nextButton: null,
  _level: 1,
  _help: null,
  ctor: function() {
    this._super(cc.color(141, 71, 33), cc.color(74, 42, 11))
    this.setContentSize(cc.director.getVisibleSize())
    cc.spriteFrameCache.addSpriteFrames(xc.DotsLayer.res.hand_plist)
  },
  onEnterTransitionDidFinish: function() {
    this._level = this.getParent().menuContext.getCurrentLevel()
    this._currentNumber = Math.max(1, this._level - 4)
    if(this._level <= 10) {
      this.showNumber()
    } else {
      var quizLayer = new xc.DotsQuizLayer(this._level)
      this.addChild(quizLayer)
      this.getParent().menuContext.setMaxPoints(quizLayer._numButtons * 2)
      quizLayer.showDotNum()
    }
  },
  showNumber: function() {
    this._number = new xc.DotNum(this._currentNumber, 400, this.showFinger, this)
    this._number.setPosition(1280, 2400)
    this.addChild(this._number)
    var dropAction = new cc.MoveTo(0.5, cc.p(1280, 900))
    dropAction.easing(cc.easeBackOut())
    var callFunc = new cc.CallFunc(function() {
      if(this._level == 1) {
        this._help = new xc.HelpLayer(cc.rect(1280, 900, 200, 200))
        this.addChild(this._help)
        this._help.click(cc.p(1280, 900))
      }
    }, this)
    var seq = new cc.Sequence(dropAction, callFunc)
    this._number.runAction(seq)
  },
  showFinger: function(dotNum) {
    if(this._help) {
      this.removeChild(this._help)
      this._help = null
    }
    this._hand = new cc.Sprite("#" + xc.DotsLayer.fingerRep[dotNum._num])
    this._hand.setPosition(640, 2400)
    this.addChild(this._hand)
    var dropAction = new cc.MoveTo(0.5, cc.p(640, 1350))
    dropAction.easing(cc.easeBackOut())

    var delay = new cc.DelayTime(1)
    var callFunc = new cc.CallFunc(function() {
      this._nextButton = new ccui.Button(xc.DotsLayer.res.next_png, xc.DotsLayer.res.next_png, xc.DotsLayer.res.next_png, ccui.Widget.LOCAL_TEXTURE)
      this.addChild(this._nextButton)
      this._nextButton.setPosition(cc.director.getVisibleSize().width * 95 / 100, 900)
      this._nextButton.setScale(0.5)
      var scaleAction = new cc.ScaleTo(0.5, 1.0)
      scaleAction.easing(cc.easeBackOut())
      this._nextButton.runAction(scaleAction)
      this._nextButton.addTouchEventListener(this.showNext, this)
    }, this)

    var seq = new cc.Sequence(dropAction, delay, callFunc)
    this._hand.runAction(seq)

    this._text = new cc.LabelTTF(dotNum._num.toString(), "Arial", 512)
    this._text.color = new cc.Color(255, 255, 255)
    this._text.setPosition(1920, 2400)
    this.addChild(this._text)
    var textDropAction = new cc.MoveTo(0.5, cc.p(1920, 1350))
    textDropAction.easing(cc.easeBackOut())
    this._text.runAction(textDropAction)

    var numDropAction = new cc.MoveTo(0.5, cc.p(1280, 450))
    numDropAction.easing(cc.easeBackOut())
    this._number.runAction(numDropAction)
  },
  showNext: function(sender, type) {
    this.removeChild(this._number)
    this.removeChild(this._hand)
    this.removeChild(this._text)    
    this.removeChild(this._nextButton)
    this._currentNumber++
    if(this._currentNumber <= this._level) {
      this.showNumber()
    } else {
      var quizLayer = new xc.DotsQuizLayer(this._level)
      this.addChild(quizLayer)
      this.getParent().menuContext.setMaxPoints(quizLayer._numButtons * 2)      
      quizLayer.showDotNum()
    }
  }
})

xc.Dot = cc.Sprite.extend({
  _touched: false,
  _listener: null,
  _cb: null,
  _callee: null,
  _dotColor: null, //temporary - somehow DrawNode doesnt take getColor() in JSB
  ctor: function(color, cb, callee) {
    this._super("#hand/dot.png")
    this._cb = cb
    this._callee = callee
    this.setColor(color)
    // this.scale = 0.10

    this._listener = cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function (touch, event) {
            var target = event.getCurrentTarget()
            var locationInNode = target.convertTouchToNodeSpace(touch)
            var targetSize = target.getContentSize()
            var rect = cc.rect(0, 0, targetSize.width, targetSize.height)

            if (cc.rectContainsPoint(rect, locationInNode)) {
              if(target._cb && target._callee) {
                target._cb.call(target._callee, touch, event)
              }
              return true
            }
        },
        onTouchMoved: function(touch, event) {
          var target = event.getCurrentTarget()
          if(target._cb && target._callee) {
            target._cb.call(target._callee, touch, event)
          }          
        },
        onTouchEnded: function(touch, event) {
          var target = event.getCurrentTarget()
          if(target._cb && target._callee) {
            target._cb.call(target._callee, touch, event)
          }
        }
    })
    cc.eventManager.addListener(this._listener, this)
  },
  setColor: function(color) {
    cc.Sprite.prototype.setColor.call(this, color);
    this._dotColor = color
  }
})

xc.DotNum = cc.Node.extend({
  _num: null,
  _cb: null,
  _callee: null,
  _dotNode: null,
  ctor: function(num, length, cb, callee) {
    this._super()
    this._num = num
    this._cb = cb
    this._callee = callee
    var whiteboard = new cc.Sprite(xc.DotsLayer.res.whiteboard_png)
    whiteboard.setScale(length * 2 / xc.ConnectTheDotsLayer.WHITEBOARD_HEIGHT)
    this.addChild(whiteboard)
    this._dotNode = new cc.Node()
    this.addChild(this._dotNode)
    switch (num) {
      case 1:
        this._dotNode.addChild(new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this))
        break
      case 2:
        var dot = new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this)
        dot.setPositionY(-length / 2)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this)
        dot.setPositionY(length / 2)
        this._dotNode.addChild(dot)
        break
      case 3:
        var dot = new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this)
        dot.setPositionY(length / 2)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this)
        dot.setPosition(-length / 2, -length / 2)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this)
        dot.setPosition(length / 2, -length / 2)
        this._dotNode.addChild(dot)
        break    
      case 4:
        var dot = new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this)
        dot.setPosition(-length / 2, -length / 2)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this)
        dot.setPosition(length / 2, -length / 2)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this)
        dot.setPosition(-length / 2, length / 2)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this)
        dot.setPosition(length / 2, length / 2)
        this._dotNode.addChild(dot)
        break
      case 5:
        var dot = new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this)
        dot.setPosition(-length / 2, -length / 2)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this)
        dot.setPosition(length / 2, -length / 2)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this)
        dot.setPosition(-length / 2, length / 2)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this)
        dot.setPosition(length / 2, length / 2)
        this._dotNode.addChild(dot)
        break
      case 6:
        var dot = new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this)
        dot.setPosition(-length * 3 / 4, -length / 2)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this)
        dot.setPosition(0, -length / 2)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this)
        dot.setPosition(length * 3 / 4, -length / 2)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this)
        dot.setPosition(-length * 3 / 4, length / 2)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this)
        dot.setPosition(0, length / 2)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this)
        dot.setPosition(length * 3 / 4, length / 2)
        this._dotNode.addChild(dot)
        break
      case 7:
        var dot = new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this)
        dot.setPosition(-length * 3 / 4, -length / 2)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this)
        dot.setPosition(0, -length / 2)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this)
        dot.setPosition(length * 3 / 4, -length / 2)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this)
        dot.setPosition(-length * 3 / 4, length / 2)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this)
        dot.setPosition(0, length / 2)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this)
        dot.setPosition(length * 3 / 4, length / 2)
        this._dotNode.addChild(dot)
        break
      case 8:
        var dot = new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this)
        dot.setPosition(-length * 3 / 4, -length / 2)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this)
        dot.setPosition(-length / 4, -length / 2)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this)
        dot.setPosition(length / 4, -length / 2)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this)
        dot.setPosition(length * 3 / 4, -length / 2)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this)
        dot.setPosition(-length * 3 / 4, length / 2)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this)
        dot.setPosition(-length / 4, length / 2)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this)
        dot.setPosition(length / 4, length / 2)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this)
        dot.setPosition(length * 3 / 4, length / 2)
        this._dotNode.addChild(dot)
        break
      case 9:
        var dot = new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this)
        dot.setPosition(-length / 2, -length / 2)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this)
        dot.setPosition(0, -length / 2)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this)
        dot.setPosition(length / 2, -length / 2)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this)
        dot.setPosition(-length / 2, 0)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this)
        dot.setPosition(0, 0)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this)
        dot.setPosition(length / 2, 0)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this)
        dot.setPosition(-length / 2, length / 2)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this)
        dot.setPosition(0, length / 2)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this)
        dot.setPosition(length / 2, length / 2)
        this._dotNode.addChild(dot)
        break
      case 10:
        var dot = new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this)
        dot.setPosition(-length / 2, -length / 2)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this)
        dot.setPosition(0, -length / 2)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this)
        dot.setPosition(length / 2, -length / 2)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this)
        dot.setPosition(-length * 3 / 4, 0)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this)
        dot.setPosition(-length / 4, 0)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this)
        dot.setPosition(length / 4, 0)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this)
        dot.setPosition(length * 3 / 4, 0)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this)
        dot.setPosition(-length / 2, length / 2)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this)
        dot.setPosition(0, length / 2)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(56, 165, 212), this.dotTouched, this)
        dot.setPosition(length / 2, length / 2)
        this._dotNode.addChild(dot)
        break
     default:
        break
    }
  },
  dotTouched: function(touch, event) {
    if(event.getEventCode() == cc.EventTouch.EventCode.BEGAN) {
      var dot = event.getCurrentTarget()
      if(!dot._touched) {
        dot._touched = true
        dot.setColor(cc.color(181, 214, 47))
      }
      var allChildren = this._dotNode.getChildren()
      allTouched = true
      pressedNumber = 0
      for (var i = 0; i < allChildren.length; i++) {
        if(!allChildren[i]._touched) {
          allTouched = false
        } else {
          pressedNumber++
        }
      }
      var menuContext = this.getParent().getParent().menuContext
      if(!menuContext) {
        menuContext = this.getParent().getParent().getParent().menuContext
      }
      if(menuContext) {
        menuContext.pronounceWord(xc.DotsLayer.numberToString[pressedNumber])
      }
      if(allTouched) {
        this.enableTouch(false)
        if(this._cb && this._callee) {
          this._cb.call(this._callee, this)
        }
      }
    }
  },
  enableTouch: function(enable) {
    var allChildren = this._dotNode.getChildren()
    for (var i = 0; i < allChildren.length; i++) {
      allChildren[i]._listener.setEnabled(enable)
    }  
  }
})

xc.DotsQuizLayer = cc.Node.extend({
  _buttons: null,
  _dotNum: null,
  _numButtons: 0,
  _buttonLength: 0,
  _score: 0,
  _level: 1,
  _tries: 0,
  _startNum: 1,
  _endNum: 1,
  _help: null,
  ctor: function(level) {
    this._super()
    this._level = level
    this._numButtons = Math.min(level, 5)
    this._buttonLength = cc.director.getVisibleSize().width / Math.max(this._numButtons, 5)
    this._buttons = new cc.Node()
    this._buttons.setPosition((5-this._numButtons) / 2 * this._buttonLength, 0)
    this.addChild(this._buttons)
    if(this._level == 11) {
      this._endNum = 5
      this._startNum = 0
    } else if(this._level == 12) {
      this._endNum = 10
      this._startNum = 5    
    } else {
      this._endNum = Math.min(10, this._level)
      this._startNum = Math.max(0, this._endNum - 5)
    }
    var buttonColors = [
      cc.color(255, 204, 102),
      cc.color(102, 102, 205),
      cc.color(102, 255, 102),
      cc.color(128, 0, 255),
      cc.color(121, 61, 28)
    ]    
    for (var i = 0; i < this._numButtons; i++) {
      var background = new cc.Sprite(xc.DotsLayer.res.whiteboard_png)
      background.setScale(cc.director.getVisibleSize().width / (5 * xc.ConnectTheDotsLayer.WHITEBOARD_WIDTH))
      background.setPosition(this._buttonLength * i + this._buttonLength / 2, this._buttonLength / 2)
      background.setColor(buttonColors[i])
      this._buttons.addChild(background)
      var button = new ccui.Button(xc.DotsLayer.fingerRep[this._startNum + i + 1], "", "", ccui.Widget.PLIST_TEXTURE)
      button.setPosition(this._buttonLength * i + this._buttonLength / 2, this._buttonLength / 2)
      button.setName((this._startNum + i + 1).toString())
      button.setScale(0.4)
      this._buttons.addChild(button)
      button.addTouchEventListener(this.buttonPressed, this)
    }
  },
  showDotNum: function() {
    var num = getRandomInt(this._startNum + 1, this._endNum + 1)
    if(++this._tries > this._numButtons * 2) {
      this.getParent().getParent().menuContext.showScore()
    } else {
      this._dotNum = new xc.DotNum(num, 400)
      this.addChild(this._dotNum)
      this._dotNum.setPosition(1280, 2400)
      var dropAction = new cc.MoveTo(0.5, cc.p(1280, 1200))
      dropAction.easing(cc.easeBackOut())
      var callFunc = new cc.CallFunc(function() {
        this._buttons.setOpacity(256)
        if(this._level == 1 && this._tries == 1) {
          this._help = new xc.HelpLayer(cc.rect(1280, this._buttonLength / 2, this._buttonLength, this._buttonLength), cc.rect(1280, 1200, 600, 600))
          this.addChild(this._help)
          this._help.click(cc.p(1280, this._buttonLength / 2))
        }
      }, this)
      var seq = new cc.Sequence(dropAction, callFunc)
      this._dotNum.runAction(seq)
    }
  },
  buttonPressed: function(sender, type) {
    switch (type) {
      case ccui.Widget.TOUCH_BEGAN:
        break
      case ccui.Widget.TOUCH_ENDED:
        if(this._dotNum.getNumberOfRunningActions() <= 0) {
          this.getParent().getParent().menuContext.pronounceWord(xc.DotsLayer.numberToString[sender.getName()])
          if(sender.getName() == this._dotNum._num.toString()) {
            if(this._help) {
              this.removeChild(this._help)
              this._help = null
            }
            this.getParent().getParent().menuContext.addPoints(1)
            var dropAction = new cc.MoveTo(0.5, cc.p(1280, 2400))
            dropAction.easing(cc.easeBackIn())
            var delay = new cc.DelayTime(1)          
            var callFunc = new cc.CallFunc(function() {
              this.removeChild(this._dotNum)
              this._buttons.setOpacity(128)
              this.showDotNum()
            }, this)
            var seq = new cc.Sequence(dropAction, delay, callFunc)
            this._dotNum.runAction(seq)
          } else {
            this.getParent().getParent().menuContext.addPoints(-1)
            var action0 = new cc.MoveBy(0.05, cc.p(-20, 0))
            var action1 = new cc.MoveBy(0.1, cc.p(40, 0))
            var action2 = new cc.MoveBy(0.05, cc.p(-20, 0))
            var seq = new cc.Sequence(action0, action1, action2)
            var rep = new cc.Repeat(seq, 4)
            this._dotNum.runAction(rep)
          }
        }
        break
    }
  }
})

xc.DotsLayer.res = {
  hand_plist: xc.path + "maths/hand.plist",
  hand_png: xc.path + "maths/hand.png",
  graywindow_png: xc.path + "help/graywindow.png",
  whiteboard_png: xc.path + "help/whiteboard.png",
  next_png: xc.path + "maths/next.png"
}

xc.DotsLayer.fingerRep = {
  1: "hand/one.png",
  2: "hand/two.png",
  3: "hand/three.png",
  4: "hand/four.png",
  5: "hand/five.png",
  6: "hand/six.png",  
  7: "hand/seven.png",  
  8: "hand/eight.png",  
  9: "hand/nine.png",
  10: "hand/ten.png"
}

xc.DotsLayer.numberToString = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",  
  7: "seven",  
  8: "eight",  
  9: "nine",
  10: "ten"  
}

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}