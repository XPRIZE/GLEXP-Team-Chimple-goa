
class LoadState extends Phaser.State {

preload () {
        this.game.load.audio('rightMusic', 'assets/whack_a_mole/Background/right.mp3');
        this.game.load.audio('wrongMusic', 'assets/whack_a_mole/Background/wrong.mp3');
		this.game.load.image('Background', 'assets/whack_a_mole/Background/Play4_BG.png');
        this.game.load.image('Hole_Back', 'assets/whack_a_mole/Background/Play4_Hole_Back.png');
        this.game.load.image('Hole_Front', 'assets/whack_a_mole/Background/Play4_Hole_Front.png');
        this.game.load.tilemap('map', 'assets/whack_a_mole/Background/newBack4.json', null, Phaser.Tilemap.TILED_JSON);
       if (this.game._stage == 1) {
            this.game.load.image('A', 'assets/whack_a_mole/Alphabets/0A.png');
            this.game.load.image('B', 'assets/whack_a_mole/Alphabets/0B.png');
            this.game.load.image('C', 'assets/whack_a_mole/Alphabets/0C.png');
            this.game.load.image('D', 'assets/whack_a_mole/Alphabets/0D.png');
            this.game.load.image('E', 'assets/whack_a_mole/Alphabets/0E.png');
        } 
        if (this.game._stage == 2) {
            this.game.load.image('F', 'assets/whack_a_mole/Alphabets/0F.png');
            this.game.load.image('G', 'assets/whack_a_mole/Alphabets/0G.png');
            this.game.load.image('H', 'assets/whack_a_mole/Alphabets/0H.png');
            this.game.load.image('I', 'assets/whack_a_mole/Alphabets/0I.png');
            this.game.load.image('J', 'assets/whack_a_mole/Alphabets/0J.png');
        }
        
        if (this.game._stage == 3){
            this.game.load.image('K', 'assets/whack_a_mole/Alphabets/0K.png');
            this.game.load.image('L', 'assets/whack_a_mole/Alphabets/0L.png');
            this.game.load.image('M', 'assets/whack_a_mole/Alphabets/0M.png');
            this.game.load.image('N', 'assets/whack_a_mole/Alphabets/0N.png');
            this.game.load.image('O', 'assets/whack_a_mole/Alphabets/0O.png');    
        }
        if (this.game._stage == 4){
            this.game.load.image('N', 'assets/whack_a_mole/Alphabets/0N.png');
            this.game.load.image('O', 'assets/whack_a_mole/Alphabets/0O.png');
            this.game.load.image('P', 'assets/whack_a_mole/Alphabets/0P.png');
            this.game.load.image('Q', 'assets/whack_a_mole/Alphabets/0Q.png');
            this.game.load.image('R', 'assets/whack_a_mole/Alphabets/0R.png');    
        }
        if (this.game._stage == 5){
            this.game.load.image('S', 'assets/whack_a_mole/Alphabets/0S.png');
            this.game.load.image('T', 'assets/whack_a_mole/Alphabets/0T.png');
            this.game.load.image('U', 'assets/whack_a_mole/Alphabets/0U.png');
            this.game.load.image('V', 'assets/whack_a_mole/Alphabets/0V.png');
            this.game.load.image('W', 'assets/whack_a_mole/Alphabets/0W.png');    
        }
	}
    
    create () {
        this.game.state.start('whack_a_play4');
    }
    
   
    
}
export default LoadState;
