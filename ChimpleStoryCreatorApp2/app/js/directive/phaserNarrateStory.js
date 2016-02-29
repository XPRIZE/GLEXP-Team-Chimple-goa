var app = require('angular').module('chimpleStoryBuilderApp');
app.directive('phaserNarrateStory', ['$window', function ($window) {

  var template = '<div style="margin-top: -64px;" flex id="phaser-narrate-story"></div>';

  var storyContainer = null;

  var link = function (scope, element, attrs) {
    storyContainer = angular.element(document.getElementById('phaser-narrate-story'));
    require('../states/narrateMode/initNarrate.js')(scope, storyContainer[0]);
  };

  return {
    scope: {},
    replace: true,
    link: link,
    template: template
  };
}]);
