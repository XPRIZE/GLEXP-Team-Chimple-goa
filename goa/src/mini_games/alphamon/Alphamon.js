var Alphamon = cc.Node.extends({
    _monster:null,

    ctor:function (char) {
    this._super();

    _monster = ccs.load("res/english/"+char+".json", "res/SD");
    addChild(_monster);
    },

  //  createWith

});