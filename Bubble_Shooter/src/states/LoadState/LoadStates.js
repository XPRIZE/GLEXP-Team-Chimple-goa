class LoadStates extends Phaser.State {
    
    preload(){
       
        this.game.load.image('background', 'assets/Background.png');
        this.game.load.image('Red', 'assets/Red.png');
        this.game.load.image('Green', 'assets/Green.png');
        this.game.load.image('Orange', 'assets/Orange.png');
        this.game.load.image('Purple', 'assets/Purple.png');
        this.game.load.image('Skyblue', 'assets/Skyblue.png');
        this.game.load.image('Yellow', 'assets/Yellow.png');
        
        this.game.load.image('Red_Ball', 'assets/Red_Balls.png');
        this.game.load.image('Green_Ball', 'assets/Green_Ball.png');
        this.game.load.image('Orange_Ball', 'assets/Orange_Ball.png');
        this.game.load.image('Purple_Ball', 'assets/Purple_Ball.png');
        this.game.load.image('Blue_Ball', 'assets/Blue_Ball.png');
        this.game.load.image('Yellow_Ball', 'assets/Yellow_Ball.png');
        this.game.load.image('gunPointer','assets/Gun_Shooter.png');
        this.game.load.image('gunBase','assets/Gun_Base.png');
        
        this.game.load.image('darkTransparent','assets/Trans_Image.png');
        this.game.load.image('next','assets/Next_Button.png');
        this.game.load.image('retry','assets/Retry_Button.png');
        this.game.load.image('menu','assets/Menu_Button.png');
        this.game.load.image('Complete','assets/Level_Complete.png');
        this.game.load.image('starGame1','assets/starGame1.png');
        this.game.load.image('starGame2','assets/starGame2.png');
        this.game.load.image('starGame3','assets/starGame3.png');
        
        if(this.game._LoadFlag == 1 || this.game._LoadFlag == 3 || this.game._LoadFlag == 4 || this.game._LoadFlag == 5 || this.game._LoadFlag == 6){
        
        this.game.load.image('A', 'assets/A.png');
        this.game.load.image('B', 'assets/B.png');
        this.game.load.image('C', 'assets/C.png');
        this.game.load.image('D', 'assets/D.png');
        this.game.load.image('E', 'assets/E.png');
        this.game.load.image('F', 'assets/F.png');
        this.game.load.image('G', 'assets/G.png');
        this.game.load.image('H', 'assets/H.png');
        this.game.load.image('I', 'assets/I.png');
        this.game.load.image('J', 'assets/J.png');
        this.game.load.image('K', 'assets/K.png');
        this.game.load.image('L', 'assets/L.png');
        this.game.load.image('M', 'assets/M.png');
        this.game.load.image('N', 'assets/N.png');
        this.game.load.image('O', 'assets/O.png');
        this.game.load.image('P', 'assets/P.png');
        this.game.load.image('Q', 'assets/Q.png');
        this.game.load.image('R', 'assets/R.png');
        this.game.load.image('S', 'assets/S.png');
        this.game.load.image('T', 'assets/T.png');
        this.game.load.image('U', 'assets/U.png');
        this.game.load.image('V', 'assets/V.png');
        this.game.load.image('W', 'assets/W.png');
        this.game.load.image('X', 'assets/X.png');
        this.game.load.image('Y', 'assets/Y.png');
        this.game.load.image('Z', 'assets/Z.png');
        
        }
        
        
        if(this.game._LoadFlag == 2 ){
            
        this.game.load.image('0', 'assets/0.png');
        this.game.load.image('1', 'assets/1.png');
        this.game.load.image('2', 'assets/2.png');
        this.game.load.image('3', 'assets/3.png');
        this.game.load.image('4', 'assets/4.png');
        this.game.load.image('5', 'assets/5.png');
        this.game.load.image('6', 'assets/6.png');
        this.game.load.image('7', 'assets/7.png');
        this.game.load.image('8', 'assets/8.png');
        this.game.load.image('9', 'assets/9.png');
        }

        //Load Audiio Files 

/*
		this.game.load.audio('jump', ['assets/jump.ogg', 'assets/jump.mp3']);        
        this.jumpSound = this.game.add.audio('jump');
        this.jumpSound.play();
*/
        if(this.game._LoadFlag == 1){
        this.game.load.audio('A_Sound', 'sounds/abcd/A_Sound.wav');
        this.game.load.audio('B_Sound', 'sounds/abcd/B_Sound.wav');
        this.game.load.audio('C_Sound', 'sounds/abcd/C_Sound.wav');
        this.game.load.audio('D_Sound', 'sounds/abcd/D_Sound.wav');
        this.game.load.audio('E_Sound', 'sounds/abcd/E_Sound.wav');
        this.game.load.audio('F_Sound', 'sounds/abcd/F_Sound.wav');
        this.game.load.audio('G_Sound', 'sounds/abcd/G_Sound.wav');
        this.game.load.audio('H_Sound', 'sounds/abcd/H_Sound.wav');
        this.game.load.audio('I_Sound', 'sounds/abcd/I_Sound.wav');
        this.game.load.audio('J_Sound', 'sounds/abcd/J_Sound.wav');
        this.game.load.audio('K_Sound', 'sounds/abcd/K_Sound.wav');
        this.game.load.audio('L_Sound', 'sounds/abcd/L_Sound.wav');
        this.game.load.audio('M_Sound', 'sounds/abcd/M_Sound.wav');
        this.game.load.audio('N_Sound', 'sounds/abcd/N_Sound.wav');
        this.game.load.audio('O_Sound', 'sounds/abcd/O_Sound.wav');
        this.game.load.audio('P_Sound', 'sounds/abcd/P_Sound.wav');
        this.game.load.audio('Q_Sound', 'sounds/abcd/Q_Sound.wav');
        this.game.load.audio('R_Sound', 'sounds/abcd/R_Sound.wav');
        this.game.load.audio('S_Sound', 'sounds/abcd/S_Sound.wav');
        this.game.load.audio('T_Sound', 'sounds/abcd/T_Sound.wav');
        this.game.load.audio('U_Sound', 'sounds/abcd/U_Sound.wav');
        this.game.load.audio('V_Sound', 'sounds/abcd/V_Sound.wav');
        this.game.load.audio('W_Sound', 'sounds/abcd/W_Sound.wav');
        this.game.load.audio('X_Sound', 'sounds/abcd/X_Sound.wav');
        this.game.load.audio('Y_Sound', 'sounds/abcd/Y_Sound.wav');
        this.game.load.audio('Z_Sound', 'sounds/abcd/Z_Sound.wav');
        }
    }
    
    create(){
        
        console.log("load state work fine and flag value is : " + this.game._LoadFlag );
        
        if(this.game._LoadFlag == 1)
        this.state.start('LevelSceenAlphabets');
        
        if(this.game._LoadFlag == 2)
        this.state.start('LevelSceenNumber');
        
        if(this.game._LoadFlag == 3)
        this.state.start('LevelScreenPuzzle');
        
        if(this.game._LoadFlag == 4)
        this.state.start('LevelScreenFruit');
        
        if(this.game._LoadFlag == 5)
        this.state.start('LevelScreenVegitable');
        
        if(this.game._LoadFlag == 6)
        this.state.start('LevelScreenAnimal');
        
    }
    
}

export default LoadStates;