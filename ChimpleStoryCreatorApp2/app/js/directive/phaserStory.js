var app = require('angular').module('chimpleStoryBuilderApp');
app.directive('phaserStory', ['$window', function ($window) {

  var template = '<div flex id="phaser-story"></div>';

  var storyContainer = null;

  var link = function (scope, element, attrs) {
    storyContainer = angular.element(document.getElementById('phaser-story'));
    console.log('toolbarheight 22222:' + scope.$root.toolBarHeight);
    scope.toolBarHeight = scope.$root.toolBarHeight;
    require('../states/editMode/init.js')(scope, storyContainer[0]);
  };

  return {
    scope: {
      theight: '@theight'
    },
    replace: true,
    link: link,
    template: template
  };
}]);
