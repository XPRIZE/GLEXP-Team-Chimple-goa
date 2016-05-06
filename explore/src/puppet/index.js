import StateHolder from '../StateHolder.js';
import BootState from './states/BootState';
import PreloadState from './states/PreloadState';
import MenuState from './states/MenuState';
import GameState from './states/GameState';

export default class PuppetStateHolder extends StateHolder {
    constructor(game) {
        super(game);
    }
    
    createStates() {
		this.game.state.add('PuppetBootState', BootState, false);
		this.game.state.add('PuppetPreloadState', PreloadState, false);
		this.game.state.add('PuppetMenuState', MenuState, false);
		this.game.state.add('PuppetGameState', GameState, false);        
    }
    
    startDefault() {
		this.game.state.start('PuppetBootState');        
    }
}
