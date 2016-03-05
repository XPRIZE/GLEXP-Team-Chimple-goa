/// <reference path="../node_modules/phaser/typescript/phaser.d.ts" />

import GameState from 'states/GameState';

class Game extends Phaser.Game {

	constructor(width,height) {
		super(width,height, Phaser.AUTO, 'content');
        
        this._character;
        this._step1;
    
		this.state.add('GameState', GameState, false);
    
		this.state.start('GameState');
	}

}

export default Game;