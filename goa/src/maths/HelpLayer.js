/// <reference path="../cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />

var xc = xc || {}

xc.HelpLayer = cc.Node.extend({
  _listener: null,
  _graywindow: null,
  _animating: false,
  ctor: function(touchRect, otherRect) {
    this._super()
    if(!otherRect) {
      this._graywindow = this.makePanel(touchRect, cc.rect(0, 0, cc.director.getWinSize().width, cc.director.getWinSize().height))
    } else {
      if((touchRect.x + touchRect.width / 2) < (otherRect.x - otherRect.width)) {
        this._graywindow = this.makePanel(touchRect, cc.rect(0, 0, otherRect.x - otherRect.width / 2, cc.director.getWinSize().height))
        this.makePanel(otherRect, cc.rect(otherRect.x - otherRect.width / 2, 0, cc.director.getWinSize().width - otherRect.x + otherRect.width / 2 , cc.director.getWinSize().height))    
      } else if((otherRect.x + otherRect.width / 2) < (touchRect.x - touchRect.width)) {
        this.makePanel(otherRect, cc.rect(0, 0, touchRect.x - touchRect.width / 2, cc.director.getWinSize().height))
        this._graywindow = this.makePanel(touchRect, cc.rect(touchRect.x - touchRect.width / 2, 0, cc.director.getWinSize().width - touchRect.x + touchRect.width / 2 , cc.director.getWinSize().height))    
      } else if((touchRect.y + touchRect.height / 2) < (otherRect.y - otherRect.height)) {
        this._graywindow = this.makePanel(touchRect, cc.rect(0, 0, cc.director.getWinSize().width, otherRect.y - otherRect.height / 2))
        this.makePanel(otherRect, cc.rect(0, otherRect.y - otherRect.height / 2, cc.director.getWinSize().width, cc.director.getWinSize().height - otherRect.y + otherRect.height / 2 ))    
      } else {
        this.makePanel(otherRect, cc.rect(0, 0, cc.director.getWinSize().width, touchRect.y - touchRect.height / 2))
        this._graywindow = this.makePanel(touchRect, cc.rect(0, touchRect.y - touchRect.height / 2, cc.director.getWinSize().width, cc.director.getWinSize().height - touchRect.y + touchRect.height / 2 ))          
      }          
    }

    this._listener = cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function (touch, event) {
          var target = event.getCurrentTarget()
          if(target._animating) {
            return true
          }
          if (cc.rectContainsPoint(target._graywindow.getBoundingBox(), touch.getLocation())) {
            return false
          }
          return true
        },
        onTouchMoved: function(touch, event) {
        },
        onTouchEnded: function(touch, event) {
        }
    })
    cc.eventManager.addListener(this._listener, this)
  },
  makePanel: function(windowRect, grayRect) {
    var graywindow = new cc.Sprite(xc.HelpLayer.res.graywindow_png)
    this.addChild(graywindow)
    graywindow.setPosition(windowRect.x, windowRect.y)
    graywindow.setScale(windowRect.width / xc.HelpLayer.GW_WIDTH, windowRect.height / xc.HelpLayer.GW_HEIGHT)

    var bottom = new cc.Sprite(xc.HelpLayer.res.gray_png)
    bottom.setPosition(grayRect.x + grayRect.width / 2, (grayRect.y + (windowRect.y - windowRect.height / 2)) / 2)
    bottom.setScale(grayRect.width / xc.HelpLayer.GRAY_WIDTH, (windowRect.y - windowRect.height / 2 - grayRect.y) / xc.HelpLayer.GRAY_HEIGHT)
    this.addChild(bottom)

    var top = new cc.Sprite(xc.HelpLayer.res.gray_png)
    top.setPosition(grayRect.x + grayRect.width / 2, windowRect.y + windowRect.height / 2 + (grayRect.y + grayRect.height - windowRect.y - windowRect.height / 2) / 2)
    top.setScale(grayRect.width / xc.HelpLayer.GRAY_WIDTH, (grayRect.height + grayRect.y - windowRect.y - windowRect.height / 2) / xc.HelpLayer.GRAY_HEIGHT)
    this.addChild(top)

    var left = new cc.Sprite(xc.HelpLayer.res.gray_png)
    left.setPosition((grayRect.x + windowRect.x - windowRect.width / 2) / 2, windowRect.y)
    left.setScale(((windowRect.x - windowRect.width / 2) - grayRect.x) / xc.HelpLayer.GRAY_WIDTH, windowRect.height / xc.HelpLayer.GRAY_HEIGHT)
    this.addChild(left)

    var right = new cc.Sprite(xc.HelpLayer.res.gray_png)
    right.setPosition(grayRect.x / 2 + windowRect.x + windowRect.width / 2 + (grayRect.width - windowRect.x - windowRect.width / 2) / 2, windowRect.y)
    right.setScale(((grayRect.width + grayRect.x - windowRect.x - windowRect.width / 2)) / xc.HelpLayer.GRAY_WIDTH, windowRect.height / xc.HelpLayer.GRAY_HEIGHT)
    this.addChild(right)    
    return graywindow
  },
  click: function(x, y) {
    this._animating = true
    var touch = new cc.Sprite(xc.HelpLayer.res.touch_png)
    touch.setPosition(x, y)
    touch.setAnchorPoint(0.5, 1.0)
    this.addChild(touch)
    var touchAction = new cc.ScaleBy(0.5, 0.8)
    var callFunc = new cc.CallFunc(function() {
      this.getParent()._animating = false
      this.removeFromParent()
    }, touch)
    var seq = new cc.Sequence(touchAction, cc.delayTime(0.5), touchAction.reverse(), callFunc)
    touch.runAction(seq)
  },
  clickAndDrag: function(startX, startY, endX, endY) {
    this._animating = true
    var touch = new cc.Sprite(xc.HelpLayer.res.touch_png)
    touch.setPosition(startX, startY)
    touch.setAnchorPoint(0.5, 1.0)
    this.addChild(touch)
    var touchAction = new cc.ScaleBy(0.5, 0.8)
    var moveAction = new cc.MoveTo(0.5, endX, endY)
    var callFunc = new cc.CallFunc(function() {
      this.getParent()._animating = false
      this.removeFromParent()
    }, touch)
    var seq = new cc.Sequence(touchAction, cc.delayTime(0.5), moveAction, touchAction.reverse(), callFunc)
    touch.runAction(seq)
    
  },
  clickAndDragCardinalSpline: function(points) {
    this._animating = true
    var touch = new cc.Sprite(xc.HelpLayer.res.touch_png)
    touch.setPosition(points[0])
    touch.setAnchorPoint(0.5, 1.0)
    this.addChild(touch)
    var touchAction = new cc.ScaleBy(0.5, 0.8)
    var pathAction = new cc.CardinalSplineTo(5, points, 0.5)
    var callFunc = new cc.CallFunc(function() {
      this.getParent()._animating = false
      this.removeFromParent()
    }, touch)
    var seq = new cc.Sequence(touchAction, cc.delayTime(0.5), pathAction, touchAction.reverse(), callFunc)
    touch.runAction(seq)
  }
})

xc.HelpLayer.res = {
  graywindow_png: xc.path + "help/graywindow.png", 
  gray_png: xc.path + "help/gray.png",
  touch_png: xc.path + "help/touch.png" 
}

xc.HelpLayer.GW_WIDTH = 800
xc.HelpLayer.GW_HEIGHT = 800
xc.HelpLayer.GRAY_WIDTH = 100
xc.HelpLayer.GRAY_HEIGHT = 100
