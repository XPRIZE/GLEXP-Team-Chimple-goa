class Scale{

	constructor(game) {	
      //  let s = 'asadadfad';
      if(!game.device.desktop)
        {
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
          //  Phaser.ScaleManager.forceOrientation(forceLandscape, forcePortrait), forcePortrait is optional;
          game.scale.forceOrientation(true, false);
         //   Phaser.ScaleManager.forceOrientation(true, false);
        //    console.log("mobile");
            game.scale.pageAlignHorizontally = true;
            game.scale.pageAlignVertically = true;
        }
	} 
     getXY(widthPer , heightPer, home_width, home_height){
       
       let x=0 , y=0 , widthRatio = 0 , heightRatio = 0 ;
       
       widthRatio = 100/widthPer;
       x = home_width / widthRatio;
       
       heightRatio = 100 / heightPer ;
       y = home_height / heightRatio;
       
       return {x , y};
   }
   getValue(width, height, home_width, home_height){
       
       let x=0, y=0, myWidth = 0, myHeight = 0;
       
       myWidth = width/1280;
       x = myWidth * 100;
       
        myHeight = height/800;
       y = myHeight * 100;
       
       return this.getXY(x, y, home_width, home_height);
   }
    

}

export default Scale;
