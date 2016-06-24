var assert = require('chai').assert;
var player = require('../lib/player');
var path = require('path');


describe('player', function() {
  describe('play', function() {
    this.timeout(4000);
    it('should play soundfile given its absolute path', function(done) {
      var audioFilePath = path.join(__dirname, '..', 'sounds', 'clear.wav');
      player.play(audioFilePath, function(err) {
        assert.isNull(err);
        done();
      });
    });
  })
});
