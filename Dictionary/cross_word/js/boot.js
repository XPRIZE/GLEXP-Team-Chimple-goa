var bootState = {
	
preload: function() {
	
	game.load.image('progressBar', 'assets/progressBar.png');
  //  game.load,image('gamebg', 'ODD_OUT/assets/gamebg.png');
}, 

create: function() {
	
	//game.stage.backgroundColor = '#3498db';
	//game.add.image(0,0, 'gamebg');
	game.physics.startSystem(Phaser.Physics.Arcade);
	game.state.start('load');
}



}