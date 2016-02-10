import Play3State from 'states/Play3State';
class LoadState extends Phaser.State {

preload () {
        this.game.load.audio('rightMusic', 'assets/Background/right.mp3');
        this.game.load.audio('wrongMusic', 'assets/Background/wrong.mp3');
        this.game.state.add('play3', Play3State, false);
		this.game.load.image('Background', 'assets/Background/play3_BG.png');
        this.game.load.image('Hole_Back', 'assets/Background/play3_Hole_Back.png');
        this.game.load.image('Hole_Front', 'assets/BackGround/play3_Hole_Front.png');
        this.game.load.tilemap('map', 'assets/BackGround/newBack.json', null, Phaser.Tilemap.TILED_JSON);
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
            this.game.load.image('K', 'assets/Alphabets/0K.png');
            this.game.load.image('L', 'assets/Alphabets/0L.png');
            this.game.load.image('M', 'assets/Alphabets/0M.png');
            this.game.load.image('N', 'assets/Alphabets/0N.png');
            this.game.load.image('O', 'assets/Alphabets/0O.png');    
        }
        if (this.game._stage == 4){
            this.game.load.image('N', 'assets/Alphabets/0N.png');
            this.game.load.image('O', 'assets/Alphabets/0O.png');
            this.game.load.image('P', 'assets/Alphabets/0P.png');
            this.game.load.image('Q', 'assets/Alphabets/0Q.png');
            this.game.load.image('R', 'assets/Alphabets/0R.png');    
        }
        if (this.game._stage == 5){
            this.game.load.image('S', 'assets/Alphabets/0S.png');
            this.game.load.image('T', 'assets/Alphabets/0T.png');
            this.game.load.image('U', 'assets/Alphabets/0U.png');
            this.game.load.image('V', 'assets/Alphabets/0V.png');
            this.game.load.image('W', 'assets/Alphabets/0W.png');    
        } 
         if (this.game._stage == 6){
            this.game.load.image('X', 'assets/Alphabets/0X.png');
            this.game.load.image('Y', 'assets/Alphabets/0Y.png');
            this.game.load.image('Z', 'assets/Alphabets/0Z.png');
            this.game.load.image('W', 'assets/Alphabets/0W.png');
            this.game.load.image('V', 'assets/Alphabets/0V.png');    
        }
	}
    
    create () {
        this.game.state.start ('play3');
        
        
    }
    
    
  /*  
	create () {
	//	this.game.add.image(0, 0, 'Background');
        this.createWorld();
        this.score = 0;
        this.scoreLabel = new RainbowText(this.game, 0, 0, 'Score: '+ this.score );
        this.scoreLabel.anchor.set(0, 0);
        this.temp_timer;
        this.time.events.loop(3000, this.showAlpha, this);
		
	}
    
    // create the world add sprite
    
    createWorld () {		
		this.map = this.game.add.tilemap('map');
        
		this.map.addTilesetImage('back', 'Background');
		this.map.addTilesetImage('Hole_Back', 'Hole_Back');
        this.map.addTilesetImage('Hole_Front', 'Hole_Front');
    
       	this.layer1 = this.map.createLayer('Tile Layer 1');
        
		this.layer2 = this.map.createLayer('Tile Layer 2');
        this.layer3 = this.map.createLayer('Tile Layer 3');
    }
    
    // show the images to the user
    
    showAlpha () {
        this.index = Math.floor(Math.random()*100 % 5) ;
        this.updatePosition();
        
        
        this.pic = this.game.add.sprite(this.newPosition.x, this.newPosition.y, this.array[this.index]);
        this.game.physics.arcade.enable(this.pic);
        this.pic.anchor.setTo(0, 0);
        this.pic.body.velocity.y = -280;
        this.pic.body.gravity.y = 200;
        this.pic.inputEnabled = true;       
        this.pic.events.onInputDown.add(this.checkLetter, this);
        
        
        

      this.layer4 = this.map.createLayer('Tile Layer 4');
      this.layer3 = this.map.createLayer('Tile Layer 3');
      
      this.temp_timer = this.game.time.events.loop(850, this.delay);
    }
    
    // random position of the alphabet images
    
    updatePosition () {
        let alphabetPosition = [{x: this.game.world.width - 1195, y: this.game.world.height - 450}, {x: this.game.world.width - 720, y: this.game.world.height - 410},
                                 {x: this.game.world.width - 225, y: this.game.world.height -  405}, {x: this.game.world.width - 480, y: this.game.world.height - 235},
                                  {x: this.game.world.width - 485, y: this.game.world.height - 220}];
        this.option = Math.floor(Math.random()* 100) % 5;
        this.newPosition = alphabetPosition[this.option] ;                        
    }
    
    // in this method delay for showing alphabet to the user 
    
    delay(){
        console.log(myloop);
        myloop -= 1;
   if(myloop == 0) {
            flag = false;
            flag1 = true;
        }
    }
    
    
    
     update() {
       if ( !(flag)){
            console.log("in update");
            console.log(this.temp_timer);
            this.game.time.events.remove(this.temp_timer);
            flag = true;
            myloop = 3;
       }
       if ( flag1){
           console.log('kill()');
          this.pic.kill();
           flag1 = false; 
       }
       
       if(this.score == 5){
           console.log('aaaaaa');
           this.scoreLabel.destroy();
           this.game.state.start('load4');
       }   
   }
   
   // check whether user click correct alphabet or not
    checkLetter() {
       this.pic.alpha = 0.5;
        if (this.array[this.index] == 'C'){
            this.score += 1;
            this.scoreLabel.text = 'Score:' + this.score;
            this.pic.kill();
        } else {
            this.score -= 1;
            if (this.score < 0){
                this.score = 0;
            }
            this.scoreLabel.text = 'Score:' + this.score ;
            this.pic.kill();
        }

    }*/
    
}
export default LoadState;
