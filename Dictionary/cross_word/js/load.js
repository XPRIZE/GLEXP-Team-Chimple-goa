
var loadState = {


	
	preload: function() {
							
							// add a 'loading...' label'
                         /*var loadingLabel = game.add.text(game.world.centerX, 200, 'loading...'
					                   ,{font: '30px Geo', fill: '#ffffff'} );

					     loadingLabel.anchor.setTo(.5,.5);
					     	
					     
					     	//display the progress bar
					     var progressBar = game.add.sprite(game.world.centerX, 250, 'progressBar');
							progressBar.anchor.setTo(.5,.5);
							game.load.setPreloadSprite(progressBar);*/
							
							
							//load all our assets
					 	game.load.image('gamebg', 'assets/gameBg1.jpg');
					 	game.load.image('gametitle', 'assets/gametitle.png');
					 	game.load.image('foodcourt', 'assets/foodcourt.png');
					 	game.load.image('rollercoaster', 'assets/rollercoaster.png');
					 	game.load.image('shooting', 'assets/shooting.png');
					 	game.load.image('wheel', 'assets/wheel.png');

					 	
					 	},

   	create: function(){

   							game.state.start('menu');
   					  },



};