var app = require('angular').module('chimpleStoryBuilderApp');
app.filter('filterToolBar', function() {
  return function(input) {
    var inputArray = [];

    for(var item in input) {
      inputArray.push(input[item]);
    }

    return inputArray.filter(function(v) { return !v.hidden; });
  };
});