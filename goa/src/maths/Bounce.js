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
  _bounceDrop: null,
  _bounceBall: null,
  _listener: null,
  ctor: function(args) {
    this._super()
    this.setupLayer(0, 20, 10, 5, [3, -6, 8, 10])
  },
  setupLayer: function(startNum, endNum, sum, begin, choices) {
    this._startNum = startNum
    this._endNum = endNum
    this._sum = sum
    this._begin = begin
    this._choices = choices
    this._scroll = new ccui.ScrollView()
    this.addChild(this._scroll)
    this._scroll.setContentSize(cc.director.getVisibleSize())
    this._scroll.setDirection(ccui.ScrollView.DIR_HORIZONTAL)
    this._scroll.setInnerContainerSize(cc.size(xc.BounceLayer.NUMBER_WIDTH * (endNum - startNum + 1), cc.director.getVisibleSize().height))
    for(var i = startNum; i <= endNum; i++) {
      var sprite = new xc.BounceHolder(xc.BounceLayer.res.dot_png, i)
      sprite.setPosition((i - startNum + 0.5) * xc.BounceLayer.NUMBER_WIDTH, 800)
      this._scroll.addChild(sprite)
      this._holders.push(sprite)
    }
    this._bounceDrop = new xc.BounceDrop(this._begin, startNum)
    this.addChild(this._bounceDrop)
    this._bounceBall = new xc.BounceBall()
    this._bounceBall.setPosition(this._bounceDrop.getPosition())
    this.addChild(this._bounceBall)
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

xc.BounceDrop = cc.Node.extend({
  _posNum: 0,
  ctor: function(posNum, startNum) {
    this._super()
    this._posNum = posNum
    this.setPosition((posNum - startNum + 0.5) * xc.BounceLayer.NUMBER_WIDTH, 1500)
    var img = new cc.Sprite("#hand/two.png")
    this.addChild(img)
  }
})

xc.BounceBall = cc.Sprite.extend({
  _animating: false,
  ctor: function() {
    this._super(xc.BounceLayer.res.dot_png)
    this._listener = cc.EventListener.create({
      event: cc.EventListener.TOUCH_ONE_BY_ONE,
      swallowTouches: true,
      onTouchBegan: function (touch, event) {
        var target = event.getCurrentTarget()
        if(!target._animating) {
          var locationInNode = target.getParent().convertTouchToNodeSpace(touch)
          var targetSize = target.getContentSize()
          var rect = cc.rect(target.x - targetSize.width / 2, target.y - targetSize.height / 2, targetSize.width, targetSize.height)
          if (cc.rectContainsPoint(rect, locationInNode)) {
            return true
          }
        }
        return false
      },
      onTouchEnded: function(touch, event) {
        var target = event.getCurrentTarget()
        if(!target._animating) {
          target._animating = true
          var posNum = target.getParent()._bounceDrop._posNum
          var holder = target.getParent()._holders[posNum]
          var pos = holder.getPosition()
          var moveTo = new cc.MoveTo(1, pos)
          var actionArray = [moveTo]
          while(holder._choice) {
            posNum += holder._choice._number
            var nextholder = target.getParent()._holders[posNum]
            var bezier = new cc.BezierTo(1, [holder.getPosition(), cc.p((nextholder.getPosition().x + holder.getPosition().x) / 2, holder.getPosition().y + 900), nextholder.getPosition()])
            actionArray.push(bezier)
            holder = nextholder
          }
          if(holder._num == target.getParent()._sum) {

          }
          var seq = new cc.Sequence(actionArray)
          target.runAction(seq)
        }
      }
    })
    cc.eventManager.addListener(this._listener, this)
  }
})

xc.BounceHolder = cc.Sprite.extend({
  _choice: null,
  _num: -1,
  ctor: function(texture, num) {
    this._super(texture)
    this._num = num
  }
})

xc.BounceChoice = cc.Node.extend({
  _number: 0,
  _holder: null,
  _listener: null,
  _locationInNode: null,
  _positionAtTouch: null,
  _dullSprite: null,
  _brightSprite: null,
  ctor: function(number, position) {
    this._super()
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
          var locationInNode = target._brightSprite.getParent().convertTouchToNodeSpace(touch)
          var targetSize = target._brightSprite.getContentSize()
          var rect = cc.rect(target._brightSprite.x - targetSize.width / 2, target._brightSprite.y - targetSize.height / 2, targetSize.width, targetSize.height)
          if (cc.rectContainsPoint(rect, locationInNode)) {
            target._locationInNode = locationInNode
            target._positionAtTouch = target._brightSprite.getPosition()
            cc.log(locationInNode)
            if(target._holder) {
              var pos = target._brightSprite.getParent().convertToWorldSpace(target._brightSprite.getPosition())
              target._brightSprite.removeFromParent(false)
              target.addChild(target._brightSprite)
              target._brightSprite.setPosition(pos)
              target._holder._choice = null
              target._holder = null
            }
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
            if(cc.rectIntersectsRect(holderRect, targetRect) && holder._choice == null) {
              target._holder = holder
              holder._choice = target
              target._brightSprite.removeFromParent(false)
              holder.addChild(target._brightSprite)
              target._brightSprite.setPosition(holder.convertToNodeSpace(target._brightSprite.getPosition()))
              var moveTo = new cc.MoveTo(0.25, cc.p(0, 0))
              target._brightSprite.runAction(moveTo)
              return
            }
          }
          target._holder = null
          holder._choice = null
          var moveTo = new cc.MoveTo(1, target._dullSprite.getPosition())
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
