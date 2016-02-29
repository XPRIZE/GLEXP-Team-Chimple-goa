/// <reference path="../node_modules/phaser/typescript/phaser.d.ts" />
/// <reference path="../typings/tsd.d.ts" />

import BootState from './states/BootState';
import PreloadState from './states/PreloadState';
import MenuState from './states/MenuState';
import GameState from './states/GameState';

class Game extends Phaser.Game {
	constructor(width, height) {
		super(width, height, Phaser.AUTO, 'gameCanvas', null);
		this.state.add('BootState', BootState, false);
		this.state.add('PreloadState', PreloadState, false);
		this.state.add('MenuState', MenuState, false);
		this.state.add('GameState', GameState, false);
		this.state.start('BootState');
	}
}

// angular.module('puppet', ['ngMaterial'])
//     .controller('AppCtrl', ['$scope', function($scope) {
//         $scope.backgroundColor = 0xffffff;
//         $scope.changeBackground = function(color) {
//             console.log(color);
//             $scope.backgroundColor = color;
//         }
//     }])
//     .directive('ngPhaser', function() {
//         return {
//             restrict: 'A',
//             link: function postLink(scope, element, attrs) {
//                 console.log(element);
//                 console.log(scope);
//               var game = new Game(window.innerWidth, window.innerHeight);
//               game.scope = scope;
//               console.log(game);
//               //game.stage.backgroundColor = scope.backgroundColor;
//               scope.$watch('backgroundColor', function() {
//                   console.log('watch');
//                   console.log(scope.backgroundColor);
//                   game.stage.backgroundColor = scope.backgroundColor;
//               });
//               console.log(scope.$$watchers);
//             },
//         }
//     });

window.game = new Game(800, 600);
