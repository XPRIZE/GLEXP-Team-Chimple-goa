import RainbowText from '../objects/RainbowText';
import Test from "../objects/Scaling";

var myloop = 3;
var flag = true, flag1 = false;

class PlayState extends Phaser.State {

// backgroun 4

create () {
    
     this.t_obj = new Test(this.game);    
     this.widthScale = this.game.width / 1280;
     this.heightScale = this.game.height / 800;
    
	//	this.game.add.image(0, 0, 'Background');
     if (this.game._stage == 1){
            this.array = ['A', 'B', 'C', 'D', 'E', 'D', 'D'];
            this.char = 'D';
            this.id = 'd';
        }
        
        if (this.game._stage == 2) {
            this.array = ['F', 'G', 'H', 'I', 'J', 'I', 'I'];
            this.char = 'I';
            this.id = 'i';
        }
        
        if (this.game._stage == 3) {
            this.array = ['K', 'L', 'M', 'N', 'O', 'N', 'N'];
            this.char = 'N';
            this.id = 'n';
        }
        
         if (this.game._stage == 4) {
            this.array = ['N', 'O', 'P', 'Q', 'R', 'Q', 'Q'];
            this.char = 'Q';
            this.id = 'q';
        }
        
         if (this.game._stage == 5) {
            this.array = ['S', 'T', 'U', 'V', 'W', 'V', 'V'];
            this.char = 'V';
            this.id = 'v';
        }
        
      //  this.array = ['A', 'B', 'C','D','E'];
        this.createWorld();
         this.score = 0;
         
        let pos = this.t_obj.getValue(80, 50, this.game.width, this.game.height);
        this.scoreLabel = new RainbowText(this.game, pos.x, pos.y, 'Score: '+ this.score );
        this.scoreLabel.anchor.set(0.5, 0.5);
        this.scoreLabel.scale.setTo(this.widthScale, this.heightScale);
         
        this.temp_timer;
        this.time.events.loop(3000, this.showAlpha, this);
        
        this.right_music = this.game.add.audio('rightMusic');
        this.wrong_music = this.game.add.audio('wrongMusic');
		
	}
    
    // create the world add sprite
    
    createWorld () {		
		this.map = this.game.add.tilemap('map');
        
		this.map.addTilesetImage('back', 'Background');
		this.map.addTilesetImage('Hole_Back', 'Hole_Back');
        this.map.addTilesetImage('Hole_Front', 'Hole_Front');
    
       	this.layer1 = this.map.createLayer('Tile Layer 1');
        this.layer1.scale.setTo(this.widthScale, this.heightScale);
        
        this.layer2 = this.map.createLayer('Tile Layer 2');
        this.layer2.scale.setTo(this.widthScale, this.heightScale);
        
		this.layer3 = this.map.createLayer('Tile Layer 3');
        this.layer3.scale.setTo(this.widthScale, this.heightScale);
        
       let pos = this.t_obj.getValue(1100, 10,this.game.width,this.game.height);
       let ide =  this.game.add.sprite(pos.x, pos.y, this.id);
        ide.scale.setTo(this.widthScale/2 , this.heightScale/2);
    }
    
    // show the images to the user
    
    showAlpha () {
        this.index = Math.floor(Math.random()*100 % 7) ;
        this.updatePosition();
        
        
        this.pic = this.game.add.sprite(this.newPosition.x, this.newPosition.y, this.array[this.index]);
        this.game.physics.arcade.enable(this.pic);
        this.pic.anchor.setTo(0, 0);
        this.pic.scale.setTo(this.widthScale, this.heightScale);
        let pos = this.t_obj.getValue(0,280,this.game.width,this.game.height);
        
        this.pic.body.velocity.y = - (pos.y);
        
        pos = this.t_obj.getValue(0,200,this.game.width,this.game.height);
        this.pic.body.gravity.y = (pos.y);
        this.pic.inputEnabled = true;       
        this.pic.events.onInputDown.add(this.checkLetter, this);
        
        
        

      this.layer4 = this.map.createLayer('Tile Layer 4');
       this.layer4.scale.setTo(this.widthScale, this.heightScale);
      this.layer3 = this.map.createLayer('Tile Layer 3');
       this.layer3.scale.setTo(this.widthScale, this.heightScale);
       
       pos = this.t_obj.getValue(1100, 10,this.game.width,this.game.height);
       let ide =  this.game.add.sprite(pos.x, pos.y, this.id);
       ide.scale.setTo(this.widthScale/2 , this.heightScale/2);
      this.temp_timer = this.game.time.events.loop(850, this.delay);
    }
    
    // random position of the alphabet images
    
    updatePosition () {
        let alphabetPosition1 = [{x: 30, y: 440}, {x: 550, y: 440},
                                 {x: 1050, y: 440}, {x: 290, y: 620},
                                  {x: 830, y: 620}];
        let alphabetPosition = new Array;
        let pos;
        for (let i = 0;i<5; i++){
            pos = this.t_obj.getValue(alphabetPosition1[i].x, alphabetPosition1[i].y, this.game.width, this.game.height)
            alphabetPosition.push(pos);
        }
        this.option = Math.floor(Math.random()* 100) % 5;
        this.newPosition = alphabetPosition[this.option] ;                        
    }
    
    // in this method delay for showing alphabet to the user 
    
    delay(){
    //    console.log(myloop);
        myloop -= 1;
   if(myloop == 0) {
            flag = false;
            flag1 = true;
        }
    }
    
    
    
     update() {
       if ( !(flag)){
        //    console.log("in update");
        //    console.log(this.temp_timer);
            this.game.time.events.remove(this.temp_timer);
            flag = true;
            myloop = 3;
       }
       if ( flag1){
      //     console.log('kill()');
          this.pic.kill();
           flag1 = false; 
       }
       
       if(this.score == 5){
     //      console.log('aaaaaa');
           this.game._stage = 0;
           this.scoreLabel.destroy();
           this.game.state.start('whack_a_menu');
       }
   }
   
   // check whether user click correct alphabet or not
    checkLetter() {
       this.pic.alpha = 0.5;
        if (this.array[this.index] == this.char){
             this.right_music.play();
            this.score += 1;
            this.scoreLabel.text = 'Score:' + this.score;
            this.pic.kill();
        } else {
            this.wrong_music.play();
            this.score -= 1;
            if (this.score < 0){
                this.score = 0;
            }
            this.scoreLabel.text = 'Score:' + this.score ;
            this.pic.kill();
        }

    }
    


}
export default PlayState;
