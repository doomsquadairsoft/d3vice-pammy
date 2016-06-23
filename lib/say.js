var say = require('say');
var debug = require('debug')('d3vice:pammy');

defaults = {
  'voice': 'Princess',
  'speed': 1,
  'text': 'hello world'
};

// possible ways of calling
//   tts('hello world', cb);
//   tts('hello world', 'Princess', cb)
//   tts('hello world', 1, cb);
//   tts('hello world', 'Pricess, 1, cb')

module.exports = function tts(text, voice, speed, cb) {
  if (typeof text === 'undefined')
    throw new Error('say() requires at least a callback as an argument.');

  if (typeof text === 'function') {
    cb = text;
    text = defaults.text;
  }

  if (typeof voice === 'function') {
    cb = voice;
    voice = defaults.voice;
  }

  if (typeof speed === 'function') {
    cb = speed;
    speed = defaults.speed;
  }

  if (typeof voice === 'number') {
    speed = voice;
    voice = defaults.voice;
  }

  if (typeof voice === 'undefined')
    voice = defaults.voice;

  if (typeof speed === 'undefined')
    speed = defaults.speed;

  debug('text=%s, voice=%s, speed=%s', text, voice, speed);

  say.speak(text, voice, speed, function(err) {
    if (err) return cb(err);
    return cb(null);
  });
};
