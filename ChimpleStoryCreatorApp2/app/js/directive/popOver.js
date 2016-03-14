var app = require('angular').module('chimpleStoryBuilderApp');

/*app.directive('popOver', ['$http', function ($http) {

  return {
    restrict: 'EAC',
    link: function (scope, element, attr) {
      var i = 0;

      $(element).popover();

      element.bind('mouseover', function (e) {

        $http.get("mocks/library.json").success(function (data) {
          attr.$set('originalTitle', "Some text " + i++);
          var options = {
            content: "this is dummy content",
            placement: "bottom",
            html: true,
            title: 'testing'
          };
          $(element).popover(options);
        });
      });
    }
  }
}]);*/

app.directive('popOver', ['$compile', '$http', '$parse', function ($compile, $http, $parse) {
  var itemsTemplate = "<ul class='unstyled'><li ng-repeat='item in items'>{{item}}</li></ul>";
  var getTemplate = function (contentType) {
    var template = '';
    switch (contentType) {
    case 'items':
      template = itemsTemplate;
      break;
    }
    return template;
  }
  return {
    restrict: "A",
    transclude: true,
    template: "<span ng-transclude></span>",
    link: function (scope, element, attrs) {
      var DELAY = 700,
        clicks = 0,
        timer = null;

      element.bind('click', function (e) {
        clicks++;
        if (clicks === 1) {
          timer = setTimeout(function () {
            clicks = 0; //after action performed, reset counter
          }, DELAY);
        } else {
          clearTimeout(timer); //prevent single-click action          
          clicks = 0; //after action performed, reset counter

          $http.get("mocks/library.json").success(function (data) {
            //alert('success service');
            var popOverContent;
            if (scope.items) {
              var html = getTemplate("items");
              popOverContent = $compile(html)(scope);
            }
            var options = {
              content: popOverContent,
              placement: "bottom",
              html: true,
              title: scope.title
            };

            /*var options = {
              content: "this is dummy content",
              placement: "bottom",
              html: true,
              title: 'testing'
            };*/
            $(element).popover(options);
          });
        }
      });
      element.bind('dblclick', function (e) {
        e.preventDefault(); //cancel system double-click event
      });

      /*var popOverContent;
      if (scope.items) {
        var html = getTemplate("items");
        popOverContent = $compile(html)(scope);
      }
      var options = {
        content: popOverContent,
        placement: "bottom",
        html: true,
        title: scope.title
      };
      $(element).popover(options);
      */
    },
    scope: {
      items: '=',
      title: '@'
    }
  };
}]);
