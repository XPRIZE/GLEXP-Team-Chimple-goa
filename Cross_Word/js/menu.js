var menuState ={
	
	create: function() {
							// add the background image
							
							this.gamebg = game.add.image(0,0, 'gamebg');


						    this.wheelpos = game.add.button(-120, 400, 'wheel');
				 		    this.wheelpos.anchor.setTo(.5,.5);
				 		    var tweenA = game.add.tween(this.wheelpos);
				 		    tweenA.to({x:300}, 1000).easing(Phaser.Easing.Exponential.Out);
				 			tweenA.start();
				 			this.wheelpos.inputEnabled = true;
				 			this.wheelpos.alpha = 1;
				 			this.wheelpos.events.onInputDown.add(this.wheelStart, this);
				 			
							
		
	},
	wheelStart: function(){
	   						
	   							 game.add.tween(this.wheelpos.scale).to({x: 0.9, y: 0.9}, 200, Phaser.Easing.Cubic.Out, true);
  								  game.add.tween(this.wheelpos.scale).to({x: 1, y: 1}, 200, Phaser.Easing.Cubic.Out, true, 200);
	   							
	   							//setTimeout(function(){ game.state.start('game2State0'); }, 300);
	   							setTimeout(function(){ game.state.start('game2State0'); }, 300);
				 				

				 	    },
};