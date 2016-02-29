/// <reference path="../node_modules/phaser/typescript/phaser.d.ts" />

import GameState from 'states/GameState';

class Game extends Phaser.Game {

	constructor() {
		super(800, 1280, Phaser.AUTO, 'content');
        
        this._character;
        this._step1;
       // console.log("after game defination ;;;;; ");
		this.state.add('GameState', GameState, false);
     //   this.state.add('Dictonary', Dictionary, false);
       // console.log("before going to call state  ");

		this.state.start('GameState');
	}

}

new Game();
