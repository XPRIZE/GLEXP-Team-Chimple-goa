var Loading_pts, Loading_pts1, Loading_pts2, Loading_pts3, Loading_pts4, Loading_pts5, Loading_pts6, Loading_pts7, Loading_pts8, Loading_pts9;

var bootState = 
{
	preload : function ()
	{
		game.load.image('Title_BG', 'final_tiles/Title_BG.jpg');
		game.load.image('Loading_pts', 'final_tiles/Loading_pts.png');
		
		game.load.image('a' , 'letters/A.png');
		game.load.image('b' , 'letters/B.png');
		game.load.image('c' , 'letters/C.png');
		game.load.image('d' , 'letters/D.png');
		game.load.image('e' , 'letters/E.png');
		game.load.image('f' , 'letters/F.png');
		game.load.image('g' , 'letters/G.png');
		game.load.image('h' , 'letters/H.png');
		game.load.image('i' , 'letters/I.png');
		game.load.image('j' , 'letters/J.png');
		game.load.image('k' , 'letters/K.png');
		game.load.image('l' , 'letters/L.png');
		game.load.image('m' , 'letters/M.png');
		game.load.image('n' , 'letters/N.png');
		game.load.image('o' , 'letters/O.png');
		game.load.image('p' , 'letters/P.png');
		game.load.image('q' , 'letters/Q.png');
		game.load.image('r' , 'letters/R.png');
		game.load.image('s' , 'letters/S.png');
		game.load.image('t' , 'letters/T.png');
		game.load.image('u' , 'letters/U.png');
		game.load.image('v' , 'letters/V.png');
		game.load.image('w' , 'letters/W.png');
		game.load.image('x' , 'letters/X.png');
		game.load.image('y' , 'letters/Y.png');
		game.load.image('z' , 'letters/Z.png');
	},

	create : function()
	{
		bg = game.add.image(640, 400, 'Title_BG');
		bg.anchor.setTo(0.5,0.5);
		bg.scale.setTo(0.15);
		
		Loading_pts = game.add.image(505, 505, 'Loading_pts');
		Loading_pts.scale.setTo(0.70);

		Loading_pts1 = game.add.image(535, 505, 'Loading_pts');
		Loading_pts1.scale.setTo(0.70);
		Loading_pts1.alpha = 0;
		
		Loading_pts2 = game.add.image(565, 505, 'Loading_pts');
		Loading_pts2.scale.setTo(0.70);
		Loading_pts2.alpha = 0;
		
		Loading_pts3 = game.add.image(595, 505, 'Loading_pts');
		Loading_pts3.scale.setTo(0.70);
		Loading_pts3.alpha = 0;
		
		Loading_pts4 = game.add.image(625, 505, 'Loading_pts');
		Loading_pts4.scale.setTo(0.70);
		Loading_pts4.alpha = 0;
		
		Loading_pts5 = game.add.image(655, 505, 'Loading_pts');
		Loading_pts5.scale.setTo(0.70);
		Loading_pts5.alpha = 0;
		
		Loading_pts6 = game.add.image(685, 505, 'Loading_pts');
		Loading_pts6.scale.setTo(0.70);
		Loading_pts6.alpha = 0;
		
		Loading_pts7 = game.add.image(715, 505, 'Loading_pts');
		Loading_pts7.scale.setTo(0.70);
		Loading_pts7.alpha = 0;
		
		Loading_pts8 = game.add.image(745, 505, 'Loading_pts');
		Loading_pts8.scale.setTo(0.70);
		Loading_pts8.alpha = 0;
		
		Loading_pts9 = game.add.image(775, 505, 'Loading_pts');
		Loading_pts9.scale.setTo(0.70);
		Loading_pts9.alpha = 0;
		
		//	game.state.start('levelState');
		
		setTimeout(function() {
			Loading_pts1.alpha = 1;

			setTimeout(function() {
				Loading_pts2.alpha = 1;

				setTimeout(function() {
					Loading_pts3.alpha = 1;
					
					setTimeout(function() {
						Loading_pts4.alpha = 1;
						
						setTimeout(function() {
							Loading_pts5.alpha = 1;
							
							setTimeout(function() {
								Loading_pts6.alpha = 1;
								
								setTimeout(function() {
									Loading_pts7.alpha = 1;
									
									setTimeout(function() {
										Loading_pts8.alpha = 1;
										
										setTimeout(function() {
											Loading_pts9.alpha = 1;

											setTimeout(function() {
												game.state.start('levelState');
											}, 500);
											
										}, 500);
									}, 500);
								}, 500);
							}, 500);
						}, 500);
					}, 500);
				}, 500);
			}, 500);			
		}, 500);

	}
	

	
	
};