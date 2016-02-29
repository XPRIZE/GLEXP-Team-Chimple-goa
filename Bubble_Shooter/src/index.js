/// <reference path="../node_modules/phaser/typescript/phaser.d.ts" />

import Puzzle from 'states/Puzzle';
import Alphabets from 'states/Alphabets';
import Number from 'states/Number'
import HomeScreen from 'states/HomeScreen'
import LevelSceenAlphabets from 'states/LevelSceenAlphabets'
import LevelSceenNumber from 'states/LevelSceenNumber'
import ScoreCardNumber from 'states/ScoreCardNumber'

class Game extends Phaser.Game {

	constructor() {
        
		super(800, 1280, Phaser.AUTO, 'content', null);
     
        //  All Level flags ....
        this._LevelFlag = 1;
        
        //  Set Variable for World size 
       
       	this.state.add('Puzzle', Puzzle, false);
        this.state.add('Alphabets', Alphabets, false);
        this.state.add('Number',Number,false);
        this.state.add('HomeScreen',HomeScreen,false);
        this.state.add('LevelSceenAlphabets',LevelSceenAlphabets,false);
        this.state.add('LevelSceenNumber',LevelSceenNumber,false);
        this.state.add('ScoreCardNumber',ScoreCardNumber,false);
        
		this.state.start('HomeScreen');
	}

}

new Game();
