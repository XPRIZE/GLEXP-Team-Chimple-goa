import Menu2 from 'states/MenuState2'
class LoadLevel extends Phaser.State {

preload () {
	   //  console.log('in loadleve2');
        
        this.game.load.image('o', 'assets/Background/o.png');
        this.game.load.image('p', 'assets/Background/p.png');
        this.game.load.image('q', 'assets/Background/q.png');
        this.game.load.image('r', 'assets/Background/r.png');
        this.game.load.image('s', 'assets/Background/s.png');
        this.game.load.image('t', 'assets/Background/t.png');
        this.game.load.image('u', 'assets/Background/u.png');
        this.game.load.image('v', 'assets/Background/v.png');
        this.game.load.image('w', 'assets/Background/w.png');
        this.game.load.image('x', 'assets/Background/x.png');
        this.game.load.image('y', 'assets/Background/y.png');
        this.game.load.image('z', 'assets/Background/z.png');
        this.game.load.image('level2', 'assets/Background/LevelScreen2.png');
        this.game.load.image('left', 'assets/Background/Left.png');   
        this.state.add('menu2', Menu2, false);
	}
    
    create () {
        this.game.state.start('menu2');
    }
	
        
}

export default LoadLevel;
