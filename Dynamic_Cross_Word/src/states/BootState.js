class BootState extends Phaser.State {
    
    preload() {
        
                      console.log("I am in BootState.js");
                      this.game.load.image('progressBar', 'assets/progressBar.png');
               }

	create() {
                        this.game.physics.startSystem(Phaser.Physics.Arcade);
                        this.game.state.start('LoadState');
	        
             }

}

export default BootState;
