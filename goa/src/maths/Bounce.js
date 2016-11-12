/// <reference path="../cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />

var xc = xc || {}

xc.BounceLayer = cc.Node.extend({
  _scroll: null,
  _startNum: 0,
  _endNum: 0,
  _sum: 0,
  _begin: 0,
  _choices: [],
  _holders: [],
  ctor: function(args) {
    this._super()
    this.setupLayer()
  },
  setupLayer: function() {
    this._scroll = new ccui.ScrollView()
    this.addChild(this._scroll)
    this._scroll.setContentSize(cc.director.getVisibleSize())
    this._scroll.setDirection(ccui.ScrollView.DIR_HORIZONTAL)
    var startNum = 0
    var endNum = 20
    this._scroll.setInnerContainerSize(cc.size(xc.BounceLayer.NUMBER_WIDTH * (endNum - startNum + 1), cc.director.getVisibleSize().height))
    for(var i = startNum; i <= endNum; i++) {
      var sprite = new cc.Sprite(xc.BounceLayer.res.dot_png)
      sprite.setPosition((i - startNum + 0.5) * xc.BounceLayer.NUMBER_WIDTH, 800)
      this._scroll.addChild(sprite)
      this._holders.push(sprite)
    }
    this._choices = [3, 6, 9, 10]
    this.setupChoices()
  },
  setupChoices: function() {
    var screenWidth = cc.director.getVisibleSize().width
    for(var i = 0; i < this._choices.length; i++) {
      var bounceChoice = new xc.BounceChoice(this._choices[i], cc.p(screenWidth - (this._choices.length - i) * (xc.BounceLayer.CHOICE_WIDTH + xc.BounceLayer.CHOICE_PADDING), 400))
      this.addChild(bounceChoice)
    }
  }
})

xc.BounceChoice = cc.Node.extend({
  _originalPosition: null,
  _number: 0,
  _holderNum: -1,
  _listener: null,
  _locationInNode: null,
  _positionAtTouch: null,
  _dullSprite: null,
  _brightSprite: null,
  ctor: function(number, position) {
    this._super()
    this._originalPosition = position
    this._number = number
    this._dullSprite = new cc.Sprite("#hand/one.png")
    this._dullSprite.setPosition(position)
    var text = new cc.LabelTTF(number.toString(), "Arial", 128)
    this._dullSprite.addChild(text)
    this._dullSprite.setOpacity(50)
    this.addChild(this._dullSprite)
    this._brightSprite = new cc.Sprite("#hand/one.png")
    this._brightSprite.setPosition(position)
    var text = new cc.LabelTTF(number.toString(), "Arial", 128)
    this._brightSprite.addChild(text)
    this.addChild(this._brightSprite)
    
    this._listener = cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function (touch, event) {
          var target = event.getCurrentTarget()
          var locationInNode = target.convertTouchToNodeSpace(touch)
          var targetSize = target._brightSprite.getContentSize()
          var rect = cc.rect(target._brightSprite.x - targetSize.width / 2, target._brightSprite.y - targetSize.height / 2, targetSize.width, targetSize.height)
          if (cc.rectContainsPoint(rect, locationInNode)) {
            target._locationInNode = locationInNode
            target._positionAtTouch = target._brightSprite.getPosition()
            cc.log(locationInNode)
            return true
          }
          return false
        },
        onTouchMoved: function(touch, event) {
          var target = event.getCurrentTarget()
          var locationInNode = target.convertTouchToNodeSpace(touch)
          target._brightSprite.setPosition(locationInNode.x + target._positionAtTouch.x - target._locationInNode.x, locationInNode.y + target._positionAtTouch.y - target._locationInNode.y)          
        },
        onTouchEnded: function(touch, event) {
          var target = event.getCurrentTarget()
          target._locationInNode = null
          target._positionAtTouch = null
          for(var i = 0; i < target.getParent()._holders.length; i++) {
            var holder = target.getParent()._holders[i]
            var holderRect = cc.rect(holder.x, holder.y, holder.getContentSize().width, holder.getContentSize().height)
            var targetRect = cc.rect(target._brightSprite.x, target._brightSprite.y, target._brightSprite.getContentSize().width, target._brightSprite.getContentSize().height)
            if(cc.rectIntersectsRect(holderRect, targetRect)) {
              target._holderNum = i
              var moveTo = new cc.MoveTo(0.25, holder.getPosition())
              target._brightSprite.runAction(moveTo)
              return
            }
          }
          target._holderNum = -1
          var moveTo = new cc.MoveTo(1, target._originalPosition)
          target._brightSprite.runAction(moveTo)
        }
    })
    cc.eventManager.addListener(this._listener, this)    
  }
})

xc.BounceLayer.NUMBER_WIDTH = 224
xc.BounceLayer.CHOICE_WIDTH = 150
xc.BounceLayer.CHOICE_PADDING = 200

xc.BounceLayer.res = {
  hand_plist: xc.path + "maths/hand.plist",
  hand_png: xc.path + "maths/hand.png",
  dot_png: xc.path + "maths/dot.png",
  graywindow_png: xc.path + "help/graywindow.png",
  whiteboard_png: xc.path + "help/whiteboard.png"
}
