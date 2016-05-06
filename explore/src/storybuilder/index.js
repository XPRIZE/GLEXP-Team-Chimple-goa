import StateHolder from '../StateHolder';
import BootState from './states/BootState';
import PreloadState from './states/PreloadState';
import MenuState from './states/MenuState';
import GameState from './states/GameState';
import LibraryState from './states/LibraryState';
import SelectStoryState from './states/SelectStoryState';
import EditStoryPagesState from './states/EditStoryPagesState';
import ConstructNewStoryPageState from './states/ConstructNewStoryPageState';
import OnDemandLoadState from './states/OnDemandLoadState';


export default class StoryBuilderStateHolder extends StateHolder {
    createStates() {
		this.game.state.add('StoryBuilderBootState', BootState, false);
		this.game.state.add('StoryBuilderPreloadState', PreloadState, false);
		this.game.state.add('StoryBuilderMenuState', MenuState, false);
		this.game.state.add('StoryBuilderGameState', GameState, false);
        this.game.state.add('StoryBuilderLibraryState', LibraryState, false);
        this.game.state.add('StoryBuilderSelectStoryState', SelectStoryState, false);
        this.game.state.add('StoryEditStoryPagesState', EditStoryPagesState, false);
        this.game.state.add('StoryConstructNewStoryPageState', ConstructNewStoryPageState, false);
        this.game.state.add('StoryOnDemandLoadState', OnDemandLoadState, false);
    }
    
    startDefault() {
		this.game.state.start('StoryBuilderBootState');
	}
}