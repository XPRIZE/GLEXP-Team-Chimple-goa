class CategoriesScreen extends Phaser.State{
    preload(){
        this.game.load.image('Background','assets/categoryBackground.png');

        this.game.load.image('Animal','assets/Animal_Button.png');
        this.game.load.image('Fruit','assets/Fruit_Button.png');
        this.game.load.image('Vegitable','assets/Vegetable_Button.png');

    }
  
    create(){
        
    this.widthScale =  this.game.width / 800;
    this.heightScale = this.game.height / 1280;
    
    this.bg = this.game.add.image(this.game.world.centerX,this.game.world.centerY,'Background'); 
    this.bg.anchor.setTo(0.5);
    this.bg.scale.setTo(this.widthScale,this.heightScale);
    this.bg.inputEnabled = true;
    
    let dataDimension = this.getValueXY(50,25); 
    this.buttonNumbers = this.game.add.button(dataDimension.X,dataDimension.Y, 'Fruit', this.fruitLevel, this, 2, 1, 0);
    this.buttonNumbers.anchor.setTo(0.5);
    this.buttonNumbers.scale.setTo(this.widthScale,this.heightScale);
    
    dataDimension = this.getValueXY(50,50);
    this.buttonCategories = this.game.add.button(dataDimension.X,dataDimension.Y, 'Vegitable', this.vegitableLevel, this, 2, 1, 0);
    this.buttonCategories.anchor.setTo(0.5);
    this.buttonCategories.scale.setTo(this.widthScale,this.heightScale);
    
    dataDimension = this.getValueXY(50,75);
    this.buttonAlphabets = this.game.add.button(dataDimension.X,dataDimension.Y, 'Animal', this.animalLevel, this, 2, 1, 0);
    this.buttonAlphabets.anchor.setTo(0.5);
    this.buttonAlphabets.scale.setTo(this.widthScale,this.heightScale);
    
    }
    
    fruitLevel(){
        this.game._LoadFlag = 4;
        console.log("categories  flag value is : "+ this.game._LoadFlag);
        this.state.start('LoadStates');
    }
    
    vegitableLevel(){
        this.game._LoadFlag = 5;
        console.log("categories flag value is : "+ this.game._LoadFlag);
        this.state.start('LoadStates');
    }
    
    animalLevel(){
        this.game._LoadFlag = 6;        
        console.log("categories flag value is : "+ this.game._LoadFlag);
        this.state.start('LoadStates');
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
 export default CategoriesScreen;