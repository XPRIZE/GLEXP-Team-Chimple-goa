/// <reference path="../cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />

var xc = xc || {}

xc.LevelMenuLayer = cc.ScrollView.extend({
  _listener: null,
  _touchPoint: null,
  _clazz: null,
  _span: null,
  _numLevels: null,
  _gameName: null,
  _isJSGame: false,
  ctor: function(args) {
    var gameConfig = args[0]
    this._span = parseInt(gameConfig.span)
    this._numLevels = parseInt(gameConfig.numLevels)
    this._clazz = xc[gameConfig.pureJS]
    this._gameName = gameConfig.name
    this._isJSGame = gameConfig.isJSGame
    this._super(cc.size(cc.director.getWinSize().width * this._span, cc.director.getWinSize().height), new cc.ParallaxNode())
    cc.spriteFrameCache.addSpriteFrames(xc.LevelMenuLayer.res.hand_plist)
    if(gameConfig.menuPlist) {
      cc.spriteFrameCache.addSpriteFrames(xc.path + gameConfig.menuPlist)
    }
    this.setViewSize(cc.director.getWinSize())
    this.setBounceable(false)
    var parallax = this.getContainer()
    parallax.setContentSize(cc.size(cc.director.getWinSize().width * this._span, cc.director.getWinSize().height))
    var gameProgress = JSON.parse(cc.sys.localStorage.getItem(this._gameName + '.level')) || [0]
    var gap = cc.director.getWinSize().width * this._span / (this._numLevels + 1)
    cc.log(cc.director.getWinSize().width)
    var goalTolerance = cc.director.getWinSize().height / 10
    var goal = getRandomArbitrary(goalTolerance, cc.director.getWinSize().height - goalTolerance)
    var start = goalTolerance
    var prevPos = null
    var numDots = 10
    for(var i = 1; i <= this._numLevels; i++) {
      var but = new ccui.Button("hand/dot.png", "hand/dot.png", "hand/dot.png", ccui.Widget.PLIST_TEXTURE)
      but.setScale(0.25)
      var label = new cc.LabelTTF(i.toString(), "Arial", 500, null, cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER)
      label.setPosition(but.getContentSize().width / 2, but.getContentSize().height / 2)
      but.addChild(label)
      start = getRandomArbitrary(start, goal)
      if(Math.abs(goal - start) < goalTolerance) {
        goal = getRandomArbitrary(goalTolerance, cc.director.getWinSize().height - goalTolerance)
      }
      var newPos = cc.p(gap * i, start)
      parallax.addChild(but, 1, cc.p(1.0, 1.0), newPos)
      if(prevPos) {
        var line = new cc.DrawNode()
        line.drawSegment(prevPos, newPos, 20, cc.color(255, 0, 0))
        parallax.addChild(line, 0, cc.p(1.0, 1.0), cc.p())
      }
      prevPos = newPos
      var levelStatus = gameProgress[i]
      if(i == gameProgress.length) {
        but.setColor(cc.color(256, 128, 0))
        but.addTouchEventListener(this.itemSelected, this)
        this.setContentOffset(cc.p(-Math.max(0, Math.min(cc.director.getWinSize().width * ( this._span - 1), newPos.x - cc.director.getWinSize().width / 2)), 0), 1)
      } else if(i > gameProgress.length) {
        but.setColor(cc.color(128, 128, 128))
      } else {
        but.setColor(cc.color(128, 0, 0))
        but.addTouchEventListener(this.itemSelected, this)
      }
    }
    if(gameConfig.backgroundJson) {
        var pLayer = ccs.load(xc.path + gameConfig.backgroundJson, xc.path)
        parallax.addChild(pLayer.node, -4, cc.p(0.2, 0.2), cc.p(0, 0))
    }
    if(gameConfig.maingroundJson) {
        var pLayer = ccs.load(xc.path + gameConfig.maingroundJson, xc.path)
        parallax.addChild(pLayer.node, -3, cc.p(0.4, 0.4), cc.p(0, 0))
    }
    if(gameConfig.foregroundJson) {
        var pLayer = ccs.load(xc.path + gameConfig.foregroundJson, xc.path)
        parallax.addChild(pLayer.node, -2, cc.p(0.6, 0.6), cc.p(0, 0))
    }
    if(gameConfig.frontgroundJson) {
        var pLayer = ccs.load(xc.path + gameConfig.frontgroundJson, xc.path)
        parallax.addChild(pLayer.node, -1, cc.p(0.8, 0.8), cc.p(0, 0))
    }
    // SCROLL_DEACCEL_RATE = 0.99
    // SCROLL_DEACCEL_DIST = 100.0
  },
  itemSelected: function (sender, type) {
    switch (type) {
      case ccui.Widget.TOUCH_BEGAN:
        cc.log("touched")
        var level = parseInt(sender.getChildren()[0].getString())
        cc.log(this._gameName + '.currentLevel')
        cc.sys.localStorage.setItem(this._gameName + '.currentLevel', level.toString())
        cc.log(cc.sys.localStorage.getItem(this._gameName + '.currentLevel'))
        this.levelCompleted(level, 3) //TODO: move
        if(this._isJSGame) {
          xc.GameScene.load(this._clazz, level)
        } else {
          goa.MenuContext.launchGameFromJS(this._gameName)
        }
        break;
      case ccui.Widget.TOUCH_ENDED:
    }
  },
  levelCompleted: function(level, numStars) {
    var gameProgress = JSON.parse(cc.sys.localStorage.getItem(this._gameName + '.level')) || [0]
    var currentStars = gameProgress[level] || 0
    gameProgress[level] = Math.max(numStars, currentStars)
    cc.sys.localStorage.setItem(this._gameName + '.level', JSON.stringify(gameProgress))
  }
})

xc.LevelMenuLayer.res = {
  hand_plist: xc.path + "maths/hand.plist",
  hand_png: xc.path + "maths/hand.png",
  dot_png: xc.path + "maths/dot.png",
}

// Returns a random number between min (inclusive) and max (exclusive)
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}