/// <reference path="../cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />

var xc = xc || {}

xc.DotsLayer = cc.LayerColor.extend({
  _currentNumber: 1,
  _number: null,
  _hand: null,
  _listener: null,
  ctor: function() {
    this._super(cc.color(248, 248, 248), cc.director.getVisibleSize().width, cc.director.getVisibleSize().height)
    cc.spriteFrameCache.addSpriteFrames(xc.DotsLayer.res.hand_plist)
    this._listener = cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function (touch, event) {
          var target = event.getCurrentTarget()
          if(target._hand != null) {
            target._listener.setEnabled(false)            
            target.removeChild(target._number)
            target.removeChild(target._hand)
            target._currentNumber++
            if(target._currentNumber <= 5) {
              target.showNumber()
            } else {
              var parent = target.getParent()
              target.removeFromParent(true)
              var quizLayer = new xc.DotsQuizLayer()
              parent.addChild(quizLayer)
            }
          }
        }
    })
    cc.eventManager.addListener(this._listener, this)
    this._listener.setEnabled(false)
    
  },
  onEnterTransitionDidFinish: function() {
    this.showNumber()
  },
  showNumber: function() {
    this._number = new xc.DotNum(this._currentNumber, 400, this.showFinger, this)
    this._number.setPosition(1280, 900)
    this.addChild(this._number)    
  },
  showFinger: function(dotNum) {
    this._hand = new cc.Sprite("#" + xc.DotsLayer.fingerRep[dotNum._num])
    this._hand.setPosition(1280, 256)
    this.addChild(this._hand)

    var delay = new cc.DelayTime(1)
    var callFunc = new cc.CallFunc(function() {
      this._listener.setEnabled(true)
    }, this)
    var seq = new cc.Sequence(delay, callFunc)
    this.runAction(seq)
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
  ctor: function(num, length, cb, callee) {
    this._super()
    this._num = num
    this._cb = cb
    this._callee = callee
    switch (num) {
      case 1:
        this.addChild(new xc.Dot(cc.color(255, 0, 0), this.dotTouched, this))
        break
      case 2:
        var dot = new xc.Dot(cc.color(255, 0, 0), this.dotTouched, this)
        dot.setPositionY(-length / 2)
        this.addChild(dot)
        dot = new xc.Dot(cc.color(255, 0, 0), this.dotTouched, this)
        dot.setPositionY(length / 2)
        this.addChild(dot)
        break
      case 3:
        var dot = new xc.Dot(cc.color(255, 0, 0), this.dotTouched, this)
        dot.setPositionY(length / 2)
        this.addChild(dot)
        dot = new xc.Dot(cc.color(255, 0, 0), this.dotTouched, this)
        dot.setPosition(-length / 2, -length / 2)
        this.addChild(dot)
        dot = new xc.Dot(cc.color(255, 0, 0), this.dotTouched, this)
        dot.setPosition(length / 2, -length / 2)
        this.addChild(dot)
        break    
      case 4:
        var dot = new xc.Dot(cc.color(255, 0, 0), this.dotTouched, this)
        dot.setPosition(-length / 2, -length / 2)
        this.addChild(dot)
        dot = new xc.Dot(cc.color(255, 0, 0), this.dotTouched, this)
        dot.setPosition(length / 2, -length / 2)
        this.addChild(dot)
        dot = new xc.Dot(cc.color(255, 0, 0), this.dotTouched, this)
        dot.setPosition(-length / 2, length / 2)
        this.addChild(dot)
        dot = new xc.Dot(cc.color(255, 0, 0), this.dotTouched, this)
        dot.setPosition(length / 2, length / 2)
        this.addChild(dot)
        break
      case 5:
        var dot = new xc.Dot(cc.color(255, 0, 0), this.dotTouched, this)
        this.addChild(dot)
        dot = new xc.Dot(cc.color(255, 0, 0), this.dotTouched, this)
        dot.setPosition(-length / 2, -length / 2)
        this.addChild(dot)
        dot = new xc.Dot(cc.color(255, 0, 0), this.dotTouched, this)
        dot.setPosition(length / 2, -length / 2)
        this.addChild(dot)
        dot = new xc.Dot(cc.color(255, 0, 0), this.dotTouched, this)
        dot.setPosition(-length / 2, length / 2)
        this.addChild(dot)
        dot = new xc.Dot(cc.color(255, 0, 0), this.dotTouched, this)
        dot.setPosition(length / 2, length / 2)
        this.addChild(dot)
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
      var allChildren = this.getChildren()
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
    var allChildren = this.getChildren()
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
    this._super(cc.color(248, 248, 248), cc.director.getVisibleSize().width, cc.director.getVisibleSize().height)
    this._buttonLength = cc.director.getVisibleSize().width / this._numButtons
    for (var i = 0; i < this._numButtons; i++) {
      var button = new ccui.Button(xc.DotsLayer.fingerRep[i+1], "", "", ccui.Widget.PLIST_TEXTURE)
      button.setPosition(this._buttonLength * i + this._buttonLength / 2, this._buttonLength / 2)
      button.setName((i+1).toString())
      this.addChild(button)
      button.addTouchEventListener(this.buttonPressed, this)
    }
    this.showDotNum(getRandomInt(1, 6))
  },
  showDotNum: function(num) {
    this._dotNum = new xc.DotNum(num, 400)
    this._dotNum.setPosition(1280, this._buttonLength + (cc.director.getVisibleSize().height - this._buttonLength) / 2)
    this.addChild(this._dotNum)
  },
  buttonPressed: function(sender, type) {
    switch (type) {
      case ccui.Widget.TOUCH_BEGAN:
        break
      case ccui.Widget.TOUCH_ENDED:
        if(sender.getName() == this._dotNum._num.toString()) {
          this.removeChild(this._dotNum)
          this.showDotNum(getRandomInt(1, 6))
        }
        break
    }
  }
})

xc.DotsLayer.res = {
  hand_plist: xc.path + "maths/hand.plist",
  hand_png: xc.path + "maths/hand.png",
  dot_png: xc.path + "maths/dot.png"
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