/// <reference path="../node_modules/phaser/typescript/phaser.d.ts" />

import GameState from 'states/GameState';
import BootState from 'states/BootState';
import LoadState from 'states/LoadState';
import MenuState from 'states/MenuState';

class Game extends Phaser.Game {

	constructor() {
                            
                super(1280, 800, Phaser.AUTO, 'content', null);
                            	
                            this._ansName = new Array();
                            this._textId = new Array ();
                            this._panId = new Array (); 
                            this._overLap = new Array();
                             
                            this._panIdOrg = new Array();
                            this._pankaj10 = new Array();
                            this._squarePos = new Array();
                            this._checkFlag ;
                            this._checkFlag1;
                            this._ans;
                            this._home;
                            this._textOpt;
                            this._backFlag4;
                            this._backFlag5;
                            this._backFlag3;
                            this._textOverans;
                            this._c =0;
                            

                        console.log("I am in index.js");
                            
                     
                        this.state.add('GameState', GameState, false);
                        this.state.add('BootState', BootState, false);
                        this.state.add('LoadState', LoadState, false);
                        this.state.add('MenuState', MenuState, false);
                        this.state.start('BootState');
	              }

}

new Game();
