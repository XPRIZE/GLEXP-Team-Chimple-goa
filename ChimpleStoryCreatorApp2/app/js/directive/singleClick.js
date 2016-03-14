var app = require('angular').module('chimpleStoryBuilderApp');

app.directive('sglclick', ['$compile', '$http', '$parse', function ($compile, $http, $parse) {
  var itemsTemplate = "<ul class='unstyled'><li ng-repeat='item in items'>{{item}}</li></ul>";
  var getTemplate = function (contentType) {
    var template = '';
    switch (contentType) {
    case 'items':
      template = itemsTemplate;
      break;
    }
    return template;
  };

  return {
    restrict: 'A',
    link: function (scope, element, attr) {
      var fn = $parse(attr['sglclick']);
      var delay = 300,
        clicks = 0,
        timer = null;
      element.on('click', function (event) {
        clicks++; //count clicks
        if (clicks === 1) {
          timer = setTimeout(function () {
            scope.$apply(function () {
              fn(scope, { $event: event });
            });
            clicks = 0; //after action performed, reset counter
          }, delay);
        } else {
          clearTimeout(timer); //prevent single-click action
          clicks = 0; //after action performed, reset counter
        }
      });
    }
  };
}])
