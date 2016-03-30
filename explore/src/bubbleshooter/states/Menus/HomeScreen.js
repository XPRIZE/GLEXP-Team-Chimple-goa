
class HomeScreen extends Phaser.State {
    
    preload(){
     
        this.game.load.image('background', 'assets/bubbleshooter/Main_Menu.png');
        
        this.game.load.image('Alphabets','assets/bubbleshooter/Alphabet_Button.png');
        this.game.load.image('Number','assets/bubbleshooter/Number_Button.png');
        this.game.load.image('Category','assets/bubbleshooter/Category_Button.png');
        this.game.load.image('Puzzle','assets/bubbleshooter/Puzzle_Button.png');
        
    }
    
    create(){
    
    if(!this.game.device.desktop)
    {
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
    }

    this.widthScale =  this.game.width / 800;
    this.heightScale = this.game.height / 1280;
        
    console.log("widthScale : "+ this.widthScale+ " heightScale : "+ this.heightScale);
    
    this.bg = this.game.add.image(this.game.world.centerX,this.game.world.centerY,'background');   
    this.bg.anchor.setTo(0.5, 0.5);
    this.bg.scale.setTo(this.widthScale, this.heightScale);
    
    let dataDimension = this.getValueXY(50,48);
    this.buttonAlphabets = this.game.add.button(dataDimension.X,dataDimension.Y, 'Alphabets', this.alphabetsLevel, this, 2, 1, 0);
    this.buttonAlphabets.anchor.setTo(0.5);
    this.buttonAlphabets.scale.setTo(this.widthScale, this.heightScale);
    
    dataDimension = this.getValueXY(50,62);
    this.buttonNumbers = this.game.add.button(dataDimension.X,dataDimension.Y, 'Number', this.numberLevel, this, 2, 1, 0);
    this.buttonNumbers.anchor.setTo(0.5);
    this.buttonNumbers.scale.setTo(this.widthScale, this.heightScale);
    
    dataDimension = this.getValueXY(50,76);
    this.buttonCategories = this.game.add.button(dataDimension.X,dataDimension.Y, 'Category', this.categoriesLevel, this, 2, 1, 0);
    this.buttonCategories.anchor.setTo(0.5);
    this.buttonCategories.scale.setTo(this.widthScale, this.heightScale);
    
    dataDimension = this.getValueXY(50,90);
    this.buttonPuzzle = this.game.add.button(dataDimension.X,dataDimension.Y, 'Puzzle', this.puzzleLevel, this, 2, 1, 0);
    this.buttonPuzzle.anchor.setTo(0.5);
    this.buttonPuzzle.scale.setTo(this.widthScale, this.heightScale);

    }
    
    alphabetsLevel(){
       this.game._LoadFlag = 1;
       console.log("homescreen alphabets flag value is : "+ this.game._LoadFlag);
       this.game.state.start('Bubble_LoadStates');
        
    }
    
    numberLevel(){
        this.game._LoadFlag = 2;
        console.log("homescreen numbers flag value is : "+ this.game._LoadFlag);
        this.game.state.start('Bubble_LoadStates');
       
    }
    
    categoriesLevel(){
        console.log("categories method "); 
        this.game.state.start('Bubble_CategoriesScreen');           
    }
    
    puzzleLevel(){
         this.game._LoadFlag = 3;
         console.log("homescreen puzzle flag value is : "+ this.game._LoadFlag);
         this.game.state.start('Bubble_LoadStates');
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

export default HomeScreen;