import RainbowText from 'objects/RainbowText';

var myloop = 2;
var flag = true, flag1 = false;
var temp_timer;

class PlayState extends Phaser.State {

	create () {	
        if (this.game._stage == 1){
            this.sprite_Image = ['A', 'B', 'C', 'D', 'E', 'B','B'];
            this.char = 'B';
            this.id = 'b';
        }
        
        if (this.game._stage == 2) {
            this.sprite_Image = ['F', 'G', 'H', 'I', 'J', 'G','G'];
            this.char = 'G';
            this.id = 'g';
        }
        
        if (this.game._stage == 3) {
            this.sprite_Image = ['K', 'L', 'M', 'N', 'O', 'L','L'];
            this.char = 'L';
            this.id = 'l';
        }
        
         if (this.game._stage == 4) {
            this.sprite_Image = ['N', 'O', 'P', 'Q', 'R', 'O','O'];
            this.char = 'O';
            this.id = 'o';
        }
        
         if (this.game._stage == 5) {
            this.sprite_Image = ['S', 'T', 'U', 'V', 'W', 'T','T'];
            this.char = 'T';
            this.id = 't';
        }
        
         if (this.game._stage == 6) {
            this.sprite_Image = ['X', 'Y', 'Z', 'W', 'V', 'Y', 'Y'];
            this.char = 'Y';
            this.id = 'y';
        }
        
        
        
        this.createWorld();
        this.score = 0;
        
        this.scoreLabel = new RainbowText(this.game, 0, 0, 'Score:'+ this.score );
        this.scoreLabel.anchor.set(0, 0);
        this.time.events.loop(3000, this.showAlpha, this);
        this.right_music = this.game.add.audio('rightMusic');
        this.wrong_music = this.game.add.audio('wrongMusic');
	}
    
    
    createWorld () {
        this.game.add.image(0, 0, 'Background');
        this.game.add.image(0, 450, 'Hole_Base');
        this.game.add.image(710, 420, 'Hole_Base');
        this.game.add.image(1020, 520, 'Hole_Base');
        this.game.add.image(490, 620, 'Hole_Base');
        this.game.add.image(120, 700, 'Hole_Base');
        this.game.add.image(820, 710, 'Hole_Base');
        let ide =  this.game.add.sprite(1100, 10, this.id);
        ide.scale.setTo(0.5, 0.5);
        
        // hole close
        this.close0 = this.game.add.image(10, 450, 'Hole_Close');
        this.close0.id = 0;
        this.close1 = this.game.add.image(720, 420, 'Hole_Close');
        this.close1.id = 1;
        this.close2 = this.game.add.image(1030, 520, 'Hole_Close');
        this.close2.id = 2;
        this.close3 = this.game.add.image(500, 620, 'Hole_Close');
        this.close3.id = 3;
        this.close4 = this.game.add.image(130, 700, 'Hole_Close'); 
        this.close4.id = 4;
        this.close5 = this.game.add.image(830, 710, 'Hole_Close');   
        this.close5.id = 5;
        this.close_Array = [this.close0, this.close1, this.close2, this.close3, this.close4, this.close5];
        this.close_Coordinates = [{x: 10, y: 450}, {x: 720, y: 420}, {x: 1030, y: 520},
                                    {x: 500, y:620}, {x: 130, y: 700}, {x: 830, y: 710}];
        this.open_Coordinates = [{x: 130, y: 460}, {x: 840, y: 430}, {x: 1150, y: 530},
                                    {x: 620, y:630}, {x: 250, y: 710}, {x: 950, y: 720}];
        this.alpha_Coordinates = [{x: this.game.world.width - 1250, y: this.game.world.height - 310}, {x: this.game.world.width - 540, y: this.game.world.height - 340}, 
                                  {x: this.game.world.width - 230, y: this.game.world.height - 240}, {x: this.game.world.width - 760, y: this.game.world.height - 140}, 
                                    {x: this.game.world.width - 1130 , y: this.game.world.height - 60}, {x: this.game.world.width - 430, y: this.game.world.height - 50}];
   //     console.log("Width= " + this.game.world.width);
   //     console.log("hight= " + this.game.world.height);        
    }
    
    showAlpha () {
       this.index = Math.floor(Math.random()*100 % 6) ;
       this.key =  Math.floor(Math.random()*100 % 7) ;
       
       this.pic = this.game.add.image(this.open_Coordinates[this.index].x, this.open_Coordinates[this.index].y, 'Hole_Open');
       this.pic.anchor.setTo(0.5, 1);
       
       this.temp_close = this.close_Array[this.index];
       this.temp_close.kill();
       
    //   console.log("in show alpha");
       
       this.alpha_Image = this.game.add.image(this.alpha_Coordinates[this.index].x, this.alpha_Coordinates[this.index].y, 
                                                     this.sprite_Image[this.key]);
       this.alpha_Image.anchor.setTo(0, 1);
       
       this.alpha_Image.inputEnabled = true; 
        
        this.alpha_Image.events.onInputDown.add(this.checkLetter, this);
       
       
       temp_timer = this.game.time.events.loop(1000, this.delay);
    }
    
    killAlpha () {
        this.pic.kill();
        this.alpha_Image.kill();
        this.temp_close.reset(this.close_Coordinates[this.index].x, this.close_Coordinates[this.index].y);
   //     console.log("in kill alpha");
        
    }
    
    delay(){
   //     console.log(myloop);
        myloop -= 1;
   if(myloop == 0) {
            flag = false;
            flag1 = true;
        }
   }
   update() {
       if ( !(flag)){
     //       console.log("in update");
            this.game.time.events.remove(temp_timer);
            flag = true;
            myloop = 2;
       }
       if ( flag1){
           this.killAlpha();
           flag1 = false; 
       }  
       if(this.score == 5){
      //     console.log('aaaaaa');
           this.game._stage = 0;
           this.scoreLabel.destroy();
           this.game.state.start('menu');
       }    
   }
   
   
   checkLetter() {
       this.alpha_Image.alpha = 0.5;
     //  console.log(" this.char = "+this.char);
      if (this.sprite_Image[this.key] == this.char){
            this.right_music.play();
            this.score += 1;
            this.scoreLabel.text = 'Score:' + this.score ;
            this.alpha_Image.kill();
        } else {
            this.wrong_music.play();
            this.score -= 1;
            if (this.score < 0){
                this.score = 0;
            }
            this.scoreLabel.text = 'Score:' + this.score ;
            this.alpha_Image.kill();
        }
   }
    
}
export default PlayState;