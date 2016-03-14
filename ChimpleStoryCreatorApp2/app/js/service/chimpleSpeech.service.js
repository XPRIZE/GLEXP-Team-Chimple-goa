'use strict';

module.exports = ['$window', function ($window) {

  var chimpleSpeechService = this;
  $window.ChimpleSpeechService = chimpleSpeechService;

  chimpleSpeechService.onStartUtterance = function (event) {
    console.log('on start of speech:' + event);
    console.log(event.charIndex);
  };

  chimpleSpeechService.onEndUtterance = function (event) {
    console.log('on end of speech:' + event);
    console.log(event.charIndex);
  };

  chimpleSpeechService.onBoundaryUtterance = function (event) {
    console.log('on boundary of speech:' + event);
    console.log(event.charIndex);
  };

  if ($window.speechSynthesis) {
    this.utterance = new SpeechSynthesisUtterance();
    this.utterance.onstart = this.onStartUtterance;
    this.utterance.onend = this.onEndUtterance;
    this.utterance.onboundary = this.onBoundaryUtterance;
  };

  chimpleSpeechService.getVoices = function () {
    $window.speechSynthesis.getVoices();
    return $window.speechSynthesis.getVoices();
  };

  chimpleSpeechService.speak = function (text, config) {
    if ($window.speechSynthesis) {
      //return if one instance if already beek spoken  
      if ($window.speechSynthesis.speaking) {
        return;
      }
      var voices = this.getVoices();

      //choose voice. Fallback to default
      this.utterance.voice = config && config.voiceIndex ? voices[config.voiceIndex] : voices[0];
      this.utterance.volume = config && config.volume ? config.volume : 1;
      this.utterance.rate = config && config.rate ? config.rate : 1;
      this.utterance.pitch = config && config.pitch ? config.pitch : 1;

      //utterance for speech
      this.utterance.text = text;

      $window.speechSynthesis.speak(this.utterance);

    }
  };

  return chimpleSpeechService;
}];
