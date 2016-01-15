var menu4State = {

   
	create: function() { 
		game.add.image(0, 0, 'fbackground');
        
        
     var nameLabel = game.add.text(game.world.centerX, 400, 'LEVEL 4', { font: '50px Arial', fill: '#3498dbf' });
		nameLabel.anchor.setTo(0.5, 0.5);
        
        
     var startLabel = game.add.text(game.world.centerX, game.world.height-80, 'press the up arrow key to start', { font: '25px Arial', fill: '#3498dbf' });
		startLabel.anchor.setTo(0.5, 0.5);
   
        
        
      var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		
		upKey.onDown.addOnce(this.start, this);  
    
    this.can = game.add.sprite(320, 200, 'name');     
    this.can.animations.add('hi');     
        
	},
update: function() {
		
       this.can.animations.play('hi',50,true);
	}, 

	start: function() {
		game.state.start('play4');	
	}
};