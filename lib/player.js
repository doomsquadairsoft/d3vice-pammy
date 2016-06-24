var player = require('play-sound')({
    players: [
        "mplayer",
        "mpg123",
        "mpg321",
        "play",
        "omxplayer"
    ]
});


module.exports = player;
