class LoadLevel extends Phaser.State {

preload () {
	 //    console.log('in loadlevel');
        this.game.load.audio('rightMusic', 'assets/Background/right.mp3');
        this.game.load.audio('wrongMusic', 'assets/Background/wrong.mp3');
        this.game.load.image('a', 'assets/Background/a.png');
        this.game.load.image('b', 'assets/Background/b.png');
        this.game.load.image('c', 'assets/Background/c.png');
        this.game.load.image('d', 'assets/Background/d.png');
        this.game.load.image('e', 'assets/Background/e.png');
        this.game.load.image('f', 'assets/Background/f.png');
        this.game.load.image('g', 'assets/Background/g.png');
        this.game.load.image('h', 'assets/Background/h.png');
        this.game.load.image('i', 'assets/Background/i.png');
        this.game.load.image('j', 'assets/Background/j.png');
        this.game.load.image('k', 'assets/Background/k.png');
        this.game.load.image('l', 'assets/Background/l.png');
        this.game.load.image('m', 'assets/Background/m.png');
        this.game.load.image('n', 'assets/Background/n.png');
        this.game.load.image('level1', 'assets/Background/LevelScreen1.png');
        this.game.load.image('right', 'assets/Background/Right.png');
        
      
	}
    
    create () {
        this.game.state.start('menu');
    }
	
        
}

export default LoadLevel;
