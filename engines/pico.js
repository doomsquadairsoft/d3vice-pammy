var picoTTS = require('netts').PicoTTS();

var tts = function tts(text, cb) {
  picoTTS.file("Bonjour, monde!.", {
      lang: 'en-US'
  }, function(err, path) {
    if (err) return cb(err, null);
    return cb(null, path);
  });
}


module.exports = {
  tts: tts
}
