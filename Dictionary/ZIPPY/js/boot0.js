var boot0State = {

	preload: function () {
        game.load.image('progressBar', 'assets/progressBar.png');
        game.load.image('ls', 'assets/Level_Screen.png');
        game.load.image('ls1', 'assets/Level_1-01.png');
        game.load.image('ls2', 'assets/Level_2-01.png');
        game.load.image('ls3', 'assets/Level_3-01.png');
        game.load.image('ls4', 'assets/Level_4-01.png');
        game.load.image('ls5', 'assets/Level_5-01.png');
        game.load.image('ls6', 'assets/Level_6-01.png');
        

	},

	create: function() { 
       
        game.add.image(0, 0, 'ls');
        l1 = game.add.sprite(50,180,'ls1');
        l2 = game.add.sprite(470,180,'ls2');
        l3 = game.add.sprite(880,180,'ls3');
        l4 = game.add.sprite(50,450,'ls4');
        l5 = game.add.sprite(470,450,'ls5');
        l6 = game.add.sprite(880,450,'ls6');
        
        l1.inputEnabled=true;
        l2.inputEnabled=true;
        l3.inputEnabled=true;
        l4.inputEnabled=true;
        l5.inputEnabled=true;
        l6.inputEnabled=true;
		
		l1.events.onInputDown.add(this.click1, this);
		l2.events.onInputDown.add(this.click2, this);
		l3.events.onInputDown.add(this.click3, this);
		l4.events.onInputDown.add(this.click4, this);
		l5.events.onInputDown.add(this.click5, this);
		l6.events.onInputDown.add(this.click6, this);

        
		var progressBar = game.add.sprite(game.world.centerX, 200, 'progressBar');
		progressBar.anchor.setTo(0.5, 0.5);
		game.load.setPreloadSprite(progressBar);
        
	},
    
    click1 : function() {
    
     game.state.start('load1');

    },
    
    click2 : function() {
    
     game.state.start('load2');

    },
    
    click3 : function() {
    
     game.state.start('load3');

    },
    
    click4 : function() {
    
     game.state.start('load4');

    },

    click5 : function() {
    
     game.state.start('load5');

    },
    
    click6 : function() {
    
     game.state.start('load6');

    }    
};