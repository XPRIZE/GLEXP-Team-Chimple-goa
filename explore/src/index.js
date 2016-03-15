/// <reference path="../node_modules/phaser/typescript/phaser.d.ts" />
/// <reference path="../typings/tsd.d.ts" />

import PuppetStateHolder from './puppet/index.js';
import SceneStateHolder from './scene/index.js';

class Game extends Phaser.Game {
	constructor(width, height) {
		super(width, height, Phaser.AUTO, 'gameCanvas', null);
        let puppetStateHolder = new PuppetStateHolder(this);
        puppetStateHolder.createStates();
		puppetStateHolder.startDefault();
        let sceneStateHolder = new SceneStateHolder(this);
        sceneStateHolder.createStates();
		// sceneStateHolder.startDefault();
	}
}

window.game = new Game(800, 600);
