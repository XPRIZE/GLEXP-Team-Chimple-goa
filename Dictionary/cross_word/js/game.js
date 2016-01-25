var game = new Phaser.Game(1280,800, Phaser.AUTO, 'game_II_Div');

game.global ={
					score: 0
			 }
// Add all the state
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('game2State0', playState0);
game.state.add('game2State1', playState1);
game.state.add('game2State2', playState2);
game.state.add('game2State3', playState3);
game.state.add('game2State4', playState4);
game.state.add('game2State5', playState5);
game.state.add('game2State6', playState6);
game.state.add('game2State7', playState7);
game.state.add('game2State8', playState8);






//start the 'boot' state
game.state.start('boot');