'use strict';

var app = require('angular').module('chimpleStoryBuilderApp');

app.controller('LibraryCtrl', require('./library'));
app.controller('CreateStoryCtrl', require('./createStory'));
app.controller('EditPageCtrl', require('./editPage'));
app.controller('NarrateStoryCtrl', require('./narrateStory'));
