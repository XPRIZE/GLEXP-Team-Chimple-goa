var load3State = {

	preload: function () {
        
        
		var loadingLabel = game.add.text(game.world.centerX, 150, 'loading...', { font: '30px Arial', fill: '#ffffff' });
		loadingLabel.anchor.setTo(0.5, 0.5);
        
        game.load.image('A', 'assets/A-01.png');
        game.load.image('B', 'assets/B-01.png');
        game.load.image('C', 'assets/C-01.png'); 
        game.load.image('D', 'assets/D-01.png');
        game.load.image('E', 'assets/E-01.png');
       // game.load.image('p', 'assets/pixel.png');
        game.load.image('lc', 'assets/Level Complete.png');
        game.load.image('p', 'assets/Star.png');
        game.load.audio('as', ['assets/A_Sound.wav']);
        game.load.audio('bs', ['assets/B_Sound.wav']);
        game.load.audio('cs', ['assets/C_Sound.wav']);
        game.load.audio('ds', ['assets/D_Sound.wav']);
        game.load.audio('es', ['assets/E_Sound.wav']);
        game.load.image('background', 'assets/Block_Level.png');
        
        game.load.spritesheet('name', 'assets/title.png',715,148,25);
        
        
       var progressBar = game.add.sprite(game.world.centerX, 200, 'progressBar');
		progressBar.anchor.setTo(0.5, 0.5);
		game.load.setPreloadSprite(progressBar);
        
        game.load.image('fbackground', 'assets/Loading_BG.png'); 

		},

	create: function() { 
		game.state.start('menu3');
	}
};