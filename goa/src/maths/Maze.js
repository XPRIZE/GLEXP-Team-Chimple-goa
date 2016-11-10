/// <reference path="../cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />

var xc = xc || {}

xc.MazeLayer = cc.LayerColor.extend({
  _vertices: null,
  _listener: null,
  _dot: null,
  _moving: false,
  _vertexIndex: 0,
  _points: [],
  _level: 1,
  _help: null,
  ctor: function() {
    this._super(cc.color(248, 248, 248), cc.director.getVisibleSize().width, cc.director.getVisibleSize().height)
    cc.spriteFrameCache.addSpriteFrames(xc.DotsLayer.res.hand_plist)
    var draw = new cc.DrawNode()
    this._points = []
    this.getRandomPoints(this._points, cc.p(200, 1600), cc.p(2400, 200), 20)
    draw.drawCatmullRom(this._points, 1000, 80, cc.color(255, 0, 0))
    this._vertices = this.getCatmullRomPoints(this._points, 1000)
    this.addChild(draw)

    this._listener = cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function (touch, event) {
          var target = event.getCurrentTarget()
          var locationInNode = target.convertTouchToNodeSpace(touch)
          if(target._help) {
            target.removeChild(target._help)
            target._help = null
          }          
          if(target._dot) {
            if(Math.abs(locationInNode.x - target._dot.x) <= xc.MazeLayer.TOLERANCE && Math.abs(locationInNode.y - target._dot.y) <= xc.MazeLayer.TOLERANCE) {
              target._moving = true
              return true
            }
          } else {
            if(Math.abs(locationInNode.x - target._vertices[0].x) <= xc.MazeLayer.TOLERANCE && Math.abs(locationInNode.y - target._vertices[0].y) <= xc.MazeLayer.TOLERANCE) {
              target._dot = new cc.Sprite(xc.MazeLayer.res.dot_png)
              target.addChild(target._dot)
              target._dot.setPosition(touch.getLocation())
              target._moving = true
              target._vertexIndex = 0
              return true
            }
          }
          return false
        },
        onTouchMoved: function(touch, event) {
          var target = event.getCurrentTarget()
          var locationInNode = target.convertTouchToNodeSpace(touch)
          if(target._moving) {
            if(target._vertexIndex < target._vertices.length-1 && Math.abs(locationInNode.x - target._vertices[target._vertexIndex+1].x) <= xc.MazeLayer.TOLERANCE && Math.abs(locationInNode.y - target._vertices[target._vertexIndex+1].y) <= xc.MazeLayer.TOLERANCE) {
              target._vertexIndex++
              target._dot.setPosition(locationInNode)
              target.getParent().menuContext.addPoints(1)
            } else if(target._vertexIndex == target._vertices.length-1 || Math.abs(locationInNode.x - target._vertices[target._vertexIndex].x) <= xc.MazeLayer.TOLERANCE && Math.abs(locationInNode.y - target._vertices[target._vertexIndex].y) <= xc.MazeLayer.TOLERANCE) {
            } else {
              target._dot.setPosition(target._vertices[target._vertexIndex])
              target._moving = false
              target.getParent().menuContext.addPoints(-5)
            }
          }
        },
        onTouchEnded: function(touch, event) {
          var target = event.getCurrentTarget()
          var locationInNode = target.convertTouchToNodeSpace(touch)
          if(target._moving) {
            if(target._vertexIndex == target._vertices.length-1 || Math.abs(locationInNode.x - target._vertices[target._vertices.length-1].x) <= xc.MazeLayer.TOLERANCE && Math.abs(locationInNode.y - target._vertices[target._vertices.length-1].y) <= xc.MazeLayer.TOLERANCE) {
              target.removeChild(target._dot)
              target._moving = false
              var sprite = new cc.Sprite("#hand/one.png")
              sprite.setPosition(target._points[0])
              target.addChild(sprite)
              var pathAction = new cc.CardinalSplineTo(10, target._points, 0.5)
              var callFunc = new cc.CallFunc(function() {
                this.getParent().menuContext.showScore()
              }, target)
              var seq = new cc.Sequence(pathAction, callFunc)
              sprite.runAction(seq)
            } else {

            }
          }
        }
    })
    cc.eventManager.addListener(this._listener, this)
    this._listener.setEnabled(false)
  },
  onEnterTransitionDidFinish: function() {
    var menuContext = this.getParent().menuContext
    this._level = menuContext.getCurrentLevel()
    menuContext.setMaxPoints(this._vertices.length)    
    var hand = new cc.Sprite("#hand/five.png")
    hand.setPosition(cc.director.getVisibleSize().width / 2, cc.director.getVisibleSize().height / 2)
    hand.setScale(0.1)
    this.addChild(hand)
    var scaleAction = new cc.ScaleBy(0.5, 10.0)
    scaleAction.easing(cc.easeBackOut())
    var delay = new cc.DelayTime(2)
    var callFunc = new cc.CallFunc(function() {
      this.removeChild(hand)
      this._listener.setEnabled(true)
      if(this._level == 1) {
        this._help = new xc.HelpLayer(cc.rect(1280, 900, 2360, 1600))
        this.addChild(this._help)
        this._help.clickAndDragCardinalSpline(this._points)      
      }
    }, this)
    var seq = new cc.Sequence(scaleAction, delay, scaleAction.reverse(), callFunc)
    hand.runAction(seq)
  },
  getRandomPoints: function(points, start, end, count) {
    var x = start.x
    var y = start.y

    points.push(cc.p(x, y))
    var ymax = getRandomInt(900, 1800)
    var xmax = getRandomInt(0, 2560)
    for (var i = 1; i < count; i++) {
      x = getRandomInt(Math.max(0, (i - 3) * ((end.x - start.x) / count)), i * ((end.x - start.x) / count))
      // x += getRandomInt(0, (xmax - x)/Math.abs(xmax-x)*1800/count)
      // if(Math.abs(xmax-x) <= 1800/count) {
      //   xmax = getRandomInt(0, 2560)
      // }
      y += getRandomInt((ymax - y)/4, (ymax - y))
      if(Math.abs(ymax-y) <= 1800/count) {
        if(ymax >= 900) {
          ymax = getRandomInt(0, 900)
        } else {
          ymax = getRandomInt(901, 1800)          
        }
      }
      points.push(cc.p(x, y))
    }
    points.push(end)
  },
  getCatmullRomPoints: function(config, segments) {
    var vertices = [], p, lt, deltaT = 1.0 / config.length;
    var tension = 0.5
    for (var i = 0; i < segments + 1; i++) {
        var dt = i / segments;
        // border
        if (dt === 1) {
            p = config.length - 1;
            lt = 1;
        } else {
            p = 0 | (dt / deltaT);
            lt = (dt - deltaT * p) / deltaT;
        }

        // Interpolate
        var newPos = cc.cardinalSplineAt(
            xc.getControlPointAt(config, p - 1),
            xc.getControlPointAt(config, p - 0),
            xc.getControlPointAt(config, p + 1),
            xc.getControlPointAt(config, p + 2),
            tension, lt);
        vertices.push(newPos);
    }
    return vertices
  }
})

xc.MazeLayer.TOLERANCE = 40

xc.MazeLayer.res = {
  hand_plist: xc.path + "maths/hand.plist",
  hand_png: xc.path + "maths/hand.png",
  dot_png: xc.path + "maths/dot.png",
  graywindow_png: xc.path + "help/graywindow.png",
  whiteboard_png: xc.path + "help/whiteboard.png",
}

xc.getControlPointAt = function (controlPoints, pos) {
    var p = Math.min(controlPoints.length - 1, Math.max(pos, 0));
    return controlPoints[p];
};
