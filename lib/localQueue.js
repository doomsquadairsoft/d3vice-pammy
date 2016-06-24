var priorityQueue = require('async').priorityQueue;
var say = require('./say');
var player = require('./player');
var path = require('path');


function getSoundPath(filename) {
  return path.join(__dirname, '..', 'sounds', filename)
}


module.exports = priorityQueue(function(task, cb) {

    if (task.type == 'tts')
        say(task.text, task.voice, task.speed, cb);

    else if (task.type == 'file')
        player.play(getSoundPath(task.path), cb);

    else
        return cb(null)

}, 1);
