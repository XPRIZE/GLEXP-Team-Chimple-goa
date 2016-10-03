/// <reference path="../cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />

var xc = xc || {}

xc.LevelMenuLayer = cc.ParallaxNode.extend({
  _listener: null,
  _touchPoint: null,
  ctor: function() {
    this._super()
    var layer = new cc.LayerColor(cc.color(255, 255, 0), 2560, 1800)
    this.addChild(layer, -3, cc.p(0.4, 0.5), cc.p(0, 0))
    var layer2 = new cc.LayerColor(cc.color(0, 255, 0), 50, 900)
    this.addChild(layer2, -2, cc.p(0.5, 0.6), cc.p(0, 0))
    var layer3 = new cc.LayerColor(cc.color(255, 0, 0), 50, 900)
    this.addChild(layer3, -1, cc.p(0.6, 0.7), cc.p(1280, 0))
    this._listener = cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function (touch, event) {
          var target = event.getCurrentTarget()          
          target._touchPoint = target.convertTouchToNodeSpace(touch)
          return true          
        },
        onTouchMoved: function(touch, event) {
          var target = event.getCurrentTarget()          
          var tp = target.convertTouchToNodeSpace(touch)
          target.setPosition(target.getPosition().x + tp.x - target._touchPoint.x, target.getPosition().y + tp.y - target._touchPoint.y)
        }
    })
    cc.eventManager.addListener(this._listener, this)
  }
})