/// <reference path="../node_modules/phaser/typescript/phaser.d.ts" />

import BootState from 'states/BootState';
import LoadLevel from 'states/LoadLevel';
import LoadLevel2 from 'states/LoadLevel2';
import Load1State from 'states/Load1State';
import Load2State from 'states/Load2State';
import Load3State from 'states/Load3State';
import Load4State from 'states/Load4State';
import Load5State from 'states/Load5state';
import MenuState from 'states/MenuState';
import Play2State from 'states/Play2State';


class Game extends Phaser.Game {

	constructor() {
		super(1280, 800, Phaser.AUTO, 'content', null);
        this._stage = 0;
       
        
        this.state.add('bootState', BootState, false);
        
        this.state.add('loadlevel', LoadLevel, false);
        this.state.add('loadlevel2', LoadLevel2, false);
        this.state.add('load1', Load1State, false);
        this.state.add('load2', Load2State, false);
        this.state.add('load3', Load3State, false);
        this.state.add('load4', Load4State, false);
        this.state.add('load5', Load5State, false);
        this.state.add('menu', MenuState, false);
        this.state.add('play2', Play2State, false);
        
        
		this.state.start('bootState');
	}

    
}

new Game();
