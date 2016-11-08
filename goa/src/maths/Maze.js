/// <reference path="../cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />

var xc = xc || {}

xc.MazeLayer = cc.LayerColor.extend({
  _vertices: null,
  _listener: null,
  _dot: null,
  ctor: function() {
    this._super(cc.color(248, 248, 248), cc.director.getVisibleSize().width, cc.director.getVisibleSize().height)
    var draw = new cc.DrawNode()
    var points = []
    this.getRandomPoints(points, cc.p(50, 50), cc.p(2560, 1800), 20)
    draw.drawCatmullRom(points, 1000, 40, cc.color(255, 0, 0))
    this._vertices = this.getCatmullRomPoints(points, 100)
    this.addChild(draw)

    this._listener = cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function (touch, event) {
          var target = event.getCurrentTarget()
          var locationInNode = target.convertTouchToNodeSpace(touch)
          if(Math.abs(locationInNode.x - target._vertices[0].x) <= xc.MazeLayer.TOLERANCE && Math.abs(locationInNode.y - target._vertices[0].y) <= xc.MazeLayer.TOLERANCE) {
            this._dot = new cc.Sprite(xc.MazeLayer.res.dot_png)
            this.addChild(this._dot)
            this._dot.setPosition()
            return true
          }
          return false
        },
        onTouchMoved: function(touch, event) {
          var target = event.getCurrentTarget()
          var locationInNode = target.convertTouchToNodeSpace(touch)
          var inside = false
          for (var i = 0; i < target._vertices.length; i++) {
            if(Math.abs(locationInNode.x - target._vertices[i].x) <= xc.MazeLayer.TOLERANCE && Math.abs(locationInNode.y - target._vertices[i].y) <= xc.MazeLayer.TOLERANCE) {
              inside = true
              cc.log(locationInNode)
            }
          }
          return inside
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

xc.MazeLayer.TOLERANCE = 20

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
