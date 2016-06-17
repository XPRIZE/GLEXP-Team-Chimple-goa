var Menu2Layer = cc.Layer.extend({
     
      
      ctor:function () {
      
        this._super();
        var size = cc.winSize;
        console.log("loading");
        var nameLabel = new cc.LabelTTF('LEVEL 2','Arial', 70 );
		nameLabel.setAnchorPoint(0.5,0.5); 
        nameLabel.x = size.width / 2;
        nameLabel.y = size.height / 2+80; 
        nameLabel.setColor(cc.color(0,0,0));
        this.addChild(nameLabel, 1);
        
        var startLabel = new cc.LabelTTF('CLICK to start','Arial', 80 );
		startLabel.setAnchorPoint(0.5,0.5); 
        startLabel.x = size.width / 2;
        startLabel.y = size.height / 2-100; 
        startLabel.setColor(cc.color(0,0,0));
        this.addChild(startLabel, 1);
         
       var levelBG = new cc.Sprite(res.LevelBG_png);
        levelBG.setAnchorPoint(0,0);   
       levelBG.id = "LevelBG";
       this.addChild(levelBG,0);
      
     //  cc.eventManager.addListener(listener1.clone(), levelBG); 
       cc.eventManager.addListener(cc.EventListener.create(  
    {
         event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches:true,  
         onTouchBegan: this.onTouchBegan,}) , levelBG);

       return true;
      },
      
       onTouchBegan: function (touch, event){
         var target = event.getCurrentTarget();
         var location = target.convertToNodeSpace(touch.getLocation());
         var targetSize = target.getContentSize();
         var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);
         if (cc.rectContainsPoint(targetRectangle, location))
                   {
                   
                       if(target.id == "LevelBG"){
                         //  console.log("aaaa");
                       cc.director.runScene(new Play2Scene());      
                       }
                   }
       }
      
 });   
 
  var Menu2Scene = cc.Scene.extend({
    ctor:function () {
        this._super();
        var layer = new Menu2Layer();
        this.addChild(layer);
    }
});

