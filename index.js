/**
 * This is for legacy support of a REST api that I did when I first made this
 * project. The REST API is for standalone operation of pammy, whereas
 * the rabbitMQ option is for integrating with a d3vice network.
 *
 * The REST api is a simple way to trigger sounds on your remote computer.
 * By default, RabbitMQ is used.
 */



// get command line arguments
var mode = process.argv[2]


// rabbitMQ is default mode
if (typeof mode === 'undefined' || mode == 'rabbitmq' || mode == 'mq') {
  require('./lib/main');
}

// rest/express is alternate mode
else if (mode == 'express' || mode == 'rest') {
  require('./lib/rest');
}
