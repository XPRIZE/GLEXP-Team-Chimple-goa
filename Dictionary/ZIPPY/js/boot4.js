var boot4State = {

	preload: function () {
 game.load.image('progressBar', 'assets/progressBar.png');
	},

	create: function() { 
        //game.stage.backgroundColor = '#3498db';
		//me.sprite = game.add.sprite(0, 0, 'background');
		//game.physics.startSystem(Phaser.Physics.ARCADE);

		game.state.start('load4');
	}
};