var assert = require('chai').assert;
var discovery = require('../lib/discovery');
var path = require('path');


describe('discovery', function() {
  describe('discover', function() {
    it('should find a D3VICE server', function(done) {
      this.timeout(60000);
      discovery.discover(function(err, server) {
        assert.isNull(err);
        assert.isObject(server);
        done();
      });
    });
  });
});
