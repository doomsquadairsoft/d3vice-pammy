var queue = require('./lib/queue');
var express = require('express');
var bodyParser = require('body-parser');



var app = express();
app.use(bodyParser.json());


var player = require('play-sound')({
    players: [
        "mplayer",
        "mpg123",
        "mpg321",
        "play",
        "omxplayer"
    ]
});

// say('Hello good sir how are you today?', function(err) {
//   if (err) throw err;
//   console.log('all done');
// });

app.post('/api/v1/tts', function(req, res) {
  if (!req.body)
    return res.status(400).json({
      "success": false,
      "message": "received an empty request body!"
    });

  if (typeof req.body.text === 'undefined')
    return res.status(400).json({
      "success": false,
      "message": "did not receive text in body"
    });

  var speechOpts = {
    text: req.body.text,
    voice: req.body.voice,
    speed: req.body.speed
  }


  // priorityQueue. 5 is priority level
  queue.push(speechOpts, 5, function(err) {
    if (err)
      return res.status(500).json({
        "success": false,
        "message": "server had an whoopsie when trying to generate speech"
      });

    return res.status(200).json({
      "success": true,
      "message": "all good in the neighborhood"
    });
  });
});


var port = process.env.PORT || 5000;
app.listen(port);
console.log('server listening on port '+port);


module.exports = app;
