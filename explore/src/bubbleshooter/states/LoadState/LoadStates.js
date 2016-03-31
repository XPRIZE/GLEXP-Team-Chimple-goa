class LoadStates extends Phaser.State {
    
    preload(){
       
        this.game.load.image('background', 'assets/bubbleshooter/Background.png');
        this.game.load.image('Red', 'assets/bubbleshooter/Red.png');
        this.game.load.image('Green', 'assets/bubbleshooter/Green.png');
        this.game.load.image('Orange', 'assets/bubbleshooter/Orange.png');
        this.game.load.image('Purple', 'assets/bubbleshooter/Purple.png');
        this.game.load.image('Skyblue', 'assets/bubbleshooter/Skyblue.png');
        this.game.load.image('Yellow', 'assets/bubbleshooter/Yellow.png');
        
        this.game.load.image('Red_Ball', 'assets/bubbleshooter/Red_Balls.png');
        this.game.load.image('Green_Ball', 'assets/bubbleshooter/Green_Ball.png');
        this.game.load.image('Orange_Ball', 'assets/bubbleshooter/Orange_Ball.png');
        this.game.load.image('Purple_Ball', 'assets/bubbleshooter/Purple_Ball.png');
        this.game.load.image('Blue_Ball', 'assets/bubbleshooter/Blue_Ball.png');
        this.game.load.image('Yellow_Ball', 'assets/bubbleshooter/Yellow_Ball.png');
        this.game.load.image('gunPointer','assets/bubbleshooter/Gun_Shooter.png');
        this.game.load.image('gunBase','assets/bubbleshooter/Gun_Base.png');
        
        this.game.load.image('darkTransparent','assets/bubbleshooter/Trans_Image.png');
        this.game.load.image('next','assets/bubbleshooter/Next_Button.png');
        this.game.load.image('retry','assets/bubbleshooter/Retry_Button.png');
        this.game.load.image('menu','assets/bubbleshooter/Menu_Button.png');
        this.game.load.image('Complete','assets/bubbleshooter/Level_Complete.png');
        this.game.load.image('starGame1','assets/bubbleshooter/starGame1.png');
        this.game.load.image('starGame2','assets/bubbleshooter/starGame2.png');
        this.game.load.image('starGame3','assets/bubbleshooter/starGame3.png');
        
        if(this.game._LoadFlag == 1 || this.game._LoadFlag == 3 || this.game._LoadFlag == 4 || this.game._LoadFlag == 5 || this.game._LoadFlag == 6){
        
        this.game.load.image('A', 'assets/bubbleshooter/A.png');
        this.game.load.image('B', 'assets/bubbleshooter/B.png');
        this.game.load.image('C', 'assets/bubbleshooter/C.png');
        this.game.load.image('D', 'assets/bubbleshooter/D.png');
        this.game.load.image('E', 'assets/bubbleshooter/E.png');
        this.game.load.image('F', 'assets/bubbleshooter/F.png');
        this.game.load.image('G', 'assets/bubbleshooter/G.png');
        this.game.load.image('H', 'assets/bubbleshooter/H.png');
        this.game.load.image('I', 'assets/bubbleshooter/I.png');
        this.game.load.image('J', 'assets/bubbleshooter/J.png');
        this.game.load.image('K', 'assets/bubbleshooter/K.png');
        this.game.load.image('L', 'assets/bubbleshooter/L.png');
        this.game.load.image('M', 'assets/bubbleshooter/M.png');
        this.game.load.image('N', 'assets/bubbleshooter/N.png');
        this.game.load.image('O', 'assets/bubbleshooter/O.png');
        this.game.load.image('P', 'assets/bubbleshooter/P.png');
        this.game.load.image('Q', 'assets/bubbleshooter/Q.png');
        this.game.load.image('R', 'assets/bubbleshooter/R.png');
        this.game.load.image('S', 'assets/bubbleshooter/S.png');
        this.game.load.image('T', 'assets/bubbleshooter/T.png');
        this.game.load.image('U', 'assets/bubbleshooter/U.png');
        this.game.load.image('V', 'assets/bubbleshooter/V.png');
        this.game.load.image('W', 'assets/bubbleshooter/W.png');
        this.game.load.image('X', 'assets/bubbleshooter/X.png');
        this.game.load.image('Y', 'assets/bubbleshooter/Y.png');
        this.game.load.image('Z', 'assets/bubbleshooter/Z.png');
        
        }
        
        
        if(this.game._LoadFlag == 2 ){
            
        this.game.load.image('0', 'assets/bubbleshooter/0.png');
        this.game.load.image('1', 'assets/bubbleshooter/1.png');
        this.game.load.image('2', 'assets/bubbleshooter/2.png');
        this.game.load.image('3', 'assets/bubbleshooter/3.png');
        this.game.load.image('4', 'assets/bubbleshooter/4.png');
        this.game.load.image('5', 'assets/bubbleshooter/5.png');
        this.game.load.image('6', 'assets/bubbleshooter/6.png');
        this.game.load.image('7', 'assets/bubbleshooter/7.png');
        this.game.load.image('8', 'assets/bubbleshooter/8.png');
        this.game.load.image('9', 'assets/bubbleshooter/9.png');
        }

        //Load Audiio Files 

/*
		this.game.load.audio('jump', ['assets/jump.ogg', 'assets/jump.mp3']);        
        this.jumpSound = this.game.add.audio('jump');
        this.jumpSound.play();
*/
        if(this.game._LoadFlag == 1){
        this.game.load.audio('A_Sound', 'assets/bubbleshooter/sounds/abcd/A_Sound.wav');
        this.game.load.audio('B_Sound', 'assets/bubbleshooter/sounds/abcd/B_Sound.wav');
        this.game.load.audio('C_Sound', 'assets/bubbleshooter/sounds/abcd/C_Sound.wav');
        this.game.load.audio('D_Sound', 'assets/bubbleshooter/sounds/abcd/D_Sound.wav');
        this.game.load.audio('E_Sound', 'assets/bubbleshooter/sounds/abcd/E_Sound.wav');
        this.game.load.audio('F_Sound', 'assets/bubbleshooter/sounds/abcd/F_Sound.wav');
        this.game.load.audio('G_Sound', 'assets/bubbleshooter/sounds/abcd/G_Sound.wav');
        this.game.load.audio('H_Sound', 'assets/bubbleshooter/sounds/abcd/H_Sound.wav');
        this.game.load.audio('I_Sound', 'assets/bubbleshooter/sounds/abcd/I_Sound.wav');
        this.game.load.audio('J_Sound', 'assets/bubbleshooter/sounds/abcd/J_Sound.wav');
        this.game.load.audio('K_Sound', 'assets/bubbleshooter/sounds/abcd/K_Sound.wav');
        this.game.load.audio('L_Sound', 'assets/bubbleshooter/sounds/abcd/L_Sound.wav');
        this.game.load.audio('M_Sound', 'assets/bubbleshooter/sounds/abcd/M_Sound.wav');
        this.game.load.audio('N_Sound', 'assets/bubbleshooter/sounds/abcd/N_Sound.wav');
        this.game.load.audio('O_Sound', 'assets/bubbleshooter/sounds/abcd/O_Sound.wav');
        this.game.load.audio('P_Sound', 'assets/bubbleshooter/sounds/abcd/P_Sound.wav');
        this.game.load.audio('Q_Sound', 'assets/bubbleshooter/sounds/abcd/Q_Sound.wav');
        this.game.load.audio('R_Sound', 'assets/bubbleshooter/sounds/abcd/R_Sound.wav');
        this.game.load.audio('S_Sound', 'assets/bubbleshooter/sounds/abcd/S_Sound.wav');
        this.game.load.audio('T_Sound', 'assets/bubbleshooter/sounds/abcd/T_Sound.wav');
        this.game.load.audio('U_Sound', 'assets/bubbleshooter/sounds/abcd/U_Sound.wav');
        this.game.load.audio('V_Sound', 'assets/bubbleshooter/sounds/abcd/V_Sound.wav');
        this.game.load.audio('W_Sound', 'assets/bubbleshooter/sounds/abcd/W_Sound.wav');
        this.game.load.audio('X_Sound', 'assets/bubbleshooter/sounds/abcd/X_Sound.wav');
        this.game.load.audio('Y_Sound', 'assets/bubbleshooter/sounds/abcd/Y_Sound.wav');
        this.game.load.audio('Z_Sound', 'assets/bubbleshooter/sounds/abcd/Z_Sound.wav');
        }
    }
    
    create(){
        
        console.log("load state work fine and flag value is : " + this.game._LoadFlag );
        
        if(this.game._LoadFlag == 1)
        this.state.start('Bubble_LevelSceenAlphabets');
        
        if(this.game._LoadFlag == 2)
        this.game.state.start('Bubble_LevelSceenNumber');
        
        if(this.game._LoadFlag == 3)
        this.game.state.start('Bubble_LevelScreenPuzzle');
        
        if(this.game._LoadFlag == 4)
        this.game.state.start('Bubble_LevelScreenFruit');
        
        if(this.game._LoadFlag == 5)
        this.game.state.start('Bubble_LevelScreenVegitable');
        
        if(this.game._LoadFlag == 6)
        this.game.state.start('Bubble_LevelScreenAnimal');
        
    }
    
}

export default LoadStates;