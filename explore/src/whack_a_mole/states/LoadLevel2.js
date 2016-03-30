class LoadLevel extends Phaser.State {

preload () {
	   //  console.log('in loadleve2');
        
        this.game.load.image('o', 'assets/whack_a_mole/Background/o.png');
        this.game.load.image('p', 'assets/whack_a_mole/Background/p.png');
        this.game.load.image('q', 'assets/whack_a_mole/Background/q.png');
        this.game.load.image('r', 'assets/whack_a_mole/Background/r.png');
        this.game.load.image('s', 'assets/whack_a_mole/Background/s.png');
        this.game.load.image('t', 'assets/whack_a_mole/Background/t.png');
        this.game.load.image('u', 'assets/whack_a_mole/Background/u.png');
        this.game.load.image('v', 'assets/whack_a_mole/Background/v.png');
        this.game.load.image('w', 'assets/whack_a_mole/Background/w.png');
        this.game.load.image('x', 'assets/whack_a_mole/Background/x.png');
        this.game.load.image('y', 'assets/whack_a_mole/Background/y.png');
        this.game.load.image('z', 'assets/whack_a_mole/Background/z.png');
        this.game.load.image('level2', 'assets/whack_a_mole/Background/LevelScreen2.png');
        this.game.load.image('left', 'assets/whack_a_mole/Background/Left.png');
	}
    
    create () {
        this.game.state.start('whack_a_menu2');
    }
	
        
}

export default LoadLevel;
