/// <reference path="../node_modules/phaser/typescript/phaser.d.ts" />

import BootState from 'states/Bootstate';
import ExampleState from 'states/ExampleState';
import City1State from 'states/City1State';
import City2State from 'states/City2State';
import GameState from 'states/GameState';

class Game extends Phaser.Game {

	constructor() {
		super(1280, 800, Phaser.AUTO, 'content', null);
      
       
        this.state.add('bootState', BootState, false);
        this.state.add('exampleState', ExampleState, false);
        this.state.add('city1State', City1State, false);
        this.state.add('city2State', City2State, false);
        this.state.add('gameState', GameState, false);
		this.state.start('bootState');
	}

    
}

window.game = new Game();
