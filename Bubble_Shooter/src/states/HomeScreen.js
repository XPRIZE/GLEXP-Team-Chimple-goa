
class HomeScreen extends Phaser.State {

    preload(){
     
      this.game.load.image('background', 'assets/Background.png');
        
        this.game.load.image('HomeScreen','assets/title.png');
        this.game.load.image('Alphabets','assets/alphabets.png');
        this.game.load.image('Number','assets/number.png');

    }
    
    create(){
    this.game.add.image(0,0,'background');
    this.home = this.game.add.sprite(this.game.world.centerX , 200 , 'HomeScreen');   
    this.home.anchor.setTo(0.5);
    
    this.buttonAlphabets = this.game.add.button(this.game.world.centerX, 400, 'Alphabets', this.alphabetsLevel, this, 2, 1, 0);
    this.buttonNumbers = this.game.add.button(this.game.world.centerX, 600, 'Number', this.numberLevel, this, 2, 1, 0);
    
    this.buttonAlphabets.anchor.setTo(0.5);
    this.buttonNumbers.anchor.setTo(0.5);
    }
    
    alphabetsLevel(){
        this.state.start('LevelSceenAlphabets');
    }
    
    numberLevel(){
        this.state.start('LevelSceenNumber');
    }
    
}

export default HomeScreen;