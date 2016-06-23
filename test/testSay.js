//   tts(cb);
//   tts('hello world', cb);
//   tts('hello world', 'Princess', cb)
//   tts('hello world', 1, cb);
//   tts('hello world', 'Pricess, 1, cb')


var assert = require('chai').assert;
var say = require('../lib/say');

describe('say', function() {
    describe('tts', function() {
        this.timeout(5000);

        it('should bork if receiving no args', function() {
          assert.throws(say, /requires at least/);
        });

        it('should accept one callback', function(done) {
          say(function(err) {
            assert.isNull(err);
            done();
          });
        });

        it('should accept text and callback', function(done) {
            say('sup yall', function(err) {
              assert.isNull(err);
              done();
            });
        });

        it('should accept text, voice, and callback', function(done) {
            say('I am a princess', 'Alex', function(err) {
              assert.isNull(err);
              done();
            });
        });

        it('should accept text, speed, and callback', function(done) {
            say('I speak quickly', 2, function(err) {
              assert.isNull(err);
              done();
            });
        });


        it('should accept text, voice, speed, and callback', function(done) {
            say('Text, pl0x', 'Vicki', 0.7, function(err) {
              assert.isNull(err);
              done();
            });
        });
    });
});
