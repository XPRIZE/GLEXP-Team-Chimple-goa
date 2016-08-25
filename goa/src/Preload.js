var Preloader = cc.Scene.extend({
    _className: "Preloader",
    /**
     * Contructor of cc.LoaderScene
     * @returns {boolean}
     */
    init: function () {
        // this._super();
        var self = this;

        //logo
        var logoWidth = 160;
        var logoHeight = 200;

        // bg
        var bgLayer = self._bgLayer = new cc.LayerColor(cc.color(255, 255, 255, 255));
        self.addChild(bgLayer, 0);

        //image move to CCSceneFile.js
        var fontSize = 24, lblHeight = -logoHeight / 2 + 100;
        cc.loader.loadImg(res.HelloWorld_png, { isCrossOrigin: false }, function (err, img) {
            logoWidth = img.width;
            logoHeight = img.height;
            self._initStage(img, cc.visibleRect.center);
        });
        fontSize = 14;
        lblHeight = -logoHeight / 2 - 50;
        //loading percent
        var label = self._label = new cc.LabelTTF("Loading... 0%", "Arial", fontSize);
        label.setPosition(cc.pAdd(cc.visibleRect.center, cc.p(0, lblHeight)));
        label.setColor(cc.color(180, 180, 180));
        bgLayer.addChild(this._label, 10);
        return true;
    },


    onEnter: function () {
        this._super();
    },
    /**
     * custom onExit
     */
    onExit: function () {
        this._super();
    }
});


Preloader.preload = function (resources, cb, target) {
    var _cc = cc;
    if (!_cc.Preloader) {
        _cc.Preloader = new Preloader();
        _cc.Preloader.init();
        cc.eventManager.addCustomListener(cc.Director.EVENT_PROJECTION_CHANGED, function () {
            _cc.Preloader._updateTransform();
        });
    }
    _cc.Preloader.initWithResources(resources, cb, target);

    cc.director.runScene(_cc.Preloader);
    return _cc.Preloader;
};