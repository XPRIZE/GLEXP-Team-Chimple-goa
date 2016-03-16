import StateHolder from '../StateHolder';
import BootState from './states/BootState';
import PreloadState from './states/PreloadState';
import MenuState from './states/MenuState';
import GameState from './states/GameState';
import EditState from './states/EditState';

export default class SceneStateHolder extends StateHolder {
    createStates() {
		this.game.state.add('SceneBootState', BootState, false);
		this.game.state.add('ScenePreloadState', PreloadState, false);
		this.game.state.add('SceneMenuState', MenuState, false);
		this.game.state.add('SceneGameState', GameState, false);
		this.game.state.add('SceneEditState', EditState, false);
    }
    
    startDefault() {
		this.game.state.start('SceneBootState');
	}
}