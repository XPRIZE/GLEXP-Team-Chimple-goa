import Whack_A_BootState from './states/BootState';
import Whack_A_LoadLevel from './states/LoadLevel';
import Whack_A_LoadLevel2 from './states/LoadLevel2';
import Whack_A_Load1State from './states/Load1State';
import Whack_A_Load2State from './states/Load2State';
import Whack_A_Load3State from './states/Load3State';
import Whack_A_Load4State from './states/Load4State';
import Whack_A_Load5State from './states/Load5state';
import Whack_A_MenuState from './states/MenuState';
import Whack_A_MenuState2 from './states/MenuState2';
import Whack_A_Play1State from './states/Play1State';
import Whack_A_Play2State from './states/Play2State';
import Whack_A_Play3State from './states/Play3State';
import Whack_A_Play4State from './states/Play4State';
import Whack_A_Play5State from './states/Play5State';



class Game extends Phaser.Game {

	constructor(width, height) {
		super(width, height, Phaser.AUTO, 'content', null);
        console.log("Width = "+width);
        console.log("height = "+ height);
        this._stage = 0;
       
        this.state.add('whack_a_bootState', Whack_A_BootState, false);
        this.state.add('whack_a_loadlevel', Whack_A_LoadLevel, false);
        this.state.add('whack_a_loadlevel2', Whack_A_LoadLevel2, false);
        this.state.add('whack_a_menu', Whack_A_MenuState, false);
        this.state.add('whack_a_menu2', Whack_A_MenuState2, false);
        this.state.add('whack_a_load1', Whack_A_Load1State, false);
        this.state.add('whack_a_load2', Whack_A_Load2State, false);
        this.state.add('whack_a_load3', Whack_A_Load3State, false);
        this.state.add('whack_a_load4', Whack_A_Load4State, false);
        this.state.add('whack_a_load5', Whack_A_Load5State, false);
        this.state.add('whack_a_play1', Whack_A_Play1State, false);
        this.state.add('whack_a_play2', Whack_A_Play2State, false);
        this.state.add('whack_a_play3', Whack_A_Play3State, false);
        this.state.add('whack_a_play4', Whack_A_Play4State, false);
        this.state.add('whack_a_play5', Whack_A_Play5State, false);
    
		this.state.start('whack_a_bootState');
	}

    
}
export default Game;

