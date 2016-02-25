class BootState extends Phaser.State {
    
    preload()
    {
        this.game.load.image('bones8-01','assets/bones8-01.png'); 
        this.game.load.image('dino 1','assets/dino 1.png');  
        this.game.load.image('dino 2','assets/dino 2.png');
        this.game.load.image('dino 3','assets/dino 3.png');
        this.game.load.spritesheet('sound','assets/sound.png',107,79);
        this.game.load.image('light','assets/light.png');
        this.game.load.image('dino 2 lock','assets/dino 2 lock.png');
        this.game.load.image('dino 3 lock','assets/dino 3 lock.png');
       
    }
    
    create()
    {
              this.game.add.sprite(0,0,'bones8-01');
              this.button = this.game.add.button(20,210,'dino 1',this.dino1,this);
              this.game.add.sprite(-60,0,'light');
              
              this.soundButton = this.game.add.button(1150,25,'sound',this.music,this);
              this.soundButton.input.useHandCurosr = true;
              
              if(!this.game.stage2)
              {
                  //this.game.add.sprite(340,120,'dino 2 lock');
                  this.game.add.sprite(340,100,'dino 2');
                  this.game.add.sprite(340,100,'dino 2 lock');
               }
              else
              {
                   this.button1 = this.game.add.button(340,100,'dino 2',this.dino2,this);
                   this.game.add.sprite(400,0,'light');
                 // this.button1.alpha = 1.0;
              }
               if(!this.game.stage3)
               {
                   this.game.add.sprite(860,330,'dino 3').alpha = 0.9;
                   this.game.add.sprite(860,330,'dino 3 lock').alpha = 0.9;
               }
                else
              {
                  this.button2 = this.game.add.button(860,330,'dino 3',this.dino3,this);
                  this.game.add.sprite(800,0,'light');
                 // this.button2.alpha = 1.0;
              }
     }
              
    dino1(){
        this.game.state.start('LoadState');
        
    }
    dino2(){
        
        this.game.state.start('LoadState1');
    }
    
    dino3(){
        
        this.game.state.start('LoadState2');
    }
    
    music()
    {
            // Switch the Phaser sound variable from true to false, or false to true
           // When 'game.sound.mute = true', Phaser will mute the game
           this.game.sound.mute = !this.game.sound.mute;
          // Change the frame of the button
           this.soundButton.frame = this.game.sound.mute ? 1 : 0;}     
}
export default BootState;
