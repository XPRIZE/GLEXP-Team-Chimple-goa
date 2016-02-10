//xport var my_game = 'whack_a_mole';
class BootState extends Phaser.State {

preload () {
		this.game.load.image('Home', 'assets/HomeScreen/HomeScreen.png');
        this.game.load.image('Start', 'assets/HomeScreen/Home_Start.png');
        this.game.load.audio('backgroundMusic', 'assets/Background/background.mp3');
  //      this.game.load.image('sprite', 'assets/HomeScreen/HomeSprite 630*680');
        this.game.load.spritesheet('sprite', 'assets/HomeScreen/HomeSprite 630x680.png', 680, 630);
       
	}
	create () {
		//set some game setting
		
		this.game.add.image(0, 0, 'Home');
        let sprite = this.game.add.sprite(this.game.world.centerX - 50, this.game.world.centerY - 210, 'sprite');
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.button = this.game.add.button(this.game.world.width - 260, this.game.world.height - 60, 'Start', this.start, this, 0, 1, 1);
        this.button.anchor.setTo(0.5, 0.5);
		this.game.add.tween(this.button).to({angle: -2}, 250).to({angle: 2}, 250).loop().start();
		// START the load state
		//this.game.state.start('load');
        this.game.physics.arcade.enable(sprite);
		sprite.anchor.setTo(0.5, 0.5);
        sprite.animations.add('spr', [1, 2, 3, 4, 5, 6, 7, 8, 9 ,10], 15, true);
        sprite.animations.play('spr');
	}
       start(){
     //   console.log('in start');
        this.game.state.start('loadlevel');
    }
}


export default BootState;
