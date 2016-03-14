import StateHolder from '../StateHolder';
import BootState from './states/BootState';
import PreloadState from './states/PreloadState';
import MenuState from './states/MenuState';
import GameState from './states/GameState';

export default class SceneStateHolder extends StateHolder {
    createStates() {
		this.game.state.add('BootState', BootState, false);
		this.game.state.add('PreloadState', PreloadState, false);
		this.game.state.add('MenuState', MenuState, false);
		this.game.state.add('GameState', GameState, false);
    }
    
    startDefault() {
		this.game.state.start('BootState');
	}
}