import StateHolder from '../StateHolder';
import BootState from './states/BootState';
import PreloadState from './states/PreloadState';
import MenuState from './states/MenuState';
import GameState from './states/GameState';

export default class StoryBuilderStateHolder extends StateHolder {
    createStates() {
		this.game.state.add('StoryBuilderBootState', BootState, false);
		this.game.state.add('StoryBuilderPreloadState', PreloadState, false);
		this.game.state.add('StoryBuilderMenuState', MenuState, false);
		this.game.state.add('StoryBuilderGameState', GameState, false);
    }
    
    startDefault() {
		this.game.state.start('StoryBuilderBootState');
	}
}