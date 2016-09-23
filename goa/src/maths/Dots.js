/// <reference path="../cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />

var xc = xc || {}

xc.DotsLayer = cc.LayerColor.extend({
  _touched: false,
  _currentNumber: 1,
  _number: null,
  _hand: null,
  ctor: function() {
    this._super(cc.color(128, 128, 128), cc.director.getVisibleSize().width, cc.director.getVisibleSize().height)
    cc.spriteFrameCache.addSpriteFrames(xc.DotsLayer.res.hand_plist)
  },
  onEnterTransitionDidFinish: function() {
    this.showNumber()
  },
  showNumber: function() {
    this._number = new xc.DotNum(this._currentNumber, 400)
    this._number.setPosition(1280, 900)
    this.addChild(this._number)    
  },
  showFinger: function(hand) {
    this._hand = hand
    hand.setPosition(1280, 256)
    this.addChild(hand)

    var delay = new cc.DelayTime(1)
    var callFunc = new cc.CallFunc(function() {
      this.removeChild(this._number)
      this.removeChild(this._hand)
      this._currentNumber++
      this.showNumber()
    }, this)
    var seq = new cc.Sequence(delay, callFunc)
    this.runAction(seq)
  }
})

xc.Dot = cc.Sprite.extend({
  ctor: function(color) {
    this._super("#hand/dot.png")
    this.setColor(color)
    this.scale = 0.25

    var listener = cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function (touch, event) {
            var target = event.getCurrentTarget()
            var locationInNode = target.convertTouchToNodeSpace(touch)
            var targetSize = target.getContentSize()
            var rect = cc.rect(0, 0, targetSize.width, targetSize.height)

            if (cc.rectContainsPoint(rect, locationInNode)) {
              cc.log("Touched")
              target.parent.dotTouched(target)
              return true
            }
        }
    })
    cc.eventManager.addListener(listener, this)
  }
})

xc.DotNum = cc.Node.extend({
  num: null,
  ctor: function(num, length) {
    this._super()
    this.num = num
    switch (num) {
      case 1:
        this.addChild(new xc.Dot(cc.color(255, 0, 0)))
        break
      case 2:
        var dot = new xc.Dot(cc.color(255, 0, 0))
        dot.setPositionY(-length / 2)
        this.addChild(dot)
        dot = new xc.Dot(cc.color(255, 0, 0))
        dot.setPositionY(length / 2)
        this.addChild(dot)
        break
      case 3:
        var dot = new xc.Dot(cc.color(255, 0, 0))
        dot.setPositionY(length / 2)
        this.addChild(dot)
        dot = new xc.Dot(cc.color(255, 0, 0))
        dot.setPosition(-length / 2, -length / 2)
        this.addChild(dot)
        dot = new xc.Dot(cc.color(255, 0, 0))
        dot.setPosition(length / 2, -length / 2)
        this.addChild(dot)
        break    
      case 4:
        var dot = new xc.Dot(cc.color(255, 0, 0))
        dot.setPosition(-length / 2, -length / 2)
        this.addChild(dot)
        dot = new xc.Dot(cc.color(255, 0, 0))
        dot.setPosition(length / 2, -length / 2)
        this.addChild(dot)
        dot = new xc.Dot(cc.color(255, 0, 0))
        dot.setPosition(-length / 2, length / 2)
        this.addChild(dot)
        dot = new xc.Dot(cc.color(255, 0, 0))
        dot.setPosition(length / 2, length / 2)
        this.addChild(dot)
        break
      case 5:
        var dot = new xc.Dot(cc.color(255, 0, 0))
        this.addChild(dot)
        dot = new xc.Dot(cc.color(255, 0, 0))
        dot.setPosition(-length / 2, -length / 2)
        this.addChild(dot)
        dot = new xc.Dot(cc.color(255, 0, 0))
        dot.setPosition(length / 2, -length / 2)
        this.addChild(dot)
        dot = new xc.Dot(cc.color(255, 0, 0))
        dot.setPosition(-length / 2, length / 2)
        this.addChild(dot)
        dot = new xc.Dot(cc.color(255, 0, 0))
        dot.setPosition(length / 2, length / 2)
        this.addChild(dot)
        break
      default:
        break;
    }
  },
  fingerRep: function() {
    switch (this.num) {
      case 1:
        return new cc.Sprite("#hand/one.png")
      case 2:
        return new cc.Sprite("#hand/two.png")
      case 3:
        return new cc.Sprite("#hand/three.png")
      case 4:
        return new cc.Sprite("#hand/four.png")
      case 5:
        return new cc.Sprite("#hand/five.png")
      default:
        break;
    }
    
  },
  dotTouched: function(dot) {
    if(!dot._touched) {
      dot._touched = true
    }
    var allChildren = this.getChildren()
    allTouched = true
    for (var i = 0; i < allChildren.length; i++) {
      if(!allChildren[i]._touched) {
        allTouched = false
      }
    }
    if(allTouched) {
      this.parent.showFinger(this.fingerRep())
    }
  }
})

xc.DotsLayer.res = {
  hand_plist: xc.path + "maths/hand.plist",
  hand_png: xc.path + "maths/hand.png",
  dot_png: xc.path + "maths/dot.png"
}