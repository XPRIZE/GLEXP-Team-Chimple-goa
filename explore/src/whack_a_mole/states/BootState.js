
import Test from "../objects/Scaling"
var home;
class BootState extends Phaser.State {

preload () {
		this.game.load.image('Home', 'assets/whack_a_mole/HomeScreen/HomeScreen.png');
        this.game.load.image('Start', 'assets/whack_a_mole/HomeScreen/Home_Start.png');
        this.game.load.audio('backgroundMusic', 'assets/whack_a_mole/Background/background.mp3');
  //      this.game.load.image('sprite', 'assets/HomeScreen/HomeSprite 630*680');
        this.game.load.spritesheet('sprite', 'assets/whack_a_mole/HomeScreen/HomeSprite 630x680.png', 680, 630);
       
	}
	create () {
		//set some game setting
		 let t = new Test(this.game);
        this.widthScale = this.game.width / 1280;
        this.heightScale = this.game.height / 800;
        console.log("width scale = "+this.widthScale);
        console.log("height scale = "+ this.heightScale);
        
     /*   if (this.widthScale > 1){
            this.widthScale = 1;
        }
        if (this.heightScale > 1){
            this.cache = 1;
        }*/
		home = this.game.add.image(this.game.width / 2,this.game.height /2, 'Home');
        home.anchor.setTo(0.5, 0.5);
       home.scale.setTo(this.widthScale, this.heightScale);
       
       let size = t.getXY(47,43,  home.width, home.height);
        let sprite = this.game.add.sprite(size.x, size.y, 'sprite');
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
         sprite.scale.setTo(this.widthScale, this.heightScale);
        console.log("Background width = "+home.width);
        console.log("Background height = "+home.height);
        
         size = t.getXY(81,93, home.width, home.height);
		this.button = this.game.add.button(size.x, size.y, 'Start', this.start, this, 0, 1, 1);
        this.button.anchor.setTo(0.5,0.5);
        this.button.scale.setTo(this.widthScale, this.heightScale);
    	this.game.add.tween(this.button).to({angle: -2}, 250).to({angle: 2}, 250).loop().start();
		// START the load state
		//this.game.state.start('load');
        this.game.physics.arcade.enable(sprite);
		sprite.anchor.setTo(0.5, 0.5);
        sprite.animations.add('spr', [1, 2, 3, 4, 5, 6, 7, 8, 9 ,10], 15, true);
        sprite.animations.play('spr');
     //   this.temp = 0;
       // this.game.time.events.loop(850, this.blink);
       // this.temp = 0;
	}
       start(){
     //   console.log('in start');
        this.game.state.start('whack_a_loadlevel');//loadlevel
    }
}


export default BootState;
