var assert = require('chai').assert;
var discovery = require('../lib/discovery');
var path = require('path');
var database = require('../lib/database');


describe('Promises', function() {
    describe('but they still feel all so wasted on myself', function() {
        it('should be promissy', function() {
            return database.insertAsync({
                    "type": "tester"
                })
                .then(
                    function(newDoc) {
                        assert.isObject(newDoc);
                        assert.equal(newDoc.type, 'tester')
                        console.log('insert complete! ');
                        console.log(newDoc);
                        return newDoc;
                    }
                )
                .then(
                    function(query) {
                        assert.isObject(query);
                        assert.equal(query.type, 'tester')
                        return database.findOneAsync(query)
                    }
                )
                .catch(
                    function(err) {
                        console.log('error caught!');
                        console.log(err);
                    }
                )
                .done(
                    function(val) {
                        console.log('ALL DONE!!!!');
                        console.log(val);
                    }
                );
        });
    });
});
