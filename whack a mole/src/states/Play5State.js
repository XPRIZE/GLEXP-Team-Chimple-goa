import RainbowText from 'objects/RainbowText';
class PlayState extends Phaser.State {
    
	create () {
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
        this.scoreLabel = new RainbowText(this.game, 0, 0, 'Score: '+ this.score);
        this.scoreLabel.anchor.set(0, 0);
        this.time.events.loop(5000, this.showAlpha, this);
        
        this.right_music = this.game.add.audio('rightMusic');
        this.wrong_music = this.game.add.audio('wrongMusic');
        
		
	}
    update (){
        
        if(this.score == 5){
      //     console.log('aaaaaa');
           this.scoreLabel.destroy();
           this.game._stage = 0;
           this.game.state.start('menu');
       }
       
    }
    createWorld () {
		this.map = this.game.add.tilemap('map');
        
		this.map.addTilesetImage('back', 'Background');
		this.map.addTilesetImage('Hole_back', 'Hole_Back');
        this.map.addTilesetImage('Hole_front', 'Hole_Front');
    
       	this.layer1 = this.map.createLayer('Tile Layer 1');
        this.layer3 = this.map.createLayer('Tile Layer 3');
		this.layer2 = this.map.createLayer('Tile Layer 2');
        let ide =  this.game.add.sprite(1150, 10, this.id);
        ide.scale.setTo(0.5, 0.5);
        
        
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
        this.pic.anchor.setTo(0, 1);
        this.pic.body.velocity.y = -250;
        this.pic.body.gravity.y = 200;
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
           
        } else{
              this.layer5 = this.map.createLayer('Tile Layer 5');          
        }
        
        let ide =  this.game.add.sprite(1150, 10, this.id);
        ide.scale.setTo(0.5, 0.5);
        
     
       
    //    this.layer1 = this.map.createLayer('Tile Layer 1');
      this.layer2 = this.map.createLayer('Tile Layer 2');
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
        let alphabetPosition = [{x: 309, y: 550}, {x: 569, y: 620},
                                 {x: 799, y: 540}, {x: 259, y: 760},
                                  {x: 819, y: 760}];
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
