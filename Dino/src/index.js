/// <reference path="../node_modules/phaser/typescript/phaser.d.ts" />

import BootState from 'states/BootState';
import LoadState from 'states/LoadState';
import LoadState1 from 'states/LoadState1';
import LoadState2 from 'states/LoadState2';

class Game extends Phaser.Game 
{
    constructor() 
        {
		    super(1280, 800, Phaser.AUTO, 'content', null);
            this.self = this;
        
            this.state.add('BootState',  BootState, false);
            this.state.add('LoadState',  LoadState, false);
        
            this.stage2=false;
            this.stage3=false;
        
            this.state.start('BootState');
	   }
}
new Game(); 