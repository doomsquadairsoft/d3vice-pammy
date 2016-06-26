var Promise = require('bluebird');
var nedb = require('nedb');
var db = new nedb();

module.exports = Promise.promisifyAll(db);
