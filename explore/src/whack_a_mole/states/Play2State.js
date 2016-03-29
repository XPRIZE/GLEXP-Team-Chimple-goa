import RainbowText from '../objects/RainbowText';
import Test from "../objects/Scaling";
var myloop = 2;
var flag = true, flag1 = false;
var temp_timer;

class PlayState extends Phaser.State {

    

	create () {	
        
        this.t_obj = new Test(this.game);    
        this.widthScale = this.game.width / 1280;
        this.heightScale = this.game.height / 800;
        
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
        
        
        this.close_Coordinates = new Array;
        this.open_Coordinates = new Array;
         this.alpha_Coordinates = new Array;
        this.createWorld();
        this.score = 0;
        
        let pos = this.t_obj.getValue(80, 50, this.game.width, this.game.height);
        this.scoreLabel = new RainbowText(this.game,  pos.x, pos.y, 'Score:'+ this.score );
        this.scoreLabel.anchor.set(0.5, 0.5);
        this.scoreLabel.scale.setTo(this.widthScale, this.heightScale);
        this.time.events.loop(3000, this.showAlpha, this);
        this.right_music = this.game.add.audio('rightMusic');
        this.wrong_music = this.game.add.audio('wrongMusic');
	}
    
    
    createWorld () {
        let bg = this.game.add.image(this.game.world.centerX, this.game.world.centerY, 'Background');
        bg.anchor.setTo(0.5, 0.5);
        bg.scale.setTo(this.widthScale, this.heightScale);
        
        let pos = this.t_obj.getValue(0, 450, this.game.width, this.game.height);
        this.game.add.image(pos.x, pos.y, 'Hole_Base').scale.setTo(this.widthScale, this.heightScale);
        pos = this.t_obj.getValue(710, 420, this.game.width, this.game.height);
        this.game.add.image(pos.x, pos.y, 'Hole_Base').scale.setTo(this.widthScale, this.heightScale);
         pos = this.t_obj.getValue(1020, 520, this.game.width, this.game.height);
        this.game.add.image(pos.x, pos.y, 'Hole_Base').scale.setTo(this.widthScale, this.heightScale);
         pos = this.t_obj.getValue(490, 620, this.game.width, this.game.height);
        this.game.add.image(pos.x, pos.y, 'Hole_Base').scale.setTo(this.widthScale, this.heightScale);
         pos = this.t_obj.getValue(120, 700, this.game.width, this.game.height);
        this.game.add.image(pos.x, pos.y, 'Hole_Base').scale.setTo(this.widthScale, this.heightScale);
         pos = this.t_obj.getValue(820, 710, this.game.width, this.game.height);
        this.game.add.image(pos.x, pos.y, 'Hole_Base').scale.setTo(this.widthScale, this.heightScale);
        
        pos = this.t_obj.getValue(1100, 10, this.game.width, this.game.height);
        let ide =  this.game.add.sprite(pos.x, pos.y, this.id);
        ide.scale.setTo(this.widthScale/2 , this.heightScale/2);
        
        // hole close
        pos = this.t_obj.getValue(10, 450, this.game.width, this.game.height);
        this.close0 = this.game.add.image(pos.x, pos.y, 'Hole_Close');
        this.close0.scale.setTo(this.widthScale, this.heightScale);
        this.close0.id = 0;
         pos = this.t_obj.getValue(720, 420, this.game.width, this.game.height);
        this.close1 = this.game.add.image(pos.x, pos.y, 'Hole_Close');
        this.close1.scale.setTo(this.widthScale, this.heightScale);
        this.close1.id = 1;
         pos = this.t_obj.getValue(1030, 520, this.game.width, this.game.height);
        this.close2 = this.game.add.image(pos.x, pos.y, 'Hole_Close');
        this.close2.scale.setTo(this.widthScale, this.heightScale);
        this.close2.id = 2;
         pos = this.t_obj.getValue(500, 620, this.game.width, this.game.height);
        this.close3 = this.game.add.image(pos.x, pos.y, 'Hole_Close');
        this.close3.scale.setTo(this.widthScale, this.heightScale);
        this.close3.id = 3;
         pos = this.t_obj.getValue(130, 700, this.game.width, this.game.height);
        this.close4 = this.game.add.image(pos.x, pos.y, 'Hole_Close');
        this.close4.scale.setTo(this.widthScale, this.heightScale); 
        this.close4.id = 4;
         pos = this.t_obj.getValue(830, 710, this.game.width, this.game.height);
        this.close5 = this.game.add.image(pos.x, pos.y, 'Hole_Close')
        this.close5.scale.setTo(this.widthScale, this.heightScale);   
        this.close5.id = 5;
        this.close_Array = [this.close0, this.close1, this.close2, this.close3, this.close4, this.close5];
        this.close_Coordinates1 = [{x: 10, y: 450}, {x: 720, y: 420}, {x: 1030, y: 520},
                                    {x: 500, y:620}, {x: 130, y: 700}, {x: 830, y: 710}];
                                    
         for (let i=0; i<6; i++){
             pos = this.t_obj.getValue(this.close_Coordinates1[i].x, this.close_Coordinates1[i].y, this.game.width, this.game.height);
             this.close_Coordinates.push(pos);
         }                           
        this.open_Coordinates1 = [{x: 130, y: 460}, {x: 840, y: 430}, {x: 1150, y: 530},
                                    {x: 620, y:630}, {x: 250, y: 710}, {x: 950, y: 720}];
                                    
      for (let i=0; i<6; i++){
             pos = this.t_obj.getValue(this.open_Coordinates1[i].x, this.open_Coordinates1[i].y, this.game.width, this.game.height);
             this.open_Coordinates.push(pos);
         }
        this.alpha_Coordinates1 = [{x: 30, y: 490}, {x: 740, y: 460}, 
                                  {x: 1050, y: 560}, {x: 520, y: 660}, 
                                    {x: 150 , y: 740}, {x: 850, y: 750}];
                                    
        for (let i=0; i<6; i++){
             pos = this.t_obj.getValue(this.alpha_Coordinates1[i].x, this.alpha_Coordinates1[i].y, this.game.width, this.game.height);
             this.alpha_Coordinates.push(pos);
         }
   //     console.log("Width= " + this.game.world.width);
   //     console.log("hight= " + this.game.world.height);        
    }
    
    showAlpha () {
       this.index = Math.floor(Math.random()*100 % 6) ;
       this.key =  Math.floor(Math.random()*100 % 7) ;
       
       this.pic = this.game.add.image(this.open_Coordinates[this.index].x, this.open_Coordinates[this.index].y, 'Hole_Open');
       this.pic.anchor.setTo(0.5, 1);
       this.pic.scale.setTo(this.widthScale, this.heightScale);  
       
       this.temp_close = this.close_Array[this.index];
       console.log("kill  "+ this.close_Array[this.index]);
       this.temp_close.kill();
       
    //   console.log("in show alpha");
       
       this.alpha_Image = this.game.add.image(this.alpha_Coordinates[this.index].x, this.alpha_Coordinates[this.index].y, 
                                                     this.sprite_Image[this.key]);
       this.alpha_Image.anchor.setTo(0, 1);
       this.alpha_Image.scale.setTo(this.widthScale, this.heightScale);  
       
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
           this.game.state.start('whack_a_menu');
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