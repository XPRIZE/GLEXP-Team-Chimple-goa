import RainbowText from 'objects/RainbowText';
//import Dictionary from 'objects/Dictionary';

//var updatePosition_char;
//var count = 0;
var delay_loop = 5;
var delay_flag  = false;

class GameState extends Phaser.State {
preload(){
           

    this.game.load.image('Background','assets/Background.png');
    this.game.load.image('Bottom_Background','assets/Bottom_Background.png');
    this.game.load.image('Top_Background','assets/Top_Background.png');
    this.game.load.image('Score_Board','assets/Score_Board.png');
    this.game.load.image('cloud_01','assets/cloud_01.png');
    this.game.load.image('cloud_02','assets/cloud_02.png');
    this.game.load.image('cloud_03','assets/cloud_03.png');
    this.game.load.image('cloud_04','assets/cloud_04.png');
    this.game.load.image('cloud_05','assets/cloud_05.png');
    this.game.load.spritesheet('char_animation','assets/char_animation.png',137,133);
    this.game.load.image('Ball','assets/Ball.png');
    
    this.game.load.image('A','assets/Alphabets/A.png');
    this.game.load.image('B','assets/Alphabets/B.png');
    this.game.load.image('C','assets/Alphabets/C.png');
    this.game.load.image('D','assets/Alphabets/D.png');
    this.game.load.image('E','assets/Alphabets/E.png');
    this.game.load.image('F','assets/Alphabets/F.png');
    this.game.load.image('G','assets/Alphabets/G.png');
    this.game.load.image('H','assets/Alphabets/H.png');
    this.game.load.image('I','assets/Alphabets/I.png');
    this.game.load.image('J','assets/Alphabets/K.png');
    this.game.load.image('K','assets/Alphabets/K.png');
    this.game.load.image('L','assets/Alphabets/L.png');
    this.game.load.image('M','assets/Alphabets/M.png');
    this.game.load.image('N','assets/Alphabets/N.png');
    this.game.load.image('O','assets/Alphabets/O.png');
    this.game.load.image('P','assets/Alphabets/P.png');
    this.game.load.image('Q','assets/Alphabets/Q.png');
    this.game.load.image('R','assets/Alphabets/R.png');
    this.game.load.image('S','assets/Alphabets/S.png');
    this.game.load.image('T','assets/Alphabets/T.png');
    this.game.load.image('U','assets/Alphabets/U.png');
    this.game.load.image('V','assets/Alphabets/V.png');
    this.game.load.image('W','assets/Alphabets/W.png');
    this.game.load.image('X','assets/Alphabets/X.png');
    this.game.load.image('Y','assets/Alphabets/Y.png');
    this.game.load.image('Z','assets/Alphabets/Z.png');
   
    
    
    this.game.load.audio('jumping',['assets/jumping_teon.mp3']); 
    
    this.game.load.image('cross','assets/Cross_Button.png');
    this.game.load.image('tick','assets/Tick_Button.png');
    this.game.load.image('hint','assets/Hint_Button.png');
    this.game.load.image('refresh','assets/Refresh_Button.png');
    this.game.load.image('character','assets/characters.png');
    this.game.load.image('step','assets/Step.png');
}
	create() {
        this.counta=0;
        this.score=0;
        this.gameScore=0;
        this.flag1 = 0;
        this.str = new Array();    
        this.containObject = new Array();   
        this.containLetter = new Array();  
        this.randomWordArray = [];
        this.wrong_array=[];
        this.dict_word=[];
        this.hint_array=[];
        //this.game._character.alpha=0;
       this.jumpSound = this.game.add.audio('jumping');
        this.game.add.sprite(0,0,'Top_Background');
       
       this.scoreBoard= this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'Score_Board');
       this.scoreBoard.anchor.setTo(0.5,0.5);
       
       var cloud1= this.game.add.sprite(-100,10,'cloud_01');
       this.game.physics.arcade.enable(cloud1);
       var tweenC1 = this.game.add.tween(cloud1);
       tweenC1.to({x: 800}, 8000).loop().start();
   
       var cloud2= this.game.add.sprite(900,200,'cloud_02');
       this.game.physics.arcade.enable(cloud2);
       var tweenC2 = this.game.add.tween(cloud2);
       tweenC2.to({x:-100}, 5000).loop().start();
       
       var cloud3= this.game.add.sprite(-100,400,'cloud_03');
       this.game.physics.arcade.enable(cloud3);
       var tweenC3 = this.game.add.tween(cloud3);
       tweenC3.to({x: 800}, 6000).loop().start();
       
       var cloud4= this.game.add.sprite(900,800,'cloud_04');
       this.game.physics.arcade.enable(cloud4);
       var tweenC4 = this.game.add.tween(cloud4);
       tweenC4.to({x: -100}, 7000).loop().start();
        
        this.createScore();
        this.game._character= this.game.add.sprite(300,830,'char_animation');
        this.game.physics.arcade.enable(this.game._character);
        this.game._character.animations.add('char_animation',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19], 20, false);       
         //this.game._character.body.gravity.y =300;
         
         this.game._step1 = this.game.add.sprite(590,657,'step');
         this.game._step2 = this.game.add.sprite(590,354,'step');
         
         this.game._step3 = this.game.add.sprite(0,506,'step');
         this.game._step4 = this.game.add.sprite(0,203,'step');
         this.game._step6= this.game.add.sprite(590,-100,'step');
         this.game._step5= this.game.add.sprite(0,-100,'step');
          this.game._step8= this.game.add.sprite(590,-100,'step');
         this.game._step7= this.game.add.sprite(0,-100,'step');
         
         
        this.game.add.sprite(0,960,'Bottom_Background');
     
        
        
	    this.ball1 = this.game.add.sprite(110,1187,'Ball');
        this.ball2 = this.game.add.sprite(210,1187,'Ball');
        this.ball3 = this.game.add.sprite(310,1187,'Ball');
        this.ball4 = this.game.add.sprite(410,1187,'Ball');
        this.ball5 = this.game.add.sprite(510,1187,'Ball');
        this.ball6 = this.game.add.sprite(600,1187,'Ball');
        
        this.consonants=['B','C','D','F','G','H','J','K','L','M','N','P','Q','R','S','T','V','W','X','Y','Z'];
        this.vowels=['A','E','I','O','U'];
       
       
        this.randomWords=this.generateRandomLetters(6,this.randomWordArray);
        
       
  
      this.alphabet1= this.game.add.sprite(110,1185, this.randomWordArray[0]);        
      this.alphabet2= this.game.add.sprite(210,1185, this.randomWordArray[1]);
      this.alphabet3= this.game.add.sprite(310,1185, this.randomWordArray[2]);
      this.alphabet4= this.game.add.sprite(410,1185, this.randomWordArray[3]);
      this.alphabet5= this.game.add.sprite(510,1185, this.randomWordArray[4]);
      this.alphabet6= this.game.add.sprite(600,1185, this.randomWordArray[5]);
        
       
         
         
         this.array_step_left = [this.game._step7,this.game._step5, this.game._step4, this.game._step3 ];
         this.array_step_right = [this.game._step8,this.game._step6, this.game._step2, this.game._step1];   
         this.step_index = 1;
         
         this.game.physics.arcade.enable(this.game._step3);
         this.game._step3.body.immovable = true;
         this.game.physics.arcade.enable(this.game._step2);
         this.game._step2.body.immovable = true;
         this.game.physics.arcade.enable(this.game._step1);
         this.game._step1.body.immovable = true;
         this.game.physics.arcade.enable(this.game._step4);
         this.game._step4.body.immovable = true;
         this.game.physics.arcade.enable(this.game._step5);
         this.game._step5.body.immovable = true;
         this.game.physics.arcade.enable(this.game._step6);
         this.game._step6.body.immovable = true;
         this.game.physics.arcade.enable(this.game._step7);
         this.game._step7.body.immovable = true;
         this.game.physics.arcade.enable(this.game._step8);
         this.game._step8.body.immovable = true;
         
         this.stepPosition=[-100, 203, 354, 506, 657,811,960, 1300]; //-100, 203, 354, 506, 657, 811, 960, 1300
         this.temp=0;
         this.updatePosition_char = [{x:600, y: 524}, {x: 30, y: 373},{x:600, y: 500}];
         this.count=0;
         this. even = 0;
         this.odd = 0;
         
        // {x: 10, y: 500},{x:590,y:380},{x:10,y:250},{x:590,y:120},{x:10,y:5}];
        let cross = this.game.add.sprite(700,1187, 'cross');
        
        cross.inputEnabled= true;
        cross.events.onInputDown.add(this.crossButton, this); 
        
        this.tick = this.game.add.sprite(700,1087, 'tick');
       
        this.tick.inputEnabled= true;
        //tick.events.onInputDown.add(this.tickButton, this); 
        
        let hint = this.game.add.sprite(5,1087, 'hint');
        hint.inputEnabled= false;
        if(this.containLetter.length == 0) 
        {
            hint.inputEnabled= true;
        }
        hint.events.onInputDown.add(this.hintButton, this); 
        
        let refresh = this.game.add.sprite(5,1187, 'refresh');
        refresh.inputEnabled = true;
        refresh.events.onInputDown.add(this.refreshButton, this); 
        
         this.ball1.inputEnabled=true;
         this.ball1.id = 0;
          
          this.ball2.inputEnabled=true; 
          this.ball2.id = 1;

          this.ball3.inputEnabled=true;
          this.ball3.id = 2;
          
          this.ball4.inputEnabled=true;
          this.ball4.id = 3;

          this.ball5.inputEnabled=true;
          this.ball5.id = 4;

          this.ball6.inputEnabled=true;
          this.ball6.id = 5;
          
         this.ball1.events.onInputDown.add(this.pos, this); 
         this.ball2.events.onInputDown.add(this.pos, this);  
         this.ball3.events.onInputDown.add(this.pos, this);   
         this.ball4.events.onInputDown.add(this.pos, this); 
         this.ball5.events.onInputDown.add(this.pos, this); 
         this.ball6.events.onInputDown.add(this.pos, this);  
       //  console.log(this.pos);
         this.containObject.push(this.ball1);
         this.containObject.push(this.ball2);
         this.containObject.push(this.ball3);
         this.containObject.push(this.ball4);
         this.containObject.push(this.ball5);
         this.containObject.push(this.ball6);
         
         this.position=[{x:110,y:1090}, {x:210,y:1090}, {x:310,y:1090}, {x:410,y:1090},{x:510,y:1090}, {x:600,y:1090}];
         this.containerposition=[{x:110,y:1185}, {x:210,y:1185}, {x:310,y:1185}, {x:410,y:1185},{x:510,y:1185}, {x:600,y:1185}];
         //this.elements=['A','E','C','D','T','S'];
        
         this.wordArray=['ABACUS','AT','AA','ANT','AE','AI','AO','AU','AP','AN','AB','AC','AD','AS','AF','BAD','BAT','CA','SR','CAT','CAR','SEA','SEE'];
         this.rewordArray=['ABACUS','AT','AA','ANT','AE','AI','AO','AU','AP','AN','AB','AC','AD','AS','AF','BAD','BAT','CA','SR','CAT','CAR','SEA','SEE'];
         this.set=true;
         
         this.delay_loop = 5;
         this.delay_flag1 = false;
         this.delay_timer;
         
         
        this.showHint = this.game.add.text(350,990,'', { font: "65px Arial", fill: "#ffffff" });
        this.showHint.alpha = 0;
         
 }
 
 refreshButton(){
     for( let i=0;i<this.wrong_array.length;i++){
    this.wrong_array[i].kill();
     }
     this.counta=0;
     this.randomWordArray.splice(0,6);
     //console.log(this.randomWordArray);
     this.alphabet1.kill();
     this.alphabet2.kill();
     this.alphabet3.kill();
     this.alphabet4.kill();
     this.alphabet5.kill();
     this.alphabet6.kill();
      this.randomWords=this.generateRandomLetters(6,this.randomWordArray);
      // console.log(this.randomWordArray);
      this.alphabet1= this.game.add.sprite(110,1185, this.randomWordArray[0]);        
      this.alphabet2= this.game.add.sprite(210,1185, this.randomWordArray[1]);
      this.alphabet3= this.game.add.sprite(310,1185, this.randomWordArray[2]);
      this.alphabet4= this.game.add.sprite(410,1185, this.randomWordArray[3]);
      this.alphabet5= this.game.add.sprite(510,1185, this.randomWordArray[4]);
      this.alphabet6= this.game.add.sprite(600,1185, this.randomWordArray[5]);
        
 }
 generateRandomLetters(count,array){
      let locVol = ['A', 'E','I', 'O', 'U'];
      //console.log("temp = "+ locVol);
      //console.log("temp = "+ locVol);
     for(var i=0;i<2;i++)
     {
      this.randomIndex =this.game.rnd.integerInRange(0,locVol.length - 1);// Math.floor(Math.random() * 5-i);
     array.push(locVol[this.randomIndex]);
    // console.log("vow = "+array+ "index = " + this.randomIndex);
     locVol.splice(this.randomIndex,1);
     }
      let locCon = ['B','C','D','F','G','H','J','K','L','M','N','P','Q','R','S','T','V','W','X','Y','Z'];
     for(var i=0;i<count-2;i++)
     {
     this.randomIndex1 = this.game.rnd.integerInRange(0, locCon.length-1);//Math.floor(Math.random() * 21-i);  
     array.push(locCon[this.randomIndex1]);
     locCon.splice(this.randomIndex1,1);
         
     }  
     
 }
 update(){
   //this.tick.inputEnabled= false;
    this.tick.events.onInputDown.add(this.tickButton, this);
    
   this.game.physics.arcade.collide(this.game._character,this.game._step1);
   this.game.physics.arcade.collide(this.game._character,this.game._step2);
   this.game.physics.arcade.collide(this.game._character,this.game._step3);
   this.game.physics.arcade.collide(this.game._character,this.game._step4);
   this.game.physics.arcade.collide(this.game._character,this.game._step5);
   this.game.physics.arcade.collide(this.game._character,this.game._step6);
   this.game.physics.arcade.collide(this.game._character,this.game._step7);
   this.game.physics.arcade.collide(this.game._character,this.game._step8);
    
  if (delay_flag && this.delay_flag1) {
        delay_flag = false;
        this.delay_flag1 = false;
        delay_loop = 5;
        this.game.time.events.remove(this.delay_timer);
    if(this.score!=1) {
            if(this.stepPosition[(this.temp) % 8] == -100){    
                    this.game.add.tween(this.array_step_left[(this.step_index ) % 4]).to({x: -300, y: this.stepPosition[(this.temp) % 8] },10).start();
            } else {
               this.game.add.tween(this.array_step_left[(this.step_index ) % 4]).to({x:0, y: this.stepPosition[(this.temp) % 8] },8000).start(); 
            }
            
            
            
             if(this.stepPosition[(this.temp+ 1) % 8] == -100){    
               
                    this.game.add.tween(this.array_step_right[(this.step_index ++) % 4]).to({x:800, y:this.stepPosition[(this.temp+1) % 8] },10).start();
            } else {
               this.game.add.tween(this.array_step_right[(this.step_index ++) % 4]).to({x:590, y:this.stepPosition[(this.temp+1) % 8] },7000).start();
            }
            
            
            
            
              if( this.stepPosition[(this.temp + 3) % 8] == -100){    
               // console.log(this.stepPosition[this.temp % 8]  );
                 //   this.array_step_left[(this.step_index ) % 4].alpha=0;
                    this.game.add.tween(this.array_step_right[(this.step_index ) % 4]).to({x:800, y: this.stepPosition[(this.temp + 3) % 8] },10).start(); 
            } else {
               this.game.add.tween(this.array_step_right[(this.step_index ) % 4]).to({x:590, y: this.stepPosition[(this.temp + 3) % 8] },7000).start(); 
            }
            
            
            
            
             if(this.stepPosition[(this.temp+ 2) % 8] == -100){    
               // console.log(this.stepPosition[(this.temp +1) % 8]  );
                 //   this.array_step_left[(this.step_index ) % 4].alpha=0;
                    this.game.add.tween(this.array_step_left[(this.step_index ++) % 4]).to({x:-300, y: this.stepPosition[(this.temp + 2) % 8] },10).start();
            } else {
                this.game.add.tween(this.array_step_left[(this.step_index ++) % 4]).to({x:0, y: this.stepPosition[(this.temp + 2) % 8] },7000).start();
            }
            
            
            
            
              if(this.stepPosition[(this.temp + 5) % 8] == -100){    
                //console.log(this.stepPosition[this.temp % 8]  );
                  //  this.array_step_left[(this.step_index ) % 4].alpha=0;
                    this.game.add.tween(this.array_step_right[(this.step_index ) % 4]).to({x:800, y: this.stepPosition[(this.temp + 5) % 8] },10).start();
            } else {
              this.game.add.tween(this.array_step_right[(this.step_index ) % 4]).to({x:590, y: this.stepPosition[(this.temp + 5) % 8] },7000).start();
            }
            
            
            
             if(this.stepPosition[(this.temp+ 4) % 8] == -100){    
               // console.log(this.stepPosition[(this.temp +1) % 8]  );
                 //   this.array_step_left[(this.step_index ) % 4].alpha=0;
                     this.game.add.tween(this.array_step_left[(this.step_index ++) % 4]).to({x:-300, y: this.stepPosition[(this.temp + 4) % 8] },10).start(); 
    
            } else {
               this.game.add.tween(this.array_step_left[(this.step_index ++) % 4]).to({x:0, y: this.stepPosition[(this.temp + 4) % 8] },7000).start(); 
    
            }
            
          
    //this.game.add.tween(this.array_step_right[(this.step_index ++) % 4]).to({x:590, y:this.stepPosition[(this.temp+1) % 8] },1500).start();
    
    //this.game.add.tween(this.array_step_right[(this.step_index ) % 4]).to({x:590, y: this.stepPosition[(this.temp + 3) % 8] },1500).start(); 
    //this.game.add.tween(this.array_step_left[(this.step_index ++) % 4]).to({x:0, y: this.stepPosition[(this.temp + 2) % 8] },1500).start(); 
    //this.game.add.tween(this.array_step_right[(this.step_index ) % 4]).to({x:590, y: this.stepPosition[(this.temp + 5) % 8] },1500).start();
    //this.game.add.tween(this.array_step_left[(this.step_index ++) % 4]).to({x:0, y: this.stepPosition[(this.temp + 4) % 8] },1500).start(); 
 
    if(this.score >2){
        
        
          
              if(this.stepPosition[(this.temp + 7 ) % 8] == -100){    
               // console.log(this.stepPosition[this.temp % 8]  );
                    //this.array_step_left[(this.step_index ) % 4].alpha=0;
                    this.game.add.tween(this.array_step_right[(this.step_index ) % 4]).to({x:800, y: this.stepPosition[(this.temp + 7) % 8] },10).start();
            } else {
               this.game.add.tween(this.array_step_right[(this.step_index ) % 4]).to({x:590, y: this.stepPosition[(this.temp + 7) % 8] },7000).start();
            }
            
             if(this.stepPosition[(this.temp + 6) % 8] == -100){    
                //console.log(this.stepPosition[(this.temp +1) % 8]  );
                    //this.array_step_left[(this.step_index ) % 4].alpha=0;
                   this.game.add.tween(this.array_step_left[(this.step_index ++) % 4]).to({x:-300, y: this.stepPosition[(this.temp + 6) % 8] },10).start();
            } else {
              this.game.add.tween(this.array_step_left[(this.step_index ++) % 4]).to({x:0, y: this.stepPosition[(this.temp + 6) % 8] },7000).start();
            }
            
            
        //this.game.add.tween(this.array_step_right[(this.step_index ) % 4]).to({x:590, y: this.stepPosition[(this.temp + 7) % 8] },1500).start();
        //this.game.add.tween(this.array_step_left[(this.step_index ++) % 4]).to({x:0, y: this.stepPosition[(this.temp + 6) % 8] },1500).start();
        } else {
            this.step_index ++;
        }
        
    }   
    this.tick.inputEnabled= false;
    this.temp ++;
    this.array_step_left[(this.step_index ) % 4].alpha=1;
 
    }
  
   
 }
 
 delay () {
  //   console.log(delay_loop);
     delay_loop -=1;
     if (delay_loop == 0){
         delay_flag = true;
     }
 }
  
 tickButton()
     {
      this.game._character.animations.play('char_animation');   
     var guess="";
     var found;
     for(let i=0;i<this.str.length;i++)
     guess=guess+this.randomWordArray[this.str[i]];
   
     console.log(guess);
     found = this.checkLibrary(guess);
     if(found == true)
     {
         this.tick.inputEnabled= true;
         this.jump();
         this.delay_timer = this.game.time.events.loop(500, this.delay);
         this.delay_flag1 = true;
         console.log(guess);
         this.tick_word = this.wordArray.indexOf(guess);
         this.tick_array = this.wordArray.splice(this.tick_word,1);
          this.tick_array = this.rewordArray.splice(this.tick_word,1);
         console.log(this.tick_array);
         console.log(this.wordArray);
         
         for(let i=0;i<= this.containLetter.length;i++)
{
    this.crossButton();
}         
         
     }
 }
 crossButton()
{
      this.counta--;
      this.tick.inputEnabled= true;    
      var vv = this.str[this.str.length-1];
      this.containObject[vv].alpha = 1;
      this.containObject[vv].inputEnabled = true;
      this.containLetter[this.str.length-1].kill();
      var crossElement=this.randomWordArray[vv];
     // var crossElementChar = crossElement.charAt(0);
      this.wrong=this.game.add.sprite(this.containerposition[vv].x, this.containerposition [vv].y,crossElement);
      this.wrong_array.push(this.wrong); 
      this.containLetter.pop();
     // console.log(this.containLetter);
      this.str.pop();
}

hintButton(){
    
    this.decrementScore();
 //   this.wordArray.splice(this.index_hint);
   for( let i=0;i<this.rewordArray.length ; i++)
   {     this.dict_word=this.rewordArray[i];
          
          let match_letter = 0;
       for(let j=0;j<this.randomWordArray.length;j++)
       {
          // console.log("index = "+ j + "letter = "+ this.randomWordArray[j]);
         if( this.randomWordArray.indexOf(this.dict_word[j])  != -1)
         {
            match_letter++;
            
           //break;  
          // console.log(this.hint_array);  
         }  
       }
       if(match_letter == this.dict_word.length){
           this.index_hint = this.rewordArray.indexOf(this.dict_word);
           this.rewordArray.splice(this.index_hint,1);
           this.hint_array.push(this.dict_word);
           this.tick_array = this.rewordArray.splice(this.tick_word,1);
         
           break;
       }
      
   }
   
   this.showHint.text = this.hint_array;
   
   
   this.game.add.tween(this.showHint).to({alpha:1},2000).to({alpha:0},1000).start();
   
   
   console.log(this.hint_array);

   this.hint_array.splice(0,1);
   
    
}

 
 pos(item)
 {
     if(item.id==0 && this.counta <6)
     {   
         this.counta++;
        // this.game.add.sprite(125,1190,'Aw');  
         this.str.push(0);
         let vv = this.game.add.sprite(this.position[this.str.length-1].x, this.position[this.str.length-1].y,  this.randomWordArray[0]);
         
         this.containLetter.push(vv);
        // this.containObject[item.id].alpha = 0.5;
         //this.containObject[item.id].inputEnabled = false;
         
     }

     if(item.id==1 && this.counta <6)
     {
         this.counta++;         
         //this.game.add.sprite(230,1190,'Ew'); 
         this.str.push(1);
         var vv =  this.game.add.sprite(this.position[this.str.length-1].x, this.position[this.str.length-1].y, this.randomWordArray[1]);
         this.containLetter.push(vv);
        // this.containObject[item.id].alpha = 0.5;
        // this.containObject[item.id].inputEnabled = false;
        
     }
     
     if(item.id==2 && this.counta <6)
     {   
         this.counta++;
         //this.game.add.sprite(325,1190,'Cw');  
         this.str.push(2);
         var vv = this.game.add.sprite(this.position[this.str.length-1].x, this.position[this.str.length-1].y, this.randomWordArray[2]);
         this.containLetter.push(vv);
        // this.containObject[item.id].alpha = 0.5;
        // this.containObject[item.id].inputEnabled = false;
     }
     
     if(item.id==3 && this.counta <6)
     {   
         this.counta++;
         //this.game.add.sprite(430,1190,'Dw');  
         this.str.push(3);
         var vv =   this.game.add.sprite(this.position[this.str.length-1].x, this.position[this.str.length-1].y, this.randomWordArray[3]);
         this.containLetter.push(vv);        
        // this.containObject[item.id].alpha = 0.5;
       //  this.containObject[item.id].inputEnabled = false;
     }
     
     if(item.id==4 && this.counta <6)
     {  
         this.counta++;
         //this.game.add.sprite(530,1190,'Tw');  
         this.str.push(4);
         var vv = this.game.add.sprite(this.position[this.str.length-1].x, this.position[this.str.length-1].y, this.randomWordArray[4]);
         this.containLetter.push(vv);
     //    this.containObject[item.id].alpha = 0.5;
        // this.containObject[item.id].inputEnabled = false;
     }
     
     if(item.id==5 && this.counta <6)
     {
         this.counta++;
        // this.game.add.sprite(620,1190,'Sw'); 
         this.str.push(5);
         var vv = this.game.add.sprite(this.position[this.str.length-1].x, this.position[this.str.length-1].y, this.randomWordArray[5]);
         this.containLetter.push(vv);
        //this.containObject[item.id].alpha = 0.5;
       //  this.containObject[item.id].inputEnabled = false;
        
     }
     
       this.tick.inputEnabled= true;    
       //console.log(this.containLetter);
  
  }
   
    checkLibrary( word ){
        
       //let myObj = new Dictionary('cat');
       //console.log(myObj);
        let flag=false;
        for( let j=0; j<this.wordArray.length; j++){
         if(word == this.wordArray[j])
         {
             flag=true;
             break;
         }
     }
    
return flag;
 }
    binarySearch( word) {
         this.f= this.first=0;
         this.l=this.last=this.wordArray-1;
         this.m= this.mid=(this.f+this.l)/2;
         while(this.f<=this.l){
             if(word==this.wordArray[this.m])
             return true;
             
             else if(word>this.wordArray[this.m])
             this.f=this.m+1;
             else 
             this.l = this.m-1;
             this.m=(this.f+this.l)/2;
             
              }
         return false;
     }
     

 
 jump(){
     
 //this.game.add.tween(this.game._character).to({x:300, y:620},1500).start()    
 //var x = this.updatePosition_char[this.count].x;
 //var y = this.updatePosition_char[this.count].y;
 this.incrementScore();
 this.jumpSound.play();
 if(this.score==0)
 {
     var x = this.updatePosition_char[0].x;
     var y = this.updatePosition_char[0].y;
     this.score++;
     console.log("one");
     var jump_char=this.game.add.tween(this.game._character).to({x:[450, 600], y:[500,520]},1200,"Sine.easeInOut", false, false);
     jump_char.interpolation(Phaser.Math.bezierInterpolation);
     jump_char.start();
 } else if(this.score==1) 
 {
   var x1 = this.updatePosition_char[1].x;
     var y1 = this.updatePosition_char[1].y;
     this.game._character.body.gravity.y = 60;
     this.odd++;
 //     this.stepMove();
     if (this.odd == 2) {
         this.odd = 0;
     }
    this.score++;
   var jump_char=this.game.add.tween(this.game._character).to({x:[420, x1], y:[350,y1]},1200,"Sine.easeInOut", false, false);
   jump_char.interpolation(Phaser.Math.bezierInterpolation);
   jump_char.start();  
     
     
 } else if((this.count%2)==0 && this.score> 1) {   
     console.log("two");
     this.set=false;
     var x2 = this.updatePosition_char[2].x;
     var y2 = this.updatePosition_char[2].y;
     this.game._character.body.gravity.y = 60;
     this.even++;
     if ( this.even == 2){
         this.even =0;
     }
    var jump_char=this.game.add.tween(this.game._character).to({x:[450, x2], y:[500,y2]},1200,"Sine.easeInOut", false, false);
     jump_char.interpolation(Phaser.Math.bezierInterpolation);
     jump_char.start();
    this.score++;
  
   
 }
else
 {   console.log("testing");
     
     var x1 = this.updatePosition_char[1].x;
     var y1 = this.updatePosition_char[1].y;
     this.game._character.body.gravity.y = 60;
     this.odd++;
 //     this.stepMove();
     if (this.odd == 2) {
         this.odd = 0;
     }
    this.score++;
   var jump_char=this.game.add.tween(this.game._character).to({x:[450,x1], y:[500,524]},1200,"Sine.easeInOut", false, false);
   jump_char.interpolation(Phaser.Math.bezierInterpolation);
   jump_char.start();
  //  this.stepMove();
 }
 
 //this.game._character.body.gravity.y = 200;
 
this.count++;
if (this.count == 4){
     this.count = 0;
}

    
}
 
createScore()
{   
    this.scoreLabel=this.game.add.text(this.game.world.centerX,this.game.world.centerY,this.gameScore,{font:'100px Arial',fill:'#24ceb1'});
    this.scoreLabel.anchor.setTo(0.5,0.5);
}
incrementScore()
{
  this.gameScore += 2;  
  this.scoreLabel.text = +this.gameScore;
}
decrementScore()
{   if(this.gameScore>0)
   {
    this.gameScore-=1;
    this.scoreLabel.text = +this.gameScore;
   }
}


}


export default GameState;
