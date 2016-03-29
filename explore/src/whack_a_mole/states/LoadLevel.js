class LoadLevel extends Phaser.State {

preload () {
        this.game.load.audio('rightMusic', 'assets/whack_a_mole/Background/right.mp3');
        this.game.load.audio('wrongMusic', 'assets/whack_a_mole/Background/wrong.mp3');
        this.game.load.image('a', 'assets/whack_a_mole/Background/a.png');
        this.game.load.image('b', 'assets/whack_a_mole/Background/b.png');
        this.game.load.image('c', 'assets/whack_a_mole/Background/c.png');
        this.game.load.image('d', 'assets/whack_a_mole/Background/d.png');
        this.game.load.image('e', 'assets/whack_a_mole/Background/e.png');
        this.game.load.image('f', 'assets/whack_a_mole/Background/f.png');
        this.game.load.image('g', 'assets/whack_a_mole/Background/g.png');
        this.game.load.image('h', 'assets/whack_a_mole/Background/h.png');
        this.game.load.image('i', 'assets/whack_a_mole/Background/i.png');
        this.game.load.image('j', 'assets/whack_a_mole/Background/j.png');
        this.game.load.image('k', 'assets/whack_a_mole/Background/k.png');
        this.game.load.image('l', 'assets/whack_a_mole/Background/l.png');
        this.game.load.image('m', 'assets/whack_a_mole/Background/m.png');
        this.game.load.image('n', 'assets/whack_a_mole/Background/n.png');
        this.game.load.image('level1', 'assets/whack_a_mole/Background/LevelScreen1.png');
        this.game.load.image('right', 'assets/whack_a_mole/Background/Right.png');
        
      
	}
    
    create () {
        this.game.state.start('whack_a_menu');
    }
	
        
}

export default LoadLevel;
