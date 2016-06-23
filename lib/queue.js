var priorityQueue = require('async').priorityQueue;
var say = require('./say');


module.exports = priorityQueue(function(task, cb) {
  say(task.text, task.voice, task.speed, function(err) {
    if (err) cb(err);
    cb(null);
  });
}, 1);
