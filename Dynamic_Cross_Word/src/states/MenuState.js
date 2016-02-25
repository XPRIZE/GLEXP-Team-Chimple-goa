 class MenuState extends Phaser.State {
    
    preload() {
                      

               }

	create() {
                             this.gamebg = this.game.add.image(0,0, 'gamebg');


						    this.wheelpos = this.game.add.button(-120, 400, 'wheel');
				 		    this.wheelpos.anchor.setTo(.5,.5);
				 		    var tweenA = this.game.add.tween(this.wheelpos);
				 		    tweenA.to({x:300}, 1000).easing(Phaser.Easing.Exponential.Out);
				 			tweenA.start();
				 			this.wheelpos.inputEnabled = true;
				 			this.wheelpos.alpha = 1;
				 			this.wheelpos.events.onInputDown.add(this.wheelStart, this);
				 			
				
             }
             
         wheelStart() {
	   						console.log('hhg');
	   							 this.game.add.tween(this.wheelpos.scale).to({x: 0.9, y: 0.9}, 200, Phaser.Easing.Cubic.Out, true);
  								  this.game.add.tween(this.wheelpos.scale).to({x: 1, y: 1}, 200, Phaser.Easing.Cubic.Out, true, 200);
	   							
	   							
	   							//setTimeout(function(){ this.game.state.start('GameState'); }, 300);
                                   this.game.state.start('GameState');
				 				

				 	    }

}

export default MenuState;
