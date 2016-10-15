/// <reference path="../cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />

var xc = xc || {}

xc.ConnectTheDotsLayer = cc.LayerColor.extend({
  _dots: null,
  _dotNode: null,
  _numRows: 8,
  _numCols: 11,
  _touchedDots: [],
  _targetNum: 2,
  _gap: 0,
  _level: 0,
  _score: 0,
    ctor: function(args) {
    this._super(cc.color(248, 248, 248), cc.director.getVisibleSize().width, cc.director.getVisibleSize().height)
    cc.spriteFrameCache.addSpriteFrames(xc.ConnectTheDotsLayer.res.hand_plist)
    this._level = args[0]
    if(this._level <= 3) {
      this._targetNum = 2
    } else if(this._level <= 6) {
      this._targetNum = 3
    } else if(this._level <= 9) {
      this._targetNum = 4
    } else if(this._level <= 12) {
      this._targetNum = 5
    } else {
      this._targetNum = 6
    }
    this._dotNode = new cc.Node()
    this.addChild(this._dotNode)
    this._gap = Math.min(cc.director.getVisibleSize().width / this._numCols, cc.director.getVisibleSize().height / this._numRows)
    this.showDots()
    var help = new xc.HelpLayer(1280, 900, 400, 400)
    this.addChild(help)
    help.clickAndDrag(1280, 900, 500, 700)
    this.iterateToFindPath()
  },
  showDots: function() {
    this._dots = new Array(this._numRows)
    for(var i = 0; i < this._numRows; i++) {
      this._dots[i] = new Array(this._numCols)
      for(var j = 0; j < this._numCols; j++) {
        var dot = new xc.Dot(xc.ConnectTheDotsLayer.colors[getRandomInt(0, 3)], this.dotTouched, this)
        dot.setPosition((j + 0.5) * this._gap, (i + 0.5) * this._gap)
        this._dotNode.addChild(dot)
        this._dots[i][j] = dot
      }
    }
  },
  getRowCol: function(dot) {
    for(var i = 0; i < this._numRows; i++) {
      for(var j = 0; j < this._numCols; j++) {
        if(dot == this._dots[i][j]) {
          return [i, j]
        }
      }
    }
  },
  enableTouch: function(enable) {
    var allChildren = this._dotNode.getChildren()
    for (var i = 0; i < allChildren.length; i++) {
      if(allChildren[i]._listener) {
        allChildren[i]._listener.setEnabled(enable)
      }
    }
  },  
  pulse: function(dot) {
    var pulse = new xc.Dot(dot.getColor())
    pulse.setOpacity(64)
    pulse.setScale(1)
    var size = dot.getContentSize()
    pulse.setPosition(size.width / 2, size.height / 2)
    dot.addChild(pulse)
    var scaleAction = new cc.ScaleBy(0.5, 1.8)
    var callFunc = new cc.CallFunc(function() {
      this.removeFromParent()
    }, pulse)
    var seq = new cc.Sequence(scaleAction, callFunc)
    pulse.runAction(seq)
  },
  dotTouched: function(touch, event) {
    switch (event.getEventCode()) {
      case cc.EventTouch.EventCode.BEGAN:
        this._touchedDots = []
        var locationInNode = event.getCurrentTarget().getParent().convertTouchToNodeSpace(touch)
        var line = new cc.DrawNode()
        line.drawSegment(event.getCurrentTarget().getPosition(), locationInNode, 20, event.getCurrentTarget()._dotColor)
        event.getCurrentTarget().getParent().addChild(line)
        this._touchedDots[0] = [event.getCurrentTarget()].concat(this.getRowCol(event.getCurrentTarget())).concat([line])
        // event.getCurrentTarget().setOpacity(128)
        this.pulse(event.getCurrentTarget())
        break
      case cc.EventTouch.EventCode.MOVED:
        var target = event.getCurrentTarget()
        var locationInNode = target.getParent().convertTouchToNodeSpace(touch)
        var prevDot = this._touchedDots[this._touchedDots.length-1]
        prevDot[3].clear()
        prevDot[3].drawSegment(prevDot[0].getPosition(), locationInNode, 20, prevDot[0]._dotColor)

        outerloop:
        for(var i = 0; i < this._numRows; i++) {
          for(var j = 0; j < this._numCols; j++) {
            if (cc.rectContainsPoint(this._dots[i][j].getBoundingBox(), locationInNode) && cc.colorEqual(this._dots[i][j].getColor(), this._touchedDots[0][0].getColor())) {
              if(this._dots[i][j] == prevDot[0]) {
                break outerloop
              } else if(this._touchedDots.length > 1 && this._touchedDots[this._touchedDots.length - 2][0] == this._dots[i][j]) {
                // prevDot[0].setOpacity(255)
                prevDot[3].removeFromParent()
                this._touchedDots.pop()
              } else {
                if(Math.abs(prevDot[1] - i) <= 1 && Math.abs(prevDot[2] - j) <= 1) {
                  for(var k = 1; k < this._touchedDots.length; k++) {
                    if(this._dots[i][j] == this._touchedDots[k][0]) {
                      break outerloop
                    }
                  }
                  prevDot[3].clear()
                  prevDot[3].drawSegment(prevDot[0].getPosition(), this._dots[i][j].getPosition(), 20, prevDot[0]._dotColor)
                  var line = new cc.DrawNode()
                  this._dots[i][j].getParent().addChild(line)
                  this._touchedDots.push([this._dots[i][j], i, j, line])
                  // this._dots[i][j].setOpacity(128)
                  this.pulse(this._dots[i][j])
                  break outerloop
                }
              }
            }
          }
        }
        break
      case cc.EventTouch.EventCode.ENDED:
        var touchedDots = 1
        for(i = 0; i < this._touchedDots.length; i++) {
          // this._touchedDots[i][0].setOpacity(255)
          this._touchedDots[i][0].removeAllChildren()
          this._touchedDots[i][3].removeFromParent()
          if(this._touchedDots[i][0] != this._touchedDots[0][0]) {
            touchedDots++
          }
        }
        if(touchedDots == this._targetNum) {
          if(++this._score >= 5) {
            xc.GameScene.load(xc.ConnectTheDotsMenu)
          }
          this.enableTouch(false)
          for(var j = 0; j < this._numCols; j++) {
            for(var i = this._numRows - 1; i >= 0; i--) {
              for(k = 0; k < this._touchedDots.length; k++) {
                if(this._touchedDots[k][0] == this._dots[i][j]) {
                  var currentDot = this._dots[i][j]
                  for(var m = i; m < this._numRows - 1; m++) {
                    this._dots[m][j] = this._dots[m + 1][j]
                  }
                  this._dots[m][j] = currentDot
                  currentDot.setColor(xc.ConnectTheDotsLayer.colors[getRandomInt(0, 5)])
                  currentDot.setPosition(cc.p(currentDot.getPosition().x, (this._numCols + 0.5) * this._gap))
                }
              }
            }
          }
          while(this.iterateToFindPath() == null) {
            for(var i = 0; i < this._numRows; i++) {
              for(var j = 0; j < this._numCols; j++) {
                var dot = this._dots[i][j]
                var iNew = getRandomInt(0, this._numRows)
                var jNew = getRandomInt(0, this._numCols)
                var dotNew = this._dots[iNew][jNew]
                this._dots[iNew][jNew] = dot
                this._dots[i][j] = dotNew
              }
            }
          }
          for(var i = 0; i < this._numRows; i++) {
            for(var j = 0; j < this._numCols; j++) {
              var newPos = cc.p((j + 0.5) * this._gap, (i + 0.5) * this._gap)
              if(!cc.pointEqualToPoint(this._dots[i][j].getPosition(), newPos)) {
                var dropAction = new cc.MoveTo(0.5, newPos)
                dropAction.easing(cc.easeBackOut())
                this._dots[i][j].runAction(dropAction)
              }
            }
          }
          this.runAction(new cc.Sequence(cc.delayTime(0.5), new cc.CallFunc(function() {
            this.enableTouch(true)
          }, this)))
        }
        break
    }
  },
  iterateToFindPath: function() {
    for(var i = 0; i < this._numRows; i++) {
      for(var j = 0; j < this._numCols; j++) {
        var dotArray = this.findPath(this._dots[i][j], i, j, null, this._targetNum)
        if(dotArray.length >= this._targetNum) {
          for(var d = 0; d < dotArray.length; d++) {
            cc.log(this.getRowCol(dotArray[d]))
            this.pulse(dotArray[d])
          }
          return dotArray
        }
      }
    }
    return null
  },
  findPath: function(dot, x, y, dotArray, num) {
    if(dotArray == null) {
      dotArray = new Array()
    }
    if(dotArray.indexOf(dot) == -1) {
      dotArray.push(dot)
      if(dotArray.length >= num) {
        return dotArray
      }
      for(var i = Math.max(x - 1, 0); i < Math.min(x + 2, this._numRows); i++) {
        for(var j = Math.max(y - 1, 0); j < Math.min(y + 2, this._numCols); j++) {
          if(!(i == x && j == y) && cc.colorEqual(dot.getColor(), this._dots[i][j].getColor())) {
            var retDotArray = this.findPath(this._dots[i][j], i, j, dotArray.slice(), num)
            if(retDotArray.length >= num) {
              return retDotArray
            }
          }
        }
      }
    }
    return dotArray
  }
})

xc.ConnectTheDotsLayer.res = {
  hand_plist: xc.path + "maths/hand.plist",
  hand_png: xc.path + "maths/hand.png",
  dot_png: xc.path + "maths/dot.png",
  graywindow_png: xc.path + "graywindow.png"  
}

xc.ConnectTheDotsMenu = xc.LevelMenuLayer.extend({
  _clazz: xc.ConnectTheDotsLayer,
  _span: 3,
  _numLevels: 15,
  ctor: function(args) {
    cc.spriteFrameCache.addSpriteFrames(xc.ConnectTheDotsMenu.res.hand_plist)
    cc.spriteFrameCache.addSpriteFrames(xc.ConnectTheDotsMenu.res.cityscreen_plist)    
    this._super(args)
    var parallax = this.getContainer()
    var background = ccs.load(xc.ConnectTheDotsMenu.res.background_json, xc.path)
    var foreground = ccs.load(xc.ConnectTheDotsMenu.res.foreground_json, xc.path)
    var frontground = ccs.load(xc.ConnectTheDotsMenu.res.frontground_json, xc.path)
    var mainground = ccs.load(xc.ConnectTheDotsMenu.res.mainground_json, xc.path)
    parallax.addChild(background.node, -3, cc.p(0.2, 0.2), cc.p(0, 0))
    parallax.addChild(mainground.node, -3, cc.p(0.4, 0.4), cc.p(0, 0))
    parallax.addChild(foreground.node, -2, cc.p(0.6, 0.6), cc.p(0, 0))
    parallax.addChild(frontground.node, -1, cc.p(0.8, 0.8), cc.p(0, 0))
  }
})

xc.ConnectTheDotsMenu.res = {
  hand_plist: xc.path + "maths/hand.plist",
  hand_png: xc.path + "maths/hand.png",
  dot_png: xc.path + "maths/dot.png",  
  cityscreen_plist: xc.path + "cityscreen/cityscreen.plist",
  cityscreen_png: xc.path + "cityscreen/cityscreen.png",
  cityscreen_json: xc.path + "cityscreen/cityscreen.json",
  background_json: xc.path + "cityscreen/background.json",
  foreground_json: xc.path + "cityscreen/foreground.json",
  frontground_json: xc.path + "cityscreen/frontground.json",
  mainground_json: xc.path + "cityscreen/mainground.json"
}

xc.ConnectTheDotsLayer.colors = [
  new cc.color(255, 0, 0),
  new cc.color(255, 255, 0),
  new cc.color(0, 255, 0),
  new cc.color(0, 255, 255),
  new cc.color(0, 0, 255),
  new cc.color(255, 0, 255),
  new cc.color(255, 128, 0),
  new cc.color(255, 0, 128)  
]