var load5State = {

	preload: function () {
        
        
		var loadingLabel = game.add.text(game.world.centerX, 150, 'loading...', { font: '30px Arial', fill: '#ffffff' });
		loadingLabel.anchor.setTo(0.5, 0.5);
        
        game.load.image('A', 'assets/a-05.png');
        game.load.image('B', 'assets/b-05.png');
        game.load.image('C', 'assets/c-05.png'); 
        game.load.image('D', 'assets/d-05.png');
        game.load.image('E', 'assets/e-05.png');
        game.load.image('p', 'assets/pixel.png');
        //game.load.image('p', 'assets/Star.png');
        game.load.image('lc', 'assets/Level Complete.png');
        game.load.audio('as', ['assets/A_Sound.wav']);
        game.load.audio('bs', ['assets/B_Sound.wav']);
        game.load.audio('cs', ['assets/C_Sound.wav']);
        game.load.audio('ds', ['assets/D_Sound.wav']);
        game.load.audio('es', ['assets/E_Sound.wav']);
        game.load.image('background', 'assets/Circus_Level.png');
        
        game.load.spritesheet('name', 'assets/title.png',715,148,25);
        
        
       var progressBar = game.add.sprite(game.world.centerX, 200, 'progressBar');
		progressBar.anchor.setTo(0.5, 0.5);
		game.load.setPreloadSprite(progressBar);
        
        game.load.image('fbackground', 'assets/Loading_BG.png'); 

		},

	create: function() { 
		game.state.start('menu5');
	}
};