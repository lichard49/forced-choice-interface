// helper functions for text-to-speech and playing tones
function speak(text, callback) {
  var utter = new SpeechSynthesisUtterance(text);
  utter.onend = function() {
    setTimeout(callback, 500);
  };
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utter);
}

function playTone(frequency, duration, callback) {
  var audio_context = new (window.AudioContext ||
    window.webkitAudioContext)();
  var oscillator = audio_context.createOscillator();

  var tempo = 100;
  duration = 256/(duration*tempo);

  oscillator.type = 'sine';
  oscillator.frequency.value = frequency; // value in hertz
  oscillator.connect(audio_context.destination);
  oscillator.onended = function() {
    setTimeout(callback, 500);
  };
  oscillator.start(0);
  oscillator.stop(audio_context.currentTime + duration);
}

var tone_length = 2;
var high_tone_frequency = 466.164;
var low_tone_frequency = 440;