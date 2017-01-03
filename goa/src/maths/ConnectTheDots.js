/// <reference path="../cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />

var xc = xc || {}

xc.ConnectTheDotsLayer = cc.LayerColor.extend({
  _dots: null,
  _dotNode: null,
  _hand: null,
  _handNode: null,
  _num: null,
  _numNode: null,
  _numRows: 8,
  _numCols: 8,
  _touchedDots: [],
  _targetNum: 2,
  _gap: 0,
  _level: 0,
  _score: 0,
  _maxColors: 3,
  _help: null,
    ctor: function(args) {
    this._super(cc.color(0, 0, 248), cc.director.getVisibleSize().width, cc.director.getVisibleSize().height)
    cc.spriteFrameCache.addSpriteFrames(xc.ConnectTheDotsLayer.res.hand_plist)
    this._dotNode = new cc.Node()
    this._dotNode.setPosition(xc.ConnectTheDotsLayer.WHITEBOARD_PADDING, 0)
    var whiteboard = new cc.Sprite(xc.ConnectTheDotsLayer.res.whiteboard_png)
    whiteboard.setScale((cc.director.getVisibleSize().height - xc.ConnectTheDotsLayer.WHITEBOARD_PADDING) / xc.ConnectTheDotsLayer.WHITEBOARD_HEIGHT)
    whiteboard.setPosition(cc.director.getVisibleSize().height / 2, cc.director.getVisibleSize().height / 2)
    this._dotNode.addChild(whiteboard)
    this.addChild(this._dotNode)

    this._gap = Math.min((cc.director.getVisibleSize().width - xc.ConnectTheDotsLayer.WHITEBOARD_PADDING * 3) / this._numCols, (cc.director.getVisibleSize().height - xc.ConnectTheDotsLayer.WHITEBOARD_PADDING * 3) / this._numRows)
  },
  onEnter: function() {
    cc.LayerColor.prototype.onEnter.call(this)
    this._level = this.getParent().menuContext.getCurrentLevel()
    this._targetNum = (this._level - 1) % 5 + 2
    if(this._level <= 5) {
      this._maxColors = 3
    } else {
      this._maxColors = 5      
    }
    this._handNode = new cc.Node()
    this._handNode.setPosition(cc.director.getVisibleSize().height + (cc.director.getVisibleSize().width - cc.director.getVisibleSize().height) / 2 + xc.ConnectTheDotsLayer.WHITEBOARD_PADDING / 2, (cc.director.getVisibleSize().width - cc.director.getVisibleSize().height) * 1.5 - xc.ConnectTheDotsLayer.WHITEBOARD_PADDING * 2)
    var handboard = new cc.Sprite(xc.ConnectTheDotsLayer.res.whiteboard_png)
    handboard.setScale((cc.director.getVisibleSize().width - cc.director.getVisibleSize().height - 3 * xc.ConnectTheDotsLayer.WHITEBOARD_PADDING) / xc.ConnectTheDotsLayer.WHITEBOARD_HEIGHT)
    handboard.setColor(new cc.Color(218, 113, 109))
    this._handNode.addChild(handboard)
    this._hand = new cc.Sprite("#" + xc.DotsLayer.fingerRep[this._targetNum])
    this._hand.setScale(0.5)
    this._handNode.addChild(this._hand)
    this.addChild(this._handNode)

    this._numNode = new cc.Node()
    this._numNode.setPosition(cc.director.getVisibleSize().height + (cc.director.getVisibleSize().width - cc.director.getVisibleSize().height) / 2 + xc.ConnectTheDotsLayer.WHITEBOARD_PADDING / 2, (cc.director.getVisibleSize().width - cc.director.getVisibleSize().height) / 2 - xc.ConnectTheDotsLayer.WHITEBOARD_PADDING / 2)
    var handboard = new cc.Sprite(xc.ConnectTheDotsLayer.res.whiteboard_png)
    handboard.setScale((cc.director.getVisibleSize().width - cc.director.getVisibleSize().height - 3 * xc.ConnectTheDotsLayer.WHITEBOARD_PADDING) / xc.ConnectTheDotsLayer.WHITEBOARD_HEIGHT)
    this._numNode.addChild(handboard)
    this._num = new cc.LabelTTF(this._targetNum.toString(), "Arial", 512)
    this._num.color = new cc.Color(255, 192, 203)
    this._numNode.addChild(this._num)
    this.addChild(this._numNode)
    
    var dropAction = new cc.MoveTo(0.5, this._handNode.getPosition())
    this._handNode.setPosition(this._handNode.getPosition().x, this._handNode.getPosition().y + cc.director.getVisibleSize().height)
    dropAction.easing(cc.easeBackOut())
    this._handNode.runAction(dropAction)
    
    dropAction = new cc.MoveTo(0.5, this._numNode.getPosition())
    this._numNode.setPosition(this._numNode.getPosition().x, this._numNode.getPosition().y + cc.director.getVisibleSize().height)
    dropAction.easing(cc.easeBackOut())
    this._numNode.runAction(dropAction)

    dropAction = new cc.MoveTo(0.5, this._dotNode.getPosition())
    this._dotNode.setPosition(this._dotNode.getPosition().x, this._dotNode.getPosition().y + cc.director.getVisibleSize().height)
    dropAction.easing(cc.easeBackOut())

    var delay = new cc.DelayTime(1)
    var callFunc = new cc.CallFunc(function() {
      var path = this.iterateToFindPath(true)
      if(this._level == 1) {
        var x = ( path[0].getPosition().x + path[1].getPosition().x ) / 2 + 64
        var y = ( path[0].getPosition().y + path[1].getPosition().y ) / 2 
        var width = Math.abs(path[0].getPosition().x - path[1].getPosition().x) + 128
        var height = Math.abs(path[0].getPosition().y - path[1].getPosition().y) + 128
        this._help = new xc.HelpLayer(cc.rect(x, y, width, height))
        this.addChild(this._help)
        this._help.clickAndDrag(path[0].getPosition().x + 64, path[0].getPosition().y + 64, path[1].getPosition().x + 64, path[1].getPosition().y + 64)
      }
    }, this)
    var seq = new cc.Sequence(dropAction, delay, callFunc)
    this._dotNode.runAction(seq)
    this.showDots()
  },
  showDots: function() {
    this._dots = new Array(this._numRows)
    for(var i = 0; i < this._numRows; i++) {
      this._dots[i] = new Array(this._numCols)
      for(var j = 0; j < this._numCols; j++) {
        var dot = new xc.Dot(xc.ConnectTheDotsLayer.colors[getRandomInt(0, this._maxColors)], this.dotTouched, this)
        dot.setPosition(xc.ConnectTheDotsLayer.WHITEBOARD_PADDING * 1.5 + (j + 0.5) * this._gap, xc.ConnectTheDotsLayer.WHITEBOARD_PADDING * 1.5 + (i + 0.5) * this._gap)
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
  showNum: function(num) {
    this._num.setString(num.toString())  
    var menuContext = this.getParent().menuContext
    if(menuContext) {
      menuContext.pronounceWord(xc.DotsLayer.numberToString[num])
    }
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
        this.showNum(this._touchedDots.length)
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
                this.showNum(this._touchedDots.length)
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
                  this.showNum(this._touchedDots.length)       
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
          this.showNum(this._targetNum)
        }
        if(touchedDots == this._targetNum) {
          if(this._help) {
            this.removeChild(this._help)
            this._help = null
          }
          cc.AudioEngine.getInstance().playEffect(xc.ConnectTheDotsLayer.res.pop_sound);
          if(++this._score >= 5) {
            var menuContext = this.getParent().menuContext
            menuContext.setMaxPoints(5)
            menuContext.addPoints(this._score)
            this.getParent().menuContext.showScore()
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
                  currentDot.setColor(xc.ConnectTheDotsLayer.colors[getRandomInt(0, this._maxColors)])
                  currentDot.setPosition(cc.p(currentDot.getPosition().x, xc.ConnectTheDotsLayer.WHITEBOARD_PADDING * 1.5 + (this._numCols + 0.5) * this._gap))
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
              var newPos = cc.p(xc.ConnectTheDotsLayer.WHITEBOARD_PADDING * 1.5 + (j + 0.5) * this._gap, xc.ConnectTheDotsLayer.WHITEBOARD_PADDING * 1.5 + (i + 0.5) * this._gap)
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
  iterateToFindPath: function(help) {
    for(var i = 0; i < this._numRows; i++) {
      for(var j = 0; j < this._numCols; j++) {
        var dotArray = this.findPath(this._dots[i][j], i, j, null, this._targetNum)
        if(dotArray.length >= this._targetNum) {
          if(help) {
            for(var d = 0; d < dotArray.length; d++) {
              this.pulse(dotArray[d])
            }
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

xc.ConnectTheDotsLayer.gameName = "ConnectTheDots"
xc.ConnectTheDotsLayer.WHITEBOARD_WIDTH = 1640
xc.ConnectTheDotsLayer.WHITEBOARD_HEIGHT = 1640
xc.ConnectTheDotsLayer.WHITEBOARD_PADDING = 80

xc.ConnectTheDotsLayer.res = {
  hand_plist: xc.path + "maths/hand.plist",
  hand_png: xc.path + "maths/hand.png",
  graywindow_png: xc.path + "help/graywindow.png",
  whiteboard_png: xc.path + "help/whiteboard.png",
  pop_sound: "res/sounds/sfx/pop.ogg"
}

xc.ConnectTheDotsMenu = xc.LevelMenuLayer.extend({
  _clazz: xc.ConnectTheDotsLayer,
  _span: 3,
  _numLevels: 24,
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