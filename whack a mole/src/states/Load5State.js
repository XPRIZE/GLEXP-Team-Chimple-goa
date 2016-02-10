import Play5State from 'states/Play5State.js';
class LoadState extends Phaser.State {

preload () {
        this.game.load.audio('rightMusic', 'assets/Background/right.mp3');
        this.game.load.audio('wrongMusic', 'assets/Background/wrong.mp3');
        this.game.state.add('play5', Play5State, false);
		this.game.load.image('Background', 'assets/Background/play1_BG.png');
        this.game.load.image('Hole_Back', 'assets/Background/play1_Hole_Back.png');
        this.game.load.image('Hole_Front', 'assets/BackGround/play1_Hole_Front.png');
        this.game.load.tilemap('map', 'assets/BackGround/newMap1.json', null, Phaser.Tilemap.TILED_JSON);
         if (this.game._stage == 1) {
            this.game.load.image('A', 'assets/Alphabets/0A.png');
            this.game.load.image('B', 'assets/Alphabets/0B.png');
            this.game.load.image('C', 'assets/Alphabets/0C.png');
            this.game.load.image('D', 'assets/Alphabets/0D.png');
            this.game.load.image('E', 'assets/Alphabets/0E.png');
        } 
        if (this.game._stage == 2) {
            this.game.load.image('F', 'assets/Alphabets/0F.png');
            this.game.load.image('G', 'assets/Alphabets/0G.png');
            this.game.load.image('H', 'assets/Alphabets/0H.png');
            this.game.load.image('I', 'assets/Alphabets/0I.png');
            this.game.load.image('J', 'assets/Alphabets/0J.png');
        }
        if (this.game._stage == 3){
            this.game.load.image('N', 'assets/Alphabets/0N.png');
            this.game.load.image('O', 'assets/Alphabets/0O.png');
            this.game.load.image('P', 'assets/Alphabets/0P.png');
            this.game.load.image('Q', 'assets/Alphabets/0Q.png');
            this.game.load.image('R', 'assets/Alphabets/0R.png');    
        }
        if (this.game._stage == 4){
            this.game.load.image('S', 'assets/Alphabets/0S.png');
            this.game.load.image('T', 'assets/Alphabets/0T.png');
            this.game.load.image('U', 'assets/Alphabets/0U.png');
            this.game.load.image('V', 'assets/Alphabets/0V.png');
            this.game.load.image('W', 'assets/Alphabets/0W.png');    
        }
	}
    
    create () {
        this.game.state.start('play5');
    }
    
    /*
	create () {
	//	this.game.add.image(0, 0, 'Background');
        this.createWorld();
        this.score = 0;
        this.scoreLabel = new RainbowText(this.game, 0, 0, 'Score: '+ this.score);
        this.scoreLabel.anchor.set(0, 0);
        this.time.events.loop(5000, this.showAlpha, this);
        
		
	}
    update (){
        
        if(this.score == 5){
           console.log('aaaaaa');
           this.scoreLabel.destroy();
           this.game.state.start('load2');
       }
       
    }
    createWorld () {
        
 /*       this.game.add.image(0, 0, 'Background');
        this.game.add.image()
        */
 /*       this.game.add.sprite(0, 0, 'Background');
        this.game.add.sprite(780, 330, 'Hole_Back');
        this.game.add.sprite(550, 410, 'Hole_Back');
        this.game.add.sprite(800, 550, 'Hole_Back');
        this.game.add.sprite(290, 340, 'Hole_Back');
        this.game.add.sprite(240, 550, 'Hole_Back'); 
        
		
		this.map = this.game.add.tilemap('map');
        
		this.map.addTilesetImage('back', 'Background');
		this.map.addTilesetImage('Hole_back', 'Hole_Back');
        this.map.addTilesetImage('Hole_front', 'Hole_Front');
    
       	this.layer1 = this.map.createLayer('Tile Layer 1');
        this.layer3 = this.map.createLayer('Tile Layer 3');
		this.layer2 = this.map.createLayer('Tile Layer 2');
        
        
   //     this.layer4 = this.map.createLayer('Tile Layer 4');
		
		//this.layer.resizeWorld();
		
	//	this.map.setCollision(1);
    
    }
    
    showAlpha () {
      //  let key;
        this.index = Math.floor(Math.random()*100 % 5) ;
      /*   for(key of this.array){
            this.pic = this.game.add.sprite(340, 340, key);
            
           console.log(key);
        }///
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
        temp.body.gravity.y = 200;?
        console.log(this.option);
         
        if (this.option < 3){
    //        console.log('IN OPTION');
            this.layer4 = this.map.createLayer('Tile Layer 4');
           
        } else{
              this.layer5 = this.map.createLayer('Tile Layer 5');          
        }
        
     
       
    //    this.layer1 = this.map.createLayer('Tile Layer 1');
      this.layer2 = this.map.createLayer('Tile Layer 2');
    //    this.layer3 = this.map.createLayer('Tile Layer 3');
     //  this.layer4 = this.map.createLayer('Tile Layer 4');
     
   //   this.pic.kill();
     
        
    }
    
    checkLetter() {
       this.pic.alpha = 0.5;
        if (this.array[this.index] == 'A'){
            this.score += 1;
            this.scoreLabel.text = 'Score:' + this.score ;
            this.pic.kill();
        } else {
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
    } */
}
export default LoadState;
