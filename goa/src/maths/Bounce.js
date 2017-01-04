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
  _backHolders: [],
  _correctChoices: [],
  _bounceChoices: [],
  _bounceDrop: null,
  _bounceBall: null,
  _listener: null,
  _level: 1,
  _tries: 0,
  _lessons: 0,
  _help: null,
  ctor: function(args) {
    this._super()
  },
  onEnterTransitionDidFinish: function() {
    this._choices = []
    this._holders = []
    this._backHolders = []
    this._bounceChoices = []
    this._level = this.getParent().menuContext.getCurrentLevel()
    this.getParent().menuContext.setMaxPoints(xc.BounceLayer.MAX_LESSONS)
    this.doLevel()
  },
  doLevel: function() {
    if(this._level <= 5) {
      var startNum = 0
      var endNum = 20
      if(this._level == 1) {
        endNum = 9
      }
      var begin = this._level
      var sum = getRandomInt(begin + 1, 10)
      if(getRandomInt(0, 2) > 0) {
        var choices = [sum - begin, getRandomInt(1, sum)]
        var correctChoices = [0]        
      } else {
        var choices = [getRandomInt(1, sum), sum - begin]
        var correctChoices = [1]
      }
      this.setupLayer(startNum, endNum, sum, begin, choices, correctChoices)
      if(this._level == 1 && this._lessons == 0) {
        var dullSprite = this._bounceChoices[this._correctChoices[0]]._dullSprite
        var dullSpriteRect = dullSprite.getBoundingBoxToWorld()
        dullSpriteRect.x = dullSpriteRect.x + dullSpriteRect.width / 2
        dullSpriteRect.y = dullSpriteRect.y + dullSpriteRect.height / 2
        var holder = this._holders[this._begin - this._startNum]
        var holderPos = holder.getParent().convertToWorldSpace(holder.getPosition())
        var holderRect = cc.rect(holderPos.x, holderPos.y, holder.width, holder.height)
        this._help = new xc.HelpLayer(dullSpriteRect, holderRect)
        this.addChild(this._help)
        this._help.clickAndDrag(this._bounceChoices[this._correctChoices[0]]._dullSprite.x, this._bounceChoices[this._correctChoices[0]]._dullSprite.y, holderPos.x, holderPos.y)
      }
    } else if(this._level <= 10) {
      var startNum = 0
      var endNum = 20
      var begin = getRandomInt(startNum, endNum - 5)
      var sum = getRandomInt(begin + 2, endNum)
      var firstChoice = getRandomInt(1, sum - begin)
      if(getRandomInt(0, 2) > 0) {
        var choices = [firstChoice, sum - begin - firstChoice, getRandomInt(1, sum)]
        var correctChoices = [0, 1]
      } else {
        var choices = [getRandomInt(1, sum), sum - begin - firstChoice, firstChoice]
        var correctChoices = [1, 2]        
      }
      this.setupLayer(startNum, endNum, sum, begin, choices, correctChoices)
    } else if(this._level <= 15) {
      var startNum = -10
      var endNum = 10
      var begin = getRandomInt(0, endNum - 5)
      var sum = getRandomInt(begin + 1, endNum - 3)
      var firstChoice = getRandomInt(sum - begin + 1, endNum - begin)
      if(getRandomInt(0, 2) > 0) {
        var choices = [firstChoice, sum - begin - firstChoice, getRandomInt(1, sum)]
        var correctChoices = [0, 1]
      } else {
        var choices = [sum - begin - firstChoice, getRandomInt(1, sum), firstChoice]
        var correctChoices = [0, 2]        
      }
      this.setupLayer(startNum, endNum, sum, begin, choices, correctChoices)
    } else if(this._level <= 20) {
      var startNum = -10
      var endNum = 20
      var begin = getRandomInt(0, endNum - 10)
      var sum = getRandomInt(begin + 2, endNum - 5)
      var firstChoice = getRandomInt(sum - begin + 1, endNum - begin)
      if(getRandomInt(0, 2) > 0) {
        var choices = [firstChoice, sum - begin - firstChoice, getRandomInt(1, sum)]
        var correctChoices = [0, 1]
      } else {
        var choices = [firstChoice, getRandomInt(1, sum), sum - begin - firstChoice]
        var correctChoices = [0, 2]        
      }
      this.setupLayer(startNum, endNum, sum, begin, choices, correctChoices)
    }

  },
  setupLayer: function(startNum, endNum, sum, begin, choices, correctChoices) {
    var bg = ccs.load(xc.BounceLayer.res.background_json, xc.path)
    this.addChild(bg.node)
    this._startNum = startNum
    this._endNum = endNum
    this._sum = sum
    this._begin = begin
    this._choices = choices
    this._correctChoices = correctChoices
    this._scroll = new ccui.ScrollView()
    this.addChild(this._scroll)
    this._scroll.setContentSize(cc.director.getVisibleSize())
    this._scroll.setDirection(ccui.ScrollView.DIR_HORIZONTAL)
    this._scroll.setInnerContainerSize(cc.size(xc.BounceLayer.NUMBER_WIDTH * (endNum - startNum + 1), cc.director.getVisibleSize().height))
    for(var i = startNum; i <= endNum; i++) {
      var sprite = new xc.BounceHolder(i)
      sprite.setPosition((i - startNum + 0.5) * xc.BounceLayer.NUMBER_WIDTH, xc.BounceLayer.HOLDER_Y)
      this._scroll.addChild(sprite, 1)
      this._holders.push(sprite)
      var backHolder = new cc.Sprite("#icecream/holder_1.png")
      backHolder.setPosition((i - startNum + 0.5) * xc.BounceLayer.NUMBER_WIDTH, xc.BounceLayer.HOLDER_Y + 85)
      this._scroll.addChild(backHolder, -10)
      this._backHolders.push(backHolder)
      sprite._backHolder = backHolder
    }
    var sumSprite = new cc.Sprite("#icecream/cone.png")
    sumSprite.setPosition((sum - startNum + 0.5) * xc.BounceLayer.NUMBER_WIDTH, xc.BounceLayer.HOLDER_Y + 100)
    this._scroll.addChild(sumSprite)
    this._bounceDrop = new xc.BounceDrop(this._begin, startNum)
    this._scroll.addChild(this._bounceDrop, -1)
    this._bounceBall = new xc.BounceBall(this)
    this._bounceBall.setPosition(this._bounceDrop.getPosition())
    this._scroll.addChild(this._bounceBall)
    this.setupChoices()
    this._scroll.setTouchEnabled(false)
    this._scroll.scrollToPercentHorizontal((this._holders[sum - startNum].getPosition().x + this._scroll.getContentSize().width / 2) * 100/ this._scroll.getInnerContainerSize().width, 1, true)
    var callFunc = new cc.CallFunc(function() {
      this._scroll.scrollToPercentHorizontal((this._holders[begin - startNum].getPosition().x) * 100/ this._scroll.getInnerContainerSize().width, 1, true)
    }, this)
    var callFunc2 = new cc.CallFunc(function() {
      this._scroll.setTouchEnabled(true)
    }, this)      
    var seq = new cc.Sequence(new cc.DelayTime(2), callFunc, new cc.DelayTime(1), callFunc2)
    this.runAction(seq)
  },
  cleanLayer: function() {
    this.removeAllChildren()
    this._holders = []
    this._choices = []
    this._bounceChoices = []
    this._backHolders = []
  },
  setupChoices: function() {
    var screenWidth = cc.director.getVisibleSize().width
    for(var i = 0; i < this._choices.length; i++) {
      var bounceChoice = new xc.BounceChoice(this._choices[i], cc.p(screenWidth - (this._choices.length - i) * (xc.BounceLayer.CHOICE_WIDTH + xc.BounceLayer.CHOICE_PADDING), 200))
      this.addChild(bounceChoice)
      this._bounceChoices.push(bounceChoice)
    }
  },
  showAnswer: function() {
    for(var i = 0; i < this._holders.length; i++) {
      if(this._holders[i]._choice) {
        this._holders[i]._choice.resetPosition()
      }
    }
    var callFunc = new cc.CallFunc(function() {    
      var choice = this._bounceChoices[this._correctChoices[0]]
      var holder = this._holders[this._begin - this._startNum]
      choice.addToHolder(holder)
    }, this)
    var animateCallFunc = new cc.CallFunc(function() {    
      this._bounceBall.animateBounce(true)
    }, this)
    var seq = new cc.Sequence(new cc.DelayTime(1), callFunc, new cc.DelayTime(0.25), animateCallFunc)
    this.runAction(seq)
  }
})

xc.BounceDrop = cc.Node.extend({
  _posNum: 0,
  ctor: function(posNum, startNum) {
    this._super()
    this._posNum = posNum
    this.setPosition((posNum - startNum + 0.5) * xc.BounceLayer.NUMBER_WIDTH, 1500)
    var img = new cc.Sprite("#icecream/machine.png")
    this.addChild(img)
  }
})

xc.BounceBall = cc.Sprite.extend({
  _animating: false,
  _layer: null,
  _follow: null,
  ctor: function(layer) {
    this._super("#icecream/icecream_1.png")
    this._layer = layer
    this._listener = cc.EventListener.create({
      event: cc.EventListener.TOUCH_ONE_BY_ONE,
      swallowTouches: true,
      onTouchBegan: function (touch, event) {
        var target = event.getCurrentTarget()
        if(!target._animating) {
          var locationInNode = target.getParent().convertTouchToNodeSpace(touch)
          var targetSize = target.getContentSize()
          var rect = cc.rect(target.getPosition().x - targetSize.width / 2, target.getPosition().y - targetSize.height / 2, targetSize.width, targetSize.height)
          if (cc.rectContainsPoint(rect, locationInNode)) {
            return true
          }
        }
        return false
      },
      onTouchEnded: function(touch, event) {
        var target = event.getCurrentTarget()
        if(target._layer._help) {
          target._layer.removeChild(target._layer._help)
          target._layer._help = null
        }
        target.animateBounce(false)
      }
    })
    cc.eventManager.addListener(this._listener, this)
  },
  animateBounce: function(automatic) {
    if(!this._animating) {
      this._animating = true
      var components = [this._layer._bounceDrop._posNum]
      var posNum = this._layer._bounceDrop._posNum - this._layer._startNum
      var holder = this._layer._holders[posNum]
      var pos = holder.getPosition()
      var scrollX = pos.x
      if(scrollX <= cc.director.getWinSize().width / 2) {
        scrollX = 0
      }
      pos.y = pos.y + holder.height / 2 + xc.BounceLayer.CUP_HEIGHT
      this._layer._scroll.scrollToPercentHorizontal(scrollX * 100/ this._layer._scroll.getInnerContainerSize().width, 1, true)
      var delayTime = new cc.DelayTime(1)
      var moveTo = new cc.MoveTo(0.5, pos)
      this._follow = new cc.Follow(this, cc.rect(0, 0, this.getParent().getContentSize().width, this.getParent().getContentSize().height))
      this.getParent().runAction(this._follow)
      var followCallFunc = new cc.CallFunc(function() {
        this._follow = new cc.Follow(this, cc.rect(0, 0, this.getParent().getContentSize().width, this.getParent().getContentSize().height))
        this.getParent().runAction(this._follow)
      }, this)
      var actionArray = [moveTo]
      // actionArray.push(followCallFunc)
      while(holder._choice) {
        var animCallFunc = new cc.CallFunc(function() {
          this._brightAction.gotoFrameAndPlay(0, false)
          cc.AudioEngine.getInstance().playEffect(xc.BounceLayer.res.drop_sound)
        }, holder._choice)
        actionArray.push(animCallFunc)
        posNum += holder._choice._number
        components.push(holder._choice._number)
        var holderPos = holder.getPosition()
        holderPos.y = holderPos.y + holder.height / 2 + xc.BounceLayer.CUP_HEIGHT
        var nextholder = this._layer._holders[posNum]
        var nextholderPos = nextholder.getPosition()
        nextholderPos.y = nextholderPos.y + holder.height / 2 + xc.BounceLayer.CUP_HEIGHT
        var bezier = new cc.BezierTo(1, [holderPos, cc.p((nextholderPos.x + holderPos.x) / 2, holderPos.y + 1600), nextholderPos])
        actionArray.push(bezier)
        holder = nextholder
      }
      if(holder._num == this._layer._sum) {
        var moveTo = new cc.MoveTo(0.2, cc.p(holder.getPosition().x, xc.BounceLayer.HOLDER_Y + xc.BounceLayer.CONE_HEIGHT))
        actionArray.push(moveTo)

        var callFunc = new cc.CallFunc(function() {
          cc.AudioEngine.getInstance().playEffect(xc.BounceLayer.res.success_sound)          
          this._animating = false
          this.getParent().stopAction(this._follow)
          this._follow = null
          this._layer._lessons++
          this._layer._tries = 0
          if(!automatic) {
            this._layer.getParent().menuContext.addPoints(1)
          }
          var additionDisplay = new xc.AdditionDisplay(components, this._layer._sum)
          this._layer.addChild(additionDisplay)
        }, this)
        actionArray.push(callFunc)
      } else {
        var moveTo = new cc.MoveTo(1, cc.p(holder.getPosition().x, -100))
        actionArray.push(moveTo)
        var callFunc = new cc.CallFunc(function() {
          cc.AudioEngine.getInstance().playEffect(xc.BounceLayer.res.error_sound)
          this.setPosition(this._layer._bounceDrop.getPosition())
          this._animating = false
          this.getParent().stopAction(this._follow)
          this._follow = null
          this._layer._scroll.scrollToPercentHorizontal((this._layer._holders[this._layer._begin - this._layer._startNum].x) * 100/ this._layer._scroll.getInnerContainerSize().width, 1, true)
          if(++this._layer._tries >= xc.BounceLayer.MAX_LESSONS) {
            this._layer.showAnswer()
          }
        }, this)
        actionArray.push(callFunc)
      }
      var seq = new cc.Sequence(actionArray)
      this.runAction(seq)
    }    
  }  
})

xc.BounceHolder = cc.Sprite.extend({
  _choice: null,
  _num: -1,
  _backHolder: null,
  ctor: function(num) {
    this._super("#icecream/holder_2.png")
    this._num = num
    var text = new cc.LabelTTF(num.toString(), "Arial", 128)
    text.setPosition(xc.BounceLayer.NUMBER_WIDTH / 2, xc.BounceLayer.TEXT_Y)
    text.setColor(cc.color(0, 0, 0))
    this.addChild(text)
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
  _brightAction: null,
  ctor: function(number, position) {
    this._super()
    this._number = number
    var dullHolder = ccs.load(xc.BounceLayer.res.cup_json, xc.path)
    this._dullSprite = dullHolder.node
    this._dullSprite.setPosition(position)
    var text = new cc.LabelTTF(number.toString(), "Arial", 128)
    text.setColor(cc.color(0, 0, 0))
    text.setPosition(0, xc.BounceLayer.TEXT_Y)
    this._dullSprite.addChild(text)
    this._dullSprite.setOpacity(50)
    this.addChild(this._dullSprite)
    var brightHolder = ccs.load(xc.BounceLayer.res.cup_json, xc.path)
    this._brightSprite = brightHolder.node
    this._brightAction = brightHolder.action
    this._brightSprite.runAction(this._brightAction)
    this._brightSprite.setPosition(position)
    var text = new cc.LabelTTF(number.toString(), "Arial", 128)
    text.setColor(cc.color(0, 0, 0))
    text.setPosition(0, xc.BounceLayer.TEXT_Y)
    this._brightSprite.addChild(text)
    this.addChild(this._brightSprite)
    
    this._listener = cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function (touch, event) {
          var target = event.getCurrentTarget()
          var rect = target._brightSprite.getBoundingBoxToWorld()
          if (cc.rectContainsPoint(rect, touch.getLocation())) {
            target._locationInNode = target._brightSprite.getParent().convertTouchToNodeSpace(touch)
            target._positionAtTouch = target._brightSprite.getPosition()
            if(target._holder) {
              target.shiftParent()
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
            var holderRect = holder.getBoundingBoxToWorld()
            var targetRect = target._brightSprite.getBoundingBoxToWorld()
            targetRect.x = targetRect.x + targetRect.width / 2
            targetRect.width = 20
            
            if(cc.rectIntersectsRect(holderRect, targetRect) && holder._choice == null) {
              if(target.getParent()._help) {
                target.getParent().removeChild(target.getParent()._help)
                target.getParent()._help = null
              }
              target.addToHolder(holder)
              return
            }
          }
          target.resetPosition()
        }
    })
    cc.eventManager.addListener(this._listener, this)    
  },
  addToHolder: function(holder) {
    this._holder = holder
    holder._choice = this
    var spritePos = this._brightSprite.getPosition()
    this._brightSprite.removeFromParent()
    var brightHolder = ccs.load(xc.BounceLayer.res.cup_json, xc.path)
    this._brightSprite = brightHolder.node
    this._brightAction = brightHolder.action
    this._brightSprite.runAction(this._brightAction)    
    var text = new cc.LabelTTF(this._number.toString(), "Arial", 128)
    text.setColor(cc.color(0, 0, 0))
    text.setPosition(0, xc.BounceLayer.TEXT_Y)    
    this._brightSprite.addChild(text)
    holder._backHolder.addChild(this._brightSprite)
    this._brightSprite.setPosition(holder._backHolder.convertToNodeSpace(spritePos))
    var newPos = cc.p(holder.width / 2, 60)
    var moveTo = new cc.MoveTo(0.25, newPos)
    var action = moveTo
    var layer = this.getParent()
    if(layer._level == 1 && layer._lessons == 0) {
      var callFunc = new cc.CallFunc(function() {
        var dropRect = cc.rect(this._bounceDrop.x, this._bounceDrop.y, 400, 400)
        this._help = new xc.HelpLayer(dropRect)
        this.addChild(this._help)
        this._help.click(this._bounceDrop.x, this._bounceDrop.y)
      }, layer)
      action = new cc.Sequence(moveTo, callFunc)
    }
    this._brightSprite.runAction(action)
  },
  shiftParent: function() {
    var pos = this._brightSprite.getParent().convertToWorldSpace(this._brightSprite.getPosition())
    this._brightSprite.removeFromParent()
    var brightHolder = ccs.load(xc.BounceLayer.res.cup_json, xc.path)
    this._brightSprite = brightHolder.node
    this._brightAction = brightHolder.action
    this._brightSprite.runAction(this._brightAction)    
    var text = new cc.LabelTTF(this._number.toString(), "Arial", 128)
    text.setColor(cc.color(0, 0, 0))
    text.setPosition(0, xc.BounceLayer.TEXT_Y)    
    this._brightSprite.addChild(text)              
    this.addChild(this._brightSprite)
    this._brightSprite.setPosition(pos)
    if(this._holder) {
      this._holder._choice = null
      this._holder = null
    }
  },
  resetPosition: function() {
    this.shiftParent()
    var moveTo = new cc.MoveTo(1, this._dullSprite.getPosition())
    this._brightSprite.runAction(moveTo)
  }
})

xc.AdditionDisplay = cc.LayerColor.extend({
  ctor: function(components, sum) {
    this._super(cc.color(240, 240, 240), cc.director.getVisibleSize().width / 2, cc.director.getVisibleSize().height / 2)
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
          if(parent._lessons >= xc.BounceLayer.MAX_LESSONS) {
            parent.getParent().menuContext.showScore()
          } else {
            parent.cleanLayer()
            parent.doLevel()
          }
        }
    })
    cc.eventManager.addListener(this._listener, this)
  }
})

xc.BounceLayer.NUMBER_WIDTH = 256
xc.BounceLayer.CHOICE_WIDTH = 150
xc.BounceLayer.CHOICE_PADDING = 200
xc.BounceLayer.HOLDER_Y = 600
xc.BounceLayer.TEXT_Y = 55
xc.BounceLayer.CUP_HEIGHT = 354
xc.BounceLayer.MAX_LESSONS = 3
xc.BounceLayer.CONE_HEIGHT = 172


xc.BounceLayer.res = {
  graywindow_png: xc.path + "help/graywindow.png",
  whiteboard_png: xc.path + "help/whiteboard.png",
  icecream_plist: xc.path + "icecream/icecream.plist",
  icecream_png: xc.path + "icecream/icecream.png",
  background_json: xc.path + "icecream/background.json",
  machine_json: xc.path + "icecream/machine.json",
  cup_json: xc.path + "icecream/cup.json",
  drop_sound: xc.path + "res/sounds/sfx/water_drop.ogg",
  error_sound: xc.path + "res/sounds/sfx/error.ogg",
  success_sound: xc.path + "res/sounds/sfx/success.ogg"     
}
