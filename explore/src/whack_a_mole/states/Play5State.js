import RainbowText from '../objects/RainbowText';
import Test from "../objects/Scaling";

class PlayState extends Phaser.State {
    
	create () {
        
     this.t_obj = new Test(this.game);    
     this.widthScale = this.game.width / 1280;
     this.heightScale = this.game.height / 800;
     
         if (this.game._stage == 1){
            this.array = ['A', 'B', 'C', 'D', 'E', 'E', 'E'];
            this.char = 'E';
            this.id = 'e';
        }
        
        if (this.game._stage == 2) {
            this.array = ['F', 'G', 'H', 'I', 'J', 'J', 'J'];
            this.char = 'J';
            this.id = 'j';
        }
         if (this.game._stage == 3) {
            this.array = ['N', 'O', 'P', 'Q', 'R', 'R', 'R'];
            this.char = 'R';
            this.id = 'r';
        }
        
         if (this.game._stage == 4) {
            this.array = ['S', 'T', 'U', 'V', 'W', 'W', 'W'];
            this.char = 'W';
            this.id ='w';
        }
	//	this.game.add.image(0, 0, 'Background');
      //  this.array = ['A', 'B', 'C','A','B'];
        this.createWorld();
        this.score = 0;
        
         let pos = this.t_obj.getValue(80, 50, this.game.width, this.game.height);
        this.scoreLabel = new RainbowText(this.game, pos.x, pos.y, 'Score: '+ this.score );
        this.scoreLabel.anchor.set(0.5, 0.5);
        this.scoreLabel.scale.setTo(this.widthScale, this.heightScale);
         
        
        this.time.events.loop(5000, this.showAlpha, this);
        
        this.right_music = this.game.add.audio('rightMusic');
        this.wrong_music = this.game.add.audio('wrongMusic');
        
		
	}
    update (){
        
        if(this.score == 5){
      //     console.log('aaaaaa');
           this.scoreLabel.destroy();
           this.game._stage = 0;
           this.game.state.start('whack_a_menu');
       }
       
    }
    createWorld () {
		this.map = this.game.add.tilemap('map');
        
		this.map.addTilesetImage('back', 'Background');
		this.map.addTilesetImage('Hole_back', 'Hole_Back');
        this.map.addTilesetImage('Hole_front', 'Hole_Front');
    
       	this.layer1 = this.map.createLayer('Tile Layer 1');
        this.layer1.scale.setTo(this.widthScale, this.heightScale);   
           
        this.layer2 = this.map.createLayer('Tile Layer 2');
        this.layer2.scale.setTo(this.widthScale, this.heightScale);
        
        
		this.layer3 = this.map.createLayer('Tile Layer 3');
        this.layer3.scale.setTo(this.widthScale, this.heightScale);
        
        
       let pos = this.t_obj.getValue(1100, 10,this.game.width,this.game.height);
       let ide =  this.game.add.sprite(pos.x, pos.y, this.id);
       ide.scale.setTo(this.widthScale/2 , this.heightScale/2);
        
        
   //     this.layer4 = this.map.createLayer('Tile Layer 4');
		
		//this.layer.resizeWorld();
		
	//	this.map.setCollision(1);
    
    }
    
    showAlpha () {
      //  let key;
        this.index = Math.floor(Math.random()*100 % 7) ;
      /*   for(key of this.array){
            this.pic = this.game.add.sprite(340, 340, key);
            
           console.log(key);
        }*/
      //  console.log(index);
        this.updatePosition();
        this.pic = this.game.add.sprite(this.newPosition.x, this.newPosition.y, this.array[this.index]);
     //   this.game.pics = this.pic;
        this.game.physics.arcade.enable(this.pic);
        this.pic.anchor.setTo(0, 0);
        this.pic.scale.setTo(this.widthScale, this.heightScale);
        let pos = this.t_obj.getValue(0,250,this.game.width,this.game.height);
        
        this.pic.body.velocity.y = - (pos.y);
        
        pos = this.t_obj.getValue(0,200,this.game.width,this.game.height);
        this.pic.body.gravity.y = (pos.y);
        this.pic.inputEnabled = true; 
        
        this.pic.events.onInputDown.add(this.checkLetter, this);
        
  //      console.log("type of object is : "+typeof(this.game.pics));
        
        
        
        this.killSprite(this.pic);
      
     
      
      /*  temp.anchor.setTo(0, 0);
        temp.reset(340, 340);
        temp.body.velocity.y = -300;
        temp.body.gravity.y = 200;?*/
    //    console.log(this.option);
         
        if (this.option < 3){
    //        console.log('IN OPTION');
            this.layer4 = this.map.createLayer('Tile Layer 4');
            this.layer4.scale.setTo(this.widthScale, this.heightScale);
           
        } else{
            
              this.layer5 = this.map.createLayer('Tile Layer 5');   
              this.layer5.scale.setTo(this.widthScale, this.heightScale);       
        }
        
       pos = this.t_obj.getValue(1100, 10,this.game.width,this.game.height);
       let ide =  this.game.add.sprite(pos.x, pos.y, this.id);
       ide.scale.setTo(this.widthScale/2 , this.heightScale/2);
        
     
       
    //    this.layer1 = this.map.createLayer('Tile Layer 1');
      this.layer3 = this.map.createLayer('Tile Layer 3');
      this.layer3.scale.setTo(this.widthScale, this.heightScale);
    //    this.layer3 = this.map.createLayer('Tile Layer 3');
     //  this.layer4 = this.map.createLayer('Tile Layer 4');
     
   //   this.pic.kill();
     
        
    }
    
    checkLetter() {
       this.pic.alpha = 0.5;
        if (this.array[this.index] == this.char){
            this.right_music.play();
            this.score += 1;
            this.scoreLabel.text = 'Score:' + this.score ;
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
   //     console.log("in check letter");
    }
    
    updatePosition () {
        let alphabetPosition1 = [{x: 350, y: 280}, {x: 770, y: 280},
                                 {x: 560, y: 400}, {x: 250, y: 560},
                                  {x: 860, y: 560}];
         let alphabetPosition = new Array;
        let pos;
        for (let i = 0;i<5; i++){
            pos = this.t_obj.getValue(alphabetPosition1[i].x, alphabetPosition1[i].y, this.game.width, this.game.height)
            alphabetPosition.push(pos);
        }
        this.option = Math.floor(Math.random()* 100) % 5;
        this.newPosition = alphabetPosition[this.option] ;                        
    }
    
    killSprite(image){
        
        setTimeout(function() {
          image.kill();
      }, 2400);
    }
}
export default PlayState;
