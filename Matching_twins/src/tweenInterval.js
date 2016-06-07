var tweenIntervals = cc.ActionInterval.extend({
    
    coin_1_other_tween : null,
    
    ctor : function(coin_1_other)
    {
        this._super();
        
        coin_1_other_tween = null;
        
        coin_1_other_tween = cc.MoveTo.create(2, cc.p(900, 900));       
        coin_1_other.runAction(coin_1_other_tween);
//        var coin_1_trans_fade_in = cc.FadeTo.create(2, 50);
//        coin_1_trans.runAction(coin_1_trans_fade_in);

//    this.scheduleUpdate();
        
    },
    
    update : function()
    {
        if(coin_1_other_tween!=null && coin_1_other_tween.isDone())
        {
            console.log('hello');
        }
    }
    
});