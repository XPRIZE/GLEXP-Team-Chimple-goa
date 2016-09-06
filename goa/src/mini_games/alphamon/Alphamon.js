var Alphamon_Monster = cc.Node.extends({
    _monster:null,

    ctor:function () {
    this._super();
  //  this.initWithAlphabet(alphabet);
    return true;
    },


createWithAlphabet: function(alphabet) {
    var alphamon = new Alphamon();
    if(alphamon && alphamon.initWithAlphabet(alphabet)) {
        return alphamon;
    }
    return;
},

initWithAlphabet: function(alphabet){
  _monster = ccs.load("res/english/"+alphabet+".json", "res/SD");
    addChild(_monster.node);
    this.breatheAction();
    this.schedule(this.blinkAction, 5);
    return true;
},

breatheAction:function(){
  var scaleBy = ScaleBy.create(0.6, 1.07, 0.95);
    var rev = scaleBy.reverse();
    var seq = Sequence.create(scaleBy, rev, NULL);
    var forever = RepeatForever.create(seq);
    _monster.node.runAction(forever);
},

blinkAction:function(){

  var level_children = _monster.node.getChildren();

       for ( var i = 0; i< level_children.length;i++){
           var str1 = level_children[i].getName();
           if (str1.indexOf("eye") == 0){
               var action = ccs.load("res/SD/eye_ani/"+str1+".json",xc.path);
               level_children[i].runAction(action.action);
               action.action.play("blink",true);
           }
       }

}



  //  createWith

});