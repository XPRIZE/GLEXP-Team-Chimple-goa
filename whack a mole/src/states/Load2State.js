
class LoadState extends Phaser.State {
  
preload () {
        
        this.game.load.audio('rightMusic', 'assets/Background/right.mp3');
        this.game.load.audio('wrongMusic', 'assets/Background/wrong.mp3');
		this.game.load.image('Background', 'assets/Background/play2_BG.png');
        this.game.load.image('Hole_Base', 'assets/Background/play2_Hole_base.png');
        this.game.load.image('Hole_Close', 'assets/BackGround/play2_Hole_Close.png');
        this.game.load.image('Hole_Open', 'assets/BackGround/play2_Hole_Open.png'); 
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
        console.log(this.game._stage);
	}
    
    create () {
        this.game.state.start('play2');
    }
    
    
  /*  
	create () {	
        this.createWorld();
        this.score = 0;
        
        this.scoreLabel = new RainbowText(this.game, 0, 0, 'Score:'+ this.score );
        this.scoreLabel.anchor.set(0, 0);
        this.time.events.loop(3000, this.showAlpha, this);
	}
    
    
    createWorld () {
        this.game.add.image(0, 0, 'Background');
        this.game.add.image(0, 450, 'Hole_Base');
        this.game.add.image(710, 420, 'Hole_Base');
        this.game.add.image(1020, 520, 'Hole_Base');
        this.game.add.image(490, 620, 'Hole_Base');
        this.game.add.image(120, 700, 'Hole_Base');
        this.game.add.image(820, 710, 'Hole_Base');
        
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
        console.log("Width= " + this.game.world.width);
        console.log("hight= " + this.game.world.height);        
    }
    
    showAlpha () {
       this.index = Math.floor(Math.random()*100 % 6) ;
       this.key =  Math.floor(Math.random()*100 % 6) ;
       
       this.pic = this.game.add.image(this.open_Coordinates[this.index].x, this.open_Coordinates[this.index].y, 'Hole_Open');
       this.pic.anchor.setTo(0.5, 1);
       
       this.temp_close = this.close_Array[this.index];
       this.temp_close.kill();
       
       console.log("in show alpha");
       
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
        console.log("in kill alpha");
        
    }
    
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
            this.game.time.events.remove(temp_timer);
            flag = true;
            myloop = 2;
       }
       if ( flag1){
           this.killAlpha();
           flag1 = false; 
       }  
       if(this.score == 5){
           console.log('aaaaaa');
           this.scoreLabel.destroy();
           this.game.state.start('load3');
       }    
   }
   
   
   checkLetter() {
       this.alpha_Image.alpha = 0.5;
        if (this.sprite_Image[this.key] == 'B'){
            this.score += 1;
            this.scoreLabel.text = 'Score:' + this.score ;
            this.alpha_Image.kill();
        } else {
            this.score -= 1;
            if (this.score < 0){
                this.score = 0;
            }
            this.scoreLabel.text = 'Score:' + this.score ;
            this.alpha_Image.kill();
        }
   }
   */
   
};

export default LoadState;
