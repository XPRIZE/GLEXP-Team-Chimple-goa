'use strict';

var app = require('angular').module('chimpleStoryBuilderApp');
app.factory('LokiService', require('./loki.service'));
app.factory('FetchStoriesService', require('./fetchStories.service'));
app.factory('CreateStoryService', require('./createStory.service'));
app.service('EditPageService', require('./editPage.service'));
app.service('NarrateStoryService', require('./narrateStory.service'));
app.factory('ChimpleSpeechService', require('./chimpleSpeech.service'));
