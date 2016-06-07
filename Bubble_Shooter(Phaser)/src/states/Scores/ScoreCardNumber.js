
class ScoreCardNumber extends Phaser.State{

    preload(){
  
        this.game.load.image('background', 'assets/Background_Scene.png');
    
    }

    create(){
  
        this.game.add.image(0,0,'background'); 
        
        let dimensionData = this.getValueXY(50,50)
        console.log(" world x and y : "+dimensionData.X+" "+dimensionData.Y);
        this.scoreLabel = this.game.add.text(dimensionData.x, dimensionData.Y, 'score: 0', { font: '18px Arial', fill: '#00FFAA' });	
   
    }
   
    getValueXY(widthPer , heightPer){
        
        let X=0 , Y=0;
        
        if(!(widthPer == 0 || heightPer == 0)){
            
        let widthRatio = 100 / widthPer;
        let heightRation = 100 / heightPer;
        
         X = ( this.bg.width / widthRatio ) ;
         Y = ( this.bg.height / heightRation ) ;
        
        }else{
            console.log(" please try again - Enter correct Value  ");
        }
        
        return {X,Y};
    }
    
}

export default ScoreCardNumber;