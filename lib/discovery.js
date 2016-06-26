var mdns = require('mdns');
var debug = require('debug')('d3vice:pammy');
var database = require('./database');



var browser = mdns.createBrowser(mdns.tcp('http'));





module.exports = browser;
