import StateHolder from '../StateHolder.js';
import BootState from './states/Bootstate';
import PreloadState from './states/PreloadState';
import ExampleState from './states/ExampleState';
import City1State from './states/City1State';
import City2State from './states/City2State';
import GameState from '../scene/states/GameState';

export default class NavigateStateHolder extends StateHolder {

	constructor(game) {
		super(game);
    }
    
    createStates () {           
        this.game.state.add('bootState', BootState, false);
        this.game.state.add('preloadState', PreloadState, false);        
        this.game.state.add('exampleState', ExampleState, false);
        this.game.state.add('city1State', City1State, false);
        this.game.state.add('city2State', City2State, false);
        this.game.state.add('gameState', GameState, false);
		
	}
    startDefault() {
        this.game.state.start('bootState');
    }

    
}