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
  _level: 1,
  ctor: function(args) {
    this._super()
    this.setupLayer(0, 20, 15, 5, [4, -2, 3, 10])
  },
  onEnterTransitionDidFinish: function() {
    this._level = this.getParent().menuContext.getCurrentLevel()
    if(this._level <= 5) {
      var startNum = 0
      var endNum = 10
      var begin = this._level
      var sum = getRandomInt(begin + 1, endNum)

    }
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
      var text = new cc.LabelTTF(i.toString(), "Arial", 128)
      sprite.addChild(text)
      this._scroll.addChild(sprite)
      this._holders.push(sprite)
    }
    this._bounceDrop = new xc.BounceDrop(this._begin, startNum)
    this._scroll.addChild(this._bounceDrop)
    this._bounceBall = new xc.BounceBall(this)
    this._bounceBall.setPosition(this._bounceDrop.getPosition())
    this._scroll.addChild(this._bounceBall)
    this.setupChoices()
    this._scroll.setTouchEnabled(false)
    this._scroll.scrollToPercentHorizontal((this._holders[sum - startNum].x + this._scroll.getContentSize().width / 2) * 100/ this._scroll.getInnerContainerSize().width, 1)
    var callFunc = new cc.CallFunc(function() {
      this._scroll.scrollToPercentHorizontal((this._holders[begin - startNum].x) * 100/ this._scroll.getInnerContainerSize().width, 1)
    }, this)
    var callFunc2 = new cc.CallFunc(function() {
      this._scroll.setTouchEnabled(true)
    }, this)      

    var seq = new cc.Sequence(new cc.DelayTime(2), callFunc, new cc.DelayTime(1), callFunc2)
    this.runAction(seq)
  },
  cleanLayer: function() {
    this.removeChild(this._scroll)
    this.removeChild(this._bounceBall)
    this.removeChild(this._bounceDrop)
    this._holders = []
    this._choices = []
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
  _layer: null,
  _follow: null,
  ctor: function(layer) {
    this._super(xc.BounceLayer.res.dot_png)
    this._layer = layer
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
          var posNum = target._layer._bounceDrop._posNum
          var components = [posNum]
          var holder = target._layer._holders[posNum]
          var pos = holder.getPosition()
          var moveTo = new cc.MoveTo(1, pos)
          target._follow = new cc.Follow(target, cc.rect(0, 0, target.getParent().getContentSize().width, target.getParent().getContentSize().height))
          target.getParent().runAction(target._follow)
          var actionArray = [moveTo]
          while(holder._choice) {
            posNum += holder._choice._number
            components.push(holder._choice._number)
            var nextholder = target._layer._holders[posNum]
            var bezier = new cc.BezierTo(1, [holder.getPosition(), cc.p((nextholder.getPosition().x + holder.getPosition().x) / 2, holder.getPosition().y + 900), nextholder.getPosition()])
            actionArray.push(bezier)
            holder = nextholder
          }
          if(holder._num == target._layer._sum) {
            var callFunc = new cc.CallFunc(function() {
              this._animating = false
              this.getParent().stopAction(this._follow)
              this._follow = null
              var additionDisplay = new xc.AdditionDisplay(components, this._layer._sum)
              this._layer.addChild(additionDisplay)
            }, target)
            actionArray.push(callFunc)
          } else {
            var moveTo = new cc.MoveTo(0.5, cc.p(holder.getPosition().x, -100))
            actionArray.push(moveTo)
            var callFunc = new cc.CallFunc(function() {
              this.setPosition(this._layer._bounceDrop.getPosition())
              this._animating = false
              this.getParent().stopAction(this._follow)
              this._follow = null
              this._layer._scroll.scrollToPercentHorizontal((this._layer._holders[this._layer._begin - this._layer._startNum].x) * 100/ this._layer._scroll.getInnerContainerSize().width, 1)
              
            }, target)
            actionArray.push(callFunc)
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
            var holderPos = holder.getParent().convertToWorldSpace(holder.getPosition())
            var holderRect = cc.rect(holderPos.x, holderPos.y, holder.getContentSize().width, holder.getContentSize().height)

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

xc.AdditionDisplay = cc.LayerColor.extend({
  ctor: function(components, sum) {
    this._super(cc.color(128, 128, 0), cc.director.getVisibleSize().width / 2, cc.director.getVisibleSize().height / 2)
    this.setPosition(cc.director.getVisibleSize().width / 4, cc.director.getVisibleSize().height / 4)
    var text = components[0]
    for(var i = 1; i < components.length; i++) {
      if(components[i] >= 0) {
        text = text + ' + ' + components[i].toString()
      } else {
        text = text + ' - ' + Math.abs(components[i]).toString()        
      }
    }
    text = text + ' = ' + sum
    var label = new cc.LabelTTF(text, "Arial", 128)
    label.color = new cc.Color(256, 0, 0)
    label.setPosition(cc.director.getVisibleSize().width / 4, cc.director.getVisibleSize().height / 4)
    this.addChild(label)
    this._listener = cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function (touch, event) {
          return true
        },
        onTouchEnded: function(touch, event) {
          var target = event.getCurrentTarget()
          var parent = target.getParent()
          parent.cleanLayer()
          target.removeFromParent()
          parent.setupLayer(0, 20, 10, 5, [4, -2, 3, 10])
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
