var load2State = {

	preload: function () {
        
        
		var loadingLabel = game.add.text(game.world.centerX, 150, 'loading...', { font: '30px Arial', fill: '#ffffff' });
		loadingLabel.anchor.setTo(0.5, 0.5);
        
        game.load.image('A', 'assets/1-01.png');
        game.load.image('B', 'assets/2-01.png');
        game.load.image('E', 'assets/3-01.png'); 
        game.load.image('F', 'assets/4-01.png');
        game.load.image('I', 'assets/5-01.png');
       // game.load.image('p', 'assets/pixel.png');
        game.load.image('lc', 'assets/Level Complete.png');
        game.load.image('p', 'assets/Star.png');
        game.load.audio('as', ['assets/1.mp3']);
        game.load.audio('bs', ['assets/2.mp3']);
        game.load.audio('es', ['assets/3.mp3']);
        game.load.audio('fs', ['assets/4.mp3']);
        game.load.audio('is', ['assets/5.mp3']);
        game.load.image('background', 'assets/Coin_Level_1.png');
        
        game.load.spritesheet('name', 'assets/title.png',715,148,25);
        
        
       var progressBar = game.add.sprite(game.world.centerX, 200, 'progressBar');
		progressBar.anchor.setTo(0.5, 0.5);
		game.load.setPreloadSprite(progressBar);
        
        game.load.image('fbackground', 'assets/Loading_BG.png'); 

		},

	create: function() { 
		game.state.start('menu2');
	}
};