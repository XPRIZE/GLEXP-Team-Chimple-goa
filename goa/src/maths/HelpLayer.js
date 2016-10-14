/// <reference path="../cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />

var xc = xc || {}

xc.HelpLayer = cc.Node.extend({
  _listener: null,
  _graywindow: null,
  ctor: function(x, y, width, height) {
    this._super()
    this._graywindow = new cc.Sprite(xc.HelpLayer.res.graywindow_png)
    this.addChild(this._graywindow)
    this._graywindow.setPosition(x, y)
    this._graywindow.setScale(width / xc.HelpLayer.GW_WIDTH, height / xc.HelpLayer.GW_HEIGHT)

    var bottom = new cc.Sprite(xc.HelpLayer.res.gray_png)
    bottom.setPosition(cc.director.getWinSize().width / 2, (y - height / 2) / 2)
    bottom.setScale(cc.director.getWinSize().width / xc.HelpLayer.GRAY_WIDTH, (y - height / 2) / xc.HelpLayer.GRAY_HEIGHT)
    this.addChild(bottom)

    var top = new cc.Sprite(xc.HelpLayer.res.gray_png)
    top.setPosition(cc.director.getWinSize().width / 2, y + height / 2 + (cc.director.getWinSize().height - y - height / 2) / 2)
    top.setScale(cc.director.getWinSize().width / xc.HelpLayer.GRAY_WIDTH, (cc.director.getWinSize().height - y - height / 2) / xc.HelpLayer.GRAY_HEIGHT)
    this.addChild(top)

    var left = new cc.Sprite(xc.HelpLayer.res.gray_png)
    left.setPosition((x - width / 2) / 2, y)
    left.setScale((x - width / 2) / xc.HelpLayer.GRAY_WIDTH, height / xc.HelpLayer.GRAY_HEIGHT)
    this.addChild(left)

    var right = new cc.Sprite(xc.HelpLayer.res.gray_png)
    right.setPosition(x + width / 2 + (cc.director.getWinSize().width - x - width / 2) / 2, y)
    right.setScale((cc.director.getWinSize().width - x - width / 2) / xc.HelpLayer.GRAY_WIDTH, height / xc.HelpLayer.GRAY_HEIGHT)
    this.addChild(right)

    this._listener = cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function (touch, event) {
          var target = event.getCurrentTarget()
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
  }
})

xc.HelpLayer.res = {
  graywindow_png: xc.path + "graywindow.png", 
  gray_png: xc.path + "gray.png"  
}

xc.HelpLayer.GW_WIDTH = 800
xc.HelpLayer.GW_HEIGHT = 800
xc.HelpLayer.GRAY_WIDTH = 100
xc.HelpLayer.GRAY_HEIGHT = 100
