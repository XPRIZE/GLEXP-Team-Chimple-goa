/// <reference path="../cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />

var xc = xc || {}

xc.DotsLayer = cc.LayerColor.extend({
  _currentNumber: 1,
  _number: null,
  _hand: null,
  _nextButton: null,
  ctor: function() {
    this._super(cc.color(248, 18, 18), cc.director.getVisibleSize().width, cc.director.getVisibleSize().height)
    cc.spriteFrameCache.addSpriteFrames(xc.DotsLayer.res.hand_plist)
    cc.spriteFrameCache.addSpriteFrames(xc.DotsLayer.res.thumbnails_plist)
  },
  onEnterTransitionDidFinish: function() {
    this._level = this.getParent().menuContext.getCurrentLevel()
    if(this._level == 1) {
      this.showNumber()
    } else {
      var parent = this.getParent()
      this.removeFromParent(true)
      var quizLayer = new xc.DotsQuizLayer()
      parent.addChild(quizLayer)
    }
  },
  showNumber: function() {
    this._number = new xc.DotNum(this._currentNumber, 400, this.showFinger, this)
    this._number.setPosition(1280, 2400)
    this.addChild(this._number)
    var dropAction = new cc.MoveTo(0.5, cc.p(1280, 1200))
    dropAction.easing(cc.easeBackOut())
    this._number.runAction(dropAction)
    
  },
  showFinger: function(dotNum) {
    this._hand = new cc.Sprite("#" + xc.DotsLayer.fingerRep[dotNum._num])
    this._hand.setPosition(1280, -256)
    this.addChild(this._hand)
    var dropAction = new cc.MoveTo(0.5, cc.p(1280, 256))
    dropAction.easing(cc.easeBackOut())

    var delay = new cc.DelayTime(1)
    var callFunc = new cc.CallFunc(function() {
      this._nextButton = new ccui.Button("icons/right.png", "icons/right_onclick.png", "icons/right_onclick.png", ccui.Widget.PLIST_TEXTURE)
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
  },
  showNext: function(sender, type) {
    this.removeChild(this._number)
    this.removeChild(this._hand)
    this.removeChild(this._nextButton)
    this._currentNumber++
    if(this._currentNumber <= 5) {
      this.showNumber()
    } else {
      var parent = this.getParent()
      this.removeFromParent(true)
      var quizLayer = new xc.DotsQuizLayer()
      parent.addChild(quizLayer)
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
    this.scale = 0.10

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
        this._dotNode.addChild(new xc.Dot(cc.color(255, 0, 0), this.dotTouched, this))
        break
      case 2:
        var dot = new xc.Dot(cc.color(255, 0, 0), this.dotTouched, this)
        dot.setPositionY(-length / 2)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(255, 0, 0), this.dotTouched, this)
        dot.setPositionY(length / 2)
        this._dotNode.addChild(dot)
        break
      case 3:
        var dot = new xc.Dot(cc.color(255, 0, 0), this.dotTouched, this)
        dot.setPositionY(length / 2)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(255, 0, 0), this.dotTouched, this)
        dot.setPosition(-length / 2, -length / 2)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(255, 0, 0), this.dotTouched, this)
        dot.setPosition(length / 2, -length / 2)
        this._dotNode.addChild(dot)
        break    
      case 4:
        var dot = new xc.Dot(cc.color(255, 0, 0), this.dotTouched, this)
        dot.setPosition(-length / 2, -length / 2)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(255, 0, 0), this.dotTouched, this)
        dot.setPosition(length / 2, -length / 2)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(255, 0, 0), this.dotTouched, this)
        dot.setPosition(-length / 2, length / 2)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(255, 0, 0), this.dotTouched, this)
        dot.setPosition(length / 2, length / 2)
        this._dotNode.addChild(dot)
        break
      case 5:
        var dot = new xc.Dot(cc.color(255, 0, 0), this.dotTouched, this)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(255, 0, 0), this.dotTouched, this)
        dot.setPosition(-length / 2, -length / 2)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(255, 0, 0), this.dotTouched, this)
        dot.setPosition(length / 2, -length / 2)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(255, 0, 0), this.dotTouched, this)
        dot.setPosition(-length / 2, length / 2)
        this._dotNode.addChild(dot)
        dot = new xc.Dot(cc.color(255, 0, 0), this.dotTouched, this)
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
        dot.setColor(cc.color(0, 255, 0))
      }
      var allChildren = this._dotNode.getChildren()
      allTouched = true
      for (var i = 0; i < allChildren.length; i++) {
        if(!allChildren[i]._touched) {
          allTouched = false
        }
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

xc.DotsQuizLayer = cc.LayerColor.extend({
  _buttons: null,
  _dotNum: null,
  _numButtons: 5,
  _buttonLength: 0,
  ctor: function() {
    this._super(cc.color(248, 128, 128), cc.director.getVisibleSize().width, cc.director.getVisibleSize().height)
    this._buttonLength = cc.director.getVisibleSize().width / this._numButtons
    this._buttons = new cc.Node()
    this.addChild(this._buttons)
    for (var i = 0; i < this._numButtons; i++) {
      var button = new ccui.Button(xc.DotsLayer.fingerRep[i+1], "", "", ccui.Widget.PLIST_TEXTURE)
      button.setPosition(this._buttonLength * i + this._buttonLength / 2, this._buttonLength / 2)
      button.setName((i+1).toString())
      this._buttons.addChild(button)
      button.addTouchEventListener(this.buttonPressed, this)
    }
    this.showDotNum(getRandomInt(1, 6))
  },
  showDotNum: function(num) {
    this._dotNum = new xc.DotNum(num, 400)
    this.addChild(this._dotNum)
    this._dotNum.setPosition(1280, 2400)
    var dropAction = new cc.MoveTo(0.5, cc.p(1280, 1200))
    dropAction.easing(cc.easeBackOut())
    var callFunc = new cc.CallFunc(function() {
      this._buttons.setOpacity(256)
    }, this)
    var seq = new cc.Sequence(dropAction, callFunc)
    this._dotNum.runAction(seq)
  },
  buttonPressed: function(sender, type) {
    switch (type) {
      case ccui.Widget.TOUCH_BEGAN:
        break
      case ccui.Widget.TOUCH_ENDED:
        if(this._dotNum.getNumberOfRunningActions() <= 0) {
          if(sender.getName() == this._dotNum._num.toString()) {
            var dropAction = new cc.MoveTo(0.5, cc.p(1280, 2400))
            dropAction.easing(cc.easeBackIn())
            var delay = new cc.DelayTime(1)          
            var callFunc = new cc.CallFunc(function() {
              this.removeChild(this._dotNum)
              this._buttons.setOpacity(128)
              this.showDotNum(getRandomInt(1, 6))
            }, this)
            var seq = new cc.Sequence(dropAction, delay, callFunc)
            this._dotNum.runAction(seq)
          } else {
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
  dot_png: xc.path + "maths/dot.png",
  graywindow_png: xc.path + "help/graywindow.png",
  whiteboard_png: xc.path + "help/whiteboard.png",
  thumbnails_plist: xc.path + "wikitaki/thumbnails.plist",
  thumbnails_png: xc.path + "wikitaki/thumbnails.png"
}

xc.DotsLayer.fingerRep = {
  1: "hand/one.png",
  2: "hand/two.png",
  3: "hand/three.png",
  4: "hand/four.png",
  5: "hand/five.png"  
}

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}